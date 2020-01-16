import User from '../models/User';

class CacheSnippet {
    users: Map<string, any>
    sockets: Map<string, any>
    syncs: Map<string, string[]>;
    constructor() {
        this.users = new Map();
        this.sockets = new Map();
        this.syncs = new Map();
    }

    retrieve(where: string, key: string) {
        return this.sort(where).get(key);
    }

    add(where: string, key: string, what: any) {
        if (this.sort(where) && this.sort(where).get(key)) {
            if (this.sort(where).get(key) instanceof Array) {
                return this.push(this.sort(where).get(key), what);
            }
            return this.sort(where).set(key, what);
        }
        return null;
    }

    push(where: any[], toPush: any) {
        if (where && where.length > 50) {
            where = [];
        }
        where.push(toPush);
        return where;
    }

    delete(where: string, key: string) {
        this.sort(where).delete(key);
        return true;
    }

    async populate(where: string, key: string) {
        let users = await User.find();
        if (!users) return;
        for (let user of users) {
            this.sort(where).set(key, user);
        }
    }

    sort(where: string) {
        switch (where) {
            case "user":
                return this.users;
            case "socket":
                return this.sockets;
            case "sync":
                return this.syncs;    
        }
    }
}


export default new CacheSnippet();