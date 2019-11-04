import { oc } from 'ts-optchain';
import { Context } from '../utils/utils';
import { ImageResolvers } from '../types';

const Image: ImageResolvers = {
  medium: image =>
    oc(image)
      .medium('')
      .replace('http://', 'https://'),
  original: image =>
    oc(image)
      .medium('')
      .replace('http://', 'https://')
};

export default Image;
