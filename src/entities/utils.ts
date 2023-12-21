import { AttributeConstraint } from "../database";

export function createConstraints(
  constraints: Partial<AttributeConstraint>
): AttributeConstraint {
  const {
    defaultValue = null,
    maxLength = 255,
    minLength = 0,
    required = false,
    unique = false
  } = constraints;
  return {
    defaultValue,
    maxLength,
    minLength,
    unique,
    required
  };
}
