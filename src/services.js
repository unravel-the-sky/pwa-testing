import axios from "axios";
import querystring from "querystring";

// const baseUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos'
const baseUrl = "https://api.thecatapi.com/v1";
// const baseUrl = 'https://jsonplaceholder.typicode.com';
const apiKey = "f1f79127-2f47-4224-9d75-61e619e9cf02";

axios.defaults.headers.common["x-api-key"] = apiKey;

const catRepository = axios.create({
  baseURL: baseUrl + "/images"
  // baseUrl: baseUrl + '/todos'
});

const responseInterceptor = res => {
  return res;
};

catRepository.interceptors.response.use(responseInterceptor);

export const catService = {
  getRandomCats: limit => {
    return catRepository({
      method: "get",
      url: `search`
    });
  }
};
