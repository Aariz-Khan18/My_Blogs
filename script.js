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

const blogContainer = document.getElementById('blog-container');

// Shuffles the blogs and picks 3 to display
const shuffledBlogs = myData.blogs.sort(() => 0.5 - Math.random());
const selectedBlogs = shuffledBlogs.slice(0, 3);

selectedBlogs.forEach(blog => {
    const article = document.createElement('article');
    article.className = 'blog-post';
    article.innerHTML = `
        <div class="post-meta"><span style="color: var(--accent-purple)">${blog.category}</span></div>
        <a href="${blog.link}" target="_blank" rel="noopener noreferrer"><h3>${blog.title}</h3></a>
        <p class="excerpt">${blog.excerpt}</p>
    `;
    blogContainer.appendChild(article);
});

// Scroll Animation Observer
document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
});

