export enum Suit {
  HEARTS = 'hearts',
  DIAMONDS = 'diamonds',
  CLUBS = 'clubs',
  SPADES = 'spades',
}

export enum Rank {
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
  NINE = '9',
  TEN = '10',
  JACK = 'J',
  QUEEN = 'Q',
  KING = 'K',
  ACE = 'A',
}

export interface CardData {
  id: string;
  suit: Suit;
  rank: Rank;
}

export enum GameStatus {
  DEALING = 'DEALING',
  PLAYER_TURN = 'PLAYER_TURN',
  AI_TURN = 'AI_TURN',
  SELECTING_SUIT = 'SELECTING_SUIT',
  GAME_OVER = 'GAME_OVER',
}

export type Winner = 'PLAYER' | 'AI' | null;
