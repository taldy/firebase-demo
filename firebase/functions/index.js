const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


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
