
const ACTION = {
   DETECTCHECK: 'DETECTCHECK',
   INCREMENT: 'INCREMENT',
   DECREMENT: 'DECREMENT',
   DETECTFALSECHECK: 'DETECTFALSECHECK',
   ARRAYID : 'ARRAYID',
   DECREMENTARRAYID : 'DECREMENTARRAYID'
 }


 
 let initialState = {
     checkFlag : false,
     checkCount : 0,
     arrayId : []
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



            default: return{...state};
 }}catch(err) {
     console.log(err);
 }
     }