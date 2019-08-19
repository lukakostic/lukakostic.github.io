
let dragOld, dragNew, dragItem;
let oldDragIndex, newDragIndex;

function reloadHTML(){
  document.body.outerHTML = htmlBackup.innerHTML;
  getStaticHtml();
  uiToFunctions();

  invokeListeners('reloadHTML');
    
}

function newPageOpened(forceMain = false){
  invokeListeners('pre_newPage');

  reloadHTML();
  static.loadingIndicator.style.display = 'none';

  historyStack.push(url);

  if(forceMain) board = "";
  else board = Board.idFromUrl(url);

  if(board == ""){
    static.header.style.display = 'none';
    static.headerMain.style.display = 'block';
  }else{
    static.header.style.display = 'block';
    static.headerMain.style.display = 'none';
  }

  //clearBoards();
  //clearLists();
  draw();

  invokeListeners('newPage');

  let extensions = getBrdAttrOrDef(board,'extensions',[]);
  for(let i = 0; i < extensions.length; i++){
    if(extensions[i].on){
      eval(project.extensions[extensions[i].id].code);
    }
  }
}

function loadBoardBackgroundImage(){
  let brdEl = EbyId('main');
  
  brdEl.style.backgroundImage = "url('"+getBrdAttr(board,'background')+"')";
  brdEl.style.repeatMode = "no-repeat";
  brdEl.style.backgroundSize = "cover";
}

function uiToFunctions(){
    EbyId('homeBtn').onclick = home;
    EbyId('upBtn').onclick = up;
    //EbyId('convertBtn').onclick = ConvertBoard;
    //EbyId('saveBtn').onclick = SaveAll;
    //EbyId('loadBtn').onclick = LoadAll;
}

//UI calculations
setInterval(function(){
  //Fix this piece of shit mobile web dev crap
  document.body.style.setProperty("width","100vw");

},100);

function startSavingIndicator(){
  static.savingIndicator.style.display = 'block';
}

function stopSavingIndicator(){
  static.savingIndicator.style.display = 'none';
}

function expandInputAll(){
  let expandoInputs = document.getElementsByClassName('expandInput');
  for (let i = 0; i < expandoInputs.length; i++) {
   expandInput(expandoInputs[i]);
 }
}

function expandInput(el){
  el.style.height = '1px';
  el.style.height = (1+el.scrollHeight)+'px';
  el.parentNode.style.height = el.style.height;
}

function clearLists(){
  let lists = document.getElementsByClassName('list');
    
  for(let j = 0; j < lists.length; j++){
    if (lists[j].id != "") continue;
    
    $(lists[j]).remove();
    j--;
  }
}

function makeDraggable(){

  //make boards draggable
  $('.draggableList').sortable({
    items: '.draggable',
    start: function(event, ui) {
      console.log('drag start');
        dragItem = ui.item;
        oldDragIndex = getElementIndex(dragItem[0]);
        dragNew = dragOld = ui.item.parent();
    },
    stop: function(event, ui) {
      console.log('drag stop');
      //With a delay so that dragging a board doesnt click its button at end
      setTimeout(()=>{
        //actually move the board
        newDragIndex = getElementIndex(dragItem[0]);

        
          project.boards[getDataId(dragOld[0])].content.splice(oldDragIndex-1,1);
          project.boards[getDataId(dragNew[0])].content.splice(newDragIndex-1,0,getDataId(dragItem[0]));
        
        dragItem = null;
        saveAll();

      },50);
    },
    change: function(event, ui) {  
      console.log('drag change');
        if(ui.sender) dragNew = ui.placeholder.parent();
        fixListUI(dragNew[0]);
    },
    connectWith: ".draggableList"
}).disableSelection();



  //make lists draggable
  $('.draggableAlbum').sortable({
    items: '.draggableList',
    start: function(event, ui) {
      console.log('drag list start');
        dragItem = ui.item;
        oldDragIndex = getElementIndex(dragItem[0]);
    },
    stop: function(event, ui) {
      console.log('drag list stop');
      //With a delay so that dragging a board doesnt click its button at end
      setTimeout(()=>{
        //actually move the board
        newDragIndex = getElementIndex(dragItem[0]);

        
          project.boards[board].content.splice(oldDragIndex,1);
          project.boards[board].content.splice(newDragIndex,0,getDataId(dragItem[0]));
        
        dragItem = null;
        saveAll();

      },50);
    },
    change: function(event, ui) {
      console.log('drag list change');
      //if(ui.sender) dragNew = ui.placeholder.parent();
        
      //fixNewListUI();
    }
}).disableSelection();

/*
$(".textBtn").each(function() {

  this.addEventListener("mousedown", function(t) {
    $(this.parentNode).trigger("mousedown",t);
    $(this.parentNode).trigger("onmousedown",t);
  },true);
  this.addEventListener("mouseup", function(t) {
    $(this.parentNode).trigger("mouseup",t);
    $(this.parentNode).trigger("onmouseup",t);
  },true);
  
  this.addEventListener("onmousedown", function(t) {
    $(this.parentNode).trigger("mousedown",t);
    $(this.parentNode).trigger("onmousedown",t);
  },true);
  this.addEventListener("onmouseup", function(t) {
    $(this.parentNode).trigger("mouseup",t);
    $(this.parentNode).trigger("onmouseup",t);
  },true);

});
*/
}

function draw(){
  if(board!="")
    drawBoard();
  else drawMain();

  loadBoardBackgroundImage();
  makeDraggable();

  setTimeout(()=>{expandInputAll()},200);
  setTimeout(()=>{expandInputAll()},1000);
}
  
  function clearBoards(lst = null) {
    let lists = [lst];
    if(lst == null) lists = document.getElementsByClassName('list');
    
    for(let j = 0; j < lists.length; j++){

      let boards = lists[j].childNodes;
      for (let i = 0; i < boards.length; i++) {
       if(boards[i].classList != null && boards[i].classList.contains('board') && boards[i].id == ""){
        boards[i].parentNode.removeChild(boards[i]);
        i--;
       }  
      }
    }
  }

  function fixListUI(listEl=null){
    if(listEl!=null){
    var newPanel = listEl.getElementsByClassName('newPanel')[0];
    newPanel.parentNode.appendChild(newPanel);
  }else{
    var album = fixAlbumUI();
    var lists = album.getElementsByClassName('list');
    for(var i = 0; i<lists.length; i++){
      if(lists[i].id=="")fixListUI(lists[i]);
    }
  }
}

function fixNewListUI(){
  var newlist = EbyId('newlist');
  newlist.parentNode.appendChild(newlist);
}

  function fixAlbumUI(){
    var album = EbyId('contentAlbum');
    var columnWidth = 310;//px //300 + 5*2 margin
    if(album){
      album.style.setProperty('width',((columnWidth*album.childElementCount)+10 + 8).toString() + 'px'); //add some space for album pad (2 * 5px atm) + some extra just in case
      
      return album;
    }
    return null;
  }

  function drawBoard(){

    static.mainContentAlbum.classList.add('d-none');
    static.contentAlbum.classList.remove('d-none');

    clearBoards();

    EbyId('boardTitle').value = project.boards[board].name;
    EbyId('boardDescription').value = getBrdAttr(board,'description');


    //fill lists & boards
    for(let l = 0; l < project.boards[board].content.length; l++){

      let listEl = static.listTemplate.cloneNode(true);
      static.contentAlbum.appendChild(listEl);

      
      loadList(listEl,project.boards[board].content[l]);

      

    }

    
    EbyId('boardTitle').select(); //autopop

    fixAlbumUI();
    fixNewListUI();
}

  function drawMain(){

    static.contentAlbum.classList.add('d-none');
    static.mainContentAlbum.classList.remove('d-none');

    clearBoards(static.mainList);

    loadList(static.mainList,"");

    

    /*
    let ids = Object.keys(project.boards);
    //fill boards
    for(let i = 0; i < ids.length; i++){
      if(project.boards[ids[i]].attributes['onMain'] == true){
        if(project.boards[ids[i]].type == boardTypes.Text){
 
          let el = static.textBrdTemplate.cloneNode(true);
          static.mainList.appendChild(el);
          loadTextBoard(el,project.boards[ids[i]]);
        
        }else if(project.boards[ids[i]].type == boardTypes.Board){

          let el = static.boardBrdTemplate.cloneNode(true);
          static.mainList.appendChild(el);
          loadBoardBoard(el,project.boards[ids[i]]);

        }
        
      }
    }
    */
    fixListUI(static.mainList);
  }


function loadTextBoard(textBoardEl, brd){
  if (typeof brd === 'string' || brd instanceof String) brd = project.boards[brd];

  setDataId(textBoardEl, brd.id);

  $(textBoardEl.getElementsByClassName('textBtn')[0]).contents()[1].nodeValue = brd.name;
  
  if(brd.content.length>0) 
      textBoardEl.getElementsByClassName('descriptionIcon')[0].classList.remove('d-none');
  else 
      textBoardEl.getElementsByClassName('descriptionIcon')[0].classList.add('d-none');

  loadBackground(textBoardEl,brd.id);
}

function loadBackground(brdEl, id){
  brdEl.style.backgroundImage = "url('"+getBrdAttr(id,'background')+"')";
  brdEl.style.repeatMode = "no-repeat";
  brdEl.style.backgroundSize = "cover";
}

function loadBoardBoard(boardBoardEl, brd){
  if (typeof brd === 'string' || brd instanceof String) brd = project.boards[brd];

  setDataId(boardBoardEl, brd.id);
  $(boardBoardEl.getElementsByClassName('textBtn')[0]).contents()[0].nodeValue = brd.name;

  loadBackground(boardBoardEl, brd.id);
}

function loadList(listEl, brd){
  if (typeof brd === 'string' || brd instanceof String) brd = project.boards[brd];

  titleText = listEl.getElementsByClassName("title-text")[0];

  //could cause issues with main board (probably not)?
  //can only be blur while as input, so turn to div
//  titleText.outerHTML = titleText.outerHTML.replace('<input','<div').replace('</input>','</div>');
//  titleText.onclick = ()=>{listTitleClicked(this)};
//  titleText.onblur = null;


titleText.addEventListener('click',listTitleClicked,true);
titleText.onblur = ()=>{listTitleBlur();};

//  $(titleText).val(brd.name);
  $(titleText).html(brd.name); //we assume its div at start
//  $(titleText).prop("readonly",true);
  setDataId(listEl, brd.id);

  
  
  for(let i = 0; i < brd.content.length; i++){
    let brd2 = project.boards[brd.content[i]];
    if(brd2.type == boardTypes.Text){

      let el = static.textBrdTemplate.cloneNode(true);
      listEl.appendChild(el);
      loadTextBoard(el,brd2);
    
    }else if(brd2.type == boardTypes.Board){

      let el = static.boardBrdTemplate.cloneNode(true);
      listEl.appendChild(el);
      loadBoardBoard(el,brd2);

    }
  }
  fixListUI(listEl);

}

function loadAllBoardsByDataId(brdId){
  let boardEls = document.getElementsByClassName('board');

  for(let i = 0; i < boardEls.length; i++){
      if(getDataId(boardEls[i])==brdId){
          if(project.boards[brdId].type == boardTypes.Text)
           loadTextBoard(boardEls[i],brdId);
          else if(project.boards[brdId].type == boardTypes.Board)
           loadBoardBoard(boardEls[i],brdId);
      }
  }
}

function home(){
  loadBoardId("");
  //window.location.href = siteUrl+"/?d="+dbx.access;
}

function up(){
  historyStack.pop(); //since last url is yours

  let prev = historyStack.pop();
  if(prev == null) prev = urlFromBoardId("");
  loadBoardId(Board.idFromUrl(prev));
  //window.history.back();
}