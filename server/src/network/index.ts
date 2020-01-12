import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve(__dirname, "../../.env") })

import UserController from "../controllers/User";
import StartServer from "./Server";

//@ts-ignore
const server = new StartServer([new UserController()]);