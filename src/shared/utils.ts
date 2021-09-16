import { prompt } from 'enquirer'
import { IPromptConfig } from './prompts'

export const promptWrapper = async ({ config, tip }: IPromptConfig) => {
  return await prompt(config)
    .then((value: any) => value[config.name])
    .catch((error: any) => console.error(error.message))
    .finally(() => (tip ? console.log(tip) : undefined))
}
