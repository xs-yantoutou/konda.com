require.config({
    paths: {
        jquery: './jquery.min',
        reg: './reg'

    },

});
require(['reg'], function(reg) {
    reg.confirm();
});