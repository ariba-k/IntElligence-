# -*- coding: utf-8 -*-
"""
Created on Wed Aug  5 17:40:31 2020

@author: aaron
"""
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Sep 16 00:34:39 2019

@author: macbookair
"""
import os
from flask import Flask, render_template, redirect, request, send_from_directory

app = Flask(__name__)

#engine = sqlalchemy.create_engine('mysql://root:password@localhost/EU')

# HTML variables
__html_query = 'query'

import cv2
import json
import urllib
from flask import Flask, jsonify, request
import numpy as np

import cv2

haar_path = "cascades/haarcascade_frontalface_default.xml"
detector = cv2.CascadeClassifier(haar_path)

#ds_factor=0.6
@app.route("/analyzeImage",methods = ['POST'])
def face_isolation():
    #image = cv2.imread(request.files["image"])

    r = request
    
    #print(request)
    # convert string of image data to uint8
    nparr = np.fromstring(r.files["image"].read(), np.uint8)
    # decode image
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    #print(image)
    #print(type(image))
    height = image.shape[0];
    width = image.shape[1];
    faceList = [];
    #frame=cv2.resize(frame,None,fx=ds_factor,fy=ds_factor,
    #    interpolation=cv2.INTER_AREA)        
    
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
    faceRects = detector.detectMultiScale(gray, 
        scaleFactor = 1.05, minNeighbors = 5,
        minSize = (30, 30), flags=cv2.CASCADE_SCALE_IMAGE) #cv2.CASCADE_SCALE_IMAGE if opencv 3+

    for (x, y, w, h) in faceRects:
        #print(x, y, w, h)
        #frame = image[y:y+h, x:x+w]
        #print(x,y,w,h)
        #faceList.append([max(0, x-20), max(0, y-20), min(image.shape[1], x+w+20)-x, min(image.shape[0], y+h+20)-y])
        new_width = round((min(image.shape[1], x+w+20)-x)*640/width)
        new_height = round((min(image.shape[0], y+h+20)-y)*480/height)
        faceList.append([int(max(0, x-20)), int(max(0, y-20)), int(new_width), int(new_height)])
        #print(faceList)
        #print(faceList)
        #faceList.append(frame)
        #frame.shape()
        #cv2.imshow("frame second:", frame)
        #cv2.waitKey(0);        
        #cv2.destroyAllWindows()  
    faceList = np.asarray(faceList)
    #return faceList
    #return jsonify(faceList)
    return json.dumps(faceList.tolist())
#    return jsonify({'faceList': faceList});


@app.route('/')
def hello():
    return 'Hello, World'

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)

