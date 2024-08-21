import Component from '@glimmer/component';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';

export default class KpisOverview extends Component {
    @tracked selected = 'visits';

    @action
    changeTabToVisits() {
        this.selected = 'visits';
    }

    @action
    changeTabToPageviews() {
        this.selected = 'pageviews';
    }

    @action
    changeTabToAvgVisitTime() {
        this.selected = 'avg_session_sec';
    }

    @action
    changeTabToBounceRate() {
        this.selected = 'bounce_rate';
    }

    get visitsTabSelected() {
        return (this.selected === 'visits');
    }

    get pageviewsTabSelected() {
        return (this.selected === 'pageviews');
    }

    get avgVisitTimeTabSelected() {
        return (this.selected === 'avg_session_sec');
    }

    get bounceRateTabSelected() {
        return (this.selected === 'bounce_rate');
    }
}
