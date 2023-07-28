import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './home.css'
import { fetchLists } from '~/store/list/index'

export const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const currentListId = useSelector(state => state.list.current)

  useEffect(() => {
    dispatch(fetchLists())
  }, [])

  useEffect(() => {
    if (currentListId) {
      navigate(`/lists/${currentListId}`)
    }
  }, [currentListId])

  return <div></div>
}
