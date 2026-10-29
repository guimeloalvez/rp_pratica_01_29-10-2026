import { pool } from "../database/connection.js";
import { Cliente, CriarCliente } from "../types/cliente.js";

class CamaService {
  async getAll(): Promise<Cliente[]> {
    const res = await pool.query<Cliente>("SELECT * FROM cliente");
    return res.rows;
  }

  async getById(id: string): Promise<Cliente[] | null> {
    const res = await pool.query<Cliente>("SELECT * FROM clientes WHERE id = \$1", [
      id,
    ]);

    const cama = res.rows[0];

    if (!cama) {
      return null;
    }

    return res.rows;
  }

  async create(dados: CriarCliente): Promise<Cliente> {
    const res = await pool.query<Cliente>(
      `INSERT INTO cliente
            (nome, tamanho, quantidade) VALUES ($1, $2, $3) RETURNING *`,
      [],
    );

    const cliente = res.rows[0];

    if (!cama) {
      throw new Error("O banco não retornou a cama cadastrada");
    }

    return cliente;
  }

  async update(id: string, dados: CriarCliente): Promise<Cliente | null> {
    const res = await pool.query<Cliente>(
      `UPDATE cliente 
       SET nome = $1, = $2, = $3 
       WHERE id = $4 RETURNING *`,
      [dados, dados, dados, id],
    );

    const cama = res.rows[0];
    return cama || null;
  }

  async deletarCliente(id: string): Promise<boolean> {
    const res = await pool.query("DELETE FROM cliente WHERE id = \$1", [id]);
    return (res.rowCount ?? 0) > 0;
  }
}

export const camaService = new CamaService();