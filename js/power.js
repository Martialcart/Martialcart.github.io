let prices_today = {};
let prices_tomorrow = {};
let prices = {};
let x_axis = [];
let myChart = {};
let from_date, to_date;
/*
power_support = (average_price_last_month - 70) * support_percantage

update mychart by finding path in console
mychart.update()

*/


let date_gen = new Date();

/** rewinds date by one day, if it's before 13:27.
 * power prices starts updating at 13:15
 * github pages takes up to 10 minutes to update
 * */
if (date_gen.getHours() < 14 | date_gen.getHours === 13 & date_gen.getMinutes < 27) {
    console.log("if was succesfull");
    date_gen.setDate(date_gen.getDate() - 1);
}
let date_today = "01-09-2022" //get_date(date_gen);
date_gen.setDate(date_gen.getDate() + 1);
let date_tomorrow = "02-09-2022"//get_date(date_gen);

/**translates date-object into string, and return a string in the format "16-03-2022" */
function get_date(date_obj) {
    return date_obj.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day:"2-digit"
    }).replaceAll('/', '-');
}

/** gets power prices from the dates "today" and "tomorrow" */
async function loadprices(from, to) {
    console.log(Date.parse(from));
}

/** gets power prices from the dates "today" and "tomorrow" */
async function loadprices() {
    prices_today = await get_power_price(date_today);
    prices_tomorrow = await get_power_price(date_tomorrow);
}
/**
 * @param {String} date format: dd-mm-yyy
 * @returns json{cityname : prices[]}
 */
async function get_power_price(date) {
    const response = await fetch("./json/power/" + date + ".json");
    if(response.ok) {
        console.log("responce is ok");
        const json = await response.json();
    return json;
    } else {
        return null;
    }
}


/**draws graph*/
async function draw(){
    await loadprices();
    let ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: x_axis,
            datasets: [
                city_set("Kristiansand", 'red'),                
                city_set("Oslo", 'orange'),
                city_set("Bergen", 'blue'),             
                city_set("Trondheim", 'green'),             
                city_set("Molde", 'yellow'),             
                city_set("Tromsø", 'purple')             
        ],  
        },
        options: {
            maintainAspectRatio: false
        }
        
    });
}

/** 
*name specifies city.
*color affect the city graph.
*returns a data subset for a city graph, formated for charts.js:
*-today and tomorrow prices are combined
*-shared settings are only specified once
*/
function city_set(name, color) {
    return {
        label: name,
        data: prices[name],
        borderColor: color,
        fill: false,
        steppedLine: true,
    }
}

function show_dates(from, to) {
    //can chart.js's data be edited threw assigned array?
    //yes! but need to use myChart.update() after
    //if so create a graph for each city with all their dates
    //how to seperate dates?
}