class MockHtml {
  constructor() {
      this.html = '<b> Mocked Html! </b>';
      this.todayEvents = [];
      this.subject = '';
      this.paragraph = '';
  }

  createTemplateFromFile(path) {
    return this;
  }
  evaluate() {
    return this;
  }
  getContent() {
    return this.html;
  }

}

module.exports = MockHtml;