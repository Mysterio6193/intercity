/* ui.jsx — Shared UI components */
const { useState: useS, useEffect: useE, useRef: useR, useMemo: useM, useCallback: useC } = React;

// ── Icons ────────────────────────────────────────────────────────────
const Ic = {
  home:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-4v-7h-6v7H5a1 1 0 01-1-1z"/></svg>,
  menu:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 6h18M3 12h18M3 18h18"/></svg>,
  bell:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 16V11a6 6 0 1112 0v5l1.5 2H4.5L6 16z"/><path d="M10 20a2 2 0 004 0"/></svg>,
  user:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>,
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="6"/><path d="M20 20l-4-4"/></svg>,
  back:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>,
  close:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M6 18L18 6"/></svg>,
  cart:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 4h3l3 12h11l2-9H7"/><circle cx="10" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/></svg>,
  clock:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  check:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12l4 4 10-10"/></svg>,
  plus:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>,
  minus:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/></svg>,
  star:   <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7 8 .6-6 5.2 2 7.7L12 18.5 4.9 22.5l2-7.7-6-5.2 8-.6z"/></svg>,
  heart:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 21s-7-4.5-9-9a5 5 0 019-3 5 5 0 019 3c-2 4.5-9 9-9 9z"/></svg>,
  utensils:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3v7a4 4 0 004 4h1v7M8 3v4M3 7h10"/><path d="M17 3c0 4 4 4 4 8v2h-4V3z"/><path d="M19 13v8"/></svg>,
  svc:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 16V11a6 6 0 1112 0v5l1.5 2H4.5L6 16z"/><path d="M10 20a2 2 0 004 0"/></svg>,
  arrow:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  spark:  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5z"/></svg>,
};

// ── Status Bar ───────────────────────────────────────────────────────
function StatusBar({ light }) {
  const c = light ? "#fff" : "var(--ink)";
  return (
    <div style={{height:36, flex:"0 0 36px", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 22px", fontWeight:600, fontSize:13, color:c}}>
      <span>9:41</span>
      <span style={{display:"flex", gap:6, alignItems:"center", fontSize:12, fontWeight:600}}>
        <span style={{fontSize:11, letterSpacing:".05em"}}>THE MONARCH</span>
        <span style={{width:18, height:9, border:`1.5px solid ${c}`, borderRadius:3, position:"relative"}}>
          <span style={{position:"absolute", inset:"1.5px", background:c, width:"80%", borderRadius:1}}></span>
        </span>
      </span>
    </div>
  );
}

// ── Top Bar ──────────────────────────────────────────────────────────
function TopBar({ title, sub, onBack, right, transparent }) {
  return (
    <div style={{position:"sticky", top:0, zIndex:5, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", background:transparent?"transparent":"var(--bg)", minHeight:64}}>
      <div style={{display:"flex", alignItems:"center", gap:10, minWidth:0}}>
        {onBack && <button className="icon-btn" onClick={onBack} aria-label="Back">{Ic.back}</button>}
        <div style={{display:"flex", flexDirection:"column", gap:2, minWidth:0}}>
          {sub && <span className="caption">{sub}</span>}
          {title && <span style={{fontSize:18, fontWeight:600, letterSpacing:"-0.3px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{title}</span>}
        </div>
      </div>
      <div style={{display:"flex", alignItems:"center", gap:8}}>{right}</div>
    </div>
  );
}

// ── Tab Bar ──────────────────────────────────────────────────────────
function TabBar({ active, onChange }) {
  const tabs = [
    { k:"home", icon:Ic.home, t:"Home" },
    { k:"menu", icon:Ic.utensils, t:"Menu" },
    { k:"services", icon:Ic.bell, t:"Services" },
    { k:"stay", icon:Ic.user, t:"Stay" },
  ];
  return (
    <div className="tabbar">
      {tabs.map(t => (
        <button key={t.k} className={active===t.k?"on":""} onClick={()=>onChange(t.k)}>
          {t.icon}<span>{t.t}</span>
        </button>
      ))}
    </div>
  );
}

// ── Stepper ──────────────────────────────────────────────────────────
function Stepper({ value, onChange, min=1, max=20 }) {
  return (
    <div className="stepper">
      <button onClick={()=>onChange(Math.max(min, value-1))} disabled={value<=min}>−</button>
      <span className="v">{value}</span>
      <button onClick={()=>onChange(Math.min(max, value+1))} disabled={value>=max}>+</button>
    </div>
  );
}

// ── Toast ────────────────────────────────────────────────────────────
function Toast({ msg }) {
  if (!msg) return null;
  return <div className="toast">{msg}</div>;
}

// ── Diet badge ───────────────────────────────────────────────────────
function DietBadge({ diet }) {
  if (!diet || !diet.length) return null;
  const isNv = diet.includes("nv");
  return (
    <span style={{width:14, height:14, border:`1.5px solid ${isNv?"#962d2d":"#2f6b2f"}`, borderRadius:3, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:8, fontWeight:700, color:isNv?"#962d2d":"#2f6b2f", flexShrink:0}}>
      {isNv ? "●" : "●"}
    </span>
  );
}

// ── Item Card (menu list row) ────────────────────────────────────────
function ItemRow({ item, onTap, onAdd, currency }) {
  const url = imgUrl(item.id, 300);
  return (
    <div className="item-row" onClick={()=>onTap(item)}>
      <div className="item-row-body">
        <div style={{display:"flex", alignItems:"center", gap:6, marginBottom:4}}>
          <DietBadge diet={item.diet}/>
          {item.pop && <span className="badge-pop">Popular</span>}
        </div>
        <div className="item-row-name">{item.n}</div>
        <div className="item-row-desc">{item.d}</div>
        <div style={{display:"flex", alignItems:"center", gap:10, marginTop:8}}>
          <span className="item-row-price">{fmt(item.p, currency)}</span>
          <span className="item-row-prep">{item.prep}</span>
        </div>
      </div>
      <div className="item-row-img">
        {url ? <img src={url} alt="" decoding="async"/> : <div className="item-row-ph"></div>}
        <button className="item-row-add" onClick={(e)=>{e.stopPropagation(); onAdd(item);}} aria-label="Add">+</button>
      </div>
    </div>
  );
}

// ── Category Card (home grid) ────────────────────────────────────────
function CatCard({ cat, onClick }) {
  const url = imgUrl("cat-"+cat.id, 400);
  return (
    <div className="cat-card" onClick={onClick}>
      {url && <img src={url} alt="" decoding="async" style={{position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover"}}/>}
      <div style={{position:"absolute", inset:0, background:"linear-gradient(180deg, transparent 40%, rgba(0,0,0,.6) 100%)"}}></div>
      <div className="cat-card-label">
        <div style={{fontSize:15, fontWeight:700, lineHeight:1.15}}>{cat.t}</div>
        <div style={{fontSize:11, opacity:.85, marginTop:2}}>{cat.s}</div>
      </div>
    </div>
  );
}

// ── Service Category Card ────────────────────────────────────────────
const SVC_ICONS = {
  hk: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 22h18M6 18V4a1 1 0 011-1h10a1 1 0 011 1v14"/><rect x="9" y="8" width="6" height="4" rx="1"/><path d="M12 16v2"/></svg>,
  am: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 7h-3V4a1 1 0 00-1-1H8a1 1 0 00-1 1v3H4a1 1 0 00-1 1v13h18V8a1 1 0 00-1-1z"/><path d="M9 11h6M12 8v6"/></svg>,
  sp: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5z"/></svg>,
  mt: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.8-3.8a7 7 0 01-9.5 9.5L5 21l-3-3 6-7a7 7 0 019.5-9.5z"/></svg>,
};

function SvcCatCard({ svc, onClick }) {
  return (
    <div className="svc-cat-card" onClick={onClick}>
      <div className="svc-icon">{SVC_ICONS[svc.icon]}</div>
      <div>
        <div style={{fontSize:15, fontWeight:600, letterSpacing:"-0.2px"}}>{svc.t}</div>
        <div className="caption" style={{marginTop:2}}>{svc.items.length} items</div>
      </div>
      <span style={{marginLeft:"auto", color:"var(--mute)", fontSize:18}}>›</span>
    </div>
  );
}

// ── Chip ─────────────────────────────────────────────────────────────
function Chip({ label, on, onClick }) {
  return <button className={"chip " + (on?"on":"")} onClick={onClick}>{label}</button>;
}

// ── Segmented Control ────────────────────────────────────────────────
function Seg({ options, value, onChange }) {
  return (
    <div className="seg">
      {options.map(o => (
        <button key={o.k} className={value===o.k?"on":""} onClick={()=>onChange(o.k)}>{o.t}</button>
      ))}
    </div>
  );
}

Object.assign(window, { Ic, StatusBar, TopBar, TabBar, Stepper, Toast, DietBadge, ItemRow, CatCard, SvcCatCard, SVC_ICONS, Chip, Seg, useS, useE, useR, useM, useC });
