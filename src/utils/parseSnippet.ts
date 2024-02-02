export const START_TAG = "%START_SNIPPET%";
export const END_TAG = "%END_SNIPPET%";

export const parseSnippet = (source: string) => {
  const [pre, textAndPost] = source.indexOf(START_TAG) !== -1 ? source.split(START_TAG) : ["", source];
  const [text, post] = textAndPost.indexOf(END_TAG) !== -1 ? textAndPost.split(END_TAG) : [textAndPost, ""];
    const startIndex = source.indexOf(START_TAG) + START_TAG.length;
    const endIndex = source.indexOf(END_TAG);
    const title = source.substring(startIndex, endIndex).trim();
  return { pre, post, text, title };
};
