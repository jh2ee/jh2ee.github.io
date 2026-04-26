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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466REEARMKS%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T143551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDPO2eYt6acScKkl4MmcEyd8r%2F%2B22T%2F1VTUswbg%2BAfK0gIgMDu53VONKvImhZWfaRKZbEXKX79T2ef%2BnitOUu8v5nUqiAQIqv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDMV7qcJEL2MjDFzRSrcA0T6EWqSiRzosjofnK9ur0swcoobSIl6FnYtJUfAbsr47uwZVvWcGDJNFEgySc%2BT5UHjOuu3VUXLO0D1dFTsnbwLdxCV4XGF1gLDsW%2B2cUn1ffDRTo8bOCc47mW5TGXxs3gIRSqXX%2FehkDvRFpsVFDf7kbDv%2BvRTijw%2FFsBbft4Y59p%2Ffe31f0udm8tx9NZMPskcaW3LcJHbSgmFBFMShj%2FvKppsed8iw3wyNZWjMeEtL1hgOO1r6jUjhfEFWqfFLA2nDWT4lRT%2FlAZwT6pgGuVa%2FEV7EpcVZt9672H5HXibaTmm2fg7ZfPUhacogcWHqMikbY9SY0Jfso3LrWTBoTU3q4NtKOv7kekZ1935fgoDxGCh%2FzOaXz1k%2BXYj2Dx%2FlRstjyZhPkw43QM1IBt%2F%2FtbnerRe76E8CWO5Tar8GfgKcWXPfU5bctjtsAodkJ0Zbxz%2FKXtKsxQlwlrwyt%2Fh8A0P9m8jCrk2W4JqB3UBDD0eMx78BdJKGCUBeVxfpcxgONnUoDgRnxKaScTnmVA6ZnyQ29hrUYuPU2yIyBF4JVjhpaTezcJUfaOJax%2FEyyPJRPvODZF9moFi9kCyJi1wU0llUCQfFUKTJbXnLw7PgbqlTRVbTQLCtoTfJ3Y2MIyst88GOqUBLBdqM8oBv8iqi%2BecwJyLJsjh44RIT%2BQRQ3%2FfU8FRK0QPU9h%2FNB018C3pBg2Y%2FnIoeDk5K8BqCrfBDdIHJfmOkCtLdIrdgPON52nPMqZBOU%2B8Oif%2FeSdJW1QLYKYd0sEoB7452ekbMTuBuOjPk%2FG5sFrEfongNdQb%2Bq3I7AVJvvsJ0XccFj4dtqiRegQd82Og2o6ibt8yt%2B4%2FU%2BNQ8LuJC8yXVbRz&X-Amz-Signature=6f32843012f2942641f7e6777232c05eff217b6b65d384de82cadf8cdd91721f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466REEARMKS%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T143551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDPO2eYt6acScKkl4MmcEyd8r%2F%2B22T%2F1VTUswbg%2BAfK0gIgMDu53VONKvImhZWfaRKZbEXKX79T2ef%2BnitOUu8v5nUqiAQIqv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDMV7qcJEL2MjDFzRSrcA0T6EWqSiRzosjofnK9ur0swcoobSIl6FnYtJUfAbsr47uwZVvWcGDJNFEgySc%2BT5UHjOuu3VUXLO0D1dFTsnbwLdxCV4XGF1gLDsW%2B2cUn1ffDRTo8bOCc47mW5TGXxs3gIRSqXX%2FehkDvRFpsVFDf7kbDv%2BvRTijw%2FFsBbft4Y59p%2Ffe31f0udm8tx9NZMPskcaW3LcJHbSgmFBFMShj%2FvKppsed8iw3wyNZWjMeEtL1hgOO1r6jUjhfEFWqfFLA2nDWT4lRT%2FlAZwT6pgGuVa%2FEV7EpcVZt9672H5HXibaTmm2fg7ZfPUhacogcWHqMikbY9SY0Jfso3LrWTBoTU3q4NtKOv7kekZ1935fgoDxGCh%2FzOaXz1k%2BXYj2Dx%2FlRstjyZhPkw43QM1IBt%2F%2FtbnerRe76E8CWO5Tar8GfgKcWXPfU5bctjtsAodkJ0Zbxz%2FKXtKsxQlwlrwyt%2Fh8A0P9m8jCrk2W4JqB3UBDD0eMx78BdJKGCUBeVxfpcxgONnUoDgRnxKaScTnmVA6ZnyQ29hrUYuPU2yIyBF4JVjhpaTezcJUfaOJax%2FEyyPJRPvODZF9moFi9kCyJi1wU0llUCQfFUKTJbXnLw7PgbqlTRVbTQLCtoTfJ3Y2MIyst88GOqUBLBdqM8oBv8iqi%2BecwJyLJsjh44RIT%2BQRQ3%2FfU8FRK0QPU9h%2FNB018C3pBg2Y%2FnIoeDk5K8BqCrfBDdIHJfmOkCtLdIrdgPON52nPMqZBOU%2B8Oif%2FeSdJW1QLYKYd0sEoB7452ekbMTuBuOjPk%2FG5sFrEfongNdQb%2Bq3I7AVJvvsJ0XccFj4dtqiRegQd82Og2o6ibt8yt%2B4%2FU%2BNQ8LuJC8yXVbRz&X-Amz-Signature=6f32843012f2942641f7e6777232c05eff217b6b65d384de82cadf8cdd91721f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665VYTHXYB%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T143551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCt9VNBSUd%2Fdu1u9KRyhwBD2O7FF%2FQmHmehRGVyjmaljwIhAI8si83t%2BOsJBEQx8GMI7RWv%2BLRsXUai04d6CPXZfR9%2FKogECK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgySSNsoGt6H2iiO7LAq3AODcFD0PZRY2svvVOg%2BQteeumv%2Brk4H%2B6rH1p2%2Fw6NoesCQnllgsIBK45PQkArHyKxoAJTf1S1xjd8d7B8ZsNXTLOlhkPSOLOZtBN7Ah9xpwDeH0P5h6C9vDgJjxfv7qgQWG0AvvypW87BCH8su%2B6WSfIdxvf1GtUVbJFf27GFu5y9W5OIWbXSjQZz32Ve6E0SAdaWCUCbj%2BgZ0LjbWyyqd31Z2bXp3JPGJhKgcwryDqdzcb%2F51iDgYeOWZdksBqOWZCEKI8%2FhKxI3PgSOLY9TiNGfdzdmI9IwoT51xmdAANQzWLfEYsuEvp0bEpzCEx5qbt%2F%2BEYYnrLtfGdnDvqZoeNN3190n1SXgST9onzWV3mRGvl9uTeL%2F7axqK52NMvNyBD%2BSUqtk%2Bffn9HTY1c692UrJJdK%2FZrsde9kOlPIS2K86vxf9fjuKXnxdO3jJY5QGfH8NRM3hUN2aT9vVFsUEFFJdSf9%2Fs10uHasnDAqGVcn%2BJczS0Tuo1hINrnMjnqjcEfFCZ%2FXZ4LC2PL1II8POGBfjW5eGnJQQzzm1SYH%2Funz2GXUsI2TrN4%2FP5Epe%2B13mAlHFG%2Ff97%2F2H8xwAE3EvV6r5SA%2BTvCtFR64eLJQ3HzXMSIVqcPkdiHIbm8zCq9rfPBjqkAenrtcRufuqmqFwetjfbjQYPjB%2F4uDEFCkBb3Yqgl%2B2IMHA%2B34MiCYPXzgjSLSsUwqzMP3uSGTLJPW9z58rS70gd2H3OUBig5lqP65veB2h5Ot94qMnsTwJRhAYUBfwSQN68hA5IWKJN4OOBMfx2YcQOHbTkVnRam0YOW2P2XK68oyO3LlHMjYLHRYhnEP0WvWFnSQAbIJiUn9%2FQKJDrieTkmsch&X-Amz-Signature=e5f2cc0ac196b0e7974766d92234028d6d26fba5750bf2a2dff6bd38183e7ae6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RMNWXD7M%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T143552Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEUEssTYa3moR%2B4OtuuX6%2BvQ2Lpp3zxq3PeQh9f9cE4hAiBL2HIHM0E5Hs4sO8DrVb2xIWFLncPlIU9FeMwUPgY63SqIBAit%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMUW1FHV1pJ7t5zLQ6KtwDC1LTzCYchHehlFNKdXbiwhOPIHRTLFWZtWt9BolLh2PsHsHinO%2BpWHmYP8EEa%2F8fVTd7UGZWfMVKvS5AOgC7t%2FdO1pPAoBoHZF%2Bm2UfDRy0b16FWJirMhgGXpNJKdek3TfZvsupfwjO%2B1uPUJwkv4E7cs8UsbaGFikjb8gQd18Q44ROEtQqdhpOmferWOepSgH%2B5BWqQ98gmNvZM70DtgYOjmxVMf0hBFDo8fqmvRmEPfCtV8cHVOcqLvGGS9GnMoMYrMcjvW3LYnYg7sqTra2g9uHOwKRaJistpM7XWIlsiPh%2Fs25lEwUggyI4es836lrkSQDP0JEHJpY%2B%2Bp0WK3EJqIJSw2rGY35TsvbBXp%2BjkzyC2ZOS0iITzFMe3Ej8U1tXSNPA%2BehxDPYAmQoshWQzOe249J2T6xf923jnS752AUN36dsnMrEgxOGDSn1IVlg%2FYmL2Gk8P06ob0hKL0h3juWHa4Q09Ri2yuSj%2BtTvauFIwJXE2eK8TEqH%2Bhaou%2FyfBCaMMuNHJgW%2FEwndBXSaOeatfYQ7Td%2FKyPXE7slAvv2b1oOzWbJgCiviSGmRh4WDrICqfclcQFK8NSl%2Fcsk0gPwl3IOdnKVVpYsyq3f3EgVkFmN6DcILI27DUwmva3zwY6pgExJjheRSE8caOL6zXjWb9u9esC3Mepej4WGd%2FQUHHM8sWkLH%2FGv32ic6pRb0wcv%2FwVbwgnjr1NIKXfAqos9Oi3JJj1crC3NtvUJUcn0HA3gPTuLB1HomRduAyGgLnu1vXXO0i51XETJdDTKyfnwlITM6iwcfq5azRnO%2B0IW1ts7pRJqU7r2EE0E01KRmc%2BnhKxV%2BhSj0SKd%2FMvqw2q%2FyuSA2m35qpS&X-Amz-Signature=3f1d9c4fac7ac9b37e4c938187f97c53486890ea1499662353e027d115e6f414&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RMNWXD7M%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T143552Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEUEssTYa3moR%2B4OtuuX6%2BvQ2Lpp3zxq3PeQh9f9cE4hAiBL2HIHM0E5Hs4sO8DrVb2xIWFLncPlIU9FeMwUPgY63SqIBAit%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMUW1FHV1pJ7t5zLQ6KtwDC1LTzCYchHehlFNKdXbiwhOPIHRTLFWZtWt9BolLh2PsHsHinO%2BpWHmYP8EEa%2F8fVTd7UGZWfMVKvS5AOgC7t%2FdO1pPAoBoHZF%2Bm2UfDRy0b16FWJirMhgGXpNJKdek3TfZvsupfwjO%2B1uPUJwkv4E7cs8UsbaGFikjb8gQd18Q44ROEtQqdhpOmferWOepSgH%2B5BWqQ98gmNvZM70DtgYOjmxVMf0hBFDo8fqmvRmEPfCtV8cHVOcqLvGGS9GnMoMYrMcjvW3LYnYg7sqTra2g9uHOwKRaJistpM7XWIlsiPh%2Fs25lEwUggyI4es836lrkSQDP0JEHJpY%2B%2Bp0WK3EJqIJSw2rGY35TsvbBXp%2BjkzyC2ZOS0iITzFMe3Ej8U1tXSNPA%2BehxDPYAmQoshWQzOe249J2T6xf923jnS752AUN36dsnMrEgxOGDSn1IVlg%2FYmL2Gk8P06ob0hKL0h3juWHa4Q09Ri2yuSj%2BtTvauFIwJXE2eK8TEqH%2Bhaou%2FyfBCaMMuNHJgW%2FEwndBXSaOeatfYQ7Td%2FKyPXE7slAvv2b1oOzWbJgCiviSGmRh4WDrICqfclcQFK8NSl%2Fcsk0gPwl3IOdnKVVpYsyq3f3EgVkFmN6DcILI27DUwmva3zwY6pgExJjheRSE8caOL6zXjWb9u9esC3Mepej4WGd%2FQUHHM8sWkLH%2FGv32ic6pRb0wcv%2FwVbwgnjr1NIKXfAqos9Oi3JJj1crC3NtvUJUcn0HA3gPTuLB1HomRduAyGgLnu1vXXO0i51XETJdDTKyfnwlITM6iwcfq5azRnO%2B0IW1ts7pRJqU7r2EE0E01KRmc%2BnhKxV%2BhSj0SKd%2FMvqw2q%2FyuSA2m35qpS&X-Amz-Signature=e5c87ded6912a2743cd1b7cc428cf8eccd41f0aae8e20311070ebf240602dc3c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665OBFG4YL%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T143553Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEQQDLQW5LZbpx%2FZDgENHjTBnUQemnA6bpkdxJXTNkfnAiBtsnAOUuuQIRRzWpRBmt2q2PURgJUMtD0kNsLDeMo8WyqIBAit%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMoGN32QqP%2Bfi0TE2EKtwDEBokDIl5cTSRyrlbjv4FVdumn3mJ7RillHMUyqnpxDJ2RftRwKOJ1%2FzaWE46ocDjIbEMLQgE8IPLddDhT3tQvqaTeAFk3909%2F%2FTu%2Be2ANjtQ8PLVkNmPQbjmtajZIn6vsq%2BAcRZdwo1i7JTH7Q6QzD5v2Ko5t19hsHWVUOtwYFBXKpuQE5MN42RHZPklnquxb%2F9n9Qtjy9eB81G4U%2BEAAlWJC%2BzHkaghW5ld4mT%2FCCGyFsVlc4uELSgVQbix3N7%2FPWYC5t8XtRasRboeRXYvEGRT%2Ff6F3xxaH8MYm7wxN0dAXDDQs8Dpe9DabU5Sg1QfH4uHPiPM0yx6ils3hIDWDwZFt5BonGKBIQf0z4gRfREG6tm24v%2ByQcR7hP9eFUpNBYyDK5aSfz0nufNtYUBqA6sZh6bH5N16mFpG4et%2FHGyX%2FZfrbV8PtRC5jV5iuEKOTwvwS5d%2FA5Voxv%2B16fkisuJHO45WdCiPC6yVOOZXCSr7QKrO69yzH%2BeI16P9w9vLBIToBEYqrVpN3XPd1Uf1BOujWX4ftIQqprzDdLEGHyVAtulmeemnvxJxnMWrGw%2FRelhPqRXNSwUgURK7Mly1PTc8VF6tVVb5Dy4lQWoIy3gwnu6Qjg8eGsC%2FMmMwj%2Fa3zwY6pgEOLrDLSgbh3MAJxI3idzrEcYueK0HxX5CTbJ%2BnAzldRyK91Sc2pr8EDlO2yS75zLodS%2BjPDHZ4cGytOUpy9mV34lyZZBwx2gtckOillHPM2jAhhWYpdjqbKvJk7dJOw65g8hUKP0n4%2FKmfCKPFEAGdk7LG3OzykQHZ3IJH%2B9TzjcM1dlh9BcTS5oMrnmwnnSGLLFpvkKj8ckAfBgp%2BSxLX9ibKIDsx&X-Amz-Signature=e00f30fb1142d6c33b0a68dd1c3f4fd0a2a13b31448ab178c55b6172700237fa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RC4D5DFZ%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T143553Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCwKPsnAxbqSrIMw7z51R4SgYR3BYwR3W7wb6GLhbFUvwIgWGEWMz7RBM44Bo%2BOvZwI5gvsuAX37f4KNimD2YFbgacqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEf1xc9FGPbO6EaWwircA4K7knxelz2O%2BykTecI78p6YWgnV4hntYwjf%2FgLpzAZlr4VgdJeEEgh7xQ%2FU6FeP%2BWY8IGzskIRVXqlVmc35Q%2F6ilF2ndm7C3HYq0tpN9Rk9EnJtH4oJY4e01PKJ%2FXmc1hBfizWpqiA3YYhdj5crMxq3XpYY%2FLIkGdkOVsj2u2sM0%2FLM2du27e16tC6xRjeykAce9W%2FHmM6NFNCgDnCnpKXyvZ7fn%2F4MBbbZaYonYtfOjoBSNTucPyHfU2hiFdcdacpsm1hYAsJwHciqyg8djN783hsDEkjKvw4RuqVrxExNy140Mumt1luZNxjUQXI7cX0z72vxmwx95dQmDX4AYHAl1yR4L7YiFw0zq4j9xCRbGuxTNFlBn8uTqUyuhjGW9R3oKq4BmRykZgmn7kWMXdE4ZI6vivKJo6GjDDJg%2Be9VNY%2FGiccz9Drf5bO7UADBHdnJs7UeZcjgqVWB34%2Fs2qHx%2FA7BLetBRWYxnFuDh%2FSJrJDjX0lb0QDEx2LHpbi7svRt4FMC%2FSqG3aBOLRUXAQBsX2TA1sHEbH6Y4L1g2Dfrzw%2F29XglzaXd%2BbnT0fUEPW7XRznLO9F3w2wkgPUpHIO21B3ZnRTXDITg1ZJFXPQ4GOeFhhDXyHxVduQvMNP9t88GOqUBNtHWbNPC7fSkb15g9J%2FA4aHiW27UwAxSZzvr6%2FpDzCqvJnvu%2B7SUDuU82Lk5aDaGZG9Y2PwHlz%2FeZiUsNp36ABIWkQhXO%2FuDo8eUKfEHP%2FGbUrKrsuZovzhleUQrcB4rfZ9YtsjKIHkFjQvW6f%2F7yxvZe863Jv87sRwWNqgDp6PvSJi3arRFI82hVRAgzPwY9W8rqURW56CR0uHn1wnMsYEONpLB&X-Amz-Signature=bc66ad9ccc1af11da0eaec3f5254e56e0d95ae4472132ea23e6964052ab27dd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TEL32QKK%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T143554Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIA4O1i%2BlviXfYIfesqjX07tHeRhbAszFMs7Mc5xBkrhAAiAOiDhwX8feXBWYRbQ3ZjxeQaG6KV3CFpNTryprw1TXYCqIBAit%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMWnhkUhHkYz3L1Jh9KtwDg%2BVrJHMCeOXFsYhMTWhywwDNDBgpdGZ27Zsb1Q6SMb96H%2FeyXNf7zY9EYY4F1rpKBGXo312hYlphz8Bjxk6ECmIbuVYTAASKwb4uYMpypGhDXHEj7xxZYbFdZhO%2Bt8HqukfuOw4YntOZi%2FaTf13akGYa8GeOLxY94XbEJ4wEJlRj97bGK7mwnbzlQnqZlVA75RC67I9cvmoFBPw9U0Ypc0Urpbg2oWIko8vuHavkxat9aLRQl9PoCP2X7UBR1AY8WddaxUHTXDAbIZhBvjvqD725u%2BpghYDGDwHKCI00P0I2kNu7hqNrXJSIMmuPeXKUXEmeJYfF7cjnUX%2BwA5p39vgXmMgnm43nEwFheS%2FzlQwFuKAYuF9U4e1AAmNPO1wFTkgIAUoXFxUP9Oc1ERJb704ztLhux%2F33LJBWkMY%2FJRApSzwmhBkk2mKrN%2Fu%2FZWRJ3RlrsNosmG6lFlT26EvBqDIpnY3UUn7mnC9%2Bvi158jBO8zQW1E2%2Fc6gHY5w3OmPNJUQ45%2FQZLOCJXr62sWzM0FM3YAHkdv0pQd7IgUJDKUID98X2vJDl5Ydb2Bn2prZECmUIYMk15B4NbzGK5eAqsC3JPWhRH%2BNGvB1Z8O6Gbls6ByG7Ee0CKg1oJ1gwzP23zwY6pgH8N8wmu%2BA8GNMko%2BrF6g7ekspegu1t9rgfG7G97WLS4M%2Bz%2Bo5deBx33fZlVyuzyMxPkaYPweFD%2Fjp6afmUx%2Ff8QNdVBg2k6hnBofGJyieHcx%2Bzxw68njM6HINE9Nv752JaFW%2FthtkVf19CWJx8vzXxQwOgsoT0681okl9H9GzkV71PGonKSpWgucC5ODdbTtm79soafwgBUkVdnPdt9z1KOjzUp6Xt&X-Amz-Signature=3cbba4787e5ee55969bf6b3a65c6a2aec013bae8b6154461991e04bf1ea4dbed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662N6OCZ2M%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T143554Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDX43OD6X27Jql06OaiAVsLknOyhynXYxIpQ6F%2BpS1IPgIgBdSEZ7w%2BwaZ6mdkyACKWIR%2Fkk1AV26wWy2eAINMPypwqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL0uUJsnSGzMw8bdtyrcA9Dx1DMIydw4n2rFrGFtJ8i8NpdXoeXFrL8gLtNnRkyQxE2rzPA9w7uJgTrLT9ZsDZOJscHZNyUU4%2BBuFr224ejASm4AWodbC2bXoDohg9Y9USEq6cuWjws8L3nBfPeaB3qTtyNZqs6USvAW0EH5D264vhCvEXVHxIJbdPFA1x6qW8HMx4mu3Mlh7VU1tX93qa31gzj20YT9E7TPPdGNqpRBSQkduM2YI1Yqx3xQNrI83uKNKq3cxoWRIbtQ%2Bvx4cLm8p6j3CfriOSemzSrU5hLLd9x%2Bg6XuKkWshFzPGP90BunXzcHpSzJ4ZqIH5mG814Dz0M7XLlauJrLGccUGOil7svWcis0%2BRRTNoijFB2zfi%2F4icE6uKKYiNo%2FyvdXQ%2Bi0Xbgi7MhITgoH%2Bx6to0Ou3ORLEJY2jQjOloDWAhWs5DAS32dCPMCGXBCLGXLmKmYTjwsPB%2FBi%2FuRt2evKjD4FjTa9gQas%2FxsLHqk915z853KeMONWw2mxW9OPTArK2DCcVrTU2MkhHFrsN1d%2B9PcUb95On8iapP0Gx6DsQENDxiYRWaSCCwp7EF9ttPpE9cU4mxxq6opxxsU5dGXQFP7r1yIr4V1jP4czLZt8bc85PjVBQyXvsSBdWnV1CMLP0t88GOqUBS6Uf%2B8wniZNzXPMAme%2F8TGCG0t6WBjTTPFCwCHT7eHWVD%2Flr1zIyFgeWs%2BLLBIKz7J2ZdhXjgM2t6nfH2aJI1mL6yLluyY3tjFEfER%2Bs01p1H%2BkMM0IAgCYKalGOn%2FojJdLVKEh5mKbyIM99oh0D0kW6RpD4BkttpBU8tCi1WdWQr7Jp0PLGlYLnEzPdADdK%2FLfxy3dEckc%2Bk5Bmz6jO4iJIAORw&X-Amz-Signature=f258e8d49e4e1c277cf1ad0ced416769a027f350691d2efc1963faa0d2847185&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662N6OCZ2M%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T143554Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDX43OD6X27Jql06OaiAVsLknOyhynXYxIpQ6F%2BpS1IPgIgBdSEZ7w%2BwaZ6mdkyACKWIR%2Fkk1AV26wWy2eAINMPypwqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL0uUJsnSGzMw8bdtyrcA9Dx1DMIydw4n2rFrGFtJ8i8NpdXoeXFrL8gLtNnRkyQxE2rzPA9w7uJgTrLT9ZsDZOJscHZNyUU4%2BBuFr224ejASm4AWodbC2bXoDohg9Y9USEq6cuWjws8L3nBfPeaB3qTtyNZqs6USvAW0EH5D264vhCvEXVHxIJbdPFA1x6qW8HMx4mu3Mlh7VU1tX93qa31gzj20YT9E7TPPdGNqpRBSQkduM2YI1Yqx3xQNrI83uKNKq3cxoWRIbtQ%2Bvx4cLm8p6j3CfriOSemzSrU5hLLd9x%2Bg6XuKkWshFzPGP90BunXzcHpSzJ4ZqIH5mG814Dz0M7XLlauJrLGccUGOil7svWcis0%2BRRTNoijFB2zfi%2F4icE6uKKYiNo%2FyvdXQ%2Bi0Xbgi7MhITgoH%2Bx6to0Ou3ORLEJY2jQjOloDWAhWs5DAS32dCPMCGXBCLGXLmKmYTjwsPB%2FBi%2FuRt2evKjD4FjTa9gQas%2FxsLHqk915z853KeMONWw2mxW9OPTArK2DCcVrTU2MkhHFrsN1d%2B9PcUb95On8iapP0Gx6DsQENDxiYRWaSCCwp7EF9ttPpE9cU4mxxq6opxxsU5dGXQFP7r1yIr4V1jP4czLZt8bc85PjVBQyXvsSBdWnV1CMLP0t88GOqUBS6Uf%2B8wniZNzXPMAme%2F8TGCG0t6WBjTTPFCwCHT7eHWVD%2Flr1zIyFgeWs%2BLLBIKz7J2ZdhXjgM2t6nfH2aJI1mL6yLluyY3tjFEfER%2Bs01p1H%2BkMM0IAgCYKalGOn%2FojJdLVKEh5mKbyIM99oh0D0kW6RpD4BkttpBU8tCi1WdWQr7Jp0PLGlYLnEzPdADdK%2FLfxy3dEckc%2Bk5Bmz6jO4iJIAORw&X-Amz-Signature=d606593e9894bcfd12c8ef2ef7c13fb2c571f26d88b322535a4e2731027f24ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNYKSJQJ%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T143549Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDt1pMt96QaMKPmCaJH1ihawPpP3FmK6hneiqx3IP3VuQIhALUsiVUH7gjxiMeCtrFAijgAEFsqV93u3PkjRAk4m%2FqgKogECK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxhKcFqiOxO3W2hzdcq3ANMn9MPAR97ix97SPUYyumCD8DYI23GYpcLJDVK%2BTEb4vhsX9MN7D2Uw8%2BxvWJXItCxhffcdfxPzG4uTzsx3F1PBR55zuhbC%2FhI2F1%2FIKrfErSFMB86VjndFSs1Bbls3%2FRKM1QlauZxDjpuXCkIg%2FSkFaTtGGEqRFiM%2BZ%2FFfMdwA1cgFslEBprd0NX1WTtH%2BFB8IAqo8WOC%2BtmwOHOAD4gawLvWBfOqkZhOn8Sc0MCOr6C344WNy4NEp8Xi8cwBLbbKpwP0%2FMyugNKjJ3PgV762ce5VTujTzmSuChwMa66OJH1%2BF4%2BmEQKAUVXHDJiQpY058SUZ0q36zmV%2FT8JoSNXLtHeC7ldfw6CCfj62hQGek2W9riSzSVRMAa15FGTk3MZIhXlTGV3xZWWaOlMOA70DlNVmvz1ZpjzPzOzualcUQ6xTcrLPE4hCcTBBvrRq1FkiFMgbcCxOunEnllgBkLurU6vCtBiKzrtXu6cQr0Ug8Te79yjuY8XYo%2BtPg7W6AcMwOt1uSGdZexdA75FMkrh%2BZrOrmlVAredeekBvA1q%2BbYLUxV39mRafbTBMtMDG6j4koJR6mY%2FO%2Bot0VtR9wtDRU2sDXCjUPO%2FVhuP8BJ1J1yO9sHtTDzrsL8zUejDdgrjPBjqkAUdraZkQpeGJSxFTHWRdsFo6q7MjbdVg%2BDZ1aggmNC5WBs5cdDaAvYXugDRHi16SkpioPB3HxwXgr0kOg%2BLUdsU9RIpOjl69Yu%2F%2F8SuesD199eF52ahdSCDQyHved1O9nuviSsHrlzpmX%2F%2BBAkaz0Rl3zBrK2X%2BRB7c7uc3KsKabq6t51DpqmTOIjGwf2lOVP4WjF7uZuDOBRtfHsI%2FptN%2FBkXBB&X-Amz-Signature=6843ddbbb37b8ea4fd3cc5b9ef23f395792e8fdc393cc5d4b431a8b1cbac7285&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S6R6X7OP%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T143557Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDRzKDHBvSAscYZ9FWMCyC0hfk75tuyM7%2Fpdyj4B7RhwAIhAKhXAw8M1%2FZMZMczP%2BEDOxNVtTkvGwODSouUgINY6kmAKogECK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy7vOH%2FYpp%2FYjGrCf4q3AOgh38B3x2bZX%2BPKzxY1h%2BqvsiwWoEX%2FMl%2F9DA5CHS4DzRjty5mVor3n5FqJZAo63HqhtASPfWBo05JT5aocIro3K6%2BxHOvK2lJA30zDJbMUcAcfBkaOoIsrGJcJftgo7FuVbmVdeR8E4bpVLnfvN2kg%2FUPHfpHcjSgC9wIT0j95XcqcLNGIMKU95iqlsB4TOBcZbfg4iBU4x5imF0xeNDrRg13SpRC8LEKHieznp9L4tBMFRv27kTqJtlYyvR4FWHT1tLP919n3783awnaF1G0o1ChqE%2FW0XDXvOOXet%2BkWilk7NLj5SJX4YJv75XdcHMEx6olF3QmS9%2B%2F%2BRPO7HGeQTQCWuGz3mCZeC0pE5hvy6vsxroZ7vyNj8%2FWXQGXRQcxbBict87yTwxsIymss8evcQ7aOtJDGe1Ii514mOf88c4xHUljMyaPwwmKtTGGfzoPS0u3CcFxQlBuVJY7Wmjq8g%2B8PjHdK3M23k60Sm5amxfIts%2B1lNURmCuAJN%2BSYvrN3QOEy%2BMumZExR3aJS6yUcUm9LJRbMAxdPyAl7B3l9%2FBaSk49k7zvuCIRZ5k2YdNSzYQkhd6zfpPBZJ6Sep6H8DdSevJ6GEA6P2jQ8YDfHq27ozLTb4TnyDFGtDCcjrjPBjqkAeBEJa9k%2Fr18Rur%2ByRAcrDmmwpu8s9E2Azk5KC4z4zIdKRr%2FcRxzNA65JPRUv0uuwLFK3pmtiEh99UQ8TF1tYS3piOfTKI0erWLLFBAVQjy6eZjqAAiOwiKa%2Bhd1XXzmNFjskKqK6bhO7%2BY6CTtlaM4J6TD4Q8BWcKlohmxTNiZiuGQlK9M5h4BsLwIgVS0xm9V5W2e65gSd3526RMEpvodnhGMj&X-Amz-Signature=0621b12fa59dd4ec4a57c9e4f92674b2cee6152fd8fbcc9ac9aaae71d601df22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S6R6X7OP%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T143557Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDRzKDHBvSAscYZ9FWMCyC0hfk75tuyM7%2Fpdyj4B7RhwAIhAKhXAw8M1%2FZMZMczP%2BEDOxNVtTkvGwODSouUgINY6kmAKogECK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy7vOH%2FYpp%2FYjGrCf4q3AOgh38B3x2bZX%2BPKzxY1h%2BqvsiwWoEX%2FMl%2F9DA5CHS4DzRjty5mVor3n5FqJZAo63HqhtASPfWBo05JT5aocIro3K6%2BxHOvK2lJA30zDJbMUcAcfBkaOoIsrGJcJftgo7FuVbmVdeR8E4bpVLnfvN2kg%2FUPHfpHcjSgC9wIT0j95XcqcLNGIMKU95iqlsB4TOBcZbfg4iBU4x5imF0xeNDrRg13SpRC8LEKHieznp9L4tBMFRv27kTqJtlYyvR4FWHT1tLP919n3783awnaF1G0o1ChqE%2FW0XDXvOOXet%2BkWilk7NLj5SJX4YJv75XdcHMEx6olF3QmS9%2B%2F%2BRPO7HGeQTQCWuGz3mCZeC0pE5hvy6vsxroZ7vyNj8%2FWXQGXRQcxbBict87yTwxsIymss8evcQ7aOtJDGe1Ii514mOf88c4xHUljMyaPwwmKtTGGfzoPS0u3CcFxQlBuVJY7Wmjq8g%2B8PjHdK3M23k60Sm5amxfIts%2B1lNURmCuAJN%2BSYvrN3QOEy%2BMumZExR3aJS6yUcUm9LJRbMAxdPyAl7B3l9%2FBaSk49k7zvuCIRZ5k2YdNSzYQkhd6zfpPBZJ6Sep6H8DdSevJ6GEA6P2jQ8YDfHq27ozLTb4TnyDFGtDCcjrjPBjqkAeBEJa9k%2Fr18Rur%2ByRAcrDmmwpu8s9E2Azk5KC4z4zIdKRr%2FcRxzNA65JPRUv0uuwLFK3pmtiEh99UQ8TF1tYS3piOfTKI0erWLLFBAVQjy6eZjqAAiOwiKa%2Bhd1XXzmNFjskKqK6bhO7%2BY6CTtlaM4J6TD4Q8BWcKlohmxTNiZiuGQlK9M5h4BsLwIgVS0xm9V5W2e65gSd3526RMEpvodnhGMj&X-Amz-Signature=0621b12fa59dd4ec4a57c9e4f92674b2cee6152fd8fbcc9ac9aaae71d601df22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664YIT2SKM%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T143557Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC8KHLi%2BFNKTxnduV3lKBwT6yBHUR9U9ZvHkNst8228ZAiBUhsCfJGUHDquAWKxl%2FdOzBZso2LJ0%2FCvBp6mVIm2yFiqIBAit%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMMt%2BI8vbGYmiiJB34KtwDcDfZT8Ve5NMKj%2BLRjDa40F1TWWT53BpyT5qYrCB1hzjClGL48saC2iaQl%2BnSs2T6AkeCYkDfkHdkaMNVXAmTnJfetMJOb7yQCAXb0cLdDAFSOViTw%2BIrkd%2B1x9uQ1Sb%2BwQ5crQDf9JAa%2F8sxjrinYC%2BrU%2FKN%2Fq0uxHCGTGs8XoACRFf0a89hVWMngtUoJ5DmOWEFUA8Ur%2FRCGxmvkRdcrj%2BmIjFJtn6EOnoq%2BXCLJntWuKIDZXVO8ZVNhEUkvleGeI1uH%2BZiMKPiIz1WGCxzHWQTQhEOJtOzKB2UkfKVE9SMjqwk9FJRZ4KUsBqc10fU36w3WNWiSxPoPv7eDhFTkYPCtBASVnGupZthrjVixiS4OybGq3naXHHs4NT6thuUdDn6EJXwTsRyt2ZL5D3YNdx6FEUdJDvGuOL0lzl3Qjgq8tQPhjoWU3kR1Q17hDzIM1OO9KspxgYRC0rFJWtcfCHVR1xr6xDYLN9IhcrJNW4T12M6jRuWqVCoNAw3Je6YK5ycUF6Xzw%2F2v1HrUHTafpww5%2FBFZiTG96RnAqSCKblb%2FxXHWA0qXygyJhiupdSMWHp5dB4Ahxtdgialx6dDZvTKC7LwmJQupO%2FAJmoas%2B%2Bs3vtKntaA4merDXYwy%2Fe3zwY6pgGl%2FzA3ZccpPM3duJeFaBzlWekw%2B8fTC0NO0cD2nDzLdQbN0ai%2BzWzN7inUVy9PuGj9OqDZFVKNpNWovkS78axzLEmMQMoU%2BKH6v6DfdT2L8SUli9gYq9Bv6rAFzmjwFqlLpB3OYunip77yyCd0ujPY%2FVKcnHYdaCl4T3vrFZCk2RPDE5IAy6AJXJaE5DwbX9CG6mqXlZZ3q%2B2ggz%2FBsCw7PGp3I6hn&X-Amz-Signature=2d55a9f4784227e7ddd047d97e19a1fdf0f3ba027274d05918c0e1518a6f9c32&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

