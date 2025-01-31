import React from 'react';

const Star = ({ rating }) => {
  const maxStars = 5; // Total number of stars
  const stars = []; // Array to hold star icons

  for (let i = 1; i <= maxStars; i++) {
    if (rating >= i) {
      stars.push(<i key={i} className="fas fa-star text-warning"></i>); // Full star
    } else if (rating >= i - 0.5) {
      stars.push(<i key={i} className="fas fa-star-half-alt text-warning"></i>); // Half star
    } else {
      stars.push(<i key={i} className="far fa-star text-warning"></i>); // Empty star
    }
  }

  return <div>{stars}</div>;
};

export default Star;
