async function loadData() {
  const res = await fetch("http://localhost:5000/contacts");
  const data = await res.json();

  const container = document.getElementById("data");
  container.innerHTML = "";

  data.forEach(item => {
    const div = document.createElement("div");

    div.innerHTML = `
      <p><b>Name:</b> ${item.name}</p>
      <p><b>Email:</b> ${item.email}</p>
      <p><b>Message:</b> ${item.message}</p>
      <button onclick="deleteData('${item._id}')">Delete</button>
      <hr>
    `;

    container.appendChild(div);
  });
}

async function deleteData(id) {
  await fetch(\`http://localhost:5000/contact/\${id}\`, {
    method: "DELETE"
  });

  loadData();
}

loadData();