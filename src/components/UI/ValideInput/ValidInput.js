import useInput from '../../../hooks/use-input';
import classes from '../Input/Input.module.css';

export default function ValidInput(props) {
	const { value, error, isValid, inputChangeHandler, inputBlurHandler } =
		useInput(props.validationLogic);

	const inputClasses = error
		? `${classes.input} ${classes['input-error']}`
		: classes.input;
	props?.isValid(isValid);

	return (
		<div className={inputClasses}>
			<div className={classes['form-control']}>
				<div>
					<label htmlFor={props.input.id}> {props.label}</label>
					<input
						{...props.input}
						value={value}
						onChange={inputChangeHandler}
						onBlur={inputBlurHandler}
					/>
				</div>
				{error && <p className={classes.err}>{props.inValidText}</p>}
			</div>
		</div>
	);
}
