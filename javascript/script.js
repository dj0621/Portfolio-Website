
document.addEventListener("DOMContentLoaded", () => {

    // ---------- ACTIVE NAVIGATION LINKS ----------

    // Highlight the nav link for the section currently in view
    const navLinks = document.querySelectorAll("nav a[href^='#']");
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navLinks.forEach((link) => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${entry.target.id}`
                        );
                    });
                }
            });
        },
        {
            rootMargin: "-40% 0px -55% 0px"
        }
    );

    sections.forEach((section) => observer.observe(section));


    // ---------- FOOTER YEAR ----------

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // ---------- MOBILE HAMBURGER MENU ----------

    const menuToggle = document.querySelector(".menu-toggle");
    const mobileNav = document.querySelector(".nav-links");

    function closeMenu() {
        if (!menuToggle || !mobileNav) return;

        menuToggle.classList.remove("open");
        mobileNav.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

        document.body.classList.remove("menu-open");
    }

    if (menuToggle && mobileNav) {

        // Open and close the menu when clicked
        menuToggle.addEventListener("click", () => {

            const isOpen = mobileNav.classList.toggle("open");

            menuToggle.classList.toggle("open", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

            document.body.classList.toggle("menu-open", isOpen);
        });


        // Close menu after selecting a navigation link
        navLinks.forEach((link) => {
            link.addEventListener("click", closeMenu);
        });


        // Close menu when Escape is pressed
        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });


        // Close menu when resizing to desktop
        window.addEventListener("resize", () => {

            if (window.innerWidth > 768) {
                closeMenu();
            }

        });
    }


    // ---------- SCROLL REVEAL ANIMATIONS ----------

    const revealElements = document.querySelectorAll(".reveal");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !prefersReducedMotion) {

        const revealObserver = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        // Stop observing after animation appears
                        revealObserver.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.05,
                rootMargin: "0px 0px -20px 0px"
            }
        );

        // Make elements already on screen visible
        revealElements.forEach((element) => {

            const rect = element.getBoundingClientRect();

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                element.classList.add("visible");
            }

        });

        // Enable animation styles
        document.documentElement.classList.add("js-ready");

        // Observe elements further down the page
        revealElements.forEach((element) => {

            if (!element.classList.contains("visible")) {
                revealObserver.observe(element);
            }

        });
    }

});
