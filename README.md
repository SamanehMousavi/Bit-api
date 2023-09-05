# Api Endpoints

| Endpoint                                          | Method   | Description          |
| ------------------------------------------------- | -------- | -------------------- |
| [/adduser](#adduser)                              | `POST`   | Returns users object |
| [/addtask](#addtask)                              | `POST`   | Returns task object  |
| [/deletetask/:date/:user/:index](#deletetask)     | `DELETE` | Delete task          |
| [/tasklist/:date/user](#tasklist)                 | `GET`    | Get lists            |
| [/updatetask](#updatetaskt)                       | `PATCH`  | Update tasks         |
| [/deleteTask/:date/:user/:index](#deletetaskt)    | `DELETE` | Delete tasks         |
| [/deleteTask/:date/:user/:index](#deletetaskt)    | `DELETE` | Delete tasks         |
| [/getprojects/:user](#getProjects)                | `GET`    | Get Projects         |
| [/getProject/:user/:projectId](#getProject)       | `GET`    | Get Project          |
| [/addProject](#addProject)                        | `POST`   | Add New Project      |
| [/deleteProject/:user/:projectId](#deleteProject) | `DELETE` | Delete Project       |
| [updateproject](#updateProject)                   | `UPDATE` | Update Project       |
|                                                   |          |                      |

- ## /adduser

- This endpoint expects the request body to contain the user information. If the user does not already exist in MongoDB, it inserts a new user object containing \_id, username, email, lists object and projects array into the "Users" collection. The response will have a status of 200 and a message indicating that a new user has been created.If the user already exists in the database, the handler will return a response with a status of 200 and a message indicating that the user is already logged in.

- ## /addtask
- this endpoints expects the request body to contain the date, user, and input properties. It also generates a unique identifier (index) for each task using the uuidv4 package.

- It queries the "Users" collection to find the user with the given ID. If the user is found, it creates a copy of the user's existing lists object.

- If the date already exists in the user's lists, it adds the new task to the existing date object. Otherwise, it creates a new date object with the task.

- The handler then updates the user's lists with the modified lists object in the database.

- If the update is successful, a response with a status of 200 and a message indicating that the list has been updated is returned.

- ## /deletetask/:date/:user/:index
- It finds the user with the given ID. If the user is found, it creates a copy of the user's existing lists object. Then it attemps to delete the task from the lists object by accessing the date and index properties. If the task is successfully deleted, the modified lists object is saved.The handler then updates the user's lists with the modified lists object in the database.If the update is successful, a response with a status of 200 and a message indicating that the list has been deleted is returned.

- ## /tasklist/:date/:user
- The handle queries the "Users" collection to find the user with the given ID. If the user is found, it retrieves the task list for the specified date from the user's lists objectIf the task list does not exist for the specified date, a response with a status of 404 and a message indicating that the date was not found is returned.
  If the task list exists, a response with a status of 200 and the task list data is returned.

- ## /updatetask
- The updateTask handler expects the request body to contain the date, user, input, and index properties, representing the date of the task, the user ID, the updated task input, and the index of the task to update, respectively. It then queries the "Users" collection to find the user with the given ID. If the user is found, it creates a copy of the user's existing lists object. The handler updates the task in the lists object by accessing the date, index, and input properties. The handler then updates the user's lists with the modified lists object in the database. If the update is successful, a response with a status of 200 and a message indicating that the list has been updated is returned.

- ## /deleteTask/:date/:user/:index
- The deleteTask expects the request URL parameters to contain the user, date, and index values, representing the user ID, the date of the task, and the task index to delete, respectively.The handler attempts to delete the task from the lists object by accessing the date and index properties. If the task is successfully deleted, the modified lists object is saved.

- ## /getprojects/:user
- The getProjects expects the request URL parameters to contain the user value, representing the user ID. If the user is found, it retrieves all the projects associated with the user from the Projects array.

- ## /getProject/:user/:projectId
- The getProject handler expects the request URL parameters to contain the user and projectId values, representing the user ID and the ID of the project to retrieve, respectively.If the user is found, it retrieves the project data for the specified project ID from the user's Projects array.
- ## /addProject
- The addProject handler expects the request body to contain the user, title, dueDate, description, and taskData properties, representing the user ID, project title, due date, project description, and task data, respectively. It also generates a unique identifier (index) for each project using the uuidv4 package.If the user is found, it creates a copy of the user's existing Projects object. The handler adds a new project to the Projects object with the generated index as the project ID and the provided project details.
- ## /deleteProject/:user/:projectId
- The deleteProject handler expects the request URL parameters to contain the user and projectId values, representing the user ID and the project ID to delete, respectively.If the user is found, it creates a copy of the user's existing Projects object.The handler attempts to delete the project from the Projects object by using the delete operator on the specified projectId.The handler then updates the user's Projects with the modified Projects object in the database.
- ## /updateproject
- The updateProject expects the request body to contain the user, projectId, title, description, status, dueDate, and taskStatus properties, representing the user ID, project ID, updated project title, updated project description, updated project status, updated project due date, and updated task status, respectively.The handler updates the project in the Projects object with the provided updated project details.The handler then updates the user's Projects with the modified Projects object in the database.

# User Collection in MongoDB

```js
{
  _id_:"user_email",
 username: "user_name",
 email: "user_email",
  //Lists Object
  lists:{
    date:{
      shareWith:["user1", "user2", "user3"],
      task:[
        {id:"description"}
      ]
    }
  }
    Projects:[{
      title:"Painting",
      dueDate:"Friday december 2nd",
      description:"Painting Smith's House",
      members:["user1", "user2", "user3"],
      status:'done',
    taskStatus:{
{"requested":{
"name":"Requested",
"items":[
  {"id":{"$numberInt":"6"},
    "content":"Required Appliances "}
    ]}}
 {"toDo": {
    name: "To do",
    items: []
   }},
    {"inProgress": {
    name: "In Progress",
    items: []
    }},
       { "done": {
    name: "Done",
    items: []
  }}
 }}]
  }

```

```

```
