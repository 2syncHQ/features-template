import * as React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head />

        <body>
          <script dangerouslySetInnerHTML={{
            __html: `
            window.addEventListener('message', (event) => {
              if (event.data !== 'requestSlug' || event.origin !== '${process.env.FORM_FEATURE_URL_ROOT || process.env.FEATURE_BOARD_URL_ROOT}') return;
              event.source.postMessage(document.location.href, event.origin);
            });
            `,
          }}></script>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
