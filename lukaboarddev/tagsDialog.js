function showTagsDialog(){
    
    extrasTitle.innerHTML = 'Board Tags';
    extrasContent.innerHTML = `
    <form id="form" onsubmit="event.preventDefault(); tagsDialogSearched();" style="width:100%">
        <input id="tagsDialogSearch" name="d" type="text" placeholder="Search Tags" class="form-control" autocomplete="on">
        <input type="submit" class="btn btn-primary" value="Search">
    </form>
    <div>
        <br><br><br><br><br><br><br><br><br><br><br>
    </div>
    `;
    extrasBack.onclick = showExtrasClicked;

    showExtrasDialog();
}

function tagsDialogSearched(){

}