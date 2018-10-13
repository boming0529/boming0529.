function getTemplate(name, data) {
    var d = $.Deferred();
    $.get('sharelayout/' + name + '.html', function (response) {
        var template = Handlebars.compile(response);
        d.resolve(template(data))
    });
    return d.promise();
}

var headContent = function () {
    let data = {
        title: "Boming Blog",
        CustomStyle: `<link href="static/src/css/clean-blog.min.css" rel="stylesheet">`
    }
    getTemplate('default', data).then(function (result) {
        $("head").html(result);
    });
};

var headerContent = function () {
    getTemplate('header', {}).then(function (result) {
        $("header").addClass('masthead').html(result);
    });
};

var menuContent = function () {
    getTemplate('menu', {}).then(function (result) {
        $("nav").html(result);
    });
};

var footerContent = function () {
    getTemplate('footer', {}).then(function (result) {
        $("footer").html(result);
    });
};


var init = function() {
    headContent();
    headerContent();
    menuContent();
    footerContent();
}