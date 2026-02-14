---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QLYGOZU7%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T091739Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJGMEQCIAL2QsghNZzYWtYQpC3cLCoz4YXuYg2HEuF4%2Bsvpjd9NAiAO4HmFq4RJu8BNWUQTBn0o83erKndqnyQnR8RtnjPNhSr%2FAwgCEAAaDDYzNzQyMzE4MzgwNSIMrYAPS%2BYbaYtEs42RKtwDUbkpHxLZTOBnkKLsp6s0nZogbjUijGde7PxC7x9xfV2ARnjDJwyIpyisU%2BIFLeVkqkVRCc9xNxQ4ZSRyTnBeBk0SWKrPeakvzzk20Bi2XB2MqgjdJiPaMVkZBCGbgWBw4wrmJI4i4CPZQKamojn%2BJ%2BK5SstIe3dX4VmODPVEaIOFoSbXTnnfXl0X2ph9wZTLtyYI9hVRnYndLFufvC%2BYibSLSxowfXwOBrWC1uVWweyqLN9x%2FUn6ScVBf3pYHF%2Fsi0OECTQ%2FiWMn0bKwMwl3nmR5x0g3UqOJa%2FdjZBfU7eIqCFrle5B7UTEjSfhq5rdymyg5nGlAuaIYbxWXtS%2F0Eu0jbdbOFlgFusiB4LJknxkb2HK22LitPoS0coa5SVaFKR2Aazba3s5BturMsYBJD%2Fbp7RHnJ8apzPARNocDwZm3JJZAOdl4efkVJTGftpq4ng2gHJ18UGdS%2Ft9EoVTkQgQNSngfF1ZgcKvAna2nCqB8sOFb%2BdPJCOJIIEnji6LeuocNINMpOPePHJdLqd1F%2FiYxRqExGli0knxPviy3L%2FtYeYPjrvYlSi4x60QrOs39%2BXOiHsdinydeMyaGf2C64PbRDLuOeHQxBN9oXNjZetadBO3AWzYkfgihXJkwgfbAzAY6pgGj992TUtQzWSAE8NiLFGx%2BlR%2Bnjb%2ByjuAhfks5emQ7I4AauJPBKPrYFZZdFr2Ju33Y0TD5kml4TSnEptRe%2FdjUGqvosEbhrVc7uI8bEygL3enPu8iLdQh4uXq7vdfp72WKp8ctYY4Gb3XcWwS32oCRg7TqmRwcsOSS5pI%2FAtJwZxR4A%2Bp44lJXL4N7vKxpRqjRjJL5ezftx45l2%2BFAVIw8uyzRpsiO&X-Amz-Signature=068eb729c7c08785c4e5ded6ee67b5646ff230b3738cae2a5ad7f269f7d85e60&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QLYGOZU7%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T091739Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJGMEQCIAL2QsghNZzYWtYQpC3cLCoz4YXuYg2HEuF4%2Bsvpjd9NAiAO4HmFq4RJu8BNWUQTBn0o83erKndqnyQnR8RtnjPNhSr%2FAwgCEAAaDDYzNzQyMzE4MzgwNSIMrYAPS%2BYbaYtEs42RKtwDUbkpHxLZTOBnkKLsp6s0nZogbjUijGde7PxC7x9xfV2ARnjDJwyIpyisU%2BIFLeVkqkVRCc9xNxQ4ZSRyTnBeBk0SWKrPeakvzzk20Bi2XB2MqgjdJiPaMVkZBCGbgWBw4wrmJI4i4CPZQKamojn%2BJ%2BK5SstIe3dX4VmODPVEaIOFoSbXTnnfXl0X2ph9wZTLtyYI9hVRnYndLFufvC%2BYibSLSxowfXwOBrWC1uVWweyqLN9x%2FUn6ScVBf3pYHF%2Fsi0OECTQ%2FiWMn0bKwMwl3nmR5x0g3UqOJa%2FdjZBfU7eIqCFrle5B7UTEjSfhq5rdymyg5nGlAuaIYbxWXtS%2F0Eu0jbdbOFlgFusiB4LJknxkb2HK22LitPoS0coa5SVaFKR2Aazba3s5BturMsYBJD%2Fbp7RHnJ8apzPARNocDwZm3JJZAOdl4efkVJTGftpq4ng2gHJ18UGdS%2Ft9EoVTkQgQNSngfF1ZgcKvAna2nCqB8sOFb%2BdPJCOJIIEnji6LeuocNINMpOPePHJdLqd1F%2FiYxRqExGli0knxPviy3L%2FtYeYPjrvYlSi4x60QrOs39%2BXOiHsdinydeMyaGf2C64PbRDLuOeHQxBN9oXNjZetadBO3AWzYkfgihXJkwgfbAzAY6pgGj992TUtQzWSAE8NiLFGx%2BlR%2Bnjb%2ByjuAhfks5emQ7I4AauJPBKPrYFZZdFr2Ju33Y0TD5kml4TSnEptRe%2FdjUGqvosEbhrVc7uI8bEygL3enPu8iLdQh4uXq7vdfp72WKp8ctYY4Gb3XcWwS32oCRg7TqmRwcsOSS5pI%2FAtJwZxR4A%2Bp44lJXL4N7vKxpRqjRjJL5ezftx45l2%2BFAVIw8uyzRpsiO&X-Amz-Signature=068eb729c7c08785c4e5ded6ee67b5646ff230b3738cae2a5ad7f269f7d85e60&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXVQHIHQ%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T091739Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIQCcNdWwDXHGLjZVVxf%2B7xrYmPFmzthWT%2FRkrBSRDuIP8QIgGprQUcRbE1YxfjL5%2FrC%2FLcXjEKLNo0BWHFfO374rPhYq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDAuR3WN91sEfMlPBmyrcAxLFckT%2Br5UQEeDhTv2GCs%2BJF6RJl3ZJVqagd2BFO6lmpD7C0yZDwC5fnPR7dxG8P3KQd8x87xt%2BHtLU0BeBnxkLqx7eFINTPg0kO5N0ajSJ6DfnIvj0lKH%2BhEmeJhRj4O7LUhLqV79UwQKylIm9gBBYtnkNZuItBu3MrZ2j1cAp9RlqIlkXB7hYhAx7Q6UoxtZNauNEq%2BkNs%2BykSSWLT3gZ7iZI6WuBwFoFj%2FHfLSuGMQLOkP8oGGqHKUmgp7GXvVfLYT7Mn%2B8kKqGAUvE3eRnY%2BCzymR9eN%2BXD5CDHlN7bigOgOwKucurH4Dtg73wPPujYu25quOGsuX6x3J6gZS4jyKa06eBvYQVZm7JQ%2FKuESTFOObdSdXZ3ja8VrCXZJg13KvnW%2Bp91K9%2F2R3%2FQv7Q5qB3AXKNZrurOjh%2FFIITrfz3uC2j7CFPOh8LGmCU6Fy4dKw00sjxPl6zaW%2Bkez3cGuBLfvV%2F6GuoRTC%2FTx%2BsCfLJD1T6yaZCQTX1RBbB8MECrcu3F4fgFAdwK3%2BDa7WDZFXQ88a3nnIHcxN7hddcTSSCItrxrLenFhf1ssHgBcKAnFKXGLQ8404bxXu2sl9Q%2B9L4lLlqf50paY1d2SF2fOZReFgNhedPcDtkpMLD2wMwGOqUBk5YMkP3N%2BkrLVrnOQVioxbbyDz4v0hZMX1XvST7uEV0O7vZnurqOt9JRj6yO9WhwMCrkI0coe5FZb6gIzbQfvpWBinR9Jspmxu%2FzbhLQg3pa7K1EFck4k8NlJe%2B2lUdOMjHM%2Bn2xkwuY8LF07pgVf3LIObFHlt70lOfZrxEMdYY4UhbfGl2pVTrWYaX6rXLHhbnADI0qhugF0s2yloTgFsvWZmrm&X-Amz-Signature=8074f25e67f7983cbb40ad1f98c0d4ec71e73c7821286f0946e6182b8ef2fb22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UK2P2T3E%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T091741Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQCL8LMuPHBYMspQje9fxdutJziJOgYrPNkxzxLsAdTgvQIhAN7PPhdkbBoWEpO6hEc%2FwxLG2COWPN%2Fb%2F%2BqOgRs76IS5Kv8DCAIQABoMNjM3NDIzMTgzODA1IgzIWv4YqgbQd5lUBcIq3ANxWJMEyeBtgMlvZ1tDEOAgYZkNvF1D5gJKTZqCvQ7IWTti3H2fczayzCU05Stt%2FXriVzu3VotRZ8ZQCtlKlzprsHSJg4PxtbM%2FuMuRfWxrEhjk2GRn0ceq2hElBnE51zSM5sQPmnqu7LxSG9QApfmhryNs3%2B%2B14PmfGTPe7R6ZfRKrU189UwI1S0FS%2BFA3JAim8wiUfVA1REbVAJl%2BUDR6DZxwMG%2Fw9wBzoYP6OKvvvQ2k23ffq%2BW%2F5xrYXsnPCTekkXbsstDbaIjda83AoyhZbzaY9m%2BDrsoqABr1ki4asOyU6Iit%2Bja9jkHQ6VvSemQkwz6D5ygSXGz5NyvpdR2mNMld4k6ilxnCNJTSKR8INBYgmaYPstUZg8akb5qMCxBVLAMorRvr7mxgDiIHVgx%2B9KUQKAXkFvOBqdLsPKna8vKiVFv32RJqppEANhAWqNvbi5zMy44ewZ4aREvdWGtZ2bO69pRPq2DoKTBAiLUAgMlJeM%2FNiP3fGUfO0kog6kCN2HyEfhFpnzmZ549pTVnAMUotmrcS6xXzgVApU4GBcAlaZnk%2BOdY4gKp4w3YnzjQSYQ30THznJcWHrdCBB96JIkGBPoQb7pu%2FYcdEm6LOoQm6CLOEZEGs5sz7TzCq9sDMBjqkAU%2BzTHGZbrqXUWOUkeQD8Xx5MAP%2BFAZy5Rrx37hQEX66DHgMh4OrUPprmSd4cql86pq6CLnJdcGaLyune%2FJD%2FThCrHFlR5W9MB6yL8M53%2Bl3qwwiUOylhH8FmHnqHr3rl%2BZzXENsjBZbe%2B%2Fa%2BilvaTBwVBd4EFa60cyznbyd64wBqm21JFOQCeSUO7nIKSgRfUERUC1g4DJ1LiN%2BGPKi0eussjbU&X-Amz-Signature=cee9352275b9caeb70fe23d5998472767300b3df7438e7f7390b47ad89fd292f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UK2P2T3E%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T091741Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQCL8LMuPHBYMspQje9fxdutJziJOgYrPNkxzxLsAdTgvQIhAN7PPhdkbBoWEpO6hEc%2FwxLG2COWPN%2Fb%2F%2BqOgRs76IS5Kv8DCAIQABoMNjM3NDIzMTgzODA1IgzIWv4YqgbQd5lUBcIq3ANxWJMEyeBtgMlvZ1tDEOAgYZkNvF1D5gJKTZqCvQ7IWTti3H2fczayzCU05Stt%2FXriVzu3VotRZ8ZQCtlKlzprsHSJg4PxtbM%2FuMuRfWxrEhjk2GRn0ceq2hElBnE51zSM5sQPmnqu7LxSG9QApfmhryNs3%2B%2B14PmfGTPe7R6ZfRKrU189UwI1S0FS%2BFA3JAim8wiUfVA1REbVAJl%2BUDR6DZxwMG%2Fw9wBzoYP6OKvvvQ2k23ffq%2BW%2F5xrYXsnPCTekkXbsstDbaIjda83AoyhZbzaY9m%2BDrsoqABr1ki4asOyU6Iit%2Bja9jkHQ6VvSemQkwz6D5ygSXGz5NyvpdR2mNMld4k6ilxnCNJTSKR8INBYgmaYPstUZg8akb5qMCxBVLAMorRvr7mxgDiIHVgx%2B9KUQKAXkFvOBqdLsPKna8vKiVFv32RJqppEANhAWqNvbi5zMy44ewZ4aREvdWGtZ2bO69pRPq2DoKTBAiLUAgMlJeM%2FNiP3fGUfO0kog6kCN2HyEfhFpnzmZ549pTVnAMUotmrcS6xXzgVApU4GBcAlaZnk%2BOdY4gKp4w3YnzjQSYQ30THznJcWHrdCBB96JIkGBPoQb7pu%2FYcdEm6LOoQm6CLOEZEGs5sz7TzCq9sDMBjqkAU%2BzTHGZbrqXUWOUkeQD8Xx5MAP%2BFAZy5Rrx37hQEX66DHgMh4OrUPprmSd4cql86pq6CLnJdcGaLyune%2FJD%2FThCrHFlR5W9MB6yL8M53%2Bl3qwwiUOylhH8FmHnqHr3rl%2BZzXENsjBZbe%2B%2Fa%2BilvaTBwVBd4EFa60cyznbyd64wBqm21JFOQCeSUO7nIKSgRfUERUC1g4DJ1LiN%2BGPKi0eussjbU&X-Amz-Signature=1f16eeda86e5cfe273255428aa5c239ac36bb6c4a0c6c5f455462d73a26868a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZVWXZHB3%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T091741Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIQCi%2Fg3j%2BrBNSp%2FzEHjbLoNvPFrXpT9nJph5TbUwJ%2F1GhgIgGcNp3QgvUiJBElZCf1y5K%2Ft17elV6CQ8iAZ7zyKN0PYq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDAByvt0WWX%2Bp8ZLL6SrcA6HLuIqGTyGhWbOlz%2FDFkB0ZGPDfvNSSff%2BboyKGZUJrj8zl7JfBIHtPvJJo%2FIZguVxhkV47XbJi3ZMEfxPRmHzznpc9inVbcTJ1T6xUrpuMVr0nEMY%2F3FduoRMzKfkq9Cx6VruG8uDCFPTim9CL1MMvl5OWhrHYO5h%2FjQ4tiDqX8Fr77LVZDFvsuRGutU1dG4b2EsEBHoIJUSIVcUvFLg2ah7iHujc%2Bjp%2B%2BCG5xURFq8kmhElZFYncZ5nyDr8tDFRUS5fLG4YANmieJxOwYDd9qwninlNG3p7UX2mDU0n4OkIXLs1wUuPS4TN2L6%2BYkNstFzBp3RYdoTcZ25WfRKCLmageY%2BJWd6jSSGJDsb6LQrGb09hz5Wisek3g%2B8zJ8Ifmpso9Y%2FfOcoS58CWRnraoKv2GVXxGDuAKHWwYHJc6Ro4ts892lTUmdS6bAZgwwvl0PgSAw0EJswGeOeaXLeR8lI%2F4UKAoWciHCgVXfGmP%2B3Zq2UPzuj0kUS7vwv8OEYHHZ9w%2B36ul46FNA%2BO6jjRanFSRw5Qj8xRA4Pt1Jcx5pCRZnKVxFtdIz8Te%2BV2HyR6sOaSKmLo%2ByhMwXr8StEZhC17D3VMxNIeF94zrnPFtheZ8a%2FgTWXwQHCV7OMNP2wMwGOqUBQM6f05ZBkdq1EV4CGU8JvunOHPa%2BMVW33rjx3WbSVPDP4rvdNjnT1vZcnLZGuYNND90EZZXX2uHjen%2FAMgIXQe4pGEoCTkMnsRDkuqFKTToNV0BRyFWUU0ki4NZN5p9xR7xK032rIXt5vctC31NONHA4pwthEN36zzhYaUOzWnf0HuTbhq6UIRJU6xfGQGZr04Wn2BgVdpMtPNivlXu38XkQJYXi&X-Amz-Signature=ab21054cdb68aa857226dd30260d4aff7102c177763c51a7749d49ceba881836&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNPZNNEC%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T091741Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQD0UlnY5BeQ35B4GyUejwyMPc2OfdHfnUf9gAia%2FQGuHQIhAPDERxThpTXe41LTnuPCgXPBI1Lfk8eUzoajhhxgx%2FQ6Kv8DCAIQABoMNjM3NDIzMTgzODA1IgzZ2ax3RDwyo%2BJrcY8q3AP0ix3RR86ovhWIxufo1tw4TXqmc598wc6s1Q9RM29rt7v0sQhG%2FIy0oyPZDP%2FIYK8Y4sa1Q0zH%2BFoxnmgjdU1fXptWLLQ2aMEvBlCm4fEL3WSn%2FVQiK9%2BJPs2MRc7rLHLBEAWv103%2FWlTHvwC9hpR%2FjKKS0%2BpHCWa0qqWW1cTsf8U6KeHJg8PaD%2BCPrPELZrJMg7JSUKvJJq%2FkzcpEsu%2B8kUMlkIzbr9LqV7KcgkKDgF9dAonINoA7O%2BXBWGMVi8raD7q7lu0A1jb2F4zrl7JeVdxhThaQ0BPZuzvaAmkYrYF1sMnYO2V9w5hKL9Zs1%2BnWttmcaP8sjDMwWZizetS7oOs%2FOWJjeFoPABTejzMWA32t%2FJv6wvVwbSQOAGbcwSbTN5dpY%2BzLX%2BtPXGKwdwtmI9bS1Wbxl34ycSNOiGjS2PlY6GpCHElJKrF65Y3AgbmbGUKvIpE1qxpMjM9jIb1cVIGZzxmaEmz4OeJEdmSXPQFXp76qkMRiVrdvCpuxEqbvENiIMg5gpAJYRdnw8KYXcvhCk4G7vYFlYwVAu6Qefzoh9HPvmyfEJL7ECWxKuiL8ByRPKCYSvOpEteWZSRe8XyicpKItz4ctQXwcbz7TFpf2D%2BvkLy5EVdmOIjCS9sDMBjqkAeQ024KM%2B3kijq4CTxpuRSDss6r2nOI70UHiifRQ%2BNH7HkyZF6JsGtv8%2F8KOQtUKynu%2Ftt97zOTvPL97aYBuaDIPXMeyDeeIp48LQIHOprrxH05xyR2wIOaJuEAqZXy8acMFI2%2BYaqxZcsuz1jB26F24UCqZS3A%2BWId8692t35KvcNq7pMhgWGEvgwlDFvHRzkyeLC4HXP1zZKbfLCMi61j9x7Dv&X-Amz-Signature=5b58285cadf2e62caad296ebe7532b963eef218c5a8ce9bb82f72f1aa1879f59&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UPU6I2Z5%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T091744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIQDjdj99TnVbtBonOUqYmchrq8QGptR6ghp0plkm2BY9YgIgFYfuTl9Wt3vgNypVxOhN089pXit4c0bD0vka3YndcWIq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDFadX2tvo53XK1s95CrcA4lJYH%2BNEcpgKZDogMcxr3R1SB0JAqWyTenv8qeFQD75LuzJujLN2SDFbZtNz%2BZyR97EKjD0OGGaM%2FRZ%2FkzLLIoXwP4PRPeVaqA7UL7bwTxSUpOfdT0aryOsNjotKBBxQ3CAxZ9PcZQBo%2B%2BnnhBfObjsYMv2JR5iAAIq2aN54h3La9m47KQpsAEzbQAcZu9SGRo0F2VUbyYF9kC6muoWvkuZQly3iHt5EHWQMGlmJNaW%2Bn30osz3btDsGXKLbDsb0YRevY8sBKfWOUAPEOeOKfhaVhF7CGD7nSCoWJwmxKLNaP1GQrV%2FwsYR8LGjGShUxAzlwytxBNw0YQY188KN5hGh5lgWbQxR%2B4Ec%2FjM2m65sUlSCIwoAGWXjgH7dwCbqJJWmj8s5eNYjG%2Bz8B5dSvib0yocXuqFw9ak8MLtacOxhNuBYwsPTYB7tzK7FHOvq1ceIR4A5VgWWJIR4%2Ff2adGRlAfbjE1Czy%2FGDcAZJBnX7wVyhqeH5Ct8hn%2BoJszLHToCdUYA4WZ70V1J7pwSEomSye1vNM%2BJI1Dh7FPp0WDWJ4tdDSSJ8U3TzA8%2Fdd5sZ0w1sgGhP9dyvydxkYJVv%2FjTgS74WrkpK%2F9qMOziaZ4iM2%2BXCI6tf17VvRsg2MOz1wMwGOqUBo18cHxDwCKU0tRFvOys8sTupCrY3OTezHgraxxA9tUy%2Bs%2FBvBnbmL9Nj4ot%2Beg8E6jTnCFU5BT8738y2ThpX2g4lvWagCjEHgssPGS3fEzLtnB9Qv5LDyhxw7DiPgumAiUnADBOPqNSFfC5O44i4qQ4UrNFdoduF2SthFgNunPe7uFrdiy10psx9O6DCpg%2B7AixfRXXd4Non9TwmQNABYoDCz75Z&X-Amz-Signature=52dbb2e77dc3ff5b8acbc92ba24f52228385cebe685711dde851189a960ecf42&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663DWYECLP%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T091746Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCID2cXMekclJY035%2B2eiobhOCCxeSypG20MsflIJwm2MdAiEA9IsOAU914XH9axnEe9uoJhbnPeQSkJJz%2BFkmeR34mUYq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDMNBZSETp4dEZRPzryrcA5SNdKh3K%2B9PccGv0kzHY1NQBWsH3TbnNSI7z1VT5rV4uw7t2LL5JchuOFj0rD9I%2BXbfNHBmALidtuITbCT%2BfoSxyJNxWTkFeB42yGoLUysuYCRyFSQFzkGTbJmmCTGYikeooQ9uPLGgsEWyhLmtw%2BZ74mmOIVuAK1E8T1ttM9ThNsU%2FNnCHomm9r00rPXDXn%2BAmyhaY9dD8aGklsGgUKZvINfef4RimKEv44PXP%2FlU607cFFiI3iyNe6WL60cvk6zx49zGeyvA03xcwKS4n0tCO73ndawJo7meALF6%2B9hYCfIvoo%2BGm9z09C%2Bzy8e71rhPuVTOb5F0M1lqjGjKDeTbcc5C2Fc7XTw0UM8mDCSr9AB8lfxyouDf8U0skvkrslamPIB32tN2VSZFlNNMPRbGbQKvm2VhjX8SEoeW0UcQE97pWh9zaQqcES9gYAFsSM%2Fc78h9iQiWtDbiJf66kOPK%2BM1Wp0Fopzti7oW3fHsjMLji24xmlCHywQf6X4MuMcjpBbl%2Bg%2F7A5cGcBFECldzk%2BHuo3aoBZ%2BaEygweaFP7gv7%2BluyJwyUNVDhcqjmQM9R1fPm439s%2BNrFL%2FHGZEh0FOXQvxjKvZ3nkL0K879zfk7ENXJKwU9kmOFVNZMPX1wMwGOqUBq4o3sPxmDxlQ9HwDxKpAgbDLTXC2fk3GNcsacBRYqB4w7ewu%2Bb3E86jk5jzSFQFVKkNqASNkFcbP4zKl3aZeNS2CqkzkXx2dom4tllFOL0ih6pBgnSB%2FZ3ofW0frOFZzxIbEjsA77A5aH1mSOzrC1Q5xHdzGlThrgECxQxFFs%2FmF0So%2B8m%2FjSpCScncYH6daZUcCyb8zpuvjtONrWQy47XxLFBxu&X-Amz-Signature=07636bb9dfd4b598a27b9219fd8aeddf16084afb54c6294c4cb2f2c9cc081ec6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663DWYECLP%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T091746Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCID2cXMekclJY035%2B2eiobhOCCxeSypG20MsflIJwm2MdAiEA9IsOAU914XH9axnEe9uoJhbnPeQSkJJz%2BFkmeR34mUYq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDMNBZSETp4dEZRPzryrcA5SNdKh3K%2B9PccGv0kzHY1NQBWsH3TbnNSI7z1VT5rV4uw7t2LL5JchuOFj0rD9I%2BXbfNHBmALidtuITbCT%2BfoSxyJNxWTkFeB42yGoLUysuYCRyFSQFzkGTbJmmCTGYikeooQ9uPLGgsEWyhLmtw%2BZ74mmOIVuAK1E8T1ttM9ThNsU%2FNnCHomm9r00rPXDXn%2BAmyhaY9dD8aGklsGgUKZvINfef4RimKEv44PXP%2FlU607cFFiI3iyNe6WL60cvk6zx49zGeyvA03xcwKS4n0tCO73ndawJo7meALF6%2B9hYCfIvoo%2BGm9z09C%2Bzy8e71rhPuVTOb5F0M1lqjGjKDeTbcc5C2Fc7XTw0UM8mDCSr9AB8lfxyouDf8U0skvkrslamPIB32tN2VSZFlNNMPRbGbQKvm2VhjX8SEoeW0UcQE97pWh9zaQqcES9gYAFsSM%2Fc78h9iQiWtDbiJf66kOPK%2BM1Wp0Fopzti7oW3fHsjMLji24xmlCHywQf6X4MuMcjpBbl%2Bg%2F7A5cGcBFECldzk%2BHuo3aoBZ%2BaEygweaFP7gv7%2BluyJwyUNVDhcqjmQM9R1fPm439s%2BNrFL%2FHGZEh0FOXQvxjKvZ3nkL0K879zfk7ENXJKwU9kmOFVNZMPX1wMwGOqUBq4o3sPxmDxlQ9HwDxKpAgbDLTXC2fk3GNcsacBRYqB4w7ewu%2Bb3E86jk5jzSFQFVKkNqASNkFcbP4zKl3aZeNS2CqkzkXx2dom4tllFOL0ih6pBgnSB%2FZ3ofW0frOFZzxIbEjsA77A5aH1mSOzrC1Q5xHdzGlThrgECxQxFFs%2FmF0So%2B8m%2FjSpCScncYH6daZUcCyb8zpuvjtONrWQy47XxLFBxu&X-Amz-Signature=ad3bfd84fc88c5e04b7989d54e5d867c5956edfe612c1e5b5a74d29d91bc5906&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T6XJQN4J%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T091735Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIQD%2FZxC3bqsr9R7YpOMXWToYHdyHXHiG%2FuyDgsKi0Zk3%2BgIgVK76hmnkkIelRA5sPfiP3I3WahV%2FpkKzGY6UlwPV1IMq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDAJeZydbJ%2FFf7CtPHCrcA4SZEamNFu22oJsR%2F7vYnIK%2BpAVBqQYsMgY42cncqpuMfNTs1aGdNI2qdZipBIWpP8vcfr4M53hHaTLNPWX3oSQQ4b0k%2BX5pPi9vADNtusvC2kzUdkA0f2ly35BBHRxUj6N7L6Pv8EwI%2F2SbKYjy0YehD3eVpAmcDJd%2B7LoKBq5W6JDH9augoLCe4aMhj%2BvVqDzOGRZatrA26fntpm%2BsMejEyU4hqTY4%2B5jJ9wtIf9QjT8AyzMsS%2FeP8NSEwwudvxdsANYoHglCE5KkzB1ZmK9bqhc5qHblQ4%2FpJhcTH8qwzYr8YBdNmZVPkuy49DYJy%2F1jlP5GhPplTT%2BIPNyT%2F9kiJM%2FgfU0McTJxCaSf5peYaPAK%2F8h%2Bbv%2FYBZRwfJn5v6dV3eoBToHibt8D5ILi7jZFKme72s9AXSdjyLxEn2qd15ddiVUZeWQMkj%2B%2FjtpKI8F8g1CnoaUhZU%2BR79yNgWK82MjB655wL3mR3FLgAtD7vHZK7wkA1BerD1JoARrG6sRrr5qvxXq%2Fiu0vhxzISS2PfgA75BZcdkKPIfBCEb5eEzRR3p04UQjQOsRl5brGJ033P7L%2Bs1ZJNHKGyFDPsUZHODOv2ATxk63lHfl%2BSoHTY%2BFgt7A5%2BDU7AjNMSMOr1wMwGOqUBRXppGATO2430zE3OT0i%2BuAQulKwU5eX46on4g6qQ2vfTuS6IJV%2BlIxbIzEzTXtOUYjSl3w5fVyUh1PtsI22CnfHAE3qNRresI4lLLDBlAf4JFMWp%2FpIemQh13vsinpXBsKLNFkx2vGJ25f8Ba2Ks8rOu8coI%2F8dWyFzDI0uLd4tD39itX9aV0fzd71cQvBzPsMZvWYRMN2bWgs%2BBg6wrx4GAPv9g&X-Amz-Signature=553a4f4c6554303e2912d3bb9cb0ed3c7a2431a9d3152a688079b638d39d3f88&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UXFRMVZ4%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T091747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIAJo1GNgk9obkIFseMlQDLlldzGVW5QLFLwxIzcTUxeQAiEAkBOUAsWDcN9WIdq9LVf8r%2FuP6xOxfGldR%2BfHPkhE0pQq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDJ%2FdoAVq7q0m5mz5tSrcAw2n7eqFfK9rKGrnlLvEY3QEHaKoamo%2BMBtIAG%2Bayy%2BsuVMMlSaKu5fC0QaaZSh5X88tA85eFp3G25TXTgi172Jso2XHCPalVzfmdrjqwiX2s6UO%2Fclp%2BkS%2BjTYw9uxp%2FaZDXni5BGoQ8SKl22eOX9wfCANeBYySqyr8ozTWVmlNME%2BVTAdL80eGOBXvWUibQ4W3yqwC%2BBql4qQp2qA%2BBi%2F7BUecr%2B331nJqldcWoRERPNEml9hTF4k29XvMHgKPv8eE%2BeBRuOZa2V8W80zxp0Z42QHg5FTk9zdj8cpvqquxzPHiqnwlJ%2F25fcT16nuTBq7HmnKod%2BnjVim23frwi3tH3P4sBUUnSmf18VpUhUlKI6l0DE2wG48SL3lOJl9SLO2I0eJ%2FYERBUCzOLco8s6nw4mOxQxqL%2BX9rOfoXso%2Fj8J9jaqPvWrftvdZFM44Ul2kS6ctfDnBoqbI3tCgaNF2C3gAzwVE%2FhRDqUXXQSGqXYbnl7Ti7fREldhEEMJxuTVslpjONHxIT32BWog5DiaKeX%2BqtkRRc6PzDyAgYmLypSTXGE%2FoIHVIQe%2FA8wWXFg0MTs8slkHTqXcwdrQYxrOV6tkmPrP56NLMzsAuWV6q%2Ffc4RjijLA6vKYvkkMOD2wMwGOqUBQ5x6DJOeMjtV7%2F6PlF35PQxrxOZ6aELWUTseSVFSWZbM93ovMwaXMXYDRJntw2LenfugkSBnc%2FX89sI1YfbYDtHRy9E1%2FIxzyHYKD6YYW%2F3g0J1XCBJYXeN9hB4A54reaeyeptRE2T%2F0uZeCgzFAUxoNPuvjb6h50WqwnjP6vXn%2FxjzFsOBmq7unCCuamXHWqsx3uQzjy6v5TibZOJXbcHpQbtbv&X-Amz-Signature=49d4997b04f8d9941be74ce3d7b2ec099f99f79f703d3356b069d65f1ac36878&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UXFRMVZ4%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T091747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIAJo1GNgk9obkIFseMlQDLlldzGVW5QLFLwxIzcTUxeQAiEAkBOUAsWDcN9WIdq9LVf8r%2FuP6xOxfGldR%2BfHPkhE0pQq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDJ%2FdoAVq7q0m5mz5tSrcAw2n7eqFfK9rKGrnlLvEY3QEHaKoamo%2BMBtIAG%2Bayy%2BsuVMMlSaKu5fC0QaaZSh5X88tA85eFp3G25TXTgi172Jso2XHCPalVzfmdrjqwiX2s6UO%2Fclp%2BkS%2BjTYw9uxp%2FaZDXni5BGoQ8SKl22eOX9wfCANeBYySqyr8ozTWVmlNME%2BVTAdL80eGOBXvWUibQ4W3yqwC%2BBql4qQp2qA%2BBi%2F7BUecr%2B331nJqldcWoRERPNEml9hTF4k29XvMHgKPv8eE%2BeBRuOZa2V8W80zxp0Z42QHg5FTk9zdj8cpvqquxzPHiqnwlJ%2F25fcT16nuTBq7HmnKod%2BnjVim23frwi3tH3P4sBUUnSmf18VpUhUlKI6l0DE2wG48SL3lOJl9SLO2I0eJ%2FYERBUCzOLco8s6nw4mOxQxqL%2BX9rOfoXso%2Fj8J9jaqPvWrftvdZFM44Ul2kS6ctfDnBoqbI3tCgaNF2C3gAzwVE%2FhRDqUXXQSGqXYbnl7Ti7fREldhEEMJxuTVslpjONHxIT32BWog5DiaKeX%2BqtkRRc6PzDyAgYmLypSTXGE%2FoIHVIQe%2FA8wWXFg0MTs8slkHTqXcwdrQYxrOV6tkmPrP56NLMzsAuWV6q%2Ffc4RjijLA6vKYvkkMOD2wMwGOqUBQ5x6DJOeMjtV7%2F6PlF35PQxrxOZ6aELWUTseSVFSWZbM93ovMwaXMXYDRJntw2LenfugkSBnc%2FX89sI1YfbYDtHRy9E1%2FIxzyHYKD6YYW%2F3g0J1XCBJYXeN9hB4A54reaeyeptRE2T%2F0uZeCgzFAUxoNPuvjb6h50WqwnjP6vXn%2FxjzFsOBmq7unCCuamXHWqsx3uQzjy6v5TibZOJXbcHpQbtbv&X-Amz-Signature=49d4997b04f8d9941be74ce3d7b2ec099f99f79f703d3356b069d65f1ac36878&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665YEMMV5N%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T091747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIQCGnXfxG%2FHL7PEmrbrqGHKMXgqQ1P4GQni9kEM0kPzzjQIgSE7fzLlikvh6tYM10LmEhBR1YBseV6PehgHZ5bBVjpkq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDGaMSwl%2BBhMPXIu6NSrcA0svTD9enJVo6%2FmE1hYyne8Lj%2FauDWoEv6nmpvNuPkQwZUCqDVSmwPCkmbYzpO2FPab21pNEkmcbr8Vrrn3BbIkyMRJXMbIyTE6HTEm43yhSs3xUL4ZCFlrSmGk2Y5NkYApcleYQex431bDPJsLeTcLtQzCahAhYG9QJdM2HQ4u6zo2ytYvvlfTss0TfYKoP3d5BBoo04GpynRTQ8v1fB%2FDHms5jg6FVVmNSStJI9OISX%2FjSRVh3KRl5Dm4RAGuUVSa%2F9gbKwllI2n41%2BlxoF7Or%2ByvR2Wu8p9L0d%2FB912c9suE7NJwqEM7aOYy0MfkOCE7%2FqoVith5wsiBhaewWLGodlo%2BLT2bMypuYiqRfY3urkOH50ABsFSD50of1C75JZtLlijbYQovImuMeJ04nCy7hQr8Nca6ETGns8twUPT0EqyQbzdhAeVtJlF3A%2BZETlS%2BHoSiqAjGPQrkQon0hinYBq2u%2BUUY0RaEge88fuEIBqKa9l2aJZ350%2FFcyYbFVOA8cSqmLmk4%2B5bGmwxkO6ieZveyShE12x7ohLPmlQaxOifCmjI6W3h3P6DJXl2iX8l%2F%2FcD%2Bsts%2BIO4AD0KtFqehy3mbU95AD7JtjYtbjA4f7YCY3N1jHFZD47ItTMJX2wMwGOqUBiBvPMZYfiedHgok%2BHxaUD7Ujy8VwVWwUu4P0Mhf5pYCSNRdGD%2FLGc2pJCnrKYeEOQOGKHFPwmW0MqZxtvw4zNNFw%2FsCoQBgWM2%2BAV1Mm4l2MwXrBK6faAiaf3FVYpaUJtZ47a22Yg7uX5B0hEOjxppubMSzsIF9iffHGTN7saE%2FBJ0EtPYRvUylePpEcKMWtaB60GoBJQLTqPQ3IGOUFvn1blL%2B8&X-Amz-Signature=b06e2777a865b5aad7d02b89c0b824bcdfc351a264b971f26158d90f1658d310&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

