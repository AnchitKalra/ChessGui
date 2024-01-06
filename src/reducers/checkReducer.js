
const ACTION = {
   DETECTCHECK: 'DETECTCHECK',
   INCREMENT: 'INCREMENT',
   DECREMENT: 'DECREMENT',
   DETECTFALSECHECK: 'DETECTFALSECHECK',
   ARRAYID : 'ARRAYID',
   DECREMENTARRAYID : 'DECREMENTARRAYID',
   CASTLINGWHITELEFT : 'CASTLINGWHITELEFT',
   CASTLINGWHITERIGHT : 'CASTLINGWHITERIGHT',
   CASTLINGBLACKLEFT : 'CASTLINGBLACKLEFT',
   CASTLINGBLACKRIGHT : 'CASTLINGBLACKRIGHT',
   CASTLINGWHITE: 'CASTLINGWHITE',
   CASTLINGBLACK: 'CASTLINGBLACK'
 }


 
 let initialState = {
     checkFlag : false,
     checkCount : 0,
     arrayId : [],
     castlingBlackLeft : true,
     castlingBlackRight : true,
     castlingWhiteLeft : true,
     castlingWhiteRight : true
 }
 
 
 const   actionCreator = (type, payload)=> {
 
    let data = {}
    return (dispatch) => {
    if(type === ACTION.DETECTCHECK) {
        data.checkFlag = true;
    }

    else if(payload?.checkCount > 0) {
        data.checkCount = payload.checkCount;
    }
    else if(type === ACTION.DECREMENT) {
        data.checkCount = 0;
    }
    else if(type === ACTION.DETECTFALSECHECK) {
        data.checkFlag = false;
    }
    else if(type === ACTION.ARRAYID){
        data.arrayId = payload.arrayId;
    }
    else if(type === ACTION.CASTLINGBLACKLEFT) {
        data.castlingBlackLeft = false;
    }
    else if(type === ACTION.CASTLINGBLACKRIGHT) {
        data.castlingBlackRight = false;
    }
    else if(type === ACTION.CASTLINGWHITELEFT) {
        data.castlingWhiteLeft = false;
    }
    else if(type === ACTION.CASTLINGWHITERIGHT) {
        data.castlingWhiteRight = false;
    }
    else if(type === ACTION.CASTLINGWHITE) {
        data.castlingWhiteLeft = false;
        data.castlingWhiteRight = false;
    }

    else if(type === ACTION.CASTLINGBLACK) {
        data.castlingBlackLeft = false;
        data.castlingBlackRight = false;
    }
     
    try{
 
         dispatch({type, data});
         }catch(err) {
             console.log(err);
         }
     }

    }
 
 
 
 
 export const detectCheckActionCreator = () =>{
     return actionCreator(ACTION.DETECTCHECK);
 }

 export const checkCountIncrementActionCreator = (payload) => {
    return actionCreator(ACTION.INCREMENT, payload)
 }

 export const checkCountDecrementActionCreator = () => {
    return actionCreator(ACTION.DECREMENT)
 }


 export const checkFalseActionCreator = () => {
    return actionCreator(ACTION.DETECTFALSECHECK);
 }
 
 export const arrayIdActionCreator = (payload) => {
    return actionCreator(ACTION.ARRAYID, payload);
 }

 export const arrayDecrementActionCreator = () => {
    return actionCreator(ACTION.DECREMENTARRAYID)
 }

 export const castlingBlackLeftActionCreator = () => {
    return actionCreator(ACTION.CASTLINGBLACKLEFT);
 }

 export const castlingBlackRightActionCreator = () => {
    return actionCreator(ACTION.CASTLINGBLACKRIGHT);
 }

 export const castlingWhiteLeftActionCreator = () => {
    return actionCreator(ACTION.CASTLINGWHITELEFT);
 }

 export const castlingWhiteRightActionCreator = () => {
    return actionCreator(ACTION.castlingWhiteRight);
 }

 export const castlingWhiteActionCreator = () => {
    return actionCreator(ACTION.CASTLINGWHITE);
 }

 export const castlingBlackActionCreator = () => {
    return actionCreator(ACTION.CASTLINGBLACK);
 }
 
 
 export const checkReducer = (state = initialState, action) =>{
     try{
     let {type, data} = action;
    
 switch(type) {
     case ACTION.DETECTCHECK: 
        if(data?.checkFlag === true) {
            state.checkFlag = true;
        }

    
            return{...state};

        case ACTION.INCREMENT:
            if(data?.checkCount > 0) {
                state.checkCount = data?.checkCount;
            }

            return {...state};

        case ACTION.DECREMENT:
            state.checkCount = 0;
            return {...state};
        case ACTION.DETECTFALSECHECK:
            state.checkFlag = false;
            return {...state};
        case ACTION.ARRAYID:
            if(data.arrayId){
                state.arrayId = data.arrayId;
            }
            return {...state};
        case ACTION.DECREMENTARRAYID:
            state.arrayId = [];
            return {...state}
        case ACTION.CASTLINGBLACKLEFT:
            state.castlingBlackLeft = false;
            return {...state};
        case ACTION.CASTLINGBLACKRIGHT:
            state.castlingBlackRight = false;
            return {...state};
        case ACTION.CASTLINGWHITELEFT:
            state.castlingWhiteLeft = false;
            return {...state};
        case ACTION.CASTLINGWHITERIGHT:
            state.castlingWhiteRight = false;
            return {...state};

        case ACTION.CASTLINGBLACK:
            state.castlingBlackLeft = false;
            state.castlingBlackRight = false;
            return {...state};
        case ACTION.CASTLINGWHITE:
            state.castlingWhiteLeft = false;
            state.castlingWhiteRight = false;
            return {...state};
            default: return{...state};
 }}catch(err) {
     console.log(err);
 }
     }