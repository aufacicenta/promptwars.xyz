function getAiModelNameOnly(input: string) {
  const [, value] = /^(.+?)(?=:)/.exec(input) || [];
  return value;
}

const e = {
  getAiModelNameOnly,
};

export default e;
