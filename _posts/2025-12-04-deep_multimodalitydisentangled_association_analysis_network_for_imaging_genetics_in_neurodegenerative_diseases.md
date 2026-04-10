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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664DZEW42C%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T123744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJHMEUCIQCzNvbF1sYRSQd3Lwm5BzttYO7NrDKIJi6QTnB4k5LxaAIgI8x3PxUJGBBwCGVA10gYWjUbGW8%2FHO1dnkjm%2BVIZeK4q%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDNj%2BHYXCLCzLv5%2BMsCrcAxRN%2Bcq%2Bkua%2F5NruVqhdcx7BsxcEZj7KQoMdoWUAgjF%2F%2BQFfwLP8%2BvGB9pRao5kiu71VP%2BTJgIqnMLy72v%2BHOH98ozTEHHoUt4WJ8dmmoYzbhOKmfWr4d4s4018%2BIWBRFGpmMoiLMFi3q9D3emYC1c7seJ2MijGQLYsq%2B6qyvz1V8d1yihOjUMv7YS5EGEMIIqCvPHWuwFLnqBUmhPFXrft4RBiHYRZZGWAuGfoWbotplNxIyknt9XAUEVHDVLm%2FZx2mtY6juVl9hLoGgPcO%2BwHBdGD03BGRNgg1YJ7TdjFt5bIehdjWg3TZPgLwEOdPcNk6JHoBF4Rn2W9p4GleRH82juDeHVPhpxewx1eCnMUh1P617Z4i33xe30tnRkcETYiAA55BDMOIQuczg5SuZaXIr%2F52p%2FQQ7N6e8z9UVDMLswLXaAJK2bjGBzlfkLubqDbxp6elzkSCTDeS2wDlStqtT8LWFol4FLqLad5JA3fRvuJjw0Cm5jWUcSw0hMF2CZmDvjTSZa20tPlW%2BPmNoc8UrJaMIowbztrPIE%2B0%2BM%2FJiXDraN2AfEQV8ws2GRsxUq5DeY4QOGkhbcO2BGbByMb7hnHPTYvCaw%2FRqXwJpPxunVlZdU02RLT8prPJMJbC484GOqUBoyzkGfIDdxtE7VLKdYuoYV4M%2BQbH0zykDnNrN3MOoZfYgLgikf7Wp3717EVToPGX1a4sjZ5mwcPGlyu9dr3mHzizxzN7N0sFMcLnPpwTy3W8Vs1OsJWBqEdM3JPk5vcS8b2bTDzx8SuZtcL%2B5JEPx4iVkjPrtBwTEPLW2XzS6N%2BPa2qJp5aKE%2BnCETda2Sde3oiKCgc%2Fn9FfvEGreq61yy8ojXQn&X-Amz-Signature=33e356a7bb8e620c682c57c415e376a88f402e31f87bab3d9860c8c5d4c86d72&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664DZEW42C%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T123744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJHMEUCIQCzNvbF1sYRSQd3Lwm5BzttYO7NrDKIJi6QTnB4k5LxaAIgI8x3PxUJGBBwCGVA10gYWjUbGW8%2FHO1dnkjm%2BVIZeK4q%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDNj%2BHYXCLCzLv5%2BMsCrcAxRN%2Bcq%2Bkua%2F5NruVqhdcx7BsxcEZj7KQoMdoWUAgjF%2F%2BQFfwLP8%2BvGB9pRao5kiu71VP%2BTJgIqnMLy72v%2BHOH98ozTEHHoUt4WJ8dmmoYzbhOKmfWr4d4s4018%2BIWBRFGpmMoiLMFi3q9D3emYC1c7seJ2MijGQLYsq%2B6qyvz1V8d1yihOjUMv7YS5EGEMIIqCvPHWuwFLnqBUmhPFXrft4RBiHYRZZGWAuGfoWbotplNxIyknt9XAUEVHDVLm%2FZx2mtY6juVl9hLoGgPcO%2BwHBdGD03BGRNgg1YJ7TdjFt5bIehdjWg3TZPgLwEOdPcNk6JHoBF4Rn2W9p4GleRH82juDeHVPhpxewx1eCnMUh1P617Z4i33xe30tnRkcETYiAA55BDMOIQuczg5SuZaXIr%2F52p%2FQQ7N6e8z9UVDMLswLXaAJK2bjGBzlfkLubqDbxp6elzkSCTDeS2wDlStqtT8LWFol4FLqLad5JA3fRvuJjw0Cm5jWUcSw0hMF2CZmDvjTSZa20tPlW%2BPmNoc8UrJaMIowbztrPIE%2B0%2BM%2FJiXDraN2AfEQV8ws2GRsxUq5DeY4QOGkhbcO2BGbByMb7hnHPTYvCaw%2FRqXwJpPxunVlZdU02RLT8prPJMJbC484GOqUBoyzkGfIDdxtE7VLKdYuoYV4M%2BQbH0zykDnNrN3MOoZfYgLgikf7Wp3717EVToPGX1a4sjZ5mwcPGlyu9dr3mHzizxzN7N0sFMcLnPpwTy3W8Vs1OsJWBqEdM3JPk5vcS8b2bTDzx8SuZtcL%2B5JEPx4iVkjPrtBwTEPLW2XzS6N%2BPa2qJp5aKE%2BnCETda2Sde3oiKCgc%2Fn9FfvEGreq61yy8ojXQn&X-Amz-Signature=33e356a7bb8e620c682c57c415e376a88f402e31f87bab3d9860c8c5d4c86d72&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665Y3TO63R%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T123744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJIMEYCIQCgt5MYLjNdPSvthd93SYc2zcRPNLU3dwa3%2F5i50kJCKwIhALWM5%2FKpQsTFsN%2BxzPLh0Z6kz8Vctso4vkgRpHcwkZksKv8DCC0QABoMNjM3NDIzMTgzODA1Igx6SMvMphXvr3mNtW8q3ANp8BaQeCqWVpXaBjrRv8IHLP4n6CE3uIa2eu96wrE8azJdeRMwKDsM7Ci92rn2Z6HT6vShjdrH9QFI5FG9pFDQ1wOef6TqykqtCsqPCc3%2BSaZE7Bc0DOooNKRXjx9PZL7DF%2B9%2FkKnMFT3RnogblGxpHng7ZEtDbB0HOR8GwCrzFTjq3CLkvXXURhVmjC8%2BtC3wlJogcoKsDvaBtbjuFLEhYzkcxGfmDBMRStFS3WshOehH3SGxfEfC4IybWNwIc96Q67o0DM%2BzINMH6UFW5iGLAeqCFYgjAX7j4wtVZXUGtoDxZYkvUtdY7sFQaNw56I3Sb6NO7XQayJ%2Fz%2BSM6%2FtWt5JVLs67%2FN%2BbpzUY7HKjXJa599Up09iMZuH8qLoMYFE9FhvC2oIbz5Pq%2FpAvMa1ChUJGiWB6lyFSj0W1dEdk6AEVJfTKl3bTS7r6F%2FTQRvEYwHDZZC6ADnDwVNLkegCaySoqNyEuZuQQ3agWOSgNYqK8UXirPdMq2HFlt5GcKD969y6ZPmIyXYNsvexZx%2FeQpON8YEFOogc0vh13BgGGYlC%2BviC%2Bm%2Bs%2BfvX4gb0ylqNiY9shhussn77FVLln8E97XwkeGZfSR4ouFZ7a4QIvDTTwYN7rZ%2FCYnWxkuSjCTwOPOBjqkATX4d%2BoG34ChEdm9VuZEZY4C5XgLQVTSftU%2BeOKc2CkV8Rr2cxIBPUzpFV%2BWWNCWTlfbhBC4wAb3rAMh14DT3bwIH%2BMaptC3OqfnuY1eVI4hSoGzb%2Bm9gQsMxMT7tkUzXvYSE8Mv9gK94mAN6UmIOb0%2BAIes2DztfoPgn%2BVISCkQN3CqNm0Gf4bSqE5u24N3UB%2BjX6QCOWBXj5hkT9Wp5clDLrCl&X-Amz-Signature=fbade922a0dd72fcd57254f8a3d408db2d40371e60416da8d39d57eb629aca00&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJJTUKO4%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T123745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJIMEYCIQDA3TvGZ38CzZ%2FPBWYI86Vi6cQE50%2BG0zjqeD82vvfbnwIhAI9Ug0t1zATm3psFSbEjwYaIUeuHQ7HEqse%2BF2l2%2FyN3Kv8DCC0QABoMNjM3NDIzMTgzODA1IgxqdpdFeOSmmbM7KQYq3AOpA0wcnIadL1ZF62tB7dT5FUVzv0qerWrWKk%2FVQz2CG3wY4%2B5WdFTm8hZUSkwy7uHjqLlTfxLICnZ5cRyg1oIxRDx2gNX5nefnMZoImNYZsP0CR%2Fi6sIqLZNhhjtttQ3o2qRrgQTrMgEYih%2BtzA56JVMQJt1oDnlpPWP05o7Z4teBg4NyKMqKd73ntZHWPzgdIZLuG3l6XTi6HybKIfh6AO2V0vc64I90aWG7ygQ2wAoo1RLrESVmgGzrhxCNZdHQLAlqRgh6mno5iILc%2BnHkSE4xAVqFRjcoRQtGK7lfaVneQjOhsl1zLTJ95NRclzCxxA0u8l0vCb0ZsbL3PWryT88EWYgomZiWx3LQyugez0PCs3On%2FlKE%2B%2FR9pw9NXXtEG9tyPPCmnnUJcTDXNhWZ9ndTjUmUrCS22YwRyvZCom3l1HIx5W%2BUsXFV44nR1pXBhXX2UVpgCsH3WTSXccHhxvBDWr9oLnnVqYSPH8UagAY1Oa9ePsUExxN96e%2BOR91zsLb5hT7COENSH6rgNUuV5jlQWfaR2M0D7Z1XLA0VN9Dh1LZ65oCoTUOdsbfs63jc5mzskxW8tg0itRG%2BmvHQ7UN8mQT8PALHZTRxZMieFjr3q6tpxzXO5Av2GCzCEwePOBjqkAev%2FIF4gpQwWUI6IlJEvuq4X%2FuCEVPbKODXhq9i%2FwhGimqWxqZZkzBHoufvSMhFVr1pgtpj9MN4oYdHhqjOCMhaUQ1wuD83Ot%2BHlFeGhltDcFsol8GzkJoP2UezQmsxuVhlLr%2BwlRWGmIDlh89kEL4HNG2kgLgUShaeBH2Saybl2H6hxfxj6uGQkiHoWRq6bSNc8SVkAvV8mROLDwUDP9r7Ni9nU&X-Amz-Signature=e3309cfde7ec305d6b85f33829d5b5053c63e5975ab1acdb6eb088308c255868&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJJTUKO4%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T123745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJIMEYCIQDA3TvGZ38CzZ%2FPBWYI86Vi6cQE50%2BG0zjqeD82vvfbnwIhAI9Ug0t1zATm3psFSbEjwYaIUeuHQ7HEqse%2BF2l2%2FyN3Kv8DCC0QABoMNjM3NDIzMTgzODA1IgxqdpdFeOSmmbM7KQYq3AOpA0wcnIadL1ZF62tB7dT5FUVzv0qerWrWKk%2FVQz2CG3wY4%2B5WdFTm8hZUSkwy7uHjqLlTfxLICnZ5cRyg1oIxRDx2gNX5nefnMZoImNYZsP0CR%2Fi6sIqLZNhhjtttQ3o2qRrgQTrMgEYih%2BtzA56JVMQJt1oDnlpPWP05o7Z4teBg4NyKMqKd73ntZHWPzgdIZLuG3l6XTi6HybKIfh6AO2V0vc64I90aWG7ygQ2wAoo1RLrESVmgGzrhxCNZdHQLAlqRgh6mno5iILc%2BnHkSE4xAVqFRjcoRQtGK7lfaVneQjOhsl1zLTJ95NRclzCxxA0u8l0vCb0ZsbL3PWryT88EWYgomZiWx3LQyugez0PCs3On%2FlKE%2B%2FR9pw9NXXtEG9tyPPCmnnUJcTDXNhWZ9ndTjUmUrCS22YwRyvZCom3l1HIx5W%2BUsXFV44nR1pXBhXX2UVpgCsH3WTSXccHhxvBDWr9oLnnVqYSPH8UagAY1Oa9ePsUExxN96e%2BOR91zsLb5hT7COENSH6rgNUuV5jlQWfaR2M0D7Z1XLA0VN9Dh1LZ65oCoTUOdsbfs63jc5mzskxW8tg0itRG%2BmvHQ7UN8mQT8PALHZTRxZMieFjr3q6tpxzXO5Av2GCzCEwePOBjqkAev%2FIF4gpQwWUI6IlJEvuq4X%2FuCEVPbKODXhq9i%2FwhGimqWxqZZkzBHoufvSMhFVr1pgtpj9MN4oYdHhqjOCMhaUQ1wuD83Ot%2BHlFeGhltDcFsol8GzkJoP2UezQmsxuVhlLr%2BwlRWGmIDlh89kEL4HNG2kgLgUShaeBH2Saybl2H6hxfxj6uGQkiHoWRq6bSNc8SVkAvV8mROLDwUDP9r7Ni9nU&X-Amz-Signature=0bbb4adc60f4184feade4834a2318a8170dd486b09128ffcc99f8cb88aedfbbb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TN64NE3O%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T123745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJIMEYCIQDF8N9hQff9cCMp11wdE6iY4uMhAzXxFd1o2SHwC8RN%2FQIhAOXg6nAysEAH4O11SeYhLAGCXaWjWEgZLZvaVLKMqt6hKv8DCC0QABoMNjM3NDIzMTgzODA1Igwf2SlDFdTxI3XmG3Mq3APJsskUiLK6NQG1vMJBQXUnbT5m08w6va%2BRhKI7ApbEHauC%2Fr3UMUsz7VnbiJ0WNLYV9Gyse2CU%2Fo2Efht%2Bh6iU7j5sXzEI43dtiUMaAIWBzIJzB7Ot%2BEqtJvA2yiq9cSklM4e4318f54n379eiLpvFYCl48CZ2dqu460KhlVcH5WCtwgpxxVAguWeAw%2BXsEz5VXqx221GEJljC059lq08AuAhTgA4D0R7FMRE5tSCePkUAx0vREBu8zw0j79iT0AYshvbCuD%2B7Xyilv9OTYK04sidPxPRCUJ4Z%2BwTbvUJ3lgEcJEOePUmpcsjK9sCOdtcXtZVnGbqfEcxGFoYUETvEPFicWGMBOeB182ivxw8twj8zQRBMrJ8fhpzjgg0mDKqDrtCbWCO8HP8rNjmnap4urfiZjUTr6APIDNzyLk1Im0KAafX%2BvhTcW7BBXItm%2BGomjomEJ901tTeFp7vp%2BROflXROj0glIsgIEHYSEXKMXCXJPbBZ0%2B7uJalpu72iOnPve8INPs43BUsU9ZSY%2FraFZuCuIJMhq%2F9Fvu1gX%2FdYLii9On%2FVzBsQlNCWLvXZIhHEdG6RQmtAPUTyM7W8sp%2F7LnuY%2BJddAgtuzE0SzRBnz6%2FrXrguvbAwnMVDyTCjwOPOBjqkAYfhnsCdtwkpPvly9mHGCP%2BL%2BKJ9JyIUP4Dbu%2FHlYKrmIscRAq1Xpakv5stGexg0egHYfsT%2Fm%2FGSSasCp5Pe8Xe7Av6vgIa1YKOqFeS8dm0LIn9zlzlaRB1aLmTCCP74oaodVqmPB4s%2F593uQB1NrJ0rqs1a3ZNZq8QKibAePD37bnENWTX9jQS4dX4TZ7tEUDPAqdA1tOE4OIPiOGjhFb0GGw8O&X-Amz-Signature=dc09c6dcc2127890177012983cd351012b5bb3fd7cb85bc97caf1e205b1a3c17&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662S3II6G6%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T123745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJHMEUCIEQqTm5NqxyNA3y6qpOilyoVWp3%2F7qD%2FsZn9fxNoUQdqAiEAp5MeVj%2Bmmmc1TT0k2oY3k6rVAjy54ONTQCi3uWIrAn8q%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDEHx%2BPE6zqhwH1vQPircA7q546cR%2BP3P1Qm%2Bp5fd2Sp%2BWZ3D7zsHVinFzRbZjsgwGnayaln4vTCrTy2FK6vcKv%2Bz8Zy4snLt7ojMIkmv2ynZK1lJnrR0HgmVPbVIph9N8F7DfGFhlXTgoXjJD8oBC%2B9IndpgCAGlu4orW3RC4wUUM8mmXrLkpDVHjsGBQST%2FMz%2BPwRbd2Z%2Fe5RM9HX0C7Mj8KPKGQKrC0c2hO%2FiP%2BGYdiL2b37C6Ckgl2fg2LE%2BjORfh1VfwmB21XE9UsCox4AsdlQnbKU0DcskFzzVznu0dxk95%2Bj7UQ1GptlMkMWAVxi7aT9xpaxeNyMt63vbYvlURYRxUuymIJtUwW5U5Qr2jl9R5Akms7gwma66Wi4wMDP0HWmIx8ZoAQjwOrvdNxYEcSoT5EMOmG%2FXG2c5paL%2BrQpd%2BcJMEZuHZX6tgvu%2FtlGjz8uYEC4ZWusSVoDV%2BfS9xEUDNvpC%2BdElhpI2%2F3h8hNkFTG8dsXknPguKX%2B9dFCvRPSLL7oL9zIqWOsMxJK8DC9I7ltIGCYYjNygOiLvEjvwg8Dgg3671W2duG%2BT2%2BFOjf5IO0WAOPfhm9enEF3ARd%2BVaPBX0HOzC%2BIt4rt%2FudCSw1GCP4YA1b0Oj1xZgYe2PGenPYFdDpjpybMLzA484GOqUBQ7CMRRouyLoxCQdHw6OVtfzfci0jy0wkFBRzjUo9G5uj%2FE7aDB04f2ua4fpieTKX2LQvP8%2B1MPun5n5nl3ags93SVqpzzEhvx5AJaaH3cF6TfjFhwoGXLgTDfHvdduTro7DvI6m8VT%2FNuMGCoqDDkChi80vFbR%2BXkYYVUgx3Tb9lX9C1%2FdQ79xUIEDlb1dlKi%2FkQYThbOVjOsu4WdRUCAKoQl5Nu&X-Amz-Signature=1f36ba9615fa6bd2b19f50341951fb5a740266ab9baa768103fe8524fd870211&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664SKQBSRT%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T123746Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJIMEYCIQCQidwUDwKjAn4Lo6CgxQyN1aCS1xOpmILmweGs96h9UwIhAJRvqUJcJZKKkio%2BsHRiIju9Qbf3aWZxSRs1%2Bwjd%2FoZSKv8DCC0QABoMNjM3NDIzMTgzODA1IgyuWJIMA04LsB2jdQUq3AMJQ4PIDul32mLIN0r1KDRB%2B7pi4dxHchmvMxF0KxvY8C2TJC%2BYAaZ4q1gbkJ%2FJWzvei0sfZwS6Nzb5qJo1hOixAhRDikg7WlDQgUUsP8i1Bw9Y1lvMoHgOLMwEL1%2BMG9Vmcba5j0Rnx0WJoryDaKjruJWXnTOssZkBtMY%2BCMkkeMfTAULGURYpljnS27ZiXs1u1GNUkJhRzI8%2B6Q1AewLkSxSyOaQwGUQeK1cQ57bSJUyf8K9q9oVxAo%2FYY744Zl%2BTZSECoJMjM864JuBDaVMDGwPAv%2B%2FqnQ6y2mV0bKXOXp1M2dN7cGStQ0hTc%2FUNPIjJe8YlAllbEaHStPMYNTh2grtHpW10xo00VzuGEEej0%2FuYzuT5NFlIy1WLp3QsGjVUrY2cw30Hipok2l6OM6kP2oajPpMYidTt55EumWX3iEOmJmBp6a6%2BsFMvPtCizAPSkXeUdR5qkWMDb1iQBXEpCZbnU346ZSzOnxRkB4iVZCoqV73x3veUrOWhM5qEpAm2kz6NkZJbUi36mvsyOhRs73Eix6nu03T6YqExv1RaIrzeUuqjcx3eFP3Xcec0oe%2FoVyBFGwhlAQs4NuAmwbJb4rSUa4sRFG%2B3hnGMrz9YMvtxgUllHvNXRZ4X3DCewePOBjqkAcWt41cs1sOhcWt7V9BUZ%2Bap2r5f91GsobsbKwPZWniOk5K%2F3kPnda2KnbraTYGNjJkkLPYUWHs2kdOGojhAcP5SUJAO1JZf2FnodiMvbE5e5kkYNE1OIfuiViFRGoEIkbIbT1gW%2Frn83%2FKYPhYxWHPONihw6ouEQJkiy2PwWccHR%2F8mHIWD%2FHktmZXFBC98YieXN%2F9W6QkP87ZXJdaMXL4NxwxZ&X-Amz-Signature=9c37d786c15db3f55a2455d628276be1fe5de0b9be0e4f30869603647ffea9bc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XV5D4ALX%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T123749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJHMEUCIBc99VykrqcxCPOR0m2Xl8R1DazKUpRKQ9%2Bqdug%2FQXV0AiEAyWJPoL6pNovVBMJbKOgfOM5pB7tvF%2F9vXGZC5JS1%2B%2Boq%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDAUnzVA3bCVOevYx6CrcAw9eHlW6M5P4yHrMO8H4PSnnjRoSQSCxaWUdxZZd%2BLcmMZuIRvN1F%2FJVDo%2B8Est8KB7AVBblF6taewbGJ1oOBL8FXJwn8uCuYq6Wfi2amKA4Pf1cDcw2r7KpF6pa5AADR6FHw3HnjHoTXh3%2B5hJ5kzFHx0yzDCvC9r0lAC7bNQfAsu8nmIBS4CxCfnxVXxFLQAGFq5lnsSH%2FYndhTjNYy9RPKrFqZ0KHVfv7RYPtUGzXyug%2FEVOQOvaGasNmoGxvHs2anoUtpQM8msvRBbt%2BuLLdBupTtl35RJZqif859NzMptmH6qYJZIAfcAbFtP4pTVreZvd8mlbMYpD%2Bl3aWzvAElMLEXEjYkKGHnfYB2HwIZJIgWqy2EfqhCQch%2BWAOugSPzxwsAhPYSzcOCX%2B5%2BgrE9ttPTLUaF4x3MdB6hgnk15OWfBnKeuUWDgL5Aapocn9LJFgLSfBJKr628NvXoXrjlJH2QRCmDqfaWYe0u%2B0JBx8scFCNdeNVT61zJfW3Vw1YH9bKaZoTe1bbjDwIEcqJDdAb1CIqtaNVNZ04jeKoeNlJg4zoXpZe9%2Farm6%2BLDArKqW2sFjL%2B8mh4IGRiWqPksRs8VT%2BAjrJslTvmQBfnrQBhFsWwRTtBRFfPMITB484GOqUB44mCcnILEW23AjJY6j%2BOT2eAqFrVA9dTAgC4DKKzFL7a993TROUt72Dy3LDPEnq4dtxRj%2BiFElgTwoMjvJz6c5LBBNhf%2FaMFJNe%2FenSp7MmLWN190wrc8Zf8k3Rvpr9xwfb2IlPbDlQbam%2FZwYSmI3QwDRsO%2FfMZAmbEZRX5PxjtMrmz0NtrMAs8Fk4KtCvgHVMx1adDkcl%2F1AFJnSpfV%2F5m1FTw&X-Amz-Signature=fe8e0936755b685a077a13c18cd7cdb5f78f9b6bafac152c6a1ee338f78e376a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XV5D4ALX%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T123749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJHMEUCIBc99VykrqcxCPOR0m2Xl8R1DazKUpRKQ9%2Bqdug%2FQXV0AiEAyWJPoL6pNovVBMJbKOgfOM5pB7tvF%2F9vXGZC5JS1%2B%2Boq%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDAUnzVA3bCVOevYx6CrcAw9eHlW6M5P4yHrMO8H4PSnnjRoSQSCxaWUdxZZd%2BLcmMZuIRvN1F%2FJVDo%2B8Est8KB7AVBblF6taewbGJ1oOBL8FXJwn8uCuYq6Wfi2amKA4Pf1cDcw2r7KpF6pa5AADR6FHw3HnjHoTXh3%2B5hJ5kzFHx0yzDCvC9r0lAC7bNQfAsu8nmIBS4CxCfnxVXxFLQAGFq5lnsSH%2FYndhTjNYy9RPKrFqZ0KHVfv7RYPtUGzXyug%2FEVOQOvaGasNmoGxvHs2anoUtpQM8msvRBbt%2BuLLdBupTtl35RJZqif859NzMptmH6qYJZIAfcAbFtP4pTVreZvd8mlbMYpD%2Bl3aWzvAElMLEXEjYkKGHnfYB2HwIZJIgWqy2EfqhCQch%2BWAOugSPzxwsAhPYSzcOCX%2B5%2BgrE9ttPTLUaF4x3MdB6hgnk15OWfBnKeuUWDgL5Aapocn9LJFgLSfBJKr628NvXoXrjlJH2QRCmDqfaWYe0u%2B0JBx8scFCNdeNVT61zJfW3Vw1YH9bKaZoTe1bbjDwIEcqJDdAb1CIqtaNVNZ04jeKoeNlJg4zoXpZe9%2Farm6%2BLDArKqW2sFjL%2B8mh4IGRiWqPksRs8VT%2BAjrJslTvmQBfnrQBhFsWwRTtBRFfPMITB484GOqUB44mCcnILEW23AjJY6j%2BOT2eAqFrVA9dTAgC4DKKzFL7a993TROUt72Dy3LDPEnq4dtxRj%2BiFElgTwoMjvJz6c5LBBNhf%2FaMFJNe%2FenSp7MmLWN190wrc8Zf8k3Rvpr9xwfb2IlPbDlQbam%2FZwYSmI3QwDRsO%2FfMZAmbEZRX5PxjtMrmz0NtrMAs8Fk4KtCvgHVMx1adDkcl%2F1AFJnSpfV%2F5m1FTw&X-Amz-Signature=b788d0ff1ee0c08c19c4d9910898f8cf2143efb155b50a2a8d9e8b3faa231963&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VBEMG75G%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T123742Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJGMEQCIHCJo6ufk6kJ0U6zwKBS7WLaNb5Z5OB2CZxbyCAQOqzeAiATeKmD%2BR45O%2FOR80QjdebM3TYDwTFAiS5xM7J58tI7ySr%2FAwgtEAAaDDYzNzQyMzE4MzgwNSIMeF5ZYO6%2FuN3IaOzEKtwDfXUJ01XzHNM%2Ft%2BZ%2BK%2BvooVrPi5H7rf%2Bq1tsAdL0Pawt2nG97yVpzsHfhYjbQ64iSPXkmwGINWfNk9watCqrSHr8ggxK5l672ULU9tczV6%2BFgZw718Tr1a2gd1KZr9DyqApUzlY1kZOWETgs8LPbPURAmgrvdtR%2FNPtcCNLgbQm8l77RZTY67yo%2BqpD03h8ee%2FtBwS6lIeTSxNO%2BFnKcZsYwVm52I%2FQk9MUlyIUIiP4IA6k7Gfxa5O4QTAwbcyAx7kKrfRNww2pAJVyH548VZsHSKiflHbR0ZEV82fX9Q5jxKyWwzaMhMzeFT8QZ23bC66E8P%2FkCF6lA1CjpbkSyJt9TgvYYUm%2Bb46adTCAbeLT1uXVZz%2FFJfZcSsdrS2FUsPswfh85GEGrwACTh0YBPIQMFCqJZVXRHd21%2BXaaVBGyF3H%2FUIHiwfa9UiLL3%2F0m%2F6vgnMS7UVdAwmIsisqn7KPsEHTiUa7Lx4J5pKqwQK4fAotCylYIvfGKGQkTAQbg%2BKno%2FbS4%2FZqB%2B37%2B5E3tRvQbA6k7GsSlAPQeDaFkXuxB0dnYtyzT0aSvZgRyEIEE19rkQUo%2B7Gh5kGiT32gU1KAsZDFSSKS49f0008UkSfrkBhmOuDtA%2BBekSY5Y8w%2B8HjzgY6pgESnJ%2BJutkygjSxRnZHPXjZT2p2B5faE1zXDX0qxgjILdqn5tclTSc4nj66LZnC59%2FXmgDv3CaSiTS4tcX0f8UoSgses6N8NJSHROrqGS7gJAkH%2FTJ0KcUBUc7YC036beqyqfmiPsEYrWEmMlvV8Xzr6ofPgvAMmYqVmzszVme33QClYj3XCotIotEdh9J83dywLcNg62K2ErA3Bja0bjjetpVuHKP5&X-Amz-Signature=c68d8ff328db3166b6319ec52b54703cc20fa550f3fd07b2654d1965a33cea77&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQYU5GKY%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T123752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJGMEQCIHbjl5aoQgE1C7obj9hKt3k3XgwXPuzEqh7VjoHwLKqkAiAkwSy4jqy3upF8B9FbXdl5NkMOVRxIvT%2BCmErcj5dezir%2FAwgtEAAaDDYzNzQyMzE4MzgwNSIMqaFoUJDcqhTgjbx9KtwDiY3xrbDmP%2BF8cX7pA%2Fuk5A%2F%2B87n%2FpW7AZ9wPauuwYOhBbN%2FNQNp1stHn9AmGL7EFtTBclJuKz2USxIvDivSmkYwA4Vzgjot1zK%2B68rmRPyGRGFzn0nXr9KlU2h1yXvoea2FhmoveUQ48ZuBsXnEKUaO5peSNyUs%2BtsLTm3%2BfgaYnIq3qnt6JpYqS%2BAmsAcQi0o%2BYUM9TNYWxMjAlR6keGbelcvAnAjswPhf3yWW6oz9bsK4mKvcsyLcz81CLJV7d64lisE4IsLgcVTcHnUoRqrZFlZyK%2BgnrYOokOjxXMpuU8wgS6o445zRIheYk5RcKR%2BIiDCWbP6EWNSNHdkcdPnK3tgEMGzYEThTnh0qnPv6NvqM8LL5ysOsC0CHJWb7oTbNvZ%2FAS0t6iUUFHl3%2FDxXiJ79KU1IIFjvjEouh%2BrAihB%2BpS2VDjkvGjX7DKWdP7jR7pwJum1mCnnqak2osAk8%2FJoJC3tBch0tY7ok0ONZqiaXlue1u8KSWglL6jB5NqKZNjR23AHWbSgatno226IVDXFFgBven82gbw9444xYbBupsnM2gjgyAqVVOAOfGq264%2B0TO1Hqf5PG4Hmedplo4%2FlmJI0EtqdNk1AAPYSr0kSw2HJMHJhd6zUTUwtcHjzgY6pgG5T8VssUHxP7W8rQB7DLo2VPMiQk0rXs4vbcWv%2B42aiB9T2DXpgAb1DcOJ9WrMwtwcaAxRJ%2BPLTFPhd0DNRhicevzgMybFBBDtqop1aE%2FgCr7FErPyX7Cxz28c9ch4mgbT4xyr8drqpUhtcdNmXudx2cz2yeE78NTAuVvBEmNVj9NNiGIR3mEyMwwNRCzZixZ4PORRftZ%2FpgBEEro5CUJf6bdgXZ2i&X-Amz-Signature=8897e9d6d9bf2f5925a5c759666bbcf1dcd45b0a3fdfb23bf39e92087cfdd503&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQYU5GKY%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T123752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJGMEQCIHbjl5aoQgE1C7obj9hKt3k3XgwXPuzEqh7VjoHwLKqkAiAkwSy4jqy3upF8B9FbXdl5NkMOVRxIvT%2BCmErcj5dezir%2FAwgtEAAaDDYzNzQyMzE4MzgwNSIMqaFoUJDcqhTgjbx9KtwDiY3xrbDmP%2BF8cX7pA%2Fuk5A%2F%2B87n%2FpW7AZ9wPauuwYOhBbN%2FNQNp1stHn9AmGL7EFtTBclJuKz2USxIvDivSmkYwA4Vzgjot1zK%2B68rmRPyGRGFzn0nXr9KlU2h1yXvoea2FhmoveUQ48ZuBsXnEKUaO5peSNyUs%2BtsLTm3%2BfgaYnIq3qnt6JpYqS%2BAmsAcQi0o%2BYUM9TNYWxMjAlR6keGbelcvAnAjswPhf3yWW6oz9bsK4mKvcsyLcz81CLJV7d64lisE4IsLgcVTcHnUoRqrZFlZyK%2BgnrYOokOjxXMpuU8wgS6o445zRIheYk5RcKR%2BIiDCWbP6EWNSNHdkcdPnK3tgEMGzYEThTnh0qnPv6NvqM8LL5ysOsC0CHJWb7oTbNvZ%2FAS0t6iUUFHl3%2FDxXiJ79KU1IIFjvjEouh%2BrAihB%2BpS2VDjkvGjX7DKWdP7jR7pwJum1mCnnqak2osAk8%2FJoJC3tBch0tY7ok0ONZqiaXlue1u8KSWglL6jB5NqKZNjR23AHWbSgatno226IVDXFFgBven82gbw9444xYbBupsnM2gjgyAqVVOAOfGq264%2B0TO1Hqf5PG4Hmedplo4%2FlmJI0EtqdNk1AAPYSr0kSw2HJMHJhd6zUTUwtcHjzgY6pgG5T8VssUHxP7W8rQB7DLo2VPMiQk0rXs4vbcWv%2B42aiB9T2DXpgAb1DcOJ9WrMwtwcaAxRJ%2BPLTFPhd0DNRhicevzgMybFBBDtqop1aE%2FgCr7FErPyX7Cxz28c9ch4mgbT4xyr8drqpUhtcdNmXudx2cz2yeE78NTAuVvBEmNVj9NNiGIR3mEyMwwNRCzZixZ4PORRftZ%2FpgBEEro5CUJf6bdgXZ2i&X-Amz-Signature=8897e9d6d9bf2f5925a5c759666bbcf1dcd45b0a3fdfb23bf39e92087cfdd503&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UI5HRCHT%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T123753Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJIMEYCIQDuXm56qiT07ZVimrgkOYoUfiDblfNkt%2FizWb6IZ%2BCjLQIhALXZQhXohF5HZNcYYlSxsQM3081Q6El0yRN5O3d%2BPJ9MKv8DCC0QABoMNjM3NDIzMTgzODA1IgxUBU0Xdyo48kRYB%2FQq3AMAmsonpR75IDdz6Lwih1uS9F4uyndzPR8vSZnKzhrjy3isxxaQPs7krOScwPw2Tte7t%2B0GHHjyNIla40rv0mWKhukwc14TutrhRefn%2F2P4Y6grs%2Bd0oNZjkuGeJonYJanaULOTsKRUEkJTsuk1q4gk%2F4LkVu90QxktI%2BSF%2F1erYK7IgYNXL9HJBRSxeuJJurFIzhs9bW9ZgE6S7Bj9bWF2K5EhWle%2F8HcQi5nZm3QTgDMrX2s9rGRnVQurPw8%2F5Zll29c%2BasFEbx7eFNmiWVcjaco%2FPrnxN46i%2Fzc6DLaLf9syJtibHMX%2BN3OYmx4Sxs2MXT8f2gtXz6XFHQ8NBa6IAB6m%2BEeI4C1AxA4w%2FPOHzHe%2Bw6bKRgTsGGv3qmkMQSK1Y995YnLUxWm7J2foEqj4K38hD0qXhIAGImad0satmAh%2BMPxAhGgpD%2BVAvGA3N3sL5AkkgeN3ZTbxsLAWJyYOmsxrnSkrZY6q7gYXdg%2FAN4HqbrWhPULyPmpl2My0zHmaqM9r1PdSBd6OZt2UnV0A%2FRiQfrXwH0o5r6Nej1bfxOFyyW7YKv9mgTvVNR1nZmeta9r80QTEQOWO4phmGCH%2FRmhBiCR6qclQ9sF1EXbUyO36lF2pIfFUJvC5zzDzwuPOBjqkAYghd6RtnrlH9deO4XP0v59DKFzEFGcVdhofMkbsHwtOXXe%2FGDZE%2BwItPNr9u78QatnDNDnPX%2B2OUd1GpSIB22qXqdeVpTMyEizJxoiXEIci1KFGJM5%2B0O3gxLHRPQMYCMr55kTB61X9YDz1Pv925FjDIAdYwmw3kqu%2F6iw5t3n19In4kDR9EyY%2Ba%2BS9FTNL2ujg2nWRq2ortqM25g6EtlJ0BlQ4&X-Amz-Signature=6ccfb67f9bb673a67df709b79e140fb84d416b6ee9b3bc7a02d7893ecb7d7a68&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

