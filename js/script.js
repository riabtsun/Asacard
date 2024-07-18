window.addEventListener("DOMContentLoaded", (event) => {
  //mobile menu
  let mobileMenu = document.querySelector(".mobile-menu");
  let menuToggle = document.querySelector(".menu_toggle");

  menuToggle.addEventListener("click", (e) => {
    mobileMenu.classList.toggle("active");
    if (mobileMenu.classList.contains("active")) {
      menuToggle.src = "./images/menu-close.svg";
    } else {
      menuToggle.src = "./images/menu-open.svg";
    }
  });
});

//scroll to top
let scrollToTopVisible = false;
let scrollingNavbar = document.querySelector('#scrollingNavbar')
document.addEventListener("scroll", () => {
  const scrollToTop = document.body.querySelector(".scroll-to-top");
  if (document.documentElement.scrollTop > 100) {
    if (!scrollToTopVisible) {
      fadeIn(scrollToTop);
      scrollToTopVisible = true;
    }
  } else {
    if (scrollToTopVisible) {
      fadeOut(scrollToTop);
      scrollToTopVisible = false;
    }
  }
  if (document.documentElement.scrollTop > 2700) {
    scrollingNavbar.style.transform = 'translate3d(0px, -260px, 0px)'
  } else {
    scrollingNavbar.style.transform = 'translate3d(0px, 0, 0px)'
  }
  scrollToTop.addEventListener("click", () => {
    window.scrollTo({top: 0, behavior: "smooth"});
  });
});

function fadeOut(el) {
  el.style.opacity = 1;
  (function fade() {
    if ((el.style.opacity -= 0.1) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

function fadeIn(el, display) {
  el.style.opacity = 0;
  el.style.display = display || "block";
  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += 0.1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-link').forEach(link => {
        let id = link.getAttribute('href').replace('#', '')
        if (id === entry.target.id) {
          link.classList.add('active')
        } else {
          link.classList.remove('active')
        }
      })
    }
  })
}, {
  threshold: 0.9
})

document.querySelectorAll('.content-block').forEach(section => {
  observer.observe(section)
})