import { useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';
const BackDrop = props => {
	return <div className={classes.backdrop} onClick={props.onClose} />;
};
const ModalOverlay = props => {
	const modalOverlayRef = useRef();
	const activeEl = document.activeElement;
	useEffect(() => {
		const modal = modalOverlayRef.current;
		const focusableEls = modal.querySelectorAll(
			'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])'
		);
		let firstFocusableEl = focusableEls[0];

		firstFocusableEl.focus();
		function handleTab(e) {
			const isTabPressed = e.key === 'Tab';

			if (!isTabPressed) return;
			const shiftKey = e.shiftKey === true;
			const notShiftKey = e.shiftKey === false;

			const focusableEls = modal.querySelectorAll(
				'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])'
			);
			let firstFocusableEl = focusableEls[0];
			let lastFocusableEl = focusableEls[focusableEls.length - 1];

			if (shiftKey && document.activeElement === firstFocusableEl) {
				e.preventDefault();
				lastFocusableEl.focus();
			}
			if (notShiftKey && document.activeElement === lastFocusableEl) {
				e.preventDefault();
				firstFocusableEl.focus();
			}
		}
		document.addEventListener('keydown', handleTab);

		return () => {
			document.removeEventListener('keydown', handleTab);
		};
	}, [modalOverlayRef]);
	return (
		<div tabIndex={0} ref={modalOverlayRef} className={classes.modal}>
			<div className={classes.content}>{props.children}</div>
		</div>
	);
};
const portalElements = document.getElementById('overlays');
const Modal = props => {
	return (
		<>
			{ReactDOM.createPortal(
				<BackDrop onClose={props.onClose} />,
				portalElements
			)}
			{ReactDOM.createPortal(
				<ModalOverlay>{props.children}</ModalOverlay>,
				portalElements
			)}
		</>
	);
};
export default Modal;
