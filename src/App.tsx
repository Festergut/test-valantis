import React, { useEffect } from 'react';
import './App.css';
import { requestFilterPriceThunk, setFilter, setGoods, toggleLoading, setTextField, setFilterLoading, changePageThunk, setPagesCount, setCurrentPage } from './redux/goodsReducer';
import { useAppDispatch, useAppSelector } from './hooks';
import { Good } from './components/Good';
import { firstRequest } from './api/request';


function App() {

  let dispatch = useAppDispatch()

  let goods = useAppSelector(state => state.goodsReducer.goods)
  let loading = useAppSelector(state => state.goodsReducer.loading)
  let filter = useAppSelector(state => state.goodsReducer.filter)
  let textField = useAppSelector(state => state.goodsReducer.textField)
  let filterLoading = useAppSelector(state => state.goodsReducer.filterLoading)
  let currentPage = useAppSelector(state => state.goodsReducer.currentPage)

  useEffect(() => {
    firstRequest("get_ids", { "offset": 0 }).then((response) => {
      dispatch(setPagesCount(response.data.result))
    })

    firstRequest("get_ids", { "offset": 0, limit: 100 }).then((response) => {
      let ids = response.data.result
      firstRequest("get_items", { "ids": ids }).then((response) => {
        dispatch(setGoods(response))
        dispatch(toggleLoading(false))
      })


    })
  }, [])

  let pages: number[] = []

  console.log(pages)
  for (let i = Math.max(currentPage - 4, 1); i <= Math.max(currentPage + 4, 1); i++) {
    pages.push(i);
  }

  let mappingGoods = goods.map((goods) => {
    return (
      <Good goods={goods} />
    )
  })
  let mappingPages = pages.map((page) => {
    return <span className='pointer' onClick={() => {
        dispatch(setFilterLoading(true))
        dispatch(changePageThunk(page * 50))
        dispatch(setCurrentPage(page))
      }}>{page}</span>
  })

  return (
    <div>
      <div className='navigation'>
        {loading
          ? ""
          :
          <div className='pagination'>
            <div>
              <span className='pointer' onClick={() => {
                dispatch(setFilterLoading(true))
                dispatch(changePageThunk(0))
                dispatch(setCurrentPage(0))
              }}>0</span>
              {mappingPages}
            </div>
            <div className='filter'>
              <span>Фильтр: </span>
              <select onChange={(e) => { dispatch(setFilter(e.currentTarget.value)) }}>
                <option value={"all"}>Все</option>
                <option value={"product"}>По продукту</option>
                <option value={"brand"}>По бренду</option>
                <option value={"price"}>По цене</option>
              </select>
              <input placeholder='Введи точное имя' onChange={(e) => { dispatch(setTextField(e.currentTarget.value)) }} type={filter === "price" ? "number" : ''} />
              <button onClick={() => {
                dispatch(setFilterLoading(true))
                dispatch(requestFilterPriceThunk({ filter, textField }))

              }}>Search</button>
            </div>

            {filterLoading
              ? <div>Loading....</div>
              : ""
            }

          </div>
        }
      </div>
      {loading
        ? <div>Loading....</div>
        : <div className="App" >{mappingGoods}</div>
      }

    </div>
  );
}

export default App;
