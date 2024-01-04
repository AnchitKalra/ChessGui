import { getChessPiecesApi } from "../apis/apis";

const ACTION = {
   GETCHESSPIECES: 'GETCHESSPIECES',
}

let initialState = {
    id : "",
    image: ""
}


const   actionCreator = (type, fn = () => {}, payload)=> {

    return async(dispatch) =>{
        try{

        let data = await fn(payload);


        dispatch({type, data});
        }catch(err) {
            console.log(err);
        }
    }
}





export const getChessActionCreator = () =>{
    return actionCreator(ACTION.GETCHESSPIECES, getChessPiecesApi);
}



export const chessReducer = (state = initialState, action) =>{
    try{
    let {type, data} = action;
   
switch(type) {
    case ACTION.GETCHESSPIECES: 
        if(data.status === 200) {
            state = data.data;      
        }
   
           return[...state];
           default: return{...state};
}}catch(err) {
    console.log(err);
}
    }