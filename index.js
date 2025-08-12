const express = require("express");
const app = express();
const port = 2004;
const ejs = require("ejs");

//middlewares
app.use(express.urlencoded());
app.set("view engine", "ejs");

let alluser = [];
let currentUser = null;
let todoList = [];
app.get("/", (request, response) => {
  response.send("Welcome to your node class on port");
  response.json({
    Users: [
      { id: "1", name: "Ugo", age: "12", food: "Akpu" },
      { id: "2", name: "Folarin", age: "22", food: "Iyan" },
      { id: "3", name: "Emmanuel", age: "20", food: "Spag" },
      { id: "4", name: "Ezekiel", age: "21", food: "Garri" },
      { id: "5", name: "Feranmi", age: "23", food: "Rice" },
      { id: "6", name: "Ayo", age: "20", food: "Beans" },
    ],
  });
});

app.get("/user", (request, response) => {
  // response.send("Welcome user")
  response.render("index", { name: "Ezekiel", gender: "male" });
});

app.get("/signup", (request, response) => {
  response.render("signup");
});

app.post("/user/signup", (req, res) => {
  console.log(req.body);
  alluser.push(req.body);
  res.redirect("/login");
  console.log(alluser);
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/user/login", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const existuser = alluser.find((user) => user.email == email);
  console.log(existuser);
  if (existuser && existuser.password == password) {
    console.log("login Seuccessful");
    currentUser = existuser;
    res.redirect("/dashboard");
  } else {
    console.log("invalid user.");
    res.redirect("/login");
  }
});

app.get("/dashboard", (req, res) => {
  // if (!currentUser) {
  //   return res.redirect("/login");
  // }
  res.render("dashboard", { user: currentUser, todo: todoList });
});
app.post("/dashboard", (req, res) => {
  const { subject, detail } = req.body;
  todoList.push({ subject, detail });
  res.redirect("/dashboard");
});

app.post("/todo/delete", (req, res) => {
  console.log(req.body);
  const { index } = req.body;
  todoList.splice(index, 1);
  res.redirect("/dashboard");
});

app.get ( "/edit/:index", (req, res)=> {
  console.log(req.params);
  const {index} = req.params
  const onetodo = todoList[index]
  console.log(onetodo);
  res.render("edit", {onetodo})
})

app.listen(port, () => {
  console.log(`App started at port ${port}`);
});
