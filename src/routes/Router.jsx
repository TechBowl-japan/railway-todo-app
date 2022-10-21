import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { SignIn } from "../pages/SignIn";
import { NewTask } from "../pages/NewTask";
import { NewList } from "../pages/NewList";
import { EditTask } from "../pages/EditTask";
import { SignUp } from "../pages/SignUp";
import { EditList } from "../pages/EditList";
import { Layout } from "../components/Layout";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />
			},
			{
				path: "/signin",
				element: <SignIn />,
			},
			{
				path: "/signup",
				element: <SignUp />,
			},
			{
				path: "/task/new",
				element: <NewTask />,
			},
			{
				path: "/list/new",
				element: <NewList />,
			},
			{
				path: "/lists/:listId/tasks/:taskId",
				element: <EditTask />,
			},
			{
				path: "/lists/:listId/edit",
				element: <EditList />,
			},
		],
		errorElement: <NotFound />
	}
]);
