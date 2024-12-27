import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import modalStyles from '../UI/Modal/Modal.module.css';
import Button from '../UI/Button/Button';

const Cart = props => {
	const cartCtx = useContext(CartContext);
	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;
	const removeItemHandler = id => {
		cartCtx.deleteItem(id);
	};
	const addItemHandler = item => {
		cartCtx.addItem({ ...item, amount: 1 });
	};

	const cartItems = (
		<ul className={classes['cart-items']}>
			{cartCtx.items.map(item => {
				return (
					<CartItem
						key={item.id}
						id={item.id}
						price={item.price}
						name={item.name}
						amount={item.amount}
						onRemove={removeItemHandler.bind(null, item.id)}
						onAdd={addItemHandler.bind(null, item)}
					/>
				);
			})}
		</ul>
	);

	return (
		<Modal onClose={props.onCloseModal} className={classes.modal}>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>

			<div className={classes.actions}>
				<Button onClick={props.onCloseModal} className={classes['button--alt']}>
					Cancel
				</Button>
				{hasItems && (
					<Button
						onClick={e => {
							props.onCloseModal();
							props.openCheckOutForm();
						}}
						className={classes['button']}
					>
						{' '}
						Order
					</Button>
				)}
			</div>
		</Modal>
	);
};

export default Cart;
