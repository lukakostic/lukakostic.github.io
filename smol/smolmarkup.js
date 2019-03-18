class SmolObject{
    constructor(type,data){
        this.type = type;
        this.data = data;
        this.children = [];
    }
}

class SmolVariable{
    constructor(name,data){
        this.name = name;
        this.data = data;
    }
}

class SmolMarkup
{
    constructor(str)
    {
        this.str = str;
        this.vars = [];
        this.compiledWords = [];
        this.compiledVariables = [];
    }

    build()
    {
        this.compiledWords = [];
        this.compiledVariables = [];
        
        let indentation = 0;
        let state = 0; // 0 = normal , 1 = in quotes , 2 = in ml quotes , 3 = in comment , 4 = in ml comment
        let escapeNext = false;
        
        let word = '';
        
        
        for(let i = 0; i < this.str.length; i++)
        {
            alert("'"+this.str[i]+"' : " + this.str[i].charCodeAt(0));
        }
    }
    
    compile(){
     this.compiled = '';   
    }
}
