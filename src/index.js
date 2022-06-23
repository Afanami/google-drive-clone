import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App";
import { AuthProvider } from "./Contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// testing promises knowledge omegalul
// // const fetch = (url) => {
// //   return new Promise((res) => { setTimeout(() => res("data"), 1000)});
// // };

// // const fetchData = async (ids) => {
// //   const promises = [];

// //   await ids.forEach((id) => {
// //     promises.push(fetch(id));
// //   });

// //   return new Promise.all(promises).then((data) => console.log(data));
// // };

// const fetch = (id) => {
//   return new Promise((res, rej) => {
//     setTimeout(
//       () =>
//         Math.floor(Math.random() * 2) === 1 ? res(id) : rej(`err at ID: ${id}`),
//       1000
//     );
//   });
// };

// let arr = Array.from(Array(10).keys());

// const fetchDummy = async (arrIds) => {
//   const promises = [];

//   await arrIds.forEach((id) => promises.push(fetch(id)));

//   return Promise.allSettled(promises).then(console.log).catch(console.log);
// };

// fetchDummy(arr);
