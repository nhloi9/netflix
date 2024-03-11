import React from 'react';
import Sidebar from './Dashboard/Sidebar';

import {CgMenuBoxed} from 'react-icons/cg';
import {TbCategory} from 'react-icons/tb';
import {AiOutlineUser} from 'react-icons/ai';
import MoviesTable from '../Components/MoviesTable';
import {MoviesData} from '../Data/MovieData';

const Dashboard = () => {
	const DashboardData = [
		{
			title: 'Total Movies',
			icon: CgMenuBoxed,
			bg: 'bg-red-400',
			count: 20,
		},
		{
			title: 'Total Categories',
			icon: TbCategory,
			bg: 'bg-blue-500',
			count: 12,
		},
		{
			title: 'Total Users',
			icon: AiOutlineUser,
			bg: 'bg-green-400',
			count: 23,
		},
	];
	return (
		<Sidebar>
			<div className="">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-2">
					{DashboardData.map((item, index) => (
						<div
							key={index}
							className="rounded   bg-main flex items-center p-1 "
						>
							<div className={`p-2 rounded-full  ${item.bg} mr-1`}>
								<item.icon />
							</div>
							<div className="flex flex-col justify-center ">
								<h1 className="font-lg">{item.title}</h1>

								<h1 className="font-lg">{item.count}</h1>
							</div>
						</div>
					))}
				</div>

				<MoviesTable data={MoviesData} />
			</div>
		</Sidebar>
	);
};

export default Dashboard;
