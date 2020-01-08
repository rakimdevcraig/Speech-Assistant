const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const player = require('node-wav-player');

function textToSpeech(words) {

  const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({ apikey: 'F1GdTGIu8kAfj2WZeJcw7EWr3fgeFThwSp_ey13wqz4T' }),
    url: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/8182c963-9ae7-47ed-ba94-d9e5c14e6012'
  });
  const params = {
    text: words,
    voice: 'en-US_AllisonVoice', // Optional voice
    accept: 'audio/wav'
  };

  // Synthesize speech, correct the wav header, then save to disk
  // (wav header requires a file length, but this is unknown until after the header is already generated and sent)
  // note that `repairWavHeaderStream` will read the whole stream into memory in order to process it.
  // the method returns a Promise that resolves with the repaired buffer
  textToSpeech
    .synthesize(params)
    .then(response => {
      const audio = response.result;
      return textToSpeech.repairWavHeaderStream(audio);
    })
    .then(repairedFile => {
      fs.writeFileSync('./audio/audio.wav', repairedFile);
      // for debugging lets me know when the file has been written
      // console.log('audio.wav written with a corrected wav header');
      player.play({
        path: './audio/audio.wav',
      }).then(() => {
        //for debugging lets me know the file started to be played
        // console.log('The wav file started to be played successfully.');
      }).catch((error) => {
        console.error(error);
      });
    })
    .catch(err => {
      console.log(err);
    });

}

module.exports = textToSpeech;