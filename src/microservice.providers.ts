import { Transport } from '@nestjs/microservices'
import { ClientProviderOptions } from '@nestjs/microservices/module/interfaces/clients-module.interface'

export const getQueueName = (provider: string): string => {
  let queue = `${provider}-${process.env.NODE_ENV}`
  if (process.env.NODE_ENV !== 'production') {
    queue = `${process.env.USER}-${queue}`
  }

  return queue
}

export const MakeRMQServiceProvider = (
  serviceName: string,
): ClientProviderOptions => ({
  name: serviceName,
  transport: Transport.RMQ,
  options: {
    noAck: true,
    urls: [process.env.RMQ],
    queue: getQueueName(serviceName),
    queueOptions: {
      durable: false,
    },
  },
})
