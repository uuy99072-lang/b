// تأثيرات الحركة والتفاعل
document.addEventListener('DOMContentLoaded', function() {
    // تأثير الظهور التدريجي للعناصر
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // مراقبة جميع الأقسام
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // تأثير شريط الأخبار المتحرك
    const ticker = document.querySelector('.ticker-content span:last-child');
    if (ticker) {
        ticker.style.animationDuration = '30s';
    }

    // تأثير hover للبطاقات
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(139, 69, 19, 0.3)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(139, 69, 19, 0.2)';
        });
    });

    // تأثير النقر على عناصر المعرض
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                // إنشاء نافذة عرض مكبرة
                const modal = document.createElement('div');
                modal.className = 'image-modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <span class="close-modal">&times;</span>
                        <img src="${img.src}" alt="${img.alt}">
                        <div class="modal-caption">
                            <h4>${this.querySelector('h4').textContent}</h4>
                            <p>${this.querySelector('p').textContent}</p>
                        </div>
                    </div>
                `;
                document.body.appendChild(modal);

                // إغلاق النافذة
                modal.querySelector('.close-modal').addEventListener('click', () => {
                    document.body.removeChild(modal);
                });

                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        document.body.removeChild(modal);
                    }
                });
            }
        });
    });

    // تحسين التنقل السلس
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // تأثير تغيير لون شريط التنقل عند التمرير
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.style.background = 'linear-gradient(135deg, rgba(139, 69, 19, 0.95), rgba(160, 82, 45, 0.95))';
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
            nav.style.backdropFilter = 'none';
        }
    });
});

// دالة إظهار قسم المناسبات
function showEvents() {
    const eventsSection = document.getElementById('events');
    const newsSection = document.getElementById('news');
    
    if (eventsSection.style.display === 'none' || eventsSection.style.display === '') {
        eventsSection.style.display = 'block';
        newsSection.style.display = 'none';
        
        // تمرير سلس إلى قسم المناسبات
        eventsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        eventsSection.style.display = 'none';
        newsSection.style.display = 'block';
    }
}

// دالة تبديل الأقسام
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = section.style.display === 'none' ? 'block' : 'none';
        
        if (section.style.display === 'block') {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// تأثيرات إضافية للتفاعل
document.addEventListener('DOMContentLoaded', function() {
    // تأثير الكتابة التدريجية للعنوان الرئيسي
    const mainTitle = document.querySelector('header h1');
    if (mainTitle) {
        const text = mainTitle.textContent;
        mainTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                mainTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // تأثير الجسيمات في الخلفية
    createParticles();
});

// دالة إنشاء تأثير الجسيمات
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// دالة تحديث الوقت في شريط الأخبار
function updateNewsTime() {
    const now = new Date();
    const timeString = now.toLocaleString('ar-IQ', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const ticker = document.querySelector('.ticker-content span:last-child');
    if (ticker) {
        const originalText = ticker.textContent;
        ticker.textContent = `${timeString} • ${originalText}`;
    }
}

// تحديث الوقت كل دقيقة
setInterval(updateNewsTime, 60000);
updateNewsTime(); // تحديث فوري عند تحميل الصفحة

