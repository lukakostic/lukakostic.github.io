let url = window.location.href.replace('#','');

//get dropbox token
let ACCESS_TOKEN = "";
if(url.includes('?t=')){
    for(let i = url.indexOf('?t=')+3; i < url.length && url[i] != '?'; i++)
        ACCESS_TOKEN += url[i];
}

let dbx = new Dropbox.Dropbox({ accessToken: ACCESS_TOKEN });


//get board id and check if exists
let boardId = "";
if(url.includes('?b=')){
    for(let i = url.indexOf('?b=')+3; i < url.length && url[i] != '?'; i++)
        boardId += url[i];
}
//TODO check if exists

document.getElementById('BoardTitle').innerHTML = "Board";

let currentBoard = '';
let allBoards = [];

if(boardId == ""){
    //Main board
    //document.getElementById('saveBtn').classList.add("invisible");
}else{
    //Load board
    if(DoesIdExist(boardId) == false){
        alert("Board doesn't exist!");
        throw "Board doesn't exist!";
    }
}


document.getElementById('convertBtn').onclick = ConvertBoard;
document.getElementById('saveBtn').onclick = SaveBoard;
document.getElementById('loadBtn').onclick = LoadBoard;
document.getElementById('upBtn').onclick = TitleClicked;

function renderCurrent(){
clearBoards();
let boardTemplate = document.getElementById('cardTemplate').childNodes[0];
alert(boardTemplate.outerHTML);
let boards = document.getElementById('boards');
let board = boardTemplate.cloneNode(true);

boards.appendChild(board);
}

function clearBoards(){
  let boards = document.getElementById('boards').childNodes;

  for(let i = 1; i < boards.length; i++){
    alert(boards[i].outerHTML);
    $(boards[i]).remove();
  }
}

function listFiles(files) {
    for (var i = 0; i < files.length; i++) {
      alert(files[i].name);
    }
  }


  function listAllFiles() {
        dbx.filesListFolder({path: ''})
          .then(function(response) {
            console.log('response', response);
            listFiles(response.entries);
          })
          .catch(function(error) {
            console.error(error);
          });
    }

    function SaveBoard(){
        let contents = JSON.stringify(allBoards);
        dbx.filesUpload({path: '/' + 'lukaboard.lb', contents: contents})
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.error(error);
          });
    }

    function LoadBoard(){
        let contents = null;

        dbx.filesDownload({path: '/'+'lukaboard.lb'})
    .then(function (response) {
        let blob = response.fileBlob;
        let reader = new FileReader();
    
    reader.addEventListener("loadend", function() {
        contents = reader.result;    

        if(contents != ""){
allBoards = JSON.parse(contents);
currentBoard = '';
renderCurrent();
        }

        bootbox.alert(contents);
    });

        reader.readAsText(blob);
    })
    .catch(function(error) {
      bootbox.alert(error.error);
      allBoards = [];
currentBoard = '';
renderCurrent();
      })

    }

    function ConvertBoard(){

    }

    function CreateBoard(){
        
    }

    function DoesIdExist(id){

        return true;
    }

    function TitleClicked(){
        alert("Title clicked!");
    }

    function NewBoard(){
        alert('new board');
    }

    function NewText(){
        alert('new text');
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