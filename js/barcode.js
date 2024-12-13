const barcodeInput = document.querySelector("#barcodeInput");

barcodeInput.addEventListener("click", function() {
    console.log("hello world!");
    JsBarcode("#barcode", "Hi!");
});

