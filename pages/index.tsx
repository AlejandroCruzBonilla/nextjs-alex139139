import Head from 'next/head';
import type { GetStaticPropsResult, NextPage } from 'next';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';

import { drupal, requestGetMenus } from '@/helpers';

import { Layout } from '@/components/layout';

import type { Menu } from '@/interfaces';

interface IndexPageProps {
  mainMenu: Menu;
  socialMediaMenu: Menu;
}

const IndexPage: NextPage<IndexPageProps> = ({ mainMenu, socialMediaMenu }) => {
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
      <h1>Home</h1>
    </Layout>
  );
};

export default IndexPage;

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  const [{ mainMenu, socialMediaMenu }] = await Promise.all([requestGetMenus()]);

  //TODO: request Home SEO

  return {
    props: {
      mainMenu,
      socialMediaMenu,
    },
  };
}
