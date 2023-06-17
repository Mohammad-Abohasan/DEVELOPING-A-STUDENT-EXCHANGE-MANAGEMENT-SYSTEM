import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { AccessTokenContext } from "../../context/AccessTokenProvider";
import axios from '../../api/axios';
import PageNotFound from "./PageNotFound";
import './OfferDetails.css';

const OfferDetails = () => {
  const { hasApply } = useParams('apply');
  const offerID = useParams().offerID;
  const [offerData, setOfferData] = useState([]);
  const { accessToken } = useContext(AccessTokenContext);

  const handleApply = async () => {
    const { value: confirmed } = await Swal.fire({
      title: `Confirm applying for ${offerData?.university_src?.name} offer?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Apply!',
      cancelButtonText: 'Cancel',
      allowOutsideClick: false
    });

    if (confirmed) {
      try {
        const response = await submitOffer();
        const swalOptions = {
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 3000
        };
        if (response === 'Request submitted successfully 🥳') {
          Swal.fire({
            ...swalOptions,
            title: 'Offer applied successfully!',
            icon: 'success'
          });
        } else {
          Swal.fire({
            ...swalOptions,
            title: 'Failed to apply for the offer',
            text: response,
            icon: 'error'
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const submitOffer = async () => {
    try {
      const response = await axios.post(`/student/submitOffer`, {
        offer_id: offerData.id
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return response.data.message;
    } catch (err) {
      console.error(err);
    }
  }

  const getOfferDetails = async () => {
    try {
      const response = await axios.get(`/student/availableOffers/${offerID}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setOfferData(response.data[0]);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getOfferDetails();
  }, []);

  return (
    <>
      {!offerData || (hasApply !== 'apply' && hasApply !== 'noApply') ? <PageNotFound /> : (
        <>
          <Container className="pb-2 px-3">
            <h2 className="pt-4 pb-2 px-3">Offer Details</h2>
            <Container className="px-3 pb-5" >
              <ListGroup>
                <ListGroup.Item className="offer-details-item">
                  <Row>
                    <Col>
                      <h5>Offer ID</h5>
                      <p>{offerData.id}</p>
                    </Col>
                    <Col>
                      <h5>University</h5>
                      <p>{offerData.university_src?.name}</p>
                    </Col>
                    <Col>
                      <h5>Country</h5>
                      <p>{offerData.university_src?.country}</p>
                    </Col>
                    <Col>
                      <h5>Type</h5>
                      <p>{offerData.train_type}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="offer-details-item">
                  <Row>
                    <Col>
                      <h5>Offer Date</h5>
                      <p>{offerData.offer_date}</p>
                    </Col>
                    <Col>
                      <h5>Train Start Date</h5>
                      <p>{offerData.train_start_date}</p>
                    </Col>
                    <Col>
                      <h5>Train End Date</h5>
                      <p>{offerData.train_end_date}</p>
                    </Col>
                    <Col>
                      <h5>Place of Work</h5>
                      <p>{offerData.place_of_work}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className="offer-details-item">
                  <Row>
                    <Col>
                      <h5>Support Amount</h5>
                      <p>{offerData.support_amount}</p>
                    </Col>
                    <Col>
                      <h5>Meals</h5>
                      <p>{offerData.meals_text}</p>
                    </Col>
                    <Col>
                      <h5>Residence</h5>
                      <p>{offerData.residence_text}</p>
                    </Col>
                    <Col>
                      <h5>Transfer</h5>
                      <p>{offerData.transfer_text}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className="offer-details-item">
                  <Row>
                    <Col>
                      <h5>College</h5>
                      <p>{offerData.college_name}</p>

                    </Col>
                    <Col>
                      <h5>Days of Work</h5>
                      <p>{offerData.days_of_work}</p>
                    </Col>
                    <Col>
                      <h5>Weekly Hours</h5>
                      <p>{offerData.weekly_hours}</p>
                    </Col>
                    <Col>
                      <h5>Daily Hours</h5>
                      <p>{offerData.daily_hours}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className="offer-details-item">
                  <Row>
                    <Col>
                      <h5>Work Field</h5>
                      <p>{offerData.work_field}</p>
                    </Col>

                    <Col>
                      <h5>Institution</h5>
                      <p>{offerData.inst_name}</p>

                    </Col>
                    <Col>
                      <h5>Branch</h5>
                      <p>{offerData.branch_name}</p>
                    </Col>
                    <Col>
                      <h5>Major</h5>
                      <p>{offerData.major_name}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className="offer-details-item">
                  <Row>
                    <Col>
                      <h5>Train Aria</h5>
                      <p>{offerData.train_area}</p>
                    </Col>
                    <Col>
                      <h5>Student Level</h5>
                      <p>{offerData.stu_level}</p>
                    </Col>
                    <Col>
                      <h5>Student Sex</h5>
                      <p>{offerData.stu_sex}</p>
                    </Col>
                    <Col>
                      <h5>Train Length</h5>
                      <p>{offerData.train_length}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className="offer-details-item">
                  <Row>
                    <Col>
                      <h5>Other Requirements</h5>
                      <p>{offerData.other_requirements}</p>
                    </Col>
                    <Col>
                      <h5>Train Description</h5>
                      <p>{offerData.train_description}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {hasApply === 'apply' &&
                  <ListGroup.Item className="offer-details-item">
                    <Row>
                      <Col className="text-center">
                        <button
                          className="btn btn-bg"
                          style={{ backgroundColor: "#764abc", color: "white" }}
                          onClick={handleApply}
                        >
                          Apply
                        </button>
                      </Col>
                    </Row>
                  </ListGroup.Item>}
              </ListGroup>
            </Container>
          </Container>
        </>
      )
      }
    </>
  );
};

export default OfferDetails;
