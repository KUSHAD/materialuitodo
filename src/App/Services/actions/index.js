import { firebaseAuth, firebaseFirestore } from '../../../imports';
import { USER_STATE_CHANGE } from '../constants';
export function fetchUser() {
	return (dispatch) => {
		firebaseFirestore
			.collection('users')
			.doc(firebaseAuth.currentUser.uid)
			.get()
			.then((snapshot) => {
				if (snapshot.exists) {
					dispatch({
						type: USER_STATE_CHANGE,
						currentUser: snapshot.data(),
					});
				} else {
					console.log('does not exist');
				}
			});
	};
}
