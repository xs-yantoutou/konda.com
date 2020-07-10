require.config({
    paths: {
        jquery: './jquery.min',
        login: './login',
        cookie: './cookie'
    },

});
require(['login'], function(login) {
    login.confirm();

});