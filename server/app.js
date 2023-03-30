import express from "express";
import cookies from 'cookie-parser'
import morgan from "morgan";
import { connectionDB } from './database.js'
import path from 'path'
const __dirname = path.dirname(new URL(import.meta.url).pathname);
export const dirname = __dirname.substring(1);
import bodyParser from "body-parser";
import postRoutes from "./routes/img.routes.js";
import authRoutes from "./routes/auth.routes.js";
import fileUpload from "express-fileupload";
import cors from 'cors'
export const app = express();

app.use(express.static('server/public'))
// USANDO EJS COMO MOTOR DE PLANTILLAS 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
/////////////////////////////////////////////
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(cookies())
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "server/upload",
  })
);
// IMPORTANDO RUTAS DE POST

// USANDO RUTAS DE POST
app.use(postRoutes);
app.use(authRoutes);

