import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import Head from 'next/head';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';

import { getMenus,drupal } from '@/helpers';

import { NodeArticle, NodeBasicPage } from '@/components/node';
import { Layout } from '@/components/layout';
import { Seo } from '@/components/common';

import type { NodeArticleInterface } from '@/components/node';
import type { PageDrupalNode, Menu } from '@/interfaces';

const RESOURCE_TYPES = ['node--page', 'node--article'];

interface NodePageProps {
  mainMenu: Menu;
  socialMediaMenu: Menu;
  resource: Resource;
}
type Resource = PageDrupalNode | NodeArticleInterface;

export default function NodePage({
  resource,
  mainMenu,
  socialMediaMenu,
}: NodePageProps) {
  if (!resource) return null;

  const { metatag: metaTags } = resource;

  return (
    <Layout>
      <Head>
        <Seo metaTags={metaTags} />
      </Head>
      {resource.type === 'node--page' && <NodeBasicPage node={resource} />}
      {resource.type === 'node--article' && (
        <NodeArticle node={resource as NodeArticleInterface} />
      )}
    </Layout>
  );
}

export async function getStaticPaths(context): Promise<GetStaticPathsResult> {
  return {
    paths: await drupal.getStaticPathsFromContext(RESOURCE_TYPES, context),
    fallback: 'blocking',
  };
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<NodePageProps>> {
  const path = await drupal.translatePathFromContext(context);

  if (!path) {
    return {
      notFound: true,
    };
  }

  const type = path.jsonapi.resourceName;

  let params = {};
  if (type === 'node--article') {
    params = new DrupalJsonApiParams()
      .addFields('node--article', [
        'title',
        'field_image',
        'field_body',
        'field_tags',
        'uid',
        'created',
        'path',
        'metatag',
        'status',
      ])
      .addFields('media--image', ['field_media_image'])
      .addFields('file--file', [
        'uri',
        'url',
        'filename',
        'links',
        'resourceIdObjMeta',
      ])
      .addFields('taxonomy_term--tags', [
        'name',
        'description',
        'field_icon_class',
        'metatag',
        'path',
        'status',
      ])
      .addInclude([
        'field_image',
        'field_image.field_media_image',
        'field_tags',
        'uid',
      ])
      .getQueryObject();
  }

  const [{ mainMenu, socialMediaMenu }, resource] = await Promise.all([
    getMenus(),
    drupal.getResourceFromContext<Resource>(path, context, {
      params,
    }),
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
}
