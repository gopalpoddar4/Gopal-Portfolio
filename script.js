document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector("nav");
    document.querySelector(".menu-toggle").addEventListener("click", function () {
        nav.classList.toggle("active");
    });
});
