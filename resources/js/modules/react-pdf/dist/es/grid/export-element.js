import { GridQuery } from './grid-query';
import { wrapTable, createTable } from '../common/utils';
/**
 * @hidden
 */
export var exportElement = function (wrapper) {
    var query = new GridQuery(wrapper);
    var content = query.content();
    var result;
    if (content) {
        var colGroups = [content.querySelector('colgroup')];
        var headers = [query.header().querySelector('thead')];
        var bodies = [content.querySelector('tbody')];
        var footer = query.footer();
        var footers = footer ? [footer.querySelector('tfoot')] : [];
        result = createTable(colGroups, headers, bodies, footers);
    }
    else {
        result = wrapTable(query.table().cloneNode(true));
    }
    return result;
};
