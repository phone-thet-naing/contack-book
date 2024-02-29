import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Root, { 
  loader as rootLoader, 
  action as rootAction 
} from './routes/root'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './error-page'
import Contact, { loader as contactLoader, action as contactAction } from './routes/contact'
import EditContact, { loader as editContactLoader, action as editAction } from './routes/edit'
import { action as deleteAction } from './routes/destroy'
import Index, { loader as indexLoader } from './routes'

const contact = {
  first: "Your",
  last: "Name",
  avatar: "https://placekitten.com/g/200/200",
  twitter: "your_handle",
  notes: "Some notes",
  favorite: true,
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { 
        index: true, 
        element: <Index />,
        loader: indexLoader
      },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
        action: contactAction,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: editContactLoader,
        action: editAction,
      },
      {
        path: "contacts/:contactId/destroy",
        action: deleteAction,
        errorElement: <div>Oops! There was an error during deleting post.</div>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
