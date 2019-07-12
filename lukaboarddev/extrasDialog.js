
function showExtrasDialog(idEl=null){
    //if(idEl == null)idEl = event.srcElement.parentNode;

    let modal = $('#extrasDialog');
    modal.modal('show');
}

function setBackgroundClicked(){
    let backgroundURL = "";
    backgroundURL = prompt("Enter the url of the background:");
    if(backgroundURL==null)backgroundURL="";

    allBoards[board].attributes['background'] = backgroundURL;

    loadBoardBackgroundImage();

    saveAll();
}