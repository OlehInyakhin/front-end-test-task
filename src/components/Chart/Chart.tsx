import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	LineChart,
	Line,
} from "recharts";
import { ChartProps } from './types';

const COLORS: string[] = [
	"#0088FE",
	"#00C49F",
	"#FFBB28",
	"#FF8042",
	"#8884d8",
	"#82ca9d",
];

export function Chart(props: ChartProps) {
  const { title, type, data, nameKey = 'name', valueKey = 'value', fill = COLORS[0] } = props;

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white p-4 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">
        {title}
      </h2>
      <div className="h-[300px]">
        {type === 'bar' && (
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={nameKey} />
              <YAxis />
              <Tooltip />
              <Bar dataKey={valueKey} fill={fill} />
            </BarChart>
          </ResponsiveContainer>
        )}
        {type === 'pie' && (
          <ResponsiveContainer>
            <PieChart>
								<Pie
									data={data}
									dataKey={valueKey}
									nameKey={nameKey}
									cx="50%"
									cy="50%"
									outerRadius={100}
									label
                >
									{data.map((item, index) => (
										<Cell
											key={`cell-${item.name.replaceAll(' ', '-')}-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
								<Tooltip />
								<Legend />
							</PieChart>
          </ResponsiveContainer>
        )}
        {type === 'line' && (
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={nameKey} fill="#f00" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey={valueKey} stroke={COLORS[4]} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
