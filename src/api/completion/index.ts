import type { FormValues } from '@@types/form';
import instance from '@api';
import { mapSearchParamToValue, generatePrompt } from './completion.utils';

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
    model: 'gpt-3.5-turbo-0613',
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };
  const config = {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const { data } = await instance.post('v1/chat/completions', options, config);

  const response = data.choices[0].message.content.trim();
  console.log('**********response*******', data)
  return {
    id: data.id,
    response,
  };
};

export default fetchOpenAICompletion;
