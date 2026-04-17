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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663S3CXZSO%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T043652Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCXVzLXdlc3QtMiJIMEYCIQDOwzefTKOhvO0QoBff2BCfAQBRLzSL1FFvlpwft0tVNAIhAPuHE2ustHfo5NFDCoS5LLOZTvnp9xiFeYj%2BRhgFpc9zKogECMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw23NualwGXfE5ZbXsq3AOsDwjpblg9fqMH7%2Bdwtg%2FeA7rrqH7KfAv4K0mhMTCNmMWSz%2Bh4kwC4%2Fow7bPdI5lrQelpY%2BJ%2BOckkfswmTCDqqhQ8mI4k6EpyxMsVJyMtnPSsNMm2fkq5Og9VUK6rawkeyn%2FKtWXNpfrSbYGhFedzttn%2FSMhKAvK5EeCNzpr%2F1J8Y97s9INv5XhHNG41EbB8DlXCGkFACD%2BWGuIWi3OjHQFexzOe1CZE%2BmxzFQLenhSsLUi0ZyppRFnRriXMESZE74puUFTvQkzXUTvNfrDKONikY2SK0UvSGhnuU0MW9VukRmUbrUNwbYdVWR7%2FetJWjiDIQnrfe6XAK5Ukw9Zx00SqAPS4mc18lk2Ycq%2BKwiXRkPAwxDfkQ9bAGartVwnZn36TQiavrBQhzSJsBebkeF5waboUciLzQ%2BS8wGVKBSv8yp%2B9sVi9BlqY%2B2O056kDy%2FsorQZ4XNTGJ2VzZefEAQr66cOH5lv41obEmVuB3Fk2xhtBPBfH8GczfuN89kVEBpEOw9boHuyCWsYctq94ArWqNFj4IeZutqdQgup89sag5utdIhz3AHirThNnZaqyO9CUUHO5eS1CQmvwOf2k4l1%2BqZ4Zy2aMat%2FciIk19uuph9jK5UthVORwX4LTCYzYbPBjqkAe0y%2B9WbRFII7fRdoCBSi8ihZssWmtdeuCywcBj%2Bi6BmAJfILHGLwDsckoQBLDNhfGeVDhwSuIE4gfN5nHWkQZy2mY1cRUx%2FHa3R6HRRQPpnqQBYHEuXcJktTKKEkyBg189LoCTS3sfiJV4ig%2BVhe1FVQP9H5Hi%2BxGMVBC3ZCnM8qmQkD0YVFF5R6S9LFu9WxXfEkAUTvK%2BwWk4%2B0G5CuGgj3TPX&X-Amz-Signature=6e0f7c859adbb652aca54ddf7792537a1c7b832a53c1a7645c91abf14006bdd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663S3CXZSO%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T043652Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCXVzLXdlc3QtMiJIMEYCIQDOwzefTKOhvO0QoBff2BCfAQBRLzSL1FFvlpwft0tVNAIhAPuHE2ustHfo5NFDCoS5LLOZTvnp9xiFeYj%2BRhgFpc9zKogECMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw23NualwGXfE5ZbXsq3AOsDwjpblg9fqMH7%2Bdwtg%2FeA7rrqH7KfAv4K0mhMTCNmMWSz%2Bh4kwC4%2Fow7bPdI5lrQelpY%2BJ%2BOckkfswmTCDqqhQ8mI4k6EpyxMsVJyMtnPSsNMm2fkq5Og9VUK6rawkeyn%2FKtWXNpfrSbYGhFedzttn%2FSMhKAvK5EeCNzpr%2F1J8Y97s9INv5XhHNG41EbB8DlXCGkFACD%2BWGuIWi3OjHQFexzOe1CZE%2BmxzFQLenhSsLUi0ZyppRFnRriXMESZE74puUFTvQkzXUTvNfrDKONikY2SK0UvSGhnuU0MW9VukRmUbrUNwbYdVWR7%2FetJWjiDIQnrfe6XAK5Ukw9Zx00SqAPS4mc18lk2Ycq%2BKwiXRkPAwxDfkQ9bAGartVwnZn36TQiavrBQhzSJsBebkeF5waboUciLzQ%2BS8wGVKBSv8yp%2B9sVi9BlqY%2B2O056kDy%2FsorQZ4XNTGJ2VzZefEAQr66cOH5lv41obEmVuB3Fk2xhtBPBfH8GczfuN89kVEBpEOw9boHuyCWsYctq94ArWqNFj4IeZutqdQgup89sag5utdIhz3AHirThNnZaqyO9CUUHO5eS1CQmvwOf2k4l1%2BqZ4Zy2aMat%2FciIk19uuph9jK5UthVORwX4LTCYzYbPBjqkAe0y%2B9WbRFII7fRdoCBSi8ihZssWmtdeuCywcBj%2Bi6BmAJfILHGLwDsckoQBLDNhfGeVDhwSuIE4gfN5nHWkQZy2mY1cRUx%2FHa3R6HRRQPpnqQBYHEuXcJktTKKEkyBg189LoCTS3sfiJV4ig%2BVhe1FVQP9H5Hi%2BxGMVBC3ZCnM8qmQkD0YVFF5R6S9LFu9WxXfEkAUTvK%2BwWk4%2B0G5CuGgj3TPX&X-Amz-Signature=6e0f7c859adbb652aca54ddf7792537a1c7b832a53c1a7645c91abf14006bdd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U3HXIIHV%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T043653Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIFL6O%2BrSpuy2vJLR621Y%2BzKJsAdS2HhRnX09HB1fRjpWAiEAsmw8stxpyjBh%2FfT5WNv232b5W1oSILNRyR0CQbAvJVQqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIwMMEDd4ToFmRs7cSrcA6us%2FwbLeAN178A0kYn%2F%2B1yqA1f4Yq%2FIfzu6%2F3it7XLpuotPRot00mndPbkRGfjta%2Fd2Nl5%2FLHyPPngQhpKQiX2sO1VN4MikyQsH1cqdgfafwjsoP9%2Fjgfv5Tj%2BRUiruoX20lTHSWyLjlNakCPFD%2FKWhJoQL4o4zq5s5SeauAr%2BYKOy1LF0nH7PBD8TzFpQ3c3Ks4YdLoZm%2B0cYWoc5sORtHmIEoWtuI%2Fg01yQmLJCRv1vSWkQkf0756lCEpNifrO5ZN8NubsR%2BnzXYb%2FTvc4DbEwTF9MyQmOpY%2BLymnvKm%2BLRa4uljtAvpLaQaD2rr7q%2BXZJYdjn3ehSRA12mkF9cjTcGCcV0fyW2Uc57uQyno%2FXs%2BWdJssjfTR1S8y2vyp3W%2BUO1SBaQ8moYshFWGT%2BHaqix4HjDBDUXekXhzmicEMdoE%2FUh2I7tv6YKbhrqmBXeyzoz%2FmnxAsv0L6FwJDFbmkxn%2BfZflG0hBJYS90SOyWN2l4HBoKyT5xNo8AZjo5bQpfszIMOSXOUny14u0dFZbed4uSBff7C85njc8%2F8efISicW8kxsye3%2FtmQw8EshaLQ24QvDmUa7Ddj3BquEc%2BbMN83HZ1Emi%2FmNfnj19JbGb21fhFSaBxLYqcncMIbMhs8GOqUBdH9d8koH8%2FtpTEJcgDLEZwV5u2bdA3jbTmqVvjViZX7QhyV34yssQdy6TJE6L9%2F4H4A1lFHXhjQkriwh2NybheldMFPMidZro1hpr4LrFmxc6RYE0FrFLa%2BJV%2FDtCXE7YmKeRBMgI6tEr0A7Wv7QDLNpSCNU8KeS4ZtGo3GuMKyK9UhMXQlh2jcrgHBrh5rdPodXJkSTNPCGiyNgAB9o9Av7z7Lr&X-Amz-Signature=89f7eacbf66c582ce71acf4fe13e862e31995b48ec988041dcffccffef076ad3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664HB3QSHY%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T043654Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJGMEQCIAHZPtn9gvXumKj1QysKPQYwcm1EFH067QoKN8%2FmaJCgAiAzAwx3kacTm3QMIJ8MxaPtVI3eUsT6tajfmjZHgzCjAyqIBAjM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMNagGwndyU3KjPVxDKtwD514%2BNFz3zwHin3e85vrnV0cqxUaTRXz9auYPEb%2FgZtSsRWZZeu%2FXMV36dJOlLJ5QkK%2FcDQ%2FHwj8XGhYLR9mKRyoulYtvtCDiJv7TQxaKTOui5sP5ukREGK6tpuAWeEDFJ7o8OeBX8cDg0bvndwHiTWy3gRMoNKMoVMu9pql7IdHnyr3OiRUUZfJRz0woOoTQ6uP5yBCTzYWFf9ykTrr2BzU3Imv2h2tzhbI4p6PfNh4LpTSlye7ItV4mWbUqSMu7rMyM8PC4XmmF4oByV7dz7AP1HqfnWSGFym7Qa9%2BARAUGQ7IccJy%2FpzD3Nu7klZ0ZredASS3mYyMP3TbnzHmKrDdQrxoieBudcxdF2SjaBAsqmxpIqHLlmFxC0R1UM8gRFXu7VkwxXfQaCT3IGeVJ5To6wgaqUiuDKhExcWHfRhcvQ7QS4zpU3BPsZHRmsVzIUl3xZe09jRZSc2eUr8VKiGxPR6PUl2KEgdtitQwbZgvtIf6Q8VjM6w9wyXQlZvmucaS93uA5MAb1xriALAhm%2FTIGW8HtqAlPty%2B2Qu11JTDb6Z%2Fhlmwmi6aDNO%2FYyiMDjFmHe1wt%2F%2FyaYeGcAGbRpyCWluxbNQm0Lm6%2BKvirXEvTexUtVD4AAz0DN7Iw1cyGzwY6pgHqLfiGyPhLzjZWlXhatgDYmaEb%2FtrEKyYi2Dp6oEmPW41D53p9PEsQEfLovpGzNFICCPNOO55zX%2BaAoLOhF7LQHL%2Bw%2BBkAtDi6Lk7qafXdsvAfHcIKJraEqsqut3pvwcKfPX5z9mNbN31tB5BCCBQd5bUNeaDJIv1wwNEq0WF63ifZANU%2BV%2BIFPiMv8dvxAVUCfkF2Mv3kOv%2FthaEiru42Jp0cVbBh&X-Amz-Signature=53d765ac553a874cd02da2cc5dab1e26e01f3c144a1570d308076074c02b0c93&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664HB3QSHY%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T043654Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJGMEQCIAHZPtn9gvXumKj1QysKPQYwcm1EFH067QoKN8%2FmaJCgAiAzAwx3kacTm3QMIJ8MxaPtVI3eUsT6tajfmjZHgzCjAyqIBAjM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMNagGwndyU3KjPVxDKtwD514%2BNFz3zwHin3e85vrnV0cqxUaTRXz9auYPEb%2FgZtSsRWZZeu%2FXMV36dJOlLJ5QkK%2FcDQ%2FHwj8XGhYLR9mKRyoulYtvtCDiJv7TQxaKTOui5sP5ukREGK6tpuAWeEDFJ7o8OeBX8cDg0bvndwHiTWy3gRMoNKMoVMu9pql7IdHnyr3OiRUUZfJRz0woOoTQ6uP5yBCTzYWFf9ykTrr2BzU3Imv2h2tzhbI4p6PfNh4LpTSlye7ItV4mWbUqSMu7rMyM8PC4XmmF4oByV7dz7AP1HqfnWSGFym7Qa9%2BARAUGQ7IccJy%2FpzD3Nu7klZ0ZredASS3mYyMP3TbnzHmKrDdQrxoieBudcxdF2SjaBAsqmxpIqHLlmFxC0R1UM8gRFXu7VkwxXfQaCT3IGeVJ5To6wgaqUiuDKhExcWHfRhcvQ7QS4zpU3BPsZHRmsVzIUl3xZe09jRZSc2eUr8VKiGxPR6PUl2KEgdtitQwbZgvtIf6Q8VjM6w9wyXQlZvmucaS93uA5MAb1xriALAhm%2FTIGW8HtqAlPty%2B2Qu11JTDb6Z%2Fhlmwmi6aDNO%2FYyiMDjFmHe1wt%2F%2FyaYeGcAGbRpyCWluxbNQm0Lm6%2BKvirXEvTexUtVD4AAz0DN7Iw1cyGzwY6pgHqLfiGyPhLzjZWlXhatgDYmaEb%2FtrEKyYi2Dp6oEmPW41D53p9PEsQEfLovpGzNFICCPNOO55zX%2BaAoLOhF7LQHL%2Bw%2BBkAtDi6Lk7qafXdsvAfHcIKJraEqsqut3pvwcKfPX5z9mNbN31tB5BCCBQd5bUNeaDJIv1wwNEq0WF63ifZANU%2BV%2BIFPiMv8dvxAVUCfkF2Mv3kOv%2FthaEiru42Jp0cVbBh&X-Amz-Signature=434daf07b03169fed9df22fc584423c7a0bcf8a1aff0bd5eba2d972ea0a522ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664JX5JDEE%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T043655Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCXVzLXdlc3QtMiJHMEUCIQD5pSCpOsql4%2BziSqwhmtP2l1tCMrvs7G9Wa8AOPV%2BHqAIgP1xbgxBpCiesR%2FsH5L7oBs8EZcR%2FpZJfu749zass%2FzwqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBKDZVzEcccGt84u0SrcAxAhiOd7GGPEVwXY85qTcFAw5mvBKQ9CQ7X%2BuK7i8gvRSIavjg1oXExgHAHlHZIs9WFydgRkc7r68pd3C6BNuoFp5%2B%2BIbejibiwdzlDV3EW8kMJIYIHfUpoY354QmW%2BAtFYoH6H9GJkABrionttK3SI2Xp7B%2FZ8%2F06YUEBAGRaX6qkb7L8KMyWT7nuXL8lTDv2yZUaM6rbeKCoPkYYo5PHamRTkJFEnVIgvbJ6JfgGmckgeXDjYjPoGyhWh4fNYEtii7yWbeNAbtY1gxWgxhwKdL1IUNWFO%2BxBwBfHbQDLnJMdF4vDYyQqX1ImBwKTBrY1YbKw5TJUSDc2JgWh3X1s6NKYJ7bxomheA1QZYXlCQbqWRgjBWgwTvJ4HXPtY7%2FYf7UT0LLjXM%2F1HNKRcaZJZCoPQ6r4w2KpOeNw57GcdEebx7rw%2FDVxPKw3kgCAWvkautBX4R8NvflbKQ3GUqXp3VhTYttwtpHRfs66OgF6n0%2F4tpjBHXfadadQwj2hEBxPe%2BIPKsIW89GOnXV7bgOexYnRdWjXSCOS7iS2hjtpDoxxRLD1Ki%2BlRGThjymDB9wWQqOYZVccZY2BNuDGKJoOcqjPD6LFDyIWRcNxzbuYvH8e4tcZYqY5rQM0%2BkpMLHPhs8GOqUBBmc7QFdlnr%2FfjBQ9MBpqeg%2F%2B2DM2WHxXvk9fGhTsE8rEajtMYlT7DE4RcXIe1cytojuXcOZTTYy311f%2BmwHGa0crAbDdwe7CGvBN%2Bq4T%2Fl7SXU7yEiYPZVOZ3JW12lsr2mPPc6Jz%2FAySa%2FZxxYr4tuWQLy7%2BXHjsyZGocesKKvlNE1oyuxxWn2%2B1PhcdUz9MVAv8zaalb7FPlyLMm%2Fzr2vqFg1ZI&X-Amz-Signature=216d795f0fe77ca64312c59e21351afb10d9b577bcf571dbe92c0250333b98a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667Z5HTT6C%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T043655Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCXVzLXdlc3QtMiJGMEQCICDEGbQcgghCklZ7WDtBiRos1BrI8IqX%2BRbS1ni%2BnKiFAiAZCYVO1cqHIH0AqDlRKPx1KATde3uq%2BwzAtwSJQ6HDYSqIBAjN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMFf0IaqMC2seTnAW%2FKtwDwNmml%2FAtrnEe41TWS8%2BbV9lk3RK83ZDAIozwAVgYXfWFDQK72Ktqn8BDW%2F4USK4%2BLGYPjBPDuLFuofxyKVAgQLV0kzTbFh7b6flA9ED2KSnz6rQwBxIuj%2BYlsyyozMGaMCbAHPR%2BnGBsSDbsKrJqc%2FNNkL2awwSM%2FxdoCW6Vmtq9ZLukKIqADmGWV0F%2FI1AZRlhksA0%2FcJN%2BTvHxs9l0QnYSWoFnP4OHR51IA93dYmqOR3ZE%2B6%2BQTDPEAQDLOnZkL%2FhjJmDoWbVXIIX%2B7cXFUP8pIoyAzK4cqZRFPCPCAn36LvhlT3YA3BA9WyuoVj9xsDPsh2a%2FbjZuA5Bi8OIRYi8jel4bO5uyJJP6FvtrzWWOUMc%2B%2BDI6hzJA6taVHayWdS9EC2hqSGP%2Bfd%2FjtQvXhHBJqZ%2FSrBoE8Iadp2pfeoyGiTqPxrX%2FonvzfvcUWh8jSveJJQlg99oRodjoGBqbKXQa%2BTmMDyKiLMTvZzk0FJJekHF6HHvxo5CP%2FkMKmhjPfMyL5xxaYnNatJN0uq50qg8gMEfEoBLmq7IYy5qNfZ3LOyUS3gybDWhT9wsv2KQtSosUlL9GDcXl%2FiQ23JedGAtun44VoSm6dW4MeSMQqEUaGLh7%2BTvJNBVB7lkwxNOGzwY6pgFkbQRf9d3SSPv0GNC9ZmdIWPkwSd14HMqH%2Fp2ZtmRasS7sfQ52JAIK7VpuK95A3CmWElTvRy2h2%2FjHGXs7sUY0qV7acrDWNdMqRKBW8sMu2H0cYdOvUqXoPmrY25M3SChiPBf1M31K6g61YynpUiPUUyMoWOgBf7Ou5UgOAGybWumvpD50EScsl69dyU20FdDJbsIj1RGnXQT6cO6ktnjtxQonfkMn&X-Amz-Signature=294642e347e7d9cf2c5e2d4178a5269eb20d5e2c88541f63da488fb8ab1adcc5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UIUMXQXF%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T043657Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCXVzLXdlc3QtMiJHMEUCIFPxSqBXjdDcpeNIGS787pP43CqnGDKMDGo3iMrSz9dyAiEAtW9UBhnYndUz0sMN1Ci%2BT9nNi4XRS55ZviGfkF49SPkqiAQIzf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLy3tQ53%2F5sdb%2FsCgSrcA0lNR5kFCiJ8e2CF2AMupem0NtrR%2BOM5AbgZzu9WA6HPTT0Ez3a3Bggaw%2BrwLdpIEci9Gf65fKNmOV8nANRL1zq%2B5dVx%2B46nKmP5McCg1UJnSD%2BssvDlCrqUuGwHCenL7IS4nXs73fxieVi27qYz%2BXyZ3QIN6OFlHUVfEtxwf5eHQJMYTLWhLdqdT9KeMTe89s64AGl1gt6Z2U5pSkFH9kAQcWWFN1BcK0EDMxGHD1JC%2BOyN5q2wVHeW7vSoVOif%2FgirGEPm8A3o9tYhw9DMMi59%2Fbm73z1mMEbh%2BnYNaFgB3lkTrfVfCZzh067asAsIOYGIhVd3bo%2BDlMO5PoAfCapp3tagbd1ypIOLPuSQVxGkaYn4o9c9kMlWQ7eGrVGS6UezQxiqAJ3jB9ISy0AVSxPX6sgMCYNHFOPhsZJDTd7H3PXoeBPxtAc%2BS8ILoY8%2FQUPm1c6Ff0oMOSnmBmrUYFuQND0sfVDpI7LZdKE0wQ4%2BFMEIRD%2FBho134R%2BzzrimK%2FyDIW%2FcFrket7i%2FStMELEE2ulmqW09P5pHpuyd8rgeUtI1dafOTCRWhG2eosfVCBfcsgo3FJMGkz5mjqYXmWfSGoEVRa7odBy9xqM5aRNQOGV8x%2BqZSMUBKb%2BUrMJjThs8GOqUBBaF8uZuB%2BOKgojbYIf%2BT41ScThcaQipM1Xmedd6N6DRXMKvpOMmXWiNG8yFf5aaRR%2BYgPkvDkAkjEn01vgDRF%2BY%2B9ozvPr%2FRHy28vnWo1XXqxYohCm8cZMJGv3hT%2BlbKe4SpakYBRbO6kcDoJCrNkeEiWdeyzFh8pH9dqw89zMIC31vcuKLFhMlyPd93tpGEm7bdXBD52f0wvfmlt8mpW3Fu4gVL&X-Amz-Signature=16f4f69453fed96a199c9bfefcfdc74df556f7e9007ccdaba5810c6d7af71300&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7OEGYO5%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T043657Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCXVzLXdlc3QtMiJIMEYCIQC3nHSiEMbEWVlBdBW10u0ApY0NV5zGl3xP1yi8f2KHTQIhAIj9Yw%2BceSuSYnKT6z%2BW6paxbmxZHJchfSNACDPku6j%2BKogECMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxX22aKA1A27ttWhhkq3AM9P%2F9%2FDzv2Y68mMIk%2BnyQ7w%2ByvvnwA55GGrzifDN6WT%2FPkqO1uZCGvgNcIt4MJUpPPonrEqw7SlcCUWZ562bFAShrMXg9LNEpMY61Pe1wxpABmiO4cKLY18mD8SOHC0jj8mPv0LO%2BKie4aH%2FLyxBa59jkN4C%2BXcHgabYWwvwWzK9HHapZt5LMzIZ%2FXF3B3lkIN45iswOFLhqy%2BQHup4FQiewLBm2qph5gwjbaeTERYEj14TY5SRXVy3PZwrJjCT%2B0inOC9fl%2BDPynpdAoDgC9D8r3F5rumNHO4H%2Fvv7qBSV0%2FYi7S2%2FKH3s6ME8V1s9BCZXBnFLBckyHRNwm0By%2F659jVvL7qSJzd%2FVP%2FHs1i1DpMMHRIQgDGuah8eWhCQMW6m3UlA%2B996zmiMpf3UaGlaMSXPQbnKcCW70%2FxNcAjlQXn3dwKPjm3qwA9dyA63FYn8lcGq5NW7AUyfbUFkv0knEpl9ruh23Oc1LRgbdhmo8z4gxqxESL9TS5elrZ9QMbldHIhV6pXNKdFQgyW5wLHtjMjqbEyUhrFrhmGXvIDtRQp%2BM6hIPEhwl%2F54HOUFyLvHKNM%2FBawKd%2BQTjjdw75k1Mnu%2BCfsFp3HVCm2jHG%2FdkIhfYvee0IhO3i2LbTCyzobPBjqkAYowopueljG3fl%2FeqkYycYwpUIgsXGv9lm5JovI5olP0Qhav7sbR3lZ7K3FDZXybDmzsUoUrmMZupgu1EfVcXQEJj6ZW6v5BbQUZ5Wwlj63OpWsLiL9Lz4KmmhdhCPI6xAA2lfg7dGWpoJUxS6PUqmFFjjPUgoNSyGMZpXEnNp%2BmqT3Z36sbkerU%2Fd1Tn7feVQ2XdDi7EH%2FXU3Acf1rPrsAZqkK0&X-Amz-Signature=2d6b02f3294a608e6a85b1d8be3eed7b8517f571294b5b938d7cb312085f6e10&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7OEGYO5%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T043657Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCXVzLXdlc3QtMiJIMEYCIQC3nHSiEMbEWVlBdBW10u0ApY0NV5zGl3xP1yi8f2KHTQIhAIj9Yw%2BceSuSYnKT6z%2BW6paxbmxZHJchfSNACDPku6j%2BKogECMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxX22aKA1A27ttWhhkq3AM9P%2F9%2FDzv2Y68mMIk%2BnyQ7w%2ByvvnwA55GGrzifDN6WT%2FPkqO1uZCGvgNcIt4MJUpPPonrEqw7SlcCUWZ562bFAShrMXg9LNEpMY61Pe1wxpABmiO4cKLY18mD8SOHC0jj8mPv0LO%2BKie4aH%2FLyxBa59jkN4C%2BXcHgabYWwvwWzK9HHapZt5LMzIZ%2FXF3B3lkIN45iswOFLhqy%2BQHup4FQiewLBm2qph5gwjbaeTERYEj14TY5SRXVy3PZwrJjCT%2B0inOC9fl%2BDPynpdAoDgC9D8r3F5rumNHO4H%2Fvv7qBSV0%2FYi7S2%2FKH3s6ME8V1s9BCZXBnFLBckyHRNwm0By%2F659jVvL7qSJzd%2FVP%2FHs1i1DpMMHRIQgDGuah8eWhCQMW6m3UlA%2B996zmiMpf3UaGlaMSXPQbnKcCW70%2FxNcAjlQXn3dwKPjm3qwA9dyA63FYn8lcGq5NW7AUyfbUFkv0knEpl9ruh23Oc1LRgbdhmo8z4gxqxESL9TS5elrZ9QMbldHIhV6pXNKdFQgyW5wLHtjMjqbEyUhrFrhmGXvIDtRQp%2BM6hIPEhwl%2F54HOUFyLvHKNM%2FBawKd%2BQTjjdw75k1Mnu%2BCfsFp3HVCm2jHG%2FdkIhfYvee0IhO3i2LbTCyzobPBjqkAYowopueljG3fl%2FeqkYycYwpUIgsXGv9lm5JovI5olP0Qhav7sbR3lZ7K3FDZXybDmzsUoUrmMZupgu1EfVcXQEJj6ZW6v5BbQUZ5Wwlj63OpWsLiL9Lz4KmmhdhCPI6xAA2lfg7dGWpoJUxS6PUqmFFjjPUgoNSyGMZpXEnNp%2BmqT3Z36sbkerU%2Fd1Tn7feVQ2XdDi7EH%2FXU3Acf1rPrsAZqkK0&X-Amz-Signature=e630b704bfae168d63d1803dc43a94aa47558979a8d7dcbc3b45356f3ec98777&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YX3WREZW%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T043651Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCXVzLXdlc3QtMiJGMEQCICOHw2bipBstcOdNDWxyWG8I6LMn%2BKdH2HkTPCHDSdVCAiBdR8oa1s1tpsF7otVRfyxwPIwu7ScX6lZQ5CqHPdauGiqIBAjN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM6%2B5SiSzbq%2F5ss5y7KtwDCNVQzZuUaAyFtVvDAvfWRNqvfzoJiLdDtaVpJnQXLCUyaSe02gv3brpxHezudEts5cha0yIzA%2Bn0B17XfeB%2F9rm3RZHhf45QIDdWnMFdMQevY9a7NZGH2b5TV8eMRGUaH3l4lnKRX3r5D5S%2B6qNb%2B6jEs0%2FeAtkkPhoIP3NfwM7D%2FBaRwpL%2Fpxy0GnZZhndzaNbjpOMKI%2B%2FM7aJtPvg%2FnK6Bku4Z0B%2B2EIY0akjibITyScQRO5E9yRHm8GqYsruSFEN5v%2FRznZOZVHVx%2FdsnDUe%2FnsbYyHi4FhQ%2BC8cUNexdlk5gPnTx3o2wv8Z5vhXojZbj5bO1GheUJAPwI%2B6PTkHFbqIy7V0am137CZ0JdRv5Bpwmb7NuZ8Qqrt%2F7H0%2BfDvONHYfjF2JhrnfL0kpEIldeZ7Hvdsu4o3hpFPWJn9DzUzeZ%2FPQBgGnT8xiDty4DHeFHO35mjMmfe7MUSJ5s0FOAD8I52ZT5foHPyNsJ%2B9FBWvDR0W3Nd49kIkNiOjJAsxLe5hooXGEZMK7VwadIRBzST%2BqlNG9zlFGu2sx2vZRYvrMynzfIMPBiqVhq7wQ0rlCc1%2B14eLF8FAlTlJTjtWXmHRYRPQoQglwjh%2B46wFmpvCBNShnRAiS8RVswmNGGzwY6pgENIlBXYQpMTefSON6oPgAGGa3OT3XQREifIeMl5f94fLtC39sziWnq6%2Bc94yOBUbyP5aMyWdZUJjnz55Z%2BxMQRMT6%2Bk%2FDDnBohK%2FrVeGCRYak6QtQBZnHXocLUrRTeAaLd7nWo2dNdsXocnan291YECaCC74ppt%2BH5GIqiiGPaQ9c%2Fg%2BeXXLgdHU6wfEFD9n2SLfdZF8WZ%2BWXYU12b2xy0yudhvxEY&X-Amz-Signature=1dbcd04cd9fdc32ec9d19b01bdd877a776268c80225316877025a890aa108cf5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XR4LVKGO%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T043659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCXVzLXdlc3QtMiJHMEUCIG%2F0jpkp1WRuxRt%2FgK0enDg9Ynn%2FzOGh6QqFFzagGhLfAiEAlVIpyipUWLP6VSLN%2FXd5g32mOiAXkr7SuObFkHo6k6MqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKtY%2Bowz%2FvN%2BAlpYWircA6AAIbQ2lUPruOF9%2Bc%2F8VVgugEBOPjwDiGNqVKQ1kr%2B6pp7g%2F%2Fq5meCVKhPC7QzG4%2FbnUMqblndsvr5ClVeWz9nFjMecD6p%2F1hEywKGCfVesysBKmqY4n0ZfTVs3Bs8dcEA7w%2FOs99ROK7QBq106OeU0sKslfz%2BRCTLUliJgQmTDtBsIUz%2FRbG0RHgks9zIm8giHvJDYtBjGU6wezPVxGIba2aKLnciipdKi0pw0fC0W0Z8DPgUf7cb31RUcp0M1Upq6H%2Fvfy1EQg3WQ%2BUmyV6FlZVKUxsnOrBz1SMwGMvmykFcny7y8bwHkZNaug%2FIAkZjat9GyIEgUH7AY%2BzgG3Mx1N9PFBKQuu5Uqxdvq2xQB0H3W4QLuMi8pWjoc3hLIuKyV%2Buo39pAUVXI%2BXKAU8F%2Fl2%2FHLnDSt97Y79wHv0jwjU5EKR9UEacgEVUAG6jHGTr2XY0rKEc9fmHQ5yR%2F1ERQj4u6fatF%2FeljHCOpu5TCQ%2BrPpBvH1oyGTcJOhFVtIal672PJAh2F%2BdPsVGwNNOM%2FV8J2TfICHdJXGqEUsBWlPcD3pSGmyh2R36m3TYyr7cHCEfQe3wJjWZqjOewgk%2F2xd1guBTY22ovhkaSIJQC7wbgIkoXR2XeEzavVjMJfNhs8GOqUBwdVV7luXQyaBJb%2FwO%2FFUZTjSBVoQYTGDsCryO9y2fpOkz0Af1fH%2BhD2%2B2mTzXZLnuXw3JT6ohHlFgToZaQMpLlwVnPIH1L3h0H7yQlPRFNf%2FXqwl2cs%2F%2BlPq6YgLd9QogvwwPXShX9SFzDyzgMbikgzMZqQYMl5vhWl2EZbe1SiH85X%2FSfAhy%2FKOz4299jvlKawKWrRra%2Bu6aeGEOKP8bxyjhPOA&X-Amz-Signature=ff6813b858c3d153726727539233c6e12edf04ca2625b12692a6a3e9e25b5cac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XR4LVKGO%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T043659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCXVzLXdlc3QtMiJHMEUCIG%2F0jpkp1WRuxRt%2FgK0enDg9Ynn%2FzOGh6QqFFzagGhLfAiEAlVIpyipUWLP6VSLN%2FXd5g32mOiAXkr7SuObFkHo6k6MqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKtY%2Bowz%2FvN%2BAlpYWircA6AAIbQ2lUPruOF9%2Bc%2F8VVgugEBOPjwDiGNqVKQ1kr%2B6pp7g%2F%2Fq5meCVKhPC7QzG4%2FbnUMqblndsvr5ClVeWz9nFjMecD6p%2F1hEywKGCfVesysBKmqY4n0ZfTVs3Bs8dcEA7w%2FOs99ROK7QBq106OeU0sKslfz%2BRCTLUliJgQmTDtBsIUz%2FRbG0RHgks9zIm8giHvJDYtBjGU6wezPVxGIba2aKLnciipdKi0pw0fC0W0Z8DPgUf7cb31RUcp0M1Upq6H%2Fvfy1EQg3WQ%2BUmyV6FlZVKUxsnOrBz1SMwGMvmykFcny7y8bwHkZNaug%2FIAkZjat9GyIEgUH7AY%2BzgG3Mx1N9PFBKQuu5Uqxdvq2xQB0H3W4QLuMi8pWjoc3hLIuKyV%2Buo39pAUVXI%2BXKAU8F%2Fl2%2FHLnDSt97Y79wHv0jwjU5EKR9UEacgEVUAG6jHGTr2XY0rKEc9fmHQ5yR%2F1ERQj4u6fatF%2FeljHCOpu5TCQ%2BrPpBvH1oyGTcJOhFVtIal672PJAh2F%2BdPsVGwNNOM%2FV8J2TfICHdJXGqEUsBWlPcD3pSGmyh2R36m3TYyr7cHCEfQe3wJjWZqjOewgk%2F2xd1guBTY22ovhkaSIJQC7wbgIkoXR2XeEzavVjMJfNhs8GOqUBwdVV7luXQyaBJb%2FwO%2FFUZTjSBVoQYTGDsCryO9y2fpOkz0Af1fH%2BhD2%2B2mTzXZLnuXw3JT6ohHlFgToZaQMpLlwVnPIH1L3h0H7yQlPRFNf%2FXqwl2cs%2F%2BlPq6YgLd9QogvwwPXShX9SFzDyzgMbikgzMZqQYMl5vhWl2EZbe1SiH85X%2FSfAhy%2FKOz4299jvlKawKWrRra%2Bu6aeGEOKP8bxyjhPOA&X-Amz-Signature=ff6813b858c3d153726727539233c6e12edf04ca2625b12692a6a3e9e25b5cac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YKPXGCJH%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T043659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCXVzLXdlc3QtMiJHMEUCIQCQsJFj64v6p3nVMMYNpff4u9kQwJ0hyPotKhG%2Bt%2F9BBgIgClBSIOv5%2BeMmiBu%2F0O8qxh%2Bjw7ym13pdCacrn9eX450qiAQIzf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKK8EKA6A9J88CCGMyrcA8tapdr2mIjWUi1pNbkcSfHMMyu%2BgLLDJhrnGydAd3SXdWUWTILrXLyPM4XoFZ5M8lzpDEi%2FOpEEV84rCgvkKzUc33l%2BgWIPSkgWZ6kSkMGKG0GPKisXOYrUvZxg8TSy2bg9vvjGQHV3w954MUN%2FhaTkek5F45seB3BJPpA2HqRNCvuWpwb4IhA%2BQ%2FaztWabuaCxejKNezXlAn%2BWk6Jy%2BNKfDGkJa17d0IExkcXRSs2Jd62p%2F6aDY1GhMYOx6HevHY1FlalUWVYsT7Y9mmbYuokGINkiL8QXH332EJ%2Fx0YenTgBSuxjch%2BzEqAa8JzstuFBYjvaMEiloTtNFnRuY0pT%2Bn2LcdpgNqulOBst%2Fs15go6%2BZ9TQeMbpXDhK5d66%2BvwWxM1bZcdx997tn1R%2BJkTb2wCTg3NeLHNpaGDsCxblp2pbzLKVa%2BNIeolzsXFQ8%2F4swUpWiWRMYb9CiPrek5eHUIqyS%2F2pDcqO2TsyObh%2B7m88p2J7kniV9rSq9WxbHL%2B3f1MFydetmNM9IUpgz5O%2BbNspdRoBMFyt7MAIEPM5LVUAcRXno1%2BlD57116a%2BULAIQWA8qPzZ7xfvTxwGsSvK1jO23ouUH%2F6R19uhd6EG9esrfS1Gohx%2BBDqjLMMjShs8GOqUB8kFFAd3l%2BCT2NX%2BPOP854eyIyKJwMD%2FJT2yg8c%2Bx1WCgqVuMedAMop9cXanFm9BEWbRsptPAlzakORgxEHBybcKDuoR9zUtKZ4fTz%2BmBa8oYSmr%2BwzhchIlL4b28dceLAktBZgxm%2BMomTRx1TorXCrgDDMExmhRlard%2BFJ6B18H4%2FednoDUdmwO6RrpBQogV1WDVpqMmcnh8CUPXsCAOJTyqxOYW&X-Amz-Signature=f1da2361a18dcfb4b0f13bb94a6c4d4b97f78791c2eeff1ab37200c9309d6e57&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

