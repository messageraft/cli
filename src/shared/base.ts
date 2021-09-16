import Command from '@oclif/command'
import { cosmiconfig } from 'cosmiconfig'
import { debug as debugInit } from 'debug'

const debug = debugInit('messageraft:base')
const explorer = cosmiconfig('messageraft')

type ConfigType = {}

export default abstract class Base extends Command {
  static config: ConfigType

  async init() {
    const { config, filepath } = (await explorer.search()) || {}
    debug('parsing config', { config, filepath })
    this.config = config
  }
}
