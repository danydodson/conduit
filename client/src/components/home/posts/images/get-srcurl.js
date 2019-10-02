import { CLOUD_DELIVERY } from '../../../../configs'

const src = props => {

  const base = CLOUD_DELIVERY
  const name = props.public_id
  const version = props.version

  const src = `${base}/c_fit,w_1000/v${version}/${name}`

  return `${src}`

}

export default src