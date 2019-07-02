function showTextBoardDialog(){
    if(dragItem!=null && ( event.srcElement==dragItem[0] || event.srcElement.parentNode == dragItem[0]))return;

    var textBtn = event.srcElement;
    var brd = allBoards[getBId(textBtn.parentNode)];

    if(brd==null) alert('Text board modal: brd == null');

    $('#textBoardDialogTitle').val(brd.name);
    let text = $('#textBoardDialogText');
    text.val(brd.content);
    let modal = $('#textBoardDialog');
    setBId(modal[0],brd.id);
    modal.modal('show');

    //can do without timeout, but set timeout to like 0.8 seconds if you add 'modal fade' instead of just 'modal'
    setTimeout(()=>{
        expandInput(text[0]);
        EbyId('textBoardDialogTitle').select();
    },10);
}

function textBackClicked(){
    if(event.target.id != 'textBoardDialog') return;
    alert('closing back??');
}

function textTitleChanged(){
    //alert("Text title changed");
    let brdId = EbyId('textBoardDialog').getAttribute('data-id');
    allBoards[brdId].name = event.srcElement.value;

    loadAllBoardsByDataId(brdId);

    saveAll();
}

function textDescriptionChanged(){
    //alert("Text description changed");
    let brdId = EbyId('textBoardDialog').getAttribute('data-id');
    allBoards[brdId].content = event.srcElement.value;

    loadAllBoardsByDataId(brdId);

    saveAll();
}