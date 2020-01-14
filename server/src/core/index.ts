import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve(__dirname, "../../.env") })

import Authentication from "../controllers/Authentication";
import StartServer from "./Server";

// This import will server the purpose of creating the Singleton.
import Cache from "./Cache";

(async () => {
    await Cache.populate("user", "email");
    //@ts-ignore
    const server = new StartServer([new Authentication()]);
})();

