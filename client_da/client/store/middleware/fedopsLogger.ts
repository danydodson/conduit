import { Middleware } from 'redux';
import { appLoaded } from '../../actions/app';

const createFedopsLogger = (logger): Middleware => {
  return api => next => action => {
    if (action.type === appLoaded.toString()) {
      window.requestAnimationFrame(() => {
        logger.appLoaded();
      });
    }
    return next(action);
  };
};

export default createFedopsLogger;
