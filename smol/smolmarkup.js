class SmolMarkup
{
    constructor(str)
    {
        this.str = str;
        this.vars = [];
        this.compiled = '';
    }

    compile()
    {
        this.compiled = '';
        let indentation = 0;
        let state = 0; // 0 = normal , 1 = in quotes , 2 = in ml quotes , 3 = in comment , 4 = in ml comment
        let escapeNext = false;
        
        let word = '';
        
        for(let l = 0; l < this.str.length; l++)
        {
            
        }
    }
}
