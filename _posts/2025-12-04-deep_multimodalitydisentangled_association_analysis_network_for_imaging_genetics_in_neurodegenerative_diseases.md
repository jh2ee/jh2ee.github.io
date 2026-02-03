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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XQLBWDT3%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T202116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQCLlWUbbPhufbxG1S1gI24oxr83X5OsePv0gSUmNml7YwIhAPGs6FuYBNraQmumkc1Vp6U1y13JHAZbP1hghL6G2nEvKv8DCAQQABoMNjM3NDIzMTgzODA1IgzmJ%2FH2x4JzKRA7l7Mq3AMoLTzy2WtEGZSW1%2FZ2uoZ11gfL7hAIqrlhZzMeATi1jY3UQSgZZlclMOH%2BHF6wRKRcZ2VwRf%2FLAqSHGewkSvOibzvh3CP6a1yCPzKj6iq7nVIlU%2BNaN%2F13rJRS8D38VxBMrYGUQrgJjsML4IJeAPWfQuDqn9yd%2BepuHt%2FKEVZMozMdkUwuglJlLiK5khxfARhGnEMTR%2FGYV5Oi26FlDuuJeyAyJf26GKvpWY0Vv4dtfsxgTNdwrTVr9MUkxafE4Py03t%2B1vF9yn4BC5aWrIi4JYRUUrMtPuA1tipOsYrHzO6z11H7VcNb%2ButFIb9cUWnpBcBPeFpyWRZMJC5wvqwNkKQEfNFFdnyJH2ziIpAYk2hIqKRRbPnOtS6zMtsn8u8EckUuNWwNTCwzQaCoRMWgg4kP2vdLAymXCrrU4K7QSQBgOHLV5qTehBhfh01BTY%2BmfRbdAeYWXYqsAl%2BQ%2F11gz4u%2F0w5LVRply2j8zwejjGCXK51vdW38uiO20oIhiAmkneDSmfkqeTg0vwfq4cdfExJmw6OO9pNJ29%2BkZLQhOxSrO3rSCN%2BQfAC3Dbd8WwEa2oW9dVH7zsWmdjGlZCPT%2BLUllvP7JmpZoJRiDscRQL7RUitWl44w8QqR8ATCqhYnMBjqkAdIaQlUdn3uUruruPYPSCxNeRaDBoMa9%2Bz69PEvE9hja7Zj4QFI%2FS51eSDwiwRMCkFI9vcGddMF2NrMvxRZpj17rG8nlVzz4VLZeLho0U7ITfk111to4zxL5QCa8DruXD7cw5EKcag%2F5we9RuHOIItVUWJhXMFqSLWlHbOXkTEEw6elL%2B49xpQTuqZt3X38jD%2BfU%2FI0bFezz6xPQ8p8EzdbQBl9D&X-Amz-Signature=5ef66f06e21cfff64412ef80d1399d04c1e7ec5eee05769ddeeba196e05c920f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XQLBWDT3%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T202116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQCLlWUbbPhufbxG1S1gI24oxr83X5OsePv0gSUmNml7YwIhAPGs6FuYBNraQmumkc1Vp6U1y13JHAZbP1hghL6G2nEvKv8DCAQQABoMNjM3NDIzMTgzODA1IgzmJ%2FH2x4JzKRA7l7Mq3AMoLTzy2WtEGZSW1%2FZ2uoZ11gfL7hAIqrlhZzMeATi1jY3UQSgZZlclMOH%2BHF6wRKRcZ2VwRf%2FLAqSHGewkSvOibzvh3CP6a1yCPzKj6iq7nVIlU%2BNaN%2F13rJRS8D38VxBMrYGUQrgJjsML4IJeAPWfQuDqn9yd%2BepuHt%2FKEVZMozMdkUwuglJlLiK5khxfARhGnEMTR%2FGYV5Oi26FlDuuJeyAyJf26GKvpWY0Vv4dtfsxgTNdwrTVr9MUkxafE4Py03t%2B1vF9yn4BC5aWrIi4JYRUUrMtPuA1tipOsYrHzO6z11H7VcNb%2ButFIb9cUWnpBcBPeFpyWRZMJC5wvqwNkKQEfNFFdnyJH2ziIpAYk2hIqKRRbPnOtS6zMtsn8u8EckUuNWwNTCwzQaCoRMWgg4kP2vdLAymXCrrU4K7QSQBgOHLV5qTehBhfh01BTY%2BmfRbdAeYWXYqsAl%2BQ%2F11gz4u%2F0w5LVRply2j8zwejjGCXK51vdW38uiO20oIhiAmkneDSmfkqeTg0vwfq4cdfExJmw6OO9pNJ29%2BkZLQhOxSrO3rSCN%2BQfAC3Dbd8WwEa2oW9dVH7zsWmdjGlZCPT%2BLUllvP7JmpZoJRiDscRQL7RUitWl44w8QqR8ATCqhYnMBjqkAdIaQlUdn3uUruruPYPSCxNeRaDBoMa9%2Bz69PEvE9hja7Zj4QFI%2FS51eSDwiwRMCkFI9vcGddMF2NrMvxRZpj17rG8nlVzz4VLZeLho0U7ITfk111to4zxL5QCa8DruXD7cw5EKcag%2F5we9RuHOIItVUWJhXMFqSLWlHbOXkTEEw6elL%2B49xpQTuqZt3X38jD%2BfU%2FI0bFezz6xPQ8p8EzdbQBl9D&X-Amz-Signature=5ef66f06e21cfff64412ef80d1399d04c1e7ec5eee05769ddeeba196e05c920f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TXGYFMS3%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T202116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQC%2FfvJQRkYXX6VIKoqghilkHC1zq1nBwtLYfH5JHP%2Bm7gIhAIXkY3LWXZnGpSAi62tCKS2NQ%2ByzVRm0vnzQk7Vv5cYiKv8DCAQQABoMNjM3NDIzMTgzODA1IgwtbSvoD4fFPt1g41gq3AM1ws2rcqZgPHOkjRATkpS8SCw%2BmQBI2gEG%2F%2FGfwiHpOBC%2BsbQkYQycMD7A36ZYpTf%2BWULsHtc82uUAFDCx2gViYqbtzEktWsC7ZKBJdm1R7jiKkctml7cQcAw6oCOnsUvMbT%2F4fTiF6MlODrfcEwP0PuN9FJb%2FH0chPFBfVV0Tl1s6ehkKG2nnGC4FHkMor15UdBua1WQJP%2BF5JRd6ETbFsXJtLtbnydZTZMSZx%2FMZvpB5S5OQ5tew39JWJQpuO1HUwsQVUDAQejS1Lp8TXEMnq%2F9YlNjtL0McuiEvNRpD6ZQXoqIJvDUjmThzDzBfN2GwPhRAFPl45URBrczUk5TBRMRGnggtQQflE6lOCURVaR9Zk7BLplljThYvMo3ApnLB7Z3BZSVN46W0Fn0u7pmn8dVPK65xTiZqWOqyAjsn4%2BUyqrw050smIFdLrSvLPKI8iPVY1Rfbs7aPIjgvg4fmu5D3aPNBLJ3bXO6yl3j56qzRHsSvWt7av%2BHOrw3dBjsX1Zqtjahe3I6eEstdHlTjIVqYQou25sX2dVur%2BREW5OsfivGSFM%2Bcbw72rzIIl5NF9UfSIUeOcKXaNkve4a54ObidV4dHup5m5hZVDI7fHTACdhd3Ov3FWJhw%2BjCBhInMBjqkAcfsCsuWwU3ShCz8gvLx82Gysc87hUUaaZFzS0yoAFzZIvYAMyUZI%2FHL%2BjWNp8AvQtCndgUfAVbQ2ZBd9ipOHBqn2sdBVOcCTBcNgHKBIBFoGYJMDUzOZDNYZZusjubzXaY2kRVr3xhmp8WV33hsIl5JqH4d764%2BEfj2G1voomGa7qgn9uW84M3%2FlD6WlRuOiwBMigilDAUuUZLBEdpF4HhBlJ12&X-Amz-Signature=3939dc7de31dd4a6ce6af7edc2a9d33e5be5434eac27c7b0100264d1d118b18d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKXRANC4%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T202118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIAblx5k2jjr8CtznQSowmJCH3rRBgUBvHcAcBalBo4sxAiEA16igWOHQwEJ5j96GIDV9uSldHV6MzrUkX6ZidzYwKV4q%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDBcg3bWt%2BRwA9F9cwSrcA3JThelMIVYf0zjQehPe%2BEO8cxf5opj923kYI7m9U6pLGB0KP46DbT1%2FPcIbjM%2ByTBO0DPlKypBQp7M6mJqjIl9gvUKDTILlZro8qJrPuQn5%2FfrrDAPTRwM6N02%2F36j%2B%2B%2FqdPODjkiUBVcNz%2BQ3LQ3Wl%2FTITGQT0IyOiN5yomQ0IdYUhcIpJ1EKaqP4CP0UtQmNtuG%2FAVdWfwRCyakS5A0V27Atd5Fw1JSgLjUzIzNeQsir%2FMidDUMLXygCFTF5%2Fa52t4h4u%2BkGzaweRrsVxEUCdUzAyTftIp4XB%2FZjYJGwo9ELLWOZgSRZNBUUJ%2Bsp12nivBp4lQ6Bk3axg9NOcaL52BFhM%2B2eYlCNwtY50xXcPzqyMSP9iO6DXyNJqRV4%2F5wSeeforTQnFofQj%2F8LfFV93iW3SoFiZsH5zq8Y4IlGe9MkH704Pm2GYGR6Jyl%2BRmcntWhc8iLsK3u%2FGoKSmWIz5MLKcYIYKQ929Gy1yfWJ3VB6GwYhZ6TNGlLWt8MWCgmhIpwBYfyBTSAAC6NNvtfcb9Xmp0AnnqdY9jspE6ckJ0ycUNdz460T86%2BEU2dw%2B29cqQa%2BkApv5n65EODRqzBDU%2BVdT0nNsHkgPZJ7F7DsDgtuUDmNUu9hSpzdQMN2EicwGOqUB%2BKui8Swop%2BFxfq5EkJspK%2FGjRRSi%2BhLMw5JySpo5yO2ZyWIX06Uc7A1bdPVNAmBF2w7JlCWWdOscw466vvqW5vHbD1l%2FXnWqkNcBHjtOIbbwe3mCUYGMasGalJYokPTtE6af02cfFqWE%2BD75bmssZOuNBzojPMM97kb%2FEGLpKKL%2FZJB5UVnzi6t4plqVNq3W1E6bHmIxYil9XZTgizp5JHYDBMKZ&X-Amz-Signature=e90ef5af14f47f376ab505608e6515442d06d109520fb20305b78e4dc727ac8e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKXRANC4%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T202118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIAblx5k2jjr8CtznQSowmJCH3rRBgUBvHcAcBalBo4sxAiEA16igWOHQwEJ5j96GIDV9uSldHV6MzrUkX6ZidzYwKV4q%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDBcg3bWt%2BRwA9F9cwSrcA3JThelMIVYf0zjQehPe%2BEO8cxf5opj923kYI7m9U6pLGB0KP46DbT1%2FPcIbjM%2ByTBO0DPlKypBQp7M6mJqjIl9gvUKDTILlZro8qJrPuQn5%2FfrrDAPTRwM6N02%2F36j%2B%2B%2FqdPODjkiUBVcNz%2BQ3LQ3Wl%2FTITGQT0IyOiN5yomQ0IdYUhcIpJ1EKaqP4CP0UtQmNtuG%2FAVdWfwRCyakS5A0V27Atd5Fw1JSgLjUzIzNeQsir%2FMidDUMLXygCFTF5%2Fa52t4h4u%2BkGzaweRrsVxEUCdUzAyTftIp4XB%2FZjYJGwo9ELLWOZgSRZNBUUJ%2Bsp12nivBp4lQ6Bk3axg9NOcaL52BFhM%2B2eYlCNwtY50xXcPzqyMSP9iO6DXyNJqRV4%2F5wSeeforTQnFofQj%2F8LfFV93iW3SoFiZsH5zq8Y4IlGe9MkH704Pm2GYGR6Jyl%2BRmcntWhc8iLsK3u%2FGoKSmWIz5MLKcYIYKQ929Gy1yfWJ3VB6GwYhZ6TNGlLWt8MWCgmhIpwBYfyBTSAAC6NNvtfcb9Xmp0AnnqdY9jspE6ckJ0ycUNdz460T86%2BEU2dw%2B29cqQa%2BkApv5n65EODRqzBDU%2BVdT0nNsHkgPZJ7F7DsDgtuUDmNUu9hSpzdQMN2EicwGOqUB%2BKui8Swop%2BFxfq5EkJspK%2FGjRRSi%2BhLMw5JySpo5yO2ZyWIX06Uc7A1bdPVNAmBF2w7JlCWWdOscw466vvqW5vHbD1l%2FXnWqkNcBHjtOIbbwe3mCUYGMasGalJYokPTtE6af02cfFqWE%2BD75bmssZOuNBzojPMM97kb%2FEGLpKKL%2FZJB5UVnzi6t4plqVNq3W1E6bHmIxYil9XZTgizp5JHYDBMKZ&X-Amz-Signature=996637f05b94209d752b00fbae1fe5b5053b0261105a474325a4e085f1267fce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666VZU7C7N%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T202118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQCPHyKFmQXh5%2Fu%2BpegJuDQ9a0nTzjx9u5BrEOYRe2ObuwIhANf9b0v%2FfIMoLgxjmhdzLmQeUJB0zVDWc7AUhLvTWL0XKv8DCAQQABoMNjM3NDIzMTgzODA1IgwliaIqymXs68LneqMq3AP2wX0Y2zkkTh9PnXp6TuVXvR1ggbcRrysoDSRKCeZnj%2FzIkoVWvDNEM8hLTydXHBfg1aIWOyaAitPTS%2FOFDFaKqxO8GfvEs4A3qUbp74YfuSiFNnhRmk%2BNAVlTravlNu8fMxamkvDpcmOO93UXC6a3xHZK%2Bn8ufmb0ec7IVtpYIRTEmVFP9QkLWPn%2BqUNeEQtlE%2BODSaNOBzJI9lFW4tSacSn6ZUInIjM2YaVmwuxoF8lvZNVxFhq3WiVbPfQtFcbRSK5xkNB59aEy8KlyP2gJrn7CYExUI57BIjzzIvWfmn1U2t5RrEHd5ROmaK2WIpgPi3Da5XQf19EZd7mOcjgqFXTEkGgnFBnZ6BJzEZhq7VuMO2CFuOR4AlV%2FjOI7Pk6aDAjueUWab5Bm0bOPp21BLjJKn2PEyA0iztG200ZTxY5G1p2d3BAAsSQpiaVfISzFqgDJK9HgTZcwoFDlVo5DypxEcIh5H%2BkxFLSlEZB5apcyncuRqzdWXGCpKMLQX7NnDUlS0crpqaOnnZN4mG4nzUoZJlCjjtIENDBfjFA1eA%2Fv0MvMlnMS10ygzruZQHd%2B%2FvNwvteosIiko%2BvACSupOzT5bw%2FG1F9ZjzhqTt5D3fOReywdnMuwgosBlTDFg4nMBjqkAS2Hd5uPZuDuKIeJjDo7btRlpam0rmOFMPP53afqbjcu7VxC4AKja%2B3hcWSjiyyLEJjo%2FMDjGfgoBRTFsJewzQaWhxNQUO1YXI03c6fR9snlP50N%2Br1zH%2FokXEAHFieYxRx%2BzM39BKrjII8cFWTioJ0f4YZ8c6FFhNU87p1BEMHliNAeMsiFjbS8ox6cGLGpI59m2Z97epqL8sfil8aWyj3WveVj&X-Amz-Signature=83ff2e9f6d23fd96984d6bea6618a89601cb109240a0ce273b31425cc003b9d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663W4RTFXR%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T202118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIQCbRRyLfkg05F8IqAqGT15Co8Hfz6BpbiHxp6OeLMxpfAIgcwXiifIcrw4nnPsJbCKwhZCRyXNxA%2B4kie2ZbJSXnZ8q%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDIY3kkLLz5syQEB91CrcA2fFn2HydNPNVWfYetxeCkdzuuIl%2FaLjoiB48G50SUppWCxv2z69OMX97%2BVguOedrlRU7CxBUiJQ78LtFqrsm9%2Byi21e9GONO0sjtC2eGoNqSXrKv56hdYOUvF2hF0%2BCUE6RGkc9M%2BGDZfemErBnNGVR%2Bla7VngLDWDdd24gBPJewIb465ffXN4cKThNL0Fg4QX1EP4EVaDCMoJLbAby8l9kXSbINiwfqA6pgKp0BJ2W8P9iFsYSGMcCwJpjiywoOV703J61HUN6EI3MQtNpFkMKZW37Ec4hR%2BC7kkqg2e1x75lShK9LpYPlKqAh%2Fold3GvVvP8TgT5yC8MTqoDP6qM4bwVBbO80rbx%2FgCyIl9ychyn8woLel4qZibqrCImgo0w7pC9wiYCo55vJWzcvT1%2Fpi5ZpKciLko5Z4W4eX88udCquU%2BopTUG2fjzmnR%2BEjVSveFWCcetwj9yG3glbp71pmEoidIVTtqrSydosIrBhVLs%2BwP6nPo7VP%2FPMBJxgxB%2BqOLK%2F%2BGBre%2Bp78Ru6D7foeXKiMYHvIvMuTxy2vIjx1k4SuK2OoSZmA3XJGsKO7Cj2utGUc8waru%2B10%2FIvz08Hf75MuTpU%2BlNkwTUs2K%2Fx6qLk1dsMzKdfQzAdMJiEicwGOqUBrRzeGdzWgfnfEwqnn7lAi3n6hsSj0BNnrSJ%2FEMlOqqHKSAfU1alzsvR3wmeLd06nClI4NnheRuabTsDmR5l0Oz8lXpWyrVjYwFWAkhbUNkUqeHv7xM3V77Z7fv1TyBxK20o2C1tL%2FgQD6K1DpoBMr00VI4JKb%2BJNx83WPMfXEcyJY%2FYnhRZWoDl1GvfrRIVlA95QKAHhd3j5Ek8UMKXBF0qJqGPi&X-Amz-Signature=b227c6d9ce1649196b32dddfe28585cac1b2f8a90ad2dc51131e38ea9336ceb8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XMK4BVF7%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T202123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJGMEQCIH7abuVUIpIMpseZaCET0oTjwr3AoiAzgEFh909%2FWgSoAiA3DaDMzvPZWldGIp%2BLD9uFhzvhgn1MGrBYteT6WG0JWyr%2FAwgEEAAaDDYzNzQyMzE4MzgwNSIMU%2FKjqyicDrRMVdMIKtwDSRkQwTruWIyKHdPaQWiy5U%2Fclgwnn3t%2Bg5I4rWwj7LBg%2FTsXJJ1ZDaLDqKftWyKgeIKTn%2FiXYwRlwiAKQzgj0mvLM8N6L0srGSMJCQDg6SBrrkT9tQQynWow4ZIflFtmhfxk0BXSLcnbz84qJ1LUDiaQKNqLfS%2BkQ3gny3QVPXEV8ckGx4mBVeuRkdBhZwb%2B36qxWXSYXuedhB1LdGkd7Mkc%2F6EpDg%2BqTOjM71noWEocFRR%2FvQgc3LyU9JD%2Fn8Yn4%2FgBCcpBux07w3leyNQcRUqNablNzy1Drdz4OWMCIAb4iC%2Fj9xmxfpk57ivdwA47%2B7eLnZW0uRuEdJfIQavKZasgTugTkoSPkijW3O0enhFg000KJcJ4GZ1P2oa9i7s7m1CbRYHkchwvPDYx2OpAjw%2B%2FXqj1hik9M4EsZaI130ru%2BU34PJ82SwGOW4GuyIQ2xO2MOxA7NHuqWCMAJ0ILKrP4sQOOalRsTXYhhvXgokIe6xKy10HPTyKxKU6Knw8rmlLmhB8tCsHZJ0qo7ynGzEu73OhKRHuiVvYBERCAcq7MzI88U%2BusYjgKf3YfLyE2dOdtvQSfM0YThO80QuOauFuiBwbwfDog%2BaBZfjq6Xq2xhX76OvJas4S%2FNhQwp4WJzAY6pgHWAlqDPVy6zsxA8SnlCMcYbz5tEHw4JZozfTVf9VPzfAOmaJpGrt7GEes5aQhTCruJjCpMIVQlOFYb8jbpkg1XPa76Dy5L%2F4iMj5BKcMRT809nlswcc1ORDUWCAkM74gXAVdnduyIVNJvI%2BeYgwRz%2FCgHLZCS908XYn2GsjkatPbnLsfJl%2B7YcBrICzbGXFe21%2BMrFzaWeNwOpDOGOVuUkHdsHiTb0&X-Amz-Signature=a01f045e87a99dba6a7c8636326e7bbace59f48da376763ab3ade98fa36aea8e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W64SR6LQ%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T202124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJGMEQCIDJSoran7CILOYUxuf0vmH2LIvxdnoZqtf4MDkqFjdqUAiBMaH7GOIRRyLS9HhqIeFaCBgnj%2F8oqfziYHJ778tItNyr%2FAwgEEAAaDDYzNzQyMzE4MzgwNSIMXUzrC6i7tJ65Usp9KtwDVCXjrQ8HvrgicSG9knIWtgNmW32s%2B91vvTkZWTPoGK%2BGWA%2BRg02m9GePRH3Ma1VPpwGLROLlzQ7Qf7IbbRIfOXuml3a9YMZ%2BLXgXWPoektLSBiKOKqED8%2FJunPN4ywKu5YPp%2BgnhrEbzBndXK08DiqWuzmIVliXb2t4xZ5ChZkdPnVW5lUR8OOQ1i0%2BzVuF%2FbHtIpp5b2Q4CYAJjInSsOzkE8NXC6Nj3jshaG%2FSLhdHP7e8nt0lRal%2B54Le0uS3QCu2HJATh%2FZ%2B5ruL6IDmJgzxUqImMwer07g77rS%2FA3nlMzwo%2FPHk0kxJg4UW3tVnrOtXXYuqEOAtSQ8UOs6l%2F4BkQxBDJKwvvCMFCHKINx2TZcqIgNC0RRMsbFk2M1KALXqyWCym5OkPqQVVcE7X6WW1YWKRu7nEnSV24Mtj%2FJSN1PYPUuzSsXnaeCYR8MWdPvK4rQlyGZ7uDyZArF2%2F3KfZ0CkdPC0qAPElKGlgVIoo5gbpfBHyGR0HJ5%2BkzpodMg2bB0nru%2FYqBQneX5G9QEoBQr3AdG37LmQ%2Bjvyavk6hy6E6II0pQX5HiFls2PcjnzSR%2BncFrsFHyW3kfD3A5jzWlrW6my0yvpLaj5XKKR3%2B44ZG8vqXM9Acj0sMw74OJzAY6pgF68PaEs5rJQF8emd0WKt2H9%2FfqdQwefJPYIGa12KLimlPeWILtgXf8YaKjGT%2BiTkGLn8dI%2FyzrDdqfVK78JsU9kSn61MkaECk%2BpOzpx%2BCicltlFXr2TKqU8pm4cCywAd6W4%2Bou5MDTmHzwgG4ibID%2ByLb8pMrugoKHMQk48PRJTphx9MnHZJoJmCKFMdUpGQIVC4VjHfy659qFcmtnplnhcJQDw20x&X-Amz-Signature=53ea13c93d1ee90a960987b5ebf3723ffaaff3081e8e9571d5ab06c7ccd02b87&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W64SR6LQ%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T202124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJGMEQCIDJSoran7CILOYUxuf0vmH2LIvxdnoZqtf4MDkqFjdqUAiBMaH7GOIRRyLS9HhqIeFaCBgnj%2F8oqfziYHJ778tItNyr%2FAwgEEAAaDDYzNzQyMzE4MzgwNSIMXUzrC6i7tJ65Usp9KtwDVCXjrQ8HvrgicSG9knIWtgNmW32s%2B91vvTkZWTPoGK%2BGWA%2BRg02m9GePRH3Ma1VPpwGLROLlzQ7Qf7IbbRIfOXuml3a9YMZ%2BLXgXWPoektLSBiKOKqED8%2FJunPN4ywKu5YPp%2BgnhrEbzBndXK08DiqWuzmIVliXb2t4xZ5ChZkdPnVW5lUR8OOQ1i0%2BzVuF%2FbHtIpp5b2Q4CYAJjInSsOzkE8NXC6Nj3jshaG%2FSLhdHP7e8nt0lRal%2B54Le0uS3QCu2HJATh%2FZ%2B5ruL6IDmJgzxUqImMwer07g77rS%2FA3nlMzwo%2FPHk0kxJg4UW3tVnrOtXXYuqEOAtSQ8UOs6l%2F4BkQxBDJKwvvCMFCHKINx2TZcqIgNC0RRMsbFk2M1KALXqyWCym5OkPqQVVcE7X6WW1YWKRu7nEnSV24Mtj%2FJSN1PYPUuzSsXnaeCYR8MWdPvK4rQlyGZ7uDyZArF2%2F3KfZ0CkdPC0qAPElKGlgVIoo5gbpfBHyGR0HJ5%2BkzpodMg2bB0nru%2FYqBQneX5G9QEoBQr3AdG37LmQ%2Bjvyavk6hy6E6II0pQX5HiFls2PcjnzSR%2BncFrsFHyW3kfD3A5jzWlrW6my0yvpLaj5XKKR3%2B44ZG8vqXM9Acj0sMw74OJzAY6pgF68PaEs5rJQF8emd0WKt2H9%2FfqdQwefJPYIGa12KLimlPeWILtgXf8YaKjGT%2BiTkGLn8dI%2FyzrDdqfVK78JsU9kSn61MkaECk%2BpOzpx%2BCicltlFXr2TKqU8pm4cCywAd6W4%2Bou5MDTmHzwgG4ibID%2ByLb8pMrugoKHMQk48PRJTphx9MnHZJoJmCKFMdUpGQIVC4VjHfy659qFcmtnplnhcJQDw20x&X-Amz-Signature=753676459a0a2eafe06edce261e7e1687464ebd2dd42bb5f66b0e45eea980b34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQANK2QU%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T202112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJGMEQCICt7YcP1Da49UbfEEJO9g%2FUYwh8V%2BmzAybDHqmyD2fcWAiAnIUaNXR9iNQhD63q587J2paZ980dRJdvhvshAiZH3%2Fyr%2FAwgEEAAaDDYzNzQyMzE4MzgwNSIMxwF7cva9js2%2BbXvLKtwD8SngUxqdhSVWFlFsGXZL5%2B0YGmYA2dY2o84JZtvscNz0WhOs0nSqBNoQL1SOw2xn81w2eq%2BHmcuyr2uHBMbByQ8T1qypt5zdjENJ71c6qxCOW9DYmqjr5vJ3hVMcJci%2BZLTy9SM7YoEOE7HYHfnkdoQ087lSKcsAqh1G%2Flz7MEO16aM2o3%2BtkgRKJ8rKNPDyy%2FG2g8AS7d7AUEmMsuNfmHguit6hmDg0TzSNNrvCP21RzrzRjDgcK%2FrQO%2F%2B1UdoEgKUr8c%2BThQF1g7Ung6iAeGXhw1JS206MLxYZMsDaKPlS3uNN3oerbgqW9vDZDmKUTzZUiGEynr0ZBNWYgdwbulwsYrvMMF2TVa0dNl%2Fv98laRgdtemJYEZTarLJ3ajoKgkg5ehcI6f0HWJ6P1CUujEyQlD7YbpanZ1MBNjMz75MJTdw%2FuCmxLNV3ypEemXNmayFODApQeFI5LXmxbED1UKmlz53%2Buj9yrABGXUcJiGsz3%2Fy6C261ro8WzGsJV%2BbiR%2B458wCwabMEJvLG145nQtvlELOc6fxxYYhn%2B9NeimzGqCdSluhG3iGx6pOmZdVYc4DkOJ4wiPhM%2BAITkL0RYtj50lBF2am7bgODu6pmtcUhF8JAGUuqdaUVVxMw6IOJzAY6pgFaoxAujJgbk2%2FID%2B6%2BZt8244WlWxee3tUI3lPUwnDmFfLoDMn0TmuY%2FOjgvzMvQ2ngMDH5m80NKNbuviFieechGNCBVfb8VP02GSsPyrSVZv2D61piQy37o1P1y5Lp5LJoohbqU8yqh6JSgYS4zd1IW1BEvlO2E0mBpxavga4mnUQBzfYYUrdbpOaXmLEvGEbCbQBb6mOs4%2FWgYvMydGd%2BKbhBl0%2FI&X-Amz-Signature=78504859983ebd8af98f47f48f8be81ce5b54a67aeaa07390fc002a4f72d9cff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UWCNWTPJ%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T202128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQCa44CViKsvQADwSeRteWLKNJKeIlikQfQ9tg2Wzh1g%2FQIhAJc%2ByuWCAi2fpYmSEFG%2Fdlpi8cwPcf2Uy1Ipy2oIuJ3KKv8DCAQQABoMNjM3NDIzMTgzODA1IgwWIfdpb0Uu20xosZYq3AM8HnpXi1f6O1ikY47ZifAZW8uPtWQaonNPZSNjGEfPaWGrqwW9ySFkVL%2BPS6VoasytoA73o1kcl10mjL%2Fxt0rAodyzwyT8rV1ITdbuFbjh%2FA8jEXKFfNF4nu1bg9UJ711ANRvQC1OLyctkXVoJtxSOBAeUv4iBbcQTAdCsXEEE1Q0D85Iug32ktfEUaqQKMRNvJRt2k3UWpBJlzzV7V5HVaq03A%2BBOz6q5aAuKQ9lpWb%2B2%2BVi2VW6596BCvvYll2QXLp6nWeGDHVq88QDho0oq1R8pm7Db%2FlkG3fhEfGeBuGNWWfspUz%2F%2BY0o1NKQG3d%2Bs6s6G5ze5VQVF35uRCR%2FoTa0VQtrqciwconZAu15rlmJbgRUsIZXHR7llDa72aIabM3dZD3y7zJ88%2BydL1Bp1Wuf7XaBWIFYgL0jv4b7DHGwK14taKkavAIfLM6ZBbvXdE1O5yHomO2Q8MhGD%2FhggV5uSVojE3j7pp8Tdi3LqJ60CZQuYp5wRPY1XBtV64aqxchEY3qizffRmKl45zFQGirucO0ZU3LVOKAqxLZXvRltazUeipTyObxIjTLmXPnQDAeu3RkDZygHkNqJ6RzrZ5mjr1xiMUg1U2eJiLk3TnwuDLc2RehnlurusHjCNhYnMBjqkAaWl4W9EthCXfGSuYerRvFH0sCGAunBxUxFZCLdjvqLFx1fNEUXU2AW2o%2FCAGXscIItCCy2DOmNh7gTnKrNjkIOHJaZ1oKG8Fx3znP2E82TF873hpIJnxMZgDmwnDMzu3Y7kfK86QDcXmMfaeOmqs075A9oKGjlnxL3%2FewGef%2FUoLPRP7GrhhQe4wyJsqezXO%2FJEWp7RwFmwQDqB8zoAXUmAJSqh&X-Amz-Signature=116eec865c7d28d243059c42ef052230c11d6e5d42e118fb4fd681eb370b4a6e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UWCNWTPJ%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T202128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQCa44CViKsvQADwSeRteWLKNJKeIlikQfQ9tg2Wzh1g%2FQIhAJc%2ByuWCAi2fpYmSEFG%2Fdlpi8cwPcf2Uy1Ipy2oIuJ3KKv8DCAQQABoMNjM3NDIzMTgzODA1IgwWIfdpb0Uu20xosZYq3AM8HnpXi1f6O1ikY47ZifAZW8uPtWQaonNPZSNjGEfPaWGrqwW9ySFkVL%2BPS6VoasytoA73o1kcl10mjL%2Fxt0rAodyzwyT8rV1ITdbuFbjh%2FA8jEXKFfNF4nu1bg9UJ711ANRvQC1OLyctkXVoJtxSOBAeUv4iBbcQTAdCsXEEE1Q0D85Iug32ktfEUaqQKMRNvJRt2k3UWpBJlzzV7V5HVaq03A%2BBOz6q5aAuKQ9lpWb%2B2%2BVi2VW6596BCvvYll2QXLp6nWeGDHVq88QDho0oq1R8pm7Db%2FlkG3fhEfGeBuGNWWfspUz%2F%2BY0o1NKQG3d%2Bs6s6G5ze5VQVF35uRCR%2FoTa0VQtrqciwconZAu15rlmJbgRUsIZXHR7llDa72aIabM3dZD3y7zJ88%2BydL1Bp1Wuf7XaBWIFYgL0jv4b7DHGwK14taKkavAIfLM6ZBbvXdE1O5yHomO2Q8MhGD%2FhggV5uSVojE3j7pp8Tdi3LqJ60CZQuYp5wRPY1XBtV64aqxchEY3qizffRmKl45zFQGirucO0ZU3LVOKAqxLZXvRltazUeipTyObxIjTLmXPnQDAeu3RkDZygHkNqJ6RzrZ5mjr1xiMUg1U2eJiLk3TnwuDLc2RehnlurusHjCNhYnMBjqkAaWl4W9EthCXfGSuYerRvFH0sCGAunBxUxFZCLdjvqLFx1fNEUXU2AW2o%2FCAGXscIItCCy2DOmNh7gTnKrNjkIOHJaZ1oKG8Fx3znP2E82TF873hpIJnxMZgDmwnDMzu3Y7kfK86QDcXmMfaeOmqs075A9oKGjlnxL3%2FewGef%2FUoLPRP7GrhhQe4wyJsqezXO%2FJEWp7RwFmwQDqB8zoAXUmAJSqh&X-Amz-Signature=116eec865c7d28d243059c42ef052230c11d6e5d42e118fb4fd681eb370b4a6e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WDK464IG%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T202130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIQDTaTnX8%2FmB%2F6fddTFCqHtuRh2Vdi7Q2qf1tNp5C%2FF%2FxAIgB7x98IXzm9fOYFS5ftN5%2FsCfMaHsaTBMnqU7MUrgaT8q%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDEU624AOtf33ohaZ6CrcAyV8lsu%2F%2FnJeXiTWSRZSSBwmu%2BVundxNyKRINR995MTaqeycaBTdYRqeY3239Zdvf6xP%2FP0xilPsgIObep4IaDPflgYoiOW6b9WpfEalHMF2O8%2Bp0DVawqN%2BYKHplu5RRCvvRgvEuUhMa6EZ4pYMgeaYx8PX1c3%2BaNGaL%2Bbk%2FwscUavGFyk84sGhozGAI5zIDxNnBIvcy1kmRHvlIDMbBdMMKHRA5zS6gBgVA2V6pQORemGCKPo31LPZLITFX4re82Tj90rjJ2Hmo0w9t0WjjfdIkWz6HNdtAPJZrxTaGksiGwAB10Fn8AOWbO7KstvqUUo1360bl24hRdr1YfwiAu5lFsbQo6rC9IORUxyOOUE%2FS4WJJH6GoYP6ithhEauX0xUUSGUbjEuQL9fiTPbGUylNxiggBXzcK3E%2F6dCM4ZI9HaDEhz7RB1noX8Q5zm3269JgaBWFQavMsV0Ib0us%2F0PzLIBb2HICoXqOsuhSp6aLHxjBodpdHkPpD2ZTnmZNdvA18Yx11HCFPm739KEs2u7rV0wxLvsrgqHDvllCtBJT0qa9YTfTWvHpocVZoZhB7guWNTTIchuhu19rH97O%2B1x9M%2FmzIR9pZYTHYyPN6xq9YjdKJp5nIiGCH9RlMLeEicwGOqUBzJ6Lo4RL9pNUxFlVQ7NRof935lCoLfog557xx%2BnuyQhL9j46kGqPacjGIy1RGINxffTnhwIoAKMYa%2FK%2BmcLV2pbOYRH9VCMpzuRhWxyXrofYBZC0vli4TMBlu1g%2FxQgAKCC8%2B28%2Fyyl2YA9bfSHZfY21LYQc6UsT9HUDmrbgvP%2FWOXOI16AGLF8fnq21wVCSr36ReNBF2dwl6oEKjePsL%2BB%2BzTpj&X-Amz-Signature=beaaa160a14073b810d3f32f4247760252b34cf4e73c432bb61d26a51a7ff04b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

