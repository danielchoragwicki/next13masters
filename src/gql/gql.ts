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
    "query CategoryPageBySlug($slug: String!, $first: Int!, $skip: Int!) {\n  categories(where: {slug: $slug}) {\n    ...Category\n  }\n  products: productsConnection(\n    first: $first\n    skip: $skip\n    where: {categories_some: {slug: $slug}}\n  ) {\n    aggregate {\n      ...Aggregate\n    }\n    edges {\n      node {\n        ...ProductBase\n      }\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n}": types.CategoryPageBySlugDocument,
    "query CollectionPageCollections {\n  collections {\n    ...Collection\n  }\n}\n\nquery CollectionPageBySlug($slug: String!, $first: Int!, $skip: Int!) {\n  collections(where: {slug: $slug}) {\n    ...Collection\n  }\n  products: productsConnection(\n    first: $first\n    skip: $skip\n    where: {collections_some: {slug: $slug}}\n  ) {\n    aggregate {\n      ...Aggregate\n    }\n    edges {\n      node {\n        ...ProductBase\n      }\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n}": types.CollectionPageCollectionsDocument,
    "query RootPage($first: Int!, $skip: Int!) {\n  collections {\n    ...Collection\n  }\n  products: productsConnection(first: $first, skip: $skip) {\n    edges {\n      node {\n        ...ProductBase\n      }\n    }\n  }\n}": types.RootPageDocument,
    "query ProductPageById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductBase\n    variants {\n      __typename\n      ... on ProductSizeColorVariant {\n        id\n        name\n        size\n        color\n      }\n    }\n    collections {\n      id\n      name\n    }\n    categories {\n      id\n      name\n    }\n    reviews {\n      ...Review\n    }\n  }\n}\n\nquery ProductPageRelated($categoryId: ID!, $productId: ID!) {\n  products(where: {categories_some: {id: $categoryId}, id_not: $productId}) {\n    ...ProductBase\n  }\n}": types.ProductPageByIdDocument,
    "query ProductsPage($first: Int!, $skip: Int!, $orderBy: ProductOrderByInput) {\n  products: productsConnection(first: $first, skip: $skip, orderBy: $orderBy) {\n    aggregate {\n      ...Aggregate\n    }\n    edges {\n      node {\n        ...ProductBase\n      }\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n}": types.ProductsPageDocument,
    "query SearchPageProducts($search: String!, $first: Int!, $skip: Int!) {\n  products: productsConnection(\n    first: $first\n    skip: $skip\n    where: {_search: $search}\n  ) {\n    aggregate {\n      ...Aggregate\n    }\n    edges {\n      node {\n        ...ProductBase\n      }\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n}": types.SearchPageProductsDocument,
    "query ProductsGetList {\n  products(first: 10) {\n    id\n    name\n    description\n    categories(first: 1) {\n      name\n    }\n    images(first: 1) {\n      url\n    }\n    price\n  }\n}": types.ProductsGetListDocument,
    "fragment Aggregate on Aggregate {\n  count\n}": types.AggregateFragmentDoc,
    "fragment Category on Category {\n  id\n  name\n  description\n  slug\n}": types.CategoryFragmentDoc,
    "fragment Collection on Collection {\n  id\n  name\n  description\n  slug\n  image {\n    height\n    width\n    url\n  }\n}": types.CollectionFragmentDoc,
    "fragment Cart on Order {\n  id\n  orderItems {\n    id\n    quantity\n    total\n    product {\n      id\n      name\n      price\n      description\n      images {\n        id\n        url\n      }\n    }\n  }\n}": types.CartFragmentDoc,
    "fragment PageInfo on PageInfo {\n  hasNextPage\n  hasPreviousPage\n  pageSize\n}": types.PageInfoFragmentDoc,
    "fragment ProductBase on Product {\n  id\n  name\n  slug\n  description\n  price\n  averageRating\n  categories {\n    id\n    name\n  }\n  images {\n    id\n    height\n    url\n    width\n  }\n}": types.ProductBaseFragmentDoc,
    "fragment Review on Review {\n  id\n  content\n  email\n  headline\n  name\n  rating\n}": types.ReviewFragmentDoc,
    "mutation CartAddProduct($orderId: ID!, $productId: ID!, $total: Int!, $quantity: Int!, $orderItemId: ID!) {\n  upsertOrderItem(\n    upsert: {create: {order: {connect: {id: $orderId}}, product: {connect: {id: $productId}}, quantity: 1, total: $total}, update: {quantity: $quantity}}\n    where: {id: $orderItemId}\n  ) {\n    id\n  }\n}": types.CartAddProductDocument,
    "mutation CartCreate {\n  createOrder(data: {total: 0}) {\n    ...Cart\n  }\n}": types.CartCreateDocument,
    "mutation CartRemoveItem($itemId: ID!) {\n  deleteOrderItem(where: {id: $itemId}) {\n    id\n  }\n}": types.CartRemoveItemDocument,
    "mutation CartSetProductQuantity($itemId: ID!, $quantity: Int!) {\n  updateOrderItem(where: {id: $itemId}, data: {quantity: $quantity}) {\n    id\n  }\n}": types.CartSetProductQuantityDocument,
    "mutation CreateReview($data: ReviewCreateInput!, $productId: ID!, $averageRating: Float!) {\n  createReview(data: $data) {\n    ...Review\n  }\n  updateProduct(data: {averageRating: $averageRating}, where: {id: $productId}) {\n    id\n  }\n}\n\nmutation PublishReview($reviewId: ID!) {\n  publishReview(to: PUBLISHED, where: {id: $reviewId}) {\n    id\n  }\n}": types.CreateReviewDocument,
    "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    ...Cart\n  }\n}": types.CartGetByIdDocument,
    "query OrdersGetByEmail($email: String!) {\n  orders(where: {email: $email}) {\n    id\n    total\n    orderItems {\n      id\n      quantity\n      total\n      product {\n        name\n        price\n        images {\n          url\n        }\n      }\n    }\n  }\n}": types.OrdersGetByEmailDocument,
    "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductBase\n  }\n}": types.ProductGetByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoryPageBySlug($slug: String!, $first: Int!, $skip: Int!) {\n  categories(where: {slug: $slug}) {\n    ...Category\n  }\n  products: productsConnection(\n    first: $first\n    skip: $skip\n    where: {categories_some: {slug: $slug}}\n  ) {\n    aggregate {\n      ...Aggregate\n    }\n    edges {\n      node {\n        ...ProductBase\n      }\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n}"): typeof import('./graphql').CategoryPageBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionPageCollections {\n  collections {\n    ...Collection\n  }\n}\n\nquery CollectionPageBySlug($slug: String!, $first: Int!, $skip: Int!) {\n  collections(where: {slug: $slug}) {\n    ...Collection\n  }\n  products: productsConnection(\n    first: $first\n    skip: $skip\n    where: {collections_some: {slug: $slug}}\n  ) {\n    aggregate {\n      ...Aggregate\n    }\n    edges {\n      node {\n        ...ProductBase\n      }\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n}"): typeof import('./graphql').CollectionPageCollectionsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query RootPage($first: Int!, $skip: Int!) {\n  collections {\n    ...Collection\n  }\n  products: productsConnection(first: $first, skip: $skip) {\n    edges {\n      node {\n        ...ProductBase\n      }\n    }\n  }\n}"): typeof import('./graphql').RootPageDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductPageById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductBase\n    variants {\n      __typename\n      ... on ProductSizeColorVariant {\n        id\n        name\n        size\n        color\n      }\n    }\n    collections {\n      id\n      name\n    }\n    categories {\n      id\n      name\n    }\n    reviews {\n      ...Review\n    }\n  }\n}\n\nquery ProductPageRelated($categoryId: ID!, $productId: ID!) {\n  products(where: {categories_some: {id: $categoryId}, id_not: $productId}) {\n    ...ProductBase\n  }\n}"): typeof import('./graphql').ProductPageByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsPage($first: Int!, $skip: Int!, $orderBy: ProductOrderByInput) {\n  products: productsConnection(first: $first, skip: $skip, orderBy: $orderBy) {\n    aggregate {\n      ...Aggregate\n    }\n    edges {\n      node {\n        ...ProductBase\n      }\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n}"): typeof import('./graphql').ProductsPageDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query SearchPageProducts($search: String!, $first: Int!, $skip: Int!) {\n  products: productsConnection(\n    first: $first\n    skip: $skip\n    where: {_search: $search}\n  ) {\n    aggregate {\n      ...Aggregate\n    }\n    edges {\n      node {\n        ...ProductBase\n      }\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n}"): typeof import('./graphql').SearchPageProductsDocument;
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
export function graphql(source: "fragment Collection on Collection {\n  id\n  name\n  description\n  slug\n  image {\n    height\n    width\n    url\n  }\n}"): typeof import('./graphql').CollectionFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Cart on Order {\n  id\n  orderItems {\n    id\n    quantity\n    total\n    product {\n      id\n      name\n      price\n      description\n      images {\n        id\n        url\n      }\n    }\n  }\n}"): typeof import('./graphql').CartFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment PageInfo on PageInfo {\n  hasNextPage\n  hasPreviousPage\n  pageSize\n}"): typeof import('./graphql').PageInfoFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductBase on Product {\n  id\n  name\n  slug\n  description\n  price\n  averageRating\n  categories {\n    id\n    name\n  }\n  images {\n    id\n    height\n    url\n    width\n  }\n}"): typeof import('./graphql').ProductBaseFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Review on Review {\n  id\n  content\n  email\n  headline\n  name\n  rating\n}"): typeof import('./graphql').ReviewFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartAddProduct($orderId: ID!, $productId: ID!, $total: Int!, $quantity: Int!, $orderItemId: ID!) {\n  upsertOrderItem(\n    upsert: {create: {order: {connect: {id: $orderId}}, product: {connect: {id: $productId}}, quantity: 1, total: $total}, update: {quantity: $quantity}}\n    where: {id: $orderItemId}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').CartAddProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartCreate {\n  createOrder(data: {total: 0}) {\n    ...Cart\n  }\n}"): typeof import('./graphql').CartCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartRemoveItem($itemId: ID!) {\n  deleteOrderItem(where: {id: $itemId}) {\n    id\n  }\n}"): typeof import('./graphql').CartRemoveItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartSetProductQuantity($itemId: ID!, $quantity: Int!) {\n  updateOrderItem(where: {id: $itemId}, data: {quantity: $quantity}) {\n    id\n  }\n}"): typeof import('./graphql').CartSetProductQuantityDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateReview($data: ReviewCreateInput!, $productId: ID!, $averageRating: Float!) {\n  createReview(data: $data) {\n    ...Review\n  }\n  updateProduct(data: {averageRating: $averageRating}, where: {id: $productId}) {\n    id\n  }\n}\n\nmutation PublishReview($reviewId: ID!) {\n  publishReview(to: PUBLISHED, where: {id: $reviewId}) {\n    id\n  }\n}"): typeof import('./graphql').CreateReviewDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    ...Cart\n  }\n}"): typeof import('./graphql').CartGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query OrdersGetByEmail($email: String!) {\n  orders(where: {email: $email}) {\n    id\n    total\n    orderItems {\n      id\n      quantity\n      total\n      product {\n        name\n        price\n        images {\n          url\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').OrdersGetByEmailDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductBase\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
