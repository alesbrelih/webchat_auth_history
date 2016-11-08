function jwtServiceTesting(angular){


    describe("JWT SERVICE TESTING: ",()=>{

        var JwtService;


        beforeEach(angular.mock.module("webChat"));

        beforeEach(inject(($injector)=>{
            JwtService = $injector.get("JwtService");

            JwtService.RemoveToken();
        }));

        it("Adding token",()=>{
            JwtService.SaveToken("JwtToken");
            expect(JwtService.TokenExists()).toEqual(true);
        });
        it("Removing token",()=>{
            JwtService.SaveToken("JwtToken");
            JwtService.RemoveToken();
            expect(JwtService.TokenExists()).toEqual(false);
        });

        


    });


}

module.exports = jwtServiceTesting;