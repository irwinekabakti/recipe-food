import axios from "axios";

// const baseURL = "https://api.edamam.com/api/recipes/v2";
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchData = (url: string) => {
  const instance = axios.create();
  // In the case of the url fetch link (E.g. next page data fetch link)
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return instance.get(url); // if the url already contains https:// or http://
  } else {
    // in the case of normal fetch with base URL
    instance.defaults.baseURL = baseURL;
    return instance.get(url);
  }
};

export default fetchData;
