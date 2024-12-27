import Button from '../UI/Button/Button';
import classes from './CartItem.module.css';

const CartItem = props => {
	const price = `$${props.price.toFixed(2)}`;

	return (
		<li className={classes['cart-item']}>
			<div>
				<h2>{props.name}</h2>
				<div className={classes.summary}>
					<span className={classes.price}>{price}</span>
					<span className={classes.amount}>x {props.amount}</span>
				</div>
			</div>
			<div className={classes.actions}>
				<Button
				aria-label="increase button"
					onPointerDown={props.onRemove}
					onKeyDown={e => {
						if (e.repeat) return;
						if (e.key !== `Enter` && e.key !== ' ') return;
						props.onRemove();
					}}
				>
					-
				</Button>
				<Button
				aria-label="decrease button"

					onPointerDown={props.onAdd}
					onKeyDown={e => {
						if (e.repeat) return;
						if (e.key !== `Enter` && e.key !== ' ') return;
						props.onAdd();
					}}
				>
					+
				</Button>
			</div>
		</li>
	);
};

export default CartItem;
