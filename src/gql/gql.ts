/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query CategoryPageBySlug($slug: String!, $first: Int!, $skip: Int!) {\n  categories(where: {slug: $slug}) {\n    ...Category\n  }\n  productsConnection(\n    first: $first\n    skip: $skip\n    where: {categories_some: {slug: $slug}}\n  ) {\n    aggregate {\n      ...Aggregate\n    }\n    edges {\n      node {\n        ...ProductBase\n      }\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n}": types.CategoryPageBySlugDocument,
    "query CollectionPageCollections {\n  collections {\n    ...Collection\n  }\n}\n\nquery CollectionPageBySlug($slug: String!, $first: Int!, $skip: Int!) {\n  collections(where: {slug: $slug}) {\n    ...Collection\n  }\n  productsConnection(\n    first: $first\n    skip: $skip\n    where: {collections_some: {slug: $slug}}\n  ) {\n    aggregate {\n      ...Aggregate\n    }\n    edges {\n      node {\n        ...ProductBase\n      }\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n}": types.CollectionPageCollectionsDocument,
    "query ProductPageById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductBase\n    variants {\n      ... on ProductSizeColorVariant {\n        id\n        name\n        size\n        color\n      }\n    }\n    collections {\n      id\n      name\n    }\n    categories {\n      id\n      name\n    }\n  }\n}\n\nquery ProductPageRelated($categoryId: ID!) {\n  products(where: {categories_some: {id: $categoryId}}) {\n    ...ProductBase\n  }\n}": types.ProductPageByIdDocument,
    "query ProductsGetList {\n  products(first: 10) {\n    id\n    name\n    description\n    categories(first: 1) {\n      name\n    }\n    images(first: 1) {\n      url\n    }\n    price\n  }\n}": types.ProductsGetListDocument,
    "fragment Aggregate on Aggregate {\n  count\n}": types.AggregateFragmentDoc,
    "fragment Category on Category {\n  id\n  name\n  description\n  slug\n}": types.CategoryFragmentDoc,
    "fragment Collection on Collection {\n  id\n  name\n  description\n  slug\n}": types.CollectionFragmentDoc,
    "fragment PageInfo on PageInfo {\n  hasNextPage\n  hasPreviousPage\n  pageSize\n}": types.PageInfoFragmentDoc,
    "fragment ProductBase on Product {\n  id\n  name\n  slug\n  description\n  price\n}": types.ProductBaseFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoryPageBySlug($slug: String!, $first: Int!, $skip: Int!) {\n  categories(where: {slug: $slug}) {\n    ...Category\n  }\n  productsConnection(\n    first: $first\n    skip: $skip\n    where: {categories_some: {slug: $slug}}\n  ) {\n    aggregate {\n      ...Aggregate\n    }\n    edges {\n      node {\n        ...ProductBase\n      }\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n}"): typeof import('./graphql').CategoryPageBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionPageCollections {\n  collections {\n    ...Collection\n  }\n}\n\nquery CollectionPageBySlug($slug: String!, $first: Int!, $skip: Int!) {\n  collections(where: {slug: $slug}) {\n    ...Collection\n  }\n  productsConnection(\n    first: $first\n    skip: $skip\n    where: {collections_some: {slug: $slug}}\n  ) {\n    aggregate {\n      ...Aggregate\n    }\n    edges {\n      node {\n        ...ProductBase\n      }\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n}"): typeof import('./graphql').CollectionPageCollectionsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductPageById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductBase\n    variants {\n      ... on ProductSizeColorVariant {\n        id\n        name\n        size\n        color\n      }\n    }\n    collections {\n      id\n      name\n    }\n    categories {\n      id\n      name\n    }\n  }\n}\n\nquery ProductPageRelated($categoryId: ID!) {\n  products(where: {categories_some: {id: $categoryId}}) {\n    ...ProductBase\n  }\n}"): typeof import('./graphql').ProductPageByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList {\n  products(first: 10) {\n    id\n    name\n    description\n    categories(first: 1) {\n      name\n    }\n    images(first: 1) {\n      url\n    }\n    price\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Aggregate on Aggregate {\n  count\n}"): typeof import('./graphql').AggregateFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Category on Category {\n  id\n  name\n  description\n  slug\n}"): typeof import('./graphql').CategoryFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Collection on Collection {\n  id\n  name\n  description\n  slug\n}"): typeof import('./graphql').CollectionFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment PageInfo on PageInfo {\n  hasNextPage\n  hasPreviousPage\n  pageSize\n}"): typeof import('./graphql').PageInfoFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductBase on Product {\n  id\n  name\n  slug\n  description\n  price\n}"): typeof import('./graphql').ProductBaseFragmentDoc;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
