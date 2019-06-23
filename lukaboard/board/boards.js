class Board {
    constructor(type, name, content,  attributes = {}, id = "") {
        this.type = type;
        this.name = name; //string
        this.content = content; //text or array of ids [string]
        this.attributes = attributes; //object (isBoard,onMain,tags, etc.)
        this.id = id; //string
        if (id == "") this.id = Board.makeId(8);
    }

    static clone(toClone) {
        return new Board(toClone.type, toClone.name, toClone.content, toClone.attributes);
    }

    static fromUrl(url) {
        let boardId = "";
        
        //get id from url
        if (url.includes('?b=')) {
            for (let i = url.indexOf('?b=') + 3; i < url.length && url[i] != '?'; i++)
                boardId += url[i];
        }

        //if (boardId == "") return null;
        //else

        //Check if exists
        return Board.fromId(boardId);
    }

    static fromId(id){
        return allBoards[id];
    }

    static makeId(maxLength) {
        let id = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

        //find unique id
        while(true){

            id = "";
                
            //let length = Math.floor(Math.random() * maxLength) + 1;
            let length = maxLength;

            //generate rand chars and append
            for (var i = 0; i < length; i++)
                id += possible.charAt(Math.floor(Math.random() * possible.length));

                
            if(allBoards[id] == null)break;

        }

        return id;
    }
}