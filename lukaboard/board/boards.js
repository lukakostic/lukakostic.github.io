class Board{
    constructor(name, parent, isBoard, content){
        this.name = name;
        this.parent = parent;
        this.isBoard = isBoard;
        this.content = content;
    }

    static clone(toClone){
        return new Board(toClone.name,toClone.isBoard,toClone.content);
    }

    toJson(){

    }

    convertJsonBoard(){
        if(this.isBoard){
            this.content = JSON.stringify(this.content);
        }else{
            this.content = JSON.parse(this.content);
        }
        this.isBoard = !this.isBoard;
    }

    convertPlainBoard(){
        if(this.isBoard){
            this.convertJsonBoard();
            this.name = this.content;
            this.content = null;
            return;
        }else{
            this.name = this.content;
            this.content = null;
        }
        this.isBoard = !this.isBoard;
    }

    static makeId(maxLength) {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

        let length = Math.floor(Math.random() * maxLength) + 1;

        for (var i = 0; i < length; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
    }
}