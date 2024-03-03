import { chessEngineApi } from "../apis/apis";

const ACTION = {
    CHESSENGINEAPI: 'CHESSENGINEAPI',
 }
 
 let initialState = {
    chessEngineData : null
 }
 
 
 const   actionCreator = (type, fn = () => {}, payload)=> {
 
    let data = "";
     return async(dispatch) =>{
         try{
 
         data = await fn(payload);
 
 
         dispatch({type, data});
         }catch(err) {
             console.log(err);
         }
     }
 }
 
 
 
 
 
 export const getChessEngineActionCreator = (data) =>{
     return actionCreator(ACTION.CHESSENGINEAPI, chessEngineApi, data);
 }
 
 
 
 export const chessEngineReducer = (state = initialState, action) =>{
     try{
     let {type, data} = action;
    
 switch(type) {
     case ACTION.CHESSENGINEAPI: 
         if(data.status === 200) {
             state = data.data;
             return state;         
             
         }
         break;
    
           
            default: return state;
 }}catch(err) {
     console.log(err);
 }
     }