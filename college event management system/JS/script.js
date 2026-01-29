    // Toggle mobile menu
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Scroll animation for elements
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.event-card, .feature-card');
            const windowHeight = window.innerHeight;
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                
                if (elementPosition < windowHeight - 100) {
                    element.classList.add('animate');
                }
            });
        };

        // Initial check on page load
        window.addEventListener('load', animateOnScroll);
        
        // Check on scroll
        window.addEventListener('scroll', animateOnScroll);

        // Add subtle parallax effect to hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
        });

        // Add ripple effect to buttons
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const x = e.clientX - e.target.getBoundingClientRect().left;
                const y = e.clientY - e.target.getBoundingClientRect().top;
                
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // events cards generation
 fetch('events.json')
    .then(response => response.json())
    .then(data => {
      const row1 = document.getElementById('events-row-1');
      const row2 = document.getElementById('events-row-2');

      data.events.forEach((event, index) => {
        const card = document.createElement('div');
        card.classList.add('event-card');

        card.innerHTML = `
          <div class="event-image">
              <img src="${event.img}" alt="${event.title}">
          </div>
          <div class="event-content">
              <div class="event-date">${event.date}</div>
              <h3 class="event-title">${event.title}</h3>
              <p class="event-desc">${event.desc}</p>
              <div class="event-actions">
                  <button class="event-btn">Learn More</button>
              </div>
          </div>
        `;

        if (index < 3) {
          row1.appendChild(card);
        } else {
          row2.appendChild(card);
        }
      });
    })
    .catch(error => console.error("Error fetching events:", error));
        