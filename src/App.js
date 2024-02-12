
import './App.css';
import ChessGui from './gui/ChessGui';
import { useDispatch } from 'react-redux';
import { getChessActionCreator } from './reducers/chessReducer';
import Header from './gui/Header';

function App() {
  const dispatch = useDispatch();

function clearLocalStorage() {
  localStorage.clear()
}
clearLocalStorage()
  
  function handleGame() {
    dispatch(getChessActionCreator());

}handleGame()
  return (
    <div>
      <Header />
      <ChessGui />
    </div>
  );
}

export default App;
