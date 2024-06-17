export function formatDate(rawDate) {
	if (!rawDate) {
		return '';
	}
	const month = rawDate.slice(5, 7);
	const numericMonth = parseInt(month);
	const year = rawDate.slice(0, 4);
	const season = getSeason(numericMonth);

	return `${season} ${year}`;
}

// Get seasong
// https://www.timeanddate.com/calendar/aboutseasons.html
//
// spring runs from March 1 to May 31;
// summer runs from June 1 to August 31;
// fall (autumn) runs from September 1 to November 30; and
// winter runs from December 1 to February 28 (February 29 in a leap year).

function getSeason(month) {
	if (3 <= month && month <= 5) {
		return 'Spring';
	}

	if (6 <= month && month <= 8) {
		return 'Summer';
	}

	if (9 <= month && month <= 11) {
		return 'Fall';
	}

	// Months 12, 01, 02
	return 'Winter';
}
