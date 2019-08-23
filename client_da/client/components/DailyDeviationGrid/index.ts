import FacetStream from '../FacetStream';
import DailyDeviationGridContainer from './DailyDeviationGrid.container';
import DailyDeviationGrid from './DailyDeviationGrid';

export default DailyDeviationGridContainer(FacetStream(DailyDeviationGrid));
