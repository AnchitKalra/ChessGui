



import { getPreviousApi } from "../apis/apis";
const initialState = [-1];
const ACTION = {

    PREVIOUS: 'PREVIOUS',
    FORWARD: 'FORWARD'
}


const   actionCreator = (type, fn = () =>{}, payload)=> {
   

    return async(dispatch) =>{
        try{
            let data;
            if(type === ACTION.PREVIOUS) {
             data = await fn(payload);
            }
            if(type === ACTION.FORWARD) {
                data = await fn(payload);
            }

    


        dispatch({type, data});
        }catch(err) {
            console.log(err);
        }
    }
}

export const previousActionCreator = (payload) => {
    return actionCreator(ACTION.PREVIOUS, getPreviousApi, payload);
}

export const forwardActionCreator = (payload) => {
    return actionCreator(ACTION.FORWARD, getPreviousApi, payload);
}



export const previousReducer = (state = initialState, action) =>{
    try{
    let {type, data} = action;
   
switch(type) {

case ACTION.PREVIOUS:
    let previous;
   if(data.status === 200) {
    if(state[64] >= 0) {
        state = [0];
    }
    if(state[64] !== undefined) {
        previous = state[64] - 1;
        state = data.data
        state.push(previous);
    }
    else{
        state = data.data;
        state.push(-2);
    }
  

    
   }
   
    return [...state];
case ACTION.FORWARD:
   
        let forward;
        if(data.status === 200) {
            if(state[64] >= 0) {
                state = [0];
            }
     else    if(state[64] !== undefined) {
             forward = state[64] + 1;
             state = data.data
             state.push(forward);
         }
         else{
             state = data.data;
             state.push(0);
         }
       
    }

   return [...state];
     
    default: return[...state];
}}catch(err) {
console.log(err);
}
}