const src = props => {

  const base = process.env.REACT_APP_CL_BASE
  const name = props.response.body.public_id
  const version = props.response.body.version

  const src = `${base}/c_fit,q_80,w_1000/v${version}/${name}.webp`

  return `${src}`

}

export default src