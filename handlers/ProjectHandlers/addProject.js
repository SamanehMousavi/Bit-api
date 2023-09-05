"use strict";
const { v4 } = require("uuid");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addProject = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const { user, title, dueDate, description, taskData, member } = request.body;
  const index = v4();
  try {
    await client.connect();
    const db = client.db("FinalProject");

    const findUser = await db.collection("Users").findOne({ _id: user });

    const newProject = { ...findUser.Projects };
    newProject[index] = {
      _id: index,
      title: title,
      dueDate: dueDate,
      status: "In Progress",
      description: description,
      member: member,
      taskStatus: taskData,
    };

    await db
      .collection("Users")
      .updateOne({ _id: user }, { $set: { Projects: newProject } });
    return response.status(200).json({ status: 200, message: "Updated List" });
  } catch (error) {
    response.status(500).json({ status: 500, message: error.message });
  } finally {
    client.close();
  }
};

module.exports = { addProject };
