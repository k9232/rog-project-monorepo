import 'dotenv/config'
import { ethers } from 'hardhat'
import { DEPLOY_PARAMS } from '../config/deploy-avatar-params'

async function main() {
  let addrs = await ethers.getSigners()

  console.log('Deploying PhaseThreeAvatar with the account:', addrs[0].address)
  console.log('Account balance:', ethers.formatEther(await ethers.provider.getBalance(addrs[0].address)))

  // Get network info
  const network = await ethers.provider.getNetwork()
  console.log('Network:', network.name, 'Chain ID:', network.chainId)

  const gasOptions = { 
    maxFeePerGas: ethers.parseUnits('30', 'gwei'),
    maxPriorityFeePerGas: ethers.parseUnits('2', 'gwei')
  }

  console.log('Deploy parameters:', DEPLOY_PARAMS)

  const PhaseThreeAvatar = await ethers.getContractFactory(
    'PhaseThreeAvatar',
    addrs[0]
  )
  
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

  // Wait for a few blocks before verification
  console.log('Waiting for 5 confirmations...')
  await phaseThreeAvatar.deploymentTransaction()?.wait(5)
  
  console.log('Contract deployment completed successfully!')
  console.log('Update constants.ts with the new address:', contractAddress)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
