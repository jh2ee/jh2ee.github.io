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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TR5MSCRY%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T123733Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIQDxTKvnX6cal2D%2BDpwHt8NGIXCYsRFHpbQraOABmaU2XwIgV4GhKIyS56dSJSyD5Nkd9vRthrxUWK60mAdW0QYP7nEq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDENICDSM4d0PV7XSUircAxab9Fl%2BE3KBOi2PtGa94gdVVxuz0%2Bs9mGNjmE13TYIzeQGoaStPhP7mYodKSmAqmv4%2Ft8zLxKXupk7K9mMLTD0J0MCeiu9fqbXCUNkag5NNkQnVPu2T4tzma62MIsmjUA5d18wKMVrdLPDx8Lhe5M8mRKLoPKsdlrcpbatROtD11L3DALuyRwInfPxYCkEGQdqp%2BMFNne64wa%2Bne7C5UgtsdDJpucJf6euyWU7hG1M3V9qw%2FUErkTgW52F34nFRlqmI9PPSyFmAKzSvEUOw6Oazf4vPPhv2XtHBWO%2FU%2B70Cq8fs61V4K1%2F7UCSkXIzvF0Zqq1UgMaoBzx69OzAWddB2LBdukFg37jIEtE3jI%2B5pAYZioVJY3iGW7S3Ax74l%2B1VBoXy%2BWg81UIjW1evwbZWw7CsJ%2BEhlOS5xGUYczkeUUQpGjtftNp%2ByKdpEd%2FvXfax6xAHHHdZo%2BfGsYg4Fr6UkKfkx%2Bn8Tb13wjv98Cg7wXmMjMUdmNeOIjB5lwxyD2JwtgoPW77ihmrkOG%2FaD%2Foz6gTkwmQcloY%2FPxBkA3wXbTjhvXIabUxR3U6d070Z%2Ftv%2B68Y9LNGIoO3lgn%2FKddpXDWucE47%2Fyl9gaQ4trC%2F3rjfwW8DcxfpYA1Z9wMI%2BB6s0GOqUBPzDF%2Blb5pEXN5nkduSEw04M5jYBJ7Xjs4CatSq%2BP9MyfNsyFP8L6FMCPgIS3xgMzBozeeEpUqnSVuPRR1vQUe%2Bquokl%2BZTroMqXFtO3ElEqgkv71LD1%2F0sT64jGxw50nekneP1%2FQkClkfiMB2Mk7LXr8kLy4SWbx6fd00nIw5TJwRctr5YrWdFaS2hNUaNGa5pLsN9TeBFg3jfL3gr8Cm8MWfnx%2F&X-Amz-Signature=1ae442c89bf5c5758a7c2f58020844e84aee35386e5857f9c67acf93f7405b70&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TR5MSCRY%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T123733Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIQDxTKvnX6cal2D%2BDpwHt8NGIXCYsRFHpbQraOABmaU2XwIgV4GhKIyS56dSJSyD5Nkd9vRthrxUWK60mAdW0QYP7nEq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDENICDSM4d0PV7XSUircAxab9Fl%2BE3KBOi2PtGa94gdVVxuz0%2Bs9mGNjmE13TYIzeQGoaStPhP7mYodKSmAqmv4%2Ft8zLxKXupk7K9mMLTD0J0MCeiu9fqbXCUNkag5NNkQnVPu2T4tzma62MIsmjUA5d18wKMVrdLPDx8Lhe5M8mRKLoPKsdlrcpbatROtD11L3DALuyRwInfPxYCkEGQdqp%2BMFNne64wa%2Bne7C5UgtsdDJpucJf6euyWU7hG1M3V9qw%2FUErkTgW52F34nFRlqmI9PPSyFmAKzSvEUOw6Oazf4vPPhv2XtHBWO%2FU%2B70Cq8fs61V4K1%2F7UCSkXIzvF0Zqq1UgMaoBzx69OzAWddB2LBdukFg37jIEtE3jI%2B5pAYZioVJY3iGW7S3Ax74l%2B1VBoXy%2BWg81UIjW1evwbZWw7CsJ%2BEhlOS5xGUYczkeUUQpGjtftNp%2ByKdpEd%2FvXfax6xAHHHdZo%2BfGsYg4Fr6UkKfkx%2Bn8Tb13wjv98Cg7wXmMjMUdmNeOIjB5lwxyD2JwtgoPW77ihmrkOG%2FaD%2Foz6gTkwmQcloY%2FPxBkA3wXbTjhvXIabUxR3U6d070Z%2Ftv%2B68Y9LNGIoO3lgn%2FKddpXDWucE47%2Fyl9gaQ4trC%2F3rjfwW8DcxfpYA1Z9wMI%2BB6s0GOqUBPzDF%2Blb5pEXN5nkduSEw04M5jYBJ7Xjs4CatSq%2BP9MyfNsyFP8L6FMCPgIS3xgMzBozeeEpUqnSVuPRR1vQUe%2Bquokl%2BZTroMqXFtO3ElEqgkv71LD1%2F0sT64jGxw50nekneP1%2FQkClkfiMB2Mk7LXr8kLy4SWbx6fd00nIw5TJwRctr5YrWdFaS2hNUaNGa5pLsN9TeBFg3jfL3gr8Cm8MWfnx%2F&X-Amz-Signature=1ae442c89bf5c5758a7c2f58020844e84aee35386e5857f9c67acf93f7405b70&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCJ64IIL%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T123733Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJGMEQCIBX0BYLSAojvfOsEn%2FGmK9AGazns8TFU6d1fZ5qZvD%2ByAiASaXIZXsdTBUO0LoJ96km4AulwD7tRURQMi%2BvR5nYDKCr%2FAwgEEAAaDDYzNzQyMzE4MzgwNSIM18lmHJ7fgx7QTei5KtwDZvfFDT1NqHznylhAbJdZq6V27UgGDITXXgu%2BikrrG4BVRBYMbOp7MuUYWuTzKguG4L0aIP%2BrHDWE%2BHp76sYM1xPL6K5C8Kt9415ex%2FthznhW0zkv2RfI5cEAUiuSPm0Mmg4L2%2FfxqxjCMEhCXSCH%2FUCUhNsK%2FUFiJAl%2BO9rA%2BKQEBM3Gt98FzfD456MTbLj2G8JtVgK4tCBy6CxxiESptSJW3JhrhfLZ%2F%2BBib8wdzfhJ5NxcohMS9wbVyQn8vAiYCTciw8v9hxqMzbfYJNAmuYHSVMV%2BWp2cHlJromdqmqJkMSi24hLn6wRNK4uJOBDARtjBsGTe81THjpbsTlP%2FoaRTk8W09VVCqQLqUvQknSM%2F3SDXoDFfGKp2Vli8eWekUAyTJ1oYc1HRCQ8n6QJUnHU9IiJ8WcI9sEqoBI0%2BqAEtQWxMBF2fdlEnCCZucnDBQgfarsAh9EvUIijr5X0ZhwR5lb3e7X0vVOm5MKgpXu6%2F6kIbd73qAeBhwAV8QrmVKDG6IhW4ccG%2BsSSWJjVeXf5VrkkLDGO%2BmRORe%2Fw7780Dx1uQp%2F6D9VfieYVWMn%2BVP0LHasLuA6ojggNHXYjSj5B16evYNh4MKZ3BOnrIb9d830VDsAA0LSWGLEowhYPqzQY6pgHQEiW1eoXGGe5ACDPMAYl5RVzJrw5tkeGQ1SEcOwnSYezTh9CC9B24z0MZa59e1DL5LvZOjGPUQDZJlbu2wZjUKqEt9mm1rKGHkT3w961VqLz6cGX7XwUF6OV6%2B4G9mQTv%2FfVNhA01d%2Fz8StOzBELbtEbMtMQUNoUY32MWcXp%2FViUKvS0wslxqAkRDDw1ArwWKJBykebmPbxjuzRlL5OdvOyUG8DHi&X-Amz-Signature=a2680058e5e8c5d9ff7fc3b3ec28b25c9271b0628f0d62ec3ecd1d5faa8d8068&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ORZ25GZ%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T123743Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIQC0g7olZ0%2BCVOuqMfom3XpvtA0NR1AVP%2BBceo%2FPejhCVgIgcoMUaaEqFwD%2ByIJZDZ1IvVzSYNRKC1n7jxwbPxJR03oq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDJUEh8AFBYRfqykLySrcA%2B2W6%2B%2BT56emaIY0eZn0utdd16W47m4BClQfymQoJHXii9WfOWdYE8cE%2FTHTPN9yLofUX2C%2BBVA8ZIp3cJ05N%2BJiQ5MtzKaUuwdHE3TVnYbb8O2ZWOtZiyaeMoiC%2FNAZN7D%2FVGlf4qAYiPV7dy%2F6sj84hqZ2hGlQMKTanOCblfWDHqhkdkQoxR1pXmoqy9tfgZtDpkYG83qpbfRXOpcM661uFqapF3qqZU6N0L57vtQpYinHevOv8Nx6VX4qfj5I2Yr8%2FAZ8Jwb55ai3QnMtaxC7LCPBtyPo9JO2k56iih%2FxkrrRCTVKlIwqf6WeX%2FA0SgJOMKL39DYAtbi65qtkO3P%2BR71z1d5LZw59WZJlk8HXDCjh7n6mMqCPIbG3rdw5MG2Y8APBixwsRgN33PBdOrDqych8MOXt25EhkAFacaeEXOxbD9Ni6%2BLHoP1v2aX5lJBfCBph0bNQT%2F2%2Fb3oCLlR5oJW1ih8QgXZOQS%2B8IpFvTJn%2BZvpmP2RQn4HhPoFjErsU72bKt7GA1Y2uGBjuLuLf7unCFT3lHo9bQ8TdcH6ruKo4hyrr6LQu7hg8tQ8o2D2S70OlO2f7BLwroscxPLHDQj861aVMrDmp5Vs0JqEfNECztRq3UOS63VbKMOSB6s0GOqUB92wpFn3u7DsYLGXovAcjgPlHi6%2BCAX2%2FfweAPQp0sw%2B%2F8oNIsXaRq%2BESHsZ3Tr2hy8iQM6dcWdGeBkhHx0B%2FDMQ%2FBY1bX2%2FwZajSjDifFu8JD4Xjv48hEozevPwR9imgFm253%2FaeuCu6oEcdzW4Qu1rDFn2DwxJhf8eQwU0MskUuadBzszS3IAzNffbjPEpnbVVhUs3MOGU0FtPza79JrR%2FSdRP9&X-Amz-Signature=64d61385cf59db05b577fbe4587efc6da59b9e9c32bdb410abb3b2b1e618529a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ORZ25GZ%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T123743Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIQC0g7olZ0%2BCVOuqMfom3XpvtA0NR1AVP%2BBceo%2FPejhCVgIgcoMUaaEqFwD%2ByIJZDZ1IvVzSYNRKC1n7jxwbPxJR03oq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDJUEh8AFBYRfqykLySrcA%2B2W6%2B%2BT56emaIY0eZn0utdd16W47m4BClQfymQoJHXii9WfOWdYE8cE%2FTHTPN9yLofUX2C%2BBVA8ZIp3cJ05N%2BJiQ5MtzKaUuwdHE3TVnYbb8O2ZWOtZiyaeMoiC%2FNAZN7D%2FVGlf4qAYiPV7dy%2F6sj84hqZ2hGlQMKTanOCblfWDHqhkdkQoxR1pXmoqy9tfgZtDpkYG83qpbfRXOpcM661uFqapF3qqZU6N0L57vtQpYinHevOv8Nx6VX4qfj5I2Yr8%2FAZ8Jwb55ai3QnMtaxC7LCPBtyPo9JO2k56iih%2FxkrrRCTVKlIwqf6WeX%2FA0SgJOMKL39DYAtbi65qtkO3P%2BR71z1d5LZw59WZJlk8HXDCjh7n6mMqCPIbG3rdw5MG2Y8APBixwsRgN33PBdOrDqych8MOXt25EhkAFacaeEXOxbD9Ni6%2BLHoP1v2aX5lJBfCBph0bNQT%2F2%2Fb3oCLlR5oJW1ih8QgXZOQS%2B8IpFvTJn%2BZvpmP2RQn4HhPoFjErsU72bKt7GA1Y2uGBjuLuLf7unCFT3lHo9bQ8TdcH6ruKo4hyrr6LQu7hg8tQ8o2D2S70OlO2f7BLwroscxPLHDQj861aVMrDmp5Vs0JqEfNECztRq3UOS63VbKMOSB6s0GOqUB92wpFn3u7DsYLGXovAcjgPlHi6%2BCAX2%2FfweAPQp0sw%2B%2F8oNIsXaRq%2BESHsZ3Tr2hy8iQM6dcWdGeBkhHx0B%2FDMQ%2FBY1bX2%2FwZajSjDifFu8JD4Xjv48hEozevPwR9imgFm253%2FaeuCu6oEcdzW4Qu1rDFn2DwxJhf8eQwU0MskUuadBzszS3IAzNffbjPEpnbVVhUs3MOGU0FtPza79JrR%2FSdRP9&X-Amz-Signature=89dbb31ad4a918960aa50332acf472059c0a963923b312c4ada6949a4a9a2550&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666MVC2W5J%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T123744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQCGQMnkVSZU1yYPGz5QROyc2yxzZiPbpxH%2FgA8O53rdEQIhAOfONUfqUlr8PrHy4ktoFP6tugSuDboGEKfA4L0DWVO8Kv8DCAQQABoMNjM3NDIzMTgzODA1Igx%2F%2BnRGYZIJt3F4Bvsq3APkaxHjobZWEwI3OtgnpRwu%2BLDuJhiT5YnP0UxLo55rP7nF0PmYwUNot9H23GDK2hTAvAIvoV4f%2Fy2KPWmbCleB1R5fwV6Wp0jfba7TgJnKx23eQxYPsfEejnrqFHjqBvqqgQKpaaEk9wawhZsvK8VEf70J6Pw0GFNDIqI4moK%2F8PY0lnDAu5toUq3dK1p1wnInQ9JejlgiPY%2Bp%2B0oUkr4flAMWftxD267ypFrcJi0UdizzmMjemyS7X5VHQi%2B%2FigH8Q0WA%2FfPueQBCsudn9W8LgJzM0xqfI04UICIzWdHMX5wxGi3VcePUMUP%2BIb6ZKaB5omMV7%2BYWNUogSiP6IBd1d7%2ByExm8bFqyzUUn8bROmynQlH6eNLllE9mbFKRE%2FamVFUJjqeLVSVQ689IGUf33OSC%2B1DSnhRmKw1cd9WIfhA4zUBcwFv4sPb6XvhH7tWzf3kyVSlgWJeCB1HAnqfcXc1IND2uzVZENZV8jvAb60qDmTZHCxiAFbWbEB1SoYX1tOLp7YntMtHB7XdpZgHAMFil90KP%2F1Tq57UXYa9eDzZpKcFqaWDjP%2Bezskfz9Nv5qWhveiO5nf3PEJ%2FQeyZSRCtv6gh5gx8f76BwMyY5YcRkF3RJLpDXnJYH2FDDegerNBjqkAar6%2FCgeEOFwOa%2F9YzPhOZK7x5sX%2BFZL5zWuyQ6hDZAE%2FNYG78BhRgUSHrIUcGehdBm9S1VIX%2BcavQwjfBWPc3usDPMiWx3OIiTFP%2FKoiaiU0mb5x36i24B6zBkrwZukQJLneTPfmLv3InhqnNTCmK5gscA4vLjTKD5po9uqMzVK5SqJNUJ9v6h7MBnGhgoafupKZDrUm9wUzXvpTl5qiOX0aG4Y&X-Amz-Signature=674856b07a3ba86ce04f5159da639b9015184cb14fa9e8ed8ea25749421725a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625N3PABE%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T123744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJGMEQCIFxKfuqeyvbWHGcuh7YwqLS49ZqjwjjlXS4fem%2B21847AiAad2Wb6C9rOi0Vq0HBFViqkGrjv13xGKs%2F%2BL8mF3N8WSr%2FAwgEEAAaDDYzNzQyMzE4MzgwNSIMXlu8ou2GpqggW8urKtwDLhmpdVFXBYlY51J68NCQY4N%2FJdPCOFVFolLqds2H62Voa8a01KWlxA4yrgWrQcLQJCeVn%2BRU7s6WgmINOwFuaWzG2kG0KYJdazmaA5kqw4d0WeFTr00DTHMm4TAuYi86UsHSjFwZVkQseTEgm%2BlpSIUVxZXm4Ew6UESdBtyLm3CdqZNTbOujZvQqgOeVTn4YKixU8D5P87%2Bbm%2FIx01DMsTfikOduutrxb0v5Cc0sK8BlRyjMZw8KJo%2FrO6oHLMzC24kaZP1gy0C1HJGLsNvhT2IGFyoorXVjxRuPU8LvtaLeAbN%2FcdLnZOn%2B66zDE4UTFyBHcRVyVkbq0mALSDwCQyT%2FtxAWHQyEIFO8za%2FBgumv9yFvyb8Z7HVQOm%2BXSWL5nK6miADTkYPhD67oVIwo%2F%2BR5JhHxVw3MQA9dmtGsO9vCEtT%2BrUXb%2BsVBMZRARoydzC%2BFIS2SB8cQUfW42Vn9mdo83h32vr8KRJinegplxJT1jJRp27iXk%2BNByv4hXZIHm8xEn2hQbgBnMrLhBiTDiwRvG6YFjugS9I2QdPXbtqZNE6GcX5bI1jiMMRVssykiJ%2FrbmbbPVt3xi%2Fs1mLk6mKfmIGh67ujFmdKHWGa7xqziYufAAKKE2JkMeAowjIHqzQY6pgEcLm86RhZAQWvlaV96xbKIL0uetXXZY0aQxr8DEQFXeA2VFp6MfR1djjldnYGoucaQylWhliD%2F4evMxcs4VnxQ%2FGXM1dztqDzheaH0G%2FS6ropoCtW8wRkoWhBFk46d0OW2w2M2qAPd%2FXUAtNaKcmDVuJDmt4wkLmROgVjW%2FN2y%2B7Opk3OntADPLHeem6GlgbYad%2Fu0iVtVIP6pUAb7P%2FO1klvMhGHh&X-Amz-Signature=e3c5507e2db9e7862e3c6b8e9b2e82cc2db29a000e496d47246d5bb82e66e0a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X35DOHMR%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T123746Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIQD68%2FDFIQeRmV%2BMCQwXQqPtd4m4%2FjDFApHOUUlBTgGTgwIgOJH8eB3GCjl7V0NojDaCtNFth8J61JEi8reyAqwh1Ssq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDKb%2Bx4khf9mzv77FPircA9u64GfT8P5qZTGIKriiQa8CS6Qb1UEyXcqeQhCUamVmcWrlDR4hUzLQB4i%2BcOQ7SPcvrIEEWMlfQ%2Bp6%2BNvYaFwehDGoTnvVsIjCXnztCOBjKdF5sazrMZ8KPy4R6ljXC8ub90zJJiq0k4WM26IWLV5tACT5GttXcBfvxgw6nft0195hl0gJoWkSjbASToRs2Uw6yCmjwwTgulFC5%2F2VW5feRYJi586WaaUaDrxDqf4cyZEM%2FS%2BKIrHA5dM8xxBZO75Y5i38ga4QPi0jUr4ypBFMUkcWJvfhLLfWTcXPaRSYnLwpts0FX9JJDMMAS4p3mKav1r61Jd7d6DBUsENMTN8CPZ0TyA8sfky%2BX2XQQyic6LUumBgm1Tw6xRTYeWm4%2FzMd3rLz%2B6zque3AGy%2FDA5wEMDuWbvJNldFxeJ%2FiV%2BmU3qqjPo240dDznNYJFfVueSZK39RAPVeqxp%2FDCBp0cvZ4MpmRPSv5NkHb0kafFEiLAGKaBUwyWMzvbaCcPLQlOv7glFwRqwnN%2BaD27pKj3E2%2Bp05Mctkh5VZXeJruuPNm0TlNzBU0qJnxaIEhWyK8wPvpZrVCbHgOehey2sbpW0GaakSTZiPYnF4T4vCbjv9cQY2BiHnxbneAkrRJMPOA6s0GOqUBpqZXWvSl7Sv6UjORyr01nHqZC907i0TlPg%2FcNC%2B7X4l9MhHUOhrNaOkCo71fw0%2FUYs4pMxcTuHHm5HCHHGa84aFV%2BVF4owg6ZJ6soUOJJF72hzDhrEuCwlsK5OVMttYqgXE7VVlAhXRJ8pBZ%2FKcucap2EExhCBb5JgHkyGBIk0Gzqoh%2FkHgzuJ9nbig6qRkOh%2Ft9VqgjMD2AMCH%2FA1b6MhfM8bqb&X-Amz-Signature=ff9986146989f2f600eef3160c74d692e9b0f51d24522d6055bae684367cce0e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UQ6NEL5N%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T123752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQD6J4zlla8FMU%2FTQvaI7GdWAKCtfNbDZbRm7uP8BZAF0wIgVH2a4A3VTJPz72VwJFPugyMhIc42pvX7kBEpQ01kE8Iq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDHfY%2F4i7XQyC7LxPtyrcA7twJyl7sYj3becjul3yi6a7uVx%2BLBJ0QKONRE0UN8ZHLesOuvsmRWqBrIDokx%2BM%2FPAC0nvSJdqUd%2BvQkJy%2FlxGRbTDtVMKev5mnGYTPL3pELa8qMG%2FBWIIhDhoTH2vxZ81YxhwZMXoGlI4%2BK%2Bis0gqRQlZOaYl3af916TXNPbp5Brnmz%2FFuSqZ%2FLWPA9ROqOcV9bj98ZLJ%2B3TJ5fuCMcEIyHYG9lZwLuPah0WjEo%2BvzUwsg4zPK5PMU5ydG4degCg%2F%2FH5PnZvDtm5fF7Pd0vQyeovixCB%2BGJzYLuWmtISI0SyvKZjXWciVGtcpR7T9%2F6BfDWlB1wlRIdSxyiJ1B1Kh6y8DwtCCWA0Agtr3dlf09fUPw9GqWxFP2sdoj2PM%2BBZvfrqFmK1PLul7e1gen8yzPmDdX4LG18bUnpMG1YFEijqU2v%2BPL2dHsKjlbAMS5Uz17R%2F8SUQEYMgOdVyRUOaX1Vl0beZ6maIawMAdBdC0ikuonxbQFLDFTYF9qnDhVFLAMuvH88Jz%2Bm9%2F%2F%2B8aCw8Je8XAb7H5tSiUtN8bw6Wb7TTuxjk%2BA2DryRDExDF6GRDYCL6gY8g4A1QevAU5ZTgGz4qw%2B4n0MAc675QPL9DS4ERucwOVO%2Bm7%2F9QxOMJCb6s0GOqUBCeoUftHXnlOLfgrjYfVzDAi9aAaDC9FMWXtEyhsSF2iYq9z1CTVU28GsP907gM3C7%2BugVI0UMcRCV4NIxrEfZvEWgScu4knfsDTpx2fGbOVqjm2IJr%2B6t4r2hnR8cbKQRWx023YF97xYZ4IPuK%2B%2F9SMRdy6NgQisnF95BPlzULeCrgXfRoNi39D4JzXbsWOwDEKLeYCKunHPTpkZWpfl0g%2FkqvNq&X-Amz-Signature=35cdd3d488376b3e41685e77b9c0e3e25de62f0ff7a4ead8944c3551de21af3f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UQ6NEL5N%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T123752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQD6J4zlla8FMU%2FTQvaI7GdWAKCtfNbDZbRm7uP8BZAF0wIgVH2a4A3VTJPz72VwJFPugyMhIc42pvX7kBEpQ01kE8Iq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDHfY%2F4i7XQyC7LxPtyrcA7twJyl7sYj3becjul3yi6a7uVx%2BLBJ0QKONRE0UN8ZHLesOuvsmRWqBrIDokx%2BM%2FPAC0nvSJdqUd%2BvQkJy%2FlxGRbTDtVMKev5mnGYTPL3pELa8qMG%2FBWIIhDhoTH2vxZ81YxhwZMXoGlI4%2BK%2Bis0gqRQlZOaYl3af916TXNPbp5Brnmz%2FFuSqZ%2FLWPA9ROqOcV9bj98ZLJ%2B3TJ5fuCMcEIyHYG9lZwLuPah0WjEo%2BvzUwsg4zPK5PMU5ydG4degCg%2F%2FH5PnZvDtm5fF7Pd0vQyeovixCB%2BGJzYLuWmtISI0SyvKZjXWciVGtcpR7T9%2F6BfDWlB1wlRIdSxyiJ1B1Kh6y8DwtCCWA0Agtr3dlf09fUPw9GqWxFP2sdoj2PM%2BBZvfrqFmK1PLul7e1gen8yzPmDdX4LG18bUnpMG1YFEijqU2v%2BPL2dHsKjlbAMS5Uz17R%2F8SUQEYMgOdVyRUOaX1Vl0beZ6maIawMAdBdC0ikuonxbQFLDFTYF9qnDhVFLAMuvH88Jz%2Bm9%2F%2F%2B8aCw8Je8XAb7H5tSiUtN8bw6Wb7TTuxjk%2BA2DryRDExDF6GRDYCL6gY8g4A1QevAU5ZTgGz4qw%2B4n0MAc675QPL9DS4ERucwOVO%2Bm7%2F9QxOMJCb6s0GOqUBCeoUftHXnlOLfgrjYfVzDAi9aAaDC9FMWXtEyhsSF2iYq9z1CTVU28GsP907gM3C7%2BugVI0UMcRCV4NIxrEfZvEWgScu4knfsDTpx2fGbOVqjm2IJr%2B6t4r2hnR8cbKQRWx023YF97xYZ4IPuK%2B%2F9SMRdy6NgQisnF95BPlzULeCrgXfRoNi39D4JzXbsWOwDEKLeYCKunHPTpkZWpfl0g%2FkqvNq&X-Amz-Signature=19a0dd260b5de75bc4a9b9e3cd5bbaaf86535ec0a6df23b157112b48d80a99d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SMCAKA5N%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T123730Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIQCzHJM%2B9zTxxcJOA8omhTQMAJ0L%2BMw2AhfjR5U2SxzVrQIgB2%2FiBSBcNYtHtTcxDaZWu%2Bo4YiAfX%2Fk7AlKOsLsqUvUq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDFMPM3DbbSQc%2F8X3lSrcA%2FdqykQjpzj1NtHM6Q%2B%2B6twLbXKltzwRrg78HUNqmL8oX9E%2FLtoCcjkpZTBlb84vjO4LUFVMduM2yQg26EYdw9PGsXP8QRdpRU%2BqWM%2FzjoI7weYvxbptdnW1l4wkcXgp6Mh0kofoHSv6GlGFS0JBzSu5%2FuqDwACeuTPV7gsAcF4G82ZYATYl4fG8b8C8ppyIFWPQ7JPHgVVd6jurh5UDFzFrznFx5NS3qUT4ftQYby6JdZw8oqwQC3ac0ymK3J8xoRx%2BYnoQXRaeExAPh6%2FfzxOMlxJby9mwMdmC67QX2nUdm6pYG%2Bq1MGP72Ey2EVmIs5j8REBlOeef5Rvl21SxvzSk69ny1ML2rRr5d4oeaGHLIfsW6flYeuHQaAeab9xczkGBpC415mZs%2FD3o3KT9EKEp6lnMnqqFHqCxE50V4akabgcsvSzl9iDVe69a6jdZwfGu17yx4KOu0xngYqpgh9SxBjHRz5%2FSZ3pCeRSiiYNbj%2FdvT2Diadp5ebGaiYIfxIQ7RKXJTOg3hMIF2pKfdDvFA%2FDrQaLYGHCdgGHpg5x5nJl19L%2FFpOeHluoUcSjFYcNDDF91omheQl3qtRMYWfqtmAnPK%2F01wTUv8zuJ4Y3%2BQQQD4MLgcPEZsekhMNWB6s0GOqUBd4hNPjfK3%2B%2FnCf2hJHMjj9jYRHGJAoHnIvOqquSekhg9CbF25U%2FLzl%2BcKcg5Lvw%2BgTf5dzbYubqPNbwcev6BFlemiEesNvjVILEk3YB3%2BntY%2BxbhHhIXklT%2F8hmtJdn%2BVpXkLkf6sRzvPmletM%2FI0UHSWrpFL2d7Kh4B03YmQAgvsCGJIr0eF8GFF2kWWHqd40ULq9kDed90RYC8VUSxFYTZon3Y&X-Amz-Signature=e97669e0a1dcf8b18fff5486767c2b49b4c67648f5b8b3d0ecc572f75f656e4a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VEBPDIQH%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T123754Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIQDS3QqdjZRzPw%2FHeuBwHF0tf9Vzn%2FNnplP6fhQR5fYhTgIgXwpZIxIhfIVsAs7LjiHdfQXupprKro3jBkeoGLbhWGwq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDNYTG8%2BxVZpuLYzKqCrcA06GvQVQWCLVmsx%2BQk9ZnlfMlj%2BgDLvJG8jKoV3d1xIZQc%2FEzCP4IhWQIK%2FFj30RNS%2Biaow8V9Zgu7rT9EaeBQVpX2Py3qE%2B%2FeqznjUtb3IHvONSypfR%2B4hibBPIZ5LvKWy1GugiUdCiobDfURY3nlmHHV1Thp%2Bj%2BmqvyzfhhsrRaMt6JaRMpF3e%2FVeySfEqMz6I2tbMahuJCErzbVirEbW%2FtARywB1Sr6clJg%2F0Psvz9Y%2FtDLFVvdHc7JSHClAEbtqYa6u0h7DuSqOjkVUOaC0GB6EBe%2BoSYIvizusN%2FSJqvNBxceWoq%2F5pTp4vzoGznDnw81Qv8oJ7d8jOgmmlSr%2Fwt5%2FsWBUgjcbFXVWh4jz9WtXdLPUtIS0lsm2PPDSPOjXaAAjzpCUXoTYt6g%2FxrOyrL0ahsh0h5tDM3oTydYLRwyvzJ8ofDT58pOgKeGKwSJ7bFKej9hJSXu%2BpuV8XMoEacI0KhhxZNWvvUiqmBUKjk%2Btbz7AwaI%2FCh72zhqpJQLD5TBDgC2jpauC98BGJyXtx9laKHdpfhzFA2Rj91j6Yebj9tPUs%2B37xaw%2FTe%2FDcHIjKI72dTDboSHnz2L0f%2BXMgSm2fS%2FuWc7%2Bw18n0AfS442LqEoeHKWVXS%2BulML%2BB6s0GOqUB2%2FmczuAS2Wcr6V4QIPie7l7cWRTGoiXkY6g%2FMHfQ8XFcc%2BXhVZo%2FEhEFQNgKhDYo2SL397qDwZtbVI1ZEnlP0SiF2E82pznS5VB47sUZ9dBJl00%2Fo8cOnqy2Qc0kepAzXe52ItA458rjKJtzjlnYd4xD3r3Ys7Q1cDh0WmkUWgSovBstMl0KzNLOy23JZp3j%2BaVvcEaSaIrceD%2FTcysze%2By9PD12&X-Amz-Signature=c3fd1a9991000866b8a7d762bb1b752c157cc8467748115357ca3b24d2e2f437&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VEBPDIQH%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T123754Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIQDS3QqdjZRzPw%2FHeuBwHF0tf9Vzn%2FNnplP6fhQR5fYhTgIgXwpZIxIhfIVsAs7LjiHdfQXupprKro3jBkeoGLbhWGwq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDNYTG8%2BxVZpuLYzKqCrcA06GvQVQWCLVmsx%2BQk9ZnlfMlj%2BgDLvJG8jKoV3d1xIZQc%2FEzCP4IhWQIK%2FFj30RNS%2Biaow8V9Zgu7rT9EaeBQVpX2Py3qE%2B%2FeqznjUtb3IHvONSypfR%2B4hibBPIZ5LvKWy1GugiUdCiobDfURY3nlmHHV1Thp%2Bj%2BmqvyzfhhsrRaMt6JaRMpF3e%2FVeySfEqMz6I2tbMahuJCErzbVirEbW%2FtARywB1Sr6clJg%2F0Psvz9Y%2FtDLFVvdHc7JSHClAEbtqYa6u0h7DuSqOjkVUOaC0GB6EBe%2BoSYIvizusN%2FSJqvNBxceWoq%2F5pTp4vzoGznDnw81Qv8oJ7d8jOgmmlSr%2Fwt5%2FsWBUgjcbFXVWh4jz9WtXdLPUtIS0lsm2PPDSPOjXaAAjzpCUXoTYt6g%2FxrOyrL0ahsh0h5tDM3oTydYLRwyvzJ8ofDT58pOgKeGKwSJ7bFKej9hJSXu%2BpuV8XMoEacI0KhhxZNWvvUiqmBUKjk%2Btbz7AwaI%2FCh72zhqpJQLD5TBDgC2jpauC98BGJyXtx9laKHdpfhzFA2Rj91j6Yebj9tPUs%2B37xaw%2FTe%2FDcHIjKI72dTDboSHnz2L0f%2BXMgSm2fS%2FuWc7%2Bw18n0AfS442LqEoeHKWVXS%2BulML%2BB6s0GOqUB2%2FmczuAS2Wcr6V4QIPie7l7cWRTGoiXkY6g%2FMHfQ8XFcc%2BXhVZo%2FEhEFQNgKhDYo2SL397qDwZtbVI1ZEnlP0SiF2E82pznS5VB47sUZ9dBJl00%2Fo8cOnqy2Qc0kepAzXe52ItA458rjKJtzjlnYd4xD3r3Ys7Q1cDh0WmkUWgSovBstMl0KzNLOy23JZp3j%2BaVvcEaSaIrceD%2FTcysze%2By9PD12&X-Amz-Signature=c3fd1a9991000866b8a7d762bb1b752c157cc8467748115357ca3b24d2e2f437&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RW2F24RZ%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T123755Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQClpT1wDBnT5ROaK6vz6I%2FPvMnPHke4l2LeazIyf2nY7AIhANQSZR0q%2F5A%2FChFlxD%2B1WQr036CeE17UK4s%2F8Xg743LtKv8DCAQQABoMNjM3NDIzMTgzODA1IgwFKckv%2BNHICx2IRgEq3AMB3A0I2K%2BcGkya9byDf0%2ByJB1nun3INuGc7FRRnQaJzF%2BhosfbtNw8ofnoFd4WdidA8KpTc%2F3FZK39R7JQJJXM1jobb5cVBS4EQJ8znYTNoQnCQydyJaN1WAz89MX36s9bdV%2Bj0%2F2KQ31mJwRTyI2MKmlyJ0%2B%2FR01VVelGrXQYQ3%2FWiv%2F8mIUQQZFV35kt52Wsyd0QD4YM4bXPfUYmMD2KOL1SsHX35WYcjEJZvMBs%2FAzwK86AhN3HZ5I7%2BmMqL5OINoQsnFuCwTI3HF%2B6A3bij34PZLZ7KlY3bnYVA2cRYcBVzZDzAtaDuEt194hZS2KZvKSoOBd7EpAo0S8m5dKSO%2FwjoUvdud2VDqhWQ9nJHZlXwnz0g9atNguxPzRbcSb4KG2KrKk3Niz5qyE8vsYinox4r7D1%2BN%2F0eH2aJSEg6twquTYXO0%2Bn68gSoeZnnqBskjo%2F9EtTK%2BcmVsAJMe2vq7DY76%2Fq6gEK6fuMTsNO1Weg4ftq0iekRbFg2k5WIvUhI4i%2F1Y4bNCIIMLPPoZUx3uv1n2TZEM6YdVmdCJG9HsqGXagoCWfZiH0QDCbH%2FbbUFa44XXWXo1jr14kQ7FadYZVP25euebehIPsRf8IqSFjdzOWfKcBdcqViljDygOrNBjqkAVMlqqz7AE5hWX0EvR%2BxTzNq9nUYhS2kvDp7k6PFwytNCQJqfFzojF3Lhvp%2BnbST%2BmnW6sOO04x2gyjyNkggrugHUbSTGPOb2evGDjyhPLU0NDPX%2Fd0D9YWfXvs%2BrJb6%2FExdsAMSzomWTYUMHSq11KDi9TPMhYX2MNEQsaH8tReKPPB%2FCRVRJAwFrabVJpGW2hu4Q5qPFychs5eTDOgbPH7kVjIo&X-Amz-Signature=5ed4497851fd0104b7cbbfa9c012fabfde50f2d69e0e4e288bcc90bd324741cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

