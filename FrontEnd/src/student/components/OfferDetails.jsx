import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OfferDetails = () => {
  const { offerID } = useParams();
  const apiUrl = "http://localhost:9000";
  const [offerData, setOfferData] = useState([]);
  
  useEffect(() => {
    fetch(`${apiUrl}/offers/${offerID}`)
      .then((res) => res.json())
      .then((data) => setOfferData(data));
  }, []);

  return (
    <>
      <div>Offer Details</div>
      {offerData && (
        <>
          <h1>{offerData.university_name}</h1>
          {offerData.offer_id}
          {offerData.university_id_src}
          {offerData.offer_date}
          {offerData.other_requirements}
          {offerData.train_description}
          {offerData.train_type}
          {offerData.train_start_date}
          {offerData.train_end_date}
          {offerData.support_amount}
          {offerData.organization_id}
          {offerData.train_area}
          {offerData.days_of_work}
          {offerData.weekly_hours}
          {offerData.daily_hours}
          {offerData.college_name}
          {offerData.branch_name}
          {offerData.major_name}
          {offerData.stu_level}
          {offerData.stu_sex}
          {offerData.work_field}
          {offerData.meals_text}
          {offerData.residence_text}
          {offerData.transfer_text}
          {offerData.status}
          {offerData.train_length}
          {offerData.inst_name}
          {offerData.place_of_work}
        </>
      )}
    </>
  );
};

export default OfferDetails;
