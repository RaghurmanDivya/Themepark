// script.js

document.addEventListener("DOMContentLoaded", function() {
    const rides = document.querySelectorAll('.ride');

    rides.forEach((ride, index) => {
        setTimeout(() => {
            ride.classList.add('visible');
        }, index * 200); // Staggered delay
    });
});
