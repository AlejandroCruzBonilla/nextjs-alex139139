import { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import type { GetStaticProps, GetStaticPropsResult, NextPage } from 'next';
import { ScrollTop } from 'primereact/scrolltop';
import { requestGetMenus, requestNodeArticles, requestTags } from '@/helpers';
import { Layout } from '@/components/layout';
import { NodeArticleTeaser, type INodeArticleTeaser } from '@/components/node';
import {
  MiniPaginator,
  Paginator,
  AutoCompleteChips,
} from '@/components/common';
import type { IFieldTag, Menu } from '@/interfaces';
import { scrollToTop } from '@/utilities';

interface ArticlesPageProps {
  mainMenu: Menu;
  socialMediaMenu: Menu;
  nodes: INodeArticleTeaser[];
  tags: IFieldTag[];
}

const ArticlesPage: NextPage<ArticlesPageProps> = ({
  nodes,
  tags,
  mainMenu,
  socialMediaMenu,
}) => {
  const mainMenuItems = mainMenu.items;
  const socialMediaMenuItems = socialMediaMenu.items;

  const itemsPerPage = 10;
  const [paginatedArticles, setPaginatedArticles] = useState<
    INodeArticleTeaser[]
  >([]);

  const [articlesByTags, setArticlesByTag] = useState([]);

  const handleSearchTags = useCallback(
    (tags, filterMode) => {
      if (tags.length <= 0) setArticlesByTag(nodes);
      else {
        const filteredArticles = nodes.filter(node => {
          const { field_tags } = node;
          if (filterMode === 'can') {
            return tags.some(sTag =>
              field_tags.find(fTag => fTag.name === sTag.name)
            );
          } else if (filterMode === 'has') {
            return tags.every(sTag =>
              field_tags.find(fTag => fTag.name === sTag.name)
            );
          }
        });
        setArticlesByTag(filteredArticles);
      }
    },
    [nodes]
  );

  const handleOnPaginate = useCallback(
    (first: number) => {
      const last = first + itemsPerPage;
      setPaginatedArticles(articlesByTags.slice(first, last));
      scrollToTop();
    },
    [articlesByTags]
  );

  useEffect(() => {
    handleOnPaginate(0);
  }, [handleOnPaginate, articlesByTags]);

  const tagList = tags
    .map(tag => ({
      name: tag.name,
      icon: tag.field_icon_class,
    }))
    .reverse();

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
        <div className='my-4'>
          <AutoCompleteChips items={tagList} onSearch={handleSearchTags} />
        </div>
        <div className='grid gap-6'>
          {paginatedArticles?.length ? (
            paginatedArticles.map(node => (
              <NodeArticleTeaser key={node.id} node={node} />
            ))
          ) : (
            <p className='py-4'>No nodes found</p>
          )}
        </div>
        <div className='my-2'>
          <div className='block md:hidden'>
            <MiniPaginator
              itemsPerPage={itemsPerPage}
              totalRecords={articlesByTags.length}
              onPaginate={handleOnPaginate}
            />
          </div>
          <div className='hidden md:block'>
            <Paginator
              itemsPerPage={itemsPerPage}
              totalRecords={articlesByTags.length}
              onPaginate={handleOnPaginate}
            />
          </div>
        </div>
        <ScrollTop className='background-gradient-primary !text-font-dark' />
      </div>
    </Layout>
  );
};

export default ArticlesPage;

export const getStaticProps: GetStaticProps = async (
  context
): Promise<GetStaticPropsResult<ArticlesPageProps>> => {
  const [{ mainMenu, socialMediaMenu }, nodes, tags] = await Promise.all([
    requestGetMenus(),
    requestNodeArticles(context),
    requestTags(context),
  ]);

  //TODO: request Articles SEO

  return {
    props: {
      mainMenu,
      socialMediaMenu,
      nodes,
      tags,
    },
  };
};
