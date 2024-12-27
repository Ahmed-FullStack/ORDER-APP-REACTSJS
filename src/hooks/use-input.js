import { useState } from 'react';

export default function useInput(validate) {
	const [inputValue, setInputValue] = useState('');
	const [isTouched, setIsTouched] = useState(false);
	const isValid = validate(inputValue);
	const hasError = !isValid && isTouched;

	function inputChangeHandler(e) {
		console.log(e);
		setInputValue(e.target.value);
	}
	function inputBlurHandler(e) {
		setIsTouched(true);
	}
	function reset() {
		setInputValue('');
		setIsTouched(false);
	}

	return {
		value: inputValue,
		isValid,
		error: hasError,
		inputBlurHandler,
		inputChangeHandler,
		reset,
	};
}
