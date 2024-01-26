// import {loginWithToken, logoutApi, signupApi} from '../apis/apis';
// import { loginApi } from '../apis/apis';





const initialState =  {
    turn : 1,
    loadingFlag : false,
 
}

const ACTION = {
    INCREMENTTURN :'INCREMENTTURN',
    DECREMENTTURN : 'DECREMENTTURN',
    LOADINGFLAG : false,
  
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
    return actionCreator(ACTION.LOADINGFLAG);
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
    case ACTION.LOADINGFLAG:
        state.loadingFlag = true;
        return{...state};
        default: return{...state};
}
    }catch(err) {
        console.log(err);
    }
}
