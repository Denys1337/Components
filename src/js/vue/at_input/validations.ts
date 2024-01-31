import Joi from 'joi';

import { UseInputRulesParams } from '../hooks/useInputRules';

export const validationByPropsFactory = ({
  type = 'text',
  maxlength,
  minlength,
  maxNumber,
  minNumber,
  required,
}: UseInputRulesParams) => {
  let schema = type === 'number' ? Joi.number() : Joi.string().min(1);
  switch (type) {
    case 'email':
      schema = (schema as Joi.StringSchema).email({ tlds: { allow: false } });
      break;
    case 'tel':
      schema = (schema as Joi.StringSchema).regex(/^\d+$/).min(8).max(14);
      break;
  }
  if (type === 'text') {
    if (minlength) schema = schema.min(minlength);
    if (maxlength) schema = schema.max(maxlength);
  }
  if (type === 'number') {
    if (minNumber !== undefined && minNumber !== null) schema = schema.min(minNumber);
    if (maxNumber !== undefined && maxNumber !== null) schema = schema.max(maxNumber);
  }
  schema = required ? schema.required() : schema.allow('');

  return schema;
};
