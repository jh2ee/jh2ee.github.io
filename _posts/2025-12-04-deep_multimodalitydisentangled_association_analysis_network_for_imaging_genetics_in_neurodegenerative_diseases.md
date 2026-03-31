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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WGZWTQWM%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T212539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIDWUGDRMLv1bwgziK389WHiTtMd6On%2FJGVFqrROuD22ZAiEAiNdipdTioN%2Fw0cW2aoXhe%2BtvdMLZkQaX2Swp2xyWP5Eq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDERRYuabfgcVqHOi6CrcA%2F4obERdbCQ%2FWWXz7jJQFOwk92favTJGBH79f5AYAxDQ9Wvmo0ezGTK88dcFG%2BQpGMOy4meR%2Bzl73OrjumkrHwG5CeZ7QfKyDWTNOH%2FOvhFL5DSOpSD0BoH8y4D3dT8Ud4Ye3HTnLN0ogWbQzPQ9XS4bQe7hZPPzQqn9AzW%2FN1g4lQpRAMORfFD2h83wNZLUgI%2FWNqqpgEy0ytzoIlqS3AESpYTFV1mTqn8VMTL%2FLTz9f9utfK1OnIbO9OfNoyaZXwdfvVRkrH9PIE1mOqnn4E3Yg79FjYICVyK3Z4V9v9fo75OI0LaerHp79QKz7ljuy6aJBFUKfXkXnF2l9GAN0RQXO%2BJFQ1A7IQLhO5kpHcf6b72%2Bpo6E1bxA2nlQ4jSJreDCAqo8nG%2Fcem4QhST%2BFzWrZ%2BjMjU%2F1YEXumyCK1jwllM1UEGFHwjwgVzAELp7Azv5OrmadRpHBfHRqpGtbRwxojv5d7i2GYz%2FX1nf5gRHFHuQbfgPiM%2FoBjQfAdyOHsTrts9IACdu2mA%2B7tJSOp7eeEynFpVMSRMjuhpHow6e3tybV40qvxWsMu6SU0t7rvdebPZPzk5nNi8isdTTZkLX5xiKpeZvYwfXOg%2FHN9cxphMG3sxs9taTrdbvzMKPlsM4GOqUBTTpap1RMIRKilYPaBW2KSsmqm%2F9ruKtm8MQAaDesF0d9JkyvTqoLLA6yuTp0TOiSS1MLsTKSqCo8J46o83qgDfCH%2B1MJ1rKc0Z%2FChu%2F378KUyhbGjk5k3fVkOMhgFfoI%2FQSrwxWCm%2F69KRHbxds7eqkyRAa9cbJ%2FLhBbjvGVZMTMfPzxRghK7WJfXf7o8jE%2FVIWuoTL7qT07jzwecad24%2BHksv98&X-Amz-Signature=093ff630e0712c2ee54a1b2db76a7ac474dd0c88edfc7e542324e7cd92c0e52a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WGZWTQWM%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T212539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIDWUGDRMLv1bwgziK389WHiTtMd6On%2FJGVFqrROuD22ZAiEAiNdipdTioN%2Fw0cW2aoXhe%2BtvdMLZkQaX2Swp2xyWP5Eq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDERRYuabfgcVqHOi6CrcA%2F4obERdbCQ%2FWWXz7jJQFOwk92favTJGBH79f5AYAxDQ9Wvmo0ezGTK88dcFG%2BQpGMOy4meR%2Bzl73OrjumkrHwG5CeZ7QfKyDWTNOH%2FOvhFL5DSOpSD0BoH8y4D3dT8Ud4Ye3HTnLN0ogWbQzPQ9XS4bQe7hZPPzQqn9AzW%2FN1g4lQpRAMORfFD2h83wNZLUgI%2FWNqqpgEy0ytzoIlqS3AESpYTFV1mTqn8VMTL%2FLTz9f9utfK1OnIbO9OfNoyaZXwdfvVRkrH9PIE1mOqnn4E3Yg79FjYICVyK3Z4V9v9fo75OI0LaerHp79QKz7ljuy6aJBFUKfXkXnF2l9GAN0RQXO%2BJFQ1A7IQLhO5kpHcf6b72%2Bpo6E1bxA2nlQ4jSJreDCAqo8nG%2Fcem4QhST%2BFzWrZ%2BjMjU%2F1YEXumyCK1jwllM1UEGFHwjwgVzAELp7Azv5OrmadRpHBfHRqpGtbRwxojv5d7i2GYz%2FX1nf5gRHFHuQbfgPiM%2FoBjQfAdyOHsTrts9IACdu2mA%2B7tJSOp7eeEynFpVMSRMjuhpHow6e3tybV40qvxWsMu6SU0t7rvdebPZPzk5nNi8isdTTZkLX5xiKpeZvYwfXOg%2FHN9cxphMG3sxs9taTrdbvzMKPlsM4GOqUBTTpap1RMIRKilYPaBW2KSsmqm%2F9ruKtm8MQAaDesF0d9JkyvTqoLLA6yuTp0TOiSS1MLsTKSqCo8J46o83qgDfCH%2B1MJ1rKc0Z%2FChu%2F378KUyhbGjk5k3fVkOMhgFfoI%2FQSrwxWCm%2F69KRHbxds7eqkyRAa9cbJ%2FLhBbjvGVZMTMfPzxRghK7WJfXf7o8jE%2FVIWuoTL7qT07jzwecad24%2BHksv98&X-Amz-Signature=093ff630e0712c2ee54a1b2db76a7ac474dd0c88edfc7e542324e7cd92c0e52a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QOY6CUF2%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T212539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCICphJFHJtLeBhNSMj7rknK%2FIsm59UWrKPvF%2FeZdIAZt6AiBl1lbZOmIz4oU9l%2BzYQ06G%2BD5tRcGDG%2Fb3YNUJ4BGCDCr%2FAwhGEAAaDDYzNzQyMzE4MzgwNSIMC4UFY95vL2vkTjPbKtwDvV8PabyLgJmUVrLUDhCAzIDSB1ECvXk1qinqhASCSy8CCYDaq0f6OMywqjKG3ATDqZ6943lWJY7OQDjLYXWd0gEmj2KAzW7z0AshdUY9LYtr0BRqfYdRqBYCaC52nSo%2BsYuX0kKQ3wFn7da%2Be7HFlkg5mj2JKiUDnfal3lDAvYs9NRSUCBKFzRth%2FoOmhQet1%2B6hQ5U8vdkOJXngpZmLoWLPQiW%2BnkUzzmTiu4omD5K51GjxsC5bqGQL6wkLxLc17Xunm8yPRJ4mRv%2FNr4GZODRo18OY2%2FklMi9FqcrG0wWXS%2FBTR7%2FaB1tucnITug0ukbJh%2FI2eQZtGPY4GDpQwazXdRUDIozbbETBy6%2BUYTFWzrFM7Qs1tkcBlBVcL67m00FbqfrPBr0DMe2Z%2BohhRd7eBj0tz1fpgR5%2Fr0O7ayQKd5FaqSZnQC3B3Etsto3FgkRQWzxxw0YotUouxXfpHDJ16IO%2BlZCbAtOSlAs9wSzxbMryOAB2BmzU978BkoE04LqrAPE5utIq1pDvoEjWYl%2BR072cMUamZpoH%2B2mmzVPw4ViXRDMPLF2hSolxiNUmiZ8kHb%2BwbzaV%2FdnYNAQGJRWXqZSfP49Jt8X3MiDdgjQ7h5Pq6pbWXJmCj40Mw1uSwzgY6pgF6O2tHtR1nsM8NPHoJihd1fGdk60w4v%2BYLtERyUQ88dXt2SW4Ydr2H3GkGLpPnBy7Q4IolGYeGycbtpNWlBTNk2e5F%2BXGFh%2BVXL8IEe0K6nsGEv0LIj1LnlNd9J68JqkbWEEpt8wrWHGwrWtO79Ojn0fQoGMSKFh969%2FPdo4gXEDXcTfcK2j1RCX4pGzJwPzM9BOkjQYvS0nnL2b1PJ1CIa0T2x9q%2B&X-Amz-Signature=11ba79fa5609e5153133279d80f20aa3fe2440741855c830d121be7f689428d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XXX4JAXI%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T212542Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCIEVxDEvUaLkxFx9WbU2yMPaobnNCmw6cBfJ5ptJ9kKvIAiAWU1ruvJv1w7uBCQh5D%2BpN6rX%2FKvR4oL9tkypb%2F%2BMMhSr%2FAwhGEAAaDDYzNzQyMzE4MzgwNSIMDy1YhkqN6GN%2BSr3iKtwDcyLirYxv2u9YtUabgQ9DtcqSnjyUxoljawZD2YTuD2RZ5tPoIDN%2FFa1vUZ30NnFPsfM1ejBFOCmXW%2FvM5mXi0asqlqXUR4loQWv%2BjvT19u%2FUkZxPUuRT0jT6RsjfF86wlJQEIx2SeRxjRgKe9IzerHILcgNi9cVetR6XTlLC6wSbkKm0jPJc1orod5Msu0TSHNVKgvYKM3JrBqqUp0ZCthI7Nhi0UYboSKE6um%2FVBIRSR1jtA8PFugVWRvORf9CYMxkQNAZRUldMNvo8E9A5EnxNVXTmMeaoNGZ7lWpIJwCnqAuQOzOa8dkl5aDdwMKh4KIdv%2B9xDqn3Mdzqv3CdHkV8Go0JRfm6rTgPmh0q6JRLiyWGeg02WXd7vsHhSn2%2BopQoCZgmL6%2BFMl12XzXP3wFRoTpLOjouNqY1VQFy1P0nz18FGQ1K8CKFU2Q2acGdjybOh3ARzRc%2ByGiMSo5cf2ZcbFr%2B0%2BT%2FcgdG2iMJMZ%2BQdhkm26bKpv%2Brd0KifeZYz%2FZzGjSv44hAQZGmcn0nv0N%2BI5F0Ut84NvMaDR2%2FUKEPogCIProE0w5OQdChO4WJMLLLBen8rmB9hxa1UBlt04erpIsrLXCVJIb%2B8PIgf03j7taEPqyoT3RGuNow%2BuWwzgY6pgErSYa4RmCtNkG1HdtZIpiRPQX9I38nJ6Y0M0TSKby%2BVrsmP8RInT%2BfHr1nPUlmlZOBcy6y137ChUNrHtnyV055dpQKx74axSy4LLzrv79508wf4oLmvQMXLmbQ8ukDkd2JqF6qjySc5BeKyOAycy125tKt%2BQ17cCNUILT3cjp1yVzhntTHfvAhAtm65jA8oYYC9HitDk7%2BBL%2B%2Fer65bnwLJ6Kvi1Q4&X-Amz-Signature=78d41a9908bbc3e6f0b83707f0a1440daeb622c1f130dc1fe33b1b4e9e1c56aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XXX4JAXI%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T212542Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCIEVxDEvUaLkxFx9WbU2yMPaobnNCmw6cBfJ5ptJ9kKvIAiAWU1ruvJv1w7uBCQh5D%2BpN6rX%2FKvR4oL9tkypb%2F%2BMMhSr%2FAwhGEAAaDDYzNzQyMzE4MzgwNSIMDy1YhkqN6GN%2BSr3iKtwDcyLirYxv2u9YtUabgQ9DtcqSnjyUxoljawZD2YTuD2RZ5tPoIDN%2FFa1vUZ30NnFPsfM1ejBFOCmXW%2FvM5mXi0asqlqXUR4loQWv%2BjvT19u%2FUkZxPUuRT0jT6RsjfF86wlJQEIx2SeRxjRgKe9IzerHILcgNi9cVetR6XTlLC6wSbkKm0jPJc1orod5Msu0TSHNVKgvYKM3JrBqqUp0ZCthI7Nhi0UYboSKE6um%2FVBIRSR1jtA8PFugVWRvORf9CYMxkQNAZRUldMNvo8E9A5EnxNVXTmMeaoNGZ7lWpIJwCnqAuQOzOa8dkl5aDdwMKh4KIdv%2B9xDqn3Mdzqv3CdHkV8Go0JRfm6rTgPmh0q6JRLiyWGeg02WXd7vsHhSn2%2BopQoCZgmL6%2BFMl12XzXP3wFRoTpLOjouNqY1VQFy1P0nz18FGQ1K8CKFU2Q2acGdjybOh3ARzRc%2ByGiMSo5cf2ZcbFr%2B0%2BT%2FcgdG2iMJMZ%2BQdhkm26bKpv%2Brd0KifeZYz%2FZzGjSv44hAQZGmcn0nv0N%2BI5F0Ut84NvMaDR2%2FUKEPogCIProE0w5OQdChO4WJMLLLBen8rmB9hxa1UBlt04erpIsrLXCVJIb%2B8PIgf03j7taEPqyoT3RGuNow%2BuWwzgY6pgErSYa4RmCtNkG1HdtZIpiRPQX9I38nJ6Y0M0TSKby%2BVrsmP8RInT%2BfHr1nPUlmlZOBcy6y137ChUNrHtnyV055dpQKx74axSy4LLzrv79508wf4oLmvQMXLmbQ8ukDkd2JqF6qjySc5BeKyOAycy125tKt%2BQ17cCNUILT3cjp1yVzhntTHfvAhAtm65jA8oYYC9HitDk7%2BBL%2B%2Fer65bnwLJ6Kvi1Q4&X-Amz-Signature=5b93f52d9c8d3c33ca51b1dbf62ab4bb03fb76083996dd659c8410a67b78e4fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662GAUCL2I%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T212542Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCIDG2H0lbuYZdmPfdXmmwSzyKI3Ur7jO2Fz9TFLjaKF85AiAeLh45UcziicsaQ69J6Ft0pGfKd%2FIsgUFdilalIX7Ksir%2FAwhGEAAaDDYzNzQyMzE4MzgwNSIMN6ge3r1LKycIK5PvKtwDnV7IcemcoczvjRVo22kFjU7dvrRFAPpCWsTHyCVM08fsxuqWT%2BgNgPzG9h7BSUv6YrlMAzVkgSvgfnk4Xg8G5BsjOPaAtOGFiOJJbRhiYBaqTDnn3jgtokGDeehXjzPHfb2suxv63GYzJL96sLt9GlksAOxddzz%2FF1B6vMFcsyRAUTMQUGxWzVnVd%2F5liaqZmJrdV7wFV2o2Ms7jmpu%2F4UvAziZLeFH79hwVWykyzHHYCwZTqMv%2Bi3KDlAGThZGal7ZuzRf%2F5s2YjeSuOxrPupTg5DFzsh1FsA%2By2h4R26UrSDTwslFYU6FD94lloyJisDxzXE7EH0nUpXJ2jsUgX1a%2B%2B0J28oYS%2BGDCSZhUWZnrS1m%2FwXUcBv7e%2Bf0EvwMhxMDIM9mD2CnrbOg4IguwOM7R8L6Uul9u%2FgftIU965QoF8pHl388xSMifVqIFe17zpS3LWOddZaElXfNp26cFOqJYs9KIqY5MERYLfrueUPgIJ5ZT%2Fs%2FvcMdmF%2FQg8YJ7faTx3i0QoQ3KVf%2FXFPmXSZPHQ9Ag40bWKubPT3I5MH%2F0%2BayJmaeb4miEKNt6PCKFbg8c5qbr2KgZOdZ%2FKksGJuqqTGPRtMOU9DZMXMEf3le2fZSm6bwWvGK%2F5QIw2eSwzgY6pgEeO87NcPJpyTgkIBAZA82G2bRcPS3ZKSCO1PqlemcA0RLbv6fOVb1TLr%2FY8XWNt9NZwbYbT%2BvKA%2FFFjFFcilYgmpxfyudlYOEJZZMfBDfyHE3u1EZqsVrywl%2FsU21U66txzDc%2ByzooWS%2BlwbwUMLZZKBDGIX4Y%2Bwkqncd5Vln0TFfTMt3dRbcPCowiS9sV0mUwZpG9vbWF4LXOD0XOIj1DayhSe1Ig&X-Amz-Signature=7943a2de19b107de43fd84dd6f7b9876787da03d86b65817ee41d4e2d8117246&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RUPYDYRN%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T212544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCIAqhLvYagdw9oIfTbeu0AiLBL0lnpgK4xgrYL57CUWcdAiBMjjQPPhcz4nJa0FJcmyYUlLgUm5ip%2FpbcRPw%2BacWTJir%2FAwhGEAAaDDYzNzQyMzE4MzgwNSIMAEn%2B6DKzG0sWGfC7KtwDoLzbQeEENMFKBKsbrFDN%2FJz61sPvHsanDnJu5L%2BfiyiJDYvqSk%2BILCjll26MdjzSSHxCbCagy9xypHuJ%2FHFqy59dHkwKK9p7c5JcuCZRKW%2Fl9RIpNyQWYwebHbUHvoeVmJ%2BsFfmVTpjhGrq8SCFcM2tZH4ln8x%2Fj%2F9hSCegYX0FSqTagXhmFmZfeh9Qs80LTa86Jix8r92Smdp2VJfRk6bemxdpj9tcT1jgfkrSG4j1CquJafvuV6yWtpsTEMI%2BT%2FcuQv%2F80ZrF70GtDFcK6B2KLpWVlUkWrhtUfvnsUmxgLcxFgufXrd60gyspw5QvvipqDI8TGTER9IrmMUFhZ31BH6gWH3zWJEJ0vU8G55Ci%2BQXKIgTmFmDZWe91yNZ0ySlhlVQfJ4BilBCwqnJdZIIcPcsu9e9ghZWMV7H2mqToWhG0bj992shDLzQTIXhfevlPyKXHbp40WsrnoFq1fKNLOfJc5Z1zrbPba2MgdI5EuHaeyK%2BeLvu%2BJZVLUkxRqbb06eVCvFj6dt7yT6AiTDmVkwDO0ozyUSVVGqCBohxG43GHB5YL%2BaryqdEg7%2B5RPxbmE8beHAl0yZXBu%2FBcn3DyMG32T2FRc6kKlie%2FC8wu%2B7v0V%2FxQBNCaCQYwwj%2BWwzgY6pgGlHIS%2BUCbqrpkm9S%2BsaYUuWlQdW1yV%2B3Z4vvMz4%2Fuqi27y8NgkoTFnImZLQMyxV1ZEnFTpTGHLDe8gKen6kT8Ry47ijmmwBJL5mU0TpXz51aTcT4TbqmjOuGSq%2BlW6pS2LQqRpkYB%2FngFnKBJNnOc63JTMC46y2ZO2gZWwAWVvY8UPNVeIjGVmVifrd7P0VA8YQZrPXh44ibmeE17yZDCOgWUY04IE&X-Amz-Signature=0110a027b935402d65296640b1cdf393f967ff6a02edd9dba8f5e7472ff0233a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VTB5ERHI%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T212545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCIFVfTthYnUWkzR7V70RUZK4fhAj7ftuYEzEEsg5h8xviAiBFcOvW0fdWG1C6jO%2BRv7fuC1xdNvIsBGPiNqkeTc32qSr%2FAwhGEAAaDDYzNzQyMzE4MzgwNSIMwgofj4EtqiZOw48WKtwDAv%2BsHiblcUZqVGiBv1ikVajp5EhW91oIOmh1graM9dYBuoMop34yF1Hss1t17agzB4aJ03B17c26cNuB5cttx6kveaDSVjN8eNfkLyov9FGWYwNs1wQJTTXXtKV19xSj%2ByQZ536LPUSq2NX3tx5GAhDOBng2kkzAM%2FPR3OkuwMlLlTqf7GxxekoPJAAH0fSnXm5YDegKbqGGdYusMDSaitY0QeejsNpHfnwhvAfkNaRe%2BH0SAYvwFb4bKPaQdggMvihwpmaDVedAYpTG9%2FFJg%2BV7SmXhA6H8eSqL0Z8lrmoNy3h4lJHa3qQi7ZDKmvaN02BnTMjGTkXXYTohkZvytMCXSj7Rx25UiPPK3a4LTe0gld4eDMeHVU5QNnMpQvxFlXQxSeMAy2xZs1nmBuXJ8VGf10VBykALQWn7AdMLYLcyCxIZOmE4SYSv1CJOYAjpEdahSi26Kwj5s%2BYv5qY2OzqliZDn%2BTHqcb93xgIeqcN5aY5QeBcv8zU96q442Z7hi7fz%2BHBWb1ykNAIgq9MMX3Wse%2BMCeqShmkfB1Euqvvl1KtNRJMHB%2FkLDUKISJC2y47gxTq%2FfBLJKDfQ3dsVcu1xru9YSwo2c6NpP3Cwvy98gaX8ONJje0oSdklIwjuWwzgY6pgGMU6%2BnXFl%2FCa4xffp43fQe2Nowm2h0JnFqa1kTZl9dtk%2FD7fZXtbtZpT2oGF18Aj99tADNFXVf13wViKlzbmDle7K3eD4wo8kosPPapK8nXKw7zI7Rdn0tGfFoyi9FWnn3p2h%2Fgv6nzmc25sGMPS2ab5AzgmYn18MlWNCzo5FNk3eTsnuunIdX1zC3o6Qj8kXmFZvuWIj%2Fhu7FiEn0LReiXvSUOjYz&X-Amz-Signature=81a210e223ab9980727a0739e981d29aef6cc49be88e8df5e5eb6513c71d93b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T3FDOWD6%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T212546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIExXezphqANuNgitVEO73pHuvxK5rrTx%2BOBAsHCAJDNgAiEAuprLtFjZ%2B3m5OLKRtqtfuIjkXhJX1lFGcAQ7AnYGWlsq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDHIMssciccIe8Ny9RCrcA8tCOhVfLnrsV%2F%2FFJ%2Bk3StLBEXOvym7RY0bXyijg15znTXEPycScvl5BoUUzHbadXK3HvWYIoFwin7e%2BmO51p6Jde2bJRbstcVFN%2B1Oha1V%2BCh6afhcMAgH5scu%2FBHQERQsWP%2Bs7A8h4v2nxPpW83%2FLD4xF8xrgbaY7%2BjhcKrvb2pvn2wfIHREHtypyRANsn%2BSqZP7ZTHZgGpUsWRtlLDk7lWNsKyki5LEM8AqJqHoZP1KfZvAigTMU%2Fifeg8%2FLj3RYkS4ClJxXDqoBRBYGQevHeN8rxETdO%2ByVaQ1JDtRk6XG6KwgvQroz08IJtHmwCaBN%2F4byp380clD3uKYgKL51I2Sqp2UZqVOnO7DIa03BMGozIuvAYD5KOtMmCzXDbpCb15mU0FsSzV1B8YTTZrA5rJ0sJ2OvsoBLKBoRc0TqGIpUfmuyZnje%2BgJ58Fa5cZC5wsgMdm%2BahNTS4odd%2F%2BPbqH3zHv%2F2TtqyZLGlmCmkI8917Jan1Vk5STcj6NgLXPsmic3zmXBlKO%2FyrVAtZYekgZc9v0YlAPonnZ13s2XEiV4aMUNtOT5oQgNJRzP%2B7bnIotLOqxAIAGh3T8M0ChUvzM4Mtz8lPXV6TJNcLkGY2%2BmLq7meArM%2FFfO9%2BMOflsM4GOqUBQX3xVs1IIdVXdhAHqWidXT7UqmWPDYNX06tb9oX4j8Ai4oA8PPK0PUOSgz5aw8%2BU9zP8xlghiY1zPnjsLSBOgW8ktVqW5aDYfC5KbDlNaGOXqKuLRbpFf9oMe%2FRTpXcR4rDbqHyy7L9SITZ0HX7O4L3mjZYDNGHnj8uxMHN%2FLJr%2B9falPdkdF0U%2FMKzZ2QiyTbNvL1TOdmHM36w%2BHv1g%2FYlhnaSW&X-Amz-Signature=2637b446ae3f157b6b65f340f76b959300ca4aba70f583f6ec5752b38a9f8d66&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T3FDOWD6%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T212546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIExXezphqANuNgitVEO73pHuvxK5rrTx%2BOBAsHCAJDNgAiEAuprLtFjZ%2B3m5OLKRtqtfuIjkXhJX1lFGcAQ7AnYGWlsq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDHIMssciccIe8Ny9RCrcA8tCOhVfLnrsV%2F%2FFJ%2Bk3StLBEXOvym7RY0bXyijg15znTXEPycScvl5BoUUzHbadXK3HvWYIoFwin7e%2BmO51p6Jde2bJRbstcVFN%2B1Oha1V%2BCh6afhcMAgH5scu%2FBHQERQsWP%2Bs7A8h4v2nxPpW83%2FLD4xF8xrgbaY7%2BjhcKrvb2pvn2wfIHREHtypyRANsn%2BSqZP7ZTHZgGpUsWRtlLDk7lWNsKyki5LEM8AqJqHoZP1KfZvAigTMU%2Fifeg8%2FLj3RYkS4ClJxXDqoBRBYGQevHeN8rxETdO%2ByVaQ1JDtRk6XG6KwgvQroz08IJtHmwCaBN%2F4byp380clD3uKYgKL51I2Sqp2UZqVOnO7DIa03BMGozIuvAYD5KOtMmCzXDbpCb15mU0FsSzV1B8YTTZrA5rJ0sJ2OvsoBLKBoRc0TqGIpUfmuyZnje%2BgJ58Fa5cZC5wsgMdm%2BahNTS4odd%2F%2BPbqH3zHv%2F2TtqyZLGlmCmkI8917Jan1Vk5STcj6NgLXPsmic3zmXBlKO%2FyrVAtZYekgZc9v0YlAPonnZ13s2XEiV4aMUNtOT5oQgNJRzP%2B7bnIotLOqxAIAGh3T8M0ChUvzM4Mtz8lPXV6TJNcLkGY2%2BmLq7meArM%2FFfO9%2BMOflsM4GOqUBQX3xVs1IIdVXdhAHqWidXT7UqmWPDYNX06tb9oX4j8Ai4oA8PPK0PUOSgz5aw8%2BU9zP8xlghiY1zPnjsLSBOgW8ktVqW5aDYfC5KbDlNaGOXqKuLRbpFf9oMe%2FRTpXcR4rDbqHyy7L9SITZ0HX7O4L3mjZYDNGHnj8uxMHN%2FLJr%2B9falPdkdF0U%2FMKzZ2QiyTbNvL1TOdmHM36w%2BHv1g%2FYlhnaSW&X-Amz-Signature=42ec3c583858dded05e1299066c26d4ad909df4984d34d2902bf2df01a85c444&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S6LP5TGK%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T212536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCIE%2FmzMQYnpJCc%2B%2Fv%2FP2TtTUI8wGDeUyJ%2B2QtfJGkbhWmAiB2cFd3mQsBIhwVPrwtuxCcRXn%2BrxSpSMFscAOJTuMhAyr%2FAwhGEAAaDDYzNzQyMzE4MzgwNSIMQrNlSCkdKo0I1fqfKtwDwZrIQeYnfCMGcHrL8d3oIwRKm66bcliHu5Yi4tnbkY%2F6w6D5R9fBKGouWHRiABPrb1LFfOMIovi%2BWZrlMXkTAkZhkoR3HP%2F82fY8PQSQ5raNTsW5TwqvFA6yMdP0ql2T5VvXl%2BXXy0Hh34672JRd%2F49G1e68hIZQVBMgU%2FqmfhFNcPHQkYgyKhuk8iVdtj8Li0yNL72pEbrWlOFaWBkBgoSeKN2BjxJhEKWylPA1yAR35jTPytQFaKYH%2F8i5H57zNC5B7uhImeg0jMvdXnsibd00P5dL2TThMasfHPYhUr0IccPlScOdtUbMuUyUoefffVQK1pTGgRYOG0arNFCifv%2FRSajTA%2Fv%2F%2BKHjruD9EX6Ae2dyDSI9uAzFLRFARLnS%2FfoAYXZ8xAN%2BgVONSbgHBykOaCJ1y%2BBoZJLiMQFcvFtLW5ELxawJXATx1ItIjtptD6XpyIlQYk8OFShAxFk0HKQoS%2FCXHa%2FuMYkURabeuN8OVfP9SQUy0uWLwljJBnGccodlvUia0z3TfWi5WT9VLzlhRcfhpe9VCM%2FqZaY9MJ3O8kEo3hRiVs0%2FdsQdSPepeESUfllVxaupA5OKMj7K%2BNKNrK3M8R9Q5HGTM8f1YDbD0E%2FZ85l9iSgyDYIw9%2BSwzgY6pgGe8fzU3K61VSeI1VWYJd%2F4dG3RQJchajiZhnYAQfRx8MPNMf0IDiSgzU8P1zru4yqyWdeKOEnJAxvWo5OOMheMneM7JhQz1GWyF%2BbxesCTnstySXLcawlh525%2F1pKH5dnK49MwBzFSpOa6nQx5KXXuoUTZLgBkaDnkGj%2BWiEO40Sq3fhMVW7KOfy%2Bx7y260NP3VijzeUu02i2YxDmqA%2BXSgasKFb3l&X-Amz-Signature=89d3b5e2cba6029294835a8b21195d4cbe841eba7890c1e9d492a6f462fc1b6a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TC3PKOMC%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T212549Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJIMEYCIQCZ3wK8mgbFVfdSHH2I0LCVYIDXlpO9N%2BwcG0pb8%2FPkHwIhAKTY%2B3lRIoBUj%2FJZPJ3yHqSxo7vmWgr7d1uYxN7gO2QIKv8DCEYQABoMNjM3NDIzMTgzODA1IgzGOLq45W5NLsvCDQ8q3AMUys8ShWuXBjWFL1JAUMplK%2Bw9nw86F51ji22eNVDsZH%2Bn9uJKAUAHLxzUgMRTO0d8IT4ukhe1hYqxLLv6e%2FYDDN2Ml6zlZRj%2FxmGVbyduv3zNIJBv7NL4cPKw91BdFpbqtfmz5Hyhf9bHG5r%2BxuoeoIpXXTAC12ZGgJXixn1U1J%2FsMx220p2mJ%2B6QX3Q6ruC9ZRSfL%2B5uqDO0B9nll6d7abgMM8TwuKXVWphTdDtEX2r79j84sq1o4vv1%2BtpEry%2FaMuuYz1v5TDAN0e0m5LARluc%2FeUaR8IqDb3A006%2B7yUUr7vaYL7Fb8DK%2F%2F%2Fca4e5VJAaFTljPYuC5NYS2llWtFmv%2FbPqRvjFYhQNjfKZRORhmyYMPXMMjBnx5scg9IW95hm%2FtwArym%2FbpBz2Z1spbx6uuACYqB%2F6k8mHMFp6LaqdVeGtl9zyjRlWjwTNhqA7LlYoZFSGSRH1xsVoZE3Ri4AT%2ByclwYwJAyzTXaWlYWsESdBYGzPrOkN4AhcXq1tSfDyI8nGwkosVt5XfQtc9uAGpcSqxo05y9m7mAD0VbHGWeVYKxTywp%2FAQgGa6FJ1hyYCoWR8WhmuPLNrQ6GyzMPZFJ0y4z8tECYfGm%2B9vZWg1Ly2hTKI0hlIugATCM5rDOBjqkAbrAvac%2F7Qk4dnCZr2YXkLF8w2tKlNutS6U9DLkSMHMtcCPwHZeuVXp29KpftAdaYFTycyTpDVs0vWZ%2FAtRNT3DUzUEJVQCz8mkfXWl0ytURG4ZX47Pscb8b0ipq%2FUJfWYbXFYvnJftsmpyEUEsjFzdFQoGp7rrXmn%2FpsKLoMMeUZy4LjbgCmo%2FVbbMlQqahgUBkroO09TYbnPdiBXehUEmgUN52&X-Amz-Signature=d709ab99925483bdad3607270ae1f415e6c0be5f997057cb026811405f34272d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TC3PKOMC%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T212549Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJIMEYCIQCZ3wK8mgbFVfdSHH2I0LCVYIDXlpO9N%2BwcG0pb8%2FPkHwIhAKTY%2B3lRIoBUj%2FJZPJ3yHqSxo7vmWgr7d1uYxN7gO2QIKv8DCEYQABoMNjM3NDIzMTgzODA1IgzGOLq45W5NLsvCDQ8q3AMUys8ShWuXBjWFL1JAUMplK%2Bw9nw86F51ji22eNVDsZH%2Bn9uJKAUAHLxzUgMRTO0d8IT4ukhe1hYqxLLv6e%2FYDDN2Ml6zlZRj%2FxmGVbyduv3zNIJBv7NL4cPKw91BdFpbqtfmz5Hyhf9bHG5r%2BxuoeoIpXXTAC12ZGgJXixn1U1J%2FsMx220p2mJ%2B6QX3Q6ruC9ZRSfL%2B5uqDO0B9nll6d7abgMM8TwuKXVWphTdDtEX2r79j84sq1o4vv1%2BtpEry%2FaMuuYz1v5TDAN0e0m5LARluc%2FeUaR8IqDb3A006%2B7yUUr7vaYL7Fb8DK%2F%2F%2Fca4e5VJAaFTljPYuC5NYS2llWtFmv%2FbPqRvjFYhQNjfKZRORhmyYMPXMMjBnx5scg9IW95hm%2FtwArym%2FbpBz2Z1spbx6uuACYqB%2F6k8mHMFp6LaqdVeGtl9zyjRlWjwTNhqA7LlYoZFSGSRH1xsVoZE3Ri4AT%2ByclwYwJAyzTXaWlYWsESdBYGzPrOkN4AhcXq1tSfDyI8nGwkosVt5XfQtc9uAGpcSqxo05y9m7mAD0VbHGWeVYKxTywp%2FAQgGa6FJ1hyYCoWR8WhmuPLNrQ6GyzMPZFJ0y4z8tECYfGm%2B9vZWg1Ly2hTKI0hlIugATCM5rDOBjqkAbrAvac%2F7Qk4dnCZr2YXkLF8w2tKlNutS6U9DLkSMHMtcCPwHZeuVXp29KpftAdaYFTycyTpDVs0vWZ%2FAtRNT3DUzUEJVQCz8mkfXWl0ytURG4ZX47Pscb8b0ipq%2FUJfWYbXFYvnJftsmpyEUEsjFzdFQoGp7rrXmn%2FpsKLoMMeUZy4LjbgCmo%2FVbbMlQqahgUBkroO09TYbnPdiBXehUEmgUN52&X-Amz-Signature=d709ab99925483bdad3607270ae1f415e6c0be5f997057cb026811405f34272d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667GEDN6SU%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T212549Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJIMEYCIQD1vhPaJxS%2B22mtdwDPgwQ18Bq5PgkY1Bk9zLp0ao2ejwIhAINOtClhk0YQYTWNyhr%2BILdRnnBy0Cv6zoQmpXAaI%2BQrKv8DCEYQABoMNjM3NDIzMTgzODA1IgxiZkaCAtzbZzr58h4q3AMVedv%2BCmdTR70ByiLd6p%2Fx0zcdjVsDvlzUEPzoBYL%2FfKIDEwFRwq4jpze9XYMX6%2F1OkeXvjGjjKpZEeoLDxuFPvm9sh46Erh8sb1HHbCMHvK%2FweSLy5IBZ%2BnOPgduMkdDCL0vc1wZIpBPPdOCyxz12Ay1Qu%2FxTzSGYy1C3vJWTtT1KIDKeqnLXl7c%2F%2B97WsQUJsKRFYU38KNchjEfXKOLlYBQCpEFf%2FG1Sc6wDlc8mRvI4xru32mZ39rr0wamjI%2BnvJCvo23NrfCmFSAjHuJK8rcEGTO%2BdoB3Wn6VMireRR62WL5vRBhkDZ9rNPhZYWBACkj%2Bm1A3EBCAr0al%2B8LnGtiU6gF5gATHBHFLNb%2FDYnYw3KyNsNMvKRhW5t35f35kOKgkyux6Dsz18kIhTSGlkQEN%2Bh8Yz5ia1Xmk4CIQ4QCd5w8bWuS5ZH25YRJS5vbXnq1bPJXdaxDw0BkEP5IifMXhB%2Fj%2BgCOaIg4YgRzju65gmRTX9XfXQ2bOpmiubL4iLu5cNXSi9%2FfGkWgXglsuyU0h0%2FTGkC8NBtXuQu3sDXhKtQZ67FJtXXOlOnpoGQ%2BviIYvwaY1lmqbsmaeQTMjamnQPmNJ6BLFGx8jCAMUtDf9IpD6X5zKXr1uQFjCt5bDOBjqkAVO7YgCyc7YSFlNN8lfku6ZOGRGv48eQK6%2FPuDd5Vim8KHqX2Vs4yaN%2BQyz6PYjgf8I3XtZnLgKM2cQI6hJaTaa3QIP5hlCtd%2BbDXnJRmH2zGtpnt3TGBoSjqIIdr4jcUkeqyQJjYo%2BKbOk0JCdS2x1Nf6nmwouQaeyL8VVDwAyyjLpzxuNTVO1%2BegHyx8sFDNeFkAQ4s9xaSa2Ty%2FTHj9W8CfQM&X-Amz-Signature=400589217efef8d229106ad3152b52baeb090dc1baebb8a523c5c66188b79e2a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

