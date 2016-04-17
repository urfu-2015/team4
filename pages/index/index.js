require('./index.css');
require('../../blocks/header/header.js');
var skip = 0;

/* global $: true*/
$('#getMore').click(function (e) {
    e.preventDefault();
    $.ajax({
        method: "POST",
        url: "/getMoreQuests",
        skip: skip + 10
    })
    .done(function (data) {
        data.quests.forEach(function (elem) {
            $('body').append('<script id="entry-template" type="text/x-handlebars-template">' +
                '<div class="quest"<div class="quest_name"><p class="quest_name_a"><a href={{url}}>{{title}}</a></p>' +
                '</div><img class="quest_img img-rounded" src={{photo}}></div></script>');
            var source   = $("#entry-template").html();
            var template = Handlebars.compile(source);
            var html = template(elem);
            $("#list-of-quests").append(html);
        });
    });
});
