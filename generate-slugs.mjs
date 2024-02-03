import * as dotenv from 'dotenv';
dotenv.config()

import got from 'got';
import { writeFile } from 'fs';

async function queryFeatures(start_cursor = null) {
  const { body } = await got.post(`https://api.notion.com/v1/databases/${process.env.NOTION_IDEAS_DATABASE_ID}/query`, {
    json: {
      ...(start_cursor ? { start_cursor } : {}),
      page_size: 100,
      'filter': {
        and: [
          {
            'property': 'slug',
            'rich_text': {
              'is_not_empty': true,
            },
          },
        ],
      },
    },
    responseType: 'json',
    headers: {
      Authorization: `Bearer ${process.env.NOTION_API_TOKEN}`,
      'Notion-Version': '2021-08-16',
    },
  });
  return body;
}

async function generateSugs() {
  let hasMore = true;
  let nextCursor;

  let page = 1;
  let c = 0;
  const pageUrlOverrides = {
    'submit-an-idea': process.env.NOTION_SUBMIT_IDEA_PAGE_ID,
  };

  while (hasMore) {
    page += 1;
    const body = await queryFeatures(nextCursor);
    hasMore = body.has_more;
    nextCursor = body.next_cursor;
    for (let i = 0; i < body.results.length; i += 1) {
      c += 1;
      const d = body.results[i].properties;
      const slug = d.slug.rich_text[0].plain_text;
      if (!slug || slug === '') continue;
      pageUrlOverrides[slug] = body.results[i].id.replace(/-/g, '');
    }
  }

  console.log(pageUrlOverrides);

  await new Promise((resolve, reject) => {
    writeFile('paths.json', JSON.stringify(pageUrlOverrides, null, 2), (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
}

(async () => {
  try {
    await generateSugs();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
