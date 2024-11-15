const card = document.querySelector(".d-card");
let isMouseDown = false; // Флаг для отслеживания состояния нажатия кнопки мыши

card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left; // Положение курсора внутри карточки по X
  const y = e.clientY - rect.top; // Положение курсора внутри карточки по Y

  // Настраиваем наклон карточки так, чтобы она всегда "убегала" от курсора
  const rotateX = (rect.height / 2 - y) / 10; // Делим на 10 для большего наклона
  const rotateY = (x - rect.width / 2) / 10; // Делим на 10 для большего наклона

  // Если мышь нажата, добавляем scale(0.95), иначе scale(1.1)
  const scale = isMouseDown ? 1.05 : 1.1;

  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale}) translateZ(10px)`;
  card.style.boxShadow = `0px 15px 25px rgba(0, 0, 0, 0.3)`;
});

card.addEventListener("mouseleave", () => {
  card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
  card.style.boxShadow = "0 10px 15px rgba(0, 0, 0, 0.3)";
  isMouseDown = false; // Сбрасываем флаг при уходе курсора с карточки
});

card.addEventListener("mousedown", () => {
  isMouseDown = true; // Устанавливаем флаг в true при нажатии мыши
  card.style.transform = card.style.transform.replace(
    /scale\([^\)]+\)/,
    "scale(1.05)"
  ); // Применяем уменьшение без дублирования
});

card.addEventListener("mouseup", () => {
  isMouseDown = false; // Сбрасываем флаг при отпускании мыши
  card.style.transform = card.style.transform.replace(
    /scale\([^\)]+\)/,
    "scale(1.1)"
  ); // Возвращаем к исходному размеру при наведении
});

const rainbowCard = document.querySelector('.rainbow-card');
const colors = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];

let currentColorIndex = 0;

function animateRainbow() {
    // Получаем следующий цвет
    const nextColorIndex = (currentColorIndex + 1) % colors.length;

    // Устанавливаем цвет обводки на следующий цвет
    rainbowCard.style.boxShadow = `0 0 0 5px ${colors[currentColorIndex]}`;
    
    // Плавно переходим к следующему цвету
    setTimeout(() => {
        rainbowCard.style.transition = 'box-shadow 0.5s ease'; // Плавный переход
        rainbowCard.style.boxShadow = `0 0 0 5px ${colors[nextColorIndex]}`;
        
        // Устанавливаем текущий цвет как следующий
        currentColorIndex = nextColorIndex;
    }, 500); // Делаем паузу перед изменением цвета

    // Запускаем анимацию каждые 1000 мс
    setTimeout(animateRainbow, 1000);
}

// Запускаем анимацию
animateRainbow();