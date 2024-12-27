import Card from '../UI/Card/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem';
import useHttp from '../../hooks/user-http';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Loader from '../UI/Loader/Loader';
import Button from '../UI/Button/Button';

const AvailableMeals = props => {
	const { loading, error, sendRequest: fetchMeals } = useHttp();

	const meals = useMemo(() => [], []);
	function getMeals() {
		const fireBaseRequest =
			'https://food-order-app-database-8140c-default-rtdb.firebaseio.com/mealItems.json';
		fetchMeals({ url: fireBaseRequest }, mealsData => {
			for (const key in mealsData) {
				const transformedMeal = {
					id: mealsData[key].id,
					name: mealsData[key].name,
					description: mealsData[key].description,
					price: mealsData[key].price,
				};
				meals.push(transformedMeal);
			}
		});
	}
	useEffect(() => {
		getMeals();
	}, [fetchMeals, meals]);

	const mealsList = meals.map(meal => (
		<MealItem
			key={meal.id}
			id={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));

	return (
		<section className={classes.meals}>
			<Card
				className={`${(loading || error) && classes['meals-card']} ${
					classes['card']
				}`}
			>
				{error && !loading && (
					<>
						<p className={classes['err-text']}>
							An Error Occured While Fetching Data.
						</p>
						<Button
							onPointerDown={e => {
								e.target.addEventListener('pointerup', event => {
									if (event.button !== 0) return;
									getMeals();
								});
							}}
						>
							Retry
						</Button>
					</>
				)}
				{loading && <Loader className={classes['web-spinner']} />}
				{!loading && !error && <ul>{mealsList}</ul>}
			</Card>
		</section>
	);
};
export default AvailableMeals;
