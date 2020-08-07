# 2
from pydub import AudioSegment
from pydub.silence import split_on_silence
import speech_recognition as sr
import os
import json

# TODO: Write audio file path so it grabs the only wave files created after preprocess.py

#audio_file = 'Aaron_Shi_Audio.wav'


# Split Audio Into Chunks
# Write Speech Into Text Flles
# Return metrics about speech such as word count, duration
def get_large_audio_transcription(audio_file):
    r = sr.Recognizer()
    sound = AudioSegment.from_wav(audio_file)
    txt_file = "final_recognized_speech.txt"
    fh = open(txt_file, "w+")
    chunks = split_on_silence(sound,
                              # experiment with this value for your target audio file
                              min_silence_len=900,
                              # adjust this per requirement
                              silence_thresh=sound.dBFS - 16,
                              # keep the silence for 1 second, adjustable as well
                              keep_silence=500,
                              )

    try:
        os.mkdir('audio_chunks_final')
    except(FileExistsError):
        pass

        # move into the directory to
        # store the audio files.
    os.chdir('audio_chunks_final')
    # whole_text = ""
    word_sum = 0
    total_word_sum = 0
    time_sum = 0
    # process each chunk
    for i, audio_chunk in enumerate(chunks, start=1):
        print(audio_chunk.duration_seconds)
        # export audio chunk and save it in
        # the `folder_name` directory.
        audio_chunk.export("./chunk{0}.wav".format(i), format="wav")
        chunk_filename = 'chunk' + str(i) + '.wav'
        # recognize the chunk
        with sr.AudioFile(chunk_filename) as source:
            audio_listened = r.record(source)
            # try converting it to text
            try:
                text = r.recognize_google(audio_listened)
            except sr.UnknownValueError as e:
                print("Error:", str(e))
            else:
                text = f"{text.capitalize()}. "
                #print(chunk_filename, ":", text)
                fh.write(text)

                leng = len(text.split(" "))
                if leng > 3:
                    time_sum += audio_chunk.duration_seconds
                    word_sum += leng
                    print("cumulative wpm = " + str(word_sum / time_sum * 60))
                total_word_sum += leng
                # whole_text += text
    fh.close()
    os.chdir('..')




    # return the text for all chunks detected
    return total_word_sum, word_sum, time_sum, txt_file


#[total_word_sum, word_sum, time_sum] = get_large_audio_transcription(audio_file, 900)



#os.chdir('/Users/aribakhan/PycharmProject/AudioAnalysis/')
#with open("info_metrics.json", "w") as outfile:
    #json.dump(jsonObj, outfile)
