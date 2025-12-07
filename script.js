document.addEventListener('DOMContentLoaded', function() {
    // Инициализация бургер-меню
    initBurgerMenu();
    
    // Определяем текущую страницу
    const currentPage = window.location.pathname.split('/').pop();
    
    // Инициализация слайдера только на главной странице
    if (currentPage === 'index.html' || currentPage === '' || currentPage === '/') {
        initSlider();
    }
    
    // Инициализация модального окна галереи только на странице галереи
    if (currentPage === 'gallery.html') {
        initGalleryModal();
    }
    
    // Инициализация формы обратной связи только на странице "О нас"
    if (currentPage === 'about.html') {
        initContactForm();
    }
});

// Функция инициализации бургер-меню
function initBurgerMenu() {
    const burgerBtn = document.getElementById('burger-btn');
    const mainNav = document.getElementById('main-nav');
    
    if (burgerBtn && mainNav) {
        burgerBtn.addEventListener('click', function() {
            // Переключаем класс active у навигации
            mainNav.classList.toggle('active');
            
            // Анимация бургер-кнопки в крестик
            const spans = burgerBtn.querySelectorAll('span');
            
            if (mainNav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Закрытие меню при клике на ссылку
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                const spans = burgerBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// Функция инициализации слайдера
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Если слайдов нет, выходим из функции
    if (slides.length === 0) {
        console.log('Слайды не найдены');
        return;
    }
    
    let currentSlide = 0;
    let slideInterval;
    
    // Функция показа слайда
    function showSlide(n) {
        // Скрываем все слайды
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Убираем активный класс со всех точек
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Проверяем границы
        if (n >= slides.length) {
            currentSlide = 0;
        } else if (n < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = n;
        }
        
        // Показываем текущий слайд
        slides[currentSlide].classList.add('active');
        
        // Активируем соответствующую точку
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    }
    
    // Функция переключения на следующий слайд
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Функция переключения на предыдущий слайд
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Добавляем обработчики событий для кнопок
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Добавляем обработчики событий для точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Функция запуска автоматической прокрутки
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Функция остановки автоматической прокрутки
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }
    
    // Останавливаем автоматическую прокрутку при наведении на слайдер
    const slider = document.querySelector('.slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Запускаем автоматическую прокрутку
    startAutoSlide();
    
    // Показываем первый слайд
    showSlide(0);
}

// Функция инициализации модального окна галереи
function initGalleryModal() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const modal = document.getElementById('image-modal');
    const closeBtn = document.getElementById('close-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    
    // Если кнопок или модального окна нет, выходим из функции
    if (viewBtns.length === 0 || !modal) {
        console.log('Элементы галереи не найдены');
        return;
    }
    
    // Функция открытия модального окна
    function openModal(imgSrc, title, description) {
        // Устанавливаем данные в модальное окно
        modalImg.src = imgSrc;
        modalTitle.textContent = title;
        modalDesc.textContent = description;
        
        // Показываем модальное окно
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    // Функция закрытия модального окна
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Добавляем обработчики событий для кнопок "Подробнее"
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Получаем данные из атрибутов кнопки
            const imgSrc = this.getAttribute('data-img');
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-desc');
            
            // Открываем модальное окно с полученными данными
            openModal(imgSrc, title, description);
        });
    });
    
    // Добавляем обработчик события для кнопки закрытия
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Закрываем модальное окно при клике на фон
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Закрываем модальное окно при нажатии клавиши Esc
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
}

// Функция инициализации формы обратной связи
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    
    // Если формы нет, выходим из функции
    if (!contactForm) {
        console.log('Форма обратной связи не найдена');
        return;
    }
    
    // Добавляем обработчик события отправки формы
    contactForm.addEventListener('submit', function(event) {
        // Отменяем стандартное поведение формы
        event.preventDefault();
        
        // Получаем значения полей формы
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // Проверяем валидность данных
        let isValid = true;
        
        // Проверяем поле имени
        if (!nameInput.value.trim()) {
            nameInput.style.borderColor = '#ff6b6b';
            isValid = false;
        } else {
            nameInput.style.borderColor = '#e8d3d3';
        }
        
        // Проверяем поле email
        if (!emailInput.value.trim()) {
            emailInput.style.borderColor = '#ff6b6b';
            isValid = false;
        } else {
            emailInput.style.borderColor = '#e8d3d3';
        }
        
        // Проверяем поле сообщения
        if (!messageInput.value.trim()) {
            messageInput.style.borderColor = '#ff6b6b';
            isValid = false;
        } else {
            messageInput.style.borderColor = '#e8d3d3';
        }
        
        // Если все поля заполнены правильно
        if (isValid) {
            // В реальном приложении здесь должен быть код отправки данных на сервер
            
            // Показываем сообщение об успешной отправке
            if (successMessage) {
                successMessage.style.display = 'block';
            }
            
            // Сбрасываем форму
            contactForm.reset();
            
            // Скрываем сообщение через 5 секунд
            setTimeout(function() {
                if (successMessage) {
                    successMessage.style.display = 'none';
                }
            }, 5000);
        }
    });
}