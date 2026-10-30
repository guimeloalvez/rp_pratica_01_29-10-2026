import { pool } from "../database/connection.js";
import { Cliente, CriarCliente } from "../types/cliente.js";

class ClienteService {
  async getAll(): Promise<Cliente[]> {
    const res = await pool.query<Cliente>("SELECT * FROM cliente");
    return res.rows;
  }

  async getById(id: string): Promise<Cliente[] | null> {
    const res = await pool.query<Cliente>("SELECT * FROM cliente WHERE id = \$1", [
      id,
    ]);

    const cliente = res.rows[0];

    if (!cliente) {
      return null;
    }

    return res.rows;
  }

  async create(dados: CriarCliente): Promise<Cliente> {
    const res = await pool.query<Cliente>(
      `INSERT INTO cliente (nome, telefone, dt_nascimento, email) VALUES ($1, $2, $3, $4) RETURNING *`,
      [
        dados.nome, dados.telefone, dados.dt_nascimento, dados.email
      ],
    );

    const cliente = res.rows[0];

    if (!cliente) {
      throw new Error("O banco não retornou o cliente cadastrado");
    }

    return cliente;
  }

  async update(id: string, dados: CriarCliente): Promise<Cliente | null> {
    const res = await pool.query<Cliente>(
      `UPDATE cliente 
       SET nome = $1, telefone = $2, dt_nascimento = $3, email = $4 
       WHERE id = $5 RETURNING *`,
      [dados.nome, dados.telefone, dados.dt_nascimento, dados.email, id],
    );

    const cliente = res.rows[0];
    return cliente || null;
  }

  async deletarCliente(id: string): Promise<boolean> {
    const res = await pool.query("DELETE FROM cliente WHERE id = \$1", [id]);
    return (res.rowCount ?? 0) > 0;
  }
}

export const clienteService = new ClienteService();