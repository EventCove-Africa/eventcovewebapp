import { useSearchParams } from "react-router-dom";

const useQueryParams = () => {
  const [searchParams] = useSearchParams();

  const getParam = (key: string) => {
    return searchParams.get(key);
  };

  return getParam;
};

export default useQueryParams;
