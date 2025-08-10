
// ------------------------------------------------------
// 1) スムーススクロール（アンカー移動）
// ------------------------------------------------------
function smooth(id) {
    const el = document.querySelector(id);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
}

// ------------------------------------------------------
// 2) モバイルメニューの開閉（ARIA属性を更新）
// ------------------------------------------------------
const hamburger = document.getElementById('hamburger');
const mobi = document.getElementById('mobi');
hamburger?.addEventListener('click', () => {
    const opened = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!opened));
    if (opened) {
    mobi.hidden = true;
    mobi.style.display = 'none';
    } else {
    mobi.hidden = false;
    mobi.style.display = 'block';
    }
});

// ------------------------------------------------------
// 3) チップ（カテゴリフィルタ）
//    - data-tags をもつ .card の表示/非表示を切替
// ------------------------------------------------------
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.card');

chips.forEach(chip => {
    chip.addEventListener('click', () => {
    // まずすべてのチップを未選択に
    chips.forEach(c => c.setAttribute('aria-pressed', 'false'));
    // クリックされたチップのみ選択
    chip.setAttribute('aria-pressed', 'true');

    const key = chip.dataset.filter;
    cards.forEach(card => {
        if (key === 'all') {
        card.style.display = '';
        } else {
        const tag = card.dataset.tags || '';
        card.style.display = tag.includes(key) ? '' : 'none';
        }
    });
    });
});

// ------------------------------------------------------
// 4) クイックビュー（超簡易モーダル）
//    - 本格的にはdialog要素やARIA実装を追加。
// ------------------------------------------------------
document.querySelectorAll('[data-quick]').forEach(btn => {
    btn.addEventListener('click', (e) => {
    const card = e.currentTarget.closest('.card');
    const title = card.querySelector('.title')?.textContent || 'Item';
    const imgSrc = card.querySelector('img')?.src;
    openModal(title, imgSrc);
    });
});

function openModal(title, img) {
    const wrap = document.createElement('div');
    wrap.style.position = 'fixed';
    wrap.style.inset = '0';
    wrap.style.background = 'rgba(0,0,0,.5)';
    wrap.style.display = 'grid';
    wrap.style.placeItems = 'center';
    wrap.style.zIndex = '50';

    const modal = document.createElement('div');
    modal.style.width = 'min(860px, 92vw)';
    modal.style.background = 'var(--panel)';
    modal.style.border = '1px solid var(--line)';
    modal.style.borderRadius = '20px';
    modal.style.overflow = 'hidden';
    modal.style.boxShadow = 'var(--shadow)';

    // モーダル内部は2カラムのグリッド
    modal.innerHTML = `
    <div style="display:grid; grid-template-columns: 1.2fr .8fr; min-height: 360px;">
        <div style="background:#000;">
        <img src="${img}" alt="${title}" style="width:100%; height:100%; object-fit:cover;"/>
        </div>
        <div style="padding:24px; display:grid; align-content:start; gap:12px;">
        <h3 style="margin:0;">${title}</h3>
        <p style="color:var(--sub-ink); margin:0;">質感を活かす構築的なシルエット。韓国ECライクな最小の装飾。</p>
        <div style="font-weight:700;">¥ —</div>
        <div style="display:grid; grid-auto-flow:column; gap:10px; width:max-content;">
            <button class="btn">お気に入り</button>
            <button class="btn primary">장바구니</button>
        </div>
        <button id="closeModal" class="btn" style="margin-top: auto;">閉じる</button>
        </div>
    </div>`;

    wrap.appendChild(modal);
    document.body.appendChild(wrap);

    wrap.addEventListener('click', (ev) => {
    // 背景クリックで閉じる（モーダル本体クリックは閉じない）
    if (ev.target === wrap) document.body.removeChild(wrap);
    });
    modal.querySelector('#closeModal')?.addEventListener('click', () => {
    document.body.removeChild(wrap);
    });
}


