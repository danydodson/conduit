import React, { useContext } from 'react';
import PageContainer from '../PageContainer';
import { FacetStreamChildrenProps, FacetStreamProps } from '../FacetStream';
import { BiLoggerContextProvider } from '@wix/da-shared-react/pkg/biLogger';
import { MobileContext } from '@wix/da-shared-react/pkg/Context';
import DateNavigationRow from '../DateNavigationRow';
import { ChangeRoutePayload } from '../../actions/app';
import ContentLoader from '../ContentLoader';
import DailyDeviationGrid from '../DailyDeviationGrid';
import s from './DailyDeviationPage.scss';

export interface Props extends FacetStreamProps {
  date?: string;
  changeRoute: (params: ChangeRoutePayload) => void;
}

const DeviationsContainer = ({ children }) => (
  <div className={s['deviations']}>{children}</div>
);

export const DailyDeviationPage: React.FC<Props & FacetStreamChildrenProps> = ({
  items,
  date,
  changeRoute,
}) => {
  const isMobile = useContext(MobileContext);
  return (
    <PageContainer className={s['root']} withFooter>
      <BiLoggerContextProvider
        value={{
          sectionname: 'general',
        }}
      >
        <ContentLoader>
          <DateNavigationRow
            isMobile={isMobile}
            changeRoute={changeRoute}
            date={date}
          />
          <DeviationsContainer>
            <DailyDeviationGrid />
          </DeviationsContainer>
        </ContentLoader>
      </BiLoggerContextProvider>
    </PageContainer>
  );
};
DailyDeviationPage.displayName = 'DailyDeviationPage';

export default DailyDeviationPage;
