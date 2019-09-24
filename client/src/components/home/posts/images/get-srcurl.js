import { CLOUD_DELIVERY } from '../../../../configs/cloud-configs'

const src = props => {

  const base = CLOUD_DELIVERY
  const name = props.response.body.public_id
  const version = props.response.body.version

  const src = `${base}/c_fit,w_1000/v${version}/${name}`

  return `${src}`

}

export default src