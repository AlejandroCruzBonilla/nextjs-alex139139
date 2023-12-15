import Head from 'next/head';
import type { GetStaticPropsResult, NextPage } from 'next';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import { drupal, getMenus } from '@/helpers';
import { Layout } from '@/components/layout';
import { NodeArticleTeaser } from '@/components/node';
import type { NodeArticleTeaserInterface } from '@/components/node';
import type { Menu } from '@/interfaces';

interface ArticlesPageProps {
  mainMenu: Menu;
  socialMediaMenu: Menu;
  nodes: NodeArticleTeaserInterface[];
}

const ArticlePage: NextPage<ArticlesPageProps> = ({
  nodes,
  mainMenu,
  socialMediaMenu,
}) => {
  const mainMenuItems = mainMenu.items;
  const socialMediaMenuItems = socialMediaMenu.items;

  return (
    <Layout
      mainMenuItems={mainMenuItems}
      socialMediaMenuItems={socialMediaMenuItems}
    >
      <Head>
        <title>Next.js for Drupal</title>
        <meta
          name='description'
          content='A Next.js site powered by a Drupal backend.'
        />
      </Head>
      <div>
        <h1 className='mb-10 text-6xl font-black'>Latest Articles.</h1>
        <div className='grid gap-6'>
          {nodes?.length ? (
            nodes.map(node => <NodeArticleTeaser key={node.id} node={node} />)
          ) : (
            <p className='py-4'>No nodes found</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ArticlePage;

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<ArticlesPageProps>> {
  const [{ mainMenu, socialMediaMenu }, nodes] = await Promise.all([
    getMenus(),
    drupal.getResourceCollectionFromContext<NodeArticleTeaserInterface[]>(
      'node--article',
      context,
      {
        params: new DrupalJsonApiParams()
          .addFilter('status', '1')
          .addPageLimit(10)
          .addFields('node--article', [
            'title',
            'field_summary',
            'field_image',
            'field_tags',
            'uid',
            'created',
            'path',
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
          .addSort('created', 'DESC')
          .getQueryObject(),
      }
    ),
  ]);

  //TODO: request Articles SEO

  return {
    props: {
      mainMenu,
      socialMediaMenu,
      nodes,
    },
  };
}
