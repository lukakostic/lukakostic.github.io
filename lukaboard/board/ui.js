function UIToFunctions(){
    document.getElementById('homeBtn').onclick = Home;
    //document.getElementById('convertBtn').onclick = ConvertBoard;
    document.getElementById('saveBtn').onclick = SaveAll;
    document.getElementById('loadBtn').onclick = LoadAll;
    document.getElementById('upBtn').onclick = TitleClicked;
}

//UI calculations
setInterval(function(){
  //Fix this piece of shit mobile web dev crap
  document.body.style.setProperty("width","100vw");

  var album = document.getElementById('contentAlbum');
  var columnWidth = 310;//px //300 + 5*2 pad
  if(album){
    album.style.setProperty('width',((columnWidth*album.childElementCount)+20).toString() + 'px');
  }

  
  var newlist = document.getElementById('newlist');
  newlist.parentNode.appendChild(newlist);
},100);
  
  function clearBoards() {
    let boards = document.getElementById('boards').childNodes;
  
    for (let i = 0; i < boards.length; i++) {
      if (boards[i].id != "") continue;
      $(boards[i]).remove();
    }
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
  }

  function drawMain(){
    clearBoards();
  }