from preprocess import trim_audio_file
from speech_to_text import get_large_audio_transcription
from extract_wpm import calc_words_per_min
from extract_freq_vp import detect_silence_range, silence_count_comparison
from extract_len_vp import calc_silence_len
from extract_disfluency import tag_words, disfluency_anal
from evaluate import evaluate_disengagement
import numpy as np
import os
import matplotlib
matplotlib.use('TkAgg')
import matplotlib.pyplot as plt






m4a_file = "audio_only_16788482_Sarah_Shapiro.m4a"


def process_metrics(m4a_file):
    trimmed_sound = trim_audio_file(m4a_file)
    print("STEP 1")
    [total_word_sum, word_sum, time_sum, txt_file] = get_large_audio_transcription(trimmed_sound)
    print("STEP 2")
    words_per_min = calc_words_per_min(word_sum, time_sum)
    print("STEP 3")
    clean_silence_ranges = detect_silence_range(trimmed_sound)
    [diff_breath_count, silence_count] = silence_count_comparison(clean_silence_ranges, word_sum)
    print("STEP 4")
    [count_500ms_8000ms, count_800ms_1100ms, count_greater_1100ms] = calc_silence_len(trimmed_sound)
    print("STEP 5")
    tags_list = tag_words(txt_file)
    [disf_count, disf_percent] = disfluency_anal(tags_list, total_word_sum)
    print("STEP 6")
    disengagement_count = evaluate_disengagement(silence_count, disf_percent, count_500ms_8000ms,
                                                 count_800ms_1100ms, diff_breath_count, words_per_min)

    metrics = {"Total_Word_Count": total_word_sum, "Total_Word_Count": word_sum, "Duration_Seconds": time_sum,
               "Words_Per_Min": words_per_min, "Breath Count": diff_breath_count, "Silence_Count": silence_count,
               "SC_500ms_800ms": count_500ms_8000ms, "SC_800ms_1100ms": count_800ms_1100ms,
               "SC_Greater_Than_1100ms": count_greater_1100ms,
               "Disfluency_Count": disf_count, "Disfluency_Percent": disf_percent,
               "Disengagement_Count": disengagement_count}


    return metrics

metrics = process_metrics(m4a_file)

path = "/Users/aribakhan/PycharmProject/AudioAnalysis/"
disengage = [metrics["Disengagement_Count"]]
plt.gcf().set_facecolor((255 / 255, 255 / 255, 102 / 255))
plt.suptitle('Disengagement Count', fontsize=14, fontweight='bold')
plt.title("Disengagement Meter\n0 = Engaged, 1 = Slightly, 2 = Moderately, 3 = Very, "
          "4 = Completely")
text_str = "Word Count:"+str(metrics["Total_Word_Count"])+ "\nWords Per Minute:" + str(metrics["Words_Per_Min"]) + "\nBreath Count:" + str(metrics["Breath Count"]) + "\nDisfluency Percent:" + str(metrics["Disfluency_Percent"])
text_str2 = "Silence Count:"+str(metrics["Silence_Count"])+ "\nSC 500-800ms:" + str(metrics["SC_500ms_800ms"]) + "\nSC 800-1100ms:" + str(metrics["SC_500ms_800ms"]) + "\nSC <1100ms:" + str(metrics["SC_Greater_Than_1100ms"])
plt.text(0, 0, text_str)
plt.text(1.5, 0, text_str2)

plt.scatter(disengage, [0], s=400)
plt.xticks(np.arange(0, 5, step=1))
plt.yticks(np.arange(0, 0))
plt.gca().spines['right'].set_color('none')
plt.gca().spines['top'].set_color('none')
plt.gca().spines['left'].set_color('none')
plt.tight_layout()
file_path = os.path.join(path,'chart.png')
plt.savefig(file_path)

