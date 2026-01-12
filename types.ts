
export interface Evento {
  id: string;
  data: string;
  avvenimento: string;
  anno: number; 
  era: 'a.E.V.' | 'E.V.';
  tipo?: 'evento' | 'libro';
  autore?: string;
}

export interface TimelineGroup {
  periodo: string;
  eventi: Evento[];
}
