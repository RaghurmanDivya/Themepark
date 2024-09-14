// script.js

document.addEventListener("DOMContentLoaded", function() {
    const rides = document.querySelectorAll('.ride');

    rides.forEach((ride, index) => {
        setTimeout(() => {
            ride.classList.add('visible');
        }, index * 200); // Staggered delay
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".container");
    container.classList.add("visible");

    const images = document.querySelectorAll(".image-box");
    images.forEach((image, index) => {
        setTimeout(() => {
            image.classList.add("visible");
        }, index * 200); // Stagger the animation for each image
    });

    const heading = document.querySelector("h1");
    const paragraph = document.querySelector("p");
    setTimeout(() => {
        heading.style.opacity = "1";
        heading.style.transform = "translateX(0)";
        paragraph.style.opacity = "1";
        paragraph.style.transform = "translateX(0)";
    }, 500); // Delay to ensure smooth transition
});