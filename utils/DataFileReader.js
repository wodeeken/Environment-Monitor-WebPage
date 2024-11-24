
const fs = require('node:fs');
const filePathConfigs = require('../config');
const Utilities = require("./Utilities.js")
class DataFileReader {
    // MaxLines < 0 => Get all lines.
    static GetHumidity(maxLines = -1) {
        return this.FileReadHelper(filePathConfigs.DataRootPath + "/" + filePathConfigs.HumidityFilePath, maxLines);
    }
    static GetTemperature(maxLines = -1) {
        return this.FileReadHelper(filePathConfigs.DataRootPath + "/" + filePathConfigs.AirTemperatureFilePath, maxLines);
    }
    static GetEnclosureTemperature(maxLines = -1) {
        return this.FileReadHelper(filePathConfigs.DataRootPath + "/" + filePathConfigs.EnclosureAirTemperatureFilePath, maxLines);
    }
    static GetAirPressure(maxLines = -1) {
        return this.FileReadHelper(filePathConfigs.DataRootPath + "/" + filePathConfigs.AirPressureFilePath, maxLines);
    }
    static FileReadHelper(path, maxLines){
        var returnData = [];
        try {
            const data = fs.readFileSync(path, "utf8");

            // Parse data by newline. Return first maxLines lines.
            var filesData = data.split(/\r?\n/);
            if (maxLines >= 0) {
                console.log()
                filesData = filesData.splice((filesData.length - maxLines - 1 >= 0 ? filesData.length - maxLines - 1 : 0), filesData.length -1);
            }
            // Loop through all data and split.
            for(var i = 0; i < filesData.length; i++){
                var lineSplit = filesData[i].split("=");
                // Convert to date object.
                var dateObj = new Date(lineSplit[0])
                if(lineSplit.length == 2){
                    returnData.push({date: Utilities.FormatDate(dateObj), value: lineSplit[1]});
                }
                
            }
            
        } catch (err) {
            console.error(err);
        }
        return returnData;
    }
}
module.exports = DataFileReader;