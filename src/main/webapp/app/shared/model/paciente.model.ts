import dayjs from 'dayjs';

export interface IPaciente {
  id?: number;
  nome?: string | null;
  idade?: number | null;
  email?: string | null;
  telefone?: string | null;
  whatsapp?: string | null;
  pacienteDesde?: string | null;
  ativo?: boolean | null;
  arquivos?: string | null;
}

export const defaultValue: Readonly<IPaciente> = {
  ativo: false,
};
