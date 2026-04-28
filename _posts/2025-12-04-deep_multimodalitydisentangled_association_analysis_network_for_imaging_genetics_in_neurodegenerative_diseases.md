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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZZZSMM2I%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T234109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB8aCXVzLXdlc3QtMiJHMEUCIQCD%2BYsMIaLgnkG%2BLfdxBqRPrl2EBBb5GfKUiNh%2B8GkBowIgRy00E6s6Ue8AvIpTglwSmoXG6qZzJLyn7EkWE%2BcV%2BesqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKyry1ogtQp3OtfACyrcA6RQHZBTxXNPgalR4ItiBsglN7VPM9F3uAIOmVUxBC9kMWofws3XqYpcpmhDGY9qzM6G8voKGAnofjFtbMSIAuQEDetilwJc801tB7s03P0KCAJRc4p7R1X01gZ7Ennb%2FB4HKPxOuF6DSSw3IvY4qj6zzAIXOvvJ4treVhIp3S%2BDLdgbE8vw0cE1si4%2FWz3ICYoOg95mWU7iYS56VAxQbJJobhpjq%2BLvHJgAiAXxr5CQLlDush5JwkInh3rNdG1PenmSwA1S64YrewOXGPE14gCULPWuIvYePO2CEseYfQRBFS%2BEWgOvTolbZr4sNKpfsBVHNo15qHXcfgosvIFDCppDXQYeHiy1bRAC91cd6f4yfVC1sMzJ3uKWSl4OQUd255JSwKq%2FCrvE%2Fw%2FJaGCQQXS6JlnnhvqmSaipFb3HgdJq8mcTEHRNzlZ%2BMADUL%2F53qVqbRDCKSVQKQku%2FA%2BhM2f9WaubmKT4sI80Ez4%2Bh%2FTC8B5BHhhanbNGHVWgjnEgV1el%2BIo48ZK3XY9vKf3qMScvM3VeecudVaSjTWfqYB%2By5TgCnmQSjs3XtUXNNaZHUPkX20M1fxwpSatty3MTsvxbb8C2mQm%2FzSOPYfW8s6kV3KFeJsnlfAvB6keC8MM3oxM8GOqUBiNRKFfCOaXglJarEnNvLC5sbh%2BR2FDN1PDR0eT1BLTK7z1f6ZNdqSh5QCfNqZcjdZgpbF7hmL23Fb1qNp70PWK4G6o79pi6KdVJ0ped93o53T9B7wNKKHOcR61BM5NypQZqNmPt%2BP2ozf2EM8Lcvp5YNdPBj7pZGv2riFYJGyQwIy1SA8EDkrCBFky7NbGieL71rEf3sjpfPfu3b5ztKOJlNub%2BO&X-Amz-Signature=b4928b903fbfa8b256d4088da26d0cbad545c01927f4eb776b8951a3ae2b51a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZZZSMM2I%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T234109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB8aCXVzLXdlc3QtMiJHMEUCIQCD%2BYsMIaLgnkG%2BLfdxBqRPrl2EBBb5GfKUiNh%2B8GkBowIgRy00E6s6Ue8AvIpTglwSmoXG6qZzJLyn7EkWE%2BcV%2BesqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKyry1ogtQp3OtfACyrcA6RQHZBTxXNPgalR4ItiBsglN7VPM9F3uAIOmVUxBC9kMWofws3XqYpcpmhDGY9qzM6G8voKGAnofjFtbMSIAuQEDetilwJc801tB7s03P0KCAJRc4p7R1X01gZ7Ennb%2FB4HKPxOuF6DSSw3IvY4qj6zzAIXOvvJ4treVhIp3S%2BDLdgbE8vw0cE1si4%2FWz3ICYoOg95mWU7iYS56VAxQbJJobhpjq%2BLvHJgAiAXxr5CQLlDush5JwkInh3rNdG1PenmSwA1S64YrewOXGPE14gCULPWuIvYePO2CEseYfQRBFS%2BEWgOvTolbZr4sNKpfsBVHNo15qHXcfgosvIFDCppDXQYeHiy1bRAC91cd6f4yfVC1sMzJ3uKWSl4OQUd255JSwKq%2FCrvE%2Fw%2FJaGCQQXS6JlnnhvqmSaipFb3HgdJq8mcTEHRNzlZ%2BMADUL%2F53qVqbRDCKSVQKQku%2FA%2BhM2f9WaubmKT4sI80Ez4%2Bh%2FTC8B5BHhhanbNGHVWgjnEgV1el%2BIo48ZK3XY9vKf3qMScvM3VeecudVaSjTWfqYB%2By5TgCnmQSjs3XtUXNNaZHUPkX20M1fxwpSatty3MTsvxbb8C2mQm%2FzSOPYfW8s6kV3KFeJsnlfAvB6keC8MM3oxM8GOqUBiNRKFfCOaXglJarEnNvLC5sbh%2BR2FDN1PDR0eT1BLTK7z1f6ZNdqSh5QCfNqZcjdZgpbF7hmL23Fb1qNp70PWK4G6o79pi6KdVJ0ped93o53T9B7wNKKHOcR61BM5NypQZqNmPt%2BP2ozf2EM8Lcvp5YNdPBj7pZGv2riFYJGyQwIy1SA8EDkrCBFky7NbGieL71rEf3sjpfPfu3b5ztKOJlNub%2BO&X-Amz-Signature=b4928b903fbfa8b256d4088da26d0cbad545c01927f4eb776b8951a3ae2b51a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664N2HEI34%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T234109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB8aCXVzLXdlc3QtMiJHMEUCIQDlkxQpuM5NulNozNzTn7Q2Uyw9I0cB1cDO9vry8xNTaQIgIRUWK48JRuawjcgBsMWaRPHEdKeJVtR7ynL0BC2hrjMqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHb5goG5ZhY1QEgXYyrcA8kndBbaRT2vMzX6mr8hibhk9RHWZaNOasN123Nr3FXcGlhivb2rhRsgw77jnLfH2gPDxYmPtSWUxeXcj1ev4IT8RhUhtT%2FFAo64BeyGTOu0xCLUuErHvZrvbIHfmVjqvoEAHhnyBuZBFtjZBBKMIW7FtOnqkCqX8VDSWH3ucZHZgP9d2jI6bRU3V1ywJxRxx%2FGF33JLBODIhQmrtHjV6cHXxPeLl%2FigQFWhI%2Bbzg4kJ2I7zmgod55p52dlXUEy8gDdy6JN5UnimBgg5xnwq3An336%2BQKdOoavwxGKF0YjJIUZ4hxFJ4pGonqKwYJ%2BHFSSY1J7VEfDzEJIHNlPsMH0Q54czkVsmAuNQVBTa5Wy0k0CagXUZ1AiUkw5lWiWfVDWjcyCKpD9iPFJTItKfCVpc5YReLVQSi%2FTsMXw3IfpZcJJ69YpikN3ycV4HJ7LARMCwxaeRrXLsScQozbjVVIDaMpGS4RXxic6OwZzSVSuq1vjNrz2Ca%2Fdev4KDQJdaNaknzmHHrPhI4nmp%2FW6nxAuZAVl7rsmBgDIkeKh0eQqOcMuQHOFwnRn8EQFC4UlZaWs0MKOF5AIH2K%2F1xEVUaJh3aWu1Gyv7ApRB7KjNaSnmBsb77vR%2FLxO8Bg%2BhaMM3oxM8GOqUBPp1Ehz%2FTlln0dQNkBG4aufTNIQEV0yAbeoTqzmAXY%2BUmWYWFDeXFKdNqZVNRdKxbRy7ocEhf2BQCw2NWyLTtZHUov9DeLeOxFKsykbBpgCq4xW6g93c7hE1jR6fs3An6rhrX003Tr0%2BqtX8eLD13tGPYiCjOp18RF3B%2BAJcTBb%2BVZQ4A7tysB4zlG7et1Hj290G992yyK9mb0aGrCkkaOWBOgBEm&X-Amz-Signature=19048920f7a4e82cee036e562bcb69c6e2a9f79de8db817fda04a2e58521a4c6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKPJLJ2H%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T234110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB8aCXVzLXdlc3QtMiJHMEUCIB%2FpLCo5PRXtx7rEF2MvZza%2FnDEuWTCu5FjHZm5cRqjvAiEApMuD7dD0uS7fCMuDKDpfL%2BBY6xDDTu0iLC%2B7hxsXon8qiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAWOK4X%2FyWvwaCHbbSrcA0mE0CW3MnsnJsGwjOj%2BTkPuLscnWWYnDcITKTCrqEQ8PXwuxgnFZLuKZaiFA7Xs1DNjNuFKk2N57Y3HdLpVqAk88KjyMsYPNdtsSlzb%2FJJHz5LackUh6jYWVol5lsO7Ra25RH0%2Fyf%2FbCi%2FrAZhts%2Bk9HvSPIq3QNoXwnNcdVfptll1AEJ1umjKEnz7vlgoLUkotEjNXmHtbHtCWmLJhhXI6rRkjpWtQDDeS6jKr3%2FsIeQSxx%2FgEVvMy%2FrA%2FihIiVVvRV2XkyfqidsJ6xTBUb6VwgHOTw7iVohSvn%2BzKgyhxxyBduj102KTWoaNpO5tEeCYkdeI0rpp5A%2Bli5ds06kUBWr9Tn2KGBuvw4QTUw52yJsTsbkomvANEiA8KU0pkgPRgU1bawH7H8s9NuxmTCcBDo2qtpbteCYJGS%2BE44uRZk76QsbQT29GTgSVmmq0%2Fd5f0bEW9ks1VYfCJeZgpkS%2FJ%2B4881%2Br8%2BL0TDNmzWaexSW2oyvBRyBpmDqHvANFmAuXeWo6J3CWxTY2dNkA0legdyQ%2BVSwT3eJRPZjLfI077ekMrmpzAJsyIHffaFVf8kILJi2PZMnc2BA2aQ8S9cKFgWcXXzqjx%2BZpb3W1o7pHY78fcs8yMd5kaorJFMNTpxM8GOqUBapMC4NsvjFaiH2ReWZW45FkeS%2FOl5KaeQt5k3jaX1U4NhRu%2Byd1BEHipJUuiDb1UufJ4B9STN%2B3p7L4f8LD%2BqSHh9%2BM1CDB7R12JE1hiJBbcCHAkKS1gZL28SlxYKeoKof9cHiv362uePQQs7%2FytQUg3fxoFxx9N9RB4etykwZ8hwaa%2BydlpEl1jRTmW1Ii2yzcaGDtXRhIbWdw4Oi%2F2xTQbzwDa&X-Amz-Signature=bb3cb1ef45cb15b75c0b8875347d43aec88b29d454a5a538ef23068ee07735e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKPJLJ2H%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T234110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB8aCXVzLXdlc3QtMiJHMEUCIB%2FpLCo5PRXtx7rEF2MvZza%2FnDEuWTCu5FjHZm5cRqjvAiEApMuD7dD0uS7fCMuDKDpfL%2BBY6xDDTu0iLC%2B7hxsXon8qiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAWOK4X%2FyWvwaCHbbSrcA0mE0CW3MnsnJsGwjOj%2BTkPuLscnWWYnDcITKTCrqEQ8PXwuxgnFZLuKZaiFA7Xs1DNjNuFKk2N57Y3HdLpVqAk88KjyMsYPNdtsSlzb%2FJJHz5LackUh6jYWVol5lsO7Ra25RH0%2Fyf%2FbCi%2FrAZhts%2Bk9HvSPIq3QNoXwnNcdVfptll1AEJ1umjKEnz7vlgoLUkotEjNXmHtbHtCWmLJhhXI6rRkjpWtQDDeS6jKr3%2FsIeQSxx%2FgEVvMy%2FrA%2FihIiVVvRV2XkyfqidsJ6xTBUb6VwgHOTw7iVohSvn%2BzKgyhxxyBduj102KTWoaNpO5tEeCYkdeI0rpp5A%2Bli5ds06kUBWr9Tn2KGBuvw4QTUw52yJsTsbkomvANEiA8KU0pkgPRgU1bawH7H8s9NuxmTCcBDo2qtpbteCYJGS%2BE44uRZk76QsbQT29GTgSVmmq0%2Fd5f0bEW9ks1VYfCJeZgpkS%2FJ%2B4881%2Br8%2BL0TDNmzWaexSW2oyvBRyBpmDqHvANFmAuXeWo6J3CWxTY2dNkA0legdyQ%2BVSwT3eJRPZjLfI077ekMrmpzAJsyIHffaFVf8kILJi2PZMnc2BA2aQ8S9cKFgWcXXzqjx%2BZpb3W1o7pHY78fcs8yMd5kaorJFMNTpxM8GOqUBapMC4NsvjFaiH2ReWZW45FkeS%2FOl5KaeQt5k3jaX1U4NhRu%2Byd1BEHipJUuiDb1UufJ4B9STN%2B3p7L4f8LD%2BqSHh9%2BM1CDB7R12JE1hiJBbcCHAkKS1gZL28SlxYKeoKof9cHiv362uePQQs7%2FytQUg3fxoFxx9N9RB4etykwZ8hwaa%2BydlpEl1jRTmW1Ii2yzcaGDtXRhIbWdw4Oi%2F2xTQbzwDa&X-Amz-Signature=b4b83d6759a4d3f4bc85c55d9f7faf032e8465ce5ae0ae060c113235923f1f9d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665RIFYN2N%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T234111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB8aCXVzLXdlc3QtMiJGMEQCIDnFOQOqrKgxXIgd%2FoQDgKE1U30bhXjbe4wvH5xIWCQwAiBeU3AtI%2FLBNgUIOKoYas%2B0Toqr9srrQOZ5cU0633pBwSqIBAjo%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMpt2OJlSX65jaC4YGKtwDEu%2B3alDBHBx%2BA1oq9TRBtO8gTIAZGbL%2FmToBvivJrzmE0lBHB%2Bv9TMcgfp5reqKx%2FljkVAiLJ7uqkirxe5AlbccSw%2FgoUOKd1UM9eveZlgaaLVmVQTJXObA7eta6hPydajW13m29NOPYkIlZloA2W2%2FRQ8GX8ndaCxUjG9dIQspABQuyilJE4VulS%2F7jNCz%2BG2%2F8CZygwphaJwtHbJtnq%2BmK5AzZ3gfBNPtliuBp1gwZRRmtYOhMPnudCp%2BOAcE9jySOcKCAigZpB44unUQ4RRI%2FmeQ2iAxy6zgPF4P36AsDehBIR46LXCRcfOB7XSIMSUKhYw7fDQy439Nj4nK6AbW2jqr8K4uyBJkjDOuaUJzpQdvD%2F8DfktkwR3TfzUeBMKs42fTSuKWb%2F%2BEcCsOcIcYwOh%2FBfpAL9b68yNyAay1Ok4PYWoF59iq%2FhGN1n6ZcI%2FShdU6flbY5Cx9%2FEiPm6iqsfNIrb%2B5QDMMLQ2JvhdvRvz5HBNnc46gbww%2BV7HZQzt%2BnOoWOF8QCW8b5lCYgVzz78CAzyvQ5IlQY34nBbscWIsD1l3KNNb%2B8sPC3l70CWtFQsC86hWscmrsBMSKROT5BAz0iMprbtdk%2BJkF779TT67mO928gR6BpU4gw0ujEzwY6pgG8%2BRXGj3Wih1ijsrfp5Nn76ctPuqYT%2FcJ%2BmXbae1So7DRPosOHoj3Xm0AoJz9w6fy5prmrb%2Beus4qC1VgJ1LmWLz7DduY5qh%2BjaRXXDpWjNNK1aLAUF5JA86QRsp1LiM9F1k%2FirX7ByRibO0ym%2FCv6vWv9vwXA14LNqv%2BffauFHLOmjZzQ6TMGomzMAomngbhR%2F3KZDkhM4r043G0Z8TKnJSPV%2Bcfg&X-Amz-Signature=0f5195f966b9fcf5fce5fcf31faf3f838ef94343f4910d0855f0d8d5dc54c515&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZLOUDPH5%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T234111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB8aCXVzLXdlc3QtMiJIMEYCIQCgd6%2BS6deRqGlGvlNS%2B%2B0fQKOMnIoaxS%2FGwvZZ82nXtgIhAOau6XG3j3hDroO%2BPJgU1tU8GHRtTuwQXNgXpXWjJw4OKogECOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw53%2BABRw8wAO4NOsYq3ANgzjAfU3FDmSfRxxsViKtWO3jy3O2qg1pgQDzYs4wn90DdEQ84IMDValzixEUK%2BeVnd%2FVtP5QPn58PhLLTIVdoZmwUVIjYAhvU76uEnzGm0C%2BMTjN%2FWI7E9bqDx1Y%2FyXCWie6cuowi5Bsdw%2BCOBvmTPoBAEuaUGrcKCXnUqd51EUdbYhliNQ5Z8n%2BzD9zAq6GP7gOZV6kVetJYWlaO3bQZ9vUUO%2BTxNCYMD7Ns5CAfBPbW%2FZOrfNYwaPwc0bSM31H0u0LTEyHo8xZphfj7ZOPUjjSy%2FcT3cFQZP3wnoli6Hz8hr0X%2Bpi45o9Cx3wERMzFe9uobGhhjlZTbkfFnvTmslUPFJ1ojzpYChBf3U7J76bsGW16fxDTjw2eZBeu5MNuvaMC2cGqRkIvOw07Gt8Vq%2FA3CWKvvGcCC3BEd%2FHxKoIAHWZmAB%2FyFWJttgxeugJBmHFQDgdSe0IcxHPs5VpWXdkr%2BtHtF6AU9tagN%2FLwbaBw9m3ExYLAgDNkRC4Wm50Qje0usP1Z9j0LHeUFb2c4yLo4PLMfgdRv9u7JFQDazYGWHwMpDoelkrnFuf%2FVY7Ej163j6nNVimn9THMp8Je9NFDgagVR1AfCyHG5rm4YPas3lUEh7IQJeY3UMwzDH6MTPBjqkAY4c3J1Wyj3DLDlwYK9zyNDkGITkeov2OL%2B8ONpvxHgHipAyDyvRoNF4WpeFbHxtB00Zn4CmlS12vNq8GhTBX6mEtVFsNQQg%2B%2FxQFDd8gggSxd5yEm1hK%2BGKZg3VEKe92ju1OcocYNMiITha%2FNfHr6NFSOZrNpAblxNHeD2G5nv%2Fee8SYGOz5LNVd6h%2Fz9HnRReY9BX8J%2FHAGABMNThl3wGWZzfA&X-Amz-Signature=88dd9f1cb1bcf6b0dfa416d0c5b08ae30e94e09f5e6edd50f3846c92af909f69&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4LPIZ6D%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T234111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB8aCXVzLXdlc3QtMiJGMEQCICG7fv2LIl1%2FGoy6wJ8Q61P2ZJaXPqaFlpgNsgKaZXuVAiA10LQju3woN%2FNAdVCI5upmUHC4vjbBW%2Fb0iZBfLUIppSqIBAjo%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMZ07NXbwHkL4J%2FtCNKtwDRr8GG%2FQupfaR77kxMyUZBr5kuy2p2ydNgCVeEmJpD2kMuY0dBxrEFwXlD97wF34Ihxng7vVGCCWWZ1UImPAJvGkGLKkEmYr8F71dnCq1yw7%2B9CBgfsSpG1duwSphw2XS06IRtDs1O2IZlx4MskOr5shytA0axSc3hsyc7%2FLlv38zsRgvE6ua2Soiz%2Bw8iMDmLApirHGtiEHP8CS3SDDbRnW25NbOGRX%2Fe9V2SyAQ9yM2JNkSNExNH8YcNCpjnU09ZJOGMT0aVZmKFxm0T8pzlvgMqpWYevVG%2Fp3Row1egF6pdE0GoUVvGlzOt0s1DBaTbi8bj1UJE6OX2DTbAVn7ERo6WAHMtoqyPAyRZE4o0H7m1UAjH7UA%2Bssmas2fUJcjsZs0apZbpYlH9LJifr1oPmn6Oa0HYcvhi3kfaUEiwJCHSDbnFS1%2FHq82sk671M9my6NnVpRhXpN7aC2%2FQ%2FBVtdxmQ%2Bayy9sc%2FEoi2eamDG9Fpm2bWVzdDjHYBnzzRSPkHfpoorsWD7s%2FRcUCO9D2swvUUhGi5tD%2Fk5b6MIY8nic7zSFR0aZNEwe3wa4YDCougwdsFtZuIYTuH4i6DKhcUYX3eWiClvk%2FJd1Y%2BBdzP5rvO%2FSv9Zyd752zM90w2P3EzwY6pgEmZE0eSDXvACUMfDa%2FUcu%2BsChtA80nWrqMmPHpivyeAB1r9TDZ8MJ%2B7WlHE%2FCscNFWsYOHGaJVWjh1r2GP9tlvU63nBlJYRUrrMUmgkXUYAvw1Rjr%2FwMm%2BBhok4PIJP30OBS3PLUQypJQ%2F66cuSZqwmjruesZYbIpPuz%2F49cS6ZM7lYfGxB%2FQXP%2BfNSw0qb4mAJ1ChS2vJqQvx%2BI91RZOXeojWVykn&X-Amz-Signature=9a64fb1e8d75fc07f3e5ff0ef9bbe4fbbfbe2720700582f96e75064e6d3f3571&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667MEEMF6T%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T234112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB8aCXVzLXdlc3QtMiJHMEUCIFJaCzePayT9HgECODfpkq4X2ONtcbNfXKYJTb7wFWF7AiEA82Kznd9FuV7Keg3GwNAofpOhNmZSYuaQgipVFyD7CCYqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPoOZ3SUcoY1YtJMcircA%2F9eZINI6rHkRc79DsvciVSxf4G4FIhNLZ81T1zM6ai%2F7c2OHfumz5RHPL27NQLXOXLJr0Z28RRdIUSuiSSdFv%2F5lpxWNkz9AZ0g%2BNqUvhIwFT7rf5BMWRAY29nrYw6%2FZrxU9f1NL%2BKxNPlY74VtFAU2%2B0oN9ChFa0XGVM93TCLn0HlXjbkebweXix%2BJ%2BJuro7eZ7RQ1vGSaFb6g6EMnXohJRvtnMPHU2utY03VBSiPWSsChiqcq0l4WaG3BI%2FzKjJAaWhJV2V%2FxX%2BPbOU%2B1udKAfbRLbTpOJY8pxD3Ydsb9Jv%2BeVAyrZwMCOLZORrToaBc2egoh65PpCTZbe3RsMqd6V1X7%2FtIUdbKCfO2Aevx6PiI8cl0d3B5ayQnETXFldqQDrDimFPXYZJJp5EoqBQKxUsnkaTkiHNPigbEW3psuQtYFhTe%2B4ydFZsFc%2BxURY%2FxoZBzZZ66h6YtrYtChJOzpNthc1cmkycklaX1n%2FrpAwl%2BBS9tAfibgGaTXkiPfI8gY3SEeR%2B0Ql2g450hM4slJy0L7D7h%2Bdj2XzlONGPJWQEuTVxDkUhZ42QKFNDvCqcCULPoGcj5ZzjIlUSCQpQYUY5PK37oBi1STMTZ%2F%2BBz6jZubKJmQ6XwGrzIDMMrqxM8GOqUBYh5uANysAWuX6YF2eSurFuehyMIa%2BO2NrWF7nMp9nv5FrLnOkp7Sb0c2CkzHLtyAnrJ52BlmoCAfkxKdOf1Ry7IwzpdXt0xz2m3bitXkgay%2Fo47uRwsbAPmrBbD4tUvbkaBgr6joj8RD1XGu4VRt9loidzxOOO1nhoy%2F3rwyiBeAZnboSn85huaC%2BP10A9REqvSmHSRO5KyyVj32DiTavL7ZYRo0&X-Amz-Signature=674cee078090c9d08d47b865e005c4e7c1761b067c5de0489f9fa8682a0d1381&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667MEEMF6T%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T234112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB8aCXVzLXdlc3QtMiJHMEUCIFJaCzePayT9HgECODfpkq4X2ONtcbNfXKYJTb7wFWF7AiEA82Kznd9FuV7Keg3GwNAofpOhNmZSYuaQgipVFyD7CCYqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPoOZ3SUcoY1YtJMcircA%2F9eZINI6rHkRc79DsvciVSxf4G4FIhNLZ81T1zM6ai%2F7c2OHfumz5RHPL27NQLXOXLJr0Z28RRdIUSuiSSdFv%2F5lpxWNkz9AZ0g%2BNqUvhIwFT7rf5BMWRAY29nrYw6%2FZrxU9f1NL%2BKxNPlY74VtFAU2%2B0oN9ChFa0XGVM93TCLn0HlXjbkebweXix%2BJ%2BJuro7eZ7RQ1vGSaFb6g6EMnXohJRvtnMPHU2utY03VBSiPWSsChiqcq0l4WaG3BI%2FzKjJAaWhJV2V%2FxX%2BPbOU%2B1udKAfbRLbTpOJY8pxD3Ydsb9Jv%2BeVAyrZwMCOLZORrToaBc2egoh65PpCTZbe3RsMqd6V1X7%2FtIUdbKCfO2Aevx6PiI8cl0d3B5ayQnETXFldqQDrDimFPXYZJJp5EoqBQKxUsnkaTkiHNPigbEW3psuQtYFhTe%2B4ydFZsFc%2BxURY%2FxoZBzZZ66h6YtrYtChJOzpNthc1cmkycklaX1n%2FrpAwl%2BBS9tAfibgGaTXkiPfI8gY3SEeR%2B0Ql2g450hM4slJy0L7D7h%2Bdj2XzlONGPJWQEuTVxDkUhZ42QKFNDvCqcCULPoGcj5ZzjIlUSCQpQYUY5PK37oBi1STMTZ%2F%2BBz6jZubKJmQ6XwGrzIDMMrqxM8GOqUBYh5uANysAWuX6YF2eSurFuehyMIa%2BO2NrWF7nMp9nv5FrLnOkp7Sb0c2CkzHLtyAnrJ52BlmoCAfkxKdOf1Ry7IwzpdXt0xz2m3bitXkgay%2Fo47uRwsbAPmrBbD4tUvbkaBgr6joj8RD1XGu4VRt9loidzxOOO1nhoy%2F3rwyiBeAZnboSn85huaC%2BP10A9REqvSmHSRO5KyyVj32DiTavL7ZYRo0&X-Amz-Signature=2ec36afd98b29f04f7516cdbd90f646aa7a2d7732ac0da16f3a316d071b99b6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTYZ6GUW%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T234107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB8aCXVzLXdlc3QtMiJGMEQCICzNOBeItywb69ENOSoQDSG2uck%2BGFN%2B03HFSbmtszQhAiAz6rI85ma%2BfiQshfhNV6D80tZvmqNe24SX4GC9Ze7uOCqIBAjn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMU12cQbQ5jrradkNMKtwDoegvuFVUWqu8wEGKPMMsOgKOa0IAzKjxuJopra6uuXu%2FEmC77lmeR1%2FLLdrwnhC897sUeEm5dhT3%2F9NFVQ3r5X3IZZdQ6mG3W%2FrgJTIXi7ojHG2bIYceGg%2Bu%2F%2Bl%2F5Q9RGHwIQpcxT1ElTb6Y0bqve8aDKeuaOWanTbWO51Xlqw49R8fhf6g8DzqQgaDYMd7qt%2FmwZXyz%2FiOB%2Fg%2FZwvoC34fl%2F1JpRhd8udtCQZ6Fx3i8M5Lk1QGNjn6rCL50FEGtoS8%2FaHz2nZOJvBBvKPBkjefUBIgqS1BEzQqXUr%2Fbvig5m2nlrEKORjBxAjfpVfBMEBWMZs5Aaw6jLT15U%2FRY9RX8iMS92pIspEsuz9mpbnRQuZK9ewKxVdvO%2B3LwoAaJQjqmy2k%2FA411azdIeh6AyE78BjkbQYgTst92yHKmeqXOQQLY0iLiF86gyK3tezAwEFrLHX7amlSLLy5Js%2F5uIEoqlc3pLhf8g2GWNQFk8rwbb0WUhyO1ajfKbNjxK2I9jh%2Fa9TjZAJ33jqitPZD8v%2FNaTDsNlYs3c3kcwNTOeDN2R4JuPZJbvfiF8oGQZC9rLwGI9RmKogOC3J6qJznAXkBLjYxJ%2B8mF1DT5M7JDOQVqEQIUCZ%2BgsoxCMnYwrOjEzwY6pgGGye5VeSVLOzdQU91RcnGZ%2F8n%2BnqoE15b%2FthfpF292ZAlgS1qFUqOS94XyOks152IHCTgEBGatB0qOxmqYDLjt3Ql1UrMwyiaxiUNrhgB0xoEqy6FNRmbi%2FjkTgHaoIXSdoMox3qjN59ORAGqkGoXrHC6B3pQEO9TG8wclODp5hA8A781qDJNMjkLGOVDU7Ye%2BrS%2FrDVRA0wAr4RcagIO5Q%2Bqdd54J&X-Amz-Signature=f44471fb6729348e709eacddb6aab9ae71e612f17f07b8728e8cf9df271b384f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666Y6Y5NN6%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T234114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB8aCXVzLXdlc3QtMiJHMEUCIB3GCVObHNnZxb047W4O0gDz3kq7g9GyT7XDi15y03aDAiEAuWoqdOtxeyz9bqTMsfIrC4B0k9%2Bb32%2B%2FpM%2FlVsOUaw0qiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIsQixbT37ORF3WZ9ircA9GTGiwSZQYbNucNv9IjzlmwVwxmx0ra%2FkEpAuYntuaAKIx8EmswZVDzSM7Lwngdoz0mlTJqDIQ2HIIf9famHUEit94aWEPwp7OamrbAQuwLFcXtwiy0Eh3rgx5va791%2BUe0hRM1d%2BzJWAKuxBgKy5lgoi8NNeZGrFGjh9e8qYvM%2BvLvVu00MoPXVEAj7PZgQE2ZsamRwpVpgla3zvx%2BxSSkmQsx9KjruYEfdnud9ddwKY3mPVaeDmh71duhWhEc5v3TIl2bX7NtkkuptXZ%2B%2FKA6P0xK45ize8v8H%2BpQEGW6J4ohacVhsctFpfrwikO%2Fm83QuTfA0VmlY%2BSX1ghGBAZY2awyoU6W%2FbYJveb6Yd662%2BVI7Xcur%2BE81RANO1HzKf8TzfkU%2BBJTC9TgvgkmllTlux8Lub7y23J6zbTY%2FyIvf%2FC2IQTsNcM8RWpNoduO3zXj8RND%2FKaNQ1E%2FTD7gWg1u9S6Kbb5LZmN17WvpxHlJhTQDFXUAsR4%2FNW47KVwKGlGBE6BljCxmo9p620Y7xBO5eOrjPARv9ikIXAS1OyeF%2FE9R%2F9SPIjArJr65Q2XrY2dmfek0p4byEgBCrvmsoOtZy%2Bflhc943pl3nFdwB%2F5u7v4n8IKPLf6aWCFtMIfoxM8GOqUBUBEL4I6PwVYFRYP7%2BSeGmhWmGmU3RSuRKjV41lhl0MzSFBhRFpfurf9QwI2MRJZJwMGy62uZrQiL4NaBJWpwHwMAI2CVaT6M0XGrTTWSflUAu%2FoFDlXrVUALZcMBwf1HhiSb%2BkEYRfsapAe0RfPBh3gAvAqQXXOIL6HbuLFKUj4ZU6D21tQCIspo1zmKZpJzKFki%2Bi5hFacXBoyO6UOWpvrOgiRX&X-Amz-Signature=3f09976be6f72eaa7bcf743ceb859897089354aaff62cb5886d1e5d5fc9f5b16&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666Y6Y5NN6%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T234114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB8aCXVzLXdlc3QtMiJHMEUCIB3GCVObHNnZxb047W4O0gDz3kq7g9GyT7XDi15y03aDAiEAuWoqdOtxeyz9bqTMsfIrC4B0k9%2Bb32%2B%2FpM%2FlVsOUaw0qiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIsQixbT37ORF3WZ9ircA9GTGiwSZQYbNucNv9IjzlmwVwxmx0ra%2FkEpAuYntuaAKIx8EmswZVDzSM7Lwngdoz0mlTJqDIQ2HIIf9famHUEit94aWEPwp7OamrbAQuwLFcXtwiy0Eh3rgx5va791%2BUe0hRM1d%2BzJWAKuxBgKy5lgoi8NNeZGrFGjh9e8qYvM%2BvLvVu00MoPXVEAj7PZgQE2ZsamRwpVpgla3zvx%2BxSSkmQsx9KjruYEfdnud9ddwKY3mPVaeDmh71duhWhEc5v3TIl2bX7NtkkuptXZ%2B%2FKA6P0xK45ize8v8H%2BpQEGW6J4ohacVhsctFpfrwikO%2Fm83QuTfA0VmlY%2BSX1ghGBAZY2awyoU6W%2FbYJveb6Yd662%2BVI7Xcur%2BE81RANO1HzKf8TzfkU%2BBJTC9TgvgkmllTlux8Lub7y23J6zbTY%2FyIvf%2FC2IQTsNcM8RWpNoduO3zXj8RND%2FKaNQ1E%2FTD7gWg1u9S6Kbb5LZmN17WvpxHlJhTQDFXUAsR4%2FNW47KVwKGlGBE6BljCxmo9p620Y7xBO5eOrjPARv9ikIXAS1OyeF%2FE9R%2F9SPIjArJr65Q2XrY2dmfek0p4byEgBCrvmsoOtZy%2Bflhc943pl3nFdwB%2F5u7v4n8IKPLf6aWCFtMIfoxM8GOqUBUBEL4I6PwVYFRYP7%2BSeGmhWmGmU3RSuRKjV41lhl0MzSFBhRFpfurf9QwI2MRJZJwMGy62uZrQiL4NaBJWpwHwMAI2CVaT6M0XGrTTWSflUAu%2FoFDlXrVUALZcMBwf1HhiSb%2BkEYRfsapAe0RfPBh3gAvAqQXXOIL6HbuLFKUj4ZU6D21tQCIspo1zmKZpJzKFki%2Bi5hFacXBoyO6UOWpvrOgiRX&X-Amz-Signature=3f09976be6f72eaa7bcf743ceb859897089354aaff62cb5886d1e5d5fc9f5b16&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UQJMKDS2%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T234114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIQCr%2BySiXENJhM5qMJdd0clOaU1qv27s6XLN4mAJGttZ3gIgd2UyLF%2FuqiUfYq%2FzI7y%2FhEquGc84gVTeNi3l%2Bv3nXlMqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAQbGT0mwWofu0Em4ircA4SE0IO8cRS9pLuRiQ38OYyJsyaGwlNKrPiNDrCQAPzCRNNemBuM2pkzhc%2BNES%2FBE2uSLvPcHAckryUBm5i%2B6jpfmTMesbErq%2FSVvxVYLVT6aa9dfqixBAPEBwoF6AHMsvO6axsu%2FCS76y00e9L%2BsT0OQ%2Fu%2BCHMR6nixvTqKrqlQw7Xo0%2Bzy0M1E1v6qaC%2BF23eqhUYtdWwAhFWJgbYtkDWrI%2B0%2BncjhS5N06409sSD6SEhWtQbPUNcSK3p2W8GjZ5ICe5loSTbOdxIWd6KDgpD78ugVTi2E0pCLu5HxV%2BPnfJYBZCtNkh06ejBYb2%2BjVQKeAPc1Cga9tl%2FsQBGOjl53xa6JlG%2BBJy86kOMDcwXfo%2F1NNu%2FOiwvwWClIUSHYG86weINuuGsQQNsJ0ltL7IJcyfaAU7V70usu%2F4k%2BbPH6IHmU94WdJlD%2FmuBvrfFOF56obef31oJMMhGDLzMHbgG%2F3%2FyzKhJviksZPQVicn95iDZTqlR5dkLplzMQd%2FO7LCa9IilqqhH0YAO72kPa6qTqBHDC52uIrmTKJIN0TCk9%2FF9%2BtVqof%2B9hgjWCequPDBLHtv88qD2NRNTC0kuQ7DXHHS5iQmsTuSHLEF2v%2FnfUBibfyuea58suVvZEMLuCxc8GOqUBlPO%2BDwnp0Rrh0rmR7DpJs9HZ9hjA6cULQ0YoU6M7OW18jDukoU8XIkRZZAduvzyJgaweqR7dJ8C5pxjjoOxd1N5MY9uOt77uneZRvNGTRWjidmdq0dHPooX%2Bw7DcZJkAFCLyfNmM8fL3J57FvHsOnXdKMxwXZsFxeaOgLsrIH3xh76KZvbHuwKQO0Be4wp9rzdesuCXSpKpA3eOFpOHN0yKzTQPr&X-Amz-Signature=e84583a4755a524c742275beb6873d2f002ee7adbe057fcd09b5002ba60630db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

