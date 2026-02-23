import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { contactAction, destroyContactAction, editContactAction } from './actions/contactAction'
import ErrorPage from './ErrorPage'
import Index from './Index'
import './index.css'
import { getContactLoader, getContactsLoader } from './loaders/contactsLoader'
import Root from './Root'
import Contact from './routes/Contact'
import EditContact from './routes/Edit'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: getContactsLoader,
        action: contactAction,
        children: [
            {
                index: true,
                element: <Index />
            },
            {
                path: "contacts/:contactId",
                element: <Contact />,
                loader: getContactLoader,
            },
            {
                path: "contacts/:contactId/edit",
                element: <EditContact />,
                loader: getContactLoader,
                action: editContactAction,
            },
            {
                path: "contacts/:contactId/destroy",
                action: destroyContactAction,
                errorElement: <ErrorPage />
            },
        ]
    }
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
