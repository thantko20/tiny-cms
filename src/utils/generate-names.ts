import pluralize from "pluralize";

/**
 * @description
 * Utility to generate `tableName`, `apiName` from just `name`
 */
export const generateNames = (value: string) => {
  return { tableName: pluralize(value), apiName: pluralize(value) };
};
