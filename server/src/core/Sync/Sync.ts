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
        let listDatabase = new ListFiles();
        let listNew = new ListFiles();

        for (let struct of structs) {
            let structInDatabase = JSON.parse(struct);
            let structNow = JSON.parse(dump);

            Sync.extractFiles(structInDatabase, listDatabase);
            Sync.extractFiles(structNow, listNew);
        }
        let filesToUpload = Sync.compareCheckSumsInFileLists(listDatabase, listNew);
    }

    static compareCheckSumsInFileLists(list1: ListFiles, list2: ListFiles) {
        let fileListIds = [];
        for (let key1 in list1.files) {
            let size1 = list1.files[key1];
            for (let key2 in list2.files) {
                let size2 = list2.files[key2];
                if (key1 !== key2) continue;
                else if (size1 !== size2) {
                    fileListIds.push(key1);
                }
            }
        }
        return fileListIds;
    }

    static extractFiles(dump: Dump | File | Folder, list: ListFiles) {
        if (dump instanceof Folder && dump.content && dump.content.length) {
            for (let data of dump.content) {
                if (data instanceof File) {
                    list.add(data);
                }
                else if (data instanceof Folder && data.content && data.content.length) {
                    Sync.extractFiles(data, list);
                }
            }
        }
        return null;
    }
}