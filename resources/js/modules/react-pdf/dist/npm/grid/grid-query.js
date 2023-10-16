"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridQuery = exports.FOOTER_CLASS = exports.HEADER_CLASS = void 0;
var dom_queries_1 = require("../common/dom-queries");
/**
 * @hidden
 */
exports.HEADER_CLASS = 'k-grid-header';
/**
 * @hidden
 */
exports.FOOTER_CLASS = 'k-grid-footer';
var TABLE = 'TABLE';
var matchesTable = (0, dom_queries_1.matchesNodeName)(TABLE);
var suffix = function (locked) { return locked ? 'locked' : 'wrap'; };
/**
 * @hidden
 */
var GridQuery = /** @class */ (function () {
    function GridQuery(element) {
        this.element = element;
        this.list = (0, dom_queries_1.findElement)(element, (0, dom_queries_1.matchesClasses)('k-grid-container'));
    }
    GridQuery.prototype.content = function (locked) {
        return (0, dom_queries_1.findElement)(this.list, (0, dom_queries_1.matchesClasses)("k-grid-content".concat(locked ? '-locked' : '')));
    };
    GridQuery.prototype.header = function (locked) {
        this.headerWrap = this.headerWrap || (0, dom_queries_1.findElement)(this.element, (0, dom_queries_1.matchesClasses)(exports.HEADER_CLASS));
        return (0, dom_queries_1.findElement)(this.headerWrap, (0, dom_queries_1.matchesClasses)("".concat(exports.HEADER_CLASS, "-").concat(suffix(locked))));
    };
    GridQuery.prototype.footer = function (locked) {
        this.footerWrap = this.footerWrap || (0, dom_queries_1.findElement)(this.element, (0, dom_queries_1.matchesClasses)(exports.FOOTER_CLASS));
        return (0, dom_queries_1.findElement)(this.footerWrap, (0, dom_queries_1.matchesClasses)("".concat(exports.FOOTER_CLASS, "-").concat(suffix(locked))));
    };
    GridQuery.prototype.table = function () {
        return (0, dom_queries_1.findElement)(this.element, matchesTable);
    };
    return GridQuery;
}());
exports.GridQuery = GridQuery;
