// Variable for the visualization instance
let stationMap;


// Hubway JSON feed
let stationInfoUrl = 'https://gbfs.bluebikes.com/gbfs/en/station_information.json';
let stationStatusUrl = 'https://gbfs.bluebikes.com/gbfs/en/station_status.json';

/*d3.json(url).then(jsonData =>{
	console.log(jsonData);
});*/
// Hubway JSON feed
let url = 'https://gbfs.bluebikes.com/gbfs/en/station_information.json';

/*d3.json(url).then(jsonData =>{
	console.log(jsonData);
});*/

fetch(url, function (d) {
    console.log(d)
})
    .then(response => response.json())
    .then(data => {
        gettingStarted(data)
    });

// function that gets called once data has been fetched.
// We're handing over the fetched data to this function.
// From the data, we're creating the final data structure we need and create a new instance of the StationMap
function gettingStarted(data) {

    // log data
    console.log(data)


    let apiData = data.data.stations;

    // create empty data structure
    let displayData = [];

    // Prepare data by looping over stations and populating empty data structure
    apiData.forEach(function (d) {
        displayData.push({
            stationName: d.name,
            latitude: d.lat,
            longitude: d.lon,
            capacity: d.capacity
        })
    });

    // Display number of stations in DOM
    document.getElementById('station-count').innerText = apiData.length;

    // Instantiate visualization object (bike-sharing stations in Boston)
    stationMap = new StationMap("station-map", displayData, [42.360082, -71.058880]);
}
