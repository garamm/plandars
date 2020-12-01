export const CHANGE_CONTENT = 'CHANGE_CONTENT';
export const CHANGE_DATE = 'CHANGE_DATE';
export const MOVE_DATE = 'MOVE_DATE';

export function setContentType(value) {
	return {
		type: CHANGE_CONTENT,
		contentType: value
	}
}

export function setSelectedDate(value) {
	return {
		type: CHANGE_DATE,
		date: value
	}
}
export function moveDate(value) {
	return {
		type: MOVE_DATE,
		moveType: value
	}
}