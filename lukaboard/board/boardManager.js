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
    
    document.getElementById('saveBtn').classList.add("invisible");
    document.getElementById('loadBtn').classList.add("invisible");

}else{
    //Load board

    if(DoesIdExist(boardId) == false){
        alert("Board doesn't exist!");
        window.location.href = window.location.href.substring(0,window.location.href.indexOf('?board='));
    }else{

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

    function CreateBoard(){
        
    }

    function DoesIdExist(id){

        return true;
    }

    function TitleClicked(){
        alert("Title clicked!");
    }


/*
  var client = new Dropbox.Client({ key: 'YOUR-APP-KEY-HERE' });

  function doHelloWorld() {
      client.writeFile('hello.txt', 'Hello, World!', function (error) {
          if (error) {
              alert('Error: ' + error);
          } else {
              alert('File written successfully!');
          }
      });
  }

  // Try to complete OAuth flow.
  client.authenticate({ interactive: false }, function (error, client) {
      if (error) {
          alert('Error: ' + error);
      }
  });

  if (client.isAuthenticated()) {
      doHelloWorld();
  }

  document.getElementById('writeButton').onclick = function () {
      client.authenticate(function (error, client) {
          if (error) {
              alert('Error: ' + error);
          } else {
              doHelloWorld();
          }
      });
  }
  */