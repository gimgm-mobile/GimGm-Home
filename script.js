/**
 * GimGm-Mobile Core Architecture Automation Script
 * Version: 2.1.0 (Build 2026)
 * Complete Architecture and Enterprise Logic Component
 */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 1. GLOBAL UI & CORE UTILITIES CONTROL
  // ==========================================================================
  const UIController = (() => {
    const navbar = document.querySelector(".navbar");
    const scrollProgress = document.getElementById("scrollProgress");
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    const hamburger = document.getElementById("hamburgerMenu");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    const initScrollFrame = () => {
      window.addEventListener("scroll", () => {
        const totalHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          const progress = (window.scrollY / totalHeight) * 100;
          scrollProgress.style.width = `${progress}%`;
        }

        if (window.scrollY > 80) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }

        if (window.scrollY > 500) {
          scrollTopBtn.classList.add("visible");
        } else {
          scrollTopBtn.classList.remove("visible");
        }

        trackActiveSection();
      });
    };

    const initNavigationToggle = () => {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("open");
        navMenu.classList.toggle("active");
      });

      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          hamburger.classList.remove("open");
          navMenu.classList.remove("active");
        });
      });

      scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    };

    const trackActiveSection = () => {
      let currentSectionId = "";
      const scrollPos = window.scrollY + 120;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = section.getAttribute("id");
        }
      });

      if (currentSectionId) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${currentSectionId}`) {
            link.classList.add("active");
          }
        });
      }
    };

    const initIntersectionObserver = () => {
      const revealElements = document.querySelectorAll(".reveal");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
      );

      revealElements.forEach((el) => observer.observe(el));
    };

    return {
      init: () => {
        initScrollFrame();
        initNavigationToggle();
        initIntersectionObserver();
      },
    };
  })();

  // ==========================================================================
  // 2. DYNAMIC LIVE PRICING ENGINE (FLEXIBLE PREISE LOGIK)
  // ==========================================================================
  const PricingEngine = (() => {
    const pageRange = document.getElementById("pageRange");
    const pageValue = document.getElementById("pageValue");
    const supportSelect = document.getElementById("supportSelect");
    const featSEO = document.getElementById("featSEO");
    const featSpeed = document.getElementById("featSpeed");
    const featCMS = document.getElementById("featCMS");
    const livePriceDisplay = document.getElementById("livePrice");
    const calcSummary = document.getElementById("calcSummary");

    const BASE_COST = 25;
    const COST_PER_PAGE = 5;

    const calculateLiveMetrics = () => {
      const pages = parseInt(pageRange.value, 10);
      pageValue.textContent = pages;

      let price = BASE_COST + pages * COST_PER_PAGE;
      let summaryItems = [
        `Basis-Framework inkl. Hosting`,
        `Responsives Layout`,
        `${pages} individuelle Unterseiten (${pages * COST_PER_PAGE}€)`,
      ];

      const supportCost = parseInt(supportSelect.value, 10);
      price += supportCost;

      if (supportCost === 25) summaryItems.push("Interaktives FAQ-System");
      if (supportCost === 60) summaryItems.push("Live-Chat & Ticket-System");
      if (supportCost === 120)
        summaryItems.push("KI-gestützter Supportbot 24/7");

      if (featSEO.checked) {
        price += parseInt(featSEO.value, 10);
        summaryItems.push("Premium SEO Optimierung");
      }
      if (featSpeed.checked) {
        price += parseInt(featSpeed.value, 10);
        summaryItems.push("High-Speed CDN");
      }
      if (featCMS.checked) {
        price += parseInt(featCMS.value, 10);
        summaryItems.push("Eigener CMS Zugang");
      }

      animatePriceDisplay(price);
      updateSummaryUI(summaryItems);
    };

    const animatePriceDisplay = (targetPrice) => {
      const currentPrice = parseInt(livePriceDisplay.textContent, 10) || 0;
      if (currentPrice === targetPrice) return;

      let start = currentPrice;
      const duration = 300;
      const startTime = performance.now();

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(start + (targetPrice - start) * progress);

        livePriceDisplay.textContent = value;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          livePriceDisplay.textContent = targetPrice;
        }
      };
      requestAnimationFrame(step);
    };

    const updateSummaryUI = (items) => {
      calcSummary.innerHTML = "";
      items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        calcSummary.appendChild(li);
      });
    };

    return {
      init: () => {
        if (!pageRange) return;
        pageRange.addEventListener("input", calculateLiveMetrics);
        supportSelect.addEventListener("change", calculateLiveMetrics);
        featSEO.addEventListener("change", calculateLiveMetrics);
        featSpeed.addEventListener("change", calculateLiveMetrics);
        featCMS.addEventListener("change", calculateLiveMetrics);
        calculateLiveMetrics();
      },
    };
  })();

  // ==========================================================================
  // 3. ENTERPRISE AUTHENTICATION & OVERLAY MODAL SYSTEM
  // ==========================================================================
  const ModalSystem = (() => {
    const triggers = document.querySelectorAll(".open-modal-btn");
    const overlays = document.querySelectorAll(".modal-overlay");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const toRegister = document.getElementById("toRegister");
    const toLogin = document.getElementById("toLogin");

    const registerFormsEvents = () => {
      triggers.forEach((trigger) => {
        trigger.addEventListener("click", (e) => {
          e.preventDefault();
          const targetId = trigger.getAttribute("data-target");
          const targetModal = document.getElementById(targetId);
          if (targetModal) {
            targetModal.classList.add("active");
            document.body.style.overflow = "hidden";
          }
        });
      });

      overlays.forEach((overlay) => {
        overlay.addEventListener("click", (e) => {
          if (e.target === overlay) {
            closeActiveModals();
          }
        });

        const closeBtn = overlay.querySelector(".close-modal-btn");
        if (closeBtn) {
          closeBtn.addEventListener("click", closeActiveModals);
        }
      });

      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeActiveModals();
      });

      if (toRegister && toLogin) {
        toRegister.addEventListener("click", (e) => {
          e.preventDefault();
          loginForm.classList.add("hidden");
          registerForm.classList.remove("hidden");
        });

        toLogin.addEventListener("click", (e) => {
          e.preventDefault();
          registerForm.classList.add("hidden");
          loginForm.classList.remove("hidden");
        });
      }
    };

    const closeActiveModals = () => {
      overlays.forEach((overlay) => overlay.classList.remove("active"));
      document.body.style.overflow = "";
    };

    return {
      init: () => registerFormsEvents(),
      close: () => closeActiveModals(),
    };
  })();

  // ==========================================================================
  // 4. ADVANCED FORM VALIDATION CONTROLLER
  // ==========================================================================
  const ValidationController = (() => {
    const loginForm = document.getElementById("jsLoginForm");
    const registerForm = document.getElementById("jsRegisterForm");

    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    };

    const setValidationState = (inputElement, isValid) => {
      const group = inputElement.closest(".input-group");
      if (!group) return;
      if (isValid) {
        group.classList.remove("invalid");
        group.classList.add("valid");
      } else {
        group.classList.remove("valid");
        group.classList.add("invalid");
      }
    };

    const initFormsValidation = () => {
      if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const emailInput = document.getElementById("login-email");
          const passInput = document.getElementById("login-password");

          let isEmailValid = validateEmail(emailInput.value);
          let isPassValid = passInput.value.length >= 8;

          setValidationState(emailInput, isEmailValid);
          setValidationState(passInput, isPassValid);

          if (isEmailValid && isPassValid) {
            alert(
              "System-Meldung: Login erfolgreich! Ihre Daten wurden verschlüsselt verarbeitet.",
            );
            ModalSystem.close();
            loginForm.reset();
            emailInput.closest(".input-group").classList.remove("valid");
            passInput.closest(".input-group").classList.remove("valid");
          }
        });
      }

      if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const company = document.getElementById("reg-company");
          const email = document.getElementById("reg-email");
          const pass = document.getElementById("reg-password");
          const terms = document.getElementById("reg-terms");
          const termsErr = document.getElementById("err-reg-terms");

          let isCompValid = company.value.trim() !== "";
          let isEmailValid = validateEmail(email.value);
          let isPassValid = pass.value.length >= 8 && /\d/.test(pass.value);
          let isTermsValid = terms.checked;

          setValidationState(company, isCompValid);
          setValidationState(email, isEmailValid);
          setValidationState(pass, isPassValid);

          if (isTermsValid) {
            termsErr.classList.remove("visible");
          } else {
            termsErr.classList.add("visible");
          }

          if (isCompValid && isEmailValid && isPassValid && isTermsValid) {
            alert(
              `Projekt für "${company.value}" erfolgreich registriert! Unser Kundensupport setzt sich mit Ihnen in Verbindung.`,
            );
            ModalSystem.close();
            registerForm.reset();
            company.closest(".input-group").classList.remove("valid");
            email.closest(".input-group").classList.remove("valid");
            pass.closest(".input-group").classList.remove("valid");
          }
        });
      }
    };

    return {
      init: () => initFormsValidation(),
    };
  })();

  // ==========================================================================
  // 5. TESTIMONIALS SLIDER CONTROLLER
  // ==========================================================================
  const TestimonialSlider = (() => {
    const slides = document.querySelectorAll("#testimonialSlider .slide");
    const nextBtn = document.getElementById("nextSlide");
    const prevBtn = document.getElementById("prevSlide");
    const dotsContainer = document.getElementById("sliderDots");

    let currentIndex = 0;
    let slideTimer = null;

    const setupSlider = () => {
      if (slides.length === 0) return;

      slides.forEach((_, idx) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (idx === 0) dot.classList.add("active");
        dot.addEventListener("click", () => jumpToSlide(idx));
        dotsContainer.appendChild(dot);
      });

      nextBtn.addEventListener("click", () => changeSlide(1));
      prevBtn.addEventListener("click", () => changeSlide(-1));

      startAutoCycle();

      const container = document.querySelector(".slider-container");
      container.addEventListener("mouseenter", () => clearInterval(slideTimer));
      container.addEventListener("mouseleave", () => startAutoCycle());
    };

    const updateSliderUI = () => {
      slides.forEach((slide, idx) => {
        slide.classList.remove("active");
        if (idx === currentIndex) slide.classList.add("active");
      });

      const dots = dotsContainer.querySelectorAll(".dot");
      dots.forEach((dot, idx) => {
        dot.classList.remove("active");
        if (idx === currentIndex) dot.classList.add("active");
      });
    };

    const changeSlide = (direction) => {
      currentIndex += direction;
      if (currentIndex >= slides.length) currentIndex = 0;
      if (currentIndex < 0) currentIndex = slides.length - 1;
      updateSliderUI();
    };

    const jumpToSlide = (index) => {
      currentIndex = index;
      updateSliderUI();
    };

    const startAutoCycle = () => {
      slideTimer = setInterval(() => {
        changeSlide(1);
      }, 6000);
    };

    return {
      init: () => setupSlider(),
    };
  })();

  // ==========================================================================
  // 6. ACCORDION (FAQ) CONTROLLER
  // ==========================================================================
  const FAQAccordion = (() => {
    const faqItems = document.querySelectorAll(".faq-item");

    const initAccordion = () => {
      faqItems.forEach((item) => {
        const questionBlock = item.querySelector(".faq-question");
        questionBlock.addEventListener("click", () => {
          const isOpen = item.classList.contains("open");

          // Schließe alle anderen offenen Elemente
          faqItems.forEach((innerItem) => {
            innerItem.classList.remove("open");
          });

          if (!isOpen) {
            item.classList.add("open");
          }
        });
      });
    };

    return {
      init: () => initAccordion(),
    };
  })();

  // ==========================================================================
  // 7. PRIVACY & LOCALSTORAGE COOKIE ENGINE
  // ==========================================================================
  const CookieEngine = (() => {
    const banner = document.getElementById("cookieBanner");
    const acceptBtn = document.getElementById("acceptCookies");
    const declineBtn = document.getElementById("declineCookies");
    const STORAGE_KEY = "gimgm_cookie_consent";

    const runCookieLogic = () => {
      if (!banner) return;

      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) {
        setTimeout(() => {
          banner.classList.add("visible");
        }, 1500);
      }

      acceptBtn.addEventListener("click", () => {
        localStorage.setItem(STORAGE_KEY, "accepted");
        banner.classList.remove("visible");
      });

      declineBtn.addEventListener("click", () => {
        localStorage.setItem(STORAGE_KEY, "declined");
        banner.classList.remove("visible");
      });
    };

    return {
      init: () => runCookieLogic(),
    };
  })();

  // ==========================================================================
  // 8. MASTER RUN ENGINES INITIALIZATION
  // ==========================================================================
  const CoreMasterApp = (() => {
    return {
      boot: () => {
        UIController.init();
        PricingEngine.init();
        ModalSystem.init();
        ValidationController.init();
        TestimonialSlider.init();
        FAQAccordion.init();
        CookieEngine.init();
        console.log("GimGm-Mobile Core Architecture erfolgreich hochgefahren.");
      },
    };
  })();

  // Applikation starten
  CoreMasterApp.boot();
});
