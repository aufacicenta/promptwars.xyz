import { Sequelize } from "sequelize";
import { User } from "../models/User";
import { Credit } from "../models/Credit";

async function testRelationships() {
  // Initialize Sequelize
  const sequelize = new Sequelize("sqlite::memory:", { logging: console.log });

  // Initialize models
  User.initModel(sequelize);
  Credit.initModel(sequelize);

  // Set up associations
  User.associate();
  Credit.associate();

  // Sync models with database
  await sequelize.sync({ force: true });

  try {
    // Create a user
    const user = await User.create({});
    console.log("Created user:", user.toJSON());

    // Create a credit for the user
    const credit = await Credit.create({
      user_id: user.id,
      balance: 100.0,
    });
    console.log("Created credit:", credit.toJSON());

    // Fetch user with associated credits
    const userWithCredits = await User.findByPk(user.id, {
      include: ["credits"],
    });
    console.log("User with credits:", userWithCredits?.toJSON());

    // Fetch credit with associated user
    const creditWithUser = await Credit.findByPk(credit.id, {
      include: ["user"],
    });
    console.log("Credit with user:", creditWithUser?.toJSON());
  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    await sequelize.close();
  }
}

testRelationships().catch(console.error);
