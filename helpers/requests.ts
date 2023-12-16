import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import type { DrupalTranslatedPath } from 'next-drupal';
import type {
  NodeArticleInterface,
  NodeArticleTeaserInterface,
} from '@/components/node';

import { drupal } from '@/helpers';
import type { MenuItems } from '@/interfaces/menus';

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

    drupal
      .getResourceFromContext<NodeArticleInterface>(path, context, {
        params,
      })
      .then(resolve)
      .catch(reject);
  });
};

export const requestPaginateNodeArticles = context => {
  return new Promise<NodeArticleTeaserInterface[]>((resolve, reject) => {
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
      .addSort('created', 'DESC')
      .getQueryObject();

    drupal
      .getResourceCollectionFromContext<NodeArticleTeaserInterface[]>(
        'node--article',
        context,
        {
          params,
        }
      )
      .then(resolve)
      .catch(reject);
  });
};
