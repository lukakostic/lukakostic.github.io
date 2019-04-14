
/*
$("#boards *").filter(function() {
    //$(this).toggle($(this).data("id")=="Web")
alert($(this).html());
});
*/

filterURL();

function filterURL(){
let filters = [];

let url = window.location.href;
for(let i = 0; i < url.length; i++){
    if(url[i] == '#') filters.unshift('');
    else if(filters.length != 0) filters[0]+=url[i];
}


if(filters!=[] && filters.every(i=>i=='') == false){
$("#boards").children().each(function(i) {
    let tags = $(this).data('tags');
    if(filters.some(r=> r != '' && tags.indexOf(r) > -1) == false)
    $(this).hide();
    else
    $(this).show();
});
}else{
    $("#boards").children().each(function(i) {
        $(this).show();
    });
}


}

window.onhashchange = filterURL;