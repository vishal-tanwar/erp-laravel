"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridQuery = exports.FOOTER_CLASS = exports.HEADER_CLASS = void 0;
var dom_queries_1 = require("./dom-queries");
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
/**
 * @hidden
 */
var GridQuery = /** @class */ (function () {
    function GridQuery(element) {
        this.element = element;
        this.list = (0, dom_queries_1.findElement)(element, (0, dom_queries_1.matchesClasses)('k-grid'));
    }
    GridQuery.prototype.content = function () {
        return (0, dom_queries_1.findElement)(this.list, (0, dom_queries_1.matchesClasses)('k-grid'));
    };
    GridQuery.prototype.header = function () {
        this.headerWrap = this.headerWrap || (0, dom_queries_1.findElement)(this.element, (0, dom_queries_1.matchesClasses)(exports.HEADER_CLASS));
        return (0, dom_queries_1.findElement)(this.headerWrap, (0, dom_queries_1.matchesClasses)("".concat(exports.HEADER_CLASS)));
    };
    GridQuery.prototype.footer = function () {
        this.footerWrap = this.footerWrap || (0, dom_queries_1.findElement)(this.element, (0, dom_queries_1.matchesClasses)(exports.FOOTER_CLASS));
        return (0, dom_queries_1.findElement)(this.footerWrap, (0, dom_queries_1.matchesClasses)("".concat(exports.FOOTER_CLASS)));
    };
    GridQuery.prototype.table = function () {
        return (0, dom_queries_1.findElement)(this.element, matchesTable);
    };
    return GridQuery;
}());
exports.GridQuery = GridQuery;
