/* ==========================================================================
   CLIMATE DYNAMICS LAB - CENTRAL APPLICATIONS ENGINE
   ========================================================================== */

/**
 * Path Resolution Helper Engine
 * Determines directory nesting depth to prevent asset breakage on GitHub Pages.
 */
const getPathContext = () => {
  const isProfilePage = window.location.pathname.includes('/profiles/');
  return {
    base: isProfilePage ? '../' : './',
    activePage: window.location.pathname.split('/').pop() || 'index.html'
  };
};

// ==========================================================================
// GLOBAL COMPONENT: NAVBAR LAYOUT
// ==========================================================================
class LabNavbar extends HTMLElement {
  connectedCallback() {
    const ctx = getPathContext();
    
    this.innerHTML = `
      <nav class="navbar">
        <a href="${ctx.base}index.html">
          <img class="logo" src="${ctx.base}images/logo_top.svg" alt="Climate Dynamics Lab Logo" />
        </a>
        <ul>
          <li><a href="${ctx.base}index.html" class="${ctx.activePage === 'index.html' ? 'active' : ''}">Home</a></li>
          <li><a href="${ctx.base}research.html" class="${ctx.activePage === 'research.html' ? 'active' : ''}">Research</a></li>
          <li><a href="${ctx.base}people.html" class="${ctx.activePage === 'people.html' ? 'active' : ''}">People</a></li>
          <li><a href="${ctx.base}publications.html" class="${ctx.activePage === 'publications.html' ? 'active' : ''}">Publications</a></li>
          <li><a href="${ctx.base}gallery.html" class="${ctx.activePage === 'gallery.html' ? 'active' : ''}">Gallery</a></li>
          <li><a href="${ctx.base}highlights.html" class="${ctx.activePage === 'highlights.html' ? 'active' : ''}">Highlights</a></li>
          <li><a href="${ctx.base}contact.html" class="${ctx.activePage === 'contact.html' ? 'active' : ''}">Contact</a></li>
        </ul>
        <div class="menu-toggle" role="button" aria-label="Toggle Mobile Navigation" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    `;

    const toggle = this.querySelector('.menu-toggle');
    const menu = this.querySelector('ul');
    
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        const isExpanded = menu.classList.toggle('show');
        toggle.setAttribute('aria-expanded', isExpanded);
      });
    }
  }
}
customElements.define('lab-navbar', LabNavbar);

// ==========================================================================
// GLOBAL COMPONENT: FOOTER LAYOUT
// ==========================================================================
class LabFooter extends HTMLElement {
  connectedCallback() {
    const ctx = getPathContext();
    const currentYear = new Date().getFullYear();

    this.innerHTML = `
      <footer id="footer">
        <div class="container">
          <div class="footer-top">
            <div class="footer-left">
              <img src="${ctx.base}images/logo_footer.svg" alt="Climate Dynamics Lab Logo" class="footer-logo" />
            </div>
            <div class="footer-center">
              <h3>Climate Dynamics Lab</h3>
              <p>
                Centre for Atmospheric Sciences, IIT Delhi<br />
                Hauz Khas, New Delhi - 110016, India
              </p>
            </div>
            <div class="footer-right">
              <ul class="icons">
                <li>
                  <a href="mailto:sandeep.sukumaran@cas.iitd.ac.in" title="Email Information Gateway">
                    <span class="iconify" data-icon="mdi:email"></span>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/climdl" target="_blank" rel="noopener noreferrer" title="GitHub Code Archive">
                    <img src="https://cdn.simpleicons.org/github/ffffff" alt="GitHub" style="height: 24px; width: 24px;" />
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/climdl" target="_blank" rel="noopener noreferrer" title="LinkedIn Professional Network">
                    <span class="iconify" data-icon="simple-icons:linkedin"></span>
                  </a>
                </li>
                <li>
                  <a href="https://bsky.app/profile/climdl.bsky.social" target="_blank" rel="noopener noreferrer" title="Bluesky Open Broadcast">
                    <img src="https://cdn.simpleicons.org/bluesky/ffffff" alt="Bluesky" style="height: 24px; width: 24px;" />
                  </a>
                </li>
                <li>
                  <a href="https://x.com/ClimDL_IITD" target="_blank" rel="noopener noreferrer" title="X Communications feed">
                    <img src="https://cdn.simpleicons.org/x/ffffff" alt="X" style="height: 24px; width: 24px;" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <div class="copyright">
            &copy; ${currentYear} Climate Dynamics Lab, IIT Delhi. All rights reserved.
          </div>
        </div>
      </footer>
    `;
  }
}
customElements.define('lab-footer', LabFooter);

// ==========================================================================
// SYSTEM LIFE-CYCLE RUNNERS & INITIALIZERS
// ==========================================================================

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

document.addEventListener("DOMContentLoaded", () => {
  initSlideshowEngine();
  initCarouselEngine();
  initLightboxEngine();
  initExpandableCardEngine();
  initPublicationsEngine();
});

function initSlideshowEngine() {
  const slideshows = document.querySelectorAll(".slideshow");
  slideshows.forEach(slideshow => {
    const slides = slideshow.querySelectorAll(".slide");
    if (slides.length <= 1) return;
    
    let currentSlide = 0;
    setInterval(() => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }, 4500);
  });
}

/** * Upgraded Carousel Engine
 * Animates slowly through each news item automatically and loops infinitely.
 */
function initCarouselEngine() {
  const carousels = document.querySelectorAll(".carousel");
  carousels.forEach(carousel => {
    const reel = carousel.querySelector(".reel");
    const forward = carousel.querySelector(".forward");
    const backward = carousel.querySelector(".backward");
    if (!reel) return;

    let autoPlayTimer = null;

    // Dynamically calculate individual slide width increments including container gaps
    const getScrollStep = () => {
      const firstCard = reel.querySelector("article");
      return firstCard ? firstCard.clientWidth + 32 : 392; 
    };

    const moveForward = () => {
      const step = getScrollStep();
      const isAtEnd = reel.scrollLeft >= (reel.scrollWidth - reel.clientWidth - 15);
      
      if (isAtEnd) {
        reel.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        reel.scrollBy({ left: step, behavior: "smooth" });
      }
    };

    const moveBackward = () => {
      const step = getScrollStep();
      const isAtStart = reel.scrollLeft <= 15;

      if (isAtStart) {
        reel.scrollTo({ left: reel.scrollWidth, behavior: "smooth" });
      } else {
        reel.scrollBy({ left: -step, behavior: "smooth" });
      }
    };

    // User interaction arrow triggers
    if (forward) {
      forward.addEventListener("click", () => {
        moveForward();
        resetTimer();
      });
    }
    if (backward) {
      backward.addEventListener("click", () => {
        moveBackward();
        resetTimer();
      });
    }

    // Set auto-advance velocity tracking loop (stately 5.5 second rotation interval)
    const startTimer = () => {
      if (!autoPlayTimer) {
        autoPlayTimer = setInterval(moveForward, 5500);
      }
    };

    const stopTimer = () => {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    };

    const resetTimer = () => {
      stopTimer();
      startTimer();
    };

    // Instantiate looping routines
    startTimer();

    // Pause cycling on user hover to allow easier headline reading
    carousel.addEventListener("mouseenter", stopTimer);
    carousel.addEventListener("mouseleave", startTimer);
  });
}

function initLightboxEngine() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const galleryItems = document.querySelectorAll(".gallery-item img");
  const closeBtn = lightbox.querySelector(".close");
  const prevBtn = lightbox.querySelector(".prev");
  const nextBtn = lightbox.querySelector(".next");
  let currentIndex = 0;

  if (!galleryItems.length) return;

  const syncView = (index) => {
    const activeImg = galleryItems[index];
    const parentNode = activeImg.closest(".gallery-item");
    const captionNode = parentNode ? parentNode.querySelector(".caption") : null;
    
    lightboxImg.src = activeImg.src;
    if (captionNode) {
      lightboxCaption.textContent = captionNode.textContent.replace(/\s+/g, ' ').trim();
    }
  };

  galleryItems.forEach((img, idx) => {
    img.addEventListener("click", () => {
      currentIndex = idx;
      syncView(currentIndex);
      lightbox.style.display = "block";
      document.body.style.overflow = "hidden";
    });
  });

  const closeView = () => {
    lightbox.style.display = "none";
    document.body.style.overflow = "";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeView);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeView(); });

  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      syncView(currentIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % galleryItems.length;
      syncView(currentIndex);
    });
  }

  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "block") {
      if (e.key === "ArrowLeft" && prevBtn) prevBtn.click();
      else if (e.key === "ArrowRight" && nextBtn) nextBtn.click();
      else if (e.key === "Escape") closeView();
    }
  });
}

function initExpandableCardEngine() {
  document.querySelectorAll(".highlight-content.expandable").forEach(card => {
    const toggle = card.querySelector(".toggle-icon");
    
    const triggerToggle = (e) => {
      e.stopPropagation();
      const state = card.classList.toggle("expanded");
      card.setAttribute("aria-expanded", state);
    };

    if (toggle) {
      toggle.addEventListener("click", triggerToggle);
    }
    card.addEventListener("click", (e) => {
      if (!e.target.closest(".full-content")) triggerToggle(e);
    });
  });
}

// ==========================================================================
// PUBLICATIONS FILTERING AND DATABASE RENDERING ENGINE
// ==========================================================================
function initPublicationsEngine() {
  const container = document.getElementById("publicationsContainer");
  const searchInput = document.getElementById("searchInput");
  if (!container) return;

  const ctx = getPathContext();

  const labMembers = [
    "S. Sandeep", "Sandeep, S.", 
    "Sahu, P. L.", "P. L. Sahu",
    "Manna, G.", "Gobinda Manna",
    "Alice Jeeva, P. J.",
    "Narbar, S.", "Sanya Narbar",
    "Dombo, T. C.",
    "Saran, R.",
    "Anirudh, K. M.",
    "Puri, Charudatt", "Charudatt Puri",
    "Singh, R.", "Rahul Singh",
    "Srujan, K. S. S.", "Varunesh Chandra", "Chandra, V."
  ];

  const highlightLabMembers = (authorString) => {
    let output = authorString;
    labMembers.forEach(member => {
      // Escape punctuation cleanly to ensure literal dots are evaluated securely
      const safeMember = member.replace(/\./g, '\\.');
      const regex = new RegExp(`\\b${safeMember}\\b`, 'gi');
      
      // Callback preserves layout syntax variations from database source file
      output = output.replace(regex, (match) => `<strong class="lab-member">${match}</strong>`);
    });
    return output;
  };

  fetch(`${ctx.base}publications.json`)
    .then(response => {
      if (!response.ok) throw new Error("Network response encountered reading database schema.");
      return response.json();
    })
    .then(data => {
      data.sort((a, b) => b.year - a.year);

      const renderList = (dataset) => {
        container.innerHTML = dataset.map(pub => {
          const formattedAuthors = highlightLabMembers(pub.authors);
          const statusClass = pub.status ? pub.status.toLowerCase().replace(/\s+/g, '-') : '';
          const statusTag = (pub.status && pub.status !== "Published") 
            ? ` <span class="pub-status status-${statusClass}">${pub.status}</span>` 
            : '';
          
          // Isolated item title structure into designated CSS classification tag
          const publicationBody = `${formattedAuthors} (${pub.year}) <span class="pub-title">${pub.title}</span>, <em>${pub.journal}</em>${statusTag}`;
          
          if (pub.url) {
            return `<li><a href="${pub.url}" target="_blank" rel="noopener noreferrer">${publicationBody}</a></li>`;
          }
          return `<li>${publicationBody}</li>`;
        }).join('');
      };

      renderList(data);

      if (searchInput) {
        searchInput.addEventListener("keyup", () => {
          const query = searchInput.value.toLowerCase();
          const filtered = data.filter(pub => 
            pub.authors.toLowerCase().includes(query) ||
            pub.title.toLowerCase().includes(query) ||
            pub.journal.toLowerCase().includes(query) ||
            pub.year.toString().includes(query)
          );
          renderList(filtered);
        });

        window.clearSearch = () => {
          searchInput.value = "";
          renderList(data);
        };
      }
    })
    .catch(error => {
      console.error("Critical Render Error:", error);
      container.innerHTML = `<li style="color:var(--color-accent); list-style:none;">Unable to parse the publication database at this moment. Please verify the asset path coordinates.</li>`;
    });
}
