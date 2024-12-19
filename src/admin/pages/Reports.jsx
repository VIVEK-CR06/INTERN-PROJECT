// src/components/ReportPage.js

import React, { useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';

const Reports = () => {
  const [reports, setReports] = useState([
    { id: 1, title: 'Sales Report', description: 'Detailed sales performance', date: '2024-12-01' },
    { id: 2, title: 'Product Performance', description: 'Top-selling products', date: '2024-12-05' },
    { id: 3, title: 'User Activity', description: 'Active users and trends', date: '2024-12-10' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReports = reports.filter((report) =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AdminNavbar />
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Reports</h1>

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search Reports"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Reports Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-md">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-4 text-left text-sm font-semibold text-gray-600">#</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Title</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Description</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="p-4 text-center text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.length > 0 ? (
                filteredReports.map((report, index) => (
                  <tr key={report.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 text-sm text-gray-700">{index + 1}</td>
                    <td className="p-4 text-sm text-gray-700">{report.title}</td>
                    <td className="p-4 text-sm text-gray-700">{report.description}</td>
                    <td className="p-4 text-sm text-gray-700">{report.date}</td>
                    <td className="p-4 text-center">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No reports found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Reports;
