import { useState } from "react";
import Filters from "../components/Filters";
import ReviewCard from "../components/ReviewCard";

const Dashboard = () => {
  const [selected, setSelected] = useState('Total Claims');
  const stats = [
    { name: 'Total Claims', value: '24', textColor: 'text-[#0A0A0A]' },
    { name: 'Pending', value: '12', textColor: 'text-[#FF9800]' },
    { name: 'Accepted', value: '156', textColor: 'text-[#008000]' },
    { name: 'Rejected', value: '8', textColor: 'text-[#FF0000]' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 gap-6 flex flex-col">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {stats.map((stat) => {
          const isSelected = selected === stat.name;

          return (
            <div
              key={stat.name}
              className={`bg-white rounded-[0.625rem] gap-1 p-[1.125rem] border-[0.823px] md:border ${isSelected ? "border-black" : "border-[rgba(0,0,0,0.1)]"}`}
              onClick={() => setSelected(stat.name)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[0.75rem] md:text-[0.875rem] leading-[1rem] md:leading-[1.25rem] font-normal text-[#717182]">{stat.name}</p>
                  <p className={`mt-2 text-[1.25rem] md:text-[1.5rem] leading-[1.75rem] md:leading-[2rem] font-bold ${stat.textColor}`}>{stat.value}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Content */}
      {/* Filters */}
      <div className="bg-white rounded-[0.875rem] border-[0.874px] md:border border-[rgba(0,0,0,0.1)] p-4 md:p-6">
        <Filters />
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map(() => <ReviewCard />)}
      </div>
    </div>
  )
}

export default Dashboard

