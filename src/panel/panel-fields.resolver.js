import { camelCaseToTitleCase } from "../utils";

export function fieldsResolver(schema, parent) {
  let fieldsList = []
  if (parent) {
    if (schema.properties && schema.properties[parent] && schema.properties[parent].type === 'object') {
      const nestedProperties = schema.properties[parent].properties;
      for (const property in nestedProperties) {
        if (nestedProperties.hasOwnProperty(property)) {
          fieldsList.push({
            property: camelCaseToTitleCase(nestedProperties), 
            type: camelCaseToTitleCase(schema.properties[nestedProperties].type), 
            description: schema.properties[nestedProperties].description ?? ''
          })
        }
      }
    }
  }
  for (const property in schema.properties) {
    if (schema.properties.hasOwnProperty(property)) {
      fieldsList.push({
        property: camelCaseToTitleCase(property), 
        type: camelCaseToTitleCase(schema.properties[property].type), 
        description: schema.properties[property].description ?? ''
      })
    }
  }
  return fieldsList
}
