let url = window.location.href.replace('#', '');

let dbx = DropboxManager.fromUrl(url);

let allBoards,board; //allBoards = hashmap of all board objects: [id]:board, board = current id

let boardTypes = {
  Text : 1,
  Board : 2,
  List : 3
};

resetBoards();

/////////////////////////////////////////////////////////////////////// Key page elements
let textBrdTemplate = getTemplateFChild('textBoardTemplate');
let boardBrdTemplate = getTemplateFChild('boardBoardTemplate');
let listTemplate = getTemplateFChild('listTemplate');

let contentAlbum = EbyId('contentAlbum');
let mainContentAlbum= EbyId('mainContentAlbum');
let mainList = EbyId('main-list');
///////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////// UI helper / tracking variables
let dragOld, dragNew, dragItem;
let oldDragIndex, newDragIndex;

let optionsElement = null;
///////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////// OnLoad functions
loadAll(()=>{
  newPageOpened();
});
uiToFunctions();
///////////////////////////////////////////////////////////////////////

function resetBoards(){
  allBoards = {};
  //main board
  allBoards[""] = new Board(boardTypes.List,"",[],{references:99999999999,main:true},"");
  board = "";
}

function saveAll(callback = null) {
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
        resetBoards();
      }
        
      if(callback) callback();

    });

  }catch(e){bootbox.alert(e.message);}
}

function newText(){
  
  let parent = event.srcElement.parentNode.parentNode.parentNode;

  let el = textBrdTemplate.cloneNode(true);

  let brd = new Board(boardTypes.Text,"Text","",{references:1});

  allBoards[brd.id]=brd;
  allBoards[getBId(parent)].content.push(brd.id); //Add to parent list

  parent.appendChild(el);
  loadTextBoard(el,brd.id);

  el.getElementsByClassName('textBtn')[0].click(); //////////////////////////

  fixListUI(parent);
  saveAll();
}

function newBoard(){

  let parent = event.srcElement.parentNode.parentNode.parentNode;

  let el = boardBrdTemplate.cloneNode(true);

  let atr = {description:'Description',references:1};
  let brd = new Board(boardTypes.Board,"Board",[],atr);

  allBoards[brd.id]=brd;
  allBoards[getBId(parent)].content.push(brd.id); //Add to parent list

  parent.appendChild(el);
  loadBoardBoard(el,brd.id);

  
  fixListUI(parent);
  saveAll((msg)=>{
    el.getElementsByClassName('textBtn')[0].click(); //////////////////////////
  });
}

function newList(){

  let el = listTemplate.cloneNode(true);

  let inp = event.srcElement.firstElementChild;
  let name = inp.value;

  titleText = el.getElementsByClassName("title-text")[0];
  titleText.value = name;
  $(titleText).html(name); //we assume its div at start

  let brd = new Board(boardTypes.List,name,[],{references:1});
  allBoards[brd.id]=brd;
  allBoards[board].content.push(brd.id);

  contentAlbum.appendChild(el);
  setBId(el, brd.id);

  
  fixNewListUI();
  fixAlbumUI();
  saveAll();

  makeDraggable();
  $(inp).val(''); //clear listbox
}
