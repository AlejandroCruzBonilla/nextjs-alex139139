import Head from 'next/head';
import type { GetStaticPropsResult, NextPage } from 'next';
import { requestGetMenus, requestPaginateNodeArticles } from '@/helpers';
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
  const [{ mainMenu, socialMediaMenu }, {nodes,total,paginationLinks}] = await Promise.all([
    requestGetMenus(),
    requestPaginateNodeArticles(context)
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
