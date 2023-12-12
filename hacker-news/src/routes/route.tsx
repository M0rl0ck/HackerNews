import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/main/mainPage";
import newsLoader from "../routes/loaders/newsLoader";
import NewsPage from "../pages/news/news";
import Page404 from "../pages/page404/Page404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <Page404 />,
  },
  {
    path: "news/:newsId",
    element: <NewsPage />,
    errorElement: <Page404 />,
    loader: newsLoader,
  },
  {
    path: "404",
    element: <Page404 />,
  },
]);

export default router;
