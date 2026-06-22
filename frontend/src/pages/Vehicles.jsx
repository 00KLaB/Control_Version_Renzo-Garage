import { useEffect, useState } from "react";

import api from "../api/axios";
import Input from "../components/Input";
import Button from "../components/Button";
import PlateInput from "../components/PlateInput";
import DataTable from "../components/DataTable";
import PageHeader from "../components/PageHeader";

export default function Vehicles() {

  const [customers, setCustomers] = useState([]);

  const [vehicles, setVehicles] = useState([]);

  const [form, setForm] = useState({
    customer_id: "",
    brand: "",
    model: "",
    plate: "",
    year: "",
    mileage: "",
    fuel: "",
  });

  useEffect(() => {
    loadVehicles();
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    const res = await api.get("/customers");

    setCustomers(res.data);
  };

  const loadVehicles = async () => {
    const res = await api.get("/vehicles");

    setVehicles(res.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  

  const handleSubmit = async (e) => {
  e.preventDefault();


  await api.post("/vehicles", form);

  setForm({
    customer_id: "",
    brand: "",
    model: "",
    plate: "",
    year: "",
    mileage: "",
    fuel: "",
  });

  loadVehicles();
};

  const deleteVehicle = async (id) => {
    if (!window.confirm("Apagar veículo?")) {
      return;
    }

    await api.delete(`/vehicles/${id}`);

    loadVehicles();
  };

  const formattedData = vehicles.map(
    (vehicle) => ({
      id: vehicle.id,

      Cliente:
        vehicle.customer_name,

      Marca: vehicle.brand,

      Modelo: vehicle.model,

      Matrícula: vehicle.plate,

      Ano: vehicle.year,

      KM: vehicle.mileage,

      Combustível: vehicle.fuel,
    })
  );

  return (
    <div>

      <PageHeader title="Veículos" />

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

        <select
          name="customer_id"
          value={form.customer_id}
          onChange={handleChange}
          className="
            bg-blue-100
        border
        border-zinc-700
        rounded-xl
        px-4
        py-3
        text-black
        outline-none
        focus:border-blue-500
        placeholder:text-black
          "
          required
        >
          <option value="">
            Cliente
          </option>

          {customers.map((customer) => (
            <option
              key={customer.id}
              value={customer.id}
            >
              {customer.name}
            </option>
          ))}
        </select>

        <Input
          type="text"
          name="brand"
          placeholder="Marca"
          value={form.brand}
          onChange={handleChange}
          required
        />

        <Input
          type="text"
          name="model"
          placeholder="Modelo"
          value={form.model}
          onChange={handleChange}
          required
        />

        <PlateInput
          value={form.plate}
          onChange={(plate) =>
            setForm({
              ...form,
              plate,
            })
          }
        />

        <Input
          type="number"
          name="year"
          placeholder="Ano"
          value={form.year}
          onChange={handleChange}
        />

        <Input
          type="number"
          name="mileage"
          placeholder="KM"
          value={form.mileage}
          onChange={handleChange}
        />

        <Input
          type="text"
          name="fuel"
          placeholder="Combustível"
          value={form.fuel}
          onChange={handleChange}
        />

        <Button type="submit" variant="success">
          Adicionar Veículo
        </Button>        

      </form>

<br></br>

      <DataTable
        columns={[
          "Cliente",
          "Marca",
          "Modelo",
          "Matrícula",
          "Ano",
          "KM",
          "Combustível",
        ]}

        data={formattedData}

        renderActions={(row) => (
          <Button
            variant="darkDanger"
            onClick={() =>
              deleteVehicle(row.id)
            }
          >
            Eliminar
          </Button>
        )}
      />

    </div>
  );
}