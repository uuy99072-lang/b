// تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// تهيئة الموقع
function initializeWebsite() {
    initThemeToggle();
    initSmoothScrolling();
    initMobileMenu();
    initGradeFilter();
    initSemesterTabs();
    initNewsTickerAnimation();
    initScrollEffects();
    initActiveNavigation();
    initResponsiveFeatures();
    initAccessibilityFeatures();
    loadUserPreferences();
}

// تبديل الوضع المظلم والنهاري
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // تحميل الوضع المحفوظ
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // تأثير انتقالي سلس
            document.body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
            
            showNotification(`تم التبديل إلى الوضع ${newTheme === 'dark' ? 'المظلم' : 'النهاري'}`, 'success');
        });
    }
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// التمرير السلس المحسن
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                // تمرير سلس مع تأثير easing مخصص
                smoothScrollTo(targetPosition, 800);
                
                // تحديث URL بدون إعادة تحميل الصفحة
                history.pushState(null, null, targetId);
            }
        });
    });
}

function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// القائمة المحمولة المحسنة
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const body = document.body;
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // إغلاق القائمة عند النقر على رابط
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (nav.classList.contains('active')) {
                    toggleMobileMenu();
                }
            });
        });
        
        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
                if (nav.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
        
        // إغلاق القائمة عند الضغط على Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    }
    
    function toggleMobileMenu() {
        nav.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // تغيير الأيقونة مع تأثير دوران
        const icon = mobileToggle.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.style.transform = 'rotate(90deg)';
            setTimeout(() => {
                icon.className = 'fas fa-times';
                icon.style.transform = 'rotate(0deg)';
            }, 150);
        } else {
            icon.style.transform = 'rotate(-90deg)';
            setTimeout(() => {
                icon.className = 'fas fa-bars';
                icon.style.transform = 'rotate(0deg)';
            }, 150);
        }
    }
}

// فلترة الصفوف المحسنة
function initGradeFilter() {
    const gradeButtons = document.querySelectorAll('.grade-btn');
    const resultItems = document.querySelectorAll('.result-item');
    
    gradeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة الفئة النشطة من جميع الأزرار
            gradeButtons.forEach(btn => btn.classList.remove('active'));
            // إضافة الفئة النشطة للزر المحدد
            this.classList.add('active');
            
            const selectedGrade = this.getAttribute('data-grade');
            
            resultItems.forEach((item, index) => {
                if (selectedGrade === 'all' || item.getAttribute('data-grade') === selectedGrade) {
                    item.style.display = 'block';
                    // تأخير الحركة لكل عنصر
                    setTimeout(() => {
                        item.style.animation = 'fadeInUp 0.5s ease forwards';
                    }, index * 100);
                } else {
                    item.style.animation = 'fadeOut 0.3s ease forwards';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
            
            showNotification(`تم عرض نتائج ${selectedGrade === 'all' ? 'جميع الصفوف' : 'الصف ' + selectedGrade}`, 'info');
        });
    });
}

// تبديل الفصول الدراسية المحسن
function initSemesterTabs() {
    const semesterTabs = document.querySelectorAll('.semester-tab');
    const semesterContents = document.querySelectorAll('.semester-content');
    
    semesterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // إزالة الفئة النشطة من جميع التبويبات
            semesterTabs.forEach(t => t.classList.remove('active'));
            semesterContents.forEach(content => content.classList.remove('active'));
            
            // إضافة الفئة النشطة للتبويب المحدد
            this.classList.add('active');
            
            const selectedSemester = this.getAttribute('data-semester');
            const targetContent = document.querySelector(`[data-semester="${selectedSemester}"].semester-content`);
            
            if (targetContent) {
                targetContent.classList.add('active');
                targetContent.style.animation = 'fadeIn 0.5s ease';
            }
            
            const semesterNames = {
                'first': 'الأول',
                'second': 'الثاني',
                'third': 'الثالث'
            };
            
            showNotification(`تم عرض نتائج الفصل ${semesterNames[selectedSemester]}`, 'info');
        });
    });
}

// حركة شريط الأخبار المحسنة
function initNewsTickerAnimation() {
    const tickerText = document.querySelector('.ticker-text');
    
    if (tickerText) {
        // إيقاف الحركة عند التمرير فوق الشريط
        tickerText.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        // استئناف الحركة عند مغادرة الشريط
        tickerText.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
        
        // إيقاف الحركة عند التركيز (للوصولية)
        tickerText.addEventListener('focus', function() {
            this.style.animationPlayState = 'paused';
        });
        
        tickerText.addEventListener('blur', function() {
            this.style.animationPlayState = 'running';
        });
    }
}

// تأثيرات التمرير المحسنة
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // تأثيرات خاصة للإحصائيات
                if (entry.target.classList.contains('stat')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // مراقبة العناصر للحركة
    const animatedElements = document.querySelectorAll('.result-card, .news-card, .stat, .about-text, .director-info, .mission, .vision, .resource-card, .parent-card, .quick-link-card');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // تأثير الهيدر عند التمرير
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // إخفاء/إظهار الهيدر عند التمرير
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// تحريك الأرقام في الإحصائيات
function animateCounter(element) {
    const target = element.querySelector('h3');
    const finalNumber = parseInt(target.textContent.replace(/[^\d]/g, ''));
    const duration = 2000;
    const increment = finalNumber / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= finalNumber) {
            current = finalNumber;
            clearInterval(timer);
        }
        
        let displayNumber = Math.floor(current);
        if (target.textContent.includes('+')) {
            displayNumber += '+';
        }
        if (target.textContent.includes('%')) {
            displayNumber += '%';
        }
        
        target.textContent = displayNumber;
    }, 16);
}

// التنقل النشط المحسن
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('.header').offsetHeight;
            
            if (window.scrollY >= (sectionTop - headerHeight - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// الميزات المتجاوبة
function initResponsiveFeatures() {
    // تحديد حجم الشاشة
    function updateScreenSize() {
        const screenSize = window.innerWidth;
        document.documentElement.style.setProperty('--screen-width', screenSize + 'px');
        
        // تحديث تخطيط الشبكة بناءً على حجم الشاشة
        const grids = document.querySelectorAll('.news-grid, .results-grid, .resources-grid');
        grids.forEach(grid => {
            if (screenSize < 768) {
                grid.style.gridTemplateColumns = '1fr';
            } else if (screenSize < 1024) {
                grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            } else {
                grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(350px, 1fr))';
            }
        });
    }
    
    window.addEventListener('resize', updateScreenSize);
    updateScreenSize();
    
    // دعم اللمس للأجهزة المحمولة
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // تحسين التفاعل باللمس
        const cards = document.querySelectorAll('.result-card, .news-card, .resource-card');
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            });
        });
    }
}

// ميزات الوصولية
function initAccessibilityFeatures() {
    // دعم التنقل بلوحة المفاتيح
    document.addEventListener('keydown', function(e) {
        // التنقل بين العناصر القابلة للتركيز
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // تحسين قارئ الشاشة
    const images = document.querySelectorAll('img:not([alt])');
    images.forEach(img => {
        img.setAttribute('alt', 'صورة من موقع مدرسة الحمدانية');
    });
    
    // إضافة تسميات للأزرار
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        const text = button.textContent.trim();
        if (text) {
            button.setAttribute('aria-label', text);
        }
    });
}

// تحميل تفضيلات المستخدم
function loadUserPreferences() {
    // تحميل حجم الخط المفضل
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        document.documentElement.style.fontSize = savedFontSize;
    }
    
    // تحميل تفضيلات الحركة
    const reduceMotion = localStorage.getItem('reduceMotion') === 'true';
    if (reduceMotion) {
        document.documentElement.style.setProperty('--transition-fast', '0s');
        document.documentElement.style.setProperty('--transition-normal', '0s');
        document.documentElement.style.setProperty('--transition-slow', '0s');
    }
}

// تأثيرات إضافية للبطاقات
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.result-card, .news-card, .resource-card, .parent-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // تأثير النقر
        card.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-5px) scale(0.98)';
        });
        
        card.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
    });
}

// تحميل البيانات الديناميكية
function loadDynamicContent() {
    // محاكاة تحميل الأخبار من API
    const newsContainer = document.querySelector('.news-grid');
    if (newsContainer) {
        // يمكن إضافة كود لتحميل الأخبار من API هنا
        console.log('تم تحميل الأخبار بنجاح');
    }
    
    // محاكاة تحميل النتائج من API
    const resultsContainer = document.querySelector('.results-grid');
    if (resultsContainer) {
        // يمكن إضافة كود لتحميل النتائج من API هنا
        console.log('تم تحميل النتائج بنجاح');
    }
}

// إضافة وظائف إضافية للنتائج
function enhanceResultsPages() {
    // البحث في النتائج
    const searchInput = document.querySelector('#results-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const resultItems = document.querySelectorAll('.result-item');
            
            resultItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.3s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // طباعة النتائج
    const printButtons = document.querySelectorAll('.print-results');
    printButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.print();
        });
    });
}

// إشعارات للمستخدم
function showNotification(message, type = 'info') {
    // إزالة الإشعارات السابقة
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = getNotificationIcon(type);
    notification.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
        <button class="notification-close" aria-label="إغلاق الإشعار">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 20px;
        background: var(--bg-card, white);
        color: var(--text-primary, #374151);
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(-100%);
        transition: all 0.3s ease;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        max-width: 400px;
        border-left: 4px solid ${getNotificationColor(type)};
    `;
    
    document.body.appendChild(notification);
    
    // إضافة مستمع للإغلاق
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', function() {
        hideNotification(notification);
    });
    
    // عرض الإشعار
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // إخفاء الإشعار تلقائياً
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'fas fa-check-circle',
        'error': 'fas fa-exclamation-circle',
        'warning': 'fas fa-exclamation-triangle',
        'info': 'fas fa-info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        'success': '#10b981',
        'error': '#ef4444',
        'warning': '#f59e0b',
        'info': '#3b82f6'
    };
    return colors[type] || colors.info;
}

function hideNotification(notification) {
    notification.style.transform = 'translateX(-100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// تحسين الأداء
function optimizePerformance() {
    // تأخير تحميل الصور
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // تحسين الأداء للأجهزة الضعيفة
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.documentElement.style.setProperty('--transition-fast', '0.1s');
        document.documentElement.style.setProperty('--transition-normal', '0.2s');
    }
}

// معالجة الأخطاء المحسنة
window.addEventListener('error', function(e) {
    console.error('خطأ في الموقع:', e.error);
    showNotification('حدث خطأ غير متوقع. يرجى إعادة تحميل الصفحة.', 'error');
});

// تشغيل الوظائف عند تحميل الصفحة
window.addEventListener('load', function() {
    addCardHoverEffects();
    loadDynamicContent();
    enhanceResultsPages();
    optimizePerformance();
    
    // إضافة تأثير التحميل
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        showNotification('مرحباً بكم في موقع مدرسة الحمدانية الابتدائية المختلطة', 'success');
    }, 100);
});

// دعم PWA (Progressive Web App)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker تم تسجيله بنجاح:', registration.scope);
            })
            .catch(function(error) {
                console.log('فشل في تسجيل ServiceWorker:', error);
            });
    });
}

// دعم الوضع غير المتصل
window.addEventListener('online', function() {
    showNotification('تم استعادة الاتصال بالإنترنت', 'success');
});

window.addEventListener('offline', function() {
    showNotification('لا يوجد اتصال بالإنترنت. بعض الميزات قد لا تعمل.', 'warning');
});

// حفظ حالة النموذج تلقائياً
function autoSaveForm() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                localStorage.setItem(`form_${form.id}_${input.name}`, input.value);
            });
            
            // استعادة القيم المحفوظة
            const savedValue = localStorage.getItem(`form_${form.id}_${input.name}`);
            if (savedValue) {
                input.value = savedValue;
            }
        });
    });
}

// تشغيل حفظ النماذج
document.addEventListener('DOMContentLoaded', autoSaveForm);

// إضافة دعم للاختصارات
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K للبحث
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('#search-input');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Ctrl/Cmd + D لتبديل الوضع المظلم
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.click();
        }
    }
});

// تحسين تجربة المستخدم للأجهزة المحمولة
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.body.classList.add('mobile-device');
    
    // منع التكبير عند التركيز على الحقول
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            const viewport = document.querySelector('meta[name=viewport]');
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        });
        
        input.addEventListener('blur', function() {
            const viewport = document.querySelector('meta[name=viewport]');
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
        });
    });
}

