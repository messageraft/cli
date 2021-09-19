import { flags } from '@oclif/command'
import { debug as debugInit } from 'debug'
import yarnOrNpm from 'yarn-or-npm'
import execa from 'execa'
import * as path from 'path'
import ora from 'ora'
import fse, { outputFile } from 'fs-extra'
import boxen from 'boxen'
import chalk from 'chalk'

import { ManifestProvider, ProviderName } from '@messageraft/common'
import { ProvidersManifest } from '@messageraft/common'

import Base from '../shared/base'
import { askFor } from '../shared/prompts'
import { EnvConfigurationBuilder } from '../envConfigurationBuilder'

const debug = debugInit('messageraft:init')

class MessageraftCli extends Base {
  static description = '[Start scaffolding]'

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    outputDir: flags.string({ char: 'o' }),
  }

  static args = [{ name: 'outputDir' }]

  static strict = false

  async run() {
    const { args, flags } = this.parse(MessageraftCli)
    debug('parsing args', args)
    debug('parsing flags', flags)

    if (!args.outputDir && !flags.outputDir) {
      args.outputDir = await askFor('outputDir')
    }

    const selectedProviders: ProviderName[] = await askFor('providers')

    debug('providers selected', selectedProviders)

    if (!selectedProviders) return

    const providers: ManifestProvider[] = ProvidersManifest.filter((provider) =>
      selectedProviders.find(
        (selectedProvider) => selectedProvider === provider.name,
      ),
    )

    debug('providers found', providers)

    const packageManager = yarnOrNpm.hasYarn() ? 'yarn' : 'npm'
    const installPackageCommand = packageManager === 'yarn' ? 'add' : 'install'

    const outDir = path.join(process.cwd(), args.outputDir || flags.outputDir)

    const spinner = ora('Creating directory').start()
    try {
      await fse.ensureDir(outDir)
      spinner.succeed()
    } catch (err) {
      spinner.stopAndPersist()
      console.error(err)
    }

    spinner.start('Installing server')
    process.chdir(outDir)
    const { stdout: gitCloneStdOut } = await execa('git', [
      'clone',
      'git@github.com:messageraft/messageraft-server.git',
      '.',
    ])
    console.log(gitCloneStdOut)
    spinner.succeed()

    spinner.start('Installing providers')
    process.chdir(outDir)
    const { stdout: providersStdOut } = await execa(packageManager, [
      installPackageCommand,
      ...providers.map(
        (provider) => `${provider.packageName}@${provider.version}`,
      ),
    ])
    console.log(providersStdOut)
    spinner.succeed()

    spinner.start('Cleaning up')
    const { stdout: rmRfDotGitStdOut } = await execa('rm', ['-rf', '.git'])
    console.log(rmRfDotGitStdOut)

    const envConfig = EnvConfigurationBuilder(providers)
    const { stdout: replaceConfigStdOut } = await execa('rm', [
      '-rf',
      'config/configuration.ts',
    ])
    console.log(replaceConfigStdOut)
    await outputFile(`${process.cwd()}/config/configuration.ts`, envConfig)

    const { stdout: prettierStdOut } = await execa(packageManager, ['format'])
    console.log(prettierStdOut)
    spinner.succeed()

    console.log(
      boxen(
        `\n\nDon't forget to get your own keys for the providers you installed.\n\nCheck out the ${chalk.green(
          'development.example.env',
        )} (which you should rename to development.env) under the config folder on how to setup the providers`,
        { title: '🎉 ALL DONE! 🎉', padding: 1, borderColor: 'magenta' },
      ),
    )
  }
}

export = MessageraftCli
