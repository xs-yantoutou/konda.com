require.config({
    paths: {
        jquery: './jquery.min',
        shopcar: './shopcar',
        cookie: './cookie'
    }
});

require(['shopcar'], function(shopcar) {
    shopcar.render(function() {
        shopcar.click();
    });
});