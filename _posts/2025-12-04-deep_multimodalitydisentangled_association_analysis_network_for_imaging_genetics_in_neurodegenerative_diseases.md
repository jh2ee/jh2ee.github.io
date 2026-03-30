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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666UKU4NCV%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T212957Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIFW9FeX2UGHPUTIUKHBtnNHIiAq6oTvibOvkBClCnOQJAiEAvEgJIdKR5kPLfAQwBgIjjgdlLzVbBpbJ09g4rcRS%2B8Eq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDH0ye3ZVF2EIm6d6aCrcA8IbfNbbmSDSz%2BprGTTwC7xeYczo1T2Sp5ZshTYpCrjo1dmsIDj2bJ6yNk8irsmG8rzjoxwAsMF4H5XVdVUwqPZMSWO6VJjPr5LNNWGzQ%2BrxImgsOZqDSropNRsc08N9X7zkM2%2BWCxGqi1zFnccexpILKhC8G3i6lcZiF1WeUacvQyv4Epvqx4bKdOb1%2FqB6%2FGruBy4Fg1cqPRDh91o9ts3PmHIY9p%2FfZHmv5z12bBJNU6a%2FK6%2BLyJ%2B5qHBvaM4%2BD35FlVMkj9%2Fa8ic3gyCqRsIqnQenyl%2BeCgU%2BS%2FZr79oyR5auKIxO1M7CY0HexYrnvP30UQf2cNJMpp5SLLGKAQXG4Tn6ryh6dG8aVOT7Z9fFdBXdQBpXu%2B15Xt88xdr6iDSOc6uG9L5Fx%2F0l8Fm%2BjJYfK3YIE6UVw%2BnpHhfZqbInMAlebT9fNb5uo%2Bo3mWT4lBNu3bSxhqjsEwn17TD03FU8O%2Fhlsg36ianI9LsQNvxvN9YSRhikTGyu%2FNG89hre3AJ3B226kostSgKCe1%2BjvyP5JiOkGKvzHiBQ66%2F0uYVBWOgP2pVqYEIPJjT85C6iycwIuEduzPhlz0RMMEOA7I4LlbhZK0sPzEONG6YHUQ4rJk%2FLoism1y62pNJvMJWUq84GOqUBWaSM7Vcz%2Fbjy2XvO4X9jGyjSyod4JgRkvsgwdLossoboUymR7OyGi6zNgAP2lT5JcxSDxUBTSiLAFixaARc89V0%2FkvabvbVNMOnOOIDTLw25RLQCzOEqFkXqjN9GeUgf%2FJsoT%2Bbm3Dn02N1gGtXSC%2B9XW4HGyGSx17Euq41klM3ZHQcLkeVaIinJGk%2FwAuTDgWZZkwpMb%2FgJRZNd8oUYhhFQ%2B48V&X-Amz-Signature=9931808a2ff7724ed39b72316548325c9e71b5186326bcb0a744d49c2df19554&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666UKU4NCV%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T212957Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIFW9FeX2UGHPUTIUKHBtnNHIiAq6oTvibOvkBClCnOQJAiEAvEgJIdKR5kPLfAQwBgIjjgdlLzVbBpbJ09g4rcRS%2B8Eq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDH0ye3ZVF2EIm6d6aCrcA8IbfNbbmSDSz%2BprGTTwC7xeYczo1T2Sp5ZshTYpCrjo1dmsIDj2bJ6yNk8irsmG8rzjoxwAsMF4H5XVdVUwqPZMSWO6VJjPr5LNNWGzQ%2BrxImgsOZqDSropNRsc08N9X7zkM2%2BWCxGqi1zFnccexpILKhC8G3i6lcZiF1WeUacvQyv4Epvqx4bKdOb1%2FqB6%2FGruBy4Fg1cqPRDh91o9ts3PmHIY9p%2FfZHmv5z12bBJNU6a%2FK6%2BLyJ%2B5qHBvaM4%2BD35FlVMkj9%2Fa8ic3gyCqRsIqnQenyl%2BeCgU%2BS%2FZr79oyR5auKIxO1M7CY0HexYrnvP30UQf2cNJMpp5SLLGKAQXG4Tn6ryh6dG8aVOT7Z9fFdBXdQBpXu%2B15Xt88xdr6iDSOc6uG9L5Fx%2F0l8Fm%2BjJYfK3YIE6UVw%2BnpHhfZqbInMAlebT9fNb5uo%2Bo3mWT4lBNu3bSxhqjsEwn17TD03FU8O%2Fhlsg36ianI9LsQNvxvN9YSRhikTGyu%2FNG89hre3AJ3B226kostSgKCe1%2BjvyP5JiOkGKvzHiBQ66%2F0uYVBWOgP2pVqYEIPJjT85C6iycwIuEduzPhlz0RMMEOA7I4LlbhZK0sPzEONG6YHUQ4rJk%2FLoism1y62pNJvMJWUq84GOqUBWaSM7Vcz%2Fbjy2XvO4X9jGyjSyod4JgRkvsgwdLossoboUymR7OyGi6zNgAP2lT5JcxSDxUBTSiLAFixaARc89V0%2FkvabvbVNMOnOOIDTLw25RLQCzOEqFkXqjN9GeUgf%2FJsoT%2Bbm3Dn02N1gGtXSC%2B9XW4HGyGSx17Euq41klM3ZHQcLkeVaIinJGk%2FwAuTDgWZZkwpMb%2FgJRZNd8oUYhhFQ%2B48V&X-Amz-Signature=9931808a2ff7724ed39b72316548325c9e71b5186326bcb0a744d49c2df19554&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZT7IHHI7%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T212957Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIBpCuHgriTCdYJ58YxvpIwEnMqhWpbLyjAKySNqyUoIQAiEAik2YB3xHSJc0e7uZFkVxKoSCQXBOD0fhsOBCoSxZBNUq%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDHHTNTfiakudEti5DyrcAxavvOzpmmvzjdyqqUhZCryb7gMMTcqhTpuR3IIovF5L25gUktFR4%2B00WpQ4R1FT31d6k%2F8hiFCXJI4tEwVFzkHFHPnW2W9rhDaQxjI2GKWzi5mGa4cQb0dkFOH89iIxkrarID63eBCN1XLW9mAp1X1ca0kFJnL%2FGXPB9nvtH1I9iOsPMLQotcsMZBnMZmVbTDxc8nRjUd2UYUjRpFo2EYhHRI60aSrwHpsSIfL%2BvSaAAL%2BnN8LsdB5N6I3Tjbi0dXpmlGG9x6%2BfDpFmUM60fW5HHBD%2FfWk9IfTkH40vytXlRNsB4XP24P7DaMsIwNs%2FUZiH4uqRKt2Rn2o%2BMNDcepKcG%2Fa4RUwbyV1M9ukC3agdRU3G6eDsX5hoTXXHt6IFivcKPwme7z3VUHxvsR25NMu%2FmnmvEtIZj%2Buz3yTB2VwefaDC9Bu8wSj3BZ1pl4%2BuxM0AJCysvu1tEwkBAlLy9AwLBMyZN5q8fg5KGH5OPiQR7w9onoC7h9EZWNl%2Fg7AZEj2DPWZuYmhMm395CY67m2aLX5WWaYi5c01Iwa%2BTSmY67rgdK3FgvSU3ggdOX3liRzKIJvSzkY6S8RBt0OsO0tiGknEjwz8ufNvHEHgiknCKgO%2Fkaq00QLWdEde%2FMOq1q84GOqUBYuvsJ0DKBymLsp%2FJ2McUiM3sSNCcZfeAuXHgCfPyqBOtZWLM5U7YlqVbzaV9runZwmbnazFEdSB2ChsAlQnj2jMSAE7Z1YI6cPUc61TqcJK61OiozOmiWCOLIR3XxdLVKIpVV1kBr1glEWR5z2wcxJD4LNcC1tUXCsvoaMBnW9%2FuHYLFkl%2FuqmCxzcwbfeCnHXfrXo0vGmEfUeiebQBkOn%2BDfSOf&X-Amz-Signature=e1ca3639d27a0182ee349d82f993ea5db7b06a8bb038f8109c0a8c952e4249f4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RQNSEOBE%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T213002Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQDFXIq0ohE7iL6vGm2p%2BKch%2BUjzCTFdZgWI4Kfe93HbkQIgBNG%2BDGq5RWrsh531YHLa%2FmrjzHr1QSyFbOkVY51gUu8q%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDBA593B7VI7%2B10k6GCrcA2ocGrtvOFpzrUwJ87VfQNz1DDEeBUi7VyUd7nDyDkvAwMIiZqA2o%2B0ogeBg79hI1B97AfcrwMusPmmYLqDv2zc4SrgYAfmuHROray6c9puwwfhKRWumjqjpWyyMZJw4gFrR4aSeABReRj1qUVPA3bOIesJ6gHX%2FPYaN1V%2FdJcLjYrsIiTd7I54FV9I0iyoLg%2Fv2RdtlRz4CzHsKrF%2FGjglk3253gazGOq%2BW0l5irdIhaiF30hr%2FFeWiOiGH73ufA8hSwtZtUH50EKzSJOXfYJHTNAucVBcK%2FFZXi%2BlBJVk9PxSHpaEaKefXo%2FfQt6sE716CPUN4%2Fi2QxCIvs1%2BoQOeyCExqufNE6cO2LpwL6275UBbtrfc6qaOLoEFU6U20RRql2Dn97LwVHisSz5LP7s9E6ksO7CPOBwFSXbZaK3pjk%2BLWknWqPgnZM7gJTPLXXX4jK1%2BQwJf2yoHzdQ39kouLfuTeDfitbYcofUaEm6rzVyTg3%2FX7fuw10X4z7EWKwLFJFZN3DqbQOqIf2YB6TKs8nrA0C2vSyVNVpQ%2FLL%2Bal%2FWe7tYxZPdiAjd9dEv4B8oQg8TnWVgjiWX4nKCCvVnWzVadvjSIzFgvqDh6QFUwPy0E4HYZdGJiSnp5FMLCSq84GOqUBPYWT%2BGLg8jBi7PRyTE63mlL1Z7gDr1yKiYbZpbIsP4H5DeDDVYhXd5QLl6aWlXciaHwgW9daOOl825hcOZkpmEizfaFa2IXn1hzmXe1TmiYoL0HHAPNDkJ1J4AJEprfsxrg1mOaOE7PMmx0zrmWu4k%2FhRGMM3O00o5PZ0sjoBzmStHfHi92372ocHLDz2jorYChUE81UmpBJKdCyIcGZk4tzoY2L&X-Amz-Signature=4e6c55f21e8ff7ce0a9fcbc09b64b6bd17e758b4226f89f9cce959193cd29fc7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RQNSEOBE%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T213002Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQDFXIq0ohE7iL6vGm2p%2BKch%2BUjzCTFdZgWI4Kfe93HbkQIgBNG%2BDGq5RWrsh531YHLa%2FmrjzHr1QSyFbOkVY51gUu8q%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDBA593B7VI7%2B10k6GCrcA2ocGrtvOFpzrUwJ87VfQNz1DDEeBUi7VyUd7nDyDkvAwMIiZqA2o%2B0ogeBg79hI1B97AfcrwMusPmmYLqDv2zc4SrgYAfmuHROray6c9puwwfhKRWumjqjpWyyMZJw4gFrR4aSeABReRj1qUVPA3bOIesJ6gHX%2FPYaN1V%2FdJcLjYrsIiTd7I54FV9I0iyoLg%2Fv2RdtlRz4CzHsKrF%2FGjglk3253gazGOq%2BW0l5irdIhaiF30hr%2FFeWiOiGH73ufA8hSwtZtUH50EKzSJOXfYJHTNAucVBcK%2FFZXi%2BlBJVk9PxSHpaEaKefXo%2FfQt6sE716CPUN4%2Fi2QxCIvs1%2BoQOeyCExqufNE6cO2LpwL6275UBbtrfc6qaOLoEFU6U20RRql2Dn97LwVHisSz5LP7s9E6ksO7CPOBwFSXbZaK3pjk%2BLWknWqPgnZM7gJTPLXXX4jK1%2BQwJf2yoHzdQ39kouLfuTeDfitbYcofUaEm6rzVyTg3%2FX7fuw10X4z7EWKwLFJFZN3DqbQOqIf2YB6TKs8nrA0C2vSyVNVpQ%2FLL%2Bal%2FWe7tYxZPdiAjd9dEv4B8oQg8TnWVgjiWX4nKCCvVnWzVadvjSIzFgvqDh6QFUwPy0E4HYZdGJiSnp5FMLCSq84GOqUBPYWT%2BGLg8jBi7PRyTE63mlL1Z7gDr1yKiYbZpbIsP4H5DeDDVYhXd5QLl6aWlXciaHwgW9daOOl825hcOZkpmEizfaFa2IXn1hzmXe1TmiYoL0HHAPNDkJ1J4AJEprfsxrg1mOaOE7PMmx0zrmWu4k%2FhRGMM3O00o5PZ0sjoBzmStHfHi92372ocHLDz2jorYChUE81UmpBJKdCyIcGZk4tzoY2L&X-Amz-Signature=d52432983c03c4a7a4e8b0e1ef3833083764b220b7f5016760f21a3e53b5f680&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665JUMW7YG%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T213003Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQDRTmgF8xNkBw9NOG1mYHIrqKC3XH0u%2FuLB%2Fy6a3hBZ%2FAIhAIiF2oF%2FxYxE18PgQVN2nZqpLE0j6DssnSyGe2iHNKyLKv8DCCwQABoMNjM3NDIzMTgzODA1Igy3cEDNVDFoEttfIaEq3AOtaXhEQPHMhhewMpBTGTrH9s3P%2BzeVZL%2Bak4yzfCd%2B1ysWoYK9c4hHdLsRu3AyueQZr08nfG%2B0EwhoD5VP8UY2ApciDXP3um8adhBwEICAZSPTbHH2LIDaQ7XZJJBLpCImQZL7Gv4RbBtekJVXZjUxRxLjIGajZn6eaasOoSmxfWcVOKeCQHdajrRIAXM443EklCR6894E6GsMvbvaw%2Fjx1WU2CtkuaMSbRzhFnO4mqHbVwbsOHP8mRV0vgaUiZqTO20%2BE2olnNmjK1cQHOFz81m8pBsF4wwH3MV02DCI1TuVi5tfmz8853cUqXTVvYP0xl%2BUK9lRltvCVTLzloitlZ8kfz8dbRRm0pTImUG%2FSFRzq1qXlHf53ZufBuMe12rAsmRdNbJwFpfV3jDuLE32xE5bC0EWpkHMMSWsvOin6I5Ure3g2Q2oRdoB%2BScsiM78XQmf37wkmoxkAQtTop7ONZoyOWBxVXkaS6kWy71fCB8wYrB2mk0dtKmPi%2F0yh%2FpTnyLd%2FuT%2FCkfl5qECbcgAGOrL3qJQYEUQlWZPouv1%2FFpt2gFqrfgNIBGkbeuummD%2B40QpILJGvNIAHN5XD%2BSPPc6Iu1cuN7C76a0dr%2FllK6SsN0yEkgmCzK6OYJDCrk6vOBjqkAeBWgvrRa7UnfRX7FdtU4XTyr2A5TPjYxEtMCPStkqABM95bwlXd%2BmfUJD1%2F9izvlaU7QMBQix3SVif8VBHcMjt6RhtfBniXGbWhq06Wer4rM3a2oeZUcpl%2B0DV7SKhJECKBnUIq4T4XjS4wRi1wQQTZUEPmYhd7dhJQHcSu%2FqWyob8%2FWCyHLPHHpi8l%2Fp8INfuPqbjcemut6XqB1bf54oL4mrRt&X-Amz-Signature=4124344ad787dbec0b4b47a3324915610a510ca25721eeb9efcf3321612e88c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TJOFYBQ2%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T213004Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIBzxrVNc9ofdogIvXzgSR4CwxVOWOQMMFU1AkHM0SY7EAiBR%2FYYa%2FDTzrV7ZGNddlmvLlbpT9TNwc5hNfnS6KU4A%2FSr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIM%2BUDuECEJcFZ6iQYAKtwDnmlnJgAiF9ZlJBt38NvkXDmMqPtRFmh9NaDCM99aYwo4tbskMjPhDxUlKV9XTzMa%2FZYf9HdVGyqEYjq8AN1bUGdTuZsXXmk5zIx%2BXOF8ydG4TNOyMVidZSiRlxU4FpEJWscbXF%2BiLL15P0%2FjhRkhYA92ZJG9wLkECBiS5xGXKa99EY3AmoVM1Zg6dDOLjnF4HnmqRb5PwY78ioDQOqAkUAf48iJK8u4S3FuMU1TlYhnWz4p7ihs3VSOJ%2FmqRYp0sg%2FuftGrtXbDkDJ99JESXDJ8zLK%2BfSAd2HpEXgjliofUdOVHcIw2d5m9DJ5Gv2XYZUvnWOS6QsFx%2BS6A5zwr3r%2BLApuE5wGuZro8fsw4QwwfgUwkomw4fqt8OCgWj8jn5nDouI6xrd6eSwK6ddWXdn1bHFyVNwq%2Fm6kzTikpLgsxvzExgf%2FfitOQ56vXIIqI3YTOdBD2lcdtMfpLaV8GrzEvYi08%2Fbzjlu1yjI9T07DrYrqBopaVpKobmF5I8CU0M0saldIdX7XaHrv55Jyf8TvmEZ3xP9liaTutpvTBNtgj%2BAWwIswX%2FRZl4LgKVsz8pqTbHn%2Fnx1TRNylvZQYbd0nzhvcLRUxBtFL906f5GIK%2BIdZVxjfss1caVex4w95OrzgY6pgF8HnAShYgwZAnpYG6XaMwwP4kUQvLeAhs6tOHlprEiFZSCuWTajFTG5jaBrl3ZSGXq%2FHyEk%2BkFgu3LV4gNmTDfknACZ4IQf9LL8xVDvvHziyJcxDCMEwmm%2BCOvEzvRFYprpBONo3XVUbiDEPcyUSFQ06c0VtJ%2FrszA2oJs4RqIHgoTmk6LCrbiIT2tsmMshDFAq9YKYkateh7EfSq1c0fCWXTIzGc8&X-Amz-Signature=ed45bf35512bcd6df3bd8724ab65ed8f9319a0230d1f7295187f4c47a994887e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667STWYLRY%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T213007Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIC%2FDhIKowwrUQayu9xwypeK%2FZFaVrTGGY8Xsx%2FlE%2F5vAAiAAx%2BItBM2vCR6oUbptLXlnQQvjd4gS8PUadNRu3%2B98syr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMxmPsIKDe3RlPq7SIKtwDu1QTZ%2BlKHsMPV9vOAPtdmqXa1xRyuSUDaBQrS87NJUqAycybk8aOEfPndwBKHX%2B7TKx1zWhxCyjj5cETpPSP9wHjkfNXLLStBZDnntS%2B95Mef25AXUHBAqss5mBUOJj%2FeibWHIAt3AzqxVF6bmDCiNlpmuS0Ml1Kq%2BR4PMh79vTGq5SUOigXdIZeBxNoxEqT8VzGjnenST0348bs85qWEzZRcYv5deQrJfRHpQ2zMVHaU84Fks45tGx9E%2BVzRgMTpefEFjD0BlSMxjZdMERZKCt5jXmjGivu9eThZUDklJu9zkC8bOrchfBBxnScMX4wBngwJ1JyBVUdRA2DUHBhhCfrAPllFoLsaXevK4aJr98wRAKYWFqBcvHRW8cyqs9MkvNGkedkg23Sc6dloFCGq%2FhrFkicncbN4obst3NCyzG9D6eAakg9076cJkAqVa92TtsMKfIbPZyTa1bCGjXxiE0d67pjNbk1%2BR994Am4gUKXKPONE7FhEd5S33Ys5Ewuw8oFY2w%2F5MUB%2BHZLaU93Cyfxc6H4NRt2VBiJ7QRh0MeBpGEDeM7bKJe6YHCUEQQET6T%2FvEHq3d1TDZJYbWjbesp75FK9h2V%2FH6Px7%2FZNwPUokxenGuwIDUXKBj4wh5OrzgY6pgHX3D03KR4ki%2Fl4KcDGI5D%2FDLNFehmSNF1vZ2ZwxmT1RQRzyPtJihd9Lin3kKrz9KCxoTHtIXTPdDmqh5zObb0Hf%2BI8cKDWemBb6zYYMRJ4M4InFaX0XevbklH%2FGuR1I7yzxZd5O%2FLE%2FyzwxkiL1jxai59gxcvhiimpiVeki05hNUNg9gvnoaONpF%2BA100W8LDjkqVysAWxsAd5Dzb2oPO5PQKHZk%2B9&X-Amz-Signature=dd0d15e9273ed34dc9106bdb7ac20cb75740f6a5af71939acdc4938e7c8e90c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q7DXT64J%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T213008Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQCi9HCVl75Td3g0rIsiG6zeaQbjTc0YkL4bfwnNVZ2arQIhAOZDu09HwbnCtDWEkLNMyfRW7YvmAkrkOUnWGGEGUFbMKv8DCCwQABoMNjM3NDIzMTgzODA1IgxmHLZ8y68ziasuOs0q3AP2Pgt4wCoBZJFGF5jCXyNhoaafXVmmSnVuu8A6u1%2BdTONoKMKXuxx0kTIPCRpK7OY5MRpBeKcgiMQFpUloNuSpGebkwIcOPjcsbCQ%2B3zE6a9%2FPYcqCXzdG%2FPS%2Bkh3%2FEb%2F6Owh4VAfOJUQl4PWkOnC28W3kC97V2V%2FZDzYhURVPMgAaBMYs%2BwLFgiDFbish2GZHbLmVzPTo89xyCtRG9YHPrNjhuGZSAps8YoHYTe24ycrV%2BcIPlhO2fKUjhT7GHZi763IwYMQ3ip6bruiUIk5iUb0D3P0eEW3RFPAgguV9vvPRQk141d4XE4R7HAuGZcWynW8TzXNhSjhHyoVlxWv2gbjllYKg3Jn3jlNBIQsRjxB5jtQlHdQgmQtRrAF68FYHAfYNEsKVSXeTj6cZ7bTjcwwV5t8EItnpHZNgF7ChXLfE3YRZPeGszLOmwKBWKNVukRnbGrQTM2%2Fd%2BHDm6s0NApWwUnGb%2BEhnGsrBLv2bB8zm9oWjww8MC3QpdniPDLcUKlXb6Bo2G7DkmNpWMXwqHso0NKQuuQVvwVphaClkUU5BHJXkfGIGbMO4GkO52vrh7gzv3VUotvuDbRD83YTl5RMxQpDkKHktid5c9wB4rkwB3UgEZ8%2BYiTXzGjDXkqvOBjqkASXQswu%2B%2Buxe8a0HPflCdoI981XuMfzqD6AS6fIIV1yKbDQBjefdPoogs0kx9nHSeXgJMPBc%2F0iDAY0EgGbcE8KVGUR%2Fu0wzPpflcH533MjnkBxEwEYg1aJL51ck87N%2Btr1RPGgvTueu157f%2FfGqSY0CoechPyN%2Fm2P00yjFthp1r5owz8r8c%2BziVOHt%2F5S1YioGoHlS7Rzjp8C5bLoh9X2E5%2BJv&X-Amz-Signature=34dae862f148b95523b272c6fdff9d89631cd2a5d488ae29ccceebadefca3a08&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q7DXT64J%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T213008Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQCi9HCVl75Td3g0rIsiG6zeaQbjTc0YkL4bfwnNVZ2arQIhAOZDu09HwbnCtDWEkLNMyfRW7YvmAkrkOUnWGGEGUFbMKv8DCCwQABoMNjM3NDIzMTgzODA1IgxmHLZ8y68ziasuOs0q3AP2Pgt4wCoBZJFGF5jCXyNhoaafXVmmSnVuu8A6u1%2BdTONoKMKXuxx0kTIPCRpK7OY5MRpBeKcgiMQFpUloNuSpGebkwIcOPjcsbCQ%2B3zE6a9%2FPYcqCXzdG%2FPS%2Bkh3%2FEb%2F6Owh4VAfOJUQl4PWkOnC28W3kC97V2V%2FZDzYhURVPMgAaBMYs%2BwLFgiDFbish2GZHbLmVzPTo89xyCtRG9YHPrNjhuGZSAps8YoHYTe24ycrV%2BcIPlhO2fKUjhT7GHZi763IwYMQ3ip6bruiUIk5iUb0D3P0eEW3RFPAgguV9vvPRQk141d4XE4R7HAuGZcWynW8TzXNhSjhHyoVlxWv2gbjllYKg3Jn3jlNBIQsRjxB5jtQlHdQgmQtRrAF68FYHAfYNEsKVSXeTj6cZ7bTjcwwV5t8EItnpHZNgF7ChXLfE3YRZPeGszLOmwKBWKNVukRnbGrQTM2%2Fd%2BHDm6s0NApWwUnGb%2BEhnGsrBLv2bB8zm9oWjww8MC3QpdniPDLcUKlXb6Bo2G7DkmNpWMXwqHso0NKQuuQVvwVphaClkUU5BHJXkfGIGbMO4GkO52vrh7gzv3VUotvuDbRD83YTl5RMxQpDkKHktid5c9wB4rkwB3UgEZ8%2BYiTXzGjDXkqvOBjqkASXQswu%2B%2Buxe8a0HPflCdoI981XuMfzqD6AS6fIIV1yKbDQBjefdPoogs0kx9nHSeXgJMPBc%2F0iDAY0EgGbcE8KVGUR%2Fu0wzPpflcH533MjnkBxEwEYg1aJL51ck87N%2Btr1RPGgvTueu157f%2FfGqSY0CoechPyN%2Fm2P00yjFthp1r5owz8r8c%2BziVOHt%2F5S1YioGoHlS7Rzjp8C5bLoh9X2E5%2BJv&X-Amz-Signature=fffe9bd2cf5b9aeb84b34fe10e6a0c047ff9ac0a18111b8c71d35cb58149d4ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZPX37C5F%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T212946Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIB9u0GXad0tVOOpfD0mNRtTDJ5i77MaxuaGibXsfgAF7AiBDOiQ8nO09zdW3lHUpfEr2V87hAhACf8ah7zTUQiNGiyr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMlKyd%2F2h%2BX8tmHBQdKtwDYRpt6xMA3TobkVa3PTidHczI4J%2BcgMWMq8rbI3ZKnmbHOXRyFXhyg8IT8hSuqsZkl3%2BcJpCjlqNEYLskUEOYXgT1ug4QBMTegG1or%2Fccpm%2BEMm2TcnPML6M6oKPowc2zs4PQ0eRcdcOGRpRS3jQq3ahWPLIXDPVpm2SVHuopwAaKlPd%2FkS1Pn%2FkDQPp09KqkqXT064BL%2B5bYfxCJDcwCvzwEM1rqcx3wHvrWy846Zh%2Bs206rJ6X0vlHuY601tOGCJv8g%2F7CyTHm%2FYlceuKBhl%2BGphUpjZhRhsvM5oyL8diFsMwpvGdu6AU%2FLUGwDlSME%2BEsYr0uxk7V8JxRiulc%2FYc5wrXsgDwSW79eozqApAzS6yF9u9AmW6v8dQm6fWB%2Bsi9ivdyZtKoKWEAL%2BPMGEnf5B5Urz1eyEBtCedYDNPSz6ovwlaw0KvYaW9ci3%2FPQ5Nqc13r7X5Gnd%2Fgizeo2h5%2BEFHlISWqEfCyLBqikyZmd%2B3hhZRigJnM%2FLGMl24vQbTGBPPM1elkeN%2BT%2FPaeP5KLDZ1C1lyjcgYeBVYrrKXPowi151KEies7w25vfh23wnoO78MUL%2B%2FyCg35uIwhtylLB%2B49skt20inLpi4v2gcV5yfhuRdCYegKu4IB0wh5OrzgY6pgHKhDDtTQQ7lcdRmCjffNtAYYafCwCbuT8lkhQD2g4%2BjOf87z2tVE47bRc5d5DY82%2BlwfH5Jnk5ZgLJt%2BDkG%2F7Mt4fH0ZBn2US0qy1X5wzbUATrrJCdM%2BCe8n1UjXyvMAA24IMoSx8QuX%2FdWebQqsmNd5PDpZnY8v1wxpYtM9ICGigW20c6qtZDh1P2rnije5SUve6AImtNV%2FUiQHL62rOHfKFBpCGL&X-Amz-Signature=99464e4d79782dce907c66f9130701b7da40d8a7064a4dbe93a282ee1fdc8e57&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VDTBFVN%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T213010Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQCUJdVMOyZO%2FooZtiioAb4q4pG0T9rTTn20pBioDTA4iQIgdfZSJkJqnYv3HyLt%2FL2sxeyDyK5f%2FmeT%2F4v5oQHtKT8q%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDG238noSgCyaGPUjrCrcA1T0SXr6DhhhzJluhZjs6MOhMSnWbQ32KKY1Ec0xaBo8lJkMiiOsfrdyLU%2Bu%2BfU71sWNhubJxzxpw2FANTBJgcLpheF%2FGsj%2FW0lQn32he2G%2BgxRVa3d%2BhGPncBrNQuu3Ph6jryQkzG%2Fs1x8wZYpvPUJ7I3vvBhucPHZTxOreebrXJMAEwYv2w6lWxKbqGrR0KqrFoL%2BGokiXtmWgo%2FkynXF9tKszBrBl%2BwsAz%2Bk%2Bkov3VEvwPb6TjRhWTGVZFxpRFX%2FR8AUNP2e2H0wEORJZKrI7HcDTb1nkIs%2ByPa6lvgQoCQtTFJRJMIUlM1rwBEQHyPjFB1qgIdi1sCe%2Bh%2BaJ2B9Niw6bswa8BThIvUVStJZbr7GLkg1uNTVQS7qoa4G3GZm5faRLZEVmacILDng%2Bg1CGQyFlnK2YL%2ByeOGvd%2B%2BGmmrIvy1C4mK25bI2Oi50lBoGf31Xkhd00z0MHpnYDJ%2FDidXDGKbPWzyLOoj9cR%2BtxxNe%2BZm6lj6qyygMf4Dau%2FkbHla83qdxljm5zk%2B0YxUxrqfAikN38%2B%2BLw8OMyaquW5RyuH0%2BAQrluwEC8G91pcqoYMAjIAWnztuRltjytu1VVGRHhgSyd8XwTix7mJDMquzwK3fjthAFXSlsQMKyTq84GOqUBs62oYbgwZEMzhofRvrQ34XQppnlxSHgYq09Cvw32BxqNujJVllIAmtoDExrCA%2Fw7Zt55NZUck0tgtC3AlUIgj5E4721jGBY5vU3QmGCa2b7WNVAwg5DJchMI7qUQnQXbipIkXvDckrsrJsFyhdyAWYPU7%2FlM8KDJ%2FR7FTIwYLcOww4MG8KwTV6i46fmsoxPA0u%2FlMIp00g6qq1tEUmLZ7o4Ft3w0&X-Amz-Signature=f9dae642e333cea3b2c74a63ebe1e4a5bd313392ca6a69195652898573351b4f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VDTBFVN%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T213010Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQCUJdVMOyZO%2FooZtiioAb4q4pG0T9rTTn20pBioDTA4iQIgdfZSJkJqnYv3HyLt%2FL2sxeyDyK5f%2FmeT%2F4v5oQHtKT8q%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDG238noSgCyaGPUjrCrcA1T0SXr6DhhhzJluhZjs6MOhMSnWbQ32KKY1Ec0xaBo8lJkMiiOsfrdyLU%2Bu%2BfU71sWNhubJxzxpw2FANTBJgcLpheF%2FGsj%2FW0lQn32he2G%2BgxRVa3d%2BhGPncBrNQuu3Ph6jryQkzG%2Fs1x8wZYpvPUJ7I3vvBhucPHZTxOreebrXJMAEwYv2w6lWxKbqGrR0KqrFoL%2BGokiXtmWgo%2FkynXF9tKszBrBl%2BwsAz%2Bk%2Bkov3VEvwPb6TjRhWTGVZFxpRFX%2FR8AUNP2e2H0wEORJZKrI7HcDTb1nkIs%2ByPa6lvgQoCQtTFJRJMIUlM1rwBEQHyPjFB1qgIdi1sCe%2Bh%2BaJ2B9Niw6bswa8BThIvUVStJZbr7GLkg1uNTVQS7qoa4G3GZm5faRLZEVmacILDng%2Bg1CGQyFlnK2YL%2ByeOGvd%2B%2BGmmrIvy1C4mK25bI2Oi50lBoGf31Xkhd00z0MHpnYDJ%2FDidXDGKbPWzyLOoj9cR%2BtxxNe%2BZm6lj6qyygMf4Dau%2FkbHla83qdxljm5zk%2B0YxUxrqfAikN38%2B%2BLw8OMyaquW5RyuH0%2BAQrluwEC8G91pcqoYMAjIAWnztuRltjytu1VVGRHhgSyd8XwTix7mJDMquzwK3fjthAFXSlsQMKyTq84GOqUBs62oYbgwZEMzhofRvrQ34XQppnlxSHgYq09Cvw32BxqNujJVllIAmtoDExrCA%2Fw7Zt55NZUck0tgtC3AlUIgj5E4721jGBY5vU3QmGCa2b7WNVAwg5DJchMI7qUQnQXbipIkXvDckrsrJsFyhdyAWYPU7%2FlM8KDJ%2FR7FTIwYLcOww4MG8KwTV6i46fmsoxPA0u%2FlMIp00g6qq1tEUmLZ7o4Ft3w0&X-Amz-Signature=f9dae642e333cea3b2c74a63ebe1e4a5bd313392ca6a69195652898573351b4f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VWF4CZGM%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T213011Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIALdm08EwWIx8dYMHYM1W0X7b%2FrsPUfWCosqHEEepmBxAiBdSEuCdZd1pyVVmT%2B6%2BiZzlm21krMEvX79qk98xkSbsSr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIM%2BcQxTM14fdLTNA6wKtwDIMDGa%2Bc0aAsX2j9hEnPXem8s1B2OyyFIwUYqr2v7tLFRT5bKTvPAcXY6PnLD7t5p0sFRL6O%2BSivVPLlghV3rpA%2FziM5PDcTJWBjXstGrFCTnSTGOoXBeuWgkyVj5ny4Vc%2FRYLg41ybv3a%2F%2BEZEJgx%2F5V3PCEQr4uLyTqpzXsY5sS3VUO1AaiJpDFwQ676vkT%2FasaiNi5qmk1a%2BTQosp6FC3SW6gPAaKxVeiRoopPg%2FW%2FYJZ3xc%2BLRgASnWd7wGPe4Rg7bWG6x4zjKWcbbOrkiUh5IO8u%2FF1IhgBNVLzvvbRBQs1pZ0sGmmOi4L6veX%2FWHlEhU5PBAabr39HWGo3xecJtoeNFzpXptX2UUnvPhQMvDfWRAItPQ%2Fgcpds9TMQm%2FvGUPDrNs0NVl24xFgldxREvhTgFomVrCHBq9WrJeSsLXMcmQbV62oeA%2B3iKDTFQcbRrUS5B%2BLSSzIOh4E6JcE74U78bYnPk%2ByOYdBw2yWI8iBqCzU8kwqtev693uowUu5EsshRJaeN8NyoIAZ5Q89%2FK3E2xALP2bb38QIXcj59LuIKXqel5ohhVZkuLAx41tbhTiZ%2BpKelbK61V38K6XyZYOXoxu1vDkbsdmN7f51vhknEQR6G0nxO4x94wzZKrzgY6pgGQ%2B2nIgnzTV1TsiUXfvir5MAUBFeIgC8erj5H1s08b8ovHb9ZOBe5q5EiaNs7kxK4VrWr%2BL7T5AiG%2BXwERjpwx9uGzip7prVLlOahAbzwYEJtJ40T1%2FaupqEB7sFysmx6hmEiOAh7Gu0IAO4SPNe%2FnCeFvo41H4ZRChLlZqPsU5itnKc%2BI9uOS4kCqfQzbs3qR6SyaQvJDkae6zXbxWu2GlzwGP0jd&X-Amz-Signature=fd7e95daaf957c020136fe71a90a54a4892972e344d5555984a610c89ea1846b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

