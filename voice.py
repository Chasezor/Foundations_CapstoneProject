from gtts import gTTS
import os

def speak(spoke):

    myText= spoke

    language = 'en'

    output = gTTS(text=myText, lang=language, tld='co.uk', slow=False)

    output.save('./public/output.mp3')
    
    print('new audio ready')
