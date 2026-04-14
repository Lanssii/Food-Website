const reviewsContainer = document.querySelector(".reviews-grid");

/**
 * Fetches review data from local JSON and renders cards to the DOM.
 * Using async/await for clean asynchronous data handling.
 */

async function getReview() {
  try {
    const res = await fetch("data.json");
    const data = await res.json();

    reviewsContainer.innerHTML = "";

    data.forEach((review) => {
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
  } catch (error) {
    console.log("Failed to load reviews:", error);
  }
}

getReview();
