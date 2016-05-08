$('.commentForm').each(function () {
    $(this).submit(function (event) {
        event.preventDefault();
        var form = $(this);
        var text = form.find('.new-comment').val();
        var url = form.attr('action');
        var name = form.data('name');
        var className = '.' + name.replace(/ /g, '-');
        $(className).append('<div class="row"><div class="col-sm-5">' +
            '<div class="panel panel-default"><div class="panel-heading">' +
            '<span class="glyphicon glyphicon-user" aria-hidden="true"></span>' +
            '<strong>You</strong></div><div class="panel-body">' +
            text + '</div></div></div></div>');
        form.find('textarea').val('');

        $.ajax({
            method: 'POST',
            url: url,
            data: {
                name: name, text: text
            }
        })
            .done(function () {
                console.log('add comments');
            })
            .fail(function (msg) {
                console.log(msg);
            });
    });
});

$('.new-comment').each(function () {
    $(this).bind('input propertychange', function () {
        var form = $(this).parent();
        if ($(this).val().length === 0) {
            form.find('[type="submit"]').prop('disabled', true);
        } else {
            form.find('[type="submit"]').prop('disabled', false);
        }
    });
});
