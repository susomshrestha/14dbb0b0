import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/home.page.jsx';
import Header from './components/Header/Header.jsx';
import './css/app.css';
import Detail from './pages/Detail/detail.page.jsx';

const App = () => {
	return (
		<div className="container">
			<Header />
			<div className="container-view overflow-y-auto h-[calc(100%-60px)] relative">
				<Outlet></Outlet>
			</div>
		</div>
	);
};

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '',
				element: <Home />,
			},
			{
				path: 'detail',
				element: <Detail />,
			},
		],
	},
]);

ReactDOM.render(<RouterProvider router={router} />, document.getElementById('app'));

export default App;
