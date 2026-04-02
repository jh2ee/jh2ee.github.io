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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UDOSZZLX%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T141247Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB89QS1uS7TVvQoyC9s%2Bf7kGgqC2IowyQ1p2FcQPbbpaAiAk9hSx5mRVZzSjrKolMLqwjQonYNJ2LvrZDdYUOYAfQSr%2FAwhrEAAaDDYzNzQyMzE4MzgwNSIM1nHLTVuzJpFA9DBlKtwDGeU%2BGAm%2FCtBHXb6c2KpkrWjhs7ktcaK7kjzLYRUiAdslrmFDKh82Uv3aldbG29Ia6QZdQIPYFsKXHmJCxJ4gw25fGk6RiwavjjvsvvjkH2pxIchrLxTVIf1l0Ce2J9q6AOfa5n9EqVd4Hx118MFhsweCf1XYJHIiduZD1Jr1jkOeaQcfFNNtwRI3%2FRBfOHokqp0SQxksNxK5EziMW%2F8G79ofs2w269AnxMcdzmlcdO6nZ9%2F4Nwvy2VdM%2FFR3ZZiEdM3x0duM%2FrSrP1eQDjL5S8%2BBGmbdm8ko5e8J11NLxxo4bQYVQKPM7JXZTqWcqonLNQAQhRJ8utUw6XHduu%2FlwjSLpohIaDcjp1AnSra9NEWdue5FP9V5xkn4QjoR1qa254V9vbQRwZLzlH0I3Tr5ZDtCCYK75trDi9aN7ocXKaqHGa6zynbF4JgVi5qFlXYT9Hp4NkGf8Nh0hWNH763HGvfZtszd8YtIT4FPYF73DxhYXEtQIOMn3WjdQzl0UK8V7fPm83TVSyn2EcOh%2BfRw5x96tHEMWXQMlgS5wC6mJmCfDU703yr1JybSAP1ZikYFIRXvcA%2B1S%2BRm5Fctu50X9g9PKvit3sMAkMu2sSdW1xJ5rxJRK7RO2d0bTL4wmoW5zgY6pgG4iLtygbsQrkVk%2Bel2C6pj7HdLA8IpO0x139HWQ3wXaYjO9nqRkVzBmJXU0cCZapnkwcRwPYfkna2LMxC1sy7PqbOBrzo82g4lby9f1XDHwWUAzgCgXgVKWT%2Bzu7PriVFeNLVPPqgNDGoO7ae2%2FvDEGAi6o3XinXZqoz5Ib3jyY0Ks2Ugdh0hJRUbr164gm%2BeolyZwNRiLhhDqoR9i%2BOMbe2jkjH69&X-Amz-Signature=fefdfe24ea72ead655994362236fafad7edca1ae7cba5de668eddb0d21122ed1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UDOSZZLX%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T141247Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB89QS1uS7TVvQoyC9s%2Bf7kGgqC2IowyQ1p2FcQPbbpaAiAk9hSx5mRVZzSjrKolMLqwjQonYNJ2LvrZDdYUOYAfQSr%2FAwhrEAAaDDYzNzQyMzE4MzgwNSIM1nHLTVuzJpFA9DBlKtwDGeU%2BGAm%2FCtBHXb6c2KpkrWjhs7ktcaK7kjzLYRUiAdslrmFDKh82Uv3aldbG29Ia6QZdQIPYFsKXHmJCxJ4gw25fGk6RiwavjjvsvvjkH2pxIchrLxTVIf1l0Ce2J9q6AOfa5n9EqVd4Hx118MFhsweCf1XYJHIiduZD1Jr1jkOeaQcfFNNtwRI3%2FRBfOHokqp0SQxksNxK5EziMW%2F8G79ofs2w269AnxMcdzmlcdO6nZ9%2F4Nwvy2VdM%2FFR3ZZiEdM3x0duM%2FrSrP1eQDjL5S8%2BBGmbdm8ko5e8J11NLxxo4bQYVQKPM7JXZTqWcqonLNQAQhRJ8utUw6XHduu%2FlwjSLpohIaDcjp1AnSra9NEWdue5FP9V5xkn4QjoR1qa254V9vbQRwZLzlH0I3Tr5ZDtCCYK75trDi9aN7ocXKaqHGa6zynbF4JgVi5qFlXYT9Hp4NkGf8Nh0hWNH763HGvfZtszd8YtIT4FPYF73DxhYXEtQIOMn3WjdQzl0UK8V7fPm83TVSyn2EcOh%2BfRw5x96tHEMWXQMlgS5wC6mJmCfDU703yr1JybSAP1ZikYFIRXvcA%2B1S%2BRm5Fctu50X9g9PKvit3sMAkMu2sSdW1xJ5rxJRK7RO2d0bTL4wmoW5zgY6pgG4iLtygbsQrkVk%2Bel2C6pj7HdLA8IpO0x139HWQ3wXaYjO9nqRkVzBmJXU0cCZapnkwcRwPYfkna2LMxC1sy7PqbOBrzo82g4lby9f1XDHwWUAzgCgXgVKWT%2Bzu7PriVFeNLVPPqgNDGoO7ae2%2FvDEGAi6o3XinXZqoz5Ib3jyY0Ks2Ugdh0hJRUbr164gm%2BeolyZwNRiLhhDqoR9i%2BOMbe2jkjH69&X-Amz-Signature=fefdfe24ea72ead655994362236fafad7edca1ae7cba5de668eddb0d21122ed1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667GMTW4WH%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T141248Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDa1Q5%2B25qqTVTyDaDLbspspaHiMyM%2FSoo34CbwZ6NXjwIgO344vtG8Y6hKAm2OUc%2BUMLmr%2FFbeC3Kexcz26rFeYzwq%2FwMIbxAAGgw2Mzc0MjMxODM4MDUiDLE6F7HyG1OE5Z0RayrcAwYIi%2FHCY6nngoOJj%2F7W0jIAlUbprQOTt4nFUlRuc8S5Elyc4HcBmIfj6zNUmcCd%2FxADXbxbip%2BJzN0lMZcb68liaVBmHj6AGPvJqyAOinydsIjM5gQaykBzfyIry0f5kbs5R1G0pFr2trIswOY%2BB1txYhwRHxLifFaEswLLlvA8%2FVwgyiF3HHSlXGWHWSd04usUNc4%2FGOUAeQ%2FyFEmS2ai%2BD35g129S1oawdzAeev7AZzXzGICnYxvw6mm6nLWVkAV%2BIEs8Ds78zNGdyCRVEQjQCPz%2FAGuS7jgd6%2FWgi17NWDnmW0o%2FtYIHIIJvHTh9uzw%2F18nPG37ZmDecc0%2FtFdJA9T%2FTEHnwdu65QkVgZPHkCPikDnQ2FV92A9lW%2BMEuKQ78b9cJAMOzOWxB5X0LrfVzXGui76mRY%2BNmSqZZI6mzr3Llrm5YLCqWdbP5FWxqWI3T47H%2B032tXymPVEtspiNq8ky7AvT8Fvo57B95k9jjyNwfxMaNu3qXjb%2FP20aZ3p7fvS3cs6UhsTLSl5aF1%2FFN9lkA9EQkZ6JNMir%2BchLruXAPsaxig8f4riYzzEqW5qYVnBYAdupubkQTOV8c9tDD8ExPzKV3Rr7rgF%2B7AJJCPrg2zoEekDM5f%2F02MNXeuc4GOqUBlSp%2BzTsP0tJ9VE2gt2B5qeGM4WGgdFNlJtlzAzuKsK7YD5KYmk8UYpQOQPe7l7xbctdf48ABEUrHBqxqIRRvded9LfU0PecBflqBzqNYniWJCNIZ2A9LHscb9Z4fozH2hSqCwkNZMFZFCkfvWbjKoe6JkdNe0aOTeGjnf1ra620AqSTJjgbOwqNxirRDMqupc0%2FiNxS2ywuDspa9gzPGVbnT73vq&X-Amz-Signature=69ce80759698916a765873d06ab8d1848a51efcdd6cc71f36caa71662fa80374&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TIEUJZR%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T141250Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBvoO73vbcbfhM9ttojr367fiYRBfQ6SpClLX6Rr9tApAiA56MTgAQE2Jj2BYNG8%2BtAVKHUDT%2FPfZajA6Wbp01qbNir%2FAwhrEAAaDDYzNzQyMzE4MzgwNSIM7VWesUbPhw9wH39eKtwDjO8IqOdcEpMthFZanG1w0yhLnNkUHulobe0b9nHqzq3Vh4fBYo4DZoSBsvlj3jVBVvPv7tt1UFBMq%2BY90FJ1nDfqszG72zy73CXO9BO8ss8JubBvM%2FO2B5%2B2P8N%2B94r1R7SJxKXtHfDQB9o84fUaDXEicQ3mVfRuGyXZzADEwh1JGpL%2BaRfJJV%2BL2xZuAFO8K%2Bh%2Bl9KNeE%2FpdNNhTLn4SJPdKZ2%2FAaqoswNajPg5jAXBAcs%2FfJXyfqbdrQp2t1ccT33J7ubuJpxHyd8muxRVYKa6AMdI9rWEzgtaRz%2FKv%2B1tTXM2MaXfP8ywjQ5QHmlyTpuj%2FqgAXu7KSIXxddORNs6hB5FTJTMkkBvy0ghgzQdr3geOnXqtrTuoi73GHo7uxttyADd5Ce2UxVIFCHoQk0tfA5To7x2krEruSk7Oiir0TTyzkN7ProYo1Eq2jEeXQskgHbKLsQf2KdKzENGkQqY7rZ75tkkV5m13VUhlS2SkEqGGBMwoAzXB0Q3cTdDNWflYAIZ1ETYGMWGrxs3moT1Sa8fFFeO%2Bp6Nz7Ptt8O3gKzxRuxuCRpnopJJsY2R3hp7Bqy6WDwTApavtPUARbA1AnPR6Dja%2F4QLY5kQBo%2ByQaikx7CCalH875kwwkYS5zgY6pgF5HKQlvX6CO7U6sbAHtaH3QPW%2Bdz9D%2Fa%2BX1veUZ0VFdugMEEza3A%2BgRtdwBna4OCv97X7m77K9yQLHl4JV01%2FMkbRtCzLYuR5XZMNdO8l8pbVKQvXcq6h7OT%2F8ui3EHVFBK22LN8lesVg1FtfDtaQsiwD2l043SjXxSExDjQr64pE74b4PPilFGE%2BiAqA0UV8FzsMuqdVRwdw2dE7RTqcbYj9AXWhV&X-Amz-Signature=7b74445f80e12dcf93ee2b25c255e954c36ec2a8cdc04efbc08e5e95279d2cb0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TIEUJZR%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T141250Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBvoO73vbcbfhM9ttojr367fiYRBfQ6SpClLX6Rr9tApAiA56MTgAQE2Jj2BYNG8%2BtAVKHUDT%2FPfZajA6Wbp01qbNir%2FAwhrEAAaDDYzNzQyMzE4MzgwNSIM7VWesUbPhw9wH39eKtwDjO8IqOdcEpMthFZanG1w0yhLnNkUHulobe0b9nHqzq3Vh4fBYo4DZoSBsvlj3jVBVvPv7tt1UFBMq%2BY90FJ1nDfqszG72zy73CXO9BO8ss8JubBvM%2FO2B5%2B2P8N%2B94r1R7SJxKXtHfDQB9o84fUaDXEicQ3mVfRuGyXZzADEwh1JGpL%2BaRfJJV%2BL2xZuAFO8K%2Bh%2Bl9KNeE%2FpdNNhTLn4SJPdKZ2%2FAaqoswNajPg5jAXBAcs%2FfJXyfqbdrQp2t1ccT33J7ubuJpxHyd8muxRVYKa6AMdI9rWEzgtaRz%2FKv%2B1tTXM2MaXfP8ywjQ5QHmlyTpuj%2FqgAXu7KSIXxddORNs6hB5FTJTMkkBvy0ghgzQdr3geOnXqtrTuoi73GHo7uxttyADd5Ce2UxVIFCHoQk0tfA5To7x2krEruSk7Oiir0TTyzkN7ProYo1Eq2jEeXQskgHbKLsQf2KdKzENGkQqY7rZ75tkkV5m13VUhlS2SkEqGGBMwoAzXB0Q3cTdDNWflYAIZ1ETYGMWGrxs3moT1Sa8fFFeO%2Bp6Nz7Ptt8O3gKzxRuxuCRpnopJJsY2R3hp7Bqy6WDwTApavtPUARbA1AnPR6Dja%2F4QLY5kQBo%2ByQaikx7CCalH875kwwkYS5zgY6pgF5HKQlvX6CO7U6sbAHtaH3QPW%2Bdz9D%2Fa%2BX1veUZ0VFdugMEEza3A%2BgRtdwBna4OCv97X7m77K9yQLHl4JV01%2FMkbRtCzLYuR5XZMNdO8l8pbVKQvXcq6h7OT%2F8ui3EHVFBK22LN8lesVg1FtfDtaQsiwD2l043SjXxSExDjQr64pE74b4PPilFGE%2BiAqA0UV8FzsMuqdVRwdw2dE7RTqcbYj9AXWhV&X-Amz-Signature=ba04a4ed710aa9d3dce0102cddfbf48d7f92e48cc9d569e857dbb564ee275488&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666RFCNUME%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T141252Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDWJssl7GNc%2Bm7CNimvN4%2FQLXw6Eh50RT2rovC8lnPP9gIgeyjF0kTdVx%2BApkZgbvDhwC4aRgm4vJ4bpFTqhb7HADQq%2FwMIaxAAGgw2Mzc0MjMxODM4MDUiDFP8pNEQ4myFUFdC7CrcA9c0hogmjsGH4VYsvavpP7GFgHqpY3X414LAcMN95D%2FixKndnBbSf9y6tMO6yYUWkQQPi3H%2BEFG7RfC%2ByAxwvPW0KZ%2FHzgownAamrOVfAcEy57UC%2FmDzpjXXJ9kfNE%2FFJCiIMzOJqyVntfyQNykObv4S0WAw96sWaeAPZyFUNt4eNlKAjdTPi3Ixz0%2BrqpSqUhpXL1ugzRXBq7qb40QZNE22GDzSvd0LMTS9LiJouY4Htczobn8jTljRw3o%2F7JvQdCfVzcmGE8vqyKbfWvbrPI5y1IM0J9momXVBeIalNXAs%2Bc%2Fdmcs0EV1g8pJz3XnToMuZvC2F1TzYAQzer4jejafM4bz3ppfUyOxLxZfcJgf%2BN8MdAtUfzEJ%2BZUfwjNt8pMIS6U79%2BUvLDyqQqNejzznsOhJMeySMfB550ofTkhvYv2UoPEKPZtJaqct9UNPomQlJagBaf1W11X8PFYch82qT43NGVqqtdTNo1xcECaGtSEKGBvflpf%2F1AFvUm4ETB4nvIr5cIdo%2FMMx8EtibDmBR5akuzktspU2oZYSHjORmCDX0bMFB1C5WDvCDwrbdPBfVze8pyhYp6fDb1KK%2FWq8GXJyJSRsM2%2FPM%2BeDe7y4Ssuq0NidK%2BAilflOZMIiFuc4GOqUBfScej83aTW5ylt2%2FJg1S9iuco60YVaChOJdO6F8CVZJz24k%2F0tqZwK25JZnI2utVXsQaV9xinotQkPcsdP6%2FBEBa%2BDKIzS5ZahE3xzx26tcYuC%2B2evWeh5pt4GytsZ4D3CNr9BfOIfcGrvZ6lp8dcjymx5QSYRIpTTL7uxMNm8lRR%2F243NARgQ%2F3tEWlUdF5c4XK3FCLFntbF8ZnKkloZX8y2xHM&X-Amz-Signature=1896cf271bfbbf07037a9054a935d1b4f3b2cb0b7022dde62939cb199c6f138e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VLW4ELRJ%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T141252Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAW4WtPAqtJGHGDxeK6ibVzQ6wDHEQM0tCqA217WSoXyAiAs2ZILz7jvGlIBRaT4BeNO7CxNz7%2BNowwfu%2FB2ZQdQwyr%2FAwhrEAAaDDYzNzQyMzE4MzgwNSIMlzZHgDcU3QbAGY6eKtwDfMRPnAJmyNG9MeZhBnqZmHQz7rMwXryjQODs122F0BjlEKLc%2FaU2cioBgwp6GHVAQ4pHrpwfmIE7%2B0bb8YTriaym7RDZdgtOr5CWMa%2B2xkFjGENBe8%2Fx0kv35prZwfpTN7m%2FCd0G7GZAEkCDK6avwXciaoKnaNC3DLKicWgciWmqRRsZ4xUinel1YkEC5Ssuh%2B9Jj9uBrUh0Wg5Bhg5GSnVxvjqqiWj7%2FGa6np5%2BodW8y3OANFrMwZpDEmHedCPol5ysHNtDmDRYEjU9M5g2%2BVs739l0TDZAZGZ73iM991ZGJlyT9lpIsbA7ZFkQkZ8y6ksmzWdcgPO9AH4HMbq01gJVjkOxD0RoV%2BbZO%2BMOgX3T3WF%2F6svbc0zYGh98s6KBzs30v5ciQG2xuw44ZjFEEhBGb9xCkuIWvAMO1gzarfbdIj%2FXjNXLJLoLf5OmeASoXfxwaab8gKKsS%2B7XQK3fC%2BTUd0t%2FmvHwa9j2Y4RNeaYX67vUqiEcUUha4GG55posTdVud%2BUc50oRlTPandboNX5aR6aAZJHpRgeUdtRi1R93AlTmx5iIPgryxY2hScz6QFK2NLPicz3ViAwzMKw%2BJeMcuCRDzJeMH4Rs7G4moiMbGzNrRt2TX2toXaswzoO5zgY6pgFlAcMBz6C3Az%2BhVcIXgkJ50u5R5jG%2BOYwChUS7NJmsx4l8SZM%2FgQ%2FPpZmXs8m1FMObzz42x%2BAD%2B6S7FCjBpHAIFW%2B%2BvKxFlCDQ3vDIMhcHUA8QcZvX34N2ICFxT%2FAVKr5EA8zFPrLeArmllCkW5kqlZjMgS8j6sdwKkdex1TBK6cxrnaQAhwlRBqc5%2F4Eub65pTBusNg1hyfgkZLl4lKUiuvQbChSU&X-Amz-Signature=d12f0e07fdb8292e4c6b22506b1dd68144d0ff2a8e69c225e22e5cd30b484c21&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFQXC2AQ%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T141253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDZ7gqXEm8Sb3CmCCE5lqyNMnus1ADS4InIrHhPU6%2F3%2FgIgSGAtLnXlrZfiiJGduxISLzpBLM0myxNyCHHunegAsIwq%2FwMIaxAAGgw2Mzc0MjMxODM4MDUiDMlOTYl7BHn2TXn%2BAircA0SYDwect7mmbvI%2BHnxTTUJWLOz36PJ9Z7zX9IY3EMhXmmPyWy2%2FA5p1XfyTJQ0aiucSLah1dplbMgE9cvcZZP6fSMEeUppe4zc4CmWTo0Hb9Vk%2BlXrcX4SLYXowLT0qByQtRIf0xSJ9f11LL0BQrK7iZ55DjB%2FneJg%2FRHtS8nlSKEBA3LUGdCr8%2FeKvwhxrSm4VIu2hTR2Bkn%2BdQLh%2FR0Ylq0VzyvFfyllNpfLSWkp8xyydpbtVyTTDKl4V%2BOIyjp%2F%2BpXFRU%2FC%2FCUKvh91sZGJBT%2BLdlEPTx%2BsGeoebSmA0aqsd0y0GRCwcc%2BtEQyn8ONN3BDN66s0jih8zF%2FpBXbj6dzzou3DXoqXRpwtyDs4i4IguUo%2B%2F5fCVkmo1GC9Pd43gYm3gC9RaNke7n7nB4YPuFXrH5rfiO13%2FzSvhljirAQw6xLOc67BHQdLpNSa929PU5TDEyiqgOv8L4KRhveUqlhqNQ6jSUNbISJibIGV%2BLwfZSNUKrt3AlMYNjRff%2FfoM34XIvUpUw07iDaAtOgDjWd6LHwIi2iAkio3ESoqKON2nMz3FDGAGiyQQ3NpedUMlOUqNSJMnpbm8WqD01A3b5duM28fw%2BJYpSzX8FulfvDjSKyGjy5YJiRtYMK%2BDuc4GOqUBW2Mkt3ps9SzksWXmCMYNONDz%2FGPuMF5HNgBT%2Fqk%2BR6jgn26wRw444zWIm30i1ZT9BQdbJnwb7SNUD58MJERa%2B%2FCLLnfc7BlJXsw47YQIPvv9oys3ncm1j23Lu7gmnGBw4EBVhX%2BcaHpQZWrmhXbXV%2BhgYxutSuE0vmIEW7MNC2Bx5rnAsr0%2FkOHgwbIHWxqKDYbQy%2FLGqDkKnRjrFiVE0Ux2Kibh&X-Amz-Signature=450fc2db86b937733914c26a0d864ee3e4594819f4d22b5a264b8a4de65fb1e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SCQAKPD7%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T141255Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBlR94IeyeMR5pnATdsIpeoP55E8tSjg26HY6Vz%2FTcbMAiEA5mmBASOWAuowdFmTgJO%2Bd0lrtrV3%2FcmWZqA43%2BuHya0q%2FwMIaxAAGgw2Mzc0MjMxODM4MDUiDOI9pmO%2FX61P2i4WrSrcAzqRs8qgtJqoltq00dxYElTp0nNBldSbZKTkOUM%2F2ENDXAvLTmbaxtkDKCDXag4RNxLFPt7Hp9J%2BE3WEe7KDaHKL6gskFbKYzCf6iJy23QO0yJCObAiVa6%2Fw4wOYuWvVh%2FGg%2B7vWH%2BhYVphNnEhdQdGk3AlN2antjTgtIt%2BGwLgOpjt%2BmvjCUzaqGDEn8jCA0tmxOsxuOJ8%2F4p9oT92tnRPPummMEgRKpnTZycgjIF%2BZJiec45zdON0XZG5MUZ0BlJ4s6hWv9qA6A2Vfh0sXWKq5Qp6tcKRhGXku5bbo%2F7BRFneint76J%2FuEV22dCM3%2FTedTIoXVfgRVjc36DOWbLla16mEaUs8J9Bgj73rtyJ4s%2BI4fUySO91TiFRseOnrPl0xf2NmDYOTVnnVr33TrYf0S0wSWaFWND6mc7qnfd8DRaUdGePSPn4o59p%2BlN2%2F0S45WZMPgOzKudo%2BrQ9rAPzvCqE8me%2Bcy1plF24sT4rsaOf4pPWcht6zeRwevZcnFXEm8DkjpBOuHwYpP9XPzg7GyeqLwc6xRuJAz0ZvQmAzDS7WW9DmnVSdLIwnxul%2FC%2BLJTO2ZJHAfDGfnG2FA4x2y6u1r2YK%2F94hmlmIwujSR3KH8CJsLzkA7568LKMJ%2BGuc4GOqUBhScE90reccSMvGOMefPjrLKygVUD%2Bt0DOKTuSbG4hho8hqkZ2NBMlrnZacdmm0a5t0uopZOvBC3rIllwgrMLIfNnGiuR8nsmWAK0o%2FBo9TLMKELYVoslz9lL%2F5sEHtVt5ymLNP4N0XpDDshTi3m6jrNAQxH7zrqDQM%2BCRJwgiyResgle6X0LhAJ%2FECDOErjgLQOTIwnI2YCvMbYFRPXK5ycaxSkG&X-Amz-Signature=4e88f91e80179aced7f210d314315db3d53ecb5cf191e74dc3af18004abce73c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SCQAKPD7%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T141255Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBlR94IeyeMR5pnATdsIpeoP55E8tSjg26HY6Vz%2FTcbMAiEA5mmBASOWAuowdFmTgJO%2Bd0lrtrV3%2FcmWZqA43%2BuHya0q%2FwMIaxAAGgw2Mzc0MjMxODM4MDUiDOI9pmO%2FX61P2i4WrSrcAzqRs8qgtJqoltq00dxYElTp0nNBldSbZKTkOUM%2F2ENDXAvLTmbaxtkDKCDXag4RNxLFPt7Hp9J%2BE3WEe7KDaHKL6gskFbKYzCf6iJy23QO0yJCObAiVa6%2Fw4wOYuWvVh%2FGg%2B7vWH%2BhYVphNnEhdQdGk3AlN2antjTgtIt%2BGwLgOpjt%2BmvjCUzaqGDEn8jCA0tmxOsxuOJ8%2F4p9oT92tnRPPummMEgRKpnTZycgjIF%2BZJiec45zdON0XZG5MUZ0BlJ4s6hWv9qA6A2Vfh0sXWKq5Qp6tcKRhGXku5bbo%2F7BRFneint76J%2FuEV22dCM3%2FTedTIoXVfgRVjc36DOWbLla16mEaUs8J9Bgj73rtyJ4s%2BI4fUySO91TiFRseOnrPl0xf2NmDYOTVnnVr33TrYf0S0wSWaFWND6mc7qnfd8DRaUdGePSPn4o59p%2BlN2%2F0S45WZMPgOzKudo%2BrQ9rAPzvCqE8me%2Bcy1plF24sT4rsaOf4pPWcht6zeRwevZcnFXEm8DkjpBOuHwYpP9XPzg7GyeqLwc6xRuJAz0ZvQmAzDS7WW9DmnVSdLIwnxul%2FC%2BLJTO2ZJHAfDGfnG2FA4x2y6u1r2YK%2F94hmlmIwujSR3KH8CJsLzkA7568LKMJ%2BGuc4GOqUBhScE90reccSMvGOMefPjrLKygVUD%2Bt0DOKTuSbG4hho8hqkZ2NBMlrnZacdmm0a5t0uopZOvBC3rIllwgrMLIfNnGiuR8nsmWAK0o%2FBo9TLMKELYVoslz9lL%2F5sEHtVt5ymLNP4N0XpDDshTi3m6jrNAQxH7zrqDQM%2BCRJwgiyResgle6X0LhAJ%2FECDOErjgLQOTIwnI2YCvMbYFRPXK5ycaxSkG&X-Amz-Signature=a23a2c7f84e19556f1808be3b68db184052c8fe78f2a6d7d36261694453f0cb6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TVYR4UMQ%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T141243Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDeDeHjaVyLrZ2v6Ol8rZNYgEAffLDVcVKdGfp16pwVNAiBxm7n7NM30MC5KDTrlkGN53UOIETWMpK5FYfqHMmrTsSr%2FAwhrEAAaDDYzNzQyMzE4MzgwNSIMJg24%2BoejBfela0eQKtwDsOyMD6%2B7BB81WjwSu%2BEtpdCQxmhPF1LHU30KZ4KaL%2F394JKcXRnnhbvvd6M%2Fx45aNvDJ2lO0uUOVqzRCbtjpgG%2BzBH7iJfMBnPTeG0X3hECdgBd911boGkt2t%2Bv0jUDWNbaAJpVZYkjyiX2zOISlfg1%2FEUPBrzmTFLGa1fMlbQlD9QQrZ%2F2Bn9VGTIjrpKBglYu5SzeHCacsxLtB1e%2FtKBNuwj1zt3rmaybtIE6L41gzigfjX6AO25HyEaQxfG0YEBtZcAUXeQNLel25u3cil7GDU6n0Gj9oF0w3bbJkxoXO54sinT2Ur6jvyrrzh7F7QfAt2ZbWURwDC0nzYvFfrUJr17unuThgvZoTHflrY01XPtqpiJG1886hB1BpKCqDtAK2hP9MqXavulAt3E1lBiE7E6bbcIJt2BR54d2fqRL8aZSjA7KF7NO2eSDT0tBz9MWRKKH7C9Qes6XxIjUEzk2PlPJUgUoyidAQ%2BRUrGbongnfmcHsj99vhbUfw3rYfZy%2F527FurBbKNPpFndvWri4o%2FD9p4SKqbw7qCv5ULWeq%2BpOWO0%2Fo%2B8u9%2BQKBkmXqshuQX8alMVtw2thd5ft9AgVtu%2FVXvyZ%2BdeicylZmQ0yoeXLvVbNoogvhGIQw8YS5zgY6pgHjZC8eg%2BpzkMJj62OfRs%2Br%2Fd4h6EdUTfsivVVfFgQh7xYNaPjt5%2Bv1nQl%2FrnNF4ymDfAmiFDnrH%2B6YC4Ua5Qg8GqkShoNdEbb20falwq9rtAWviUlNg0DTOH3%2F0E5urD8H5cK%2Bd5I8qw3kcqIa4XJUplfHqxgW9QS8g0yBLT9GwLd7DfNfHXS7Yf0jKnT%2BqYiahH%2FuwnkN5TrBv1bbb6d0%2FiqkPPwq&X-Amz-Signature=4af464bd6e564718b7e3aa5e40539cafc35828b8a1294b74e8bbb9f7842abfcd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSQHD4IA%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T141257Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDocNsaV1xyKeKEVnUPBxqQmG6kMeC70CnS6loslQxaYgIhAM%2FFOZg6xfaOVrqANOi81e6g%2BNFCIrIk0MxDJJoiAuQ%2FKv8DCGsQABoMNjM3NDIzMTgzODA1Igyl6rDFSV5EIbs%2B6D0q3AMzX3T6qrSBkNmCTV%2FTAXqmRaRrcKOza2Go0PS8f5Y9doDYSRbGEGEomb1PZz5%2F22u%2BGyPTIQGr5QBpTWIyebxJXGsJWF4MlVNOPAt%2F8ijhOXHKZLJG5eMnYko3WvAmMkYoCoTjhP%2F6CeMwluljsIvWIdmjT%2BhtXGlJT9htCAR%2BreVmeT%2B9AY%2BDze2Xd2CtrJ89mkP%2BML53E%2B8kdLP3nULDRgQ1U2gJJUYLEn1P31MvTI11EiZxNtDlNQvuBn824EVM2S8r0yVA%2BGKKoV%2FbWXbIYxJ7pCW0y6mnhP7Y19sqU579l%2BDOFAgAz%2BWlQ5Y%2F8hypXeXgXXLi7Z2ZG2%2FsMFdlD3pJ6vxvNRmiS3tTNj54iWQbjYzZ%2BH5YpT5fbzcHnsdEG6qDQHqdWtvf1hk1qZ7i4K6PTH3g%2FJbAxtWtYXAtvBaFYnj70mAN6NQwnwvNLH0O2LswrQEywrjusJOpUsnAxm%2F55lR5v23Aa1XIbSI0i0MwBSStYauRBUJ%2FrUUNDqLrn%2FcKLwc9txNdYNF7qYJuktG2Lw4oEDYBvlZOKbogcsi1tlZskPdPPv0g8TrBDobhlATu4FRD12w6bEMfgBAxmpgbkfgcaOaKBQOzYhywhgymMKGa3iw8t9oFfDDrhbnOBjqkAfHpUts2JWhft1fgDGnpKozqWA4mOg8CYchNJrx52uBJ4ucruAVLfu%2FoxNyBjLysXTrzWEmT1OwYWFECQlhEy2gw99y1JggFdNeLk2GiKR2rxoRXyNB%2FIkn9ZUKH1MAGi4LdQEEfqQAqdDLQe711OxTs%2Ba%2BJdnKAQw5%2BVW4OqlYTzqdZRHL8Soy79gzxe8l3Qqli8Lag4HIQwAWQSYgkZdaOeRrW&X-Amz-Signature=f6db2c55950226c0983e1007678a9c3c84e2e93a6b92767146337e038922e145&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSQHD4IA%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T141257Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDocNsaV1xyKeKEVnUPBxqQmG6kMeC70CnS6loslQxaYgIhAM%2FFOZg6xfaOVrqANOi81e6g%2BNFCIrIk0MxDJJoiAuQ%2FKv8DCGsQABoMNjM3NDIzMTgzODA1Igyl6rDFSV5EIbs%2B6D0q3AMzX3T6qrSBkNmCTV%2FTAXqmRaRrcKOza2Go0PS8f5Y9doDYSRbGEGEomb1PZz5%2F22u%2BGyPTIQGr5QBpTWIyebxJXGsJWF4MlVNOPAt%2F8ijhOXHKZLJG5eMnYko3WvAmMkYoCoTjhP%2F6CeMwluljsIvWIdmjT%2BhtXGlJT9htCAR%2BreVmeT%2B9AY%2BDze2Xd2CtrJ89mkP%2BML53E%2B8kdLP3nULDRgQ1U2gJJUYLEn1P31MvTI11EiZxNtDlNQvuBn824EVM2S8r0yVA%2BGKKoV%2FbWXbIYxJ7pCW0y6mnhP7Y19sqU579l%2BDOFAgAz%2BWlQ5Y%2F8hypXeXgXXLi7Z2ZG2%2FsMFdlD3pJ6vxvNRmiS3tTNj54iWQbjYzZ%2BH5YpT5fbzcHnsdEG6qDQHqdWtvf1hk1qZ7i4K6PTH3g%2FJbAxtWtYXAtvBaFYnj70mAN6NQwnwvNLH0O2LswrQEywrjusJOpUsnAxm%2F55lR5v23Aa1XIbSI0i0MwBSStYauRBUJ%2FrUUNDqLrn%2FcKLwc9txNdYNF7qYJuktG2Lw4oEDYBvlZOKbogcsi1tlZskPdPPv0g8TrBDobhlATu4FRD12w6bEMfgBAxmpgbkfgcaOaKBQOzYhywhgymMKGa3iw8t9oFfDDrhbnOBjqkAfHpUts2JWhft1fgDGnpKozqWA4mOg8CYchNJrx52uBJ4ucruAVLfu%2FoxNyBjLysXTrzWEmT1OwYWFECQlhEy2gw99y1JggFdNeLk2GiKR2rxoRXyNB%2FIkn9ZUKH1MAGi4LdQEEfqQAqdDLQe711OxTs%2Ba%2BJdnKAQw5%2BVW4OqlYTzqdZRHL8Soy79gzxe8l3Qqli8Lag4HIQwAWQSYgkZdaOeRrW&X-Amz-Signature=f6db2c55950226c0983e1007678a9c3c84e2e93a6b92767146337e038922e145&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667SEZA7MQ%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T141302Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC%2FRBz4mp1baP37B%2Fnyu%2FG5%2FDDrvNHemN1KQrlis4V9WQIgYx0%2BorIRsFK6%2B5Bt5Sr7l5qEzBtDZKtimFgcAJKw19Uq%2FwMIaxAAGgw2Mzc0MjMxODM4MDUiDH1ZQahSSE9M%2Btt34yrcA6KhfvbubxX2x9AbWtC8m9mGlzYoleTSiFdadQitzln0qq%2BZr0GuBdOJQLcvzY3IhAt5JOm9gtRfRqzFnT9JTqs2znjtFKcf3hNFBLBwHoKHh87S8X6CW5TgrtfSi3TwRpz%2BTawNJBgoj%2FFOrcb0Zv7wBh%2BE6OkXuW59jjdeZ84PorxOMWSQKihBPWo3P40t9BGRLApkOL42p5utrILSO423H3kKkzHKvaYHUienF0vxJ2QagTndxOEhePhZkjCwSDvJJB%2FsCDDzHeRFyYrMa7Ts3BJJyn5nj1sFjKPHSZbv7Gb4h5dlctIHQ%2BNOEC9F2YbP9UQz66m4%2FOqEz4MHqqs6%2BqLasHsvVNzOusBJH%2B8ltnzmjuDGyEFbHSximj6mjGZNGmMDOULN97iDF%2Ffr6Ew7tipHU7PW29hMEkPHktGrVXqqYq1m2QzulAiCchlw6%2FzRcMOcdDMkagBW3qVMvLbLVR0HeTQHS3Har73d2uOcmhBV1jkZveMVNBLOd5yQ4BJekIg%2BPudwSfW2%2FYisiyp%2FONJ9vNz0GgQg%2FcpiOGdwWKJYzKw3JuuUFEyosLsk%2B%2BOuXlCt8ZDtI6MawvhxxyDIjeg%2FyFCDxF5RVU6yWbFJVtsn2womwv6umCkwMJ%2BDuc4GOqUB0bFtJAXS9Eslw11k5fMT1KJY261Dd1dmuKjheFAq0wJhjuNL4fcXpl05K8edKytLPqybSz%2Bd8NJJQRl%2FUtIZJYbh8AnD8rbGLO2NKosPmSr1u%2F%2BvxULktKsQ7pCtkDK4x9hnZvFuSE9dKyeHNwDOlB4HL9%2Buroigrvv7u3o%2ByP0r7B8%2F3JydZThnwbMi4C3eptbdMTGsaEMCrGde6YgQLcyTQO3P&X-Amz-Signature=c9358d7667ba3a5cc32c2d16ea1d5a46e08c97af4d10bc044c994dc04cb7231c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

