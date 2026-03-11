
// mock event - create patient notificaiton:
export default {
  version: '2.0',
  routeKey: '$default',
  rawPath: '/',
  rawQueryString: '',
  headers: {
    'content-length': '2124',
    'x-amzn-tls-version': 'TLSv1.3',
    'x-forwarded-proto': 'https',
    'x-forwarded-port': '443',
    'x-forwarded-for': '18.214.61.164',
    accept: '*/*',
    hooktype: 'NOTIFICATION',
    'x-amzn-tls-cipher-suite': 'TLS_AES_128_GCM_SHA256',
    'x-amzn-trace-id': 'Self=1-691d9a83-03aaa18171e619cf4e085ec0;Root=1-691d9a83-1b578124081481a81c120c23',
    traceparent: '00-691d9a7ec2ebb8ad236b56d739c4c17f-ff435abc75711595-00',
    host: 'tpwumxuqumcu5htahg6joo33me0uhqkx.lambda-url.us-east-1.on.aws',
    'content-type': 'application/json',
    'user-agent': 'ReactorNetty/1.2.10'
  },
  requestContext: {
    accountId: 'anonymous',
    apiId: 'tpwumxuqumcu5htahg6joo33me0uhqkx',
    domainName: 'tpwumxuqumcu5htahg6joo33me0uhqkx.lambda-url.us-east-1.on.aws',
    domainPrefix: 'tpwumxuqumcu5htahg6joo33me0uhqkx',
    http: {
      method: 'POST',
      path: '/',
      protocol: 'HTTP/1.1',
      sourceIp: '18.214.61.164',
      userAgent: 'ReactorNetty/1.2.10'
    },
    requestId: '87435b26-efcf-498e-b59a-fe32e6dff3c9',
    routeKey: '$default',
    stage: '$default',
    time: '19/Nov/2025:10:22:59 +0000',
    timeEpoch: 1763547779363
  },
  body: '{"metadata":{"entityTypeName":"generic-entity","actionName":"_update","status":"SUCCESS","startTime":"2025-11-19T10:22:54.226156564Z","endTime":"2025-11-19T10:22:54.6037548Z","initiator":{"subject":{"id":"82f291bf-0556-4ea7-b411-e25a15578f1d"},"sourceIpAddress":"213.8.166.10:59290"}},"data":{"entity":{"_name":"1","_id":"d4a42d16-5a19-4466-a623-8934e6a68e97","_ownerOrganization":{"id":"00000000-0000-0000-0000-000000000000","templateId":"2aaa71cf-8a10-4253-9576-6fd160a85b2d","parentEntityId":null,"templateName":"Organization","template":{"name":"Organization","displayName":"Organization","id":"2aaa71cf-8a10-4253-9576-6fd160a85b2d"},"organizationId":"00000000-0000-0000-0000-000000000000","name":"biot-gen2"},"_template":{"name":"testglobal","displayName":"testGlobal","id":"8739d21d-9b1f-4cbf-a8bb-6a6298422c67"},"_referencers":null,"_creationTime":"2025-11-18T13:29:26.157Z","_lastModifiedTime":"2025-11-19T10:22:54.234Z","_caption":"1"},"additionalData":{"oldEntity":{"_name":"1f","_id":"d4a42d16-5a19-4466-a623-8934e6a68e97","_ownerOrganization":{"id":"00000000-0000-0000-0000-000000000000","templateId":null,"parentEntityId":null,"templateName":null,"template":null,"organizationId":null,"name":null},"_template":{"name":"testglobal","displayName":"testGlobal","id":"8739d21d-9b1f-4cbf-a8bb-6a6298422c67"},"_referencers":null,"_creationTime":"2025-11-18T13:29:26.157Z","_lastModifiedTime":"2025-11-18T14:41:38.801Z","_caption":"1f"}}},"jwt":"eyJhbGciOiJSUzUxMiJ9.eyJzZXJ2aWNlVXNlcklkIjoiZGVhN2RhMDAtMWJjZS00NGFhLThmOGQtNjAyN2ViN2FhNTM2Iiwic2NvcGVzIjpbIlBST1RFQ1RFRF9BUEkiLCJBQ1RJT05fTk9USUZJQ0FUSU9OIiwiUEVSTUlTU0lPTlNfU1lOQ19QRVJNSVNTSU9OUyJdLCJ0b2tlblR5cGUiOiJTRVJWSUNFX0lOVEVSTkFMIiwianRpIjoiNTk3ZDQ2NjktZWQxYy00YmMyLThkMWMtNzRjYjQ2OWFkN2Y3IiwiZXhwIjoxNzYzNTQ5NTc0fQ.uEgKclBD56fXDCb6xuV88LzEVLXc_FZuuRpAvjyxOpWhynNj0rzAE_Yf7J6JU-6PSv986DCZnQe-cyUy1chYyd2gaF8pftRbxMapi2tWJGvx6S4TYoFJtWUMuV-fITMzdnDf_xswS6l2GOApBKxJH9MKY6jKyIpJrN3RqZeNfRpktK63H7I0k0WlxAsuuX0UU5E1l5jcvbr6gn37ah0tTXHwlL-RFCvb0EeKhFQl7AGb2c0t31HkGLQL3o4Rxp4QlVz0i49imKQgTqLDNauPiCulezlCHpY8uHxKY95dww_OiPQub7pkRZRrn2hh52KfPnVc2LqCvdC3D5o5XcRpQg"}',
  isBase64Encoded: false
}
