# Feature Requests Board template

This repo requires [this Notion Template](http://go.tonoid.com/feature-requests-board-notion-template) to work properly.

## One-click deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](http://go.tonoid.com/feature-requests-board-deploy-vercel)

## Environment variables

### NOTION_API_TOKEN

Create an internal integration on [Notion Integrations](https://www.notion.so/my-integrations).
Add the newly created integration to the database [Ideas](https://shots.tonoid.com/00gPccPy)
Paste the Internal Integration Secret as environement variable (this should start with `secret_...`)

### NOTION_IDEAS_DATABASE_ID

This is the database id of the notion database [Ideas](https://shots.tonoid.com/00gPccPy), this should look like `03f73fa720c947bbaf9652661594debc` (don't use this example ofc, it's located on the page link)

### NOTION_SUBMIT_IDEA_PAGE_ID

This is the page id of the page [Submit an idea](https://shots.tonoid.com/Kxvf2Gv4), this should look like `03f73fa720c947bbaf9652661594debc` located just after `Submit-an-idea-` (don't use this example ofc, it's located on the page link)

### NOTION_BOARD_PAGE_ID

This is the page id of the page [Board](https://shots.tonoid.com/21c1qn36), this should look like `03f73fa720c947bbaf9652661594debc` located just after `Board-` (don't use this example ofc, it's located on the page link)

### FEATURE_BOARD_URL_ROOT

This is the root URL of the feature board that you have deployed on Vercel. Example: `https://my-domain.com`

### FORM_FEATURE_URL_ROOT

This is optional (and default the `FEATURE_BOARD_URL_ROOT`).
On the deployed site, we have an endpoint that detects the parent page of the form, to get the feature slug. This can either be hosted on the feature requests board, or on your own API (to be able to detect the cookie, and get logged in user details).
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
