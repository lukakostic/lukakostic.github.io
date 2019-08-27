let selectedTagInEditor = "";

function showTagEditor(){
    
    static.extrasTitle.innerHTML = 'Tag Editor';
    static.extrasContent.innerHTML = `
    <a id="tagEditorSelected" style="color: white; font-size: 24px;">Selected: none</a><br>
    <form class="input-group-append" onsubmit="event.preventDefault(); tagEditorNew();" style="width:100%">
        <input id="tagEditorInput" name="sel" type="text" placeholder="Selected / New Tag" class="form-control">
        <input type="submit" class="btn btn-primary btn-spaced-1" value="New">
        <input type="button" class="btn btn-primary btn-spaced-1" onclick="tagEditorRename();" value="Rename">
        <input type="button" class="btn btn-primary btn-spaced-1" onclick="tagEditorDelete();" value="Delete">
    </form>
    <br>
    <a style="color: white;">Parent tags</a><br>
    <form class="input-group-append" onsubmit="event.preventDefault();" style="width:100%">
        <input type="button" class="btn btn-primary btn-spaced-1" onclick="tagEditorRemoveCheckedFromParentsClicked();" value="Remove from parents">
        <input type="button" class="btn btn-primary btn-spaced-1" onclick="tagEditorCheckAllParents();" value="Check all">
        <input type="button" class="btn btn-primary btn-spaced-1" onclick="tagEditorUncheckAllParents();" value="Uncheck all">
    </form>
    <div id = "parentTags" style="min-height: 10px; width: 100%; background-color: black; text-align: left;">
    </div>
    <br>
    <a style="color: white;">All tags</a><br>
    <form class="input-group-append" onsubmit="event.preventDefault(); tagEditorSearched();" style="width:100%">
        <input id="tagEditorSearch" oninput="tagEditorSearched();" name="s" type="text" placeholder="Search Tags" class="form-control">
        <input type="submit" class="btn btn-primary" value="Search">
    </form>
    <br>
    <form class="input-group-append" onsubmit="event.preventDefault();" style="width:100%">
        <input type="button" class="btn btn-primary btn-spaced-1" onclick="tagEditorAddCheckedToParentsClicked();" value="Add to parents">
        <input type="button" class="btn btn-primary btn-spaced-1" onclick="tagEditorRemoveCheckedFromParentsAllClicked();" value="Remove from parents">
        <input type="button" class="btn btn-primary btn-spaced-1" onclick="tagEditorCheckAll();" value="Check all">
        <input type="button" class="btn btn-primary btn-spaced-1" onclick="tagEditorUncheckAll();" value="Uncheck all">
    </form>
    <div id = "allTagsFiltered" style="min-height: 10px; width: 100%; background-color: black; text-align: left;">
    </div>
    `;
    static.extrasBack.onclick = showExtrasClicked;
    
    showExtrasDialog();
    selectTagToEdit("");
    tagEditorSearched();
}

function makeTagEditorBtn(text="Tag",id="",parent = null, onclick = null){
    let b = document.createElement('span');
    setDataId(b,id);
    let style = "color: white; border: 0px; background-color: #"+((selectedTagInEditor==id)?"8F8F8F":"4444")+";";
    b.style = style;
    b.innerHTML = `
    <input type="checkbox" style="`+style+`">
    <button onclick="`+onclick+`" style="`+style+`">`+text+`</button>`;
    if(parent!=null)parent.appendChild(b);
    return b;
}

function tagEditorDelete(){
    if(selectedTagInEditor == "") return;

    delete project.tags[selectedTagInEditor];
    
    //remove from tags where parent
    let tags = Object.keys(project.tags);
    for(let i = 0; i < tags.length; i++){
        let ind = project.tags[tags[i]].parentTags.indexOf(selectedTagInEditor);
        if(ind!=-1)
            project.tags[tags[i]].parentTags.splice(ind,1);
    }

    //remove from boards
    let boards = Object.keys(project.boards);
    for(let i = 0; i < boards.length; i++){
        let ind = getBrdAttrOrDef(boards[i],'tags',[]).indexOf(selectedTagInEditor);
        if(ind!=-1)
            project.boards[boards[i]].attributes['tags'].splice(ind,1);
    }


    selectTagToEdit("");
    tagEditorSearched();

    saveAll();
}

function tagEditorRename(){
    if(selectedTagInEditor == "") return;

    let s = EbyId('tagEditorInput').value;
    if(s==""){
        alert('Tag cant have no name');
        return;
    }
    let tgnm = Tag.findTagByName(s);
    if(tgnm!=null&&tgnm!=selectedTagInEditor){
        alert('Tag with same name already exists');
    }
    project.tags[selectedTagInEditor].name = s;


    selectTagToEdit(selectedTagInEditor);
    tagEditorSearched();

    saveAll();
}

function tagEditorNew(){
    let s = EbyId('tagEditorInput').value;
    if(s==""){
        alert('New tag cant have no name');
        return;
    }
    if(Tag.findTagByName(s)!=null){
        alert('Tag with same name already exists');
    }
    let tag = new Tag(s);
    project.tags[tag.id] = tag;
    selectTagToEdit(tag.id);


    tagEditorSearched();

    saveAll();
}

function selectTagToEdit(id){
    selectedTagInEditor = id;

    //draw parents
    let parents = EbyId('parentTags');
    parents.innerHTML = '';
    
    if(id!=""){
        EbyId('tagEditorSelected').innerHTML = 'Selected: ' + project.tags[id].name;
        EbyId('tagEditorInput').value = project.tags[id].name;

        for(let i = 0; i < project.tags[selectedTagInEditor].parentTags.length; i++){
            makeTagEditorBtn(project.tags[project.tags[selectedTagInEditor].parentTags[i]].name,project.tags[selectedTagInEditor].parentTags[i],parents,'tagInEditorClicked();');
        }

    }else{
        EbyId('tagEditorSelected').innerHTML = 'Selected: none';    
        EbyId('tagEditorInput').value = "";
    }


}

function tagEditorCheckAll(){
    let nodes = EbyId('allTagsFiltered').childNodes;
    
    for(let i = 0; i < nodes.length; i++){
     nodes[i].childNodes[1].checked = true;
    }
}

function tagEditorUncheckAll(){
    let nodes = EbyId('allTagsFiltered').childNodes;
    
    for(let i = 0; i < nodes.length; i++){
     nodes[i].childNodes[1].checked = false;
    }
}

function tagEditorCheckAllParents(){
    let nodes = EbyId('parentTags').childNodes;
    
    for(let i = 0; i < nodes.length; i++){
     nodes[i].childNodes[1].checked = true;
    }
}

function tagEditorUncheckAllParents(){
    let nodes = EbyId('parentTags').childNodes;
    
    for(let i = 0; i < nodes.length; i++){
     nodes[i].childNodes[1].checked = false;
    }
}

function tagEditorRemoveCheckedFromParentsClicked(){
    let nodes = EbyId('parentTags').childNodes;
    let tags = [];

    for(let i = 0; i < nodes.length; i++){
        if(nodes[i].childNodes[1].checked){
            let id = getDataId(nodes[i]);

            tags.push(id);
        }
    }

    for(let i = 0; i < tags.length; i++){
        let ind = project.tags[selectedTagInEditor].parentTags.indexOf(tags[i]);
        if(ind!=-1)
            project.tags[selectedTagInEditor].parentTags.splice(ind,1);
    }

    

    selectTagToEdit(selectedTagInEditor);
    
    saveAll();
}

function tagEditorRemoveCheckedFromParentsAllClicked(){
    let nodes = EbyId('allTagsFiltered').childNodes;
    let tags = [];

    for(let i = 0; i < nodes.length; i++){
        if(nodes[i].childNodes[1].checked){
            let id = getDataId(nodes[i]);

            tags.push(id);
        }
    }

    for(let i = 0; i < tags.length; i++){
        let ind = project.tags[selectedTagInEditor].parentTags.indexOf(tags[i]);
        if(ind!=-1)
            project.tags[selectedTagInEditor].parentTags.splice(ind,1);
    }


    selectTagToEdit(selectedTagInEditor);

    saveAll();
}

function tagEditorAddCheckedToParentsClicked(){
    let nodes = EbyId('allTagsFiltered').childNodes;
    let tags = [];

    for(let i = 0; i < nodes.length; i++){
        if(nodes[i].childNodes[1].checked){
            let id = getDataId(nodes[i]);

            if(Object.keys(Tag.getAllUpstreamParents(id)).includes(selectedTagInEditor)){
                alert('Cant add ' + project.tags[id].name + ' as parent, because its a (possibly indirect) child of the selected tag.');
                return;
            }

            if(project.tags[selectedTagInEditor].parentTags.includes(id)) continue; //already a parent

            if(id == selectedTagInEditor){
                alert('Cant parent tag to itself.');
                return;
            }

            tags.push(id);
        }
    }

    for(let i = 0; i < tags.length; i++){
        project.tags[selectedTagInEditor].parentTags.push(tags[i]);
    }


    selectTagToEdit(selectedTagInEditor);

    saveAll();
}

function tagInEditorClicked(){
    let id = getDataId(event.srcElement.parentNode);
    
    selectTagToEdit(id);
    tagEditorSearched();
}

function tagEditorSearched(){
    let s = EbyId('tagEditorSearch').value;
    
    let allTagsFiltered = EbyId('allTagsFiltered');
    allTagsFiltered.innerHTML = '';

    let allTagIds = Object.keys(project.tags);
    for(let i = 0; i < allTagIds.length; i++){
        if(s==""||project.tags[allTagIds[i]].name.includes(s)){
            makeTagEditorBtn(project.tags[allTagIds[i]].name,allTagIds[i],allTagsFiltered,'tagInEditorClicked();');
        }
    }

    
}