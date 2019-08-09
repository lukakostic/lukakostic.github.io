class Project {
    constructor(name = "",version = -1){
        this.name = name;
        this.version = version;
        this.allBoards = {};
        this.tags = {};
        this.extensions = {};
        this.preferences = {
            'manualSaveLoad': false
        };
    }
}