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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RD7BFG6N%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T144337Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQDDzLedpy5h32lCdVpuj2tgXq1WivQDL0QWOzzMpEGZrAIhANm7tpLmu36E9vtAZ%2B6fQ2C3aE8qu40AtSoeBdhQHllfKv8DCB8QABoMNjM3NDIzMTgzODA1Igx0QQnlsWOGwa8d6vYq3AMN%2FUFIJQo5CDFehl5N9ydvQqrksBrp7UNiXGcmqpU6hJJHw6cJWHGzrs7Cz%2Fme%2BeRld1uJg1DaI%2F3CBWeDpBEzWo4cmZ%2BhLTyh4l%2FwNi7%2BIdIv5giunLsjgv8j1BjrmyljILOyGC9am4dFPf8Uf115MliWrNMZu3yHsuf4Jyz5MfimFPB9cIcaUQREgcQ494kX4aU3W57ISxN62hL2ONDyhKjKP3dl4gXNZUH4iFDu0q%2F1lSuJuvINl74nlADJueY%2FMiULsA2e9pFdvs9H0v8p%2B4NTbNTJP%2BKCPeTczgXcttAoqecxg39mC8IRn65S%2BP611o7115Jluh%2BWk3VFD1EBFF53MHY7mftNsjoWAEdemsTxdLYLHoes4V%2FOE1AG%2FAoJgGBfk77vw55JiohLoUlHIHRBQz2y7YBobRJuDOnlRzVx%2FVBf7JcZTfrqzfjh7socZUMd7SUwy9t0PUs6VGhwDGR04t7Iw0CmB8IFwPwu6DNbzyElEhXB90u8ICXpkd4QwxgL28Nwsrko%2Fbk8PzJAmAYxoVBKEiEnlw%2BmrdKiK1jJ5%2B3RZ7HpetcnJmPiVxnEfRWcH2CSffu9IACR0fdGO0%2FHDovgWXfQWy0oeouldd260KVlS9%2FjES4tyDDkgvDNBjqkAXBC3Ao42bkFBhgARS4U9kW9uIdBHdNoOrtITAWLGKQfydArWJC%2F%2BrAdPZwrG2Xdlew9CCOtokFTWQjeahK1nigWE0HTvJe4OafB%2BxttwlZ3LoFC92ZBy3%2BCVWu7b5pGlYKYrPC%2F%2F%2BJKxj%2BIxIjKCHQWoFV5wkt3jdE%2FqASr2fW1me0VZyqfD7Pm4L5c11DRTEQy0I4QgZzb7Hv4Q3g%2F7EJQ6jee&X-Amz-Signature=d751b9efc059576238bda9b519d2742b8af6b820772059b2a84e0fa639948a13&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RD7BFG6N%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T144337Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQDDzLedpy5h32lCdVpuj2tgXq1WivQDL0QWOzzMpEGZrAIhANm7tpLmu36E9vtAZ%2B6fQ2C3aE8qu40AtSoeBdhQHllfKv8DCB8QABoMNjM3NDIzMTgzODA1Igx0QQnlsWOGwa8d6vYq3AMN%2FUFIJQo5CDFehl5N9ydvQqrksBrp7UNiXGcmqpU6hJJHw6cJWHGzrs7Cz%2Fme%2BeRld1uJg1DaI%2F3CBWeDpBEzWo4cmZ%2BhLTyh4l%2FwNi7%2BIdIv5giunLsjgv8j1BjrmyljILOyGC9am4dFPf8Uf115MliWrNMZu3yHsuf4Jyz5MfimFPB9cIcaUQREgcQ494kX4aU3W57ISxN62hL2ONDyhKjKP3dl4gXNZUH4iFDu0q%2F1lSuJuvINl74nlADJueY%2FMiULsA2e9pFdvs9H0v8p%2B4NTbNTJP%2BKCPeTczgXcttAoqecxg39mC8IRn65S%2BP611o7115Jluh%2BWk3VFD1EBFF53MHY7mftNsjoWAEdemsTxdLYLHoes4V%2FOE1AG%2FAoJgGBfk77vw55JiohLoUlHIHRBQz2y7YBobRJuDOnlRzVx%2FVBf7JcZTfrqzfjh7socZUMd7SUwy9t0PUs6VGhwDGR04t7Iw0CmB8IFwPwu6DNbzyElEhXB90u8ICXpkd4QwxgL28Nwsrko%2Fbk8PzJAmAYxoVBKEiEnlw%2BmrdKiK1jJ5%2B3RZ7HpetcnJmPiVxnEfRWcH2CSffu9IACR0fdGO0%2FHDovgWXfQWy0oeouldd260KVlS9%2FjES4tyDDkgvDNBjqkAXBC3Ao42bkFBhgARS4U9kW9uIdBHdNoOrtITAWLGKQfydArWJC%2F%2BrAdPZwrG2Xdlew9CCOtokFTWQjeahK1nigWE0HTvJe4OafB%2BxttwlZ3LoFC92ZBy3%2BCVWu7b5pGlYKYrPC%2F%2F%2BJKxj%2BIxIjKCHQWoFV5wkt3jdE%2FqASr2fW1me0VZyqfD7Pm4L5c11DRTEQy0I4QgZzb7Hv4Q3g%2F7EJQ6jee&X-Amz-Signature=d751b9efc059576238bda9b519d2742b8af6b820772059b2a84e0fa639948a13&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663BNGQYMR%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T144337Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQCSg6krqAB8x%2BhiAsVqLjhhomXbD%2FLB0VNuMD9bqrXe6wIhANo6gCMyqx2VJXo5fFeuFqwwh%2F72JZ6Gsx9PzB2Tbz3xKv8DCB8QABoMNjM3NDIzMTgzODA1IgyFAYMp8Lo2SnUhFHUq3APZZ83GYao4QFuB3y%2F3aZ%2BaZP%2Bq7zC8E0%2FDc3vZAW2K8XkWgKm%2BUU4FxVmL4srCvPXSSmVKQoGNDBbAvCYGfdgkOoJoIgaBVyqU3lK3S2bN8BAh4sHabJjNrTg%2FXq3zh7%2F4rn7zNYzc4vMWvlbIAgiPwv1dLumWZWNsyrnAj2qU33PAqOLJdM%2BxzeLJG6ixz0Gl%2FM6q0a9dhvOFIh75JwRB%2BDLXxTcpNT2wKtJmHCmxlXLzfPsM3Br%2FQcawpSPq09qM%2BrAO36q60tQskMYwFjehA3JWTk4SaZ53CrNXJf40F%2BG8fx5S%2FE8Dmt5nMnADmOXm07oRhktYlzUoyv49T6%2Bp5ZnUJK5j%2FrzHUrUhYR%2FHFRYEVdSxCedJdimjVxWdCXUIhLQnXA1AIcfKPRkb1u%2Bok%2FAKl%2F37fnGWQzxOg3gPUSTQRivS3kvz7x%2FFXrQv22erjelkS7cBPuO4CrmlnASkPtn8itjUqDip4KsLKYc1JonXQvSqeYVgrUMenE7zYSKF4jhOsLkRs6vTwpgD5e%2Fsk9Pm9So32E2zGOtkSW0ZovLQRM0gwTUBjOkQt2M8snfecX8YMYxwbdp1K8esuESNXQspFv%2F1xpbczI2Unq61FXahbV3oMDrcywpbITDLg%2FDNBjqkAVLnbo%2Ba%2FGJFKbY5Ypc1P5LdYTwOa2ULgxbw9foGjUltnSGhiIkH8S8dWKziCEFqgaXtgINNL6sHlFS3L%2BpfnjrTQFPL6YG6SyEKE6TjWW8IQlDfBctj2q0CB0PbBtl5P3CUXm0CdSqv8wR8c8x67PdotKWlftCbh%2FCfB9iZtnJIohRtB3ZudwYHYTgBTzGoUv921rsTOHmDD33e%2FRy4ZxmsE0zM&X-Amz-Signature=78302057c05ad7343beb27f2a390bff5370a4d3d012d17f2c0a135b8afb0f11a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2FIJBQJ%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T144339Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQCE2giCm1I1sFO5Y9Iv%2B%2FPlZCNtEPmZb5apSs7hCb2BzAIgOft2wphug8I0AC7X%2BEcY006LCL%2FXAWpq5%2FKnnBdkpE8q%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDBipRHXVXr0pOC%2B95yrcA2cnSFk3VlCJHwpyn2bKbNGgUMdw1FszdBuR9ffwUlJ4zmTX6nGnj3Haz4mnLHmVrU1BIQ%2Fk9peTBRRP5LIT5ya%2FHKK6e8pDtKBAYtiJ3C2PJ5QMuwqYCb5O1xxTMy8HsPiWRen7UvDOXyJJYVdyuMyCdC9vEgc%2B3FBc03ShdXHkeHrivAahRGS7OTEx3Ogh2nppsJ67nFgVPmdqqNZ17gVb2RNQwRnM5akB0LjILmrzXrKowwb0YwhyyNIHc%2B8ykIL5TkjgcI3IbOJ38FL%2FYm2nnIIoVyB8vWRpl82zOBs6l6un1baQXcNZIXL6y1DjisZ1LK%2FF8WOoSN9jhQqJIgVN9RLb8vNWGz2EPdzv8XCPWQwnn%2FUknkalh96Bhf1FZ9Y6MzleOga%2BENBU5fR5HEvH278%2F9f3ZzoS9c4EnCE3sFgdeZuLC%2FHVjQ2tUaLJadefR7PYSRujweHeoRvj3HPddEEQiI9Xh4stbC40g4t42LTMrQ0BssVdrcgQObVHBXI18FWiQuMSA6rqgiOD2%2BRlsrn57nZkOlrrDAg77Km7VbRDc7nQ9b55W3FRH1tBbxJJ2E7RfugSn%2FxrtZDleQkpT0nc89r0WlKCMv9Fg5shkBhpfxgTuAHzRy3l%2BMLKD8M0GOqUBl78mdc1YDKlQIonbhvHvWH%2FkA4TEPRm7yfGzFPzCtDxHJFOv5%2BWlcURlqxqSyFixpQrpzMvBNm1ki%2F%2FK1DBqNUzE1uXw3l3B%2FFliJC3lRcpYdkJ3YjzJIWBYbDD%2FT7Y%2BBsii3MhjkF0Mbgf%2FrNGyxmARXXldEwXBwF79m9Fn3M2Pl87%2FVOFQGMD4PgmlJKDmLVpwfdtWcfXMR41MZnmsELi0%2F7%2FM&X-Amz-Signature=07bfd0d88a8293583aeb97081461391e44a12c4bef8c5c86db180d64a86f3ddd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2FIJBQJ%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T144339Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQCE2giCm1I1sFO5Y9Iv%2B%2FPlZCNtEPmZb5apSs7hCb2BzAIgOft2wphug8I0AC7X%2BEcY006LCL%2FXAWpq5%2FKnnBdkpE8q%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDBipRHXVXr0pOC%2B95yrcA2cnSFk3VlCJHwpyn2bKbNGgUMdw1FszdBuR9ffwUlJ4zmTX6nGnj3Haz4mnLHmVrU1BIQ%2Fk9peTBRRP5LIT5ya%2FHKK6e8pDtKBAYtiJ3C2PJ5QMuwqYCb5O1xxTMy8HsPiWRen7UvDOXyJJYVdyuMyCdC9vEgc%2B3FBc03ShdXHkeHrivAahRGS7OTEx3Ogh2nppsJ67nFgVPmdqqNZ17gVb2RNQwRnM5akB0LjILmrzXrKowwb0YwhyyNIHc%2B8ykIL5TkjgcI3IbOJ38FL%2FYm2nnIIoVyB8vWRpl82zOBs6l6un1baQXcNZIXL6y1DjisZ1LK%2FF8WOoSN9jhQqJIgVN9RLb8vNWGz2EPdzv8XCPWQwnn%2FUknkalh96Bhf1FZ9Y6MzleOga%2BENBU5fR5HEvH278%2F9f3ZzoS9c4EnCE3sFgdeZuLC%2FHVjQ2tUaLJadefR7PYSRujweHeoRvj3HPddEEQiI9Xh4stbC40g4t42LTMrQ0BssVdrcgQObVHBXI18FWiQuMSA6rqgiOD2%2BRlsrn57nZkOlrrDAg77Km7VbRDc7nQ9b55W3FRH1tBbxJJ2E7RfugSn%2FxrtZDleQkpT0nc89r0WlKCMv9Fg5shkBhpfxgTuAHzRy3l%2BMLKD8M0GOqUBl78mdc1YDKlQIonbhvHvWH%2FkA4TEPRm7yfGzFPzCtDxHJFOv5%2BWlcURlqxqSyFixpQrpzMvBNm1ki%2F%2FK1DBqNUzE1uXw3l3B%2FFliJC3lRcpYdkJ3YjzJIWBYbDD%2FT7Y%2BBsii3MhjkF0Mbgf%2FrNGyxmARXXldEwXBwF79m9Fn3M2Pl87%2FVOFQGMD4PgmlJKDmLVpwfdtWcfXMR41MZnmsELi0%2F7%2FM&X-Amz-Signature=60ba637731736d2d08c9089d823b1176858da29408150287cd2782eea7d1d6ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WMQTLWB5%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T144340Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIGYkAq4D%2FNOVioHAEZ9KrbYUmc1KlVOfyJ7Hbn0VkbjeAiEAlxW8P5BRTZy29IU3bJZxSVI8KVFGhDTrFzV1Jo9VbCYq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDAdjfsXFE94HUSGeryrcAySL1hIc45%2FA6YvBfMJwbtwbUT61bTlRHD9Iequ%2FHcr4J0iIuK4raytDUTZVqWmyYO5aK5swaTAmFV6kUh0dLq%2B6t1b45aAhTjtPTX%2FObTknXbf7KTaUsfxxBbV8FpS2EAn5xZvUHXdr9XgbYBJ%2B0NiqTMAl1Go%2B%2FirLpcPISEN6r5Wp8J3q6T5Z%2FKSKl0aGENCowDrjx2aB%2B2EaGJvq9EmWq%2BdXmOi5WIT5gsmNntYhtaIbIPQ5pcuVz88ObJt4nUP21%2Fr9hxxT63q7YXodsjd8tWS9Ld1wlYbhMcJIDcPTyXFV9wq5j9op9wdMow%2FKOa6WKyLxp9VN1H1nW5Y%2FNBMjFIollgtO8tMGA1E%2BoMp7RdyqJszszbR6iGPO3iy9e3a32jkbXarChKKJFLUuQ2IIR8ky72D8N%2B1pzqctcSw9EIgBhs%2FdmB9lH1CY%2FItPKVuD9c6lsMhCIquVEjzAIEQOMzoFDf9cN0%2F5JLxtnrVcTJ8u22xbBQozmdFlCB4dDgcAFJ%2F07iRyzXVeyHT4%2FZEbUvhfZvMmyEej8HF5JuH3j8KrtDi%2BSaZGE4LQ1kpRbF6pDFAwgbFqiQZrxpvphA5j1mIfhELNheDwuGqFnExgoaBJoMRlfma8Wkg%2FMOyD8M0GOqUBrChfsZeozKE7p7m8f5RP3K%2FRG5H0jJ42lNsSsmtDCsSSOUPp%2BP4h2ngHfQgwy6Kp3IbF%2Fj%2BF9s%2B1Ewl30iodvvA937AqLQCC6KyglBNVS0kRSCu%2FkxBkQsmkiTSO2tGpOpfUK5relE14fdodWXya3LRidiYc1k4Ot5d8K7%2FTzsjAcd8xNrlDJNioCf7Pck%2FiqSrbepHXYr5FxCmW0bFLil5GNQvn&X-Amz-Signature=c32a085740bd7117f24e95340384cace5bddab647793c82786a1140cea78504d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XI7IJD7M%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T144340Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQDi1BuQv3M2%2FLXpDUJm2BjchxdbtwvIDs3%2F0VlOaDBHAgIhAMAucKAnzqsGmY7GJF0t4WQjBLw0fDEXVIfwEpbu8YEyKv8DCB8QABoMNjM3NDIzMTgzODA1IgztasU146mfJ7CpaFsq3AONzgKnb9o2W8Kuaa79dfakRotnab2d%2BYT1KiZjDAImhMKSr3%2BrFt2Vi0xynTsdQsY1JEhzLRJ6RtFA%2BdNMmaZwzA0iVJNLvr9JwVHLAXVUjtJBfl2T8sTCUuLoew2foqqcObMMS5S85fiptML%2Fp0JPjGtC9HOqqM%2B98uEnKLZGQ%2B2BUJEGa%2FHIBBTT8Pejz3fDgAlQZcW2i8jpwIDQH7tIaGUR8GHLN62OmOY26RR3JEOdZ3QgnsJH%2FB5N3OakDI718G%2FIzj%2Bx5v359iAnrtXQKS8cGsKpoMsV5LlsxBiV%2Bn%2FsYIl36Wymjoj7q9j000SluCvf%2BlsoIxsiDQtzzPo1FIKg%2F72V8CX96jyaafZFq%2FAafT8z5UcCXm7JghiDx5Y%2BG9jymEINA91AGBHMtRoeBuiCotDYkQfD9FQid3D%2Bky6vsxRgHb5Uc4g%2F6%2BBFe1fjSPVBCYLlbUBxUKuyJKnFu4HyV%2BX2tufZgVBs8Yd1gOjAO9wqDiyrSFn4J2k7s7EQm8G8QW%2Ftw0kjaHJy9BmSt5dgBDkEy9Cgww5Osa8gDVtCgwoLd%2FW3%2Fu2P4jkIw%2F6Us4kBcZ8lKE%2BG8JmxUlHdXXMTgBqF%2FiqH1pSCzvgZ%2BlIrxFh28ZIKWbEYLjCmg%2FDNBjqkAe1bAltUqKcYxv659zCMqm7IvdRGhcq%2BUQB3pZNuzW4JXsjLbWJ%2B50V%2BgmsaHtvUEk248XULXe8FBM1cy81J%2BvFcEvvVc3szgRUq%2F4ZfS013rRfIEvd82BsaqlLhTRHhZyJPs7uTr1P1pYBv%2BfyQ30dZYWuMwstb7jMeXISUtQRhk%2F9rFoE3LVRuqUN2xaSH2oD6dXbtzLQhWGeyPIpm3nUA4GuX&X-Amz-Signature=b616ecc5bfaaf66ae2fbc4c2b5d85f21d0e5cfca79f4c0a931853bbfcb5ac599&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663W5EGWPE%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T144342Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCIAlkdqMacyek5d3mYIw%2B1S2dY1Q4%2F%2FP8ErowYuwXDnnGAiAforaKFiwDPrnrtHWjBX2XDI4Mn1rigtJXGvIMnfj0lir%2FAwgfEAAaDDYzNzQyMzE4MzgwNSIMB3VB7IVjGJpkASpTKtwD5SDjPkgepSovj%2Bu0zs7%2FQg%2BwQb9WFc6W%2B8s2bSyAx8SGO2LLYJhHUE2XyRDeY%2Byo74ZBxVjeHnbB16d5WNCjfStSfe5MbImH7xdW53lyG3LePcax3tXrmPv1cFdfsYog9jfkmfeTw3s1rJqnV1nZInpdcWxPDogAwc35eHRyfUmjH2fxL1OKtifJImGMkC0MUFYurBMfP57Zz5AMT2HMVJsbnByDZ4KjNlQyqSf7EGGYK3ZFveGfUWesH5hI%2FHER9%2FxNVp5TsBEidS3DOaR882jldgstWkOuhwheG6UjPQOqesGdoXIgwM9XZwtUi9zeu77OtVNFnvwf7DIkc3eCDRvrHkBr2B5VAi95CRezAEbcjwMkNV5ThBC6yxiTxdnR5BXG1zwvU%2FjAZDmaXMvwyoor2kuDaPutlcc1k6gmlQKqS6QuEiZFf1cLatYACNv34JPAY4yqwvXXiKhUsM%2Bvxgng5HzlD34xFKhN6q9ho%2B%2FFV1BULHmCbGIGAlWOIQU9j3B8oJcdGc1PYM38N%2B0rlrnPHd4eavs6zdq%2BFzC78B6lSjfRGyFVHaJVy%2BpP1xvACz89LwK8%2FQULuwfxx8RS%2F3RR%2BC%2FbzW259dhDMP1Wx5PM9jihWbaf0QCzl2UwxIPwzQY6pgEYk2kk%2BVUIkfjJfh%2B8KjegQms5tShD7tzNKA8oa1LSssNHDTM5IoL3%2BbCib5mSoiIghSWsII2%2BsJ%2FIoqRoG6RUE5CeO0t5xicMoWIqbQ539rmX%2B17gv%2BVnRA0mjIcNKTtGJ7LWoKRUFsqFpSnC9OjM%2BRf3dep2T4sgiSX%2BHKm5%2Bt58Ee15ZkqWhp56AtKHqwR26ZF8dzyxV9wUcqUVLntlxhy4nlaX&X-Amz-Signature=cd41521bedc21d3bf316ccf548410f82463c3ded983c57ff636aac7351d3cec2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WMY2RTBD%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T144343Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQDvjJpMVydfjoRkXm1J22dIGYg9SmSAFl7NbfKq20RD4wIhALhn2hNRcpXE0LuAazmB%2F%2B%2FuE0P1TiSikOGWeDrI01qHKv8DCB8QABoMNjM3NDIzMTgzODA1IgzROHbgm51VaVgQfxgq3APxue1nBSUMlBPTxiTxUE9vubkRHgzqTSE5g5nn%2F97TfdpibYyQf6PiVxdaTiod32pMMYCZ2W44coCMeoh0wmGbNYIw%2B4ladL0CKOxKhKUrIpX1d7UlGQ3IImOJMpF1GnbTsGRwnEVNRlpjcNb7h6l7oouNaaDUj3QKWLn7JVeuDFG2PA8eTlHc7rKUNIO5lZwPZys2pCfy9IJYbKxCVmyH4SxounrFgFhgb8raeywNoNOADNDt1Buea634EYooW4wdAxayMNXCfQsy%2BLtNWQbzCDMxzoBV82BTiCQSwbcqW8RY4rm4y%2BPURvWJA1oWQIq83%2BjaXtvT9tp9qsNV2chEpPepLe7Ar48wXnNCFqu653fY%2BjX0kH6W%2FvIRHXg%2BO58NQurZq3p1X75zsVnKlHyhkUCTflrSLLHMb3lfXQswM0bDwnDWD8Xvzu2yL86mO6ElXqmWjoj2bZ21mIOK8%2BICO5hi2j9VYo%2BvhZQ8M45PnZG0xtZzsA%2FpsYhiY5Vh5wG1EEOhJOx5%2B%2BjWpR6iEokdczP88qo5Wi1tiWEzNnMs73qvdAWTf%2FYBxjwobKsK6kO%2BBaO8X0GdIIqHUrycfQwRBFXT8aGXWKeoYAwU3OCdsn85m6JDH9o%2BliN3JDD3gvDNBjqkAdNQfF7hlmMZ0qDkG8on5WaUZ6%2BEEsoWA%2FMzfjXdkOzIhnD4I9sXJnHZf15NZzJXnZUT5crkdQgnliS%2BNdWGRpeXpDzfqBWsXhniJYbqpf8Fnv%2FGDoKroVEnTuUZiP1cZkoepldR73onWfhxCg7XVO6RxvuiGvPxFsTCYB4mvQpiz9%2FhKsjfQUEHFCy9wpkj8qQ1TyAqDZRShTHe%2BJjEwcs5WWHu&X-Amz-Signature=bd40efeb4216e569e424b53eb9fcb8257c73d39388de851c883992420b5f50c6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WMY2RTBD%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T144343Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQDvjJpMVydfjoRkXm1J22dIGYg9SmSAFl7NbfKq20RD4wIhALhn2hNRcpXE0LuAazmB%2F%2B%2FuE0P1TiSikOGWeDrI01qHKv8DCB8QABoMNjM3NDIzMTgzODA1IgzROHbgm51VaVgQfxgq3APxue1nBSUMlBPTxiTxUE9vubkRHgzqTSE5g5nn%2F97TfdpibYyQf6PiVxdaTiod32pMMYCZ2W44coCMeoh0wmGbNYIw%2B4ladL0CKOxKhKUrIpX1d7UlGQ3IImOJMpF1GnbTsGRwnEVNRlpjcNb7h6l7oouNaaDUj3QKWLn7JVeuDFG2PA8eTlHc7rKUNIO5lZwPZys2pCfy9IJYbKxCVmyH4SxounrFgFhgb8raeywNoNOADNDt1Buea634EYooW4wdAxayMNXCfQsy%2BLtNWQbzCDMxzoBV82BTiCQSwbcqW8RY4rm4y%2BPURvWJA1oWQIq83%2BjaXtvT9tp9qsNV2chEpPepLe7Ar48wXnNCFqu653fY%2BjX0kH6W%2FvIRHXg%2BO58NQurZq3p1X75zsVnKlHyhkUCTflrSLLHMb3lfXQswM0bDwnDWD8Xvzu2yL86mO6ElXqmWjoj2bZ21mIOK8%2BICO5hi2j9VYo%2BvhZQ8M45PnZG0xtZzsA%2FpsYhiY5Vh5wG1EEOhJOx5%2B%2BjWpR6iEokdczP88qo5Wi1tiWEzNnMs73qvdAWTf%2FYBxjwobKsK6kO%2BBaO8X0GdIIqHUrycfQwRBFXT8aGXWKeoYAwU3OCdsn85m6JDH9o%2BliN3JDD3gvDNBjqkAdNQfF7hlmMZ0qDkG8on5WaUZ6%2BEEsoWA%2FMzfjXdkOzIhnD4I9sXJnHZf15NZzJXnZUT5crkdQgnliS%2BNdWGRpeXpDzfqBWsXhniJYbqpf8Fnv%2FGDoKroVEnTuUZiP1cZkoepldR73onWfhxCg7XVO6RxvuiGvPxFsTCYB4mvQpiz9%2FhKsjfQUEHFCy9wpkj8qQ1TyAqDZRShTHe%2BJjEwcs5WWHu&X-Amz-Signature=e9a49dd5aba48a79d2feb55a02deee5784af0268a7d425cb1dfb569c6d9a3e8e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHEEFWYI%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T144335Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIQC2IZ71uyA%2B1idpogFk2yUf%2BPZGdvTgLqsxOqg28SBQ0AIgYXjAxyzbGcltb6oKNNqDBdPLKudssKLSYXjBUob6StQq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDB6grAmiq0rimBQFoyrcA4sx0Zz4eGtFP3w%2FM3dyMH1fIkrNWPngJH1Hg6ADtao6B40V5hfxi9Yd6O6fXq7U9ILcIkPCgc0KWfXpNNLRRLzPLh9Pa83MiDP8tzBw5%2Bb2xY3cYG7ChyjL3XCNbiLmpI6LQh8QMfADgXNw3%2F8OhWV7kywwZZ2glL5BpOVF9o5o2lg0yF9nVF4mbmJhJiyAYgY1LC9CoMZdY6zYrv%2BCQ86H9O7AFcbSjgbAtKyQFn09XSVMlE88echgQp13mvq%2FGlibDd%2B7ZRSG3aa3E8NqcryfNXPiyh6DlVZZuzLT%2BJhBRUfRWbKcNRGGBrF2qp1Zr4dzqqhHTxLB9z4exgHxo0IxUfPzcTRJZyJXjl65LW1EE8T5UtRNNL6GqukDOhf2hEZ0wzsEYsBVfbCJa2Pa%2B5xb8M7FC%2B1BZCbx%2FKgy27AV4y2vtKhphw%2BSz7xmSY5fO%2FbBPLcJNQIN0aIBz48dvZfzZp2L7zHoEffMgy1nDVLTxwvtVU3Ql7uNr6KVCVVqOvRGSQvCigHj6mmkNakfSn4ryDCSEJ0f7h760mR%2F0XVzmUdHmtzsyx85kx6ZNDuzVuT91JK6QmqYJkzX1G8SaU5L%2BYApQelPnKmmhO8LNaTpqv8hEqMt6AVBNQNfMLuO8M0GOqUBp5Vimez96TR4izWK%2FZKlwNLfug8FRVKfLHMb1Z3pgk2oQlHVcnzwpL2o%2FctZwZhKK068LUN8pejfcqmwyL5OGyzcFRcXRluQFXRuhjbMz%2FxdZrIHPge9g2FjdTXG7r9r%2Fk3LJ3vCly8E3zvEugyKX46A69hdW6o4v9RGYyLFVLdYfZMSfi4bQMvMPX8RBneuYyHxORbHnzuRzqtwhcurqknmiBXm&X-Amz-Signature=c06e9a7973f7694f6400bda97c7ba230512b604abdf232992813d1c8d95a2072&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XTS3PXO4%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T144345Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQCawH6HPRX8pNm%2BigDVY3SX0i3awvRCfxVnYnUnjD6s0AIhANr5dheUHrnUOTmggYjchcV37lz%2FtAccZ5ReESMabA8aKv8DCB8QABoMNjM3NDIzMTgzODA1IgyiRF9gV64X8fpkUuQq3AN%2FtvAE7ycELu99fIBfBqejQNw63ESrqO8ehMvc5GmPD%2F1AhBhDoi2lrWY8%2FbFwhrsBaO6KYfVeKpcT9TjH2hiu5xET%2FcsJK0RkAfvECQDgdmRrE8rTuxC7ntst3jaYzC%2BemX2VQoI18sfmj43%2BtWRwv83Ul8dZpvkFNMv3lRQZOMxHEIT9pwgfTZR3UlsjDKTH1cYUvzOGe17%2BCIFipRLC6%2FsvB06hIAv4IKCJMDSrtAp3fmoImSf%2BvXGWR69IrPWaLXYkHOjcthNhGSdX4IXdgFxnMxb7Zqp%2BAcTepJvxaId0PvZCUsNe7OQ6VBgkyitmR71IemoiGUT7UzevZsV7PcP9gFLy2ssMty7c9oG7cQJtW0bC1ZnRh80nw%2F0yg%2FdX3Tj%2BhYSPpfCGcUxiDw0saTTU1VTGR6tabzc30AWlOlMsho%2F4J4K%2Fswl%2F7RaZ292ssoaRvzMqPILWhL6vB%2BoYB51nB73PfMfDjiyKJhBp3MeEYtO8iSrHc77827AvS3E1yo437VCbuHgKAfYgudnmTFUIXKHGM35AWtbeGP%2BBSNga2MQQ3wccMBKihAuF%2B6QiSziPW%2Fq5iPL6L%2B0rAqA6v7MSUyO1PgjhynBqh8sHykMM1%2BwEVE3Y9CP2WjCng%2FDNBjqkAULHmc4OhaR%2BjNdsDWZ87S9gKWWRIBVHPy4P266X0FhdybHTXFKFSmoRLGdl2Zx9J4%2FeeWo42NLxw%2FGupKj7VtzkcQ4H2%2F6Pb0CndLB%2FOgJZcHMjzeF3xxCM%2BfZE1Qc9gYYCKiYHMyw%2BKuGZmfK2RMEsx8r5Yvln0URCwdCBgLLttyrEqdw4oFcJyxd5Yor8zFiGyDorUE8yscolVVgRG3NwsbZL&X-Amz-Signature=60a88695ce668c9b00c94a0f8fde45ae80cd7d12db7e33219bbfa1451e720d0e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XTS3PXO4%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T144345Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQCawH6HPRX8pNm%2BigDVY3SX0i3awvRCfxVnYnUnjD6s0AIhANr5dheUHrnUOTmggYjchcV37lz%2FtAccZ5ReESMabA8aKv8DCB8QABoMNjM3NDIzMTgzODA1IgyiRF9gV64X8fpkUuQq3AN%2FtvAE7ycELu99fIBfBqejQNw63ESrqO8ehMvc5GmPD%2F1AhBhDoi2lrWY8%2FbFwhrsBaO6KYfVeKpcT9TjH2hiu5xET%2FcsJK0RkAfvECQDgdmRrE8rTuxC7ntst3jaYzC%2BemX2VQoI18sfmj43%2BtWRwv83Ul8dZpvkFNMv3lRQZOMxHEIT9pwgfTZR3UlsjDKTH1cYUvzOGe17%2BCIFipRLC6%2FsvB06hIAv4IKCJMDSrtAp3fmoImSf%2BvXGWR69IrPWaLXYkHOjcthNhGSdX4IXdgFxnMxb7Zqp%2BAcTepJvxaId0PvZCUsNe7OQ6VBgkyitmR71IemoiGUT7UzevZsV7PcP9gFLy2ssMty7c9oG7cQJtW0bC1ZnRh80nw%2F0yg%2FdX3Tj%2BhYSPpfCGcUxiDw0saTTU1VTGR6tabzc30AWlOlMsho%2F4J4K%2Fswl%2F7RaZ292ssoaRvzMqPILWhL6vB%2BoYB51nB73PfMfDjiyKJhBp3MeEYtO8iSrHc77827AvS3E1yo437VCbuHgKAfYgudnmTFUIXKHGM35AWtbeGP%2BBSNga2MQQ3wccMBKihAuF%2B6QiSziPW%2Fq5iPL6L%2B0rAqA6v7MSUyO1PgjhynBqh8sHykMM1%2BwEVE3Y9CP2WjCng%2FDNBjqkAULHmc4OhaR%2BjNdsDWZ87S9gKWWRIBVHPy4P266X0FhdybHTXFKFSmoRLGdl2Zx9J4%2FeeWo42NLxw%2FGupKj7VtzkcQ4H2%2F6Pb0CndLB%2FOgJZcHMjzeF3xxCM%2BfZE1Qc9gYYCKiYHMyw%2BKuGZmfK2RMEsx8r5Yvln0URCwdCBgLLttyrEqdw4oFcJyxd5Yor8zFiGyDorUE8yscolVVgRG3NwsbZL&X-Amz-Signature=60a88695ce668c9b00c94a0f8fde45ae80cd7d12db7e33219bbfa1451e720d0e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VW33R526%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T144345Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIGQMabA4kp5Gwn4lZ2qgbrYqmOFWVKZj9BhjlCO1JFmZAiEA0hXN7ySVLJWTK7rme4pbiqplS0L9k%2FdkUUCGZ31aS3cq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDKy7vPQ3cunk4%2FWEayrcA8zfRPQygCNu3U40FUTmLYOZHABZQzxx8YD1Ek47KYz00o7Tfrx7151Ph8BW5PXKbMG279CGeBmV4J10up6Fm3qsUnJ6fikpw%2FL2QWuF29vR6nKu1RCjFB6XwRSHDRDIRtMalTOaCCsCW%2Fv7WLVukpafF%2FeotFqwwGqun22aQpyr%2Fbw0BNLVOO3jawsMQmLRYU4PbP7mghfmdChqqtPUTUnVBSarkL6EhUxS3qhRjcESfkjC3KCG4zX23KhZhGhnFrA8aPY25z%2Feal09l3aExpZ%2FKQFeZbcr7E%2FaD8zfMtq0EtCalcTGXfvuhcL7Z80YZPrpmz4IynYp29gvRC3jUPil50AkhG6xbdTNhhxwb3ONb9yXjjIHqh0728Cob5S1plosN1bxRqw0BojrXLso9z4eb9f8MAwdsKqxllb2bay22hVg4MakvKHRPDIZRcPvF92IvpG2n9idF0%2BBCC5mRHeHdb9XUMijmcy69M79pMkhBq8tr3AJPlOmjRBkyFh3N0kROxPHp%2B1dqYEzCdsjv1DlyOdEZts4%2FTH%2F%2FZgf0oWAPVAizjV%2FCwI8RX3jETYriaCLvMaH53ZymJNorNc0wMBZ6%2BDE9IstwbUrqvK5mxfq2Puf6n20WdSq9aTPMOuC8M0GOqUB5XU2G4Pf731oaLSI1JNVtG7to2idNUxSLsEAH4A5u6Vsh%2FhFJ4PDNmZKqf2nB9swKz4vpPG1VL2McWVsYZi5cLjqwxw8bdRopdoWV1SJ1M8lEYwNfBjjiroQ4IClGFlgrpKwfMktIHRBGoZyvGJqlbmrAbadJsZ6tjDvaE4wQ4Ps9hk9j1ltz0K%2Fh2BV%2FdK7VMhshVcPvqgZ2V4QBv1nD5fB4LIy&X-Amz-Signature=4e7898b6a5704192a1eb055db3e4d7603c9bd52d16e54f32e53b15a6485f118c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

