import app from "./src/app.js";
import dotenv from "dotenv";
import connectDb from "./src/db.js";

dotenv.config()

const PORT = process.env.PORT || 3000

connectDb();

app.listen(PORT, ()=> {
    console.log(`listening on port ${PORT}`)
})