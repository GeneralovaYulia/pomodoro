import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './components/MainPage';
import { StatPage } from './components/StatPage';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { modalContext } from './components/Contexts/modalContext';
import { optionContext } from './components/Contexts/optionContext';
import { useColorTheme } from './hooks/useColorTheme';

export function App() {
	const [modalValue, setModalValue] = useState(false);
	const ModalProvider = modalContext.Provider;

	const [optionValue, setOptionValue] = useState('');
	const OptionProvider = optionContext.Provider;

	const { colorTheme, toggleColorTheme } = useColorTheme();

	const onChangeTheme = () => {
		toggleColorTheme();
	};

	return (
		<Provider store={store}>
			<ModalProvider
				value={{
					value: modalValue,
					onChange: setModalValue,
				}}
			>
				<OptionProvider
					value={{
						option: optionValue,
						optionChange: setOptionValue,
					}}
				>
					<BrowserRouter>
						<Layout>
							<Routes>
								<Route
									path="/"
									element={
										<MainPage onClick={onChangeTheme} />
									}
								/>
								<Route
									path="/stat"
									element={
										<StatPage onClick={onChangeTheme} />
									}
								/>
							</Routes>
						</Layout>
					</BrowserRouter>
				</OptionProvider>
			</ModalProvider>
		</Provider>
	);
}
