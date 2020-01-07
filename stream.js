// Import module.
//once I get the words I want to find a way to log them so I can eventually go back and look at the more common words
const AudioRecorder = require('node-audiorecorder');
const fs = require('fs');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const open = require('open');
const { exec } = require('child_process');


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


    const fileStream = fs.createWriteStream("./test.wav", { encoding: 'binary' });

    //Create another stream to save locally
    audioRecorder.stream().pipe(fileStream);

    //check to see when the recording is done
    audioRecorder.stream().on('close', function (code) {
        console.warn('Recording closed. Exit code: ', code);
        readRecording()
    });

}



function readRecording() {


    const speechToText = new SpeechToTextV1({
        authenticator: new IamAuthenticator({ apikey: '77Xg16ZrxyJezMAIhwES_YVOMvhB__3dQbGOnGpyMeef' }),
        url: 'https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/a80c943f-828c-4c4e-95a8-33b932fbc52c'
    });

    const recognizeParams = {
        audio: fs.createReadStream('test.wav'),
        contentType: 'audio/wav',
    };

    speechToText.recognize(recognizeParams)
        .then(speechRecognitionResults => {
            let audio = JSON.stringify(speechRecognitionResults.result.results[0].alternatives[0].transcript.toLowerCase(), null, 2)
            console.log(`words recorded: ${audio}`)
            if (audio.includes(`what is your name`)) {
                console.log('boss')
            } else if (audio.includes(`date`)) {
                console.log(new Date())
            } else if (audio.includes(`describe`)) {
                console.log(`smart beautiful woman`)

            }else if(audio.includes(`vs code`)){
                exec('code .', (error, stdout, stderr) => {
                    if (error) {
                      console.error(`exec error: ${error}`);
                      return;
                    }
                    console.log(`stdout: ${stdout}`);
                    console.error(`stderr: ${stderr}`);
                  });
            }else if(audio.includes(`chrome`)){
                open('https://google.com')
            }else if(audio.includes(`whether`)){
                open('https://www.google.com/search?q=boston+weather&oq=boston+weather&aqs=chrome..69i57j0l5j69i60l2.1872j1j4&sourceid=chrome&ie=UTF-8')
            }else if(audio.includes(`youtube`)){
                open('https://www.youtube.com')
            }
            else {
                // console.log(`Didn't understand that please try again`)
            }
        })
        .catch(err => {
            console.log('error:', err);
        });


}
record()
