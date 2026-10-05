import type { SelectOption } from '../../../shared/components/select/select.component';
import type { Responsable } from '../../models/responsables/responsable.model';

export const ESTADOS_SELECT: SelectOption[] = [
  { label: 'Abierto', value: 'Abierto' },
  { label: 'En progreso', value: 'En progreso' },
  { label: 'Resuelto', value: 'Resuelto' },
];

export const PRIORIDADES_SELECT: SelectOption[] = [
  { label: 'Alta', value: 'Alta' },
  { label: 'Media', value: 'Media' },
  { label: 'Baja', value: 'Baja' },
];

export function getCaseStateColor(estado: string): 'yellow' | 'blue' | 'green' | 'gray' {
  switch (estado) {
    case 'Abierto':
      return 'yellow';
    case 'En progreso':
      return 'blue';
    case 'Resuelto':
      return 'green';
    default:
      return 'gray';
  }
}

export function getCasePriorityColor(prioridad: string): 'red' | 'yellow' | 'gray' {
  switch (prioridad) {
    case 'Alta':
      return 'red';
    case 'Media':
      return 'yellow';
    default:
      return 'gray';
  }
}

export function extraerNombreResponsable(responsable: Responsable): string | null {
  return responsable.nombre.trim() || null;
}

export function extraerIdResponsable(responsable: Responsable): string | null {
  return Number.isInteger(responsable.id) ? String(responsable.id) : null;
}

export function crearOpcionesResponsables(
  responsables: Responsable[],
  responsableActual = '',
): SelectOption[] {
  const valores = responsables
    .map((responsable) => ({
      id: extraerIdResponsable(responsable),
      nombre: extraerNombreResponsable(responsable),
    }))
    .filter(
      (responsable): responsable is { id: string; nombre: string } =>
        !!responsable.id && !!responsable.nombre,
    )
    .filter(
      (responsable, indice, arreglo) =>
        arreglo.findIndex((item) => item.id === responsable.id) === indice,
    )
    .map(({ id, nombre }) => ({ label: nombre, value: id }));

  if (responsableActual && !valores.some((opcion) => opcion.value === responsableActual)) {
    valores.unshift({ label: `Responsable #${responsableActual}`, value: responsableActual });
  }

  return valores;
}

export function obtenerMensajeErrorApi(error: unknown, fallback: string): string {
  if (typeof error !== 'object' || error === null) {
    return fallback;
  }

  const response = error as {
    error?: { message?: unknown } | string;
    message?: unknown;
  };
  const apiMessage =
    typeof response.error === 'object' && response.error !== null
      ? response.error.message
      : undefined;

  if (typeof apiMessage === 'string' && apiMessage.trim()) {
    return apiMessage;
  }

  return fallback;
}
