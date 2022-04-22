import {React, ReactDOM} from 'https://unpkg.com/es-react@16.13.1'
import htm from 'https://unpkg.com/htm?module'
import { endpoint } from 'https://cdn.skypack.dev/@octokit/endpoint'
import marked from 'https://unpkg.com/marked@2.0.0/lib/marked.esm.js'
const html = htm.bind(React.createElement)
const TOKEN = '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'
const my_plot = (props) => {
  const [seedlings, setSeedlings] = React.useState([])
  React.useEffect(() => {
    async function plantSeedlings() {
      const {url, ...options} = endpoint('GET /repos/:owner/:repo/issues', {
        owner: 'carolisengineering',
        repo: 'the-conservatory',
        auth: TOKEN
      })
      const response = await fetch(url, options)
      const seedlings = await response.json()
      setSeedlings(seedlings)
    }
    plantSeedlings()
  }, [])
  const {search} = window.location
  return html`
    <div class="welcome">
      <h1>welcome to the conservatory</h1>
      <h1>please explore</h1>
    </div>
    ${seedlings
      .filter(({number}) => !search || Number(search.slice(1)) === number)
      .map(({number, title, body}) => {
      return html`
        <div id=${number} key=${number}>
          <h2>
            <a href="?${number}" target="_blank"> ${title}</a>
          </h2>
          <div dangerouslySetInnerHTML="${{__html: marked(body)}}" />
        </div>
      `
    })}
  `
}
ReactDOM.render(html` <${my_plot}/> `, document.body)
