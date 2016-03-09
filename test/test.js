describe('gulp-jasmine-browser', function () {
    var scope,
        controller;
    beforeEach(function () {
        module('store');
    });
//    it('check match', function () {
//        var matchs = {};
//        var ref = new Firebase("https://cscassignment.firebaseio.com/teamCalendar");
//        ref.on("value", function (snapshot) {
//            matchs = snapshot.val();
//        });
//        var date = moment("28/02/2016", "DD/MM/YYYY");
//        expect(checkMatch(date, matchs)).toBe(true);
//    });
   
    describe('MyController', function () {
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('mainController', {
                '$scope': scope
            });
        }));
        it('sets the name', function () {
            expect(scope.numitem).toBe(0);
        });
    });
});