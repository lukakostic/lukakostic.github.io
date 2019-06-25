
////////////////////////////////////////////////////////////////////// specific

//if board btn return board element, if board get list element, if list return board
function getParentElementBoard(el){

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