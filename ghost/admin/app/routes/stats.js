import PostsRoute from './posts';
import {inject as service} from '@ember/service';

export default class StatsRoute extends PostsRoute {
    @service feature;

    // modelName = 'stats';

    buildRouteInfoMetadata() {
        return {
            titleToken: 'Stats'
        };
    }
}
