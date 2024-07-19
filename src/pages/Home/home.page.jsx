import { useEffect, useState } from 'react';
import { getAllActivities } from '../../services/activity.service';
import { Link } from 'react-router-dom';

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

  const formatTime12Hour = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
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
												{log.direction === 'inbound' ? (
													<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
														<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
														<g
															id="SVGRepo_tracerCarrier"
															strokeLinecap="round"
															strokeLinejoin="round"></g>
														<g id="SVGRepo_iconCarrier">
															<path
																d="M15 5V9M15 9L19 9M15 9L21 3M18.5 21C9.93959 21 3 14.0604 3 5.5C3 5.11378 3.01413 4.73086 3.04189 4.35173C3.07375 3.91662 3.08968 3.69907 3.2037 3.50103C3.29814 3.33701 3.4655 3.18146 3.63598 3.09925C3.84181 3 4.08188 3 4.56201 3H7.37932C7.78308 3 7.98496 3 8.15802 3.06645C8.31089 3.12515 8.44701 3.22049 8.55442 3.3441C8.67601 3.48403 8.745 3.67376 8.88299 4.05321L10.0491 7.26005C10.2096 7.70153 10.2899 7.92227 10.2763 8.1317C10.2643 8.31637 10.2012 8.49408 10.0942 8.64506C9.97286 8.81628 9.77145 8.93713 9.36863 9.17882L8 10C9.2019 12.6489 11.3501 14.7999 14 16L14.8212 14.6314C15.0629 14.2285 15.1837 14.0271 15.3549 13.9058C15.5059 13.7988 15.6836 13.7357 15.8683 13.7237C16.0777 13.7101 16.2985 13.7904 16.74 13.9509L19.9468 15.117C20.3262 15.255 20.516 15.324 20.6559 15.4456C20.7795 15.553 20.8749 15.6891 20.9335 15.842C21 16.015 21 16.2169 21 16.6207V19.438C21 19.9181 21 20.1582 20.9007 20.364C20.8185 20.5345 20.663 20.7019 20.499 20.7963C20.3009 20.9103 20.0834 20.9262 19.6483 20.9581C19.2691 20.9859 18.8862 21 18.5 21Z"
																stroke="#000000"
																strokeWidth="2"
																strokeLinecap="round"
																strokeLinejoin="round"></path>
														</g>
													</svg>
												) : (
													<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
														<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
														<g
															id="SVGRepo_tracerCarrier"
															strokeLinecap="round"
															strokeLinejoin="round"></g>
														<g id="SVGRepo_iconCarrier">
															
															<path
																d="M21 7V3M21 3H17M21 3L15 9M18.5 21C9.93959 21 3 14.0604 3 5.5C3 5.11378 3.01413 4.73086 3.04189 4.35173C3.07375 3.91662 3.08968 3.69907 3.2037 3.50103C3.29814 3.33701 3.4655 3.18146 3.63598 3.09925C3.84181 3 4.08188 3 4.56201 3H7.37932C7.78308 3 7.98496 3 8.15802 3.06645C8.31089 3.12515 8.44701 3.22049 8.55442 3.3441C8.67601 3.48403 8.745 3.67376 8.88299 4.05321L10.0491 7.26005C10.2096 7.70153 10.2899 7.92227 10.2763 8.1317C10.2643 8.31637 10.2012 8.49408 10.0942 8.64506C9.97286 8.81628 9.77145 8.93713 9.36863 9.17882L8 10C9.2019 12.6489 11.3501 14.7999 14 16L14.8212 14.6314C15.0629 14.2285 15.1837 14.0271 15.3549 13.9058C15.5059 13.7988 15.6836 13.7357 15.8683 13.7237C16.0777 13.7101 16.2985 13.7904 16.74 13.9509L19.9468 15.117C20.3262 15.255 20.516 15.324 20.6559 15.4456C20.7795 15.553 20.8749 15.6891 20.9335 15.842C21 16.015 21 16.2169 21 16.6207V19.438C21 19.9181 21 20.1582 20.9007 20.364C20.8185 20.5345 20.663 20.7019 20.499 20.7963C20.3009 20.9103 20.0834 20.9262 19.6483 20.9581C19.2691 20.9859 18.8862 21 18.5 21Z"
																stroke="#000000"
																strokeWidth="2"
																strokeLinecap="round"
																strokeLinejoin="round"></path>
														</g>
													</svg>
												)}
												<div className="text-gray-600 flex-1">
													<div className="text-base font-normal">
														<span>{log.direction === 'inbound' ? log.from : log.to}</span>
													</div>
													<div className="text-sm font-normal">via: {log.via}</div>
												</div>
                        <div>
                          {formatTime12Hour(log.created_at)}
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
