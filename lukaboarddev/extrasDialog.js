let extrasSelected = null;

function showExtrasDialog(){
<<<<<<< HEAD
    $(static.extrasDialog).modal('show');
}

function extrasBackgroundClicked(){
    if(event.target.id != 'static.extrasDialog') return;
=======
    $(extrasDialog).modal('show');
}

function extrasBackgroundClicked(){
    if(event.target.id != 'extrasDialog') return;
>>>>>>> fab8f27673e4fe7609f7768b5db5ccc2ef0126da
    closeExtrasDialog();
}

function closeExtrasDialog(){
<<<<<<< HEAD
    $(static.extrasDialog).modal('hide');
}

function showExtrasClicked(){
    extrasSelected = board;
    showExtras();
}

function showExtras(){
    
    static.extrasTitle.innerHTML = 'Extras';
    static.extrasContent.innerHTML = `
    <button type="button" class="btn bg-inherit btn-dark" style="width: 100%; margin: 5px; padding: 3px; font-size: 16px;" onclick="showPreferencesDialog()">Preferences</button>
    <button type="button" class="btn bg-inherit btn-dark" style="width: 100%; margin: 5px; padding: 3px; font-size: 16px;" onclick="showTagEditor()">Tags</button>
    <button type="button" class="btn bg-inherit btn-dark" style="width: 100%; margin: 5px; padding: 3px; font-size: 16px;" onclick="showExtensionEditor()">Extensions</button>
    <button type="button" class="btn bg-inherit btn-dark" style="width: 100%; margin: 5px; padding: 3px; font-size: 16px;" onclick="showBackupsDialog()">Backups</button>
    <div style="width: 100%; height: 8px; background-color: black;"></div>
    <button type="button" class="btn bg-inherit btn-dark" style="width: 100%; margin: 5px; padding: 3px; font-size: 16px;" onclick="setBackgroundClicked()">Set Background Image</button>
    <button type="button" class="btn bg-inherit btn-dark" style="width: 100%; margin: 5px; padding: 3px; font-size: 16px;" onclick="showTagsDialog()">Set Board Tags</button>
    <button type="button" class="btn bg-inherit btn-dark" style="width: 100%; margin: 5px; padding: 3px; font-size: 16px;" onclick="showExtensionsDialog()">Set Board Extensions</button>
    `;
    static.extrasBack.onclick = closeExtrasDialog;
=======
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
>>>>>>> fab8f27673e4fe7609f7768b5db5ccc2ef0126da

    showExtrasDialog();
}

function setBackgroundClicked(){
    let backgroundURL = "";
    backgroundURL = prompt("Enter the url of the background:");
    if(backgroundURL==null)backgroundURL="";

<<<<<<< HEAD
    if(backgroundURL!="") setBrdAttr(extrasSelected,'background',backgroundURL);
    if(backgroundURL=="") delBrdAttr(extrasSelected,'background');
=======
    project.allBoards[board].attributes['background'] = backgroundURL;
    if(backgroundURL=="") delete project.allBoards[board].attributes['background'];
>>>>>>> fab8f27673e4fe7609f7768b5db5ccc2ef0126da

    loadBoardBackgroundImage();
    loadAllBoardsByDataId(extrasSelected);

    saveAll();
}