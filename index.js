const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'aj#64213',
  database: 'online auction system',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const bidForm = document.querySelector('.bid-form');
const bidMessage = document.querySelector('#bid-message');

bidForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get the bid amount from the input field
  const bidAmount = parseFloat(bidForm.elements['bid-amount'].value);

  // Insert the new bid into the database
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return;
    }
    if (connection) {
      const query = 'INSERT INTO bids (auction_id, user_id, bid_amount) VALUES (1, 1, ?)';
      connection.execute(query, [bidAmount], (error, results) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Bid placed for $' + bidAmount);
          bidMessage.textContent = `Bid placed for $${bidAmount.toFixed(2)}!`;
          bidForm.elements['bid-amount'].value = '';
        }
        connection.release();
      });
    }
  });
});

// Find the highest bidder for auction_id 1
pool.getConnection((err, connection) => {
  if (err) {
    console.error(err);
    return;
  }
  if (connection) {
    const query = 'SELECT u.name AS highest_bidder, b.bid_amount AS highest_bid FROM bids b JOIN users u ON b.user_id = u.id JOIN (SELECT auction_id, MAX(bid_amount) AS max_bid FROM bids GROUP BY auction_id) max_bids ON b.auction_id = max_bids.auction_id AND b.bid_amount = max_bids.max_bid WHERE b.auction_id = 1';
    connection.execute(query, [], (error, results) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Highest bidder:', results[0].highest_bidder, '; Highest bid: $', results[0].highest_bid);
      }
      connection.release();
    });
  }
});