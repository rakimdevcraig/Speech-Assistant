control flow: making sure I don't call readrecording function until the audio is 
actually received line 50-54 before that I was using settimeout which isn't the best way, 
I was tripped up on that also I was tripped up on how to get the audio to transcribe before 
being played in the text to speech but it was easier after the first issue

functions can really be passed around from one file to the next I had read it but I never really put it to use

how to actually use ur computer mic as a recorder

deeper node things:
node filesystem,read/write stream and piping data
exec child process

how to open chrome or other programs from your computer. js was made for the web so this wasn't
something I would've learned if I didn't branch out

separating code I didn't need the textToSpeech code to be in the same file as the rest of the stuff

could've had a bunch of mp3's and one for each question but that would make my project bigger instead I can just 
rewrite to the same mp3 and output what I wrote to the mp3 if the api ends up messing up down the line or if
IBM tries to charge me I can go the route of having prerecorded mp3's but for now I don't need that. with
prerecorded mp3's my app will run faster because I won't have to deal with the api converting text to speech before
the app responds it will just go to the prerecorded file