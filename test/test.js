describe('gulp-jasmine-browser', function () {
    var scope,
        controller;
    beforeEach(function () {
        module('store');
    });
   
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