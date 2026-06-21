import api from "../api/axios";
import { useState } from "react";
import Input from "../components/Input";
import Button from "./Button";

export default function BookingCard({
  booking,
  onDelete,
  onUpdate,
}) {

  const saveBooking = async () => {

  try {

    await api.put(
      `/bookings/${booking.id}`,
      formData
    );

    alert(
      "Reserva atualizada com sucesso"
    );

    onUpdate(
  booking.id,
  formData
);

setEditing(false);

  } catch (err) {

    console.error(err);

    alert(
      "Erro ao atualizar reserva"
    );

  }

};

  const [editing, setEditing] =
  useState(false);

  const [formData, setFormData] =
  useState({
    booking_date:
      booking.booking_date
        ?.split("T")[0],

    booking_time:
      booking.booking_time,

    service:
      booking.service || "",

    notes:
      booking.notes || "",

    service_price:
      booking.service_price || 0,
  });

  const statusColors = {
  pending:
    "bg-yellow-500/20 text-yellow-300",

  confirmed:
    "bg-blue-500/20 text-blue-300",

  completed:
    "bg-green-500/20 text-green-300",
};

  return (
    <div
      className="
        bg-zinc-900
        border
        border-zinc-800
        rounded-2xl
        p-6
        shadow-lg
        flex
        flex-col
        gap-4
      "
    >

      {/* TOP */}
      <div
        className="
          flex
          items-start
          justify-between
        "
      >

        <div>

          <h2
            className="
              text-2xl
              font-bold
              text-white
            "
          >
            {booking.brand} {booking.model}
          </h2>

          <p className="text-zinc-400 font-bold">
            {booking.plate}
          </p>
          <p className="text-zinc-400">
            ⛽︎ - {booking.fuel}
          </p>

        </div>

        <select
  value={booking.status}
  onChange={(e) =>
    booking.onStatusChange(
      booking.id,
      e.target.value
    )
  }
  className={`
    px-3
    py-2
    rounded-xl
    text-sm
    font-medium
    outline-none
    border
    border-zinc-700
    ${statusColors[
      booking.status
    ]}
  `}
>

  <option value="pending">
    Pendente
  </option>

  <option value="confirmed">
    Confirmado
  </option>

  <option value="completed">
    Concluído
  </option>

</select>

      </div>

      {/* CLIENTE */}
      <div>

        <p className="text-zinc-500">
          Cliente
        </p>

        <h3
          className="
            text-lg
            text-white
            font-medium
          "
        >
          {booking.customer_name}
        </h3>

      </div>

      {/* DATA */}
      {editing ? (

  <div className="space-y-4">

    <Input
      type="date"
      value={
  formData.booking_date
}

onChange={(e) =>
  setFormData({
    ...formData,
    booking_date:
      e.target.value,
  })
}
      
    />

    <Input
      type="time"
      value={
  formData.booking_time
}

onChange={(e) =>
  setFormData({
    ...formData,
    booking_time:
      e.target.value,
  })
}
      
    />

  </div>

) : (

  <div
    className="
      flex
      gap-6
    "
  >

    <div>

      <p className="text-zinc-500">
        Data
      </p>

      <h3 className="text-white">
        {new Date(
          booking.booking_date
        ).toLocaleDateString()}
      </h3>

    </div>

    <div>

      <p className="text-zinc-500">
        Hora
      </p>

      <h3 className="text-white">
        {booking.booking_time}
      </h3>

    </div>

  </div>

)}

      {/* SERVIÇO */}
      <div>

  <p className="text-zinc-500">
    Serviço
  </p>

  {editing ? (

    <Input
      value={formData.service}
      onChange={(e) =>
        setFormData({
          ...formData,
          service:
            e.target.value,
        })
      }
 
    />

  ) : (

    <h3 className="text-white">
      {booking.service}
    </h3>

  )}

</div>

      {/* NOTAS */}
      <div>

  <p className="text-zinc-500">
    Notas
  </p>

  {editing ? (

    <textarea
      rows="4"
      value={formData.notes}
      onChange={(e) =>
        setFormData({
          ...formData,
          notes:
            e.target.value,
        })
      }
      className="
        w-full
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
    />

  ) : (

    <p className="text-zinc-300">
      {booking.notes || "-"}
    </p>

  )}

</div>

      {/* PREÇO */}
      <div>

  <p className="text-zinc-500">
    Valor
  </p>

  {editing ? (

    <Input
      type="number"
      value={
        formData.service_price
      }
      onChange={(e) =>
        setFormData({
          ...formData,
          service_price:
            e.target.value,
        })
      }
    />

  ) : (

    <h3
      className="
        text-green-500
        text-xl
        font-bold
      "
    >
      {booking.service_price}€
    </h3>

  )}

</div>

      {/* AÇÕES */}
      <div
        className="
          flex
          gap-3
          mt-2
        "
      >

        {editing ? (

  <>
  {/* btn guardar */}
    <Button
    variant="success"
      onClick={saveBooking}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
  <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
  <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
</svg>
    </Button>


    {/* btn cancelar edicao */}
    <Button
      variant="danger"
      onClick={() =>
        setEditing(false)
      }
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg>
    </Button>
    
  </>

) : (

/* BTN COMECAR EDITAR*/


  
  <Button
    variant="primary"
    onClick={() =>
      setEditing(true)
    }
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>
  </Button>
  

)}|
        
        <Button /* BTN pdf*/
          variant="secundary"
          onClick={() =>
            window.open(
              `https://five0-50-renzo-garage.onrender.com/api/reports/booking/${booking.id}`
            )
          }
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filetype-pdf" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.6 11.85H0v3.999h.791v-1.342h.803q.43 0 .732-.173.305-.175.463-.474a1.4 1.4 0 0 0 .161-.677q0-.375-.158-.677a1.2 1.2 0 0 0-.46-.477q-.3-.18-.732-.179m.545 1.333a.8.8 0 0 1-.085.38.57.57 0 0 1-.238.241.8.8 0 0 1-.375.082H.788V12.48h.66q.327 0 .512.181.185.183.185.522m1.217-1.333v3.999h1.46q.602 0 .998-.237a1.45 1.45 0 0 0 .595-.689q.196-.45.196-1.084 0-.63-.196-1.075a1.43 1.43 0 0 0-.589-.68q-.396-.234-1.005-.234zm.791.645h.563q.371 0 .609.152a.9.9 0 0 1 .354.454q.118.302.118.753a2.3 2.3 0 0 1-.068.592 1.1 1.1 0 0 1-.196.422.8.8 0 0 1-.334.252 1.3 1.3 0 0 1-.483.082h-.563zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638z"/>
</svg>
        </Button>

        <Button
          variant="darkDanger"
          onClick={() =>
            onDelete(booking.id)
          }
        >
          Apagar
        </Button>

      </div>

    </div>
  );
}