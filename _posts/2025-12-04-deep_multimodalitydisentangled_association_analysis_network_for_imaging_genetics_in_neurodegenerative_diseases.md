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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663DV2WFRT%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T102232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDIulcaWItNQ%2BG%2BQ1xmifzNNrYxRZji1AAbKQmJBQwAtwIgKT3sJ2Ksw11ohoNA6YHP6uSj4RjaSeG4Pk09Y7%2FKmHAqiAQIsv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIkYDDQSXjcdaxrPtyrcA0%2FzDWChSXP4JgTKWAF72t%2FYMDL3qqtgsbCzACA%2BpdOt1eaSfpDWPxOYjhQMaQkckf5haDcq8t%2FsekaPXUx%2BBQ9JbBR204j%2Bn8%2BL5Q06dMxj7OMbuqIs62uEpOIIOCmgQDXbTTn63A%2F6BwRSOjVIdMRsKJd6rDB8Hk61%2FItzrW%2FIVQg3N3vjWV1c3KFz%2F%2FTJVlk14IuXKpLjNSvuo21GThoBMeS5mva8%2FnAX4guoodD1FSCAtX2NbvJeBldpmfyOjBFWvlOnaBR0dHEPKSPqSeODK6r8bGVAiOT13iDwW0M5nYGyD6UG9QJdBRqwFWMrMbdwaJ1L2OSM%2Frkc0oeaorn83R35J6PBMBPGyn1UYAmPyZjzJYkhK%2BFDYYBNXOE4isf7NlAcX1NJheZRIe%2BFr2Qs%2FHdHNmHeDEKwGPVItFa0tKermE6REx7%2F3W4%2FEjf4xbT6CBKBacutlskxOJseG4JwBM6f52EBSh9uxHssNm1PG0R2UwRcGOtwVScVNz5RvcqwFRTv9CKiH79krMo0lfIFCou%2BXFDGiX%2FXybqMppsxfjp0gjKzxJ3HnIXLmHY54zC%2FX5iqqBfouTDepVz0kjCcNvjiwSrqJ8LMjAoI9pW7kJyqxYotv8oY9ChXMPXyn80GOqUBD1hq1Xg4FdiHUVLDix7XEGdkGYM1DYPpZjcpP6EibUdTTymG4VU1Vee9xm%2BIOCIhBqXcD4cc%2FExaZsnw8UaKp0FNolKZ%2BrAH4UHEIQSWCOHLkOjYZDbjMfJhu7LMuoTB41Pl9CipuikKtxGISXq9862OXImH7LRuyZfLmYX1jGnCkIoj%2FKjS3wFrf2ZMfFVtlFn1KqEwCuc0EyEhkdGJigeCi9p1&X-Amz-Signature=dd06483f9373728c488a1987dc26795f57ae2e35a7d30ba2d0b6c66f1af5dda4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663DV2WFRT%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T102232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDIulcaWItNQ%2BG%2BQ1xmifzNNrYxRZji1AAbKQmJBQwAtwIgKT3sJ2Ksw11ohoNA6YHP6uSj4RjaSeG4Pk09Y7%2FKmHAqiAQIsv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIkYDDQSXjcdaxrPtyrcA0%2FzDWChSXP4JgTKWAF72t%2FYMDL3qqtgsbCzACA%2BpdOt1eaSfpDWPxOYjhQMaQkckf5haDcq8t%2FsekaPXUx%2BBQ9JbBR204j%2Bn8%2BL5Q06dMxj7OMbuqIs62uEpOIIOCmgQDXbTTn63A%2F6BwRSOjVIdMRsKJd6rDB8Hk61%2FItzrW%2FIVQg3N3vjWV1c3KFz%2F%2FTJVlk14IuXKpLjNSvuo21GThoBMeS5mva8%2FnAX4guoodD1FSCAtX2NbvJeBldpmfyOjBFWvlOnaBR0dHEPKSPqSeODK6r8bGVAiOT13iDwW0M5nYGyD6UG9QJdBRqwFWMrMbdwaJ1L2OSM%2Frkc0oeaorn83R35J6PBMBPGyn1UYAmPyZjzJYkhK%2BFDYYBNXOE4isf7NlAcX1NJheZRIe%2BFr2Qs%2FHdHNmHeDEKwGPVItFa0tKermE6REx7%2F3W4%2FEjf4xbT6CBKBacutlskxOJseG4JwBM6f52EBSh9uxHssNm1PG0R2UwRcGOtwVScVNz5RvcqwFRTv9CKiH79krMo0lfIFCou%2BXFDGiX%2FXybqMppsxfjp0gjKzxJ3HnIXLmHY54zC%2FX5iqqBfouTDepVz0kjCcNvjiwSrqJ8LMjAoI9pW7kJyqxYotv8oY9ChXMPXyn80GOqUBD1hq1Xg4FdiHUVLDix7XEGdkGYM1DYPpZjcpP6EibUdTTymG4VU1Vee9xm%2BIOCIhBqXcD4cc%2FExaZsnw8UaKp0FNolKZ%2BrAH4UHEIQSWCOHLkOjYZDbjMfJhu7LMuoTB41Pl9CipuikKtxGISXq9862OXImH7LRuyZfLmYX1jGnCkIoj%2FKjS3wFrf2ZMfFVtlFn1KqEwCuc0EyEhkdGJigeCi9p1&X-Amz-Signature=dd06483f9373728c488a1987dc26795f57ae2e35a7d30ba2d0b6c66f1af5dda4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TYNRJIAD%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T102233Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIQCxRmGhGHosaaw9awYl6FMB5AjoFnCPV%2BnZCGny7o4TygIfKs0fCGHJRqlyX3Yv%2B%2FXbOOXxQzITc2rlzhJBuXJEOSqIBAiy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMq9OdYSsSVvuM31GDKtwDS%2FFtW1EHNSZAV1aVrTJUVURh1g3FBhftXco6LqqnmlV9%2BRVLfb81MUWghMHvO8nOm6dglc%2FFz23UsXwPNWrj3lWcGrzDzkCOMTvyKM9BjzoMvm1GsDCNfBfVb8t917QF6PVFipOnZj0DR3a10DpngnP0NOjLuxbwNA34VDkGXeL9j1uQiKt76Xi5zjQCPLpJCgx7I7H0RkgBTQxl8l8KBA%2Fl%2BEkPNLjRHnvx8v9rtDpujfkVh5ISHTeSO2eaoG2084gbpKeZselQU5Y1DRU4Y4Wu%2BWYXdSmApKyBCckfUikmsGFLlhxsGu%2BS3yMLlMNL1So0niLntxW2rXnTvvWhsoTKai7pOJGCS9ZkT3f%2FLHg5PYAA41MJ66LseNMZnd4IvU7N7lvqncuLsK833TqV9iXMZ3K%2Fewe0CYbXBhhQO%2FIP73xyC2At3qKbHLF5idy38UNUKHkEeLgmSy4bT6G9IAWfHA6nAF2LnHYrsC%2B0LUp%2B%2FiN9IRZuj9qVnTTUMUEzDdsqsQBBG22a5wounC3bCt5PyK5QZHRg16XurJhYeEwWv50rMDwH2jtm8x7PJmWj1BujSXXq1pghxAkJpneikoTe4SNp6u2HG9ZE77wToQL7auvj8oHHUCXjFpoww%2FOfzQY6pgFRwPVspsSuEyTmEjujDFMzcx8YeyjG8Dx2Ve%2F8MIlTyn8sLVOxGmdpAhFu5W%2F1zKKCN%2FOWAZ%2BTgBXFWktDvem5xwovPQylGzcxOKcfKaoa9843mtGecIsMEM49H324ppvpmevD0u46l4dMgftYSBKhYiZpGL%2BNru6IbKbKpGWQ3qfUHDief67xu27TiT%2FsUMG38uWDJgG28BLPK23OzyN1L6PZM2gL&X-Amz-Signature=e99a39e25483e7a3175469234dbf22d368a1b2553092b0b754c873591416c145&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XUZG5JJF%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T102239Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIA7KlAlCz4KZQmYKOfYzZsKzOb%2BYW128X9XJ%2BEAkXZSeAiEAoYs%2BLvq%2FFf2V1VuoTew6FSFHa9cEzn5bCHFLsz6VuowqiAQIs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHYWIia5Mo%2FuT9bA7CrcAwTCx1tjJQnVcNHUY8mb0nqm052uHFIulorQlygdh396qmW43cOWEolTVn1fApf%2FxjGW%2FBXOLUhjR0Q2f7vnc4XL5t%2BdgmHAPIAvAnmagjeG8ogCBuTGvd%2BZUXNcH4HH2Iq936aFmhlFq61gzPfBNhEG4mYXUEjiOW2vEIeEM23QZWXyoCwReDSvnEDVV%2BXptQKNc1MEFypbFzCeYeDg7gJXPG2A2TI2evugb%2B6fhkG%2BmQA%2FJT6ld4oy5fu%2FLipDX9ZtiJKTc8vYFAG%2B9E00eg2rThnZoQmFfwWOrg%2BJhsRkc2xs4oaG8nhyQPhRjeaGCsdhSEd6mJko7Hgb3RHrYorLdtjQHoq2oaJctGwpk1sB7P3TrfOqCNrxrdnFbu86gHFqYFS%2FsO1wTJ%2BgepKwdF2XNg51ZdpEwYFWj5%2Fg8zVyGa3iUGF%2BDB1H%2BQxoKOuyunjwTc0JLQoo3%2F3teTbhAIo0ApcSDt90CuFre1Xyx9hDZ9MRaex6ScQpCJmmgfBy4LnkBB3KuRuiq4sPFI5BYtzG5stbf5ih%2BNw8TyggUewQRx3eyxqLniY%2FDMJQoOTSzI9guIK0F5dhQPxS%2FWwhZzhQhJTqVGKPBSrPPRdz8u2buODqJvu5wFwMjHQxMNH0n80GOqUB%2FGToOKM3k0sbPPkN4tMEorvKsw51ktuVZ9a3V7XrSq9VQPfIEalB5hQ9rQagtWYXilHyLSTfrRlta5%2FcyuF8lpikdU1QEd8wo%2Bz8Uw0qI6VsKTIoasPQVxVlYVlwyOJ2zirqrPok5gNcCj%2FYa9a1kySHCoc9TZPVeLCsRYPN%2Fi%2BHMxmQUVvv5Yvdr7CaNeDkBCt1Juuxv5lmjHzG1hbi0zlmBKzU&X-Amz-Signature=f0a6905181fb53c9c012f5629e0f5cfe44b5f3f06ff38114b98a62010da54447&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XUZG5JJF%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T102239Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIA7KlAlCz4KZQmYKOfYzZsKzOb%2BYW128X9XJ%2BEAkXZSeAiEAoYs%2BLvq%2FFf2V1VuoTew6FSFHa9cEzn5bCHFLsz6VuowqiAQIs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHYWIia5Mo%2FuT9bA7CrcAwTCx1tjJQnVcNHUY8mb0nqm052uHFIulorQlygdh396qmW43cOWEolTVn1fApf%2FxjGW%2FBXOLUhjR0Q2f7vnc4XL5t%2BdgmHAPIAvAnmagjeG8ogCBuTGvd%2BZUXNcH4HH2Iq936aFmhlFq61gzPfBNhEG4mYXUEjiOW2vEIeEM23QZWXyoCwReDSvnEDVV%2BXptQKNc1MEFypbFzCeYeDg7gJXPG2A2TI2evugb%2B6fhkG%2BmQA%2FJT6ld4oy5fu%2FLipDX9ZtiJKTc8vYFAG%2B9E00eg2rThnZoQmFfwWOrg%2BJhsRkc2xs4oaG8nhyQPhRjeaGCsdhSEd6mJko7Hgb3RHrYorLdtjQHoq2oaJctGwpk1sB7P3TrfOqCNrxrdnFbu86gHFqYFS%2FsO1wTJ%2BgepKwdF2XNg51ZdpEwYFWj5%2Fg8zVyGa3iUGF%2BDB1H%2BQxoKOuyunjwTc0JLQoo3%2F3teTbhAIo0ApcSDt90CuFre1Xyx9hDZ9MRaex6ScQpCJmmgfBy4LnkBB3KuRuiq4sPFI5BYtzG5stbf5ih%2BNw8TyggUewQRx3eyxqLniY%2FDMJQoOTSzI9guIK0F5dhQPxS%2FWwhZzhQhJTqVGKPBSrPPRdz8u2buODqJvu5wFwMjHQxMNH0n80GOqUB%2FGToOKM3k0sbPPkN4tMEorvKsw51ktuVZ9a3V7XrSq9VQPfIEalB5hQ9rQagtWYXilHyLSTfrRlta5%2FcyuF8lpikdU1QEd8wo%2Bz8Uw0qI6VsKTIoasPQVxVlYVlwyOJ2zirqrPok5gNcCj%2FYa9a1kySHCoc9TZPVeLCsRYPN%2Fi%2BHMxmQUVvv5Yvdr7CaNeDkBCt1Juuxv5lmjHzG1hbi0zlmBKzU&X-Amz-Signature=849ea41dd3313bf3b014b4a297a68250db4f7249eeb8c5182ece2d1712b15bda&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667CLRVTVR%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T102240Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIC7UJ36D6rGd%2FAeSwwhAuLfkv0iI%2ByBAHKONpxnI%2FJCyAiEAhwgIa7teYNH%2Fx88QDN%2BYfbh6P8P5TNsGsMY7i9KJUOMqiAQIsv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD8xJ04AUyKbBbRBBSrcA7TmQUa91REDRp%2FGRIP0ARW3pfc7nLDJZ8kCkurj0njKb5wv8CLnDSaoEjAyM18wrbacmNT8K5kJ%2FK2xnehVXOHVBp8zRrOogMueok0ULYqlfO2Mav%2FsxbR3bZpVPSl3Qjloa7%2FF4OKUjma07LSBEMew3Lj%2FAsB3h6gWC2LV5pXfQ82irPo0b6m1IbiTZKq1fOBRJmFMLCPa9j3M7Nhg%2FutIfLTRBffH8YqwbYVCtjxXiv39rLfNHG%2FsQrALAw0Y20JxQfeq%2FHeQFwnUg5BkJ4iATtMshrmHKeEbjMzAaEw%2FpyBLN0%2BoxDZTbXBHWkF5iRLd9oWxoNreTuudwtwf71oXLKfxA0ZEyz7rk76LHFFtZ6VO3feKNeke%2FTuyB33aY%2BJ5AjhkZg3%2F%2FGmgkEoxKd8goKMZVKLP83n1xSGyLxQ2T1gtxfItsOrzcd3ymnx9LNbJVCw9yvWHzUaFOKOLQsnpH82el751m1oU5bfD7ZcpOCVAaWzNk1giRx6pRO%2BbyDJTjT07TAOiI06Fr62T8jd2zDkdaPmF8QHMSYTKxxIsLyOV7mfgcQuO%2BLhsCTMgKcvbc16QI0cwgthzjlvGksbh5KGsWDb236D105QpIv1dyX2x9xGQ9MFt5LehMLz0n80GOqUB9YQu%2BUELKW88FscrRIuKeVWD8AEwPcQaGivYH6PLstevhRn%2BZRe0SaR9eQh7RGMtT8gHpzqafJrK8A6D%2BZLnEan4ClThwlrVEu37GS0XQ5ZmbqRnVJvw2hbkxw1VscoVTvkz%2FDAI0VqqB3nhneEaC0YQYephnM7LKtxOR9WF4w1BxRDiq3Y5Tk%2BeJCZgBqQKCjLl9Iun1WPTigdZqzEjs5RgmbVm&X-Amz-Signature=3d3e7e92123c0c56d5e5cbab2563fe8d6529c58e7448a6211793cedc6f663c8e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663LI35X4P%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T102240Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIA6sNgdmv3jCDd4GC0AXDdXzghEcuiy4zYhn5YN%2Bwyg9AiBEQOXmFgMdsiBIcFFHfmlzWp04XDJy1d1IA%2B2y8%2BFflyqIBAiy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIME50ye0TPkHHdglj4KtwD2RhmYzsQHXbq1p00LomWaqw%2FCJMlo8ftXUJlVZtE7fGDEzOx9G6LMUrFYz%2BTF633XbBzLrUACuMdYIIKXkwB0sZcxPBdgDahwcIWByYMAnXdHq8MlfFwZ%2FRqbuiViaeVOLfpIc%2Bjadq4gh9n0VGR78yHCFXH5GjnRivSx4W7JmqqcSkeTKMpu0iXPhHdjRdOSg3LSQOg1XPpWGC514pMNocyBmRmhCmTf7nHqifcdOXO5zMGWubSTaEg6Gtu%2Bw5rKn4rqnID879%2BW44oAGGNf7I7SJ3iGdw934gYUdqQhhz9%2BRyO031IwZNn0AViJNVc9qYggRPRo4WjmcaL%2FXRypaF%2Fi8cSQyNDhJSvXjuPJH%2BdrVCqFtuobHetJviFb9%2BEdBE4STX1Gful0hc%2BiSYMqs%2BH4emqLMMkgVSvTeGBo9o4eoMQHRo7SUTdVvjSld%2BEkz0DPz1HUJrcIGFUDzbefTMwBgb0UpILQhr393%2BcyO08tez0KjuYD8YKh%2F3tNdGAX6PKIUd37eLIptQlecOBscoOn5AttXNo0esUQS1E0vb6TnG%2FMwcpjGF3lunpdI2WYkT%2B2g7GhLUUb9GlKmQnH21hf9IqSpDB22F4H9R5p9y639qJwkJ3GruqARwwyfSfzQY6pgEBP%2BW3EASMQht8r3HEdo3n4bPfcuo0G7yYTj9qnPUQ%2BE0NKblpGdJVgfyLBdxMHcCeve3HzpjVk8IcYZJQzTvJww8hJSf8Ez94J%2FY60BoFtTk3XkXYP%2Fyl%2FSq6QcLFMw3%2BOOpYc7HyuVi2FPvbHVfmCv%2FaKp1ylfhqacFbDA61F%2F7wic4H%2F6oK3wnkdSrSzGAHwMfmCxKfGPRGdgQoLQXXQwRW0Rp6&X-Amz-Signature=e8444a726747371a4a0ea5fc3fecf6a6ca09ed85e0d2bcb2ffcb5c67c55311d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UOWE2R3H%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T102243Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCzOJCNyL%2BtncLa8fDRFLFCR%2BEjw0jKoeI2rHENX9HlZgIgXbYlKg3sHGPxyZ5JM3m86ePG%2FH1HPZqEVyU5c%2BpbPJsqiAQIsv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDrVYKg9wk0EwwuVySrcA28z8CEqrynPDIux8ueAhvN%2BPZWk%2BPwfUZpzhChFrApVUlsK%2FVCTuI%2BOKJwIK6DwpYxt2N9%2FD0D8v%2FY6IjvBV7sMXDhM1x2w%2FJIdNucv4%2BvVDYhLuoCkBFP4EF1%2F5BCbBDsqofp%2FbxiM%2BMc18wC6lgVQ1Z4krr%2BiPEygQacFxG%2B5URJs0mkjFPoUC3dtooYryLav7SajV4KPfVl1IXs%2Fgwnm15Je4VKZmzxacYT6%2Fb8jNRBURLBqRaf4ZheaAY%2BKPFAGy975spUtX2eO7IP5AQzxCM9RZpuGrQw5fk9Q7jbJ5ve1pfgd%2F7Eyxgblix6iB2f6J4RPm1TlPn2XujPtsd7rer%2BEZthwgqYNifLN2sg5i0VIuqubnYnH0%2BzLEt%2FwN5zokMlBTDS2VNU%2FGDhCsH05vj8JObDQuSX7oJm13CWSpOPj4UfBMSKcs0bD0aiqoyvt3iLu2Cc%2BeIMTLAQWoGtpTd7gtAdjsrNGZO3B2XLCmJLNxiaLFQY7wkaNV9sA2h%2BHsIiRgtyiZy%2B%2BE47XEetr16uHj5ljRw6dodn0ZO9ZnOAo%2F7XVmQx0fs8%2Bu%2B%2BOWNBPWMTQxF1Xf3HnYWblDt%2FWfmv34q5oc9sP2wskXJmvJPvdVPCvRA9Z2PqxMPn0n80GOqUB02d6eNKyjAgp70o5wPEX1cYK6PCdo8yBKiRlj1IXYI3829Bin%2BR4AdZVf%2F7HWHnfgwJvmq3VXrYKQDNJxwGe7vSeqRorTyo%2BEcjvvky%2FXtWl4dhYX8HVP5C24002c6sFvPJmJ9RmfJaiJnYyKgIsjzz4z42dA6Hh0rIr22DjzwZlh%2FMxqN3zQ2IXD0XPwukWNAbH3gF%2BynJMqAcYImx%2FDFc9YYYo&X-Amz-Signature=b6966a837987b422cc95c5ce7908f2742d3893cdc0a0bf515bb8167e6aa7d92f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SQFGV3K%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T102244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDEdmgDf6VTghZEiXL3LnyONzt4QmFc6zcOFJhDHewwqgIgCQAsZgpp%2Bx1%2FHGdxm31%2Fq7LWcVEDM86EJWITImCPyBkqiAQIs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC8owa07KMrvbUfffyrcA%2Bm6h39xigms9xbVSiNT%2BBSG8ThSQMF%2FQAPOmgDxRwZik1OFG84WZklrTkiWjub%2Bjtrm33GqWsaB2eYzzlB4lpwF%2FB1mJa8xKrxnC0apmuD%2BroCGcaAIgRwp5aGqnNHkDSdpflzOWYoZJL6GlqR9As59AMK9zlIvpW2OaXqOWtQ9OAbqt598ZJ1Pkw8J7f1LuC%2FF20O4uvaoD15JxRDtcKU%2FfUgYm2F5Brd2rsUTWqBPhknNSMe91rKJ5K8U6f2izgCRgOdS%2FbYAqBjMw9SFziR9dUgmAHlWjP%2BLoBxSo46YGsDyHSIbwjyNmtahwNK1mq0tl1BW3qpkDJS%2F4%2Bjjp%2Be6QNXebA4r4ax4v4MNdpUpOJ7QZ9%2BHwdjGefPMQRrcd57CwFrGOvtNjNJkclf%2Fz1qZ7uWGuFgsYbjilUWXuYTZd3s4ISHPPHtBe3UMkDpDVdvCuZ6cefFW1PA7CgXfVMHjV9KWo9Lrq88A6E4Yppdhq7rjXy9ym%2FqgqJBmi4qoysL7dep3IDCgYUgQ9qUEdC%2BjDWO9r1w%2B1KdRHImtl9gCEDMIYS%2B0HqwTFPy1BQgT3tStUMUoWfZrE6OTDHbAPP7ivLjNDrdXkmfbpFlUuTln9UsVKbnHhuXNQZnpMLz0n80GOqUB0n%2FYdzPDq4yWSBh4y0E8SyuPQLDEHO7gJNmWvr36k35vXmpZg0DYxTykzgPYBBxlNqlxJybXTlX5mK%2FKqTgWsnJqJvCHNEa7A6R%2FQ4t7b45PYVbYoBA7udzYl2l70ysbL%2FMXTkp7fD4RInhc09zs73ZQz%2FJ%2Bakf0Gizc8RXX8OLZRNVK5JZPT%2BGqiF%2FPPs9QC7vHCljCLn%2BFgpsL3hTvaDDqoILf&X-Amz-Signature=6a0e593a68b0507f8153c6bc3486b8a9e9c30a3b625132693f4b846b77c04aad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665SQFGV3K%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T102244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDEdmgDf6VTghZEiXL3LnyONzt4QmFc6zcOFJhDHewwqgIgCQAsZgpp%2Bx1%2FHGdxm31%2Fq7LWcVEDM86EJWITImCPyBkqiAQIs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC8owa07KMrvbUfffyrcA%2Bm6h39xigms9xbVSiNT%2BBSG8ThSQMF%2FQAPOmgDxRwZik1OFG84WZklrTkiWjub%2Bjtrm33GqWsaB2eYzzlB4lpwF%2FB1mJa8xKrxnC0apmuD%2BroCGcaAIgRwp5aGqnNHkDSdpflzOWYoZJL6GlqR9As59AMK9zlIvpW2OaXqOWtQ9OAbqt598ZJ1Pkw8J7f1LuC%2FF20O4uvaoD15JxRDtcKU%2FfUgYm2F5Brd2rsUTWqBPhknNSMe91rKJ5K8U6f2izgCRgOdS%2FbYAqBjMw9SFziR9dUgmAHlWjP%2BLoBxSo46YGsDyHSIbwjyNmtahwNK1mq0tl1BW3qpkDJS%2F4%2Bjjp%2Be6QNXebA4r4ax4v4MNdpUpOJ7QZ9%2BHwdjGefPMQRrcd57CwFrGOvtNjNJkclf%2Fz1qZ7uWGuFgsYbjilUWXuYTZd3s4ISHPPHtBe3UMkDpDVdvCuZ6cefFW1PA7CgXfVMHjV9KWo9Lrq88A6E4Yppdhq7rjXy9ym%2FqgqJBmi4qoysL7dep3IDCgYUgQ9qUEdC%2BjDWO9r1w%2B1KdRHImtl9gCEDMIYS%2B0HqwTFPy1BQgT3tStUMUoWfZrE6OTDHbAPP7ivLjNDrdXkmfbpFlUuTln9UsVKbnHhuXNQZnpMLz0n80GOqUB0n%2FYdzPDq4yWSBh4y0E8SyuPQLDEHO7gJNmWvr36k35vXmpZg0DYxTykzgPYBBxlNqlxJybXTlX5mK%2FKqTgWsnJqJvCHNEa7A6R%2FQ4t7b45PYVbYoBA7udzYl2l70ysbL%2FMXTkp7fD4RInhc09zs73ZQz%2FJ%2Bakf0Gizc8RXX8OLZRNVK5JZPT%2BGqiF%2FPPs9QC7vHCljCLn%2BFgpsL3hTvaDDqoILf&X-Amz-Signature=64ce3ef2ec2ac5c3158275683cab9b2e58b0c50c6f75f7ac07b84b646f86435c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSS52BUI%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T102231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGCoqldfWfkvICRKdYYyUoQuM2itKtXzJ6WTK2B%2BGTYmAiEAyH4gyHOLMIbWRq0BRgJhd1VqxUfabSpJqgAxL2p%2BXkoqiAQIsv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDI7xBnWI3YPzILiTKyrcA%2Bw3ugRE%2BIMMB5N9JOe6Zhw4kdTmeZJIZnQ9rG4b99pVCOh4nPdjmvJOATbP%2F4I793ySHXetaA%2BafR3yD39NvEr8MtZD2z6raxwl7ZhsghAaxvLBwphBSK99Z8CqfpFZb8nekBhtFAHdS1089%2BfzG4FWfCStkueiI%2Fh1bEmt3dDloME9Dw8t6kaU1%2BFmBMRRHACnay8IBDJxk9K3T7JGhudj9kqXOYaqMEp3CL8StD2lw9uXqZXwFoF%2FStAghecuNoj%2B7q4QB9F28HjF%2FxUHIO%2BM3DlkpO7R4ELoLZ3RMD2eXCY6%2FgnsdAvaCjLc21WvPmfQr0igdKoMKrTAv7%2F%2BWr%2F9ElA8udlTFIPEC1vVQd0pIzr7VPvqX%2BqN9GYwYW49oD7EZNtjIQucgXvcCVSPfEYogV2kw3CN0gx%2FoX8QvVqETjBvlL5b0YNFqHxOApDiPyKHA2jfIE7NIAg2OD8xew%2BHOcBaMPJIZINBAS4kQlbDNguuAuO0Kh6z4hpPsGeW8hpB5Mce5rC%2FpSHgaLiKxUGxohIZAJe3U4Hr4uq8fy5nd3psu1kB6Rs5N8OoHdiqMx7HT%2FhdCyr1y4GeUyKCCEoiA5W%2F7kIap%2B32XL5Q%2FhAjq%2Fi%2B%2BgAgKp0A4s30MKP1n80GOqUBHfOONh3yNwJMqqH2ZOZrMNouvb1VdfNRTJB0%2Bnmw514RCqgL26UMlIwJUMZt3Mw%2B60qDIQjRyrIdfZuEJ6MyuE4Fsn%2BfsQbuPDh4PRWmUNn5UYhXSs2Avundl1iMLQb%2BbbUYtPhM4wvT0LfalRGi5jFltjQFSrMrIVzuu%2Bx%2BTSj%2FRZ%2BaVfmgcR5KDZTailvTBWDXv20LbiE0hlQLqOX6l4Zeft6%2F&X-Amz-Signature=50975aeb1d02d484cb68be7c9d08684edd8953b8a43e04803bae0c7709bd9774&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667OYVMTXT%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T102245Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDaYAK9Oxx%2B27dFimiEPAwczk1C6n1yljKARbYdm0DT7wIhAI0ZivYzgAMuasDHP5pvV1ETApptV%2B76WUdjkMXvy6BTKogECLL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw5S4jdSwX8%2BpjOMa8q3AOGyfwVnlk7dFmBwQh5Pzo%2FVvFTS5LODUDGBoWlCD3TXZz7kvWTTc2PxPdKRFFGbrfgkQgBpHB%2B%2FSRtdi6AQsnnEK2SNfXcPwP0Ugb0OYXkyuC6mFoEVx3ceK9i5PT8pAe9WQ3AKdpPR%2Bawkz3B%2FrQO64pl%2Bx7ssuu%2FhdNBhQO2Tz%2FC8LAWvSkEOQ%2FXAzpx0XVnVqYHkOCJ5pNqZYdBtsRNMQRldq651Pdsg8LnT6U152X0E7EqA538MqabLSYE58SZGR%2BPytNuCMvZLM8TVeeQaeqtm1txzhpLQhAHfLPQGKo1BMnUmrQ4zJIAoEuq9qzBTD4sp6Om1iZrB7uLAL4Chiw185PQgGj5NMnnsglEeoeGdL3vxYNItPg%2FDYbESWq%2FCf3aHd9rwxqfMwTDZQeb%2BNzW7nmhi9gckyTVs8hPpI9ZjE4UBFBjNG1B9Ds9pYQcDpGufG1fl3ZDLHE1uHICwm1KupzHCpbSdGB%2FL0fB5hrA81%2FroZNxZzZJ9nf8Fv8vb9NIdHFRyDUDavHlPIGut20GVIJH0OW1y1H3%2FVEi35MLMsYLXoieFm6u%2F4pYWx0ociFmNPm93T0kzqyhpIL%2FWhH2fpUC%2BJugiAiLKhoFP0mQcN%2BnrUmocCPaIjDC85%2FNBjqkAQr2qbOpPJ1acCkUBd7IqdpDm6fjclWJvf08DccPgS%2BszUG%2FBXjz1BwZ8S3JhDSwC%2BcFwNJFX2MzK%2BSdvhVx6qgVezc5CYh3cyGPxwETWZflKZbJxGR6fLwhTjDBp4%2BRNnJAK36izpDpGU7blRGCdUx4fEaM01C1eQVzidJ%2FvHH9yAvd2xnxlDJPcG8llozbup6NgNgJF4BYavhndLDyuljpssWd&X-Amz-Signature=3eff934bbc45a545865ac5d955981a08db67abb9014c27968f7ecaf9e8a7ca49&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667OYVMTXT%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T102245Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDaYAK9Oxx%2B27dFimiEPAwczk1C6n1yljKARbYdm0DT7wIhAI0ZivYzgAMuasDHP5pvV1ETApptV%2B76WUdjkMXvy6BTKogECLL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw5S4jdSwX8%2BpjOMa8q3AOGyfwVnlk7dFmBwQh5Pzo%2FVvFTS5LODUDGBoWlCD3TXZz7kvWTTc2PxPdKRFFGbrfgkQgBpHB%2B%2FSRtdi6AQsnnEK2SNfXcPwP0Ugb0OYXkyuC6mFoEVx3ceK9i5PT8pAe9WQ3AKdpPR%2Bawkz3B%2FrQO64pl%2Bx7ssuu%2FhdNBhQO2Tz%2FC8LAWvSkEOQ%2FXAzpx0XVnVqYHkOCJ5pNqZYdBtsRNMQRldq651Pdsg8LnT6U152X0E7EqA538MqabLSYE58SZGR%2BPytNuCMvZLM8TVeeQaeqtm1txzhpLQhAHfLPQGKo1BMnUmrQ4zJIAoEuq9qzBTD4sp6Om1iZrB7uLAL4Chiw185PQgGj5NMnnsglEeoeGdL3vxYNItPg%2FDYbESWq%2FCf3aHd9rwxqfMwTDZQeb%2BNzW7nmhi9gckyTVs8hPpI9ZjE4UBFBjNG1B9Ds9pYQcDpGufG1fl3ZDLHE1uHICwm1KupzHCpbSdGB%2FL0fB5hrA81%2FroZNxZzZJ9nf8Fv8vb9NIdHFRyDUDavHlPIGut20GVIJH0OW1y1H3%2FVEi35MLMsYLXoieFm6u%2F4pYWx0ociFmNPm93T0kzqyhpIL%2FWhH2fpUC%2BJugiAiLKhoFP0mQcN%2BnrUmocCPaIjDC85%2FNBjqkAQr2qbOpPJ1acCkUBd7IqdpDm6fjclWJvf08DccPgS%2BszUG%2FBXjz1BwZ8S3JhDSwC%2BcFwNJFX2MzK%2BSdvhVx6qgVezc5CYh3cyGPxwETWZflKZbJxGR6fLwhTjDBp4%2BRNnJAK36izpDpGU7blRGCdUx4fEaM01C1eQVzidJ%2FvHH9yAvd2xnxlDJPcG8llozbup6NgNgJF4BYavhndLDyuljpssWd&X-Amz-Signature=3eff934bbc45a545865ac5d955981a08db67abb9014c27968f7ecaf9e8a7ca49&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QZHOXG6H%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T102246Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEiHXyPHEKKp9pFy1acIatG2MRSC3ITC9o7lU0a7nwruAiBSD7ht%2BEPuxD2%2FsW6KWcb063EAiBB51I5iYph9W7Jq%2FiqIBAiy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM9P4L0F%2FhCthilWQ6KtwDlY106rnBZxUuetbeV3pkHyAKy66niBhD8B1rjcl%2BCB%2Fpocc51309kgfCvQDlOzTre92i1faGlbKsC2xNQVbASORBbJgkwzV4hL%2FtxUAFN3wUk9q5oTLIofq4gadTEj9%2FtxupLj21msR6wxM9ORb3OnUazYEk4KxiGmxjnFFjeYa2%2Bk2W%2B4ncCowvn73Ydd7qyQTRBra32ArrVrJaVmEHo7AwmubFhmisj6LgHfqcQjdRruVRepLlqCELMXGF%2B%2FT%2FN3Si9QqqoNLcfIp2p5octqCVbdvs24SkOhAvc86yUSb3mUlOUuehw%2FtxBZ6jhEg6%2BiR%2BloVgBbq2uqP2MC7J0VWoR8R7GI52fQmOZkBSFc0HUjGdKD8sRWGD3ilpqWQY%2BvfNnMK9ZwSQDDoo97IphiDUWIu9hUT20dDGtU%2Bc9Q0p4JsxyDC%2FEA6vp8L9ohC%2BrcLttUr%2BLUiKvMMLci1HXDu4JqEF9livn1cE6L1qZg%2F3cjnyWiOl%2FoWe%2FKdtNQnvzyizazqBlO7HBmjdfdGsd5NczcjjstRwe94GFQs625lRijNjZBhJ9XdxacVDcdcGC7GHt%2Fde1eu5a1p%2ByTmgCgS1pBfFlIxzuNR1voWUzGrxfebB5ZcoHfsd5Dowx%2FOfzQY6pgElTYkX8b4VNHqm%2BG3V49HpkG6Zgy1M6O%2BUW4aGgNdVBEh7IEuI6SDO7cCNKE3OevyFc0q8Xzmp53MhCGSW10yNHk89aCFXkmmglnmaK7tIPbYhobgZWF60C6BfcROrvWWWEINao3doUkq571wTgegzF54j7bC1%2Fwr%2FwI5JSfMGzQDpAY%2B9QLaBxb%2Fkv5e%2B0fNqwysh7NskEuH%2F6UFabTTkYQqZEjdA&X-Amz-Signature=5a0b760ca1a011b1a92ae587f25353bcda8f74618f230cc3f77ca838abfa6ac3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

