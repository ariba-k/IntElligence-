from flask import Flask, render_template, redirect, request, url_for
import os
import jsonify
from werkzeug.utils import secure_filename
from processing import process_metrics
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
import matplotlib as plt
import numpy as np
from io import BytesIO
import base64
#import StringIO


os.chdir("/Users/aribakhan/PycharmProject/AudioAnalysis")

audio_file = "Aaron_Shi_Audio.wav"

app = Flask(__name__)

'''''@app.route('/')
def index():
    return render_template('index.html')'''

app.config["UPLOADS"] = "/Users/aribakhan/PycharmProject/AudioAnalysis/"
app.config["ALLOWED_AUDIO_EXTENSIONS"] = ["WAV", "M4A"]


def allowed_audio(filename):
    if not "." in filename:
        return filename
    ext = filename.rsplit(".", 1)[1]

    if ext.upper() in app.config["ALLOWED_AUDIO_EXTENSIONS"]:
        return True
    else:
        return False


@app.route("/", methods=["GET", "POST"])
def upload_audio():
    if request.method == "POST":

        if request.files:
            audio = request.files["audio"]

            if audio.filename == "":
                print("Audio Must Have Name")
                return redirect(request.url)

            if not allowed_audio(audio.filename):
                print("Audio Extension Not Allowed")
                return redirect(request.url)

            else:
                filename = secure_filename(audio.filename)
                audio.save(os.path.join(app.config["UPLOADS"], "audio.m4a"))

            print("AUDIO saved")

            return redirect(url_for("process_audio"))

    return render_template("public/upload-audio.html")


@app.route("/process-audio-plot", methods=["GET", "POST"])
def process_audio():
    process_metrics(app.config["UPLOADS"] + "audio.m4a")
    full_filename = os.path.join(app.config["UPLOADS"], 'static/images/chart.png')


    return render_template("public/process-audio-plot.html", user_image = full_filename)


if __name__ == '__main__':
    app.run(debug=True)
