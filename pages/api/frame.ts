import { NextResponse } from 'next/server'

// This route can also be hosted on your API, in this case 
export function middleware(request) {
  const { searchParams } = new URL(request.url);

  const tallyFormId = searchParams.get('formId');
  const tallyFormUrl = `https://tally.so/embed/${tallyFormId}?alignLeft=1&hideTitle=1`;

  const cleanParam = (d) => encodeURIComponent(d).replace(/'/g, '\\\'');

  let extraQs = (searchParams.get('source')) ? `&source=${cleanParam(searchParams.get('source'))}` : '&source=Board';

  // You can add logic here to customize the form based on the user's information
  // const userId = null;
  // const user = {};
  // if (userId) {
  //   if (user?.email) {
  //     extraQs += `&email=${cleanParam((user.email))}`;
  //   }

  //   if (user && user.firstName) {
  //     extraQs += `&firstname=${cleanParam(user.firstName)}&lastname=${cleanParam(user.lastName)}&fullname=${cleanParam(`${user.firstName} ${user.lastName}`)}`;
  //   }

  //   if (user) {
  //     extraQs += `&userId=${user._id}`;
  //   }
  // }

  if (searchParams.get('feature')) {
    extraQs += `&feature=${cleanParam(searchParams.get('feature'))}`;
  }

  if (searchParams.get('sourceUrl')) {
    extraQs += `&sourceUrl=${cleanParam(searchParams.get('sourceUrl'))}`;
  }

  if (searchParams.get('sourceId')) {
    extraQs += `&sourceId=${cleanParam(searchParams.get('sourceId'))}`;
  }

  return new NextResponse(
    `<html>
    <body style="margin: 0;">
    <iframe id="main" frameborder="0" allowfullscreen style="height:calc(100vh - 4px);width:calc(100vw - 4px);box-sizing: border-box;"></iframe>
    <script>
      window.addEventListener('message', (event) => {
        if (event.origin !== '${process.env.FEATURE_BOARD_URL_ROOT}') return;
        try {
          const slug = (event.data || '').split('?')[0].split('#')[0].split('/').slice(-1)[0] || '';
          document.getElementById('main').setAttribute('src', '${tallyFormUrl}${extraQs}&slug=' + encodeURIComponent(slug));
        } catch (e) {
          //
        }
      });
      window.parent.postMessage('requestSlug', '${process.env.FEATURE_BOARD_URL_ROOT}');
    </script>
    </body>
    </html>
    `,
      { status: 410, headers: { 'content-type': 'text/html' } }
  )
}
