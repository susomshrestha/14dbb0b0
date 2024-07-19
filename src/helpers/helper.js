export default function formatDateTime (dateString, format = 'hh:mm A') {
	const date = new Date(dateString);
	let hours = date.getHours();
	const minutes = date.getMinutes().toString().padStart(2, '0');
	const ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12;

	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear();

	if (format === 'hh:mm A') {
		return `${hours}:${minutes} ${ampm}`;
	}
	if (format === 'YYYY-MM-DD hh:mm A') {
		return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
	}

  return dateString;
};
