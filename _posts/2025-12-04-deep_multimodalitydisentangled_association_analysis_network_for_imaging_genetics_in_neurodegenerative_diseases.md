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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666XWJ7YAY%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T075107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE4uigYxrUx1CbUhLirbZauoFeSB8FitGaguy9ozoLbKAiA65oWINKi926gDtDKHtjiaS3ypA1LZrhMRIq7eaujJZiqIBAjA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMUtt4Fd%2BEg9qXy5q8KtwDFOANdLQ0FQBo%2FrNW%2BRkoWMtRvtLq2ueEPxoww4q3q3i5Gyll%2Fmmcgk22gsvFqu%2BuZ1vZDlGB2TzD1PAQSc9%2F5XD5LN2jd2yg4BmjkXOYJvQKvVcPDLbjD4iHlqLMFiVRqXZkFkCXmX3jE6onrLrJshDwbcrVUpNDv0VpRlEI1Fs2e%2BIDMcHxReTBWsaT6oWLZ2TJiiR21fg5tEPNZJsEoRRLrNe3PGnDhhHi0Kw8S5w1YvE4xvNT3dJ10tWaXBAuu668ZYp%2FbkZeUnlfPcTfOrGH0g1pwIzPI%2BPFUlKfe0oe68ANWSqwoZpT%2Bi8X3FtvbDqlsEBUXMYRBePHS89yprv%2FuIsloaU44kqKkxHhuCyfQQ5dVkHUCN2Vd4KeoLUxBJ1aIEd774qZWcMgcfRQ39szgvDP8BKyV%2B6BGppC0zCn7P1QKIXKVwi2I%2Flj42O32cOZHMsIalsETtlCkNlBWa2WQAaE087gmkHYziDMRvh3m%2FysMvSitN1g9VaS3VCSSnC%2FtDgZFWcz9OxdLSERWye4MXZRt9y5G3ID%2Bt9uw5qFNAfvV%2B3b8EkzFv6SGbDudKdtUSwKHc8Xfm4B7cM%2F%2FJeAkS876fMpDyK8csdac2nS0SUBe4DujBpv7K4w0byTzgY6pgFo5McRM%2Fe1cHDNirsd11936hqDydVOigK%2Fo8oWlkH9VX%2Fh6lU6cyiUYzV%2BR0RTfcWL6%2Bu5ZGAZ0GFSUxuLoLmmRhl23gRnsPte7U55qQXN7GV1e74xF8ieMneK8dAQq6xV2j1jN7DS2G84StgPFj4r%2BQXlgiiXXsLhI2uDO6M4o%2FqwbqrrQg6Xwskk3cio3wkD0uBtvgAewFgUloR0TjkpmnfwZZsr&X-Amz-Signature=3d69d0053f71a993a881dd483d75940c8df85c62a3cf914c66957742fd38e199&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666XWJ7YAY%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T075107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE4uigYxrUx1CbUhLirbZauoFeSB8FitGaguy9ozoLbKAiA65oWINKi926gDtDKHtjiaS3ypA1LZrhMRIq7eaujJZiqIBAjA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMUtt4Fd%2BEg9qXy5q8KtwDFOANdLQ0FQBo%2FrNW%2BRkoWMtRvtLq2ueEPxoww4q3q3i5Gyll%2Fmmcgk22gsvFqu%2BuZ1vZDlGB2TzD1PAQSc9%2F5XD5LN2jd2yg4BmjkXOYJvQKvVcPDLbjD4iHlqLMFiVRqXZkFkCXmX3jE6onrLrJshDwbcrVUpNDv0VpRlEI1Fs2e%2BIDMcHxReTBWsaT6oWLZ2TJiiR21fg5tEPNZJsEoRRLrNe3PGnDhhHi0Kw8S5w1YvE4xvNT3dJ10tWaXBAuu668ZYp%2FbkZeUnlfPcTfOrGH0g1pwIzPI%2BPFUlKfe0oe68ANWSqwoZpT%2Bi8X3FtvbDqlsEBUXMYRBePHS89yprv%2FuIsloaU44kqKkxHhuCyfQQ5dVkHUCN2Vd4KeoLUxBJ1aIEd774qZWcMgcfRQ39szgvDP8BKyV%2B6BGppC0zCn7P1QKIXKVwi2I%2Flj42O32cOZHMsIalsETtlCkNlBWa2WQAaE087gmkHYziDMRvh3m%2FysMvSitN1g9VaS3VCSSnC%2FtDgZFWcz9OxdLSERWye4MXZRt9y5G3ID%2Bt9uw5qFNAfvV%2B3b8EkzFv6SGbDudKdtUSwKHc8Xfm4B7cM%2F%2FJeAkS876fMpDyK8csdac2nS0SUBe4DujBpv7K4w0byTzgY6pgFo5McRM%2Fe1cHDNirsd11936hqDydVOigK%2Fo8oWlkH9VX%2Fh6lU6cyiUYzV%2BR0RTfcWL6%2Bu5ZGAZ0GFSUxuLoLmmRhl23gRnsPte7U55qQXN7GV1e74xF8ieMneK8dAQq6xV2j1jN7DS2G84StgPFj4r%2BQXlgiiXXsLhI2uDO6M4o%2FqwbqrrQg6Xwskk3cio3wkD0uBtvgAewFgUloR0TjkpmnfwZZsr&X-Amz-Signature=3d69d0053f71a993a881dd483d75940c8df85c62a3cf914c66957742fd38e199&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667VJ26VNH%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T075108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGtwjAf1AV0k%2BcRN6%2BvK9a7FLTkWiCFDHwv554hQhKCbAiAtN8DzrlhTFXH4EHRULOAmP5Lk%2FvOO%2FZAQXlBUYRT80SqIBAjA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMXALQbKAqvjrlT0vQKtwDy3uqMvyBdCKzQF5C9sgN2ryijonI776oOt74naA8FaD4y8ChpB4eiNxgy9xxRxc24fJAIssoyDqd58D4qB9EinMSwK0z3J%2FFddf56tLCDxdvDqnw24kNLdLj1t%2FmBYRwj83n93c7%2FUtCssx2UvhlP7TPUOuDgXRinBAOq8MbYDNqDvyzlOqSFXcLtVj7yhrJNVBAMJ%2B0ScgQ4pghYUqEs4S5m6ZvFnxj50t38VfewdLFAVHEPuvWEvwIQzbExXgKHOqhr%2BrHBiIBuKJqrn9uT2RuVjxBy0Q5yysmTbLgRVPvCm5yLJgEcATzG8qFlNUR7p5AZAWrnU2Dzu8MGbLTEVGu8OoO9NHbddJTN93Fop4qOM6cwKdINxuISUly133SOJYX4m4LQGsXvrGOqUHtgL2I%2FDbQIRZPcYiqFvlGF41JKGtnf6AYyl%2FWkT3yHB6lKXnbNJ4x8JMCmQVoq4yE2lzbrtRe2ExDxLeM7E%2FveGYPru60yPcRRTc2aMasPojvR5e0Iyxx1mzic5NTvruEn7gVzMLJmZaxGfZfpQMupI6oTz5KSvDg2gc61McFxCur3GK7Ix6ILUXeNQeLUZfLlOkpibaDm5VVwFFf0%2FEFSGxZrvr5xvPYpkAmSdswjL2TzgY6pgEzmH3HAmg2Q1d2Zkjcr8GS0rNd8d4jJbNSROw3UD%2BT%2FfDx7YAwA7hRZOjPZQCc55OldFG0d2YJK7UfsUQYefJ43EVnq6LAUQQBiGBBJX0asXzyqWp7A9iMxT1SwAhiSsoykwn6cw7kyCTVl68zaC5QpO4gyighIR8w191oYRQD%2BXJhsHZcLBjg63pd%2BBGW0KKf4IZnxl8vW4384SAzt%2BczZ3Mi5rXV&X-Amz-Signature=44867cecef5d49098c46a4c1b3531b601366fcac0ce14a0d1e212049f7ef917e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZCJ3I73T%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T075109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCyVuICx%2F6%2F7LijG%2FOHlXYvWb87PsHpNH9MgKf8WA%2BPeQIgJtkya9YqxIGI0YaUJoZsa0Re47SJHNoMm2dk2UtZGAYqiAQIwP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE4ADhYBkjmU3fhC5SrcAyfEyuv8M2Osfm%2BehTkOo%2Bhg9rbdW010CEPOe9Wl7mfwPRh44X7s2bb%2Bfkw7SW3CYYzTzrlUS0A8bJ1Z2pv11oRezVfNnjgRSIBNrL3PR%2F0NBRPsFhaY1VBq7iFnOC44WaM9QCGX3gi8d555HDjxsfJBc0N0pW1e%2FLtbjcUvKC2mg0LbD6IWp3PgapDjORh3kbLPuQ%2Ff4ddLgVvNaHHIwd2j%2Fo27FRuKrSGUgxEy70kp9Ci5bE98O95y7NUZeRq6q6eUbhMVOIvYKmn5PdkEnZ0xcDJr8X3OPOSJkZFYea%2BhSOIxaVdfFuDw%2B7LUf1qhHWYoOpXPctpoCiuhVgWlJHxwHIT9ulHYtacJsxZ%2Fc3Urs0TKlGAigL4h0bwNpwHLKKmu9xWSmMVpkOZC8Sb1RfYoIwCz3xioXj22vVzXF6y2vwgsR3mV%2Fn%2Bo2mg66fho5i%2BEoPwUGY6PgBWupcN3vGNsnZwc8IX9TG6BLsqFluGppFzzkT6qFzF6rkYmXdY3qW%2F38bbmm2TtQVNPdqH5l3hwzKM5bjUpDJFs2SiPdKwwqF5wOMjgyidfnZNLnNI1TXHFPTUjlkuhMw5k7v2V0uFPjyNWUl8tMWxUMNq211LsqoKuYRv%2ByGv%2B63DsMPe8k84GOqUBRwcSS6F5fBRz%2Bd2L3a1YFN9TsyWsuTH1qqI4oQDsUYY%2Fr7OJ0kPtNNz68QFuJTB0dERKstG1XwUB%2BkP1JQL9AhLBM6JgMj0xOHrxG6rrVlq%2BdV6pKX%2BQElv3JclsFe9c0nWusrdnHn6s0xn4RJjaw94HqO5Y0qp0xl%2F6ZruheWRMfUl8jq2EgUo6tw66Nj1VzUcZSfr9Kmx3PolJw4LpCmdXfXUo&X-Amz-Signature=b71b0f828816048a471b56d1e6fc122c31469cfa9f86f2d194ac91242eed99a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZCJ3I73T%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T075109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCyVuICx%2F6%2F7LijG%2FOHlXYvWb87PsHpNH9MgKf8WA%2BPeQIgJtkya9YqxIGI0YaUJoZsa0Re47SJHNoMm2dk2UtZGAYqiAQIwP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE4ADhYBkjmU3fhC5SrcAyfEyuv8M2Osfm%2BehTkOo%2Bhg9rbdW010CEPOe9Wl7mfwPRh44X7s2bb%2Bfkw7SW3CYYzTzrlUS0A8bJ1Z2pv11oRezVfNnjgRSIBNrL3PR%2F0NBRPsFhaY1VBq7iFnOC44WaM9QCGX3gi8d555HDjxsfJBc0N0pW1e%2FLtbjcUvKC2mg0LbD6IWp3PgapDjORh3kbLPuQ%2Ff4ddLgVvNaHHIwd2j%2Fo27FRuKrSGUgxEy70kp9Ci5bE98O95y7NUZeRq6q6eUbhMVOIvYKmn5PdkEnZ0xcDJr8X3OPOSJkZFYea%2BhSOIxaVdfFuDw%2B7LUf1qhHWYoOpXPctpoCiuhVgWlJHxwHIT9ulHYtacJsxZ%2Fc3Urs0TKlGAigL4h0bwNpwHLKKmu9xWSmMVpkOZC8Sb1RfYoIwCz3xioXj22vVzXF6y2vwgsR3mV%2Fn%2Bo2mg66fho5i%2BEoPwUGY6PgBWupcN3vGNsnZwc8IX9TG6BLsqFluGppFzzkT6qFzF6rkYmXdY3qW%2F38bbmm2TtQVNPdqH5l3hwzKM5bjUpDJFs2SiPdKwwqF5wOMjgyidfnZNLnNI1TXHFPTUjlkuhMw5k7v2V0uFPjyNWUl8tMWxUMNq211LsqoKuYRv%2ByGv%2B63DsMPe8k84GOqUBRwcSS6F5fBRz%2Bd2L3a1YFN9TsyWsuTH1qqI4oQDsUYY%2Fr7OJ0kPtNNz68QFuJTB0dERKstG1XwUB%2BkP1JQL9AhLBM6JgMj0xOHrxG6rrVlq%2BdV6pKX%2BQElv3JclsFe9c0nWusrdnHn6s0xn4RJjaw94HqO5Y0qp0xl%2F6ZruheWRMfUl8jq2EgUo6tw66Nj1VzUcZSfr9Kmx3PolJw4LpCmdXfXUo&X-Amz-Signature=0a4a80ba3126d24f7861749b4c0c6d5348e13ddcf6d2eccfb06ba38dbd8e00af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S7Z4D5KL%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T075109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIG%2B%2BAHFbYaiSjbfAQjOia3m2Tq%2FIyAwKvRYP90PegdBrAiEA2aUEVmuGftRIdcalCp1xcoQu4%2BUtbquPb6QAkFtqV2EqiAQIwP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHytAGDlaVL%2BiJRY6CrcA6k4I%2FH96zWEheKTEe9yLWwCE5E9ypKpAIXnqcsTexTDlddCxdnj4fgHqxnIn4tTv76i3Qy8bk0%2FtjuL8olMahPOgEO5czhvlmbiDxAQoq7TrLCA6aOGonnrASWbWrjBKPzs%2Fsc36sTOFroIN6uYQqPzpKQYvAsoTTTqAQN9HWPWlZgJL7PsxYoPNr9xmh%2BSI9XxC%2Fz%2BE8xKv0cZ2vwbPxcTxtrHrE34EE9x%2Bj%2FSHi4Kf9w3RKgwy8qi6ZVDaRENGCnGyrcwmQUYDXK%2Bajkw%2FSmj22%2Fg41ehy%2FoH04OHnBM9tWdb%2FdcZWg8PgfQa%2BX5LNjJ785zBTVlvpgYC7cg2SnaY6CmmEtylrTZW5FoN1OgfPgtnQioUSwND96Pdqvm3XSjGDogvODIYv%2BTtktsk8kFfqvU%2B32RgnPXbXVlIxlLdICuPjZqI6vReVRgKG5KxlNK0B3SI3Zr55AxpfqFNLcICIHToQ6oqbyyjw0fDXejQFuq%2Bs%2FKKK0Z%2F10vyxfJ7QE49xtlWO3Tecz6Os1%2FwmerYs22iVsEr7%2BsVVFBSchDE53LZaJMkaW%2FNXqslkTlB2CmkUoE5Jl9oDT7u1E2Fvok36ym2bB9lZjZJchnz4%2FgDsyq0SLchmFmQMPwjMMC9k84GOqUBF2uPDRGx3n0UnepRu6gqOyxQc8UI6ezajkaBNeyBuwg4sav7hoFCtoVyuZ8tAt9qNb%2BIzCBoL62%2Fr5WWoAQgdHEjIhMxZDAAnuyFWvkkj%2FjeuzMpdaL8riDjA4W0%2FHGNqyVxbV52Ie6quGgkDi3C5nqSluXJMvKmFRwizTWPIoZLMTTE7hA1D4llTSdmysqzOGb28OhkItByfdMDaOVgwkQ1Vfba&X-Amz-Signature=b30c6d92a0fd271b82df679bc1a42a3707592a0c29b24e6e475cbea04e6098a8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZKGN2XZP%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T075109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDjGXJmUrDNo6hRw1IaR3gujnqRaZApEkablh%2BCE2e3GAIgcXZ%2FTRa%2FVxT%2BTa4EVvGRclujWN2zh8PmzvVfgGCW%2FpcqiAQIwP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGvNBa%2FDz7OrL7PfaSrcA%2FVHA%2FQWopMbg%2BUlgdRoZWm2GaQqDapt0GosESRAfiX%2BiHZJFy5MSJQ5ZVsVc4oaZpfBK38QRioHMbqzp4DiHVpjqt2hjlFIpA9se9mUQEtHuf6vsLPimmXmv%2BCr9%2BMvtpWbzORACcScqalWJCFpj316T0T9eVHLgI0IAewRU1Vf7EEp2Rs1AN7uFl9mdwNCDuYluN0mXWfFtmmda4WcDL3TOzmd4c8F9E9fNXhSMXg9a2lcDsXEtQRD%2FkJiIPPP65b7iS7dCU1sRmsm4bfxpiXh%2FcWenbgOg4gyt30tz4TSABmVOWf1YgTZxlICSFbuueVCjm6Sw3xJmBDPlwcfPtb4H0KMcGOIjJcppt%2Fo29froNpVLfwH39JZjmuHGVVrpK47okBph97bhG0Rz6uTWNzioNDQEWJtuzEoxlPszXnc7lvYePcuJr3lh1P10X9hoLc%2BCKIc%2F17E7z0BVJYdqNfZzJ%2FxNu%2BE0mxkegP%2Fgw7%2B8Bxpjiidja2obJx6%2FheKnpyjzXD6s5z%2FOWnIxWXM03jyJOiX2mGeimdXHi8ivhRHyO69HHI9m2TSThqnyQgCAOBVLpOUPyeQNbl9%2B1z%2BaDCEEB8ONMliI6p8LEy60KF%2FN4Ix7qNnai%2BX8%2FFGMKW9k84GOqUBoWoOVVj4ygahQ7Pn8SbnbBRFau7N9hKq3%2BHX4KvEYUQuTZvGzCASxwuWzI5i0F68jXQaTK7eLpECNUCp%2Bgs4np9Yvig%2Bg%2BTEFgIFo4bF0lso1E4uubQ0UJAHUd9mVO4enaP70drWOI7qUEVJbNzPD8M6sxu3VpNJjvbt42FI697hwj9juehpGNdWBW%2Fb8%2FP%2Fze9dd5WDeqbwrQCNYAbdFeiDtOSd&X-Amz-Signature=75437ba96ee5db0686b6455bdb0d95c12a6703d62ee0a05cdcfd55f59c0aff80&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WO2RXNGX%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T075110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDgwyUdGnbt%2FkrMC9pGjQWMQbJFHadWGBK%2B7M75%2FFEiLAIgeVIhuhsyDz8DELZR2bkXbw41G5r5XJQ2Fxpbg4F%2B4rsqiAQIwP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGEb29JRKccnWIgFQSrcA%2FIpW53GXa1XsarVz%2FC3lGXbZj%2B2F2ei9MMqfMIDQYErJmotaKIPcPQR6z8EONjt3Xmt2XPzHT9CWpUoIGqYnFo9VXAxuq5uqtX6x0i%2FG%2FewDNTYPWJYdiyqnaomoqmXW6f8ZS%2FcgEZq6KBxjIegKZY3db3SoqNxynEuZvfcvyv%2FTGQ6U%2BaSUPJcfYjt1E32XciWpw7Gn%2BuOEyVR3%2FDm7OalN026XaJQStmolmsrZ2Q%2FTFhkugvyB9yT97GX8JEzJDZcvImoyW5E%2F2lZqtnxZFcp3%2Bsh9LxZGFvjFE%2Fdc1q%2BIA7dLz6hV9jlW6dmir5ml%2BW2qa5tN6n4NneZvk78suq5ERIqxVZq%2BPKruszdWNQtfRdUDqLat5HOdbWVAOqfwVKoNfCpLfUnwveOgG3XltBAazLCEg2T4kGjS314CB8%2BA%2FQOvBiyO8PHClylDsCwZRGy8RVygZJy1LJSeofftd5NX84Z1FRK1xmJJ00mMNEGA7ntXO9ME8sS7DhfJ5WW9Cid5fw%2Bblq2wvE0BZERnN1kE%2BWwI4Ym5wWxI2c2IhJsC%2By%2BIQKDsb18r05w5RP31lv4BYeOOAgsTT6nq6Qmw01nK%2BJ0gMbntsTke1KThtFTu8wIOr21%2BgujbA0YMKS9k84GOqUBj7txU7Tc%2FfzdfUBtAeYUQ6Dch8rmoVSwl5pNi8AOQJ8uOG%2FS42ike6NzqJleVJSGfq6UPGEqgqAhxrKzPCdLkzsgM5hCeuYKzlVaLdnwn%2B7MfmzNtO7c1CCpLmQthPeaio8D391YQw0%2BEi%2F8y6wusYb44GrKikIh2RmDae7rGXAa1Cwu9k4kK346IYV7HdKi9h4sGVLiFlDD12kR%2FvjZQk2L7Ov6&X-Amz-Signature=720556acb6426cb7cfd3b07551d1faa669bd35de14b9140032326965e1582bea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RON2AQWY%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T075111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC%2B%2F8H4cxR8szIedOKezXJFCM57A3awCSghghgXezxCSQIgKoXtfcFWaCdX9M%2Fw%2FwB%2FUnlz7gZ0M81OO0vL4HEjvd4qiAQIwP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPkfDmPaB%2FiVRfGaLircA6oCQqVAvBjdZ%2FYSEoGzdETNKOC0dVsALq%2FHo4jpT%2BXgEV9CRIPrl%2BE6oQyJy%2FhFQnCJ8z1dsV6JCBjSiNHvdBd5RQOzcPiASiHFiHNTv9u0304UuUvJf7trdZLyYnObR7GC7GrKc%2BgdTgoeZbx1LHJATUjBK5aJmiIAd3Kk42LkFWjuBv9%2Bd%2FAIilCyTJVwBuRsxpM%2B8AK8x0ct3C6wq22Z6YYUxL2yWZjUVMQmxOcMi0DlWHFxE0%2BSfppIq1s002SfR0TbQv60F%2Bu%2FsiUedMWxHoLSRVjwm8z9hxEmS%2FQE%2Fb9cZvy27jvKaoYDwKhicmhopinWaB2iCPwkqVhxWQutK%2FO6baBtRoKP7cWD9jhAI5xLcHERc%2F%2BeIpg3R1SqDZrhaYyOExMlr4%2BZamzqNO2Rf5k%2BX85U0vRjZzHVXYgZE6Pd7I4eUbJGsqNLyjEka1tj9dghxSDWKCuwpDENkQGPF9Y8XdCzvq3Fv80Go6LxU%2FSzFyr%2BIESykN5xq6Cw3Qmb7bh0VR4v4eETKZivFvSOfVciLtiQSc0fjV3TMew7ktaGDyL3V5oU2F9Kx7wKtzHykdcqJ5YVoK5NkQPbsaMtm%2BmZmWvrv4k2D8D%2BmDZ%2BxeES1u%2F6%2BW74Pc58MNO8k84GOqUBgm9Ms0ljoY7BLSDJubVVHKudwq4neZhNkggWOffEPpWySH8mOvJzVay%2BD5vZKOUhPe67dxZ3JgNeW16tO8e%2FJldTKgc1mxL%2BALE8HcBAhDeBfFw0zm7r1M6Sufq6bV0%2BKstnDm7u2sswIVwbH%2FI7WcvRlCUi29ooTjAXTwgp8PZhAV900HAolefVNcfiPvlDRHxGafCHpWINSP3N2E40GOfhPAom&X-Amz-Signature=40f4763e3797c454fd093bc2fc999deab8a91c74e58fc1a6d0aba884733bede4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RON2AQWY%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T075111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC%2B%2F8H4cxR8szIedOKezXJFCM57A3awCSghghgXezxCSQIgKoXtfcFWaCdX9M%2Fw%2FwB%2FUnlz7gZ0M81OO0vL4HEjvd4qiAQIwP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPkfDmPaB%2FiVRfGaLircA6oCQqVAvBjdZ%2FYSEoGzdETNKOC0dVsALq%2FHo4jpT%2BXgEV9CRIPrl%2BE6oQyJy%2FhFQnCJ8z1dsV6JCBjSiNHvdBd5RQOzcPiASiHFiHNTv9u0304UuUvJf7trdZLyYnObR7GC7GrKc%2BgdTgoeZbx1LHJATUjBK5aJmiIAd3Kk42LkFWjuBv9%2Bd%2FAIilCyTJVwBuRsxpM%2B8AK8x0ct3C6wq22Z6YYUxL2yWZjUVMQmxOcMi0DlWHFxE0%2BSfppIq1s002SfR0TbQv60F%2Bu%2FsiUedMWxHoLSRVjwm8z9hxEmS%2FQE%2Fb9cZvy27jvKaoYDwKhicmhopinWaB2iCPwkqVhxWQutK%2FO6baBtRoKP7cWD9jhAI5xLcHERc%2F%2BeIpg3R1SqDZrhaYyOExMlr4%2BZamzqNO2Rf5k%2BX85U0vRjZzHVXYgZE6Pd7I4eUbJGsqNLyjEka1tj9dghxSDWKCuwpDENkQGPF9Y8XdCzvq3Fv80Go6LxU%2FSzFyr%2BIESykN5xq6Cw3Qmb7bh0VR4v4eETKZivFvSOfVciLtiQSc0fjV3TMew7ktaGDyL3V5oU2F9Kx7wKtzHykdcqJ5YVoK5NkQPbsaMtm%2BmZmWvrv4k2D8D%2BmDZ%2BxeES1u%2F6%2BW74Pc58MNO8k84GOqUBgm9Ms0ljoY7BLSDJubVVHKudwq4neZhNkggWOffEPpWySH8mOvJzVay%2BD5vZKOUhPe67dxZ3JgNeW16tO8e%2FJldTKgc1mxL%2BALE8HcBAhDeBfFw0zm7r1M6Sufq6bV0%2BKstnDm7u2sswIVwbH%2FI7WcvRlCUi29ooTjAXTwgp8PZhAV900HAolefVNcfiPvlDRHxGafCHpWINSP3N2E40GOfhPAom&X-Amz-Signature=b77960d386afbc5e36d57773522db0d4d948515b6f4eafa978df8bd1b7b15e46&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666RW7VKJY%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T075106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAwFclYpxuUfy7Y8i0jVhIN%2F5uX3gRSOdHL4qw1JXQmUAiEAgwvEUl7H0YWTQQsoKSdsa7jLXT2EYlNLWFk19kwY9sMqiAQIwP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNfs1p578UBxTrLXRCrcAze%2FgFEMeqFKL797fo4PuGtvac7GEWrtD4pweeEwm%2B5KiMnl6gE8vQKK5gU03Sc496gbQkCPKagKbgLIuxAiXnjcUn3bLjIPSpSPDn1QMR8zNMDH6XJYCFKB6f03KwJHpPfoO4HY2WgvWOwhyW81Qn1Wi0WV0tcJBZ6%2BQLRgNMSPyLFmHu%2BR4XklMVm43HWdhmJ%2BXdpVW%2BRMaX%2FySMPoeVhUDUJHIs3%2BVZJtI6pBTDEqWypHqIWhd2lcyoysVO8dIM4lJTLnAXbuQ22MdxCP%2FMrlmg9PGQLS21%2Fe1HFyBMuAs474ppvfCOqE%2FM6%2FuvaxOWtoLubfK5iq8PNVRR%2BLlkhOOMgR2bbUhpDHam%2F8pXQ9xNvoj62UdfwXEjJYiXePmx9ieMBbQJRXJp4FxVThLtKOEmY%2F%2Bdb6XscrgdPEm3076um83z4Zu31uvbo3ubMT0MPjuc01Lic2yPA%2FXcXbjWMbWddNrh0KQDz0TI8Qp%2BKLA%2B%2FWt0cAlB6VXby6DZMj4Am3R04NoxUmcKyYvNulNJuzCxUg%2BDFpkKyZKAdiBK%2FI0BH8TM%2BnJK1Q4Uub4dojL4C4Kd8uoO%2FVccYNwuCEHZWJ4Q76bjiXf%2BNSp1damj0adq2u2pXp4H%2FI8%2B97ML%2B9k84GOqUBwvKLQSHjRqQYugE5MK5u%2BxVYq%2Fyy4sQTAQfHDn5mVOTKvOfx%2F6udvdyDcsTTNI2y5qScs3JoK9MPMLzmM8hAEHJHgP%2FANRrcKxL9V%2BDTBq0YWymzZTsarf7ayMtHk1PfcNq11PGlsQXujg%2FLtt3BQAaNf%2FGY0CKAPbA1NOpCh3YjSirz8OLdd6Z%2BZ5RaKN7BirIU0MSHxGfq0EWeZypmIzDYuAEf&X-Amz-Signature=ced971533c1493ebb7f690fb87ec8a527369966035116fee3cb7411493dd3ab7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJ4V2SKF%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T075114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE%2Fyx4kzlOjkp7hWbesP5myoB2ki%2FCnr1n1rw%2Fn1HUBKAiAkcWaNoYwXGxtFGxGWeLqbn49MWcPEp0eO8BqVDwBylyqIBAjA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMkWw0XR1ARH%2F5G7UZKtwDvLRj0Z9H%2BhktOMHVJ6vVdRZaTGYdOc8UNYbPNw1uxSDCYY9mQA0CdDUcMoQBBVbaVD%2Frsr6bm45hCPrO4mYM798kDS%2F2bTW3RY5Gnm7Wy%2BXOLRvQYcWNJFrqIdDKVPsSueTzS6oiwkrpQkEToxXroGxggkTJtfRxP01mgKl64ioBX0Qwh3NWvuF66K3p3ocvB1HyznK%2FNpapXB6TpAftNTae4Anw8L%2FG0Aq9BPFRQRlddHD3LflqN8vXCESgQejh0jj25ri95jVpDf0jH9irw8MFyMoo6pK891WtFabc2CMkw7dJfiBxLAEHArXBc1elX%2Fzql8r25LDWCwW12jfloxfIwlQNK%2Fw%2FOhvxr%2BmeR0D19P9JaRT39NLweLTLTktfg1%2BLP3LU4YUxi3aeuV9hGRNhPy60T95WlXlmg7F3PGSL8csJp7WSbdgLraWHmRVwPO7xyteUL0GEjg1kdYrB0ikfv9gwLOD%2BOoVFf29kDizE1iHrKonSVsKiE6xUA4TevIYsbwU93PsDAFjjyaJ027EAo1mFYEILQomsbzybMHSMpOUmx%2BN%2BiEkHZSmPHXeVodS8RH6mBvgw6P7pNKC0V1gSsNvFgdrFk2bSJfxO8JpAqPl%2BFb9jbJ4VK18w9r2TzgY6pgFSVmrM%2BR2wDUKTGLgXIBIuZC1SJxR2fumnSL7vwzSC9QbpatVkpVJMyisqSE4ffBrx0GxnUiZWQze2dF2adgfbpiwp62c9jMJID2xBA7lJ%2BcBx9jGr6L0M4nfPxAE%2BKodPcUtR4N4KQoDcIHAh5HSxIyxMXSbPNdZpDTsAC55M2JZEkiZ1lwCWzgY6MkK%2FsgSRoj5zvfD64Rlx9YU4XkQUa79H5P2Y&X-Amz-Signature=319529245793f656be350907bb7182207d131364cc44578d29f08404278c5c9e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJ4V2SKF%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T075114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE%2Fyx4kzlOjkp7hWbesP5myoB2ki%2FCnr1n1rw%2Fn1HUBKAiAkcWaNoYwXGxtFGxGWeLqbn49MWcPEp0eO8BqVDwBylyqIBAjA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMkWw0XR1ARH%2F5G7UZKtwDvLRj0Z9H%2BhktOMHVJ6vVdRZaTGYdOc8UNYbPNw1uxSDCYY9mQA0CdDUcMoQBBVbaVD%2Frsr6bm45hCPrO4mYM798kDS%2F2bTW3RY5Gnm7Wy%2BXOLRvQYcWNJFrqIdDKVPsSueTzS6oiwkrpQkEToxXroGxggkTJtfRxP01mgKl64ioBX0Qwh3NWvuF66K3p3ocvB1HyznK%2FNpapXB6TpAftNTae4Anw8L%2FG0Aq9BPFRQRlddHD3LflqN8vXCESgQejh0jj25ri95jVpDf0jH9irw8MFyMoo6pK891WtFabc2CMkw7dJfiBxLAEHArXBc1elX%2Fzql8r25LDWCwW12jfloxfIwlQNK%2Fw%2FOhvxr%2BmeR0D19P9JaRT39NLweLTLTktfg1%2BLP3LU4YUxi3aeuV9hGRNhPy60T95WlXlmg7F3PGSL8csJp7WSbdgLraWHmRVwPO7xyteUL0GEjg1kdYrB0ikfv9gwLOD%2BOoVFf29kDizE1iHrKonSVsKiE6xUA4TevIYsbwU93PsDAFjjyaJ027EAo1mFYEILQomsbzybMHSMpOUmx%2BN%2BiEkHZSmPHXeVodS8RH6mBvgw6P7pNKC0V1gSsNvFgdrFk2bSJfxO8JpAqPl%2BFb9jbJ4VK18w9r2TzgY6pgFSVmrM%2BR2wDUKTGLgXIBIuZC1SJxR2fumnSL7vwzSC9QbpatVkpVJMyisqSE4ffBrx0GxnUiZWQze2dF2adgfbpiwp62c9jMJID2xBA7lJ%2BcBx9jGr6L0M4nfPxAE%2BKodPcUtR4N4KQoDcIHAh5HSxIyxMXSbPNdZpDTsAC55M2JZEkiZ1lwCWzgY6MkK%2FsgSRoj5zvfD64Rlx9YU4XkQUa79H5P2Y&X-Amz-Signature=319529245793f656be350907bb7182207d131364cc44578d29f08404278c5c9e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46676Q45TFB%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T075114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD0FlIn%2BlgJR8KPlC%2BfrhYGmsq4PJ%2FB9FfPAmZDuMs%2FWQIgcsdTiZOEVavL4I3RJW5X%2FRhD1YAyknqqdiu28rwHnY8qiAQIwP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLAqb%2BZiLSdDDtqyCSrcA3ncRnTZxVjJrzgavTsIPZpYdqInSmhmt05rsaaEKbdeaTyTdHlcmrWrod8q%2BpuPYNOf2FaqFntPjsDKkfwn4iM5C0pDNEaLLyA%2BtSvyf1By7IunLC%2By0fqDK2lynYFkUsjGBdKAf3nKL87UN28v3kAkrHRhb5pzm8bq4DR4EGTsX0tM9lxFQxHgY23PEn0Ab217gINUCRCOhFZhGpurvzZdV0Ti2sqE7eq3Ssj%2FlTuvHMfZ8XEQYq6Zz3enK%2BgTiqCXVZzQ2LuO4VVAfsvp24p3i16o4GPFbRDnWq%2F8ORXfIaP8PfvSWGiWHhrJ4rA4eDllCCLD3S0SMluR8UNeI27w%2B8DoUrFhCosJ1mHrYdr8RX15k63DjDl6nkR7fUjkWyTDu4MBSSKJ6O2oZBSV4m3NrpfxUWyWBuIcOGdRPtU6FBg2K6OD6LHdER1H6%2FFsu1Uah6tGBKqljoBgtlm3GiKqGfHI0AmJvmew52v4DRVumBXNMmD3V9NvUe7Ck1xBcC66UdutiU%2FFF9%2F7ZvPb0XiubwSwQqXa7dcaJWFJ3QM1TuVO2u%2FFwLt0yMyKuFxO3ps5QscjdHxDjd1MXZRUO4t8WnY%2FOn9XFUjJ6qMD%2BqFjp16za9N%2F1FpJz6GXMM29k84GOqUBiuRgRJ%2BAEJH9IhUdagIAJjRkrxXAXP3BTYKmn%2FXdPM8xBGdWnEySuCqQWQfKWEmLyWPUWaAQaYpymWO0H%2F3IJ0w7fyxi2wvMl9nDAgepXnStUiL%2B4wTS3cMimPWyvYcFzkZFmkHzIbBHl0y6XAMA7iJFjGkv6243jU2lwESgaHOc4QpdxB3ubGUFNjrf7aB3TnNdGie4qjuk%2FyIMKSs4K9D26PZv&X-Amz-Signature=9d7c7a248112e4e1644f345702d72860d0110515bbe40126e208e1e6079e74ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

