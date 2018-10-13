function getPageTemplate(path, data) {
    var d = $.Deferred();
    $.get(path + '.html', function (response) {
        var template = Handlebars.compile(response);
        d.resolve(template(data))
    });
    return d.promise();
}

var handle_link = function (type) {
    $(type).on('click', function (event) {
        $.get('page/cms.json').then(function (jsondata) {
            var hash = event.currentTarget.hash;
            if (hash) {
                var path = jsondata[hash]
                getPageTemplate(path, {}).then(function (result) {
                    $("main").html(result);
                    handle_link('main a');
                });
            }
        })
    });
}


$(function () {
    $.get('page/cms.json').then(function (jsondata) {
        var path = jsondata[location.hash]
        if (!path) {
            path = jsondata["#404"]
        }
        getPageTemplate(path, {}).then(function (result) {
            var d = $.Deferred();
            init();
            $("main").html(result);init();
            d.resolve()
            return d.promise();
        }).then(function() {
            handle_link('a');
        })
    })

});