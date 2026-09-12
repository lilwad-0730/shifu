import { philosophyCards, books } from './content.js';

export function chooseCard(topic, selectedValues = []) {
  const candidates = philosophyCards.filter(card => card.topic === topic);
  return candidates.sort((a, b) => score(b, selectedValues) - score(a, selectedValues))[0];
}

function score(card, selectedValues) {
  return card.values.filter(value => selectedValues.includes(value)).length;
}

export function recommendBooks(topic, limit = 3) {
  return books.filter(book => book.topic === topic).slice(0, limit);
}

export function buildReflection({ topic, feeling, situation, values, answer, action, card }) {
  return {
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
    schemaVersion: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    topic,
    feeling,
    situation: situation.trim(),
    values,
    insight: answer.trim(),
    philosophyTitle: card.title,
    action: action.trim(),
    actionStatus: '尚未嘗試'
  };
}

export function validateContent() {
  const counts = Object.fromEntries(['boundaries', 'work', 'choices'].map(topic => [topic, philosophyCards.filter(card => card.topic === topic).length]));
  return {
    counts,
    cardsValid: philosophyCards.every(card => card.title && card.summary && card.question && card.source && card.actions.length >= 3),
    booksValid: books.every(book => book.title && book.author && book.reason),
    topicsHaveFourCards: Object.values(counts).every(count => count === 4),
    topicsHaveBooks: ['boundaries', 'work', 'choices'].every(topic => books.some(book => book.topic === topic))
  };
}
