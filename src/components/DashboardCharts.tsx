'use client'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

interface ChartData {
  date: string
  count: number
}

interface DashboardChartsProps {
  data: ChartData[]
}

export default function DashboardCharts({ data }: DashboardChartsProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm bg-grain">
      <h3 className="font-serif text-lg font-bold text-[#1A3C2E] mb-6">Inquiries Received (Last 7 Days)</h3>
      <div className="h-80 w-full font-sans text-xs">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            No chart data available yet.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis 
                dataKey="date" 
                stroke="#64748B" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#64748B" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                labelStyle={{ fontWeight: 'bold', color: '#1A3C2E' }}
              />
              <Line
                type="monotone"
                dataKey="count"
                name="New Enquiries"
                stroke="#C4862A"
                strokeWidth={3}
                activeDot={{ r: 6, fill: '#1A3C2E', stroke: '#E8D5B0', strokeWidth: 2 }}
                dot={{ r: 4, fill: '#C4862A', strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
