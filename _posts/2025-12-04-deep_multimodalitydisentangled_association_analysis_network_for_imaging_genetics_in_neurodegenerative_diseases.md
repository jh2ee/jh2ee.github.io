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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666OZ2ZSMV%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T222915Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC0k5Vjl9vfpY%2B0URHgYIs9rve7DzkV1dzfRXy6r0HAtQIgTsU7O%2Bul9CLz7y%2B7n8BMH9oHQlf14aMDceMh09QUcB4qiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJNMLUF6k4WPyYrcXyrcA%2FglOT38fAFtZMPhX6W9RZA4TLlShPCDDI%2BtBh7fIM%2BRT6LT1w4wyhyTPJzxfECLf2QwlaQ%2BoMcOTUVoWXVh2%2Fwhx2SQtvhEJ0jzIgSaVGFzOifxdcYg%2F3zkgtuyX9uJL3dVZ9rbP7TBYRl9tXKwVzp7lj2D5m2pB%2BUfUjRUqtJH8EvqRIHND5B9DbmS%2FqO8Q65I7tNADkfXUNUbX6UzuBKNI%2FQ6O0%2FNIJ5gqArTiVc%2BFQ08CXrJfN%2B%2BV09LXWrlyT0tk6qjTQ4535A9%2FyzbWlR5eLlLwDp5DmUtZ5ClBFIyUBfZozTwqbDxFHSLbEGagLITbtcTh7OKNUQmiIFn3LQbE%2B0N6YocNBsY0RFXs36TwyUdw0VQ2TiKQjK2nY3chmoQfdgh916oPysfA%2FnSIT1GDUEfXfPXGMao3WPGEb%2F18aYd0SDBuMKnljwulw1BGICjErQ3Eklu1SGnHBdjhtjh9LpAReciZYS77VCvRyCqx4%2FGeU6BPbkZBrnhQORK5bCXGkYIbWPg%2Bh6%2BJ4c1pnMg7tIyypjywAmYsFc4gcKrpy9obkGigbQmUrN2gPV81W8HFPs9FegtSJiaWPUZrgS1G4b6ruNkX760lj%2FTDtz0yyA0YBFBG%2BRh%2B9XZMLbar88GOqUBgKqvSSR8hCPQfacXScReQ2Ts%2BJ%2FCWOzzrnL7recXHudE3Ympq1UYxNeSuH1i5tOJo34ye1F%2BDy7R6ugeJdmdwLKCL%2B%2B1AoeHHfUWGVsqLknhpCggb9EG%2FWZVyuD1lAiXSLlyF%2FHiq9tZ3YjGM%2Ff0ydKcJ4CmBU6cHeQj1TPQTM9cBqIF%2FlnTxOot%2FopV3%2FEE8UeU42wzZUUAgCqTpmj1ViRajlHF&X-Amz-Signature=e76796f8f37be858008e128b9accfdf40571e4b0f923a645ef8866904c1b09ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666OZ2ZSMV%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T222915Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC0k5Vjl9vfpY%2B0URHgYIs9rve7DzkV1dzfRXy6r0HAtQIgTsU7O%2Bul9CLz7y%2B7n8BMH9oHQlf14aMDceMh09QUcB4qiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJNMLUF6k4WPyYrcXyrcA%2FglOT38fAFtZMPhX6W9RZA4TLlShPCDDI%2BtBh7fIM%2BRT6LT1w4wyhyTPJzxfECLf2QwlaQ%2BoMcOTUVoWXVh2%2Fwhx2SQtvhEJ0jzIgSaVGFzOifxdcYg%2F3zkgtuyX9uJL3dVZ9rbP7TBYRl9tXKwVzp7lj2D5m2pB%2BUfUjRUqtJH8EvqRIHND5B9DbmS%2FqO8Q65I7tNADkfXUNUbX6UzuBKNI%2FQ6O0%2FNIJ5gqArTiVc%2BFQ08CXrJfN%2B%2BV09LXWrlyT0tk6qjTQ4535A9%2FyzbWlR5eLlLwDp5DmUtZ5ClBFIyUBfZozTwqbDxFHSLbEGagLITbtcTh7OKNUQmiIFn3LQbE%2B0N6YocNBsY0RFXs36TwyUdw0VQ2TiKQjK2nY3chmoQfdgh916oPysfA%2FnSIT1GDUEfXfPXGMao3WPGEb%2F18aYd0SDBuMKnljwulw1BGICjErQ3Eklu1SGnHBdjhtjh9LpAReciZYS77VCvRyCqx4%2FGeU6BPbkZBrnhQORK5bCXGkYIbWPg%2Bh6%2BJ4c1pnMg7tIyypjywAmYsFc4gcKrpy9obkGigbQmUrN2gPV81W8HFPs9FegtSJiaWPUZrgS1G4b6ruNkX760lj%2FTDtz0yyA0YBFBG%2BRh%2B9XZMLbar88GOqUBgKqvSSR8hCPQfacXScReQ2Ts%2BJ%2FCWOzzrnL7recXHudE3Ympq1UYxNeSuH1i5tOJo34ye1F%2BDy7R6ugeJdmdwLKCL%2B%2B1AoeHHfUWGVsqLknhpCggb9EG%2FWZVyuD1lAiXSLlyF%2FHiq9tZ3YjGM%2Ff0ydKcJ4CmBU6cHeQj1TPQTM9cBqIF%2FlnTxOot%2FopV3%2FEE8UeU42wzZUUAgCqTpmj1ViRajlHF&X-Amz-Signature=e76796f8f37be858008e128b9accfdf40571e4b0f923a645ef8866904c1b09ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHPJGAVR%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T222915Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDEvRNkCgSsx2Aord4cUx%2Fmr80Pbv%2BWuHtQ23%2BVP3SYhwIhAN3g2BXDmaREoU4IKZ4PvaOrAaklD0AVM0lveeMOju%2BzKogECIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw0fWkbGv%2Btnf9aLV8q3APXPIQkSnU7%2BTmJj93HHQCmFY02QC2T%2FsKA6Y6rGAhz%2FVugn5pz5NjVcXV5u02aBBcTJXEVDRHlX4Tyl3%2FhzzOlQl7GRsJ0Sxx1iZgnJTusa%2Fvb%2FXCA7q0KQ9gBmR6OAmciW8ub5twk5zzDrYLCNareTaWoUdifGrN6fPFwVogiLZbaC2Df7CxK5wFaX%2BseHqLPdqF1Xf9uy4Q2hwuD6qkn1dtpd%2FuSx58DgdSG1bU7KZNESRLFEGDOd%2BJ8PRitBw%2BIdzWYKNXUGqhTsqvgBW2lMtQoUXtB%2FGPbPmMAztAR8yOmjxsDIdAcfUxCcL9Trkt3Cb0soj7fkw0NwBTz0igmZ8g1um2og5PApaID4y0oMSR04beUFiGNNjgYhfr3RO1B1L8W1tH88vav6vaEB0vqPclXPBkVQWlCSmL8nPB9rfyE0qJN9AdhgXf27q1v8DvROzZkiR7hn%2B14rXFABcY4DDFiP5EDOxTq3AbW7Wo8dUtzcgRmDgwk1G6wYsEaDnMnLz%2BBcLs57UDqu%2FY3Ox2w0PdoTZCkOCgniEpex5vJ9moMr%2B8qp9BMHpA54eloKUkWHVVCfAg4px5lCBRwcItUvzI%2FavBiel20KVBhLODDT0ZWkAIlxO%2FcEM3t5zD72a%2FPBjqkAW5iMqtdNdmzVq81ljjLCOP0a6CD5c8S98vOj5Bjoq8FI%2BEo6sENC2Hof%2BI2drelVHlO5DZlRWbVZjPj%2BhCFi2qwkdie09%2BqKwGaBA8BlwQVyrGcnD%2Fi3VIm5r29TpbU7Q63eQNKH0BkAPDbjgYXiqd2A5WtRHtqjw5D0%2Bk%2FzMHkzhI4xnJIUXqeoYj%2BleC3oqS8bGKe1dGyhhcWolRH4V%2FHbX4u&X-Amz-Signature=9f2bf87e34465b6839dd3a894ed44e17b1cdbdf95a53d45d0c8e3ee84f4eebdd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TNDHROPS%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T222917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCGTqPwsaHzw2tWuAUzU12U26W3e1kLDUUeAVozaEJjOQIhAP1iG6SKnaYWe6r4HrxV%2BrJ4bUWpggyE0vvJMsAcWVqQKogECIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyyGt55Rmv6bzQCdXAq3ANlo5TZC1azZ9coswYhe3Ld0C30V62AxadjA1FRsG3Sqt9vkK5KwTh4yG9TtfCfuj3cDDEvca9%2FxQRptkz199snIS%2FZaowuz78y7VPaZn7DY3c0gE4SulPvTD0FtbG5uYZI1UVXhodQHqdWwbVzRTE5zfRETeOA2cD%2Fd3tMcMpC3xtTHHy%2BFF6rLGuQsH5hvuXhWIbwFe1g0JQMTprjOIkXQ7acnbY%2FCc8kw5hOY5uQu%2BPFpyiJhPYfZCA9P1goXMM89%2BaCP1RKCbA0LUbSIzs58GEGFsXYTDKY4wHpGJUkCuk1fbT4YSeynBEOmHqo1guvvvyjcGjAbh3ik0if5FU8L9MI4Kqh8fe0qi9Hac4CVy6roeIadxW7Qouc4HBDdsOIw88sP1nkFVPnskTtU4hKWEw%2Fempdh5KL%2BOjjyyKgMQwMN87qotyO%2Fmoa9m86qWhOQZJB283r99KEpgc47pKI4Dydaqs%2BiDqdtnjL4tQ%2BcCgBhChq1GNMlEaXyHXDSloGsTcusHT4o0jfyTlAKLYRFixXJE%2BooRpYhua6EyQBCCZmosl6syoSAxAnZCRQUUZsvBvQ0uWcUqaT3%2FLv9W%2Frg6T0F1GxZ7ehyMv9zeO0UlSdTx2ZaQfHrIZb0DD916%2FPBjqkAc3f08q0txFYqUen5R9%2F%2BX6vJkLpoEYJzvVc2xUzdIJ%2B6qlISfEiDPm6ZoZSjnvzEijAYMjTFMe34NanGKr6QBm1ADPWyZ46qi95iuDy7bJkP0xNZ6fl60UlNjj%2BMO1VnPVUEmv1k59hQno1CGVxm0MUNKRcIGC9OjH3fZ8iIYk8i2AFEsC%2FH4NhvVwFx43vMqy%2BqPiI7e1JJ%2FEnYIYnyI4Hkg61&X-Amz-Signature=ca4deb994283799bac2b3f0a209c13b704fd426961f9f43847274353c719e581&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TNDHROPS%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T222917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCGTqPwsaHzw2tWuAUzU12U26W3e1kLDUUeAVozaEJjOQIhAP1iG6SKnaYWe6r4HrxV%2BrJ4bUWpggyE0vvJMsAcWVqQKogECIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyyGt55Rmv6bzQCdXAq3ANlo5TZC1azZ9coswYhe3Ld0C30V62AxadjA1FRsG3Sqt9vkK5KwTh4yG9TtfCfuj3cDDEvca9%2FxQRptkz199snIS%2FZaowuz78y7VPaZn7DY3c0gE4SulPvTD0FtbG5uYZI1UVXhodQHqdWwbVzRTE5zfRETeOA2cD%2Fd3tMcMpC3xtTHHy%2BFF6rLGuQsH5hvuXhWIbwFe1g0JQMTprjOIkXQ7acnbY%2FCc8kw5hOY5uQu%2BPFpyiJhPYfZCA9P1goXMM89%2BaCP1RKCbA0LUbSIzs58GEGFsXYTDKY4wHpGJUkCuk1fbT4YSeynBEOmHqo1guvvvyjcGjAbh3ik0if5FU8L9MI4Kqh8fe0qi9Hac4CVy6roeIadxW7Qouc4HBDdsOIw88sP1nkFVPnskTtU4hKWEw%2Fempdh5KL%2BOjjyyKgMQwMN87qotyO%2Fmoa9m86qWhOQZJB283r99KEpgc47pKI4Dydaqs%2BiDqdtnjL4tQ%2BcCgBhChq1GNMlEaXyHXDSloGsTcusHT4o0jfyTlAKLYRFixXJE%2BooRpYhua6EyQBCCZmosl6syoSAxAnZCRQUUZsvBvQ0uWcUqaT3%2FLv9W%2Frg6T0F1GxZ7ehyMv9zeO0UlSdTx2ZaQfHrIZb0DD916%2FPBjqkAc3f08q0txFYqUen5R9%2F%2BX6vJkLpoEYJzvVc2xUzdIJ%2B6qlISfEiDPm6ZoZSjnvzEijAYMjTFMe34NanGKr6QBm1ADPWyZ46qi95iuDy7bJkP0xNZ6fl60UlNjj%2BMO1VnPVUEmv1k59hQno1CGVxm0MUNKRcIGC9OjH3fZ8iIYk8i2AFEsC%2FH4NhvVwFx43vMqy%2BqPiI7e1JJ%2FEnYIYnyI4Hkg61&X-Amz-Signature=08055d107ab6d71836974426ab006537d40ce54d9cd71a5fcc068308fe67b710&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663A3WYRB6%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T222917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD4TRvdf%2B2FV6%2FTq3aikF94TP3LszbWmHtIjRCE0a%2F3RwIgOreR8KQFRA35SXu2Pml4trrJDJawLYkFo9BqwbPe2aEqiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDN1ol9hY5Zau24B1fyrcAyWp2wRGzM2pkhOf6hTbDG8oN3scuTPjP3WRcvvs%2F%2FZQcCjyIiUtCtYSvyuRZ8TaImM%2FGultWQWcKMlim8SzJVZR8Vp53OnRnyjMCRtqaROAgXsCSl%2FSz3Viy8CS7wQfNGSflvdEL16sUcUAzA3X8hQXmk0SpbR592k%2F48yqHMuvj%2BEQYdkMVsLbEUeSF1wyx1TIw8hwI2QJvNHZL74RKGVuDFqOccqgNWiWyAXhCiRf4RlHJn9sg5CHVWiY%2F%2F3eQk%2B2C2jjPKOk4rjheK3hfOgSgZV5KBN5kJSXfAC2eJhQxvTNf3F8mROyPRvHYduislieFq2duOt%2Bu6e1lT6%2FyDL3KRO2S7VRg9y7cwFhSjcF5hpHXqe8dv3y1HtlY4R5zYQHC9SiI43JsXWJjYQADahd%2Fj%2FtGgOsz9ii%2B3E%2Bzc4MM1OY3u3LvTK2BubR80yvS79JGCKtYGQG1W7TNhDfNw6szWClGuXpM9E3bCMmhZWs4vSWxWY09BTAv%2BzNuNyzujUjglK5ID9uNT3UyNWmCcDmcXXWvFiVKAIK9d%2B3tqmEgberT07JDsERqmXVv37kZQDtIh2bpLmwF5FWWqaDGGBdCxPWqhFbKe1VOfQpifRO8%2BbPlOq0Alf0GmRpMPTXr88GOqUBn%2FBpXVEFXsUEfHYUDh4CD3iQDjQxkaGWYaBZg7pRNvXcq2O5CO09CRHFHMs6N9FnF6kPUlPTpjNTwyExOCpJWVjYtLu%2FdzcSoohFGalKM8jhulw47gY3kycPCjDSFKJ%2FyCgtNz5vemVVSGN8PIs8GMGeVF%2FMvAYtdsZgR%2FI6HYCL%2ByfibSLDasLKzfiaIkf9l2b995lMDwLyHpgFupnnzmtVaB%2Bd&X-Amz-Signature=04978da672c65f2c012bef7caca75a6ce31e6623c1ace53da3e144a5be1d14c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XGP2FBO6%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T222917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGZvN%2Fz57xOZKugGkWMLZoxa871tfgkUDSzYuif1VSTZAiAl2gWGvVDA9PIwg39pRG57ybsPjcThRg82lXnNPhju9iqIBAiH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMTfClia9SDOoZMLAtKtwDxP48EL8cxXTCn0RrcBiQy6rW35Dx9LhkQaaUziGawRbaHQEs%2BJ3YbO9UD3MX3lYS4QJCk42LKAnKFdQd%2FCAO0Z9TXcU99RHpeC4CvGyJ1T3HOCzUxHcXQ4jN7JPeUtLmUh02ItQaCyHrzwCI%2Bt8oUMLwaTUlp%2B5snny2X9Q3fEb2Uvo2D2C2NuDG4AmsWG5RETw%2BE3b8UdT9%2B1m%2BR5vRS%2F02XnZ6CC%2FmsRZ%2FalX6Uk8wjUlN34qFxH%2BrNBVq2UxE%2BlcjqiSLtALZsdapS2HPZeznRy9HcX7wyF0xzZWPnxpahP6hGmuhfKjLs3z5z1od6L%2BMy8B3xfU6wVq6ARhOsSgtRaN%2FmxWQ2pYfg1xhIEPEv4qPX1w%2B%2FxS8Wds%2FS3eNfLfK2Sq%2Fm9nCGfOnBJgcX8j0kh3ebJiupe3nc%2BnhV9DF8PO6iO%2BbjKda3SZN%2B9PB7uZ8CjQp7ajDz%2F4sq71hwi%2FNi6ou5WqC4OXaU8i5jb9gAZz1OLRj5NjJgoxS%2BmgOd0k3IAs4w9WdAYQIzbc9aD0XPGSDlBGKI5YbjT7sZwF0ksv5%2FzW6J%2F%2BSH7eTX1T8bTNiqncJUiw0Zw%2Bil%2BrfZ%2Fm1WdjeQQtYu3TyFEb%2B3Rh1uZje5ZEF2TdEjVYwntivzwY6pgF8wosr%2FAuvjr3IY2O6A0cjUuv52JkeBpvaeflMkA5PDIC%2F8XBDJVusfJlnqPE8jnCkFrKWlMnDz649B5ZZQFUTxCGrm%2BFCQ5rYue%2BjX%2Fn%2BnFUEjrG6ZpWwhFklbI1O8hu5d6BGVHYlar7WVpdFwLOICLUHyMbGXL2cy5P5lqQkoaXMv90FBxGdrVqtv7D%2BLrCewLWVz948h6wfhlu66%2B66jR1faJbi&X-Amz-Signature=dc5bf1331415e043eb2e4ba20b045905d074de0d558e2ad6301530daf959a773&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QFTH4OF7%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T222918Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDy0RuZWsZUZcti%2F0OWpKnPsQt%2FkIWr8gCHWwTGvb9tgwIhAPN29mbKOP3TidYyo0qfy7Dip6yYje1oE8S2FMDnLEMkKogECIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxWhEMvNKNTjatEi5wq3AMS%2ByUvqcIJfAAw29xYd%2Fdv1%2BH8UW8ZhuIgW%2FrvUK36xPOQvXZ4I%2FdVVVl5BQsmpME4i5u934p4YVlDhrj1gypH6V2HjvNQFOl5lqCVsK9ErDMcNxFfzkQlZzmY%2BjDEexGb9zs8xdA7NXhcGlflPx%2B89gepQim4pN0U1Yoim%2FzYeW4IIhK2hJqw1Dovr7QOcp07eYWKbpFSlcgQrcK7XOxasy1XrS2frZVHwKYFboVp4tmafE%2FrCwtRrzxEtbpuehWW4c2aCz9qrYVmqnp6n%2FJQpqlwNQTfyADRdce%2BV2g%2B5yVjRyPvQc7BEDo5SAJ%2FPwMGR7vhEBOCNmenCZKLP%2FZmwBOogzfov%2FyVqjHY8TXkQlokZlqeBHPpYnPsCKKyCvx671AX6qlIHYaCCvb%2FPLma63sLe1hspl1CsK8qF2h0Nnjvmw7rX39CvTHK6EyUC3rRtNBB2nuNA4om7tT05QMfGi9B9q28EgkV8MmDTvRdWZfKK646epxTJ4CWRpZh0ZT7yFMuH4QSgcCpO1nOavJZ0qcPeNPk66N10RrfFkN9QpbcETBkkrOJ2Jk3sGYukt5XSBZ2NVIutV%2FHwEc4fpKyDYolbGBnIk85zAxiC4KavHocYrYXBTSbuxeqjTD%2F16%2FPBjqkAbVagY1QE7SSVZd9RKykxC3Wt6XwO7ko%2BgB1%2FhlzeOxZd9S7j7lVyjDTKTfSbIbaGKjKiFDW0hDAU2IqMCDlRcbUW9XGL5sOfydvQtBvLUO6s0mzTPX5SqRN20c%2BA718PgOFTc8z3SJNnqjWbzAjdsT7GMMxWI1bh0TbGvDlQXvZ3dhckItGCFxR%2F4opRCp2Z7KEfet72mz%2FxaEg3DOP3zTr6ShX&X-Amz-Signature=5d75729a33ecdb9f44e936d64edcf4a0c88f955bb8c4462e66cc006d31e34bc5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WD6ZOU5W%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T222920Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDnnx%2BTn0sBywbTwBeN2oI0AEEhYEoaYlIs5oe%2FUFHZdwIgOwdqGflEsDtftYgpswqKBh2hL0o4tOJbSJXv4SOCbukqiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKtVxFAlR65IrSSo2CrcA%2B2nIcUhpNp4loU%2F%2BrsBdeZMP9ntc6JxcjQOMsaOApNvm7jeXuQn5htZ616Xa3mEEvf800jJcK7kwnMIV6FBftyMKneGoSmDhidCxjzaU%2FD509x0UJjXvGf9RkzahgxtpdiBHw7GgOCDqr6GX2MySy2HD4drJsoguRvdEKh7G%2BEc1TsINwxIFkB%2BC2HiL7OtZZK5ctTdZcmeTov7lbJ0ckqJSL7ATCKacjQ%2BSwWG6%2Biq5o2DfzwWJDSLPE5M18gGEcWL%2Fx2U6gNXtQTRAbEKpbvGwmMhFO5uoVPy%2Bk4oy2mFZvcOAyyVxPdq4mrTqtyzKAuNgTA41MMFvM3ATSGjSkfze%2F8Wbcdq5JgWpqDS7PxzIoURxZl3L3v1zUoA%2BmaHCjx7FcRt0LEBFWsWJKkrOqcNwWxEITmRaELfEXgvkSt4Pa6eblvJaIFh5aP2jI0pMMSZj%2FJ8mfbSjVzZ8vq6TuFXXNznD8jLQ5%2FD6rhGVdhc4wd41ygulDectJm3uXbagPqjywSSq67rISfmed6DJdBsVwdg0EkZOzl1bjJE78XkOsfcLvCRlOLa5JksRYpmUXcEkoGF4tohoj8cEW3ZKgSPbv2fMNsIWNdzJsAiaWPU7ISnyvPkvhmpBQ41MPTYr88GOqUB%2BTLnSpmZoUXmR%2FU7amBIGPGQcpVzHXLRnLpce0unTRt7umcY0cmQx4Hx2nXr51a3rKWd%2BOw5w064%2BreuVVtw3OaRey2qdMWljxZjV1uRbLtr3WyB6e0lqq5%2BHJt%2FXb3iIOnTBpLUrTHReZ6iA95pQZ%2FFPh%2FhtQJ83vWyu%2FAX1Ha%2F0Tm1gYxaIAPW1JCaTlbwrZ7CFmC4SQhuK%2FG89Y84iHYh4QwA&X-Amz-Signature=4722c881f600c9b3d5326ce5ef72741019f44a68f025b8830e71fc1c1ab63c95&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WD6ZOU5W%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T222920Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDnnx%2BTn0sBywbTwBeN2oI0AEEhYEoaYlIs5oe%2FUFHZdwIgOwdqGflEsDtftYgpswqKBh2hL0o4tOJbSJXv4SOCbukqiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKtVxFAlR65IrSSo2CrcA%2B2nIcUhpNp4loU%2F%2BrsBdeZMP9ntc6JxcjQOMsaOApNvm7jeXuQn5htZ616Xa3mEEvf800jJcK7kwnMIV6FBftyMKneGoSmDhidCxjzaU%2FD509x0UJjXvGf9RkzahgxtpdiBHw7GgOCDqr6GX2MySy2HD4drJsoguRvdEKh7G%2BEc1TsINwxIFkB%2BC2HiL7OtZZK5ctTdZcmeTov7lbJ0ckqJSL7ATCKacjQ%2BSwWG6%2Biq5o2DfzwWJDSLPE5M18gGEcWL%2Fx2U6gNXtQTRAbEKpbvGwmMhFO5uoVPy%2Bk4oy2mFZvcOAyyVxPdq4mrTqtyzKAuNgTA41MMFvM3ATSGjSkfze%2F8Wbcdq5JgWpqDS7PxzIoURxZl3L3v1zUoA%2BmaHCjx7FcRt0LEBFWsWJKkrOqcNwWxEITmRaELfEXgvkSt4Pa6eblvJaIFh5aP2jI0pMMSZj%2FJ8mfbSjVzZ8vq6TuFXXNznD8jLQ5%2FD6rhGVdhc4wd41ygulDectJm3uXbagPqjywSSq67rISfmed6DJdBsVwdg0EkZOzl1bjJE78XkOsfcLvCRlOLa5JksRYpmUXcEkoGF4tohoj8cEW3ZKgSPbv2fMNsIWNdzJsAiaWPU7ISnyvPkvhmpBQ41MPTYr88GOqUB%2BTLnSpmZoUXmR%2FU7amBIGPGQcpVzHXLRnLpce0unTRt7umcY0cmQx4Hx2nXr51a3rKWd%2BOw5w064%2BreuVVtw3OaRey2qdMWljxZjV1uRbLtr3WyB6e0lqq5%2BHJt%2FXb3iIOnTBpLUrTHReZ6iA95pQZ%2FFPh%2FhtQJ83vWyu%2FAX1Ha%2F0Tm1gYxaIAPW1JCaTlbwrZ7CFmC4SQhuK%2FG89Y84iHYh4QwA&X-Amz-Signature=81311f498917c42fbdf112ee5195fa508a86432e768a34cca25abdf0918c87f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RCLJ5L2R%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T222914Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD9OrL3hODxXzoLtc4x%2FOf7kTiDZIFgI522BFxc7FDxMgIgDxyaW2VGdm6w%2BJrGPiX%2BDrd7%2BmCE3OIMZN61F1uwM%2FcqiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOtSWdYt%2Fhyjx1nPDCrcAzCWDZvWdwjJ0T6X5Fg1XRQ%2FLeYFOXOW5Qo2c2sX%2BwJvvggW9ynjdsSCPyU8dOB20LnPIbWPTYwra%2B3vvR6E7bBxqoMP4Qy%2FMM%2BWI1fw9ExXLZxb0qljhW2d%2BjkZ9L%2Fq0QUDK68pjvLM7TbBEKsTLU9fSibS%2BWRKGN98gxeP66bfDg0tDdZhX%2FTLmxi1UOwPXCult3gNaQ%2FY1kREo2jJ%2B2g2CIv9lDN0fpbg%2F0de3%2FtAhO3BcjIJKC3E2u1R0ktXLqZn9eF1W3jfICV1%2BmGJs850%2Fd7vIrTZ8FovhTPoynzhnxZLSxwhIaPzA8yADHzrmUGwflPQoIK1rfbcjHVGC%2FubKXLvL6PMwbDQ1whSwwZpKzGKxzmJ7wtIweFsIzf%2FgZctfMjG94cYT3mrgTkQwUEcmUZBVPHo2cTeRda0hBUiJTYkFAilSDbDRpKBpUDubmbsKX7Qi0WqkPdlB1IRizELW9iOrRO6iFQ1duqbqHKEHhBtFMbxGlTPi6pd7J5pHxugHbwR%2BIwETuScJJUctG9TzSlacwYe7eDZLaOQS9%2BKFwGm%2FCZ%2BXzLQYkzXr7Z2AdEYIwfzcdZp01K5swIV55EzleAbgHuqa50S43CizrzibV6aHlckP3NXKoXFMM7Yr88GOqUB73XozKEmROGsXaBuGAK141vJYpS6aZXst56xDIA2FSNz%2Bcil5Cck9QlFjD6O01LU8mb2rtdStrOtNL9tVitZQ2tE2nZi8Or3dF5Z6mY92k5iC54ahKlGLcXiwMV%2FVFD5eeVZfwPt7LhlZUoQvEhmlRxtBtToJ5FTQDXj6k86cMjQEGO3Nxjz5%2BQkyx5aB5X%2FMgGUdTvcMWP3kTmHpApjvL7PTXoN&X-Amz-Signature=bbdafbc5f5795821face2b270df20b232eeb400bcd86921a272d02b203c58065&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665W36X6EI%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T222921Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCkqXIi3VskJEem1ziDWU3bbZaqxqEABbUujnPILhYu1AIgIi%2BoPnfLS7onqvKFcN6%2FO21hHEchV78GIHgjPi2yPBUqiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKR9xvv0%2BY3D73tX7SrcA3muWpplIbwsSyJaFw%2FBn1536OG5rHaHM7lFhQYAE62UA8eAIQpzgCMPWQQrObAAlehIIe9ZbhnLndtGGw1x1jBNhoha1Yy2uzH3Yv44fscWL6ZUcBYReVmFDydVVWEhPCg0RhFXC48y%2FAftfmahJ%2Fy4uEZAaJImXE6e8hFgN1zEwqmIKeKKQNJf4lu4R8UTUp%2B2%2Fhg4UXa%2BGh0CkL5r9LNEg83%2BGXZFqWzmUxlEeQCB2E6vRl7uoixe5%2F8i1ZRMi8BUA3gVec91hKWWjp2OpoQPaEpvy80XSdCaHgpWQAZV0WseeDL9mpbHVo2yXXa78Celr09fcgV6Z5Q8gNP9fEuimuM8MbY9hyOHUn%2BYF4yhK%2Fi69IqenekIiXH6hmZr90TfD40Kd2Q4mAfKvugXEVSFKnL8wI7mPDzTNGz28NlIs2QY%2FVgSiwPRBliyCxByiy2LenraDF5kJp5Y0ySBS4lLlkb9vv5bWT5SshkKNs5YjKnB9lSesvu%2BvD7Q2SXzEzKDvmC1IWH39QN3PoOzO2sKUBdqGOQUDlgdHDVQpf1B7%2FYzvKCH%2BfDQJ43%2BWhxxq8FkbfbYBnbJBUQM%2BLwMFKVd7cdEwI0LjG9400E%2FZL4f2ehvVZMzHZ84lpawMJXYr88GOqUBMbDJHVmo8PGB2dcLYY6Wmmqmdz2EjC8zkrJuhbFUtqBX500w1nJ2lhght4rzkjbuYckSbiiJe9iPjLMvy2cihysLDSM5OsBuJEJautz9qN%2B3CisM9My6zaG52jxElJloArJVaUprPcpn%2FbypC4TMGOWOUEdc42BfWV9JMY6SPW1SESYIkIopxEYvd62ZrtCMOn3ksB%2BNBZMbMsUOUdan0MSfVu24&X-Amz-Signature=1b576f8676c8e7682962602c4393d03ede6e6b3e2f09711fecb81fd00f903cfa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665W36X6EI%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T222921Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCkqXIi3VskJEem1ziDWU3bbZaqxqEABbUujnPILhYu1AIgIi%2BoPnfLS7onqvKFcN6%2FO21hHEchV78GIHgjPi2yPBUqiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKR9xvv0%2BY3D73tX7SrcA3muWpplIbwsSyJaFw%2FBn1536OG5rHaHM7lFhQYAE62UA8eAIQpzgCMPWQQrObAAlehIIe9ZbhnLndtGGw1x1jBNhoha1Yy2uzH3Yv44fscWL6ZUcBYReVmFDydVVWEhPCg0RhFXC48y%2FAftfmahJ%2Fy4uEZAaJImXE6e8hFgN1zEwqmIKeKKQNJf4lu4R8UTUp%2B2%2Fhg4UXa%2BGh0CkL5r9LNEg83%2BGXZFqWzmUxlEeQCB2E6vRl7uoixe5%2F8i1ZRMi8BUA3gVec91hKWWjp2OpoQPaEpvy80XSdCaHgpWQAZV0WseeDL9mpbHVo2yXXa78Celr09fcgV6Z5Q8gNP9fEuimuM8MbY9hyOHUn%2BYF4yhK%2Fi69IqenekIiXH6hmZr90TfD40Kd2Q4mAfKvugXEVSFKnL8wI7mPDzTNGz28NlIs2QY%2FVgSiwPRBliyCxByiy2LenraDF5kJp5Y0ySBS4lLlkb9vv5bWT5SshkKNs5YjKnB9lSesvu%2BvD7Q2SXzEzKDvmC1IWH39QN3PoOzO2sKUBdqGOQUDlgdHDVQpf1B7%2FYzvKCH%2BfDQJ43%2BWhxxq8FkbfbYBnbJBUQM%2BLwMFKVd7cdEwI0LjG9400E%2FZL4f2ehvVZMzHZ84lpawMJXYr88GOqUBMbDJHVmo8PGB2dcLYY6Wmmqmdz2EjC8zkrJuhbFUtqBX500w1nJ2lhght4rzkjbuYckSbiiJe9iPjLMvy2cihysLDSM5OsBuJEJautz9qN%2B3CisM9My6zaG52jxElJloArJVaUprPcpn%2FbypC4TMGOWOUEdc42BfWV9JMY6SPW1SESYIkIopxEYvd62ZrtCMOn3ksB%2BNBZMbMsUOUdan0MSfVu24&X-Amz-Signature=1b576f8676c8e7682962602c4393d03ede6e6b3e2f09711fecb81fd00f903cfa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666FVYO27X%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T222921Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCe0sm2Y%2B8gRJQfoM19kuSFT1JH0gPoVrfv7tq8YKKm8AIgfXxvnhitYUnHvcqBhPgd8MYYn7L%2FE%2BcnCA%2F6VwGXWt8qiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCT08A9DxXKW2BS%2FbircA%2FjfrGHXUenEf5tbVrY71xa%2FyzmSA42X0D3VGmnL3kL6WTTTKYO%2Fzv3W%2Ffkl9tgjgC7GNL23LcOcnSvRD7fo88sJ3T0IW7M2%2B27ZfA5tV7KN8grXh1awbDcd%2BR5CjOnO5J9uH8WirAPritDOz7%2Bx0m787rG6iwdo8wUqxCNodmrWd3nxUyhfHmLNCoG4Msn5124rF8hQnK2jveZAykid%2Fn%2BJ1fF5CNZ2pcOdmAH2vT4TFqlqcQvzffpSZQkGSSU6hC%2BDceGdpuhZVDBFbXf9Qt7wIOcX2UEEFUcUyyp%2BfEtl0JWBd%2BFlx8xaKmXKVdVD9y4BuPrlhkS0k1TmFeypTod1lFapUOYTXrQbpnMcLg1cyQLSwV9XD49DlIujz%2BFxhl3LJ9YQTXPgBHvSDZk%2BjDaQ%2BtLzwe0C0RZHvjDUN1XSOCwqNzM9iPbYt9btH%2BgTZFx1qDx5zg%2BK0p1Ke0NPQ6heJSQmqw44LV0Yi0xAh66doF1EK%2B2bcxWhaZc2RochufnjBKMcxqDyaOI31RXZV33LxQQ4BF1um8TUMbfLwstW2k%2FUZwLzPCo3azlAbY5dnewXgR1xwwIKoeh9koVjUcjcjHuMaBBFabqKVhiv79Yq7Zx0WCbDmsVYxkU4MMvYr88GOqUBz76ssGv4%2BQhZ3U%2Bwmney1GdEqmlGXVtggzPSjCMSaIOtv7qsXONKh%2BAFiZJm2czQSZiQbHZwT2p9S7PDaevV1CHL3B%2BZWw8RuSIdp1bYJmoGF4Q7CKDoN2uRArO%2FmyLKtmBfVFQXDwjocBPGRpwFvhAi33C86FrLibTm7Txdpx1OaIQk5E1Nv9s6pOFaj4qNq1yvzGg%2FAMytyEUW24T1%2BTGdvB%2Fz&X-Amz-Signature=64b46c68a86cc16812507c8ea731f33ebaa0f3c78f4566b6ca207196bea879f4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

