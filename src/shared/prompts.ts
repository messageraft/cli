import { promptWrapper } from './utils'
import chalk from 'chalk'
import { Providers } from '../providers'

export interface IPromptConfig {
  config: any
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
      type: 'multiselect',
      message: 'Choose providers',
      choices: Providers.map(({ name, packageName }) => ({
        name,
        value: packageName,
      })),
    },
  },
}

export const askFor = async (parameter: string) => {
  return promptWrapper(prompts[parameter])
}
