# 4
from extract_freq_vp import detect_silence_range
import json

#sound_file = 'Aaron_Shi_Audio.wav'
#json_file = 'info_metrics.json'


def calc_silence_len(sound_file):
    count_500ms_8000ms = 0
    count_800ms_1100ms = 0
    count_greater_1100ms = 0

    for range_list in detect_silence_range(sound_file):

        max_range = range_list[-1]
        min_range = range_list[0]

        if (max_range - min_range > 500) and (max_range - min_range < 800):
            count_500ms_8000ms += 1
        elif (max_range - min_range > 800) and (max_range - min_range < 1100):
            count_800ms_1100ms += 1
        else:
            count_greater_1100ms += 1

    '''metric = {
        "SC_500ms_800ms": count_500ms_8000ms,
        "SC_800ms_1100ms": count_800ms_1100ms,
        "SC_Greater_Than_1100ms": count_greater_1100ms
    }'''

    return count_500ms_8000ms, count_800ms_1100ms, count_greater_1100ms


'''metric = calc_silence_len(sound_file)

with open(json_file, "r+") as fi:
    data = json.load(fi)
    data.update(metric)
    fi.seek(0)
    json.dump(data, fi)'''


