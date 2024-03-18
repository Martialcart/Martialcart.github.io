function load_frame() {
    make_header();
    generate_menubar();
}

function make_header() {
    const header = document.createElement("p");
    header.innerHTML = "Jan Olav Berg"
    document.getElementById("header").appendChild(header);
}

function generate_menubar() {
    add_menu_headline("Meg");
    add_menu_button("Hjem", "index.html");
    add_menu_button("CV", "cv.html");
    add_menu_headline("Kode");
    add_menu_button("BMI", "bmi.html");
    add_menu_button("ChadBot", "chatbot.html");
    // add_menu_button("Strømpriser", "power.html");
    add_menu_button("Touch", "touch.html");
    add_menu_button("Alkolator", "alko_pris.html");
    
}

function add_menu_button(name, link) {
    const button = document.createElement("button");
    button.innerHTML = name;
    button.classList.add("menu_button");
    button.addEventListener("click", function() {
        if(not_same_page(link)) window.open(link, "_self");
    });
    document.getElementById("menu").appendChild(button);
}

function add_menu_headline(title) {
    const headline = document.createElement("h1");
    headline.innerHTML = title;
    document.getElementById("menu").appendChild(headline);
}

function not_same_page(link) {
    let url = window.location.toString();
    let short_url = url.substring(url.length - link.length, url.length);

    return short_url !== link;
}