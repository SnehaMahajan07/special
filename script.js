const book = document.querySelector('.book');
const pages = document.querySelectorAll('.page');
const nextButtons = document.querySelectorAll('.next-btn');
const prevButtons = document.querySelectorAll('.prev-btn');
const restartButton = document.querySelector('.restart-btn');

let currentPage = 0;

// Function to update the visibility and stacking of pages
function updateBook() {
  pages.forEach((page, index) => {
    if (index === currentPage) {
      page.style.transform = 'rotateY(0deg)';
      page.style.zIndex = pages.length - index; // Stack pages correctly
    } else if (index < currentPage) {
      page.style.transform = 'rotateY(-180deg)';
      page.style.zIndex = index; // Hide flipped pages behind
    } else {
      page.style.transform = 'rotateY(180deg)';
      page.style.zIndex = pages.length - index; // Stack upcoming pages properly
    }
  });
}

// Add event listeners to all "Next" buttons
nextButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (currentPage < pages.length - 1) {
      currentPage++;
      updateBook();
    }
  });
});

// Add event listeners to all "Previous" buttons
prevButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage--;
      updateBook();
    }
  });
});

// Add event listener to the "Restart" button
restartButton.addEventListener('click', () => {
  // Reset to the first page of the notebook
  currentPage = 0;
  updateBook();

  // Optional: Scroll to the top of the notebook container smoothly
  const notebook = document.querySelector('.notebook');
  notebook.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// Play the music when the site loads
window.addEventListener('load', () => {
  const music = document.getElementById('background-music');
  music.play().catch(() => {
    console.log('Autoplay was blocked. User needs to interact with the page.');
  });
});

// Initialize the book
updateBook();
