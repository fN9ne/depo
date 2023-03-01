import './scss/App.scss';
import { Loader } from './components/Loader/Loader';

function App() {
	document.title = 'DePO - Обмен криптовалюты'
	return (
		<div className="app">
			<h1>Проект «<span>DePO</span>» находится в стадии разработки.</h1>
			<Loader />
		</div>
	);
}

export default App;