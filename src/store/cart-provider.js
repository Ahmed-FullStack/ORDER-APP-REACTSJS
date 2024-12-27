import { useReducer } from 'react';
import CartContext from './cart-context';

const ACTIONS = {
	ADD_ITEM: 'ADD_ITEM',
	DELETE_ITEM: 'DELETE_ITEM',
};

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.ADD_ITEM:
			const updatedTotalAmount =
				state.totalAmount + action.cartItem.price * action.cartItem.amount;

			let updatedCartItems;

			const exisitingCartIndex = state.items.findIndex(
				item => item.id === action.cartItem.id
			);
			const exisitingCartItem = state.items[exisitingCartIndex];

			if (exisitingCartItem) {
				const updatedCartItem = {
					...exisitingCartItem,
					amount: exisitingCartItem.amount + action.cartItem.amount,
				};
				updatedCartItems = [...state.items];
				updatedCartItems[exisitingCartIndex] = updatedCartItem;
			} else {
				updatedCartItems = state.items.concat(action.cartItem);
			}
			return { items: updatedCartItems, totalAmount: updatedTotalAmount };
		case ACTIONS.DELETE_ITEM:
			let updatedCart;
			const exisitingDeleteCartIndex = state.items.findIndex(
				item => item.id === action.cartItemId
			);
			const exisitingDeleteCartItem = state.items[exisitingDeleteCartIndex];
			const total = state.totalAmount - exisitingDeleteCartItem.price;
			if (exisitingDeleteCartItem.amount === 1) {
				updatedCart = state.items.filter(item => item.id !== action.cartItemId);
			} else {
				const updatedItem = {
					...exisitingDeleteCartItem,
					amount: exisitingDeleteCartItem.amount - 1,
				};
				updatedCart = [...state.items];
				updatedCart[exisitingDeleteCartIndex] = updatedItem;
			}

			return { items: updatedCart, totalAmount: total };
		default:
			return state;
	}
};

const CartProvider = props => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);
	const addItemToCarthandler = item => {
		dispatchCartAction({ type: ACTIONS.ADD_ITEM, cartItem: item });
	};
	const deleteItemFromCartHandler = id => {
		dispatchCartAction({ type: ACTIONS.DELETE_ITEM, cartItemId: id });
	};
	const cartContextManager = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCarthandler,
		deleteItem: deleteItemFromCartHandler,
	};
	return (
		<CartContext.Provider value={cartContextManager}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
