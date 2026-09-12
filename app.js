import { topics, feelings, values } from './content.js';
import { chooseCard, recommendBooks, buildReflection } from './logic.js';

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const state = { step:0, topic:'', feeling:'', situation:'', values:[], answer:'', action:'', card:null };
let cards = [];
let db;

function escapeHtml(value='') {
  return value.replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}

function renderChoices() {
  $('#topic-grid').innerHTML = topics.map(topic => `<button class="topic-card" data-start-topic="${topic.id}"><span class="topic-mark">${topic.mark}</span><h3>${topic.title}</h3><p>${topic.subtitle}</p><span class="arrow" aria-hidden="true">→</span></button>`).join('');
  $('#form-topics').innerHTML = topics.map(topic => `<label class="choice-card"><input type="radio" name="topic" value="${topic.id}"><span class="topic-mark">${topic.mark}</span><span><strong>${topic.title}</strong><small>${topic.subtitle}</small></span><i class="choice-dot" aria-hidden="true"></i></label>`).join('');
  $('#feelings-list').innerHTML = feelings.map(item => `<label class="pill"><input type="radio" name="feeling" value="${item}"><span>${item}</span></label>`).join('');
  $('#values-list').innerHTML = values.map(item => `<label class="pill"><input type="checkbox" name="value" value="${item}"><span>${item}</span></label>`).join('');
}

function showView(name) {
  $$('.view').forEach(view => view.hidden = view.id !== `${name}-view`);
  $$('.nav-link').forEach(link => link.classList.toggle('is-active', link.dataset.view === name));
  if (name === 'journal') renderJournal();
  window.scrollTo({ top:0, behavior:'smooth' });
}

function startExplore(topic='') {
  resetForm();
  showView('explore');
  if (topic) {
    state.topic = topic;
    const radio = $(`input[name="topic"][value="${topic}"]`);
    if (radio) radio.checked = true;
  }
  showStep(topic ? 1 : 0);
}

function showStep(step) {
  state.step = step;
  $$('.step').forEach(item => item.hidden = Number(item.dataset.step) !== step);
  $('#result-panel').hidden = true;
  $('#reflection-form').hidden = false;
  $('#progress-label').textContent = `第 ${step + 1} 步，共 5 步`;
  $('#progress-bar').style.width = `${(step + 1) * 20}%`;
  const current = $(`.step[data-step="${step}"]`);
  const heading = current?.querySelector('legend');
  if (heading) { heading.tabIndex = -1; heading.focus(); }
  window.scrollTo({ top:0, behavior:'smooth' });
}

function resetForm() {
  $('#reflection-form').reset();
  Object.assign(state,{ step:0, topic:'', feeling:'', situation:'', values:[], answer:'', action:'', card:null });
  $('#situation-count').textContent = '0';
  $('#answer-count').textContent = '0';
}

function validateStep(step) {
  if (step === 0) {
    const selected = $('input[name="topic"]:checked');
    if (!selected) return notify('請先選一個最接近的課題'), false;
    state.topic = selected.value;
  }
  if (step === 1) {
    const selected = $('input[name="feeling"]:checked');
    const situation = $('#situation').value.trim();
    if (!selected) return notify('請選一個最接近的感受'), false;
    if (!situation) return notify('請用幾個字記下目前的處境'), false;
    state.feeling = selected.value;
    state.situation = situation;
  }
  if (step === 2) {
    state.values = $$('input[name="value"]:checked').map(input => input.value);
    if (!state.values.length) return notify('請選一項你想守住的價值'), false;
    state.card = chooseCard(state.topic, state.values);
    renderWisdom();
  }
  if (step === 3) {
    const answer = $('#deep-answer').value.trim();
    if (!answer) return notify('請留下一點你的想法'), false;
    state.answer = answer;
    renderActions();
  }
  return true;
}

function renderWisdom() {
  const card = state.card;
  $('#wisdom-card').innerHTML = `<p class="eyebrow">${escapeHtml(topics.find(t => t.id === card.topic).title)}</p><h2>${escapeHtml(card.title)}</h2><p>${escapeHtml(card.summary)}</p><small>思想線索：${escapeHtml(card.source)}。以上為概念轉譯，不是原文引句。</small>`;
  $('#deep-question').textContent = card.question;
}

function renderActions() {
  const options = [...state.card.actions, '我現在只想整理，不安排動作'];
  $('#action-list').innerHTML = options.map((action,index) => `<label class="action-option"><input type="radio" name="action" value="${escapeHtml(action)}" ${index===0?'checked':''}><span>${escapeHtml(action)}</span></label>`).join('');
}

function finishReflection(event) {
  event.preventDefault();
  const custom = $('#custom-action').value.trim();
  state.action = custom || $('input[name="action"]:checked')?.value || '暫時不安排動作';
  renderResult();
  $('#reflection-form').hidden = true;
  $('#result-panel').hidden = false;
  $('#progress-label').textContent = '探索完成';
  $('#progress-bar').style.width = '100%';
  window.scrollTo({ top:0, behavior:'smooth' });
}

function renderResult() {
  $('#result-situation').value = state.situation;
  $('#result-insight').value = state.answer;
  $('#result-action').value = state.action;
  $('#book-list').innerHTML = recommendBooks(state.topic).map(book => `<article class="book-card"><p class="author">${escapeHtml(book.author)}</p><h4>${escapeHtml(book.title)}</h4><p>${escapeHtml(book.reason)}</p></article>`).join('');
}

async function saveResult() {
  const reflection = buildReflection({ ...state, situation:$('#result-situation').value, answer:$('#result-insight').value, action:$('#result-action').value });
  try {
    await putCard(reflection);
    cards = await getCards();
    updateCount();
    notify('課題卡已保存在這個瀏覽器');
    showView('journal');
  } catch {
    notify('目前無法保存，請先匯出或保留這個頁面');
  }
}

function openDb() {
  return new Promise((resolve,reject) => {
    const request = indexedDB.open('wenxin-compass',1);
    request.onupgradeneeded = () => request.result.createObjectStore('cards',{keyPath:'id'});
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function transaction(mode, action) {
  return new Promise((resolve,reject) => {
    const tx = db.transaction('cards',mode);
    const store = tx.objectStore('cards');
    const request = action(store);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
const putCard = card => transaction('readwrite', store => store.put(card));
const getCards = () => transaction('readonly', store => store.getAll());
const deleteCard = id => transaction('readwrite', store => store.delete(id));
const clearCards = () => transaction('readwrite', store => store.clear());

function renderJournal() {
  const list = $('#cards-list');
  $('#empty-journal').hidden = cards.length > 0;
  list.hidden = cards.length === 0;
  $('#journal-summary').textContent = cards.length ? `${cards.length} 張課題卡保存在這個瀏覽器` : '尚未保存課題';
  list.innerHTML = [...cards].sort((a,b)=>b.createdAt.localeCompare(a.createdAt)).map(card => {
    const topic = topics.find(item => item.id === card.topic);
    const date = new Intl.DateTimeFormat('zh-TW',{dateStyle:'medium'}).format(new Date(card.createdAt));
    return `<article class="reflection-card" data-card-id="${card.id}"><div class="card-top"><div><p class="card-date">${date}・${escapeHtml(card.feeling)}</p><h2>${escapeHtml(topic?.title || '我的課題')}</h2><div class="card-values">${card.values.map(value=>`<span>${escapeHtml(value)}</span>`).join('')}</div></div><button class="delete-card" data-delete="${card.id}">刪除</button></div><blockquote>${escapeHtml(card.situation)}</blockquote><p><strong>我看見的事：</strong>${escapeHtml(card.insight)}</p><div class="card-action"><p><strong>一小步：</strong>${escapeHtml(card.action)}</p><label>目前狀態 <select data-status="${card.id}">${['尚未嘗試','已嘗試','調整','放棄'].map(s=>`<option ${s===card.actionStatus?'selected':''}>${s}</option>`).join('')}</select></label></div></article>`;
  }).join('');
}

async function handleJournalClick(event) {
  const id = event.target.dataset.delete;
  if (!id) return;
  if (!confirm('確定刪除這張課題卡？這個動作無法復原。')) return;
  await deleteCard(id); cards = await getCards(); updateCount(); renderJournal(); notify('課題卡已刪除');
}

async function handleStatus(event) {
  const id = event.target.dataset.status;
  if (!id) return;
  const card = cards.find(item => item.id === id);
  if (!card) return;
  card.actionStatus = event.target.value; card.updatedAt = new Date().toISOString();
  await putCard(card); notify('回顧狀態已更新');
}

function exportCards() {
  if (!cards.length) return notify('目前沒有可匯出的課題卡');
  const blob = new Blob([JSON.stringify({ exportedAt:new Date().toISOString(), cards },null,2)],{type:'application/json'});
  const url = URL.createObjectURL(blob); const anchor = document.createElement('a');
  anchor.href=url; anchor.download=`問心羅盤-${new Date().toISOString().slice(0,10)}.json`; anchor.click(); URL.revokeObjectURL(url);
}

async function clearAll() {
  if (!cards.length || !confirm('確定清除全部課題卡？建議先匯出備份。')) return;
  await clearCards(); cards=[]; updateCount(); renderJournal(); notify('所有本機課題卡已清除');
}

function updateCount() { $('#card-count').textContent = cards.length; }
function notify(message) { const toast=$('#toast'); toast.textContent=message; toast.classList.add('show'); clearTimeout(notify.timer); notify.timer=setTimeout(()=>toast.classList.remove('show'),2600); }

function bindEvents() {
  document.addEventListener('click', event => {
    const view = event.target.closest('[data-view]')?.dataset.view;
    if (view) showView(view);
    const topic = event.target.closest('[data-start-topic]')?.dataset.startTopic;
    if (topic) startExplore(topic);
    const dialog = event.target.closest('[data-dialog]')?.dataset.dialog;
    if (dialog) document.getElementById(dialog).showModal();
    if (event.target.classList.contains('dialog-close')) event.target.closest('dialog').close();
  });
  $$('.next').forEach(button => button.addEventListener('click',()=>validateStep(state.step)&&showStep(state.step+1)));
  $$('.prev').forEach(button => button.addEventListener('click',()=>showStep(Math.max(0,state.step-1))));
  $('#hero-start').addEventListener('click',()=>document.querySelector('#topics').scrollIntoView());
  $('#finish-button').addEventListener('click',finishReflection);
  $('#save-button').addEventListener('click',saveResult);
  $('#restart-button').addEventListener('click',()=>startExplore());
  $('#new-reflection').addEventListener('click',()=>startExplore());
  $('#empty-start').addEventListener('click',()=>startExplore());
  $('#export-button').addEventListener('click',exportCards);
  $('#clear-button').addEventListener('click',clearAll);
  $('#cards-list').addEventListener('click',handleJournalClick);
  $('#cards-list').addEventListener('change',handleStatus);
  $('#situation').addEventListener('input',event=>$('#situation-count').textContent=event.target.value.length);
  $('#deep-answer').addEventListener('input',event=>$('#answer-count').textContent=event.target.value.length);
  $('#values-list').addEventListener('change',event=>{ if(event.target.checked && $$('input[name="value"]:checked').length>2){event.target.checked=false;notify('最多選兩項價值');} });
  $$('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target===dialog) dialog.close();}));
}

async function init() {
  renderChoices(); bindEvents();
  try { db=await openDb(); cards=await getCards(); updateCount(); } catch { notify('這個瀏覽器目前無法保存課題卡'); }
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
}
init();
