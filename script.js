document.addEventListener('DOMContentLoaded', () => {
    initStickyHeader();
    initCarousel();
    initFAQ();
    initImageZoom();
    initTabs();
    initTestimonialsAnimation();
    initDownloads();
});

/* =========================
   1. STICKY HEADER
========================= */
function initStickyHeader() {
    const sticky = document.getElementById('sticky-header');
    if (!sticky) return;

    window.addEventListener('scroll', () => {
        // Professional touch: Adds a class for styling when scrolled
        sticky.classList.toggle('visible', window.scrollY > 600);
    });
}

/* =========================
   2. CAROUSEL (DYNAMIC FIX + HOVER STATES)
========================= */
function initCarousel() {
    const grid = document.getElementById('industryGrid');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!grid || !prevBtn || !nextBtn) return;

    const getScrollStep = () => {
        const card = grid.querySelector('.industry-card');
        if (!card) return 400;
        const gap = parseInt(getComputedStyle(grid).gap) || 24;
        return card.offsetWidth + gap;
    };

    nextBtn.addEventListener('click', () => {
        grid.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        grid.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
    });

    // 9/10 Feature: Disable buttons when at start or end
    grid.addEventListener('scroll', () => {
        const isAtStart = grid.scrollLeft <= 0;
        const isAtEnd = grid.scrollLeft + grid.offsetWidth >= grid.scrollWidth - 5;
        
        prevBtn.style.opacity = isAtStart ? '0.3' : '1';
        prevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';
        
        nextBtn.style.opacity = isAtEnd ? '0.3' : '1';
        nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
    });
}

/* =========================
   3. FAQ (SINGLE OPEN LOGIC)
========================= */
function initFAQ() {
    const questions = document.querySelectorAll('.faq-question');

    questions.forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;

            // Closes other open FAQ items when one is clicked
            document.querySelectorAll('.faq-item').forEach(i => {
                if (i !== item) i.classList.remove('active');
            });

            item.classList.toggle('active');
        });
    });
}

/* =========================
   4. IMAGE ZOOM (OPTIMIZED)
========================= */
function initImageZoom() {
    const container = document.querySelector('.hero-image');
    if (!container) return;

    const img = container.querySelector('img');
    if (!img) return;

    const lens = document.createElement('div');
    lens.className = 'zoom-lens';
    container.appendChild(lens);

    const result = document.createElement('div');
    result.className = 'img-zoom-result';
    container.appendChild(result);

    let isActive = false;

    container.addEventListener('mousemove', (e) => {
        if (!isActive) {
            lens.style.display = 'block';
            result.style.display = 'block';
            result.style.backgroundImage = `url(${img.src})`;
            isActive = true;
        }

        const rect = img.getBoundingClientRect();
        let x = e.clientX - rect.left - lens.offsetWidth / 2;
        let y = e.clientY - rect.top - lens.offsetHeight / 2;

        x = Math.max(0, Math.min(x, rect.width - lens.offsetWidth));
        y = Math.max(0, Math.min(y, rect.height - lens.offsetHeight));

        lens.style.left = x + 'px';
        lens.style.top = y + 'px';

        const cx = result.offsetWidth / lens.offsetWidth;
        const cy = result.offsetHeight / lens.offsetHeight;

        result.style.backgroundSize = `${rect.width * cx}px ${rect.height * cy}px`;
        result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
    });

    container.addEventListener('mouseleave', () => {
        lens.style.display = 'none';
        result.style.display = 'none';
        isActive = false;
    });
}

/* =========================
   5. TABS (CONTENT SWITCHING)
========================= */
function initTabs() {
    const tabs = document.querySelectorAll('.process-tab');
    const contents = document.querySelectorAll('.process-content');

    if (!tabs.length || !contents.length) return;

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {

            // remove active from all
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // add active to clicked
            tab.classList.add('active');
            contents[index].classList.add('active');
        });
    });
}
/* =========================
   6. TESTIMONIAL ANIMATION (INTERSECTION OBSERVER)
========================= */
function initTestimonialsAnimation() {
    const cards = document.querySelectorAll('.testimonial-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'; // Smoother curve
        observer.observe(card);
    });
}

/* =========================
   7. DOWNLOADS
========================= */
function initDownloads() {
    const buttons = document.querySelectorAll('.pdf-download-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', function () {
            const fileName = this.parentElement.querySelector('.file-title')?.innerText;
            // High-end touch: Visual feedback for the click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => this.style.transform = 'scale(1)', 100);
            
            console.log(`Downloading: ${fileName}`);
        });
    });
}