let url = window.location.href.replace('#', '');

let dbx = DropboxManager.fromUrl(url);

let allBoards = []; //array of all board objects
let board = null;

loadAll();
uiToFunctions();

draw();

//bootbox.alert((board==null)?('main board'):('board: ' + board.id));

setTimeout(()=>{expandInputAll()},200);
setTimeout(()=>{expandInputAll()},1000);

//bootbox.alert("hello :3");

function loadOrDefaultBoard(forceNull){

  if(forceNull) board = null;
  else board = Board.fromUrl(url);

  draw();
}

function saveAll() {
  try{

    let contents = JSON.stringify(allBoards);

    dbx.filesUpload({ path: '/' + 'lukaboard.lb', contents: contents , mode:'overwrite'});

  }catch(e){bootbox.alert(e.message);}
}

function loadAll() {
    try{

    dbx.filesDownload({ path: '/' + 'lukaboard.lb' },function loaded(contents){

      if (contents != null) {
        allBoards = JSON.parse(contents);

        //bootbox.alert(contents);
      }else{
        allBoards = [];
        board = null;
      }
        
      loadOrDefaultBoard();

    });

  }catch(e){bootbox.alert(e.message);}
}

function newText(){
  //alert(event.srcElement.outerHTML);
  
  let template = document.getElementById('textBoardTemplate').content.firstElementChild;
  let parent = event.srcElement.parentNode.parentNode.parentNode;

  let el = template.cloneNode(true);

  let atr = {};
  if(board == null)atr['onMain'] = true;
  let brd = new Board('T',"Text","",atr);

  allBoards.push(brd);
  if(board != null) Board.fromId(parent.getAttribute('data-id')).content.push(brd.id); //Add to parent list

  el.setAttribute('data-id', brd.id);

  parent.appendChild(el);

  fixListUI();
  saveAll();
}

function newBoard(){
  //alert(event.srcElement.outerHTML);

  let template = document.getElementById('boardBoardTemplate').content.firstElementChild;
  let parent = event.srcElement.parentNode.parentNode.parentNode;

  let el = template.cloneNode(true);

  let atr = {'description':'Description'};
  if(board == null)atr['onMain'] = true;
  let brd = new Board('B',"Board",[],atr);

  allBoards.push(brd);
  if(board != null) Board.fromId(parent.getAttribute('data-id')).content.push(brd.id); //Add to parent list

  parent.appendChild(el);
  el.setAttribute('data-id', brd.id);

  
  fixListUI();
  saveAll();
}

function newList(){
  //alert(event.srcElement.outerHTML);

  let template = document.getElementById('listTemplate').content.firstElementChild;
  let parent = document.getElementById('contentAlbum');

  let el = template.cloneNode(true);

  let name = event.srcElement.firstElementChild.value;
  el.getElementsByClassName("title-text")[0].value = name;

  let brd = new Board('L',name,[],{});
  allBoards.push(brd);
  board.content.push(brd.id);

  parent.appendChild(el);
  el.setAttribute('data-id', brd.id);

  
  fixNewListUI();
  fixAlbumUI();
  saveAll();
}
