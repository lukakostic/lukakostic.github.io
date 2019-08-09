let curVer = 1;

function copyNewProperties(from, to){
    let fields = Object.keys(from);
    for(let i = 0; i < fields.length; i++){
        if((fields[i] in to) == false){
            to[fields[i]] = from[fields[i]];
        }
    }
    return to;
}

function updateProject(proj){
    if(proj.version == curVer){
        return proj;   
    }
    if(proj.version == 2){
        let p = proj;//copyNewProperties(new Project(),proj);
        p.version = 1;
        return updateProject(p);
    }
    return null;
}