var handle_link = function (type) {
    $(type).on('click', function (event) {
        var hash = event.currentTarget.hash;
        if (hash && hash != location.hash) {     
            var path = window.jsondata[hash]
            ajaxmain(path).then(function (item) {
                renderHTML(item.selector, item.content, item.hasOwnProperty('classname') ? item.classname : '')
                handle_link('main a');
            });
        }
    });
}

var ajaxmain = (path) => {
    let inarg = {
        path: path,
        data: {}
    }
    let outarg = {
        selector: "main",
    }
    return ajaxhandle(inarg, outarg);
};

$(function () {
    $.get('page/cms.json').then(function (jsondata) {
        window.jsondata = jsondata;
        var path = jsondata[location.hash]
        if (!path) {
            path = jsondata["#404"]
        }
        total_render(ajaxmain(path)).then(function (value) {
            for (index in value) {
                let item = value[index]
                renderHTML(item.selector, item.content, item.hasOwnProperty('classname') ? item.classname : '')
            }
            handle_link('a');
        });
    });

});