export const PRODUCT_SCHEMA = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Product",
  "description": "A product from the eCommerce catalog",
  "type": "object",
  "properties": {
    "productId": {
      "description": "The unique identifier for a product",
      "type": "string"
    },
    "name": {
      "description": "Name of the product",
      "type": "string"
    },
    "description": {
      "description": "Description of the product",
      "type": "string"
    },
    "price": {
      "description": "Price of the product",
      "type": "number",
      "minimum": 0
    },
    "currency": {
      "description": "Currency of the product price",
      "type": "string",
      "enum": ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "SEK", "NZD"]
    },
    "category": {
      "description": "Category of the product",
      "type": "string"
    },
    "stock": {
      "description": "Stock quantity available for the product",
      "type": "integer",
      "minimum": 0
    },
    "brand": {
      "description": "Brand of the product",
      "type": "string"
    },
    "rating": {
      "description": "Average rating of the product",
      "type": "number",
      "minimum": 0,
      "maximum": 5
    },
    "images": {
      "description": "List of image URLs for the product",
      "type": "array",
      "items": {
        "type": "string",
        "format": "uri"
      }
    },
    "dimensions": {
      "description": "Dimensions of the product",
      "type": "object",
      "properties": {
        "length": { "type": "number" },
        "width": { "type": "number" },
        "height": { "type": "number" }
      },
      "required": ["length", "width", "height"]
    },
    "weight": {
      "description": "Weight of the product",
      "type": "number"
    },
    "createdAt": {
      "description": "Date when the product was added to the catalog",
      "type": "string",
      "format": "date-time"
    },
    "updatedAt": {
      "description": "Date when the product information was last updated",
      "type": "string",
      "format": "date-time"
    }
  },
  "required": ["productId", "name", "price", "currency", "category", "stock", "createdAt"],
  "additionalProperties": false
}

export const PAGE_CONFIG = {
  metadata: {
    title: 'Products Page',
    description: ''
  },
  layout: []
}
