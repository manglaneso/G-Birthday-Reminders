var userProperties = PropertiesService.getUserProperties();

/**
 * Callback for rendering the homepage card.
 * @return {CardService.Card} The card to show to the user.
 */
function onHomepage(e) { 
  var userLocale = e['commonEventObject']['userLocale'];
  return createHomepageCard(userLocale);
}

/**
 * Creates a card with button to activate/deactivate the service.
 * @param {String} userLocale Locale for the current user
 * @return {CardService.Card} The assembled card.
 */
function createHomepageCard(userLocale) {
  
  userLocale = userLocale || 'en';
  
  if(!config['textLocales'].hasOwnProperty(userLocale)) {
    userLocale = 'en';
  }
  
  userProperties.setProperty('userLocale', userLocale);

  var action = CardService.newAction()
    .setFunctionName('onConfigureTrigger');
  
  var banner = CardService.newImage();
  
  var infoValue = CardService.newKeyValue()
    .setMultiline(true);
   
  var button = CardService.newTextButton()
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED);
  
  var configured = 'configured';
  
  if(checkIfTrigger()) {
    banner.setImageUrl(config['icons']['configuredUrl']);
    action.setParameters({action: 'stop'});
  } else {
    configured = 'notConfigured';
    banner.setImageUrl(config['icons']['notConfiguredUrl']);
    action.setParameters({action: 'start'});
  }
  
  infoValue.setTopLabel(config['textLocales'][userLocale][configured]['infoValueTopLabel']);
  infoValue.setContent(config['textLocales'][userLocale][configured]['infoValueContent']);
  button.setText(config['textLocales'][userLocale][configured]['actionButtonText']);
  
  button.setOnClickAction(action);
  
  // Create a footer to be shown at the bottom.
  var footer = CardService.newFixedFooter()
    .setPrimaryButton(button);
  
  var section = CardService.newCardSection()
    .addWidget(banner)
    .addWidget(infoValue);
  
  // Assemble the widgets and return the card.
  var card = CardService.newCardBuilder()
    .addSection(section)
    .setFixedFooter(footer);

  return card.build();
}

/**
 * Callback for the "Start/stop notifications" button.
 * @param {Object} e The event object, documented {@link
 *     https://developers.google.com/gmail/add-ons/concepts/actions#action_event_objects
 *     here}.
 * @return {CardService.ActionResponse} The action response to apply.
 */
function onConfigureTrigger(e) {
  console.log(e);
  // Get the text that was shown in the current cat image. This was passed as a
  // parameter on the Action set for the button.
  var text = e.parameters.action;
  
  if(text == 'start') {
    var userTimeZone = e['commonEventObject']['timeZone'];
    setTrigger(userTimeZone);
  } else if(text == 'stop') {
    deleteTrigger();
  }
  
  var userLocale = e['commonEventObject']['userLocale'];
  userProperties.setProperty('userLocale', userLocale);
  
  
  // Create a new card with the same text.
  var card = createHomepageCard(userLocale);

  // Create an action response that instructs the add-on to replace
  // the current card with the new one.
  var navigation = CardService.newNavigation()
    .updateCard(card);
  var actionResponse = CardService.newActionResponseBuilder()
    .setNavigation(navigation);
  
  return actionResponse.build();
}