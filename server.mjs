import { createServer } from "http";
import axios from "axios";
import dotenv from "dotenv";
import url from "url";
import querystring from "querystring";
import cors from "cors"
dotenv.config();

const URL = process.env.BASE_URL;
const config = {
  headers: {
    Authorization: process.env.ACCESS_TOKEN,
  },
};

const getPhotos = async (urlParameters) => {
  const { data } = await axios.get(URL + urlParameters, config);
  return data;
};

createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const queryParams = querystring.parse(parsedUrl.query);

  const { per_page, page, query } = queryParams;
  console.log(per_page, page, query);

  const urlParameters = `per_page=${per_page}&page=${page}&query=${query}`;

  res.setHeader("Content-Type", "application/json");
  getPhotos(urlParameters).then((data) => {
    const jsonResponse = JSON.stringify(data);
    cors()(req, res, () => {
      res.end(jsonResponse);
    });
  });
}).listen(process.env.PORT, () => {
  console.log("server is listening");
});
