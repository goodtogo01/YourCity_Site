// Function to check if the user is logged in
function checkAuth() {
    if (!localStorage.getItem("userLoggedIn")) {
        window.location.href = "login.html";
    }
}

// Function to handle logout
function logout() {
    localStorage.removeItem("userLoggedIn");
    window.location.href = "login.html";
}

// Redirect if not logged in
document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("userLoggedIn")) {
        window.location.href = "login.html"; // Redirect to login page
    }
    populateCountries();  // Populate countries on page load
});

// Function to populate countries dropdown
function populateCountries() {
    const countrySelect = document.getElementById("country");
    countrySelect.innerHTML = '<option value="">Select Country</option>';
    for (let country in data) {
        let option = document.createElement("option");
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    }
}

// Function to hide label when a selection is made
function hideLabel(selectElement) {
    const label = selectElement.previousElementSibling;
    if (label) {
        if (selectElement.value) {
            label.style.display = 'none';
        } else {
            label.style.display = 'block';
        }
    }
}

// Function to populate states dropdown
function populateStates() {
    const country = document.getElementById("country").value;
    const stateSelect = document.getElementById("state");
    const citySelect = document.getElementById("city");
    const cityDetailsDiv = document.getElementById("city-details");

    stateSelect.innerHTML = '<option value="">Select State</option>';
    citySelect.innerHTML = '<option value="">Select City</option>';
    cityDetailsDiv.style.display = "none";

    if (country && data[country]) {
        // Populate the state dropdown based on selected country
        for (let state in data[country]) {
            let option = document.createElement("option");
            option.value = state;
            option.textContent = state;
            stateSelect.appendChild(option);
        }
    }

    hideLabel(document.getElementById("country"));
}

// Function to populate cities dropdown
function populateCities() {
    const country = document.getElementById("country").value;
    const state = document.getElementById("state").value;
    const citySelect = document.getElementById("city");

    citySelect.innerHTML = '<option value="">Select City</option>';

    if (country && state && data[country][state]) {
        // Populate the city dropdown based on selected state
        data[country][state].forEach(city => {
            let option = document.createElement("option");
            option.value = city.name;
            option.textContent = city.name;
            citySelect.appendChild(option);
        });
    }

    hideLabel(document.getElementById("state"));
}

// Function to display city details
function showCityInfo() {
    const country = document.getElementById("country").value;
    const state = document.getElementById("state").value;
    const city = document.getElementById("city").value;
    const cityDetailsDiv = document.getElementById("city-details");

    if (country && state && city) {
        const cityData = data[country][state].find(cityObj => cityObj.name === city);
        if (cityData) {
            document.getElementById("selected-country").textContent = country;
            document.getElementById("selected-state").textContent = state;
            document.getElementById("selected-city").textContent = city;
            document.getElementById("selected-city-description").textContent = cityData.description;
            cityDetailsDiv.style.display = "block";
        }
    }

    hideLabel(document.getElementById("city"));
}

// Reset search
function newSearch() {
    document.getElementById("country").value = "";
    document.getElementById("state").value = "";
    document.getElementById("city").value = "";
    document.getElementById("city-details").style.display = "none";

    // Reset label visibility
    document.querySelectorAll('.input-group label').forEach(label => label.style.display = 'block');
}