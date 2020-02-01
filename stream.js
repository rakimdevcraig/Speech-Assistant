// Import module.
//once I get the words I want to find a way to log them so I can eventually go back and look at the more common words
const AudioRecorder = require('node-audiorecorder');
const fs = require('fs');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const open = require('open');
const { exec } = require('child_process');
const textToSpeech = require("./textToSpeech.js")
const dateFormat = require('dateformat');
const player = require('node-wav-player');
const weather = require('weather-js');



function record() {
    // Options is an optional parameter for the constructor call.
    // If an option is not given the default value, as seen below, will be used.
    const options = {
        program: `rec`,     // Which program to use, either `arecord`, `rec`, or `sox`.
        device: null,       // Recording device to use.

        bits: 16,           // Sample size. (only for `rec` and `sox`)
        channels: 2,        // Channel count.
        encoding: `signed-integer`,  // Encoding type. (only for `rec` and `sox`)
        format: `S16_LE`,   // Encoding type. (only for `arecord`)
        rate: 44100,        // Sample rate.
        type: `wav`,        // Format type.

        // Following options only available when using `rec` or `sox`.
        silence: 2,         // Duration of silence in seconds before it stops recording.
        thresholdStart: 0.5,  // Silence threshold to start recording.
        thresholdStop: 0.5,   // Silence threshold to stop recording.
        keepSilence: true   // Keep the silence in the recording.
    };
    // Optional parameter intended for debugging.
    // The object has to implement a log and warn function.
    const logger = console;

    // Create an instance.
    let audioRecorder = new AudioRecorder(options, logger);

    audioRecorder.start();

    const fileStream = fs.createWriteStream("./audio/test.wav", { encoding: 'binary' });

    //Create another stream to save locally
    audioRecorder.stream().pipe(fileStream);

    //check to see when the recording is done
    audioRecorder.stream().on('close', function (code) {
        // console.warn('Recording closed. Exit code: ', code);
        readRecording()
    });

}



function readRecording() {
    const now = new Date();

    const speechToText = new SpeechToTextV1({
        authenticator: new IamAuthenticator({ apikey: '77Xg16ZrxyJezMAIhwES_YVOMvhB__3dQbGOnGpyMeef' }),
        url: 'https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/a80c943f-828c-4c4e-95a8-33b932fbc52c'
    });

    const recognizeParams = {
        audio: fs.createReadStream('./audio/test.wav'),
        contentType: 'audio/wav',
    };

    speechToText.recognize(recognizeParams)
        .then(speechRecognitionResults => {
            let audio = JSON.stringify(speechRecognitionResults.result.results[0].alternatives[0].transcript.toLowerCase(), null, 2)
            console.log(`words recorded: ${audio}`)
            if (audio.includes(`what it do`)) {
                player.play({ path: './audio/kawhi.wav', })
            } else if (audio.includes(`skip`)) {
                player.play({ path: './audio/dripbayless.wav', })
            } else if (audio.includes(`what is your name`)) {
                textToSpeech("my name is boss")
            } else if (audio.includes(`date`)) {
                let date = `the current date and time is ${dateFormat(now, "dddd, mmmm dS, yyyy, h:MM TT")}`;
                textToSpeech(date)
            } else if (audio.includes(`describe`)) {
                textToSpeech(`nixandra is a smart beautiful woman`)
            } else if (audio.includes(`what is my father's name`)) {
                textToSpeech(`his name is keith`)
            } else if (audio.includes(`mark`)) {
                textToSpeech('mark, thanks for being a great mentor to me')
            } else if (audio.includes(`vs code`)) {
                exec('code .', (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return;
                    }
                    console.log(`stdout: ${stdout}`);
                    console.error(`stderr: ${stderr}`);
                });
            } else if (audio.includes(`chrome`)) {
                open('https://google.com')
            } else if (audio.includes(`email`)) {
                open('https://mail.google.com/mail/u/0/?tab=wm&ogbl#inbox')
            } else if (audio.includes(`whether`)) {
                weather.find({ search: 'Boston, MA', degreeType: 'F' }, function (err, result) {
                    if (err) console.log(err);
                    let temp = JSON.stringify(result[0].current.temperature, null, 2)
                    let description = JSON.stringify(result[0].current.skytext, null, 2)
                    textToSpeech(`In Boston it is currently ${description} and it is ${temp} degrees`)
                });
            } else if (audio.includes(`youtube`)) {
                open('https://www.youtube.com')
            } else if (audio.includes(`who is the president`)) {
                textToSpeech('Donald Trump is the president')
            } else if (audio.includes(`how many continents`)) {
                textToSpeech('There are seven continents')
            } else if (audio.includes(`largest mammal?`)) {
                textToSpeech('Blue Whale is the largest mammal')
            } else if (audio.includes(`how many rings does tom brady have`)) {
                textToSpeech('Six')
            } else {
                // textToSpeech(`${audio}`)
            }
        })
        .catch(err => {
            console.log('error:', err);
        });
}
record()
