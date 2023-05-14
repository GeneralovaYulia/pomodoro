import './App.css';
import React from 'react';
import { Layout } from './components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './components/MainPage';
import { StatPage } from './components/StatPage';
import { Provider } from 'react-redux';
import { store } from './store/store';

export function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Layout>
					<Routes>
						<Route path="/" element={<MainPage />} />
						<Route path="/stat" element={<StatPage />} />
					</Routes>
				</Layout>
			</BrowserRouter>
		</Provider>
	);
}
