(function () {
  function init() {
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    function motionState(root, button, hoverSelector) {
      var state = { paused: reduced.matches, visible: false, hover: false, pointer: false, popup: false, restUntil: 0 };
      var mouse = null;
      var hoverTargets = null;
      function sync() {
        button.setAttribute('aria-pressed', String(state.paused));
        button.textContent = state.paused ? 'Resume motion ▷' : 'Pause motion Ⅱ';
        button.setAttribute('aria-label', (state.paused ? 'Resume' : 'Pause') + ' automatic motion');
      }
      button.addEventListener('click', function () { state.paused = !state.paused; sync(); });
      root.addEventListener('pointerenter', function (event) { if (event.pointerType === 'mouse' && !hoverSelector) state.hover = true; });
      root.addEventListener('pointermove', function (event) { if (event.pointerType === 'mouse' && hoverSelector) { mouse = { x: event.clientX, y: event.clientY }; } });
      root.addEventListener('pointerleave', function () { state.hover = false; mouse = null; });
      root.addEventListener('pointerdown', function () { state.pointer = true; });
      window.addEventListener('pointerup', function () { state.pointer = false; });
      window.addEventListener('pointercancel', function () { state.pointer = false; });
      root.addEventListener('wheel', function () { state.restUntil = performance.now() + 3500; }, { passive: true });
      if ('IntersectionObserver' in window) new IntersectionObserver(function (entries) { state.visible = entries[0].isIntersecting; }, { threshold: 0.05 }).observe(root);
      else state.visible = true;
      reduced.addEventListener('change', function () { state.paused = reduced.matches; sync(); });
      state.running = function () {
        if (hoverSelector && mouse) {
          if (!hoverTargets) hoverTargets = root.querySelectorAll(hoverSelector);
          state.hover = Array.from(hoverTargets).some(function (target) {
            var rect = target.getBoundingClientRect();
            return mouse.x >= rect.left && mouse.x <= rect.right && mouse.y >= rect.top && mouse.y <= rect.bottom;
          });
        }
        var focus = root.contains(document.activeElement) && document.activeElement !== button;
        return !state.paused && !state.hover && !state.pointer && !state.popup && state.visible && !focus && !document.hidden && performance.now() > state.restUntil;
      };
      sync();
      return state;
    }

    var research = document.querySelector('#research');
    if (research) {
      var state = motionState(research, research.querySelector('[data-research-motion]'));
      var controllers = [];
      research.querySelectorAll('[data-research-gallery]').forEach(function (gallery) {
        var track = gallery.querySelector('.research-track');
        var slides = Array.from(gallery.querySelectorAll('[data-research-slide]'));
        var caption = gallery.querySelector('[data-research-caption]');
        var index = 0;
        var animation = null;
        var manualAnimation = false;
        var clone = slides[0].cloneNode(true);
        clone.removeAttribute('data-research-slide');
        clone.setAttribute('aria-hidden', 'true');
        clone.inert = true;
        track.appendChild(clone);
        var previousClone = slides[slides.length - 1].cloneNode(true);
        previousClone.removeAttribute('data-research-slide');
        previousClone.setAttribute('aria-hidden', 'true');
        previousClone.inert = true;
        track.insertBefore(previousClone, slides[0]);
        track.style.transform = 'translateX(-100%)';
        gallery.classList.add('is-carousel');
        function select(n) {
          slides.forEach(function (slide, i) { slide.inert = i !== n; slide.setAttribute('aria-hidden', String(i !== n)); });
          caption.textContent = slides[n].dataset.caption;
          gallery.dataset.activeIndex = n;
        }
        function show(n, animate, manual) {
          var start = getComputedStyle(track).transform;
          if (animation) { animation.cancel(); animation = null; }
          var real = (n % slides.length + slides.length) % slides.length;
          index = real;
          select(real);
          manualAnimation = !!manual;
          if (!animate || reduced.matches || !track.animate) { track.style.transform = 'translateX(-' + (real + 1) * 100 + '%)'; return; }
          animation = track.animate([
            { transform: start },
            { transform: 'translateX(-' + (n + 1) * 100 + '%)' }
          ], { duration: 850, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'forwards' });
          animation.onfinish = function () {
            track.style.transform = 'translateX(-' + (real + 1) * 100 + '%)';
            animation.cancel(); animation = null;
          };
        }
        function navigate(direction) { elapsed = 0; show(index + direction, true, true); }
        gallery.querySelector('[data-research-prev]').addEventListener('click', function () { navigate(-1); });
        gallery.querySelector('[data-research-next]').addEventListener('click', function () { navigate(1); });
        gallery.addEventListener('keydown', function (event) {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); navigate(event.key === 'ArrowLeft' ? -1 : 1); }
        });
        controllers.push({ next: function () { show(index + 1, true); }, tick: function (running) { if (animation) { if (running || manualAnimation) animation.play(); else animation.pause(); } } });
        select(0);
        if (window.jQuery && window.jQuery.fn.magnificPopup) {
          window.jQuery(slides).magnificPopup({
            type: 'image', gallery: { enabled: true },
            image: { titleSrc: function (item) { return item.el.find('img').attr('alt'); } },
            closeOnContentClick: false, midClick: true,
            callbacks: {
              open: function () { state.popup = true; },
              close: function () { state.popup = false; },
              change: function () { show(this.index, false); }
            }
          });
        }
      });
      var elapsed = 0, previous = performance.now();
      function researchFrame(now) {
        var running = state.running();
        if (running) elapsed += Math.min(now - previous, 64);
        previous = now;
        controllers.forEach(function (controller) { controller.tick(running); });
        if (elapsed >= 6000) { elapsed = 0; controllers.forEach(function (controller) { controller.next(); }); }
        requestAnimationFrame(researchFrame);
      }
      requestAnimationFrame(researchFrame);
    }

    var work = document.querySelector('[data-work-gallery]');
    if (work) {
      var workState = motionState(work, work.querySelector('[data-work-motion]'), '.ed-paper-image img');
      var viewport = work.querySelector('.work-viewport');
      var workTrack = work.querySelector('.work-track');
      var originals = Array.from(workTrack.children);
      originals.forEach(function (item) {
        var clone = item.cloneNode(true); clone.setAttribute('aria-hidden', 'true'); clone.inert = true; clone.dataset.workClone = '';
        workTrack.appendChild(clone);
      });
      var loopWidth = 0;
      function measure() { loopWidth = workTrack.children[originals.length].offsetLeft - originals[0].offsetLeft; }
      measure();
      if ('ResizeObserver' in window) new ResizeObserver(measure).observe(viewport);
      var workPrevious = performance.now(), position = viewport.scrollLeft;
      viewport.addEventListener('scroll', function () { position = viewport.scrollLeft; }, { passive: true });
      function workFrame(now) {
        if (workState.running() && loopWidth) {
          position += Math.min(now - workPrevious, 64) * 0.035;
          if (position >= loopWidth) position -= loopWidth;
          viewport.scrollLeft = position;
        }
        workPrevious = now;
        requestAnimationFrame(workFrame);
      }
      work.querySelector('[data-work-prev]').addEventListener('click', function () { viewport.scrollBy({ left: -(originals[0].offsetWidth + 32), behavior: reduced.matches ? 'instant' : 'smooth' }); });
      work.querySelector('[data-work-next]').addEventListener('click', function () { viewport.scrollBy({ left: originals[0].offsetWidth + 32, behavior: reduced.matches ? 'instant' : 'smooth' }); });
      requestAnimationFrame(workFrame);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}());
