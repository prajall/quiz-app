import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();
app.get("/", (req, res) => {
  return res.send("Server is working");
});

app.listen(process.env.PORT, async () => {
  console.log("Server is running on port", process.env.PORT);
});
