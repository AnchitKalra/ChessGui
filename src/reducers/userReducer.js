// import {loginWithToken, logoutApi, signupApi} from '../apis/apis';
// import { loginApi } from '../apis/apis';





const initialState =  {
    turn : 1,
    count : 0,
 
}

const ACTION = {
    INCREMENTTURN :'INCREMENTTURN',
    DECREMENTTURN : 'DECREMENTTURN',
    COUNT : 'COUNT',
  
}


 const   actionCreator = (type)=> {
   

    return async(dispatch) =>{
        try{
          

    


        dispatch({type});
        }catch(err) {
            console.log(err);
        }
    }
}



export const inrementActionCreator = () =>{
    return actionCreator(ACTION.INCREMENTTURN);

}


export const decrementActionCreator = () => {
    return actionCreator(ACTION.DECREMENTTURN)
}

export const trueLoadingFlagActionCreator = () => {
    return actionCreator(ACTION.COUNT);
}
// export const loginActionCreator = (payload)=> {
//     return actionCreator(ACTION.LOGIN , loginApi, payload);
// }

// export const loginWithTokenActionCreator = () =>{
//     return actionCreator(ACTION.LOGIN , loginWithToken);
// }

// export const logoutActionCreator = ()=>{
//     return actionCreator(ACTION.LOGOUT, logoutApi)
// }



export const userReducer = (state = initialState, action) =>{
    try{
    let {type} = action;
   
switch(type) {
    case ACTION.INCREMENTTURN:
        state.turn = 2;
   
           return {...state};
    case ACTION.DECREMENTTURN:
        state.turn = 1;
        return {...state};
    case ACTION.COUNT:
       
       
        state.count++;
        return{...state};
        default: return{...state};
}
    }catch(err) {
        console.log(err);
    }
}
