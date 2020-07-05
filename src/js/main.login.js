require.config({
    paths: {
        jquery: './jquery.min',
        login: './login'

    },

});
require(['login'], function(login) {
    login.confirm();
});