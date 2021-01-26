export const CHANGE_CONTENT = 'CHANGE_CONTENT';
export const CHANGE_DATE = 'CHANGE_DATE';
export const MOVE_DATE = 'MOVE_DATE';
export const UPDATE_PLIST = 'UPDATE_PLIST';
export const OPEN_DETAILPOPUP = 'OPEN_DETAILPOPUP';

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

export function updatePlist(value) {
	console.log("action : "+value.length);
	return {
		type: UPDATE_PLIST,
		data: value
	}
}

export function setDetailPopup(value, value2) {
	return {
		type: OPEN_DETAILPOPUP,
		isOpen: value,
		date: value2
	}
}