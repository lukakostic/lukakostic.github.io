let dataSave = false;
setInterval(()=>{
    if(dataSave){
        dataSave = false;
        saveAll();
    }
},5000);

function boardTitleChanged(){
    //alert("Board title changed");
<<<<<<< HEAD
    project.boards[board].name = event.srcElement.value;
=======
    project.allBoards[board].name = event.srcElement.value;
>>>>>>> fab8f27673e4fe7609f7768b5db5ccc2ef0126da

    loadAllBoardsByDataId(board);

    dataSave = true;
}

function boardDescriptionChanged(){
    //alert("Board title changed");
<<<<<<< HEAD
    setBrdAttr(board,'description',event.srcElement.value);
=======
    project.allBoards[board].attributes['description'] = event.srcElement.value;
>>>>>>> fab8f27673e4fe7609f7768b5db5ccc2ef0126da

    loadAllBoardsByDataId(board);

    dataSave = true;
}

function listTitleChanged(){
    console.log('list title changed');

    //alert("List title changed");
    let listId = event.srcElement.parentNode.parentNode.getAttribute('data-id');
<<<<<<< HEAD
    project.boards[listId].name = $(event.srcElement).text();
=======
    project.allBoards[listId].name = $(event.srcElement).text();
>>>>>>> fab8f27673e4fe7609f7768b5db5ccc2ef0126da

    dataSave = true;
}









/*
class DataBinder {
    constructor() {
        this.bindings = [];
        this.interval = setInterval(()=>{
            update();
        },1);
    }

    update(){
        for(let i = 0; i < this.bindings.length; i++){
            
        }
    }


    //ways = 0 : twoway, ways = 1 : html to js, ways = 2 : js to html
    bindData(element, elementField, jsObject, jsObjectField, ways = 0){
        let binding = {};

        binding['element'] = element;
        binding['elementField'] = elementField;
        binding['jsObject'] = jsObject;
        binding['jsObjectField'] = jsObjectField;

        this.bindings.append(binding);
    }
    
    //ways = 0 : twoway, ways = 1 : html to js, ways = 2 : js to html
    unbindData(element, elementField, jsObject, jsObjectField, ways = 0){
        for(let i = 0; i < this.bindings.length; i++){
            if(this.bindings[i]['element'] == element && this.bindings[i]['elementField'] == elementField && this.bindings[i]['jsObject'] == jsObject && this.bindings[i]['jsObjectField'] == jsObjectField){
                this.bindings.splice(i,1);
            }
        }
    }


    unbindAll(){
        this.bindings = [];
    }
}
*/