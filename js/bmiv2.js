const n_decimals = 2;
const bmi_low = 18;
const bmi_mid = 25;
const bmi_high = 30

/*connects gui and action*/
function handle_input() {
    let bmi_result = 0;
    const kg_inn = document.getElementById("weight_kg");
    const cm_inn = document.getElementById("height_cm");
    const r_bmi = document.getElementById("bmi");
    const r18 = document.getElementById("r18");
    const r25 = document.getElementById("r25");
    const r30 = document.getElementById("r30");
    r18.innerHTML = kg(bmi_low, to_m(cm_inn.value));
    r25.innerHTML = kg(bmi_mid, to_m(cm_inn.value));
    r30.innerHTML = kg(bmi_high, to_m(cm_inn.value));
    bmi_result = bmi(kg_inn.value, to_m(cm_inn.value));
    console.log(bmi_result);
    r_bmi.innerHTML = bmi_result;
    document.getElementById("bmi").style.marginLeft = bmi_screen_scale(bmi_result);
}

/*returns kg, from bmi and height*/
function kg(bmi, meter) {
    return (bmi * Math.pow(meter,2)).toFixed(n_decimals);
}

/*returns bmi, from weight and height*/
function bmi(kg, meter) {
    return (kg / Math.pow(meter, 2)).toFixed(n_decimals);
}

/*converts centimeters to meters*/
function to_m(cm) {
    return cm / 100;
}

/*returns the % of where the bmi result is placed on the screen*/
function bmi_screen_scale(bmi) {
    const scale = bmi_high - bmi_low;
    const range = bmi - bmi_low;
    let result = 0;

    if (bmi < bmi_low) result = "0%";
    else if (bmi < bmi_mid) result = (range / scale) * 65 + "%"; //number adjust for margin inconsistensies
    else if (bmi_high < bmi) result = "80%";
    else result = (range / scale) * 80 + "%"; //number adjust for margin inconsistensies
    
    return result;
}