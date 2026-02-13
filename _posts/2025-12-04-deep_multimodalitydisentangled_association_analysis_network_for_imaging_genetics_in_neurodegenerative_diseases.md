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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663AJBT2D6%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T093044Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIDa701K8fXXFhglzRFtR73fL%2Fo9ty2eyt99fAJ9gvlIxAiEA1gz%2F8D%2FOnqyQMAkvfbFOvzTW4q%2FS9QnM%2FPSoChAFr6UqiAQI6f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDO6cr%2BuIlViUegmmqSrcA0Zc3e2%2FsBl1nuJ%2BpBo60zp8WolY0cL%2BxAV6Rrf9BP50CElBYsNQfX1NMsKzXDbmFlLXW0Ze3DzQA3BSX0qkA%2F63FhV19wXxXgHjGunhXxHWIFmt9Ora9V03YS46XbuV%2BfodkSsJOnm9NDV%2Bj8yM9vWw7LpsMpWAMe7E6upfwUcLpi7bDLpIRqLn6V7WT24GWtRxAk7JeMf0S8Dmi1JME9iMN4RCyvwDuBh%2BhlasljEdYb7GAus3l0Jp1rqZfij%2BXb3obk6qCO4XSHQGYqNGij9u2S7Pj5XP2Ij2ES8Z1zoki9hFO0axAfPOab2MyKw9uV%2FkqxZ1tcflH6SYmBTxxHf7hcMSxj81Ubosua%2FlmyHreB1Mm6qXcT1KtJhSZPS1Zvoy54Ezn%2Fvd9vkcFwZAcm1zC7hqg2fUcn7z3iCKteYGR5Uxc1ta0II3SbPTIKVRlS%2Fh%2BkLi%2FxkNpKSBGoBeh9M0jt%2BiFt8YdxxlEmEv2gezurwqPL%2Bj16YDMNxlI1tBhcLbb1pmJ3hqp9fK9X3ur3R1oX7od4bn62iqaNayoimId4fCGyhoujlqdjQyKzUJnphafKCNylrXJ9DDp0ze3yWF8oFKB62yQMt83KcEhg56qqZ3qCQsEtb3m%2FBoMNaju8wGOqUBapsWwsXlhvreqMw0Dw%2FJqHkU%2BD9mEx%2FElf21jcljunnXp058yzSUr2uD6YKawTpdKigF4x7QUQapG%2FXeklUTrfSidxPpUCClfYywXzhPliIxDCqlPBXDi3YMkvp8N0UAkB1jGse7%2Bq1LL97ffalO%2FXsfOcMdcVS6JmLUrOyZ6eH2f5M%2BvLU9TDAeyvbk%2FWSMzOVFL6qmGZvTn889KNcJfTcKKvo0&X-Amz-Signature=213de8c8276577c97937e174c04602d4651476293770be1d849766454a28dd36&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663AJBT2D6%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T093044Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIDa701K8fXXFhglzRFtR73fL%2Fo9ty2eyt99fAJ9gvlIxAiEA1gz%2F8D%2FOnqyQMAkvfbFOvzTW4q%2FS9QnM%2FPSoChAFr6UqiAQI6f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDO6cr%2BuIlViUegmmqSrcA0Zc3e2%2FsBl1nuJ%2BpBo60zp8WolY0cL%2BxAV6Rrf9BP50CElBYsNQfX1NMsKzXDbmFlLXW0Ze3DzQA3BSX0qkA%2F63FhV19wXxXgHjGunhXxHWIFmt9Ora9V03YS46XbuV%2BfodkSsJOnm9NDV%2Bj8yM9vWw7LpsMpWAMe7E6upfwUcLpi7bDLpIRqLn6V7WT24GWtRxAk7JeMf0S8Dmi1JME9iMN4RCyvwDuBh%2BhlasljEdYb7GAus3l0Jp1rqZfij%2BXb3obk6qCO4XSHQGYqNGij9u2S7Pj5XP2Ij2ES8Z1zoki9hFO0axAfPOab2MyKw9uV%2FkqxZ1tcflH6SYmBTxxHf7hcMSxj81Ubosua%2FlmyHreB1Mm6qXcT1KtJhSZPS1Zvoy54Ezn%2Fvd9vkcFwZAcm1zC7hqg2fUcn7z3iCKteYGR5Uxc1ta0II3SbPTIKVRlS%2Fh%2BkLi%2FxkNpKSBGoBeh9M0jt%2BiFt8YdxxlEmEv2gezurwqPL%2Bj16YDMNxlI1tBhcLbb1pmJ3hqp9fK9X3ur3R1oX7od4bn62iqaNayoimId4fCGyhoujlqdjQyKzUJnphafKCNylrXJ9DDp0ze3yWF8oFKB62yQMt83KcEhg56qqZ3qCQsEtb3m%2FBoMNaju8wGOqUBapsWwsXlhvreqMw0Dw%2FJqHkU%2BD9mEx%2FElf21jcljunnXp058yzSUr2uD6YKawTpdKigF4x7QUQapG%2FXeklUTrfSidxPpUCClfYywXzhPliIxDCqlPBXDi3YMkvp8N0UAkB1jGse7%2Bq1LL97ffalO%2FXsfOcMdcVS6JmLUrOyZ6eH2f5M%2BvLU9TDAeyvbk%2FWSMzOVFL6qmGZvTn889KNcJfTcKKvo0&X-Amz-Signature=213de8c8276577c97937e174c04602d4651476293770be1d849766454a28dd36&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46645RCTPGJ%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T093045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJIMEYCIQCuToUVGnLTfT%2BhjSaYDRsE9E3PuYUvR5%2Fdon60EyDIwAIhAI3p0%2FXP9SspA2OInW%2BpqZIiV1LdpEvF5DiBmhbmVrbbKogECOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxucrFd%2FUZmD2R8zW4q3AO1D65%2FBfYVq6GtzMzCcF5KKbDTH5M9iIj%2FPJckbd2musjZHQej0fOgXisRZGMOAEC0WZ2cBus3w2ZCnQyrU0%2BhOyqRwiPKPYb475HEZDo5tl9Ut5ZOJSVr%2BteQFuo7jJYUVxZC0nrXKo6D9UXWOVNPm4umSAAI%2FK0Hd4wDINHGT2iiktiQlmvn%2BrESqEkWDsGG%2BQXr1lhd%2F8KeTi3C8DULq1uh64nimE7%2FAs6FVEINnGnketnWavWK9JijXYkeO8qMSKaYmGbH9KMLKoahDAonnwmD9B1t6UucJVfllMH0YWyGU1mAPrEd%2BGj08ejW%2BGlptZ60n1hp1hE1MskIevH0VWZCdmBO1ZgivlY5FX%2BJkRkRNfi9QKRWU%2BAt3G54ZzMUJmeeeUfzCGra3X7eEEQRj%2Fvck2kPmOfgIfpk1FQCbBzkvF8hjvF6cGHxmd8unIb2pQLC9H7%2F5bkBuIuDR1wJtr4bwEfTwbcQy8ZtmZDJ4wPAK3qbafqqDSCsTbOIBSH9f87bOqU1A%2BxV3W9o08wFbrQ6%2F74KOeODSSNSIUb4S8eCTwiN5L3sHIffqW6PrffQZ3IYo43BR%2FP%2BYvkYpN%2B3g4PWeJb0S6xVXKE5z1Evr664lJSkdY%2BMX%2F68mDC0o7vMBjqkAUMP8kKfx5lDGRHohnzxXNG4LAXzJMD39bhnBE34e4WByH0QDy4Jzd5IajvgTMrnvOp4WcnozwHpTA1vY8H%2Fc3rTwxKulPD6TOXGCNGrkCe00pUUVnhATYS0iR3UKkPIzZgovbYtHgColzmOvnqoPRWg8TCCaPr2Bbr%2Be3e%2BSpipdSUZO8mqjup041D1tiI6owXcFtkIBs%2F6iXggE9%2BwAgtdhl9k&X-Amz-Signature=0005d86ae7887e351cf2c377b7f66cb97abb2e92056e6ba192d8455e588da4a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VR6Y7XK2%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T093047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJGMEQCIAohVyXhN4x2JvO4YQTJUw5bobfUIbbcKHqSRfFcMoQsAiB%2Be8sn9Qf1W3KX%2FJGSsqnUwWDj92nbpFwUACb3VOpIgiqIBAjp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMWpT6BlrenbGCTgF0KtwD4bImu4rqSA19BpyHxwJyujcCm57ml4EfWttzvtyRMdEz9T6qZHz9l6cGc9alJSDNyHUuQ0pbskmYZ%2Biq0EwN0rO3zYpMZ1i%2Bxlc8HoiLBvOucDeV47XLVhUT1ERZ4qZxi%2BSIE4cY%2FozlJaoyAgcDKi1yf%2BFbRTX5D8pmbXIXanzGGBWeDBmFHRFhLVSZkzdjyRnVyWSxNjIcQ2l5dqQw6atXj0Vk5mPgBm5jELujZjpHxNuOUd77oAFacN4jWEhY5D8UZDZkDubnqM0f8BynCOSAVKKyUEq%2Fiw15%2FNfqSWPKAF4RR%2BbK%2BznKPDF7vhHZDQcR4e%2F51Q2ZyWN4eSHvH1sE%2BDTL1gpoRvfNUG8d3VLP4S6Uj34BjdNW86zb1wtVg7ZoHHeBT1e62iyvs4Z%2BvI6Vy5cVsOk6EsbIlABvjvcsEp9i72lpub0S7h4Zfaml9RcKAL8Bq2QaO2%2BgNUrEU0zcP1PDNknAfDEuV6G1NRF6mtLFETG3OYvYQUfwzXGyEYWLKAeqfKrZhZuEvf%2FiJDJql8SoWqdPsB%2F3mdx2s57AiiIU%2BArA%2BS5LCs2sclPVQjTwA4nN8OiPFeAYGeF7HOMPBeCgkajrz0nr3pFGcLzv59r2h8s5A6KCIwQw7qK7zAY6pgEN2M3UQVtlbnbag6N647P5VETzzIcDOz1%2FmXjHa5%2BoQl0YDJz8xyD8jJFQyV9OB09rI0NhkXgHLo55mXLLlrEI0F4MXOP7MjkB2ubUpE4RY35Glltuapvo8suo7YpVvoMObhn7SGjXCJcXtrFusD0auykXscCrb%2FCzdj4rjvBW6E2Rh2tQajoWPvAnwqEPLqvq2Q4kNgefijvltCwRw1ag9Bs0HznU&X-Amz-Signature=4ee3e72b50c658e55fe625355baac6e78e2c2e3c43762839eb7a70a4a58b873b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VR6Y7XK2%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T093047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJGMEQCIAohVyXhN4x2JvO4YQTJUw5bobfUIbbcKHqSRfFcMoQsAiB%2Be8sn9Qf1W3KX%2FJGSsqnUwWDj92nbpFwUACb3VOpIgiqIBAjp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMWpT6BlrenbGCTgF0KtwD4bImu4rqSA19BpyHxwJyujcCm57ml4EfWttzvtyRMdEz9T6qZHz9l6cGc9alJSDNyHUuQ0pbskmYZ%2Biq0EwN0rO3zYpMZ1i%2Bxlc8HoiLBvOucDeV47XLVhUT1ERZ4qZxi%2BSIE4cY%2FozlJaoyAgcDKi1yf%2BFbRTX5D8pmbXIXanzGGBWeDBmFHRFhLVSZkzdjyRnVyWSxNjIcQ2l5dqQw6atXj0Vk5mPgBm5jELujZjpHxNuOUd77oAFacN4jWEhY5D8UZDZkDubnqM0f8BynCOSAVKKyUEq%2Fiw15%2FNfqSWPKAF4RR%2BbK%2BznKPDF7vhHZDQcR4e%2F51Q2ZyWN4eSHvH1sE%2BDTL1gpoRvfNUG8d3VLP4S6Uj34BjdNW86zb1wtVg7ZoHHeBT1e62iyvs4Z%2BvI6Vy5cVsOk6EsbIlABvjvcsEp9i72lpub0S7h4Zfaml9RcKAL8Bq2QaO2%2BgNUrEU0zcP1PDNknAfDEuV6G1NRF6mtLFETG3OYvYQUfwzXGyEYWLKAeqfKrZhZuEvf%2FiJDJql8SoWqdPsB%2F3mdx2s57AiiIU%2BArA%2BS5LCs2sclPVQjTwA4nN8OiPFeAYGeF7HOMPBeCgkajrz0nr3pFGcLzv59r2h8s5A6KCIwQw7qK7zAY6pgEN2M3UQVtlbnbag6N647P5VETzzIcDOz1%2FmXjHa5%2BoQl0YDJz8xyD8jJFQyV9OB09rI0NhkXgHLo55mXLLlrEI0F4MXOP7MjkB2ubUpE4RY35Glltuapvo8suo7YpVvoMObhn7SGjXCJcXtrFusD0auykXscCrb%2FCzdj4rjvBW6E2Rh2tQajoWPvAnwqEPLqvq2Q4kNgefijvltCwRw1ag9Bs0HznU&X-Amz-Signature=0233d23c3a24f59ac3f227e6e41dd4bf41f86f8e40e02a50bd565a36886489f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662PXOGQM3%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T093047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJIMEYCIQCZt1CWLyUut%2B8TsguKS30XtcriQg%2BAliTYSANVR08mewIhALM8zbxSoL58sqZM9cP5lAPyGa9ftCcTW7K7H%2Fft%2FNKBKogECOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy3twB6acrqxu07UuQq3APHO9%2FtOkO2ZSIGxUkItNw36%2FzFgurlQXWLPcViKb17E9PDBUWT9KXAhZyOkQo5ZeRzRRVLOJMNUjJ5kdUFi16dfQpQdbL7bRyEYUQsKe1sWLh6%2Bs7v9z2EJ5lqbCCKkag9Owt7e3R3VLQ5X9KMrT%2Fm4oCE5zO50Qk%2FejrA0RpEaQFgHXG%2Fq9%2FvB6a3zgtpZ%2FolvcV%2BjO6c1ZEqF2Zz4VpSB4I1%2BEo8afWukTKo70mQt4ppnXP%2B6tPe6KvjioeDLL5ZLExgbEn5Vml6oKh8N7GXvHrDGKWofe%2BVNUu3C%2B5NlegTCcgH0OlPcS%2F3izi6hCeA6AT42UkK45rBqVbzQyU60LOoXFzf9Zc4mvv6ApzK8CbIa8edokqfgYNtNnt6WdG2XQDzEmHmmhFGfW9TRNT2kACyPsgjwqU%2B6dFYqruk6sZgvQqgiyGrNlwlQC6Jw8nubbJVmE6U7HgHFzyJDY1b84lu5hBZdpv%2B7CVR2EVZIx58urbqNXERo60IcqLkI%2FYTOm3hmUgsLH3iw5u9b2I3dWy9I694aMD%2BQe44bpGIG9OYDIcLwPtEIud8UkY4oNDWYYMoaXPmmMNsGyFOGirc2Yovo2ZoB%2Bjg2X5BcptImIg56R0AKfP7dlwhojD2o7vMBjqkAcCDEjni1A59%2Bqn8WH3e5OrO8%2BFQu8ULFXPCyTDvsjV6Zjfqp6EBL1ohqslqyNGbAZTvI4R92jFwgpehVqaHouztSflR5q5OqKfLsYxZz2%2B5z09UiRqbWJVD4UYpKuorxGI0QQypoqwwwm83F2uitLTToxOVFzHur2sTK9xKIyDyXzO3eFLt1sj7H05PqkbHoYe36noARThvgke5E22PjglR7%2Bln&X-Amz-Signature=ec19084aa7d98f154e365b4eb752a8528c27e3a05a3742d0f642eb5996f1b212&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667YP6RDXH%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T093047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJGMEQCIHT7YhvD8kW%2FXsIUl1m5WE6wriUZbXwgm5nIBqMk971mAiA8%2FoCnpNHb%2BYsxlx0%2FNFXkAGpY7npK5k%2BZRRJj1sFFvCqIBAjo%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMvBRI%2BacliNuugobbKtwDdkrb7x8ilyfgiODnmDv0HEo3WQrzZTG%2FuIMoK1GMMLqZI6pAZSkdsZA73W61Z%2FdokGKHEQr2RVtLKns%2Fe4nQObR8r7xyz78I4%2BVOmkH%2Fww2zJeXCE1nUljoIwRjmpLAZsyrIChtwEqOkeqxTlu4kjKrcNbkxUjHeSZH4biRujZR4W0B%2Fj%2F0d4zVvwvpmLNu%2BLytJBJgx3m7zG03ZnDWmqsORw6yiw%2FAOxn5zU6sABMYWN%2BA9u5ylFQGTJYGlfUz17R9uewh5yccvQ%2F0AEHPDlUm%2FZq5MFnuxW6Jn6lbqNkKbKrUWqV3qNGrpfyzb4RvPnXBkBpG7MREjmXW9FE2NazQg%2BVBQ2cDoaYpdaznPY21rYWtgmGtBmcDaCwoHtv0yOQpJrRgpwtWgvd%2BMa%2Fyz5iC7g9W08a1hFXpJn6Xrhhn3rm29qzFfj100uAzGi9VjbbcIZerpD2hZiUaOGcTR%2BxUs4TleED%2FKdJVJbiasqVuWQlecBmtFWcSJzeDU%2FBk5Nuvfb%2F4367lMl8S9BfZNqSoTzkwGvMha0qakbnlJWTHKVT7Sa4zP4WqAffg429d2uvqoq5xEbEVPsxwmSeueF77WZlkEMZYnRhAGg4y5MRO%2BOJ%2FmokTFpKiu81YwrKK7zAY6pgG6xyJbUie5zW0RADK5UmqWlYyJZquHP%2BVKK6187IL%2BAF7tg1O4G%2FUYYyvQIpfEgja1km5FqqwZ4wxjL%2BzvonfoOjVz9TUuSNC%2FSJ5NUT1ayIS4k5PyfySOEGM0N9YUTq9vQlUsGF1Ec4uSmZyltbj1%2FAPTL1rMn1%2FtYOCQpaQz1chJpsKnd8D7yd2jJXfF4HUvUyljvUUtsXrLdz5dI4EeFQBd0asW&X-Amz-Signature=907d09de32c22114d2131a51e2c59e92a2c131bfcead4606bdb641b996671497&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666JO6M6Y6%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T093048Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIBh2wejYpuiGKPfgGhHBc2xtB3Sdm1WPmhEg%2FYENQ1KZAiEAuDu22MYN1jBqATEZGbP3YtC08jCxSlfsqDMdgLkWDhwqiAQI6f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDo4kuehZS16cYsAGircA8IYyJrAGw8b58riLHxNt9bABroRgEmOTFL%2FU%2BTDsrZ8bTvJqL7N1VYuWasRFWko%2FsgbhFpw3D3REtbzt5TxpaxIFVNhosb4cl%2Bay%2BE9usIFMBgiRhih8Tq4qEBvAoxL5Si1lgGcOc3G8iESsTt%2F1HtiGcjCexuH3%2FfIb0rsRS7wrZkHhAtE2%2BJZMKKnkEmhtQTpcoe73v1%2B1t4K7gv2iMkpJAc1qevWDeHXcNveB4NuTLcz3QkA9R5HCSiKAESh698KmfYDOdb19niQhf0kmDv1zyy7%2F1%2FTxSIzhl3judAG7yjXWN2kDywi1gymVNmgVWLn293dxUu3sNUTSjxMRD0krHPqxOw%2FdkJpli%2BrjbzUPLKAh%2BBCGTHB3vs4wMozrNG39zX%2Fo4IQpaZ9e9NF%2BrlYpP6lr%2B2ZiwKt8AErd4yUEfo0Zw2m8GEuK5xZAOgGfpS%2FsmupF0vuDidZKwBw1iin9CV4T3k1oMZy4k5H2%2FgB76aKcbORLdhK2shGMuLLUo6QsOVKPbHJmaBp514lvygG5r5mxhwafje0AAyjWCH6apK3W26DqAVv3jIidgfFRQnmHPx5UjOTxS%2FOoX%2B9oR4aPV95sOruVLKfFibMOejLo5psu1UmlQcn8G4LMPuju8wGOqUBdNTA9ZrCBv%2FME8zxdM1kj5wqK76CkTQ48uMcQpV0uwgBDK5UaBqudVlwl%2BVKuyn5xB6BQ85mjZX1Jm9d9UZt6ofMJ7n%2Fb7wklYzGarXftU2wda79KCL0Kn6LJZiNsx56NxZAmkJ6vl5BkXdoJBT6TBfnqISt9QAOrjChTNIsf%2Brx1prdBZy558CVfTBeJx%2F2zkPzRQVOcELakjGvChp8UhSLfk3D&X-Amz-Signature=1cdcb3745e33504823c1cf0de2182634f6901c9776cf7dbc1b2e4de02d9c4be6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QDGFM6BG%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T093049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIQDtiwOzwrHffxRWe9mCQFVHHSogmwYY5cllHd4K2u85kAIgbNuHc9I%2BdTKTq7lS0psO60PX%2B0IUdSRLyZCcPzgEXkoqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMbDjgL4ws88lpW6mCrcA0xCLIeN%2BVmtU3TnoBypRCLqj9fsN0J%2F5GuGdaY5h1p2i19kFOugS2zEiqjPqa1AWCAe8bXGFsYF09RrrWP5VWc6Vlkk4OvPyr0N7rC602fNvi1AkEpaRKCoUPuvuz68vL3RsSnw9KmnL9zzWmQ%2BtE3k25VEjW3%2FJ6LX4GYO%2BzcU%2FnqJviRvT15dDigdTP4%2FbpxUXfhU7r0eGHReBTNWq%2BzuAhOtMiCMwqzMmo4SIV0PBssq1s8vDBtex3XHf4Sf0Yn12yWCcNr0gX5ydXw2LDVsfxIxg%2F3mEbWpIL3i7HD8rPO2xAcGkhVkJHQNXbWCzUHHURPwWclCmSECz7%2FH%2BYvbY%2FZRUmjjUxDhwfyANTbNAHT9s%2BsEGag0%2FWRGNLgX0s7Mab9EZo9p53%2BjGjfyjV3tKjYBcEY7A0kntGfT%2F%2FcVxOWLr1g24GuXX6SiUXsmDMiknO9w0uT5ZjLKkeEtQJNU5O5sxx64JefcK20D9RpAzEWq3oECKXSyXt5FOGx4Yc4fXJRxjpru6RzYQWw%2FdpkJamyicpGph21tPQKoK2rPoMM4wUc7YbV7ov7O1ijuor%2B4%2FoBGvr81eNfJKxVucJ0L2rBoVXDksDVb6EhEorO6PmA2nwnKn1vH3LxdMKmju8wGOqUBscMslCSJX4i3Luhcm28M73Qo6PLXEJjk4JJCFmKR7T8KhAE3XKe5WhL3FBo8kuAwK0IsMPe0SZaHk1XWO%2BSOXInQTEkBr%2Bu8PoZRvZrIZoNH7xW4fNCsCuy7pyXaxOoQnsHSESpb%2BozhTcRAwaJFev%2BrmpAZdsESKpbwWIWQmaBewNY8%2BzSBCcUurr1uQUkBaCYZQZdR1cqQ9i1Qcwu7sfJSIzwc&X-Amz-Signature=74f71e28273eded60db0ee2f9785e8ce297fbda5addd101ab266e630937aa700&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QDGFM6BG%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T093049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIQDtiwOzwrHffxRWe9mCQFVHHSogmwYY5cllHd4K2u85kAIgbNuHc9I%2BdTKTq7lS0psO60PX%2B0IUdSRLyZCcPzgEXkoqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMbDjgL4ws88lpW6mCrcA0xCLIeN%2BVmtU3TnoBypRCLqj9fsN0J%2F5GuGdaY5h1p2i19kFOugS2zEiqjPqa1AWCAe8bXGFsYF09RrrWP5VWc6Vlkk4OvPyr0N7rC602fNvi1AkEpaRKCoUPuvuz68vL3RsSnw9KmnL9zzWmQ%2BtE3k25VEjW3%2FJ6LX4GYO%2BzcU%2FnqJviRvT15dDigdTP4%2FbpxUXfhU7r0eGHReBTNWq%2BzuAhOtMiCMwqzMmo4SIV0PBssq1s8vDBtex3XHf4Sf0Yn12yWCcNr0gX5ydXw2LDVsfxIxg%2F3mEbWpIL3i7HD8rPO2xAcGkhVkJHQNXbWCzUHHURPwWclCmSECz7%2FH%2BYvbY%2FZRUmjjUxDhwfyANTbNAHT9s%2BsEGag0%2FWRGNLgX0s7Mab9EZo9p53%2BjGjfyjV3tKjYBcEY7A0kntGfT%2F%2FcVxOWLr1g24GuXX6SiUXsmDMiknO9w0uT5ZjLKkeEtQJNU5O5sxx64JefcK20D9RpAzEWq3oECKXSyXt5FOGx4Yc4fXJRxjpru6RzYQWw%2FdpkJamyicpGph21tPQKoK2rPoMM4wUc7YbV7ov7O1ijuor%2B4%2FoBGvr81eNfJKxVucJ0L2rBoVXDksDVb6EhEorO6PmA2nwnKn1vH3LxdMKmju8wGOqUBscMslCSJX4i3Luhcm28M73Qo6PLXEJjk4JJCFmKR7T8KhAE3XKe5WhL3FBo8kuAwK0IsMPe0SZaHk1XWO%2BSOXInQTEkBr%2Bu8PoZRvZrIZoNH7xW4fNCsCuy7pyXaxOoQnsHSESpb%2BozhTcRAwaJFev%2BrmpAZdsESKpbwWIWQmaBewNY8%2BzSBCcUurr1uQUkBaCYZQZdR1cqQ9i1Qcwu7sfJSIzwc&X-Amz-Signature=a0e7e618be975d5a10a56d936d9cfb0335a65d930e3c8f0297359a98e15049fd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WOTHWX6J%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T093042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJIMEYCIQDhZj1%2BOdJgC1aLXLHsasJXGli8M0ZPJUFq4MWVzUqegAIhAMPNYWyIxDQnI3kL%2FZwIqDeYUXezrBtWmQaGZYJG5nxwKogECOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyV7FS6d8AGvnaAw1cq3APyOLYxZVpmn4TNEQcP%2FCmhD%2BpvHmXgA%2Bp9xHXy2G50nDoDTvqt5nO73h6mULzfizA6s1iwBHsZ7Fqy3eODwzj0ySrkz0jcWmZr6GAZIcMVDXsGAQ1o%2FpM99G2HI79KGVTLW2W%2BA5eBFXJqVQS8NwX785P51ZEov0auASzicirSifkbIQBnrIvpYgJou%2Ba041F3%2BvID%2Fdl3TWgrPMja%2B5zCQ%2BhkCELwYN5kGEFRg1moP7dF6mPj%2BihihLGPD4bsXgZLVKuBme3RD8cSWpr9y3V3EIk3HNwRNTK5fKkgTSj2owTsUWTV6Lu1wFwg2Y%2Frlskz53tgB3fajpb1C25c8OqOo6RxXYZwTdPMFSLZe97IaNDqRpcgOpjwPO%2F9r4hhxo%2F1pyy0T0tGFyOYI5ha7ZYuimM7inQSaDoKJx2V2W9Wy%2FNpiggjbLsBEdSbMQyQ8qLrPqA9H%2Fiozsb21q95zRp%2BxVJ6u2%2FxSl1%2F7gRSNmlKZ%2BciU%2BR5BY%2FVusETfvsYtvmdtZlpduoeeJczNXCoanRwrPnvhC7KNct3lxhUJZll%2BLc0SOo8kT08djlePrhxPEZNj1hGY8XbpWThTiV53pliSGe4%2FmW03YZ2CjZHN7SA28Ee75AoahSI3bp6SDDmorvMBjqkAZ3JbhwyGYbC8kerGGx4kZzj901yYvtYICuJGWUbhLhpp2SA6cchKmogDxWyHjlmKGAl%2F4PpV597lMQAYji6uuBd7lo82WyvvKOSIonnX3%2FVX0EpOyDFmL6m7FRJCXDxmWszSyzfkzOrI9xNO7AbBiw1Yw6bWkz8NZn9cagXc7mTXZ6ELjQMDYg%2FfbI7OEM6IRbM4aRGsMJ0CJA%2FHVGf8zi2Ov%2Fe&X-Amz-Signature=ae0df550c2079702a431575729324f686dae64a18045b9e46253e6fb0225e0f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBRK4SVC%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T093050Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJGMEQCICIEn9DxQyFyG%2BFJ3EPuUJgAFkMq8tGcN3gPbjmbs7wxAiBZH22BIFjMefNczM6hMbPH15Qc9ceKxjsSeajKq3fHNyqIBAjo%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMH8nJvqjFdOsTyBWXKtwDQYr%2BO7uow4pTsKxmzT9E1JE05V1emGL%2FZvXSajnWGmGUg174QFP2T3r8QE49AOQn9HXs7cDxg%2BJp3GvrFwTIeP71f3t90ydZYaUWZN3YZvCCZTEQjxXWjDDls1VoHcsleA6XTEOXlABHfYop4JvQWPVeelISXwcMniwYEI4sICH3eJ4%2BdyG6XIUfdDSfGE4PCGQVVHgXnvwJyIepyt3PugDas9OFIf8%2FQkM3JsbwFDh4ti7EsCoAcNg3YQOmmowGFzNped9v8EPRRc2FiVoeWF0jWdfz6nV4%2F6UacsrKfl%2BomXHcAHdIJ5%2BbtVgOfYIAfB3kpoQlR6I7iggiH1UnhpLDrEmf4ECRBA90HPfl3BV3l6cd%2BgA8bOtP%2F50wFkLp4v3eWoqbsh%2Fpu3WTUbmH%2F31Qy6RQp7%2BAwsm8rwW4BoMouJV6Pc9PJrE7w2ncGVthuJNt9w68dFxeH%2F2pm2HQRAJA0%2BpAacofyN0pqIJtDheEOBjZ0ePvqlXBnLMVZS16wZs5fykABHShjncnjgSrMUokGDBUdg8gL8ZtUThKBBlufpx65dmZ7xcGpZoH7Ff25SAZhwFNafYiX5HVcbzumAUAvmU8%2BR%2F%2BFf6uW787EAYTf6wjSQMsz8NWoeYwq6K7zAY6pgG89KAwm18GI4ZzXqOAkazdFMGlzQ%2FGNizo7NaK0TYxYdEmSbXpBW4tucqaBYdA9GeatnZrlJnCLgv0PS01UoAAaqqlo031lT8AmP9JtN9YgaI0BGOF2x8cQNQK7ewg4mpBfxlvmfYkX5o2ZM7ZNXCouW%2BgGxOQNG8KccMMq%2FCk%2FEUyR33hZt6VPKUG4Jpz3DAABpWNYVQXXAZ4Rm39uh0G5MkAaiTV&X-Amz-Signature=5b83e5a79cc0ed95a4b571a85d7ba2ffe418b005e91aec3c6bc268abcea55e9a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBRK4SVC%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T093050Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJGMEQCICIEn9DxQyFyG%2BFJ3EPuUJgAFkMq8tGcN3gPbjmbs7wxAiBZH22BIFjMefNczM6hMbPH15Qc9ceKxjsSeajKq3fHNyqIBAjo%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMH8nJvqjFdOsTyBWXKtwDQYr%2BO7uow4pTsKxmzT9E1JE05V1emGL%2FZvXSajnWGmGUg174QFP2T3r8QE49AOQn9HXs7cDxg%2BJp3GvrFwTIeP71f3t90ydZYaUWZN3YZvCCZTEQjxXWjDDls1VoHcsleA6XTEOXlABHfYop4JvQWPVeelISXwcMniwYEI4sICH3eJ4%2BdyG6XIUfdDSfGE4PCGQVVHgXnvwJyIepyt3PugDas9OFIf8%2FQkM3JsbwFDh4ti7EsCoAcNg3YQOmmowGFzNped9v8EPRRc2FiVoeWF0jWdfz6nV4%2F6UacsrKfl%2BomXHcAHdIJ5%2BbtVgOfYIAfB3kpoQlR6I7iggiH1UnhpLDrEmf4ECRBA90HPfl3BV3l6cd%2BgA8bOtP%2F50wFkLp4v3eWoqbsh%2Fpu3WTUbmH%2F31Qy6RQp7%2BAwsm8rwW4BoMouJV6Pc9PJrE7w2ncGVthuJNt9w68dFxeH%2F2pm2HQRAJA0%2BpAacofyN0pqIJtDheEOBjZ0ePvqlXBnLMVZS16wZs5fykABHShjncnjgSrMUokGDBUdg8gL8ZtUThKBBlufpx65dmZ7xcGpZoH7Ff25SAZhwFNafYiX5HVcbzumAUAvmU8%2BR%2F%2BFf6uW787EAYTf6wjSQMsz8NWoeYwq6K7zAY6pgG89KAwm18GI4ZzXqOAkazdFMGlzQ%2FGNizo7NaK0TYxYdEmSbXpBW4tucqaBYdA9GeatnZrlJnCLgv0PS01UoAAaqqlo031lT8AmP9JtN9YgaI0BGOF2x8cQNQK7ewg4mpBfxlvmfYkX5o2ZM7ZNXCouW%2BgGxOQNG8KccMMq%2FCk%2FEUyR33hZt6VPKUG4Jpz3DAABpWNYVQXXAZ4Rm39uh0G5MkAaiTV&X-Amz-Signature=5b83e5a79cc0ed95a4b571a85d7ba2ffe418b005e91aec3c6bc268abcea55e9a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U7TRECJ6%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T093050Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJIMEYCIQDxdOtlg8tR2BAHCxKKjrrY1fW%2B%2FARyGpUYkDV%2BpDvYmAIhANifN2LNonPm6%2F3c8viKJBKl6SeQWiKbKJEafxsNtwuMKogECOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzMdsQxMOeIj%2BwszhQq3APuuk4Ir6JnM0DA2ZsYlJ3kmgQCfklMVUwI69BDd6%2FL7%2Bq3CZrxKyO2RQM0MHmCmIc1zrVpmO524hbXO8MKJebWilPaaXuHwhbACaKvoU6tdNlpNhJxF1SienMQnQKvAV9QrXxj62gR023acDjMXmPFAinE8lTbmPE19rb%2F72iLYQl065dKPzj%2FXYEZp%2FpONOOKSJq5krG26MAJwApHl6ltwliLgCBRa6BQeSSMcD6%2Fte%2FvFGV0i1aNZI4axlb7tX6cQaIqAWrExLTYLsW7HOUElSZSHsn1ZpF7QJYQRMAQM6jw9xtju4CzIy7jFpMQGKJo5ZYv6zZKJbEha8fNcr2v8LjnagHrM8ysQBoeJPXhZUNT%2Bh9RkS1IRLkm4USpdk7JY5p8WEO33N7kiMPD0A6bmDS6WyhnJc9W14d9RhMn%2BneCE9bj65NltKFaxisXYbKcl4WBRR5sN27BKABq5LvRl9TvtXL%2BiGIxghIG5ce9a038WiemmGybH26a8krL3%2BmjuQxxPEGpsc5p%2Bkm84o1sB3FLDHU7HP4TgHjbHYTV%2Fbuv%2Be%2BdH5bm9%2Fff3D8Rn%2Flxl9rhcrgiUs49HUsFwbmoJ8YDHJfdzFEwaGPwtQ2KRtYX4MaxlWuTGGrQhzDqorvMBjqkAUsIU8mbuNgcVO5ExnkiAEa01nPwyYKmOvju9nEVn0bL8Ha8Ez7tn7E0n1%2B98XfGPg%2FGcjhInHz5dKCHjhqUxiEykqJ3qxqVmuL3cUYEoXof9lEVaEFyTPU%2Fy0SVhDiTnJqP%2Bd71dXtevVqjkYBKgpgoiHVltezPnH1q8yzjmu4xNq1qEK2IOJuD8ZMvtVpMgZVS1kQUDedDILDFJTtIPFvpl2jr&X-Amz-Signature=7d42716ce963d8804482b0f342637d180a244270f7e3191a8027e535f28b0efe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

