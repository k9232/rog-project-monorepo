import 'dotenv/config'

// module.exports = [
//   '0x45F571d30157a2E548A9a5789F69558aC56955dA',
//   '0x45F571d30157a2E548A9a5789F69558aC56955dA',
//   '0x45F571d30157a2E548A9a5789F69558aC56955dA',
//   10000,
//   1000,
//   'hash',
//   'ipfshash',
// ]

export const DEPLOY_PARAMS = [
  '0x5C0436A08A1e80B11Eb4F04e7c8631B2C9AdE9dD',
  '0x5C0436A08A1e80B11Eb4F04e7c8631B2C9AdE9dD', 
  '0x5C0436A08A1e80B11Eb4F04e7c8631B2C9AdE9dD',
  6020,
  1000
]

export const RUNTIME_PARAMS = {
  soulboundStartTime: Math.floor(Date.now() / 1000),
  soulboundEndTime: Math.floor(Date.now() / 1000) + (60 * 60 * 2),
  publicStartTime: Math.floor(Date.now() / 1000) + (60 * 60 * 4),
  mintPrice: "0"
}

module.exports = {
  DEPLOY_PARAMS,
  RUNTIME_PARAMS
}
