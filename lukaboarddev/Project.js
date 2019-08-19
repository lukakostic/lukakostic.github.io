class Project {
    constructor(name = "",version = -1){
        this.name = name;
        this.version = version;
<<<<<<< HEAD
        this.boards = {};
        this.tags = {};
        this.extensions = {};
        this.preferences = {
            'textEditorAutoSaveInterval': 30
=======
        this.allBoards = {};
        this.tags = {};
        this.extensions = {};
        this.preferences = {
            'manualSaveLoad': false
>>>>>>> fab8f27673e4fe7609f7768b5db5ccc2ef0126da
        };
    }
}