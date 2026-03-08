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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VV67O4UJ%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T141253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCICxGHA7KsHoWpJT0Ro8E8XS%2BvqRM45KK8naUF95Vk7stAiEAn14TZV29pPKRerz8z8WlcXabi4s%2BsNI%2F3PNUsGBylSkq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDIjdKeXu1J%2BRGhYYYircA0D9khR9GyocxjIne9UcJab6eTowo61nmyoXXGvV7KZkgyNx%2BGbRCxHAy5cp1VoI5TYk%2Fn8Ijpb4S6m%2B0EIWqTIo4rLbEfZvdRECKFe3wjCoQLY8fqUFp5HD3BlF5aEwkXg6A4Kf%2BzIv6dqXP3uTCkAP9kakqzCuI2gWEAyRPseTFyIP9Ugh3Zm4GjYWD1g2696dvtTTwI%2FLkYQH6Z8L2vltauHZ0khJyiRPK%2BZaC91DfXfkIhsh6JvyLUKTEeqIs11KOCcursQkM3XpDxu%2BboC4ImsQK87qSq%2BUN6lz0j5d8YFWLGMQPNsGJsl0Hz0HpewChxwi78OlijVXTUSL3HO5tlO5Ck1ir9qiTHRW3pCx%2Bdr8qiY6%2BBAE1%2FwpjDcxvk2QjmUwDGwfrDe8oS0%2BrzLXg7MGfdAXUTxJovqZPpiaIw9Eoukm6MNc4Nl7itwjI1Uhs1%2FLYs%2FEdousFGkM%2B6ECT3aOMggflZozyYwdI4%2B9%2FHyVYgyUunVW9143ioCuwIvNhBIi2bUg9Vq7KXF8HPboRkv2G77EOSybpLYPfFqhXMdtt%2BZQPtY9BOcFBjHFaQEtAxA8pH%2F6Un8KuzWP0aBW4VevpKKKz%2B3Rcf2WrtPdV%2B5qnCRQuAQ65XeBMLiitc0GOqUB2dGdbvzmUlC4sWqfpI2%2BjnWKYz8mH%2FQukLVOLreWLge4N94WPvqECZky4H9U%2FBYiwuKGOKIneUkILFe55Z%2BAk20LLERWtGmRTOc3VuDlYIO8lWMpG3HBJOwTB5lWhEfmVzj5eW77wRKvNOjCvY1vPdh1YAc18wsMf8F9tEUBToWtTvmfn8pqwY0fTrx1Fb5%2Bn%2B1VOxikbRdWavo78EKtCQMlwPGr&X-Amz-Signature=7bee9deceb440ece7f008747f20ca174907d2058438c61482ad187b47d892875&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VV67O4UJ%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T141253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCICxGHA7KsHoWpJT0Ro8E8XS%2BvqRM45KK8naUF95Vk7stAiEAn14TZV29pPKRerz8z8WlcXabi4s%2BsNI%2F3PNUsGBylSkq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDIjdKeXu1J%2BRGhYYYircA0D9khR9GyocxjIne9UcJab6eTowo61nmyoXXGvV7KZkgyNx%2BGbRCxHAy5cp1VoI5TYk%2Fn8Ijpb4S6m%2B0EIWqTIo4rLbEfZvdRECKFe3wjCoQLY8fqUFp5HD3BlF5aEwkXg6A4Kf%2BzIv6dqXP3uTCkAP9kakqzCuI2gWEAyRPseTFyIP9Ugh3Zm4GjYWD1g2696dvtTTwI%2FLkYQH6Z8L2vltauHZ0khJyiRPK%2BZaC91DfXfkIhsh6JvyLUKTEeqIs11KOCcursQkM3XpDxu%2BboC4ImsQK87qSq%2BUN6lz0j5d8YFWLGMQPNsGJsl0Hz0HpewChxwi78OlijVXTUSL3HO5tlO5Ck1ir9qiTHRW3pCx%2Bdr8qiY6%2BBAE1%2FwpjDcxvk2QjmUwDGwfrDe8oS0%2BrzLXg7MGfdAXUTxJovqZPpiaIw9Eoukm6MNc4Nl7itwjI1Uhs1%2FLYs%2FEdousFGkM%2B6ECT3aOMggflZozyYwdI4%2B9%2FHyVYgyUunVW9143ioCuwIvNhBIi2bUg9Vq7KXF8HPboRkv2G77EOSybpLYPfFqhXMdtt%2BZQPtY9BOcFBjHFaQEtAxA8pH%2F6Un8KuzWP0aBW4VevpKKKz%2B3Rcf2WrtPdV%2B5qnCRQuAQ65XeBMLiitc0GOqUB2dGdbvzmUlC4sWqfpI2%2BjnWKYz8mH%2FQukLVOLreWLge4N94WPvqECZky4H9U%2FBYiwuKGOKIneUkILFe55Z%2BAk20LLERWtGmRTOc3VuDlYIO8lWMpG3HBJOwTB5lWhEfmVzj5eW77wRKvNOjCvY1vPdh1YAc18wsMf8F9tEUBToWtTvmfn8pqwY0fTrx1Fb5%2Bn%2B1VOxikbRdWavo78EKtCQMlwPGr&X-Amz-Signature=7bee9deceb440ece7f008747f20ca174907d2058438c61482ad187b47d892875&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VVJFC7TH%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T141256Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCICAcOnDmcmTAvE4lsQPgqsqlpyQ7FjIbBKP66kI0Rxp1AiBZgmZhgOaJtLlNrKbeAUphMjCVGSLpbRd5XrUaeCUZACr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMOxrc4eI0L7wAZDTGKtwD3twZ9drcYW1dFoxYLpULzDQu7uNzrnByAGjJDvbhLLaAe97HuzKzlLbQNr8aJg7g0Zm5g0u6TiJ%2BDO2HJmIJczQp28HcZKbAt2msHyFTgbE8I4U0yZtQPG0in4OSq0imTIqNBcljA0DvNPj0mBmDOTo79cQ7OL3Vk0QSHsHe8VQjy1vfiTOOLQpLIB8tQNpPQLkezqmPKDrFv4tinfPntUFybYc595T6SU2FZ2G1yWUT8oek1yX1W4P3N4%2BqS78U9J9mh4ZBEHCKMbEMEIQUzf2ppdcS3%2FLmvVYPszbkctkc4Nn4qMyEBRT6eAaxi%2BFQEu5M%2FDyiT2S3N8LqadYWRT%2B%2BGSklZMbVjo3mX4HTcKP9wwTS61aAYgA0SizK63MC2CMF%2FhWtGq7%2BsqJxRAamrYKVJQqSfyUdU4%2B9K%2FisBclgYWleTO%2F8skSSa60CHzc%2FYwfJbXg1fQYNKblPkrVds5hWfaRmC4gXLpXMRisakMVz48YtrquwuKwba6HrGiufz%2Bb3qYpDzLxxB2ix%2FYTeaxxsgIKNVBu%2BvaHUbacWn2KXggqTTpeyVc9YCxfykK4wqk8psZ0ozdsHwWUs0Gcf9DVe3AHNl43VYLtj0%2BMjJkX%2BKkei500qYEtjnnIwzKK1zQY6pgGLUc%2BRQYXQhNHcbsG3QmbPPEOSdG6NbdqZxFkVkD6ejQUyurpfSZZRDFf1dRY%2FNBwhqHtiHj1%2FX%2FSj8Xr2XtvDtGaPoWq0wV%2Be%2F%2FuzzTCzM8FmgyQZ7lpeYC%2F8IJo4ZL5PU66N4AKhDZtwpVMihEqS3WCxobcPp3oD3fMIa9ieOThY%2Fjj0vNTTHMO0LQQ%2BOXTxu27aGLL%2Fm25edNgi%2FLU%2BoHakV3x4&X-Amz-Signature=9e2730280f02d2993835c0966b9afab0babe99cd9a0ea6b486e28b8da7caaa05&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ELGDYIM%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T141257Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIFQrze12H3YVHFS%2B5fUFJGXVLSsanL0tUblBmdb2hivxAiEA%2FPakNn8%2BWSEePGfYCIzeqq%2FW5tDRFW7r4M5TwtvGxFcq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDGNLv7rxMDxWMYBWjSrcA8xxXMiyGrHSoSCvmPi45BYaqTWd2Msnb1LV6GCCEAFLO00JELCWSk51oBCnznPRfeCdcJAvGNsq155BL2%2BPa%2B536qYCNy2WObRSknn%2BIVDuufohkgAc54qRMyPipkAH63xMMMxG8L5liYD8Uak3nsDLbkdTSn3ZYjxLIaj3D67LeTyytztzq%2Fi7wizgTbqJ4uw1gLMBemE0fQoRJXP%2FvSDABtnm0lV2fkla3J%2B0zauqpJVZqlSMQIwP%2F8nHGGBmBvrchZEiqeYAgrqAAitra8pfk0amQ0QLeaXPnbZhXY0rl6yhwtVJ4CbBEuhL5XqKO%2BxHqypbB%2F3h9r%2BO8Cyfm00s8RMxTAmaALSvMPS%2FZgvgN%2BvI5QPJZbW7RQyeOOJJR9d%2FXrFhyzLMJzpf6zaK0xsSLQ%2B%2BmBoxBwlijyV8D%2FyMclupTYBbJ58%2F%2Fo%2FdITh1Y0VTYIyYh%2BRqZNQ7TfQyR1epUfsni6%2BxM55dacql%2BuStFuTz9c5yYusF%2FDctsJT6KaYp1Ns31n3QjOJPoJlidAAILVawr%2B%2Bcwm1dTKVfOb%2F6NgvAqrng44j9baWWYYZZagkaC3skgDzZ6KB7c7FTYloXxQlhYWsyzRSdFfqAXPRPpFqD2E9haBNErPs%2FMOKitc0GOqUB08Uo%2B63PZZnqrR%2F6RFZsJlORpB%2BgxbXPztr9UlTPhfoDDD6ffxpVFAwGLGtl8Hw7tm1aNPEkHLhGaS769hUMpLqmuEmnMcXbUNzcWGVnQtnYucdoGj%2FeNeCIeOGVInSdihT5dgM48FBOb28NFp88u6NhRCrKF5%2BP35NdT2e0XR%2BzJVmI1aELLLE9%2F%2FJyDtlrUo1vYUPRV4owsAfeZh1S9wS780JJ&X-Amz-Signature=8cb0383d639767ee3049ff74014f5b9d1cffdd3f2a6646b025d85f35b2e65585&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ELGDYIM%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T141257Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIFQrze12H3YVHFS%2B5fUFJGXVLSsanL0tUblBmdb2hivxAiEA%2FPakNn8%2BWSEePGfYCIzeqq%2FW5tDRFW7r4M5TwtvGxFcq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDGNLv7rxMDxWMYBWjSrcA8xxXMiyGrHSoSCvmPi45BYaqTWd2Msnb1LV6GCCEAFLO00JELCWSk51oBCnznPRfeCdcJAvGNsq155BL2%2BPa%2B536qYCNy2WObRSknn%2BIVDuufohkgAc54qRMyPipkAH63xMMMxG8L5liYD8Uak3nsDLbkdTSn3ZYjxLIaj3D67LeTyytztzq%2Fi7wizgTbqJ4uw1gLMBemE0fQoRJXP%2FvSDABtnm0lV2fkla3J%2B0zauqpJVZqlSMQIwP%2F8nHGGBmBvrchZEiqeYAgrqAAitra8pfk0amQ0QLeaXPnbZhXY0rl6yhwtVJ4CbBEuhL5XqKO%2BxHqypbB%2F3h9r%2BO8Cyfm00s8RMxTAmaALSvMPS%2FZgvgN%2BvI5QPJZbW7RQyeOOJJR9d%2FXrFhyzLMJzpf6zaK0xsSLQ%2B%2BmBoxBwlijyV8D%2FyMclupTYBbJ58%2F%2Fo%2FdITh1Y0VTYIyYh%2BRqZNQ7TfQyR1epUfsni6%2BxM55dacql%2BuStFuTz9c5yYusF%2FDctsJT6KaYp1Ns31n3QjOJPoJlidAAILVawr%2B%2Bcwm1dTKVfOb%2F6NgvAqrng44j9baWWYYZZagkaC3skgDzZ6KB7c7FTYloXxQlhYWsyzRSdFfqAXPRPpFqD2E9haBNErPs%2FMOKitc0GOqUB08Uo%2B63PZZnqrR%2F6RFZsJlORpB%2BgxbXPztr9UlTPhfoDDD6ffxpVFAwGLGtl8Hw7tm1aNPEkHLhGaS769hUMpLqmuEmnMcXbUNzcWGVnQtnYucdoGj%2FeNeCIeOGVInSdihT5dgM48FBOb28NFp88u6NhRCrKF5%2BP35NdT2e0XR%2BzJVmI1aELLLE9%2F%2FJyDtlrUo1vYUPRV4owsAfeZh1S9wS780JJ&X-Amz-Signature=82c2aa9ed4d0617a9b2d67c3bb69b2050eb33631de6e0d3f91d8e05a4bf41302&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZI7W6TIW%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T141258Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQD32B459G%2BWhYp12G8yHJASfe6s5rhyEfy8Jd%2F0SCImsQIhAObDfgH5PrCJ0OJSpXaNCsOnCpvJRqbVGIyt4ubxn41OKv8DCBQQABoMNjM3NDIzMTgzODA1IgzUBXnTGqFxgKAFKecq3APpgjIutQ6MbcBQqevnQ%2FXYi%2F7PB3F7nt0br9Zsml6HIaGQrQknQQhNK%2FBaMRx1BT8Vjz0bEmxYj6eKy36jCg1Wq2oRxBsCDK20Wf6SyqU2X1l0V%2FD7IfPZ1YrPUWDu0VZLTz3zI9UHKxYH%2Bf7%2B9LfvAGfwln3Iskjqusg0fp7s4%2FHR2yifx%2FGaddumZkkxpShUSNmgphmIVLI2EXHWjRx%2BLligap9%2BF9ZQtD6qPwocB618DEihrlV916DC6TJdMohyc52tNgyW65xfMk6rLDn4r5ZlaurXwAcXTiuL24lEHP%2B7tlZmwFYDdXBc9%2BGssham5QRxrtkEFZ3nvCS6abIklDRPUg5F5VDArMNd%2B7OKxRCWRH5Kz3lFPNz%2FMNwcxe4iyhjiGWQFQ7p%2FVhHZinWrXQmwSBFNxpwI9rVxzykFW3d3Cgwoa6D2Cd68PePsXH3sR%2BRTwSFTgJBZC7vi0I2dCn6V4KK1B31YQKGAnrg1iUbFWxgXqAtMjmTcLlj0h2rSmWOC%2BxpVtaILzIVfB%2FYd6Npk4bw9kDENZaWfJx4niRUxe0CfHaTtz6edwD3VkxSTiIe8D24jcsRyg86CLMt33dPJOiDCwEkXlLK334XrsN5A9CPCN130R%2BbgODD5obXNBjqkARC4pQ%2FYwlFebIAji4YxGDcicIkHlL5poGp1WHYlgAw%2BS04ggpSO3BobefKBLhiMz97p0jpiW0ZuATJXLtP3aypYup9AlTKMEMVANeIBJvcCC%2BVNzN239gIr9Yj9Z%2BNDoonkjjtO2hwSDST41lzkbpFGUqP%2F2vQG7O%2BPtLS4ew9q%2Fs%2F1D44CSDfKaU028WPrOQ%2FMeO7ZgMKZEBvabSKefQjJow1J&X-Amz-Signature=2a7201791dbe6b715bad6c7106439d9424ac438fe5a1b06ca19023e0dc5ed688&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665CEA7WHN%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T141259Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCICoOKamP8HazRqp%2BM%2FhcZwXmx9rrImLZ0xsIG79QuKoeAiAJ5HBpVB7kKnJqEgWKKY0rD7EfNNfTakx7N20JH7nq4yr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMaIEt1WkpN1f3wzumKtwDZweu%2Br%2FrXa4NlmBmGGlGtquRmIxT7opVgF1oN1nt1uMTsAGx8xMoX2FKEIMtlaG%2FSd0otR1pln3jKJJldB7alFRcqr6YWuxr%2F%2FFCFbH3lx8MqPrPm1p4DTXZeT%2FmmZqR0FpjGlC1prRlM%2Bjq4cALAZ5fyWm%2FtypcZtZvM8%2BvKynluziNWzbXSJ3IDZKUD5TWeNFgvz1UW%2BnOmlzDSzfTurSW4HzCxo%2FB3S8McwcdCfZD9LPKzcO5u9MzuSWy6KJn1t5FFT7RRYHd2o%2FIkXdYoKDnznAZHha7kc8QcI2gCURyMKPY48CX%2FVMr%2BtoV0Yat8OqmNbqOqKhWLNr2uoEK4sJ6CnFNWHT5xwBI2%2BSekGpZLeQchRV5wHO%2Flw0akBvt26mRC7bCC1WzGWRJGBntv2R9N0A6r6ymdwmDjWMc%2BFo5AOxJPGIVot2WTsLDjHsRFHPBc%2B2rubMrRp8%2BTetNg%2BBM4lN46sNmquUM0RodQkGjIZiaDIietTauCIW%2BgjE6vbEbWeXg7OPTs5pmlOkenfVgryEfemlbQIQlhOiup1eX3Y5OEmecX5h3NGG%2B3fE1MBoRWKAYbA316JsKdIztRImXPmHMa7Z2CDvY94cfI4gN4GZoZrkF84k2IAow%2F6G1zQY6pgEhGRR3L0y9M24J7dgzQhhZw1e18Hm5fs8hPFOcQzFbVhzZBOCCve7sqRjcN2wmodwOReuRdXaMSNf%2BEMeagyOv9Q958mVk%2Fh4uezY9wKTPYBC1QL8do9DdyXinktEHwfZBHuyUHQRW7TR2ZQQjeVcl2ThJ4Hnb7s7FjYPgDbFpTGA1cl%2FQRm5u1RbQatkjU3ecJFkWrKqvhMAWOj%2FGcMp6ImFuyuqc&X-Amz-Signature=453cbf639c7713527956863faa4b6c9ac2a57c643197b13073e0cbd3a4e09a1c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNRDQRXY%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T141301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIAts4%2BkAThDoGD%2BE5JAcU%2BU3k9zjUL6%2BVJgrAmfawbaRAiA5SJvmIIqS%2BK1q3SdCtFtTeWjiNf6TI%2BV9ELPjqbA03Cr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMi%2BSARdmfH8d8RyzNKtwDk5l22VDqAqZ8rcGu4QOeR5%2F5%2B5fiWLXg783bLUkvwf47guN%2B43NIZNfkizFtIoaWDXnkM1shpazITDlykTHBaJJ6Jsj2AAFJ8Mj1ZtaiBg5gbh4%2FZOdj6SrgO24CT%2FIiiNPhTOTRdpaJtxaAk3NBP9LSqjhE0sMWrbROpDTToQqLYBOoVoJyeEzGeuqTbdbZ7X%2BlIcOShNcrr9HzqBGNZNuYJeKpPn%2BC%2FSto0Qg%2BH%2FOtCUCiz1D5yO3RrQg56ARMbOeACEfeRUi0yoP9JbesqpNyK5Ivojjb0u3CBTzc0Xr77OulTZwrCiAc5SRAUq8izLSt%2FPPp%2F5DbpCABJi59puTpP4gaGypZpa1CjNg4n4xvdPWMlyq0zj%2Fcc2OLJ9XNnw4bE0xsa7cSmT7QwsD3A6e2daFE0EP0nqhdGCB1hVFMxTTQ4qkGLhu5SgJHdGGa%2Fv0JJNzRf0DEDOoIqV0uHtPsd6WvthbezQAn1dGUC%2FkmoeLlETveRMLDUnqBj6M3LWCkwbBsnpcssDoF6ON%2BJcTbM7ctT12ocj98rDB8lcbOhE8OYe%2BZvsyn0QylbZctkPU6h3NrGSlf9UHu6GOF3MmPfjmLCgDet%2FhJ99DZE3sQg%2BiO7cmwb1ayo8Aw9KK1zQY6pgGa9oG52aPLtn1gH8hxaSFxem8QzRvJRuiYoik%2FdvOukdOO3pfEEUTUoqFdkbjzebYO7Xy8Mevkohm0bJyrhmgV8Rx1hxzIR5maK0297ze4uH6fpoY%2F0v6azeZF5xgfAdIOY8lprfx5MTVKLJ9Zb1CkxDETatGT5eMOMvV%2FX8%2Bbp4%2B3JrjdVfkCZhHn%2BiCsUh0BEhq949ybhFZS%2BM0gMNaIfasZ0Aop&X-Amz-Signature=002016980246918fe6dc496fa8a900498bf9de51eb5bbedb1edb448cc48aba00&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667EFCIJXV%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T141303Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQDr8Q95ZNYZHwQxuFxXG4K2NNmJov%2BQnRoWTt0bA%2BJt8AIhAJO%2BmdnKK%2FVhtLbQMw7Vcdy838ZX%2B%2FaWQugh8sDd7bCgKv8DCBQQABoMNjM3NDIzMTgzODA1Igw2F%2FIJSeU8n8vaqlwq3APV3vmPL%2FtMK0gxjfRvVITcbNn3XF11yU0rogidk8FoIUeKY27SiwcrNs5CaWYxfR35HAcLMfb4fzC%2FRJ%2FtATyvrRn4TcL2ldrzv70PY%2Fn%2Fm9312Fa8UrbX3rWiJEy52Ckv8IlJSstOvzRXVg2dBnq36Nii9VWDVVVxf1c0RKjESvGbevt2EOzYCAnGygLIekBLc0d9R1V8fwPOmJ9EKP4cIOmfRFRIjIi%2B311q7Fzv%2B4T897ibNawb6NF%2Fa1FC98GZAwF%2FEIVBzEicde118xj%2BZoU8OT%2FMvDxnE32wYUmLG%2FSlqJpreYcTGk2g69frfir6h3%2BnHONO5ZfWNjAY%2BLnGtQreY9CQDLInYJRlW8GlowLKxkn5vKCggoLmE1km3oYYMakSi09QGkVTxlZOQDof9btuyTUW8ZfCV6zm6IEph%2FidCY9K4mGoX1SZRfqR9VCy6K7uxKQdejY99bfyOrGYE%2BiyUeqxxi9Npo2mbFGh6h32zaqFuVSpiJBNjQsqsfZYApP7FqCqql8ir7P4luwEWbhwwgL8PGXHca5NTcfDQV6nQts8l7vIgEvCWfkPKa2WSZxFMMlXK5AUPajsTSF4Vin%2BUVIVjG%2BB1vJUuCoCY3jTYmmTHjXqLx%2FUNDCIorXNBjqkASAd7ewueXlDVdg%2FQh0xCxAafGczWpmVOh%2FyYCnexaAndbfhf3OdEugiOxXfNLlsavFfEluSNyCOOfaY167h%2FEc57mYRHE%2BLXWDAUiGcteterXQMCtMRyYTxRMClMRD6EHsa%2FGkMJNuZ6tm5h5niG2zLaBNXUDJKrI5TwUM0d5II5V6kHJghrJ%2F2wirWOv7zqrhjJpJibKTYInPYiaF5Qdt34gqo&X-Amz-Signature=9798146c78b23bac811b0ad70d0701b4c848f4ec05f33c08420b8be5816e0869&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667EFCIJXV%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T141303Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQDr8Q95ZNYZHwQxuFxXG4K2NNmJov%2BQnRoWTt0bA%2BJt8AIhAJO%2BmdnKK%2FVhtLbQMw7Vcdy838ZX%2B%2FaWQugh8sDd7bCgKv8DCBQQABoMNjM3NDIzMTgzODA1Igw2F%2FIJSeU8n8vaqlwq3APV3vmPL%2FtMK0gxjfRvVITcbNn3XF11yU0rogidk8FoIUeKY27SiwcrNs5CaWYxfR35HAcLMfb4fzC%2FRJ%2FtATyvrRn4TcL2ldrzv70PY%2Fn%2Fm9312Fa8UrbX3rWiJEy52Ckv8IlJSstOvzRXVg2dBnq36Nii9VWDVVVxf1c0RKjESvGbevt2EOzYCAnGygLIekBLc0d9R1V8fwPOmJ9EKP4cIOmfRFRIjIi%2B311q7Fzv%2B4T897ibNawb6NF%2Fa1FC98GZAwF%2FEIVBzEicde118xj%2BZoU8OT%2FMvDxnE32wYUmLG%2FSlqJpreYcTGk2g69frfir6h3%2BnHONO5ZfWNjAY%2BLnGtQreY9CQDLInYJRlW8GlowLKxkn5vKCggoLmE1km3oYYMakSi09QGkVTxlZOQDof9btuyTUW8ZfCV6zm6IEph%2FidCY9K4mGoX1SZRfqR9VCy6K7uxKQdejY99bfyOrGYE%2BiyUeqxxi9Npo2mbFGh6h32zaqFuVSpiJBNjQsqsfZYApP7FqCqql8ir7P4luwEWbhwwgL8PGXHca5NTcfDQV6nQts8l7vIgEvCWfkPKa2WSZxFMMlXK5AUPajsTSF4Vin%2BUVIVjG%2BB1vJUuCoCY3jTYmmTHjXqLx%2FUNDCIorXNBjqkASAd7ewueXlDVdg%2FQh0xCxAafGczWpmVOh%2FyYCnexaAndbfhf3OdEugiOxXfNLlsavFfEluSNyCOOfaY167h%2FEc57mYRHE%2BLXWDAUiGcteterXQMCtMRyYTxRMClMRD6EHsa%2FGkMJNuZ6tm5h5niG2zLaBNXUDJKrI5TwUM0d5II5V6kHJghrJ%2F2wirWOv7zqrhjJpJibKTYInPYiaF5Qdt34gqo&X-Amz-Signature=39cb237086d63f9d20d1bc26a2b00e7f23d22dad349637699954057296d4c924&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMFK4POR%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T141249Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIBzwQXn0OUqy%2Fg5AXv6vIYLBIBfJ7i2QLdT1em%2B4yCZcAiEAmJkrgqiMKFtpaa3csjba4jiRQBBhiWjYJ6M1cdXMlvsq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDN6fUnroboEPh9WRryrcA%2BCUZiD1azleilyFB5p73u7eyb%2FGqgcSXlzLmOf%2B8Dz0%2BAxg5%2BYnaKEJoyDlZWL2Esp4JaQt6l9wBFhQBlthdTJVHuEXwxiBRC9lb%2FbN%2B164AitXaT5J%2BXCX1z%2BwvA2yYi88sgFlBL9paM4D7X6N54Fb4BU7iphvxUE8hTQQrNOTKMJxPiSLbCy4qVSMEfMI0RuZVnaSWuwUv%2FffpiMQB68%2BMqLmkPJUCkZE7rTZXoEhv3IQWsdJgDp7BFgiWYhx0eUVURvdT3U%2FU2ARc3aKnJVIHEl8u5B2T7XbM96Av2OaCuLA54nuPr5vkm5dCvA8W62bTkHaFKZV0hHF5%2BkellWfw5SoufAfP6BI3bZS5MLSXy2eZvYL8vRaKobdX8wjrjZecd5%2FLKooVb78eKjNlCu0%2BapmHw77En5YDOZLfz3mXFx3KRUkndnUhWJ86jJNA9mrE5U9xi8D%2FJ2FL9KmNcZ6U3TvP6lQME1cgIiGM8Okr65oKHp31e8m%2Blq%2BxYdAas%2F%2BFGUXGejaOI2CGKsy9S%2FR53olOnBJbUNfJbyalbaOMEnAFPa6BditzixSPcmcHfd8HcukGc04J2BvIc9JFTUXzjvDqVYpyyzCHLV8qpx8Z%2BrodPZjOMFWIhhlMOShtc0GOqUBIrkKuxWfvJ8z7Eq5faITYbPRqG9NrNNzt6Bi1bwsGqlgHStCKPfJ9tXPsprtArl5BDtEUxhc5vauUrYMPeJHZDU1EhcU2nxPSVBgMZmtmgKyEH%2Fi0fHycEvqZ%2BqUAUfgQNFAymvMWEt1V9ralrrAO1EZfZUPFA5goDDgXB2VPQ0IFnMMk8ixzItzJv5e7yCEXwqq8%2FjBuLTkxuR1eLPYkB5G80IZ&X-Amz-Signature=db2343a4e73589fb58c301d219f7dabff5a1eb66f6d30332d166f89bf4c36adb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WJO3NM6A%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T141308Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIDqFilKpFZM2z9RDEQo%2FsfavoMQ3r6lirfIOgloZ0Z2RAiEAiVmw2vK7p9E96b4r4kdQ3nDLSxLhzVrkMfHQJzohIGUq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDMaco9ZvgDw5w1L5zSrcA9DIrCJ%2FkTEM6wM%2F6bXKGKmfIaFvOYzQ6cyMC9kmk2pLJE56RBNeDmS7GG0U%2FLzJUkJwor8nyrDGDzOILGADnNTR6Rm9m9i5nCwqTvOfcWkw8PuVgirUksEw%2BAiX%2B0ITMmfTK%2F79EZsBKdAEuEes439dty7c3jKp0jFmfWW2ToMfDE%2Fnor1ALne0JqXmpGa9Ku1Wc%2BmysikMEW4mtDj7%2FB9tvRUFWM%2Bwv6sZ9YomRlU%2B0h5tzYIJxhAUGXLMkgviDO9o2ZWtUcFHjHQECT5h%2BvXWDi54jud3%2FRcxXT34gaOFgXTt2W4lAbMOtZDDqg4cyg87UCynpZWzdiEPgC3FHz7bB7C%2FSYr9tUPd4LYmat9j98vnVingfZeU6NXar40dFZoTMMI7IULfA4oLDB3gbWdjLYw04q7vVYDa8YWgCt7JKHc4GtxKC3kEEmKHugxZ82tlhFJ4PxaRWNxz2VWRdfVjuAV6b%2Byd4rTnToM4cDP682rrCQpk1q903RRfJMq8MopzvhcYePzH4qHZDmGtGIxW4LoluSr0dedQnoarTpFrk2DPXjknXWTE5nVnC1rRHZojmv%2BHl6aFCkkrDL%2FpNL%2B1jmnxxI4c688o9mTN7gEI4I7Lv554Gzoa0skmMKCitc0GOqUB33PuFQuk0vLNBADGjfCAsrIBrq3eRpd385fYI2TsgtEAX4oSGYeEWdf1ShWpJ7ArXlx9N7M4ZMWXX028R2WGi5WKDbhyXjzNPg3Gpk1NOdYLhh2ISAD5RHo8iWpcrItWb3iXsCN2Oqu%2Fl1wHLy%2FY75YOK4chfrZfNpu%2BBXh3AhdEm4A42o8r6ATVi%2BvbxCksoi8TvuR6Hh8buHXCu01fYp0eFU81&X-Amz-Signature=82e2403c588553ebdb148326fdea9e6cbb067facbbdd74191f729c8aaee814de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WJO3NM6A%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T141308Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIDqFilKpFZM2z9RDEQo%2FsfavoMQ3r6lirfIOgloZ0Z2RAiEAiVmw2vK7p9E96b4r4kdQ3nDLSxLhzVrkMfHQJzohIGUq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDMaco9ZvgDw5w1L5zSrcA9DIrCJ%2FkTEM6wM%2F6bXKGKmfIaFvOYzQ6cyMC9kmk2pLJE56RBNeDmS7GG0U%2FLzJUkJwor8nyrDGDzOILGADnNTR6Rm9m9i5nCwqTvOfcWkw8PuVgirUksEw%2BAiX%2B0ITMmfTK%2F79EZsBKdAEuEes439dty7c3jKp0jFmfWW2ToMfDE%2Fnor1ALne0JqXmpGa9Ku1Wc%2BmysikMEW4mtDj7%2FB9tvRUFWM%2Bwv6sZ9YomRlU%2B0h5tzYIJxhAUGXLMkgviDO9o2ZWtUcFHjHQECT5h%2BvXWDi54jud3%2FRcxXT34gaOFgXTt2W4lAbMOtZDDqg4cyg87UCynpZWzdiEPgC3FHz7bB7C%2FSYr9tUPd4LYmat9j98vnVingfZeU6NXar40dFZoTMMI7IULfA4oLDB3gbWdjLYw04q7vVYDa8YWgCt7JKHc4GtxKC3kEEmKHugxZ82tlhFJ4PxaRWNxz2VWRdfVjuAV6b%2Byd4rTnToM4cDP682rrCQpk1q903RRfJMq8MopzvhcYePzH4qHZDmGtGIxW4LoluSr0dedQnoarTpFrk2DPXjknXWTE5nVnC1rRHZojmv%2BHl6aFCkkrDL%2FpNL%2B1jmnxxI4c688o9mTN7gEI4I7Lv554Gzoa0skmMKCitc0GOqUB33PuFQuk0vLNBADGjfCAsrIBrq3eRpd385fYI2TsgtEAX4oSGYeEWdf1ShWpJ7ArXlx9N7M4ZMWXX028R2WGi5WKDbhyXjzNPg3Gpk1NOdYLhh2ISAD5RHo8iWpcrItWb3iXsCN2Oqu%2Fl1wHLy%2FY75YOK4chfrZfNpu%2BBXh3AhdEm4A42o8r6ATVi%2BvbxCksoi8TvuR6Hh8buHXCu01fYp0eFU81&X-Amz-Signature=82e2403c588553ebdb148326fdea9e6cbb067facbbdd74191f729c8aaee814de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664WJKZSDA%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T141308Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCID8%2BkvJnRpSug%2FQWZEWfLlFDGUICmUEZSamI8204VVAJAiEAhKFKd3kmDDrA8nbfHOZexqrLHuuUN%2Fkt71fkdoHCsTcq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDL3oBLxgyQmGiM9CmCrcA%2BN1ixEwSkxdPFOLs70quYcuvTP5bIGVDLndq%2BG7dKnodcQT%2BdLkDirZRnaDangoT9Hf9%2FqAezY2NHHBCn5h5Kqc5i6794XOiJV%2B51eUwtdSRtQeNDbQ4ztz%2F5YN%2B35aR7OtBNm8NNXWuQavZcFJgarHpWyzscGavJJ3zi7Cn7pC4FUFIahU7QDIUbvMKeOhQIx%2BnnRFrExWB7GkAH%2BAuGEPgjHgCz6l0TrZespDnv5K4KRTy1ZwcrAksE0VRnOZR2FRUuhczM3gWhITkLEHpavTkTaTzIyMLSq5h7yDAqTegD1Kesj7jlVb4mVY3Y%2FTje%2B9Uo5D7%2FFZ42Cj9MglED82sO81lwR45iyXZLoKSxfaVujv%2BUFaXwHUWW6GkX4ORWKIf3cYIbfqEh%2BKUz%2FImqvlUX6xuX1XWTUl6v5927UBD9r6yLNCaL7TVSupCGiiDM4WqtfjbERO93exPlSq6wCXa%2BWGRJh3Moa5iAU2cili01%2BwqaHG5SuBtYo6nMxBKcDqXrorCCxSi3bj26MiuK2KmV%2Ff61bk9KOt6PVvvE%2BxCxLhr9eR41rPdw0jPMz1z5Qz92JTnWwvx0JiJad6A7wljRaXEvu8gHLGDPhw%2BcVn2TAU%2BHbmQcBx9dChMICitc0GOqUB22K9LRgW4d0PUiSKIrNJEpft6WgeK0E7ZB4sB0PtB9HG4fuFCQS7XzXXKxJK8nuA9xZZ3Y88Mr2KmABhb19lPWqUvya6gnyJxLqA%2FoutkkjVcVaBtdtsBEXTTWFUAObhSJJItcBnJ%2Fip4hfDq8xkf5yksEITIOkAyR32EBVW%2BtyOu2eWLJIPMHx9yjHf88NwIB193zzQsibPqhOu4VwRIrUqu0xW&X-Amz-Signature=c551dfd66c0c17282e699eaa0bce64bfdcb3d6bacdfab7a0bcac890dbedd44ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

