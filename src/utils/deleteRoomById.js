import axios from "axios";
import config from "../config";

export default function deleteRoomById(id) {
  return axios
    .delete(`${config.api_url}/room/${id}`)
    .then((response) => response);
}
