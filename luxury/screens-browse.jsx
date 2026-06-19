/* screens-browse.jsx — Home, Menu, Item Detail */

// ── Home Screen ──────────────────────────────────────────────────────
function HomeScreen({ go, hotel, onOpenCart, cartCount }) {
  const hr = new Date().getHours();
  const greet = hr < 12 ? "Good morning" : hr < 17 ? "Good afternoon" : "Good evening";
  const lastName = hotel.guest.split(" ").slice(-1)[0];

  const featured = ITEMS.find(i => i.id === "nv1");
  const popular = ["nv1","ck1","pn1","rc5","dl2","st1","de3"].map(id=>ITEMS.find(i=>i.id===id)).filter(Boolean);
  const quickBites = ITEMS.filter(i => i.quick && i.p > 0 && i.p <= 200).slice(0, 6);

  return (
    <div className="screen" data-screen-label="Home">
      <StatusBar/>
      <div className="scroll">

        {/* Hero */}
        <div className="home-hero">
          {(()=>{ const url = imgUrl("cat-mains", 900); return url ? <img src={url} alt="" decoding="async" className="home-hero-img"/> : null; })()}
          <div className="home-hero-scrim">
            <div className="home-hero-eyebrow">Room {hotel.room} · House of Tandoor</div>
            <div className="home-hero-greeting">{greet}, <em>{lastName}.</em></div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="home-actions">
          <button className="home-action" onClick={()=>go("menu")}>
            <span className="home-action-icon">{Ic.utensils}</span>
            <span>Order food</span>
          </button>
          <button className="home-action" onClick={()=>go("services")}>
            <span className="home-action-icon">{Ic.bell}</span>
            <span>Services</span>
          </button>
          {cartCount > 0 && (
            <button className="home-action" onClick={onOpenCart}>
              <span className="home-action-icon">{Ic.cart}</span>
              <span>My order</span>
            </button>
          )}
        </div>

        {/* Featured dish */}
        {featured && (
          <div className="section">
            <div className="section-head">
              <span className="section-title">Tonight's pick</span>
            </div>
            <div className="featured-card" onClick={()=>go("item",{id:featured.id})}>
              {(()=>{ const url = imgUrl(featured.id, 800); return url ? <img src={url} alt="" decoding="async"/> : null; })()}
              <div className="featured-scrim">
                <span className="featured-badge">Chef's recommendation</span>
                <div className="featured-name">{featured.n}</div>
                <div className="featured-meta">{featured.prep} · {fmt(featured.p)}</div>
              </div>
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="section">
          <div className="section-head">
            <span className="section-title">Browse by category</span>
            <span className="section-link" onClick={()=>go("menu")}>See all</span>
          </div>
          <div className="cat-grid">
            {CATS.map(c => <CatCard key={c.id} cat={c} onClick={()=>go("menu",{cat:c.id})}/>)}
          </div>
        </div>

        {/* Popular */}
        <div className="section">
          <div className="section-head">
            <span className="section-title">Most ordered</span>
          </div>
          <div className="rail">
            {popular.map(it => (
              <div key={it.id} className="pop-card" onClick={()=>go("item",{id:it.id})}>
                <div className="pop-img">
                  {(()=>{ const url = imgUrl(it.id, 400); return url ? <img src={url} alt="" decoding="async"/> : null; })()}
                </div>
                <div className="pop-name">{it.n}</div>
                <div className="pop-price">{fmt(it.p)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick bites */}
        <div className="section" style={{paddingBottom:40}}>
          <div className="section-head">
            <span className="section-title">Quick bites</span>
            <span className="caption">Under 15 min</span>
          </div>
          <div className="rail">
            {quickBites.map(it => (
              <div key={it.id} className="pop-card sm" onClick={()=>go("item",{id:it.id})}>
                <div className="pop-img">
                  {(()=>{ const url = imgUrl(it.id, 300); return url ? <img src={url} alt="" decoding="async"/> : null; })()}
                </div>
                <div className="pop-name">{it.n}</div>
                <div className="pop-price">{fmt(it.p)} · {it.prep}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Menu Screen ──────────────────────────────────────────────────────
function MenuScreen({ go, initialCat, onAdd, currency }) {
  const [tab, setTab] = useS(initialCat || CATS[0].id);
  const [q, setQ] = useS("");
  const [filter, setFilter] = useS("all"); // all | veg | nv

  const items = useM(() => {
    let a = ITEMS.filter(i => i.cat === tab);
    if (q) {
      const lq = q.toLowerCase();
      a = a.filter(i => (i.n + " " + i.d).toLowerCase().includes(lq));
    }
    if (filter === "veg") a = a.filter(i => !i.diet?.includes("nv"));
    if (filter === "nv") a = a.filter(i => i.diet?.includes("nv"));
    return a;
  }, [tab, q, filter]);

  const hasNv = useM(() => ITEMS.filter(i => i.cat === tab).some(i => i.diet?.includes("nv")), [tab]);

  return (
    <div className="screen" data-screen-label="Menu">
      <StatusBar/>
      <div style={{padding:"10px 16px 0"}}>
        <div className="search-bar">
          <span style={{width:16, height:16, opacity:.5}}>{Ic.search}</span>
          <input placeholder="Search the menu…" value={q} onChange={e=>setQ(e.target.value)}/>
          {q && <button onClick={()=>setQ("")} style={{appearance:"none", border:0, background:"transparent", color:"var(--mute)", cursor:"pointer", fontSize:18, padding:0}}>×</button>}
        </div>
      </div>

      {/* Category tabs */}
      <div className="cat-tabs">
        {CATS.map(c => (
          <button key={c.id} className={"cat-tab " + (tab===c.id?"on":"")} onClick={()=>{setTab(c.id);setQ("");}}>
            {c.t}
          </button>
        ))}
      </div>

      {/* Veg/Non-veg filter */}
      {hasNv && (
        <div style={{display:"flex", gap:6, padding:"0 16px 8px"}}>
          <Chip label="All" on={filter==="all"} onClick={()=>setFilter("all")}/>
          <Chip label="Veg" on={filter==="veg"} onClick={()=>setFilter("veg")}/>
          <Chip label="Non-veg" on={filter==="nv"} onClick={()=>setFilter("nv")}/>
        </div>
      )}

      <div className="scroll" style={{flex:1}}>
        <div style={{padding:"0 16px 120px"}}>
          {items.length === 0 && (
            <div style={{textAlign:"center", padding:"40px 20px", color:"var(--mute)"}}>
              <div style={{fontSize:18, fontWeight:600, marginBottom:6}}>No results</div>
              <p style={{fontSize:13}}>Try a different search or category.</p>
            </div>
          )}
          {items.map(it => (
            <ItemRow key={it.id} item={it} currency={currency} onTap={(i)=>go("item",{id:i.id})} onAdd={(i)=>onAdd(i, {qty:1, note:"", total:i.p})}/>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Item Detail Screen ───────────────────────────────────────────────
function ItemDetail({ id, go, onAdd, currency }) {
  const it = ITEMS.find(x => x.id === id);
  const [qty, setQty] = useS(1);
  const [note, setNote] = useS("");
  if (!it) return <div className="screen"><TopBar onBack={()=>go(-1)} title="Not found"/></div>;

  const url = imgUrl(it.id, 800);
  const total = it.p * qty;
  const pair = it.pair && ITEMS.find(x => x.id === it.pair);

  return (
    <div className="screen" data-screen-label="Item Detail">
      <StatusBar light={!!url}/>
      <div className="scroll" style={{flex:1}}>
        {/* Photo */}
        <div style={{position:"relative", aspectRatio:"16/10", background:"var(--surface)", overflow:"hidden"}}>
          {url && <img src={url} alt="" decoding="async" style={{width:"100%", height:"100%", objectFit:"cover", display:"block"}}/>}
          <button className="icon-btn" onClick={()=>go(-1)} style={{position:"absolute", top:12, left:12, background:"rgba(255,255,255,.9)", zIndex:3}} aria-label="Back">{Ic.back}</button>
        </div>

        <div style={{padding:"20px 20px 0"}}>
          {/* Diet + badges */}
          <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:8}}>
            <DietBadge diet={it.diet}/>
            {it.pop && <span className="badge-pop">Popular</span>}
            {it.quick && <span className="badge-quick">Quick</span>}
          </div>

          {/* Name + price */}
          <h2 className="item-detail-name">{it.n}</h2>
          <div style={{display:"flex", alignItems:"baseline", gap:12, marginTop:6}}>
            <span style={{fontSize:20, fontWeight:700, letterSpacing:"-0.3px"}}>{fmt(it.p, currency)}</span>
            <span className="caption" style={{display:"flex", alignItems:"center", gap:4}}>
              <span style={{width:13, height:13}}>{Ic.clock}</span> {it.prep}
            </span>
          </div>

          <p style={{color:"var(--body)", fontSize:14.5, lineHeight:1.5, margin:"14px 0 0"}}>{it.d}</p>

          {/* Chef's note */}
          {it.chef && (
            <div className="chef-note">
              <div style={{fontSize:10, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"var(--accent)", marginBottom:6}}>From the kitchen</div>
              <p style={{margin:0, fontSize:14, lineHeight:1.4, fontWeight:500, fontStyle:"italic"}}>"{it.chef}"</p>
            </div>
          )}

          {/* Allergens */}
          {it.allergens && it.allergens.length > 0 && (
            <div style={{marginTop:14, fontSize:12, color:"var(--mute)"}}>
              <strong>Contains:</strong> {it.allergens.join(", ")}
            </div>
          )}

          {/* Pair suggestion */}
          {pair && (
            <div style={{marginTop:18}}>
              <div className="caption" style={{marginBottom:8}}>Goes well with</div>
              <div className="pair-card" onClick={()=>go("item",{id:pair.id})}>
                <div className="pair-img">
                  {(()=>{ const pu = imgUrl(pair.id, 200); return pu ? <img src={pu} alt="" decoding="async"/> : null; })()}
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:14, fontWeight:600, lineHeight:1.2, letterSpacing:"-0.1px"}}>{pair.n}</div>
                  <div className="caption" style={{marginTop:2}}>{fmt(pair.p, currency)} · {pair.prep}</div>
                </div>
                <button className="pair-add" onClick={(e)=>{e.stopPropagation(); onAdd(pair, {qty:1, note:"", total:pair.p});}}>+</button>
              </div>
            </div>
          )}

          {/* Note for kitchen */}
          <div style={{marginTop:18}}>
            <div className="caption" style={{marginBottom:8}}>Note for the kitchen</div>
            <textarea className="input" placeholder="Allergies, spice level, preferences…" value={note} onChange={e=>setNote(e.target.value)} style={{fontSize:14, minHeight:56}}/>
          </div>
        </div>
      </div>

      {/* Sticky footer */}
      <div className="sticky-foot">
        <div style={{display:"flex", alignItems:"center", gap:12}}>
          <Stepper value={qty} onChange={setQty}/>
          <button className="btn-primary" style={{flex:1}} onClick={()=>{onAdd(it, {qty, note, total}); go(-1);}}>
            Add — {fmt(total, currency)}
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen, MenuScreen, ItemDetail });
