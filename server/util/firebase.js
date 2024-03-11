import {initializeApp, cert} from 'firebase-admin/app';
import {getStorage} from 'firebase-admin/storage';
import serviceAccount from '../config/netflix-fba01-firebase-adminsdk-fpunk-465a9ba5b5.json' assert {type: 'json'};

initializeApp({
	credential: cert(serviceAccount),
	storageBucket: 'gs://netflix-fba01.appspot.com',
});
const bucket = getStorage().bucket();

export {bucket};
