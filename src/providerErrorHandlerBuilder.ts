import { ManifestProvider } from '@messageraft/common'

const BASE_TEMPLATE = `
  import {ProviderName} from '@messageraft/common';
  {{IMPORT_STATEMENTS}}

  export function providerErrorHandler(error: any, providerName: ProviderName) {
    switch (providerName) {
      {{CASES}}
      default:
        throw new Error(
          'Cannot handle errors for this provider'
        );
    }
  }
`

export function ProviderErrorHandlerBuilder(providers: ManifestProvider[]) {
  const importStatements = providers.reduce(
    (accumulator: string, provider: ManifestProvider) =>
      (accumulator += `import { ${provider.name.toLowerCase()}ErrorHandler } from '@messageraft/${provider.name.toLowerCase()}';`),
    '',
  )
  const cases = providers.reduce(
    (accumulator: string, provider: ManifestProvider) =>
      (accumulator += `
      case ProviderName.${provider.name}:
      return ${provider.name.toLowerCase()}ErrorHandler(error);
    `),
    '',
  )

  const finalErrorHandlerFile = BASE_TEMPLATE.replace(
    '{{IMPORT_STATEMENTS}}',
    importStatements,
  ).replace('{{CASES}}', cases)
  return finalErrorHandlerFile
}
