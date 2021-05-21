import axios from "axios";
import config from "../config";

export default function fetchAllCoursesById(coachId) {
  return axios
    .get(`${config.api_url}/room/all/${coachId}`)
    .then((response) => response);
}
