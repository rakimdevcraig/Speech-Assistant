//api:https://cloud.ibm.com/apidocs/speech-to-text/speech-to-text?code=node#recognize-audio-websockets-
const fs = require('fs');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const AudioRecorder = require('node-audiorecorder');


function record(){

    const options = {
        program: `rec`,     // Which program to use, either `arecord`, `rec`, or `sox`.
        device: null,       // Recording device to use.
        
        bits: 16,           // Sample size. (only for `rec` and `sox`)
        channels: 2,        // Channel count.
        encoding: `signed-integer`,  // Encoding type. (only for `rec` and `sox`)
        format: `S16_LE`,   // Encoding type. (only for `arecord`)
        rate: 16000,        // Sample rate.
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
    
  
    
    const fileStream = fs.createWriteStream("test.wav", { encoding: 'binary' });
    
    
    //Create another stream to save locally
    audioRecorder.stream().pipe(fileStream);

    audioRecorder.stream().on('close', function(code) {
        console.warn('Recording closed. Exit code: ', code);
        imbWatson()
    });
}
    
    
    //////  IBM WATSON
    function imbWatson(){
        
        
        const speechToText = new SpeechToTextV1({
            authenticator: new IamAuthenticator({ apikey: '77Xg16ZrxyJezMAIhwES_YVOMvhB__3dQbGOnGpyMeef' }),
            url: 'https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/a80c943f-828c-4c4e-95a8-33b932fbc52c'
        });
        
        const params = {
            // objectMode: true,
            contentType: 'audio/wav'
        };
        
        // Create the stream.
         recognizeStream = speechToText.recognizeUsingWebSocket(params);
        
        // Pipe in the audio.
        fs.createReadStream('test.wav').pipe(recognizeStream);
    
    /*
    * Uncomment the following two lines of code ONLY if `objectMode` is `false`.
    *
    * WHEN USED TOGETHER, the two lines pipe the final transcript to the named
    * file and produce it on the console.
    *
    * WHEN USED ALONE, the following line pipes just the final transcript to
    * the named file but produces numeric values rather than strings on the
    * console.
    */
   recognizeStream.pipe(fs.createWriteStream('transcription.txt'));
   
   /*
   * WHEN USED ALONE, the following line produces just the final transcript
   * on the console.
   */
  recognizeStream.setEncoding('utf8');
  
  // Listen for events.
  recognizeStream.on('data', function(event) { onEvent('Data:', event); });
  recognizeStream.on('error', function(event) { onEvent('Error:', event); });
  recognizeStream.on('close', function(event) { onEvent('Close:', event); });
  
  // Display events on the console.
  function onEvent(name, event) {
    console.log(name, JSON.stringify(event, null, 2));
    };
}
record()

