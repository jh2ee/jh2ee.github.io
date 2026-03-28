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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635EJCK5K%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T134041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJHMEUCIQCEAxwrYoreTVDC3NL4FGXfZxC5gR0BU1ahdRO%2F3CziSAIgLotFjSrTApKsgxtoxRvOXi2jO8H9GiBXXFYiq%2FKVxncqiAQI8v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBK1nkiOsdMmuwypSircAw1lPTeYTwwbcjiBMGEKfma%2BWkNXJSD272%2BfDdrDG9ErzdcVvI5kFPeWmThJuo7y83mUzJYIdWCPn97zTTOItVpiTm%2FH8A5MMJmK9YBITONzJp448%2B4Inx2TrWCICmpWMJbW%2FmAiRZQwhvXIXX67kXQ8kl3mUWMCB6Es8TbhqEZ8nhzvOan45O%2ByI1%2BsHefsBQnxbnJVpLxwlXD%2FCGoOouuORCJOQpYj1QTweefrIC%2BtpOFMAbmU3KeTlMG5q%2BXR03j%2Fhj88hf6LKU4fqSyk5ph2qA2ZsP9BAASxxVM5reqyT4LK%2F2UWWOP2Kk8aRxXdPRI2F6%2BEgmkdi61vMeswCCJdQXIPrxxxCFisfQkb3EJwNDvHdWun4CGi%2Bva%2FRsxRFNuksLaMLDAyejIXrjp%2FosuaRq8%2BOWtlkDR2fopAWm8OatbBe3wZm3XeEMrJxbpjKSXJH7Sb2%2FuviM4ObwNnP9mDVw4H1J1NXCS6gz6tB8B0CqUD92KxOMWjfiHI5WGvTMlP1TxzVpWBEuEOPA%2FE5wZECXoHNz6ZIYjTvkz4Pb72rv%2Fx82dUMHrVc0Q6VqqGRkdpeYI4IQKS%2BJ0fLwrZ945In2nuN%2FIzL9POSHjMWKYcSFhQz%2Fd%2B4aLOs%2FLaMMGzns4GOqUBKGj%2BhFhPA9DYLZ%2Fgg4c0bxjFe0TY1jsGCcIBDv1hfyVoZhKKj6I4e6AkuSBXwqusrQAc05FF3Hxqh4ASF8z6ONdM%2BVvKJl6kv77m%2FbyiprnPZoU%2BXv3MwGbS4CgbpKpowKdFvtsguUaIX0UGYKVd6%2BccXN5nk6sfaTANcEVAh9JgZEt%2FKVlaSXsoURJY9p6FWE9hzWlIlqrd%2BOF%2Bu01Gfmy8Z8t4&X-Amz-Signature=73a4b7b573c4b01ece10e2b38d73cf98c86ddb5f97472076772c6abc5bde72cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635EJCK5K%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T134041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJHMEUCIQCEAxwrYoreTVDC3NL4FGXfZxC5gR0BU1ahdRO%2F3CziSAIgLotFjSrTApKsgxtoxRvOXi2jO8H9GiBXXFYiq%2FKVxncqiAQI8v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBK1nkiOsdMmuwypSircAw1lPTeYTwwbcjiBMGEKfma%2BWkNXJSD272%2BfDdrDG9ErzdcVvI5kFPeWmThJuo7y83mUzJYIdWCPn97zTTOItVpiTm%2FH8A5MMJmK9YBITONzJp448%2B4Inx2TrWCICmpWMJbW%2FmAiRZQwhvXIXX67kXQ8kl3mUWMCB6Es8TbhqEZ8nhzvOan45O%2ByI1%2BsHefsBQnxbnJVpLxwlXD%2FCGoOouuORCJOQpYj1QTweefrIC%2BtpOFMAbmU3KeTlMG5q%2BXR03j%2Fhj88hf6LKU4fqSyk5ph2qA2ZsP9BAASxxVM5reqyT4LK%2F2UWWOP2Kk8aRxXdPRI2F6%2BEgmkdi61vMeswCCJdQXIPrxxxCFisfQkb3EJwNDvHdWun4CGi%2Bva%2FRsxRFNuksLaMLDAyejIXrjp%2FosuaRq8%2BOWtlkDR2fopAWm8OatbBe3wZm3XeEMrJxbpjKSXJH7Sb2%2FuviM4ObwNnP9mDVw4H1J1NXCS6gz6tB8B0CqUD92KxOMWjfiHI5WGvTMlP1TxzVpWBEuEOPA%2FE5wZECXoHNz6ZIYjTvkz4Pb72rv%2Fx82dUMHrVc0Q6VqqGRkdpeYI4IQKS%2BJ0fLwrZ945In2nuN%2FIzL9POSHjMWKYcSFhQz%2Fd%2B4aLOs%2FLaMMGzns4GOqUBKGj%2BhFhPA9DYLZ%2Fgg4c0bxjFe0TY1jsGCcIBDv1hfyVoZhKKj6I4e6AkuSBXwqusrQAc05FF3Hxqh4ASF8z6ONdM%2BVvKJl6kv77m%2FbyiprnPZoU%2BXv3MwGbS4CgbpKpowKdFvtsguUaIX0UGYKVd6%2BccXN5nk6sfaTANcEVAh9JgZEt%2FKVlaSXsoURJY9p6FWE9hzWlIlqrd%2BOF%2Bu01Gfmy8Z8t4&X-Amz-Signature=73a4b7b573c4b01ece10e2b38d73cf98c86ddb5f97472076772c6abc5bde72cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663S6IROU2%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T134041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJIMEYCIQDKeIzk4u%2FjMJPmQFM%2BpSGYbh%2Bwn71Ge%2FR0KCNke4NDfgIhAN39o88UugRaz2csPw9jFda0qgH%2FoD3lDqqOFm1x6cZbKogECPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw0NdDAZmcyXp8dHXYq3AMpovJVJwjmrhrZkGa3KN2pBEhbhaVG1hfGoEMgqrLLYfZtzlEF7hk7tLYf8Fz2pLVE5%2F%2B99I6Ovg%2FBKDkPJu04%2BqdUOaQuzwGRZtk1ng3XXIDMMTs1Jostp4Zb1PLpofXk6FOlMG04sDtv5F1L8yNxYJPSt1thBFVwAl1DkwgafeW7Ajfb6FCVgEeLHpxydgmD7YUL22ExdxCn9PzNg0CfVIGE2JeBL6Tm5MtRrNxnfQxAtvGum0GLvWYMBRzI76Mp0mKPhwsqfA5O3GPec4bI1kQCF5AzbfFu%2BVkKrsGDwiiBhgfFw%2BuqCJO3Q0Xf14YX5eDCYolFBzQ%2B8F%2Bjj3183LJ7rOsvaOKwyJlqK5VrQwhCTP8yLz7w9fRBu%2F3cXgoWqQKnC5LPXSu5PsUfOc36K1vef5b9VqawZW0awHhovCVMPwifc6s2DgTmYH9jr9JtKu7vKwPndovpIyObTcR7fm6VW%2FuUkS0oqGbmCwOf6Ylc1ZWK7imPlGOUfQpskpWpZ9uX9XdhVvBR2G2s3ETwWiFEAKjx3GRiLCQXNRhrzrMmf7KbSXbpjs1ZO0n3XNY%2FYxIuVHClu1Ar6NMryNHMu%2BV%2BRv137tHbYmPFxlkEVQHPrW9JNgX2YbsFMTCLtJ7OBjqkASkX9SS905Eyo81vDp6XIDlPJlU%2BaDldDYPglY33xQOLVkm5B1Nlf5Hl4di6WxsO8jln0wamcy1Mirisp5%2F4B10%2B9zuz%2BfnaEEtsoN5vzFLC1zq6TAMwunlVFmfho1PLdAg%2FPzSbFbnQNDsFmfFE2a3KWkdASUREgBeKJlZH0UsE2MK7ZHsBSlgPZdBHSUqm8wcjb2M%2BfMZK3S41hdqecT94xcL%2F&X-Amz-Signature=ca3379b57727d2ebf4acccaea8a17dd772d3fb06275e4b7dd20e3d34eb534f71&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46674WJSKVR%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T134043Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJGMEQCIDX2WQZgw0g3%2FXJ0z%2F%2F3PET7g5XW%2FCh1y%2BG6qcDItl4%2FAiBuAiHea3XZorBig1c3kH11GAr81S9j7%2BZHDqNfQ140ZSqIBAjy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMuChxpNK%2F2lFN2Y7gKtwDPUWfy07jlqbUElZyAa3C9hM62qeWdZiwRrB1le2ywh0Vn%2FtF8H6Oynz239M0OXQ%2B33t8pKwxXub1JdlzQIuvm6o92weW8hASIvL1%2F83iv%2FtPExPxe0%2FNvnnGaQb8ag9tjdqkgjPPUKRP3ZUqEvWwdpk54nW%2FmLCHXAC1bZNUF3rtcFwE2R23icDcrn0qaXZSuDFTt5YZ4Vbe7ATPvU4%2FJ2ik72TPAPKCND%2BlBWurkXouw74quSsEbC6wmMq2f1DQ91sfExJlOcCDEGe2IMK3H9eKww1F9IHmiYOkprzYCZijYIqQwweUK%2FY04JdNQTLiNOHf7AO7orvCgXHdlkFDgeuvYnQzc8cFd2ToB2IfXI%2BQMEh4%2Ft7VAk91FNTzvz2NKr8lfhEYMEFMRhO65jWwP7CP8YXSdsdtsaoXee4FnEY8owhi0bFtYm04ZRaAQu3vmiPnF3DO3c5DsiaDMRycd7KRc10tUBTEpxA0WZUORnO5X6aNiWO2ewp%2FUF4ehaLFTf37XgVDc1XH%2BXKQOsFP9K6UfIZYU7BsUO085y9rstVB0rq1Fz9AlfT%2F8ecjY5CqZJl29w5V58pocOqFWfxvObG%2FgzZL1etLIoRiNFqSvhGukhLIQ2WLy%2FKneSMw37OezgY6pgFLrPTiILUYMx32XUS9Fo7yImON4XaAGHk4f8%2BThRApEar9yNdP3AyyQCNvdAFViF2c63JhHMDy8o735rX7vlHA6PSB8eEsibBo%2FK%2Bb2megcWVZdzTGuu6KoCvQK6Odylw2mj%2FUq1rqGYZqW2jpueZE3uIF2meROhUafTJcXK639BISf1cJ08xmUj%2BHR3ka1gxM%2FlJ2nxsBWDNOxkyBDAwBSEgS0XgS&X-Amz-Signature=91ce87160bc7437f9d33ff328c31b00926b8617fdfe3e9f3a89cc26a01607dbd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46674WJSKVR%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T134043Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJGMEQCIDX2WQZgw0g3%2FXJ0z%2F%2F3PET7g5XW%2FCh1y%2BG6qcDItl4%2FAiBuAiHea3XZorBig1c3kH11GAr81S9j7%2BZHDqNfQ140ZSqIBAjy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMuChxpNK%2F2lFN2Y7gKtwDPUWfy07jlqbUElZyAa3C9hM62qeWdZiwRrB1le2ywh0Vn%2FtF8H6Oynz239M0OXQ%2B33t8pKwxXub1JdlzQIuvm6o92weW8hASIvL1%2F83iv%2FtPExPxe0%2FNvnnGaQb8ag9tjdqkgjPPUKRP3ZUqEvWwdpk54nW%2FmLCHXAC1bZNUF3rtcFwE2R23icDcrn0qaXZSuDFTt5YZ4Vbe7ATPvU4%2FJ2ik72TPAPKCND%2BlBWurkXouw74quSsEbC6wmMq2f1DQ91sfExJlOcCDEGe2IMK3H9eKww1F9IHmiYOkprzYCZijYIqQwweUK%2FY04JdNQTLiNOHf7AO7orvCgXHdlkFDgeuvYnQzc8cFd2ToB2IfXI%2BQMEh4%2Ft7VAk91FNTzvz2NKr8lfhEYMEFMRhO65jWwP7CP8YXSdsdtsaoXee4FnEY8owhi0bFtYm04ZRaAQu3vmiPnF3DO3c5DsiaDMRycd7KRc10tUBTEpxA0WZUORnO5X6aNiWO2ewp%2FUF4ehaLFTf37XgVDc1XH%2BXKQOsFP9K6UfIZYU7BsUO085y9rstVB0rq1Fz9AlfT%2F8ecjY5CqZJl29w5V58pocOqFWfxvObG%2FgzZL1etLIoRiNFqSvhGukhLIQ2WLy%2FKneSMw37OezgY6pgFLrPTiILUYMx32XUS9Fo7yImON4XaAGHk4f8%2BThRApEar9yNdP3AyyQCNvdAFViF2c63JhHMDy8o735rX7vlHA6PSB8eEsibBo%2FK%2Bb2megcWVZdzTGuu6KoCvQK6Odylw2mj%2FUq1rqGYZqW2jpueZE3uIF2meROhUafTJcXK639BISf1cJ08xmUj%2BHR3ka1gxM%2FlJ2nxsBWDNOxkyBDAwBSEgS0XgS&X-Amz-Signature=b30eea69e3095025be6d53878a69e214cc35f1c428b8f3e253391dd2e58cb9cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WKMY7LVY%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T134044Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJIMEYCIQDByeN6yx0OWLPpvZfgD4w6dtC5ZxbroLfh6sjME05ECAIhAPQWj%2FLj%2FzNnpPui%2FqVzMpnwXrSW4dze37oYblyu4byeKogECPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy2n6yVL2fizxrTHfsq3AO6rS9JUplq%2FmvI4OSEtXX92BOPvZ2qGTU51cj2OXnr%2FfUigjpxiqECLJlPtU%2FEeBI6MsMaPiV2TGw4IVdn04kvBVNQhZj%2FTG5q1Uriv1i4FNjbQucuh8vXUtteHUoCWlcRXWuxI2LV3ENWHHB%2By75wWKbTjubmOE4nAKBmA5l41T5U0DauTx9l0AEJuZpwbxe9KisKTwisT%2Fbx%2BX2muF6OP5sY2OhGzWAWjXdU9cLVGdWdwmpmS3PG2SyxImeDTKQtinRAb9Pfy44Ipzj1%2B9zVZm4VROmOvEteFBelfFwr7fXZzs0vq6QVLDhWNrNl5QzGLXYLDMWprML3wel4d1sSn1vG0QMM1nEIcpf33sbLCde6Z1E%2BHYzeedb7MILpiGNo1liqCnKjONNlzq0XibTDL%2BDTxD2uK39eUIzv4bNmNMXAK6nudmQEOJYO8Z9LCp6GQatJnkvKiPOTXFvfmsG7EO1a3Vfn6QiD1CNbqwm5hevnMsvluN5g8BG5i057JUfV57lhBWSgoajlzg1SX%2B3KuLBlIk1jfWoHmc0RBjESBwSkN%2FI5oZXM3k7dvM3xEBtDA8wCp5TAJm3J91YCpxxutkmxoLTyenNrdr0lxmd4xOjXutnVFLNYJteClDC1s57OBjqkARRobWdx7Vf%2FXZ842iNSSaBhVKYJfD5q49INjbLMeKlYq0HwwxptiSonsU8qiRrHdASBp9KE14ry9XfSI0GMjMoXWyQDujc9n79QPpE5OfalDQrrUTlr2HK9kvWEwZzbm%2BExZO800EkwYYlHK9pBGeKW2Zv87GHJ2rxxcE7nSLg6DcLZf9YcL%2BrAQTlrF8W3o8ZWe%2FQWEPWwVqS6zXn%2FpiKaxw9b&X-Amz-Signature=b56504061429a004dd5e56e8252318a4e356e37aa7bd2f9ffd084c3542cc7959&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XCGD4OL%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T134044Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECsaCXVzLXdlc3QtMiJIMEYCIQDakgp8tLwhtwo0NuQzdotXJW2%2B%2BfkIS2cYOX%2B%2FzWKVIgIhAN%2BhZojLu5kgonbVPN4bvO%2BYAkQWPmY86CCgacj4pl9PKogECPT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzAWuDlxhcEHc0GWtUq3ANeM53%2FmGRHQEmzl%2BafLDur6NTCPORgRZObt%2FfP61EeBNxSGCBWSE3cEEWLTXmSrZi9rhibgN93Sc0PetvnVmqxni%2BkGCRKN3X0FbYZ2feDqtSzf%2BMpdhSzT6fuPRGbb69kRjtsCfebnsxh3vPggQPOl0FwaR4VQCN9zqx4i5HT30l0YNqcRHxgw8p0b71igzV5%2FPrxoWWowMjFQPHP%2BDcTR%2FFVSPgGXpFU1Qt7rIjjpjXYHthxZqRkTJDve33OkR855O2oFK5nG909i3BrTOZVe16iM37i14BFnmUAAHAl3IEFTc9bn0zhD2sPkJ08cMXxopYWf0rX%2F3Ms%2F4T7EhrZ8VE23Nc3guZCFUDiRpmYVRv%2BIPh%2FMHUONZp7xAHZ78hcBUX3GuJ%2B5x6cBnWC5dI5za4CY2YpfuuM9HnlMUVID0pNga9xTtDlLT8BBvqGGXvE70ne5QACklpy453x5vHkCFQPTY%2B9v%2BKSqE9SwjmHxE3WwHM8%2F%2FRfmZIHzER9VZm8DNadxOgpWOaRvAswVIgzYUQKIz6pAySmGxCdj4jg71hSZuObbi10Xgr6XFVkE6FZUPRbfa1%2F2B2Hr6hi%2FSRL5GVTVx2%2BGH8OEWXP1wtQQyVLgsNLA7xZKSLfYzDp6Z7OBjqkAe7eposP5qs22c0VuzNbh4OD5bRQGKJtq%2FX3fZBmI5oRwftL6CNiw8CRRn32oEa5v%2B63qM9DkRxOF5Ol9T7BA1x%2BYSdmYFCDBZRhw80f6mQWcQ5g8uOY4VzbzrLlAw8xWWVPYxF6BLuaCtshO%2BAbh0R5QBbe0Wkhb89rKwmma1mgmCmWKER%2FeYCzsF8hQEzmWm0v4TRecezdmrXhbPjx2vnf%2FwvZ&X-Amz-Signature=1886494fcc3e71700ce9d84e381f8ebe27f3de53aee79daa29c0f46e7eaab61b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XUERVW27%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T134050Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJHMEUCIHb%2FajaV9n6xHbTfGIvXRIsngRMMyHMExJcPIWM0OA%2F%2BAiEA3%2BEcTn%2F5WAUAIQujz75FgX7hKZFzaye1qVg%2BCD2UxukqiAQI8v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDGlyeL%2FXKcSUupDBSrcA%2Fk6X0cv8Dt0NPgjzKFWBf1cK9jPffSgGkU3LC0Wnj7xEs98ewSVLNdBDq2fafc0e9ThrTQeX7utfYDcReBlnYNuf6cTVfajJgnxj4KZKL1n1M9RWuz%2BqE6XDk9MPAeo6eybZht1%2FHzYkKmgzxbqdfAta%2FfT7gLDxZ%2FIyS88BPNBUP4s8snzRRoXVKSfkneP%2BTCp9BLe5w1a0kWdlGoHtdCZ8kR7wHxo7S16p88JjNxmijzxZtX6exScvbyB8oLFdLzuM7YIsQmWc27%2BgO8abJxWokQ9ZUbsg31181H7L6dZnUio%2F0sAQRU2W6d%2Bc8egfX6%2FG1YqUDFqKmGSDBOPpgg616LCmALTVtgyLWvjsnrbmIrc14LcOsSsy8Ok%2F4YeFJfUDYJhYr3ql9VfdU97kqNtnz4KvOg8RC9ZBWi%2BGWh6wS40tZkH8JUqhFiEtkrLNDrL%2BwfBni1i%2FYvELu1TQQfFA76VCgoZy8Pb1hcEoYJU4Ynbl2HF1pk0VkRae5zQ8b0KaqgIwqLpXwjEkLm2cqx3BSIYo4ATcK623z93ltdRCvvFfB7KIuBJ%2FN9uooRbvkarVPNJsZrcnNFtFQF%2BZkm7akE1VPITm9E5G091RBZ88x%2ByQysXyv0jdbFQMPKzns4GOqUBD4pXA1TqJ8AShZQz%2Bd6tUQYMGjnqzMbns%2BmKRMxxV1lnaV3lYvp4kjKJsRTmoZ0qaG4P0MXwwuRSUgrRx5QxALyn%2BoaZLbj2gGSbCZSsOG5iIHCQYdCnPeKUp1eXnelB0Uj2RUPR1elEsEgjISajIQ5ycceGE51k4Vlevr4BXlWPNDkBxysd1kwPqFOulIe3LxxBQNBF8obgMQohd4teWMn%2B4DqH&X-Amz-Signature=934465d4d60ec2973e027351961afa2224e8a4a10fb33f01e886b52c23b59797&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VAUIP4BO%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T134051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJHMEUCIQDClwKtwbhS1ZX5%2BRi8SQavIPsZJSAMvqIwzGqbOe6eKAIgesPAGtvJVuTZ%2FhpVPt4vvsAMFeTu8xIySVgGofOKZZkqiAQI8v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKHBqOFMxfdQsftBgCrcAxGftT6uRj%2B8HWpsJqc0F3RCA%2B63y827GSF0FQxX5r1Mt2nvJecI5CyGc5ejzFelyVG9hqUqWtR06P5N7n%2BMgn0bPMNRlWq2prcuE8Y5DkF23jQiT75aOLdFb8lGxdHqWJ5XxKgrsnLu%2B7AiSEOqOBg9cff5vgLpa2Z0zaDd1%2FGruZZXU5zJJA91osSbO1Vrl6SXV6%2Fnaf%2Bd9cYaOe%2FVYohaiANRS3%2FrwpBcGxJw50chjNNeTFhA9s7kE%2FEIBxgpvwsCQGeNKE9GFG5QS5wHzNlaIIJWh0c7TintSAgLSoDOmgKmb6FLOjq%2BipdH8Z9X%2FQGKbGmTa9B9VeU1GdbMRGmJU9%2FmaDCOUJTHKVSOvCKsDxDckNV3UcQ6lWbT9Gv8h92QrEDDYBvd2pe3xmLSK3rTdtGzTb9xXm%2F6mK5W6ataknVlYWRq6t7wjM%2BtdLINoTBcGNJN6rOxyiJHhIon2Vn9ruG0nH7v4G8LV9ZJy3KqhwNytFkKT%2FnUtMHfzdBH6yCPhi1SLciKuVCMuviMPKmzu6MMqQHjg8XpCxCpoopRA6srfuVfNRrPrJU53awP6d4megL5%2FvwdfitIMHR9Vqu28U7L2RAH6%2Fab6b7kUVnweT60%2Bb1U4gBNs23CMPyzns4GOqUBkW2MXqMq%2B9cifkyStSKbJ3eCkbA%2FXDjUiJxR%2FY5AE3zkgPHDL6hbeLkt%2ByJTUkdplr0pEQU45IYL7mrOOFGzIQ8%2FoTguXsJghviECnSClIJvekW7Si2Lo9kx5S8I57%2BKjf%2BbjC2L%2FX1kxJn9aA1Uif9Ld4fFB3P9e2ylH7L5cn87rjUTRTcCemOaMyuLi65xwKpd1zC5MS419HTAuuWfITiG1dm1&X-Amz-Signature=b763972c4a12d1afba5a7ef8d209bdedfa27d74974000ee5e793f477fbd28da3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VAUIP4BO%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T134051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJHMEUCIQDClwKtwbhS1ZX5%2BRi8SQavIPsZJSAMvqIwzGqbOe6eKAIgesPAGtvJVuTZ%2FhpVPt4vvsAMFeTu8xIySVgGofOKZZkqiAQI8v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKHBqOFMxfdQsftBgCrcAxGftT6uRj%2B8HWpsJqc0F3RCA%2B63y827GSF0FQxX5r1Mt2nvJecI5CyGc5ejzFelyVG9hqUqWtR06P5N7n%2BMgn0bPMNRlWq2prcuE8Y5DkF23jQiT75aOLdFb8lGxdHqWJ5XxKgrsnLu%2B7AiSEOqOBg9cff5vgLpa2Z0zaDd1%2FGruZZXU5zJJA91osSbO1Vrl6SXV6%2Fnaf%2Bd9cYaOe%2FVYohaiANRS3%2FrwpBcGxJw50chjNNeTFhA9s7kE%2FEIBxgpvwsCQGeNKE9GFG5QS5wHzNlaIIJWh0c7TintSAgLSoDOmgKmb6FLOjq%2BipdH8Z9X%2FQGKbGmTa9B9VeU1GdbMRGmJU9%2FmaDCOUJTHKVSOvCKsDxDckNV3UcQ6lWbT9Gv8h92QrEDDYBvd2pe3xmLSK3rTdtGzTb9xXm%2F6mK5W6ataknVlYWRq6t7wjM%2BtdLINoTBcGNJN6rOxyiJHhIon2Vn9ruG0nH7v4G8LV9ZJy3KqhwNytFkKT%2FnUtMHfzdBH6yCPhi1SLciKuVCMuviMPKmzu6MMqQHjg8XpCxCpoopRA6srfuVfNRrPrJU53awP6d4megL5%2FvwdfitIMHR9Vqu28U7L2RAH6%2Fab6b7kUVnweT60%2Bb1U4gBNs23CMPyzns4GOqUBkW2MXqMq%2B9cifkyStSKbJ3eCkbA%2FXDjUiJxR%2FY5AE3zkgPHDL6hbeLkt%2ByJTUkdplr0pEQU45IYL7mrOOFGzIQ8%2FoTguXsJghviECnSClIJvekW7Si2Lo9kx5S8I57%2BKjf%2BbjC2L%2FX1kxJn9aA1Uif9Ld4fFB3P9e2ylH7L5cn87rjUTRTcCemOaMyuLi65xwKpd1zC5MS419HTAuuWfITiG1dm1&X-Amz-Signature=dced4b5866633c351d97810e54b3049a9362b5c974a6885c17de074a64368a27&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W7GUC4J6%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T134035Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJIMEYCIQClgqnF48GFZ91jdHZKHfC7z8AF%2FhWYY3bJmKf65vZw%2BgIhAJyLVPxeF84VQwULQwPXBD%2Fe1ohAQUmd5SlhGGjeHCUpKogECPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwjTrPs5Ky6cmRH9DYq3AOUMHO8jIwwyhdCUP1fKcBTV8DZirGQCUG8Jbnu3iw5Q8PhXnRUbE4saD4ohZ2hNZtIbPZNtUum91ZgKwdveNATybakn9ScSqM49gbuR5VvuWZPp43EO%2FfcvbNVJEhfOJU5oEk4lXQysPoOpT9z2KFtGXnRoDSZYb0zrqgIdH1yMaK4YSqytfGSremPjH%2BTyAj6OGquUzDYw8YePPsSwnZHXkHBnU6EFFuVCorXi%2FM6JhzNmtxwXkpcQPLt6cPsjkP42sswCd19naWbs16J3I1n7XYw1TCqccM0zJEc5FoBiUwKB%2BVudhxI1LW7d%2F87C2bi9EHSVBNVJ%2FkrlXXOyDKnRKjVduf5CREywrP%2FOCfBuWimgqPGaxgrATusHcie7kajHSGG5zmEGiyRmqKz85iQbTL4SR8u3hXFN1%2Fb7HsLCbsY%2B%2F0jWrgAnn08DtG2y4mNAFL7rXgW9gKP6GSlh6GDCCgIn7F6KYE4vVABZ2rtDLzIkJSmJZMIzAVvoGh%2FyH0uQlmdlJ3UAJ3gR79zC%2F94ftvDB%2BivfCmfT20znB%2F6VVRlCpy%2FbTgm928TLB%2Fkf3GFJLj3kUPeWFVSn5eZZHa6aamaMuDkVHrvnWdVWsgyHGO3LbgA0yqCrIvaODCvs57OBjqkAY4FLVqfHZwtSka5q1k%2BtamxpOosxne02%2FdvtOqunWH0E4YVflVg4%2FSy9yd%2FQVS7aFsM%2FIGonXfqUVQylKfZgxsE5WktIqyzvDFjAf4p3T2GFlckbmtldi1lVEDHWNSXWGalDCPYUl%2FbGlsQ1G%2BhbSr9fvqh3SDUttjpy8AGaVzOt9Hkzj1YQZYahPmjO4yTLn1yK5srhnhXgmSsM%2FwOCdiaEtdu&X-Amz-Signature=a5fd164a1b61c45c53da59196fc39b518aa11ae0870b41b9bd50d0c1a48c1799&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGRXMPGS%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T134052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJGMEQCIC3lSI78KL5jypCHC9wWbFwt%2FrTS6wkwH%2FIk%2BnWpZsB5AiBUkz71l9q5UwmV37xazJeNyrh9sovNavn%2FhDGsd0VR9CqIBAjy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMXiXVHd8YWzIKSQD5KtwDKZoQB5lHZz%2FPujynds59OP3YQbF%2BkIB%2B3g0yk7XayV8DAxMkKkyRGKO95sR8SxWn%2F%2BElmr8OrsgysAhALIhFtRxQRceQrHmlSCPsUM0kx3ll7zXsYRdWSOXjxaorvWKNjzorQQoT53%2Fczm4UxKEOl50wb9NG1rW1IyvwGQ8U1kDh7uf%2BWGdvQLKjJR3FCoEUF87VOI61RfpD0UhhbaVQNX8ycCrVI%2FQwKY9FP2dtB0ocJs%2F9%2FrBNGwNaV2rwGo19JrJx38k7yRApyLuwuux0zs8exgkJelwHuJ%2FIErjeSrxz0p%2FwUFiP4DkMLeDpoPkhZcxcxuEjocD9j7ErKblV7mK%2F81kYopRdeT4Y4cavVZWszW0ibjASABqVqTDYMDFozPLm%2BAydHCu82oZZE18nbQbaURMvfGDXfBiutwNaOWqkERDlmR%2Bj5YocpR2vp7OXHYTvxorFyyhxRT7NKyRtZ4gh4SydUIrvRmTpOwEmFDebiwogr3BITdWSWVq%2B%2F1AvDyke%2Bqit4rcCVDIcl91MxgTaMBvQybZjbcHbaSiY3B7PWxe0sRrnu3%2B%2FKBbEzN47aiwI%2BHd2h3qb6OS647UwILc%2FHKVVv8vlVtsbUCvXxi8DNEOKp3ctyRGvwxIwk7SezgY6pgFM90mdljK8Gtn1djxNSL2iDEiFYXZoY5OswieNB3JmhDvb0KJI3UQPgt%2FKLYIMyC1oAe54JH9W8196Zru4k14a3UtxcUUoirv2K5DFY81wRt%2Bfv7Xe704WUDlBJOu7JsOk56w3BhuuUqfnYcWSMwivReeuCaV3N6bsmZPAkERRltCpxZ6BX%2F8Y8K1p9nItpO9oVp3KczNY8PPN1%2Bcg4jTpW%2FJs0Bl5&X-Amz-Signature=5113304ddd3f5c816e6e3053c44ddea6940585bab40637d65c582e9e36c445b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGRXMPGS%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T134052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJGMEQCIC3lSI78KL5jypCHC9wWbFwt%2FrTS6wkwH%2FIk%2BnWpZsB5AiBUkz71l9q5UwmV37xazJeNyrh9sovNavn%2FhDGsd0VR9CqIBAjy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMXiXVHd8YWzIKSQD5KtwDKZoQB5lHZz%2FPujynds59OP3YQbF%2BkIB%2B3g0yk7XayV8DAxMkKkyRGKO95sR8SxWn%2F%2BElmr8OrsgysAhALIhFtRxQRceQrHmlSCPsUM0kx3ll7zXsYRdWSOXjxaorvWKNjzorQQoT53%2Fczm4UxKEOl50wb9NG1rW1IyvwGQ8U1kDh7uf%2BWGdvQLKjJR3FCoEUF87VOI61RfpD0UhhbaVQNX8ycCrVI%2FQwKY9FP2dtB0ocJs%2F9%2FrBNGwNaV2rwGo19JrJx38k7yRApyLuwuux0zs8exgkJelwHuJ%2FIErjeSrxz0p%2FwUFiP4DkMLeDpoPkhZcxcxuEjocD9j7ErKblV7mK%2F81kYopRdeT4Y4cavVZWszW0ibjASABqVqTDYMDFozPLm%2BAydHCu82oZZE18nbQbaURMvfGDXfBiutwNaOWqkERDlmR%2Bj5YocpR2vp7OXHYTvxorFyyhxRT7NKyRtZ4gh4SydUIrvRmTpOwEmFDebiwogr3BITdWSWVq%2B%2F1AvDyke%2Bqit4rcCVDIcl91MxgTaMBvQybZjbcHbaSiY3B7PWxe0sRrnu3%2B%2FKBbEzN47aiwI%2BHd2h3qb6OS647UwILc%2FHKVVv8vlVtsbUCvXxi8DNEOKp3ctyRGvwxIwk7SezgY6pgFM90mdljK8Gtn1djxNSL2iDEiFYXZoY5OswieNB3JmhDvb0KJI3UQPgt%2FKLYIMyC1oAe54JH9W8196Zru4k14a3UtxcUUoirv2K5DFY81wRt%2Bfv7Xe704WUDlBJOu7JsOk56w3BhuuUqfnYcWSMwivReeuCaV3N6bsmZPAkERRltCpxZ6BX%2F8Y8K1p9nItpO9oVp3KczNY8PPN1%2Bcg4jTpW%2FJs0Bl5&X-Amz-Signature=5113304ddd3f5c816e6e3053c44ddea6940585bab40637d65c582e9e36c445b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665F22MKCW%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T134052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJHMEUCIQChQZ6DCelZPO%2FZ0UldDGFhMLeWjnR4c4RXEBuZT7rObgIgV7mD6e8bWxq%2FhzAXQi5lgcXClQxRuibuOI8X7jmQXoMqiAQI8v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL4T35gNbOjmRG2A7yrcA4trPfCLNh%2FicUcCfOc4VhvwRi0tzp8JaBEKOSUd4ZJYvZvKzgvDHz752PPEy7cr9WJCzHowBnLbLY6GqJwJYfPmTxb3nMg%2BeZjdugMfAO79xR8lBn6HpI%2FIhJiVIwflWWrrm4PR2xWqAa5eDZ4v6mMnOYotS4zmoe2djQYfUQIJBKF5X0jaUK7paS1nIYP9YccC319Z%2FJTWii0%2FGirLCm%2B9UTDxCu8EDuRcUJdB%2B5gnBCAwsh909eqA1%2Fjr1XdhvfAdAdT0WzT3qGfsD0ND4%2BufAW4ATjFR1K0JKAxvYVmen%2F7yTM1objt4FowkkrG0XC2BKxDbsXMW14cDzmGVrtUt5ZKF1ZxOUhI4GcsitfjULtQDYp%2FoUHQ4ZMu3L84IHt%2Bn%2BLg2VTtxEtUOn%2FwOgyKtvgoR9Uoy%2FEc4GLxNk%2F7GmQfNCH05xszouOT0Bb1sB9fBCn9mOBoknIokSEEsWtEUwMJejnivArCDpKtF7FvI5tgIuKRzfB%2BDpmSVhaTNee53Y3vICx9ofSVremFHJQrv2ZOkTnwmkiYA74FN6E3aAgzeu7LV%2BklWDCVNLxM8xtTPNMNRMq5Ohsx7dQMdHodkFhiCBjm%2BpL6msl%2FFLjdH3Gp7OvrxzY07ZSaPMLKzns4GOqUBDTRoXvWhHNV5EFiX6Qxcs1xvREyd6LkD2RJZIrC3ozgMUESII6G5Lo%2BnZF4HQ%2BAZ%2BRmPnKSLyTrafYFkwjjvN50iYbpk1tcyI3I8fXDRHSAsl1Zj8zbDrz4YNZOdpxUtJbXjM5bKQdocZiPDGOKoKjtCMZcrPA8BVtWlt8138%2F8eq2ehzjjAIS9AZ0u1euCHvDRonYS24wXONdUqfdT4tcgQVlC1&X-Amz-Signature=a89b700ce84837d83e98da0e4d24a160a01754f96534627658b9a7169ace0a91&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

