import _ from "../../tools/Terminal";
import Channel from '../../models/Channel';
import User from '../../models/User';

import Cache from "../Cache";
import UUID from "uuid/v1";

export default class Sync {
    static async updateUserChannels(userId: string) {
        let _id = UUID();
        let user = await User.findById(userId);
        if (!user) {
            _.say(`No user found with the id ${userId} to synchronize!`, "red");
            return;
        }
        Cache.add("sync", _id, user.email);
        let structs = user.channelsFolderStructs;

        for (let struct of structs) {

        }
    }

}