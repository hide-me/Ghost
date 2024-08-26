import PostsController from './posts';
import {inject as service} from '@ember/service';

export default class PagesController extends PostsController {
    @service router;

    get days() {
        return 30;
    }
}