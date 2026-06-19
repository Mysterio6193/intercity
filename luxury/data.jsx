/* data.jsx — Hotel config, menu items, services, photo mappings */

const HOTEL_DEFAULT = {
  name: "The Monarch",
  restaurant: "House of Tandoor",
  loc: "Multi-cuisine · In-room dining",
  room: "1208",
  guest: "Mr. Kapoor",
  gst: "5% GST applicable",
};

const CATS = [
  { id:"bfast",   t:"Breakfast",     s:"7:00 — 10:30" },
  { id:"soup",    t:"Soups",         s:"Veg & non-veg" },
  { id:"starter", t:"Starters",      s:"Tandoor · Salad · Kebab" },
  { id:"mains",   t:"Indian Mains",  s:"Paneer · Chicken · Mutton" },
  { id:"rice",    t:"Rice & Breads", s:"Biryani · Naan · Roti" },
  { id:"chinese", t:"Chinese",       s:"Wok · Noodles · Rice" },
  { id:"bev",     t:"Beverages",     s:"Tea · Shakes · Mocktails" },
  { id:"des",     t:"Desserts",      s:"Sweet finish" },
];

const ITEMS = [
  // ── Breakfast ──
  { id:"bf1", cat:"bfast", n:"Stuffed paratha with curd", d:"Aloo, gobhi, methi or mooli. Fresh curd and pickle.", p:150, prep:"18 min", diet:["veg"], pop:true, allergens:["Gluten","Dairy"] },
  { id:"bf2", cat:"bfast", n:"Poha", d:"Flattened rice, mustard, curry leaves, peanuts.", p:80, prep:"12 min", diet:["veg","vgn"], quick:true, allergens:[] },
  { id:"bf3", cat:"bfast", n:"Idli sambhar", d:"Steamed rice cakes, lentil broth, coconut chutney.", p:90, prep:"15 min", diet:["veg","vgn"], allergens:[] },
  { id:"bf4", cat:"bfast", n:"Masala dosa", d:"Crisp rice-lentil crêpe with spiced potato.", p:120, prep:"18 min", diet:["veg","vgn"], pop:true, allergens:[] },
  { id:"bf5", cat:"bfast", n:"French fries", d:"Hand-cut, salted, served hot.", p:120, prep:"12 min", diet:["veg"], quick:true, allergens:[] },
  { id:"bf6", cat:"bfast", n:"Paneer pakoda", d:"Cottage cheese fritters, gram flour batter.", p:140, prep:"15 min", diet:["veg"], allergens:["Dairy"] },
  { id:"bf7", cat:"bfast", n:"Cheese sandwich", d:"Toasted bread, melted cheese, mint chutney.", p:120, prep:"12 min", diet:["veg"], quick:true, allergens:["Gluten","Dairy"] },
  { id:"bf8", cat:"bfast", n:"Club sandwich", d:"Triple-decker, paneer, vegetables, fries.", p:150, prep:"15 min", diet:["veg"], allergens:["Gluten","Dairy"] },
  { id:"bf9", cat:"bfast", n:"Omelette with toast", d:"Two eggs, masala or plain. Buttered toast.", p:110, prep:"10 min", diet:["nv"], quick:true, allergens:["Egg","Gluten","Dairy"] },
  { id:"bf10", cat:"bfast", n:"Bread butter & jam", d:"White or brown toast, butter, mixed fruit jam.", p:60, prep:"5 min", diet:["veg"], quick:true, allergens:["Gluten","Dairy"] },

  // ── Soups ──
  { id:"so1", cat:"soup", n:"Cream of tomato", d:"Plum tomatoes finished with cream.", p:90, prep:"12 min", diet:["veg"], quick:true, allergens:["Dairy"] },
  { id:"so2", cat:"soup", n:"Hot & sour (veg)", d:"Peppery, tangy, the classic.", p:99, prep:"15 min", diet:["veg"], pop:true, allergens:["Soy"] },
  { id:"so3", cat:"soup", n:"Cream of mushroom", d:"Blended smooth, topped with cream.", p:109, prep:"15 min", diet:["veg"], allergens:["Dairy"] },
  { id:"so4", cat:"soup", n:"Veg clear soup", d:"Light broth, fresh vegetables.", p:90, prep:"12 min", diet:["veg","vgn"], quick:true, allergens:[] },
  { id:"so5", cat:"soup", n:"Manchow soup", d:"Spicy, with fried noodle garnish.", p:99, prep:"15 min", diet:["veg"], allergens:["Gluten","Soy"] },
  { id:"so6", cat:"soup", n:"Chicken clear soup", d:"Light chicken broth, shredded chicken.", p:120, prep:"15 min", diet:["nv"], allergens:[] },
  { id:"so7", cat:"soup", n:"Chicken hot & sour", d:"The classic with chicken shreds.", p:130, prep:"15 min", diet:["nv"], pop:true, allergens:["Soy"] },
  { id:"so8", cat:"soup", n:"Mutton shorba", d:"Slow-simmered bone broth, whole spices.", p:150, prep:"20 min", diet:["nv"], chef:"Twenty minutes of patience. Worth every one.", allergens:[] },

  // ── Starters (Veg) ──
  { id:"st1", cat:"starter", n:"Paneer tikka", d:"Cottage cheese, mild spices, charcoal-roasted.", p:320, prep:"22 min", diet:["veg"], pop:true, allergens:["Dairy"] },
  { id:"st2", cat:"starter", n:"Mushroom tikka", d:"Button mushrooms, tandoor-roasted.", p:350, prep:"22 min", diet:["veg"], allergens:["Dairy"] },
  { id:"st3", cat:"starter", n:"Paneer tikka achari", d:"Paneer in pickling spices, charcoal.", p:320, prep:"22 min", diet:["veg"], allergens:["Dairy"] },
  { id:"st4", cat:"starter", n:"Hara bhara kebab", d:"Spinach-veg patties, deep-fried, mint sauce.", p:180, prep:"18 min", diet:["veg"], pop:true, allergens:["Gluten"] },
  { id:"st5", cat:"starter", n:"Veg seekh kebab", d:"Mixed vegetable rolls, tandoor skewers.", p:190, prep:"20 min", diet:["veg"], allergens:[] },
  { id:"st6", cat:"starter", n:"Tandoori platter (veg)", d:"Chef's selection of tikkas and kebabs.", p:450, prep:"28 min", diet:["veg"], chef:"My pick of the night, on one plate.", allergens:["Dairy"] },
  { id:"sa1", cat:"starter", n:"Green salad", d:"Cucumber, leaves, lemon wedge.", p:90, prep:"6 min", diet:["veg","vgn","jain"], quick:true, allergens:[] },
  { id:"sa2", cat:"starter", n:"Kachumber salad", d:"Onion, tomato, cucumber, chaat masala.", p:90, prep:"6 min", diet:["veg","vgn"], quick:true, allergens:[] },
  { id:"pp1", cat:"starter", n:"Masala papad", d:"Roasted, topped with onion, tomato, masala.", p:35, prep:"5 min", diet:["veg","vgn"], quick:true, allergens:[] },
  // ── Starters (Non-veg) ──
  { id:"ck1", cat:"starter", n:"Chicken tikka", d:"Boneless, yogurt-marinated, charcoal-roasted.", p:350, prep:"22 min", diet:["nv"], pop:true, allergens:["Dairy"] },
  { id:"ck2", cat:"starter", n:"Malai chicken tikka", d:"Cream-marinated, mild spices, charcoal.", p:380, prep:"22 min", diet:["nv"], chef:"The gentlest thing from the tandoor.", allergens:["Dairy","Nuts"] },
  { id:"ck3", cat:"starter", n:"Tandoori chicken (half)", d:"Classic red marinade, charcoal.", p:320, prep:"25 min", diet:["nv"], pop:true, allergens:["Dairy"] },
  { id:"ck4", cat:"starter", n:"Chicken seekh kebab", d:"Minced chicken, herbs, on skewers.", p:320, prep:"22 min", diet:["nv"], allergens:[] },
  { id:"ck5", cat:"starter", n:"Chicken wings", d:"Fried crisp, house spice rub.", p:280, prep:"20 min", diet:["nv"], allergens:[] },
  { id:"fh1", cat:"starter", n:"Fish tikka", d:"Boneless fish, lemon, ginger-garlic, tandoor.", p:380, prep:"22 min", diet:["nv"], allergens:[] },
  { id:"mt1", cat:"starter", n:"Mutton seekh kebab", d:"Spiced minced mutton on skewers.", p:380, prep:"25 min", diet:["nv"], allergens:[] },
  { id:"mt2", cat:"starter", n:"Tandoori platter (non-veg)", d:"Chicken tikka, seekh, fish, tandoori chicken.", p:650, prep:"30 min", diet:["nv"], chef:"Everything from the tandoor. For two.", allergens:["Dairy"] },

  // ── Indian Mains (Veg) ──
  { id:"pn1", cat:"mains", n:"Paneer butter masala", d:"Cottage cheese in tomato makhani gravy.", p:310, prep:"22 min", diet:["veg"], pop:true, chef:"A house favourite. Best with butter naan.", allergens:["Dairy","Nuts"], pair:"br5" },
  { id:"pn2", cat:"mains", n:"Kadai paneer", d:"Paneer, capsicum, freshly ground spices.", p:310, prep:"22 min", diet:["veg"], allergens:["Dairy"], pair:"br5" },
  { id:"pn3", cat:"mains", n:"Palak paneer", d:"Cottage cheese in rich spinach gravy.", p:280, prep:"20 min", diet:["veg"], pop:true, allergens:["Dairy"], pair:"rc2" },
  { id:"pn4", cat:"mains", n:"Paneer tikka masala", d:"Charcoal-cooked paneer in semi-rich gravy.", p:320, prep:"25 min", diet:["veg"], allergens:["Dairy","Nuts"], pair:"br5" },
  { id:"sb1", cat:"mains", n:"Malai kofta", d:"Cheese-stuffed kofta, creamy rich gravy.", p:220, prep:"25 min", diet:["veg"], pop:true, chef:"Cheese inside, cream outside.", allergens:["Dairy","Nuts","Gluten"], pair:"br5" },
  { id:"sb2", cat:"mains", n:"Mixed veg", d:"Carrot, peas, cauliflower, beans, semi gravy.", p:199, prep:"20 min", diet:["veg"], allergens:["Dairy"] },
  { id:"sb3", cat:"mains", n:"Channa masala", d:"Whole chickpeas in spiced semi gravy.", p:180, prep:"20 min", diet:["veg","vgn"], allergens:[] },
  { id:"sb4", cat:"mains", n:"Bhindi masala", d:"Lady-finger with onion, semi gravy.", p:170, prep:"20 min", diet:["veg","vgn"], allergens:[] },
  { id:"dl1", cat:"mains", n:"Dal fry", d:"Yellow dal, onion, tomato, coriander, butter.", p:165, prep:"18 min", diet:["veg"], allergens:["Dairy"], pair:"rc2" },
  { id:"dl2", cat:"mains", n:"Dal makhani", d:"Black dal, rajma, slow-cooked in cream and butter.", p:199, prep:"25 min", diet:["veg"], pop:true, allergens:["Dairy"], pair:"rc2" },
  { id:"dl3", cat:"mains", n:"Dal Bukhara", d:"Black dal on slow fire, butter, garlic, tomato.", p:220, prep:"25 min", diet:["veg"], chef:"Cooked overnight. The way it should be.", allergens:["Dairy"], pair:"br5" },
  // ── Indian Mains (Non-veg) ──
  { id:"nv1", cat:"mains", n:"Butter chicken", d:"Tandoori chicken in silky tomato-butter gravy.", p:380, prep:"22 min", diet:["nv"], pop:true, chef:"The dish that needs no introduction.", allergens:["Dairy","Nuts"], pair:"br5" },
  { id:"nv2", cat:"mains", n:"Chicken tikka masala", d:"Charcoal-cooked chicken in rich masala.", p:380, prep:"25 min", diet:["nv"], allergens:["Dairy","Nuts"], pair:"br5" },
  { id:"nv3", cat:"mains", n:"Kadai chicken", d:"Chicken, capsicum, freshly ground spices.", p:360, prep:"22 min", diet:["nv"], allergens:["Dairy"] },
  { id:"nv4", cat:"mains", n:"Chicken korma", d:"Mild, creamy, cashew-onion gravy. Mughlai.", p:380, prep:"25 min", diet:["nv"], allergens:["Dairy","Nuts"] },
  { id:"nv5", cat:"mains", n:"Mutton rogan josh", d:"Kashmiri slow-cook, whole spices, red chilli.", p:420, prep:"30 min", diet:["nv"], pop:true, chef:"Patience is the only spice it needs.", allergens:[] },
  { id:"nv6", cat:"mains", n:"Mutton do pyaza", d:"Mutton with double onion — one in gravy, one crisped.", p:400, prep:"28 min", diet:["nv"], allergens:[] },
  { id:"nv7", cat:"mains", n:"Keema mutter", d:"Minced mutton with green peas, semi-dry.", p:350, prep:"22 min", diet:["nv"], allergens:[] },
  { id:"nv8", cat:"mains", n:"Fish curry", d:"Boneless fish, tangy mustard-turmeric gravy.", p:380, prep:"22 min", diet:["nv"], allergens:[] },
  { id:"nv9", cat:"mains", n:"Egg curry", d:"Boiled eggs in onion-tomato masala.", p:180, prep:"18 min", diet:["nv"], allergens:["Egg"] },

  // ── Rice & Breads ──
  { id:"rc1", cat:"rice", n:"Steamed rice", d:"Long-grain basmati, steamed.", p:150, prep:"15 min", diet:["veg","vgn","jain"], allergens:[] },
  { id:"rc2", cat:"rice", n:"Jeera rice", d:"Basmati with cumin and ghee.", p:160, prep:"15 min", diet:["veg"], allergens:["Dairy"] },
  { id:"rc4", cat:"rice", n:"Veg dum biryani", d:"Vegetables, saffron, sealed and steamed.", p:220, prep:"30 min", diet:["veg"], pop:true, chef:"Open the seal at the table.", allergens:["Dairy","Nuts"], pair:"cu1" },
  { id:"rc5", cat:"rice", n:"Chicken biryani", d:"Bone-in chicken, saffron rice, dum-cooked.", p:280, prep:"30 min", diet:["nv"], pop:true, chef:"Our most ordered biryani.", allergens:["Dairy","Nuts"], pair:"cu1" },
  { id:"rc6", cat:"rice", n:"Mutton biryani", d:"Slow-cooked mutton, saffron rice, sealed dum.", p:350, prep:"35 min", diet:["nv"], allergens:["Dairy","Nuts"], pair:"cu1" },
  { id:"rc7", cat:"rice", n:"Egg biryani", d:"Boiled eggs in fragrant rice, mild spice.", p:200, prep:"25 min", diet:["nv"], allergens:["Egg","Dairy"] },
  { id:"br1", cat:"rice", n:"Tandoori roti", d:"Whole-wheat, tandoor-baked.", p:30, prep:"8 min", diet:["veg","vgn"], quick:true, allergens:["Gluten"] },
  { id:"br2", cat:"rice", n:"Butter roti", d:"Tandoori roti brushed with white butter.", p:40, prep:"8 min", diet:["veg"], quick:true, allergens:["Gluten","Dairy"] },
  { id:"br4", cat:"rice", n:"Plain naan", d:"Soft leavened bread, tandoor.", p:45, prep:"10 min", diet:["veg"], quick:true, allergens:["Gluten","Dairy"] },
  { id:"br5", cat:"rice", n:"Butter naan", d:"Naan brushed generously with butter.", p:55, prep:"10 min", diet:["veg"], quick:true, pop:true, allergens:["Gluten","Dairy"] },
  { id:"br6", cat:"rice", n:"Stuffed kulcha", d:"Aloo, paneer or onion — your choice.", p:65, prep:"12 min", diet:["veg"], allergens:["Gluten","Dairy"] },
  { id:"br7", cat:"rice", n:"Lachha paratha", d:"Layered, flaky, ghee-laced.", p:60, prep:"12 min", diet:["veg"], allergens:["Gluten","Dairy"] },
  { id:"br8", cat:"rice", n:"Garlic naan", d:"Roasted garlic and butter.", p:60, prep:"12 min", diet:["veg"], allergens:["Gluten","Dairy"] },
  { id:"cu1", cat:"rice", n:"Boondi raita", d:"Curd, boondi, cumin.", p:99, prep:"8 min", diet:["veg"], quick:true, allergens:["Dairy","Gluten"] },
  { id:"cu2", cat:"rice", n:"Mix veg raita", d:"Cucumber, carrot, tomato in curd.", p:90, prep:"8 min", diet:["veg"], quick:true, allergens:["Dairy"] },
  { id:"cu3", cat:"rice", n:"Plain curd", d:"Set, chilled.", p:70, prep:"4 min", diet:["veg","jain"], quick:true, allergens:["Dairy"] },

  // ── Chinese ──
  { id:"cn1", cat:"chinese", n:"Veg manchurian", d:"Veg balls in soy-ginger sauce. Dry or gravy.", p:180, prep:"20 min", diet:["veg"], pop:true, allergens:["Soy","Gluten"] },
  { id:"cn2", cat:"chinese", n:"Veg hakka noodles", d:"Stir-fried noodles, julienned vegetables.", p:140, prep:"18 min", diet:["veg"], pop:true, allergens:["Gluten","Soy"] },
  { id:"cn3", cat:"chinese", n:"Veg fried rice", d:"Wok-tossed basmati, vegetables, soy.", p:140, prep:"18 min", diet:["veg"], allergens:["Soy"] },
  { id:"cn4", cat:"chinese", n:"Paneer chilli", d:"Cubed paneer, tossed in Chinese sauces.", p:275, prep:"22 min", diet:["veg"], allergens:["Dairy","Soy","Gluten"] },
  { id:"cn5", cat:"chinese", n:"Chicken manchurian", d:"Battered chicken in soy-ginger-garlic sauce.", p:280, prep:"22 min", diet:["nv"], pop:true, allergens:["Soy","Gluten"] },
  { id:"cn6", cat:"chinese", n:"Chilli chicken", d:"Boneless chicken, green chilli, soy sauce.", p:280, prep:"22 min", diet:["nv"], allergens:["Soy","Gluten"] },
  { id:"cn7", cat:"chinese", n:"Chicken hakka noodles", d:"Stir-fried noodles with chicken.", p:220, prep:"20 min", diet:["nv"], allergens:["Gluten","Soy"] },
  { id:"cn8", cat:"chinese", n:"Chicken fried rice", d:"Wok-tossed basmati with chicken, egg.", p:220, prep:"20 min", diet:["nv"], allergens:["Egg","Soy"] },
  { id:"cn9", cat:"chinese", n:"Egg fried rice", d:"Scrambled egg, basmati, spring onion.", p:160, prep:"15 min", diet:["nv"], quick:true, allergens:["Egg","Soy"] },

  // ── Beverages ──
  { id:"bh1", cat:"bev", n:"Masala tea", d:"Cardamom, ginger, single pour.", p:40, prep:"6 min", diet:["veg"], quick:true, allergens:["Dairy"] },
  { id:"bh2", cat:"bev", n:"Coffee", d:"Hot, with milk and sugar.", p:45, prep:"5 min", diet:["veg"], quick:true, allergens:["Dairy"] },
  { id:"bh3", cat:"bev", n:"Pot tea", d:"Two cups, a small pot.", p:70, prep:"8 min", diet:["veg"], quick:true, allergens:["Dairy"] },
  { id:"bc1", cat:"bev", n:"Soft drink", d:"Coke, Sprite, Fanta. Chilled.", p:50, prep:"3 min", diet:["veg","vgn"], quick:true, allergens:[] },
  { id:"bc2", cat:"bev", n:"Fresh lime soda", d:"Sweet or salted.", p:70, prep:"5 min", diet:["veg","vgn","jain"], quick:true, allergens:[] },
  { id:"bc4", cat:"bev", n:"Buttermilk", d:"Chilled chaas, cumin, mint.", p:60, prep:"5 min", diet:["veg"], quick:true, allergens:["Dairy"] },
  { id:"bc5", cat:"bev", n:"Lassi", d:"Sweet or salted. Thick, chilled.", p:80, prep:"5 min", diet:["veg"], quick:true, allergens:["Dairy"] },
  { id:"mk3", cat:"bev", n:"Mint mojito", d:"Fresh mint, lime, soda, sugar.", p:140, prep:"7 min", diet:["veg","vgn","jain"], pop:true, quick:true, allergens:[] },
  { id:"mk4", cat:"bev", n:"Strawberry mojito", d:"Strawberry crush, mint, lime, soda.", p:140, prep:"7 min", diet:["veg","vgn"], quick:true, allergens:[] },
  { id:"sk1", cat:"bev", n:"Mango milkshake", d:"Alphonso pulp, milk, sugar.", p:120, prep:"7 min", diet:["veg"], quick:true, allergens:["Dairy"] },
  { id:"sk2", cat:"bev", n:"Cold coffee", d:"Iced coffee with milk.", p:100, prep:"6 min", diet:["veg"], quick:true, allergens:["Dairy"] },
  { id:"sk3", cat:"bev", n:"Badam shake", d:"Almonds, saffron, milk.", p:140, prep:"8 min", diet:["veg"], quick:true, allergens:["Dairy","Nuts"] },
  { id:"bc6", cat:"bev", n:"Packaged water", d:"Bottled, chilled.", p:30, prep:"2 min", diet:["veg","vgn","jain"], quick:true, allergens:[] },

  // ── Desserts ──
  { id:"de1", cat:"des", n:"Ice cream", d:"Vanilla, strawberry, mango, kesar pista.", p:80, prep:"5 min", diet:["veg"], pop:true, quick:true, allergens:["Dairy","Nuts"] },
  { id:"de2", cat:"des", n:"Hot gulab jamun", d:"Two pieces, warm sugar syrup.", p:70, prep:"6 min", diet:["veg"], pop:true, quick:true, allergens:["Dairy","Gluten"], pair:"de1" },
  { id:"de3", cat:"des", n:"Gulab jamun with ice cream", d:"Warm jamun, cold vanilla.", p:99, prep:"7 min", diet:["veg"], pop:true, quick:true, allergens:["Dairy","Gluten"] },
  { id:"de4", cat:"des", n:"Rasgulla", d:"Two pieces, chilled, sweet syrup.", p:70, prep:"5 min", diet:["veg"], quick:true, allergens:["Dairy"] },
  { id:"de5", cat:"des", n:"Kheer", d:"Rice pudding, cardamom, saffron.", p:90, prep:"8 min", diet:["veg"], quick:true, allergens:["Dairy","Nuts"] },
];

// ── Services ─────────────────────────────────────────────────────────
const SERVICES = [
  { id:"svc_hk", t:"Housekeeping", icon:"hk", items:[
    { id:"hk1", n:"Room cleaning", d:"Full room clean and refresh.", p:0, prep:"20 min" },
    { id:"hk2", n:"Turn-down service", d:"Evening bed preparation, curtains drawn.", p:0, prep:"15 min" },
    { id:"hk3", n:"Extra towels", d:"Fresh bath and hand towels.", p:0, prep:"10 min", quick:true },
    { id:"hk4", n:"Extra pillows", d:"Soft or firm, your choice.", p:0, prep:"10 min", quick:true },
    { id:"hk5", n:"Extra blanket", d:"Warm blanket for cooler nights.", p:0, prep:"10 min", quick:true },
    { id:"hk6", n:"Iron & ironing board", d:"Delivered to your room.", p:0, prep:"10 min", quick:true },
  ]},
  { id:"svc_am", t:"Amenities", icon:"am", items:[
    { id:"am1", n:"Toiletries kit", d:"Shampoo, conditioner, soap, lotion.", p:0, prep:"10 min", quick:true },
    { id:"am2", n:"Dental kit", d:"Toothbrush and toothpaste.", p:0, prep:"10 min", quick:true },
    { id:"am3", n:"Shaving kit", d:"Razor, shaving cream, aftershave.", p:0, prep:"10 min", quick:true },
    { id:"am4", n:"Slippers", d:"Comfortable room slippers.", p:0, prep:"10 min", quick:true },
    { id:"am5", n:"Bathrobe", d:"Plush cotton bathrobe.", p:0, prep:"10 min", quick:true },
    { id:"am6", n:"Shoe shine kit", d:"Polish, brush, cloth.", p:0, prep:"10 min", quick:true },
  ]},
  { id:"svc_sp", t:"Special Requests", icon:"sp", items:[
    { id:"sp1", n:"Birthday setup", d:"Cake, balloons, room decoration.", p:2500, prep:"60 min" },
    { id:"sp2", n:"Champagne & flowers", d:"Bottle of bubbly with fresh flowers.", p:3500, prep:"30 min" },
    { id:"sp3", n:"Late checkout", d:"Request extended checkout time.", p:0, prep:"—" },
    { id:"sp4", n:"Airport transfer", d:"Sedan to the airport.", p:1200, prep:"30 min" },
    { id:"sp5", n:"Wake-up call", d:"We'll ring your room at your chosen time.", p:0, prep:"—" },
  ]},
  { id:"svc_mt", t:"Maintenance", icon:"mt", items:[
    { id:"mt3", n:"AC not working", d:"Engineer will visit.", p:0, prep:"15 min" },
    { id:"mt4", n:"TV / remote issue", d:"Technician will assist.", p:0, prep:"15 min" },
    { id:"mt5", n:"Wi-Fi issue", d:"IT support will call or visit.", p:0, prep:"10 min", quick:true },
    { id:"mt6", n:"Plumbing issue", d:"Plumber will attend.", p:0, prep:"20 min" },
  ]},
];

// ── Photo mappings ───────────────────────────────────────────────────
const IMG_MAP = {
  bf1:"photo-1626700051175-6818013e1d4f", bf2:"photo-1604152135912-04a022e23696",
  bf3:"photo-1567188040759-fb8a883dc6d8", bf4:"photo-1630383249896-424e482df921",
  bf5:"photo-1573080496219-bb080dd4f877", bf6:"photo-1599487488170-d11ec9c172f0",
  bf7:"photo-1528735602780-2552fd46c7af", bf8:"photo-1567234669003-dce7a7a88821",
  bf9:"photo-1525351484163-7529414344d8", bf10:"photo-1525351484163-7529414344d8",
  so1:"photo-1547592180-85f173990554", so2:"photo-1569718212165-3a8278d5f624",
  so3:"photo-1583608205776-bfd35f0d9f83", so4:"photo-1605379399642-870262d3d051",
  so5:"photo-1569718212165-3a8278d5f624", so6:"photo-1605379399642-870262d3d051",
  so7:"photo-1569718212165-3a8278d5f624", so8:"photo-1547592180-85f173990554",
  st1:"photo-1631452180519-c014fe946bc7", st2:"photo-1607301406259-dfb186e15de8",
  st3:"photo-1631452180519-c014fe946bc7", st4:"photo-1601050690597-df0568f70950",
  st5:"photo-1606491956689-2ea866880c84", st6:"photo-1599487488170-d11ec9c172f0",
  sa1:"photo-1546069901-ba9599a7e63c", sa2:"photo-1540420773420-3366772f4999",
  pp1:"photo-1601050690597-df0568f70950",
  ck1:"photo-1599487488170-d11ec9c172f0", ck2:"photo-1599487488170-d11ec9c172f0",
  ck3:"photo-1599487488170-d11ec9c172f0", ck4:"photo-1606491956689-2ea866880c84",
  ck5:"photo-1599487488170-d11ec9c172f0", fh1:"photo-1580476262798-bddd9f4b7369",
  mt1:"photo-1606491956689-2ea866880c84", mt2:"photo-1599487488170-d11ec9c172f0",
  pn1:"photo-1631452180519-c014fe946bc7", pn2:"photo-1565557623262-b51c2513a641",
  pn3:"photo-1604152135912-04a022e23696", pn4:"photo-1631452180519-c014fe946bc7",
  sb1:"photo-1567188040759-fb8a883dc6d8", sb2:"photo-1604152135912-04a022e23696",
  sb3:"photo-1565557623262-b51c2513a641", sb4:"photo-1604152135912-04a022e23696",
  dl1:"photo-1546833999-b9f581a1996d", dl2:"photo-1626700051175-6818013e1d4f",
  dl3:"photo-1626700051175-6818013e1d4f",
  nv1:"photo-1565557623262-b51c2513a641", nv2:"photo-1565557623262-b51c2513a641",
  nv3:"photo-1565557623262-b51c2513a641", nv4:"photo-1565557623262-b51c2513a641",
  nv5:"photo-1545247181-516773cae754", nv6:"photo-1545247181-516773cae754",
  nv7:"photo-1545247181-516773cae754", nv8:"photo-1580476262798-bddd9f4b7369",
  nv9:"photo-1565557623262-b51c2513a641",
  rc1:"photo-1516684732162-798a0062be99", rc2:"photo-1516684732162-798a0062be99",
  rc4:"photo-1563379091339-03b21ab4a4f8", rc5:"photo-1563379091339-03b21ab4a4f8",
  rc6:"photo-1563379091339-03b21ab4a4f8", rc7:"photo-1563379091339-03b21ab4a4f8",
  br1:"photo-1626700051175-6818013e1d4f", br2:"photo-1626700051175-6818013e1d4f",
  br4:"photo-1626700051175-6818013e1d4f", br5:"photo-1626700051175-6818013e1d4f",
  br6:"photo-1626700051175-6818013e1d4f", br7:"photo-1626700051175-6818013e1d4f",
  br8:"photo-1626700051175-6818013e1d4f",
  cu1:"photo-1488477181946-6428a0291777", cu2:"photo-1488477181946-6428a0291777",
  cu3:"photo-1488477181946-6428a0291777",
  cn1:"photo-1585032226651-759b368d7246", cn2:"photo-1551892374-ecf8754cf8b0",
  cn3:"photo-1516684732162-798a0062be99", cn4:"photo-1607301406259-dfb186e15de8",
  cn5:"photo-1585032226651-759b368d7246", cn6:"photo-1599487488170-d11ec9c172f0",
  cn7:"photo-1551892374-ecf8754cf8b0", cn8:"photo-1516684732162-798a0062be99",
  cn9:"photo-1516684732162-798a0062be99",
  bh1:"photo-1576092768241-dec231879fc3", bh2:"photo-1495474472287-4d71bcdd2085",
  bh3:"photo-1597318181409-cf64d0b5d8a2",
  bc1:"photo-1581636625402-29b2a704ef13", bc2:"photo-1556679343-c7306c1976bc",
  bc4:"photo-1488477181946-6428a0291777", bc5:"photo-1488477181946-6428a0291777",
  bc6:"photo-1559839734-2b71ea197ec2",
  mk3:"photo-1556679343-c7306c1976bc", mk4:"photo-1572490122747-3968b75cc699",
  sk1:"photo-1572490122747-3968b75cc699", sk2:"photo-1572490122747-3968b75cc699",
  sk3:"photo-1572490122747-3968b75cc699",
  de1:"photo-1567206563064-6f60f40a2b57", de2:"photo-1567206563064-6f60f40a2b57",
  de3:"photo-1567206563064-6f60f40a2b57", de4:"photo-1567206563064-6f60f40a2b57",
  de5:"photo-1567206563064-6f60f40a2b57",
  // Category heroes
  "cat-bfast":"photo-1626700051175-6818013e1d4f", "cat-soup":"photo-1547592180-85f173990554",
  "cat-starter":"photo-1631452180519-c014fe946bc7", "cat-mains":"photo-1565557623262-b51c2513a641",
  "cat-rice":"photo-1563379091339-03b21ab4a4f8", "cat-chinese":"photo-1585032226651-759b368d7246",
  "cat-bev":"photo-1576092768241-dec231879fc3", "cat-des":"photo-1567206563064-6f60f40a2b57",
};

function imgUrl(id, w) {
  const pid = IMG_MAP[id] || IMG_MAP["cat-"+id];
  if (!pid) return null;
  return `https://images.unsplash.com/${pid}?w=${w||400}&q=65&auto=format&fit=crop`;
}

const fmt = (n, cur) => {
  if (n === 0) return "Complimentary";
  if (cur === "USD") return "$" + (n/82).toFixed(0);
  if (cur === "EUR") return "€" + (n/90).toFixed(0);
  return "₹" + n.toLocaleString("en-IN");
};

Object.assign(window, { HOTEL_DEFAULT, CATS, ITEMS, SERVICES, IMG_MAP, imgUrl, fmt });
