#1
from pydub import AudioSegment
from pydub.silence import detect_leading_silence

def trim_audio_file(m4a_file):
    sound = AudioSegment.from_file(m4a_file)
    start_trim = detect_leading_silence(sound)
    end_trim = detect_leading_silence(sound.reverse())
    duration = len(sound)
    trimmed_sound = sound[start_trim:duration-end_trim]
    trimmed_sound.export('trimmed.wav', format='wav')
    trimmed_sound_path = 'trimmed.wav'

    return trimmed_sound_path







