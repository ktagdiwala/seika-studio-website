
// Event listeners
document.querySelector("#password").addEventListener("click", suggestPassword);
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#retypePassword").addEventListener("change", checkPasswords);
document.addEventListener("DOMContentLoaded", checkFeedback);

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


// Display suggested password from web API
async function suggestPassword() {
    let url = `https://webspace.csumb.edu/~lara4594/ajax/suggestedPwd.php?length=8`;
    let response = await fetch(url);
    let data = await response.json(); 

    // Find the element to display the suggested password
    let passwordSuggestion = document.querySelector("#passwordSuggestion");

    // Display the suggested password
    passwordSuggestion.innerHTML = `Suggested Password: ${data.password}`; 
}

//Displaying city from web API after entering a zip code
async function displayCity() {
    let zipCode = document.querySelector("#zip").value;
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data);
    if (data.city) {
        document.querySelector("#city").innerHTML =`City: ${data.city}`;
        document.querySelector("#city").style.color = "black";
    } else {
        document.querySelector("#city").innerHTML = "Zip code not found";
        document.querySelector("#city").style.color = "red";
    }
}

function checkPasswords() {
    let feedback = document.querySelector("#fdbk")
    let password = document.querySelector("#password").value;
    let retypePassword = document.querySelector("#retypePassword").value;
    feedback.innerHTML = "";
    if(password != retypePassword){
        feedback.innerHTML = "Passwords must match.";
    }
}

function checkFeedback(){
    let feedback = document.querySelector("#fdbk");
    if(feedback.innerText=="User created successfully"){
        feedback.style.color = "#36630E";
    }else{
        feedback.style.color = "#AE0C00";
    }
}