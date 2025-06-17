import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899'];

export default function CategoryPieChart({ data = [] }) {
  // Ensure `data` is a valid array
  const safeData = Array.isArray(data) ? data : [];
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value, name) => [`${value} images`, name]}
          />
          <Legend 
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{
              paddingLeft: '20px'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}