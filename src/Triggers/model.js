
/**
 * Check if the notification trigger is configured.
 * @return {Boolean} True if trigger is configured, False otherwise.
 */
function checkIfTrigger() {
  return ScriptApp.getProjectTriggers().length > 0;  
}

/**
 * Check if the notification trigger ID is stored in user's properties.
 * @return {Boolean} True if trigger ID is stored, False otherwise.
 */
function checkIfProperty() {
  var userProperties = PropertiesService.getUserProperties();  
  return userProperties.getProperty('triggerId') == null;
}

/**
 * Sets time based trigger which runs onTrigger function everyday.
 */
function setTrigger() {
  
  var trigger = ScriptApp.newTrigger('onTrigger')
      .timeBased()
      .everyDays(1)
      .atHour(11)
      .create();
  
  var userProperties = PropertiesService.getUserProperties();
  
  userProperties.setProperty('triggerId', trigger.getUniqueId());
}

/**
 * Deletes configured trigger.
 */
function deleteTrigger() {
  // Loop over all triggers.
  var triggerId = userProperties.getProperty('triggerId');
  
  var allTriggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < allTriggers.length; i++) {
    // If the current trigger is the correct one, delete it.
    if (allTriggers[i].getUniqueId() === triggerId) {
      ScriptApp.deleteTrigger(allTriggers[i]); 
      userProperties.deleteProperty('triggerId');
      break;
    }
  }
}