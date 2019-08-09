
function showBoardBoardDialog(id=null){
    if(dragItem!=null && ( event.srcElement==dragItem[0] || event.srcElement.parentNode == dragItem[0]))return; //stop drag-click

    if(id == null)
        id = getBId(event.srcElement.parentNode);
    
    loadBoardId(id);
}

function listTitleClicked(){
    let titleText = event.srcElement;
    $(titleText).focus();

    try{
        document.execCommand('selectAll',false,null);
    }catch(e){}

    //can only be clicked while as div, so turn to input
//    titleText.onclick = null;
    
//    $(titleText).html("");
//    titleText.outerHTML = titleText.outerHTML.replace('<div','<input').replace('</div>','</input>');
//    $(titleText).prop("readonly",false);
console.log('Title click');
}
function listTitleBlur(){
    let titleText = event.srcElement;
    //can only be blur while as input, so turn to div
//    titleText.onclick = ()=>{listTitleClicked();};
//    titleText.onblur = null;
//    $(titleText).prop("readonly",true);
//    $(titleText).html(titleText.value);
//    titleText.outerHTML = titleText.outerHTML.replace('<input','<div').replace('</input>','</div>');
console.log('Title blur');
}

function newReferenceBtn(){
    let refer = window.prompt("Write/Paste id of board to reference:");

    if(refer==null)return;
    if(project.allBoards[refer] == null){alert("ID doesn't exist :(");return;}
    if(project.allBoards[refer].type == boardTypes.List){alert("Cant embed lists into boards.");return;}
/*
    if(board == ""){
        project.allBoards[refer].attributes['onMain'] = true;
        
        drawMain();
    }else{
  */
        let lst = event.srcElement.parentNode.parentNode.parentNode;
        let lstId = getBId(lst);

        project.allBoards[lstId].content.push(refer);

        clearBoards(lst);
        loadList(lst,lstId);
    //}

    
    project.allBoards[refer].attributes['references']++;

    saveAll();

    hideOptionsDialog();
}
