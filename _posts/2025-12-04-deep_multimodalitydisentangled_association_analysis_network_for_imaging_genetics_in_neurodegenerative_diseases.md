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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YH6CWOVV%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T203523Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBVqNVhGgEjBy723NlL%2Bp2ZTej2U2tYOpTNDnUEtRrvKAiAcm7C2Rb5i5OQALaywRkSBxB08uxO4HPnCs6Y7ENqQXyqIBAjF%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMvwWUOJJtRfR0sZXzKtwDcISiC2pUaDBvEWyKMNQhwFqe6ivdgcEyyNyQeljoFqZi8X4H5H3s7mb74Muxu6m85cHE7p1h0oCc0PcyLygFBLJEtaEXZctbTZAnA%2BJSstKcJ6ExAVH9kVdBbBZBWTUgTw0JaCHfhdaW5Wu2E0QElUJ9n2H%2F4EQshv71L3K2Ht%2BA5GBw3ALnDqR1QAnZh1QmNBKUBreFrMigGUaZoEGo%2FS7NHbelc5FDyUKGnGSLV9GGbCVol4PakOZEN7Z%2BQOji8iIviHEwqlze%2B7B7S33ARBDEBlgATE8OUlw4M4eo19Xo0Sdksvuy7JRpcbEElkmPrkMLILBJMK%2FdnxYvikHwmLo9u%2Fl1V%2BoWtQtgHXngSBgdvIOJMnn7Iy3ENM2Z%2BmVWuFnvYKWrwSTbODFYzUFRGBCnzEM4teWKkAWGSPGuVZhZDtoegNLgMEhyojrM39dL9xtjAneUY3Natj8KRvEwoNLvRYhp6ePuqAGXHnmgFHdKXQRAFWlhe%2FlpZn6s9NdVm7JvuUUg84kzamqtEOk431ZqRsVA5PyBpwHuh%2BNfKRdK8%2FKejRX%2BC%2BhYlTfjIJPRIlPdW8VPpxg67sE86a2nydsUQWgevV1TDgABdX8pEZmLhHX3Ou33TC76A%2F4w2%2FiEzwY6pgEpHWdGteimh3PfQn6l%2B2YHv4OwVkkPQ324xLzNg2PnQMKtWX2KpdDQJFdL4lW%2FaVoWG6qCB9E%2BqluzF35eA9Nz7fhxEs5SpBbn5vxSIB%2FEsnWlvl7a08CI%2B5lVNoFf3DW575JepiSdpnFWRnn5MBKQwk6jDxxyn2QVDnVXBBukPDmiWKukjpkI%2BmdsyoWNRbcsS9qphhRpoo5jzNy%2FfEeVJx2f5uP8&X-Amz-Signature=427250b81e1e7ab805d9baa795d82b128a95a29f6055cbc81f278f60d74bc238&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YH6CWOVV%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T203523Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBVqNVhGgEjBy723NlL%2Bp2ZTej2U2tYOpTNDnUEtRrvKAiAcm7C2Rb5i5OQALaywRkSBxB08uxO4HPnCs6Y7ENqQXyqIBAjF%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMvwWUOJJtRfR0sZXzKtwDcISiC2pUaDBvEWyKMNQhwFqe6ivdgcEyyNyQeljoFqZi8X4H5H3s7mb74Muxu6m85cHE7p1h0oCc0PcyLygFBLJEtaEXZctbTZAnA%2BJSstKcJ6ExAVH9kVdBbBZBWTUgTw0JaCHfhdaW5Wu2E0QElUJ9n2H%2F4EQshv71L3K2Ht%2BA5GBw3ALnDqR1QAnZh1QmNBKUBreFrMigGUaZoEGo%2FS7NHbelc5FDyUKGnGSLV9GGbCVol4PakOZEN7Z%2BQOji8iIviHEwqlze%2B7B7S33ARBDEBlgATE8OUlw4M4eo19Xo0Sdksvuy7JRpcbEElkmPrkMLILBJMK%2FdnxYvikHwmLo9u%2Fl1V%2BoWtQtgHXngSBgdvIOJMnn7Iy3ENM2Z%2BmVWuFnvYKWrwSTbODFYzUFRGBCnzEM4teWKkAWGSPGuVZhZDtoegNLgMEhyojrM39dL9xtjAneUY3Natj8KRvEwoNLvRYhp6ePuqAGXHnmgFHdKXQRAFWlhe%2FlpZn6s9NdVm7JvuUUg84kzamqtEOk431ZqRsVA5PyBpwHuh%2BNfKRdK8%2FKejRX%2BC%2BhYlTfjIJPRIlPdW8VPpxg67sE86a2nydsUQWgevV1TDgABdX8pEZmLhHX3Ou33TC76A%2F4w2%2FiEzwY6pgEpHWdGteimh3PfQn6l%2B2YHv4OwVkkPQ324xLzNg2PnQMKtWX2KpdDQJFdL4lW%2FaVoWG6qCB9E%2BqluzF35eA9Nz7fhxEs5SpBbn5vxSIB%2FEsnWlvl7a08CI%2B5lVNoFf3DW575JepiSdpnFWRnn5MBKQwk6jDxxyn2QVDnVXBBukPDmiWKukjpkI%2BmdsyoWNRbcsS9qphhRpoo5jzNy%2FfEeVJx2f5uP8&X-Amz-Signature=427250b81e1e7ab805d9baa795d82b128a95a29f6055cbc81f278f60d74bc238&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QUL4UU6W%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T203524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDGZvU0IYGsmy4X4B3RhQRSm1UO6O8ipExJdaJAFSlWugIgNkWdFKbtbh3Q8Ooihj5%2B4hdQRTLYi5FzbN84MBuE0iIqiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNEyxDS0R6VmBVDQoCrcA9xnf4COiPOLPDdoUa9NOnc4U20QpExJqfV5PShv1Nmfg5qwqAzjG9yEP5l9%2FVUbUr1o5OWEr0dVf4efzaJOHtXxtesmZT9%2Bd0uUXRpHbQ2uVBO2AOahdBPSZADJlxwEEgtVqg8Gx5xbJsyHt7GtRJNQ3qsemqs2calUdXV8EWCXgvoZZ9U00Yjqpg8wYClpseXNMUe0IZ2GehEbEPdsdkbUh4md1VPYs6tRRx8PEIW4llADODwJ2K8OdeqkKKo0pljBTMPdGR5zrvL2Z4e0heZ%2B3t8QCCjx%2Fa%2BuzKTaWerdhstJPqWtlg6EGId1Q3EbNb%2BGwSsWLgJVkzVp4K8Gb8qnndU3GQISOHlDIj8%2BM%2F%2Bg4c4Lq0mSf5jllR7YC%2B9jYRTD5PYdofURM8mj%2FTmt8v1do7zokOvSn%2F8pur6SsR6zwu3gF24r1mrilAaJzKgpyJ%2F7fqU8zlWNqQCkw7eFYh4oZ6kKEE8wcKQ7YEyKZQpd5BgSVIbobYRu8Emb1jxoOOVouSmZZCiroBrao756QBoNdATQLRTYzckTkcfEM5fB61c9QavKTur6OmfCucRsa1stei%2F8nycaupbYXs4WnqxPqrcQFx7A93HVzml7jggXZiqp6XscQTZisN1YMKv4hM8GOqUBHFbwtHT7tULPQzitAQfPVt77aFpNZRYhIpMxlE%2FDi%2Bs4F1MbMaNK4EtgR3gsGW2SRjF1grcA0xkO60XbJ5R7xtfQ5Bo5X8s%2Fw4kO4dl3whRaO4d%2FbvtgdQkoj16U0QPlhozjEgq09hPkdqZ4bzyqB4%2F8uaL02DFScG%2Bc6YsJWy9EPzbk31H7x8szcioOE2TiiDXkia4vRQvgWGQq04EHiUxxco9h&X-Amz-Signature=4f9075c044dcf2247b7b86e38e6e742e9c6b74050cd178cfe0c75d36e6337383&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662FIWWWTT%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T203526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHsjr0NuHwjW5h4YrLtVoy9mZYOHPt%2Ft8hnoWoXdKz%2FNAiBcmYwpRqCTaXqVmmNM5y%2FK%2BXKqSL1Np4Ciz4Gt0emdCSqIBAjF%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMrUIAGWGFYd9k04SZKtwDJxSFzUdKgALOV06Ql0VS6fL3Nfxlrml09lHSKDGyAMNOLIuPokL8LR89hxtlC33kc7oLHe6r5tBXS8m%2FRleohAaIB9Pq2%2B2BOAbxzlECsTZohbg6HQVTk7DXrYSAzXYo5Oph%2B7JwtuTCa%2BvumnjeTc7i%2BtUaAoL05JPrgrYfiaNmOZnXOJzaRCSP2r9fTBi%2BehhabU1shtT%2BrqTAn%2B%2BPSsC3XstGdrYFrbyIdzWVRT3jKfsRN65uqEjbFXhfGx%2Fe1xxvh9JoF%2BqRZlFsjMd9GbEZ9jJ591flyEVpvNegxdpnAQ0kULJZMYz5zJcWkDhR6YZxbZflr7yglJ5hZ74g5C8h8PQ4EwDQX0K3o2nOBcwybnfLlvG0fKsPat8clAfeAirfS1vYACuzcIKvX9ufE%2B4WyVw77Ja%2B8wEYsUMKoz2YzU0%2BsgGi2Dr8hDqxHsY1xwpka5HO7SqKNMdJ5tENmGhxgpaPFukElk5T6wEBLMiSkFo3ZAU%2FUybwRN3%2BupMAparTLm%2FJUkExB0assixZ9MKNqR5YyaLbIws17ZVXmc%2FJo3y0Y%2BWvWhmqQu7JwyDZNyldakUyIJO5bda%2FG2uzThZBMVM2METPM8RCEx5aEx%2FXlpirYzY79D6SOJcw2%2FqEzwY6pgE3SkjHWIFugZHchYXPaSdPBtXMnmIVVTrmYNaSNTSwmZpiQZ%2BAbRFH7xA2fsoOJabJd%2FrA%2FxYtpBvZQ%2BblzYLxG6QTACHNLQZexbp%2F%2BCz7dvfOj7PdSA24%2BIJYsk5Y8WRAdYIWirEMjUfcbiBFzH%2F4DMUAnObsjhVcUB2cwlMHQhvS7ncH2rxBNYwLPFiQ9Bt8camuSTc5Sy42xOvy%2FAn0d5PCYu5q&X-Amz-Signature=db0712bad943e2f1c9da3c2b2568358ab8ebe8971758d0107316c3e3a32845d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662FIWWWTT%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T203526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHsjr0NuHwjW5h4YrLtVoy9mZYOHPt%2Ft8hnoWoXdKz%2FNAiBcmYwpRqCTaXqVmmNM5y%2FK%2BXKqSL1Np4Ciz4Gt0emdCSqIBAjF%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMrUIAGWGFYd9k04SZKtwDJxSFzUdKgALOV06Ql0VS6fL3Nfxlrml09lHSKDGyAMNOLIuPokL8LR89hxtlC33kc7oLHe6r5tBXS8m%2FRleohAaIB9Pq2%2B2BOAbxzlECsTZohbg6HQVTk7DXrYSAzXYo5Oph%2B7JwtuTCa%2BvumnjeTc7i%2BtUaAoL05JPrgrYfiaNmOZnXOJzaRCSP2r9fTBi%2BehhabU1shtT%2BrqTAn%2B%2BPSsC3XstGdrYFrbyIdzWVRT3jKfsRN65uqEjbFXhfGx%2Fe1xxvh9JoF%2BqRZlFsjMd9GbEZ9jJ591flyEVpvNegxdpnAQ0kULJZMYz5zJcWkDhR6YZxbZflr7yglJ5hZ74g5C8h8PQ4EwDQX0K3o2nOBcwybnfLlvG0fKsPat8clAfeAirfS1vYACuzcIKvX9ufE%2B4WyVw77Ja%2B8wEYsUMKoz2YzU0%2BsgGi2Dr8hDqxHsY1xwpka5HO7SqKNMdJ5tENmGhxgpaPFukElk5T6wEBLMiSkFo3ZAU%2FUybwRN3%2BupMAparTLm%2FJUkExB0assixZ9MKNqR5YyaLbIws17ZVXmc%2FJo3y0Y%2BWvWhmqQu7JwyDZNyldakUyIJO5bda%2FG2uzThZBMVM2METPM8RCEx5aEx%2FXlpirYzY79D6SOJcw2%2FqEzwY6pgE3SkjHWIFugZHchYXPaSdPBtXMnmIVVTrmYNaSNTSwmZpiQZ%2BAbRFH7xA2fsoOJabJd%2FrA%2FxYtpBvZQ%2BblzYLxG6QTACHNLQZexbp%2F%2BCz7dvfOj7PdSA24%2BIJYsk5Y8WRAdYIWirEMjUfcbiBFzH%2F4DMUAnObsjhVcUB2cwlMHQhvS7ncH2rxBNYwLPFiQ9Bt8camuSTc5Sy42xOvy%2FAn0d5PCYu5q&X-Amz-Signature=2b33a54f51ae38c0071ef863f0cb5226f85de63fcf6c9039b7947784f90412d4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662PKXHBLF%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T203526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAmCCMzdYbaTC8YS4VswXaZqu8ydfOG4gwZv0uB2CMtSAiEA0eS3l2%2F%2Fa4cLTub%2FsXUJiyNFUAqfdZonPSXmwnwMyN0qiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJGAcaNGlDn2e4u4kSrcA4qE6sA3zTRlCGwv3qM4UmED6LWx5eQqHsl7075YC620dAoa9Ev2SvmOJY8FfMzL%2B3X5XVVag7KDW4bioNIUyXlL7nhubCQdpYB4S703MrhQVIYvQfEtBX8VxjuuLth9yj5OLsEN31t1y6z4UvwDTL8q0yCpNnQvwNybP6d%2Fbl%2BobOCP2qE%2BCW1Z1vgn1wVthwNeylTxyhJ6BizbML%2FkQBJufD%2B6ejLMdUzRFkSj1ErwwItYVjIA5lv5bH3Zz3jHlSgcLjQ9E4fy08G3rPzcQyAOt%2F9jjGdJcnvjWNVAdcLHElx2bDXMx6cedsbFPR7u8%2BioBSDXtChuOuI008fqk3yCooPrUUpyhCARquzgNqP2zyyN%2FBlRgK%2FETWQRu6HtTtxfo%2F6PLblSNYD342hEgPZzQfh%2FEcrKvp7ASoBx%2FJgL%2Bdji2xlF6hepJO6ZQ2F4tQ6jYdDakf%2FRp0FqkCZd%2FkukyT5NvtQSbUv2TWMpVsA4JJFRPfFRXbXRD5hsL%2FKClYY6ttLLJIwrjB3unV6VJp%2F7DzIHABvmhK6rcgBzK6b7aEVW9m1oiy4Jyk4EBxB9h14uWFaM0HBh4hBeg5zl6vViFfQUa5wNou2a4Wta6d8nC0rrd2pB%2BSgd%2FmgBML37hM8GOqUB1N7SwO60lS3neNu911%2FL7xIh9ftRCs0nFnZ3gfh7VwNSZ5WWuSBgicMzNmeKuRlW9KH0gCRlJJ%2Bhx3yXguE03hNiUOQuGk5rMOfFsX4q5ZljEMGa1DbM%2F02NG8icoNMp6e4Wxufq8QNkuoZgKNF48tQHLzyCTEJ5PDT9p03HyskttH4Z4h%2Bb9VxkUMP2uMbPgJztatEjmYTZa8UFBIgOgnQa5dGG&X-Amz-Signature=1e63d71c503fb3d0ec8eafcf714fc69e2784aa2121fadb78e42d5c1c4e2c8178&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U6THF7S7%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T203526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCM3V6DqOH6MnJut28EYlLfeUVaDpPVq6TttynCE0arjwIgO8Jol15BHbVWk5O7lzuCVkXbd1E47LlxsSOW%2FRKWzwEqiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDP0qt7eB95FljGikircA7QNoV1%2FobwrBBX%2FPzTz6IANYiEgJ2bz3KMqxMPU%2BEpBR4FHMpG0o9gOgzcF%2FfxYbdlwz9olQMqeh6zV09e0LNGqjhLywNuIBEUbswyUgvalyLgMkKYKcNW4wCDkv%2BoCFVMBEgXGFp9kVbYa7NeyDVeeJ0XKv9%2FkU5JSDbCqB0FVfRVWD9q5NdejfIWlkYbGKAV2Dt8V7%2FMwBz5lLNqc39O3ulDFcKFyUTTnG14FBjz9PmDTIBiBR9cumMJFCJjQrySO8ingPaxtgo70EWmmedrBZ2kjfaOjVve5I18z5koUaeJstgkPtLiuA5mHUDlZLvtQuLu6QnASqwYmJhE%2B45gQF%2BdqEGf55yh1K4lTr2icN%2BBWdnbxK5CNkF94g%2BOZs3MGGjAxosVcOPvPkVQ%2Bdz0bOB8EnJxefeWPdWfc7BAadzWiJSKVOhkD5Nc8kBL9GBFQcAN%2F7b1jrdUnfKvXiSUVFGdNm9ylJ0nig8OJu8iNOQYbj35lWHUT7hcDpgM3fftPViTuGb0%2FekG0murNkSZYL6nG%2F4J6d8E3so7LS6eTP5Tsq3KgBg9dfcZNl0wmIFiq42sO%2FEniDgTnJI4fPtWOBXtEsh8xyLoDJc7iY%2BfOrdtScIj7ka15%2B0w%2FMO76hM8GOqUBEdtN1QIqoN2O6CwpKqi6LKox771w2sRcoHYUh%2BvWD7ZtvadseEIUGw%2FCCCzLceltiOwsipCxBqTP0VTd%2Fjoo4JRvcNejo%2Bfxpm3gm3VUaqn%2FU3WPLb556QRuUGAkt7K4PtAzQQsfsaGYS%2Ftrj4lk0U%2BhiA5PRBBmu6z0J1eGAAyfqKDuIQz0azgkLdBE0Y1JO6ZVlFWWsfdRziL1dgnuLisZRDAb&X-Amz-Signature=abd293938a2a15426d7a2bab34e7cc827966d1b29615ddd35560516b5c059bdb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UTH4XZ4M%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T203527Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICW30fXEjnhO2YkcgSD2Nsi2dwlFFfCgVel%2FXDlJfU39AiBLyhmmR381fauxJ7lxawE2G3PwurN95Np%2Bu3twg7snhCqIBAjF%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMLNOLrIo6Xhrr3Kp0KtwD1CJof1e6z2aU5B%2Fy2s%2FulPonNnTKg6ot%2F27PWB07aSs%2BDwSH25JsRUAOOlPnxNZ%2BCjmTA%2BDCSknNa7TXRJdrp9Zm6f6%2Fo%2BM%2BdjuTysc5czhaXsBoDaFRM5v2%2F69zFfvYKEvmFhE2nDxAPltYXAO4rgXaZkctxPhf8xeGRF1P1BiWox7f%2FXnYgvz6ZMwEIj10XLNffGcdH4HXBIi5W5ZHeTmuP6HaR4NVv7rWh0SSy4IC0w6LXWBuDpJ1Ys%2FScynQ3WBl74pddE9u1P4c0ezWX7KdiL3HYkl4Sw3vYUrlOJz5YZs6D9%2FpjYzY5ZL1bpVZMQOE%2FsjTGcAw%2B0fSZoD2T%2BFt1JF5lk84n4piMy%2FappNyNRBta1xeiJ91P4D1kKoSjXfg4hjlmyhVMbCH2sHUPnuTA05QbpvK91SpCtVqkFnBGcC5ey70CFACYeR4ETO7hXNarA6lZ2Fk%2BsyY1oLOflu%2BA4QLbEjv%2BOkLvUnZX5GxHs60CEzW%2FKYF82XFdOx75QnDJz8duKPuMSCSHl0Quc3YbFeRFNa7V35gLk8LfpU%2FlmKpzT2k2odGObetbNffpi7HlgSN0srlATkaoKDcjaiiInCTcv39%2FtlwaxHgi%2BAGl1tOB3MqseSrBTEw7PiEzwY6pgGcMJNeLLqR67I0nJRWlLMSTTGXir69xq%2FReuT2LJoaDYcCUuKXZfIDudfpR%2B73CDJUDojHN5k8eZ9Kh6UdQi9AuMSHZnGrW6gWdPqXevg18LUwLS%2BqYP6HqNeCgDHNRaygo%2BzvXVWZDbaVm7fyIHrGbLCizYUMadRvuf2KzvjPB9%2B5Q1yKl6w8H0Hcm3Zq1aGdp6u6vQ57MwzlwPqzbLFtn%2F2MvB7Q&X-Amz-Signature=b4d84cfaf0df14dc588622de0391fce971d200667c8f7816c6906d18c6c592a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMPSCGMV%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T203528Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCdvWMt1bsE3qciGxHi0Oa7%2BOfwSIMmufzoBE%2Bl6%2F8F4AIgZqORpSgso4CMxvoKp3lmQ%2F2lIunPkiFIBmpugZXo3nEqiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDN7QLZgSLwQUEjzzACrcAzHKKG3%2Fbmpu3qBtPbuOMj9TUbK3brSit2CscxFlNxqwPrx%2BaRB25NMMV6XsrfZTP9W8DLbdQD%2BK5RBYHe8ths8qH%2BHiidyXJwVz%2FMrsXs5CVr7rA3WfISalEkb75ZUFCloxkhJ%2F%2FiPSg5u9VMJyHekBhI0jILPTLVfeCkd1ipQkgsy2xCvu3Un51d1uupFYrpJ2USFpDLGz7K79ZtIWiLLY8k1LohVre0h7epAnYX%2FyYN807kj9ILS7%2BpDqOsU6H47vB1OkYvWTdr2Ur54AcwwDtA7vX2M9GPumWKmlTngNJ9cIDzxEkipBH271HdKA91vYK9VGWhs4dqq9RljYISpRsxu4d8HbPJvPiEHa2WNFrALvVYpuSTX2HgdOK8KDu8hvThM2XDNDr26FLvKNB%2Bd%2FS3OCe1N%2B8rsPKVzfuGdXJL0wQ4wKx2adt6iGrwjz1n4FlGBLSPVG5briNM48qdAhFJSb3gO%2BS2uYAbGBBO7YQZ3UmSzZPkQZ6kz2AgA1BHGhn%2Br6%2BlVd9wJ%2BKDx7vHHVwNRrRAiL5s%2FD7QC0WbK3WoiRuEZEWxjKzkeduUm54f5Nbow%2B5tWUliovpVaCQEO0IaE5wodzI4bbEjyb2YjTdwj5gpraN8iXzdQ3MN35hM8GOqUBJrrdZocaOWlV%2FIB8dAl%2Bs8RVUf8cyQ4xwyUFQ9yYvCGnWjmntbpkZKaIm0pW7gwUaB697safeuzxJ03KUTWFxWSqdc%2BeCR2ni1IwX2qI1kUoAkrLeso34eAtWovoj3lxjNUF0BBKYwbn96mSIdl5sKbsGmIsCtNe6h5Fds2RR9j9SFuaQORhfPjj%2FrrQAt2rA32hda6w6YjM%2Bk5jdpayR2L0sSI0&X-Amz-Signature=d2f23f7ba7477162fb39ec80159c152e8a3f1872d21addd9c892570109908707&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMPSCGMV%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T203528Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCdvWMt1bsE3qciGxHi0Oa7%2BOfwSIMmufzoBE%2Bl6%2F8F4AIgZqORpSgso4CMxvoKp3lmQ%2F2lIunPkiFIBmpugZXo3nEqiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDN7QLZgSLwQUEjzzACrcAzHKKG3%2Fbmpu3qBtPbuOMj9TUbK3brSit2CscxFlNxqwPrx%2BaRB25NMMV6XsrfZTP9W8DLbdQD%2BK5RBYHe8ths8qH%2BHiidyXJwVz%2FMrsXs5CVr7rA3WfISalEkb75ZUFCloxkhJ%2F%2FiPSg5u9VMJyHekBhI0jILPTLVfeCkd1ipQkgsy2xCvu3Un51d1uupFYrpJ2USFpDLGz7K79ZtIWiLLY8k1LohVre0h7epAnYX%2FyYN807kj9ILS7%2BpDqOsU6H47vB1OkYvWTdr2Ur54AcwwDtA7vX2M9GPumWKmlTngNJ9cIDzxEkipBH271HdKA91vYK9VGWhs4dqq9RljYISpRsxu4d8HbPJvPiEHa2WNFrALvVYpuSTX2HgdOK8KDu8hvThM2XDNDr26FLvKNB%2Bd%2FS3OCe1N%2B8rsPKVzfuGdXJL0wQ4wKx2adt6iGrwjz1n4FlGBLSPVG5briNM48qdAhFJSb3gO%2BS2uYAbGBBO7YQZ3UmSzZPkQZ6kz2AgA1BHGhn%2Br6%2BlVd9wJ%2BKDx7vHHVwNRrRAiL5s%2FD7QC0WbK3WoiRuEZEWxjKzkeduUm54f5Nbow%2B5tWUliovpVaCQEO0IaE5wodzI4bbEjyb2YjTdwj5gpraN8iXzdQ3MN35hM8GOqUBJrrdZocaOWlV%2FIB8dAl%2Bs8RVUf8cyQ4xwyUFQ9yYvCGnWjmntbpkZKaIm0pW7gwUaB697safeuzxJ03KUTWFxWSqdc%2BeCR2ni1IwX2qI1kUoAkrLeso34eAtWovoj3lxjNUF0BBKYwbn96mSIdl5sKbsGmIsCtNe6h5Fds2RR9j9SFuaQORhfPjj%2FrrQAt2rA32hda6w6YjM%2Bk5jdpayR2L0sSI0&X-Amz-Signature=4fe7305844c583b986465843d3f20cecb868ab45e299a032b76aa9be6907b1a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664MXUGNAO%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T203516Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFVI6FJws40erkRReKGU5U6oAB%2BI3Zs5VeiSbLQcdXcLAiBlJSMl04mf1dUWufK6BCRu%2BvOES8wAG8Lp9SuKdAd5aCqIBAjF%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMtzx59iNTcJ7iiJWjKtwDAKVf9iC4%2B3d5GnmV0gQaUi5KEsTOtGdiYBDPx%2FcFVKd8jTCEG%2F8L2FTucfOJREDWGh7L%2F1nxkNobVZhVqEysuExfjH%2FzQ%2BORc%2BY1FVKWRGynDT9ffoyMApbA1rgmjynRB%2FWvozigAjvZvrZq61x40Z6kg4orYcC9tz3zoj0c79NXn%2B%2FEdRkhSGEa%2BTzAxlDG5Wpozwl8VRqNJbJsLYLOANl%2FteUcpXjKKLnB%2B9IUwShEw4BNR2p1sUR2AMxPF9DytTyVvDAm6iSQ4tr5M8V4T0WJv%2FXxX304Y%2B4AqK2%2F%2F1Q8fCWj3GGAwJ%2BQrHdUIune9NpRQUkp%2B0F%2BMujiXbw6HV9Y9kYZy4OQ9PF1EmnipqevtRPJRL9wX7NbcJ2wzhvbAy3PnUeJerTyGfY7DH%2BVN0aA%2Bq8RER0W8p3Oiuy04uCLUZyFTDtEC7BBqyDm7ecBgsdLZDmzwa2Yv%2FAk97Ts2YOi%2F5sc%2BzAOU6IJ5FJQLha7gG3I%2FNTEHi3zQPtnA1DXobNiJQ0irtg7kWRSKr%2FEffDF3sjannDMrT5OF6MfBkluu%2F1tFGOuft7o7rpmYYvujVe5NTCvChhec3i6kGkeubkfZhN9KGRVJTg5IrW1ZDTYVqbHlIXoslhNoycw8PqEzwY6pgEYAsNA0GqRxSr9jqk5TK7BqDFB5n00fJ%2FiPWgLeHzpfrBFy1XsKjpkQgmr3yBn96TbI0JqcOJPTTpfoydfWHSy7U06WV9q7ALTEdipiJ9Z%2BwxPGuW6m%2Fhky9LmY7YBhP6eeJiCW58ggBv96cxTkKnLKNVmCbkZvNI9BnfPZVZ39WkuNemtjZfBDcSHENm3mMtPrkH%2FWvmVcC%2F7MefCC7jeaA2oE1SH&X-Amz-Signature=16aa158b433a2814b346a598824fcbfb26941fc83b81f6f41e905ccf656ecf82&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662Y4TARUH%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T203532Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF01FF0ZBCVRgG%2FKqd6qRXD5egzwxINt2%2BcycY9i6rDSAiB%2BP4l79%2BF%2BY0L%2FfMYQTsJu7%2Fl9XJABFY9dt%2FIsprqmwyqIBAjF%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMjv8tb2Upiyo1Nfd6KtwDiwZa50%2FfswMQiC6bjP51wfUIEZi%2F%2Bizhg8zfZs2tq6mxfr72AjJeai1ajRWZsayLfX8PxLa1sP0WE%2FWKG3iFv9LxpFSrCxSSkV%2FFvDFhVA%2B4WuncT2hL%2BPcQ03IdFXt9yI1egEQDL9ngsCdhRbo70dotKPp6G845aHI07Z87E6BGC5%2F8qV18Rd07Ql74HWfqmjA6fJkghPWzJ144AN1bHilLCHbOihzbojeaNwovl1i1x29FrECVjIlL0F5lFn6MTM1nUVZatikc6pGzvZZHLxx6WqLF%2BiwxHLmSEBntd6YXNDpgPK0ONKhy9qwC21RmbDK2WvwKRtzcNH0bwsSY%2FzfXJ21ylrx%2F%2Bz%2FHXF7e%2BrUT8xMfWE4fo4daAly3OzAk9zGcNRUm9N%2BUYulePINtn0hx6iT7Y2sH7CRwKaxtjiO8Q8cXt87ZhCnrJNH0IqJwOXyQpg2%2BBZpp4YY0FQxXOC%2BT02mnvhNXVOS8Mumxd8Kp%2F%2FzBi0XvL5Bk0GwD58n83xbx8PVglL1m3kExkphCX3IoMORTsAzeP74wcKSDCbBHjWsMGqQh5hC0DAMQiHvl2VBH1AGSR0wUwMl5OhhoOuivHxP9k9qwG%2B891wB%2B8JCFTFD%2BCXbUL5orJhowhfiEzwY6pgFy0Pf7zyx3mv5v1%2B5fMdh2zuv5vRC8P29jLxl3FzAG3dBS9%2F8rOYd%2FLFuqwDGjqeK4LUNIXHQBazSMWzqsattL2X0g62wKrRzGNCEJYRmyAi8Zszm1WpUoWoi02BU%2F24aqXuE0pcHVYgLYmXcdSkYOnpTy3scyOebKh%2BbC%2ByYryhqcJm%2BBy19w27MYAmjdK7Xw%2BBZZkNubMAvm6jwi4M4lgbfCUcx4&X-Amz-Signature=99194f8fcae964e8d804e3f59b7be41529aead5bd5a11819ff8f79e17c0357a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662Y4TARUH%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T203532Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF01FF0ZBCVRgG%2FKqd6qRXD5egzwxINt2%2BcycY9i6rDSAiB%2BP4l79%2BF%2BY0L%2FfMYQTsJu7%2Fl9XJABFY9dt%2FIsprqmwyqIBAjF%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMjv8tb2Upiyo1Nfd6KtwDiwZa50%2FfswMQiC6bjP51wfUIEZi%2F%2Bizhg8zfZs2tq6mxfr72AjJeai1ajRWZsayLfX8PxLa1sP0WE%2FWKG3iFv9LxpFSrCxSSkV%2FFvDFhVA%2B4WuncT2hL%2BPcQ03IdFXt9yI1egEQDL9ngsCdhRbo70dotKPp6G845aHI07Z87E6BGC5%2F8qV18Rd07Ql74HWfqmjA6fJkghPWzJ144AN1bHilLCHbOihzbojeaNwovl1i1x29FrECVjIlL0F5lFn6MTM1nUVZatikc6pGzvZZHLxx6WqLF%2BiwxHLmSEBntd6YXNDpgPK0ONKhy9qwC21RmbDK2WvwKRtzcNH0bwsSY%2FzfXJ21ylrx%2F%2Bz%2FHXF7e%2BrUT8xMfWE4fo4daAly3OzAk9zGcNRUm9N%2BUYulePINtn0hx6iT7Y2sH7CRwKaxtjiO8Q8cXt87ZhCnrJNH0IqJwOXyQpg2%2BBZpp4YY0FQxXOC%2BT02mnvhNXVOS8Mumxd8Kp%2F%2FzBi0XvL5Bk0GwD58n83xbx8PVglL1m3kExkphCX3IoMORTsAzeP74wcKSDCbBHjWsMGqQh5hC0DAMQiHvl2VBH1AGSR0wUwMl5OhhoOuivHxP9k9qwG%2B891wB%2B8JCFTFD%2BCXbUL5orJhowhfiEzwY6pgFy0Pf7zyx3mv5v1%2B5fMdh2zuv5vRC8P29jLxl3FzAG3dBS9%2F8rOYd%2FLFuqwDGjqeK4LUNIXHQBazSMWzqsattL2X0g62wKrRzGNCEJYRmyAi8Zszm1WpUoWoi02BU%2F24aqXuE0pcHVYgLYmXcdSkYOnpTy3scyOebKh%2BbC%2ByYryhqcJm%2BBy19w27MYAmjdK7Xw%2BBZZkNubMAvm6jwi4M4lgbfCUcx4&X-Amz-Signature=99194f8fcae964e8d804e3f59b7be41529aead5bd5a11819ff8f79e17c0357a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667P35NR7T%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T203532Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDZyBQfypLQaUtj%2F7bW0nopk1GPbUdH5rP%2FlDYdRduuNwIhAIU9HgVXMt1KgERciZa06peQj8ZSqXCqSJU4vvcdr9aPKogECMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzw%2FoUQF2MMFQXlD9sq3AMqglsi0BQiQn1x1NR9xXeookn02nXzQ0ZEkirEga2W24gBegkLmplU6C3xGNL1a4k2pggACviP%2FPvxi6NzQCSqayTiQZ6ze1cp5gTTO%2FvvG48WKxlXcBqGtvwmVNv30FUexhxNtpaCN5yW9gd%2BGPuQ90dOeNKEZu8alFDGXljZmBPoIdTGrlGhm1aeL2R0jVZX5bvG1oigO5jni8T5ZbGI6xhxVzcH8f1qo0t7ZRCJ0jVBk%2F7pYqwa9zu%2BDNOo0u6UvOCROIDjjVu%2FoOjJUS00fg%2B24oBfNMl8RuEdZUMT2gdJ4yDoAOs0GdqcmmfqoD5rB3cIBVgeFDJr%2BywF6QBhSe49JNa6fp0uxfZPmdnmCXfzH3mUyTcb57iaaGDbJGrKa5%2FurnrLWtEGnsBs2MCEFImp7s%2FyP5RDiyNWw7FvVyP5ECqsOKDqzzIWpPsJjmOa0a9%2FzUkBJoTOAr%2FahwLO2kleqmFS7qhdY28RZLLBnY6GnM%2BVXwH75Yk%2F%2FZEu2sAy0LpSg6Fkm3hDGKy1GrjCjU%2B0pl%2FeiXyywSqHPgsPAscom07VKdHuVP%2FO2x4%2B9PNYNyoyuBaEQorvFRK0I79DK6MQSO703FQHrAeQVP5XSfAzIZ2Vc4V7pIXx5zCO%2B4TPBjqkAZDm2%2B2ewb162cLHlgdpMpr6LiCDfdpL25%2BkiZOPyQD5Azy4HLbhZkx%2FrYIeJhknrl%2FVjAbfy%2FUnTY0R2PFpC6fmSTxA2LivGqdCkgZRL2LcbXC%2Bqb2pJKjZUVzoEtFvEqvuHRrwu2PfcJjwdEVsKdBzh2R99refANMhMq3REfGTu0zAd%2BbhbKTjkXATPjYMSFesdY%2Bbr1UXms93wh5T62tr5V91&X-Amz-Signature=af6bb52ef05cb1ad58dc168131f7c0ba35d0add74734cdda9ce7029a1527244d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

