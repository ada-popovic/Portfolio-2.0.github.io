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
        buttonElement.style.backgroundColor = "var(--color-1)";
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






// SCALING AROUND INTRO IMAGES

let lastScrollTop = 0; // To keep track of the previous scroll position

window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;

    // Adjust the scroll fraction for scaling
    const scrollFraction = scrollTop / (viewportHeight * 0.3); // Adjust the 0.3 factor to make scaling faster
    const scaleFactor = Math.max(1 - scrollFraction, 0.6); // Scale down to 60% at most

    // Targeting the wrapper element for scaling
    const introLowerSection = document.querySelector('.intro-lower-section');
    
    // Targeting the intro-section for height adjustment
    const introSection = document.querySelector('.intro-section');

    // Targeting the projects-arrows-spacer element for height adjustment
    const projectsArrowsSpacer = document.querySelector('.projects-arrows-spacer');
    
    // Apply scaling to the intro-lower-section
    if (introLowerSection) {
        introLowerSection.style.transform = `scale(${scaleFactor})`;
        introLowerSection.style.transformOrigin = 'top left'; // Scale towards the top-left
        introLowerSection.style.transition = 'transform 0.2s ease'; // Smooth scaling transition
    }

    // Apply height adjustment to the intro-section
    if (introSection) {
        const initialHeight = 25; // Initial height in vh (as defined in CSS)
        const minHeight = 10; // Minimum height in vh
        const newHeight = Math.max(initialHeight - scrollFraction * 15, minHeight); // Gradually decrease height
        
        introSection.style.height = `${newHeight}vh`; // Apply the new height

        // Detect scroll direction and apply different transition times for the intro-section
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            introSection.style.transition = 'height 0s ease'; // Fast transition
        } else {
            // Scrolling up
            introSection.style.transition = 'height 1s ease'; // Slow transition
        }
    }

    // Apply height adjustment to the projects-arrows-spacer
    if (projectsArrowsSpacer) {
        const initialSpacerHeight = 2; // Initial height in px
        const maxSpacerHeight = 100; // Maximum height in px when scrolling down (set to 200px)
        const spacerHeight = Math.min(initialSpacerHeight + scrollFraction * 98, maxSpacerHeight); // Faster growth to 200px
        
        projectsArrowsSpacer.style.height = `${spacerHeight}px`; // Apply the new height

        // Apply different transition times based on scroll direction
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            projectsArrowsSpacer.style.transition = 'height 0s ease'; // Fast transition
        } else {
            // Scrolling up
            projectsArrowsSpacer.style.transition = 'height 0s ease'; // Slow transition
        }
    }

    // Update last scroll position
    lastScrollTop = scrollTop;
});






// RANDOM MOVEMENT ANI MATION

document.addEventListener('DOMContentLoaded', function () {
    const wrappers = document.querySelectorAll('.image-wrapper');
    const container = document.querySelector('.intro-images');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Set a delay for each image to appear in sequence
    let fadeInDelay = 0;

    wrappers.forEach((wrapper, index) => {
        const anchor = wrapper.querySelector('a');
        const image = wrapper.querySelector('.intro-image');
        let hoverPaused = false; // Flag to ensure movement stops when hovered
        let currentX, currentY;

        // Set initial random positioning within the container
        function setInitialPosition() {
            const randomX = Math.random() * (containerWidth - wrapper.offsetWidth);
            const randomY = Math.random() * (containerHeight - wrapper.offsetHeight);
            wrapper.style.left = `${randomX}px`;
            wrapper.style.top = `${randomY}px`;
            currentX = randomX;
            currentY = randomY;
        }
        setInitialPosition();

        // Function to fade in images in sequence
        function fadeInImage() {
            wrapper.style.opacity = '1';
            wrapper.style.transform = 'scale(1)';
            wrapper.style.transition = `opacity 0.8s ease, transform 0.8s ease`; // Fades in and scales up smoothly
        }

        // Delay the fade-in for each image
        setTimeout(fadeInImage, fadeInDelay * 1000);
        fadeInDelay += 0.2; // Increment delay for the next image

        // Function for random movement across the full container
        function randomMovement() {
            if (!hoverPaused) {
                const deltaX = (Math.random() - 0.5) * containerWidth * 0.3; // Smaller movement
                const deltaY = (Math.random() - 0.5) * containerHeight * 0.3; // Smaller movement

                currentX = Math.max(0, Math.min(containerWidth - wrapper.offsetWidth, currentX + deltaX));
                currentY = Math.max(0, Math.min(containerHeight - wrapper.offsetHeight, currentY + deltaY));

                wrapper.style.left = `${currentX}px`;
                wrapper.style.top = `${currentY}px`;

                wrapper.style.transition = 'left 5s ease, top 5s ease'; // Smooth and slow movement
            }

            // Continue movement every 2 seconds
            setTimeout(randomMovement, 2000);
        }

        // Start random movement
        randomMovement();

        // Handle hover to pause movement and scale up
        anchor.addEventListener('mouseenter', () => {
            hoverPaused = true; // Pause movement when hovered
            wrapper.style.transition = 'none'; // Immediately stop transitions
            image.style.transform = 'scale(1.3)'; // Scale up the image on hover
            image.style.transition = 'transform 0.5s ease'; // Smooth scaling transition
            wrapper.style.zIndex = '10000'; // Bring the wrapper to the front on hover
        });

        anchor.addEventListener('mouseleave', () => {
            hoverPaused = false; // Resume movement when hover ends
            image.style.transform = 'scale(1)'; // Return to normal scale
            image.style.transition = 'transform 0.3s ease'; // Smooth scaling transition when returning to normal
            wrapper.style.zIndex = ''; // Reset z-index after hover
        });
    });

    // Handle scroll-based scaling
    window.addEventListener('scroll', function () {
        const elements = document.querySelectorAll('.scroll-minimise, .scroll-minimise-text, .scroll-minimise-center');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const viewportHeight = window.innerHeight;
        const scrollFraction = scrollTop / viewportHeight;

        const scaleFactor = Math.max(1 - scrollFraction * 0.5, 0.5);

        elements.forEach(element => {
            const wrapper = element.closest('.image-wrapper');
            const image = element.querySelector('.intro-image'); // Get the image inside the wrapper

            if (wrapper && image) {
                wrapper.dataset.scaleFactor = scaleFactor;

                if (element.classList.contains('scroll-minimise')) {
                    image.style.transformOrigin = 'top right';
                } else if (element.classList.contains('scroll-minimise-text')) {
                    image.style.transformOrigin = 'left top';
                } else if (element.classList.contains('scroll-minimise-center')) {
                    image.style.transformOrigin = 'top center';
                }

                if (!element.dataset.hovered || element.dataset.hovered === 'false') {
                    image.style.transform = `scale(${scaleFactor})`;
                    image.style.transition = 'transform 0.6s ease';
                }
            }
        });
    });
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






// Function to set --color-1, --color-2, --color-3, and --color-4
function setColorMode(color1, color2, color3, color4, activeButton, inactiveButton) {
    // Set the color variables
    document.documentElement.style.setProperty('--color-1', color1);
    document.documentElement.style.setProperty('--color-2', color2);
    document.documentElement.style.setProperty('--color-3', color3);
    document.documentElement.style.setProperty('--color-4', color4);
    document.body.style.backgroundColor = 'var(--color-1)';

    // Store the active mode and color mode in localStorage
    localStorage.setItem('activeMode', activeButton.classList.contains('mode-button-dark') ? 'dark' : 'white');
    localStorage.setItem('colorMode', JSON.stringify({ color1, color2, color3, color4 }));

    // Set active button font color to var(--color-2)
    activeButton.style.color = 'var(--color-2)';

    // Set inactive button font color to var(--color-3)
    inactiveButton.style.color = 'var(--color-3)';

    // Add hover effect for the inactive button
    inactiveButton.addEventListener('mouseenter', function () {
        inactiveButton.style.color = 'var(--color-2)'; // On hover, font color becomes --color-2
    });
    inactiveButton.addEventListener('mouseleave', function () {
        // After hover, revert back to --color-3 if not active
        if (!inactiveButton.classList.contains('active')) {
            inactiveButton.style.color = 'var(--color-3)';
        }
    });

    // Set the active class on the active button and remove it from the inactive button
    activeButton.classList.add('active');
    inactiveButton.classList.remove('active');
}

// Event listener for the dark mode button
const darkModeButton = document.querySelector('.mode-button-dark');
const whiteModeButton = document.querySelector('.mode-button-white');

darkModeButton.addEventListener('click', function () {
    setColorMode('#050018', '#DEC26E', '#3B336B', '#FF3D00', darkModeButton, whiteModeButton); // Set colors for dark mode
});

whiteModeButton.addEventListener('click', function () {
    setColorMode('white', 'black', '#A79B8E', '#14FF00', whiteModeButton, darkModeButton); // Set colors for white mode
});

// Check localStorage for the user's color preference on page load
window.addEventListener('DOMContentLoaded', (event) => {
    const storedColor = localStorage.getItem('colorMode');
    const activeMode = localStorage.getItem('activeMode');

    // Initially set both buttons' font color to var(--color-3)
    darkModeButton.style.color = 'var(--color-3)';
    whiteModeButton.style.color = 'var(--color-3)';

    if (storedColor && activeMode) {
        const { color1, color2, color3, color4 } = JSON.parse(storedColor);
        if (activeMode === 'dark') {
            setColorMode(color1, color2, color3, color4, darkModeButton, whiteModeButton);
        } else {
            setColorMode(color1, color2, color3, color4, whiteModeButton, darkModeButton);
        }
    }
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
                button.style.backgroundColor = 'var(--color-3)'; // Set background to var(--color-3)
            } else {
                activeRoleClasses.delete(projectClass);
                button.style.backgroundColor = ''; // Reset background to default
            }
        } else if (buttonClass.startsWith('f-')) {
            // Form button
            if (isActive) {
                activeFormClasses.add(projectClass);
                button.style.backgroundColor = 'var(--color-3)'; // Set background to var(--color-3)
            } else {
                activeFormClasses.delete(projectClass);
                button.style.backgroundColor = ''; // Reset background to default
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

    // Reset all button background colors on page load (optional)
    buttons.forEach(button => {
        button.style.backgroundColor = ''; // Reset to default on load
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




  window.addEventListener('scroll', function () {
    const nameElements = document.querySelectorAll('.name, .name-regular');
    if (!nameElements.length) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const maxBlur = 10; // Maximum blur value in pixels
    const viewportHeight = window.innerHeight;

    // Calculate blur based on how far down the user has scrolled
    const blurValue = Math.min((scrollTop / viewportHeight) * maxBlur, maxBlur);

    // Apply the blur to both the "name" and "name-regular" elements
    nameElements.forEach(element => {
        element.style.filter = `blur(${blurValue}px)`;
        element.style.transition = 'filter 0.3s ease, text-shadow 0.3s ease, color 0.3s ease'; // Smooth transition for blur, text shadow, and font color

        // Remove blur, add text-shadow, and change font color on hover
        element.addEventListener('mouseenter', () => {
            element.style.filter = 'blur(0px)'; // Remove blur when hovered
            element.style.textShadow = 'px 0px 4px black'; // Add text shadow on hover
            element.style.setProperty('color', 'var(--color-1)'); // Forcefully change font color to var(--color-1) on hover
        });

        // Restore blur, remove text-shadow, and reset font color on mouse leave
        element.addEventListener('mouseleave', () => {
            element.style.filter = `blur(${blurValue}px)`; // Restore blur after hover ends
            element.style.textShadow = 'none'; // Remove text shadow after hover ends
            element.style.setProperty('color', ''); // Reset font color to the default value
        });
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const projectIntro = document.querySelector('.project-intro');
    const sectionSeeAlso = document.querySelector('.section-see-also');
    const projectSection = document.querySelector('.project-section');

    // Store the initial top offset of the project intro
    const introInitialTopOffset = projectIntro.offsetTop;

    function handleScroll() {
        const sectionSeeAlsoTop = sectionSeeAlso.getBoundingClientRect().top;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Check if the section-see-also comes into view
        if (sectionSeeAlsoTop <= projectIntro.offsetHeight) {
            // When the section-see-also comes into view, set the project-intro to absolute
            projectIntro.style.position = 'absolute';
            projectIntro.style.top = `${sectionSeeAlso.offsetTop - projectIntro.offsetHeight}px`;
        } else {
            // Keep the project-intro fixed if we are scrolling before the section-see-also
            projectIntro.style.position = 'fixed';
            projectIntro.style.top = `${introInitialTopOffset}px`; // Keep it in the initial top position
        }
    }

    // Call handleScroll immediately on page load to check the current scroll position
    handleScroll();

    // Listen for scroll events to adjust the position dynamically
    window.addEventListener('scroll', handleScroll);
});

