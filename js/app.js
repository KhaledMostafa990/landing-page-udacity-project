"use stict";
/**
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 */

/**
 * Define Global Variables
 */
const mainContent = document.querySelector("main");
const sections = document.querySelectorAll("section");
const navbarMenu = document.querySelector(".navbar__menu");
const navbarList = document.querySelector("#navbar__list");
let navItem;
/**
 * End Global Variables
 */
/**
 * Helper function
 */
const addClass = (elm, className) => {
  elm.classList.add(className);
  // navItem.classList.add("menu__link");
};
const removeClass = (elm, className) => {
  elm.classList.remove(className);
  // navItem.classList.add("menu__link");
};

let addBtnStyle = (elem) => {
  elem.style.cssText = `
cursor: pointer;
width: 2.5rem ; 
height: 2.5rem ; 
background-color: #347D39; 
color: white; 
display: flex; 
justify-content:center; 
align-items:center; 
position: fixed ; 
bottom: 2rem;  
right: 2rem; 
z-index: 999;  
border-radius: 1rem 2rem 2rem;
transform: rotate(45deg);
`;
};
let removeBtnStyle = (elem) => {
  elem.style.cssText = `
cursor: pointer;
width: 2.5rem ; 
height: 2.5rem ; 
background-color: #347D39; 
color: white; 
display: none; 
justify-content:center; 
align-items:center; 
position: fixed ; 
bottom: 2rem;  
right: 2rem; 
z-index: 999;  
border-radius: 1rem 2rem 2rem;
transform: rotate(45deg);
`;
};

/**
 *
 * build the nav items
 *
 **/

sections.forEach((elem, indx, arr) => {
  // create li element for nav
  navItem = document.createElement("li");
  navbarList.appendChild(navItem);
  // styling items
  addClass(navItem, "menu__link");
  navItem.style.cssText = `
display:inline-block;
`;
  let dataNav = elem.getAttribute("data-nav"); // Get the name of the specific section to set inner li
  navItem.innerHTML = dataNav;
  // When clicking an item, listening for the click event,
  // scroll to the appropriate section.
  navItem.addEventListener("click", () => {
    elem.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/**
 *
 * Add class 'active' to section when near top of viewport
 *
 **/
const changeActiveSec = () => {
  for (section of sections) {
    // get the top of viewport
    let sectionView = section.getBoundingClientRect();
    let topOfSectionView = sectionView.top;
    // check which section in viewport closer to top
    if (
      // this number might need changed by follow viewport needs
      topOfSectionView >= 0 &&
      topOfSectionView <= 400 &&
      !section.classList.contains("your-active-class")
    ) {
      addClass(section, "your-active-class");
    } else {
      removeClass(section, "your-active-class");
    }
  }
};
document.addEventListener("scroll", changeActiveSec);

/**
 *
 * add active state to item of section in viewport
 *
 */
// get an li list as array
const allNavItem = document.querySelectorAll("li");
const activeItemOfsec = () => {
  sections.forEach((elem, indx, arr) => {
    let View = elem.getBoundingClientRect();
    let topSectionView = View.top;
    console.log(topSectionView);
    if (topSectionView > -100 && topSectionView <= 400) {
      allNavItem.forEach((elm, indx, arr) => {
        if (
          topSectionView < -120 ||
          topSectionView >= 400 ||
          elm.classList.contains("your-active-class")
        ) {
          setTimeout(() => {
            removeClass(elm, "your-active-class");
          }, 500);
        } else if (
          elm.textContent === elem.getAttribute("data-nav") &&
          !elm.classList.contains("your-active-class")
        ) {
          setTimeout(() => {
            addClass(elm, "your-active-class");
          }, 400);
        }
      });
    }
  });
};

document.addEventListener("scroll", activeItemOfsec);

/**
 * create button to scroll to top
 **/

const scrollToTopBtn = document.createElement("div");
scrollToTopBtn.classList.add("btn"); // styling Div btn In Helper function
// add div to main content
mainContent.insertAdjacentElement("afterend", scrollToTopBtn);

// add the style btn function if view not in the top.. else remove it.
window.addEventListener("scroll", () => {
  if (window.scrollY >= 600) {
    addBtnStyle(scrollToTopBtn);
  } else {
    removeBtnStyle(scrollToTopBtn);
  }
});

// create elemnt for text btn
const scrollText = document.createElement("span");
scrollText.textContent = "Top";
// add text to div with opposite rotate style
scrollToTopBtn.appendChild(scrollText);
scrollText.style = `transform: rotate(-45deg);`;

//  listener for click event to scroll to top
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/**
 *
 * Hide navbar on scroll
 *
 **/
const hideNav = () => {
  if (!navbarList.classList.contains("hidden")) {
    // set timeout between add and remove the hidden class
    setTimeout(() => {
      addClass(navbarList, "hidden");
    }, 200);
  } else {
    setTimeout(() => {
      removeClass(navbarList, "hidden");
    }, 600);
  }
};
document.addEventListener("scroll", hideNav);
/**
 * End Main Functions
 */
