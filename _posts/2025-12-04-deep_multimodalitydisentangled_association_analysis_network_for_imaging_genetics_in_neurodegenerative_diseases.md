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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667NZRIL5S%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T134536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDfaplxdWFBs9KtdoPF8%2Bv5n1qt1AqEcqfeIS6jPYty3wIhAL2FMMkxj5wJ56mY5rzo8i6KnUuw73MHtVoJ%2B3Zvb8nEKogECLb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwcQCh7lPUxVjidtHkq3AP6GGTx3nNAde68OV%2BdVfCsRpfbvVH%2Fb7d0Leq1FHPlOV%2FrjQQTSqJJ58y1vBbZZJTallbTZQoF%2FuE1Hk%2F2fSj7d3%2Bry8wq14elwLD9aWz2iIYQiwkr85DdavBdZ%2F0USDXckPCOo2TM%2Fmi1DJv8cEmycVdd4O5KUed6%2BmA67U%2FBPn%2Fmykk6TDLwzpDIcNXAjdsec3q8jeXQQyoRHll6HC4hceqaw2ElNQbquYzwppDBYonT9oqVDCzzMb1C%2BRUmo6IwJ%2BMQTsZjZArTjRUCq53aOdqDvzHUEVyBkw0S7oJ10tLbHI05%2FG%2FCpctGfIRsMSWsIKV5uMy0ZLO3otTAPIFmie%2BBms8%2BQfuH2g1Qo%2B08K%2FFG1lJ%2FFb5uxm%2BkC7MIBtVVCu3fcyR59jx5oeItfb2Ckyas3CazmLZk1CiNbmoCNiK8TcDObDdXUnLNAA89eAtEDb%2FtkB0%2B1H7osIjGppM%2BzE9LFrd1%2Fojj8dEoeeJjoO2lhOCzk%2Bl0St76F0HjUHZnTawOS8v789LCMBAQ384vjTWeOyzycWjopTPBzSCCARdQy8bcVHjLkLota4K4vx8%2Bfpy4sIqnFnE2J2hxd%2Fu4gEyz%2Fiow6n40Jee5%2FAibvM6fcgbxP4EjXkhhQzCa16DNBjqkAT5FyQVtttBS5egZzoDH9MRqFo86mPVcxCUw75gYziaTyUFteY4yM06dyTGUAsFtbB7ErCL2dZ4fUbbAYZE1t0FfTBGcL4b0zv52EAFU2EWqHlAojkhrTIS4GZyzvPbCqus6Nkmmgvtv5ZOQvaewersuWJ3lPgtDsljDHaY2xJfqur9DNTjcdWFCSWErVS7tyIab27AbUo2vGngK2OoHFLC262OL&X-Amz-Signature=52295fe6d3326c4b07fb216a1609d63cb5d4d7293fc65c43d83dcf99f82ed342&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667NZRIL5S%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T134536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDfaplxdWFBs9KtdoPF8%2Bv5n1qt1AqEcqfeIS6jPYty3wIhAL2FMMkxj5wJ56mY5rzo8i6KnUuw73MHtVoJ%2B3Zvb8nEKogECLb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwcQCh7lPUxVjidtHkq3AP6GGTx3nNAde68OV%2BdVfCsRpfbvVH%2Fb7d0Leq1FHPlOV%2FrjQQTSqJJ58y1vBbZZJTallbTZQoF%2FuE1Hk%2F2fSj7d3%2Bry8wq14elwLD9aWz2iIYQiwkr85DdavBdZ%2F0USDXckPCOo2TM%2Fmi1DJv8cEmycVdd4O5KUed6%2BmA67U%2FBPn%2Fmykk6TDLwzpDIcNXAjdsec3q8jeXQQyoRHll6HC4hceqaw2ElNQbquYzwppDBYonT9oqVDCzzMb1C%2BRUmo6IwJ%2BMQTsZjZArTjRUCq53aOdqDvzHUEVyBkw0S7oJ10tLbHI05%2FG%2FCpctGfIRsMSWsIKV5uMy0ZLO3otTAPIFmie%2BBms8%2BQfuH2g1Qo%2B08K%2FFG1lJ%2FFb5uxm%2BkC7MIBtVVCu3fcyR59jx5oeItfb2Ckyas3CazmLZk1CiNbmoCNiK8TcDObDdXUnLNAA89eAtEDb%2FtkB0%2B1H7osIjGppM%2BzE9LFrd1%2Fojj8dEoeeJjoO2lhOCzk%2Bl0St76F0HjUHZnTawOS8v789LCMBAQ384vjTWeOyzycWjopTPBzSCCARdQy8bcVHjLkLota4K4vx8%2Bfpy4sIqnFnE2J2hxd%2Fu4gEyz%2Fiow6n40Jee5%2FAibvM6fcgbxP4EjXkhhQzCa16DNBjqkAT5FyQVtttBS5egZzoDH9MRqFo86mPVcxCUw75gYziaTyUFteY4yM06dyTGUAsFtbB7ErCL2dZ4fUbbAYZE1t0FfTBGcL4b0zv52EAFU2EWqHlAojkhrTIS4GZyzvPbCqus6Nkmmgvtv5ZOQvaewersuWJ3lPgtDsljDHaY2xJfqur9DNTjcdWFCSWErVS7tyIab27AbUo2vGngK2OoHFLC262OL&X-Amz-Signature=52295fe6d3326c4b07fb216a1609d63cb5d4d7293fc65c43d83dcf99f82ed342&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TDSYQOFU%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T134537Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHWWl29Hox4JXrNzKpQiOEKdeSfJ2SZ9BCzWltbJXIXpAiEA4aK0QwKkkw7sKOqxosG0q0aZLhRVbvdIc5sACSJSurcqiAQIt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJwxhwJc6qpiIj2FGCrcA9ZLi9%2FS4SqVwyutBquI7weDvliZrbtH3hsW8YbL3hhsR4BiiQI2gBm8VYCN6Q10P5H0vsS%2F%2FCiIwMDSxWvSHbEcfrF%2B50W9%2FKO%2Fo8HwbOJInvSoLJoMlr9hBDwFn5gtIO7VfTutRugURuyk7F%2BpbLX106%2BJg%2FeIjQl99lsvKzhmplfc2YD6SpZvmcD1EVwKt8667m7CY88lHJo9oKWO%2BwiFmEKvJl7eTmJeehdrJxdLg08d2pNKqqGyhz6d3q%2FTWOBeDcVPwpUy1x2QFjjbSNW3j9sNDarR7pBE61jWaKJXqdCbOptL8vKiFCCZTAOYEITGvotB4vFX%2BgEGPdV0504yIZDWbT6jGZGbZ0vWGLmd06xaeN8PQCp9GfroMyHaouhamaiue131NC66MKiNoZoB5AazHn%2BTV3jk1uGg9jsQd0OS3XDp4Biad5iA6sIp%2FIxSZslNrz%2BAEOxEVVqhjT94cvR5JKlPAzM3pdSc%2BWtc5bNUbD3fxCfhYH1SOIsQT3inOrw8JYHJfmcvCBaKafID6JekqnTpJB8EBWbxE01i5TGl4zhQHJSFT2j1ZAnOJ0scswSgVrehIbFco33ZiqUOi1%2BwiMVUFhPmiOGE8gNZmwo5oIIqZWfXNHToMMDnoM0GOqUBl6LKOCeXbd2SbxPEMJlsSC9DsrPRb4EilOChNqLbXE7Zq2fKKNO0TF%2BgaEDAxpLQxUbFbFkRDU3BCg9lynyAreXeL8vwesRKGYTIgY8t0JZuWSklFR6herjdcVynUTUhrejM%2ByOHEO%2BwDmmoote%2BHADuLh9jtHHjElVUliLzsaVc4nHx8mH0ZiAqH7Yo%2B0TcG1BDxQrjwfT8YmLFWJ6WEWQsQbfG&X-Amz-Signature=d913025f6140eab0520f16b5a9519558f1708bffcf088091bad9def1a939708b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RTU7HVAG%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T134543Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB73%2BBDlX8FHD29ioF%2FCNFrxJEnDj41VQVktVFLbrbJZAiBNbe4Fd%2BUV%2BSuAHqCmWOJJ9CpKB%2BU13KA0iqy0w5gGZyqIBAi2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMnO2qawNx%2Fl6YkABwKtwD2UYwHt8GCLNhSqbea3SdefP27cB6uVz%2FwtM1meaqMcgmrcH3ot9F3jQHhXvZcdBCn3S9nuyREhqHwtiMUyG6G7d3rB7heYDoZZWDZZXFZ4TFajXs93HtjqWqOWxcAcKS59%2BQ5ZgildIxikBxUYRl0KSbMUui%2FjvItg9x2kQc3uVO%2F90d%2F%2FK1p94IyO15%2FtiuoXb7wGCqceIBtfhukz5dfDPJ1lVlQisLydUbRd1Aj25vAS%2FGHK9zJLHAgsaZUSTiHsqn5fIGuNNTYd85rBg%2F6Fc5hUR4fCHsoRM0W2CLgYK0PSr40dpagUBz4qvH7YWujasxo2huQCTI0F9N31%2B5wIjtiJXHHob15jCO7rezvWaVQvWJGeco6G8YueQZsP9Gb%2FuB9esK0POcIgrxAGWrNmQILOv6IfByH0iDy7nieL86BQxbWo5f6FZewy777%2FEVcVSyN5d8IHcaPkUYjsBoRmKOpHKuW4%2FF6eNhCEju3fYBGMpQ%2FB4Crf7ncdWWIx0IsjK7fFi8Kdz29Bf74g8TXxLG6wDaPJ%2BExBzlyQzJa0IiBZPTVR7DawevaNh7GZUjnNlT%2Bui4n%2FA233CFAalJslDW%2BJYmZtw8X4Hd3C2%2BJP%2FZLhsuWrwWzBr7U1Awi9igzQY6pgFjINuxeInZuIGbg2TNKi9VG8sLzuyo0sK6aEuFdcpCF46t4fP5yh1IpgP2cRxhhWU%2F3A2HwG5Zw1dI52Q1mLFIrlxO4gMiL4KqH2Npn%2FJJ6gIcYECWhrpZJ5VYHpvEaykZyd6sEk9uZFb6qHt1MYJf1BJcDeZ7PKYWVDDmPhUSElmGVlnMS21f27ZLKD0sJLr1kqz0qrD5kIO0JDdFsVe5OhRnmJai&X-Amz-Signature=4b1e61a57e4517409319f3840055cd9e077a9f4ed71116f13db0a1ee01d08bfe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RTU7HVAG%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T134543Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB73%2BBDlX8FHD29ioF%2FCNFrxJEnDj41VQVktVFLbrbJZAiBNbe4Fd%2BUV%2BSuAHqCmWOJJ9CpKB%2BU13KA0iqy0w5gGZyqIBAi2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMnO2qawNx%2Fl6YkABwKtwD2UYwHt8GCLNhSqbea3SdefP27cB6uVz%2FwtM1meaqMcgmrcH3ot9F3jQHhXvZcdBCn3S9nuyREhqHwtiMUyG6G7d3rB7heYDoZZWDZZXFZ4TFajXs93HtjqWqOWxcAcKS59%2BQ5ZgildIxikBxUYRl0KSbMUui%2FjvItg9x2kQc3uVO%2F90d%2F%2FK1p94IyO15%2FtiuoXb7wGCqceIBtfhukz5dfDPJ1lVlQisLydUbRd1Aj25vAS%2FGHK9zJLHAgsaZUSTiHsqn5fIGuNNTYd85rBg%2F6Fc5hUR4fCHsoRM0W2CLgYK0PSr40dpagUBz4qvH7YWujasxo2huQCTI0F9N31%2B5wIjtiJXHHob15jCO7rezvWaVQvWJGeco6G8YueQZsP9Gb%2FuB9esK0POcIgrxAGWrNmQILOv6IfByH0iDy7nieL86BQxbWo5f6FZewy777%2FEVcVSyN5d8IHcaPkUYjsBoRmKOpHKuW4%2FF6eNhCEju3fYBGMpQ%2FB4Crf7ncdWWIx0IsjK7fFi8Kdz29Bf74g8TXxLG6wDaPJ%2BExBzlyQzJa0IiBZPTVR7DawevaNh7GZUjnNlT%2Bui4n%2FA233CFAalJslDW%2BJYmZtw8X4Hd3C2%2BJP%2FZLhsuWrwWzBr7U1Awi9igzQY6pgFjINuxeInZuIGbg2TNKi9VG8sLzuyo0sK6aEuFdcpCF46t4fP5yh1IpgP2cRxhhWU%2F3A2HwG5Zw1dI52Q1mLFIrlxO4gMiL4KqH2Npn%2FJJ6gIcYECWhrpZJ5VYHpvEaykZyd6sEk9uZFb6qHt1MYJf1BJcDeZ7PKYWVDDmPhUSElmGVlnMS21f27ZLKD0sJLr1kqz0qrD5kIO0JDdFsVe5OhRnmJai&X-Amz-Signature=80f07c552a5a4ba2e6b35764dc28b8822ffcdfa473cf9ed88d3d9b7ea8e65ebb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QX6D5VK7%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T134544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDAFkc7iA1jrRTgbObWatD%2BwbMEtf%2BiyDgKw5pNXZqfFAiEAxbZIQK9StQDyltuZVUvz5B%2Fo%2F%2FhwihcxjnkbJ18jigMqiAQItv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOBlYkOiWtP5y%2FvaTSrcA%2B%2FGA5Zo61lJNpwP%2BsjeM0elhDaZU%2FTgIH3m%2BobQD%2ByLAs7lo94pmGEx0GGZgqhhICjxJUh%2FuciMg%2F9EPg231wDDkC77Otv2rL6gxG8py36HO7yUve37zlxL9%2BIzFhV18e%2FWzSjArbvk9vGH95xp0TGwiZI9RZ%2FDDACHpSumytGJIahZxjMKx3VR8iBURde228BngRTBAJhlpggnFYYbFl%2BoITOurh0tS91W3emAGkJO11B%2FBwDw8Ope%2Ftwk8xFANp61YQN%2FnjjKeLZqf8da7nVmwiXmSDb1JfaUmjR0p%2FAMSYUkqp2unkUtrEhfYV8vHbPqkWTdkVkyC%2Bmg%2BhCnLNSFdgk3%2FzRupPfT%2Fj%2FFYnjR5gpmUkk8PLoI3HSDcbr655tS7XfLRWBbwzonE2H5CLCdOZSfPxNSC7J8ZTFcWHnt1uyUNz8OufSHQgDc8PPugfVcZXFXJ7IGL2KzVZhsJkuVbZdYdDpYmo4NT9rbWY%2FhZFlohNbIsiZil9tTL97NKYX%2Bbw4YHkO8Nf9QTIytNp1crsogyFypu1arSOUaw95IifK25SCU%2FG8AsqtAiQ8FrR8W8bLfwp1f4wEavKIcs%2FuPUTe%2BeUN0TWPsLjDiwXBXe6YvQx126YrCBbEKMPjWoM0GOqUBEvRdhGtqatAuHAmaGkDB2bDKiyRDwMqcYD6lK9KEXDt3anB47Qgw2DVE%2BfLuKJ7AOuk58zHnbqGRnZXiOLBqILlULoPClBGncmK1eq4nauajVH6J5m7%2BmqJ6IPdGQ4q25hpY7WGmZuIm13hNOl7h2h0ch6zVPYPp9AtvA%2BJWwA5ewzvbDc4bcHXrgvavhWIuygBhFvVuOOHArGVuYNmznfAPYW6z&X-Amz-Signature=454a37cf4d0c8b56745520c4cf72df4cacfda9cdc162cfde7b142e7b31d343e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666FEGTYLG%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T134544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCaDgDbpXUmKaazewDgt%2BLkpSVgNCxtrYeNdHTlcoVwQgIgF6unCKU509aL2BfoWEXbNHpwZlcFPYoi1QoKO9d8yOwqiAQItv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOzJSa%2Fd43OVxcJ5%2BSrcA6XXmEhMA6HIpyv4hgRWb4%2BTN0IxEkwid6zXQpQ422Mgr%2Bvp5Pi6iOaRXgPB8KmdAvnimBB6gsm56cwO5hOHWSd1gj6%2F98pKHe9B2nSaTMcg6G1KkwG6w9s5sxFc4YhrP6O%2FrGaiujkQYSpy119rkPEZtk48GtJarsC7BG69cWNnd5qNxEJE7TTV3ZAwVtgBuPkLottBusKsS7SHnve0qewTyiYWLHfqXtlVpMR%2FG4lCtPbID1QUSz%2Bo7IdLoEkPbzZ4rThmSaBDUESSCRR8kaDhwuOt8kGprd9gl%2FT0afyKjmFI%2Fcajn89JBY1m2j4PNZDmSUuoB4Mj8TUe9ix5fzHRzQCchbNYXJc%2FmUVUvMKMgrGDLuRoIEwqQKbmMRNeiZ0CfZIbrrQ7FHnGf5Vu8Ckx8%2B8oHqkEAUXR6C43BfYJatE8wWfQHfrilQpLqIj8lJ1tLmeqoi29d0MNLcT6zWkBE4Ak%2Ftf5c1iUvrastSnuJHWarW3S5sKftZszOEHOcIMCnvdd5NRqMAuLBJKCvAPqweXCZKh3Vg1efgKGWa0%2BEW0Su8r9V0h79hXpIPbyBubK2WAcC1QeWpXylV4ber0w%2FxMVln4dSUD6alGIUh74dokTQV6C9Tc4GyEgMNXXoM0GOqUBlQxdDC3QNbglwgSM%2BfVElzPo%2BRWe6gWbXkmIGpwYPjy5BMiWa4xk%2BLBO8wRGy%2FvPwOMTjrkxXP%2BRhtiwdltbc6SrZ9ItKbZgrumt%2FPeOXCGF4bxn9FjZxqfD4FNsThjgIfjhaKoDgjwxQEUzXcerQoZToHtn0AQuU5tGNl5r%2F8D2TNXPIRRUi8y9ryUOwaAtQ09LuQIYS89uPSHhUAqFUtUi%2Bk12&X-Amz-Signature=a7100a1e3d3013720901a0fcd7dd64e872c0f05f14427397feb35b3945f534c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SMCWFGCN%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T134545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDrK%2BNj3HE2lG%2Flb3zxQMsk29lz9zqCW2lx%2F8I6n1YrIgIhAMG6QBuGVjETEoydUd%2Blc00LOesLeJVYuuBEsGBqVUsFKogECLb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxeSQ%2F1mDRkMH8Tn94q3ANhDnGD10ttn0ZUDHfC0GYduBXXXBQbJfo9fCeF4wYuSMRA5dSQny8uTIVo5lcifhfYz0EebAM9nSdxYPbtZJfCPLkygGxpAW6quRhQiX43vOaC4oMMCvlSeEz3soxYq%2FYRXM1d0ExO6W0IeszGHmd8MRj%2Fjad4SiRPZMog2zBzjIfbAXVpxnAr1JEUGMg%2FaH5ADSeO%2FxpDlcEajOGQ88LmWegdn2d4rtpQVsrJgpYccP7n6WyUoEinmC6MqEsyBvl8sOAL3Dhra2xvq2AkjUwwgeLNeda2Ke9ZzaqHSlOC6IZzCmW%2FKzdPXkyfPyYw0je3SEtqZ9u%2FMHbgw0jzhJUknIKoeeUVN6rgyH3XN9j0rYqbMh%2BHNnML1KVxpjWYzVJ1An1OzDdY3mNavh6s36Ht5KpXZDZTLPiTvf2AD114QrT2LzSTQHqO6iIzKbQ%2F4dCHkuWybmTL42K2d2GJuu7RVFGAFJ85IwUxf912wXq9WKGh%2F3j6qQ6KY1vOEpA8tl1ilgTEybt%2FzjB80sybnAW40AOMTOUBFJ7k0kkO5esTPkZsWWprQ36flMiOKIKlH7PXEBhnKdEXTnNLQP0aUlNdrWwv0Fou9kJCV8s%2FFulQtcwZRURrLwlaU%2Ff2ZDDH16DNBjqkAfNEJIA68FPZndzm9F99zE0rlJf%2BOCvheinC%2FF5fQSMqiN0gh1nIuPE0FgR%2BaqdLXA9YnpX6K0wxmwqqkiT4%2BX3EGq95S9n1mRuUbkntMKtjMv5JP89SeKu1jyDQTKZYktpbY3L3j1eNenOgKws4wL0UrNQLZzV3oVkqxzumW1mDXN6NeUFCDsTRlbAKX1RAd0O1G2WZIgrEQeyCTUaBP2oRtomD&X-Amz-Signature=7de2abbb775c82319dc74a61ec2c2910f3666891d1fb56cbec64cbb8e8fc7d7d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y52SVOPK%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T134546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFME%2FnYhNFEeOlsro1AvH6uravx%2BizmVTBxVouy0Ru3lAiB3woDRXJ4ASkjvSl2FcorM0P7%2BTAHzXiF9CUCJrxi5TiqIBAi2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMxYemphlrqWnY87KtKtwDWzBPPLIk4fTn4mI9BKCIordI1pJDd%2FHcpcG7nOmnMlSn6%2Ba6sxMkaZg2jJ3mD3K82zYu7dgMmow0OumK%2Bm53%2FgurBGrCiezVf4j4y9%2BantuWgFZxDgXF2W%2FTOXStpNWH9Fdj60IsfX64MSzbzGKi9wUl%2Fa2d6tJpvr6L8iTR4lEn9i0JHDzwI%2FlAUtbbFEDi6%2FBVG9z7yrQcP8ePpziOi%2FQSgwlxSuww6UipaO4ZEq6%2Bp8QTCg6WJ4Mjc8bSlpdDMEttzI%2B7ynpcjQXAwc%2BcaeWfAFiM5jRsVOZJbtAzFNFZnb198YdJg8%2BUo5wnfHLZq8NIbiGIwz7xgRReKsxBHhIUBC6b5HXEkP9RDheRtb0g2%2FwE7mzwX04L%2Bnxq7Ba3B1jornjeM2OGnk8afLo35EWvPGyJXvZ%2BzcCmPY2xHPTVQRqVgoy1zUump8oQVoT3GMAY2tKFhA3h4ytjPKmnxqDpioCFS8MfK%2FJ6vqcaPVfHfnIUwtPYBoPx0qOSiB97aFkrGbmz59Es%2BXkoydlssU2vdpgdFrYriITGef2JbPuV%2FKyQAEYqH6%2FWxMkhH8Qo1GgvdQqhdI7Ro1P3sKvC4u0zPjvYz6kwiHZQ%2FgjvzBb8WmDrLEVGJu%2B%2F4C8wtNegzQY6pgEgKUaydOAflJTUvBYM4lzpFK9N5fXrM3GCS3pT0s%2Brzw5oE1cyzSidFozq32o3NJzkZMT1LajDcyUzXP58qwvLpNvACCU%2FR%2BANP28ySlE9e0xKg9anAfjt26EjDBzCCQVsU6vFPB4QPRRp%2FPLPM7V8qarD3l8qZDCMewt6K0vpzgcYbJLF4jlgFfL3B2X8dQ4c6fU36fmQP5U9pad1Ns9u9aPpRg%2F8&X-Amz-Signature=0685faf16fca06bee0071e875da645b0a075168e7a28eabc5d889aa8ef5ce065&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y52SVOPK%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T134546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFME%2FnYhNFEeOlsro1AvH6uravx%2BizmVTBxVouy0Ru3lAiB3woDRXJ4ASkjvSl2FcorM0P7%2BTAHzXiF9CUCJrxi5TiqIBAi2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMxYemphlrqWnY87KtKtwDWzBPPLIk4fTn4mI9BKCIordI1pJDd%2FHcpcG7nOmnMlSn6%2Ba6sxMkaZg2jJ3mD3K82zYu7dgMmow0OumK%2Bm53%2FgurBGrCiezVf4j4y9%2BantuWgFZxDgXF2W%2FTOXStpNWH9Fdj60IsfX64MSzbzGKi9wUl%2Fa2d6tJpvr6L8iTR4lEn9i0JHDzwI%2FlAUtbbFEDi6%2FBVG9z7yrQcP8ePpziOi%2FQSgwlxSuww6UipaO4ZEq6%2Bp8QTCg6WJ4Mjc8bSlpdDMEttzI%2B7ynpcjQXAwc%2BcaeWfAFiM5jRsVOZJbtAzFNFZnb198YdJg8%2BUo5wnfHLZq8NIbiGIwz7xgRReKsxBHhIUBC6b5HXEkP9RDheRtb0g2%2FwE7mzwX04L%2Bnxq7Ba3B1jornjeM2OGnk8afLo35EWvPGyJXvZ%2BzcCmPY2xHPTVQRqVgoy1zUump8oQVoT3GMAY2tKFhA3h4ytjPKmnxqDpioCFS8MfK%2FJ6vqcaPVfHfnIUwtPYBoPx0qOSiB97aFkrGbmz59Es%2BXkoydlssU2vdpgdFrYriITGef2JbPuV%2FKyQAEYqH6%2FWxMkhH8Qo1GgvdQqhdI7Ro1P3sKvC4u0zPjvYz6kwiHZQ%2FgjvzBb8WmDrLEVGJu%2B%2F4C8wtNegzQY6pgEgKUaydOAflJTUvBYM4lzpFK9N5fXrM3GCS3pT0s%2Brzw5oE1cyzSidFozq32o3NJzkZMT1LajDcyUzXP58qwvLpNvACCU%2FR%2BANP28ySlE9e0xKg9anAfjt26EjDBzCCQVsU6vFPB4QPRRp%2FPLPM7V8qarD3l8qZDCMewt6K0vpzgcYbJLF4jlgFfL3B2X8dQ4c6fU36fmQP5U9pad1Ns9u9aPpRg%2F8&X-Amz-Signature=1b438a9fb6cc55f52cc6380dc99c470a8527e2e8dc7458ed2cd03995a070b582&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RY65RJCD%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T134535Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDr9ZQwjCTcEeuAilOF%2FCW6hhRYO1Ua7jRrO5xNzOfs4QIhAOtPzsHGe2TPTUWuv4VoJt%2B04v6DKihLbLajhRhUs9riKogECLb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx3W19ehFWsXPcKKnYq3AO5O36SUiQZ12004PRz%2FOOGLLt3UbrSd8%2FSAG9CPQEaemj%2BjZuVVbSwryAo9jF3CgQIiMNZbsJqF6ZZFo6ss1Zidb88m1UgGAgWDNa1zK5BhHVWTwtkHeDQ%2Fza5dCt%2FeNIMoydDUVR9iyPgMkGDHSqhoT5NbwLyfkZWs%2BAp4CFDquPy1x%2FgfEmJjgxpKREmKC3a2qEPAigNTMnVb0scTbnPWi98CjVdnGhU%2F3xu8LLEXQusOAWOpVDCBg2avbc0aEY%2F6W%2FNkq7waLlY6oBMOuobJhO%2BpnygRLe8kQiqG1fe1nMkArxiD39NDRUHWLlEatFsyNTXz71WeVTTBRXV9%2B1UdUrvWIGDsoWu%2Fe0oMs8AnpnpdC0L4l5aHnDaa%2BSRhQ9udw3Iic0i3PkNgJ1Eo1HiAnO0jbkScib0NLslc4wvY5NhqMf%2Frqe1RKvD%2Bqh%2FH39NFL4lR04abddjmNRhyfE5M1rjLLOONgt2XbWF%2B7Bwbil8GZLDn6FYGeTBOkwZerl0zw0JK2t2KDitvPKqNQ6DfoNG2ZSt7vbjJJbfk3Y3ApLtykLgLJLxUaOXjimi3sR9lR7EiMI3InsZZgoPhny5cni2%2B8hhSNFK4HtD8cJM3lzVHt6g7zjp70JXSTD41qDNBjqkAdUq5Kg0RI1fzdMr3eph5s47D%2FwCHsoIvkImqQyJku5ev5xJXFXduz%2BopcJ3syjfvOGlMuD4DB4PjtdmdXGW9Sqj51PsAPCgcFDrjSZ8FRfAjV0gCuRYc7bE9GDfBCObyn8QtP5dxCA4%2B5CG0nY31dsBbiLIKMecWDuCdHLC5vEQjFOptBFkP5xm9vbL03%2BDJofaijsrH5o6g%2FjCIwWNhydpakxv&X-Amz-Signature=913f98469fb2ecc4ab1f3683616f027011514f8c1ced041bd0e6beda36d37fca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WZ6HC2P5%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T134547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDgK7bbEjWr4Kedsb72h0HTL%2BA0WjfhngBUMEOH0jiBVQIgS%2BO5%2FBcO60oTBM2AHsZ5h%2FLQ2BIvk2%2FdpbiXvSEdGlEqiAQItv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB%2BlER5ttABNRJgNVyrcAxy77UPWnfFrsnCcBo1CTakYmjjqCNPlv%2FDEI%2Fc3qofLvDY5i2MZB%2B%2FZDij%2FjLWXeegtEn0f%2FV8mPwKstXiLMMMOKxQU1rqVxZ9g7Kb%2FaV2Sihlwt6t9HLk7WYEF1G7%2B4Y0SGVZQgvBLoT%2BG1Nlxw1BZaGa8cnBEMQoTICq6kuGjrB%2FQ0gEAP%2F3JBN0JztFNuXbAw%2Fhk9hnpnSTRyLdE1NL9ddSR8OZ7zA1Wf7f7Ztz9LRmgcmNgoVdKLZCw9k1GyAOPjfszfxyLbeGbjWK1RrV2rFjskwaXCNoFtRfin1lvhatV9tLTVk1VkQUB9WTt0tQnbuI51tJTV4TNi79127MZgvHMJOUUZja%2BnlPR5TBIlaB4WJk9sYcD1JPQ2qvqQb61C4ZCvSv9XpHSuqPHwYfWrl8tT9zMQCjC%2Farc2UxV%2FIyBISxuwO5t2Hl%2FMVc7rjpCUcEgNEvkwGuwZw7XS2h8p%2FrkwNxFUCNGFc4lmES6MHRqpU2lRU9bIKDi0CJpgtwjjccVKt%2B0rZoPf9lH5Xw78sp0RpLNxz9H2elvMSgHXYm%2BfYeWXgpcVb8zWRs2GXyL7sVveJ98s9usFwRI%2FXUiAEBYb1Y9K6Mjz05mahq5QDQW%2BkyFOKYT5%2FLBMJzYoM0GOqUBDkRVIvQoTrWlkYA%2BdL4gd2HX7AaW6VzwEYvFCHFuOXFfYMDqIo%2F%2BrNdavc2ozrpJ6CM5HH60c9jQdOilJCAZWlpHmzyI%2BbVUi7EBeN46UkWgI7hd65rsHcBnsKW1aEjWqfqyU8qBZGagyO5zGT6hXzl%2BgUkQ1N3g4HOTlEOxTXiZYjJ30W5ssRJhnhLmUL2hBQ8TTdXAllFU3VQRFjJkXhVZdRe2&X-Amz-Signature=4bd4dbba65737476b9ba99759a6ca73cbeebb5db864abca58688d001450c58d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WZ6HC2P5%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T134547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDgK7bbEjWr4Kedsb72h0HTL%2BA0WjfhngBUMEOH0jiBVQIgS%2BO5%2FBcO60oTBM2AHsZ5h%2FLQ2BIvk2%2FdpbiXvSEdGlEqiAQItv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB%2BlER5ttABNRJgNVyrcAxy77UPWnfFrsnCcBo1CTakYmjjqCNPlv%2FDEI%2Fc3qofLvDY5i2MZB%2B%2FZDij%2FjLWXeegtEn0f%2FV8mPwKstXiLMMMOKxQU1rqVxZ9g7Kb%2FaV2Sihlwt6t9HLk7WYEF1G7%2B4Y0SGVZQgvBLoT%2BG1Nlxw1BZaGa8cnBEMQoTICq6kuGjrB%2FQ0gEAP%2F3JBN0JztFNuXbAw%2Fhk9hnpnSTRyLdE1NL9ddSR8OZ7zA1Wf7f7Ztz9LRmgcmNgoVdKLZCw9k1GyAOPjfszfxyLbeGbjWK1RrV2rFjskwaXCNoFtRfin1lvhatV9tLTVk1VkQUB9WTt0tQnbuI51tJTV4TNi79127MZgvHMJOUUZja%2BnlPR5TBIlaB4WJk9sYcD1JPQ2qvqQb61C4ZCvSv9XpHSuqPHwYfWrl8tT9zMQCjC%2Farc2UxV%2FIyBISxuwO5t2Hl%2FMVc7rjpCUcEgNEvkwGuwZw7XS2h8p%2FrkwNxFUCNGFc4lmES6MHRqpU2lRU9bIKDi0CJpgtwjjccVKt%2B0rZoPf9lH5Xw78sp0RpLNxz9H2elvMSgHXYm%2BfYeWXgpcVb8zWRs2GXyL7sVveJ98s9usFwRI%2FXUiAEBYb1Y9K6Mjz05mahq5QDQW%2BkyFOKYT5%2FLBMJzYoM0GOqUBDkRVIvQoTrWlkYA%2BdL4gd2HX7AaW6VzwEYvFCHFuOXFfYMDqIo%2F%2BrNdavc2ozrpJ6CM5HH60c9jQdOilJCAZWlpHmzyI%2BbVUi7EBeN46UkWgI7hd65rsHcBnsKW1aEjWqfqyU8qBZGagyO5zGT6hXzl%2BgUkQ1N3g4HOTlEOxTXiZYjJ30W5ssRJhnhLmUL2hBQ8TTdXAllFU3VQRFjJkXhVZdRe2&X-Amz-Signature=4bd4dbba65737476b9ba99759a6ca73cbeebb5db864abca58688d001450c58d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VHDJL5EG%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T134550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCZvERR8oSRziyHok6pddxiNVv8T0S5BDcbZRwv4pwsUgIhAMoTbH%2Bhqnpc5fdIlHSc7Rgkp2FdwOr1wJQwIgs6RW3VKogECLb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxL4%2B%2BoUA5PU8q4Ky4q3AO3KsuLZ1Ord1YXwpPn%2FfWsZeUZwLOfpwNc9nGLjh0kvsMpadBJstTAkNFAj3FOJlTKUv8H%2F6o6mIPOkP5crvG%2FD6oWtoweRpuap81q81FC6audF6tMP0CAGgqYjTye8VMh8soI%2BpzN%2Bxz%2BnYNAlYXKsNbq%2FFzhYvOEjy3Ub2Hz1nz7pP7nOrGqI%2BxvcIfgYg2dpYwVZwSDZFDB1QJyMPyfUCtWxwuRWMmWqwqukP6JCjm2J0Vl0V2xWY%2BeG%2Bqjib3SBA7%2BpOB4dI%2BxNhgQbVeRYJmmmsnk1P3X7NsOZ9rNscztoik1NUgmT2gv07IcTlT30ISz1pa6fGJQEyt%2FwACrxwBGaj0uk0uJrVgdSjekm698ZklwSR3Uoes9cfWenyJYBTI7GrrIypfmr2os0BWTrzFTnjCgai9tSMXD3XX4OWnOrHm0KdZP3we6RFcE4fKugPrvI94%2FEqIh76RfT0kmJbT10qOhWYq%2BFbBAJTK0hg3SkWGxoUJwFJmmu80k4O2O%2Fgq3dPyFuMIxSkRvcuFFxFJJQH2X%2BserD%2B7oIfYk9X%2BrfDamF5cMNLFBVlSkYAX63PoO09I2YpFa890j%2FqvzJFdv4PzduLKHy59Lf%2BGQk%2BMvmC4zkFv1JVPPOzD11qDNBjqkAapw%2BQUTJ%2F8ze90Hl03RTcClXLirtnEGdwXu0Qu0QqKe61oOn%2BX0IS%2BppS4ilOevmvWWmH%2Bx%2FnWqZ8sFm%2Bk1pmIDCWDWCiEvvF%2BONRNSRLec4jl%2Fc58OpxY0RhCm9TrCw6sOjwX9ukAj2I%2BIjS9jc9M0RuUnUVk6wZdr7mu3jyQtRRYiLzvKpVV1WmiPhf%2FaLOinWcx2Q4waQ7BiHYCuW5RhZDuF&X-Amz-Signature=be581fd2611a644e4559058770d84480773a7101b10aaea8d1b64af4789a4c53&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

