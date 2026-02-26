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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YIPGD73I%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T231748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIGqWHyR9vhVZKt1I4c9oDbCtWh%2BiDrq%2BNzPk9bgaSMWMAiA3WQlEfEi4if%2BoJpkXD%2B1qsWY7hx7WSZT%2FRCKthnzMpSr%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIMcqeByGZqhVVmFrxsKtwDEJQ5o1rwYQrkPRajhjfu4vlFsPB%2BEijjWDiXdlOJk6PxEk4Uweis8t52qZfcPXs3NfQo%2BeoR8v938DjdBfmks73oQoBhNB7EIwE4FOzPtAM1cqwa61e5LneSL4MASU8PNCeRL1NgcSd1r%2BIq%2Fvf%2BSCvBJa0lkL78IFCSCroWJCUtWWy8osU86llJsU9%2B5IO6hBjjXadQN6SMolNRtvlmws7fXjrsbIY4GyYY9CeAS4MEPOz4iJkTs5SKcPq5Ror81az3wqTdMFgR2UOVtXFe80kYnezQKOF%2BfMk9ELzIOS4tKHRGpE0ryx6LibcTPlsTWr3yE5%2FglEqx%2BQIxATTZhOC2a%2BKV1PIvweJbh8ZfQH4ib%2BmchlBV9WfzY1lL76Q7U%2BI0l3FD%2BAYEUTOmMTa0t7tpyY8y%2BWTwPehRQjULRAB1N0HQD1jn7uiL6vTbCjWaaELYI22ssK5eb%2FtyWAFjkZiboUCqC07AWuDk5puRUe4BAoSq1FmHCrLJ1qHHLsTT7NmpQg%2B264xRdmBNT7C50nYHV6eHKKDSEHhWDX3dZwezwYsh9qn%2B%2BlOcVVuJaWIK6HLVQPpsbLcyvm%2BLXnHAvEPj1eOjBF1DL2w4%2FSFMRdExS91%2BrVNVl6aS27QwyZiDzQY6pgGEP4MGA7aXFFcQKV8rZxVvkT7qupNEcHJOkVjq9Qgp10hAat1I5egQ3ZXVual7aadxO43dboDk1jfdzluQQRwLE7beoUtpCw%2F20s4PR%2FfAeBI5mWRzLjCF4rm%2BJzghkUz%2Bqfg17MxOgTrqex2m50t5m6%2FvT%2BuZt764sf8yTL2hT%2Bm0u6v0UYQ%2BYXRR5xoTKOhrOPbkGLTOotfXBFAC2s%2B4kpKamCk4&X-Amz-Signature=5c7fb24ef8a2cc8a11997096a8a9369d73c8cf9e6c3ea806bf397f5e5411bfa6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YIPGD73I%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T231748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIGqWHyR9vhVZKt1I4c9oDbCtWh%2BiDrq%2BNzPk9bgaSMWMAiA3WQlEfEi4if%2BoJpkXD%2B1qsWY7hx7WSZT%2FRCKthnzMpSr%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIMcqeByGZqhVVmFrxsKtwDEJQ5o1rwYQrkPRajhjfu4vlFsPB%2BEijjWDiXdlOJk6PxEk4Uweis8t52qZfcPXs3NfQo%2BeoR8v938DjdBfmks73oQoBhNB7EIwE4FOzPtAM1cqwa61e5LneSL4MASU8PNCeRL1NgcSd1r%2BIq%2Fvf%2BSCvBJa0lkL78IFCSCroWJCUtWWy8osU86llJsU9%2B5IO6hBjjXadQN6SMolNRtvlmws7fXjrsbIY4GyYY9CeAS4MEPOz4iJkTs5SKcPq5Ror81az3wqTdMFgR2UOVtXFe80kYnezQKOF%2BfMk9ELzIOS4tKHRGpE0ryx6LibcTPlsTWr3yE5%2FglEqx%2BQIxATTZhOC2a%2BKV1PIvweJbh8ZfQH4ib%2BmchlBV9WfzY1lL76Q7U%2BI0l3FD%2BAYEUTOmMTa0t7tpyY8y%2BWTwPehRQjULRAB1N0HQD1jn7uiL6vTbCjWaaELYI22ssK5eb%2FtyWAFjkZiboUCqC07AWuDk5puRUe4BAoSq1FmHCrLJ1qHHLsTT7NmpQg%2B264xRdmBNT7C50nYHV6eHKKDSEHhWDX3dZwezwYsh9qn%2B%2BlOcVVuJaWIK6HLVQPpsbLcyvm%2BLXnHAvEPj1eOjBF1DL2w4%2FSFMRdExS91%2BrVNVl6aS27QwyZiDzQY6pgGEP4MGA7aXFFcQKV8rZxVvkT7qupNEcHJOkVjq9Qgp10hAat1I5egQ3ZXVual7aadxO43dboDk1jfdzluQQRwLE7beoUtpCw%2F20s4PR%2FfAeBI5mWRzLjCF4rm%2BJzghkUz%2Bqfg17MxOgTrqex2m50t5m6%2FvT%2BuZt764sf8yTL2hT%2Bm0u6v0UYQ%2BYXRR5xoTKOhrOPbkGLTOotfXBFAC2s%2B4kpKamCk4&X-Amz-Signature=5c7fb24ef8a2cc8a11997096a8a9369d73c8cf9e6c3ea806bf397f5e5411bfa6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q4DLOMZ2%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T231749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIDzf8pOuQ4NBtZWEe93jAocYqJHTTuTmdozPtaTa9pycAiAGH0kikjPZA6v2yrGhNL%2FuTBDdL9j2UinpHeXlAI2%2B3Sr%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIMZaTrI72ZWQvwzVQRKtwDGE0WWWs1DLgMyUHIXvvBv%2BM5lD50iDKNGIh44xBcf2%2Fy0owCafQc4U%2FsuYldJhJ%2BbpgAk3jFiKdkSXg6z%2B%2BR9riq61H8Iv7Nd15XdwmFUFr%2FptPqaJKR1nTfJmXIouOMZx%2BBLqIffW6iypSJGBM44wxOo%2BjxOWChbv3b5cI%2FG2d1PT%2Bo4uka5Y3V7kTZbQm5nFaSTsGqxR9I%2Bg2lixqrz0kMmVbmUeeL53jOk%2Fcuiqviw81uu6pLt3kWUrD4ad5mAS263J0OsRjfEmcsosA0HxsBr1sj7ugAZnrDYWDBNqTRadoj%2BM8JbH%2FN0DNn0zddMeP8lNlE38333CMhQo7220JmBNJs2fB6ny%2FRGgWsYgMjpOtD%2FpTQ3gIlDfcBtJnwUnmATnVOZQKUFgdcGvG8ruOlG5ZC5WVnbpS2ZnQOAOZ8hxWqMMjssc7k0y345nLROelI7dyvG1YYs6flJ8r%2B1370eXPLW3tUCDtNQBEvzL%2BTYFSCTBeEyYFbWahpTXJtMvqxwWmshZV7lfRDqEFsUoUGrvAyffZXsGP%2Bsc88w35YyU97R3ZvUFaEUa0gYS4zXVdqnEoAf95kIJpcjFQVn7zBxFbksyrtRYoLxH5kg3gzhRZcRtOrxigl21kwt5iDzQY6pgGGNL7tH9DeKI%2B81IITAs5kf9nUTz7c1QvOI3iudrXHS9YVP1sWtOrmVCbs2u8drpxIguZf7Z9tP75N0e%2Ff9nYOYt90Ab3EwfGn%2BMZQ5sFEhD9lzreQiJ1JoHGLCc8UGbW%2FjmbTA9en851ZQ%2FygYTMNGA3HVZ6lO9JHtHZGey%2BVQDAi%2B32VlWIqVLI27fulbRhdexGGSV12GDjmibjwOP7YnL%2B36HBp&X-Amz-Signature=0879eb85967d24a88d06ccfd8f9cc88ef49083683e410a1b6f4c8d418320cd30&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665NI6NJCL%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T231752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIDkG0mQnIKGtBTksN%2BWfdGuG34u4rUxCF1TyjQQvTGq7AiA1nIrNvBLd%2FKat7ep9QfJdNjNJw5UjMJDIAktZav9olir%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIMgI2t0tEO%2FIvVtWBOKtwDRZ%2FKicv5CAMxs8N82NEB%2B6LGRg65AQnuMuxp5BJnQaOPQGE%2B%2FfPooDL9DKicMSoV4He00lonfZdz69ER2nznlPXx3MWQimmNni7L1cT977sZ8ItrApxMnAJ3KTBqdIZ9KsRRimiPrWX9SV2F8UgiX8Pg5So7lV46yWgzZf2j0VVw0QCYorQX%2FVCsn0XZT6Rp8bgDuWokJ5%2BngpRN84fMqZMUMQdq0V1PtFFBi2DCUZIU3isF7odT49KuF8Tw7qGHft%2Fx7CL2RNf7lROpWmXIrzBTnZT6jqJxjtkdF45pwVIN7pwAw0mCIJfLqvs%2BdEvIuICcA5jyKz4e2g%2BvEkG63vBO5RlRW4733puJx4LiWXclvT0v0odLeBsvmTMK3a7QEglCPabzIYu4HdPctDKWxsSdLfIFKMnC%2FdPaU8JCb%2F%2ByMAKJPIxDYNXBjRavl8h1HtgOr%2F8hR2WPMRn0ogPKEHmFzFXUWIg0w3VwVZeoWtfV2%2F6THdDtOpwib6JDf6SnnDGsB1ruwIjraKKZUooXWH3AE6YnS3JHTQzHvT9gzny8XqlaqryZ3%2F7xgjp5MRrfE0NwbZdto36K0OLYKW68tzAxujFp95QZlufa6gUz%2BXBtBj3vUFrcACFxUoAw45eDzQY6pgFoYXHzCB5Vbt1rEbKophtBM9kyj5JIWXTNmDYmM9Pm7XJFI7fuB8y13tDNL8rnS6aTgl5QzH5rQU02h41Lc3n%2FUQLAGZ%2B9Dc4uDX5ZJFGVQ7SlmSO4sYRPAJLcC%2FxTnFG8CCSITpZY39Am7LTchu2vozUfSMuj8SdupVAHc5RXfHeYKK63bV1%2Fh69tqZeLrqOc6SwBResUOD1Q6uaA8ccvgjT0ZaOe&X-Amz-Signature=7cacfb68632bf0845a882ee5abf0ad2fe4f30d0cc1e85e4e2d0d541955a3b353&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665NI6NJCL%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T231752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIDkG0mQnIKGtBTksN%2BWfdGuG34u4rUxCF1TyjQQvTGq7AiA1nIrNvBLd%2FKat7ep9QfJdNjNJw5UjMJDIAktZav9olir%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIMgI2t0tEO%2FIvVtWBOKtwDRZ%2FKicv5CAMxs8N82NEB%2B6LGRg65AQnuMuxp5BJnQaOPQGE%2B%2FfPooDL9DKicMSoV4He00lonfZdz69ER2nznlPXx3MWQimmNni7L1cT977sZ8ItrApxMnAJ3KTBqdIZ9KsRRimiPrWX9SV2F8UgiX8Pg5So7lV46yWgzZf2j0VVw0QCYorQX%2FVCsn0XZT6Rp8bgDuWokJ5%2BngpRN84fMqZMUMQdq0V1PtFFBi2DCUZIU3isF7odT49KuF8Tw7qGHft%2Fx7CL2RNf7lROpWmXIrzBTnZT6jqJxjtkdF45pwVIN7pwAw0mCIJfLqvs%2BdEvIuICcA5jyKz4e2g%2BvEkG63vBO5RlRW4733puJx4LiWXclvT0v0odLeBsvmTMK3a7QEglCPabzIYu4HdPctDKWxsSdLfIFKMnC%2FdPaU8JCb%2F%2ByMAKJPIxDYNXBjRavl8h1HtgOr%2F8hR2WPMRn0ogPKEHmFzFXUWIg0w3VwVZeoWtfV2%2F6THdDtOpwib6JDf6SnnDGsB1ruwIjraKKZUooXWH3AE6YnS3JHTQzHvT9gzny8XqlaqryZ3%2F7xgjp5MRrfE0NwbZdto36K0OLYKW68tzAxujFp95QZlufa6gUz%2BXBtBj3vUFrcACFxUoAw45eDzQY6pgFoYXHzCB5Vbt1rEbKophtBM9kyj5JIWXTNmDYmM9Pm7XJFI7fuB8y13tDNL8rnS6aTgl5QzH5rQU02h41Lc3n%2FUQLAGZ%2B9Dc4uDX5ZJFGVQ7SlmSO4sYRPAJLcC%2FxTnFG8CCSITpZY39Am7LTchu2vozUfSMuj8SdupVAHc5RXfHeYKK63bV1%2Fh69tqZeLrqOc6SwBResUOD1Q6uaA8ccvgjT0ZaOe&X-Amz-Signature=257e7d12babd53cd0f1630616e18ba4649469b001ff938b8064e9ea1012d8c91&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XKWZGT7V%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T231752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIEn4CrTq7yuwxc1InOUjGdw2XZVidWaP8qSldV4zveLrAiEAo7MfKWEGFlY45e9fK3oKzgWkhOEVTaplnmz75Dj4Bq4q%2FwMIMBAAGgw2Mzc0MjMxODM4MDUiDMsZ2EQbhV8niOfjlircA0wjvlPIs6gpYk%2FY1if8YZn6YPxg98ueATSc8iC7%2BU2YPBdi07bF3%2BxRUUIBIS3%2F0KGv9BgNT8lNeF7gPZB0qh4OgQgWwvCWXgoWifHNLgxudsi76rUVP7oQtDNcsPAsmrY1DlHjLELamNvbGX1aVwaG0qToSeOAmw8JUVhYNEnZf8t2iyp1QxMlK9WQDGz1X8ey%2BdP%2B7zwaME8AMghoLk0zZgT3W8Prbx0xK32Sbh7p%2Bz%2F5mef%2FUDb7hhkHLIFLM6bwXD3BBxbD9D%2Fe4BvZ8zyhvArll%2BnkUaHyjgv6AZ1rbHp1yBSmG5gW0faU5VtnYkrY%2BB0l%2FYk5Keh4MhfrpV%2BWXod9Wfz%2Fm46VXKn6RGvXGEKHXKTC9IVOZzw3clv7mqjY2xvXuzHQr9tpTfGjSnagGXiDlhVjcQWSXzhLHVSr3bSFLkfSxCXZYxouxHCjtCzIZwJNis6OPLPhZdMC%2FTTw9khY9xr1caKwUjnQpsT8bwoqN4HkWgghRYWkJWs21HLbcdYZISrP7Nln39Oc42MWcQJje4XJ%2Bf37DHB0UgigLVtw38frgwHhk%2F4ancxxQX37WgLlFrB2dKiII7X5vS1FShqwUJsxvul%2F3nCnOPV%2BBrk8EaYcWMNB1bvvMIeYg80GOqUBLJIuY5sVsk3PA88xwtQ7muoBI34ydhbZU60lTmxKFQHxgOah5H4WkuiWzxSJ1mNZpf3J5rtRhG7DOi%2BGH1YUYfx1wYouNHaqg2gsvLny0R%2BpSE8elxLcz0AOLCbuDo%2BQS6%2BInL%2BZd6nPLsu7W4EipZbDbB4HNZeV9PmLHbZ%2BhEahLxq1Um7whduBlgw6QV63%2B%2Bh4VjLMKKIDK4dlzmkwhlcjHEoC&X-Amz-Signature=8326a2bff1869aeaac2f77e85eae744774c5b999cd0a0978e51b38a934d61c36&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YXZ3S3H6%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T231753Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIC8nwXLGsI8qi5q1jorICW6123ZUWtzohl%2F%2BZ2EB262TAiAgiTzN3VOUHakPxW1prSiYYN%2FQ3TVyDVzib2e%2FSN5xvir%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIMaDFlVj%2BO0yeB4KbsKtwDQO2l%2FCO5FCp3dTZjVCEkHtN%2FbKPMWnA4xfHYy3ursu3hT95NxVla0WSqxroJOd77520T2dLRs1WH2yMkQToo6pdioKhyBhl7CsdE8N9RMeJJyUroMaLsXy9KJ90t7TemHXDMP7IOVw%2FL8qDcFI0EJdJ2eJlcXHurzzLzwnEMEs2LDhDUjNhCicFCdFfwIL9i7ilIqlGrhqSjxf%2F2F4hl%2FgXAGPGMuWWiPHrtOf13dkIeQoIhXZj2kGSLUbRSLT9EyQ1%2Fbmd3ZUAHRKhP1qoDHHPdC1%2FOdW4z3985UEvNl6%2Fqqs5FB6GbP8hPMqAZdXR1kDcRwiqFBauGrm6ZaWLNTP%2FV7QXYXJnXpMht8Ex0p4KWv5wWSh2iieMwbEYQcWDZu5sZfkjwUs6OyAE3gdcm0t4V1PORUcBcoj7eDDbgenJmlN5gL%2FgL%2FANjsH6thjK4XZf%2BYmnVFvD%2BxVC4qNVOLA8JgWPTRJQTLDPVuMUZD%2FHOW5Ej2jCB36ZGiiW4vjJG%2BK3WZ0i9ss4L%2BM0CGfRbNvHmpJeNA3hYiwTL6q%2F898CFDB5ZOIT1wjDGi2JRhIN%2BWYGDdXda9TZGfgetMYy2OZXU8DH9frIB%2BpxKzbzKrVsYH2FBe%2FhGnpy1uTgwqpmDzQY6pgFuFs%2F1yPDpzz4Yu0spG7t78cjkFJPe5c0%2FPW5K44Ut9ftBo4yGEN0s2sDZe1EDwS49UPXD1G5vRp72nvj6i0Kr0UftBI9vwAi0J4R5jzx%2FMFNIdB3hndq9%2BPBUOpJC2oCCKUEQNEYETCW4qMP8rWZAAHsDdcaRwifbPv%2Fdgt2Fxy%2FESCi1SkKQjsS7lyqPHjEzaBLqI25Zgk468%2F2x6ISHBfbEY1I5&X-Amz-Signature=3fef27493bc5939999664a67ab7e8cb716565e1b66db8e36094da6b66195de70&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QMFIAGFT%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T231755Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJIMEYCIQDVnP7QTsdO6FgexHdi4lAy6Gu5vVQML22ESJDwhHjPDQIhAJGss56rRCokuEU3p3r8GRxRQZw9iiBymlmUI6cOrqleKv8DCDAQABoMNjM3NDIzMTgzODA1IgxeNtnn%2Fy0g4%2B0otpwq3AMZTbxboh6H9kFtsvNng9Pl2jGBatPvXEqncG28zaD2OTPPEA4NBTxF4aXBUhZ8TNr%2BB8CoHei6b3OfjMMHb0UqOfW%2Ft1LeIe1A%2FB87D%2F0WrBwhRPwXv3reTyJCgwE%2F%2BvM9w4ZSY9IATuQrflYTrd4T70L1e2zn%2B1V%2F4D%2FO7gT%2FgjxRQ%2B6Hwe2rsERGT1iO7lzGhC7DXkXwAmga%2Fy8Y6P9C9uKHjlINN2cMH%2BTHzqR3hYb%2FqCFrhG61aCOlyQsfxcw7Fph2LnRXJXK8PfAMc6Nv9erNOZ6J6QHjK1up%2BH9LXlXa0djTnheJqrO2mVPpFGl2c4iTajYPgBf35j4rioM%2FjNOFxxUuGk5OHbT6CI9F03Cct7H%2B2U%2FyIX6K3ZfGQDvIstKEOYDcSXtqE7Dybki%2F6URVe9Soe0%2FszPQZqNKEOVlMr62g8rwtcsBv0BgopqrA7UqIn29q2P5l55bI1XSJi9qE1wW6IylOqRiuTns%2FveEKoZPYfkdWdZJ69J3GPE5Xv6JDq8vDs67yLyuZ%2BBsH67tJIjzDs1HN2U%2F%2Fit5l1VoggJ13hxxYfNAbO1gKZ8XZwvMaFrnbszCYdXeKMCVhUM1LnIdhGW2cfCkHeWQjh2JlNO7nwHnUqR2gQTDil4PNBjqkAWAWGYoXWXS1YoeUEpUWgVma3YIFIWqsdtmTUA1MYRtrWneRl5UU4zrjW8E6wklv1GRzAU4%2B%2BvSvhQjJDb4twHsWC%2FomnZyrn8%2FxR2hy8A0J7Erg4cb0FgVLIWSmlFauddQVSGsNzKygLb3M5izRCojjZZoBr9cTP8t5ugsePGtqqeUjt91bHiRNGH8KLZ9s%2Fvy6GpmUEvJiSF0RO1EI04dQvgy%2B&X-Amz-Signature=f8ab9a5d7baf4758632c2802a93e5963153c6a37d99ae7fc74b12034bef613a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJXLVCRI%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T231802Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIF0TrCp%2BvMXdCEkyK2xZhbiJezSVRffTaHp78A00tJaXAiABljyT8T5kJ0DgkbeN0gtpB%2Bw4tgk%2BGt9l3SzkDpuZSCr%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIMVMot6IFEi4POWLyCKtwDDHZWBp5Ux5cFGR290JHExjs62TNXMN%2FgAGhkXAuTrLEdEnUKnQyOv5hxuCcv%2FK%2BJ2Z6%2FwPfPTmdBrf3dHpKw7eDMU1Li%2BV8QVrTKhHRhOTM12U7%2FnUjnwqjBs5mvmN5su41QJ6l1bVnccIVHKipbcz00GzSsxxsUaH2sMHzy6KBRO3lXcbAre22hYMZ8AeZP%2BJCKX8C3Kvqe51wrCpJQx2%2B7TJeg18LYgqfCm96bMC5Cxjrx3uz8vQEFxP0Wv58bNGML7aNNO8lcNynbPYGtmSeomTS6RDovyFG1VuB0EVodYlU1Qk6tssq%2Fdicv8eMcrf%2FOdKm4vrdmgQN41lAJrxwMhxG%2FlKL4dmhzHIkrZlQRjJlk3TDDUPwmySTeXW9ipk9pyKgiDsWHklG3bUsck9%2BkrMp6ry2nsWUgip3TEOGxNq3kAOBW3cTiFrmIRPgvrZf01q%2FxqFyxAL2EujqVqnNthtkurh52Ftu2T63zWGwZvRIyOVFRycgcOTS4FCGQazWfkanadVr6g9u04S%2FQ48qkbbDffeEII3HugsPL80Gj32cM1qvoYlTh4AL0Pz1S93p9n3V2Oo4XZPzjb0KuwuPDH5JLlNpUMHKjkAaYn7C5v5%2FJgBpGcPL8DzYw15iDzQY6pgHiwLgXQvxDxOqYtoZGHnvbt2Ol1Hn3eiQFHQg0%2B2FS6lJcojzHg16FmVaunygLUqolnD%2BpdNyllfzlHuCzdZ7Q8YQmsw3Az0aQTzllgO8iBApvFqUSGrFkj9PIWhvGM0RjtxI6qWRdMFM5xJ52xa7JNLP4QOq6eRoxW9ysLTEhGaIPlK7L2ipc19h2fgRNzRKY4gBosvWC%2BTf%2FVH9YlihGv95gd6u8&X-Amz-Signature=74e08ae98cbdca2166d13735ad63b82f42a7cdb36c32f97337505179cd454f1d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJXLVCRI%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T231802Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIF0TrCp%2BvMXdCEkyK2xZhbiJezSVRffTaHp78A00tJaXAiABljyT8T5kJ0DgkbeN0gtpB%2Bw4tgk%2BGt9l3SzkDpuZSCr%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIMVMot6IFEi4POWLyCKtwDDHZWBp5Ux5cFGR290JHExjs62TNXMN%2FgAGhkXAuTrLEdEnUKnQyOv5hxuCcv%2FK%2BJ2Z6%2FwPfPTmdBrf3dHpKw7eDMU1Li%2BV8QVrTKhHRhOTM12U7%2FnUjnwqjBs5mvmN5su41QJ6l1bVnccIVHKipbcz00GzSsxxsUaH2sMHzy6KBRO3lXcbAre22hYMZ8AeZP%2BJCKX8C3Kvqe51wrCpJQx2%2B7TJeg18LYgqfCm96bMC5Cxjrx3uz8vQEFxP0Wv58bNGML7aNNO8lcNynbPYGtmSeomTS6RDovyFG1VuB0EVodYlU1Qk6tssq%2Fdicv8eMcrf%2FOdKm4vrdmgQN41lAJrxwMhxG%2FlKL4dmhzHIkrZlQRjJlk3TDDUPwmySTeXW9ipk9pyKgiDsWHklG3bUsck9%2BkrMp6ry2nsWUgip3TEOGxNq3kAOBW3cTiFrmIRPgvrZf01q%2FxqFyxAL2EujqVqnNthtkurh52Ftu2T63zWGwZvRIyOVFRycgcOTS4FCGQazWfkanadVr6g9u04S%2FQ48qkbbDffeEII3HugsPL80Gj32cM1qvoYlTh4AL0Pz1S93p9n3V2Oo4XZPzjb0KuwuPDH5JLlNpUMHKjkAaYn7C5v5%2FJgBpGcPL8DzYw15iDzQY6pgHiwLgXQvxDxOqYtoZGHnvbt2Ol1Hn3eiQFHQg0%2B2FS6lJcojzHg16FmVaunygLUqolnD%2BpdNyllfzlHuCzdZ7Q8YQmsw3Az0aQTzllgO8iBApvFqUSGrFkj9PIWhvGM0RjtxI6qWRdMFM5xJ52xa7JNLP4QOq6eRoxW9ysLTEhGaIPlK7L2ipc19h2fgRNzRKY4gBosvWC%2BTf%2FVH9YlihGv95gd6u8&X-Amz-Signature=2ff8653e0d469635e4c1dbdfb32c749a626b7706ee4ac661f5a00a1f42c7715e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662L2YZ7LY%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T231742Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIDRgQNkKmKIyujk2ZxDhLPpUPanqxBojm7tsW7qkEAUmAiBPKuXgnsk%2BGlYQOLhSST5bpyyV61vpiFAXMRrZe7yd1yr%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIMC%2FRZuYq69OxeZRGNKtwDpoGmksCG3ZFclhy%2BpGiBwBfSzaVCq%2BK5Z4FCnq3GSEroGzSzugP8g2k14lck1Oa3ZYt4ToMdMkZI%2FAfgcP2aWni4x5zuOttTWcjVCrqE4Z%2F0UYEWPPY6brUJgnmGZdtaURQJfW3Ug%2FQVc3exIG%2FGTPeAl%2FTruH0o2vq5ljlJlP4AVZuLSESqmlIl1htTo4WNpMyR7hUarTKLbSEKwwe1EZTqPwQI8lHIwo7rvBc7%2F0N0eVtYhz4H08gXsgfvMaHsp979XMJy1KsjN1vQxmw09%2BGboC1l%2F%2FTm4Enz3e9FMCXwcW6%2BwzQc2FMCfaW%2B3a2cEiW3hGtePaurLPaxRPqfcZnWCqfp9RoYHjfYhE72711Qi5OEv1xJwVI6SbBwFl9cJmRBZHVjjKJ8Yg6awlU2erSymL9hAZ3jK1C5te7tgj1ECMGgJeaRig%2B6aZKeLdKo3ZXC2s6%2B1roEktJ1fGjSLbZIiFs%2FUdB7Nk0ZfwtLkdmJsqEs98w2rREjhkyJltFXhD2g2X3lTnx1tjmb5633w9Kaio%2BUAKDz2%2BGgXwLXfwgURe%2F349Sfb5p%2BhXQrI3YMCc%2BIYhmCyOruuXLGfQCIqacnmjl2ZNiPkzW9ubDkI2X6G8ia5kqfJ8sv7Ngw7JeDzQY6pgF%2FY8QZH6sMedami5CEr2d0p%2BOt2IZrePnca%2F4E32CFxaQZJ6ctxv3BLBDgQTgaf606WBELyT%2BHdly9HQfbe2V9dhFdf5LsWBg1yBT3oUsvaNtqBU1mjbxu07DWUyixgjH4D1zZwEJpa5xdogSpcShXbEjyYmShxkWJiQB1HYg1bNj3d9IsDypTiep9A7POJqcCBfhaDs5OAv6dFxnz44qhwtTbF8rC&X-Amz-Signature=3bd737a03427c595502b2dfe084e98e5e7ab10911f69c6072eb494efff9b57ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VG3RLSEA%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T231807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIHpeVC7qNAyPrqVpvKJtFGGzkcUHUKD%2FjxgX444Ch%2FSYAiA%2Fbjf4%2BbS3ScmGBcf%2Bk9Ji2%2B5iA4ivP%2FzPSAl7yaF7qir%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIMJqurYfHxSH3YwDHwKtwDPC5TjRv%2B%2FIUp8Mjri2bG%2F8TNYB5TjDqMKfSrYPkMZccUJ%2BIEnWaUEH7wtAWabVn8M9RnbikecnWSUFUATkLVew284l4vKnG0uUx3a73vi4VKZtmK7YTDNc7FhT49VD38P4NO0KeZxJ5WGgcWz00aRft4ys1DP6W9pLxApX7kKBaVFnKwZeqzdYchVm%2FLeU0S5Fxd0CCb83m0pH4ADgpwZbyqaC7AX22l1EM7e3Od%2BkOLmK35IE%2BLaG8Eu%2FB7qj63Hw8GN8%2BAaVcohDiGBwrOyv93cmwP32UHKL2Th7FG667Iks3kkw9A2jq07t6IJJrTLVs8XbjL7qt6vbHBw2UB0gcn%2FRF1z%2F0TCHTdJZECn31Ak2zAbQAHGfF4ih8ssrJAEllfgjpxFIda4lc1R%2FnalPdCnl20hIluQ%2Fa%2F7fPcRbJk2c4Ss7vaFcSNxaRIkTGNPot%2B2MK9Pzhe0cyOxNR4AL6H6m0FKq3nXZpo1gYdoBPezlmxdVpJE8v1jErlxa%2Fj%2BzZWUr9d6ED6M2n%2BbH6mGxDNzkrBB0xZhc4jY7i8R2AjMRJxkomh6le0YBugAlq0CYMrrnDM8Khr0wwZTuj%2BBV0SkjddzHdqZ5B8cBfUH%2Fq0F3aDJTY5blP%2BVRgw75eDzQY6pgGub3MndvTqPYvGFrMT8qzgoNiWbqaO6pz2m02abOvdKDvMgHOnV5xqDFwlMBt7%2BvaoQLBOsWjSYkIJRFGtdtFJ8d5CUulEoLaj%2FPagfCoH773f7pd674u9HCRI%2Fv5K%2FqBRIc%2FE9%2BLVEjSklmBlo9KTJxMtakAt3wHKUj1DqqtQ3%2BQiz6WvhLR8LZZ76Iv4gQ%2BiGgtL1hPeuKcxH7Jmmow4FJOi0O2h&X-Amz-Signature=815814f6fa290546cdc741646ec2bdbe55a85ffd2497a50f9364644406c3d2f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VG3RLSEA%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T231807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIHpeVC7qNAyPrqVpvKJtFGGzkcUHUKD%2FjxgX444Ch%2FSYAiA%2Fbjf4%2BbS3ScmGBcf%2Bk9Ji2%2B5iA4ivP%2FzPSAl7yaF7qir%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIMJqurYfHxSH3YwDHwKtwDPC5TjRv%2B%2FIUp8Mjri2bG%2F8TNYB5TjDqMKfSrYPkMZccUJ%2BIEnWaUEH7wtAWabVn8M9RnbikecnWSUFUATkLVew284l4vKnG0uUx3a73vi4VKZtmK7YTDNc7FhT49VD38P4NO0KeZxJ5WGgcWz00aRft4ys1DP6W9pLxApX7kKBaVFnKwZeqzdYchVm%2FLeU0S5Fxd0CCb83m0pH4ADgpwZbyqaC7AX22l1EM7e3Od%2BkOLmK35IE%2BLaG8Eu%2FB7qj63Hw8GN8%2BAaVcohDiGBwrOyv93cmwP32UHKL2Th7FG667Iks3kkw9A2jq07t6IJJrTLVs8XbjL7qt6vbHBw2UB0gcn%2FRF1z%2F0TCHTdJZECn31Ak2zAbQAHGfF4ih8ssrJAEllfgjpxFIda4lc1R%2FnalPdCnl20hIluQ%2Fa%2F7fPcRbJk2c4Ss7vaFcSNxaRIkTGNPot%2B2MK9Pzhe0cyOxNR4AL6H6m0FKq3nXZpo1gYdoBPezlmxdVpJE8v1jErlxa%2Fj%2BzZWUr9d6ED6M2n%2BbH6mGxDNzkrBB0xZhc4jY7i8R2AjMRJxkomh6le0YBugAlq0CYMrrnDM8Khr0wwZTuj%2BBV0SkjddzHdqZ5B8cBfUH%2Fq0F3aDJTY5blP%2BVRgw75eDzQY6pgGub3MndvTqPYvGFrMT8qzgoNiWbqaO6pz2m02abOvdKDvMgHOnV5xqDFwlMBt7%2BvaoQLBOsWjSYkIJRFGtdtFJ8d5CUulEoLaj%2FPagfCoH773f7pd674u9HCRI%2Fv5K%2FqBRIc%2FE9%2BLVEjSklmBlo9KTJxMtakAt3wHKUj1DqqtQ3%2BQiz6WvhLR8LZZ76Iv4gQ%2BiGgtL1hPeuKcxH7Jmmow4FJOi0O2h&X-Amz-Signature=815814f6fa290546cdc741646ec2bdbe55a85ffd2497a50f9364644406c3d2f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666GKIRLRJ%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T231807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIDQTrUR3Zu%2BN90R1GKdtbcGhxCvdE9R6AbN%2BI73z8ukoAiBC8R%2BUHUcITkeo0c0SUdbwHptCz6%2BubJNuPwhNQlHOtir%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIMyT0PGJKtgeeJ3v5NKtwDXvIEPMKr%2FSWVXQaboA7VJbXcKEXFedpxMFlPVugJfpq0UJa%2Fi55Tr0kS4y2cpqTDIEDXsfDzuengNSBd7MBZGY4d50qGvV3ASLL8A1902wKjy4aOJFJKok4KIcKWrXc9ewSeqijSF77Y1dxWm8hIKigHdUegAvpmzQvyDgbFr1crX7OOAnD3bS%2FOtKHIuXPEMsUd1Jge59ymtXedGYfxs%2FX8R6WyYmSXcfpYRyNw%2FX1z3Oyy7Sv67FGRfCB8ZE3lIjRx%2Fnt55FIeiGeXS5JOQjwF3z6QmvxWIIAgPkfzcBNGsh6gZ%2FjV1n%2F5jLynDF81O%2F8hk3MmVx6kDP77BksqO6GZAoPnOQNkdMnttH%2BsZs5kThhQ56AVQTS9fYNDwKaQf2mVBxPkZYWhAULb%2FiXddw7rnzs7%2BZecyDnnPbeGWgXEzqXQzPcpHT2a4AfoOVVcrpNBCKWyOS89Oay1uC7YL%2BwJYGFwzwUnuDFb4mBddk6j0r9stKk2%2FidHUgHvxiVKnUVNrnU8SnWH7z8u1e3zgL84hMd981bIEbZc0WJJX%2FSA62Us1TsSzhUFFh8RINc7RA%2BDXaKGGBM0GWSnrbBfTrIklw8JYxySGSdAIULWAYGM5C%2FtF8%2BBu59Tbr4wmpiDzQY6pgFrUeeI8yjNHUOk%2FwhwyD4W77IKMyqwynkECSIc54X3BbVedVCbYJwARGS1UimYcoarpyXpMcvcFZtC5dgrYs4znLtd2XmYbmvke%2FHJWnHoWDiWZKQ6G%2FOHm7LXpotn2ZSjyYr9UyXkrXxR41C717A1qWYQNiO5xjI12LYABVgUxzB76CH0dC%2Bf%2BTcATKglWwsYA06F0kDob9%2FkpfdJVNzbRJadU017&X-Amz-Signature=f0567bb2268f66309fbbf029c89bce0dc2dc94a8afd7384efb5fa54a7baba824&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

