import pptxgen from "pptxgenjs";

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "OpenAI Codex";
pptx.company = "ASE";
pptx.subject = "McDonald's - Strategie Globala";
pptx.title = "McDonald's - Strategie Globala";

const C = { red: "DA291C", yellow: "FFC72C", cream: "FFF8EE", white: "FFFFFF", dark: "3A2A22", muted: "666666", line: "E8D8BF", sand: "F6EAD1" };
const OUT = "deliverables/McDonalds_ASE_Strategie_Globala.pptx";
const AR = "https://www.sec.gov/Archives/edgar/data/63908/000006390825000012/mcd-20241231.htm";
const WHO = "https://corporate.mcdonalds.com/corpmcd/our-company/who-we-are.html";
const ATA = "https://corporate.mcdonalds.com/corpmcd/our-company/who-we-are/accelerating-the-arches.html";
const OPR = "https://corporate.mcdonalds.com/corpmcd/our-company/where-we-operate.html";
const BIZ = "https://corporate.mcdonalds.com/corpmcd/our-company/who-we-are/business-model-and-growth-strategy.html";
const PR20 = "https://corporate.mcdonalds.com/corpmcd/our-stories/article/new-growth-strategy.html";
const PR23 = "https://corporate.mcdonalds.com/corpmcd/our-stories/article/mcd-announces-targets-development-loyalty-membership-cloud-tech.html";

function base(slide, cover = false) {
  slide.background = { color: cover ? C.red : C.cream };
  if (!cover) {
    slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 0.33, line: { color: C.red, transparency: 100 }, fill: { color: C.red } });
    slide.addShape(pptx.ShapeType.rect, { x: 12.6, y: 0, w: 0.73, h: 7.5, line: { color: C.yellow, transparency: 100 }, fill: { color: C.yellow } });
  }
}

function title(slide, t, s = "") {
  slide.addText(t, { x: 0.65, y: 0.52, w: 10, h: 0.4, fontFace: "Aptos Display", fontSize: 24, bold: true, color: C.dark, margin: 0 });
  if (s) slide.addText(s, { x: 0.66, y: 0.93, w: 9.5, h: 0.22, fontSize: 10.3, color: C.muted, margin: 0 });
}

function footer(slide, items) {
  slide.addShape(pptx.ShapeType.line, { x: 0.65, y: 6.72, w: 11.4, h: 0, line: { color: C.line, width: 1 } });
  slide.addText("Surse:", { x: 0.65, y: 6.8, w: 0.5, h: 0.18, fontSize: 8.5, bold: true, color: C.muted, margin: 0 });
  const runs = [];
  items.forEach((i, idx) => {
    runs.push({ text: i[0], options: { hyperlink: { url: i[1] }, color: C.red, underline: { color: C.red } } });
    if (idx < items.length - 1) runs.push({ text: " | ", options: { color: C.muted } });
  });
  slide.addText(runs, { x: 1.08, y: 6.79, w: 11.05, h: 0.2, fontSize: 8.1, margin: 0 });
}

function card(slide, x, y, w, h, t, b, fc = C.white) {
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.05, line: { color: C.line, width: 1 }, fill: { color: fc } });
  slide.addText(t, { x: x + 0.15, y: y + 0.14, w: w - 0.3, h: 0.22, fontSize: 12, bold: true, color: C.red, margin: 0 });
  slide.addText(b, { x: x + 0.15, y: y + 0.42, w: w - 0.3, h: h - 0.5, fontSize: 11, color: C.dark, margin: 0.03, valign: "top" });
}

function metric(slide, x, y, w, h, v, l) {
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.05, line: { color: C.line, width: 1 }, fill: { color: C.white } });
  slide.addText(v, { x: x + 0.12, y: y + 0.16, w: w - 0.24, h: 0.3, fontSize: 21, bold: true, color: C.red, align: "center", margin: 0 });
  slide.addText(l, { x: x + 0.12, y: y + 0.58, w: w - 0.24, h: 0.24, fontSize: 10, color: C.dark, align: "center", margin: 0 });
}

function bullets(slide, lines, x, y, w, h, size = 14, color = C.dark) {
  slide.addText(lines.map((t) => ({ text: t, options: { bullet: { indent: 12 } } })), { x, y, w, h, fontSize: size, color, breakLine: true, paraSpaceAfterPt: 10, margin: 0.03 });
}

let s = pptx.addSlide();
base(s, true);
s.addShape(pptx.ShapeType.rect, { x: 0.65, y: 0.62, w: 1.1, h: 0.11, line: { color: C.yellow, transparency: 100 }, fill: { color: C.yellow } });
s.addText("McDonald's", { x: 0.65, y: 1.05, w: 5.2, h: 0.5, fontFace: "Aptos Display", fontSize: 27, bold: true, color: C.white, margin: 0 });
s.addText("Misiune, viziune si prezenta globala", { x: 0.65, y: 1.7, w: 7, h: 0.35, fontSize: 20, color: C.sand, margin: 0 });
s.addText("Proiect - Strategie Globala | ASE anul 1, semestrul 2", { x: 0.66, y: 2.22, w: 6, h: 0.22, fontSize: 10.5, color: C.sand, margin: 0 });
card(s, 7.55, 1.08, 4.85, 4.8, "De ce McDonald's?", "Brand global emblematic.\nStrategie usor de legat de extinderea internationala.\nDate publice abundente din surse oficiale.\nExemplu bun de coerenta intre identitate si executie.", "B11F14");
s.addText("Echipa: Colegul 1 | Colegul 2 | Colegul 3 | Colegul 4", { x: 0.66, y: 6.55, w: 6.1, h: 0.2, fontSize: 10.5, color: C.sand, margin: 0 });
s.addText("Surse principale: McDonald's Corporate si McDonald's Annual Report 2024", { x: 0.66, y: 6.84, w: 7.8, h: 0.18, fontSize: 8.2, color: "F5DFA9", margin: 0 });

s = pptx.addSlide();
base(s);
title(s, "1. Profil global al companiei", "Imagine de ansamblu pe baza raportarii oficiale.");
metric(s, 0.75, 1.45, 2.25, 1.25, "43.477", "restaurante la final de 2024");
metric(s, 3.18, 1.45, 2.25, 1.25, ">100", "tari in care opereaza");
metric(s, 5.61, 1.45, 2.25, 1.25, "95%", "restaurante francizate");
metric(s, 8.04, 1.45, 2.25, 1.25, "2.116", "restaurante noi in 2024");
card(s, 0.75, 3.03, 5.7, 2.65, "Ce ne arata aceste date", "McDonald's este unul dintre cele mai extinse lanturi quick-service din lume.\nModelul este construit pentru scalare globala prin franciza.\nRitmul de deschidere confirma ca dezvoltarea internationala ramane o prioritate.");
card(s, 6.75, 3.03, 5.8, 2.65, "Ideea-cheie pentru proiect", "La McDonald's, prezenta globala nu este un rezultat secundar, ci un instrument central prin care compania isi duce misiunea, isi creste relevanta si isi sustine avantajul competitiv.", C.sand);
footer(s, [["Annual Report 2024", AR], ["Corporate Home", "https://corporate.mcdonalds.com/corpmcd/home.html"]]);

s = pptx.addSlide();
base(s);
title(s, "2. Misiunea oficiala si pozitionarea", "Misiunea este declarata explicit pe site-ul corporativ.");
s.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 1.32, w: 11.55, h: 1, rectRadius: 0.04, line: { color: C.red, width: 1.3 }, fill: { color: "FFF1ED" } });
s.addText('"Making delicious feel-good moments easy for everyone."', { x: 1.05, y: 1.63, w: 11.05, h: 0.25, fontSize: 21, bold: true, italic: true, color: C.red, align: "center", margin: 0 });
card(s, 0.8, 2.7, 3.6, 2.95, "Ce nevoie satisface", "Hrana rapida, accesibila, familiara si convenabila, livrata intr-o experienta usor de repetat: restaurant, drive-thru, delivery sau digital.");
card(s, 4.63, 2.7, 3.6, 2.95, "Pentru cine creeaza valoare", "Pentru clienti, prin pret si viteza; pentru francizati, prin forta brandului; pentru comunitati, prin locuri de munca; pentru actionari, printr-un model scalabil.");
card(s, 8.46, 2.7, 3.6, 2.95, "Ce o diferentiaza", "Brand iconic, retea uriasa, standardizare puternica si adaptare locala a meniului, marketingului si operatiunilor.");
footer(s, [["Who We Are", WHO], ["Accelerating the Arches", ATA], ["Business Model", BIZ]]);

s = pptx.addSlide();
base(s);
title(s, "3. Viziunea strategica", "McDonald's nu afiseaza separat o fraza numita 'vision'; aici este inferenta din sursele oficiale.");
s.addShape(pptx.ShapeType.roundRect, { x: 0.82, y: 1.35, w: 11.45, h: 1.18, rectRadius: 0.05, line: { color: C.yellow, width: 1.3 }, fill: { color: C.dark } });
s.addText("A ramane brandul global lider de restaurant omni-channel si a extinde reteaua catre 50.000 de restaurante pana in 2027.", { x: 1.05, y: 1.67, w: 11, h: 0.4, fontSize: 19, bold: true, color: C.white, align: "center", margin: 0.02 });
card(s, 0.82, 2.95, 3.58, 2.8, "Orientare pe termen lung", "Strategia 'Accelerating the Arches' inseamna crestere sustinuta, investitii in digital, delivery, drive-thru si dezvoltare de restaurante noi.");
card(s, 4.88, 2.95, 3.58, 2.8, "Ambitie globala", "Tintirea pragului de 50.000 de restaurante pana in 2027 arata clar intentia de extindere internationala accelerata.");
card(s, 8.94, 2.95, 3.18, 2.8, "Relevanta academica", "Viziunea nu este doar despre marime, ci despre leadership global si integrarea tuturor canalelor prin care clientul comanda.");
footer(s, [["Growth Strategy", ATA], ["New Targets 2023", PR23], ["Strategy PR 2020", PR20]]);

s = pptx.addSlide();
base(s);
title(s, "4. Prezenta globala: harta regionala simplificata", "McDonald's isi grupeaza prezenta in 5 mari regiuni pe pagina oficiala 'Where We Operate'.");
s.addShape(pptx.ShapeType.roundRect, { x: 0.86, y: 1.32, w: 11.35, h: 4.96, rectRadius: 0.04, line: { color: C.line, width: 1 }, fill: { color: "FFFDF9" } });
card(s, 1.05, 2.0, 2.3, 1.12, "North America", "SUA, Canada, Mexic,\nPuerto Rico, Panama");
card(s, 1.55, 3.9, 1.95, 1.1, "South America", "Brazilia, Argentina,\nChile, Peru, Uruguay");
card(s, 4.25, 1.7, 2.15, 1.05, "Europa", "Romania, Franta,\nGermania, UK, Polonia");
card(s, 4.5, 3.45, 1.85, 1.05, "Africa", "Egipt, Maroc,\nAfrica de Sud, Tunisia");
card(s, 7.55, 2.1, 3.35, 1.35, "Asia & Oceanic", "China, Japonia, India,\nAustralia, Coreea de Sud,\nSingapore, Vietnam");
s.addText("Observatie: prezenta este foarte larga, dar cu concentrari puternice in SUA, Europa si Asia/Oceania.", { x: 1.0, y: 5.55, w: 10.5, h: 0.24, fontSize: 12.2, color: C.dark, bold: true, align: "center", margin: 0 });
footer(s, [["Where We Operate", OPR], ["Annual Report 2024", AR]]);

s = pptx.addSlide();
base(s);
title(s, "5. Piete-cheie si structura geografica", "Raportarea McDonald's separa reteaua in trei segmente majore.");
s.addTable(
  [
    ["Segment", "Restaurante 2024", "Rol strategic", "Exemple oficiale"],
    ["SUA", "13.557", "Cea mai mare piata; baza pentru testare, brand si profitabilitate.", "Statele Unite"],
    ["International Operated Markets", "10.512", "Piete mature importante, operate si francizate de companie.", "Australia, Canada, Franta, Germania, Italia, Polonia, Spania, UK"],
    ["International Developmental Licensed Markets & Corporate", "19.408", "Extindere larga prin parteneri/licentiati; crestere si adaptare locala.", "Include, printre altele, China si Japonia"],
  ],
  { x: 0.72, y: 1.55, w: 11.45, h: 2.62, border: { type: "solid", color: C.line, pt: 1 }, fill: C.white, color: C.dark, fontSize: 11.1, rowH: 0.62, colW: [2.45, 1.5, 3.9, 3.6], margin: 0.04, autoFit: false },
);
card(s, 0.72, 4.48, 5.4, 1.45, "Concluzie de lectura a structurii", "Prezenta globala este larga dispersata, dar gestionata diferit: direct in pietele foarte importante si prin licente/francize acolo unde adaptarea locala si scalarea rapida sunt mai eficiente.");
metric(s, 6.55, 4.48, 1.75, 1.45, "95%", "francizat - total");
metric(s, 8.5, 4.48, 1.75, 1.45, "89%", "francizat - IOM");
metric(s, 10.45, 4.48, 1.75, 1.45, "99%", "francizat - IDL");
footer(s, [["Annual Report 2024", AR], ["Where We Operate", OPR]]);

s = pptx.addSlide();
base(s);
title(s, "6. Legatura dintre strategie si prezenta globala", "Extinderea internationala sustine direct strategia oficiala 'Accelerating the Arches'.");
card(s, 0.82, 1.55, 3.6, 1.85, "Mission fit", "Daca misiunea este sa ofere momente delicioase si usor accesibile tuturor, atunci densitatea mare de restaurante si proximitatea fata de client sunt esentiale.");
card(s, 4.86, 1.55, 3.6, 1.85, "Omni-channel fit", "Prezenta larga permite dezvoltarea canalelor delivery, digital si drive-thru la scara mare, nu doar in cateva tari izolate.");
card(s, 8.9, 1.55, 3.2, 1.85, "Development fit", "Obiectivul de 50.000 de restaurante pana in 2027 transforma expansiunea geografica intr-un obiectiv explicit, masurabil.");
card(s, 0.82, 3.75, 5.55, 1.9, "De ce functioneaza modelul McDonald's", "Compania combina standardizarea globala a marcii si operatiunilor cu libertate locala in meniu, marketing si implicare comunitara.");
card(s, 6.68, 3.75, 5.44, 1.9, "Exemple concrete", "McDonald's vorbeste oficial despre 'freedom within a framework', despre proximitatea fata de client pentru delivery si despre noi restaurante in piete cu randamente puternice si potential pe termen lung.");
footer(s, [["Business Model", BIZ], ["Growth Strategy", ATA], ["New Targets 2023", PR23]]);

s = pptx.addSlide();
base(s);
title(s, "7. Este prezenta globala coerenta cu identitatea strategica?", "Evaluare sintetica a coerentei dintre identitate, strategie si geografie.");
metric(s, 0.88, 1.45, 2.35, 1.2, "Da", "coerenta generala");
metric(s, 3.48, 1.45, 2.35, 1.2, "Ridicata", "aliniere misiune-expansiune");
metric(s, 6.08, 1.45, 2.35, 1.2, "Foarte buna", "aliniere strategie-canale");
metric(s, 8.68, 1.45, 2.65, 1.2, "Controlata", "adaptare locala in cadru comun");
card(s, 0.88, 3.05, 3.65, 2.15, "Argument 1", "Misiunea pune accent pe accesibilitate si usurinta, iar reteaua globala exact asta livreaza: acces rapid si repetabil pentru milioane de clienti.");
card(s, 4.83, 3.05, 3.65, 2.15, "Argument 2", "Viziunea urmareste leadership global omni-channel; aceasta nu poate exista fara prezenta fizica larga si infrastructura internationala robusta.");
card(s, 8.78, 3.05, 3.0, 2.15, "Argument 3", "Franciza ajuta compania sa creasca global fara sa piarda ancorarea locala in comunitatile servite.");
footer(s, [["Who We Are", WHO], ["Business Model", BIZ], ["Annual Report 2024", AR]]);

s = pptx.addSlide();
base(s);
title(s, "8. Concluzii", "Mesajul final al echipei.");
card(s, 0.95, 1.45, 11.15, 4.2, "Concluzie", "");
bullets(s, [
  "McDonald's are o misiune clara si usor de conectat cu activitatea sa internationala.",
  "Viziunea strategica poate fi citita din sursele oficiale ca dorinta de a ramane lider global omni-channel si de a accelera cresterea la 50.000 de restaurante pana in 2027.",
  "Prezenta companiei este larga dispersata la nivel global, dar cu piete-cheie foarte importante in SUA, Europa si Asia.",
  "Strategia si prezenta globala sunt coerente: extinderea nu contrazice identitatea McDonald's, ci o operationalizeaza.",
], 1.28, 1.95, 10.35, 2.45, 16.5);
s.addText("Concluzia echipei: McDonald's este un exemplu puternic de companie globala in care misiunea, modelul de business, strategia si geografia internationala functioneaza in aceeasi directie.", { x: 1.28, y: 4.92, w: 10.1, h: 0.38, fontSize: 15, bold: true, color: C.red, align: "center", margin: 0.02 });
footer(s, [["Who We Are", WHO], ["Growth Strategy", ATA], ["Annual Report 2024", AR]]);

s = pptx.addSlide();
base(s);
title(s, "9. Surse oficiale", "Linkuri utile pentru bibliografie si intrebari din partea cadrului didactic.");
card(s, 0.82, 1.4, 11.4, 4.95, "Bibliografie", [
  "1. McDonald's Corporate - Who We Are",
  WHO,
  "2. McDonald's Corporate - Accelerating the Arches",
  ATA,
  "3. McDonald's Corporate - Where We Operate",
  OPR,
  "4. McDonald's Corporate - Business Model and Growth Strategy",
  BIZ,
  "5. McDonald's press release - New Growth Strategy (2020)",
  PR20,
  "6. McDonald's press release - New Targets for Development (2023)",
  PR23,
  "7. McDonald's Annual Report 2024 / Form 10-K",
  AR,
].join("\n"));
footer(s, [["McDonald's Corporate", "https://corporate.mcdonalds.com/corpmcd/home.html"], ["SEC Filing", AR]]);

await pptx.writeFile({ fileName: OUT });
console.log(`Created ${OUT}`);
