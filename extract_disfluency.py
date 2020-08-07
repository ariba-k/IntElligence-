# 5
try:
    import deep_disfluency
except ImportError:
    print("no installed deep_disfluency package, pathing to source")
    import sys

    sys.path.append("../")
from deep_disfluency.tagger.deep_tagger import DeepDisfluencyTagger
import json

txt_file = "final_recognized.txt"
json_file = 'info_metrics.json'


def tag_words(txt_file):
    disf = DeepDisfluencyTagger(
        config_file="../deep_disfluency/experiments/experiment_configs.csv",
        config_number=21,
        saved_model_dir="../deep_disfluency/experiments/021/epoch_40"
    )
    with open(txt_file, "r") as f:
        for lines in f:
            line = lines.split(".")
            for words in line:
                word = words.split()
                for i in word:
                    disf.tag_new_word(i)

    tags = disf.output_tags

    return tags


def disfluency_anal(tags_list, num_words):
    f = open(json_file)
    data = json.load(f)
    #num_words = data["Clean_Word_Count"]
    f.close()

    disf_count = 0
    for tag in tags_list:
        print(tag)
        if tag != '<f/>':
            disf_count += 1

    disf_percent = (disf_count / num_words) * 100

    return disf_count, round(disf_percent, 2)




'''tag_list = tag_words(txt_file)
[count, anal] = disfluency_anal(tag_list)

metric = {
    "Disfluency_Count": count,
    "Disfluency_Percent": anal,
}
print(metric)
with open(json_file, "r+") as fi:
    data = json.load(fi)
    data.update(metric)
    fi.seek(0)
    json.dump(data, fi)'''
