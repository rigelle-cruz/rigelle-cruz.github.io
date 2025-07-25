// === LOADING SCREEN ===
window.addEventListener('load', () => {
	const loadingScreen = document.getElementById('loading-screen');

	// Add a small delay to ensure smooth transition
	setTimeout(() => {
		loadingScreen.classList.add('fade-out');

		// Remove the loading screen from DOM after transition
		setTimeout(() => {
			loadingScreen.style.display = 'none';
			// Remove loading class and re-enable scrolling
			document.body.classList.remove('loading');
			document.body.style.overflow = 'auto';
		}, 500);
	}, 500);
});

document.addEventListener('includesLoaded', () => {
	// === SECTION HASH UPDATE ON SCROLL ===
	const sections = document.querySelectorAll('main > div[id]');
	let lastHash = '';

	const sectionObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const id = entry.target.id;
					if (id && location.hash !== `#${id}`) {
						history.replaceState(null, '', `#${id}`);
						lastHash = id;
					}
				}
			});
		},
		{ threshold: 0.5 }
	);
	sections.forEach((section) => sectionObserver.observe(section));

	// === ABOUT SECTION SLIDE LOGIC ===
	const aboutSummary = document.getElementById('about-summary');
	const skillsSummary = document.getElementById('skills-summary');
	const skillsContainer = document.querySelector('.about-skills-container');
	const toAboutBtn = document.getElementById('to-about');
	const toSkillsBtn = document.getElementById('to-skills');

	let autoSlide = true;
	let current = 0;
	let intervalId;

	function showSlide(idx) {
		aboutSummary.classList.toggle('active', idx === 0);
		skillsSummary.classList.toggle('active', idx === 1);
		toAboutBtn.classList.toggle('active', idx === 0);
		toSkillsBtn.classList.toggle('active', idx === 1);
		current = idx;
	}

	function startAutoSlide() {
		clearInterval(intervalId);
		intervalId = setInterval(() => {
			if (autoSlide) showSlide(current === 0 ? 1 : 0);
		}, 5000);
	}

	// --- EVENT: About button click ---
	toAboutBtn.addEventListener('click', () => {
		showSlide(0);
		autoSlide = false;
	});
	// --- EVENT: Skills button click ---
	toSkillsBtn.addEventListener('click', () => {
		showSlide(1);
		autoSlide = false;
	});

	// --- EVENTS: Pause/resume auto-slide on skills container hover ---
	if (skillsContainer) {
		skillsContainer.addEventListener('mouseenter', () => (autoSlide = false));
		skillsContainer.addEventListener('mouseleave', () => (autoSlide = true));
	}

	// Initialize first slide and start auto-slide
	showSlide(0);
	startAutoSlide();

	// === COMPUTER OVERLAY LOGIC ===
	const overlayImg = document.querySelector('.computer-overlay');
	const aboutSection = document.getElementById('about');
	const projectsSection = document.getElementById('projects');
	const contactSection = document.getElementById('contact');

	// Track intersection ratios for all sections
	const sectionRatios = {
		about: 0,
		projects: 0,
		contact: 0,
	};

	let overlayHasBeenShown = false;

	const overlaySectionObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (sectionRatios.hasOwnProperty(entry.target.id)) {
					sectionRatios[entry.target.id] = entry.intersectionRatio;
				}
			});

			const showOverlay =
				sectionRatios.about > 0 ||
				sectionRatios.projects > 0 ||
				sectionRatios.contact > 0;

			if (overlayImg) {
				if (showOverlay) {
					overlayImg.classList.add('computer-overlay-on');
				} else {
					overlayImg.classList.remove('computer-overlay-on');
				}
			}
		},
		{
			threshold: [0, 1.0],
		}
	);

	if (aboutSection) overlaySectionObserver.observe(aboutSection);
	if (projectsSection) overlaySectionObserver.observe(projectsSection);
	if (contactSection) overlaySectionObserver.observe(contactSection);
});
