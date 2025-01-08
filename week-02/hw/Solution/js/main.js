
// DATASETS

// Global variable with 1198 pizza deliveries
//console.log(deliveryData);

// Global variable with 200 customer feedbacks
// console.log(feedbackData.length);


// FILTER DATA, THEN DISPLAY KEY FIGURES & BAR CHART

createVisualization();

function createVisualization() {

	// Get selected options
	let selectedOrderType = document.getElementById('select-order-type').value;
	let selectedArea = document.getElementById('select-area').value;

	// Filter deliveries based on selected 'area' and 'order type'
	let filteredDeliveryData = deliveryData.filter(delivery => {
		return (selectedOrderType === delivery.order_type || selectedOrderType === "all")
			&& (selectedArea === delivery.area || selectedArea === "all");
	});

	// Count Feedbacks that match the currently filtered deliveries
	let statsFeedbacks = 0;

	// Add the corresponding feedback messages to the deliveries
	filteredDeliveryData.forEach(delivery =>{
		feedbackData.forEach(feedback => {
			if(delivery.delivery_id === feedback.delivery_id){
				statsFeedbacks++;

				delivery["quality"] = feedback.quality;
				delivery["punctuality"] = feedback.punctuality;
				delivery["wrong_pizza"] = feedback.wrong_pizza;
			}
		});
	});


	// Update the number of feedbacks
	document.getElementById('stats-feedback-messages').innerText = statsFeedbacks


	// Update all the other key figures
	getKeyFigures(filteredDeliveryData);

	// Render the bar chart with the currently selected deliveries
	renderBarChart(filteredDeliveryData);
}


// EXTRACT KEY FIGURES FROM DELIVERIES AND CUSTOMER FEEDBACKS

function getKeyFigures(filteredDeliveryData) {

	// Initialize all key figures
	let statsDeliveries = filteredDeliveryData.length,
			statsPizzas = 0,
			statsTotalSales = 0,
			statsDeliveryTime = 0,
			statsLowQuality = 0,
			statsMediumQuality = 0,
			statsHighQuality = 0;

	// Loop through all deliveries and update the variables
	filteredDeliveryData.forEach(d => {
		statsPizzas += d.count;
		statsTotalSales += d.price;
		statsDeliveryTime += d.delivery_time;
		statsLowQuality += d.quality === "low" ? 1 : 0;
		statsMediumQuality += d.quality === "medium" ? 1 : 0;
		statsHighQuality += d.quality === "high" ? 1 : 0;
	});


	// Calculate the average delivery time (and round it to minutes)
	statsDeliveryTime = (statsDeliveryTime / filteredDeliveryData.length).toFixed(0);

	// Update the DOM tree with jQuery
	document.getElementById('stats-deliveries').innerText = statsDeliveries;
	document.getElementById('stats-pizzas').innerText = statsPizzas
	document.getElementById('stats-delivery-time').innerText = statsDeliveryTime + " min";
	document.getElementById('stats-total-sales').innerText = "$" + statsTotalSales.toFixed(2);
	document.getElementById('stats-low-quality').innerText = statsLowQuality;
	document.getElementById('stats-medium-quality').innerText = statsMediumQuality;
	document.getElementById('stats-high-quality').innerText = statsHighQuality;




	// BONUS

	let feedbackDataTable = filteredDeliveryData.filter(d =>{
		return d.quality;
	});
	document.querySelector("#feedback-table tbody").innerHTML = '';

	feedbackDataTable.forEach(function(d){
		document.querySelector("#feedback-table tbody").innerHTML += 
		('<tr>\
			<td>' + d.delivery_id + '</td>\
			<td>' + d.area + '</td>\
			<td>' + d.delivery_time + '</td>\
			<td>' + d.driver + '</td>\
			<td>' + d.count + '</td>\
			<td>' + d.punctuality + '</td>\
			<td>' + d.quality + '</td>\
			<td>' + d.wrong_pizza + '</td>\
		</tr>');
	});
}
