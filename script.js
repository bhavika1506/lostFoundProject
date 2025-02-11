document.addEventListener("DOMContentLoaded", loadItems);

function reportLostItem() {
    let itemName = document.getElementById("itemName").value;
    let itemDescription = document.getElementById("itemDescription").value;
    let contactInfo = document.getElementById("contactInfo").value;

    if (itemName && itemDescription && contactInfo) {
        let lostItems = JSON.parse(localStorage.getItem("lostItems")) || [];
        lostItems.push({ itemName, itemDescription, contactInfo });
        localStorage.setItem("lostItems", JSON.stringify(lostItems));
        loadItems();
    }
}

function loadItems() {
    let lostItems = JSON.parse(localStorage.getItem("lostItems")) || [];
    let foundItems = JSON.parse(localStorage.getItem("foundItems")) || [];
    
    let lostList = document.getElementById("lostItemsList");
    let foundList = document.getElementById("foundItemsList");

    lostList.innerHTML = "";
    foundList.innerHTML = "";

    // Display Lost Items
    lostItems.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <strong>${item.itemName}</strong> - ${item.itemDescription} <br> 
            <em>Contact: ${item.contactInfo}</em> 
            <button class="found-btn" onclick="markAsFound(${index})">Mark as Found</button>
        `;
        lostList.appendChild(li);
    });

    // Display Found Items
    foundItems.forEach((item, index) => {
        let li = document.createElement("li");
        li.classList.add("found-item");
        li.innerHTML = `
            <strong>${item.itemName}</strong> - ${item.itemDescription} <br> 
            <em>Contact: ${item.contactInfo}</em> 
            <button class="delete-btn" onclick="deleteFoundItem(${index})">Remove</button>
        `;
        foundList.appendChild(li);
    });
}

function markAsFound(index) {
    let lostItems = JSON.parse(localStorage.getItem("lostItems")) || [];
    let foundItems = JSON.parse(localStorage.getItem("foundItems")) || [];

    let foundItem = lostItems.splice(index, 1)[0]; // Move the item
    foundItems.push(foundItem);

    localStorage.setItem("lostItems", JSON.stringify(lostItems));
    localStorage.setItem("foundItems", JSON.stringify(foundItems));

    loadItems();
}

function deleteFoundItem(index) {
    let foundItems = JSON.parse(localStorage.getItem("foundItems")) || [];
    foundItems.splice(index, 1); // Remove from found list
    localStorage.setItem("foundItems", JSON.stringify(foundItems));
    loadItems();
}

function searchItems() {
    let searchValue = document.getElementById("searchBox").value.toLowerCase();
    let items = document.querySelectorAll("#lostItemsList li");

    items.forEach(item => {
        if (item.innerHTML.toLowerCase().includes(searchValue)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}
