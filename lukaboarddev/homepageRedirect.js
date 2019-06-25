if(DropboxManager.accessFromUrl(window.location.href.replace('#', ''))=="") redirect2Homepage();

function redirect2Homepage(){
    if(window.location.pathname.includes('lukaboarddev'))
    window.location.href = "https://lukakostic.com/lukaboarddev/home";
    else
    window.location.href = "https://lukakostic.com/lukaboard/home";
}