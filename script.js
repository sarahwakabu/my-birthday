/* ==========================================================================
   ROMANTIC DIGITAL NOTEBOOK - EXTRAORDINARY INTERACTIVE LOGIC (script.js)
   Supporting 29 Real User Photos Dynamically
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // =========================================================================
  // 1. ALL 29 REAL USER PHOTOS DATA ARRAY
  // =========================================================================
  const allUserPhotos = [
    { src: 'assets/images/177a155cee575e2bf58e94919bc8c18d_0.jpeg', caption: 'Sweetest Smile 💖', sticker: '💖' },
    { src: 'assets/images/46652e6053849359bfd984a28b59d37a_0.jpeg', caption: 'Golden Sunshine ✨', sticker: '✨' },
    { src: 'assets/images/IMG-20260704-WA0018.jpg', caption: 'WhatsApp Memories 📱', sticker: '📱' },
    { src: 'assets/images/IMG-20260704-WA0019.jpg', caption: 'Cute Moments 🌸', sticker: '🌸' },
    { src: 'assets/images/IMG-20260704-WA0020.jpg', caption: 'My Beautiful Girl 💕', sticker: '💕' },
    { src: 'assets/images/IMG-20260704-WA0021.jpg', caption: 'Precious Laughs 😄', sticker: '😄' },
    { src: 'assets/images/IMG-20260704-WA0022.jpg', caption: 'Sparkle in Your Eyes ✨', sticker: '✨' },
    { src: 'assets/images/IMG_20251026_140316.jpg', caption: 'October Magic 🍁', sticker: '🍁' },
    { src: 'assets/images/IMG_20251115_121123.jpg', caption: 'Nov Days Together 🍂', sticker: '🍂' },
    { src: 'assets/images/IMG_20251116_123811.jpg', caption: 'Warmest Hugs 🤍', sticker: '🤍' },
    { src: 'assets/images/IMG_20251119_123826.jpg', caption: 'Sweet Autumn Afternoon 🍵', sticker: '🍵' },
    { src: 'assets/images/IMG_20251128_140452.jpg', caption: 'Unforgettable Smiles 🌟', sticker: '🌟' },
    { src: 'assets/images/IMG_20251214_123917.jpg', caption: 'December Winter Warmth ❄️', sticker: '❄️' },
    { src: 'assets/images/IMG_20251219_174005.jpg', caption: 'Holiday Magic 🎄', sticker: '🎄' },
    { src: 'assets/images/IMG_20260222_144626.jpg', caption: 'Feb Coffee & Conversations ☕', sticker: '☕' },
    { src: 'assets/images/IMG_20260228_051330.jpg', caption: 'Early Morning Sunrise 🌅', sticker: '🌅' },
    { src: 'assets/images/IMG_20260317_093100.jpg', caption: 'Spring Blossom Glow 🌷', sticker: '🌷' },
    { src: 'assets/images/IMG_20260404_00401394.jpeg', caption: 'April Night Talks 🌌', sticker: '🌌' },
    { src: 'assets/images/IMG_20260404_00401474.jpeg', caption: 'Cutest Expressions 🎀', sticker: '🎀' },
    { src: 'assets/images/IMG_20260608_090035.jpg', caption: 'June Morning Walk ☀️', sticker: '☀️' },
    { src: 'assets/images/IMG_20260617_095026.jpg', caption: 'Bright Summer Days 🎶', sticker: '🎶' },
    { src: 'assets/images/IMG_20260617_170506.jpg', caption: 'Golden Sunset Glow 🌙', sticker: '🌙' },
    { src: 'assets/images/IMG_20260629_092904.jpg', caption: 'Forever & Always 💌', sticker: '💌' },
    { src: 'assets/images/IMG_20260701_202437_001.jpg', caption: 'July Evening Magic 🎆', sticker: '🎆' },
    { src: 'assets/images/IMG_20260703_133327.jpg', caption: 'Summer Sunshine Smiles 🌺', sticker: '🌺' },
    { src: 'assets/images/IMG_20260703_134943.jpg', caption: 'Looking at You 💐', sticker: '💐' },
    { src: 'assets/images/IMG_20260703_135838_892.jpg', caption: 'Pure Happiness ⭐', sticker: '⭐' },
    { src: 'assets/images/IMG_20260703_140553.jpg', caption: 'Love in Every Moment 💖', sticker: '💖' },
    { src: 'assets/images/IMG_20260720_110613.jpg', caption: 'Birthday Month Celebration 🎂', sticker: '🎂' }
  ];

  // =========================================================================
  // AUTOMATIC MODERN CINEMATIC BACKGROUND SLIDESHOW ENGINE
  // =========================================================================
  const slideshowImages = allUserPhotos.map(p => p.src);

  // Fisher-Yates Shuffle Algorithm for Random Order on App Start
  function shuffleArray(arr) {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  let shuffledSlides = shuffleArray(slideshowImages);
  let currentIndex = 0;
  let isPaused = false;
  let isMosaicMode = false;
  let slideshowTimer = null;
  const SLIDE_INTERVAL = 3000; // Automatically changes every 3 seconds

  const layerA = document.getElementById('slide-layer-a');
  const layerB = document.getElementById('slide-layer-b');
  const mosaicGrid = document.getElementById('slideshow-collage-grid');
  const counterEl = document.getElementById('bg-slideshow-counter');
  const btnPause = document.getElementById('btn-bg-pause');
  const btnNext = document.getElementById('btn-bg-next');
  const btnMode = document.getElementById('btn-bg-mode');

  let activeLayer = layerA;
  let nextLayer = layerB;

  // Preload Image Buffer to prevent any lag, flashing or white flickers
  const imageCache = {};
  function preloadImage(url) {
    if (!url || imageCache[url]) return;
    const img = new Image();
    img.src = url;
    imageCache[url] = img;
  }

  // Preload all 29 images in advance
  shuffledSlides.forEach(url => preloadImage(url));

  function updateCounter() {
    if (counterEl) {
      counterEl.textContent = `${currentIndex + 1} / ${shuffledSlides.length}`;
    }
  }

  function renderSlide(index) {
    if (shuffledSlides.length === 0) return;
    const nextUrl = shuffledSlides[index];

    // Preload next image in advance
    const peekNextIndex = (index + 1) % shuffledSlides.length;
    preloadImage(shuffledSlides[peekNextIndex]);

    if (isMosaicMode) {
      renderMosaicGrid(index);
      return;
    }

    if (mosaicGrid) mosaicGrid.classList.remove('active');

    // Set background image on next buffer layer
    if (nextLayer) {
      nextLayer.style.backgroundImage = `url('${nextUrl}')`;

      // Trigger hardware-accelerated smooth 1.1s crossfade transition
      activeLayer.classList.remove('active');
      nextLayer.classList.add('active');

      // Swap buffer references
      const temp = activeLayer;
      activeLayer = nextLayer;
      nextLayer = temp;
    }

    updateCounter();
  }

  function renderMosaicGrid(startIndex) {
    if (!mosaicGrid) return;
    mosaicGrid.innerHTML = '';

    // Select 8 images starting from startIndex to form clean 4x2 mosaic collage
    for (let i = 0; i < 8; i++) {
      const imgIdx = (startIndex + i) % shuffledSlides.length;
      const item = document.createElement('div');
      item.className = 'collage-item';
      item.innerHTML = `<img src="${shuffledSlides[imgIdx]}" alt="Background Mosaic Memory" loading="lazy">`;
      mosaicGrid.appendChild(item);
    }

    mosaicGrid.classList.add('active');
    if (layerA) layerA.classList.remove('active');
    if (layerB) layerB.classList.remove('active');
    updateCounter();
  }

  function advanceSlide() {
    if (isPaused) return;
    currentIndex = (currentIndex + 1) % shuffledSlides.length;
    renderSlide(currentIndex);
  }

  function startSlideshow() {
    stopSlideshow();
    slideshowTimer = setInterval(advanceSlide, SLIDE_INTERVAL);
  }

  function stopSlideshow() {
    if (slideshowTimer) {
      clearInterval(slideshowTimer);
      slideshowTimer = null;
    }
  }

  // Initialize First Slide & Start Slideshow
  renderSlide(0);
  startSlideshow();

  // Control Bar Listeners
  if (btnPause) {
    btnPause.addEventListener('click', () => {
      isPaused = !isPaused;
      btnPause.textContent = isPaused ? '▶️' : '⏸️';
      btnPause.setAttribute('title', isPaused ? 'Resume Slideshow' : 'Pause Slideshow');
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % shuffledSlides.length;
      renderSlide(currentIndex);
      if (!isPaused) startSlideshow();
    });
  }

  if (btnMode) {
    btnMode.addEventListener('click', () => {
      isMosaicMode = !isMosaicMode;
      btnMode.textContent = isMosaicMode ? '🖼️ Single' : '🧩 Collage';
      if (isMosaicMode) {
        renderMosaicGrid(currentIndex);
      } else {
        if (mosaicGrid) mosaicGrid.classList.remove('active');
        renderSlide(currentIndex);
      }
    });
  }

  // Render All 29 Polaroid Cards dynamically
  const polaroidContainer = document.getElementById('polaroid-container');
  if (polaroidContainer) {
    polaroidContainer.innerHTML = '';
    allUserPhotos.forEach((photo, idx) => {
      const card = document.createElement('div');
      card.className = 'polaroid-card';
      card.setAttribute('data-idx', idx);
      card.innerHTML = `
        <div class="polaroid-tape"></div>
        <div class="polaroid-sticker">${photo.sticker}</div>
        <div class="polaroid-img-wrapper">
          <img src="${photo.src}" alt="${photo.caption}" class="polaroid-img">
        </div>
        <div class="polaroid-caption">${photo.caption}</div>
      `;
      polaroidContainer.appendChild(card);
    });
  }

  // =========================================================================
  // 2. STATE & VIEW NAVIGATION
  // =========================================================================
  let targetBirthdayDate = '2026-07-24';
  let audioContext = null;
  let isMusicPlaying = false;
  let musicInterval = null;

  const views = {
    landing: document.getElementById('landing-view'),
    mainMenu: document.getElementById('main-menu-view'),
    photos: document.getElementById('photos-view'),
    letter: document.getElementById('letter-view'),
    flowers: document.getElementById('flowers-view'),
    lock: document.getElementById('lock-view')
  };

  function switchView(targetViewId) {
    Object.values(views).forEach(view => {
      if (view) {
        view.classList.remove('active');
        view.style.display = 'none';
      }
    });

    const activeView = views[targetViewId];
    if (activeView) {
      activeView.style.display = 'flex';
      setTimeout(() => {
        activeView.classList.add('active');
      }, 50);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Bind Yes Button on Landing Screen
  document.getElementById('btn-yes')?.addEventListener('click', () => {
    triggerConfetti(45);
    playChimeMelody([523.25, 659.25, 783.99, 1046.50]);
    switchView('mainMenu');
  });

  // Bind Back Buttons
  document.querySelectorAll('.btn-back-menu').forEach(btn => {
    btn.addEventListener('click', () => {
      switchView('mainMenu');
    });
  });

  // Bind Main Menu Cards
  document.getElementById('card-photos')?.addEventListener('click', () => switchView('photos'));
  document.getElementById('card-letter')?.addEventListener('click', () => switchView('letter'));
  document.getElementById('card-flowers')?.addEventListener('click', () => switchView('flowers'));
  document.getElementById('card-lock')?.addEventListener('click', () => switchView('lock'));

  // =========================================================================
  // 3. PLAYFUL EVASIVE "NO THANKS" BUTTON LOGIC
  // =========================================================================
  const btnNo = document.getElementById('btn-no');
  
  const playfulMessages = [
    "Are you sure? 🥺",
    "Wrong button! 😜",
    "Nice try! Hahaha",
    "You can't say no! 💖",
    "YES PLEASE! 💕"
  ];
  let playfulIndex = 0;

  if (btnNo) {
    const handleNoAction = (e) => {
      e.preventDefault();
      
      if (playfulIndex < playfulMessages.length) {
        btnNo.textContent = playfulMessages[playfulIndex];
        playfulIndex++;

        const randomX = (Math.random() - 0.5) * 90;
        const randomY = (Math.random() - 0.5) * 45;
        btnNo.style.transform = `translate(${randomX}px, ${randomY}px) scale(1.08)`;
        
        playChimeNote(300 + playfulIndex * 50);

        if (playfulIndex === playfulMessages.length) {
          btnNo.style.background = 'linear-gradient(135deg, #FF85A1 0%, #E63946 100%)';
          btnNo.style.color = '#FFF';
          btnNo.style.border = 'none';
          btnNo.style.transform = 'translate(0, 0) scale(1.1)';
        }
      } else {
        triggerConfetti(45);
        playChimeMelody([523.25, 659.25, 783.99, 1046.50]);
        switchView('mainMenu');
      }
    };

    btnNo.addEventListener('mouseover', handleNoAction);
    btnNo.addEventListener('click', handleNoAction);
  }

  // Cat Wrapper Click Interaction
  const catWrapper = document.getElementById('cat-wrapper');
  if (catWrapper) {
    catWrapper.addEventListener('click', () => {
      playChimeMelody([880, 1108.73, 1318.51]);
      createBurstHearts(catWrapper);
    });
  }

  // Blowable Birthday Cake Candle Interaction
  const cakeWidget = document.getElementById('cake-widget');
  const candleFlame = document.getElementById('candle-flame');
  const candleSmoke = document.getElementById('candle-smoke');

  if (cakeWidget) {
    cakeWidget.addEventListener('click', () => {
      if (candleFlame && !candleFlame.classList.contains('blown-out')) {
        candleFlame.classList.add('blown-out');
        if (candleSmoke) {
          candleSmoke.classList.add('active');
        }
        playChimeMelody([523.25, 659.25, 783.99, 1046.50, 1318.51]);
        triggerConfetti(60);
        createBurstHearts(cakeWidget);

        setTimeout(() => {
          alert("✨ Make a wish, Sarah! May all your dreams come true! 🎂💖");
        }, 300);
      } else {
        if (candleFlame) candleFlame.classList.remove('blown-out');
        if (candleSmoke) candleSmoke.classList.remove('active');
        playChimeNote(600, 0.3);
      }
    });
  }

  function createBurstHearts(element) {
    const rect = element.getBoundingClientRect();
    for (let i = 0; i < 8; i++) {
      const heart = document.createElement('div');
      heart.innerHTML = ['💖', '✨', '🎂', '🌸'][Math.floor(Math.random() * 4)];
      heart.style.position = 'fixed';
      heart.style.left = `${rect.left + rect.width / 2}px`;
      heart.style.top = `${rect.top + rect.height / 2}px`;
      heart.style.fontSize = '1.6rem';
      heart.style.pointerEvents = 'none';
      heart.style.zIndex = '1000';
      heart.style.transition = 'all 1.1s ease-out';
      document.body.appendChild(heart);

      setTimeout(() => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 70 + Math.random() * 70;
        heart.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist - 60}px) scale(1.5)`;
        heart.style.opacity = '0';
      }, 20);

      setTimeout(() => heart.remove(), 1150);
    }
  }

  // =========================================================================
  // 4. CURSOR HEART & SPARKLE TRAIL
  // =========================================================================
  let lastSparkleTime = 0;
  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastSparkleTime > 75) {
      lastSparkleTime = now;
      const sparkle = document.createElement('div');
      sparkle.className = 'cursor-sparkle';
      sparkle.innerHTML = ['✨', '💖', '🌸', '💫'][Math.floor(Math.random() * 4)];
      sparkle.style.left = `${e.clientX}px`;
      sparkle.style.top = `${e.clientY}px`;
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 800);
    }
  });

  // =========================================================================
  // 5. BACKGROUND MUSIC & AUDIO SYNTHESIZER
  // =========================================================================
  const audioBtn = document.getElementById('audio-toggle-btn');
  const audioIcon = document.getElementById('audio-icon');
  const audioLabel = document.getElementById('audio-label');

  function initAudio() {
    if (!audioContext) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioContext();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
  }

  function playChimeNote(freq, duration = 0.5) {
    try {
      initAudio();
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioContext.currentTime);

      gain.gain.setValueAtTime(0.12, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start();
      osc.stop(audioContext.currentTime + duration);
    } catch (e) {
      console.log('Audio note error:', e);
    }
  }

  function playChimeMelody(notes) {
    notes.forEach((freq, idx) => {
      setTimeout(() => playChimeNote(freq, 0.6), idx * 140);
    });
  }

  const ambientScale = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];
  function startAmbientMusic() {
    initAudio();
    isMusicPlaying = true;
    if (audioIcon) audioIcon.textContent = '🎶';
    if (audioLabel) audioLabel.textContent = 'Music: On';

    let noteIndex = 0;
    musicInterval = setInterval(() => {
      if (!isMusicPlaying) return;
      const freq = ambientScale[noteIndex % ambientScale.length];
      playChimeNote(freq, 1.2);
      noteIndex = (noteIndex + Math.floor(Math.random() * 3) + 1) % ambientScale.length;
    }, 1800);
  }

  function stopAmbientMusic() {
    isMusicPlaying = false;
    if (musicInterval) clearInterval(musicInterval);
    if (audioIcon) audioIcon.textContent = '🎵';
    if (audioLabel) audioLabel.textContent = 'Music: Off';
  }

  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      if (isMusicPlaying) {
        stopAmbientMusic();
      } else {
        startAmbientMusic();
      }
    });
  }

  // =========================================================================
  // 6. LIGHTBOX MODAL NAVIGATOR (ALL 29 PHOTOS)
  // =========================================================================
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const btnCloseLightbox = document.getElementById('btn-close-lightbox');
  const btnLightboxPrev = document.getElementById('btn-lightbox-prev');
  const btnLightboxNext = document.getElementById('btn-lightbox-next');

  let currentPhotoIdx = 0;

  function openLightbox(idx) {
    if (idx >= 0 && idx < allUserPhotos.length) {
      currentPhotoIdx = idx;
      const data = allUserPhotos[currentPhotoIdx];
      if (lightboxImg && lightboxCaption && lightboxModal) {
        lightboxImg.src = data.src;
        lightboxCaption.textContent = data.caption;
        lightboxModal.classList.add('active');
        playChimeNote(523.25, 0.2);
      }
    }
  }

  document.getElementById('polaroid-container')?.addEventListener('click', (e) => {
    const card = e.target.closest('.polaroid-card');
    if (card) {
      const idx = parseInt(card.getAttribute('data-idx'));
      openLightbox(idx);
    }
  });

  document.getElementById('letter-attached-photo')?.addEventListener('click', () => {
    openLightbox(0);
  });

  if (btnLightboxPrev) {
    btnLightboxPrev.addEventListener('click', () => {
      const newIdx = (currentPhotoIdx - 1 + allUserPhotos.length) % allUserPhotos.length;
      openLightbox(newIdx);
    });
  }

  if (btnLightboxNext) {
    btnLightboxNext.addEventListener('click', () => {
      const newIdx = (currentPhotoIdx + 1) % allUserPhotos.length;
      openLightbox(newIdx);
    });
  }

  if (btnCloseLightbox && lightboxModal) {
    btnCloseLightbox.addEventListener('click', () => lightboxModal.classList.remove('active'));
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) lightboxModal.classList.remove('active');
    });
  }

  document.addEventListener('keydown', (e) => {
    if (lightboxModal && lightboxModal.classList.contains('active')) {
      if (e.key === 'ArrowLeft' && btnLightboxPrev) btnLightboxPrev.click();
      if (e.key === 'ArrowRight' && btnLightboxNext) btnLightboxNext.click();
      if (e.key === 'Escape' && btnCloseLightbox) btnCloseLightbox.click();
    }
  });

  // Custom Photo Upload
  const btnAddMemory = document.getElementById('btn-add-memory');
  const customPhotoInput = document.getElementById('custom-photo-input');

  if (btnAddMemory && customPhotoInput) {
    btnAddMemory.addEventListener('click', () => customPhotoInput.click());

    customPhotoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          const captionText = prompt('Enter a caption for this memory:', 'Our Special Moment 💖') || 'Special Memory 💖';
          
          allUserPhotos.push({
            src: evt.target.result,
            caption: captionText,
            sticker: '🌟'
          });

          const newIdx = allUserPhotos.length - 1;
          const card = document.createElement('div');
          card.className = 'polaroid-card';
          card.setAttribute('data-idx', newIdx);
          card.innerHTML = `
            <div class="polaroid-tape"></div>
            <div class="polaroid-sticker">🌟</div>
            <div class="polaroid-img-wrapper">
              <img src="${evt.target.result}" alt="${captionText}" class="polaroid-img">
            </div>
            <div class="polaroid-caption">${captionText}</div>
          `;
          
          polaroidContainer.appendChild(card);
          triggerConfetti(25);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // =========================================================================
  // 7. LOVE LETTER NOTEPAD & TYPEWRITER MODE
  // =========================================================================
  const letterBodyText = document.getElementById('letter-body-text');
  const btnTypewriter = document.getElementById('btn-typewriter');
  const btnEditLetter = document.getElementById('btn-edit-letter');

  const fullLetterContent = `Happy Birthday to my favorite person in the entire world! 🎂

Even though miles and screens separate us today, my heart has never felt closer to anyone. Distance only proves how strong and genuine our love really is. Every video call, every late-night voice message, and every shared laugh means the universe to me.

Thank you for bringing so much warmth, comfort, and happiness into my life. I am counting down every single second until I get to hold you tight and celebrate in person.

Wishing you a day filled with all your favorite things, endless smiles, and joy!

Always & Forever Yours,`;

  if (btnTypewriter && letterBodyText) {
    btnTypewriter.addEventListener('click', () => {
      letterBodyText.textContent = '';
      let i = 0;
      btnTypewriter.disabled = true;

      const typeInterval = setInterval(() => {
        if (i < fullLetterContent.length) {
          letterBodyText.textContent += fullLetterContent.charAt(i);
          i++;
          if (i % 12 === 0) playChimeNote(600 + (i % 5) * 40, 0.1);
        } else {
          clearInterval(typeInterval);
          btnTypewriter.disabled = false;
        }
      }, 35);
    });
  }

  if (btnEditLetter && letterBodyText) {
    btnEditLetter.addEventListener('click', () => {
      const newLetter = prompt('Customize your birthday letter message:', letterBodyText.textContent);
      if (newLetter !== null) {
        letterBodyText.textContent = newLetter;
      }
    });
  }

  // =========================================================================
  // 8. VIRTUAL FLOWER BOUQUET INTERACTIVE NOTES
  // =========================================================================
  const flowerInteractive = document.querySelectorAll('.flower-interactive');
  const flowerNoteDisplay = document.getElementById('flower-note-display');

  flowerInteractive.forEach(flower => {
    flower.addEventListener('click', (e) => {
      const msg = flower.getAttribute('data-msg');
      if (flowerNoteDisplay) {
        flowerNoteDisplay.textContent = msg;
        flowerNoteDisplay.style.transform = 'scale(1.06)';
        setTimeout(() => flowerNoteDisplay.style.transform = 'scale(1)', 300);
      }
      playChimeMelody([659.25, 783.99, 1046.50]);
      createBurstHearts(flower);
    });
  });

  // =========================================================================
  // 9. BIRTHDAY LOCK & SECRET SURPRISE UNLOCK LOGIC
  // =========================================================================
  const dateInput = document.getElementById('birthday-date-input');
  const btnUnlockDate = document.getElementById('btn-unlock-date');
  const lockFeedback = document.getElementById('lock-feedback');
  const lockBoxContainer = document.getElementById('lock-box-container');
  const unlockedSection = document.getElementById('unlocked-section');
  const btnSetCustomDate = document.getElementById('btn-set-custom-date');

  if (dateInput) {
    dateInput.value = targetBirthdayDate;
  }

  if (btnSetCustomDate) {
    btnSetCustomDate.addEventListener('click', () => {
      const customDate = prompt('Set the target birthday date (YYYY-MM-DD):', targetBirthdayDate);
      if (customDate) {
        targetBirthdayDate = customDate;
        if (dateInput) dateInput.value = customDate;
        alert(`Target birthday date updated to ${customDate}!`);
      }
    });
  }

  if (btnUnlockDate && dateInput) {
    btnUnlockDate.addEventListener('click', () => {
      const inputVal = dateInput.value;
      const targetMonthDay = targetBirthdayDate.substring(5);
      const inputMonthDay = inputVal ? inputVal.substring(5) : '';

      if (inputVal === targetBirthdayDate || inputMonthDay === targetMonthDay) {
        if (lockFeedback) {
          lockFeedback.className = 'lock-feedback success';
          lockFeedback.textContent = '🎉 Unlocked! Welcome to your secret surprise!';
        }

        playChimeMelody([523.25, 659.25, 783.99, 1046.50, 1318.51]);
        triggerConfetti(90);

        setTimeout(() => {
          if (lockBoxContainer) lockBoxContainer.style.display = 'none';
          if (unlockedSection) {
            unlockedSection.style.display = 'flex';
            setTimeout(() => unlockedSection.classList.add('active'), 50);
          }
        }, 800);

      } else {
        if (lockFeedback) {
          lockFeedback.className = 'lock-feedback error';
          lockFeedback.textContent = '❌ Oops! That date doesn\'t match her birthday. Try again!';
        }
        lockBoxContainer.classList.add('shake-error');
        playChimeNote(180, 0.4);

        setTimeout(() => {
          lockBoxContainer.classList.remove('shake-error');
        }, 450);
      }
    });
  }

  // =========================================================================
  // 10. REUNION COUNTDOWN TIMER
  // =========================================================================
  function updateCountdownTimer() {
    const cdDays = document.getElementById('cd-days');
    const cdHours = document.getElementById('cd-hours');
    const cdMins = document.getElementById('cd-mins');
    const cdSecs = document.getElementById('cd-secs');

    if (!cdDays) return;

    const reunionDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    function tick() {
      const now = new Date();
      const diff = reunionDate - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / 1000 / 60) % 60);
        const secs = Math.floor((diff / 1000) % 60);

        cdDays.textContent = days.toString().padStart(2, '0');
        cdHours.textContent = hours.toString().padStart(2, '0');
        cdMins.textContent = mins.toString().padStart(2, '0');
        cdSecs.textContent = secs.toString().padStart(2, '0');
      }
    }

    tick();
    setInterval(tick, 1000);
  }

  updateCountdownTimer();

  // =========================================================================
  // 11. SECRET UNLOCKED MILESTONE CARDS & MODALS
  // =========================================================================
  const milestoneModal = document.getElementById('milestone-modal');
  const modalBodyContent = document.getElementById('modal-body-content');
  const btnCloseModal = document.getElementById('btn-close-modal');

  const milestoneData = {
    1: {
      title: "The First Hug ✈️",
      subtitle: "No more screens. Just you and me.",
      body: `
        <div style="text-align: center;">
          <div style="background: linear-gradient(135deg, #FFFDF9, #FFF0F3); border: 2px dashed #E63946; border-radius: 18px; padding: 26px; margin-top: 15px; position: relative;">
            <div style="font-size: 0.85rem; letter-spacing: 2.5px; color: #E63946; font-weight: 700;">NON-STOP REUNION BOARDING PASS</div>
            <div style="font-size: 2.4rem; font-family: var(--font-handwriting); color: var(--text-main); margin: 12px 0;">Ticket to Your Arms ✈️</div>
            <div style="display: flex; justify-content: space-around; font-size: 1rem; margin: 16px 0;">
              <div><strong>FROM:</strong> Long Distance</div>
              <div style="color: var(--accent-red);">➔</div>
              <div><strong>TO:</strong> Next to You</div>
            </div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">SEAT: 01A (VIP LOVE) • VALID: FOR EVER & ALWAYS</div>
          </div>
          <p style="margin-top: 22px; font-family: var(--font-handwriting); font-size: 1.7rem; color: var(--text-handwritten);">
            "The day we meet again will be the best day of my life. No timer on calls, no weak wifi, just holding you tight and never letting go."
          </p>
        </div>
      `
    },
    2: {
      title: "Our Little Home 🏡",
      subtitle: "Simple mornings. Late-night talks.",
      body: `
        <div style="text-align: center;">
          <div style="font-size: 3.8rem; margin-bottom: 12px;">☕ 🐈 🛋️ 🕯️</div>
          <h4 style="font-size: 1.5rem; color: var(--accent-red); margin-bottom: 14px;">Cozy Days Ahead</h4>
          <p style="font-family: var(--font-handwriting); font-size: 1.7rem; color: var(--text-handwritten); line-height: 1.5;">
            "I dream about making breakfast together in our kitchen, watching movies wrapped in the same blanket, and coming home to you every single evening."
          </p>
          <div style="margin-top: 22px; padding: 16px; background: var(--bg-paper); border-radius: 14px; font-size: 1rem; color: var(--text-muted);">
            ✨ Dream Home Checklist: Cozy couch, plants everywhere, cat sleeping on the rug, and us.
          </div>
        </div>
      `
    },
    3: {
      title: "Side by Side 🌌",
      subtitle: "New places. Same love.",
      body: `
        <div style="text-align: center;">
          <h4 style="font-size: 1.4rem; color: var(--accent-red); margin-bottom: 16px;">Our Couples Adventure List 🗺️</h4>
          <ul style="text-align: left; list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px; font-size: 1.1rem;">
            <li><input type="checkbox" checked> 💖 Stargazing on a warm quiet beach</li>
            <li><input type="checkbox" checked> 🚗 Road tripping with our favorite playlist</li>
            <li><input type="checkbox"> 🥐 Exploring cozy bakeries in new cities</li>
            <li><input type="checkbox"> 📸 Taking thousands of polaroid photos together</li>
          </ul>
          <p style="margin-top: 22px; font-family: var(--font-handwriting); font-size: 1.6rem; color: var(--accent-red);">
            "Every place in the world is beautiful when I'm walking through it holding your hand."
          </p>
        </div>
      `
    }
  };

  [1, 2, 3].forEach(id => {
    document.getElementById(`milestone-${id}`)?.addEventListener('click', () => {
      const data = milestoneData[id];
      if (data && modalBodyContent && milestoneModal) {
        modalBodyContent.innerHTML = `
          <h3 style="font-family: var(--font-handwriting); font-size: 3rem; color: var(--accent-red); margin-bottom: 4px;">${data.title}</h3>
          <p style="font-size: 1.05rem; color: var(--text-muted); margin-bottom: 20px;">${data.subtitle}</p>
          ${data.body}
        `;
        milestoneModal.classList.add('active');
        playChimeMelody([659.25, 783.99, 1046.50]);
      }
    });
  });

  if (btnCloseModal && milestoneModal) {
    btnCloseModal.addEventListener('click', () => {
      milestoneModal.classList.remove('active');
    });

    milestoneModal.addEventListener('click', (e) => {
      if (e.target === milestoneModal) {
        milestoneModal.classList.remove('active');
      }
    });
  }

  // =========================================================================
  // 12. CONFETTI & FLOATING PARTICLES CANVAS
  // =========================================================================
  function triggerConfetti(particleCount = 50) {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: particleCount,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF85A1', '#E63946', '#FFB703', '#FFC6C7', '#A8DADC', '#C77DFF']
      });
    }
  }

  // Floating Particles Background Canvas
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 4 + 2,
        speedY: Math.random() * 0.8 + 0.3,
        opacity: Math.random() * 0.5 + 0.25,
        color: ['#FFC6C7', '#FF85A1', '#FFD166', '#C77DFF'][Math.floor(Math.random() * 4)]
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        p.y -= p.speedY;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

});
