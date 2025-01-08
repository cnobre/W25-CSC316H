/*
 *  StationMap - Object constructor function
 *  @param _parentElement 	-- HTML element in which to draw the visualization
 *  @param _data						-- Array with all stations of the bike-sharing network
 */

class StationMap {


    /*
     *  Constructor method
     */
    constructor(parentElement, displayData, mapPosition) {
        this.parentElement = parentElement;
        this.displayData = displayData;
        this.mapPosition = mapPosition;

        this.initVis();
    }


    /*
     *  Initialize station map
     */
    initVis() {
        let vis = this;


        // Instantiate the map object
        vis.map = L.map(vis.parentElement).setView(vis.mapPosition, 13);


        // Specify directory with leaflet images
        L.Icon.Default.imagePath = 'img';



        // Load and display a tile layer on the map (OpenStreetMap)
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(vis.map);


        // Load and display a tile layer on the map (Stamen)
        // L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
        //     attribution: 'Map tiles by <a href="https://stamen.com">Stamen Design</a>, <a href="https://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        //     subdomains: 'abcd',
        //     ext: 'png'
        // }).addTo(vis.map);

        // Add an empty layer group for the markers
        vis.allMarker = L.layerGroup().addTo(vis.map);


        // Defining an icon class
        let LeafIcon = L.Icon.extend({
            options: {
                shadowUrl: 'img/marker-shadow.png',
                iconSize: [25, 41], // size of the icon
                iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
                popupAnchor: [0, -28] // popup position
            }
        });

        // Instantiate icons
        vis.blueMarker = new LeafIcon({iconUrl: 'img/marker-blue.png'});


        vis.wrangleData();
    }


    /*
     *  Data wrangling
     */
    wrangleData() {
        let vis = this;

        // no data wrangling needed

        // Update the visualization
        vis.updateVis();
    }


    /*
     *  The drawing function
     */
    updateVis() {
        let vis = this;

        // Remove all layers
        vis.allMarker.clearLayers();


        // Create a marker for each station
        vis.displayData.forEach(function (d) {

            let popupContent = '<strong>' + d.stationName + '</strong><br/>';
            popupContent += 'Capacity: ' + d.capacity

            // Set marker icon depending on the state of each station
            let markerColor = vis.blueMarker;

            let marker = L.marker([d.latitude, d.longitude], {icon: markerColor})
                .bindPopup(popupContent);

            vis.allMarker.addLayer(marker);
        });


        // Load GeoJSON objects (Boston MBTA lines) and render it on the map
        d3.json("data/MBTA-Lines.json").then(data => {
            let mbtaLines = L.geoJson(data, {
                style: vis.styleSubway,
                weight: 8,
                opacity: 0.8
            }).addTo(vis.map);
        })
    }


    styleSubway(feature) {
        let subwayColor = feature.properties.LINE;
        return {color: subwayColor};
    }
}





