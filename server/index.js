const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const { auth } = require("./authMiddleware");
const SECRET_KEY = "MY-SECRET-KEY";
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//👇🏻 holds all the existing users
const users = [];
//👇🏻 generates a random string as ID
const generateID = () => Math.random().toString(36).substring(2, 10);

app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  const id = generateID();
  //👇🏻 ensures there is no existing user with the same credentials
  const result = users.filter(
    (user) => user.email === email && user.password === password
  );
  //👇🏻 if true
  if (result.length === 0) {
    const newUser = { id, email, password };
    //👇🏻 adds the user to the database (array)
    users.push(newUser);
    //👇🏻 returns a success message
    return res.json({
      message: "Account created successfully!",
    });
  }
  //👇🏻 if there is an existing user
  res.json({
    error_message: "User already exists",
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  //👇🏻 checks if the user exists
  let result = users.filter(
    (user) => user.email === email && user.password === password
  );
  //👇🏻 if the user doesn't exist
  if (result.length !== 1) {
    return res.json({
      error_message: "Incorrect credentials",
    });
  }
  //👇🏻 Returns the id if successfuly logged in

  token = jwt.sign(
    {
      type: "JWT",
      id: result[0].id,
      email: email,
    },
    SECRET_KEY
  );
  res.json({
    message: "Login successfully",
    token: token,
  });
});

threadList = [];

app.post("/api/todos", auth, async (req, res) => {
  const { thread } = req.body;
  const token = req.headers.authorization;
  const email = req.decoded.email;
  const threadId = generateID();

  threadList.unshift({
    id: threadId,
    title: thread,
    email: email,
    replies: [],
    likes: [],
  });

  const result = threadList.filter((thread) => thread.email === email);

  //👇🏻 Returns a response containing the posts
  res.json({
    message: "Thread created successfully!",
    threads: result,
    token: token,
  });

  //console.log({ thread, userId, threadId });
});

app.put("/api/todos", auth, async (req, res) => {
  const { id, todo } = req.body;
  console.log(id);
  console.log(todo);
  const token = req.headers.authorization;
  const email = req.decoded.email;

  result = threadList.filter((thread) => thread.id === id);
  threadList = threadList.filter((thread) => thread.id !== id);
  console.log(result[0]);
  result[0].title = todo;
  threadList.unshift({
    id: result[0].id,
    title: result[0].title,
    email: result[0].email,
    replies: result[0].replies,
    likes: result[0].likes,
  });

  const List = threadList.filter((thread) => thread.email === email);

  res.json({
    message: "The item was updated successfully!",
    threads: List,
    token: token,
  });
});

app.delete("/api/todos", auth, async (req, res) => {
  const { threadId } = req.body;
  const token = req.headers.authorization;
  const email = req.decoded.email;

  threadList = threadList.filter((thread) => thread.id !== threadId);

  res.json({
    message: "Deleted successfully!",
    threads: threadList,
    token: token,
  });
});

app.post("/api/create/thread", auth, async (req, res) => {
  const { thread } = req.body;
  const token = req.headers.authorization;
  const email = req.decoded.email;
  const threadId = generateID();

  threadList.unshift({
    id: threadId,
    title: thread,
    email: email,
    replies: [],
    likes: [],
  });

  const result = threadList.filter((thread) => thread.email === email);

  //👇🏻 Returns a response containing the posts
  res.json({
    message: "Thread created successfully!",
    threads: result,
    token: token,
  });

  //console.log({ thread, userId, threadId });
});

app.post("/api/thread/like", auth, (req, res) => {
  //👇🏻 accepts the post id and the user id
  const { threadId } = req.body;
  const token = req.headers.authorization;
  const email = req.decoded.email;
  //👇🏻 gets the reacted post
  const result = threadList.filter((thread) => thread.id === threadId);
  //👇🏻 gets the likes property
  const threadLikes = result[0].likes;
  //👇🏻 authenticates the reaction
  const authenticateReaction = threadLikes.filter((email) => email === email);
  //👇🏻 adds the users to the likes array
  if (authenticateReaction.length === 0) {
    threadLikes.push(email);
    return res.json({
      message: "You've completed the item!",
      token: token,
    });
  }
  //👇🏻 Returns an error user has reacted to the post earlier
  res.json({
    error_message: "You've already completed the item!",
  });
});

app.post("/api/thread/replies", (req, res) => {
  const { id } = req.body;
  const result = threadList.filter((thread) => thread.id === id);
  res.json({
    replies: result[0].replies,
    title: result[0].title,
  });
});

app.post("/api/all/threads", auth, (req, res) => {
  console.log(req.headers.authorization);
  const email = req.decoded.email;
  console.log(email);
  const result = threadList.filter((thread) => thread.email === email);
  res.json({
    threads: result,
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
