"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const deleteProject = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const { user, projectId } = request.params;

  try {
    await client.connect();
    const db = client.db("FinalProject");

    const findUser = await db.collection("Users").findOne({ _id: user });
    if (!findUser) {
      return response
        .status(404)
        .json({ status: 404, message: "User not found" });
    }
    const newProjects = { ...findUser.Projects };

    delete newProjects[projectId];

    await db
      .collection("Users")
      .updateOne({ _id: user }, { $set: { Projects: newProjects } });
    return response
      .status(200)
      .json({ status: 200, message: "deleted Project" });
  } catch (error) {
    response.status(500).json({ status: 500, message: error.message });
  } finally {
    client.close();
  }
};

module.exports = { deleteProject };
