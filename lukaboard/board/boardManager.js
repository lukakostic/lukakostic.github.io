let url = window.location.href.replace('#', '');

let dbx = DropboxManager.fromUrl(url);

let allBoards = {}; //hashmap / object of all board objects: [id]:board
let board = "";

let optionsElement = null;

let boardTypes = {
  Text : 1,
  Board : 2,
  List : 3
};


let textBrdTemplate = getTemplateFChild('textBoardTemplate');
let boardBrdTemplate = getTemplateFChild('boardBoardTemplate');
let listTemplate = getTemplateFChild('listTemplate');

let contentAlbum = EbyId('contentAlbum');
let mainContentAlbum= EbyId('mainContentAlbum');

let mainList = EbyId('main-list');

let dragOld, dragNew, dragItem;


loadAll(()=>{
  newPageOpened();
});
uiToFunctions();



//bootbox.alert((board==null)?('main board'):('board: ' + board.id));


//bootbox.alert("hello :3");


function saveAll(callback=null) {
  try{

    let contents = JSON.stringify(allBoards);

    dbx.filesUpload({ path: '/' + 'lukaboard.lb', contents: contents , mode:'overwrite'},callback);

  }catch(e){bootbox.alert(e.message);}
}

function loadAll(callback = null) {
    try{

    dbx.filesDownload({ path: '/' + 'lukaboard.lb' },function loaded(contents){

      if (contents != null) {
        allBoards = JSON.parse(contents);

        //bootbox.alert(contents);
      }else{
        allBoards = {};
        board = "";
      }
        
      if(callback) callback();

    });

  }catch(e){bootbox.alert(e.message);}
}

function newText(){
  //alert(event.srcElement.outerHTML);
  
  let template = getTemplateFChild('textBoardTemplate');
  let parent = event.srcElement.parentNode.parentNode.parentNode;

  let el = template.cloneNode(true);

  let atr = {references:1};
  if(board == "")atr['onMain'] = true;
  let brd = new Board(boardTypes.Text,"Text","",atr);

  allBoards[brd.id]=brd;
  if(board != "") allBoards[parent.getAttribute('data-id')].content.push(brd.id); //Add to parent list

  parent.appendChild(el);
  loadTextBoard(el,brd.id);

  el.getElementsByClassName('textBtn')[0].click(); //////////////////////////

  fixListUI(parent);
  saveAll();
}

function newBoard(){
  //alert(event.srcElement.outerHTML);

  let template = getTemplateFChild('boardBoardTemplate');
  let parent = event.srcElement.parentNode.parentNode.parentNode;

  let el = template.cloneNode(true);

  let atr = {description:'Description',references:1};
  if(board == "")atr['onMain'] = true;
  let brd = new Board(boardTypes.Board,"Board",[],atr);

  allBoards[brd.id]=brd;
  if(board != "") allBoards[parent.getAttribute('data-id')].content.push(brd.id); //Add to parent list

  parent.appendChild(el);
  loadBoardBoard(el,brd.id);

  
  fixListUI(parent);
  saveAll((msg)=>{
    el.getElementsByClassName('textBtn')[0].click(); //////////////////////////
  });
}

function newList(){
  //alert(event.srcElement.outerHTML);

  let template = getTemplateFChild('listTemplate');

  let el = template.cloneNode(true);

  let name = event.srcElement.firstElementChild.value;
  el.getElementsByClassName("title-text")[0].value = name;

  let brd = new Board(boardTypes.List,name,[],{references:1});
  allBoards[brd.id]=brd;
  allBoards[board].content.push(brd.id);

  contentAlbum.appendChild(el);
  el.setAttribute('data-id', brd.id);

  
  fixNewListUI();
  fixAlbumUI();
  saveAll();
}
