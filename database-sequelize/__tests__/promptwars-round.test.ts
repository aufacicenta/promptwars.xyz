import { Sequelize } from "sequelize";
import { initModels, Prompt, TextToImg } from "../models";
import { Round } from "../models/Round";
import { RoundResult } from "../models/RoundResult";
import { User } from "../models/User";
import { addMinutes, isBefore, isAfter } from "date-fns";

let sequelize: Sequelize;

beforeAll(async () => {
  sequelize = new Sequelize("sqlite::memory:", { logging: false });
  initModels(sequelize);
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("PromptWars Round", () => {
  let users: User[];
  let round: Round;
  let textToImg: TextToImg;

  beforeEach(async () => {
    textToImg = await TextToImg.create({
      model: "test-ai-model",
      provider: "test-ai-provider",
    });

    // Create 10 users
    users = await Promise.all(
      Array(10)
        .fill(null)
        .map(async () => User.create()),
    );

    // Create a round
    const startTime = new Date();
    const endTime = addMinutes(startTime, 5); // 5 minutes later
    round = await Round.create({
      starts_at: startTime,
      ends_at: endTime,
      src_img_url: "src_img_url",
    });
  });

  test("Round creation and data verification", async () => {
    const fetchedRound = await Round.findByPk(round.id);
    expect(fetchedRound).not.toBeNull();
    expect(fetchedRound!.starts_at.getTime()).toBe(round.starts_at.getTime());
    expect(fetchedRound!.ends_at.getTime()).toBe(round.ends_at.getTime());
    expect(
      isBefore(fetchedRound!.starts_at, new Date()) || fetchedRound!.starts_at.getTime() === new Date().getTime(),
    ).toBeTruthy();
    expect(isAfter(fetchedRound!.ends_at, new Date())).toBeTruthy();
  });

  test("Prompt creation", async () => {
    const prompts = await Promise.all(
      users.map((user) =>
        Prompt.create({
          user_id: user.id,
          round_id: round.id,
          text_to_img_id: textToImg.id,
          image_url: "image_url",
          prompt_text: "prompt text",
          negative_prompt: "negative prompt",
        }),
      ),
    );

    expect(prompts).toHaveLength(10);
    prompts.forEach((prompt) => {
      expect(prompt.round_id).toBe(round.id);
      expect(prompt.text_to_img_id).toBe(textToImg.id);
    });
  });

  test("Round results and credit distribution", async () => {
    const winnerDistributions = [0.7, 0.2, 0.1];
    const winners = users.slice(0, 3); // Select the first 3 users as winners

    await Promise.all(
      winnerDistributions.map((distribution, index) =>
        RoundResult.create({
          round_id: round.id!,
          user_id: winners[index].id,
          winner_distribution: distribution,
        }),
      ),
    );

    const updateTotalCreditsResult = await round.updateTotalCredits();
    const fetchedRound = await Round.findByPk(round.id);
    expect(fetchedRound!.total_credits).toBe(updateTotalCreditsResult.total_credits);

    const fetchedResults = await RoundResult.findAll({ where: { round_id: round.id } });
    expect(fetchedResults).toHaveLength(3);

    fetchedResults.forEach((result, index) => {
      expect(result.winner_distribution).toBe(winnerDistributions[index]);
      expect(result.user_id).toBe(winners[index].id);
    });

    const creditsEarned = fetchedResults.map((result) =>
      Math.floor(result.winner_distribution * updateTotalCreditsResult.total_credits),
    );

    await Promise.all(fetchedResults.map((result, index) => result.update({ credits_earned: creditsEarned[index] })));

    const updatedResults = await RoundResult.findAll({ where: { round_id: round.id } });
    updatedResults.forEach((result, index) => {
      expect(result.credits_earned).toBe(creditsEarned[index]);
    });
  });
});
