import LazyInstagram from '../../elements/LazyInstagram';

export default {
  test: ({ tagName, attributes }) =>
    tagName === 'blockquote' &&
    attributes.className &&
    attributes.className.includes('instagram-media') &&
    !attributes['data-lazy'],
  converter: element => {
    const { attributes, ...rest } = element;
    const height = 'auto';
    const width = '100%';

    // Overrides style attributes
    const style = {
      ...attributes.style,
      width: '500px',
      maxWidth: '100%',
      margin: '0 auto',
      boxSizing: 'border-box',
    };

    const newAttributes = Object.assign(attributes, { style, 'data-lazy': true });

    // This function iterates the element object recursively until it finds an 'Element'
    // with tagName 'a' and its 'href' attribute matches a RegExp that captures an instagram ID.
    function getInstagramId(children) {
      if (!children) return '';

      const results = [];

      for (let i = 0; i < children.length; i += 1) {
        const child = children[i];

        if (child.type === 'Element' && child.tagName === 'a') {
          const match = child.attributes.href.match(/https:\/\/www\.instagram\.com\/p\/([\w\d]+)/);

          if (match) return match[1];
        }

        if (child.children) results.push(getInstagramId(child.children));
      }

      return results.reduce((result, current) => current || result, '');
    }

    return {
      type: 'Element',
      tagName: LazyInstagram,
      attributes: {
        width,
        height,
        instagramId: getInstagramId(element.children),
        offset: 400,
        throttle: 50,
      },
      children: [{ ...rest, attributes: newAttributes }],
    };
  },
};
