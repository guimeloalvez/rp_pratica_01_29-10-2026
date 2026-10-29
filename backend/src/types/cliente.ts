export interface Cliente {
  id: number;
  nome: string;
  telefone: number;
  dt_nascimento: string;
  email: string;
}

export interface CriarCliente {
  nome: string;
  telefone: number;
  dt_nascimento: string;
  email: string;
}
