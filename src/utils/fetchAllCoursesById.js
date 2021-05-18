import axios from "axios";
import config from "../config";

export default function fetchAllCoursesById(coachId) {
  return axios
    .get(`${config.api_url}/course/all/${coachId}`)
    .then((response) => response);
}
