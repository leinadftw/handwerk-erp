import { useState, useEffect } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  dark:  { base:"#0d1410", surface:"#16211a", card:"#1e2b22", border:"#2c3a30", text:"#f0f4f0", muted:"#8fa898" },
  light: { base:"#f0f4f0", surface:"#ffffff", card:"#f5f8f5", border:"#e0e8e2", text:"#111c16", muted:"#5a7060" },
  accent:"#1a6b3c", success:"#16a34a", warning:"#d97706", danger:"#dc2626",
  shadow:"0 2px 8px rgba(26,107,60,.08)",
};

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Ic = ({ p, s=20, sw=1.8, fill="none" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
    strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {[].concat(p).map((d,i)=><path key={i} d={d}/>)}
  </svg>
);
const I = {
  menu:   <Ic p={["M3 6h18","M3 12h18","M3 18h18"]}/>,
  close:  <Ic p={["M18 6L6 18","M6 6l12 12"]} s={22}/>,
  home:   <Ic p={["M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z","M9 22V12h6v10"]}/>,
  folder: <Ic p="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>,
  check:  <Ic p={["M9 11l3 3L22 4","M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"]}/>,
  cal:    <Ic p={["M8 2v4M16 2v4M3 10h18","M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"]}/>,
  clock:  <Ic p={["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z","M12 7v5l3 3"]}/>,
  users:  <Ic p={["M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2","M9 3a4 4 0 100 8 4 4 0 000-8z","M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"]}/>,
  euro:   <Ic p={["M4 10h12","M4 14h9","M19.5 6.5A7.5 7.5 0 1119.5 17.5"]}/>,
  gear:   <Ic p={["M12 15a3 3 0 100-6 3 3 0 000 6z","M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"]}/>,
  bell:   <Ic p={["M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 01-3.46 0"]}/>,
  sun:    <Ic p={["M12 7a5 5 0 100 10 5 5 0 000-10z","M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"]} s={18}/>,
  moon:   <Ic p="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" s={18}/>,
  plus:   <Ic p={["M12 5v14","M5 12h14"]} sw={2.5} s={18}/>,
  chevR:  <Ic p="M9 18l6-6-6-6" s={16}/>,
  chevD:  <Ic p="M6 9l6 6 6-6" s={16}/>,
  phone:  <Ic p="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>,
  mail:   <Ic p={["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z","M22 6l-10 7L2 6"]}/>,
  map:    <Ic p={["M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z","M12 7a3 3 0 100 6 3 3 0 000-6z"]}/>,
  play:   <Ic p="M5 3l14 9-14 9V3z" s={16} fill="currentColor"/>,
  stop:   <Ic p="M6 6h12v12H6z" s={16} fill="currentColor"/>,
  alert:  <Ic p={["M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z","M12 9v4M12 17h.01"]}/>,
  dl:     <Ic p={["M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4","M7 10l5 5 5-5M12 15V3"]}/>,
  mic:    <Ic p={["M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z","M19 10v2a7 7 0 01-14 0v-2","M12 19v4M8 23h8"]}/>,
  doc:    <Ic p={["M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z","M14 2v6h6","M16 13H8","M16 17H8","M10 9H8"]}/>,
  waren:  <Ic p={["M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z","M3 6h18","M16 10a4 4 0 01-8 0"]}/>,
  termin: <Ic p={["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z","M12 6v6l4 2"]}/>,
  user:   <Ic p={["M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2","M12 3a4 4 0 100 8 4 4 0 000-8z"]}/>,
  msg:    <Ic p="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>,
  x:      <Ic p={["M18 6L6 18","M6 6l12 12"]} s={16}/>,
  edit:   <Ic p={["M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7","M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"]}/>,
  trendU: <Ic p={["M23 6L13.5 15.5 8.5 10.5 1 18","M17 6h6v6"]} s={16}/>,
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const ROLLEN = { KM:"kaufmännisch", GW:"gewerblich", AG:"auftraggeber", EX:"extern" };
const STATUS_LIST = [
  { name:"Planung", color:"#d97706" },
  { name:"Terminiert", color:"#1a6b3c" },
  { name:"In Montage", color:"#0891b2" },
  { name:"Reklamation", color:"#dc2626" },
  { name:"Montage Abgeschlossen", color:"#7c3aed" },
  { name:"Abgeschlossen", color:"#16a34a" },
];
const PROJEKTE = [
  { id:"P-001", nr:"P-2025-001", name:"Küche Müller – Wohnzimmer", kunde:"Familie Müller",
    adresse:"Goethestr. 12, 04109 Leipzig", tel:"+49 341 9876543", mail:"mueller@example.de",
    status:"In Montage", statusColor:"#0891b2", termin:"19.06.2025", gruppe:"KüchenProfi GmbH",
    monteure:["M. Schulz","T. Fischer"],
    ordner:[
      { name:"Zeichnungen", dateien:["Grundriss_EG.pdf","Ansicht_Sued.pdf"] },
      { name:"Kaufvertrag", dateien:["KV_Mueller_2025.pdf"] },
      { name:"Fertigstellung", dateien:[] },
    ],
    kommentare:[
      { autor:"K. Braun", rolle:"kaufmännisch", text:"Liefertermin Gerät auf 22.06 verschoben.", zeit:"vor 2h" },
      { autor:"M. Schulz", rolle:"gewerblich", text:"Wandanschluss vorbereitet.", zeit:"vor 5h" },
    ],
    aufgaben:[{ text:"Typenschild Geschirrspüler fotografieren", erledigt:false, dl:"19.06.2025" }],
  },
  { id:"P-002", nr:"P-2025-002", name:"Küche Schmidt – Neubau EFH", kunde:"Familie Schmidt",
    adresse:"Birkenweg 7, 04229 Leipzig", tel:"+49 341 1234567", mail:"schmidt@example.de",
    status:"Reklamation", statusColor:"#dc2626", termin:"22.06.2025", gruppe:"Schmidt Küchen",
    monteure:["T. Fischer"],
    ordner:[{ name:"Zeichnungen", dateien:["Plan_V2.pdf"] }],
    kommentare:[{ autor:"Schmidt GmbH", rolle:"auftraggeber", text:"Schublade klemmt!", zeit:"vor 1 Tag" }],
    aufgaben:[
      { text:"Servicebesuch vereinbaren", erledigt:false, dl:"20.06.2025" },
      { text:"Ersatzteil bestellen", erledigt:true, dl:"17.06.2025" },
    ],
  },
  { id:"P-003", nr:"P-2025-003", name:"Küche Weber – Altbau", kunde:"M. Weber",
    adresse:"Schillerstr. 3, 04275 Leipzig", tel:"+49 341 5554433", mail:"weber@example.de",
    status:"Planung", statusColor:"#d97706", termin:"28.06.2025", gruppe:"KüchenProfi GmbH",
    monteure:[], ordner:[{ name:"Aufmaß", dateien:["Aufmass_Weber.pdf"] }],
    kommentare:[], aufgaben:[{ text:"Aufmaß-Fotos hochladen", erledigt:false, dl:"22.06.2025" }],
  },
  { id:"P-004", nr:"P-2025-004", name:"Küche Hofmann – Studio", kunde:"Hofmann GmbH",
    adresse:"Industriestr. 44, 04318 Leipzig", tel:"+49 341 8887766", mail:"hofmann@example.de",
    status:"Abgeschlossen", statusColor:"#16a34a", termin:"10.06.2025", gruppe:"Hofmann Küchen",
    monteure:["M. Schulz","T. Fischer"],
    ordner:[{ name:"Fertigstellung", dateien:["Montageprotokoll.pdf","Uebergabe.pdf"] }],
    kommentare:[{ autor:"K. Braun", rolle:"kaufmännisch", text:"Infomail versendet.", zeit:"vor 3 Tagen" }],
    aufgaben:[],
  },
];
const AUFGABEN = [
  { id:1, text:"Servicebesuch Schmidt vereinbaren", pid:"P-002", dl:"20.06.", done:false, wer:"K. Braun" },
  { id:2, text:"Typenschild fotografieren", pid:"P-001", dl:"19.06.", done:false, wer:"M. Schulz" },
  { id:3, text:"Aufmaß-Fotos Weber hochladen", pid:"P-003", dl:"22.06.", done:false, wer:"T. Fischer" },
  { id:4, text:"Ersatzteil bestellen", pid:"P-002", dl:"17.06.", done:true, wer:"K. Braun" },
];
const ZEITEN = [
  { id:1, ma:"M. Schulz", datum:"19.06.", von:"07:00", bis:"16:30", proj:"P-001", std:9 },
  { id:2, ma:"T. Fischer", datum:"19.06.", von:"07:00", bis:"15:00", proj:"P-001", std:7.5 },
  { id:3, ma:"M. Schulz", datum:"18.06.", von:"08:00", bis:"17:00", proj:"P-002", std:8 },
];
const LAGER = [
  { id:1, kat:"Befestigung", artikel:"Arbeitsplattenwinkel", typ:"400x38x26 2mm", bestand:5, min:10 },
  { id:2, kat:"Befestigung", artikel:"Aufhängeschiene", typ:"1000mm kürzbar", bestand:7, min:5 },
  { id:3, kat:"Befestigung", artikel:"Hohlraumanker 1x", typ:"M6 x 63/16-32", bestand:10, min:20 },
  { id:4, kat:"Verbindung", artikel:"Dübel lang", typ:"8x80 Hohlstein", bestand:400, min:100 },
  { id:5, kat:"Verbindung", artikel:"Unterlegscheibe M4", typ:"Da=9mm", bestand:1000, min:200 },
];
const NAV = [
  { id:"dashboard",     label:"Übersicht",    icon:I.home,    rollen:[ROLLEN.KM,ROLLEN.GW,ROLLEN.AG] },
  { id:"projekte",      label:"Projekte",      icon:I.folder,  badge:4, rollen:[ROLLEN.KM,ROLLEN.GW,ROLLEN.AG,ROLLEN.EX] },
  { id:"aufgaben",      label:"Aufgaben",      icon:I.check,   badge:3, rollen:[ROLLEN.KM,ROLLEN.GW,ROLLEN.AG] },
  { id:"kalender",      label:"Kalender",      icon:I.cal,     rollen:[ROLLEN.KM,ROLLEN.GW] },
  { id:"terminanfrage", label:"Terminanfrage", icon:I.termin,  rollen:[ROLLEN.KM,ROLLEN.AG,ROLLEN.EX] },
  { id:"zeiterfassung", label:"Zeiterfassung", icon:I.clock,   rollen:[ROLLEN.KM,ROLLEN.GW] },
  { id:"kunden",        label:"Kunden",        icon:I.users,   rollen:[ROLLEN.KM] },
  { id:"waren",         label:"Lager",         icon:I.waren,   rollen:[ROLLEN.KM] },
  { id:"rechnungen",    label:"Rechnungen",    icon:I.euro,    badge:2, rollen:[ROLLEN.KM] },
  { id:"einstellungen", label:"Einstellungen", icon:I.gear,    rollen:[ROLLEN.KM] },
];
const NUTZER_DEMO = [
  { val:ROLLEN.KM, label:"👔 Kaufmännisch", kuerzel:"KB", name:"K. Braun" },
  { val:ROLLEN.GW, label:"🔧 Monteur",      kuerzel:"MS", name:"M. Schulz" },
  { val:ROLLEN.AG, label:"🏠 Auftraggeber", kuerzel:"KP", name:"KüchenProfi" },
  { val:ROLLEN.EX, label:"👁 Extern",        kuerzel:"EX", name:"Externer" },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function Badge({ txt, color }) {
  return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap"
    style={{ background:color+"22", color }}>
    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:color }}/>
    {txt}
  </span>;
}
function Card({ dark, children, className="" }) {
  const t = dark?T.dark:T.light;
  return <div className={`border ${className}`} style={{ background:t.surface, borderColor:t.border, borderRadius:20, boxShadow:T.shadow }}>{children}</div>;
}
function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
}

// ─── SHARED VIEWS ─────────────────────────────────────────────────────────────
function ProjektDetail({ p, dark, onClose, mobile }) {
  const t = dark?T.dark:T.light;
  const [tab, setTab] = useState("dateien");
  const [aufg, setAufg] = useState(p.aufgaben);
  const [kom, setKom] = useState(p.kommentare);
  const [neuKom, setNeuKom] = useState("");

  const tabs = [["dateien","Dateien"],["kommentare",`Kommentare (${kom.length})`],["aufgaben",`Aufgaben (${aufg.length})`],["protokoll","Protokoll"]];

  const content = (
    <>
      {/* Kontakt */}
      <div className="flex border-b flex-shrink-0" style={{ borderColor:t.border }}>
        {[[I.phone,p.tel,`tel:${p.tel}`],[I.mail,"Mail",`mailto:${p.mail}`],[I.map,"Navigation",`https://maps.google.com/?q=${p.adresse}`]].map(([icon,label,href],i)=>(
          <a key={i} href={href} target="_blank" rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold transition-colors"
            style={{ color:T.accent, borderRight:i<2?`1px solid ${t.border}`:"none" }}>
            {icon} {label}
          </a>
        ))}
      </div>
      {/* Tabs */}
      <div className="flex border-b flex-shrink-0 overflow-x-auto" style={{ borderColor:t.border }}>
        {tabs.map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)}
            className="py-2.5 px-4 text-xs font-semibold border-b-2 whitespace-nowrap"
            style={{ borderColor:tab===id?T.accent:"transparent", color:tab===id?T.accent:t.muted }}>
            {label}
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {tab==="dateien" && p.ordner.map(o=>(
          <Card dark={dark} key={o.name} className="overflow-hidden">
            <div className="px-4 py-3 border-b flex items-center gap-2" style={{ borderColor:t.border }}>
              <span style={{ color:T.warning }}>{I.doc}</span>
              <span className="font-semibold text-sm" style={{ color:t.text }}>{o.name}</span>
              <span className="ml-auto text-xs" style={{ color:t.muted }}>{o.dateien.length} Dateien</span>
            </div>
            {o.dateien.length===0
              ? <p className="px-4 py-3 text-xs italic" style={{ color:t.muted }}>Noch keine Dateien</p>
              : o.dateien.map(d=>(
                <div key={d} className="flex items-center gap-2 px-4 py-2.5 border-t" style={{ borderColor:t.border }}>
                  <span className="text-xs flex-1" style={{ color:t.text }}>{d}</span>
                  <span style={{ color:T.accent }}>{I.dl}</span>
                </div>
              ))}
          </Card>
        ))}
        {tab==="kommentare" && (
          <div className="space-y-3">
            {kom.map((k,i)=>(
              <div key={i} className="rounded-xl p-3" style={{ background:t.card }}>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-xs font-bold" style={{ color:t.text }}>{k.autor}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ background:T.accent+"22", color:T.accent }}>{k.rolle}</span>
                  <span className="ml-auto text-xs" style={{ color:t.muted }}>{k.zeit}</span>
                </div>
                <p className="text-sm" style={{ color:t.text }}>{k.text}</p>
              </div>
            ))}
            <div className="flex gap-2">
              <input value={neuKom} onChange={e=>setNeuKom(e.target.value)} placeholder="Kommentar..."
                className="flex-1 text-sm rounded-xl px-3 py-2.5 border outline-none"
                style={{ background:t.card, borderColor:t.border, color:t.text }}/>
              <button onClick={()=>{ if(neuKom.trim()){ setKom([...kom,{autor:"K. Braun",rolle:"kaufmännisch",text:neuKom,zeit:"gerade eben"}]); setNeuKom(""); }}}
                className="px-4 py-2.5 rounded-xl text-white font-semibold" style={{ background:T.accent }}>{I.msg}</button>
            </div>
          </div>
        )}
        {tab==="aufgaben" && aufg.map((a,i)=>(
          <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl" style={{ background:t.card }}>
            <button onClick={()=>{ const n=[...aufg]; n[i]={...n[i],erledigt:!n[i].erledigt}; setAufg(n); }}
              className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0"
              style={{ background:a.erledigt?T.success:"transparent", borderColor:a.erledigt?T.success:t.muted }}>
              {a.erledigt && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20,6 9,17 4,12"/></svg>}
            </button>
            <span className={`text-sm flex-1 ${a.erledigt?"line-through opacity-40":""}`} style={{ color:t.text }}>{a.text}</span>
            <span className="text-xs font-mono" style={{ color:t.muted }}>{a.dl}</span>
          </div>
        ))}
        {tab==="protokoll" && (
          <div className="space-y-3">
            {[["📋","Montageprotokoll","Abschluss Küchenmontage"],["🔧","Serviceprotokoll","Nachbesserungen & Service"]].map(([em,tit,sub])=>(
              <button key={tit} className="w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left"
                style={{ borderColor:t.border, background:t.card }}>
                <span className="text-2xl">{em}</span>
                <div><p className="font-semibold text-sm" style={{ color:t.text }}>{tit}</p><p className="text-xs" style={{ color:t.muted }}>{sub}</p></div>
                <span className="ml-auto" style={{ color:t.muted }}>{I.chevR}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      {p.status==="Reklamation" && (
        <div className="px-4 py-3 flex-shrink-0 flex items-center gap-2"
          style={{ background:T.danger+"11", borderTop:`2px solid ${T.danger}` }}>
          <span style={{ color:T.danger }}>{I.alert}</span>
          <span className="text-sm font-semibold" style={{ color:T.danger }}>Handlungsbedarf — Reklamation offen</span>
        </div>
      )}
    </>
  );

  if (mobile) return (
    <div className="flex flex-col h-full" style={{ background:t.base }}>
      <div className="flex items-center gap-3 px-4 py-3 border-b flex-shrink-0" style={{ background:t.surface, borderColor:t.border }}>
        <button onClick={onClose} className="p-1.5 rounded-xl" style={{ color:t.muted }}>
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm truncate" style={{ color:t.text }}>{p.name}</p>
          <p className="text-xs font-mono" style={{ color:t.muted }}>{p.nr}</p>
        </div>
        <Badge txt={p.status} color={p.statusColor}/>
      </div>
      {content}
    </div>
  );

  return (
    <div className="border flex flex-col h-full overflow-hidden" style={{ background:t.surface, borderColor:t.border, borderRadius:20, boxShadow:T.shadow }}>
      <div className="p-4 border-b flex items-start justify-between gap-3 flex-shrink-0" style={{ borderColor:t.border }}>
        <div className="flex-1 min-w-0">
          <Badge txt={p.status} color={p.statusColor}/>
          <h2 className="font-bold text-base mt-1.5 leading-tight" style={{ color:t.text }}>{p.name}</h2>
          <p className="text-xs mt-0.5 font-mono" style={{ color:t.muted }}>{p.nr}</p>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg" style={{ color:t.muted }}>{I.x}</button>
      </div>
      {content}
    </div>
  );
}

function ProjekteView({ dark, mobile }) {
  const t = dark?T.dark:T.light;
  const [sel, setSel] = useState(null);
  const [filter, setFilter] = useState("Alle");
  const gefiltert = filter==="Alle"?PROJEKTE:PROJEKTE.filter(p=>p.status===filter);

  if (mobile && sel) return <ProjektDetail p={sel} dark={dark} onClose={()=>setSel(null)} mobile={true}/>;

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden">
      <div className="flex gap-2 overflow-x-auto pb-1 flex-shrink-0">
        {["Alle",...STATUS_LIST.map(s=>s.name)].map(s=>(
          <button key={s} onClick={()=>setFilter(s)}
            className="text-xs px-3 py-2 rounded-xl font-semibold whitespace-nowrap flex-shrink-0"
            style={{ background:filter===s?T.accent:t.card, color:filter===s?"white":t.muted }}>
            {s}
          </button>
        ))}
        {!mobile && (
          <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-semibold flex-shrink-0"
            style={{ background:T.accent }}>{I.plus} Neues Projekt</button>
        )}
      </div>
      <div className={`flex-1 overflow-hidden flex gap-4`}>
        <div className={`overflow-y-auto ${sel&&!mobile?"w-80 flex-shrink-0":"w-full"}`}>
          <div className={`grid gap-3 ${sel&&!mobile?"grid-cols-1":mobile?"grid-cols-1":"grid-cols-1 md:grid-cols-2 xl:grid-cols-3"}`}>
            {gefiltert.map(p=>(
              <div key={p.id} onClick={()=>setSel(sel?.id===p.id?null:p)}
                className="border p-4 cursor-pointer transition-all"
                style={{
                  background:t.surface, borderColor:p.status==="Reklamation"?T.danger:sel?.id===p.id?p.statusColor:t.border,
                  borderRadius:20,
                  boxShadow:p.status==="Reklamation"?`0 0 0 1px ${T.danger}33`:T.shadow,
                }}>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm leading-tight" style={{ color:t.text }}>{p.name}</p>
                    <p className="text-xs mt-0.5 font-mono" style={{ color:t.muted }}>{p.nr}</p>
                  </div>
                  <Badge txt={p.status} color={p.statusColor}/>
                </div>
                <div className="space-y-1">
                  {[[I.user,p.kunde],[I.cal,`Termin: ${p.termin}`]].map(([icon,txt],i)=>(
                    <div key={i} className="flex items-center gap-1.5 text-xs" style={{ color:t.muted }}>
                      <span className="opacity-60">{icon}</span>{txt}
                    </div>
                  ))}
                </div>
                {p.monteure.length>0 && (
                  <div className="flex gap-1 mt-3 flex-wrap">
                    {p.monteure.map(m=><span key={m} className="text-xs px-2 py-0.5 rounded-full" style={{ background:t.card, color:t.muted }}>{m}</span>)}
                  </div>
                )}
                {p.status==="Reklamation" && (
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold" style={{ color:T.danger }}>{I.alert} Handlungsbedarf</div>
                )}
              </div>
            ))}
          </div>
        </div>
        {sel && !mobile && (
          <div className="flex-1 overflow-hidden min-w-0">
            <ProjektDetail p={sel} dark={dark} onClose={()=>setSel(null)} mobile={false}/>
          </div>
        )}
      </div>
    </div>
  );
}

function AufgabenView({ dark }) {
  const t = dark?T.dark:T.light;
  const [aufg, setAufg] = useState(AUFGABEN);
  const [f, setF] = useState("offen");
  const list = f==="alle"?aufg:f==="offen"?aufg.filter(a=>!a.done):aufg.filter(a=>a.done);
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[["alle","Alle"],["offen","Offen"],["erledigt","Erledigt"]].map(([v,l])=>(
          <button key={v} onClick={()=>setF(v)} className="text-xs px-4 py-2 rounded-xl font-semibold"
            style={{ background:f===v?T.accent:t.card, color:f===v?"white":t.muted }}>{l}</button>
        ))}
      </div>
      <div className="space-y-2">
        {list.map((a)=>(
          <div key={a.id} className="flex items-center gap-3 p-4 border"
            style={{ background:t.surface, borderColor:t.border, borderRadius:20, boxShadow:T.shadow }}>
            <button onClick={()=>setAufg(aufg.map(x=>x.id===a.id?{...x,done:!x.done}:x))}
              className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0"
              style={{ background:a.done?T.success:"transparent", borderColor:a.done?T.success:t.muted }}>
              {a.done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20,6 9,17 4,12"/></svg>}
            </button>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${a.done?"line-through opacity-40":""}`} style={{ color:t.text }}>{a.text}</p>
              <p className="text-xs mt-0.5" style={{ color:t.muted }}>{a.pid} · {a.wer}</p>
            </div>
            <span className="text-xs font-mono flex-shrink-0" style={{ color:t.muted }}>{a.dl}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ZeiterfassungView({ dark }) {
  const t = dark?T.dark:T.light;
  const [laufend, setLaufend] = useState(false);
  return (
    <div className="space-y-5">
      <Card dark={dark} className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color:t.muted }}>Heute erfassen</p>
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-4xl font-mono font-bold" style={{ color:t.text }}>{laufend?"07:24:13":"00:00:00"}</span>
          <button onClick={()=>setLaufend(!laufend)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white"
            style={{ background:laufend?T.danger:T.success }}>
            {laufend?<>{I.stop} Stopp</>:<>{I.play} Start</>}
          </button>
          <span className="text-sm" style={{ color:t.muted }}>Projekt: <span className="font-semibold" style={{ color:T.accent }}>P-001 · Müller</span></span>
        </div>
      </Card>
      <div className="border-2 p-4 flex items-center gap-3" style={{ borderColor:"#7c3aed55", background:"#7c3aed11", borderRadius:20 }}>
        <span style={{ color:"#7c3aed" }}>{I.mic}</span>
        <div>
          <p className="text-sm font-semibold" style={{ color:"#a78bfa" }}>🎙 Sprach-Aufmaß (KI)</p>
          <p className="text-xs" style={{ color:"#7c3aed99" }}>Einsprechen → KI trägt automatisch ein. Bald verfügbar.</p>
        </div>
      </div>
      <Card dark={dark} className="overflow-hidden">
        <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor:(dark?T.dark:T.light).border }}>
          <p className="font-semibold text-sm" style={{ color:t.text }}>Zeitübersicht Juni 2025</p>
          <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background:t.card, color:t.muted }}>{I.dl} Export</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr style={{ background:t.card }}>
              {["Mitarbeiter","Datum","Von","Bis","Projekt","Std."].map(h=>(
                <th key={h} className="text-left text-xs font-semibold px-4 py-2.5 uppercase tracking-wide" style={{ color:t.muted }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {ZEITEN.map((z,i)=>(
                <tr key={z.id} style={{ borderTop:i>0?`1px solid ${t.border}`:"none" }}>
                  <td className="px-4 py-3 font-medium" style={{ color:t.text }}>{z.ma}</td>
                  <td className="px-4 py-3" style={{ color:t.muted }}>{z.datum}</td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color:t.text }}>{z.von}</td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color:t.text }}>{z.bis}</td>
                  <td className="px-4 py-3 text-xs" style={{ color:t.muted }}>{z.proj}</td>
                  <td className="px-4 py-3 font-bold" style={{ color:T.accent }}>{z.std}h</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function WarenView({ dark }) {
  const t = dark?T.dark:T.light;
  const [lager, setLager] = useState(LAGER);
  const kats = [...new Set(lager.map(l=>l.kat))];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-sm" style={{ color:t.muted }}>{lager.length} Artikel</p>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background:t.card, color:t.muted }}>{I.dl} Lexware CSV</button>
          <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-white" style={{ background:T.accent }}>{I.edit} Bestand aufnehmen</button>
        </div>
      </div>
      {kats.map(kat=>(
        <Card key={kat} dark={dark} className="overflow-hidden">
          <div className="px-4 py-2.5 text-xs font-bold uppercase tracking-wide border-b" style={{ background:t.card, color:t.muted, borderColor:t.border }}>{kat}</div>
          {lager.filter(l=>l.kat===kat).map((l,i)=>(
            <div key={l.id} className="flex items-center gap-4 px-4 py-3" style={{ borderTop:i>0?`1px solid ${t.border}`:"none" }}>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold" style={{ color:t.text }}>{l.artikel}</p>
                <p className="text-xs" style={{ color:t.muted }}>{l.typ}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={()=>setLager(lager.map(x=>x.id===l.id?{...x,bestand:Math.max(0,x.bestand-1)}:x))}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-lg font-bold" style={{ background:t.card, color:t.muted }}>−</button>
                <span className="w-16 text-center font-mono font-bold text-sm" style={{ color:t.text }}>{l.bestand} Stk</span>
                <button onClick={()=>setLager(lager.map(x=>x.id===l.id?{...x,bestand:x.bestand+1}:x))}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-lg font-bold" style={{ background:t.card, color:t.muted }}>+</button>
              </div>
              {l.bestand<=l.min && <span className="text-xs font-semibold" style={{ color:T.warning }}>{I.alert} Niedrig</span>}
            </div>
          ))}
        </Card>
      ))}
    </div>
  );
}

function OverviewView({ dark, setActive }) {
  const t = dark?T.dark:T.light;
  const rek = PROJEKTE.filter(p=>p.status==="Reklamation").length;
  const kpis = [
    { label:"Aktive Projekte", val:"3", sub:"+1 diese Woche", c:T.accent },
    { label:"Reklamationen",   val:String(rek), sub:"Handlungsbedarf", c:T.danger },
    { label:"Offene Aufgaben", val:"3", sub:"1 heute fällig", c:T.warning },
    { label:"Umsatz Juni",     val:"€18.420", sub:"+12% vs. Mai", c:T.success },
  ];
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold" style={{ color:t.text }}>Guten Morgen, Klaus 👋</h1>
          <p className="text-sm mt-0.5" style={{ color:t.muted }}>Do., 19. Juni 2025</p>
        </div>
        <button onClick={()=>setActive("projekte")} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background:T.accent }}>{I.plus} Projekt</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map(k=>(
          <div key={k.label} className="border p-4" style={{ background:k.c+"11", borderColor:k.c+"33", borderRadius:20 }}>
            <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color:k.c+"cc" }}>{k.label}</p>
            <p className="text-2xl font-bold" style={{ color:k.c }}>{k.val}</p>
            <p className="text-xs mt-0.5" style={{ color:k.c+"88" }}>{k.sub}</p>
          </div>
        ))}
      </div>
      {rek>0 && (
        <div className="border-2 p-4 flex items-start gap-3" style={{ borderColor:T.danger, background:T.danger+"11", borderRadius:20 }}>
          <span style={{ color:T.danger }}>{I.alert}</span>
          <div className="flex-1">
            <p className="font-bold text-sm" style={{ color:T.danger }}>Reklamation offen — sofort handeln</p>
            <p className="text-xs mt-0.5" style={{ color:T.danger+"cc" }}>Küche Schmidt: Schublade klemmt · Servicebesuch noch nicht vereinbart</p>
          </div>
          <button onClick={()=>setActive("projekte")} className="text-xs px-3 py-1.5 rounded-lg text-white font-semibold flex-shrink-0" style={{ background:T.danger }}>Öffnen</button>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card dark={dark} className="lg:col-span-2">
          <div className="px-4 py-3 border-b" style={{ borderColor:(dark?T.dark:T.light).border }}>
            <p className="font-semibold text-sm" style={{ color:t.text }}>Heute auf der Baustelle</p>
          </div>
          <div className="p-4 flex items-center gap-3">
            <div className="w-1 h-14 rounded-full flex-shrink-0" style={{ background:"#0891b2" }}/>
            <div>
              <p className="text-sm font-semibold" style={{ color:t.text }}>Küche Müller</p>
              <p className="text-xs" style={{ color:t.muted }}>M. Schulz, T. Fischer · 07:00 – 16:30 Uhr</p>
            </div>
          </div>
          <div className="px-4 py-3 border-t" style={{ borderColor:(dark?T.dark:T.light).border }}>
            <p className="font-semibold text-sm mb-3" style={{ color:t.text }}>Offene Aufgaben</p>
            {AUFGABEN.filter(a=>!a.done).map((a,i,arr)=>(
              <div key={a.id} className="flex items-center gap-3 py-2" style={{ borderTop:i>0?`1px solid ${t.border}`:"none" }}>
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background:T.warning }}/>
                <span className="text-sm flex-1 truncate" style={{ color:t.text }}>{a.text}</span>
                <span className="text-xs flex-shrink-0 font-mono" style={{ color:t.muted }}>{a.dl}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card dark={dark}>
          <div className="px-4 py-3 border-b" style={{ borderColor:(dark?T.dark:T.light).border }}>
            <p className="font-semibold text-sm" style={{ color:t.text }}>Aktivitäten</p>
          </div>
          <div className="p-4 space-y-3">
            {[
              { dot:T.accent,   text:"Montage Müller gestartet",         zeit:"vor 12 Min." },
              { dot:T.danger,   text:"Reklamation Schmidt eingegangen",   zeit:"vor 1 Std." },
              { dot:T.success,  text:"Auftrag Hofmann abgeschlossen",     zeit:"vor 3 Std." },
              { dot:T.warning,  text:"Lagerbestand Anker niedrig",        zeit:"vor 5 Std." },
            ].map((a,i)=>(
              <div key={i} className="flex gap-3">
                <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background:a.dot }}/>
                <div>
                  <p className="text-sm" style={{ color:t.text }}>{a.text}</p>
                  <p className="text-xs mt-0.5" style={{ color:t.muted }}>{a.zeit}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Placeholder({ dark, label, icon }) {
  const t = dark?T.dark:T.light;
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background:t.card }}>
        <span style={{ color:t.muted }}>{icon}</span>
      </div>
      <p className="font-semibold text-base" style={{ color:t.text }}>{label}</p>
      <p className="text-sm text-center max-w-xs" style={{ color:t.muted }}>Dieses Modul wird als nächstes mit Supabase-Anbindung gebaut.</p>
    </div>
  );
}

// ─── MOBILE LAYOUT ────────────────────────────────────────────────────────────
function MobileApp({ dark, setDark, active, setActive, rolle, setRolle, navVisible, currentId }) {
  const t = dark?T.dark:T.light;
  const [drawer, setDrawer] = useState(false);
  const nutzer = NUTZER_DEMO.find(n=>n.val===rolle);
  const currentItem = navVisible.find(n=>n.id===currentId);
  const main4 = navVisible.slice(0,4);

  const views = {
    dashboard:     <OverviewView dark={dark} setActive={setActive}/>,
    projekte:      <ProjekteView dark={dark} mobile={true}/>,
    aufgaben:      <AufgabenView dark={dark}/>,
    zeiterfassung: <ZeiterfassungView dark={dark}/>,
    waren:         <WarenView dark={dark}/>,
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden" style={{ background:t.base, fontFamily:"'Inter',system-ui,sans-serif" }}>
      <header className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0" style={{ background:t.surface, borderColor:t.border }}>
        <button onClick={()=>setDrawer(true)} className="p-2 rounded-xl" style={{ color:t.muted }}>{I.menu}</button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-white text-xs" style={{ background:T.accent }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><rect x="3" y="3" width="18" height="5" rx="1"/><rect x="3" y="10" width="18" height="5" rx="1"/><rect x="3" y="17" width="18" height="5" rx="1"/></svg>
          </div>
          <div><span className="font-bold text-sm" style={{ color:t.text }}>Küchenmontagen </span><span className="font-bold text-sm" style={{ color:T.accent }}>Gruschwitz</span></div>
        </div>
        <div className="flex items-center gap-1">
          <button className="relative p-2 rounded-xl" style={{ color:t.muted }}>{I.bell}<span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background:T.danger }}/></button>
          <button onClick={()=>setDark(!dark)} className="p-2 rounded-xl" style={{ color:t.muted }}>{dark?I.sun:I.moon}</button>
        </div>
      </header>
      <div className="px-4 py-2 border-b flex-shrink-0" style={{ background:t.surface, borderColor:t.border }}>
        <span className="text-sm font-semibold" style={{ color:t.text }}>{currentItem?.label}</span>
      </div>
      <main className="flex-1 overflow-y-auto p-4">{views[currentId] || <Placeholder dark={dark} label={currentItem?.label} icon={currentItem?.icon}/>}</main>
      <nav className="flex items-center justify-around border-t flex-shrink-0" style={{ background:t.surface, borderColor:t.border }}>
        {main4.map(item=>{
          const isA = currentId===item.id;
          return (
            <button key={item.id} onClick={()=>setActive(item.id)} className="relative flex flex-col items-center gap-1 py-2.5 px-4" style={{ color:isA?T.accent:t.muted }}>
              {item.icon}
              <span className="text-xs font-medium">{item.label}</span>
              {item.badge&&!isA&&<span className="absolute top-1 right-2 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center font-bold" style={{ background:T.accent, fontSize:"10px" }}>{item.badge}</span>}
            </button>
          );
        })}
      </nav>
      {drawer && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={()=>setDrawer(false)}/>
          <div className="relative w-72 max-w-full h-full flex flex-col shadow-2xl" style={{ background:t.surface }}>
            <div className="flex items-center justify-between px-4 py-4 border-b" style={{ borderColor:t.border }}>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white" style={{ background:T.accent }}>G</div>
                <div><p className="text-sm font-bold" style={{ color:t.text }}>Küchenmontagen Gruschwitz</p><p className="text-xs" style={{ color:t.muted }}>Küchenmontagen Gruschwitz</p></div>
              </div>
              <button onClick={()=>setDrawer(false)} style={{ color:t.muted }}>{I.close}</button>
            </div>
            <div className="px-3 py-3 border-b" style={{ borderColor:t.border }}>
              <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color:t.muted }}>Rolle wechseln</p>
              <div className="grid grid-cols-2 gap-1.5">
                {NUTZER_DEMO.map(r=>(
                  <button key={r.val} onClick={()=>{ setRolle(r.val); setActive("dashboard"); setDrawer(false); }}
                    className="text-xs px-2 py-2 rounded-xl font-semibold text-left"
                    style={{ background:rolle===r.val?T.accent+"22":t.card, color:rolle===r.val?T.accent:t.muted, border:`1.5px solid ${rolle===r.val?T.accent:"transparent"}` }}>
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
              {navVisible.map(item=>{
                const isA = currentId===item.id;
                return (
                  <button key={item.id} onClick={()=>{ setActive(item.id); setDrawer(false); }}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left"
                    style={{ background:isA?T.accent:"transparent", color:isA?"white":t.muted }}>
                    {item.icon}<span className="text-sm font-semibold flex-1">{item.label}</span>
                    {item.badge&&<span className="text-xs px-1.5 py-0.5 rounded-full font-bold" style={{ background:isA?"rgba(255,255,255,0.25)":T.accent, color:"white" }}>{item.badge}</span>}
                  </button>
                );
              })}
            </nav>
            <div className="px-4 py-4 border-t" style={{ borderColor:t.border }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-xs" style={{ background:"linear-gradient(135deg,#1a6b3c,#16a34a)" }}>{nutzer?.kuerzel}</div>
                <div><p className="text-sm font-semibold" style={{ color:t.text }}>{nutzer?.name}</p><p className="text-xs" style={{ color:t.muted }}>{nutzer?.label}</p></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── DESKTOP LAYOUT ───────────────────────────────────────────────────────────
function DesktopApp({ dark, setDark, active, setActive, rolle, setRolle, navVisible, currentId }) {
  const t = dark?T.dark:T.light;
  const [sidebar, setSidebar] = useState(true);
  const [showRolle, setShowRolle] = useState(false);
  const nutzer = NUTZER_DEMO.find(n=>n.val===rolle);
  const currentItem = navVisible.find(n=>n.id===currentId);

  const views = {
    dashboard:     <OverviewView dark={dark} setActive={setActive}/>,
    projekte:      <ProjekteView dark={dark} mobile={false}/>,
    aufgaben:      <AufgabenView dark={dark}/>,
    zeiterfassung: <ZeiterfassungView dark={dark}/>,
    waren:         <WarenView dark={dark}/>,
  };

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background:t.base, fontFamily:"'Inter',system-ui,sans-serif" }}>
      {/* SIDEBAR */}
      <aside className="flex flex-col border-r flex-shrink-0 transition-all duration-200" style={{ width:sidebar?224:56, background:t.surface, borderColor:t.border }}>
        <div className="flex items-center gap-2.5 px-3 py-4 border-b" style={{ borderColor:t.border }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm flex-shrink-0" style={{ background:T.accent }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><rect x="3" y="3" width="18" height="4" rx="1"/><rect x="3" y="9" width="18" height="4" rx="1"/><rect x="3" y="15" width="18" height="4" rx="1"/><circle cx="6" cy="5" r="0.8" fill="#1a6b3c"/><circle cx="6" cy="11" r="0.8" fill="#1a6b3c"/><circle cx="6" cy="17" r="0.8" fill="#1a6b3c"/></svg>
          </div>
          {sidebar && <div className="min-w-0"><p className="text-sm font-bold truncate" style={{ color:t.text }}>Küchenmontagen</p><p className="text-xs truncate font-semibold" style={{ color:T.accent }}>GRUSCHWITZ</p></div>}
        </div>
        <div className="px-2 py-2 border-b relative" style={{ borderColor:t.border }}>
          <button onClick={()=>setShowRolle(!showRolle)}
            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background:t.card, color:t.muted }}>
            <span className="truncate">{sidebar?`Rolle: ${nutzer?.label}`:nutzer?.kuerzel}</span>
            {sidebar && I.chevD}
          </button>
          {showRolle && (
            <div className="absolute left-2 top-full mt-1 z-50 rounded-xl shadow-xl border py-1 w-48" style={{ background:t.surface, borderColor:t.border }}>
              {NUTZER_DEMO.map(r=>(
                <button key={r.val} onClick={()=>{ setRolle(r.val); setShowRolle(false); setActive("dashboard"); }}
                  className="w-full text-left px-3 py-2 text-xs font-medium"
                  style={{ color:rolle===r.val?T.accent:t.text }}>{r.label}</button>
              ))}
            </div>
          )}
        </div>
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto">
          {navVisible.map(item=>{
            const isA = currentId===item.id;
            return (
              <button key={item.id} onClick={()=>setActive(item.id)}
                className="w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg text-left transition-colors relative"
                style={{ background:isA?T.accent:"transparent", color:isA?"white":t.muted }}>
                <span className="flex-shrink-0">{item.icon}</span>
                {sidebar && <span className="text-sm font-medium flex-1 truncate">{item.label}</span>}
                {sidebar && item.badge && <span className="text-xs px-1.5 py-0.5 rounded-full font-semibold" style={{ background:isA?"rgba(255,255,255,0.2)":T.accent, color:"white" }}>{item.badge}</span>}
                {!sidebar && item.badge && <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background:T.accent }}/>}
              </button>
            );
          })}
        </nav>
        <div className="px-3 py-3 border-t" style={{ borderColor:t.border }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs flex-shrink-0" style={{ background:"linear-gradient(135deg,#1a6b3c,#16a34a)" }}>{nutzer?.kuerzel}</div>
            {sidebar && <div className="min-w-0 flex-1"><p className="text-sm font-semibold truncate" style={{ color:t.text }}>{nutzer?.name}</p><p className="text-xs truncate" style={{ color:t.muted }}>{nutzer?.label}</p></div>}
          </div>
        </div>
      </aside>
      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0" style={{ background:t.surface, borderColor:t.border }}>
          <div className="flex items-center gap-3">
            <button onClick={()=>setSidebar(!sidebar)} className="p-1.5 rounded-lg" style={{ color:t.muted }}>{I.menu}</button>
            <span className="text-sm font-semibold" style={{ color:t.text }}>{currentItem?.label}</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg" style={{ color:t.muted }}>{I.bell}<span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background:T.danger }}/></button>
            <button onClick={()=>setDark(!dark)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background:t.card, color:t.muted }}>
              {dark?I.sun:I.moon} {dark?"Hell":"Dunkel"}
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-5">{views[currentId] || <Placeholder dark={dark} label={currentItem?.label} icon={currentItem?.icon}/>}</main>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState("dashboard");
  const [rolle, setRolle] = useState(ROLLEN.KM);
  const mobile = useIsMobile();

  const navVisible = NAV.filter(n=>n.rollen.includes(rolle));
  const currentItem = navVisible.find(n=>n.id===active) || navVisible[0];
  const currentId = currentItem?.id || "dashboard";

  const props = { dark, setDark, active, setActive, rolle, setRolle, navVisible, currentId };

  return mobile ? <MobileApp {...props}/> : <DesktopApp {...props}/>;
}
