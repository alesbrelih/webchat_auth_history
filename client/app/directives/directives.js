function registerAllDirectives(app){

    ///////////////////////////////////
    // ---- Attribute directives -----
    ///////////////////////////////////
    
    //cheks for pwd matching
    const pwdMatchDirective = require("./a/ab.pwd.match");
    pwdMatchDirective(app);

    //binds file from input[file] to selected scope variable
    const abFileVar = require("./a/ab.file.var");
    abFileVar(app);
}

module.exports = registerAllDirectives;