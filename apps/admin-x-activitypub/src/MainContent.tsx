import ActivityPubComponent from './components/ListIndex';
import {Button} from './components/ui/button';

const MainContent = () => {
    return (
        <>
            <Button>Click me</Button>
            <ActivityPubComponent />
        </>
    );
};

export default MainContent;
