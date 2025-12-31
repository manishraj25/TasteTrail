import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ReviewSection({ recipeId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [photo, setPhoto] = useState(null);

  const fetchReviews = async () => {
    const res = await api.get(`/reviews/${recipeId}`);
    setReviews(res.data);
  };

  useEffect(() => {
    fetchReviews();
  }, [recipeId]);

  const submitReview = async () => {
    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("comment", comment);
    if (photo) formData.append("photo", photo);

    await api.post(`/reviews/${recipeId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    setComment("");
    setPhoto(null);
    fetchReviews();
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-2">Reviews</h3>

      {/* ADD REVIEW */}
      <div className="bg-gray-100 p-4 rounded mb-4">
        <label className="block mb-1">Rating</label>
        <select
          value={rating}
          onChange={e => setRating(e.target.value)}
          className="input"
        >
          {[5,4,3,2,1].map(r => (
            <option key={r} value={r}>{r} ⭐</option>
          ))}
        </select>

        <textarea
          className="input mt-2"
          placeholder="Write your review..."
          value={comment}
          onChange={e => setComment(e.target.value)}
        />

        <input
          type="file"
          className="mt-2"
          onChange={e => setPhoto(e.target.files[0])}
        />

        <button
          onClick={submitReview}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit Review
        </button>
      </div>

      {/* REVIEWS LIST */}
      {reviews.map(r => (
        <div key={r._id} className="border-b py-3">
          <div className="font-semibold">
            {r.user?.name} — {r.rating} ⭐
          </div>
          <p className="text-gray-700">{r.comment}</p>

          {r.photo && (
            <img
              src={r.photo}
              alt="food"
              className="h-40 mt-2 rounded object-cover"
            />
          )}
        </div>
      ))}
    </div>
  );
}
