import React from "react";
import { Header } from "../components/Header";
import { TaskList } from "../components/TaskList";


export const Home = () => {

  return (
    <div>
      <Header />
        <TaskList />
    </div>
  )
}