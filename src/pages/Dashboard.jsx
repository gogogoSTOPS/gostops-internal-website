const Dashboard = () => {
  const stats = [
    { name: 'Total Claims', value: '24', textColor: 'text-[#0A0A0A]'  },
    { name: 'Pending', value: '12', textColor: 'text-[#FF9800]' },
    { name: 'Accepted', value: '156', textColor: 'text-[#008000]' },
    { name: 'Rejected', value: '8', textColor: 'text-[#FF0000]' },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-[0.625rem] gap-1 border-[0.823px] border-[rgba(0,0,0,0.1)] md:border md:border-[rgba(0,0,0,0.2)] p-[1.125rem]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[0.875rem] leading-[1.25rem] font-normal text-[#717182]">{stat.name}</p>
                <p className={`mt-2 text-[1.5rem] leading-[2rem] font-bold ${stat.textColor}`}>{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-medium">U{item}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    User {item} completed a task
                  </p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

