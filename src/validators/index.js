export function getAddHikeFieldValidationFailure(field, value) {
  if (field === 'name') {
    return getNameValidationFailure(value);
  } else {
    return getDistanceValidationFailure(value, field);
  }
}

function getNameValidationFailure(name) {
  if (!name
    || !isString(name)
    || name.trim() === '') {
      return 'Name is required';
  }
  return null;
}

function getDistanceValidationFailure(value, fieldName) {
  if (!value
    || !isNumber(value)
    || value <= 0) {
      return `${fieldName} must be a positive number`;
  }
  return null;
}

function isString (value) {
  return typeof value === 'string' || value instanceof String;
}

function isNumber (value) {
  return !isNaN(value) && isFinite(value);
}
