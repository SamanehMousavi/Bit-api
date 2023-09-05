"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const updateProject = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const {
    user,
    projectId,
    title,
    description,
    status,
    dueDate,
    taskStatus,
    member,
  } = request.body;

  try {
    await client.connect();
    const db = client.db("FinalProject");

    const userData = await db.collection("Users").find().toArray();
    const user = userData.find((user) =>
      Object.keys(user.Projects).includes(projectId)
    );
    const newProject = { ...user.Projects };
    newProject[projectId] = {
      _id: projectId,
      title: title,
      dueDate: dueDate,
      status: status,
      description: description,
      member: member,
      taskStatus: taskStatus,
    };

    await db
      .collection("Users")
      .updateOne({ _id: user._id }, { $set: { Projects: newProject } });
    return response
      .status(200)
      .json({ status: 200, message: "Updated Project" });
    // } else {
    //   return response
    //     .status(200)
    //     .json({ status: 200, message: "User alreday logged in" });
    // }
  } catch (error) {
    response.status(500).json({ status: 500, message: error.message });
  } finally {
    client.close();
  }
};

module.exports = { updateProject };
