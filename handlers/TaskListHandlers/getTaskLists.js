"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const gettasklists = async (request, response) => {
  const { date, user } = request.params;
  console.log(date);
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("FinalProject");

    const listData = await db.collection("Users").findOne({ _id: user });
    console.log(listData.lists);
    const taskList = listData.lists[date];
    console.log(taskList);
    if (!taskList) {
      response.status(404).json({ status: 404, message: "Date not Found" });
    } else {
      response.status(200).json({ status: 200, data: taskList });
    }
  } catch (error) {
    (error) => console.log(error);
    response.status(500).json({ status: 500, message: "Server error" });
  } finally {
    client.close();
  }
};

module.exports = { gettasklists };
