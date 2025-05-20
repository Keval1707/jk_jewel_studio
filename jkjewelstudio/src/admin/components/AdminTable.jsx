import React from "react";

const AdminTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }

  const headers = Object.keys(data[0]);

  return (
    <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead style={{ background: "#ddd" }}>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header.toUpperCase()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {headers.map((header) => (
              <td key={header}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminTable;
