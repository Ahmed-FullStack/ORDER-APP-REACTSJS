import styles from './Ripple.module.css';

function handlePointerDown(rippleRef, e) {
	const mdcRippleClass = styles['mdc-ripple'];
	const { current: button } = rippleRef;
	if (e.buttons !== 1) return;
	if (e.target !== button) return;
	button.classList.add(`${styles['mdc-ripple-btn']}`);
	const { width, height, x, y } = button.getBoundingClientRect();
	const mdcRipple = button.querySelector(`.${mdcRippleClass}`);
	const mdcRippleWave = document.createElement(`div`);
	mdcRipple.appendChild(mdcRippleWave);
	const maxDimension = Math.max(width, height);
	const minDimension = Math.min(width, height);
	const xCoordinate = e.clientX - x - maxDimension / 2;
	const yCoordinate = e.clientY - y - maxDimension / 2;

	const xEndCoordinate = width / 2 - maxDimension / 2;
	const yEndCoordinate = height / 2 - maxDimension / 2;

	mdcRippleWave.classList.add(styles['mdc-ripple-wave']);

	const rippleStyles = window.getComputedStyle(mdcRippleWave);

	const hypotenus = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
	const rippleScaleStart = 5 / maxDimension;
	const rippleScale = hypotenus / maxDimension;
	mdcRippleWave.style.setProperty(
		`--ripple-dimension`,
		`${maxDimension.toFixed(2)}px`
	);
	mdcRippleWave.style.setProperty(`--x`, `${xCoordinate.toFixed(2)}px`);
	mdcRippleWave.style.setProperty(`--y`, `${yCoordinate.toFixed(2)}px`);
	mdcRippleWave.style.setProperty(`--x-end`, `${xEndCoordinate.toFixed(2)}px`);
	mdcRippleWave.style.setProperty(`--y-end`, `${yEndCoordinate.toFixed(2)}px`);
	mdcRippleWave.style.setProperty(
		`--ripple-scale`,
		`${rippleScale.toFixed(2)}`
	);
	mdcRippleWave.style.setProperty(
		`--ripple-scale-start`,
		`${rippleScaleStart.toFixed(2)}`
	);
	mdcRippleWave.classList.add(styles['mdc-ripple-animation']);
	const rippleWaveOpacityDuration = rippleStyles.getPropertyValue(
		`--ripple-opacity-duration`
	);
	const rippleWaveOpacityDelay = rippleStyles.getPropertyValue(
		`--ripple-opacity-delay`
	);
	const removeRippleWaveDelay =
		+rippleWaveOpacityDelay + +rippleWaveOpacityDuration;
	function removePointerHandler(e) {
		mdcRippleWave.classList.add(styles['mdc-ripple-opacity-animation']);
		button.removeEventListener('pointerup', removePointerHandler);
		button.removeEventListener('pointerleave', removePointerHandler);
		setTimeout(() => {
			mdcRippleWave.remove();
		}, removeRippleWaveDelay);
	}
	button.addEventListener('pointerup', removePointerHandler, { once: true });
	button.addEventListener('pointerleave', removePointerHandler, {
		once: true,
	});
}

function handleKeyDown(rippleRef, e) {
	const mdcRippleClass = styles['mdc-ripple'];
	const { current: button } = rippleRef;
	if (e.key !== `Enter` && e.key !== ` `) return;
	if (e.target !== button) return;
	if (e?.repeat) return;
	const { width, height } = button.getBoundingClientRect();
	const mdcRipple = button.querySelector(`.${mdcRippleClass}`);
	const mdcRippleWave = document.createElement(`div`);
	mdcRipple.appendChild(mdcRippleWave);
	const maxDimension = Math.max(width, height);

	const xEndCoordinate = width / 2 - maxDimension / 2;
	const yEndCoordinate = height / 2 - maxDimension / 2;

	mdcRippleWave.classList.add(styles['mdc-ripple-wave']);

	const buttonStyles = window.getComputedStyle(button);
	const rippleStyles = window.getComputedStyle(mdcRippleWave);

	const hypotenus = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
	const rippleScaleStart = 5 / maxDimension;
	const rippleScale = hypotenus / maxDimension;

	mdcRippleWave.style.setProperty(
		`--ripple-dimension`,
		`${maxDimension.toFixed(2)}px`
	);
	mdcRippleWave.style.setProperty(`--x`, `${xEndCoordinate.toFixed(2)}px`);
	mdcRippleWave.style.setProperty(`--y`, `${yEndCoordinate.toFixed(2)}px`);
	mdcRippleWave.style.setProperty(`--x-end`, `${xEndCoordinate.toFixed(2)}px`);
	mdcRippleWave.style.setProperty(`--y-end`, `${yEndCoordinate.toFixed(2)}px`);
	mdcRippleWave.style.setProperty(
		`--ripple-scale`,
		`${rippleScale.toFixed(2)}`
	);
	mdcRippleWave.style.setProperty(
		`--ripple-scale-start`,
		`${rippleScaleStart.toFixed(2)}`
	);
	mdcRippleWave.classList.add(styles['mdc-ripple-animation']);
	const rippleWaveOpacityDuration = rippleStyles.getPropertyValue(
		`--ripple-opacity-duration`
	);
	const rippleWaveOpacityDelay = rippleStyles.getPropertyValue(
		`--ripple-opacity-delay`
	);
	const removeRippleWaveDelay =
		+rippleWaveOpacityDelay + +rippleWaveOpacityDuration;
	function removePointerHandler(e) {
		if (e.key !== `Enter` && e.key !== ` `) return;
		mdcRippleWave.classList.add(styles['mdc-ripple-opacity-animation']);
		button.removeEventListener('keyup', removePointerHandler);
		setTimeout(() => {
			mdcRippleWave.remove();
		}, removeRippleWaveDelay);
	}
	button.addEventListener('keyup', removePointerHandler, { once: true });
}

export { handleKeyDown };

export default handlePointerDown;
