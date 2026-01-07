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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YITFUBA2%2F20260107%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260107T210125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDSMkTA5zCPbzR%2F0R8%2BDa2H%2BhVKnHl%2Bb%2F%2FlaaBL4ikKgAIhAK6oeHapN%2Bqdp4YKXjkNhDqZ9%2BLOXG1Cc0ZpRbLK%2F3k2Kv8DCH4QABoMNjM3NDIzMTgzODA1Igzp6VaOGu8u3nFOGjIq3AMf5RCZFWG%2FX5QT%2FGc00H6ys3eD%2FTOR7Tc9ugyPE8LJuuYtvRH%2Bs3VwwDG3WP0v6QL192SdpG7UuT1rF1VY6Y9AkvwPxQfigQCjAtIDLkRTQU7uyqHFHKk8USlEXTA9x%2FlNobVJdJBDAX9UXEF2t0a2ZAxeEleNEHiszOW7vCZVdtXvpHI4FSvWFnNGlNLl8eWnHYCqcGSQsCHxplL4c5V42m5jyjPSM80BSwRTg6s413NOiADuwARybbtQBwTsrIRGS3kQAM%2B727%2Fh8M6vVajdmTH5ccc6oZJhrZ44fpviccJJBUMmOXmgqftxE2AG%2FxWA1T728qdjBHLkVDJ9oOLsIACHlfxWK2rSWumhtAnI4Eb5D1Lp1GlR2G3coZgPlAP1RMOLOPu10E25ybHYq%2FP0PWq0qvu5BuYCrNjnFavGSPz1KIgb0CUVWGcacy9pxwXw%2BEaSwrOP6xaAAtXet2cnlsX4dMAepo0gCzMEif0TmFZ1%2BSaykx33kfrgcOmthV6wnAhJcUECthxO0lcWFL9J2ayQaSUktzE4lSqi0veY6%2FKP%2FWAQKaHP0hTiMuKE%2BxPPuREjLRQU7c6WADvayqAITibhTVf1lWatkeJVc3bEublpEUboMNnGUstA3jD0jPvKBjqkAfT54lkXvlhO2HvGlw6vp%2BcaYHC9MG0W2tPUHl%2Bva6qwyjczk7pAevQ2U6poLgsdWtBy0ejxz1iYAKde2175%2FJX2EAyEnkpdxsNJ8BX9xO2EWXVDERWMWHJ8CLGnaLL4z4bMCe3brjww%2FqqOHYp7eH889T6lezrhbcvHXrtyJLeoUEd2S1MvxDfRfzLbY1%2Fk8XX78DtTXdVoCxA5cVjG%2BaOTspxV&X-Amz-Signature=463777b461c87302ee2e1ae52c831f6ad791ea0f98184b5c690b18f9828a057d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YITFUBA2%2F20260107%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260107T210125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDSMkTA5zCPbzR%2F0R8%2BDa2H%2BhVKnHl%2Bb%2F%2FlaaBL4ikKgAIhAK6oeHapN%2Bqdp4YKXjkNhDqZ9%2BLOXG1Cc0ZpRbLK%2F3k2Kv8DCH4QABoMNjM3NDIzMTgzODA1Igzp6VaOGu8u3nFOGjIq3AMf5RCZFWG%2FX5QT%2FGc00H6ys3eD%2FTOR7Tc9ugyPE8LJuuYtvRH%2Bs3VwwDG3WP0v6QL192SdpG7UuT1rF1VY6Y9AkvwPxQfigQCjAtIDLkRTQU7uyqHFHKk8USlEXTA9x%2FlNobVJdJBDAX9UXEF2t0a2ZAxeEleNEHiszOW7vCZVdtXvpHI4FSvWFnNGlNLl8eWnHYCqcGSQsCHxplL4c5V42m5jyjPSM80BSwRTg6s413NOiADuwARybbtQBwTsrIRGS3kQAM%2B727%2Fh8M6vVajdmTH5ccc6oZJhrZ44fpviccJJBUMmOXmgqftxE2AG%2FxWA1T728qdjBHLkVDJ9oOLsIACHlfxWK2rSWumhtAnI4Eb5D1Lp1GlR2G3coZgPlAP1RMOLOPu10E25ybHYq%2FP0PWq0qvu5BuYCrNjnFavGSPz1KIgb0CUVWGcacy9pxwXw%2BEaSwrOP6xaAAtXet2cnlsX4dMAepo0gCzMEif0TmFZ1%2BSaykx33kfrgcOmthV6wnAhJcUECthxO0lcWFL9J2ayQaSUktzE4lSqi0veY6%2FKP%2FWAQKaHP0hTiMuKE%2BxPPuREjLRQU7c6WADvayqAITibhTVf1lWatkeJVc3bEublpEUboMNnGUstA3jD0jPvKBjqkAfT54lkXvlhO2HvGlw6vp%2BcaYHC9MG0W2tPUHl%2Bva6qwyjczk7pAevQ2U6poLgsdWtBy0ejxz1iYAKde2175%2FJX2EAyEnkpdxsNJ8BX9xO2EWXVDERWMWHJ8CLGnaLL4z4bMCe3brjww%2FqqOHYp7eH889T6lezrhbcvHXrtyJLeoUEd2S1MvxDfRfzLbY1%2Fk8XX78DtTXdVoCxA5cVjG%2BaOTspxV&X-Amz-Signature=463777b461c87302ee2e1ae52c831f6ad791ea0f98184b5c690b18f9828a057d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNCKA34S%2F20260107%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260107T210125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFn4Pt5lgEP71JapbEeSv%2BNkulxuzN4rLhyuL6pnIJdJAiB8su2sFYrcW9ZkfWtsm2rIR5aswN8BcdrxyD%2B3MJb%2BYyr%2FAwh%2BEAAaDDYzNzQyMzE4MzgwNSIM17vgmJBOOiCawfoTKtwD01L5aHkUpFJ1Bh1Qa%2Bh4pyXCq8FpCMjTrGm6O0E2s8nRBSfWd38e52QkkZNswrr%2BAfrz7tHH5XcGhWqeofr1fTtO9qk3lIUJMgzKpHglDgAZnLCIew2tBp7EhesLXZ3c9RtaRQxQisP2%2BRmOV9Zlip7N3iT938F5jtEp4exSSgN6pZGcKNOJMv60isunEvLgbObSXTEOzm2hSR5NBj5X6sl8jxJc%2FnZXuaVT6yrGh%2FqEKG8sri%2F3JH5xyE86lEAoDvsUbeg5%2FeLbBSyALlQrN1pyybpXzPD23Y4fNQFov7Y%2Fi87YDYGKbyte8WTOjzu8dbtQCn1%2FAJKZl%2FZH7Bi93ovufYX28A6TnziXGJU%2FQIqgH6ABO6vdkqN8F1iJTWx37CKiyb6YlIfH0vkTFvrwtwSTX0dKXYycZkCxnw73Q0Y1D6%2BX%2FMJNrewblmjSKh7fWIxjE3waWJ9A7kakcMsRDfEnukaPN%2FMyTdsDR7hf3oE5y7vp7BgyNVR4wXQuTEIdupu4r%2FQPUQ%2F28NHoemlNyoXtSxpwhD5uUSDf2oAsTMoUMGfQIiFWzCBcWPKBNoybL02F%2FBTc9zcs28NNOVUbhG5sHyXLXUi44qEjMk%2FopMoaMxarFWnqInvNtTEwxIz7ygY6pgE3z0Vo%2F7nQPSKDhoXkngx2YRRqN4fx%2BgWeQ0ngmnuOOAUTM6F7c%2Fg9pF693Jwarmxi5fFBdzE%2BdB7UhWN%2B9UyIOIJQQu%2BUyvaumJh4YJlSFRZS1z5577EO431H6y80YjMRAN3xNRGwHeqcJ4Wd5SMageIYxOAChPNFr%2FW1HkeoUbdfEMFnouhaqFvYPHlN9jMBhJ3%2BmMo6OvSUJGlR%2FhZ%2BzSucRQxV&X-Amz-Signature=3109f223c763ac865bfc908af2ce9f5aed20221af5a3f6ebbe308f90d2d26b09&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SVRV4HK3%2F20260107%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260107T210127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBFMHEoB%2BL5wBZZCbIT3OX1gCy8Q7GKbDf%2BNy2TBbgcAAiEApXpBUmsSY5YdAGCUp9DbMIlRHkyKYXhxGPMG6IGTTR8q%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDNgrg%2FHm4eiGGAGjXircA%2B%2Fo1LnQVlyCo1tThyzdU7%2Fq5BX%2FrTPfJEtH83BVIoBplr8HUxG4hTAJupgaiDeg%2BA%2F3YM99oL%2F%2FcQBsQ2VflLHz%2BwCW5jdcCWGPfKfl1IuG3iMZFSn22SzgAmcU0%2FPZQstOTTAoRfwkgAEm3WrrYUq9vKhzwOsVBLOPL2IXkJraxZiDkpwnRdVLyGyDVmaQxMEH4gBkSQufOEpQ6q%2FxMDt7ChYUexwz546znl7CPBpeiXWswrYFHsPA6a8jR8%2Bh7Bdsq8nAoKqsAf2mB9y560Bh8%2Brr4PYZwqge5Tfn%2FLiHW%2F3dLhELXxTLQ9I06tPFX7VbYKhafir3nH09FRvSWO0I%2BV9jE%2BTB%2FSNRV3ISMf%2BFC9ItpTAsCKfOYPPaQGk0hHNKrksOpvVpO5NEkGN0Zf6fLvsrAJCo8WdK9fGI1gChGrMv5leUW%2Bs%2Ft9duToDGP%2BgKAi6641sXOP7JCSY1qilqXcYWogHxRtREI821FFCcSKJiW11vTi%2BFmK%2FPi2sNWb4qm7b6hJNJg9WxBucPhuMwN0YQ3H5en7%2BQXzCZzbXkw1hcgmKbnAGTpFw3g9L0aNyOJVwqjuE%2BSWZySL2IvlKAaDmTVzp2kdw27vpXLZQ4vbCSqHmisHYqgAZwMNWM%2B8oGOqUBpgze91J%2FEFwIJ0tsz7iDE1OpxZu4eZt6tTQ8oU2xWFpY%2FfN8UMfZUYNSBJtEI2WzqPr3G41ZZX2KaONir0wiw8YAh60019FYTyUbRKvmfZWiZjsaq6X%2BUoieJiIBrHJ43%2B4t9%2Bp%2F6wlHXS%2FC4YQoPUQIO9ZEN%2B%2FY%2B5X3s1gTHEp0D8Wv5pMZVlQHvrhXtk4TPrR8fR4Qdt68nBGjil1qQyVwwzy6&X-Amz-Signature=d5a6db7a053a985e19df276e0435a5cfef1561cb396295ae14cbc1fd32ec1964&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SVRV4HK3%2F20260107%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260107T210127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBFMHEoB%2BL5wBZZCbIT3OX1gCy8Q7GKbDf%2BNy2TBbgcAAiEApXpBUmsSY5YdAGCUp9DbMIlRHkyKYXhxGPMG6IGTTR8q%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDNgrg%2FHm4eiGGAGjXircA%2B%2Fo1LnQVlyCo1tThyzdU7%2Fq5BX%2FrTPfJEtH83BVIoBplr8HUxG4hTAJupgaiDeg%2BA%2F3YM99oL%2F%2FcQBsQ2VflLHz%2BwCW5jdcCWGPfKfl1IuG3iMZFSn22SzgAmcU0%2FPZQstOTTAoRfwkgAEm3WrrYUq9vKhzwOsVBLOPL2IXkJraxZiDkpwnRdVLyGyDVmaQxMEH4gBkSQufOEpQ6q%2FxMDt7ChYUexwz546znl7CPBpeiXWswrYFHsPA6a8jR8%2Bh7Bdsq8nAoKqsAf2mB9y560Bh8%2Brr4PYZwqge5Tfn%2FLiHW%2F3dLhELXxTLQ9I06tPFX7VbYKhafir3nH09FRvSWO0I%2BV9jE%2BTB%2FSNRV3ISMf%2BFC9ItpTAsCKfOYPPaQGk0hHNKrksOpvVpO5NEkGN0Zf6fLvsrAJCo8WdK9fGI1gChGrMv5leUW%2Bs%2Ft9duToDGP%2BgKAi6641sXOP7JCSY1qilqXcYWogHxRtREI821FFCcSKJiW11vTi%2BFmK%2FPi2sNWb4qm7b6hJNJg9WxBucPhuMwN0YQ3H5en7%2BQXzCZzbXkw1hcgmKbnAGTpFw3g9L0aNyOJVwqjuE%2BSWZySL2IvlKAaDmTVzp2kdw27vpXLZQ4vbCSqHmisHYqgAZwMNWM%2B8oGOqUBpgze91J%2FEFwIJ0tsz7iDE1OpxZu4eZt6tTQ8oU2xWFpY%2FfN8UMfZUYNSBJtEI2WzqPr3G41ZZX2KaONir0wiw8YAh60019FYTyUbRKvmfZWiZjsaq6X%2BUoieJiIBrHJ43%2B4t9%2Bp%2F6wlHXS%2FC4YQoPUQIO9ZEN%2B%2FY%2B5X3s1gTHEp0D8Wv5pMZVlQHvrhXtk4TPrR8fR4Qdt68nBGjil1qQyVwwzy6&X-Amz-Signature=1d3b8ab53175ea3731ba245a202b505a3cb4e034989968d835fa56e113532d66&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U6DCEGTV%2F20260107%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260107T210127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDiFrTn2zK1UEjxk2YHz%2FjD3X%2B06TaLAMiRTs%2BiHhSakwIgE%2Bt3mykDIy%2FtpVMbOguJbiPWwtf7ev9ZQeRbCwoikjQq%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDGpmbMGXvxMLjk76pSrcA%2BRiDnhAm2DDzxXN9nBa34VRiXihbFNSlc%2BWNHQ9uMWp3b0tf9d1YGbH1sBi6xnlDDE5LznzEBBoEpcPIZ%2FVENS2m%2FS5rALqZaWVLEBWccKo4Ke7Wyj1n6jMBLyEqIB6UpzQn0SYUVWhxUBOCAX%2Bz9HVDu6Wiq5gjSUtSkeeTlHtwYtVw6fU3I355TBbRZaaE6ykvgvqtNnVzu4DnFYSN%2B1bc2Rkql37H3FlfxF5F6CE63CLmlw731zE5SetpN%2BWf7bQIuuSu%2BNZGdexhqpAjRUneOlraZQg84ZKRONZkw38ovmEj024Gb9JffOLUU3oZXDnBa8cAxf1wRC7mZ8hT%2F3wL6wDszmjTVoqEea22U9vahsQuwbBzqpcuJoVLUlBQAi6Z7owgHiL6M1kcLTSJ1Bh5yil9DvwxOzB1rF3QZuBjWia9QpIaxJAK2T9O%2BohAv1t1YPyv7qwEMCMhA78ffojV107zGt7CZ1jspKGqIE9i%2FVMyz79t%2BswGCFPHbn2fxMj907Rrv%2FeyZwzk%2BHvwNrdZxcgubmLc5o3bK%2BqjpuWNZ8CtGquQpHrr4W8Q5ed0QmQm31pEQ89QBDyw1%2F74zKWXf8rSGaKxC9lp0ZKBErjK%2FLG6bvQz%2Fx%2FOUAsMIaM%2B8oGOqUB8S4XtZMwm2gZIgYu%2BJ8XcxfBK45x9UdQShTVi0M4yV5p4%2BV781q1dXA2Qr00cdhirLNliTdpi7tQm6z8Lqz552jwVvDkm9c3IO0msFH5OdsVHhuJy7jaVnhquzR67hsBivLmrar4wo%2Fs%2FnnLDe2e3pwdCoVonpXf4EFJqkx73pEWB%2FFU0BlhZLKX7J6joJAEHd%2F5mHX3bLg61im6wR6KCtLxKH6l&X-Amz-Signature=8fbe7b7095c48c348188ccdaf6e508e2bda099003969cfbf99ee9e4f469b0004&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XIRPUL2Y%2F20260107%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260107T210127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDZOWCDTxSZr%2FqcoBHso7%2FE7pCUYCvfFxF15DRdj5buMwIhALsCBuXCNklaBeo8azsnjO4BSJvxGkAbYwhvRI5yyK6fKv8DCH4QABoMNjM3NDIzMTgzODA1IgwxAAobZRxIxL9U68Yq3AMmW04VifPefleHdIUewiFpmt2VDD%2FxRkoQkn8EuCU10G8pxsKh92mtMy38LEgDZlJsiIM1y%2Fs5mj1FnUTH7CCnat%2BM2ERVxTW3usLdYcx5A3sZDWOJhxIbRCd0I379%2FD7wF4dByzvSexqDtW%2FbMDDotWChzQCFdjqG2Bo1nGx3k%2FB05Gjv0lv1IHBWxVyJRfYzqUFM%2FKLGIR3XsysGGUF%2FuI3mykfqLn4SQy3yIp%2FWAQQeckh9vqNhYWeVKznbbz3y0yUmnl2KEQwjCnJPLbunNcOUd1XKnklN5C32BK6R2GHfHZzwjBuuLmeE207zj8F%2BvmQ98zZe3QjL%2FzoRz8HLWEPELqdHTOG85lCGHtZPnaXndbpWTA5q%2B3nEcWAqmZG5Ny9YWvDWnX7zaSqy1dK1lrkaxtBPbphrIXiElGwT9yRfPMbtIqsepDvvmCgUgzx%2FoWzlFUCryte1E%2B9OT9zcEE4tDsiG9R5X3ix0DSKvBmyYHj9rU9zU7xgEDqVlxnhH28mc5kT0rzyzCfuWCS%2Fm96%2FHH5SOEoi3%2BOJaiAMn8T0w0JCd2ZhQ7mCtb9iVNR84sI5S2zcELBRJqezn6U6rwxvj96yDCeRnyPDaRDMsyrp%2BFf2ZcPYkovM%2BBTDWjPvKBjqkAaxF9uJ89ka8eFrlioV9SGBEilNKGVMRITE1mi56R8nJClNuzos11c6RCnDqwhIUiTwHGNSQFQGOQ3Iy5iCRo%2BETN%2BP56j0Dx60Z6tSzc9b7KaXUnWYBpOkFCS%2FZs1UyWFqT5eDhr3SQA26Zan3CaOsAVqRu1UX2CyRFJbbVUx0kKYEj0RTe5CQZx23EptpqOcR7EH82Vp5dkamMLN%2BSolo68I2C&X-Amz-Signature=73c4a03b5feebe26df2a92c50ea2ca3c59cff71da5932ca881bfced762b736ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665UAEL7AL%2F20260107%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260107T210131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDPtc2oAy%2FUn7J8J%2BDJCQhxE2Z5Gg8RkmXfGyT%2BDXoj7QIgCXnu51jwh1gG7fURZyRNNM19ayq7Wc6gWxU%2BIS4sIsMq%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDECSjfUWeQFoPqDaNSrcA4ZqcLhw7ZWJL%2Fwk0rEMlMxbKawBHSssWAFOkK1leIa0VjS96KnhI6fXU2WHiAoEuIcwiQldhEHhQDrV9guWJjZ4nMFmcSwo4iI36tFKp5zbYjtsNILOnlVkPQdjlCw6YB45DPqR0NEp%2BwQ2V2c5ICkm3S8MdzBSPssGcXuMqPQ1hnnZkXaRGPQJJvO3rXwyK6ZmA2vmgoICab0QjyDc9oHthxzdPt0ebYFRT3VO3RnmJ9rVct0GCXqFS%2Bdy1lOxMzKcFe0QHGQROsFFMe%2FUHiqRqObMuBGW%2B4jxpGqLyrrEOkk71sWzoEZeWeKhLOeq7BjmOwwAg8BVn7ftNUwG0atD1jAOExhLyy7wI4yE3kXQKHKJweOhOMRymsKcAKr3pYngkAfN2klqRQleuQ%2BQLUTTMHFciDlIVU4jtxOer34LL%2F%2Bc5imVpCp0ISws7EOBsicUba5YZdwWUcxmhkgOhKGMAMMBepfUqn4nWsgrAW5EA1oX%2BEqKF%2FsP3sV9uak1Sh9xpcchJOUwJuoKC6oVDHINaBuTqZF0O91ikuYpKUwtsTcnLFNOlgC%2B1XkS%2B69flW2u%2BiUpVH33lzn460sN8HRZQF3DFwRFMJmLWUPITAPpg9oJz6JzFi4aXiEVMLKM%2B8oGOqUBdISw%2FRbEGSoX7f2WanB%2FmVwELve8P8Bcsm%2F8bCgPupcwA5eV3FdsoCPjRgqOS5l4xwpzekCq%2FREswByE6czMmS8p3P%2FBabGvRAi2H8qnW94orNJmqOJlGTvliGWwVM3pEEU47BBbkRUBEswrqCy4buN%2BZ7wD1mgVZXL0LzfjuOygx5ftX1VuDagS58ATFg0c60M0lTNghE4R%2FB3kesy4bcjk2feu&X-Amz-Signature=ba7e3af627b57d70379553fdefb1a138c57dd43ddf2ff630bbfd75980eb9282a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665IZTHKL6%2F20260107%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260107T210132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCXVQdrV%2BSyobXw69kud5z29fLDUlXu1o9YS1qDBYInIQIgJlw2AvgMLt8WEGT9s3h1AFE8JXVENenQcd4S2cqjs6cq%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDCkSr8sOt2Shf06ZLCrcA3T19nedvg2y9Q7mrltLLlzN3wz3bZlFGIDHxQf%2FSHVONG8gEm7mncfG1xQqdNlhDfdAxvlFjxqKiTYOKRo1WrkXE4%2B2PxmrmwfKPrbOvyrT%2BP%2FNYL9ibSCSgGbkP9n63KlHoUMCInl7X%2BmS6AnOEN2xab5846YfrbYVh7Fe0bHxYS4vlbJxdBfiYnUo7%2BS8zg3QlUnK14a%2BjnJx5SLhC7Jx9jrAkyUh%2FK5Gw%2BsPCXKQdSxEdnI2PHsd2vOcdhbLZPZzFrDGeAfjIJVRza5A56DLvFGpc8DSpulnI5eIXpwlhzS865aqhI%2FTasxHq%2BCM5feKUiTHJLz1tD1Pkaz29i2Klku%2FF8zetiWFTq7lbmB5umUiVXVGE9nfdCbgMvkzxJCfMRCoH%2FW%2Bo3GL3p67WdHwnde%2FledZfv0jdR6UZRbkzCJUTFD3Wuo35veq9ATki%2Fg8A2ETlu11Eo2ay57bjtd4K4n6d7yGeWK1JaWse%2BHvqx%2F1lL4o5HWvRJLgABY6rL2fIV0ntLVlk7%2FrGn%2Fhl0AT%2BbQxJXEX8KcUDCEB1Z%2BrXu8eO13oG6ZhsKuwieTZ4iXSXHbA6SXbb0mJo817VXf4MUa2X744JBaGt%2FnxVo5aNZym9blHLewjJ3dmMOqM%2B8oGOqUB7iz%2F295NggC9u1LuMXfCM5XTHnqdC78B8jSaEixPamgX%2FYR8fm67%2B6VcDKNrDgYajFOxwpiZipBYu8iLCsSjU%2FTH4L5%2Byq1R0KwPlzjRG9mtIKBOCcNdv8SuMfDoowcvR52PchJfy5TMvWe05y7nc0YhqRiYCTpCgKtMsNuQh%2BcXJZoxR7agDpihERgn%2Fiiv3gio7dtFbLLQWij%2FMVdbdrLJTMkD&X-Amz-Signature=449606a8e4f0d5a677086b8e7abc4690f5c8986047dbc5edf5ba2fda3a7753f1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665IZTHKL6%2F20260107%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260107T210132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCXVQdrV%2BSyobXw69kud5z29fLDUlXu1o9YS1qDBYInIQIgJlw2AvgMLt8WEGT9s3h1AFE8JXVENenQcd4S2cqjs6cq%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDCkSr8sOt2Shf06ZLCrcA3T19nedvg2y9Q7mrltLLlzN3wz3bZlFGIDHxQf%2FSHVONG8gEm7mncfG1xQqdNlhDfdAxvlFjxqKiTYOKRo1WrkXE4%2B2PxmrmwfKPrbOvyrT%2BP%2FNYL9ibSCSgGbkP9n63KlHoUMCInl7X%2BmS6AnOEN2xab5846YfrbYVh7Fe0bHxYS4vlbJxdBfiYnUo7%2BS8zg3QlUnK14a%2BjnJx5SLhC7Jx9jrAkyUh%2FK5Gw%2BsPCXKQdSxEdnI2PHsd2vOcdhbLZPZzFrDGeAfjIJVRza5A56DLvFGpc8DSpulnI5eIXpwlhzS865aqhI%2FTasxHq%2BCM5feKUiTHJLz1tD1Pkaz29i2Klku%2FF8zetiWFTq7lbmB5umUiVXVGE9nfdCbgMvkzxJCfMRCoH%2FW%2Bo3GL3p67WdHwnde%2FledZfv0jdR6UZRbkzCJUTFD3Wuo35veq9ATki%2Fg8A2ETlu11Eo2ay57bjtd4K4n6d7yGeWK1JaWse%2BHvqx%2F1lL4o5HWvRJLgABY6rL2fIV0ntLVlk7%2FrGn%2Fhl0AT%2BbQxJXEX8KcUDCEB1Z%2BrXu8eO13oG6ZhsKuwieTZ4iXSXHbA6SXbb0mJo817VXf4MUa2X744JBaGt%2FnxVo5aNZym9blHLewjJ3dmMOqM%2B8oGOqUB7iz%2F295NggC9u1LuMXfCM5XTHnqdC78B8jSaEixPamgX%2FYR8fm67%2B6VcDKNrDgYajFOxwpiZipBYu8iLCsSjU%2FTH4L5%2Byq1R0KwPlzjRG9mtIKBOCcNdv8SuMfDoowcvR52PchJfy5TMvWe05y7nc0YhqRiYCTpCgKtMsNuQh%2BcXJZoxR7agDpihERgn%2Fiiv3gio7dtFbLLQWij%2FMVdbdrLJTMkD&X-Amz-Signature=bd84d9b1ea37e99f445db0ba5dcbd05f50360c3858b55829d56f8a3d89d1c36c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664S4GAZJV%2F20260107%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260107T210118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCQR56hFG4ua8QELX%2F%2FGus01wYkpPM1eq1WAAdyf%2B9R%2BgIhAPNRCDctruiBJkl76Qo6ULB99IJmHtc3rWfbzD2yVXJ%2FKv8DCH4QABoMNjM3NDIzMTgzODA1IgxnQDl%2F6KIAs6X3oZAq3APGRWOkykOxFrHULNAHrHyGvOHKsKpnwgQuVNi6Y75AtVwu7RPue4wp8n9EyVZxdHJjCOyWoXJi2WT5NOvZ85jXg0WTGhpKk%2FBg%2FU4K8yRpAToMOzzkmZmKyuN7xuMbYkp4SdReMY5aIemAUW3KKmRYUEj5Eqc5h4Kb%2BnT7Jn64GrNQZ79wM7MiBDX38prTe2fsTnGZwiANyOFsOJcYGqB6qM39jluxfW%2Favzb7TlBbxnz0w6fARl3n46Ls8i2PHGO73P2ifIp6bUtJIbtdUKlaAsicaqmotArMKw7eWkEW1a0MOvb6ZX0AZ546jgzbnGDmJ4ZOTeiHpYZzixgvr615x42OPIJGW7kU3Kw7whltFlSdJRu3LxUErObL5R5wjjD%2BHBxlnQ3CnwA9nOF8X9cNNA3zYERbcewVaMzDpGO5z3gGsLzAs34fQRzo6JYTunEQF3SAK%2FFjfjkPSmzxdMbLb7A14KBmHI3gH4rDyAovbXUvbpjDnKbo0CS1EO9L5fiQ69p3Lk12tpcpFe3VF5TFZAgfu4f6VKRZyDHmtQuIGcjLzOCvPvtt3MJ1WQdkQcVz3mLJZL2gg04Escqqmb8b6sOO8xlBjCnNEDVIG8TkiudjbVWhycWpBkHHITDljPvKBjqkAdc4nE08khOM7BgQTZ%2B3j3ip2NK7%2F3oRz3H20dqr4KIq%2Bc4IAV1K1WxqCjrlIXgbkf9xIihOXV4x8XzPTjCQM%2B0EOTMzJJGn%2BG7BMxL0337ZE0%2FtcOC7389rcEPvrnX9brL%2BhBGLMrm1e7rkXdI17HgThsdYL6HV%2BD1iJeqIzQjRTOSDHXyuYJfY9wIuy1Kd15Wcm9KbUUyDlf6J53IXhgj8qyvI&X-Amz-Signature=f967ee3ed72785c8fc539c2ee7f8b7c3628479eb857728c0514fee3a49af9b13&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46627Q4H3CB%2F20260107%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260107T210138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC6mZQR7n3QUdJ2CyXavg9Xcw2Y4RtKOALsDCFe1%2F8olAIhALwr19sfb1Bq1gIFVdd41jTOmCB3vvyJiZ9pCvjY8HCrKv8DCH4QABoMNjM3NDIzMTgzODA1Igxa2%2Bh9vw%2BxuFB9Ct0q3AN9NiKWJPDpUTlh0Tz0v94TQNm4mCkW4uri48Ptqan%2BpDLAVEzxeE4TYUBG%2B%2BReOsMJgaqgyyIjJssNOLXGZZqiFL%2BzWizXFnBqpO8ZazRYNiOa0QbWgvm7UqiVrKJv2HbqdZ09LjIATRcK%2FbtjYDtEye400l4sm5SPKBi0OraZEwIs1Gbkqwo8yI8fvWSg5Ki74EezNDqRX%2FlX23HTaJ0NngPFpCu%2BTz5gx1l9OkcGLzSZXx5sfkcH%2FiEpqD0oIi69bkGXEWfazcHasOh0Kuw3QII7ELZqdwNqSEksgiNMnv7qIQOt2iFqlU7PHeJeJRon55ipimtLbIfI6uSdL3ivoUwlsN%2FOExm%2FCsFltkIGHKuKaRlu4tnkdocAL7RYKtRxDFdtwWEb4yIG6rQW4EwigWazBuycVmeU5L91YHlrf4bEThAXBkqjGeJU1AiCnjtz6zmk02dKFMrky30FraSIHi7oHwP33JHgkjEM1He6LRPBvJLbpPywKcfRUNFkZzNTAy3XGbc82O70pxFI4FKSp2s%2B5jmF3SfTmI2ayLlPOGrdLvKnHWt1X9mj9VecldDWbqVjgKj%2FmQrOS6TsMxrNiyxgsv%2BfmLnlfoavpl4XmtpILUACdN3g9%2FlGDDDOjPvKBjqkASuKYjq376GS7HPVIy1m%2FaNQUn2Nq9ihK%2BKnuQmPu9iZ3XRjx%2F8oDlYZMmXvOGGT31AuehyrKCqh9QrfOtDY28Tom0DPyv5qv2AmZiaICmF2%2FXoUYuZsq2wFIqMx4uLqRozTHUzEtwqtcfx7BCfRV6ykrJf8RLDizgKXy%2FptztMLHtsPNVhjK5q1UZLGxld47bUss4n7gYJaYUSczjkLlK0IDfm0&X-Amz-Signature=663f20dc2cc52819a51f530d0c4bf4bf2a5403e71c38e128f31ba35b54461817&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46627Q4H3CB%2F20260107%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260107T210138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC6mZQR7n3QUdJ2CyXavg9Xcw2Y4RtKOALsDCFe1%2F8olAIhALwr19sfb1Bq1gIFVdd41jTOmCB3vvyJiZ9pCvjY8HCrKv8DCH4QABoMNjM3NDIzMTgzODA1Igxa2%2Bh9vw%2BxuFB9Ct0q3AN9NiKWJPDpUTlh0Tz0v94TQNm4mCkW4uri48Ptqan%2BpDLAVEzxeE4TYUBG%2B%2BReOsMJgaqgyyIjJssNOLXGZZqiFL%2BzWizXFnBqpO8ZazRYNiOa0QbWgvm7UqiVrKJv2HbqdZ09LjIATRcK%2FbtjYDtEye400l4sm5SPKBi0OraZEwIs1Gbkqwo8yI8fvWSg5Ki74EezNDqRX%2FlX23HTaJ0NngPFpCu%2BTz5gx1l9OkcGLzSZXx5sfkcH%2FiEpqD0oIi69bkGXEWfazcHasOh0Kuw3QII7ELZqdwNqSEksgiNMnv7qIQOt2iFqlU7PHeJeJRon55ipimtLbIfI6uSdL3ivoUwlsN%2FOExm%2FCsFltkIGHKuKaRlu4tnkdocAL7RYKtRxDFdtwWEb4yIG6rQW4EwigWazBuycVmeU5L91YHlrf4bEThAXBkqjGeJU1AiCnjtz6zmk02dKFMrky30FraSIHi7oHwP33JHgkjEM1He6LRPBvJLbpPywKcfRUNFkZzNTAy3XGbc82O70pxFI4FKSp2s%2B5jmF3SfTmI2ayLlPOGrdLvKnHWt1X9mj9VecldDWbqVjgKj%2FmQrOS6TsMxrNiyxgsv%2BfmLnlfoavpl4XmtpILUACdN3g9%2FlGDDDOjPvKBjqkASuKYjq376GS7HPVIy1m%2FaNQUn2Nq9ihK%2BKnuQmPu9iZ3XRjx%2F8oDlYZMmXvOGGT31AuehyrKCqh9QrfOtDY28Tom0DPyv5qv2AmZiaICmF2%2FXoUYuZsq2wFIqMx4uLqRozTHUzEtwqtcfx7BCfRV6ykrJf8RLDizgKXy%2FptztMLHtsPNVhjK5q1UZLGxld47bUss4n7gYJaYUSczjkLlK0IDfm0&X-Amz-Signature=663f20dc2cc52819a51f530d0c4bf4bf2a5403e71c38e128f31ba35b54461817&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4ABOGNP%2F20260107%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260107T210139Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH0CcPilen5S%2BaQDlOMLH1w%2BHbw5f%2FB5ynQvjRtTGA%2FcAiEAxTM99A4CNMim8xeu3L9fqNYzuxIGiOr0dTWzMGwKKBAq%2FwMIfhAAGgw2Mzc0MjMxODM4MDUiDCdJAcQOsouH5z0f1SrcA2CflyHARmSw%2B4duwEDJupwGjC992hwDkyfPr8pUGVfhM89jMvWrttaW1EdX1%2BkY3Pn4xWG9SqltgDHfZGZEcJLColHoYhBq2i4KAML5YeUkDznY5HqJ01U7B8i6jf0O74pSHd%2Fd8ARXCyvCCTU5H%2Fy4msRcBjWcxJr4ypVovLK3n2XD%2BSy3avGUgPeRAkZIK2%2FLXlZ2NYCuLKZ9WlDnBDML0%2BKZp9UIvEgE%2BeW3gfd%2FQ%2BLgJ5t0d1A22JVG8P7uSAKrsLQrHANXW1vfMNAFiPoZFkiHn0Mc9d8Qsr0YJHNncY%2FB60v3%2F7vFX5QVYVgxkaxbaTYsGCcCt5YcVGK6Oiyw4sD6CgMrHN56EzWG%2BO4cXGbZCRCphOa%2BZIWEla5yJ8XxQ4B5HsrY%2F40klHVHbjqQZ4SE3dZbU20ZY8HU%2BsHeSnw3o3%2FkoLL0cT7NujGTPg9j%2B0COf06c6W%2FHOxGhVgf4OPo%2FpzoFsPlcWcQeYS9l07aoKsKzCydwaFQ1tJozgx%2F0tayKQI003FUbEh0kubnxIAAQa5DDLTlBdG30PjrT3KisRHkLEXtgx9%2B9InCEKT9cQScQnwPEZioC3E0vitBtvvvayOiV20R1tNje31iD3bLyGA7AGlrLzG%2F%2BMOOM%2B8oGOqUBtRta1d5Knfbin7xeP1IdVB%2FGL6b0r6IbCuwDtbmAMu%2B8%2BZ31eOcG1kHjiniQ9J44A1RhXWEHAnhZA3WJ3GPx0Y6Hnuj5DvdUc5TiskVg9MGxyJ1YHxnsBkGO1cNwQWi6ZHrteSkpx1%2BqsKbsEKdJujEZn2cC82Hjj5pyd8SMs0CKkITmDyYbcKaJySB8Luvn5MT8Tstu0cjbUDJzPkqsYEL%2Bbi4H&X-Amz-Signature=efd585aa28494c44e18c7df6fbd05d565cbabd0d51fdccce4e2d9364dcd1aca8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

