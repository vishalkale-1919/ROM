const weddingDate = new Date("July 3, 2026 12:31:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();

  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );

  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days;

  document.getElementById("hours").innerText = hours;

  document.getElementById("minutes").innerText = minutes;

  document.getElementById("seconds").innerText = seconds;

  if (distance < 0) {
    clearInterval(timer);

    document.querySelector(".countdown-container").innerHTML =
      "<h2>🎉 Wedding Day Has Arrived!</h2>";
  }
}

let timer;

updateCountdown();

timer = setInterval(updateCountdown, 1000);
