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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SGIG3F7K%2F20251227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251227T170105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICjwT9p8m52AytVW2aQY1lgeA35yTpyxGep5I6BPomIFAiB4RZTBrWAenEkyk%2B8K1DxxKoRBVEKono6eF72dhB3cfyr%2FAwhtEAAaDDYzNzQyMzE4MzgwNSIMkFVjznav7P%2FDdZz8KtwDZQVX9tybuJ4yx%2B6QpNkukAIbA0TQLZXAt4rk6PZCIXmaLrHQMH1mugWwVCkHuLxBRJr1kAtxZ6OuX%2FDfKdp5b7kGgMK46yDVPCFCl5Uxcf6p2OLO1XduuMf1HYOuUqFb2EiTLCvP%2BV%2FG4%2FTNDU8J58TX1tobgdU9Ft0g1sfwMxYMkl8EOq0D%2B%2F08Ghu8C1Ih1R6K360RXsT9COe2F%2Fo3AHNM6zZdbRIMP%2FE8TW6TlKgXORoLa6BCIckiHS0RfscrBUV3c25tpMKHWe5M2Jjjmlj9uAC2mfbIAKkc2jkvR6ZEwapxAA8UksrGlmfYH5sqDtUQSih7%2Bq24nXamjIE6P2CujXqQvNiIk%2FsZhb30xE4AJg2vsayG0YfaFCSP4w2HBMLWsLQnQOcYupQpDNg%2FsRLzCwYKyMCA3BCrwd3QftEXNcHkv6MnO1zZsRJF4pUbCzgfv1CySbVbfOCoryivHeFiGFhxnfyqI1m9Lop0S7NNY0nrHvL4RVdjtmh3UgzzY6Q77QoutHxKdDofRhPFxGmrDfYwePyHmOL122C4SZNUS8lc6%2BFHyy3kejtyaT7Yz4HLb0DNWO5TbdAgSQ8Q1Fxy6zKYy25BeRlMKzdhcQXBLmIfCJEibmO9gIgwg5K%2FygY6pgHf3OkDw5Uh0tTLRfkKtcN8GnDfl2OhBmuTI9I54sC8Y4oi5B%2B0Qm9O9sFqufhSNN%2BqO7kzDVau4CUrwtk076NdxuAYsb7xvCvxWj5wfdIeNxkAN%2B8VQBHHZzQ8861q1BnwEyqFrntOLpohyUTYp1axozVCoeSKoQuC9I57r3YHfRbhKyaE208YK3OVnHZWfDh%2F1mamUfQXZDU4gfo4zf%2BG11vHUiL2&X-Amz-Signature=19ad79c9ad29e52064bd80ed30106b4e81a77ddb55abf34dd74a57f30175da31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SGIG3F7K%2F20251227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251227T170105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICjwT9p8m52AytVW2aQY1lgeA35yTpyxGep5I6BPomIFAiB4RZTBrWAenEkyk%2B8K1DxxKoRBVEKono6eF72dhB3cfyr%2FAwhtEAAaDDYzNzQyMzE4MzgwNSIMkFVjznav7P%2FDdZz8KtwDZQVX9tybuJ4yx%2B6QpNkukAIbA0TQLZXAt4rk6PZCIXmaLrHQMH1mugWwVCkHuLxBRJr1kAtxZ6OuX%2FDfKdp5b7kGgMK46yDVPCFCl5Uxcf6p2OLO1XduuMf1HYOuUqFb2EiTLCvP%2BV%2FG4%2FTNDU8J58TX1tobgdU9Ft0g1sfwMxYMkl8EOq0D%2B%2F08Ghu8C1Ih1R6K360RXsT9COe2F%2Fo3AHNM6zZdbRIMP%2FE8TW6TlKgXORoLa6BCIckiHS0RfscrBUV3c25tpMKHWe5M2Jjjmlj9uAC2mfbIAKkc2jkvR6ZEwapxAA8UksrGlmfYH5sqDtUQSih7%2Bq24nXamjIE6P2CujXqQvNiIk%2FsZhb30xE4AJg2vsayG0YfaFCSP4w2HBMLWsLQnQOcYupQpDNg%2FsRLzCwYKyMCA3BCrwd3QftEXNcHkv6MnO1zZsRJF4pUbCzgfv1CySbVbfOCoryivHeFiGFhxnfyqI1m9Lop0S7NNY0nrHvL4RVdjtmh3UgzzY6Q77QoutHxKdDofRhPFxGmrDfYwePyHmOL122C4SZNUS8lc6%2BFHyy3kejtyaT7Yz4HLb0DNWO5TbdAgSQ8Q1Fxy6zKYy25BeRlMKzdhcQXBLmIfCJEibmO9gIgwg5K%2FygY6pgHf3OkDw5Uh0tTLRfkKtcN8GnDfl2OhBmuTI9I54sC8Y4oi5B%2B0Qm9O9sFqufhSNN%2BqO7kzDVau4CUrwtk076NdxuAYsb7xvCvxWj5wfdIeNxkAN%2B8VQBHHZzQ8861q1BnwEyqFrntOLpohyUTYp1axozVCoeSKoQuC9I57r3YHfRbhKyaE208YK3OVnHZWfDh%2F1mamUfQXZDU4gfo4zf%2BG11vHUiL2&X-Amz-Signature=19ad79c9ad29e52064bd80ed30106b4e81a77ddb55abf34dd74a57f30175da31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z4MLJ7YL%2F20251227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251227T170108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCzXacWTfFZBoNP5hoocjbCsCHIybXUIiZatDRKlyrnnQIhAK%2F4yQtTNnwXIk8jS58VJlk6vuHCjGIu1Q6VHDnnL%2BV0Kv8DCG0QABoMNjM3NDIzMTgzODA1IgySg5mj5W3IYMhyfM8q3AOg4IAuuUO2qnnH8QJ9lixip3z08g%2BcA6Xgzd%2FUDQ2YfR9f06dXZtzMycWPkWH4QIoPx9L1z7wARy%2B1dsFXrrc0SdI67x5yoAGys10jqcCooF93B%2BvNTPuME%2FkYA4woA19Z%2FcEHJcecaT%2BFZumZ0p%2BRQWxoBaCCgZn4rzeAE349IciNPlIWYG7YswUYRnJDLnFv98HKPIcBPup5oczsNY9jwF1kednot%2BkGxnqVqjiuAoHV%2BELsjWxYQoJQoGntK63ALmyJ9O9tPFlU5UL0JXp5WpE%2BK6bhOcswViwayndJgQooRnjlJUjq2KXji%2BTW5jmEIBDi6sM7j5ffW0JhowGFr5Ghdry2hOyqeOzXB4S0vAOg1Qp9qPbUXJ%2F6MS3l%2B3wO8SG03wesUMWSCak1aDQhdqBdHL9k%2BLQg02m%2F3iZhZCw%2FgP1KJ7hkjGRfjPHyOyvsOfUeHANJdn6dNNBmggNpWcQL6uhkoopN6FshdJeJdPGsQKTgD3mVtJlJA7JvyFz1%2BzSi%2BYaDWj8hq1u5UVHFNpjgdTMrypzW1tvbPyFANDXvqaJ8vO9%2B0i5Tv0zwHluVhxcEY5i1wrJd%2FaNQVt2gnZjZeNyybzO00tz7UZE%2Fqup7xwiXglhDmqK1UzDzl7%2FKBjqkAS3ka7D0qCNsmvE4sg4wWzfwn3t5HmheInAhaEhPnFSujcrPGuE8EhPyTAmS8ZRjgbfyIT1gWEZJYvRUetQOoJqG2gZRypLUI6znw3zd10gV1iwYgi6k2tipBTeIZcBxTHN1yhPXGvCu693KiQpNqPs8Iiy9rIJI0bbbSdh9i7RGSQ4IXQ8pql2fYRlv2CnZjfJhBlCKE5rsuPYNeMw5bBU2OsH8&X-Amz-Signature=643e557fe01195cc7971e8414382cd31894215db5d8f2a0f8183cc3b7b620061&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TR7I3ZO6%2F20251227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251227T170109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEfoNjjH2YllnN%2Bx8HuwNQpRldes0%2FAmnrAUyklP3t6WAiAc%2Fejx3lt4jm1Nm4q6TvszU0G7rHJwzgTUYZfh7OUriCr%2FAwhtEAAaDDYzNzQyMzE4MzgwNSIMLDrUYiaJGbQQkhW%2FKtwDQzRTYDyAzWq20gp3%2F2fY9eUokpALMGZ6ZB4qv1i0DkYIc%2FvJkyhl4LYRUotB7ws9XfcgINS%2FmOOfsmbigY5IvTWkPNTsLpCtJ639GlL7aKhoPYlXanFBRL177cSIjmCLZTZpNav6ndXAy%2B2QApfJeTRCs9%2FuqdnCBkJ14w%2FpLo2dL45apDTVqMJgs4dsRka4netVuvXua2PN9wIQZz4UZrk8Y8QVuyUUXt3i%2Fu8vwwcsWIdy7Bq1uywqcvNCqwCoipmL1EKmby5bMXlLqqmbhvxIYUYHnjg%2Bnx%2BEUwSydtV%2FzqGRuLA60lMT1Dq8DkIEHxjcnzYfjOChLbRa8732yktjzoNrPRSfjMd%2B%2FQFHHXopd0Ng7ryY6hEOh86AAGqIneN4kB%2BVIvbXEVm2NFL9oJ9yX3AN2W%2BapKbyq%2B6UawgMpF0hajHn7XwVHXh9am8A%2FAyvu3ylqqTJzBjHUtw4i2gc5eFmscgJ%2BoBLtP9iF4rcybiLKpfqi74bgjOiE0fLo2RhqW7AmKBvgnqAdAEvlzXRxgQRpyy28SrqIDh84mOVj3ZxMdoDGogUSbTDYah52ASoFGoXIMbfOcIYWZp2okYygRnS6jt77PBI9eXBWZ7GzZEmjGPDt1kUUpwwpZW%2FygY6pgFLWnpCeAFALEoVWriutpqWSH0ZoKxerOGdHIcmCSYe%2FXH1IctTAanzBMm1GTNY9J6bZfMiaYNW8%2FKz852meoYgNLpyh9gUdn%2Fq%2BRIqe2rVzJX85xGpLEMWz5nnCLHL1HaPBtxO1KahsNsHvPEcho2XajU8GwJX4ffYYhn3lPd%2BXHPiwPgf5QwRGaYVLU0roUp5AfvFI96kUwpH%2BtgGIZVGZLfmzZ8I&X-Amz-Signature=e8e9231ba22404c1bd61587bc6c9c0cd6b964dfde1adfc78c524f4735ca95298&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TR7I3ZO6%2F20251227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251227T170109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEfoNjjH2YllnN%2Bx8HuwNQpRldes0%2FAmnrAUyklP3t6WAiAc%2Fejx3lt4jm1Nm4q6TvszU0G7rHJwzgTUYZfh7OUriCr%2FAwhtEAAaDDYzNzQyMzE4MzgwNSIMLDrUYiaJGbQQkhW%2FKtwDQzRTYDyAzWq20gp3%2F2fY9eUokpALMGZ6ZB4qv1i0DkYIc%2FvJkyhl4LYRUotB7ws9XfcgINS%2FmOOfsmbigY5IvTWkPNTsLpCtJ639GlL7aKhoPYlXanFBRL177cSIjmCLZTZpNav6ndXAy%2B2QApfJeTRCs9%2FuqdnCBkJ14w%2FpLo2dL45apDTVqMJgs4dsRka4netVuvXua2PN9wIQZz4UZrk8Y8QVuyUUXt3i%2Fu8vwwcsWIdy7Bq1uywqcvNCqwCoipmL1EKmby5bMXlLqqmbhvxIYUYHnjg%2Bnx%2BEUwSydtV%2FzqGRuLA60lMT1Dq8DkIEHxjcnzYfjOChLbRa8732yktjzoNrPRSfjMd%2B%2FQFHHXopd0Ng7ryY6hEOh86AAGqIneN4kB%2BVIvbXEVm2NFL9oJ9yX3AN2W%2BapKbyq%2B6UawgMpF0hajHn7XwVHXh9am8A%2FAyvu3ylqqTJzBjHUtw4i2gc5eFmscgJ%2BoBLtP9iF4rcybiLKpfqi74bgjOiE0fLo2RhqW7AmKBvgnqAdAEvlzXRxgQRpyy28SrqIDh84mOVj3ZxMdoDGogUSbTDYah52ASoFGoXIMbfOcIYWZp2okYygRnS6jt77PBI9eXBWZ7GzZEmjGPDt1kUUpwwpZW%2FygY6pgFLWnpCeAFALEoVWriutpqWSH0ZoKxerOGdHIcmCSYe%2FXH1IctTAanzBMm1GTNY9J6bZfMiaYNW8%2FKz852meoYgNLpyh9gUdn%2Fq%2BRIqe2rVzJX85xGpLEMWz5nnCLHL1HaPBtxO1KahsNsHvPEcho2XajU8GwJX4ffYYhn3lPd%2BXHPiwPgf5QwRGaYVLU0roUp5AfvFI96kUwpH%2BtgGIZVGZLfmzZ8I&X-Amz-Signature=0f9914292e147f036e1e5b4a75a4c5d20873c537a7fd8681eedbb5c0dd198c62&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VAS7CCVZ%2F20251227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251227T170110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCZeG5WcqOzbOc6QNSjulIdCgKrRoSSKBSsjiGFiToUXwIgWjAC0ZVwy6S6U0vPQDmUc%2FnMzoyw6zcEp0JMN9X0d1sq%2FwMIbRAAGgw2Mzc0MjMxODM4MDUiDObD8b%2FJlwX0JcicpCrcAzT%2BCFEsaJV9NOS5AMXtriG3Cc8Qx9XYMlroqPnYre1ILswjZK43Ax3OFpSMov8a5mDrkA9aRiU%2B%2Be%2BzfsH83olYsPKxdKtfloiOt8aeonSS3JQE5haannC2h%2Bz82nMtjIDMFfz8CmEJXz6aEyDCHah3QPGC9NzG04GBUpWdf%2Ffan2R%2BXO42Y4gtP%2B8uCdhpM48SdBnhYAxPUhbvATGw1F1%2F7m5eNKX8P2ZR4CQAdNo8GWHHLPZuedouR6da1nVLpRFunnTP58RL2nephEA2iNDQDJARY7vMJkWGOKvcRiB2%2B6ePHkTKH%2BS0eZeICfz15raX8x2eyz%2BtwuWEaFzkuoVhVrAU1xvGWjnWGRTT4c2oedFGed65et8CPzK2%2F%2Fmvz3iBbiQLlU4FYsm9UXfWJ%2F9tg2iS1mKyi66Fxdy%2B9fAuoFJCgZ11qXLupgkKQ2BfUO8U6jp9KnCKlbIewYW4SQMhvwutbck3cZbw1tgSngD2TAz72AgqKUqG6QLy75mwR7%2FwAM9EIzYn5G0roxxHQcJKn7vwE6ayOyfL6KyxF2VRxQkiusbXF5Q7HyNIbbqWKTMWKrdc%2F%2FLs3CDvlVHikVCC0nu5nzVOEKjNiFtdd75TFh42HKys86K90vB5MM2Rv8oGOqUB0OzzqGiV05yNLoLHelWTiT%2F2ZtosSBdxACdut2nI7OyluF8w%2Bsa65Ov5IQXvU2ek36mWMlJHT5ZW6gD8jsQ96MdtlKHCq1KIxTx8VMjA9Rpx8SNXviBAbb2vxAvh63cZ7b8SoBQJeTtOIm9%2BJ0%2Bmp67HMbcgSN1bwwje8aCMiE9VYH%2BVqaIN%2F5b3JqsdUrmMVgJRPSMm9kL2LNxJXYooZ%2BKhZql5&X-Amz-Signature=b7ba1fe99589877c19d7d9a125a5884e831f5f315fa947e319dbfb7eed724c15&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W5QSEJY3%2F20251227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251227T170110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD6reeHAPW0%2FZQr7DkEi4C2KQmicgD8Esua78hS9iaJVwIhAPcxvUXh1KWJ6eAIpEYeDykmflN7c5PLjSdCwvQmz4uAKv8DCHAQABoMNjM3NDIzMTgzODA1IgydV0JFK3Zq0Zh4sHgq3ANKttrH7X0tziWoUHsVpU7PSLYAVwIMreTwST2zpT3Dl112oVyCz4bM%2Fxd8JFHJhdH1q7aXpKxhWtZiOjl5BJshcO8rOoIOW%2Bz1ewL9PFLMEaX6L5WKoTZ49tLvn%2FZmQYKn0K3h%2BfG7i04BYjxB4EalHGnzjDGvFpp7DM9efOWd7Q0rOqlx27t6eYpZMnmt1%2BGWSIbfsfByhkmSmz8ow5Z6MfTb8cK8qJuq%2ByAl0FdT%2BG%2BVvnGpEMmzytMuVjHTswIROBxtEqKZvarIpsWsdZBeOla8SbtPwCbxvCtQpfOjVtOpqlAngxUOCG%2F%2FZPTyL0CCyH7IcyH7qWC25lPxglrGxH6WlWcQJuEmz2iJzpL3kLWZj6bHwxBpVupPWVcLmSqxOuKACmTjDsv7DCmOqY%2FO7AG06UgTVZZP8TTQBqP9YH%2FmOgLF9dUZ0Hju%2BpdrBov2whsNkQHOWo0YLVaSmZwWPN0J1E1V47aMHc7M1PDGxadncVGLxCZSx%2FcUvAIy4RtvA0efP%2FvZ%2FMcCGMMCvY2CYaDKXencRHI%2BThlhdp2Z4sIKvElfYXwIlGTVLPhRz2uDRSeKN6MxEljF9EkWrC85L2m2giO2s3mGonAbAQG8g1U%2BI00ze9Xsb%2BI1PTCw67%2FKBjqkAXwoCAR1M9oUmG8DFb3fOLU58veHLCzeyueh0l1uG%2FZ49ZbEeozDAGGQTiZDsr183QG80KACYioeI4%2FgFhMt%2FHdkbE6bPFrKa3Psi%2Bv6iCy0zn6FcJyqoYbg%2FrQX4IT56ZuJF8efjA%2BOslr7%2BYtOe51W%2B9wfYTABNVNcdOQ5fKyJv4bKBvc0nuzx24m3YHwv%2BoHfJMBaZNbdStVm3h2HktXr8KX3&X-Amz-Signature=10b0d703d95e52328b18025931cb3e441efb1df9b9e174c5a5fb1eb5f43c4330&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZOC4MTBH%2F20251227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251227T170111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDeUNeUTcxGuOXalngLkE3PLhzs1NR8b3OgLVD0SIpe%2BAIhAI22tOsyAjFyCZ2PmSjHKjVFM65uY4qwwOdAABniQnV7Kv8DCG0QABoMNjM3NDIzMTgzODA1IgzV6S9MdIPHC5HPeBQq3ANveyLlOYbefkxIzp%2Bl7WtFYD9BUyXv0Wr4Rw9PmbsUQt9b2LAs5adcFRy8BGKzXxnWCFs%2Fqk0xdlF5LUGxFjvwJGVPhPJAx%2F%2FP%2BNd8OWdiuFTn7vUoMoumATu0RwH89%2F7PfdznI2G5WFBlbH%2FaWJpKcsYe1AmwOpprRDN42ws08ewsW0yXG2SZxRk9%2FohBB4vg4oXXPTWansyFWQJgvcQUmX7z45w81C8I0XCZNtl%2Fi0Wh796dOomZrLfRfNQN6SPSK2LycE3%2FPjZSUzL%2FCSta8qsd9UR9Vohq5muo9Bp%2BPjWMCv9B8A3FQxSn96Gj4Y44%2BAF0WsbB67Y1IyuoTqPeThH0yHdn7oKs02TkEJn%2FO%2BGoLT1B8adw8GLi%2BKFJa3bwsGqLL%2BnMKFAIHgqtgzgnF1HO7VcqeL%2BBKSaxggl33tlK%2FWvA2%2FycXMT2tZR16kwAHchmDqVHcDNxJdTKLpc36nxwWy%2F37B240h0kn1CyyC2IORvfk4RDqGZpduiFj0UG%2BgeGbdwPJHz02pBWZIU77%2B%2BF2LGsXmXTdFncYhUOa1X9rfO0Drv0JEaH3FlNJRuWHwTKbSJvpOKT1HcdAKp1HQzXnmVeCD9MLuXdPq5%2B%2B8Xuig2Z9O3UXdqIJTDwhr%2FKBjqkAVnBxPkA%2B2k5iO8j%2Bk0dQ8mxoDoZhuTsSTFsAk%2FAVLN49DyTNtP6wXbLC6VNuUYmXIDyBeV7Fu9rhW2CZiCMtUEDcvWmSGW9atV7zMlOeabOP8ID%2BwiRFzHYz4y737l8VR302sTQ7tZy7hXunPGonUX41uO2i5FzGsAttME5L7YK3WkxUTV4Jsu6ph9IIGDs8C90OJ5O%2BBbkk66mFesjg9Ui2Oci&X-Amz-Signature=f6d2fa05dd713666d01a4427f793b143654f5d8d452fb697134bd8dd5ff18f09&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XY7T7MXD%2F20251227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251227T170112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDorzFqF4HJWZg2WfUbEEGMb72O3tnx3kv4w5VjQYmPngIgCG%2Bs4cDBM1Z34sXmu%2Bv4FShVu4NRDynICKsibufQbHgq%2FwMIcBAAGgw2Mzc0MjMxODM4MDUiDGtGwTQgsJBN14ypsCrcA1eypuSYjjy%2B8wmuJt5HsxmSFkGsjL91fJ8wm15t%2F%2FSZ6Ig2kHuTSkzFRXbJR9N1VJAypdIcAz%2Fp%2FU5wZcHwOnV3tTKeGEjL2lPxx%2F88QU68vmB3LDHO5Uh4W7UUOrzYM3Bgt9x0yiAMgBzpK%2B%2BuwvUsO%2FtBTA9J0jigSCp%2Fgs%2FQTH52OpL21YcDHoroXU82J%2FnAXMPPeAaBmEjLNfZtMwBQA9w81BH5%2FSPQhCsVLKUkyMxfZ3yqlycnu6fexJStb5e2nnLShS7rgHGTIfSAHhAIygoSQUprAqnJSx9oN8yEnpWrzza1t6bKXGtCijMsZlIpG5Kj8XXr9W0zC4328xDiLXJ2PN2KWr7CXQCaKGTwKMXHRWwKayQxqM4vgfJuQDjIB9VrftnMCHm1th4Cer9rvcXOQOx4BXoAF273YLNh9EttDLAHamZqYVhHMyKTKMlq6KeYT%2B1bmoWpJNIo0PgfUzhWUJ6KekFXxo1NjIeOsZYMZDrVVj5mAJEI%2Fdbb5oQ9Q7cvXvaWQaF2KF9uxm%2Bno2gS2ILadtdfSvcK8fKa%2F3oa102GYPNO%2BKoFpggm32zX612AJLFZsKOhy%2FWo1ITm92FgomZTp5JKDgCCoZwUYEFYtZIFHoQ538y%2FMLnrv8oGOqUBOLm0jPwya1ZiRszJnt2oJNlcAhTfP2bplYx1Ago3%2B5QKV2Xm3F48J3wyfXAHZvjyoQoZOCJHVsBXc%2BmnByjjAkP77Imtu2Od0esde08fUmHvoKAzaN%2FQyGcZr%2FVZpZvORHSG%2FFOGp8v4473CuNhs6r2KAVHIiMHHidDX3eW2B%2BoM4GeSbO64UMHoW6cIA5jypieYv%2Fv392K4v4c1J1slRAcR8h4T&X-Amz-Signature=9a180a9a2e99f399f26c0b632e5b676a0938d1c3680b9d3f29adccb280048e9c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XY7T7MXD%2F20251227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251227T170112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDorzFqF4HJWZg2WfUbEEGMb72O3tnx3kv4w5VjQYmPngIgCG%2Bs4cDBM1Z34sXmu%2Bv4FShVu4NRDynICKsibufQbHgq%2FwMIcBAAGgw2Mzc0MjMxODM4MDUiDGtGwTQgsJBN14ypsCrcA1eypuSYjjy%2B8wmuJt5HsxmSFkGsjL91fJ8wm15t%2F%2FSZ6Ig2kHuTSkzFRXbJR9N1VJAypdIcAz%2Fp%2FU5wZcHwOnV3tTKeGEjL2lPxx%2F88QU68vmB3LDHO5Uh4W7UUOrzYM3Bgt9x0yiAMgBzpK%2B%2BuwvUsO%2FtBTA9J0jigSCp%2Fgs%2FQTH52OpL21YcDHoroXU82J%2FnAXMPPeAaBmEjLNfZtMwBQA9w81BH5%2FSPQhCsVLKUkyMxfZ3yqlycnu6fexJStb5e2nnLShS7rgHGTIfSAHhAIygoSQUprAqnJSx9oN8yEnpWrzza1t6bKXGtCijMsZlIpG5Kj8XXr9W0zC4328xDiLXJ2PN2KWr7CXQCaKGTwKMXHRWwKayQxqM4vgfJuQDjIB9VrftnMCHm1th4Cer9rvcXOQOx4BXoAF273YLNh9EttDLAHamZqYVhHMyKTKMlq6KeYT%2B1bmoWpJNIo0PgfUzhWUJ6KekFXxo1NjIeOsZYMZDrVVj5mAJEI%2Fdbb5oQ9Q7cvXvaWQaF2KF9uxm%2Bno2gS2ILadtdfSvcK8fKa%2F3oa102GYPNO%2BKoFpggm32zX612AJLFZsKOhy%2FWo1ITm92FgomZTp5JKDgCCoZwUYEFYtZIFHoQ538y%2FMLnrv8oGOqUBOLm0jPwya1ZiRszJnt2oJNlcAhTfP2bplYx1Ago3%2B5QKV2Xm3F48J3wyfXAHZvjyoQoZOCJHVsBXc%2BmnByjjAkP77Imtu2Od0esde08fUmHvoKAzaN%2FQyGcZr%2FVZpZvORHSG%2FFOGp8v4473CuNhs6r2KAVHIiMHHidDX3eW2B%2BoM4GeSbO64UMHoW6cIA5jypieYv%2Fv392K4v4c1J1slRAcR8h4T&X-Amz-Signature=93194676b63b8fef9f48d38f0657a90b3ae3528f0497a2c518fb09314698c22b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XF3TI7T5%2F20251227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251227T170102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCt7Q8UlyJGLTW8ftKW0FoYU9Y5A%2BBzjnDvMPsVwz5EkwIhAL9k0GP2x5eLv3uX568qibRTDyLEmhR8Kd0Gh%2B7pzvxlKv8DCG0QABoMNjM3NDIzMTgzODA1IgySe7KBxBZvPfVoemMq3AOOiFEnq3OTUb359cBjCPhGEEba836QnXXPq%2BvbfKLv5jWdSlbCqwxOU9GtKHxox4QFtIgsOGFfvu1ZUxngi9ywxthA467BMWRFbPHWlv7MUQXzSFxD7GjgtsF0TwN%2F18tI2g5F09aApu09o7qaXBsUWP0ga%2FPT%2F1K%2F0ZwlDOb1HNk4xM%2FvQDV4C6tAFyWREnY4yaeQOkstvZCV6EHRNbdFxvbQTKqlQXFRBFkguHkYHAIt1cLfm2WDp5vBT5i2MizUqBJxSlfOlWvg5noOJKIU5RV3GSWa4lzu73x1%2BSVRz%2FGx4%2BXAHx9W0WgBMjuHhWrFucTYR7uqE9Ybj0mtc%2Fvm79YdEeimWP1s28OezyoxxnpQ%2FoaWqMQ0IIyLVF5P2oPftRS284lJfRrQ5P5%2B9GaFW6b00Gm4vbnteBaGv2AqNEEoICCJ7JnGWBl5wvpH4Mx9138cU2TTKMY9CUt2D9vEpXvPQRlUVmnYJL66RGjdESYafV7GygkPf8nBj4tQNio3AYwkWgwW1n8ee52vj4T1oY0AsyN9vgAiNLgU7TSWGJw3L%2Fi%2FI730iCTA5BU5KVcBrJcLPg3WZyZipuGAzUPpxKA1IibJHYJYscD2TfLRT%2FjkfGH%2FdNLSrnNcazDOlr%2FKBjqkAdhl8ox2S8PTBP%2FWd3BoyEkqnQ7iTbJTn6GWe0Loz7IIXBq4RxadymO9D6EHua7Jpag%2F4RkUbcyk8UwbMhjpMwtNxspX4kfr846eJC5QvgWkBzPa50kwzEDVcMLLi5DKrvq42hwdGBbEMnQLbKvAQutUcJiY%2BPHwh6GImYHhwrrGyvzzhNwahLPLewa1GBeRAkAdpxJT3Yd%2FXWuDuscx8jNDHWhI&X-Amz-Signature=a0c9483fe997fe5b5d5501d1e1d68d1b89b947a2407ba2b64e4d8a06a339c3ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QOOMTVAZ%2F20251227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251227T170117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAj5POBKEnlybCM%2BAtjz2zWJ0DYhAn1ui9vzrjnc9TpjAiAbLJTY5q6XmGKtdJQ1IEfhpNxVVBb8TyM5SoDyOPgOQir%2FAwhtEAAaDDYzNzQyMzE4MzgwNSIMF%2FUnrP0NELF7SwJjKtwDXHk2nXtSXvBnSDFTwyW9VLs3Z9Oorle8fKspZPKvzpjM8x6bEuORmHhj27ViPUfhEx4Rru4HxRWw%2B0PebtqYacVyKAh36XqiFLhVl5cbm39UD7XrvKkhf0WKgROCYRI4XhlCQsouOnTFi1K%2BS4xd1XLM5OHYu%2B5QXbnBORoia5wxgFTuSoBUNL5Bt6ndnGsnvgPx%2FO0UlN9gsGTabpRj2UIQNmjCz7ULDaBqroOTBa13JFW1GLMFMxlkfAn0NVkCE7x9Wb6gRceOOiwvsN%2B6Lw2gt7mjdQfq622TOOKz354JBIJKniKsjd8WFCtCMvnc7Ell7%2Bxc%2FDDJsuoQVmPUC%2B%2Fzlf47qFAqJL1ASKu7Gwc%2B8B%2BqxZMMpGtXWOzmxL4HU0sFSf8B2NqzkiZe2oEX4VH%2BpxJdF%2FWWXbE3xea7CAMTK3oE%2FRrL%2BbnmDXzE3S67e6%2FBxUxPAqUj4eELFRazUyCFDITNDz%2BBZQL7nxKz%2BOQD3nKUsP5c54xseXc8YQaEK9u47sPwMA8t2ui6FH2uvlSrvCe%2BuPvA%2F6ZIaN2r8lp5Gc1ufVuD86KPVUW2LkMYO9%2B%2Bn7%2BGpJGzsPLrmsVz1cA4IkgdVmSXMXoFo33KBnQvPHbyG2aPjQOeNEIw%2F5q%2FygY6pgEbly8f2iDu9CzXTqOD%2FktHiql7qxl%2F7E6De39pV8MhP6KZgE3eGGQUduL2jpqDk8vphSogWaqT9ZO1YVeaQKT6S8Mli2xN62XD2Yi0LlJsxDpGVeMnEGyNAkWdVq9mOK6Ldmcn%2ByEksunpjTTaz%2FWw3l6yTIOQxTeJh0LpqKtM%2BM4vKSO%2BSlFx2kpzg30CrLU0RaFY5C3cMVrEN9hdLUodJ6zIufEt&X-Amz-Signature=5482b2b88cd6e4a37870c5da73139eede89edf8c98e22c2dbb609313354fa788&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QOOMTVAZ%2F20251227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251227T170117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAj5POBKEnlybCM%2BAtjz2zWJ0DYhAn1ui9vzrjnc9TpjAiAbLJTY5q6XmGKtdJQ1IEfhpNxVVBb8TyM5SoDyOPgOQir%2FAwhtEAAaDDYzNzQyMzE4MzgwNSIMF%2FUnrP0NELF7SwJjKtwDXHk2nXtSXvBnSDFTwyW9VLs3Z9Oorle8fKspZPKvzpjM8x6bEuORmHhj27ViPUfhEx4Rru4HxRWw%2B0PebtqYacVyKAh36XqiFLhVl5cbm39UD7XrvKkhf0WKgROCYRI4XhlCQsouOnTFi1K%2BS4xd1XLM5OHYu%2B5QXbnBORoia5wxgFTuSoBUNL5Bt6ndnGsnvgPx%2FO0UlN9gsGTabpRj2UIQNmjCz7ULDaBqroOTBa13JFW1GLMFMxlkfAn0NVkCE7x9Wb6gRceOOiwvsN%2B6Lw2gt7mjdQfq622TOOKz354JBIJKniKsjd8WFCtCMvnc7Ell7%2Bxc%2FDDJsuoQVmPUC%2B%2Fzlf47qFAqJL1ASKu7Gwc%2B8B%2BqxZMMpGtXWOzmxL4HU0sFSf8B2NqzkiZe2oEX4VH%2BpxJdF%2FWWXbE3xea7CAMTK3oE%2FRrL%2BbnmDXzE3S67e6%2FBxUxPAqUj4eELFRazUyCFDITNDz%2BBZQL7nxKz%2BOQD3nKUsP5c54xseXc8YQaEK9u47sPwMA8t2ui6FH2uvlSrvCe%2BuPvA%2F6ZIaN2r8lp5Gc1ufVuD86KPVUW2LkMYO9%2B%2Bn7%2BGpJGzsPLrmsVz1cA4IkgdVmSXMXoFo33KBnQvPHbyG2aPjQOeNEIw%2F5q%2FygY6pgEbly8f2iDu9CzXTqOD%2FktHiql7qxl%2F7E6De39pV8MhP6KZgE3eGGQUduL2jpqDk8vphSogWaqT9ZO1YVeaQKT6S8Mli2xN62XD2Yi0LlJsxDpGVeMnEGyNAkWdVq9mOK6Ldmcn%2ByEksunpjTTaz%2FWw3l6yTIOQxTeJh0LpqKtM%2BM4vKSO%2BSlFx2kpzg30CrLU0RaFY5C3cMVrEN9hdLUodJ6zIufEt&X-Amz-Signature=5482b2b88cd6e4a37870c5da73139eede89edf8c98e22c2dbb609313354fa788&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SCZ5PSN2%2F20251227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251227T170117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC2dESXTvVodHAtJ%2BAlRvdWzH0YPyYMKWmBBpjPleFOvAIhAKXP0WZkdMRuzANileXazzz%2FtDJceHSz2d2X0aow1LeqKv8DCG0QABoMNjM3NDIzMTgzODA1Igx7FIvJsMgOn8mKH9wq3AOgFJtFOySF%2FHM2klhjjndNStI3iEEmlcyFbaQ5483P%2Bvgn9irTHiJCeissNS%2BgLTWUQ6spBK4zTuEvRvR%2F7NCxOod3T0wADDcY3KrZ83B%2FdwOKNOwyMAmO6UbErChMJ2moe1DLhlRsfXndhVLINQomBKBgkvOQemKvZ01HtiH%2F2kV%2Bt3nqd790XKYMGOWEG5Pru%2FwyInrCt0olHZzSgmqFLX3jz0YJxcq8J8GsNznMMpQgpb8zo8cbWWMoJ6qsAwDoBaasjvtChIn6KrqaaszDf9TxV%2FDUL4qO5HNkHLcX9YrFBUqbO%2FpNw47wZkrS1C%2BVcUy3lVxKgpipZLYd2tjGbjX%2BncFIUd2Hl6Y7C3%2BkD63q24OXuabBnWMDOgfZY15uGI94%2Bl6lMTn79%2FtVvLYVS5JGYOYfhNl5dcoZUMCu%2ByaT2enjeq8UBkdT0WkTXJSWrV9I7kBvgp3OKJ90TQScYWp7OuKFdn8v963dlpozriPiEbn6JY98nyMoOB5Bj51EwtCSoRfpNWvDnxQzGsA7%2FfYf2M49PIXW1hreDd2czEGvpKa2XNNZiHqJNQ2%2BAkcqDgjW1bNF9w8TDBNwKnPlIh0f2KQsWM3370msX9e7Is7Vzgar9sPesFfNXzC0nr%2FKBjqkAbGekPPXnmJDzEU%2BoSId9Yc4avx%2F%2B5xPuuLkJjukvUDK0AkOgge54Wd5%2BOdqcYMPmmwzYUYqziJx1eXzrHWPhA1wLy3oJi4DLSIneE1gGf6kHD7Qn1bFRSXk9jzCrvd6H4W7DRuVlskRUrXk049dq0zpa5PBF8wxY0bOGyYtESvL0MnHO%2FBBYpKF1%2Fig6ADqsbY%2Bg%2FeofrrsfyCPq5SrFxXIvFc7&X-Amz-Signature=1720fcb00b579c60d6302003db3554e0e03cf1d486301e43073f855c10fecc9d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

