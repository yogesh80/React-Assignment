import {LOGIN,ATC} from "../constant/actiontypes";

export function login(payload) {
    console.log('login action',payload);
    return {
        type : LOGIN,
        payload
    };
}
export function addCart(payload) {
    return {
        type : ATC,
        payload
    };
}