/* =========================
   CUSTOM CURSOR
========================= */

const cursor = document.querySelector(".cursor");

let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;


document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

});


function animateCursor() {

    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;

    cursor.style.left = currentX + "px";
    cursor.style.top = currentY + "px";

    requestAnimationFrame(animateCursor);

}


animateCursor();



/* =========================
   CURSOR HOVER
========================= */

const hoverItems =
    document.querySelectorAll(
        "a, .skill-card, .project-card, .profile-card"
    );


hoverItems.forEach((item) => {

    item.addEventListener("mouseenter", () => {

        cursor.classList.add("active");

    });


    item.addEventListener("mouseleave", () => {

        cursor.classList.remove("active");

    });

});



/* =========================
   NAVBAR HIDE ON SCROLL
========================= */

const navbar =
    document.querySelector(".navbar");

let lastScroll = 0;


window.addEventListener("scroll", () => {

    const currentScroll =
        window.scrollY;


    if (currentScroll > lastScroll && currentScroll > 100) {

        navbar.style.transform =
            "translateY(-100%)";

    } else {

        navbar.style.transform =
            "translateY(0)";

    }


    lastScroll = currentScroll;

});



/* =========================
   PROFILE PARALLAX
========================= */

const profile =
    document.querySelector(".profile-card");


document.addEventListener("mousemove", (e) => {

    if (window.innerWidth < 900) return;


    const x =
        (e.clientX / window.innerWidth - 0.5) * 8;

    const y =
        (e.clientY / window.innerHeight - 0.5) * 8;


    profile.style.transform =
        `rotate(3deg) translate(${x}px, ${y}px)`;

});



/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(
        ".skill-card, .project-card, .timeline-item"
    );


const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity .7s ease, transform .7s ease";

    observer.observe(element);

});