import axios from "axios";
import { setInterceptors } from "./common/interceptors";

function createInstanceWithAuth(url, check) {
    const instance = axios.create({
      baseURL: `http://localhost:5001/${url}`,
    });
    return setInterceptors(instance, check);
};
  
export const listing = createInstanceWithAuth("listing");
export const purchase = createInstanceWithAuth("purchase")