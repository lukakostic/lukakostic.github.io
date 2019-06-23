

function uiToFunctions(){
    document.getElementById('homeBtn').onclick = home;
    document.getElementById('upBtn').onclick = up;
    //document.getElementById('convertBtn').onclick = ConvertBoard;
    //document.getElementById('saveBtn').onclick = SaveAll;
    //document.getElementById('loadBtn').onclick = LoadAll;
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
    
  }
}

function draw(){
  if(board!="")
    drawBoard();
  else drawMain();
}
  
  function clearBoards(lst = null) {
    let lists = [lst];
    if(lst == null) lists = document.getElementsByClassName('list');
    
    for(let j = 0; j < lists.length; j++){

      let boards = lists[j].childNodes;
      for (let i = 0; i < boards.length; i++) {
       if(boards[i].classList != null && boards[i].classList.contains('board'))  boards[i].parentNode.removeChild(boards[i]);
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
  var newlist = document.getElementById('newlist');
  newlist.parentNode.appendChild(newlist);
}

  function fixAlbumUI(){
    var album = document.getElementById('contentAlbum');
    var columnWidth = 310;//px //300 + 5*2 margin
    if(album){
      album.style.setProperty('width',((columnWidth*album.childElementCount)+10 + 8).toString() + 'px'); //add some space for album pad (2 * 5px atm) + some extra just in case
      
      return album;
    }
    return null;
  }

  function drawBoard(){
    document.getElementById('header').classList.remove('v-hidden');

    document.getElementById('mainContentAlbum').classList.add('d-none');
    document.getElementById('contentAlbum').classList.remove('d-none');

    clearBoards();

    document.getElementById('boardTitle').value = allBoards[board].name;
    document.getElementById('boardDescription').value = allBoards[board].attributes['description'];


    //fill lists & boards
    for(let l = 0; l < allBoards[board].content.length; l++){

      let listEl = listTemplate.cloneNode(true);
      contentAlbum.appendChild(listEl);

      
      loadList(listEl,allBoards[board].content[l]);

      

    }


    fixNewListUI();
    fixAlbumUI();
}

  function drawMain(){
    document.getElementById('header').classList.add('v-hidden');

    document.getElementById('contentAlbum').classList.add('d-none');
    document.getElementById('mainContentAlbum').classList.remove('d-none');

    clearBoards();


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

  textBoardEl.setAttribute('data-id', brd.id);
  $(textBoardEl.getElementsByClassName('textBtn')[0]).contents()[1].nodeValue = brd.name;
  
  if(brd.content.length>0) 
      textBoardEl.getElementsByClassName('descriptionIcon')[0].classList.remove('d-none');
  else 
      textBoardEl.getElementsByClassName('descriptionIcon')[0].classList.add('d-none');
}

function loadBoardBoard(boardBoardEl, brd){
  if (typeof brd === 'string' || brd instanceof String) brd = allBoards[brd];

  boardBoardEl.setAttribute('data-id', brd.id);
  $(boardBoardEl.getElementsByClassName('textBtn')[0]).contents()[0].nodeValue = brd.name;
}

function loadList(listEl, brd){
  if (typeof brd === 'string' || brd instanceof String) brd = allBoards[brd];

  listEl.getElementsByClassName("title-text")[0].value = brd.name;
  listEl.setAttribute('data-id', brd.id);

  
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
      if(boardEls[i].getAttribute('data-id')==brdId){
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