export const Hero = (product, title, description, isReverse = false) => `
<section class="${isReverse ? 'build-own' : 'hero'}">
    <div class="container hero-grid ${isReverse ? 'reverse' : ''}">
        <div class="image-placeholder">
            ${product ? `<img src="${product.imageUrl}" crossorigin="anonymous" style="width:100%; height:100%; object-fit:cover;">` : ''}
        </div>
        <div class="content">
            <h1>${title}</h1>
            <p>${description}</p>
            <div class="btn-group">
                <button class="btn-primary" ${isReverse ? 'id="start-build-bouquet-btn"' : '' }> 
                ${isReverse ? 'Start Nu' : 'Se Udvalg'}</button>
                <button class="btn-secondary">${isReverse ? 'Inspiration' : 'Læs Mere'}</button>
            </div>
        </div>
    </div>
</section>`;