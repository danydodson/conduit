import { AppState } from '../types/store';
import { BiView, Pages } from '../../constants';
import { getPage } from './page';

export function getBiView(state: AppState): BiView {
  return getPage(state) === Pages.Search ? BiView.Search : BiView.Browse;
}
