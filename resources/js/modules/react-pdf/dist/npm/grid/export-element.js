"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportElement = void 0;
var grid_query_1 = require("./grid-query");
var utils_1 = require("../common/utils");
/**
 * @hidden
 */
var exportElement = function (wrapper) {
    var query = new grid_query_1.GridQuery(wrapper);
    var content = query.content();
    var result;
    if (content) {
        var colGroups = [content.querySelector('colgroup')];
        var headers = [query.header().querySelector('thead')];
        var bodies = [content.querySelector('tbody')];
        var footer = query.footer();
        var footers = footer ? [footer.querySelector('tfoot')] : [];
        result = (0, utils_1.createTable)(colGroups, headers, bodies, footers);
    }
    else {
        result = (0, utils_1.wrapTable)(query.table().cloneNode(true));
    }
    return result;
};
exports.exportElement = exportElement;
