import {PlayPage} from './components/pages/PlayPage';
import {SearchPage} from './components/pages/SearchPage';

export const routes = [{
    path: '/play/:videoID',
    component: PlayPage
}, {
    path: '/search/',
    component: SearchPage
}];