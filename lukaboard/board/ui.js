function UIToFunctions(){
    document.getElementById('homeBtn').onclick = Home;
    //document.getElementById('convertBtn').onclick = ConvertBoard;
    document.getElementById('saveBtn').onclick = SaveAll;
    document.getElementById('loadBtn').onclick = LoadAll;
    document.getElementById('upBtn').onclick = TitleClicked;
}


  
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