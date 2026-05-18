# 🛡️ ENS Readiness Assistant

[![GitHub Pages](https://img.shields.io/badge/demo-GitHub%20Pages-blue)](https://himardlg.github.io/ens-readiness-assistant)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![ENS](https://img.shields.io/badge/normativa-ENS%20RD%20311%2F2022-green)]()
[![GRC](https://img.shields.io/badge/campo-GRC%20%26%20Compliance-orange)]()

> Plataforma GRC para automatizar evaluaciones de adecuación al **Esquema Nacional de Seguridad (RD 311/2022)**.



---

## ¿Qué es?

ENS Readiness Assistant es una herramienta web de GRC que permite a organizaciones del sector público español y sus proveedores tecnológicos evaluar su nivel de adecuación al Esquema Nacional de Seguridad de forma guiada y automatizada.

## Funcionalidades

### 📋 Evaluación guiada en 4 pasos
1. **Datos de la organización** — tipo, sector y tamaño
2. **Sistemas y servicios** — tipo de información y nivel de impacto
3. **Controles actuales** — estado de implementación de los 10 controles clave
4. **Informe de resultados** — análisis completo con recomendaciones

### 📊 Resultados del informe
- ✅ Determinación de si el ENS aplica a la entidad (Art. 2 RD 311/2022)
- 🏷️ Categorización del sistema (Básica / Media / Alta)
- 📈 Nivel de cumplimiento actual en porcentaje
- 🔍 Gap analysis con brechas identificadas por prioridad
- 💡 Recomendaciones prioritarias con plazos estimados
- 🖨️ Exportación a PDF mediante impresión del navegador

## Controles evaluados

| Referencia ENS | Control | Prioridad |
|----------------|---------|-----------|
| op.pl.1 | Política de Seguridad | Alta |
| org.1 | Roles ENS definidos | Alta |
| op.pl.2 | Análisis de riesgos (MAGERIT) | Alta |
| op.acc.1 | Control de acceso | Alta |
| op.exp.7 | Gestión de incidentes | Media |
| op.con.3 | Copias de seguridad | Media |
| mp.per.3 | Formación y concienciación | Media |
| op.exp.8 | Registro de actividad (logs) | Media |
| mp.if.1 | Seguridad física | Baja |
| op.con.2 | Continuidad de negocio | Baja |

## Uso rápido

```bash
git clone https://github.com/himardlg/ens-readiness-assistant.git
cd ens-readiness-assistant
# Abre index.html en tu navegador — no requiere instalación
```

No requiere backend, base de datos ni instalación. Solo HTML, CSS y JavaScript vanilla.

## Arquitectura actual (v1.0 — MVP)

```
ens-readiness-assistant/
├── index.html    # Estructura HTML y flujo de pasos
├── styles.css    # Diseño responsive con dark mode
├── app.js        # Lógica de evaluación y generación de informes
├── README.md     # Documentación
└── LICENSE       # Licencia MIT
```

## Roadmap — próximas versiones

### v1.1 — Mejoras inmediatas
- [ ] Ampliar a 30+ controles ENS completos
- [ ] Añadir más tipos de organizaciones
- [ ] Exportación a PDF mejorada

### v1.2 — Integración IA
- [ ] Chat IA para resolver dudas durante la evaluación
- [ ] Análisis de brechas con recomendaciones IA personalizadas
- [ ] Integración con API Claude

### v2.0 — Arquitectura completa
- [ ] Backend FastAPI + Python
- [ ] Base de datos PostgreSQL para persistencia
- [ ] Dashboard de madurez y evolución temporal
- [ ] Gestión de evidencias de cumplimiento
- [ ] Múltiples usuarios y organizaciones
- [ ] Docker + GitHub Actions CI/CD

## Despliegue en GitHub Pages

1. Sube el repositorio a GitHub (público)
2. Settings → Pages → Source: main → / (root)
3. En 2 minutos disponible en `https://TU-USUARIO.github.io/ens-readiness-assistant`

## Marco normativo

- **RD 311/2022** — [BOE](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2022-7191)
- **Portal ENS** — [ens.ccn.cni.es](https://ens.ccn.cni.es)
- **Guías CCN-STIC** — [ccn-cert.cni.es](https://www.ccn-cert.cni.es/es/guias/guias-series-ccn-stic.html)
- **Guía AMETIC** — [ametic.es](https://ametic.es/wp-content/uploads/2022/07/guia_ENS_AMETIC.pdf)

## Autor

**Himar de León González**
Cybersecurity Junior · GRC & Compliance

- 🔗 [LinkedIn](https://www.linkedin.com/in/himar-de-leon-gonzalez)
- 🎯 HackTheBox: Pelu0x

## Licencia

MIT License — ver [LICENSE](LICENSE) para más detalles.

---

*Herramienta educativa basada en el RD 311/2022. No sustituye el análisis profesional de un consultor GRC certificado.*
