class MockMailApp {
  constructor() {
    this.text = 'Sent!';
  }

  sendEmail(emailObj) {
    return this.text;
  }
}

module.exports = MockMailApp;