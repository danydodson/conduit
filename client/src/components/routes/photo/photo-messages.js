import { defineMessages } from 'react-intl'

export const scope = 'seesee.components.routes.photo'

export default defineMessages({
  heading: {
    id: `${scope}.heading`,
    defaultMessage: 'Direct upload from the browser with React File Upload',
  },
  features: {
    id: `${scope}.features`,
    defaultMessage: 'You can also drag and drop an image file into the dashed area.',
  }
})
