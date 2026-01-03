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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYTINICJ%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T090107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQCl4Xpw1ZVz3fogObkkB9D%2BvPJoZuqtG815gDWXUJs0DwIhAOHngPZXbItFvI7PTsw1oSoOLleia%2BfOBHNxKoiCPkQAKv8DCA0QABoMNjM3NDIzMTgzODA1Igz3pYYXhCBs%2BBRcrFEq3AOxI1Gvii0N7NzYbSV2notf0xEsoegHoKFfetBB8PL%2Bky4V%2FAccCqL83P9tTs7qbjGbkfKNyBpfUQsvPuk3cVfmlD2J4qMZNKq4KgkJCrp9i2GzZUTmFQrJ36CpoxQxjzVhmadmvhXpxyajMoMPvKgSIpYZD9rELacu3jHp4Kd%2FMiJCN8wghEXzgcKzwMl1YZxfXMqTODveEg8BzHGUYXG6%2FqKzpNtM8ocDCZa9Qn69uWVNU5c1hNXdsesmncbCFX98u%2F0eSS3V1f3Jx5ayuSeXKGhoZhKkdZArjkf6Clt20ZGase8wCdpEeOqzIIWA80Utd4u%2BX3NjPwFZPmaYQZXZQL6HYNftmgJrW7hvldKTP1aA%2BCs07lGLRhSFH5KjMHW4vEXVFG6sLMx%2FcUuuhR3m8nLJ0ViOU4Cee7pKPFwPgEq37fIgbYGGcQ11QYWvAfaHmOngohBe%2B6rFDISbRM9j22tEDO%2B4wLuulnGwrgMc4OIQ%2FMl7fFsP03%2FrmuRU2UQ2lB4NdaioY24To%2BrNiaSdic7YYjBTgGmX4932Ientatoj%2B0ebfYKsoT7nFGLscoS%2FFqiSIzmo47SiSuwQwK%2BO%2FE4aHnkMitGsvaxepOSSiibqYzGNbut4gROkYjCjqOLKBjqkAT7fMsuYN6cdBD0sMiBSneeXTysxNKrQ06%2B%2Bmps6hs3n7jJuCQCBcYp%2FqlrQYOc%2BjdamLsvCQZWHmwvqM5CFvBDnCnZWTOtWL3UUmv86L7xkVQwZFwCHJ0lXiJJi488zWBsSZiRf0pcZFgxR9Tbj2HhLpv5oCS1PL81jIcGNWaHLRLnn%2F8dIzfrHNpzp1CtGNzQiPoIUI9TBjXrzSyczPCLRkhke&X-Amz-Signature=5186977b9598a65a830f850419a83feaa8e7d24fd98c4c290b53ef42f23f219f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYTINICJ%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T090107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQCl4Xpw1ZVz3fogObkkB9D%2BvPJoZuqtG815gDWXUJs0DwIhAOHngPZXbItFvI7PTsw1oSoOLleia%2BfOBHNxKoiCPkQAKv8DCA0QABoMNjM3NDIzMTgzODA1Igz3pYYXhCBs%2BBRcrFEq3AOxI1Gvii0N7NzYbSV2notf0xEsoegHoKFfetBB8PL%2Bky4V%2FAccCqL83P9tTs7qbjGbkfKNyBpfUQsvPuk3cVfmlD2J4qMZNKq4KgkJCrp9i2GzZUTmFQrJ36CpoxQxjzVhmadmvhXpxyajMoMPvKgSIpYZD9rELacu3jHp4Kd%2FMiJCN8wghEXzgcKzwMl1YZxfXMqTODveEg8BzHGUYXG6%2FqKzpNtM8ocDCZa9Qn69uWVNU5c1hNXdsesmncbCFX98u%2F0eSS3V1f3Jx5ayuSeXKGhoZhKkdZArjkf6Clt20ZGase8wCdpEeOqzIIWA80Utd4u%2BX3NjPwFZPmaYQZXZQL6HYNftmgJrW7hvldKTP1aA%2BCs07lGLRhSFH5KjMHW4vEXVFG6sLMx%2FcUuuhR3m8nLJ0ViOU4Cee7pKPFwPgEq37fIgbYGGcQ11QYWvAfaHmOngohBe%2B6rFDISbRM9j22tEDO%2B4wLuulnGwrgMc4OIQ%2FMl7fFsP03%2FrmuRU2UQ2lB4NdaioY24To%2BrNiaSdic7YYjBTgGmX4932Ientatoj%2B0ebfYKsoT7nFGLscoS%2FFqiSIzmo47SiSuwQwK%2BO%2FE4aHnkMitGsvaxepOSSiibqYzGNbut4gROkYjCjqOLKBjqkAT7fMsuYN6cdBD0sMiBSneeXTysxNKrQ06%2B%2Bmps6hs3n7jJuCQCBcYp%2FqlrQYOc%2BjdamLsvCQZWHmwvqM5CFvBDnCnZWTOtWL3UUmv86L7xkVQwZFwCHJ0lXiJJi488zWBsSZiRf0pcZFgxR9Tbj2HhLpv5oCS1PL81jIcGNWaHLRLnn%2F8dIzfrHNpzp1CtGNzQiPoIUI9TBjXrzSyczPCLRkhke&X-Amz-Signature=5186977b9598a65a830f850419a83feaa8e7d24fd98c4c290b53ef42f23f219f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662J5LMO2Y%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T090108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCIAUjzad%2B70o5szW1AJoMsCxWLGYQOv9r1SNhvCjlztAyAiBsjINr%2FuAFSV2jGrYvT68f5kcluMkkBMO9nOobNijjzyr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMIn%2FPUIiXIyxOuXx5KtwDEkyKHxfzPfU2KETgx9k8U4PHsHn%2FVKOpJz%2BCfEcdLUo0h4pLvUfk7eUpwCNpKrY0oLP%2BZIfMS91PMQAtAShKQ0ZofbAXjiXClgtzuc%2FdZnkrE5AC7xJenlpAOIRXw3f5z%2FcpCblg7wDaVqDhj02%2B38TByC45WBzcLn%2F1UWOVqjwcYmqA9VipRupbXaaZfX4v%2FetgyM0JatvfTeLhHfTNM%2FUSUS0UNl%2BGrUjP3Zi4jsSWFohbO9ttXffuqoVbIHw40ZFtYuMrvJFTY7fYTp%2FPGkcakeZnOZsH5Ue6V47vq80QzOxnmN9V56nnBioqwZAwpUFmpgd%2FFJRl5dfgPpbKT6W9F9nVwbih3E5xNexlieiJNr4WRYdxsW8tkcQIQ%2Fenk%2BJFx%2B8CL9ax%2F511oAbD3ToDRzWCo%2BBTMYJxJT7ZQTNKOcBF3IxOlQV%2FATfnWJvFB3ysbE2efyokcmATi3TDTiiu2sG9B9f90IkWbnfet5MXQ24bP%2FaPdKrLCA9YWVtrcdc1VxZOBWZmnC9B2OA8MOCUGkTSqe3ixjZffOt7xY7OUyyD3R%2BfNK%2FveXanc32yWUxOSn3ywRXHWC4%2FNIrNlcoLVPgnbEeG1P6EaLVThXorPc%2Bm8IStwtN7dPkw66jiygY6pgFeCnPlzGeBVfybtvJYIil4t83Cid7XuDMy4xVxycxrIvTDkleV2WIsI0toDFeCs6IoVwu9xf6PoLoKO0uHZ%2BdN2xJTdPQ53v4jRYxL%2FkyIFH2sGjQYH1ApzwQH484i5eABSdYzusLXK96xRun0UMYYh3GcMF6sXebGE6SoGB4z8EmaEVU9wC6qgNXrx5m2Hkq6hnm60eb8h%2BGddfuKLnlRx1xOcKkN&X-Amz-Signature=2dcd56b8822662040bf4e6d5fe172bd62259eb1a6759bd35ae1dbcf0b4913786&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QTRUEY75%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T090113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQDe%2F%2BPzsScc0ViDdUwOKJkuQ%2Bqgtlvmhv%2F1GU4%2B40WEdAIhANhj90becs7kMNOLHk7TE%2FYX5KGP5d7Nk6j7caOd2sshKv8DCA0QABoMNjM3NDIzMTgzODA1IgxQ7IHRyHm8RZJ87cUq3AN5heB3pC0X2aPmEzVrs6EyC7X5PlBxhsKn%2FPDuV%2FV0SCjficq8zZvgrFt9VkJQYTKmzq8dVGcqUf2YLI1ZGy1UJ92UEdkJCE3%2F6C%2BvA%2F2AxvobtoG3du5CH5igVRspTpwQpxQtvRKs%2BQT%2BuTB%2FGilByrhH2mMh3IyqVHURu2aCHqoCXO63eSLXw1a360k5Honi58FwZB9cEQu6%2FozMphYP2%2B64YvXn9fo%2BCFJmJ8OIEDahNx25zPhhQY9PmnNJKOipvzkL47paLE2H3wykMDs7GAVM3im98dRk8idNDneWTfGirIw6G8yuTY9nk5UrbY%2FoxDwDPYs5UJrH9pUq12xjO8Dp8afLUE27%2FsvAIXvc%2FJY4yEqnMRrU2r9MCgbeYsz21gZjyxmmE10fHAKZ%2F%2Bt1ykAwMpqKhPlpXpB7ZP0UWEP7NkL00tLf91d5Ec9LR189fPCvBCEEnvNzDVsgslscveSdeOjovk3ALOYBxEPmIFRHYssZYtoZh9UX1lXpDkLM%2FjSAgm%2BoVx%2B605Mm5flOpgSQ%2Fubx2gl8YZF64a7FuHufxuYv4IYncuVApRZnJJNfiySvJ%2FDfzkXXQj50aK9dF%2Fskf%2Fs%2BEIje4f3NzMK1b0Xf6cvzxlNwSb0yxjDcp%2BLKBjqkATMX6D%2Fm7JmsOenx1RT22jOKHQsHWhDX%2FE3CCiUfFmUneTcGaJ7XuoDc3AmLmebCpn1L5LVTRjbLtT1XsHjhbG47sJAfeGd64whTEp%2FWKbl3ccOpKjdFxtX8uk6SkZOJh9p15cXxxZ%2FG2O9jbpZQwkkyU7o7Wx9DoCK5%2FmN2faM2DMgJYC4S2Rpf%2B4dljEVoRbVzrVwIXv6A2KEUWspdO%2FGP3Agk&X-Amz-Signature=3c7bd5a37dea21b2c74c8029639d894a969f7f4beb4b140ce59e7db8bd4e633a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QTRUEY75%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T090113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQDe%2F%2BPzsScc0ViDdUwOKJkuQ%2Bqgtlvmhv%2F1GU4%2B40WEdAIhANhj90becs7kMNOLHk7TE%2FYX5KGP5d7Nk6j7caOd2sshKv8DCA0QABoMNjM3NDIzMTgzODA1IgxQ7IHRyHm8RZJ87cUq3AN5heB3pC0X2aPmEzVrs6EyC7X5PlBxhsKn%2FPDuV%2FV0SCjficq8zZvgrFt9VkJQYTKmzq8dVGcqUf2YLI1ZGy1UJ92UEdkJCE3%2F6C%2BvA%2F2AxvobtoG3du5CH5igVRspTpwQpxQtvRKs%2BQT%2BuTB%2FGilByrhH2mMh3IyqVHURu2aCHqoCXO63eSLXw1a360k5Honi58FwZB9cEQu6%2FozMphYP2%2B64YvXn9fo%2BCFJmJ8OIEDahNx25zPhhQY9PmnNJKOipvzkL47paLE2H3wykMDs7GAVM3im98dRk8idNDneWTfGirIw6G8yuTY9nk5UrbY%2FoxDwDPYs5UJrH9pUq12xjO8Dp8afLUE27%2FsvAIXvc%2FJY4yEqnMRrU2r9MCgbeYsz21gZjyxmmE10fHAKZ%2F%2Bt1ykAwMpqKhPlpXpB7ZP0UWEP7NkL00tLf91d5Ec9LR189fPCvBCEEnvNzDVsgslscveSdeOjovk3ALOYBxEPmIFRHYssZYtoZh9UX1lXpDkLM%2FjSAgm%2BoVx%2B605Mm5flOpgSQ%2Fubx2gl8YZF64a7FuHufxuYv4IYncuVApRZnJJNfiySvJ%2FDfzkXXQj50aK9dF%2Fskf%2Fs%2BEIje4f3NzMK1b0Xf6cvzxlNwSb0yxjDcp%2BLKBjqkATMX6D%2Fm7JmsOenx1RT22jOKHQsHWhDX%2FE3CCiUfFmUneTcGaJ7XuoDc3AmLmebCpn1L5LVTRjbLtT1XsHjhbG47sJAfeGd64whTEp%2FWKbl3ccOpKjdFxtX8uk6SkZOJh9p15cXxxZ%2FG2O9jbpZQwkkyU7o7Wx9DoCK5%2FmN2faM2DMgJYC4S2Rpf%2B4dljEVoRbVzrVwIXv6A2KEUWspdO%2FGP3Agk&X-Amz-Signature=33174f492eedc8c1781ab071382fe992919fb93d7af8195d7954e763854716ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466344MKLKJ%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T090114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCID3hCziq5b1nIQHVgFkPmqAuIkeTq%2F%2F5FAIGPnlGA3c7AiEAk5lQtrLjnhyBuamhzRSbnEAPNGhBdeeCBphIlHq3fowq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDPz22nbHvfOrWcbhsyrcA%2FPNcTGW12AN%2FHxdqMwAFFM7%2Bt%2FigS%2B9HD5I1YlJyPh71Y3M0j7wyajuWO8e3rbVkMAwz5hEsuPtXqDPFUFZdWM1ugY0uEX1I7t6IMjT2eKhckYMw0qAXt9vXiPcGWTVayddmLDcMcf0UrbCCQUQiuAcL2BUGjuZeFoXZuJFGsyEiYTRkUA3XmIoNoKiPS75NrDu97G0Fn2wAm6OAgI3LXX3oRUAfCBthr8wLXJuBZZ8gCGjIAw1PGFu7LnVcN9oHWb4IX4IZs9kCAYgJe278nI1wuL%2BBg0NHemHbgCuqyzwBI%2FUrji%2B9izgRT6xPk%2F%2Bnnf7ucYYRwZT0Nd5d%2FbU%2BBvF%2BFuA16uwK1ZhPYLKvSLj8eImMms2SKV5hNJOc7FN7D4AugEUkby5WHdUumMLetIzkeJI8xVsNM8IOEE%2Bo9CKPF5JQv6vPcJABAKn9y0WNcboL%2FwQpzO9fQOudJbLyrVX8PyWgNDPSILO7xUBBy%2BY2l85X8xKryFjMgevDA98%2BhnnwGd0IL1rkRALsxKrUUxRbzI7gZvvHib45tVRj%2BAtzWlDMnkp%2BYnxy7N4IrOlwdrSzjakoS6%2BsFDqrlBWjtrGyoPTZIF%2FRVO0Xe5u3Hwd2IWMKqpO6BfFbeFCMIuo4soGOqUB6UnyMCsBECn4DT4q%2B17F28xni0JolIJb7hetg4hlCyOxvuYJ87dm8sgVfMAdZr54Fsy5rZ02%2Buv6EWmhx7lgiYPZVXhHkSj376%2FcwoMn64tdCPIB1RKP%2B%2BCQ9PIC3KEgK48D3pPZmN8zCiwkm2iKfk7UPH9fdznzifPMh8INJZnPg48JsGsQvdez4XAQksLgJJ%2FUfFjPVViiBZpRq4WctxfNsbO7&X-Amz-Signature=6604939cc327ce2c17e29f31eb6e9853f792760a3ea61bdfa10c5a12b8622be8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MTBFVEZ%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T090115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCIEy48fNPgTU%2FNXSzL7cGCfNE5prK3hdOza9BwcdH45HgAiAkoGXPm%2BSfu%2Bdegw4mSzLCTnlvtpMFRsyr7IZHP6taoir%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMpqks94voIqESPtfaKtwDPH7pJfJRlaF6EJuXX8Q6eregwXowVAYWoSeo4RhwUYfsBGQff00Zja5mPELeepLv4gbrL%2BSuNuHZHBl%2FCrfFlzqpHSCdBiy2DmySJvJuM5WjUG85dPjzzFe%2BOtECaJDKLgpX%2FL7sbQKJ20dqig9c8QX02W5XvznHQC4462bQ0qs7tB32c8pzwjtrAftdOe%2FOUMwZlv5X7iIPZYrqibWN0mRClazdQrrAvUlXNDS4HUmmoeSNeBOUp2evary3mdcVJsbt3u8FHILYaZFp4tPPmBoe5ZFqGeas8R3WpD5aRk4tjJ5v7KdfhtcR%2B5b4TfGztgajKkhrK44w245sImWd%2F52pkclXeBygq4mmDagzcMVOncx9pSQHGmxeWy%2B9miwD0N%2BDSgqINc5T7toTh3tvR1D63r1z5ifZK%2BKbn4GW%2BsjGxIOTavrXD8go8DVA8VsBZHsfZOjVDLofJPNbXbdmjzQGBKV1URbPvx%2BwSrB5eF9btZvLxh479jg0niC0qqyXsUkZ3MVm7JbSkhbxt0zK4bqPMklR4mV8a6Xgk%2Fwp%2Bhw80ImNADxx7QgGKzCClWUvt0veMVprGGWEMXvE1ifH80xT6CDvAfk6UpZfpDcfcoH6nXsN7Bz4f5eXaBMwn6jiygY6pgG%2FY%2B2O0DLqXv9byoW%2Fl5O7FbhaEkNzxuMchno8IWFEOBGb8unW8aYtN45YI5s%2Bp8pWeUI98ivehoygNZG4tG5%2BhgYJMmEhx9jOUbOTRk70ymaQAzgNOl1DHXOPNjG8ZueNNq6bpqtLOULOJdzo%2BgBsL5wIURULU956Wdt5JxhhjtAyTNs9lHA8X%2BEJBG5y8bFRggtq52%2FlvihduGAALXxoosnhonUv&X-Amz-Signature=5ec7e072604dee37a8e578365ef820b2f032ec1a063ba9f3108fd532842ce719&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WDMIB46P%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T090118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCIDrJEZaK39ZaPJLwkh0nWHA%2FQb06op2c%2BabaUWq79DNvAiBNmdqCmAgZNN4ZnmWNSklVdyd8TZY6qPyyznNU%2F4kFfCr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMh8SwQo34TdqJ4JQRKtwD3RBsiksyBrWotgDCWP7UbrexSkpcaSUeYuxtU8%2FO87V4ty8wdnEwf%2BCtx1FQ%2FvqV0D40D72yY%2FpmNiytcj7D%2FJKEAfX5w%2FGSfqs8DbxYeOrbrIivUV1SM8vqgOnrYSFSWDDtTs6SdNMv1devqrnMFACWPHrobj84nv5uDb%2Fz8%2FXKOHYQ%2FyFcOlYG8dn0%2FZ%2B82vb%2BGIAPzTsE8zONBOskxPxp3AN8MFvGVzVuMsZb4Geq5bvDRm86pRZKcJPx86UGpCBIxtdkEBI74Soyi%2BdvGEoG1jQb7ZK2%2BE78r1kbVHl7HE%2BfGfRC5ip1Bq6HiWisPaxAeKgTAf%2FXRnHmUxqDRMK%2Fb1OzLGB1GAKWUjQuAR%2B0LX%2BF07KrqGh2vs9%2BFEe2%2BYk2Nz82qoTHht%2FRye6J3ekOyWk%2BOqlE9li8Vw655W8PxNWNQ8xJUUpo%2B%2B7%2FWB5pMBDXWdOKJiwItwSqWZZo50IUKkB2JyDxz2JzokcindjKodqA2VpAi%2BRWv5I6N%2B5gTLSWOCVLdXxWucdmC8lMyAW12uaWfakIUFJFu494HY9LIhkxaAvH2Cn3QmimDo4IZuJKvph0N7yCp61%2BBWINGUzySIePS0imMARaO1QELX4%2BUp%2BIh3nSpSmiGicwzKfiygY6pgGHiZZKjFl0zp1JPTMvI9JPZwuNc9bbfm8wy7w8yLbG4vHjzPIfcc3Xh9H%2Fhy4sjrCD3UxnEw9mcBb9JZCJk0jAJTaIF8BxBID3x8AX3mAvIhFW1H9Iryqc8APhx7fM%2BjSujQryhFfclPhRf%2FpMLd3g%2B0FSRjcnuJb%2FfxDwHJeERYZbOj77Hbmg9IfBgNK4aIOFg8uftKOYhSxVsZDEyZFkpGYgQV%2FV&X-Amz-Signature=4f25e4b7a7f4b0e05fb402af95df4efed2d44e393eab414eee11744b5e1a913a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663USJ2EES%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T090120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQDjIRqBENWY%2FANG9ikpfHILy4NG%2BR93CDkuhz4pfFKfKgIhAMfWNlEXgxi6aLgylgUBUHgYCe5zyfaTmaxmhTvoQhpTKv8DCA0QABoMNjM3NDIzMTgzODA1IgzJS7r6nJEQssy2BP4q3APq1IGlNx0DlCK2edguGtNX4hfy15nuxqSSDxd8hxaHWsimQ8aiDWwN1JsgnQvhJ3cQ4reL31XfVvBeb10F%2Fng%2B9C5LBwtJzAoQipbijOJZJ3cxj41ZqHDGluT2o1XZ%2BI690RRFvk%2BBYqX3mxdH2eviFnT3UiamzGwWbATYV9Aktxmvjvt%2F%2ByOauBk5dNWfcmFUnH7yLAnOoBBOsSL2ZWrxeg6BAtZZKtZnfxcWb%2FlnR3rOrtvCkuoOKaRz0NFuhvJU1Q0d1bvLdxrCfIqaJuxbggNuwVg4UMgcpBm8oKi%2FNifuE9%2B9XBSzg2Rwrki0dI3Wqgrqy%2B9AlD0Lhdo5vYeZczuie2xIS0MApDRnbA6t8o%2BjGOTiBdj53Nj0wVfSDQl76lm2GUbawuyv1Ua43vnjYklBURdLxdzIB6cUQQQgMBNPjKdOM3ThA%2FbEjif5vWgENtkbCNbnNYJhxRhmhdYq875GlPqB8CS9M1%2FCyCqJ%2FE6bhNvtz6d0QOrH9%2F0rtFKldNDoM8Kz61c2f%2B%2FpVSmOuM%2Fz1hHgTd56gOPqlWno%2FGO8Nfo1NgGQbwi24Is5o2pQeuWl1GPySl8xUaf0namorJG8uWuvrPXsd%2BZUDyF4y1CBYIkclUIC8zHHuzCBqOLKBjqkAYM1vkc6wl8OqFmG7PQ88RdVTs7elz80gqGdsA%2FcnSlNSahIJu2IslH%2Fnby415bbVH77g2tB6VAbFBeocR8Lzu93F4TPhtDFl7MdGImmP%2F0FE4ZL6LoalTLyALhCRof2d6K8gGSBHvotQ6U9MRQWt6E4HmMv%2FhoSnC2tZ8lcLNcj4grPTKrdewzNAL%2FlLumCqlt6lO%2FBvJPZyuIrrOgfRATr6oIf&X-Amz-Signature=0856c86c2f1cdf61c14ba2ed11de9bf69bc13604916e1870511ff7b934b1cdca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663USJ2EES%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T090120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQDjIRqBENWY%2FANG9ikpfHILy4NG%2BR93CDkuhz4pfFKfKgIhAMfWNlEXgxi6aLgylgUBUHgYCe5zyfaTmaxmhTvoQhpTKv8DCA0QABoMNjM3NDIzMTgzODA1IgzJS7r6nJEQssy2BP4q3APq1IGlNx0DlCK2edguGtNX4hfy15nuxqSSDxd8hxaHWsimQ8aiDWwN1JsgnQvhJ3cQ4reL31XfVvBeb10F%2Fng%2B9C5LBwtJzAoQipbijOJZJ3cxj41ZqHDGluT2o1XZ%2BI690RRFvk%2BBYqX3mxdH2eviFnT3UiamzGwWbATYV9Aktxmvjvt%2F%2ByOauBk5dNWfcmFUnH7yLAnOoBBOsSL2ZWrxeg6BAtZZKtZnfxcWb%2FlnR3rOrtvCkuoOKaRz0NFuhvJU1Q0d1bvLdxrCfIqaJuxbggNuwVg4UMgcpBm8oKi%2FNifuE9%2B9XBSzg2Rwrki0dI3Wqgrqy%2B9AlD0Lhdo5vYeZczuie2xIS0MApDRnbA6t8o%2BjGOTiBdj53Nj0wVfSDQl76lm2GUbawuyv1Ua43vnjYklBURdLxdzIB6cUQQQgMBNPjKdOM3ThA%2FbEjif5vWgENtkbCNbnNYJhxRhmhdYq875GlPqB8CS9M1%2FCyCqJ%2FE6bhNvtz6d0QOrH9%2F0rtFKldNDoM8Kz61c2f%2B%2FpVSmOuM%2Fz1hHgTd56gOPqlWno%2FGO8Nfo1NgGQbwi24Is5o2pQeuWl1GPySl8xUaf0namorJG8uWuvrPXsd%2BZUDyF4y1CBYIkclUIC8zHHuzCBqOLKBjqkAYM1vkc6wl8OqFmG7PQ88RdVTs7elz80gqGdsA%2FcnSlNSahIJu2IslH%2Fnby415bbVH77g2tB6VAbFBeocR8Lzu93F4TPhtDFl7MdGImmP%2F0FE4ZL6LoalTLyALhCRof2d6K8gGSBHvotQ6U9MRQWt6E4HmMv%2FhoSnC2tZ8lcLNcj4grPTKrdewzNAL%2FlLumCqlt6lO%2FBvJPZyuIrrOgfRATr6oIf&X-Amz-Signature=4b8cff481f394089a3b87ca68a581991837874475a9bb201d1cebb268e723d6a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666VJNMTNQ%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T090057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIFne3W6tXJ2xF5EaRvTFQrs%2FaMpnB0LgVV8sKe0MLZfJAiEAj9XGd6Ah5GU3mw4qssTj0dVjcilaQh4YYm5XozfMi6gq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDGQA4B%2BXy6LTeVal5ircA8cRVKKkMOqwHOvJN8BXnf9JTpAWmAl11YqhNjwMWfRAi8N%2BgVmj%2FYwg5BLCPys53VkmR1lEoy%2BSvKsWI2n9Smx1RZtw9C3wtwmkDs3trt3lQNA8T1sWXkRF9iBO8C1sxF6%2FD%2Fr0IzuWYbu5IfsdAshJycIjiQziOVLRKwqvOPXWq%2FMQt9JrzbHw9Aa7ePJ6LPq79zM8pEfnoxzszrN32FVIJrazjInGVbNi6gMLeiiBCee5mRMhw1c1aT0R%2FynYUU9svyaQfzcRPCtflXYayX6CjmhIppfaEekU1ZSReDGJuMXXbfY35VH5i5twbwT0I1nUvo4kcd3f7XbBkUq0q8n%2Bkc6RUhh0Kovse%2F7dnjSDYDtaNvzXQVmjAuxAonYAevMlr4JkEUX04ALyr89tQOQu24Ki4LClMdA00wsUILw1u%2Fi9PmDW0roxeQVcskzitJBudXl5W32qtgKAQ%2Bpw1QnhCe2yOT0Ur9YuKIATb88Gywq1IKfciMtXFbcHoIgnMvVLUfLXKe1D3aXSY4jW%2FDKgVtxiTo7gUTbnpoX5oRjYt1N3SJSMO6xLOmmFkZnPhvna%2F6pavb6vOcuh38gZyLWSNVfyEuwVeuoFOmk3gdVddChmTPsIWZaj0bGlMOqo4soGOqUBzk12AhLaFWt5gA57SqAojGMa2%2F%2FhWKWobk9p%2BtJhxucSeEzCm5U6dRIFA83eKYikkRaj0w9YpfzGZvqvnq3rU4kwDX7nb%2FF7mJfTLSLO0f54t9VvcXKlianFnXervTwBEwxzxCbE8NfYjGqPpKbEC2wW%2FJkfP7mZq6vCSyIAuTQClSvNx4vnE6QusiDrfrf0IjxFA4s1grbHs8hzr0kFCsvn2ofi&X-Amz-Signature=f1a1fadc14b485424da7159a829796752c5a6fe265942921a5ad9f127bc64620&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYTINICJ%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T090122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQCl4Xpw1ZVz3fogObkkB9D%2BvPJoZuqtG815gDWXUJs0DwIhAOHngPZXbItFvI7PTsw1oSoOLleia%2BfOBHNxKoiCPkQAKv8DCA0QABoMNjM3NDIzMTgzODA1Igz3pYYXhCBs%2BBRcrFEq3AOxI1Gvii0N7NzYbSV2notf0xEsoegHoKFfetBB8PL%2Bky4V%2FAccCqL83P9tTs7qbjGbkfKNyBpfUQsvPuk3cVfmlD2J4qMZNKq4KgkJCrp9i2GzZUTmFQrJ36CpoxQxjzVhmadmvhXpxyajMoMPvKgSIpYZD9rELacu3jHp4Kd%2FMiJCN8wghEXzgcKzwMl1YZxfXMqTODveEg8BzHGUYXG6%2FqKzpNtM8ocDCZa9Qn69uWVNU5c1hNXdsesmncbCFX98u%2F0eSS3V1f3Jx5ayuSeXKGhoZhKkdZArjkf6Clt20ZGase8wCdpEeOqzIIWA80Utd4u%2BX3NjPwFZPmaYQZXZQL6HYNftmgJrW7hvldKTP1aA%2BCs07lGLRhSFH5KjMHW4vEXVFG6sLMx%2FcUuuhR3m8nLJ0ViOU4Cee7pKPFwPgEq37fIgbYGGcQ11QYWvAfaHmOngohBe%2B6rFDISbRM9j22tEDO%2B4wLuulnGwrgMc4OIQ%2FMl7fFsP03%2FrmuRU2UQ2lB4NdaioY24To%2BrNiaSdic7YYjBTgGmX4932Ientatoj%2B0ebfYKsoT7nFGLscoS%2FFqiSIzmo47SiSuwQwK%2BO%2FE4aHnkMitGsvaxepOSSiibqYzGNbut4gROkYjCjqOLKBjqkAT7fMsuYN6cdBD0sMiBSneeXTysxNKrQ06%2B%2Bmps6hs3n7jJuCQCBcYp%2FqlrQYOc%2BjdamLsvCQZWHmwvqM5CFvBDnCnZWTOtWL3UUmv86L7xkVQwZFwCHJ0lXiJJi488zWBsSZiRf0pcZFgxR9Tbj2HhLpv5oCS1PL81jIcGNWaHLRLnn%2F8dIzfrHNpzp1CtGNzQiPoIUI9TBjXrzSyczPCLRkhke&X-Amz-Signature=f2628f8430e04a31a25c906bd554f0d1f1bcfb012ce88f650796ba0776e2b19c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYTINICJ%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T090122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQCl4Xpw1ZVz3fogObkkB9D%2BvPJoZuqtG815gDWXUJs0DwIhAOHngPZXbItFvI7PTsw1oSoOLleia%2BfOBHNxKoiCPkQAKv8DCA0QABoMNjM3NDIzMTgzODA1Igz3pYYXhCBs%2BBRcrFEq3AOxI1Gvii0N7NzYbSV2notf0xEsoegHoKFfetBB8PL%2Bky4V%2FAccCqL83P9tTs7qbjGbkfKNyBpfUQsvPuk3cVfmlD2J4qMZNKq4KgkJCrp9i2GzZUTmFQrJ36CpoxQxjzVhmadmvhXpxyajMoMPvKgSIpYZD9rELacu3jHp4Kd%2FMiJCN8wghEXzgcKzwMl1YZxfXMqTODveEg8BzHGUYXG6%2FqKzpNtM8ocDCZa9Qn69uWVNU5c1hNXdsesmncbCFX98u%2F0eSS3V1f3Jx5ayuSeXKGhoZhKkdZArjkf6Clt20ZGase8wCdpEeOqzIIWA80Utd4u%2BX3NjPwFZPmaYQZXZQL6HYNftmgJrW7hvldKTP1aA%2BCs07lGLRhSFH5KjMHW4vEXVFG6sLMx%2FcUuuhR3m8nLJ0ViOU4Cee7pKPFwPgEq37fIgbYGGcQ11QYWvAfaHmOngohBe%2B6rFDISbRM9j22tEDO%2B4wLuulnGwrgMc4OIQ%2FMl7fFsP03%2FrmuRU2UQ2lB4NdaioY24To%2BrNiaSdic7YYjBTgGmX4932Ientatoj%2B0ebfYKsoT7nFGLscoS%2FFqiSIzmo47SiSuwQwK%2BO%2FE4aHnkMitGsvaxepOSSiibqYzGNbut4gROkYjCjqOLKBjqkAT7fMsuYN6cdBD0sMiBSneeXTysxNKrQ06%2B%2Bmps6hs3n7jJuCQCBcYp%2FqlrQYOc%2BjdamLsvCQZWHmwvqM5CFvBDnCnZWTOtWL3UUmv86L7xkVQwZFwCHJ0lXiJJi488zWBsSZiRf0pcZFgxR9Tbj2HhLpv5oCS1PL81jIcGNWaHLRLnn%2F8dIzfrHNpzp1CtGNzQiPoIUI9TBjXrzSyczPCLRkhke&X-Amz-Signature=f2628f8430e04a31a25c906bd554f0d1f1bcfb012ce88f650796ba0776e2b19c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WWPW2Z4E%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T090122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIQDdc%2Fvt04VLnhXt2efspKZYLhdX6G4OholrnR2wYxQSpQIgdMoBmWAoKgdnPd5w%2FMPdB2pQHU20eLNCsBKCCoc3Dk0q%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDJaTgCBTJQ1k406gSircAzEa5oWLv5Y3OWrTLmByGA7kOQbS7mX5zJhAiscTW43%2F399nQZs%2FqSuW41Jb5gFHJDkI9lwepedhVXxVCogX5p06Q4P%2FGmW7namnASJeqar%2FDDeTY2nJshx%2BgJa1dle6obWjzgDfV5Id0ln6QbYt0vm9uPfQs9tSBXdt5S1pDdozgU3E%2BNxlwj6%2FCZwPMVJV4RWATAFiAijURj6AQ%2BXVi2KFhE36xrU%2BqKwRAmvoIvLcwqLpYjbV2F7%2BqrWy8iwSRlpmOAZRrquJ8wBrOlV8H9BN5NUfY9EYqBJ1N3X0%2BTCbFog15Lz798qSBeITInzdIxCCS19bQ4sTzWmk%2F7sX2F3nmPT4gus5NVtz7dBIp57MSU9q%2FbDdvcgmZLsE%2BA2iO1MB%2BYqa3TWTwVZ277dqLzERnHZv1tEaeVvMuyKX%2FfkE3lVqxhUFC5mQVE67n5TPOAserWja9fWYNpPd8N3EWA7ZW7NxS5rYyKbKIGAGWZ2mEr3BpxGEs7dCuYSuqMGj3ogPSPvuCmSC%2BBl3S6DovdBcNZUVm%2FPCyypRbqrnrm0AzqMNJYnkSG5oG1ZjB5KELXKwOeqIr3V6Ct3nIc8jEEV2wKVK1VpmNsnkPP1YXIGQAnyB8w1Lgrcyo9z%2BMI2o4soGOqUBoNycZa5w20BhSpoZfCrQv2VAn56YAZCyo%2BxE145kUriPkKQz7AU2jnOyMY9QSMX0SoSAo%2BqZIKHRGGMCdYcnKaBs%2FBRAJehTvPSK3Ktbav26Kcfg5KxomAaPcNL8RPTQzunVPGE0za7HnCdiIL33ZDpTqkxd1CtpVVDZ%2Beb3Y4werl6AJnX0LycpEv%2B%2BhW9amc7ISmJWSnogxMo2BSZ98AVQxTc9&X-Amz-Signature=a8375ca1be06f3af0cedb5af1fdefb65a9e1e69a3b1133aa10bc783db80ca3d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

