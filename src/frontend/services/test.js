import Socket from "../util/Socket";
import FormData from 'form-data'
import { audioUrl, imageUrl, testUrl, audioEPs, imageEPs } from "../Config.json";

const { loadEP, getEP } = audioEPs;
const { analyzeEP } = imageEPs;

async function loadaudio() {
  return await Socket.GET(audioUrl + getEP);
}

async function getaudio() {
  return await Socket.GET(audioUrl + loadEP);
}

async function postimg(img) {
  var formData = new FormData();
  formData.append("image", img);
  var payload = {
    image: img,
  }
  return await Socket.POST(imageUrl + analyzeEP, formData);
  //return await Socket.POST(testUrl, formData);
}

export default {
  loadaudio, getaudio, postimg
};
