const assert = require('chai').assert;
const gas = require('gas-local');
const MockProperties = require('./mocks/properties');
const MockScriptApp = require('./mocks/script');
const MockCalendarApp = require('./mocks/calendar');
const MockCard = require('./mocks/card');
const MockSession = require('./mocks/session');
const MockMailApp = require('./mocks/mail');
const MockHtml = require('./mocks/html');
const Future = require('fibers/future');

let mocks = {
    PropertiesService: new MockProperties(),
    ScriptApp: new MockScriptApp(),
    CalendarApp: new MockCalendarApp(),
    CardService: new MockCard(),
    Session: new MockSession(),
    MailApp: new MockMailApp(),
    HtmlService: new MockHtml(),
    __proto__: gas.globalMockDefault
};

let Reminders = gas.require('./src', mocks);

describe('Trigger',  function() {
    describe('#check()', function() {
        it('Should return false when no trigger is stored', function() {
            let result = Reminders.checkIfTrigger();
            assert.equal(result, false);
        });

    });
    
    describe('#set()', function() {
        it('Should create an entrance for the trigger in PropertiesService and an entrance on the triggers list', function() {
            Reminders.setTrigger();
            assert.equal(Object.keys(mocks.PropertiesService.store).length, 1);
            assert.equal(mocks.ScriptApp.projectTriggers.length, 1);
        });
    });

    describe('#delete()', function() {
        it('Should delete the entrance for the trigger in PropertiesService and an entrance on the triggers list', function() {
            Reminders.deleteTrigger();
            assert.equal(Object.keys(mocks.PropertiesService.store).length, 0);
            assert.equal(mocks.ScriptApp.projectTriggers.length, 0);
        });
    });

    describe('#check()', function() {
        it('Should return false as no trigger is stored again', function() {
            let result = Reminders.checkIfTrigger();
            assert.equal(result, false);
        });
    });

    describe('#set()', function() {
        it('Should create again an entrance for the trigger in PropertiesService and an entrance on the triggers list', function() {
            Reminders.setTrigger();
            assert.equal(Object.keys(mocks.PropertiesService.store).length, 1);
            assert.equal(mocks.ScriptApp.projectTriggers.length, 1);
        });
    });

    describe('#run()', function() {
        it('Should run the function executed by the trigger to send an email in case there are events', function() {
            Reminders.onTrigger({});
        });
    });

});

describe('Email',  function() {
    describe('#send()', function() {
        it('Should return a mock email with the content "Sent!" as result', function() {
            let result = Reminders.sendEmail_('user@domain.com', 'New Email!', 'Hello!', []);
            assert.equal(result, 'Sent!');
        });
    });
});

describe('Card',  function() {
    describe('#onHomepage()', function() {
        it('Should return a card object with the content created', function() {
            let result = Reminders.onHomepage({'commonEventObject': {'userLocale': 'en'}});
            assert.instanceOf(result, MockCard);
        });
    });

    describe('#onConfigureTrigger()', function() {
        it('Should return a card object with the new content created', function() {
            let result = Reminders.onConfigureTrigger({'commonEventObject': {'userLocale': 'en'}, 'parameters': {'action': 'start'}});
            assert.instanceOf(result, MockCard);
        });
    });
});