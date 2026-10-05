"use client";
import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import {
  endSession,
  fetchOwnerCarsData,
  onBoardVehicle,
} from "../../lib/actions";
import { usePathname } from "next/navigation";
import LogoutButton from "../../components/LogoutButton";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";

export default function OwnerPortal() {
  const [vehicles, setVehicles] = useState([]);
  const [makeModel, setMakeModel] = useState("");
  const [plate, setPlate] = useState("");
  // const pathName = usePathname();

  useEffect(() => {
    fetchOwnerCars()
      .then((vehiclesData) => {
        setVehicles(vehiclesData);
      })
      .catch((err) => console.error(err));
  }, []);

  const fetchOwnerCars = async () => {
    return await fetchOwnerCarsData();
  };

  const handleOnboard = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const car = await onBoardVehicle(makeModel, plate);
    console.log(car)
    if (!car) throw new Error("Car On-Boarding Failed!");
    window.location.reload();
  };

  return (
    <div className='p-10 font-[helvetica]'>
      <SideBar />
      <div className="ml-64">

      <Header name="Fleet Partner Portal" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          marginTop: "32px",
        }}
      >
        <div>
          <h2>Asset Allocations Portfolio</h2>
          <Table
            headers={[
              "Asset Model",
              "Identification Plate",
              "State Verification",
            ]}
          >
            {vehicles.map((v: any) => (
              <tr key={v.id}>
                <td style={{ padding: "12px 16px" }}>{v.make_model_year}</td>
                <td style={{ padding: "12px 16px" }}>{v.license_plate}</td>
                <td style={{ padding: "12px 16px" }}>{v.status}</td>
              </tr>
            ))}
          </Table>
        </div>
        <div>
          <h2>Register Asset Node</h2>
          <form
            onSubmit={handleOnboard}
            style={{
              backgroundColor: "#fff",
              padding: "24px",
              borderRadius: "8px",
            }}
          >
            <input
              type="text"
              placeholder="Make, Model & Year"
              value={makeModel}
              onChange={(e) => setMakeModel(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", marginBottom: "16px" }}
            />
            <input
              type="text"
              placeholder="License Plate"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", marginBottom: "24px" }}
            />
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "#0366d6",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Add New Vehicle
            </button>
          </form>
        </div>
        </div>
        </div>
    </div>
  );
}
