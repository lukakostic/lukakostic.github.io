
////////////////////////////////////////////////////////////////////// specific

// if text/board get list element (state=1/2), if list return Board (state=3), else float up till first
function getParentElementBoard(el,state=-1){
    if(state==-1){
        let id = nulledGetAttribute(el,'data-id');
        if(id == false){
            if(el.parentNode==null)return null;
            else return getParentElementBoard(el.parentNode);
        }else if(id == ""){ //has attribute but empty
            return el;
        }else{
            state = project.allBoards[id].type;
        }
    }
    

    if(state==1||state==2){
        return el.parentNode;
    }else if(state == 3){
        return board;
    }

    return null;
}

//get Board id (data-id) from html element
function getBId(el){
    return el.getAttribute('data-id');
}

//set Board id (data-id) of html element
function setBId(el,id){
    el.setAttribute('data-id',id);
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