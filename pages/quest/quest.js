'use strict';

require('./quest.css');
require('../../blocks/comments/comments.js');
var checkInFunc = require('../../blocks/place/place.js').checkIn;

$(function () {
    $('#quest-like').change(function () {
        var title = $('#quest-title').html();
        var valueInput = $('#likes-count');
        var oldValue = Number($(valueInput).html());
        var newValue = $(this).prop('checked') ? oldValue + 1 : Math.max(0, oldValue - 1);

        $(valueInput).html(newValue);

        var checkbox = $(this);

        $(checkbox).prop('disabled', true);

        $.ajax({
            method: 'POST',
            url: '/like-quest/',
            data: {title}
        })
        .done(function (respond) {
            $(checkbox).prop('disabled', false);
            $(valueInput).html(respond.count);
        })
        .fail(function (msg) {
            console.log(msg);
            $(valueInput).html(oldValue);
            $(this).prop('checked', !$(this).prop('checked'));
        });
    });

    /*  eslint quote-props: [1, "as-needed"] */
    $('#start-quest').click(function () {
        var title = $('#quest-title').html();
        var button = this;

        $(button).css('display', 'none');

        $.ajax({
            method: 'POST',
            url: '/start-quest/',
            data: {title}
        })
        .done(function () {
            $(button).remove();

            $('.place .caption').each(function () {
                var name = $(this).data('name');
                var checkIn = $('<button></button>', {
                    class: 'btn btn-success check-in',
                    text: 'Check-in',
                    'data-name': name
                });
                checkIn.click(checkInFunc);
                $(this).append(checkIn);
            });
        })
        .fail(function (msg) {
            console.log(msg);
            $(button).css('display', 'inline-block');
        });
    });
});
