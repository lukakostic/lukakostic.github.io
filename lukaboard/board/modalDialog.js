function showTextBoardDialog(){
    var textBtn = event.srcElement;
    var brd = allBoards[textBtn.parentNode.getAttribute('data-id')];

    if(brd==null) alert('Text board modal: brd == null');

    $('#textBoardDialogTitle').val(brd.name);
    let text = $('#textBoardDialogText');
    text.val(brd.content);
    let modal = $('#textBoardDialog');
    modal[0].setAttribute('data-id',brd.id);
    modal.modal('show');

    //can do without timeout, but set timeout to like 0.8 seconds if you add 'modal fade' instead of just 'modal'
    setTimeout(()=>{
        expandInput(text[0]);
        document.getElementById('textBoardDialogTitle').select();
    },10);
}

function showBoardBoardDialog(id=null){
    if(id == null)
        id = event.srcElement.parentNode.getAttribute('data-id');
    
    window.location.href = "https://lukakostic.com/lukaboard/board/?d="+dbx.access+"?b="+id;
}

function optionsBtn(idEl = null){
    optionsElement = event.srcElement;
    if(idEl == null)idEl = event.srcElement.parentNode;

    let modal = $('#optionsDialog');
    //modal[0].setAttribute('data-id',idEl.getAttribute('data-id'));
    modal.modal('show');
}

function hideOptionsBtn(){
    let modal = $('#optionsDialog');
    modal.modal('hide');
}

function referenceBtn(){
    let refer = window.prompt("Write/Paste id of board to reference:");

    if(refer==null)return;
    if(allBoards[refer] == null){alert("ID doesn't exist :(");return;}
    if(allBoards[refer].type == boardTypes.List){alert("Cant embed lists into boards.");return;}

    if(board == ""){
        allBoards[refer].attributes['onMain'] = true;
        
        drawMain();
    }else{
        let lst = event.srcElement.parentNode.parentNode.parentNode;
        let lstId = lst.getAttribute('data-id');

        allBoards[lstId].content.push(refer);

        clearBoards(lst);
        loadList(lst,lstId);
    }

    
    allBoards[refer].attributes['references']++;

    saveAll();

    hideOptionsBtn();
}

function getElementIndex(node) {
    var index = 0;
    while ( (node = node.previousElementSibling) ) {
        index++;
    }
    return index;
}

function removeClicked(){
    let idEl = optionsElement.parentNode;
    let isBoard = idEl.classList.contains('board');
    if(isBoard == false) idEl = idEl.parentNode;

    let id = idEl.getAttribute('data-id');

    if(allBoards[id].attributes['references']<=1 && confirm('This is the last reference to this board, really remove it? (Will delete the board)')==false)return;

    if(isBoard){
        let ind = getElementIndex(idEl)-1;

        console.log('removed ind '+ ind);

        allBoards[idEl.parentNode.getAttribute('data-id')].content.splice(ind,1);
    }else{
        //is List
        if(board == ""){
            delete allBoards[id].attributes['onMain']; 
        }else{
            let ind = getElementIndex(idEl);

            console.log('removed ind '+ ind);

            allBoards[board].content.splice(ind,1);
        }
    }
    
    allBoards[id].attributes['references']--;
    
    if(allBoards[id].attributes['references']<=0)
        Board.deleteBoardById(id);

    saveAll();

    hideOptionsBtn();
    clearLists();
    draw();
}

function deleteClicked(){
    if(confirm('Really delete this board, all references to it and its content (content will be removed, not deleted)?')==false)return;

    let idEl = optionsElement.parentNode;
    let isBoard = idEl.classList.contains('board');
    if(isBoard == false) idEl = idEl.parentNode;

    let id = idEl.getAttribute('data-id');
    
    Board.deleteBoardById(id);

    //go thru every board and remove the id from contents
    let ids = Object.keys(allBoards);

    for(let i = 0; i < ids.length; i++){
        if(allBoards[ids[i]].type == boardTypes.Text) continue;

        let ind = allBoards[ids[i]].content.indexOf(id);
        while(ind!=-1){
            allBoards[ids[i]].content.splice(ind,1);
            ind = allBoards[ids[i]].content.indexOf(id);
        }
    }

    saveAll();
    
    hideOptionsBtn();
    clearLists();
    draw();
}

function copyIdClicked(){
    let id = optionsElement.parentNode.getAttribute('data-id');
    window.prompt("Copy to clipboard: Ctrl+C, Enter", id);
    
    hideOptionsBtn();
}

function referencesDialog(){
    
    hideOptionsBtn();

    var Btn = optionsElement;
    
    if(Btn.parentNode.getAttribute('data-id') == ""){alert('No references');return;}
    var brd = allBoards[Btn.parentNode.getAttribute('data-id')];

    if(brd.attributes['references'] == 1){alert('This is the only reference');return;}

    let listReferences = [];
    
    //go thru every board get references
    let ids = Object.keys(allBoards);

    for(let i = 0; i < ids.length; i++){
        if(allBoards[ids[i]].type == boardTypes.List){
            if(allBoards[ids[i]].content.includes(brd.id))
                listReferences.push(ids[i]);
        }
    }

    let boardReferences = {};

    //go thru each board, see if it includes any of the listReferences
    for(let i = 0; i < ids.length; i++){
        if(allBoards[ids[i]].type == boardTypes.Board){
            for(let j = 0; j < listReferences.length; j++){
                if(allBoards[ids[i]].content.includes(listReferences[j]))
                    boardReferences[ids[i]] = null; //just some value
            }
        }
    }

    
    let btnTemplate = document.getElementById('referencesDialogBtn').content.firstElementChild;
    let list = document.getElementById('referencesDialogList');

    //clear previous buttons
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    let modal = $('#referencesDialog');
    let brds = Object.keys(boardReferences);

    for(let i = 0; i < brds.length; i++){
        let el = btnTemplate.cloneNode(true);
        //modal[0].appendChild(el);

        list.appendChild(el);

        el.setAttribute('data-id',brds[i]);
        $(el).text('List(s) on board ' + brds[i]);
    }

    modal[0].setAttribute('data-id',brd.id);
    modal.modal('show');


}

function referencesDialogBtn(){
    showBoardBoardDialog(event.srcElement.getAttribute('data-id'));
}