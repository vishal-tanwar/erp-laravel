import resolveConfig from 'tailwindcss/resolveConfig';

export const tailwindConfig = () => {
  // Tailwind config
  return resolveConfig('./src/css/tailwind.config.js')
}

export const hexToRGB = (h) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }
  return `${+r},${+g},${+b}`;
};

export const formatValue = (value) => Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumSignificantDigits: 3,
  notation: 'compact',
}).format(value);


export const promiseState = async (state, setState) => new Promise(resolve => {
  setState(state)
  resolve(state);
})


export const SvgToPng = (svg) => {

  return new Promise((resolve, reject) => {
    try {

      var svgData = (new XMLSerializer()).serializeToString(svg);
      var DOMURL = window.URL || window.webkitURL || window;

      var svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });

      var url = DOMURL.createObjectURL(svgBlob);

      var myReader = new FileReader();
      //handler executed once reading(blob content referenced to a variable) from blob is finished. 
      // myReader.addEventListener("loadend", function (e) {
      //   document.getElementById("text").innerHTML = e.target.result;//prints a string
      // });
      //start the reading process.
      

      // let image = new Image;

      // let canvas = document.createElement('canvas');

      // canvas.width = image.width
      // canvas.height = image.height

      // const ctx = canvas.getContext("2d");

      // image.onload = function () {
      //   ctx.drawImage(this, 0, 0);
      //   DOMURL.revokeObjectURL(url);

      //   console.log(canvas.toDataURL('image/png'));

      // }
      resolve({ url: url, text: myReader.readAsText(svgBlob) })

      // image.src = url;

    } catch (err) {
      reject('failed to convert svg to png ' + err);
    }

  });
} 
