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
			try {
				const res = await getActivityById(id);
				setDetail(res.data);
			} catch (error) {
				toast.error('Failed to get call detail.');
			}
		}
		getActivity();
	}, [id]);

	async function handleArchive(archive) {
		try {
			const res = await updateActivity(id, archive);
			setDetail((prev) => ({
				...prev,
				is_archived: !prev.is_archived,
			}));
			toast(res.data);
		} catch (error) {
			toast.error('Failed to update call.');
		}
	}

	const handleNavigateBack = () => {
		navigate(-1);
	};

	return (
		<>
			{Object.keys(detail).length > 0 && (
				<div className="max-w-3xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
					<h1 className="text-2xl font-bold mb-4">Call Details</h1>
					<div className="space-y-4">
						<div className="flex justify-center">
							<CallIcon direction={detail.direction} height="100px" width="100px" />
						</div>
						<div>
							<span className="font-semibold mr-1">Direction:</span> {detail.direction}
						</div>
						<div>
							<span className="font-semibold mr-1">From:</span> {detail.from}
						</div>
						<div>
							<span className="font-semibold mr-1">To:</span> {detail.to}
						</div>
						<div>
							<span className="font-semibold mr-1">Via:</span> {detail.via}
						</div>
						<div>
							<span className="font-semibold mr-1">Duration:</span> {detail.duration} seconds
						</div>
						<div>
							<span className="font-semibold mr-1">Status:</span> {detail.call_type}
						</div>
						<div>
							<span className="font-semibold mr-1">Created At:</span>
							{formatDateTime(detail.created_at, 'YYYY-MM-DD hh:mm A')}
						</div>
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
							onClick={handleNavigateBack}>
							Back
						</button>
					</div>
				</div>
			)}
		</>
	);
}
