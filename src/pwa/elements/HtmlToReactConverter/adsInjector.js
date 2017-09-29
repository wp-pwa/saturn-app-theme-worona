/* eslint-disable no-restricted-syntax */
import he from 'he';
import Ad from '../Ad';

const MIN_LIMIT_VALUE = 300;
const MIN_LENGTH = 133;
const OFFSET = MIN_LIMIT_VALUE;

const IMG_VALUE = 120;
const BLOCKQUOTE_VALUE = 120;
const LI_VALUE = 50;


const AD_ELEMENT = {
  type: 'Element',
  tagName: Ad,
  attributes: {},
  children: [],
};

const validElements = ['p', 'blockquote', 'ul', 'ol'];

const insertAfter = (newChild, refChild, children) => {
  if (!newChild) return;
  children.splice(children.indexOf(refChild) + 1, 0, newChild);
};



const insertionPoints = elements => {
  const points = [];

  const getElementValue = element => {
    if (element.type === 'Text') {
      return he.decode(element.content.replace(/\s/g, '')).length;
    } else if (element.tagName === 'img' || element.tagName === 'iframe') {
      return IMG_VALUE;
    } else if (element.tagName === 'blockquote') {
      return BLOCKQUOTE_VALUE;
    } else if (element.tagName === 'li') {
      return LI_VALUE;
    }
    return 0;
  }

  const valueInsertions = (parent, children) => children.reduce((sum, element) => {
    let value = getElementValue(element) || valueInsertions(element, element.children);

    if (validElements.includes(element.tagName)) {
      // If the value for element is too short to be considered a different insertion point,
      // the previous insertion point is removed and a new one is created.
      if (value < MIN_LENGTH) {
        const whastePoint = points.pop();
        value += whastePoint ? whastePoint.value : 0;
      }
      points.push({ parent, element, value });
    }

    return sum + value;
  }, 0);

  valueInsertions({ children: elements }, elements);
  return points;
};

export default function adsInjector(htmlTree, adsConfig) {
  const { atTheBeginning, atTheEnd, adList } = adsConfig;

  // htmlTree is always an array.

  let sum = !atTheBeginning ? OFFSET : 0;
  let index = 0;
  let points = insertionPoints(htmlTree);

  const totalValue = points.reduce((last, point) => last + point.value, 0);
  const limitValue = Math.max(MIN_LIMIT_VALUE, Math.floor(totalValue / adList.length));

  if (atTheBeginning) {
    htmlTree.unshift({ ...AD_ELEMENT, attributes: adList[index] || {} });
    index += 1;
  }

  if (!atTheEnd) points = points.slice(0, -1);

  for (const point of points) {
    const { parent, child, value } = point;
    sum += value;
    if (sum >= limitValue) {
      const { children } = parent;
      const ad = { ...AD_ELEMENT, attributes: adList[index] || {} };
      insertAfter(ad, child, children);
      sum = 0;
      index += 1;
    }
  }
};
