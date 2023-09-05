require("dotenv").config();
const { v4 } = require("uuid");
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { MongoClient } = require("mongodb");

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  const index = v4();
  try {
    await client.connect();
    const db = client.db("FinalProject");
    const newTask = {};
    newTask[index] = { id: index, task: "washing dishes", completed: "false" };
    const result = await db.collection("Users").insertOne({
      _id: "sama.mousavi@gmail.com",
      username: "Samaneh Mousavi",
      email: "sama.mousavi@gmail.com",

      lists: {
        "Fri Jul 07 2023": {
          shareWith: ["user1", "user2", "user3"],
          task: newTask,
        },
      },
      Projects: [
        {
          _id: "123498",
          title: "Painting",
          dueDate: "Friday december 2nd",
          description: "Painting Smith's House",
          members: ["user1", "user2", "user3"],
          status: "done",
          taskStatus: {
            workqueue: {
              name: "workqueue",
              items: [
                { id: "1", content: "First Task" },
                { id: "2", content: "Second Task" },
                { id: "3", content: "Third Task" },
                { id: "4", content: "Fourth Task" },
              ],
            },
            toDo: {
              name: "To do",
              items: [],
            },
            inProgress: {
              name: "In Progress",
              items: [],
            },
            done: {
              name: "Done",
              items: [],
            },
          },
        },
      ],
    });
    console.log({
      result: `${result.insertedCount} documents inserted `,
      message: "Successful",
    });
  } catch (error) {
    console.error(error);
  }
  client.close();
};

batchImport();
