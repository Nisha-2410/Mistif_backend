const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.use(cors());

const compareRoute = require("./routes/Compare");
app.use("/", compareRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
