import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLists } from '~/store/list/index'

const Home = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const currentListId = useSelector(state => state.list.current)

  useEffect(() => {
    dispatch(fetchLists())
  }, [])

  useEffect(() => {
    if (currentListId) {
      history.push(`/lists/${currentListId}`)
    }
  }, [currentListId])

  return <div></div>
}

export default Home
