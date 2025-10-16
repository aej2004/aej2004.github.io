const faqs = document.querySelectorAll('.faq');

faqs.forEach(faq => {
  const shortAnswer = faq.querySelector('.short');
  const longAnswer = faq.querySelector('.long');
  const moreBtn = faq.querySelector('.more-button');
  const lessBtn = faq.querySelector('.less-button');

  moreBtn.addEventListener('click', () => {
    // Close all FAQs first (accordion style)
    document.querySelectorAll('.long').forEach(ans => ans.classList.add("hidden"));
    document.querySelectorAll('.short').forEach(ans => ans.classList.remove("hidden"));
    document.querySelectorAll('.more-button').forEach(btn => btn.classList.remove("hidden"));
    document.querySelectorAll('.less-button').forEach(btn => btn.classList.add("hidden"));

    // Open this one
    shortAnswer.classList.add("hidden");
    longAnswer.classList.remove("hidden");
    moreBtn.classList.add("hidden");
    lessBtn.classList.remove("hidden");
  });

  lessBtn.addEventListener('click', () => {
    shortAnswer.classList.remove("hidden");
    longAnswer.classList.add("hidden");
    moreBtn.classList.remove("hidden");
    lessBtn.classList.add("hidden");
  });
});

const API_URL = "http://localhost:3000/snacks";

// Fetch and display snacks
async function fetchSnacks() {
  try {
    const res = await fetch(API_URL);
    const snacks = await res.json();

    const list = document.getElementById("snack-list");
    list.innerHTML = ""; // Clear the list first

    snacks.forEach(snack => {
      const li = document.createElement("li");
      li.textContent = `${snack.name} (${snack.park}) – ${snack.type || "Snack"} ⭐ ${snack.rating}`;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Error fetching snacks:", err);
  }
}

// Handle form submission
async function addSnack(event) {
  event.preventDefault();

  const newSnack = {
    name: document.getElementById("snack-name").value,
    park: document.getElementById("snack-park").value,
    type: document.getElementById("snack-type").value,
    rating: Number(document.getElementById("snack-rating").value) || 0
  };

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSnack)
    });

    event.target.reset(); // Clear form
    fetchSnacks(); // Refresh list
  } catch (err) {
    console.error("Error adding snack:", err);
  }
}

// Run when page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchSnacks(); // Load existing snacks
  document.getElementById("snack-form").addEventListener("submit", addSnack);
});
