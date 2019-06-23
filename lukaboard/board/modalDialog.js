function showTextBoardDialog(){
    var textBtn = event.srcElement;
    var brd = Board.fromId(textBtn.parentNode.getAttribute('data-id'));

    $('#textBoardDialogTitle').val(brd.name);
    let text = $('#textBoardDialogText');
    text.val(brd.content);
    let modal = $('#textBoardDialog');
    modal.data('id',brd.id);
    modal.modal('show');

    //can do without timeout, but set timeout to like 0.8 seconds if you add 'modal fade' instead of just 'modal'
    setTimeout(()=>{expandInput(text[0]);},10);
}