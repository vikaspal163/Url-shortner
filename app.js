import express from "express";
import { shortenedRoutes } from "./routes/shortner.routes.js";
import { env } from "./config/env.js";

const app = express();

const PORT = env.PORT;

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))

app.set("view engine","ejs");

app.use(shortenedRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
