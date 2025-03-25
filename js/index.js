document.addEventListener("DOMContentLoaded", () => {
    const monsterList = document.getElementById("monster-list");
    const form = document.getElementById("monster-form");
    const loadMoreBtn = document.getElementById("load-more");

    let page = 1;

    // Fetch and display monsters
    function fetchMonsters(page) {
        fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
            .then(response => response.json())
            .then(monsters => {
                monsters.forEach(monster => displayMonster(monster));
            });
    }

    // Display a single monster
    function displayMonster(monster) {
        const div = document.createElement("div");
        div.classList.add("monster");
        div.innerHTML = `
            <h2>${monster.name}</h2>
            <p>Age: ${monster.age.toFixed(2)}</p>
            <p>${monster.description}</p>
        `;
        monsterList.appendChild(div);
    }

    // Handle form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const description = document.getElementById("description").value;

        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, age: parseFloat(age), description })
        })
        .then(response => response.json())
        .then(newMonster => {
            displayMonster(newMonster);
            form.reset();
        });
    });

    // Load more monsters
    loadMoreBtn.addEventListener("click", () => {
        page++;
        fetchMonsters(page);
    });

    // Initial Load
    fetchMonsters(page);
});
