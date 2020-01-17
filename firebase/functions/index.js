const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const firestore = admin.firestore();

exports.storeUserToDB = functions.auth.user().onCreate((user) => {
  return firestore.collection('users').doc(user.uid).set({
    email: user.email,
    name: user.displayName,
    avatar: user.photoURL,
  });
});


exports.generatePDF = functions.https.onRequest((request, response) => {
  const hummus = require('hummus');

  response.writeHead(200, {'Content-Type': 'application/pdf'});


  // var pdfWriter = hummus.createWriter(new hummus.PDFStreamForResponse(response), {
  //   userPassword: 'user',
  //   ownerPassword: 'owner',
  //   userProtectionFlag: 4
  // });
  var pdfWriter = hummus.createWriter(new hummus.PDFStreamForResponse(response), {});
  const page = pdfWriter.createPage(0,0,595,842);

  var cxt = pdfWriter.startPageContentContext(page);
  cxt.drawRectangle(10, 250, 150, 150);

  pdfWriter.writePage(page);
  pdfWriter.end();
  response.end();
});
