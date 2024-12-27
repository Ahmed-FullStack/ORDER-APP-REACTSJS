import classes from './Card.module.css'
const Card = props => {
	const customClasses = `${classes.card} ${props.className}`
	return (
		<div className={customClasses} onClick={props.onClick}>
			{props.children}
		</div>
	)
}

export default Card
