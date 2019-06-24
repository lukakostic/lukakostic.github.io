
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