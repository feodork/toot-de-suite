import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const CreateReview = () => {
  const [text, setText] = useState("");
//   const [reviews, setReviews] = useState("");

  const navigate = useNavigate();
  const { toot_id} = useParams();
  
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/reviews/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text, toot_id: toot_id }),
    });
    const data = await res.json();
    console.log(toot_id, text);
    navigate(`/review/${toot_id}`);
  };

//   const handleDelete = async (review_id) => {
//     console.log("review id?", review_id)
//     await fetch(`/review/${review_id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json"
//       }
//     })
//     setReviews(reviews.filter((review) => review.id !== review_id))
//   }

//   const handleClick = () => {
//     handleDelete(params)
//     navigate(`/review/${review_id}`)
// }

  return (
    <div className="leave-review">
      <h1>Review</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="controlTextarea">
          <Form.Label htmlFor="text"></Form.Label>
          <Form.Control
            value={text}
            onChange={handleChange}
            as="textarea"
            id="text"
            name="text"
            placeholder="Leave a review"
            required
          />
          <Button variant="dark" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default CreateReview;
