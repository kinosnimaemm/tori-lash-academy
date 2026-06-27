// Background Interactive Canvas (Starfield & Luxury Gold Dust)
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
const particleCount = 120;

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});
resizeCanvas();

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.alpha = Math.random() * 0.6 + 0.2;
        // 70% gold dust, 30% silver stars
        this.color = Math.random() > 0.3 ? '212, 175, 55' : '240, 240, 242';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.fill();
        
        // Extra glow for larger gold particles
        if (this.size > 1.8) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.alpha * 0.3})`;
            ctx.fill();
        }
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}
initParticles();

function animateCanvas() {
    ctx.clearRect(0, 0, width, height);
    
    // Slight dark overlay for trailing effect
    ctx.fillStyle = 'rgba(10, 10, 12, 0.3)';
    ctx.fillRect(0, 0, width, height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animateCanvas);
}
animateCanvas();


// Navigation & Slides Logic
const navItems = document.querySelectorAll('.nav-item');
const slides = document.querySelectorAll('.slide');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const prevText = document.getElementById('prev-text');
const nextText = document.getElementById('next-text');
const slideStatus = document.getElementById('slide-status');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const slidesWrapper = document.getElementById('slides-wrapper');

let currentSlideIndex = 0;
const totalSlides = slides.length;

// Slide Titles for Enhanced Next/Prev Button Preview
const slideTitles = [
    "Вступ до професії",
    "Історія: Голлівуд",
    "Японські технології",
    "Основи процедури",
    "Стартовий набір",
    "Робоче місце",
    "Екзаменаційний Квіз"
];

function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;

    // Update Nav Items
    navItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });

    // Update Slides
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });

    currentSlideIndex = index;
    
    // Reset scroll position in wrapper
    slidesWrapper.scrollTo({ top: 0, behavior: 'smooth' });

    // Update UI elements
    slideStatus.textContent = navItems[index].querySelector('span').textContent;
    
    const progressPercent = Math.round(((index + 1) / totalSlides) * 100);
    progressFill.style.width = `${progressPercent}%`;
    progressText.textContent = `${progressPercent}%`;

    // Update Controls & Next/Prev text previews
    btnPrev.disabled = index === 0;
    if (index > 0) {
        prevText.textContent = `Попередній: ${slideTitles[index - 1]}`;
    } else {
        prevText.textContent = 'Попередній';
    }

    if (index === totalSlides - 1) {
        btnNext.disabled = true;
        nextText.textContent = 'Курс завершено';
    } else {
        btnNext.disabled = false;
        nextText.textContent = `Наступний: ${slideTitles[index + 1]}`;
    }

    // Close mobile sidebar if open
    document.getElementById('sidebar').classList.remove('active');
}

// Event Listeners for Sidebar
navItems.forEach((item, index) => {
    item.addEventListener('click', () => goToSlide(index));
});

// Event Listeners for Bottom Buttons
btnPrev.addEventListener('click', () => goToSlide(currentSlideIndex - 1));
btnNext.addEventListener('click', () => goToSlide(currentSlideIndex + 1));

// Keyboard Navigation for Max Ease of Use
window.addEventListener('keydown', (e) => {
    if (document.getElementById('modal-overlay').classList.contains('active')) {
        if (e.key === 'Escape') {
            document.getElementById('modal-overlay').classList.remove('active');
        }
        return;
    }
    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        goToSlide(currentSlideIndex + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToSlide(currentSlideIndex - 1);
    }
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Utility Buttons
const btnFullscreen = document.getElementById('btn-fullscreen');
btnFullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => console.log(err));
        btnFullscreen.innerHTML = '<i class="fa-solid fa-compress"></i>';
    } else {
        document.exitFullscreen();
        btnFullscreen.innerHTML = '<i class="fa-solid fa-expand"></i>';
    }
});


// Starter Kit Interactive Data with Images & Blur Backgrounds
const toolsData = {
    glue: {
        title: "Професійний Клей",
        icon: '<i class="fa-solid fa-eye-dropper"></i>',
        image: 'tool_glue_1782541694923.jpg',
        description: "Клей — це основа довготривалого носіння вій. У роботі майстра використовуються склади на основі ціаноакрилату.",
        bullets: [
            "<strong>Швидкість зчіпки:</strong> Для початківців рекомендується клей із фіксацією 1.5 - 2 секунди, щоб встигнути піднести вію.",
            "<strong>Термін зберігання:</strong> Після відкриття клей зберігає властивості до 1.5 - 2 місяців. Зберігати в прохолодному, темному місці.",
            "<strong>Важливі умови:</strong> Клей чутливий до вологості (ідеал 40-60%) та температури (19-22°C)."
        ]
    },
    primer: {
        title: "Праймер та Знежирювач",
        icon: '<i class="fa-solid fa-spray-can-sparkles"></i>',
        image: 'tool_primer_1782541737358.jpg',
        description: "Обов'язкові препарати для підготовки натуральних вій перед нарощуванням. Забезпечують бездоганну гігієну та зчіпку.",
        bullets: [
            "<strong>Знежирювач (Cleanser):</strong> Видаляє залишки макіяжу, пилу та природного жиру з вій.",
            "<strong>Праймер (Primer):</strong> Розкриває лусочки волосини та додатково підсушує її для миттєвої дії клею.",
            "<strong>Правило:</strong> Уникайте потрапляння на слизову оболонку ока клієнта."
        ]
    },
    remover: {
        title: "Ремувер (Крем або Гель)",
        icon: '<i class="fa-solid fa-pump-soap"></i>',
        image: 'tool_remover_1782541792739.jpg',
        description: "Засіб для безпечного та делікатного зняття штучних вій без пошкодження натуральних.",
        bullets: [
            "<strong>Кремовий ремувер:</strong> Ідеальний для початківців. Густий, не розтікається і не потрапляє в очі. Час дії 3-5 хвилин.",
            "<strong>Гелевий ремувер:</strong> Діє швидше, але вимагає обережності, щоб не щипав очі.",
            "<strong>Спосіб застосування:</strong> Нанести мікробрашем на прикореневу зону, зачекати та м'яко стягнути вії пінцетом."
        ]
    },
    tweezers: {
        title: "Набір Пінцетів",
        icon: '<i class="fa-solid fa-utensils"></i>',
        image: 'tool_tweezers_1782541847907.jpg',
        description: "Головні ювелірні інструменти лешмейкера. Мають бути ідеально заточеними та зручно лежати в руці.",
        bullets: [
            "<strong>Прямий пінцет:</strong> Використовується лівою рукою (для правшів) для розсування та виділення однієї натуральної вії.",
            "<strong>Вигнутий пінцет (L-подібний):</strong> Робочий пінцет для захоплення штучної вії або формування пучка.",
            "<strong>Догляд:</strong> Пінцети легко пошкодити при падінні. Зберігайте в магнітному чохлі та дезінфікуйте після кожного клієнта."
        ]
    },
    accessories: {
        title: "Аксесуари (Камінь, Лунки)",
        icon: '<i class="fa-solid fa-cubes"></i>',
        image: 'tool_accessories_1782541885513.jpg',
        description: "Спеціальні поверхні для краплі клею, що зберігають його свіжим протягом тривалого часу.",
        bullets: [
            "<strong>Нефритовий камінь:</strong> Природний холод каменю уповільнює випаровування клею. Крапля довше залишається рідкою.",
            "<strong>Пластикові лунки:</strong> Завдяки сферичній формі мінімізують площу контакту клею з повітрям.",
            "<strong>Лайфхак:</strong> Наклеюйте на камінь фольгу або скотч, щоб не відмивати його щоразу."
        ]
    },
    patches: {
        title: "Гідрогелеві Патчі",
        icon: '<i class="fa-solid fa-shield-halved"></i>',
        image: 'tool_patches_1782541921510.jpg',
        description: "Використовуються для ізоляції нижніх вій під час процедури, щоб вони не склеїлися з верхніми.",
        bullets: [
            "<strong>Комфорт:</strong> Сучасні патчі мають зволожувальний ефект та заспокоюють шкіру під очима.",
            "<strong>Безпека:</strong> Білосніжний фон патчів ідеально контрастує з темними віями, зменшуючи навантаження на очі майстра.",
            "<strong>Постановка:</strong> Патч фіксується з відступом 0.5-1 мм від лінії росту нижніх вій, не торкаючись слизової."
        ]
    },
    microbrushes: {
        title: "Мікробраші та Щіточки",
        icon: '<i class="fa-solid fa-wand-magic"></i>',
        image: 'tool_microbrushes_1782541968929.jpg',
        description: "Економічні витратні матеріали для точкового нанесення рідин та прочісування вій.",
        bullets: [
            "<strong>Мікробраші:</strong> Мають ворсинки, що не поглинають зайву рідину. Ідеальні для нанесення праймера та ремувера.",
            "<strong>Щіточки (щітки-йоржики):</strong> Використовуються майстром для розчісування вій під час роботи. Даруються клієнту після процедури."
        ]
    },
    lashes: {
        title: "Палетки вій (Мікси)",
        icon: '<i class="fa-solid fa-spa"></i>',
        image: 'tool_lashes_1782542034432.jpg',
        description: "Виготовляються з високоякісного гіпоалергенного синтетичного волокна (моноволокна).",
        bullets: [
            "<strong>Товщина:</strong> Для класики використовують вії 0.10 - 0.15 мм, для об'ємів — 0.07 - 0.05 мм.",
            "<strong>Вигини:</strong> Найпопулярніші вигини C (натуральний), D (підкручений) та L (для азіатського розрізу або стрілок).",
            "<strong>Мікси:</strong> Новачкам вигідно купувати палетки-мікси, де в одній коробочці зібрані довжини від 8 до 14 мм."
        ]
    },
    protection: {
        title: "Захист та Гігієна",
        icon: '<i class="fa-solid fa-mask"></i>',
        image: 'tool_protection_1782542085615.jpg',
        description: "Забезпечення безпеки майстра та клієнта, що є стандартом преміальних салонів.",
        bullets: [
            "<strong>Маска майстра:</strong> Захищає дихальні шляхи від шкідливих випаровувань клею під час довгої роботи.",
            "<strong>Антисептик:</strong> Обов'язкова обробка рук та інструментів перед контактом з обличчям клієнта.",
            "<strong>Шапочка:</strong> Ховає волосся клієнта, забезпечуючи стерильність та акуратність."
        ]
    }
};

// Modal Interactive Flow
const modalOverlay = document.getElementById('modal-overlay');
const modalOverlayBg = document.getElementById('modal-overlay-bg');
const modalClose = document.getElementById('modal-close');
const modalIcon = document.getElementById('modal-icon');
const modalTitle = document.getElementById('modal-title');
const modalBannerImg = document.getElementById('modal-banner-img');
const modalBody = document.getElementById('modal-body');

const toolCards = document.querySelectorAll('.tool-card');
const filterBtns = document.querySelectorAll('.filter-btn');

toolCards.forEach(card => {
    card.addEventListener('click', () => {
        const toolKey = card.getAttribute('data-tool');
        const data = toolsData[toolKey];
        if (!data) return;

        modalIcon.innerHTML = data.icon;
        modalTitle.textContent = data.title;
        
        // Dynamic image updates
        modalBannerImg.src = data.image;
        modalOverlayBg.style.backgroundImage = `url('${data.image}')`;

        let bulletsHtml = '<ul>';
        data.bullets.forEach(b => {
            bulletsHtml += `<li><i class="fa-solid fa-wand-magic-sparkles"></i><div>${b}</div></li>`;
        });
        bulletsHtml += '</ul>';

        modalBody.innerHTML = `<p>${data.description}</p>${bulletsHtml}`;
        modalOverlay.classList.add('active');
    });
});

modalClose.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay || e.target === modalOverlayBg) {
        modalOverlay.classList.remove('active');
    }
});

// Starter Kit Filters
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        toolCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});


// Quiz Execution Flow
const quizQuestion = document.getElementById('quiz-question');
const quizOptionsContainer = document.getElementById('quiz-options');
const quizProgress = document.getElementById('quiz-progress');
const quizScore = document.getElementById('quiz-score');
const quizContent = document.getElementById('quiz-content');
const quizResults = document.getElementById('quiz-results');
const btnRestartQuiz = document.getElementById('btn-restart-quiz');

const quizQuestions = [
    {
        question: "Яка країна стала наступником Голлівуду та створила сучасну волосничну технологію нарощування вій?",
        options: [
            { text: "А) Франція", correct: false },
            { text: "Б) Японія", correct: true },
            { text: "В) Італія", correct: false }
        ]
    },
    {
        question: "Яка ідеальна вологість у приміщенні необхідна для коректної роботи професійного клею?",
        options: [
            { text: "А) 10 - 20%", correct: false },
            { text: "Б) 40 - 60%", correct: true },
            { text: "В) 80 - 90%", correct: false }
        ]
    },
    {
        question: "Яке освітлення є найбільш рекомендованим для збереження зору майстра під час процедури?",
        options: [
            { text: "А) Жовте тепле світло", correct: false },
            { text: "Б) Приглушене вечірнє світло", correct: false },
            { text: "В) Біле холодне світло", correct: true }
        ]
    }
];

let currentQuizIndex = 0;
let score = 0;

function loadQuizQuestion() {
    const currentQ = quizQuestions[currentQuizIndex];
    quizQuestion.textContent = currentQ.question;
    quizProgress.textContent = `Питання ${currentQuizIndex + 1} з ${quizQuestions.length}`;
    quizScore.textContent = `Score: ${score}`;
    
    quizOptionsContainer.innerHTML = '';
    currentQ.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.innerHTML = `<span>${opt.text}</span><i class="fa-solid fa-circle"></i>`;
        
        btn.addEventListener('click', () => {
            const allBtns = quizOptionsContainer.querySelectorAll('.quiz-option');
            allBtns.forEach(b => b.style.pointerEvents = 'none'); // disable clicks
            
            if (opt.correct) {
                btn.classList.add('correct');
                btn.querySelector('i').className = 'fa-solid fa-check';
                score += 100;
            } else {
                btn.classList.add('wrong');
                btn.querySelector('i').className = 'fa-solid fa-xmark';
                // highlight correct
                allBtns.forEach(b => {
                    if (b.textContent.includes(currentQ.options.find(o => o.correct).text)) {
                        b.classList.add('correct');
                        b.querySelector('i').className = 'fa-solid fa-check';
                    }
                });
            }
            quizScore.textContent = `Score: ${score}`;
            
            setTimeout(() => {
                currentQuizIndex++;
                if (currentQuizIndex < quizQuestions.length) {
                    loadQuizQuestion();
                } else {
                    quizContent.style.display = 'none';
                    quizResults.style.display = 'block';
                }
            }, 1800);
        });
        
        quizOptionsContainer.appendChild(btn);
    });
}

btnRestartQuiz.addEventListener('click', () => {
    currentQuizIndex = 0;
    score = 0;
    quizContent.style.display = 'block';
    quizResults.style.display = 'none';
    loadQuizQuestion();
});

// Initialize Quiz
loadQuizQuestion();

// Initialize first slide navigation state
goToSlide(0);
