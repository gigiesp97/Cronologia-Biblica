
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { timelineData } from './data';
import { Evento } from './types';

interface Personaggio {
  nome: string;
  nascita: number;
  morte: number;
  color: string;
  cat: string;
  desc: string;
}

const personaggi: Personaggio[] = [
  // Primordiali e Patriarchi
  { nome: 'Adamo', nascita: -4026, morte: -3096, color: '#8b4513', cat: 'patriarca', desc: 'Il primo uomo creato da Dio.' },
  { nome: 'Eva', nascita: -4026, morte: -3096, color: '#a0522d', cat: 'storico', desc: 'La prima donna, madre di tutti i viventi.' },
  { nome: 'Caino', nascita: -3900, morte: -3100, color: '#4b5563', cat: 'storico', desc: 'Primo figlio di Adamo ed Eva, agricoltore.' },
  { nome: 'Abele', nascita: -3898, morte: -3700, color: '#64748b', cat: 'storico', desc: 'Secondo figlio di Adamo, pastore fedele ucciso dal fratello.' },
  { nome: 'Set', nascita: -3896, morte: -2984, color: '#8c6d31', cat: 'patriarca', desc: 'Figlio di Adamo nato dopo la morte di Abele.' },
  { nome: 'Enoc', nascita: -3404, morte: -3039, color: '#0ea5e9', cat: 'profeta', desc: 'Camminò con il vero Dio e profetizzò il giudizio.' },
  { nome: 'Matusalemme', nascita: -3339, morte: -2370, color: '#475569', cat: 'patriarca', desc: 'L\'uomo più longevo menzionato nella Bibbia (969 anni).' },
  { nome: 'Noè', nascita: -2970, morte: -2020, color: '#4682b4', cat: 'patriarca', desc: 'Costruttore dell\'arca e sopravvissuto al Diluvio.' },
  { nome: 'Abraamo', nascita: -2018, morte: -1843, color: '#b8860b', cat: 'patriarca', desc: 'Padre di molti popoli e amico di Geova.' },
  { nome: 'Sara', nascita: -2008, morte: -1881, color: '#be185d', cat: 'storico', desc: 'Moglie di Abraamo e madre di Isacco.' },
  { nome: 'Ismaele', nascita: -1932, morte: -1795, color: '#7c2d12', cat: 'storico', desc: 'Primo figlio di Abraamo avuto da Agar.' },
  { nome: 'Isacco', nascita: -1918, morte: -1738, color: '#daa520', cat: 'patriarca', desc: 'Figlio della promessa, padre di Giacobbe ed Esaù.' },
  { nome: 'Giacobbe', nascita: -1858, morte: -1711, color: '#cd853f', cat: 'patriarca', desc: 'Padre delle 12 tribù d\'Israele.' },
  { nome: 'Giuseppe', nascita: -1767, morte: -1657, color: '#d2691e', cat: 'storico', desc: 'Venduto in Egitto, divenne primo ministro del Faraone.' },
  
  // Condottieri e Giudici
  { nome: 'Mosè', nascita: -1593, morte: -1473, color: '#2f4f4f', cat: 'profeta', desc: 'Liberatore d\'Israele e mediatore della Legge.' },
  { nome: 'Aronne', nascita: -1597, morte: -1474, color: '#708090', cat: 'sacerdote', desc: 'Primo Sommo Sacerdote d\'Israele.' },
  { nome: 'Miriam', nascita: -1600, morte: -1474, color: '#9d174d', cat: 'storico', desc: 'Sorella di Mosè e Aronne, profetessa in Israele.' },
  { nome: 'Giosuè', nascita: -1550, morte: -1440, color: '#556b2f', cat: 'giudice', desc: 'Successore di Mosè, guidò Israele in Canaan.' },
  { nome: 'Sansone', nascita: -1150, morte: -1070, color: '#a0522d', cat: 'giudice', desc: 'Uomo dalla forza prodigiosa donata da Dio.' },
  { nome: 'Samuele', nascita: -1150, morte: -1078, color: '#483d8b', cat: 'profeta', desc: 'Ultimo dei giudici e primo dei grandi profeti.' },
  
  // Re
  { nome: 'Davide', nascita: -1107, morte: -1037, color: '#c5a059', cat: 're', desc: 'Il re pastore, autore di molti Salmi e antenato del Messia.' },
  { nome: 'Salomone', nascita: -1050, morte: -998, color: '#daa520', cat: 're', desc: 'Il re più saggio, costruttore del Tempio di Gerusalemme.' },
  { nome: 'Giosia', nascita: -667, morte: -629, color: '#483d8b', cat: 're', desc: 'Giovane re che restaurò la pura adorazione in Giuda.' },
  
  // Profeti
  { nome: 'Elia', nascita: -910, morte: -850, color: '#ff4500', cat: 'profeta', desc: 'Profeta zelante che sfidò l\'adorazione di Baal.' },
  { nome: 'Daniele', nascita: -630, morte: -530, color: '#8a2be2', cat: 'profeta', desc: 'Fedele a Babilonia, interprete di sogni e visioni divine.' },
  
  // Epoca di Gesù e Apostoli
  { nome: 'Gesù', nascita: -2, morte: 33, color: '#800000', cat: 're', desc: 'Il Figlio di Dio, Messia promesso e Salvatore.' },
  { nome: 'Pietro', nascita: 1, morte: 67, color: '#4682b4', cat: 'apostolo', desc: 'L\'apostolo Simone detto Pietro, pilastro della congregazione.' },
  { nome: 'Paolo', nascita: 5, morte: 65, color: '#4b0082', cat: 'apostolo', desc: 'Saulo di Tarso, l\'apostolo delle nazioni e scrittore biblico.' },
  { nome: 'Giovanni', nascita: 6, morte: 100, color: '#008b8b', cat: 'apostolo', desc: 'L\'apostolo amato, autore del quarto Vangelo e di Rivelazione.' },
  { nome: 'Maria', nascita: -18, morte: 45, color: '#be185d', cat: 'storico', desc: 'Madre terrena di Gesù.' },
  { nome: 'Stefano', nascita: 5, morte: 34, color: '#cd5c5c', cat: 'storico', desc: 'Il primo martire cristiano per la fede in Gesù.' },
];

const getIcon = (cat: string) => {
  switch (cat) {
    case 're': return 'fa-crown';
    case 'sacerdote': return 'fa-fire-alt';
    case 'profeta': return 'fa-scroll';
    case 'patriarca': return 'fa-staff-snake';
    case 'giudice': return 'fa-balance-scale';
    case 'apostolo': return 'fa-map-location-dot';
    case 'storico': return 'fa-user-group';
    default: return 'fa-user';
  }
};

const App: React.FC = () => {
  const [transform, setTransform] = useState({ x: 100, y: 0, scale: 0.45 });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<Personaggio | null>(null);
  
  const isDragging = useRef(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastTouchDist = useRef<number | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const DRAG_THRESHOLD = 5;

  const { processedEvents, xMap, sortedYears } = useMemo(() => {
    const allSignificantYearsSet = new Set<number>();
    for (let y = -4000; y <= 400; y += 100) allSignificantYearsSet.add(y);
    timelineData.forEach(e => allSignificantYearsSet.add(e.era === 'a.E.V.' ? -e.anno : e.anno));
    personaggi.forEach(p => {
      allSignificantYearsSet.add(p.nascita);
      allSignificantYearsSet.add(p.morte);
    });
    const sortedUniqueYears = Array.from(allSignificantYearsSet).sort((a, b) => a - b);
    
    const MIN_SPACE = 550; 
    const YEAR_PX = 25;
    let currentX = 0;
    const yearToX: { [key: number]: number } = {};

    sortedUniqueYears.forEach((year, index) => {
      if (index > 0) {
        const yearPrev = sortedUniqueYears[index - 1];
        const timeGap = (year - yearPrev) * YEAR_PX;
        currentX += Math.max(timeGap, MIN_SPACE);
      }
      yearToX[year] = currentX;
    });

    const getX = (y: number) => {
      if (yearToX[y] !== undefined) return yearToX[y];
      const keys = sortedUniqueYears;
      if (y <= keys[0]) return yearToX[keys[0]] - (keys[0] - y) * YEAR_PX;
      if (y >= keys[keys.length - 1]) return yearToX[keys[keys.length - 1]] + (y - keys[keys.length - 1]) * YEAR_PX;
      for (let i = 0; i < keys.length - 1; i++) {
        if (y >= keys[i] && y <= keys[i+1]) {
          const ratio = (y - keys[i]) / (keys[i+1] - keys[i]);
          return yearToX[keys[i]] + ratio * (yearToX[keys[i+1]] - yearToX[keys[i]]);
        }
      }
      return 0;
    };

    const eventsCountAtX: { [key: number]: number } = {};

    const events = timelineData.map((event) => {
      const year = event.era === 'a.E.V.' ? -event.anno : event.anno;
      const x = getX(year);
      
      if (!eventsCountAtX[x]) eventsCountAtX[x] = 0;
      const level = eventsCountAtX[x]++;
      
      const yOffset = event.tipo === 'libro' 
        ? -850 - (level * 220) 
        : -300 - (level * 150); 
        
      return { ...event, x, y: yOffset };
    });

    return { processedEvents: events, xMap: getX, sortedYears: sortedUniqueYears };
  }, []);

  const totalWidth = processedEvents.length > 0 ? processedEvents[processedEvents.length - 1].x + 5000 : 5000;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchTerm.toLowerCase();
    const person = personaggi.find(p => p.nome.toLowerCase().includes(q));
    if (person) {
        const x = xMap(person.nascita);
        setTransform(prev => ({ ...prev, x: window.innerWidth/2 - x * prev.scale, y: -200 }));
        return;
    }
    const book = processedEvents.find(ev => ev.avvenimento.toLowerCase().includes(q));
    if (book) {
      setTransform(prev => ({ ...prev, x: window.innerWidth/2 - book.x * prev.scale, y: 0 }));
    }
  };

  const updateZoom = (delta: number, cx: number, cy: number) => {
    setTransform(prev => {
      const scale = Math.min(Math.max(prev.scale + delta * prev.scale * 1.5, 0.01), 4);
      const wx = (cx - prev.x) / prev.scale;
      const wy = (cy - (window.innerHeight/2 + prev.y)) / prev.scale;
      return { scale, x: cx - wx * scale, y: (cy - window.innerHeight/2) - wy * scale };
    });
  };

  useEffect(() => {
    const v = viewportRef.current;
    const onWheel = (e: WheelEvent) => {
      if (selectedPerson) return;
      e.preventDefault(); 
      updateZoom(-e.deltaY * 0.001, e.clientX, e.clientY); 
    };
    v?.addEventListener('wheel', onWheel, { passive: false });
    return () => v?.removeEventListener('wheel', onWheel);
  }, [transform.scale, transform.x, transform.y, selectedPerson]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    isDragging.current = true;
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    setTransform(p => ({ ...p, x: p.x + dx, y: p.y + dy }));
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const handlePersonClick = (p: Personaggio, e: React.MouseEvent) => {
    const dist = Math.hypot(e.clientX - dragStartPos.current.x, e.clientY - dragStartPos.current.y);
    if (dist < DRAG_THRESHOLD) {
      setSelectedPerson(p);
    }
  };

  /**
   * Calcola l'offset X per mantenere l'etichetta visibile (sticky).
   * Tiene conto della posizione corrente del viewport e dei limiti della barra del personaggio.
   */
  const getStickyX = (barStartX: number, barEndX: number, nome: string) => {
    // La posizione del lato sinistro dello schermo mappata sul canvas
    const viewportLeftInCanvas = -transform.x / transform.scale;
    const padding = 30 / transform.scale; // Margine interno
    
    // Stima approssimativa della larghezza dell'etichetta (icona + testo)
    // Usiamo una larghezza generosa basata sulla lunghezza del nome
    const labelWidth = (80 + (nome.length * 15)) / transform.scale; 
    
    // Dove vorrebbe stare l'etichetta: allineata a sinistra dello schermo
    const desiredOffset = viewportLeftInCanvas - barStartX + padding;
    
    // Non può uscire dalla barra del personaggio (fine barra - larghezza etichetta)
    const maxOffset = (barEndX - barStartX) - labelWidth;
    
    // Restituiamo il valore limitato tra 0 e maxOffset
    return Math.max(0, Math.min(desiredOffset, maxOffset));
  };

  return (
    <div className="viewport bg-[#fdfaf3] overflow-hidden select-none" ref={viewportRef}
         onMouseDown={onMouseDown}
         onMouseMove={onMouseMove}
         onMouseUp={onMouseUp}
         onTouchStart={e => {
           if (e.touches.length === 1) {
             isDragging.current = true;
             dragStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
             lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
           } else if (e.touches.length === 2) {
             isDragging.current = false;
             lastTouchDist.current = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
           }
         }}
         onTouchMove={e => {
           if (e.touches.length === 1 && isDragging.current) {
             const dx = e.touches[0].clientX - lastMousePos.current.x;
             const dy = e.touches[0].clientY - lastMousePos.current.y;
             setTransform(p => ({ ...p, x: p.x + dx, y: p.y + dy }));
             lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
           } else if (e.touches.length === 2 && lastTouchDist.current !== null) {
             const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
             const delta = (dist - lastTouchDist.current) / 100;
             updateZoom(delta, (e.touches[0].clientX + e.touches[1].clientX) / 2, (e.touches[0].clientY + e.touches[1].clientY) / 2);
             lastTouchDist.current = dist;
           }
         }}
         onTouchEnd={() => { isDragging.current = false; lastTouchDist.current = null; }}>
      
      <header className="fixed top-0 inset-x-0 z-[1000] p-6 pointer-events-none flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="pointer-events-auto bg-white/80 backdrop-blur-lg p-5 rounded-3xl border border-[#c5a059]/30 shadow-2xl">
          <h1 className="text-3xl md:text-5xl font-bold serif-title text-[#8c6d31] tracking-tighter uppercase">CRONOLOGIA BIBLICA</h1>
          <p className="text-[10px] tracking-[0.4em] font-black text-[#c5a059] uppercase mt-1">Personaggi ed Eventi Chiave</p>
        </div>
        <form onSubmit={handleSearch} className="pointer-events-auto flex bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-[#c5a059]/40 p-1.5 pl-6 w-full max-w-md">
          <input value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} placeholder="Cerca libro o personaggio..." className="bg-transparent border-none outline-none flex-1 text-amber-950 font-medium serif-body" />
          <button type="submit" className="bg-[#8c6d31] text-white w-12 h-12 rounded-xl flex items-center justify-center hover:bg-[#6b5224] transition-all transform hover:scale-105 active:scale-95">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </header>

      <div className="canvas" style={{ transform: `translate(${transform.x}px, ${window.innerHeight/2 + transform.y}px) scale(${transform.scale})`, transition: isDragging.current ? 'none' : 'transform 0.1s ease-out' }}>
        <div className="absolute h-14 bg-gradient-to-b from-[#e9d5a1] via-[#c5a059] to-[#8c6d31] rounded-full shadow-[0_0_80px_rgba(197,160,89,0.3)] border-4 border-[#fdfaf3]" style={{ width: totalWidth, top: -7, zIndex: 100 }} />

        {sortedYears.filter(y => y % 100 === 0).map((y) => {
          const x = xMap(y);
          return (
            <div key={y} className="absolute flex flex-col items-center pointer-events-none" style={{ left: x, top: 40, zIndex: 90 }}>
              <div className="w-1 h-8 bg-[#c5a059] mb-2 rounded-full" />
              <div className="w-0.5 h-[5000px] bg-[#c5a059]/10 absolute top-[-2500px] z-[-1]" />
              <div className="bg-[#fdfaf3]/60 backdrop-blur-[2px] px-3 py-1 flex flex-col items-center rounded-xl border border-[#c5a059]/20">
                <span className="text-5xl font-bold serif-title text-[#8c6d31] leading-none">{Math.abs(y)}</span>
                <span className="text-[14px] font-black text-[#c5a059] uppercase tracking-[0.3em] mt-1">{y < 0 ? 'a.E.V.' : 'E.V.'}</span>
              </div>
            </div>
          );
        })}

        {personaggi.map((p, i) => {
          const sx = xMap(p.nascita);
          const ex = xMap(p.morte);
          const row = i % 25; 
          const y = 200 + (row * 85); 
          const barWidth = Math.max(ex - sx, 200);
          
          return (
            <div key={p.nome + i} onMouseUp={(e) => handlePersonClick(p, e)} className="absolute h-16 rounded-full border-2 border-white/50 shadow-md transition-all hover:scale-[1.02] hover:z-[200] cursor-pointer overflow-hidden group" 
                 style={{ left: sx, top: y, width: barWidth, backgroundColor: p.color, opacity: 0.9, zIndex: 50 }}>
              <div className="flex items-center gap-4 px-5 h-full will-change-transform" style={{ transform: `translateX(${getStickyX(sx, ex, p.nome)}px)` }}>
                <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center text-white text-lg shrink-0 border border-white/40">
                  <i className={`fa-solid ${getIcon(p.cat)}`} />
                </div>
                <span className="text-white font-bold text-[18px] uppercase tracking-widest serif-title whitespace-nowrap">{p.nome}</span>
              </div>
            </div>
          );
        })}

        {processedEvents.map(e => (
          <div key={e.id} className="absolute" style={{ left: e.x, top: e.y, zIndex: 110 }}>
            <div className="connector-line" style={{ 
                top: e.y < 0 ? '100%' : 'auto', 
                bottom: e.y > 0 ? '100%' : 'auto',
                height: Math.abs(e.y)-10, 
                backgroundColor: e.tipo === 'libro' ? '#c5a059' : '#d1cfc7', 
                width: e.tipo === 'libro' ? 6 : 3, 
                opacity: 0.6 
              }} />
            <div className={`p-8 rounded-[2rem] shadow-2xl border-2 transition-transform hover:scale-105 ${e.tipo === 'libro' ? 'bg-gradient-to-br from-[#8c6d31] to-[#6b5224] text-amber-50 border-[#c5a059]' : 'bg-white/98 text-amber-950 border-amber-100'}`} style={{ transform: 'translateX(-50%)', width: e.tipo === 'libro' ? 420 : 340 }}>
              <div className={`text-xs font-black uppercase tracking-[0.4em] mb-4 ${e.tipo === 'libro' ? 'text-amber-200' : 'text-[#8c6d31]'}`}>{e.data} {e.era}</div>
              <div className="serif-title font-bold leading-tight text-2xl">{e.avvenimento}</div>
              {e.autore && <div className="text-xs text-amber-100/70 mt-5 uppercase font-black border-t border-amber-400/30 pt-4 flex items-center gap-3"><i className="fa-solid fa-pen-fancy" /> {e.autore}</div>}
            </div>
          </div>
        ))}
      </div>

      {selectedPerson && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-[#2d241e]/60 backdrop-blur-md pointer-events-auto" 
             onClick={() => setSelectedPerson(null)}>
          <div className="bg-[#fdfaf3] max-w-xl w-full rounded-[3.5rem] shadow-2xl overflow-hidden border-4 border-[#c5a059] p-8 md:p-14 relative animate-in fade-in zoom-in duration-300" 
               onClick={e=>e.stopPropagation()}>
            <button onClick={()=>setSelectedPerson(null)} className="absolute top-8 right-8 w-14 h-14 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center hover:bg-amber-200 transition-all shadow-md active:scale-95">
              <i className="fa-solid fa-times text-2xl" />
            </button>
            
            <div className="flex flex-col items-center text-center mb-10">
              <div className="relative mb-8">
                <div className="w-52 h-52 rounded-full border-[8px] border-[#c5a059] shadow-2xl overflow-hidden bg-white ring-8 ring-amber-50 flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center bg-amber-100 text-8xl text-[#8c6d31]">
                    <i className={`fa-solid ${getIcon(selectedPerson.cat)}`} />
                  </div>
                </div>
              </div>

              <h2 className="text-5xl font-bold serif-title text-[#8c6d31] tracking-tight">{selectedPerson.nome}</h2>
              <div className="text-sm font-black text-amber-600 uppercase tracking-[0.5em] mt-4 mb-6">
                {selectedPerson.cat === 'storico' ? 'Personaggio' : selectedPerson.cat}
              </div>
              
              <div className="flex items-center gap-4 bg-amber-100/40 px-8 py-3 rounded-full border-2 border-amber-200/30">
                <i className="fa-solid fa-hourglass-start text-amber-700" />
                <span className="text-amber-950 font-black serif-body tracking-wider">
                  {Math.abs(selectedPerson.nascita)} {selectedPerson.nascita < 0 ? 'a.E.V.' : 'E.V.'} — {Math.abs(selectedPerson.morte)} {selectedPerson.morte < 0 ? 'a.E.V.' : 'E.V.'}
                </span>
              </div>
            </div>

            <div className="relative bg-white/40 p-10 rounded-[2.5rem] border border-amber-200/20 shadow-inner">
              <i className="fa-solid fa-quote-left absolute top-6 left-6 text-5xl text-amber-200/30" />
              <p className="text-2xl leading-relaxed text-amber-950 serif-body relative z-10 font-medium italic">
                {selectedPerson.desc}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-10 left-10 flex flex-col gap-4 pointer-events-none max-w-[95vw] z-[600]">
        <div className="flex gap-4 flex-wrap no-scrollbar">
          {[
            { l: 'Re', ic: 'fa-crown', c: 'text-amber-600' },
            { l: 'Sacerdoti', ic: 'fa-fire-alt', c: 'text-red-700' },
            { l: 'Giudici', ic: 'fa-balance-scale', c: 'text-gray-600' },
            { l: 'Profeti', ic: 'fa-scroll', c: 'text-blue-800' },
            { l: 'Patriarchi', ic: 'fa-staff-snake', c: 'text-emerald-800' },
            { l: 'Apostoli', ic: 'fa-map-location-dot', c: 'text-sky-800' },
            { l: 'Personaggi', ic: 'fa-user-group', c: 'text-slate-600' }
          ].map(item => (
            <div key={item.l} className="flex items-center gap-4 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl border-2 border-amber-100 shadow-xl pointer-events-auto">
              <i className={`fa-solid ${item.ic} ${item.c} text-base`} />
              <span className="text-[12px] font-black text-amber-900 uppercase tracking-widest">{item.l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
