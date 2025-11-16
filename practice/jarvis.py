# import sounddevice as sd
# import numpy as np
# import wavio
# import tempfile
# import speech_recognition as sr
# import pyttsx3
# import time
# import webbrowser
# import os

# recognizer = sr.Recognizer()

# def speak(text):
#     engine = pyttsx3.init()
#     engine.say(text)
#     engine.runAndWait()

# def record_audio(duration=5, fs=44100):
#     """Record audio from mic using sounddevice and save as a temporary .wav file."""
#     print("listening...")
#     recording = sd.rec(int(duration * fs), samplerate=fs, channels=1, dtype='int16')
#     sd.wait()
#     temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".wav")
#     wavio.write(temp_file.name, recording, fs, sampwidth=2)
#     return temp_file.name

# def handle_command(command):
#     """Perform simple actions after hearing Jarvis."""
#     command = command.lower()

#     if "open google" in command:
#         speak("Opening Google")
#         webbrowser.open("https://www.google.com")
#     elif "open facebook" in command:
#         speak("Opening Facebook")
#         webbrowser.open("https://www.facebook.com")
#     else:
#         speak("Sorry, I didn't understand that command.")

# if __name__ == "__main__":
#     speak("initializing jarvis.........")
#     while True:
#         # record short voice sample
#         audio_file = record_audio(duration=4)

#         try:
#             # use Google recognizer (instead of Google Cloud, which needs API key)
#             with sr.AudioFile(audio_file) as source:
#                 audio = recognizer.record(source)
                
#             command = recognizer.recognize_google(audio)
#             print("Heard:", command)

#             if command.lower() == "jarvis":
#                 print("Wake word detected.")
#                 speak("Yes, I am listenning.")

#                 # listen for next command
#                 command_file = record_audio(duration=5)
#                 with sr.AudioFile(command_file) as source:
#                     audio = recognizer.record(source)
#                 user_command = recognizer.recognize_google(audio)
#                 print("Command received:", user_command)

#                 handle_command(user_command)

#         except sr.UnknownValueError:
#             print("Could not understand audio")
#         except sr.RequestError as e:
#             # print("Recognition error; {0}".format(e))
#             print("Could not request results from Google Speech Recognition service; {0}".format(e))
#         #     if os.path.exists(audio_file):
#         #         try:
#         #             os.remove(audio_file)
#         #         except PermissionError:
#         #             print("Skipping delete — file in use.")
#         # time.sleep(0.5)

import sounddevice as sd
import numpy as np
import wavio
import tempfile
import speech_recognition as sr
import pyttsx3
import time
import webbrowser
import os

# Keep user-facing names/structure largely the same as your original script

recognizer = sr.Recognizer()

# ---- Config ----
SAMPLE_RATE = 16000      # use 16 kHz for better STT compatibility
WAKE_WORD = "jarvis"
SHORT_DURATION = 4       # seconds for wake-word sampling (your original used 4)
COMMAND_DURATION = 5     # seconds for full command
LOOP_SLEEP = 0.3         # small pause between iterations
# -----------------

# Initialize one global pyttsx3 engine (avoid re-init each speak)
tts_engine = pyttsx3.init()
tts_engine.setProperty('rate', 160)   # words per minute
tts_engine.setProperty('volume', 0.9)

def speak(text):
    """Speak using a single persistent engine (faster, fewer glitches)."""
    try:
        tts_engine.say(text)
        tts_engine.runAndWait()
    except Exception as e:
        print("[speak] TTS error:", e)

def record_audio(duration=5, fs=SAMPLE_RATE):
    """Record audio from mic using sounddevice and save as a temporary .wav file."""
    try:
        print(f"listening... ({duration}s)")
        recording = sd.rec(int(duration * fs), samplerate=fs, channels=1, dtype='int16')
        sd.wait()
    except Exception as e:
        print("[record_audio] Error recording audio:", e)
        return None

    try:
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".wav")
        temp_file_name = temp_file.name
        temp_file.close()
        # wavio expects numpy array with shape (N, channels)
        wavio.write(temp_file_name, recording, fs, sampwidth=2)
        return temp_file_name
    except Exception as e:
        print("[record_audio] Error saving wav:", e)
        return None

def safe_remove(path):
    if not path:
        return
    try:
        os.remove(path)
    except Exception:
        pass

def handle_command(command):
    """Perform simple actions after hearing Jarvis."""
    if not command:
        speak("Sorry, I couldn't hear you.")
        return

    command = command.lower()
    print("handle_command ->", command)

    if "open google" in command:
        speak("Opening Google")
        webbrowser.open("https://www.google.com")
    elif "open facebook" in command:
        speak("Opening Facebook")
        webbrowser.open("https://www.facebook.com")
    else:
        speak("Sorry, I didn't understand that command.")

def transcribe_file(path):
    """Transcribe WAV file using speech_recognition Google recognizer (same as your original).
       Returns the recognized text or None on failure."""
    if not path or not os.path.exists(path):
        return None
    try:
        with sr.AudioFile(path) as source:
            audio = recognizer.record(source)
        text = recognizer.recognize_google(audio)
        return text
    except sr.UnknownValueError:
        # Could not understand audio
        return None
    except sr.RequestError as e:
        # API was unreachable or unresponsive
        print("Could not request results from Google Speech Recognition service;", e)
        return None
    except Exception as e:
        print("[transcribe_file] error:", e)
        return None

if __name__ == "__main__":
    # small helpful listing (optional)
    try:
        voices = tts_engine.getProperty('voices')
        print("Available TTS voices (index, id, name):")
        for i, v in enumerate(voices):
            print(i, getattr(v, "id", ""), getattr(v, "name", ""))
    except Exception:
        pass

    speak("Initializing Jarvis.")
    try:
        while True:
            # record short voice sample for wake word detection
            audio_file = record_audio(duration=SHORT_DURATION)

            if audio_file:
                wake_text = transcribe_file(audio_file)
                safe_remove(audio_file)  # remove temp file immediately

                if wake_text:
                    print("Heard:", wake_text)
                    # use containment check rather than exact equality
                    if WAKE_WORD in wake_text.lower():
                        print("Wake word detected.")
                        speak("Yes, I am listening.")

                        # listen for next command
                        command_file = record_audio(duration=COMMAND_DURATION)
                        if not command_file:
                            speak("Sorry, I couldn't record your command.")
                            time.sleep(LOOP_SLEEP)
                            continue

                        user_command = transcribe_file(command_file)
                        safe_remove(command_file)

                        if user_command:
                            print("Command received:", user_command)
                            handle_command(user_command)
                        else:
                            print("Could not understand command.")
                            speak("Sorry, I couldn't understand that. Please try again.")
                    else:
                        # not the wake word — continue listening quietly
                        print("Wake word not found in phrase.")
                else:
                    print("No speech recognized in wake sample.")
            else:
                print("Recording failed; retrying.")

            # small delay so we don't loop too fast
            time.sleep(LOOP_SLEEP)

    except KeyboardInterrupt:
        print("Exiting...")

    except Exception as e:
        print("Fatal error:", e)