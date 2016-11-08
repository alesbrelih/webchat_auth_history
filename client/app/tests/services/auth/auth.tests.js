function authServiceTesting(angular){
    //auth service testing
    describe("TESTING AUTHENTICATION SERVICE",()=>{

        var $httpBackend, AuthService, JwtService;

        //before each IT statement
        beforeEach(angular.mock.module("webChat"));

        beforeEach(inject(function($injector){

            //http backend
            $httpBackend = $injector.get("$httpBackend");

            //auth service                                    
            AuthService = $injector.get("AuthService");

            //jwt service
            JwtService = $injector.get("JwtService");

        }));

        //after each it check that backend has no requests/expectations
        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        describe("LOGIN SERVICE TESTS:",()=>{
            it("successful login",()=>{
                $httpBackend.expectPOST('http://localhost:8001/api/users/login').respond(200,{token:"jwtToken"});
                 AuthService.Login({email:"email@email.com",password:"what"});
                $httpBackend.flush();

                var tokenExists = JwtService.TokenExists();
                expect(tokenExists).toEqual(true);
            });

            it("bad login",()=>{
                $httpBackend.expectPOST('http://localhost:8001/api/users/login').respond(400,{errmsg:"Bad login"});
                AuthService.Login({email:"email@email.com",password:"what2"});
                $httpBackend.flush();

                var tokenExists = JwtService.TokenExists();
                expect(tokenExists).toEqual(false);
            });
        });

        describe("REGISTER SERVICE TESTS:",()=>{
            it("successful register",()=>{
                $httpBackend.expectPOST("http://localhost:8001/api/users/register").respond(200,{token:"jwtToken"});
                AuthService.Register({email:"email@email.email",password:"what"});
                $httpBackend.flush();

                var tokenExists = JwtService.TokenExists();
                expect(tokenExists).toEqual(true);
            });

            it("bad register",()=>{
                $httpBackend.expectPOST("http://localhost:8001/api/users/register").respond(400,{errmsg:"Bad login"});
                AuthService.Register({email:"email@email.email",password:"what2"});
                $httpBackend.flush();

                var tokenExists = JwtService.TokenExists();
                expect(tokenExists).toEqual(false);
            });
        });

            


    });
}





module.exports = authServiceTesting;