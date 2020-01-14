import _ from "../../tools/Terminal";
import Channel from '../../models/Channel';
import Dump from "../../interfaces/Dump";
import Cache from "../Cache";
import UUID from "uuid/v1";

import { ListFiles, File, Folder } from "../../interfaces/Structs";

export default class Sync {
    static async updateUserChannels(userId: string, dump: string) {
        let _id = UUID();
        let channel = await Channel.find({"participants": userId});

        if (!channel || !channel.length) {
            _.say(`No channel found associated with the id ${userId} to synchronize!`, "red");
            return;
        }
        Cache.add("sync", _id, userId);
        let structs = channel.dump;
        let channelId = channel.id;
        let fileList = new ListFiles();


        for (let struct of structs) {
            let structInDatabase = JSON.parse(struct);
            let structNow = JSON.parse(dump);

            Sync.extractFiles(structInDatabase, fileList)
            Sync.extractFiles(structNow, fileList);
        }
    }

    static extractFiles(dump: Dump, list: ListFiles) {
        if (dump instanceof Folder) {
            
        }
        return null;
    }
}