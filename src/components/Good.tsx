import React from "react";
import css from "./good.module.css"

type GoodPropsTypes = {
    goods: goodsDataTypes
}
type goodsDataTypes = {
    brand: string | null,
    id: string
    price: number
    product: string
}

export function Good(props: GoodPropsTypes) {
    return <div className={css.good}>
        <p>brand: {props.goods.brand === null ? "nobrand" : props.goods.brand }</p>
        <p>id: {props.goods.id}</p>
        <p>price: {props.goods.price}</p>
        <p>product: {props.goods.product}</p>
    </div>
}