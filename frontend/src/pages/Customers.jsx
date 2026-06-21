import { useEffect, useState } from "react";

import api from "../api/axios";

import Input from "../components/Input";
import Button from "../components/Button";
import DataTable from "../components/DataTable";
import PageHeader from "../components/PageHeader";

export default function Customers() {

  const [customers, setCustomers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    const res = await api.get("/customers");

    setCustomers(res.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/customers", form);

    setForm({
      name: "",
      phone: "",
      email: "",
    });

    loadCustomers();
  };

  const deleteCustomer = async (id) => {
    if (!window.confirm("Apagar cliente?")) {
      return;
    }

    await api.delete(`/customers/${id}`);

    loadCustomers();
  };

  const formattedData = customers.map(
    (customer) => ({
      id: customer.id,

      Nome: customer.name,

      Telefone: customer.phone,

      Email: customer.email,
    })
  );

  return (
    <div>

      <PageHeader title="Clientes" />
<br></br>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >

        <Input
          type="text"
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
          required
        />

        <Input
          type="text"
          name="phone"
          placeholder="Telefone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <Button type="submit" variant="success">
          Criar Cliente
        </Button>

      </form>
<br></br>
      <DataTable
        columns={[
          "Nome",
          "Telefone",
          "Email",
        ]}

        data={formattedData}

        renderActions={(row) => (
          <Button
            variant="darkDanger"
            onClick={() =>
              deleteCustomer(row.id)
            }
          >
            Eliminar
          </Button>
        )}
      />

    </div>
  );
}