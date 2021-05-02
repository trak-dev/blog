const express = require("express");
const articleRouter = require("./routes/articles");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Article = require("./models/article");

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

mongoose.connect(
  "mongodb+srv://ypicaud:ypicaud@cluster0.npchi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});
app.use("/articles", articleRouter);
app.listen(5000);
