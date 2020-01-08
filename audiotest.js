const weather = require('weather-js');

weather.find({search: 'Boston, MA', degreeType: 'F'}, function(err, result) {
    if(err) console.log(err);
   
    // console.log(JSON.stringify(result, null, 2));

    let location = JSON.stringify(result[0].location.name, null, 2)
    let temp = JSON.stringify(result[0].current.temperature, null, 2)
    let description = JSON.stringify(result[0].current.skytext, null, 2)
    console.log(location,temp,description)
  });
