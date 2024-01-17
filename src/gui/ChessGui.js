import { useEffect, useState } from 'react';
import './style.css';
import {useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getStateActionCreator, retreiveStateActionCreator } from '../reducers/stateReducer';
import { Button, Snackbar, Alert } from '@mui/material';
import { arrayDecrementActionCreator, arrayIdActionCreator, castlingBlackActionCreator, castlingBlackLeftActionCreator, castlingBlackRightActionCreator, castlingWhiteActionCreator, castlingWhiteLeftActionCreator, castlingWhiteRightActionCreator, checkCountDecrementActionCreator, checkCountIncrementActionCreator, checkFalseActionCreator, detectCheckActionCreator } from '../reducers/checkReducer';
import { decrementActionCreator, inrementActionCreator } from '../reducers/userReducer';



function ChessGui() {

    const dispatch = useDispatch();
    let [check, setCheck] = useState(false);


   


    let turn = useSelector(user => user.user);
    console.log('logging turn');
    console.log(turn)
    turn = turn.turn;




 

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

   let initGame =  [[[0 , -5], [1 , -2], [2 , -3], [3 , -10], [4 , -6], [5 , -3], [6 , -2], [7 , -5]],
 [[8 , -1], [9 , -1], [10 , -1], [11 , -1], [12 , -1], [13 , -1], [14 , -1], [15 , -1]],
 [[16 , 0], [17 , 0], [18 , 0], [19 , 0], [20 , 0], [21 , 0], [22 , 0], [23 , 0]],
 [[24 , 0], [25 , 0], [26 , 0], [27 , 0], [28 , 0], [29 , 0], [30 , 0], [31 , 0]],
 [[32 , 0],[33 , 0],[34 , 0],[35 , 0],[36 , 0],[37 , 0],[38 , 0],[39 , 0]],
 [[40 , 0],[41 , 0],[42 , 0],[43 , 0],[44 , 0],[45 , 0],[46 , 0],[47 , 0]],
 [[48 , 1],[49 , 1],[50 , 1],[51 , 1],[52 , 1],[53 , 1],[54 , 1],[55 , 1]],
 [[56 , 5],[57 , 2],[58 , 3],[59 , 10],[60 , 6],[61 , 3],[62 , 2],[63 , 5]]];

    let [checkMate, setCheckmate] = useState(false);
    var [ws, setWs] = useState(undefined);
    console.log('logging ws')
    console.log(ws)

    let game = useSelector(chessState => chessState.chessState);

   let checkData = useSelector(check => check.check)
   let  arrayId = checkData.arrayId;
   // let checkFlag = checkData?.checkFlag;
   let  checkCount = checkData?.checkCount;
   let checkFlag = checkData.checkFlag || false;

   

     console.log('logging checkData');
    // console.log(checkData);
     console.log(checkFlag);
    // console.log(checkCount);


    console.log('logging game');
    console.log(game);
    addPieces()
   

  


    function addPieces() {
        try{
            console.log('inside add pieces');
            console.log('logging game pieces');
            console.log(game);
             
    let game1 = [];
    for(let j = 0; j < 64; j++) {
        let id = game[j].boardValue;
        if(id !== j) {
            game1[id] = game[j];
        

        }
        else{
            game1[j] = game[j];
    
        }
    }

    for(let j = 0; j < 64; j++) {
        game[j] = game1[j];
    }



            
          
 
           

           
            if(game[63].player2 === null || game[63].player2 === undefined) {
                localStorage.setItem('player1', game[63].player1);
            }
            else{
             if(localStorage.getItem('player1') === undefined || localStorage.getItem('player1') === null) {
                localStorage.setItem('player2', game[63].player2);
                if(localStorage.getItem('player2') !== null && localStorage.getItem('player2') !== undefined) {
                    if(localStorage.getItem('player2') !== game[63].player2) {
                        localStorage.setItem('player2', game[63].player2);

                    }
            }
        }
    }
   
      
    
           

        for(let j = 0; j < 64; j++) {
          // console.log('player 1');

          let piece;
        
           piece = game[j]?.pieceValue;
        

           //onsole.log(game[j])
       

                if(piece !== 0) {
                    
                    let btn = document.getElementById(j);
                   
                    switch(piece) {
                        case -5:
                            btn.innerHTML = `<img id = i:${j} src = ${chessImages[10]?.image} alt = "pic of chess pieces" height = ${50} width= ${50} ></img>`
                            console.log('logging btn');
                            console.log(btn);
                            break;

                        case -2:
                            btn.innerHTML = `<img id = i:${j} src = ${chessImages[5]?.image} alt = "pic of chess pieces" height = ${50} width= ${50} ></img>`
                            break;
                        case -3:
                            btn.innerHTML = `<img id = i:${j} src = ${chessImages[0]?.image} alt = "pic of chess pieces" height = ${50} width= ${50} ></img>`
                            break;
                        case -10:
                            btn.innerHTML = `<img id = i:${j} src = ${chessImages[8]?.image} alt = "pic of chess pieces" height = ${50} width= ${50} ></img>`
                            break;
                        case -6:
                            btn.innerHTML = `<img id = i:${j} src = ${chessImages[3]?.image} alt = "pic of chess pieces" height = ${50} width= ${50} ></img>`
                            break;
                        case -1:
                            btn.innerHTML = `<img id = i:${j} src = ${chessImages[2]?.image} alt = "pic of chess pieces" height = ${50} width= ${50} ></img>`
                            break;

                        case 5:
                            btn.innerHTML = `<img id = i:${j} src = ${chessImages[11]?.image} alt = "pic of chess pieces" height = ${50} width= ${50} ></img>`
                            break;
                        case 2:
                            btn.innerHTML = `<img id = i:${j} src = ${chessImages[6]?.image} alt = "pic of chess pieces" height = ${50} width= ${50} ></img>`
                            break;
                        case 3:
                            btn.innerHTML = `<img id = i:${j} src = ${chessImages[1]?.image} alt = "pic of chess pieces" height = ${50} width= ${50} ></img>`
                            break;
                        case 10:
                            btn.innerHTML = `<img id = i:${j} src = ${chessImages[9]?.image} alt = "pic of chess pieces" height = ${50} width= ${50} ></img>`
                            break;
                        case 1:
                            btn.innerHTML = `<img id = i:${j} src = ${chessImages[7]?.image} alt = "pic of chess pieces" height = ${50} width= ${50} ></img>`
                            break;
                        case 6:
                            btn.innerHTML = `<img id = i:${j} src = ${chessImages[4]?.image} alt = "pic of chess pieces" height = ${50} width= ${50} ></img>`
                            break;







                        default:
                            break;
                    }
                }
                else {
                    let btn = document.getElementById(j);
                    btn.innerHTML = "";
                }
              

                
    


}
  
    
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
                if(className === 'colorBlack') {
                    btn.classList.add('colorWhite');
                }
                else{
                    btn.classList.add('colorBlack');
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
                if(className === 'colorBlack') {
                    btn.classList.add('colorWhite');
                }
                else{
                    btn.classList.add('colorBlack');
                }
            }
            else{
                btn.classList.add('colorBlack');
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
        if(chessImages?.length > 2) {
       addStyles();
        }
        addPieces();
        detectCheckmate();
        if(checkFlag === true) {
            console.log('logging turn of player from else');
            if(checkmate(turn) === true) {
                console.log('CHECKMATE');
                setCheck(false);
                setCheckmate(true);
            }
            else if(checkmate(turn) === true) {
                console.log('CHECKMATE');
                setCheck(false);
                setCheckmate(true);
            }
            console.log('logging turn of player from else');
           
        }
        
       
        
    },[chessImages.length, game[0]])
  

   




   function makeAMove(id) {
     
        let pieceValue = 0;
        let pieceValue2 = 0;
        let boardValue2 = 0;
        let game1 = [];
        for(let j = 0; j < 64; j++) {
            let id = game[j].boardValue;
            if(id !== j) {
                game1[id] = game[j];
            
    
            }
            else{
                game1[j] = game[j];
        
            }
        }
    
        for(let j = 0; j < 64; j++) {
            game[j] = game1[j];
        }
    
       

        let y = 0;

        if(arrayId.length === 3) {
            pieceValue2 = game[arrayId[arrayId.length - 1]].pieceValue;
            game[arrayId[arrayId.length - 1]].pieceValue = 0;
            boardValue2 = game[arrayId[arrayId.length - 1]].boardValue;
        }
        console.log('arrayid')
        console.log(arrayId);
        for(let j = 0; j < 64; j++) {
          
        let boardId = game[j].boardValue;

           
                if(boardId === arrayId[1]) {
                    pieceValue = game[j].pieceValue;
                    console.log('logging boardId');
                    console.log(boardId);

                    game[j].pieceValue = 0;
                }
                if(game[j].boardValue === id) {
                  y = j;
                }
          
        }
            if(pieceValue === 6 && arrayId.length < 3) {
               dispatch(castlingWhiteActionCreator());
            }
            if(pieceValue === -6 && arrayId.length < 3) {
                dispatch(castlingBlackActionCreator());
            }
            if(pieceValue === 5 && arrayId[1] === 56) {
                dispatch(castlingWhiteLeftActionCreator());
            }
            if(pieceValue === 5 && arrayId[1] === 63) {
                dispatch(castlingWhiteRightActionCreator())
            }
            if(pieceValue === -5 && arrayId[1] === 56) {
                dispatch(castlingBlackLeftActionCreator());
            }
            if(pieceValue === -5 && arrayId[1] === 63) {
                dispatch(castlingBlackRightActionCreator());
            }


       game[y].pieceValue = pieceValue;

       console.log('logging gamex')
       console.log(game[y].pieceValue);
       console.log(y);
       console.log(pieceValue)
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
                payload[j] = [game[j].boardValue, game[j].pieceValue];
            }
        let gameId = {};
         gameId = game[0].gameId;
        console.log('logging payload of move');
        console.log(payload);

        dispatch(getStateActionCreator(payload, gameId, false));
        addStyles();
        addPieces(); 
        check = false;
        dispatch(checkCountDecrementActionCreator());
        let player1 = localStorage.getItem('player1');
        let player2 = localStorage.getItem('player2')
        
        if(turn === 1)
        {
        dispatch(inrementActionCreator())
        }
    else{
        dispatch(decrementActionCreator())
       
    }

        if(player1 !== null && player1 === game[63].player1) {
            ws.send(2)
        }
        else {
            if(player2 !== null && player2=== game[63].player2)
            ws.send(1)
    }

        
}
          
    
      // dispatch(checkCountDecrementActionCreator());
      // dispatch(checkFalseActionCreator());
   


    function detectCheckmate() {

        try{
        
        let game1 = [];
        for(let j = 0; j < 64; j++) {
            let id = game[j].boardValue;
            if(id !== j) {
                game1[id] = game[j];
                console.log('id, j');
                console.log(game1[id]);
            }
            else{
                game1[j] = game[j];
                console.log('j, id from else');
                console.log(game1[j])
            }
        }

        for(let j = 0; j < 64; j++) {
            game[j] = game1[j];
        }}catch(err){
            console.log(err);
        }

        if(turn === 2) {
            console.log('detecting check for black king')
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
                            let initialCheckCount = 0;
                            if(leftIndexY >= 0) {
                                
                                let indexId = id - 1;
                                let piece1 = game[indexId]?.pieceValue;
                                
                                if(piece1 === 5 || piece1 === 10) {
                                    let btn2 = document.getElementById(indexId);
                                    btn2.classList.add('colorCheck');
                                    initialCheckCount++;
                                    console.log('logging checkCount')
                                    console.log(checkCount);
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
                                        initialCheckCount++;
                                        console.log('logging checkCount')
                                        console.log(checkCount);
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
                                            initialCheckCount++;
    
    console.log('logging checkCount')
    console.log(checkCount);                                        dispatch(detectCheckActionCreator());
                                           //setCheck(true);
                                                                //   setCheck(true);
                        
    
                                            break;
    
                                        default:
                                            break;
                                    }
                                }
                                if(initialCheckCount === 1) {
                                    checkCount++;
                                }
                            }
                        }catch(err) {
                            console.log(err);
                        }
    //check detection from right side for black king
                        try{
                            let initialCheckCount = 0;
                            if(rightIndexY <= 7) {
                                
                                let indexId = id + 1;
                                let piece1 = game[indexId]?.pieceValue;
                              //only rook or queen
                                if(piece1 === 5 || piece1 === 10) {
                                    let btn2 = document.getElementById(indexId);
                                    btn2.classList.add('colorCheck');
                                    initialCheckCount++;
                                    console.log('logging checkCount')
                                    console.log(checkCount);
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
                                        initialCheckCount++;
                                        console.log('logging checkCount')
                                        console.log(checkCount);
                                        dispatch(detectCheckActionCreator());
                                       // setCheck(true);
                                                            //   setCheck(true);
                        
    
                                        break;
    
                                        case 10:
                                            for(indexId; indexId > id; indexId--) {
                                                let btn2 = document.getElementById(indexId);
                                                btn2.classList.add('colorCheck');
                                            }
                                        
                                            btn1.classList.add('colorCheck')
                                            dispatch(detectCheckActionCreator());
                                            checkCount++;
                                            initialCheckCount++;
                                            console.log('logging checkCount')
                                            console.log(checkCount);
                                          // setCheck(true);
                                                               //   setCheck(true);
                        
    
                                            break;
    
                                        default:
                                            break;
                                    }
                                }
                            }
                            if(initialCheckCount === 1) {
                                checkCount++;
                            }
                           
                        }
                        catch(err) {
                            console.log(err);
                        }
    
    
                        
                        
                        //from up chck detection only rook oe queen
                       
                        try{
                            let initialCheckCount = 0;
                            let upIndexX = indexIdX - 1;
                            if(upIndexX >= 0) {
                                let id = board[indexIdX][indexIdY];
                                let indexId = id - 8;
                               
                                let piece1 = game[indexId].pieceValue;
                                if(piece1 === 5 || piece1 === 10) {
                                    let btn2 = document.getElementById(indexId);
                                    btn2.classList.add('colorCheck');
                                    console.log('logging checkCount')
                                    initialCheckCount++;
                                    console.log(checkCount);
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
                                            initialCheckCount++;
                                            console.log('logging checkCount')
                                            console.log(checkCount);
        
                                            dispatch(detectCheckActionCreator());
                                           // setCheck(true)
                                                                //   setCheck(true);
                        
    
                                            break;
    
                                            case 10:
                                                for(indexId; indexId < id; indexId += 8) {
                                                    let btn2 = document.getElementById(indexId);
                                                    btn2.classList.add('colorCheck');
                                                }
                                                btn1.classList.add('colorCheck');
                                                checkCount++;
                                                initialCheckCount++;
                                                console.log('logging checkCount')
                                                console.log(checkCount);
    
                                                dispatch(detectCheckActionCreator());
                                               // setCheck(true)
                                                                    //   setCheck(true);
                        
    
                                                break;
                                            default:break;
                                    }
                                }
                                if(initialCheckCount === 1) {
                                    checkCount++;
                                }
                            }
                            
    
                        }
                        catch(err) {
                            console.log(err);
                        }

                        //check detection from down side -- rook or Queen
                        try{
                            let initialCheckCount = 0;
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
                                       // checkCount++;
                                       initialCheckCount++;
                                        console.log('logging checkCount')
                                        console.log(checkCount);
                                        dispatch(detectCheckActionCreator());
                                        break;
    
                                    case 10:
                                        btn1.classList.add('colorCheck');
                                      //  checkCount++;
                                      initialCheckCount++;
                                        console.log('logging checkCount')
                                        console.log(checkCount);
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
                                        initialCheckCount++;
                                        console.log('logging checkCount')
                                        console.log(checkCount);
                                        dispatch(detectCheckActionCreator());
                                       // setCheck(true)
                                                            //   setCheck(true);
                        
    
                                        break;
    
                                        case 10:
                                            for(indexId; indexId > id; indexId -= 8) {
                                                let btn2 = document.getElementById(indexId);
                                                btn2.classList.add('colorCheck');
                                            }
        
                                            btn1.classList.add('colorCheck');
                                            checkCount++
                                            initialCheckCount++;
    
    console.log('logging checkCount')
    console.log(checkCount);                                        dispatch(detectCheckActionCreator());
                                         //   setCheck(true)
                                                              //   setCheck(true);
                        
    
                                            break;
                                        default:break;
                            }
                        }
                      
                        if(initialCheckCount === 1) {
                            checkCount++;
                        }
                    }}catch(err) {
                            console.log(err);
                        }

                        //detecting check diagonally
                        //from left up(relative to black king)
                        try{
                            let initialCheckCount = 0;
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
    
    console.log('logging checkCount')
    console.log(checkCount);                                dispatch(detectCheckActionCreator());
                                    break;
                                case 3:
                                    btn1.classList.add('colorCheck');
                                   // checkCount++
                                   initialCheckCount++;
    
    console.log('logging checkCount')
    console.log(checkCount);                                dispatch(detectCheckActionCreator());
                                    break;
                                case 10:
                                    btn1.classList.add('colorCheck');
                                   // checkCount++
                                   initialCheckCount++;
    
    console.log('logging checkCount')
    console.log(checkCount);                                dispatch(detectCheckActionCreator());
                                    break;
                                    //setCheck(true)
                                                         //   setCheck(true);
                        
    
                                    
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
                                        initialCheckCount++;
                                        console.log('logging checkCount')
                                        console.log(checkCount);
                                        dispatch(detectCheckActionCreator());
                                       // setCheck(true)
                                                            //   setCheck(true);
                        
    
                                        break;
                                    case 10:
                                        for(indexId; indexId < id; indexId += 9) {
                                            let btn2 = document.getElementById(indexId);
                                            btn2.classList.add('colorCheck');
                                        }
                                        btn1.classList.add('colorCheck');
                                        checkCount++;
                                        initialCheckCount++;
                                        console.log('logging checkCount')
                                        console.log(checkCount);
                                        dispatch(detectCheckActionCreator());
                                       // setCheck(true)
                                                            //   setCheck(true);
                        
    
                                        break;
                                    default:
                                        break;
                                }
                            }
    
                            if(initialCheckCount === 1) {
                                checkCount++;
                            }
                        }}catch(err) {
                            console.log(err);
                        }
                        try{
                           
                            let initialCheckCount = 0;
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
                                        console.log('logging checkCount')
                                        console.log(checkCount);
                                        dispatch(detectCheckActionCreator());
                                        break;
                                    case 3:
                                        btn1.classList.add('colorCheck');
                                       // checkCount++;
                                       initialCheckCount++;
                                        console.log('logging checkCount')
                                        console.log(checkCount);
                                        dispatch(detectCheckActionCreator());
                                        break;
                                    case 10:
                                        btn1.classList.add('colorCheck');
                                      //  checkCount++;
                                      initialCheckCount++;
                                        console.log('logging checkCount')
                                        console.log(checkCount);
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
                                        initialCheckCount++;
                                        console.log('logging checkCount')
                                        console.log(checkCount);
                                        dispatch(detectCheckActionCreator());
                                        break;
                                    case 10:
                                        for(indexId; indexId < id; indexId += 7) {
                                            let btn2 = document.getElementById(indexId);
                                            btn2.classList.add('colorCheck');
                                        }
                                      
                                        btn1.classList.add('colorCheck');
                                        checkCount++;
                                        initialCheckCount++;
                                        console.log('logging checkCount')
                                        console.log(checkCount);
                                        dispatch(detectCheckActionCreator());
                                        break;
                                        default:break;
                                        
                                }
                            }
    
    
                            if(initialCheckCount === 1) {
                                checkCount++;
                            }
                        }
                        }catch(err) {
                            console.log(err);
                        }
    //detecting check for black king from left--down--diagonal
                        try{
                            let initialCheckCount = 0;
                        let leftDownDiagIndexX = indexIdX + 1;
                        let leftDownDiagIndexY = indexIdY -1;
                        if(leftDownDiagIndexX <= 7 && leftDownDiagIndexY >= 0) {
                        let id = board[indexIdX][indexIdY];
                        let indexId = id + 7;
                      
                            let piece1 = game[indexId]?.pieceValue;
                            if(piece1 > 0) {
                                let btn1 = document.getElementById(indexId);
                                switch(piece1) {
                                    case 1:
                                        btn1.classList.add('colorCheck');
                                        checkCount++;
                                        console.log('logging checkCount')
                                        console.log(checkCount);
                                        dispatch(detectCheckActionCreator());
                                        break;
                                    case 3:
                                        btn1.classList.add('colorCheck');
                                       // checkCount++
                                       initialCheckCount++;
    
    console.log('logging checkCount')
    console.log(checkCount);                                    dispatch(detectCheckActionCreator());
                                        break;
                                    case 10:
                                        btn1.classList.add('colorCheck');
                                      //  checkCount++
                                      initialCheckCount++;
    
    console.log('logging checkCount')
    console.log(checkCount);                                    dispatch(detectCheckActionCreator());
                                        break;
                                    default:break;
                                }
    
                                while(piece1 === 0 && leftDownDiagIndexX < 7 && leftDownDiagIndexY > 0) {
                                    leftDownDiagIndexX++;
                                    leftDownDiagIndexY--;
                                    indexId += 7;
                                    piece1 = game[indexId]?.pieceValue;
                                }
                                if(piece1 > 0) {
                                    let btn1 = document.getElementById(indexId);
                                    switch(piece1) {

                                        case -3:
                                            for(indexId; indexId > id; indexId -= 7) {
                                                let btn2 = document.getElementById(indexId);
                                                btn2.classList.add('colorCheck');
                                            }
                                          
                                            btn1.classList.add('colorCheck');
                                            checkCount++;
                                            initialCheckCount++;
                                            console.log('logging checkCount')
                                            console.log(checkCount);
        
                                            dispatch(detectCheckActionCreator());
                                            break;
                                        case 10:
                                            for(indexId; indexId > id; indexId -= 7) {
                                                let btn2 = document.getElementById(indexId);
                                                btn2.classList.add('colorCheck');
                                            }
                                            btn1.classList.add('colorCheck');
                                            checkCount++
                                            initialCheckCount++;
    
    console.log('logging checkCount')
    console.log(checkCount);                                        dispatch(detectCheckActionCreator());
                                            break;
                                            default:break;
                                            
                                    }
                                }
                            }
                            if(initialCheckCount === 1) {
                                checkCount++;
                            }
                        }}catch(err) {
                            console.log(err);
                        }
    
    //detecting check from right-down-diagonal---relative to black king
                        try{
                            let initialCheckCount = 0;
                        let rightDownDiagIndexX = indexIdX + 1;
                        let rightDownDiagIndexY = indexIdY + 1;
    
                        if(rightDownDiagIndexX <= 7 && rightDownDiagIndexY <= 7) {
                        let id = board[indexIdX][indexIdY];
    
                        let indexId = id + 9;
                      
                            let piece1 = game[indexId]?.pieceValue;
                            if(piece1 > 0) {
                                let btn1 = document.getElementById(indexId);
                                switch(piece1) {
                                    case 1:
                                    btn1.classList.add('colorCheck');
                                    checkCount++
    
    console.log('logging checkCount')
    console.log(checkCount);                                dispatch(detectCheckActionCreator());
                                    break;
                                case 3:
                                    btn1.classList.add('colorCheck');
                                   // checkCount++;
                                    console.log('logging checkCount')
                                    console.log(checkCount);
                                    initialCheckCount++;
                                    dispatch(detectCheckActionCreator());
                                    break;
                                case 10:
                                    btn1.classList.add('colorCheck');
                                  //  checkCount++;
                                  initialCheckCount++;
                                    console.log('logging checkCount')
                                    console.log(checkCount);
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
                                            initialCheckCount++;
                                            console.log('logging checkCount')
                                            console.log(checkCount);
        
                                            dispatch(detectCheckActionCreator());
                                            break;
    
                                            case 10:
                                                for(indexId; indexId > id; indexId -= 9) {
                                                    let btn2 = document.getElementById(indexId);
                                                    btn2.classList.add('colorCheck');
                                                }
        
                                                btn1.classList.add('colorCheck');
                                                checkCount++;
                                                initialCheckCount++;
                                                console.log('logging checkCount')
                                                console.log(checkCount);
    
                                                dispatch(detectCheckActionCreator());
                                                break;
                                            default:break;
    
                                    }
                                }
                            }
                        }
    
                        if(initialCheckCount === 1) {
                            checkCount++;
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
                            console.log('logging checkCount')
                            console.log(checkCount);
                            dispatch(detectCheckActionCreator());
                           // setCheck(true);
                                                //   setCheck(true);
                        
    
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
                            console.log('logging checkCount')
                            console.log(checkCount);
                            dispatch(detectCheckActionCreator());
                           // setCheck(true);
                                                //   setCheck(true);
                        
    
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
                            console.log('logging checkCount')
                            console.log(checkCount);
                            dispatch(detectCheckActionCreator());
                          //  setCheck(true);
                                               //   setCheck(true);
                        
    
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
                            console.log('logging checkCount')
                            console.log(checkCount);
                            dispatch(detectCheckActionCreator());
                          //  setCheck(true);
                                               //   setCheck(true);
                        
    
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
                            console.log('logging checkCount')
                            console.log(checkCount);
                            dispatch(detectCheckActionCreator());
                          //  setCheck(true);
                                               //   setCheck(true);
                        
    
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
                            console.log('logging checkCount')
                            console.log(checkCount);
                            dispatch(detectCheckActionCreator());
                          //  setCheck(true);
                                               //   setCheck(true);
                        
    
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
                            console.log('logging checkCount')
                            console.log(checkCount);
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
                       
                         if(pieceRightTwoDown === 2) {
                            btn1.classList.add('colorCheck');
                            checkCount++;
                            console.log('logging checkCount')
                            console.log(checkCount);
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
                console.log('detecting check for white king')
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
                            let initialCheckCount = 0;
                            
                            let indexId = id - 1;
                            let piece1 = game[indexId]?.pieceValue;
                         
                            if(piece1 === -5 || piece1 === -10) {
                                let btn2 = document.getElementById(indexId);
                                btn2.classList.add('colorCheck');
                                console.log('logging checkCount')
                                console.log(checkCount);
                                initialCheckCount++;
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
                                    initialCheckCount++;
                                    checkCount++;
                                    console.log('logging checkCount')
                                    console.log(checkCount);
                                    dispatch(detectCheckActionCreator());
                                
                                    //setCheck(true);
                                                         //   setCheck(true);
                    

                                    break;

                                    case -10:
                                        for(indexId; indexId < id; indexId++) {
                                            let btn2 = document.getElementById(indexId);
                                            btn2.classList.add('colorCheck');
                                        }
                                        btn1.classList.add('colorCheck');
                                        checkCount++
                                        initialCheckCount++;

console.log('logging checkCount')
console.log(checkCount);                                        dispatch(detectCheckActionCreator());
                                       //setCheck(true);
                                                            //   setCheck(true);
                    

                                        break;

                                    default:
                                        break;
                                }
                            }
                            if(initialCheckCount === 1) {
                                checkCount++;
                            }
                        }
                    }catch(err) {
                        console.log(err);
                    }

                    //detecting check from right side
                    try{
                        if(rightIndexY <= 7) {
                            let initialCheckCount = 0;
                            
                            let indexId = id + 1;
                            let piece1 = game[indexId]?.pieceValue;
                           
                            if(piece1 === -5 || piece1 === -10) {
                                let btn2 = document.getElementById(indexId);
                                btn2.classList.add('colorCheck');
                                console.log('logging checkCount')
                                console.log(checkCount);
                                initialCheckCount++;
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
                                    initialCheckCount++;
                                    console.log('logging checkCount')
                                    console.log(checkCount);
                                    dispatch(detectCheckActionCreator());
                                   // setCheck(true);
                                                        //   setCheck(true);
                    

                                    break;

                                    case -10:
                                        for(indexId; indexId > id; indexId--) {
                                            let btn2 = document.getElementById(indexId);
                                            btn2.classList.add('colorCheck');
                                        }
                                        btn1.classList.add('colorCheck')
                                        dispatch(detectCheckActionCreator());
                                        checkCount++;
                                        initialCheckCount++;
                                        console.log('logging checkCount')
                                        console.log(checkCount);
                                      // setCheck(true);
                                                           //   setCheck(true);
                    

                                        break;

                                    default:
                                        break;
                                }
                            }
                            if(initialCheckCount === 1) {
                                checkCount++;
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
                            let initialCheckCount = 0;
                            let id = board[indexIdX][indexIdY];
                            let indexId = id - 8;
                          
                            let piece1 = game[indexId]?.pieceValue;
                            if(piece1 === -5 || piece1 === -10) {
                                let btn2 = document.getElementById(indexId);
                                btn2.classList.add('colorCheck');
                                console.log('logging checkCount')
                                console.log(checkCount);
                                initialCheckCount++;
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
                                        initialCheckCount++;
                                        console.log('logging checkCount')
                                        console.log(checkCount);
    
                                        dispatch(detectCheckActionCreator());
                                       // setCheck(true)
                                                            //   setCheck(true);
                    

                                        break;

                                        case -10:
                                            for(indexId; indexId < id; indexId += 8) {
                                                let btn2 = document.getElementById(indexId);
                                                btn2.classList.add('colorCheck');
                                            }
                                            btn1.classList.add('colorCheck');
                                            checkCount++;
                                            initialCheckCount++;
                                            console.log('logging checkCount')
                                            console.log(checkCount);

                                            dispatch(detectCheckActionCreator());
                                           // setCheck(true)
                                                                //   setCheck(true);
                    

                                            break;
                                        default:break;
                                }
                            }
                            if(initialCheckCount === 1) {
                                checkCount++;
                            }
                        }

                    }
                    catch(err) {
                        console.log(err);
                    }
                    //from down side
                    try{
                        let initialCheckCount = 0;
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
                                   // checkCount++;
                                   initialCheckCount++;
                                    console.log('logging checkCount')
                                    console.log(checkCount);
                                    dispatch(detectCheckActionCreator());
                                    break;

                                case -10:
                                    btn1.classList.add('colorCheck');
                                  //  checkCount++;
                                  initialCheckCount++;
                                    console.log('logging checkCount')
                                    console.log(checkCount);
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
                                    initialCheckCount++;
                                    console.log('logging checkCount')
                                    console.log(checkCount);
                                    dispatch(detectCheckActionCreator());
                                   // setCheck(true)
                                                        //   setCheck(true);
                    

                                    break;

                                    case -10:
                                        for(indexId; indexId > id; indexId -= 8) {
                                            let btn2 = document.getElementById(indexId);
                                            btn2.classList.add('colorCheck');
                                        }
    
                                        btn1.classList.add('colorCheck');
                                        checkCount++
                                        initialCheckCount++;

console.log('logging checkCount')
console.log(checkCount);                                        dispatch(detectCheckActionCreator());
                                     //   setCheck(true)
                                                          //   setCheck(true);
                    

                                        break;
                                    default:break;
                        }
                    }
                    if(initialCheckCount === 1) {
                        checkCount++;
                    }}}catch(err) {
                        console.log(err);
                    }

                    //from left--up--diagonal
                    try{
                        let initialCheckCount = 0;
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

console.log('logging checkCount')
console.log(checkCount);                                dispatch(detectCheckActionCreator());
                                break;
                            case -3:
                                btn1.classList.add('colorCheck');
                                initialCheckCount++;
                               // checkCount++

console.log('logging checkCount')
console.log(checkCount);                                dispatch(detectCheckActionCreator());
                                break;
                            case -10:
                                btn1.classList.add('colorCheck');
                                initialCheckCount++;
                               // checkCount++

console.log('logging checkCount')
console.log(checkCount);                                dispatch(detectCheckActionCreator());
                                break;
                                //setCheck(true)
                                                     //   setCheck(true);
                    

                                
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
                                    initialCheckCount++;
                                    console.log('logging checkCount')
                                    console.log(checkCount);
                                    dispatch(detectCheckActionCreator());
                                   // setCheck(true)
                                                        //   setCheck(true);
                    

                                    break;
                                case -10:
                                    for(indexId; indexId < id; indexId += 9) {
                                        let btn2 = document.getElementById(indexId);
                                        btn2.classList.add('colorCheck');
                                    }
                                    btn1.classList.add('colorCheck');
                                    checkCount++;
                                    initialCheckCount++;
                                    console.log('logging checkCount')
                                    console.log(checkCount);
                                    dispatch(detectCheckActionCreator());
                                   // setCheck(true)
                                                        //   setCheck(true);
                    

                                    break;
                                default:
                                    break;
                            }
                        }
                        if(initialCheckCount === 1) {
                            checkCount++;
                        }
                    }}catch(err) {
                        console.log(err);
                    }

                    //Right up - Diagonal
                    try{
                        let initialCheckCount = 0;
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
                                    console.log('logging checkCount')
                                    console.log(checkCount);
                                    dispatch(detectCheckActionCreator());
                                    break;
                                case -3:
                                    btn1.classList.add('colorCheck');
                                   // checkCount++;
                                   initialCheckCount++;
                                    console.log('logging checkCount')
                                    console.log(checkCount);
                                    dispatch(detectCheckActionCreator());
                                    break;
                                case -10:
                                    btn1.classList.add('colorCheck');
                                  //  checkCount++;
                                  initialCheckCount++;
                                    console.log('logging checkCount')
                                    console.log(checkCount);
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
                                    initialCheckCount++;
                                    console.log('logging checkCount')
                                    console.log(checkCount);
                                    dispatch(detectCheckActionCreator());
                                    break;
                                case -10:
                                    for(indexId; indexId < id; indexId += 7) {
                                        let btn2 = document.getElementById(indexId);
                                        btn2.classList.add('colorCheck');
                                    }
                                    btn1.classList.add('colorCheck');
                                    checkCount++;
                                    initialCheckCount++;
                                    console.log('logging checkCount')
                                    console.log(checkCount);
                                    dispatch(detectCheckActionCreator());
                                    break;
                                    default:break;
                                    
                            }
                        }
                        if(initialCheckCount === 1) {
                            checkCount++;
                        }

                    }
                    }catch(err) {
                        console.log(err);
                    }


                    //left down diagonal
                    try{
                        let initialCheckCount = 0;
                    let leftDownDiagIndexX = indexIdX + 1;
                    let leftDownDiagIndexY = indexIdY -1;
                    if(leftDownDiagIndexX <= 7 && leftDownDiagIndexY >= 0) {
                    let id = board[indexIdX][indexIdY];
                    let indexId = id + 7;
                  
                        let piece1 = game[indexId]?.pieceValue;
                        if(piece1 < 0) {
                            let btn1 = document.getElementById(indexId);
                            switch(piece1) {
                                case -1:
                                    btn1.classList.add('colorCheck');
                                    checkCount++;
                                    console.log('logging checkCount')
                                    console.log(checkCount);
                                    dispatch(detectCheckActionCreator());
                                    break;
                                case -3:
                                    btn1.classList.add('colorCheck');
                                    initialCheckCount++;
                                   // checkCount++

console.log('logging checkCount')
console.log(checkCount);                                    dispatch(detectCheckActionCreator());
                                    break;
                                case -10:
                                    btn1.classList.add('colorCheck');
                                    initialCheckCount++;
                                  //  checkCount++

console.log('logging checkCount')
console.log(checkCount);                                    dispatch(detectCheckActionCreator());
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
                                        initialCheckCount++;
                                        console.log('logging checkCount')
                                        console.log(checkCount);
    
                                        dispatch(detectCheckActionCreator());
                                        break;
                                    case -10:
                                        for(indexId; indexId > id; indexId -= 7) {
                                            let btn2 = document.getElementById(indexId);
                                            btn2.classList.add('colorCheck');
                                        }
                                        initialCheckCount++;
                                        btn1.classList.add('colorCheck');
                                        checkCount++

console.log('logging checkCount')
console.log(checkCount);                                        dispatch(detectCheckActionCreator());
                                        break;
                                        default:break;
                                        
                                }
                            }
                        }
                        if(initialCheckCount === 1) {
                            checkCount++;
                        }
                    }}catch(err) {
                        console.log(err);
                    }

                    //from right down

                    try{
                        let initialCheckCount = 0;
                    let rightDownDiagIndexX = indexIdX + 1;
                    let rightDownDiagIndexY = indexIdY + 1;

                    if(rightDownDiagIndexX <= 7 && rightDownDiagIndexY <= 7) {
                    let id = board[indexIdX][indexIdY];

                    let indexId = id + 9;
                  
                        let piece1 = game[indexId]?.pieceValue;
                        if(piece1 < 0) {
                            let btn1 = document.getElementById(indexId);
                            switch(piece1) {
                                case -1:
                                btn1.classList.add('colorCheck');
                                checkCount++

console.log('logging checkCount')
console.log(checkCount);                                dispatch(detectCheckActionCreator());
                                break;
                            case -3:
                                btn1.classList.add('colorCheck');
                               // checkCount++;
                                console.log('logging checkCount')
                                console.log(checkCount);
                                initialCheckCount++;
                                dispatch(detectCheckActionCreator());
                                break;
                            case -10:
                                btn1.classList.add('colorCheck');
                              //  checkCount++;
                              initialCheckCount++;
                                console.log('logging checkCount')
                                console.log(checkCount);
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
                                        initialCheckCount++;
                                        console.log('logging checkCount')
                                        console.log(checkCount);
    
                                        dispatch(detectCheckActionCreator());
                                        break;

                                        case -10:
                                            for(indexId; indexId > id; indexId -= 9) {
                                                let btn2 = document.getElementById(indexId);
                                                btn2.classList.add('colorCheck');
                                            }
    
                                            initialCheckCount++;
                                            btn1.classList.add('colorCheck');
                                            checkCount++;
                                            console.log('logging checkCount')
                                            console.log(checkCount);

                                            dispatch(detectCheckActionCreator());
                                            break;
                                        default:break;

                                }
                            }
                        }
                  
                  if(initialCheckCount === 1) {
                    checkCount++;
                  }  }


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
                        console.log('logging checkCount')
                        console.log(checkCount);
                        dispatch(detectCheckActionCreator());
                       // setCheck(true);
                                            //   setCheck(true);
                    

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
                        console.log('logging checkCount')
                        console.log(checkCount);
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
                        console.log('logging checkCount')
                        console.log(checkCount);
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
                        console.log('logging checkCount')
                        console.log(checkCount);
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
                        console.log('logging checkCount')
                        console.log(checkCount);
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
                    console.log('logging pieceValue');
                    console.log(pieceRight);
                    let btn1 = document.getElementById(rightUp);
                    if(pieceRight === -2) {
                        btn1.classList.add('colorCheck');
                        checkCount++;
                        console.log('logging checkCount')
                        console.log(checkCount);
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
                        console.log('logging checkCount')
                        console.log(checkCount);
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
                        console.log('logging checkCount')
                        console.log(checkCount);
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

   
    function handleGame(e) {
        try{


            let game1 = [];
            for(let j = 0; j < 64; j++) {
                let id = game[j].boardValue;
                if(id !== j) {
                    game1[id] = game[j];
                    console.log('id, j');
                    console.log(game1[id]);
                }
                else{
                    game1[j] = game[j];
                    console.log('j, id from else');
                    console.log(game1[j])
                }
            }

            for(let j = 0; j < 64; j++) {
                game[j] = game1[j];
            }
            

      
          
           console.log('logging from handleGame');
          // console.log(turnOfPlayer[x]);
           
        let imgId = e.target.id;
        let id = (imgId.split(":")[1] === undefined ? imgId : imgId.split(":")[1]);
        id = parseInt(id);
        let btn = document.getElementById(id);
        console.log('logging turn of player from id');
       // console.log(turnOfPlayer[x]);
        if(btn.classList.contains('colorBlue')) {
            console.log('logging turn of player from else');
           // console.log(turnOfPlayer[x]);
            let piece = game[id - 2].pieceValue
            if(piece === 5) {
                arrayId.push(id - 2);
            }
            else{
                console.log('RIGHT CASTLING');
                piece = game[id + 1].pieceValue;
                console.log('logging piece value');
                console.log(piece);
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
          
         
           // detectCheckmate()
           //addPieces()
            return;
        }
        if(btn.classList.contains('colorGreen') || btn.classList.contains('colorRed')) {
            console.log('logging turn of player from else');
          //  console.log(turnOfPlayer[x]);
            makeAMove(id);

            /*
              let board = [[0, 1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30, 31],
    [32, 33, 34, 35, 36, 37, 38, 39],
    [40, 41, 42, 43, 44, 45, 46, 47],
    [48, 49, 50, 51, 52, 53, 54, 55],
    [56, 57, 58, 59, 60, 61, 62, 63]];

   let initGame =  [[[0 , -5], [1 , -2], [2 , -3], [3 , -10], [4 , -6], [5 , -3], [6 , -2], [7 , -5]],
 [[8 , -1], [9 , -1], [10 , -1], [11 , -1], [12 , -1], [13 , -1], [14 , -1], [15 , -1]],
 [[16 , 0], [17 , 0], [18 , 0], [19 , 0], [20 , 0], [21 , 0], [22 , 0], [23 , 0]],
 [[24 , 0], [25 , 0], [26 , 0], [27 , 0], [28 , 0], [29 , 0], [30 , 0], [31 , 0]],
 [[32 , 0],[33 , 0],[34 , 0],[35 , 0],[36 , 0],[37 , 0],[38 , 0],[39 , 0]],
 [[40 , 0],[41 , 0],[42 , 0],[43 , 0],[44 , 0],[45 , 0],[46 , 0],[47 , 0]],
 [[48 , 1],[49 , 1],[50 , 1],[51 , 1],[52 , 1],[53 , 1],[54 , 1],[55 , 1]],
 [[56 , 5],[57 , 2],[58 , 3],[59 , 10],[60 , 6],[61 , 3],[62 , 2],[63 , 5]]];

 */
        
           
           //addPieces()
           dispatch(arrayDecrementActionCreator());
            return;
        }
        else{
            if(checkFlag === true) {
                console.log('logging turn of player from else');
                if(checkmate(turn) === true) {
                    console.log('CHECKMATE');
                    setCheck(false);
                    setCheckmate(true);
                }
                console.log('logging turn of player from else');
               // console.log(turnOfPlayer[x]);
            }
            console.log('logging turn of player from else');
          //  console.log(turnOfPlayer[x]);
        
            arrayId = [];
            arrayId.push(imgId);
            arrayId.push(id);
             let payload = {};
             payload = {arrayId : arrayId}
            dispatch(arrayIdActionCreator(payload))
            console.log('logging arrayId:');
            console.log(arrayId);
            addStyles();
           console.log('logging turn of player from else');
           //console.log(turnOfPlayer[x]);
        
    }
        
       
        detectCheckmate();
        
        let xIndex = -1;
        let yIndex = -1;
        btn.classList.add('colorSelect');
        

        for(let j = 0; j < 8; j++) {
            for(let k = 0; k < 8; k++) {

                if(board[j][k] === id) {
                    let piece = [];
                
                    piece.push(id);
                    piece.push(game[id]?.pieceValue);
                    console.log('logging piece');
                    console.log(piece);
                 if(piece[1] !== 0) {
                        if(turn === 2) {
                        xIndex = j;
                        yIndex = k;
                       
                        if(turn === 2) {
                            console.log('player2 from line 2355')
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
                                        btn1.classList.add('colorGreen');
                                    }
                                    else if(pieceUp > 0) {
                                        btn1.classList.add('colorRed');
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
                                    console.log('pieceUp');
                                    let btn1 = document.getElementById(oneUp);
                                        if(pieceUp > 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                             btn1.classList.add('colorRed');
                                             btn1.classList.remove('colorCheck')
                                        }
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
                                        btn1.classList.add('colorGreen');
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
                                        btn1.classList.add('colorGreen');
                                    }
                                    else if(pieceLeft > 0) {
                                        btn1.classList.add('colorRed');
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
                                        btn1.classList.add('colorGreen');
                                    }
                                 else if(pieceRight > 0) {
                                        btn1.classList.add('colorRed');
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
                                            if(yIndex >= 7) {
                                        let pieceRight = game[oneRight]?.pieceValue;
                                     
                                        while(pieceRight === 0 || pieceRight > 0) {
                                        
                                            let btn1 = document.getElementById(oneRight);
                                           
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
                                            btn1.classList.add('colorGreen');
                                        }
                                        else if(pieceUpRight > 0) {
                                            btn1.classList.add('colorRed');
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
                                            btn1.classList.add('colorGreen');
                                        }
                                        else if(pieceUpLeft > 0) {
                                            btn1.classList.add('colorRed');
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
                                            btn1.classList.add('colorGreen');
                                        }
                                        else if(pieceDownLeft > 0) {
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
                                            btn1.classList.add('colorGreen');
                                        }
                                        else if(pieceDownRight > 0) {
                                            btn1.classList.add('colorRed');
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
                                            btn1.classList.add('colorGreen');
                                        }
                                        else if(pieceLeftUp > 0) {
                                            btn1.classList.add('colorRed');
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
                                            btn1.classList.add('colorGreen');
                                        }
                                        else if(pieceRight > 0) {
                                            btn1.classList.add('colorRed');
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
                                            btn1.classList.add('colorGreen');
                                        }
                                        else if(pieceLeftTwoDown > 0) {
                                            btn1.classList.add('colorRed');
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
                                            btn1.classList.add('colorGreen');
                                        }
                                        else if(pieceRightTwoDown > 0) {
                                            btn1.classList.add('colorRed');
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
                                    btnLeftUp.classList.add('colorGreen');
                                }
                               else if(pieceLeftUp > 0) {
                                console.log('from left up color red')
                                console.log(pieceLeftUp);
                                console.log(diagLeftUp);
                                    btnLeftUp.classList.add('colorRed');
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
                                console.log('error from leftUp')
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
                                    btnRightUp.classList.add('colorGreen');
                                }
                              else  if(pieceRightUp > 0) {
                                    btnRightUp.classList.add('colorRed');
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
                                console.log('error from RighttUp')
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
                                    btnRightDown.classList.add('colorGreen');
                                }
                             else   if(pieceRightDown > 0) {
                                console.log('from right down color red')
                                    btnRightDown.classList.add('colorRed');
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
                                    console.log('from right down color red')
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
                                console.log('error from RightDown')
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
                                    btnLeftDown.classList.add('colorGreen');
                                }
                             else   if(pieceLeftDown > 0) {
                                console.log('from left down color red')
                                    btnLeftDown.classList.add('colorRed');
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
                                    console.log('from left down color red')
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
                                console.log('error from leftDown')
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
                                    btn1.classList.add('colorGreen');
                                }
                                else if(pieceUp > 0) {
                                    btn1.classList.add('colorRed');
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
                                break;
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
                                    btn1.classList.add('colorGreen');
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
                                break;
                            }
                            xIndex = j;
                            yIndex = k;
                            try{

                                if(checkFlag === false) {
                                    yIndex--;
                                    if(yIndex >= 0) {
                                    
                                let   oneLeft = id - 1;
                              
                            let pieceLeft = game[oneLeft]?.pieceValue;
                            yIndex--;
                            while(pieceLeft === 0 || pieceLeft > 0) {
                               
                                let btn1 = document.getElementById(oneLeft);
                                if(pieceLeft === 0) {
                                    btn1.classList.add('colorGreen');
                                }
                                else if(pieceLeft > 0) {
                                    btn1.classList.add('colorRed');
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
                                break;
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
                                    btn1.classList.add('colorGreen');
                                }
                              else  if(pieceRight > 0) {
                                    btn1.classList.add('colorRed');
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
                                break;
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
                                    btnLeftUp.classList.add('colorGreen');
                                }
                               else if(pieceLeftUp > 0) {
                              
                                    btnLeftUp.classList.add('colorRed');
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
                                console.log('error from leftUp')
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
                                    btnRightUp.classList.add('colorGreen');
                                }
                              else  if(pieceRightUp > 0) {
                                    btnRightUp.classList.add('colorRed');
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
                                console.log('error from RighttUp')
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
                                    btnRightDown.classList.add('colorGreen');
                                }
                             else if(pieceRightDown > 0) {
                                    btnRightDown.classList.add('colorRed');
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
                                console.log('error from RightDown')
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
                                    btnLeftDown.classList.add('colorGreen');
                                }
                             else   if(pieceLeftDown > 0) {
                               
                                    btnLeftDown.classList.add('colorRed');
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
                                console.log('error from leftDown')
                                console.log(err);
                             
                            }



                            break;

                            case -6:


                            try{
                                let oneLeft = id - 1;
                                let twoLeft = id - 2;
                                let z = yIndex;
                                let idIndex = id;

                                if(checkData.castlingBlackLeft === true) {
                                while(z >= 0) {
                                    z--;
                                    idIndex--;
                                    let piece = game[idIndex].pieceValue;
                                    console.log('logging castling');
                                    console.log(piece);
                                    console.log('z' + z);
                                    
                                    if(z === 0) {
                                        let rookpiece = game[idIndex].pieceValue
                                        if(rookpiece === -5) {
                                            let btn1 = document.getElementById(oneLeft);
                                            let btn2 = document.getElementById(twoLeft);
                                            btn1.classList.add('colorBlue');
                                            btn2.classList.add('colorBlue');
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
                                    console.log('logging castling');
                                    console.log(piece);
                                    console.log('z' + z);
                                    
                                    if(z === 7) {
                                        let rookpiece = game[idIndex].pieceValue
                                        if(rookpiece === -5) {
                                            let btn1 = document.getElementById(oneRight);
                                            let btn2 = document.getElementById(twoRight);
                                            btn1.classList.add('colorBlue');
                                            btn2.classList.add('colorBlue');
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
                                                if(pieceBackedUp(leftIndex, leftX, leftY, 0) === false) {
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
                                        }
                                        else{
                                            if(btn1.classList.contains('colorCheck')) {
                                                
                                            }
                                            else if(piece1 === 0 && pieceBackedUp(leftIndex, leftX, leftY, 0) === false){
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
                                                if(pieceBackedUp(rightIndex, rightX, rightY, 0) === false) {
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
                                        }
                                        else{
                                            if(btn1.classList.contains('colorCheck')) {
                                                
                                            }
                                            else if(piece1 === 0  && pieceBackedUp(rightIndex, rightX, rightY, 0) === false){
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
                                                if(pieceBackedUp(upIndex, upX, upY, 0) === false) {
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
                                            else if(piece1 === 0 && pieceBackedUp(upIndex, upX, upY, 0) === false){
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
                                                if(pieceBackedUp(downIndex, downX, downY, 0) === false) {    
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
                                            else if(piece1 === 0 && pieceBackedUp(downIndex, downX, downY, 0) === false){
                                                console.log('FROM down Index');
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
                                                if(pieceBackedUp(leftUpIndex, leftUpX, leftUpY, 0) === false) {
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
                                            console.log('turn of player');
                                           // console.log(turnOfPlayer[x]);
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
                                        
                                             if(piece1 === 0 && pieceBackedUp(leftUpIndex, leftUpX, leftUpY, 0) === false){
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
                                        if(pieceBackedUp(rightUpIndex, rightUpX, rightUpY, 0) === false) {
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
                                            if(pieceBackedUp(rightUpIndex,rightUpX, rightUpY, 0) === false){
                                            btn1.classList.add('colorRed');
                                            }
                                        }
                                    }
                                    else{
                                    
                                         if(piece1 === 0 && pieceBackedUp(rightUpIndex, rightUpX, rightUpY, 0) === false){
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
                                        if(piece1 === 0 && pieceBackedUp(leftDownIndex, leftDownX, leftDownY, 0) === false) {
                                            btn1.classList.add('colorGreen');
                                        }
                                    }
                                    else{
                                        if(piece1 > 0) {
                                            console.log('pieceBackedUp');
                                            console.log(pieceBackedUp(leftDownIndex, leftDownX, leftDownY, 0));
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
                                            if(piece1 === 0 && pieceBackedUp(leftDownIndex, leftDownX, leftDownY, 0) === false) {
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
                                        else if(piece1 === 0 && pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 0) === false) {
                                            btn1.classList.add('colorGreen');
                                        }
                                    }
                                    else{
                                        if(piece1 > 0) {
                                            if(piece1.contains('colorCheck') && pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 0) === false) {
                                                btn1.classList.add('colorRed');
                                                btn1.classList.remove('colorCheck');
                                            }
                                            else{
                                                if(pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 0) === false) {
                                                    btn1.classList.add('colorCheck');
                                                }
                                            }
                                        }
                                        else{
                                            if(piece1 === 0 && pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 0) === false) {
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
                        if(xIndex === 6) {
                            if(checkFlag === false) {
                            console.log('xIndex case pawn white')
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
                                    console.log('both color green?')

                                   
                                    let btn2 = document.getElementById(twoUp);
                                    console.log(btn1);
                                    console.log(btn2);
                                    btn1.classList.add("colorGreen");
                                    btn2.classList.add("colorGreen");
                                }
                                else{
                                    btn1.classList.add("colorGreen");
                                }
                            } 
                            let diagonalOneLeftUp = id - 9;
                            let diagonalOneRightUp = id - 7;
                            let pieceDiagonalLeft = game[diagonalOneLeftUp].pieceValue;
                            let pieceDiagonalRight = game[diagonalOneRightUp].pieceValue;
                            if(pieceDiagonalLeft > 0)  {
                                let btn2 = document.getElementById(diagonalOneLeftUp);
                                btn2.classList.add('colorRed')
                            }
                            if(pieceDiagonalRight > 0) {
                                let btn3 = document.getElementById(diagonalOneRightUp);
                                btn3.classList.add('colorRed');
                            }
                        }
                    else{

                        if(checkCount <= 1) {

                        console.log('xIndex case pawn white')
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
                                console.log(btn1);
                                console.log(btn2);
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
                            let oneUp = id - 8;
                            let pieceOneUp = [];
                            pieceOneUp.push(oneUp);
                            pieceOneUp.push(game[oneUp].pieceValue);
                            if(pieceOneUp[1] === 0) {
                                let btn1 = document.getElementById(oneUp);
                                btn1.classList.add("colorGreen");
                            }
                            let diagonalOneLeftUp = id - 9;
                            let diagonalOneRightUp = id - 7;
                            let pieceDiagonalLeft = game[diagonalOneLeftUp].pieceValue;
                            let pieceDiagonalRight = game[diagonalOneRightUp].pieceValue;
                            if(pieceDiagonalLeft > 0)  {
                                let btn2 = document.getElementById(diagonalOneLeftUp);
                                btn2.classList.add('colorRed')
                            }
                            if(pieceDiagonalRight > 0) {
                                let btn3 = document.getElementById(diagonalOneRightUp);
                                btn3.classList.add('colorRed');
                            }
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
                        else if(turn === 1){
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
                                        btn1.classList.add('colorGreen');
                                    }
                                    else if(pieceUp < 0) {
                                        btn1.classList.add('colorRed');
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
                                let pieceDown = game[oneDown]?.pieceValue;
                                xIndex++;
                                while(pieceDown === 0 || pieceDown < 0) {
                                   
                                    let btn1 = document.getElementById(oneDown);
                                    if(pieceDown === 0) {
                                        btn1.classList.add('colorGreen');
                                    }
                                    else if(pieceDown < 0) {
                                        btn1.classList.add('colorRed');
                                        break;
                                    }
                                    oneDown += 8;
                                    xIndex++;
                                    if(xIndex > 7) {
                                        break;
                                    }
                                    pieceDown = game[oneDown]?.pieceValue;
                                }
                               }
                            else{
                                if(checkCount <= 1) {
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
                                let pieceLeft = game[oneLeft]?.pieceValue;
                                yIndex--;
                                while(pieceLeft === 0 || pieceLeft < 0) {
                                   
                                    let btn1 = document.getElementById(oneLeft);
                                    if(pieceLeft === 0) {
                                        btn1.classList.add('colorGreen');
                                    }
                                    else if(pieceLeft < 0) {
                                        btn1.classList.add('colorRed');
                                        break;
                                    }
                                    oneLeft--;
                                    yIndex--;
                                    if(yIndex < 0) {
                                        break;
                                    }
                                    pieceLeft = game[oneLeft]?.pieceValue;
                                }
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
                                    break;
                                }

                                xIndex = j;
                                yIndex = k;
                                try{
                                    if(checkFlag === false) {
                                        yIndex++;
                                        if(yIndex <= 7) {
                                let pieceRight = game[oneRight]?.pieceValue;
                              
                                while(pieceRight === 0 || pieceRight < 0) {
                                   
                                    let btn1 = document.getElementById(oneRight);
                                    if(pieceRight === 0) {
                                        btn1.classList.add('colorGreen');
                                    }
                                 else if(pieceRight < 0) {
                                        btn1.classList.add('colorRed');
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
                                            yIndex++;
                                            if(yIndex <= 7) {
                                        let pieceRight = game[oneRight]?.pieceValue;
                                     
                                        while(pieceRight === 0 || pieceRight < 0) {
                                          
                                            let btn1 = document.getElementById(oneRight);
                                           
                                          
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
                            if(pieceUpRight === 0) {
                                btn1.classList.add('colorGreen');
                            }
                            else if(pieceUpRight < 0) {
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
                            if(pieceUpLeft === 0) {
                                btn1.classList.add('colorGreen');
                            }
                            else if(pieceUpLeft < 0) {
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
                            if(pieceDownLeft === 0) {
                                btn1.classList.add('colorGreen');
                            }
                            else if(pieceDownLeft < 0) {
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
                            if(pieceDownRight === 0) {
                                btn1.classList.add('colorGreen');
                            }
                            else if(pieceDownRight < 0) {
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
                            if(pieceLeftUp === 0) {
                                btn1.classList.add('colorGreen');
                            }
                            else if(pieceLeftUp < 0) {
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
                            if(pieceRight === 0) {
                                btn1.classList.add('colorGreen');
                            }
                            else if(pieceRight < 0) {
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
                            if(pieceLeftTwoDown === 0) {
                                btn1.classList.add('colorGreen');
                            }
                            else if(pieceLeftTwoDown < 0) {
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
                            if(pieceRightTwoDown === 0) {
                                btn1.classList.add('colorGreen');
                            }
                            else if(pieceRightTwoDown < 0) {
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
                                    btnLeftUp.classList.add('colorGreen');
                                }
                               else if(pieceLeftUp < 0) {
                              
                                    btnLeftUp.classList.add('colorRed');
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
                                    btnRightUp.classList.add('colorGreen');
                                }
                              else  if(pieceRightUp < 0) {
                              
                                    btnRightUp.classList.add('colorRed');
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
                                    btnRightDown.classList.add('colorGreen');
                                }
                             else   if(pieceRightDown < 0) {
                             
                                    btnRightDown.classList.add('colorRed');
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
                                console.log('error from RightDown')
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
                                    btnLeftDown.classList.add('colorGreen');
                                }
                             else   if(pieceLeftDown < 0) {
                             
                                    btnLeftDown.classList.add('colorRed');
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
                                    btn1.classList.add('colorGreen');
                                }
                                else if(pieceUp < 0) {
                                    btn1.classList.add('colorRed');
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
                                    btn1.classList.add('colorGreen');
                                }
                                else if(pieceDown < 0) {
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
                                    btn1.classList.add('colorGreen');
                                }
                                else if(pieceLeft < 0) {
                                    btn1.classList.add('colorRed');
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
                                    btn1.classList.add('colorGreen');
                                }
                              else  if(pieceRight < 0) {
                                    btn1.classList.add('colorRed');
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
                                    btnLeftUp.classList.add('colorGreen');
                                }
                               else if(pieceLeftUp < 0) {
                            
                                    btnLeftUp.classList.add('colorRed');
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
                                    btnRightUp.classList.add('colorGreen');
                                }
                              else  if(pieceRightUp < 0) {
                              
                                    btnRightUp.classList.add('colorRed');
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
                                    btnRightDown.classList.add('colorGreen');
                                }
                             else   if(pieceRightDown < 0) {
                                   btnRightDown.classList.add('colorRed');
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
                                    btnLeftDown.classList.add('colorGreen');
                                }
                             else   if(pieceLeftDown < 0) {
                            
                                    btnLeftDown.classList.add('colorRed');
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
                                try{
                                    if(checkFlag === false) {
                                    let oneLeft = id - 1;
                                    let twoLeft = id - 2;
                                    let z = yIndex;
                                    let idIndex = id;
                                    if(checkData.castlingWhiteLeft === true) {
                                    while(z >= 0) {
                                        z--;
                                        idIndex--;
                                        let piece = game[idIndex].pieceValue;
                                        console.log('logging castling');
                                        console.log(piece);
                                        console.log('z' + z);
                                        
                                        if(z === 0) {
                                            let rookpiece = game[idIndex].pieceValue
                                            if(rookpiece === 5) {
                                                let btn1 = document.getElementById(oneLeft);
                                                let btn2 = document.getElementById(twoLeft);
                                                btn1.classList.add('colorBlue');
                                                btn2.classList.add('colorBlue');
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
                                    if(checkFlag === false) {
                                    yIndex = k;
                                    let oneRight = id + 1;
                                    let twoRight = id + 2;
                                    let z = yIndex;
                                    let idIndex = id;
                                    if(checkData.castlingWhiteRight === true) {
                                    while(z <= 7) {
                                        z++;
                                        idIndex++;
                                        let piece = game[idIndex].pieceValue;
                                        console.log('logging castling');
                                        console.log(piece);
                                        console.log('z' + z);
                                        
                                        if(z === 7) {
                                            let rookpiece = game[idIndex].pieceValue
                                            if(rookpiece === 5) {
                                                let btn1 = document.getElementById(oneRight);
                                                let btn2 = document.getElementById(twoRight);
                                                btn1.classList.add('colorBlue');
                                                btn2.classList.add('colorBlue');
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
                                            if(piece1 === 0 || piece1 < 0) {
                                              
                                                if(piece1 === 0) {
                                                    if(pieceBackedUp(leftIndex, leftX, leftY, 1) === false) {
                                                    btn1.classList.add('colorGreen');
                                                    }
                                                }
                                                else{
                                                    if(pieceBackedUp(leftIndex, leftX, leftY, 1) === false) {
                                                         btn1.classList.add('colorRed');
                                                    }
                                                }
                                            }
                                        }
                                        else{
                                            if(piece1 < 0) {
                                                if(btn1.classList.contains('colorCheck') && pieceBackedUp(leftIndex, leftX, leftY, 1) === false) {
                                                    btn1.classList.add('colorRed');
                                                    btn1.classList.remove('colorCheck');
                                                }
                                            }
                                            else{
                                                if(btn1.classList.contains('colorCheck')) {
                                                    
                                                }
                                                else if(piece1 === 0 && pieceBackedUp(leftIndex, leftX, leftY, 1) === false){
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
                                            if(piece1 === 0 || piece1 < 0) {
                                              
                                                if(piece1 === 0) {
                                                    if(pieceBackedUp(rightIndex, rightX, rightY, 1) === false) {
                                                    btn1.classList.add('colorGreen');
                                                    }
                                                }
                                                else{
                                                    if(pieceBackedUp(rightIndex, rightX, rightY, 1) === false) {
                                                         btn1.classList.add('colorRed');
                                                    }
                                                }
                                            }
                                        }
                                        else{
                                            if(piece1 < 0) {
                                                if(btn1.classList.contains('colorCheck') && pieceBackedUp(rightIndex, rightX, rightY, 1) === false) {
                                                    btn1.classList.add('colorRed');
                                                    btn1.classList.remove('colorCheck')
                                                }
                                            }
                                            else{
                                                if(btn1.classList.contains('colorCheck')) {
                                                    
                                                }
                                                else if(piece1 === 0  && pieceBackedUp(rightIndex, rightX, rightY, 1) === false){
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
                                            if(piece1 === 0 || piece1 < 0) {
                                              
                                                if(piece1 === 0) {
                                                    if(pieceBackedUp(upIndex, upX, upY, 1) === false) {
                                                    btn1.classList.add('colorGreen');
                                                    }
                                                }
                                                else{
                                                    if(pieceBackedUp(upIndex, upX, upY, 1) === false) {
                                                        btn1.classList.add('colorRed');
                                                    }
                                                }
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
                                                if(btn1.classList.contains('colorCheck')) {
                                                    
                                                }
                                                else if(piece1 === 0 && pieceBackedUp(upIndex, upX, upY, 1) === false){
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
                                            if(piece1 === 0 || piece1 < 0) {
                                              
                                                if(piece1 === 0) {
                                                    if(pieceBackedUp(downIndex, downX, downY, 1) === false) {
                                                    btn1.classList.add('colorGreen');
                                                    }
                                                }
                                                else{
                                                    if(pieceBackedUp(downIndex, downX, downY, 1) === false) {    
                                                        btn1.classList.add('colorRed');
                                                    }
                                                }
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
                                                if(btn1.classList.contains('colorCheck')) {
                                                    
                                                }
                                                else if(piece1 === 0 && pieceBackedUp(downIndex, downX, downY, 1) === false){
                                                    console.log('FROM down Index');
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
                                            if(piece1 === 0 || piece1 < 0) {
                                              
                                                if(piece1 === 0) {
                                                    if(pieceBackedUp(leftUpIndex, leftUpX, leftUpY, 1) === false) {
                                                    btn1.classList.add('colorGreen');
                                                    }
                                                }
                                                else{
                                                    if(pieceBackedUp(leftUpIndex, leftUpX, leftUpY, 1) === false) {
                                                        btn1.classList.add('colorRed');
                                                    }
                                                }
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
                                            
                                                 if(piece1 === 0 && pieceBackedUp(leftUpIndex, leftUpX, leftUpY, 1) === false){
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
                                            if(pieceBackedUp(rightUpIndex, rightUpX, rightUpY, 1) === false) {
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
                                                if(pieceBackedUp(rightUpIndex,rightUpX, rightUpY, 1) === false){
                                                btn1.classList.add('colorRed');
                                                }
                                            }
                                        }
                                        else{
                                        
                                             if(piece1 === 0 && pieceBackedUp(rightUpIndex, rightUpX, rightUpY, 1) === false){
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
                                            if(piece1 === 0 && pieceBackedUp(leftDownIndex, leftDownX, leftDownY, 1) === false) {
                                                btn1.classList.add('colorGreen');
                                            }
                                        }
                                        else{
                                            if(piece1 < 0) {
                                                console.log('pieceBackedUp');
                                                console.log(pieceBackedUp(leftDownIndex, leftDownX, leftDownY, 1));
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
                                                if(piece1 === 0 && pieceBackedUp(leftDownIndex, leftDownX, leftDownY, 1) === false) {
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
                                            if(piece1 < 0) {
                                                if(pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 1) === false) {
                                                    btn1.classList.add('colorRed');
                                                }
                                            }
                                            else if(piece1 === 0 && pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 1) === false) {
                                                btn1.classList.add('colorGreen');
                                            }
                                        }
                                        else{
                                            if(piece1 < 0) {
                                                if(piece1.contains('colorCheck') && pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 1) === false) {
                                                    btn1.classList.add('colorRed');
                                                    btn1.classList.remove('colorCheck');
                                                }
                                                else{
                                                    if(pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 1) === false) {
                                                        btn1.classList.add('colorCheck');
                                                    }
                                                }
                                            }
                                            else{
                                                if(piece1 === 0 && pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 1) === false) {
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
                            if(xIndex === 6) {
                                if(checkFlag === false) {
                                console.log('xIndex case pawn white')
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
                                        console.log('both color green?')

                                       
                                        let btn2 = document.getElementById(twoUp);
                                        console.log(btn1);
                                        console.log(btn2);
                                        btn1.classList.add("colorGreen");
                                        btn2.classList.add("colorGreen");
                                    }
                                    else{
                                        btn1.classList.add("colorGreen");
                                    }
                                } 
                                let diagonalOneLeftUp = id - 9;
                                let diagonalOneRightUp = id - 7;
                                let pieceDiagonalLeft = game[diagonalOneLeftUp].pieceValue;
                                let pieceDiagonalRight = game[diagonalOneRightUp].pieceValue;
                                if(pieceDiagonalLeft < 0)  {
                                    let btn2 = document.getElementById(diagonalOneLeftUp);
                                    btn2.classList.add('colorRed')
                                }
                                if(pieceDiagonalRight < 0) {
                                    let btn3 = document.getElementById(diagonalOneRightUp);
                                    btn3.classList.add('colorRed');
                                }
                            }
                        else{

                            if(checkCount <= 1) {

                            console.log('xIndex case pawn white')
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
                                    console.log(btn1);
                                    console.log(btn2);
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

                        }}
                        }

                            else{
                                if(checkFlag === false) {
                                let oneUp = id - 8;
                                let pieceOneUp = [];
                                pieceOneUp.push(oneUp);
                                pieceOneUp.push(game[oneUp].pieceValue);
                                if(pieceOneUp[1] === 0) {
                                    let btn1 = document.getElementById(oneUp);
                                    btn1.classList.add("colorGreen");
                                }
                                let diagonalOneLeftUp = id - 9;
                                let diagonalOneRightUp = id - 7;
                                let pieceDiagonalLeft = game[diagonalOneLeftUp].pieceValue;
                                let pieceDiagonalRight = game[diagonalOneRightUp].pieceValue;
                                if(pieceDiagonalLeft < 0)  {
                                    let btn2 = document.getElementById(diagonalOneLeftUp);
                                    btn2.classList.add('colorRed')
                                }
                                if(pieceDiagonalRight < 0) {
                                    let btn3 = document.getElementById(diagonalOneRightUp);
                                    btn3.classList.add('colorRed');
                                }
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
    }}}}catch(err) {console.log(err);}
}


function pieceBackedUp(id, x, y, color) {
    console.log('logging  color');
    console.log(color);
    let whitePiece = 1;
    let blackPiece = 0;
    if(color === blackPiece) {
        let j = x;
        let k = y;
        //let piece1 = game[id].pieceValue;
        //check for rook & Queen backup
        //upwards
        try{
        let upAxis = id - 8;
        j -= 1;
        if(j >= 0) {
            let piece = game[upAxis].pieceValue;
            if(piece === 5 || piece === 10) {
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
                if(piece === 5 || piece === 10) {
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
        if(piece === 5 || piece === 10) {
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
            if(piece === 5 || piece === 10) {
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
                if(piece === 1 || piece === 3 || piece === 10) {
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
            console.log('RIGHT UP DIAGONAL')
            if(j >= 0 && k <= 7) {
            let rightUpDiag = id - 7;
            let piece = game[rightUpDiag].pieceValue;
            if(piece === 1 || piece === 3 || piece === 10) {
                return true;
            }
            if((piece === 0 || piece === -6)) {
                while((piece === 0 || piece === -6)&& j < 7 && k < 7) {
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
                if(piece === 3 || piece === 10) {
                    return true;
                }

                if(piece === 0 || piece === -6) {
                    while((piece === 0 || piece === -6) && j < 7 && k > 0) {
                        j++;
                        k--;
                        leftDownDiag += 7;
                        piece = game[leftDownDiag].pieceValue;
                    }
                    if(piece === 3 || piece === 10) {
                        return true;
                    }
                    console.log('left doen diagonal');
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
            if(piece === 3 || piece === 10) {
                return true;
            }
            if(piece === 0 || piece === -6) {
                while((piece === 0 || piece === -6) && j < 7 && k < 7) {
                    j++;
                    k++;
                    rightDownDiag += 7;
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
        k--;
        if(k >= 0) {
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
            let leftDown = id + 10;
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
            let piece = game[rightDown].pieceValue;
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
            let piece = game[downRight].pieceValue;
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
            let piece = game[upRight].pieceValue;
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
            let piece = game[rightUp].pieceValue;
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
        if(j === 7 && k === 4) {
            console.log('logging 7, 4') 
            
        }
        //let piece1 = game[id].pieceValue;
        //check for rook & Queen backup
        //upwards
        try{
        let upAxis = id - 8;
        j -= 1;
        if(j >= 0) {
            let piece = game[upAxis].pieceValue;
            if(piece === -5 || piece === -10) {
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
                if(piece === -5 || piece === -10) {
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
        if(piece === -5 || piece === -10) {
            return true;
        }
        if(piece === 0 || piece === 6) {
            while((piece === 0 || piece === 6) && k > 0) {
                k--;
                leftAxis--;
                piece = game[leftAxis].pieceValue;
            }
            console.log('logging king down');
            console.log(k);
            console.log(piece);
            console.log(leftAxis);
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
        console.log('logging right side');
        console.log(j);
        console.log(k);
        if(k <= 7) {
            let rightAxis = id + 1;
            let piece = game[rightAxis].pieceValue;
            if(piece === -5 || piece === -10) {
                console.log('logging right side inside while');
                console.log(piece);
                console.log(rightAxis);
                console.log(k);
                return true;
            }
            if(piece === 0 || piece === 6) {
                while((piece === 0 || piece === 6) && k < 7) {
                    console.log('logging right side inside while');
                    console.log(piece);
                    console.log(rightAxis);
                    console.log(k);
                    k++;
                    rightAxis++;
                    piece = game[rightAxis].pieceValue;
                }
                console.log('logging king down right side');
                console.log(k);
                console.log(piece);
                console.log(rightAxis);
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
                if(piece === -1 || piece === -3 || piece === -10) {
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
            console.log('RIGHT UP DIAGONAL')
            if(j >= 0 && k <= 7) {
            let rightUpDiag = id - 7;
            let piece = game[rightUpDiag].pieceValue;
            if(piece === -1 || piece === -3 || piece === -10) {
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
                if(piece === -3 || piece === -10) {
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
                    console.log('left doen diagonal');
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
            if(piece === -3 || piece === -10) {
                return true;
            }
            if(piece === 0 || piece === 6) {
                while((piece === 0 || piece === 6) && j < 7 && k < 7) {
                    j++;
                    k++;
                    rightDownDiag += 7;
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
        if(k >= 0) {
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

    function handle2PlayerGame(networkFlag) {
        connect();
      
        for(let j = 0; j < 8; j++) {
            initGame[j] = [...initGame[j]];
        }

        let payload = [...initGame];
        dispatch(getStateActionCreator(payload, undefined));
        let btn = document.getElementById('startGame');
        for(let j = 0; j < btn.classList.length; j++) {
            btn.classList.remove(btn.classList[j]);
        }
        btn.classList.add('hide');
        addPieces();
        
   
    }

    function checkmate(color) {
        if(color === 1) {
        let legalMoves = 0;
        for(let j = 0; j < 8; j++) {
            for(let k = 0; k < 8; k++) {
                let id = board[j][k];
                let piece = game[id].pieceValue;
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
                                }
                                else{
                                    if(btn1.classList.contains('colorCheck')) {
                                        
                                    }
                                    else if(piece1 === 0 && pieceBackedUp(leftIndex, leftX, leftY, 1) === false){
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
                                }
                                else{
                                    if(btn1.classList.contains('colorCheck')) {
                                        
                                    }
                                    else if(piece1 === 0  && pieceBackedUp(rightIndex, rightX, rightY, 1) === false){
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
                                    else if(piece1 === 0 && pieceBackedUp(upIndex, upX, upY, 1) === false){
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
                                    else if(piece1 === 0 && pieceBackedUp(downIndex, downX, downY, 1) === false){
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
                                
                                     if(piece1 === 0 && pieceBackedUp(leftUpIndex, leftUpX, leftUpY, 1) === false){
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
                            
                                 if(piece1 === 0 && pieceBackedUp(rightUpIndex, rightUpX, rightUpY, 1) === false){
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
                                    console.log('pieceBackedUp');
                                    console.log(pieceBackedUp(leftDownIndex, leftDownX, leftDownY, 1));
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
                                    if(piece1 === 0 && pieceBackedUp(leftDownIndex, leftDownX, leftDownY, 1) === false) {
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
                           
                         
                      
                                if(piece1 < 0) {
                                    if(piece1.contains('colorCheck') && pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 1) === false) {
                                      legalMoves++;
                                    }
                                    else{
                                        if(pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 1) === false) {
                                           legalMoves++;
                                        }
                                    }
                                }
                                else{
                                    if(piece1 === 0 && pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 1) === false) {
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
                            if(j === 6) {
                            if(checkCount <= 1) {

                                console.log('xIndex case pawn white')
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
                                        console.log(btn1);
                                        console.log(btn2);
                                       
                                    }
                                    else{
                                      
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
    
                            }}
                            else {
                            if(checkCount <= 1) {
                                let oneUp = id - 8;
                                let pieceOneUp = [];
                                pieceOneUp.push(oneUp);
                                pieceOneUp.push(game[oneUp].pieceValue);
                                if(pieceOneUp[1] === 0) {
                                   // let btn1 = document.getElementById(oneUp);
                                  
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
                            }
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
                            }
                        
    
                            
    
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

                            let diagLeftUp = id - 9;
                            
                                if(checkCount <= 1) {
                                  let  xIndex = j;
                                 let   yIndex = k;

                                let pieceLeftUp = game[diagLeftUp]?.pieceValue
                                xIndex--;
                                yIndex--;
                                while(pieceLeftUp === 0 || pieceLeftUp < 0) {
                                        if(xIndex < 0 || yIndex < 0) {
                                            break;
                                        }
                                    let btnLeftUp = document.getElementById(diagLeftUp);
                                   
                                    if(pieceLeftUp < 0) {
                                        if(btnLeftUp.classList.contains('colorCheck')) {
                                            legalMoves++;
                                        }
                                       
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
                                    pieceLeftUp = game[diagLeftUp].pieceValue
                                }


                            }
                            }
                            catch(err) {
                                console.log('error from leftUp')
                                console.log(err);
                            }


                            try{

                      
                            if(checkCount <= 1) {
                             let    xIndex = j;
                           let      yIndex = k;
                            let diagRightUp = id - 7;
                           
                            let pieceRightUp = game[diagRightUp]?.pieceValue
                            xIndex--;
                            yIndex++;
                            while(pieceRightUp === 0 || pieceRightUp < 0) {
                                
                                    if(xIndex <0 || yIndex > 7) {
                                        break;
                                    }
                                let btnRightUp = document.getElementById(diagRightUp);
                               
                                if(pieceRightUp < 0) {
                                console.log('from right up color red')
                                if(btnRightUp.classList.contains('colorCheck')) {
                                   legalMoves++;

                                }
                                else if(pieceRightUp === 0) {
                                    if(btnRightUp.classList.contains('colorCheck')) {
                                      legalMoves++;
                                    }
                                }
                                    break;
                                }
                                diagRightUp -= 7;
                                xIndex--;
                                yIndex++;
                                if(xIndex <0 || yIndex > 7) {
                                    break;
                                }
                                pieceRightUp = game[diagRightUp].pieceValue
                            }


                        }
                        }

                            catch(err) {
                                console.log('error from RighttUp')
                                console.log(err);
                                break;
                            }


                            try{

                              
                                if(checkCount <= 1) {
                              let  xIndex = j;
                              let  yIndex = k;
                                xIndex++;
                                yIndex++;

                                if(xIndex <= 7 && yIndex <= 7) {
                                let diagRightDown = id + 9;
    
    
                                let pieceRightDown = game[diagRightDown]?.pieceValue
                              
                                while(pieceRightDown === 0 || pieceRightDown < 0) {
                                    
                                        if(xIndex > 7 || yIndex > 7) {
                                            break;
                                        }
                                    let btnRightDown = document.getElementById(diagRightDown);
                                   
                                    if(pieceRightDown < 0) {
                                    console.log('from right down color red')
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
                                    pieceRightDown = game[diagRightDown].pieceValue


                            }
                            }}
                        }
                            catch(err) {
                                console.log('error from RightDown')
                                console.log(err);
                                break;
                            }


                            try{

                                     if(checkCount <= 1) {
                               let  xIndex = j;
                             let   yIndex = k;
    
    
                                let diagLeftDown = id + 7;
    
                                let pieceLeftDown= game[diagLeftDown]?.pieceValue
                                xIndex++;
                                yIndex--;
                                while(pieceLeftDown === 0 || pieceLeftDown < 0) {
                                
                                        if(xIndex > 7 || yIndex < 0) {
                                            break;
                                        }
                                    let btnLeftDown = document.getElementById(diagLeftDown);
                                   
                                    if(pieceLeftDown < 0) {
                                    console.log('from left down color red')
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
                                    pieceLeftDown= game[diagLeftDown].pieceValue
    
    
    
    
                                }}

                            
                            }
                            catch(err) {
                                console.log('error from leftDown')
                                console.log(err);
                                break;
                            }

                           
                            try{

                            
                                if(checkCount <= 1) {
                                let  oneUp = id - 8;
                                let xIndex = j;
                           
                             
                                let pieceUp = game[oneUp]?.pieceValue;
                                xIndex--;
                                while(pieceUp === 0 || pieceUp < 0) {
                                    if(xIndex < 0) {
                                        break;
                                    }
                                   
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
                                    pieceUp = game[oneUp].pieceValue;
                                }
                            }


                            }catch(err) {
                                console.log(err);
                                break;
                            }
                           
                            try{

                               
                                if(checkCount <= 1) {
                                    let xIndex = j;
                             
                                let   oneDown = id + 8;
                            
                                let pieceDown = game[oneDown]?.pieceValue;
                                xIndex++;
                                while(pieceDown === 0 || pieceDown < 0) {
                                    if(xIndex > 7) {
                                        break;
                                    }
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
                                    pieceDown = game[oneDown].pieceValue;
                                }
                            }
                            }catch(err) {
                                console.log(err);
                                break;
                            }
                           
                            try{

                            
                                if(checkCount <= 1) {
                                let   oneLeft = id - 1;
                            
                                let yIndex = k;
                              
                                let pieceLeft = game[oneLeft]?.pieceValue;
                                yIndex--;
                                while(pieceLeft === 0 || pieceLeft < 0) {
                                    if(yIndex < 0) {
                                        break;
                                    }
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
                                    pieceLeft = game[oneLeft].pieceValue;
                                }
                            }
                            }catch(err) {
                                console.log(err);
                                break;
                            }

                         
                            try{
                            
                         
                                if(checkCount <= 1) {
                           
                                   let yIndex = k;
                                    yIndex++;
                                    if(yIndex <= 7) {
                                let  oneRight = id + 1;
                                let pieceRight = game[oneRight].pieceValue;
                                let btn1 = document.getElementById(oneRight);
                               
                             
                                while(pieceRight === 0 || pieceRight < 0) {
                                    if(yIndex > 7) {
                                        break;
                                    }
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
                                    pieceRight = game[oneRight].pieceValue;
                                }
                            }}
                            }
                            catch(err) {
                                console.log(err);
                                break;
                            }              

                            break;

                            case 3:
                                try{
                                
                                    
                                  
                                    if(checkCount <= 1) {
                                        let xIndex = j;
                                        let yIndex = k;
                                    let diagLeftUp = id - 9;
                            
                                    let   pieceLeftUp = game[diagLeftUp].pieceValue
                                      xIndex--;
                                      yIndex--;
                                      while(pieceLeftUp === 0 || pieceLeftUp < 0) {
                                              if(xIndex < 0 || yIndex < 0) {
                                                  break;
                                              }
                                          let btnLeftUp = document.getElementById(diagLeftUp);
                                         
                                          if(pieceLeftUp < 0) {
                                          console.log('from left up color red')
                                          console.log(pieceLeftUp);
                                          console.log(diagLeftUp);
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
                                          pieceLeftUp = game[diagLeftUp].pieceValue
                                        }      
                                }
                                }
                                catch(err) {
                                    console.log('error from leftUp')
                                    console.log(err);
                                    break;
                                }
    
                                try{
                                 
                                if(checkCount <= 1) {
                                let   diagRightUp = id - 7;
                                   
                               let xIndex = j;
                               let yIndex = k;
                               let  pieceRightUp = game[diagRightUp].pieceValue
                                xIndex--;
                                yIndex++;
                                while(pieceRightUp === 0 || pieceRightUp < 0) {
                                    
                                        if(xIndex <0 || yIndex > 7) {
                                            break;
                                        }
                                    let btnRightUp = document.getElementById(diagRightUp);
                                  
                                   if(pieceRightUp < 0) {
                                    console.log('from right up color red')
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
                                    pieceRightUp = game[diagRightUp].pieceValue
                                }
                            }
                            
                            }
    
                                catch(err) {
                                    console.log('error from RighttUp')
                                    console.log(err);
                                    break;
                                }
    
                                try{
                                 
                                    if(checkCount <= 1) {
          
                                    let   diagRightDown = id + 9;
                               let xIndex = j;
                              let  yIndex = k;
    
    
                              let   pieceRightDown = game[diagRightDown]?.pieceValue
                                xIndex++;
                                yIndex++;
                                while(pieceRightDown === 0 || pieceRightDown < 0) {
                                    
                                        if(xIndex > 7 || yIndex > 7) {
                                            break;
                                        }
                                    let btnRightDown = document.getElementById(diagRightDown);
                                  
                                   if(pieceRightDown < 0) {
                                    console.log('from right down color red')
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
                                    pieceRightDown = game[diagRightDown].pieceValue
                                }
    
                                }
                                }
                                catch(err) {
                                    console.log('error from RightDown')
                                    console.log(err);
                                    break;
                                }
    
    
    
                                try{
                              
                                    if(checkCount <= 1) {
                                    let   diagLeftDown = id + 7;
                                  let  xIndex = j;
                                let    yIndex = k;
        
        
        
                                 let    pieceLeftDown= game[diagLeftDown]?.pieceValue
                                    xIndex++;
                                    yIndex--;
                                    while(pieceLeftDown === 0 || pieceLeftDown < 0) {
                                            if(xIndex > 7 || yIndex < 0) {
                                                break;
                                            }
                                        let btnLeftDown = document.getElementById(diagLeftDown);
                                       
                                        if(pieceLeftDown < 0) {
                                        console.log('from left down color red')
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
                                        pieceLeftDown= game[diagLeftDown].pieceValue
        
        
        
        
                                    }
                                }}
                                catch(err) {
                                    console.log('error from leftDown')
                                    console.log(err);
                                    break;
                                }
    
    
    
                                break;

                                case 5:
                      
                                let oneUp = id - 8;
                                let oneDown = id + 8;
                                let oneLeft = id - 1;
                                let oneRight = id + 1;
                                try{
               
                            
                               let xIndex = j;
                              
                                console.log('logging checkCount');
                                console.log(checkCount);
                                if(checkCount <= 1) {
                                let pieceUp = game[oneUp]?.pieceValue;
                                xIndex--;
                                
                                while(pieceUp === 0 || pieceUp < 0) {
                                    console.log('pieceUp');
                                    
                                    if(xIndex < 0) {
                                        break;
                                    }
                                    let btn1 = document.getElementById(oneUp);
                                    
                                     if(pieceUp < 0 || pieceUp === 0) {
                                        console.log('????Checkmate>????')
                                        if(pieceUp < 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                           legalMoves++;
                                        }
                                    }
                                        else if(pieceUp === 0) {
                                            if(btn1.classList.contains('colorCheck')) {
                                                console.log('NOT CHECKMATE!')
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
                                
                            }}
                            
                            }catch(err) {
                                    console.log(err);
                                    break;
                                }

                                try{

                               let xIndex = j;
                            
                             
                                if(checkCount <= 1) {
                                let pieceDown = game[oneDown]?.pieceValue;
                                xIndex++;
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
                                
                            }}
                            
                            }catch(err) {
                                    console.log(err);
                                    break;
                                }

                                try{

                              
                              let  yIndex = k;
                             
                                if(checkCount <= 1) {
                                let pieceLeft = game[oneLeft]?.pieceValue;
                                yIndex--;
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
                            }
                            
                            
                            }catch(err) {
                                    console.log(err);
                                    break;
                                }

                               
                                try{
                              
                                 
                                  let  yIndex = k;
                                        if(checkCount <= 1) {
                                        let pieceRight = game[oneRight].pieceValue;
                                        yIndex++;
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
                                    
                                    
                                    }}
                                    
                                catch(err) {
                                    console.log(err);
                                    break;
                                }

                            break;



                            
                        default: break;
                    }
                }

            }
        }
        if(legalMoves > 0) {
            return false;
        }
        else{
            return true;
        }
    }
    else {
        let legalMoves = 0;
        for(let j = 0; j < 8; j++) {
            for(let k = 0; k < 8; k++) {
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
                                }
                                else{
                                    if(btn1.classList.contains('colorCheck')) {
                                        
                                    }
                                    else if(piece1 === 0 && pieceBackedUp(leftIndex, leftX, leftY, 0) === false){
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
                                }
                                else{
                                    if(btn1.classList.contains('colorCheck')) {
                                        
                                    }
                                    else if(piece1 === 0  && pieceBackedUp(rightIndex, rightX, rightY, 0) === false){
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
                                    else if(piece1 === 0 && pieceBackedUp(upIndex, upX, upY, 0) === false){
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
                                    else if(piece1 === 0 && pieceBackedUp(downIndex, downX, downY, 0) === false){
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
                                
                                     if(piece1 === 0 && pieceBackedUp(leftUpIndex, leftUpX, leftUpY, 0) === false){
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
                                    if(pieceBackedUp(rightUpIndex,rightUpX, rightUpY, 0) === false){
                                   legalMoves++;
                                    }
                                }
                            }
                            else{
                            
                                 if(piece1 === 0 && pieceBackedUp(rightUpIndex, rightUpX, rightUpY, 0) === false){
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
                                    console.log('pieceBackedUp');
                                    console.log(pieceBackedUp(leftDownIndex, leftDownX, leftDownY, 0));
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
                                    if(piece1 === 0 && pieceBackedUp(leftDownIndex, leftDownX, leftDownY, 0) === false) {
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
                           
                         
                      
                                if(piece1 > 0) {
                                    if(piece1.contains('colorCheck') && pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 0) === false) {
                                      legalMoves++;
                                    }
                                    else{
                                        if(pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 0) === false) {
                                           legalMoves++;
                                        }
                                    }
                                }
                                else{
                                    if(piece1 === 0 && pieceBackedUp(rightDownIndex, rightDownX, rightDownY, 0) === false) {
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

                                console.log('xIndex case pawn white')
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
                                        console.log(btn1);
                                        console.log(btn2);
                                       
                                    }
                                    else{
                                      
                                    }
                                } 
                                let diagonalOneLeftUp = id - 9;
                                let diagonalOneRightUp = id - 7;
                                let pieceDiagonalLeft = game[diagonalOneLeftUp].pieceValue;
                                let pieceDiagonalRight = game[diagonalOneRightUp].pieceValue;
                                if(pieceDiagonalLeft > 0)  {
                                    let btn2 = document.getElementById(diagonalOneLeftUp);
                                    if(btn2.classList.contains('colorCheck')) {
                                        legalMoves++;
                                    }
                                }
                                if(pieceDiagonalRight > 0) {
                                    let btn3 = document.getElementById(diagonalOneRightUp);
                                    if(btn3.classList.contains('colorCheck')) {
                                        legalMoves++;
                                    }
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
                                let diagonalOneRightUp = id - 7;
                                let pieceDiagonalLeft = game[diagonalOneLeftUp]?.pieceValue;
                                let pieceDiagonalRight = game[diagonalOneRightUp]?.pieceValue;
                                if(pieceDiagonalLeft > 0)  {
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
                            }
                        
    
                            
    
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

                        case -10:


                        try{

                            let diagLeftUp = id - 9;
                            
                                if(checkCount <= 1) {
                                  let  xIndex = j;
                                 let   yIndex = k;

                                let pieceLeftUp = game[diagLeftUp]?.pieceValue
                                xIndex--;
                                yIndex--;
                                while(pieceLeftUp === 0 || pieceLeftUp > 0) {
                                        if(xIndex < 0 || yIndex < 0) {
                                            break;
                                        }
                                    let btnLeftUp = document.getElementById(diagLeftUp);
                                   
                                    if(pieceLeftUp > 0) {
                                        if(btnLeftUp.classList.contains('colorCheck')) {
                                            legalMoves++;
                                        }
                                       
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
                                    pieceLeftUp = game[diagLeftUp].pieceValue
                                }


                            }
                            }
                            catch(err) {
                                console.log('error from leftUp')
                                console.log(err);
                            }


                            try{

                      
                            if(checkCount <= 1) {
                             let    xIndex = j;
                           let      yIndex = k;
                            let diagRightUp = id - 7;
                           
                            let pieceRightUp = game[diagRightUp]?.pieceValue
                            xIndex--;
                            yIndex++;
                            while(pieceRightUp === 0 || pieceRightUp > 0) {
                                
                                    if(xIndex <0 || yIndex > 7) {
                                        break;
                                    }
                                let btnRightUp = document.getElementById(diagRightUp);
                               
                                if(pieceRightUp > 0) {
                                console.log('from right up color red')
                                if(btnRightUp.classList.contains('colorCheck')) {
                                   legalMoves++;

                                }
                                else if(pieceRightUp === 0) {
                                    if(btnRightUp.classList.contains('colorCheck')) {
                                      legalMoves++;
                                    }
                                }
                                    break;
                                }
                                diagRightUp -= 7;
                                xIndex--;
                                yIndex++;
                                if(xIndex <0 || yIndex > 7) {
                                    break;
                                }
                                pieceRightUp = game[diagRightUp].pieceValue
                            }


                        }
                        }

                            catch(err) {
                                console.log('error from RighttUp')
                                console.log(err);
                                break;
                            }


                            try{

                              
                                if(checkCount <= 1) {
                              let  xIndex = j;
                              let  yIndex = k;
                                xIndex++;
                                yIndex++;

                                if(xIndex <= 7 && yIndex <= 7) {
                                let diagRightDown = id + 9;
    
    
                                let pieceRightDown = game[diagRightDown]?.pieceValue
                              
                                while(pieceRightDown === 0 || pieceRightDown > 0) {
                                    
                                        if(xIndex > 7 || yIndex > 7) {
                                            break;
                                        }
                                    let btnRightDown = document.getElementById(diagRightDown);
                                   
                                    if(pieceRightDown > 0) {
                                    console.log('from right down color red')
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
                                    pieceRightDown = game[diagRightDown].pieceValue


                            }
                            }}
                        }
                            catch(err) {
                                console.log('error from RightDown')
                                console.log(err);
                                break;
                            }


                            try{

                                     if(checkCount <= 1) {
                               let  xIndex = j;
                             let   yIndex = k;
    
    
                                let diagLeftDown = id + 7;
    
                                let pieceLeftDown= game[diagLeftDown]?.pieceValue
                                xIndex++;
                                yIndex--;
                                while(pieceLeftDown === 0 || pieceLeftDown > 0) {
                                
                                        if(xIndex > 7 || yIndex < 0) {
                                            break;
                                        }
                                    let btnLeftDown = document.getElementById(diagLeftDown);
                                   
                                    if(pieceLeftDown > 0) {
                                    console.log('from left down color red')
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
                                    pieceLeftDown= game[diagLeftDown].pieceValue
    
    
    
    
                                }}

                            
                            }
                            catch(err) {
                                console.log('error from leftDown')
                                console.log(err);
                                break;
                            }

                           
                            try{

                            
                                if(checkCount <= 1) {
                                let  oneUp = id - 8;
                                let xIndex = j;
                           
                             
                                let pieceUp = game[oneUp]?.pieceValue;
                                xIndex--;
                                while(pieceUp === 0 || pieceUp > 0) {
                                    if(xIndex < 0) {
                                        break;
                                    }
                                   
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
                                    pieceUp = game[oneUp].pieceValue;
                                }
                            }


                            }catch(err) {
                                console.log(err);
                                break;
                            }
                           
                            try{

                               
                                if(checkCount <= 1) {
                                    let xIndex = j;
                             
                                let   oneDown = id + 8;
                            
                                let pieceDown = game[oneDown]?.pieceValue;
                                xIndex++;
                                while(pieceDown === 0 || pieceDown > 0) {
                                    if(xIndex > 7) {
                                        break;
                                    }
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
                                    pieceDown = game[oneDown].pieceValue;
                                }
                            }
                            }catch(err) {
                                console.log(err);
                                break;
                            }
                           
                            try{

                            
                                if(checkCount <= 1) {
                                let   oneLeft = id - 1;
                            
                                let yIndex = k;
                              
                                let pieceLeft = game[oneLeft]?.pieceValue;
                                yIndex--;
                                while(pieceLeft === 0 || pieceLeft > 0) {
                                    if(yIndex < 0) {
                                        break;
                                    }
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
                                    pieceLeft = game[oneLeft].pieceValue;
                                }
                            }
                            }catch(err) {
                                console.log(err);
                                break;
                            }

                         
                            try{
                            
                         
                                if(checkCount <= 1) {
                           
                                   let yIndex = k;
                                    yIndex++;
                                    if(yIndex <= 7) {
                                let  oneRight = id + 1;
                                let pieceRight = game[oneRight].pieceValue;
                                let btn1 = document.getElementById(oneRight);
                               
                             
                                while(pieceRight === 0 || pieceRight > 0) {
                                    if(yIndex > 7) {
                                        break;
                                    }
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
                                    pieceRight = game[oneRight].pieceValue;
                                }
                            }}
                            }
                            catch(err) {
                                console.log(err);
                                break;
                            }              

                            break;

                            case -3:
                                try{
                                
                                    
                                  
                                    if(checkCount <= 1) {
                                        let xIndex = j;
                                        let yIndex = k;
                                    let diagLeftUp = id - 9;
                            
                                    let   pieceLeftUp = game[diagLeftUp].pieceValue
                                      xIndex--;
                                      yIndex--;
                                      while(pieceLeftUp === 0 || pieceLeftUp > 0) {
                                              if(xIndex < 0 || yIndex < 0) {
                                                  break;
                                              }
                                          let btnLeftUp = document.getElementById(diagLeftUp);
                                         
                                          if(pieceLeftUp > 0) {
                                          console.log('from left up color red')
                                          console.log(pieceLeftUp);
                                          console.log(diagLeftUp);
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
                                          pieceLeftUp = game[diagLeftUp].pieceValue
                                        }      
                                }
                                }
                                catch(err) {
                                    console.log('error from leftUp')
                                    console.log(err);
                                    break;
                                }
    
                                try{
                                 
                                if(checkCount <= 1) {
                                let   diagRightUp = id - 7;
                                   
                               let xIndex = j;
                               let yIndex = k;
                               let  pieceRightUp = game[diagRightUp].pieceValue
                                xIndex--;
                                yIndex++;
                                while(pieceRightUp === 0 || pieceRightUp > 0) {
                                    
                                        if(xIndex <0 || yIndex > 7) {
                                            break;
                                        }
                                    let btnRightUp = document.getElementById(diagRightUp);
                                  
                                   if(pieceRightUp > 0) {
                                    console.log('from right up color red')
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
                                    pieceRightUp = game[diagRightUp].pieceValue
                                }
                            }
                            
                            }
    
                                catch(err) {
                                    console.log('error from RighttUp')
                                    console.log(err);
                                    break;
                                }
    
                                try{
                                 
                                    if(checkCount <= 1) {
          
                                    let   diagRightDown = id + 9;
                               let xIndex = j;
                              let  yIndex = k;
    
    
                              let   pieceRightDown = game[diagRightDown].pieceValue
                                xIndex++;
                                yIndex++;
                                while(pieceRightDown === 0 || pieceRightDown > 0) {
                                    
                                        if(xIndex > 7 || yIndex > 7) {
                                            break;
                                        }
                                    let btnRightDown = document.getElementById(diagRightDown);
                                  
                                   if(pieceRightDown > 0) {
                                    console.log('from right down color red')
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
                                    pieceRightDown = game[diagRightDown].pieceValue
                                }
    
                                }
                                }
                                catch(err) {
                                    console.log('error from RightDown')
                                    console.log(err);
                                    break;
                                }
    
    
    
                                try{
                              
                                    if(checkCount <= 1) {
                                    let   diagLeftDown = id + 7;
                                  let  xIndex = j;
                                let    yIndex = k;
        
        
        
                                 let    pieceLeftDown= game[diagLeftDown].pieceValue
                                    xIndex++;
                                    yIndex--;
                                    while(pieceLeftDown === 0 || pieceLeftDown > 0) {
                                            if(xIndex > 7 || yIndex < 0) {
                                                break;
                                            }
                                        let btnLeftDown = document.getElementById(diagLeftDown);
                                       
                                        if(pieceLeftDown > 0) {
                                        console.log('from left down color red')
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
                                        pieceLeftDown= game[diagLeftDown].pieceValue
        
        
        
        
                                    }
                                }}
                                catch(err) {
                                    console.log('error from leftDown')
                                    console.log(err);
                                    break;
                                }
    
    
    
                                break;

                        case -5:
                            let oneUp = id - 8;
                            let oneDown = id + 8;
                            let oneLeft = id - 1;
                            let oneRight = id + 1;
                        try{
                          let  xIndex = j;
                    
                            console.log('logging checkCount');
                            console.log(checkCount);
                            if(checkCount <= 1) {
                            let pieceUp = game[oneUp]?.pieceValue;
                            xIndex--;
                            
                            while(pieceUp === 0 || pieceUp > 0) {
                                console.log('pieceUp');
                                
                                if(xIndex < 0) {
                                    break;
                                }
                                let btn1 = document.getElementById(oneUp);
                                
                                 if(pieceUp > 0 || pieceUp === 0) {
                                    if(pieceUp > 0) {
                                    if(btn1.classList.contains('colorCheck')) {
                                        legalMoves++;
                                    }
                                    else if(pieceUp === 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                           legalMoves++;
                                        }
                                    }
                                }
                                    break;
                                }
                                oneUp -= 8;
                                xIndex--;
                                if(xIndex < 0) {
                                    break;
                                }
                                pieceUp = game[oneUp].pieceValue;
                            }
                        }
                        
                        }catch(err) {
                                console.log(err);
                                break;
                            }
                        try{
                            let xIndex = j;
                         
                            if(checkCount <= 1) {
                            let pieceDown = game[oneDown]?.pieceValue;
                            xIndex++;
                            while(pieceDown === 0 || pieceDown > 0) {
                                if(xIndex > 7) {
                                    break;
                                }
                                let btn1 = document.getElementById(oneDown);
                                
                                 if(pieceDown > 0 || pieceDown === 0) {
                                    if(pieceDown > 0) {
                                if(btn1.classList.contains('colorCheck')) {
                                   legalMoves++;
                                }
                            }
                            else if(pieceDown === 0) {
                                if(btn1.classList.contains('colorCheck')) {
                                  legalMoves++;
                                }
                            }
                                    break;
                                }
                                oneDown += 8;
                                xIndex++;
                                if(xIndex > 7) {
                                    break;
                                }
                                pieceDown = game[oneDown].pieceValue;
                            }
                        }
                        
                        }catch(err) {
                                console.log(err);
                                break;
                            }

                          
                            try{
                        
                            let    yIndex = k;
                         
                            if(checkCount <= 1) {
                            let pieceLeft = game[oneLeft]?.pieceValue;
                            yIndex--;
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
                            }
                            else if(pieceLeft === 0) {
                                if(btn1.classList.contains('colorCheck')) {
                                  legalMoves++;
                                } 
                            }
                                    break;
                                }
                                oneLeft--;
                                yIndex--;
                                if(yIndex < 0) {
                                    break;
                                }
                                pieceLeft = game[oneLeft].pieceValue;
                            
                        }}
                        
                        
                        }catch(err) {
                                console.log(err);
                                break;
                            }

                          
                            try{
                      
                             let   yIndex = k;
                            
                                    if(checkCount <= 1) {
                                    let pieceRight = game[oneRight].pieceValue;
                                    yIndex++;
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
                                    }
                                    else if(pieceRight === 0) {
                                        if(btn1.classList.contains('colorCheck')) {
                                           legalMoves++;
                                        }
                                    }
                                            break;
                                        }
                                        oneRight++;
                                        yIndex++;
                                        if(yIndex > 7) {
                                            break;
                                        }
                                        pieceRight = game[oneRight].pieceValue;
                                    }
                                
                                
                                }}
                                
                            catch(err) {
                                console.log(err);
                                break;
                            }

                        break;



                            
                        default: break;
                    }
                }
            }

            }
        }
        
        if(legalMoves > 0) {
            return false;
        }
        else{
            return true;
        }
    }

    }


  
// On pressing Connect this method will be called 
 function connect() { 
  
  setWs(new WebSocket("ws://192.168.1.12:8080/hello"));
  
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
    console.log('logging print message');
    console.log(data);
    if(data === '2') {
    dispatch(inrementActionCreator());
        setTimeout(() =>{
       
        dispatch(retreiveStateActionCreator())
        }, 1000);
    }
    else if(data === '1') {
    dispatch(decrementActionCreator())
      setTimeout(() =>{
    
    
        dispatch(retreiveStateActionCreator())
        }, 1000);
    }
}
  

   
   


  
   return(
    <>
    
              <Snackbar open={check}
            autoHideDuration={3000}
            onClose={()=> setCheck(false)}><Alert severity ="error"> Your king is on Check!</Alert></Snackbar>


<Snackbar open={checkMate}
            autoHideDuration={3000}
            ><Alert severity ="success"> CheckMate! Game Over!</Alert></Snackbar>


    <div id = 'game'>    <Button id = 'startGame' variant = 'contained' onClick = {handle2PlayerGame}>Play a 2 player game</Button>
    </div>
    <div id = 'flexDiv'>
            
        </div>
        <div>
            <p id = 'player2'></p>
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
    <div>
            <p id = 'player1'></p>
        </div>
  </>)
}

export default ChessGui;