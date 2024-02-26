import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super(process.env.API_URL, {
            apiKey: process.env.API_KEY,
            // apiKey: '871bc7652cef480490494f2a62d70757',
        });
    }
}

export default AppLoader;
