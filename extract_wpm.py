#2
# @AaronShi
import json

#audio_file = 'Aaron_Shi_Audio.wav'
#json_file = 'info_metrics.json'


def calc_words_per_min(word_sum, time_sum):
    #f = open(json_file)
    #data = json.load(f)

    #word_sum = data["Clean_Word_Count"]
    #time_sum = data["Duration_Seconds"]

    wpm = word_sum / time_sum * 60

    return round(wpm,2)


'''wpm = calc_words_per_min(json_file)
print(wpm)
metric = {"Words_Per_Min": wpm}

with open(json_file, "r+") as fi:
    data = json.load(fi)
    data.update(metric)
    fi.seek(0)
    json.dump(data, fi)'''