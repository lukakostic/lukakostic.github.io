let url = window.location.href.replace('#', '');

let dbx = DropboxManager.fromUrl(url);

let allBoards,board; //allBoards = hashmap of all board objects: [id]:board, board = current id


/////////////////////////////////////////////////////////////////////// Key page elements
let textBrdTemplate = getTemplateFChild('textBoardTemplate');
let boardBrdTemplate = getTemplateFChild('boardBoardTemplate');
let listTemplate = getTemplateFChild('listTemplate');

let contentAlbum = EbyId('contentAlbum');
let mainContentAlbum= EbyId('mainContentAlbum');
let mainList = EbyId('main-list');

let loadingIndicator = EbyId('loadingIndicator');
let savingIndicator = EbyId('savingIndicator');
///////////////////////////////////////////////////////////////////////



resetData();

/////////////////////////////////////////////////////////////////////// OnLoad functions
loadAll(()=>{
  loadingIndicator.style.display = 'none';
  newPageOpened();
});
uiToFunctions();
///////////////////////////////////////////////////////////////////////


function urlFromBoardId(boardId){
  return siteUrl + "/" + "?d=" + dbx.access + "?b=" + boardId;
}

function loadURL(newUrl, forceRefresh = false){
  url = newUrl;
  if(forceRefresh) window.location.href = url;
  else{
    newPageOpened();
  }
}

function loadBoardId(boardToLoad, forceRefresh = false){
  loadURL(urlFromBoardId(boardToLoad, forceRefresh));
}



function resetData(){
  allBoards = {};
  //main board
  allBoards[""] = new Board(boardTypes.List,"",[],{references:99999999999,main:true},""); //////////////////////////////////////// change to ListBoard ?
  board = "";
}

function saveAll(callback = null, log = null) {
  try{ 

    startSavingIndicator();

    let contents = JSON.stringify(allBoards);

    dbx.filesUpload({ path: '/' + 'lukaboard.lb', contents: contents , mode:'overwrite'},()=>{
      if(callback!=null) callback();
      stopSavingIndicator();
    },
    (msg)=>{
      if(msg.type == 'error') bootbox.alert(msg.msg + '');
      if(log)log(msg);
    });

  }catch(e){bootbox.alert(e.message);}
}

function loadAll(callback = null, log = null) {
    try{

    dbx.filesDownload({ path: '/' + 'lukaboard.lb' },function loaded(contents){

      if (contents != null) {
        allBoards = JSON.parse(contents);

        //bootbox.alert(contents);
      }else{
        resetData();
      }
        
      if(callback) callback();

    },
    (msg)=>{
      if(msg.type == 'error') bootbox.alert(msg.msg + '');
      if(log)log(msg);
    });

  }catch(e){bootbox.alert(e.message);}
}

function newText(){
  
  let parent = event.srcElement.parentNode.parentNode.parentNode; ////////////// replace by find parent thing?

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

  let parent = event.srcElement.parentNode.parentNode.parentNode; ////////////// replace by find parent thing?

  let el = boardBrdTemplate.cloneNode(true);

  let atr = {description:'Description',references:1};
  let brd = new Board(boardTypes.Board,"Board",[],atr);

  allBoards[brd.id]=brd;
  allBoards[getBId(parent)].content.push(brd.id); //Add to parent list

  parent.appendChild(el);
  loadBoardBoard(el,brd.id);

  
  fixListUI(parent);
  saveAll(()=>{
    el.getElementsByClassName('textBtn')[0].click(); ////////////////////////// load board on add, might not want to do this. and to be moved to before saving, since
  });
}

function newList(){

  let el = listTemplate.cloneNode(true);

  let inp = event.srcElement.firstElementChild;
  let name = inp.value;

  let titleText = el.getElementsByClassName("title-text")[0];
//  $(titleText).val(name);
  $(titleText).html(name); //we assume its div at start
  //$(titleText).prop("readonly",true);
  titleText.addEventListener('click',listTitleClicked,true);
  titleText.onblur = ()=>{listTitleBlur();};

  let brd = new Board(boardTypes.List,name,[],{references:1});
  allBoards[brd.id]=brd;
  allBoards[board].content.push(brd.id);

  contentAlbum.appendChild(el);
  setBId(el, brd.id);

  
  fixNewListUI();
  fixAlbumUI();
  saveAll();

  makeDraggable();
  $(inp).val(''); //clear new list textbox
}
