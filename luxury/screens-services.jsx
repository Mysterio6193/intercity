/* screens-services.jsx — Services hub, service request, Stay/Account, QR Landing */

// ── Services Screen ──────────────────────────────────────────────────
function ServicesScreen({ go, hotel, onRequestService }) {
  return (
    <div className="screen" data-screen-label="Services">
      <StatusBar/>
      <div style={{padding:"18px 20px 10px"}}>
        <div style={{fontSize:26, fontWeight:700, letterSpacing:"-0.8px", lineHeight:1.1}}>How can we help?</div>
        <div className="caption" style={{marginTop:4}}>Room {hotel.room} · The Monarch</div>
      </div>
      <div className="scroll" style={{flex:1}}>
        <div style={{padding:"12px 16px 40px", display:"flex", flexDirection:"column", gap:8}}>
          {SERVICES.map(svc => (
            <SvcCatCard key={svc.id} svc={svc} onClick={()=>go("svc-detail",{svcId:svc.id})}/>
          ))}
        </div>

        {/* Quick requests */}
        <div style={{padding:"0 16px 40px"}}>
          <div className="section-head">
            <span className="section-title">Quick requests</span>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8}}>
            {[
              {n:"Extra towels", icon:"🛁", svc:"hk3"},
              {n:"Extra pillows", icon:"🛏", svc:"hk4"},
              {n:"Toiletries", icon:"🧴", svc:"am1"},
              {n:"Wi-Fi help", icon:"📶", svc:"mt5"},
            ].map(q => (
              <button key={q.svc} className="quick-req" onClick={()=>onRequestService(q.svc)}>
                <span style={{fontSize:20}}>{q.icon}</span>
                <span style={{fontSize:13, fontWeight:600}}>{q.n}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Service Detail Screen ────────────────────────────────────────────
function ServiceDetailScreen({ go, svcId, onRequestService, currency }) {
  const svc = SERVICES.find(s => s.id === svcId);
  if (!svc) return <div className="screen"><TopBar onBack={()=>go(-1)} title="Not found"/></div>;

  return (
    <div className="screen" data-screen-label="Service Detail">
      <StatusBar/>
      <TopBar onBack={()=>go(-1)} title={svc.t}/>
      <div className="scroll" style={{flex:1}}>
        <div style={{padding:"0 16px 40px"}}>
          {svc.items.map(item => (
            <div key={item.id} className="svc-item-row">
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:15, fontWeight:600, letterSpacing:"-0.1px"}}>{item.n}</div>
                <div className="caption" style={{marginTop:3}}>{item.d}</div>
                <div style={{display:"flex", gap:10, marginTop:6, alignItems:"center"}}>
                  <span style={{fontSize:13, fontWeight:600}}>{item.p > 0 ? fmt(item.p, currency) : "Complimentary"}</span>
                  {item.prep !== "—" && <span className="caption">{item.prep}</span>}
                </div>
              </div>
              <button className="btn-sm-accent" onClick={()=>onRequestService(item.id)}>Request</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Stay / Account Screen ────────────────────────────────────────────
function StayScreen({ go, hotel, cart, currency }) {
  const pastOrders = [
    { n:"#HT4821", t:"Butter chicken + butter naan", a:"₹490", d:"Yesterday · 21:14" },
    { n:"#HT4810", t:"Chicken biryani + raita", a:"₹380", d:"Yesterday · 13:20" },
    { n:"#HT4792", t:"Masala tea + paneer pakoda", a:"₹180", d:"7 May · 17:40" },
  ];

  return (
    <div className="screen" data-screen-label="Stay">
      <StatusBar/>
      <div className="scroll" style={{flex:1}}>
        {/* Stay header */}
        <div className="stay-hero">
          <div style={{fontSize:11, fontWeight:600, letterSpacing:".15em", textTransform:"uppercase", color:"var(--accent)", marginBottom:8}}>Your stay</div>
          <div style={{fontSize:32, fontWeight:700, letterSpacing:"-1px", lineHeight:1}}>Room {hotel.room}</div>
          <div className="caption" style={{marginTop:6}}>{hotel.name} · {hotel.guest}</div>
        </div>

        {/* Quick links */}
        <div style={{padding:"0 16px", display:"flex", flexDirection:"column", gap:1}}>
          {[
            {t:"Order history", s:pastOrders.length + " orders", action:null},
            {t:"Room folio", s:"View charges", action:null},
            {t:"Check-out info", s:"12:00 noon", action:null},
            {t:"Wi-Fi", s:"MONARCH-GUEST / Room " + hotel.room, action:null},
          ].map((item,i) => (
            <div key={i} className="stay-row">
              <div>
                <div style={{fontSize:15, fontWeight:600}}>{item.t}</div>
                <div className="caption">{item.s}</div>
              </div>
              <span style={{color:"var(--mute)", fontSize:18}}>›</span>
            </div>
          ))}
        </div>

        {/* Past orders */}
        <div className="section" style={{padding:"24px 16px 0"}}>
          <div className="section-head">
            <span className="section-title">Recent orders</span>
          </div>
          {pastOrders.map((o,i) => (
            <div key={i} className="past-order">
              <div style={{flex:1}}>
                <div style={{fontSize:14, fontWeight:600}}>{o.t}</div>
                <div className="caption">{o.d} · {o.n}</div>
              </div>
              <span style={{fontSize:14, fontWeight:600}}>{o.a}</span>
            </div>
          ))}
        </div>

        {/* Help */}
        <div style={{padding:"24px 16px 40px"}}>
          <div className="section-head">
            <span className="section-title">Need help?</span>
          </div>
          <div style={{display:"flex", gap:8}}>
            <button className="btn-secondary" style={{flex:1}} onClick={()=>go("services")}>
              <span style={{width:16, height:16}}>{Ic.bell}</span> Services
            </button>
            <button className="btn-secondary" style={{flex:1}}>
              <span style={{width:16, height:16}}>{Ic.utensils}</span> Call front desk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── QR Landing ───────────────────────────────────────────────────────
function QRLanding({ go, hotel }) {
  return (
    <div className="screen" data-screen-label="QR Landing" style={{background:"var(--ink)", color:"#fff"}}>
      <StatusBar light/>
      <div style={{flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 30px", textAlign:"center"}}>
        {/* Logo mark */}
        <div style={{width:72, height:72, borderRadius:"50%", background:"var(--accent)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:24}}>
          <span style={{fontSize:32, fontWeight:700, color:"#fff", letterSpacing:"-1px"}}>M</span>
        </div>

        <div style={{fontSize:13, fontWeight:600, letterSpacing:".15em", textTransform:"uppercase", color:"var(--accent)", marginBottom:12}}>The Monarch</div>
        <div style={{fontSize:36, fontWeight:700, letterSpacing:"-1.2px", lineHeight:1.05, maxWidth:"16ch"}}>
          Welcome, {hotel.guest}.
        </div>
        <p style={{color:"rgba(255,255,255,.6)", fontSize:14, lineHeight:1.5, margin:"16px 0 0", maxWidth:"28ch"}}>
          Room {hotel.room} · House of Tandoor
        </p>

        <button className="btn-primary" style={{marginTop:36, maxWidth:280, width:"100%"}} onClick={()=>go("home")}>
          Begin
        </button>

        <div style={{marginTop:24, fontSize:12, color:"rgba(255,255,255,.35)"}}>
          Powered by Servd
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ServicesScreen, ServiceDetailScreen, StayScreen, QRLanding });
