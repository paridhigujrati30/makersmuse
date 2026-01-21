// ---------- CART ----------
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let list = document.getElementById("cartItems");
    let total = 0;

    if (!list) return;

    list.innerHTML = "";
    cart.forEach((item, i) => {
        total += item.price;
        list.innerHTML += `
            <li>
                ${item.name} - ₹${item.price}
                <button onclick="removeItem(${i})">❌</button>
            </li>`;
    });

    document.getElementById("totalPrice").innerText = "₹" + total;
}

function removeItem(i) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
}

// ---------- BOOKING ----------
const params = new URLSearchParams(window.location.search);
const item = params.get("item");

if (item && document.getElementById("selectedItem")) {
    document.getElementById("selectedItem").innerText = "Item: " + item;
}

function bookItem() {
    let name = document.getElementById("custName").value;
    let days = document.getElementById("days").value;

    document.getElementById("msg").innerHTML =
        `<b>${item}</b> booked by <b>${name}</b>.
         Delivered in <b>${days} days</b>.`;
}

/* ---------- FEEDBACK (LOCAL STORAGE + SINGLE NOTEPAD FILE) ---------- */

function saveFeedback() {
    let name = document.getElementById("fbName").value;
    let text = document.getElementById("fbText").value;

    if (name === "" || text === "") {
        alert("Please fill all fields");
        return;
    }

    let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

    feedbacks.push({
        name: name,
        text: text,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    document.getElementById("fbMsg").innerText =
        "Thank you for your feedback!";

    document.getElementById("fbName").value = "";
    document.getElementById("fbText").value = "";

    loadFeedbacks();
}

function loadFeedbacks() {
    let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    let list = document.getElementById("feedbackList");

    if (!list) return;

    list.innerHTML = "";

    feedbacks.forEach(fb => {
        let li = document.createElement("li");
        li.innerHTML = `
            <b>${fb.name}</b>: ${fb.text}
            <br><small>${fb.date}</small>`;
        list.appendChild(li);
    });
}

function exportAllFeedbacksToTXT() {
    let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

    if (feedbacks.length === 0) {
        alert("No feedbacks to export");
        return;
    }

    let content = "";

    feedbacks.forEach((fb, i) => {
        content += `Feedback ${i + 1}\n`;
        content += `Name: ${fb.name}\n`;
        content += `Message: ${fb.text}\n`;
        content += `Date: ${fb.date}\n\n`;
    });

    let blob = new Blob([content], { type: "text/plain" });
    let link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "all_feedbacks.txt"; // SINGLE FILE
    link.click();
}

document.addEventListener("DOMContentLoaded", loadFeedbacks);
