function showTextBoardDialog(){
    var textBtn = event.srcElement;
    var brd = Board.fromId(textBtn.getAttribute('data-id'));
    $('#textBoardDialogTitle').val(brd.name);
    let text = $('#textBoardDialogText');
    text.val(brd.content);
    $('#textBoardDialog').modal('show');

    //can do without timeout, but set timeout to like 0.8 seconds if you add 'modal fade' instead of just 'modal'
    setTimeout(()=>{expandInput(text[0]);},10);
}