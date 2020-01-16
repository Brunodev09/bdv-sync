import { File, Folder } from "./Structs";

export default interface Dump {
    size: number;
    type: "file" | "folder";
    content?: File[] | Folder[];
    name: string;
    channel: number;
    lastUpdated: Date;
}