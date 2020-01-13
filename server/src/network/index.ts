import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve(__dirname, "../../.env") })

import Authentication from "../controllers/Authentication";
import StartServer from "./Server";

//@ts-ignore
const server = new StartServer([new Authentication()]);