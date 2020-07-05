require.config({
    paths: {
        jquery: './jquery.min',
        item: './item',
        simpleImage: './zoomio',
        cookie: './cookie'
    },
    shim: {
        simpleImage: ['jquery']
    }
});
require(['item', 'jquery'], function(item, $) {
    item.render(function(id, price) {
        item.click();
        item.simpleImage();
        $('.addCar').on('click', function() {
            item.addItem(id, price, $('.item_count>input').val());
        });
    });
});