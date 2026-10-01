export interface Responsable {
  id: number;
  nombre: string;
  email: string;
  activo: boolean;
}

export type ResponsableInput = Partial<Omit<Responsable, 'id'>>;