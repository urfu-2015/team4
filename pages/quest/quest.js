require('../../blocks/place/place.css');
require('../../blocks/comments/comments.css');
require('./quest.css');

$('.panel.main').each(function() {
    $(this).click(function () {
        var last = $(this).children().last();
        if ($(last).css('display') === 'none') {
            $(last).css('display', 'block');
        } else {
            $(last).css('display', 'none');
        }
    });
});

$('#quest-like').change(function (e) {
    var name = $('#quest-title').val();
    $.ajax({
        method: 'POST',
        url: '/like-quest/' + name,
        data: {
            name: name
        }
    })
    .done(function (count) {
        $('#likes-count').val = count;
    })
    .fail(function (msg) {
        console.log(msg);
    });
});



