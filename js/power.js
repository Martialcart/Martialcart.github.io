let prices_today = {};
let prices_tomorrow = {};
let date_today = "2022-06-15";
let date_tomorrow = "2022-06-16";

async function loadprices() {
    prices_today = await get_power_price(date_today);
    prices_tomorrow = await get_power_price(date_tomorrow);
}

async function get_power_price(date) {
    const response = await fetch("./json/power/" + date + ".json");
    const json = await response.json();
    return json;
}


async function draw(){
    await loadprices();
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
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
        }
    });
}

function city_set(name, color) {
    return {
        label: name,
        data: Array.prototype.concat(prices_today[name], prices_tomorrow[name]),
        borderColor: color,
        fill: false,
        steppedLine: true,
    }
}