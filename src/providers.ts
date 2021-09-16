import { ProviderName, ProviderType } from '@messageraft/common'

interface Provider {
  name: ProviderName
  type: ProviderType
  packageName: string
}

export const Providers: Provider[] = [
  {
    name: ProviderName.SLACK,
    type: ProviderType.DIRECT_MESSAGE,
    packageName: '@messageraft/messageraft-slack',
  },
  {
    name: ProviderName.TWILIO,
    type: ProviderType.SMS,
    packageName: '@messageraft/messageraft-twilio',
  },
  {
    name: ProviderName.SENDGRID,
    type: ProviderType.EMAIL,
    packageName: '@messageraft/messageraft-sendgrid',
  },
]
