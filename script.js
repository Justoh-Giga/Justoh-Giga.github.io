const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(item => item.classList.toggle(
        'active', item.getAttribute('href') === '#' + entry.target.id
      ));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach(section => observer.observe(section));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const cvLinks = [document.getElementById('cvTop'), document.getElementById('cvHero')];
cvLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    alert('Your CV PDF will be connected here next. Add your CV file to the project folder and we will link it.');
  });
});

document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const message = document.getElementById('formMessage');
  const name = form.elements.name.value.trim();
  message.textContent = `Thanks ${name}. Your message form is ready; we can connect it to your email next.`;
  form.reset();
});
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const submitButton = contactForm.querySelector("button[type='submit']");

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                formStatus.textContent =
                    "✓ Thank you! Your message has been sent successfully.";

                formStatus.style.color = "green";

                contactForm.reset();
            } else {
                formStatus.textContent =
                    "Sorry, something went wrong. Please try again.";

                formStatus.style.color = "red";
            }

        } catch (error) {
            formStatus.textContent =
                "Unable to send your message. Please try again.";

            formStatus.style.color = "red";
        }

        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
    });
}