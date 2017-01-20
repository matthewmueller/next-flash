# Flash

[Flash messages](https://docs.typo3.org/typo3cms/CoreApiReference/ApiOverview/FlashMessages/Index.html) for [next.js](https://github.com/zeit/next.js). Works on both the client and the server.

## Example

 ```js
 export default class Page extends Component {
   static async getInitialProps (ctx) {
     return flash.get(ctx) || {}
   }

   create () {
     flash.set({ name: 'matt' })
   }

   render () {
     return (
       <div>
         <Head>
           <title>Flash messages in Next</title>
           <meta name='viewport' content='width=device-width, initial-scale=1' />
         </Head>
         { this.props.name ? <div>FLASH MESSAGE {this.props.name}</div> : <div /> }
         <button onClick={() => this.create()}>Create flash message</button>
         <br />
         <Link href={`/?${Date.now()}`}>Client-Side Route</Link>
       </div>
     )
   }
 }
 ```

## Installation

```sh
yarn add next-flash
```

## License

MIT
