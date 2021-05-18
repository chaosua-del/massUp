import axios from "axios";
import config from "../config";

export default function fetchCourseById(id) {
  return axios
    .get(`${config.api_url}/course/${id}`)
    .then((response) => response);
}
