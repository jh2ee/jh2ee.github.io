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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664RZC4AGJ%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T142747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQDqC3OD98qPwgi18G4YZb94mqXNj1%2B2XndEKf1PWf5%2BvwIgYEmdh5qD82O4klf01ZL1hIgz4yHym%2FtuKnGjfeR30Yoq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDDY1%2FBG6n5fI9tWvGSrcA5sMcayMiO7nx4bHBcFidWT6WIy8SmhtwOZJErOY99MpHdNTqOXqDMjK%2F2aAfyP%2BiTltwSJejyrJWeWbIkvH8B44XfeQ%2FIsddFbSRE%2BsnHnJt26zfMpLxTfHG5djGoRc3hLMoqHlsO3RmpjbyeHCKUlFNH10LKWoJLQO%2BCM7MQfbtvNNU4vB7JpEQA22mgw5Z9TIm6zvXD6ViRn9dTwIEFH0LufD5LWOkdcrCgfN7wdCoi5nXfX2wg1tpMDcVCUzJ93%2B5FSAjQ1ehmEnxlv%2B5a5%2F3niPWWRA0FKXFdLseBXZPaso8bDPyFqaMoWij1lmbTqmBHFEr%2Bg1n%2B5JvHbllm0An8Q1f4cQMqpHz5KJb2a%2BdMfxXG75DHPUfUEGD9d8MzKu1otLI9iAxa4ckWiEptJSv2FR2VqUZ7NiQPGKRFd%2Bi3aFcovfK2pLgT89%2F8kN28RVCnFNrpuIQWyqpGP5CuWeff7HdNzCJ7JVjyuDA8RFRnK%2Bqh84loz85R3MhuDQDcRNJlZQ6Dy2K9q6SpurN70nGYqGIfpFqvxrnI7%2BBPQGGOG6ibwoBS5%2Bvr1OqlLpQ4dEEon2r66RsX%2B3f4F3CeBysHdFjwx1ARfBOsUGqnoc8P7KSgwoiOccutlnMNPbmM8GOqUBZncrA%2BQPMaADbit1p7rkRKc3p81o6U0sldTo14nuxEW%2BSGM4AnBsAmLk3TFio%2FCnANqf4zDRWkn3k8JRDKEXWPEu45t%2FCEo%2BX1ZG4bHNe0X46HjgSw8aVYIAUzGlC35sCKWfeCjj1bruIrDTWHDPWbGzvn7LfznyvOkZK3AsLDYdwcgCsIt69%2F3ym56ON9wRvLWjx8qdvVqWO9Z7ZeBoIWrtMUIU&X-Amz-Signature=7b1bb97a47a5d8d2af2ec044e31570400738b8c7c041a43ee7543c27ea9c4b1c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664RZC4AGJ%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T142747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQDqC3OD98qPwgi18G4YZb94mqXNj1%2B2XndEKf1PWf5%2BvwIgYEmdh5qD82O4klf01ZL1hIgz4yHym%2FtuKnGjfeR30Yoq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDDY1%2FBG6n5fI9tWvGSrcA5sMcayMiO7nx4bHBcFidWT6WIy8SmhtwOZJErOY99MpHdNTqOXqDMjK%2F2aAfyP%2BiTltwSJejyrJWeWbIkvH8B44XfeQ%2FIsddFbSRE%2BsnHnJt26zfMpLxTfHG5djGoRc3hLMoqHlsO3RmpjbyeHCKUlFNH10LKWoJLQO%2BCM7MQfbtvNNU4vB7JpEQA22mgw5Z9TIm6zvXD6ViRn9dTwIEFH0LufD5LWOkdcrCgfN7wdCoi5nXfX2wg1tpMDcVCUzJ93%2B5FSAjQ1ehmEnxlv%2B5a5%2F3niPWWRA0FKXFdLseBXZPaso8bDPyFqaMoWij1lmbTqmBHFEr%2Bg1n%2B5JvHbllm0An8Q1f4cQMqpHz5KJb2a%2BdMfxXG75DHPUfUEGD9d8MzKu1otLI9iAxa4ckWiEptJSv2FR2VqUZ7NiQPGKRFd%2Bi3aFcovfK2pLgT89%2F8kN28RVCnFNrpuIQWyqpGP5CuWeff7HdNzCJ7JVjyuDA8RFRnK%2Bqh84loz85R3MhuDQDcRNJlZQ6Dy2K9q6SpurN70nGYqGIfpFqvxrnI7%2BBPQGGOG6ibwoBS5%2Bvr1OqlLpQ4dEEon2r66RsX%2B3f4F3CeBysHdFjwx1ARfBOsUGqnoc8P7KSgwoiOccutlnMNPbmM8GOqUBZncrA%2BQPMaADbit1p7rkRKc3p81o6U0sldTo14nuxEW%2BSGM4AnBsAmLk3TFio%2FCnANqf4zDRWkn3k8JRDKEXWPEu45t%2FCEo%2BX1ZG4bHNe0X46HjgSw8aVYIAUzGlC35sCKWfeCjj1bruIrDTWHDPWbGzvn7LfznyvOkZK3AsLDYdwcgCsIt69%2F3ym56ON9wRvLWjx8qdvVqWO9Z7ZeBoIWrtMUIU&X-Amz-Signature=7b1bb97a47a5d8d2af2ec044e31570400738b8c7c041a43ee7543c27ea9c4b1c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKINKLVB%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T142747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIBeY8W%2FNh8moAZg6CTyrvLYR5iofaR8OnwFwQJkW4zkDAiEA1Uhxuek0VA09z8v176UALFhq7%2Fra5u21WvidII59CzYq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDPOCMZkuDmjoQIOSIyrcA%2FNJx3c6A2gDR%2FoDXvZpgD2HQTSi5ymVGOoXMe6wbp7RZnC3FHpWPb5%2FmUfLnMBT5XGjFBUMAcFKMj%2FUHVFNyWTdrjhjjUcmFnIgVDP9zD%2F8AaW3P%2Bbjs4RO1XwxjitKMxalQYpPtbzhw1DXneItrtGurzePqQwEh6nAKsSEeLf2AAmyJhO%2FS835TTaKQBCC1nGJYMuZXFBQCJFDZnVbQnO5%2B94Ep1AJ44xz5WFhaApFGezWSv0jBNOkXmHxZII8bI1ZAQmPSXlyLcuI1v5cL%2B8UTtAVfXisZrC0FlbDP2GwL123KucBNTxzX4TvRDdAAeTJ%2BqoZNh7vQnAM0JEHNlffs6RDwWvdR5zY3Z1vt1phhUC%2FnV6UP6edjtliftLBNJMIljRkX7F4hm1Tiq3sYvkB63Un1GGfb2HKoGKNy2OIeF5cGOQ9qOsIJ8J1KEvBzx7dFmHO1i9CEDccvSAaHuxBW4itw0ZcvumVoDPYczWSQ0Ref5cLDv%2BvnEmUnnjMVKOs00PtE6lYGFdPjmu6hzL1UTCI4IgJzlfupY6V7Y2X0ItWWtts39N8bj3DoEG18DOzFceHxgLMIDlc3Znn7FZEz%2BN3Gvd3T7zXkNALQJU%2FQIpG%2Fe8uumhAaFF9MI7dmM8GOqUBfKjdrbE71iaSPycj64rhsxo3W3lXMWJteWSszz0DVfplq9BGWg5VDIhZXyxf2rlekIslO%2FewEzIa55SikqRSn%2BZ4UqfaiEmEOZhwWQ%2BtVaIb8sIZeENeRwjKuAwCuGWq2r4FWR%2BGNd8bKKHM%2BacvJXXxWCdPtrav6BUPo6XCNvR85oaFVBEO%2BMzVgaqh2MIIkjH6RXnd3gM2cZbm9s0ocuIOYxKB&X-Amz-Signature=ebfe0de4272a253e0e5f385e008137ef979b6b7a4fe001c073e97975d188c7f4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662KLZWMZY%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T142748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQCivw8yeTnvT0muL%2BtuYtLPkGTiTlgsP2837EJNuYcAzQIhAOcKiSwt98eG%2B1W5j8cqcgOxdoD3WQUna9zWpAsSAe8MKv8DCB8QABoMNjM3NDIzMTgzODA1IgzHvJarAsR3uwgxRpwq3AORlFC1%2BvzkWAljsSoA6x55PbofOmzUVXs7YdBStSWz8mScDP%2Fqz5daPyVr9cPoseod6m5N9agfeZJgrY47gBq7RMvbib76ylpyY3jhSiOBZw2xQFvmDfmvH2mvuR5g7GKVGLGCAB4bLKUUBc%2Bogg1hcMjj9092xEw2Zd5OFQAvDQVMG90TDnuYLuV0e%2FCeT%2BmNLe4%2B9GkTwcaAgDoHnisYfs5XlhY0RMlkjODVRjTrDPyQnBCT7RMqJ9qUIs2Z2sO8EUTYREYD9Agik8CDdhCSgCnT5HA%2FV0lvcZ3hWVH7hchDb9WVVvY1Egr5mpsJwnoIQgFEnrhfYOdpRVazv2s6FzbhmL30%2Ft4ml8WflLa3NUZ8Fztk0AeprN36NAes760xnyYrhoDj6jvUUwPtS0u8cChAPqgbYHfOzXMx2Bx%2B1ikoDLQdFGDWKRtL3NOrbk1uuKV5mPiQ5%2BBnh%2BGKuqnD%2F4sj7uLw3%2B7ayzFR3cZiNIHNVDlagH4IKd%2BL4OoFuUlw0%2BGM9jfv6l4Iek2xAeyrYzZNjG1GcxqT8tYnbNgV5ZCMfyzDfZw7xvbXtZeuy87aSn6GH5xO04srMkVaXIiI%2BJ5mbLnkV1weaEKtWdvEQf%2FF93qR4tTtaoubXjCq3pjPBjqkAXCohyHZeyhHxlGX4smxqcGitSMZ5Hxlr5WgPUWXj8LIGY%2Bta%2F0nnmJkFhjhqOkgevPeTexcm0BHSvorPuxK1qR9qT5ZsLgqqlStVh%2Bg%2Ft3FXx9EQ08iAOn6ueQWC0GI%2BSNU%2BxvZ7NK2FcuwROz8p4q3XKckdxG6%2F39%2Bm2PF6%2FVsHeCxMsTvgvHhXmlP0bhChIgHoTNXffw8CQTaTPsZshPCjlr5&X-Amz-Signature=366eab6aca3fa8967ca76b0eb4189568342a139ed4b2c80847b056b08f9fe517&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662KLZWMZY%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T142748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQCivw8yeTnvT0muL%2BtuYtLPkGTiTlgsP2837EJNuYcAzQIhAOcKiSwt98eG%2B1W5j8cqcgOxdoD3WQUna9zWpAsSAe8MKv8DCB8QABoMNjM3NDIzMTgzODA1IgzHvJarAsR3uwgxRpwq3AORlFC1%2BvzkWAljsSoA6x55PbofOmzUVXs7YdBStSWz8mScDP%2Fqz5daPyVr9cPoseod6m5N9agfeZJgrY47gBq7RMvbib76ylpyY3jhSiOBZw2xQFvmDfmvH2mvuR5g7GKVGLGCAB4bLKUUBc%2Bogg1hcMjj9092xEw2Zd5OFQAvDQVMG90TDnuYLuV0e%2FCeT%2BmNLe4%2B9GkTwcaAgDoHnisYfs5XlhY0RMlkjODVRjTrDPyQnBCT7RMqJ9qUIs2Z2sO8EUTYREYD9Agik8CDdhCSgCnT5HA%2FV0lvcZ3hWVH7hchDb9WVVvY1Egr5mpsJwnoIQgFEnrhfYOdpRVazv2s6FzbhmL30%2Ft4ml8WflLa3NUZ8Fztk0AeprN36NAes760xnyYrhoDj6jvUUwPtS0u8cChAPqgbYHfOzXMx2Bx%2B1ikoDLQdFGDWKRtL3NOrbk1uuKV5mPiQ5%2BBnh%2BGKuqnD%2F4sj7uLw3%2B7ayzFR3cZiNIHNVDlagH4IKd%2BL4OoFuUlw0%2BGM9jfv6l4Iek2xAeyrYzZNjG1GcxqT8tYnbNgV5ZCMfyzDfZw7xvbXtZeuy87aSn6GH5xO04srMkVaXIiI%2BJ5mbLnkV1weaEKtWdvEQf%2FF93qR4tTtaoubXjCq3pjPBjqkAXCohyHZeyhHxlGX4smxqcGitSMZ5Hxlr5WgPUWXj8LIGY%2Bta%2F0nnmJkFhjhqOkgevPeTexcm0BHSvorPuxK1qR9qT5ZsLgqqlStVh%2Bg%2Ft3FXx9EQ08iAOn6ueQWC0GI%2BSNU%2BxvZ7NK2FcuwROz8p4q3XKckdxG6%2F39%2Bm2PF6%2FVsHeCxMsTvgvHhXmlP0bhChIgHoTNXffw8CQTaTPsZshPCjlr5&X-Amz-Signature=59744f20dea1506ca84001fa58ad3ca7afa03d8297cbcc11dea461e24cedcec5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZMXXZSUP%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T142749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIHQnqcMV5cnI0IM3IyKs4qSx%2BqPVMBAYwDJ%2FcPACp9shAiEAq0sFlYzu3h2p%2F39HaNt6e25wM3dz3dWxY00Hk%2F4iYKAq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDMm6Ex37PVny6wJ2YCrcA3CxhqgdHjhO44HVdp%2F2OL%2BGxuptiqon2Kuie%2Bh5rQMTKcC%2ByEzktxgVtBQCmDCHJFJtlIf4%2B8p9Dcc8yhN%2BHJqY12I67fgD4lp0bOOKTrQkZrVfwteswyctB%2FEV4qI8Zwi%2FYBFkaTBCDJZtF7XWIv2aQsfHwnb10MyrvKC6hGW5XeWmniiSZrfEfFBwx15vww1IoeWdCkOOXpNlOq74WNznOIwfFJacvr%2F7EHjfoekG9XGQWVqdZ3gtuQpqV8Erw3M344VFGsrEpw3jLlhr2vROR1I0lcKwavIAl4rtNOpTPYoct1bOVPrlwL2KTZx87omQYyi0qWlBFCm4P9dwibatcG0jv0nh8u0IrjeqXx6xSyHGAC%2FwmY6zlwJjkE8G%2F6hziu4XJ1uCVbgB2ted6vAYA0hmoJiYfpUoYToVSMUCpNLDINz9BlsXcGJmKw%2BAi2khdWOobdioQ4gwyleKiZXuhflPP1nf8Woap3RHXooA%2B%2FwuhmvNFaP70BcjZvS7a43Cn52km%2FnDLoiCHAMrLmBz1bs9x6KRpM%2B7uKuJYz51cTzJiEJ%2BrAIRA99b7wE%2F7dVhxjJ%2BMfANWqPy5zZxRsS731vrgFinNf6rxnCl5I7ZGKftzx%2B2kErUi1pwMLXcmM8GOqUB14jT%2FQiukG7LGFH7GgM4zxtuHUTacY375xSgr3P9K4Hjr0K8M%2BjcT1n33i%2Be3w24uB9aHvUQKF8yY%2FNDPO62pgoXOETTPQac0PUAB5EAdPzTyXkGjr%2Fq%2F5M0wnl1%2FzLvq6%2BguLuUgsHH%2FGLEDkfRcLHXfdq8kAZDjVfI0WKIdkN%2B%2FtAy6QrpcOWunyHGz6Jw2SGDRYe6c2YQwF6hQGIzODYBSsbh&X-Amz-Signature=229530f945678ea955be70194f46781e8c89ad6aff254dc215e2329230a7006c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YPPV4TCL%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T142749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCIG6vyGrF4a3Xh6dEFmm9fIp6kFP1SEv5r2vIBsJORHHSAiBc%2FWX5i17k2EQPgamdkOjASkSYFztUKjgla3LzKApkHir%2FAwgfEAAaDDYzNzQyMzE4MzgwNSIMfEfzhc5qQujqrndJKtwDSGPAYQg3nWQAxtptuctSKxTCqVVPYtjxGRWUzRMtV7X5671rRPuFOkfVVER1DNOgDNt0yRRc%2FSbYSqgpP2od2lHXzaYB8AhqoRMZLm9F6x5TKwxyzao2x5AcZpOk91bZuPFmd%2FQwuis1l3p2sV0tttG0wQl9FOfSJI3UXMlyUsjXasOlbK%2Fvko0NcX9X7CkSWtuLAFmysTYnyg1xZV%2F22TS1N1m%2BdxCYMcX9l4AY3Wwy%2FCZgn3xYRR%2B5A2V9IThT%2BS%2BQReLPUeoIj91%2BQVzPJnql69eQiTdTQv6lJHY8Lnm%2FQ0h7GV9wHkjKvt9Eng3TrZXWcRTuNKXX00McvwwRELmz62UpF6Xu%2FPvHDhqzkShZr20TPWV6viSV%2BpDkrEEuCQX6P5qlugCHQiT8TMsJgoK6dP%2FPQLi6kXEpfBwh%2B5USU49RDV3fmUxlCb%2BdR8dthhHYOiB820dK1qsZ1oZrXtswzzq5lkFKJohj%2BNDDGcxPuWVE9HKozfP76BgJQCaO1YRueqXsWqFtjrvgD%2FXeanUdQMaDB9OKOWr9mJRn8xrxuTm2pAJofzXlHzJZOY0stpx8MnlonyhtPjoEKrHJaNORd1Uc52d8sL833uvqA2vs%2FRqld22qVVa2sC0w9t2YzwY6pgGpwXyvXTdqCXkaCv%2F%2F9eXlucn79RU9AYoVOsP%2F8W4bGvWObAx8haNW4tMbz49vQZeLFATv4JYQVtUQtXp3MCV%2BFbaBxUrr2NeL4n6eJFZYhl0bVg0z%2BUMiYqqPBs9m2Be6mQfXiPU0ZsuvCU2v60lDd48F3YjmzEh8XG6zoJAJb9CdG2spt2T0RmzwXuj5RG%2BDBQWBSUzckyswN9%2Bh7Rv%2BurzABFSS&X-Amz-Signature=6381299598d07052b109d98bd436e2f23fd512f64a468632371af614250e9364&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QYRJ62KR%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T142749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCIG7bNC9IY781kjrlA3tEoxTbofk21nmWnBsRu68xhdZZAiBEzwJcdqWV0sPcxWtSk4SBDAnYWV7Y0TT3jhtxf5azyyr%2FAwgfEAAaDDYzNzQyMzE4MzgwNSIMVFf54lAKzhajK1gmKtwDXWS9YGTCdv72OdA%2BvbqthWBHBNWHimtiEWsZKcvppbac31HtOJ0iIDlLPgrbAQvWwysBl1ErTE%2FQchnnAETsMmvZC4oQMe%2B0rwlsTecdwap0vV9wP5ySFcho7sLY5C2DS%2FXSBB0ETHJ0TosYCDXWiG%2Ft8NyYzjwwgtoScPo2ww95jaLhlb7QhZGavKIk8YO%2FISRUXEQQwGovq4pIfWu0ANAAX0Ks782hzlpWwvTBYrS6wXpWO%2FmfOB8GRBzYzwxg8MjLhkno%2F6w4l47XFJnWOAbyFm7V0L%2F9vsi8j%2FdzV03b%2BJ1X3fH%2BvIGCKkb6JomZs%2BiuJacKA4RQKQOPQgoHCzYujXPrjqhufzCJC3bS37UUJg%2BQrVR7KZYsZckZ73A97Mp7rAmw2CxK1wgeD8DaJSO8fivkCCtaLNwH%2FEvuSOngeSpDaJ0cusrRgPB7HyPQS4T9uus25THM%2FCMG06%2BdBQrS3e8UySXYqHsh8JcV1HOS0Hf%2B%2F38%2FRBrT90hCEa2p5OHmQh0qAlWzkVaTgIVojRytjubp9PjigvgesCUU0Zby84kfAPp0CJentBB1QwlIYNDs7UI0P7tjvd1IWeyAKXVGv8E%2FPf34PZFw6cP2tMduvoW1Ajj%2F7Cyz5qswztuYzwY6pgGnakJBjaqAdn1sZfMiGURGEmD2mPPDwehjPFWTEPtPsBfPNDEeEME%2FBfcILc7owphbA52%2BWFhqWfR0Ybskg8FJTUHjgXCA92ds759JM%2Fhcfj%2FqZb4vYIiBubMCuVlO166nFy0e4hq90hg5ulY0AyofscUeAwSqQmOObObQWzmYwdr7f4xi%2FrPouRkLpHcg5iiORYFn3BQ2olW2ghk7T2WnlZtAeKGN&X-Amz-Signature=9bce7246adf611b1d23ee81804f9d6cf7eb625b92cfa4c13e73f378e96a8c0e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663NITMT4Z%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T142750Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQCmJJs3MrG%2FAOmqY%2BcyZ7rgzUw4rWPm2oY6YmBqjU%2BAjwIgFEtM9uqejWSu8oyb%2B841rWQMyGTwr5BiinbmaImGVo4q%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDPsXoTAQgiWKbAEUUSrcA1UyroZhD7QcRwaCrKe6NgWVUEVbbTVaCD1UVb5JirLbMdTjF9Zt4s4sYZ%2BTnlGtMJ6YTtPZJ5P9CAuTJqhIiCyZ0gMjyqpkfoh2ut0wAMi7AmzJyuqH09P7u8lgAV1mNNO7ka0cz4F51XsxB3FYd6QSowGjTAx9famzizVwlmjWBVFpTsDOVa3f73hS6xnajjr51V0TdRGfCaIiVgzV6iaiScZFRUVMcQwM7suXzG7JLXmQrfwJu%2BSSvvz1zBWiFsZAnNERDmLclEmb6ZHU98EkdGLBoqjyvsFDlq8zm5M6aifHRBR3gD6GZkPQ%2FE%2BPE0VmV3HRmQuo5Aiko5REskHyFJhXW%2F2gQ%2FRv76ZG%2Bf8QVCsV%2FYiwlji%2BasAszsKdKmzeWRdhJmv6P2e2rap%2Bw0ukYjNpBYdYH784XDm6EYlbgkMdtsoOYlp9D3zSA%2BLCWz6HjGq%2FxZi0LX2P4ic58gmHUh7jvn%2F7M1BRta7bquBkgyp4%2FFxFaRkECkMS06FT6ljFjgo9IzgEKhyQAMl6d261aT8xZsjICNCI1ZzHJsThBSGIgsVxOdeLqrjkbN1vIK%2FffHzgyLlrt%2FM7T%2BZGd50XR8ODW4gtBRAPam7oSSwI1xzmAkSrGu1pnvS7MMbcmM8GOqUB%2B5KTK2xAyeZbAx6Is9iPO7%2Bl4v3GHb%2B%2B2mFgC9O0e0tFm6LgH2LHvr4Xp0FW9w%2BXsJ4nSnwyiPV2YaHd0hhX3IotHZ5S5vFm8zc%2BFJWTgkfUw28V2ythOH%2FQ77DGn4ar5XxhFRCqEOSYKiK%2FfNU4p4viWbfvTN%2BDFZy00gtGR3%2Bc3VJnJAySj2Fjj1TmWorfYVGjrlTPfTZse3I3Wr7kkH2aaOFF&X-Amz-Signature=a1b151e00ff16a806cf3f9a580d6afd1ba85dc84d9d0d6a5b5a9f28a514841b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663NITMT4Z%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T142750Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQCmJJs3MrG%2FAOmqY%2BcyZ7rgzUw4rWPm2oY6YmBqjU%2BAjwIgFEtM9uqejWSu8oyb%2B841rWQMyGTwr5BiinbmaImGVo4q%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDPsXoTAQgiWKbAEUUSrcA1UyroZhD7QcRwaCrKe6NgWVUEVbbTVaCD1UVb5JirLbMdTjF9Zt4s4sYZ%2BTnlGtMJ6YTtPZJ5P9CAuTJqhIiCyZ0gMjyqpkfoh2ut0wAMi7AmzJyuqH09P7u8lgAV1mNNO7ka0cz4F51XsxB3FYd6QSowGjTAx9famzizVwlmjWBVFpTsDOVa3f73hS6xnajjr51V0TdRGfCaIiVgzV6iaiScZFRUVMcQwM7suXzG7JLXmQrfwJu%2BSSvvz1zBWiFsZAnNERDmLclEmb6ZHU98EkdGLBoqjyvsFDlq8zm5M6aifHRBR3gD6GZkPQ%2FE%2BPE0VmV3HRmQuo5Aiko5REskHyFJhXW%2F2gQ%2FRv76ZG%2Bf8QVCsV%2FYiwlji%2BasAszsKdKmzeWRdhJmv6P2e2rap%2Bw0ukYjNpBYdYH784XDm6EYlbgkMdtsoOYlp9D3zSA%2BLCWz6HjGq%2FxZi0LX2P4ic58gmHUh7jvn%2F7M1BRta7bquBkgyp4%2FFxFaRkECkMS06FT6ljFjgo9IzgEKhyQAMl6d261aT8xZsjICNCI1ZzHJsThBSGIgsVxOdeLqrjkbN1vIK%2FffHzgyLlrt%2FM7T%2BZGd50XR8ODW4gtBRAPam7oSSwI1xzmAkSrGu1pnvS7MMbcmM8GOqUB%2B5KTK2xAyeZbAx6Is9iPO7%2Bl4v3GHb%2B%2B2mFgC9O0e0tFm6LgH2LHvr4Xp0FW9w%2BXsJ4nSnwyiPV2YaHd0hhX3IotHZ5S5vFm8zc%2BFJWTgkfUw28V2ythOH%2FQ77DGn4ar5XxhFRCqEOSYKiK%2FfNU4p4viWbfvTN%2BDFZy00gtGR3%2Bc3VJnJAySj2Fjj1TmWorfYVGjrlTPfTZse3I3Wr7kkH2aaOFF&X-Amz-Signature=f74969111ad5fe67aca8c6ab8ad1e47056172213769c44c83d0c5920636b5fc8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V4DLMCCB%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T142745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIAiJqkYXuKq%2F9o6zZOj7KQgurW5CDwdSrWYvIlZQGc%2FPAiEA8Tf6kkEkVrVVcniGMlUl5vAeGMycKqItGYbtWW7wIE4q%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDPekLNLOIckRwXCufircA%2BqTYG3%2FmgZ44V%2B0wFJ2SeIJfwNFTZNioe6EMsQH5YZGUCDynk0QIzBClHjd61NJp9PTRevvr%2FVatvlvQlQJqPXfivScz2rSEDB8QEbUmtamBdMOFiAQiIAbkvRgL00nFq1CeIis%2FPbgzmkrzPw9ET8UC6vrDNbe0KaVH4aJ7Eq3CLmEURhBRVDBwMe1U9%2FR4G48J7OA0aI88GsWV%2BXBs6%2BS0UJiINd73XwJWKgUyoDd9LyUW9Pr56L4FpZU%2FalvOqnVGDdP%2BJQAsUMwz5Tje8BDYK2sQfSQ9If5FTMgs5mJD4wWy6R28BGEAI6bQbfEcnnPaYdYphT4cPGEOlFmEC1yUPKvYiHvM2I5eUyaN3aC1dnJ9dL9sT6m1LcX%2FI3BiG8q6Pc1a%2BQlauI4WyKEle4r%2Bct8ts%2BhdxiibPIMKm91WibULIXQjF80Y%2Bb8OU%2BDNrMzGRkPo2UHXw5rOI0Zlcm4x7PFgdGLIj6lQVcTvZ2kU2q70xpDK3AYiMukc99UKC%2BIxsudd8h%2FD6%2F0PGcUx2lEB%2FtLVVexxnpfOX5mkYrEaCmLKFhF0v6alaN0jz1PV6dRD%2B9GqtUZTKT5MjSTsWzFs7H1r4sPsSEvbfJ7gWW0vOWUJ%2FMqovK9hvjSMLvdmM8GOqUBuMPFgT6QlZ9vHs1AGxEsK6q%2FmSubrDFkdwiE8qSlVE1zHukodT6JGzbhuhlGfDvkZ7M6EQWBhZ%2FYO04bBvEScUpK6qHw9FBf1Be8f3yH8CTOsHDvR93lnNd%2BFWkvvlY7XmU7IoN7gZegZ%2Btdzr3kQHOYrJFBS6QXF7boTD3H%2F%2BUQ3jFNgzKtulyViFGd5Fozz%2FpQKqKRSMdzyzHEw7tbeN6BUBcC&X-Amz-Signature=5ce572a3caf80cadf68afbaac6dfbb155a13353a743a488fdb60a18dcd6d97b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ML5ZGUO%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T142753Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQDiwFPTP75BObx6uiCYKjPWmq%2BNnVrpjvy2mPvoX5ntKAIhAKSJbAkzmDecZqxeWSdFggldi%2Bj8x%2BavxE%2F1mVf9QnVpKv8DCB8QABoMNjM3NDIzMTgzODA1IgwnjftZROKE%2BTEk%2BHAq3APjL481%2BkPzmTGqpX1G7Yg0Avwd8cw8P9Fd4%2F%2F4gFvRJVC0kR9x%2BtRsS9s4FopMTQv2x%2BX3%2BU3pWtdOMzRvUWfLm%2FirkaEWZdIxqcK%2FIRGCLkvJFOuhbuwQbF4ge%2FGAwBcWojZ1KJzFY71m85nYHlS%2BRE1TZUwJjeQom0GmsdS%2BG79f9QxF4ar0kKSCZp%2F2h0Qsg7iKVlxefZfA3VszFS1SIGs%2Fi9wS9TiqASZZ%2FTN%2FdV22FoJde%2BGwtSLv1wZXmgy85pigtQr6HQtF%2FJRnXU82snMI9mwO3LVE4gdzFY%2FH4NBFkJR21LCBiaTTGt7hySjqC77KNKujUpW29YjIvZpS4qwja86goLDylhIJvlUudWgG%2F9fMsNPc5AtP3m2yDmRCh7R1HR%2BXF5vcEvr6FAChXbQ1FqLcxVz5DbKII0kYqhJSrTXG09erhiv3aQAsBgi7VZVoVt6V0w7UesvH%2FhBH%2FCUamYd03wowIYtv9mDyKqALLcooC0jVot8utO8D%2B%2FHe0lVfq%2FEp04uiH%2B7U9arzTZijKxhYI%2BSBxr1zIDv%2F45l2jJjV9GRnwNgEtpYMgsAL%2BnMKW7CF84BeZ2jN%2B%2FXCddznkTy52YZMY4gKmlS6l7ZDuew62Dmbe2DroTD13ZjPBjqkAa6o4lL%2BKChefOcrln%2BUxWRnGyiay0NOEpWkeroeZEESNZIr56YhsfUpnuEitdhiFqpt1D9k%2BnPopIe8461hSg748zKgPTXn68pM8pFSLBHvQ3Iw1QYnpMFPSJu%2BL6QU8VspR9Xeihj2lZ9VCBeem77Oaj7wWP261u3%2B8ZSAzx9%2FmcIeVTjrcB1tW7Hk9ZXYhOqCB2R1arhgcn9g4C85X3RnjPlO&X-Amz-Signature=29cb57e725a6d6de9dbaebe920dd2606382a41dcf43a644fd3547f65ac070d3f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ML5ZGUO%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T142753Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQDiwFPTP75BObx6uiCYKjPWmq%2BNnVrpjvy2mPvoX5ntKAIhAKSJbAkzmDecZqxeWSdFggldi%2Bj8x%2BavxE%2F1mVf9QnVpKv8DCB8QABoMNjM3NDIzMTgzODA1IgwnjftZROKE%2BTEk%2BHAq3APjL481%2BkPzmTGqpX1G7Yg0Avwd8cw8P9Fd4%2F%2F4gFvRJVC0kR9x%2BtRsS9s4FopMTQv2x%2BX3%2BU3pWtdOMzRvUWfLm%2FirkaEWZdIxqcK%2FIRGCLkvJFOuhbuwQbF4ge%2FGAwBcWojZ1KJzFY71m85nYHlS%2BRE1TZUwJjeQom0GmsdS%2BG79f9QxF4ar0kKSCZp%2F2h0Qsg7iKVlxefZfA3VszFS1SIGs%2Fi9wS9TiqASZZ%2FTN%2FdV22FoJde%2BGwtSLv1wZXmgy85pigtQr6HQtF%2FJRnXU82snMI9mwO3LVE4gdzFY%2FH4NBFkJR21LCBiaTTGt7hySjqC77KNKujUpW29YjIvZpS4qwja86goLDylhIJvlUudWgG%2F9fMsNPc5AtP3m2yDmRCh7R1HR%2BXF5vcEvr6FAChXbQ1FqLcxVz5DbKII0kYqhJSrTXG09erhiv3aQAsBgi7VZVoVt6V0w7UesvH%2FhBH%2FCUamYd03wowIYtv9mDyKqALLcooC0jVot8utO8D%2B%2FHe0lVfq%2FEp04uiH%2B7U9arzTZijKxhYI%2BSBxr1zIDv%2F45l2jJjV9GRnwNgEtpYMgsAL%2BnMKW7CF84BeZ2jN%2B%2FXCddznkTy52YZMY4gKmlS6l7ZDuew62Dmbe2DroTD13ZjPBjqkAa6o4lL%2BKChefOcrln%2BUxWRnGyiay0NOEpWkeroeZEESNZIr56YhsfUpnuEitdhiFqpt1D9k%2BnPopIe8461hSg748zKgPTXn68pM8pFSLBHvQ3Iw1QYnpMFPSJu%2BL6QU8VspR9Xeihj2lZ9VCBeem77Oaj7wWP261u3%2B8ZSAzx9%2FmcIeVTjrcB1tW7Hk9ZXYhOqCB2R1arhgcn9g4C85X3RnjPlO&X-Amz-Signature=29cb57e725a6d6de9dbaebe920dd2606382a41dcf43a644fd3547f65ac070d3f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVOO5374%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T142754Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIE2lQApqUgq9EOouX76daM%2FyJfel%2Bf5EIOKTvbjEe%2F7XAiEAtk83h6Ux2gzk0WRPtaaTtC4ZI%2FWaW7EA7u45B2uwVlIq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDEHPdoObmxcNYzmuQyrcA4LrQqVxPpIQAkFKkKleHwNzN8iHB02tT%2BZyN4yMTc0gIehe719FFOtvj5l0fxuPLtbQbmW3WusOr1t41QxBQIs43DY0APYqHxCJtPQ%2FigdsEfjyoaNNilMh3bFUGVTx9f%2F8w5a0j29vo3AwDcKKOJ0ZUxjd%2FBqKBDcU28j4myDxzd3q1X2fWl%2FPMqOHimGjxyN%2FD31SfndvHeoXQ7aMIIcjWC2OPE6yLr6iK0gL901nsV67vcRgx5qDNXiA47UdW5nMbeD2C%2F8mjQ4lO8wUSn8CUhUbHZ7Nzq9X9GPFZGmvt7rU0h9hj9k5m5K4tskq7PW6ojh4Md853DvfULRESrE%2BLQbU7ZIfoYdKo4qwk%2B2ueemet28rFTfNMA45c1oN7MdBPQ3MmmlcIsyeSEnyeIxTkVeC67gXd2EdiANCftzpEOvaJKK7%2FFooSNEhk5Dn%2Fk6YPvruYfIIFvoSFl6IxpOSlrDoHeXyLIrFIgqbSwpTquhIpeL2s78eAa7xeZuV4tPUuGcDM4VzR4QJsvGHqUCgCpDpefVNfd2b5cKPIZASchBwIRWylsQnp2W7nQp9iBfydQfCsHiGokuuSihW1OO946GYiWt%2BiTUKqae4rh3z8ZSZ6Jg7g5E1DS%2BdMKvbmM8GOqUBWKIPvCDZjBb3JBQhBFF7ZX8XqZhJhfwfsUJ%2FBA2bgmuwSOO7nvG42bi3JN0SaKzatLCrAkE%2BYSRZB7MWKIwrh%2FTPnjwaxaUKOeCCkyiTK%2Fee0sZFNZ0AUPq6hLxG7TMNGyTssOR62Q1W51yTr8FbabeHkIzXyTYLxZ6jeJKw1vCgqYJ4Q9EIXFo8guiEEre2GmQVvwGanV0wgA8J2twMY1udiCYy&X-Amz-Signature=356dffc7e231f171f34bb3db9fd3d4df4adfee9c7ef4cb5d51a35d5f04fdda74&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

