let selectedCategory = 'Barchasi';

// Kategoriya bo'yicha filtrlash
function filterByCategory(category) {
    selectedCategory = category;
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.trim() === category) {
            btn.classList.add('active');
        }
    });
    filterJournals();
}

// Jurnallarni filtrlash
function filterJournals() {
    const searchInput = document.getElementById('searchInput');
    const searchValue = searchInput ? searchInput.value.toLowerCase() : '';
    const cards = document.querySelectorAll('.journal-card');
    const noResults = document.getElementById('noResults');
    const journalsGrid = document.getElementById('journalsGrid');
    let visibleCount = 0;

    cards.forEach(card => {
        const category = card.getAttribute('data-category');
        const title = card.querySelector('.journal-title').textContent.toLowerCase();
        const description = card.querySelector('.description').textContent.toLowerCase();
        const categoryName = card.querySelector('.journal-category').textContent.toLowerCase();
        const matchesSearch = title.includes(searchValue) || description.includes(searchValue) || categoryName.includes(searchValue);
        const matchesCategory = selectedCategory === 'Barchasi' || category === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });

    // Natijalar sonini yangilash
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = visibleCount + ' ta jurnal topildi';
    }
    
    // Agar hech narsa topilmasa
    if (visibleCount === 0) {
        if (journalsGrid) journalsGrid.style.display = 'none';
        if (noResults) noResults.style.display = 'block';
    } else {
        if (journalsGrid) journalsGrid.style.display = 'grid';
        if (noResults) noResults.style.display = 'none';
    }
}

// Jurnal sahifasiga o'tish funksiyasi
function openJournal(journalId) {
    window.location.href = journalId + '.html';
}

// Maqola o'qish funksiyasi - Jurnallar.html sahifasiga o'tkazish
function readJournal(title) {
    window.location.href = 'Jurnallar.html';
}

// Jurnal yuklab olish funksiyasi - maqola1.pdf faylini yuklab olish
function downloadJournal(title) {
    // maqola1.pdf faylini yuklab olish
    const link = document.createElement('a');
    link.href = 'maqola1.pdf';
    link.download = 'maqola1.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Mobile Menu funksiyalari
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    mobileNav.classList.toggle('active');
    menuBtn.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    mobileNav.classList.remove('active');
    menuBtn.classList.remove('active');
}

// Smooth scroll funksiyasi
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Tungi rejim funksiyasi
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    }
}



// Advertisement Carousel
let currentAdSlide = 0;
const adSlides = document.querySelectorAll('.ad-slide');
const adIndicators = document.querySelectorAll('.indicator');

function showAdSlide(index) {
    // Remove active class from all slides and indicators
    adSlides.forEach(slide => slide.classList.remove('active'));
    adIndicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    if (adSlides[index]) {
        adSlides[index].classList.add('active');
        adIndicators[index].classList.add('active');
        currentAdSlide = index;
    }
}

function nextAdSlide() {
    currentAdSlide = (currentAdSlide + 1) % adSlides.length;
    showAdSlide(currentAdSlide);
}

// Auto-rotate ads every 4 seconds
setInterval(nextAdSlide, 4000);

// Chatbot Functions
let chatbotOpen = false;

function openChatbot() {
    const container = document.getElementById('chatbotContainer');
    const floatBtn = document.getElementById('floatBtn');
    
    container.classList.add('active');
    floatBtn.style.display = 'none';
    chatbotOpen = true;
}

function toggleChatbot() {
    const container = document.getElementById('chatbotContainer');
    const floatBtn = document.getElementById('floatBtn');
    const toggle = document.getElementById('chatbotToggle');
    
    if (chatbotOpen) {
        container.classList.remove('active');
        floatBtn.style.display = 'flex';
        chatbotOpen = false;
    } else {
        openChatbot();
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message) {
        addUserMessage(message);
        input.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const response = getBotResponse(message);
            addBotMessage(response);
        }, 1000);
    }
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function addUserMessage(message) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'user-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-user"></i>
        </div>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addBotMessage(message) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'bot-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function askBot(question) {
    const response = getBotResponse(question);
    addBotMessage(response);
}

function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('jurnal') || lowerMessage.includes('maqola')) {
        return `📚 Bizda 6 ta turli sohalardagi jurnal mavjud:
        • RAI Journal - Aniq va tabiiy fanlar
        • EPAI - Muhandislik 
        • Bulconre - Ko'p tarmoqli tadqiqotlar
        • IT Journal - Axborot texnologiyalari
        • Huquq Journal - Huquqshunoslik
        
        Qaysi sohada maqola chop etmoqchisiz?`;
    }
    
    if (lowerMessage.includes('xizmat') || lowerMessage.includes('narx')) {
        return `🛠️ Bizning asosiy xizmatlar:
        • Maqola chop etish - Professional nashr
        • Tezis chop etish - Tez va sifatli
        • ISBN/KBK/UO'K - Rasmiy hujjatlar
        • DGU xizmati - Kutubxona kiritish
        
        Batafsil ma'lumot uchun: @ferteach_uz`;
    }
    
    if (lowerMessage.includes('salom') || lowerMessage.includes('hello')) {
        return `Salom! 👋 Men FerTeach yordamchisiman. Sizga ilmiy nashr va jurnal xizmatlari bo'yicha yordam bera olaman. Nimadan boshlashni xohlaysiz?`;
    }
    
    if (lowerMessage.includes('aloqa') || lowerMessage.includes('telefon')) {
        return `📞 Biz bilan bog'lanish:
        • Telegram: @ferteach_uz
        • Telefon: +998 93 053 22 88
        • Email: yunusaliyunusov83@gmail.com
        
        24/7 onlayn yordam!`;
    }
    
    return `Savolingiz uchun rahmat! 🤔 Men sizga quyidagi mavzularda yordam bera olaman:
    • Jurnallar va nashr jarayoni
    • Xizmatlar va narxlar  
    • Bog'lanish ma'lumotlari
    
    Yoki to'g'ridan-to'g'ri @ferteach_uz ga murojaat qiling!`;
}

// Sahifa yuklanganda
document.addEventListener('DOMContentLoaded', function() {
    // Dastlabki filtrlash
    filterJournals();
    
    // Qidiruv maydoniga event listener qo'shish
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', filterJournals);
    }
    
    // Saqlangan tema holatini yuklash
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle?.querySelector('i');
    
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        if (icon) icon.className = 'fas fa-sun';
    } else {
        if (icon) icon.className = 'fas fa-moon';
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                closeMobileMenu();
            }
        });
    });
});