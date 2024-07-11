document.addEventListener("DOMContentLoaded", function() {
    const btnTop = document.querySelector(".btn-top");
    const hobbySection = document.querySelector("#hobby");

    window.addEventListener("scroll", function() {
        const hobbyPosition = hobbySection.getBoundingClientRect().top;

        if (window.scrollY + window.innerHeight > hobbyPosition) {
            btnTop.classList.add("show");
        } else {
            btnTop.classList.remove("show");
        }
    });

    btnTop.addEventListener("click", function(event) {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
