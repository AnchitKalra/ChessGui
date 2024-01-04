
import axios from 'axios';
const instance = axios.create({ baseURL: ' http://localhost:8080/'})


   

const ENDPOINT = {
    SIGNUP:'user/signup',
    GETCHESS: 'chess/getChessPieces',
    SAVEANDGETSTATE: "chess/getState",
    RETREIVESTATE: 'chess/retreiveState'
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


export const saveAndGetStateApi = async(payload, gameId) => {
    try{
        console.log('logging payload');
        console.log(gameId);
        if(gameId === undefined){
            gameId = "null";
        }
        else{
            let id = gameId;
            gameId = "null";
            gameId += id;
        }
        let response = await instance.post(ENDPOINT.SAVEANDGETSTATE, [  ...payload, gameId]);
        return response;
    }
    catch(err) {
        console.log(err);
    }
}


export const getChessStateApi = async(payload) => {
    try{
        let response = await instance.post(ENDPOINT.RETREIVESTATE, payload);
        return response;
    }
    catch(err) {
        console.log(err);
    }
}