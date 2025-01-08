# Reading - Week 11 Lab

Due to our limited time frame and the extensive example for the next lab - which is necessary to get a better understanding of system design and event handling - we would like you to get an overview of the upcoming topic and the dataset in advance.


## United Nations - My World 2015

In lab 10 you will use data from the United Nations [MY World 2015](http://www.myworld2015.org/) vote project. MY World is a global survey commissioned by the UN Millenium Project. It aims to capture people's opinions, priorities, and views on major issues, so that global leaders can be informed as they begin the process of defining the new development agenda for the world. Individuals are asked which six of sixteen possible issues they think would make the most difference to their lives. The sixteen issues are based on the priorities expressed by poor people in previous research and polling exercises. They cover the existing Millennium Development Goals and add issues of sustainability, security, governance and transparency. The data is collected using the [MY World webpage](http://www.myworld2015.org/), text messages, and printed surveys.

You will build a system that allows interactive selection of time slices of the poll data.


### Data

The original MY World data is described at [http://dataset.myworld2015.org](http://dataset.myworld2015.org). Please read the description carefully and get acquainted with the original data fields.

We have already aggregated and transformed the original data to make the data format a better fit to the tasks we want to perform.


1. **Dataset:** ```perDayData.json```

	- All data is aggregated **per day** (```day```) for all days in 2012 and 2013.
	- The count of all votes on this day are stored in the field ```count(*)```
	- The counts of all votes for priority 1 (```sum(p0)```) to 		priority 16 (```sum(p15)```) are accessible by the field names given in brackets.
	- The daily sum of votes for different education levels of participants are stored in the array ```education```. Each object in this array represents one education level (field ```education```) and it's respective count (field ```count(*)```)
	- Equivalent to education levels, counts for each year of age are stored in the array ```age```.


	```javascript
	{
        "day": "2014-05-27",    // date in format: "YYYY-MM-DD"
        "count(*)": 1764,       // number of all votes for this day
        "sum(p0)": 91,          // number of votes for issues given Priority 1
        "sum(p1)": 185,         // number of votes for issues given Priority 2
        "sum(p2)": 171,
          ...
        "sum(p15)": 535,        // count of votes for issues given Priority 16
        "education": [          // counts for different education level
            {
                "education": 1,     // education level 1 (some primary) has..
                "count(*)": 33      // .. a count of 33
            },
            ...
            {
                "education": 4,     // education level 4 (finished secondary) has..
                "count(*)": 1013    // .. a count of 1013
            }
        ],
        "age": [                // counts for ages of participants
            {
                "age": 2,           // --> age 2 has..
                "count(*)": 3       // .. a count of 3 -- mhh ??
            },
            {
                "age": 3,           // --> age 3 has..
                "count(*)": 1       // .. a count of 1 -- really ??
            },
            ...
            ]
}
	```

	&nbsp;

2. **Dataset:** ```myWorldFields.json```

	The second file contains meta-information about our data. For now, we are interested in the "priorities" object which gives us informations for each priority. Again, the priorities are numbered from 0 (priority 1) to 15 (priority 16). You can easily access information for priority 6 via priority["5"].

	*Sample:*
	
	```javascript
	"priorities":{
      "15": {
        "item-color": "#E8168B",
        "item-title": "Better job opportunities",
        "item-content": "This means that governments ..."
      },
      "5": {
        "item-color": "#47C0BE",
        "item-title": "A good education",
        "item-content": "This means that all children should have ..."
      },
      ...
 	}
 	```
 	
 	The following information is given for each priority:

	- The color of the priority on the survey webpage (```item-color```).
	- A short name for the priority (```item-title```).
	- A longer description of the priority (```item-content```).
