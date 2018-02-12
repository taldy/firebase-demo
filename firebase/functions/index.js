const functions = require('firebase-functions');
var counter = 5;

exports.counter = functions.https.onRequest((request, response) => {
 response.send('Counter: ' + counter);
});

exports.increment = functions.https.onRequest((request, response) => {
  counter += 1;
 response.send('Counter: ' + counter);
});

exports.generatePDF = functions.https.onRequest((request, response) => {
  const hummus = require('hummus');

  response.writeHead(200, {'Content-Type': 'application/pdf'});

  var pdfWriter = hummus.createWriter(new hummus.PDFStreamForResponse(response), {
    userPassword: 'user',
    ownerPassword: 'owner',
    userProtectionFlag: 4
  });
  const page = pdfWriter.createPage(0,0,595,842);

  var cxt = pdfWriter.startPageContentContext(page);
  cxt.drawRectangle(10, 250, 150, 150);

  pdfWriter.writePage(page);
  pdfWriter.end();
  response.end();
});
