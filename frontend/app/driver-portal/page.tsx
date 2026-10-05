'use client';
import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';
import { fetchDriverLeases, fetchDriverUnpaidInvoices, payInvoice, reportCarDefect } from '../../lib/actions';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';

export default function DriverPortal() {
  const [leases, setLeases] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('DEFECT');
  const [selectedLease, setSelectedLease] = useState('');
  
  useEffect(() => {
    Promise.all(
      [fetchDriverLeases(),
      fetchDriverUnpaidInvoices()]
    ).then(([ driverLeases, unpaidDriverInvoices]) => {
      setLeases(driverLeases),
      setInvoices(unpaidDriverInvoices) 
    }).catch(err => console.error(err));
  }, []);

  const handlePay = async (id: string) => {
    return await payInvoice();
    window.location.reload();
  };

  const handleReport = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const report = await reportCarDefect(selectedLease, type, desc);
    
    setDesc('');
  };


  return (
    <div className='p-10 font-[helvetica]'>
      <SideBar />
      <div className='ml-64'>
        <Header name="Driver Portal" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
          }}
        >
          <div>
            <h2 className="font-bold text-blue-600">Outstanding Balances</h2>
            <Table
              headers={[
                "Due Date",
                "Base Charge",
                "Late Fee Premium",
                "Action",
              ]}
            >
              {invoices.map((inv: any) => (
                <tr key={inv.id}>
                  <td style={{ padding: "12px 16px" }}>{inv.due_date}</td>
                  <td style={{ padding: "12px 16px" }}>\${inv.amount_due}</td>
                  <td style={{ padding: "12px 16px", color: "#d73a49" }}>
                    \${inv.late_fee}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <button
                      onClick={() => handlePay(inv.id)}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#2ea44f",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Settle Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </Table>
          </div>

          <div>
            <h2 className="font-bold text-blue-600">
              Log Mechanical Defect / Accident
            </h2>
            <form
              onSubmit={handleReport}
              style={{
                backgroundColor: "#fff",
                padding: "24px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <label className="font-bold text-sm">
                Target Vehicle Allocation
              </label>
              <select
                onChange={(e) => setSelectedLease(e.target.value)}
                required
                style={{ width: "100%", padding: "10px", marginBottom: "16px" }}
              >
                <option value="">Select Lease Contract</option>
                {leases.map((l: any) => (
                  <option key={l.id} value={l.id}>
                    {l.vehicle?.make_model_year} [{l.vehicle?.license_plate}]
                  </option>
                ))}
              </select>

              <label className="font-bold text-sm">Classification</label>
              <select
                onChange={(e) => setType(e.target.value)}
                style={{ width: "100%", padding: "10px", marginBottom: "16px" }}
              >
                <option value="DEFECT">Mechanical Defect Code</option>
                <option value="ACCIDENT">Collision Accident Record</option>
              </select>

              <label className="font-bold text-sm">
                Telemetry Context & Narrative
              </label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
                style={{
                  width: "100%",
                  height: "100px",
                  padding: "10px",
                  marginBottom: "16px",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#d73a49",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Transmit Telemetry Log
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}