import { LoaderFunctionArgs } from "react-router-dom";

const newsLoader = ({ params }: LoaderFunctionArgs) => {
  const id = params.newsId as string;
  return { id };
};

export default newsLoader;
