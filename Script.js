// Show login or register forms
function showLogin() {
    document.querySelector('.login-container').style.display = 'block';
    document.querySelector('.register-container').style.display = 'none';
}

function showRegister() {
    document.querySelector('.login-container').style.display = 'none';
    document.querySelector('.register-container').style.display = 'block';
}

// Dummy login and register functions (to be replaced with Firebase or other backend)
function login() {
    alert("Logged in (integrate with Firebase for real login functionality)");
}

function register() {
    alert("Registered (integrate with Firebase for real registration functionality)");
}

// Hostel data with amenities, food menu, and room fees
const hostels = [
    {
        name: 'Sunshine Hostel',
        location: { lat: 28.7041, lng: 77.1025 },
        amenities: ['WiFi', 'Washing Machine', 'Gym'],
        foodMenu: 'Indian and Continental',
        fees: {
            single: '₹15,000/month',
            double: '₹10,000/person/month',
            triple: '₹8,000/person/month'
        }
    },
    {
        name: 'Green Villa',
        location: { lat: 19.0760, lng: 72.8777 },
        amenities: ['WiFi', 'Cafeteria', 'Laundry'],
        foodMenu: 'Indian and South Indian',
        fees: {
            single: '₹12,000/month',
            double: '₹9,000/person/month',
            triple: '₹7,000/person/month'
        }
    },
    {
        name: 'Urban Nest',
        location: { lat: 13.0827, lng: 80.2707 },
        amenities: ['WiFi', 'Housekeeping', 'Study Room'],
        foodMenu: 'Indian and Chinese',
        fees: {
            single: '₹18,000/month',
            double: '₹13,000/person/month',
            triple: '₹10,000/person/month'
        }
    }
];

// Populate hostel list dynamically
const hostelListElement = document.getElementById('hostelList');
hostels.forEach((hostel, index) => {
    const li = document.createElement('li');
    li.textContent = hostel.name;
    li.onclick = () => showHostelDetails(index); // Open details on click
    hostelListElement.appendChild(li);
});

// Show hostel details in modal
function showHostelDetails(index) {
    const hostel = hostels[index];
    document.getElementById('hostelName').textContent = hostel.name;
    document.getElementById('amenities').textContent = hostel.amenities.join(', ');
    document.getElementById('foodMenu').textContent = hostel.foodMenu;
    document.getElementById('singleRoomFee').textContent = hostel.fees.single;
    document.getElementById('doubleRoomFee').textContent = hostel.fees.double;
    document.getElementById('tripleRoomFee').textContent = hostel.fees.triple;

    // Show modal with fade-in effect
    const modal = document.getElementById('hostelDetailsModal');
    modal.style.display = 'flex';
    modal.classList.add('fade-in'); // Add fade-in animation
}

// Close modal
function closeModal() {
    const modal = document.getElementById('hostelDetailsModal');
    modal.classList.remove('fade-in'); // Remove fade-in animation
    modal.style.display = 'none';
}

// Initialize Google Map with hostel locations
function initMap() {
    const mapCenter = { lat: 20.5937, lng: 78.9629 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 5,
        center: mapCenter,
    });

    // Add markers for each hostel
    hostels.forEach(hostel => {
        const marker = new google.maps.Marker({
            position: hostel.location,
            map: map,
            title: hostel.name
        });

        // Show hostel details when clicking on the marker
        marker.addListener('click', () => {
            const index = hostels.findIndex(h => h.name === hostel.name);
            showHostelDetails(index);
        });
    });
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('hostelDetailsModal');
    if (event.target == modal) {
        closeModal();
    }
};
