import assert from 'node:assert/strict';
import { chooseCard, recommendBooks, buildReflection, validateContent } from './logic.js';

const report = validateContent();
assert.equal(report.topicsHaveFourCards, true);
assert.equal(report.cardsValid, true);
assert.equal(report.booksValid, true);
assert.equal(report.topicsHaveBooks, true);
assert.equal(chooseCard('boundaries', ['自由']).topic, 'boundaries');
assert.equal(recommendBooks('work').length, 3);
const saved = buildReflection({ topic:'work', feeling:'迷惘', situation:'  想轉職  ', values:['成長'], answer:'  先試一次  ', action:'  訪談  ', card:chooseCard('work',['成長']) });
assert.equal(saved.situation, '想轉職');
assert.equal(saved.actionStatus, '尚未嘗試');
console.log('內容與核心邏輯檢查通過', report.counts);
