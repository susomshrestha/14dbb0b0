import { useNavigate, useParams } from 'react-router-dom';
import CallIcon from '../../components/CallIcon/callIcon';
import formatDateTime from '../../helpers/helper';
import { useEffect, useState } from 'react';
import { getActivityById, updateActivity } from '../../services/activity.service';
import toast from 'react-hot-toast';

export default function Detail() {
	const navigate = useNavigate();
	const { id } = useParams();

	const [detail, setDetail] = useState({});

	useEffect(() => {
		async function getActivity() {
			const res = await getActivityById(id);
			setDetail(res.data);
		}
		getActivity();
	}, []);

	async function handleArchive(archive) {
		const res = await updateActivity(id, archive);
		setDetail((prev) => ({
			...prev,
			is_archived: !prev.is_archived,
		}));
		toast(res.data);
	}

	return (
		<>
			{detail && (
				<div className="max-w-3xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
					<h1 className="text-2xl font-bold mb-4">Call Details</h1>
					<div className="space-y-4">
						<div className="flex justify-center">
							<CallIcon direction={detail.direction} height="100px" width="100px" />
						</div>
						<p>
							<span className="font-semibold mr-1">Direction:</span> {detail.direction}
						</p>
						<p>
							<span className="font-semibold mr-1">From:</span> {detail.from}
						</p>
						<p>
							<span className="font-semibold mr-1">To:</span> {detail.to}
						</p>
						<p>
							<span className="font-semibold mr-1">Via:</span> {detail.via}
						</p>
						<p>
							<span className="font-semibold mr-1">Duration:</span> {detail.duration} seconds
						</p>
						<p>
							<span className="font-semibold mr-1">Status:</span> {detail.call_type}
						</p>
						<p>
							<span className="font-semibold mr-1">Created At:</span>
							{formatDateTime(detail.created_at, 'YYYY-MM-DD hh:mm A')}
						</p>
					</div>
					<div className="mt-6 flex justify-evenly">
						{!detail.is_archived && (
							<button
								className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
								onClick={() => handleArchive(true)}>
								Archive
							</button>
						)}
						{detail.is_archived && (
							<button
								className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
								onClick={() => handleArchive(false)}>
								Unarchive
							</button>
						)}
						<button
							className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
							onClick={() => navigate(-1)}>
							Back
						</button>
					</div>
				</div>
			)}
		</>
	);
}
