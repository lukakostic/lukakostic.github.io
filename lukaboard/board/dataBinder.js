function boardTitleChanged(){
    //alert("Board title changed");
    board.name = event.srcElement.value;

    loadAllBoardsByDataId(board);

    saveAll();
}

function boardDescriptionChanged(){
    //alert("Board title changed");
    board.attributes['description'] = event.srcElement.value;

    loadAllBoardsByDataId(board);

    saveAll();
}

function listTitleChanged(){
    //alert("List title changed");
    let listId = event.srcElement.parentNode.parentNode.getAttribute('data-id');
    let lst = Board.fromId(listId);
    lst.name = event.srcElement.value;

    saveAll();
}

function textTitleChanged(){
    //alert("Text title changed");
    let listId = document.getElementById('textBoardDialog').getAttribute('data-id');
    let brd = Board.fromId(listId);
    brd.name = event.srcElement.value;

    loadAllBoardsByDataId(brd);

    saveAll();
}

function textDescriptionChanged(){
    //alert("Text description changed");
    let listId = document.getElementById('textBoardDialog').getAttribute('data-id');
    let brd = Board.fromId(listId);
    brd.content = event.srcElement.value;

    loadAllBoardsByDataId(brd);

    saveAll();
}


function loadTextBoard(textBoardEl, brd){
    textBoardEl.setAttribute('data-id', brd.id);
    $(textBoardEl.getElementsByClassName('textBtn')[0]).contents()[0].nodeValue = brd.name;
    
    if(brd.content.length>0) 
        textBoardEl.getElementsByClassName('descriptionIcon')[0].classList.remove('d-none');
    else 
        textBoardEl.getElementsByClassName('descriptionIcon')[0].classList.add('d-none');
}

function loadBoardBoard(boardBoardEl, brd){
    boardBoardEl.setAttribute('data-id', brd.id);
    $(boardBoardEl.getElementsByClassName('textBtn')[0]).contents()[0].nodeValue = brd.name;
}

function loadAllBoardsByDataId(brd){
    let boardEls = document.getElementsByClassName('board');
 
    for(let i = 0; i < boardEls.length; i++){
        if(boardEls[i].getAttribute('data-id')==brd.id){
            if(brd.type == 'T')
             loadTextBoard(boardEls[i],brd);
            else if(brd.type == 'B')
             loadBoardBoard(boardEls[i],brd);
        }
    }
}












/*
class DataBinder {
    constructor() {
        this.bindings = [];
        this.interval = setInterval(()=>{
            update();
        },1);
    }

    update(){
        for(let i = 0; i < this.bindings.length; i++){
            
        }
    }


    //ways = 0 : twoway, ways = 1 : html to js, ways = 2 : js to html
    bindData(element, elementField, jsObject, jsObjectField, ways = 0){
        let binding = {};

        binding['element'] = element;
        binding['elementField'] = elementField;
        binding['jsObject'] = jsObject;
        binding['jsObjectField'] = jsObjectField;

        this.bindings.append(binding);
    }
    
    //ways = 0 : twoway, ways = 1 : html to js, ways = 2 : js to html
    unbindData(element, elementField, jsObject, jsObjectField, ways = 0){
        for(let i = 0; i < this.bindings.length; i++){
            if(this.bindings[i]['element'] == element && this.bindings[i]['elementField'] == elementField && this.bindings[i]['jsObject'] == jsObject && this.bindings[i]['jsObjectField'] == jsObjectField){
                this.bindings.splice(i,1);
            }
        }
    }


    unbindAll(){
        this.bindings = [];
    }
}
*/