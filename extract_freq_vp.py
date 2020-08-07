# 3
# TODO: Distinguish b/w pauses to wait for an answer for a question
# TODO: SEE if you can combine the last two funcs

import json
from pydub import AudioSegment
from pydub.silence import detect_silence

'''sound_file = 'Aaron_Shi_Audio.wav'
json_file = 'info_metrics.json'''


##500ms should be the cutoff
def detect_silence_range(sound_file):
    sound = AudioSegment.from_wav(sound_file)
    dBFS = sound.dBFS
    clean_silence_ranges = []
    silence_ranges = detect_silence(sound, min_silence_len=500, silence_thresh=dBFS - 16)
    for range in silence_ranges:
        if (range[-1] - range[0]) < 10000:
            clean_silence_ranges.append(range)

    return clean_silence_ranges


def silence_count_comparison(silence_range, total_word_count):
    ###About 15 syllabes
    utterance_leng = 8
    silence_count = len(silence_range)
    #print(silence_count)

    #f = open(json_file)
    #data = json.load(f)

    #total_word_count = data["Clean_Word_Count"]

    expected_breath_count = total_word_count / utterance_leng

    if silence_count < expected_breath_count:
        diff_breath_count = silence_count - expected_breath_count
        #metric = {"Breath Count (Less Than Expected": diff_breath_count, "Silence_Count": silence_count}
        # print(metric)
        return diff_breath_count, silence_count
    diff_breath_count = silence_count - expected_breath_count
    #metric = {"Breath Count (More Than Expected)": diff_breath_count, "Silence_Count": silence_count}
    # print(metric)
    return diff_breath_count, silence_count


#range = detect_silence_range(sound_file)

#metric = silence_count_comparison(range)

#with open(json_file, "r+") as fi:
    #data = json.load(fi)
    #data.update(metric)
    #fi.seek(0)
    #json.dump(data, fi)
