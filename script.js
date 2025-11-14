// ========================
// PLUS / MINUS ACTION
// ========================
document.querySelectorAll(".kg-control-btn").forEach(btn => {
    btn.addEventListener("click", function () {
        const meat = this.dataset.meat;
        const input = document.querySelector(`input[data-meat="${meat}"]`);
        let value = parseInt(input.value);

        if (this.dataset.action === "plus") {
            value++;
        } else if (this.dataset.action === "minus" && value > 0) {
            value--;
        }

        input.value = value;

        const minusBtn = document.querySelector(`.minus-btn[data-meat="${meat}"]`);
        minusBtn.disabled = value <= 0;

        calculatePrice();
    });
});


// ========================
// MAIN CALCULATION FUNCTION
// ========================
function calculatePrice(updateSummary = false) {

    const meats = [
        { id: "kgAdhi", name: "Hilibka Adhiga", price: 60000 },
        { id: "kgGeel", name: "Hilibka Geela", price: 50000 },
        { id: "kgLo",   name: "Hilibka Lo'da",  price: 45000 }
    ];

    let total = 0;
    let summaryText = "";

    meats.forEach(item => {
        const kg = parseInt(document.getElementById(item.id).value);
        if (kg > 0) {
            const subtotal = kg * item.price;
            total += subtotal;
            summaryText += `${item.name}: ${kg} KG (${subtotal.toLocaleString()} SLSH)\n`;
        }
    });

    // Update Summary Box
    document.getElementById("totalPrice").innerText = total.toLocaleString() + " SLSH";
    document.getElementById("orderSummaryText").innerText = summaryText === "" ? "Waxba lama dooran" : summaryText;

    // Update WhatsApp Link
    const phone = "252654740397";

    const message =
`Dalab Cusub

${summaryText}
Wadarta Guud: ${total.toLocaleString()} SLSH`;

    document.getElementById("orderLo").href =
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}



// =====================
// INITIAL CALL
// =====================
calculatePrice();
