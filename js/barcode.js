const barcodeInput = document.querySelector("#barcodeInput");
const barcodeItemDefault = document.querySelector("#barcodeItem").cloneNode(true);
const barcodeContainer = document.querySelector("#barcodeContainer");

let barcodeIdNumber = 0;

barcodeInput.addEventListener("keyup", (e) => barcodeInputHandler(e));

function barcodeInputHandler(e) {
    switch(e.key) {
	case 'Enter': createBarcodeItem(); break;
	default: writeBarcode(e); 
    }
}

function createBarcodeItem() {
    barcodeIdNumber++;

    const tempBarcodeItem = barcodeItemDefault.cloneNode("true");//store clone of default
    const barInput = tempBarcodeItem.querySelector("input");
    
    //set unique id's
    tempBarcodeItem.id += barcodeIdNumber;
    barInput.id += barcodeIdNumber;
    tempBarcodeItem.querySelector("canvas").id += barcodeIdNumber;

    //attach eventlistener to input
    barInput.addEventListener("keyup",(e) => barcodeInputHandler(e)); 
    
    barcodeContainer.appendChild(tempBarcodeItem);
}

function writeBarcode(e) {
    const input = e.srcElement;
    if(input.value !== "") {
	const id = e.srcElement.parentNode.querySelector("canvas").id;
	console.log(id);
	JsBarcode(("#" + id), input.value); 
    }
}


