let url = window.location.href.replace('#','');

let ACCESS_TOKEN = "";

if(url.includes('?t=')){
    //boardId = url.substring(url.indexOf('?b=')+3);

    for(let i = url.indexOf('?t=')+3; i < url.length && url[i] != '?'; i++)
        ACCESS_TOKEN += url[i];
}

let dbx = new Dropbox.Dropbox({ accessToken: ACCESS_TOKEN });


let boardId = "";
//get board id and check if exists
if(url.includes('?b=')){
    //boardId = url.substring(url.indexOf('?b=')+3);

    for(let i = url.indexOf('?b=')+3; i < url.length && url[i] != '?'; i++)
        boardId += url[i];
    
}

//alert('Token: ' + ACCESS_TOKEN);
//alert('Board: ' + boardId);

document.getElementById('projectTitle').innerHTML = "Board";

let board = null;

if(boardId == ""){
    //Main board
    
    //document.getElementById('saveBtn').classList.add("invisible");
    //document.getElementById('loadBtn').classList.add("invisible");

}else{
    //Load board

    if(DoesIdExist(boardId) == false){
        alert("Board doesn't exist!");
        throw "Board doesn't exist!";
    }else{
        document.getElementById('saveBtn').onclick = ConvertBoard;
        document.getElementById('saveBtn').onclick = SaveBoard;
        document.getElementById('loadBtn').onclick = LoadBoard;
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
        let contents = 'ass';
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
        alert(contents);
    });

        reader.readAsText(blob);
    })
    .catch(function(error) {
        console.error(error);
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