import instance from '@api';
import { mapSearchParamToValue, generatePrompt } from '../api.utils';
import { FormValues } from '@@types/form';

interface CompletionApiProps extends Omit<FormValues, 'editedTranscript'> {
  searchParams: URLSearchParams;
}

const fetchOpenAICompletion = async ({
  searchParams,
  apiKey,
  question,
  transcript,
}: CompletionApiProps) => {
  const { field, experience, lang } = mapSearchParamToValue(searchParams);

  const prompt = generatePrompt(field, experience, lang, question, transcript);
  const options = {
    model: 'text-davinci-003',
    prompt,
    temperature: 0.7,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };
  const config = {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const { data } = await instance.post('v1/completions', options, config);

  return data;
};

export default fetchOpenAICompletion;