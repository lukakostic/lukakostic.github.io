
let optionsElement = null;


function showOptionsDialog(idEl = null){
    optionsElement = event.srcElement;
    if(idEl == null)idEl = event.srcElement.parentNode;

    let modal = $('#optionsDialog');
    //modal[0].setAttribute('data-id',idEl.getAttribute('data-id'));
    modal.modal('show');
}

function showSeeReferencesDialog(){
    
    hideOptionsDialog();

    var Btn = optionsElement;
    
    if(getBId(Btn.parentNode) == ""){alert('No references');return;}
    var brd = project.allBoards[getBId(Btn.parentNode)];

    if(brd.attributes['references'] == 1){alert('This is the only reference');return;}

    let listReferences = [];
    
    //go thru every board get references
    let ids = Object.keys(project.allBoards);

    for(let i = 0; i < ids.length; i++){
        if(project.allBoards[ids[i]].type == boardTypes.List){
            if(project.allBoards[ids[i]].content.includes(brd.id))
                listReferences.push(ids[i]);
        }
    }

    let boardReferences = {};

    //go thru each board, see if it includes any of the listReferences
    for(let i = 0; i < ids.length; i++){
        if(project.allBoards[ids[i]].type == boardTypes.Board){
            for(let j = 0; j < listReferences.length; j++){
                if(project.allBoards[ids[i]].content.includes(listReferences[j]))
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

        setBId(el, brds[i]);
        
        if(brds[i] == "")
            $(el).text('Main Board');
        else
            $(el).text('List(s) on Board ' + brds[i]);
    }

    setBId(modal[0], brd.id);
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

    let id = getBId(idEl);

    if(project.allBoards[id].attributes['references']<=1 && confirm('This is the last reference to this board, really remove it? (Will delete the board)')==false)return;

    if(isBoard){
        let ind = getElementIndex(idEl)-1;

        console.log('removed ind '+ ind);

        project.allBoards[getBId(idEl.parentNode)].content.splice(ind,1);
    }else{
        //is List
        //if(board == ""){
        //    delete project.allBoards[id].attributes['onMain']; 
        //}else{
            let ind = getElementIndex(idEl);

            console.log('removed ind '+ ind);

            project.allBoards[board].content.splice(ind,1);
        //}
    }
    
    project.allBoards[id].attributes['references']--;
    
    if(project.allBoards[id].attributes['references']<=0)
        Board.deleteBoardById(id);

    saveAll();

    hideOptionsDialog();
    clearLists();
    draw();
}

function deleteClicked(){
    if(confirm('Really delete this board, all references to it and its content (content will be removed, not deleted)?')==false)return;

    let idEl = optionsElement.parentNode;
    let isBoard = idEl.classList.contains('board');
    if(isBoard == false) idEl = idEl.parentNode;

    let id = getBId(idEl);
    
    Board.deleteBoardById(id);



    saveAll();
    
    hideOptionsDialog();
    clearLists();
    draw();
}

function copyIdClicked(){
    let id = getBId(optionsElement.parentNode);
    window.prompt("Copy to clipboard: Ctrl+C, Enter", id);
    
    hideOptionsDialog();
}


function referencesDialogBtn(){
    showBoardBoardDialog(getBId(event.srcElement));
}