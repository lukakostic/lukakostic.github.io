<<<<<<< HEAD
let curVer = 2;
=======
let curVer = 1;
>>>>>>> fab8f27673e4fe7609f7768b5db5ccc2ef0126da

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
<<<<<<< HEAD
    if(proj.version == 1){
        delete proj.preferences['manualSaveLoad'];
        let pref = copyNewProperties(new Project().preferences,proj.preferences);
        proj.preferences = pref;
        proj.version = 2;
        return updateProject(proj);
=======
    if(proj.version == 2){
        let p = proj;//copyNewProperties(new Project(),proj);
        p.version = 1;
        return updateProject(p);
>>>>>>> fab8f27673e4fe7609f7768b5db5ccc2ef0126da
    }
    return null;
}