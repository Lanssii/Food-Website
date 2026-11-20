const reviewsContainer = document.querySelector(".reviews-grid");

/**
 * Fetches review data from local JSON and renders cards to the DOM.
 * Using async/await for clean asynchronous data handling.
 */

let reviewsData = [];

// Translated field if it exists in locales, otherwise the value from data.json
function reviewText(review, field) {
  return t(`reviews.${review.id}.${field}`, review[field]);
}

function renderReviews() {
  reviewsContainer.innerHTML = "";

  reviewsData.forEach((original) => {
    const review = {
      ...original,
      headline: reviewText(original, "headline"),
      comment: reviewText(original, "comment"),
      user_name: reviewText(original, "user_name"),
      location: reviewText(original, "location"),
    };
      const card = `
        <div class="reviews-card">
              <h3>${review.headline}</h3>
              <p class="review-text">
               ${review.comment}
              </p>
              <hr />
              <div class="person-review">
                <div class="image-container">
                  <img src="${review.profile_photo}" alt="${review.user_name}" />
                </div>
                <div>
                  <p class="person-name">${review.user_name}</p>
                  <p>${review.location}</p>
                </div>
              </div>
            </div>`;

    reviewsContainer.insertAdjacentHTML("beforeend", card);
  });
}

async function getReview() {
  try {
    const res = await fetch("../data.json");
    reviewsData = await res.json();
    renderReviews();
  } catch (error) {
    console.log("Failed to load reviews:", error);
  }
}

if (reviewsContainer) {
  getReview();
  document.addEventListener("i18n:changed", renderReviews);
}
