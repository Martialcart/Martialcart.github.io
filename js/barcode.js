function handleBarcodeInput() {
    const barcodeInput = document.querySelector("#barcodeInput");
    //console.log(barcodeInput.value);
    JsBarcode("#barcode", barcodeInput.value); 
}
