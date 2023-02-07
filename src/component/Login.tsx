import React from "react";
import axios from "axios";
import { useState } from "react";

function Login() {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [id, setId] = React.useState("");
  const api =
    "https://63e21e1c109336b6cbffdff0.mockapi.io/api/lap/lap-database";
  const PostData = () => {
    axios.post(api, {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
    });
  };

  const updateData = () => {
    axios
      .get("https://63e21e1c109336b6cbffdff0.mockapi.io/api/lap/lap-database")
      .then((res) => {
        setData(res.data);
      });
  };
  React.useEffect(() => {
    updateData;
  }, []);

  function DeleteItems(id: string) {
    axios
      .delete(
        `https://63e21e1c109336b6cbffdff0.mockapi.io/api/lap/lap-database/${id}`
      )
      .then((res) => {
        setData(
          data.filter((del: any) => {
            return del.id != id;
          })
        );
      });
  }
  return (
    <div className="login-container">
      <h1>بيانات التواصل</h1>
      <input placeholder="رقم:" onChange={(e) => setId(e.target.value)} />
      <input
        placeholder="الاسم"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        placeholder="اسم العائلة"
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        placeholder="البريد الالكتروني"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="رقم التواصل"
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={PostData}>Post</button>

      {data.map((person: any, index) => {
        return (
          <div>
            <ul>
              <li>الاسم : {person.firstName}</li>
              <li>العائلة :{person.lastName}</li>
              <li>الايميل :{person.email}</li>
              <li>رقم التواصل :{person.phoneNumber}</li>
            </ul>
            <button
              onClick={() => {
                DeleteItems(person.id);
              }}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
export default Login;
