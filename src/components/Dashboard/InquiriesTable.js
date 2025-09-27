import React from 'react';

const InquiriesTable = () => {
  const inquiries = [
    {
      id: 1,
      customer: 'Jane Cooper',
      email: 'jane.cooper@example.com',
      subject: 'Question about pricing',
      date: '2023-10-27',
      status: 'Replied',
      statusColor: 'green'
    },
    {
      id: 2,
      customer: 'Cody Fisher',
      email: 'cody.fisher@example.com',
      subject: 'Partnership opportunity',
      date: '2023-10-26',
      status: 'Pending',
      statusColor: 'yellow'
    },
    {
      id: 3,
      customer: 'Esther Howard',
      email: 'esther.howard@example.com',
      subject: 'Customization request',
      date: '2023-10-25',
      status: 'Replied',
      statusColor: 'green'
    },
    {
      id: 4,
      customer: 'Jenny Wilson',
      email: 'jenny.wilson@example.com',
      subject: 'Feedback on the new template',
      date: '2023-10-24',
      status: 'Archived',
      statusColor: 'gray'
    }
  ];

  const getStatusColor = (color) => {
    const colors = {
      green: 'bg-green-100 text-green-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      gray: 'bg-gray-100 text-gray-800'
    };
    return colors[color] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Inquiries</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {inquiry.customer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {inquiry.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {inquiry.subject}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {inquiry.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(inquiry.statusColor)}`}>
                    {inquiry.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900">
                  <button className="hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InquiriesTable;
