import json


# json_file = 'info_metrics.json'

# f = open(json_file)
# data = json.load(f)

##SOURCE: https://doi.org/10.1016/0094-730X(86)90018-5
##Normal Disfluency Percent is 3.4%
##Normal Speech Rate 158.8 wpm

##SOURCE: https://pdfs.semanticscholar.org/2920/283d2edecabd4e7767cd565f15664caad6d2.pdf
##Normal Pause Length is 300ms to 500ms

##SOURCE: Syntactic influences in prosody
##Normal Pause for  300ms to 500ms after 15 syllables

# silence_count = data["Silence_Count"]
# disfluency_percent = data['Disfluency_Percent']
# pause_len_500ms_800ms = data["SC_500ms_800ms"]
# pause_len_800ms_1100ms = data["SC_800ms_1100ms"]
# breath_count = data[ "Breath Count (More Than Expected)"]
# words_per_min = data["Words_Per_Min"]

# f.close()
def evaluate_disengagement(silence_count, disfluency_percent, pause_len_500ms_800ms, pause_len_800ms_1100ms,
                           breath_count, words_per_min):
    disengagement_count = 0

    if disfluency_percent > 3.4:
        disengagement_count += 1

    if ((pause_len_500ms_800ms + pause_len_800ms_1100ms) / silence_count) > 0.5:
        disengagement_count += 1

    if words_per_min < 158.8:
        disengagement_count += 1

    if (breath_count / silence_count) > 0.25:
        disengagement_count += 1

    return disengagement_count
