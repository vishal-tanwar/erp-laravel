"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePDF = void 0;
var kendo_drawing_1 = require("@progress/kendo-drawing");
var kendo_file_saver_1 = require("@progress/kendo-file-saver");
var KendoDrawingAdapter_1 = require("./KendoDrawingAdapter");
/**
 * Saves the content of a DOM element to a PDF file.
 *
 * @param domElement - The root DOM element to save to a PDF file.
 * @param options - The export options.
 * @param callback - The callback to be executed after the PDF is saved.
 */
function savePDF(domElement, options, callback) {
    if (options === void 0) { options = {}; }
    new KendoDrawingAdapter_1.default(kendo_drawing_1.drawDOM, kendo_drawing_1.exportPDF, kendo_file_saver_1.saveAs, domElement, options).savePDF(callback);
}
exports.savePDF = savePDF;
