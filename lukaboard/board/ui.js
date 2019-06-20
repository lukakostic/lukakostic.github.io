expandInputAll();

function UIToFunctions(){
    document.getElementById('homeBtn').onclick = Home;
    //document.getElementById('convertBtn').onclick = ConvertBoard;
    //document.getElementById('saveBtn').onclick = SaveAll;
    //document.getElementById('loadBtn').onclick = LoadAll;
    document.getElementById('upBtn').onclick = TitleClicked;
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
  el.style.height = '1px';el.style.height = (1+el.scrollHeight)+'px';el.parentNode.style.height = el.style.height;
}

function draw(){
  if(board!=null)
    drawBoard();
  else drawMain();
}
  
  function clearBoards() {
    let boards = document.getElementById('boards').childNodes;
  
    for (let i = 0; i < boards.length; i++) {
      if (boards[i].id != "") continue;
      $(boards[i]).remove();
    }
  }

  function FixListUI(listEl=null){
    if(listEl){
    var newPanel = listEl.getElementsByClassName('newPanel')[0];
    newPanel.parentNode.appendChild(newPanel);
  }else{
    var album = FixAlbumUI();
    var lists = album.getElementsByClassName('list');
    for(var i = 0; i<lists.length; i++){
      FixListUI(lists[i]);
    }
  }
}

function FixNewListUI(){
  var newlist = document.getElementById('newlist');
  newlist.parentNode.appendChild(newlist);
}

  function FixAlbumUI(){
    var album = document.getElementById('contentAlbum');
    var columnWidth = 310;//px //300 + 5*2 pad
    if(album){
      album.style.setProperty('width',((columnWidth*album.childElementCount)+20).toString() + 'px');
      
      return album;
    }
    return null;
  }

  function drawBoard(){
    clearBoards();
    document.getElementById('BoardTitle').innerHTML = board.name;

    
    let boardTemplate = document.getElementById('boardTemplate').content.firstElementChild;
    let boards = document.getElementById('boards');
  /*
    for (let i = 0; i < 5; i++) {
      let board = boardTemplate.cloneNode(true);
      board.getElementsByClassName("card-title")[0].innerHTML = "Title";
      board.getElementsByClassName("card-description")[0].innerHTML = "Description";
      boards.appendChild(board);
    }
  */


    FixAlbumUI();
}

  function drawMain(){
    clearBoards();
  }