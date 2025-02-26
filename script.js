/* script.js */
document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("csvFile");
    const loadButton = document.getElementById("loadCsv");
    const search = document.getElementById("search");
    const list1 = document.getElementById("list1");
    const list2 = document.getElementById("list2");
    let items = [];

    const toggleDarkMode = document.getElementById("toggleDarkMode");
    const toggleIcon = document.getElementById("toggleIcon");

    // Verificar si el modo oscuro está activo en el localStorage
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
        toggleDarkMode.checked = true;
        toggleIcon.textContent = "☀️"; // Cambiar a sol si está en modo oscuro
    }

    // Alternar entre modo claro y oscuro
    toggleDarkMode.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");
        const isDarkMode = document.body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", isDarkMode);

        // Cambiar el emoji según el modo
        toggleIcon.textContent = isDarkMode ? "☀️" : "🌙";
    });

    
    // CSV
    loadButton.addEventListener("click", () => {
        const file = fileInput.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = e => {
            const data = e.target.result;
            const rows = data.split("\n").map(row => row.split(","));
            list1.innerHTML = "";
            list2.innerHTML = "";
            items = [];
            rows.forEach((row, index) => {
                if (index === 0 || index > 50) return; //limitar a 50 filas
                const [name, age, gender, job, education] = row;
                if (!name) return;

                // Crear el elemento de la lista
                const li = document.createElement("li");
                li.className = "list-group-item list-group-item-action";
                li.textContent = name;

                //Contenedor de detalles ()
                const details = document.createElement("div");
                details.className = "details";
                details.innerHTML = `
                    <p><strong>Edad:</strong> ${age}</p>
                    <p><strong>Sexo:</strong> ${gender}</p>
                    <p><strong>Ocupación:</strong> ${job}</p>
                    <p><strong>Nivel de estudios:</strong> ${education}</p>
                `;


                //Un click listener para que si, antes era un modal pero ahora solo se desliza
                li.addEventListener("click", () => {
                    details.classList.toggle("open");
                });

                li.appendChild(details);
                items.push(li);
                index % 2 === 0 ? list1.appendChild(li) : list2.appendChild(li);
            });
        };
        reader.readAsText(file);
    });

    // Buscar por nombre
    search.addEventListener("input", () => {
        const filter = search.value.toLowerCase();
        items.forEach(li => {
            li.style.display = li.textContent.toLowerCase().includes(filter) ? "block" : "none";
        });
    });
});