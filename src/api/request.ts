import axios from "axios";
import { Md5 } from 'ts-md5';


let md2 = Md5.hashStr("Valantis_20240225")


const valantisREQ = axios.create({
    baseURL: 'http://api.valantis.store:40000/',
    headers: { 'X-Auth': md2 }
});

export type paramsType = {
    filter: string
    textField: string | number
}



export function firstRequest(action: string, parameter: object) {
    return valantisREQ.post('', { "action": action, "params": parameter }).then((response) => {
        return response
    })
}

export function requestForFilteredGoods(action: string, params: paramsType) {
    if (params.filter === "price") {
        let price: number = Number(params.textField)
        return valantisREQ.post('', { "action": action, "params": { "price": price } }).then((response) => {
            return response
        })
    }
    if (params.filter === "brand") {
        return valantisREQ.post('', { "action": action, "params": { "brand": params.textField } }).then((response) => {
            return response
        })
    }
    if (params.filter === "product") {
        return valantisREQ.post('', { "action": action, "params": { "product": params.textField } }).then((response) => {
            return response
        })
    }
    if (params.filter === "all") {
        debugger
        return valantisREQ.post('', { "action": "get_items", "params": { "offset": 0, "limit": 100 } }).then((response) => {
            debugger
            return response
        })
    }
}