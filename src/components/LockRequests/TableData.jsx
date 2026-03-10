import React from 'react'

const TableData = ({
  activeTab,

  pendingData,
  reportsData,
  paginatedPending,
  paginatedReports,

  itemsPerPage,
  pendingPage,
  setPendingPage,
  reportsPage,
  setReportsPage,
  totalPendingPages,
  totalReportsPages,
  totalPendingRecords,
  totalReportsRecords,
  
  openModal,
}) => {
  return (
    <div
      className="bg-white rounded-[0.875rem] border-[0.874px] md:border border-[rgba(0,0,0,0.1)] overflow-hidden flex-1 flex flex-col"
      style={{ width: '100%', minWidth: 0, contain: 'inline-size' }}
    >
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <table className="min-w-[1000px] w-full border-collapse text-left">
          <thead>
            {activeTab === 'pending' ? (
              <tr>
                <th className="py-3.5 px-5 text-[0.6875rem] font-semibold uppercase tracking-wider bg-[#FAFAFA] text-[#717182] border-b border-[#E5E7EB] whitespace-nowrap">Timestamp</th>
                <th className="py-3.5 px-5 text-[0.6875rem] font-semibold uppercase tracking-wider bg-[#FAFAFA] text-[#717182] border-b border-[#E5E7EB] whitespace-nowrap">Property & Room</th>
                <th className="py-3.5 px-5 text-[0.6875rem] font-semibold uppercase tracking-wider bg-[#FAFAFA] text-[#717182] border-b border-[#E5E7EB] whitespace-nowrap">Reason</th>
                <th className="py-3.5 px-5 text-[0.6875rem] font-semibold uppercase tracking-wider bg-[#FAFAFA] text-[#717182] border-b border-[#E5E7EB] whitespace-nowrap">Staff Details</th>
                <th className="py-3.5 px-5 text-[0.6875rem] font-semibold uppercase tracking-wider bg-[#FAFAFA] text-[#717182] border-b border-[#E5E7EB] whitespace-nowrap">Actions</th>
              </tr>
            ) : (
              <tr>
                <th className="py-3.5 px-5 text-[0.6875rem] font-semibold uppercase tracking-wider bg-[#FAFAFA] text-[#717182] border-b border-[#E5E7EB] whitespace-nowrap">Date/Time</th>
                <th className="py-3.5 px-5 text-[0.6875rem] font-semibold uppercase tracking-wider bg-[#FAFAFA] text-[#717182] border-b border-[#E5E7EB] whitespace-nowrap">Location</th>
                <th className="py-3.5 px-5 text-[0.6875rem] font-semibold uppercase tracking-wider bg-[#FAFAFA] text-[#717182] border-b border-[#E5E7EB] whitespace-nowrap">Status</th>
                <th className="py-3.5 px-5 text-[0.6875rem] font-semibold uppercase tracking-wider bg-[#FAFAFA] text-[#717182] border-b border-[#E5E7EB] whitespace-nowrap">Access Duration</th>
                <th className="py-3.5 px-5 text-[0.6875rem] font-semibold uppercase tracking-wider bg-[#FAFAFA] text-[#717182] border-b border-[#E5E7EB] whitespace-nowrap">Actioned By</th>
                <th className="py-3.5 px-5 text-[0.6875rem] font-semibold uppercase tracking-wider bg-[#FAFAFA] text-[#717182] border-b border-[#E5E7EB] whitespace-nowrap">Note/Reason</th>
              </tr>
            )}
          </thead>

          <tbody>
            {/* Pending Rows */}
            {activeTab === 'pending' && paginatedPending.map(row => (
              <tr key={row.id} className="hover:bg-[#FAFBFC] transition-colors group">
                <td className="py-4 px-5 text-[0.875rem] text-[#0A0A0A] border-b border-[#F3F4F6] whitespace-nowrap align-middle">{row.timestamp}</td>
                <td className="py-4 px-5 border-b border-[#F3F4F6] align-middle whitespace-nowrap">
                  <div className="text-[0.875rem] text-[#0A0A0A]">{row.property}</div>
                  <div className="text-[0.75rem] text-[#717182] mt-0.5">{row.room}</div>
                </td>
                <td className="py-4 px-5 text-[0.875rem] text-[#0A0A0A] border-b border-[#F3F4F6] align-middle">{row.reason}</td>
                <td className="py-4 px-5 border-b border-[#F3F4F6] align-middle whitespace-nowrap">
                  <div className="text-[0.875rem] text-[#0A0A0A]">{row.staff}</div>
                  <div className="text-[0.75rem] text-[#717182] mt-0.5">{row.staffPhone}</div>
                  <div className="text-[0.75rem] text-[#717182] mt-0.5">{row.staffEmail}</div>
                </td>
                <td className="py-4 px-5 border-b border-[#F3F4F6] align-middle whitespace-nowrap">
                  <div className="flex gap-2.5">
                    <button
                      onClick={() => openModal('approve', row.id)}
                      className="inline-flex items-center justify-center px-4 py-1.5 bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0] rounded-[0.5rem] text-[0.8125rem] font-medium hover:bg-[#16A34A] hover:text-white transition-colors cursor-pointer"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => openModal('reject', row.id)}
                      className="inline-flex items-center justify-center px-4 py-1.5 bg-[#FEE2E2] text-[#DC2626] border border-[#FECACA] rounded-[0.5rem] text-[0.8125rem] font-medium hover:bg-[#DC2626] hover:text-white transition-colors cursor-pointer"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {/* Reports Rows */}
            {activeTab === 'reports' && paginatedReports.map(row => (
              <tr key={row.id} className="hover:bg-[#FAFBFC] transition-colors group">
                <td className="py-4 px-5 text-[0.875rem] text-[#0A0A0A] border-b border-[#F3F4F6] whitespace-nowrap align-middle">{row.datetime}</td>
                <td className="py-4 px-5 border-b border-[#F3F4F6] align-middle whitespace-nowrap">
                  <div className="text-[0.875rem] text-[#0A0A0A]">{row.location}</div>
                  <div className="text-[0.75rem] text-[#717182] mt-0.5">{row.room}</div>
                </td>
                <td className="py-4 px-5 border-b border-[#F3F4F6] align-middle whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.75rem] font-medium ${row.status === 'Accepted' ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#FEE2E2] text-[#DC2626]'}`}>
                    {row.status}
                  </span>
                </td>
                <td className="py-4 px-5 text-[0.875rem] text-[#0A0A0A] border-b border-[#F3F4F6] align-middle whitespace-nowrap">{row.duration}</td>
                <td className="py-4 px-5 text-[0.875rem] text-[#0A0A0A] border-b border-[#F3F4F6] align-middle whitespace-nowrap">{row.actionedBy}</td>
                <td className={`py-4 px-5 text-[0.875rem] max-w-[280px] border-b border-[#F3F4F6] align-middle ${row.status === 'Rejected' && row.note !== '–' ? 'text-[#DC2626]' : 'text-[#0A0A0A]'}`}>
                  {row.note}
                </td>
              </tr>
            ))}

            {/* Empty State */}
            {((activeTab === 'pending' && paginatedPending.length === 0) || (activeTab === 'reports' && paginatedReports.length === 0)) && (
              <tr>
                <td colSpan="6" className="py-12 text-center text-[#717182] text-sm border-b border-[#F3F4F6]">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 bg-white text-[0.8125rem] text-[#717182]">
        <span className="whitespace-nowrap">
          {activeTab === 'pending' ? (
            totalPendingRecords === 0 ? (
              "Showing 0 of 0 entries"
            ) : (
              `Showing ${(pendingPage - 1) * itemsPerPage + 1}–${Math.min(pendingPage * itemsPerPage, totalPendingRecords)} of ${totalPendingRecords} entries`
            )
          ) : (
            totalReportsRecords === 0 ? (
              "Showing 0 of 0 entries"
            ) : (
              `Showing ${(reportsPage - 1) * itemsPerPage + 1}–${Math.min(reportsPage * itemsPerPage, totalReportsRecords)} of ${totalReportsRecords} entries`
            )
          )}
        </span>
        <div className="flex gap-1 overflow-x-auto max-w-full items-center">
          <button
            disabled={activeTab === 'pending' ? pendingPage === 1 : reportsPage === 1}
            onClick={() => activeTab === 'pending' ? setPendingPage(p => p - 1) : setReportsPage(p => p - 1)}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-[0.5rem] border border-[#E5E7EB] bg-white text-[#717182] hover:bg-[#F3F4F6] disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium text-lg pb-1"
          >‹</button>

          {[...Array(activeTab === 'pending' ? totalPendingPages : totalReportsPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => activeTab === 'pending' ? setPendingPage(i + 1) : setReportsPage(i + 1)}
              className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-[0.5rem] border font-medium text-[0.8125rem] transition-colors ${(activeTab === 'pending' ? pendingPage : reportsPage) === i + 1
                ? 'bg-[#030213] text-white border-[#030213]'
                : 'border-[#E5E7EB] bg-white text-[#0A0A0A] hover:bg-[#F3F4F6]'
                }`}
            >{i + 1}</button>
          ))}

          <button
            disabled={activeTab === 'pending' ? pendingPage === totalPendingPages : reportsPage === totalReportsPages}
            onClick={() => activeTab === 'pending' ? setPendingPage(p => p + 1) : setReportsPage(p => p + 1)}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-[0.5rem] border border-[#E5E7EB] bg-white text-[#717182] hover:bg-[#F3F4F6] disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium text-lg pb-1"
          >›</button>
        </div>
      </div>
    </div>
  )
}

export default TableData