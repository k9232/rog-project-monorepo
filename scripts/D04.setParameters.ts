import 'dotenv/config'
import { ethers } from 'hardhat'
import { PhaseThreeAvatar__factory } from '../build/typechain'
import { getGasPrice } from './utils'
import * as constants from './constants'

const { DEPLOY_PARAMS, RUNTIME_PARAMS } = require('../config/deploy-avatar-params')

async function main() {
  let addrs = await ethers.getSigners()

  console.log('Deploying and configuring PhaseThreeAvatar with account:', addrs[0].address)
  console.log('Account balance:', ethers.formatEther(await ethers.provider.getBalance(addrs[0].address)))

  // Get network info
  const network = await ethers.provider.getNetwork()
  console.log('Network:', network.name, 'Chain ID:', network.chainId)

  const gasOptions = { 
    maxFeePerGas: ethers.parseUnits('20', 'gwei'),
    maxPriorityFeePerGas: ethers.parseUnits('2', 'gwei')
  }

  console.log('Deploy parameters:', DEPLOY_PARAMS)

  // Deploy the contract
  const PhaseThreeAvatar = await ethers.getContractFactory(
    'PhaseThreeAvatar',
    addrs[0]
  )
  
  console.log('Deploying PhaseThreeAvatar...')
  const phaseThreeAvatar = await PhaseThreeAvatar.deploy(
    DEPLOY_PARAMS[0], // _treasury
    DEPLOY_PARAMS[1], // _mintRole
    DEPLOY_PARAMS[2], // _signer
    DEPLOY_PARAMS[3], // _maxSupply
    DEPLOY_PARAMS[4], // _royaltyFee
    gasOptions
  )
  
  await phaseThreeAvatar.waitForDeployment()
  const contractAddress = await phaseThreeAvatar.getAddress()
  console.log('PhaseThreeAvatar deployed to:', contractAddress)

  // Wait for a few confirmations before setting parameters
  console.log('Waiting for 3 confirmations...')
  await phaseThreeAvatar.deploymentTransaction()?.wait(3)

  console.log('Setting runtime parameters:', RUNTIME_PARAMS)

  // Set parameters with lower gas for parameter calls
  const paramGasOptions = { 
    maxFeePerGas: ethers.parseUnits('20', 'gwei'),
    maxPriorityFeePerGas: ethers.parseUnits('2', 'gwei')
  }

  await phaseThreeAvatar.setSoulboundStartMintTime(RUNTIME_PARAMS.soulboundStartTime, paramGasOptions)
  console.log('✅ Set soulbound start time')
  
  await phaseThreeAvatar.setSoulboundEndMintTime(RUNTIME_PARAMS.soulboundEndTime, paramGasOptions)
  console.log('✅ Set soulbound end time')
  
  await phaseThreeAvatar.setPublicStartMintTime(RUNTIME_PARAMS.publicStartTime, paramGasOptions)
  console.log('✅ Set public start time')
  
  await phaseThreeAvatar.setMintPrice(RUNTIME_PARAMS.mintPrice, paramGasOptions)
  console.log('✅ Set mint price')

  console.log('\n🎉 Deployment and configuration completed successfully!')
  console.log('Contract address:', contractAddress)
  console.log('Update constants.ts with the new address:', contractAddress)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  }) 