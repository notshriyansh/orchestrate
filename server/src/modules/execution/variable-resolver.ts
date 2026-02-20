export interface VariableMap {
  [key: string]: any;
}

export function resolveVariables(input: any, variables: VariableMap): any {
  if (!input) return input;

  if (typeof input === "string") {
    return input.replace(/{{(.*?)}}/g, (_, key) => {
      return variables[key.trim()] ?? "";
    });
  }

  if (Array.isArray(input)) {
    return input.map((item) => resolveVariables(item, variables));
  }

  if (typeof input === "object") {
    const resolved: any = {};
    for (const key in input) {
      resolved[key] = resolveVariables(input[key], variables);
    }
    return resolved;
  }

  return input;
}
