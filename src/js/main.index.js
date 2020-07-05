require.config({
    paths: {
        jquery: './jquery.min',
        index: './index',
        HappyImage: './HappyImage.min'
    },
    shim: {
        HappyImage: ['jquery']
    }
});
require(['index'], function(index) {
    index.render();
    index.HappyImage();
    index.srolltop();
});