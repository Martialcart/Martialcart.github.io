const barcodeInput = document.querySelector("#barcodeInput");
const barcodeItemDefault = document.querySelector("#barcodeItem");
const barcodeContainer = document.querySelector("#barcodeContainer");

let barcodeIdNumbder = 0;

barcodeInput.addEventListener("input", function() {
    JsBarcode("#barcode", this.value); 
});

document.addEventListener("keypress", function(e) {
    if(e.key === "Enter") {
	//clone from first barcodeItem
	const newBarcodeItem = barcodeItemDefault.cloneNode("true");
	
	//newbarcodeinput is used more than once
	const barInput = newBarcodeItem.querySelector("input");

	//make all id's unique
	newBarcodeItem.id += barcodeIdNumbder++;
	barInput.value = "";
	newBarcodeItem.querySelectorAll('*[id]').forEach((i) => {
	    i.id = i.id + barcodeIdNumbder;
	});

	//give new barcodeItem an evenlistener for input
	barInput.addEventListener("input", function() {
	    const newBarcodeId = "#barcode" + newBarcodeId;
 	    console.log(newBarcodeId + "newBarcodeId");
	    JsBarcode(newBarcodeId, this.value); 
	});

	//add newBarcodeItem to barcodeContainer
	barcodeContainer.appendChild(newBarcodeItem);
    }
});
