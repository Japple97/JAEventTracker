var events = [{
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 240000,
    date: "06/01/2017",
},
{
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 250000,
    date: "06/01/2018",
},
{
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 257000,
    date: "06/01/2019",
},
{
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 130000,
    date: "06/01/2017",
},
{
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 140000,
    date: "06/01/2018",
},
{
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 150000,
    date: "06/01/2019",
},
{
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 40000,
    date: "06/01/2017",
},
{
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 45000,
    date: "06/01/2018",
},
{
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 50000,
    date: "06/01/2019",
},
];

function buildDropDown() {
    //get the dropdown menu from the page
    let dropdownMenu = document.getElementById('eventDropDown');
    // empty the innetHTML to ensure its clean
    dropdownMenu.innerHTML = '';

    //get our events
    let currEvents = events;

    //put out JUST the city names
    let eventCities = currEvents.map((event) => event.city);
    //filter the cities to only DISTINCT city names
    let disctinctCities = [...new Set(eventCities)];

    //get the template from the page
    const template = document.getElementById('dropdownItemTemplate');

    //copy the template
    let dropdownTemplateNode = document.importNode(template.content, true);

    //get the <a> tag from the template copy
    let menuItem = dropdownTemplateNode.querySelector('a');

    //change the text
    menuItem.textContent = 'All Cities';
    menuItem.setAttribute('data-string', "All");

    //add item to the page
    dropdownMenu.appendChild(dropdownTemplateNode);

    for (let index = 0; index < disctinctCities.length; index++) {
        let cityMenuItem = document.importNode(template.content, true);
        let cityButton = cityMenuItem.querySelector('a');

        cityButton.textContent = disctinctCities[index];
        cityButton.setAttribute("data-string", disctinctCities[index]);

        dropdownMenu.appendChild(cityMenuItem);
    }
    displayStats(currEvents);
    displayEventData(currEvents);
}

function displayStats(eventsArray) {
    let stats = calculateStats(eventsArray);

    //Do some math

    document.getElementById('total').textContent = stats.total.toLocaleString();
    document.getElementById('average').textContent = stats.averageAttendance.toLocaleString(
        "en-US", {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
    }
    );
    document.getElementById('most').textContent = stats.mostAttended.toLocaleString();
    document.getElementById('least').textContent = stats.leastAttended.toLocaleString();

}

function calculateTotal(eventsArray) {
    let sum = 0;

    for (let index = 0; index < eventsArray.length; index++) {
        let currentEvent = eventsArray[index];
        sum = sum + currentEvent.attendance;
    }

    return sum;

}

function calculateAverage(eventsArray) {
    let total = calculateTotal(eventsArray);
    let average = total / eventsArray.length;
    return average;
}

function calculateMostAttended(eventsArray) {
    let max = eventsArray[0].attendance;

    for (let index = 0; index < eventsArray.length; index++) {
        let currentEvent = eventsArray[index];
        if (currentEvent.attendance > max) {
            max = currentEvent.attendance;
        }
    }
    return max;
}

function calculateLeastAttended(eventsArray) {
    let min = eventsArray[0].attendance;

    for (let index = 0; index < eventsArray.length; index++) {
        let currentEvent = eventsArray[index];
        if (currentEvent.attendance < min) {
            min = currentEvent.attendance;
        }
    }
    return min;
}

function calculateStats(eventsArray) {
    sum = 0;
    average = 0;
    let max = eventsArray[0].attendance;
    let min = eventsArray[0].attendance;

    for (let index = 0; index < eventsArray.length; index++) {
        let currentEvent = eventsArray[index];

        sum = sum + currentEvent.attendance;
        if (currentEvent.attendance > max) {
            max = currentEvent.attendance;
        }
        if (currentEvent.attendance < min) {
            min = currentEvent.attendance;
        }

    }
    average = sum / eventsArray.length;

    let stats = {
        total: sum,
        averageAttendance: average,
        leastAttended: min,
        mostAttended: max
    }
    return stats;
}

function displayEventData(eventsArray) {
    let tableBody = document.getElementById('eventTableBody');
    const tableRowTemplate = document.getElementById('eventTableRowTemplate');

    tableBody.innerHTML = '';

    for (let i = 0; i < eventsArray.length; i++) {
        let eventRow = document.importNode(tableRowTemplate.content, true);
        let currentEvent = eventsArray[i];

        let tableCells = eventRow.querySelectorAll('td');

        tableCells[0].textContent = currentEvent.event;
        tableCells[1].textContent = currentEvent.city;
        tableCells[2].textContent = currentEvent.state;
        tableCells[3].textContent = currentEvent.attendance;
        tableCells[4].textContent = currentEvent.date;

        tableBody.appendChild(eventRow);
    }
}