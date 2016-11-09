function toasterServiceTestModule(angular){


    describe("TOASTER SERVICE TEST: ",()=>{
        let toastService,$timeout = "";
        beforeEach(angular.mock.module("webChat"));
        beforeEach(inject(($injector)=>{
            toastService = $injector.get("ToasterService");
            $timeout = $injector.get("$timeout");
        }));

        it("Toasters should be empty array",()=>{
            let typeOfArray = toastService.Toasters instanceof Array;
            expect(typeOfArray).toEqual(true);
        });

        it("Toasters should be empty at first",()=>{
            let arrayLength = toastService.Toasters.length;
            expect(arrayLength).toBe(0);
        });

        it("Toasters are added when .Add method is called",()=>{
            toastService.Add("success","message");
            let arrayLength = toastService.Toasters.length;
            expect(arrayLength).toBe(1);
        });

        it("Toasters are removed when .Remove method is called",()=>{
            toastService.Add("success","message");
            toastService.Remove(1);
            let arrayLength = toastService.Toasters.length;
            expect(arrayLength).toBe(0);
        });

        it("Toasters are automatically removed after 2s",()=>{
            toastService.Add("success","message");
            $timeout(()=>{
                let arrayLength = toastService.Toasters.length;
                expect(arrayLength).toBe(0);
            },2100);
            $timeout.flush();

        });


    });
}




module.exports = toasterServiceTestModule;