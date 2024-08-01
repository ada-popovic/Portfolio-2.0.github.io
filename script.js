// Function to adjust the opacity of the projects-arrows element based on scroll position
document.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Calculate the scroll percentage
    let scrollPercentage = scrollTop / (documentHeight - windowHeight);
    
    // Increase the rate at which the element disappears
    const disappearRate = 10; // Adjust this value to make the element disappear faster or slower
    scrollPercentage *= disappearRate;
    
    // Get the projects-arrows element
    const projectsArrows = document.querySelector('.projects-arrows');
    
    // Ensure opacity is between 0 and 1
    projectsArrows.style.opacity = Math.max(0, 1 - scrollPercentage);
});

// Function to toggle visibility of side panels
function togglePanel(panel) {
    const panelElement = document.querySelector(`.${panel}-categories-container`);
    const buttonElement = document.querySelector(`.menu-button.${panel}`);
  
    if (panelElement.style.display === "none" || panelElement.style.display === "") {
        panelElement.style.display = "flex";
        buttonElement.style.backgroundColor = "white";
    } else {
        panelElement.style.display = "none";
        buttonElement.style.backgroundColor = "transparent";
    }
}

// Function to change the background color of the body
function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
}

// Hide all panels initially when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.menu-container').forEach(container => {
        container.style.display = 'none';
    });
});

// Add a click event listener to each menu button to toggle the 'toggled' class
document.addEventListener('DOMContentLoaded', function() {
    const menuButtons = document.querySelectorAll('.menu-button');

    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            button.classList.toggle('toggled');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const anchors = document.querySelectorAll('.intro-images a');
    const container = document.querySelector('.intro-gallery');
    const rows = 3; // Define number of rows for grid
    const cols = 3; // Define number of columns for grid

    const cellWidth = container.clientWidth / cols;
    const cellHeight = container.clientHeight / rows;

    // Speed multiplier for controlling animation speed
    const speedMultiplier = 1; // Change this value to control the speed

    // Shuffle array utility function
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Create an array of cell indices
    const cellIndices = [];
    for (let i = 0; i < rows * cols; i++) {
        cellIndices.push(i);
    }
    
    // Shuffle cell indices to randomize placement
    shuffle(cellIndices);

    anchors.forEach((anchor, index) => {
        // Randomize width and height between 100px and 300px
        const randomSize = Math.floor(Math.random() * 201) + 100; // 100 to 300 inclusive
        anchor.style.width = `${randomSize}px`;
        anchor.style.height = `${randomSize}px`;

        // Calculate cell position
        const cellIndex = cellIndices[index % cellIndices.length];
        const cellX = cellIndex % cols;
        const cellY = Math.floor(cellIndex / cols);

        // Randomize position within the cell
        const maxX = cellWidth - randomSize;
        const maxY = cellHeight - randomSize;
        const randomX = Math.floor(Math.random() * (maxX + 1)) + cellX * cellWidth;
        const randomY = Math.floor(Math.random() * (maxY + 1)) + cellY * cellHeight;

        // Ensure images stay within viewport bounds
        anchor.style.left = `${randomX}px`;
        anchor.style.top = `${randomY}px`;

        // Generate random keyframes for movement within the parent div
        const keyframesName = `float-${index}`;
        const keyframes = `
            @keyframes ${keyframesName} {
                0% { transform: translate(0, 0); }
                25% { transform: translate(${Math.random() * 100 - 50}%, ${Math.random() * 100 - 50}%); }
                50% { transform: translate(${Math.random() * 100 - 50}%, ${Math.random() * 100 - 50}%); }
                75% { transform: translate(${Math.random() * 100 - 50}%, ${Math.random() * 100 - 50}%); }
                100% { transform: translate(0, 0); }
            }
        `;
        const styleSheet = document.styleSheets[0];
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

        // Randomize animation duration and delay
        const baseDuration = 10; // Base duration for the animation
        const baseDelay = 5; // Base delay for the animation
        const duration = (Math.random() * 10 + baseDuration) / speedMultiplier; // Adjust duration by speed multiplier
        const delay = (Math.random() * baseDelay) / speedMultiplier; // Adjust delay by speed multiplier
        anchor.style.animation = `${keyframesName} ${duration}s infinite ${delay}s alternate ease-in-out`;
    });
});




