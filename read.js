const fs = require('fs');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const speechToText = new SpeechToTextV1({
    authenticator: new IamAuthenticator({ apikey: '77Xg16ZrxyJezMAIhwES_YVOMvhB__3dQbGOnGpyMeef' }),
    url: 'https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/a80c943f-828c-4c4e-95a8-33b932fbc52c'
  });

const params = {
  // From file
  audio: fs.createReadStream('./test.wav'),
  contentType: 'audio/l16; rate=44100'
};

speechToText.recognize(params)
  .then(response => {
    console.log(JSON.stringify(response.result.results[0].alternatives[0].transcript, null, 2));
    let audio = JSON.stringify(response.result.results[0].alternatives[0].transcript, null, 2)
  })
  .catch(err => {
    console.log(err);
  });








  /// once i get the reading working I have some basic responses:
//   speechToText.recognize(params)
//   .then(response => {
//     console.log(JSON.stringify(response.result.results[0].alternatives[0].transcript, null, 2));
//     let audio = JSON.stringify(response.result.results[0].alternatives[0].transcript, null, 2)
//     if(audio.includes(`What is your name?`)){
//         console.log('Boss')
//     }else if(audio.includes(`date`)){
//         console.log(new Date())
//     }else if(audio.includes(`describe nicky`)){
//         console.log(`smart beautiful woman`)
//     }else{
//         // console.log(`Didn't understand that please try again`)
//     }
//   })
//   .catch(err => {
//     console.log(err);
//   });

