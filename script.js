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





// Function to toggle visibility of the contact-categories-container
function toggleOpacity(panel) {
    const panelElement = document.querySelector(`.${panel}-categories-container`);
    const buttonElement = document.querySelector(`.menu-button.${panel}`);
  
    if (panelElement.classList.contains('visible')) {
        panelElement.classList.remove('visible');
        buttonElement.classList.remove('gain-color');
        buttonElement.classList.add('lose-color');
        buttonElement.style.backgroundColor = "transparent";
    } else {
        panelElement.classList.add('visible');
        buttonElement.classList.remove('lose-color');
        buttonElement.classList.add('gain-color');
        buttonElement.style.backgroundColor = "white";
    }
}







// Add a click event listener to each menu button to toggle the 'toggled' class
document.addEventListener('DOMContentLoaded', function() {
    const menuButtons = document.querySelectorAll('.menu-button');

    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            button.classList.toggle('toggled');
        });
    });
});





// RANDOM MOVEMENT ANI MATION

document.addEventListener('DOMContentLoaded', function() {
    const anchors = document.querySelectorAll('.intro-images a');
    const container = document.querySelector('.intro-gallery');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Speed multiplier for controlling animation speed
    const speedMultiplier = 0.9; // Change this value to control the speed

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
    for (let i = 0; i < anchors.length; i++) {
        cellIndices.push(i);
    }
    
    // Shuffle cell indices to randomize placement
    shuffle(cellIndices);

    // Initial delay before showing the first image
    const initialDelay = 0; // 2 second delay

    setTimeout(() => {
        anchors.forEach((anchor, index) => {
            // Randomize width and height between 100px and 300px
            const randomSize = Math.floor(Math.random() * 201) + 100; // 100 to 300 inclusive
            anchor.style.width = `${randomSize}px`;
            anchor.style.height = `${randomSize}px`;

            // Calculate cell position
            const maxX = containerWidth - randomSize;
            const maxY = containerHeight - randomSize;
            const randomX = Math.floor(Math.random() * (maxX + 1));
            const randomY = Math.floor(Math.random() * (maxY + 1));

            // Set initial position
            anchor.style.left = `${randomX}px`;
            anchor.style.top = `${randomY}px`;

            // Hide elements initially
            anchor.style.opacity = '0';
            anchor.style.transform = 'scale(0)';

            // Generate random keyframes for movement within the parent div
            const keyframesName = `float-${index}`;
            const keyframes = `
                @keyframes ${keyframesName} {
                    0% { transform: translate(0, 0); }
                    25% { transform: translate(${Math.random() * (maxX / 2) - (maxX / 4)}px, ${Math.random() * (maxY / 2) - (maxY / 4)}px); }
                    50% { transform: translate(${Math.random() * (maxX / 2) - (maxX / 4)}px, ${Math.random() * (maxY / 2) - (maxY / 4)}px); }
                    75% { transform: translate(${Math.random() * (maxX / 2) - (maxX / 4)}px, ${Math.random() * (maxY / 2) - (maxY / 4)}px); }
                    100% { transform: translate(0, 0); }
                }
            `;
            const styleSheet = document.styleSheets[0];
            styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

            // Randomize animation duration
            const baseDuration = 10; // Base duration for the animation
            const duration = (Math.random() * 10 + baseDuration) / speedMultiplier; // Adjust duration by speed multiplier
            anchor.style.animation = `${keyframesName} ${duration}s infinite alternate ease-in-out`;

            
            // Animate in with a delay (additional 1 second delay)
            setTimeout(() => {
                anchor.style.opacity = '1';
                anchor.style.transform = 'scale(1)';
            }, index * 500); // Adjust the delay as needed (500ms here)
        });
    }, initialDelay);
});
















document.addEventListener('DOMContentLoaded', function () {
    const wrappers = document.querySelectorAll('.image-wrapper');

    wrappers.forEach(wrapper => {
        const anchor = wrapper.querySelector('a'); // Get the anchor inside the wrapper
        const image = wrapper.querySelector('.intro-image'); // Get the image inside the wrapper

        // Handle hover interaction for scaling and bringing elements to the front
        anchor.addEventListener('mouseenter', () => {
            wrapper.style.zIndex = '10000'; // Bring the wrapper to the front
            image.style.transform = 'scale(1.4)'; // Scale up the image to 2x on hover
            image.style.transition = 'transform 0.3s ease'; // Faster transition for scaling (0.2s)
            anchor.dataset.hovered = 'true'; // Mark the element as hovered
            console.log('Hovered on:', anchor, 'Scaling up to 2x');
        });

        anchor.addEventListener('mouseleave', () => {
            wrapper.style.zIndex = ''; // Reset z-index after hover
            anchor.dataset.hovered = 'false'; // Mark the element as no longer hovered
            const scaleFactor = wrapper.dataset.scaleFactor || 1; // Retrieve the scroll-based scale factor
            image.style.transform = `scale(${scaleFactor})`; // Apply scroll scaling after hover ends
            image.style.transition = 'transform 0.3s ease'; // Smooth scaling transition when returning to normal
            console.log('Hover ended on:', anchor, 'Scaling back to', scaleFactor);
        });
    });
});

// Handle scroll event for scaling with transform-origin adjustment
window.addEventListener('scroll', function () {
    const elements = document.querySelectorAll('.scroll-minimise, .scroll-minimise-text, .scroll-minimise-center');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    const scrollFraction = scrollTop / viewportHeight;

    // Slower scaling during scroll, don't go below 0.5
    const scaleFactor = Math.max(1 - scrollFraction * 0.5, 0.5); // Scale down, but don't go below 50%

    console.log('Scroll position:', scrollTop, 'Viewport height:', viewportHeight, 'Scale factor:', scaleFactor);

    elements.forEach(element => {
        const wrapper = element.closest('.image-wrapper');
        const image = element.querySelector('.intro-image'); // Get the image inside the wrapper

        if (wrapper && image) { // Check if the wrapper and image exist
            wrapper.dataset.scaleFactor = scaleFactor; // Store the scroll-based scale factor

            // Apply class-specific transform-origin
            if (element.classList.contains('scroll-minimise')) {
                image.style.transformOrigin = 'top right';
            } else if (element.classList.contains('scroll-minimise-text')) {
                image.style.transformOrigin = 'left top';
            } else if (element.classList.contains('scroll-minimise-center')) {
                image.style.transformOrigin = 'top center';
            }

            // Apply scroll scaling only if not hovered
            if (!element.dataset.hovered || element.dataset.hovered === 'false') {
                image.style.transform = `scale(${scaleFactor})`; // Apply scroll scaling
                image.style.transition = 'transform 0.3s ease'; // Smooth scaling transition
                console.log('Applying scroll scaling to:', image, 'Scale factor:', scaleFactor);
            }
        } else {
            console.log('Wrapper or image is null for element:', element); // Log if no wrapper or image is found
        }
    });
});






// Handle scroll event for faster scaling of the wrapper element
window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    
    // Adjust the scroll fraction for faster scaling
    const scrollFraction = scrollTop / (viewportHeight * 0.5); // Adjust the 0.5 factor to make scaling faster
    const scaleFactor = Math.max(1 - scrollFraction, 0.6); // Scale down to 60% at most

    // Targeting the wrapper element
    const introLowerSection = document.querySelector('.intro-lower-section');

    // Apply scaling to the wrapper
    if (introLowerSection) {
        introLowerSection.style.transform = `scale(${scaleFactor})`;
        introLowerSection.style.transformOrigin = 'top left'; // Scale towards the top-left
        introLowerSection.style.transition = 'transform 0.2s ease'; // Smooth scaling transition
    }
});







// Handle height adjustment on scroll
window.addEventListener('scroll', function () {
    requestAnimationFrame(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const viewportHeight = window.innerHeight;
        const maxScroll = document.documentElement.scrollHeight - viewportHeight;
        const scrollFraction = scrollTop / (maxScroll / 2); // Adjust fraction to control the speed of shrinking

        // Calculate new height for elements
        const initialHeight = 40; // Initial height in vh
        const finalHeight = 25; // Final height in vh
        const newHeight = initialHeight - (scrollFraction * (initialHeight - finalHeight));

        const elements = document.querySelectorAll('.scroll-height');
        elements.forEach(element => {
            element.style.height = `${Math.max(newHeight, finalHeight)}vh`; // Ensure height doesn't go below finalHeight
        });

        // Handle font size adjustment for '.name' element
        const nameElement = document.querySelector('.name');
        if (nameElement) {
            const initialFontSize = 40; // Initial font size in px
            const finalFontSize = 25; // Final font size in px
            const newFontSize = initialFontSize - (scrollFraction * (initialFontSize - finalFontSize));
            nameElement.style.fontSize = `${Math.max(newFontSize, finalFontSize)}px`; // Scale font size based on scroll
        }
    });
});



























function toggleResearch() {
    const researchProcess = document.querySelector('.research-process');
    const unfolded = researchProcess.querySelector('.unfolded');

    if (researchProcess.classList.contains('active')) {
        researchProcess.classList.remove('active');
        researchProcess.style.maxHeight = '40px'; // Set to initial height
    } else {
        researchProcess.classList.add('active');
        researchProcess.style.maxHeight = unfolded.scrollHeight + "px";
    }
}


window.addEventListener('scroll', function() {
    const linkMap = document.querySelector('.link-map');
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Check if the user has scrolled to 99% of the document
    if (scrollPosition >= documentHeight * 0.99) {
        linkMap.style.bottom = '10%';
    } else {
        linkMap.style.bottom = ''; // Reset to original value if needed
    }
});




function setColorMode(color) {
    document.documentElement.style.setProperty('--color-1', color);
    document.body.style.backgroundColor = 'var(--color-1)';
    localStorage.setItem('colorMode', color);
}

// Event listener for the dark mode button
document.querySelector('.mode-button-dark').addEventListener('click', function() {
    setColorMode('grey');
});

// Event listener for the white mode button
document.querySelector('.mode-button-white').addEventListener('click', function() {
    setColorMode('white');
});

// Check localStorage for the user's color preference on page load
window.addEventListener('DOMContentLoaded', (event) => {
    const storedColor = localStorage.getItem('colorMode');
    if (storedColor) {
        setColorMode(storedColor);
    }
});



document.addEventListener('DOMContentLoaded', function () {
    const projectIntro = document.querySelector('.project-intro');
    const projectSection = document.querySelector('.project-section');
    const sectionSeeAlso = document.querySelector('.section-see-also');
    const introTopOffset = projectIntro.offsetTop; // Initial top offset of the fixed element

    function handleScroll() {
        const sectionSeeAlsoTop = sectionSeeAlso.getBoundingClientRect().top;

        if (sectionSeeAlsoTop <= introTopOffset + projectIntro.offsetHeight) {
            // Change to position static when `section-see-also` comes into view
            projectIntro.style.position = 'absolute';
            projectIntro.style.top = `${sectionSeeAlsoTop + window.scrollY - projectSection.offsetTop - projectIntro.offsetHeight}px`;
        } else {
            // Revert back to fixed position
            projectIntro.style.position = 'fixed';
            projectIntro.style.top = `${introTopOffset}px`;
        }
    }

    window.addEventListener('scroll', handleScroll);
});








document.addEventListener('DOMContentLoaded', function () {
    const projects = document.querySelectorAll('.project-container');

    // Mapping of button divs to corresponding project classes
    const buttonClassMapping = {
        'r-designer': 'pr-designer',
        'r-writer': 'pr-writer',
        'r-researcher': 'pr-researcher',
        'r-organiser': 'pr-organiser',
        'r-developer': 'pr-developer',
        'r-podcaster': 'pr-podcaster',
        'f-website': 'pf-website',
        'f-publication': 'pf-publication',
        'f-identity': 'pf-identity',
        'f-event': 'pf-event',
        'f-poster': 'pf-poster',
        'f-podcast': 'pf-podcast',
        'f-academic': 'pf-academic',
    };

    let activeRoleClasses = new Set();
    let activeFormClasses = new Set();

    function updateProjects() {
        projects.forEach(project => {
            const projectClasses = project.classList;

            // Check if project matches active role and form filters
            const matchesRole = activeRoleClasses.size === 0 || [...activeRoleClasses].every(role => projectClasses.contains(role));
            const matchesForm = activeFormClasses.size === 0 || [...activeFormClasses].every(form => projectClasses.contains(form));

            // Show or hide project based on matching filters with smooth transition
            if (matchesRole && matchesForm) {
                project.classList.remove('hidden'); // Remove 'hidden' class to show project
                project.style.display = 'block'; // Ensure project is set to display
            } else {
                project.classList.add('hidden'); // Add 'hidden' class to hide project with animation
                setTimeout(() => { project.style.display = 'none'; }, 300); // Set display to none after animation duration
            }
        });
    }

    function handleButtonClick(event) {
        const button = event.target;
        const buttonClass = button.classList[1]; // Get specific role or form class
        const projectClass = buttonClassMapping[buttonClass]; // Map button class to project class

        if (!projectClass) return; // Exit if no mapping is found

        const isActive = button.classList.toggle('selected'); // Toggle 'selected' class

        if (buttonClass.startsWith('r-')) {
            // Role button
            if (isActive) {
                activeRoleClasses.add(projectClass);
            } else {
                activeRoleClasses.delete(projectClass);
            }
        } else if (buttonClass.startsWith('f-')) {
            // Form button
            if (isActive) {
                activeFormClasses.add(projectClass);
            } else {
                activeFormClasses.delete(projectClass);
            }
        }

        updateProjects();
    }

    // Show all projects initially
    projects.forEach(project => {
        project.style.display = 'block';
    });

    // Add event listeners to all filter divs
    const buttons = document.querySelectorAll('.role-category-button, .form-category-button');
    buttons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const projectImagesContainers = document.querySelectorAll(".project-images");

    projectImagesContainers.forEach(container => {
      let scrollAmount = 1; // Starting scroll speed
      let isHovered = false;
      let direction = 1; // 1 = left to right, -1 = right to left

      // Function to handle the automatic scrolling
      function autoScroll() {
        if (!isHovered) {
          container.scrollLeft += scrollAmount * direction;

          // If the scroll reaches the right end (last image), reverse the direction
          if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
            direction = -1; // Reverse direction (scroll right to left)
          }

          // If the scroll reaches the left end (first image), reverse the direction again
          if (container.scrollLeft <= 0) {
            direction = 1; // Scroll left to right again
          }
        }
      }

      // Run the scrolling every 20 milliseconds (adjust speed here)
      let scrollInterval = setInterval(autoScroll,30);

      // Stop scrolling when hovered
      container.addEventListener("mouseenter", function () {
        isHovered = true;
      });

      // Resume scrolling when hover ends
      container.addEventListener("mouseleave", function () {
        isHovered = false;
      });

      // Allow users to scroll manually if they start dragging
      container.addEventListener("mousedown", function () {
        clearInterval(scrollInterval); // Stop auto-scrolling while user interacts
      });
    });
  });