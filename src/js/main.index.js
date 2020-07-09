require.config({
    paths: {
        jquery: './jquery.min',
        index: './index',
        HappyImage: './HappyImage.min'
            // lazyload: './jquery.lazyload'
    },
    shim: {
        HappyImage: ['jquery'],
        lazyload: ['jquery']
    }
});
require(['index'], function(index) {
    // index.lazyload();
    index.render();
    index.HappyImage();
    index.srolltop();

});