
let optionsElement = null;


function showOptionsDialog(idEl = null){
    optionsElement = event.srcElement;
    if(idEl == null)idEl = event.srcElement.parentNode;

    let modal = $('#optionsDialog');
    //modal[0].setAttribute('data-id',idEl.getAttribute('data-id'));
    modal.modal('show');
}

function showBoardExtrasDialog(){
    extrasSelected = findFirstBoardId(optionsElement);
    if(extrasSelected == null)alert('Extras selected is null??');

    showExtras();
}

function showSeeReferencesDialog(){

    hideOptionsDialog();

    var Btn = optionsElement;
<<<<<<< HEAD
=======
    
    if(getBId(Btn.parentNode) == ""){alert('No references');return;}
    var brd = project.allBoards[getBId(Btn.parentNode)];
>>>>>>> fab8f27673e4fe7609f7768b5db5ccc2ef0126da

    if(getDataId(Btn.parentNode) == ""){alert('No references');return;}
    var brd = getDataId(Btn.parentNode);

    if(getBrdAttr(brd,'references') == 1){alert('This is the only reference');return;}

    let listReferences = [];

    //go thru every board get references
<<<<<<< HEAD
    let ids = Object.keys(project.boards);

    for(let i = 0; i < ids.length; i++){
        if(project.boards[ids[i]].type == boardTypes.List){
            if(project.boards[ids[i]].content.includes(brd))
=======
    let ids = Object.keys(project.allBoards);

    for(let i = 0; i < ids.length; i++){
        if(project.allBoards[ids[i]].type == boardTypes.List){
            if(project.allBoards[ids[i]].content.includes(brd.id))
>>>>>>> fab8f27673e4fe7609f7768b5db5ccc2ef0126da
                listReferences.push(ids[i]);
        }
    }

    let boardReferences = {};

    //go thru each board, see if it includes any of the listReferences
    for(let i = 0; i < ids.length; i++){
<<<<<<< HEAD
        if(project.boards[ids[i]].type == boardTypes.Board){
            for(let j = 0; j < listReferences.length; j++){
                if(project.boards[ids[i]].content.includes(listReferences[j]))
=======
        if(project.allBoards[ids[i]].type == boardTypes.Board){
            for(let j = 0; j < listReferences.length; j++){
                if(project.allBoards[ids[i]].content.includes(listReferences[j]))
>>>>>>> fab8f27673e4fe7609f7768b5db5ccc2ef0126da
                    boardReferences[ids[i]] = null; //just some value
            }
        }
    }


    let btnTemplate = getTemplateFChild('referencesDialogBtn');
    let list = EbyId('referencesDialogList');

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

        setDataId(el, brds[i]);

        if(brds[i] == "")
            $(el).text('Main Board');
        else
            $(el).text('List(s) on Board ' + brds[i]);
    }

    setDataId(modal[0], brd);
    modal.modal('show');


}

function hideOptionsDialog(){
    let modal = $('#optionsDialog');
    modal.modal('hide');
}

function removeClicked(){
    let idEl = optionsElement.parentNode;
    let isBoard = idEl.classList.contains('board');
    if(isBoard == false) idEl = idEl.parentNode;

    let id = getDataId(idEl);

<<<<<<< HEAD
    if(getBrdAttr(id,'references')<=1 && confirm('This is the last reference to this board, really remove it? (Will delete the board)')==false)return;
=======
    if(project.allBoards[id].attributes['references']<=1 && confirm('This is the last reference to this board, really remove it? (Will delete the board)')==false)return;
>>>>>>> fab8f27673e4fe7609f7768b5db5ccc2ef0126da

    if(isBoard){
        let ind = getElementIndex(idEl)-1;

        console.log('removed ind '+ ind);

<<<<<<< HEAD
        project.boards[getDataId(idEl.parentNode)].content.splice(ind,1);
    }else{
        //is List
        //if(board == ""){
        //    delete project.boards[id].attributes['onMain']; 
=======
        project.allBoards[getBId(idEl.parentNode)].content.splice(ind,1);
    }else{
        //is List
        //if(board == ""){
        //    delete project.allBoards[id].attributes['onMain']; 
>>>>>>> fab8f27673e4fe7609f7768b5db5ccc2ef0126da
        //}else{
            let ind = getElementIndex(idEl);

            console.log('removed ind '+ ind);

<<<<<<< HEAD
            project.boards[board].content.splice(ind,1);
        //}
    }
=======
            project.allBoards[board].content.splice(ind,1);
        //}
    }
    
    project.allBoards[id].attributes['references']--;
    
    if(project.allBoards[id].attributes['references']<=0)
        Board.deleteBoardById(id);
>>>>>>> fab8f27673e4fe7609f7768b5db5ccc2ef0126da

    project.boards[id].attributes['references']--;

    if(project.boards[id].attributes['references']<=0)
        Board.deleteBoardById(id);

    hideOptionsDialog();
    clearLists();
    draw();

    saveAll();
}

function deleteClicked(){
    if(confirm('Really delete this board, all references to it and its content (content will be removed, not deleted)?')==false)return;

    let idEl = optionsElement.parentNode;
    let isBoard = idEl.classList.contains('board');
    if(isBoard == false) idEl = idEl.parentNode;

    let id = getDataId(idEl);

    Board.deleteBoardById(id);


    hideOptionsDialog();
    clearLists();
    draw();

    saveAll();
}

function copyIdClicked(){
    let id = getDataId(optionsElement.parentNode);
    window.prompt("Copy to clipboard: Ctrl+C, Enter", id);

    hideOptionsDialog();
}


function referencesDialogBtn(){
    showBoardBoardDialog(getDataId(event.srcElement));
}