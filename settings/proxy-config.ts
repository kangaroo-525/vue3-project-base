const proxyConfigMappings: Record<ProxyType, ProxyConfig> = {
  dev: {
    prefix: '/api',
    target: 'http://10.80.36.170:10002/service'
  },
  test: {
    prefix: '/api',
    target: 'http://10.80.36.170:10002/service'
  },
  prod: {
    prefix: '/api',
    target: 'http://10.80.36.170:10002/service'
  }
}

export function getProxyConfig(envType: ProxyType = 'dev'): ProxyConfig {
  return proxyConfigMappings[envType]
}
