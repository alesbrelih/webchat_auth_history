//passing angular for reference
function StateTesting(angular)
{   

    describe('STATE TESTING:', () => {

        var $state = "";
        
        beforeEach(()=>{

            angular.mock.module("webChat");
            inject(($injector) => {
                $state = $injector.get("$state");
            });
        });

        
        describe('TESTING HOME ROUTE:', () => {
            
            //define state holder
            var state = "";

            it('URL SHOULD BE -> /', () => {
                state = $state.get("home");
                expect(state.url).toEqual("/");
                    
            });

            it('TEMPLATE SHOULD BE -> <home-view></home-view>', () => {
                
                expect(state.template).toEqual("<home-view></home-view>");
                    
            });
                

        });

        describe('TESTING LOGIN ROUTE:', () => {
            
            //define state holder
            var state = "";

            it('URL SHOULD BE -> /login', () => {
                state = $state.get("auth.login");
                expect(state.url).toEqual("/login");
                    
            });

            it('TEMPLATE SHOULD BE -> <login-view></login-view>', () => {
                
                expect(state.template).toEqual("<login-view></login-view>");
                    
            });
                

        });

        describe('TESTING REGISTER ROUTE:', () => {
            
            //define state holder
            var state = "";

            it('URL SHOULD BE -> /REGISTER', () => {
                state = $state.get("auth.register");
                expect(state.url).toEqual("/register");
                    
            });

            it('TEMPLATE SHOULD BE -> <register-view></register-view>', () => {
                
                expect(state.template).toEqual("<register-view></register-view>");
                    
            });
                

        });
            
            
            
    });
}

module.exports = StateTesting;   