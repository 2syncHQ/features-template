import * as React from 'react'

import { getAllPagesInSpace } from 'notion-utils'
import { defaultMapPageUrl } from 'react-notion-x'
import { ExtendedRecordMap } from 'notion-types'

import * as notion from '../lib/notion'
import { NotionPage } from '../components/NotionPage'
import {
  rootNotionPageId,
  rootNotionSpaceId,
  rootDomain,
  isDev,
  previewImagesEnabled,
  pageUrlOverrides,
  inversePageUrlOverrides,
} from '../lib/config'

export const getStaticProps = async (context) => {
  const pageId = context.params.pageId as string

  const newPageId = pageUrlOverrides[pageId] || pageId;

  let recordMap = null
  try {
    recordMap = await notion.getPage(newPageId)
  } catch (e) {
    //
  }

  return {
    props: {
      recordMap
    },
    revalidate: 10
  }
}

export async function getStaticPaths() {
  if (isDev) {
    return {
      paths: [],
      fallback: true
    }
  }

  // const mapPageUrl = defaultMapPageUrl(rootNotionPageId)

  const mapPageUrl = (pageId) => {
    const newPageId = pageId.replace(/-/g, "");
  
    if (rootNotionPageId === newPageId) return '/';
  
    return `/${inversePageUrlOverrides[newPageId] || newPageId}`;
  }

  // This crawls all public pages starting from the given root page in order
  // for next.js to pre-generate all pages via static site generation (SSG).
  // This is a useful optimization but not necessary; you could just as easily
  // set paths to an empty array to not pre-generate any pages at build time.
  const pages = await getAllPagesInSpace(
    rootNotionPageId,
    rootNotionSpaceId,
    notion.getPage,
    {
      traverseCollections: false
    }
  )

  const paths = Object.keys(pages)
    .map((pageId) => mapPageUrl(pageId))
    .filter((path) => path && path !== '/')

  return {
    paths,
    fallback: true
  }
}

export default function Page({ recordMap }: { recordMap: ExtendedRecordMap }) {
  return (
    <NotionPage
      recordMap={recordMap}
      rootDomain={rootDomain}
      rootPageId={rootNotionPageId}
      previewImagesEnabled={previewImagesEnabled}
    />
  )
}
