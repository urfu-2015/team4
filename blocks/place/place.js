'use strict';

require('./place.css');

$('.check-in').each(function () {
    $(this).click(function () {
        var name = $(this).data('name');
        console.log(name);
    });
});
