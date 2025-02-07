import { useContext } from 'react'
import CartContext from '../../store/cart-context'
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'
const MealsList = props => {
	const cartContext = useContext(CartContext)
	const price = `$${props.price.toFixed(2)}`
	const addCartHandler = amount => {
		cartContext.addItem({
			id: props.id,
			name: props.name,
			amount,
			price: props.price,
		})
	}
	return (
		<li className={classes.meal}>
			<div>
				<h3>{props.name}</h3>
				<div className={classes.description}>{props.description}</div>
				<div className={classes.price}>{price}</div>
			</div>
			<div>
				<MealItemForm onAddCart={addCartHandler} />
			</div>
		</li>
	)
}
export default MealsList
