import Config from "./config";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: Config.WEB_SERVER_URL,
})

export default axiosInstance;