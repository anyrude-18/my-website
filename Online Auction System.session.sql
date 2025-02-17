INSERT INTO login (mail id, password)
VALUES ('mail id:varchar', password:int);CREATE TABLE `login` (
  `mail id` VARCHAR(30) NOT NULL,
  `password` INT NOT NULL,
  PRIMARY KEY (`mail id`));INSERT INTO login (mail id, password)
  VALUES ('mail id:varchar', password:int);

CREATE TABLE bids (
  id INT AUTO_INCREMENT PRIMARY KEY,
  auction_id INT NOT NULL,
  user_id INT NOT NULL,
  bid_amount DECIMAL(10, 2) NOT NULL,
  bid_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (auction_id) REFERENCES auctions(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

SELECT u.name AS highest_bidder, b.bid_amount AS highest_bid
FROM bids b
JOIN users u ON b.user_id = u.id
JOIN (
  SELECT auction_id, MAX(bid_amount) AS max_bid
  FROM bids
  GROUP BY auction_id
) max_bids ON b.auction_id = max_bids.auction_id AND b.bid_amount = max_bids.max_bid
WHERE b.auction_id = ?;