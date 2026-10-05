import React from 'react';

interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

export default function Table({ headers, children }: TableProps) {
  return (
    <div className='overflow-x-auto border-gray-300'>
      <table className='border' style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontFamily: 'sans-serif' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f6f8', borderBottom: '2px solid #e1e4e8' }}>
            {headers.map((h, i) => (
              <th key={i} style={{ padding: '12px 16px', color: '#586069', fontSize: '14px' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}