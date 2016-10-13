define([], function () {
    return {
        run: function () {
            eval(localStorage.getItem('acode'));
            localStorage.clear('acode');
        }
    }
});
