import path from 'path';

import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

const mergePath = loadFilesSync(
  path.join(__dirname, '../../../modules/**/graphql/*.gql')
);

const schemas = mergeTypeDefs(mergePath);

export default schemas;
