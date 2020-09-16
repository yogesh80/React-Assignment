import axios from "axios";
import { toast } from "react-toastify";

const statusCode = [303, 401, 404, 409];

//For a post request to api without authorization header
function PostApiAction(url, obj) {
  return new Promise((resolve, reject) => {
    axios
      .post(process.env.REACT_APP_apiUrl + url, obj)
      .then((res) => {
        let data = res.data;
        resolve(data);
      })
      .catch((error) => {
        let data = error.response.data;
        console.log(data);
        if (statusCode.includes(data.statusCode)) {
          toast.error(data.message, { position: toast.POSITION.TOP_RIGHT });
        }
        reject(error);
      });
  });
}

//For a get request to api without authorization header
function GetApiAction(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_apiUrl + url)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        let data = error.response.data;
        if (statusCode.includes(data.status)) {
          toast.error(data.message, { position: toast.POSITION.TOP_CENTER });
        }
        reject(error);
      });
  });
}

//For a get request to api with authorization header
function GetApiActionWithAuthorization(url) {
  let token = localStorage.getItem("token"),
    header = { headers: { Authorization: `Bearer ${token}` } };
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_apiUrl + url, header)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        let data = error.response.data;
        if (statusCode.includes(data.status)) {
          toast.error(data.message, { position: toast.POSITION.TOP_CENTER });
        }
        //Session Expires Check
        else if(data.status === 440){
            toast.error(data.message, { position: toast.POSITION.TOP_CENTER });
              localStorage.removeItem("token");
          }
        reject(data);
      });
  });
}

//For a post request to api with authorization
function PostApiWithAuthorizationAction(url, obj) {
  let token = localStorage.getItem("token"),
    header = { headers: { Authorization: `Bearer ${token}` } };
  return new Promise((resolve, reject) => {
    axios
      .post(process.env.REACT_APP_apiUrl + url, obj, header)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        let data = error.response.data;
        if (statusCode.includes(data.status)) {
          toast.error(data.message, { position: toast.POSITION.TOP_CENTER });
        }
        //Session Expires Check
        else if(data.status === 440){
            toast.error(data.message, { position: toast.POSITION.TOP_CENTER });
              localStorage.removeItem("token");
          }

        reject(data);
      });
  });
}

export {
  GetApiAction,
  PostApiAction,
  PostApiWithAuthorizationAction,
  GetApiActionWithAuthorization,
};
