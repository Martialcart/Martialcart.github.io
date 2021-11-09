const n_decimals = 2;

/*connects gui and action*/
function handle_input() {
    let bmi_result = 0;
    const kg_inn = document.getElementById("weight_kg");
    const cm_inn = document.getElementById("height_cm");
    const r_bmi = document.getElementById("bmi");
    const r18 = document.getElementById("r18");
    const r25 = document.getElementById("r25");
    const r30 = document.getElementById("r30");
    r18.innerHTML = kg(18, to_m(cm_inn.value));
    r25.innerHTML = kg(25, to_m(cm_inn.value));
    r30.innerHTML = kg(30, to_m(cm_inn.value));
    bmi_result = bmi(kg_inn.value, to_m(cm_inn.value));
    console.log(bmi_result);
    r_bmi.innerHTML = bmi_result;
    document.getElementById("bmi").style.marginLeft = relative_dist(30, bmi_result);
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

/*percantage of screen*/
function relative_dist(scale, dist) {
    return (10 + (dist / scale) * 80) + "%";
}