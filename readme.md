# Feature Requests Portal template

This repo requires [this Notion Template](https://notion.so/templates/) to work properly.

## One-click deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F2syncHQ%2Ffeatures-template&env=NOTION_API_TOKEN,NOTION_PORTAL_DATABASE_ID,NOTION_SUBMIT_IDEA_PAGE_ID,NOTION_ROOT_PAGE_ID,FEATURE_PORTAL_URL_ROOT,FORM_FEATURE_URL_ROOT,TALLY_SUBMIT_IDEA_FORM_ID,TALLY_FEATURE_FORM_ID&envDescription=Environment%20variables%20are%20required%20to%20make%20this%20deployment%20work.&envLink=https%3A%2F%2Fgithub.com%2F2syncHQ%2Ffeatures-template&project-name=feature-requests-portal&repository-name=feature-requests-portal
)

## Environment variables

### NOTION_API_TOKEN

Create an internal integration on [Notion Integrations](https://www.notion.so/my-integrations).
Add the newly created integration to the template `Feature requests portal`
Paste the Notion api key to `NOTION_API_TOKEN`

### NOTION_PORTAL_DATABASE_ID

This is the database id of the notion database [Ideas](https://shots.tonoid.com/gJnBfNyp), this should look like `03f73fa720c947bbaf9652661594debc` (don't use this example ofc, it's located on the page link)

### NOTION_SUBMIT_IDEA_PAGE_ID

This is the page id of the page [Submit an idea](https://shots.tonoid.com/szH4XNgf), this should look like `03f73fa720c947bbaf9652661594debc` (don't use this example ofc, it's located on the page link)

### NOTION_ROOT_PAGE_ID

This is the page id of the page [Portal](https://shots.tonoid.com/jfFRxv4H), this should look like `03f73fa720c947bbaf9652661594debc` (don't use this example ofc, it's located on the page link)

### FEATURE_PORTAL_URL_ROOT

This is the root URL of the feature portal that you have deployed on Vercel. Example: `https://my-domain.com`

### FORM_FEATURE_URL_ROOT

This is optional (and default the FEATURE_PORTAL_URL_ROOT).
On the deployed site, we have an endpoint that detects the parent page of the form, to get the feature slug. This can either be hosted on the feature requests portal, or on your own API (to be able to detect the cookie, and get logged in user details).
You can also

### TALLY_SUBMIT_IDEA_FORM_ID

You can duplicate this [tally template](https://tally.so/templates/submit-an-idea/mBdxRw).
Publish your form, and get the form id. This should look like `VBtxNw` (don't use this example ofc, it's located on the form link)

### TALLY_FEATURE_FORM_ID

You can duplicate this [tally template](https://tally.so/templates/feature-request-feedback/wkeNom).
Publish your form, and get the form id. This should look like `VBtxNw` (don't use this example ofc, it's located on the form link)

## Credits

This template is maintained by [2sync.com](https://2sync.com) the ultimate tool to 2-way sync Notion with your calendar, Todoist, contacts, emails….

Thanks [React Notion X](https://github.com/NotionX/react-notion-x).
