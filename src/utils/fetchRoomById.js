import axios from "axios";
import config from "../config";

export default async function fetchRoomById(id) {
  return await axios
    .get(`${config.api_url}/room/${id}`)
    .then((response) => response);
}
