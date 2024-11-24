const fs = require('node:fs');
const path = require('node:path');
const filePathConfigs = require('../config');
const Utilities = require("./Utilities.js")
class AudioVisualHelper {
    static GetLatestImages(lastNImages = -1){
        var returnVal = [];
        var allImages = fs.readdirSync(filePathConfigs.DataRootPath + "/" + filePathConfigs.CameraImageDirectoryPath);
        allImages.sort();
        if(lastNImages > 0){
            allImages = allImages.splice((allImages.length - lastNImages - 1 >= 0 ? allImages.length - lastNImages  : 0), allImages.length - 1)
        }
        for(var i = 0; i < allImages.length; i++){
            var onlyDate = allImages[i].split(" ")[0].split(".")[0];
            var onlyTime = allImages[i].split(".")[0].split(" ")[1];
            var dateObj = new Date(onlyDate.split("_")[0], onlyDate.split("_")[1] - 1, onlyDate.split("_")[2]);
            dateObj.setHours(onlyTime.split(":")[0]);
            dateObj.setMinutes(onlyTime.split(":")[1]);
            dateObj.setSeconds(onlyTime.split(":")[2]);
            returnVal.push({date: Utilities.FormatDate(dateObj), value: filePathConfigs.CameraImageDirectoryPath + "/" + allImages[i]});
        }
        return returnVal;
    }
    static GetLatestAudio(lastNAudio = -1){
        var returnVal = [];
        var allAudio = fs.readdirSync(filePathConfigs.DataRootPath + "/" + filePathConfigs.AudioDirectoryPath);
        allAudio.sort();
        if(lastNAudio > 0){
            allAudio = allAudio.splice((allAudio.length - lastNAudio - 1 >= 0 ? allAudio.length - lastNAudio  : 0), allAudio.length - 1)
        }
        for(var i = 0; i < allAudio.length; i++){
            var onlyDate = allAudio[i].split(" ")[0].split(".")[0];
            var onlyTime = allAudio[i].split(".")[0].split(" ")[1];
            var dateObj = new Date(onlyDate.split("_")[0], onlyDate.split("_")[1] - 1, onlyDate.split("_")[2]);
            dateObj.setHours(onlyTime.split(":")[0]);
            dateObj.setMinutes(onlyTime.split(":")[1]);
            dateObj.setSeconds(onlyTime.split(":")[2]);
            returnVal.push({date: Utilities.FormatDate(dateObj), value: filePathConfigs.AudioDirectoryPath + "/" + allAudio[i]});
        }
        return returnVal;
    }
}
module.exports = AudioVisualHelper;