import LazyTweet from '../../elements/LazyTweet';
import { filter } from '../../elements/HtmlToReactConverter/filter';

export default {
  test: ({ tagName, attributes }) =>
    tagName === 'blockquote' &&
    attributes.className &&
    attributes.className.includes('twitter-tweet') &&
    !attributes['data-lazy'],
  converter: element => {
    const { attributes } = element;
    const height = 'auto';
    const width = '100%';

    // This function iterates the element object recursively until it finds an 'Element'
    // with tagName 'a' and its 'href' attribute matches a RegExp that captures a tweet ID.
    function getTweetId(children) {
      if (!children) return '';

      const results = [];

      for (let i = 0; i < children.length; i += 1) {
        const child = children[i];

        if (child.type === 'Element' && child.tagName === 'a') {
          const match = child.attributes.href.match(/\/status\/(\d+)/);

          if (match) return match[1];
        }

        if (child.children) results.push(getTweetId(child.children));
      }

      return results.reduce((result, current) => current || result, '');
    }

    return {
      type: 'Element',
      tagName: LazyTweet,
      attributes: {
        width,
        height,
        offset: 400,
        throttle: 50,
        imgProps: filter(attributes),
        tweetId: getTweetId(element.children),
      },
      children: [{ ...element, attributes: { ...attributes, 'data-lazy': true } }],
    };
  },
};
