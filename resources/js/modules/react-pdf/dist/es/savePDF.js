import { drawDOM, exportPDF } from '@progress/kendo-drawing';
import { saveAs } from '@progress/kendo-file-saver';
import KendoDrawingAdapter from './KendoDrawingAdapter';
/**
 * Saves the content of a DOM element to a PDF file.
 *
 * @param domElement - The root DOM element to save to a PDF file.
 * @param options - The export options.
 * @param callback - The callback to be executed after the PDF is saved.
 */
export function savePDF(domElement, options, callback) {
    if (options === void 0) { options = {}; }
    new KendoDrawingAdapter(drawDOM, exportPDF, saveAs, domElement, options).savePDF(callback);
}
