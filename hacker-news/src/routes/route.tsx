import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/main/mainPage";
import News from "../pages/news/news";
import newsLoader from "../routes/loaders/newsLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "news/:newsId",
    element: <News />,
    loader: newsLoader,
  },
]);

export default router;
