
// Event listeners
let productLinks = document.querySelectorAll("a.gallery");
for (let productLink of productLinks) {
    productLink.addEventListener("click", getArtInfo);
}

document.addEventListener('DOMContentLoaded', (event) => {
    let initialScrollTop = 0;

    const galleryModal = document.getElementById('galleryModal');

    galleryModal.addEventListener('show.bs.modal', function () {
        initialScrollTop = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${initialScrollTop}px`;
        document.body.style.width = '100%';  // Prevent horizontal scroll issues
    });

    galleryModal.addEventListener('hidden.bs.modal', function () {
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, initialScrollTop);
    });
});


// functions
async function getArtInfo() {
    var myModal = new bootstrap.Modal(document.getElementById('galleryModal'));
    myModal.show();
    let url = `/api/product/${this.id}`;
    let response = await fetch(url);
    let data = await response.json();
    let productInfo = document.querySelector("#productInfo");
    productInfo.innerHTML = `
        <div>
            <strong>${data[0].title}</strong><br>
            <p>${data[0].description}</p>
            <p><strong>Price:</strong> $${data[0].price}</p>
            <p><strong>Category:</strong> ${data[0].category}</p>
        </div>`;
}

