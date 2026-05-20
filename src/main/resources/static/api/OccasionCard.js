class OccasionCard {
    constructor(element) {
        this.element = element;
        this.occasion = element.dataset.occasion;
    }


    setACtive(active) {
        this.element.classList.toggle('active', active);
    }

    onClick(callback) {
        this.element.addEventListener('click', () => callback(this));

    }
}