"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getProject = async (request, response) => {
  const { user, projectId } = request.params;

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("FinalProject");

    const userData = await db.collection("Users").find().toArray();

    const user = userData.find((user) =>
      Object.keys(user.Projects).includes(projectId)
    );

    response.status(200).json({ status: 200, data: user.Projects[projectId] });
  } catch (error) {
    (error) => console.log(error);
    response.status(500).json({ status: 500, message: error.message });
  } finally {
    client.close();
  }
};

module.exports = { getProject };
