import { Sequelize } from "sequelize";
import { initModels } from "../models";
import { Round } from "../models/Round";
import { RoundResult } from "../models/RoundResult";
import { User } from "../models/User";
import { addMinutes, isBefore, isAfter } from "date-fns";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

let sequelize: Sequelize;
async function runTests() {
  try {
    sequelize = new Sequelize("sqlite::memory:", { logging: false });
    initModels(sequelize);
    await sequelize.sync({ force: true });

    console.log("Running PromptWars Round test...");

    // Create 10 users
    const users = await Promise.all(
      Array(10)
        .fill(null)
        .map(async (_) => {
          const user = await User.create();
          return user;
        }),
    );

    // Create a round
    const startTime = new Date();
    const endTime = addMinutes(startTime, 5); // 5 minutes later
    const round = await Round.create({
      starts_at: startTime,
      ends_at: endTime,
    });
    console.log("Created Round:", round.toJSON());

    // Create round results for expected winners
    const winnerDistributions = [0.7, 0.2, 0.1];
    const roundResults = await Promise.all(
      winnerDistributions.map(async (distribution, index) => {
        const result = await RoundResult.create({
          round_id: round.id!,
          user_id: null,
          winner_distribution: distribution,
        });
        console.log(`Created RoundResult ${index + 1}:`, result.toJSON());
        return result;
      }),
    );

    // Verify round data
    const fetchedRound = await Round.findByPk(round.id);
    assert(fetchedRound !== null, "Fetched round should not be null");
    assert(fetchedRound!.starts_at.getTime() === startTime.getTime(), "Start time should match");
    assert(fetchedRound!.ends_at.getTime() === endTime.getTime(), "End time should match");
    assert(
      isBefore(fetchedRound!.starts_at, new Date()) || fetchedRound!.starts_at.getTime() === new Date().getTime(),
      "Start time should be before or equal to current time",
    );
    assert(isAfter(fetchedRound!.ends_at, new Date()), "End time should be after current time");

    // Verify round results
    const fetchedResults = await RoundResult.findAll({ where: { round_id: round.id } });
    assert(fetchedResults.length === 3, "There should be 3 round results");

    // Verify the winner distributions
    const expectedDistributions = [0.7, 0.2, 0.1];
    fetchedResults.forEach((result, index) => {
      assert(
        result.winner_distribution === expectedDistributions[index],
        `Winner distribution should be ${expectedDistributions[index]}`,
      );
      assert(result.user_id === null, "User ID should be null");
    });

    console.log("PromptWars Round test passed successfully!");
  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    if (sequelize) {
      await sequelize.close();
    }
  }
}

runTests();
