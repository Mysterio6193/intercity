/* screens-order.jsx — Cart, Checkout, Tracking, Feedback */

// ── Cart Screen ──────────────────────────────────────────────────────
function CartScreen({ go, cart, setCart, hotel, currency }) {
  if (cart.length === 0) {
    return (
      <div className="screen" data-screen-label="Cart">
        <StatusBar/>
        <TopBar onBack={()=>go(-1)} title="Your order"/>
        <div style={{flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:40, textAlign:"center"}}>
          <div style={{width:64, height:64, borderRadius:"50%", background:"var(--surface)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20}}>
            <span style={{width:28, height:28, color:"var(--mute)"}}>{Ic.cart}</span>
          </div>
          <div style={{fontSize:22, fontWeight:700, letterSpacing:"-0.5px", marginBottom:6}}>Nothing here yet</div>
          <p style={{color:"var(--mute)", fontSize:14, margin:"0 0 24px"}}>Browse the menu to add items.</p>
          <button className="btn-secondary" onClick={()=>go("menu")}>Browse menu</button>
        </div>
      </div>
    );
  }

  const subtotal = cart.reduce((s,c) => s + c.total, 0);
  const maxPrep = cart.reduce((m,c) => Math.max(m, parseInt(c.it.prep) || 20), 0);
  const setQty = (idx, q) => setCart(cart.map((c,i) => i !== idx ? c : {...c, qty: q, total: (c.total/c.qty)*q}));
  const remove = (idx) => setCart(cart.filter((_,i) => i !== idx));

  return (
    <div className="screen" data-screen-label="Cart">
      <StatusBar/>
      <TopBar onBack={()=>go(-1)} title="Your order" sub={`${cart.length} ${cart.length===1?"item":"items"}`}/>
      <div className="scroll" style={{flex:1}}>
        <div style={{padding:"0 16px"}}>

          {/* ETA */}
          <div className="eta-bar">
            <span style={{width:14, height:14}}>{Ic.clock}</span>
            <span style={{flex:1, fontSize:13, fontWeight:600}}>{maxPrep}–{maxPrep+8} min to Room {hotel.room}</span>
            <span className="badge-quick">ASAP</span>
          </div>

          {/* Items */}
          {cart.map((c, i) => {
            const url = imgUrl(c.it.id, 200);
            return (
              <div key={i} className="cart-item">
                <div className="cart-thumb">{url && <img src={url} alt="" decoding="async"/>}</div>
                <div style={{flex:1, minWidth:0}}>
                  <div className="cart-item-name">{c.it.n}</div>
                  <div className="caption">{fmt(c.total/c.qty, currency)} · {c.it.prep}</div>
                  {c.note && <div style={{fontSize:11, color:"var(--mute)", marginTop:3, fontStyle:"italic"}}>"{c.note}"</div>}
                </div>
                <div className="stepper sm">
                  <button onClick={()=>c.qty>1 ? setQty(i, c.qty-1) : remove(i)}>{c.qty>1?"−":"×"}</button>
                  <span className="v">{c.qty}</span>
                  <button onClick={()=>setQty(i, c.qty+1)}>+</button>
                </div>
              </div>
            );
          })}

          {/* Subtotal */}
          <div style={{display:"flex", justifyContent:"space-between", padding:"16px 0", borderTop:"1px solid var(--border)", marginTop:8}}>
            <span style={{fontSize:14, color:"var(--mute)"}}>Subtotal</span>
            <span style={{fontSize:16, fontWeight:700}}>{fmt(subtotal, currency)}</span>
          </div>
        </div>
      </div>

      <div className="sticky-foot">
        <button className="btn-primary" onClick={()=>go("checkout")}>
          Continue — {fmt(subtotal, currency)}
        </button>
      </div>
    </div>
  );
}

// ── Checkout Screen ──────────────────────────────────────────────────
function CheckoutScreen({ go, cart, hotel, onPlace, currency }) {
  const [pay, setPay] = useS("room");
  const [timing, setTiming] = useS("asap");
  const [tipPct, setTipPct] = useS(0);

  const subtotal = cart.reduce((s,c) => s + c.total, 0);
  const tax = Math.round(subtotal * 0.05);
  const service = Math.round(subtotal * 0.10);
  const tip = Math.round(subtotal * tipPct / 100);
  const total = subtotal + tax + service + tip;
  const maxPrep = cart.reduce((m,c) => Math.max(m, parseInt(c.it.prep) || 20), 0);

  return (
    <div className="screen" data-screen-label="Checkout">
      <StatusBar/>
      <TopBar onBack={()=>go(-1)} title="Checkout" sub={`${cart.length} items`}/>
      <div className="scroll" style={{flex:1}}>
        <div style={{padding:"0 16px 40px"}}>

          {/* Delivery info */}
          <div className="checkout-card">
            <div style={{display:"flex", justifyContent:"space-between"}}>
              <div>
                <div className="caption">Delivering to</div>
                <div style={{fontSize:20, fontWeight:700, letterSpacing:"-0.4px", marginTop:4}}>Room {hotel.room}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div className="caption">Estimated</div>
                <div style={{fontSize:14, fontWeight:700, marginTop:4}}>{maxPrep}–{maxPrep+8} min</div>
              </div>
            </div>
          </div>

          {/* Timing */}
          <div className="checkout-section">
            <div className="caption" style={{marginBottom:8}}>When</div>
            <Seg options={[{k:"asap",t:"As soon as possible"},{k:"later",t:"Schedule"}]} value={timing} onChange={setTiming}/>
          </div>

          {/* Payment */}
          <div className="checkout-section">
            <div className="caption" style={{marginBottom:8}}>Payment</div>
            {[
              {k:"room", t:"Charge to room", s:"Settles at checkout · " + hotel.room},
              {k:"now",  t:"Pay now",        s:"Card, UPI, Apple Pay"},
              {k:"deliv",t:"Pay on delivery", s:"Card or cash"},
            ].map(o => (
              <div key={o.k} className={"radio-row " + (pay===o.k?"on":"")} onClick={()=>setPay(o.k)}>
                <span className="radio-dot"></span>
                <div style={{flex:1}}>
                  <div style={{fontSize:15, fontWeight:600}}>{o.t}</div>
                  <div className="caption">{o.s}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Gratuity */}
          <div className="checkout-section">
            <div className="caption" style={{marginBottom:10}}>Gratuity</div>
            <Seg options={[{k:0,t:"None"},{k:10,t:"10%"},{k:15,t:"15%"},{k:20,t:"20%"}]} value={tipPct} onChange={setTipPct}/>
          </div>

          {/* Ledger */}
          <div className="checkout-section">
            <div className="ledger">
              <div className="ledger-row"><span>Subtotal</span><span>{fmt(subtotal, currency)}</span></div>
              <div className="ledger-row"><span>GST · 5%</span><span>{fmt(tax, currency)}</span></div>
              <div className="ledger-row"><span>Service · 10%</span><span>{fmt(service, currency)}</span></div>
              {tip > 0 && <div className="ledger-row"><span>Gratuity · {tipPct}%</span><span>{fmt(tip, currency)}</span></div>}
              <div className="ledger-row total"><span>Total</span><span>{fmt(total, currency)}</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky-foot">
        <button className="btn-primary" onClick={()=>onPlace({pay, timing, tipPct, total})}>
          Place order — {fmt(total, currency)}
        </button>
      </div>
    </div>
  );
}

// ── Tracking Screen ──────────────────────────────────────────────────
function TrackingScreen({ go, cart, hotel, currency }) {
  const [step, setStep] = useS(2);
  const steps = [
    { t:"Order placed",  ts:"21:14" },
    { t:"Accepted",      ts:"21:15" },
    { t:"Preparing",     ts:"21:18" },
    { t:"Ready",         ts:"—" },
    { t:"On the way",    ts:"—" },
    { t:"Delivered",     ts:"—" },
  ];
  const maxPrep = cart.reduce((m,c) => Math.max(m, parseInt(c.it.prep) || 20), 22);

  // Auto-advance demo
  useE(() => {
    if (step >= steps.length - 1) return;
    const t = setTimeout(() => setStep(s => s + 1), 4000);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <div className="screen" data-screen-label="Tracking">
      <StatusBar/>
      <TopBar onBack={()=>go("home")} title="Order tracking" sub="Order #HT4821"/>
      <div className="scroll" style={{flex:1}}>
        <div style={{padding:"0 20px 40px"}}>

          {/* Status hero */}
          <div style={{textAlign:"center", padding:"20px 0 30px"}}>
            <div style={{width:72, height:72, borderRadius:"50%", background:step>=5?"var(--accent)":"var(--ink)", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px"}}>
              {step >= 5
                ? <span style={{width:32, height:32}}>{Ic.check}</span>
                : <span style={{width:28, height:28}}>{Ic.clock}</span>}
            </div>
            <div style={{fontSize:24, fontWeight:700, letterSpacing:"-0.6px"}}>
              {step < 3 ? "Being prepared" : step < 5 ? "On the way" : "Delivered"}
            </div>
            <p style={{color:"var(--mute)", fontSize:14, margin:"8px 0 0"}}>
              {step < 5 ? `Estimated ${maxPrep}–${maxPrep+8} min to Room ${hotel.room}` : "Enjoy your meal."}
            </p>
          </div>

          {/* Timeline */}
          <div className="timeline">
            {steps.map((s, i) => (
              <div key={i} className={"tl-step " + (i < step ? "done" : i === step ? "cur" : "")}>
                <div className="tl-dot-wrap">
                  <div className="tl-dot"></div>
                  {i < steps.length - 1 && <div className="tl-line"></div>}
                </div>
                <div>
                  <div className="tl-label">{s.t}</div>
                  <div className="tl-time">{i <= step ? s.ts : "—"}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Items */}
          <div style={{marginTop:24, borderTop:"1px solid var(--border)", paddingTop:16}}>
            <div className="caption" style={{marginBottom:10}}>Your order</div>
            {cart.map((c,i) => (
              <div key={i} style={{display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px dashed var(--border)"}}>
                <div>
                  <div style={{fontSize:14, fontWeight:600}}>{c.it.n}</div>
                  <div className="caption">× {c.qty}</div>
                </div>
                <div style={{fontSize:14, fontWeight:600}}>{fmt(c.total, currency)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {step >= 5 && (
        <div className="sticky-foot">
          <button className="btn-primary" onClick={()=>go("feedback")}>Rate your experience</button>
        </div>
      )}
    </div>
  );
}

// ── Feedback Screen ──────────────────────────────────────────────────
function FeedbackScreen({ go, hotel }) {
  const [rating, setRating] = useS(0);
  const [tags, setTags] = useS([]);
  const [comment, setComment] = useS("");
  const [submitted, setSubmitted] = useS(false);

  const tagOptions = ["Delicious","Fast delivery","Well presented","Generous portions","Too spicy","Too cold","Missing items","Late delivery"];

  const toggleTag = (t) => setTags(tags.includes(t) ? tags.filter(x=>x!==t) : [...tags, t]);

  if (submitted) {
    return (
      <div className="screen" data-screen-label="Feedback">
        <StatusBar/>
        <div style={{flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:40, textAlign:"center"}}>
          <div style={{width:80, height:80, borderRadius:"50%", background:"var(--accent)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20}}>
            <span style={{width:36, height:36, color:"#fff"}}>{Ic.check}</span>
          </div>
          <div style={{fontSize:26, fontWeight:700, letterSpacing:"-0.8px"}}>Thank you</div>
          <p style={{color:"var(--mute)", fontSize:14, margin:"10px 0 30px", maxWidth:"28ch"}}>Your feedback helps the kitchen improve.</p>
          <button className="btn-primary" style={{maxWidth:260}} onClick={()=>go("home")}>Back to home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen" data-screen-label="Feedback">
      <StatusBar/>
      <TopBar onBack={()=>go(-1)} title="Feedback" sub="Order #HT4821"/>
      <div className="scroll" style={{flex:1}}>
        <div style={{padding:"0 20px 40px"}}>
          <div style={{fontSize:26, fontWeight:700, letterSpacing:"-0.8px", margin:"10px 0 24px", maxWidth:"18ch", lineHeight:1.1}}>
            How was your order, {hotel.guest}?
          </div>

          {/* Stars */}
          <div style={{display:"flex", gap:8, marginBottom:24}}>
            {[1,2,3,4,5].map(n => (
              <button key={n} onClick={()=>setRating(n)} style={{appearance:"none", border:0, background:"transparent", cursor:"pointer", width:40, height:40, color:n<=rating?"var(--accent)":"var(--border)", padding:0}}>
                {Ic.star}
              </button>
            ))}
          </div>

          {/* Tags */}
          {rating > 0 && (
            <>
              <div className="caption" style={{marginBottom:10}}>What stood out?</div>
              <div style={{display:"flex", flexWrap:"wrap", gap:6, marginBottom:20}}>
                {tagOptions.map(t => (
                  <Chip key={t} label={t} on={tags.includes(t)} onClick={()=>toggleTag(t)}/>
                ))}
              </div>

              <div className="caption" style={{marginBottom:8}}>Anything else?</div>
              <textarea className="input" placeholder="Optional feedback…" value={comment} onChange={e=>setComment(e.target.value)} style={{fontSize:14, minHeight:56}}/>
            </>
          )}
        </div>
      </div>

      {rating > 0 && (
        <div className="sticky-foot">
          <button className="btn-primary" onClick={()=>setSubmitted(true)}>Submit feedback</button>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { CartScreen, CheckoutScreen, TrackingScreen, FeedbackScreen });
