"use client";
import { useEffect, useState } from "react";
import MetricCard from "../../components/MetricCard";
import Table from "../../components/Table";
import {
  approveCarOnboard,
  fetchAllIncidents,
  fetchAllVehicles,
} from "../../lib/actions";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";

export default function AdminDashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchAllVehicles(), fetchAllIncidents()])
      .then(([vehiclesData, incidentsData]) => {
        setVehicles(vehiclesData);
        setIncidents(incidentsData);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleApproveCar = async (id: string) => {
    approveCarOnboard(id);
    window.location.reload();
  };

  // if (loading) return <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>Loading Analytical Systems Cluster Node Data Matrix...
  // </div>;

  return (
    <div className='p-10 font-[helvetica]'>
      <SideBar />
      <div className="ml-64">
        <Header name="Administration Portal" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
            marginBottom: "40px",
          }}
        >
          <MetricCard
            title="Total Monitored Vehicles"
            value={vehicles.length}
            color="#0366d6"
          />

          <MetricCard
            title="Pending Action Requests"
            value={
              vehicles.filter((v: any) => v.status === "PENDING_APPROVAL")
                .length
            }
            color="#f9c513"
          />

          <MetricCard
            title="Logged System Incidents"
            value={incidents.length}
            color="#d73a49"
          />
        </div>

        <h2 className="mb-8 p-2 text-blue-700 bg-blue-100 h-10 font-extrabold">
          Fleet Management Matrix
        </h2>
        <Table
          headers={[
            "Make/Model",
            "License Plate",
            "Current Fleet Status",
            "Action Controls",
          ]}
        >
          {vehicles.map((v: any) => (
            <tr key={v.id} className="odd:bg-blue-100">
              <td style={{ padding: "12px 16px" }}>{v.make_model_year}</td>
              <td style={{ padding: "12px 16px" }}>{v.license_plate}</td>
              <td style={{ padding: "12px 16px" }}>
                <span
                  style={{
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    backgroundColor:
                      v.status === "AVAILABLE" ? "#dcffe4" : "#fff5b1",
                    color: v.status === "AVAILABLE" ? "#117126" : "#735c0f",
                  }}
                >
                  {v.status}
                </span>
              </td>
              <td style={{ padding: "12px 16px" }}>
                {v.status === "PENDING_APPROVAL" ? (
                  <button
                    onClick={() => handleApproveCar(v.id)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#0366d6",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Approve System Onboarding
                  </button>
                ) : (
                  <button className="bg-green-600 p-1 font-bold w-full text-white">
                    Assign To Driver
                  </button>
                )}
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}
