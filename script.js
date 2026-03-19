// --- 1. Global Loader ---
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('global-loader').classList.add('hidden');
    }, 1200); 
});

// --- 2. Custom Cursor Logic ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" });
});

document.querySelectorAll('a, button, .blog-post, input, textarea, #theme-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '60px'; cursorOutline.style.height = '60px';
        cursorOutline.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
        cursorOutline.style.borderColor = 'var(--accent-alt)';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '40px'; cursorOutline.style.height = '40px';
        cursorOutline.style.backgroundColor = 'transparent';
        cursorOutline.style.borderColor = 'var(--accent-main)';
    });
});

// --- 3. Advanced Theme Switcher (with Portfolio Loader Style) ---
const themes = ['default', 'light', 'matrix'];
let currentThemeIndex = 0;
const themeBtn = document.getElementById('theme-btn');
const globalLoader = document.getElementById('global-loader');
const loaderTextMsg = document.getElementById('loader-text-msg');

const savedTheme = localStorage.getItem('blog-theme');
if (savedTheme && savedTheme !== 'default') {
    currentThemeIndex = themes.indexOf(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
}

themeBtn.addEventListener('click', () => {
    // Spin icon
    themeBtn.style.transform = "rotate(180deg) scale(0.8)";
    setTimeout(() => { themeBtn.style.transform = "rotate(0deg) scale(1)"; }, 300);

    // Get Next Theme
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const newTheme = themes[currentThemeIndex];
    
    // Set Custom Terminal Message
    if (newTheme === 'light') loaderTextMsg.textContent = "> Booting Light Mode...";
    else if (newTheme === 'matrix') loaderTextMsg.textContent = "> Injecting Matrix Protocol...";
    else loaderTextMsg.textContent = "> Restoring Dark System...";

    // Show Loader
    globalLoader.classList.remove('hidden');

    setTimeout(() => {
        // Swap CSS Theme
        if (newTheme === 'default') document.documentElement.removeAttribute('data-theme');
        else document.documentElement.setAttribute('data-theme', newTheme);
        
        localStorage.setItem('blog-theme', newTheme);

        // Hide Loader
        setTimeout(() => {
            globalLoader.classList.add('hidden');
            setTimeout(() => { loaderTextMsg.textContent = "> Starting Blog..."; }, 500);
        }, 800);
    }, 500);
});

// --- 4. Content Data ---
const myData = {
    shortBio: "Computer Science Engineer & Web Developer. <br> Building minimal, efficient, and scalable digital solutions.",
    aboutText: `Computer Science Engineering student writing about technology, systems, and real learning experiences.`,
    blogs: [
        {
            category: "Foundations",
            title: "How Computers Actually Work (Simple Explanation)",
            excerpt: "Breaking down the CPU, RAM, Storage, and Logic Gates. Here is what I understood about the core hardware powering our digital world.",
            link: "https://muhammadaarizkhansocial.medium.com/how-computers-actually-work-simple-detailed-explanation-c1395c14da6a" 
        },
        {
            category: "Systems",
            title: "Operating Systems Under the Hood: Windows vs. Linux",
            excerpt: "What an OS actually does in the background, and why exploring Linux completely changed my perspective on computing and development.",
            link: "https://medium.com/@muhammadaarizkhansocial"
        },
        {
            category: "Web Development",
            title: "My Roadmap to Frontend Web Development",
            excerpt: "From basic HTML structure to dynamic UIs. A step-by-step guide documenting my practical experience with web technologies.",
            link: "https://medium.com/@muhammadaarizkhansocial"
        }
    ]
};

document.getElementById('short-bio').innerHTML = myData.shortBio;
document.getElementById('detailed-about').innerHTML = myData.aboutText;

// --- 5. Render Blogs (With Glowing Box Animation) ---
const blogContainer = document.getElementById('blog-container');
const selectedBlogs = myData.blogs.sort(() => 0.5 - Math.random()).slice(0, 3);

selectedBlogs.forEach((blog, index) => {
    const article = document.createElement('article');
    // Added glowing-box class here
    article.className = `blog-post glowing-box anim-fade-up delay-${index + 1}`;
    article.innerHTML = `
        <div class="post-meta">${blog.category}</div>
        <a href="${blog.link}" target="_blank" rel="noopener noreferrer"><h3>${blog.title}</h3></a>
        <p class="excerpt">${blog.excerpt}</p>
    `;
    blogContainer.appendChild(article);
});

// --- 6. Intersection Observer ---
document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
});

// --- 7. Minimal Reading Progress Bar ---
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('reading-progress');
    if (progressBar) progressBar.style.width = scrolled + "%";
});

// --- 8. Web3Forms Contact Form ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        formData.append("access_key", "88c00d6a-06f7-4f00-a5cd-4eefc80fef1a"); 

        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
            if (response.ok) {
                alert("Message sent successfully! 🚀 I will get back to you soon.");
                contactForm.reset();
            } else {
                alert("Error sending message. Please try again.");
            }
        } catch (error) {
            alert("Something went wrong. Please check your connection.");
        } finally {
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
        }
    });
}
