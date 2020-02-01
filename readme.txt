Installation:
Clone
Run npm install
In terminal navigate to project folder and type node stream.js

Description: 
Node app that listens for a command or question and adds it to a voice file, I then send that voice file to an IBM API that converts the speech to text, with that text I have a list of questions and commands that the computer will respond to, if the user asked a question or says a command that is in the list then the computer responds to a command by doing the command but if it's a question I have answers that are text strings and I send the text to an IBM API that converts the text to speech and creates a WAV file that is the audio representation of that question, once created the WAV file will automatically playback to the user.

Features:
Ability to tell the date & weather
Ability to open programs up (VScode, Google Chrome)
Ability to navigate to certain websites (Youtube, Gmail)
Ability to answer some general questions as well such as largest mammal
Some questions will trigger playback of an WAV file 

What I've learned:
How to actually use ur computer mic as a recorder

How to open chrome or other programs from your computer. Being a web developer I never would try and trigger programs opening up aside from actually clicking them to open them up I didn't know other ways were possible.

Control flow:For awhile I was trying to convert the wav file to speech before the api received it. So I had to add a check to make sure the recording was completed and that file was created before I sent it off to the API that would convert the speech-to-text

Project Design: At first I was going to store the answer to each question in an WAV file and when that question was asked just trigger playback of the WAV file. This would leave me with a bunch of WAV's and make my project bigger and would be annoying to make an WAV everytime I would like to add an answer to a question. Instead I converted my answer to a voice file via an IBM API and play that file in response to the question. That way it's very easy to add more questions and answers. I realize that since I'm using IBM i'm at the mercy of their API and if they decide to change something down the line and charge me then I'll have a problem but for now I'm happy with my solution as the API is fast and free of charge.

Deeper node things:
node filesystem,read/write stream and piping data
exec child process

Improvements I would like to make:
Break up the readrecording function and have all of the commands in 1 function separate from readrecording.
I want to find a way to log words into a file so I can go back and see the most used words for a time period(most common question asked per month, week etc).
Find a better way to compare the audio instead of the includes()method.
Add command for nfl/nba scores & twitter.
Add in the functionality for the open command instead of using (code .) for vs code.
Change the voice
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
<<<<<<< HEAD
=======

>>>>>>> e773b862f1350a9fa524a4dde27412783290a9fd
