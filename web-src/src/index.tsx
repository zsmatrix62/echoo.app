import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { HashRouter, Route, Routes } from 'react-router-dom';

ReactDOM.render(
	<HashRouter basename='/'>
		<Routes>
			<Route path="/" element={<App />}> </Route>
			<Route path="/privacy" element={<App />}> </Route>
		</Routes>
	</HashRouter>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
