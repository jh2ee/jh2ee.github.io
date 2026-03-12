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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662NPCEIL6%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T122737Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCv1jcTi7LixMy5YzfN21dFFtznHKu9r%2BFPtdivP1R9NwIhAO9vauQlAAKcLuEambBt0xMtdLmtZSEqU%2FMXZHjKt7LqKv8DCHUQABoMNjM3NDIzMTgzODA1IgxWarguI9KFeqUAXHMq3AOlJbbEVHba2QE6EH%2FPYemfk%2BLxgkcvdbeLVSOpc2I8Ohq58GZT5X2ld5Id%2Fki18cpWDF6gMEtVKhbP5WXdslS8VX%2FBY9h30pgj7JFfJMX6r%2FOzJAA7pVgBxEmU5sN3ZdjN8b0o5GCP51540nc3PBX%2B8u7YN8c%2FZoWVAgj3hz61q0c611yQ8UvnTsP8Qfj0mzmu%2BNGNvBJHQ33GdPyiTukA1MeGdAjV%2FLQTNgFR1nBZze%2Bd%2Ftl1wbzCGnhUbM4FzNerJABjGz5oT113MGuqfHcuKRI3JVmi8tOoehMpwOs4tc6rstw6ySjYnpI3QtglXBs%2BGzbstl9mXH2ZK7GZnIvttpifaRj1aAzCehgsZQDodLJ2KY5IzYGP%2BvDUm95AuVerY9QG%2F91kszG8f5Irde4bUo8sOllTQelGdKsrepiyh%2FvxUMDjhBmCcRCgaGruUbbCGs4lb32UZSvPBkFbFuTZhNdPNG9UrhaAvYY44kk7F6Ry6zSCSDiHCVKZ4Ns%2BoiATZ4mmMd8Mj%2BNiQ7MH%2FkNvYmcGwAFTg3S7bdVRpGSbt42Ug46TI3m1qlhRPqYJUKDPJyNTUMmT%2FgzLP9CRocMf7gkPs4XZJt3X8iTOfV892EtwR%2F6oLBppK5BQdzDrxcrNBjqkAfRwNevJHpkxDk2eXN0SHuVv3xwE77iU1pbiCowlXq%2Fxx2a6NE5q0QfH%2FLaLkTTcCpzHw90gLNhh5qEuE6IDPmnugbLi5ra99FzFLjutbVqjCV13EGFuLkHN5Mg6jL516nf8q0rT4FYvB7wQfGKI66h%2FNcEcRmDYG9S7%2FkDLzBk%2FkV78L50HAVsxSW3lc6TO%2BoWUx6Ql5to0eo2Qo28k3I78tUqD&X-Amz-Signature=f78a1aa186ff67ba0199270d1f18c816532936cc725a5d4cd7ffd0ab9ac7e5a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662NPCEIL6%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T122737Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCv1jcTi7LixMy5YzfN21dFFtznHKu9r%2BFPtdivP1R9NwIhAO9vauQlAAKcLuEambBt0xMtdLmtZSEqU%2FMXZHjKt7LqKv8DCHUQABoMNjM3NDIzMTgzODA1IgxWarguI9KFeqUAXHMq3AOlJbbEVHba2QE6EH%2FPYemfk%2BLxgkcvdbeLVSOpc2I8Ohq58GZT5X2ld5Id%2Fki18cpWDF6gMEtVKhbP5WXdslS8VX%2FBY9h30pgj7JFfJMX6r%2FOzJAA7pVgBxEmU5sN3ZdjN8b0o5GCP51540nc3PBX%2B8u7YN8c%2FZoWVAgj3hz61q0c611yQ8UvnTsP8Qfj0mzmu%2BNGNvBJHQ33GdPyiTukA1MeGdAjV%2FLQTNgFR1nBZze%2Bd%2Ftl1wbzCGnhUbM4FzNerJABjGz5oT113MGuqfHcuKRI3JVmi8tOoehMpwOs4tc6rstw6ySjYnpI3QtglXBs%2BGzbstl9mXH2ZK7GZnIvttpifaRj1aAzCehgsZQDodLJ2KY5IzYGP%2BvDUm95AuVerY9QG%2F91kszG8f5Irde4bUo8sOllTQelGdKsrepiyh%2FvxUMDjhBmCcRCgaGruUbbCGs4lb32UZSvPBkFbFuTZhNdPNG9UrhaAvYY44kk7F6Ry6zSCSDiHCVKZ4Ns%2BoiATZ4mmMd8Mj%2BNiQ7MH%2FkNvYmcGwAFTg3S7bdVRpGSbt42Ug46TI3m1qlhRPqYJUKDPJyNTUMmT%2FgzLP9CRocMf7gkPs4XZJt3X8iTOfV892EtwR%2F6oLBppK5BQdzDrxcrNBjqkAfRwNevJHpkxDk2eXN0SHuVv3xwE77iU1pbiCowlXq%2Fxx2a6NE5q0QfH%2FLaLkTTcCpzHw90gLNhh5qEuE6IDPmnugbLi5ra99FzFLjutbVqjCV13EGFuLkHN5Mg6jL516nf8q0rT4FYvB7wQfGKI66h%2FNcEcRmDYG9S7%2FkDLzBk%2FkV78L50HAVsxSW3lc6TO%2BoWUx6Ql5to0eo2Qo28k3I78tUqD&X-Amz-Signature=f78a1aa186ff67ba0199270d1f18c816532936cc725a5d4cd7ffd0ab9ac7e5a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z5DUYCIR%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T122737Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC2PRDiAp4KeLQ2qwa9gNLSvyU8L69VrURe8OXo0u7IKAiA2jwQcidiSBtlL5EeUxb%2BrTPMMRE4nYAiVC%2FI%2Fev7eVCr%2FAwh1EAAaDDYzNzQyMzE4MzgwNSIMAAGL4mE%2F78RqJ48sKtwDncpSIgdXrvgwNlIkM3CFB3hbTj44eWJM7bE3eTFI1oYbNnopp544Qn41UxhGt2QGUKySmHdkFXiCLM3lLZ7GD3L%2BrJgis90yGefSkyJ4Ow5E6eMxYeTOAlMCFDiAxgtBhUkaB8%2FRcb2OMtcMVboJHlicvgUC2Wp13AkMB4zDNTwyHlceyabA71lFBk3GX9BWhXOjfh26Z8VioZRi8ANx%2FMVLVtw%2BA6NsxvlaMaWubXxXxurA2mhxptattBF8qq58R5Yr8Zfb4UnPEKjXCxIv3aK6KgsXPKs4v6WXPrShZX9BNYjFAVvER%2BJ3XniR6oDkE9MaQ0UGNH%2BPxPxW9rlowm1K6Ch8RykxFqFErfwUIAsZqvcXXNzGKxkQ2TVxcSV2VkMGV2DVcS8MT7KdB9xqI9QdTynmwnhn%2Bn28mjzp68wE2MwL0Li8GG6Z7ObDZaQYmniIgdo%2F%2BDlgKysOKY%2BQ4b15qX5CeozMF8r5C4uTudW2%2BGpRMFFP7O%2FA2jCwQscxuwQyRmd1F%2FyI914Xj1mAdOQVotz0tNds0WWzDsAaSKkJFgzXyutMrsmZfNxk40DvHC90GtKjJKlrx7XOrU9P4ps6uQM4vNGAOPq%2FDwngyxbdSjGOXxPVxRMUUKswq8XKzQY6pgHRsl0L2%2B8mbinunAH2OmS2cGr7l1qIlSpQ53%2BuiE34pZF9VfKtcKesh%2BxBrgHLj1XfhF7UyK6kLs4m4gjloH68Ik%2BocflSRX9NCaThutA1Zi4vYpYsrcFYDibA3zNUKkaMG4ftYjAnuTV51bd5rkWnGYOYVG5VRYLr%2FTdb%2FVp4O4iFuRamSF8FdbrMqxYHMEiy2schIGTq1YMORGKhtHF%2Fm6seigyq&X-Amz-Signature=498551c91923b47650b637eee37daa28f8b806b8f12420988807263433dfa7a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666N7TS4B7%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T122738Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIH2nQ2pQ2xbkf%2FNUy1uqhEM5M8YG4pl5J5DQhp5ZNThTAiA0PXwdiFFfWpOw40xywcpqOc8miOAjYj9EnRBnm7dg1ir%2FAwh1EAAaDDYzNzQyMzE4MzgwNSIMsHcAj9DyqeFrImeUKtwDUFEl6NZkLu6vWmMSy8A%2BFdYFtBRuEpcxZwJ6RvVY63Tue5oYaMUXJBp2Ew9Fld8yvY185lj339k4JP7itWk%2FkakEfM2xClbEywpgA2Bg0WUDgHjJGPepwwTFK3HiHwCQNQIUAisge82RPkQhX7cTPyXkjU2X%2F26L4lUe0gmXhlG9zCxh%2FtFhYHsHwqn%2ByCl3wBQDPourA0YbBgEnO%2B1h3MMeHUUk8MLhQfoVHOb769Fb1eGX%2FirsjpCwdjE1yKeiRSD2kjHCLc8NEdwOgFzWsN6fj4uQtXVhiD5F9oqQaBbcTeJS53HdpHowoP2MN1U6U64nCRWackX2eX7Ecxoj7S4zE62%2B5%2FNZvNsyVWrM%2Fqjn%2B%2BplJ5CT7yS8XZJgRZwjNzS98sAArqLw89CGxYZAXbgo4sL8ruVOuIoaAVEvrKC4sOnZx72bd%2FcCd4vicEU1cdht%2F76SM2aeWjeMpcJHMCEleszc6vQi1yS0rbx9TsLP6KGlO2ft7hLcRENYH6GvgcnCNj1I%2BRBtbnCcX0hSiAaWU1VPKhDXNofFHKE6vn6xbC8IGq2FmFefAEu808EhcW3BYWdik2DvYNZOPTrD2Hp0gn3vXy5jhPWYJS3GUdIsw5bddm%2F50XJNXNgwzMbKzQY6pgHuQRd5X4DJYnt6fZ68J9AEL2s8vSadkcbFUa%2BB7LhD8edv8cf15aJDsTtf04sGwlnKJJr6wy1XmncrdqI1D7HbFvaa54O2mgSjUygenoNTXwOV8XBfkA%2FpVa9Ur8jHS0RRgFrvdQCJizyITuwHs5BlL93CEXuMzwJ8EWJReqU6kYS1CgPoP52AXAlc60Nv1RAJrGQ%2BQaqU6JoXkdaaLozoZ0nZ52oE&X-Amz-Signature=33891c084e02035fcfb971b13866dc8e14ad11ab29b9f4bed644c28be0688d36&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666N7TS4B7%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T122738Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIH2nQ2pQ2xbkf%2FNUy1uqhEM5M8YG4pl5J5DQhp5ZNThTAiA0PXwdiFFfWpOw40xywcpqOc8miOAjYj9EnRBnm7dg1ir%2FAwh1EAAaDDYzNzQyMzE4MzgwNSIMsHcAj9DyqeFrImeUKtwDUFEl6NZkLu6vWmMSy8A%2BFdYFtBRuEpcxZwJ6RvVY63Tue5oYaMUXJBp2Ew9Fld8yvY185lj339k4JP7itWk%2FkakEfM2xClbEywpgA2Bg0WUDgHjJGPepwwTFK3HiHwCQNQIUAisge82RPkQhX7cTPyXkjU2X%2F26L4lUe0gmXhlG9zCxh%2FtFhYHsHwqn%2ByCl3wBQDPourA0YbBgEnO%2B1h3MMeHUUk8MLhQfoVHOb769Fb1eGX%2FirsjpCwdjE1yKeiRSD2kjHCLc8NEdwOgFzWsN6fj4uQtXVhiD5F9oqQaBbcTeJS53HdpHowoP2MN1U6U64nCRWackX2eX7Ecxoj7S4zE62%2B5%2FNZvNsyVWrM%2Fqjn%2B%2BplJ5CT7yS8XZJgRZwjNzS98sAArqLw89CGxYZAXbgo4sL8ruVOuIoaAVEvrKC4sOnZx72bd%2FcCd4vicEU1cdht%2F76SM2aeWjeMpcJHMCEleszc6vQi1yS0rbx9TsLP6KGlO2ft7hLcRENYH6GvgcnCNj1I%2BRBtbnCcX0hSiAaWU1VPKhDXNofFHKE6vn6xbC8IGq2FmFefAEu808EhcW3BYWdik2DvYNZOPTrD2Hp0gn3vXy5jhPWYJS3GUdIsw5bddm%2F50XJNXNgwzMbKzQY6pgHuQRd5X4DJYnt6fZ68J9AEL2s8vSadkcbFUa%2BB7LhD8edv8cf15aJDsTtf04sGwlnKJJr6wy1XmncrdqI1D7HbFvaa54O2mgSjUygenoNTXwOV8XBfkA%2FpVa9Ur8jHS0RRgFrvdQCJizyITuwHs5BlL93CEXuMzwJ8EWJReqU6kYS1CgPoP52AXAlc60Nv1RAJrGQ%2BQaqU6JoXkdaaLozoZ0nZ52oE&X-Amz-Signature=c6f42f791af77452804e904d35f11ceca8dd8f10464eaf2debb4080ebdda1eb6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAXJ3MDG%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T122739Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCT5QDLx%2FxzthcAxB8lJOisVzjkZuf2UT1sbpdReEExRQIgPHvDZMWwTsFW%2FXOhTLnn191cewm0nwQxnlDhtQ6uK3Aq%2FwMIdRAAGgw2Mzc0MjMxODM4MDUiDEPs0b9WeWIQXv3PUSrcA%2FTlb99E2fsg%2FN%2Bosi6U9HLT%2FKz6ATFaglF4jT%2FTmxfBWo6R70o1mg10v5vRfLMx%2BDKJ%2BhQerMSOozuChqQqajMZkyPpBq58zDUOvrejLhXnADlfQlWbicLAixaleAPzVrJ49PnrQtMz8igrVrqyXLjO%2FEbGiRsoTo5sNAYRsnAtWrwK1QmBPd374t9xA%2FSuo8cQTOC1ER9nKfhwN2XeU9n903CdOMpG%2FCnV25T7ukXU4VM6Y0BmfGyl7S%2BvTcqysp3%2BGOvmF1GgENTjNNyOLcQwviAxsX2x7l5S9vRmDZKeYe%2FJ%2BCsqH%2B7HMkDABcV8InElBEueVgN64PUXaybYtdr2x3ekyNNwsigwS2nLt%2FaxeeHGcKVbjDrWwA5RJRG7QUNmHaNvNaCwLD2jCmVsPtU1J%2F6i2wQne78VRXTz5zUMMakhqQ4P8eyVZlkYzOsP%2Bd3o7rl8xU8kGXQJhwv8RhseRxXQAgzQm67yErheh%2FKSNVCxjyEDsa91bm2hnfVg2QQIRD6JfHYEgvFYATsK%2B7LxeIh%2FOIo39Fl45bU3jL3f9zH0qjGSlTw6MKDSZfr5wJqwOwoMQQ6MEgvEwCFECFGt%2FVa9a8nyaD6euyZyqnhoVemDhbIN8STKrDe1MKvGys0GOqUBMGAuRwpUQkrfwyPDq5dSsdOg47dLbpHUEVPH3jwlTCbNITsoq%2FRCuxjisN5BHze%2FuIP%2BQDRxbDwVRJNt2Uv6y3TWDEmd%2FZRajh180yiz%2FNi9%2Bftr9oJfQiEk8jZAbqSJFWzcZBJFojqSv1eFPUkHuMRYvVoSIGynxTBaMUoN4c5K%2BoXH2%2FQn%2BwDbL5AC5QkjwhFcTQfeAyQq%2FsmvDrbfvrgZuE%2FY&X-Amz-Signature=a6fa0e2604a3595e37323b4be214287bfe116593ff3d8c1b2b2ad35da287851a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y2NPXXRV%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T122739Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCEiv%2Bb3AlL8K6Ttf%2FaraJJgOtdPkrgeIu3CJV12k6TeAIgOL8mQLFyXBCfG7tn915zIyZpm3iZdYf5IdwurDgQVqIq%2FwMIdRAAGgw2Mzc0MjMxODM4MDUiDFBWGjE8F7BAHGVM5SrcAwL%2FW63f7TrXAWly7xdvEykW2uFlRoPp5W1464qTRJzzJJjkzzx9hCA%2FF4sH7oiY%2FOkvv2go5SUe9ofLGMocsXb6FL9lufADmLGb3qqsbsKrfdssjZnn7rMhGLw8WOJ0HbfaYtoSlZxSuL%2FZI%2BR3fvnQg1jCJkDpg70zSJNMYWMXAS7lRG6k%2F04%2BOLJOHsQKqzVhecAPOoxLWyfqNlwcnv8hx0jmbtyCypd32uHZKrciLvcT54rj6h%2BfPIj3qNolZbjb2iQTTEbX5dv4UjKikmMb8s4d5RJ%2BzwYWokUeH7G9j5xibVPgemJgbL6lohCIE8LSziPhwArL3EdWTZWFZicZtQJtQtZWlpaKTdl5%2BAJuMg%2FufzTzX1YWTtHyXiJkPa%2FXrBrgrvonUY5aYZEASvBK9q8kMY8P%2FMLErv9gF0XlSD00Xwef3zHx3jmwSyazUDF2HHTVqPrfr98tVkQ1la%2FZJLtycMRbIDE4F8mJS3%2F1RuOSNo4xWHFHA8cc3i40iFU30yZ78uiDGlATgfeIZL%2B0rIbo9BQ6G%2BEkxxZt5gVkqYBJh0LLjKtoRCugL3GsH6f2ly5POAcR%2BFl89HFuwpr3a1XvbHfw4qX5IrD7KMxXd%2FAxqSYUJdnIAePfMOLFys0GOqUBjqdo0I8ppmf%2BN8scaerArmaE6fYxG8M0jjTyGzS5j%2FuVTcLEwYzyh1Zrmb3Y3neKgSGHp3wodHBhbdLmgIipe4yQsgti7soH%2BYP4bDNPEY%2Bll1%2BzS8%2F5DLMJLh5BnCAhPelnKNRFeApcLLdNxUcJSuYcF4SCddTOvRdiWds%2BdBhl8aNQ4iGaXLwkbAEiaiO6X0iFgqn6wddU29i7BrLopZCnHNrm&X-Amz-Signature=8f7101adbe61d3e7f3db9045871114f104f830af0303f03f05ba3333128ff0d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XKWE5NA6%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T122746Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDPOvPhb3YeyM4AE0yROejdK%2FFmk3GieBNfh7jRbzyHnwIhAKWb%2FfFNnkAyhCeR2MbHrtwticIK1gjRTvaw5bMy64nlKv8DCHUQABoMNjM3NDIzMTgzODA1IgwB0T10YPAxbqeDkf0q3APk2pBNo3xHHUJxVWICKoxj2IoqrhlOAijKxVIKDp1S1fVPFK2hMCud59gf5vuNPypT0Fn5m4%2B7gaqlYyMcS9ez%2BVm79va8H5t5FyTtj7xryJvbM4kB2OAPZxTf5lDLC7vLYi1lDluMiKplMFt%2BI7Vep3ZXy4mTmYknw3B55lgd4UFAJhxcdyFa9KQgCyiRme%2FvSI7WIdcDEtNjhR0zL0x1k74LPlUkZVwsYmRKTy4dC59Awn8UlUWDTc7Y%2BwDPppc%2BF4xo0dA7doeaW4fUVGpdCJmxvVNncLe5H646Cm5t80RTTC8OBiSqfc3Ho2XULde6oKIg4oNhsGoN9cOx6oVBpbkg1IiVsv5Q6%2FJplT1ADulDAfoyRZWSmXnPndqv3J%2F5kkb2W29IXXY%2F8JBm8cicJLrvCXkkMZMUbY6sOjqSX7ZPMwwItvMI6UQagUQOd%2B71RoJX4ygglNm7sgUuEsm6Z1fIbjzrjfAmxaJHHlm8f%2BNiU48LVajdBYD6To%2B0bbD1jcbQVgD0VrhEpC1cJHn9I%2FksGgEvNphBteBLSTQEJ4D3V5PpC0pnnLOBizja5PmwJ7K8%2B8a5EmV9xdXkRp8jfwtf5ZzD%2Bie7FbK3uLIcDAZyazU3xJdm4tZ5rzCexsrNBjqkAfsDUbGFQ13x0kB6NKuniGjTODRRUfWEKnmYzmmhXJwEdsc%2Bju3AwU5uhyNKfWLJ1fm3XUdwcPUPhijbn0YA24U%2BZrGJMV8DDMpHdovUqTuiUKGsrjjRgrcYIKhfo%2Bdwbvn7LPHXrOo1FV2zkKhsr8v1axgD29ab%2BvNtmzXcoD2IFHsACAV%2B%2FHiSVgcq1Eo4pWhDluJr6v7uQtOmT2M%2BuxUZHzR%2B&X-Amz-Signature=367e8d7b04278e7701ab741ed3c529618034df6d4dfd7fcc4981f610acc87d2d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466245URVLM%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T122748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGTAyeigesYHXvPoZF5mFu4XYSXeKtdN3biJLdthRHsxAiEAx%2FRvLGImaDjZIqAN3tJwXRdh4OSu7TuiLy%2F6YsmO9e0q%2FwMIdRAAGgw2Mzc0MjMxODM4MDUiDGVfRZLRzA%2BHtBoWWyrcA27P%2FWjwzLVETt%2FD2JYneGqTd3J3dBfO3eMciqT37oR%2FWFkzF3xgMcQcS6Q4a20tsu04lK5yPhyBNRRnybk6YdEAPAD9XckZTmdv95x84gyf3Ra1IPGqCfIqhFNCbEv0m%2B0O4MyruwavmAvlEZwswOgLZaKWslXL43c%2BZ3Pj%2F47PFTqxOHOCdgFBKFlgqhbenR%2FLZmQicj3gH3%2BAn9Fpkwl98gaJFPLbEmhUDgeBA2x3cVX7bTIaNcOV1%2FXiBUp33tKt9G18xDBcDyNUANn%2FMyBFjcrXqKmlT2s0I3eUNlNAtpiGLWVFk14d3I28LuzwVnwBkcgZB0PACnw6gB7yoxsh6KdRS9bdFg7oz1SGEGa6tc57A5XqaaV4WdEPpbsgRoDid%2FxMIK9cUPehf4Yskxd3X7fx6zUgVBa852jy9BfDZJouBtp4p6LCY7LImDip9nD%2FysGYxJFmpNR2tuh2vioIBqIZIZRdkLW8GMdqK8SwwhZ3BRAyiJCTNqmz6%2FFeUMEH1E42RG2xfmQDYfmDz5pdU%2F837UribErg72vZRKLGkaAMmM1C1fCRai4YWKfLETUC6usCqwkKZHwsBJ6kvV5RcJkaJt4V%2BWfjyfsjMO%2FwqXfIV%2BcBF4mM52PFMNDGys0GOqUBJYTPYGNOm2LRguDvuf2NDDrqtywFcmtFKNrjAev24Wxc2qehbGarklx6naZyur9MwQ88T5RzgJCQ9V%2Bgs3alnlJvFLVLqk6Mf6Kd3GEXIEBKBPit32%2F5Q1B9RH7pKV8nkbfYpIZm3tRh7y9DhR2%2BYnMY2OF3yucjamkErO0b5pqzKBwlOgzo9x9DD0hZGgtGJZtAwATpdXzVPwqCbEWk8FQ8lhj6&X-Amz-Signature=0f618ebef316abbbb2155f375188db7475c90bdb82d010f45eb6e4cb22561b10&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466245URVLM%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T122748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGTAyeigesYHXvPoZF5mFu4XYSXeKtdN3biJLdthRHsxAiEAx%2FRvLGImaDjZIqAN3tJwXRdh4OSu7TuiLy%2F6YsmO9e0q%2FwMIdRAAGgw2Mzc0MjMxODM4MDUiDGVfRZLRzA%2BHtBoWWyrcA27P%2FWjwzLVETt%2FD2JYneGqTd3J3dBfO3eMciqT37oR%2FWFkzF3xgMcQcS6Q4a20tsu04lK5yPhyBNRRnybk6YdEAPAD9XckZTmdv95x84gyf3Ra1IPGqCfIqhFNCbEv0m%2B0O4MyruwavmAvlEZwswOgLZaKWslXL43c%2BZ3Pj%2F47PFTqxOHOCdgFBKFlgqhbenR%2FLZmQicj3gH3%2BAn9Fpkwl98gaJFPLbEmhUDgeBA2x3cVX7bTIaNcOV1%2FXiBUp33tKt9G18xDBcDyNUANn%2FMyBFjcrXqKmlT2s0I3eUNlNAtpiGLWVFk14d3I28LuzwVnwBkcgZB0PACnw6gB7yoxsh6KdRS9bdFg7oz1SGEGa6tc57A5XqaaV4WdEPpbsgRoDid%2FxMIK9cUPehf4Yskxd3X7fx6zUgVBa852jy9BfDZJouBtp4p6LCY7LImDip9nD%2FysGYxJFmpNR2tuh2vioIBqIZIZRdkLW8GMdqK8SwwhZ3BRAyiJCTNqmz6%2FFeUMEH1E42RG2xfmQDYfmDz5pdU%2F837UribErg72vZRKLGkaAMmM1C1fCRai4YWKfLETUC6usCqwkKZHwsBJ6kvV5RcJkaJt4V%2BWfjyfsjMO%2FwqXfIV%2BcBF4mM52PFMNDGys0GOqUBJYTPYGNOm2LRguDvuf2NDDrqtywFcmtFKNrjAev24Wxc2qehbGarklx6naZyur9MwQ88T5RzgJCQ9V%2Bgs3alnlJvFLVLqk6Mf6Kd3GEXIEBKBPit32%2F5Q1B9RH7pKV8nkbfYpIZm3tRh7y9DhR2%2BYnMY2OF3yucjamkErO0b5pqzKBwlOgzo9x9DD0hZGgtGJZtAwATpdXzVPwqCbEWk8FQ8lhj6&X-Amz-Signature=ece061cbe0c26607472afc64eb281b3c53349a33b88cda8f6e8e3583541f32e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXS25XTR%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T122736Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC16ZyCx8E3jQG%2B2c3kmXKlVKF89lQnxb3ZTRVKsfJMVAiAeevwx0wQbhsK8%2FxWmdK4TlEDVNGugxfBOJHzOfEUK9yr%2FAwh1EAAaDDYzNzQyMzE4MzgwNSIMZvv5BXtlN%2FEZn5QWKtwDzpC8LHY4OIBGUwD4ePE8sRXP4WJjpO8cogw3%2Bb66Kv70V4sPvHZf3iU7rLNJFS0ZxolmKX%2Fd2cLipgzn%2BBIKEvCGHQYGkL%2FJdaxPDTHsVly4WrrIUO8u7danKy8JSrYeOL1s4JXenfEDM5a9UgQ%2B8WgXBrLfbaadbzEWi7SSTXl%2FDrk8ejjDt1aUIKIrhMBjxk%2B597CMqkp95waPz1zR7ZBCDvmZx%2FrFsB0aGf4cliry7hF9ozp9K%2BQOdLszzsihhI%2BFeLF5m8tLj3euTtEATA8AgS3ExtdCSmgO%2BZlfMbnznc2tdmz6qQIYNa6ZQRrXv%2FH4edQVzoHXIL3mMGCGnyelWzkAYC4kUG8z46OFq35ZS7WhCToZzzjHE0pwUKs%2FVXDoWiag7HHXzzpmsj03P8A7dj8PCdiOP8N9Q9s9ENDyHQWjHCrgnq9OEYPaSnqqJp9sCODFsb93RyAbWFMsYEU5yzdxgIPHI1ZqCYLjzAI%2FiJRUtQptcrh8g%2B2l%2BDsvXoi%2BEPFgKSO9A0TNMPVqN9ITyjJ4naYMzEDHWYsq5CdEiZ9XaFWYq6DqNqHDgwBTSSaC%2FJar2zY0geMZloytwyRXLatgSl%2FYC3WFTPKXFNNT%2F5N3UE9AlPblMEcw28XKzQY6pgGuKufaIjrB3CNR4oJl9IPvHXrKMWPVAr6j1ylqZZuU%2BfbSS%2FJNioNR6dY5LdNytJDN7sfljUAEuH1ONutKv%2B1Qf6Z8AkxNzOH4yHRkSqHl0zqmR%2BT1xDV6WnRDiugR%2BmRdWEFyNUUV6A8WTI7Jr%2FPSFny420l99fqWtj2RYEPz592%2BStDZPPwINXtNyhdU3tXTncBBMplr0t0B9ZGgK8VZzzYEvoMW&X-Amz-Signature=c1725838963433e8af21531421b2cfec728cefa68e89a3ed62aa0e798868837c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TNN4VZKM%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T122758Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDipD1Ao1bPexLy61pBYzHSuULWW6ipv44H63zYlMMiHgIgRN5IueMhHME7dhUEUn%2FsP8WUL3xBsRtl7PxbAo%2BqCGQq%2FwMIdRAAGgw2Mzc0MjMxODM4MDUiDGkn1rMUUMy2MSlNQircA0df5hRr1SjFmheklwXiPDrhwkTbqAK2Ne24BZzvjRQpTrSdAU0z0bC3vVqlfYdbvpyQ79mUsLBy8Sjnm4v6heU4BRcZ42W7moJbokOPnRJNqOSQ%2B4BUwIpOMtEUxxm0aksKlBt%2BOdon%2F9%2BQIARJBu32SPl3vNOCaSNrrZu1cj5KEYUE52iTZGdabInyE85nGgYNLLEtmd9I1VjFPkOzGDv7t8P42GkAUIApwr95%2BxWtlm066NX6oFMqeaoMpO8Owd%2FTOxrSMFkxhSi6kmLkU0OpFCTj48CKHRAyZgrhyxa7Tf%2Bpq%2BYk4DllGyAATkjt6LkQlCzO%2F0oSryPAnXSzpdFj3rlqcQvwYcjHiTvHK7Bq%2BpOXMUEBikNOmth4umwAQQBTUxLh3V3eiK1kNKtCqXaMd2Ze7wh56fcc%2F3DdQDjUhJ45vCxZsarHgI8xUWy7pl4b1hJVu2WnZO24jKPSt5ZMiEBgTf4eq5pLdtlXjJP01dRpnWhJXZYk2WtlaqZ3BZwpGsW7fbRYWSn0CZAgTlGZ5U0tGFfSPPv9w3cNlASkl2RHW4j8kV9ds5lB7so0hJ0Y6%2BYa%2BAGenFb2szvnfTBYp6U5dwud%2B8BUlB1QcmwfMgUG%2FIA8QoqUj2vDMOrFys0GOqUBLWCyPWG3csq89Emo9wHKp09iGsxZP2FvW5PgZe3Jw9YBgJYio%2FmNk3doVjr9LzxdgIA9VrpR4lUgF5GXu4iovlIUl8cct8fNj4OjNIqZmr3gYQDG7jVdO8055qtvxpoC4claRvYjeZz%2BIuDL99u46aSFYVDaQUPdHgdoIVMGo8znBPJqGzBowy9vBvmU04YYpjPtE%2Fg785ugiUT0l97VyQKk5muB&X-Amz-Signature=478dc57b54a3f3926b44ea5e5e60dcb1e92d2ba36838d32aaf1b46581bda1e9c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TNN4VZKM%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T122758Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDipD1Ao1bPexLy61pBYzHSuULWW6ipv44H63zYlMMiHgIgRN5IueMhHME7dhUEUn%2FsP8WUL3xBsRtl7PxbAo%2BqCGQq%2FwMIdRAAGgw2Mzc0MjMxODM4MDUiDGkn1rMUUMy2MSlNQircA0df5hRr1SjFmheklwXiPDrhwkTbqAK2Ne24BZzvjRQpTrSdAU0z0bC3vVqlfYdbvpyQ79mUsLBy8Sjnm4v6heU4BRcZ42W7moJbokOPnRJNqOSQ%2B4BUwIpOMtEUxxm0aksKlBt%2BOdon%2F9%2BQIARJBu32SPl3vNOCaSNrrZu1cj5KEYUE52iTZGdabInyE85nGgYNLLEtmd9I1VjFPkOzGDv7t8P42GkAUIApwr95%2BxWtlm066NX6oFMqeaoMpO8Owd%2FTOxrSMFkxhSi6kmLkU0OpFCTj48CKHRAyZgrhyxa7Tf%2Bpq%2BYk4DllGyAATkjt6LkQlCzO%2F0oSryPAnXSzpdFj3rlqcQvwYcjHiTvHK7Bq%2BpOXMUEBikNOmth4umwAQQBTUxLh3V3eiK1kNKtCqXaMd2Ze7wh56fcc%2F3DdQDjUhJ45vCxZsarHgI8xUWy7pl4b1hJVu2WnZO24jKPSt5ZMiEBgTf4eq5pLdtlXjJP01dRpnWhJXZYk2WtlaqZ3BZwpGsW7fbRYWSn0CZAgTlGZ5U0tGFfSPPv9w3cNlASkl2RHW4j8kV9ds5lB7so0hJ0Y6%2BYa%2BAGenFb2szvnfTBYp6U5dwud%2B8BUlB1QcmwfMgUG%2FIA8QoqUj2vDMOrFys0GOqUBLWCyPWG3csq89Emo9wHKp09iGsxZP2FvW5PgZe3Jw9YBgJYio%2FmNk3doVjr9LzxdgIA9VrpR4lUgF5GXu4iovlIUl8cct8fNj4OjNIqZmr3gYQDG7jVdO8055qtvxpoC4claRvYjeZz%2BIuDL99u46aSFYVDaQUPdHgdoIVMGo8znBPJqGzBowy9vBvmU04YYpjPtE%2Fg785ugiUT0l97VyQKk5muB&X-Amz-Signature=478dc57b54a3f3926b44ea5e5e60dcb1e92d2ba36838d32aaf1b46581bda1e9c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VLY7YTDC%2F20260312%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260312T122758Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIA%2B2jF40zdST%2F8iU9N01tQCeISg5D393%2BZeIsNcj6wKvAiEAsupyRNB3MmNxPqDQ4Zg3U7zECbxoF%2BktCggKGUy6OnUq%2FwMIdBAAGgw2Mzc0MjMxODM4MDUiDDjhOL9v%2F%2BPqACdmyyrcA8P%2FX4K35NUTWGOnJDtYDgSb37Dfjz5t7KNEa8jm8G8e3nSZvtWG%2FxMUbv02ppgLBfDo1wRvKdDozJhTXqymzLBRVTbG0l05u1xweCQbvzMnq9sEQc%2FW1nxHmLyqbygsp9crS5CzKbj1HhKUK1rKUkQQmr%2Fj5TlCE%2FCbbDLc9M5P01wh39sk5e3KPN%2FIy0zZCT09ZBlOL4imZ0DBTHjEqkXKvbbkSDOcFlpWsjeOYkncoi9SlFkpy9TDHXNyiQWWLYzexFKd8rMLx0OQ3TURxRz%2BXrh49jqJ7RpaV1UnCoAr1cMWlDwTsjuzTaWrZrG02woe906KQVQOnya3kyC3IWRf4YVQ8fvXzh6FhxXZcRVrd097aJ5lBMi6R8TV%2Fic7iONwIBQuDT%2BUzlblSEgqa%2FVLSdlPTBuso1BGhY4XPj12HJov8wya95c7WBU0euY04%2FVtPGWwWCw%2Fa3vtPRzxKmscE7NWI%2Bpzwx6tSOPzKv7MEY14tXpY6jm3qNdnsK9Q80i3ReT2Qfmo73iVs1EP2z1f3Nbf64bWbazeFpdxU2r61ep0ptfWrlC6PvQATqiIOpBPayLs4S8rzrFDNuB9lykUVl0nzKWZhbeNV8oOJLv45JxUud01VQioHAkMMKDFys0GOqUBjUBOZa%2FCt%2BH8%2BLQ0thUWTXaHnpBdZ108W2CPtDXnRFHkfgYgcYnqQiKI2amDXgLpBMZaBL89RRGb4fHv9U4IWyRtUO0%2BVIq0hlWktxiUwfzrMcMQSLT3FW7D%2F%2FHt5mj2OD78lUombWP5KU0Ai4TibBe2fVXU70HkW842246nB0q1v6X%2FDruL4y9e7blnKGFgbt66V5B3Ux%2FuczfryxpQjAw%2Fnoyx&X-Amz-Signature=790829db73fbc4742b4c2bcc892557e53cfea6c364d0f18008c3cd458f5bad1c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

