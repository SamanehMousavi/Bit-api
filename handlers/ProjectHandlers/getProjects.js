"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getProjects = async (request, response) => {
  const { date, user } = request.params;

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("FinalProject");

    // const projectData = await db.collection("Users").findOne({ _id: user });
    const newProjectList = {};

    const userList = await db.collection("Users").find().toArray();

    const newProjects = userList.forEach((e) => {
      Object.keys(e.Projects).forEach((key) => {
        if (e._id === user || e.Projects[key].member === user) {
          newProjectList[key] = { ...e.Projects[key] };
        }
      });
    });

    response.status(200).json({ status: 200, data: newProjectList });
  } catch (error) {
    (error) => console.log(error);
    response.status(500).json({ status: 500, message: error.message });
  } finally {
    client.close();
  }
};

module.exports = { getProjects };
