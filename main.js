/* ===========================================
   دراجو الحمدانية — Main JavaScript
   File   : main.js
   Loaded : index.html (end of <body>)
=========================================== */

document.addEventListener('DOMContentLoaded', function() {

    // ===================================
    // إخفاء صفحة التحميل
    // ===================================
    setTimeout(function() {
      const loader = document.getElementById('page-loader');
      if (loader) { loader.classList.add('hidden'); }
    }, 2000);

    // ===================================
    // الوضع الليلي — حفظ في LocalStorage
    // ===================================
    const toggleBtn = document.getElementById('dark-toggle');
    const darkIcon  = document.getElementById('dark-icon');
    const html      = document.documentElement;

    // تطبيق التفضيل المحفوظ
    if (localStorage.getItem('theme') === 'dark' ||
       (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      html.classList.add('dark');
      if (darkIcon) { darkIcon.className = 'fas fa-sun'; }
    }

    if (toggleBtn) {
      toggleBtn.addEventListener('click', function() {
        html.classList.toggle('dark');
        const isDark = html.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        if (darkIcon) { darkIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon'; }
      });
    }

    // ===================================
    // شريط التقدم
    // ===================================
    function updateProgress() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollH   = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct       = scrollH > 0 ? (scrollTop / scrollH) * 100 : 0;
      const bar       = document.getElementById('progress-bar');
      if (bar) bar.style.width = pct + '%';
    }
    window.addEventListener('scroll', updateProgress, { passive: true });

    // ===================================
    // Sticky Nav + تمييز القسم النشط
    // ===================================
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function onScroll() {
      // scrolled class
      if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 30);
      }
      // back-to-top
      const btt = document.getElementById('back-to-top');
      if (btt) btt.classList.toggle('visible', window.scrollY > 400);
      // تمييز القسم النشط
      let current = '';
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
      });
      navLinks.forEach(lnk => {
        const href = lnk.getAttribute('href');
        lnk.classList.toggle('active', href === '#' + current);
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ===================================
    // قائمة الهاتف
    // ===================================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');

    function openMobileMenu() {
      if (mobileMenu) mobileMenu.classList.add('open');
      if (mobileOverlay) mobileOverlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
    window.closeMobileMenu = function() {
      if (mobileMenu) mobileMenu.classList.remove('open');
      if (mobileOverlay) mobileOverlay.classList.add('hidden');
      document.body.style.overflow = '';
    };
    if (hamburger) hamburger.addEventListener('click', openMobileMenu);

    // ===================================
    // Parallax في Hero
    // ===================================
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    window.addEventListener('mousemove', function(e) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      parallaxLayers.forEach(layer => {
        const speed = parseFloat(layer.dataset.speed || '0.3');
        layer.style.transform = `translate(${dx * speed * 30}px, ${dy * speed * 30}px)`;
      });
    });

    // ===================================
    // Scroll Reveal
    // ===================================
    const revealEls = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => revealObs.observe(el));

    // ===================================
    // Counter Animation
    // ===================================
    const counters = document.querySelectorAll('[data-target]');
    const counterObs = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const dur    = 2000;
          const step   = target / (dur / 16);
          let current  = 0;
          const timer  = setInterval(function() {
            current += step;
            if (current >= target) {
              el.textContent = target + (target > 5 ? '+' : '');
              clearInterval(timer);
            } else {
              el.textContent = Math.floor(current);
            }
          }, 16);
          counterObs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObs.observe(c));

    // ===================================
    // فلاتر المعرض
    // ===================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.dataset.filter;
        galleryItems.forEach(item => {
          const show = filter === 'all' || item.dataset.cat === filter;
          item.style.display = show ? 'block' : 'none';
          if (show) {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
              item.style.transition = 'opacity 0.4s, transform 0.4s';
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          }
        });
      });
    });

    // ===================================
    // Lightbox
    // ===================================
    let currentImgIndex = 0;
    let visibleImages = [];

    window.openLightbox = function(img) {
      const lb    = document.getElementById('lightbox');
      const lbImg = document.getElementById('lightbox-img');
      if (!lb || !lbImg) return;
      // جمع الصور المرئية
      visibleImages = Array.from(document.querySelectorAll('.gallery-item:not([style*="display: none"]) .gallery-img'));
      currentImgIndex = visibleImages.indexOf(img);
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lb.classList.add('active');
      document.body.style.overflow = 'hidden';
    };
    window.closeLightbox = function() {
      const lb = document.getElementById('lightbox');
      if (lb) lb.classList.remove('active');
      document.body.style.overflow = '';
    };
    window.nextImage = function() {
      const lbImg = document.getElementById('lightbox-img');
      if (!lbImg || !visibleImages.length) return;
      currentImgIndex = (currentImgIndex + 1) % visibleImages.length;
      lbImg.style.opacity = '0';
      setTimeout(() => {
        lbImg.src = visibleImages[currentImgIndex].src;
        lbImg.alt = visibleImages[currentImgIndex].alt;
        lbImg.style.opacity = '1';
      }, 200);
    };
    window.prevImage = function() {
      const lbImg = document.getElementById('lightbox-img');
      if (!lbImg || !visibleImages.length) return;
      currentImgIndex = (currentImgIndex - 1 + visibleImages.length) % visibleImages.length;
      lbImg.style.opacity = '0';
      setTimeout(() => {
        lbImg.src = visibleImages[currentImgIndex].src;
        lbImg.alt = visibleImages[currentImgIndex].alt;
        lbImg.style.opacity = '1';
      }, 200);
    };
    // إغلاق بـ Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') { window.closeLightbox(); window.closeMobileMenu(); }
      if (e.key === 'ArrowLeft') window.nextImage();
      if (e.key === 'ArrowRight') window.prevImage();
    });
    // Lightbox image transition
    const lbImg = document.getElementById('lightbox-img');
    if (lbImg) {
      lbImg.style.transition = 'opacity 0.25s ease';
      lbImg.style.opacity = '1';
    }

    // ===================================
    // Accordion FAQ
    // ===================================
    window.toggleFaq = function(questionEl) {
      const item   = questionEl.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');
      // إغلاق الكل
      document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').classList.remove('open');
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.classList.add('open');
      }
    };

    // ===================================
    // استمارة الانضمام + التحقق + إرسال Telegram
    // ===================================
    const TELEGRAM_BOT_TOKEN = '8293770629:AAHgYwDabWA4YJXwLYLPfcSY43-SwJe2cS8'; // استبدل بـ Token البوت الخاص بك
    const TELEGRAM_CHAT_ID = '5709332539'; // استبدل بـ Chat ID الخاص بك

    async function sendToTelegram(formData) {
      try {
        const message = `
📝 طلب انضمام جديد - دراجو الحمدانية
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 الاسم: ${formData.name}
🎂 العمر: ${formData.age}
📱 الهاتف: ${formData.phone}
📍 المنطقة: ${formData.area}
🚴 نوع الدراجة: ${formData.bike}
📊 الخبرة: ${formData.experience}
✅ فعاليات سابقة: ${formData.prevEvents}
💬 السبب: ${formData.reason}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏰ التاريخ والوقت: ${new Date().toLocaleString('ar-IQ')}
        `;

        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'HTML'
          })
        });

        return response.ok;
      } catch (error) {
        console.error('خطأ في الإرسال:', error);
        return false;
      }
    }

    const form = document.getElementById('join-form');
    if (form) {
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        if (validateForm()) {
          const btn = form.querySelector('button[type="submit"]');
          if (btn) {
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
            btn.disabled = true;
          }

          // جمع بيانات الاستمارة
          const formData = {
            name: document.getElementById('f-name').value,
            age: document.getElementById('f-age').value,
            phone: document.getElementById('f-phone').value,
            area: document.getElementById('f-area').value,
            bike: document.getElementById('f-bike').value,
            experience: document.getElementById('f-exp').value,
            prevEvents: document.querySelector('input[name="prev-events"]:checked')?.value || 'لم يتم الاختيار',
            reason: document.getElementById('f-reason').value || 'لم يتم الإدخال'
          };

          // إرسال إلى Telegram
          const sent = await sendToTelegram(formData);

          setTimeout(() => {
            form.style.display = 'none';
            const msg = document.getElementById('success-message');
            if (msg) msg.classList.remove('hidden');
            document.getElementById('join').scrollIntoView({ behavior: 'smooth' });
          }, 1500);
        }
      });
    }

    function setError(fieldId, errId, show) {
      const field = document.getElementById(fieldId);
      const err   = document.getElementById(errId);
      if (!field || !err) return;
      field.classList.toggle('error', show);
      err.classList.toggle('show', show);
    }

    function validateForm() {
      let valid = true;
      // الاسم
      const name = document.getElementById('f-name');
      if (!name || name.value.trim().length < 3) { setError('f-name','e-name',true); valid=false; }
      else setError('f-name','e-name',false);
      // العمر
      const age = document.getElementById('f-age');
      const ageV = parseInt(age ? age.value : 0);
      if (!age || isNaN(ageV) || ageV < 10 || ageV > 70) { setError('f-age','e-age',true); valid=false; }
      else setError('f-age','e-age',false);
      // الهاتف
      const phone = document.getElementById('f-phone');
      const phoneR = /^[0-9+\-\s]{7,15}$/;
      if (!phone || !phoneR.test(phone.value.trim())) { setError('f-phone','e-phone',true); valid=false; }
      else setError('f-phone','e-phone',false);
      // المنطقة
      const area = document.getElementById('f-area');
      if (!area || area.value.trim().length < 2) { setError('f-area','e-area',true); valid=false; }
      else setError('f-area','e-area',false);
      // نوع الدراجة
      const bike = document.getElementById('f-bike');
      if (!bike || !bike.value) { setError('f-bike','e-bike',true); valid=false; }
      else setError('f-bike','e-bike',false);
      // الموافقة
      const agree = document.getElementById('f-agree');
      if (!agree || !agree.checked) { setError('f-agree','e-agree',true); valid=false; }
      else setError('f-agree','e-agree',false);

      return valid;
    }

    // مسح الخطأ عند الكتابة
    ['f-name','f-age','f-phone','f-area','f-bike'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', function() {
        this.classList.remove('error');
        const errId = 'e-' + id.replace('f-','');
        const err = document.getElementById(errId);
        if (err) err.classList.remove('show');
      });
    });

    window.resetForm = function() {
      const form = document.getElementById('join-form');
      const msg  = document.getElementById('success-message');
      if (form) { form.reset(); form.style.display = 'block'; }
      if (msg)  { msg.classList.add('hidden'); }
    };

  }); // END DOMContentLoaded

  // ===================================
  // حماية ضد أدوات المطور (Developer Tools Protection)
  // ===================================
  
  // منع فتح أدوات المطور بـ F12
  document.addEventListener('keydown', function(event) {
    if (event.key === 'F12') {
      event.preventDefault();
      return false;
    }
    // منع Ctrl+Shift+I (Inspect)
    if (event.ctrlKey && event.shiftKey && event.key === 'I') {
      event.preventDefault();
      return false;
    }
    // منع Ctrl+Shift+J (Console)
    if (event.ctrlKey && event.shiftKey && event.key === 'J') {
      event.preventDefault();
      return false;
    }
    // منع Ctrl+Shift+C (Inspect Element)
    if (event.ctrlKey && event.shiftKey && event.key === 'C') {
      event.preventDefault();
      return false;
    }
  });

  // منع الضغط على الزر الأيمن (Right Click)
  document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    return false;
  });

  // منع فتح أدوات المطور من خلال الضغط على Ctrl+Shift+Delete
  document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.shiftKey && event.key === 'Delete') {
      event.preventDefault();
      return false;
    }
  });

  // كشف محاولات فتح أدوات المطور
  const devtools = { open: false, orientation: null };
  const threshold = 160;

  setInterval(function() {
    if (window.outerHeight - window.innerHeight > threshold ||
        window.outerWidth - window.innerWidth > threshold) {
      if (!devtools.open) {
        devtools.open = true;
        console.clear();
        document.body.innerHTML = '<div style="display:flex; align-items:center; justify-content:center; height:100vh; background:#0F172A; color:#fff; font-family:Cairo; text-align:center; flex-direction:column;"><h1>⚠️ تحذير أمني</h1><p>لا يُسمح باستخدام أدوات المطور على هذا الموقع</p><p>يرجى إغلاق أدوات المطور والمحاولة مجدداً</p></div>';
      }
    } else {
      devtools.open = false;
    }
  }, 500);

  // منع استخدام console
  (function() {
    const noop = function() {};
    const methods = ['log', 'debug', 'info', 'warn', 'error', 'assert', 'dir', 'clear', 'profile', 'profileEnd'];
    methods.forEach(method => {
      console[method] = noop;
    });
  })();
