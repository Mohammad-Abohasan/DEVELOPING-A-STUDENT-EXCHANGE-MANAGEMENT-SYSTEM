import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { AccessTokenContext } from "../../context/AccessTokenProvider";
import Swal from "sweetalert2";
import axios from '../../api/axios';
import PageNotFound from "./PageNotFound";

const StudentDetails = () => {
  const { studentID, offerID } = useParams();
  const [studentData, setStudentData] = useState([]);
  const { accessToken } = useContext(AccessTokenContext);

  const getStudentDetails = async () => {
    try {
      const response = await axios.get(`/offer/studentDetails/${studentID}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      // console.log(response.data)
      setStudentData(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getStudentDetails();
  }, []);

  const handleAssignStudent = async () => {
    const { value: confirmed } = await Swal.fire({
      title: `Confirm assigning ${offerID} offer to ${studentData.name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Assign!',
      cancelButtonText: 'Cancel',
      allowOutsideClick: false
    });

    if (confirmed) {
      try {
        const response = await assignStudent();
        console.log(response)
        const swalOptions = {
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 3000
        };
        if (response.data.message === 'Offer assigned to student successfully') {
          Swal.fire({
            ...swalOptions,
            title: 'Offer assigned to student successfully',
            icon: 'success'
          });
        } else {
          Swal.fire({
            ...swalOptions,
            title: 'Failed to assign offer to student',
            text: response,
            icon: 'error'
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const assignStudent = async () => {
    try {
      const response = await axios.post(`/offer/assignStudent/${studentID}/${offerID}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
      // console.log(response)
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  const handleSendEmail = async () => {
    const studentName = studentData.student_name;
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: `Write e-mail to ${studentName}`,
      inputPlaceholder: 'Type your message',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    })
    if (text) {
      Swal.fire(text)
    }
    await sendEmail(text);
  }

  const sendEmail = async (text) => {
    try {
      const response = await axios.post(`/user/sendEmail`, {
        offer_id: offerID,
        student_id: studentData.id,
        msg: text
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data.message;
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {!studentData ? <PageNotFound /> : (
        <>
          <Container className="pb-2 px-3">
            <h2 className="pt-4 pb-2 px-3">Student Details</h2>
            <Container className="px-3 pb-5" >
              <ListGroup>
                <ListGroup.Item className="offer-details-item">
                  <Row>
                    <Col>
                      <h5>Student ID</h5>
                      <p>{studentData.id}</p>
                    </Col>
                    <Col>
                      <h5>Name</h5>
                      <p>{studentData.name}</p>
                    </Col>
                    <Col>
                      <h5>username</h5>
                      <p>{studentData.username}</p>
                    </Col>
                    <Col>
                      <h5>Major</h5>
                      <p>{studentData.major}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="offer-details-item">
                  <Row>
                    <Col>
                      <h5>Address</h5>
                      <p>{studentData.address}</p>
                    </Col>
                    <Col>
                      <h5>Birth date</h5>
                      <p>{studentData.birth_date}</p>
                    </Col>
                    <Col>
                      <h5>Birth place</h5>
                      <p>{studentData.birth_place}</p>
                    </Col>
                    <Col>
                      <h5>City</h5>
                      <p>{studentData.city}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="offer-details-item">
                  <Row>
                    <Col>
                      <h5>College</h5>
                      <p>{studentData.college}</p>
                    </Col>
                    <Col>
                      <h5>E-mail</h5>
                      <p>{studentData.email}</p>
                    </Col>
                    <Col>
                      <h5>English 101 Mark</h5>
                      <p>{studentData.english_1_mark}</p>
                    </Col>
                    <Col>
                      <h5>English 102 Mark</h5>
                      <p>{studentData.english_2_mark}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="offer-details-item">
                  <Row>
                    <Col>
                      <h5>Gender</h5>
                      <p>{studentData.gender}</p>
                    </Col>
                    <Col>
                      <h5>GPA</h5>
                      <p>{studentData.gpa}</p>
                    </Col>
                    <Col>
                      <h5>Nationality</h5>
                      <p>{studentData.nationality}</p>
                    </Col>
                    <Col>
                      <h5>Phone</h5>
                      <p>{studentData.phone}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="offer-details-item">
                  <Row>
                    <Col>
                      <h5>Status</h5>
                      <p>{studentData.status}</p>
                    </Col>
                    <Col>
                      <h5>Study year</h5>
                      <p>{studentData.study_year}</p>
                    </Col>
                    <Col>
                      <h5>Total credit hours</h5>
                      <p>{studentData.total_credit_hours}</p>
                    </Col>
                    <Col>
                      <button
                        className="btn btn-bg mt-2 p-1"
                        style={{ backgroundColor: "#764abc", color: "white" }}
                        onClick={handleAssignStudent}
                      >
                        Assign student
                      </button>
                      <button
                        className="btn btn-bg mx-2 mt-2 p-1"
                        style={{ backgroundColor: "#146eb4", color: "#FFFFFF" }}
                        onClick={handleSendEmail}
                      >
                        Send e-mail
                      </button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Container>
          </Container>
        </>
      )
      }
    </>
  );
};

export default StudentDetails;
