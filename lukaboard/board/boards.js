class Board {
    constructor(name, text, isBoard, parent, children, id = "") {
        this.name = name; //string
        this.text = text; //string
        this.isBoard = isBoard; //bool
        this.parent = parent; //string
        this.children = children; //array of ids [string]
        this.id = id; //string
        if (id == "") this.id = makeId(8);
    }

    static clone(toClone) {
        return new Board(toClone.name,toClone.text,toClone.isBoard,toClone.parent,  toClone.children);
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
        return fromId(boardId);
    }

    static fromId(id){
        for(var i = 0; i < allBoards.length; i ++)
            if(allBoards[i].id == id)
                return allBoards[i];
        return null;
    }

    static makeId(maxLength) {
        let id = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

        var unique = false;

        //find unique id
        while(unique == false){

        //let length = Math.floor(Math.random() * maxLength) + 1;
        let length = maxLength;

        //generate rand chars and append
        for (var i = 0; i < length; i++)
            id += possible.charAt(Math.floor(Math.random() * possible.length));

        unique = true;
        for(var i = 0; i < allBoards.length; i ++)
            if(allBoards[i].id == id){unique == false; break;}
        

        }

        return id;
    }
}