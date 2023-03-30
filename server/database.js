import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

export const connectionDB = mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "DB_Sharp_app"
  })
  .then((db) => console.log("Conectado a la base de datos", db.connection.name))
  .catch((err) => console.log(err));