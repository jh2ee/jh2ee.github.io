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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VEZ3T5P7%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T173726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJGMEQCIHvInekMHYI6l%2Fe81nDatweNpBXTCtc8JXwE06csroYoAiBcQeMUZmsAzkmNfkE2qmDInIwFRqcKUWvmHUOwwnMrECqIBAjZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM8dZKf10%2Fh82xQ4GQKtwDydD52k6lYlh%2BikHs8lp3KIOmW4bg9fhpIXxnVuN2mXcWx2UXtoPiDF7y%2BWh3PjdgIpJ%2FRRVC%2BpT8sEujIEWGYKWViP4qUE9qIPFFutSQzQ%2BpoZ%2F1gwzDYAn2CTabUBu1A%2BndPMNlFnEWKShrg3OlYrHuO1AYsFxxCFTI0mG2pzPvxJdsxyLtsMqnH6W8yf2CUljFbGecgvUbNt68i5lUPZyvlEB5UTNCrvD1y%2FRWss7ZJ4MBRtwXMCaQTippaQyoV8YMu5L7YUTsAfbKfXHKDmVSteNVgUORdBKmes6vz%2FDakdWDgqxwNtdraQXf8wlDWNK1QqwaIDX0Us8IGuCMKru%2FdVfWPmrU%2BhN2SEh7m89HZmZUq1t5O6KbwfnkTCMhV51%2Bcf9fWLxFiaZDMIqF99N6p1mwSj7iqUmOiOv8XHVTQ61ya4ue6d7Sch0Ieadsh5hv2pvMR43DuAWcR8IHc1CCWcWsfg53bZC1qSG%2FZm1QyEDyIKTxwkIjxOnoIndfbRZjRSaMMaVZdlTwQ7%2F6EaYqMWYRmGywMJwpU1H4n8JHNN1lvyWAAj4G9CNi1hy8c5ONgA8X7GtnyQuA8JKkSRgdgwnGi64cm%2FvNjHpTBdqddgTft4461WrfJGUw%2FbiJzwY6pgExum3ys5WvQydft9fU%2Ffge3XMRkOD4kK3Edd0VQGvFk1qoTxUx7AWsq9BvW4rIPM10l5fmDHmnyEO5CocsG6qNGW8zK98bA2Wbr72ZTb4gWzaUZH%2F4uCKJ4WX4Vn8CCaFuF%2BfzPclWoeChlAKVytLqzJ0%2Fn3vilISur8P7qusOwtI9qjHHPbVs3bHe%2B%2FP8ICmAlWfBPUzNyThdniQebHmQwJKfSK0Q&X-Amz-Signature=73dae99da8ea4d5240569c781eaca05420ddf68d47fdb78131ed3a5069c3a04e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VEZ3T5P7%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T173726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJGMEQCIHvInekMHYI6l%2Fe81nDatweNpBXTCtc8JXwE06csroYoAiBcQeMUZmsAzkmNfkE2qmDInIwFRqcKUWvmHUOwwnMrECqIBAjZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM8dZKf10%2Fh82xQ4GQKtwDydD52k6lYlh%2BikHs8lp3KIOmW4bg9fhpIXxnVuN2mXcWx2UXtoPiDF7y%2BWh3PjdgIpJ%2FRRVC%2BpT8sEujIEWGYKWViP4qUE9qIPFFutSQzQ%2BpoZ%2F1gwzDYAn2CTabUBu1A%2BndPMNlFnEWKShrg3OlYrHuO1AYsFxxCFTI0mG2pzPvxJdsxyLtsMqnH6W8yf2CUljFbGecgvUbNt68i5lUPZyvlEB5UTNCrvD1y%2FRWss7ZJ4MBRtwXMCaQTippaQyoV8YMu5L7YUTsAfbKfXHKDmVSteNVgUORdBKmes6vz%2FDakdWDgqxwNtdraQXf8wlDWNK1QqwaIDX0Us8IGuCMKru%2FdVfWPmrU%2BhN2SEh7m89HZmZUq1t5O6KbwfnkTCMhV51%2Bcf9fWLxFiaZDMIqF99N6p1mwSj7iqUmOiOv8XHVTQ61ya4ue6d7Sch0Ieadsh5hv2pvMR43DuAWcR8IHc1CCWcWsfg53bZC1qSG%2FZm1QyEDyIKTxwkIjxOnoIndfbRZjRSaMMaVZdlTwQ7%2F6EaYqMWYRmGywMJwpU1H4n8JHNN1lvyWAAj4G9CNi1hy8c5ONgA8X7GtnyQuA8JKkSRgdgwnGi64cm%2FvNjHpTBdqddgTft4461WrfJGUw%2FbiJzwY6pgExum3ys5WvQydft9fU%2Ffge3XMRkOD4kK3Edd0VQGvFk1qoTxUx7AWsq9BvW4rIPM10l5fmDHmnyEO5CocsG6qNGW8zK98bA2Wbr72ZTb4gWzaUZH%2F4uCKJ4WX4Vn8CCaFuF%2BfzPclWoeChlAKVytLqzJ0%2Fn3vilISur8P7qusOwtI9qjHHPbVs3bHe%2B%2FP8ICmAlWfBPUzNyThdniQebHmQwJKfSK0Q&X-Amz-Signature=73dae99da8ea4d5240569c781eaca05420ddf68d47fdb78131ed3a5069c3a04e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SEECLGGA%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T173726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIE4PAOBHiCgLp4SZiC1T3Pmoj5hi5YLHc51MUgNW%2BgaHAiEA2DgRM5SRbchxOIKleGG4Vb1ufQ22Ae1ASyZ8tgTeT74qiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDH3QW1D7tHvr4cHnlSrcA%2FQHGGUAlxsdk29jNMxKkAlx7k4NBQnaRSew8lG4xqMiRfFzEKRRbKCGBmf5weJyZWiT7LvNCUmwGgMvGX%2FS9xGEjhAg41DSDZAfGJc%2B%2FJ6ex%2FQnOAIh%2BrrKXl%2FSZ7kAENA9T7yJt%2BcEwWtP49jwSrQtraCJs4hEJ00xlemjh0mwZQ7ZikA11GBlcJ8C7%2Bu1mXLFuz6zJm2z4KeSpmAaGQktTiafJB4XHR7aorMsCJbeL8pUnDxOiaslYRH1q5F0RHDkmxu84eawYUmTlNy%2FlWVTr1eqolOX86W7ZvGIy39M69VqM65ysKqav%2BFJduM5mLXdm9UgAA1Tn%2Fb9bg6tItAv3pJ6AvIdJ8W44htej5s7cweSy3LbfxE00m45JPC0GlEmh0FtzBkkZqzzYw9sarir%2BhlmDtxJvBolKM1teQ087C2v%2B%2F8k%2FjDS9KhBITZbUwp3uxNmaBMQCKQtqnI9MirwoB%2B15f1WBExAFV8viBzowIOzAmzo3nBdnQlHEwQ0lfBgFqIDv5MynTFLmPhLDLkeT%2BtC6mE6FKruvoIZ6I%2B66uIGOcjlfjweIKUwJ4Bs0ayCCeE39KBmgGx58D9rMaPRAfQhg4rTVnZdVU59RImiu0mIE0wPqQAjXp06MN3Hic8GOqUBERfA2%2BbJfKwEQC%2BMGX7jWOhIA8h%2Bya8riK8wAjhT9oJrd0E1Wd1u2j0ZaGSu5gljmaChFBx5dHhNC0tccE14BG%2FDQZvjDTnmsliQ3Yn0ikdatuejUPwgi3KHGoPys3C61MHXv50vTfbiO41NejXVA%2FMYMulHwjlbryTfOwELdMYnkzCSUruCGoWKKkF9hUzXH809oIdWNnCZ8pzLeJU2J3fGRV5w&X-Amz-Signature=2da9f9b669a7bad6a5f2a1cc88cb5146deccc30ebe3261a4542f9526a6be6344&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZOAI45YD%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T173728Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJHMEUCIC3e3ZrgqoXvG0eY0JNO2UoMAuEPV5gBpXkC9auENP0gAiEAkBCHfX99Sv%2BlnxyaQ3V63Pdg9Rw2IjTKs8ADTk4PSM4qiAQI2f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAfuJSudi%2Fsmhu6ExSrcA1%2BUshTP5RoW6fYQw%2FKwPo%2FMm0xXjS49Rll%2FPWTb2XintSlD0v%2FQeQidmdaWYlgOo%2FMGhL2PC3Q6QBrnygXrRpvXxYPMNOW0xJTN4o34dXWbxHH7vpCzT4%2Bsg4XgO2Tya%2FT0ynm0a%2FJ6S0ZVFqD5yStKvH%2F5awbgSpA%2FwQjz95kZ28%2B2kOfXAo8aDxJoQ8g9gf6cdxaFaSr3IdEc5%2Bi8GI54Gm0ow%2Bz4bqEJWJfaGrerPM7IYtw%2BzbVGGIoTc1WwFt8RGJ9npbsdV4cPGf7nmyoBM8m282Ma0h3GZ9ndOOnl9ORiy7%2Fnn3xkypaDGecfwxbE%2Bb0Poih45j%2BFsBnvcklIELY4UvMhQfQ%2FvJm5pcSlSlgxgAqeh5PIDJRdKLV6iG8oHEGW%2FvUIdx3E5elp7TOuHkVN681bRdGMwz%2BudDB0eQJSlOmJSxezckmXY7SVbqag4QBJZ2QpShwnNrhbVZlC1HlXreXDDpI8IZvcaJgP2Qraq%2FZSVrhC3vLsjoXjMa1B7%2BXgIhYhE%2FNqXsAF2cVWt%2Bw4X9yBeL7EYtDCX2hbNIC0qwRKy%2BQ6nhRSgnhUD0AQ5ekjbi3NWHggXjdvvCKYBEcGkBD18bUL2Suv55hRULSJGWDWcXm3HLgLMPy4ic8GOqUBqGccs%2Fm7851SZ1tJXDJbILuy%2Ba2CyT3oFec7iIUkb9oPJ9ybBOoJ1ryzjbrvhVIy8lYnCk61ljyYMDWXAGDEmHWagI7VZ3n2XplPnfJcpLGngQ6myoFZx%2FQqjA4MVUpLMT1iMRROUx2N0xLnUs%2BBu3AKHfRYLInpYWwHwoHqlue7EMYsmnlVBqeAooO9jeUN7IziODpMKDoh7YXVVOutPMsRjqDI&X-Amz-Signature=1f461b95c92f502cef3617556cd592ba7560d12274dce44a39b3a979b4d2a70a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZOAI45YD%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T173728Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJHMEUCIC3e3ZrgqoXvG0eY0JNO2UoMAuEPV5gBpXkC9auENP0gAiEAkBCHfX99Sv%2BlnxyaQ3V63Pdg9Rw2IjTKs8ADTk4PSM4qiAQI2f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAfuJSudi%2Fsmhu6ExSrcA1%2BUshTP5RoW6fYQw%2FKwPo%2FMm0xXjS49Rll%2FPWTb2XintSlD0v%2FQeQidmdaWYlgOo%2FMGhL2PC3Q6QBrnygXrRpvXxYPMNOW0xJTN4o34dXWbxHH7vpCzT4%2Bsg4XgO2Tya%2FT0ynm0a%2FJ6S0ZVFqD5yStKvH%2F5awbgSpA%2FwQjz95kZ28%2B2kOfXAo8aDxJoQ8g9gf6cdxaFaSr3IdEc5%2Bi8GI54Gm0ow%2Bz4bqEJWJfaGrerPM7IYtw%2BzbVGGIoTc1WwFt8RGJ9npbsdV4cPGf7nmyoBM8m282Ma0h3GZ9ndOOnl9ORiy7%2Fnn3xkypaDGecfwxbE%2Bb0Poih45j%2BFsBnvcklIELY4UvMhQfQ%2FvJm5pcSlSlgxgAqeh5PIDJRdKLV6iG8oHEGW%2FvUIdx3E5elp7TOuHkVN681bRdGMwz%2BudDB0eQJSlOmJSxezckmXY7SVbqag4QBJZ2QpShwnNrhbVZlC1HlXreXDDpI8IZvcaJgP2Qraq%2FZSVrhC3vLsjoXjMa1B7%2BXgIhYhE%2FNqXsAF2cVWt%2Bw4X9yBeL7EYtDCX2hbNIC0qwRKy%2BQ6nhRSgnhUD0AQ5ekjbi3NWHggXjdvvCKYBEcGkBD18bUL2Suv55hRULSJGWDWcXm3HLgLMPy4ic8GOqUBqGccs%2Fm7851SZ1tJXDJbILuy%2Ba2CyT3oFec7iIUkb9oPJ9ybBOoJ1ryzjbrvhVIy8lYnCk61ljyYMDWXAGDEmHWagI7VZ3n2XplPnfJcpLGngQ6myoFZx%2FQqjA4MVUpLMT1iMRROUx2N0xLnUs%2BBu3AKHfRYLInpYWwHwoHqlue7EMYsmnlVBqeAooO9jeUN7IziODpMKDoh7YXVVOutPMsRjqDI&X-Amz-Signature=be377c87ecae430fff71cb46d00708014e88e539bcc69217bfeb526d78fdb5a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667N22A352%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T173729Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJHMEUCIFAqcNUJ6tQ%2BzFnEW4p0TP9%2B%2B9UFDkte%2F8x7%2B3SYhn3BAiEA%2F3RI5gVIw%2Bn5mHiu3qxKMsTcOzfB1JFY7HYKXD6tzW4qiAQI2f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFpaSfeBOA%2F6CCtH%2BCrcAwDDfDKZc2Fw1S0AvFE9%2FsOEI9%2FKEDiuaRPIIqJVjCg0OonFvtyVC4sWHdPvtqNjjxEcjNdR73nmUuPcdy9hyT0yHi0VI7PSnpZAC5mLG0AxQAjOTOtFBWd38rOlgBGCQCLKRlEK1kE9bS1Fa5pHhbpxPprAj%2FlenuJtXcx%2BS3OjzVQ2jvc%2BIbTytTEjmY4yByG9WdadJQPe6y51MlKP7aBIjO9O8fzYvnd%2BaBjI80tCgolZ6KMaYXuN3Wjwbpl8Ih1QDHLUqUS6Cwy87qitA0%2FUrCSUwCYfg9zYdBn6DVsiaPYYxNrwfC%2FPCQmrnmRhPMqltTWiialBsINxZ%2FWTJeCyHq4rGN2s64tDMyJlD8dMFoYq0ytC2sVHbcPGh7D0%2BVLIjJgBhowhpcoQs0xC6LEG2SBeqlGkbVRF%2BRLiufAfRvT96UZ9DfhXMWE8AFHLTy4RW%2BaO2vwNVUnGrgv51VNWFGFqM4oDiquXXqJpRgCEGw6PCu1QYIXfhVANY6G8RX8DSiTZX29bjtBRlN%2FKkvTcU6R2kw%2BVfmE6iHi6XHPYbcYnnVXJTSCy2TVtebC68N23CD1mO8l1oGhEIFr%2Fa8mKBb3yw2Z5DTgK9O2AJsrLyCdmTYipcF5x7SaSMP24ic8GOqUBYqANnBYbc1r8o%2Bp9rHMNOsF2zsGj9X0cp5yUYpk7Cnd5pTd%2BG8ZIqg3jQbB0n%2BupclyTrb1601cBpuZtTJ08VIMDa1FxcE6na3Q%2FDerb2KAPaoNOgaO1ZxRRR%2FPexMWUyYJ2TAUfrYRVmQSHwRu8eRYhgZ8neb%2BNyTrChJyJ78UDrpDU8xPQecSy4tSYZivV3%2B6rVV8sz1XOuSwHDiIf7Onz%2F3vR&X-Amz-Signature=94f00b4232b2b274b03b1c07574ccb5fb23d7732434e0421d855e6f5ff363389&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XAVYOZBK%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T173729Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIDYydF69QODfWOS6XBLCp98jWTxUZu03ya9YQl7ihUmBAiEAsXmMtIEAKerbTEs9dKNXawI9MMeZx7ReLm0%2BfCIAUbAqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMMTFciSl4F9FIANkyrcA0uoXhXWgo%2BiTRA4DS2KYuhHzXTHxJuB0siqB3LbScI4Dxn2PaLFS62STHEn0%2B5QXO%2FW5%2BQhk7%2BE7rBmeRzHTa6Owl0FiSNsicerplfyz8NSCxr%2Fu7%2B22ypMP7OqfG4TmfJ%2FF5cuIyx8HM0M00NZxAmitQLtV08pPZ6swyy%2BaWOeV7KcIsHRU3%2F5QjQ0DvkOSvRmP7CbzFY9poEctTLfWYQodh8mPcurb9ujqZugtlvUY1PUCGUqPyYs8zIiEvxzvBW5i0QPbMPDuL%2BG4854VmxWUUXAKij%2FipgN3QTUSCbjHB3eKhp1PUjPY4Zx5VmiRORcQnlwiTCigjTC6TkUFj3A0TCweMZFw5ydoruIUfySiSrl20iY2645135Qj6xudWZqybwH0vVvXI4kMDfURfZfzZdBsKlPwtKLKz%2BF9wMw2WXSPEfyVmSE1aXdZIcruOBcQ2zwrRS%2BuT3%2BLNGX4dMW4jUwYnik12yudFR12%2BOnUC%2BtsbzYiInP7N6U%2BOryJXMWgFb83gyYo57fi3q9ivPe5rAXW3Z1UJcNFmawFxPaeFY665SzSvwu2FAMtTpaaGxRNpOqEHlijArJy0mYbK1zAtN7YfXVqmPGAVreHkLlLOKg2Thyr9tnE5l4MKfAic8GOqUBa9AycuGff%2FrC%2FvdP8CmHauj%2FlbvhJp%2FMggRdg6qj6PCQSOEo402Ic%2FQToU4XtyisPETc1BdVP9VeUsWD8ZEw2k8m%2FWj%2BQLRBJLOponPP6YXJDp1zJglOgQWpch8RzmKXRhy1%2Ft97qdG9NVvhqSCtL3B6L17WIy0csuSrHpj0CKvNOnVoVr5PvuUVPMs0%2F7eN4nV50Q7%2B5hlKtrFsWSAPNOXCfVQT&X-Amz-Signature=ab16fef2257629a4ca4a56f5d4226d2b6f26a9cbc32d6c5dc1691fe95f8d559d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662KT6YNUL%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T173730Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIQDTi6t8x6EIUtib6IhfK5xJHKoHsJ0s1OuQg%2FBG5hdQLQIgVarS5HrqDmExVGIQEcPoc9wFItlzGiA6IQ4qBJ15LzcqiAQI2f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPFEyjUiD%2BOCy33gwCrcA3HrFvqM0zRgS9z1ObASt48un32o5AzCYMbbV4PZDWSLX56OUPNbWGNEDJLoWw9ZGhhwSYWt0UXgOttMEUJnXJxCnrsi4%2BT3MDLcQJEa5I04dwleL8lY2zMx%2Fc6hBt6lbYWHLnOZQ%2B%2Fss3W%2FQ%2FsJ0KoDKyHFj%2FLY5SQSiCPgMX%2B0LZFO93dDb562HnX6ui%2BJYpbqYxRddpPoWOzjSJw7pgVVSP7b76LTyfyN3HfIfd5zb7rVnVgLqWotv81YWSeKfeseOK6PWjJJeNN6%2Fg6FFMooDwZtT7AB31ARw%2BghyRrqvsDQr0LDzAQmCT4XDXTnV4clQsq6DOkpku1%2BHG1lJ3PRdTaUo7CZwM%2Bc0NFJ9L8kHjVfAj9otnLqCjb0y%2BIur%2B7bpmv88jawawQz3c6F7DV9LCn5%2FBuMYuJiXj6G7kDwuxulAQuGDHXSFhSyLkcb5Ppegw%2FcGWBtaMKB0S5sRW5dyaQlYB3gusukPEHjB7JCeCXwCzt091lmCDtkqFHGAQWiP26tGrpk8pRvSMWrFtmSJguaIJrhTf2OXH73JFC0KPE50i5f2dj4klPrqvLIJrbwlNXLTyojeOeLBx4DbQB5ZGgJW5wq7itBD8acseNRrkTfx%2Bhv773SUUDvMI67ic8GOqUBdC%2BzI5kx%2BSV4BI5nUrY5k6oNgofbNrW8n8CGCzg8eoEwv9Ag8Eqly%2BUVRjQaCoEUdWIyG3XlUkf3PaEhiKtySIyD%2FgsxLnMS6bsoNw83v6b58%2BIECKxnstaqY%2BtE0gpZbeJRDG5WTpfft%2BiSWLp6umTUu6mrHVK44jNGSqKI0TO6qEggWgKJAcmC%2BR4SRwUTbaRQp%2BLD%2F90XOUAB9KbXsxb1Zh7r&X-Amz-Signature=a232a154d388eb3e2b446681624af7deac192253e64be8bc25d79530fce2ce28&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q2NYTXDQ%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T173732Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJIMEYCIQCbMdBYpkzb%2FEeYngT1LQAdKtkvcKDLzYwExxSos028BAIhALKosRTLky720DuOgS94n%2FtW5n7JsH9cTvjcgkHpNvbPKogECNn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwZGC4wURARXqaQd6Eq3AO9UJIqOm9TrXnKxYmxJ7b5%2FLAiY%2FeWQsgy9ujq38nLDEbpIvry7fk39zCJm5dwGJ%2Fca3hXRht9UicUrMpyupDYPJjl%2FGCQVUIsOQs4zCFYcJDRW%2FD1iQneNI80jtMHu3tu9O%2FpsnQRg%2FrvGiBt01RINnDJpBdbBBSIBm5EsfhyzKiCZ11pgdLk6xh6rvpQSmqlWPOqsoiEZQtSIH%2BLLVi4f5Qm%2FpGAqPbNDVagEUxKPu7IxqBS6qEWWykIPgnuQiTUFRnOuE5YUmE597Kc%2F%2FWfgAhNYwjRgM%2B6KWJcD8BvMaUSu0zoqa6JJrqEKe5ljP92bj21iX015UuQtdD8TJnGlDhtIMPMwgRHa2HafHCM9slkjiMPAu6oR5T%2BJC7QlBMyOnyxqP3RvjifOdLMzvrtI46EkmZEqw5DFW6UVQD5bdxI2Nuy7UZtbTdY0jfpIDpz4orja28VFgIxX3l6caBan6xGNTekAuNYp4tMjY%2FUzJCpza634QQd9Bq8DI1mJ6Y7YUQJnMQgitXHz3w9G6TPNP4j8VeNd2wPny9%2B1xM%2FYyzh1ZmdQf8LyVWWNxCyVyQjukddYvd3tXKi%2Bnd8EPCYohopMAfknvB9vB8w7pLvPSWzvfs7ShwJ5QW35zC9uInPBjqkAd4C0nmyaJermDeCU9DcgB9hJIcGcFeHK%2By%2BXuUYSVhq3mH%2FoGobb%2BLShWyZK1rk3JEn%2BcI86eDclJUXwgTIbVSGCUrehlaFlzfJaIVrE55f%2FbqOr2noSReWXE22AlNGqrWqsz0rno07v7iyseENtSzmYogxeoFuvbSVFg%2BoxrK%2F%2B%2BETwc4G2rtweA1ZZCjmBSAHQhi2IsPG04nsRB65O1UjOltU&X-Amz-Signature=d5ec71952e94ca91ec476818d5dcc84eddfe00b5f7a9e9fef0735e3254a82a1e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q2NYTXDQ%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T173732Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJIMEYCIQCbMdBYpkzb%2FEeYngT1LQAdKtkvcKDLzYwExxSos028BAIhALKosRTLky720DuOgS94n%2FtW5n7JsH9cTvjcgkHpNvbPKogECNn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwZGC4wURARXqaQd6Eq3AO9UJIqOm9TrXnKxYmxJ7b5%2FLAiY%2FeWQsgy9ujq38nLDEbpIvry7fk39zCJm5dwGJ%2Fca3hXRht9UicUrMpyupDYPJjl%2FGCQVUIsOQs4zCFYcJDRW%2FD1iQneNI80jtMHu3tu9O%2FpsnQRg%2FrvGiBt01RINnDJpBdbBBSIBm5EsfhyzKiCZ11pgdLk6xh6rvpQSmqlWPOqsoiEZQtSIH%2BLLVi4f5Qm%2FpGAqPbNDVagEUxKPu7IxqBS6qEWWykIPgnuQiTUFRnOuE5YUmE597Kc%2F%2FWfgAhNYwjRgM%2B6KWJcD8BvMaUSu0zoqa6JJrqEKe5ljP92bj21iX015UuQtdD8TJnGlDhtIMPMwgRHa2HafHCM9slkjiMPAu6oR5T%2BJC7QlBMyOnyxqP3RvjifOdLMzvrtI46EkmZEqw5DFW6UVQD5bdxI2Nuy7UZtbTdY0jfpIDpz4orja28VFgIxX3l6caBan6xGNTekAuNYp4tMjY%2FUzJCpza634QQd9Bq8DI1mJ6Y7YUQJnMQgitXHz3w9G6TPNP4j8VeNd2wPny9%2B1xM%2FYyzh1ZmdQf8LyVWWNxCyVyQjukddYvd3tXKi%2Bnd8EPCYohopMAfknvB9vB8w7pLvPSWzvfs7ShwJ5QW35zC9uInPBjqkAd4C0nmyaJermDeCU9DcgB9hJIcGcFeHK%2By%2BXuUYSVhq3mH%2FoGobb%2BLShWyZK1rk3JEn%2BcI86eDclJUXwgTIbVSGCUrehlaFlzfJaIVrE55f%2FbqOr2noSReWXE22AlNGqrWqsz0rno07v7iyseENtSzmYogxeoFuvbSVFg%2BoxrK%2F%2B%2BETwc4G2rtweA1ZZCjmBSAHQhi2IsPG04nsRB65O1UjOltU&X-Amz-Signature=dfbc7c3a43f329657e2f47d6b1d109771db5d95fac789631c74dd7f640714601&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663DVX5GY2%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T173723Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIB8qE6ZZPhsnYX4UKOt%2FAx2FufKSnvDntNYtOzO9%2FOqnAiEAsRFUCrdEsAMA%2Bx%2Bt524mH3baS727RRcy3bFXwaS6RRwqiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMBY9PPF0OpnBZHi5SrcA9jdt7fbgcXYrEVx4CfP61H4eCv25CNo8J8mlkfuKQ0ocdEV3Y9bk4AkssTuWZOeTAdBN7r7Bmvvh9jutiEPgECzzI%2FglRUj8ClMcbdSqPFNE1%2FqrIhmIh%2BjwrgKvUdehLY13k88tHLLCtxbUtCGzbXPsEn%2B9eY4Baahojy3cnECYtI0c8RAKS1Dm8JcXIZcgy02az9Mnkvgr91w6M8bX5paldd0StzHcjtcuXmF7j6mT4KlPPS8rx0xMp%2BBDCs33mVihQk%2B%2FVnxtIEUrJwHUvUzY0OBa2S%2Bkoq05GW0G8mveoJDLLR3rFlYWM0Ofw07kgTPvI3lMSlvhD6qTM3RxmIFtAUsOevrmoSs3yW3ybZmLNdcIL6c1gKunzZm%2BFL09vwKpZ%2Bwq1RcPdtSXR1i6CIXFBNlW9AFJ8C6xCXHGXbxJlskM%2BxLLz6dpILHYP4ROhdRHPHjBKxIXQ1G6r2DnqHpQVTdDF7j1OAo6nkMRYCeU5HcxQd%2BkHpsKuHmwZIy8hMh78fzqv5o0EOGgn8LfE615IeuGe%2F6Jq8Xj4Yr2GqU86sEFFE8%2BIm7a4iybpXWSWmEI85wrH8dsdMdTWJhLDNQ0n4cy4HbfjCdTGkh8sVcXSZF5gbaMmy%2FtZc2MILfic8GOqUB4%2F6b9NRVyao%2BznXaEejGO4zX7QT1FQhXUJhn1zh1SObmjs1Uef43VrAhTAghFBdRACpjGSZONjQVR8q4nMDWuwqjUlFEm0m5pWw75bkIPOL36lQy0QCzMk%2FmNCEIhv23%2FEOIS9aw1F6MoeOKxWd1C2wLF%2BwHaAwrOgPuSSS4Z41o%2Bkzga32hB7mX84Bc%2Fwb%2BkeYHh64XVyUUVfTl7j6NZ3lo2vtf&X-Amz-Signature=ebb4f41e16a864ca1072860408c41eae7d8d4a9fa36d6fd911d8c2a346af9013&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWQLEWTF%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T173734Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJIMEYCIQCCKGnoYgLE30XttAJY47hYAxq2Y0Z%2BTR5Eyba5nVUCiAIhAK3G5obtALoDFS80PJ4PkxRuAQMoS57zTR2snkTlaWCSKogECNv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyzCwOVHU%2BJ%2FazAueYq3APTMNf8b%2FBa%2F51vhgaiJo%2FcvfUjrRKxH8ZjBUX40RgjxbkOFt4zi68L3dHsBtFSn0xW6FIJTaM1ik5fGG53c8bdmCKMlDDxXYeL5M59BBIlYS576cyVfrrlcpE5L3q3eknlYsUXC%2F1QmJLU5mMwTYRD2%2FSiRiziYXE7%2FrmWHfZtH6aPExl6BL7DRqxm9a7PvUDCdcOjr9VVc8%2B0nWHhE70u2GyujXKeEGdjja%2FS0VwWtKf3waOnKUAXPqGRVXOrCDzHwfxN%2Fl3MnvRRdSG9DMVXfON%2Bt%2F8roRIu7R2sTSuV4XQ%2FX4JO0FlQStBtf9BjfoQ4nu1MCL0KSyqe1ZavpYB%2BJNCyvsHrfifri8Ccsmgs9nc%2FevsjHGvyLI9SicHEEriUkwWySmKSI7DIkvpnqD8flUvNhxAL3GorJeLwlZMcrCgmJC7i9rcqAW9UZB2BxKNV9Xm2TzlQu5Do0Y1q6zR4mD%2BiuyNZYqEecoEZwlGHyoL7M3FKXRkYSj9swioIeqcKJBya4EvZ1wqHfcpc2hl5LLM7rwbzc8ZQUQeEuSMgKNLSG6JluSunHPkQ8o0tyeBEA%2BUVanlbah0ROcpPGCMgB46%2FRmTFg0C0bJ1HEVdDTDkaGyXn9aDFDi9IIDDR3onPBjqkAWtpoMmhYEuyK7p6T8%2Bfc4ECPn3yTgOm2Blz%2F6u0K2rI07ltbsH87%2BJklvAR8Ags42GD%2FsQ%2FD79z367vLVVP6p3%2FrtJXNFdQBhsegqXHRVFFN3515MwNfoJPMf6bpnThcK0lFSW7qHnZiri7ZJqBPZ2FfmzV834HNC0w%2BmOGxOadWbpIoGqtEob%2FfBACAUhwg8xO9JmJJUivJYxgkAvoHFefBc9M&X-Amz-Signature=7cd4f5bd1a4a4d4366dda5d0a133b5dfae82a92bc53524bd9df0746c5f6f658b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWQLEWTF%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T173734Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJIMEYCIQCCKGnoYgLE30XttAJY47hYAxq2Y0Z%2BTR5Eyba5nVUCiAIhAK3G5obtALoDFS80PJ4PkxRuAQMoS57zTR2snkTlaWCSKogECNv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyzCwOVHU%2BJ%2FazAueYq3APTMNf8b%2FBa%2F51vhgaiJo%2FcvfUjrRKxH8ZjBUX40RgjxbkOFt4zi68L3dHsBtFSn0xW6FIJTaM1ik5fGG53c8bdmCKMlDDxXYeL5M59BBIlYS576cyVfrrlcpE5L3q3eknlYsUXC%2F1QmJLU5mMwTYRD2%2FSiRiziYXE7%2FrmWHfZtH6aPExl6BL7DRqxm9a7PvUDCdcOjr9VVc8%2B0nWHhE70u2GyujXKeEGdjja%2FS0VwWtKf3waOnKUAXPqGRVXOrCDzHwfxN%2Fl3MnvRRdSG9DMVXfON%2Bt%2F8roRIu7R2sTSuV4XQ%2FX4JO0FlQStBtf9BjfoQ4nu1MCL0KSyqe1ZavpYB%2BJNCyvsHrfifri8Ccsmgs9nc%2FevsjHGvyLI9SicHEEriUkwWySmKSI7DIkvpnqD8flUvNhxAL3GorJeLwlZMcrCgmJC7i9rcqAW9UZB2BxKNV9Xm2TzlQu5Do0Y1q6zR4mD%2BiuyNZYqEecoEZwlGHyoL7M3FKXRkYSj9swioIeqcKJBya4EvZ1wqHfcpc2hl5LLM7rwbzc8ZQUQeEuSMgKNLSG6JluSunHPkQ8o0tyeBEA%2BUVanlbah0ROcpPGCMgB46%2FRmTFg0C0bJ1HEVdDTDkaGyXn9aDFDi9IIDDR3onPBjqkAWtpoMmhYEuyK7p6T8%2Bfc4ECPn3yTgOm2Blz%2F6u0K2rI07ltbsH87%2BJklvAR8Ags42GD%2FsQ%2FD79z367vLVVP6p3%2FrtJXNFdQBhsegqXHRVFFN3515MwNfoJPMf6bpnThcK0lFSW7qHnZiri7ZJqBPZ2FfmzV834HNC0w%2BmOGxOadWbpIoGqtEob%2FfBACAUhwg8xO9JmJJUivJYxgkAvoHFefBc9M&X-Amz-Signature=7cd4f5bd1a4a4d4366dda5d0a133b5dfae82a92bc53524bd9df0746c5f6f658b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z62XABBO%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T173734Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJGMEQCIA%2B14pBgwAdn9%2FwixdFIQLwEekuloBl76%2FYveb21lNKYAiB%2FBxT%2Bzok32q0644tUrPtzcKsWAgkV%2FoJG3pPqgDmQgSqIBAjZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMZdvLfZRTonP5V3LPKtwD1zqHyesx%2FEoAyZeD%2BVssnN3mXOMVFxcbu21QlO9xYC2k8YOVYhNFGtXbwQr%2FNRcn6hJIo6kExcq9CsdrvXaSYMdgUc4b1a5DolZdA%2B4uEU0Bka1XLr0rGZiRnWlAq2%2F%2FAKW21CNBdhH%2BWKCjK2QIQxGExfUp%2BFxGWNCoHhS%2B0%2BYw9yAhby7H0fmHxZZLXCQx3ErIto9Aus7UsFxNWlgSnWiJ%2Fb8entJlRqCtasTL8EV7q91ySHQhd7Okh5sAnufc5SbjRlpnr7xlq9nprhxgIgto8U%2BlBsdmfr2PWz0T3tLRorevxQiYJofe2ceTDpjC9%2BGXqyF4sOL%2FDSnYKfZBAKrVZlIGBrm%2BIhIae4ANcyVIn%2Fvc%2F2wRNxIDPQIL1f%2FLkTzalzFxtc6plDzsr93BRXzJlwFX%2FQgJX8Ab9sLWEMo24S1Bs291eDud83LMbiOLCj6RAdOMxV4itqX0NI35xLUHdU2oIAalbIshz0A7WIgc3PTGeXvHlhwHigFccPfvdq0CGjij%2BNRbKcoyMwx%2FEhQ2HQCYZ%2FIwRbOBBfoYUOEhRUhcMXsdZlPUAUDAeML6G3vuM80kGYUf5n4Jb6h%2FA9L2xW5Yn8FLQpbLSBIrdy%2FBPjYXuSQ7nHpw8e0wvLuJzwY6pgEN0XjjHGqLR38lSUS4h2pxoqi57IYv4Eh4%2Biok0K3xh21haqG30QEFXGGa1aZO9dn2IHXeKBg6elD0YPh0RsiwehQv9zmn4GQ5Uo8Z4tKplxJfgFyhRiHNVz7cDgefFlnZZA6sTWz4Mf2xNTABeM%2FOtxmDnVaf0qaF9OPJpQ4%2FKEH1yv6mkh3whAwewU9NTGO3pauYLnmwRzswvIC%2BUClO2aCrDnnx&X-Amz-Signature=72f75cf614c432f209968a39bcaf8d6ba069f390ebc66145f4ea26f5ce5ed227&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

