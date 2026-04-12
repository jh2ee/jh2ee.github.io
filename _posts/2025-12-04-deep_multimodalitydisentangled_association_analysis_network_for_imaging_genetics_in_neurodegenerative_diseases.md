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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNYUXSRV%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T135041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBXrZ%2FjJ4G6kywm7P%2F6xuuo%2BavT3AWmwPItIfsETwQQsAiEAoXxgG2mawygU%2F32iE7TY6oEDI9RMBpQHQu77GFZk9oMq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDE3ygP4UplBPMFIfnSrcAzIC13J1SRch8bQgwG6g0MAxoa0175dXpSFPMNQcwQlhxqkxL1dB2iZV3SltyHAkAcoJp4y0EbPHOhf%2FSpO%2Fd6Emqs9wU6H9NwDDRQZQo1Hdv5WNGouIdCrWrs5rtEBvLA1XMfhHtQmFg%2Bs4NnTQsk6%2BgLBjnCjf%2FylqTU%2BjvsM0N4fNkoFcmueXgjWL0E3W5Vz4I8zzkzVpV0mWHXZr611euGXvSCL6c31hmVOBR06gL2f%2FzqnNgrf%2FdWoG6OAM6TBL04ky69XVP%2Fa5kdKlmSpdV74qZWitACa09uSVl9CornjW6JGm9Nox1YsriZ2c5hBHCQ1ARCTumgi4y8xfAXxucCl6xbPWKUWJPqLa7yqxlc87Rcr5fuA2aSwOt5tzU8KBHE6tqJVD21SGvQ7%2F8u7MR2D8BmdPSh2lt%2FpN9Piq1emxuMRXlxkTcTx7jPkYmQ%2F9Urigon5ZlygbnIaBixoBMRiaHaWDEpQv7hXuobTNlQO%2F6ojCNhlpV%2FCSbgPalWuRlUHEyqnBgyaWabrXL2nq5E9cD60FFj9WAeJWCZpBx8W%2FUrnEs6CpCuRkfZ%2BhT%2FaT%2Fc8SqengdUcwux5Oezg%2BMGd7jcPxND%2Bbq%2FJtQLJWLQbF0WDlbtzj2ATyMOD%2B7c4GOqUBixOx93vLRNAWi3ODSy2r802uVnvqdbVxa7zz3XLqz7mES6db5bKqI3gToEeUIzSv5aMVLqYbcB%2B%2F4odpELmVyxGBVzWS%2FUWF0GYb0iA6FRCrPnxDsq2HxyWgEis8BnQ9D1DtB8JrCu8sARXevZOZXtTJYqo%2BP3A%2BccvbdAO%2BkQXHuK5utuKrGF1jpdZ0gbwel6qflkUdBSj40qVZs%2BlHGfG5sSBz&X-Amz-Signature=38348ab58fe00eead032e91ac7a9161a28a2b4f42700b3a1430c9bb415e58401&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNYUXSRV%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T135041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBXrZ%2FjJ4G6kywm7P%2F6xuuo%2BavT3AWmwPItIfsETwQQsAiEAoXxgG2mawygU%2F32iE7TY6oEDI9RMBpQHQu77GFZk9oMq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDE3ygP4UplBPMFIfnSrcAzIC13J1SRch8bQgwG6g0MAxoa0175dXpSFPMNQcwQlhxqkxL1dB2iZV3SltyHAkAcoJp4y0EbPHOhf%2FSpO%2Fd6Emqs9wU6H9NwDDRQZQo1Hdv5WNGouIdCrWrs5rtEBvLA1XMfhHtQmFg%2Bs4NnTQsk6%2BgLBjnCjf%2FylqTU%2BjvsM0N4fNkoFcmueXgjWL0E3W5Vz4I8zzkzVpV0mWHXZr611euGXvSCL6c31hmVOBR06gL2f%2FzqnNgrf%2FdWoG6OAM6TBL04ky69XVP%2Fa5kdKlmSpdV74qZWitACa09uSVl9CornjW6JGm9Nox1YsriZ2c5hBHCQ1ARCTumgi4y8xfAXxucCl6xbPWKUWJPqLa7yqxlc87Rcr5fuA2aSwOt5tzU8KBHE6tqJVD21SGvQ7%2F8u7MR2D8BmdPSh2lt%2FpN9Piq1emxuMRXlxkTcTx7jPkYmQ%2F9Urigon5ZlygbnIaBixoBMRiaHaWDEpQv7hXuobTNlQO%2F6ojCNhlpV%2FCSbgPalWuRlUHEyqnBgyaWabrXL2nq5E9cD60FFj9WAeJWCZpBx8W%2FUrnEs6CpCuRkfZ%2BhT%2FaT%2Fc8SqengdUcwux5Oezg%2BMGd7jcPxND%2Bbq%2FJtQLJWLQbF0WDlbtzj2ATyMOD%2B7c4GOqUBixOx93vLRNAWi3ODSy2r802uVnvqdbVxa7zz3XLqz7mES6db5bKqI3gToEeUIzSv5aMVLqYbcB%2B%2F4odpELmVyxGBVzWS%2FUWF0GYb0iA6FRCrPnxDsq2HxyWgEis8BnQ9D1DtB8JrCu8sARXevZOZXtTJYqo%2BP3A%2BccvbdAO%2BkQXHuK5utuKrGF1jpdZ0gbwel6qflkUdBSj40qVZs%2BlHGfG5sSBz&X-Amz-Signature=38348ab58fe00eead032e91ac7a9161a28a2b4f42700b3a1430c9bb415e58401&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666CMEDRNF%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T135041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCdejRUzcLs5%2F5K%2BT2vBT85UvqCHgwI1L8vtZqRH%2BZqnQIhAK2VsP1TPrpLnw0yHu8HtUeWRiWX%2FUSy94Cr95B%2B9hF1Kv8DCFwQABoMNjM3NDIzMTgzODA1IgyJdkjDCFSrTrJeYEQq3AOk9s5C8vdjyfFUL5BMwextxCDP3uf%2BtRvL9a%2Bw1EbEO6v2UdvQY%2BS3T1TqEPlFI0wID%2FpXqPMcpgZNpB6%2Fs4Q1J1Ut6INBUBlq%2F6e0XL3GgybMu76WNcSrYcGgrZ0Dh1Vj5fEXsp6r56antNmYNQe72JklDVnWADVxhMM4sys2tpqVBI9hU6WFp3rciMc5lbY9qNaSVguR0e2iU%2FbqTt7I0Gn6awLdDyULbEVGug0zlZOdqIPRfBd4oTFMl7xYQ48u0vX6erFHG%2BfXQ2M%2Ff59YuiDBkvPd6UszeyRUPF8MCzkSiOMSJ5K0btSNO6r59hAHWbsKGcJDVR7goioIDHK8fH97ytjpJJA7KfeyfrzDEQhp5jRBKlKDVgNlVxmk0T0ATNqXaw8PQ3Rwmax2KM4jpflch6UoZWgrnioeYaPtBFEusSBTsT%2BRgPGFuHUkdzPKRKCLzHvhyO57tfG7%2F2aEo58ZKLZOQOpVtA33%2BFdzIG%2Bl0Lf16Y%2BGvH8MulJ%2FScEpV%2FxZpyzlkDnvQFnSBtq%2FtOTa59mpmfao3YK1ByqirMP%2F5DQYl1hMnWl9NQDdatRjUZjHlLUiCJgkc9fFLE6wjKdYFFgfQTrsaNHyeb%2BK7%2FEoTE0lVYGObrGANjDR%2FO3OBjqkAf9EZfilq3vtAJAIYXJQ3pcfcltd6gzd%2BINCZxkATZujFjXUBhjcd%2F%2FmvrgyP4YRhbot9xl5tmmwesNPnJH8m4CM1IK%2BxyLp5oAwmvOL4RkAGSOuhejWDf%2BW1x1WklzLldTPdmIA3zxxcBIazSeywboTsPBx51ksQJHCNNuvqmXajF2hMp%2BtzjhI8IxU43M4e%2FyrxCY%2F9SJFbOzEared%2F5WWgHw%2B&X-Amz-Signature=4e45793be1afee5c3dcb75ffcf306918bc1967a0ef8aeb7a00d9a8e5fa7fe53b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TX5KMQ4Y%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T135043Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC8fVWr694bdyCkcKOY7W6z5roumKhFVo3cmkJiiEDcUAIgYWWEs9nNIs6%2FKIwizkMBDKNvAuk297nzBWFnud0W4HEq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDJ9%2BTL%2BA9Q8pCLwx4CrcAwW3xUAmDjoQRdx9aJiVkYGFNEI3Gwz%2BwyId%2F3zncKjBl9DVrvYoIj02UpjRqeG8ReMXD%2FvWmLlUI2GMe60qhR1P3MzjyJgVorlh9usOnhcKRx5qJignyhB19KRviCZLU0DoCZrimdOhFZhT88TJW9bYDcipknF93eNuZShtTtdTRY4yAcfiyMVM2X%2FNHpWh4iKRWCwt%2FH8wr2YZofpg5teCCs44wRFBmOnFZsqt5%2FjsvMUuxw6YfywJnzmr5%2FAEgXUnFp3dBAEHE9QgXe7yH20UH3HL4Mu3dioiY3wGyPAf%2FpCgqZphoNc%2F6iAWyykJ14WEDEKTMpAB0VA1jSWs88Hzeu8NjgRa2WrQSI5irnn1QOLANh0fIIHl6ryR6oM2aeQmagJ2BS76ua4j9RKYChjaHIQ96hipE73YfUfQ5wr8xO1j25uZmIv8bAYA7g9LFvfG%2FytYmTJa%2B66nhpTq48RN0hDWsbay8z%2Botyl3YlDvRhYiHSqthZFBGU9GsNs6fte9%2FjuWCNBaOkoTi%2Bc9j6Sii%2BKnD5CmKh%2F8qeFHiADY4rs5kRLWWmPgYtET5XiNo7DYMPcj%2BK5zvIZjkBK4zyefvpV0olNRjujUEhZyW92zo5QXuEE4H28RRdWNMNH77c4GOqUBY%2F75IFPYUlJe61%2F%2FZKODQbgCGXQfrJkBqvRPlpkbMq8v04LhsfFAIbVXItzLzf3QoCZiNJPVYaRHzYHkn1FjzqEWjxKUTt3jAB%2BInIx0Mw7tTmDHMV8b311eeyUsJn1WsCoH8vKgj8SDWUaJszwtp%2B%2BQXO81ImIHGXuk%2F4TPNrDrYjm0%2F52mlCYLi6KGB9QKau%2By3tbUC6W6ky135A1%2FmCfIJzTX&X-Amz-Signature=804cc5ae57661298dad27fd8ef7a5e05ed0a29ea90a64594742e932a6e91fbbc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TX5KMQ4Y%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T135043Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC8fVWr694bdyCkcKOY7W6z5roumKhFVo3cmkJiiEDcUAIgYWWEs9nNIs6%2FKIwizkMBDKNvAuk297nzBWFnud0W4HEq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDJ9%2BTL%2BA9Q8pCLwx4CrcAwW3xUAmDjoQRdx9aJiVkYGFNEI3Gwz%2BwyId%2F3zncKjBl9DVrvYoIj02UpjRqeG8ReMXD%2FvWmLlUI2GMe60qhR1P3MzjyJgVorlh9usOnhcKRx5qJignyhB19KRviCZLU0DoCZrimdOhFZhT88TJW9bYDcipknF93eNuZShtTtdTRY4yAcfiyMVM2X%2FNHpWh4iKRWCwt%2FH8wr2YZofpg5teCCs44wRFBmOnFZsqt5%2FjsvMUuxw6YfywJnzmr5%2FAEgXUnFp3dBAEHE9QgXe7yH20UH3HL4Mu3dioiY3wGyPAf%2FpCgqZphoNc%2F6iAWyykJ14WEDEKTMpAB0VA1jSWs88Hzeu8NjgRa2WrQSI5irnn1QOLANh0fIIHl6ryR6oM2aeQmagJ2BS76ua4j9RKYChjaHIQ96hipE73YfUfQ5wr8xO1j25uZmIv8bAYA7g9LFvfG%2FytYmTJa%2B66nhpTq48RN0hDWsbay8z%2Botyl3YlDvRhYiHSqthZFBGU9GsNs6fte9%2FjuWCNBaOkoTi%2Bc9j6Sii%2BKnD5CmKh%2F8qeFHiADY4rs5kRLWWmPgYtET5XiNo7DYMPcj%2BK5zvIZjkBK4zyefvpV0olNRjujUEhZyW92zo5QXuEE4H28RRdWNMNH77c4GOqUBY%2F75IFPYUlJe61%2F%2FZKODQbgCGXQfrJkBqvRPlpkbMq8v04LhsfFAIbVXItzLzf3QoCZiNJPVYaRHzYHkn1FjzqEWjxKUTt3jAB%2BInIx0Mw7tTmDHMV8b311eeyUsJn1WsCoH8vKgj8SDWUaJszwtp%2B%2BQXO81ImIHGXuk%2F4TPNrDrYjm0%2F52mlCYLi6KGB9QKau%2By3tbUC6W6ky135A1%2FmCfIJzTX&X-Amz-Signature=99e99b5deb5483e981a4529509dfae180f4f780e8c66769904231fe73b9c5247&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T3ER2MIV%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T135043Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICI%2Bvm2u7Bfut7Av2lc5so66KKEIYFyJdGemuIohT0lNAiBmshnfExGUJKl3BG4WU%2F3DpR99s6TTWQq4oh52rTwAkSr%2FAwheEAAaDDYzNzQyMzE4MzgwNSIMrUltEz750MXiCCzIKtwD4RL6AunZ9OHyHJl%2B4n5CZeDG15NpXomKkINnXwSFCDOP0%2BquVzExN0I3O4hqRT3MCVoU5bUCEnRsG8H3hZzr8xq2iksWyySVW3l1DmYqlK%2FPr3k2PQ7Z2OCvl7fmp92NXLgJFLxpzxDj9FzLXcUgLhIZIMSBdAL%2Fkp9E%2FmMkGbZNaf7F1hnWzgjmtIpHAYaaKf0pQfwnlAHBTpwyjKi9ujxUePmLlAcvAgjxQ%2ByQ9g9wQ0a4NnoL4pNnwnx%2FhB5CoXzi7e10ib5c%2FOk1nuse6miIy6O5noEf0hE96x1zGqtjNsfrebmyVatgYZnyA9I38tfSM02dbebxm1Udqz%2BVIzUOtdSeXNi5xtPXgsJmkD07UbEL7Eaz2Lflc0wgwCP0I8xHjMVsj%2BNh9E6eJxfl7amaBKakrsD%2BAEzNS2OMkkv4aWqczbGQ5qGbFX5rVsSJXZ3A6NXjm9iTIoI3L39lIkxSxrwU8B9wXyhXtCeJ2ZXZMXqiUQDas4vEgCCjLKT%2FWPDSEKc%2Bf1HINTHNL%2F9mcTB1%2BZjXJ%2BeEy8Hs2eMF%2BvKbQCI5SRQ3nf4czX9Q0OH7FPSd6hQ4zWHkHW4O0lAeNWneYy0F8ZSNJG5leBNm8eogJRjz2me9WAtEygww363uzgY6pgEjsAa%2FLhoDWOQzmTgkSXhOt%2B6HZoLiF3kvBZ2PszkofqJ2O7AJQ%2FCC8d5x3tKt1LBnh32PmicQ39Pw1t7xfwQF5pWo1JdfTIpIPUizge8R0ob1KqRioHazpzXt8vzOkKKgUAdOBPCWUgmctFSBO4rmuyX7tURDzv3TeamSywNFw5JSdNkiYptM%2B8yTqXaeRnzHjtE%2FczC4pyhFAi3dLy0HbqIS6kr6&X-Amz-Signature=3694bcd65fd3449829802e71881d210cd5905cf1e0512aeea0d0f7c8fb997b8c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ZZRJUSD%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T135043Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC2PuZ45HLEBOCPt7LIZg939Mt9XqxM%2BSVVOeN4VmI5qwIgZv%2FaIXH4BJhLa8fCL3B1vkybQXP%2BQmSGXKj5TYtR7pMq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDGEMPQGOGJjICcyvFCrcA92LSLj33%2BvhxvYtQZypl6Kk2gb2Kc1I%2BNa2NhQsmFtU%2Ba7l7JQ8ScFJ6nU5Gf%2BWIcdVkEpv6ZsswpUFm%2Fr3rGi1xmj8qkfLdqGBQ6qsLtivyaE55NckIKXD4%2Bs313rWa9U%2BfsDrvLpHJbQywzForXTQ8SejhZ0zoOCbbUC0PtP4JZII19Io77438iqqo2mRBvAtJkjp2ovrarS0CB4Grdo354%2BMEJYqKjpSxCcQ2uIo5ICpf%2FlhAqWazBSeQtHxxjmjImXSa7TYUoj%2BnuZ9G0e7jeHBMQEIYS1bBEjmZm8V7wy1JNv9AxsWHMt17i5RjVbEZGOouf1QHUdIFC%2FCC%2FUB4OuBGaXeo7Q%2BXT29cU1nI4orF3zLA5FQWqS6smC6mgr28Yi9UptgVarYvbivKs0094LlL8ek6F2pOg9JiUsuEQ%2FBGFgbHouPeCQqOjVs1ZIg7LznpAcS1G1vP6PPxJiEGnp7tt8I64q8Rp5WroE%2FUe36FeSik0BUMkbHQlCuGZBYHpaBOKzmP7lrBDeph4ZIVDuU8uE0gYGcEviiIJwUDLwVJyEKR1jcRwjurwPFoyO3xy3cuB14dHQ354ZxIl91YSzOg5Mt0jvCBWn05cLJMg88d%2Brji%2FBtiN4EMOz87c4GOqUBE9GSLlsIdYeBUUHWZNi9HnIZ1UvT7vISk8E%2Fc4mNkKLIq0zVbEWxMt35KDxy7O1KFy4DkDaLXhiBhs62lFTYMXQKmcH2NAJEVPqsbp%2BH%2BMrZRZKQZ%2Ff9vWhZvN7hKGE5wuRPnXWsy9fwpoSC0EeXWIKphlaoSlnAtQP2kET8o2XBQ9EP27HEi41DcqpdwQiWEAV%2FR%2BgEWWzTZ5kkeWzA0vR4d0GH&X-Amz-Signature=fa1c5dae7733348ba40418210b338a620ac0bf58e6354cb071f621c9b9cfc1a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QPSK7QZN%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T135045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGgubeiEeMI1YJXolawnEHjapTHoe0ycpB5S0lqHa1jdAiBBjwalEYgXjcuCPuwA2sGp6%2FSPuZGtQHjrUflUubf9OCr%2FAwhcEAAaDDYzNzQyMzE4MzgwNSIM%2B1uoxAVSm%2BnuWxN7KtwDzMuuFfjWnv94w3CxH13TKD8MdGg5VCKCjzCnbyPUHkexBjhcgbyDJYLPglph7s67SAMeCObdwwIyIiO7jGxRjsdR6TyXjvRQJWAOLcGGj6bihbWKWfujvlqVB42hX3T06nC6L5XTukEHHnYd1Z0T7BqkNR0QKnBWvotzTrdHW%2FCS1n7fD2g6jB9bA8NIiXoE8QwHXB%2B2TNCCKyhWWfw1pS3PyrsvWPKEmo%2FP5aWn9PicDEfdHmNSbOVs7q%2BfWlmz2XrhCWDIh%2FtK8qtOeybRNkH5AYVcNkLjiUgSJuzzrv5Mj3WlCMvvu7q8ffFRE8LaxJkyzTLoHx9McXXtfq5tRuTh29pC1PxO4yEC%2B%2BmldKT8V%2BuQbiGm6hlMpeYgzkKwEgGyYCKr6M95soL%2BwTgc2%2FR5IrsajDXnhp80yccCdvclMwZJ29Kp3JPGYQY8%2FnNlyEwupMk5woSQRge%2FQhfSRmj0SQsbyTe05d%2FUcGEYfmmymgfQwyBpNMjcoRNKK89IPhJxCZCwl8S2K9tvO%2FWPS36ijK9X38Q69La9tpIS1athSKkyMpmeXu2S%2FuzwIjFORX4LO8VlY7UL1RZKY7wnGei3grzctwRPUYSR%2FLaB9fUwUxJxy%2FLXxUnGHGAw5vftzgY6pgG49R9euu%2F6aTy8HYUf6Ij8S1DOrXqnpmI2XZSAfPcJL2Hfsdil8KK4ivmm67MQWh2pl3nZaLjIcHtmbH25xEo0DshJKiuC3883%2FlKircmeNC1%2B61pkcH%2Bn4OhHjeGrSYht%2F9JLCNoPWXrQ%2BP2f%2BqxMHAFDdRdql5Pnf7qGUax7Lf22i%2FSffwMrfA35CH5yOalHUOJBdwoMBXFsUppNywbCDS%2BPr3gv&X-Amz-Signature=1e2c5ac8a2ae47a3f845a12587c91d73d6528da129c1fac16b55135a6f4d8de1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666GGLJBMN%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T135048Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFLm7LXH2FomgWoFbcV78FVXmjJFg312PpOBel26tBcyAiAHRxavvKtDn1DgkuVR6PhBMQyL%2BapA6FDpApZGkIPKDSr%2FAwhcEAAaDDYzNzQyMzE4MzgwNSIMnoKaEIhXztgPg3fHKtwDdyuVMNVttH3UCdTbhltf%2FwPGzAZV%2FaN6P%2FqwMALZmvr%2BkjAYyBSRZJ2R20iPn0yOENj%2BmJSfe5t6V2I3YfOgHV3k9pXsFS8c5lG2vwZIOenbSFdHCwUwfufXEPLECZTBM%2BkUgSiYzVTDeOgIPxhgZeay%2FNH2Ho4jeXddumOTB40Tkk%2BfdhoMr4Q32W22Y8qudUYBhc%2FbNlZj2E3jfBk30t3XwjQY4RH2TphPJ34ithhDb5rwbPfJ%2BMEyME9eufzRFnMx8TsokkzYyk5b602vlrJpaE7V%2FZNKOeLDJhTWS8YQ17qrzj2nDLLSw0BrmqgNUxDfKT5FOlqn6gTZVaHJizWY7ldL6uNJTGa5SIZOlbDIwIII5vMA34RYN%2Bbxb8%2BxSZDGJD27Kg4cAShlg4jVRzb9G8l7x6ng5b7DuRGI79KLClZRM80gu3RnGr%2BnFgugE1dO6JAVgzPX2mf2lE0F%2B5SajP18HIuO3UsXLZnTvVzD%2FlUXqVxk82Gm2PQ0UijftL4RdqSQIgVC2fZrS5Ap%2Fc0Jsxuj1RrS322Cbvijtar%2FNfzMR9cZtI2Ss8zCa1QBCjeYhStqEGAtlxTaWnQ41dYi7x2YBfVX1VmhsLs7weP%2Fy8dlxdAxxVR0NVUwqfbtzgY6pgGSxfn7n17kQrcJZ2LSaLWJsHlJbZbB0pVUv5jk8NLo484S0Eev05anYG3oB3tZkVgLuY4g7s0uDixkAtmGgJqE5Vow0993W%2Bf3aVqIJFLV9X%2F19yKfJ9CgB%2Bmu69mRJJGBu1nu2bQzer1t3akIQHwXth4KeNDU8%2BvCcoKd%2BudxtcLywbz7M9OogbxgVB%2FZIVu26IARoxsZB7%2FwHCQNSXMEJh5ZuZXm&X-Amz-Signature=ab61538bdedc765efbcad2518fb09750e02e5951b6956dcf9fb8cd49d1ffb332&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666GGLJBMN%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T135048Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFLm7LXH2FomgWoFbcV78FVXmjJFg312PpOBel26tBcyAiAHRxavvKtDn1DgkuVR6PhBMQyL%2BapA6FDpApZGkIPKDSr%2FAwhcEAAaDDYzNzQyMzE4MzgwNSIMnoKaEIhXztgPg3fHKtwDdyuVMNVttH3UCdTbhltf%2FwPGzAZV%2FaN6P%2FqwMALZmvr%2BkjAYyBSRZJ2R20iPn0yOENj%2BmJSfe5t6V2I3YfOgHV3k9pXsFS8c5lG2vwZIOenbSFdHCwUwfufXEPLECZTBM%2BkUgSiYzVTDeOgIPxhgZeay%2FNH2Ho4jeXddumOTB40Tkk%2BfdhoMr4Q32W22Y8qudUYBhc%2FbNlZj2E3jfBk30t3XwjQY4RH2TphPJ34ithhDb5rwbPfJ%2BMEyME9eufzRFnMx8TsokkzYyk5b602vlrJpaE7V%2FZNKOeLDJhTWS8YQ17qrzj2nDLLSw0BrmqgNUxDfKT5FOlqn6gTZVaHJizWY7ldL6uNJTGa5SIZOlbDIwIII5vMA34RYN%2Bbxb8%2BxSZDGJD27Kg4cAShlg4jVRzb9G8l7x6ng5b7DuRGI79KLClZRM80gu3RnGr%2BnFgugE1dO6JAVgzPX2mf2lE0F%2B5SajP18HIuO3UsXLZnTvVzD%2FlUXqVxk82Gm2PQ0UijftL4RdqSQIgVC2fZrS5Ap%2Fc0Jsxuj1RrS322Cbvijtar%2FNfzMR9cZtI2Ss8zCa1QBCjeYhStqEGAtlxTaWnQ41dYi7x2YBfVX1VmhsLs7weP%2Fy8dlxdAxxVR0NVUwqfbtzgY6pgGSxfn7n17kQrcJZ2LSaLWJsHlJbZbB0pVUv5jk8NLo484S0Eev05anYG3oB3tZkVgLuY4g7s0uDixkAtmGgJqE5Vow0993W%2Bf3aVqIJFLV9X%2F19yKfJ9CgB%2Bmu69mRJJGBu1nu2bQzer1t3akIQHwXth4KeNDU8%2BvCcoKd%2BudxtcLywbz7M9OogbxgVB%2FZIVu26IARoxsZB7%2FwHCQNSXMEJh5ZuZXm&X-Amz-Signature=f54c99d9b5ae3090ea4ec6cb750018b9dfd2824fba7bc91117dfb990d06a114e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V3H2QLX2%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T135039Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDvBw6e9Bz5Pnurm0kw2e3No5rxrW0n6vx%2FUvcuQFxp6gIhANrHTlSZimKPVh8bf0cE07S2hRROYagoRlu9TrVKQQyjKv8DCFwQABoMNjM3NDIzMTgzODA1IgxdYgOSZttDS1WSq0sq3AN4cRd5X7vDUlTRjzkYTLy3UZUp5k9VvCZgi14%2B1UOBPB1rO7p8f7DJ2wUGMCzeVLjsBvQxtU%2Bgh3knD4f99fxHpxEYrDMBWShg1cDVoBQAq6J805ktB00Hv9FGUMfkasPn3UBNHcNzZX7VN3GwYYRHMilHNqRK0d4Q0yx5Gmb%2BQLmcQipc04aJ7V4PEt3CihHsGCPpy7Fc614djRvdmCqfMRxaD9rnnjfvLjuRYQV2y%2BKr%2BlCsgFHAJ5Vd2QzenG69VlyHC0HjpXL68rqMFAT%2B9WIWGGDPQO%2FXRRrXH%2BXohSQesgVIeqN49nPWM04wcW0o1phed3LG7PWk%2F7LsnH60TAIflrkpgly9NOezGKM0rmmvU8eWWdD9H81yJHMhHmBJA1I4ri3rLh0sjI5c2o4Gskcr%2BVeBwu5muA6dEO9Xb2k1SSlmIjzHqpW3BpKSBV6q5qJeDvj1DSapUnkt3Vt55UA6%2FE6gl4JtYTGKZM3SWOjf7sSmLlNEQaV0QW6Js8E488puo7YcoCjXx8M%2FpDTcOwMviPcpmoudB9JvPNn%2FkGIRHSpD9CDOuB7hhKXlWyjwm6bx4EFKa4Fny8bb7%2BV2uQF8pjWPDtIkYuU7JS9rc3Q6wxQhD5qFxoKPGTCX9%2B3OBjqkAS3jqk7gUgOGQy3CTbm6X7jwJ%2FK2UaVuB9s3qk%2F1DJZrdMw4qbmyR47QvRiH933lLYKl00xBWZg3ahdB%2BFXyWsjGX13BAOPDLU9ZKaFbRESKOh3I5gqjOKjWrabvZiXJD0Mjc9eY1ijYSb1rz66GTGJe6rqCrf1wMWoDEgPk3PQT5e%2BLVuHN4AxNn5nFx7Y8RRa46sVEz9wouVvisXro3vIRVa8f&X-Amz-Signature=54104c98ea830860edbe993a613d71bb654387ae927f693b4deba4b3f4cdbd4b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q4XM3MUF%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T135051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCro4NfzEA79y%2FUWSHoDU4MQJtGR%2Bm5YO41oxPAp8XqTgIhAP6kBvqCTKokq8VAUQ3m%2B1TBUb%2B7xS49UZWK7p3QtpsWKv8DCFwQABoMNjM3NDIzMTgzODA1IgzZXa0t5uaftCd0RDwq3AMXoA73AF91qc37WMGLULg5OprmhvSqNEOeLRQtzxnrlXxNDZ%2Fe4sUQr%2F4Zvx6dthqr8%2BuaTuL16bxBXpQMlCpa1xfawh8%2BcQG80nr4y%2Bm5JWXIeL7Q8vv6Ma7OlaH3C4ZR%2F4hYfMpOn84YtqUmOsm7VQ5MQWyFeqXIIVw76s9ARnCfmWSD63KzwUe7lWhY2xfqZAnKmT5iTLUF35p76f4isbZof9qCLD174OIfi%2BBDZ8WcOqWjdXvQ9SCpu9Hn%2FlOo27klXPK6bd%2FWq%2BFZbpigZpHUBokrul8aX0f9ofRubyNpNtDfFNGfU9vnDFI9%2BOAaSBpX3ImbyJd4uL8u%2BlHS0dtvoO2yCR5wremcGi8ueNfF%2Bb3M5ZAZVnp9Sk2ADFVXNJhUIZpeHwJqWIlum9A8PV4DLz7cjblLVgyk7LzZGDecZAVFsLJCl03asrnjHHiVdZ8f0jjIBjALXjnmkEVH%2B6pK6g0lV27MPL82eZ8RmRA38R8625MteMuYN6wjVYQJ5IYs4RlReii8okh35dVLXwev6u98K8US1JePuLZMNvEYBXtAXJ%2Fk5A%2FQTmxKuMdjVzNgE7JaQyZjOiaudHpxT7IfJjL13JbUwU1QGCfMHuhrIj%2F9mRsk4Uh5jjCM%2B%2B3OBjqkAWVHKfRvWMioWwpXvKZzlxiNkQzGq9PiN764iSdxEi9MnB7Q456sZw2gV1hquC2gUlC8SCWUVrq633UcCZreMKIaMwdykYMwAr%2B5Vn2J4jn6DqujS2v9ugDZHgXPMOQrIvy6PRszVHZP8SX4slOLF8tXjhMS64OLeXnpm%2FzM4XaIm8H%2BunQnBeOSSgOm1YR0888vR%2FA%2F2%2FZGMwpWO7pKsoKE0xPI&X-Amz-Signature=632c991d9480a53a8f25850fdcb45e7af3130740eaa907b88cfde3b83b083526&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q4XM3MUF%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T135051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCro4NfzEA79y%2FUWSHoDU4MQJtGR%2Bm5YO41oxPAp8XqTgIhAP6kBvqCTKokq8VAUQ3m%2B1TBUb%2B7xS49UZWK7p3QtpsWKv8DCFwQABoMNjM3NDIzMTgzODA1IgzZXa0t5uaftCd0RDwq3AMXoA73AF91qc37WMGLULg5OprmhvSqNEOeLRQtzxnrlXxNDZ%2Fe4sUQr%2F4Zvx6dthqr8%2BuaTuL16bxBXpQMlCpa1xfawh8%2BcQG80nr4y%2Bm5JWXIeL7Q8vv6Ma7OlaH3C4ZR%2F4hYfMpOn84YtqUmOsm7VQ5MQWyFeqXIIVw76s9ARnCfmWSD63KzwUe7lWhY2xfqZAnKmT5iTLUF35p76f4isbZof9qCLD174OIfi%2BBDZ8WcOqWjdXvQ9SCpu9Hn%2FlOo27klXPK6bd%2FWq%2BFZbpigZpHUBokrul8aX0f9ofRubyNpNtDfFNGfU9vnDFI9%2BOAaSBpX3ImbyJd4uL8u%2BlHS0dtvoO2yCR5wremcGi8ueNfF%2Bb3M5ZAZVnp9Sk2ADFVXNJhUIZpeHwJqWIlum9A8PV4DLz7cjblLVgyk7LzZGDecZAVFsLJCl03asrnjHHiVdZ8f0jjIBjALXjnmkEVH%2B6pK6g0lV27MPL82eZ8RmRA38R8625MteMuYN6wjVYQJ5IYs4RlReii8okh35dVLXwev6u98K8US1JePuLZMNvEYBXtAXJ%2Fk5A%2FQTmxKuMdjVzNgE7JaQyZjOiaudHpxT7IfJjL13JbUwU1QGCfMHuhrIj%2F9mRsk4Uh5jjCM%2B%2B3OBjqkAWVHKfRvWMioWwpXvKZzlxiNkQzGq9PiN764iSdxEi9MnB7Q456sZw2gV1hquC2gUlC8SCWUVrq633UcCZreMKIaMwdykYMwAr%2B5Vn2J4jn6DqujS2v9ugDZHgXPMOQrIvy6PRszVHZP8SX4slOLF8tXjhMS64OLeXnpm%2FzM4XaIm8H%2BunQnBeOSSgOm1YR0888vR%2FA%2F2%2FZGMwpWO7pKsoKE0xPI&X-Amz-Signature=632c991d9480a53a8f25850fdcb45e7af3130740eaa907b88cfde3b83b083526&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662HMAOUKC%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T135051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDeFxxePR4rPJRUteGzJ%2FyY%2BXNsCEc5DCMbEToiIrieAAiEA1MEWyGms%2By0YdIUAvfPyz5pvfLwHlPaCk7WUViLraMoq%2FwMIWhAAGgw2Mzc0MjMxODM4MDUiDMSwFbz4w49Sso1eUSrcA9J5hleKmsGKFPS1jaV2g%2BOgBqqckQEvg1j%2BbLnL4IBg6Ijx7U5QIbARjA%2F5zd%2BKw%2FvThjSKpIMYHaAzoUqltoN4i%2Fcw5y4tq2RfQpwKz%2BJTJKnL8jSXms0UhD1M5wY4YIyJ0SifQFtAQ5wV9DUIMQc1PSArnnsrJVHgwdLGe7TTx4kO%2FQh9yCrt2q%2FSaoP%2B35%2BZerbN4A1Acp5QRK8geajb1cr0VCKEHykvl8gJvLOdU6nxB6SG3%2Bd2EcQ1fGv4C3xJMPjkToYMptx%2BQzIyllgIzgOe3gCIOek8jQ1%2Br8YbIxpwuSzu3c7VajwPGP%2BFVy7MWcKat8z7Yjtz9403ajoeJPrhEW772buUQqog%2BkoDq3ppGjikZ2ngEqDCVrNxv4Q1ZfGcXLfp4dFI0eacBXPN4kY23%2FkVfRwdiIfZTPgc0PQzmhmt4Q9zOTyrcwLPUO24iWY8Mf2SkBZabtk8LxNQ2kwPo7FRoGIEnHn0mnbyrFw7xSCWLvlbMncTfDUqaDzaNJPsMUtvc4c6jqD5VaWM30UAqYSr7P54%2BrcWxIqchgEg5SFjVA3qkszyuVPo57blx6857wZ0KHv7AJ2YjwTf1FqSQ2lfp8vlnyR5eJjssAgfzENyHumgnpF7MLbD7c4GOqUBg4jydT4Ti8R0Ju7Poiyuxcmu%2FZfUiYYkSgdX20bgWjqElst2UHDd5HREI%2F98YWKHWo7z1Cs3ImnYGuw8BD0YsbLK%2FtRWnlR9W%2BdX8uOVFVMwGADsHNbGH6%2FVICZ5MK9ml3HGIEoHlD5rpeZeq9rr1opavSeOWOBTMyPYuCjjFeGD5MZNKyyXOZorip7QlQeN9zgUNIm8tqYyEch8OuU7b3SQv27z&X-Amz-Signature=95afc5588777ea6a7a3c7488c1ca41f05772b0ee8e299defd7f9bbdaae968e59&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

