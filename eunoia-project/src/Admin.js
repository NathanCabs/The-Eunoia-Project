import './Login.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import api from './Axios';

function Admin() {

    const [users, setUsers] = useState([]);
  
    useEffect(() => {
        const loadUsers = async () => {
            const token = localStorage.getItem("authToken");
            console.log("Fetching users...");
        
            try {

                const headers = {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                };
        
                console.log("Request Headers:", headers);  // 🔍 Check size
                const response = await fetch("/api/admin/users", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"  // Add this for safety
                    },
                });
        
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
        
                const data = await response.json();  // ✅ Convert response to JSON
                console.log("Users fetched:", data);
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };        
      loadUsers();
    }, []);

    return(
        <div fluid>
            <Container style={{width:"100%", paddingTop:"1.5rem"}}>
                <Row>
                    <Col style={{paddingBottom:"1.5rem"}}>
                        <h1>Admin</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <table className="table border shadow">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Email</th>
                            <th scope="col">Username</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user,index)=>(
                                    <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{user.email}</td>
                                    <td>{user.username}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Admin;