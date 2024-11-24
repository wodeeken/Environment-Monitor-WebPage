const filePathConfigs = require('./config');
const express = require('express');
const app = express();
app.use(express.static(filePathConfigs.DataRootPath));
const port = 3000;
const DataFileReader = require('./utils/DataFileReader.js');
const AudioVisualHelper = require('./utils/AudioVisualHelper.js');
app.set('view engine', 'pug');
app.get("/", function (req, res) {
  res.redirect("/home");
});
app.get("/home", function (req, res) {
  // Get latest data.
  var HumidityData = DataFileReader.GetHumidity(5).reverse();
  var AirTempData = DataFileReader.GetTemperature(5).reverse();
  var AirPressureData = DataFileReader.GetAirPressure(5).reverse();
  var EnclosureTempData = DataFileReader.GetEnclosureTemperature(5).reverse();

  var images = AudioVisualHelper.GetLatestImages(3);
  var audio = AudioVisualHelper.GetLatestAudio(3);
  res.render('home', {
    Humidity: HumidityData,
    AirTemperature: AirTempData,
    AirPressure: AirPressureData,
    EnclosureTemperature: EnclosureTempData,
    Image1: images && images.length > 0 ? images[0] : null,
    Image2: images && images.length > 1 ? images[1]: null,
    Image3: images && images.length > 2 ? images[2]: null,
    Audio1: audio && audio.length > 0 ? audio[0]: null,
    Audio2: audio && audio.length > 1 ? audio[1]: null,
    Audio3: audio && audio.length > 2 ? audio[2]: null,
  });
});
app.get("/images", function (req, res) {
  var images = AudioVisualHelper.GetLatestImages();
  images.reverse();
  res.render('images', {
    Images: images
  });
});
app.get("/audio", function (req, res) {
  var audio = AudioVisualHelper.GetLatestAudio();
  audio.reverse();
  res.render('audio', {
    Audio: audio
  });
});
app.get("/air_monitor", function (req, res) {
  var airTemp = DataFileReader.GetTemperature();
  var humidity = DataFileReader.GetHumidity();
  var airPressure = DataFileReader.GetAirPressure();
  var enclosureTemp = DataFileReader.GetEnclosureTemperature();
  airTemp.reverse();
  humidity.reverse();
  airPressure.reverse();
  enclosureTemp.reverse();
  res.render('air_monitor', {
    AirTemperature: airTemp,
    Humidity: humidity,
    AirPressure: airPressure,
    EnclosureTemperature: enclosureTemp
  });
});
app.get("/about", function (req, res){
  res.render('about', {
    
  })
})
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});