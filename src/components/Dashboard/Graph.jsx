import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DailyUploadGraph({ data }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tick={{ fill: '#6b7280' }}
            tickMargin={10}
          />
          <YAxis 
            tick={{ fill: '#6b7280' }}
            tickMargin={10}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="uploads"
            stroke="#6366f1"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            name="Daily Uploads"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}