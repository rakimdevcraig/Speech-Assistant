const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({ apikey: 'F1GdTGIu8kAfj2WZeJcw7EWr3fgeFThwSp_ey13wqz4T' }),
    url: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/8182c963-9ae7-47ed-ba94-d9e5c14e6012'
  });

  
  textToSpeech.listVoices()
    .then(voices => {
      console.log(JSON.stringify(voices, null, 2));
    })
    .catch(err => {
      console.log('error:', err);
    });