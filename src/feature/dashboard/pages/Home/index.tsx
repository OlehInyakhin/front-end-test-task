import React from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "@/hooks";
import { CatModel, useGetCatsQuery } from "@/feature/dashboard/services/catsService";
import { DataItem } from "@/components/Chart/types";
import { Chart } from "@/components/Chart";
import { CatsGrid } from "@/feature/dashboard/components/CatsGrid";

export const HomePage = () => {
	const navigate = useNavigate();
	const isAuthenticated: any = useAppSelector(
		(state: any) => state.auth.isAuthenticated,
	);
	const { data: cats, isLoading, error } = useGetCatsQuery({});

	const [adaptabilityData, setAdaptabilityData] = React.useState<DataItem[]>([]);
	const [affectionData, setAffectionData] = React.useState<DataItem[]>([]);
	const [originData, setOriginData] = React.useState<DataItem[]>([]);
	const [indoorData, setIndoorData] = React.useState<DataItem[]>([]);
	const [lapData, setLapData] = React.useState<DataItem[]>([]);
	const [lifeSpanData, setLifeSpanData] = React.useState<DataItem[]>([]);

	React.useEffect(() => {
		if (!isAuthenticated) {
			navigate('/sign-in');
		}
	}, [isAuthenticated]);

	React.useEffect(() => {
		if (!cats?.length) return;

		setAdaptabilityData(
			cats.map((cat) => ({
				name: cat.name,
				value: cat.adaptability,
			})),
		);

		setAffectionData(
			cats.map((cat) => ({
				name: cat.name,
				value: cat.affection_level,
			})),
		);

		const catsCount = cats?.reduce((
			acc: {
				indoor: number,
				lap: number,
				origins: {
					[key: string]: number;
				}
			},
			cat: CatModel
		) => {
			if (cat.indoor === 1) {
				acc.indoor++;
			}

			if (cat.lap === 1) {
				acc.lap++;
			}

			if (cat.origin) {
				if (typeof acc.origins[cat.origin] === 'number') acc.origins[cat.origin]++
				else acc.origins[cat.origin] = 0
			} else {
				if (typeof acc.origins['Unknown'] === 'number') acc.origins['Unknown']++
				else acc.origins['Unknown'] = 0
			}

			return acc;
		}, {
			indoor: 0,
			lap: 0,
			origins: {},
		});

		setOriginData(
			Object.keys(catsCount.origins).map((objKey) => ({
				name: objKey,
				value: catsCount.origins?.[objKey],
			})).filter((item) => item.value > 0),
		);

		setIndoorData([
			{ name: "Indoor", value: catsCount.indoor},
			{ name: "Outdoor", value: cats.length - catsCount.indoor},
		]);

		setLapData([
			{ name: "Lap Cat", value: catsCount.lap },
			{ name: "Not Lap Cat", value: cats.length - catsCount.lap },
		]);

		setLifeSpanData(
			cats.map((cat) => {
				const rangeArr = cat.life_span.split(' - ');
				return {
					name: cat.name,
					years: Math.floor((parseInt(rangeArr[1]) + parseInt(rangeArr[0])) / 2),
				};
			})
		);
		
	}, [cats]);

	if (isLoading || error) {
		return (
			<div className="flex items-center justify-center h-screen">
				{isLoading ? (
					<div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" />
				) : (
					<div className="text-red-500">Error loading cats data</div>
				)}
			</div>
		);
	}

	return (
		<div className="container w-full mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-8 dark:text-white">Cat Breeds Statistics</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{/* Adaptability Chart */}
				<Chart
					title="Adaptability Distribution"
					type="bar"
					data={adaptabilityData}
				/>
				{/* Affection Levels */}
				<Chart
					title="Affection Levels"
					type="bar"
					data={affectionData}
					fill="#00C49F"
				/>
				{/* Top Origins */}
				<Chart
					title="Top Origins"
					type="pie"
					data={originData}
				/>
				{/* Indoor vs Outdoor Chart */}
				<Chart
					title="Indoor vs Outdoor Preference"
					type="pie"
					data={indoorData}
				/>
				{/* Lap Cat Distribution */}
				<Chart
					title="Lap Cat Distribution"
					type="pie"
					data={lapData}
				/>
				{/* Life Span Distribution */}
				<Chart
					title="Life Span Distribution"
					type="line"
					data={lifeSpanData}
					valueKey="years"
				/>
			</div>
			{/* Cats Grid */}
			<CatsGrid />
		</div>
	);
};
