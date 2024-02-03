import { NotionAPI } from 'notion-client'
import { ExtendedRecordMap, SearchParams, SearchResults } from 'notion-types'

import { getPreviewImageMap } from './preview-images'
import { useOfficialNotionAPI, previewImagesEnabled } from './config'

import { pageUrlOverrides, rootNotionPageId } from '../lib/config'

const notion = new NotionAPI()

export async function getPage(path: string): Promise<ExtendedRecordMap> {
  const pageId = path === '' ? rootNotionPageId : (pageUrlOverrides[path] || path);
  const recordMap = await notion.getPage(pageId)

  if (previewImagesEnabled) {
    const previewImageMap = await getPreviewImageMap(recordMap)
    ;(recordMap as any).preview_images = previewImageMap
  }

  return recordMap
}

export async function search(params: SearchParams): Promise<SearchResults> {
  return notion.search(params)
}
