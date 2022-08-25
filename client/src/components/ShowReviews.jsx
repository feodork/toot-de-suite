import { Button } from "bootstrap";
import { tooltip } from "leaflet";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ShowReviews = ({ user }) => {
  console.log(user, "are we authed?")
  const [toot, setToot] = useState(null);
  const navigate = useNavigate();
  const { toot_id } = useParams();

  useEffect(() => {
    const getToot = async () => {
      const res = await fetch(`/toot/${toot_id}`, {
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setToot(data);
    };
    getToot();
  }, [toot_id]);

  return !toot ? (
    "loading"
  ) : (
      <div className="show-review">
        <h1>{toot.toot.toilet_name}</h1>
        <div>
          {toot.toot.address1}, {toot.toot.town} {toot.toot.state}
        </div>
        <h4>Reviews</h4>
        <div>
          {toot.reviews.map((review) => {
            return (
              <div key={review.id}>
                <div>
                  {review.username} on {review.date}
                </div>
                <p>{review.text}</p>
              </div>
            );
          })}
        </div>
        {user ? <a href={"/review/" + toot.toot.id + "/new"}>Leave a review</a> : <a href={"/login"}>Login to leave a review</a>}
      </div>
  );
};

export default ShowReviews;
