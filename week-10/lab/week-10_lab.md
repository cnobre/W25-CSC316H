<!---
layout: labold
exclude: true
--->


&nbsp;

# Week 9 Lab

### Pre-Reading Quiz
On Quercus!

### Learning Objectives

- Know how to create custom visualizations with D3
	- Set up a completely new project without templates
	- Consolidate the official documentation and external materials
	- Apply the learned web development skills and your deep understanding of D3 to realize your own ideas and to
	implement unique visualizations (apart from bar and area charts)


***Important Note:***
In this lab we want to guide you through creating a highly customized visualization in D3, without using typical building blocks like bar charts or line charts. That means that in this lab you will have to deal not just with writing correct D3 syntax, but also with figuring out *in what way* you can implement a certain feature.

We give you pointers, but part of this lab is figuring these things out on your own. Do not hesitate to ask for help if you are stuck!


## Visualization Goal: Padgett's Florentines Families

In this problem set you will work primarily with network data. The data sources about marriage and business ties among Renaissance Florentine families were originally collected by Padgett [1] and then made available to the public.
  The dataset includes important families that were involved in a struggle for political control in Florence around 1430. With the collected data, researchers can analyze the influence of individual families and, in addition, can get a better understanding of the impact of these different kinds of relationships.

Each network consists of 16 families of the city of Florence in the early 15th century. In the graph, a family is represented as a node and marriages or business ties are the relations (edges) between these nodes. All the relations we consider are non-directional (symmetrical).



[1] Padgett, J.F. (1994): Marriage and Elite Structure in Renaissance Florence, 1282-1500. ([http://home.uchicago.edu/~jpadgett/papers/unpublished/maelite.pdf](http://home.uchicago.edu/~jpadgett/papers/unpublished/maelite.pdf))



### Data

Network data is made up of two main components: the structure of the graph itself (topology) and attributes of the nodes and edges. The topology of the graph is captured via its edges, which connect the nodes in the network.  
Storing the topology is usually done in one of two ways: a matrix or an edgelist.  
Storing attributes/metadata for the nodes cannot be stored in a matrix nor an edgelist. This must be stored in a separate csv file.  
Storing attributes/metadata for the edges can only be stored in an edgelist, and not in a matrix.

- Edgelist: This is a simple way to represent a network as a basic list (e.g. csv file). Each row contains 2 IDs, each ID representing 1 node/vertex that link to each other via an edge. If edges have weights/magnitude, you can add a third column with the individual values. With this format, you can add more metadata for each edge, simply by adding a new column for each edge attribute. Alternatively, you can add the edge attributes in a separate csv file.

- Adjacency matrix: If a graph has *n* vertices we can store the data in an n × n matrix. Data stored in this format is in many cases very convenient for the further processing in JS and D3. For example, we can query it easily with ```graph[i][j]```. The disadvantage of matrices is that they use a lot of space to represent only a few edges.

For this lab, the structure of the network is stored in two adjacency matrices (one containing edges for marriages, another for business ties), while the attributes are stored in an external csv file:

1. Dataset: Meta data **[```florentine-family-attributes.csv```](florentine-family-attributes.csv)**

	- Family
	- Wealth (each family's net wealth in thousands of lira; in 1427)
	- Priorates (seats on the civic council)

	```csv
	"Family","Wealth","Priorates"
	"Acciaiuoli",10,53
	"Albizzi",36,65
	"Barbadori",55,NA
	"Bischeri",44,12
	...
	```

	*You will use the above dataset as a meta information for the networks. The family in the first row in the above dataset corresponds to the family in the first row and column of the adjacency matrices. The family in second row corresponds to the second row/column of the adjacency matrix, etc.*

2. Adjacency matrix: **Marriages**
<a name="adjacency_matrices"></a>
```
let dataMarriages = [
	[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
	[0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0],
	[0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0],
	[0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0],
	[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,1],
	[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
	[1,1,1,0,0,0,0,0,0,0,0,0,1,1,0,1],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
	[0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1],
	[0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
	[0,0,0,1,1,0,0,0,0,0,1,0,1,0,0,0],
	[0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0]
];
```


3. Adjacency matrix: **Business Ties**

```
let dataBusiness = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,1,1,0,0,1,0,1,0,0,0,0,0],
	[0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0],
	[0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,0],
	[0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0],
	[0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0],
	[0,0,0,1,1,0,1,0,0,0,1,0,0,0,0,0],
	[0,0,1,0,0,1,0,0,0,1,0,0,0,1,0,1],
	[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
	[0,0,1,1,1,0,0,1,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]
];
```


[//]: # (Source: [http://svitsrv25.epfl.ch/R-doc/library/ergm/html/flomarriage.html](http://svitsrv25.epfl.ch/R-doc/library/ergm/html/flomarriage.html)


## Network Visualization

Networks can be visualized in several different ways, the two most common of which are node-link diagrams and adjacency matrices. Notices that the term `adjacency matrix` can refer to both the data structure that stores the graph, as described in the Data section above, and the visualization approach (which you will be implementing in this lab).

Node-link diagrams are the most common way of visualizing graphs, but they have a few key limitations:  
(1) they do not scale well to large networks,  
(2) they can quickly become cluttered for dense networks with several edge crossings (where edges start crossing over each other),  
(3) they are limited in the amount of attributes that can be encoded for the nodes and particuarly edges.

Adjacency Matrices are an alternative visualization approach for networks that address some of these limitations. They are particuarly well suited for dense graphs since every possible edge in a network is allotted a cell in the matrix, ensuring that there are no edge crossings. Additionally, they are well suited for encoding edge attributes directly in the matrix cell.

[You can read all about visualizing multivariate networks here!](https://vdl.sci.utah.edu/publications/2019_eurovis_mvn/)

## Implementation

In contrast to all our previous labs we won't give you a step-by-step instruction or template today. By working through the different examples of all previous labs and homeworks, you have constantly developed and improved your JS & D3 skillset. You now have all the knowledge and experience that is needed to solve this task *independently*. Therefore, we will just give you a description what we expect as a result. A few additional hints should help you to overcome certain hurdles.


#### Preview & Problem Description

In this lab you will build a custom visualization with D3 that will look like this one:

![Lab 8 - Preview](cs171-lab8-preview.gif?raw=true "Lab 8 - Preview")


Matrix visualizations are especially appropriate for dense networks, i.e. those that have many edges connecting the nodes in the network. This is because every edge is given its own cell in the matrix, and there is never any occlusion/overlap of edges, as is common in a node-link representation.

In the sortable matrix visualization you will be implementing in this lab, you will encode two types of edges simultaneously in the matrix cells.

*Implementation checklist:*

- Create a matrix visualization that visualizes the relations between these 16 families
- Merge the datasets and label the rows and columns with the corresponding family names
- Draw two triangles in each cell to encode both relationships (marriages and business ties)
- Make the matrix sortable (by rows is required, by columns is optional)
- Include animated transitions to make it easier to follow changes
- Add a legend to explain the types of relationships

We give you some more pointers and hints below, however, we encourage you to try to work through this as independently as possible. Only use the extra hints (specially marked) if you do not know how to get started on a certain task!

*We suggest that you go through the following four iterations:*

![Lab 8 - Iterations](cs171-lab8-iterations.png?raw=true "Lab 8 - Iterations")

---

#### Get started

1) Set up a new D3 project (HTML, CSS, JS files). You should already have a template project that you can reuse for that. Create a matrix class (similar to previous homeworks), with a constructor, initVis(), wrangleData() and updateVis() functions.  

2) Please download the CSV file: [florentine-family-attributes.csv](florentine-family-attributes.csv)

3) The adjacency matrices are only available in the raw text format [shown above](#adjacency_matrices). Copy the matrices and integrate them into your code so that you can easily access each element with ```matrix[i][j]```.

4) Sanity check: Print the data of all 3 files with ```console.log()``` to make sure that the data is correct. (You should always check for errors before you continue to the next step in a project.)

5) When creating an instance of your Matrix class, make sure and pass in all the necessary data to the constructor (graph edges for family, graph edges for business, and graph attributes).


{::options parse_block_html="true" /}

<details>
<summary>
***Extra hint*** (click me only if you are stuck!)
</summary>


1. D3 project template: [d3\_project_template.zip](d3_project_template.zip)

2. Adjacency matrices: There are two different strategies to handle this data:

	- a) Create one csv file per adjacency matrix, read in the files, and convert each matrix into a JS variable (a 2D array). This is the cleanest solution, and allows you to easily use different matrices.
	- b) This is the quick and dirty solution, which is sufficient if you are sure that the data will never really change. You can store the matrices directly as JS variables in your JS file. Just initialize a 2D array directly with the values listed above.

</details>

{::options parse_block_html="false" /}

---

#### Data wrangling

A good approach for wrangling the given datasets would be to process and merge all three datasets (in ```wrangleData()```). You can create a new JS object for each family with the surname and sub-arrays for marriages and business ties. This structure will also help you later to efficiently sort the dataset, because you can add additional attributes, such as the number of business ties for each family.

*Example structure:*

```javascript
let data = [
	{
		...
	},
	{
		"index": 8,
		"name": "Medici",
		"allRelations": 11,
		"businessTies": 5,
		"businessValues": [0,0,1,0,0,1,0,0,0,1,0,0,0,1,0,1],
		"marriages": 6,
		"marriageValues": [1,1,1,0,0,0,0,0,0,0,0,0,1,1,0,1],
		"numberPriorates": 53,
		"wealth": 103
	},
	{
		"index": 9,
		"name": "Pazzi",
		...
	}
];
```

1) Create a JS object for each family, containing all the attributes listed in the example code above

2) Add each family object to an array containing all families.

***Free hint:*** In many projects you can make your life a lot easier by making sure that you have converted the data into a format that is ideal for your further processing/visualization tasks. Especially for smaller datasets it often pays of to create a different datastructure that allows you to easily access all of it.

{::options parse_block_html="true" /}

<details>
<summary>
***Extra hint*** (click me only if you are stuck)
</summary>


1. Create an empty array ```displayData``` in ```initVis```
2. In ```wrangleData``` you can use a ```forEach``` loop to go over all families (this can be either the marriage or the business matrix, since both contain one row per family). The important thing is that you are looping over all families.

3. Inside the loop create a ```let family = {...``` and add all attributes you want to store to it. This will include information from both marriage and business matrices, as well as the attributes data.

4. Inside the loop, add that object to your ```displayData``` array.

</details>

{::options parse_block_html="false" /}

---



#### Create a matrix visualization with D3

D3 is an extremely flexible library, thus, there are multiple ways to draw matrix visualizations / heatmaps. Here is the recommended approach for this lab:

1) Use the enter/update/exit approach to create one row `g` element per family object (vis.displayData should contain an array of family objects created in wrangleData()). Let's call this selection `rows`.  Make sure to give the groups a class name like `matrix-row`.

2) transform the row groups vertically as a function of the index of each row in the array and vis.cellHeight + vis.cellPadding (defined in initiVis())

3) Use the `rows` selection to append a text label for each one that contains the family name (d.name in your family data object).

```
	rows.append("text")
	.attr('x',...)
	.text(d=>d.name)

```

4) Perform a second enter/update/exit selection, (this time starting with the `rows` selection so that it will be applied to each row individually) to create rectangles/triangles for each marriage/business or combination of both (depending on which stage of the lab you are at).

For this step, you do not need to pass in the raw data again, but can instead leverage the data that is already bound to each `row` element as such:

```
	let edgeCells = rows.selectAll(".matrix-cell-marriage")
			.data(d=>d.marriageValues)
			.enter()
			.append...

```

Notice that what is happening here is that we are using the array `marriageValues` that is in each row object, to create one edge cell per element in that array. What you append here depends on which stage of the lab you are at, and will start as rects, and end up as triangle paths.

If you are drawing triangles, you will repeat the step above, once with d.marriageValues as the data element, and once with d.businessValues.  Don't forget to color them according to the type of edge (marriage/business)

5) The last step is adding in the column labels. Since these are the same labels (Family name) as the rows, you can simply do an enter/update/exit pattern to create text elements, passing in vis.displayData as the data(). Remember to position each text label with its index in the array and by using vis.cellWidth and vis.cellPadding.

Check that your visualization roughly looks like the picture 1 shown above.

***Free hint:*** Try to always split your approach into smaller tasks that you can tackle one after the other. For example, first make sure you can draw rows. You could start with just drawing a text label per row, just for debugging. Once that works, work on drawing something for each element. Once that works, work on drawing the actual visual element (colored triangle) for that data.

{::options parse_block_html="true" /}

<details>
<summary>
***Extra hint*** (click me only if you are stuck)
</summary>


1. Create a ```matrix.js``` file for your matrix visualization. Init it after you have finished loading in the data in ```main.js```
2. In ```initVis()``` you should set your margins, SVG drawing area, and other init values you might need, and call ```wrangleData()```.

3. In ```updateVis()```: Draw the matrix rows: assign a class (e.g. ```.matrix-row```), append a svg group element per row, translate its height, and append a text field (basically the y-axis label of that row). You should now see a column of labels showing numbers from 0 - 15.
4. In ```updateVis()```: Draw all matrix elements: Assign classes (e.g., matrix-cell, matrix-cell-marriage), draw a small rectangle, and set its color depending on the data properties (matrix value 0 or 1)
5. Draw x-axis labels: Append text for each column. Remember that the numbers of columns and rows is equal! Translate the labels to their correct position.


</details>

{::options parse_block_html="false" /}

---


#### Draw triangles in D3

In the preview and the problem description we have introduced the idea of encoding two relations in one single cell. Instead of drawing one rectangle we can stack two triangles on top of each other. As a result users can see at first glance which families have multiple relationships and other further details.

![Lab 8 - Triangles](cs171-lab8-triangles.png?raw=true "Lab 8 - Triangle Example")

In SVG you can create lines, circles, rectangles etc, but not directly triangles. Therefore, you have to use the *path* element. You have used SVG's path already, but most likely always in combination with the D3 path generator. Now, you have to specify the path manually.

The path information is specified within the ```d``` attribute:

```javascript
<svg height="250" width="300">
    <path d="M150 5 L75 200 L225 200 Z" fill="blue" />
</svg>
```

- ```M```: translates to "move to" and specifies the starting point (x/y coordinate)
- ```L```: translates to "line to" and draws a line from the current point to the following coordinates
- ```Z```: translates to "close path". It closes the triangle path by connecting the last point with our initial point.

There are more commands but for our use case the above mentioned options are sufficient. *Important: uppercase commands indicate absolute coordinates and their lowercase counterparts indicate a coordinate relative to the previous coordinate.*

![Lab 8 - TrianglePath](cs171-lab8-triangle-path.png?raw=true "Lab 8 - Triangle Path")

*Example code snippet for the upper triangle (#1):*

```javascript
let cellHeight = 20, cellWidth = 20, cellPadding = 10;

// D3's enter, update, exit pattern
let trianglePath = row.selectAll(".triangle-path")
	.data(data);

trianglePath.enter().append("path")
	.attr("class", "triangle-path");

trianglePath.attr("d", function(d, index) {
	// Shift the triangles on the x-axis (columns)
	let x = (cellWidth + cellPadding) * index;

	// All triangles of the same row have the same y-coordinates
	// Vertical shifting is already done by transforming the group elements
	let y = 0;

	return 'M ' + x +' '+ y + ' l ' + cellWidth + ' 0 l 0 ' + cellHeight + ' z';
});
```

1) Change your code so that you draw two triangles instead of the previous rectangle. One triangle represents the marriage information, the other one the business information.

---

#### Sortable matrix and legend

By now you have implemented your custom matrix visualization, including triangles. Next, you will improve it with a basic sorting function.
<a name="sorting_options"></a>
The user should be able to sort the rows by

- Number of business ties
- Number of marriages
- Number of all relationships
- Wealth
- Number of seats hold in the civic council (priorates)

By default the families should be ordered by their surname.

As already mentioned above, it is very helpful if you merge the datasets and create a JS object for each family. That gives you the possibility to calculate the statistics (e.g. count all business ties for each family) in advance.

Integrate a select-box with the sorting options and react to change events. If you have implemented D3's *enter, update, exit* pattern you can call the ```updateVis()``` function, sort the families and update the visual elements.

Include animated transitions that make it easier to follow when the sorting of the data is being updated. When the user sorts the data, a particular data point (family in our case) can be tracked visually through the transition. This concept is called *object constancy* and you can adopt it by specifying a **key function**. You have already learned how to implement it:

```javascript
let row = svg.selectAll(".row")
	.data(data, function(d){ return d.name; });
```

![Lab 8 - Transition](cs171-lab8-transition.gif?raw=true "Lab 8 - Transition")

*(Notice: we made the transition particularly slow for demonstration purposes)*

You can also change the ```fill-opacity``` during the transition for a cleaner animation.

1) Add a select-box to your html file that allows users to select the sorting order. Add all the sorting [options](#sorting_options) listed above.

2) Implement a callback function for the select-box to update the visualization.

3) Extend ```updateVis``` to support for sorting. Remember, you only want to sort the rows in your matrix view!

4) Add animated transitions.

5) Add a legend to explain the two different types of family ties being shown.


{::options parse_block_html="true" /}

<details>
<summary>
***Extra hint*** (click me only if you are stuck!)
</summary>


1. In your select-box callback function, make sure to execute ```updateVis()``` and to also pass the value of the selected sorting order as a function parameter.

2. In ```updateVis()``` first sort your ```displayData``` array based on the selected sorting order. Print the result to the console to verify the sorting!

3. Specify a key function, based on the family's name, to support animated transitions.

4. Make sure you follow the *enter, update, exit* pattern.


</details>

{::options parse_block_html="false" /}

---

#### Bonus Activity 1 - Flexible layout

You have probably used hard-coded values for all size specifications in your view. Adapt your matrix implementation so that it is possible to define an SVG area (width and height), such that the sizes of all other elements and the spacing between them will be calculated automatically.

---

#### Bonus Activity 2 - Highlight cells on *mouseover*

Listen to mouse events: If the user hovers over a cell highlight all elements that are in the same row or in the same column of the matrix.

*Preview:*

![Lab 8 - Mouseover](cs171-lab8-mouseover.gif?raw=true "Lab 8 - Mouse Over")


-----

#### Submission of lab

Congratulations, you have now completed Lab 10!

Please submit the code of your completed lab (the sortable matrix visualization and optionally the bonus activities) on Quercus.

-----

**Resources**

- Custom visualizations with D3: [http://jsdatav.is/chap07.html#creating-a-unique-visualization](http://jsdatav.is/chap07.html#creating-a-unique-visualization)
- D3 object constancy: [https://bost.ocks.org/mike/constancy/](https://bost.ocks.org/mike/constancy/)
- Padgett Florentines Families: [http://home.uchicago.edu/~jpadgett/papers/unpublished/maelite.pdf](http://home.uchicago.edu/~jpadgett/papers/unpublished/maelite.pdf)
<!-- DEAD LINK AS OF 10/23/2020
- SVG for beginners: [http://unicorn-ui.com/blog/svg-for-beginners.html](http://unicorn-ui.com/blog/svg-for-beginners.html)
)
-->
