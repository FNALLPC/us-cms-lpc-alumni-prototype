// Shared helpers & card renderer used by index.html and card-examples.html

function escapeHtml(s) {
  return (s || '').replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]));
}

function capitalize(s) {
  return (s || '').charAt(0).toUpperCase() + (s || '').slice(1);
}

function monthYear(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${mm}/${yyyy}`;
}

function personCard(p) {
  const el = document.createElement('div');
  el.className = 'person';
  el.innerHTML = `
    <h4>${escapeHtml(p.name)}</h4>
    <div class="meta">💼 ${escapeHtml(p.role || '')} at ${escapeHtml(p.org || '')}</div>
    <div class="meta">📍 ${escapeHtml(p.location || '')}</div>
    <div class="tags">
      ${(p.skills || []).slice(0, 8).map(t => `<span class="pill">${escapeHtml(t)}</span>`).join('')}
    </div>
    <div class="tags">
      ${p.linkedin ? `<a class="pill" target="_blank" rel="noopener" href="${encodeURI(p.linkedin)}"><i class="ti ti-brand-linkedin"></i> LinkedIn</a>` : ''}
      ${p.orcid ? `<a class="pill" target="_blank" rel="noopener" href="https://orcid.org/${encodeURIComponent(p.orcid)}"><i class="ti ti-id"></i> ORCID</a>` : ''}
      ${p.contact_ok === 'full' && p.email ? `<a class="pill" href="mailto:${encodeURI(p.email)}"><i class="ti ti-mail"></i> Contact</a>` : ''}
    </div>
    ${p.placement ? `
    <div class="tags">
      <span class="pill">${p.placement.sector === 'industry' ? '🏢' : '🏫'} ${escapeHtml(capitalize(p.placement.sector))}</span>
      <span class="pill">📅 ${escapeHtml(monthYear(p.placement.date))}</span>
    </div>` : ''}
  `;
  return el;
}
