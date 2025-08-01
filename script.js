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
    const chaosItems = appData.tasks.chaos || [];
    
    let html = `
        <h2>Хаос - идеи и мысли</h2>
        <div class="chaos-container">
            
            <!-- Управление категориями -->
            <div class="category-management">
                <h3>Категории</h3>
                <div class="category-controls">
                    <input type="text" id="newCategoryInput" placeholder="Новая категория" class="task-input">
                    <button onclick="addCategory()" class="btn btn-primary">Добавить категорию</button>
                </div>
                <div class="categories-list">
                    ${appData.categories.main.map((cat, index) => `
                        <span class="category-tag">
                            ${cat}
                            <button onclick="editCategory(${index}, '${cat}')" class="btn-tiny">✏️</button>
                            <button onclick="deleteCategory(${index})" class="btn-tiny">🗑️</button>
                        </span>
                    `).join('')}
                </div>
            </div>
            
            <!-- Добавление задачи -->
            <div class="add-task-section">
                <input type="text" id="chaosInput" placeholder="Добавьте идею или задачу..." class="task-input">
                <select id="chaosCategory" class="category-select">
                    <option value="">Без категории</option>
                    ${appData.categories.main.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                </select>
                <button onclick="addChaosItem()" class="btn btn-success">Добавить</button>
            </div>
            
            <div class="chaos-list">
    `;
    
    if (chaosItems.length === 0) {
        html += '<p class="empty-message">Пока никаких идей нет. Добавьте первую!</p>';
    } else {
        chaosItems.forEach((item, index) => {
            html += `
                <div class="chaos-item">
                    <div class="task-content">
                        <span class="task-text">${item.text}</span>
                        ${item.category ? `<span class="task-category">${item.category}</span>` : ''}
                    </div>
                    <div class="task-actions">
                        <button onclick="editChaosItem(${index})" class="btn-small btn-edit">✏️</button>
                        <button onclick="deleteChaosItem(${index})" class="btn-small btn-delete">🗑️</button>
                    </div>
                </div>
            `;
        });
    }
    
    html += `
            </div>
        </div>
    `;
    
    return html;
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
    const yearTasks = appData.tasks.yearly || [];
    
    let html = `
        <h2>Годовое планирование</h2>
        <div class="year-container">
            <!-- Управление категориями -->
            <div class="category-management">
                <h3>Категории</h3>
                <div class="category-controls">
                    <input type="text" id="newYearCategoryInput" placeholder="Новая категория" class="task-input">
                    <button onclick="addYearCategory()" class="btn btn-primary">Добавить категорию</button>
                </div>
                <div class="categories-list">
                    ${appData.categories.main.map((cat, index) => `
                        <span class="category-tag">
                            ${cat}
                            <button onclick="editYearCategory(${index}, '${cat}')" class="btn-tiny">✏️</button>
                            <button onclick="deleteYearCategory(${index})" class="btn-tiny">🗑️</button>
                        </span>
                    `).join('')}
                </div>
            </div>
            <!-- Добавление новой задачи -->
            <div class="add-year-task">
                <h3>Добавить годовую задачу</h3>
                <input type="text" id="yearTaskTitle" placeholder="Название задачи" class="task-input">
                <textarea id="yearTaskDescription" placeholder="Описание задачи" class="task-textarea"></textarea>
                <select id="yearTaskCategory" class="category-select">
                    <option value="">Выберите категорию</option>
                    ${appData.categories.main.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                </select>
                                <select id="yearTaskPriority" class="category-select">
                    <option value="medium">Средний приоритет</option>
                    <option value="high">Высокий приоритет</option>
                    <option value="low">Низкий приоритет</option>
                </select>
                <div class="date-inputs">
                    <label>Начало: <input type="date" id="yearTaskStart" class="date-input"></label>
                    <label>Дедлайн: <input type="date" id="yearTaskEnd" class="date-input"></label>
                </div>
                <button onclick="addYearTask()" class="btn btn-primary">Добавить задачу</button>
            </div>
            
            <!-- Список задач -->
            <div class="year-tasks-list">
    `;
    
    if (yearTasks.length === 0) {
        html += '<p class="empty-message">Пока нет годовых задач. Добавьте первую!</p>';
    } else {
        yearTasks.forEach((task, index) => {
            html += `
                <div class="year-task" data-index="${index}">
                    <div class="task-header">
                        <h4>${task.title}</h4>
                        <span class="task-category">${task.category || 'Без категории'}</span>
                        <div class="task-actions">
                            <button onclick="editYearTask(${index})" class="btn-small">✏️</button>
                            <button onclick="deleteYearTask(${index})" class="btn-small">🗑️</button>
                        </div>
                    </div>
                    <div class="task-description">${task.description}</div>
                    <div class="task-dates">
                        <span>Начало: ${task.startDate || 'не указано'}</span>
                        <span>Дедлайн: ${task.endDate || 'не указано'}</span>
                    </div>
                    
                    <!-- Этапы задачи -->
                    <div class="task-stages">
                        <h5>Этапы:</h5>
                        ${task.stages && task.stages.length > 0 ? 
                            task.stages.map((stage, stageIndex) => `
                                <div class="stage-item">
                                    <span>${stage.title}</span>
                                    <span class="stage-date">${stage.deadline || ''}</span>
                                    <button onclick="editTaskStage(${index}, ${stageIndex})" class="btn-tiny">✏️</button>
                                    <button onclick="deleteTaskStage(${index}, ${stageIndex})" class="btn-tiny">🗑️</button>
                                </div>
                            `).join('') 
                            : '<p class="no-stages">Этапов пока нет</p>'
                        }
                        <button onclick="addTaskStage(${index})" class="btn btn-success btn-small">+ Добавить этап</button>
                    </div>
                </div>
            `;
        });
    }
    
    html += `
            </div>
        </div>
    `;
    
    return html;
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
// Функции для работы с Хаосом
function addChaosItem() {
    const input = document.getElementById('chaosInput');
    const categorySelect = document.getElementById('chaosCategory');
    
    const text = input.value.trim();
    if (!text) return;
    
    const newItem = {
        text: text,
        category: categorySelect.value,
        created: new Date().toISOString()
    };
    
    appData.tasks.chaos.push(newItem);
    saveData();
    
    // Обновляем вид
    showView('chaos');
    
    // Очищаем поле ввода
    setTimeout(() => {
        document.getElementById('chaosInput').value = '';
        document.getElementById('chaosCategory').value = '';
    }, 100);
}

function deleteChaosItem(index) {
    if (confirm('Удалить эту идею?')) {
        appData.tasks.chaos.splice(index, 1);
        saveData();
        showView('chaos');
    }
}

function editChaosItem(index) {
    const item = appData.tasks.chaos[index];
    const newText = prompt('Редактировать:', item.text);
    
    if (newText !== null && newText.trim()) {
        appData.tasks.chaos[index].text = newText.trim();
        saveData();
        showView('chaos');
    }
}
// Функции для управления категориями
function addCategory() {
    const input = document.getElementById('newCategoryInput');
    const categoryName = input.value.trim();
    
    if (!categoryName) {
        alert('Введите название категории');
        return;
    }
    
    if (appData.categories.main.includes(categoryName)) {
        alert('Такая категория уже существует');
        return;
    }
    
    appData.categories.main.push(categoryName);
    saveData();
    showView('chaos');
    
    setTimeout(() => {
        document.getElementById('newCategoryInput').value = '';
    }, 100);
}

function editCategory(index, oldName) {
    const newName = prompt('Редактировать категорию:', oldName);
    
    if (newName !== null && newName.trim() && newName !== oldName) {
        const trimmedName = newName.trim();
        
        // Проверяем, нет ли уже такой категории
        if (appData.categories.main.includes(trimmedName)) {
            alert('Такая категория уже существует');
            return;
        }
        
        // Обновляем категорию
        appData.categories.main[index] = trimmedName;
        
        // Обновляем категории во всех существующих задачах хаоса
        appData.tasks.chaos.forEach(item => {
            if (item.category === oldName) {
                item.category = trimmedName;
            }
        });
        
        saveData();
        showView('chaos');
    }
}

function deleteCategory(index) {
    const categoryName = appData.categories.main[index];
    
    if (confirm(`Удалить категорию "${categoryName}"? Все задачи этой категории станут без категории.`)) {
        // Убираем категорию из всех задач
        appData.tasks.chaos.forEach(item => {
            if (item.category === categoryName) {
                item.category = '';
            }
        });
        
        // Удаляем категорию
        appData.categories.main.splice(index, 1);
        saveData();
        showView('chaos');
    }
}
// Функции для годового планирования

// Управление категориями в годовом планировании
function addYearCategory() {
    const input = document.getElementById('newYearCategoryInput');
    const categoryName = input.value.trim();
    
    if (!categoryName) {
        alert('Введите название категории');
        return;
    }
    
    if (appData.categories.main.includes(categoryName)) {
        alert('Такая категория уже существует');
        return;
    }
    
    appData.categories.main.push(categoryName);
    saveData();
    showView('year');
    
    setTimeout(() => {
        document.getElementById('newYearCategoryInput').value = '';
    }, 100);
}

function editYearCategory(index, oldName) {
    const newName = prompt('Редактировать категорию:', oldName);
    
    if (newName !== null && newName.trim() && newName !== oldName) {
        const trimmedName = newName.trim();
        
        if (appData.categories.main.includes(trimmedName)) {
            alert('Такая категория уже существует');
            return;
        }
        
        appData.categories.main[index] = trimmedName;
        
        // Обновляем категории во всех годовых задачах
        appData.tasks.yearly.forEach(task => {
            if (task.category === oldName) {
                task.category = trimmedName;
            }
        });
        
        saveData();
        showView('year');
    }
}

function deleteYearCategory(index) {
    const categoryName = appData.categories.main[index];
    
    if (confirm(`Удалить категорию "${categoryName}"?`)) {
        // Убираем категорию из всех задач
        appData.tasks.yearly.forEach(task => {
            if (task.category === categoryName) {
                task.category = '';
            }
        });
        
        appData.categories.main.splice(index, 1);
        saveData();
        showView('year');
    }
}

// Добавление годовой задачи
function addYearTask() {
    const title = document.getElementById('yearTaskTitle').value.trim();
    const description = document.getElementById('yearTaskDescription').value.trim();
    const category = document.getElementById('yearTaskCategory').value;
    const startDate = document.getElementById('yearTaskStart').value;
    const endDate = document.getElementById('yearTaskEnd').value;
    
    if (!title) {
        alert('Введите название задачи');
        return;
    }
    
    const newTask = {
        id: Date.now(), // Уникальный ID
        title: title,
        description: description,
        category: category,
        startDate: startDate,
        endDate: endDate,
        stages: [],
        created: new Date().toISOString()
    };
    
    if (!appData.tasks.yearly) {
        appData.tasks.yearly = [];
    }
    
    appData.tasks.yearly.push(newTask);
    saveData();
    showView('year');
    
    // Очищаем поля
    setTimeout(() => {
        document.getElementById('yearTaskTitle').value = '';
        document.getElementById('yearTaskDescription').value = '';
        document.getElementById('yearTaskCategory').value = '';
        document.getElementById('yearTaskStart').value = '';
        document.getElementById('yearTaskEnd').value = '';
    }, 100);
}
// Редактирование годовой задачи
function editYearTask(index) {
    const task = appData.tasks.yearly[index];
    
    const newTitle = prompt('Название задачи:', task.title);
    if (newTitle === null) return;
    
    const newDescription = prompt('Описание задачи:', task.description);
    if (newDescription === null) return;
    
    const newCategory = prompt('Категория:', task.category);
    if (newCategory === null) return;
    
    const newStartDate = prompt('Дата начала (YYYY-MM-DD):', task.startDate);
    if (newStartDate === null) return;
    
    const newEndDate = prompt('Дедлайн (YYYY-MM-DD):', task.endDate);
    if (newEndDate === null) return;
    
    // Обновляем задачу
    appData.tasks.yearly[index] = {
        ...task,
        title: newTitle.trim(),
        description: newDescription.trim(),
        category: newCategory.trim(),
        startDate: newStartDate,
        endDate: newEndDate
    };
    
    saveData();
    showView('year');
}

// Удаление годовой задачи
function deleteYearTask(index) {
    const task = appData.tasks.yearly[index];
    
    if (confirm(`Удалить задачу "${task.title}"?`)) {
        appData.tasks.yearly.splice(index, 1);
        saveData();
        showView('year');
    }
}

// Добавление этапа к задаче
function addTaskStage(taskIndex) {
    const stageTitle = prompt('Название этапа:');
    if (!stageTitle || !stageTitle.trim()) return;
    
    const stageDeadline = prompt('Дедлайн этапа (YYYY-MM-DD):');
    
    const newStage = {
        id: Date.now(),
        title: stageTitle.trim(),
        deadline: stageDeadline || '',
        completed: false,
        created: new Date().toISOString()
    };
    
    if (!appData.tasks.yearly[taskIndex].stages) {
        appData.tasks.yearly[taskIndex].stages = [];
    }
    
    appData.tasks.yearly[taskIndex].stages.push(newStage);
    saveData();
    showView('year');
}

// Редактирование этапа
function editTaskStage(taskIndex, stageIndex) {
    const stage = appData.tasks.yearly[taskIndex].stages[stageIndex];
    
    const newTitle = prompt('Название этапа:', stage.title);
    if (newTitle === null) return;
    
    const newDeadline = prompt('Дедлайн этапа (YYYY-MM-DD):', stage.deadline);
    if (newDeadline === null) return;
    
    appData.tasks.yearly[taskIndex].stages[stageIndex] = {
        ...stage,
        title: newTitle.trim(),
        deadline: newDeadline
    };
    
    saveData();
    showView('year');
}

// Удаление этапа
function deleteTaskStage(taskIndex, stageIndex) {
    const stage = appData.tasks.yearly[taskIndex].stages[stageIndex];
    
    if (confirm(`Удалить этап "${stage.title}"?`)) {
        appData.tasks.yearly[taskIndex].stages.splice(stageIndex, 1);
        saveData();
        showView('year');
    }
}
