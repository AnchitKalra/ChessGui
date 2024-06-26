import { useEffect, useState } from 'react';
import './style.css';
import {useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getStateActionCreator, retreiveStateActionCreator } from '../reducers/stateReducer';
import { Button, Snackbar, Alert, Typography } from '@mui/material';
import { arrayDecrementActionCreator, arrayIdActionCreator, castlingBlackActionCreator, castlingBlackLeftActionCreator, castlingBlackRightActionCreator, castlingWhiteActionCreator, castlingWhiteLeftActionCreator, castlingWhiteRightActionCreator, checkCountDecrementActionCreator, checkCountIncrementActionCreator, checkFalseActionCreator, detectCheckActionCreator } from '../reducers/checkReducer';
import { decrementActionCreator,  inrementActionCreator,  trueLoadingFlagActionCreator } from '../reducers/userReducer';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { forwardActionCreator, previousActionCreator } from '../reducers/previousReducer';
import useSound from 'use-sound';
import moveDone from './move.wav';
import gameDone from './gameOver.wav';
import { chessEngineApi, closeConnection } from '../apis/apis';
import { getChessEngineActionCreator } from '../reducers/chessEngineReducer';





function ChessGui() {

    const dispatch = useDispatch();
    let [check, setCheck] = useState(false);
    let [prevFlag, setPrevFlag] = useState(false);
    let [payloadData, setPayloadData] = useState(null);

    let [playerWon, setPlayerWon] = useState(0);
    let chessEngineData = useSelector(chessEngine=> chessEngine.chessEngine);
    try{
        if(chessEngineData?.chessEngineData === null) {
    chessEngineData = chessEngineData.chessEngineData;
        }
    console.log('logging chess engine data');
    console.log(chessEngineData);
    }catch(err) {

    }
    let [prevChessEngineData, setEngineData] = useState(0.0)
    if(chessEngineData !== null || chessEngineData !== '') {
        prevChessEngineData = chessEngineData;

    }




    
   
    let turn = useSelector(user => user.user);
    
    turn = turn.turn;
   
    let count = useSelector((user) => user.user);
    count =count.count;
    




 

    let i = 0;

    let chessImages = useSelector((chess) => chess.chess)


    let board = [[0, 1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30, 31],
    [32, 33, 34, 35, 36, 37, 38, 39],
    [40, 41, 42, 43, 44, 45, 46, 47],
    [48, 49, 50, 51, 52, 53, 54, 55],
    [56, 57, 58, 59, 60, 61, 62, 63]];





   let initGame =  [-5,  -2, -3,  -10,  -6,  -3, -2, -5,-1,  -1,  -1, -1, -1,  -1, -1, -1, 0 , 0 , 0 , 0 , 0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 5 , 2 , 3 , 10 , 6 , 3 , 2 , 5];

    let [checkMate, setCheckmate] = useState(false);
    var [ws, setWs] = useState(undefined);

    let game = useSelector(chessState => chessState.chessState);
    let [move] = useSound(moveDone);
    let [gameOver] = useSound(gameDone);


    let moveMade = () => {
        
            move();
        
        
    }

    try{
    setInterval(() => {
       closeConnection();
    }, 120000)
}catch(err) {
    console.log(err);

}


   
  

    let gameWin = () =>{
        gameOver();
    }
    
    
    let prev = useSelector((prev) => prev.prev);
    if(prev[64] >= 0) {
        prev = "";
        prev = [-1];
    }
    if(Array.isArray(prev)) {
        if(prev.length > 60) {
        game = prev;
        
        }
    }




   let checkData = useSelector(check => check.check)
   let  arrayId = checkData.arrayId;
   // let checkFlag = checkData?.checkFlag;
   let  checkCount = checkData?.checkCount;
   let checkFlag = checkData.checkFlag || false;
   const [open, setOpen] = useState(false);
   let [forwardFlag, setForwardFlag] = useState(false);


function addStorage() {
    let player1 = localStorage.getItem('player1');
    let player2 = localStorage.getItem('player2');
    


    try{
    
           
        if(game[63].player2!== 'player2' && (player1 === null || player1 === 'null') && player2 === null) {
            localStorage.setItem('player1', 'player1');
    
         
        
        }
        else if(localStorage.getItem('player1') === 'player1') {
            localStorage.setItem('player1', game[63].player1)
        }
        else{
            let player1 = localStorage.getItem('player1');
         if( player1 === null) {

           
            localStorage.setItem('player2', game[63].player2);
            if(localStorage.getItem('player2') !== null) {
                if(localStorage.getItem('player2') !== game[63].player2) {
                    localStorage.setItem('player2', game[63].player2);
    
                } }
        
    }
    }}catch(err) {

}}





  



   
   
   
      
    

   





    
      
        addPieces();
      

    



 function addPieces() {
        try{
            
            

           

for(let j = 0; j < 64; j++) {  

    let boardValue = game[j].boardValue;


    
          let piece = game[boardValue]?.pieceValue;
       

                if(piece !== 0) {
                    
                    let btn = document.getElementById(boardValue);
                   
                    switch(piece) {
                        case -5:
                            btn.innerHTML = `<img id = i:${boardValue} src = ${chessImages[10]?.image} alt = "pic of chess pieces" height = ${50} width= ${50} ></img>`
                            
                            break;

                        case -2:
                            btn.innerHTML = `<img id = i:${boardValue} src = ${chessImages[5]?.image} alt = "pic of chess pieces" height = ${50} width= ${50} ></img>`
                            break;
                        case -3:
                            btn.innerHTML = `<img id = i:${boardValue} src = ${chessImages[0]?.image} alt = "pic of chess pieces" height = ${50} width= ${50} ></img>`
                            break;
                        case -10:
                            btn.innerHTML = `<img id = i:${boardValue} src = ${chessImages[8]?.image} alt = "pic of chess pieces" height = ${50} width= ${50} ></img>`
                            break;
                        case -6:
                            btn.innerHTML = `<img id = i:${boardValue} src = ${chessImages[3]?.image} alt = "pic of chess pieces" height = ${50} width= ${50} ></img>`
                            break;
                        case -1:
                            btn.innerHTML = `<img id = i:${boardValue} src = ${chessImages[2]?.image} alt = "pic of chess pieces" height = ${50} width= ${50} ></img>`
                            break;

                        case 5:
                            btn.innerHTML = `<img id = i:${boardValue} src = ${chessImages[11]?.image} alt = "pic of chess pieces" height = ${50} width= ${50} ></img>`
                            break;
                        case 2:
                            btn.innerHTML = `<img id = i:${boardValue} src = ${chessImages[6]?.image} alt = "pic of chess pieces" height = ${50} width= ${50} ></img>`
                            break;
                        case 3:
                            btn.innerHTML = `<img id = i:${boardValue} src = ${chessImages[1]?.image} alt = "pic of chess pieces" height = ${50} width= ${50} ></img>`
                            break;
                        case 10:
                            btn.innerHTML = `<img id = i:${boardValue} src = ${chessImages[9]?.image} alt = "pic of chess pieces" height = ${50} width= ${50} ></img>`
                            break;
                        case 1:
                            btn.innerHTML = `<img id = i:${boardValue} src = ${chessImages[7]?.image} alt = "pic of chess pieces" height = ${50} width= ${50} ></img>`
                            break;
                        case 6:
                            btn.innerHTML = `<img id = i:${boardValue} src = ${chessImages[4]?.image} alt = "pic of chess pieces" height = ${50} width= ${50} ></img>`
                            break;







                        default:
                            break;
                    }
                }
                else {
                    let btn = document.getElementById(boardValue);
                    btn.innerHTML = "";
                }}
              

                
    



  
    
        }catch(err) {
            console.log(err);
        }
        if(checkCount > 0 && checkMate === false) {
            check = true;
          
        }
        else{
           check = false;
         
        }
     
      
        return;    
}

    function addStyles() {
        try{
            if(checkFlag === true) {
                 dispatch(checkFalseActionCreator());
            }
        for(let j = 0; j < 64; j++) {
            let btn = document.getElementById(j);
            if(j % 8 === 0) {
                if(j !== 0) {
                let btn2 = document.getElementById(j - 8);
                let className = btn2.classList[0];
                if(className === 'colorWhite') {
                    btn.classList.add('colorBlack');
                }
                else{
                    btn.classList.add('colorWhite');
                }
                btn.classList.add('buttonStyle');
                btn.classList.remove('colorGreen');
                btn.classList.remove('colorRed')
                btn.classList.remove('colorBlue');
                btn.classList.remove('colorCheck')
                btn.classList.remove('colorSelect');


                continue;
            }
            }
          
            if(j - 1 >= 0) {
                let btn2 = document.getElementById(j - 1);
                let className = btn2.classList[0];
                if(className === 'colorWhite') {
                    btn.classList.add('colorBlack');
                }
                else{
                    btn.classList.add('colorWhite');
                }
            }
            else{
                btn.classList.add('colorWhite');
            }
            btn.classList.add('buttonStyle');
            btn.classList.remove('colorGreen');
            btn.classList.remove('colorRed')
            btn.classList.remove('colorBlue');
            btn.classList.remove('colorCheck');
            btn.classList.remove('colorSelect');
            
        }
        }catch(err){
            console.log(err)
        }
        return;
      
    }
  
  

    useEffect(() => {
        try{
            if(chessEngineData !== null || chessEngineData !== '') {
                prevChessEngineData = chessEngineData;
                setEngineData(prevChessEngineData);
            }
        }
        catch(err) {

        }
        try{
        if(chessImages?.length > 2) {
       addStyles();

        }
        

            addStorage()
            addPieces();
        
        
        detectCheckmate();
        if(checkFlag === true) {
            if(checkmate(turn) === 1) {
                setPlayerWon(1);
           
                setCheck(false);
                setCheckmate(true);
                gameWin();
            }    
            if(checkmate(turn) === 2) {
               setPlayerWon(2);
           
                setCheck(false);
                setCheckmate(true);
                gameWin();
            }
        }}catch(err) {
            console.log(err)
        }  
        if( checkMate === true) {
            
            ws.send(true);
        }
       
        
        try{
            if(game[63].player2 === 'player2') {
                loadingFunc();
            }
         
            if(game[63].player2 === null && game.length === 64) {
                setOpen(true);
                chessEngineApi("uci");
            }
           
            dispatch(getChessEngineActionCreator("go"));
            
           
        }catch(err) {
            console.log(err);
        }
       
      
       
      
        
       
        
    },[chessImages.length, game[0]])
  

  




   function makeAMove(id) {
 
     
        let pieceValue = 0;
        let pieceValue2 = 0;
        let boardValue2 = 0;
    
    

        let y = 0;

        if(arrayId.length === 3) {
            pieceValue2 = game[arrayId[arrayId.length - 1]].pieceValue;
            game[arrayId[arrayId.length - 1]].pieceValue = 0;
            boardValue2 = arrayId[arrayId.length - 1];
        }
        
        for(let j = 0; j < 64; j++) {
            let boardValue = game[j].boardValue
        

           
                if(boardValue === arrayId[1]) {
                    pieceValue = game[boardValue].pieceValue;
                

                    game[boardValue].pieceValue = 0;
                }
                if(boardValue === id) {
                  y = boardValue;
                }
          
        }
            if(pieceValue === 6) {
               dispatch(castlingWhiteActionCreator());
            }
            if(pieceValue === -6) {
                dispatch(castlingBlackActionCreator());
            }
            if(pieceValue === 5 && arrayId[1] === 56)  {
                dispatch(castlingWhiteLeftActionCreator());
            }
            if( pieceValue === 5 && arrayId[1] === 63) {
                dispatch(castlingWhiteRightActionCreator());
            }
            if(pieceValue === -5 && arrayId[1] === 56) {
                dispatch(castlingBlackLeftActionCreator());
            }
            if(pieceValue === -5 && arrayId[1] === 63) {
                dispatch(castlingBlackRightActionCreator());

            }
            if(pieceValue === 1) {
                if(id >= 0 && id <= 7) {
                    pieceValue = 10;       
                }
            }
            if(pieceValue === -1) {
                if(id >= 0 && id <= 7) {
                    pieceValue = -10;
                }
            }


       game[y].pieceValue = pieceValue;


       if(pieceValue2 !== 0) {
        if(boardValue2 < y) {
        game[y + 1].pieceValue = pieceValue2;
        }
        else{
            game[y - 1].pieceValue = pieceValue2;
        }
       }

      

       

      
      
       let payload = [];
       
            
            for(let j = 0; j < 64; j++) {
                payload.push(game[j].boardValue)
                payload.push(game[j].pieceValue);
            }
            if(turn === 1) {
            payload.push(1);
            }
            else{
                payload.push(2);
            }
      
        payload.push(game[0].gameId);
       try{
        moveMade();
       }catch(err) {
        console.log(err);
       }

        dispatch(getStateActionCreator(payload));
        addStyles();
        addPieces(); 
        let btn1 = document.getElementById(arrayId[1]);
        let btn2 = document.getElementById(id);
        btn1.classList.add('colorMove');
        btn2.classList.add('colorMove');
        check = false;
        dispatch(checkCountDecrementActionCreator());
       
        let message = "";
        message += arrayId[1] + ',';
        message +=  id;
        
      

      if(turn === 1) {
     
            dispatch(inrementActionCreator());
            if(checkFlag === true) {
                 dispatch(checkFalseActionCreator())
            }
            setTimeout(()=> {
            ws.send(message);
                btn1.classList.remove('colorMove');
                btn2.classList.remove('colorMove');
            },200);
      }
            
        else if(turn === 2){
          
     
           
            dispatch(decrementActionCreator());
          
            setTimeout(() => {
            ws.send(message)
            btn1.classList.remove('colorMove');
            btn2.classList.remove('colorMove');
            },200);
           
        }

/*

         let board = [[0, 1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30, 31],
    [32, 33, 34, 35, 36, 37, 38, 39],
    [40, 41, 42, 43, 44, 45, 46, 47],
    [48, 49, 50, 51, 52, 53, 54, 55],
    [56, 57, 58, 59, 60, 61, 62, 63]];




        +---+---+---+---+---+---+---+---+
        | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
        +---+---+---+---+---+---+---+---+
        | 8 | 9 | 10 | 11 | 12 | 13 | 14  15| p | 7
        +---+---+---+---+---+---+---+---+
        |  16 | 17  | 18  | 19  | 20  |   |   |   | 6
        +---+---+---+---+---+---+---+---+
        |   |   |   |   |   |   |   |   | 5
        +---+---+---+---+---+---+---+---+
        |   |   |   |   |   |   |   |   | 4
        +---+---+---+---+---+---+---+---+
        |   |   |   |   |   |   |   |   | 3
        +---+---+---+---+---+---+---+---+
        | P | P | P | P | P | P | P | P | 2
        +---+---+---+---+---+---+---+---+
        | R | N | B | Q | K | B | N | R | 1
        +---+---+---+---+---+---+---+---+
          a   b   c   d   e   f   g   h


         +---+---+---+---+---+---+---+---+
        | r | n | b | q | k | b | n | r | 8
        +---+---+---+---+---+---+---+---+
        | p | p | p | p | p | p | p | p | 7
        +---+---+---+---+---+---+---+---+
        |   |   |   |   |   |   |   |   | 6
        +---+---+---+---+---+---+---+---+
        |   |   |   |   |   |   |   |   | 5
        +---+---+---+---+---+---+---+---+
        |   |   |   |   |   |   |   |   | 4
        +---+---+---+---+---+---+---+---+
        |   |   |   |   |   |   |   |   | 3
        +---+---+---+---+---+---+---+---+
        | P | P | P | P | P | P | P | P | 2
        +---+---+---+---+---+---+---+---+
        | R | N | B | Q | K | B | N | R | 1
        +---+---+---+---+---+---+---+---+
          a   b   c   d   e   f   g   h


          */


          if(turn === 1) {
          let k = 0;
          for(let j = 63; j >= 0; j--) {
               if(k === arrayId[1]) {
                   arrayId[1] = j;
                   break;
               } 
               k++;
          }
          k = 0;
          for(let j = 63; j >= 0; j--) {
           if(k === id) {
               id = j;
               break;
           } 
           k++;
      }}

   
           let data = 'position startpos moves ';
           let alpha = arrayId[1] % 8;
           let alpha2 = arrayId[1];
           let indices = [8, 16, 24, 32, 40, 48, 56, 64];
           for(let j = 0; j < indices.length; j++) {
            if(alpha2 < indices[j]) {
                alpha2 = j + 1;
                break;
            }
           }
           let beta = id;
        for(let j = 0; j < indices.length; j++) {
            if(beta < indices[j]) {
                beta = j + 1;
                break;
            }
        }
   
           switch(alpha) {
               case 0:
                   alpha = 'h';
                   break;
               case 1:
                   alpha = 'g';
                   break;
                   case 2:
                       alpha = 'f';
                       break;
                   case 3:
                       alpha = 'e';
                       break;
               case 4:
                   alpha = 'd';
                   break;
               case 5:
                   alpha = 'c';
                   break;
               case 6:
                   alpha = 'b';
                   break;
               case 7:
                   alpha = 'a';
                   break;
                   default:
                       break;
           }
           if(turn === 1) {
        
           let data1 = alpha + alpha2;
           alpha = id;
           alpha = alpha % 8;
           switch(alpha) {
            case 0:
                alpha = 'h';
                break;
            case 1:
                alpha = 'g';
                break;
                case 2:
                    alpha = 'f';
                    break;
                case 3:
                    alpha = 'e';
                    break;
            case 4:
                alpha = 'd';
                break;
            case 5:
                alpha = 'c';
                break;
            case 6:
                alpha = 'b';
                break;
            case 7:
                alpha = 'a';
                break;
                default:
                    break;
        }
        data1 += alpha + beta;


           if(payloadData === null) {
            data += data1;
            console.log('logging befor eval');
            console.log(data);
        
            getChessEngineActionCreator(data);
            dispatch(getChessEngineActionCreator(data));
           
           
            ws.send('null' + data1);
           
           setPayloadData(data1);
        
           }
           else{
            payloadData += ' ' + data1;
            data += payloadData;
         
            console.log('logging befor eval');
            console.log(data);
            dispatch(getChessEngineActionCreator(data));
            ws.send('null' + data1);
            setPayloadData(payloadData);
          
           }
          
           }else{

     
               
           let data1 = alpha + alpha2;
           alpha = id;
           alpha = alpha % 8;
           switch(alpha) {
            case 0:
                alpha = 'h';
                break;
            case 1:
                alpha = 'g';
                break;
                case 2:
                    alpha = 'f';
                    break;
                case 3:
                    alpha = 'e';
                    break;
            case 4:
                alpha = 'd';
                break;
            case 5:
                alpha = 'c';
                break;
            case 6:
                alpha = 'b';
                break;
            case 7:
                alpha = 'a';
                break;
                default:
                    break;
        }
        data1 += alpha + beta;
           payloadData +=  ' ' + data1;
           data += payloadData;
           console.log('logging befor eval');
           console.log(data);
            dispatch(getChessEngineActionCreator(data));
           ws.send('null' + data1);
           setPayloadData(payloadData); 
           
       
           }
        


}
          
    
      // dispatch(checkCountDecrementActionCreator());
      // dispatch(checkFalseActionCreator());
   


    function detectCheckmate() {

       
        
   
      

        if(turn === 2) {
            try{
                
                checkCount = 0;
                for(let indexIdX = 0; indexIdX < 8; indexIdX++) {
                    for(let indexIdY = 0; indexIdY < 8; indexIdY++) {
                        let id = board[indexIdX][indexIdY];
                        let piece = game[id]?.pieceValue;
                    if(piece === -6) {
                       
                        let leftIndexY = indexIdY - 1;
                        let rightIndexY = indexIdY + 1;
    //check detection from left side
                        try{
                           
                            if(leftIndexY >= 0) {
                                
                                let indexId = id - 1;
                                let piece1 = game[indexId]?.pieceValue;
                                
                                if(piece1 === 5 || piece1 === 10) {
                                    let btn2 = document.getElementById(indexId);
                                    btn2.classList.add('colorCheck');
                                   
                                 
                                    dispatch(detectCheckActionCreator());
                                }
                                while(piece1 === 0 && leftIndexY > 0) {
                                    indexId--;
                                    leftIndexY--;
                                    piece1 = game[indexId]?.pieceValue;
                                   
    
                                }
                                if(piece1 > 0) {
                                    let btn1 = document.getElementById(indexId)
                                    switch(piece1) {
                                        case 5:
                                            for(indexId; indexId < id; indexId++) {
                                                let btn2 = document.getElementById(indexId);
                                                btn2.classList.add('colorCheck');
                                            }
                                           
                                        btn1.classList.add('colorCheck');
                                        checkCount++;
                                       
                                    
                                        dispatch(detectCheckActionCreator());
                                    
                                        //setCheck(true);
                                                             //   setCheck(true);
                        
    
                                        break;
    
                                        case 10:
                                            for(indexId; indexId < id; indexId++) {
                                                let btn2 = document.getElementById(indexId);
                                                btn2.classList.add('colorCheck');
                                            }
                                            piece = game[id]?.pieceValue
                                            
                                            btn1.classList.add('colorCheck');
                                            checkCount++
                                           
    
                                     dispatch(detectCheckActionCreator());
                                   
                                            break;
    
                                        default:
                                            break;
                                    }
                                }
                               
                            }
                        }catch(err) {
                            console.log(err);
                        }
    //check detection from right side for black king
                        try{
                           
                            if(rightIndexY <= 7) {
                                
                                let indexId = id + 1;
                                let piece1 = game[indexId]?.pieceValue;
                              //only rook or queen
                                if(piece1 === 5 || piece1 === 10) {
                                    let btn2 = document.getElementById(indexId);
                                    btn2.classList.add('colorCheck');
                                 
                                    dispatch(detectCheckActionCreator());
                                }
                                while(piece1 === 0 && rightIndexY < 7) {
                                    indexId++;
                                    rightIndexY++;
                                    piece1 = game[indexId].pieceValue;
                                   
    
                                }
                                if(piece1 > 0) {
                                    let btn1 = document.getElementById(indexId)
                                  
                                    switch(piece1) {
                                        case 5:
                                            for(indexId; indexId > id; indexId--) {
                                                let btn2 = document.getElementById(indexId);
                                                btn2.classList.add('colorCheck');
                                            }
                                          
                                        
                                        btn1.classList.add('colorCheck');
                                        checkCount++;
                                    
                                        dispatch(detectCheckActionCreator());
                               
                        
    
                                        break;
    
                                        case 10:
                                            for(indexId; indexId > id; indexId--) {
                                                let btn2 = document.getElementById(indexId);
                                                btn2.classList.add('colorCheck');
                                            }
                                        
                                            btn1.classList.add('colorCheck')
                                            dispatch(detectCheckActionCreator());
                                            checkCount++;
                                           
                                      
                        
    
                                            break;
    
                                        default:
                                            break;
                                    }
                                }
                            }
                            
                           
                        }
                        catch(err) {
                            console.log(err);
                        }
    
    
                        
                        
                        //from up chck detection only rook oe queen
                       
                        try{
                           
                            let upIndexX = indexIdX - 1;
                            if(upIndexX >= 0) {
                                let id = board[indexIdX][indexIdY];
                                let indexId = id - 8;
                               
                                let piece1 = game[indexId].pieceValue;
                                if(piece1 === 5 || piece1 === 10) {
                                    let btn2 = document.getElementById(indexId);
                                    btn2.classList.add('colorCheck');
                                  
                                    dispatch(detectCheckActionCreator());
                                }
                                while(piece1 === 0 && upIndexX > 0) {
                                    indexId -= 8
                                    upIndexX--;
                                    piece1 = game[indexId]?.pieceValue;
                                }
                                if(piece1 > 0) {
                                   
                                    let btn1 = document.getElementById(indexId);
                                    switch(piece1) {
                                        case 5:
                                            for(indexId; indexId < id; indexId += 8) {
                                                let btn2 = document.getElementById(indexId);
                                                btn2.classList.add('colorCheck');
                                            }
    
                                            btn1.classList.add('colorCheck');
                                            checkCount++;
                                   
        
                                            dispatch(detectCheckActionCreator());
                                
                        
    
                                            break;
    
                                            case 10:
                                                for(indexId; indexId < id; indexId += 8) {
                                                    let btn2 = document.getElementById(indexId);
                                                    btn2.classList.add('colorCheck');
                                                }
                                                btn1.classList.add('colorCheck');
                                                checkCount++;
                                               
                                            
    
                                                dispatch(detectCheckActionCreator());
                                       
                        
    
                                                break;
                                            default:break;
                                    }
                                }
                               
                            }
                            
    
                        }
                        catch(err) {
                            console.log(err);
                        }

                        //check detection from down side -- rook or Queen
                        try{
                           
                        let downIndexX = indexIdX + 1;
                        if(downIndexX <= 7) {
                            let id = board[indexIdX][indexIdY];
                            let indexId = id + 8;
                            let piece1 = game[indexId]?.pieceValue;
                           
                            if(piece1 > 0) {
                                let btn1 = document.getElementById(indexId);
                                switch(piece1) {
                                    case 5:
                                        btn1.classList.add('colorCheck');
                                     
                                        dispatch(detectCheckActionCreator());
                                        break;
    
                                    case 10:
                                        btn1.classList.add('colorCheck');
                          
                                        dispatch(detectCheckActionCreator());
                                        break;
                                    default:break;
                                }
                            }
                            while(piece1 === 0 && downIndexX < 7) {
                                indexId += 8;
                                downIndexX++;
                                piece1 = game[indexId]?.pieceValue;
    
                            }
                            if(piece1 > 0) {
                                let btn1 = document.getElementById(indexId);
                                switch(piece1) {
                                    case 5:
                                        for(indexId; indexId > id; indexId -= 8) {
                                            let btn2 = document.getElementById(indexId);
                                            btn2.classList.add('colorCheck');
                                        }
    
                                        btn1.classList.add('colorCheck');
                                        checkCount++;
                                       
                                    
                                        dispatch(detectCheckActionCreator());
                             
                        
    
                                        break;
    
                                        case 10:
                                            for(indexId; indexId > id; indexId -= 8) {
                                                let btn2 = document.getElementById(indexId);
                                                btn2.classList.add('colorCheck');
                                            }
        
                                            btn1.classList.add('colorCheck');
                                            checkCount++
                                           
    
                                     dispatch(detectCheckActionCreator());
                                 
    
                                            break;
                                        default:break;
                            }
                        }
                      
                        
                    }}catch(err) {
                            console.log(err);
                        }

                        //detecting check diagonally
                        //from left up(relative to black king)
                        try{
                           
                        let leftUpDiagIndexX = indexIdX - 1;
                        let leftUpDiagIndexY = indexIdY - 1;
                        if(leftUpDiagIndexX >= 0 && leftUpDiagIndexY >= 0) {
                            let id = board[indexIdX][indexIdY];
                        let indexId = id - 9;
                        let piece1 = game[indexId]?.pieceValue;
                      
                            if(piece1 > 0) {
                                let btn1 = document.getElementById(indexId);
                                switch(piece1) {
                                case 1:
                                    btn1.classList.add('colorCheck');
                                    checkCount++
                             dispatch(detectCheckActionCreator());
                                    break;
                                case 3:
                                    btn1.classList.add('colorCheck');
                 
                                  
                               dispatch(detectCheckActionCreator());
                                    break;
                                case 10:
                                    btn1.classList.add('colorCheck');
                              dispatch(detectCheckActionCreator());
                                    break;
                          
    
                                    
                                default:break;
                            }}
                            while(piece1 === 0 && leftUpDiagIndexX > 0 && leftUpDiagIndexY > 0) {
                                leftUpDiagIndexX--;
                                leftUpDiagIndexY--;
                                indexId -= 9;
                                piece1 = game[indexId]?.pieceValue;
                            }
    
                            if(piece1 > 0) {
                                let btn1 = document.getElementById(indexId);
                                switch(piece1) {
                                  
                                    case 3:
                                        for(indexId; indexId < id; indexId += 9) {
                                            let btn2 = document.getElementById(indexId);
                                            btn2.classList.add('colorCheck');
                                        }
                                        btn1.classList.add('colorCheck');
                                        checkCount++;
                                       
                              
                                        dispatch(detectCheckActionCreator());
                             
                        
    
                                        break;
                                    case 10:
                                        for(indexId; indexId < id; indexId += 9) {
                                            let btn2 = document.getElementById(indexId);
                                            btn2.classList.add('colorCheck');
                                        }
                                        btn1.classList.add('colorCheck');
                                        checkCount++;
                                       
                          
                                        dispatch(detectCheckActionCreator());
                          
                        
    
                                        break;
                                    default:
                                        break;
                                }
                            }
    
                            
                        }}catch(err) {
                            console.log(err);
                        }
                        try{
                           
                           
                        let rightUpDiagIndexX = indexIdX - 1;
                        let rightUpDiagIndexY = indexIdY + 1;
                        let id = board[indexIdX][indexIdY];
                        let indexId = id - 7;
                        if(rightUpDiagIndexX >= 0 && rightUpDiagIndexY <= 7) {
                            let piece1 = game[indexId]?.pieceValue;
                            if(piece1 > 0) {
                                let btn1 = document.getElementById(indexId);
                                switch(piece1) {
                                    case 1:
                                        btn1.classList.add('colorCheck');
                                        checkCount++;
                            
                                        dispatch(detectCheckActionCreator());
                                        break;
                                    case 3:
                                        btn1.classList.add('colorCheck');
                        
                                      
                         
                                        dispatch(detectCheckActionCreator());
                                        break;
                                    case 10:
                                        btn1.classList.add('colorCheck');
                        
                                        dispatch(detectCheckActionCreator());
                                        break;
                                    default:break;
                                }
                            }
                            while(piece1 === 0 && rightUpDiagIndexX > 0 && rightUpDiagIndexY < 7) {
                                rightUpDiagIndexX--;
                                rightUpDiagIndexY++;
                                indexId -= 7;
                                piece1 = game[indexId].pieceValue;
                            }
                            if(piece1 > 0) {
                                let btn1 = document.getElementById(indexId);
                                switch(piece1) {
                                    
                                    case 3:
                                        for(indexId; indexId < id; indexId += 7) {
                                            let btn2 = document.getElementById(indexId);
                                            btn2.classList.add('colorCheck');
                                        }
                                      
                                        btn1.classList.add('colorCheck');
                                        checkCount++;
                          
                                        dispatch(detectCheckActionCreator());
                                        break;
                                    case 10:
                                        for(indexId; indexId < id; indexId += 7) {
                                            let btn2 = document.getElementById(indexId);
                                            btn2.classList.add('colorCheck');
                                        }
                                      
                                        btn1.classList.add('colorCheck');
                                        checkCount++;
                                       
                                   
                                        dispatch(detectCheckActionCreator());
                                        break;
                                        default:break;
                                        
                                }
                            }
    
    
                            
                        }
                        }catch(err) {
                            console.log(err);
                        }
    //detecting check for black king from left--down--diagonal
                        try{
                           
                        let leftDownDiagIndexX = indexIdX + 1;
                        let leftDownDiagIndexY = indexIdY -1;
                        if(leftDownDiagIndexX <= 7 && leftDownDiagIndexY >= 0) {
                        let id = board[indexIdX][indexIdY];
                        let indexId = id + 7;
                      
                            let piece1 = game[indexId]?.pieceValue;
                            if(piece1 > 0) {
                                let btn1 = document.getElementById(indexId);
                                switch(piece1) {
                                 //   case 1:
                                    //    btn1.classList.add('colorCheck');
                                    //    checkCount++;
                                     
                                   //     dispatch(detectCheckActionCreator());
                                    //    break;
                                    case 3:
                                        btn1.classList.add('colorCheck');
                                            dispatch(detectCheckActionCreator());
                                        break;
                                    case 10:
                                        btn1.classList.add('colorCheck');
                                     dispatch(detectCheckActionCreator());
                                        break;
                                    default:break;
                                }}
    
                                while(piece1 === 0 && leftDownDiagIndexX < 7 && leftDownDiagIndexY > 0) {
                                    leftDownDiagIndexX++;
                                    leftDownDiagIndexY--;
                                    indexId += 7;
                                    piece1 = game[indexId]?.pieceValue;
                                }
                                if(piece1 > 0) {
                                    let btn1 = document.getElementById(indexId);
                                    switch(piece1) {

                                        case 3:
                                            for(indexId; indexId > id; indexId -= 7) {
                                                let btn2 = document.getElementById(indexId);
                                                btn2.classList.add('colorCheck');
                                            }
                                          
                                            btn1.classList.add('colorCheck');
                                            checkCount++;
                                           
                                         
        
                                            dispatch(detectCheckActionCreator());
                                            break;
                                        case 10:
                                            for(indexId; indexId > id; indexId -= 7) {
                                                let btn2 = document.getElementById(indexId);
                                                btn2.classList.add('colorCheck');
                                            }
                                            btn1.classList.add('colorCheck');
                                            checkCount++
                                           
                                       dispatch(detectCheckActionCreator());
                                            break;
                                            default:break;
                                            
                                    }
                                
                            }
                            
                        }}catch(err) {
                            console.log(err);
                        }
    
    //detecting check from right-down-diagonal---relative to black king
                        try{
                           
                        let rightDownDiagIndexX = indexIdX + 1;
                        let rightDownDiagIndexY = indexIdY + 1;
    
                        if(rightDownDiagIndexX <= 7 && rightDownDiagIndexY <= 7) {
                        let id = board[indexIdX][indexIdY];
    
                        let indexId = id + 9;
                      
                            let piece1 = game[indexId]?.pieceValue;
                            if(piece1 > 0) {
                                let btn1 = document.getElementById(indexId);
                                switch(piece1) {
                                 //   case 1:
                                  //  btn1.classList.add('colorCheck');
                                   // checkCount++
    
                             //  dispatch(detectCheckActionCreator());
                              //      break;
                                case 3:
                                    btn1.classList.add('colorCheck');
                          
                                   
                                    dispatch(detectCheckActionCreator());
                                    break;
                                case 10:
                                    btn1.classList.add('colorCheck');
                       
                                    dispatch(detectCheckActionCreator());
                                    break;
                                        default:break;
                                }}
    
                                while(piece1 === 0 && rightDownDiagIndexX < 7 && rightDownDiagIndexY < 7) {
                                    rightDownDiagIndexX++;
                                    rightDownDiagIndexY++;
                                    indexId += 9;
                                    piece1 = game[indexId]?.pieceValue;
                                }
                                if(piece1 > 0) {
                                    let btn1 = document.getElementById(indexId);
                                    switch(piece1) {
                                        case 3:
                                            for(indexId; indexId > id; indexId -= 9) {
                                                let btn2 = document.getElementById(indexId);
                                                btn2.classList.add('colorCheck');
                                            }
    
                                            btn1.classList.add('colorCheck');
                                            checkCount++;
                                           
                                     
        
                                            dispatch(detectCheckActionCreator());
                                            break;
    
                                            case 10:
                                                for(indexId; indexId > id; indexId -= 9) {
                                                    let btn2 = document.getElementById(indexId);
                                                    btn2.classList.add('colorCheck');
                                                }
        
                                                btn1.classList.add('colorCheck');
                                                checkCount++;
                                               
                                       
    
                                                dispatch(detectCheckActionCreator());
                                                break;
                                            default:break;
    
                                    }
                                }
                            
                        }
    
                        
    
                        }catch(err) {
                            console.log(err);
                        }
    
    
                        //Knight Check
                        try{
                        id = board[indexIdX][indexIdY];
    
                        let twoUpRight = id - 15;
                        let twoUpLeft = id - 17;
                        let twoLeftDown = id + 15;
                        let twoRightDown = id + 17;



                        //for two--up--right
                         let xIndex = indexIdX - 2;
                        let  yIndex = indexIdY + 1;
                         if(xIndex >= 0 && yIndex <= 7) {   
                        let pieceUpRight = game[twoUpRight]?.pieceValue;
                        let btn1 = document.getElementById(twoUpRight);
                        
                         if(pieceUpRight === 2) {
                            btn1.classList.add('colorCheck');
                            checkCount++;
                 
                            dispatch(detectCheckActionCreator());
                
                        
    
                        }
                    }
    
                    //for two---up---left
                    xIndex = indexIdX;
                    yIndex = indexIdY;
                    xIndex -= 2;
                    yIndex--;
                    if(xIndex >= 0 && yIndex >= 0) {
                        let pieceUpLeft = game[twoUpLeft]?.pieceValue;
                        let btn1 = document.getElementById(twoUpLeft);
                         if(pieceUpLeft === 2) {
                            btn1.classList.add('colorCheck');
                            checkCount++;
                      
                            dispatch(detectCheckActionCreator());
            
    
                        }
                    }
    
                    //for two---left---down
                    xIndex = indexIdX;
                    yIndex = indexIdY;
                    xIndex += 2;
                    yIndex--;
                    if(xIndex <= 7 && yIndex >= 0) {
                        let pieceDownLeft = game[twoLeftDown]?.pieceValue;
                        let btn1 = document.getElementById(twoLeftDown);
                       if(pieceDownLeft === 2) {
                            btn1.classList.add('colorCheck');
                            checkCount++;
            
                            dispatch(detectCheckActionCreator());
                      
    
                        }
                    }
    //for two---right---down
                    xIndex = indexIdX;
                    yIndex = indexIdY;
                    xIndex += 2;
                    yIndex++;
                    if(xIndex <= 7 && yIndex <= 7) {
                        let pieceDownRight = game[twoRightDown]?.pieceValue;
                        let btn1 = document.getElementById(twoRightDown);
                         if(pieceDownRight === 2) {
                            btn1.classList.add('colorCheck');
                            checkCount++;
                      
                            dispatch(detectCheckActionCreator());
                    
                        
    
                        }
                    }
    //for two--horizontal--left--one--up
                    xIndex = indexIdX;
                    yIndex = indexIdY;
                    xIndex--;
                    yIndex -= 2;
                    id = board[indexIdX][indexIdY];
                    let leftUp = id - 10;
                    if(xIndex >= 0 && yIndex >= 0) {
                        let pieceLeftUp = game[leftUp]?.pieceValue;
                        let btn1 = document.getElementById(leftUp);
                         if(pieceLeftUp === 2) {
                            btn1.classList.add('colorCheck');
                            checkCount++;
                   
                            dispatch(detectCheckActionCreator());
                   
                        
    
                        }
                    }

                    //two right--one--up
    
                    xIndex = indexIdX;
                    yIndex = indexIdY;
                    xIndex--;
                    yIndex += 2;
                     id = board[indexIdX][indexIdY];
                    let rightUp = id - 6;
                    if(xIndex >= 0 && yIndex <= 7) {
                        let pieceRight = game[rightUp]?.pieceValue;
                        let btn1 = document.getElementById(rightUp);
                        if(pieceRight === 2) {
                            
                            btn1.classList.add('colorCheck');
                            checkCount++;
                 
                            dispatch(detectCheckActionCreator());
                        
                        
    
                        }
                    }
    //two left-- one --doen
                    xIndex = indexIdX;
                    yIndex = indexIdY;
                    xIndex++;
                    yIndex -= 2;
                    id = board[indexIdX][indexIdY];
                    let leftTwoDown = id + 6;
                    if(xIndex <= 7 && yIndex >= 0) {
                        let pieceLeftTwoDown = game[leftTwoDown]?.pieceValue;
                        let btn1 = document.getElementById(leftTwoDown);
                        if(pieceLeftTwoDown === 2) {    
                            btn1.classList.add('colorCheck');
                            checkCount++;
                   
                            dispatch(detectCheckActionCreator());
               
                        
                        }
                    }
    
                    //two--right--one--down
                    xIndex = indexIdX;
                    yIndex = indexIdY;
                    xIndex++;
                    yIndex += 2;
                    let rightTwoDown = id + 10;
                    if(xIndex <= 7 && yIndex <= 7) {
                        let pieceRightTwoDown = game[rightTwoDown]?.pieceValue;
                        let btn1 = document.getElementById(rightTwoDown);
                       
                         if(pieceRightTwoDown === 2) {
                            btn1.classList.add('colorCheck');
                            checkCount++;
                   
                            dispatch(detectCheckActionCreator());
               
                         
                        }
                    }
                    if(checkCount > 0) {
                        let payload = {};
                        payload.checkCount = checkCount;
                        dispatch(checkCountIncrementActionCreator(payload));
    
                    }
                    else{
                        dispatch(checkCountDecrementActionCreator());
                    }
                }catch(err) {
                    console.log(err);
                }
    
    
                   
    
    
            }}}    

                
            }
            catch(err) {
                console.log(err);
            }
            return;
        }

        else{
            if(turn === 1) {
            try{
               checkCount = 0;
        
            for(let indexIdX = 0; indexIdX < 8; indexIdX++) {
                for(let indexIdY = 0; indexIdY < 8; indexIdY++) {
                    let id = board[indexIdX][indexIdY];
                    let piece = game[id]?.pieceValue;
                if(piece === 6) {
                   
                    let leftIndexY = indexIdY - 1;
                    let rightIndexY = indexIdY + 1;

                    //detecting check for white king from left side(only rook or Queen)
                    try{
                        if(leftIndexY >= 0) {
                           
                            
                            let indexId = id - 1;
                            let piece1 = game[indexId]?.pieceValue;
                         
                            if(piece1 === -5 || piece1 === -10) {
                                let btn2 = document.getElementById(indexId);
                                btn2.classList.add('colorCheck');
                          
                               
                                dispatch(detectCheckActionCreator());
                                
                            }
                            while(piece1 === 0 && leftIndexY > 0) {
                                indexId--;
                                leftIndexY--;
                                piece1 = game[indexId]?.pieceValue;
                               

                            }
                            if(piece1 < 0) {
                                let btn1 = document.getElementById(indexId)
                                switch(piece1) {
                                    case -5:
                                        for(indexId; indexId < id; indexId++) {
                                            let btn2 = document.getElementById(indexId);
                                            btn2.classList.add('colorCheck');
                                        }
                                    btn1.classList.add('colorCheck');
                                   
                                    checkCount++;
                            
                                    dispatch(detectCheckActionCreator());
                                
                             
                    

                                    break;

                                    case -10:
                                        for(indexId; indexId < id; indexId++) {
                                            let btn2 = document.getElementById(indexId);
                                            btn2.classList.add('colorCheck');
                                        }
                                        btn1.classList.add('colorCheck');
                                        checkCount++
                                       
                                     dispatch(detectCheckActionCreator());
                                   
                    

                                        break;

                                    default:
                                        break;
                                }
                            }
                            
                        }
                    }catch(err) {
                        console.log(err);
                    }

                    //detecting check from right side
                    try{
                        if(rightIndexY <= 7) {
                           
                            
                            let indexId = id + 1;
                            let piece1 = game[indexId]?.pieceValue;
                           
                            if(piece1 === -5 || piece1 === -10) {
                                let btn2 = document.getElementById(indexId);
                                btn2.classList.add('colorCheck');
                   
                               
                                dispatch(detectCheckActionCreator());
                            }
                            while(piece1 === 0 && rightIndexY < 7) {
                                indexId++;
                                rightIndexY++;
                                piece1 = game[indexId]?.pieceValue;
                               

                            }
                            if(piece1 < 0) {
                                let btn1 = document.getElementById(indexId)
                              
                                switch(piece1) {
                                    case -5:
                                        for(indexId; indexId > id; indexId--) {
                                            let btn2 = document.getElementById(indexId);
                                            btn2.classList.add('colorCheck');
                                        }
                                    btn1.classList.add('colorCheck');
                                    checkCount++;
                                   
                           
                                    dispatch(detectCheckActionCreator());
                         
                    

                                    break;

                                    case -10:
                                        for(indexId; indexId > id; indexId--) {
                                            let btn2 = document.getElementById(indexId);
                                            btn2.classList.add('colorCheck');
                                        }
                                        btn1.classList.add('colorCheck')
                                        dispatch(detectCheckActionCreator());
                                        checkCount++;
                                       
                                
                    

                                        break;

                                    default:
                                        break;
                                }
                            }
                            
                        }
                       
                    }
                    catch(err) {
                        console.log(err);
                    }


                    
                    
                   
                    //from up--rook OR queen
                   
                    try{
                        let upIndexX = indexIdX - 1;
                        if(upIndexX >= 0) {
                           
                            let id = board[indexIdX][indexIdY];
                            let indexId = id - 8;
                          
                            let piece1 = game[indexId]?.pieceValue;
                            if(piece1 === -5 || piece1 === -10) {
                                let btn2 = document.getElementById(indexId);
                                btn2.classList.add('colorCheck');
                        
                               
                                dispatch(detectCheckActionCreator());
                            }
                            while(piece1 === 0 && upIndexX > 0) {
                                indexId -= 8
                                upIndexX--;
                                piece1 = game[indexId]?.pieceValue;
                            }
                            if(piece1 < 0) {
                               
                                let btn1 = document.getElementById(indexId);
                                switch(piece1) {
                                    case -5:
                                        for(indexId; indexId < id; indexId += 8) {
                                            let btn2 = document.getElementById(indexId);
                                            btn2.classList.add('colorCheck');
                                        }

                                        btn1.classList.add('colorCheck');
                                        checkCount++;
                           
    
                                        dispatch(detectCheckActionCreator());
                                 
                    

                                        break;

                                        case -10:
                                            for(indexId; indexId < id; indexId += 8) {
                                                let btn2 = document.getElementById(indexId);
                                                btn2.classList.add('colorCheck');
                                            }
                                            btn1.classList.add('colorCheck');
                                            checkCount++;
                                           
                              

                                            dispatch(detectCheckActionCreator());
                                 
                    

                                            break;
                                        default:break;
                                }
                            }
                            
                        }

                    }
                    catch(err) {
                        console.log(err);
                    }
                    //from down side
                    try{
                       
                    let downIndexX = indexIdX + 1;
                    if(downIndexX <= 7) {
                        let id = board[indexIdX][indexIdY];
                        let indexId = id + 8;
                        let piece1 = game[indexId]?.pieceValue;
                        if(piece1 < 0) {
                            let btn1 = document.getElementById(indexId);
                            switch(piece1) {
                                case -5:
                                    btn1.classList.add('colorCheck');
                          
                                    dispatch(detectCheckActionCreator());
                                    break;

                                case -10:
                                    btn1.classList.add('colorCheck');
                           
                                    dispatch(detectCheckActionCreator());
                                    break;
                                default:break;
                            }
                        }
                        while(piece1 === 0 && downIndexX < 7) {
                            indexId += 8;
                            downIndexX++;
                            piece1 = game[indexId]?.pieceValue;

                        }
                        if(piece1 < 0) {
                            let btn1 = document.getElementById(indexId);
                            switch(piece1) {
                                case -5:
                                    for(indexId; indexId > id; indexId -= 8) {
                                        let btn2 = document.getElementById(indexId);
                                        btn2.classList.add('colorCheck');
                                    }

                                    btn1.classList.add('colorCheck');
                                    checkCount++;
                                   
                             
                                    dispatch(detectCheckActionCreator());
                             
                    

                                    break;

                                    case -10:
                                        for(indexId; indexId > id; indexId -= 8) {
                                            let btn2 = document.getElementById(indexId);
                                            btn2.classList.add('colorCheck');
                                        }
    
                                        btn1.classList.add('colorCheck');
                                        checkCount++
                                       
                                     dispatch(detectCheckActionCreator());
                            
                    

                                        break;
                                    default:break;
                        }
                    }
                    }}catch(err) {
                        console.log(err);
                    }

                    //from left--up--diagonal
                    try{
                       
                    let leftUpDiagIndexX = indexIdX - 1;
                    let leftUpDiagIndexY = indexIdY - 1;
                    if(leftUpDiagIndexX >= 0 && leftUpDiagIndexY >= 0) {
                        let id = board[indexIdX][indexIdY];
                    let indexId = id - 9;
                    let piece1 = game[indexId]?.pieceValue;
                  
                        if(piece1 < 0) {
                            let btn1 = document.getElementById(indexId);
                            switch(piece1) {
                            case -1:
                                btn1.classList.add('colorCheck');
                                checkCount++

                              dispatch(detectCheckActionCreator());
                                break;
                            case -3:
                                btn1.classList.add('colorCheck');
                        
                              dispatch(detectCheckActionCreator());
                                break;
                            case -10:
                                btn1.classList.add('colorCheck');
                               
                               dispatch(detectCheckActionCreator());
                                break;
                            
                    

                                
                            default:break;
                        }}
                        while(piece1 === 0 && leftUpDiagIndexX > 0 && leftUpDiagIndexY > 0) {
                            leftUpDiagIndexX--;
                            leftUpDiagIndexY--;
                            indexId -= 9;
                            piece1 = game[indexId]?.pieceValue;
                        }

                        if(piece1 < 0) {
                            let btn1 = document.getElementById(indexId);
                            switch(piece1) {
                              
                                case -3:
                                    for(indexId; indexId < id; indexId += 9) {
                                        let btn2 = document.getElementById(indexId);
                                        btn2.classList.add('colorCheck');
                                    }
                                    btn1.classList.add('colorCheck');
                                    checkCount++;
                                   
                            
                                    dispatch(detectCheckActionCreator());
                      
                    

                                    break;
                                case -10:
                                    for(indexId; indexId < id; indexId += 9) {
                                        let btn2 = document.getElementById(indexId);
                                        btn2.classList.add('colorCheck');
                                    }
                                    btn1.classList.add('colorCheck');
                                    checkCount++;
                                   
                         
                                    dispatch(detectCheckActionCreator());
                           
                    

                                    break;
                                default:
                                    break;
                            }
                        }
                        
                    }}catch(err) {
                        console.log(err);
                    }

                    //Right up - Diagonal
                    try{
                       
                    let rightUpDiagIndexX = indexIdX - 1;
                    let rightUpDiagIndexY = indexIdY + 1;
                    let id = board[indexIdX][indexIdY];
                    let indexId = id - 7;
                    if(rightUpDiagIndexX >= 0 && rightUpDiagIndexY <= 7) {
                        let piece1 = game[indexId]?.pieceValue;
                        if(piece1 < 0) {
                            let btn1 = document.getElementById(indexId);
                            switch(piece1) {
                                case -1:
                                    btn1.classList.add('colorCheck');
                                    checkCount++;
                       
                                    dispatch(detectCheckActionCreator());
                                    break;
                                case -3:
                                    btn1.classList.add('colorCheck');
                          
                                    dispatch(detectCheckActionCreator());
                                    break;
                                case -10:
                                    btn1.classList.add('colorCheck');
                      
                                    dispatch(detectCheckActionCreator());
                                    break;
                                default:break;
                            }
                        }
                        while(piece1 === 0 && rightUpDiagIndexX > 0 && rightUpDiagIndexY < 7) {
                            rightUpDiagIndexX--;
                            rightUpDiagIndexY++;
                            indexId -= 7;
                            piece1 = game[indexId]?.pieceValue;
                        }
                        if(piece1 < 0) {
                            let btn1 = document.getElementById(indexId);
                            switch(piece1) {
                                case -3:
                                    for(indexId; indexId < id; indexId += 7) {
                                        let btn2 = document.getElementById(indexId);
                                        btn2.classList.add('colorCheck');
                                    }
                                    btn1.classList.add('colorCheck');
                                    checkCount++;
                        
                                    dispatch(detectCheckActionCreator());
                                    break;
                                case -10:
                                    for(indexId; indexId < id; indexId += 7) {
                                        let btn2 = document.getElementById(indexId);
                                        btn2.classList.add('colorCheck');
                                    }
                                    btn1.classList.add('colorCheck');
                                    checkCount++;
                                   
                             
                                    dispatch(detectCheckActionCreator());
                                    break;
                                    default:break;
                                    
                            }
                        }
                        

                    }
                    }catch(err) {
                        console.log(err);
                    }


                    //left down diagonal
                    try{
                       
                    let leftDownDiagIndexX = indexIdX + 1;
                    let leftDownDiagIndexY = indexIdY -1;
                    if(leftDownDiagIndexX <= 7 && leftDownDiagIndexY >= 0) {
                    let id = board[indexIdX][indexIdY];
                    let indexId = id + 7;
                  
                        let piece1 = game[indexId]?.pieceValue;
                        if(piece1 < 0 || piece1 === 0) {
                            let btn1 = document.getElementById(indexId);
                            switch(piece1) {
                                case -1:
                                  //  btn1.classList.add('colorCheck');
                                    //checkCount++;
                              
                                    //dispatch(detectCheckActionCreator());
                                    break;
                                case -3:
                                    btn1.classList.add('colorCheck');
                                   
                                  dispatch(detectCheckActionCreator());
                                    break;
                                case -10:
                                    btn1.classList.add('colorCheck');
                                 dispatch(detectCheckActionCreator());
                                    break;
                                default:break;
                            }

                            while(piece1 === 0 && leftDownDiagIndexX < 7 && leftDownDiagIndexY > 0) {
                                leftDownDiagIndexX++;
                                leftDownDiagIndexY--;
                                indexId += 7;
                                piece1 = game[indexId]?.pieceValue;
                            }
                            if(piece1 < 0) {
                                let btn1 = document.getElementById(indexId);
                                switch(piece1) {
                                    case -3:
                                        for(indexId; indexId > id; indexId -= 7) {
                                            let btn2 = document.getElementById(indexId);
                                            btn2.classList.add('colorCheck');
                                        }
                                        btn1.classList.add('colorCheck');
                                        checkCount++;
                                       
                                      
    
                                        dispatch(detectCheckActionCreator());
                                        break;
                                    case -10:
                                        for(indexId; indexId > id; indexId -= 7) {
                                            let btn2 = document.getElementById(indexId);
                                            btn2.classList.add('colorCheck');
                                        }
                                       
                                        btn1.classList.add('colorCheck');
                                        checkCount++
                                       dispatch(detectCheckActionCreator());
                                        break;
                                        default:break;
                                        
                                }
                            }
                        }
                        
                    }}catch(err) {
                        console.log(err);
                    }

                    //from right down

                    try{
                       
                    let rightDownDiagIndexX = indexIdX + 1;
                    let rightDownDiagIndexY = indexIdY + 1;

                    if(rightDownDiagIndexX <= 7 && rightDownDiagIndexY <= 7) {
                    let id = board[indexIdX][indexIdY];

                    let indexId = id + 9;
                  
                        let piece1 = game[indexId]?.pieceValue;
                        if(piece1 < 0 || piece1 === 0) {
                            let btn1 = document.getElementById(indexId);
                            switch(piece1) {
                        //         case -1:
                        //         btn1.classList.add('colorCheck');
                        //         checkCount++
                        // dispatch(detectCheckActionCreator());
                        //         break;
                            case -3:
                                btn1.classList.add('colorCheck');
                   
                               
                                dispatch(detectCheckActionCreator());
                                break;
                            case -10:
                                btn1.classList.add('colorCheck');
                        
                                dispatch(detectCheckActionCreator());
                                break;
                                    default:break;
                            }

                            while(piece1 === 0 && rightDownDiagIndexX < 7 && rightDownDiagIndexY < 7) {
                                rightDownDiagIndexX++;
                                rightDownDiagIndexY++;
                                indexId += 9;
                                piece1 = game[indexId]?.pieceValue;
                            }
                            if(piece1 < 0) {
                                let btn1 = document.getElementById(indexId);
                                switch(piece1) {
                                    case -3:
                                        for(indexId; indexId > id; indexId -= 9) {
                                            let btn2 = document.getElementById(indexId);
                                            btn2.classList.add('colorCheck');
                                        }

                                        btn1.classList.add('colorCheck');
                                        checkCount++;
                                       
                              
    
                                        dispatch(detectCheckActionCreator());
                                        break;

                                        case -10:
                                            for(indexId; indexId > id; indexId -= 9) {
                                                let btn2 = document.getElementById(indexId);
                                                btn2.classList.add('colorCheck');
                                            }
    
                                           
                                            btn1.classList.add('colorCheck');
                                            checkCount++;
                              

                                            dispatch(detectCheckActionCreator());
                                            break;
                                        default:break;

                                }
                            }
                        }
                  
                    }


                    }catch(err) {
                        console.log(err);
                    }


                    //Knight Check
                    try{
                   

                    let twoUpRight = id - 15;
                    let twoUpLeft = id - 17;
                    let twoLeftDown = id + 15;
                    let twoRightDown = id + 17;

                    //two --- up---- right
                     let xIndex = indexIdX - 2;
                    let  yIndex = indexIdY + 1;
                     if(xIndex >= 0 && yIndex <= 7) {   
                    let pieceUpRight = game[twoUpRight]?.pieceValue;
                    let btn1 = document.getElementById(twoUpRight);
                    
                     if(pieceUpRight === -2) {
                        piece = game[id]?.pieceValue
                        btn1.classList.add('colorCheck');
                        checkCount++;
       
                        dispatch(detectCheckActionCreator());
                  
                    

                    }
                }


                //two --- up --- left
                xIndex = indexIdX;
                yIndex = indexIdY;
                xIndex -= 2;
                yIndex--;
                if(xIndex >= 0 && yIndex >= 0) {
                    let pieceUpLeft = game[twoUpLeft]?.pieceValue;
                    let btn1 = document.getElementById(twoUpLeft);
                     if(pieceUpLeft === -2) {
                        btn1.classList.add('colorCheck');
                        checkCount++;
                    
                        dispatch(detectCheckActionCreator());
                       // setCheck(true);
                                            //   setCheck(true);
                    

                    }
                }

                //two --- left ---- down
                xIndex = indexIdX;
                yIndex = indexIdY;
                xIndex += 2;
                yIndex--;
                if(xIndex <= 7 && yIndex >= 0) {
                    let pieceDownLeft = game[twoLeftDown]?.pieceValue;
                    let btn1 = document.getElementById(twoLeftDown);
                   if(pieceDownLeft === -2) {
                        btn1.classList.add('colorCheck');
                        checkCount++;
                    
                        dispatch(detectCheckActionCreator());
                      //  setCheck(true);
                                           //   setCheck(true);
                    

                    }
                }

                //two --- right --- down
                xIndex = indexIdX;
                yIndex = indexIdY;
                xIndex += 2;
                yIndex++;
                if(xIndex <= 7 && yIndex <= 7) {
                    let pieceDownRight = game[twoRightDown]?.pieceValue;
                    let btn1 = document.getElementById(twoRightDown);
                     if(pieceDownRight === -2) {
                        btn1.classList.add('colorCheck');
                        checkCount++;
                
                        dispatch(detectCheckActionCreator());
                      //  setCheck(true);
                                           //   setCheck(true);
                    

                    }
                }

                //two-- left -- one -- up
                xIndex = indexIdX;
                yIndex = indexIdY;
                xIndex--;
                yIndex -= 2;
                id = board[indexIdX][indexIdY];
                let leftUp = id - 10;
                if(xIndex >= 0 && yIndex >= 0) {
                    let pieceLeftUp = game[leftUp]?.pieceValue;
                    let btn1 = document.getElementById(leftUp);
                     if(pieceLeftUp === -2) {
                        btn1.classList.add('colorCheck');
                        checkCount++;
                    
                        dispatch(detectCheckActionCreator());
                      //  setCheck(true);
                                           //   setCheck(true);
                    

                    }
                }

                //two---right---one---up
                xIndex = indexIdX;
                yIndex = indexIdY;
                xIndex--;
                yIndex += 2;
                id  = board[indexIdX][indexIdY];
                let rightUp = id - 6;
                if(xIndex >= 0 && yIndex <= 7) {
                    let pieceRight = game[rightUp]?.pieceValue;
                
                    let btn1 = document.getElementById(rightUp);
                    if(pieceRight === -2) {
                        btn1.classList.add('colorCheck');
                        checkCount++;
                    
                        dispatch(detectCheckActionCreator());
                      //  setCheck(true);
                                           //   setCheck(true);
                    

                    }
                }

                //two-left--one--down

                xIndex = indexIdX;
                yIndex = indexIdY;
                xIndex++;
                yIndex -= 2;
                id = board[indexIdX][indexIdY];
                let leftTwoDown = id + 6;
                if(xIndex <= 7 && yIndex >= 0) {
                    let pieceLeftTwoDown = game[leftTwoDown]?.pieceValue;
                    let btn1 = document.getElementById(leftTwoDown);
                    if(pieceLeftTwoDown === -2) {
                        btn1.classList.add('colorCheck');
                        checkCount++;
                    
                        dispatch(detectCheckActionCreator());
                     //   setCheck(true);
                    
                    }
                }

                //two--right--one--down
                xIndex = indexIdX;
                yIndex = indexIdY;
                xIndex++;
                yIndex += 2;
                let rightTwoDown = id + 10;
                if(xIndex <= 7 && yIndex <= 7) {
                    let pieceRightTwoDown = game[rightTwoDown]?.pieceValue;
                    let btn1 = document.getElementById(rightTwoDown);
                   
                     if(pieceRightTwoDown === -2) {
                        btn1.classList.add('colorCheck');
                        checkCount++;
                
                        dispatch(detectCheckActionCreator());
                      //  setCheck(true);
                     
                    }
                }
                if(checkCount > 0) {
                    let payload = {};
                    payload.checkCount = checkCount;
                    dispatch(checkCountIncrementActionCreator(payload));

                }
                else{
                    dispatch(checkCountDecrementActionCreator());
                }}
            catch(err) {
                console.log(err);
            


               



                }
            }}}
        }catch(err) {
            console.log(err);
        }
    }}

    return;
    }

    function detectCheck(originalIndex, intentedIndex) {
        try{
            let game1 = [];
            let checkCount = 0;
            let piece = game[originalIndex].pieceValue;
        
            for(let j = 0; j < 64; j++) {
            
                   
                    game1[j] = game[j].pieceValue;
                }
            
            game1[originalIndex]= 0;
            game1[intentedIndex] = piece;
            if(turn === 2) {
                
            checkCount = 0;
            for(let indexIdX = 0; indexIdX < 8; indexIdX++) {
                for(let indexIdY = 0; indexIdY < 8; indexIdY++) {
                    let id = board[indexIdX][indexIdY];
                    let piece = game1[id];
                if(piece === -6) {
                   
                    let leftIndexY = indexIdY - 1;
                    let rightIndexY = indexIdY + 1;
//check detection from left side
                    try{
                       
                        if(leftIndexY >= 0) {
                            
                            let indexId = id - 1;
                            let piece1 = game1[indexId]
                            
                            if(piece1 === 5 || piece1 === 10) {
                                
                                
                            }
                            while(piece1 === 0 && leftIndexY > 0) {
                                indexId--;
                                leftIndexY--;
                                piece1 = game1[indexId]
                               

                            }
                            if(piece1 > 0) {
                            
                                switch(piece1) {
                                    case 5:
                                       
                                       
                                   
                                    checkCount++;
                                   
                                    
                                   
                                
                                
                    

                                    break;

                                    case 10:
                                       
                                        piece = game1[id];
                                    
                                        checkCount++
                                       
                                 
                    

                                        break;

                                    default:
                                        break;
                                }
                            }
                           
                        }
                    }catch(err) {
                        console.log(err);
                    }
//check detection from right side for black king
                    try{
                       
                        if(rightIndexY <= 7) {
                            
                            let indexId = id + 1;
                            let piece1 = game1[indexId]
                          //only rook or queen
                            if(piece1 === 5 || piece1 === 10) {
                            
                               
                            }
                            while(piece1 === 0 && rightIndexY < 7) {
                                indexId++;
                                rightIndexY++;
                                piece1 = game1[indexId]
                               

                            }
                            if(piece1 > 0) {
                            
                              
                                switch(piece1) {
                                    case 5:
                                      
                                      
                                    
                                   
                                    checkCount++;
                                   
                                  
                             
                    

                                    break;

                                    case 10:
                                       
                                    
                                     
                                     
                                        checkCount++;
                                       
                                      

                                        break;

                                    default:
                                        break;
                                }
                            }
                        }
                        
                       
                    }
                    catch(err) {
                        console.log(err);
                    }


                    
                    
                    //from up chck detection only rook oe queen
                   
                    try{
                       
                        let upIndexX = indexIdX - 1;
                        if(upIndexX >= 0) {
                            let id = board[indexIdX][indexIdY];
                            let indexId = id - 8;
                           
                            let piece1 = game1[indexId]
                            if(piece1 === 5 || piece1 === 10) {
                              
                             
                            }
                            while(piece1 === 0 && upIndexX > 0) {
                                indexId -= 8
                                upIndexX--;
                                piece1 = game1[indexId]
                            }
                            if(piece1 > 0) {
                               
                             
                                switch(piece1) {
                                    case 5:
                                       
                                        checkCount++;
                                    
                    

                                        break;

                                        case 10:
                                          
                                            checkCount++;
                                           
                                        

                                        
                    

                                            break;
                                        default:break;
                                }
                            }
                           
                        }
                        

                    }
                    catch(err) {
                        console.log(err);
                    }

                    //check detection from down side -- rook or Queen
                    try{
                       
                    let downIndexX = indexIdX + 1;
                    if(downIndexX <= 7) {
                        let id = board[indexIdX][indexIdY];
                        let indexId = id + 8;
                        let piece1 = game1[indexId];
                       
                        if(piece1 > 0) {
                        
                            switch(piece1) {
                                case 5:
                               
                                    break;

                                case 10:
                                
                                
                                    break;
                                default:break;
                            }
                        }
                        while(piece1 === 0 && downIndexX < 7) {
                            indexId += 8;
                            downIndexX++;
                            piece1 = game1[indexId];

                        }
                        if(piece1 > 0) {
                          
                            switch(piece1) {
                                case 5:
                                   
                                 
                                    checkCount++;
                                   
                              
                    

                                    break;

                                    case 10:
                                       
                                        checkCount++
                               
                    

                                        break;
                                    default:break;
                        }
                    }
                  
                    
                }}catch(err) {
                        console.log(err);
                    }

                    //detecting check diagonally
                    //from left up(relative to black king)
                    try{
                       
                    let leftUpDiagIndexX = indexIdX - 1;
                    let leftUpDiagIndexY = indexIdY - 1;
                    if(leftUpDiagIndexX >= 0 && leftUpDiagIndexY >= 0) {
                        let id = board[indexIdX][indexIdY];
                    let indexId = id - 9;
                    let piece1 = game1[indexId];
                  
                        if(piece1 > 0) {
                         
                            switch(piece1) {
                            case 1:
                                checkCount++;
     
                                break;
                            case 3:
                               
          
                                break;
                            case 10:
            
                                break;
                                //setCheck(true)
                                                     //   setCheck(true);
                    

                                
                            default:break;
                        }}
                        while(piece1 === 0 && leftUpDiagIndexX > 0 && leftUpDiagIndexY > 0) {
                            leftUpDiagIndexX--;
                            leftUpDiagIndexY--;
                            indexId -= 9;
                            piece1 = game1[indexId];
                        }

                        if(piece1 > 0) {
                          
                            switch(piece1) {
                              
                                case 3:
                                   
                                    checkCount++;
                                   
                           
                    

                                    break;
                                case 10:
                                   
                                    checkCount++;
                           
                    

                                    break;
                                default:
                                    break;
                            }
                        }

                        
                    }}catch(err) {
                        console.log(err);
                    }
                    try{
                       
                       
                    let rightUpDiagIndexX = indexIdX - 1;
                    let rightUpDiagIndexY = indexIdY + 1;
                    let id = board[indexIdX][indexIdY];
                    let indexId = id - 7;
                    if(rightUpDiagIndexX >= 0 && rightUpDiagIndexY <= 7) {
                        let piece1 = game1[indexId];
                        if(piece1 > 0) {
                          
                            switch(piece1) {
                                case 1:
                                  
                                    checkCount++;
                                   
                                 
                                    break;
                            
                                default:break;
                            }
                        }
                        while(piece1 === 0 && rightUpDiagIndexX > 0 && rightUpDiagIndexY < 7) {
                            rightUpDiagIndexX--;
                            rightUpDiagIndexY++;
                            indexId -= 7;
                            piece1 = game1[indexId]
                        }
                        if(piece1 > 0) {
                         
                            switch(piece1) {
                                
                                case 3:
                                  
                                    checkCount++;
                                
                              
                                    break;
                                case 10:
                                  
                                    checkCount++;
                                 
                                
                                    break;
                                    default:break;
                                    
                            }
                        }


                        
                    }
                    }catch(err) {
                        console.log(err);
                    }
//detecting check for black king from left--down--diagonal
                    try{
                       
                    let leftDownDiagIndexX = indexIdX + 1;
                    let leftDownDiagIndexY = indexIdY -1;
                    if(leftDownDiagIndexX <= 7 && leftDownDiagIndexY >= 0) {
                    let id = board[indexIdX][indexIdY];
                    let indexId = id + 7;
                  
                        let piece1 = game1[indexId];
                        if(piece1 > 0) {
                        
                            switch(piece1) {
                                case 1:
                                
                                    checkCount++;
                               
                                    break;
                             
                                default:break;
                            }}

                            while(piece1 === 0 && leftDownDiagIndexX < 7 && leftDownDiagIndexY > 0) {
                                leftDownDiagIndexX++;
                                leftDownDiagIndexY--;
                                indexId += 7;
                                piece1 = game1[indexId];
                            }
                            if(piece1 > 0) {
                              
                                switch(piece1) {

                                    case -3:
                                   
                                        checkCount++;
                                       
    
                                    
                                        break;
                                    case 10:
                                       
                                        checkCount++
                                       
                                    
                                        break;
                                        default:break;
                                        
                                }
                            
                        }
                        
                    }}catch(err) {
                        console.log(err);
                    }

//detecting check from right-down-diagonal---relative to black king
                    try{
                       
                    let rightDownDiagIndexX = indexIdX + 1;
                    let rightDownDiagIndexY = indexIdY + 1;

                    if(rightDownDiagIndexX <= 7 && rightDownDiagIndexY <= 7) {
                    let id = board[indexIdX][indexIdY];

                    let indexId = id + 9;
                  
                        let piece1 = game1[indexId];
                        if(piece1 > 0) {
                         
                            switch(piece1) {
                                case 1:
                             
                                checkCount++
                              
                                break;
                        
                                    default:break;
                            }
                        }
                            while(piece1 === 0 && rightDownDiagIndexX < 7 && rightDownDiagIndexY < 7) {
                                rightDownDiagIndexX++;
                                rightDownDiagIndexY++;
                                indexId += 9;
                                piece1 = game1[indexId];
                            }
                            if(piece1 > 0) {
                                switch(piece1) {
                                    case 3:
                                       
                                        checkCount++;
                                       
                                     
    
                                   
                                        break;

                                        case 10:
                                          
                                            checkCount++;
                                        

                                        
                                            break;
                                        default:break;

                                }
                            
                        }
                    }

                    

                    }catch(err) {
                        console.log(err);
                    }
                    try{
                        id = board[indexIdX][indexIdY];
    
                        let twoUpRight = id - 15;
                        let twoUpLeft = id - 17;
                        let twoLeftDown = id + 15;
                        let twoRightDown = id + 17;



                        //for two--up--right
                         let xIndex = indexIdX - 2;
                        let  yIndex = indexIdY + 1;
                         if(xIndex >= 0 && yIndex <= 7) {   
                        let pieceUpRight = game1[twoUpRight]?.pieceValue;
                        
                         if(pieceUpRight === 2) {
                         
                            checkCount++;
                         
                        
    
                        }
                    }
    
                    //for two---up---left
                    xIndex = indexIdX;
                    yIndex = indexIdY;
                    xIndex -= 2;
                    yIndex--;
                    if(xIndex >= 0 && yIndex >= 0) {
                        let pieceUpLeft = game1[twoUpLeft]?.pieceValue;
                         if(pieceUpLeft === 2) {
                         
                            checkCount++;
                           
                        
    
                        }
                    }
    
                    //for two---left---down
                    xIndex = indexIdX;
                    yIndex = indexIdY;
                    xIndex += 2;
                    yIndex--;
                    if(xIndex <= 7 && yIndex >= 0) {
                        let pieceDownLeft = game1[twoLeftDown]?.pieceValue;
                       if(pieceDownLeft === 2) {
                        
                            checkCount++;
                     
    
                        }
                    }
    //for two---right---down
                    xIndex = indexIdX;
                    yIndex = indexIdY;
                    xIndex += 2;
                    yIndex++;
                    if(xIndex <= 7 && yIndex <= 7) {
                        let pieceDownRight = game1[twoRightDown]?.pieceValue;
                         if(pieceDownRight === 2) {
                         
                            checkCount++;
                       
                        
    
                        }
                    }
    //for two--horizontal--left--one--up
                    xIndex = indexIdX;
                    yIndex = indexIdY;
                    xIndex--;
                    yIndex -= 2;
                    id = board[indexIdX][indexIdY];
                    let leftUp = id - 10;
                    if(xIndex >= 0 && yIndex >= 0) {
                        let pieceLeftUp = game1[leftUp]?.pieceValue;
                         if(pieceLeftUp === 2) {
                         
                            checkCount++;
                         
    
                        }
                    }

                    //two right--one--up
    
                    xIndex = indexIdX;
                    yIndex = indexIdY;
                    xIndex--;
                    yIndex += 2;
                     id = board[indexIdX][indexIdY];
                    let rightUp = id - 6;
                    if(xIndex >= 0 && yIndex <= 7) {
                        let pieceRight = game1[rightUp]?.pieceValue;
                        if(pieceRight === 2) {
                            
                         
                            checkCount++;
                       
                        
    
                        }
                    }
    //two left-- one --doen
                    xIndex = indexIdX;
                    yIndex = indexIdY;
                    xIndex++;
                    yIndex -= 2;
                    id = board[indexIdX][indexIdY];
                    let leftTwoDown = id + 6;
                    if(xIndex <= 7 && yIndex >= 0) {
                        let pieceLeftTwoDown = game1[leftTwoDown]?.pieceValue;
                        if(pieceLeftTwoDown === 2) {    
                         
                            checkCount++;
                      
                        }
                    }
    
                    //two--right--one--down
                    xIndex = indexIdX;
                    yIndex = indexIdY;
                    xIndex++;
                    yIndex += 2;
                    let rightTwoDown = id + 10;
                    if(xIndex <= 7 && yIndex <= 7) {
                        let pieceRightTwoDown = game1[rightTwoDown]?.pieceValue;
                       
                         if(pieceRightTwoDown === 2) {
                         
                            checkCount++;
                         
                         
                        }
                    }
                  
                }catch(err) {
                    console.log(err);
                }
    
    
                   
    



                  
                }}
            }
            
        if(checkCount >= 1 ) {
            return true;
        }
        else {
        return false;
        }
        }
        if(turn === 1) {
            try{
                checkCount = 0;
                
             for(let indexIdX = 0; indexIdX < 8; indexIdX++) {
                 for(let indexIdY = 0; indexIdY < 8; indexIdY++) {
                     let id = board[indexIdX][indexIdY];
                     let piece = game1[id];
                 if(piece === 6) {
                    
                     let leftIndexY = indexIdY - 1;
                     let rightIndexY = indexIdY + 1;
 
                     //detecting check for white king from left side(only rook or Queen)
                     try{
                         if(leftIndexY >= 0) {
                            
                             
                             let indexId = id - 1;
                             let piece1 = game1[indexId]
                          
                             if(piece1 === -5 || piece1 === -10) {
                              
                                 
                             }
                             while(piece1 === 0 && leftIndexY > 0) {
                                 indexId--;
                                 leftIndexY--;
                                 piece1 = game1[indexId];
                                
 
                             }
                             if(piece1 < 0) {
                              
                                 switch(piece1) {
                                     case -5:
                                       
                                     checkCount++;
                                   
                                 
                             
                     
 
                                     break;
 
                                     case -10:
                                    
                                         checkCount++
    
 
                                         break;
 
                                     default:
                                         break;
                                 }
                             }
                             
                         }
                         
                     }catch(err) {
                         console.log(err);
                     }
 
                     //detecting check from right side
                     try{
                         if(rightIndexY <= 7) {
                            
                             
                             let indexId = id + 1;
                             let piece1 = game1[indexId];
                            
                             if(piece1 === -5 || piece1 === -10) {
                             
                             }
                             while(piece1 === 0 && rightIndexY < 7) {
                                 indexId++;
                                 rightIndexY++;
                                 piece1 = game1[indexId];
                                
 
                             }
                             if(piece1 < 0) {
                             
                               
                                 switch(piece1) {
                                     case -5:
                                       
                                     checkCount++;
                                    
                                
                     
 
                                     break;
 
                                     case -10:
                                      
                                         checkCount++;
                                        
                                  
                     
 
                                         break;
 
                                     default:
                                         break;
                                 }
                             }
                             
                         }
                        
                     }
                     catch(err) {
                         console.log(err);
                     }
 
 
                     
                     
                    
                     //from up--rook OR queen
                    
                     try{
                         let upIndexX = indexIdX - 1;
                         if(upIndexX >= 0) {
                            
                             let id = board[indexIdX][indexIdY];
                             let indexId = id - 8;
                           
                             let piece1 = game1[indexId]
                             if(piece1 === -5 || piece1 === -10) {
                              
                             }
                             while(piece1 === 0 && upIndexX > 0) {
                                 indexId -= 8
                                 upIndexX--;
                                 piece1 = game1[indexId];
                             }
                             if(piece1 < 0) {
                           
                                 switch(piece1) {
                                     case -5:
                                      
                                         checkCount++;
                                        
                                    
                     
 
                                         break;
 
                                         case -10:
                                         
                                             checkCount++;
                                            
                                     
                     
 
                                             break;
                                         default:break;
                                 }
                             }
                             
                         }
                        
 
                     }
                     catch(err) {
                         console.log(err);
                     }
                     //from down side
                     try{
                        
                     let downIndexX = indexIdX + 1;
                     if(downIndexX <= 7) {
                         let id = board[indexIdX][indexIdY];
                         let indexId = id + 8;
                         let piece1 = game1[indexId];
                         if(piece1 < 0) {
                          
                             switch(piece1) {
                                 case -5:
                                   
                                     break;
 
                                 case -10:
                                
                                     break;
                                 default:break;
                             }
                         }
                         while(piece1 === 0 && downIndexX < 7) {
                             indexId += 8;
                             downIndexX++;
                             piece1 = game1[indexId];
 
                         }
                         if(piece1 < 0) {
                        
                             switch(piece1) {
                                 case -5:
                                  
                                     checkCount++;
                            
                     
 
                                     break;
 
                                     case -10:
                                      
                                         checkCount++
      
                     
 
                                         break;
                                     default:break;
                         }
                     }
                    
                     }}catch(err) {
                         console.log(err);
                     }
 
                     //from left--up--diagonal
                     try{
                        
                     let leftUpDiagIndexX = indexIdX - 1;
                     let leftUpDiagIndexY = indexIdY - 1;
                     if(leftUpDiagIndexX >= 0 && leftUpDiagIndexY >= 0) {
                         let id = board[indexIdX][indexIdY];
                     let indexId = id - 9;
                     let piece1 = game1[indexId];
                   
                         if(piece1 < 0) {
                          
                             switch(piece1) {
                             case -1:
                             
                                 checkCount++
 
                                 break;
                      
                         
                     
 
                                 
                             default:break;
                         }}
                         while(piece1 === 0 && leftUpDiagIndexX > 0 && leftUpDiagIndexY > 0) {
                             leftUpDiagIndexX--;
                             leftUpDiagIndexY--;
                             indexId -= 9;
                             piece1 = game1[indexId];
                         }
 
                         if(piece1 < 0) {
                          
                             switch(piece1) {
                               
                                 case -3:
                                 
                                     checkCount++;
                                    
                               
                     
 
                                     break;
                                 case -10:
                                 
                                     checkCount++;
                                    
                               
                     
 
                                     break;
                                 default:
                                     break;
                             }
                         }
                        
                         
                     }}catch(err) {
                         console.log(err);
                     }
 
                     //Right up - Diagonal
                     try{
                        
                     let rightUpDiagIndexX = indexIdX - 1;
                     let rightUpDiagIndexY = indexIdY + 1;
                     let id = board[indexIdX][indexIdY];
                     let indexId = id - 7;
                     if(rightUpDiagIndexX >= 0 && rightUpDiagIndexY <= 7) {
                         let piece1 = game1[indexId];
                         if(piece1 < 0) {
                          
                             switch(piece1) {
                                 case -1:
                                     checkCount++;
                                   
                                     break;
                               
                                 default:break;
                             }
                         }
                         while(piece1 === 0 && rightUpDiagIndexX > 0 && rightUpDiagIndexY < 7) {
                             rightUpDiagIndexX--;
                             rightUpDiagIndexY++;
                             indexId -= 7;
                             piece1 = game1[indexId];
                         }
                         if(piece1 < 0) {
                          
                             switch(piece1) {
                                 case -3:
                                  
                                     checkCount++;
                                    
                                 
                                     break;
                                 case -10:
                               
                                     checkCount++;
                             
                                     break;
                                     default:break;
                                     
                             }
                         }
                         
                        
                     }
                     }catch(err) {
                         console.log(err);
                     }
 
 
                     //left down diagonal
                     try{
                        
                     let leftDownDiagIndexX = indexIdX + 1;
                     let leftDownDiagIndexY = indexIdY -1;
                     if(leftDownDiagIndexX <= 7 && leftDownDiagIndexY >= 0) {
                     let id = board[indexIdX][indexIdY];
                     let indexId = id + 7;
                   
                         let piece1 = game1[indexId];
                         if(piece1 < 0) {
                         
                             switch(piece1) {
                                 case -1:
                                   
                                     checkCount++;
                                  
                                     break;
                     
                                 default:break;
                             }
                            }
                             while(piece1 === 0 && leftDownDiagIndexX < 7 && leftDownDiagIndexY > 0) {
                                 leftDownDiagIndexX++;
                                 leftDownDiagIndexY--;
                                 indexId += 7;
                                 piece1 = game1[indexId]
                             }
                             if(piece1 < 0) {
                              
                                 switch(piece1) {
                                     case -3:
                                     
                                         checkCount++;
                                     
                                         break;
                                     case -10:
                                     
                                         checkCount++
 
                                         break;
                                         default:break;
                                         
                                 }
                             
                         }
                        
                     }}catch(err) {
                         console.log(err);
                     }
 
                     //from right down
 
                     try{
                        
                     let rightDownDiagIndexX = indexIdX + 1;
                     let rightDownDiagIndexY = indexIdY + 1;
 
                     if(rightDownDiagIndexX <= 7 && rightDownDiagIndexY <= 7) {
                     let id = board[indexIdX][indexIdY];
 
                     let indexId = id + 9;
                   
                         let piece1 = game1[indexId];
                         if(piece1 < 0) {
                        
                             switch(piece1) {
                                 case -1:
                         
  
                                 break;
                      
                                     default:break;
                             }}
 
                             while(piece1 === 0 && rightDownDiagIndexX < 7 && rightDownDiagIndexY < 7) {
                                 rightDownDiagIndexX++;
                                 rightDownDiagIndexY++;
                                 indexId += 9;
                                 piece1 = game1[indexId]
                             }
                             if(piece1 < 0) {
                              
                                 switch(piece1) {
                                     case -3:
                                      
                                         checkCount++;
                                    
                                         break;
 
                                         case -10:
                                      
                                             checkCount++;
                                         
                                             break;
                                         default:break;
 
                                 }
                             }
                         
                     }
                    
 
 
                     }catch(err) {
                         console.log(err);
                     }
                     try{
                        id = board[indexIdX][indexIdY];
    
                        let twoUpRight = id - 15;
                        let twoLeftDown = id + 15;
                        let twoRightDown = id + 17;



                        //for two--up--right
                        try{

                        
                         let xIndex = indexIdX - 2;
                        let  yIndex = indexIdY + 1;
                         if(xIndex >= 0 && yIndex <= 7) {   
                        let pieceUpRight = game1[twoUpRight]?.pieceValue;
                        
                         if(pieceUpRight === -2) {
                        
                           
                            checkCount++;
                           
                        
    
                        }
                    }}catch(err) {
                        console.log(err);
                    }
    
                    //for two---up---left
                    try{
                        id = board[indexIdX][indexIdY];
                        
                        let twoUpLeft = id - 17;
                  let  xIndex = indexIdX;
                 let   yIndex = indexIdY;
                    xIndex -= 2;
                    yIndex--;
            

                    if(xIndex >= 0 && yIndex >= 0) {
                        let pieceUpLeft = game1[twoUpLeft]?.pieceValue;
                    
                      
                         if(pieceUpLeft === -2) {
                            
                           
                            checkCount++;
                        
    
                        }
                    }}catch(err) {
                        console.log(err);
                    }
    
                    //for two---left---down
                    try{
                  let  xIndex = indexIdX;
                  let  yIndex = indexIdY;
                    xIndex += 2;
                    yIndex--;
                    if(xIndex <= 7 && yIndex >= 0) {
                        let pieceDownLeft = game1[twoLeftDown]?.pieceValue;
                       if(pieceDownLeft === -2) {
                         
                            checkCount++;
                        
                        
    
                        }
                    }}catch(err) {
                        console.log(err);
                    }
    //for two---right---down
    try{
        
                let    xIndex = indexIdX;
                let    yIndex = indexIdY;
                    xIndex += 2;
                    yIndex++;
                    
                    if(xIndex <= 7 && yIndex <= 7) {
                        let pieceDownRight = game1[twoRightDown]?.pieceValue;
                         if(pieceDownRight === -2) {
                            
                           
                            checkCount++;
                         
                        
    
                        }
                    }}catch(err) {
                        console.log(err);
                    }
    //for two--horizontal--left--one--up
    try{
                   let xIndex = indexIdX;
                  let  yIndex = indexIdY;
                    xIndex--;
                    yIndex -= 2;
                    id = board[indexIdX][indexIdY];
                    let leftUp = id - 10;
                    if(xIndex >= 0 && yIndex >= 0) {
                        let pieceLeftUp = game1[leftUp]?.pieceValue;
                         if(pieceLeftUp === -2) {
                         
                            checkCount++;
                       
                        
    
                        }
                    }}catch(err) {
                        console.log(err);
                    }

                    //two right--one--up
                    try{
    
                 let   xIndex = indexIdX;
                 let   yIndex = indexIdY;
                    xIndex--;
                    yIndex += 2;
                     id = board[indexIdX][indexIdY];
                    let rightUp = id - 6;
                    if(xIndex >= 0 && yIndex <= 7) {
                        let pieceRight = game1[rightUp]?.pieceValue;
                        if(pieceRight === -2) {
                            checkCount++;
                        
                      
                        
    
                        }
                    }}catch(err) {
                        console.log(err);
                    }
    //two left-- one --doench
    try{
                  let  xIndex = indexIdX;
                  let  yIndex = indexIdY;
                    xIndex++;
                    yIndex -= 2;
                    id = board[indexIdX][indexIdY];
                    let leftTwoDown = id + 6;
                    if(xIndex <= 7 && yIndex >= 0) {
                        let pieceLeftTwoDown = game1[leftTwoDown]?.pieceValue;
                        if(pieceLeftTwoDown === -2) {    
                            checkCount++;
                         
                        
                        }
                    }}catch(err) {
                        console.log(err);
                    }
    
                    //two--right--one--down
                    try{
                        
                  let  xIndex = indexIdX;
                  let  yIndex = indexIdY;
                    xIndex++;
                    yIndex += 2;
                    let rightTwoDown = id + 10;
                    if(xIndex <= 7 && yIndex <= 7) {
                        let pieceRightTwoDown = game1[rightTwoDown]?.pieceValue;
                       
                         if(pieceRightTwoDown === -2) {
                          
                            checkCount++;
                          
                        }
                    }}catch(err) {
                        console.log(err);
                    }
                
                  
                }catch(err) {
                    console.log(err);
                }
    
    
                   
    
                    }
                }
            }
        }catch(err) {
            console.log(err);
        }
        if(checkCount >= 1) {
            return true;
        }
        return false;
                  
                }
            



        
       
   
   
}
catch(err) {
    console.log(err);
}
     return;
}
        

            



   
    function handleGame(e) {
        try{

          
            try{
                if(checkMate === true) {
                  gameWin();
                  
                }
            }catch(err) {
                console.log(err);
            }
 
        if(game.length === 65) {
                return;
        }
           
        


          
        
        
           
        let imgId = e.target.id;
        let id = (imgId.split(":")[1] === undefined ? imgId : imgId.split(":")[1]);
        id = parseInt(id);
        let btn = document.getElementById(id);
   
        if(btn.classList.contains('colorBlue')) {
            
            let piece = game[id - 2].pieceValue
            if(piece === 5) {
                arrayId.push(id - 2);
            }
            else{
                
                piece = game[id + 1].pieceValue;
            
                if(piece === 5) {
                    arrayId.push(id + 1);
                }
                else{
                    piece = game[id - 1].pieceValue;
                    if(piece === -5) {
                        arrayId.push(id - 1);
                    }
                    else{
                        piece = game[id + 2].pieceValue;
                        if(piece === -5) {
                            arrayId.push(id + 2);
                        }
                    }
                }
            }
            makeAMove(id);
            return;
        }
        if(btn.classList.contains('colorGreen') || btn.classList.contains('colorRed')) {
            makeAMove(id);

 
           dispatch(arrayDecrementActionCreator());
            return;
        }
        else{
            if(checkFlag === true) {
            
                if(checkmate(turn) === 1) {
                   setPlayerWon(1);
                    setCheck(false);
                    setCheckmate(true);
                    gameWin();
                  
                }
                if(checkmate(turn) === 2) {
                   setPlayerWon(2);
                    setCheck(false);
                    setCheckmate(true);
                    gameWin();
                }
            }
        
        
            arrayId = [];
            arrayId.push(imgId);
            arrayId.push(id);
             let payload = {};
             payload = {arrayId : arrayId}
            dispatch(arrayIdActionCreator(payload))
            addStyles();
        
        
    }
        
       
        detectCheckmate(game);
        try{
        if(checkFlag === true) {
            if(checkmate(turn) === 1) {
               setPlayerWon(1);
                gameWin()
               
            }
            if(checkmate(turn) === 2) {
               setPlayerWon(2);
                gameWin();
                
            }
           
        }
    }catch(err) {
        console.log(err);
    }
  
        let xIndex = -1;
        let yIndex = -1;
        for(let j = 0; j <= 63; j++) {
            let btn1 = document.getElementById(j);
            btn1.classList.remove('colorMove');
        }
        btn.classList.add('colorSelect');
       

        for(let j = 0; j < 8; j++) {
            for(let k = 0; k < 8; k++) {
                let player1 = localStorage.getItem('player1');
                let player2 = localStorage.getItem('player2');

                if(board[j][k] === id) {
                    let piece = [];
                
                    piece.push(id);
                    piece.push(game[id]?.pieceValue);
             
                    if(turn === 2 && player2 !== null) {
                
                 if(piece[1] !== 0) {
                       
                        xIndex = j;
                        yIndex = k;
                        if(checkMate === true) {
                            setCheckmate(true);
                            gameWin();
                        
                        }
                       
                      
                            
                        switch(piece[1]) {

                            case -5:
                                let oneUp = id - 8;
                            
                                let oneDown = id + 8;
                            
                                let oneLeft = id - 1;
                            
                                let oneRight = id+ 1;
                                
                                try{
                                    if(checkFlag === false) {
                                        xIndex--;
                                        if(xIndex >= 0) {
                                let pieceUp = game[oneUp]?.pieceValue;                            
                                while((pieceUp === 0 || pieceUp > 0) && xIndex >= 0) {
                                    let btn1 = document.getElementById(oneUp);
                                    if(pieceUp === 0) {

                                        if(detectCheck(piece[0], oneUp) === false) {
                                          btn1.classList.add('colorGreen');
                                        }
                                    }
                                    else if(pieceUp > 0) {
                                        if(detectCheck(piece[0], oneUp) === false) {
                                           btn1.classList.add('colorRed');
                                        }
                                        break;
                                    }
                                    oneUp -= 8;
                                    xIndex--;
                                    if(xIndex < 0) {
                                        break;
                                    }
                                    pieceUp = game[oneUp]?.pieceValue;
                                }
                               }}
                            else{
                                xIndex = j;
                                yIndex = k;
                                if(checkCount <= 1) {
                                xIndex--;
                                if(xIndex >= 0) {
                                    let pieceUp = game[oneUp]?.pieceValue;
                                
                                while(pieceUp === 0 || pieceUp > 0) {
                                    
                                    let btn1 = document.getElementById(oneUp);
                                        if(pieceUp > 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                             btn1.classList.add('colorRed');
                                             btn1.classList.remove('colorCheck')
                                        }
                                        break;
                                    }
                                        else if(pieceUp === 0) {
                                            if(btn1.classList.contains('colorCheck')) {
                                                btn1.classList.add('colorGreen');
                                                btn1.classList.remove('colorCheck');
                                            }
                                        }
                                                                           // break;
                                    
                                    oneUp -= 8;
                                    xIndex--;
                                    if(xIndex < 0) {
                                        break;
                                    }
                                    pieceUp = game[oneUp]?.pieceValue;
                                }
                                }
                            }}
                            
                            }catch(err) {
                                    console.log(err);
                          
                                }
                                xIndex = j;
                                yIndex = k;
                                try{
                                if(checkFlag === false) {
                                xIndex++;
                                if(xIndex <= 7) {
                                let pieceDown = game[oneDown]?.pieceValue;
                                
                                while(pieceDown === 0 || pieceDown > 0) {
                                    let btn1 = document.getElementById(oneDown);
                                    if(pieceDown === 0) {
                                        if(detectCheck(piece[0], oneDown) === false) {
                                        btn1.classList.add('colorGreen');
                                        }
                                    }
                                    else if(pieceDown > 0) {
                                        if(detectCheck(piece[0], oneDown) === false) {
                                            btn1.classList.add('colorRed');
                                        }
                                        break;
                                    }
                                    oneDown += 8;
                                    xIndex++;
                                    if(xIndex > 7) {
                                        break;
                                    }
                                    pieceDown = game[oneDown]?.pieceValue;
                                }
                                }}
                            else{
                                if(checkCount <= 1) {
                                    xIndex++;
                                    if(xIndex <= 7) {

                                let pieceDown = game[oneDown]?.pieceValue;
                             
                                while(pieceDown === 0 || pieceDown > 0) {
                                    let btn1 = document.getElementById(oneDown);
                                        if(pieceDown > 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                        btn1.classList.add('colorRed');
                                        btn1.classList.remove('colorCheck');
                                    }
                                    break;
                                }
                                else if(pieceDown === 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                        btn1.classList.add('colorGreen');
                                        btn1.classList.remove('colorCheck');
                                    }
                                }
                                        //break;
                                    
                                    oneDown += 8;
                                    xIndex++;
                                    if(xIndex > 7) {
                                        break;
                                    }
                                    pieceDown = game[oneDown]?.pieceValue;
                                }
                                  }  }}
                            
                            }catch(err) {
                                    console.log(err);
                                   
                                }
                                xIndex = j;
                                yIndex = k;
                                try{
                                if(checkFlag === false) {
                                    yIndex--;
                                    if(yIndex >= 0) {
                                let pieceLeft = game[oneLeft]?.pieceValue;
                              
                                while(pieceLeft === 0 || pieceLeft > 0) {
                                    let btn1 = document.getElementById(oneLeft);
                                    if(pieceLeft === 0) {
                                        
                                        if(detectCheck(piece[0], oneLeft) === false) {
                                        btn1.classList.add('colorGreen');
                                        }
                                    }
                                    else if(pieceLeft > 0) {
                                        if(detectCheck(piece[0], oneLeft) === false) {
                                            btn1.classList.add('colorRed');
                                        }
                                        break;
                                    }
                                    oneLeft--;
                                    yIndex--;
                                    if(yIndex < 0) {
                                        break;
                                    }
                                    pieceLeft = game[oneLeft]?.pieceValue;
                                }
                               }}
                            else{
                                if(checkCount <= 1) {
                                    yIndex--;
                                    if(yIndex >= 0) {
                                let pieceLeft = game[oneLeft]?.pieceValue;
                              
                                while(pieceLeft === 0 || pieceLeft > 0) {
                                    let btn1 = document.getElementById(oneLeft);
                                        if(pieceLeft > 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                        btn1.classList.add('colorRed');
                                        btn1.classList.remove('colorCheck')
                                    }
                                    break;
                                }
                                else if(pieceLeft === 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                        btn1.classList.add('colorGreen');
                                        btn1.classList.remove('colorCheck');
                                    } 
                                }
                                        //break;
                                    
                                    oneLeft--;
                                    yIndex--;
                                    if(yIndex < 0) {
                                        break;
                                    }
                                    pieceLeft = game[oneLeft]?.pieceValue;
                                }}
                            }}
                            
                            
                            }catch(err) {
                                    console.log(err);
                                  
                                }

                                xIndex = j;
                                yIndex = k;
                                try{
                                    if(checkFlag === false) {
                                        yIndex++;
                                    if(yIndex <= 7) {
                                let pieceRight = game[oneRight]?.pieceValue;
                              
                                while(pieceRight === 0 || pieceRight > 0) {
                                    let btn1 = document.getElementById(oneRight);
                                    if(pieceRight === 0) {
                                        if(detectCheck(piece[0], oneRight) === false) {
                                         btn1.classList.add('colorGreen');
                                        }
                                    }
                                 else if(pieceRight > 0) {
                                    if(detectCheck(piece[0], oneRight) === false) {
                                        btn1.classList.add('colorRed');
                                    }
                                        break;
                                    }
                                    oneRight++;
                                    yIndex++;
                                    if(yIndex > 7) {
                                        break;
                                    }
                                    pieceRight = game[oneRight]?.pieceValue;
                                }
                                      }  }
                                    else{
                                        if(checkCount <= 1) {
                                            yIndex++;
                                            if(yIndex <= 7) {
                                        let pieceRight = game[oneRight]?.pieceValue;
                                     
                                        while(pieceRight === 0 || pieceRight > 0) {
                                        
                                            let btn1 = document.getElementById(oneRight);
                                           
                                                if(pieceRight > 0) {
                                            if(btn1.classList.contains('colorCheck')) {
                                                btn1.classList.add('colorRed');
                                                btn1.classList.remove('colorCheck');
                                            }
                                            break;
                                        }
                                        else if(pieceRight === 0) {
                                            if(btn1.classList.contains('colorCheck')) {
                                                btn1.classList.add('colorGreen');
                                                btn1.classList.remove('colorCheck');
                                            }
                                        }
                                               // break;
                                            oneRight++;
                                            yIndex++;
                                            if(yIndex > 7) {
                                                break;
                                            }
                                            pieceRight = game[oneRight]?.pieceValue;
                                        }
                                    }
                                    
                                     } }}
                                    
                                catch(err) {
                                    console.log(err);
                                }

                            break;

                            case -2:
                                

                                    try{

                                        let twoUpRight = id - 15;
                                        let twoUpLeft = id - 17;
                                        let twoLeftDown = id + 15;
                                        let twoRightDown = id + 17;
                                        xIndex = j;
                                        yIndex = k;
                                         xIndex -= 2;
                                         yIndex += 1;
                                         if(xIndex >= 0 && yIndex <= 7) {   
                                            if(checkFlag === false) {
                                        let pieceUpRight = game[twoUpRight]?.pieceValue;
                                        let btn1 = document.getElementById(twoUpRight);
                                        if(pieceUpRight === 0) {
                                            if(detectCheck(piece[0],twoUpRight) === false) {
                                            btn1.classList.add('colorGreen');
                                            }
                                        }
                                        else if(pieceUpRight > 0) {
                                            if(detectCheck(piece[0], twoUpRight) === false) {
                                            btn1.classList.add('colorRed');
                                            }
                                        }
                                    }
                                    else{
                                        if(checkCount <= 1) {
                                        let pieceUpRight = game[twoUpRight]?.pieceValue;
                                        let btn1 = document.getElementById(twoUpRight);
                                       
                                         if(pieceUpRight > 0) {
                                            if(btn1.classList.contains('colorCheck')) {
                                                btn1.classList.add('colorRed');
                                                btn1.classList.remove('colorCheck');
                                            }
                                        }
                                        else if(pieceUpRight === 0) {
                                            if(btn1.classList.contains('colorCheck')) {
                                                btn1.classList.add('colorGreen');
                                                btn1.classList.remove('colorCheck');
                                            }
                                        }
                                    }
            
                                    }}
            
                                    xIndex = j;
                                    yIndex = k;
                                    xIndex -= 2;
                                    yIndex--;
                                    if(xIndex >= 0 && yIndex >= 0) {
                                        if(checkFlag === false) {
            
                                        let pieceUpLeft = game[twoUpLeft]?.pieceValue;
                                        let btn1 = document.getElementById(twoUpLeft);
                                        if(pieceUpLeft === 0) {
                                            if(detectCheck(piece[0], twoUpLeft) === false) {
                                            btn1.classList.add('colorGreen');
                                            }
                                        }
                                        else if(pieceUpLeft > 0) {
                                            if(detectCheck(piece[0], twoUpLeft) === false) {
                                            btn1.classList.add('colorRed');
                                            }
                                        }
                                    }
                                
            
                                else{
                                    if(checkCount <= 1) {
                                    
                                    let pieceUpLeft = game[twoUpLeft]?.pieceValue;
                                    let btn1 = document.getElementById(twoUpLeft);
                                   
                                 if(pieceUpLeft > 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                        btn1.classList.add('colorRed');
                                        btn1.classList.remove('colorCheck');
                                    }
                                    }
                                    else if(pieceUpLeft === 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                            btn1.classList.add('colorGreen');
                                            btn1.classList.remove('colorCheck');
                                        }
                                    }
                                }
                                   
                                }}
                                    xIndex = j;
                                    yIndex = k;
                                    xIndex += 2;
                                    yIndex--;
                                    if(xIndex <= 7 && yIndex >= 0) {
                                        if(checkFlag === false) {
                                        let pieceDownLeft = game[twoLeftDown]?.pieceValue;
                                        let btn1 = document.getElementById(twoLeftDown);
                                        if(pieceDownLeft === 0) {
                                            if(detectCheck(piece[0], twoLeftDown) === false) {
                                            btn1.classList.add('colorGreen');
                                            }
                                        }
                                        else if(pieceDownLeft > 0) {
                                            if(detectCheck(piece[0], twoLeftDown) === false) {
                                            btn1.classList.add('colorRed');
                                            }
                                        }
                                    }
                                else{
                                    if(checkCount <= 1) {
            
                                        let pieceDownLeft = game[twoLeftDown]?.pieceValue;
                                        let btn1 = document.getElementById(twoLeftDown);
                                        if(pieceDownLeft === 0) {
                                            if(btn1.classList.contains('colorCheck')) {
                                            btn1.classList.add('colorGreen');
                                            btn1.classList.remove('colorCheck');
                                            }
                                        }
                                        else if(pieceDownLeft > 0) {
                                            if(btn1.classList.contains('colorCheck')) {
                                                btn1.classList.add('colorRed');
                                                btn1.classList.remove('colorCheck');
                                            }
                                        }
            
                                }}
                                
                                
                                }
            
                                    xIndex = j;
                                    yIndex = k;
                                    xIndex += 2;
                                    yIndex++;
                                    if(xIndex <= 7 && yIndex <= 7) {
            
                                        if(checkFlag === false) {
                                        let pieceDownRight = game[twoRightDown]?.pieceValue;
                                        let btn1 = document.getElementById(twoRightDown);
                                        if(pieceDownRight === 0) {
                                            if(detectCheck(piece[0],twoRightDown) === false) {
                                            btn1.classList.add('colorGreen');
                                            }
                                        }
                                        else if(pieceDownRight > 0) {
                                            if(detectCheck(piece[0], twoRightDown) === false) {
                                            btn1.classList.add('colorRed');
                                            }
                                        }
                                    }
            
            
                                    else{
                                        if(checkCount <= 1) {
                                        let pieceDownRight = game[twoRightDown]?.pieceValue;
                                        let btn1 = document.getElementById(twoRightDown);
                                       
                                         if(pieceDownRight > 0) {
                                            if(btn1.classList.contains('colorCheck')) {
                                                btn1.classList.add('colorRed');
                                                btn1.classList.remove('colorCheck');
                                            }
                                        }
                                        else if(pieceDownRight === 0) {
                                            if(btn1.classList.contains('colorCheck')) {
                                                btn1.classList.add('colorGreen');
                                                btn1.classList.remove('colorCheck');
                                            }
                                        }
                                    }
                                }}
            
                                    
            
                                    xIndex = j;
                                    yIndex = k;
                                    xIndex--;
                                    yIndex -= 2;
                                    let leftUp = id - 10;
                                    if(xIndex >= 0 && yIndex >= 0) {
                                        if(checkFlag === false) {
                                        let pieceLeftUp = game[leftUp].pieceValue;
                                        let btn1 = document.getElementById(leftUp);
                                        if(pieceLeftUp === 0) {
                                            if(detectCheck(piece[0], leftUp) === false) {
                                            btn1.classList.add('colorGreen');
                                            }
                                        }
                                        else if(pieceLeftUp > 0) {
                                            if(detectCheck(piece[0], leftUp) === false) {
                                            btn1.classList.add('colorRed');
                                            }
                                        }
                                    }
            
                                    else{
                                        if(checkCount <= 1) {
                                        let pieceLeftUp = game[leftUp]?.pieceValue;
                                        let btn1 = document.getElementById(leftUp);
                                       
                                        if(pieceLeftUp > 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                            btn1.classList.add('colorRed');
                                            btn1.classList.remove('colorCheck');
                                        }}
                                        else if(pieceLeftUp === 0) {
                                            if(btn1.classList.contains('colorCheck')) {
                                                btn1.classList.add('colorGreen');
                                                btn1.classList.remove('colorCheck');
                                            }
                                        }
                                    }}
                                }
                                    xIndex = j;
                                    yIndex = k;
                                    xIndex--;
                                    yIndex += 2;
                                    let rightUp = id - 6;
                                    if(xIndex >= 0 && yIndex <= 7) {
                                        if(checkFlag === false) {
                                        let pieceRight = game[rightUp]?.pieceValue;
                                        let btn1 = document.getElementById(rightUp);
                                        if(pieceRight === 0) {
                                            if(detectCheck(piece[0],rightUp) === false) {
                                            btn1.classList.add('colorGreen');
                                            }
                                        }
                                        else if(pieceRight > 0) {
                                            if(detectCheck(piece[0], rightUp) === false) {
                                            btn1.classList.add('colorRed');
                                            }
                                        }
                                    }else {
                                        if(checkCount <= 1) {
                                        let pieceRight = game[rightUp]?.pieceValue;
                                        let btn1 = document.getElementById(rightUp);
                                       
                                         if(pieceRight > 0) {
                                            if(btn1.classList.contains('colorCheck')) {
                                                btn1.classList.add('colorRed');
                                                btn1.classList.remove('colorCheck');
                                            }
                                        }
                                        else if(pieceRight === 0) {
                                            if(btn1.classList.contains('colorCheck')) {
                                                btn1.classList.add('colorGreen');
                                                btn1.classList.remove('colorCheck');
                                            }
                                        }
                                    }
                                    }}
            
                                    xIndex = j;
                                    yIndex = k;
                                    xIndex++;
                                    yIndex -= 2;
                                    let leftTwoDown = id + 6;
                                    if(xIndex <= 7 && yIndex >= 0) {
                                        if(checkFlag === false) {
                                        let pieceLeftTwoDown = game[leftTwoDown]?.pieceValue;
                                        let btn1 = document.getElementById(leftTwoDown);
                                        if(pieceLeftTwoDown === 0) {
                                            if(detectCheck(piece[0], leftTwoDown) === false) {
                                            btn1.classList.add('colorGreen');
                                            }
                                        }
                                        else if(pieceLeftTwoDown > 0) {
                                            if(detectCheck(piece[0], leftTwoDown) === false) {
                                            btn1.classList.add('colorRed');
                                            }
                                        }
                                    }
                                    else{
                                        if(checkCount <= 1) {
                                        let pieceLeftTwoDown = game[leftTwoDown]?.pieceValue;
                                        let btn1 = document.getElementById(leftTwoDown);
                                        
                                         if(pieceLeftTwoDown > 0) {
                                            if(btn1.classList.contains('colorCheck')) {
                                                btn1.classList.add('colorRed');
                                                btn1.classList.remove('colorCheck');
                                            }
                                        }
                                        else if(pieceLeftTwoDown === 0) {
                                            if(btn1.classList.contains('colorCheck')) {
                                                btn1.classList.add('colorGreen');
                                                btn1.classList.remove('colorCheck');
                                            }
                                        }
                                    }}
            
                                    }
            
                                    xIndex = j;
                                    yIndex = k;
                                    xIndex++;
                                    yIndex += 2;
                                    let rightTwoDown = id + 10;
                                    if(xIndex <= 7 && yIndex <= 7) {
                                        if(checkFlag === false) { 
                                        let pieceRightTwoDown = game[rightTwoDown]?.pieceValue;
                                        let btn1 = document.getElementById(rightTwoDown);
                                        if(pieceRightTwoDown === 0) {
                                            if(detectCheck(piece[0], rightTwoDown) === false) {
                                            btn1.classList.add('colorGreen');
                                            }
                                        }
                                        else if(pieceRightTwoDown > 0) {
                                            if(detectCheck(piece[0], rightTwoDown) === false) {
                                            btn1.classList.add('colorRed');
                                            }
                                        }
                                    }
                                    else{
                                        if(checkCount <= 1) {
                                        let pieceRightTwoDown = game[rightTwoDown]?.pieceValue;
                                        let btn1 = document.getElementById(rightTwoDown);
                                        
                                         if(pieceRightTwoDown > 0) {
                                            if(btn1.classList.contains('colorCheck')) {
                                            btn1.classList.add('colorRed');
                                            btn1.classList.remove('colorCheck');
                                            }
                                        }
                                        else if(pieceRightTwoDown === 0) {
                                            if(btn1.classList.contains('colorCheck')) {
                                                btn1.classList.add('colorGreen');
                                                btn1.classList.remove('colorCheck');
                                            }
                                        }
                                    }}
                                }
            
                                }catch(err) {
                                    console.log(err);
                                }
            
            
                                        break;

                            case -10:



                            try{
                                let diagLeftUp = id - 9;
                            
                                xIndex = j;
                                yIndex = k;
                                if(checkFlag === false) {
                                    xIndex--;
                                    yIndex--;
                                    if(xIndex >= 0 && yIndex >= 0) {
                            let pieceLeftUp = game[diagLeftUp]?.pieceValue
                          
                            while(pieceLeftUp === 0 || pieceLeftUp > 0) {
                                  
                                let btnLeftUp = document.getElementById(diagLeftUp);
                                if(pieceLeftUp === 0) {
                                    if(detectCheck(piece[0], diagLeftUp) === false) {
                                    btnLeftUp.classList.add('colorGreen');
                                    }
                                }
                               else if(pieceLeftUp > 0) {
                              if(detectCheck(piece[0], diagLeftUp) === false) {
                                    btnLeftUp.classList.add('colorRed');
                              }
                                    break;
                                }
                                diagLeftUp -= 9;
                                xIndex--;
                                yIndex--;
                                if(xIndex < 0 || yIndex < 0) {
                                    break;
                                }
                                pieceLeftUp = game[diagLeftUp]?.pieceValue
                           } }}else{
                                if(checkCount <= 1) {
                                    xIndex--;
                                    yIndex--;
                                    if(xIndex >= 0 && yIndex >= 0) {
                                let pieceLeftUp = game[diagLeftUp]?.pieceValue
                             
                                while(pieceLeftUp === 0 || pieceLeftUp > 0) {
                                      
                                    let btnLeftUp = document.getElementById(diagLeftUp);
                                   
                                    if(pieceLeftUp > 0) {
                                        if(btnLeftUp.classList.contains('colorCheck')) {
                                        btnLeftUp.classList.add('colorRed');
                                        btnLeftUp.remove('colorCheck');
                                        }
                                        break;
                                    }
                                    else if(pieceLeftUp === 0) {
                                        if(btnLeftUp.classList.contains('colorCheck')) {
                                            btnLeftUp.classList.add('colorGreen');
                                            btnLeftUp.classList.remove('colorCheck');
                                        }
                                    }
                                    diagLeftUp -= 9;
                                    xIndex--;
                                    yIndex--;
                                    if(xIndex < 0 || yIndex < 0) {
                                        break;
                                    }
                                    pieceLeftUp = game[diagLeftUp]?.pieceValue
                                }

                            }
                            }}
                            }
                            catch(err) {
                         
                                console.log(err);
                            }


                            try{

                                xIndex = j;
                                yIndex = k;

                                if(checkFlag === false) {
                          
                            let diagRightUp = id - 7;
                            xIndex--;
                            yIndex++;
                            if(xIndex >= 0 && yIndex <= 7) {
                           
                            let pieceRightUp = game[diagRightUp]?.pieceValue
                          
                            while(pieceRightUp === 0 || pieceRightUp > 0) {
                                let btnRightUp = document.getElementById(diagRightUp);
                                if(pieceRightUp === 0) {
                                    if(detectCheck(piece[0], diagRightUp) === false) {
                                    btnRightUp.classList.add('colorGreen');
                                    }
                                }
                              else  if(pieceRightUp > 0) {
                                if(detectCheck(piece[0], diagRightUp) === false) {
                                    btnRightUp.classList.add('colorRed');
                                }
                                    break;
                                }
                                diagRightUp -= 7;
                                xIndex--;
                                yIndex++;
                                if(xIndex <0 || yIndex > 7) {
                                    break;
                                }
                                pieceRightUp = game[diagRightUp]?.pieceValue
                            }
                                
                            }
                        }
                        else{
                            if(checkCount <= 1) {
                            let diagRightUp = id - 7;
                            xIndex--;
                            yIndex++;
                            if(xIndex >= 0 && yIndex <= 7) {
                           
                            let pieceRightUp = game[diagRightUp]?.pieceValue
                           
                            while(pieceRightUp === 0 || pieceRightUp > 0) {
                                let btnRightUp = document.getElementById(diagRightUp);
                               
                                if(pieceRightUp > 0) {
                            
                                if(btnRightUp.classList.contains('colorCheck')) {
                                    btnRightUp.classList.add('colorRed');
                                    btnRightUp.classList.remove('colorCheck');
                                }
                                break;
                            }
                                else if(pieceRightUp === 0) {
                                    if(btnRightUp.classList.contains('colorCheck')) {
                                        btnRightUp.classList.add('colorGreen');
                                        btnRightUp.classList.remove('colorCheck');
                                    }
                                }
                                
                                
                                diagRightUp -= 7;
                                xIndex--;
                                yIndex++;
                                if(xIndex <0 || yIndex > 7) {
                                    break;
                                }
                                pieceRightUp = game[diagRightUp]?.pieceValue
                            }

                        }
                        }}
                        }

                            catch(err) {
                           
                                console.log(err);
                            }


                            try{
                                xIndex = j;
                                yIndex = k;

                                if(checkFlag === false) {
                                    xIndex++;
                                    yIndex++;
                                if(xIndex <= 7 && yIndex <= 7) {
                         
                            let diagRightDown = id + 9;


                            let pieceRightDown = game[diagRightDown]?.pieceValue
                          
                            while(pieceRightDown === 0 || pieceRightDown > 0) {
                                
                                let btnRightDown = document.getElementById(diagRightDown);
                                if(pieceRightDown === 0) {
                                    if(detectCheck(piece[0], diagRightDown) === false) {
                                    btnRightDown.classList.add('colorGreen');
                                    }
                                }
                             else   if(pieceRightDown > 0) {
                    
                                if(detectCheck(piece[0], diagRightDown) === false ) {
                                    btnRightDown.classList.add('colorRed');
                                }
                                    break;
                                }
                                diagRightDown += 9;
                                xIndex++;
                                yIndex++;
                                if(xIndex > 7 || yIndex > 7) {
                                    break;
                                }
                                pieceRightDown = game[diagRightDown]?.pieceValue
                            }}
                        }
                            


                            else{
                                if(checkCount <= 1) {
                                xIndex++;
                                yIndex++;

                                if(xIndex <= 7 && yIndex <= 7) {
                                let diagRightDown = id + 9;
    
    
                                let pieceRightDown = game[diagRightDown]?.pieceValue
                              
                                while(pieceRightDown === 0 || pieceRightDown > 0) {
                                    
                                    let btnRightDown = document.getElementById(diagRightDown);
                                   
                                    if(pieceRightDown > 0) {
                                    if(btnRightDown.classList.contains('colorCheck')) {
                                        btnRightDown.classList.add('colorRed');
                                        btnRightDown.classList.remove('colorCheck');
                                    }
                                        break;
                                    }

                                    else if(pieceRightDown === 0) {
                                        if(btnRightDown.classList.contains('colorCheck')) {
                                            btnRightDown.classList.add('colorGreen');
                                            btnRightDown.classList.remove('colorCheck');
                                        }
                                    }
                                    diagRightDown += 9;
                                    xIndex++;
                                    yIndex++;
                                    if(xIndex > 7 || yIndex > 7) {
                                        break;
                                    }
                                    pieceRightDown = game[diagRightDown]?.pieceValue


                            }
                            }}}
                        }
                            catch(err) {
                              console.log(err);
                            }


                            try{

                                xIndex = j;
                                yIndex = k;
                            if(checkFlag === false) {
                                xIndex++;
                                yIndex--;
                                if(xIndex <= 7 && yIndex >= 0) {


                            let diagLeftDown = id + 7;

                            let pieceLeftDown= game[diagLeftDown]?.pieceValue
                         
                            while(pieceLeftDown === 0 || pieceLeftDown > 0) {
                            
                                let btnLeftDown = document.getElementById(diagLeftDown);
                                if(pieceLeftDown === 0) {
                                    if(detectCheck(piece[0], diagLeftDown) === false) {
                                    btnLeftDown.classList.add('colorGreen');
                                    }
                                }
                             else   if(pieceLeftDown > 0) {
                                    if(detectCheck(piece[0], diagLeftDown) === false) {
                                    btnLeftDown.classList.add('colorRed');
                                    }
                                    break;
                                }
                                diagLeftDown += 7;
                                xIndex++;
                                yIndex--;
                                if(xIndex > 7 || yIndex < 0) {
                                    break;
                                }
                                pieceLeftDown= game[diagLeftDown]?.pieceValue




                                  }  }}

                            else{
                                if(checkCount <= 1) {
                                xIndex = j;
                                yIndex = k;
                                xIndex++;
                                yIndex--;
                                if(xIndex <= 7 && yIndex >= 0) {
    
                                let diagLeftDown = id + 7;
    
                                let pieceLeftDown= game[diagLeftDown]?.pieceValue
                              
                                while(pieceLeftDown === 0 || pieceLeftDown > 0) {
                                
                                    let btnLeftDown = document.getElementById(diagLeftDown);
                                   
                                    if(pieceLeftDown > 0) {
                                    if(btnLeftDown.classList.contains('colorCheck')) {
                                        btnLeftDown.classList.add('colorRed');
                                        btnLeftDown.classList.remove('colorCheck');
                                    }
                                        break;
                                    }
                                    else if(pieceLeftDown === 0) {
                                        if(btnLeftDown.classList.contains('colorCheck')) {
                                            btnLeftDown.classList.add('colorGreen');
                                            btnLeftDown.classList.remove('colorCheck');
                                        }
                                    } 
                                    diagLeftDown += 7;
                                    xIndex++;
                                    yIndex--;
                                    if(xIndex > 7 || yIndex < 0) {
                                        break;
                                    }
                                    pieceLeftDown= game[diagLeftDown]?.pieceValue
    
    
    
    
                                }}}

                            }
                            }
                            catch(err) {
                                console.log(err);
                               
                            }

                           
                            try{
                                xIndex = j;
                                yIndex = k;

                                if(checkFlag === false) {
                              let  oneUp = id - 8;
                              xIndex--;
                              if(xIndex >= 0) {
                             
                            let pieceUp = game[oneUp]?.pieceValue;
                         
                            while(pieceUp === 0 || pieceUp > 0) {
                              
                               
                                let btn1 = document.getElementById(oneUp);
                                if(pieceUp === 0) {
                                    if(detectCheck(piece[0], oneUp) === false) {
                                    btn1.classList.add('colorGreen');
                                }
                                }
                                else if(pieceUp > 0) {
                                    if(detectCheck(piece[0], oneUp) === false) {
                                    btn1.classList.add('colorRed');
                                    }
                                    break;
                                }
                                oneUp -= 8;
                                xIndex--;
                                if(xIndex < 0) {
                                    break;
                                }
                                pieceUp = game[oneUp]?.pieceValue;
                            }
                               } }
                            else{
                                if(checkCount <= 1) {
                                    xIndex--;
                                    if(xIndex >= 0) {
                                let  oneUp = id - 8;
                             
                                let pieceUp = game[oneUp]?.pieceValue;
                            
                                while(pieceUp === 0 || pieceUp > 0) {
                                   
                                   
                                    let btn1 = document.getElementById(oneUp);
                                  
                                     if(pieceUp > 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                        btn1.classList.add('colorRed');
                                        btn1.classList.remove('colorCheck');
                                        }
                                        break;
                                    }
                                    else if(pieceUp === 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                            btn1.classList.add('colorGreen');
                                            btn1.classList.remove('colorCheck');
                                        }
                                    }
                                    oneUp -= 8;
                                    xIndex--;
                                    if(xIndex < 0) {
                                        break;
                                    }
                                    pieceUp = game[oneUp]?.pieceValue;
                                }}
                            }}


                            }catch(err) {
                                console.log(err);
                                
                            }
                            xIndex = j;
                            yIndex = k;
                            try{

                                if(checkFlag === false) {
                                let   oneDown = id + 8;
                                xIndex++;
                                if(xIndex <= 7) {
                            let pieceDown = game[oneDown]?.pieceValue;
                         
                            while(pieceDown === 0 || pieceDown > 0) {
                                
                                let btn1 = document.getElementById(oneDown);
                                if(pieceDown === 0) {
                                    if(detectCheck(piece[0], oneDown) === false) {
                                    btn1.classList.add('colorGreen');
                                    }
                                }
                                else if(pieceDown > 0) {
                                    btn1.classList.add('colorRed');
                                    break;
                                }
                                oneDown += 8;
                                xIndex++;
                                if(xIndex > 7) {
                                    break;
                                }
                                pieceDown = game[oneDown]?.pieceValue;
                            }}}

                            else{
                                if(checkCount <= 1) {
                                    xIndex++;
                                    if(xIndex <= 7) {
                                let   oneDown = id + 8;
                            
                                let pieceDown = game[oneDown]?.pieceValue;
                               
                                while(pieceDown === 0 || pieceDown > 0) {
                                   
                                    let btn1 = document.getElementById(oneDown);
                                  
                                     if(pieceDown > 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                        btn1.classList.add('colorRed');
                                        btn1.classList.remove('colorCheck');
                                        }
                                        break;
                                    }
                                    else if(pieceDown === 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                            btn1.classList.add('colorGreen') 
                                                btn1.classList.remove('colorCheck');
                                            
                                        }
                                    }
                                    oneDown += 8;
                                    xIndex++;
                                    if(xIndex > 7) {
                                        break;
                                    }
                                    pieceDown = game[oneDown]?.pieceValue;
                                }
                            }}}
                            }catch(err) {
                                console.log(err);
                                
                            }
                            xIndex = j;
                            yIndex = k;
                            try{

                                if(checkFlag === false) {
                                    yIndex--;
                                    if(yIndex >= 0) {
                                    
                                let   oneLeft = id - 1;
                              
                            let pieceLeft = game[oneLeft]?.pieceValue;
                            
                            while(pieceLeft === 0 || pieceLeft > 0) {
                               
                                let btn1 = document.getElementById(oneLeft);
                                if(pieceLeft === 0) {
                                    if(detectCheck(piece[0], oneLeft) === false) {
                                    btn1.classList.add('colorGreen');
                                    }
                                }
                                else if(pieceLeft > 0) {
                                    if(detectCheck(piece[0], oneLeft) === false) {
                                    btn1.classList.add('colorRed');
                                    }
                                    break;
                                }
                                oneLeft--;
                                yIndex--;
                                if(yIndex < 0) {
                                    break;
                                }
                                pieceLeft = game[oneLeft]?.pieceValue;
                            }}}

                            else {
                                if(checkCount <= 1) {
                                    yIndex--;
                                    if(yIndex >= 0) {
                                let   oneLeft = id - 1;
                              
                                let pieceLeft = game[oneLeft]?.pieceValue;
                                yIndex--;
                                while(pieceLeft === 0 || pieceLeft > 0) {
                                    
                                    let btn1 = document.getElementById(oneLeft);
                                  
                                     if(pieceLeft > 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                        btn1.classList.add('colorRed');
                                        btn1.classList.remove('colorCheck');
                                        }
                                        break;
                                    }
                                    else if(pieceLeft === 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                            btn1.classList.add('colorGreen');
                                            btn1.classList.remove('colorCheck');
                                        }
                                    }
                                    oneLeft--;
                                    yIndex--;
                                    if(yIndex < 0) {
                                        break;
                                    }
                                    pieceLeft = game[oneLeft]?.pieceValue;
                                }}}
                            }
                            }catch(err) {
                                console.log(err);
                            
                            }

                            xIndex = j;
                            yIndex = k;
                            try{
                                if(checkFlag === false) {
                                    yIndex++;
                                    if(yIndex <= 7) {
                                let  oneRight = id + 1;
                            let pieceRight = game[oneRight]?.pieceValue;
                           
                            while(pieceRight === 0 || pieceRight > 0) {
                                
                                let btn1 = document.getElementById(oneRight);
                                if(pieceRight === 0) {
                                    if(detectCheck(piece[0], oneRight) === false) {
                                    btn1.classList.add('colorGreen');
                                    }
                                }
                              else  if(pieceRight > 0) {
                                if(detectCheck(piece[0], oneRight) === false) {
                                    btn1.classList.add('colorRed');
                                }
                                    break;
                                }
                                oneRight++;
                                yIndex++;
                                if(yIndex > 7) {
                                    break;
                                }
                                pieceRight = game[oneRight]?.pieceValue;
                            }}
                        }

                            else{
                                xIndex = j;
                                yIndex = k;
                                if(checkCount <= 1) {
                                    yIndex++;
                                    if(yIndex <= 7) {
                                let  oneRight = id + 1;
                                let pieceRight = game[oneRight]?.pieceValue;
                                let btn1 = document.getElementById(oneRight);
                             
                                while(pieceRight === 0 || pieceRight > 0) {
                                     btn1 = document.getElementById(oneRight);
                                   
                                    if(pieceRight > 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                        btn1.classList.add('colorRed');
                                        btn1.classList.remove('colorCheck');
                                        }
                                         break;
                                    }
                                        else if(pieceRight === 0) {
                                            if(btn1.classList.contains('colorCheck')) {
                                                btn1.classList.add('colorGreen');
                                                btn1.classList.remove('colorCheck');
                                            }
                                        }
                                       
                                    
                                    
                                    oneRight++;
                                    yIndex++;
                                    if(yIndex > 7) {
                                        break;
                                    }
                                    pieceRight = game[oneRight]?.pieceValue;
                                }
                            }}}
                            }
                            catch(err) {
                                console.log(err);
                                
                            }


                            

                            break;


                            case -3:

                            try{
                                xIndex = j;
                                yIndex = k;
                                if(checkFlag === false) {
                                  
                                    xIndex--;
                                    yIndex--;
                                    if(xIndex >= 0 && yIndex >= 0) {
                            let diagLeftUp = id - 9;
                        
                          let   pieceLeftUp = game[diagLeftUp]?.pieceValue
                            while(pieceLeftUp === 0 || pieceLeftUp > 0) {
                                   
                                let btnLeftUp = document.getElementById(diagLeftUp);
                                if(pieceLeftUp === 0) {
                                    if(detectCheck(piece[0], diagLeftUp) === false) {
                                    btnLeftUp.classList.add('colorGreen');
                                    }
                                }
                               else if(pieceLeftUp > 0) {
                              if(detectCheck(piece[0], diagLeftUp) === false) {
                                    btnLeftUp.classList.add('colorRed');
                              }
                                    break;
                                }
                                diagLeftUp -= 9;
                                xIndex--;
                                yIndex--;
                                if(xIndex < 0 || yIndex < 0) {
                                    break;
                                }
                                pieceLeftUp = game[diagLeftUp]?.pieceValue
                            }}}

                            else{
                                if(checkCount <= 1) {
                                let diagLeftUp = id - 9;
                                xIndex = j;
                                yIndex = k;
                                xIndex--;
                                yIndex--;
                                if(xIndex >= 0 && yIndex >= 0) {
                        
                                let   pieceLeftUp = game[diagLeftUp]?.pieceValue
                            
                                  while(pieceLeftUp === 0 || pieceLeftUp > 0) {
                                         
                                      let btnLeftUp = document.getElementById(diagLeftUp);
                                     
                                      if(pieceLeftUp > 0) {
                                      if(btnLeftUp.classList.contains('colorCheck')) {
                                          btnLeftUp.classList.add('colorRed');
                                          btnLeftUp.classList.remove('colorCheck');
                                      }

                                          break;
                                      }
                                      else if(pieceLeftUp === 0) {
                                        if(btnLeftUp.classList.contains('colorCheck')) {
                                            btnLeftUp.classList.add('colorGreen');
                                            btnLeftUp.classList.remove('colorCheck');
                                        }
                                      }
                                      diagLeftUp -= 9;
                                      xIndex--;
                                      yIndex--;
                                      if(xIndex < 0 || yIndex < 0) {
                                          break;
                                      }
                                      pieceLeftUp = game[diagLeftUp]?.pieceValue
                                    }      
                            }}
                            }}
                            catch(err) {
                                console.log(err);
                               
                            }

                            try{
                                xIndex = j;
                                yIndex = k;
                                if(checkFlag === false) {
                                    let   diagRightUp = id - 7; 
                                    xIndex--;
                                    yIndex++;
                            if(xIndex >= 0 && yIndex <= 7) {
                           let  pieceRightUp = game[diagRightUp]?.pieceValue
                            while(pieceRightUp === 0 || pieceRightUp > 0) {
                                
                                let btnRightUp = document.getElementById(diagRightUp);
                                if(pieceRightUp === 0) {
                                    if(detectCheck(piece[0], diagRightUp) === false) {
                                    btnRightUp.classList.add('colorGreen');
                                    }
                                }
                              else  if(pieceRightUp > 0) {
                                if(detectCheck(piece[0], diagRightUp) === false) {
                                    btnRightUp.classList.add('colorRed');
                                }
                                    break;
                                }
                                diagRightUp -= 7;
                                xIndex--;
                                yIndex++;
                                if(xIndex <0 || yIndex > 7) {
                                    break;
                                }
                                pieceRightUp = game[diagRightUp]?.pieceValue
                            }
                                
                            }}
                        else{
                            if(checkCount <= 1) {
                            let   diagRightUp = id - 7;
                               
                            xIndex--;
                            yIndex++;
                            if(xIndex >= 0 && yIndex <= 7) {
                           let  pieceRightUp = game[diagRightUp]?.pieceValue;
                            while(pieceRightUp === 0 || pieceRightUp > 0) {
                             
                                let btnRightUp = document.getElementById(diagRightUp);
                              
                               if(pieceRightUp > 0) {
                                if(btnRightUp.classList.contains('colorCheck')) {
                                    btnRightUp.classList.add('colorRed');
                                    btnRightUp.classList.remove('colorCheck');
                                }
                                    break;
                                }
                                else if(pieceRightUp === 0) {
                                    if(btnRightUp.classList.contains('colorCheck')) {
                                        btnRightUp.classList.add('colorGreen');
                                        btnRightUp.classList.remove('colorCheck');
                                    }
                                }
                                diagRightUp -= 7;
                                xIndex--;
                                yIndex++;
                                if(xIndex <0 || yIndex > 7) {
                                    break;
                                }
                                pieceRightUp = game[diagRightUp]?.pieceValue
                            }
                        }}}
                        
                        }

                            catch(err) {
                                console.log(err);
                            }

                            try{
                                xIndex = j;
                                yIndex = k;
                                if(checkFlag === false) {
                               
                                let   diagRightDown = id + 9;
                          
                            xIndex++;
                            yIndex++;
                            if(xIndex <= 7 && yIndex <= 7) {


                          let   pieceRightDown = game[diagRightDown]?.pieceValue;
                            while(pieceRightDown === 0 || pieceRightDown > 0) {
                                
                                   
                                let btnRightDown = document.getElementById(diagRightDown);
                                if(pieceRightDown === 0) {
                                    if(detectCheck(piece[0], diagRightDown) === false) {
                                    btnRightDown.classList.add('colorGreen');
                                    }
                                }
                             else if(pieceRightDown > 0) {
                                if(detectCheck(piece[0], diagRightDown) === false) {
                                    btnRightDown.classList.add('colorRed');
                                }
                                    break;
                                }
                                diagRightDown += 9;
                                xIndex++;
                                yIndex++;
                                if(xIndex > 7 || yIndex > 7) {
                                    break;
                                }
                                pieceRightDown = game[diagRightDown]?.pieceValue
                            }}}


                            else{
                                if(checkCount <= 1) {
      
                                let   diagRightDown = id + 9;
                          
                            xIndex++;
                            yIndex++;
                            if(xIndex <= 7 && yIndex <= 7) {


                          let   pieceRightDown = game[diagRightDown]?.pieceValue;
                            while(pieceRightDown === 0 || pieceRightDown > 0) {
                                
                                  
                                let btnRightDown = document.getElementById(diagRightDown);
                              
                               if(pieceRightDown > 0) {
                               
                                if(btnRightDown.classList.contains('colorCheck')) {
                                    btnRightDown.classList.add('colorRed');
                                    btnRightDown.classList.remove('colorCheck');
                                }
                               
                                    break;
                                }
                                else if(pieceRightDown === 0) {
                                    if(btnRightDown.classList.contains('colorCheck')) {
                                        btnRightDown.classList.add('colorGreen');
                                        btnRightDown.classList.remove('colorCheck');
                                   }
                                }
                                diagRightDown += 9;
                                xIndex++;
                                yIndex++;
                                if(xIndex > 7 || yIndex > 7) {
                                    break;
                                }
                                pieceRightDown = game[diagRightDown]?.pieceValue
                            }

                            }}}
                            }
                            catch(err) {
                                console.log(err);
                               
                            }



                            try{
                                xIndex = j;
                                yIndex = k;
                                if(checkFlag === false) {
                            let   diagLeftDown = id + 7;
                           
                            xIndex++;
                            yIndex--;
                            if(xIndex <= 7 && yIndex >= 0) {



                         let    pieceLeftDown= game[diagLeftDown]?.pieceValue
                            while(pieceLeftDown === 0 || pieceLeftDown > 0) {
                                   
                                let btnLeftDown = document.getElementById(diagLeftDown);
                                if(pieceLeftDown === 0) {
                                    if(detectCheck(piece[0], diagLeftDown) === false) {
                                    btnLeftDown.classList.add('colorGreen');
                                    }
                                }
                             else   if(pieceLeftDown > 0) {
                               
                                if(detectCheck(piece[0], diagLeftDown) === false) {
                                    btnLeftDown.classList.add('colorRed');
                                }
                                    break;
                                }
                                diagLeftDown += 7;
                                xIndex++;
                                yIndex--;
                                if(xIndex > 7 || yIndex < 0) {
                                    break;
                                }
                                pieceLeftDown= game[diagLeftDown]?.pieceValue




                            }}}

                            else{
                                if(checkCount <= 1) {
                                let   diagLeftDown = id + 7;
                              
                                xIndex++;
                                yIndex--;
                                if(xIndex <= 7 && yIndex >= 0) {
    
    
    
                             let    pieceLeftDown= game[diagLeftDown]?.pieceValue;
                                while(pieceLeftDown === 0 || pieceLeftDown > 0) {
                                      
                                    let btnLeftDown = document.getElementById(diagLeftDown);
                                   
                                    if(pieceLeftDown > 0) {
                                   
                                    if(btnLeftDown.classList.contains('colorCheck')) {
                                        btnLeftDown.classList.add('colorRed');
                                        btnLeftDown.classList.remove('colorCheck');
                                    }
                                        break;
                                    }
                                    else if(pieceLeftDown === 0) {
                                        if(btnLeftDown.classList.contains('colorCheck')) {
                                            btnLeftDown.classList.add('colorGreen');
                                            btnLeftDown.classList.remove('colorCheck');
                                        }
                                    }
                                    diagLeftDown += 7;
                                    xIndex++;
                                    yIndex--;
                                    if(xIndex > 7 || yIndex < 0) {
                                        break;
                                    }
                                    pieceLeftDown= game[diagLeftDown]?.pieceValue
    
    
    
                                }
                                }
                            }
                            }}
                            catch(err) {
                                console.log(err);
                             
                            }



                            break;

                            case -6:


                            try{
                                id = board[j][k];
                                let oneLeft = id - 1;
                                let twoLeft = id - 2;
                                let z = yIndex;
                                let idIndex = id;

                                if(checkData.castlingBlackLeft === true) {
                                while(z >= 0) {
                                    z--;
                                    idIndex--;
                                    let piece = game[idIndex].pieceValue;
                               
                                    
                                    if(z === 0) {
                                        let rookpiece = game[idIndex].pieceValue
                                        if(rookpiece === -5) {
                                            if(detectCheck(id, oneLeft) === false && detectCheck(id, twoLeft) === false) {
                                            let btn1 = document.getElementById(oneLeft);
                                            let btn2 = document.getElementById(twoLeft);
                                            
                                            btn1.classList.add('colorBlue');
                                            btn2.classList.add('colorBlue');
                                            }
                                            break;
                                        }
                                        else{
                                            break;
                                        }
                                    }
                                    else if(piece !== 0) {
                                        break;
                                    }
                                }}
                                
                                
                            }
                            catch(err) {
                                console.log(err);
                            }

                            try{
                                id = board[j][k];
                                yIndex = k;
                                let oneRight = id + 1;
                                let twoRight = id + 2;
                                let z = yIndex;
                                let idIndex = id;
                                if(checkData.castlingBlackRight === true) {
                                while(z <= 7) {
                                    z++;
                                    idIndex++;
                                    let piece = game[idIndex].pieceValue;
                              
                                    
                                    if(z === 7) {
                                        let rookpiece = game[idIndex].pieceValue
                                        if(rookpiece === -5) {
                                            if(detectCheck(id, oneRight) === false && detectCheck(id, twoRight) === false) {
                                            let btn1 = document.getElementById(oneRight);
                                            let btn2 = document.getElementById(twoRight);
                                            btn1.classList.add('colorBlue');
                                            btn2.classList.add('colorBlue');
                                            }
                                            break;
                                        }
                                        else{
                                            break;
                                        }
                                    }
                                    else if(piece !== 0) {
                                        break;
                                    }
                                }}

                            }
                            catch(err) {
                                console.log(err);
                            }



                                
                            let leftIndex = id - 1;
                            let rightIndex = id + 1;
                            let upIndex = id - 8;
                            let downIndex = id + 8;
                            let leftUpIndex = id - 9;
                           
                            try{
                                let leftX = j;
                                let leftY = k - 1;
                                if(leftY >= 0 && leftX >= 0) {
                                    let btn1 = document.getElementById(leftIndex);
                                    let piece1 = game[leftIndex].pieceValue;
                                    if(checkFlag === false) {
                                        if(piece1 === 0 || piece1 > 0) {
                                          
                                            if(piece1 === 0) {
                                                if( pieceBackedUp(leftIndex, leftX, leftY, 0) === false ) {
                                                btn1.classList.add('colorGreen');
                                            }
                                        }
                                            else{
                                                if(pieceBackedUp(leftIndex, leftX, leftY, 0) === false) {
                                                     btn1.classList.add('colorRed');
                                                }
                                            }
                                        }
                                    }
                                    else{
                                        if(piece1 > 0) {
                                            if(btn1.classList.contains('colorCheck') && pieceBackedUp(leftIndex, leftX, leftY, 0) === false) {
                                                btn1.classList.add('colorRed');
                                                btn1.classList.remove('colorCheck');
                                            }
                                            else{
                                                if(pieceBackedUp(leftIndex, leftX, leftY, 0) === false) {
                                                    btn1.classList.add('colorRed')
                                                }
                                            }
                                        }
                                        else{
                                            if(btn1.classList.contains('colorCheck')) {
                                                
                                            }
                                            else if(piece1 === 0 && pieceBackedUp(leftIndex, leftX, leftY, 0) === false  && detectCheck(id, leftIndex) === false){
                                                btn1.classList.add('colorGreen');
                                            }
                                        }
                                    }
                                } 
                            }catch(err) {
                                console.log(err);
                            } 
                            
                            
                            try{
                                let rightX = j;
                                let rightY = k + 1;
                                if(rightY <= 7 && rightX <= 7) {
                                    let btn1 = document.getElementById(rightIndex);
                                    let piece1 = game[rightIndex].pieceValue;
                                    if(checkFlag === false) {
                                        if(piece1 === 0 || piece1 > 0) {
                                          
                                            if(piece1 === 0) {
                                                if( pieceBackedUp(rightIndex, rightX, rightY, 0) === false ) {
                                                btn1.classList.add('colorGreen');
                                                }
                                            }
                                            else{
                                                if(pieceBackedUp(rightIndex, rightX, rightY, 0) === false) {
                                                     btn1.classList.add('colorRed');
                                                }
                                            }
                                        }
                                    }
                                    else{
                                        if(piece1 > 0) {
                                            if(btn1.classList.contains('colorCheck') && pieceBackedUp(rightIndex, rightX, rightY, 0) === false) {
                                                btn1.classList.add('colorRed');
                                                btn1.classList.remove('colorCheck')
                                            }
                                            else{
                                                if(pieceBackedUp(rightIndex, rightX, rightX, 0) === false) {
                                                    btn1.classList.add('colorRed')
                                                }
                                            }
                                        }
                                        else{
                                            if(btn1.classList.contains('colorCheck')) {
                                                
                                            }
                                            else if(piece1 === 0  && pieceBackedUp(rightIndex, rightX, rightY, 0) === false  && detectCheck(id, rightIndex) === false){
                                                btn1.classList.add('colorGreen');
                                            }
                                        }
                                    }
                                }
                            }
                            catch(err) {
                                console.log(err);
                            }


                            try{
                                let upX = j - 1;
                                let upY = k;
                                if(upY >= 0 && upX >= 0) {
                                    let btn1 = document.getElementById(upIndex);
                                    let piece1 = game[upIndex].pieceValue;
                                    if(checkFlag === false) {
                                        if(piece1 === 0 || piece1 > 0) {
                                          
                                            if(piece1 === 0) {
                                                if(detectCheck(id, upIndex) === false && pieceBackedUp(upIndex, upX, upY, 0) === false  ) {
                                                btn1.classList.add('colorGreen');
                                                }
                                            }
                                            else{
                                                if(pieceBackedUp(upIndex, upX, upY, 0) === false) {
                                                    btn1.classList.add('colorRed');
                                                }
                                            }
                                        }
                                    }
                                    else{
                                        if(piece1 > 0) {
                                            if(btn1.classList.contains('colorCheck') && pieceBackedUp(upIndex, upX, upY, 0) === false) {
                                                btn1.classList.add('colorRed');
                                                btn1.classList.remove('colorCheck');
                                            }
                                            else if(pieceBackedUp(upIndex, upX, upY, 0) === false) {
                                                btn1.classList.add('colorRed');

                                            }
                                        }
                                        else{
                                            if(btn1.classList.contains('colorCheck')) {
                                                
                                            }
                                            else if(piece1 === 0  && pieceBackedUp(upIndex, upX, upY, 0) === false  && detectCheck(id, upIndex) === false){
                                                btn1.classList.add('colorGreen');
                                            }
                                        }
                                    }
                                }
                            }
                            catch(err) {
                                console.log(err);
                            }


                            try{
                                let downX = j + 1;
                                let downY = k;
                                if(downY <= 7 && downX <= 7) {
                                    let btn1 = document.getElementById(downIndex);
                                    let piece1 = game[downIndex].pieceValue;
                                    if(checkFlag === false) {
                                        if(piece1 === 0 || piece1 > 0) {
                                          
                                            if(piece1 === 0) {
                                                if( pieceBackedUp(downIndex, downX, downY, 0) === false ) {    
                                                btn1.classList.add('colorGreen');
                                                }
                                            }
                                            else{
                                                if(pieceBackedUp(downIndex, downX, downY, 0) === false) {    
                                                    btn1.classList.add('colorRed');
                                                }
                                            }
                                        }
                                    }
                                    else{
                                        if(piece1 > 0) {
                                            if(btn1.classList.contains('colorCheck') && pieceBackedUp(downIndex, downX, downY, 0) === false) {
                                                btn1.classList.add('colorRed');
                                                btn1.classList.remove('colorCheck');
                                            }
                                            
                                            else if(pieceBackedUp(downIndex, downX, downY, 0) === false) {
                                                btn1.classList.add('colorRed');
                                                
                                            }
                                        }
                                        else{
                                            if(btn1.classList.contains('colorCheck')) {
                                                
                                            }
                                            else if(piece1 === 0  && pieceBackedUp(downIndex, downX, downY, 0) === false  && detectCheck(id, downIndex) === false){
                                                btn1.classList.add('colorGreen');
                                            }
                                        }
                                    }
                                }
                            }
                            catch(err) {
                                console.log(err);
                            }


                            try{
                                let leftUpX = j - 1;
                                let leftUpY = k - 1;
                                if(leftUpX >= 0 && leftUpY >= 0) {
                                    let btn1 = document.getElementById(leftUpIndex);
                                    let piece1 = game[leftUpIndex].pieceValue;
                                    if(checkFlag === false) {
                                        if(piece1 === 0 || piece1 > 0) {
                                          
                                            if(piece1 === 0) {
                                                if( pieceBackedUp(leftUpIndex, leftUpX, leftUpY, 0) === false ) {
                                                btn1.classList.add('colorGreen');
                                                }
                                            }
                                            else{
                                                if(pieceBackedUp(leftUpIndex, leftUpX, leftUpY, 0) === false) {
                                                    btn1.classList.add('colorRed');
                                                }
                                            }
                                        }
                                    }
                                    else{
                                        if(piece1 > 0) {
                                    
                                            if(btn1.classList.contains('colorCheck') && pieceBackedUp(leftUpIndex, leftUpX, leftUpY, 0) === false) {
                                                btn1.classList.add('colorRed');
                                                btn1.classList.remove('colorCheck');
                                            }
                                            else{
                                                if(pieceBackedUp(leftUpIndex,leftUpX, leftUpY, 0) === false){
                                                btn1.classList.add('colorRed');
                                                }
                                            }
                                        }
                                        else{
                                        
                                             if(piece1 === 0 && pieceBackedUp(leftUpIndex, leftUpX, leftUpY, 0) === false  && detectCheck(id, leftUpIndex) === false){
                                                btn1.classList.add('colorGreen')
                                            }
                                        }
                                    }
                                }
                            }
                            catch(err) {
                                console.log(err);
                            }

                            let rightUpIndex = id - 7;
                            try{
                                
                                let rightUpX = j - 1;
                                let rightUpY = k + 1;
                                if(rightUpX >= 0 && rightUpY <= 7) {
                            
                                    let piece1 = game[rightUpIndex].pieceValue;
                                    let btn1 = document.getElementById(rightUpIndex);
                                    if(checkFlag === false){
                                    if(piece1 === 0) {
                                        if( pieceBackedUp(rightUpIndex, rightUpX, rightUpY, 0) === false  ) {
                                        btn1.classList.add('colorGreen');
                                        }
                                    }
                                    else if(piece1 > 0) {
                                        if(pieceBackedUp(rightUpIndex, rightUpX, rightUpY, 0) === false) {
                                        btn1.classList.add('colorRed');
                                        }
                                        
                                        else if(pieceBackedUp(rightUpIndex, rightUpX, rightUpY, 0) === false) {
                                            btn1.classList.add('colorRed');
                                            
                                        }
                                        
                                    }

                                }
                                else {
                                    if(piece1 > 0) {
                                        if(btn1.classList.contains('colorCheck') && pieceBackedUp(rightUpIndex, rightUpX, rightUpY, 0) === false) {
                                            btn1.classList.add('colorRed');
                                            btn1.classList.remove('colorCheck');
                                        }
                                        else{
                                            if(pieceBackedUp(rightUpIndex,rightUpX, rightUpY, 0) === false ){
                                            btn1.classList.add('colorRed');
                                            }
                                        }
                                    }
                                    else{
                                    
                                         if(piece1 === 0 && pieceBackedUp(rightUpIndex, rightUpX, rightUpY, 0) === false  && detectCheck(id, rightUpIndex) === false){
                                            btn1.classList.add('colorGreen')
                                        }
                                    }
                                }
                                }
                            }
                            catch(err) {
                                console.log(err);
                            }

                          
                            try{
                                let leftDownIndex = id + 7;
                                let leftDownX = j + 1;
                                let leftDownY = k - 1;
                                if(leftDownX <= 7 && leftDownY >= 0) {
                                    let piece1 = game[leftDownIndex].pieceValue;
                                    let btn1 = document.getElementById(leftDownIndex);
                                    if(checkFlag === false) {
                                        if(piece1 > 0 && pieceBackedUp(leftDownIndex, leftDownX, leftDownY, 0) === false) {
                                            btn1.classList.add('colorRed');
                                        }
                                        if(piece1 === 0 && pieceBackedUp(leftDownIndex, leftDownX, leftDownY, 0) === false  ) {
                                            btn1.classList.add('colorGreen');
                                        }
                                    }
                                    else{
                                        if(piece1 > 0) {
                                            if(btn1.classList.contains('colorCheck') && pieceBackedUp(leftDownIndex, leftDownX, leftDownY, 0) === false) {
                                                btn1.classList.add('colorRed');
                                                btn1.classList.remove('colorCheck');
                                            }
                                            else{
                                                if(pieceBackedUp(leftDownIndex, leftDownX, leftDownY, 0) === false) {
                                                    btn1.classList.add('colorRed');
                                                }
                                            }
                                        }
                                        else{
                                            if(piece1 === 0  && pieceBackedUp(leftDownIndex, leftDownX, leftDownY, 0) === false  && detectCheck(id, leftDownIndex) === false) {
                                                btn1.classList.add('colorGreen');
                                            }
                                        }
                                    }
                                }
                            }
                            catch(err) {
                                console.log(err);
                            }

                            try{
                                let rightDownIndex = id + 9;
                                let rightDownX = j + 1;
                                let rightDownY = k + 1;
                                if(rightDownX <= 7 && rightDownY <= 7) {
                                    let piece1 = game[rightDownIndex].pieceValue;
                                    let btn1 = document.getElementById(rightDownIndex);
                                    if(checkFlag === false) {
                                        if(piece1 > 0) {
                                            if(pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 0) === false) {
                                                btn1.classList.add('colorRed');
                                            }
                                        }
                                        else if(piece1 === 0 && pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 0) === false ) {
                                            btn1.classList.add('colorGreen');
                                        }
                                    }
                                    else{
                                        if(piece1 > 0) {
                                            if(btn1.classList.contains('colorCheck') && pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 0) === false) {
                                                btn1.classList.add('colorRed');
                                                btn1.classList.remove('colorCheck');
                                            }
                                            else{
                                                if(pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 0) === false) {
                                                    btn1.classList.add('colorRed');
                                                }
                                            }
                                        }
                                        else{
                                            if(piece1 === 0 && pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 0) === false  && detectCheck(id, rightDownIndex) === false) {
                                                btn1.classList.add('colorGreen');
                                            }
                                        }
                                    }
                                }

                            }
                            catch(err) {
                                console.log(err);
                            }


                        break;



                            case -1:
                                
                            try{
                                xIndex = j;
                                yIndex = k;
                                id = board[j][k];
                        if(xIndex === 6) {
                            if(checkFlag === false) {
                            let oneUp = id - 8;
                            let twoUp = id - 16;
                            let pieceOneUp = [];
                            pieceOneUp.push(oneUp);
                            pieceOneUp.push(game[oneUp]?.pieceValue);
                            let pieceTwoUp = [];
                            pieceTwoUp.push(twoUp);
                            pieceTwoUp.push(game[twoUp].pieceValue);
                            if(pieceOneUp[1] === 0) {
                                let btn1 = document.getElementById(oneUp);
                                if(pieceTwoUp[1] === 0) {

                                   
                                    let btn2 = document.getElementById(twoUp);
                              
                                    if(detectCheck(id, oneUp) === false) {
                                    btn1.classList.add("colorGreen");
                                    }
                                    if(detectCheck(id, twoUp) === false) {
                                    btn2.classList.add("colorGreen");
                                    }
                                }
                                else{
                                    if(detectCheck(id, oneUp) === false) {
                                    btn1.classList.add("colorGreen");
                                    }
                                }
                            } 
                            let diagonalOneLeftUp = id - 9;
                            let diagOneLeftX = j - 1;
                            let diagOneLeftY = k - 1;
                            let diagonalOneRightUp = id - 7;
                            let diagOneRightX = j - 1;
                            let diagOneRightY = k + 1;
                         
                         
                            if(diagOneLeftX >= 0 && diagOneLeftY >= 0) {
                                let pieceDiagonalLeft = game[diagonalOneLeftUp].pieceValue;
                            if(pieceDiagonalLeft > 0)  {
                                let btn2 = document.getElementById(diagonalOneLeftUp);
                                if(detectCheck(id, diagonalOneLeftUp) === false) {
                                btn2.classList.add('colorRed')
                                }
                            }}
                            if(diagOneRightX >= 0 && diagOneRightY <= 7) {
                                let pieceDiagonalRight = game[diagonalOneRightUp].pieceValue;
                            if(pieceDiagonalRight > 0) {

                                let btn3 = document.getElementById(diagonalOneRightUp);
                                if(detectCheck(id, diagonalOneRightUp) === false) {
                                btn3.classList.add('colorRed');
                                }
                            }}
                        }
                    else{

                        if(checkCount <= 1) {

                        let oneUp = id - 8;
                        let twoUp = id - 16;
                        let pieceOneUp = [];
                        pieceOneUp.push(oneUp);
                        pieceOneUp.push(game[oneUp].pieceValue);
                        let pieceTwoUp = [];
                        pieceTwoUp.push(twoUp);
                        pieceTwoUp.push(game[twoUp].pieceValue);
                        if(pieceOneUp[1] === 0) {
                            let btn1 = document.getElementById(oneUp);
                            if(pieceTwoUp[1] === 0) {

                               
                                let btn2 = document.getElementById(twoUp);
                           
                                if(btn2.classList.contains('colorCheck')) {
                                    btn2.classList.add('colorGreen');
                                    btn2.classList.remove('colorCheck');
                                }
                                if(btn1.classList.contains('colorCheck')) {
                                    
                                    btn1.classList.add('colorGreen');
                                    btn1.classList.remove('colorCheck');
                                }
                            
                            }
                            else{
                              
                                if(btn1.classList.contains('colorCheck')) {
                                    
                                    btn1.classList.add('colorGreen');
                                    btn1.classList.remove('colorCheck');
                                }
                            }
                        } 
                        let diagonalOneLeftUp = id - 9;
                        let diagonalOneRightUp = id - 7;
                        let pieceDiagonalLeft = game[diagonalOneLeftUp].pieceValue;
                        let pieceDiagonalRight = game[diagonalOneRightUp].pieceValue;
                        if(pieceDiagonalLeft > 0)  {
                            let btn2 = document.getElementById(diagonalOneLeftUp);
                            if(btn2.classList.contains('colorCheck')) {
                            btn2.classList.add('colorRed')
                            btn2.classList.remove('colorCheck');
                            }
                        }
                        if(pieceDiagonalRight > 0) {
                            let btn3 = document.getElementById(diagonalOneRightUp);
                            if(btn3.classList.contains('colorCheck')) {
                            btn3.classList.add('colorRed');
                            btn3.classList.remove('colorCheck');
                            }
                        }

                    }}
                    }

                        else{
                            if(checkFlag === false) {
                                id = board[j][k];
                            let oneUp = id - 8;
                            let pieceOneUp = [];
                            pieceOneUp.push(oneUp);
                            pieceOneUp.push(game[oneUp].pieceValue);
                            if(pieceOneUp[1] === 0) {
                                let btn1 = document.getElementById(oneUp);
                                if(detectCheck(id, oneUp) === false) {
                                btn1.classList.add("colorGreen");
                                }
                            }
                            let diagonalOneLeftUp = id - 9;
                            let diagOneLeftX = j - 1;
                            let diagOneLeftY = k - 1;
                            let diagonalOneRightUp = id - 7;
                            let diagOneRightX = j - 1;
                            let diagOneRightY = k + 1;
                         
                           
                            if(diagOneLeftX >= 0 && diagOneLeftY >= 0) {
                                let pieceDiagonalLeft = game[diagonalOneLeftUp].pieceValue;
                            if(pieceDiagonalLeft > 0)  {
                                let btn2 = document.getElementById(diagonalOneLeftUp);
                                if(detectCheck(id, diagonalOneLeftUp) === false) {
                                btn2.classList.add('colorRed')
                                }
                            }}
                            if(diagOneRightX >= 0 && diagOneRightY <= 7) {
                                let pieceDiagonalRight = game[diagonalOneRightUp].pieceValue;
                            if(pieceDiagonalRight > 0) {

                                let btn3 = document.getElementById(diagonalOneRightUp);
                                if(detectCheck(id, diagonalOneRightUp) === false) {
                                btn3.classList.add('colorRed');
                                }
                            }}
                        }
                        else{
                            if(checkCount <= 1) {
                            let oneUp = id - 8;
                            let pieceOneUp = [];
                            pieceOneUp.push(oneUp);
                            pieceOneUp.push(game[oneUp].pieceValue);
                            if(pieceOneUp[1] === 0) {
                               let btn1 = document.getElementById(oneUp);
                               if(btn1.classList.contains('colorCheck')) {
                                btn1.classList.add('colorGreen');
                                btn1.classList.remove('colorCheck');
                               }
                              
                            }
                            let diagonalOneLeftUp = id - 9;
                            let diagonalOneRightUp = id - 7;
                            let pieceDiagonalLeft = game[diagonalOneLeftUp].pieceValue;
                            let pieceDiagonalRight = game[diagonalOneRightUp].pieceValue;
                            if(pieceDiagonalLeft > 0)  {
                                let btn2 = document.getElementById(diagonalOneLeftUp);
                                if(btn2.classList.contains('colorCheck')) {
                                btn2.classList.add('colorRed')
                                btn2.classList.remove('colorCheck');
                                }
                            }
                            if(pieceDiagonalRight > 0) {
                                let btn3 = document.getElementById(diagonalOneRightUp);
                                if(btn3.classList.contains('colorCheck')) {
                                btn3.classList.add('colorRed');
                                btn3.classList.remove('colorCheck');
                                }
                            }
                        }}}
                       
                    }catch(err) {
                        console.log(err);
                    }
                    break;
                        default: break;
                        }}
                    }
                        else if(turn === 1 && player1 !== null){
                            id = board[j][k];
                            if(checkMate === true) {
                                setCheckmate(true);
                                gameWin();
                                return;

                           
                                
                            }
                           
                                switch(piece[1]) {
                                   
                                  
                                    
                            case 5:
                                let oneUp = id - 8;
                                let oneDown = id + 8;
                                let oneLeft = id - 1;
                                let oneRight = id + 1;
                                try{
                                    xIndex = j;
                                    yIndex = k;
                                    if(checkFlag === false) {
                                      
                                        xIndex--;
                                        if(xIndex >= 0){
                                let pieceUp = game[oneUp]?.pieceValue;
                                while(pieceUp === 0 || pieceUp < 0) {
                                    
                                    let btn1 = document.getElementById(oneUp);
                                  
                                    if(pieceUp === 0) {
                                        if(detectCheck(piece[0], oneUp) === false) {
                                        btn1.classList.add('colorGreen');
                                        }
                                    }
                                    else if(pieceUp < 0) {
                                        if(detectCheck(piece[0], oneUp) === false) {
                                        btn1.classList.add('colorRed');
                                        }
                                        break;
                                    }
                                    oneUp -= 8;
                                    xIndex--;
                                    if(xIndex < 0) {
                                        break;
                                    }
                                    pieceUp = game[oneUp]?.pieceValue;
                                }
                               }}
                            else{
                            
                               
                                xIndex--;
                                if(xIndex >= 0) {
                                if(checkCount <= 1) {
                                let pieceUp = game[oneUp]?.pieceValue;
                                
                                while(pieceUp === 0 || pieceUp < 0) {
                                  
                                    
                                    let btn1 = document.getElementById(oneUp);
                                    
                                   
                                        if(pieceUp < 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                             btn1.classList.add('colorRed');
                                             btn1.classList.remove('colorCheck')
                                        }
                                        break;
                                    }
                                        else if(pieceUp === 0) {
                                            if(btn1.classList.contains('colorCheck')) {
                                                btn1.classList.add('colorGreen');
                                                btn1.classList.remove('colorCheck');
                                            }
                                        }
                                    
                                    
                                    
                                    oneUp -= 8;
                                    xIndex--;
                                    if(xIndex < 0) {
                                        break;
                                    }
                                    pieceUp = game[oneUp]?.pieceValue;
                                }}
                            }}
                            
                            }catch(err) {
                                    console.log(err);
                                 
                                }
                                xIndex = j;
                                yIndex = k;
                                try{
                                if(checkFlag === false) {

                                    xIndex++;
                                    if(xIndex <= 7) {
                                let pieceDown = game[oneDown]?.pieceValue;
                              
                                while(pieceDown === 0 || pieceDown < 0) {
                                   
                                    let btn1 = document.getElementById(oneDown);
                                    if(pieceDown === 0) {
                                        if(detectCheck(piece[0], oneDown) === false) {
                                        btn1.classList.add('colorGreen');
                                        }
                                    }
                                    else if(pieceDown < 0) {
                                        if(detectCheck(piece[0], oneDown) === false) {
                                        btn1.classList.add('colorRed');
                                        }
                                        break;
                                    }
                                    oneDown += 8;
                                    xIndex++;
                                    if(xIndex > 7) {
                                        break;
                                    }
                                    pieceDown = game[oneDown]?.pieceValue;
                                }}
                               }
                            else{
                                if(checkCount <= 1) {
                                    xIndex = j;
                                    xIndex++;
                                    if(xIndex <= 7) {
                                let pieceDown = game[oneDown]?.pieceValue;
                                
                                while(pieceDown === 0 || pieceDown < 0) {
                                  
                                    let btn1 = document.getElementById(oneDown);
                                    
                                   
                                        if(pieceDown < 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                        btn1.classList.add('colorRed');
                                        btn1.classList.remove('colorCheck');
                                    }
                                    break;
                                }
                                else if(pieceDown === 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                        btn1.classList.add('colorGreen');
                                        btn1.classList.remove('colorCheck');
                                    }
                                   
                                }
                                        
                                    
                                    oneDown += 8;
                                    xIndex++;
                                    if(xIndex > 7) {
                                        break;
                                    }
                                    pieceDown = game[oneDown]?.pieceValue;
                                }}
                            }}
                            
                            }catch(err) {
                                    console.log(err);
                                    
                                }
                                xIndex = j;
                                yIndex = k;
                                try{
                                if(checkFlag === false) {
                                yIndex--;
                                if(yIndex >= 0) {
                                    
                                let pieceLeft = game[oneLeft]?.pieceValue;
                                while(pieceLeft === 0 || pieceLeft < 0) {
                                   
                                    let btn1 = document.getElementById(oneLeft);
                                    if(pieceLeft === 0) {
                                        if(detectCheck(piece[0], oneLeft) === false) {
                                        btn1.classList.add('colorGreen');
                                        }
                                    }
                                    else if(pieceLeft < 0) {
                                        if(detectCheck(piece[0], oneLeft) === false) {
                                        btn1.classList.add('colorRed');
                                        }
                                        break;
                                    }
                                    oneLeft--;
                                    yIndex--;
                                    if(yIndex < 0) {
                                        break;
                                    }
                                    pieceLeft = game[oneLeft]?.pieceValue;
                                }}
                               }
                            else{
                                if(checkCount <= 1) {
                               
                                yIndex--;
                                if(yIndex >= 0) {
                                    let pieceLeft = game[oneLeft]?.pieceValue;
                                while(pieceLeft === 0 || pieceLeft < 0) {
                                   
                                    let btn1 = document.getElementById(oneLeft);
                                   
                                    
                                        if(pieceLeft < 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                        btn1.classList.add('colorRed');
                                        btn1.classList.remove('colorCheck')
                                    }
                                    break;
                                }
                                else if(pieceLeft === 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                        btn1.classList.add('colorGreen');
                                        btn1.classList.remove('colorCheck');
                                    } 
                                }
                                        
                                    
                                    oneLeft--;
                                    yIndex--;
                                    if(yIndex < 0) {
                                        break;
                                    }
                                    pieceLeft = game[oneLeft]?.pieceValue;
                                }
                            }}}
                            
                            
                            }catch(err) {
                                    console.log(err);
                                    
                                }

                                xIndex = j;
                                yIndex = k;
                                try{
                                    console.log('oneRight');
                                    if(checkFlag === false) {
                                        yIndex++;
                                        if(yIndex <= 7) {
                                let pieceRight = game[oneRight]?.pieceValue;
                              
                                while(pieceRight === 0 || pieceRight < 0) {
                                   
                                    let btn1 = document.getElementById(oneRight);
                                    if(pieceRight === 0) {
                                        if(detectCheck(piece[0], oneRight) === false) {
                                        btn1.classList.add('colorGreen');
                                        }
                                    }
                                 else if(pieceRight < 0) {
                                    if(detectCheck(piece[0], oneRight) === false) {
                                        btn1.classList.add('colorRed');
                                    }
                                        break;
                                    }
                                    oneRight++;
                                    yIndex++;
                                    if(yIndex > 7) {
                                        break;
                                    }
                                    pieceRight = game[oneRight]?.pieceValue;
                                }
                                       }}
                                    else{
                                        if(checkCount <= 1) {
                                            console.log('checkcount');
                                            yIndex++;
                                            if(yIndex <= 7) {
                                        let pieceRight = game[oneRight]?.pieceValue;
                                        let btn1 = document.getElementById(oneRight);
                                     
                                        while(pieceRight === 0 || pieceRight < 0) {
                                            console.log('pieceRight');
                                            console.log(pieceRight);
                                            btn1 = document.getElementById(oneRight);
                                          
                                        
                                           
                                          
                                                if(pieceRight < 0) {
                                            if(btn1.classList.contains('colorCheck')) {
                                                btn1.classList.add('colorRed');
                                                btn1.classList.remove('colorCheck');
                                            }
                                          
                                            break;
                                        }
                                        else if(pieceRight === 0) {
                                            if(btn1.classList.contains('colorCheck')) {
                                                btn1.classList.add('colorGreen');
                                                btn1.classList.remove('colorCheck');
                                            }
                                            
                                        }
                                                
                                            
                                            oneRight++;
                                            yIndex++;
                                            if(yIndex > 7) {
                                                break;
                                            }
                                            pieceRight = game[oneRight]?.pieceValue;
                                        }
                                    }
                                }
                                    }}
                                    
                                catch(err) {
                                    console.log(err);
                                   
                                }

                            break;

                            case 2:

                            try{
                                id = board[j][k];

                            let twoUpRight = id - 15;
                            let twoUpLeft = id - 17;
                            let twoLeftDown = id + 15;
                            let twoRightDown = id + 17;
                             xIndex = j;
                             yIndex = k;

                           
                                if(checkFlag === false) {
                                    xIndex -= 2;
                                    yIndex += 1;
                                    if(xIndex >= 0 && yIndex <= 7) {   
                            let pieceUpRight = game[twoUpRight]?.pieceValue;
                            let btn1 = document.getElementById(twoUpRight);
                            if(pieceUpRight === 0 && detectCheck(id, twoUpRight) === false) {
                                btn1.classList.add('colorGreen');
                            }
                            else if(pieceUpRight < 0&& detectCheck(id, twoUpRight) === false)  {
                                btn1.classList.add('colorRed');
                            }
                        }}
                        else{
                            if(checkCount <= 1) {
                                xIndex -= 2;
                                yIndex += 1;
                                if(xIndex >= 0 && yIndex <= 7) {
                            let pieceUpRight = game[twoUpRight]?.pieceValue;
                            let btn1 = document.getElementById(twoUpRight);
                           
                             if(pieceUpRight < 0) {
                                if(btn1.classList.contains('colorCheck')) {
                                    btn1.classList.add('colorRed');
                                    btn1.classList.remove('colorCheck');
                                }
                            }
                            else if(pieceUpRight === 0) {
                                if(btn1.classList.contains('colorCheck')) {
                                    btn1.classList.add('colorGreen');
                                    btn1.classList.remove('colorCheck');
                                }
                            }
                        }

                        }}

                        xIndex = j;
                        yIndex = k;
                        xIndex -= 2;
                        yIndex--;
                        if(xIndex >= 0 && yIndex >= 0) {
                            if(checkFlag === false) {

                            let pieceUpLeft = game[twoUpLeft].pieceValue;
                            let btn1 = document.getElementById(twoUpLeft);
                            if(pieceUpLeft === 0 && detectCheck(id, twoUpLeft) === false) {
                                btn1.classList.add('colorGreen');
                            }
                            else if(pieceUpLeft < 0 && detectCheck(id, twoUpLeft) === false) {
                                btn1.classList.add('colorRed');
                            }
                        }
                    

                    else{
                        if(checkCount <= 1) {
                        
                        let pieceUpLeft = game[twoUpLeft]?.pieceValue;
                        let btn1 = document.getElementById(twoUpLeft);
                       
                     if(pieceUpLeft < 0) {
                        if(btn1.classList.contains('colorCheck')) {
                            btn1.classList.add('colorRed');
                            btn1.classList.remove('colorCheck');
                        }
                        }
                        else if(pieceUpLeft === 0) {
                            if(btn1.classList.contains('colorCheck')) {
                                btn1.classList.add('colorGreen');
                                btn1.classList.remove('colorCheck');
                            }
                        }
                    }
                       
                    }}
                        xIndex = j;
                        yIndex = k;
                        xIndex += 2;
                        yIndex--;
                        if(xIndex <= 7 && yIndex >= 0) {
                            if(checkFlag === false) {
                            let pieceDownLeft = game[twoLeftDown]?.pieceValue;
                            let btn1 = document.getElementById(twoLeftDown);
                            if(pieceDownLeft === 0 && detectCheck(id, twoLeftDown) === false) {
                                btn1.classList.add('colorGreen');
                            }
                            else if(pieceDownLeft < 0 && detectCheck(id, twoLeftDown) === false) {
                                btn1.classList.add('colorRed');
                            }
                        }
                    else{
                        if(checkCount <= 1) {

                            let pieceDownLeft = game[twoLeftDown]?.pieceValue;
                            let btn1 = document.getElementById(twoLeftDown);
                            if(pieceDownLeft === 0) {
                                if(btn1.classList.contains('colorCheck')) {
                                btn1.classList.add('colorGreen');
                                btn1.classList.remove('colorCheck');
                                }
                            }
                            else if(pieceDownLeft < 0) {
                                if(btn1.classList.contains('colorCheck')) {
                                    btn1.classList.add('colorRed');
                                    btn1.classList.remove('colorCheck');
                                }
                            }

                    }}
                    
                    
                    }

                        xIndex = j;
                        yIndex = k;
                        xIndex += 2;
                        yIndex++;
                        if(xIndex <= 7 && yIndex <= 7) {

                            if(checkFlag === false) {
                            let pieceDownRight = game[twoRightDown]?.pieceValue;
                            let btn1 = document.getElementById(twoRightDown);
                            if(pieceDownRight === 0 && detectCheck(id, twoRightDown) === false) {
                                btn1.classList.add('colorGreen');
                            }
                            else if(pieceDownRight < 0 && detectCheck(id, twoRightDown) === false) {
                                btn1.classList.add('colorRed');
                            }
                        }


                        else{
                            if(checkCount <= 1) {
                            let pieceDownRight = game[twoRightDown]?.pieceValue;
                            let btn1 = document.getElementById(twoRightDown);
                           
                             if(pieceDownRight < 0) {
                                if(btn1.classList.contains('colorCheck')) {
                                    btn1.classList.add('colorRed');
                                    btn1.classList.remove('colorCheck');
                                }
                            }
                            else if(pieceDownRight === 0) {
                                if(btn1.classList.contains('colorCheck')) {
                                    btn1.classList.add('colorGreen');
                                    btn1.classList.remove('colorCheck');
                                }
                            }
                        }
                    }}

                        

                        xIndex = j;
                        yIndex = k;
                        xIndex--;
                        yIndex -= 2;
                        let leftUp = id - 10;
                        if(xIndex >= 0 && yIndex >= 0) {
                            if(checkFlag === false) {
                            let pieceLeftUp = game[leftUp]?.pieceValue;
                            let btn1 = document.getElementById(leftUp);
                            if(pieceLeftUp === 0 && detectCheck(id, leftUp) === false) {
                                btn1.classList.add('colorGreen');
                            }
                            else if(pieceLeftUp < 0 && detectCheck(id, leftUp) === false) {
                                btn1.classList.add('colorRed');
                            }
                        }

                        else{
                            if(checkCount <= 1) {
                            let pieceLeftUp = game[leftUp].pieceValue;
                            let btn1 = document.getElementById(leftUp);
                           
                            if(pieceLeftUp < 0) {
                            if(btn1.classList.contains('colorCheck')) {
                                btn1.classList.add('colorRed');
                                btn1.classList.remove('colorCheck');
                            }}
                            else if(pieceLeftUp === 0) {
                                if(btn1.classList.contains('colorCheck')) {
                                    btn1.classList.add('colorGreen');
                                    btn1.classList.remove('colorCheck');
                                }
                            }
                        }}
                    }
                        xIndex = j;
                        yIndex = k;
                        xIndex--;
                        yIndex += 2;
                        let rightUp = id - 6;
                        if(xIndex >= 0 && yIndex <= 7) {
                            if(checkFlag === false) {
                            let pieceRight = game[rightUp]?.pieceValue;
                            let btn1 = document.getElementById(rightUp);
                            if(pieceRight === 0 && detectCheck(id, rightUp) === false) {
                                btn1.classList.add('colorGreen');
                            }
                            else if(pieceRight < 0 && detectCheck(id, rightUp) === false) {
                                btn1.classList.add('colorRed');
                            }
                        }else {
                            if(checkCount <= 1) {
                            let pieceRight = game[rightUp]?.pieceValue;
                            let btn1 = document.getElementById(rightUp);
                           
                             if(pieceRight < 0) {
                                if(btn1.classList.contains('colorCheck')) {
                                    btn1.classList.add('colorRed');
                                    btn1.classList.remove('colorCheck');
                                }
                            }
                            else if(pieceRight === 0) {
                                if(btn1.classList.contains('colorCheck')) {
                                    btn1.classList.add('colorGreen');
                                    btn1.classList.remove('colorCheck');
                                }
                            }
                        }
                        }}

                        xIndex = j;
                        yIndex = k;
                        xIndex++;
                        yIndex -= 2;
                        let leftTwoDown = id + 6;
                        if(xIndex <= 7 && yIndex >= 0) {
                            if(checkFlag === false) {
                            let pieceLeftTwoDown = game[leftTwoDown]?.pieceValue;
                            let btn1 = document.getElementById(leftTwoDown);
                            if(pieceLeftTwoDown === 0 && detectCheck(id, leftTwoDown) === false) {
                                btn1.classList.add('colorGreen');
                            }
                            else if(pieceLeftTwoDown < 0 && detectCheck(id, leftTwoDown) === false) {
                                btn1.classList.add('colorRed');
                            }
                        }
                        else{
                            if(checkCount <= 1) {
                            let pieceLeftTwoDown = game[leftTwoDown]?.pieceValue;
                            let btn1 = document.getElementById(leftTwoDown);
                            
                             if(pieceLeftTwoDown < 0) {
                                if(btn1.classList.contains('colorCheck')) {
                                    btn1.classList.add('colorRed');
                                    btn1.classList.remove('colorCheck');
                                }
                            }
                            else if(pieceLeftTwoDown === 0) {
                                if(btn1.classList.contains('colorCheck')) {
                                    btn1.classList.add('colorGreen');
                                    btn1.classList.remove('colorCheck');
                                }
                            }
                        }}

                        }

                        xIndex = j;
                        yIndex = k;
                        xIndex++;
                        yIndex += 2;
                        let rightTwoDown = id + 10;
                        if(xIndex <= 7 && yIndex <= 7) {
                            if(checkFlag === false) { 
                            let pieceRightTwoDown = game[rightTwoDown]?.pieceValue;
                            let btn1 = document.getElementById(rightTwoDown);
                            if(pieceRightTwoDown === 0 && detectCheck(id, rightTwoDown) === false) {
                                btn1.classList.add('colorGreen');
                            }
                            else if(pieceRightTwoDown < 0 && detectCheck(id, rightTwoDown) === false) {
                                btn1.classList.add('colorRed');
                            }
                        }
                        else{
                            if(checkCount <= 1) {
                            let pieceRightTwoDown = game[rightTwoDown]?.pieceValue;
                            let btn1 = document.getElementById(rightTwoDown);
                            
                             if(pieceRightTwoDown < 0) {
                                if(btn1.classList.contains('colorCheck')) {
                                btn1.classList.add('colorRed');
                                btn1.classList.remove('colorCheck');
                                }
                            }
                            else if(pieceRightTwoDown === 0) {
                                if(btn1.classList.contains('colorCheck')) {
                                    btn1.classList.add('colorGreen');
                                    btn1.classList.remove('colorCheck');
                                }
                            }
                        }}
                    }

                    }catch(err) {
                        console.log(err);
                    }


                            break;

                            case 10:


                            try{

                                xIndex = j;
                                yIndex = k;
                            let diagLeftUp = id - 9;
                            
                                if(checkFlag === false) {
                                    xIndex--;
                                    yIndex--;
                                    if(xIndex >= 0 && yIndex >= 0) {
                            let pieceLeftUp = game[diagLeftUp]?.pieceValue
                          
                            while(pieceLeftUp === 0 || pieceLeftUp < 0) {
                                  
                                let btnLeftUp = document.getElementById(diagLeftUp);
                                if(pieceLeftUp === 0) {
                                    if(detectCheck(piece[0],diagLeftUp) === false) {
                                    btnLeftUp.classList.add('colorGreen');
                                    }
                                }
                               else if(pieceLeftUp < 0) {
                              
                                if(detectCheck(piece[0], diagLeftUp) === false) {
                                    btnLeftUp.classList.add('colorRed');
                                }
                                    break;
                                }
                                diagLeftUp -= 9;
                                xIndex--;
                                yIndex--;
                                if(xIndex < 0 || yIndex < 0) {
                                    break;
                                }
                                pieceLeftUp = game[diagLeftUp]?.pieceValue
                            }}}else{
                                if(checkCount <= 1) {
                                    xIndex--;
                                    yIndex--;
                                    if(xIndex >= 0 && yIndex >= 0) {

                                let pieceLeftUp = game[diagLeftUp]?.pieceValue
                              
                                while(pieceLeftUp === 0 || pieceLeftUp < 0) {
                                     
                                    let btnLeftUp = document.getElementById(diagLeftUp);
                                   
                                    if(pieceLeftUp < 0) {
                                        if(btnLeftUp.classList.contains('colorCheck')) {
                                        btnLeftUp.classList.add('colorRed');
                                        btnLeftUp.remove('colorCheck');
                                        }
                                        break;
                                    }
                                    else if(pieceLeftUp === 0) {
                                        if(btnLeftUp.classList.contains('colorCheck')) {
                                            btnLeftUp.classList.add('colorGreen');
                                            btnLeftUp.classList.remove('colorCheck');
                                        }
                                    }
                                    diagLeftUp -= 9;
                                    xIndex--;
                                    yIndex--;
                                    if(xIndex < 0 || yIndex < 0) {
                                        break;
                                    }
                                    pieceLeftUp = game[diagLeftUp]?.pieceValue
                                }

                            }
                            }}
                            }
                            catch(err) {
                             
                                console.log(err);
                               
                            }


                            try{

                                xIndex = j;
                                yIndex = k;
                                if(checkFlag === false) {
                         

                            let diagRightUp = id - 7;
                            xIndex--;
                            yIndex++;
                            if(xIndex >= 0 && yIndex <= 7) {
                           
                            let pieceRightUp = game[diagRightUp]?.pieceValue
                          
                            while(pieceRightUp === 0 || pieceRightUp < 0) {
                                
                                let btnRightUp = document.getElementById(diagRightUp);
                                if(pieceRightUp === 0) {
                                    if(detectCheck(piece[0], diagRightUp) === false) {
                                    btnRightUp.classList.add('colorGreen');
                                    }
                                }
                              else  if(pieceRightUp < 0) {
                              
                                if(detectCheck(piece[0], diagRightUp) === false) {
                                    btnRightUp.classList.add('colorRed');
                                }
                                    break;
                                }
                                diagRightUp -= 7;
                                xIndex--;
                                yIndex++;
                                if(xIndex <0 || yIndex > 7) {
                                    break;
                                }
                                pieceRightUp = game[diagRightUp]?.pieceValue
                            }
                                
                            }}
                        else{
                            if(checkCount <= 1) {
                            xIndex = j;
                            yIndex = k;
                            xIndex--;
                            yIndex++;
                            if(xIndex >= 0 && yIndex <= 7) {
                            let diagRightUp = id - 7;
                           
                            let pieceRightUp = game[diagRightUp]?.pieceValue
                          
                            while(pieceRightUp === 0 || pieceRightUp < 0) {
                                
                                 
                                let btnRightUp = document.getElementById(diagRightUp);
                               
                                if(pieceRightUp < 0) {
                               
                                if(btnRightUp.classList.contains('colorCheck')) {
                                    btnRightUp.classList.add('colorRed');
                                    btnRightUp.classList.remove('colorCheck');
                                }
                                break;
                            }
                                else if(pieceRightUp === 0) {
                                    if(btnRightUp.classList.contains('colorCheck')) {
                                        btnRightUp.classList.add('colorGreen');
                                        btnRightUp.classList.remove('colorCheck');
                                    }
                                }
                                    
                                
                                diagRightUp -= 7;
                                xIndex--;
                                yIndex++;
                                if(xIndex <0 || yIndex > 7) {
                                    break;
                                }
                                pieceRightUp = game[diagRightUp]?.pieceValue
                            }


                        }}}
                        }

                            catch(err) {
                               
                                console.log(err);
                               
                            }


                            try{

                                xIndex = j;
                                yIndex = k;

                                if(checkFlag === false) {
                          
                         
                                    xIndex++;
                                    yIndex++;
                                    if(xIndex <= 7 && yIndex <= 7) {
                            let diagRightDown = id + 9;


                            let pieceRightDown = game[diagRightDown]?.pieceValue
                           
                            while(pieceRightDown === 0 || pieceRightDown < 0) {
                                
                                 
                                let btnRightDown = document.getElementById(diagRightDown);
                                if(pieceRightDown === 0) {
                                    if(detectCheck(piece[0], diagRightDown) === false) {
                                    btnRightDown.classList.add('colorGreen');
                                    }
                                }
                             else   if(pieceRightDown < 0) {
                             
                                if(detectCheck(piece[0], diagRightDown) === false) {
                                    btnRightDown.classList.add('colorRed');
                                }
                                    break;
                                }
                                diagRightDown += 9;
                                xIndex++;
                                yIndex++;
                                if(xIndex > 7 || yIndex > 7) {
                                    break;
                                }
                                pieceRightDown = game[diagRightDown]?.pieceValue
                            }}}
                            


                            else{
                                if(checkCount <= 1) {
                               
                                xIndex++;
                                yIndex++;

                                if(xIndex <= 7 && yIndex <= 7) {
                                let diagRightDown = id + 9;
    
    
                                let pieceRightDown = game[diagRightDown]?.pieceValue
                              
                                while(pieceRightDown === 0 || pieceRightDown < 0) {
                                    
                                    
                                    let btnRightDown = document.getElementById(diagRightDown);
                                   
                                    if(pieceRightDown < 0) {
                                    
                                    if(btnRightDown.classList.contains('colorCheck')) {
                                        btnRightDown.classList.add('colorRed');
                                        btnRightDown.classList.remove('colorCheck');
                                    }
                                        break;
                                    }

                                    else if(pieceRightDown === 0) {
                                        if(btnRightDown.classList.contains('colorCheck')) {
                                            btnRightDown.classList.add('colorGreen');
                                            btnRightDown.classList.remove('colorCheck');
                                        }
                                    }
                                    diagRightDown += 9;
                                    xIndex++;
                                    yIndex++;
                                    if(xIndex > 7 || yIndex > 7) {
                                        break;
                                    }
                                    pieceRightDown = game[diagRightDown]?.pieceValue


                            }
                            }}}
                        }
                            catch(err) {
                                console.log(err);
                            }


                            try{

                                xIndex = j;
                                yIndex = k;
                            if(checkFlag === false) {
                                xIndex++;
                                yIndex--;
                                if(xIndex <= 7 && yIndex >= 0) {
                         


                            let diagLeftDown = id + 7;

                            let pieceLeftDown= game[diagLeftDown]?.pieceValue
                         
                            while(pieceLeftDown === 0 || pieceLeftDown < 0) {
                            
                                 
                                let btnLeftDown = document.getElementById(diagLeftDown);
                                if(pieceLeftDown === 0) {
                                    if(detectCheck(piece[0], diagLeftDown) === false) {
                                    btnLeftDown.classList.add('colorGreen');
                                    }
                                }
                             else   if(pieceLeftDown < 0) {
                                if(detectCheck(piece[0], diagLeftDown) === false) {
                                    btnLeftDown.classList.add('colorRed');
                                }
                                    break;
                                }
                                diagLeftDown += 7;
                                xIndex++;
                                yIndex--;
                                if(xIndex > 7 || yIndex < 0) {
                                    break;
                                }
                                pieceLeftDown= game[diagLeftDown]?.pieceValue




                            }}}

                            else{
                                if(checkCount <= 1) {
                                    xIndex++;
                                    yIndex--;
                                    if(xIndex <= 7 && yIndex >= 0) {
                              
    
    
                                let diagLeftDown = id + 7;
    
                                let pieceLeftDown= game[diagLeftDown]?.pieceValue
                               
                                while(pieceLeftDown === 0 || pieceLeftDown < 0) {
                                
                                      
                                    let btnLeftDown = document.getElementById(diagLeftDown);
                                   
                                    if(pieceLeftDown < 0) {
                                   
                                    if(btnLeftDown.classList.contains('colorCheck')) {
                                        btnLeftDown.classList.add('colorRed');
                                        btnLeftDown.classList.remove('colorCheck');
                                    }
                                        break;
                                    }
                                    else if(pieceLeftDown === 0) {
                                        if(btnLeftDown.classList.contains('colorCheck')) {
                                            btnLeftDown.classList.add('colorGreen');
                                            btnLeftDown.classList.remove('colorCheck');
                                        }
                                    } 
                                    diagLeftDown += 7;
                                    xIndex++;
                                    yIndex--;
                                    if(xIndex > 7 || yIndex < 0) {
                                        break;
                                    }
                                    pieceLeftDown= game[diagLeftDown]?.pieceValue
    
    
    
    
                                }}}

                            }
                            }
                            catch(err) {
                               
                                console.log(err);
                             
                            }

                           
                            try{
                                xIndex = j;
                                yIndex = k;

                                if(checkFlag === false) {
                                    xIndex--;
                                    if(xIndex >= 0) {
                              let  oneUp = id - 8;
                             
                            let pieceUp = game[oneUp]?.pieceValue;
                            while(pieceUp === 0 || pieceUp < 0) {
                               
                               
                                let btn1 = document.getElementById(oneUp);
                                if(pieceUp === 0) {
                                    if(detectCheck(piece[0], oneUp) === false) {
                                    btn1.classList.add('colorGreen');
                                    }
                                }
                                else if(pieceUp < 0) {
                                    if(detectCheck(piece[0], oneUp) === false) {
                                    btn1.classList.add('colorRed');
                                    }
                                    break;
                                }
                                oneUp -= 8;
                                xIndex--;
                                if(xIndex < 0) {
                                    break;
                                }
                                pieceUp = game[oneUp]?.pieceValue;
                            }
                            }}
                            else{
                                if(checkCount <= 1) {
                                    xIndex--;
                                    if(xIndex >= 0) {
                                let  oneUp = id - 8;
                             
                                let pieceUp = game[oneUp]?.pieceValue;
                            
                                while(pieceUp === 0 || pieceUp < 0) {
                                  
                                    let btn1 = document.getElementById(oneUp);
                                  
                                     if(pieceUp < 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                        btn1.classList.add('colorRed');
                                        btn1.classList.remove('colorCheck');
                                        }
                                        break;
                                    }
                                    else if(pieceUp === 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                            btn1.classList.add('colorGreen');
                                            btn1.classList.remove('colorCheck');
                                        }
                                    }
                                    oneUp -= 8;
                                    xIndex--;
                                    if(xIndex < 0) {
                                        break;
                                    }
                                    pieceUp = game[oneUp]?.pieceValue;
                                }}
                            }}


                            }catch(err) {
                                console.log(err);
                               
                            }
                            xIndex = j;
                            yIndex = k;
                            try{

                                if(checkFlag === false) {
                                    xIndex++;
                                    if(xIndex <= 7) {

                                let   oneDown = id + 8;
                            
                            let pieceDown = game[oneDown]?.pieceValue;
                          
                            while(pieceDown === 0 || pieceDown < 0) {
                               
                                let btn1 = document.getElementById(oneDown);
                                if(pieceDown === 0) {
                                    if(detectCheck(piece[0], oneDown) === false) {
                                    btn1.classList.add('colorGreen');
                                    }
                                }
                                else if(pieceDown < 0) {
                                    if(detectCheck(piece[0], oneDown) === false) {
                                    btn1.classList.add('colorRed');
                                    }
                                    break;
                                }
                                oneDown += 8;
                                xIndex++;
                                if(xIndex > 7) {
                                    break;
                                }
                                pieceDown = game[oneDown]?.pieceValue;
                            }}}

                            else{
                                if(checkCount <= 1) {
                                    xIndex++;
                                    if(xIndex <= 7) {
                                let   oneDown = id + 8;
                            
                                let pieceDown = game[oneDown]?.pieceValue;
                               
                                while(pieceDown === 0 || pieceDown < 0) {
                                  
                                    let btn1 = document.getElementById(oneDown);
                                  
                                     if(pieceDown < 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                        btn1.classList.add('colorRed');
                                        btn1.classList.remove('colorCheck');
                                        }
                                        break;
                                    
                                    }
                                    else if(pieceDown === 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                            btn1.classList.add('colorGreen') 
                                                btn1.classList.remove('colorCheck');
                                            
                                        }
                                    }
                                    oneDown += 8;
                                    xIndex++;
                                    if(xIndex > 7) {
                                        break;
                                    }
                                    pieceDown = game[oneDown]?.pieceValue;
                                }}
                            }}
                            }catch(err) {
                                console.log(err);
                            }


                            xIndex = j;
                            yIndex = k;
                            try{

                                if(checkFlag === false) {
                                    yIndex--;
                                    if(yIndex >= 0) {
                                let   oneLeft = id - 1;
                              
                            let pieceLeft = game[oneLeft]?.pieceValue;
                         
                            while(pieceLeft === 0 || pieceLeft < 0) {
                               
                                let btn1 = document.getElementById(oneLeft);
                                if(pieceLeft === 0) {
                                    if(detectCheck(piece[0], oneLeft) === false) {
                                    btn1.classList.add('colorGreen');
                                    }
                                }
                                else if(pieceLeft < 0) {
                                    if(detectCheck(piece[0], oneLeft) === false) {
                                    btn1.classList.add('colorRed');
                                    }
                                    break;
                                }
                                oneLeft--;
                                yIndex--;
                                if(yIndex < 0) {
                                    break;
                                }
                                pieceLeft = game[oneLeft]?.pieceValue;
                            }}}

                            else {
                                if(checkCount <= 1) {
                                    yIndex--;
                                    if(yIndex >= 0) {
                                let   oneLeft = id - 1;
                              
                                let pieceLeft = game[oneLeft]?.pieceValue;
                              
                                while(pieceLeft === 0 || pieceLeft < 0) {
                                   
                                    let btn1 = document.getElementById(oneLeft);
                                  
                                     if(pieceLeft < 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                        btn1.classList.add('colorRed');
                                        btn1.classList.remove('colorCheck');
                                        }
                                        break;
                                        
                                    }
                                    else if(pieceLeft === 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                            btn1.classList.add('colorGreen');
                                            btn1.classList.remove('colorCheck');
                                        }
                                    }
                                    oneLeft--;
                                    yIndex--;
                                    if(yIndex < 0) {
                                        break;
                                    }
                                    pieceLeft = game[oneLeft]?.pieceValue;
                                }}}
                            }
                            }catch(err) {
                                console.log(err);
                              
                            }

                            xIndex = j;
                            yIndex = k;
                            try{
                                if(checkFlag === false) {
                                    yIndex++;
                                    if(yIndex <= 7) {

                                let  oneRight = id + 1;
                            let pieceRight = game[oneRight]?.pieceValue;
                          
                            while(pieceRight === 0 || pieceRight < 0) {
                               
                                let btn1 = document.getElementById(oneRight);
                                if(pieceRight === 0) {
                                    if(detectCheck(piece[0], oneRight) === false) {
                                    btn1.classList.add('colorGreen');
                                    }
                                }
                              else  if(pieceRight < 0) {
                                if(detectCheck(piece[0], oneRight) === false) {
                                    btn1.classList.add('colorRed');
                                }
                                    break;
                                }
                                oneRight++;
                                yIndex++;
                                if(yIndex > 7) {
                                    break;
                                }
                                pieceRight = game[oneRight]?.pieceValue;
                            }}}
                            

                            else{
                                xIndex = j;
                                yIndex = k;
                                if(checkCount <= 1) {
                                    yIndex++;
                                    if(yIndex <= 7) {
                                let  oneRight = id + 1;
                                let pieceRight = game[oneRight]?.pieceValue;
                                let btn1 = document.getElementById(oneRight);
                               
                             
                                while(pieceRight === 0 || pieceRight < 0) {
                                   
                                     btn1 = document.getElementById(oneRight);
                                   
                                    if(pieceRight < 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                        btn1.classList.add('colorRed');
                                        btn1.classList.remove('colorCheck');
                                        }
                                        break;
                                         
                                    }
                                        else if(pieceRight === 0) {
                                            if(btn1.classList.contains('colorCheck')) {
                                                btn1.classList.add('colorGreen');
                                                btn1.classList.remove('colorCheck');
                                            }
                                        }
                                       
                                    
                                    
                                    oneRight++;
                                    yIndex++;
                                    if(yIndex > 7) {
                                        break;
                                    }
                                    pieceRight = game[oneRight]?.pieceValue;
                                }
                            }}}
                            }
                            catch(err) {
                                console.log(err);
                              
                            }



                            

                            break;

                            case 3:

                            

                            try{
                                xIndex = j;
                                yIndex = k;
                                
                                if(checkFlag === false) {
                                    xIndex--;
                                    yIndex--;
                                    if(xIndex >= 0 && yIndex >= 0) {
                                   
                            let diagLeftUp = id - 9;
                          let   pieceLeftUp = game[diagLeftUp]?.pieceValue;
                            while(pieceLeftUp === 0 || pieceLeftUp < 0) {
                                   
                                let btnLeftUp = document.getElementById(diagLeftUp);
                                if(pieceLeftUp === 0) {
                                    if(detectCheck(piece[0], diagLeftUp) === false) {
                                    btnLeftUp.classList.add('colorGreen');
                                    }
                                }
                               else if(pieceLeftUp < 0) {
                            
                                if(detectCheck(piece[0], diagLeftUp) === false) {
                                    btnLeftUp.classList.add('colorRed');
                                }
                                    break;
                                }
                                diagLeftUp -= 9;
                                xIndex--;
                                yIndex--;
                                if(xIndex < 0 || yIndex < 0) {
                                    break;
                                }
                                pieceLeftUp = game[diagLeftUp]?.pieceValue
                            }}}

                            else{
                                if(checkCount <= 1) {
                                    xIndex = j;
                                    yIndex = k;
                                    xIndex--;
                                    yIndex--;
                                    if(xIndex >= 0 && yIndex >= 0) {
                                let diagLeftUp = id - 9;
                        
                                let   pieceLeftUp = game[diagLeftUp]?.pieceValue
                                  while(pieceLeftUp === 0 || pieceLeftUp < 0) {
                                        
                                      let btnLeftUp = document.getElementById(diagLeftUp);
                                     
                                      if(pieceLeftUp < 0) {
                                    
                                      if(btnLeftUp.classList.contains('colorCheck')) {
                                          btnLeftUp.classList.add('colorRed');
                                          btnLeftUp.classList.remove('colorCheck');
                                      }

                                          break;
                                      }
                                      else if(pieceLeftUp === 0) {
                                        if(btnLeftUp.classList.contains('colorCheck')) {
                                            btnLeftUp.classList.add('colorGreen');
                                            btnLeftUp.classList.remove('colorCheck');
                                        }
                                      }
                                      diagLeftUp -= 9;
                                      xIndex--;
                                      yIndex--;
                                      if(xIndex < 0 || yIndex < 0) {
                                          break;
                                      }
                                      pieceLeftUp = game[diagLeftUp]?.pieceValue
                                    }      
                            }}
                            }}
                            catch(err) {
                               
                                console.log(err);
                              
                            }

                            try{
                                xIndex = j;
                                yIndex = k;
                                if(checkFlag === false) {
                              
                         
                            xIndex--;
                            yIndex++;
                            if(xIndex >= 0 && yIndex <= 7) {
                                let   diagRightUp = id - 7;

                           let  pieceRightUp = game[diagRightUp]?.pieceValue
                            while(pieceRightUp === 0 || pieceRightUp < 0) {
                                
                                 
                                let btnRightUp = document.getElementById(diagRightUp);
                                if(pieceRightUp === 0) {
                                    if(detectCheck(piece[0], diagRightUp) === false) {
                                    btnRightUp.classList.add('colorGreen');
                                    }
                                }
                              else  if(pieceRightUp < 0) {
                              if(detectCheck(piece[0], diagRightUp) === false) {
                                    btnRightUp.classList.add('colorRed');
                              }
                                    break;
                                }
                                diagRightUp -= 7;
                                xIndex--;
                                yIndex++;
                                if(xIndex <0 || yIndex > 7) {
                                    break;
                                }
                                pieceRightUp = game[diagRightUp]?.pieceValue
                            }
                        }
                            }
                        else{
                            if(checkCount <= 1) {
                                xIndex = j;
                                yIndex = k;
                                xIndex--;
                                yIndex++;
                                if(xIndex >= 0 && yIndex <= 7) {
                            let   diagRightUp = id - 7;
                           let  pieceRightUp = game[diagRightUp]?.pieceValue
                            while(pieceRightUp === 0 || pieceRightUp < 0) {
                                
                                let btnRightUp = document.getElementById(diagRightUp);
                              
                               if(pieceRightUp < 0) {
                             
                                if(btnRightUp.classList.contains('colorCheck')) {
                                    btnRightUp.classList.add('colorRed');
                                    btnRightUp.classList.remove('colorCheck');
                                }
                                    break;
                                }
                                else if(pieceRightUp === 0) {
                                    if(btnRightUp.classList.contains('colorCheck')) {
                                        btnRightUp.classList.add('colorGreen');
                                        btnRightUp.classList.remove('colorCheck');
                                    }
                                }
                                diagRightUp -= 7;
                                xIndex--;
                                yIndex++;
                                if(xIndex <0 || yIndex > 7) {
                                    break;
                                }
                                pieceRightUp = game[diagRightUp]?.pieceValue
                            }
                        }}
                    }
                        }

                            catch(err) {
                              
                                console.log(err);
                             
                            }

                            try{

                                xIndex = j;
                                yIndex = k;
                                if(checkFlag === false) {
                                    xIndex++;
                                    yIndex++;
                                    if(xIndex <= 7 && yIndex <= 7) {
                               
                                let   diagRightDown = id + 9;
                          


                          let   pieceRightDown = game[diagRightDown]?.pieceValue
                        
                            while(pieceRightDown === 0 || pieceRightDown < 0) {
                                
                                
                                let btnRightDown = document.getElementById(diagRightDown);
                                if(pieceRightDown === 0) {
                                    if(detectCheck(piece[0], diagRightDown) === false) {
                                    btnRightDown.classList.add('colorGreen');
                                    }
                                }
                             else   if(pieceRightDown < 0) {
                                if(detectCheck(piece[0], diagRightDown) === false) {
                                   btnRightDown.classList.add('colorRed');
                                }
                                    break;
                                }
                                diagRightDown += 9;
                                xIndex++;
                                yIndex++;
                                if(xIndex > 7 || yIndex > 7) {
                                    break;
                                }
                                pieceRightDown = game[diagRightDown]?.pieceValue
                            }}}


                            else{
                                if(checkCount <= 1) {
                                    xIndex++;
                                    yIndex++;
                                    if(xIndex <= 7 && yIndex <= 7) {
      
                                let   diagRightDown = id + 9;
                         

                          let   pieceRightDown = game[diagRightDown]?.pieceValue
                          
                            while(pieceRightDown === 0 || pieceRightDown < 0) {
                                
                                 
                                let btnRightDown = document.getElementById(diagRightDown);
                              
                               if(pieceRightDown < 0) {
                               
                                if(btnRightDown.classList.contains('colorCheck')) {
                                    btnRightDown.classList.add('colorRed');
                                    btnRightDown.classList.remove('colorCheck');
                                }
                               
                                    break;
                                }
                                else if(pieceRightDown === 0) {
                                    if(btnRightDown.classList.contains('colorCheck')) {
                                        btnRightDown.classList.add('colorGreen');
                                        btnRightDown.classList.remove('colorCheck');
                                   }
                                }
                                diagRightDown += 9;
                                xIndex++;
                                yIndex++;
                                if(xIndex > 7 || yIndex > 7) {
                                    break;
                                }
                                pieceRightDown = game[diagRightDown]?.pieceValue
                            }

                            }}}
                            }
                            catch(err) {
                              
                                console.log(err);
                               
                            }



                            try{
                                xIndex = j;
                                yIndex = k;
                                if(checkFlag === false) {
                                    xIndex++;
                                    yIndex--;
                                    if(xIndex <= 7 && yIndex >= 0) {
                            let   diagLeftDown = id + 7;
                           



                         let    pieceLeftDown= game[diagLeftDown]?.pieceValue
                          
                            while(pieceLeftDown === 0 || pieceLeftDown < 0) {
                                  
                                let btnLeftDown = document.getElementById(diagLeftDown);
                                if(pieceLeftDown === 0) {
                                    if(detectCheck(piece[0], diagLeftDown) === false) {
                                    btnLeftDown.classList.add('colorGreen');
                                    }
                                }
                             else   if(pieceLeftDown < 0) {
                            
                                if(detectCheck(piece[0], diagLeftDown) === false) {
                                    btnLeftDown.classList.add('colorRed');
                                }
                                    break;
                                }
                                diagLeftDown += 7;
                                xIndex++;
                                yIndex--;
                                if(xIndex > 7 || yIndex < 0) {
                                    break;
                                }
                                pieceLeftDown= game[diagLeftDown]?.pieceValue

                            }


                            }}

                            else{
                                if(checkCount <= 1) {
                                    xIndex++;
                                    yIndex--;
                                    if(xIndex <= 7 && yIndex >= 0) {
                                let   diagLeftDown = id + 7;
                              
    
    
                             let    pieceLeftDown= game[diagLeftDown]?.pieceValue
                              
                                while(pieceLeftDown === 0 || pieceLeftDown < 0) {
                                      
                                    let btnLeftDown = document.getElementById(diagLeftDown);
                                   
                                    if(pieceLeftDown < 0) {
                                 
                                    if(btnLeftDown.classList.contains('colorCheck')) {
                                        btnLeftDown.classList.add('colorRed');
                                        btnLeftDown.classList.remove('colorCheck');
                                    }
                                        break;
                                    }
                                    else if(pieceLeftDown === 0) {
                                        if(btnLeftDown.classList.contains('colorCheck')) {
                                            btnLeftDown.classList.add('colorGreen');
                                            btnLeftDown.classList.remove('colorCheck');
                                        }
                                    }
                                    diagLeftDown += 7;
                                    xIndex++;
                                    yIndex--;
                                    if(xIndex > 7 || yIndex < 0) {
                                        break;
                                    }
                                    pieceLeftDown= game[diagLeftDown]?.pieceValue
    
    
    
    
                                }}
                            }
                            }}
                            catch(err) {
                              
                                console.log(err);
                               
                            }



                            break;

                            case 6:
                                id = board[j][k];
                                try{
                                  id = board[j][k];
                                    if(checkFlag === false) {
                                        yIndex = k;
                                      
                                    let oneLeft = id - 1;
                                    let twoLeft = id - 2;
                                    let z = yIndex;
                                    let idIndex = id;
                                    if(checkData.castlingWhiteLeft === true) {
                                    while(z >= 0) {
                                        z--;
                                        idIndex--;
                                        let piece = game[idIndex].pieceValue;
                                  
                                        
                                        if(z === 0) {
                                            let rookpiece = game[idIndex].pieceValue
                                            if(rookpiece === 5) {
                                                if(detectCheck(id, oneLeft) === false && detectCheck(id, twoLeft) === false) {
                                                let btn1 = document.getElementById(oneLeft);
                                                let btn2 = document.getElementById(twoLeft);
                                                btn1.classList.add('colorBlue');
                                                btn2.classList.add('colorBlue');
                                                }
                                                break;
                                            }
                                            else{
                                                break;
                                            }
                                        }
                                        else if(piece !== 0) {
                                            break;
                                        }
                                    }
                                    
                                    
                                }}
                           
                            
                            }
                                catch(err) {
                                    console.log(err);
                                }

                                try{
                                    id = board[j][k];
                                    if(checkFlag === false) {
                                   let yIndex = k;
                                    let oneRight = id + 1;
                                    let twoRight = id + 2;
                                    let z = yIndex;
                                    let idIndex = id;
                                    if(checkData.castlingWhiteRight === true) {
                                 
                                    while(z <= 7) {
                                        z++;
                                        idIndex++;
                                        let piece = game[idIndex].pieceValue;
                               
                                        
                                        if(z === 7) {
                                            let rookpiece = game[idIndex].pieceValue
                                            if(rookpiece === 5) {
                                                if(detectCheck(id, oneRight) === false && detectCheck(id, twoRight) === false) {
                                                let btn1 = document.getElementById(oneRight);
                                                let btn2 = document.getElementById(twoRight);
                                                btn1.classList.add('colorBlue');
                                                btn2.classList.add('colorBlue');
                                                }
                                                break;
                                            }
                                            else{
                                                break;
                                            }
                                        }
                                        else if(piece !== 0) {
                                            break;
                                        }
                                    }}

                                }}
                                catch(err) {
                                    console.log(err);
                                }
                                id = board[j][k];
                                let leftIndex = id - 1;
                                let rightIndex = id + 1;
                                let upIndex = id - 8;
                                let downIndex = id + 8;
                                let leftUpIndex = id - 9;
                               
                                try{
                                    let leftX = j;
                                    let leftY = k - 1;
                                    if(leftY >= 0 && leftX >= 0) {
                                        let btn1 = document.getElementById(leftIndex);
                                        let piece1 = game[leftIndex].pieceValue;
                                        if(checkFlag === false) {
                                         
                                              
                                                if(piece1 === 0) {
                                                    if( pieceBackedUp(leftIndex, leftX, leftY, 1) === false  && detectCheck(id, leftIndex) === false) {
                                                    btn1.classList.add('colorGreen');
                                                    }
                                                }
                                                else{
                                                    if(piece1 < 0) {
                                                    if(pieceBackedUp(leftIndex, leftX, leftY, 1) === false) {
                                                         btn1.classList.add('colorRed');
                                                    }}
                                                }
                                            
                                        }
                                        else{
                                            if(piece1 < 0) {
                                                if(btn1.classList.contains('colorCheck') && pieceBackedUp(leftIndex, leftX, leftY, 1) === false) {
                                                    btn1.classList.add('colorRed');
                                                    btn1.classList.remove('colorCheck');
                                                }
                                                
                                                else{
                                                    if(pieceBackedUp(leftIndex, leftX, leftY, 1) === false) {
                                                        btn1.classList.add('colorRed');
                                                    }
                                                }
                                            }
                                            else{
                                                if(btn1.classList.contains('colorCheck')) {
                                                    
                                                }
                                                else if(piece1 === 0  && pieceBackedUp(leftIndex, leftX, leftY, 1) === false  && detectCheck(id, leftIndex) === false){
                                                    btn1.classList.add('colorGreen');
                                                }
                                            }
                                        }
                                    } 
                                }catch(err) {
                                    console.log(err);
                                } 
                                
                                
                                try{
                                    let rightX = j;
                                    let rightY = k + 1;
                                    if(rightY <= 7) {
                                        let btn1 = document.getElementById(rightIndex);
                                        let piece1 = game[rightIndex].pieceValue;
                                        if(checkFlag === false) {
                                          
                                              
                                                if(piece1 === 0) {
                                                    if( pieceBackedUp(rightIndex, rightX, rightY, 1) === false ) {
                                                    btn1.classList.add('colorGreen');
                                                    }
                                                }
                                                else{
                                                    if(piece1 < 0) {
                                                    if(pieceBackedUp(rightIndex, rightX, rightY, 1) === false) {
                                                         btn1.classList.add('colorRed');
                                                    }}
                                                }
                                            
                                        }
                                        else{
                                            if(piece1 < 0) {
                                                if(btn1.classList.contains('colorCheck') && pieceBackedUp(rightIndex, rightX, rightY, 1) === false) {
                                                    btn1.classList.add('colorRed');
                                                    btn1.classList.remove('colorCheck')
                                                }
                                                else{
                                                    if(pieceBackedUp(rightIndex, rightX, rightY, 1) === false) {
                                                        btn1.classList.add('colorRed');
                                                    }
                                                }
                                            }
                                            else{
                                                if(btn1.classList.contains('colorCheck')) {
                                                    
                                                }
                                                else if(piece1 === 0   && pieceBackedUp(rightIndex, rightX, rightY, 1) === false  && detectCheck(id, rightIndex) === false){
                                                    btn1.classList.add('colorGreen');
                                                }
                                            }
                                        }
                                    }
                                }
                                catch(err) {
                                    console.log(err);
                                }


                                try{
                                    let upX = j - 1;
                                    let upY = k;
                                    if(upY >= 0 && upX >= 0) {
                                        let btn1 = document.getElementById(upIndex);
                                        let piece1 = game[upIndex].pieceValue;
                                        if(checkFlag === false) {
                                         
                                              
                                                if(piece1 === 0) {
                                                    if( pieceBackedUp(upIndex, upX, upY, 1) === false  ) {
                                                    btn1.classList.add('colorGreen');
                                                    }
                                                }
                                                else{
                                                    if(piece1 < 0) {
                                                    if(pieceBackedUp(upIndex, upX, upY, 1) === false) {
                                                        btn1.classList.add('colorRed');
                                                    }}
                                                }
                                            
                                        }
                                        else{
                                            if(piece1 < 0) {
                                                if(btn1.classList.contains('colorCheck') && pieceBackedUp(upIndex, upX, upY, 1) === false) {
                                                    btn1.classList.add('colorRed');
                                                    btn1.classList.remove('colorCheck');
                                                }
                                                else if(pieceBackedUp(upIndex, upX, upY, 1) === false) {
                                                    btn1.classList.add('colorRed');

                                                }
                                            }
                                            else{
                                               
                                               if(piece1 === 0  && pieceBackedUp(upIndex, upX, upY, 1) === false  && detectCheck(id, upIndex) === false){
                                                    btn1.classList.add('colorGreen');
                                                }
                                            }
                                        }
                                    }
                                }
                                catch(err) {
                                    console.log(err);
                                }


                                try{
                                    let downX = j + 1;
                                    let downY = k;
                                    if(downY <= 7 && downX <= 7) {
                                        let btn1 = document.getElementById(downIndex);
                                        let piece1 = game[downIndex].pieceValue;
                                        if(checkFlag === false) {
                                          
                                              
                                                if(piece1 === 0) {
                                                    if( pieceBackedUp(downIndex, downX, downY, 1) === false  ) {
                                                    btn1.classList.add('colorGreen');
                                                    }
                                                }
                                                else{
                                                    if(piece1 < 0) {
                                                    if(pieceBackedUp(downIndex, downX, downY, 1) === false) {    
                                                        btn1.classList.add('colorRed');
                                                    }}
                                                }
                                            
                                        }
                                        else{
                                            if(piece1 < 0) {
                                                if(btn1.classList.contains('colorCheck') && pieceBackedUp(downIndex, downX, downY, 1) === false) {
                                                    btn1.classList.add('colorRed');
                                                    btn1.classList.remove('colorCheck');
                                                }
                                                
                                                else if(pieceBackedUp(downIndex, downX, downY, 1) === false) {
                                                    btn1.classList.add('colorRed');
                                                    
                                                }
                                            }
                                            else{
                                               
                                                 if(piece1 === 0 && pieceBackedUp(downIndex, downX, downY, 1)===false  && detectCheck(id, downIndex) === false){
                                                    btn1.classList.add('colorGreen');
                                                }
                                            }
                                        }
                                    }
                                }
                                catch(err) {
                                    console.log(err);
                                }


                                try{
                                    id = board[j][k];
                                    
                                    let leftUpX = j - 1;
                                    let leftUpY = k - 1;
                                    leftUpIndex = id - 9;
                                    if(leftUpX >= 0 && leftUpY >= 0) {
                                        let btn1 = document.getElementById(leftUpIndex);
                                        let piece1 = game[leftUpIndex].pieceValue;
                                        if(checkFlag === false) {
                                           
                                              
                                                if(piece1 === 0) {
                                                   if( pieceBackedUp(leftUpIndex, leftUpX, leftUpY, 1)=== false  ) {
                                                    btn1.classList.add('colorGreen');
                                                   }
                                                
                                                }
                                                else{
                                                    if(piece1 < 0) {
                                                    if(pieceBackedUp(leftUpIndex, leftUpX, leftUpY, 1) === false) {
                                                        btn1.classList.add('colorRed');
                                                    }}
                                                }
                                            }
                                        
                                        else{
                                            if(piece1 < 0) {
                                                if(btn1.classList.contains('colorCheck') && pieceBackedUp(leftUpIndex, leftUpX, leftUpY, 1) === false) {
                                                    btn1.classList.add('colorRed');
                                                    btn1.classList.remove('colorCheck');
                                                }
                                                else{
                                                    if(pieceBackedUp(leftUpIndex,leftUpX, leftUpY, 1) === false){
                                                    btn1.classList.add('colorRed');
                                                    }
                                                }
                                            }
                                            else{
                                            
                                                 if(piece1 === 0 && pieceBackedUp(leftUpIndex, leftUpX, leftUpY, 1)=== false  && detectCheck(id, leftUpIndex) === false){
                                                    btn1.classList.add('colorGreen')
                                                }
                                            }
                                        }
                                    }
                                }
                                catch(err) {
                                    console.log(err);
                                }

                                id = board[j][k];
                                let rightUpIndex = id - 7;
                                try{
                                    
                                    let rightUpX = j - 1;
                                    let rightUpY = k + 1;
                                    if(rightUpX >= 0 && rightUpY <= 7) {
                                
                                        let piece1 = game[rightUpIndex].pieceValue;
                                        let btn1 = document.getElementById(rightUpIndex);
                                        if(checkFlag === false){
                                        if(piece1 === 0) {
                                            if( pieceBackedUp(rightUpIndex, rightUpX, rightUpY, 1)===false  ) {
                                            btn1.classList.add('colorGreen');
                                            }
                                        }
                                        else if(piece1 < 0) {
                                            if(pieceBackedUp(rightUpIndex, rightUpX, rightUpY, 1) === false) {
                                            btn1.classList.add('colorRed');
                                            }
                                            
                                            else if(pieceBackedUp(rightUpIndex, rightUpX, rightUpY, 1) === false) {
                                                btn1.classList.add('colorRed');
                                                
                                            }
                                            
                                        }

                                    }
                                    else {
                                        if(piece1 < 0) {
                                            if(btn1.classList.contains('colorCheck') && pieceBackedUp(rightUpIndex, rightUpX, rightUpY, 1) === false) {
                                                btn1.classList.add('colorRed');
                                                btn1.classList.remove('colorCheck');
                                            }
                                            else{
                                                if(pieceBackedUp(rightUpIndex,rightUpX, rightUpY, 1) === false ){
                                                btn1.classList.add('colorRed');
                                                }
                                            }
                                        }
                                        else{
                                        
                                             if(piece1 === 0 && pieceBackedUp(rightUpIndex, rightUpX, rightUpY, 1)===false  && detectCheck(id, rightUpIndex) === false){
                                                btn1.classList.add('colorGreen')
                                            }
                                        }
                                    }
                                    }
                                }
                                catch(err) {
                                    console.log(err);
                                }

                              
                                try{
                                    let leftDownIndex = id + 7;
                                    let leftDownX = j + 1;
                                    let leftDownY = k - 1;
                                    if(leftDownX <= 7 && leftDownY >= 0) {
                                        let piece1 = game[leftDownIndex].pieceValue;
                                        let btn1 = document.getElementById(leftDownIndex);
                                        if(checkFlag === false) {
                                            if(piece1 < 0 && pieceBackedUp(leftDownIndex, leftDownX, leftDownY, 1) === false) {
                                                btn1.classList.add('colorRed');
                                            }
                                            if(piece1 === 0  && pieceBackedUp(leftDownIndex, leftDownX, leftDownY, 1)=== false  ) {
                                                btn1.classList.add('colorGreen');
                                            }
                                        }
                                        else{
                                            if(piece1 < 0) {
                                                if(btn1.classList.contains('colorCheck') && pieceBackedUp(leftDownIndex, leftDownX, leftDownY, 1) === false) {
                                                    btn1.classList.add('colorRed');
                                                    btn1.classList.remove('colorCheck');
                                                }
                                                else{
                                                    if(pieceBackedUp(leftDownIndex, leftDownX, leftDownY, 1) === false) {
                                                        btn1.classList.add('colorRed');
                                                    }
                                                }
                                            }
                                            else{
                                                if(piece1 === 0 && pieceBackedUp(leftDownIndex, leftDownX, leftDownY, 1)===false  && detectCheck(id, leftDownIndex) === false) {
                                                    btn1.classList.add('colorGreen');
                                                }
                                            }
                                        }
                                    }
                                }
                                catch(err) {
                                    console.log(err);
                                }

                                try{
                                    let rightDownIndex = id + 9;
                                    let rightDownX = j + 1;
                                    let rightDownY = k + 1;
                                    if(rightDownX <= 7 && rightDownY <= 7) {
                                        let piece1 = game[rightDownIndex]?.pieceValue;
                                        let btn1 = document.getElementById(rightDownIndex);
                                        if(checkFlag === false) {
                                            if(piece1 < 0) {
                                                if(pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 1) === false) {
                                                    btn1.classList.add('colorRed');
                                                }
                                            }
                                            else if(piece1 === 0 && pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 1)===false) {
                                                btn1.classList.add('colorGreen');
                                            }
                                        }
                                        else{
                                            if(piece1 < 0) {
                                                if(btn1.classList.contains('colorCheck') && pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 1) === false) {
                                                    btn1.classList.add('colorRed');
                                                    btn1.classList.remove('colorCheck');
                                                }
                                                else{
                                                    if(pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 1) === false) {
                                                        console.log('rightDownIndex');
                                                        btn1.classList.add('colorRed');
                                                    }
                                                }
                                            }
                                            else{
                                                if(piece1 === 0  && pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 1)===false && detectCheck(id, rightDownIndex) === false) {
                                                    btn1.classList.add('colorGreen');
                                                }
                                            }
                                        }
                                    }

                                }
                                catch(err) {
                                    console.log(err);
                                }


                            break;

                            case 1:
                                try{
                                    xIndex = j;
                                    yIndex = k;
                                    id = board[j][k];
                            if(xIndex === 6) {
                                if(checkFlag === false) {
                                let oneUp = id - 8;
                                let twoUp = id - 16;
                                let pieceOneUp = [];
                                pieceOneUp.push(oneUp);
                                pieceOneUp.push(game[oneUp]?.pieceValue);
                                let pieceTwoUp = [];
                                pieceTwoUp.push(twoUp);
                                pieceTwoUp.push(game[twoUp]?.pieceValue);
                             
                                if(pieceOneUp[1] === 0) {
                                    let btn1 = document.getElementById(oneUp);
                                    if(pieceTwoUp[1] === 0) {

                                       
                                        let btn2 = document.getElementById(twoUp);
                                   
                                        if(detectCheck(id, oneUp) === false) {
                                        btn1.classList.add("colorGreen");
                                        }
                                        if(detectCheck(id, twoUp) === false) {
                                        btn2.classList.add("colorGreen");
                                        }
                                    }
                                    else{
                                        if(detectCheck(id, oneUp) === false) {
                                        btn1.classList.add("colorGreen");
                                        }
                                    }
                                } 
                                let diagonalOneLeftUp = id - 9;
                                let diagonalOneRightUp = id - 7;
                                let diagOneLeftX = j - 1;
                                let diagOneLeftY = k - 1;

                              
                               
                                if(diagOneLeftX >= 0 && diagOneLeftY >= 0) {
                                    let pieceDiagonalLeft = game[diagonalOneLeftUp]?.pieceValue;
                                if(pieceDiagonalLeft < 0)  {
                                    let btn2 = document.getElementById(diagonalOneLeftUp);
                                    if(detectCheck(id, diagonalOneLeftUp) === false) {
                                    btn2.classList.add('colorRed')
                                    }
                                }}
                                let diagOneRightX = j - 1;
                                let diagOneRightY = k + 1;
                                if(diagOneRightX >= 0 && diagOneRightY <= 7) {
                                    let pieceDiagonalRight = game[diagonalOneRightUp]?.pieceValue;
                                if(pieceDiagonalRight < 0) {
                                    
                                    let btn3 = document.getElementById(diagonalOneRightUp);
                                    if(detectCheck(id, diagonalOneRightUp) === false) {
                                    btn3.classList.add('colorRed');
                                    }}
                                }
                            }
                        else{

                            if(checkCount <= 1) {

                            let oneUp = id - 8;
                            let twoUp = id - 16;
                            let pieceOneUp = [];
                            pieceOneUp.push(oneUp);
                            pieceOneUp.push(game[oneUp].pieceValue);
                            let pieceTwoUp = [];
                            pieceTwoUp.push(twoUp);
                            pieceTwoUp.push(game[twoUp].pieceValue);
                            if(pieceOneUp[1] === 0) {
                                let btn1 = document.getElementById(oneUp);
                                if(pieceTwoUp[1] === 0) {

                                   
                                    let btn2 = document.getElementById(twoUp);
                                 
                                    if(btn2.classList.contains('colorCheck')) {
                                        btn2.classList.add('colorGreen');
                                        btn2.classList.remove('colorCheck');
                                    }
                                    if(btn1.classList.contains('colorCheck')) {
                                        btn1.classList.add('colorGreen');
                                        btn1.classList.remove('colorCheck');
                                    }
                                   
                                }
                                else{
                                  
                                }
                            } 
                          
                         
                            let diagOneLeftX = j - 1;
                            let diagOneLeftY = k - 1;

                            let diagOneRightX = j - 1;
                            let diagOneRightY = k + 1;
                            if(diagOneLeftX >= 0 && diagOneLeftY >= 0) {
                                let diagonalOneLeftUp = id - 9;

                            let pieceDiagonalLeft = game[diagonalOneLeftUp].pieceValue;
                        
                            if(pieceDiagonalLeft < 0)  {
                                let btn2 = document.getElementById(diagonalOneLeftUp);
                                if(btn2.classList.contains('colorCheck')) {
                                btn2.classList.add('colorRed')
                                btn2.classList.remove('colorCheck');
                                }}
                            }
                            if(diagOneRightX >= 0 && diagOneRightY <= 7) {
                                let diagonalOneRightUp = id - 7;


                                let pieceDiagonalRight = game[diagonalOneRightUp].pieceValue;

                             

                            if(pieceDiagonalRight < 0) {
                                let btn3 = document.getElementById(diagonalOneRightUp);
                                if(btn3.classList.contains('colorCheck')) {
                                btn3.classList.add('colorRed');
                                btn3.classList.remove('colorCheck');
                                }
                            }}

                        }}
                        }

                            else{
                                id = board[j][k];
                                if(checkFlag === false) {
                                let oneUp = id - 8;
                                let pieceOneUp = [];
                                pieceOneUp.push(oneUp);
                                pieceOneUp.push(game[oneUp].pieceValue);
                                if(pieceOneUp[1] === 0) {
                                    let btn1 = document.getElementById(oneUp);
                                    if(detectCheck(id, oneUp) === false) {
                                    btn1.classList.add("colorGreen");
                                    }
                                }
                                let diagonalLeftUpX = j - 1;
                                let diagLeftUpY = k - 1;
                                let diagonalOneLeftUp = id - 9;
                                let diagonalOneRightUp = id - 7;
                                let diagRightUpX = j - 1; 
                                let diagRightUpY = k + 1;
                              
                              
                                if(diagonalLeftUpX >= 0 && diagLeftUpY >= 0) {   
                                    let pieceDiagonalLeft = game[diagonalOneLeftUp].pieceValue;
                                if(pieceDiagonalLeft < 0)  {
                                    let btn2 = document.getElementById(diagonalOneLeftUp);
                                    if(detectCheck(id, diagonalOneLeftUp) === false) {
                                    btn2.classList.add('colorRed')
                                    }}
                                }
                                if(diagRightUpX >= 0 && diagRightUpY <= 7) {
                                    let pieceDiagonalRight = game[diagonalOneRightUp].pieceValue;
                                if(pieceDiagonalRight < 0) {
                                    let btn3 = document.getElementById(diagonalOneRightUp);
                                    if(detectCheck(id, diagonalOneRightUp) === false) {
                                    btn3.classList.add('colorRed');
                                    }
                                }}
                            }
                            else{
                                if(checkCount <= 1) {
                                let oneUp = id - 8;
                                let pieceOneUp = [];
                                pieceOneUp.push(oneUp);
                                pieceOneUp.push(game[oneUp].pieceValue);
                                if(pieceOneUp[1] === 0) {
                                    let btn1 = document.getElementById(oneUp);
                                    if(btn1.classList.contains('colorCheck')) {
                                        btn1.classList.add('colorGreen');
                                        btn1.classList.remove('colorCheck');
                                    }
                                  
                                }
                                let diagonalOneLeftUp = id - 9;
                                let diagonalOneRightUp = id - 7;
                                let pieceDiagonalLeft = game[diagonalOneLeftUp].pieceValue;
                                let pieceDiagonalRight = game[diagonalOneRightUp].pieceValue;
                                if(pieceDiagonalLeft < 0)  {
                                    let btn2 = document.getElementById(diagonalOneLeftUp);
                                    if(btn2.classList.contains('colorCheck')) {
                                    btn2.classList.add('colorRed')
                                    btn2.classList.remove('colorCheck');
                                    }
                                }
                                if(pieceDiagonalRight < 0) {
                                    let btn3 = document.getElementById(diagonalOneRightUp);
                                    if(btn3.classList.contains('colorCheck')) {
                                    btn3.classList.add('colorRed');
                                    btn3.classList.remove('colorCheck');
                                    }
                                }
                            }}}
                           
                        }catch(err) {
                            console.log(err);
                        }
                        break;

                        default:
                            break;

                    
       }}}
    }}}catch(err) {console.log(err);}
}


function pieceBackedUp(id, x, y, color) {
    let whitePiece = 1;
    let blackPiece = 0;
    if(color === blackPiece) {
        let j = x;
        let k = y;
        //check for rook & Queen backup
        //upwards
        try{
        let upAxis = id - 8;
        j -= 1;
        if(j >= 0) {
            let piece = game[upAxis].pieceValue;
            if(piece === 5 || piece === 10 || piece === 6) {
                return true;
            }
            if(piece === 0 || piece === -6) {
            while((piece === 0 || piece === -6) && j > 0) {
                j--;
                upAxis -= 8;
                piece = game[upAxis].pieceValue
            }
                if(piece === 5 || piece === 10) {
                    return true;
                }
            }
        }
        }catch(err) {
            console.log(err);
        }
        j = x;
        y = k;
        //downwards
        try{
            let downAxis = id + 8;
            j++;
            if(j <= 7) {
                let piece = game[downAxis].pieceValue;
                if(piece === 5 || piece === 10 || piece === 6) {
                    return true;
                }
                if(piece === 0 || piece === -6) {
                while((piece === 0 || piece === -6) && j < 7) {
                    j++;
                    downAxis +=  8;
                    piece = game[downAxis].pieceValue;
                }       
                    if(piece === 5 || piece === 10) {
                        return true;
                    }
                }
            }
        }
        catch(err) {
            console.log(err);
        }

        //left
        j = x;
        k = y;
        try{
        k--;
        if(k >= 0) {
        let leftAxis = id - 1;
        let piece = game[leftAxis].pieceValue;
        if(piece === 5 || piece === 10 || piece === 6) {
            return true;
        }
        if(piece === 0 || piece === -6) {
            while((piece === 0 || piece === -6) && k > 0) {
                k--;
                leftAxis--;
                piece = game[leftAxis].pieceValue;
            }
            if(piece === 5 || piece === 10) {
                return true;
            }
        }}
        }
        catch(err) {
            console.log(err);
        }

        //right
        j = x;
        k = y;
        k++;
        if(k <= 7) {
            let rightAxis = id + 1;
            let piece = game[rightAxis].pieceValue;
            if(piece === 5 || piece === 10 || piece === 6) {
                return true;
            }
            if(piece === 0 || piece === -6) {
                while((piece === 0 || piece === -6) && k < 7) {
                    k++;
                    rightAxis++;
                    piece = game[rightAxis].pieceValue;
                }
                if(piece === 5 || piece === 10) {
                    return true;
                }
            }
        }
        

        //diagonal check for bishop && queen
        //left up diagonal

        j = x;
        k = y;
       
        try{
            j--;
            k--;
            if(j >= 0 && k >= 0) {
                let leftUpDiagon = id - 9;
                let piece = game[leftUpDiagon].pieceValue;
                if(piece === 1 || piece === 3 || piece === 10 || piece === 6) {
                    return true;
                }
                if(piece === 0 || piece === -6) {
                    while((piece === 0 || piece === -6) && j > 0 && k > 0) {
                        if(piece === -6) {
                            break;
                        }
                        j--;
                        k--;
                        leftUpDiagon -= 9;
                        piece = game[leftUpDiagon].pieceValue;
                    }
                    if(piece === 3 || piece === 10) {
                        return true;
                    }
                }
            }
        }
        catch(err) {
            console.log(err);
        }

        //right up diagonal
        j = x;
        k = y;
        try{
            j--
            k++;
            if(j >= 0 && k <= 7) {
            let rightUpDiag = id - 7;
            let piece = game[rightUpDiag].pieceValue;
            if(piece === 1 || piece === 3 || piece === 10 || piece === 6) {
                return true;
            }
            if((piece === 0 || piece === -6)) {
                while((piece === 0 || piece === -6)&& j > 0 && k < 7) {
                    j--;
                    k++;
                    rightUpDiag -= 7;
                    piece = game[rightUpDiag].pieceValue;
                }
                if(piece === 3 || piece === 10) {
                    return true;
                }
            }
        }}
        catch(err) {
            console.log(err);
        }

        //left down diagonal
        j = x;
        k = y;
        try {
            j++;
            k--;
            if(j <= 7 && k >= 0) {
                let leftDownDiag = id + 7;
                let piece = game[leftDownDiag].pieceValue;
                if(piece === 3 || piece === 10 || piece === 6) {
                    return true;
                }

                if(piece === 0 || piece === -6) {
                    while((piece === 0 || piece === -6) && j <7 && k > 0) {
                        j++;
                        k--;
                        leftDownDiag += 7;
                        piece = game[leftDownDiag].pieceValue;
                    }
                    if(piece === 3 || piece === 10) {
                        return true;
                    }
                }
            }
        }
        catch(err) {
            console.log(err);
        }

        //right down diagonal
        j = x;
        k = y;
        try{
        j++;
        k++;
        if(j <= 7 && k <= 7) {
            let rightDownDiag = id + 9;
            let piece = game[rightDownDiag].pieceValue;
            if(piece === 3 || piece === 10 || piece === 6) {
                return true;
            }
            if(piece === 0 || piece === -6) {
                while((piece === 0 || piece === -6) && j < 7 && k < 7) {
                    j++;
                    k++;
                    rightDownDiag += 9;
                    piece = game[rightDownDiag].pieceValue;
                }
                if(piece === 3 || piece === 10) {
                    return true;
                }
            }
        }

    }catch(err) {
        console.log(err);
    }
    //KNIGHT backup
    j = x;
    k = y;
    try{
        j -= 2;
        k--;
        if(k >= 0 && j >= 0) {
            let upLeft = id - 17;
            let piece = game[upLeft].pieceValue;
            if(piece === 2) {
                return true;
            }
        }

    }catch(err) {
        console.log(err);
    }

    j = x;
    k = y;
    try{
        j--;
        k -= 2;
        if(j >= 0 && k >= 0) {
            let leftUp = id - 10;
            let piece = game[leftUp].pieceValue;
            if(piece === 2) {
                return true;
            }
        }
    }
    catch(err) {
        console.log(err);
    }

    j = x;
    k = y;
    try{
        j++;
        k -= 2;
        if(j <= 7 && k >= 0) {
            let leftDown = id + 6;
            let piece = game[leftDown].pieceValue;
            if(piece === 2) {
                return true;
            }
        }

    }
    catch(err) {
        console.log(err);
    }

    j = x;
    k = y;
    try{
        j += 2;
        k--;
        if(j <= 7 && k >= 0) {
            let downLeft = id + 15;
            let piece = game[downLeft].pieceValue;
            if(piece === 2) {
                return true;
            }
        }
    }
    catch(err) {
        console.log(err);
    }

    j = x;
    k = y;
    try{
        j += 2;
        k++;
        if(j <= 7 && k <= 7) {
            let rightDown = id + 17;
            let piece = game[rightDown]?.pieceValue;
            if(piece === 2) {
                return true;
            }
        }
    }
    catch(err) {
        console.log(err);
    }

    j = x;
    k = y;
    try{
        j++;
        k += 2;
        if(j <= 7 && k <= 7) {
            let downRight = id + 10;
            let piece = game[downRight]?.pieceValue;
            if(piece === 2) {
                return true;
            }
        }
    }
    catch(err) {
        console.log(err);
    }

    j = x;
    k = y;
    try{
        j--;
        k += 2;
        if(j >= 0 && k <= 7) {
            let upRight = id - 6;
            let piece = game[upRight]?.pieceValue;
            if(piece === 2) {
                return true;
            }

        }
    }
    catch(err) {
        console.log(err);
    }


    j = x;
    k = y;
    try{
        j -= 2;
        k++;
        if(j >= 0 && k <= 7) {
            let rightUp = id - 15;
            let piece = game[rightUp]?.pieceValue;
            if(piece === 2) {
                return true;
            }
        }
    }
    catch(err) {
        console.log(err);
    }
    
    return false;

    }
   else if(color === whitePiece) {
        let j = x;
        let k = y;
  
        //check for rook & Queen backup
        //upwards
        try{
        let upAxis = id - 8;
        j -= 1;
        if(j >= 0) {
            let piece = game[upAxis].pieceValue;
            if(piece === -5 || piece === -10 || piece === -6) {
                return true;
            }
            if(piece === 0 || piece === 6) {
            while((piece === 0 || piece === 6) && j > 0) {
                j--;
                upAxis -= 8;
                piece = game[upAxis].pieceValue
            }
                if(piece === -5 || piece === -10) {
                    return true;
                }
            }
        }
        }catch(err) {
            console.log(err);
        }
        j = x;
        y = k;
        //downwards
        try{
            let downAxis = id + 8;
            j++;
            if(j <= 7) {
                let piece = game[downAxis].pieceValue;
                if(piece === -5 || piece === -10 || piece === -6) {
                    return true;
                }
                if(piece === 0 || piece === 6) {
                while((piece === 0 || piece === 6) && j < 7) {
                    j++;
                    downAxis +=  8;
                    piece = game[downAxis].pieceValue;
                }       
                    if(piece === -5 || piece === -10) {
                        return true;
                    }
                }
            }
        }
        catch(err) {
            console.log(err);
        }

        //left
        j = x;
        k = y;
        try{
        k--;
        if(k >= 0) {
        let leftAxis = id - 1;
        let piece = game[leftAxis].pieceValue;
        if(piece === -5 || piece === -10 || piece === -6) {
            return true;
        }
        if(piece === 0 || piece === 6) {
            while((piece === 0 || piece === 6) && k > 0) {
                k--;
                leftAxis--;
                piece = game[leftAxis].pieceValue;
            }
      
            if(piece === -5 || piece === -10) {
                return true;
            }
        }}
        }
        catch(err) {
            console.log(err);
        }

        //right
        j = x;
        k = y;

        k++;
     
        if(k <= 7) {
            let rightAxis = id + 1;
            let piece = game[rightAxis].pieceValue;
            if(piece === -5 || piece === -10 || piece === -6) {
          
                return true;
            }
            if(piece === 0 || piece === 6) {
                while((piece === 0 || piece === 6) && k < 7) {
                
                    k++;
                    rightAxis++;
                    piece = game[rightAxis].pieceValue;
                }
            
                if(piece === -5 || piece === -10) {
                    return true;
                }
            }
        }
        

        //diagonal check for bishop && queen
        //left up diagonal

        j = x;
        k = y;
       
        try{
            j--;
            k--;
            if(j >= 0 && k >= 0) {
                let leftUpDiagon = id - 9;
                let piece = game[leftUpDiagon].pieceValue;
                if(piece === -1 || piece === -3 || piece === -10 || piece === -6) {
                    return true;
                }
                if(piece === 0 || piece === 6) {
                    while((piece === 0 || piece === 6) && j > 0 && k > 0) {
                        if(piece === 6) {
                            break;
                        }
                        j--;
                        k--;
                        leftUpDiagon -= 9;
                        piece = game[leftUpDiagon].pieceValue;
                    }
                    if(piece === -3 || piece === -10) {
                        return true;
                    }
                }
            }
        }
        catch(err) {
            console.log(err);
        }

        //right up diagonal
        j = x;
        k = y;
        try{
            j--
            k++;
            if(j >= 0 && k <= 7) {
            let rightUpDiag = id - 7;
            let piece = game[rightUpDiag].pieceValue;
            if(piece === -1 || piece === -3 || piece === -10 || piece === -6) {
                return true;
            }
            if((piece === 0 || piece === 6)) {
                while((piece === 0 || piece === 6)&& j < 7 && k < 7) {
                    j--;
                    k++;
                    rightUpDiag -= 7;
                    piece = game[rightUpDiag].pieceValue;
                }
                if(piece === -3 || piece === -10) {
                    return true;
                }
            }
        }}
        catch(err) {
            console.log(err);
        }

        //left down diagonal
        j = x;
        k = y;
        try {
            j++;
            k--;
            if(j <= 7 && k >= 0) {
                let leftDownDiag = id + 7;
                let piece = game[leftDownDiag].pieceValue;
                if(piece === -3 || piece === -10 || piece === -6) {
                    return true;
                }

                if(piece === 0 || piece === 6) {
                    while((piece === 0 || piece === 6) && j < 7 && k > 0) {
                        j++;
                        k--;
                        leftDownDiag += 7;
                        piece = game[leftDownDiag].pieceValue;
                    }
                    if(piece === -3 || piece === -10) {
                        return true;
                    }
                }
            }
        }
        catch(err) {
            console.log(err);
        }

        //right down diagonal
        j = x;
        k = y;
        try{
        j++;
        k++;
        if(j <= 7 && k <= 7) {
            let rightDownDiag = id + 9;
            let piece = game[rightDownDiag].pieceValue;
            if(piece === -3 || piece === -10 || piece === -6) {
                return true;
            }
            if(piece === 0 || piece === 6) {
                while((piece === 0 || piece === 6) && j < 7 && k < 7) {
                    j++;
                    k++;
                    rightDownDiag += 9;
                    piece = game[rightDownDiag].pieceValue;
                }
                if(piece === -3 || piece === -10) {
                    return true;
                }
            }
        }

    }catch(err) {
        console.log(err);
    }
    //KNIGHT backup
    j = x;
    k = y;
    try{
        k--;
        j -= 2;
        if(k >= 0 && j >= 0) {
            let upLeft = id - 17;
            let piece = game[upLeft].pieceValue;
            if(piece === -2) {
                return true;
            }
        }

    }catch(err) {
        console.log(err);
    }

    j = x;
    k = y;
    try{
        j--;
        k -= 2;
        if(j >= 0 && k >= 0) {
            let leftUp = id - 10;
            let piece = game[leftUp].pieceValue;
            if(piece === -2) {
                return true;
            }
        }
    }
    catch(err) {
        console.log(err);
    }

    j = x;
    k = y;
    try{
        j++;
        k -= 2;
        if(j <= 7 && k >= 0) {
            let leftDown = id + 6;
            let piece = game[leftDown].pieceValue;
            if(piece === -2) {
                return true;
            }
        }

    }
    catch(err) {
        console.log(err);
    }

    j = x;
    k = y;
    try{
        j += 2;
        k--;
        if(j <= 7 && k >= 0) {
            let downLeft = id + 15;
            let piece = game[downLeft].pieceValue;
            if(piece === -2) {
                return true;
            }
        }
    }
    catch(err) {
        console.log(err);
    }

    j = x;
    k = y;
    try{
        j += 2;
        k++;
        if(j <= 7 && k <= 7) {
            let rightDown = id + 17;
            let piece = game[rightDown].pieceValue;
            if(piece === -2) {
                return true;
            }
        }
    }
    catch(err) {
        console.log(err);
    }

    j = x;
    k = y;
    try{
        j++;
        k += 2;
        if(j <= 7 && k <= 7) {
            let downRight = id + 10;
            let piece = game[downRight].pieceValue;
            if(piece === -2) {
                return true;
            }
        }
    }
    catch(err) {
        console.log(err);
    }

    j = x;
    k = y;
    try{
        j--;
        k += 2;
        if(j >= 0 && k <= 7) {
            let upRight = id - 6;
            let piece = game[upRight].pieceValue;
            if(piece === -2) {
                return true;
            }

        }
    }
    catch(err) {
        console.log(err);
    }


    j = x;
    k = y;
    try{
        j -= 2;
        k++;
        if(j >= 0 && k <= 7) {
            let rightUp = id - 15;
            let piece = game[rightUp].pieceValue;
            if(piece === -2) {
                return true;
            }
        }
    }
    catch(err) {
        console.log(err);
    }
    
    return false;

}
}

    function handle2PlayerGame() {
    
      let payload = []
        for(let j = 0; j < 64; j++) {payload.push(j);
            payload.push(initGame[j]);
        }
       
        payload.push(1);
        let gameId = "";
        payload.push(gameId);

        dispatch(getStateActionCreator(payload));
        let btn = document.getElementById('startGame');
        for(let j = 0; j < btn.classList.length; j++) {
            btn.classList.remove(btn.classList[j]);
        }
        btn.classList.add('hide');
        addPieces();
        setTimeout(() => {
            connect();
        },55);
       
       
        
   
    }

    function checkmate(color) {
        if(color === 1) {
        let legalMoves = 0;
        for(let j = 0; j < 8; j++) {
            for(let k = 0; k < 8; k++) {
                try{
                let id = board[j][k];
                let piece = game[id]?.pieceValue;
                if(piece === 6) {
                    let leftIndex = id - 1;
                    let rightIndex = id + 1;
                    let upIndex = id - 8;
                    let downIndex = id + 8;
                    let leftUpIndex = id - 9;
                   
                    try{
                        let leftX = j;
                        let leftY = k - 1;
                        if(leftY >= 0 && leftX >= 0) {
                            let btn1 = document.getElementById(leftIndex);
                            let piece1 = game[leftIndex].pieceValue;
                                if(piece1 < 0) {
                                    if(btn1.classList.contains('colorCheck') && pieceBackedUp(leftIndex, leftX, leftY, 1) === false) {
                                        legalMoves++;
                                    }
                                    else{
                                        if(pieceBackedUp(leftIndex, leftX, leftY, 1)===false) {
                                            legalMoves++;
                                        }
                                    }
                                }
                                else{
                                    if(btn1.classList.contains('colorCheck')) {
                                        
                                    }
                                    else if(piece1 === 0  && pieceBackedUp(leftIndex, leftX, leftY, 1)===false && detectCheck(id, leftIndex) === false){
                                       legalMoves++;
                                    }
                                }
                            }
                    }catch(err) {
                        console.log(err);
                    } 
                    
                    
                    try{
                        let rightX = j;
                        let rightY = k + 1;
                        if(rightY <= 7 && rightX <= 7) {
                            let btn1 = document.getElementById(rightIndex);
                            let piece1 = game[rightIndex].pieceValue;
                           
                                if(piece1 < 0) {
                                    if(btn1.classList.contains('colorCheck') && pieceBackedUp(rightIndex, rightX, rightY, 1) === false) {
                                      legalMoves++;
                                    }
                                    else{
                                        if(pieceBackedUp(rightIndex, rightX, rightY, 1) === false){
                                            legalMoves++;
                                        }
                                    }
                                }
                                else{
                                    if(btn1.classList.contains('colorCheck')) {
                                        
                                    }
                                    else if(piece1 === 0  && pieceBackedUp(rightIndex, rightX, rightY, 1) === false && detectCheck(id, rightIndex) === false){
                                        legalMoves++;
                                    }
                                }
                            }
                    }
                    catch(err) {
                        console.log(err);
                    }


                    try{
                        let upX = j - 1;
                        let upY = k;
                        if(upY >= 0 && upX >= 0) {
                            let btn1 = document.getElementById(upIndex);
                            let piece1 = game[upIndex].pieceValue;
                           
                                if(piece1 < 0) {
                                    if(btn1.classList.contains('colorCheck') && pieceBackedUp(upIndex, upX, upY, 1) === false) {
                                        legalMoves++;
                                    }
                                    else if(pieceBackedUp(upIndex, upX, upY, 1) === false) {
                                      legalMoves++;

                                    }
                                }
                                else{
                                    if(btn1.classList.contains('colorCheck')) {
                                        
                                    }
                                    else if(piece1 === 0  && pieceBackedUp(upIndex, upX, upY, 1) === false && detectCheck(id, upIndex) === false){
                                       legalMoves++;
                                    }
                                }
                            }
                        
                    }
                    catch(err) {
                        console.log(err);
                    }


                    try{
                        let downX = j + 1;
                        let downY = k;
                        if(downY <= 7 && downX <= 7) {
                            let btn1 = document.getElementById(downIndex);
                            let piece1 = game[downIndex].pieceValue;
                          
                                if(piece1 < 0) {
                                    if(btn1.classList.contains('colorCheck') && pieceBackedUp(downIndex, downX, downY, 1) === false) {
                                       legalMoves++;
                                    }
                                    
                                    else if(pieceBackedUp(downIndex, downX, downY, 1) === false) {
                                       legalMoves++;
                                        
                                    }
                                }
                                else{
                                    if(btn1.classList.contains('colorCheck')) {
                                        
                                    }
                                    else if(piece1 === 0  && pieceBackedUp(downIndex, downX, downY, 1) === false && detectCheck(id, downIndex) === false){
                                       legalMoves++;
                                    }
                                }
                            
                        }
                    }
                    catch(err) {
                        console.log(err);
                    }


                    try{
                        let leftUpX = j - 1;
                        let leftUpY = k - 1;
                        if(leftUpX >= 0 && leftUpY >= 0) {
                            let btn1 = document.getElementById(leftUpIndex);
                            let piece1 = game[leftUpIndex].pieceValue;
                          
                                if(piece1 < 0) {
                                    if(btn1.classList.contains('colorCheck') && pieceBackedUp(leftUpIndex, leftUpX, leftUpY, 1) === false) {
                                      legalMoves++;
                                    }
                                    else{
                                        if(pieceBackedUp(leftUpIndex,leftUpX, leftUpY, 1) === false){
                                       legalMoves++;
                                        }
                                    }
                                }
                                else{
                                
                                     if(piece1 === 0  && pieceBackedUp(leftUpIndex, leftUpX, leftUpY, 1) === false && detectCheck(id, leftUpIndex) === false){
                                       legalMoves++;
                                    }
                                }
                            
                        }
                    }
                    catch(err) {
                        console.log(err);
                    }

                    let rightUpIndex = id - 7;
                    try{
                        
                        let rightUpX = j - 1;
                        let rightUpY = k + 1;
                        if(rightUpX >= 0 && rightUpY <= 7) {
                    
                            let piece1 = game[rightUpIndex].pieceValue;
                            let btn1 = document.getElementById(rightUpIndex);
                          
                            if(piece1 < 0) {
                                if(btn1.classList.contains('colorCheck') && pieceBackedUp(rightUpIndex, rightUpX, rightUpY, 1) === false) {
                                   legalMoves++;
                                }
                                else{
                                    if(pieceBackedUp(rightUpIndex,rightUpX, rightUpY, 1) === false){
                                   legalMoves++;
                                    }
                                }
                            }
                            else{
                            
                                 if(piece1 === 0  && pieceBackedUp(rightUpIndex, rightUpX, rightUpY, 1) === false && detectCheck(id, rightUpIndex) === false){
                                   legalMoves++;
                                }
                            }
                        
                        }
                    }
                    catch(err) {
                        console.log(err);
                    }

                  
                    try{
                        let leftDownIndex = id + 7;
                        let leftDownX = j + 1;
                        let leftDownY = k - 1;
                        if(leftDownX <= 7 && leftDownY >= 0) {
                            let piece1 = game[leftDownIndex].pieceValue;
                            let btn1 = document.getElementById(leftDownIndex);
                        
                                if(piece1 < 0) {
                               
                                    if(btn1.classList.contains('colorCheck') && pieceBackedUp(leftDownIndex, leftDownX, leftDownY, 1) === false) {
                                       legalMoves++;
                                    }
                                    else{
                                        if(pieceBackedUp(leftDownIndex, leftDownX, leftDownY, 1) === false) {
                                          legalMoves++;
                                        }
                                    }
                                }
                                else{
                                    if(piece1 === 0  && pieceBackedUp(leftDownIndex, leftDownX, leftDownY, 1) === false && detectCheck(id, leftDownIndex) === false) {
                                       legalMoves++;
                                    }
                                }
                            
                        }
                    }
                    catch(err) {
                        console.log(err);
                    }

                    try{
                        let rightDownIndex = id + 9;
                        let rightDownX = j + 1;
                        let rightDownY = k + 1;
                        if(rightDownX <= 7 && rightDownY <= 7) {
                            let piece1 = game[rightDownIndex]?.pieceValue;
                            let btn1 = document.getElementById(rightDownIndex);
                           
                         
                      
                                if(piece1 < 0) {
                                    if(btn1.classList.contains('colorCheck') && pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 1) === false) {
                                      legalMoves++;
                                    }
                                    else{
                                        if(pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 1) === false) {
                                           legalMoves++;
                                        }
                                    }
                                }
                                else{
                                    if(piece1 === 0  && pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 1)===false && detectCheck(id, rightDownIndex) === false) {
                                      legalMoves++;
                                    }
                                }
                            
                        }

                    }
                    catch(err) {
                        console.log(err);
                    }
                }
                else {
                    switch(piece) {
                        case 1:
                            try{
                             
                             let   xIndex = j;
                         
                                id = board[j][k];
                        if(xIndex === 6) {
                         

                        if(checkCount <= 1) {

                        let oneUp = id - 8;
                        let twoUp = id - 16;
                        let pieceOneUp = [];
                        pieceOneUp.push(oneUp);
                        pieceOneUp.push(game[oneUp].pieceValue);
                        let pieceTwoUp = [];
                        pieceTwoUp.push(twoUp);
                        pieceTwoUp.push(game[twoUp].pieceValue);
                        
                        if(pieceOneUp[1] === 0) {
                            let btn1 = document.getElementById(oneUp);
                            if(pieceTwoUp[1] === 0) {

                               
                                let btn2 = document.getElementById(twoUp);
                             
                                if(btn2.classList.contains('colorCheck')) {
                                  legalMoves++;
                                }
                                if(btn1.classList.contains('colorCheck')) {
                                    legalMoves++;
                                }
                               
                            }
                            
                      
                     
                        let diagOneLeftX = j - 1;
                        let diagOneLeftY = k - 1;

                        let diagOneRightX = j - 1;
                        let diagOneRightY = k + 1;
                        if(diagOneLeftX >= 0 && diagOneLeftY >= 0) {
                            let diagonalOneLeftUp = id - 9;

                        let pieceDiagonalLeft = game[diagonalOneLeftUp].pieceValue;
                    
                        if(pieceDiagonalLeft < 0)  {
                            let btn2 = document.getElementById(diagonalOneLeftUp);
                            if(btn2.classList.contains('colorCheck')) {
                                legalMoves++;
                            }}
                        }
                        if(diagOneRightX >= 0 && diagOneRightY <= 7) {
                            let diagonalOneRightUp = id - 7;


                            let pieceDiagonalRight = game[diagonalOneRightUp].pieceValue;

                         

                        if(pieceDiagonalRight < 0) {
                            let btn3 = document.getElementById(diagonalOneRightUp);
                            if(btn3.classList.contains('colorCheck')) {
                           legalMoves++;
                            }
                        }}

                    }}
                    }

                        else{
                            id = board[j][k];
                      
                            if(checkCount <= 1) {
                            let oneUp = id - 8;
                            let pieceOneUp = [];
                            pieceOneUp.push(oneUp);
                            pieceOneUp.push(game[oneUp].pieceValue);
                            if(pieceOneUp[1] === 0) {
                                let btn1 = document.getElementById(oneUp);
                                if(btn1.classList.contains('colorCheck')) {
                                   legalMoves++;
                                }
                              
                            }
                            let diagonalOneLeftUp = id - 9;
                            let diagonalOneRightUp = id - 7;
                            let pieceDiagonalLeft = game[diagonalOneLeftUp].pieceValue;
                            let pieceDiagonalRight = game[diagonalOneRightUp].pieceValue;
                            if(pieceDiagonalLeft < 0)  {
                                let btn2 = document.getElementById(diagonalOneLeftUp);
                                if(btn2.classList.contains('colorCheck')) {
                                    legalMoves++;
                                }
                            }
                            if(pieceDiagonalRight < 0) {
                                let btn3 = document.getElementById(diagonalOneRightUp);
                                if(btn3.classList.contains('colorCheck')) {
                                    legalMoves++;
                                }
                            }
                        }}}
                       
                    catch(err) {
                        console.log(err);
                    }
                    break;

                   
                        

                        case 2:
                            try{
                            let twoUpRight = id - 15;
                            let twoUpLeft = id - 17;
                            let twoLeftDown = id + 15;
                            let twoRightDown = id + 17;
                          let  xIndex = j;
                        let    yIndex = k;
                            xIndex += 2;
                            yIndex--;
                            if(xIndex <= 7 && yIndex >= 0) {
                   
                            if(checkCount <= 1) {
    
                                let pieceDownLeft = game[twoLeftDown].pieceValue;
                                let btn1 = document.getElementById(twoLeftDown);
                                if(pieceDownLeft === 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                   legalMoves++;
                                   
                                    }
                                }
                                else if(pieceDownLeft < 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                       legalMoves++;
                                    }
                                }
                            }
                        }
                        xIndex = j;
                        yIndex = k;
                             xIndex = j - 2;
                             yIndex = k + 1;
                             if(xIndex >= 0 && yIndex <= 7) {  
                                if(checkCount <= 1) {
                                    let pieceUpRight = game[twoUpRight].pieceValue;
                                    let btn1 = document.getElementById(twoUpRight);
                                   
                                     if(pieceUpRight < 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                           legalMoves++;
                                        }
                                    }
                                    else if(pieceUpRight === 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                           legalMoves++;
                                        }
                                    }
                                }
                             }
                            
                            xIndex = j;
                            yIndex = k;
                            xIndex -= 2;
                            yIndex--;
                            if(xIndex >= 0 && yIndex >= 0) {
                                if(checkCount <= 1) {
                        
                                    let pieceUpLeft = game[twoUpLeft].pieceValue;
                                    let btn1 = document.getElementById(twoUpLeft);
                                   
                                 if(pieceUpLeft < 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                      legalMoves++;
                                    }
                                    }
                                    else if(pieceUpLeft === 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                            legalMoves++;
                                        }
                                    }
                                }
                            }

                            xIndex = j;
                            yIndex = k;
                            xIndex += 2;
                            yIndex++;
                            if(xIndex <= 7 && yIndex <= 7) {
                                if(checkCount <= 1) {
                                let pieceDownRight = game[twoRightDown].pieceValue;
                                let btn1 = document.getElementById(twoRightDown);
                               
                                 if(pieceDownRight < 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                       legalMoves++;
                                    }
                                }
                                else if(pieceDownRight === 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                       legalMoves++;
                                    }
                                }
                            }}
                        
    
                            
    
                            xIndex = j;
                            yIndex = k;
                            xIndex--;
                            yIndex -= 2;
                            let leftUp = id - 10;
                            if(xIndex >= 0 && yIndex >= 0) {
                              
                                if(checkCount <= 1) {
                                let pieceLeftUp = game[leftUp].pieceValue;
                                let btn1 = document.getElementById(leftUp);
                               
                                if(pieceLeftUp < 0) {
                                if(btn1.classList.contains('colorCheck')) {
                                  legalMoves++;
                                }}
                                else if(pieceLeftUp === 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                       legalMoves++;
                                    }
                                }
                            }
                        }
                            xIndex = j;
                            yIndex = k;
                            xIndex--;
                            yIndex += 2;
                            let rightUp = id - 6;
                            if(xIndex >= 0 && yIndex <= 7) {
                               
                                if(checkCount <= 1) {
                                let pieceRight = game[rightUp].pieceValue;
                                let btn1 = document.getElementById(rightUp);
                               
                                 if(pieceRight < 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                       legalMoves++;
                                    }
                                }
                                else if(pieceRight === 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                      legalMoves++;
                                    }
                                }
                            }
                        }
                            
    
                            xIndex = j;
                            yIndex = k;
                            xIndex++;
                            yIndex -= 2;
                            let leftTwoDown = id + 6;
                            if(xIndex <= 7 && yIndex >= 0) {
                              
                       
                                if(checkCount <= 1) {
                                let pieceLeftTwoDown = game[leftTwoDown].pieceValue;
                                let btn1 = document.getElementById(leftTwoDown);
                                
                                 if(pieceLeftTwoDown < 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                       legalMoves++;
                                    }
                                }
                                else if(pieceLeftTwoDown === 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                       legalMoves++;
                                    }
                                }
                            }
    
                            }
    
                            xIndex = j;
                            yIndex = k;
                            xIndex++;
                            yIndex += 2;
                            let rightTwoDown = id + 10;
                            if(xIndex <= 7 && yIndex <= 7) {
                               
                                if(checkCount <= 1) {
                                let pieceRightTwoDown = game[rightTwoDown].pieceValue;
                                let btn1 = document.getElementById(rightTwoDown);
                                
                                 if(pieceRightTwoDown < 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                        legalMoves++;
                                    }
                                }
                                else if(pieceRightTwoDown === 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                       legalMoves++;
                                    }
                                }
                            }
                        }
    


                        }catch(err) {
                            console.log(err);
                        }

                        break;

                        case 10:

                        try{

                          let  xIndex = j;
                         let   yIndex = k;
                        
                            if(checkCount <= 1) {
                                xIndex--;
                                yIndex--;
                                if(xIndex >= 0 && yIndex >= 0) {
                                    let diagLeftUp = id - 9;

                            let pieceLeftUp = game[diagLeftUp]?.pieceValue
                          
                            while(pieceLeftUp === 0 || pieceLeftUp < 0) {
                                 
                                let btnLeftUp = document.getElementById(diagLeftUp);
                               
                                if(pieceLeftUp < 0) {
                                    if(btnLeftUp.classList.contains('colorCheck')) {
                                        legalMoves++;
                                    }
                                    break;
                                }
                                else if(pieceLeftUp === 0) {
                                    if(btnLeftUp.classList.contains('colorCheck')) {
                                        legalMoves++;
                                    }
                                }
                                diagLeftUp -= 9;
                                xIndex--;
                                yIndex--;
                                if(xIndex < 0 || yIndex < 0) {
                                    break;
                                }
                                pieceLeftUp = game[diagLeftUp]?.pieceValue
                            }

                        }
                        }}
                        
                        catch(err) {
                         
                            console.log(err);
                           
                        }


                        try{

                           let xIndex = j;
                          let  yIndex = k;
                          
            
                    
                        if(checkCount <= 1) {
                        xIndex = j;
                        yIndex = k;
                        xIndex--;
                        yIndex++;
                        if(xIndex >= 0 && yIndex <= 7) {
                        let diagRightUp = id - 7;
                       
                        let pieceRightUp = game[diagRightUp]?.pieceValue
                      
                        while(pieceRightUp === 0 || pieceRightUp < 0) {
                            
                             
                            let btnRightUp = document.getElementById(diagRightUp);
                           
                            if(pieceRightUp < 0) {
                           
                            if(btnRightUp.classList.contains('colorCheck')) {
                               legalMoves++;
                            }
                            break;
                        }
                            else if(pieceRightUp === 0) {
                                if(btnRightUp.classList.contains('colorCheck')) {
                                   legalMoves++;
                                }
                            }
                                
                            
                            diagRightUp -= 7;
                            xIndex--;
                            yIndex++;
                            if(xIndex <0 || yIndex > 7) {
                                break;
                            }
                            pieceRightUp = game[diagRightUp]?.pieceValue
                        }


                    }}}
                    

                        catch(err) {
                           
                            console.log(err);
                           
                        }


                        try{

                          let  xIndex = j;
                         let   yIndex = k;

                  
                        


                            if(checkCount <= 1) {
                           
                            xIndex++;
                            yIndex++;

                            if(xIndex <= 7 && yIndex <= 7) {
                            let diagRightDown = id + 9;


                            let pieceRightDown = game[diagRightDown]?.pieceValue
                          
                            while(pieceRightDown === 0 || pieceRightDown < 0) {
                                
                                
                                let btnRightDown = document.getElementById(diagRightDown);
                               
                                if(pieceRightDown < 0) {
                                
                                if(btnRightDown.classList.contains('colorCheck')) {
                                  legalMoves++;
                                }
                                    break;
                                }

                                else if(pieceRightDown === 0) {
                                    if(btnRightDown.classList.contains('colorCheck')) {
                                      legalMoves++;
                                    }
                                }
                                diagRightDown += 9;
                                xIndex++;
                                yIndex++;
                                if(xIndex > 7 || yIndex > 7) {
                                    break;
                                }
                                pieceRightDown = game[diagRightDown]?.pieceValue


                        }
                        }}
                    }
                        catch(err) {
                            console.log(err);
                        }


                        try{

                          let  xIndex = j;
                        let    yIndex = k;
                       
                            if(checkCount <= 1) {
                                xIndex++;
                                yIndex--;
                                if(xIndex <= 7 && yIndex >= 0) {
                          


                            let diagLeftDown = id + 7;

                            let pieceLeftDown= game[diagLeftDown]?.pieceValue
                           
                            while(pieceLeftDown === 0 || pieceLeftDown < 0) {
                            
                                  
                                let btnLeftDown = document.getElementById(diagLeftDown);
                               
                                if(pieceLeftDown < 0) {
                               
                                if(btnLeftDown.classList.contains('colorCheck')) {
                                  legalMoves++;
                                }
                                    break;
                                }
                                else if(pieceLeftDown === 0) {
                                    if(btnLeftDown.classList.contains('colorCheck')) {
                                       legalMoves++;
                                    }
                                } 
                                diagLeftDown += 7;
                                xIndex++;
                                yIndex--;
                                if(xIndex > 7 || yIndex < 0) {
                                    break;
                                }
                                pieceLeftDown= game[diagLeftDown]?.pieceValue




                            }}}

                        
                        }
                        catch(err) {
                           
                            console.log(err);
                         
                        }

                       
                        try{
                          let  xIndex = j;
                   

             
                            if(checkCount <= 1) {
                                xIndex--;
                                if(xIndex >= 0) {
                            let  oneUp = id - 8;
                         
                            let pieceUp = game[oneUp]?.pieceValue;
                        
                            while(pieceUp === 0 || pieceUp < 0) {
                              
                                let btn1 = document.getElementById(oneUp);
                              
                                 if(pieceUp < 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                   legalMoves++;
                                    }
                                    break;
                                }
                                else if(pieceUp === 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                      legalMoves++;
                                    }
                                }
                                oneUp -= 8;
                                xIndex--;
                                if(xIndex < 0) {
                                    break;
                                }
                                pieceUp = game[oneUp]?.pieceValue;
                            }}
                        }


                        }catch(err) {
                            console.log(err);
                           
                        }
                      
                        try{
                            let xIndex = j;
                    

                            if(checkCount <= 1) {
                                xIndex++;
                                if(xIndex <= 7) {
                            let   oneDown = id + 8;
                        
                            let pieceDown = game[oneDown]?.pieceValue;
                           
                            while(pieceDown === 0 || pieceDown < 0) {
                              
                                let btn1 = document.getElementById(oneDown);
                              
                                 if(pieceDown < 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                   legalMoves++;
                                    }
                                    break;
                                
                                }
                                else if(pieceDown === 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                     legalMoves++;
                                        
                                    }
                                }
                                oneDown += 8;
                                xIndex++;
                                if(xIndex > 7) {
                                    break;
                                }
                                pieceDown = game[oneDown]?.pieceValue;
                            }}
                        }
                        }catch(err) {
                            console.log(err);
                        }


                      
                        try{
                    
                          let  yIndex = k;

                    
                            if(checkCount <= 1) {
                                yIndex--;
                                if(yIndex >= 0) {
                            let   oneLeft = id - 1;
                          
                            let pieceLeft = game[oneLeft]?.pieceValue;
                          
                            while(pieceLeft === 0 || pieceLeft < 0) {
                               
                                let btn1 = document.getElementById(oneLeft);
                              
                                 if(pieceLeft < 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                   legalMoves++;
                                    }
                                    break;
                                    
                                }
                                else if(pieceLeft === 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                      legalMoves++;
                                    }
                                }
                                oneLeft--;
                                yIndex--;
                                if(yIndex < 0) {
                                    break;
                                }
                                pieceLeft = game[oneLeft]?.pieceValue;
                            }}}
                        
                        }catch(err) {
                            console.log(err);
                          
                        }

                       
                        try{
                       
                           let yIndex = k;
                    
                            yIndex = k;
                            if(checkCount <= 1) {
                                yIndex++;
                                if(yIndex <= 7) {
                            let  oneRight = id + 1;
                            let pieceRight = game[oneRight]?.pieceValue;
                            let btn1 = document.getElementById(oneRight);
                           
                         
                            while(pieceRight === 0 || pieceRight < 0) {
                               
                                 btn1 = document.getElementById(oneRight);
                               
                                if(pieceRight < 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                   legalMoves++;
                                    }
                                    break;
                                     
                                }
                                    else if(pieceRight === 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                          legalMoves++;
                                        }
                                    }
                                   
                                
                                
                                oneRight++;
                                yIndex++;
                                if(yIndex > 7) {
                                    break;
                                }
                                pieceRight = game[oneRight]?.pieceValue;
                            }
                        }}
                        }
                        catch(err) {
                            console.log(err);
                          
                        }



                        

                        break;
                            case 3:
                             
                            try{
                              let  xIndex = j;
                             let   yIndex = k;
                                
                        
                                if(checkCount <= 1) {
                                    xIndex = j;
                                    yIndex = k;
                                    xIndex--;
                                    yIndex--;
                                    if(xIndex >= 0 && yIndex >= 0) {
                                let diagLeftUp = id - 9;
                        
                                let   pieceLeftUp = game[diagLeftUp]?.pieceValue
                                  while(pieceLeftUp === 0 || pieceLeftUp < 0) {
                                        
                                      let btnLeftUp = document.getElementById(diagLeftUp);
                                     
                                      if(pieceLeftUp < 0) {
                                    
                                      if(btnLeftUp.classList.contains('colorCheck')) {
                                        legalMoves++;
                                      }

                                          break;
                                      }
                                      else if(pieceLeftUp === 0) {
                                        if(btnLeftUp.classList.contains('colorCheck')) {
                                           legalMoves++;
                                        }
                                      }
                                      diagLeftUp -= 9;
                                      xIndex--;
                                      yIndex--;
                                      if(xIndex < 0 || yIndex < 0) {
                                          break;
                                      }
                                      pieceLeftUp = game[diagLeftUp]?.pieceValue
                                    }      
                            }}
                            }
                            catch(err) {
                               
                                console.log(err);
                              
                            }

                            try{
                              let  xIndex = j;
                              let  yIndex = k;
                           
                            if(checkCount <= 1) {
                                xIndex = j;
                                yIndex = k;
                                xIndex--;
                                yIndex++;
                                if(xIndex >= 0 && yIndex <= 7) {
                            let   diagRightUp = id - 7;
                           let  pieceRightUp = game[diagRightUp]?.pieceValue
                            while(pieceRightUp === 0 || pieceRightUp < 0) {
                                
                                let btnRightUp = document.getElementById(diagRightUp);
                              
                               if(pieceRightUp < 0) {
                             
                                if(btnRightUp.classList.contains('colorCheck')) {
                                   legalMoves++;
                                }
                                    break;
                                }
                                else if(pieceRightUp === 0) {
                                    if(btnRightUp.classList.contains('colorCheck')) {
                                       legalMoves++;
                                    }
                                }
                                diagRightUp -= 7;
                                xIndex--;
                                yIndex++;
                                if(xIndex <0 || yIndex > 7) {
                                    break;
                                }
                                pieceRightUp = game[diagRightUp]?.pieceValue
                            }
                        }
                    }
                        }

                            catch(err) {
                              
                                console.log(err);
                             
                            }

                            try{

                              let  xIndex = j;
                             let   yIndex = k;
                   
                                if(checkCount <= 1) {
                                    xIndex++;
                                    yIndex++;
                                    if(xIndex <= 7 && yIndex <= 7) {
      
                                let   diagRightDown = id + 9;
                         

                          let   pieceRightDown = game[diagRightDown]?.pieceValue
                          
                            while(pieceRightDown === 0 || pieceRightDown < 0) {
                                
                                 
                                let btnRightDown = document.getElementById(diagRightDown);
                              
                               if(pieceRightDown < 0) {
                               
                                if(btnRightDown.classList.contains('colorCheck')) {
                                  legalMoves++;
                                }
                               
                                    break;
                                }
                                else if(pieceRightDown === 0) {
                                    if(btnRightDown.classList.contains('colorCheck')) {
                                       legalMoves++;
                                   }
                                }
                                diagRightDown += 9;
                                xIndex++;
                                yIndex++;
                                if(xIndex > 7 || yIndex > 7) {
                                    break;
                                }
                                pieceRightDown = game[diagRightDown]?.pieceValue
                            }

                            }}
                            }
                            catch(err) {
                              
                                console.log(err);
                               
                            }



                            try{
                              let  xIndex = j;
                             let   yIndex = k;
                            
                                if(checkCount <= 1) {
                                    xIndex++;
                                    yIndex--;
                                    if(xIndex <= 7 && yIndex >= 0) {
                                let   diagLeftDown = id + 7;
                              
    
    
                             let    pieceLeftDown= game[diagLeftDown]?.pieceValue
                              
                                while(pieceLeftDown === 0 || pieceLeftDown < 0) {
                                      
                                    let btnLeftDown = document.getElementById(diagLeftDown);
                                   
                                    if(pieceLeftDown < 0) {
                                 
                                    if(btnLeftDown.classList.contains('colorCheck')) {
                                       legalMoves++;
                                    }
                                        break;
                                    }
                                    else if(pieceLeftDown === 0) {
                                        if(btnLeftDown.classList.contains('colorCheck')) {
                                          legalMoves++;
                                        }
                                    }
                                    diagLeftDown += 7;
                                    xIndex++;
                                    yIndex--;
                                    if(xIndex > 7 || yIndex < 0) {
                                        break;
                                    }
                                    pieceLeftDown= game[diagLeftDown]?.pieceValue
    
    
    
    
                                }}
                            }
                            }
                            catch(err) {
                              
                                console.log(err);
                               
                            }



                            break;
                                case 5:
                      
                                let oneUp = id - 8;
                                let oneDown = id + 8;
                                let oneLeft = id - 1;
                                let oneRight = id + 1;
                                try{
               
                            
                               let xIndex = j;
                              
                          
                                if(checkCount <= 1) {
                                let pieceUp = game[oneUp]?.pieceValue;
                                xIndex--;
                                if(xIndex >= 0) {
                                
                                while(pieceUp === 0 || pieceUp < 0) {
                                    
                                    if(xIndex < 0) {
                                        break;
                                    }
                                    let btn1 = document.getElementById(oneUp);
                                    
                                     if(pieceUp < 0 || pieceUp === 0) {
                                        if(pieceUp < 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                           legalMoves++;
                                        }
                                        break;
                                    }
                                        else if(pieceUp === 0) {
                                            if(btn1.classList.contains('colorCheck')) {
                                              legalMoves++;
                                            }
                                        }
                                    
                                       
                                    }
                                    oneUp -= 8;
                                    xIndex--;
                                    if(xIndex < 0) {
                                        break;
                                    }
                                    pieceUp = game[oneUp].pieceValue;
                                
                            }}}
                            
                            }catch(err) {
                                    console.log(err);
                                  
                                }

                                try{

                               let xIndex = j;
                            
                             
                                if(checkCount <= 1) {
                                    xIndex++;
                                    if(xIndex <= 7) {
                                let pieceDown = game[oneDown]?.pieceValue;
                             
                                while(pieceDown === 0 || pieceDown < 0) {
                                    if(xIndex > 7) {
                                        break;
                                    }
                                    let btn1 = document.getElementById(oneDown);
                                    
                                     if(pieceDown < 0 || pieceDown === 0) {
                                        if(pieceDown < 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                       legalMoves++;
                                    }
                                    break;
                                }
                                else if(pieceDown === 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                      legalMoves++;
                                    }
                                }
                                      //  break;
                                    }
                                    oneDown += 8;
                                    xIndex++;
                                    if(xIndex > 7) {
                                        break;
                                    }
                                    pieceDown = game[oneDown].pieceValue;
                                }
                            }}
                            
                            }catch(err) {
                                    console.log(err);
                                }

                                try{

                              
                              let  yIndex = k;
                             
                                if(checkCount <= 1) {
                                let pieceLeft = game[oneLeft]?.pieceValue;
                                yIndex--;
                                if(yIndex >= 0) {
                                while(pieceLeft === 0 || pieceLeft < 0) {
                                    if(yIndex < 0) {
                                        break;
                                    }
                                    let btn1 = document.getElementById(oneLeft);
                                   
                                     if(pieceLeft < 0 || pieceLeft === 0) {
                                        if(pieceLeft < 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                       legalMoves++;
                                    }
                                    break;
                                }
                                else if(pieceLeft === 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                      legalMoves++;
                                    } 
                                }
                                        //break;
                                    }
                                    oneLeft--;
                                    yIndex--;
                                    if(yIndex < 0) {
                                        break;
                                    }
                                    pieceLeft = game[oneLeft].pieceValue;
                                }
                            }}
                            
                            
                            }catch(err) {
                                    console.log(err);
                                   
                                }

                               
                                try{
                              
                                 
                                  let  yIndex = k;
                                        if(checkCount <= 1) {
                                        let pieceRight = game[oneRight].pieceValue;
                                        yIndex++;
                                        if(yIndex <= 7) {
                                        while(pieceRight === 0 || pieceRight < 0) {
                                            if(yIndex > 7) {
                                                break;
                                            }
                                            let btn1 = document.getElementById(oneRight);
                                           
                                            if(pieceRight < 0 || pieceRight === 0) {
                                                if(pieceRight < 0) {
                                            if(btn1.classList.contains('colorCheck')) {
                                               legalMoves++;
                                            }
                                            break;
                                        }
                                        else if(pieceRight === 0) {
                                            if(btn1.classList.contains('colorCheck')) {
                                               legalMoves++;
                                            }
                                        }
                                                //break;
                                            }
                                            oneRight++;
                                            yIndex++;
                                            if(yIndex > 7) {
                                                break;
                                            }
                                            pieceRight = game[oneRight].pieceValue;
                                        }
                                    
                                    
                                    }}}
                                    
                                catch(err) {
                                    console.log(err);
                                   
                                }

                            break;



                            
                        default: break;
                    }
                }
            }catch(err) {
                return false;
            }

            }
        }
        if(legalMoves > 0) {
            return false;
        }
        else{
            return 2;
        }
    }
    else {
        let legalMoves = 0;
        for(let j = 0; j < 8; j++) {
            for(let k = 0; k < 8; k++) {
                try{
                let id = board[j][k];
                let piece = game[id].pieceValue;
                if(piece === -6) {
                    
                                
                    let leftIndex = id - 1;
                    let rightIndex = id + 1;
                    let upIndex = id - 8;
                    let downIndex = id + 8;
                    let leftUpIndex = id - 9;
                   
                    try{
                        let leftX = j;
                        let leftY = k - 1;
                        if(leftY >= 0 && leftX >= 0) {
                            let btn1 = document.getElementById(leftIndex);
                            let piece1 = game[leftIndex].pieceValue;
                   
                                if(piece1 > 0) {
                                    if(btn1.classList.contains('colorCheck') && pieceBackedUp(leftIndex, leftX, leftY, 0) === false) {
                                       legalMoves++;
                                    }
                                    else{
                                        if(pieceBackedUp(leftIndex, leftX, leftY, 0) === false) {
                                           legalMoves++;
                                        }
                                    }
                                }
                                else{
                                    if(btn1.classList.contains('colorCheck')) {
                                        
                                    }
                                    else if(piece1 === 0 && pieceBackedUp(leftIndex, leftX, leftY, 0) === false  && detectCheck(id, leftIndex) === false ){
                                        legalMoves++;
                                    }
                                }
                            }
                        
                    }catch(err) {
                        console.log(err);
                    } 
                    
                    
                    try{
                        let rightX = j;
                        let rightY = k + 1;
                        if(rightY <= 7 && rightX <= 7) {
                            let btn1 = document.getElementById(rightIndex);
                            let piece1 = game[rightIndex].pieceValue;
                   
                                if(piece1 > 0) {
                                    if(btn1.classList.contains('colorCheck') && pieceBackedUp(rightIndex, rightX, rightY, 0) === false) {
                                       legalMoves++;
                                    }
                                    else{
                                        if(pieceBackedUp(rightIndex, rightX, rightX, 0) === false) {
                                           legalMoves++;
                                        }
                                    }
                                }
                                else{
                                    if(btn1.classList.contains('colorCheck')) {
                                        
                                    }
                                    else if(piece1 === 0   && pieceBackedUp(rightIndex, rightX, rightY, 0) === false && detectCheck(id, rightIndex) === false){
                                        legalMoves++;
                                    }
                                }
                            }
                        
                    }
                    catch(err) {
                        console.log(err);
                    }


                    try{
                        let upX = j - 1;
                        let upY = k;
                        if(upY >= 0 && upX >= 0) {
                            let btn1 = document.getElementById(upIndex);
                            let piece1 = game[upIndex].pieceValue;
                  
                                if(piece1 > 0) {
                                    if(btn1.classList.contains('colorCheck') && pieceBackedUp(upIndex, upX, upY, 0) === false) {
                                       legalMoves++;
                                    }
                                    else if(pieceBackedUp(upIndex, upX, upY, 0) === false) {
                                       legalMoves++;

                                    }
                                }
                                else{
                                    if(btn1.classList.contains('colorCheck')) {
                                        
                                    }
                                    else if(piece1 === 0  && pieceBackedUp(upIndex, upX, upY, 0) === false && detectCheck(id, upIndex) === false){
                                       legalMoves++;
                                    }
                                }
                            }
                        
                    }
                    catch(err) {
                        console.log(err);
                    }


                    try{
                        let downX = j + 1;
                        let downY = k;
                        if(downY <= 7 && downX <= 7) {
                            let btn1 = document.getElementById(downIndex);
                            let piece1 = game[downIndex].pieceValue;
                  
                                if(piece1 > 0) {
                                    if(btn1.classList.contains('colorCheck') && pieceBackedUp(downIndex, downX, downY, 0) === false) {
                                       legalMoves++;
                                    }
                                    
                                    else if(pieceBackedUp(downIndex, downX, downY, 0) === false) {
                                       legalMoves++;
                                        
                                    }
                                }
                                else{
                                    if(btn1.classList.contains('colorCheck')) {
                                        
                                    }
                                    else if(piece1 === 0  && pieceBackedUp(downIndex, downX, downY, 0) === false && detectCheck(id, downIndex) === false){
                                       legalMoves++;
                                    }
                                }
                            
                        }
                    }
                    catch(err) {
                        console.log(err);
                    }


                    try{
                        let leftUpX = j - 1;
                        let leftUpY = k - 1;
                        if(leftUpX >= 0 && leftUpY >= 0) {
                            let btn1 = document.getElementById(leftUpIndex);
                            let piece1 = game[leftUpIndex].pieceValue;
                    
                                if(piece1 > 0) {
                            
                                    if(btn1.classList.contains('colorCheck') && pieceBackedUp(leftUpIndex, leftUpX, leftUpY, 0) === false) {
                                       legalMoves++;
                                    }
                                    else{
                                        if(pieceBackedUp(leftUpIndex,leftUpX, leftUpY, 0) === false){
                                       legalMoves++;
                                        }
                                    }
                                }
                                else{
                                
                                     if(piece1 === 0  && pieceBackedUp(leftUpIndex, leftUpX, leftUpY, 0) === false && detectCheck(id, leftUpIndex) === false){
                                       legalMoves++;
                                    }
                                }
                            
                        }
                    }
                    catch(err) {
                        console.log(err);
                    }

                    let rightUpIndex = id - 7;
                    try{
                        
                        let rightUpX = j - 1;
                        let rightUpY = k + 1;
                        if(rightUpX >= 0 && rightUpY <= 7) {
                    
                            let piece1 = game[rightUpIndex].pieceValue;
                            let btn1 = document.getElementById(rightUpIndex);
                       
                            if(piece1 > 0) {
                                if(btn1.classList.contains('colorCheck') && pieceBackedUp(rightUpIndex, rightUpX, rightUpY, 0) === false) {
                                   legalMoves++;
                                }
                                else{
                                    if(pieceBackedUp(rightUpIndex,rightUpX, rightUpY, 0) === false ){
                                    legalMoves++;
                                    }
                                }
                            }
                            else{
                            
                                 if(piece1 === 0 && pieceBackedUp(rightUpIndex, rightUpX, rightUpY, 0) === false && detectCheck(id, rightUpIndex) === false){
                                   legalMoves++;
                                }
                            }
                        }
                        
                    }
                    catch(err) {
                        console.log(err);
                    }

                  
                    try{
                        let leftDownIndex = id + 7;
                        let leftDownX = j + 1;
                        let leftDownY = k - 1;
                        if(leftDownX <= 7 && leftDownY >= 0) {
                            let piece1 = game[leftDownIndex].pieceValue;
                            let btn1 = document.getElementById(leftDownIndex);
                    
                                if(piece1 > 0) {
                                    if(btn1.classList.contains('colorCheck') && pieceBackedUp(leftDownIndex, leftDownX, leftDownY, 0) === false) {
                                        legalMoves++;
                                    }
                                    else{
                                        if(pieceBackedUp(leftDownIndex, leftDownX, leftDownY, 0) === false) {
                                           legalMoves++;
                                        }
                                    }
                                }
                                else{
                                    if(piece1 === 0  && pieceBackedUp(leftDownIndex, leftDownX, leftDownY, 0) === false && detectCheck(id, leftDownIndex) === false) {
                                        legalMoves++;
                                    }
                                }
                            }
                        
                    }
                    catch(err) {
                        console.log(err);
                    }

                    try{
                        let rightDownIndex = id + 9;
                        let rightDownX = j + 1;
                        let rightDownY = k + 1;
                        if(rightDownX <= 7 && rightDownY <= 7) {
                            let piece1 = game[rightDownIndex].pieceValue;
                            let btn1 = document.getElementById(rightDownIndex);
                                if(piece1 > 0) {
                                    if(btn1.classList.contains('colorCheck') && pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 0) === false) {
                                      legalMoves++;
                                    }
                                    else{
                                        if(pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 0) === false) {
                                            legalMoves++;
                                        }
                                    }
                                }
                                else{
                                    if(piece1 === 0  && pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 0) === false && detectCheck(id, rightDownIndex) === false) {
                                       legalMoves++;
                                    }
                                }
                            }
                        

                    }
                    catch(err) {
                        console.log(err);
                    }
                

                }
                else {
                    if(color === 2) {
                    switch(piece) {
                        case -1:
                            if(j === 6) {
                             
                            if(checkCount <= 1) {

                                let oneUp = id - 8;
                                let twoUp = id - 16;
                                let pieceOneUp = [];
                                pieceOneUp.push(oneUp);
                                pieceOneUp.push(game[oneUp].pieceValue);
                                let pieceTwoUp = [];
                                pieceTwoUp.push(twoUp);
                                pieceTwoUp.push(game[twoUp].pieceValue);
                                if(pieceOneUp[1] === 0) {
                                    let btn1 = document.getElementById(oneUp);
                                    if(btn1.classList.contains('colorCheck')) {
                                        legalMoves++;
                                    }
                                    if(pieceTwoUp[1] === 0) {
    
                                       
                                        let btn2 = document.getElementById(twoUp);
                                        if(btn2.classList.contains('colorCheck')) {
                                            legalMoves++;
                                        }
                                   
                                       
                                    }
                                    else{
                                      
                                    }
                                } 
                                let diagonalOneLeftUp = id - 9;
                                let diagOneLeftX = j - 1;
                                let diagOneLeftY = k - 1;
                                let diagonalOneRightUp = id - 7;
                                let diagOneRightX = j - 1;
                                let diagOneRightY = k + 1;
                              
                              
                                if(diagOneLeftX >= 0 && diagOneLeftY >= 0) {
                                    let pieceDiagonalLeft = game[diagonalOneLeftUp].pieceValue;
                                if(pieceDiagonalLeft > 0)  {
                                    let btn2 = document.getElementById(diagonalOneLeftUp);
                                    if(btn2.classList.contains('colorCheck')) {
                                        legalMoves++;
                                    }}
                                }
                                if(diagOneRightX >= 0 && diagOneRightY <= 7) {
                                    let pieceDiagonalRight = game[diagonalOneRightUp].pieceValue;
                                if(pieceDiagonalRight > 0) {
                                    let btn3 = document.getElementById(diagonalOneRightUp);
                                    if(btn3.classList.contains('colorCheck')) {
                                        legalMoves++;
                                    }}
                                }
    
                            }}
                            else {
                            if(checkCount <= 1) {
                                let oneUp = id - 8;
                                let pieceOneUp = [];
                                pieceOneUp.push(oneUp);
                                pieceOneUp.push(game[oneUp]?.pieceValue);
                                if(pieceOneUp[1] === 0) {
                                    
                            
                                    let  btn3 = document.getElementById(oneUp);
                                    
                                    if(btn3.classList.contains('colorCheck')) {
                                        legalMoves++;
                                    }
                                
                                  
                                }
                                let diagonalOneLeftUp = id - 9;
                                let diagOneLeftX = j - 1;
                                let diagOneLeftY = k - 1;
                                let diagonalOneRightUp = id - 7;
                                let diagOneRightX = j - 1;
                                let diagOneRightY = k + 1;
                              
                             
                                if(diagOneLeftX >= 0 && diagOneLeftY >= 0) {
                                    let pieceDiagonalLeft = game[diagonalOneLeftUp]?.pieceValue;
                                if(pieceDiagonalLeft > 0)  {
                                    let btn2 = document.getElementById(diagonalOneLeftUp);
                                    if(btn2.classList.contains('colorCheck')) {
                                        legalMoves++;
                                    }}
                                }
                                if(diagOneRightX >= 0 && diagOneRightY <= 7 ) {
                                    let pieceDiagonalRight = game[diagonalOneRightUp]?.pieceValue;
                                if(pieceDiagonalRight < 0) {
                                    let btn3 = document.getElementById(diagonalOneRightUp);
                                    if(btn3.classList.contains('colorCheck')) {
                                   legalMoves++;
                                    }
                                }}
                            }
                        }
                        break;

                        case -2:
                            try{
                            let twoUpRight = id - 15;
                            let twoUpLeft = id - 17;
                            let twoLeftDown = id + 15;
                            let twoRightDown = id + 17;
                          let  xIndex = j;
                        let    yIndex = k;
                            xIndex += 2;
                            yIndex--;
                            if(xIndex <= 7 && yIndex >= 0) {
                   
                            if(checkCount <= 1) {
    
                                let pieceDownLeft = game[twoLeftDown].pieceValue;
                                let btn1 = document.getElementById(twoLeftDown);
                                if(pieceDownLeft === 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                   legalMoves++;
                                   
                                    }
                                }
                                else if(pieceDownLeft > 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                       legalMoves++;
                                    }
                                }
                            }
                        }
                        xIndex = j;
                        yIndex = k;
                             xIndex = j - 2;
                             yIndex = k + 1;
                             if(xIndex >= 0 && yIndex <= 7) {  
                                if(checkCount <= 1) {
                                    let pieceUpRight = game[twoUpRight].pieceValue;
                                    let btn1 = document.getElementById(twoUpRight);
                                   
                                     if(pieceUpRight > 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                           legalMoves++;
                                        }
                                    }
                                    else if(pieceUpRight === 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                           legalMoves++;
                                        }
                                    }
                                }
                             }
                            
                            xIndex = j;
                            yIndex = k;
                            xIndex -= 2;
                            yIndex--;
                            if(xIndex >= 0 && yIndex >= 0) {
                                if(checkCount <= 1) {
                        
                                    let pieceUpLeft = game[twoUpLeft].pieceValue;
                                    let btn1 = document.getElementById(twoUpLeft);
                                   
                                 if(pieceUpLeft > 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                      legalMoves++;
                                    }
                                    }
                                    else if(pieceUpLeft === 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                            legalMoves++;
                                        }
                                    }
                                }
                            }

                            xIndex = j;
                            yIndex = k;
                            xIndex += 2;
                            yIndex++;
                            if(xIndex <= 7 && yIndex <= 7) {
                                if(checkCount <= 1) {
                                let pieceDownRight = game[twoRightDown].pieceValue;
                                let btn1 = document.getElementById(twoRightDown);
                               
                                 if(pieceDownRight > 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                       legalMoves++;
                                    }
                                }
                                else if(pieceDownRight === 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                       legalMoves++;
                                    }
                                }
                            }}
                        
    
                            
    
                            xIndex = j;
                            yIndex = k;
                            xIndex--;
                            yIndex -= 2;
                            let leftUp = id - 10;
                            if(xIndex >= 0 && yIndex >= 0) {
                              
                                if(checkCount <= 1) {
                                let pieceLeftUp = game[leftUp].pieceValue;
                                let btn1 = document.getElementById(leftUp);
                               
                                if(pieceLeftUp > 0) {
                                if(btn1.classList.contains('colorCheck')) {
                                  legalMoves++;
                                }}
                                else if(pieceLeftUp === 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                       legalMoves++;
                                    }
                                }
                            }
                        }
                            xIndex = j;
                            yIndex = k;
                            xIndex--;
                            yIndex += 2;
                            let rightUp = id - 6;
                            if(xIndex >= 0 && yIndex <= 7) {
                               
                                if(checkCount <= 1) {
                                let pieceRight = game[rightUp].pieceValue;
                                let btn1 = document.getElementById(rightUp);
                               
                                 if(pieceRight> 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                       legalMoves++;
                                    }
                                }
                                else if(pieceRight === 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                      legalMoves++;
                                    }
                                }
                            }
                        }
                            
    
                            xIndex = j;
                            yIndex = k;
                            xIndex++;
                            yIndex -= 2;
                            let leftTwoDown = id + 6;
                            if(xIndex <= 7 && yIndex >= 0) {
                              
                       
                                if(checkCount <= 1) {
                                let pieceLeftTwoDown = game[leftTwoDown].pieceValue;
                                let btn1 = document.getElementById(leftTwoDown);
                                
                                 if(pieceLeftTwoDown > 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                       legalMoves++;
                                    }
                                }
                                else if(pieceLeftTwoDown === 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                       legalMoves++;
                                    }
                                }
                            }
    
                            }
    
                            xIndex = j;
                            yIndex = k;
                            xIndex++;
                            yIndex += 2;
                            let rightTwoDown = id + 10;
                            if(xIndex <= 7 && yIndex <= 7) {
                               
                                if(checkCount <= 1) {
                                let pieceRightTwoDown = game[rightTwoDown].pieceValue;
                                let btn1 = document.getElementById(rightTwoDown);
                                
                                 if(pieceRightTwoDown > 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                        legalMoves++;
                                    }
                                }
                                else if(pieceRightTwoDown === 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                       legalMoves++;
                                    }
                                }
                            }
                        }
    


                        }catch(err) {
                            console.log(err);
                        }

                        break;
                        case -5:
                      
                        let oneUp = id - 8;
                        let oneDown = id + 8;
                        let oneLeft = id - 1;
                        let oneRight = id + 1;
                        try{
       
                    
                       let xIndex = j;
                      
                  
                        if(checkCount <= 1) {
                        let pieceUp = game[oneUp]?.pieceValue;
                        xIndex--;
                        if(xIndex >= 0) {
                        
                        while(pieceUp === 0 || pieceUp > 0) {
                            
                            if(xIndex < 0) {
                                break;
                            }
                            let btn1 = document.getElementById(oneUp);
                            
                             if(pieceUp > 0 || pieceUp === 0) {
                                if(pieceUp > 0) {
                                if(btn1.classList.contains('colorCheck')) {
                                   legalMoves++;
                                }
                                break;
                            }
                                else if(pieceUp === 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                      legalMoves++;
                                    }
                                }
                            
                               
                            }
                            oneUp -= 8;
                            xIndex--;
                            if(xIndex < 0) {
                                break;
                            }
                            pieceUp = game[oneUp].pieceValue;
                        
                    }}}
                    
                    }catch(err) {
                            console.log(err);
                          
                        }

                        try{

                       let xIndex = j;
                    
                     
                        if(checkCount <= 1) {
                            xIndex++;
                            if(xIndex <= 7) {
                        let pieceDown = game[oneDown]?.pieceValue;
                     
                        while(pieceDown === 0 || pieceDown > 0) {
                            if(xIndex > 7) {
                                break;
                            }
                            let btn1 = document.getElementById(oneDown);
                            
                             if(pieceDown > 0 || pieceDown === 0) {
                                if(pieceDown < 0) {
                            if(btn1.classList.contains('colorCheck')) {
                               legalMoves++;
                            }
                            break;
                        }
                        else if(pieceDown === 0) {
                            if(btn1.classList.contains('colorCheck')) {
                              legalMoves++;
                            }
                        }
                              //  break;
                            }
                            oneDown += 8;
                            xIndex++;
                            if(xIndex > 7) {
                                break;
                            }
                            pieceDown = game[oneDown].pieceValue;
                        }
                    }}
                    
                    }catch(err) {
                            console.log(err);
                        }

                        try{

                      
                      let  yIndex = k;
                     
                        if(checkCount <= 1) {
                        let pieceLeft = game[oneLeft]?.pieceValue;
                        yIndex--;
                        if(yIndex >= 0) {
                        while(pieceLeft === 0 || pieceLeft > 0) {
                            if(yIndex < 0) {
                                break;
                            }
                            let btn1 = document.getElementById(oneLeft);
                           
                             if(pieceLeft > 0 || pieceLeft === 0) {
                                if(pieceLeft > 0) {
                            if(btn1.classList.contains('colorCheck')) {
                               legalMoves++;
                            }
                            break;
                        }
                        else if(pieceLeft === 0) {
                            if(btn1.classList.contains('colorCheck')) {
                              legalMoves++;
                            } 
                        }
                                //break;
                            }
                            oneLeft--;
                            yIndex--;
                            if(yIndex < 0) {
                                break;
                            }
                            pieceLeft = game[oneLeft].pieceValue;
                        }
                    }}
                    
                    
                    }catch(err) {
                            console.log(err);
                           
                        }

                       
                        try{
                      
                         
                          let  yIndex = k;
                                if(checkCount <= 1) {
                                let pieceRight = game[oneRight].pieceValue;
                                yIndex++;
                                if(yIndex <= 7) {
                                while(pieceRight === 0 || pieceRight > 0) {
                                    if(yIndex > 7) {
                                        break;
                                    }
                                    let btn1 = document.getElementById(oneRight);
                                   
                                    if(pieceRight > 0 || pieceRight === 0) {
                                        if(pieceRight > 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                       legalMoves++;
                                    }
                                    break;
                                }
                                else if(pieceRight === 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                       legalMoves++;
                                    }
                                }
                                        //break;
                                    }
                                    oneRight++;
                                    yIndex++;
                                    if(yIndex > 7) {
                                        break;
                                    }
                                    pieceRight = game[oneRight].pieceValue;
                                }
                            
                            
                            }}}
                            
                        catch(err) {
                            console.log(err);
                           
                        }

                    break;



                        case -10:


                        try{
                            let diagLeftUp = id - 9;
                        
                          let  xIndex = j;
                          let  yIndex = k;
                         
                            if(checkCount <= 1) {
                                xIndex--;
                                yIndex--;
                                if(xIndex >= 0 && yIndex >= 0) {
                            let pieceLeftUp = game[diagLeftUp]?.pieceValue
                         
                            while(pieceLeftUp === 0 || pieceLeftUp > 0) {
                                  
                                let btnLeftUp = document.getElementById(diagLeftUp);
                               
                                if(pieceLeftUp > 0) {
                                    if(btnLeftUp.classList.contains('colorCheck')) {
                                    legalMoves++;
                                    }
                                    break;
                                }
                                else if(pieceLeftUp === 0) {
                                    if(btnLeftUp.classList.contains('colorCheck')) {
                                       legalMoves++;
                                    }
                                }
                                diagLeftUp -= 9;
                                xIndex--;
                                yIndex--;
                                if(xIndex < 0 || yIndex < 0) {
                                    break;
                                }
                                pieceLeftUp = game[diagLeftUp]?.pieceValue
                            }

                        }
                        }
                        }
                        catch(err) {
                            console.log(err);
                        }


                        try{

                          let  xIndex = j;
                         let   yIndex = k;

                        if(checkCount <= 1) {
                        let diagRightUp = id - 7;
                        xIndex--;
                        yIndex++;
                        if(xIndex >= 0 && yIndex <= 7) {
                       
                        let pieceRightUp = game[diagRightUp]?.pieceValue
                       
                        while(pieceRightUp === 0 || pieceRightUp > 0) {
                            let btnRightUp = document.getElementById(diagRightUp);
                           
                            if(pieceRightUp > 0) {
                        
                            if(btnRightUp.classList.contains('colorCheck')) {
                               legalMoves++;
                            }
                            break;
                        }
                            else if(pieceRightUp === 0) {
                                if(btnRightUp.classList.contains('colorCheck')) {
                                   legalMoves++;
                                }
                            }
                            
                            
                            diagRightUp -= 7;
                            xIndex--;
                            yIndex++;
                            if(xIndex <0 || yIndex > 7) {
                                break;
                            }
                            pieceRightUp = game[diagRightUp]?.pieceValue
                        }

                    }
                    }
                    }

                        catch(err) {
                            console.log(err);
                        }


                        try{
                          let  xIndex = j;
                         let   yIndex = k;

                   
                            if(checkCount <= 1) {
                            xIndex++;
                            yIndex++;

                            if(xIndex <= 7 && yIndex <= 7) {
                            let diagRightDown = id + 9;


                            let pieceRightDown = game[diagRightDown]?.pieceValue
                          
                            while(pieceRightDown === 0 || pieceRightDown > 0) {
                                
                                let btnRightDown = document.getElementById(diagRightDown);
                               
                                if(pieceRightDown > 0) {
                                if(btnRightDown.classList.contains('colorCheck')) {
                                   legalMoves++;
                                }
                                    break;
                                }

                                else if(pieceRightDown === 0) {
                                    if(btnRightDown.classList.contains('colorCheck')) {
                                       legalMoves++;
                                }
                                diagRightDown += 9;
                                xIndex++;
                                yIndex++;
                                if(xIndex > 7 || yIndex > 7) {
                                    break;
                                }
                                pieceRightDown = game[diagRightDown]?.pieceValue


                        }
                        }}}
                    }
                        catch(err) {
                            console.log(err);
                        }


                        try{

                          let  xIndex = j;
                          let  yIndex = k;
                    
                            if(checkCount <= 1) {
                            xIndex = j;
                            yIndex = k;
                            xIndex++;
                            yIndex--;
                            if(xIndex <= 7 && yIndex >= 0) {

                            let diagLeftDown = id + 7;

                            let pieceLeftDown= game[diagLeftDown]?.pieceValue
                          
                            while(pieceLeftDown === 0 || pieceLeftDown > 0) {
                            
                                let btnLeftDown = document.getElementById(diagLeftDown);
                               
                                if(pieceLeftDown > 0) {
                                if(btnLeftDown.classList.contains('colorCheck')) {
                                   legalMoves++;
                                }
                                    break;
                                }
                                else if(pieceLeftDown === 0) {
                                    if(btnLeftDown.classList.contains('colorCheck')) {
                                       legalMoves++;
                                    }
                                } 
                                diagLeftDown += 7;
                                xIndex++;
                                yIndex--;
                                if(xIndex > 7 || yIndex < 0) {
                                    break;
                                }
                                pieceLeftDown= game[diagLeftDown]?.pieceValue




                            }}

                        }
                        }
                        catch(err) {
                            console.log(err);
                           
                        }

                       
                        try{
                          let  xIndex = j;
                    

                            if(checkCount <= 1) {
                                xIndex--;
                                if(xIndex >= 0) {
                            let  oneUp = id - 8;
                         
                            let pieceUp = game[oneUp]?.pieceValue;
                        
                            while(pieceUp === 0 || pieceUp > 0) {
                               
                               
                                let btn1 = document.getElementById(oneUp);
                              
                                 if(pieceUp > 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                   legalMoves++;
                                    }
                                    break;
                                }
                                else if(pieceUp === 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                       legalMoves++;
                                    }
                                }
                                oneUp -= 8;
                                xIndex--;
                                if(xIndex < 0) {
                                    break;
                                }
                                pieceUp = game[oneUp]?.pieceValue;
                            }}
                        }


                        }catch(err) {
                            console.log(err);
                            
                        }
                     
                        try{

                           let xIndex = j;
                    

                            if(checkCount <= 1) {
                                xIndex++;
                                if(xIndex <= 7) {
                            let   oneDown = id + 8;
                        
                            let pieceDown = game[oneDown]?.pieceValue;
                           
                            while(pieceDown === 0 || pieceDown > 0) {
                               
                                let btn1 = document.getElementById(oneDown);
                              
                                 if(pieceDown > 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                    legalMoves++;
                                    }
                                    break;
                                }
                                else if(pieceDown === 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                      legalMoves++;
                                        
                                    }
                                }
                                oneDown += 8;
                                xIndex++;
                                if(xIndex > 7) {
                                    break;
                                }
                                pieceDown = game[oneDown]?.pieceValue;
                            }
                        }}
                        }catch(err) {
                            console.log(err);
                            
                        }
                     
                        try{
                       
                         let   yIndex = k;
                            if(checkCount <= 1) {
                                yIndex--;
                                if(yIndex >= 0) {
                            let   oneLeft = id - 1;
                          
                            let pieceLeft = game[oneLeft]?.pieceValue;
                        
                            while(pieceLeft === 0 || pieceLeft > 0) {
                                
                                let btn1 = document.getElementById(oneLeft);
                              
                                 if(pieceLeft > 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                   legalMoves++;
                                    }
                                    break;
                                }
                                else if(pieceLeft === 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                       legalMoves++;
                                    }
                                }
                                oneLeft--;
                                yIndex--;
                                if(yIndex < 0) {
                                    break;
                                }
                                pieceLeft = game[oneLeft]?.pieceValue;
                            }}
                        }
                        }catch(err) {
                            console.log(err);
                            
                        }

                     
                        try{
                 
                    
                        let    yIndex = k;
                            if(checkCount <= 1) {
                                yIndex++;
                                if(yIndex <= 7) {
                            let  oneRight = id + 1;
                            let pieceRight = game[oneRight]?.pieceValue;
                            let btn1 = document.getElementById(oneRight);
                         
                            while(pieceRight === 0 || pieceRight > 0) {
                                 btn1 = document.getElementById(oneRight);
                               
                                if(pieceRight > 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                   legalMoves++;
                                    }
                                     break;
                                }
                                    else if(pieceRight === 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                           legalMoves++;
                                        }
                                    }
                                   
                                
                                
                                oneRight++;
                                yIndex++;
                                if(yIndex > 7) {
                                    break;
                                }
                                pieceRight = game[oneRight]?.pieceValue;
                            }
                        }}
                        }
                        catch(err) {
                            console.log(err);
                            
                        }

                            break;

                            case -3:
                                try{
                                 let   xIndex = j;
                                let    yIndex = k;
                         
                                    if(checkCount <= 1) {
                                    let diagLeftUp = id - 9;
                                    xIndex = j;
                                    yIndex = k;
                                    xIndex--;
                                    yIndex--;
                                    if(xIndex >= 0 && yIndex >= 0) {
                            
                                    let   pieceLeftUp = game[diagLeftUp]?.pieceValue
                                
                                      while(pieceLeftUp === 0 || pieceLeftUp > 0) {
                                             
                                          let btnLeftUp = document.getElementById(diagLeftUp);
                                         
                                          if(pieceLeftUp > 0) {
                                          if(btnLeftUp.classList.contains('colorCheck')) {
                                           legalMoves++;
                                          }
    
                                              break;
                                          }
                                          else if(pieceLeftUp === 0) {
                                            if(btnLeftUp.classList.contains('colorCheck')) {
                                               legalMoves++;
                                            }
                                          }
                                          diagLeftUp -= 9;
                                          xIndex--;
                                          yIndex--;
                                          if(xIndex < 0 || yIndex < 0) {
                                              break;
                                          }
                                          pieceLeftUp = game[diagLeftUp]?.pieceValue
                                        }      
                                }}
                                }
                                catch(err) {
                                    console.log(err);
                                   
                                }
    
                                try{
                                  let  xIndex = j;
                                let    yIndex = k;
                        
                                if(checkCount <= 1) {
                                let   diagRightUp = id - 7;
                                   
                                xIndex--;
                                yIndex++;
                                if(xIndex >= 0 && yIndex <= 7) {
                               let  pieceRightUp = game[diagRightUp]?.pieceValue;
                                while(pieceRightUp === 0 || pieceRightUp > 0) {
                                 
                                    let btnRightUp = document.getElementById(diagRightUp);
                                  
                                   if(pieceRightUp > 0) {
                                    if(btnRightUp.classList.contains('colorCheck')) {
                                   legalMoves++;
                                    }
                                        break;
                                    }
                                    else if(pieceRightUp === 0) {
                                        if(btnRightUp.classList.contains('colorCheck')) {
                                          legalMoves++;
                                        }
                                    }
                                    diagRightUp -= 7;
                                    xIndex--;
                                    yIndex++;
                                    if(xIndex <0 || yIndex > 7) {
                                        break;
                                    }
                                    pieceRightUp = game[diagRightUp]?.pieceValue
                                }
                            }}
                            
                            }
    
                                catch(err) {
                                    console.log(err);
                                }
    
                                try{
                                  let  xIndex = j;
                                let    yIndex = k;
                   
                                    if(checkCount <= 1) {
          
                                    let   diagRightDown = id + 9;
                              
                                xIndex++;
                                yIndex++;
                                if(xIndex <= 7 && yIndex <= 7) {
    
    
                              let   pieceRightDown = game[diagRightDown]?.pieceValue;
                                while(pieceRightDown === 0 || pieceRightDown > 0) {
                                    
                                      
                                    let btnRightDown = document.getElementById(diagRightDown);
                                  
                                   if(pieceRightDown > 0) {
                                   
                                    if(btnRightDown.classList.contains('colorCheck')) {
                               legalMoves++;
                                    }
                                   
                                        break;
                                    }
                                    else if(pieceRightDown === 0) {
                                        if(btnRightDown.classList.contains('colorCheck')) {
                                         legalMoves++;
                                       }
                                    }
                                    diagRightDown += 9;
                                    xIndex++;
                                    yIndex++;
                                    if(xIndex > 7 || yIndex > 7) {
                                        break;
                                    }
                                    pieceRightDown = game[diagRightDown]?.pieceValue
                                }
    
                                }}
                                }
                                catch(err) {
                                    console.log(err);
                                   
                                }
    
    
    
                                try{
                                 let   xIndex = j;
                                 let   yIndex = k;
                  
                                    if(checkCount <= 1) {
                                    let   diagLeftDown = id + 7;
                                  
                                    xIndex++;
                                    yIndex--;
                                    if(xIndex <= 7 && yIndex >= 0) {
        
        
        
                                 let    pieceLeftDown= game[diagLeftDown]?.pieceValue;
                                    while(pieceLeftDown === 0 || pieceLeftDown > 0) {
                                          
                                        let btnLeftDown = document.getElementById(diagLeftDown);
                                       
                                        if(pieceLeftDown > 0) {
                                       
                                        if(btnLeftDown.classList.contains('colorCheck')) {
                                           legalMoves++;
                                        }
                                            break;
                                        }
                                        else if(pieceLeftDown === 0) {
                                            if(btnLeftDown.classList.contains('colorCheck')) {
                                               legalMoves++;
                                            }
                                        }
                                        diagLeftDown += 7;
                                        xIndex++;
                                        yIndex--;
                                        if(xIndex > 7 || yIndex < 0) {
                                            break;
                                        }
                                        pieceLeftDown= game[diagLeftDown]?.pieceValue
        
        
        
                                    }
                                    }
                                
                                }}
                                catch(err) {
                                    console.log(err);
                                 
                                }
    
    
    
                                break;


                            
                        default: break;
                    }
                }
            }
        }catch(err) {
            return false;
        }
            }
        }
        
        if(legalMoves > 0) {
            return false;
        }
        else{
            return 1;
        }
    }

    }


  
// On pressing Connect this method will be called 
 function connect() { 
  
  setWs(new WebSocket("ws://192.168.1.7:8080/hello"));
  
  //This function will called everytime new message arrives 
  document.getElementById("startGame").disabled = true; 
  document.getElementById("startGame").value = "Connected"; 
  

} 


    if(ws !== undefined) {
    ws.onmessage = function (e) { 
      console.log(e); 
      printMessage(e.data);
    }}
    


function printMessage(data) {
    try{
      
       
        console.log('logging received data');
        console.log(data);
        let data1 = '';

        try{
        for(let j = 0; j < data.length; j++) {
            data1 += data[j];
            if(j === 3) {
                break;
            }
        }
        if(data1 === 'null') {
            data = data.split('null')[1];
            console.log('logging data');
            console.log(data);
            if(payloadData === null) {
                setPayloadData(data);
                return;
            }
            else { 
            setPayloadData(prev=> prev + ' ' + data);
            return;
            }
        }
    }catch(err) {
        console.log(err);
    }
      
        if(data === true) {
            setCheckmate(true);
            gameWin();

        }

   
    if(data === "player2" && open === true) {
        setOpen(false);
        dispatch(trueLoadingFlagActionCreator());
        return;
    }
    let message = data.split(",");
    message[0] = parseInt(message[0]);
    message[1] = parseInt(message[1]);
    let x = 0;
    let flag1 = false;
    let flag2 = false;
    for(let j = 63; j >= 0; j--) {
        if(x === message[0] && flag1 === false) {
            message[0] = j;
            flag1 = true;
        }
        if(x === message[1] && flag2 === false) {
            message[1] = j;
            flag2 = true;
        }
        x++;
    }
   
    let btn1 = document.getElementById(message[0]);
    let btn2 = document.getElementById(message[1]);
    
    try{
    if(!btn1.classList.contains('colorCheck')) {
    btn1?.classList.add('colorMove');
    moveMade();
  
    }

    if(!btn2.classList.contains('colorCheck')) {
    btn2?.classList.add('colorMove');
    moveMade();
    }
}catch(err) {
    console.log(err)
}

    if( turn === 1) {

        let payload = [];
        payload.push(game[0].gameId);
        payload.push(2);
        prev = [-1];

        console.log('turn === 1')
    dispatch(inrementActionCreator());
   
        setTimeout(() =>{
            console.log('turn === 1')
       
          
        dispatch(retreiveStateActionCreator(payload));
        if(checkFlag === true) {
           dispatch(checkFalseActionCreator())
        }
       
        }, 1500);
    }
    else if( turn === 2) {
        let payload = [];
        prev = [-1];
        payload.push(game[0].gameId);
        payload.push(1);
    dispatch(decrementActionCreator());
    console.log('turn === 2')
      setTimeout(() =>{
    
        console.log('turn === 2')
    
       
        dispatch(retreiveStateActionCreator(payload));
        if(checkFlag === true) {
           dispatch(checkFalseActionCreator())
        }
       
      
        }, 1500);
    }}catch(err) {
        console.log(err);
    }
  
  
}



function loadingFunc() {
try{
   
    if(game[63].player2 !== null) {
    let message = "player2"
    let payload = [];
            payload.push(game[0].gameId);
            payload.push(2);
          
    setTimeout(() => {
    if(game[63].player2 === 'player2' && count < 1) {
       
      
        try{
            
            
        dispatch(retreiveStateActionCreator(payload));
        
            
    
            
    ws.send(message);
    console.log('sent');
   
    if(open === true) {
        setOpen(false);
    }

    dispatch(trueLoadingFlagActionCreator());
}
    catch(err) {
        console.log(err)
    }
        
       
   }}, 1000); }}catch(err) {
        console.log(err);
    }
}

function getPrevious() {
    try{
    let payload = [];
    payload.push(game[63].gameId);
   
 if(prev[64] === undefined) {
   payload.push(-1);
 }
 else{
    payload.push(prev[64]);
 }
   
    let move = localStorage.getItem('player1');
    if(move === undefined) {
        move = localStorage.getItem('player2');
        payload.push(2);
    }
    else{
        payload.push(1);
    }
   

    dispatch(previousActionCreator(payload));
    setPrevFlag(true);

    }catch(err) {
        console.log(err);
    }
}

function getForward() {
    try{
        let payload = [];
        payload.push(game[63].gameId);
        if(prevFlag === true) {
            payload.push(prev[64] + 2);
            prev[64] = prev[64] + 1;
        }
        else {
            payload.push(prev[64] + 1);
        }
      
       
        setPrevFlag(false);
        let move = localStorage.getItem('player1');
        if(move === null || move === undefined) {
            move = localStorage.getItem('player2');
            payload.push(2);
            payload.push(turn)
        
        }
        else{
            payload.push(1);
            payload.push(turn);
        }
      
       
  
        dispatch(forwardActionCreator(payload));
        if(forwardFlag === false) {
            setForwardFlag(true);
        }
        
    }catch(err) {
        console.log(err);
    }
}

   


  
   return(
    <>
    
              <Snackbar open={check}
            autoHideDuration={3000}
            anchorOrigin={{ vertical:'top', horizontal : 'center' }}
            onClose={()=> setCheck(false) }><Alert severity ="error" variant='filled'> This is Check!</Alert></Snackbar>


<Snackbar open={checkMate}
            autoHideDuration={3000}
            anchorOrigin={{ vertical:'top', horizontal : 'center' }}
            ><Alert severity ="success" variant='filled'> `CheckMate! Game Over! `</Alert></Snackbar>


    <div id = 'game'>    <Button id = 'startGame' variant = 'contained' onClick = {handle2PlayerGame}>Play a 2 player game</Button>
    </div>
 
    <div id = 'flexDiv'>
            
        </div>
        <div>
     
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
    <div id = 'check'>
        <Typography id = 'player1'>{turn === 1 && checkFlag === true ? ('WHITE KING IS ON CHECK') : ""}</Typography>
        <Typography id = 'player2'>{turn === 2 && checkFlag === true ? ('BLACK KING IS ON CHECK') : ""}</Typography>
    </div>
    <div id = 'checkmate'>
    <Typography id = 'player1'>{playerWon === 1 ? ('WHITE WON') : ""}</Typography>
    <Typography id = 'player2'>{playerWon === 2 ? ('BLACK WON') : ""} </Typography>
  </div>
  <div id = 'eval'>
    <p>
        <Typography>Evaluation is {chessEngineData || prevChessEngineData}</Typography>
    </p>
  </div>
          <div className="container_div">
        <div className="eight_div">
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div> 
       <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div  onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div  onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        </div> 
        <div className="eight_div">
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        </div> 
        <div className="eight_div">
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        </div> 
        <div className="eight_div">
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        </div> 
        <div className="eight_div">
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        </div> 
        <div className="eight_div">
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        </div> 
        <div className="eight_div">        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        </div> 
        <div className="eight_div">
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        <div onClick={event=> handleGame(event)}>
        <button id = {i++}></button>
        </div>
        </div>
    </div> 
    <div className='prevfwd'>
        <button id = 'back' onClick={getPrevious}>{'<<'}</button>
        <button id = 'fwd' onClick={getForward}>{'>>'}</button>
    </div>

  
    </>)
          
 
}

export default ChessGui;