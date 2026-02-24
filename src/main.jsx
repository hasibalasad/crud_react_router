import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  contactAction,
  destroyContactAction,
  editContactAction,
  updateFavoriteContactAction,
} from "./actions/contactAction";

import ErrorPage from "./ErrorPage";
import Index from "./Index";
import "./index.css";
import { getContactLoader, getContactsLoader } from "./loaders/contactsLoader";
import Root from "./Root";
import Contact from "./routes/Contact";
import EditContact from "./routes/Edit";

//? 1st way to create router
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <ErrorPage />,
//     loader: getContactsLoader,
//     action: contactAction,
//     children: [
//       {
//         errorElement: <ErrorPage />,
//         children: [
//           {
//             index: true,
//             element: <Index />,
//           },
//           {
//             path: "contacts/:contactId",
//             element: <Contact />,
//             loader: getContactLoader,
//             action: updateFavoriteContactAction,
//           },
//           {
//             path: "contacts/:contactId/edit",
//             element: <EditContact />,
//             loader: getContactLoader,
//             action: editContactAction,
//           },
//           {
//             path: "contacts/:contactId/destroy",
//             action: destroyContactAction,
//             errorElement: <ErrorPage />,
//           },
//         ],
//       },
//     ],
//   },
// ]);

//? 2nd way to create router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={getContactsLoader}
      action={contactAction}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index={true} element={<Index />} />
        <Route
          path="contacts/:contactId"
          element={<Contact />}
          loader={getContactLoader}
          action={updateFavoriteContactAction}
        />
        <Route
          path="contacts/:contactId/edit"
          element={<EditContact />}
          loader={getContactLoader}
          action={editContactAction}
        />
        <Route
          path="contacts/:contactId/destroy"
          action={destroyContactAction}
        />
      </Route>
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
