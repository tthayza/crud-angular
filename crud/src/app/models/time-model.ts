import { Usuario } from './usuario-model';

export interface Time {
  nome: string;
  id: number;
  funcionarios: Usuario[];
}
