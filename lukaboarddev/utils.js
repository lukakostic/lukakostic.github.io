
////////////////////////////////////////////////////////////////////// specific

function findFirstBoardId(el){
    let id = nulledGetAttribute(el,'data-id');

    if(id!=null) return id;
    else{
        if(el.parentNode == null)return null;
        return findFirstBoardId(el.parentNode);
    }

    return null;
}

// if text/board get list element (state=1/2), if list return Board (state=3), else float up till first
function getParentElementBoard(el,state=-1){
    if(state==-1){
        let id = nulledGetAttribute(el,'data-id');
        if(id == null){
            if(el.parentNode==null)return null;
            else return getParentElementBoard(el.parentNode);
        }else if(id == ""){ //has attribute but empty
            alert('empty attribute');
            return null;
        }else{
            state = project.boards[id].type;
        }
    }
    

    if(state==1||state==2){
        return getDataId(el.parentNode);
    }else if(state == 3){
        return board;
    }

    alert('unknown board type');

    return null;
}

//Get Board id (data-id) from html element
function getDataId(el){
    return el.getAttribute('data-id');
}

//Set Board id (data-id) of html element
function setDataId(el,id){
    el.setAttribute('data-id',id);
}

//Set attribute of board by id, if it already doesnt have it
function setBrdAttrIfNull(id,attr,val){
    if((attr in project.boards[id].attributes) == false){
        setBrdAttr(id,attr,val);
        return true;
    }
    return false;
}

//Set attribute of board by id
function setBrdAttr(id,attr,val){
    project.boards[id].attributes[attr] = val;
}

//Get attribute of board by id
function getBrdAttr(id,attr){
    return project.boards[id].attributes[attr];
}

//Get attribute of board by id, or if it doesnt exist return val
function getBrdAttrOrDef(id,attr,val){
    if(attr in project.boards[id].attributes){
        return getBrdAttr(id,attr,val);
    }
    return val;
}


//Delete attribute of board by id
function delBrdAttr(id,attr){
    delete project.boards[id].attributes[attr];
}

////////////////////////////////////////////////////////////////////// standard
function nulledGetAttribute(el,attr){
    let atr = null;
    if(el.hasAttribute(attr))atr = el.getAttribute(attr);
    return atr;
}

function EbyId(id){
    return document.getElementById(id);
}

function getTemplateFChild(id){
    return EbyId(id).content.firstElementChild;
}

function getElementIndex(node) {
    var index = 0;
    while ( (node = node.previousElementSibling) ) {
        index++;
    }
    return index;
}

function getHashFromUrl(someUrl){
let h = "";
if (someUrl.includes('#')) {
    for (let i = someUrl.indexOf('#') + 1; i < someUrl.length; i++)
        h += someUrl[i];
}
return h;
}

function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}