document.addEventListener('DOMContentLoaded', async () => {
    const occasions = await OccasionApi.getAllOccasions();

    const container = document.getElementById('occasion-cards-container');
    occasions.forEach(occasion => {
        const el = document.createElement('div');
        el.classList.add('occasion-card');
        el.dataset.occasion = occasion;
        el.textContent = occasion;
        container.appendChild(el);
    });

    OccasionFilter.init();
});