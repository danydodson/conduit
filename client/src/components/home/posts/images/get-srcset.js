import { CLOUD_DELIVERY } from '../../../../configs'

const srcSet = props => {

  const base = CLOUD_DELIVERY
  const name = props.public_id
  const version = props.version
  const format = props.format

  const urls = {
    size01: `${base}/c_fit,w_100/v${version}/${name}.${format}`,
    size02: `${base}/c_fit,w_200/v${version}/${name}.${format}`,
    size03: `${base}/c_fit,w_300/v${version}/${name}.${format}`,
    size04: `${base}/c_fit,w_400/v${version}/${name}.${format}`,
    size05: `${base}/c_fit,w_500/v${version}/${name}.${format}`,
    size06: `${base}/c_fit,w_600/v${version}/${name}.${format}`,
    size07: `${base}/c_fit,w_700/v${version}/${name}.${format}`,
    size08: `${base}/c_fit,w_800/v${version}/${name}.${format}`,
    size09: `${base}/c_fit,w_900/v${version}/${name}.${format}`,
    size10: `${base}/c_fit,w_1000/v${version}/${name}.${format}`,
    size11: `${base}/c_fit,w_1100/v${version}/${name}.${format}`,
    size12: `${base}/c_fit,w_1200/v${version}/${name}.${format}`,
    size13: `${base}/c_fit,w_1296/v${version}/${name}.${format}`,
    size14: `${base}/c_fit,w_1400/v${version}/${name}.${format}`,
    size15: `${base}/c_fit,w_1600/v${version}/${name}.${format}`,
    size16: `${base}/c_fit,w_1800/v${version}/${name}.${format}`,
    size17: `${base}/c_fit,w_2000/v${version}/${name}.${format}`,
    size18: `${base}/c_fit,w_2200/v${version}/${name}.${format}`,
    size19: `${base}/c_fit,w_2400/v${version}/${name}.${format}`,
    size20: `${base}/c_fit,w_2592/v${version}/${name}.${format}`,
  }

  return `${urls.size01} 100w, ${urls.size02} 200w, ${urls.size03} 300w, ${urls.size04} 400w, ${urls.size05} 500w, ${urls.size06} 600w, ${urls.size07} 700w, ${urls.size08} 800w, ${urls.size09} 900w, ${urls.size10} 1000w, ${urls.size11} 1100w, ${urls.size12} 1200w, ${urls.size13} 1296w, ${urls.size14} 1400w, ${urls.size15} 1600w, ${urls.size16} 1800w, ${urls.size17} 2000w, ${urls.size18} 2200w, ${urls.size19} 2400w, ${urls.size20} 2592w`

}

export default srcSet