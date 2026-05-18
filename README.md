¿Qué es?
ENS Readiness Assistant es una herramienta web de GRC que permite a organizaciones del sector público español y sus proveedores tecnológicos evaluar su nivel de adecuación al Esquema Nacional de Seguridad de forma guiada y automatizada.
Funcionalidades
📋 Evaluación guiada en 4 pasos

Datos de la organización — tipo, sector y tamaño
Sistemas y servicios — tipo de información y nivel de impacto
Controles actuales — estado de implementación de los 10 controles clave
Informe de resultados — análisis completo con recomendaciones

📊 Resultados del informe

✅ Determinación de si el ENS aplica a la entidad (Art. 2 RD 311/2022)
🏷️ Categorización del sistema (Básica / Media / Alta)
📈 Nivel de cumplimiento actual en porcentaje
🔍 Gap analysis con brechas identificadas por prioridad
💡 Recomendaciones prioritarias con plazos estimados
🖨️ Exportación a PDF mediante impresión del navegador

Controles evaluados
Referencia ENSControlPrioridadop.pl.1Política de SeguridadAltaorg.1Roles ENS definidosAltaop.pl.2Análisis de riesgos (MAGERIT)Altaop.acc.1Control de accesoAltaop.exp.7Gestión de incidentesMediaop.con.3Copias de seguridadMediamp.per.3Formación y concienciaciónMediaop.exp.8Registro de actividad (logs)Mediamp.if.1Seguridad físicaBajaop.con.2Continuidad de negocioBaja
Uso rápido
bashgit clone https://github.com/himardlg/ens-readiness-assistant.git
cd ens-readiness-assistant
# Abre index.html en tu navegador — no requiere instalación
No requiere backend, base de datos ni instalación. Solo HTML, CSS y JavaScript vanilla.
Arquitectura actual (v1.0 — MVP)
ens-readiness-assistant/
├── index.html    # Estructura HTML y flujo de pasos
├── styles.css    # Diseño responsive con dark mode
├── app.js        # Lógica de evaluación y generación de informes
├── README.md     # Documentación
└── LICENSE       # Licencia MIT
Roadmap — próximas versiones
v1.1 — Mejoras inmediatas

 Ampliar a 30+ controles ENS completos
 Añadir más tipos de organizaciones
 Exportación a PDF mejorada

v1.2 — Integración IA

 Chat IA para resolver dudas durante la evaluación
 Análisis de brechas con recomendaciones IA personalizadas
 Integración con API Claude

v2.0 — Arquitectura completa

 Backend FastAPI + Python
 Base de datos PostgreSQL para persistencia
 Dashboard de madurez y evolución temporal
 Gestión de evidencias de cumplimiento
 Múltiples usuarios y organizaciones
 Docker + GitHub Actions CI/CD

Despliegue en GitHub Pages

Sube el repositorio a GitHub (público)
Settings → Pages → Source: main → / (root)
En 2 minutos disponible en https://TU-USUARIO.github.io/ens-readiness-assistant

Marco normativo

RD 311/2022 — BOE
Portal ENS — ens.ccn.cni.es
Guías CCN-STIC — ccn-cert.cni.es
Guía AMETIC — ametic.es

Autor
Himar de León González
Cybersecurity Junior · GRC & Compliance

🎯 HackTheBox: Pelu0x

Licencia
MIT License — ver LICENSE para más detalles.

Herramienta educativa basada en el RD 311/2022. No sustituye el análisis profesional de un consultor GRC certificado.
