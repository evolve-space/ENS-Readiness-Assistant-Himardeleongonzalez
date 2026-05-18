// ENS Readiness Assistant — app.js
// Autor: Himar de León González
// LinkedIn: linkedin.com/in/himar-de-leon-gonzalez

const CONTROLS = [
  { name: 'c1', ref: 'op.pl.1', label: 'Política de Seguridad', priority: 'alta', rec: 'Elaborar y aprobar formalmente la Política de Seguridad de la Información. Debe ser aprobada por la dirección y comunicada a todo el personal. Plazo recomendado: 1 mes.' },
  { name: 'c2', ref: 'org.1',   label: 'Roles ENS definidos',   priority: 'alta', rec: 'Designar formalmente los cuatro roles ENS: Responsable de Información, Responsable del Servicio, Responsable de Seguridad y Responsable del Sistema. El Responsable de Seguridad debe ser distinto del Responsable del Sistema. Plazo: 2 semanas.' },
  { name: 'c3', ref: 'op.pl.2', label: 'Análisis de riesgos',   priority: 'alta', rec: 'Realizar un análisis de riesgos formal siguiendo la metodología MAGERIT v3. Identificar activos, amenazas, vulnerabilidades e impacto. Plazo recomendado: 2-3 meses.' },
  { name: 'c4', ref: 'op.acc.1', label: 'Control de acceso',    priority: 'alta', rec: 'Implementar control de acceso basado en mínimo privilegio. Para categoría Media y Alta, aplicar autenticación multifactor (MFA) en accesos remotos. Plazo: 1-2 meses.' },
  { name: 'c5', ref: 'op.exp.7', label: 'Gestión de incidentes', priority: 'media', rec: 'Documentar y aprobar el procedimiento de gestión de incidentes de seguridad. Incluir obligación de notificación al CCN-CERT para incidentes significativos. Plazo: 1 mes.' },
  { name: 'c6', ref: 'op.con.3', label: 'Copias de seguridad',  priority: 'media', rec: 'Definir y documentar la política de copias de seguridad. Establecer frecuencia (diaria incremental, semanal completa), ubicación offsite y procedimiento de restauración probado. Plazo: 2-4 semanas.' },
  { name: 'c7', ref: 'mp.per.3', label: 'Formación y concienciación', priority: 'media', rec: 'Implementar programa de formación anual obligatoria en seguridad de la información para todo el personal. Incluir simulacros de phishing trimestrales. Plazo: 2 meses.' },
  { name: 'c8', ref: 'op.exp.8', label: 'Registro de actividad (logs)', priority: 'media', rec: 'Implementar sistema de logs centralizado con retención mínima de 6 meses. Revisar logs periódicamente y generar alertas automáticas ante eventos sospechosos. Plazo: 1-2 meses.' },
  { name: 'c9', ref: 'mp.if.1',  label: 'Seguridad física',     priority: 'baja', rec: 'Implementar control de acceso físico a las instalaciones donde se alojan los sistemas. Registrar todas las visitas y accesos al CPD. Plazo: 1-3 meses según infraestructura.' },
  { name: 'c10', ref: 'op.con.2', label: 'Continuidad de negocio', priority: 'baja', rec: 'Elaborar un Plan de Continuidad de Negocio (BCP) con RTO y RPO definidos según la dimensión de disponibilidad del sistema. Realizar pruebas semestrales. Plazo: 3-6 meses.' },
];

function goToStep(stepId) {
  document.querySelectorAll('.step').forEach(s => {
    s.classList.remove('active');
    s.classList.add('hidden');
  });
  const target = document.getElementById(stepId);
  target.classList.remove('hidden');
  target.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validateOrgAndNext() {
  const name = document.getElementById('org-name').value.trim();
  const type = document.querySelector('input[name="org-type"]:checked');
  const sector = document.getElementById('org-sector').value;

  if (!name) { alert('Por favor introduce el nombre de la organización.'); return; }
  if (!type) { alert('Por favor selecciona el tipo de organización.'); return; }
  if (!sector) { alert('Por favor selecciona el sector de actividad.'); return; }

  goToStep('step-systems');
}

function determineENSApplies() {
  const type = document.querySelector('input[name="org-type"]:checked')?.value;
  if (!type) return { applies: false, reason: 'Tipo de organización no determinado.' };

  if (type === 'privada') {
    return { applies: false, reason: 'Las empresas privadas sin relación con la Administración Pública no están obligadas por el ENS. Sin embargo, pueden certificarse voluntariamente en ISO 27001.' };
  }
  if (type === 'aapp') {
    return { applies: true, reason: 'Las Administraciones Públicas están directamente obligadas por el ENS según el Art. 2 del RD 311/2022.' };
  }
  if (type === 'proveedor') {
    return { applies: true, reason: 'Las empresas privadas que prestan servicios o soluciones tecnológicas a la Administración Pública están obligadas a cumplir el ENS en los sistemas implicados en dicha prestación (Art. 2.2 RD 311/2022).' };
  }
  if (type === 'universidad') {
    return { applies: true, reason: 'Las universidades públicas están incluidas en el ámbito de aplicación del ENS como parte del sector público.' };
  }
  return { applies: false, reason: 'No determinado.' };
}

function determineCategory() {
  const disponibilidad = document.querySelector('input[name="disponibilidad"]:checked')?.value || 'bajo';
  const confidencialidad = document.querySelector('input[name="confidencialidad"]:checked')?.value || 'bajo';
  const infoTypes = [...document.querySelectorAll('input[name="info-type"]:checked')].map(i => i.value);

  const hasHighRiskInfo = infoTypes.some(t => ['salud', 'judicial', 'critica'].includes(t));

  if (disponibilidad === 'alto' || confidencialidad === 'alto' || hasHighRiskInfo) {
    return { category: 'Alta', color: 'cat-alta', desc: 'Un incidente tendría consecuencias muy graves o catastróficas para los servicios o la información gestionada.' };
  }
  if (disponibilidad === 'medio' || confidencialidad === 'medio' || infoTypes.includes('ciudadanos') || infoTypes.includes('fiscal')) {
    return { category: 'Media', color: 'cat-media', desc: 'Un incidente tendría consecuencias graves para la organización o los ciudadanos afectados.' };
  }
  return { category: 'Básica', color: 'cat-basica', desc: 'Un incidente tendría consecuencias limitadas para la organización o los ciudadanos.' };
}

function getControlStatus(name) {
  return document.querySelector(`input[name="${name}"]:checked`)?.value || 'no';
}

function calculateCompliance() {
  let total = CONTROLS.length;
  let score = 0;
  CONTROLS.forEach(c => {
    const status = getControlStatus(c.name);
    if (status === 'si') score += 1;
    else if (status === 'parcial') score += 0.5;
  });
  return Math.round((score / total) * 100);
}

function getGaps() {
  return CONTROLS.filter(c => {
    const status = getControlStatus(c.name);
    return status === 'no' || status === 'parcial';
  });
}

function generateReport() {
  const orgName = document.getElementById('org-name').value || 'Tu organización';
  const ensResult = determineENSApplies();
  const categoryResult = determineCategory();
  const compliance = calculateCompliance();
  const gaps = getGaps();
  const date = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

  const progressColor = compliance >= 75 ? '#2E7D32' : compliance >= 40 ? '#E65100' : '#C62828';

  let html = '';

  // ENS aplica o no
  if (ensResult.applies) {
    html += `<div class="result-ens-applies">
      <div class="result-icon" aria-hidden="true"><i class="ti ti-shield-check"></i></div>
      <div class="result-applies-text">
        <h3>El ENS aplica a ${orgName}</h3>
        <p>${ensResult.reason}</p>
      </div>
    </div>`;
  } else {
    html += `<div class="result-ens-no">
      <div class="result-icon" aria-hidden="true"><i class="ti ti-shield-x"></i></div>
      <div class="result-no-text">
        <h3>El ENS no aplica directamente a ${orgName}</h3>
        <p>${ensResult.reason}</p>
      </div>
    </div>`;
  }

  // Grid de resultados
  html += `<div class="result-grid">
    <div class="result-card">
      <h3>Categoría del sistema</h3>
      <span class="category-badge ${categoryResult.color}">${categoryResult.category}</span>
      <p style="font-size:12px;color:var(--text-secondary);margin-top:8px">${categoryResult.desc}</p>
    </div>
    <div class="result-card">
      <h3>Nivel de cumplimiento actual</h3>
      <div class="progress-bar"><div class="progress-fill" style="width:${compliance}%;background:${progressColor}"></div></div>
      <div class="progress-label"><strong>${compliance}%</strong> de controles evaluados implementados</div>
    </div>
  </div>`;

  // Gaps
  if (gaps.length > 0) {
    html += `<div class="gaps-section"><h3><i class="ti ti-alert-triangle" aria-hidden="true"></i> Brechas identificadas (${gaps.length})</h3>`;
    gaps.forEach(gap => {
      const status = getControlStatus(gap.name);
      html += `<div class="gap-item">
        <div class="gap-priority p-${gap.priority}" title="Prioridad ${gap.priority}">${gap.priority === 'alta' ? 'A' : gap.priority === 'media' ? 'M' : 'B'}</div>
        <div class="gap-info">
          <h4>${gap.label} <span class="gap-ref">${gap.ref}</span></h4>
          <p>${status === 'parcial' ? '⚠️ Implementado parcialmente — requiere completar' : '❌ No implementado — acción requerida'}</p>
        </div>
      </div>`;
    });
    html += `</div>`;
  } else {
    html += `<div class="result-ens-applies" style="margin-bottom:16px">
      <div class="result-icon" aria-hidden="true"><i class="ti ti-trophy"></i></div>
      <div class="result-applies-text"><h3>¡Excelente! Todos los controles evaluados están implementados</h3><p>Continúa con una auditoría formal para la certificación ENS.</p></div>
    </div>`;
  }

  // Recomendaciones
  const highPriorityGaps = gaps.filter(g => g.priority === 'alta');
  const allRecs = [...gaps.filter(g => g.priority === 'alta'), ...gaps.filter(g => g.priority === 'media'), ...gaps.filter(g => g.priority === 'baja')].slice(0, 5);

  if (allRecs.length > 0) {
    html += `<div class="recs-section"><h3><i class="ti ti-bulb" aria-hidden="true"></i> Recomendaciones prioritarias</h3>`;
    allRecs.forEach((rec, i) => {
      html += `<div class="rec-item">
        <div class="rec-num">${i + 1}</div>
        <div class="rec-text"><strong>${rec.label}:</strong> ${rec.rec}</div>
      </div>`;
    });
    html += `</div>`;
  }

  // Footer del informe
  html += `<div style="text-align:center;font-size:11px;color:var(--text-muted);padding:12px;border-top:1px solid var(--border);margin-top:8px">
    Informe generado el ${date} por ENS Readiness Assistant · Autor: Himar de León González ·
    <a href="https://www.linkedin.com/in/himar-de-leon-gonzalez" target="_blank" rel="noopener">LinkedIn</a>
    <br>Basado en el RD 311/2022 y guías CCN-STIC. Herramienta educativa — no sustituye el análisis de un consultor GRC certificado.
  </div>`;

  document.getElementById('result-content').innerHTML = html;
  goToStep('step-result');
}

function printReport() {
  window.print();
}

function resetAll() {
  document.querySelectorAll('input[type=text]').forEach(i => i.value = '');
  document.querySelectorAll('input[type=radio], input[type=checkbox]').forEach(i => i.checked = false);
  document.getElementById('org-sector').selectedIndex = 0;
  document.getElementById('org-employees').selectedIndex = 3;
  document.getElementById('result-content').innerHTML = '';
  goToStep('step-welcome');
}
