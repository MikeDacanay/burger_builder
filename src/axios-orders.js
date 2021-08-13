import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://burger-builder-281be.firebaseio.com/',

});

export default instance;