import { useRef } from 'react';
import handlePointerDown, { handleKeyDown } from '../Ripple/Ripple';
import styles from '../Ripple/Ripple.module.css';
import buttonStyles from './Button.module.css';

export default function Button(props) {
	const buttonRef = useRef();
	const mdcRippleClass = styles['mdc-ripple'];
	return (
		<button
		aria-label={props["aria-label"]}
			className={`${styles['mdc-ripple-btn']} ${buttonStyles.button} ${props.className}`}
			ref={buttonRef}
			onClick={props.onClick}
			onPointerDown={e => {
				handlePointerDown?.(buttonRef, e);
				props.onPointerDown?.(e);
			}}
			type={props.type ? props.type : 'button'}
			onKeyDown={e => {
				handleKeyDown(buttonRef, e);
				props.onKeyDown?.(e);
			}}
		>
			{props.children}
			<div className={mdcRippleClass}></div>
		</button>
	);
}
