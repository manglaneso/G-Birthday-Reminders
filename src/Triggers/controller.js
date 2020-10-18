var contactsCalendarID = 'addressbook#contacts@group.v.calendar.google.com';

/**
 * Function to be run everyday to check if there is any birthday. Sends an email if so.
 */
function onTrigger(e) {
  
  console.log(JSON.stringify(e));
  
  var userLocale = userProperties.getProperty('userLocale');
  
  userLocale = userLocale || 'en';
  
  var today = new Date();
  
  var contactsCalendar = CalendarApp.getCalendarById(contactsCalendarID);
  
  var todayEvents = contactsCalendar.getEventsForDay(today);
  
  if(todayEvents.length > 0) {
    var template = HtmlService.createTemplateFromFile('Notifications/views/email');
    
    template['todayEvents'] = todayEvents;
    template['subject'] = config['emailLocales'][userLocale]['subject'];
    template['paragraph'] = config['emailLocales'][userLocale]['paragraph'];
    
    var body = template.evaluate().getContent();
    
    sendEmail_(Session.getEffectiveUser().getEmail(), config['emailLocales'][userLocale]['subject'], body);
  }
}