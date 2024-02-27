import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { paramsType, requestForFilteredGoods, firstRequest } from '../api/request'

export const requestFilterPriceThunk = createAsyncThunk(
    'goodsReducer/getFilteredGoods',
    async (data: paramsType, thunk) => {
        if (data.filter != "all") {
            let response = await requestForFilteredGoods("filter", data)?.then((response) => {
                let ids = response.data.result
                return firstRequest("get_items", { "ids": ids }).then((response) => {
                    return response.data.result
                })
            })
            return response
            
        }
        else {
            let response = await firstRequest("get_ids", { "offset": 0, "limit": 100 })?.then((response) => {
                let ids = response.data.result
                return firstRequest("get_items", { "ids": ids }).then((response) => {
                    return response.data.result
                })
            })
            return response
            
        }

    }
)

export const changePageThunk = createAsyncThunk(
    'goodsReducer/changePageThunk', 
    async (offset: number) => {
        debugger
        if (offset >= 0) {
            let response = await firstRequest("get_ids", { "offset": offset, "limit": 100}).then((response)=>{
                let ids = response.data.result
                    return firstRequest("get_items", { "ids": ids }).then((response) => {
                        debugger
                        return response.data.result
                    })
            })
            return response
        }
    }
)

export const goodsReducer = createSlice({
    name: 'goodsReducer',
    initialState: {
        goods: [],
        loading: true,
        filterLoading: false,
        textField: '',
        filter: 'all',
        GoodsCount: 0,
        currentPage: 1,
        offset: 0,
    },
    reducers: {
        setGoods: (state, action) => {
            state.goods = action.payload.data.result
        },
        toggleLoading: (state, action) => {
            state.loading = action.payload
        },
        setFilterLoading: (state, action) => {
            state.filterLoading = action.payload
        },
        setFilter: (state, action) => {
            state.filter = action.payload
        },
        setTextField: (state, action) => {
            state.textField = action.payload
        },
        setPagesCount: (state, action) => {
            state.GoodsCount = action.payload.length
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(requestFilterPriceThunk.fulfilled, (state, action) => {
            state.goods = action.payload
            state.filterLoading = false
        })
        builder.addCase(changePageThunk.fulfilled, (state, action) => {
            state.goods = action.payload
            state.filterLoading = false
        })
    }

})

export const { setGoods, toggleLoading, setFilter, setTextField, setFilterLoading, setPagesCount, setCurrentPage} = goodsReducer.actions

export default goodsReducer.reducer