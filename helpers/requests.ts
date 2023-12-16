import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import type { DrupalTranslatedPath } from 'next-drupal';
import type {
  NodeArticleInterface,
  NodeArticleTeaserInterface,
  NodeArticleTeaserPaginate,
} from '@/components/node';

import type {
  MenuItems,
  ResourceJsonApiResponse,
  ResourcesJsonApiResponse,
} from '@/interfaces';

import { drupal } from '@/helpers';

export const requestGetMenus = () => {
  return new Promise<MenuItems>((resolve, reject) => {
    Promise.all([drupal.getMenu('main'), drupal.getMenu('social-media')]).then(
      ([mainMenu, socialMediaMenu]) => {
        resolve({
          mainMenu,
          socialMediaMenu,
        });
      }
    );
  });
};

export const requestNodeArticle = (path: DrupalTranslatedPath, context) => {
  return new Promise<NodeArticleInterface>((resolve, reject) => {
    const params = new DrupalJsonApiParams()
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
      .addFields('file--file', ['uri', 'url', 'filename', 'links', 'meta'])
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
      ]);
			
    drupal
      .getResourceFromContext<NodeArticleInterface>(
        path,
        context,
        {
          params: params.getQueryObject(),
        }
      )
      .then(resolve)
      .catch(reject);
  });
};

export const requestPaginateNodeArticles = context => {
  return new Promise<NodeArticleTeaserPaginate>((resolve, reject) => {
    const params = new DrupalJsonApiParams()
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
      .addSort('created', 'DESC');

    params.addCustomParam({ jsonapi_include: '1' });

    drupal
      .getResourceCollectionFromContext<
        ResourcesJsonApiResponse<NodeArticleTeaserInterface>
      >('node--article', context, {
        params: params.getQueryObject(),
        deserialize: false,
      })
      .then(response => {
        resolve({
          nodes: response.data,
          paginationLinks: response.links,
          total: response.meta.count,
        });
      })
      .catch(reject);
  });
};
