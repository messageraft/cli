import { promptWrapper } from './utils'
import chalk from 'chalk'
import { ProvidersManifest } from '@messageraft/common'

interface BasePromptConfig {
  name: string
  message: string
  validate?: (value: string) => boolean | string
}

interface InputPromptConfig extends BasePromptConfig {
  type: 'input'
}

interface MultiSelectPromptConfig extends BasePromptConfig {
  type: 'multiselect'
  choices: { name: string; value: string }[]
}

export interface IPromptConfig {
  config: InputPromptConfig | MultiSelectPromptConfig
  tip?: string
}

const prompts: { [key: string]: IPromptConfig } = {
  outputDir: {
    config: {
      type: 'input',
      name: 'directory',
      message: 'Please specify output directory',
      validate: (value: string) => {
        if (!value) return 'Output directory name cannot be empty'
        return true
      },
    },
    tip: `Tip: You can specify this with ${chalk.red(
      'messageraft init <project-directory>',
    )} in the future`,
  },
  providers: {
    config: {
      name: 'providers',
      type: 'multiselect',
      message:
        'Choose providers (Press <space> to select, press <enter> to confirm)',
      choices: ProvidersManifest.map(({ name, packageName }) => ({
        name,
        value: packageName,
      })),
    },
  },
}

export const askFor = async (parameter: string) => {
  return promptWrapper(prompts[parameter])
}
