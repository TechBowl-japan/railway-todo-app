import { useSelector } from "react-redux"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Sidebar } from "~/components/Sidebar"
import NotFound from "~/pages/404"
import Home from "~/pages/index.page"
import NewList from "~/pages/list/new/index.page"
import ListIndex from "~/pages/lists/[listId]/index.page"
import SignIn from "~/pages/signin/index.page"
import SignUp from "~/pages/signup/index.page"

export const Router = () => {
  const auth = useSelector((state) => state.auth.token !== null)

  return (
    <BrowserRouter>
      <Sidebar />
      <div className="main_content">
        <Routes>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          {auth ? (
            <>
              <Route path="/" element={<Home />}></Route>
              <Route path="/lists/:listId" element={<ListIndex />}></Route>
              <Route path="/list/new" element={<NewList />}></Route>
            </>
          ) : (
            <Route path="/" element={<Navigate replace to="/signin" />}></Route>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
