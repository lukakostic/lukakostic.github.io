function newPageOpened(forceMain = false){
  if(forceMain) board = "";
  else board = Board.idFromUrl(url);

  draw();
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
        
        alert(dragItem[0].outerHTML);

        dragItem = null;
      },50);
    },
    change: function(event, ui) {  
      console.log('drag change');
        if(ui.sender) dragNew = ui.placeholder.parent();
        fixListUI(dragNew[0]);
    },
    connectWith: ".draggableList"
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
    EbyId('header').classList.remove('v-hidden');

    mainContentAlbum.classList.add('d-none');
    contentAlbum.classList.remove('d-none');

    clearBoards();

    EbyId('boardTitle').value = allBoards[board].name;
    EbyId('boardDescription').value = allBoards[board].attributes['description'];


    //fill lists & boards
    for(let l = 0; l < allBoards[board].content.length; l++){

      let listEl = listTemplate.cloneNode(true);
      contentAlbum.appendChild(listEl);

      
      loadList(listEl,allBoards[board].content[l]);

      

    }

    
    EbyId('boardTitle').select(); //autopop

    fixAlbumUI();
    fixNewListUI();
}

  function drawMain(){
    EbyId('header').classList.add('v-hidden');

    EbyId('contentAlbum').classList.add('d-none');
    EbyId('mainContentAlbum').classList.remove('d-none');

    clearBoards(mainList);


    let ids = Object.keys(allBoards);
    //fill boards
    for(let i = 0; i < ids.length; i++){
      if(allBoards[ids[i]].attributes['onMain'] == true){
        if(allBoards[ids[i]].type == boardTypes.Text){
 
          let el = textBrdTemplate.cloneNode(true);
          mainList.appendChild(el);
          loadTextBoard(el,allBoards[ids[i]]);
        
        }else if(allBoards[ids[i]].type == boardTypes.Board){

          let el = boardBrdTemplate.cloneNode(true);
          mainList.appendChild(el);
          loadBoardBoard(el,allBoards[ids[i]]);

        }
        
      }
    }
    
    fixListUI(mainList);
  }


function loadTextBoard(textBoardEl, brd){
  if (typeof brd === 'string' || brd instanceof String) brd = allBoards[brd];

  setBId(textBoardEl, brd.id);

  $(textBoardEl.getElementsByClassName('textBtn')[0]).contents()[1].nodeValue = brd.name;
  
  if(brd.content.length>0) 
      textBoardEl.getElementsByClassName('descriptionIcon')[0].classList.remove('d-none');
  else 
      textBoardEl.getElementsByClassName('descriptionIcon')[0].classList.add('d-none');
}

function loadBoardBoard(boardBoardEl, brd){
  if (typeof brd === 'string' || brd instanceof String) brd = allBoards[brd];

  setBId(boardBoardEl, brd.id);
  $(boardBoardEl.getElementsByClassName('textBtn')[0]).contents()[0].nodeValue = brd.name;
}

function loadList(listEl, brd){
  if (typeof brd === 'string' || brd instanceof String) brd = allBoards[brd];

  listEl.getElementsByClassName("title-text")[0].value = brd.name;
  setBId(listEl, brd.id);

  
  for(let i = 0; i < brd.content.length; i++){
    let brd2 = allBoards[brd.content[i]];
    if(brd2.type == boardTypes.Text){

      let el = textBrdTemplate.cloneNode(true);
      listEl.appendChild(el);
      loadTextBoard(el,brd2);
    
    }else if(brd2.type == boardTypes.Board){

      let el = boardBrdTemplate.cloneNode(true);
      listEl.appendChild(el);
      loadBoardBoard(el,brd2);

    }
  }
  fixListUI(listEl);

}

function loadAllBoardsByDataId(brdId){
  let boardEls = document.getElementsByClassName('board');

  for(let i = 0; i < boardEls.length; i++){
      if(getBId(boardEls[i])==brdId){
          if(allBoards[brdId].type == boardTypes.Text)
           loadTextBoard(boardEls[i],brdId);
          else if(allBoards[brdId].type == boardTypes.Board)
           loadBoardBoard(boardEls[i],brdId);
      }
  }
}

  function home(){
    window.location.href = "https://lukakostic.com/lukaboard/board/?d="+dbx.access;
  }

  function up(){
    window.history.back();
  }