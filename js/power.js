let prices_today = {};
let prices_tomorrow = {};
let myChart = {};
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
let date_today = get_date(date_gen);
date_gen.setDate(date_gen.getDate() + 1);
let date_tomorrow = get_date(date_gen);

/**translates date-object into string, and return a string in the format "16-03-2022" */
function get_date(date_obj) {
    return date_obj.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day:"2-digit"
    }).replaceAll('/', '-');
}

/** gets power prices from the dates "today" and "tomorrow" */
async function loadprices() {
    prices_today = await get_power_price(date_today);
    prices_tomorrow = await get_power_price(date_tomorrow);
}

/** returns a json with power prices by city, from given date*/
async function get_power_price(date) {
    const response = await fetch("./json/power/" + date + ".json");
    const json = await response.json();
    return json;
}

/**draws graph*/
async function draw(){
    await loadprices();
    let ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [date_today + ' 00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
                    date_tomorrow + ' 00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
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
        data: Array.prototype.concat(prices_today[name], prices_tomorrow[name]),
        borderColor: color,
        fill: false,
        steppedLine: true,
    }
}