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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZYJE4C3%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T152927Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJIMEYCIQDT6GCwTvp2zfekPLcfOclgNdDWWg12641uYUZtrsO7QQIhAP9xHb8MjRQngKzYA9DTwvXadgU3ltPlwNnJnSxc9GjJKv8DCDgQABoMNjM3NDIzMTgzODA1IgxDZXJw7IwG7FL0zBsq3APKe%2FjolL0kLSp2DG5et4Dzv8bNr%2BWwVtFJap1yhPYMjSSvRkwTwKOw3qIBeTMp6iK65FqNgdH2w870FLNK0JNmZMDPURvqQnrPGe3hZ6woK9k3dg1OCi0iK6i%2F%2FvItGB4gg2KSZW5pXZ0bXxeEYDyTCydCQyskSUuiJpWkayPfX%2BTGmfP6l3T6brxFNiuTU3ktposAL%2BTE5sM9YY6JGNAZMEnYaBcRsuZug8oEkyVl2O6BKCvLHcvRDWu5gXhsScm0oB2MMMI9cfM%2B6s4daRMu%2BpOQyybFTxDny3Lcl6JakEEtok14fhlFAZpse3hGKKhepqmqc1fdLaic5kXkb2HjlRDuhHZjrQssCxcKFZkm3of%2BxGxF2wQ5rwYFS9PXSlbYjTnU5FXqEpX6PA9F2UHzSwlsKpAGo0GsUa9iN9cCg7hNQRfZRYcj%2BKlfSxupe2k02%2FBjhkr%2ByrrBOgJjqvLep5kUdLnImXSMVQKJopeRa7QHMDReTdBNewoBU6qevSxMfeiziCqrMqjA%2FOGjkRo17GDYxD%2B1rjiR9W%2FqX8BFBiARgA5vNAoPGKLMYC0I6W%2Fyp8PoQnqhO5shtP3yLjo%2B%2F9Kbt50FV%2FhWDnZR9RPLNxZsB6vsG59w81L1sDCD5MzMBjqkAbUbD%2BpEcyyHiD5G48%2Fo93MJ4QOIoHcDR3SczFD%2BQ5gAgdkam0Rvclzgn%2BtX6THYOI8AhSH4SYiUxiSwv091DptDeUK6EQp1xTrj4yC%2BPs%2FXRh5K4nISkZAM3N8MIHWWmIAgpyldP34zOmCZo2oFJx61yy7W%2Fsnkf1H98RjUNwXaBUFp8kp0mkHSv8%2B2F00zqZLr%2BHIKbwjkfHbbn6E69LafgPQV&X-Amz-Signature=4e68dcf60204b09eb8b57f30544bbd2d0ead1c8b65ada36545a078524104dca6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZYJE4C3%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T152927Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJIMEYCIQDT6GCwTvp2zfekPLcfOclgNdDWWg12641uYUZtrsO7QQIhAP9xHb8MjRQngKzYA9DTwvXadgU3ltPlwNnJnSxc9GjJKv8DCDgQABoMNjM3NDIzMTgzODA1IgxDZXJw7IwG7FL0zBsq3APKe%2FjolL0kLSp2DG5et4Dzv8bNr%2BWwVtFJap1yhPYMjSSvRkwTwKOw3qIBeTMp6iK65FqNgdH2w870FLNK0JNmZMDPURvqQnrPGe3hZ6woK9k3dg1OCi0iK6i%2F%2FvItGB4gg2KSZW5pXZ0bXxeEYDyTCydCQyskSUuiJpWkayPfX%2BTGmfP6l3T6brxFNiuTU3ktposAL%2BTE5sM9YY6JGNAZMEnYaBcRsuZug8oEkyVl2O6BKCvLHcvRDWu5gXhsScm0oB2MMMI9cfM%2B6s4daRMu%2BpOQyybFTxDny3Lcl6JakEEtok14fhlFAZpse3hGKKhepqmqc1fdLaic5kXkb2HjlRDuhHZjrQssCxcKFZkm3of%2BxGxF2wQ5rwYFS9PXSlbYjTnU5FXqEpX6PA9F2UHzSwlsKpAGo0GsUa9iN9cCg7hNQRfZRYcj%2BKlfSxupe2k02%2FBjhkr%2ByrrBOgJjqvLep5kUdLnImXSMVQKJopeRa7QHMDReTdBNewoBU6qevSxMfeiziCqrMqjA%2FOGjkRo17GDYxD%2B1rjiR9W%2FqX8BFBiARgA5vNAoPGKLMYC0I6W%2Fyp8PoQnqhO5shtP3yLjo%2B%2F9Kbt50FV%2FhWDnZR9RPLNxZsB6vsG59w81L1sDCD5MzMBjqkAbUbD%2BpEcyyHiD5G48%2Fo93MJ4QOIoHcDR3SczFD%2BQ5gAgdkam0Rvclzgn%2BtX6THYOI8AhSH4SYiUxiSwv091DptDeUK6EQp1xTrj4yC%2BPs%2FXRh5K4nISkZAM3N8MIHWWmIAgpyldP34zOmCZo2oFJx61yy7W%2Fsnkf1H98RjUNwXaBUFp8kp0mkHSv8%2B2F00zqZLr%2BHIKbwjkfHbbn6E69LafgPQV&X-Amz-Signature=4e68dcf60204b09eb8b57f30544bbd2d0ead1c8b65ada36545a078524104dca6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662X3DRQ3N%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T152928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJHMEUCIB0fOUDOD4bXvm89TppQSPTneef0i2gLYrJyeFQg4dW%2BAiEAws4iqA%2FZamsdEvCN%2FqFMi5mdBYChfzuyVE0CcKv11%2Bkq%2FwMIOBAAGgw2Mzc0MjMxODM4MDUiDLlyX%2FQeiPuneWaMSircA6wLxj%2FDRytQctBdGdp5m9O8ehJbUNmxXVmLb7NwyCYtz9nQxVPa9CMj12Ewjy6Gl%2FxU97hth%2Ftu4RA9O8hKgNzy7vCdSv%2Fy7HRwZrTkGdPc6RNLGll9CWC%2F%2BwOiq8otKexdvcKbDcV%2Fc8uiMdbi6rUQ5w91KPVzdU1Cm7tpPAXz8l6Ot7ThiMAsCejMP8tvV2IeYdfvZW%2FCB9dUAfFJDcaCHavt7j7ICOUgjy7E3CzLsRtpBlkLjN%2F2OMNKengoTs4d1TI4H9IB4PgucL9ipvDLajIVXJM1U%2FofHQ39uuRnBJtv2j95OIE8u6ms5FXtVvKHsr%2Bd2FQAbAT%2Btsbcv0QnXQDeUKQjf2CPi0vzJ97pDrp7Y0Z3O9CKC5Dy6IIVK%2FWf29Gt4YDOCOi8JAb1Rel92kfWq0B%2BVGZy5f%2F4cnGB5NGbv8n%2B5mnVueRJYyBPpyPlUZLBVaA9pdlaz19t0SZvTxvcHPsWkU6sNgq%2F4GbfTV4KBkVfwNIC0jUVaJAqAEZDfeL3heanKrBfwgLK%2FiEuDLSsQ0x2un6jegJS%2BWfrDHkZ78DtaDW1YT4Jx6cCr2nixTUwo6ANjLRMF08ky5eAQ5FpKBqBrOye6xrlGWgssFQ2DhOzMLIUB5neMJzlzMwGOqUBz9m1aNnvrxrOwYQ8CjOn9AfsPEx%2FNtJ69Ic1j2MYZRAWkcmSjzZRXgREuZN47GaMA%2BSbQM0GmuVkmymUBduK03aEVCL4CNhSqxUBoFtVDLdmIlTIgS1c1suQixE7AWK3FJ0objUzgf1C93Ftx3Kbkwy3k2jDOm9jPpPo93rup17l9xN8pOQ1aY5vT7lxEgLgLdEXxhIokErI7ptYPv1QeNd0LBHo&X-Amz-Signature=591424f3e1ce455b79210ddc2827501d9014ac5058b2dcb26487d747d513b4f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SATMOTHD%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T152929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJHMEUCIQCp92yvEWYIUYF01yjg1WdOv7AzI3NLNxR%2FLH%2Bs6QR5HQIgdkJMo%2Br9kG2HEsg%2BZrv8vMat0ecgRBdynumv3FriDBcq%2FwMIOBAAGgw2Mzc0MjMxODM4MDUiDHlsqzTIjaSZqLFjvSrcA4H5%2FCg362MqvK7LSgEHPrJcIbsrBYAKcZ0vsD3rmKg%2Fw3VsafGNCpbV6GkLxYKy4M4WSlwCHTbXaYNyM%2F%2FueZQP8B9AbZ1R9KOcbhrp2eSUYWqWgRH8dB8wQvuU7iqzRaR5tKxP6DsaFUEiuom%2BJaVXzOh9YDxIrXbb0SY8OjP6N%2FUvON4aufDJkv1wF2dIUbBZ%2FKlGBdMWjFzvzUs%2BkPfpiI0zB9E8mXXE1m2daStkaHxynvTfMzxVoNdYQW7wn89H5w2snKoNizdMq9kiez5eR%2FfBPkhQDWVE47hq0xGxX68Of65qo%2BHGrEU7f4JHpYRUZderc4WfKPeON2nbZUa5szaCd8WIA7%2F7nrPzvfIhOF8RZUy8JGeZEqhN%2FqiQVHP0WfHUX5r5xrRU2BTNN54IywV3O0DQXO2XxdS4Cxo8EyoGSC5OsdG2FAnCCpxk6%2F2KR6tDjCavCIXQaMD3H9qfgzbapY0ep3de%2F%2BzvHXKsuQ4XJq8P6Jy5qe129k2poZqkWeIa3F%2Bv9nBTyfFo2qUOtXECUXi1f1TDD%2Fy%2BUVo7YL80BjCr8Qn0NMhGcJlD%2BwieqMQZhjnaaXNljv%2FxohZIEuHvG3QxPa9m8HOucdoQJhRbaaS3pBdtERGMMN7kzMwGOqUBsCLxrIP9q%2Bznp95mA18qlCcFfWXpIKY6NolPaWmGBc1pZjS4Hfj%2BN1UWuYI6N6c0EY5BYPsv6hP%2FsbxIWuOyxS25Odjm1UyJpLzIFHpRx32aFQtpiBtKHGAr8Y5%2Bk2lkbBBbRma8nIiC8aSI64nt%2BSoBBXRtxcmUcgMak2kdU8ytLcvPKfD4ZxC2%2BbpuuV3BMGJHRXwG%2Fys9TuY6SCklDdGOd%2BXz&X-Amz-Signature=7c66270b0508500b2d482adbfcb7aa2c27c8752ed2424f2cc19ab4bcb8ba0581&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SATMOTHD%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T152929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJHMEUCIQCp92yvEWYIUYF01yjg1WdOv7AzI3NLNxR%2FLH%2Bs6QR5HQIgdkJMo%2Br9kG2HEsg%2BZrv8vMat0ecgRBdynumv3FriDBcq%2FwMIOBAAGgw2Mzc0MjMxODM4MDUiDHlsqzTIjaSZqLFjvSrcA4H5%2FCg362MqvK7LSgEHPrJcIbsrBYAKcZ0vsD3rmKg%2Fw3VsafGNCpbV6GkLxYKy4M4WSlwCHTbXaYNyM%2F%2FueZQP8B9AbZ1R9KOcbhrp2eSUYWqWgRH8dB8wQvuU7iqzRaR5tKxP6DsaFUEiuom%2BJaVXzOh9YDxIrXbb0SY8OjP6N%2FUvON4aufDJkv1wF2dIUbBZ%2FKlGBdMWjFzvzUs%2BkPfpiI0zB9E8mXXE1m2daStkaHxynvTfMzxVoNdYQW7wn89H5w2snKoNizdMq9kiez5eR%2FfBPkhQDWVE47hq0xGxX68Of65qo%2BHGrEU7f4JHpYRUZderc4WfKPeON2nbZUa5szaCd8WIA7%2F7nrPzvfIhOF8RZUy8JGeZEqhN%2FqiQVHP0WfHUX5r5xrRU2BTNN54IywV3O0DQXO2XxdS4Cxo8EyoGSC5OsdG2FAnCCpxk6%2F2KR6tDjCavCIXQaMD3H9qfgzbapY0ep3de%2F%2BzvHXKsuQ4XJq8P6Jy5qe129k2poZqkWeIa3F%2Bv9nBTyfFo2qUOtXECUXi1f1TDD%2Fy%2BUVo7YL80BjCr8Qn0NMhGcJlD%2BwieqMQZhjnaaXNljv%2FxohZIEuHvG3QxPa9m8HOucdoQJhRbaaS3pBdtERGMMN7kzMwGOqUBsCLxrIP9q%2Bznp95mA18qlCcFfWXpIKY6NolPaWmGBc1pZjS4Hfj%2BN1UWuYI6N6c0EY5BYPsv6hP%2FsbxIWuOyxS25Odjm1UyJpLzIFHpRx32aFQtpiBtKHGAr8Y5%2Bk2lkbBBbRma8nIiC8aSI64nt%2BSoBBXRtxcmUcgMak2kdU8ytLcvPKfD4ZxC2%2BbpuuV3BMGJHRXwG%2Fys9TuY6SCklDdGOd%2BXz&X-Amz-Signature=851cb6c7f95c5de06f75c15071c116f4b12b7781c63cbac028e6436336e1527b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XTZYIX6Y%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T152929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJHMEUCIDX0DYIydCjSfOqBwPoIcIPt%2BLRl9IHUN%2FBjZ45ADl5bAiEA4orDDOtz%2BBWbIYbYHCAlwMz5mvCHd1416gGpdC7sVBkq%2FwMIOBAAGgw2Mzc0MjMxODM4MDUiDBpgbzmva9GYttDzeircA9wimozIy1T0qoFmJ55%2BWNRR6%2FTMH7UyEb%2FcHPgeBl4KdzjoegNx50o4t5vgTCcomyfeMzWkexH4icBaFr9UruMpWB%2F%2Bb44AcKx14NaqNx%2FBvUlFpz4pXJollOR2jskAZiGPmE%2B1HVry6h0ofXEA9sUzpkKX3R9aTldF461QyGoVCUkb%2BN4%2FQ9mWAlkEerPlpIxmpRWBacLermpZfEm7G9B3GkJka8V5qqc1FTYSWAYTwqa%2FeN6MOp4DRtwm1Gbp0H7ZbzRw6u%2BImfEfLEh9JtfpdcQ8TcowLPzcyOD9hH1WQE9LmcKzmgkpCxrivAyv7zPp6InuwfuTXcX%2Bie3UdK6A77C0TSVYkUMrDxXDv9HnWBCtTJK9xkCGZiF5YM%2BhcbHNTYZmKTtGDmhN7NmKiDQxNpYgdvQCJ%2FDpOvSENZ20JgbHDvPmctlMjeHo4ykqpqnqtkiCTIulh21BhC7g3k7FKSpv0tFWEQrfyo1Y4bKU7A7E%2Bgy%2FP%2B7arI8JZj1i40oKOpxuQmQiLgnyQO3kxPuNJxeHiKt%2BVECHLl6zgmyNhbdG5vQNd9wksQY1ASAcly6unifxZvKwcPcJWZeJtIrwgZBp37R3Vc8Qv2RYERseQz5mFwQZ9ZekeowGMJbkzMwGOqUBAtQfyP3L%2BsiqK2NPhgWKVkO%2FOAQ6oazXdtq7B2%2FKRDuakrXsyGXKuSZRCjdqbrSgBn00DfxkpD%2BXNpknbgengaVnjVrtryZqMy3UhD6XOVDga7%2FMMotGJQ06hdRQsN0KEIk%2F%2Bdtn5pZExPVUoDLA3Xz7KhHnJKGdxa14bfxTe4q9iaWM96b8pQKdvYWotT4ruTWdUMtDPVkyRws2raVU4V51IRL7&X-Amz-Signature=05a6c4919a05ff1b39e4f58205b832a0e686e7354bf40c76a2a91af3998aea41&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZGRBZNFR%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T152930Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJIMEYCIQDaC4ArcLhxufIAbR7hkfnsOxnZCECFPb4uWN9552zybwIhANBwZw3cxkDcUILDReqGDF8wJB%2F3JXy5nlePmn82oj2zKv8DCDgQABoMNjM3NDIzMTgzODA1Igx8T5RU6lCKhighSrMq3AMwJ66YVA%2B8t31mo%2B57%2FiKqiPicb6Rhx5R5RRsyvO%2Bj5BpLsQg%2Bx%2F7tFd0DmjNzSXHBoGFXIItUBlutF7G0vLtQjMc%2FV3r2wVxaiz6Mlp7QH1E%2B0ZDwURpdsyLlMjOJmqWrn8ezHpi7j5B15evxO0YGRc7japtq8ByDPoOKB0wMRhXr1sLm34q%2BwdlTGHLYNOCuwbxb3VCMrMvEX5CVWF5otYIpUXokyBHGzmj3lnoY6D1%2Fl%2FLETyDbrKpmRXwf6XFTeNoQt9L0uOYQ5CTh5aY6kV8QkEn5MN21m7IIF%2FqZSdJaBSDr3xwIxH14hKi6QiTjdas0OofFUyfY6wpiomvh%2BD1tdGihf8JNafHGXMn7McQOcJy8r3tEmxuxHjNKPIzfEUEd8dXj0q21SM9nf9dDsGH%2BPVfbnrsKs%2BGGo8xPjudVWnjXTYZmz1qKDHbBDDua3sZG%2Fp2MXCsm4j8RkZLgUFUe4jfM5kk1XwnnrXD%2F7%2BLIsvtWCQxyKQJEirafbQLfrUYYOLoHSqN2DFQ2iUsL24o4%2Fb%2F2xvcJR6kIOZohY4ZhOxbmFZUbNhMYKzp%2FXSabtu60TyOY1asp6dXpozQWmmCn%2BkqtkadiudKWIgBUieEyvbHo9e0hJh8v6TCz5MzMBjqkAfc4ncVaJRYuw4k9g1QSc0X22SZXVsGnvChDDdIXLtpIifJiXYlqxJpIKrcgt%2B8qa2KWeazg%2BRsKljMD21PDumeCFG%2B0FEAP9QBhkchWFi2Bc%2F6nXLMqdUNEC%2BkNYhduAR2f5L0lAOPRjx7wHdq5Cho5KA1Yrl09aRL2wA2ske%2BYovkOkRBkBiw1miJCzrFejtF6lKxRDJNdgEiGoWwMxrdCD5C2&X-Amz-Signature=f3050e49dd253c63f7447122005b86074b8021bb3f1dfc4220249aac0748b240&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X7HPAQ3F%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T152931Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJHMEUCIQCePV0xLoYLortFIWuV6Qoi%2BibgXmC6STeu07c6483vOwIgQfMY%2FWpV7I4WRW%2BCZyTYnC5ijKJ2cNOBS%2Bbl0sfWb7Yq%2FwMIOBAAGgw2Mzc0MjMxODM4MDUiDA71filwn%2BD3OdF%2BcyrcA7M%2B%2FuHjhqalrnN5YvWe4VFGD1jkfaWWIPXV9t1LZ5WaOQijnsXWxmRJzF0u0bSlamxDH6QvGhccraANBtiC1i2cm5XbBUOiWo5U0FOzuOH4WqDYccyT7JCCYZ9N7f9L6P1CnwuavlzbXKmk7lonuTDs5ZGOAtqJtq14d28%2FYx%2BcJHD7pksIPPuQ4HSo04ee6Mz%2B7dCO9uW6wLKY1r7OOle%2FuAICRK2Bjq3xImhefqJD9pKk9GsALfiLHKdarZwd7qg2SMt6WF8xE6oJG8st7At5efAxUHKsSYsrJ17nlwhE5VQ71wzIhd4xJnE%2FfUuyMiHoY6WIH3CUXSsziZ7uw3ihd3hJn2v6YAdo8Xaj2eX2rhyY8oXj1LVshq2zZKzW%2F6dbO%2FdQzZDooWlUeX4dI1leii8xh80W%2FfYcquFZWzUUqLeDdzfCfet9w31p8mMidOa6C5oMtEQQv4S%2F%2BJC%2FwO64Fhh8ZJMmH5YOi8fQvM4rB19raJ6mHiBoKApZSiEWrm48uSnxZ1ji4t6uvuB4EzAo8RMvwJ6PwVxcFjwCvzNVvvKSgkxIenblE3qYpwb8C9dSPz2R5yrLlWn0RY%2Fhd7QCX3%2FFqRkdD%2BbEGufRdbxWfyspu4K5i79mCFlMMIDkzMwGOqUBs6znBQuUwyQi6CNEDgZYkIBRRRuZyVE%2FT5EjhBuz8Q3AqmNUjvk2xiPt6AapZE1wwV4nP1IwdpIoVLoSz5IN2MU5HSJ8oMEchMswDu8fD1%2F2OV5Rt%2F3XtbbUy5vz7vP%2Bhe8jYd6pzPQtAQ%2FyafNICBchvj5QeYs7d%2FyrKJjbWQRX5A4GLZT8sXZE2jbehcBCAWL2%2FCmKbYFDNzJBIGFNRVMo80%2Br&X-Amz-Signature=fcbd12d236355306bbf330218f31e9c2c12738135156dc0f00e39061671596a4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQWRU2QU%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T152932Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJGMEQCIHQCP6Oz44AMidPSM3n88Rq8Kcnq295al3FOlO1mWnsqAiBxpDdBcdERgWP%2FUVPJwEf%2FXgClzi6VaFCr3TYpMP4ysCr%2FAwg4EAAaDDYzNzQyMzE4MzgwNSIM%2FNI6L0DcXstyEoBiKtwDduOf9%2BLX3M3XE2t8ITpy6MMmB1ppOKkhOdnhG6lIFUd9LR3CBHuEIPCoUCrtavrt1Xx3bvNhV8sugpAfHfdRMRrPFqNc%2FZqZ1lNSvG8CEII2CEK7hhSQoliYx%2FfdmSsBoLOYTjqvDC90KjnPwEcPRycAiEAcHW9VYNH8yhXMPj%2BETMOQL3wGceAiNfTWaErSMXusuNWf6Bj4OiNGuTGqdBYhP%2BxJ796l0d672oZ5v96TnVdZtnkq3qG17w6WdxRq62fKSlT5mWeMLaEfkErBio9g3lav6by0plqXKv2RQektn5tGdQEEYYyExSyqK42eiQ3MzQbd1V2dGQDYbVPKY7SSvTwaRBjaPnJ1y2FVnHLMtilqngezWnJq76wbTerH%2BlUhXF7054Y2WHgDQ63P7pb3cOrcQO6spegwrVIifiP4%2FC9JbWKY7RDcC%2B1lm52E34M1WfN1jtwBF0z8DVXfskOpVDTStOoXoC9aX6JuphiOk4%2BPCIh44u%2F9rECg2v3l4GHk5FgsMdEAy0l2ZCVwJXI%2FUhi0h7wB6tx9cGxz7rQupilHThUXF2pt%2FeMby%2FGWZgU7nPOq%2B7ZssoxM%2BW26pV6RY3G%2BCKyG4m03J8E%2BHrUwic37WCPep6JMmR8wwOTMzAY6pgFxAN1mlWoWsnkSU8O%2FHubA4MmcvY487LSpXxk5rnhUG84%2FbSvLobtEHqZt6p%2BVo3j2enRprYvWRj6PFiXzEs6b7IlK6qwsZfuAtH23bOwt2oE11jMj9WwvPIkUzMH7lCueLUfKvFJ9eilGPmjvQzqYULfD%2Bg9Z8gncbxyOLVUmdbUMXtZWvWtqMKrNdBh4qjqZvkmSRASAEbFWZlWnR38exAIoQJcC&X-Amz-Signature=adb33014070e761f2b27b35a72462b6cf9b73a1ac2b237e633703c8da89ae5a4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQWRU2QU%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T152932Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJGMEQCIHQCP6Oz44AMidPSM3n88Rq8Kcnq295al3FOlO1mWnsqAiBxpDdBcdERgWP%2FUVPJwEf%2FXgClzi6VaFCr3TYpMP4ysCr%2FAwg4EAAaDDYzNzQyMzE4MzgwNSIM%2FNI6L0DcXstyEoBiKtwDduOf9%2BLX3M3XE2t8ITpy6MMmB1ppOKkhOdnhG6lIFUd9LR3CBHuEIPCoUCrtavrt1Xx3bvNhV8sugpAfHfdRMRrPFqNc%2FZqZ1lNSvG8CEII2CEK7hhSQoliYx%2FfdmSsBoLOYTjqvDC90KjnPwEcPRycAiEAcHW9VYNH8yhXMPj%2BETMOQL3wGceAiNfTWaErSMXusuNWf6Bj4OiNGuTGqdBYhP%2BxJ796l0d672oZ5v96TnVdZtnkq3qG17w6WdxRq62fKSlT5mWeMLaEfkErBio9g3lav6by0plqXKv2RQektn5tGdQEEYYyExSyqK42eiQ3MzQbd1V2dGQDYbVPKY7SSvTwaRBjaPnJ1y2FVnHLMtilqngezWnJq76wbTerH%2BlUhXF7054Y2WHgDQ63P7pb3cOrcQO6spegwrVIifiP4%2FC9JbWKY7RDcC%2B1lm52E34M1WfN1jtwBF0z8DVXfskOpVDTStOoXoC9aX6JuphiOk4%2BPCIh44u%2F9rECg2v3l4GHk5FgsMdEAy0l2ZCVwJXI%2FUhi0h7wB6tx9cGxz7rQupilHThUXF2pt%2FeMby%2FGWZgU7nPOq%2B7ZssoxM%2BW26pV6RY3G%2BCKyG4m03J8E%2BHrUwic37WCPep6JMmR8wwOTMzAY6pgFxAN1mlWoWsnkSU8O%2FHubA4MmcvY487LSpXxk5rnhUG84%2FbSvLobtEHqZt6p%2BVo3j2enRprYvWRj6PFiXzEs6b7IlK6qwsZfuAtH23bOwt2oE11jMj9WwvPIkUzMH7lCueLUfKvFJ9eilGPmjvQzqYULfD%2Bg9Z8gncbxyOLVUmdbUMXtZWvWtqMKrNdBh4qjqZvkmSRASAEbFWZlWnR38exAIoQJcC&X-Amz-Signature=77a5eeac41412d061c7ce343aff90993c0f27bd7b6de29da561dcc0dfd6763fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666QGTGPUV%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T152924Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJGMEQCIHqRgbNwV5Svy4uGWask60oYCUcDVZIeQqrUNXaqZCgiAiAS3LdgnIMFj4ET8Xjx7HhD5nFcksx%2FoFCgAYFWm8Yalir%2FAwg4EAAaDDYzNzQyMzE4MzgwNSIMDJcN%2BZ8Y9ye1Zl56KtwDxP%2F%2FGEiyCxct60pZp6N9S%2BeP%2BQORnp5hMxLs6jfKI%2BZC%2BEb%2FPAzW%2BsezTqO7uGrodgPksphkCghB5dfprnAK5Dez1rC7Dsx%2Bxi5eNfy6MSGJEPZDmJwMl7tyzTi0Xbvkd9B9CqCgG2OZ%2BjQX5yv9e9Ab%2B1m7slYMBZIYZVzUASkFrBV8yts7UooCiPFI3LXw7IIm%2B4aY6p95uEAn%2FzQCT1b5e%2FY7igX6o%2BRte603n%2Fwdu8Gd230SrbfxG2jrMqaY78Pq3ubvgkB8bxNvEqu9JLSR%2Bdv%2FWhsgKYUkGCnCcv6RtlfY%2BktD5XSdOmFyu30aVOYYSiBVb5JQQY9UZ4tScI2QS0HVicY%2FNkx%2BK50AjVcnYqKcGv%2FYPPrk1UdMl6IVoHv1LEvgMGwCS%2BjwkryTrfrn8EUYVxKbtTl8BZ4AEuONzlpb8PytlFyfTY6XuCypd1mi6BaT%2BurMBlganiScZe1lOEC7JC0f7rXjO7j75oIEJiti%2Bpv0ToXhaWZ3yiph2NU89Leafd%2FgZuk8jXg%2FtIGm6%2Bh3Y70xZOhhC7xz2Wqj2oDjLDSNX7hQUBCDCXZcIHU%2F9XiG4i8CCkf2TOqqgLAX9p24WgYprtjN%2Ftr3XHgV%2FDPH0JpHRZeyVO8w3%2BTMzAY6pgF15TqbXBzgTwArdar%2FeVgSV0nvKawAaNjHuiYTdcHSjAx2DprpO2GMNai%2Bn8XmgBcfNWNqN%2BpoIXumscIRelpkOgLmzwD6%2FUdh6F7Vln990pNfML3rjv5wMSdCPNRu7owy4C12F64s0fNLwCVFXQgYeFtWFIg1tyz3%2FVuLAnHU3p5yYvdCwuLiiJ%2Fu2i546lQZxWoxXVhCJ5NF1tf9oEk2Le8ePZAi&X-Amz-Signature=6b814b7f29ac9e877fab2d676c1cc7d4a8cc95aabd792baab8dc2b5720b8568d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZDWYMM7K%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T152934Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJHMEUCIQCzgUt6kLUhsp4RBP1jbs3GEjsl2W4V42xz2BhqtbnnQwIgbPT15zOviswtkIGYMWplmdmMTEGpE0UPFb6O3ajRVNgq%2FwMIOBAAGgw2Mzc0MjMxODM4MDUiDGhzjsz4%2BXK2%2Bs6R%2BCrcAy%2FqntrVWnJN17o038wqVYqb1EcbnlN21E4wz9BNmsQ4TnXNXMggzOGQuurFIT9Up4R46iDM%2BfMaolX4tNmnWuFJbVp%2Ft27jz9PpSGR5NTn7fAqos%2Ftkuxm0OZuzINh%2FcR9rFxP4PVtGIv3uM8atdBc1UrfY2Q11es2Px6g93805oXs0qjGv14Urqo9u20Uv0rqYtYT2hDl9UqQojA2tC7yWEZbLzaHNYMlVujuiZbZ56K%2BPKH6g7ud3qPIF16A5IGxEETPnxs%2BJY%2F%2BmYQ1jWfveZROzS4q1wrdyjzpOej%2BA%2BrUBQL3i4i%2FTD0Q20VO8RdmJlhMMcoTmF9MDu9kD%2BcIvBpXfwyDzgEv9JJK%2F4eB3VE%2BokY%2FLAeoDKXs2iG7Myp7%2FgjMXmHSKQPkclIOhPma8Akl3n5Y%2FWPFU0IJXd9WvfiQive71J04eACYex9ja7mt%2FWsLimGGw%2FJJL21qhnghLTTyddLfMAEMDkxR4c1IUpcpVOlNmL5yqIX%2FvKV5VlFYuApx3xQguBOwgzYC0BbJJ2XH2y4ywqDlIxE8hE6mczHJbaYZevLF69dtFddR%2FtpTQrzAgVzTgl%2FRL1IP0m%2Brp3osNYwq0w%2BTIGILhbsOHRg8j9vL6hrvxrgiRMOHjzMwGOqUBiMK4iHoEad3E1HJepu4U4qJca4ep6NbIAz0vHx63l%2FNlpdabo53yBiicBRXOl05cvl1WO5uoWkMeAVtbKxlncfyYZMXOytkOgiPO7VHYf5Swg87chc94jI9glg7mlBrjTYTTjMReE0%2B5BNmwVFeFspKaa2yE0%2FFMWSLBNn6%2F1EWUXCEJMOXs%2FA%2Bwp5COPPgNFjJInPgdY1rCAhDupIZT1ikiRGyj&X-Amz-Signature=0da9721d9af37c75137334cecf5aba9ad9170d95cc3415271dad1929b478279f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZDWYMM7K%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T152934Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJHMEUCIQCzgUt6kLUhsp4RBP1jbs3GEjsl2W4V42xz2BhqtbnnQwIgbPT15zOviswtkIGYMWplmdmMTEGpE0UPFb6O3ajRVNgq%2FwMIOBAAGgw2Mzc0MjMxODM4MDUiDGhzjsz4%2BXK2%2Bs6R%2BCrcAy%2FqntrVWnJN17o038wqVYqb1EcbnlN21E4wz9BNmsQ4TnXNXMggzOGQuurFIT9Up4R46iDM%2BfMaolX4tNmnWuFJbVp%2Ft27jz9PpSGR5NTn7fAqos%2Ftkuxm0OZuzINh%2FcR9rFxP4PVtGIv3uM8atdBc1UrfY2Q11es2Px6g93805oXs0qjGv14Urqo9u20Uv0rqYtYT2hDl9UqQojA2tC7yWEZbLzaHNYMlVujuiZbZ56K%2BPKH6g7ud3qPIF16A5IGxEETPnxs%2BJY%2F%2BmYQ1jWfveZROzS4q1wrdyjzpOej%2BA%2BrUBQL3i4i%2FTD0Q20VO8RdmJlhMMcoTmF9MDu9kD%2BcIvBpXfwyDzgEv9JJK%2F4eB3VE%2BokY%2FLAeoDKXs2iG7Myp7%2FgjMXmHSKQPkclIOhPma8Akl3n5Y%2FWPFU0IJXd9WvfiQive71J04eACYex9ja7mt%2FWsLimGGw%2FJJL21qhnghLTTyddLfMAEMDkxR4c1IUpcpVOlNmL5yqIX%2FvKV5VlFYuApx3xQguBOwgzYC0BbJJ2XH2y4ywqDlIxE8hE6mczHJbaYZevLF69dtFddR%2FtpTQrzAgVzTgl%2FRL1IP0m%2Brp3osNYwq0w%2BTIGILhbsOHRg8j9vL6hrvxrgiRMOHjzMwGOqUBiMK4iHoEad3E1HJepu4U4qJca4ep6NbIAz0vHx63l%2FNlpdabo53yBiicBRXOl05cvl1WO5uoWkMeAVtbKxlncfyYZMXOytkOgiPO7VHYf5Swg87chc94jI9glg7mlBrjTYTTjMReE0%2B5BNmwVFeFspKaa2yE0%2FFMWSLBNn6%2F1EWUXCEJMOXs%2FA%2Bwp5COPPgNFjJInPgdY1rCAhDupIZT1ikiRGyj&X-Amz-Signature=0da9721d9af37c75137334cecf5aba9ad9170d95cc3415271dad1929b478279f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665IRMANVK%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T152934Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLXdlc3QtMiJHMEUCIGIMueNHHBVOScmVXAEkpqOHTHctasIYH%2BywksJv2NyxAiEA7gDKhm4pNM6C0NgwZe6aQQbHOEzJCvKorto%2FC81Fi2Iq%2FwMIOBAAGgw2Mzc0MjMxODM4MDUiDLovGKGIbIBkTl3fEyrcA2qnD42ez61DZOKGOY3orS15QcdlNVqjJYWyLJ%2F0Iok4VMg021cjJzoTY6IAaOk6ECLbaYAT6KH8y%2Bc1NfJ5gSwsnyyN1r%2F0xBLaVtwT6fiWl85OHSA8PJhTbvHTGRawWFOEdCHwLp9GvrgaUZTrbXhxtoln0%2FORZEOAPvPRfKMd%2FQomGZBfw9UT7UGVSX15tx1mtzluMCd6jX9ltZMYD9XMWmKLSwABiUu67%2Bw5xmi921GA0FzKzBw%2BT0eKISN50d2kqwR5UBRfpuF7%2BcwBXny2u5pcCZNq2sEye0j7Ltw%2BzlBb6cbkNezjq05%2F8dLDftg5vUwCrsrEs%2B9VhgjtzbscRcCJVKjPP%2Bm2cTR5iL5cpiwrbo%2FfMwJB8YiWpnQNoAAToGNhffNNFW16P8FFVH41sJo7kWFy4vWBW9WJEeWF7b6VzesEGJkGIMZWZTaMcAAJU6pVgNRSJ%2FbUFYegZL6BWfFlxpQvRt6XBbD2idOfiJGU9mYESJrO9CTiGocyV5Y3111Bto05Wj3nIvxQCxxF43%2B5CEExmBtg%2FgQZXE3XLSxS62AjQF5G5evsCXDbgMcsSp5PC5pWtOv6G7kuTqMkzHwDek1D8p2AM%2Bxniut6U1gYYFh3Mj7jgswnMIblzMwGOqUBQI%2BuB%2BltX4uyF658IahV2vBu8ggYWiYcULzjpRWor%2FW53YuswXUbM9XDb3RUWg0y13Eg%2FZuCWjvZBYeCYozvdDBnSfBp2kZRJR5ASr4M2%2FAWNgtInbbA5UXKLWp7LTIcjvMMLyiyV%2FpdPtdFUSScZZ%2Fr1vNd%2FA7PPlwK0hJlEKtP5Rg2G9XwZ%2BQpaNiOsl09jkBwNW6AEev6ws6BIbQzYetIgSY2&X-Amz-Signature=0891e2d4dbf70e53d9772df7d78fe73d1992cb8b2db8fa3df2dc4f575549cbec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

