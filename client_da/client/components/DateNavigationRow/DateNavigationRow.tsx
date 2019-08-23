import React from 'react';
import moment, { Moment as MomentType } from 'moment';
import classnames from 'classnames';
import { WithTranslation, withTranslation } from 'react-i18next';
import { SingleDatePicker } from 'react-dates';
import { ICON_AFTER_POSITION } from 'react-dates/constants';
import { Url } from '@wix/da-url';
import ArrowLeft from '@wix/da-shared-react/pkg/Icons/ArrowLeft';
import ArrowRight from '@wix/da-shared-react/pkg/Icons/ArrowRight';
import CalendarIcon from '@wix/da-shared-react/pkg/Icons/Calendar';
import ArrowDown from '@wix/da-shared-react/pkg/Icons/ArrowDown';

import s from './DateNavigationRow.scss';

const FIRST_DAILY_DEVIATION_DATE = moment('2000-08-15');
const DATE_PICKER_FORMAT = 'MMMM D, YYYY';

function getUrlWithDate(date: MomentType) {
  return Url.browseDailyDeviationsLink(date.toDate());
}

export interface Props {
  date?: string;
  isMobile?: boolean;

  changeRoute: (params: any) => void;
}

interface State {
  isFocused: boolean;
}

export class DateNavigationRow extends React.Component<
  Props & WithTranslation,
  State
> {
  readonly state = {
    isFocused: false,
  };

  render() {
    const { date, isMobile, t } = this.props;
    const selectedDate = moment(date);
    const isTodaySelected = selectedDate.isSame(moment(), 'day');
    const isFirstDailyDeviationDateSelected = selectedDate.isSame(
      FIRST_DAILY_DEVIATION_DATE,
      'day'
    );

    return (
      <div className={classnames(s['navigation-row'], isMobile && s['mobile'])}>
        {!isMobile && (
          <div className={s['flag-title']}>
            <div className={s['flag']} />
            <div className={s['big-title']}>
              {t!('dailyDev.title.daily')}
              <br />
              {t!('dailyDev.title.deviation')}
            </div>
          </div>
        )}
        <div className={s['controls-container']}>
          <div className={s['calendar']}>
            <div className={classnames(s['arrow'], s['arrow-left'])}>
              {!isFirstDailyDeviationDateSelected && (
                <a
                  href={getUrlWithDate(moment(selectedDate).subtract(1, 'day'))}
                >
                  <ArrowLeft />
                </a>
              )}
            </div>
            <div className={s['calendar-input']}>
              <SingleDatePicker
                date={selectedDate}
                onDateChange={this.handleDateChange}
                onFocusChange={this.handleFocusChange}
                focused={this.state.isFocused}
                id="daily-deviation-picker"
                displayFormat={DATE_PICKER_FORMAT}
                numberOfMonths={1}
                transitionDuration={0}
                isOutsideRange={this.isOutsideRange}
                block={true}
                withPortal={isMobile}
                renderMonthElement={this.renderHeaderDropdowns}
                daySize={isMobile ? 40 : 55}
                customInputIcon={
                  isMobile ? (
                    <ArrowDown className={s['input-icon']} />
                  ) : (
                    <CalendarIcon />
                  )
                }
                inputIconPosition={ICON_AFTER_POSITION}
              />
            </div>
            <div className={classnames(s['arrow'], s['arrow-right'])}>
              {!isTodaySelected && (
                <a href={getUrlWithDate(moment(selectedDate).add(1, 'day'))}>
                  <ArrowRight />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderHeaderDropdowns({ month, onMonthSelect, onYearSelect }) {
    const months = moment
      .months()
      .map(m => ({ label: m, value: m, selected: month.format('MMMM') === m }));
    const years: any = [];
    const currentYear = new Date().getFullYear();
    for (let i = 2000; i <= currentYear; i++) {
      years.push({
        label: i,
        value: i,
        selected: parseInt(month.format('YYYY')) === i,
      });
    }

    const handleSelectYear = value => {
      onYearSelect(month, value.target.value);
    };
    const handleSelectMonth = value => {
      onMonthSelect(month, value.target.value);
    };
    return (
      <div className={s['order-select']}>
        <select className={s['month']} onChange={handleSelectMonth}>
          {months.map(m => (
            <option key={m.label} value={m.value} selected={m.selected}>
              {m.label}
            </option>
          ))}
        </select>
        <select className={s['year']} onChange={handleSelectYear}>
          {years.map(y => (
            <option key={y.label} value={y.value} selected={y.selected}>
              {y.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  handleFocusChange = ({ focused }) => {
    this.setState({ isFocused: focused });
  };

  handleDateChange = newDate => {
    this.props.changeRoute({ url: getUrlWithDate(moment(newDate)) });
  };

  isOutsideRange = (date: MomentType) =>
    !date.isBetween(FIRST_DAILY_DEVIATION_DATE, moment(), 'days', '[]');
}

export default withTranslation()(DateNavigationRow);
