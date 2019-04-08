class Board{
    constructor(name, isBoard, content){
        this.name = name;
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
}