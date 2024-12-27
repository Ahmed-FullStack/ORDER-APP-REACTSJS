import Modal from '../UI/Modal/Modal';
import ValidInput from '../UI/ValideInput/ValidInput';
import './CheckOutForm.css';
import Button from '../UI/Button/Button';
export default function CheckOutForm(props) {
	const isNotEmpty = value => value !== '';
	const emailValidation = value => value.includes('@');
	let firstNameIsValid = false;
	let lastNameIsValid = false;
	let emailIsValid = false;
	let homeAddressIsValid = false;
	const firstNameConfig = {
		id: 'firstname',
		type: 'firstname',
		name: 'firstname',
	};
	const lastNameConfig = {
		id: 'lastname',
		type: 'lastname',
		name: 'lastname',
	};
	const emailConfig = {
		id: 'email',
		type: 'email',
		name: 'email',
	};
	const homeAddressConfig = {
		id: 'address',
		type: 'address',
		name: 'addresss',
	};
	function checkFirstName(value) {
		firstNameIsValid = value;
	}
	function checkLastName(value) {
		lastNameIsValid = value;
	}
	function checkEmail(value) {
		emailIsValid = value;
	}
	function checkHomeAddress(value) {
		homeAddressIsValid = value;
	}
	function formSubmitHandler(e) {
		e.preventDefault();
		if (
			firstNameIsValid &&
			lastNameIsValid &&
			emailIsValid &&
			homeAddressIsValid
		) {
			console.log('confirm');
		}
	}
	return (
		<Modal onClose={props.onCloseModal}>
			<form onSubmit={formSubmitHandler} className='form-wrapper'>
				<div className='form'>
					<ValidInput
						label='First Name'
						validationLogic={isNotEmpty}
						input={firstNameConfig}
						isValid={checkFirstName}
						inValidText={`Name Can't Be Empty Field`}
					/>
					<ValidInput
						label='Last Name'
						validationLogic={isNotEmpty}
						input={lastNameConfig}
						isValid={checkLastName}
						inValidText={`Name Can't Be Empty Field`}
					/>
					<ValidInput
						label='Email Address'
						validationLogic={emailValidation}
						input={emailConfig}
						isValid={checkEmail}
						inValidText={`Enter Valid Email`}
					/>
					<ValidInput
						label='Home Address'
						validationLogic={isNotEmpty}
						input={homeAddressConfig}
						isValid={checkHomeAddress}
						inValidText={`Enter A Home Address`}
					/>
				</div>
				<div>
					<Button onClick={props.onCloseModal} type='button'>
						Cancel
					</Button>
					<Button type='submit'>Confirm</Button>
				</div>
			</form>
		</Modal>
	);
}
