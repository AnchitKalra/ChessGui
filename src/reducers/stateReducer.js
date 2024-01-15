import { getChessStateApi,  saveAndGetStateApi } from "../apis/apis";

const ACTION = {
    SAVEANDGETSTATE : 'SAVEANDGETSTATE',
    RETREIVESTATE: 'RETREIVESTATE'
 }
 
 let initialState = [[{gameId : undefined}]];
 
const   actionCreator = (type, fn = () => {}, payload, gameId)=> {

    return async(dispatch) =>{
        try{

        let data = await fn(payload, gameId);


        dispatch({type, data});
        }catch(err) {
            console.log(err);
        }
    }
}





export const getStateActionCreator = (payload, gameId, networkFlag) =>{
    return actionCreator(ACTION.SAVEANDGETSTATE, saveAndGetStateApi, payload,gameId, networkFlag);
}

export const retreiveStateActionCreator = (payload) => {
    return actionCreator(ACTION.RETREIVESTATE, getChessStateApi, payload);
}



export const stateReducer = (state = initialState, action) =>{
    try{
    let {type, data} = action;
   
switch(type) {
    case ACTION.SAVEANDGETSTATE:
        if(data.status === 200) {
            state = data.data;      
        }
   
           return[...state];

    case ACTION.RETREIVESTATE:
        if(data.status === 200) {
            state = data.data;
        }
        return[...state];
           default: return[...state];
}}catch(err) {
    console.log(err);
}
    }