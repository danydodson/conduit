import FontFaceObserver from 'fontfaceobserver'

/**
 * 
 * font.load().then(function () {
 * 
 * apply the font (which may re-render text and cause a page reflow)
 * after the font has finished downloading
 * 
 * document.fonts.add(font);
 * document.body.style.fontFamily = "Awesome Font, serif";
 * 
 * OR... by default the content is hidden, 
 * and it's rendered after the font is available
 * 
 * var content = document.getElementById("content");
 * content.style.visibility = "visible";
 * 
 * 
 */

const Fonts = () => {

  const montserrat = new FontFaceObserver('Montserrat', {
    style: 'normal', weight: 400,
  })
  const didactgothic = new FontFaceObserver('Didact Gothic', {
    style: 'normal', weight: 400,
  })
  const varelaround = new FontFaceObserver('Varela Round', {
    style: 'normal', weight: 400,
  })

  montserrat.load().then(function () {
    document.documentElement.classList.add('montserrat-loaded')
  }).catch(() => console.error('Montserrat failed'))

  didactgothic.load().then(function () {
    document.documentElement.classList.add('didact-gothic-loaded')
  }).catch(() => console.error('Didact Gothic failed'))

  varelaround.load().then(function () {
    document.documentElement.classList.add('varela-round-loaded')
  }).catch(() => console.error('Varela Round failed'))

}

export default Fonts