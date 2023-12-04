const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./configs/connectdb");
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");

const app = express();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

connectDB(DATABASE_URL);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
