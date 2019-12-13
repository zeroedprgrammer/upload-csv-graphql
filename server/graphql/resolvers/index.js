'use strict'

import { fileLoader, mergeResolvers } from 'merge-graphql-schemas'
import path from 'path';

const resolversArray = fileLoader(path.join(__dirname, './'), { recursive: true });

export default mergeResolvers(resolversArray)

