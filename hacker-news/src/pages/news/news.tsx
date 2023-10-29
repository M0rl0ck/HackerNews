import { useLoaderData } from "react-router-dom";

const News = () => {
  const { id } = useLoaderData() as { id: string };
  return <div>This is news whith id {id}</div>;
};

export default News;
