// ========================
// URGENT NOTICE
// ========================
const urgentNoticeText ="";

function renderUrgentNotice() {
    if (!urgentNoticeText) return;
    const noticeDiv = document.getElementById('urgent-notice');
    if (!noticeDiv) return;
    noticeDiv.textContent = "⚠️ " + urgentNoticeText;
    noticeDiv.style.display = "block";
}

// ========================
// FORMSPREE ID
// ========================
const FORMSPREE_ID = "YOUR_FORM_ID";

// ========================
// GALLERY IMAGES
// ========================
const galleryImages = [
    { src: "images/classroom.jpg",    alt: "Learners in the classroom" },
    { src: "images/sports-day.jpg",   alt: "Annual sports day on the field" },
    { src: "images/library.jpg",      alt: "Our school library" },
    { src: "images/choir.jpg",        alt: "School choir performing" },
    { src: "images/computer-lab.jpg", alt: "Learners in the computer lab" },
    { src: "images/playground.jpg",   alt: "Learners on the playground" }
];

// ========================
// NEWS ITEMS
// ========================
const newsItems = [
    {
        date: "2026-03-20",
        title: "Parent-Teacher Meeting",
        content: "Join us on 20 March at 14:00 in the school hall."
    },
    {
        date: "2026-03-25",
        title: "Sports Day",
        content: "Sports day will be held on the top field. Parents welcome!"
    },
    {
        date: "2026-04-05",
        title: "School Closed",
        content: "Public holiday – no school."
    }
];

// ========================
// STAFF DIRECTORY
// ========================
const staffMembers = [
    { name: "Mrs. Dlamini",      role: "Principal",        email: "principal@springssunrise.co.za" },
    { name: "Mr. Nkosi",         role: "Deputy Principal", email: "deputy@springssunrise.co.za" },
    { name: "Ms. Reddy",         role: "Grade 3 Teacher",  email: "reddy@springssunrise.co.za" },
    { name: "Mr. van der Merwe", role: "Sports Coach",     email: "sports@springssunrise.co.za" }
];

// ========================
// HELPER — format date
// "2026-03-20" becomes "20 March 2026"
// ========================
function formatDate(dateStr) {
    const [year, month, day] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-ZA", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

// ========================
// HELPER — get initials from name
// "Mrs. Dlamini" becomes "D"
// "Ms. Reddy" becomes "R"
// ========================
function getInitials(name) {
    return name
        .replace(/^(Mrs?|Ms|Dr)\.?\s*/i, "")
        .split(" ")
        .map(w => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

// ========================
// RENDER GALLERY
// ========================
function renderGallery() {
    const container = document.getElementById('gallery-grid');
    if (!container) return;
    container.innerHTML = "";
    galleryImages.forEach(item => {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt;
        img.loading = "lazy";
        container.appendChild(img);
    });
}

// ========================
// RENDER NEWS
// ========================
function renderNews() {
    const container = document.getElementById("news-list");
    if (!container) return;
    container.innerHTML = "";

    const sorted = [...newsItems].sort((a, b) => new Date(b.date) - new Date(a.date));

    sorted.forEach(item => {
        const div = document.createElement("div");
        div.className = "news-item";
        div.innerHTML = `
            <div class="news-date">${formatDate(item.date)}</div>
            <h3>${item.title}</h3>
            <p>${item.content}</p>
        `;
        container.appendChild(div);
    });
}

// ========================
// RENDER STAFF
// ========================
function renderStaff() {
    const container = document.getElementById('staff-grid');
    if (!container) return;
    container.innerHTML = "";
    staffMembers.forEach(member => {
        const card = document.createElement('div');
        card.className = "staff-card";
        card.innerHTML = `
            <div class="staff-avatar">${getInitials(member.name)}</div>
            <h4>${member.name}</h4>
            <p>${member.role}</p>
            <small><a href="mailto:${member.email}">${member.email}</a></small>
        `;
        container.appendChild(card);
    });
}

// ========================
// HAMBURGER MENU
// ========================
function initHamburger() {
    const btn = document.getElementById("hamburger");
    const nav = document.getElementById("main-nav");
    if (!btn || !nav) return;

    btn.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        btn.classList.toggle("open", isOpen);
        btn.setAttribute("aria-expanded", isOpen);
    });

    nav.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
            btn.classList.remove("open");
            btn.setAttribute("aria-expanded", "false");
        });
    });
}

// ========================
// CONTACT FORM
// ========================
function initContactForm() {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");
    if (!form || !status) return;

    form.action = `https://formspree.io/f/${FORMSPREE_ID}`;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        status.textContent = "Sending…";
        status.style.color = "#6b7280";

        try {
            const res = await fetch(form.action, {
                method: "POST",
                headers: { "Accept": "application/json" },
                body: new FormData(form)
            });

            if (res.ok) {
                status.textContent = "✅ Message sent! We'll be in touch soon.";
                status.style.color = "#16a34a";
                form.reset();
            } else {
                status.textContent = "❌ Something went wrong. Please try again.";
                status.style.color = "#dc2626";
            }
        } catch {
            status.textContent = "❌ Could not send. Check your connection.";
            status.style.color = "#dc2626";
        }
    });
}

// ========================
// COPYRIGHT YEAR
// ========================
function renderYear() {
    const el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
}

// ========================
// INIT — runs after page is fully loaded
// ========================
document.addEventListener("DOMContentLoaded", () => {
    renderUrgentNotice();
    renderGallery();
    renderNews();
    renderStaff();
    initHamburger();
    initContactForm();
    renderYear();
});