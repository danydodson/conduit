const srcSet = props => {

  const base = process.env.REACT_APP_CL_BASE
  const name = props.response.body.public_id

  const urls = {
    size01: `${base}/c_fit,q_80,w_100/${name}`,
    size02: `${base}/c_fit,q_80,w_200/${name}`,
    size03: `${base}/c_fit,q_80,w_300/${name}`,
    size04: `${base}/c_fit,q_80,w_400/${name}`,
    size05: `${base}/c_fit,q_80,w_500/${name}`,
    size06: `${base}/c_fit,q_80,w_600/${name}`,
    size07: `${base}/c_fit,q_80,w_700/${name}`,
    size08: `${base}/c_fit,q_80,w_800/${name}`,
    size09: `${base}/c_fit,q_80,w_900/${name}`,
    size10: `${base}/c_fit,q_80,w_1000/${name}`,
    size11: `${base}/c_fit,q_80,w_1100/${name}`,
    size12: `${base}/c_fit,q_80,w_1200/${name}`,
    size13: `${base}/c_fit,q_80,w_1296/${name}`,
    size14: `${base}/c_fit,q_80,w_1400/${name}`,
    size15: `${base}/c_fit,q_80,w_1600/${name}`,
    size16: `${base}/c_fit,q_80,w_1800/${name}`,
    size17: `${base}/c_fit,q_80,w_2000/${name}`,
    size18: `${base}/c_fit,q_80,w_2200/${name}`,
    size19: `${base}/c_fit,q_80,w_2400/${name}`,
    size20: `${base}/c_fit,q_80,w_2592/${name}`,
  }

  return `${urls.size01} 100w, ${urls.size02} 200w, ${urls.size03} 300w, ${urls.size04} 400w, ${urls.size05} 500w, ${urls.size06} 600w, ${urls.size07} 700w, ${urls.size08} 800w, ${urls.size09} 900w, ${urls.size10} 1000w, ${urls.size11} 1100w, ${urls.size12} 1200w, ${urls.size13} 1296w, ${urls.size14} 1400w, ${urls.size15} 1600w, ${urls.size16} 1800w, ${urls.size17} 2000w, ${urls.size18} 2200w, ${urls.size19} 2400w, ${urls.size20} 2592w`

}

export default srcSet