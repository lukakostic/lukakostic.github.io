function boardTitleChanged(){
    //alert("Board title changed");
    allBoards[board].name = event.srcElement.value;

    loadAllBoardsByDataId(board);

    saveAll();
}

function boardDescriptionChanged(){
    //alert("Board title changed");
    allBoards[board].attributes['description'] = event.srcElement.value;

    loadAllBoardsByDataId(board);

    saveAll();
}

function listTitleChanged(){
    //alert("List title changed");
    let listId = event.srcElement.parentNode.parentNode.getAttribute('data-id');
    let lst = allBoards[listId];
    lst.name = event.srcElement.value;

    saveAll();
}

function textTitleChanged(){
    //alert("Text title changed");
    let brdId = document.getElementById('textBoardDialog').getAttribute('data-id');
    let brd = allBoards[brdId];
    brd.name = event.srcElement.value;

    loadAllBoardsByDataId(brdId);

    saveAll();
}

function textDescriptionChanged(){
    //alert("Text description changed");
    let brdId = document.getElementById('textBoardDialog').getAttribute('data-id');
    let brd = allBoards[brdId];
    brd.content = event.srcElement.value;

    loadAllBoardsByDataId(brdId);

    saveAll();
}


function loadTextBoard(textBoardEl, brd){
    if (typeof brd === 'string' || brd instanceof String) brd = allBoards[brd];

    textBoardEl.setAttribute('data-id', brd.id);
    $(textBoardEl.getElementsByClassName('textBtn')[0]).contents()[1].nodeValue = brd.name;
    
    if(brd.content.length>0) 
        textBoardEl.getElementsByClassName('descriptionIcon')[0].classList.remove('d-none');
    else 
        textBoardEl.getElementsByClassName('descriptionIcon')[0].classList.add('d-none');
}

function loadBoardBoard(boardBoardEl, brd){
    if (typeof brd === 'string' || brd instanceof String) brd = allBoards[brd];

    boardBoardEl.setAttribute('data-id', brd.id);
    $(boardBoardEl.getElementsByClassName('textBtn')[0]).contents()[0].nodeValue = brd.name;
}

function loadList(listEl, brd){
    if (typeof brd === 'string' || brd instanceof String) brd = allBoards[brd];

    listEl.getElementsByClassName("title-text")[0].value = brd.name;
    listEl.setAttribute('data-id', brd.id);

}

function loadAllBoardsByDataId(brdId){
    let boardEls = document.getElementsByClassName('board');
 
    for(let i = 0; i < boardEls.length; i++){
        if(boardEls[i].getAttribute('data-id')==brdId){
            if(brd.type == 'T')
             loadTextBoard(boardEls[i],brdId);
            else if(brd.type == 'B')
             loadBoardBoard(boardEls[i],brdId);
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