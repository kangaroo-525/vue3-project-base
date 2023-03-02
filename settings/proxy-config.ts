const proxyConfigMappings: Record<ProxyType, ProxyConfig> = {
  dev: {
    prefix: '/api',
    target: 'http://10.80.36.170:10000/service'
  },
  test: {
    prefix: '/api',
    target: 'http://10.80.36.170:10000/service'
  },
  prod: {
    prefix: '/api',
    target: 'http://10.80.36.170:10000/service'
  }
}

export function getProxyConfig(envType: ProxyType = 'dev'): ProxyConfig {
  return proxyConfigMappings[envType]
}
