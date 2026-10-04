
  // Loader
  window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('loader').classList.add('hidden'), 400);
  });

  // Header scroll state
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
  }));

  // Active nav indicator via IntersectionObserver
  const sections = document.querySelectorAll('main section[id]');
  const navA = document.querySelectorAll('.nav-links a[href^="#"]');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navA.forEach(a => a.classList.remove('active'));
        const match = document.querySelector('.nav-links a[href="#' + entry.target.id + '"]');
        if (match) match.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => navObserver.observe(s));

  // Scroll reveal
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Terminal typing effect (signature hero moment)
  const codeLines = [
    { html: '<span class="kw">const</span> developer = {' },
    { html: '&nbsp;&nbsp;name: <span class="str">"Vishal"</span>,' },
    { html: '&nbsp;&nbsp;role: <span class="str">"Web Developer"</span>,' },
    { html: '&nbsp;&nbsp;stack: [<span class="str">"React"</span>, <span class="str">"Node"</span>, <span class="str">"MongoDB"</span>],' },
    { html: '&nbsp;&nbsp;<span class="fn">build</span>() {' },
    { html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">return</span> <span class="str">"clean, responsive UI"</span>;' },
    { html: '&nbsp;&nbsp;}' },
    { html: '};' },
  ];
  const target = document.getElementById('typeTarget');
  let li = 0;

  function typeLine() {
    if (li >= codeLines.length) {
      const cur = document.createElement('span');
      cur.className = 'cursor';
      target.appendChild(cur);
      return;
    }
    const row = document.createElement('div');
    const numSpan = document.createElement('span');
    numSpan.className = 'ln';
    numSpan.textContent = (li + 1);
    const textSpan = document.createElement('span');
    row.appendChild(numSpan);
    row.appendChild(textSpan);
    target.appendChild(row);

    const full = codeLines[li].html;
    // reveal character-by-character but respect html tags as whole chunks
    const tokens = full.match(/<[^>]+>|&nbsp;|./g) || [];
    let ti = 0;
    const speed = 14;
    const step = () => {
      if (ti < tokens.length) {
        textSpan.innerHTML += tokens[ti];
        ti++;
        setTimeout(step, speed);
      } else {
        li++;
        setTimeout(typeLine, 90);
      }
    };
    step();
  }
  setTimeout(typeLine, 700);
