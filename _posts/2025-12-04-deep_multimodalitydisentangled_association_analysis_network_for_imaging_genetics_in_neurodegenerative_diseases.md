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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SYOWLBIS%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T063411Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDZmcw78WhcOseB84eC4Y5t6lH989zDv%2FH3cGyZHkzOMAIgYeYDWNOdcf5RJsE8PRaqBDZxKHgX5GD3wSIImLV9MMYq%2FwMIXxAAGgw2Mzc0MjMxODM4MDUiDLkquVLZa0VV8Wvn5SrcA0dVjephlli%2BWqWebFJbR32Xz600poUOQV5utMbCGrN9SQpO4J5rBdZhZ8PJhNoN5Q7FMWp11W90ZH5iSyXZH5AZEB5MVfrAxYEK0Xeix5KmhIHcWNW9k%2FsX1%2FOnuQUk0FDM%2B3EfRGxK213Q%2BzNtA0fUW2Vx73Ubly5aIRRObK5jr%2BYneif%2F%2BOop%2BiKSqj8QUC2QcJp4AzQeQKrZvIuisn4WCRojDgIy%2BkDM9LV%2ByRGhJPhTZs8BRg8C9liqJvkcY0Y5P2KCXHKm1YxFCbRcrc7%2F3oY2HXCqeAkIixGtptjxefBxCulKN5A41Y2QJ5E8iDEhC1jugz67E2Jqw%2BM%2FAtdjC1jqRaY4eEK9h2PxKuo31rwEYajh6zBqzrqFaOhMqylrLCxTmz3R7osIel2DL1OJo%2BhZnXANKyRJssEYgSiPbG3WpNxdn3Hj%2BUMNu40sNcVV6OHujp4jwU2zfyvxv3A6McAis1rDh2ExsugcowyV3e4oTe%2FtC1kxPJD42gn1eeJk4k8ErjBvWXf6MqiF7ThMug0hlEKaI%2F%2F8NVsyNSP8f2xMsgBP2%2B2HoVHAqWV5BeWYR40bNh3ZrOw1GlBQTvd0VdZzcmhiVqx7gRzAwPfEu0VuWFlAC3O7tHeeMKuI%2Fs0GOqUBx25Agu0udWWuUiL7ynBS1hGQtViRvAiCiDn3oijj%2FfCl261qu7G4cINMMvFK6ylkk0u%2FWQg%2BUO7V8NwsejTgLIlccmdbj9fYeGhNOpzXxXsjLarL4GHa47u%2BWmiJkDM%2BUyjiiWu9MQkX8owTlhdAK%2BAGovfnMbc%2FUnSXcNiYLZlyO4ibG%2FBVFj2j9LZ588%2FbzKadXc7xC0PNgYzdPOnsGfzH9qVl&X-Amz-Signature=c0e91b9d588bd4e7114824b8bc2e47942f637e5de2416ad03ec4dae4eb494d40&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SYOWLBIS%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T063411Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDZmcw78WhcOseB84eC4Y5t6lH989zDv%2FH3cGyZHkzOMAIgYeYDWNOdcf5RJsE8PRaqBDZxKHgX5GD3wSIImLV9MMYq%2FwMIXxAAGgw2Mzc0MjMxODM4MDUiDLkquVLZa0VV8Wvn5SrcA0dVjephlli%2BWqWebFJbR32Xz600poUOQV5utMbCGrN9SQpO4J5rBdZhZ8PJhNoN5Q7FMWp11W90ZH5iSyXZH5AZEB5MVfrAxYEK0Xeix5KmhIHcWNW9k%2FsX1%2FOnuQUk0FDM%2B3EfRGxK213Q%2BzNtA0fUW2Vx73Ubly5aIRRObK5jr%2BYneif%2F%2BOop%2BiKSqj8QUC2QcJp4AzQeQKrZvIuisn4WCRojDgIy%2BkDM9LV%2ByRGhJPhTZs8BRg8C9liqJvkcY0Y5P2KCXHKm1YxFCbRcrc7%2F3oY2HXCqeAkIixGtptjxefBxCulKN5A41Y2QJ5E8iDEhC1jugz67E2Jqw%2BM%2FAtdjC1jqRaY4eEK9h2PxKuo31rwEYajh6zBqzrqFaOhMqylrLCxTmz3R7osIel2DL1OJo%2BhZnXANKyRJssEYgSiPbG3WpNxdn3Hj%2BUMNu40sNcVV6OHujp4jwU2zfyvxv3A6McAis1rDh2ExsugcowyV3e4oTe%2FtC1kxPJD42gn1eeJk4k8ErjBvWXf6MqiF7ThMug0hlEKaI%2F%2F8NVsyNSP8f2xMsgBP2%2B2HoVHAqWV5BeWYR40bNh3ZrOw1GlBQTvd0VdZzcmhiVqx7gRzAwPfEu0VuWFlAC3O7tHeeMKuI%2Fs0GOqUBx25Agu0udWWuUiL7ynBS1hGQtViRvAiCiDn3oijj%2FfCl261qu7G4cINMMvFK6ylkk0u%2FWQg%2BUO7V8NwsejTgLIlccmdbj9fYeGhNOpzXxXsjLarL4GHa47u%2BWmiJkDM%2BUyjiiWu9MQkX8owTlhdAK%2BAGovfnMbc%2FUnSXcNiYLZlyO4ibG%2FBVFj2j9LZ588%2FbzKadXc7xC0PNgYzdPOnsGfzH9qVl&X-Amz-Signature=c0e91b9d588bd4e7114824b8bc2e47942f637e5de2416ad03ec4dae4eb494d40&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSQWKIQP%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T063411Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF4GX0naYai3tdk5orsO%2BvtjBnhyaNAHe%2BLXynfKMR7gAiEAwoJlNY3kEmrdejiwRKebocPQ%2F3h1YCCNJzf9ic8niYAq%2FwMIXxAAGgw2Mzc0MjMxODM4MDUiDB1gD3QxlssRlHzUSircA4PbF5CXKnuZpHLBEYuwyvZabjMiOSWgau1BoOJHgn6ei3FDXD6ecJddDwQne14%2B%2BQowga60Nak8LegkSaULfD%2By9spLn3IwuJMpajaKPew1cTVLKbpJrWAE7t9n2sOUxcT9dwHMvepgUhkmYhTViLDnFQszySB4irsDavcuCPdyfJlkbU9apxNa1nKkRduGS7055QrRWrpHEKxZHuTp0JPBdadGJAHas54i78MK%2F0nDgnMaQ37Dj2rNRpUDcPqLVHFOtFDQaIw5u4PGgSb1LwJ8hvPG2FcX34rLbmihCo5St5foq65FyVfZD%2FdBZBUyDjtRgEKc0LJ0t5gD%2BS6QPNtch7YeqHH3C3oOVnfS%2B6%2FYGuHvy2v3k7UMD5N13FVzjXcF8Z3SAReWIxLoxSi5OzZ%2BNAT18q1iyUJNTN6xbQy%2F%2F%2B8Wi6l3CI%2BSMEQTvKkDrTeFQuni7r9KBltpXOR8m5QWIq3sBqBvjPfkgn%2FAaiLfvuw1MUAbs5dpcpqbvbxpBWd8js5l%2FMmmEWkisv3No5MwATFOVXizN7MkoTTx%2FjUX7K1CG6Rq67sliJdc1wRoSChqDxqiG3fYL2K6l3g%2FHxYsetEAH1HXsEYiovMzn2Dmb2lM3GtFIjwAsHfkMJqJ%2Fs0GOqUByCguw%2BSe1LwElmfgnohzI3xZ%2BjbrZbYDIx87ZA5w0zPf0ab94X6t2QvYLbpEYH5rGxSH4y1f%2FVOxX%2BHrN6ab4B10CAfCOZEBwOleSUcgg6wVJhWxt5S6tyRD%2Bwrv6QzvTvBHZc3GvI%2BtcgU8U5ii56D%2FVkuV7fmy%2FfXsvmhgbNLyTglo5P3LLDdgeznjjnaU1uYZSbVU19bttWUrV8aTDx%2FyBbw%2B&X-Amz-Signature=d804ee4bea4064083fca30f0c4ffc1e34361c13f811e98376f12cd0b52305900&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XPRGD572%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T063412Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCHggRTlEA730SqgGHa39KcxrJQ9WEUqGRVswBTpeXU%2BAIhAM2ikhpMUYyrVSrdeU8WCHYypLLWMcCP65v2guHWXrs6Kv8DCF8QABoMNjM3NDIzMTgzODA1IgxKUk1BH242d29xxwQq3APM9OgDW%2FpNBHdwCS3spXwNdWIE5vetGPNVKlNVJVLBlbiNlLVofOFdMXQqqNSOQOrni4dHaJv9eSeY1IzxhRxC4zws2CovKuOIiBdDbx7c5MEFZMiXW1LI9ZigwfvD04ala3tbhD%2BVXUm7IJSnEvJAZuW9iscRazKGmQKIt8awcF3mQDzXyINfCsrzm5uiyvaE39oh9HJ7DG%2FcU2uNJFXAMSTm7PHmYef404OL2SWQsWoMmUO33wT6X%2BclXaDnuBk2tdbj3XMTlzZhl4dz34ZOSZKZlHCJJ4b%2FDBTXk%2BdXqlOn8dQeI4iyqEdXr6fh7pr470b5A3r8aHyhlABNOxTlkQrtV6U%2BQK2YehDku%2BHsJ2i%2B7DPrbO8cDRffBY5aBW5lgBW6uhLK9UQ7f4UZNW2gWIMrk4dEVTlIU1xj%2FJqEIA%2BSyc4An7YHFyJsOoR5ujKGsE6siUUVRaWND3yzA96mPOAYRmulTe3wGzeY83F2VCWjxcGGiagHlN5jh7SwMJdizlxrpINazcptvo9PtCsDOYedmdIuqZoVyO3VZnmAOQoxDb5D5tyUuKJYCrWGayqBADnFSuvn2y0sj0NRNXunrwEcBe3qaebqje9ebKF4DLOTsFJJTOTJbsfDejCoif7NBjqkAZ9Q4WoKyHFlFJ2ghyjJEArfSf18a1FrWNVIr4a02sxWCv3zW246SgtUHJpwytaaod2anOvA2rWDrrxONj6sKbIMXxL2TSKar5vfT9ugsILyLlb4WPsPBMyZlRNW5njzUEwuos0b5ZpezwRGj%2Fvb00byQgcJ2VS2EmqNtekGQurbD6im0GXuzoztq8ZIN2kGht32RXF04tveDAte8XPlpTCvA9pD&X-Amz-Signature=8aba8cb106088acf7f5d32aceb7ae91cc0fcabd3df4a97f39e32ad260eedb363&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XPRGD572%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T063412Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCHggRTlEA730SqgGHa39KcxrJQ9WEUqGRVswBTpeXU%2BAIhAM2ikhpMUYyrVSrdeU8WCHYypLLWMcCP65v2guHWXrs6Kv8DCF8QABoMNjM3NDIzMTgzODA1IgxKUk1BH242d29xxwQq3APM9OgDW%2FpNBHdwCS3spXwNdWIE5vetGPNVKlNVJVLBlbiNlLVofOFdMXQqqNSOQOrni4dHaJv9eSeY1IzxhRxC4zws2CovKuOIiBdDbx7c5MEFZMiXW1LI9ZigwfvD04ala3tbhD%2BVXUm7IJSnEvJAZuW9iscRazKGmQKIt8awcF3mQDzXyINfCsrzm5uiyvaE39oh9HJ7DG%2FcU2uNJFXAMSTm7PHmYef404OL2SWQsWoMmUO33wT6X%2BclXaDnuBk2tdbj3XMTlzZhl4dz34ZOSZKZlHCJJ4b%2FDBTXk%2BdXqlOn8dQeI4iyqEdXr6fh7pr470b5A3r8aHyhlABNOxTlkQrtV6U%2BQK2YehDku%2BHsJ2i%2B7DPrbO8cDRffBY5aBW5lgBW6uhLK9UQ7f4UZNW2gWIMrk4dEVTlIU1xj%2FJqEIA%2BSyc4An7YHFyJsOoR5ujKGsE6siUUVRaWND3yzA96mPOAYRmulTe3wGzeY83F2VCWjxcGGiagHlN5jh7SwMJdizlxrpINazcptvo9PtCsDOYedmdIuqZoVyO3VZnmAOQoxDb5D5tyUuKJYCrWGayqBADnFSuvn2y0sj0NRNXunrwEcBe3qaebqje9ebKF4DLOTsFJJTOTJbsfDejCoif7NBjqkAZ9Q4WoKyHFlFJ2ghyjJEArfSf18a1FrWNVIr4a02sxWCv3zW246SgtUHJpwytaaod2anOvA2rWDrrxONj6sKbIMXxL2TSKar5vfT9ugsILyLlb4WPsPBMyZlRNW5njzUEwuos0b5ZpezwRGj%2Fvb00byQgcJ2VS2EmqNtekGQurbD6im0GXuzoztq8ZIN2kGht32RXF04tveDAte8XPlpTCvA9pD&X-Amz-Signature=b1108c549ceea2bec61bc3c51c3ed8a3e102183c05f0f7ebcfc8404c2fe55f82&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SYXLPQGM%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T063413Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF112MHGZqsaJvkmy%2BqhfWTOduNZaOWel7UZh%2Bm33U%2FmAiBLg43yfORg8FQbjBg7kHVdm9vLWMDZRyHnNCnzY2w1FCr%2FAwhfEAAaDDYzNzQyMzE4MzgwNSIMcOi%2FZ3lbdfcOv2cfKtwDHhkF6Kruj8oGQC2PkWuNpMfHXsB335syhw%2BCE6VJ9YJz2x40BzoOG%2BgZ4XLtird8twx4cQpAVByaVdBqzptmmnsQCYrvP02J0Zpa9cdRwrW5EOxNpsU5y%2FClQQ3n14WVTToeBwdC7E8Ovx2C7E0curAqucCtUeQtYJvsdl8lv78InghlTCRdGK79DujVWXbWcId6HuNw5KfhORD%2BIIZyiKpybKQlqfntWvysCBDEWFdav%2FiynYDKccon%2FgGin5PEyVs4y2%2FCqELUGlavBOolmnLbq9zQkPEf3%2Ff%2FQgkeyfI86HV8K05UhZW2dhAGggIM8bRp%2BQk%2FMYUnkHlLDdNAQGwBeSQK1%2Ftx5eiSvfwv8JzYj23Xw%2F9trqx2WULFfjIjlg0%2BW8jEc3pE3OuXdDO3OzW17KWJ18GiWY5i7laJsGu%2BLxBk3roOkZNbdUbcq2LhpeCb5aOXxu70%2Fvgzk7uHyamHavY%2BYfvqdOkaZEhgQTVI5B%2BldYSxroDpE21pKAClyFo3YGN1z7u3mYqESR8qQPsZVf3YasvYQxN20ksyb7hdLPvN9DDewPRRqssEv7zwlrDYENj%2Bsjv2uQUdopt%2BOMmvomc9cwrYq1HIG7ObuwuxyKk8tAoNz4wMf9Ewm4n%2BzQY6pgGf8v1YfjmAmTyFyijicpl8OB96GcjN3nAp3JH8FHhxUmMstTWEirjVo1%2B234vMNN%2F0uPrDLGg1MGyEJ3W5MybE6%2BnHmkwiXSbz%2BO0kOh3OBo5LWiOkaRasWRfthGmJZMkNip4K8JAkMz5Nl6UHHjg06WsEfdbgXlwD%2BeUiag9OaHEbdL%2Bvf8%2Bo%2FUUXmJtiwKxHcc%2F9l359oevkDodxlI6tZulEQWHH&X-Amz-Signature=1cfa2d1e9c57188f6eb812ea101cf5dc87a62baa2b0462c58c2bff09fb050eea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V4QAJBSE%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T063413Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC%2BSctfDRcamRRSb85H1%2BrGprDZl%2BQhAQrFQQZECDTb1gIhALve%2BavT0lcMYp5A9KOW1g7GhrOlKrCZMaz%2BogGuv0ryKv8DCF8QABoMNjM3NDIzMTgzODA1IgzuwaVqFdOxBSPiTeEq3ANJ95c3XvoilBK27r1M9WRl%2FGOqAMUGaKlAAn62rWV%2BCONYhPCvOBS1vIF9rX7odKrO%2FBE%2FF7eI805aK1912Av6AGN9drqsefMZLnE98r8SY0awTY5BK5JNvQt4xWuewPbITtvS7asFrPLqGktk3vlcTZ2VGJhUyATluUCUXk0XLu4W2JtrYTSG7%2FfD0vpyjdq9R7UAzDW4OoZYtdbTEdcRFEeSjBleHUB5Vf%2B3KPaPrCypiDxE2ooDQIsNtSUFuhBwH6vjYDq2jS4TfSNqRTUr2az%2FWAi%2FVHBKBKc6KHywS%2B9x1qbkzzYfKp08t8l0uhJVZ4s1yjkdpoT521K21rnLY12luWVeETehZh%2BA0Z2BP7mF0dR1JK5rr5O3zhMFwsRF0WxT0r6LrRZQZV6%2BOHl3Pfw2ib7KPZB28u2wAMRvCXxftW8y9XO2tZe1LErDR6ApMPFoDmtKZ4KSliYxMOV3%2FGVti2%2B2BLsHKdsI%2BAIhJmCaknjH22B3wrP4RRJTp6E56eSXw6xuMK47VkkLl30V0cwnaKbUiVtLqx350JAyRyhj0Ns%2BdU23uh1iOSB7ixbCxPTkQVtk5%2F7MKE%2FQEagU20ctYQDiwTWzqyZGgzd6XU6%2B8EqLIkI6KFvOSjC1iP7NBjqkAWDr0dHbwxOLXwzqKeaai4hL%2FbNdgV9IGHcizcyw0pfhJxr0%2BuY6IgPVSItTcMD0YUKbn2mPQFy7BJAtfGSJv3r3Y1oot5BxAWKmu8emEmGs905gbOsXZ9%2BKfiag%2FR7JYqseUv7b5h%2BIEBWoacGjpIywdGDZhJuloXyu85csC%2BZ498xHOk43q2xKYmS7PYEIvNhiWGHJIA3O%2FpjnyuOoF9kZSxEb&X-Amz-Signature=70767f0b6fda7958093d659410c6009adcd6b63c73e65c95b2ac6f48ae6a6e65&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZNIVV7UG%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T063418Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIES3rTAYzQB4GZJvyDGxof9Pq1IMsLfbQoQCu0Hn8FPXAiEA%2FVIzCacyZPRpUoMzKe6icIN8qs5guN5eZ8Ma73qKOMQq%2FwMIXxAAGgw2Mzc0MjMxODM4MDUiDCH4ia%2Fj6Vlyysyd9ircAyGrkJhPotyjP5uyyGVtLDMzTaJ7x07e8PgZNa4ktukGdW%2FAvEU7DCkuUZswfAjUFTixte9mZVu0EaBj2ttES41rllWE8cyqPnH5ra3lt6gPP%2BOB9RmpS5XZxOSus3bcFKB4gB4zWV0bb8v0nQmF8qTw9PIfflqwLmh24Q5B2EIwBqhgJ4xQ2ee%2BkTeqteLGmJTeUNxDTgtljea9%2FVWyMMJ%2BdwD5JEGxXGAq99y14anEDUQ8M665bslJOKBXKT5uaRCrilm4asafkXeUMnxwTDWph3EK24X5cgYDB%2B6lcCXgxdtY1O971JGWB0PHCtfgTFYJhIsb9erCYVOEjowKrSwv3qkvz%2BxFhFHsLiOChAILpUGrrIa%2BATa%2FPtOSeJenb6LibMqjFxi%2BeozoUBVLKXWJrySer1zYd9nmNXmJED2RDg4MqmBY%2BxLJ%2BDdzwi%2FQ%2F9EjnBm6vSLAh0d6lc%2By6IXegCuJsfzMzZ7dFRx3v%2B1cRNVZTIszf67G%2FkgY6GEus1%2Bj%2F1NkkoaD7aw0fnGHu76rVHAJUvIVmkFYjxUh2YII4jrMTM6QTuVb4N7E3iYfJ9qcyLVbcPpG0O7JKfXAwRxdhe3FJXcXNo%2BlaspTyl1pxweScpLL70o3tttxMIOJ%2Fs0GOqUB1aaAwhPfJkHi2nBUAqiuwImQzqXBYqE6tlXO64W8qItJ%2FvRwLZK0%2B5PnOwZPo9kfsX7479yl82xdMrnV%2BkMi%2BdH7Prvc8QoJkF%2BuX%2BTzcUyvGfn6MXXHz3p9yITBjhBuGZ8RX9b20h36rSG%2BAjWXAAMPToMtkX6AUhuVJadhq2gkq5%2BLh9NxZ%2B4e5%2FmCecXFvbPKFzPvKXp2xcB4vWyditVFAZzm&X-Amz-Signature=53dc8a169c7ac4c286863ed8ca2d4d7e6c6df7230af3125f3d8c7cc29b9ca525&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y5L2A3IM%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T063421Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCDkY13GJvCw3MiaF5qRUUoXWy%2FPnO%2Bri6vGWe3JbIeHgIhAMhFJr3lgmuPEX95sLiyXtZ3ecLuD0eK8%2BtRFn%2FMNDi7Kv8DCF8QABoMNjM3NDIzMTgzODA1IgwHjhtk5Ux20BOsWeoq3ANzEEuqIu5L6e4N%2BOVwa6CftJRsajalkV%2BZJEEmyEGlmSE3ZTbAdL7y%2BChiWsAQ72kI37zZOIteKUdom0WnECelOE%2FpCyUrm1Zb6DQ4XO82CnxkvuGmjZUs6ZJdgdEqig7uPS1ggmGWL%2BUYSVDYTOAOdptxEQZmhv%2FxzqwsQ7GwUbNzAjyBXcUfsnkVQxqVksTu7nIQGGD7owXPcSBkY8bDCHAKFxts8pgjYt4yboR8Oc98J%2F3z3DuZM6mj3Duh3CbxQf1kPkSlar6tCmFodgrxxWDpigREFxNtfXaS827XhwqVRZSYcB%2FC2E4jLa9ro5LsyGJTDLNHJnGfxndJdivayt1hhGFaFivzWg%2BzUWUi0oNKaaMMraU1XdlsXhm9ri%2FFiwqnwY7Z3SCYes%2B2TPwCnm70IVq0Aoo3pPbD4t4Rp77eP25xFiMnrK8vCxK%2BRo1Epc5L9L1c%2B0CIh3X3Jz5buIHeAnlZLNg7ikNF12qkeRca1TdvC68ZTu95hhUj3sqgpJKAetxVwxXu9C1SZwDoXyI3kz3lBJwRtu2YUhnTGTLq0HtI8LlD22R7nhjdRAxBuK4YrcKb3%2BX8wGFhOAEgpahPumeE5V4ZWeourP5BX76HNkCQh57uFVnq4DC7iP7NBjqkAciXcY37Qrwq74BA%2BHbPP5f8JFYXj5bZcNJ87Llw6EYzxYmuNmBLdYeW3Kz0rS1d6ljTYMN0Evbt%2FdeepopBHsAJSH6DvEM28pH7nDXtSFWFlsMlhZsESgdH0Xmi1k6T4RwAYLXKzUjX5L1Ozu6nizjMEpqQ%2BwoulkhTLav1qhQhlbceuSGBqlNPT%2Ft2V2grbWXClcIffChd7Ac1DoY6Y232wI5J&X-Amz-Signature=035b165ddf3dd58479705ff83e4462d6008bdf00518107b5181545e1665471ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y5L2A3IM%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T063421Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCDkY13GJvCw3MiaF5qRUUoXWy%2FPnO%2Bri6vGWe3JbIeHgIhAMhFJr3lgmuPEX95sLiyXtZ3ecLuD0eK8%2BtRFn%2FMNDi7Kv8DCF8QABoMNjM3NDIzMTgzODA1IgwHjhtk5Ux20BOsWeoq3ANzEEuqIu5L6e4N%2BOVwa6CftJRsajalkV%2BZJEEmyEGlmSE3ZTbAdL7y%2BChiWsAQ72kI37zZOIteKUdom0WnECelOE%2FpCyUrm1Zb6DQ4XO82CnxkvuGmjZUs6ZJdgdEqig7uPS1ggmGWL%2BUYSVDYTOAOdptxEQZmhv%2FxzqwsQ7GwUbNzAjyBXcUfsnkVQxqVksTu7nIQGGD7owXPcSBkY8bDCHAKFxts8pgjYt4yboR8Oc98J%2F3z3DuZM6mj3Duh3CbxQf1kPkSlar6tCmFodgrxxWDpigREFxNtfXaS827XhwqVRZSYcB%2FC2E4jLa9ro5LsyGJTDLNHJnGfxndJdivayt1hhGFaFivzWg%2BzUWUi0oNKaaMMraU1XdlsXhm9ri%2FFiwqnwY7Z3SCYes%2B2TPwCnm70IVq0Aoo3pPbD4t4Rp77eP25xFiMnrK8vCxK%2BRo1Epc5L9L1c%2B0CIh3X3Jz5buIHeAnlZLNg7ikNF12qkeRca1TdvC68ZTu95hhUj3sqgpJKAetxVwxXu9C1SZwDoXyI3kz3lBJwRtu2YUhnTGTLq0HtI8LlD22R7nhjdRAxBuK4YrcKb3%2BX8wGFhOAEgpahPumeE5V4ZWeourP5BX76HNkCQh57uFVnq4DC7iP7NBjqkAciXcY37Qrwq74BA%2BHbPP5f8JFYXj5bZcNJ87Llw6EYzxYmuNmBLdYeW3Kz0rS1d6ljTYMN0Evbt%2FdeepopBHsAJSH6DvEM28pH7nDXtSFWFlsMlhZsESgdH0Xmi1k6T4RwAYLXKzUjX5L1Ozu6nizjMEpqQ%2BwoulkhTLav1qhQhlbceuSGBqlNPT%2Ft2V2grbWXClcIffChd7Ac1DoY6Y232wI5J&X-Amz-Signature=fafd091ea01f83f5c99764794c73ff992c30553cd76360d5cbd39f1ad14ffabe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667X6JZNHD%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T063408Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIH4pFZQNBUWkAsuneWDD42l7pAj%2FiodHO3pRN8FQsAzJAiBIiaDeUpodi57Z5%2FswhEuqN2qhi6ihtAEZxZbL%2F59yjCr%2FAwhfEAAaDDYzNzQyMzE4MzgwNSIMwyQaa9rMeJa%2Br7Z9KtwDWI5SqTu%2BsMqTL2oDmsQEdwL5U0IRY4zNJDnQvhOuPSwsIXTf1r6jJKF0Bdp7Z1n5nmoa7Lp1bFqwUcTGEJHZA4lVqKXeTSL8wsiEMipB9Y9DdwmHgH5qjKGkcEeTcub%2F9tgE6p6NohrF6q7USMSrGvRzCWGVbH3YlpRLn0%2BjGqf7%2Bw3k6eWYi4wsBsxw2dBfF36tMsRCCQKgz%2FccQATXT9H27EVQbX%2FLif7SywsRWPocnTtI9ivdxVHqSIyg8j6Qp0zTNJOkTbmshwH%2B1Lu3DQ4%2BkrT3Cn%2FDu4ZUFuvLnhwfMxxHCYbZkwzrOrSofD8if5hS3X4EVJhJFPA6b75v1ERXXzcqeaH%2BhZLU0y9N7zV%2Fq%2BmXHssbuyYNwN9ViNRJxSryQGBwlGl9jEAXpPEhnopHgsCfhY%2Fb%2Fpta8yDrz4OanNacqyyu%2BwCWdI4H1Co%2FqrdDwCc%2BlKwHlezS6Q73goqzB2BbDM0XiqQkgJpXYdNHvj8KQ3wYYODJwf7kk3Qr1fLpMW8UBt%2FQyy4Qj7DoBlxZFS8QbpuvOd5e1g6WVKK3MSW91%2FE4vZr%2FqzuASZj%2BbXD0ubo4rv2vSUnXH5Qi%2BuXum4TC%2Fsxg%2FaOfsWORRy3%2B%2F6NY011L0EHs388wkon%2BzQY6pgEY0p3hV4bhGmZuXHpbHSOVgW9l%2FobMw70JxGvenpc8qPq0HQHOhnxuHjdIQeC2kDZofupvWes3sOpWF788ayOJ5pcTfgfJS5TNtsH8QeX7jGo%2FDOtBjeN3x3Y%2BaZrAm35WkK32N3ynvk1nmSpYLel%2Fed4y2imYHYBmBP76TgD99svhMdYlIyp5zjlvFFXnCkNMBQ%2BKamiuqOR85%2FCRfnsekkxNrv88&X-Amz-Signature=9924ef952fffca777d7c4ea2b737d1b8834842edfc648a2695d4a4d4d4f6c1ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TQDGCF63%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T063424Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCQZ6dDtB0PdYd%2FOJMMVgTPJ6uwo3Wtm8e6R13Duqt0lwIhANG5nSQEI72EmTgWjE8G7db0XY8OUQfNx1qvaN71PGZ5Kv8DCF8QABoMNjM3NDIzMTgzODA1Igwb6tmuS27AbyKmk4Iq3AO3o2HCGGUF8cRlsYk6bD2YRZAJie%2FBpc%2F7khDZrv1488jgKmIP9Y6YJFhQPNLQawZt1JZOL4Aj2GaKAuxMAak%2B3LWYRB%2Fdb9wB6xV05Ch3ApdlC87gGv9fUG4CkejpySwxE0xlCCBm0WaqUn4NJwv7HmiyseH%2B2C1c3JRUKsT6pZJsHkbOzb043JeFLAS6hxSz%2FLd2aiR75ylcWMU3MYjr2fNP%2BxNeux3lAS%2FEj7v1NyyPkU3gr%2FljEyxczh6Fpq97pKC1T%2FDiVjhWgzxlgw8NM2mfCGaOzDFrwdswRF03q9xAxwQrF4HFeOlQVGAkgvEmEspePX0NvLKvyrOXIDNFsiCVhmClm41d0AFGO%2BjZg9%2BhIiUbV0wQT%2BxV3QW1pfJU9TH6Vas4SYowovu3ok%2BIp0Sn6LBaGlD0CRsTJFkTgabB6MkNX4ZsdZFpn2K1Ge8%2BTXRWAHKeYUhc%2BV2RA677WWA69BFMwDQpI71zGJInEGKAH4MRJJNrg4J2cy9rxDwDx4UVyZxS7Jnq5g4CzJtt2yIdw8a48iX1FdsZIyz0gkiz%2BbPP6vf45SGopwy6nrrIe0tPl47fcgHfNzF%2Bs8UbrUC4z76%2BoJAqIIoD%2FL3AgtZiowydkthNoLgO0zCaif7NBjqkAYQlDBsgPOEiB%2FN6MRSCTpBysHQ5QECA3IY8vzPAUOzXseZTWfN8Lh3DG%2FrGoOvvOom%2FreqJXX1UgCtMzvFZMm7Wlo%2Bh9YuBmcIygah9mP8RjWNzKO2K%2FI3irvhcha8kBxwUgulI%2BLf3%2FisIadcXAcqHNTUvXFlcSZr0vDT%2BNDKh0rham%2B2V6KNYaEfZDo%2FRu%2Fm0L7kez25Ck%2BELyaTz5pWaM9Gg&X-Amz-Signature=040dfb7a83e97ad9e43aded79c0632735989e35a6164feea7edda6b2478f4604&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TQDGCF63%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T063424Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCQZ6dDtB0PdYd%2FOJMMVgTPJ6uwo3Wtm8e6R13Duqt0lwIhANG5nSQEI72EmTgWjE8G7db0XY8OUQfNx1qvaN71PGZ5Kv8DCF8QABoMNjM3NDIzMTgzODA1Igwb6tmuS27AbyKmk4Iq3AO3o2HCGGUF8cRlsYk6bD2YRZAJie%2FBpc%2F7khDZrv1488jgKmIP9Y6YJFhQPNLQawZt1JZOL4Aj2GaKAuxMAak%2B3LWYRB%2Fdb9wB6xV05Ch3ApdlC87gGv9fUG4CkejpySwxE0xlCCBm0WaqUn4NJwv7HmiyseH%2B2C1c3JRUKsT6pZJsHkbOzb043JeFLAS6hxSz%2FLd2aiR75ylcWMU3MYjr2fNP%2BxNeux3lAS%2FEj7v1NyyPkU3gr%2FljEyxczh6Fpq97pKC1T%2FDiVjhWgzxlgw8NM2mfCGaOzDFrwdswRF03q9xAxwQrF4HFeOlQVGAkgvEmEspePX0NvLKvyrOXIDNFsiCVhmClm41d0AFGO%2BjZg9%2BhIiUbV0wQT%2BxV3QW1pfJU9TH6Vas4SYowovu3ok%2BIp0Sn6LBaGlD0CRsTJFkTgabB6MkNX4ZsdZFpn2K1Ge8%2BTXRWAHKeYUhc%2BV2RA677WWA69BFMwDQpI71zGJInEGKAH4MRJJNrg4J2cy9rxDwDx4UVyZxS7Jnq5g4CzJtt2yIdw8a48iX1FdsZIyz0gkiz%2BbPP6vf45SGopwy6nrrIe0tPl47fcgHfNzF%2Bs8UbrUC4z76%2BoJAqIIoD%2FL3AgtZiowydkthNoLgO0zCaif7NBjqkAYQlDBsgPOEiB%2FN6MRSCTpBysHQ5QECA3IY8vzPAUOzXseZTWfN8Lh3DG%2FrGoOvvOom%2FreqJXX1UgCtMzvFZMm7Wlo%2Bh9YuBmcIygah9mP8RjWNzKO2K%2FI3irvhcha8kBxwUgulI%2BLf3%2FisIadcXAcqHNTUvXFlcSZr0vDT%2BNDKh0rham%2B2V6KNYaEfZDo%2FRu%2Fm0L7kez25Ck%2BELyaTz5pWaM9Gg&X-Amz-Signature=040dfb7a83e97ad9e43aded79c0632735989e35a6164feea7edda6b2478f4604&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q7XYGCKT%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T063424Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGYO4UZ65tslHNj2jAy%2BkLdQNM%2B5loo5b1I4armPVoU5AiAwB4YNQ%2FEwbA5HBsBSwQjzkb9ZAd%2F0xNGpvIOkqTS0USr%2FAwhfEAAaDDYzNzQyMzE4MzgwNSIMK3wZzl6F2lVE1sPuKtwDgxUHTkwlWU1%2BCk6M80uvUkTQ50FXxfSjC9OvM5QlKPg3jADYpo9jBVSID09cuDGbrQpttrz%2BIBruvUIzgetHwnU5sveCBvk%2FUnS45Pe9WmZHOWjpXPbjJF3p8tgbYIzsJWOkF%2BnZj10pQpf5P1xfVlCshQA%2BljLUMODnmDRrD2NnegRs0Mo0cihq2%2BHnUiogZr%2Bvx%2FO4Dxwl8YXhhSqjKB%2BsyDIJCByHCPT7kI1wzY9FA2foRkTll0eLWutYCYNFNdysidK84uELBk1J9Dv%2FmTmxSrwf5f2weN%2B34Xb4SSXn4ptgDaeNgF%2FlCspUCndrOCz5IVTNYcV189g%2FN5TGw0DkdnQStv9kC7vE2waOkCV3pTP0l9e6fokOKZ9m1Sm3njjETbdTSCvEh7E5H188TsWVygG6%2Bd6knHeDPl%2B9ScLg0AWgNEe0LBxpmxPDko3wcBfBi1gzunM4%2BOacEdd0JJkDcDmFj5ehog0KoNZK1MgOXrami3xBaernjFu2g1IQURvkhbISsi36Q2A49nuBrN038rLH7DAJJ1gySnIuOpbAZPPkq%2B2p1dEmY3YS8IZJ5gjpH%2B5Vr8ZTWOrAh4F5%2FHLljbdmFHgGAaS8M0RudAmhhzDeqeKtLKF79z8w2Yj%2BzQY6pgEelyaz1yJ0I6R7N7WUJ0a%2F%2BHPV9tjda%2Fi%2BjXPjNLfyKM2r5Dt%2Fsb3M07J3Q6uwkvJR3ZtAcYr46zqgbaJpkfuuvfpD6wNyysEm7rUhMHgVKtWS7tk5VcQZ9I60py9tkIw2%2FNf%2Fo8SZXuMBSTUj7W1OW99oNIigAiKMfrUj4j5zqTWp4BZTDMDX3jHxNt3N1i3lBZp6NLf18yYuLebhaH9DzpdCcpv%2B&X-Amz-Signature=3ef6aec5c53df3f19787193e5190211df1ae7560706e532c889051db8b358853&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

