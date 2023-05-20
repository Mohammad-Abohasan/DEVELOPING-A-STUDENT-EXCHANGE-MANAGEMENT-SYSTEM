import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import ListGroup from 'react-bootstrap/ListGroup';
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
          <h2 className="pt-4 pb-2 px-3">Offer Details</h2>
          <div className="px-3 pb-5">
            <ListGroup className="offer-details">
              <ListGroup.Item className="offer-details-item">
                <h4>Offer ID</h4>
                <p>{offerData.id}</p>
              </ListGroup.Item>
              <ListGroup.Item className="offer-details-item">
                <h4>University</h4>
                <p>{offerData.university_src?.name}</p>
              </ListGroup.Item>
              <ListGroup.Item className="offer-details-item">
                <h4>Country</h4>
                <p>{offerData.university_src?.country}</p>
              </ListGroup.Item>
              <ListGroup.Item className="offer-details-item">
                <h4>Offer Date</h4>
                <p>{offerData.offer_date}</p>
              </ListGroup.Item>
              <ListGroup.Item className="offer-details-item">
                <h4>Other Requirements</h4>
                <p>{offerData.other_requirements}</p>
              </ListGroup.Item>
              <ListGroup.Item className="offer-details-item">
                <h4>Train Description</h4>
                <p>{offerData.train_description}</p>
              </ListGroup.Item>
              <ListGroup.Item className="offer-details-item">
                <h4>Train Type</h4>
                <p>{offerData.train_type}</p>
              </ListGroup.Item>
              <ListGroup.Item className="offer-details-item">
                <h4>Train Start Date</h4>
                <p>{offerData.train_start_date}</p>
              </ListGroup.Item>
              <ListGroup.Item className="offer-details-item">
                <h4>Train End Date</h4>
                <p>{offerData.train_end_date}</p>
              </ListGroup.Item>
              <ListGroup.Item className="offer-details-item">
                <h4>Support Amount</h4>
                <p>{offerData.support_amount}</p>
              </ListGroup.Item>
              <ListGroup.Item className="offer-details-item">
                <h4>Organization ID</h4>
                <p>{offerData.organization_id}</p>
              </ListGroup.Item>
              <ListGroup.Item className="offer-details-item">
                <h4>Train Area</h4>
                <p>{offerData.train_area}</p>
              </ListGroup.Item>
              <ListGroup.Item className="offer-details-item">
                <h4>Days of Work</h4>
                <p>{offerData.days_of_work}</p>
              </ListGroup.Item>
              <ListGroup.Item className="offer-details-item">
                <h4>Weekly Hours</h4>
                <p>{offerData.weekly_hours}</p>
              </ListGroup.Item>
              <ListGroup.Item className="offer-details-item">
                <h4>Daily Hours</h4>
                <p>{offerData.daily_hours}</p>
              </ListGroup.Item>
              <ListGroup.Item className="offer-details-item">
                <h4>College Name</h4>
                <p>{offerData.college_name}</p>
              </ListGroup.Item>
              <ListGroup.Item className="offer-details-item">
                <h4>Branch Name</h4>
                <p>{offerData.branch_name}</p>
              </ListGroup.Item>
              <ListGroup.Item className="offer-details-item">
                <h4>Major Name</h4>
                <p>{offerData.major_name}</p>
              </ListGroup.Item>
              <ListGroup.Item className="offer-details-item">
                <h4>Student Level</h4>
                <p>{offerData.stu_level}</p>
              </ListGroup.Item>
              <ListGroup.Item className="offer-details-item">
                <h4>Student Sex</h4>
                <p>{offerData.stu_sex}</p>
              </ListGroup.Item>
              <ListGroup.Item className="offer-details-item">
                <h4>Work Field</h4>
                <p>{offerData.work_field}</p>
              </ListGroup.Item>
              <ListGroup.Item className="offer-details-item">
                <h4>Meals Text</h4>
                <p>{offerData.meals_text}</p>
              </ListGroup.Item>
              <ListGroup.Item className="offer-details-item">
                <h4>Residence Text</h4>
                <p>{offerData.residence_text}</p>
              </ListGroup.Item>
              <ListGroup.Item className="offer-details-item">
                <h4>Transfer Text</h4>
                <p>{offerData.transfer_text}</p>
              </ListGroup.Item>
              <ListGroup.Item className="offer-details-item">
                <h4>Status</h4>
                <p>{offerData.status}</p>
              </ListGroup.Item>
              <ListGroup.Item className="offer-details-item">
                <h4>Train Length</h4>
                <p>{offerData.train_length}</p>
              </ListGroup.Item>
              <ListGroup.Item className="offer-details-item">
                <h4>Institution Name</h4>
                <p>{offerData.inst_name}</p>
              </ListGroup.Item>
              <ListGroup.Item className="offer-details-item">
                <h4>Place of Work</h4>
                <p>{offerData.place_of_work}</p>
              </ListGroup.Item>
              {hasApply === 'apply' && <ListGroup.Item className="offer-details-item">
                <h4>Apply</h4>
                <p style={{ textAlign: "right" }}>
                  <button
                    className="btn btn-bg"
                    style={{ backgroundColor: "#764abc", color: "white" }}
                    onClick={handleApply}
                  >
                    Apply
                  </button>
                </p>
              </ListGroup.Item>}
            </ListGroup>
          </div>
        </>
      )}
    </>
  );
};

export default OfferDetails;
