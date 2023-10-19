import { createServer } from "http";
import axios from "axios";
import dotenv from "dotenv";
import url from "url";
import querystring from "querystring";
import cors from "cors";
dotenv.config();

const URL = process.env.BASE_URL;
const config = {
  headers: {
    Authorization: process.env.ACCESS_TOKEN,
  },
};

const corsOptions = {
  origin: ["http://localhost:5173", process.env.ALLOWED_URL],
};

const getPhotos = async (urlParameters) => {
  try {
    const { data } = await axios.get(URL + urlParameters, config);
    return data;
  } catch {
    return {"total" : 0, results: []}
  }
};

createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const queryParams = querystring.parse(parsedUrl.query);
  const { per_page, page, query } = queryParams;
  const urlParameters = `per_page=${per_page}&page=${page}&query=${query}`;
  if(per_page) {
    try {
      res.setHeader("Content-Type", "application/json");
      getPhotos(urlParameters).then((data) => {
        const jsonResponse = JSON.stringify(data);
        cors(corsOptions)(req, res, () => {
          res.end(jsonResponse);
        });
      });
    } catch {
      console.log("asdasdADASDASD");
      res.end("someting went wrong")
    }
  } else {
    res.end("hello from server")
  }
}).listen(process.env.PORT, () => {
  console.log("server is listening");
});
