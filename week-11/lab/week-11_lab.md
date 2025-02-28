<!---
layout: labold
exclude: true
--->

&nbsp;

# Week 10 Lab

### Pre-Reading Quiz
Please fill out the pre-reading quiz on Quercus at the beginning of class!

### Learning Objectives

- Know how to use data APIs
- Know how to use the Fetch API, i.e. `fetch()`
- Know how to create interactive maps with the JS framework *Leaflet.js*
	- Load tiles from different providers
	- Draw markers, polygons, circles, etc.
	- Import GeoJSON data and render it on the map 


### Prerequisites

- You have read the documentation of and know how to use **fetch()** - [link](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)


### Data Sources

In the past few weeks you have worked only with *static* datasets. Either with small arrays or
 external CSV, JSON or GeoJSON files. While we were using online resources in some cases, you
  could have stored all the files we've used so fare locally. The advantage of storing data
   locally is that your application is independent and that the data will not change.

Very often, however, the data sources of visualizations are *dynamic* and you have to deal with a
 *data stream* instead of a static dataset (just think of election data on election night for
  example). Also, the overall dataset might be very large, and you just want a subset. In both
   examples, you might just want to send a query to an external service (data API) to get the specific
    information that is currently needed.

Data APIs allow you to programmatically access a wealth of open data resources from governments
, NGO's and companies. Especially with the evolution of e-government and open data initiatives
 worldwide, more and more APIs are made available to the general public.

During this lab you will learn how to access these web services and how to visualize the
 requested data. In contrast to the last weeks you don't have to deal with D3 today. Instead,you
  will learn how to create interactive maps with the JavaScript library *Leaflet*. This powerful library has been established as an open source alternative to *Google Maps* to create zoomable, interactive maps. But you can also render D3 on top of a Leaflet map or create linked D3/Leaflet views for a more comprehensive visualizations.

### Example

The activities of today's lab will guide you through the implementation of an interactive map. You will have to visualize *stations* of Boston's bike-sharing network *Blue Bikes* (formerly known as Hubway).

A major aspect of these bike-sharing networks is the dynamic "fill level" of the individual
 stations. The number of bikes available in a station is important for the network operator, who
  must take care of a balanced network, as well as for the consumer, who wants to rent a bike. While the operator is probably more interested in the *big picture*, the consumer wants to know if there is an available bike at the start and an avaialable docking station at the end of the route.

In the following activities you will have to create a basic overview map to help the user get a rough impression of the local bike-sharing network.

*Blue Bikes has a compex API that provides lots of information:*  [API Documentation](https://www.bluebikes.com/system-data), [System Information JSON](https://gbfs.bluebikes.com/gbfs/en/system_information.json)





#### Preview

![Lab 12 - Preview](assets/cs171-lab12-preview.png?raw=true "Lab 12 - Preview")



## What is `fetch()` and why is it useful?

You have already worked with the d3-fetch module in the past. We have been using `d3.csv` and `d3.json` in almost 
every single lab and homework. Here's some sample code to remind you of the syntax:

```javascript
// loading csv
d3.csv("/path/to/file.csv").then(function(data) {
  console.log(data); // [{"Hello": "world"}, …]
});


// loading json
d3.json("/path/to/file.json").then(function(data) {
  console.log(data); // [{"Hello": "world"}, …]
});
```

The [d3-fetch](https://github.com/d3/d3-fetch) module is built on top of the javascript fetch API. As a consequence, you would be able to complete all the 
tasks of this lab by using d3.json, but we would like to teach you what's going on underneath the hood. 

When you make an HTTP request from a URL, the fetch() method will return an object. In the first `.then()` method 
of fetch, you can pass in a call-back function that takes as an argument the body of the response object. 
You can then call a method on the body of the return object (i.e. `.json()`, `.text()`, etc.) to convert it accordingly. This is what d3 is doing for you as long as you select 
the right method (i.e. d3.csv, d3.json, ... etc. ). Apart from that, the JavaScript fetch API works exactly like the d3-fetch module.
   
```javascript
fetch('http://example.com/movies.json')
  .then(response => response.json())
  .then(data => console.log(data));
```

## APIs

Lastly, we need to talk about APIs. Modern APIs adhere to standards (typically HTTP and REST), that are 
developer-friendly, easily accessible and understood broadly

---

#### Activity I - Request station data from *Blue Bikes*

You will notice that in this activity we do not give you as many helpful pointers as in previous labs. We do this with the goal to prepare you for your final projects, where you will have to develop D3 code independently in your groups. 

1. **Download the template**

	[Template.zip](Template.zip)
	
	The template is based on *Bootstrap*	
	- ```index.html``` contains references to the JS and CSS files. There is also an empty *div* element (ID: ```station-map```) that should be used as parent container for your map.

	- ```main.js``` and ```stationMap.js``` contain only a basic boilerplate. The structure is similar to our previous lab, but with less provided code.

2. **Request data from the Blue Bikes API** 
	
	Write the response to the web console and analyze the data. 	

3. **Extract an array with stations (JSON objects) from the response object**

	Use the dot-notation to navigate and select the necessary data from the tree. 
	
	
4. **Create a new, empty data structure called `displayData` and populate it with all the stations Information**
    
    Look at the format of the data, what are the fields or data attributes? Then, iterate over all the stations, 
    convert the data where necessary, and push each station into your final data structure `displayData`

   Specifically, the data we're interested in are station name (`name`), capacity (`capacity`), latitude (`lat`), and longitude (`lon`).

5. **Show the number of stations on the website using Javascript**

	*We have integrated an HTML element ```(id="station-count")``` which should contain the number of stations of Boston's bike-sharing network.*
	
	Update the `innerText` of this element to reflect the number of stations.	
5. **Create an instance of ```StationMap```**
	
	*In addition to the ```main.js``` file we have also included a template for the "visualization object".*
	
	→ Create an instance of this object and pass over the data and the ID of the parent container (*"station-map"*)

	You don't need to implement a map for now, but you can output the data to the web console, to see if it works.

---

### Leaflet

*Leaflet* is a lightweight JavaScript library for mobile-friendly interactive maps. It is open source, which means that there are no costs or dependencies for incorporating it into your visualization. Leaflet works across all major browsers, can be extended with a huge amount of plugins, and the implementation is straight-forward. The library provides a technical basis that is comparable to *Google Maps*, which means that most users are already familiar with it.

*Downloads, Tutorials & Docs: [http://leafletjs.com/](http://leafletjs.com/)*

#### Implementation

*Before continuing with the next activity we will give you a short overview of the required steps for creating a Leaflet map.*

After downloading and including the necessary files you will just need a few lines of code to create a basic map.

*Parent HTML container for the map:* (note that this is just an example!)

```html
<div id="ny-map"></div>
```

*Initialize the map object:*

```javascript
let map = L.map('ny-map').setView([40.712784, -74.005941], 13);
```
*[40.712784, -74.005941]* ...corresponds to the geographical center of the map (*[latitdue, longitude]*). In this example we have specfied the center to be in New York City.

If you want to know the latitude-longitude pair of a specific city or address you can use a web service, for instance: [http://www.latlong.net](http://www.latlong.net)

Additionaly, we have defined a default zoom-level (*13*). All further specifications are optional and described in the [Leaflet documentation](http://leafletjs.com/reference.html).

*Add a tile layer to the map:*

```javascript
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
```
In this code snippet, the URL *"http://{s}.tile.osm.org/{z}/{x}/{y}.png"* is particularly important. Leaflet provides only the *"infrastructure"* but it does not contain any map imagery. For this reason, the data - called tiles - must be implemented by map data providers. That means that we have to choose a provider and specify the source of the map tiles (see URL).

A list of many *tile layer* examples (that work with Leaflet) is available on this webpage: [https://leaflet-extras.github.io/leaflet-providers/preview/](https://leaflet-extras.github.io/leaflet-providers/preview/)

Some of the map providers (e.g., *OpenStreetMap*, *Stamen*) made their data completely available for free, while others require the registration of an API key (*Google*, *MapBox*, ...) and charge fees after exceeding a specific limit.

*Examples:*

![Map Tiles - Examples](assets/cs171-map-tiles-provider.png?raw=true "Map Tiles - Examples")

For now, we will use tiles from *OpenStreetMap* (*"http://{s}.tile.osm.org/{z}/{x}/{y}.png"*).

After adding a tile layer to the map object, the page still remains empty. You have to make sure that the map container has a defined height.

*Specify the size of the map container in CSS:*

```css
#ny-map {
	width: 100%;
	height: 600px;
}
```

*You can add a marker with the following line of code:*

```javascript
let marker = L.marker([40.713008, -74.013169]).addTo(map);
```

The array (```[40.713008, -74.013169]```) refers again to a latitude-longitude pair, in our example to the position of *One World Trade Center*.

*You have many more options. For example, you can bind a popup to a marker:*

```javascript
let popupContent =  "<strong>One World Trade Center</strong><br/>";
	popupContent += "New York City";

// Create a marker and bind a popup with a particular HTML content
let marker = L.marker([40.713008, -74.013169])
	.bindPopup(popupContent)
	.addTo(map);
```

*Result:*

![Leaflet - Example](assets/cs171-leaflet-map.png?raw=true "Leaflet - Example")

**LayerGroups**

Leaflet provides some features to organize markers and other objects that we would like to draw. Basically, it is a layering concept, which means that each marker, circle, polygon etc. is a single layer. These layers can be grouped into *LayerGroups* which makes the handling of these objects easier.
	
Suppose we want to create an interactive map for a hotel in New York City. We want to show the hotel location, the most popular sights, the nearest subway stations and so on. Now, we could create several LayerGroups for these elements. The advantage of this additional step is, that it is much easier to filter or highlight objects (e.g. show only *sights*).

```javascript
// Add empty layer groups for the markers / map objects
nySights = L.layerGroup().addTo(map);
subwayStations = L.layerGroup().addTo(map);
```

```javascript
// Create marker
let centralPark = L.marker([40.771133,-73.974187]).bindPopup("Central Park");

// Add marker to layer group
nySights.addLayer(centralPark);
```

Now you have a *sights* layer that combines these markers into one layer and that you can add or remove from the map in one single operation.

This was just a small example to help you get started with *Leaflet*. The library provides many more features and allows you to create powerful applications, especially if it is linked to D3 or other visualization components.

In the course of this lab we will show you a few more features but we encourage you to have a look at the Leaflet website for further implementation details and tutorials: [http://leafletjs.com/](http://leafletjs.com/)

---

#### Activity II - Create an interactive map with Leaflet.js

1. **Download Leaflet** *(latest stable version)*

	[http://leafletjs.com/download.html](http://leafletjs.com/download.html)

2. **Integrate the library into your project**

	*Unzip the downloaded archive to your website’s directory and reference the JS and CSS files in your HTML document.*
	
	```html
	<link rel="stylesheet" href="css/leaflet.css">
	```
	```html
	<script src="js/leaflet.js"></script>
	```
	
	Leaflet assumes that the directory ```images``` (with leaflet images, e.g. markers) is in the same directory as ```leaflet.css```.
	
	We would recommend you to separate the images from your css directory and stick to this structure:
	
	- **index.html** is the default file that appears when a user invokes your webpage. It includes a basic structure and a placeholder for your interactive map. 
	- **/js** contains the JS libraries (Bootstrap, D3, leaflet) and your JS files ```main.js``` and ```stationMap.js```
	- **/data** contains the data files
	- **/css** contains the stylesheet files (libraries and custom styles)
	- **/img** contains all the images

3. **Instantiate a new Leaflet map object**

	You should implement all the map related functionality in *stationMap.js*.
	
	*General pipeline:*
	
	- ```initVis()``` - Initialize static components
	- ```wrangleData()``` - Can be used later to filter/modify the data
	- ```updateVis()``` - Draw the markers, objects etc. on top of the map
	
	→ Create an instance of the Leaflet map, specify Boston as the geographical center and choose a proper zoom-level.
	
	→ It would make sense to include the parameter for the *map center* in the object constructor method. As a result, the visualization would be more flexible, we could create several instances of ```StationMap``` and define an individual location every time. Please adjust your code accordingly:
	
	For example, for a New York City map:
	
	```javascript
	nyMap = new StationMap("ny-map", alldata, [40.712784, -74.005941]);
	```
	
	Likewise, for our map of bike stations, we would use:
	
	```javascript
	stationMap = new StationMap("station-map", displayData, [???, ???]);
	```
	
	→ Specify the path to the Leaflet images (in ```initVis()```)
	
	```javascript
	// If the images are in the directory "/img":
	L.Icon.Default.imagePath = 'img/';
	```
	
4. **Load and display a tile layer on the map (in ```initVis()```)**

	OpenStreetMap: ```http://{s}.tile.osm.org/{z}/{x}/{y}.png``` 

	*Don't forget to define a container height in css.*
	
	After reloading your webpage you should see the map. Currently, there are no markers visible but you should be able to zoom and pan. 

5. **Draw a marker (in 	```updateVis()```)**

	At the position of the *SEC* at Harvard University:
	Latitude | Longitude
	-------- | ---------
	42.363230492629455 | -71.12731607927883
	*Preview:*

	![Leaflet - Marker](assets/cs171-leaflet-single-marker.png?raw=true "Leaflet - Marker")

6. **Draw a marker for each station of the Blue Bikes bike-sharing network (in ```updateVis()```)**

	*If the creation of the single marker worked, reuse the code for this step. You don't necessarily need the SEC marker anymore.*
	
	→ Loop through the dataset and append a marker for each station. Instead of fixed coordinates, use the individual latitude-longitude pairs of the stations to position the markers. Make sure, the map visualization stays as flexible as possible. For example, it should be easy to reuse the *StationMap* implementation for other bike-sharing networks.
	
	*It would also be a good opportunity to try the ```LayerGroup```.* You can create a new, empty LayerGroup in ```initVis()```, then in ```updateVis()``` you will need to clear the LayerGroup, and add all new elements to it.
	
	→ Bind a popup to each station marker that indicates the *station name* and *capacity*.

---

#### Circles, lines and polygons

Besides markers, you can easily add other things to your map, including circles, lines and polygons.

*Adding a circle is similar to drawing markers but you need a radius (units in meters) and you can specify some additional visual attributes:*

```javascript
let circle = L.circle([40.762188, -73.971606], 500, {
    color: 'red',
    fillColor: '#ddd',
    fillOpacity: 0.5
}).addTo(map);
```

This piece of code creates a circle, centered at the *Four Seasons New York* with a radius of 500 meters.

*Result:*

![Leaflet - Circle](assets/cs171-leaflet-map-2.png?raw=true "Leaflet - Circle")

If you want to draw a line, you can use the Leaflet class ```Polyline```. It follows the same concept. First you define the coordinates (in this case a list of latitude-longitude pairs) and then, optionally, you can define an object with visual attributes.

*Draw a polyline between three points:* 

```javascript
let polyline = L.polyline(
	[
		[40.711277, -74.003314],
		[40.699890, -73.988851],
		[40.696344, -73.988765]
	],
	{ 
		color: 'black',
		opacity: 0.6,
		weight: 8
	}
).addTo(map);
```

*Adding a polygon is as easy. You just need to specify the corner points as a list of latitude-longitude pairs:*

```javascript
let polygon = L.polygon(
	[
	    [40.728328, -74.002868],
	    [40.721937, -74.005443],
	    [40.718961, -74.001280],
	    [40.725287, -73.995916]
	],
	{ 
		color: "red",
		fillOpacity: 0.5,
		weight: 3
	}
).addTo(map);
```

*You can bind popups to these objects too:*

```javascript
polygon.bindPopup("SoHo, Manhattan");
```

![Leaflet - Layers](assets/cs171-leaflet-map-3.png?raw=true "Leaflet - Layers")


#### GeoJSON Layer

Leaflet has also built-in methods to support GeoJSON objects. You are already familiar with this special JSON format. 

GeoJSON support becomes very important if you want to draw complex shapes or many objects on a map.

*After loading the GeoJSON objects (usually external files) you can add them to the map through a GeoJSON layer:*

```javascript
L.geoJson(geojsonFeature).addTo(map);
```

Leaflet automatically detects the features and maps them to circles, lines, polygons etc on the map.

*In this example we have loaded a GeoJSON file with the five boroughs of New York City:*

![Leaflet - GeoJSON](assets/cs171-leaflet-geojson-1.png?raw=true "Leaflet - GeoJSON")

The library provides also a method to style individual features of the GeoJSON layer. You can assign a callback function to the option ```style``` which styles individual features based on their properties.

```javascript
let boroughs = L.geoJson(data, {
	style: styleBorough,
	weight: 5,
	fillOpacity: 0.7
}).addTo(map);

function styleBorough(feature) {
	console.log(feature);
}
```

*The output in the web console shows that the function ```styleBorough()``` is getting called for each borough (= GeoJSON feature):*

![Leaflet - GeoJSON Features](assets/cs171-leaflet-geojson-2.png?raw=true "Leaflet - GeoJSON Features")

That means, we can access the properties of each borough (e.g. ```boroName```) and style the shapes individually:

```javascript
function styleBorough(feature) {
  switch (feature.properties.BoroName) {
      case 'Staten Island': 	return { color: "#895f9f" };
      case 'Manhattan': 		return { color: "#71a552" };
      case 'Queens': 			return { color: "#ea8441" };
      case 'Brooklyn': 			return { color: "#fff560" };
      case 'Bronx': 			return { color: "#cb3f3c" };
  }
}
```

> **JavaScript Switch**
> 
> The switch expression is similar to an IF-ELSE statement. The value of the expression (e.g. borough name) is compared with the values of each case. If there is a match, the associated block of code is executed.
> 
> *Example with IF-statement:*
> 
> ```javascript
if(feature.properties.BoroName == 'Staten Island')
	return { color: "#895f9f" };
else if(feature.properties.BoroName == 'Manhattan')
	return { color: "#71a552" };
else if(feature.properties.BoroName == 'Queens')
	return { color: "#ea8441" };
else if(feature.properties.BoroName == 'Brooklyn')
	return { color: "#fff560" };
else
	return { color: "#cb3f3c" };
```
> The switch block is compact and much easier to read.

*After implementing the individual styles for the GeoJSON layer, the result looks like the following:*

![Leaflet - GeoJSON Result](cs171-leaflet-geojson-3.png?raw=true "Leaflet - GeoJSON Result")

If you want to add popups to each feature of a GeoJSON layer, you have to loop through them too. Leaflet provides the option ```onEachFeature``` that gets called on each feature before adding it to a GeoJSON layer:


```javascript
let boroughs = L.geoJson(data, {
	style: styleBorough,
	onEachFeature: onEachBorough
});

function onEachBorough(feature, layer) {
	layer.bindPopup(feature.properties.BoroName);
}
```

---

#### Activity III - Create a GeoJSON layer

1. **Check out the GeoJSON data** 

    The geoJSON data of the MBTA Lines is stored in the data folder in your 'Template' folder**

2. **Load the data and render the GeoJSON objects on your map**

	Here, feel free to make use of the `d3.json()` method.
	
	*Once your done with this task, you should see the MBTA subway lines on your map now.*

3. **Add styles to the GeoJSON layer**
	
	→ Access the properties of each feature (e.g. ```LINE```) and style the subway lines individually. Also play around with different parameters such as *weight* or *opacity*.
	
	*Instead of a switch/if-statement you can use the name of the lines (red, green, ...) directly for styling the features.*

---

#### Additional Information - Custom markers

This information is not needed for the lab but may help in your final projects.

In the following example we will show you how to assign custom icons to Leaflet markers.

The built-in styles of the marker class are rather sparse. There is only one marker style and you can't choose the color dynamically. In the event that you need different markers, which might happen in the future, you can either create your own images or use a Leaflet extension ([https://github.com/lvoogdt/Leaflet.awesome-markers](https://github.com/lvoogdt/Leaflet.awesome-markers)).

We continue with our NYC map and add a custom marker (with our own image) at the position of the Four Seasons Hotel.

A simple method for integrating custom icons is to modify the Leaflet images or to search for proper icons online. Make sure that the background of the images are transparent. 

![Leaflet - Custom Marker Icon](assets/cs171-marker-icons.png?raw=true "Leaflet - Custom Marker Icon")


*If we want to create several icons that have a lot in common, we can define our own icon class:*

```javascript
// Defining an icon class with general options
let LeafIcon = L.Icon.extend({
	options: {
		shadowUrl: 'img/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [0, -28]
    }
});
```

*Next, we can use this class to create individual icons:*

```javascript
let redMarker = new LeafIcon({ iconUrl:  'img/marker-icon-red.png' });
let blueMarker = new LeafIcon({ iconUrl:  'img/marker-icon-blue.png' });
```

*And finally we can use these icons for our markers:*

```javascript
let marker = L.marker([40.762188, -73.971606], { icon: redMarker }).addTo(map);
```

*Result:*

![Leaflet - Custom Marker](cs171-leaflet-custom-marker.png?raw=true "Leaflet - Custom Marker")

---


-----

#### Submission of lab (activity I, II, and III)

Please submit the code of your completed lab (the final map visualization you created in activities I-III) using 
the submission link in this week's module on Quercus. Upload a zipped folder with your implementation:

```
	/submission_week_11_lab_FirstnameLastname  
    lab/
        css/ 		
        js/ 
        index.html
```

-----

**Resources**

- Leaflet Quick-Start: [http://leafletjs.com/examples/quick-start.html](http://leafletjs.com/examples/quick-start.html)
- Leaflet Tile-Providers: [https://leaflet-extras.github.io/leaflet-providers/preview/](https://leaflet-extras.github.io/leaflet-providers/preview/)
- JavaScript Fetch API - [https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
  


