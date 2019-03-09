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
        let parent = '';
        let indentation = 0;
        let word = '';
        let inQuotes = false;
        let gotCommentStart = false;
        let escapeNext = false;
        let inComment = false;
        for(let i = 0; i < this.str.length; i++)
        {
            
        }
    }
}
