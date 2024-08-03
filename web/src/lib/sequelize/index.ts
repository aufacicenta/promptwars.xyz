import { initModels } from "@promptwars/database/models";

const load = async () => {
  const sequelize = await import("@promptwars/database/db");

  return initModels(sequelize.default);
};

const e = {
  load,
};

export default e;
