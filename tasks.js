/* WCD — Waqt Cut Daalo | Task bank (Hinglish, fun & safe) */
/* c: category key | m: minutes */

const CATEGORIES = {
  all:      { label: "🎲 Sab",      color: "#ff7a1a" },
  masti:    { label: "😜 Masti",    color: "#ff4d6d" },
  creative: { label: "🎨 Creative", color: "#b565ff" },
  dimag:    { label: "🧠 Dimag",    color: "#4da6ff" },
  fitness:  { label: "💪 Fitness",  color: "#3ddc84" },
  dare:     { label: "😎 Dare",     color: "#ffc93d" },
  seekho:   { label: "📚 Seekho",   color: "#ff8a5c" },
};

const TASKS = [
  /* ---------- MASTI ---------- */
  { c: "masti", m: 5,  t: "Sheeshe ke saamne khade hokar 1 minute tak apni best villain wali hasi practice karo." },
  { c: "masti", m: 5,  t: "Apne room ki 5 cheezon ke naye funny naam rakho aur zor se announce karo." },
  { c: "masti", m: 5,  t: "Apne pairon ki sabse artistic photo lo — angle aisa ho jaise koi fashion shoot ho." },
  { c: "masti", m: 15, t: "Apne naam pe 4-line ka rap likho aur use gaake sunao (khud ko hi sahi)." },
  { c: "masti", m: 5,  t: "1 minute me jitne ho sake utne alag-alag animal sounds nikalo. Record bhi kar sakte ho!" },
  { c: "masti", m: 5,  t: "Apne phone ka wallpaper abhi kisi random funny photo se badlo." },
  { c: "masti", m: 15, t: "Koi comedy video mute karke uspe khud funny dubbing karo." },
  { c: "masti", m: 5,  t: "Bina dekhe, 2 minute me apne haath se apna hi portrait banao." },
  { c: "masti", m: 15, t: "Ghar ke 3 kono me jaao aur wahan ki sabse ajeeb cheez dhoondo." },
  { c: "masti", m: 5,  t: "Doston ke group me bina context ke likho: 'kal milte hain, plan bada hai.'" },

  /* ---------- CREATIVE ---------- */
  { c: "creative", m: 5,  t: "'Bored Robot' ka doodle banao — 5 minute, koi rules nahi." },
  { c: "creative", m: 5,  t: "Agar tumhari life pe movie banti to uska title + tagline kya hota? Likho." },
  { c: "creative", m: 15, t: "10 minute me ek chhoti kahani likho jisme ek chammach hero ho." },
  { c: "creative", m: 30, t: "Purane newspaper/magazine se ek collage banao: 'mera dream weekend'." },
  { c: "creative", m: 15, t: "Apne favourite gaane ke lyrics ko apne shabdon me rewrite karo." },
  { c: "creative", m: 5,  t: "Ek naya emoji invent karo — use draw karo aur naam do." },
  { c: "creative", m: 15, t: "Apne room ka naksha banao jaise koi treasure map ho. X marks the spot!" },
  { c: "creative", m: 5,  t: "5 minute me ek paper plane banao jo sabse door ude." },
  { c: "creative", m: 15, t: "Apni subah ki routine ko 4-box wali comic strip me draw karo." },
  { c: "creative", m: 15, t: "Ek imaginary desh banao — naam, flag aur ek kanoon likho." },

  /* ---------- DIMAG ---------- */
  { c: "dimag", m: 5,  t: "Bina calculator ke 47 × 36 solve karo. Phir check karo — kitne close the?" },
  { c: "dimag", m: 15, t: "A se Z tak, har letter se ek desh ka naam likho. Timer lagao!" },
  { c: "dimag", m: 5,  t: "100 se 7 ghatate hue ulta gino (100, 93, 86...) — bina atke." },
  { c: "dimag", m: 5,  t: "'Kaccha papad, pakka papad' 10 baar bina galti ke bolo." },
  { c: "dimag", m: 5,  t: "Apne phone number ke saare digits jodkar single digit tak lao." },
  { c: "dimag", m: 5,  t: "3 minute me 20 aise shabd likho jo 'pa' se shuru hote hon." },
  { c: "dimag", m: 15, t: "Ek sudoku ya crossword ka easy level solve karo." },
  { c: "dimag", m: 5,  t: "Bachpan ke 10 doston ke naam yaad karke likho." },
  { c: "dimag", m: 5,  t: "Kal kya-kya khaya tha, sequence me likho — memory test!" },
  { c: "dimag", m: 5,  t: "5 minute me apne sheher ke 15 mohallon ke naam likho." },

  /* ---------- FITNESS ---------- */
  { c: "fitness", m: 5,  t: "20 jumping jacks + 10 squats — abhi ke abhi. No excuses!" },
  { c: "fitness", m: 5,  t: "1 minute plank challenge — timer lagao." },
  { c: "fitness", m: 5,  t: "Seedhiyon se 5 baar upar-neeche jao (ya 2 minute spot jogging)." },
  { c: "fitness", m: 5,  t: "Apni sabse achhi dance move pe 2 minute full-energy dance karo." },
  { c: "fitness", m: 15, t: "10 pushups + 10 situps + 30 second stretch — 2 round mini circuit." },
  { c: "fitness", m: 5,  t: "Ek pair pe 30 second balance karo — phir doosra pair." },
  { c: "fitness", m: 5,  t: "Deep breathing: 4 sec in, 4 hold, 4 out — 5 round." },
  { c: "fitness", m: 15, t: "Ghar ke har kamre me 10 tez kadam walk karo — full house tour!" },
  { c: "fitness", m: 5,  t: "Wall-sit challenge: deewar ke sahare 1 minute baithe raho." },
  { c: "fitness", m: 5,  t: "Shoulders aur neck ka 5 minute stretch routine karo." },

  /* ---------- DARE ---------- */
  { c: "dare", m: 5,  t: "Best friend ko voice note bhejo: 'bhai tu ekdum legend hai' — bina context ke." },
  { c: "dare", m: 5,  t: "Ghar me kisi ko achanak bina wajah compliment do, reaction note karo." },
  { c: "dare", m: 15, t: "Apni agli chai/coffee kisi aur ke liye banao." },
  { c: "dare", m: 5,  t: "Doston ko bolo tumne ek naya talent seekha hai — phir kuch bhi random karke dikhao." },
  { c: "dare", m: 15, t: "Aaj ghar ka ek kaam bina bole khud kar do." },
  { c: "dare", m: 15, t: "Us dost ko call karo jisse 6 mahine se baat nahi hui." },
  { c: "dare", m: 5,  t: "Apne sabse ajeeb expression wali selfie lo aur 1 ghante ke liye DP banao." },
  { c: "dare", m: 5,  t: "Aaj raaste me kisi ko smile karke 'namaste' bolo." },
  { c: "dare", m: 15, t: "Sibling ya cousin ke liye ek chhota surprise note likhkar chhupao." },
  { c: "dare", m: 5,  t: "Agli baar jab koi gaana baje, zor se gao — sharmao mat!" },

  /* ---------- SEEKHO ---------- */
  { c: "seekho", m: 15, t: "YouTube pe 'origami crane' search karo aur ek kagaz ka crane banao." },
  { c: "seekho", m: 15, t: "5 naye English words seekho aur har ek se ek sentence banao." },
  { c: "seekho", m: 5,  t: "Apne naam ka matlab search karo — kya nikla?" },
  { c: "seekho", m: 5,  t: "Ek naya keyboard shortcut seekho aur aaj use 5 baar istemal karo." },
  { c: "seekho", m: 15, t: "Kisi ek desh ke baare me 5 interesting facts padho." },
  { c: "seekho", m: 15, t: "10 minute me morse code me apna naam likhna seekho." },
  { c: "seekho", m: 5,  t: "Apne phone ki ek aisi setting explore karo jo kabhi kholi hi nahi." },
  { c: "seekho", m: 5,  t: "Ek famous quote yaad karo aur uska matlab apne shabdon me likho." },
  { c: "seekho", m: 15, t: "Speed reading try karo: ek article 3 minute me padhkar summary likho." },
  { c: "seekho", m: 5,  t: "Apna signature 5 alag styles me likho — best wala chuno." },
];
