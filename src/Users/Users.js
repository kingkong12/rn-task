import React, { useState, useEffect } from "react";
import { Table, Image, Container, Spinner } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

const URL = "https://reqres.in/api/users?page=1";

function Users() {
  const [info, setInfo] = useState([]);
  let history = useHistory();

  const [showSpinner , toggleSpinenr ] = useState(false)

  useEffect(() => {
    toggleSpinenr(true)
    axios.get(URL).then((response) => {
      setInfo(response.data.data);
    }, []).finally(() =>{
      toggleSpinenr(false)
    });
  }, []);

  const onRedirect = (id) => {
    history.push(`/details/${id}`);
  }

  return (
    <Container fluid>
       {showSpinner ? (<Spinner animation="grow" variant="dark" />): (
      <Table striped bordered hover variant="dark">
     
        <tbody>
          <tr>
            <td>
              <p className="h3 fw-bold">Id</p>
            </td>
            <td>
              <p className="h3 fw-bold">Avatar</p>
            </td>
            <td>
              <p className="h3 fw-bold">Email</p>
            </td>
            <td>
              <p className="h3 fw-bold">First Name</p>
            </td>
            <td>
              <p className="h3 fw-bold">Last Name</p>
            </td>
          </tr>
          {info.map((user) => (
            <tr key={user.id} onClick={() => onRedirect(user.id)}>
              <td>
                <p className="fs-5"> {user.id}</p>
              </td>
              <td>
                <Image src={user.avatar} roundedCircle />
              </td>
              <td>
                <p className="fs-5"> {user.email}</p>
              </td>
              <td>
                <p className="fs-5">{user.first_name}</p>
              </td>
              <td>
                <p className="fs-5">{user.last_name}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>)}
    </Container>
  );
}

export default Users;
