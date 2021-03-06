import { ManifestProvider, ProviderName } from '@messageraft/common'

const TWILIO_TEMPLATE = `
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  // OPTIONAL - Alternatively can provide during request
  from: process.env.TWILIO_PHONE_NUMBER,
`

const SLACK_TEMPLATE = `
  token: process.env.SLACK_TOKEN,
  // OPTIONAL - Alternatively can provide during request
  channel: process.env.SLACK_CHANNEL,
`

const SENDGRID_TEMPLATE = `
   apiKey: process.env.SENDGRID_API_KEY
`

const MAILDEV_TEMPLATE = `
   port: process.env.MAILDEV_PORT
`

const BASE_TEMPLATE = `
export const configuration = () => {
   return {
      NODE_ENV: process.env.NODE_ENV,
      domain: process.env.DOMAIN,
      port: parseInt(process.env.PORT, 10) || 3001,
      credentials: {{CREDENTIALS}}
   }
}
`

export function EnvConfigurationBuilder(providers: ManifestProvider[]) {
  const credentials = providers.reduce(
    (accumulator: string, provider: ManifestProvider, currentIndex: number) => {
      switch (provider.name) {
        case ProviderName.SLACK:
          accumulator += `${provider.name.toLowerCase()}: {${SLACK_TEMPLATE}}`
          break
        case ProviderName.TWILIO:
          accumulator += `${provider.name.toLowerCase()}: {${TWILIO_TEMPLATE}}`
          break
        case ProviderName.SENDGRID:
          accumulator += `${provider.name.toLowerCase()}: {${SENDGRID_TEMPLATE}}`
          break
        case ProviderName.MAILDEV:
          accumulator += `${provider.name.toLowerCase()}: {${MAILDEV_TEMPLATE}}`
          break
        default:
          throw new Error(`Provider template not found: ${provider.name}`)
      }

      if (providers.length - 1 === currentIndex) {
        accumulator += '}'
      } else {
        accumulator += ','
      }

      return accumulator
    },
    '{',
  )

  const finalConfig = BASE_TEMPLATE.replace('{{CREDENTIALS}}', credentials)
  return finalConfig
}
