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
      {offerData && (
        <>
          <h1>{offerData.university_name}</h1>
          {offerData.offer_date}
        </>
      )}
    </>
  );
};

export default OfferDetails;
