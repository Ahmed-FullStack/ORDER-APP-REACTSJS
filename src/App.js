import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Meals from './components/Meals/Meals';
import Button from './components/UI/Button/Button';
import CartProvider from './store/cart-provider';
function App() {
	return (
		<CartProvider>
			<Header />
			<Meals />
			<li className='color-white'>Light THingy</li>
			<Button>
				{' '}
				const buttonRef = useRef(); const buttonRef = useRef(); const buttonRef
				= useRef(); const buttonRef = useRef();
			</Button>
		</CartProvider>
	);
}

export default App;
