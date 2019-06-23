function showTextBoardDialog(){
    var textBtn = event.srcElement;
    textBtn.getAttribute('data-id');
    $('#textBoardDialogTitle').val("TITLE");
    let text = $('#textBoardDialogText');
    text.val("TEXT");
    $('#textBoardDialog').modal('show');

    //can do without timeout, but set timeout to like 0.8 seconds if you add 'modal fade' instead of just 'modal'
    setTimeout(()=>{expandInput(text[0]);},10);
}