// تفعيل قائمة التنقل المتجاوبة
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
      document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function() {
        // بدون منع الرابط
    });
});
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function() {
        // بدون منع الرابط
    });
});

    }
    
    // العد التنازلي للانتخابات
    function updateCountdown() {
        // تاريخ الانتخابات (15 مايو 2025)
        const electionDate = new Date('2025-11-11T00:00:00').getTime();
        const now = new Date().getTime();
        const distance = electionDate - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            document.getElementById('countdown').innerHTML = '<h3>انتهت فترة الانتخابات</h3>';
        }
    }
    
    // تحديث العد التنازلي كل ثانية
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // تأثير التمرير السلس
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
    
    // تأثير الظهور عند التمرير
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // إضافة تأثير الظهور للعناصر
    document.querySelectorAll('.biography-card, .program-card, .news-card, .testimonial-card, .media-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // تفعيل أزرار الحملة
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.textContent.includes('انضم للحملة')) {
                e.preventDefault();
                alert('شكراً لاهتمامك! سيتم التواصل معك قريباً لتفاصيل الانضمام للحملة.');
            }
        });
    });
    
    document.querySelectorAll('.btn-secondary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.textContent.includes('تعرف على البرنامج')) {
                e.preventDefault();
                document.querySelector('#program').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // تحديث رابط تحالف العزم
    document.querySelectorAll('a[href="#"]').forEach(link => {
        if (link.textContent.includes('زيارة موقع التحالف')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                alert('موقع تحالف العزم قيد الإنشاء. سيتم إطلاقه قريباً.');
            });
        }
    });
    
    // تحديث روابط "اقرأ المزيد"
    document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('المقال الكامل متوفر على صفحة الأخبار الرسمية.');
        });
    });
    
    // تحديث روابط وسائل التواصل الاجتماعي
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').className;
            let message = '';
            
            if (platform.includes('facebook')) {
                message = 'صفحة الفيسبوك قيد الإنشاء';
            } else if (platform.includes('instagram')) {
                message = 'حساب الإنستغرام قيد الإنشاء';
            } else if (platform.includes('twitter')) {
                message = 'حساب تويتر قيد الإنشاء';
            } else if (platform.includes('tiktok')) {
                message = 'حساب تيك توك قيد الإنشاء';
            }
            
            alert(message + '. سيتم إطلاقه قريباً.');
        });
    });
    
    // تحديث نموذج Google Forms
    const googleFormContainer = document.querySelector('.google-form-container');
    if (googleFormContainer) {
        googleFormContainer.innerHTML = `
            <div style="padding: 2rem; text-align: center; color: #2d5a27;">
                <h4>نموذج التواصل</h4>
                <p>يرجى استبدال هذا النص برابط Google Forms الخاص بك</p>
                <p style="font-size: 0.9rem; margin-top: 1rem;">
                    لإضافة نموذج Google Forms:
                    <br>1. أنشئ نموذجاً في Google Forms
                    <br>2. انقر على "إرسال" ثم اختر رمز "&lt;&gt;"
                    <br>3. انسخ الكود واستبدل محتوى iframe أعلاه
                </p>
                <div style="margin-top: 2rem;">
                    <button onclick="alert('يرجى إضافة رابط Google Forms الخاص بك')" 
                            style="background: #2d5a27; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                        نموذج مؤقت للتواصل
                    </button>
                </div>
            </div>
        `;
    }
    
    // إضافة تأثيرات بصرية للبطاقات
    document.querySelectorAll('.biography-card, .program-card, .news-card, .testimonial-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // تحديث معرض الصور
    document.querySelectorAll('.media-item').forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('h4').textContent;
            
            // إنشاء نافذة عرض الصورة
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                cursor: pointer;
            `;
            
            const modalImg = document.createElement('img');
            modalImg.src = img.src;
            modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            `;
            
            const modalTitle = document.createElement('div');
            modalTitle.textContent = title;
            modalTitle.style.cssText = `
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                color: white;
                font-size: 1.2rem;
                font-weight: bold;
                text-align: center;
            `;
            
            modal.appendChild(modalImg);
            modal.appendChild(modalTitle);
            document.body.appendChild(modal);
            
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
        });
    });
    
    // إضافة تأثير التحميل
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // تحديث شريط التقدم عند التمرير
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        // يمكن إضافة شريط تقدم هنا إذا رغبت
    });
});

// دالة لتحديث المحتوى الديناميكي
function updateDynamicContent() {
    // يمكن استخدام هذه الدالة لتحديث المحتوى من مصادر خارجية
    console.log('تم تحميل الموقع بنجاح');
}

// تشغيل الدالة عند تحميل الصفحة
updateDynamicContent();

