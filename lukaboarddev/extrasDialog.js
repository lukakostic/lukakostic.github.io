
function showExtrasDialog(){
    $(extrasDialog).modal('show');
}

function extrasBackgroundClicked(){
    if(event.target.id != 'extrasDialog') return;
    closeExtrasDialog();
}

function closeExtrasDialog(){
    $(extrasDialog).modal('hide');
}

function showExtrasClicked(){
    
    extrasTitle.innerHTML = 'Extras';
    extrasContent.innerHTML = `
    <button type="button" class="btn bg-inherit btn-dark" style="width: 100%; margin: 5px; padding: 3px; font-size: 18px;" onclick="setBackgroundClicked()">Manage Preferences</button>
    <button type="button" class="btn bg-inherit btn-dark" style="width: 100%; margin: 5px; padding: 3px; font-size: 18px;" onclick="setBackgroundClicked()">Manage Tags</button>
    <button type="button" class="btn bg-inherit btn-dark" style="width: 100%; margin: 5px; padding: 3px; font-size: 18px;" onclick="setBackgroundClicked()">Manage Extensions</button>
    <br><br>
    <button type="button" class="btn bg-inherit btn-dark" style="width: 100%; margin: 5px; padding: 3px; font-size: 18px;" onclick="setBackgroundClicked()">Set Background Image</button>
    <button type="button" class="btn bg-inherit btn-dark" style="width: 100%; margin: 5px; padding: 3px; font-size: 18px;" onclick="showTagsDialog()">Set Board Tags</button>
    <button type="button" class="btn bg-inherit btn-dark" style="width: 100%; margin: 5px; padding: 3px; font-size: 18px;" onclick="setBackgroundClicked()">Set Board Extensions</button>
    `;
    extrasBack.onclick = closeExtrasDialog;

    showExtrasDialog();
}

function setBackgroundClicked(){
    let backgroundURL = "";
    backgroundURL = prompt("Enter the url of the background:");
    if(backgroundURL==null)backgroundURL="";

    project.allBoards[board].attributes['background'] = backgroundURL;
    if(backgroundURL=="") delete project.allBoards[board].attributes['background'];

    loadBoardBackgroundImage();

    saveAll();
}