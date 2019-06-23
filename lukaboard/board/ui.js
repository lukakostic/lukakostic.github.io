

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

function draw(){
  if(board!=null)
    drawBoard();
  else drawMain();
}
  
  function clearBoards() {
    let lists = document.getElementsByClassName('list');
    
    for(let j = 0; j < lists.length; j++){
      if (lists[j].id != "") continue;

      let boards = lists[j].childNodes;
      for (let i = 0; i < boards.length; i++) {
        $(boards[i]).remove();
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

    document.getElementById('boardTitle').value = board.name;
    document.getElementById('boardDescription').value = board.attributes['description'];

    
    let textBrdTemplate = document.getElementById('textBoardTemplate').content.firstElementChild;
    let boardBrdTemplate = document.getElementById('boardBoardTemplate').content.firstElementChild;
    let listTemplate = document.getElementById('listTemplate').content.firstElementChild;
  
    let parent = document.getElementById('contentAlbum');


  

    //fill lists & boards
    for(let l = 0; l < board.content.length; l++){

      let listEl = listTemplate.cloneNode(true);
      parent.appendChild(listEl);
      loadList(listEl,board.content[l]);

      for(let i = 0; i < board.content[l].content; i++){
          if(board.content[l].content[i].type == 'T'){
   
            let el = textBrdTemplate.cloneNode(true);
            listEl.appendChild(el);
            loadTextBoard(el,board.content[l].content[i]);
          
          }else if(board.content[l].content[i].type == 'B'){
  
            let el = boardBrdTemplate.cloneNode(true);
            listEl.appendChild(el);
            loadBoardBoard(el,board.content[l].content[i]);
  
          }
      }
    }


    fixListUI();
    fixNewListUI();
    fixAlbumUI();
}

  function drawMain(){
    document.getElementById('header').classList.add('v-hidden');

    document.getElementById('contentAlbum').classList.add('d-none');
    document.getElementById('mainContentAlbum').classList.remove('d-none');

    clearBoards();

    let textBrdTemplate = document.getElementById('textBoardTemplate').content.firstElementChild;
    let boardBrdTemplate = document.getElementById('boardBoardTemplate').content.firstElementChild;
    let mainList = document.getElementById('main-list');

    //fill boards
    for(let i = 0; i < allBoards.length; i++){
      if(allBoards[i].attributes['onMain'] == true){
        if(allBoards[i].type == 'T'){
 
          let el = textBrdTemplate.cloneNode(true);
          mainList.appendChild(el);
          loadTextBoard(el,allBoards[i]);
        
        }else if(allBoards[i].type == 'B'){

          let el = boardBrdTemplate.cloneNode(true);
          mainList.appendChild(el);
          loadBoardBoard(el,allBoards[i]);

        }
        
        fixListUI(); //Not needed?
      }
    }
  }

  function home(){
    window.location.href = "https://lukakostic.com/lukaboard/board/?d="+dbx.access;
  }

  function up(){
    window.history.back();
  }