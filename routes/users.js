var express = require("express");
var router = express.Router();
var { mongodb, MongoClient, dbUrl } = require("../DbSchema");

// Create Account
router.post("/create-account", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db("Banking");
    const accounts = await db.collection("Accounts").insertOne(req.body);
    res.json({
      statusCode: 200,
      message: "Successfully Account is Created",
      accountNumber: req.body.accountNumber,
    });
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

// Desposit amount
router.post("/deposit", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db("Banking");
    let depo = await db
      .collection("Accounts")
      .findOne({ name: req.body.accountHolderName });
      if(depo.amount == null){
        depo.amount = 0;
        let sum = +depo.amount + +req.body.amount;
        let update = await db
          .collection("Accounts")
          .findOneAndUpdate(
            { name: req.body.accountHolderName },
            { $set: { amount:  Number(sum) } }
          );
      }
      else{
        let sum = +depo.amount + +req.body.amount;
        let update = await db
          .collection("Accounts")
          .findOneAndUpdate(
            { name: req.body.accountHolderName },
            { $set: { amount: Number(sum) } }
          );
      }
    let depo2 = await db
      .collection("Accounts")
      .findOne({ name: req.body.accountHolderName });
    res.json({
      statusCode: 200,
      message: "Amount Add Successfully",
      amount: req.body.amount,
      cb: depo2.amount,
    });
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

router.post("/check-balance", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db("Banking");
    let update = await db
      .collection("Accounts")
      .findOne({ name: req.body.accountHolderName });
    res.json({
      statusCode: 200,
      message: "Amount Add Successfully",
      balance: update.amount,
    });
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

router.post("/withdraw", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db("Banking");
    let update = await db
      .collection("Accounts")
      .findOne({ name: req.body.accountHolderName });
    if (req.body.amount <= update.amount) {
      let amount = Number(update.amount) - req.body.amount;
      let updateamount = await db
        .collection("Accounts")
        .findOneAndUpdate(
          { name: req.body.accountHolderName },
          { $set: { amount: amount } }
        );
      let amountUpdated = await db
        .collection("Accounts")
        .findOne({ name: req.body.accountHolderName });
      res.json({
        statusCode: 200,
        message: "Amount withdraw successfully",
        wdAmount: amountUpdated.amount,
      });
    } else {
      res.json({
        statusCode: 400,
        message: "Insufficient Balance",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

router.post("/transfer", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db("Banking");
    let creditAccountData = await db
      .collection("Accounts")
      .findOne({ name: req.body.creditAccountHolderName });
      if(req.body.transferAmount <= creditAccountData.amount){
        let cal = creditAccountData.amount - Number(req.body.transferAmount);
        let creditAccountDataUpdate = await db
          .collection("Accounts")
          .findOneAndUpdate(
            { name: req.body.creditAccountHolderName },
            { $set: { amount: Number(cal) } }
            );
            let debitAccountData = await db
        .collection("Accounts")
        .findOne({ name: req.body.debitAccountHolderName });
      let cal2 = +debitAccountData.amount + +Number(req.body.transferAmount);
      let debitAccountDataUpdate = await db
        .collection("Accounts")
        .findOneAndUpdate(
          { name: req.body.debitAccountHolderName },
          { $set: { amount: Number(cal2) } }
        );
            res.json({
              statusCode: 200,
              message: "Transfer Data Succesfully",
            });
          }
          else{
            let amount = creditAccountData.amount
            let account = req.body.creditAccountNumber
            res.json({
              statusCode: 400,
              message: " Maximum Withdrawl Amount is " + amount + " for account " + account
            });
          }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});
module.exports = router;
