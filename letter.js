const confessionParts = [
    "Hai Haiii …",
    "Sebenernya ini hal yang mau aku sampaikan dari kemarin sihh pas ultah. Entah kenapa rasanya kayak ada yang ngegantung aja kalau ga di bilang. Mungkin kamu sudah sempat nebak, atau mungkin aku yang kepedean, bisa jadi dua-duanya sih hahaha.",
    "Jadi gini… aku juga nggak tau persis kapan mulai tertarik sama kamu. Yang aku tau, kamu itu tipe orang yang nggak gampang dideketin atau ga mungkin di milikin laaa, at least itu kesan pertama yang aku lihat. Dan jujur, dari sisi aku sendiri, aku juga bingung banget. Di bilang suka ilang iyaaa, fast respond juga enggak sih, curhat hmm siapapun bisa jadi tempat curhat, ya mungkin emang kamu ramah ke semua orang sihh.",
    "Tapi mau bilang aja aku suka sosok Gisel yang cantik dan lucu itu. Hmmm kalau di tanya harapannya apa dari confess, apakah menuju pacarana enggak juga sihh wkwkw mau confess aja. [titik] oh sama mau tau aja sih aslinya gimana walau ga terlalu berharap sebenernya.",
    "Ketimbang ga bilang sama sekali y ages yaa. Btw apapun responnya aku terima sih kalau jadi akward ya sudahh kalau tetap kayak biasa puji Tuhan. Aku tau kamu orangnya suka nggak enakan, tapi beneran nggak apa-apa serius. Aku tetap terbuka kalau kamu mau chat, cerita, atau apa pun. Yaaa paling aneh awalnya, ni kek aku pasrah banget yaa wkwkw gapapa laaa.",
    "Okayyy udah sih itu ajaaa tataa"
];

let currentIndex = -1;

const heroStatusText = [
    "klik tombol di bawah buat mulai baca curhatannya",
    "kalo deg-degan dikit gapapa kok, lanjutin aja",
    "thanks udah baca sampai sini ya",
    "tinggal sedikit lagi ceritanya",
    "udah mau selesai nih, siap-siap ya",
    "makasiiiii udah nyimak semuanya 💛"
];

document.addEventListener('DOMContentLoaded', () => {
    const partContent = document.getElementById('partContent');
    const revealBtn = document.getElementById('revealBtn');
    const resetBtn = document.getElementById('resetBtn');
    const currentPartEl = document.getElementById('currentPart');
    const totalPartsEl = document.getElementById('totalParts');
    const heroLead = document.querySelector('[data-progress-status]');
    const progressDots = document.getElementById('progressDots');

    totalPartsEl.textContent = confessionParts.length;
    buildProgressDots(progressDots);
    updateHeroLead(heroLead);

    revealBtn.addEventListener('click', () => {
        revealNextPart(partContent, heroLead, currentPartEl, revealBtn, resetBtn, progressDots);
    });

    resetBtn.addEventListener('click', () => {
        resetStory(partContent, heroLead, currentPartEl, revealBtn, resetBtn, progressDots);
    });
});

function buildProgressDots(container) {
    container.innerHTML = '';
    confessionParts.forEach(() => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'progress-dot';
        dot.disabled = true;
        container.appendChild(dot);
    });
}

function revealNextPart(content, heroLead, currentPartEl, button, resetBtn, progressDots) {
    if (currentIndex >= confessionParts.length - 1) {
        return;
    }

    currentIndex += 1;
    removePlaceholder(content);

    const paragraph = document.createElement('p');
    paragraph.textContent = confessionParts[currentIndex];
    paragraph.className = 'confession-line';
    content.appendChild(paragraph);

    requestAnimationFrame(() => {
        paragraph.classList.add('show');
    });

    content.scrollTo({ top: content.scrollHeight, behavior: 'smooth' });
    updateState(heroLead, currentPartEl, button, resetBtn, progressDots);
}

function resetStory(content, heroLead, currentPartEl, button, resetBtn, progressDots) {
    content.innerHTML = '<p class="placeholder">Klik tombol di bawah untuk mulai baca pelan-pelan 💌</p>';
    currentIndex = -1;
    updateState(heroLead, currentPartEl, button, resetBtn, progressDots);
}

function removePlaceholder(content) {
    const placeholder = content.querySelector('.placeholder');
    if (placeholder) {
        placeholder.remove();
    }
}

function updateState(heroLead, currentPartEl, button, resetBtn, progressDots) {
    currentPartEl.textContent = Math.max(currentIndex + 1, 0);
    updateHeroLead(heroLead);
    updateButtonState(button);
    toggleReset(currentIndex, resetBtn);
    updateDots(progressDots);
}

function updateHeroLead(heroLead) {
    const index = Math.min(Math.max(currentIndex + 1, 0), heroStatusText.length - 1);
    heroLead.textContent = heroStatusText[index];
}

function updateButtonState(button) {
    if (currentIndex < 0) {
        button.querySelector('.btn-label').textContent = 'Mulai Baca';
        button.disabled = false;
        return;
    }

    if (currentIndex >= confessionParts.length - 1) {
        button.querySelector('.btn-label').textContent = 'Udah semua 💐';
        button.disabled = true;
    } else {
        button.querySelector('.btn-label').textContent = 'Lanjut lagi';
        button.disabled = false;
    }
}

function toggleReset(index, resetBtn) {
    if (index >= 0) {
        resetBtn.hidden = false;
    } else {
        resetBtn.hidden = true;
    }
}

function updateDots(progressDots) {
    const dots = progressDots.querySelectorAll('button');
    dots.forEach((dot, idx) => {
        dot.classList.toggle('is-active', idx === currentIndex);
    });
}
