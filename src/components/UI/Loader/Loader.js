import { useRef } from 'react';
import handlePointerDown from '../Ripple/Ripple';
import styles from '../Ripple/Ripple.module.css';
import './Loader.css';
export default function Loader(props) {
	const loaderRef = useRef();
	const classes = `webapp-spinner ${props.className}`;
	const mdcRippleClass = styles['mdc-ripple'];

	return (
		<div
			ref={loaderRef}
			onPointerDown={handlePointerDown.bind(null, loaderRef)}
			className={classes}
			aria-label='loading'
		>
			<div className='spinner-container spinner-style'>
				<div className='spinner-rotator spinner-style'>
					<div className='spinner-left half-spinner-style'>
						<div className='spinner-circle spinner--left'></div>
					</div>
					<div className='spinner-right half-spinner-style'>
						<div className='spinner-circle spinner--right'></div>
					</div>
				</div>
			</div>
			<div className={mdcRippleClass}></div>
		</div>
	);
}
