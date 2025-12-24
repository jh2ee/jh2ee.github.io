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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TS73GG2O%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T140103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJGMEQCIGoVaT%2Bt9mfiTeAyHjLsUF0nYpJBqX%2FUncsK%2BY3q4kYzAiBhxKOtw%2FWsPJApfW4qdf4W3J%2FnNaIbsN04evNW0K43WCr%2FAwgmEAAaDDYzNzQyMzE4MzgwNSIMrlRBWFN9AFQzii6oKtwDaF8QR8JlIhIMMk2oC6sAsyGI9YkQ0No96yIGjr7l50Fqi0fy172sSiY7ZF03HCmRA7nvob3LoDCN168h7Tnw5UFNVNnsuptVCbc4wIIl%2BRdgXl1dp1YVOkzONBzXBD7r%2F1LjMVenxm2PsUoBSwTxhJChQaoyF7nPEBVdXsfI19DHuLW8Bns2AOhHdIyD7MMOuMGyJBOuFqcOH%2BFtbWjBzD9l2p2FD8vlfN%2FiUeWbqsYkkCbO9nyqfJq8q%2B65%2BR%2BmHmXs1Mj4g9BVzMj7dqk8VMAIQLFJq2oDd1ggmhTdd3koD2%2FEF8U%2B2YxbawDLYg8xsudecg%2Fkc9Dm1LnbWjOWRB4hEUTpPJfV%2FaYrpppD2p9OKexBGkXz9N0E26ou0yYx4ZJr9XJzk7WN2AxCN63GszVMfRsJwBUuEz6G7JfeE7Jhp05Uu%2BYCBb5qV%2BT%2Bxr00ckR2F48Bn62PXS%2FYGzQI%2BA3kACM7lPNHoRhsVAp8j9v%2FS6mSaUKuuLXhb5Kip5OOD1tK51r4kLcC%2BogVa2Dwign3RAWz8%2F6z0ylkidqjW8sjiG0GlFGY0fOn7y1tyLUYN0KnkuLnH7L%2B9gxWxCFhogd4tzByNBHnjWbpjtrkNodBeTcAPGYUMQes3Ucw3tCvygY6pgHP%2B0M35xqi0RFF%2FXk8EPdU1NXU%2BR2G0jjMgfyBVnf4LEIvQwEhnD3slrSbHJXuGnrju8EFhYeSL3RQEQnguJxP0eRRi1CnVFQj9mBni1DcoOhkAp1vUAmUOUj9qSlDXCtcAa9ZYTMh5JXELxyR0BbudZkJlt5ztjYWdSKE1LrNfcGNK%2BruvfH5ukVu7od6YYXJQQOjpbADliCZYLdnog%2FW4vNKkxP5&X-Amz-Signature=143be257501060f5626b7941e7f85e32ef086c6ef6ea018b56b4bbb5950a83ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TS73GG2O%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T140103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJGMEQCIGoVaT%2Bt9mfiTeAyHjLsUF0nYpJBqX%2FUncsK%2BY3q4kYzAiBhxKOtw%2FWsPJApfW4qdf4W3J%2FnNaIbsN04evNW0K43WCr%2FAwgmEAAaDDYzNzQyMzE4MzgwNSIMrlRBWFN9AFQzii6oKtwDaF8QR8JlIhIMMk2oC6sAsyGI9YkQ0No96yIGjr7l50Fqi0fy172sSiY7ZF03HCmRA7nvob3LoDCN168h7Tnw5UFNVNnsuptVCbc4wIIl%2BRdgXl1dp1YVOkzONBzXBD7r%2F1LjMVenxm2PsUoBSwTxhJChQaoyF7nPEBVdXsfI19DHuLW8Bns2AOhHdIyD7MMOuMGyJBOuFqcOH%2BFtbWjBzD9l2p2FD8vlfN%2FiUeWbqsYkkCbO9nyqfJq8q%2B65%2BR%2BmHmXs1Mj4g9BVzMj7dqk8VMAIQLFJq2oDd1ggmhTdd3koD2%2FEF8U%2B2YxbawDLYg8xsudecg%2Fkc9Dm1LnbWjOWRB4hEUTpPJfV%2FaYrpppD2p9OKexBGkXz9N0E26ou0yYx4ZJr9XJzk7WN2AxCN63GszVMfRsJwBUuEz6G7JfeE7Jhp05Uu%2BYCBb5qV%2BT%2Bxr00ckR2F48Bn62PXS%2FYGzQI%2BA3kACM7lPNHoRhsVAp8j9v%2FS6mSaUKuuLXhb5Kip5OOD1tK51r4kLcC%2BogVa2Dwign3RAWz8%2F6z0ylkidqjW8sjiG0GlFGY0fOn7y1tyLUYN0KnkuLnH7L%2B9gxWxCFhogd4tzByNBHnjWbpjtrkNodBeTcAPGYUMQes3Ucw3tCvygY6pgHP%2B0M35xqi0RFF%2FXk8EPdU1NXU%2BR2G0jjMgfyBVnf4LEIvQwEhnD3slrSbHJXuGnrju8EFhYeSL3RQEQnguJxP0eRRi1CnVFQj9mBni1DcoOhkAp1vUAmUOUj9qSlDXCtcAa9ZYTMh5JXELxyR0BbudZkJlt5ztjYWdSKE1LrNfcGNK%2BruvfH5ukVu7od6YYXJQQOjpbADliCZYLdnog%2FW4vNKkxP5&X-Amz-Signature=143be257501060f5626b7941e7f85e32ef086c6ef6ea018b56b4bbb5950a83ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662XANXMHV%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T140104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJGMEQCIB%2F%2Bp63oMX776l3GnZjtZDu8kWyESmpX0AnL9wnQw8JJAiBIX9lqj4M9XYgMi%2BYWmA6EVRLAObz0S4%2B%2Bcc4m06S8ICr%2FAwgmEAAaDDYzNzQyMzE4MzgwNSIMWYJdrcuG4%2BXPjHbdKtwD%2BS3BTcJDAeOqh3i3eY1akEAnNuSwncce8JP%2Bi9h1%2BRBmX1ieWKHpnESJA6sMXj%2F8pOup0HgastFpXeQBjubNemYCNXyWqNnyC6VlZtWih39PDM6AIgyeS7b3ig%2FHrLvRggm5WwCMKNdG7ef%2BWIiZUNpfMETHO8SZIcxU8e%2BdsjdxB%2BJmHMwSU70mI%2B1W2Kb5S0%2FjiK0qcJD8vh%2FgwVbPvI3o9H2bx9a7oYPma2%2BP%2B4mHl9KaoxW6HyKQvqTN5lUjPKWkBKsxUpYtfimrFdmDjsu88Vb7NVgPPa7HV4PqRTotgdu4%2Bkh2gX8bhSrgFlLAcoTvUrVybK1vy8gEfQluqMvtkzquq9H1Rm6agNd3MDpjCxcDTNf0P4jOdM5PmpzYsBeQDFKGLo%2BneJcupqWgTLS9M2SyXF%2FzlQZ6RdWC2JKvHUiKJxl447Cpd2R9SvYxhfdreahoNk70xM0t5LtiJegFbaKkBC5sgH0qp8FWptFexxOb7uZpGnv8YXLHUD0DI%2F99ccv4FHj39rs9B3Ws6x3ux5ECJSWKZz6sJ4pB1m9p1nZuHXfhpwse3bg0LyuwP%2B%2F1QS%2FqHS%2BkC4T2xnRwpH1eKa2Mld4fpumtuktqHIUqVB%2BQUsXX%2BP1DW1Iw6NCvygY6pgF1PrtBrvSFg9czJT34TPo5MsEzJjRUwPHMFc82cijDTfwlZa%2BoAzJBdl1I5T9UWvUQz%2BxFYuUOLLW8SYTt%2BnLFSUlaQuqumYP2jJLo41ViWAUwAx3WYlhSPB4o0opH3GmIRKyHEQ6Nh%2B7xfuu5Ah3AMqojJdNtHUEJX5m3%2BFYx%2FV68ljNHNADVlqGDO6sqyCtEbialEw4w7W1r8qOZxekh49AUbtxD&X-Amz-Signature=8e6f666355bf2ccc54e5e81e2bd4c8596cbe2632dbb748b517453700d4a00051&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VI3OYSY6%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T140106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQCjaeLSA3AFiISnKYt%2FhIfys6kGW%2Bx2IeX7hqKY4PEzjgIgRwmD86Ov3Bh4x3eK4HxyW%2BRjIA0VkgTOUoK%2BRusiE00q%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDERPv0%2Fi8MbYVbMfmCrcA1zYWc1hiqz68%2FznCUyuwPrO0gxy24AfG2q2oJ8kejyYU530La5OX7uu1sBULGgPw6aDO4JnkyfNfllnUDl3IHehH5zAe%2BVfAae5gME%2FyipQKVswFN6mjxTHQVUbW%2BsIGUBATopofAfSjtVtdzcVgj15LdcHHDuR8hzIER5W%2FJ1M5%2FiwG7I6s1qNDovjGnY8IIMn1F%2FX0j7euv5%2FWGh3nqEI5dH4U0eJgnWDLCEoRFEr%2BOu3UD7npXa00Goz9TARIZISwHEfWU2nsY5%2FDv0%2Fz2Gd2dYXsaOAs2HVGaXcn%2BKtd7vmGoYGrkzKP3o3R4QsCWARr1rxqJDq59zFTThonwxov5YgYlOImAQIIj4NIV1jdSj1sgutO9jEz%2B8zMx7s3rFe331bUmMPq%2F7uRy0G7WvCZGLdcO%2FVnjEPRnyScpciWcFdBczk4dUCWuirtPSd1zAp2GwTA47lXmBHpXYOTSOPyhAUl9nVEU4j9yJaOdHs9B8PS%2F%2BaAZ%2BJENvhkpwQFcOYPjbUR%2F0NCcUumk4MEaGMC13LJDSPk48uQVEpfMeMw2zWDsdWgcIQGMZc7EAgtVSkdLPJZSb9CenBCg%2BMELJ2k259ZpRe2lyrUiM5Pbg4msMZwaG8Tr1cCcrVMPrQr8oGOqUB61b3U2F%2BjHhDhmOLCPMbXD8yk5IxWrJ44Sgn6GUaL5ayCVEGxdV2Utl0jHQ62GzqPCYfU%2B0Kxnft42LRbh5COO%2F6fxzYNHzRGZHz%2FpgUA0K0KyRjTLUm%2BjVoE5P%2FK10qS%2ByoX6rumKm2ROB%2BTXI8xa5AFv0i7YDFiF7TEuXUoGJHsRbiqBrfOou00BV2gH3%2FI2GTDJe0uBHK3utlYQqLJQpW9EEp&X-Amz-Signature=95f1190716e69a036cecf27342efa4b42a4c6ed9f1c6660b474f4b7dfd1ad184&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VI3OYSY6%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T140106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQCjaeLSA3AFiISnKYt%2FhIfys6kGW%2Bx2IeX7hqKY4PEzjgIgRwmD86Ov3Bh4x3eK4HxyW%2BRjIA0VkgTOUoK%2BRusiE00q%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDERPv0%2Fi8MbYVbMfmCrcA1zYWc1hiqz68%2FznCUyuwPrO0gxy24AfG2q2oJ8kejyYU530La5OX7uu1sBULGgPw6aDO4JnkyfNfllnUDl3IHehH5zAe%2BVfAae5gME%2FyipQKVswFN6mjxTHQVUbW%2BsIGUBATopofAfSjtVtdzcVgj15LdcHHDuR8hzIER5W%2FJ1M5%2FiwG7I6s1qNDovjGnY8IIMn1F%2FX0j7euv5%2FWGh3nqEI5dH4U0eJgnWDLCEoRFEr%2BOu3UD7npXa00Goz9TARIZISwHEfWU2nsY5%2FDv0%2Fz2Gd2dYXsaOAs2HVGaXcn%2BKtd7vmGoYGrkzKP3o3R4QsCWARr1rxqJDq59zFTThonwxov5YgYlOImAQIIj4NIV1jdSj1sgutO9jEz%2B8zMx7s3rFe331bUmMPq%2F7uRy0G7WvCZGLdcO%2FVnjEPRnyScpciWcFdBczk4dUCWuirtPSd1zAp2GwTA47lXmBHpXYOTSOPyhAUl9nVEU4j9yJaOdHs9B8PS%2F%2BaAZ%2BJENvhkpwQFcOYPjbUR%2F0NCcUumk4MEaGMC13LJDSPk48uQVEpfMeMw2zWDsdWgcIQGMZc7EAgtVSkdLPJZSb9CenBCg%2BMELJ2k259ZpRe2lyrUiM5Pbg4msMZwaG8Tr1cCcrVMPrQr8oGOqUB61b3U2F%2BjHhDhmOLCPMbXD8yk5IxWrJ44Sgn6GUaL5ayCVEGxdV2Utl0jHQ62GzqPCYfU%2B0Kxnft42LRbh5COO%2F6fxzYNHzRGZHz%2FpgUA0K0KyRjTLUm%2BjVoE5P%2FK10qS%2ByoX6rumKm2ROB%2BTXI8xa5AFv0i7YDFiF7TEuXUoGJHsRbiqBrfOou00BV2gH3%2FI2GTDJe0uBHK3utlYQqLJQpW9EEp&X-Amz-Signature=1dc23b2afb07031eb465e369a9c566e4379bee63466b4726a645ddec8398f02e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WSEHYNZ5%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T140107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJGMEQCICbIMApMvVIUckjarxvoJp3z%2FnimsG8VttLLTkPtKeHVAiBdJdBsw53oFo5%2FT7tmnyrVH1EC%2BTGWVfEdOCkByvH%2Frir%2FAwgmEAAaDDYzNzQyMzE4MzgwNSIMyrI1zBJI5%2FYVPNArKtwDn7KtEK%2BJhWPZiF8vZGGz2Yh%2FqaQc5nV1j6t7uAAR4cOirC%2BUCjDeMicFeziuKp%2FsBqi%2BlTYCZf%2B8md5j5XCXDxgfBmd8PU6PMg1RfH4yVTepjlNhY%2BT%2FEM9cclyC09ngJqV8%2Fz5QjyihHRW%2F6ibzd%2BV0CrUXTo9SHinarfDDwEZuz5TLvLeqFBzjjEKfMyVWGTLVwUnMkpfH1n628BDcm5gSHct7rsIHV5%2FF7%2Bp6fESBo68EOSbO%2FpjnYL5E1uTVmcCZ%2FLDVd8uDiW1fpPm9CkiVzA%2F2bVqOYi%2FUcX%2FKuPY75E9wqH8OgI1kT4Cc6ToiSnyLkgu2hVyP188ELxf3ijI8EyegBF30keLAfsFv9JVXBCqKx0eTkW5yJIUBg3BL6VhlbACgfw%2Fjj5bsmIqjxaF4A3zGOQXjxO6KPkiTNUMzthoUEiWWCSw9uOfQ2KJBrUbJ%2BtI9LZbSKPZvU65dy96EWpM0C0EftgZJ6nu9FOk61I36RPU0nuX7ipGqCieMqMXbbiyKjqISF0cOoCjiXbeb26i9mM9aDTwd%2BONplAl0eaBb6JDZWbtMETT39aNfoKapT8GloKz0lS5T19oqCNcctLIFnqfnSY8IwOyzwXsix9p6Att6fElhiSIwvtCvygY6pgF5kxCMs0Y%2F4k5mR6uozU7MWPq7A9vZL1GVMI%2BUsvXPvSxZJOgQM3VIXiH6%2BVdMvckVgs2Pmnhp6ELDPt7srJQL1zQ%2BRjqCxOB6oRhw4a%2BlWY6VGNlWImwWZtVcJ2k14WQojZkUJPsHBXkHPrW4ZI6%2FexwJkg7TXheshgJWm1NxHLDoe0f8n68KdRSZzhbr3TEtakiCk91Cu3hwSgAseeZki9Q5zEIa&X-Amz-Signature=42d8d3e37ac5989230ee4bf546e8d74cc57b0d8c2851512663c9cd0617531683&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QSP2AK5V%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T140107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIGSyxPCaVbQXSBCIxy7PNzVyM07SOE5zOPkyUv9XGxbBAiEAxoZEW3iEhwtgqCnrLxowWlvF5Vmvjij6DkDSN8Aw5zQq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDN09Dt3tZ87CtXekyyrcA6EOFVMQeqdUGYQHEsxMWnDOdD%2BRWtl3vQy4C3%2FpCPCbx0p0F6jB%2FcFpoZ8Nj%2FT0ZgfuXNAbe5rltZlWHYE6HF7PYUwtTljl83lMop%2Bc1D6EB3as%2BY7UwpwlLHbRlOhE%2FiwxO3GoUjA412zqVWwQbqKWfjn9B3%2BkV4Jn9nn2AFkHFwI2NPMfuZ6bUDYPnNgVyZ93vT42rz8cle7C6PBeo2UQdA23iMcozW0bkaX5MBIIdkXnilVKP6L38hWs2cs%2BjJbD9pn58JS5UBBzsIQcjlAWsZKJMKBZ2BsLT2WmK3QZ6Zbo4oDdSn7MYlEGQcxPAtG76M8koqb0MqQiUsCA1ker7%2Fd3M3kYyfAtbz00OZS97ZA2VysQTqAgfeIODiIupFi8CJ9CxnZV0yk0grdUVwTTSzQm9h%2Bu65LqN0Qu2HsMzcTkNMcchhQRryQocta%2BkrdbFY10w9VmjBloitB7ZXP3ScdMQSFoipCbDez4DuXAMkHQbmog3Bmr7DnAa%2F8y5oDsKl84QQwMY4DxT31bmjtAvKprUrtpi1lcGM74yn5JqUKi0tSi0Oqh4D0RdxCwoOMWn2qt9M9A%2FDhinXHJ6FYi%2Fhx3kXYXv4eODdnaOhOybI6%2BuwefwGkIAuLCMLLRr8oGOqUBQCF2pNInVQfmEU7g69HqK9pMn8y2aXwSH7xMbNwgAcMg9Twm2hyHe0xfw6QUNL3zyCpUbc%2BH7ykrYkwWekBMMS4BwTB%2F7ACBuLtciGPdhRUwtnyuL6V75zINNnEBtEeMtb8pFlTres5DG%2F15XfRC9D2WsRvim7o7kupeuYtKMiZZjiogm5bY8GRIDe4NUMF5C7PTKVWYzV2ebliOqOu2ON0%2BgdDt&X-Amz-Signature=aa99246a28dd233e80d51d2fec266f1880286ae84d46f8bc6b14c465f646d1e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XEU53UCB%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T140108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQDRZz08lw4UTFYkf2DClJAz2w%2Br5dXyk9mOOkQcrlC1WwIhAIHIdZ%2FGatI1BwtcvwPZOt%2FBiBUB65yVJbkRCVA2%2Bzl0Kv8DCCYQABoMNjM3NDIzMTgzODA1Igw4NT8sHEFaNL%2Fb3%2Fgq3ANsI7shr%2BMBa9lNQnAgY9PpQGL6YMLZR7VhEFu0HzdD5bWhIdGLdtQY9BA0nBIuQFf5ZRTwp2FC8w%2BDkZSkMFfGkcEKGxlaBIu3C2L6Xtb7zMxf9cNpP1wssnnOTPmVvHY3U0ipihDFeJJ%2BXoZCulFrx9MVMFnbXU1mIzWhCaXSGyzP36xzJv%2FqGMH%2BgIk1xbdaritXkV8NZ6pwe833P5wCe1X0Yu%2Fd3WbSDHrYigeqFpQ0Ev4%2FgRVeBbcXAkxCG4j9MHv%2F%2BQcf6nFWxAqfo2mVoA6eAtH7lefm5MisOc04O%2FSOwW%2BeFGiFx%2Bbods0N8okcHR%2B5P73LrDLXTRGCHh9NNwh%2BnxjgZjGH6OwdC03yKpfmXeGd9DukRz3mjivjyK%2FU90vr6XHSomkb9YO35jM%2FPyNQzm3EAzrouIzggTMEN%2Fn5bilbzyU6Xuta4BKqtSj37ms56U%2FOjiG6nFEqrGwN%2B8%2BqFefTxyuCPIOa4FosFtJcfGPm97jF5CN%2B0Qze5Du6vkQn8I8bzGWJn3RNioPGGwedUZ81JexvtSR2Cl6ajjtvGX82oS%2Fn8%2F9kFxBUKgA40OIsm2HW46MkHbNnv8DpCpcV9XPlh5AhLQjRemtgcfCYoJ3nvwQbLfGgHTCK0a%2FKBjqkAdVIzjdQsRba2mi8oWz84CCJqF%2FUlnDEdjLXeTOa9EcUQMj9Fbi3Nw1QzAx5Dp3l9zTyrHBoZxJfBJp%2FAHglfz2jg3X6jM6I%2FfwuI%2Bfjv988YMNyGmeiwBChqDV6sceOA95jqw6%2FFq6X2AZSqUtZDSXPSg8EIL%2F4asIFFh0b%2FTx4XrkWANZl8pJ37CWCCoAxq2aCv9YaeNzfRMpJaqlF%2B5Cl%2FG0V&X-Amz-Signature=713429145bc5970cedfcba70dc422e5a1a8b23503b19353cb494145815d9c1c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T55YU6TW%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T140109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJGMEQCICSAgLo3sa1RljY%2FaPydemrKf0gs6u1QTEuqEPpOwNV1AiA89FUpwOtSSO2IhhMKFAkLkTUadvzLttWsTVDNgPNVPCr%2FAwgmEAAaDDYzNzQyMzE4MzgwNSIMe2MavmXWNtIZFYfeKtwDAKWbDrpnMeU31u%2FPkWULdQT%2BRbJ95OW4YfZVZfRmnWxe8riB5p%2F%2FFKi4I1zRUA48olZmrldtfBX3h0uimU8gmwfxBWDy1aLb97Dd1dk1bICNDyNi8vEzfrOLbPW3ozT8XFyd9rWqkuOoa42w%2FDYmyS5OrWpndwne8158iC%2FA7TF%2B4COIU5Dhw5tedo%2FinuWgx2swycuIE4zvJtm1xCA%2BHL5Krb5Ol5UOaqlhxk%2F8g2q8p9kmNedsnmsDm7MyeLs0LdrF4PmRSXmoabx%2FbRK5IJjR8cjoSP3EIgo2CfUS%2B0NkCIatrkR2QWQQh1sc%2BBxKzDIoeCkYcWdlLO6ImaX6esJYWulV6b8JCYvC4acuIk6wmvqPxBdwu9Js04INKZfHu9oAB%2BJhebQXigUZdQP%2FI7XJoPIsE39eJz1fbNkklDMun%2F5IefwUSnFMh1fu7akKXLzju4%2Fd9qIUsPt0R6%2B5mYGeC%2BUEFnblb%2BhVN%2BGnbfsJEydcXDOhtZlcixCeZShcLcL7faSOi0fs8e%2Fys8I10Vb6ZoeNXVkR0FzXlfNEGCpdDcluq%2FeiwsnQfufnZQkZk30ChLbr1a5ATv3%2BOugT0iOuXE143XFuSxQlhayfNyyVUme8jS7D5Vv8lUwwitGvygY6pgFUlJ5Erh44JgutDHhatv%2B7fKXiq%2BXoPIbroXZiP8B7UjV%2ByTQWh7j52FuDEUEPCk3hJ1B81q56drDfwGxiMCUaPJJI9uELKz4UY78hW7lxvQoUgqDjTx9Qc5nyA7mtwHHySJCgm9P4GwtEZ5AvwAIT%2Bc5GPHqwXNKT62rKmH9sh%2BAYSJCHPJAqa6Felj0vE%2FnAAvFl0SgUu5Dc%2Buy0TiO7%2BSSefBPP&X-Amz-Signature=afa97c48462faf49575051c304bbe33e83d6f1d3ec256ee8169aa3286ad9330b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T55YU6TW%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T140109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJGMEQCICSAgLo3sa1RljY%2FaPydemrKf0gs6u1QTEuqEPpOwNV1AiA89FUpwOtSSO2IhhMKFAkLkTUadvzLttWsTVDNgPNVPCr%2FAwgmEAAaDDYzNzQyMzE4MzgwNSIMe2MavmXWNtIZFYfeKtwDAKWbDrpnMeU31u%2FPkWULdQT%2BRbJ95OW4YfZVZfRmnWxe8riB5p%2F%2FFKi4I1zRUA48olZmrldtfBX3h0uimU8gmwfxBWDy1aLb97Dd1dk1bICNDyNi8vEzfrOLbPW3ozT8XFyd9rWqkuOoa42w%2FDYmyS5OrWpndwne8158iC%2FA7TF%2B4COIU5Dhw5tedo%2FinuWgx2swycuIE4zvJtm1xCA%2BHL5Krb5Ol5UOaqlhxk%2F8g2q8p9kmNedsnmsDm7MyeLs0LdrF4PmRSXmoabx%2FbRK5IJjR8cjoSP3EIgo2CfUS%2B0NkCIatrkR2QWQQh1sc%2BBxKzDIoeCkYcWdlLO6ImaX6esJYWulV6b8JCYvC4acuIk6wmvqPxBdwu9Js04INKZfHu9oAB%2BJhebQXigUZdQP%2FI7XJoPIsE39eJz1fbNkklDMun%2F5IefwUSnFMh1fu7akKXLzju4%2Fd9qIUsPt0R6%2B5mYGeC%2BUEFnblb%2BhVN%2BGnbfsJEydcXDOhtZlcixCeZShcLcL7faSOi0fs8e%2Fys8I10Vb6ZoeNXVkR0FzXlfNEGCpdDcluq%2FeiwsnQfufnZQkZk30ChLbr1a5ATv3%2BOugT0iOuXE143XFuSxQlhayfNyyVUme8jS7D5Vv8lUwwitGvygY6pgFUlJ5Erh44JgutDHhatv%2B7fKXiq%2BXoPIbroXZiP8B7UjV%2ByTQWh7j52FuDEUEPCk3hJ1B81q56drDfwGxiMCUaPJJI9uELKz4UY78hW7lxvQoUgqDjTx9Qc5nyA7mtwHHySJCgm9P4GwtEZ5AvwAIT%2Bc5GPHqwXNKT62rKmH9sh%2BAYSJCHPJAqa6Felj0vE%2FnAAvFl0SgUu5Dc%2Buy0TiO7%2BSSefBPP&X-Amz-Signature=aa08d2382ac7de37161d4543020b75604901ce407d7ce2337bd7be8f971f5b30&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMCI3GCW%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T140059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQD0O9cjkU3A15%2B7Db%2FEsCRNbvCvV3qiP64Iwgcm17vngQIhAK8DS20nQA8DmOUuY5gl6jfXiR73kvaKa%2FVeEab7ksYIKv8DCCYQABoMNjM3NDIzMTgzODA1IgzLJODIKK65vLWixuwq3AOBptcqnP3g2Y%2F91nLhMlvPUN0s0p4VTjstwkLq9vnS05YVvXuyJRiOJEeO7GAXFUk%2BRXHJ3cq%2BP9gUxen0OwZHCTYTVEPagpiOGeTKsHKDk4je5Ux4nO4cCMoykIJ3dQ9nk4Qc%2F6YeaTgQ9%2BWaccJW3NueSa1d87rzuoKmscDZJFFoGGjDk%2F%2Fas0j%2FC1BEnoRrI8OYgSLjDE7V%2FTD5aGa2gt9s2sZh%2BWUP4hQEWmRnm%2FTGiqf5XS0JCqIz9KNvd65%2B9y0TdjldVDxL%2FJCtwCbufAdHUyV5Va4PtO8AwAX9gPUa78Qhie0FxzRXS7p87qNW8S1yeMyfGzlVrqRHB94Mu8EgZ6wJcKAObrXpMPu%2B3%2Bmi787yzEEEE30IrkcchS0Hpfn%2F1o1IEy1sPxQRS2v6%2B5psPGrSAxj4bP2YPhX2Mui1h5yGzPIt2Sjog5EhSzuIRW9cyv5XACrWku8h2hr%2FECPS%2ByxA%2FgT98heWxuSp0Plg%2BpBqy5BePTtm%2FpoMx60VsceFxS%2B2PdLear31HcocETLFj5AvWoEwRfyp5Z7AtPNGgBOS%2BeXv%2F3%2BFeDB7c6kCsUja0vj2nokuDpNxMxAdxBWE%2B9ly1hH4vjDUoxacc26nW73CC7H4LenXPjC30K%2FKBjqkAfN98kfFx%2B2enKnId9RsYurB4MT6%2FsdXnA7eeDPm0b5Aen4nEuESPBJqvaBvlUi3Kb8TqcS6V%2FxIRZZKBC3KRhy1eGI9y9iD6ijcmHbUooYxXDZJ2ihLutvsL1r2HO4OlNhtm2EvyfntzPaMB98KZv2KoBTYIsA2fZjPW8ZWL34CnXrVgI%2Fdo6bCh%2FTaVEMDokxbiu2YSNh6ip%2FbnyLkV%2BqhCpO4&X-Amz-Signature=04d6a6a70fac79a7e7cec816bdc678006111ec98a2b30e6aafdb768fe6237652&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDGQF6J2%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T140119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJGMEQCIFgWhcRtksBqCJ82hoETerMtUxyIn8t%2BI%2F4BFLmQW603AiBGxOvH5EwzpTVw5gPc%2BcgQsmjNlyPxr%2F5Y07ns3RSu%2BCr%2FAwgmEAAaDDYzNzQyMzE4MzgwNSIMpm5dwCgCfsobSokSKtwD%2BhklXBbJB8NKgmAxcKA1MSBINyptVM65Hv8fatHNiepcE3e7GKmrOVG9HUjtgVyrhgKtJtz1DT3b4PJFKsPWXKsuy%2FaoN%2FvCP42X2PSCNDTr9BV4OOgLsdiysA9ZBCvuEB6%2Bro9%2FbVGCSce8v6OKjWzHaZj9ava7SFGB6tjRc8fdD85OtSfzBxzJhmWtss89Ya1wwGE2HwhpbiXzpusRvBOrAcqQgX0qalyR3HLXTdyCsOyB3AIgIGHomyorv3YbWiuAJBgJQraLEgN1z5hfByMGkb%2BLd1tmIORPLC%2BrZXqaaRB7zbdtBmfFNnYVRaHR4Px92S6GErHktdTTVGnyA66mqtzK53xRYkaFl2OSyaYwDVGlF04sjWOOTiwm9UfabQoiElmBd26wvtLYMjnVVzUIIsXD4l3HS639W%2BTGVOlB%2BwaDB39O4x%2FMr4EGHRc%2F7GmOZTUl%2B57nksaFgsB26Bu7hTvMqZb4acuX4XtxXs5775%2F1sK4FTvmMielV%2FjaY5bi5aMmefKh3mum8m6eMONWRiyLJ37mDYRh1bAVJvheb0ekwb%2Bmg5RETAfOTiVzPD1SkGcnqqBMZmU0ss7syShF%2FUZx9h%2B0cUPficERvNzVBfOvRxKGQTB8BTFswsdCvygY6pgGFfASmeb9zFBU6svJBVYJVzP3G8HB0QRa8alGbkajpTmhBiokuuYcxR2JtJ%2BoRpJGmP9NuO9HexEvUF%2BkO1KdHIzoVGltSCXCSRbtlILXLsBnz2zckHfX888m1a977DLW9Nyy57JlRCqeWatQZuLo77Ct5JY6zC%2FsZIYRi4OwZM2xt6YQG6nxlnnGYQQZShzcgwkcSCn9giekIBqie7a7hSx3MUOKk&X-Amz-Signature=3e0327c060058c85e7a0fda0b6ce8f0c2d88cbb6d83d1f19c19728c0cc55d420&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDGQF6J2%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T140119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJGMEQCIFgWhcRtksBqCJ82hoETerMtUxyIn8t%2BI%2F4BFLmQW603AiBGxOvH5EwzpTVw5gPc%2BcgQsmjNlyPxr%2F5Y07ns3RSu%2BCr%2FAwgmEAAaDDYzNzQyMzE4MzgwNSIMpm5dwCgCfsobSokSKtwD%2BhklXBbJB8NKgmAxcKA1MSBINyptVM65Hv8fatHNiepcE3e7GKmrOVG9HUjtgVyrhgKtJtz1DT3b4PJFKsPWXKsuy%2FaoN%2FvCP42X2PSCNDTr9BV4OOgLsdiysA9ZBCvuEB6%2Bro9%2FbVGCSce8v6OKjWzHaZj9ava7SFGB6tjRc8fdD85OtSfzBxzJhmWtss89Ya1wwGE2HwhpbiXzpusRvBOrAcqQgX0qalyR3HLXTdyCsOyB3AIgIGHomyorv3YbWiuAJBgJQraLEgN1z5hfByMGkb%2BLd1tmIORPLC%2BrZXqaaRB7zbdtBmfFNnYVRaHR4Px92S6GErHktdTTVGnyA66mqtzK53xRYkaFl2OSyaYwDVGlF04sjWOOTiwm9UfabQoiElmBd26wvtLYMjnVVzUIIsXD4l3HS639W%2BTGVOlB%2BwaDB39O4x%2FMr4EGHRc%2F7GmOZTUl%2B57nksaFgsB26Bu7hTvMqZb4acuX4XtxXs5775%2F1sK4FTvmMielV%2FjaY5bi5aMmefKh3mum8m6eMONWRiyLJ37mDYRh1bAVJvheb0ekwb%2Bmg5RETAfOTiVzPD1SkGcnqqBMZmU0ss7syShF%2FUZx9h%2B0cUPficERvNzVBfOvRxKGQTB8BTFswsdCvygY6pgGFfASmeb9zFBU6svJBVYJVzP3G8HB0QRa8alGbkajpTmhBiokuuYcxR2JtJ%2BoRpJGmP9NuO9HexEvUF%2BkO1KdHIzoVGltSCXCSRbtlILXLsBnz2zckHfX888m1a977DLW9Nyy57JlRCqeWatQZuLo77Ct5JY6zC%2FsZIYRi4OwZM2xt6YQG6nxlnnGYQQZShzcgwkcSCn9giekIBqie7a7hSx3MUOKk&X-Amz-Signature=3e0327c060058c85e7a0fda0b6ce8f0c2d88cbb6d83d1f19c19728c0cc55d420&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TF5QDJB%2F20251224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251224T140121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQDg9VgjR7JnK68rMLMmydVXdOJsuJ8VxXnFd9hA%2Blu5yQIgGPpcvjwszq%2BHxmQqqowvPxqlP5h09aI6sN93G7bkLrwq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDF1x28ujfDUSxvFLyCrcA%2FgwPcR%2FoDPup0XY33YOIANtgDisQ4DTInHTrYlAJcpx5gCCDFYKwl726%2BFkFHavjPysizZr0ZBM%2FtVhA7IQNIGjzbzUW0OrhQOT3gW%2BRBhKuvVHvBjFZA3TahM7JKj9JEQSMXG3edGcwQZvpNkp0VWG0t9b%2FD%2FShqZi7EBo63TfRgIILqaAUsrKfUtLPoinWfQVXNzFG%2BhpqhzTHU5YN72TrVvOI5I11puSs0NzCYE9NtP0qSAq%2BDJe6Eoi0%2BTy4ZCRG%2FJbbBLIBQbG4dzMBFgoD%2FR5LwqiYPOKePhOdux%2F%2FulhX1e2LcjBioCqrHaT2kiaycqE%2B9%2BFEpcnrAegDCBXou0B0XXjgObM9opMQbRVwPc%2BFSQ%2FGggJYcWMHVnwVhhJxjeSl9KWVe9qEuadL40E2QKurMoo1XukwCsuOYroQijH99101gcc%2BFzIr0JRLqDU3aprEJrS0PRcOilUgq2%2F2mSOvJs5kq7CVraY%2B951ig64MKA1QnmaljtNvXNr4bZWUuR5Sx%2F1tNBGL6s4E4vUDgy%2BioELqFi30HS8VzOdpmZtxtyGCWz6N3tEtAUfQTbSz2%2ByAMbAEpy2VbrZdmS%2FqwbjtqOiPI%2B0LKTY1VrFPLz9DoPXI%2F%2FO6ajQMI7Rr8oGOqUBeZvTi%2B7isMM6EUeffacMmHEv105G0cx3NgLFPdNsP%2B%2BX1HzMwGnZqBf5VaZwsR0jigKCUICnz7erb7%2FCB1s4sRMT2P3TyGd5ImZTruTUcchOOlEA%2BrO3J4Hz4qfrEFH0MCD1UUqfmwt%2FRWXbsH45IVf7Sg%2B0STlQfBtRckVMsjlXV2nJpoiB3jR%2BAaKeB8Xhzs0%2FTEtNigrL4eGrPhJX0ENPFqOa&X-Amz-Signature=37f03014658664d9dd1bee535a7cc3994be78b4efd78ce197ff758f5f50c3c26&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

