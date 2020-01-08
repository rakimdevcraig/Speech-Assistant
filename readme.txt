Things to do:
break up the readrecording function and have all of the commands in 1 function separate from readrecording
add in nicky's suggestions
I want to find a way to log words into a file so I can go back and see the most used words for a time period
find a better way to compare the audio instead of the includes()method
add command for nfl/nba scores & twitter
add in the functionality for the open command instead of using (code .) for vs code 


Nicky's suggestions:
who is the president?
how many continents
largest mammal?
how many teeth does the adult human have?
As of 2020,how many rings does tom brady have?
who is better mj or lbj?
in 2010, to which city did lebron james take his talents? play clip of lbj saying miami
who is the richest man in the world?
how much wood would a woodchuck chuck if a woodchuck would chuck wood?


voices available:
        "name": "en-US_LisaV2Voice",
        "name": "en-GB_KateV3Voice",
        "name": "en-US_MichaelV3Voice",
        "name": "en-US_LisaV3Voice",
        "name": "en-US_AllisonV2Voice",
        "name": "en-US_LisaVoice",
        "name": "en-US_AllisonVoice", DEFAULT
        "name": "es-ES_LauraV3Voice",
        "name": "es-US_SofiaV3Voice",
        "name": "en-US_AllisonV3Voice",
        "name": "en-US_MichaelVoice",
        "name": "en-US_MichaelV2Voice",

features i have so far:
used mp3's I saved in to respond to certain commands
ability to tell the weather
ability to open programs up
ability to navigate to certain websites



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