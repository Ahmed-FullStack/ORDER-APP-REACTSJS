import { useRef } from 'react';
import RandomNumber, { ArrayOfNames2 } from '../Names/Names';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import classes from './MealItemItem.module.css';
const MealItemForm = props => {
	const formRef = useRef();
	const UNIQUE = `${
		RandomNumber[Math.floor(Math.random() * RandomNumber.length)]
	}${Math.floor(Math.random() * 505) + 5053}${
		ArrayOfNames2[Math.floor(Math.random() * ArrayOfNames2.length)]
	}${Math.floor(Math.random() * 505) + 5053}`;
	const configureInput = {
		id: UNIQUE,
		type: 'number',
		min: '1',
		max: '5',
		step: '1',
		defaultValue: '1',
	};
	const submitHandler = e => {
		e.preventDefault();
		const enteredAmount = formRef.current.value;
		const enteredAmountNumber = +formRef.current.value;
		if (
			enteredAmount.trim().length === 0 ||
			enteredAmountNumber > 5 ||
			enteredAmountNumber < 1
		)
			return;
		props.onAddCart(enteredAmountNumber);
	};
	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<Input ref={formRef} label='Amount' input={configureInput} />
			<Button type='submit'>+ Add</Button>
		</form>
	);
};
export default MealItemForm;
