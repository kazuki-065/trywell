// ===== DOM要素の取得 =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');
const contactForm = document.getElementById('contactForm');
const navLinks = document.querySelectorAll('.nav-menu a');

// ===== モバイルメニューのトグル =====
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // ハンバーガーアイコンのアニメーション
    const spans = menuToggle.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) span.style.transform = 'rotate(45deg) translateY(10px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            span.style.transform = '';
            span.style.opacity = '';
        }
    });
});

// ===== ナビゲーションリンククリック時の処理 =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // ページ内リンクの場合のみ
        if (link.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            
            // モバイルメニューを閉じる
            navMenu.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
            
            // スムーズスクロール
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== スクロール時のナビゲーションバー効果 =====
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // スクロール時に影を追加
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// ===== アクティブなナビゲーションリンクのハイライト =====
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===== お問い合わせフォームの送信処理 =====
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // フォームデータの取得
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    // バリデーション
    if (!name || !email || !message) {
        alert('必須項目をすべて入力してください。');
        return;
    }
    
    // メールアドレスの簡易バリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('正しいメールアドレスを入力してください。');
        return;
    }
    
    // 実際のフォーム送信処理（ここでは仮の処理）
    console.log('フォームデータ:', {
        name,
        email,
        phone,
        message
    });
    
    // 成功メッセージ
    alert(`お問い合わせありがとうございます、${name}様。\n\n送信内容を確認次第、ご連絡させていただきます。`);
    
    // フォームのリセット
    contactForm.reset();
    
    // 注意: 実際の運用では、ここでバックエンドAPIにデータを送信するか、
    // メールサービス（EmailJS、Formspreeなど）を利用する必要があります。
});

// ===== スクロールアニメーション（Intersection Observer） =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象の要素
const animatedElements = document.querySelectorAll('.value-card, .service-card, .mv-card, .info-item');

animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ===== ページ読み込み時の初期化 =====
document.addEventListener('DOMContentLoaded', () => {
    // スムーズにページが表示されるようにフェードイン
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // 初期のナビゲーションハイライトを設定
    highlightNavigation();
});

// ===== スクロールトップボタン（オプション） =====
// ページに戻るボタンを追加する場合は、HTMLに以下を追加してください：
// <button id="scrollTopBtn" class="scroll-top-btn">↑</button>

const scrollTopBtn = document.createElement('button');
scrollTopBtn.id = 'scrollTopBtn';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(scrollTopBtn);

// スクロールトップボタンの表示/非表示
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

// スクロールトップボタンのクリック処理
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'scale(1)';
});
