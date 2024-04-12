const card = document.getElementById("card");
let startX;
let currentX;
let threshold = 50; // Adjust this threshold value as needed

const images = ["image1.avif", "image2.avif", "image3.avif"]; // Add your image URLs here
let currentIndex = 0;

updateCard();

card.addEventListener("mousedown", handleStart);
card.addEventListener("touchstart", handleStart);

document.addEventListener("mousemove", handleMove);
document.addEventListener("touchmove", handleMove);

document.addEventListener("mouseup", handleEnd);
document.addEventListener("touchend", handleEnd);

function handleStart(e) {
  e.preventDefault(); // Prevent default touch behavior
  if (e.type === "mousedown") {
    startX = e.clientX;
  } else if (e.type === "touchstart") {
    startX = e.touches[0].clientX;
  }
}

function handleMove(e) {
  e.preventDefault(); // Prevent default touch behavior
  if (startX) {
    if (e.type === "mousemove") {
      currentX = e.clientX;
    } else if (e.type === "touchmove") {
      currentX = e.touches[0].clientX;
    }

    let diff = startX - currentX;
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swiped left
        currentIndex = (currentIndex + 1) % images.length;
      } else {
        // Swiped right
        currentIndex = (currentIndex - 1 + images.length) % images.length;
      }
      updateCard();
      startX = null;
    }
  }
}

function handleEnd(e) {
  startX = null;
}

function updateCard() {
  card.innerHTML = `<img src="${images[currentIndex]}" alt="Image ${
    currentIndex + 1
  }">`;
}
