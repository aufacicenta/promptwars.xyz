import { Sequelize } from "sequelize";
import { initModels, User, Credit, Wallet } from "../models";

async function testRelationships() {
  const sequelize = new Sequelize("sqlite::memory:", { logging: console.log });

  initModels(sequelize);

  await sequelize.sync({ force: true });

  // Create a user
  const user = await User.create({});

  // Create a wallet for the user
  const wallet = await Wallet.create({
    user_id: user.id,
    ethereum_address: "0x1234567890123456789012345678901234567890",
  });

  // Create credits for the user
  const credit = await Credit.create({
    user_id: user.id,
    balance: 100,
  });

  // Fetch the user with associated wallet and credits
  const fetchedUser = await User.findByPk(user.id, {
    include: [
      { model: Wallet, as: "wallet" },
      { model: Credit, as: "credits" },
    ],
  });

  console.log("User with associations:", JSON.stringify(fetchedUser, null, 2));

  // Fetch the wallet with associated user
  const fetchedWallet = await Wallet.findByPk(wallet.id, {
    include: [{ model: User, as: "user" }],
  });

  console.log("Wallet with user:", JSON.stringify(fetchedWallet, null, 2));

  // Fetch the credit with associated user
  const fetchedCredit = await Credit.findByPk(credit.id, {
    include: [{ model: User, as: "user" }],
  });

  console.log("Credit with user:", JSON.stringify(fetchedCredit, null, 2));

  await sequelize.close();
}

testRelationships().catch(console.error);
