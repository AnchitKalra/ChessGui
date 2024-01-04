
import './App.css';
import ChessGui from './gui/ChessGui';
import { useDispatch } from 'react-redux';
import { getChessActionCreator } from './reducers/chessReducer';

function App() {
  const dispatch = useDispatch();

  
  function handleGame() {
    dispatch(getChessActionCreator());

}handleGame()
  return (
    <div>
      <ChessGui />
    </div>
  );
}

export default App;
