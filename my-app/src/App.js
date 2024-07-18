import Header from './components/header/header';
import SignUpPage from './components/SignUpPage/SignUp';
import './App.css';
import Login from './components/SignUpPage/Login';

function App() {
  return (
    <div className="App">
      < Header />
      <SignUpPage />
      <Login />
    </div>
  );
}

export default App;
