import { useState, useEffect, useCallback } from 'react';
import { CardData, GameStatus, Suit, Rank, Winner } from '../types';
import { createDeck } from '../constants';

export const useCrazyEights = () => {
  const [deck, setDeck] = useState<CardData[]>([]);
  const [playerHand, setPlayerHand] = useState<CardData[]>([]);
  const [aiHand, setAiHand] = useState<CardData[]>([]);
  const [discardPile, setDiscardPile] = useState<CardData[]>([]);
  const [status, setStatus] = useState<GameStatus>(GameStatus.DEALING);
  const [activeSuit, setActiveSuit] = useState<Suit | null>(null);
  const [winner, setWinner] = useState<Winner>(null);
  const [message, setMessage] = useState<string>('正在发牌...');

  // Initialize Game
  const initGame = useCallback(() => {
    const newDeck = createDeck();
    const pHand = newDeck.splice(0, 8);
    const aHand = newDeck.splice(0, 8);
    
    // Ensure first discard is not an 8 for simplicity, or just handle it
    let firstDiscard = newDeck.pop()!;
    while (firstDiscard.rank === Rank.EIGHT) {
      newDeck.unshift(firstDiscard);
      firstDiscard = newDeck.pop()!;
    }

    setDeck(newDeck);
    setPlayerHand(pHand);
    setAiHand(aHand);
    setDiscardPile([firstDiscard]);
    setActiveSuit(firstDiscard.suit);
    setStatus(GameStatus.PLAYER_TURN);
    setWinner(null);
    setMessage('轮到你了！');
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const topCard = discardPile[discardPile.length - 1];

  const isPlayable = (card: CardData) => {
    if (card.rank === Rank.EIGHT) return true;
    return card.suit === activeSuit || card.rank === topCard.rank;
  };

  const playCard = (card: CardData, isPlayer: boolean) => {
    if (isPlayer) {
      setPlayerHand((prev) => prev.filter((c) => c.id !== card.id));
    } else {
      setAiHand((prev) => prev.filter((c) => c.id !== card.id));
    }

    setDiscardPile((prev) => [...prev, card]);
    
    if (card.rank === Rank.EIGHT) {
      if (isPlayer) {
        setStatus(GameStatus.SELECTING_SUIT);
        setMessage('请选择一个花色！');
      } else {
        // AI picks a suit (simple: pick the suit it has most of)
        const counts = {
          [Suit.HEARTS]: 0,
          [Suit.DIAMONDS]: 0,
          [Suit.CLUBS]: 0,
          [Suit.SPADES]: 0,
        };
        aiHand.forEach(c => counts[c.suit]++);
        const bestSuit = (Object.keys(counts) as Suit[]).reduce((a, b) => counts[a] > counts[b] ? a : b);
        
        const suitNames = {
          [Suit.HEARTS]: '红桃',
          [Suit.DIAMONDS]: '方块',
          [Suit.CLUBS]: '梅花',
          [Suit.SPADES]: '黑桃',
        };

        setActiveSuit(bestSuit);
        setStatus(GameStatus.PLAYER_TURN);
        setMessage(`AI 出了 8 并选择了 ${suitNames[bestSuit]}！轮到你了。`);
      }
    } else {
      setActiveSuit(card.suit);
      const nextStatus = isPlayer ? GameStatus.AI_TURN : GameStatus.PLAYER_TURN;
      setStatus(nextStatus);
      setMessage(isPlayer ? "AI 的回合..." : "轮到你了！");
    }
  };

  const drawCard = (isPlayer: boolean) => {
    if (deck.length === 0) {
      setMessage("牌堆已空！跳过回合。");
      setStatus(isPlayer ? GameStatus.AI_TURN : GameStatus.PLAYER_TURN);
      return;
    }

    const newDeck = [...deck];
    const drawnCard = newDeck.pop()!;
    setDeck(newDeck);

    if (isPlayer) {
      setPlayerHand((prev) => [...prev, drawnCard]);
      // After drawing, if it's playable, player can play it? 
      // Prompt says: "If player has no cards to play, must draw one. If draw pile empty, skip turn."
      // Usually in Crazy 8s, you draw and if you can play it, you can. If not, turn ends.
      // Let's check if it's playable.
      if (!isPlayable(drawnCard)) {
        setStatus(GameStatus.AI_TURN);
        setMessage("抽到的牌无法出。AI 的回合。");
      } else {
        setMessage("抽到了可以出的牌！出牌还是结束回合？");
        // In this implementation, we'll let the player decide to play it.
      }
    } else {
      setAiHand((prev) => [...prev, drawnCard]);
      if (!isPlayable(drawnCard)) {
        setStatus(GameStatus.PLAYER_TURN);
        setMessage("AI 抽了一张牌但无法出。轮到你了。");
      } else {
        // AI plays the drawn card immediately if it can
        setTimeout(() => playCard(drawnCard, false), 1000);
      }
    }
  };

  const selectWildSuit = (suit: Suit) => {
    const suitNames = {
      [Suit.HEARTS]: '红桃',
      [Suit.DIAMONDS]: '方块',
      [Suit.CLUBS]: '梅花',
      [Suit.SPADES]: '黑桃',
    };
    setActiveSuit(suit);
    setStatus(GameStatus.AI_TURN);
    setMessage(`你选择了 ${suitNames[suit]}！AI 的回合...`);
  };

  // AI Logic
  useEffect(() => {
    if (status === GameStatus.AI_TURN && !winner) {
      const timer = setTimeout(() => {
        const playableCards = aiHand.filter(isPlayable);
        if (playableCards.length > 0) {
          // Play a card (prefer non-8s)
          const nonEight = playableCards.find(c => c.rank !== Rank.EIGHT);
          playCard(nonEight || playableCards[0], false);
        } else {
          drawCard(false);
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [status, aiHand, activeSuit, topCard, winner]);

  // Check Winner
  useEffect(() => {
    if (playerHand.length === 0 && status !== GameStatus.DEALING) {
      setWinner('PLAYER');
      setStatus(GameStatus.GAME_OVER);
      setMessage('恭喜！你赢了！');
    } else if (aiHand.length === 0 && status !== GameStatus.DEALING) {
      setWinner('AI');
      setStatus(GameStatus.GAME_OVER);
      setMessage('AI 赢了！下次好运。');
    }
  }, [playerHand.length, aiHand.length, status]);

  return {
    playerHand,
    aiHand,
    discardPile,
    deck,
    status,
    activeSuit,
    winner,
    message,
    playCard,
    drawCard,
    selectWildSuit,
    initGame,
    topCard,
    isPlayable,
  };
};
