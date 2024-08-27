import PostsController from './posts';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';
import {tracked} from '@glimmer/tracking';

// Options 30 and 90 need an extra day to be able to distribute ticks/gridlines evenly
const DAYS_OPTIONS = [{
    name: '7 Days',
    value: 7
}, {
    name: '30 Days',
    value: 30 + 1
}, {
    name: '90 Days',
    value: 90 + 1
}];

export default class PagesController extends PostsController {
    @service router;

    daysOptions = DAYS_OPTIONS;

    @tracked days = 30 + 1;

    @action
    onDaysChange(selected) {
        this.days = selected.value;
    }

    get selectedDaysOption() {
        return this.daysOptions.find(d => d.value === this.days);
    }
}