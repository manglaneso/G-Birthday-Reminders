/**
 * Sends email with MailApp.
 * @param {String} to - email address of a recipient.
 * @param {String} subject - subject of email message.
 * @param {String} body - body of email message.
 * @param {Object} inlineImages - Images to append to the email body
 */
function sendEmail_(to, subject, body, inlineImages) {
  try {    
    var emailObj = {
        to: to,
        subject: subject,
        htmlBody: body
      };
    
    if(inlineImages) {
      emailObj['inlineImages'] = inlineImages;
    }
    
    
    return MailApp.sendEmail(emailObj);
  } catch(e) {
    // Suppressing errors in email sending because email notifications
    // are not critical for the functioning of the app.
    console.error(JSON.stringify(e));
  }
}