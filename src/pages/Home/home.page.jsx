import { useEffect, useState } from 'react';
import { getAllActivities } from '../../services/activity.service';
import { Link } from 'react-router-dom';
import formatDateTime from '../../helpers/helper';
import CallIcon from '../../components/CallIcon/callIcon';

export default function Home() {
	const [activeTab, setActiveTab] = useState('Activity');
	const [activities, setActivities] = useState([]);
	const [logs, setLogs] = useState({});
	const tabs = ['Activity', 'Archived'];

	const handleTabClick = (tab) => {
		setActiveTab(tab);

		if (tab === 'Activity') {
			setLogs(groupByDate(activities.filter((activity) => !activity.is_archived)));
		} else {
			setLogs(groupByDate(activities.filter((activity) => activity.is_archived)));
		}
		console.log('logs', logs);
	};

	useEffect(() => {
		const getActivities = async () => {
			try {
				const response = await getAllActivities();
				// setCategories(response.categories);
				setActivities(response.data);
				setLogs(groupByDate(response.data.filter((activity) => !activity.is_archived)));
				console.log(response.data);
			} catch (error) {
				console.error('Error fetching categories:', error);
			}
		};

		getActivities();
	}, []);

	const groupByDate = (logs) => {
		// Group logs by date
		const groupedLogs = logs.reduce((acc, log) => {
			const date = new Date(log.created_at).toISOString().split('T')[0];
			if (!acc[date]) {
				acc[date] = [];
			}
			acc[date].push(log);
			return acc;
		}, {});

		// Sort dates in descending order
		const sortedGroups = Object.keys(groupedLogs).sort((a, b) => new Date(b) - new Date(a));

		// Sort logs for each date in descending order
		const sortedGroupedLogs = sortedGroups.reduce((acc, date) => {
			acc[date] = groupedLogs[date].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
			return acc;
		}, {});

		return sortedGroupedLogs;
	};

	return (
		<div>
			<div className="mb-4 border-b border-gray-200">
				<ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
					{tabs.map((tab) => {
						return (
							<li key={tab} className="w-1/2" role="presentation">
								<button
									className={`inline-block p-4 border-b-2 w-full ${
										activeTab === tab
											? 'bg-green-600 text-white'
											: 'hover:text-gray-500 hover:bg-gray-300'
									}`}
									type="button"
									aria-selected={activeTab === tab}
									onClick={() => handleTabClick(tab)}>
									{tab}
								</button>
							</li>
						);
					})}
				</ul>
			</div>
			<div>
				{Object.keys(logs).map((date) => {
					return (
						<div key={date} className="p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 ">
							<div className="text-lg font-semibold text-gray-900 ">{date}</div>
							<ol className="mt-3 divide-y divider-gray-200 ">
								{logs[date].map((log) => {
									return (
										<li key={log.id}>
											<Link to={`/detail/${log.id}`} className="flex justify-between items-center p-3 sm:flex hover:bg-gray-100 ">
												<CallIcon direction={log.direction} />
												<div className="text-gray-600 flex-1 ml-2">
													<div className="text-base font-normal">
														<span>{log.direction === 'inbound' ? log.from : log.to}</span>
													</div>
													<div className="text-sm font-normal">via: {log.via}</div>
												</div>
                        <div>
                          {formatDateTime(log.created_at)}
                        </div>
											</Link>
										</li>
									);
								})}
							</ol>
						</div>
					);
				})}
			</div>
		</div>
	);
}
