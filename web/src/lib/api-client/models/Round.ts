import { RoundAttributes } from "@promptwars/database/models/Round";

export type CurrentRoundResponse = RoundAttributes & {
  count: number;
};
