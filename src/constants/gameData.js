export const CARD_IMAGES = [
  "/images/1Basto.jpg",
  "/images/1Espada.jpg",
  "/images/1Copa.jpg",
  "/images/1Oro.jpg",
  "/images/7Espada.jpg",
  "/images/7Copa.jpg",
  "/images/7Oro.jpg",
  "/images/7Basto.jpg",
  "/images/4Espada.jpg",
  "/images/4Copa.jpg",
  "/images/4Oro.jpg",
  "/images/4Basto.jpg",
];

export const INITIAL_POSITIONS = [
  { x: -80, y: 20, rotate: -15 }, // Card 1
  { x: 0, y: 0, rotate: 0 }, // Card 2
  { x: 80, y: 20, rotate: 15 }, // Card 3
];

// Position where the deck is located (off-screen or specific spot)
export const DECK_POSITION = {
  x: window.innerWidth + 200,
  y: window.innerHeight / 2,
};
