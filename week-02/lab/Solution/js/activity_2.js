// Activity 2.2: Initial Exploration - Log the entire attractions data to see what's inside
console.log(attractionData);

// Activity 2.3: Implement `forEach` to Display Names - Iterate over each attraction
// and log only those with visitors greater than 10 million
attractionData.forEach(attraction => {
    if(attraction.Visitors > 10000000){
        console.log(attraction.Location); // Log the location of attractions meeting the criteria
    }
});

// Activity 2.4: Filtering Data - Filter the attraction data to include only those
// attractions with more than 10 million visitors
let filteredData = attractionData.filter(attraction => {
    return attraction.Visitors > 10000000;
});

// Activity 2.6: Using `map` to Prevent Unintended Side Effects - Map over filteredData to create
// a shallow copy called filteredCopy. This step is crucial to avoid mutating the original
// filteredData array when sorting.
let filteredCopy = filteredData.map(attraction => ({ ...attraction }));

// Activity 2.5: Sorting the Filtered Data (before sorting) - Log the filtered data before sorting
// to observe its original order and to compare after sorting
console.log(filteredData);

// Activity 2.6: Sorting the Filtered Data - Sort the shallow copy of filtered attractions by
// descending visitor numbers
let sortedData = filteredCopy.sort((a, b) => {
    return b.Visitors - a.Visitors; // Sort from most to least visitors
});

// Activity 2.6: Sorting the Filtered Data (after sorting) - Log the sorted data to see the effect
// of the sort operation and to validate the sorting order
console.log(sortedData);
