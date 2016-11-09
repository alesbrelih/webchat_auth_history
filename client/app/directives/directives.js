function registerAllDirectives(app){

    ///////////////////////////////////
    // ---- Attribute directives -----
    ///////////////////////////////////
    
    const pwdMatchDirective = require("./a/ab.pwd.match");
    pwdMatchDirective(app);
}

module.exports = registerAllDirectives;