class VisualMarkupVar {
  constructor(name,val){
    this.name = name;
    this.val = val;
  }
}

class VisualMarkupObject {
  constructor(){
   
  }
}

class VisualMarkup {
    constructor(str) {
        this.str = str;
        this.vars = [];
        this.compiled = '';
    }

    compile() {
    this.compiled = '';
      for(let i = 0; i < this.str.length; i++){
      
      }
    }
}
