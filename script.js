window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};



// Function to adjust the opacity of the projects-arrows or projects-arrows-mobile element based on scroll position
document.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Calculate the scroll percentage
    let scrollPercentage = scrollTop / (documentHeight - windowHeight);
    
    // Increase the rate at which the element disappears
    const disappearRate = 10; // Adjust this value to make the element disappear faster or slower
    scrollPercentage *= disappearRate;
    
    // Get the projects-arrows and projects-arrows-mobile elements
    const projectsArrows = document.querySelector('.projects-arrows');
    const projectsArrowsMobile = document.querySelector('.projects-arrows-mobile');
    
    // Ensure opacity is between 0 and 1 for both elements (if they exist)
    if (projectsArrows) {
        projectsArrows.style.opacity = Math.max(0, 1 - scrollPercentage);
    }

    if (projectsArrowsMobile) {
        projectsArrowsMobile.style.opacity = Math.max(0, 1 - scrollPercentage);
    }
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

function toggleOpacity2(panel) {
    const panelElement = document.querySelector(`.${panel}-categories-container-mobile`);
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
    const scrollFraction = scrollTop / (viewportHeight * 0.8); // Adjust the 0.3 factor to make scaling faster
    const scaleFactor = Math.max(1 - scrollFraction, 0.4); // Scale down to 60% at most

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
        introLowerSection.style.transition = 'transform 0.5s ease'; // Smooth scaling transition
    }

    // Apply height adjustment to the intro-section
    if (introSection) {
        const initialHeight = 25; // Initial height in vh (as defined in CSS)
        const minHeight = 20; // Minimum height in vh
        const newHeight = Math.max(initialHeight - scrollFraction * 25, minHeight); // Gradually decrease height
        
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
let initialFontSize; // Store initial font size (var(--font-1))
let finalFontSize;   // Store final font size (var(--font-2))

// Function to get the CSS variable values for font sizes
function updateFontSizes() {
    const computedStyle = getComputedStyle(document.documentElement);
    initialFontSize = parseFloat(computedStyle.getPropertyValue('--font-1')); // Get --font-1
    finalFontSize = parseFloat(computedStyle.getPropertyValue('--font-2')); // Get --font-2
}

// Call it initially to set font size values
updateFontSizes();

// Add a resize event listener to update the font size values dynamically when resizing the browser
window.addEventListener('resize', updateFontSizes);

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
            // Calculate the new font size based on scroll
            const newFontSize = initialFontSize - (scrollFraction * (initialFontSize - finalFontSize));
            nameElement.style.fontSize = `${Math.max(newFontSize, finalFontSize)}px`; // Apply new font size
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


window.addEventListener('scroll', function() {
    const linkMap = document.querySelector('.link-map-mobile');
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Check if the user has scrolled to 99% of the document
    if (scrollPosition >= documentHeight * 0.95) {
        linkMap.style.bottom = '6%';
    } else {
        linkMap.style.bottom = ''; // Reset to original value if needed
    }
});

window.addEventListener('scroll', function() {
    const linkMap = document.querySelector('.link-map-mini');
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Check if the user has scrolled to 99% of the document
    if (scrollPosition >= documentHeight * 0.95) {
        linkMap.style.bottom = '7%';
    } else {
        linkMap.style.bottom = ''; // Reset to original value if needed
    }
});

















// Function to set color mode
function setColorMode(color1, color2, color3, color4, activeButton, inactiveButton) {
    // Set the color variables
    document.documentElement.style.setProperty('--color-1', color1);
    document.documentElement.style.setProperty('--color-2', color2);
    document.documentElement.style.setProperty('--color-3', color3);
    document.documentElement.style.setProperty('--color-4', color4);
    document.body.style.backgroundColor = 'var(--color-1)';

    // Store the active mode and color mode in localStorage
    localStorage.setItem('activeMode', activeButton.classList.contains('mode-button-dark') || activeButton.classList.contains('mode-button-dark-2') || activeButton.classList.contains('mode-button-dark-3') ? 'dark' : 'white');
    localStorage.setItem('colorMode', JSON.stringify({ color1, color2, color3, color4 }));

    // Update button styles
    updateButtonStyles(activeButton, inactiveButton);
}

// Function to update button styles (for active and inactive buttons)
function updateButtonStyles(activeButton, inactiveButton) {
    if (activeButton && inactiveButton) {
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
}

// Function to apply the stored color mode and update button styles
function applyStoredColorMode() {
    const storedColor = localStorage.getItem('colorMode');
    const activeMode = localStorage.getItem('activeMode');

    if (storedColor && activeMode) {
        const { color1, color2, color3, color4 } = JSON.parse(storedColor);

        if (activeMode === 'dark') {
            // Apply to all button sets if they exist
            if (darkModeButton && whiteModeButton) {
                setColorMode(color1, color2, color3, color4, darkModeButton, whiteModeButton);
            }
            if (darkModeButton2 && whiteModeButton2) {
                setColorMode(color1, color2, color3, color4, darkModeButton2, whiteModeButton2);
            }
            if (darkModeButton3 && whiteModeButton3) {
                setColorMode(color1, color2, color3, color4, darkModeButton3, whiteModeButton3);
            }
        } else {
            if (darkModeButton && whiteModeButton) {
                setColorMode(color1, color2, color3, color4, whiteModeButton, darkModeButton);
            }
            if (darkModeButton2 && whiteModeButton2) {
                setColorMode(color1, color2, color3, color4, whiteModeButton2, darkModeButton2);
            }
            if (darkModeButton3 && whiteModeButton3) {
                setColorMode(color1, color2, color3, color4, whiteModeButton3, darkModeButton3);
            }
        }
    }
}

// First set of buttons (for desktop size)
const darkModeButton = document.querySelector('.mode-button-dark');
const whiteModeButton = document.querySelector('.mode-button-white');

// Second set of buttons (for tablet size)
const darkModeButton2 = document.querySelector('.mode-button-dark-2');
const whiteModeButton2 = document.querySelector('.mode-button-white-2');

// Third set of buttons (for mobile size)
const darkModeButton3 = document.querySelector('.mode-button-dark-3');
const whiteModeButton3 = document.querySelector('.mode-button-white-3');

// Function to safely add event listeners only if buttons exist
function safelyAttachListeners(darkButton, whiteButton, darkColors, whiteColors) {
    if (darkButton && whiteButton) {
        darkButton.addEventListener('click', function () {
            setColorMode(darkColors[0], darkColors[1], darkColors[2], darkColors[3], darkButton, whiteButton);
        });

        whiteButton.addEventListener('click', function () {
            setColorMode(whiteColors[0], whiteColors[1], whiteColors[2], whiteColors[3], whiteButton, darkButton);
        });
    }
}

// Attach event listeners for the first set of buttons (desktop)
safelyAttachListeners(darkModeButton, whiteModeButton, ['#050018', '#DEC26E', '#3B336B', '#FF3D00'], ['#E8E7E4', 'black', '#A79B8E', '#14FF00']);

// Attach event listeners for the second set of buttons (tablet)
safelyAttachListeners(darkModeButton2, whiteModeButton2, ['#050018', '#DEC26E', '#3B336B', '#FF3D00'], ['#E8E7E4', 'black', '#A79B8E', '#14FF00']);

// Attach event listeners for the third set of buttons (mobile)
safelyAttachListeners(darkModeButton3, whiteModeButton3, ['#050018', '#DEC26E', '#3B336B', '#FF3D00'], ['#E8E7E4', 'black', '#A79B8E', '#14FF00']);

// Immediately apply the stored color mode on page load
window.addEventListener('DOMContentLoaded', (event) => {
    applyStoredColorMode();
});

// Reapply the stored mode on resize
window.addEventListener('resize', function () {
    applyStoredColorMode();
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





document.addEventListener('DOMContentLoaded', function () {
    // Select all instances of .project-other-details
    const projectDetails = document.querySelectorAll('.project-other-details');

    projectDetails.forEach(details => {
        const descriptionRight = details.querySelector('.description-right');
        const roleCategories = descriptionRight.querySelector('.role-categories');
        const formatCategories = descriptionRight.querySelector('.format-categories');
        
        if (roleCategories && formatCategories) {
            // Function to calculate and apply flex-direction based on width
            const applyFlexDirection = () => {
                const descriptionWidth = descriptionRight.offsetWidth; // Get width of description-right
                const roleWidth = roleCategories.scrollWidth; // Get width of role-categories
                const formatWidth = formatCategories.scrollWidth; // Get width of format-categories
                const totalWidth = roleWidth + formatWidth + 15; // Add the gap between them (15px)

                // If the total width of role + format exceeds the container width, switch to column
                if (totalWidth > descriptionWidth) {
                    descriptionRight.style.flexDirection = 'column';
                } else {
                    descriptionRight.style.flexDirection = 'row';
                }
            };

            // Call the function on page load and resize
            applyFlexDirection(); // Initial check
            window.addEventListener('resize', applyFlexDirection); // Recheck on resize
        }
    });
});









function toggleMenu(menuType) {
    // Determine which section to toggle
    let menuToShow;
    if (menuType === 'contact') {
      menuToShow = document.querySelector('.bottom-menu-contact');
    } else if (menuType === 'mode') {
      menuToShow = document.querySelector('.bottom-menu-mode');
    } else if (menuType === 'filter') {
      menuToShow = document.querySelector('.bottom-menu-filter');
    }

    // If the clicked menu is already open (has 'active' class), close it
    if (menuToShow.classList.contains('active')) {
      menuToShow.classList.remove('active');
    } else {
      // Otherwise, just open it (without closing other menus)
      menuToShow.classList.add('active');
    }

    // Call the function to toggle the active state of the button
    toggleButtonClass(menuType);
}




  function toggleButtonClass(menuType) {
    // Determine which button to toggle based on the menuType
    let buttonToToggle;
  
    if (menuType === 'contact') {
      buttonToToggle = document.querySelector('.menu-button-mini-contact');
    } else if (menuType === 'mode') {
      buttonToToggle = document.querySelector('.menu-button-mini-mode');
    } else if (menuType === 'filter') {
      buttonToToggle = document.querySelector('.menu-button-mini-filter');
    }
  
    // Toggle the 'active-menu-mini' class on the clicked button
    if (buttonToToggle.classList.contains('active-menu-mini')) {
      buttonToToggle.classList.remove('active-menu-mini');
    } else {
      buttonToToggle.classList.add('active-menu-mini');
    }
  }





  window.addEventListener('scroll', function() {
    // Get the menu-mini element
    const menuMini = document.querySelector('.menu-mini-main');
  
    // Get the total scrollable height of the page
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  
    // Get the current scroll position
    const currentScroll = window.scrollY;
  
    // Calculate the opacity based on the scroll position with a faster increase (factor of 3)
    let opacity = (currentScroll / scrollableHeight) * 15; // Adjust factor for faster change
  
    // Ensure the opacity is between 0 and 1
    if (opacity > 1) opacity = 1;
    if (opacity < 0) opacity = 0;
  
    // Apply the opacity to the menu-mini element
    menuMini.style.opacity = opacity;
  });