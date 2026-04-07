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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667DDK3W6Y%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T114142Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJHMEUCIQDOUEKa99jg7GR5Y9pTPL88TR1TsAVVm0YfjezrguWi5QIgRVuGLtgM1qxte5dQH6jKGremwGUgyk%2B%2F3YUREjGKyAMqiAQI5P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJsWZyV3nojyLnYF6SrcAzdwi%2Bjl%2Fskou7XG0RJTNSGN5Do0P%2FacwE1dVs%2BGa6p%2FlBvQGrj8treBNz2wUgcja2Dv1KcIr%2Fh62QD6pFS4ZE0fyZERB9dNs8mx6TMOBEWDrCCpTZIm4AE97bzN2qOQAHd2wAShAzfH5%2F1c7CG7QJwObm%2BQsqLe3CxcdcJQF6gLfd4kScs%2FVpMTS8SNtOs%2BDEUaYmhd7rlxsO7W4bbJybGwSGSKfscwiFmOdMlHE6JHIw%2BQ9nKOXtB9hoTEkWAev8dkD%2BHO5Nrt6AOgDQbJ54rLuygATKXS%2BD3s%2FRhX2oHATFNEKfxXlfyBfV0pBzZuL3RGHxgLyI0lFWKa%2F4g14FXwI582IokhlA10ihCtUF9hHaEFmlmWWPU6xeqXAqiTiLZ9wU5FH3Pch4S349S4zkRw9u3Gb7PVBqnMQ2pAeRxBagjX6iw5qSLSezm3GT5qnrGXQKonbjOcUZ5bIDeURgupP37EeDFXafnMf7nVEGNgZe41d6SRQ5XkelY%2B8ryYlwUNcruvSXXYaksMjJ%2BMnl1ejQGGoBSYICwuMFzt4L51cY3fnOKCQQ5AwSVkg7OiSS44eJkbaY%2Fa%2FK4Nkq42GHdZED0SZO4GNLzmYpmS0mYzDo6xHVUGxlPIrOV8MJPE084GOqUBA7Z%2FAc4KcaTOj54BEldeBdUFMCoKVA9LKxQraGufZjVRRtmF0Yy7yp4NoG0kTk3mwrl7uH77%2FeehpXrJVbuzNSJI2p2i4veD4PBcGoP2WD07qAydFf9IyaUsCD4jC3d%2FRVwuOebwlSPAONdpJKlzlneCsM%2FTbukKhlyWJGZblLo8vmAMFdyEY0RG9kzgQcNy6zm3xpiA578lv%2BHaWQHWKy5A7DhB&X-Amz-Signature=983b7281a90bd319a0cffbc04dd7d62d154dd05966a2118c14c55a3c9a42eaef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667DDK3W6Y%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T114142Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJHMEUCIQDOUEKa99jg7GR5Y9pTPL88TR1TsAVVm0YfjezrguWi5QIgRVuGLtgM1qxte5dQH6jKGremwGUgyk%2B%2F3YUREjGKyAMqiAQI5P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJsWZyV3nojyLnYF6SrcAzdwi%2Bjl%2Fskou7XG0RJTNSGN5Do0P%2FacwE1dVs%2BGa6p%2FlBvQGrj8treBNz2wUgcja2Dv1KcIr%2Fh62QD6pFS4ZE0fyZERB9dNs8mx6TMOBEWDrCCpTZIm4AE97bzN2qOQAHd2wAShAzfH5%2F1c7CG7QJwObm%2BQsqLe3CxcdcJQF6gLfd4kScs%2FVpMTS8SNtOs%2BDEUaYmhd7rlxsO7W4bbJybGwSGSKfscwiFmOdMlHE6JHIw%2BQ9nKOXtB9hoTEkWAev8dkD%2BHO5Nrt6AOgDQbJ54rLuygATKXS%2BD3s%2FRhX2oHATFNEKfxXlfyBfV0pBzZuL3RGHxgLyI0lFWKa%2F4g14FXwI582IokhlA10ihCtUF9hHaEFmlmWWPU6xeqXAqiTiLZ9wU5FH3Pch4S349S4zkRw9u3Gb7PVBqnMQ2pAeRxBagjX6iw5qSLSezm3GT5qnrGXQKonbjOcUZ5bIDeURgupP37EeDFXafnMf7nVEGNgZe41d6SRQ5XkelY%2B8ryYlwUNcruvSXXYaksMjJ%2BMnl1ejQGGoBSYICwuMFzt4L51cY3fnOKCQQ5AwSVkg7OiSS44eJkbaY%2Fa%2FK4Nkq42GHdZED0SZO4GNLzmYpmS0mYzDo6xHVUGxlPIrOV8MJPE084GOqUBA7Z%2FAc4KcaTOj54BEldeBdUFMCoKVA9LKxQraGufZjVRRtmF0Yy7yp4NoG0kTk3mwrl7uH77%2FeehpXrJVbuzNSJI2p2i4veD4PBcGoP2WD07qAydFf9IyaUsCD4jC3d%2FRVwuOebwlSPAONdpJKlzlneCsM%2FTbukKhlyWJGZblLo8vmAMFdyEY0RG9kzgQcNy6zm3xpiA578lv%2BHaWQHWKy5A7DhB&X-Amz-Signature=983b7281a90bd319a0cffbc04dd7d62d154dd05966a2118c14c55a3c9a42eaef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TOMDCPFT%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T114143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJIMEYCIQCtBAD2ANj0B65h%2F4c3gjHCrdZypzOUXyK9fMGlfEBFsQIhALfvhNCZs6SrciqyjQXZ5O6R%2BaRh82MhARF3P8CtthNhKogECOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxNGnpRlq4Ku6dbwScq3AMTqPbTuGqZewXT89GqdFycFEXlakfjR0c0nBMXq391SiMLWmxMAeI7sjm6lr7NkSCgEMfN%2FUbLJ2y18E2i0pl22quxs7VhL0fGL8n01XTUmAQPes9ALWNfJ01Y2FoDYjOUevgT%2FRImCLIplmyfMtgGpOPrQqdVXAf29gl%2Fn%2BOWmaY6FCDY4OW7cHAKIirhbB0dLIZ0hd9W9fctUgVm0seh2FAMwOVQL2fPQIZGWq2zIUsUGsS3Z%2FkzhchVQ212KXc8f%2FTz4w3Et4QuPjjnLtLMrTYt7SkvrhnDDNNYNWXAgX3XO4hnUYDEXXlrfSXU23UKCYWhsJXyF1Wiy5uu3GMQXkCpIdWnRIL8CqSMB6%2Bm5UqAcgvMkEQwFRx6a%2BcFrQWpmruw6ywI37wSkCWHaH%2BMGUcDoVLXwtp0Hhbxj92EOw9xQq%2B3Yz0rjJ%2Bps3gALitUDWDJAcbrUPdskEE5O5iuKVQtjerPK8zEOzTL3AIBsH%2BpdWPjVbgYD19syELzUjdpqUsojR8jFhRd5slp%2F7kxFDfDY9tNYrdwlRwpfnx7Ek4brP6GflIy9R76AGEeYN6%2B1szIuQNF6T73H7fCZ1vfNAMJ3ONY82utSE46qiyyp6HYSnRmVUbPeb1DMzDpw9POBjqkAa1y0NiwQXDiTfLqH7qIGF%2BZ%2FXVHpx7YLZOqwfA1XzE4hzjbNdTjk86I5WLLsYc6ODhWzDouZX%2BKtE5xgoAyAB3fa3XzwF9EpZiVZO8RgGnC1PVbjsrSKaC8bzgF2KgMgADTlskMK7nZVF6o%2BziuVbT4vtyWr3ZYriMAaJ9DyH60HyoNoQQGVt05u0RfLWOlDqwHfBEx%2BWRqNoTlOseWzdi7G1sc&X-Amz-Signature=057c2fdee9170336894cd5ab309e783857f4b9758ec4565e4c32fb15b93bec26&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46642UYMIBZ%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T114149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJIMEYCIQDR9G%2BTsgjL5AJUiRsqyNlqF1YmQWV62neWpLI0BRcC3QIhAOvQjy%2Fk30WwI7CtZ1x77U1rrRglhsdF84A4MAIngTeUKogECOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyAH9q17xe2neySbtUq3ANg5r9NPYNQIMr8JvGS1e9ecKTr4b0iOvSTyJlV1W218%2BlYKTl0yEmoYGs5YwhhdxrjmlahZL4Mp7Vo3oI6zDoiA5fq9gWY5voqsO%2FwclJIDGK%2F4zagV3xnPc4me%2FUU4QDl%2BtrjWlsjYVH4oL%2F%2FVmfVDZExpOYHhE%2FkLW8CM6mUltPWScNIQi2%2FHdUAE%2FIJhO%2FvTYIYhFXl7if1svmkPhEi2u9TuxgCBmtQp1m5PsB9agEEwqwlV%2BO5Ng97KPMcKLjB8tsKyNzQbIJS2hpt8YhKSRtVFM0y8QSX4ldXwg%2FRx6%2BGdlgUQ%2BXKpZyYWtaYxyAiGaeyU6zkuC57TAb%2F%2BNkIxt7pttRkYKaBWc89zYV9vpguNuv8yLFYIbwOfp%2F1jHNcOEJAssqSkbGZ9UErbEtCYW1dxmeGGLoPR7R0dKXKWmXgEY%2Ba2ggpkAQbFTa8CVpTyRM6bQELpJaCgYYZcYrVgpx1KNsNhxwTQPMr8pnDrn05O9hWKY%2BRssT%2FDKr4%2FTvbOMHLWOSbN4cZi7VjDv8%2B605uiM3%2F1Zb3PL18xmYQwqWcbDZYnhmow%2F7dNGkDNf0G39r%2BoFPZRf917MLZ1AWWnMgDd3nJwpSIpR4qTqUEEDh6o5vv0Z%2FNQVPOcDCexdPOBjqkAWujFVUlw9mJw8zIWhljDiqbbk2TrLYi45QsDnb95FufwxTfRgTdlV2v92RWA51s%2FXaBvcg%2BhgMb0%2FMbu2BBjiH1%2B07ttzGOnBDWZL6TXCQvwpC%2BK%2FK67BlPhw9UiKu%2F37EW%2Fy%2FYb1kjYTHRl6MoiEexfg9gzuWyyaJ6xuTa4HPTzCCxNYXSeRfO0wTOub%2FjCKoeN14XFkwSakydYVzzpmjjezHp&X-Amz-Signature=569985004f318a0cf775146cf1d1723d6bc773f0c47f4e86d01ac372d73936ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46642UYMIBZ%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T114149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJIMEYCIQDR9G%2BTsgjL5AJUiRsqyNlqF1YmQWV62neWpLI0BRcC3QIhAOvQjy%2Fk30WwI7CtZ1x77U1rrRglhsdF84A4MAIngTeUKogECOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyAH9q17xe2neySbtUq3ANg5r9NPYNQIMr8JvGS1e9ecKTr4b0iOvSTyJlV1W218%2BlYKTl0yEmoYGs5YwhhdxrjmlahZL4Mp7Vo3oI6zDoiA5fq9gWY5voqsO%2FwclJIDGK%2F4zagV3xnPc4me%2FUU4QDl%2BtrjWlsjYVH4oL%2F%2FVmfVDZExpOYHhE%2FkLW8CM6mUltPWScNIQi2%2FHdUAE%2FIJhO%2FvTYIYhFXl7if1svmkPhEi2u9TuxgCBmtQp1m5PsB9agEEwqwlV%2BO5Ng97KPMcKLjB8tsKyNzQbIJS2hpt8YhKSRtVFM0y8QSX4ldXwg%2FRx6%2BGdlgUQ%2BXKpZyYWtaYxyAiGaeyU6zkuC57TAb%2F%2BNkIxt7pttRkYKaBWc89zYV9vpguNuv8yLFYIbwOfp%2F1jHNcOEJAssqSkbGZ9UErbEtCYW1dxmeGGLoPR7R0dKXKWmXgEY%2Ba2ggpkAQbFTa8CVpTyRM6bQELpJaCgYYZcYrVgpx1KNsNhxwTQPMr8pnDrn05O9hWKY%2BRssT%2FDKr4%2FTvbOMHLWOSbN4cZi7VjDv8%2B605uiM3%2F1Zb3PL18xmYQwqWcbDZYnhmow%2F7dNGkDNf0G39r%2BoFPZRf917MLZ1AWWnMgDd3nJwpSIpR4qTqUEEDh6o5vv0Z%2FNQVPOcDCexdPOBjqkAWujFVUlw9mJw8zIWhljDiqbbk2TrLYi45QsDnb95FufwxTfRgTdlV2v92RWA51s%2FXaBvcg%2BhgMb0%2FMbu2BBjiH1%2B07ttzGOnBDWZL6TXCQvwpC%2BK%2FK67BlPhw9UiKu%2F37EW%2Fy%2FYb1kjYTHRl6MoiEexfg9gzuWyyaJ6xuTa4HPTzCCxNYXSeRfO0wTOub%2FjCKoeN14XFkwSakydYVzzpmjjezHp&X-Amz-Signature=14705c2ebe88c826ead8e076759fced7c7bdc996386327ef88eae45055627774&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664XBLQAV5%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T114149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJGMEQCIGdzkXEjN14qFh8FfRDtflRTomhY7BojxYas9T0wFykPAiB1osl8T8NPIk%2B9MvvOxMhXyKeW9%2B%2F2z1xvXXvpuOd%2BZSqIBAjk%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMNUEq1K6xZ6dDsoWbKtwDmW%2BrMtk2CjnytI02Gt5MQDmgNF7Vi7KVdvX3hvIrb6SykampJTIv%2FhO3BbCeCkFi9rXZZjJS2OT7tYXNdnSX6WyBVBaItaJuPL3%2Fe1c%2FhQIQAqdeQQpBaJdovn8sA4z8kW395Dbczjq4xfpPXkqcg2xqsS87Lz09ESia3cAWl52428I7SdkykMtGgYX24Vu79iPvrcx2Qt3T8y6WBw4mzH0L16EZkk8DmMQaD5wMU1tle68LaFaesgLyX90Pj0YDxk4qhs%2BHZXX3hYCwa6Co7LrgbjXrS4TVIPkzfDOVb9kGv56FftuvTjUizmqfT65rokvSCpdTTVpbXMPMzuD3NreQV6x2MOfa%2FI%2Ftut66V0mM1qg%2FQZXTy5hexwgfpzyI1V3QxwEx5UM02gPN6MnZajdNXqrGMf8fxLrBftYuXscU%2FQOjv9qBj8yRiuHPTEReEiQudjbSHAKB2a8a22dRXmlvoi8%2BIJk79b%2FMBArMwSWja3llU8yWfs7skICF5I5jJ06Rlm4gr3o%2FEvj4GuIKqDzwnBQnpF628%2BK12Wlgj4eDd1SS0t92FpqpAuHh4hBI0ZWHxUvEdNQNelttHVGTD2priBtDxOuenba4cdUgxICiYGZCYxSLHAW%2Bpzow0sXTzgY6pgG8%2FMgxIy2MDsSzc7oMwmGzKw9f28deXg%2FUfuQKnIdLupUEThzgQLlBxQ%2F5Na868hV8xwEsRMg%2FDQfbQANFL2TRKmhjEnUEC7CrxhefVcPJh7sYEi9JmbYnxiFWNXOoC%2BGYzmuVWQ99AgjoInpEWRgUPc7wvaDjBS6ZdAbfD8FH8kSHm7U9bPobiFQhcJXDueiMHdcfHHeeq6xEVuZcNCizvv0cSFr5&X-Amz-Signature=2f73666a9140d7325d784a77c94adf5b3d4fea67cab3d4398645b510e42c8732&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VPDACDIW%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T114149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJHMEUCIE7pmIecEjLO1NuK4ovgwOJfCz8PzZHYXR8ix8M5WCqmAiEAnqKPDDUnWN7DMFfYy24Ugifi20GkO3vTAhqVXh8yv80qiAQI5P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJr9UQ8wsrqpy0yusCrcA2LZwanLTPgH1Esikb0X3EU4dIrWqphVbyhku4WR%2Bteq000s1MghNcsiCvh%2BSgl4KyDRYhmjzzQmyTo%2FEkiQfr8AB2RiRGpTnl4IpWa11oa%2BlDT8d2BYjzeVY4r6lKp7yLnu8KlTArpHLb1NTGaCYDk5OmP0a0YVwjBYhmgdsQjwOpE5OhUdgLzBbU%2FeZy%2F0W%2F28ZFMSFGQWL1FJAknYBZ7HbVf0UX8XoF%2B33TOHekEovuiqjyC8yvW5fQidABtIve6xF5cSLklUNuJucSNhy7UmHCtqbd0MLJESXx9DnpWsy3FHnXFQ5u8aVBFiNfnU6tchi0rpUc0iJLKUArCuNX4Gn%2BFvNDFSl%2BwjTUzQJvMAUzzL5yqpnhOiOQiKMiX51u3C6%2FiXQLaMP82iB0ADiM8ChR0ObBmR23WrRLomESrq6CIdMDZyoRK7vi%2F4uu9U%2FecMviEFxpiuD16HgwFDuwXJx0U0qdowQs9%2BFXYvKo2vB3o%2B1VYo9%2BT7nznNMjwI01Ppce9A1eyXE0d5D8Uxgo4LNNjCJ%2F3KjgnIzgFDjZSrUksu8nMB301nbfpMuGbMRvOYNOmOCl%2BwB1y631QJxI9g7t7ZBXgG38MOz%2FC9SgmKct9v%2FfSh06hEa%2B%2BIMJ3G084GOqUBmN90boycBePjGTCMgvyGotVncqMokyDe9PJET5Ng01JZxxosy3JEpFthWWKThqbSwOpLmdH3RFTrHmHHD%2BiBp1hHgsD4ZgZuzNqzVA5WCoR8%2BdxDA0knzCBdB5PpIw8sZIpPxe7VMKrVWtNKv0zYg2BxfBRg27Z7K4SkK5TYCXcfsf2%2FNKFlJqyzoVE4lJqGwM05lYnf5L9ffALxyG8pOvKDN9iA&X-Amz-Signature=7548e781a316d38da1f5241240e45be4c25555cfa32905fb34ee1896864dd297&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDZOBQWS%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T114150Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJIMEYCIQCBMNHKrBMkyy0SoO3Q5RS7WjBnrO8vOSVS41T774KDoAIhAL8JxQQDXvDi3x4ABZTDV5rFEGlFFYS9spUAoUbs%2FI3AKogECOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxssfnTbbUpsBD%2F768q3APL%2Bavn%2F%2ByFIVXssDCAWCNtmk9vVf0rk6mMGNEG5DEGVgaXfMabzAVuomHsdOFcG%2FqenoCnX6822dyYE0sQp60tVHD9YKn9GDAu20R4uR0Jm4fmHmizCe1zjD56tjEXUyzHJ1fK9Op5NbfnT9BzrbcRbDsM8a02hsEspHs1w7olyBKIowMoLjfEy%2F53IC6MLWHcd%2FAY4vunvwcCPorMfLTsLUvwJfUhIOWun48vTPQZhLFWCLsoy2uRObi5zauPSEvTsR3FNat9U3Puum5vv92a8UR8FjqTH3Nb%2FKpnymNIYFvjzBqnjKcTz0QvCYziuJz59V72Rv4ZlrDHR%2BQNBlPywy1iqu5OnadhCh1rfpp%2BlevEO09bh3aujUm0uq475wabKUNYOUEaSnnNQchuKi5V99sHp%2FZzj2X4ivaqLmxsQQfHoPLZeND6d8QvDZC%2BcS3CqlhEg0ZR9zNI8r5rKbMo9piWYYM3q05se3DWz3bt60o%2F2lcpUkfIB6DJOmgyEqJI8817cr1Tpz47uvtpKh%2F6j48vSPSE38R617%2FSE%2B8kwolRaExM%2BY9Rht8IpnzNm2cCk%2BosuE2h92ZutrHRH71KlQxPzFpmKBzEqvSweRNt1XmD7b5bBrt%2FJxm6LDCuxtPOBjqkAdzuu22sXOGhWxTIrvisEoW9ekwcATapil6EMNB4UjtZ46IBBtKW1duLdlRlb%2ByUsrGtTVEMg4gdKGPiWJNu9Wv1W0hWBh54xLPTodX56Ma2O7RVrMZmvhQ6qTuGG0BOW4gem1QNxyevli1fUt2WjPaELUrl%2F3hQvMPUBNdszx8K2joHmUeA5fiAVDnP%2BpY%2FGGBpWDRteE%2BOcMsd2Vmhu2OmndCO&X-Amz-Signature=e22e862859a93502667c82be10abe4725d1f0bc7a8305c68a890372daafffd8b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKGO3K4G%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T114151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJHMEUCIQCe30ts0qjZV9PSrmT%2Bkh%2BMfx9vcip6%2BWKUphsMPvXHXAIgSbX4gQGZ17OMdYXPenDM7jfYAdL9MEZHrd4%2FmV%2FOHTAqiAQI5P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIJxJ8WxLhWymPmO0CrcAwEYOe7ESmizWtqyXe%2BORJwyC5SO7GMeWwqFljpFJ0yEpnf91HOCX4AJqvsjBsFyRpuyy0oPqQPyUCujkW8wwIiftj7OHISQ8UFoeIqHuewIdJU9nf6h%2FVfp49rVcgt1I8N3VCMXSHIkAz2aV1i1wX%2FBvyvHDTM4b4%2FHCfKXLutA6s4LGzfA7MJgWmWLi6NrfUwWwVYKcSqIZVX5u6vv4L4%2FmxJ635ic4ENr4hH%2B4RxQJcOPqKcj%2BGHCp3o5Yd2N5ZCYDuiU2yr27pL%2BuINzmdpx1KCd0BP3vun7M5uYqbAq0zjtHwaE8xPLFqgcyB1%2FTfBQ82VKpksfWj9dZ5lscJZYH27O6zT9gwgBvkvLrKua8a4D2EGvnscSPSyzLZuuu%2BEnO7HYyRfNAMSpT7HYEuX2qlSmrFvNVXELeIfn%2B0k4yABVMfZNj%2BtRt7R2ivSnaDvck838A7y85o15qCN9NUddqFogZjSWeOkRt6SRDdF4umZbE4QmU0yUR1TLsgQDFDhKOS6htpuLiw1oxLLt84WzNPygIrK6cxBt5rKJEgLIKCAVhjh6hM42JbBsgiEacl1B%2BfLpLjMxpk0mvixxvd1h%2FlKtYJuHDlfRtTUsHspC4yJQ4iVurSFL2Q%2BRMPfD084GOqUBk0DwVQp9IH4gHQPFFUfupOGey4oGDNhiWYs32ehgezzNFo4Fu2nvtSJ6PaXyvrE9oil3UGy0c5FXrKKiScBTNcVWSMHRWMdbqrLg2BN8e1RlHcqyoGB8W%2BNjanSLxGq6P2wIH9cikVuRTUJVl%2F17kv7AhjQseSZN%2FLP4CxZbeluOioxVpAwXFj0RJapmynywgue%2FYKA6PGFd%2FWKNjnFrPFAhw%2FiQ&X-Amz-Signature=7098448fe5c1c1602cebc3040b786809b6451b9fa4119630c53d0bf69714dee0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKGO3K4G%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T114151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJHMEUCIQCe30ts0qjZV9PSrmT%2Bkh%2BMfx9vcip6%2BWKUphsMPvXHXAIgSbX4gQGZ17OMdYXPenDM7jfYAdL9MEZHrd4%2FmV%2FOHTAqiAQI5P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIJxJ8WxLhWymPmO0CrcAwEYOe7ESmizWtqyXe%2BORJwyC5SO7GMeWwqFljpFJ0yEpnf91HOCX4AJqvsjBsFyRpuyy0oPqQPyUCujkW8wwIiftj7OHISQ8UFoeIqHuewIdJU9nf6h%2FVfp49rVcgt1I8N3VCMXSHIkAz2aV1i1wX%2FBvyvHDTM4b4%2FHCfKXLutA6s4LGzfA7MJgWmWLi6NrfUwWwVYKcSqIZVX5u6vv4L4%2FmxJ635ic4ENr4hH%2B4RxQJcOPqKcj%2BGHCp3o5Yd2N5ZCYDuiU2yr27pL%2BuINzmdpx1KCd0BP3vun7M5uYqbAq0zjtHwaE8xPLFqgcyB1%2FTfBQ82VKpksfWj9dZ5lscJZYH27O6zT9gwgBvkvLrKua8a4D2EGvnscSPSyzLZuuu%2BEnO7HYyRfNAMSpT7HYEuX2qlSmrFvNVXELeIfn%2B0k4yABVMfZNj%2BtRt7R2ivSnaDvck838A7y85o15qCN9NUddqFogZjSWeOkRt6SRDdF4umZbE4QmU0yUR1TLsgQDFDhKOS6htpuLiw1oxLLt84WzNPygIrK6cxBt5rKJEgLIKCAVhjh6hM42JbBsgiEacl1B%2BfLpLjMxpk0mvixxvd1h%2FlKtYJuHDlfRtTUsHspC4yJQ4iVurSFL2Q%2BRMPfD084GOqUBk0DwVQp9IH4gHQPFFUfupOGey4oGDNhiWYs32ehgezzNFo4Fu2nvtSJ6PaXyvrE9oil3UGy0c5FXrKKiScBTNcVWSMHRWMdbqrLg2BN8e1RlHcqyoGB8W%2BNjanSLxGq6P2wIH9cikVuRTUJVl%2F17kv7AhjQseSZN%2FLP4CxZbeluOioxVpAwXFj0RJapmynywgue%2FYKA6PGFd%2FWKNjnFrPFAhw%2FiQ&X-Amz-Signature=008d98ffc07abe0261dcc9dabd1bcdc780d350abef5742b0aabb542232819a80&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QDGPK62W%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T114140Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJHMEUCIHYVEXONh7Fpx3io%2FBYiZTVaLRa%2FYw%2B%2BxYgWZK9r4cDOAiEA8bQukpOeE1ugYpo%2Fo8Zno0oa5YxKVGhNUTbQ5DoeKfAqiAQI5P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAddds%2B6Ri5y4qCANircA5x%2BrBcJAMjX9mbTxfpQf6UpcMtApGooyNaVWhBSdhoXHvQrvVqaRjtY751MlcySCab3%2FxVPmJLuU7eX%2BVL2RXzpDf9VUC6SKzkqcyHeR0kS93gKZf2vTrG00r%2BzhwiwHdOZajDAf%2B0m1UA4Iw%2Ft%2BQZyFVmcARsLJ0gtfbgEqZ05lUvkItbnO3Pe9SK96rl4eM06jXSkY6y1%2FI5%2FN6mL6LhfBp3jegxtm5DelRNrWsPgHf7C62e4LOLXzmrGr4bbs4GPdP5BJUMyxbuuK1NLhLJXQKQiBHdM9KA2uHIbPVfLDOnrMfN3jE%2FYUek5euW8ZLmcSDYbc2%2B0CeE05j%2BPZrSO7Ki6TfGdpOzEaKGLYcXKgrWvlKXdh6SPl0eqyAlsMoq5XRa8RRrnWv5HH2nmFm4bLxgxe2iGw1EnZy5TTEy23kJQopJ0nSr%2Bfh%2FBuyGroC1rtAZTibsnO4D%2Bp98XFdI09lw25VVoxceP9NHCsCJFNFcQjuLQKb31K7ph5ji1iMHvRonh2sAZy%2Fnk1fbpEbHKpDKByibLQZXSFk0cFiDqq%2FdgXhhfpgHtwoIFFrCZgHO10AMOmBNbj%2BB5NCfcZWMlV0BJHLma0CmrERAreNMDUNhYIdZlhVGuJvlgMM%2FE084GOqUBKv1vzNKy3MtoYZJqDccEjfT9bixhY51TZnHGLWtk1RAJl4bTss8t%2FTwagcu84q2SJkTs0NxfbIOk6fQge3fiedAeyejuHweXGxgMpPbnu3bClphPb3dEbFf7NO0VwhpTd1JgRLNUNEcR0Cv4gt%2FRlSEjqRz0LfmgG6g%2BktPJy0cwynaa0gE6V2sdyEK2ypmMcmJ48ZADD2tpQ7f%2F5clHfOpUrIzz&X-Amz-Signature=cf58e032e5b67c089190e46aae0230bf7f25ba76e4f41fe52bec0f12b3612d5b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667QI5QJD5%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T114153Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJHMEUCIQC6TuYFYV9pudU7kwtsH2x9sTjW708ABAX17oFtw40b9AIgfpXR%2Bq4AnUJHZ0MzbYC%2FL4wiqkcnUCg%2FxA8AkaEJzbAqiAQI5P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLBkBagVgyViSAF8zircA1g9cPrVisDNhcJLJXm0LZYqLj%2B2d3Gv9tr0%2F6aKgOfIFgY%2FzH%2FQAJbbWozryKCH7%2FuKTf2aZUdZi1vEaMT1jZhJsycS7w0apwjmwu0S4K4ODIwgks7%2BYIN5xX5b9KMNb96soo9Yk2PZTDJmroRR7EMH3KUzFEj2q7IjlK83vq3liewcAOgpqm4Sln543AQ9DGxs1vtKLwTmxWCXm3A2qmdupXKFykUVH9A1P5mOPIFOpbmM08nYpG5gDClUYf6AXyXH9XSCDRk2uLbxyHLjyvVRglv1BcJVaRdDOAmaERs26mVZgNJt0KEn%2FhQfZ0flPmq8%2F7oPFvSD0QprTEdGoRnXzGhXATKaUucyvMLHfGrhazZVmruYP4IG9tm5jIp6kJJI%2BJKFekoRry%2BbzFuROIFQzBhjpNJURerGxdgEWSyqDdB2BW8No1whoFxVhdCMOAlG2U2EHrnQ4MUIm4Zt0q0C1DAHMo2C%2FqyIRH6xmeyWKWLHnn2WEiH5%2F%2Bs9Py2lOe3FpYb3Ytniz1kyr%2BZ%2FjZeXlw41zutuMiKVvxPSZBanRlAgh80SrfnubXbHpoRCgwZy2Gr7y2TRDNKwAilY6vAIusTuR9gKYlHfD0VWX5BXkxUL%2FlHXROBgMmnMMIDD084GOqUB4v7fQXU7MhadiIzZE8uyagdTk7DoZRPkb%2BloM4Hvb8OdWWYHqSD5PSooBWKgOa9SHQs29yrWGoWiHQdCyq8JDK9Yh%2B2e7JAp3opsublr23vr6floY8uPGJVxj%2F9e7VdvWOI2YGjp7KIGAXWSf69DPnRKOSnmgLnLsAqXxfHdOJZmSH9utOmL0hpTUI1GwvBMHJC4v82lSOOCKlJJFhDdlvZv%2B9Zn&X-Amz-Signature=e2e93df2b83b5ae69f7d91bf0617c5699d72e7b0672f318f750e1adef55f536f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667QI5QJD5%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T114153Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJHMEUCIQC6TuYFYV9pudU7kwtsH2x9sTjW708ABAX17oFtw40b9AIgfpXR%2Bq4AnUJHZ0MzbYC%2FL4wiqkcnUCg%2FxA8AkaEJzbAqiAQI5P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLBkBagVgyViSAF8zircA1g9cPrVisDNhcJLJXm0LZYqLj%2B2d3Gv9tr0%2F6aKgOfIFgY%2FzH%2FQAJbbWozryKCH7%2FuKTf2aZUdZi1vEaMT1jZhJsycS7w0apwjmwu0S4K4ODIwgks7%2BYIN5xX5b9KMNb96soo9Yk2PZTDJmroRR7EMH3KUzFEj2q7IjlK83vq3liewcAOgpqm4Sln543AQ9DGxs1vtKLwTmxWCXm3A2qmdupXKFykUVH9A1P5mOPIFOpbmM08nYpG5gDClUYf6AXyXH9XSCDRk2uLbxyHLjyvVRglv1BcJVaRdDOAmaERs26mVZgNJt0KEn%2FhQfZ0flPmq8%2F7oPFvSD0QprTEdGoRnXzGhXATKaUucyvMLHfGrhazZVmruYP4IG9tm5jIp6kJJI%2BJKFekoRry%2BbzFuROIFQzBhjpNJURerGxdgEWSyqDdB2BW8No1whoFxVhdCMOAlG2U2EHrnQ4MUIm4Zt0q0C1DAHMo2C%2FqyIRH6xmeyWKWLHnn2WEiH5%2F%2Bs9Py2lOe3FpYb3Ytniz1kyr%2BZ%2FjZeXlw41zutuMiKVvxPSZBanRlAgh80SrfnubXbHpoRCgwZy2Gr7y2TRDNKwAilY6vAIusTuR9gKYlHfD0VWX5BXkxUL%2FlHXROBgMmnMMIDD084GOqUB4v7fQXU7MhadiIzZE8uyagdTk7DoZRPkb%2BloM4Hvb8OdWWYHqSD5PSooBWKgOa9SHQs29yrWGoWiHQdCyq8JDK9Yh%2B2e7JAp3opsublr23vr6floY8uPGJVxj%2F9e7VdvWOI2YGjp7KIGAXWSf69DPnRKOSnmgLnLsAqXxfHdOJZmSH9utOmL0hpTUI1GwvBMHJC4v82lSOOCKlJJFhDdlvZv%2B9Zn&X-Amz-Signature=e2e93df2b83b5ae69f7d91bf0617c5699d72e7b0672f318f750e1adef55f536f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T2X7B6NQ%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T114153Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJIMEYCIQCCYJ6WYxEFChKDNf527J7FunCOerWdwrPt6IsdTd%2BqBQIhAPMHVBTHYE%2F%2BhSgSmFTH2BTP8rPLCpbAwp2clOM75F03KogECOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzuzC4DrBt%2F8IgMSlwq3APS2E8oyQnEA%2FW1jEzZnnd%2Bw5MXjmZSntOrCAJ8iWcPr5YoMPIdSHpuVJZbmrbgsD24fjhm8cmFOOIikvbaVDbUUbQoFx8DbknE6AO6s2J0F%2FfkNAdco3uc2%2BHKDDY7UuQ6ZIaaAQL%2F%2BpTgW8glEIXBNRu8fiBSYq7i868woKcUsN8zoBkFPm49jsMneb7zyYLqF6trwWgfTHTYvUMagnFqx1suHdeRAOa%2Fok0orNU0jHkaTiLWIHCWSedXX4kt6yGoOTPWWuUiWFjXjEZOl0pNbSO5FcEvSfZhlQ2l7%2FcA2fR8d6xSFs%2FgFsPiBYgE9ClRV2L3i6UZrNIZVoOzFnI8w62xQboj9JBwvx%2B3ifZ3DhcAAHfDmMMn3Du3BsEg0t%2F3p6pTYk0Z%2BqIM867krZr0mN62muQu7fz7T1ekN%2F2%2BOyGmJIS4m%2BEu3XRbpuk8pjz4hMBNG%2FjOKSPTya5Wdori9BRUWbyYFDzYZZVsF7NavKTcGUME8s03TAGcaATwjxTxvJHx8GvGE9lKq3pmn6BWbfUKTpp1De1oEzSlVFRxtpgCLtfgUSv0shFpIcA7IxnsZ2o6ER%2B7k74aomVMc0X%2B38TYu1LGyzytW84aHfNtK%2B6kVexZQMilQEiirDCDxNPOBjqkAcE58WXX13MPcGCOHAyXsqoxqYmoEkHxle%2FXMwwA2k15h6VCEjXlcOlcHWuRZcGXYa71KoCZmYgpT1RB7hXpzWs7RiRoyaAjC31HJFA1EttXjUcTySivYamqIHfdQZiOGmkJZmSKno0tizxnKgSVmLZJZ1KdrBUhhiR70AygNpJmy0gI99KrsTLWcmUIYII6KdlHtqkp0o3PRlDDVBQgHwziRXKJ&X-Amz-Signature=9733ef606172291d2301d315451d29cbad2cc3a2873a55c2ce497f3c6b94c649&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

