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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X4ZVVG2J%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T221614Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD6pRvlIu0qbGzwNQe4GKTUacsScsCJibaMJYeFWFVvUQIgHLDUKa3Nt3VYd%2FgK4DSIGwt%2Fi1hDQp5n1kK2ywquFv0qiAQIlf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGCGc9Qt22RuiTuolyrcA8BF%2FcLDGffyBtnzknHLy8iho7wc5bbCR9c8Bs2GQ8L%2F8z6f3wWOrK1MS%2BQL0nLyzn%2FMUe5OGMLaATHjBpw0MvO9nkOfwcuMYbHWu0D7q84fDerlG8N1hD7fi4QpzVH6fJe06zJCiAyBor55YAwdyxRv9H8gWyCMN0xyzPwJ4qMV%2Bs58u10EuZYkyGeo2KNMnWdLQbhtM1Gf5j9J%2F1c7vvfooyfXKqKgFoWcyGIMbPTosmGM4bfVtwxHh%2Bnr71Gruzyn0ZYFckv82HRBmrCAzvkNRFaAwUp3KZgrtRpcEQstJ0Yn0fD7OX1NJLluwKymlZqAqizAHzfyEQMlRYMAqw3Pjyv4YTP%2BIrHMbTrEJREa4e1Fw6gVi%2FYCX1Gon%2FWklLqv9e5nIZYUUdrU436W%2Bt3DrJB7GhCFIDaCYI6Y9GOB3XrPyii2RVkVDi50LpmoMSVCfK%2FUnUNJqjCGgjq7Zz%2FKezpInxSsC90t5lMEdwedT3W57Q7lY4WQSRor7CQ5NFxG2v9Pubyvg%2BWMNyLDi5ToHkBJe7FitXrZwKl7qKdScY15oBD%2B6y%2F2nI8yxYfhPist6QFrQ6CkCkHTR%2FKCNU90XqaN3PaBVK%2B%2BLnrFMVa0pYjLMSgDau421q1yMKbj0c0GOqUB1ycGOl4M0CqGZFcNf4sxspyM%2Fx6rctWf4k%2B5TGRXOxrScexyrO7uo5i%2Fxk2yWV9vLEEZcpzVQKvVeAolDwuHThYB91iAOgbOTJE6vU%2FET%2Ff%2Bh%2FdQMlmeFc%2FLHdRGomHvCVqsgqfYUxtI6j4hDm4U0m5PX70y0aoWUMdnbKbG7J7%2FVXj4P%2FfFKGCRhdbFqjWgX1QsSjmGxaPkN4zq40Sv2WUT8Lb4&X-Amz-Signature=53bb8d52f95e2051946380ddc4eeac6f934e99d3d245e98de981c56fc3ab0d67&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X4ZVVG2J%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T221614Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD6pRvlIu0qbGzwNQe4GKTUacsScsCJibaMJYeFWFVvUQIgHLDUKa3Nt3VYd%2FgK4DSIGwt%2Fi1hDQp5n1kK2ywquFv0qiAQIlf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGCGc9Qt22RuiTuolyrcA8BF%2FcLDGffyBtnzknHLy8iho7wc5bbCR9c8Bs2GQ8L%2F8z6f3wWOrK1MS%2BQL0nLyzn%2FMUe5OGMLaATHjBpw0MvO9nkOfwcuMYbHWu0D7q84fDerlG8N1hD7fi4QpzVH6fJe06zJCiAyBor55YAwdyxRv9H8gWyCMN0xyzPwJ4qMV%2Bs58u10EuZYkyGeo2KNMnWdLQbhtM1Gf5j9J%2F1c7vvfooyfXKqKgFoWcyGIMbPTosmGM4bfVtwxHh%2Bnr71Gruzyn0ZYFckv82HRBmrCAzvkNRFaAwUp3KZgrtRpcEQstJ0Yn0fD7OX1NJLluwKymlZqAqizAHzfyEQMlRYMAqw3Pjyv4YTP%2BIrHMbTrEJREa4e1Fw6gVi%2FYCX1Gon%2FWklLqv9e5nIZYUUdrU436W%2Bt3DrJB7GhCFIDaCYI6Y9GOB3XrPyii2RVkVDi50LpmoMSVCfK%2FUnUNJqjCGgjq7Zz%2FKezpInxSsC90t5lMEdwedT3W57Q7lY4WQSRor7CQ5NFxG2v9Pubyvg%2BWMNyLDi5ToHkBJe7FitXrZwKl7qKdScY15oBD%2B6y%2F2nI8yxYfhPist6QFrQ6CkCkHTR%2FKCNU90XqaN3PaBVK%2B%2BLnrFMVa0pYjLMSgDau421q1yMKbj0c0GOqUB1ycGOl4M0CqGZFcNf4sxspyM%2Fx6rctWf4k%2B5TGRXOxrScexyrO7uo5i%2Fxk2yWV9vLEEZcpzVQKvVeAolDwuHThYB91iAOgbOTJE6vU%2FET%2Ff%2Bh%2FdQMlmeFc%2FLHdRGomHvCVqsgqfYUxtI6j4hDm4U0m5PX70y0aoWUMdnbKbG7J7%2FVXj4P%2FfFKGCRhdbFqjWgX1QsSjmGxaPkN4zq40Sv2WUT8Lb4&X-Amz-Signature=53bb8d52f95e2051946380ddc4eeac6f934e99d3d245e98de981c56fc3ab0d67&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YRGHZGPZ%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T221615Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJFMEMCH035TH6hmf%2BiMPrO3B3R5nHdbFIwQvLx69TexPh6vZ4CICOQgLpDL5dk%2F6XN6v7H%2F5wtb0HRZRRu4hKZIAKfQHSWKogECJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxPSP8NU5qdRWz%2FuhEq3AMf6HAdS8ZKAQBjrYk7d7WMB05Yk60d%2BHoudvYawSTSq%2FeUHOkNLmgvXedkVKVhSpADGQKtAk9NrUnZTToH%2BzxjPQO1MlOZX70SaGhVTQSnADr6V2yR9UzlqW7Px%2Bi%2FvrGl3EnuTnPSRjCIfyVpEDbxTNidqsigUnuJPcBsXBbRY2LkaYEPqvxz%2Fcl1S0RfUEo52r622HKkofEPki8%2Fr6qyAh5ZOy6xhLLAJ4m3aA5OjYyhBhQ88YXbOVLotlAgX13OOt%2FN7L375NN%2BB3DwcYuPFc643F1IUhwfvfM0ymGi7n5RIKT31zfkCGVSqwonyeZgCwqAPoaytyHoT89s%2BN2UnqJfFITvwdIbIxTtiSccUeVmTRfFrDU3CWcDMhsuioq9OD9g6Z7xIP3UvLJwQRpOIWe9Hlbfj5WEViehFW%2FUQ0xzYcBQGq9LmV6d%2Fvxnt5zMGtPwNox7eibbw6NomYf81vWl%2BuQgHCRraG79H4U48sHBL7JeuNm%2BZW5f%2Fk1X8wdd85cFkxxjKx8Fq2AYNbwxHuDOcunPAB2Jli4l8VperHANSIww%2Bg2OXtq0fNGrs2zNDatDaTATaju3vkLBLHe77516317MLub%2BKd2aGcBr0bDxizaJe1iHqdX2yDCT5NHNBjqnAabW1VrfkesricxnnVoVHqHa294Q%2B7OJxVNc7ZLXFZHcFsgW00QOsDltDdV%2B7R1k7SRT8HPAt90TBajrnVxI7mz2nOD1yrD5YbCVg9C1D9NnwWCC8i1iOW5SFxiOUo6W41pGaUAMNEBvjEk2Rv0WS7tnniMnJHoQmCzk7SWPEUBgRm6FI%2FE1ojLfOp25MWvRY6Tu8eERjKaNhVu2HmoOErOaMifadEIv&X-Amz-Signature=36c56bdd7dd1ff4e0bb51754bf7fbaa5d43abce945481ccce7029f733f602373&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662YP2U6KY%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T221617Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC12Jo2IPwtLYwW38fhGH7WG1TAdNtjlHRDkqWU0fCwcwIhALYNY0Ot4hS6J8SsCXoSze4pm9e8wKV5gVL4ZVvyJs5KKogECJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw1ssmmTruYfb%2B%2BhhIq3ANlnb7hOhleMd0v2DoyAv6cxTKuostUup4AoCDXjgqPChwxWYeO5JDLtRz2Io%2Bo7NmM0Vk1JwRKGD6NK2iTyp%2BZmVJBukZ74vnIdwqAUEvrJwajv4nSYwKbFrwNveihdkCOiCe0Kn93z1NVckjqvPUU%2FiYWbQHy7z02hQlyQexjrRJ79B9Mw9HPAocuZ6atFGV8lCvwiaCjjJqUX4NxQUzm8XYCAHotBROgnOO5vFO%2BVuc8CpMERCzjPQaGFiE3uwDxwdkmFuP9YBE4GoqzO0vwEXFu7kv5XyJi2gemTu9%2FJgQL3LTIJmn%2FBkPoGRJoOeAPzU6P%2BDCASsE%2Bit3vm4vHvHBk7XXJxSL5yWINB2Yr7ZaU2ktHegCBtAFCq3oQDlLt7%2FQMtbaXqwLTg9shBjDBtxgU1VukEuELHugQQRMYxP9rzWFwMMQR2GwWdrMd63LC%2FxAWLaSN%2F8bjrzdExlusZapEpe8Zv6WoVmFuIj9Ur8yAiuZO5PbBX3H3R83SehkDt1yBH2RoWX%2FDs9GvejTlmgcdm20G0bb5OXMd%2FBoJHyfestcQZp0gPNEzFFgnCuuOLnrHvPnPh6u9yGsqnRgq2vENkY5pNQQ3Sw2hDTKektzh3cCfZvTleuIh2jDfl9LNBjqkAbx8fqk063K0Rgb9alhXf6nv01%2BSYLBAr6Oha9odd9HPiXqe2wEE8MxfvToxi02%2FoaU6tw04ENnL%2BDPyQu19chRR8GYbTkjBNFrZaNJg7ejL2D2oFLj5tLR6vTWBa0SPd2VCF9PmREVg3OKLK8WIgbyDxRei%2BXFx87ddCD30shemBYLI8bmShgv6cQaZxFWc66%2BTXQP%2BFPemsF6gL98bRBki%2F5JB&X-Amz-Signature=f02b1cbad65bfae377d6e948d820c8ec4ef83b494e0c3adeb4b6ce45d7d5dfa3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662YP2U6KY%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T221617Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC12Jo2IPwtLYwW38fhGH7WG1TAdNtjlHRDkqWU0fCwcwIhALYNY0Ot4hS6J8SsCXoSze4pm9e8wKV5gVL4ZVvyJs5KKogECJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw1ssmmTruYfb%2B%2BhhIq3ANlnb7hOhleMd0v2DoyAv6cxTKuostUup4AoCDXjgqPChwxWYeO5JDLtRz2Io%2Bo7NmM0Vk1JwRKGD6NK2iTyp%2BZmVJBukZ74vnIdwqAUEvrJwajv4nSYwKbFrwNveihdkCOiCe0Kn93z1NVckjqvPUU%2FiYWbQHy7z02hQlyQexjrRJ79B9Mw9HPAocuZ6atFGV8lCvwiaCjjJqUX4NxQUzm8XYCAHotBROgnOO5vFO%2BVuc8CpMERCzjPQaGFiE3uwDxwdkmFuP9YBE4GoqzO0vwEXFu7kv5XyJi2gemTu9%2FJgQL3LTIJmn%2FBkPoGRJoOeAPzU6P%2BDCASsE%2Bit3vm4vHvHBk7XXJxSL5yWINB2Yr7ZaU2ktHegCBtAFCq3oQDlLt7%2FQMtbaXqwLTg9shBjDBtxgU1VukEuELHugQQRMYxP9rzWFwMMQR2GwWdrMd63LC%2FxAWLaSN%2F8bjrzdExlusZapEpe8Zv6WoVmFuIj9Ur8yAiuZO5PbBX3H3R83SehkDt1yBH2RoWX%2FDs9GvejTlmgcdm20G0bb5OXMd%2FBoJHyfestcQZp0gPNEzFFgnCuuOLnrHvPnPh6u9yGsqnRgq2vENkY5pNQQ3Sw2hDTKektzh3cCfZvTleuIh2jDfl9LNBjqkAbx8fqk063K0Rgb9alhXf6nv01%2BSYLBAr6Oha9odd9HPiXqe2wEE8MxfvToxi02%2FoaU6tw04ENnL%2BDPyQu19chRR8GYbTkjBNFrZaNJg7ejL2D2oFLj5tLR6vTWBa0SPd2VCF9PmREVg3OKLK8WIgbyDxRei%2BXFx87ddCD30shemBYLI8bmShgv6cQaZxFWc66%2BTXQP%2BFPemsF6gL98bRBki%2F5JB&X-Amz-Signature=57532c9f0d633546f12a2891bd1cf85f477889398e6c660a686767375140fa94&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663JZUZJU2%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T221617Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDree%2FkyMNrNH6jfD8G6SbLiFKv3pUiiRYqf6iEmE0WygIhANEgyLGTrasdxEvW%2BzfMQV9YYCCqyQUOyK%2Bb4LWOK46HKogECJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy6YE8mdEf7FJNcqpAq3AM9UZvs%2Fzvf1fw%2FUz5bEfRaeO%2F8QtwQn1Mg3A%2BXd73wDgK2W9RTGgSCIs0Ija3jb6UtxhmR77tTSnMQIreyEgMKyg5AyyupWglI3bb25XzYWhLjs%2F63hN4lKu3azXnSqGV2Gy01JoarkHRGhN%2FfcVAM7%2FLFPOrQJm29mBCYP7PJcgd8%2F%2FHxKhdfrF2%2BX8rUE4oqF3w0DT2DW%2FFKS%2BOwYIzjqg%2FSniBzh2QFkfFQr2ZqsCpBZcJ8bq7sYhnqDmREnXifUqUApucXi2rtvHPK5RFree1xyvOzHF7s233G4l2zTLVXcjeuSLHQhYS1Ry2Yqn5Yzi1i%2BL692xVVKrd4ZSXdBIpqAx3Pw%2BssjjvXYJ51rG8I6brpMyINlEt5X7cYRImQxOlQZGHvmz0XXDpSEUkOn%2FFGPAcPbfXZZzxbyf0HE9et2v5kbw9geQrIuRRgKya1luidjoLX009fqObEwGTCzKQeH6ey%2BGl2zmoB9l%2FLpTTVeBSF0XfSTb3Q1LagHIfoJ799dA3HO4gbBkEDFZbZKnEl8YzQdry%2BdvRbtlrxGzoq4629torJajOjja4kd1FaUhwz3VtjY4XHSl6QmQ%2BBFworC6D2oDbGT%2BAYTQBpzMbwUXIKt2OBcJJf8TCo4tHNBjqkAaiTsG%2F%2BtuLASZSVtt2gfd9z0yRhXrzr7RoSc7s2jl%2BX7ROXCMHfbMBYWwDEEo8hiphclhLWPfTwkwUMp8%2Bdxq51esKHkcA7j54oDjIf8Mz6jgSaNPoUGEnJ1GKeDEuPg2VSn98CfxWAVdnnxKxpZ%2FmL6n5NQQJ%2FInPMpawmAn8nutJEp7BWuiGPvn79WeYcz3Pm5YtEZ7Vv8u9HL7sS%2BF%2FO1ciA&X-Amz-Signature=7dc07ac2c44fdedcfe7539e36e07fb795f58aed4c40a10f03416e930d0f743e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667CJCCLT2%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T221618Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEBUlz3WHsiLtJh%2FKfnkO4D9O635bSO9o%2FEaGnjfVK2PAiEA%2BtfuT2H8O6qNmlzIsuLQM%2F9L4gGmiNetjmVjBFeSSPYqiAQIl%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGHgtjRuBeMYJamYlyrcA8wSL8cnqk6FO8Ci3aeZA%2BXSf6dv9xrYkJZNAads97OpX1zHIW4CBILtxXm2rDbv%2FsQ0VwbK%2F3ctpnc71FL%2BdRo%2BehBp5hIT46oSHU3mf2KFgY3ag%2FodjUY5CXCTHoFFFE4198AGw16snMBXMTZZ6AVR0Uk0MGJC34U5z7WwhA%2FF2vF42IqxGrahDzl9FGuSgiMoBf9yUTIxV6RPIpRs5c1Fzb3LvNE1330eucV4dOPzGVBFC37vbIc8VdXBq%2Bn5NbAyY7QaLsy3S8R6AWuTamSVzEta06QqajprZehK9Bsa6slA9eg4UUm0wqQ7C%2BL635eroSbkchmb4aL9ui%2BCbpDVgivFG2gw%2BGriyZtaHXRtuppZVEGKiegz3kiP7BI1C4XfJ5qtai4rPEnofW6EScy%2BJfo%2BKbNIynfg5q06KxGgrYA7ayYFcCHurATC27ccCACBTLtFekMmh0qtSIO1wC7tw37doQfr%2BoEFw77pRZEM89%2FG7Jy9F8vfQy9R3jqQTYETUNWnpnqq6Y7VaelK8fkNckise14uIaPSBV%2BWS9BxF%2BQ0r%2Fm9JmpZc%2BqSEmRNNu%2Fz5D3UQS8N3g%2FijOJoluk6jHdWwfpACezMT1ryneR%2FP4Rt9uqlRB4vhw9dMKqX0s0GOqUBD7Jg9JWgXY0Egpr3%2Fc2wzFwu8Z8IFzq11QfK5vTpHStyEBN5q8fjwXLTS3Ly%2FH0FySHzKhbfHmzIkmWyHT3VQyXd%2BpNDzY%2BOdWLJoaJeMYSIoZye8wfVwZbL4uQ8F41K%2BMllB5OhAVK6p%2FLkRBZg3q6UcZvVUCaROV4NA%2F2oTzXOaEhxk%2Fu94rBB3gSfwl2i3tvU4Vu909ciG%2B838Mav7doz24OP&X-Amz-Signature=d4c27e244c15952f2995683d23f9b5c17e62e91679aee696ebaffa6485536da9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WR7DIROH%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T221624Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC0k1aOOx%2Fpl9vP%2Bpu6f0CLcSVu0onCS3d%2BCnISA1HLEAiBXB2etTl1PQAqH7x46d45nk5TpIAqoS3tffwJOCgTBVyqIBAiX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMR%2FVhTEOM%2FZnkpUFuKtwDFLbQVuDgKDYZ5VGsj4M3Hunm4tdYIE6hWlhVcL8s61vT2O22p7nlnPVwbTj74aCYaZNbfgFEi219VuuwGYd4xEcEbaQcxLy%2FbtHrevQphVRXOa6o2Y%2FtBiY2ofz7dzjScOF0a3jN7FVvf7fIJlkArvNt4XLU2Oo%2F8tnbiK1ineUQhIByHP3yK4iXsp0Pfn2jia31lX%2FnafYid1Mv2apzuQ1DSZQf5O9sduFsrXojEwq93wql3wblz2RR2aCR%2FyraB0v%2Bskn01qDyhd0XalQDhJIaUpGTF6mgdOm3LhO4XcCqLdb81o%2Bbo9wGJuPZTNSqU3T8wXdy%2FAUCPnRQPQ1wIrpGu1gftOhBWq8qTFBvhM6gHX3TWii1HhmYg28WyShZAi8f81HWJrKjeKeYzncn5gzLk79ize2esz6b%2BvUlCHXUnSMls%2BOHdu9c6fGnyNhwXMU1xXm1APzrQIn8VCErAGm3dAVof4dRYcMuQ3yNeMXBBV7fFplcfm%2F7Sv0yjJOa%2BRM5g0YSOLTguOvKA2QFfML5eKGl2x6LNehnSyogIg7BMWc33p037eqTOAXbblBEf%2B3wLp8P3J3MSkcHUeb9AuqzLr%2BRaMwlk5VTaJPn%2FXvjlDP6EovgKOLdGukw75jSzQY6pgGzXawrkG%2B10fa5rUlH%2BL1LZZcPXKlKdtkGXzPATlZpb6FYHR52XSBxjXSdWmiRrw8dh0In5Bmdih3yKU3EnQ7Bb%2F5rl40xATI7kFPX5lB%2FV5N96Sj5%2Fqn9LylKnpXLQjxS80Ph7iOMyQMjTnWrnFlWfTo7v%2F58WbKMQzyI4H7CoIIareI8rYC%2FkN18IbjywKnIPbPvPdLEpofmUCCe429QwdhO63bI&X-Amz-Signature=d68dd49272b2700d397b803c66b4d5691e139a1ac8564c20637e904a84372311&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJ74MVHJ%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T221627Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFnynZ41wK6w7BgQY%2BB%2B6SqLHekIrhyGMZo0TDcZuAyaAiEAzKwYZdn%2BW9%2BHt5xKPMLz5CT8%2BTnkIcQr5U7a5dh2ZIgqiAQIl%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHm4RKWjvsD6pc4U%2BircAzpgHk3oNLe40Blm8SKsTosTfxbI52W%2BdVHF1%2FwiFSsVC6oyryEWWsYMJBK6Wry5jzNdmyPFL9wP9mSjSpMdhwvAXshNJYXPBeWMNDvrIJQQThsDCL3EhOfNWJVwT6yEDRFrQKWQ5S3fZ1TAic296b3k0hoMGE2UQYC%2FYd3tQ5oXz8jyQmVHb1hS5cWnkX9dpozZcKNLplXcHLEL07vwCUKoMAi393r6fQ32%2FSa3%2FaSQ8ZWv36ub%2B1kVJ7kq4TUZljT3sgRGHfVTJupCxCshKqT17JkcsyYjWLO8TBoWD9njQeTNiZ%2B1PfXM4Y0f8eWVkoTsxiSQCx%2Bv%2BESaYtNtnX7GCZiTTbHnozWWacWSpM4BrZE%2FCHytrqtKYLGfVYsqlDlSA0yssNtU82ZeMskpQ2FvCDNoEnhTfINwX9u4JflzSvSSbjp2J1ei2ewh0IKXonNbwlHRxXvC5bebxKKtATkg2vkH94jTsD%2BS72UEhhmeHwDNYDWzsmhC1yeU2VFLm6X4uqKPaaw3vTOT0OTi8IlZQJjYLOZRTP7HFfEJdqmMta4TJknlba1VdmTff0J6nb4fGW1r83IjCAJuN1ZjdvzsTjVCM1wTkSsyQ4DCigtGoo%2FYZzlRAfINYmuYMJuX0s0GOqUBaNdxPbkEApPY1CG1FVoneYkSNdiyHyD3oE9LigLCF%2BdyqYWJCi1pC9zu3HSvDUH6SUAVcjvu%2BIG%2BRj7mr%2FuMC4r2tEjWMy77vMpm%2BuY06gHzrgEDzeaxgcPdPwdoeHffWiukvvoyv9v%2FMOcJI%2BpkM%2BLpJHV3%2FXQySRt7F3dB%2F9%2FCuLzIWtgtjYStDUKBdRNSl3bQzo5pZS5F1n1CHjOGzglTplxL&X-Amz-Signature=dadfab8593fa10f01de893264384df8e894d21c1a6be692755d7966d1a0f8cc6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJ74MVHJ%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T221627Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFnynZ41wK6w7BgQY%2BB%2B6SqLHekIrhyGMZo0TDcZuAyaAiEAzKwYZdn%2BW9%2BHt5xKPMLz5CT8%2BTnkIcQr5U7a5dh2ZIgqiAQIl%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHm4RKWjvsD6pc4U%2BircAzpgHk3oNLe40Blm8SKsTosTfxbI52W%2BdVHF1%2FwiFSsVC6oyryEWWsYMJBK6Wry5jzNdmyPFL9wP9mSjSpMdhwvAXshNJYXPBeWMNDvrIJQQThsDCL3EhOfNWJVwT6yEDRFrQKWQ5S3fZ1TAic296b3k0hoMGE2UQYC%2FYd3tQ5oXz8jyQmVHb1hS5cWnkX9dpozZcKNLplXcHLEL07vwCUKoMAi393r6fQ32%2FSa3%2FaSQ8ZWv36ub%2B1kVJ7kq4TUZljT3sgRGHfVTJupCxCshKqT17JkcsyYjWLO8TBoWD9njQeTNiZ%2B1PfXM4Y0f8eWVkoTsxiSQCx%2Bv%2BESaYtNtnX7GCZiTTbHnozWWacWSpM4BrZE%2FCHytrqtKYLGfVYsqlDlSA0yssNtU82ZeMskpQ2FvCDNoEnhTfINwX9u4JflzSvSSbjp2J1ei2ewh0IKXonNbwlHRxXvC5bebxKKtATkg2vkH94jTsD%2BS72UEhhmeHwDNYDWzsmhC1yeU2VFLm6X4uqKPaaw3vTOT0OTi8IlZQJjYLOZRTP7HFfEJdqmMta4TJknlba1VdmTff0J6nb4fGW1r83IjCAJuN1ZjdvzsTjVCM1wTkSsyQ4DCigtGoo%2FYZzlRAfINYmuYMJuX0s0GOqUBaNdxPbkEApPY1CG1FVoneYkSNdiyHyD3oE9LigLCF%2BdyqYWJCi1pC9zu3HSvDUH6SUAVcjvu%2BIG%2BRj7mr%2FuMC4r2tEjWMy77vMpm%2BuY06gHzrgEDzeaxgcPdPwdoeHffWiukvvoyv9v%2FMOcJI%2BpkM%2BLpJHV3%2FXQySRt7F3dB%2F9%2FCuLzIWtgtjYStDUKBdRNSl3bQzo5pZS5F1n1CHjOGzglTplxL&X-Amz-Signature=6073a7d20885287ce992dd9e04f6e1c9cee68929e422f69ef9e2063ab1ced945&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662YMIJQT5%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T221612Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGL5RpUb5n3Vn5LpXopfs%2FIh5QWJ6hQUlrbpUC%2FkTvmOAiAoJjDr636SokC32CFa8B8Ma0YbWm1S7gqkTPo3WC6owyqIBAiX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMjddwdfUis1CNbzLKKtwDyuDp1tMITZcQGdWxIT1LMJX1DgGNl0dS5y6qzW99ACZ38J%2B4%2Bw9L97Z0q6tLR3G0cW8N1n1pruI2hD1T0xO8CREaQP4gfFWvQxCETINyUN5ypz6lXQYLyn6iZv%2Fh0jGop%2F%2BRGw5%2FSKGoR5BZ5W9hEpWbQhoC98TvNsIRfd%2FCi023VQazE6ewK14Hs8s08IxYUr76%2B0RmCrTFMwfNkwpTeK5C1I9d7mhA9q61rPtVRwCHeQuDDoJQzg8Q8Fm8dpzt%2BOJ6vjDg%2F3762gZPEm660biV%2F9h%2BYWK6NASBlRuTm1Mj1mPU%2Fx6j18eeSECKEIE1KSIieA3stFh4%2FlN0ZTNDyPaRmGvwH%2FcHHEOt6y7I4r0h0sZ87rRP8vkD2wzbcaVQERyzZtGjU9PbV9mwGEFEohT3gVmnCCnvX5%2Fip8LJd8wdPS7i7xUZepqTdbRwoVBMsStRr6boki0TLe8UlGxmjWVJ9Cy8FM7jaIv%2FVx4iXqsJny7%2FdAem6YBVqvM9eEzu8iXUn%2BNgXgdhbBkN%2Bo2BkVFoBnhNL3ODhsunuEIfXt1tbTvif8%2FiQo64l0%2BxwDfG2Vho6fpEUk4xowvLMxp4PxF96KrYgKwDBliYr6embb2nacmATJcpY4QUOVUw8JfSzQY6pgGCKH5Kp8PDSSawPpgibF1LbTzpzNHXdGyMwQ6zemlYBotF91GDt1sycOnp5as11UbLB1l4CotidMLwdou8D0Hp%2BKStnBfSK7YWGogXRF9t77MNK1GPgH4Rc38W9mWHgO01mCtLk%2BcqZtrdcuhL3YcAGFQ9KJxWbpARhJyCeEMABz28XU%2F8e5lsKol9r%2BPmMDB6Hc8nI06qd2rOj%2FcuyQRQe1ud6bID&X-Amz-Signature=325efec172ad6454e31d31ab88db16deb5ed1e9de1158b01580cd3868e1a9b4d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWE27WY5%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T221636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDfOxD3VmnAyMORYNPARM92AKPQCSlqk5oX5B72vuziLgIhAPSzxxrLapMwTlS0smphEcoJGyxAnecxPjAb3HGc%2Boi5KogECJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzuPt0lfhVezmdZWEEq3AOcPjm%2F1Bk%2F36cVKhHs5%2BdnhQ1ubmhFFcFlVxMUKTNS8je8m9HLzxRjLI1GLHxWDvK9Ut1gYcfJgl%2B%2BxqqUroi0%2BMK5%2FpSFTUksa962MA8RF7YzSD2Mw0d3%2FIwwwLCr%2B5s3wgr00cfYklOgCXC0lIkpTQMGBSUoGKKsbH%2BMfoj0OvAL%2F4hQVY%2BB8g%2FUgQiIhkJwl2d3IIVjVV4%2BZNXYQPqSKRFAoYY1rsq9UMILzmUXRHrFsdAwN%2FK1Xj75470itwpX9A1mP4TsI9hlRJ%2F7KOladJXSWFUncdulnUILSzywo2XvSLnFpn1rxSAbQ%2BZvQ0qe6MB71%2FnXlLydSQiuujFm5BixQF45USmJkAVCCdFkHfvMzm8PyVUhOu6EQvUGCioBo7wFgd5bVH7L6Raq20b4XGBeHEC3oraqzxkVQvJ6zJOwFbgnpg65DmGcZtw93Phk00OAG2TtKzIunNbm4%2BIeqq38Ghc6L8p58NmYpfOuhyFqc8V8XmB579FpqEx6kD3HGv%2FWPktNBwWLqRbGgN1uXlYjUYFFggd94xJDItb161QABsvdLBhawT5tg4GMsYmgTLQTaJr%2BAAZd4rKshjIjapQgrwhJX0OXFuB8xWpeVCQcLbhcWQthzWGtkzDPl9LNBjqkAd9SZ5S%2FBGksWF3bKIxu%2FW3iq3%2FNNyvg%2F8GvvY7C%2FLoNUONm85pcNNplZscQEAkUjztPz6aXycUosZjYs0qBbrAzl7MCWeXfgkU7P9erZyYDrnOYY6ZcVbZtmkFzB6O0NkZDDJmFLUcVLsLk97QTlnvPL%2BcmR0y6Y5TiRUlORXOqtIoF7djeI2VHV1oAkhcicJdvW%2FnNI0XgDbuyAOyetj8sobAP&X-Amz-Signature=f0dac599f8d50f6bd140c02b705e95c61eadfb85e4e68052ecb83a29ec2dfcfb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWE27WY5%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T221636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDfOxD3VmnAyMORYNPARM92AKPQCSlqk5oX5B72vuziLgIhAPSzxxrLapMwTlS0smphEcoJGyxAnecxPjAb3HGc%2Boi5KogECJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzuPt0lfhVezmdZWEEq3AOcPjm%2F1Bk%2F36cVKhHs5%2BdnhQ1ubmhFFcFlVxMUKTNS8je8m9HLzxRjLI1GLHxWDvK9Ut1gYcfJgl%2B%2BxqqUroi0%2BMK5%2FpSFTUksa962MA8RF7YzSD2Mw0d3%2FIwwwLCr%2B5s3wgr00cfYklOgCXC0lIkpTQMGBSUoGKKsbH%2BMfoj0OvAL%2F4hQVY%2BB8g%2FUgQiIhkJwl2d3IIVjVV4%2BZNXYQPqSKRFAoYY1rsq9UMILzmUXRHrFsdAwN%2FK1Xj75470itwpX9A1mP4TsI9hlRJ%2F7KOladJXSWFUncdulnUILSzywo2XvSLnFpn1rxSAbQ%2BZvQ0qe6MB71%2FnXlLydSQiuujFm5BixQF45USmJkAVCCdFkHfvMzm8PyVUhOu6EQvUGCioBo7wFgd5bVH7L6Raq20b4XGBeHEC3oraqzxkVQvJ6zJOwFbgnpg65DmGcZtw93Phk00OAG2TtKzIunNbm4%2BIeqq38Ghc6L8p58NmYpfOuhyFqc8V8XmB579FpqEx6kD3HGv%2FWPktNBwWLqRbGgN1uXlYjUYFFggd94xJDItb161QABsvdLBhawT5tg4GMsYmgTLQTaJr%2BAAZd4rKshjIjapQgrwhJX0OXFuB8xWpeVCQcLbhcWQthzWGtkzDPl9LNBjqkAd9SZ5S%2FBGksWF3bKIxu%2FW3iq3%2FNNyvg%2F8GvvY7C%2FLoNUONm85pcNNplZscQEAkUjztPz6aXycUosZjYs0qBbrAzl7MCWeXfgkU7P9erZyYDrnOYY6ZcVbZtmkFzB6O0NkZDDJmFLUcVLsLk97QTlnvPL%2BcmR0y6Y5TiRUlORXOqtIoF7djeI2VHV1oAkhcicJdvW%2FnNI0XgDbuyAOyetj8sobAP&X-Amz-Signature=f0dac599f8d50f6bd140c02b705e95c61eadfb85e4e68052ecb83a29ec2dfcfb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S2ZL5QEM%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T221637Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGbvYzsn6ZiOxg0Kq2BhD8SH1zDEVGO1013gq3lCy4GNAiEA2fuUnuPq3dptxgr0dEvEjY%2FVJ1uQ96oiomCYMyIVMikqiAQIl%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGl7HsFOcWI9Wdl2jyrcA24AYfkVCn9YIdM8NhpibFrUtIgNWyode%2BBPLBOM99jNicDc%2Fz6FCy4JvAYVOp%2FxSLCmEYY%2B%2BpLB4sR8%2Bruu3pMF%2F8Hh%2BZwROn3%2BHeydyTUg2Ft35eSZf0ZKLPqb26F0x7EgguER4LyGCwucwWsfIOUDcnhRk6ThqwC8fh9p1kN%2F2hKqh24lU0I8PagddqreK8PIWy%2FTh1HWsTp9KIP0HjLLVpjBKUlyjegIK0W8u%2FeOA7wZsi5jwi5aes1AamO45t4RP18DslN8K3TpLhQ62laN1%2BtTuzP3obcq7671StcU1TUF20YF2OGPs04EQMIDtShaE5qcQxWwmuIdG3Vyfd%2FQnMVPCqWZTH4DnPWhSq4mRp%2BDkKM2%2FcYrQ61dJ3lWRCzMyfh6DqbDXMNVwft53y1QQ2UCJKHFE3p0UUVOoIqqI4F8MAZMn%2FrJd5mdLBTj5Qbh%2B%2FbgBlyNO0oeZ5b0lWLPWERz5bMU2PdFolvj%2Bl%2F5Wx2deVSrO4suUm4lC6fIEwG8LAqJ89jQXzzOMTAkIkLsdj6W7G%2BZFllc9WguoiwUzskHYpxTSH671wEhYoePooIYcrk%2B85UbQRkhowr69CU03Fp53bCnQR9q9p8%2BbRk3TQ7%2FqBLm9mpjxHUDMKuX0s0GOqUB6e9DJU0AexqDLr5anlgarEQpB%2BMiqkKFn5P7HBsgre3oGJxeQlUC93gwhc7Cjh0ojHHKASVRsPOCogttfrG6u%2B%2B7GA70zTbmUWXihWHtjSiBlf%2FLJJeYrDaH3cieJzkmQQLkSkkbk60M3hnMh80x1aGY4VlYtFlaX1o%2BgzK4RUgD2OSCwTqbYmaZgTpIiY43qmfbLAoTmr4ZHcb8vy%2Fcol5SqUkh&X-Amz-Signature=965eb224c75d974a66b9267bb755e850f1896ee08eeba320a1d51f32abcfcc9d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

