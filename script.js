// Countdown timer logic

// Target date and time for the wedding (Moscow time GMT+3)
const targetDate = new Date('2026-07-18T16:00:00+03:00');

function pad(number) {
  return number.toString().padStart(2, '0');
}

function updateCountdown() {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();
  const countdownEl = document.getElementById('countdown');
  if (diff <= 0) {
    countdownEl.innerHTML = '<div class="unit">00<br><span>дней</span></div>' +
                            '<div class="unit">00<br><span>часов</span></div>' +
                            '<div class="unit">00<br><span>минут</span></div>' +
                            '<div class="unit">00<br><span>секунд</span></div>';
    clearInterval(intervalId);
    return;
  }
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  countdownEl.innerHTML =
    `<div class="unit">${pad(days)}<br><span>дней</span></div>` +
    `<div class="unit">${pad(hours)}<br><span>часов</span></div>` +
    `<div class="unit">${pad(minutes)}<br><span>минут</span></div>` +
    `<div class="unit">${pad(seconds)}<br><span>секунд</span></div>`;
}

// Start countdown updates every second
updateCountdown();
const intervalId = setInterval(updateCountdown, 1000);

// Handle RSVP form submission
function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.name.value.trim();
  const guests = form.guests.value.trim();
  // Get the display text of the selected option for attendance and drink
  const attendanceSelect = form.attendance;
  const attendanceText = attendanceSelect.options[attendanceSelect.selectedIndex].text;
  const drinkSelect = form.drink;
  const drinkText = drinkSelect.options[drinkSelect.selectedIndex].text;

  // Construct mailto URL. Replace the email below with your own address to receive responses.
  // Email address of the wedding hosts. Responses will be sent here.
  const hostEmail = 'ivan.kondrashin.05@mail.ru';
  const subject = encodeURIComponent('RSVP на свадьбу Иван & Ксения');
  let bodyLines = [];
  bodyLines.push(`Имя: ${name}`);
  if (guests) bodyLines.push(`Гости: ${guests}`);
  bodyLines.push(`Присутствие: ${attendanceText}`);
  bodyLines.push(`Напиток: ${drinkText}`);
  const body = encodeURIComponent(bodyLines.join('\n'));
  const mailtoUrl = `mailto:${hostEmail}?subject=${subject}&body=${body}`;

  // Redirect to mailto link. This will open the user's email client with pre-filled details.
  window.location.href = mailtoUrl;

  // Optionally, show a thank you alert after triggering the mailto.
  setTimeout(() => {
    alert('Спасибо за ваш ответ! Ваше письмо на почте в черновиках.');
    form.reset();
  }, 100);
}