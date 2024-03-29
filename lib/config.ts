import * as paths from '../paths.json';

// TODO: change these to your own values
// NOTE: rootNotionSpaceId is optional; set it to undefined if you don't want to
// use it.
export const rootNotionPageId = process.env.NOTION_BOARD_PAGE_ID
export const rootNotionSpaceId = undefined

// NOTE: having this enabled can be pretty expensive as it re-generates preview
// images each time a page is built. In a production setting, we recommend that
// you cache the preview image results in a key-value database.
export const previewImagesEnabled = false

// Whether to use the official public Notion API or the unofficial private API.
// Note that the official API doesn't expose formatting options for many blocks
// and is currently not as well-supported.
// If you want to use the official API, you must provide a NOTION_TOKEN env var.
export const useOfficialNotionAPI =
  false ||
  (process.env.USE_OFFICIAL_NOTION_API === 'true' && process.env.NOTION_TOKEN)

export const isDev =
  process.env.NODE_ENV === 'development' || !process.env.NODE_ENV

export const port = process.env.PORT || 3000
export const rootDomain = isDev ? `localhost:${port}` : null

export const pageUrlOverrides = paths;


export const inversePageUrlOverrides = {};
Object.keys(pageUrlOverrides).forEach((key) => {
  inversePageUrlOverrides[pageUrlOverrides[key]] = key;
});