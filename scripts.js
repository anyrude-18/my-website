// scripts.js

// Fetch auction data from the server or a static JSON file
fetch('auctions.json')
  .then(response => response.json())
  .then(data => {
    const featuredAuctions = data.filter(auction => auction.featured);
    const testimonials = data.testimonials;

    // Render featured auctions
    const auctionList = document.querySelector('.auction-list');
    featuredAuctions.forEach(auction => {
      const auctionItem = document.createElement('div');
      auctionItem.classList.add('auction-item');
      auctionItem.innerHTML = `
        <h3>${auction.title}</h3>
        <p>${auction.description}</p>
        <p>Current Bid: ${auction.currentBid}</p>
        <p>End Date: ${auction.endDate}</p>
        <a href="auction-details.html?id=${auction.id}" class="btn">View Details</a>
      `;
      auctionList.appendChild(auctionItem);
    });

    // Render testimonials
    const testimonialList = document.querySelector('.testimonial-list');
    testimonials.forEach(testimonial => {
      const testimonialItem = document.createElement('div');
      testimonialItem.classList.add('testimonial-item');
      testimonialItem.innerHTML = `
        <p>${testimonial.text}</p>
        <p class="author">- ${testimonial.author}</p>
      `;
      testimonialList.appendChild(testimonialItem);
    });
  })
  .catch(error => {
    console.error('Error fetching auction data:', error);
  });

// Handle auction details page
const urlParams = new URLSearchParams(window.location.search);
const auctionId = urlParams.get('id');

if (auctionId) {
  fetch(`auctions.json`)
    .then(response => response.json())
    .then(data => {
      const auction = data.find(auction => auction.id === auctionId);

      if (auction) {
        const auctionDetails = document.createElement('div');
        auctionDetails.innerHTML = `
          <h2>${auction.title}</h2>
          <p>${auction.description}</p>
          <p>Current Bid: ${auction.currentBid}</p>
          <p>End Date: ${auction.endDate}</p>
          <form id="bidForm">
            <input type="number" id="bidAmount" placeholder="Enter your bid" required>
            <button type="submit">Place Bid</button>
          </form>
        `;

        const auctionDetailsSection = document.querySelector('#auction-details-section');
        auctionDetailsSection.appendChild(auctionDetails);

        const bidForm = document.querySelector('#bidForm');
        bidForm.addEventListener('submit', e => {
          e.preventDefault();
          const bidAmount = document.querySelector('#bidAmount').value;
          // Handle bid submission (e.g., send bid data to the server)
          console.log('Bid placed:', bidAmount);
        });
      } else {
        console.error('Auction not found');
      }
    })
    .catch(error => {
      console.error('Error fetching auction data:', error);
    });
}