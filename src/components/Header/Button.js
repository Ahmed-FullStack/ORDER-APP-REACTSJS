import CartButton from '../UI/Button/Button';
import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './Button.module.css';
const Button = props => {
	const [isButtonHighlighted, setIsButtonHighlighted] = useState(false);
	const cartContext = useContext(CartContext);
	const { items } = cartContext;
	const numberOfItemsInCart = items.reduce((accumulator, currentNumber) => {
		return accumulator + currentNumber.amount;
	}, 0);
	useEffect(() => {
		if (items.length === 0) return;

		setIsButtonHighlighted(true);
		const btnTimeout = setTimeout(() => {
			// console.log(`timer`);
			setIsButtonHighlighted(false);
		}, 300);
		return () => {
			// console.log(`cleanup func `);
			clearTimeout(btnTimeout);
		};
	}, [items]);
	const customClasses = `${classes.button} ${
		isButtonHighlighted && classes.bump
	}`;
	return (
		<CartButton
			className={customClasses}
			type={props.type || 'button'}
			onClick={props.onClick}
		>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Cart</span>
			<span className={classes.badge}>{numberOfItemsInCart}</span>
		</CartButton>
	);
};

export default Button;
