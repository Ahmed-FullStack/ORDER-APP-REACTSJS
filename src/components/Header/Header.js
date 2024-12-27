import classes from './Header.module.css';
import Button from './Button';
import images from '../../assests/meals.jpg';
import { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import modalStyles from '../UI/Modal/Modal.module.css';
import CheckOutForm from '../CheckOutForm/CheckOutForm';
const Header = props => {
	const [openModal, setOpenModal] = useState(false);
	const [openCheckOutForm, setOpenCheckOutForm] = useState(false);
	function modalKeyHandler(e) {
		console.log('modal');
		if (e.key !== 'Escape') return;
		closeModalHandler();
	}
	function checkoutKeyHandler(e) {
		if (e.key !== 'Escape') return;
		document.removeEventListener('keydown', modalKeyHandler, {
			once: true,
		});
		closeCheckOutModalHandler();
	}
	const openModalHandler = () => {
		document.body.classList.add('overlay-opened');
		setOpenModal(true);
		document.addEventListener('keydown', modalKeyHandler);
	};
	const openCheckoutForm = () => {
		document.body.classList.add('overlay-opened');
		setOpenCheckOutForm(true);
		document.addEventListener('keydown', checkoutKeyHandler);
	};
	useEffect(() => {
		document.removeEventListener('keydown', checkoutKeyHandler);
		document.removeEventListener('keydown', modalKeyHandler);
	}, [openModal, openCheckOutForm]);
	const animationEndHandler = e => {
		document.body.classList.remove('overlay-opened');
		setOpenModal(false);
	};
	const checkOutAnimationEndHandler = e => {
		document.body.classList.remove('overlay-opened');
		setOpenCheckOutForm(false);
		openModalHandler();
	};

	const closeModalHandler = () => {
		const modal = document.querySelector(`.${modalStyles.modal}`);
		const backdrop = document.querySelector(`.${modalStyles.backdrop}`);
		if (!modal && !backdrop) return;
		modal.classList.add(`${modalStyles['animate-out']}`);
		backdrop.classList.add(`${modalStyles['backdrop-animate-out']}`);
		modal.addEventListener('animationend', animationEndHandler, {
			once: true,
		});
	};

	const closeCheckOutModalHandler = () => {
		const modal = document.querySelector(`.${modalStyles.modal}`);
		const backdrop = document.querySelector(`.${modalStyles.backdrop}`);
		if (!modal && !backdrop) return;
		modal.classList.add(`${modalStyles['animate-out']}`);
		backdrop.classList.add(`${modalStyles['backdrop-animate-out']}`);
		modal.addEventListener('animationend', checkOutAnimationEndHandler, {
			once: true,
		});
	};
	return (
		<>
			<header className={classes['header']}>
				<h1>React Meals</h1>
				<Button onClick={openModalHandler} />
			</header>
			<div className={classes['main-image']}>
				<img src={images} alt='Food Delicious' />
			</div>
			{openModal && (
				<Cart
					onCloseModal={closeModalHandler}
					openCheckOutForm={openCheckoutForm}
				/>
			)}
			{openCheckOutForm && (
				<CheckOutForm onCloseModal={closeCheckOutModalHandler} />
			)}
		</>
	);
};
export default Header;
