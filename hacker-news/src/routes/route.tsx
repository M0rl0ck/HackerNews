import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/main/mainPage";
import newsLoader from "../routes/loaders/newsLoader";
import NewsPage from "../pages/news/news";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "news/:newsId",
    element: <NewsPage />,
    loader: newsLoader,
  },
]);

export default router;
