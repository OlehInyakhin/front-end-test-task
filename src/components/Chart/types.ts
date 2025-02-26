export type DataItem = {
	name: string,
	value?: string | number,
	years?: string | number,
}

export type ChartProps = {
  title: string,
  type: 'pie' | 'bar' | 'line',
  data: DataItem[],
  nameKey?: string;
  valueKey?: string;
  fill?: string;
}