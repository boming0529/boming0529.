function getTemplate(path, data) {
    var d = $.Deferred();
    $.get(path + '.html', function (response) {
        var template = Handlebars.compile(response);
        d.resolve(template(data))
    });
    return d.promise();
}

var ajaxhandle = function (inarg, outarg) {
    return getTemplate(inarg.path, inarg.data).then(
        function (content) {
            return new Promise(function (resolve) {
                $.extend(outarg, {
                    content: content
                });
                resolve(outarg);
            })
        }
    )
}

var ajaxhead = () => {
    let inarg = {
        path: 'sharelayout/default',
        data: {
            title: "Boming Blog",
            CustomStyle: `<link href="static/src/css/clean-blog.min.css" rel="stylesheet">`
        }
    }
    let outarg = {
        selector: "head",
    }
    return ajaxhandle(inarg, outarg);
};

var ajaxheader = () => {
    let inarg = {
        path: 'sharelayout/header',
        data: {}
    }
    let outarg = {
        selector: "header",
        classname: "masthead",
    }
    return ajaxhandle(inarg, outarg);
};

var ajaxmenu = () => {
    let inarg = {
        path: 'sharelayout/menu',
        data: {}
    }
    let outarg = {
        selector: "nav",
    }
    return ajaxhandle(inarg, outarg);
};

var ajaxContent = () => {
    let inarg = {
        path: 'sharelayout/footer',
        data: {}
    }
    let outarg = {
        selector: "footer",
    }
    return ajaxhandle(inarg, outarg);
};

var renderHTML = function (selector, content, classname = '') {
    $(selector).addClass(classname).html(content);
}

var total_render = function (other) {
    let origin = [ajaxhead(), ajaxheader(), ajaxmenu(), ajaxContent()]
    other ? origin.push(other) : origin
    return Promise.all(origin)
}