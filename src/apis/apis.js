
import axios from 'axios';
const instance = axios.create({ baseURL: 'http://192.168.1.8:8080/'})


   

const ENDPOINT = {
    SIGNUP:'user/signup',
    GETCHESS: 'chess/getChessPieces',
    SAVEANDGETSTATE: "chess/getState",
    RETREIVESTATE: 'chess/retrieveState',
    GETPREVIOUS: 'chess/previous',
    GETFORWARD: 'chess/forward'
}

export const getPreviousApi = async(payload) => {
    try{
        let response = await instance.post(ENDPOINT.GETPREVIOUS, payload);
        return response;
    }
    catch(err) {
        console.log(err);
    }
}


export const signupApi = async(payload) =>{
    try{
       let response = await instance.post(ENDPOINT.SIGNUP, payload);
       return response;
    }catch(err) {
        console.log(err);
    }
}



export const getChessPiecesApi = async() => {
    try{
        let response = await instance.get(ENDPOINT.GETCHESS)
        return response
    }
    catch(err) {
        console.log(err);
    }
}





export const saveAndGetStateApi = async(payload) => {
    try{
        let response = await instance.post(ENDPOINT.SAVEANDGETSTATE, payload);
        return response;
    }
    catch(err) {
        console.log(err);
    }
}


export const getChessStateApi = async(payload) => {
    try{
        console.log('get chess state api')
        console.log(payload)
        let response = await instance.post(ENDPOINT.RETREIVESTATE, payload);
        console.log('logging response');
        console.log(response);
        return response;
    }
    catch(err) {
        console.log(err);
    }
}