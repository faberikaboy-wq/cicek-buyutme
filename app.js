const plantForm = document.getElementById('plant-form');
const plantContainer = document.getElementById('plant-container');

// LocalStorage'dan bitkileri çek veya boş dizi oluştur
let plants = JSON.parse(localStorage.getItem('plants')) || [];

function saveAndRender() {
    localStorage.setItem('plants', JSON.stringify(plants));
    renderPlants();
}

function renderPlants() {
    plantContainer.innerHTML = '';

    if (plants.length === 0) {
        plantContainer.innerHTML = '<p>Henüz hiç bitki eklemedin. Hemen yukarıdan bir tane ekle!</p>';
        return;
    }

    plants.forEach((plant, index) => {
        const card = document.createElement('div');
        card.classList.add('plant-card');

        card.innerHTML = `
            <h3>${plant.name}</h3>
            <p><strong>Tür:</strong> ${plant.type}</p>
            <p><strong>Sulama Sıklığı:</strong> ${plant.interval} günde bir</p>
            <p><strong>Son Sulama:</strong> ${plant.lastWatered}</p>
            <button onclick="waterPlant(${index})">💧 Sulandı</button>
            <button class="delete" onclick="deletePlant(${index})">🗑️ Sil</button>
        `;

        plantContainer.appendChild(card);
    });
}

plantForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('plant-name').value;
    const type = document.getElementById('plant-type').value;
    const interval = document.getElementById('water-interval').value;
    const today = new Date().toLocaleDateString('tr-TR');

    const newPlant = {
        name,
        type,
        interval,
        lastWatered: today
    };

    plants.push(newPlant);
    saveAndRender();
    plantForm.reset();
});

window.waterPlant = function(index) {
    const today = new Date().toLocaleDateString('tr-TR');
    plants[index].lastWatered = today;
    saveAndRender();
}

window.deletePlant = function(index) {
    plants.splice(index, 1);
    saveAndRender();
}

// Sayfa ilk açıldığında bitkileri listele
renderPlants();
