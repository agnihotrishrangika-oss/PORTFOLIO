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

const hoverItems = document.querySelectorAll("a, .skill-card, .project-card, .profile-card");

hoverItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
        cursor.classList.add("active");
    });
    item.addEventListener("mouseleave", () => {
        cursor.classList.remove("active");
    });
});

const navbar = document.querySelector(".navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = "translateY(-100%)";
    } else {
        navbar.style.transform = "translateY(0)";
    }
    lastScroll = currentScroll;
});

const profile = document.querySelector(".profile-card");

document.addEventListener("mousemove", (e) => {
    if (window.innerWidth < 900) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 8;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;
    profile.style.transform = `rotate(3deg) translate(${x}px, ${y}px)`;
});

const revealElements = document.querySelectorAll(".skill-card, .project-card, .timeline-item");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition = "opacity .7s ease, transform .7s ease";
    observer.observe(element);
});
const SUPABASE_URL = "https://dlhhtikawfxguqotsbuq.supabase.co";
const SUPABASE_KEY = "sb_publishable_tOWjzvM_E76ttkcP3oWWWg_a11aTNA7";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
async function testSupabase() {
    const { data, error } = await supabaseClient
        .from("messages")
        .select("*")
        .limit(1);

    if (error) {
        console.error("Supabase error:", error);
    } else {
        console.log("Supabase connected successfully!");
        console.log(data);
    }
}

testSupabase();
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const submitButton = contactForm.querySelector(".form-submit");

    submitButton.disabled = true;
    submitButton.innerHTML = "Sending...";

    const { error } = await supabaseClient
        .from("messages")
        .insert([
            {
                name: name,
                email: email,
                message: message
            }
        ]);

    if (error) {
        console.error("Supabase error:", error);
        formStatus.textContent = "Something went wrong. Please try again.";
        formStatus.style.color = "#c0392b";
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send Message <span>↗</span>';
        return;
    }

    formStatus.textContent = "Message sent successfully!";
    formStatus.style.color = "var(--accent)";
    contactForm.reset();
    submitButton.disabled = false;
    submitButton.innerHTML = 'Send Message <span>↗</span>';
});