import {
	GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsResult,
} from 'next';
import Head from 'next/head';

import { requestGetMenus, requestNodeArticle, drupal } from '@/helpers';

import { NodeArticle, NodeBasicPage } from '@/components/node';
import { Layout } from '@/components/layout';
import { Seo } from '@/components/common';

import type { PageDrupalNode, Menu, MenuItems } from '@/interfaces';
import type { INodeArticle } from '@/components/node';

const RESOURCE_TYPES = ['node--page', 'node--article'];

interface NodePageProps {
  mainMenu: Menu;
  socialMediaMenu: Menu;
  resource: Resource;
}
type Resource = PageDrupalNode | INodeArticle;

export default function NodePage({
  resource,
  mainMenu,
  socialMediaMenu,
}: NodePageProps) {
  if (!resource) return null;

  const { metatag: metaTags } = resource;

  const mainMenuItems = mainMenu.items;
  const socialMediaMenuItems = socialMediaMenu.items;

  return (
    <Layout
      mainMenuItems={mainMenuItems}
      socialMediaMenuItems={socialMediaMenuItems}
    >
      <Head>
        <Seo metaTags={metaTags} />
      </Head>
      {resource.type === 'node--page' && <NodeBasicPage node={resource} />}
      {resource.type === 'node--article' && (
        <NodeArticle node={resource as INodeArticle} />
      )}
    </Layout>
  );
}

export const getStaticPaths:GetStaticPaths = async (context): Promise<GetStaticPathsResult> =>{
  const paths = await drupal.getStaticPathsFromContext(RESOURCE_TYPES, context);

  return {
    paths,
    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps = async (
  context
): Promise<GetStaticPropsResult<NodePageProps>> => {
  const path = await drupal.translatePathFromContext(context);

  if (!path) {
    return {
      notFound: true,
    };
  }

  const type = path.jsonapi.resourceName;

  const resourcePromises: Promise<Resource>[] = [];

  if (type === 'node--article') {
    resourcePromises.push(requestNodeArticle(path, context));
  }

  const [{ mainMenu, socialMediaMenu }, resource] = await Promise.all([
    requestGetMenus(),
    ...resourcePromises,
  ]);

  // At this point, we know the path exists and it points to a resource.
  // If we receive an error, it means something went wrong on Drupal.
  // We throw an error to tell revalidation to skip this for now.
  // Revalidation can try again on next request.
  if (!resource) {
    throw new Error(`Failed to fetch resource: ${path.jsonapi.individual}`);
  }

  // If we're not in preview mode and the resource is not published,
  // Return page not found.
  if (!context.preview && resource?.status === false) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      mainMenu,
      socialMediaMenu,
      resource,
    },
  };
};
