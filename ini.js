document.addEventListener('DOMContentLoaded', function() {
	const tabs = document.querySelectorAll('.tab-btn');
	const panels = document.querySelectorAll('.eval-panel');

	function activate(targetId, button) {
		panels.forEach(p => {
			if (p.id === targetId) {
				p.classList.remove('hidden');
				p.setAttribute('aria-hidden', 'false');
			} else {
				p.classList.add('hidden');
				p.setAttribute('aria-hidden', 'true');
			}
		});
		tabs.forEach(b => {
			b.classList.toggle('active', b === button);
			b.setAttribute('aria-selected', b === button ? 'true' : 'false');
		});
	}

	tabs.forEach(btn => {
		btn.addEventListener('click', () => activate(btn.dataset.target, btn));
	});

	// accesibilidad: permitir cambiar con flechas izquierda/derecha
	let focused = 0;
	tabs.forEach((btn, idx) => {
		btn.setAttribute('tabindex', '0');
		btn.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowRight') { focused = (idx + 1) % tabs.length; tabs[focused].focus(); }
			if (e.key === 'ArrowLeft') { focused = (idx - 1 + tabs.length) % tabs.length; tabs[focused].focus(); }
			if (e.key === 'Enter' || e.key === ' ') { activate(btn.dataset.target, btn); }
		});
	});

});
