export default function handler(req, res) {
  const tallyFormId = req.query.formId;
  const tallyFormUrl = `https://tally.so/embed/${tallyFormId}?alignLeft=1&hideTitle=1`;

  const cleanParam = (d) => encodeURIComponent(d).replace(/'/g, '\\\'');

  let extraQs = (req.query.source) ? `&source=${cleanParam(req.query.source)}` : '&source=Board';

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

  if (req.query.feature) {
    extraQs += `&feature=${cleanParam(req.query.feature)}`;
  }

  if (req.query.sourceUrl) {
    extraQs += `&sourceUrl=${cleanParam(req.query.sourceUrl)}`;
  }

  if (req.query.sourceId) {
    extraQs += `&sourceId=${cleanParam(req.query.sourceId)}`;
  }

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Security-Policy', 'frame-ancestors *');
  res.status(200).end(
    `<html>
    <body style="margin: 0;">
    <iframe id="main" frameborder="0" allowfullscreen style="height:calc(100vh - 4px);width:calc(100vw - 4px);box-sizing: border-box;" src="${tallyFormUrl}${extraQs}"></iframe>
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
    `
  )
}
