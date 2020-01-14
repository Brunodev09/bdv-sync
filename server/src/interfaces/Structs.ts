export class File {
    type: string;
    public name: string;
    public size: number;
    public lastUpdated: Date;
    public lastUpdater: Date;
    constructor() {
        this.type = "file";
    }
}

export class Folder {
    type: string;

    public name: string;
    public size: number;
    public lastUpdated: Date;
    public lastUpdater: Date;
    public content: File[] & Folder[] | File[] | Folder[];
    constructor() {
    }
}

export class ListFiles {
    files: Map<string, number>
    constructor() {
        this.files = new Map();
    }

    add(file: File) {
        this.files.set(file.name, file.size);
    }
    
    addAll(files: File[]) {
        for (let file of files) {
            this.files.set(file.name, file.size);
        }
    }
}