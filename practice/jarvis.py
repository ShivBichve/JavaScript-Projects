import sounddevice as sd
import numpy as np
import wavio
import tempfile
import speech_recognition as sr
import pyttsx3
import time
import webbrowser
import os

recognizer = sr.Recognizer()

def speak(text):
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()

def record_audio(duration=5, fs=44100):
    """Record audio from mic using sounddevice and save as a temporary .wav file."""
    print("listening...")
    recording = sd.rec(int(duration * fs), samplerate=fs, channels=1, dtype='int16')
    sd.wait()
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".wav")
    wavio.write(temp_file.name, recording, fs, sampwidth=2)
    return temp_file.name

def handle_command(command):
    """Perform simple actions after hearing Jarvis."""
    command = command.lower()

    if "open google" in command:
        speak("Opening Google")
        webbrowser.open("https://www.google.com")
    elif "open facebook" in command:
        speak("Opening Facebook")
        webbrowser.open("https://www.facebook.com")
    else:
        speak("Sorry, I didn't understand that command.")

if __name__ == "__main__":
    speak("initializing jarvis.........")
    while True:
        # record short voice sample
        audio_file = record_audio(duration=4)

        try:
            # use Google recognizer (instead of Google Cloud, which needs API key)
            with sr.AudioFile(audio_file) as source:
                audio = recognizer.record(source)
                
            command = recognizer.recognize_google(audio)
            print("Heard:", command)

            if command.lower() == "jarvis":
                print("Wake word detected.")
                speak("Yes, I am listenning.")

                # listen for next command
                command_file = record_audio(duration=5)
                with sr.AudioFile(command_file) as source:
                    audio = recognizer.record(source)
                user_command = recognizer.recognize_google(audio)
                print("Command received:", user_command)

                handle_command(user_command)

        except sr.UnknownValueError:
            print("Could not understand audio")
        except sr.RequestError as e:
            # print("Recognition error; {0}".format(e))
            print("Could not request results from Google Speech Recognition service; {0}".format(e))
        #     if os.path.exists(audio_file):
        #         try:
        #             os.remove(audio_file)
        #         except PermissionError:
        #             print("Skipping delete — file in use.")
        # time.sleep(0.5)

# import speech_recognition as sr
# import pyttsx3
# import webbrowser

# recognizer = sr.Recognizer()
# engine = pyttsx3.init()

# def speak(text):
#     engine.say(text)
#     engine.runAndWait()

# if __name__ == "__main__":
#     speak("initializing jarvis.........")
    
#     r = sr.Recognizer()
#     with sr.Microphone() as source:
#         print("Listening..........")
#         audio = r.listen(source)

#     try:
#         print("Recognizing...")
#         command = r.recognize_google(audio)
#         print("You said:", command)
#     except sr.UnknownValueError:
#         print("Sorry, I could not understand the audio.")
#     except sr.RequestError as e:
#         print("Could not request results from Google Speech Recognition service; {0}".format(e))