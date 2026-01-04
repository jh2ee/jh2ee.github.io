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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFTOVSWE%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T230100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQCIbTQYOVhwwSnxsajSSMKQbtWxIvHtdys62fM6XZLFHgIgZ7qsgsNd9%2BRqD2dJMdE7859UBnIp18Jo2hr62ym5%2BLwq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDLBkyZF59gh8RSH5GircA4z%2FPuRp5wS5oPg3cZnYabAguyxKwIpPXrgvItTz%2BjQjIMF4xsFIM8nPZiCFzs9z7unPfXRUkIu%2FpX1VzeE0801z5Jb%2B2mWjhELOkN12CVchMEXJNoSrY9CenuAmNWczNEL0WkC6y%2BomMnraICYgDY51FMjKZDkIPqpJgGED5x6e9Q8vcZnnQ3Mj2arcDLlJH3gej4x%2BltuaghokbwB4Lccg9rj6qNMPcdKjBCKffjhyXhIH%2Brzuf5%2BhjoD07z3hoJ%2FDEmaf%2BjE7IRf9zfAQ9bOAYu8A0tmKE3n%2Bwe31PIRCIwut%2BxirHaYrn6h1oiJ%2BxoCFYksziL%2BbPA%2BEKFHOG34MxAjTdAQNBvD6Y5sf2xDPTiCMWqe6WCw7%2BCtaM5lS2YWuoLW1fZvH%2Bd7PVIS68em8%2FKuiS6O19CuNP3IrcvP%2FYD3%2FVoQHpy0IKgm%2FY4TZDK4DS9qRfVtHJnT84%2B6a%2FhdVQzSD7%2BRGsaM0%2F1wDiCrL%2BjoZtojD8FCOwbEIr08mN9sHYomeD3Mt%2Bjs73L6%2Bz3Ow7%2B4og6aXWe4cdz4iAc1VEBwjoSuJcn5HoCYbpsL4yQSLu4%2BrRw5qaa2HHhJDlvx1a8Bj7GpVO6EFrH85UBnOj5HAcBRRvqw4XRBUMLCT68oGOqUBUkJ1ChQLKgH0TofVcKMaXg4DJCABKiH0A0NLjSv0eWChQEDuexSjltyEE9lDfom%2BLKomMQ%2BsYVOZk0q9Lpx78OkmsmR5xK7LHC6UP%2FWWzgpmEBrNWUhxxZdVsHTMCKIHHIpyNyR8CPUwVjPk7E1hZBLJjQYLKg%2BUYv4Og3Ke6L6W0Ocz8DIjOUpVy4EQvXRhcBITESneVfN3wJXTLl%2FSUTomlpGG&X-Amz-Signature=a65701d77bdaa362a818b37623bbec85a00a2f02c323ee5a8f077d18c83f289d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFTOVSWE%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T230100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQCIbTQYOVhwwSnxsajSSMKQbtWxIvHtdys62fM6XZLFHgIgZ7qsgsNd9%2BRqD2dJMdE7859UBnIp18Jo2hr62ym5%2BLwq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDLBkyZF59gh8RSH5GircA4z%2FPuRp5wS5oPg3cZnYabAguyxKwIpPXrgvItTz%2BjQjIMF4xsFIM8nPZiCFzs9z7unPfXRUkIu%2FpX1VzeE0801z5Jb%2B2mWjhELOkN12CVchMEXJNoSrY9CenuAmNWczNEL0WkC6y%2BomMnraICYgDY51FMjKZDkIPqpJgGED5x6e9Q8vcZnnQ3Mj2arcDLlJH3gej4x%2BltuaghokbwB4Lccg9rj6qNMPcdKjBCKffjhyXhIH%2Brzuf5%2BhjoD07z3hoJ%2FDEmaf%2BjE7IRf9zfAQ9bOAYu8A0tmKE3n%2Bwe31PIRCIwut%2BxirHaYrn6h1oiJ%2BxoCFYksziL%2BbPA%2BEKFHOG34MxAjTdAQNBvD6Y5sf2xDPTiCMWqe6WCw7%2BCtaM5lS2YWuoLW1fZvH%2Bd7PVIS68em8%2FKuiS6O19CuNP3IrcvP%2FYD3%2FVoQHpy0IKgm%2FY4TZDK4DS9qRfVtHJnT84%2B6a%2FhdVQzSD7%2BRGsaM0%2F1wDiCrL%2BjoZtojD8FCOwbEIr08mN9sHYomeD3Mt%2Bjs73L6%2Bz3Ow7%2B4og6aXWe4cdz4iAc1VEBwjoSuJcn5HoCYbpsL4yQSLu4%2BrRw5qaa2HHhJDlvx1a8Bj7GpVO6EFrH85UBnOj5HAcBRRvqw4XRBUMLCT68oGOqUBUkJ1ChQLKgH0TofVcKMaXg4DJCABKiH0A0NLjSv0eWChQEDuexSjltyEE9lDfom%2BLKomMQ%2BsYVOZk0q9Lpx78OkmsmR5xK7LHC6UP%2FWWzgpmEBrNWUhxxZdVsHTMCKIHHIpyNyR8CPUwVjPk7E1hZBLJjQYLKg%2BUYv4Og3Ke6L6W0Ocz8DIjOUpVy4EQvXRhcBITESneVfN3wJXTLl%2FSUTomlpGG&X-Amz-Signature=a65701d77bdaa362a818b37623bbec85a00a2f02c323ee5a8f077d18c83f289d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXY376MN%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T230101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIDrjH3KQ4GLr11XXAiNi56mqOxmpxyVIO7xAtrqN5HBcAiEAoCyn609yRxZsE4Xrh422LyZ%2FSmDwba9kruKVx%2BLjXBkq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDCttadspmigdJsVbSSrcA3Zpgv24BWVypbzNAqQrN1LAU98hWrjrTaj%2F5Higi3F5utNtSd9eXtSIeuJyF33ySNQ%2F%2Bzz4EUHDnVTNiB3mBAlOJ0zjEb30HEZErpSDKiDrTOzu7uiMZex0N%2Bk80PMAynfuqTuYtE2ehr64OMz%2BZ%2FJ%2FI7y5mYcrmNLU5TQYHcM9Ix1ckW4z4yNZanr2EbLCkkdpZNnygsgDTbXFBLsSMWc1YMuGdCZVNQPEhkqKPaXNOyKtyTFdV6QtyxXMX227GfiYY9BWGvulWpaMlk6aTZvuxDRGPJv8fFkdk3A1ClyDt8A%2BH%2BCHuaodeVDamvSDPVCEbJqcpSzCHE2bMX%2F0DQFazIPXwreUDWp7M9yprt69uI1KRFX5PJ549W9KfFrvvrKm6BNsQRljXdj7ES9pAE9ZXLxvbGTjrI%2BrYY3E3mG8W6XrapNdFjOfY6ihbsDG5c5cndvBBbRISMiM5yIRd8%2BVbtZTfbS6pW7UYObApOob0B9zsJOTMY0vMfogFVn0NJ95IghXKuQ45LnXsezAKEYgHDRLwzEKq5%2FYPZRweclvTIuWrkjCRSYfYZcUcQukq8%2BhNXoh8Sg1BoXdO7uQ50kht1jebu5dqtrXHzv%2F3EdMorbwyKDVvrJPZkxMMKCs68oGOqUBI9fOfceL9QOjj1S30HVX3ehFFC85rg3LDq1TvTwB%2BqEgIPSLmH5HfSZ6RMgkIAXyPQWHXUTD5aD6ALRIk26byb5nFNBkquXxhpMYUiI1Of%2BvNiS%2B9%2FLrJDh8TDdefO4aRsgxEgj19JXwCQ6hZK8u4LX9La2zmESdh1ETMBDrWFZa4L0UdrRuJN1t3304ni36yZgL%2BFwd%2BeccCyXAGXlgMPqbFhWt&X-Amz-Signature=fb4c2753628515e7d12fe78d648716bf25ec27434f750f398fbd86a1602f92e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667G3U4IPM%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T230108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIBB3ZH1jdxFMKsq6WBD8Jn8Eqe7Bjl4L7gA1VWySU4RDAiBGhnLShaesLMLHJfqjEESa62z%2BTpMcjwZ60%2Fq%2FKq5XCSr%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIM1vL40ozDSYtDwG4mKtwDRUx%2B3e8WE9Ab0%2FVayT10tkDx2nCn7hEOs8FVj1O5rvVwxj1s9OEBa0ztywFnYV541i9cU1gDF%2Fb3Fr14gQZSvfL8upmrXZJWEqGSp8suTiX2oxUZ8EreNYqI1%2B5fSq09j4im%2B9S1M7Y7%2FInEwPZCS8KnBImA%2BqgFUTvt%2FwpUpYqX6YaHMRrfjDtcgEaaL1oPlRsIcFNOavl9QQq4e4Q9brQ9YC6EI4ENAdwASDZJLAqYgfbjTpYmW6FOYbVjvQUKPPRa6Sr3h0jN%2FiS%2F0IRMTgpxTPrvUlTQpwRmTlKbnPJaSzVs760MpNPh6jjhnzG82%2BWX3d9m%2BrkqSwPeAmicTJlOXNgOk6OcYc3ZgEvp2EoM%2BegEUHT%2BkmL6pzYpsvbK9LT0I4CPJYGzwEvlNXsFPtSWzPlnfeeWt1fQwW9FQIopEQjdYRxcv6LbNgwTQ8r9Vw4Uv4P54kEfD5idSYk0WkxSbsVobrWzusZNUGelh%2F8Tqc9lUJXlG1gM%2Fp3UZ%2FjAN5f%2F7BI7CqY7qEHFv1V2EDDBNHdCjQl3bCSdFrhlgLeHLz75jj2GwGM2Frrtl5pi6XVx5TvJnDKACbKyf%2BKWD%2BK4D6JWqodzAm6Sb8ZPqw1VqDwgEE8xJ6VacKowtofrygY6pgFJCYpZlGHSW9upKfUOLF8DeACSymYTLT7qFIu%2B4URkx4ItzMk%2FHeVqe9Bzg1spKGythsw9QdzvA3Vy2ETL3%2FMJFh2NEePDFNB3cR9agM4MvufIDDknKX1TcrZtx5EvgXcs5UxngORYP%2BYc4KvJBv%2FB8AVYICGZ7pbCy4U%2BrCAawxj%2FI6FnDWkhuKTO2dYNkjt67kmkxmNOaDio6A02zMG0COQiSxYn&X-Amz-Signature=54843fdcd455817aa715e5388c251d167638177cbd7ebc051e29bb87a61c0348&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667G3U4IPM%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T230108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIBB3ZH1jdxFMKsq6WBD8Jn8Eqe7Bjl4L7gA1VWySU4RDAiBGhnLShaesLMLHJfqjEESa62z%2BTpMcjwZ60%2Fq%2FKq5XCSr%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIM1vL40ozDSYtDwG4mKtwDRUx%2B3e8WE9Ab0%2FVayT10tkDx2nCn7hEOs8FVj1O5rvVwxj1s9OEBa0ztywFnYV541i9cU1gDF%2Fb3Fr14gQZSvfL8upmrXZJWEqGSp8suTiX2oxUZ8EreNYqI1%2B5fSq09j4im%2B9S1M7Y7%2FInEwPZCS8KnBImA%2BqgFUTvt%2FwpUpYqX6YaHMRrfjDtcgEaaL1oPlRsIcFNOavl9QQq4e4Q9brQ9YC6EI4ENAdwASDZJLAqYgfbjTpYmW6FOYbVjvQUKPPRa6Sr3h0jN%2FiS%2F0IRMTgpxTPrvUlTQpwRmTlKbnPJaSzVs760MpNPh6jjhnzG82%2BWX3d9m%2BrkqSwPeAmicTJlOXNgOk6OcYc3ZgEvp2EoM%2BegEUHT%2BkmL6pzYpsvbK9LT0I4CPJYGzwEvlNXsFPtSWzPlnfeeWt1fQwW9FQIopEQjdYRxcv6LbNgwTQ8r9Vw4Uv4P54kEfD5idSYk0WkxSbsVobrWzusZNUGelh%2F8Tqc9lUJXlG1gM%2Fp3UZ%2FjAN5f%2F7BI7CqY7qEHFv1V2EDDBNHdCjQl3bCSdFrhlgLeHLz75jj2GwGM2Frrtl5pi6XVx5TvJnDKACbKyf%2BKWD%2BK4D6JWqodzAm6Sb8ZPqw1VqDwgEE8xJ6VacKowtofrygY6pgFJCYpZlGHSW9upKfUOLF8DeACSymYTLT7qFIu%2B4URkx4ItzMk%2FHeVqe9Bzg1spKGythsw9QdzvA3Vy2ETL3%2FMJFh2NEePDFNB3cR9agM4MvufIDDknKX1TcrZtx5EvgXcs5UxngORYP%2BYc4KvJBv%2FB8AVYICGZ7pbCy4U%2BrCAawxj%2FI6FnDWkhuKTO2dYNkjt67kmkxmNOaDio6A02zMG0COQiSxYn&X-Amz-Signature=e1f176d27cfb7b070ff9f4a4f516d0ed9740be8ff92aaeb3aa3880c739079504&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDFIDJJS%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T230108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQC4M6TV6e%2By76iFW9j1xIy3nsm47pPoZvQUTByXPeG6wAIgOWt4Q8wfHM4B1gXMXPXpNnkMi1RazL1ZL8MhhNBQhPYq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDNbhZp7K382XAfmzJSrcA4jfgglsrYf%2F02%2B%2FfrFFUdS3%2FUTn9w0dlowcez2WTMe20jXyeWIN8R2U%2B9e8OVWyXUIidoO5n%2FB2ofQ900ktGBc8HYSU3jnQU9RZdOrIUrJ16JGJmbsPXfwvzpgFRC5lyHECyktPliSdgdvj5vu0PuLJF8DawF7ZPqE%2F7x5SccPlzfrBTgJx7qNTGafQrkFbsMnVHmME4%2BEEM1e4VKQIEfIbYJIXsgUG%2F7nNgnTfCuPPddKgm%2BqnwrZrrbf4%2FuuK2YIr1ZjvkFFZ3fwW4c17sKz%2FUsnh2Sztns6uHajy%2Bx5HwgUiIQT2n9k%2BUkLyA9nnQ3Yvet1l5a7xBkIJjZ4HXejVrN%2FjQaXQudw4JfaAdByVCgNhvGK46Jzmjwg65YyHVQTOmErfwJd9nsDjDI780zFM%2FmtVcHWXjyz8rQO4%2BbP7mMIIChM4RGdgv6m6Xm0aWZRPE6nbH13Xn2lX33bGxGqQjjjF%2BynDk7kvDD1SA1O9AZ%2Fe9lzDQxMGLnEaO%2B9R%2Bfo9vKsei%2BAJmySA%2BYyYsyOJ%2F2mDcN3RsaKtzUflxCpE2uheQ9i3VUIwti8sBOpWvQG%2FALFlPtx%2Fvhg8mWfQ7qkEu3d8wxxFuJXuFuqu135BmLTHs4q9YBglgX5OMJ2P68oGOqUBjmby0152o%2F9o5ggplJb%2BDv9o8N2hZMxh%2BPMYG%2Fp2q8x18RrbtFmbIzGDyFTCNmV9dVakPUsL1KrTEttGtGt%2FwjHVrm4yH90rzsnClkcep3YDC9ULlzv41yqt3ZVMDFp7nS81BMwAybGqrgYG3y7C%2FthGWg1oN47p4J3KRe6JaD3ZLasZ0kW48cbDKW8KUFX7qW%2FLdoZdSKelaqlmXdedOKUrY9TC&X-Amz-Signature=23e8c222bd2ebe2dc98178ab39979a75e741a453f7bba3041d8663a243f66043&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFRCQE6F%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T230108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIE6w%2BnUYOK8e4KduvibqrQXkpwCruTqP6Igz%2Bzl2oCGBAiEAvK7cJxy84NXvIxbW%2BjoJWU1C3hTwv%2B8MfbpeA3aw1I4q%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDGOgU0Gqv3zeNa%2BQKircA9LuhNkp88FqCUeZbTxe4MThabylakAJeOoLo5h2Be%2F0Yki8gfu2MXDQXibv76YkLwX6ANELMyjdJ224sioSfjG0R6M6%2F5N1Qs46JvckIwPDc0YdHTadRJUMqP8HxvpV6oD0X%2FEZ6xzm86E8BYIGnA1HN468R1th3HRCPVNG4fi6SQ0NOnc5qLkzhgA4l%2FyDxgiJRylBCrTXVgjCw1jIglBpGmlh2As7kCmafeiT4UF4iNxLzin18PRXLBSY6RndRpgr6THx9VBdofAoP8PJsMM1Ji3TcVjTbr73Kg3XRmGKP%2F419j8n8bRjpJBrb3KR0ln9%2Bzls3RbpZB0hjymMBD8C6X%2BA6lmPspWj5jWqaz6Z4j1Mp4Ie8U91%2F%2B6yr5CxTA2zDbI9XdOm0Zkx3xkHQJGmUegCc%2BbB2pj9QceTwOkve5%2Fc7f99aPh6zn0AxCoLAkclnHoEtvcj60WLqPs0y1W8QBtCdBrTs0%2F2bYzj9qSZBxMHwnbntbJgWWrTJJC1DvIlhL%2B6fBab%2BFw6FinfYMBnExWYcFXvkLW2Gi1bHiCTx8P%2BItdyG4RA%2FnY3rIkdYo3%2F5uwRgvB%2F97gTnEU2L858iZWiRrDBD3ZZcahUXaL45Jh7jRUC1Do2QyxaMMOZ68oGOqUBTOjNqmfLCk5HWQ8avh3YeiU2tvUBd6sdSpFYR0eRfIva%2BdXy3d11lza3aRApAlkEYcqEiTyV5nzUYQgWusxl1WtOj1Ojq1u7k8DtZ6iKNNjtc2m92ZxMoUWq3GCFpoD2XsM3CA5PKiPAqIR9IQpRKKXPh8KZZaGnW07nk85uEKyO6VgEMoTtnpl9HNEaiyQhF8fNxp5tXhqdTeEHtYbuWvKDK0b5&X-Amz-Signature=6f5228fc0dded05507d44511e0d15bce5539ea9ec7ab2ba15035cda0bb1d7f89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4GLZ7FN%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T230110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJIMEYCIQCzGYiaGtDMj3hAtHlk7o36Nj0GzKPzGS23hKDOz2qOmQIhAOfIAH3J4m1Labf95Ssppup8U54Ydg6L6iar1V6K1IJmKv8DCDUQABoMNjM3NDIzMTgzODA1Igz9I2CAuIo%2BH6YU6D8q3AOFZTsE5L10zbKY3F%2BSOhQD8%2FQV2fLjrulMqQXxP1XAcSGpJunHEXcQrKHc1%2BImQ19eDKYnqzirVIDvY0YZo9QssFmJ4AHW7eGIp1PL0VLWz0539M16hRNxAsjcGkKADJdSO2rhTbE0kYKHpLbqvbCaZHakIYdgZ2ySjitYkv9P7K3TGMNK9N7AjyDMSKwhen972EaLHtA5hUn3QTicFsrPlYI8KdinmrXmWm5z%2FB1ufwStGy849qMJPw%2BEGjYmqbtdHzuMPSCV0ttXZVuAULpzO9Tcky1qqE4yJ%2B5LXkKe6Jjvl71gKXBe%2FrvI0rXRCUeTe8pmPvz3t%2B4HOX11a25cCivMSEQTRRVVJ0OymywisDX9ZZ3DE57jTnkD9Az8m4b173cPfJt474EHnE4jtyKUv20IwBxXW41QOzu9PhxUO932EEzRPfGggBQJZ4wxfNnFXHpqotzqA4CiqsW%2FdmSB4BmWtoM%2FjSWactBebAJPkuxq2ec9%2FOQs7%2FawkPF%2FDx4r9mb10WBk3o7kL8dnGL48Bkba6nVO0ubKHBQmNT%2FiHFgJf6H7ws0fcYVM5zpzaUL3DglAAJswJW7lBEJznSnUCeqKt7teBKA8R7X4nenBYX39Fl6%2FovKLIzfMTjDdl%2BvKBjqkAbfSNnLlmBaC7%2FbArrMJEACA1GGF1Lv2wGoEYDbGgsghbI9fhJKExYCvIm6RgHXVEEuNqF7nU5gNRdWZiIG8yAjyrUoKuZdmhLA%2BCH%2BZQAL2V9MscX8w7lmFAH%2F7FUsdJstMLyDINl5W%2B4eCCuo0HL%2FQkS4bf5i7gwZEBNMd85ZcEBy9y%2BS9l4RiJWidL%2BKRTR%2F1KinOgHIBidyYi8ODGY9ahAlN&X-Amz-Signature=6dfc8acf191e9baf2c354619e5315ca92fe01fb0142cc5121dde06485b6240e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666W2IP47U%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T230110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQD1JzyNz2zFH8vqSm%2FJhZaa2cD6ip1hx420gdLo7aHMMwIhAPJlJkN5Zm7DkPVuqDJz0QP4q6mOML3tgvPXyu6YG%2FIVKv8DCDUQABoMNjM3NDIzMTgzODA1IgyE2Zk6HFDjylta8Jgq3AN84Dj5j9zhROSnE8KOF2N10x5iI2yqEFgEToP4tTmt3qyxyu8Dzlf1ld%2BdwF%2B9MdqU5YOQFk3CFuHEcSZakbcdA7yNxTgEJX8bDpsbOgBLTXRQrjHAuvwNYTqsPrS4z9FMxuEMWCzx3PIA5SqNgPK319Ap6sFUEgh0rioqdsvL6gucqjV2dOe6pon6%2B40HHMLNhpGVTyyQruQvGd1KA%2BV9ogTS%2FFfxQcj34Uk%2FkIZ9CiJvpz8fixRPdIfkgCIz5HMrcawkdEHpFTyxn7h%2F%2B2VmGMTrDFBn0Z7oepIgqAGVT%2BKzeBbXMvVqsdjvM2GGEYdoDmplglLdXbqqHBHJm5y2ou9buSBJmaN88e%2Fv%2BLrh%2BA%2FWRfjmA5hwKYAXZcxr1w31V4aKXYCVfnWvcrTBKjBc2lAur37lOAAcb232RaXSXpHKgtOiHeeBo2zBP%2BWI9XPoP76Q8jalaQclAt1b0IY5hC80rJ6S2EnIkuhNMaMwfeYwiC5nUGgfzXK2le4nENCf9Wpq89HkEM82FMnxsWh5kYENed%2F8zG19de5uacU%2FfhHThwmZ0KlyZk%2FaVGJuZU0ofM2QE9UB4LmGRZCxbXxorAKrzKeWUNm2ymITuu6RBvsK46oBYu%2BuZf0QSzCBjevKBjqkAS5ZjIOUBZplHPiJJSIYQpiObEAqyyEt%2FC%2FbJT72gMaWbCwalva2MaPFLa0A9FRDeeHoHDYGWMoCD2fl3X2cGCJN8LqiaCbQM59xagofvci%2FzQiY4lT4mHX4OHB4XGWlxVAYe0aOhjJKfKLMO1WGsvS5g8%2FAnv7S2aduqy7UL2qSVJcrYNad4rCpPmB8TGqiisKSVN2b2L%2Bk%2FK4A%2BLGLKCfPDtOg&X-Amz-Signature=7b72363c36ee152803c165be2595a729c6d4b3f05e4bc4229d7e8d6866431633&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666W2IP47U%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T230110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQD1JzyNz2zFH8vqSm%2FJhZaa2cD6ip1hx420gdLo7aHMMwIhAPJlJkN5Zm7DkPVuqDJz0QP4q6mOML3tgvPXyu6YG%2FIVKv8DCDUQABoMNjM3NDIzMTgzODA1IgyE2Zk6HFDjylta8Jgq3AN84Dj5j9zhROSnE8KOF2N10x5iI2yqEFgEToP4tTmt3qyxyu8Dzlf1ld%2BdwF%2B9MdqU5YOQFk3CFuHEcSZakbcdA7yNxTgEJX8bDpsbOgBLTXRQrjHAuvwNYTqsPrS4z9FMxuEMWCzx3PIA5SqNgPK319Ap6sFUEgh0rioqdsvL6gucqjV2dOe6pon6%2B40HHMLNhpGVTyyQruQvGd1KA%2BV9ogTS%2FFfxQcj34Uk%2FkIZ9CiJvpz8fixRPdIfkgCIz5HMrcawkdEHpFTyxn7h%2F%2B2VmGMTrDFBn0Z7oepIgqAGVT%2BKzeBbXMvVqsdjvM2GGEYdoDmplglLdXbqqHBHJm5y2ou9buSBJmaN88e%2Fv%2BLrh%2BA%2FWRfjmA5hwKYAXZcxr1w31V4aKXYCVfnWvcrTBKjBc2lAur37lOAAcb232RaXSXpHKgtOiHeeBo2zBP%2BWI9XPoP76Q8jalaQclAt1b0IY5hC80rJ6S2EnIkuhNMaMwfeYwiC5nUGgfzXK2le4nENCf9Wpq89HkEM82FMnxsWh5kYENed%2F8zG19de5uacU%2FfhHThwmZ0KlyZk%2FaVGJuZU0ofM2QE9UB4LmGRZCxbXxorAKrzKeWUNm2ymITuu6RBvsK46oBYu%2BuZf0QSzCBjevKBjqkAS5ZjIOUBZplHPiJJSIYQpiObEAqyyEt%2FC%2FbJT72gMaWbCwalva2MaPFLa0A9FRDeeHoHDYGWMoCD2fl3X2cGCJN8LqiaCbQM59xagofvci%2FzQiY4lT4mHX4OHB4XGWlxVAYe0aOhjJKfKLMO1WGsvS5g8%2FAnv7S2aduqy7UL2qSVJcrYNad4rCpPmB8TGqiisKSVN2b2L%2Bk%2FK4A%2BLGLKCfPDtOg&X-Amz-Signature=e7d2c5160ef487241b285342879852e4b3557316f636ebadafddf586e1b8f5e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RKKXV4PZ%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T230055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIHWoZEZ3%2Bf5HfllDaPsZFAumUrp05KM%2BIgXalH%2BdobZvAiEAkdgbZp8Vor1oV0Qr9BF1bXUnQcbakeTmCV5%2BO5Ig8zgq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDNTCtoPD6mJ8MMJ9PircA0nJckjdn2ScOzMlKoTzGZ9gyVjPFSiuk6UDegsss5MbCKKonw0bvGPbE5W4738YZxRlMHDlD37O94dAoOE5Clk%2F2dOAP18B7%2FNTj158DarYH07szm7viQVWIAIAHg99mf91GCDD5iV%2F8KsJw3RJfVD6eNBWukvs5sndXnfRHFaKyPcydiWDIuq4whHttMcPJolrFwBr6%2Bs0vXPSborH%2FZIyENCwJedUx564UYdaqGHPL1YuE%2F1XMGf4blZ2h8%2FsUvenJeCo3qY6VcZLHD4pR8BrodeYD5JkdDvLx%2BQYf8%2F2rPSHVwDT833FLWuj18S1jDnowpryGbnTi6FeMVnbt6lhFAy0VyxsNEqRzaiwT2IvMpC5KhlP6i6Gi2nOTZgAQp86Rh7o1lUDRkqz5BhDCKwdEPXELHSvCvmfsJtOYAhWQi8iwWiKffXoozbLoGpPt9i%2FpRlYeLQo4NLkMztzQUGQMEkX3wVRUvLkEb7qCHPfwsyHtMN12xwfXUBOKYuUZVuo4WX2Pobzz1imY8KhsqA8EtwNwG9uHPBrXzyO4iNur25u%2BcD4VxVYcV6jZyJK6VQR4r0Rv8pHoE398J2wO1ia%2FjJt%2FLwO68bSwbWycxFPfdxbhacIG1Qg7R3qMJeL68oGOqUBFBgxQ1sCW%2BlBYSKF8eV%2BWrajDBxbKQ%2FS7WFFC9E3F9Ie96WUM59KkG5Ob66WfVK4jc6cDjki6tJITz22VDMq%2FbrFtuxL%2B6T%2FrYsYju7HVWq0UzuT%2BCtm0LS8n891WOUduXvZvqRfc0KQleJOaQd%2FEd4xwGSnYTRPGJkg4fP6mJSitPltQV33%2F8sJ6ljmByXiuY3DqSGPgjnwed4AJNrSY8w3CAcj&X-Amz-Signature=2850eca7937841893d55b21fe3d020de0ca9e800b03a4dabbedcc8cc51526261&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VSCTMIXE%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T230116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIDqn3ESS33XsrYnU3uB88UdMz4kRZ8wPHnWjc1aQg6IcAiBW9wPnUHrgBKOPXfY5F11AbOpc1xttwoac3pYYHvkTkyr%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIMcLsck2KBU2CgSj1nKtwD5zMg6OMArVPWVJ7wUEC9tRowq90rRJ%2FnhLQTTh51709QyLWlSmWGYZUESxCSO8GDL5xZXjUuEv%2Bh3rjf%2BfEuE4sndtTXoLlVNVS67rMCQMlJtxsX1tmd4Rb4swAPGo3RPbd50nX0Wi4BdsmNAf7P%2BEz9Om9jlCix4dPIosqx9zLTApmN1ooLHjt7y%2BKTQ%2ByJvS%2BnrHXNjbds1QDhkzhGRpM4y9lFKG%2FC1i6w68ehHu2XVCA8G%2BtASjD9sc6gOjJNOcpTJErBcFxgjPsM6WP%2BiNM0GWmKCtqtBR7Y6SriDiWr%2FzN%2FIAeMDKvHshB%2Bp%2F8Vtw20OOsvKFHgEDLFO1Y1bAb04rDBF6nMmYyHD8VxErbsQ3C64z8pueyrLn9zIVLfa7KcDPY9R5csNVkgaznspSdNmSHVILm%2FrAtDK9%2BYnzxV2Lz9Y5mZf1JIy9e11%2FCA4LHCS54giXtsTVlbg3sDYDeqyn2k%2FR5OWibhJfTV%2BpySQ2YWl31gvrDHkxKpsHC21n8MylZ77o3%2FNuS8X5NNd%2FrDnMBME2fVntQyyvCo0gpiBRFGk0mouzBeIW2WHJXbqUtTfZndeiHwn1%2FyJZnaqOTR9DfUhKDN7gex8ko36d2%2FSzpC04DQ%2Fcyd3Hcw0o%2FrygY6pgE4K4QqVhwaQHCs44k20i8tniGbKhW3BLtO%2BlxeEfcJ17cmJck5%2BHICQuuHzPZzrTPMjju6ZplpiCPwvb5yctT2zOqgssT694m%2FB7W79sZgWocLZ9Lh3TW4YmoDkYLRJFUrQp7q5KYl18D%2BkVz%2FoGDO5WzCApcNv74jCOlpJJChJRYsL8hkzedhhvhSmzKu0XGuAvtIXB%2BwqpgpXdb0w5geO2Kgy3dh&X-Amz-Signature=56d140e224b24c870a781e7ecaabdb07223c76ec77741d4cd8fad62248022f1f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VSCTMIXE%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T230116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIDqn3ESS33XsrYnU3uB88UdMz4kRZ8wPHnWjc1aQg6IcAiBW9wPnUHrgBKOPXfY5F11AbOpc1xttwoac3pYYHvkTkyr%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIMcLsck2KBU2CgSj1nKtwD5zMg6OMArVPWVJ7wUEC9tRowq90rRJ%2FnhLQTTh51709QyLWlSmWGYZUESxCSO8GDL5xZXjUuEv%2Bh3rjf%2BfEuE4sndtTXoLlVNVS67rMCQMlJtxsX1tmd4Rb4swAPGo3RPbd50nX0Wi4BdsmNAf7P%2BEz9Om9jlCix4dPIosqx9zLTApmN1ooLHjt7y%2BKTQ%2ByJvS%2BnrHXNjbds1QDhkzhGRpM4y9lFKG%2FC1i6w68ehHu2XVCA8G%2BtASjD9sc6gOjJNOcpTJErBcFxgjPsM6WP%2BiNM0GWmKCtqtBR7Y6SriDiWr%2FzN%2FIAeMDKvHshB%2Bp%2F8Vtw20OOsvKFHgEDLFO1Y1bAb04rDBF6nMmYyHD8VxErbsQ3C64z8pueyrLn9zIVLfa7KcDPY9R5csNVkgaznspSdNmSHVILm%2FrAtDK9%2BYnzxV2Lz9Y5mZf1JIy9e11%2FCA4LHCS54giXtsTVlbg3sDYDeqyn2k%2FR5OWibhJfTV%2BpySQ2YWl31gvrDHkxKpsHC21n8MylZ77o3%2FNuS8X5NNd%2FrDnMBME2fVntQyyvCo0gpiBRFGk0mouzBeIW2WHJXbqUtTfZndeiHwn1%2FyJZnaqOTR9DfUhKDN7gex8ko36d2%2FSzpC04DQ%2Fcyd3Hcw0o%2FrygY6pgE4K4QqVhwaQHCs44k20i8tniGbKhW3BLtO%2BlxeEfcJ17cmJck5%2BHICQuuHzPZzrTPMjju6ZplpiCPwvb5yctT2zOqgssT694m%2FB7W79sZgWocLZ9Lh3TW4YmoDkYLRJFUrQp7q5KYl18D%2BkVz%2FoGDO5WzCApcNv74jCOlpJJChJRYsL8hkzedhhvhSmzKu0XGuAvtIXB%2BwqpgpXdb0w5geO2Kgy3dh&X-Amz-Signature=56d140e224b24c870a781e7ecaabdb07223c76ec77741d4cd8fad62248022f1f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YZMOUNW4%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T230116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQClYIl%2FFNPZUqrFIH9purzCRI1I72aAacN%2B%2FO9LlZNRvwIgZ7R26UjZEmiAl6LREIpUHKqykQi5d7d6PVyESc6qqPkq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDL2n%2FXLi761MqUTTIyrcA3%2FryZAqTODZ8Gal8me5NEQ03SjO62yDa%2FPOBwzmddyO1g3MIXhLi1LfqCHGeNEztMKyTiZpmLOXL5wqXGTosqYajte7AYaw8c5ratvVpARItXQd2PKhSydq6oHmsH4%2FpJxFKSk2Wbj3ZmU5qbDULOP%2BRz5aeI0ashw3rq3JmbTG4V4J0HIbP1WpFWeXdbWTdsETJs9Kvfa7s8NMBKcYu5FhscaPxO5UbjqH4WjkNZ6D3olaJtTtQlQnaBJXFE%2FIH%2Br9uHuNtBISY57TvtReF2s1%2FSBROfcd6mHJeVDxn5jFIzNfs5OBpxysN8INHlN4lWxWfa%2BcNMbPGcQPIHfztE3EGgSsxP2FwqIjVMAk76s%2F0%2B2Gz8PPiTi3iyIKxxnUl%2F9tGoBelrrFYrBLNzb078dadO4WDdfXAiG48wxDthtWhDT1UGDcLxrhNKpMZd%2FGMSr85l5eiXP3oEanp4mY8nCTIt%2FhVeEX627%2Bb3OiakBOTN15KzlYA%2Bkz3OYHP1HCpqHl6ThVunlVhIUsN9E8Exj6Uhbk7vxLoj9nL0WIRD%2FoPYyMVy8nTzp%2BQQQDXQS7OgwNWApihk9DBBVvRpEcfzqU09laN5z%2F4eUCFalYC3Pc4E5judsIWocXCLKBMJ6b68oGOqUBQ5Da7rYWVFmzFCelEQoPr9W5Oo7TBN%2BeJJg7lsjyP6jEbucJgCvneCAbL6ZeipuqP9lK7%2BW%2BvO65hCa2C3I69cZz0jPfTVFNdIdlJKp38FujDXVkyrTGQ5pUKaUp%2FxZX7xA8%2F5SI9uLoAfJwvoLY3A8vsWHKola0giaU7eqGWwDalsvjwfKXG3fhz%2BHi3DcRBF6WTyrpAtcX5%2BF%2B8Nvm5taYq3n8&X-Amz-Signature=dd9c9994393aa7577b48d4802565777a5707525a8161dc8f3f5b95cafd3af5ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

