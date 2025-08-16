randomSeedMetadata 1234567890

# TABLE nft_info
tokenId 1
metadataId 234
userAddress 0x123435346346

boxTypeId 1
originId  default=0 (未解盲)


# TABLE origin_metadata_info
originId
boxTypeId
metadata
isAssigned 0=未分配, 1=已分配


# TABLE unreveal_metadata_info
boxTypeId
metadata


# TABLE phase2_holders
id
userAddress
boxTypeId // 0=金, 1=紅, 2=藍, 3=公售
