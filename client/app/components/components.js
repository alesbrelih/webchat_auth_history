function useComponents(app){

    const authComponent = require("./auth/auth.component");
    authComponent(app);

    const loginCOmponent = require("./auth/login/login.component");
    loginCOmponent(app);
}

module.exports = useComponents;