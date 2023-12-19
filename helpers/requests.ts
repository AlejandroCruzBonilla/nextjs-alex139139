import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import type { DrupalTranslatedPath } from 'next-drupal';
import type {
  INodeArticle,
  INodeArticleTeaser,
  INodeArticleTeaserPaginate,
} from '@/components/node';

import type {
	IFieldTag,
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
  return new Promise<INodeArticle>((resolve, reject) => {
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
      .getResourceFromContext<INodeArticle>(path, context, {
        params: params.getQueryObject(),
      })
      .then(resolve)
      .catch(reject);
  });
};

export const requestNodeArticles = context => {
  return new Promise<INodeArticleTeaser[]>((resolve, reject) => {
    const params = new DrupalJsonApiParams()
      .addFilter('status', '1')
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

    drupal
      .getResourceCollectionFromContext<INodeArticleTeaser[]>(
        'node--article',
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
  return new Promise<INodeArticleTeaserPaginate>((resolve, reject) => {
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
        ResourcesJsonApiResponse<INodeArticleTeaser>
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

export const requestTags = context => {
  return new Promise<IFieldTag[]>((resolve, reject) => {
    const params = new DrupalJsonApiParams()
      .addFilter('status', '1')
      .addFields('taxonomy_term--tags', [
        'name',
        'description',
        'field_icon_class',
        'metatag',
        'path',
        'status',
      ])
      .addSort('name', 'DESC');

    drupal
      .getResourceCollectionFromContext<IFieldTag[]>(
        'taxonomy_term--tags',
        context,
        {
          params: params.getQueryObject(),
        }
      )
      .then(resolve)
      .catch(reject);
  });
};
