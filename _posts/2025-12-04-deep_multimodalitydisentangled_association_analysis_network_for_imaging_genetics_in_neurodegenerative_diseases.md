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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QA4PYNKE%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T122903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQDOnCHyLbFsq7wY6z%2B%2BDXhF3LFp2okixG6BXlSMhMRx8QIga%2Fig89LPTihhZ%2B%2FHlk5YkvBljOqaQbXE0jgbceJmFpsq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDNNn4yimxoBahAgxIircA2uboV%2Fdy%2FVWe01McMFA%2FzScc2tz0E8rvUUTGjaXBQEY4nTik8L72IQ7b4QI2NbNGaTWqkigFiqbRleqXMojUmZ%2FrFnftMmxk62J4kxx6oTL41bZsF3u2Ac%2FDlj%2FDRZxwgU%2Bc06s%2FyRq8rZEsIIwGn5A5Rb85bKvTya4BvFHSI0J9aOeygIFnsPe3o5oesP4dcdF7EIffouVizdYqEDUDsbA53qnpKt94dVXmS%2BirIXZyUudobg0F19RmDKpYHCIKHUojl3G42SjEXI4s8FDeSduWk1lZwrOPHBBtQpqbG5%2B4%2F0TMY6km0OvOhcxTSeblBtiLeDDw7%2F%2FwLssfwSGwOaRx41sosTh1H8myRy%2FtwfdRfTIPw2amjATJEF4R38WFl1QwV6T64fno7IfTsQlO1wdZT%2FkepVcD%2F8JVuQEaiHLMikpodB1Z%2Fe1qUFG7UR0TvW8NQ%2BZiKGckNUORkO9VMqvcZdrLjFJgMxBiqp6OdE%2FpDmVbAgqyd77BLtlqnYhgKJZTSTPRAvHhIy1RvFItoEIByl52ws%2FjsWDORkOePLwD8Fnfahxezj44PgAMTxR1b7DLcT7zvkxJeF01R8EZ7M%2Ff%2ByjEGxD9Z6dO6p0vTuCd19AcIJqwVvXfXBrMNP2kcwGOqUBZGB4nvuwRfmlqczibC8ha4mPvB7PXciynxQnpVKdvmWMr7Eqvtk%2FcIaCfNrC6r8%2BcbzKvzyDw3Xb1VUfy9RvFVwqntNshuWn%2BGtKBjagzaUDPXb%2FmCE%2B02CCzXGKfvb9YfhpNfSEcJcHiAd4fDgpf4WVn8QdJGIv%2FBc57VQTBDizyeOkjcVprdt9w%2Bp2ZJRDErAuzEkNgzHgRdo0Qh3qXkefdoRK&X-Amz-Signature=d5783c524e72df1e9b51e1d6481dd6cefc58c697cc76a103991aabc1fca878c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QA4PYNKE%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T122903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQDOnCHyLbFsq7wY6z%2B%2BDXhF3LFp2okixG6BXlSMhMRx8QIga%2Fig89LPTihhZ%2B%2FHlk5YkvBljOqaQbXE0jgbceJmFpsq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDNNn4yimxoBahAgxIircA2uboV%2Fdy%2FVWe01McMFA%2FzScc2tz0E8rvUUTGjaXBQEY4nTik8L72IQ7b4QI2NbNGaTWqkigFiqbRleqXMojUmZ%2FrFnftMmxk62J4kxx6oTL41bZsF3u2Ac%2FDlj%2FDRZxwgU%2Bc06s%2FyRq8rZEsIIwGn5A5Rb85bKvTya4BvFHSI0J9aOeygIFnsPe3o5oesP4dcdF7EIffouVizdYqEDUDsbA53qnpKt94dVXmS%2BirIXZyUudobg0F19RmDKpYHCIKHUojl3G42SjEXI4s8FDeSduWk1lZwrOPHBBtQpqbG5%2B4%2F0TMY6km0OvOhcxTSeblBtiLeDDw7%2F%2FwLssfwSGwOaRx41sosTh1H8myRy%2FtwfdRfTIPw2amjATJEF4R38WFl1QwV6T64fno7IfTsQlO1wdZT%2FkepVcD%2F8JVuQEaiHLMikpodB1Z%2Fe1qUFG7UR0TvW8NQ%2BZiKGckNUORkO9VMqvcZdrLjFJgMxBiqp6OdE%2FpDmVbAgqyd77BLtlqnYhgKJZTSTPRAvHhIy1RvFItoEIByl52ws%2FjsWDORkOePLwD8Fnfahxezj44PgAMTxR1b7DLcT7zvkxJeF01R8EZ7M%2Ff%2ByjEGxD9Z6dO6p0vTuCd19AcIJqwVvXfXBrMNP2kcwGOqUBZGB4nvuwRfmlqczibC8ha4mPvB7PXciynxQnpVKdvmWMr7Eqvtk%2FcIaCfNrC6r8%2BcbzKvzyDw3Xb1VUfy9RvFVwqntNshuWn%2BGtKBjagzaUDPXb%2FmCE%2B02CCzXGKfvb9YfhpNfSEcJcHiAd4fDgpf4WVn8QdJGIv%2FBc57VQTBDizyeOkjcVprdt9w%2Bp2ZJRDErAuzEkNgzHgRdo0Qh3qXkefdoRK&X-Amz-Signature=d5783c524e72df1e9b51e1d6481dd6cefc58c697cc76a103991aabc1fca878c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RTIM5YOG%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T122903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQD746jefRStBHE1UgxjEcYeWbSMPe%2FsabHeMC9CYqAsOwIgZNBKhXuQQv7B0qwK2i2Mzt8rBlBpUp1IBze6KRhvgtwq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDDGCjQPscHnI4ABnbircA254YNeROetUtWsPHtJfxAzTpV86wSu06o0790KgZ0TeIDl6UhkuA%2BboWV9S1MBbg7RagJAUKFdpU3oJ1YB3%2FOdoUNyTjQ1bUgwul1R8IRIZY7ogfWeSSeWdySrzPnptN27iQtFfrPvcAQtzKPe%2BHcsb7EA4c5OyYA6a0dNO%2F1DjsEZC1Azc3rMbRJx1SjUSH2ADH%2BYLL8nbpwyssl8R%2BVTcQeAuzf4ynh1XiSDeMMkqlmMDnSzzgOiisJvQDuzy5M9tCJGaBduSiF%2BdZ%2F%2BRnSHCvNDY66h4pdnSQlhO6DXdaVXNa9ooemBUAleMRus%2FDxuWWZjjoOmK8lKOAvLzziJW1DgM6r%2Blt%2BupvmK9wl8duvdvnpXlZygp886qXsUTDAQOMZELE7uQx%2BmXmma6cba4%2BrOqumwWYc1S%2BXCJINwcWEvZ3dV3DK2%2BFH9pU7wjYNtUxw1iluO9irAsBth5B9vDRwKV2QhKX6egvVsWQAqc%2F6LWSydbPBKX2bji1V5V6jSmMqISR6tHLiik05mr9Owrq7khii5iYILGkxL2ogrbqljdGZNxlqKV%2BY%2Fs1RjQzXlgcJTg%2BmyRIMcLYCmRPr9dAHXk2sVAqyDeCtfH%2FC967yoCu6hFIBPcArL4MMP3kcwGOqUBkjnVS4dvSXuYc6erpuh7PjbYxjO2Jp7Wu0qIc2oKNOspGHhNuyjAEyd%2B7%2BLv4hk28ED9zYsEpmQumQvbPpKeleklz%2FT4vzkBZOdqtDgOKz46ZHhaZMnC3028pMklNAxPZbmJqKxv8BJqyJE%2FgPZGR673cyUVRsOJFkbgas3vFAjOeIwEv526b48nqenspu5VM%2F2ik9S3UhhOAUk78iL8u%2BC0vkn2&X-Amz-Signature=3c92cd744637df7d65a48a532e5e6f46749a1b973afec116e2ab3dd6b8a81264&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TY6R3ICO%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T122909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIQCiz%2BeCqacURX8N4SwkidMpVNP28omDOgAjRUoFax60vwIgFWDs%2FTCSO1xIjIalThouCFdGNhQs8ATUnSf2fvEOGSYq%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDNn8Wl6t3NF6yMWTlircAwqeNlK7rmhKCNPOXYIEZV%2Bc4wfB%2FVa2n04Iq6qvViwY6AeK1maW9oPy9jy9VFW%2FDOcJaf%2FGeyPutar%2FhyNB7qBwjkLRW9qWODnIMDIB4je9Ml82GE0kFmdmZdywzA6MtPJR2CJKaQ66Uxpq9UyQewUirpH0z1s5w7N8sRFMkhtHrKpOqHy43Bk4fzfp%2FoxZniueCqmSMM7VQv2sYmcir42bsFQgtif47Nq9SDzj6iliqMtlsnxaq0gtnTxcsOI5GT9ycKUnZtWmRm18zZOyaI0%2FCn2%2FBzEEKhpA9wSd51tyy536BQT5Hu%2FCVRnTO5vBMxbH1kZD40OOXML7545Y8fnbjwPJ38zZwzVBjX%2FUUO1281lRljXRiUoZ3BOp%2BVzlTUAR0HBUUJu8AEBG2C%2F%2BY1zNg7rAcA8OL%2FQV6JBV%2FqVQ3hIVM5Pw8VIXu5%2FHbwr0UCoRWH6djFDH62Ydrn4xFqEBulAvTT7cofJXR1xC6OZhHr2qH8i94bc53isFMtgBBKfnU2VqgL0Vh0A3d8qXdWdMH7%2Fia%2FYqmDY5lz6TV%2FMmGthhLzn1kttuGaTLEvOhi9pWHMVMi%2FbDRgxy8gddU7ud4FumHtPtCwL9%2BaBVr%2BL8bNP7TLLYQ2UgDh4MMMOZkswGOqUB2Fz%2FiA6FXNrn5ZtyxlLSpBgCXbJz%2BSK3cVEewzaqnucpVeBx3aMW68lFjpoa4KbjyRdM8SxsN719W4wnT%2F9U7XLR2BiHe%2B%2FGecu0hK8GJadAQy5xgyhdhV23jPgSf%2Fwod10%2BgnbsRut0Doagp%2BLSPcSNCsSKdTHsFRrI3kq%2FTi9JDqzG9ho9HRuSYo%2FlTfpK06y%2BwrWBIc1pQrf2wOMEYOaiP3Hy&X-Amz-Signature=78051105e180d0852bbe227acc2303b61cb9270eeb6d199fcd064e7f3e940015&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TY6R3ICO%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T122909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIQCiz%2BeCqacURX8N4SwkidMpVNP28omDOgAjRUoFax60vwIgFWDs%2FTCSO1xIjIalThouCFdGNhQs8ATUnSf2fvEOGSYq%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDNn8Wl6t3NF6yMWTlircAwqeNlK7rmhKCNPOXYIEZV%2Bc4wfB%2FVa2n04Iq6qvViwY6AeK1maW9oPy9jy9VFW%2FDOcJaf%2FGeyPutar%2FhyNB7qBwjkLRW9qWODnIMDIB4je9Ml82GE0kFmdmZdywzA6MtPJR2CJKaQ66Uxpq9UyQewUirpH0z1s5w7N8sRFMkhtHrKpOqHy43Bk4fzfp%2FoxZniueCqmSMM7VQv2sYmcir42bsFQgtif47Nq9SDzj6iliqMtlsnxaq0gtnTxcsOI5GT9ycKUnZtWmRm18zZOyaI0%2FCn2%2FBzEEKhpA9wSd51tyy536BQT5Hu%2FCVRnTO5vBMxbH1kZD40OOXML7545Y8fnbjwPJ38zZwzVBjX%2FUUO1281lRljXRiUoZ3BOp%2BVzlTUAR0HBUUJu8AEBG2C%2F%2BY1zNg7rAcA8OL%2FQV6JBV%2FqVQ3hIVM5Pw8VIXu5%2FHbwr0UCoRWH6djFDH62Ydrn4xFqEBulAvTT7cofJXR1xC6OZhHr2qH8i94bc53isFMtgBBKfnU2VqgL0Vh0A3d8qXdWdMH7%2Fia%2FYqmDY5lz6TV%2FMmGthhLzn1kttuGaTLEvOhi9pWHMVMi%2FbDRgxy8gddU7ud4FumHtPtCwL9%2BaBVr%2BL8bNP7TLLYQ2UgDh4MMMOZkswGOqUB2Fz%2FiA6FXNrn5ZtyxlLSpBgCXbJz%2BSK3cVEewzaqnucpVeBx3aMW68lFjpoa4KbjyRdM8SxsN719W4wnT%2F9U7XLR2BiHe%2B%2FGecu0hK8GJadAQy5xgyhdhV23jPgSf%2Fwod10%2BgnbsRut0Doagp%2BLSPcSNCsSKdTHsFRrI3kq%2FTi9JDqzG9ho9HRuSYo%2FlTfpK06y%2BwrWBIc1pQrf2wOMEYOaiP3Hy&X-Amz-Signature=930375e4e382f6916eb3955f130147369082f7ab6c67531d9f5ec9fc58ca1579&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46676H5BBG5%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T122909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJIMEYCIQDSst5TTPuQLvG7A9%2Fbf3DHOsz%2FvdFXLFVNWJoZGSx7qQIhANGmENeq84f6isWHzbpRk8dxJGwGY6DOWM9aBzESfqpJKv8DCC4QABoMNjM3NDIzMTgzODA1IgxkHrmwytF%2F0tvjLF0q3AMHu1v8PBTrtLT4yPkKlsZGf%2Fqovde4IQN4HMQA69FVwHaTGo2%2ByK3Zk8vvXHuzstx1QKnmp8cfOgfTDfxsRufXd5RQj27csAG9SoTYzQo%2B5E%2BdfkUnh9gCgXR611c0l74hyMVikvYxl3StycD27QWO3UaBXNHf3QgIXIL0LpC5s2CQqZU9x8ix1q7F6ovh2mg8uts97IzzPyOGUlA3olgbiNQRSLQlUDD08TETIb4cglnKivMQxECF%2BmA9%2BKofCcj7FixOZeBw8sHQCtoHw4eM2PVReSrBoGrENlFJzxzTGMMrRyop1kFuH5hmJwDbpVupc8hzAMpjwrBXriPgL05a%2FGmWHhwNU0TcwtSvgXt974gTTitf1ogpjTLvJ6OQ%2FpGqWN5OLhkaTdLSJ1rALnixgqyLk0uP%2F4bfQWHpQsusjw%2FlcbiQrvlm5honZpOfZt55Ywl3ylJ7AqqrSGHkDt9C%2FEha1ZZbG1uzgY%2BTAFKUXFIQNhoh%2BvS%2BSrBxY3TTkW2I1J%2FZFRctZm1BK2d7pEH%2BuO82QRp0M3y8JvwDB67Ze%2BljIKMDESLd8%2BYXROWYrSiZlT3wyjgBThC%2BxHsyoJV1hW57RtC090CCcCUxizO5APyZNLpqt%2F7OBtpGXzD8mJLMBjqkAaOjBeplubvvAP0pYvoQaSPFSnYJDc%2BtcqxA3l5w%2BPXi1jG8toHoPQiKb2Gt2neWexAEql2TBJegX8pD3pyagCtUnlqqs0tJt7vBrQ1DimB2H2vc3EH1rULwQklKCc2J4Ov3LvDXWEBgkMq0YeJhXc3Ue%2FSRqbj%2FSrPbIMtIGmvxTbhrvwyJKREVNm7JXPQaaYobgi5QjhmMvzsbDUoDgwO9UO7L&X-Amz-Signature=efb876a1c59fa25d7bb2ba2a21ebdb0e265482c0d65f6b3b5eda9ed5674840f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666CDONM2G%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T122910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIQDRyjKIbrnERIVs%2BCpomgmMfrGphg2xiLjddlOKSPUJgwIgHzSOF%2F8C7J5izMSpS0i6M80E0pQ%2B8BlU%2BSpEvTWQT9kq%2FwMILhAAGgw2Mzc0MjMxODM4MDUiDImxZXY8KzGKQoaG1ircAyMVUsazvq3r11S%2BbFvfGxt5fcYhzLymDW6hFRd6Lbtymdkgbf5eDPNRUg5broultZcY9trgGLiXmnHWMS%2BlJW%2FSsB1vS0pJMdgQKaZ0cI09UXrN%2FTctNxC0dXaCphNr%2FxRhX0U3dhrRGEgEYubzIFL9GURGJ7ppdWn3E7JtWEpZnk%2B7SXt%2FhVKQEDW7zM9XROeVrc7wxRbpSTi5Y6OpeSjJEnVQQph1YJKFji70EZxdO7LMwaX2VJVHIT4VeB9NtTmjBGrdMS%2B3pHcfsFSbu2D4%2BeBEr3ql%2FR2ZSWN4RoiG4CAkEkkTfAJ8tmXqWw%2B7E54EIcRypYDQST1Ff5vCqweAiK9musoVL%2BXcxvPuSaPLJns5m7yhvy3Q%2F7SQuPJ5QKQ9Pw8fR4XfJTWKkHX%2B1yewRI8JJE9hMvptOAZQXquRxvb28PCiS2a1PIyfq7soI4rtmROzvp0HOmIBeGi0tVF31FgUX71miH9eBmUAQHm5AFy7JOpb%2BuNj8Y3GXiAEnwHfcRV%2BXP3qQDe9Dx3ARN0Xwl1tv4RLT9Hkfz4YLsLTPrfZUCOczACxMrhWy8dNjzSnQUFLCHo%2B4neGW3Y%2BS%2FvHSObcwo2V9T6JclOrsYM9bMxi0WtUBT3yQCu2MKyZkswGOqUBYIAPuieGSfkczLQ58MXAxZDDmfcs24nsrr68eVXRVm2zpjbc%2Bouw7RxlwAVNOO6xblOWQ3%2Fq%2Fpr8oYKkpHikfxaQjl0cHGNOvPRVvu%2BjUiIk%2FQQtOgd73c%2FVFH%2Be6RQFmoGTCJUHNlHgZ4U7yRuVInkQT2rzI4t0rtsNBVU5noboDbennL%2BTkusOHOOl5KQpo0bI84yxue%2BNweUOohk4vGGPbfdi&X-Amz-Signature=5a100f70faa1b4ad77da319e322e9cea56c410feae07a1045ee384243f3de154&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646TDTCQW%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T122911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJGMEQCIBUzTO%2BMrgYYvD8qM%2BvYiR%2F6CWeauP1xvh5Hq5owuH1rAiAbn2pplq8vnEk4thFrNicafEJt70ICL5i%2F9hVWCVCeIir%2FAwguEAAaDDYzNzQyMzE4MzgwNSIMr9gHEjGaBi4VAUiNKtwDAnDZKw18VpwxBo%2BACB%2BYk%2FPQ4j%2Bt%2BCpZ9B9UR2Pv84OHUe8b9q03oKDL5QaB1RoYoouGZr1Wv7Mu539H5bxttOClFbxANE5QsZSHF1zTiN8nA84JyY8yMh0p47hGcTD59GQP6%2FQxMIMc075xKNcuVOsZ1CbXqt6Nv1MTM9z0qUgoBmOytYHk%2Fj1HpwbqUSK6XUI5HvAN8HiyWS5qWyXDkch8kxX%2F4sBlRsHhvcpPlx%2FJlpnGFX2sPagkTca0VIRp8QI6MbpnS3xNstr7vj2urO3Ae9FNbNnX5VhnaH0Wqc8GIq5%2F1VEyxW3ElG9O5nb9JGoEYhnxL2OSxoC1gY7snAw0SxQUkFiUNIvT0gIO%2BCpcthXARaYCG7JuL3gU%2FhyUYzwX9%2FaVSB3TJi6BygY0P0r54bzbDA2uyAQyLRZiSh7lsJkaF1yGFhiIYKe%2BG86aeQ7YgaMvqqP8vkvmg7dJb3HGRVWr6n8y71PJmS18FqJCOw2%2BmgA4%2BjEHOR%2Bpu2LMYB53lYREXHP8uWKyXb0W41MdjEmmXie5kWPl9JWPZkomwSOI7rMr9vhKcPyuNZMmJ9Dcl30JpXWLdFF0N927Cg1PIRlnbZMyJaGsOvpAfHzs7uuqTvGKT0gBI8UwhJmSzAY6pgELPsoY44ADJSjtfTK27ZCY9KSo5JSFJlz7cNWWTvOWZtVSlqmu5DvMpNg1Y2emKZOwa0woBSv7xwMDVznXLTzoeUDUoNMeXTHW9k0bjqPmEtF88AqHaSblpwwkTvRpEAIvp6NqYiE31UmszdksCU6X7DHLokSHhWno%2BH8l2mlScMMVHADRMzCwSlgaCsHrrCXB8y8KwVaWjuHwpplYVFqjknLIK%2F%2Fd&X-Amz-Signature=24d4d6f8e66dd14cab70a45be3207336b672b7f619a17405b49f1c10cb307a39&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TU46HZG2%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T122912Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQCONEEqu2BNPV%2BYAQxn6HfxncAb5gS9eELB1gOt3DTUhgIhAPQtWPCgQL%2FrL9K9uo%2FO%2BFDCuWiDBeMslQov1eLIX%2BOiKv8DCCwQABoMNjM3NDIzMTgzODA1IgwGcVaBszzZB47L%2FZ8q3AN9QmUmswZ6Zl%2BOkfsi5zIU3oGvWgSsaZ6kLW%2FlwVy%2BR9kDLrt8a%2FwUbi0hLmQ6U%2FWmBXGevKUCpUzcOGA2mSq2RfI9VbuYoKX5ATTkLYMv3StvUYuxoka5tZugy33uHaW2Oj4cBPUDWSVCgDJ%2FjCUvk9%2BI3tfGy%2FAEb0Q1AlW7o4CxvjM5BurMvWbVC6W64OQaLccYJNAtrKdmBSbYNnl9h9qVkBcJj1Rz8cxMT9QayEG46GEGfbP2yxADSQ5ld3556SA4C8VWEZchf3Sw1SBYyPDxEknInODBajt8lVx4gQqqIGXptdC92KIFQF4kJwg760NBApnBI0w3oPyvi63AxGWfebkD7RMRRKe8lsh5qT8QzO%2BAwvtudoRp0U5LckG4qnUl5296PxlO2GJ5cIvAyhA5ThOwrsXO3Sdsl87RO5iOU5GQyY58N8Yc0kfVBbN2sp0tJ6QuCV%2BQvjTJS4N4FKbP5xDmM5NMpDdax%2BHYv0I73pr7yJvpwOuKY4ruzcQJErMdNFzpEn8OPk6UWrmxXz2iLgs5tuFeewJpy3AKUWre%2FdQgcjKOXblDoWFjZrnECLVVPuXz1Ur8FrbtwHxr5ZbGBgwljMVpm3Ut2vOfD%2FlEGaueR%2BU59Hup9jDM95HMBjqkAfNZ%2FP1ZLCLErPvAtvumSZOzWFRG5lEtmrMFyoODTrHZ7TpFChk1TXx4YDzGMEJLOX9Il7w3fMhrQAbqj0rfjVl1wtffNmCw5JrIkTzuaeWCkF%2FcCbLbs2Lg3Gpwjn3mG8fPmI8MnIo93VDcem77SbDjvNSz8nLB%2B1%2FpJnyQhZ7fAIHIkRrs7524ZyTM3jXQedQsnKgOB3C4BXa3nulQoWFxAQ9K&X-Amz-Signature=7462a2d8e3fac1a71bdd7fff9402040d74de7dd698f33a4d20a6395a2a36b968&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TU46HZG2%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T122912Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQCONEEqu2BNPV%2BYAQxn6HfxncAb5gS9eELB1gOt3DTUhgIhAPQtWPCgQL%2FrL9K9uo%2FO%2BFDCuWiDBeMslQov1eLIX%2BOiKv8DCCwQABoMNjM3NDIzMTgzODA1IgwGcVaBszzZB47L%2FZ8q3AN9QmUmswZ6Zl%2BOkfsi5zIU3oGvWgSsaZ6kLW%2FlwVy%2BR9kDLrt8a%2FwUbi0hLmQ6U%2FWmBXGevKUCpUzcOGA2mSq2RfI9VbuYoKX5ATTkLYMv3StvUYuxoka5tZugy33uHaW2Oj4cBPUDWSVCgDJ%2FjCUvk9%2BI3tfGy%2FAEb0Q1AlW7o4CxvjM5BurMvWbVC6W64OQaLccYJNAtrKdmBSbYNnl9h9qVkBcJj1Rz8cxMT9QayEG46GEGfbP2yxADSQ5ld3556SA4C8VWEZchf3Sw1SBYyPDxEknInODBajt8lVx4gQqqIGXptdC92KIFQF4kJwg760NBApnBI0w3oPyvi63AxGWfebkD7RMRRKe8lsh5qT8QzO%2BAwvtudoRp0U5LckG4qnUl5296PxlO2GJ5cIvAyhA5ThOwrsXO3Sdsl87RO5iOU5GQyY58N8Yc0kfVBbN2sp0tJ6QuCV%2BQvjTJS4N4FKbP5xDmM5NMpDdax%2BHYv0I73pr7yJvpwOuKY4ruzcQJErMdNFzpEn8OPk6UWrmxXz2iLgs5tuFeewJpy3AKUWre%2FdQgcjKOXblDoWFjZrnECLVVPuXz1Ur8FrbtwHxr5ZbGBgwljMVpm3Ut2vOfD%2FlEGaueR%2BU59Hup9jDM95HMBjqkAfNZ%2FP1ZLCLErPvAtvumSZOzWFRG5lEtmrMFyoODTrHZ7TpFChk1TXx4YDzGMEJLOX9Il7w3fMhrQAbqj0rfjVl1wtffNmCw5JrIkTzuaeWCkF%2FcCbLbs2Lg3Gpwjn3mG8fPmI8MnIo93VDcem77SbDjvNSz8nLB%2B1%2FpJnyQhZ7fAIHIkRrs7524ZyTM3jXQedQsnKgOB3C4BXa3nulQoWFxAQ9K&X-Amz-Signature=1e6769e7e689e4b3cbcbae12e644a1572e1a5ee16b985b5a1153fad8e74916e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SL2TW6GH%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T122843Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIQC3s0F%2BVYPzOw9L2mQS2xynBQU%2FnOnZd9X%2BriF7Kdm1KAIgRLaLkaf93JikTtL0OXflrJThqIg%2BXPG30HEKurx8o7sq%2FwMILhAAGgw2Mzc0MjMxODM4MDUiDIdIF9nexGZ72pajvSrcA1XP80wxDuV%2FrvR%2BDEEu9xz00VKDHHKTGTvrPw5ayV6kPx%2BpoPJ7CTill%2B13Wi976DiX5vENSFImV1Z%2FOcpvi3B%2BJBB%2BskSDLnuwL8Zz5y%2FRIV5a3guYQUCX4OhRM3QOzSqwlRc06j%2FDidjHxetUtLHtslGdn4XHmYorulWFZB63GHIZdexDmlm5fG9Fy3wMkw0BKqs%2BTg18Sn4YRPQzeOf05PEugtmgtA06xYJHIoBElL979VtXdT8d9di9eqDzFVwjVrt3cUATmWBVE52kPb1D3kOndW4TFplYvmhWH2r6c6C5ivcXyzFIp9V%2BiIB4YWudtf%2BikEuvTswLKxtt0YCQ7alH5EKrrH%2FqWW%2BHLRf%2Fdj4wzDc%2BSwkrzEWVSXMFH8sNQRFZquHhewX8HMBwvG1Sy4B4DuWOcxwhHFJD6Kq6D5eZZkzDKn675k%2FqSKEwgycGGIvV7Vc8l5t0Zm44mhH%2ByqiDjNPo2WVVZUHHU612P6a4afKw9l5zTYNnkK%2B0wz4DFn0E40HWUJ%2FODvNi0XLh3TprnLhHwTrtFcnKOf5OLqb1yecgHlLKFKgC2GJUhNl6uVtmlzd9pTf%2FPFPjqjdqSRLv%2FrifgCSpF2dtrkw1aGYN4EIeOe7EpsDIMLWZkswGOqUB6P%2FvUhcBvKVBhKjL5FF9EiIsEcz1UXQwqoDX%2F4nlR0xRi2BeJaAVSQ2Gfvf%2F4YlXP9%2BPgBH7QxnMhXvcCVjYn%2FcrqSTK8gvmGGRYo4LSQbjWU2%2FJRzML1v%2FXzIg4LUWANIVOLKDkEwPkvY3Z%2Fvw96v3c%2FYR1i8cV53wAvYZaJQjlAu7P2%2BkSC1LUbPexIcCzuRJojA%2Bq8QIgwEJoL1YF5Dk48zwM&X-Amz-Signature=0efe6f4470f804cf4c64892112fbfe6b9b64bbc3dde6bc0badddb970bffc23e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MLNPO7E%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T122920Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIHI2Z89TPwZj4AcYdTj5FH6HLhstr4mL7rm8Ll6fUvUlAiEAt2p802MOCtZkC3UEf80c7L4mPpnyVGEwBvVtSf33js4q%2FwMILhAAGgw2Mzc0MjMxODM4MDUiDA4Sc0cZRc4Kmpj5rCrcAxUdp9Jk80UyE5piTF%2BTXdMFStDKR3l1XJ%2BJgidgp2YyZ8GppEO6tRhogBRNQWwo2OljW9OAbt5mEm7V8qxHLs%2FG7b3w1lAC2WkuiEIE%2BbwKoto1fIdOSyCX47b%2BoH4Z2Tc65guLh53NGIN%2Bck3m9muKgU1BYizmN%2F5eQM1edoqWBeOC13sabQuIb%2F7jrbvf09Fft4FEyw7JFfSE1dtNpsm61NE2DBfJeudz%2BvyFMt0iweanXZsLiInNU7tYxxZMqHvN7A%2BvvLbEP5pJLpuEksaae3T3%2FPwjGYauL0xEOyVKP6vEFJ9kX6%2F8xbs9a5gx%2Bt9%2BSaDsnfPT2PrmfanO7zLW2BoLg%2BhLoW3ibgjn3A11Djohlf%2F%2FngzIY2c6t9Fhw%2B%2BSY%2BB82JQJ0YywYjwR5BssjIDrW%2F7D9yAvul8V%2ByXG%2Fm%2B%2FM0aTQjIwY5TLW8td%2B5%2FqoF5BAiDT9T97s7ZVr9Oxn%2BLp2mxFwGuNjUu0UhnH6boHQdrvvSUpqszdu5h9tdFIg5k3AG4dTqHtTQbF%2FIOOIt6xvWF%2B4ZuP8oyKPWKu2jpxaknYICPScV4rNkl%2BKYMoei7pFug9kdSMI%2FPUFahdC%2FXaEtK5Gv1zjDzytNiP%2B6ZxdIMOxG8ebod8MPSYkswGOqUBJoV%2FdnyBf%2BegCvtgqr5FL%2B5hczxAsP08jEp052w%2Bz%2BYYLBITtnprhy4i%2F%2BKkhY5vgdHYn3UGWnNyxISzM2MX8vlkssLDipil13UREcLuTyuZeSzWw%2FtlppmYAxGx32url%2B5QXylFxR0c%2F7b94DweKVtz545aYdyqncVuSDpq7lG83J3MA4rWDhBjsxKeLQiOVrFovLFuKnEoEL%2FA7wDhxOsOeDj2&X-Amz-Signature=5ce11c87dc427ab8b41c476c1e4b7fbb09a1ec98bb6bf5ff5021bb35e4dbc25f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MLNPO7E%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T122920Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIHI2Z89TPwZj4AcYdTj5FH6HLhstr4mL7rm8Ll6fUvUlAiEAt2p802MOCtZkC3UEf80c7L4mPpnyVGEwBvVtSf33js4q%2FwMILhAAGgw2Mzc0MjMxODM4MDUiDA4Sc0cZRc4Kmpj5rCrcAxUdp9Jk80UyE5piTF%2BTXdMFStDKR3l1XJ%2BJgidgp2YyZ8GppEO6tRhogBRNQWwo2OljW9OAbt5mEm7V8qxHLs%2FG7b3w1lAC2WkuiEIE%2BbwKoto1fIdOSyCX47b%2BoH4Z2Tc65guLh53NGIN%2Bck3m9muKgU1BYizmN%2F5eQM1edoqWBeOC13sabQuIb%2F7jrbvf09Fft4FEyw7JFfSE1dtNpsm61NE2DBfJeudz%2BvyFMt0iweanXZsLiInNU7tYxxZMqHvN7A%2BvvLbEP5pJLpuEksaae3T3%2FPwjGYauL0xEOyVKP6vEFJ9kX6%2F8xbs9a5gx%2Bt9%2BSaDsnfPT2PrmfanO7zLW2BoLg%2BhLoW3ibgjn3A11Djohlf%2F%2FngzIY2c6t9Fhw%2B%2BSY%2BB82JQJ0YywYjwR5BssjIDrW%2F7D9yAvul8V%2ByXG%2Fm%2B%2FM0aTQjIwY5TLW8td%2B5%2FqoF5BAiDT9T97s7ZVr9Oxn%2BLp2mxFwGuNjUu0UhnH6boHQdrvvSUpqszdu5h9tdFIg5k3AG4dTqHtTQbF%2FIOOIt6xvWF%2B4ZuP8oyKPWKu2jpxaknYICPScV4rNkl%2BKYMoei7pFug9kdSMI%2FPUFahdC%2FXaEtK5Gv1zjDzytNiP%2B6ZxdIMOxG8ebod8MPSYkswGOqUBJoV%2FdnyBf%2BegCvtgqr5FL%2B5hczxAsP08jEp052w%2Bz%2BYYLBITtnprhy4i%2F%2BKkhY5vgdHYn3UGWnNyxISzM2MX8vlkssLDipil13UREcLuTyuZeSzWw%2FtlppmYAxGx32url%2B5QXylFxR0c%2F7b94DweKVtz545aYdyqncVuSDpq7lG83J3MA4rWDhBjsxKeLQiOVrFovLFuKnEoEL%2FA7wDhxOsOeDj2&X-Amz-Signature=5ce11c87dc427ab8b41c476c1e4b7fbb09a1ec98bb6bf5ff5021bb35e4dbc25f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RAUOQGVN%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T122923Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQCdAVkwEjcQ41QUQj9CjY8kuUG72UVr3qpQdEcNZSANBgIhALbvSx7EEXe6BmpyjgMUuMAXHiqUjusxFQfDoLFucj41Kv8DCCwQABoMNjM3NDIzMTgzODA1Igx0YsWafu8pcxth2LIq3AM0rgD5Bc0s%2BQb0Mkju1SAgEIElviWxKjPVjXjxNmznbR8LGQymFTER6jsgUIENL1csWfzzmLAHTa7%2B6tYyjO7zNCPFvT9kjmL4M4w0n9C%2FX56zwBrhSzxUSSXWCD06cIrwJoi5xYUiWlYWBjNMrjHFpUCXpPCM0Hxe3jys4qdgBNKKa7w%2FsMBe%2F1lrQpApdEfeOhyUznC%2F17xQI7ahamtCapGR0KHWp4BdSatagVAS8tOdaCCnE57e4dFxNhtYHtB5Unh7GgiZTEcvDeTch6rM2%2Fxdk5Yhpnw3%2FaHyU2P10rKFGh4UcKHKTm0Ahijas0OR4yV%2BC2epoxCYsd2Tqz7nc4O9VJNCwX2UP2XLofIQUXw80QpAgsSaiTugy3Hzes0whk0E1vCNVgk%2FAUiLo0%2BnbkYysk%2FsF4C%2FN9RGapD9K9VkG7CKumiBNGdss6VKuawz7f9Lx2AUthq9WoLLn1YXF1RrExvU5Y4rooiq8ID%2B9X9NqgWZCJbEluIeiFW5AQk%2F4IT3qz0GXuPCP91B4H4lIl09IwdkGmpmC4w7gPR79A8%2BCUOb9GM4VmV3Lja6YE4hrUgb0hbhGZi9DQXIzeU8yk8EDqTWJULgBO8D3YFkZoMKFHhreME%2Fn825xTC595HMBjqkAdD9GbdGN8Ho9qpp2USRYE8R0aeiXJVLBiS%2B%2Bf5760x%2BP19kNwZyvlhgpPn5zO%2FaVdJMyRE7i4DtHliFkP2RPuR%2FMxdgY8yra0K108fZLS%2FVZcymKQxwTce3%2F0jZM7jYaK93Ez1J6qYsmukcOYkc0sDS0UJykC2q0t8Ooj2NhxOs8tYP%2FnVr3rHbPETvSL6KU3y3UlNiDJeoQkAkpX1k1NlC%2F4nU&X-Amz-Signature=10ad15ff616a197388093874321bd482acb8bfe244b19e43d04033caeb9ecedc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

