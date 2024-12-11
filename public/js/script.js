
// Event listeners
let productLinks = document.querySelectorAll("a.gallery");
for (let productLink of productLinks) {
    productLink.addEventListener("click", getArtInfo);
}
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

