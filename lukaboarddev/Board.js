let boardTypes = {
    Text : 1,
    Board : 2,
    List : 3
};


class Board {
    constructor(type, name, content,  attributes = {}, id = null) {
        this.type = type;
        this.name = name; //string
        this.content = content; //text or array of ids [string]
        this.attributes = attributes; //object (isBoard,onMain,tags, etc.)
        this.id = id; //string
        if (id === null) this.id = Board.makeId(8);
    }

    static clone(toClone) {
        return new Board(toClone.type, toClone.name, toClone.content, toClone.attributes);
    }

    static idFromUrl(url) {
        let boardId = "";
        
        //get id from url
        if (url.includes('?b=')) {
            for (let i = url.indexOf('?b=') + 3; i < url.length && url[i] != '?'; i++)
                boardId += url[i];
        }

        //if (boardId == "") return null;
        //else

        //Check if exists
        return boardId;
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

                
            if(project.allBoards[id] == null)break;

        }

        return id;
    }

    //delete board by id, and dereference its children. Children get deleted if at 0 references.
    static deleteBoardById(id){
        if(id=="")return;
        if(project.allBoards[id].type != boardTypes.Text){
            for(let i = 0; i < project.allBoards[id].content.length; i++){
                project.allBoards[project.allBoards[id].content[i]].attributes['references']--;
                if(project.allBoards[project.allBoards[id].content[i]].attributes['references']<=0)
                    Board.deleteBoardById(project.allBoards[id].content[i]);
            }
        }

        delete project.allBoards[id];
        
        //go thru every board and remove the id from contents
        let ids = Object.keys(project.allBoards);

        for(let i = 0; i < ids.length; i++){
            if(project.allBoards[ids[i]].type == boardTypes.Text) continue;

            let ind = project.allBoards[ids[i]].content.indexOf(id);
            while(ind!=-1){
                project.allBoards[ids[i]].content.splice(ind,1);
                ind = project.allBoards[ids[i]].content.indexOf(id);
            }
        }

    }
}