document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  try {
    const res = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    console.log(result);

    document.getElementById("status").innerText = result.message || "Message Sent ✅";

    document.getElementById("contactForm").reset();

  } catch (error) {
    console.log(error);
    document.getElementById("status").innerText = "Error sending ❌";
  }
});