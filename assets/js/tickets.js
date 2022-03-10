// remembering to require our bootstrap.js package so that our 
// dropdown menu will also work on each bundle
require("bootstrap");
// The function createEl() dynamically generates HTML elements 
// and attributes based on the inputs or arguments passed into it.
const createEl = require("./domMethods");

$(document).ready( function() { 
    const purchaseBtn = document.getElementById("purchaseBtn");
    const purchaseEmail = document.getElementById("purchaseEmail");
    const modalEl = document.querySelector(".modal-content");
    const modalBodyEl = document.querySelector(".modal-body");
    const modalFooterEl = document.querySelector(".modal-footer");


    function purchaseTicket () {

      modalEl.removeChild(modalBodyEl)
      modalEl.removeChild(modalFooterEl)

      modalEl.append(createEl("div", {class: "modal-body"},
        createEl("h5", {class: "modal-title"}, 
        `Thanks for requesting a ticket purchase! We will send an email to ${purchaseEmail.value} to complete the order form!`
        ),
      ))
      
    }
    purchaseBtn.addEventListener("click", purchaseTicket);
});

    
