export const topics = [
  { id: 'boundaries', mark: '界', title: '人際界線', subtitle: '在關係中照顧自己，也看見彼此', prompt: '最近哪段關係，讓你覺得難以說出真正的需要？' },
  { id: 'work', mark: '業', title: '工作與自我價值', subtitle: '把成就與自己的價值慢慢分開', prompt: '最近哪件工作上的事，最容易讓你懷疑自己？' },
  { id: 'choices', mark: '途', title: '選擇與不確定', subtitle: '在沒有標準答案時，找回選擇的方向', prompt: '現在有哪些選擇，讓你遲遲無法前進？' }
];

export const feelings = ['疲憊', '焦慮', '生氣', '委屈', '迷惘', '害怕', '失落', '平靜'];
export const values = ['安定', '自由', '成長', '關係', '尊重', '誠實', '意義', '勇氣'];

export const philosophyCards = [
  { id:'b-control', topic:'boundaries', values:['自由','尊重'], title:'先分清能掌握的事', summary:'你能決定如何表達界線，卻無法完全決定別人如何評價。界線不是控制對方，而是說清楚自己願意承擔什麼。', question:'如果不必控制對方的反應，你最想誠實說明哪一項需要？', source:'愛比克泰德《手冊》的「可控與不可控」概念', actions:['先寫下一句界線，不急著送出','找可信任的人排練一次','為自己保留一段不被打擾的時間'] },
  { id:'b-middle', topic:'boundaries', values:['關係','尊重'], title:'在兩個極端之間找分寸', summary:'照顧關係不等於全部答應，保護自己也不等於拒人千里。合適的分寸，要放回這段關係與當下處境裡衡量。', question:'在「全部接受」與「完全拒絕」之間，有沒有一個你願意嘗試的做法？', source:'亞里斯多德《尼各馬科倫理學》的中道概念', actions:['把答覆改成「我需要想一下」','只答應自己能負擔的一部分','提出一個雙方都能討論的替代方案'] },
  { id:'b-reciprocity', topic:'boundaries', values:['關係','誠實'], title:'關係需要彼此成全', summary:'好的關係容得下真實，而不是靠一方長期壓縮自己維持。先理解彼此的處境，再決定願意靠近多少。', question:'你希望這段關係如何同時容納對方和你的需要？', source:'孔子《論語》的忠恕與推己及人概念', actions:['用「我目前能做到的是」開頭表達','先問清楚對方真正需要什麼','寫下你願意與不願意承擔的各一件事'] },
  { id:'b-love', topic:'boundaries', values:['成長','關係'], title:'關心也是一種練習', summary:'成熟的關心包含理解、責任與尊重，不是替對方活，也不是犧牲到失去自己。界線能讓付出更出於選擇。', question:'你現在的付出，有多少出於選擇，又有多少出於害怕？', source:'埃里希・佛洛姆《愛的藝術》的關懷與尊重概念', actions:['把「我應該」改寫成「我選擇」再讀一次','暫停一次習慣性的答應','說出一件你需要對方理解的事'] },

  { id:'w-worth', topic:'work', values:['意義','尊重'], title:'工作成果不是你的全部', summary:'成果會改變，人的尊嚴不應隨一次評價起落。你可以對工作負責，同時拒絕把整個自己縮成一項成績。', question:'如果這次結果不能替你定義自己，你仍想成為怎樣的人？', source:'康德倫理學中「人是目的」的概念轉譯', actions:['列出一項與工作無關的自我價值','把評價改寫成一件可改善的行為','今天準時結束工作一次'] },
  { id:'w-meaning', topic:'work', values:['意義','勇氣'], title:'意義來自如何回應', summary:'環境不總由我們選擇，但仍能在有限範圍裡選擇回應。意義未必是宏大使命，也可能是今天願意負責的一小步。', question:'在目前限制裡，哪個回應最接近你想成為的人？', source:'維克多・弗蘭克《活出意義來》的意義概念', actions:['完成一件十五分鐘內可推進的小事','寫下這份工作目前仍有意義的一點','找出一項你能主動調整的限制'] },
  { id:'w-practice', topic:'work', values:['成長','安定'], title:'把注意力帶回練習', summary:'穩定的能力來自反覆實踐，不必每一次都證明自己。把目標縮小到可練習的行動，失誤便能成為資料。', question:'若今天只練好一件事，而不是證明自己，你會選哪一件？', source:'亞里斯多德《尼各馬科倫理學》的習慣與實踐概念', actions:['選一項技能練習二十分鐘','向一位同事詢問具體回饋','記下一個失誤帶來的資訊'] },
  { id:'w-time', topic:'work', values:['自由','安定'], title:'時間也在替你作答', summary:'把所有時間交給工作，本身就是一種選擇。有限不是缺陷，而是幫助我們辨認真正重要之事的邊界。', question:'如果你的時間真的有限，現在最值得保留的是什麼？', source:'斯多葛「記得生命有限」的思想脈絡', actions:['取消一件低價值待辦','為重要的人或事預留三十分鐘','寫下今天可以安心不做的一件事'] },

  { id:'c-ambiguity', topic:'choices', values:['自由','勇氣'], title:'自由總伴隨不確定', summary:'沒有完整資訊仍要選擇，是自由令人不安的部分。成熟不是消除所有不確定，而是願意為有限資訊下的選擇負責。', question:'哪個不確定是你可以帶著前進，而不必先消除的？', source:'西蒙・波娃《模稜兩可的倫理學》的自由與不確定概念', actions:['為一個選項做最小可逆測試','訂出再次評估的日期','寫下你願意承擔的一項代價'] },
  { id:'c-control', topic:'choices', values:['安定','勇氣'], title:'先處理今天能決定的部分', summary:'未來有許多變數，但今天的下一步通常更小。把問題分成能控制、能影響與只能接受，方向會清楚一些。', question:'這件事裡，今天真正由你決定的是哪一小部分？', source:'斯多葛學派的控制二分法之現代轉譯', actions:['畫出控制、影響、接受三欄','只蒐集一項關鍵資訊','替最擔心的結果準備一個備案'] },
  { id:'c-way', topic:'choices', values:['安定','自由'], title:'不勉強一次解完人生', summary:'有些方向要在行動中才會顯現。少一點強求確定，多觀察現實的回應，可能比困在腦中更接近答案。', question:'如果先走一小段再決定，你願意用什麼方式試走？', source:'老子《道德經》的無為與順勢概念轉譯', actions:['安排一次低成本體驗','和正在走那條路的人談二十分鐘','把決定縮成七天實驗'] },
  { id:'c-values', topic:'choices', values:['意義','誠實'], title:'選擇也在塑造你', summary:'我們不只是在挑選結果，也在每次決定中形成自己。比起猜哪條路絕對正確，可以看哪條路較符合願意承擔的價值。', question:'哪個選項更接近你願意成為的人，即使它並不完美？', source:'齊克果存在哲學中的選擇與自我概念', actions:['替每個選項寫下一項想守住的價值','刪去只為迎合他人的一個理由','用一句話說明你願意為何承擔代價'] }
];

export const books = [
  { topic:'boundaries', title:'Set Boundaries, Find Peace', author:'Nedra Glover Tawwab', reason:'以實際情境整理界線、需求與清楚表達，適合想練習拒絕與協商的人。' },
  { topic:'boundaries', title:'The Art of Loving', author:'Erich Fromm', reason:'從關懷、責任與尊重思考成熟關係，適合重新理解付出與自我照顧。' },
  { topic:'boundaries', title:'The Courage to Be Disliked', author:'Ichiro Kishimi、Fumitake Koga', reason:'以對話形式討論他人評價與課題分離，適合容易因眼光而勉強自己的人。' },
  { topic:'work', title:"Man's Search for Meaning", author:'Viktor E. Frankl', reason:'探討人在限制中如何回應並尋找意義，適合重新思考工作與人生價值。' },
  { topic:'work', title:'Designing Your Life', author:'Bill Burnett、Dave Evans', reason:'把生涯視為可反覆測試的設計問題，適合想用小實驗探索下一步的人。' },
  { topic:'work', title:'Four Thousand Weeks', author:'Oliver Burkeman', reason:'從時間有限重新檢視效率與選擇，適合被待辦清單壓得喘不過氣的人。' },
  { topic:'choices', title:'Meditations', author:'Marcus Aurelius', reason:'以斯多葛觀點練習分辨可控與不可控，適合面對變動與不確定。' },
  { topic:'choices', title:'The Paradox of Choice', author:'Barry Schwartz', reason:'理解選項過多如何增加焦慮，適合總想找到唯一正確答案的人。' },
  { topic:'choices', title:'The Ethics of Ambiguity', author:'Simone de Beauvoir', reason:'直面自由、責任與不完整資訊，適合希望深入思考選擇的人。' }
];
