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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46644AN6OWQ%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T011433Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAVtAKb8u8%2BW6JnjQgZP5Qx11%2FsfByoLegArbd7rcDGlAiEA3CLBXv3d6SYU9si5XVLBvsG%2BhU8sdQyObzpYW5PZtrwqiAQIsv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBBiW5T%2FQD2XU1dZ8yrcA21agUymisatbZJg7xPtIs5hMkmlh2PAcUmKd2l3Ls1mCMNhteJArtx4S%2BbZ6OpAUX1mWfYeM3AjnCjFMs9Voo9B3ZvTUeenmqy3KGewVM78guwuWzJS1XJI0bG04EG99%2FskPkoZVriBOjHStgVZIlbIkwChbSI6pkx6zOO%2FksQ7luvgopfbnnj1cKbRiRCLHIhobDVsR629D6EBSpyJscpDReJxdvhnrDJsDi8h%2FjQKu4N49Q2RNwo2pfZHKOM3FkRdvZISI6%2FwKuQrfldF6C8CcpNTDIX1CbfWD0R26WyM3ku5rKuGEKvgxGHhSKWAo4KHbojHsmZtFSF0SnNgPyeWals0PPQxbFtd8B3WSxyZF9Rj8qERmN8fs2BUzCZw2aggjoE%2FsqlvtBqcnd%2FFQLmVDYbU2ejjXOD9Df6yHHT2%2BTP9wGq7RPFTOJd9AMg7d2oxbmtwQnI8DQF2jKKAzY2Rw8nPr%2BEOlJwvhdA9AJVtNpEJlZr%2F7%2FNdeXNgCP4LaAPyo83WHcP2Afn5j95ooiLDT0pXtwaI6c%2F6o31WNOraYVFqGtX3bRgwCJNEQCTigX%2B5hlALAFqD7Wl5NusY%2BSOkXml4dV8h8BGyVFjl5K92UIbizSsMlkLnxeO0MP7tgM8GOqUBtVVUfmz2c515yEzEmMOTsBvGeF5hZBTZ3ePHn0f%2BIdu7PLaSk0xxs2gZyGlmcxS%2BeAoqpicEiwTyFXj9HtArMYTlDbxurba8J278Pa90Rz8hbpYuRfBwGCm3FNbH8A2nM%2BYZ5XzeeFUvRq9bOFlphmHDMCpU5baZWZ1iphTia6XTiP9WKALhKNUTxFYkUWzPcdUlF%2BNmHt69Jj9GAihfdryIV%2B5h&X-Amz-Signature=582678c3e9325570d410f42253e04496cc4cbd8841a433bd549dd9c0350442ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46644AN6OWQ%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T011433Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAVtAKb8u8%2BW6JnjQgZP5Qx11%2FsfByoLegArbd7rcDGlAiEA3CLBXv3d6SYU9si5XVLBvsG%2BhU8sdQyObzpYW5PZtrwqiAQIsv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBBiW5T%2FQD2XU1dZ8yrcA21agUymisatbZJg7xPtIs5hMkmlh2PAcUmKd2l3Ls1mCMNhteJArtx4S%2BbZ6OpAUX1mWfYeM3AjnCjFMs9Voo9B3ZvTUeenmqy3KGewVM78guwuWzJS1XJI0bG04EG99%2FskPkoZVriBOjHStgVZIlbIkwChbSI6pkx6zOO%2FksQ7luvgopfbnnj1cKbRiRCLHIhobDVsR629D6EBSpyJscpDReJxdvhnrDJsDi8h%2FjQKu4N49Q2RNwo2pfZHKOM3FkRdvZISI6%2FwKuQrfldF6C8CcpNTDIX1CbfWD0R26WyM3ku5rKuGEKvgxGHhSKWAo4KHbojHsmZtFSF0SnNgPyeWals0PPQxbFtd8B3WSxyZF9Rj8qERmN8fs2BUzCZw2aggjoE%2FsqlvtBqcnd%2FFQLmVDYbU2ejjXOD9Df6yHHT2%2BTP9wGq7RPFTOJd9AMg7d2oxbmtwQnI8DQF2jKKAzY2Rw8nPr%2BEOlJwvhdA9AJVtNpEJlZr%2F7%2FNdeXNgCP4LaAPyo83WHcP2Afn5j95ooiLDT0pXtwaI6c%2F6o31WNOraYVFqGtX3bRgwCJNEQCTigX%2B5hlALAFqD7Wl5NusY%2BSOkXml4dV8h8BGyVFjl5K92UIbizSsMlkLnxeO0MP7tgM8GOqUBtVVUfmz2c515yEzEmMOTsBvGeF5hZBTZ3ePHn0f%2BIdu7PLaSk0xxs2gZyGlmcxS%2BeAoqpicEiwTyFXj9HtArMYTlDbxurba8J278Pa90Rz8hbpYuRfBwGCm3FNbH8A2nM%2BYZ5XzeeFUvRq9bOFlphmHDMCpU5baZWZ1iphTia6XTiP9WKALhKNUTxFYkUWzPcdUlF%2BNmHt69Jj9GAihfdryIV%2B5h&X-Amz-Signature=582678c3e9325570d410f42253e04496cc4cbd8841a433bd549dd9c0350442ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QQBEJEEF%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T011433Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCu9j0yjAb95Zws1z2BLdNfHHmoFU65DGC0W4JRXJfJsgIhALeTcyNmfz7%2FNMlwUSYqaX2j7Uns2O6LkEL%2BbYbrq%2FLvKogECLL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwM%2FGmAzta93nRkRkIq3AMBhDmAXepSMo%2Bqx%2FShUL7kxbxTplM6c19AKzxDRsqvZQjXXhQyyA%2FmWhf%2FDEPdUQneplTHfxpFIl5MJaqt7j3bgDlZdZGA7oY4G3qEPdIkC4hHhz14yOf%2BiN6XcD9ppH9Z%2BLTUqJbkwqQxdDBe4QqHsKGLUNbtPNiIxa1dgawauDZHLFA22r4SLtFVS6s1j6AAVAB3Y%2Fm%2BJRDSRV9be%2F73sPk3h7WidtHnL6%2F19bAlRCYclUapfqHSuzOAu2rap00yGhdmUtaSHborOlvEGfobWdT7PkdW%2BhdY8mHwyxUW%2BUADqS5gwkaHgPKSd2N4RSxHDxjKxD0kPPR6ukNPrydCJ2gutfK%2BcFX32Evz%2B0GWDiKmK5owf8A49BziP6CUyajr4%2BlXp49YhyrO5ZnwpcMJ%2FCIJ65ci%2F7ZwWGi%2BZ5%2BIyuHpiBzEaIogbHplPwhQiXnDHIWDugLycaLjsATC5o7jSN1qtI2u5%2Bet26R6lTnV%2BQU%2BeCunffwgXD7i4mGxn%2Fh%2BrCs3%2FMV9%2FWDfDaK5mBrcaGdNxXexEhL6HwEy067brsRQ5qg5TpBjHaxXAFn3R%2BPuRCqe5QmPR1%2F4rYLL3RzKXDGn088cEGw2N4jv3bzfsdkQfzkLXJJM1QkvnTC07YDPBjqkAZVWlZ1RSjkzksviwXvY%2FIkIjayxipscP8uyGIUsdqXzP%2Fgliy8hnGuvoUHiE2pyU0UIhj3wNoV%2Bq7aefDpiV7Lrrny7xKlG8P%2FEKDHbUuNwcm9hbkn2ESFj1Dqp655EtE%2FDQrm75SHoPAYzL0KSYVkoCjO9Jqh0NsnxGC1lIa%2Fvu4S15UjNjRsv%2BJ1ayzfnoy4pNjU44miRI7FAiNmgT76Eo%2BX7&X-Amz-Signature=42ed5266897a56df73b0887af4be68e85ef66fb6285b3b819ae03c317e38ef88&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TDS5W3FJ%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T011434Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDmLK32HAjixgzPR%2FHHfRoGM2qCfwmqHVs7cm8tm33P8AiAd9BlZZVeHPvb0hAJrEB7KKfPul02V8vROtzbHEtHmHSqIBAiy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM3D0L93EtkYuyVRgNKtwDVOBiJ0UCt9vDgwo%2BeevAKmxNi0%2Bxf3upOnPzZ2hQYnllxNST9mjn594aMPAEY8vAxcL8IeD3ehg1zebIiFzWRTNmpvCLrasFs9V1jbPWjXmOKT7DlGw5kBKnMn1jCMu8mNPemC1WtiIBjrtB2adQf%2FFqs44hc2mNvD1SSLDQMFIgLj4IdbKeRJQomZFPmwOFJo2WSSZD4vC3AI%2F15RNR7q4y4qtx4cXtTTfGIxQ8cPE%2F0wwEP4yP1bshWHKqzd4hJm%2FefZRiqfjGi6tpEPZVHVv%2B3EnHKeLMr1gDGp%2BFdp2AZKEwLW5L6PeGkD%2FHE7qRaGqYLoLPEZ6vQVi9PRYizXwGYi%2F82M18g5bouvLkIEi0ic%2FV73F3vNc6Gl6aFf4jRgLlOn9SGfcggyT9NeqpDwDLz18GYquKKZhPmZGWUjx7tZDo09QlSGFX3McQRARCaP31CjbkNnHV8BIT%2FcpDTBrk5g1YkgemKIxKpsKTM4X62F5Dlh%2FpEF3y1ZGo0LHNvxusXQzlFyM770Cw4uEGcCIJeA0moiR5UtrCL6ReRc4f1hRWPgj1zdjw049WhVc8TktAMejoxesB1%2BVts0oZhO8tg8nQr5clRKR4MtQlxXvZOMh7atxp0gAlGJEwveyAzwY6pgGvVeJ9bKgnOGucv7JF15vkfeYb7RDitb5jXm4aeIRhcSuvIlXyOHxJQJ9KFYJSJJ0YtlVwtfDReFI3ZrQRQnOjfie0cB0%2FgpJHg6%2BWFFGt4PiYkIQCdhApLOWAzSLhbHdY7TArolAsS6h7t%2FCnnTm8qeMK5Y5ApN08CT2GKoXw9pqT7sKSyFcYfO7b66%2F1RcsTwStmcG1GjGzTHyP34%2F4M7bx8Y%2Fz8&X-Amz-Signature=687a06597b0ae4977aca56cf8cda384c6bcb268fadafe688b9232f065e2527ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TDS5W3FJ%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T011434Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDmLK32HAjixgzPR%2FHHfRoGM2qCfwmqHVs7cm8tm33P8AiAd9BlZZVeHPvb0hAJrEB7KKfPul02V8vROtzbHEtHmHSqIBAiy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM3D0L93EtkYuyVRgNKtwDVOBiJ0UCt9vDgwo%2BeevAKmxNi0%2Bxf3upOnPzZ2hQYnllxNST9mjn594aMPAEY8vAxcL8IeD3ehg1zebIiFzWRTNmpvCLrasFs9V1jbPWjXmOKT7DlGw5kBKnMn1jCMu8mNPemC1WtiIBjrtB2adQf%2FFqs44hc2mNvD1SSLDQMFIgLj4IdbKeRJQomZFPmwOFJo2WSSZD4vC3AI%2F15RNR7q4y4qtx4cXtTTfGIxQ8cPE%2F0wwEP4yP1bshWHKqzd4hJm%2FefZRiqfjGi6tpEPZVHVv%2B3EnHKeLMr1gDGp%2BFdp2AZKEwLW5L6PeGkD%2FHE7qRaGqYLoLPEZ6vQVi9PRYizXwGYi%2F82M18g5bouvLkIEi0ic%2FV73F3vNc6Gl6aFf4jRgLlOn9SGfcggyT9NeqpDwDLz18GYquKKZhPmZGWUjx7tZDo09QlSGFX3McQRARCaP31CjbkNnHV8BIT%2FcpDTBrk5g1YkgemKIxKpsKTM4X62F5Dlh%2FpEF3y1ZGo0LHNvxusXQzlFyM770Cw4uEGcCIJeA0moiR5UtrCL6ReRc4f1hRWPgj1zdjw049WhVc8TktAMejoxesB1%2BVts0oZhO8tg8nQr5clRKR4MtQlxXvZOMh7atxp0gAlGJEwveyAzwY6pgGvVeJ9bKgnOGucv7JF15vkfeYb7RDitb5jXm4aeIRhcSuvIlXyOHxJQJ9KFYJSJJ0YtlVwtfDReFI3ZrQRQnOjfie0cB0%2FgpJHg6%2BWFFGt4PiYkIQCdhApLOWAzSLhbHdY7TArolAsS6h7t%2FCnnTm8qeMK5Y5ApN08CT2GKoXw9pqT7sKSyFcYfO7b66%2F1RcsTwStmcG1GjGzTHyP34%2F4M7bx8Y%2Fz8&X-Amz-Signature=c62db29c13e95386ec4b8297d274d6ca97138967b870666fc80867a139d369c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XL7N6PWY%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T011434Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIA7iVXrS7UVTw8bNifRqhshAVS%2BQQjz6TH%2B%2Bqj3634KbAiAPSrT8zTE8cX8ZnbJ%2FFXQuJtlrolAOxXpHsCut2d2kRyqIBAiy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMgxtu4FIqma%2FMcoc2KtwD0wN60qyZtm9Fbg2NMWf5%2BOI2UW9UAul%2BGZhLfVpinzO5uzOC%2FX1lru7d61Kfl0Q8qltkYfYPGJm8jT%2Bces87SrdBsoiSWIuQzW%2BxcUSNbLfI%2B5Lp5ZJ%2F2f6rkGLlRBukOQvSofpkAQMK%2BhdrekT%2B%2FDQXfdEo9%2FyvP0MHo9zQeojWfsU4Rnm4WxFcaxqkcdl88v6lKtZ2G%2FvmHKbOtnNg10EkYhyb6bSON1fzS96fOLnuMjvgMYPbLHqJo1kiFvaggaPAdjNojZ%2FXOnDJypwgbJ4XfXgeJXxcQDiKqhbd5kHP7JeIiej2MYZjfbPzaCwDx3sFbqjVjbqEAx9O%2BLUGG91Gp4lGZbyvLs%2F3dUTt6I728ksplg%2BV3yNi5OpHdGSCuc0RN%2FP%2BU%2Fs62ehl7IQxAPEc%2B8UYYAzu9D%2Bi39FPHHBGL5EJLx%2BmqdK0jxmqRS4qRCHfxOPPbfSjzBKUYwjCOsZxH%2B5HkSMetoQdM1RIoHl1H6rlLBNZpPwjTC9T5o521Ye3tqYIQx6vAP9nQTiOaxA0x2jqUd5GVsQICpHVMO2Bh2XbQn0Zn9A%2BpPBe5%2FRLRY0KsmLgi0W%2BqIutAYlyNPLLpJaZAv5hQ0b8MIRkdJEJvyjyjaPUbzP6K5Iws%2BuAzwY6pgGDf8RwSyWNnv50GOwjpNJMS%2FrW34H5MA3GQQSWGav86GsBa2yX6Y%2FRfgYsYLf283FLC2LoCWuBG%2FoNYEluYKRPSLQwnHla0L%2BWliA0FSrbAazExYp3B%2BUIg4jJt%2F1sU7fjrL0HrvMbhhmFUcE6OKMrzGvB0p7SuYTjRo7z4IqLg6PIvm35smiNIopNVLB3Nr6zLKA%2FieX0qhWk3oJIazG%2F7zgj%2BQkW&X-Amz-Signature=495d6ed216a039dc81abc99bfcd923b0069a4eb7f2730189a941fab9e43d5319&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665BUE3YMG%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T011435Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCCjzz6%2F4NXUWfAJb%2B3gXc6IcjlkJgRnLE2eYNYjk%2F9twIgKMl7a8S7xYgCm2Z8OEqVVcwzzC52l54vXHhzGGnbutcqiAQIsv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMY3YT%2BaaBGmVouynSrcA63L8JJJ6krMJwei%2FYBOh8lA%2FpdYH83pE3wVSv5IhtQ6pBFEPxWrlRlYOH4a8W8nDyJ1nO%2BhgcA3inBlkfO2GM9w7Dp1tByYVZRmxwMMkwvwBMVnFCl4mWxliKYepAUuaT8eNjIn%2B0C%2BP4EdzCRefMFAsRz0Cf%2F2YvCx2IoJ8Ksi1hH8167sisb7gl%2FSiRrMh%2F4K3focpL3%2FJW2VPatFLRmZHjZEX5Zq69aNmtPPyIOFijSm%2BkCYcoY9IQCAK%2Fa%2BhdX030AZKjAjFXHATa9IfQkmlX3K8NJ48xdRfNum7%2FKeMGBvDsMfmA3ijaICRvhRcR63n76W7GFghwOJmWp%2F3im6GWupaEVXCXCh%2BmO%2Bi5%2FzEWv5NdbXOAgnV%2BTue%2B9iqBbMMjB868l%2FIEByyxzKBHA%2F94u%2FmXJ9GSJDEi2ifmJasm54iWQFhaKV6b648vgL%2F6ZKt5sf8au3W2lo3XZBgmkXj2zGiSC5GnxR7GyXi4%2BParXSbpsMSWm9hPn7ZTEA8VAKJaoSSAdd4xutXN7MuRjlU6P9KwgZdU5bSDjwHkKeUfbKFS%2F%2FWUHpgh4kjTtcuDN5R6mQ4E9s5qMPQu60XjYggtjr%2BKfShQPlbf%2BstRK6dtHaAIFxT0OIsLkNMMzrgM8GOqUBMNeHF6zQ4A1qgbz9aphSAgM0VAiunuOvheD6zw%2F3bxn%2BgIW3UNrnRSCdIhCSqB%2BwXenQq3PeZJ6A2Id0DLLU4ExISUgCGup39Ujjf7H9ZKocCH3YSQbVtvbo62iK4ovsF1DD%2B2cpuipuOv0U2IbtHdEP2MPMYs92cOsm9unkW49gjNiItAecqMZp%2FoD3LFFP8TzUCVAl2wH6Ta7Qkpf0w2pG%2Ffk9&X-Amz-Signature=145421d5f300de447cda35762f6e9ef8d9f672d625ba19886fbf09c8210d4e0f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y2O5I5RR%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T011436Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCmbqJsTQDpxs54gKFYfey35i9thdgbjdbbd62xGpFwsQIhALL86aYeiJzr9WnaVph9Pw8QEkPwFdUqUWt4DmbRKFnEKogECLL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw%2FUYNs11MLsvbrfxgq3ANF3HajwipmgSTHCw7bUA75oeDn6d38WVRRz4SL3ECurRotQKc0q1V2cJ885liUGk6a%2FVCDWz2uNxWNvsGK0hLBiMqhsg6unoI0V1Aml8febS9A1rkE2n8Hlovq%2Fhny8aV625ngmX0OCecLoSss53Eqt5oGmXCeGJYZG%2BkrBzVkwR0BxHxMgsO8ye2tEhzCYP77v61aIIjHAvOz1aja5YVaSSkIbjZaXp2ggQVdKaZQ99BzaPOyt5f5FxpIlujW6WFPScijEhEKGhJxZuvtSGG5R3d8SVLJYL6LC3863VKGNmPde%2FYj4I5wu672tFKR%2Fwk%2Bvu7%2BplrGHVXfIRPsHy7wyTV%2BQjK87I4eLq1MDEbU5I8slWIcGBRXpNM3yEtmlc34i8SJqPo9e9zRrE7cbmjdXYbpHymDwGy4p6fyatRAhA4XZraIEj3vyvKiNwcuDJ5LzoJIExqIt5m8p2kDBvvs725m9QHxMsqyPjNGbZlZq%2BefVdKaAMW4H9C34tBAUDQEjHSWmb7Blp4KSkkF6avJuoVPuPemL90bypEW8xPlhBVgeSRFev3wXi3YPjJnznCljtdVDJxx%2FK3Dx4%2BuiscCS1MIzymzdgMkfdTsbXAeu4mKECOBbPwphkEE8jDv64DPBjqkAbpkjf%2FoN%2BJKw1K%2FQPzsPrgcYt1wcUaRODzai6ZIDrpfvv3chesN9DMX1QuoA1Vr1eBfHyS1NSfqaY3Fnjgi0ZrfgjS%2F%2FDqqXCVlk8gAjjr2DxXS7ybk3wwzQaWduRKNca63Hmc7AKagxOEjrC9vq%2FvEmuDlA77ESYOa8xN7fQAgJ68JJ2ygPQLF%2BwazwYpdVEzNcl2e753eTGd4QB4lwvw5kXFe&X-Amz-Signature=235008ac1f16507d2c863e6fc62573a81114501855bd60fe6ed9eebbd9449c0d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZ3KN5R3%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T011436Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAwtuIGI0bk1Mjo0hb9RXSC3acitjgHefQJmArbUAysaAiEAwYNlKyFy9ELT1zmo6%2BkrTi9iTE%2FmdQ4mRtduBFnMSL0qiAQIsv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAyFbj1EjtnQfl49oyrcA%2BIlCBQ2%2FmfEDgIEUSxMPxovi1bpiFbwkFVspklo0PQ%2BVBLGH8mGOH0%2BXoCCSguzqDSYolTVNQUtOLPHeJzdScaH1aUtAIGbiDcRsUQy3r0MBs93hE1Ex%2BzpIvRPxZUZPlJwZVN9i20AKwdjyR4BCzt2jA%2BK%2Bf%2BjE7UHuBFF%2BhEFhHF1M67iK96Vg%2FtuNJKO50GZ1Z8tEQAViMHIYwpvqdoBW%2BRMWWK0oJjUaRYLgW5amKmkh1DPg05PZQ4S%2FE9zAzbdR8BqRKeiKAJ%2ByeMTA0PO%2BcMRMViHSoo11Q5NYTMERaWwFkdQ%2FT56DeRhn43EQ2NzdCD5UsuCqLbYogHramz%2BjX8MlrbGU%2Fyu2%2BkNdjBSi4oZbdrZKpxYReo7NniBymavvU5v8pDxuOHY%2FkfYvhR%2FqZODBCp6Rnz7BYAVlsHvcK%2BptasiZl7Kx5DZEiyqeB1IghF%2BlRo4KHAYJLT8n2taRwn6vVJZ%2FndwckdgC3oMSbYAxFZNPcoLzsmc6UXirtF2ElOeDr8LRuhkUx7BYUZbRrTR5x8EHsmJfjs%2BbVP%2BfFpGFzW3SM1zUcwmS6j%2FtwWwocR79re%2BqR75CEN238pObkXawxWWrx9rRaq0BbPrQnz97R1HHz0j1hqiMJ%2FtgM8GOqUBGTFwP6lNwMZcK5ZegpY93IdXjVaIwFQaQXmUn46IQf0iHUJxsC7%2FeH5fyKE%2F%2Bpv5nBtpYerK7htbo78jHJtJ2B16Q7UiNXwMIrgLHWK4eDc3Y2Emtz0hpSg07PTF0PUb5GHQ8BfK%2B2sfppPYtT4NRJbmUOEd7wtig9Id1Y%2Bz3oNZ51iofT%2Bd3qYb7CKVo2qHXfzX8TaYF0SVJb7SSLQ5tz%2BQTDuZ&X-Amz-Signature=1aa250e80c522d5be69505e8c321b972383a650f9793f6fe5613496b2bd9801d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZ3KN5R3%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T011436Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAwtuIGI0bk1Mjo0hb9RXSC3acitjgHefQJmArbUAysaAiEAwYNlKyFy9ELT1zmo6%2BkrTi9iTE%2FmdQ4mRtduBFnMSL0qiAQIsv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAyFbj1EjtnQfl49oyrcA%2BIlCBQ2%2FmfEDgIEUSxMPxovi1bpiFbwkFVspklo0PQ%2BVBLGH8mGOH0%2BXoCCSguzqDSYolTVNQUtOLPHeJzdScaH1aUtAIGbiDcRsUQy3r0MBs93hE1Ex%2BzpIvRPxZUZPlJwZVN9i20AKwdjyR4BCzt2jA%2BK%2Bf%2BjE7UHuBFF%2BhEFhHF1M67iK96Vg%2FtuNJKO50GZ1Z8tEQAViMHIYwpvqdoBW%2BRMWWK0oJjUaRYLgW5amKmkh1DPg05PZQ4S%2FE9zAzbdR8BqRKeiKAJ%2ByeMTA0PO%2BcMRMViHSoo11Q5NYTMERaWwFkdQ%2FT56DeRhn43EQ2NzdCD5UsuCqLbYogHramz%2BjX8MlrbGU%2Fyu2%2BkNdjBSi4oZbdrZKpxYReo7NniBymavvU5v8pDxuOHY%2FkfYvhR%2FqZODBCp6Rnz7BYAVlsHvcK%2BptasiZl7Kx5DZEiyqeB1IghF%2BlRo4KHAYJLT8n2taRwn6vVJZ%2FndwckdgC3oMSbYAxFZNPcoLzsmc6UXirtF2ElOeDr8LRuhkUx7BYUZbRrTR5x8EHsmJfjs%2BbVP%2BfFpGFzW3SM1zUcwmS6j%2FtwWwocR79re%2BqR75CEN238pObkXawxWWrx9rRaq0BbPrQnz97R1HHz0j1hqiMJ%2FtgM8GOqUBGTFwP6lNwMZcK5ZegpY93IdXjVaIwFQaQXmUn46IQf0iHUJxsC7%2FeH5fyKE%2F%2Bpv5nBtpYerK7htbo78jHJtJ2B16Q7UiNXwMIrgLHWK4eDc3Y2Emtz0hpSg07PTF0PUb5GHQ8BfK%2B2sfppPYtT4NRJbmUOEd7wtig9Id1Y%2Bz3oNZ51iofT%2Bd3qYb7CKVo2qHXfzX8TaYF0SVJb7SSLQ5tz%2BQTDuZ&X-Amz-Signature=98ae8d7044fc27483968f463bdb714b9ef5de1dff5726b897c9474bd23721ce2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCJ3G2UP%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T011431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC%2B%2B1mqQTcv35Ziv5V%2Fzb5G1%2B6mG%2BxxBs18Gv0%2BcipyvAiA4W8d4Hm82dgPHj1l172v0mrE%2FRcoelPxHrBjc%2FnzmFSqIBAiy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMCfxKi1tDFowT%2FT11KtwDiR%2BKzVFJvWFIc6%2F6NrMvarNVVJsHBoS3rHMzTYX6gbtYBEzWTQQY9jEZmzOoFCmVz7Z90C9R%2FE2TkP2bM3uYI476P2IrCCXrqz9wnBDOAZKN%2FyWbh0guL8hhJ1OYUy%2BxcTyHP47UVLTM7YzCG1C%2Bn8zElTHBIWf9l6p99wspBksyuX3PryJ%2Fw5MfrOfVSTgX1txgLK47gkpeSHW00OpU8ecvCISBuYQdiSRbyBZTmH8uE44Ml6x7azNRQF%2BVW2vsRB1t6SlYuZOUymA3MkrlKXrp8We6HLEHPUkEoeFF1ylS4AGtU3%2Ftrr4u%2FuU0dVe5vsQthTpMzDpH5TPCRN4PEZx4AnaQZQxG2RKL0bYuY87fh0LJQ8oca1y4MbdCw9fKophfgXhL4RF0u93rVnEmT1iFEMraAAF6nDc8zqxtHfrOJfiD35z2IHByytlD6G2%2BKvWzQ3GBTxvjQjteJA3%2BgWqtpaMnDSlnJQdSpxyC2NrrYAd%2FDZfp1wUkDs8R%2ByvQOkCEADe4Nrf99gGc8oVZXvzPqajzY0AiuzLkkuyGbzy4sI2Ewq24Daz30%2Fi7ojecaJ6e5kpTIgaaKmki52bkntO9NJ4na0rMiaeNmXTLDHbvjH0WngUaeU9vrnQwvu2AzwY6pgEOIVep5k6BsNU3qPmxp7RImvTCEmCwtqgemVLp35RODPhsljemEb5mEviZpMrq8fYDlfMhB17UXcvYfXEBTjHH%2FyjHNSLMP9i8%2Bb%2BNLEQUAs8JU2%2BkWm9r%2BNEnTlZL5GXNQ7%2FJq8yed7b8bYJZJ%2FM2FW4MNZ4TrM26p1imsvJT0FEzwiXnUVK78Tz38hVOE4dcjMRM8jB8AoSLeZrsgZkm7tCCD6lc&X-Amz-Signature=cde098b22d3fb441d4f4dc6c500c75e998157efe4c87dd9fa9af71ea2a783334&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SU7CD3HW%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T011440Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCaAsxjTcX7UD3RA2EVoWq%2F9tHyBnYOVLR730unaN%2FIswIhAJ%2BCKIlRbz4BYZBAYyMUWHBTHkBOTZucIiJ2RU1MVYZ3KogECLL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwwnr4NGPYNesD38QQq3AM%2Fvz9c3PrRa%2FM0zHWQZsr2YOhXKstENix5TGQRGQGYq2IP0tyZQpyrN%2BGK62LlahPdgn6poYuKrlJ9VpLZvmC%2B%2FIEkMoakpUz%2FL2a5GaSrGFpu9KxRIrXbsOYKsy8trTuLYVfW57wwrtkULfb9lqkPqKNJ8Dy1AFZwgPuNV%2FY1PqyzCMZpsYT6UMXeX9fK1BWXXWmAKV3VyhBox2OZbPkAAg9eR9mVCofj4%2FGqhc%2BVAy1ci9n7XtrmctS2vUYor%2BnR0OT8m5oVqG9Rk5tzmuP1ZwkcQiMyg379WHABAWQ%2FWS0o9Mt%2BPkvOdRs7DRcNsbtFVwJoA9LuGp2SlIa1d9r24HUCetB5Lh%2BI%2BNK8r6fqsJgc7ydIWzmUxIs6n8EBFRvQ%2FAu7AUD8wyWwbeSaTU97fMAEOJklqLyxKvyLfxXsvDpI2CF17OKjgQ1QMaGQenbkmiDTdC%2F7Q5J8jZgUrcP%2B5PZwvgJikBeyw8aAEYcPYr5%2Fi4KpX2uPtTjGVrPCrJ%2Fxzur572tpN6SvBL8hJymXqpXtdZ8T5%2Fy36fPFeOZdqnM7g1KxJAMFV1r4jvy6YrqLlVujzcWUm%2FAtP0KsXkiCr1%2FvDYLZrHr5vScXrgkHmO6zYN77JyUtVif6HDDa7IDPBjqkAU6F4Fq7mS6MlHB5Y4Ay%2FRtLbfHXSHv%2FbD86carYB%2B87agpyJ6ya%2Biw0GSQZatlBlptlSx6rmCZaXwRNLLA%2BMuDIOKzPftDgl3DWIPK9mItL3%2FO69Z7aCA%2BD4ih81QXa1msJYA83cYUQlpbQ%2FsGWeYSt7mOvDRDQoj8XFn2qfqleZXmQxiNAx9oFiFzpwO3bQW8LIXLxyE6j09OprvxEXtPm1LnT&X-Amz-Signature=14cbc27a1bc72ea31b78e0cea928756759f3076aabb1e1379320c79b8dd82ccc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SU7CD3HW%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T011440Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCaAsxjTcX7UD3RA2EVoWq%2F9tHyBnYOVLR730unaN%2FIswIhAJ%2BCKIlRbz4BYZBAYyMUWHBTHkBOTZucIiJ2RU1MVYZ3KogECLL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwwnr4NGPYNesD38QQq3AM%2Fvz9c3PrRa%2FM0zHWQZsr2YOhXKstENix5TGQRGQGYq2IP0tyZQpyrN%2BGK62LlahPdgn6poYuKrlJ9VpLZvmC%2B%2FIEkMoakpUz%2FL2a5GaSrGFpu9KxRIrXbsOYKsy8trTuLYVfW57wwrtkULfb9lqkPqKNJ8Dy1AFZwgPuNV%2FY1PqyzCMZpsYT6UMXeX9fK1BWXXWmAKV3VyhBox2OZbPkAAg9eR9mVCofj4%2FGqhc%2BVAy1ci9n7XtrmctS2vUYor%2BnR0OT8m5oVqG9Rk5tzmuP1ZwkcQiMyg379WHABAWQ%2FWS0o9Mt%2BPkvOdRs7DRcNsbtFVwJoA9LuGp2SlIa1d9r24HUCetB5Lh%2BI%2BNK8r6fqsJgc7ydIWzmUxIs6n8EBFRvQ%2FAu7AUD8wyWwbeSaTU97fMAEOJklqLyxKvyLfxXsvDpI2CF17OKjgQ1QMaGQenbkmiDTdC%2F7Q5J8jZgUrcP%2B5PZwvgJikBeyw8aAEYcPYr5%2Fi4KpX2uPtTjGVrPCrJ%2Fxzur572tpN6SvBL8hJymXqpXtdZ8T5%2Fy36fPFeOZdqnM7g1KxJAMFV1r4jvy6YrqLlVujzcWUm%2FAtP0KsXkiCr1%2FvDYLZrHr5vScXrgkHmO6zYN77JyUtVif6HDDa7IDPBjqkAU6F4Fq7mS6MlHB5Y4Ay%2FRtLbfHXSHv%2FbD86carYB%2B87agpyJ6ya%2Biw0GSQZatlBlptlSx6rmCZaXwRNLLA%2BMuDIOKzPftDgl3DWIPK9mItL3%2FO69Z7aCA%2BD4ih81QXa1msJYA83cYUQlpbQ%2FsGWeYSt7mOvDRDQoj8XFn2qfqleZXmQxiNAx9oFiFzpwO3bQW8LIXLxyE6j09OprvxEXtPm1LnT&X-Amz-Signature=14cbc27a1bc72ea31b78e0cea928756759f3076aabb1e1379320c79b8dd82ccc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDM7IBZU%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T011440Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC79wTGdX8hxD00e0ZsmmPja6qWjMNKGR4Iq%2FAYaNS1IgIhAOBctRbjJ%2BDB7QFbSnNbwV3QPxyOxfP8N3V0u38godiKKogECLL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw%2FartZ5wKyWM3WcAkq3AM%2FLD6n8ffeoIIwKhHo3tXMqvuc8ISRPxpBifA0QEIdrbllpVy5iwZB7P0czgYGHUw8erg3LStkn7BLN9gF8i2vY1DvNH%2FaruQI0clH8nX37cxUEkBzughbAbH8B9BJP%2BwaLE%2FicYAPwwygfrvztxjbWV0E4%2FavwCdzvxTAVrrP1791150PPS5rGANxSVKLwl6qOX5qR1OFubT2MgkewD4b8W6Ve9spU%2FB4hVQq6MHkbWoPUf%2FATQfXWC3J3aAL6Y6ccmPW%2Bxa3VD18AaemtshgNkKnULbKdmslT%2BqoIC0nyHgb%2FJoIuq5cKYtMAdEX9Cv8wP6N3fmTky3hOzCLnAQxSSFqKrqYQGEbJeB0C5zs3KsT6i%2FX4fPcO14nnTlm%2BqhMJlllz3GucTuLpxNzRGYUQcOYa3SR7Q1IVaHD5qHUFCwUe2qvU34pcHwRZj4OM9zweLGmr09EGwgOS3Wj0IKYSq00dxAhIIyVDPC0NXpkzOFQJpdIlSCFfnzR%2F0MeNLqswhJPy97SW4JRcd%2FAkileSuqyoRPDwHXIb0XvxNMAgUdVZMk%2B5MnBmmBkbpe%2BxQjoIatW2xVanWY9yOCLL4sJB0NTh1IIMFn%2Fo2besa1GIqX9N12JtX%2BHm1KuFTDO7YDPBjqkASOVvxxBEu7cBr25Qcjtd%2BBHtIQjPyDaFtTXfodlAQn9Hg3eGBDBN1jVsDN0xtME530JSbTupNZf%2Bzh6YJ2KZ8szHkhpuQ4omobkgeUMkjYlYNWWIw%2FeTfXq18NKQ2e%2FIhU0pYxU2zLi0%2F9yoqULio%2FbRp2OYC1VbW%2FrZvm39KhjV1JV3OU59HysO%2FGBvyyFQJq78mDfSZ6UMP%2BH9H9nTfXcfc70&X-Amz-Signature=4a03b3f30eee4eb4bb288f99d4c03fbc4fa706f7a2d64e6bc648b7f6f4870d5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

