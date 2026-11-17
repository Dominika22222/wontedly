const colorSwatches = {
  Red: '#f16c5b',
  Yellow: '#e6bf52',
  Green: '#82ae79',
  Blue: '#79a7cf'
};

const resultSection = document.getElementById('finder-result');
const resultObserver = new MutationObserver(() => {
  if (!resultSection.classList.contains('hidden')) renderMainColor();
});
resultObserver.observe(resultSection, { attributes: true, attributeFilter: ['class'] });

function renderMainColor() {
  const scoreRows = [...document.querySelectorAll('#score-list .score-row')];
  if (!scoreRows.length) return;

  const ranked = scoreRows.map(row => {
    const name = row.querySelector('.score-label strong')?.textContent.trim();
    const score = Number(row.querySelector('.score-number')?.textContent.split('/')[0].trim());
    const trait = row.querySelector('.score-label span')?.textContent.trim();
    return { name, score, trait, row };
  }).filter(item => item.name && Number.isFinite(item.score));
  if (!ranked.length) return;

  const highestScore = Math.max(...ranked.map(item => item.score));
  const leaders = ranked.filter(item => item.score === highestScore);
  const primaryColor = colorSwatches[leaders[0].name] || '#b84438';
  resultSection.style.setProperty('--result-color', primaryColor);

  let highlight = document.getElementById('main-color-highlight');
  if (!highlight) {
    highlight = document.createElement('div');
    highlight.id = 'main-color-highlight';
    highlight.className = 'main-color-highlight';
    resultSection.querySelector('.section-num').after(highlight);
  }

  const isBlend = leaders.length > 1;
  const heading = leaders.map(item => item.name).join(' + ');
  const traits = leaders.map(item => item.trait).join(' · ');
  highlight.innerHTML = `<span class="main-color-kicker">${isBlend ? 'YOUR LEADING COLORS' : 'YOUR MAIN COLOR'}</span><strong class="main-color-name">${heading}</strong><span class="main-color-trait">${traits}</span>`;
  resultSection.classList.toggle('has-color-blend', isBlend);

  const resultHeading = document.getElementById('result-heading');
  resultHeading.style.color = primaryColor;
  ranked.forEach(item => item.row.classList.toggle('is-leading-color', item.score === highestScore));
}
