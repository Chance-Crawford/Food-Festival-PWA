// remembering to require our bootstrap.js package so that our 
// dropdown menu will also work on each bundle
require("bootstrap");
// The function createEl() dynamically generates HTML elements 
// and attributes based on the inputs or arguments passed into it.
const createEl = require("./domMethods");

const createLoremIpsum = require("./helpers");

// when the page is active and needs to load javascript
$(document).ready( function() {
    const currentEvent = JSON.parse(localStorage.getItem("currentEvent")) || {
        title: "Title Placeholder",
        subtitle: "",
        description: ""
    };

    const pageEl = document.querySelector("#page");

    const containerEl = createEl("div", {class: "container"},
        createEl("div", {class: "card mb-3"}, 
        createEl("img", {class: "card-img-top", style: "width: 5px", src: currentEvent.image || "https://via.placeholder.com/350x150"}),
        createEl("div", {class: "card-body"}, 
            createEl("h1", {class: "card-title"}, currentEvent.title || ""),
            createEl("h2", {class: "text-muted"}, currentEvent.subtitle || ""),
            createEl("p", {class: "card-text mt-3"}, currentEvent.description || createLoremIpsum(100)),
            createEl("a", {class: "btn btn-primary", href: "tickets.html"}, "Buy Tickets")
        )
        ),
        
    )
    pageEl.appendChild(containerEl)
});
    
