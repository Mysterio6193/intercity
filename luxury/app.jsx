/* app.jsx — App shell, routing, tweaks */

function App() {
  const [stack, setStack] = useS([{ s:"qr" }]);
  const [tab, setTab] = useS("home");
  const [cart, setCart] = useS([]);
  const [toast, setToast] = useS("");
  const [hasOrder, setHasOrder] = useS(false);
  const [currency, setCurrency] = useS("INR");
  const [dark, setDark] = useS(false);
  const [hotelName, setHotelName] = useS(HOTEL_DEFAULT.name);
  const [guestName, setGuestName] = useS(HOTEL_DEFAULT.guest);
  const [room, setRoom] = useS(HOTEL_DEFAULT.room);

  const hotel = useM(() => ({
    name: hotelName, guest: guestName, room,
    restaurant: HOTEL_DEFAULT.restaurant,
    loc: HOTEL_DEFAULT.loc,
  }), [hotelName, guestName, room]);

  const cur = stack[stack.length - 1];

  const go = (s, params) => {
    if (s === -1) { setStack(st => st.length > 1 ? st.slice(0,-1) : st); return; }
    setStack(st => [...st, { s, ...params }]);
    if (s === "home") setTab("home");
    if (s === "menu") setTab("menu");
    if (s === "services") setTab("services");
    if (s === "stay") setTab("stay");
  };

  const tabChange = (k) => {
    setTab(k);
    setStack([{ s: k === "stay" ? "stay" : k }]);
  };

  const addToCart = (it, opts) => {
    setCart(c => [...c, { it, ...opts }]);
    showToast(`${it.n} added`);
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  };

  const placeOrder = (opts) => {
    setHasOrder(true);
    go("tracking");
  };

  const requestService = (itemId) => {
    // Find the service item
    let found = null;
    for (const svc of SERVICES) {
      const item = svc.items.find(i => i.id === itemId);
      if (item) { found = item; break; }
    }
    if (found) showToast(`${found.n} — on the way`);
  };

  const cartTotal = cart.reduce((s,c) => s + c.total, 0);

  // Render screen
  let screen;
  switch (cur.s) {
    case "qr":          screen = <QRLanding go={go} hotel={hotel}/>; break;
    case "home":        screen = <HomeScreen go={go} hotel={hotel} onOpenCart={()=>go("cart")} cartCount={cart.length}/>; break;
    case "menu":        screen = <MenuScreen go={go} initialCat={cur.cat} onAdd={addToCart} currency={currency}/>; break;
    case "item":        screen = <ItemDetail id={cur.id} go={go} onAdd={addToCart} currency={currency}/>; break;
    case "cart":        screen = <CartScreen go={go} cart={cart} setCart={setCart} hotel={hotel} currency={currency}/>; break;
    case "checkout":    screen = <CheckoutScreen go={go} cart={cart} hotel={hotel} onPlace={placeOrder} currency={currency}/>; break;
    case "tracking":    screen = <TrackingScreen go={go} cart={cart} hotel={hotel} currency={currency}/>; break;
    case "feedback":    screen = <FeedbackScreen go={go} hotel={hotel}/>; break;
    case "services":    screen = <ServicesScreen go={go} hotel={hotel} onRequestService={requestService}/>; break;
    case "svc-detail":  screen = <ServiceDetailScreen go={go} svcId={cur.svcId} onRequestService={requestService} currency={currency}/>; break;
    case "stay":        screen = <StayScreen go={go} hotel={hotel} cart={cart} currency={currency}/>; break;
    default:            screen = <div style={{padding:40}}>Not found</div>;
  }

  const showTab = ["home","menu","services","stay"].includes(cur.s);
  const showCartFloat = !["cart","checkout","tracking","feedback","qr"].includes(cur.s) && cart.length > 0;

  return (
    <>
      <div className={"stage " + (dark?"dark":"")}>
        {screen}

        {/* Floating cart bar */}
        {showCartFloat && (
          <div style={{position:"absolute", left:0, right:0, bottom:showTab?62:0, padding:"8px 12px", background:"linear-gradient(to top, var(--bg) 60%, transparent)", zIndex:7}}>
            <button className="btn-dark" onClick={()=>go("cart")} style={{display:"flex", alignItems:"center", justifyContent:"space-between", width:"100%"}}>
              <span style={{fontSize:12, fontWeight:600, opacity:.7, textTransform:"uppercase", letterSpacing:".08em"}}>{cart.length} {cart.length===1?"item":"items"}</span>
              <span style={{fontSize:14, fontWeight:700}}>{fmt(cartTotal, currency)} →</span>
            </button>
          </div>
        )}

        {/* Tab bar */}
        {showTab && cur.s !== "qr" && <TabBar active={tab} onChange={tabChange}/>}

        <Toast msg={toast}/>
      </div>

      <TweaksPanel>
        <TweakSection label="Hotel"/>
        <TweakText label="Hotel name" value={hotelName} onChange={setHotelName}/>
        <TweakText label="Guest name" value={guestName} onChange={setGuestName}/>
        <TweakText label="Room" value={room} onChange={setRoom}/>
        <TweakSection label="Display"/>
        <TweakToggle label="Dark mode" value={dark} onChange={setDark}/>
        <TweakSelect label="Currency" value={currency} options={["INR","USD","EUR"]} onChange={setCurrency}/>
        <TweakSection label="Jump to screen"/>
        <TweakButton label="QR landing" onClick={()=>setStack([{s:"qr"}])}/>
        <TweakButton label="Home" onClick={()=>{setStack([{s:"home"}]); setTab("home");}}/>
        <TweakButton label="Menu" onClick={()=>{setStack([{s:"menu"}]); setTab("menu");}}/>
        <TweakButton label="Services" onClick={()=>{setStack([{s:"services"}]); setTab("services");}}/>
        <TweakButton label="Cart (with items)" onClick={()=>{
          if(cart.length===0) setCart([
            {it:ITEMS.find(i=>i.id==="nv1"), qty:1, note:"", total:380},
            {it:ITEMS.find(i=>i.id==="br5"), qty:2, note:"", total:110},
          ]);
          setStack([{s:"cart"}]);
        }}/>
        <TweakButton label="Checkout" onClick={()=>{
          if(cart.length===0) setCart([
            {it:ITEMS.find(i=>i.id==="nv1"), qty:1, note:"", total:380},
            {it:ITEMS.find(i=>i.id==="br5"), qty:2, note:"", total:110},
          ]);
          setStack([{s:"checkout"}]);
        }}/>
        <TweakButton label="Tracking" onClick={()=>{
          if(cart.length===0) setCart([
            {it:ITEMS.find(i=>i.id==="nv1"), qty:1, note:"", total:380},
          ]);
          setStack([{s:"tracking"}]);
        }}/>
        <TweakButton label="Feedback" onClick={()=>setStack([{s:"feedback"}])}/>
        <TweakButton label="Stay" onClick={()=>{setStack([{s:"stay"}]); setTab("stay");}}/>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
