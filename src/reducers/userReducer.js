// import {loginWithToken, logoutApi, signupApi} from '../apis/apis';
// import { loginApi } from '../apis/apis';

import { signupApi } from "../apis/apis";


const initialState =  {
    full_name : "",
    username: "",
    password: "",
    signupFlag : false,
    loginFlag : false,
    notLoginFlag : true,
}

const ACTION = {
    SIGNUP: 'SIGNUP',
    LOGIN:  'LOGIN',
    LOGINWITHTOKEN: 'LOGINWITHTOKEN',
    LOGOUT: 'LOGOUT'
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


export const signupActionCreator = (payload) =>{
    return actionCreator(ACTION.SIGNUP, signupApi, payload);
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
    let {type, data} = action;
   
switch(type) {
    case ACTION.SIGNUP: 
        if(data.status === 200) {
            state = data.data;      
        }
   
           return {...state};
           default: return{...state};
}}catch(err) {
    console.log(err);
}
    }