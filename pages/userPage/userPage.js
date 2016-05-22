'use strict';

require('./userPage.css');

$(function () {
    $('.panel.main .panel-heading').each(function () {
        $(this).click(function () {
            var last = $(this).next();

            if ($(last).css('display') === 'none') {
                $(last).css('display', 'block');
            } else {
                $(last).css('display', 'none');
            }
        });
    });

    $('.glyphicon-trash').click(function () {
        var title = $(this).parent().data('name');

        $.ajax({
            url: '/remove-quest',
            type: 'POST',
            data: {title: title}
        })
            .done(function () {
                location.reload();
            })
            .fail(function (err) {
                swal(err.responseText); // eslint-disable-line
            });
    });
});
