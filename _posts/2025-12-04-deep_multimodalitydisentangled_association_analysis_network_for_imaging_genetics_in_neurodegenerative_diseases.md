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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VECYCUBY%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T073428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDOImRJOZJoFrMzaz7fBjT8A8iKF0kbRydierkH3mYy2AiEAvZbRNH%2F7WHd2jvxyeHX8QfPD5X8GDJiB0glN%2BhV3yOUq%2FwMIWBAAGgw2Mzc0MjMxODM4MDUiDOQGpLh%2BAYjx5QzqFCrcAzd1fJ8km6FpjlJlNeWPdDuaW5sGWCww3kL4TkcF8916s1NnIyOV8m9sx0HWRCxiW39SywwDNovP6jW0X9hYxdIscUA28kQUgIswbqQ3gznBT19o7CSoY96rj%2BM15FUrwBVP7QbDW5k61%2FQo%2F52qZ7H7DjzhHdtyc2xxexjRBz4nPdDK64w9KWNYg9Zsmi9wQLRrHHpF7d5JuE%2Fb6wCxdrNMpbE0nW580nhs600qVpxiyGUy7%2BeVGd5zGgR0Rr6SP1cx3psJ8S8HQqstC8taYuvAZOJLeE2nsqr%2FfnuK9v8R61%2FYvRBjzYI4ZlCPOm%2B%2FxYSbNZPL22vz4DvM67Kb5X5EGwlHR4UcI14afaMUn0zqBd2ODIZehExu%2FUXH8%2BGylaE0j2RCVn62oytKt4t5prUe0gu66uSKazaAGB2MrCBteloyjbrbRSA%2F%2F9nLuvuYeR51EU45c%2BSVlt1eYCOQRhgM6QPwO7LW1ArYPIdbpHec0ho0XZmGIwEjqi7k6kfaxeBPt85eVeKrbmeMSFnN5lnuTDOWLflyQBcWZvLfX5v%2FRAun%2BcBYfIJw64mdg7vIfywxfob8jYgP1VQMR58x4eRiPrCCyoijP2U3A1Udx5FcLchWI%2FYy5vRYGpLyMLqwxM0GOqUBVF7eprO4yHha%2FcjwfwEO8Q38G9pe%2B0osqxyt2K2jyBse3s0nRVWz%2BkiOvMrrohh5HjOz1DEZxA%2FMHE2kN45dwCOESefzG8vr6b6tmjNKu4ujcmYDTKOgjCDLdETSNEvndReiYGdi9r%2FqZe1BX3MCnj0RoRLrHc75USs2YTzVkgscdLBMfN5ErL6fnNxIct5tTw%2FwHe9L6ZmQCsg%2Fz9WafcrWRWTP&X-Amz-Signature=ebb80b17a0d5a7f53cca071e528e3da2aa89ebec2570dac0841f8c1579ae5d5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VECYCUBY%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T073428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDOImRJOZJoFrMzaz7fBjT8A8iKF0kbRydierkH3mYy2AiEAvZbRNH%2F7WHd2jvxyeHX8QfPD5X8GDJiB0glN%2BhV3yOUq%2FwMIWBAAGgw2Mzc0MjMxODM4MDUiDOQGpLh%2BAYjx5QzqFCrcAzd1fJ8km6FpjlJlNeWPdDuaW5sGWCww3kL4TkcF8916s1NnIyOV8m9sx0HWRCxiW39SywwDNovP6jW0X9hYxdIscUA28kQUgIswbqQ3gznBT19o7CSoY96rj%2BM15FUrwBVP7QbDW5k61%2FQo%2F52qZ7H7DjzhHdtyc2xxexjRBz4nPdDK64w9KWNYg9Zsmi9wQLRrHHpF7d5JuE%2Fb6wCxdrNMpbE0nW580nhs600qVpxiyGUy7%2BeVGd5zGgR0Rr6SP1cx3psJ8S8HQqstC8taYuvAZOJLeE2nsqr%2FfnuK9v8R61%2FYvRBjzYI4ZlCPOm%2B%2FxYSbNZPL22vz4DvM67Kb5X5EGwlHR4UcI14afaMUn0zqBd2ODIZehExu%2FUXH8%2BGylaE0j2RCVn62oytKt4t5prUe0gu66uSKazaAGB2MrCBteloyjbrbRSA%2F%2F9nLuvuYeR51EU45c%2BSVlt1eYCOQRhgM6QPwO7LW1ArYPIdbpHec0ho0XZmGIwEjqi7k6kfaxeBPt85eVeKrbmeMSFnN5lnuTDOWLflyQBcWZvLfX5v%2FRAun%2BcBYfIJw64mdg7vIfywxfob8jYgP1VQMR58x4eRiPrCCyoijP2U3A1Udx5FcLchWI%2FYy5vRYGpLyMLqwxM0GOqUBVF7eprO4yHha%2FcjwfwEO8Q38G9pe%2B0osqxyt2K2jyBse3s0nRVWz%2BkiOvMrrohh5HjOz1DEZxA%2FMHE2kN45dwCOESefzG8vr6b6tmjNKu4ujcmYDTKOgjCDLdETSNEvndReiYGdi9r%2FqZe1BX3MCnj0RoRLrHc75USs2YTzVkgscdLBMfN5ErL6fnNxIct5tTw%2FwHe9L6ZmQCsg%2Fz9WafcrWRWTP&X-Amz-Signature=ebb80b17a0d5a7f53cca071e528e3da2aa89ebec2570dac0841f8c1579ae5d5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666OXCGTJN%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T073428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF02wQlyhMHBg5Q80GTSs1NOzcHH6W%2BxGnQAd0PtzhlCAiEAs1qUo85ZC%2BjWa18gOqmCDz1y7mktvg%2FPAs%2BsfwltTHsq%2FwMIWBAAGgw2Mzc0MjMxODM4MDUiDHSWdRAbkvjHRXckbyrcA9PQHtyAmb9qpAj0i6g%2F0ohTVEmIQFKwox%2Btf1KvmY0l9MiKTe5pkWH6Wf4wrRcuHMjhHiM90YjspBWstIAWt7a3bAiJ6vuhvIkxjity2N8vyBVfX90Noyw4190ANwa4Wa%2F11pnE210jZGoRW2i5OvSrnPW6OL6JWXoKl%2BAjkWJeWI2vNKbsnL7zPWzsmIiGSxI%2FCG9Gicvcg1i00PiR95KqMiUp5UlzLoHASbJvUDf9KSzKznfVdo%2FlsB1I%2BIUjT3Z9%2F4MYOu%2BT91WOIS%2Fcnsw0siUPmnLp2ixWRf%2FHtVInZd%2B7vJo1Fn9gCdyychJVrh4kTZcVGcDhlEXa2BOGupMFhDov9UmN0eQw3H0l36qxM%2BlsV5RATPZ4MROl5SLkFvSRnWuoqh2PPVrsvh6nhrRwc2Yk%2FLCjbSaOUpqZ0ka5wq9dWAdap4eOBwJKPiu%2FGft3RTk2pXn348jxckROJ2SdB%2BuvvRYL4sMsVZnobceZ57cxAxJB5ai%2FgnBAGqwjXWMgZk9nCDq04ToviOB%2BUl1yvBIJk5cRzyQHh8oTEFZfqcv8hJKxR%2Bikf3GN1YUqozQ7xZ9wafkfOfe6uIHUOq3LCtNLGb2Ps%2BwiFO%2B7xEGUl8m%2F6kCkWQaQ0hDjMJ6wxM0GOqUBCH8m89aK%2BLG%2F0tGASyvSTs7FunhA%2F44zD5ohDRp0eSeXMmYfSaMR1RO7Tf0x1ajCvfNKSglbev4EZ2mp4qFZnxfzl4IqYj99Ljg8gZTm4ibwOfnFQIjwcwmV4I6kKnHfrpXrKBHTQ20TkKpQwFozYAgcu244ogzyIA6vz3GbZ%2BvrSNdok%2Bu767gBcjM43r%2FG2oklOGbCgQTWX1XuDH9GpMx%2FgTqE&X-Amz-Signature=98866ba8ef7538f9d23d3478a13751fe8bb5bb425e7e9f3124733951a32a6b81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R42UVAYP%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T073431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDBfBI9RxUz2pCZorSk2yXFE906BdVLZ%2FYD8ZNU3%2FAsWAIhAK6pJHvLzM6MU3SaFrSz%2B9myDDIq%2FxIbvgtvHLRZ7o3xKv8DCFgQABoMNjM3NDIzMTgzODA1IgwJ1j%2FFePfh%2F9maOTcq3AMwVLFA7h3JVaysfukqsWgZlzU5LcFhE2HluG0pAm6Vn4VFRaP0wT37kdlGB9Z9pDcPrVSnvMzDArSA1b%2BPoEyyhpxgex27qJiUqysn%2BdyvHzZKnxberfDvmvhP5L4RapWAZquF%2F4xK3qCuJo3Owd9hS6x0BNnXwHurBIednSDnJbaoLSrEY7RCPGc%2FJznDAH2QlQ1VXHkcMjv1tMgedgxev9FPQRLO87W%2B4WIf4GjXPGCNgPJsplgA11qAeYP4fxr%2Fjcb%2FBOjtxiusyH82NMAhM%2F2McLmeqp1o6lKk30JGBXFQX3%2BYeL9alKCD%2Bg%2FnjwWyqO947S7U8QMOEaTh6EWquU%2FOGRJj%2BAd21JEkpDEw0KpzIM49cEDZoMRYpWpQxQH4SOJJ7jNY%2BhYyIGHY3u%2FX5%2BEaxFI7gmiYE%2F4HXQ8CqCvYPzwspjJkCauoQvxmroR6SxM7RgPGAia96jtZzGCuVnrUICCoZSJdQogDMh8L3%2FK%2Fzv18I1oQyKkQ%2B2I5diRWpRVQiFa0J5EknT2PkWKFhSXwCMgwGDAb5YevfGHET73TvoJto%2F%2Bb6lj1hMTK%2B9Zybc4K9BCcKx%2FRLBHOn77I2RD3fLdj7Z%2B%2BrqpSEOXMCC6vY1qwLPRmtNS1ozCwsMTNBjqkAcG4bTy%2FND4ciR5umSATsyQ4lxDqNT%2FHybjk8jJ3eCP6Z1IfrhKmaOY8KOEqR2UtmNIZvQd3DAhewQUzXy8GzrpXls%2BkHib3%2FQL0%2FgBf4cHRLAd7D7aqyXVPO2NB65q7qSbV7u69BTPYRuQuy%2F31XI6g65akpow%2FPck639E8QMQtplw%2BIdHs%2BjRgEeyGqXiOGu2%2FQCfoJHJHgTCpvu70jTqIoYQU&X-Amz-Signature=861aa4d51981db3413db4f1538f5bead248cfeda8c5881244f483254192f22d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R42UVAYP%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T073431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDBfBI9RxUz2pCZorSk2yXFE906BdVLZ%2FYD8ZNU3%2FAsWAIhAK6pJHvLzM6MU3SaFrSz%2B9myDDIq%2FxIbvgtvHLRZ7o3xKv8DCFgQABoMNjM3NDIzMTgzODA1IgwJ1j%2FFePfh%2F9maOTcq3AMwVLFA7h3JVaysfukqsWgZlzU5LcFhE2HluG0pAm6Vn4VFRaP0wT37kdlGB9Z9pDcPrVSnvMzDArSA1b%2BPoEyyhpxgex27qJiUqysn%2BdyvHzZKnxberfDvmvhP5L4RapWAZquF%2F4xK3qCuJo3Owd9hS6x0BNnXwHurBIednSDnJbaoLSrEY7RCPGc%2FJznDAH2QlQ1VXHkcMjv1tMgedgxev9FPQRLO87W%2B4WIf4GjXPGCNgPJsplgA11qAeYP4fxr%2Fjcb%2FBOjtxiusyH82NMAhM%2F2McLmeqp1o6lKk30JGBXFQX3%2BYeL9alKCD%2Bg%2FnjwWyqO947S7U8QMOEaTh6EWquU%2FOGRJj%2BAd21JEkpDEw0KpzIM49cEDZoMRYpWpQxQH4SOJJ7jNY%2BhYyIGHY3u%2FX5%2BEaxFI7gmiYE%2F4HXQ8CqCvYPzwspjJkCauoQvxmroR6SxM7RgPGAia96jtZzGCuVnrUICCoZSJdQogDMh8L3%2FK%2Fzv18I1oQyKkQ%2B2I5diRWpRVQiFa0J5EknT2PkWKFhSXwCMgwGDAb5YevfGHET73TvoJto%2F%2Bb6lj1hMTK%2B9Zybc4K9BCcKx%2FRLBHOn77I2RD3fLdj7Z%2B%2BrqpSEOXMCC6vY1qwLPRmtNS1ozCwsMTNBjqkAcG4bTy%2FND4ciR5umSATsyQ4lxDqNT%2FHybjk8jJ3eCP6Z1IfrhKmaOY8KOEqR2UtmNIZvQd3DAhewQUzXy8GzrpXls%2BkHib3%2FQL0%2FgBf4cHRLAd7D7aqyXVPO2NB65q7qSbV7u69BTPYRuQuy%2F31XI6g65akpow%2FPck639E8QMQtplw%2BIdHs%2BjRgEeyGqXiOGu2%2FQCfoJHJHgTCpvu70jTqIoYQU&X-Amz-Signature=b2416e64a3a4336f8d678112c0107cf966dbaac5b43bc4407bc7c473d7ba9566&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QIDVKMS4%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T073431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCID6UeBa2z5YZ5lP1WYCbMD22ejbNuVZJhUgasQDnnyzzAiEA1Bd26E2t8RlJj7eXtqwAmLyoc3WBR0pYnGXO1d04gKIq%2FwMIWBAAGgw2Mzc0MjMxODM4MDUiDDYeJmIwP2mFSn%2BUcyrcA%2BQDjwK%2F9gGGNc6FJHFdKMcLBKCmjwUBS1gzUBnB3qTkSEMQUCU9Jg8r4Nd8Onw6VY%2Be6iXbHKUfSsapdUi9YEm9g7k%2F5M1p3r1lMBV81S7QraTPVmMlnakWzY11Zk4Ue4yuh2mhGtlgHDYWuFR4G0eMvu5SHQj1CSE52gOu37sXs6rQylGHXhtG%2FcqFUShGlcIaClfsizBEdpVAS47t0NW9%2BlY63LVZazDH2tswXB2KeesAV0NF6XVGo%2BkQRDmPwPKu9DCn5RJxgbFpS4qmSu2hwmAAEHQaXMsUzE38wiZJFApYshjUO0jK9OEcTfaVY0IpAWgSdvImqJisb1JnEK1QBuJwscGDxomWI7dgiHUDw8WTkuon0fU3Z2qkJH%2Fsy9YGACPtpxyrVlXXEixZWV5%2F%2FVmArmXqFkxkflEmYmH32TuuBmf%2FdvN0kTp1FXwqnfePgVMQS%2Fy1Hv%2FXqq%2FpxDHpBmi6a4DllvW67XeXFEDJuORx%2Flt3KuMg2m2Bg8EYpT46hYxRHfO6v6aLmE8XIGobKIdZ7ojudxQS3sltdchEpTyEmym2qjIKAhn9dp9t%2BkREsxwj9YKIyRbidN0L4vk5Y2xV7h34oUlp6lz4WyzWjNYN%2BVVdelaPERwaMJOwxM0GOqUBLxWQhlAhYHSvU9oq1v1g96b9RGO3usBrfgXozKFoI%2BuQ5G%2FcQQ3SIP0IimbBllOnRWHO82VtpUWRpUbKKyYxf9GwD%2FIAqZ%2B%2BUwizYPDkoab3kfAwYahudDlUh0NapHXkLqknBt1HGqxQ2t7vgbDEg1OwA0WeT6jRDxn6P1MfbwsYWgEk%2BkWjsslrU2BW2AYiqUPIxq9fSNTjwek8%2BdxibLw%2FqZg1&X-Amz-Signature=4d4328db1e31504c2a8386cda248ba313a5052779118024de2aa9ba06321a97d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UUFIOE5X%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T073432Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFM3F5bo4KUIU4309KX3q8N5IdPyB3qTAdQZ2Mld56B3AiEAxYfnwCih5%2FrdcldMxw%2F%2BCT%2F7%2FsAwB2UR4x8Ko8tTa%2F0q%2FwMIWRAAGgw2Mzc0MjMxODM4MDUiDLJ07wMMIB%2BfwfU0cyrcA1aFm4%2Bm0DuEEh5w1xyhKI%2Bf7qRq0ErklNDdDRLIIUukE4%2B6Nrc5VaacbJ56YrnZQz%2BbNDJUK82fzixeHzKcIxO1eLmojuX8Zjm6hJ0krWLK3OyIahXBuQ0sAnvlZ628ZHcAONrCMhRd12h3Lq3OtmBscHyeWF7OADW02xaQY7vcd7Yx6DGRmtTNmd5o9GJZxzMEgLM0xph0r%2B8Xo9AyyiGM57%2BgoQvmq1CeMNivDyQ0ymKQ91ldanzSgSpwvWiGUD6Uuhe23XQ7zEC5EsPORN9UpZPg6Bw%2BC2dPFSmEiarLeCFfVVoV94iSPt6yh8AWSrpfJKnwR7KydcNY2rwWE9tBTsg5HeP53J4uvMNaW89H1BoKW3ZzGcBt0ZSW1X%2FjghtRcrY5oG6ol%2B97vHIJLr1Ai4M11SxZTKZD%2Fqi7WY5bZxuzl%2BWCWlcKxX7bGHjFVAnNqB76VP6PEGxj4tlwwIBb8xpcjyS33RHty24kFBS83zFLmed%2B78SGyZXB6Zw7pJNg8xJEHONueayHmtAPnCVCfYno8ZpWwZ0mKEYoSlr5d6PSi4OWx6YlF2UDP%2BFs6xcb9ae0kzXY%2FmHuvY7FPq1eyy5mOlvzSOm2mPwSVoNvK%2FxDqJIdLS%2BsnHW5MPuwxM0GOqUBAwesFbZZ8x%2BRaxNMQ1G%2FYnECxGYBREfjmWoh2MuuOGF6Hr6GuXdTFbX0AY%2FO9nHC5dLLIhgpgvryxDO7f4lmABrL403gsVMEm5sRg55z43elmOXsLsKx%2BcQsxwED4YcbaL4Xh%2BcRephQqDwMATpBwtUJueXtGaRW9ilWYxJ3NsNvpnPs6r%2BN1b8ZcLQ1L9zk13kSoYEGzFxWG2Rj%2FEZQ9UE2yQzR&X-Amz-Signature=300e04fca17af3882d48e4b71649a2e70b512627eeef0eb6fb5515d73f436fc8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XCAQJBX%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T073433Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCDa5sr1%2FgoBL9gaUtF7k3sl3e2pcgMjIS8p21Czw5%2BlQIgBJ36RNz2m8nilnfsFCCMjkTI%2FdXS%2FhS1N7Ux3CYeyugq%2FwMIWBAAGgw2Mzc0MjMxODM4MDUiDKI6eupnwmEfqHsqxCrcAwR4VP0i7Lnk79WDQ4yQMByTDr4L89TP6AfXL10Kdo%2Fe3rA1mhOkywghYrjwqHGV9Wfl72%2BrrHYcYuxXGSxGfPF0ktOjgk98Bq9hRVyybq0vyo8CEDdfgVh4l6ZrsMMa5HnMLDmLxvVHTaqQPNMjfgPAe44WNn3XxVsXUSjKzqbhAkV0zhhPK5YUzMc%2BdsZe0FaegeIL%2BFaebmWTv58YTufC3BjnAcbqIfJmnSZwm%2FCIg12Vygk6tTT2yBZcliiipWmoYFj%2Fso%2BRqdm35rLK8a7MsqVeAFXZZtGsqAGR2UpYnGOZvqBX%2FoCMV%2FD5Y9niiKrTmyx9wF9%2FMU%2FeImpz1PSYUU8EPWRBErNLh4CcG9oFpbx7AcJrpQOE9AY3zi8EOgXYPPiaD3xPPWGsb7devrGu078K2Tutu%2BqC0n8eV%2FINcy3ifkNVcldbNlefRILS3Xs6IpOxoDTk8QvGkitpNGLXrsQMt4zl%2Bn7zxRuFwewkw1QVkDmDKaA0%2FA2oa2IiIjLEbZcQ6pHVUmjF6D%2BCi70XJ%2Fqpaak9duPoTgaRQHNrluqaPLXNE3wOxxGKIy692f1Yh0EiO4xDT0efwyt4%2BmO5lR6UmDVDXLwE5%2BcOsQWD4RR6jlTFXhfXS8gfMPKvxM0GOqUB%2F2a8f4DxqbFwjea38HgpxZlIxsfMQ3O%2Bkk1459pAjfABRPoBk3LL8b8l8J%2Bh48tALZwUTwTVHFj0gxJUZIHEDgpOUcw5aINHVLkRJxkYmhf%2BVsT86JqXqE4TjbUBEAkw16xYLcL6KZyAFfIpnpkAdWP3YyfVKQyu9Hs3ZVEP4qS2ZURGdoJt1hsPFwRq5HyZ3R4VwKoG0pXEEFtjslb37afxKBHY&X-Amz-Signature=737d513f9b01565aed2e935e4ebedfb0478b69e3ddc44f8396b1a603994911c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VWORP5CP%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T073435Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF4vUUQjgZio94w%2FIW5NZdXk7iQVvEIrj20ynLpTn13DAiEAjBJDj5wk6oK8GJfrIDwdedoIONJDyl%2Bs57MeK5S2m8Eq%2FwMIWBAAGgw2Mzc0MjMxODM4MDUiDJG5NdbvXexA0YxHBSrcAzlfaVCoBigxhVwv7mtZFwplnU4T13fKWTpUFzWaRXbiBGs2uK8CCsvrKCoSF9%2Fh07XAiUSWaIgwelCKF09EuKVL7I1HWk76JL0E0kLArgbAifPNsZSwryaX0aaNHJuFDqkWgzalQpEZjtM%2BKSgQxfy2LfOGq0jRLqsnxVIVwpwrlFHiGZbsRaPbicXTVt5llote5yBOAHgyR0%2B%2B0KjM%2BOoz0n9qnTRDYyBhbwktiLeReKNetIGW8SO3aoPK8n8QV4pahwI2FMVP88a6PzSDSqaQ4710%2Fx7WE7GFFgbLSuJbrNhHvwfXxvIeLenK7Qce1i8ka3xQ9wAVg1zXCHApnrjiYtLFhJdGQwC%2FqhYA6frLJq9DqbBIO%2FumpTrfSHpDlTlV54kyQd3kCDUzktBejErzhUamW0XnZcm53yvVBrQxXgv4bXnmCaQYTtl0gzSV58j2tLrA5wInspvJGPD7oJoyDbFNOtSGCuHZKpBEmnFe%2BA%2BcJz43xMnMXXDVJf52veWv99%2FgaKxVx4Hv0oRn6h2rp8NmOGstDaW%2F5WnHkmhUif9ZQ3uaDKGjZ51WdP1fUDJ512SVS7wlHs5saKrYwGIclcViKZey9B0WjR6X815czOErEoXeHF%2BuZ7cWMP%2BvxM0GOqUBAoMgWXPMvQRXPcWsNlT%2FqVhT0J1O7FaeuId%2B52NHFrNzYJUqFm8trgt5RDz5pRi0LI3rq6TC5wHACBKWbydRT1KcfMQ%2BTUqJX%2BVhbTP4aGnrvTTOwmDUhBCHpOWWST1HK1CEi1LqwVkzt8RPLS3rSVi3%2BHAMqeE6W4XVuqsIiHp5trZlahaueI%2FSWCobNi%2B%2FXVq16lbggGap3dV3wuff5rUXcYAW&X-Amz-Signature=f0a29f51aad02e954b87eae77362822dfc333c7cb507391cc268b55085ec0f38&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VWORP5CP%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T073435Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF4vUUQjgZio94w%2FIW5NZdXk7iQVvEIrj20ynLpTn13DAiEAjBJDj5wk6oK8GJfrIDwdedoIONJDyl%2Bs57MeK5S2m8Eq%2FwMIWBAAGgw2Mzc0MjMxODM4MDUiDJG5NdbvXexA0YxHBSrcAzlfaVCoBigxhVwv7mtZFwplnU4T13fKWTpUFzWaRXbiBGs2uK8CCsvrKCoSF9%2Fh07XAiUSWaIgwelCKF09EuKVL7I1HWk76JL0E0kLArgbAifPNsZSwryaX0aaNHJuFDqkWgzalQpEZjtM%2BKSgQxfy2LfOGq0jRLqsnxVIVwpwrlFHiGZbsRaPbicXTVt5llote5yBOAHgyR0%2B%2B0KjM%2BOoz0n9qnTRDYyBhbwktiLeReKNetIGW8SO3aoPK8n8QV4pahwI2FMVP88a6PzSDSqaQ4710%2Fx7WE7GFFgbLSuJbrNhHvwfXxvIeLenK7Qce1i8ka3xQ9wAVg1zXCHApnrjiYtLFhJdGQwC%2FqhYA6frLJq9DqbBIO%2FumpTrfSHpDlTlV54kyQd3kCDUzktBejErzhUamW0XnZcm53yvVBrQxXgv4bXnmCaQYTtl0gzSV58j2tLrA5wInspvJGPD7oJoyDbFNOtSGCuHZKpBEmnFe%2BA%2BcJz43xMnMXXDVJf52veWv99%2FgaKxVx4Hv0oRn6h2rp8NmOGstDaW%2F5WnHkmhUif9ZQ3uaDKGjZ51WdP1fUDJ512SVS7wlHs5saKrYwGIclcViKZey9B0WjR6X815czOErEoXeHF%2BuZ7cWMP%2BvxM0GOqUBAoMgWXPMvQRXPcWsNlT%2FqVhT0J1O7FaeuId%2B52NHFrNzYJUqFm8trgt5RDz5pRi0LI3rq6TC5wHACBKWbydRT1KcfMQ%2BTUqJX%2BVhbTP4aGnrvTTOwmDUhBCHpOWWST1HK1CEi1LqwVkzt8RPLS3rSVi3%2BHAMqeE6W4XVuqsIiHp5trZlahaueI%2FSWCobNi%2B%2FXVq16lbggGap3dV3wuff5rUXcYAW&X-Amz-Signature=4b0e05a58ff71d2620cddff20dce9e28f3c52855dd2953a5590bd9b5eb78665b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XOPVQZX3%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T073424Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDxB3t9Qy62D2WBg15JsyS30GA2AE7%2FHHrdSKQIXVMXiAIhALn3tSwXdu2hMQBYM%2FNn7nqq3HfiU7PswaIS7yd5MKmBKv8DCFgQABoMNjM3NDIzMTgzODA1IgysvP%2Bi6I6e0yVS3V4q3ANJljnz35rq2gYNpur7hsfYj6h8a%2FeWxa4qvlUpS8RN2Q5dtqecLl8jE%2BLBAPHS30jfFF4sRCB9XPjkmOfSByJCuizQrQ812YuKVmk3k6LdQr8Whq9fAVCocnc9hzRigVz0tfQ9vYL%2BNB6H0MqwCvphoCRrzauimdYsQi%2Bwp%2BLsB62gkbGbwX6VPVIra2zfOvtfVmmeiyvnCszZycVIB9xTzuHCkwVWS%2BRH%2B984XOuK8mQkVu2%2BwDWGjXz6vD91UJo4rdjw66pDW6Ya8zIYRkl3iJOeUDcjXaiFzLIy9AynE%2F3%2FAj9nsCCWlGBM8JF2xWEd0ZaKSGaNAFe8XeasahPEr%2Bml8GqhZhfEEmHgPldwUZJuLbp%2BEOSq4byalc%2B1EkMAOEVoesjfpoltgaQ9j1FHeTrg%2BuMI22bfem1Ujy2LQZndd2EhxgIdNGDBJ1fiHI61ZTXnnBHq%2BrNpMkbMLlAzht4MwzIkh6UoV86VnBSufwPSeeMng%2FwaX6i9QFAegciSfw75W6QCUqtNWTVh0KI5dY681m4dM0h331mJDWSaoG3VJPY8QvWkE%2FijHVNmS3ZJxDIIgcXqohGdR6RidjXu1xnfTU2SY3qEEgvF%2FLW%2BCBitAgZzfrLO5Lms3jDXr8TNBjqkAY5Adbu738M%2BsD%2BGiZIGp2BRfCCNJe5Td9I2uvYeH0an0sJ4eDpg2SZfc%2BYrtIvX8LmclhSvgOVrMrYy3WslBfdoLEZCGg5S7wdUpkAFUTRj6dLyoBouke82veD%2FlDMOtLzl%2BeaBr2XQVqEH3%2BxcgozWqxRWq83BBFCMC8mv8lc4arc5DdC5jgPAoqY9ntzVheEyuzubiOJZec5Z4PCNoyc%2FvxoB&X-Amz-Signature=40f76ed41b10f7a17c0a71ed3f54ad9731c983b2036e8d7f33ea7137ae4fbf22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664VGBMHT7%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T073439Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD0nPdJI8BSd6IildgWQK68XcEf2pYVYjicPWQh8xS7awIhAK3gF0dBuSKq%2FH29Z36dIcF5egm0zN2nDWnqFg7K8IAzKv8DCFgQABoMNjM3NDIzMTgzODA1IgzOKnubYLc%2Bgy3bgW4q3AOlGPUTPuzeJPO4bYifglmYFvfwVAGP1Oxk8D3EPyw7fkqCKeWdy1ZrFRhnepf3XptPS2waV39Ilv0bD6pD6jjpD%2B0d94CwM6q9ydAgktCwUp0%2BippZ2Oey%2Fuz5Ge05ZW8HvfX1KPNDJVY6Fpq0U1bMICUAzbfcvCysy4eEzv4wccRt231D0o0v6fkCr4uXaCNg%2Fhn19Zn7pwkBdwfBl5O7RuWeaR4LAI77UqxufWJyJGypoeQzfStdoR31epDtp%2Fws34pxwzdJlZze1EQ5etvWyZMU66ZkL9Kzn71s%2BHc4o2Dq8Gb2IvuRG%2BXjmUbfFfz8Un%2F9ojoMH6Ncb8vf3r2FpHKfgEf6T5M0irxv8FbUkSTn6Z428dN8wy0P%2BQxB55bstiIkeaWY6FZvKh2w0TcH8u4YAHV8oIEoPVgNcltM7cmmvEnBW8OHLqaUedDjCkS4XRZtQA4SbgtbYNYIGK7ckmhqSiLnowJM1vE5y0kk8KNO4dqBnEoFGWhoddUmQCryQXJ%2FQLtVXaeYtSArgGu2zvqYOQw9%2FLYVTpZe3pdUe78KvaD5Uo30JFHCLzNIDi9GVHRM7anCQBm38C4ff8C2kiKe6gXjV5fx%2FfTAytKFPzEZw9c8skHRJF1v1DDzr8TNBjqkAamIGWWWA%2FeAH53a1otfE8pSASxgA3%2BZmuik4uMOR9rLtGPHjb7JtUjzaOmbYxJU%2F0NvWsnsFWz9ibp90ZG2%2Fhahrn4W8%2F5guwNPZNX1qRP9HIYPBopcZRJNGlVmU8gVGbumLS2OYSX9EIemwG4%2BO8A16ZsL0XVbW3DTVXdX8uklgHNAE2BDDYpqTetM1iF%2FnWYi2hUoIB05FOsKbSiw9IlxPePy&X-Amz-Signature=23bf2f182bcb7aae2f6f7178aa66c22665afcbaa5843001de9ce31fe3eed6d15&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664VGBMHT7%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T073439Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD0nPdJI8BSd6IildgWQK68XcEf2pYVYjicPWQh8xS7awIhAK3gF0dBuSKq%2FH29Z36dIcF5egm0zN2nDWnqFg7K8IAzKv8DCFgQABoMNjM3NDIzMTgzODA1IgzOKnubYLc%2Bgy3bgW4q3AOlGPUTPuzeJPO4bYifglmYFvfwVAGP1Oxk8D3EPyw7fkqCKeWdy1ZrFRhnepf3XptPS2waV39Ilv0bD6pD6jjpD%2B0d94CwM6q9ydAgktCwUp0%2BippZ2Oey%2Fuz5Ge05ZW8HvfX1KPNDJVY6Fpq0U1bMICUAzbfcvCysy4eEzv4wccRt231D0o0v6fkCr4uXaCNg%2Fhn19Zn7pwkBdwfBl5O7RuWeaR4LAI77UqxufWJyJGypoeQzfStdoR31epDtp%2Fws34pxwzdJlZze1EQ5etvWyZMU66ZkL9Kzn71s%2BHc4o2Dq8Gb2IvuRG%2BXjmUbfFfz8Un%2F9ojoMH6Ncb8vf3r2FpHKfgEf6T5M0irxv8FbUkSTn6Z428dN8wy0P%2BQxB55bstiIkeaWY6FZvKh2w0TcH8u4YAHV8oIEoPVgNcltM7cmmvEnBW8OHLqaUedDjCkS4XRZtQA4SbgtbYNYIGK7ckmhqSiLnowJM1vE5y0kk8KNO4dqBnEoFGWhoddUmQCryQXJ%2FQLtVXaeYtSArgGu2zvqYOQw9%2FLYVTpZe3pdUe78KvaD5Uo30JFHCLzNIDi9GVHRM7anCQBm38C4ff8C2kiKe6gXjV5fx%2FfTAytKFPzEZw9c8skHRJF1v1DDzr8TNBjqkAamIGWWWA%2FeAH53a1otfE8pSASxgA3%2BZmuik4uMOR9rLtGPHjb7JtUjzaOmbYxJU%2F0NvWsnsFWz9ibp90ZG2%2Fhahrn4W8%2F5guwNPZNX1qRP9HIYPBopcZRJNGlVmU8gVGbumLS2OYSX9EIemwG4%2BO8A16ZsL0XVbW3DTVXdX8uklgHNAE2BDDYpqTetM1iF%2FnWYi2hUoIB05FOsKbSiw9IlxPePy&X-Amz-Signature=23bf2f182bcb7aae2f6f7178aa66c22665afcbaa5843001de9ce31fe3eed6d15&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RCO43IDK%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T073439Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEXSBP7ejkbtJENpZteSdUfN%2Buctef32XU%2BYV9z%2FkKWIAiBe90JrtesxHRH7EgLVOPCTMefCPpnRvrFWNGFna%2B%2FZaSr%2FAwhYEAAaDDYzNzQyMzE4MzgwNSIMqD527Ro7G8Ii0L23KtwD9uu1D%2FO0AiQo9ZYb%2B4HhRto3dDWnsDL%2FXq1dUOZBfD1O7w2TGYie22Cb5SGHLKQFoyRm3zHFq6rDT9LcGKEOVUkPfIVWunCKrje3IZStDdiWeZqXv8NgQghL1FBZxmU2XEJFxxzM%2F9XFwkAJFO%2BKvlfTq0z%2BdhTZhje1gXF7ms9TLtsesEAfjVBMfWzqkV%2FXXfRAgdoiAT5pe5rD2eTRkLuWoY4GhyBgEVVnOPtWsftUJiUrw7leGYSFUE8qZ88GoHGEA7JFiYSCrQ2bTLFeTwfLlVGDPFuzFob21TK%2BjgyKNDMiLzz0tUh37UpdpNFLV4p6VHRgnF%2FAhklY4%2FtOWu45%2Bs6jq54odr2%2FsPJvvj4CFDUnDcryuBxl2l6boOyZYpYQlwKKzQTzvKCcW%2F%2FtMRwZv1nBZzfsusWVZCBdl%2B2igwUAjSv6SEDm4X6CP9UFZSzmuEr2aMsrDJRuF0AUsN6UahZH%2FrAIia7V3B%2F21DbwMUbymAhTUT7LyF0jfWn%2Fa%2BvQE3ww0c28hbCUd1azsIDcdtBC%2B%2BHPA35Q9%2BXzEgmcdhggMkqZFfVQ%2FLHi6aqSb6dQ5OFEymCa8rrSvzE8OPUfsMQJBatnGcvWNEGvN3%2Fj7o%2BHhjHOVZQBxHIwr7DEzQY6pgEhwBKDT2kgKzy%2B1aGW3Mhst%2B8eIxxg%2FGppnUvLxGJQOM7ersnmi7cDicJUJolkhnf27qW8xA6ibNq%2BG5s2ry8aS4PDnhVHLqm1DEu4rPan4CEyr%2BKF5RbKyluqbyUhOAF253Zd4wYcnrP0IxvgHcm2EHqtILp9vIRd2flL%2BK4tn2cUI6JP1Sn29O0MUMY5eZ5ywRQWbjoDO%2FG9JzI0wwsGIJainplB&X-Amz-Signature=370ad34dc899aaac279952ae8644a7eb76677389fe413e27cc05e62bc4a28a8c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

