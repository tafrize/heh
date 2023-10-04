import React, { useState } from "react";
import '../styles/Search.css';
import { Modal, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import users from '../data/data.js';
import lan from "../assets/lan.png"

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [error, setError] = useState(false); 
  const [showModal, setShowModal] = useState(false);
  const [modalUser, setModalUser] = useState(null);

  const handleShowModal = (user) => {
    setModalUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


    const handleSearchChange = (event) => {
      const searchTerm = event.target.value;
      setSearchTerm(searchTerm);

      const filtered = users.filter((user) => {
        const searchRegex = new RegExp(searchTerm, "i");
        return (
          searchRegex.test(user.lname) ||
          searchRegex.test(user.fname) ||
          searchRegex.test(user.nickname) ||
          searchRegex.test(user.tlol)||
          searchRegex.test(user.trl)
        );
      });

      if (filtered.length === 0) {
        setError(true);
      } else {
        setError(false);
        setFilteredUsers(filtered);

      }
    };
    const sortedUsers = filteredUsers.sort((a, b) => a.lname.localeCompare(b.lname));

  return (
    <div className="back">
    <Container>
     <Row className="justify-content-center align-items-center">
        <Card  style={{width:"100%",height:"90%",marginBottom:"80px",borderRadius:"20px",top:"50px",alignItems:"center"}}>
        <Col xs={12} md={6} >
        <img
        src={lan}
        alt="hehlan"
        className="mw3-ns mt-2"   
        style={{height: "170px", width: "150px", cursor: "pointer", objectFit:"contain"}}                  
        />
        <h2 className=" h2">HELLO WELCOME TO THE LAN DAY</h2>
        <p>Check your place and enjoy the next geek level</p>
        </Col>
      <Col className="mx-auto">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Your name pseudo or group"
      />
      </Col>
      <Col xs={12} className="mt-5 mx-auto">
      {error && <p>No results found.</p>}
      {!error && (
             <div className="table-responsive">
            <Table striped bordered hover scrollable variant="dark" className="mx-auto" style={{height:"100%",width:"79%",marginBottom:"5%", overflowX:"auto"}}>
            <thead>
              <tr>
                <th>#</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Username</th>
                <th>Team lol/rl</th>
                <th>Check place</th>
              </tr>
            </thead>
          {sortedUsers.slice(0,9).map((user, index) => (
            <tbody>
            <tr key={user.id}>
              <td>{index+1}</td>
              <td>{user.lname}</td>
              <td>{user.fname} </td>
              <td>{user.nickname}</td>
              <td>{user.tlol} {user.trl}</td>
              <td>
              <button onClick={() => handleShowModal(user)}>Show</button>
              {modalUser && (
              <Modal show={showModal} onHide={handleCloseModal} dialogClassName="modal-lg">
              <Modal.Header closeButton>
              <Modal.Title style={{ textAlign: "center", margin: "0 auto", width: "100%" }}>Bienvenue {modalUser.lname} {modalUser.fname}</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ display: "flex",flexDirection: "column", alignItems: "center",height:"70vh" }}>
                <h4 class="mt-4">Tournois inscrits : {modalUser.player === "0" ? "aucun" : ""} {modalUser.lol === "1" ? "LOL " : ""} {modalUser.rl === "1" ? "RL" : ""} {modalUser.tft === "1" ? "TFT" : ""} {modalUser.mv === "1" ? "MV" : ""}</h4>
                <h5 class="mt-4">Place attribuée :</h5><br/><br/><br/>
                <img class="mt-4" style={{  maxWidth: "100%", maxHeight: "100%",width: "50%", height: "auto",transform: "scale(1.8)" }} src={modalUser.imgSrc} alt={modalUser.fname} title={modalUser.tlol} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
              </Modal.Footer>
             </Modal>
              )}
              </td>
              </tr>
            </tbody>
          ))}
        </Table>
        </div>
        
      )}
      </Col>
    
      </Card>
      </Row>
    </Container>
    </div>
  );
};

export default Search;