let url = window.location.href.replace('#', '');

let dbx = DropboxManager.fromUrl(url);

let allBoards = []; //array of all board objects
let board = null;

LoadAll();
UIToFunctions();

draw();

function loadOrDefaultBoard(forceNull){

  if(forceNull) board = null;
  else board = Board.fromUrl(url);

  draw();
}

function SaveAll() {
  
  let contents = {
    current: board.id,
    all: JSON.stringify(allBoards)
  };

  dbx.filesUpload({ path: '/' + 'lukaboard.lb', contents: contents });
}

function LoadAll() {
  dbx.filesDownload({ path: '/' + 'lukaboard.lb' },function Loaded(contents){
  
    if (contents != null) {
      allBoards = JSON.parse(contents.all);
      board = Board.fromId(contents.current);
    }else{
      allBoards = [];
      board = null;
    }
      
    loadOrDefaultBoard();

    bootbox.alert(contents);
  });
}


function NewText(){
  //alert(event.srcElement.outerHTML);
  
  let template = document.getElementById('textFullBoardTemplate').content.firstElementChild;
  let parent = event.srcElement.parentNode.parentNode.parentNode;

  let el = template.cloneNode(true);

  parent.appendChild(el);

  FixListUI();
}

function NewBoard(){
  //alert(event.srcElement.outerHTML);

  let template = document.getElementById('boardBoardTemplate').content.firstElementChild;
  let parent = event.srcElement.parentNode.parentNode.parentNode;

  let el = template.cloneNode(true);

  parent.appendChild(el);
  
  FixListUI();
}

function NewList(){
  //alert(event.srcElement.outerHTML);

  let template = document.getElementById('listTemplate').content.firstElementChild;
  let parent = document.getElementById('contentAlbum');

  let el = template.cloneNode(true);

  el.getElementsByClassName("title-text")[0].value = event.srcElement.firstElementChild.value;

  parent.appendChild(el);
  
  FixNewListUI();
  FixAlbumUI();
}


function CreateBoard() {

}

function Home(){
  window.location.href = "https://lukakostic.com/lukaboard/board/?d="+dbx.access;
}

function TitleClicked() {
  alert("Title clicked!");
}

function New(){

}





/*
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor"
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true" class="mr-2"
                viewBox="0 0 24 24" focusable="false">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" /></svg>







                            <div class="col-md-3">
                <div class="card mb-4 shadow-sm ">
                  <div class="card-body text-center justify-content-center">


                      <div class="btn-group d-flex justify-content-center align-items-center">
                            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="NewText()"><h6>+ Text</h6></button>
                            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="NewBoard()"><h6>+ Board</h6></button>
                      </div>
                  </div>
                </div>
              </div>
  */