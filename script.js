// Глобальные переменные
let currentView = 'day';
let appData = {
    categories: {
        main: ['Несуда.продвижение', 'Несуда.страховая', 'семья.документы'],
        weekly: ['здоровье', 'английский', 'развитие']
    },
    tasks: {
        yearly: [],
        quarterly: [],
        monthly: [],
        weekly: [],
        daily: [],
        regular: [],
        single: [],
        chaos: [],
        weeklyRegular: []
    },
    settings: {
        notifications: true,
        theme: 'light'
    }
};

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    setupNavigation();
    showView('day');
});

// Настройка навигации
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            showView(view);
            
            // Обновляем активную кнопку
            navButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Переключение между видами
function showView(viewName) {
    currentView = viewName;
    const mainContent = document.getElementById('main-content');
    
    switch(viewName) {
        case 'day':
            mainContent.innerHTML = getDayView();
            break;
        case 'calendar':
            mainContent.innerHTML = getCalendarView();
            break;
        case 'week':
            mainContent.innerHTML = getWeekView();
            break;
        case 'chaos':
            mainContent.innerHTML = getChaosView();
            break;
        case 'month':
            mainContent.innerHTML = getMonthView();
            break;
        case 'quarter':
            mainContent.innerHTML = getQuarterView();
            break;
        case 'year':
            mainContent.innerHTML = getYearView();
            break;
        default:
            mainContent.innerHTML = '<p>Раздел в разработке</p>';
    }
}

// Заглушки для видов (пока простые)
function getDayView() {
    return `
        <h2>Планы на день</h2>
        <div class="day-container">
            <p>Здесь будут задачи на сегодня</p>
            <button class="btn btn-primary">Добавить задачу</button>
        </div>
    `;
}

function getCalendarView() {
    return `
        <h2>Календарь</h2>
        <div class="calendar-container">
            <p>Здесь будет календарь</p>
        </div>
    `;
}

function getWeekView() {
    return `
        <h2>Недельное планирование</h2>
        <div class="week-container">
            <p>Здесь будут недельные задачи</p>
        </div>
    `;
}

function getChaosView() {
    return `
        <h2>Хаос - идеи и мысли</h2>
        <div class="chaos-container">
            <p>Здесь будут несортированные задачи</p>
            <button class="btn btn-success">Добавить идею</button>
        </div>
    `;
}

function getMonthView() {
    return `
        <h2>Месячное планирование</h2>
        <div class="month-container">
            <p>Здесь будут месячные планы</p>
        </div>
    `;
}

function getQuarterView() {
    return `
        <h2>Квартальное планирование</h2>
        <div class="quarter-container">
            <p>Здесь будут квартальные планы</p>
        </div>
    `;
}

function getYearView() {
    return `
        <h2>Годовое планирование</h2>
        <div class="year-container">
            <p>Здесь будут годовые планы</p>
        </div>
    `;
}

// Загрузка данных из localStorage
function loadData() {
    const savedData = localStorage.getItem('taskPlannerData');
    if (savedData) {
        appData = { ...appData, ...JSON.parse(savedData) };
    }
}

// Сохранение данных в localStorage
function saveData() {
    localStorage.setItem('taskPlannerData', JSON.stringify(appData));
}
