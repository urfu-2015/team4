$('.commentForm').each(function () {
    $(this).submit(function (event) {
        event.preventDefault();
        var form = $(this);
        var text = form.find('.new-comment').val();
        var url = form.attr('action');
        var name = form.data('name');
        console.log(name);

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
