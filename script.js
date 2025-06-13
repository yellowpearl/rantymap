// script.js

const optionNames = {
  gym: 'Спортзал',
  store: 'Магазин',
  school: 'Школа',
  park: 'Парк',
  metro: 'Метро'
};

const optionDescriptions = {
  gym: 'Насколько близко должен быть спортзал?',
  store: 'Наличие продуктового магазина рядом.',
  school: 'Удалённость от школы.',
  park: 'Насколько далеко до ближайшего парка?',
  metro: 'Сколько идти/ехать до метро?'
};

const optionIcons = {
  gym: '💪',
  store: '🛒',
  school: '🏫',
  park: '🌳',
  metro: '🚇'
};

const googleFieldIds = {
  mainPoint: 'entry.238863648', //
  mainTransport: 'entry.1012741268',
  mainTimeHour: 'entry.1781480881_hour',
  mainTimeMinute: 'entry.1781480881_minute',
  mainTimeSecond: 'entry.1781480881_second',
  email: 'entry.1225802928',

  gym: { //
    mode: 'entry.1854777219',
    hour: 'entry.457354206_hour',
    minute: 'entry.457354206_minute',
    second: 'entry.457354206_second'
  },
  metro: { //
    mode: 'entry.1923214073',
    hour: 'entry.476010799_hour',
    minute: 'entry.476010799_minute',
    second: 'entry.476010799_second'
  },
  store: { //
    mode: 'entry.1288816979',
    hour: 'entry.2018790031_hour',
    minute: 'entry.2018790031_minute',
    second: 'entry.2018790031_second'
  },
  school: { //
    mode: 'entry.1533824310',
    hour: 'entry.1246450309_hour',
    minute: 'entry.1246450309_minute',
    second: 'entry.1246450309_second'
  },
  park: { //
    mode: 'entry.934740461',
    hour: 'entry.410772820_hour',
    minute: 'entry.410772820_minute',
    second: 'entry.410772820_second'
  },
};

const form = document.getElementById('main-form');
const addOptionBtn = document.getElementById('add-option');
const additionalOptionsContainer = document.getElementById('additional-options');
const submitBtn = document.getElementById('submit-btn');
const modal = document.getElementById('email-modal');
const modalEmailInput = document.getElementById('modal-email');
const modalSendBtn = document.getElementById('modal-send-btn');
const emailInput = document.getElementById('modal-email');
const emailError = document.getElementById('email-error');

let selectedOptions = new Set();

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

addOptionBtn.addEventListener('click', () => {
  const selector = document.createElement('select');
  selector.innerHTML = '<option value="">Выберите опцию</option>' +
    Object.entries(optionNames)
      .filter(([key]) => !selectedOptions.has(key))
      .map(([key, label]) => `<option value="${key}">${label}</option>`)
      .join('');

  selector.onchange = () => {
    const key = selector.value;
    if (!key || selectedOptions.has(key)) return;

    selectedOptions.add(key);
    selector.remove();

    const block = document.createElement('div');
    block.className = 'section';
    block.dataset.optionKey = key;

    block.innerHTML = `
  <label class="option-label">
    <span>${optionIcons[key]} ${optionNames[key]}</span>
    <button type="button" class="remove-option-btn" title="Удалить">✖</button>
  </label>
  <div class="selectors">
    <div class="selector">
      <select name="${key}-transport">
        <option value="Пешком">Пешком</option>
        <option value="На общественном транспорте">Общественный транспорт</option>
        <option value="На машине">Машина</option>
      </select>
    </div>
    <div class="selector">
      <select name="${key}-time">
        ${[5, 10, 15, 20, 30, 45, 60, 90].map(t => `<option value="${t}">${t} мин</option>`).join('')}
      </select>
    </div>
  </div>
  <small style="color: gray">${optionDescriptions[key]}</small>
`;

    const removeBtn = block.querySelector('.remove-option-btn');
    removeBtn.addEventListener('click', () => {
      selectedOptions.delete(key);
      block.remove();
      updateAddOptionButtonVisibility();
    });

    additionalOptionsContainer.appendChild(block);

    updateAddOptionButtonVisibility(); // показать кнопку, если снова есть доступные
  };

  additionalOptionsContainer.appendChild(selector);
  updateAddOptionButtonVisibility(); // скрыть кнопку пока не выбран
});

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const mainPoint = document.getElementById('main-point').value.trim();
  const mainTime = document.getElementById('main-time').value;
  const mainMode = document.getElementById('main-transport').value;

  if (!mainPoint || !mainTime || !mainMode) {
    alert('Пожалуйста, заполните адрес и параметры важной точки.');
    return;
  }
  ym(102625735,'reachGoal','create_map')
  modal.classList.remove('hidden');
});


emailInput.addEventListener('input', () => {
  const email = emailInput.value.trim();
  if (isValidEmail(email)) {
    console.log(isValidEmail(email));
    emailError.style.display = 'none';
    modalSendBtn.disabled = false;
  } else {
    console.log(isValidEmail(email));
    emailError.style.display = 'block';
    modalSendBtn.disabled = true;
  }
});

modalSendBtn.addEventListener('click', () => {
  const email = modalEmailInput.value.trim();
  if (!email) {
    alert('Введите email.');
    return;
  }
  if (!isValidEmail(email)) {
    emailError.style.display = 'block';
    sendButton.disabled = true;
    return;
  }
  ym(102625735,'reachGoal','send_email')
  // Получаем основной адрес из input с id main-point
  const mainPointValue = document.getElementById('main-point').value.trim();
  const mainTransportValue = document.getElementById('main-transport').value;
  const mainTimeValue = document.getElementById('main-time').value;
  if (!mainPointValue) {
    alert('Введите важную точку.');
    return;
  }

  const form = document.createElement('form');
  form.action = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSd3kMQB3kH10KGg1ser3mxVWXjD8VxROxPhLK6MaPn946vGDA/formResponse';
  form.method = 'POST';
  form.target = 'hidden_iframe';

  function appendInput(name, value) {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value ?? '';
    form.appendChild(input);
  }

  // Отправляем обязательные поля
  appendInput(googleFieldIds.mainPoint, mainPointValue);
  appendInput(googleFieldIds.mainTransport, mainTransportValue);
  appendInput(googleFieldIds.mainTimeHour, '');
  appendInput(googleFieldIds.mainTimeMinute, mainTimeValue);
  appendInput(googleFieldIds.mainTimeSecond, '');
  appendInput(googleFieldIds.email, email);

  // Функция для добавления времени (часы=0, секунды=0)
  function appendTimeFields(prefix, minutes) {
    appendInput(prefix.hour, '');
    appendInput(prefix.minute, minutes ?? '');
    appendInput(prefix.second, '');
  }

  // Опции, которые есть в форме и на странице
  const options = ['gym', 'metro', 'store', 'school', 'park'];

  options.forEach(optionKey => {
    // Ищем селекты по имени
    const modeSelect = document.querySelector(`select[name="${optionKey}-transport"]`);
    const timeSelect = document.querySelector(`select[name="${optionKey}-time"]`);
    if (modeSelect && timeSelect) {
      console.log(optionKey, modeSelect.value, timeSelect.value);
      const modeValue = modeSelect.value || '';  // например "Пешком"
      const timeValue = timeSelect.value || ''; // минуты из селекта

      appendInput(googleFieldIds[optionKey].mode, modeValue);
      appendTimeFields(googleFieldIds[optionKey], timeValue);
    } else {
      // Если для опции нет элементов на странице, можно отправить пустые
      appendInput(googleFieldIds[optionKey].mode, '');
      appendTimeFields(googleFieldIds[optionKey], '');
    }
  });

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);

  //modal.classList.add('hidden');
  form.reset();
  //additionalOptionsContainer.innerHTML = '';
  selectedOptions.clear();
  updateAddOptionButtonVisibility();
  showSuccessMessage();
});


const mainPointInput = document.getElementById('main-point');
const mainModeSelect = document.getElementById('main-transport');
const mainTimeSelect = document.getElementById('main-time');

function checkMainFieldsFilled() {
  const isFilled = mainPointInput.value.trim() && mainModeSelect.value && mainTimeSelect.value;
  submitBtn.disabled = !isFilled;
}

function updateAddOptionButtonVisibility() {
  const hasUnchosenSelector = additionalOptionsContainer.querySelector('select:not([name])'); // временные селекты
  const remainingOptions = Object.keys(optionNames).filter(k => !selectedOptions.has(k));

  addOptionBtn.style.display = (!hasUnchosenSelector && remainingOptions.length > 0) ? 'inline-block' : 'none';
}

mainPointInput.addEventListener('input', checkMainFieldsFilled);
mainModeSelect.addEventListener('change', checkMainFieldsFilled);
mainTimeSelect.addEventListener('change', checkMainFieldsFilled);

// Проверим при загрузке страницы
checkMainFieldsFilled();


const modalCloseBtn = document.querySelector('.modal-close-btn');

modalCloseBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

const modalContent = document.getElementById('modal-content');

function showSuccessMessage() {
  ym(102625735,'reachGoal','form_success')
  const modal = document.getElementById('email-modal');
  const modalContent = modal.querySelector('.modal-content');
  const successMessage = document.getElementById('modal-success-message');

  modalContent.style.display = 'none';      // Скрываем форму
  successMessage.style.display = 'block';   // Показываем сообщение успеха

  // Навесить обработчик на крестик в successMessage
  const closeBtn = successMessage.querySelector('.modal-close-btn');
  closeBtn.onclick = () => {
    modal.classList.add('hidden');           // Скрыть всю модалку
    modalContent.style.display = 'block';   // Вернуть форму в исходное состояние
    successMessage.style.display = 'none';  // Скрыть successMessage для следующего раза
  };
}