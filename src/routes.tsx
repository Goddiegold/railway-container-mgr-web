import ErrorPage from "@/features/misc/ErrorPage";
import NotFound from "@/features/misc/NotFound";
import { createBrowserRouter } from "react-router-dom";
import CreateContainer from "./features/containermanger/pages/CreateContainer";
import ContainerDetailPage from "./features/containermanger/pages/ContainerDetailPage";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <CreateContainer />, },
            { path: "/services/:serviceId", element: <ContainerDetailPage /> }
        ]
    },
    { path: "*", element: <NotFound /> }

]);

export default router;
