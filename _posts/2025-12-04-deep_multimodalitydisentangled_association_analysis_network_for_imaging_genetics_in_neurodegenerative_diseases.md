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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSKXTDIB%2F20260130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260130T050200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCxP5w%2BpdRCZdLuLqG94YxVhPJWOMpjyFq4Dg840a3EFQIgIDHO5jDFAjxs83bAKvQ7de2Vwp55mKZbAgJ8FYZ9900qiAQIlf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPH5erIGfSKtTbQK9CrcA%2Fhh%2BkiYKDNGYV8O0yO5ByszJ0tvIDK9jiubJz8nWcaBSPSeJTW6bd0SIfPCRsKonQQbYw%2FGxkXOduYMCCVIgJtnhwabaCJ9TJuSpQrFkTbNbns7g6hRJORGjsi7c7zuqS3v3hdEhmbmcnz02%2BjYWzSbmJqHslVBLR3F4CO%2FMwLqYSfdGZBB6JJ4Xp8or3PIW8bGhaaquR3H0jEg7sYcfDx5oVraZRKNFIpRVFMwrBmIAcYnT4r8l%2BA0AYQ%2Bq5pUp6QOkn0q1Ofb%2BtoNeFvERfNvy5yjZiSk8BsVsslevd3gk6mkkv3iLWzQr4lLv5hvFWb1bOK%2FvGYINVx4yzeTBRoGUVfxWwEUPKnXKWi7%2BqsGHZ6Bqto8QnyHbw4WAgJX68B2AZYgOQ4VOFdMugmC%2FtyCnC7eyaKbH77ymAPj60qK6GKpWlalNO5L5Q6xyA7e2jvd%2FX4U1o4YQe7EODZTSPpqd80j4hrFQR%2BKuuzdBsUbjQwXqQLhAucfj4ZI6OrpUKvncEitIIzxdce2Y1cIYrHjpEZ6UGzzNXYu1us5d3hreTHKsZuC7AwMTM%2Fj9o63yUzl9sVLQtMETuoaha%2F%2B7ZPh%2B6zJCrjIX6sOpzBJZiW2eR0jFAUuyKUhGhe9MIDZ8MsGOqUBL1M3fIwiOVyynlXbonec6GNbrzR6HB4MH9hl%2F2Kc0FVLIigscejnXJt976WUd9gzPEQqOzWx44SaW%2B8hvoLg3B6S4mgOQG7JMoWjFFhOFB1gAt8WA8Tjn73l1Va87DIOk5gkmJkhwA6nvk3hz%2BZQBd%2FiJjSOLWnUfeONqCQ7iNp4qHtePfpvHmmGiFXa%2BdGfdkPtADUndQtOYGror1Q80%2FJgvI7y&X-Amz-Signature=c1712f36afcfda913470c19dc80e48a43b8339f4770f1dfb6c8802e914ddd131&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSKXTDIB%2F20260130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260130T050200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCxP5w%2BpdRCZdLuLqG94YxVhPJWOMpjyFq4Dg840a3EFQIgIDHO5jDFAjxs83bAKvQ7de2Vwp55mKZbAgJ8FYZ9900qiAQIlf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPH5erIGfSKtTbQK9CrcA%2Fhh%2BkiYKDNGYV8O0yO5ByszJ0tvIDK9jiubJz8nWcaBSPSeJTW6bd0SIfPCRsKonQQbYw%2FGxkXOduYMCCVIgJtnhwabaCJ9TJuSpQrFkTbNbns7g6hRJORGjsi7c7zuqS3v3hdEhmbmcnz02%2BjYWzSbmJqHslVBLR3F4CO%2FMwLqYSfdGZBB6JJ4Xp8or3PIW8bGhaaquR3H0jEg7sYcfDx5oVraZRKNFIpRVFMwrBmIAcYnT4r8l%2BA0AYQ%2Bq5pUp6QOkn0q1Ofb%2BtoNeFvERfNvy5yjZiSk8BsVsslevd3gk6mkkv3iLWzQr4lLv5hvFWb1bOK%2FvGYINVx4yzeTBRoGUVfxWwEUPKnXKWi7%2BqsGHZ6Bqto8QnyHbw4WAgJX68B2AZYgOQ4VOFdMugmC%2FtyCnC7eyaKbH77ymAPj60qK6GKpWlalNO5L5Q6xyA7e2jvd%2FX4U1o4YQe7EODZTSPpqd80j4hrFQR%2BKuuzdBsUbjQwXqQLhAucfj4ZI6OrpUKvncEitIIzxdce2Y1cIYrHjpEZ6UGzzNXYu1us5d3hreTHKsZuC7AwMTM%2Fj9o63yUzl9sVLQtMETuoaha%2F%2B7ZPh%2B6zJCrjIX6sOpzBJZiW2eR0jFAUuyKUhGhe9MIDZ8MsGOqUBL1M3fIwiOVyynlXbonec6GNbrzR6HB4MH9hl%2F2Kc0FVLIigscejnXJt976WUd9gzPEQqOzWx44SaW%2B8hvoLg3B6S4mgOQG7JMoWjFFhOFB1gAt8WA8Tjn73l1Va87DIOk5gkmJkhwA6nvk3hz%2BZQBd%2FiJjSOLWnUfeONqCQ7iNp4qHtePfpvHmmGiFXa%2BdGfdkPtADUndQtOYGror1Q80%2FJgvI7y&X-Amz-Signature=c1712f36afcfda913470c19dc80e48a43b8339f4770f1dfb6c8802e914ddd131&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TV2FC4JJ%2F20260130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260130T050200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDm8l574nPOfNIKPSSmnSDLfPbODPTPN7qgbRgAtm2seQIgYNZ9fjQprDBTta3BavkfNJ1rF1FCXYYxAC6%2FghgZQ5oqiAQIlf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDK1rRyxbd4GnOZbOvyrcA%2FbrN%2BT75M0T459%2BgA8ZbA2hXOLsNzpqeU6P7RiTmt74U846Froy%2BYkKgiNy%2BKTzeX8D%2BKdr5DyzO44ydyrrDcYV1rWDC9dUwaQLxs0fSggQf5eajY20Zn%2FVGmUMY%2FfI6AQtdatG%2F0IXDTMmwD%2Fus%2BBvHDIsoMp7KpdqbcXW930tQ6NO%2BLc2OZsiwxHD4Fx0fI5Z4uuc9V0lAQ%2B1dYIarW1x1NbeELCEuk4nCCIu3oImK1OyTvGXUe6L%2FEiQ%2B4l3QrBlYX%2FErqfo2RuWtAdG0WQOEivGzA4TXSF5kpBWeAIIsrX2841XeP3PDkyNuAoXs7XfbOGKVTaoM3xNH%2BEhaMUAnaftR%2BhVOukX6edMP4Fr2wJudOPVl5%2BlH1o8AA6S1C8o7R4wOncNSTM%2FFKjs3ETGeS98fv3ArF6CAtJi%2FgxygFkQjmtzThojOXfgL9lVLPaQYEWqz8KCZJdIj3jugLxYiB6pGZ5KQmiqdGvqiwN8lQCgTICy6xB7I%2F17nWVYXpDpQeBAkIkvBbgaEhrNtkIdE1H69SnfhZfQ7G3TPM9o2dKYjyp5bIIx9I2%2FAZC4iJv1iz4SmqWLb9bnAMVUywIN8P01KypPnOfKpVtX3XFIDiifRfEj0vJvOVjAMLTY8MsGOqUBSKQD5yhMpPVwZ44CxQPtm%2FEehZB5UVIbf%2BcW28GUFNxkX5%2F%2FfE%2BVz7G08IqUNPtAwGhSi4g3VfTbZ6nK1HzgM7%2FX33vR4khfKwuiarhkSAalD7Lp3f%2FiB6Tvy%2FDYGPEOQjxPkKJEeVKNTRd%2B1XJ%2FyCo145y3RgZ8cXAx4eTwCBuTx0qM1iH9IRvL8sck6uq0tQJz1GGlD5WM8%2BmlEyDjyBlSUq0l&X-Amz-Signature=07b8f707ca495488fca2025d9c494d402904833b009205777eb1ee89801d67e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UIN3JPFC%2F20260130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260130T050205Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCUd%2FAx2yxpSaXZVoq6tz%2F5MRsJsSWrQdf7lJeWIhqnqQIhAMj2FZufRoJM09SPiwKzfT%2BSeZfRuBlymGaZBr3h7PB9KogECJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzsL1Qf0wpAipuSiEQq3AMXJ7e%2BUp4rF2uKImTjlow9EBUj%2FhdBf7tJJpRQFohaNlvbKkXxd%2Bww6rCl77UDOzLJl6GbJxV3badssB%2FuhWNN5S1bhE2FmlOCfBjKVoKPDFrLlhu6IAEeYLYqINJG8DA8ElmSd5sGjGqSSEAt3J33UnPt6rj%2BgsMXuoms9XyQEmTMcy8dX5S1C3NAWY9j1M8%2F0uBvBOA1aP9YJEHLs1y%2BYW4c7BW9qVrZddb%2FQGhqp3hMabfcwz0%2BCOzLBKUaELGNEpgprqC47Zot8Uqp2cEFpd7KjgyznhwAoA28PG%2B0ncNiSZV28%2FLtZ5o1p6LEG5dhzlbISuTQk6jhK8bORosccgGY3rSHwicqJWTkI9l0cpP%2FvvMRnNb97BriXdEbU1A6pyEvq7vBi%2F9P%2Fu8pKxMCV2PTDC1d7yohWvN8VKMIb6BmsQD1f21syNC16WTs5fTRHkPWLSmBMighHz2a2FqSQEZlz9g4YQmDiH5N0M%2F7R6noeHIkAnV3jJhiNlHm32lSTHcRJbihEkf86BxdT1j%2Fm8hHJRWbX5HiNzidzQTHLmDNjI9Oq85fL7sG7VRjcJDo91Ft0T%2BL97Nh3C36c9obbPJpLo%2Fo9BNu2c%2Bocf5hh0BFSXSPPCtYUvlXRTD%2F2PDLBjqkASgOP3lbdTfRQ5bjBqMnoDisV1p9fmx1t3Q09bZ49JdVPyVUQC%2B%2FH7oUDZLEoThGKQ2zLly5%2BCczQihh3ukaBrvC74cr1dBWRDY%2FDurDkVKQy3cbYCI71QFrZ9NfEx28P0CTKLafPMwECva2fXvHhEY67BtaJiCZy7HUcEKTyeKRiSziq2kYtu3uFZiPPmOmqCsHw7%2FhqJ4hQtUDdNj6vkYGg5Pa&X-Amz-Signature=cfe215ffeb522b647b5aa8ab7ef65683ee3c24e0a62256f5435a2094e311e849&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UIN3JPFC%2F20260130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260130T050205Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCUd%2FAx2yxpSaXZVoq6tz%2F5MRsJsSWrQdf7lJeWIhqnqQIhAMj2FZufRoJM09SPiwKzfT%2BSeZfRuBlymGaZBr3h7PB9KogECJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzsL1Qf0wpAipuSiEQq3AMXJ7e%2BUp4rF2uKImTjlow9EBUj%2FhdBf7tJJpRQFohaNlvbKkXxd%2Bww6rCl77UDOzLJl6GbJxV3badssB%2FuhWNN5S1bhE2FmlOCfBjKVoKPDFrLlhu6IAEeYLYqINJG8DA8ElmSd5sGjGqSSEAt3J33UnPt6rj%2BgsMXuoms9XyQEmTMcy8dX5S1C3NAWY9j1M8%2F0uBvBOA1aP9YJEHLs1y%2BYW4c7BW9qVrZddb%2FQGhqp3hMabfcwz0%2BCOzLBKUaELGNEpgprqC47Zot8Uqp2cEFpd7KjgyznhwAoA28PG%2B0ncNiSZV28%2FLtZ5o1p6LEG5dhzlbISuTQk6jhK8bORosccgGY3rSHwicqJWTkI9l0cpP%2FvvMRnNb97BriXdEbU1A6pyEvq7vBi%2F9P%2Fu8pKxMCV2PTDC1d7yohWvN8VKMIb6BmsQD1f21syNC16WTs5fTRHkPWLSmBMighHz2a2FqSQEZlz9g4YQmDiH5N0M%2F7R6noeHIkAnV3jJhiNlHm32lSTHcRJbihEkf86BxdT1j%2Fm8hHJRWbX5HiNzidzQTHLmDNjI9Oq85fL7sG7VRjcJDo91Ft0T%2BL97Nh3C36c9obbPJpLo%2Fo9BNu2c%2Bocf5hh0BFSXSPPCtYUvlXRTD%2F2PDLBjqkASgOP3lbdTfRQ5bjBqMnoDisV1p9fmx1t3Q09bZ49JdVPyVUQC%2B%2FH7oUDZLEoThGKQ2zLly5%2BCczQihh3ukaBrvC74cr1dBWRDY%2FDurDkVKQy3cbYCI71QFrZ9NfEx28P0CTKLafPMwECva2fXvHhEY67BtaJiCZy7HUcEKTyeKRiSziq2kYtu3uFZiPPmOmqCsHw7%2FhqJ4hQtUDdNj6vkYGg5Pa&X-Amz-Signature=0ac2f64d98d59c5fb2af3dd66bae77fbc39a10278911c2f6d96bcf7a87990c31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ULG5R4AM%2F20260130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260130T050208Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDxsjhLqhLNwbbgFGMkhuEbTOiusE8ZSAFD%2FzUXMoFU7AIhAILmPIZ94m60c7BexOPxSuDu2XnBy%2BtNFK59d4azQnDXKogECJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxkladyey8jdsvt73gq3ANpZCnXg3SNVp%2FCPNxnK35eXNJfXyRoxEJVMr2B2rBu8N7y0oI15qy1wfhcoZUTvrO5478aVlSZUK1GFxKDGy%2FrsIofuxNPGmw358XIUqNLp1Kh3Fgib3djnSPpe3EiQvGepUzVJvChXSxvsehr%2ByuPlZByrrsqLU0rOJMYbSD6OlScMrwOZMjj4XM20p6ptXwJfzQvO1PPcaleu4gZLJHodRuTIJbcTlZhOh%2BGxXyqj62MCUuVGFeUyn9JGGs2pIPCjIPR3wbVqodJKplm3%2BvaR7kM%2FAocLW%2Bn27hqt8sKL2cF0gvpRIDktC8SgwarIfldt%2FGNdFTctXfC82bMMEnoODhMFvbobN19KMMp%2B7aJw9b8E4xX0k3vFSsMMwQ9jcylSfq8D17OSt%2B7%2FrmNYNs5n%2FWC9w8sZ8QvfVmcEiIRF4VioxTqZKsnwKXqz%2B1jGLfrWZcBDY5vZMu9Ux9DMYV%2FbXipJIVp%2BY8QErT2qiWExCNnyb2dQjWPDwlkDYiZXWixvdcU0o67so0fwJEKDU2d5jbW8INx5WK4Va8sdItWXrST4ZjMVjv%2Ft6bwzJl2dhboMD6WgQVeBqzGuQ4eCcHT5inqAg8hnt83t4Z2B3tsKdQ1cqYKfjpVJxsziTDH2PDLBjqkAWUSRgw0aM39paU7oNN%2Br7BYzIR7HrDr5m8BSKrnPUHswUMzIwlhju5YfPwxenqDh8UQG5HVP2phNZlNFoT4z739C7GOwGneQ%2BmQk8xUl492GEgAIprcf9L2aOrtg08ZBGYXijJJOGRVjE%2FaA33IwIwQMaqH2zHvI46FM233zGUXAeCw2qhibJCPIaqLIGE2Mft52myVH3fqP3kZWlISOQVNp6Xf&X-Amz-Signature=484a7b9311ccfe70ca6772cbae5d59766dbc81f6b880d4ec7a5c2a51ca7fdd29&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664DBVNTFJ%2F20260130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260130T050209Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDm7ykNt7DRLUwuyIAmc05uVm9WIcvVHFsb4jG6%2FPILgAIgUvFmKXvCAwX0hD7W1rQmFE6kGSqGv0GNGEelZEkNLoAqiAQIlf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNTa3lMZU861vQmApCrcA3%2FcHSlrQPl8Br160OpvbpmsI0LBWQJp1Uy6SY0mBAu8XXQcFU1KCfou5ioJwbfchrnfxRHGmUOrGqgVrgi24Rz9%2BJfK0s24cbgH5Tp%2FmT78EkFVI1WEtvLhhI9qkO2qBe0veCsnzcTWlO4LQXJiTMcKaKHMTC80ggSlFT7bXEqXfDyEi%2BnNnO3ce4dBsGLU4OtPWx62x%2Bg%2FxCzGwQfUVtOkC9B7OIYXJkvgkse6%2BHew%2F3u%2BktLKb2tPt9dRTavwvx0eMFgFhhLhbPTAye3eQwKVrgTMSXVcsQF0lfMj5GN6tMJqOFzM1lVPCETy8WMKCjzg4siRB3DJQCLNteTA0sw7bbtgT4ZaD6TMY2oMoowHfrSia6ubWRU8RRHUxfHsqSX3j74BzMRiBj1kMtxjBKt87mcxvAuSZXT0IoKM9Ali1AH%2BdkwRtxlZvmugsQr6Jm%2BJ%2BUZgxzrVWmFPvbQZ6e7%2BXeV%2FI%2BUd2vmbbkpCmFh0L35fw4UwukPi%2FdNhpDhWJqxYuPVPL%2BCo518wMNhqzpf7%2BIkr8SBFLhWDBtyjz4EL%2BeLSHvu2%2BQhG7hhAWBx9WbQyqW%2FhmrlBEKf2AmJYXRkT7veJ0MX1N4ExG4I3VAmIUfCDiBsedDplT1MOMMLZ8MsGOqUBfyvnwFoNhxN9GKIFn27xM%2Bva92ZjkKesLoJdnYoV2y3k34%2FUmliAUzvpbxjZ3LSWuVZiGoFhT67k6dOK5zln7FPNv%2FmsvQMVUppKvIZCo67dkdlYKu98KxPWPcmQ0yncLo9P7RbeMRGVQ950%2B8WKGDMarzHKA2bC2Zu5me4XpWZBSIG%2BK11U6mx25g3y6oeASmKaASioxxRg96%2B8gKsuU9sXeOs1&X-Amz-Signature=fb6b9b5396df589a093cd4eddc7989c5dc44792272b4c5fb3e98c5ee15a4cede&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TUFT52GM%2F20260130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260130T050211Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCLMgPM5Y9HlYPJbyL5bZ3tefYzDtABDywp%2FvhvqYJtJAIhALuSrTnNcr6qcGY7mRO9j07FPgQ9fXdhkIAy0BokkTr4KogECJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzQqmZwPqdZ%2B9tk3q8q3APX02J2DcK54TwRIBp%2Ft3Kebaj11FBlAd%2BWBWsR5%2FmIPspmyL3hVeno6cqPDkgmATAD%2FUspqj1MnZMJ9TcktpGUNT9xTiLBpCHrTB5gceAbT%2BnqxMgc0m2FjcBcSA%2BI3pPWpcyer1ucP9NyQzTUGMoUySX%2FqsRaCehjm6NnWvYf0YQi7YinXEDyfBeWOcVzrpr%2FUnC%2B%2F7QS%2BzZeDOEm4ndn0kEuLgejHN7NntNAqOX4gHFPbgC1UL7T5PIHF903rSn0b8rqYp3IItO13fbWqk0sCCAGCkjVBGLyjMQQ1OflW6QNuxkrR4PvbbqsIQ6riroTiaL0%2FHFO0%2Beu0H3O4Ru27eYHX7M7HvbimRY49rLp2%2BrplGBkpoR2qIt3gPK3IZ9JWaAlw0254dZW6IksMb8mhHLGfPfEfV90R8tIM8BfLWHFpfRJ5lWnLBaDLMcj0nBejMQeZRUaDXYL0m6HMaH5rDBxMvlDCD3OiVzmswj4Ig2kSJDbEwkMzI5J7cKpuS0Zk12vFPeC3vcSRh8Zlr43DG7te04HbK9CL3%2BK9ImYmR5xk%2B%2Bbm7vkgrP6b35O22IFx0Q9FTq1yrabZmkvAREyjcNr7G7jMHgr45xO%2F0wS4InWfwx8oQzd%2BhZh%2BDDl2PDLBjqkAbT7zhM0A1oB1IhwONEXnWRFjsBkP1jFUFLl2YzrU%2BGltt622R2RULsn2a6nAyQDXrzVe8BgEgtpNSQ5f5%2BtPvBaSVV7ICmpBRDFDQHJcEFSDFMA7k3RuHRK4GEWbux7k8qJ5JuQCIQFVGOLjTkhXZak50tEmGkrPUlCpc2lmr%2BLqbXGPpGv5yIPL%2FekCFrWsJNsv5bLTRG0p4faRsaj%2FiycWsJr&X-Amz-Signature=c3ac5af424255df9fa2c274a33be5568ca6c337d23f549486970838159968b1f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJ3DJ5FC%2F20260130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260130T050215Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDi0jr24oBifuxCa58R3Y1MxP%2BqlhB7pG3B%2FkTVHUirRQIhANsZuepR0NT5tnFeBeBbeziE5Z9fbRbzCGz4%2B%2Fz1F0OrKogECJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzZakVIljTrWaUlOLQq3AO02wUIeRoSWmfzr3%2ByFUw%2B5WW6Y%2BJ7TH4cX1NGbIY8480%2Fa%2F7m9X3Tt3qimHOt3JZxFSLObZiNR5lYlkKf4pRlJdNPHq9YxWSW2NogfVGaZH8iDcOJB8A2ffqkzkrSQSURDk%2BZ0v4465H0nyZ4U8jG5at1lqgBzgYo8Dk%2FE9nda8Q69Fp3j%2Fe04cIFbtdVB2L019oLQP3a8wYjQpRJJ1ztlt0XwMahDiT0d3baX%2B77srxtZ%2BmsDFQvU8ZkBUZ%2F5SQJznlbMdAG6pEkoxfxyMFaHz6USh9EDDjWFLVzhBHgCkAjCKaemQC0PBhLQD5wx9DxvoA%2BB8MsNw%2FTPEqusSl%2BU0Qi1AybsdAvXBogB6zki0cHQllLYI1%2FL5YGiB%2Bn9OZrpZz4GPZrkAlQUXQ8wpooEoW0wcDwyV1WpLNeKkw91CjwXF%2BoavwSvb8giUjpOLLK4r9b3MRdvOxG5IrKploPA%2BfZ8OdAHBFheT2j99tUmxXknzTaBZ0KlWZ7WpD9DPC%2FffEX7MJdO1l%2BI9jtqoMb83322nASWlqnoV2Irzc6aSoSE093R6O4jqdjC8X4fhmJQQPyHL7upc1mSO3KYp0UenlmQXQRM8jLZicmaBaHfrgk%2BtJ%2F8BGYsI6mKjC02PDLBjqkAaasMj%2B6yesyFwIM6Z%2FF9wlBXV89MtRfreO15UCKCQrobD61zKWCDEDsUBmYT4LrdaB%2BgQqD62AgwFG2GK6J%2F5QiOrO%2F5BOBE2xgsohgHlnQKcwCA%2FKGW3ydOPjyKqk78B0IKH6btuei4te7WDFpSluRwCvXZ0f118le3WziLjUKWGlvLJD2jY0IpxD%2BVRH%2BciDl2cR2%2F9CBAUYLzCG7z5QYfvr5&X-Amz-Signature=a6808cdc7ecd84d815bdb8f02fb340a44e88de4cd5d15c64a0d41410f44adb32&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJ3DJ5FC%2F20260130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260130T050215Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDi0jr24oBifuxCa58R3Y1MxP%2BqlhB7pG3B%2FkTVHUirRQIhANsZuepR0NT5tnFeBeBbeziE5Z9fbRbzCGz4%2B%2Fz1F0OrKogECJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzZakVIljTrWaUlOLQq3AO02wUIeRoSWmfzr3%2ByFUw%2B5WW6Y%2BJ7TH4cX1NGbIY8480%2Fa%2F7m9X3Tt3qimHOt3JZxFSLObZiNR5lYlkKf4pRlJdNPHq9YxWSW2NogfVGaZH8iDcOJB8A2ffqkzkrSQSURDk%2BZ0v4465H0nyZ4U8jG5at1lqgBzgYo8Dk%2FE9nda8Q69Fp3j%2Fe04cIFbtdVB2L019oLQP3a8wYjQpRJJ1ztlt0XwMahDiT0d3baX%2B77srxtZ%2BmsDFQvU8ZkBUZ%2F5SQJznlbMdAG6pEkoxfxyMFaHz6USh9EDDjWFLVzhBHgCkAjCKaemQC0PBhLQD5wx9DxvoA%2BB8MsNw%2FTPEqusSl%2BU0Qi1AybsdAvXBogB6zki0cHQllLYI1%2FL5YGiB%2Bn9OZrpZz4GPZrkAlQUXQ8wpooEoW0wcDwyV1WpLNeKkw91CjwXF%2BoavwSvb8giUjpOLLK4r9b3MRdvOxG5IrKploPA%2BfZ8OdAHBFheT2j99tUmxXknzTaBZ0KlWZ7WpD9DPC%2FffEX7MJdO1l%2BI9jtqoMb83322nASWlqnoV2Irzc6aSoSE093R6O4jqdjC8X4fhmJQQPyHL7upc1mSO3KYp0UenlmQXQRM8jLZicmaBaHfrgk%2BtJ%2F8BGYsI6mKjC02PDLBjqkAaasMj%2B6yesyFwIM6Z%2FF9wlBXV89MtRfreO15UCKCQrobD61zKWCDEDsUBmYT4LrdaB%2BgQqD62AgwFG2GK6J%2F5QiOrO%2F5BOBE2xgsohgHlnQKcwCA%2FKGW3ydOPjyKqk78B0IKH6btuei4te7WDFpSluRwCvXZ0f118le3WziLjUKWGlvLJD2jY0IpxD%2BVRH%2BciDl2cR2%2F9CBAUYLzCG7z5QYfvr5&X-Amz-Signature=43b7d3281b0f6e10d5b51cb0c48f924356d77cd8fa5eaa8ab2ea690f2787d304&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y2AEJ5ZT%2F20260130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260130T050156Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBHk1FQU%2Bnhho%2BfU22SQmV3aKMFTYJ3jBmfkx%2FHTDVatAiEAg6j5kysPhqGWuq%2ByLybjbzU471kQBKmPiEbvF5jdYc8qiAQIlf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCKglJkKr4StkMTnPyrcA18yMwAFFZVA2AJktQvLAhFBZTnSTUPKo4CgPkuHb412TJ9b5aamP2yxCD2nPsxJV3HZATLEnYF8q2uwW6LYyivZgefZxUBlG0IwXNAd2bMTb%2BRMUfqIAFi7%2FEDuLM0QZV95S8Jxz3rPUReirnXG3Jt2UvlSunQsxYUS3ij%2B5kz2ANgtgnxpCW3Kj6%2BRZAnqMGhFyc5CE6Vm9Vgk%2FPrFJH0cf6BWT7s3C5zhqndug%2BINgJWBM4gQf2wRUv99NzsBGIDPPIaRk1oz6D6azqvbNRGA5RWzMgrRzQyb%2BSCF%2FAqz%2F47OBdKehyIOMak4p29lI7lGIIASXr51r1PqgGOPEP3rfOUamLHhtqMA4JBuK5aG8rQrz10Y0StXyCL0p6mSMX7UeXi6YYHAdZM%2FmhT%2FtseETBE%2FFMUj17juLV%2F8hEWZdmT1SKWYnl%2FT4Y2dP3qmEGTk%2FRKMqD2K8q6WOAcL%2FBAJiDkkDC6OK%2FH5rY7ERrTMu%2BcWRq8d4lX56pu3h3%2BVbMlhparcbxRIAY%2BunYLM3SJM3Zx9GLdBx8j9skzZOMJUS%2FFeERrMEOVpNsOoj1YEXNslXn1JXk%2FIc8f6zLmL%2B8fGdq5D39m58%2F5bfM5Y7JaX1SMo%2BniNJwz0p8bkMObZ8MsGOqUBkBOplYPHMLz0BHWzBXLK0%2FQ1JzSwiTuQLa9YZFlCHCPpjP1o9bndsLJ0lnNumiUed5GRxRitYQaT4j7AiYWwRDINDFf70KDMtCtjf4sZViUBo5hhZOAjrQRh2sfPi0mGh0vX6mDhCrxE%2FH2cOzMRIzuZNTwjWGeyoHGHeY0clhb3nwJ6ISCCvQc9TmSQ5zCinfKRzL9upg9UNS53ie4FnU0fbQZf&X-Amz-Signature=2529804d798cad5009b5b6b5bf3ce145d4117f1d6c3625b72b660244d889121a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662IEWPUB5%2F20260130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260130T050216Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDSraeIYPmaZndwpCsirBBsSVV6qTcMT%2B26Uo2Q9tyoagIgIX%2F4DCUyI9Mf8K598zPwAfgPvaAghVe6zi6GE9qd%2B4EqiAQIlf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJIV6QneRNS2NyC9BCrcA5xcfe%2BdykBSt%2BwxP05qR%2FPEPtjyRW3Hz56D3Y31vlw4citp2Cx5HjKLL8UWtUj%2FKw3F2GfOVkiysHC7sm2S0MsWzAyyV1LgzNqUBH2%2BwAeziZGMvgWO8xRvWIQHoTDe%2BAnqCRBrt%2BTNY098zhZME0IgGQGHswEW3eQ%2F8J0unZzelCmOV%2B%2Fgst2w%2FdNFNJ7uKhKbqJ4d8Qk3Hvu%2F%2BNz4oV%2BoFT9s9HgZDDWA4whwHMv9MbGc%2Fvf8%2FzLiDNzGUjcv%2B2UvwHNPIuGIkmLFD1SkPevPswgGoVSdcS04I9zXzC%2FSXltBXKrYhHKLC1FkSkhkZi%2FVhkQQEwpKRA22N8rZvvppmM4mzKMxkQrr9%2FLvNQMzqTZvf%2FbUupGse5gEbXsU6kBJFtBqHJwBZbTHLlbpCEzv7O4KYWMwKvRrwEgl5XnWZLbsaLcOOFMLVJ%2F6uA3EDHyqNkKz0MLMgNc3XhV2Y3AW%2BethyJY7NpKnqPYf2V5n%2F%2FYpQedGH1xWjxNXiQXZyKY%2BzZfIuo6pFhXPLSswnG%2F5o9nPE%2F0rlCj6zG%2BjTBYaCgEwEDmpzcecwLUmVyQzt3iAQc8gZB3P5%2FulPEjXm2yD2mgBRa7HMc2wC2L%2BRlNeE4yua6nawWIgW%2BiNMMLZ8MsGOqUBJa1j3NavcpS6hD%2BzHqGJx3A9E8s4%2FC2BKZagVRcZ6Cn8Ge%2F3QsApioAyjCY7o%2Bf9jAnRNJsSxhFDeFdWrR8oMVvLCgiYML4oDzPG76WI%2FIFeoJWxAfjN6Q6UzxwhrafGr4glKs2LYyXhwJ2O8jT%2B6JtwtJOQqsT1Kg7WaYspbRxAMwgn%2FrN4G4A%2BRHPwTdMb31TKbEKdpVzVWEVfchuz6eY72p82&X-Amz-Signature=912a53454e3d09c93ea2711edfa8b4ea3e0a062f057b6dcd68444893b49cad8f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662IEWPUB5%2F20260130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260130T050216Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDSraeIYPmaZndwpCsirBBsSVV6qTcMT%2B26Uo2Q9tyoagIgIX%2F4DCUyI9Mf8K598zPwAfgPvaAghVe6zi6GE9qd%2B4EqiAQIlf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJIV6QneRNS2NyC9BCrcA5xcfe%2BdykBSt%2BwxP05qR%2FPEPtjyRW3Hz56D3Y31vlw4citp2Cx5HjKLL8UWtUj%2FKw3F2GfOVkiysHC7sm2S0MsWzAyyV1LgzNqUBH2%2BwAeziZGMvgWO8xRvWIQHoTDe%2BAnqCRBrt%2BTNY098zhZME0IgGQGHswEW3eQ%2F8J0unZzelCmOV%2B%2Fgst2w%2FdNFNJ7uKhKbqJ4d8Qk3Hvu%2F%2BNz4oV%2BoFT9s9HgZDDWA4whwHMv9MbGc%2Fvf8%2FzLiDNzGUjcv%2B2UvwHNPIuGIkmLFD1SkPevPswgGoVSdcS04I9zXzC%2FSXltBXKrYhHKLC1FkSkhkZi%2FVhkQQEwpKRA22N8rZvvppmM4mzKMxkQrr9%2FLvNQMzqTZvf%2FbUupGse5gEbXsU6kBJFtBqHJwBZbTHLlbpCEzv7O4KYWMwKvRrwEgl5XnWZLbsaLcOOFMLVJ%2F6uA3EDHyqNkKz0MLMgNc3XhV2Y3AW%2BethyJY7NpKnqPYf2V5n%2F%2FYpQedGH1xWjxNXiQXZyKY%2BzZfIuo6pFhXPLSswnG%2F5o9nPE%2F0rlCj6zG%2BjTBYaCgEwEDmpzcecwLUmVyQzt3iAQc8gZB3P5%2FulPEjXm2yD2mgBRa7HMc2wC2L%2BRlNeE4yua6nawWIgW%2BiNMMLZ8MsGOqUBJa1j3NavcpS6hD%2BzHqGJx3A9E8s4%2FC2BKZagVRcZ6Cn8Ge%2F3QsApioAyjCY7o%2Bf9jAnRNJsSxhFDeFdWrR8oMVvLCgiYML4oDzPG76WI%2FIFeoJWxAfjN6Q6UzxwhrafGr4glKs2LYyXhwJ2O8jT%2B6JtwtJOQqsT1Kg7WaYspbRxAMwgn%2FrN4G4A%2BRHPwTdMb31TKbEKdpVzVWEVfchuz6eY72p82&X-Amz-Signature=912a53454e3d09c93ea2711edfa8b4ea3e0a062f057b6dcd68444893b49cad8f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X5QLO5AF%2F20260130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260130T050216Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCaO0Is6PgWtrFVs1hQT6Z2eZJq%2F%2BGVKvmptY8diKPLlwIgB40nFM46I%2BYbjJDF5y2TxNK4Q4fk76bijDKHu28PpI0qiAQIlf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGzhrvvSdLSSy%2BJzvyrcA53y2w3AGtN0uqqfkh0Qx%2BlpW%2FjKcbaPfJcOonZCyIPwfg9%2F0O%2FhRdglar19bYeaM2GZgiOHFQLooXM1IrHuU%2F2VRRTHfJoyGJih2idx7Oehh%2BS76i%2FYFkjsYGzqSqggg3zhwFFaY1fhra%2Fg6fi6U7zGkXnDDT6YWzIBL0NUVSfckmgeqSBOAogCMkf9DFFVflvIm8deX1gMH0rQHa9aeBE4C8ipvMjxXmvB%2FD4yOi5T7YU7r8hR3UQXdqTQVtMy5D3NJZ8cICUKVj0wrOAVN2SuEQnX%2BKzh7M%2FgBINXfQco%2Fd8iCR9rkpKzMCbfCQXknhFVSvpQHBDUTDDhxbYnhnuk2sdfZ%2BmuotACtAzpZwbOeKE2ujyguXcFMyGuJiEIbGsROzoKr%2FCCsFxdHFQzL4HacZUI3qNrx6xFdfCW1uVQLfwXUryrPH3og7VymI4fZLOyuC%2BCtr%2Fv4jQomrcW8yxOtxUGBGO70yF8TAdaD4ziOB6GRililj8oUjIBD4MrvuZNqY%2Bhl7IqzGFbRAZpV%2FVtoh%2Bt3UKIq0iMMk3m2u52eZjz4MRDbxgiAtN%2BJ%2BLw6PW4yDU0ivCW7yTODzEb5kyu3C9e7u9SovbvUs27Xrg0H4ypGLX9%2FgdaxQRIMJrZ8MsGOqUB6s9UESceyfp2oiVGKaQB69ZREU1xYeDoHO8VG%2BPTC%2BNyuvYtaSsiDmCBpKfainngx8PqQN5RUGCDdAlv2NK6e5uZ90m4qUrm6Qk174Ko24JPVwGmrZOrHCqvJo0VBfYoT5vSEANh5UFQ%2F2lnDe0nRV2HsSY%2BKJLM9a0R2bmGUPyzuWqDeRDe9xfKoRSlJjK%2BZXAMVjZr4WU77i2f1oaNxyA9Sva6&X-Amz-Signature=8f93566cc8101d13bcb448f0e084ba66d2a5e1c8f75441658a0bf08fd2ca0fab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

