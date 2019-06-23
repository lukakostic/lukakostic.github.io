let url = window.location.href.replace('#', '');

let dbx = DropboxManager.fromUrl(url);

let allBoards = []; //array of all board objects
let board = null;

loadAll();
uiToFunctions();

draw();

setTimeout(()=>{expandInputAll()},200);
setTimeout(()=>{expandInputAll()},1000);
setInterval(()=>{console.log(allBoards.length);},1000);

//bootbox.alert("hello :3");

function loadOrDefaultBoard(forceNull){

  if(forceNull) board = null;
  else board = Board.fromUrl(url);

  draw();
}

function saveAll() {
  
  let contents = JSON.stringify(allBoards);

  dbx.filesUpload({ path: '/' + 'lukaboard.lb', contents: contents });
}

function loadAll() {
  dbx.filesDownload({ path: '/' + 'lukaboard.lb' },function loaded(contents){
  
    if (contents != null) {
      allBoards = JSON.parse(contents);
    }else{
      allBoards = [];
      board = null;
    }
      
    loadOrDefaultBoard();

    bootbox.alert(contents);
  });
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
  if(board != null) Board.fromId(parent.getAttribute('data-id')).content.push(brd); //Add to parent list

  el.setAttribute('data-id', brd.id);

  parent.appendChild(el);

  fixListUI();
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
  if(board != null) Board.fromId(parent.getAttribute('data-id')).content.push(brd); //Add to parent list

  el.setAttribute('data-id', brd.id);

  parent.appendChild(el);
  
  fixListUI();
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

  el.setAttribute('data-id', brd.id);

  parent.appendChild(el);
  
  fixNewListUI();
  fixAlbumUI();
}

function home(){
  window.location.href = "https://lukakostic.com/lukaboard/board/?d="+dbx.access;
}

function titleClicked() {
  alert("Title clicked!");
}