/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SamplesImport } from './routes/samples'
import { Route as SamplesIndexImport } from './routes/samples/index'
import { Route as SamplesChakraUiIndexImport } from './routes/samples/chakra-ui/index'
import { Route as SamplesAboutIndexImport } from './routes/samples/about/index'

// Create Virtual Routes

const SamplesMapsIndexLazyImport = createFileRoute('/samples/maps/')()
const SamplesDirectionMapsIndexLazyImport = createFileRoute(
  '/samples/directionMaps/',
)()
const SamplesAgentIndexLazyImport = createFileRoute('/samples/agent/')()

// Create/Update Routes

const SamplesRoute = SamplesImport.update({
  id: '/samples',
  path: '/samples',
  getParentRoute: () => rootRoute,
} as any)

const SamplesIndexRoute = SamplesIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => SamplesRoute,
} as any)

const SamplesMapsIndexLazyRoute = SamplesMapsIndexLazyImport.update({
  id: '/maps/',
  path: '/maps/',
  getParentRoute: () => SamplesRoute,
} as any).lazy(() =>
  import('./routes/samples/maps/index.lazy').then((d) => d.Route),
)

const SamplesDirectionMapsIndexLazyRoute =
  SamplesDirectionMapsIndexLazyImport.update({
    id: '/directionMaps/',
    path: '/directionMaps/',
    getParentRoute: () => SamplesRoute,
  } as any).lazy(() =>
    import('./routes/samples/directionMaps/index.lazy').then((d) => d.Route),
  )

const SamplesAgentIndexLazyRoute = SamplesAgentIndexLazyImport.update({
  id: '/agent/',
  path: '/agent/',
  getParentRoute: () => SamplesRoute,
} as any).lazy(() =>
  import('./routes/samples/agent/index.lazy').then((d) => d.Route),
)

const SamplesChakraUiIndexRoute = SamplesChakraUiIndexImport.update({
  id: '/chakra-ui/',
  path: '/chakra-ui/',
  getParentRoute: () => SamplesRoute,
} as any)

const SamplesAboutIndexRoute = SamplesAboutIndexImport.update({
  id: '/about/',
  path: '/about/',
  getParentRoute: () => SamplesRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/samples': {
      id: '/samples'
      path: '/samples'
      fullPath: '/samples'
      preLoaderRoute: typeof SamplesImport
      parentRoute: typeof rootRoute
    }
    '/samples/': {
      id: '/samples/'
      path: '/'
      fullPath: '/samples/'
      preLoaderRoute: typeof SamplesIndexImport
      parentRoute: typeof SamplesImport
    }
    '/samples/about/': {
      id: '/samples/about/'
      path: '/about'
      fullPath: '/samples/about'
      preLoaderRoute: typeof SamplesAboutIndexImport
      parentRoute: typeof SamplesImport
    }
    '/samples/chakra-ui/': {
      id: '/samples/chakra-ui/'
      path: '/chakra-ui'
      fullPath: '/samples/chakra-ui'
      preLoaderRoute: typeof SamplesChakraUiIndexImport
      parentRoute: typeof SamplesImport
    }
    '/samples/agent/': {
      id: '/samples/agent/'
      path: '/agent'
      fullPath: '/samples/agent'
      preLoaderRoute: typeof SamplesAgentIndexLazyImport
      parentRoute: typeof SamplesImport
    }
    '/samples/directionMaps/': {
      id: '/samples/directionMaps/'
      path: '/directionMaps'
      fullPath: '/samples/directionMaps'
      preLoaderRoute: typeof SamplesDirectionMapsIndexLazyImport
      parentRoute: typeof SamplesImport
    }
    '/samples/maps/': {
      id: '/samples/maps/'
      path: '/maps'
      fullPath: '/samples/maps'
      preLoaderRoute: typeof SamplesMapsIndexLazyImport
      parentRoute: typeof SamplesImport
    }
  }
}

// Create and export the route tree

interface SamplesRouteChildren {
  SamplesIndexRoute: typeof SamplesIndexRoute
  SamplesAboutIndexRoute: typeof SamplesAboutIndexRoute
  SamplesChakraUiIndexRoute: typeof SamplesChakraUiIndexRoute
  SamplesAgentIndexLazyRoute: typeof SamplesAgentIndexLazyRoute
  SamplesDirectionMapsIndexLazyRoute: typeof SamplesDirectionMapsIndexLazyRoute
  SamplesMapsIndexLazyRoute: typeof SamplesMapsIndexLazyRoute
}

const SamplesRouteChildren: SamplesRouteChildren = {
  SamplesIndexRoute: SamplesIndexRoute,
  SamplesAboutIndexRoute: SamplesAboutIndexRoute,
  SamplesChakraUiIndexRoute: SamplesChakraUiIndexRoute,
  SamplesAgentIndexLazyRoute: SamplesAgentIndexLazyRoute,
  SamplesDirectionMapsIndexLazyRoute: SamplesDirectionMapsIndexLazyRoute,
  SamplesMapsIndexLazyRoute: SamplesMapsIndexLazyRoute,
}

const SamplesRouteWithChildren =
  SamplesRoute._addFileChildren(SamplesRouteChildren)

export interface FileRoutesByFullPath {
  '/samples': typeof SamplesRouteWithChildren
  '/samples/': typeof SamplesIndexRoute
  '/samples/about': typeof SamplesAboutIndexRoute
  '/samples/chakra-ui': typeof SamplesChakraUiIndexRoute
  '/samples/agent': typeof SamplesAgentIndexLazyRoute
  '/samples/directionMaps': typeof SamplesDirectionMapsIndexLazyRoute
  '/samples/maps': typeof SamplesMapsIndexLazyRoute
}

export interface FileRoutesByTo {
  '/samples': typeof SamplesIndexRoute
  '/samples/about': typeof SamplesAboutIndexRoute
  '/samples/chakra-ui': typeof SamplesChakraUiIndexRoute
  '/samples/agent': typeof SamplesAgentIndexLazyRoute
  '/samples/directionMaps': typeof SamplesDirectionMapsIndexLazyRoute
  '/samples/maps': typeof SamplesMapsIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/samples': typeof SamplesRouteWithChildren
  '/samples/': typeof SamplesIndexRoute
  '/samples/about/': typeof SamplesAboutIndexRoute
  '/samples/chakra-ui/': typeof SamplesChakraUiIndexRoute
  '/samples/agent/': typeof SamplesAgentIndexLazyRoute
  '/samples/directionMaps/': typeof SamplesDirectionMapsIndexLazyRoute
  '/samples/maps/': typeof SamplesMapsIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/samples'
    | '/samples/'
    | '/samples/about'
    | '/samples/chakra-ui'
    | '/samples/agent'
    | '/samples/directionMaps'
    | '/samples/maps'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/samples'
    | '/samples/about'
    | '/samples/chakra-ui'
    | '/samples/agent'
    | '/samples/directionMaps'
    | '/samples/maps'
  id:
    | '__root__'
    | '/samples'
    | '/samples/'
    | '/samples/about/'
    | '/samples/chakra-ui/'
    | '/samples/agent/'
    | '/samples/directionMaps/'
    | '/samples/maps/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  SamplesRoute: typeof SamplesRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  SamplesRoute: SamplesRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/samples"
      ]
    },
    "/samples": {
      "filePath": "samples.tsx",
      "children": [
        "/samples/",
        "/samples/about/",
        "/samples/chakra-ui/",
        "/samples/agent/",
        "/samples/directionMaps/",
        "/samples/maps/"
      ]
    },
    "/samples/": {
      "filePath": "samples/index.tsx",
      "parent": "/samples"
    },
    "/samples/about/": {
      "filePath": "samples/about/index.tsx",
      "parent": "/samples"
    },
    "/samples/chakra-ui/": {
      "filePath": "samples/chakra-ui/index.tsx",
      "parent": "/samples"
    },
    "/samples/agent/": {
      "filePath": "samples/agent/index.lazy.tsx",
      "parent": "/samples"
    },
    "/samples/directionMaps/": {
      "filePath": "samples/directionMaps/index.lazy.tsx",
      "parent": "/samples"
    },
    "/samples/maps/": {
      "filePath": "samples/maps/index.lazy.tsx",
      "parent": "/samples"
    }
  }
}
ROUTE_MANIFEST_END */
