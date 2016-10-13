define([], function () {
    return {
        run: function () {
            eval(localStorage.getItem('acode'));
            localStorage.removeItem('acode');
        }
    }
});
