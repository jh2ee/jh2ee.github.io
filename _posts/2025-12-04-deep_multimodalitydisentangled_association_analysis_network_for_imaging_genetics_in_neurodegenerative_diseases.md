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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662H3ILKBB%2F20260123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260123T191441Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIQC4ScwnH9X3i5b3hmVwL8wYdxlAwjL%2B6NsEZgonYM59%2BAIgBY6g%2BpYWKtQLrGrL5QItH0ce0NNN5RORk1G3mS%2FRjisqiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEdtWohQwlfelaCuRyrcAzdyb1a6iGi3SlRKYPTSr63Se2%2Biex1jj%2FRKN%2BWYk9s0JZpmKo5CxVVKulL5ibDu3O3hAOS3WtPrcxXIwweyKewS285bQnkh%2BmGMs1mJNixbV25V63qxx%2FtRfyiGGZbC5zRC2yqLq%2FY%2FBWWpW%2FPeTZWHCLygXYsrs7VlaKPg9EVpGWUffIaqgPZlE7dG%2B7j1Kvl0uwXfudbjS%2FnqvQYTZcPMPdSqVkobtqjGzb5tpPQpBXMX%2FVjBC5BPSTL5XeyPipvn1hpv4qp0Md%2BkH%2Fi5IZoP8H8Q2r489C%2Fgu%2BHLzvYwOKdHODeHvps1snZBv0CUbOZpOSxV6EkbxS0XReynFt8cVHYd3BN4OLEvc6DpNX5yuM0esG7pQm39iYdCSSyb9iCM7R%2F0myBhlepyQ8ZVXrMOgXxjrkmn5ilGoom6q26i42y%2FSWB73Y0w2Betp0ejpQUL8go1IkCOl8wxvDUYScjsw1SWIDbcBwHTdbq7LYW2eZQpT5XE8Yg5IQTUVvkw6kncaMkklNsqcZrfn1kO70UMcLSzh8UjQ%2F1BRTrFAzxHomnX5vc%2FK1wnhTTbg%2FfNW8qzs4VciDRP95IwHGINPDphi7AJqUCkvitPdM%2FSRVFCf3IeIC0LU7vTXhRFMIaPz8sGOqUBE%2BzScw0gYDKuTRxwAN7Y2RZ%2Fbe7vqWhTLMSzzUykCq2AP8FPOaKU16aKCA7MrRJyEJ091gOrjSJnkIVKElhCQ2WxXE6Mw1MlhUzIHoQFusOwSzxcvOqf0%2Frh%2B3XJS%2FAJIV1skvCAlDUvv0f3dQ0xDKEyMiVonwADRrFePlAVE4IrqdAfxuvC%2BccYBN1wjt5WMHLpD3pD4mtWqfeXFd9sY%2BvaVAm5&X-Amz-Signature=c873985e17ea5a08ad6d44dbb7ac2aaa6ce8d69704e9e4216058d6111272c918&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662H3ILKBB%2F20260123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260123T191441Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIQC4ScwnH9X3i5b3hmVwL8wYdxlAwjL%2B6NsEZgonYM59%2BAIgBY6g%2BpYWKtQLrGrL5QItH0ce0NNN5RORk1G3mS%2FRjisqiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEdtWohQwlfelaCuRyrcAzdyb1a6iGi3SlRKYPTSr63Se2%2Biex1jj%2FRKN%2BWYk9s0JZpmKo5CxVVKulL5ibDu3O3hAOS3WtPrcxXIwweyKewS285bQnkh%2BmGMs1mJNixbV25V63qxx%2FtRfyiGGZbC5zRC2yqLq%2FY%2FBWWpW%2FPeTZWHCLygXYsrs7VlaKPg9EVpGWUffIaqgPZlE7dG%2B7j1Kvl0uwXfudbjS%2FnqvQYTZcPMPdSqVkobtqjGzb5tpPQpBXMX%2FVjBC5BPSTL5XeyPipvn1hpv4qp0Md%2BkH%2Fi5IZoP8H8Q2r489C%2Fgu%2BHLzvYwOKdHODeHvps1snZBv0CUbOZpOSxV6EkbxS0XReynFt8cVHYd3BN4OLEvc6DpNX5yuM0esG7pQm39iYdCSSyb9iCM7R%2F0myBhlepyQ8ZVXrMOgXxjrkmn5ilGoom6q26i42y%2FSWB73Y0w2Betp0ejpQUL8go1IkCOl8wxvDUYScjsw1SWIDbcBwHTdbq7LYW2eZQpT5XE8Yg5IQTUVvkw6kncaMkklNsqcZrfn1kO70UMcLSzh8UjQ%2F1BRTrFAzxHomnX5vc%2FK1wnhTTbg%2FfNW8qzs4VciDRP95IwHGINPDphi7AJqUCkvitPdM%2FSRVFCf3IeIC0LU7vTXhRFMIaPz8sGOqUBE%2BzScw0gYDKuTRxwAN7Y2RZ%2Fbe7vqWhTLMSzzUykCq2AP8FPOaKU16aKCA7MrRJyEJ091gOrjSJnkIVKElhCQ2WxXE6Mw1MlhUzIHoQFusOwSzxcvOqf0%2Frh%2B3XJS%2FAJIV1skvCAlDUvv0f3dQ0xDKEyMiVonwADRrFePlAVE4IrqdAfxuvC%2BccYBN1wjt5WMHLpD3pD4mtWqfeXFd9sY%2BvaVAm5&X-Amz-Signature=c873985e17ea5a08ad6d44dbb7ac2aaa6ce8d69704e9e4216058d6111272c918&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RFZFQQ36%2F20260123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260123T191441Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJGMEQCIAFku0iJbec%2F7COQPh1zMBymUw%2Bv0bF0Y5MNm9TTZ7agAiBXRF4a2i%2BdwIBxSzLaRKdao0cB8SgQVG4KmqIv8Gc9FyqIBAj8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2F5WOggZdT9YLf536KtwDPs9rer4j%2FOUMD1pwTeQAgXEnUqNoJaVciZ4lUgQy0qWuZO1QV0H8FEWCHZOAbOk0OLG0meFhxpG9z52NO%2FY7K5CAmicUQcosPwfi2PZjexV5nN4tTxiI%2FveVGWhP6%2FubTmb8Cew6UMWKGNXiZ%2BQnAZGRwUQIqQlam2nFJNKYVv1x8NblUuVv0I0N5CvMr6QDzkjWsEVNTbMsGcZupsi9ikJLbXKh6hmGwiElY0V3f184jBzmP0gUvu8dhzVODY7TTKuZ7A6%2BtZ0iVop6K4H%2BGagYwvXaVLEkwWB9C4bgUdZ8aTcJliq6s1JnHjVPM%2Bwx5Qzmxtn6yKQb1IfaOSZZqiReT5uoR5AvsN6ATAJgulO4q3HOPzTU5jezhtpxZr9BxAUU5aOoigT%2Bv9EL3oyPU0IXKazkXuqCnYDhKYl2FXsh7VKcpUu8tXpEY%2FKv8aShXekONP4Bzkl9xdFrKVZrlbVoxApNJ4JsfcVMXlxOG7W86Jl2MK54oapL%2BWq7%2FMDSUOzuynU2gIkbHrBNFVr7LgCLZyEpnxXSk3GVzuapgQxgkw7bdVNAJJiARQK8PmESf%2BsNLGhb72HC9UfSutNX1GL0aww9lftuAzEVKcfdzqWiLGEDPZB9xhVDddkw1o3PywY6pgFKxGvCjta4iG%2F8o8%2FdIK%2BRzebVNMzsS5SEQ7yyjPw2ieB0E0ZT5TUs1zAsVpUwdu6oOr%2FGcUEPfyQ0s2TScOhyGHo1faKHyA3PwaH%2FB6z3hVSXAj3b5sDh%2Fzpu5eSXLjFRKeCHuowx5rUwJGr5XBeVW2vCf97Pi500dRNeD812AmxWGt%2BRubMgpQfFecVBGhuPLqN7PGotq96mDSZkXdhr8tm61gy5&X-Amz-Signature=69db7d320f7e529fa0bd2534dbb837cf8b71320cac3a47781d0db19e6e654b50&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XKETDSJZ%2F20260123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260123T191446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJIMEYCIQDEawGzyHhx2LRNFrTorsdLImvqupB%2BD%2BjExADo5L8MjwIhANdxED1pN8jWYlrlKCcOchgYX4JzOmmzp9qWTh0HEBKvKogECPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzBjgWK55zEEW%2Fthpsq3APnYQD2v%2FA08h%2Fuf0w%2FesGnBUcZxumWIA0IpgE0cjFaC2fPIeOK4fj8OjmCRmKQEUAZZSWurnZFNTr9r%2BSwzewdp6RU9yNUOIkly7rqo6yPVx8l14GhoYHa2rOmW8SKZdL%2Bn1HeE3e9FSjcOcTYTVENIa%2FFVIO%2FXHLpYrmIiRhUkD%2Fr1D2tm3jxhK4NWffYRgf%2BV4Mv%2FUi7tN3Y%2FE3lGlVFEzPH14oGjjW82WxqyTN6MgHayR5a1KrBlfO4qbkjkujO9FuNWzjIUw335iuiORNCST9fW0CxvoAg6iMzm6snZQulyIPdAL4Gi0pDsJ4XbbEeuNze5XoPvugT6c1XUvUAEn%2BzMLTpKDihr6ShDE92rkrdHPWs8iw53J51T5XzVzxSGIJHcY0CxlAgkuuZU11Oee%2FoOgecyg%2Bsl29v4OH9WBGy13tOcCi5KopDZPdM6s67ZUV3oThUI2Vdc5b0TdKaF1pJK1PrBFECtpiCPhzLNsSRORf2mCcdEQ22muaxLP7wNbz%2F0rbhBrePaepA6QwtFP7bRgqBo2OetOROlvE1mVpUrugGf8%2FVlGMPKtEIgKlqCvbMczn4u254kgvVGUPR9i99%2FdrctzIhWufVVZ7vwF%2Fp5dM%2FaHM5AzGJZzC2jc%2FLBjqkAWFN7dlGxCWz8JWNlW1b4rZibPKRdq%2BrUsJj%2B07mBRSMrXs%2FzcaaSaAK7kn0WI9idiKd87Dp1HB%2Fugbo3xYN%2BJFDoFkzAkYnp%2BNjylZIX6h7STUNcfN7U2G3gDaMwsYtJiTZnAx4JPbgOD7GhlgWZwdaMsswMnapb3PVyAqZAB5HEwrbyuGCWZhQqdMpTwtcGpCen1lyOo%2FRTL4F2JX8yTGrhs9O&X-Amz-Signature=47a798b3e0d87bb8b83485499d200849f3600a37d22d1c7f8aa1f33cb9c9aceb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XKETDSJZ%2F20260123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260123T191446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJIMEYCIQDEawGzyHhx2LRNFrTorsdLImvqupB%2BD%2BjExADo5L8MjwIhANdxED1pN8jWYlrlKCcOchgYX4JzOmmzp9qWTh0HEBKvKogECPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzBjgWK55zEEW%2Fthpsq3APnYQD2v%2FA08h%2Fuf0w%2FesGnBUcZxumWIA0IpgE0cjFaC2fPIeOK4fj8OjmCRmKQEUAZZSWurnZFNTr9r%2BSwzewdp6RU9yNUOIkly7rqo6yPVx8l14GhoYHa2rOmW8SKZdL%2Bn1HeE3e9FSjcOcTYTVENIa%2FFVIO%2FXHLpYrmIiRhUkD%2Fr1D2tm3jxhK4NWffYRgf%2BV4Mv%2FUi7tN3Y%2FE3lGlVFEzPH14oGjjW82WxqyTN6MgHayR5a1KrBlfO4qbkjkujO9FuNWzjIUw335iuiORNCST9fW0CxvoAg6iMzm6snZQulyIPdAL4Gi0pDsJ4XbbEeuNze5XoPvugT6c1XUvUAEn%2BzMLTpKDihr6ShDE92rkrdHPWs8iw53J51T5XzVzxSGIJHcY0CxlAgkuuZU11Oee%2FoOgecyg%2Bsl29v4OH9WBGy13tOcCi5KopDZPdM6s67ZUV3oThUI2Vdc5b0TdKaF1pJK1PrBFECtpiCPhzLNsSRORf2mCcdEQ22muaxLP7wNbz%2F0rbhBrePaepA6QwtFP7bRgqBo2OetOROlvE1mVpUrugGf8%2FVlGMPKtEIgKlqCvbMczn4u254kgvVGUPR9i99%2FdrctzIhWufVVZ7vwF%2Fp5dM%2FaHM5AzGJZzC2jc%2FLBjqkAWFN7dlGxCWz8JWNlW1b4rZibPKRdq%2BrUsJj%2B07mBRSMrXs%2FzcaaSaAK7kn0WI9idiKd87Dp1HB%2Fugbo3xYN%2BJFDoFkzAkYnp%2BNjylZIX6h7STUNcfN7U2G3gDaMwsYtJiTZnAx4JPbgOD7GhlgWZwdaMsswMnapb3PVyAqZAB5HEwrbyuGCWZhQqdMpTwtcGpCen1lyOo%2FRTL4F2JX8yTGrhs9O&X-Amz-Signature=98844abae2fd44cad5db05de08796c52c16804c4f68e6daaf57e215c5dbb9413&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663HIMYW3V%2F20260123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260123T191446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIHzxe4oBxn3IZWwIPFyKZFWwjVr03GzNTxvMq%2F9K573tAiEAvnj50FP7w0bsoZ2AJfCyxMqD93i55FxQpHlAZwbiP3oqiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIIUENUmSq%2BUzEL9kyrcA6w5CY6MrE7YMkumnz4GgxOtWdIWqruqL%2BkdXmbPO%2B2qkfRUl0ZPSxEmxNnmPb3p9t6rpWl67jqPOX2JIJ35J03RhZHG0sSozFeqq9pc7Aduq0AIBEcuwfvT%2Bonv8aGbSRnIYIxefPJLAw4tph5O14ZVefIAroO304zXEavygl2KPgkGBLj0fLznv928hbj022MQcf1qr4Pd9IDlgdtweYCdHvhYSeTHW1kP9ZOjJkJd7aZ0LuA4N9JBkH2FSk0az3g0a38dPu3Un5uPfCnBOovcrOZ%2Fw%2Fb2YxS7Cy21JsPo9UFpCdmbN6DBtnHrOu3YPpLIBnOAc1gF9Wpzw76lgpKlNkUik6h6uK7MTeWQdzVL5yE7b%2BQbOtuCr%2BUvnYs2J5u0NrkIaYxzkqGEg8TIOkQ2jJrh8Fhgq0RNUIhP71geHjV1bZS6Sv2gMg6O7wXEocPR96Gm9fnE24prIC5LL86S5p0GCt%2B3QMSSoySvPlmIWfUYdAQCnYooT17NXCzOZpc%2FmSCSJYNgKS%2FV4GpuzJtwiN88ca2x7YJryIyq9qehGfXGHO%2Fb8HrLj9jihOVCVw%2BI0nxUo7gr16VZ44hj8WnKOcME6i%2BY26sDDD8xa7KFX0IbPICY2yW5fBjSMNKOz8sGOqUBuY3xfUQtdRyn8oef7rK8LDywjJDdOyo9hpdXXZFkZyAcvhIZBjPbOuFOTCuatsRJzwcmQapme2QCvzaMmRr8S6g%2ByP%2FZDPyWkJ8sHEqUmgOhkDYwMi7uky5Oht5UaSg4mYpLZ38S%2FnSaqFDLa7UXz%2Fd2zDQkbL1cPopNZiEjlxXwD2668gy0jLUwi214%2BtI0a1F0xoTk6wVClEnLUZ6uj%2Fn1SNZ8&X-Amz-Signature=a43c9405de7d71e83f6d4956e31fb6a9c73528d4b2c9adec65589ef3a4782bc0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666OB6Q44T%2F20260123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260123T191449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJIMEYCIQDoYQtxG7mOqW86IcmyeTEygWBc0OfcJKm0MkroTqW3eQIhAI9pK%2B7c8%2FF98yVRyEaBSQFGkB2vx%2B31oDtMLD%2FJxuoUKogECPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igyf7%2B5ut%2BDAn%2FLiK2Mq3APZPFbL8sbWJK6ZMmP3swItu%2B9KGtCg6pplzufdFtJmB9v%2BuDW7jdbZgkizCBLCuQfVy9mOghATWnJGpyKzzU170laB6C6MgXCopkB%2BPdske0rxcPIwCHFz2m1YLZAtC3nTV90jD1iX4CTHyHnq210JDZy14EdsHwICe4Ac09fed6XVBUIkMwBO1kA%2FktVi6AHRDrB1Gx0jvS3dcxLwgbkCOBMMSXvcwlZ4I0WN0XHK4P0Cl6IdAqJrf3V1S79xPaFTQ6XZm85BEgbmSqsCwtJ0VrwNQLOBWy4REKFI6Tduof7nNrldOCifWVAwMMdQwZgmuwt7gKD8LYi09W42bRj224WWOQ0Z6CIqDZsHtNH1MWMWx2uRjkaHLkKdgUvElmj8EjAt4HEGge8ZVxNibn9ux6i5VIYOBK83eaQMLGN08I%2FMeFqX9Yh8N6R75CvXwHmjobtwgWZXiTDLfa2GBXBUONXL%2BdEQLTJW8AwilGQNLjLcm8mLBBAOO7g1PaboxJKqX0BQ3JlPOqoocPmPG6%2B2N2rCuMi1YKpnbneLWIFv%2FF97xZhaxmF0KjJANAftRCIV3SjkZHDUZOOvvI60i%2FKWnybRWjwg6%2Bd5niKrEQAujF%2BP5zmSq1WG6FrBQzDMjc%2FLBjqkAUrkqDDNUaEncaXW6pN0glqMdvJK0S2aplDfNcZlcPJ9ZWvp6d8VKgeUbqITs%2FbcWqCVuTONSd73jkvrWIN3xqQiwvNIhSAS9hUB2IxOIwLz3w0siGO44vv88XjH10GfyNOoYnpGrKBvICLlXaelN1ub9X3xvmGvCtLkjQvp0ThbGLHvsL9gLUFSeffgH%2BM9AMtHg8C2b%2FoY2fbO844VE%2FPe4FaU&X-Amz-Signature=e4fdcc3764bb877cc0c66577f5f72eacf6fcb0c1a49652caa3d2e306edab8fb7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WH3BZFAJ%2F20260123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260123T191451Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJIMEYCIQDYfok5uRAToh7kCvs%2Fmr%2FRjTc%2Fg1iq5LCRYS4tsNkOyAIhAL1cKbbEXUqW8ARS34i9AhOdZ1%2BwOgvUP%2F2ZTK7hBsTQKogECPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwkHrRdQs06Q1OQv4Eq3AOCIiKllVi5RlEYR%2FrjcKxrN%2F9u8FtUkXa40kdqwQBqmjv31%2BooiV%2FPmQWNPbgk0Pc1l64cevjBAg7lDvFUlQnR7bS%2F6jNOj83f7SCNk87ICTAd3hnhdaaA8FIy4XSRQfTe3YR6OrwpmopA9xguPGtDUmmy45hL9FgVb0iioNaXQaxtHVGVRa467SJrbwE4g6Uc486tqKe1%2F1n7BOKMjNClonQ%2BMlObL9nJxUCfJCU%2BBez9beEj5cfARU43nDK2zt7wToUsEn7N3rgcNyKCxPV2E%2FG5WU5NvPs1uKKCLKY0I9%2FQGtC1QTTwT0XwQSeHpWJiN2kpdaBQ%2B7EWaQUzRA7fF2XSUJ8BkhsIv%2FMOQFtWcJflHiUlW1119w5bD3VxaljrlDhLQeQn8WbbCW8VsHmfTWGhqGYFwd31cAOwwQ%2BGO03UQnSWAde1eSwWKa0YO6I00TzMIseJ5TnMYylp4cqHd2jFBBx5jSYtqtgP4ZknzcAyGaGoCtGLAnRqBspP0uLtqkPAWiX9sXDCjdlGSAEeNvKbeqBetwWtq9TxavAqfQYjXe6KzvYcS2yhrIirN84KLx0pVF6FP8wVZ%2FUkSQ%2B1vwLT2IUaOqeLB%2BY%2F%2BJFn2HWXMUxdcpFTe164UDCsjc%2FLBjqkATZ9ywMdBmf5VnPjuzi3VDiQrS2QukKLNS56o6wVq%2F34Z06SHa59KTBE8AdM4LxAjOy92CES0Jfup7HG9V8z%2FOa%2Fa4El3dB8%2FjGElo5xym10e1USo5LNyjV7fncXIGcCns5IwHdhyCtK9jVYszg21NrSy0eSFP6HoRE3yJf%2Fl91Fa2n%2F6Aj7TQkje98k4ywjsvyYJpYngf0NvY%2BVU4VpxjSiGCKW&X-Amz-Signature=82a35db64d88b537ca12ba4f165509b23570202d9e77b0664c2f953fb070a9b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667CEIHIM7%2F20260123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260123T191453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCICu%2F2Aq8%2BEkvUCzMoB8JFoyyn4ovSPGiSiFoKK1koRF8AiEAofSOBALtuuH3OKeimMgr6mWM3f1jI2DYb%2FnS%2BFvwI08qiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPH95mK%2BrKyhuZF7sSrcAxy61f7aVjIFe6nW0nwbvUV4%2FNq2dqbXS1DAviNBGVhh4SK9tSvqUR1PA7Lu7EPOtFGHIdzeoVrxgVckLycD3x%2B26N6D2b28yccDFaxQoQm%2FbYrOuKNaJui6V9%2FS51veJmyZT9mlDLX8XYXJH4%2BacGH%2FlbOZwMiBN%2FS5oqFdavPCLopRbEwnJh6Ap%2FabQF3sO8A0rCACaKXTaCwE4ZQVIOhqMvo7xqCACuMpIrtx%2BermJ92%2Bw7p18xodMS0YDC9LmZ4ah%2FShngEf%2BjOMEIupjw1Fu%2BiXwWxRY2LsJNPy%2FetDa%2FA5PPNh3cVyaoLu%2B9mZPiSMYbDNSZEwmXpfn6YsEb9iuSFg2P%2BAsp4C21IijJeukQNj1GjxwB1zz1NijEi9YfrfEOHruCVCpgnTWZLnTnvyK6nqvGPzag%2FZdFW93hzti4j6ZG%2BADtwg4auKv82AZgTYSmakcSTcmZV2Ixa5tVpQS7HRAk60HY3mZqvwRCOQj0bEdWolt7zw6ZglIHHTrzZ%2BzC1WBeprXet5zV5ButAnwgUgaHdtPf9DLiJBuIyKlSV%2Fi5pu9FAYC3C9r40pRROPAr9K%2F%2FCR1u6hJrgWDuaJOU%2BRsz782r6b%2FNaIGksv52DjYg9Vq2hjPGLGMI6Oz8sGOqUByLRC%2BeEf5kNnBRDTRdLK4qpUBnG11icEhM4lQvzGryJdq5CZjsDXN%2FGdEIzBcCzb2VCFRph7gOcYWibq3r45UI3nPvJhWbQHKlQDRDVg197LwCc2UW%2FKDpbDQfdsvTaxOgwVhEZWGQO04ofkNkY0D2h8Mizk4VIvwROB%2F3s%2FBg%2Bmobyc5%2FIqIYgVNY1CGzX8Kbv46sN9T%2FIXfBfliMgDChkIfmSL&X-Amz-Signature=8ce4495d861b0d9e198c326e6a5b513f91410933e160004ef437692238c9e559&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667CEIHIM7%2F20260123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260123T191453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCICu%2F2Aq8%2BEkvUCzMoB8JFoyyn4ovSPGiSiFoKK1koRF8AiEAofSOBALtuuH3OKeimMgr6mWM3f1jI2DYb%2FnS%2BFvwI08qiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPH95mK%2BrKyhuZF7sSrcAxy61f7aVjIFe6nW0nwbvUV4%2FNq2dqbXS1DAviNBGVhh4SK9tSvqUR1PA7Lu7EPOtFGHIdzeoVrxgVckLycD3x%2B26N6D2b28yccDFaxQoQm%2FbYrOuKNaJui6V9%2FS51veJmyZT9mlDLX8XYXJH4%2BacGH%2FlbOZwMiBN%2FS5oqFdavPCLopRbEwnJh6Ap%2FabQF3sO8A0rCACaKXTaCwE4ZQVIOhqMvo7xqCACuMpIrtx%2BermJ92%2Bw7p18xodMS0YDC9LmZ4ah%2FShngEf%2BjOMEIupjw1Fu%2BiXwWxRY2LsJNPy%2FetDa%2FA5PPNh3cVyaoLu%2B9mZPiSMYbDNSZEwmXpfn6YsEb9iuSFg2P%2BAsp4C21IijJeukQNj1GjxwB1zz1NijEi9YfrfEOHruCVCpgnTWZLnTnvyK6nqvGPzag%2FZdFW93hzti4j6ZG%2BADtwg4auKv82AZgTYSmakcSTcmZV2Ixa5tVpQS7HRAk60HY3mZqvwRCOQj0bEdWolt7zw6ZglIHHTrzZ%2BzC1WBeprXet5zV5ButAnwgUgaHdtPf9DLiJBuIyKlSV%2Fi5pu9FAYC3C9r40pRROPAr9K%2F%2FCR1u6hJrgWDuaJOU%2BRsz782r6b%2FNaIGksv52DjYg9Vq2hjPGLGMI6Oz8sGOqUByLRC%2BeEf5kNnBRDTRdLK4qpUBnG11icEhM4lQvzGryJdq5CZjsDXN%2FGdEIzBcCzb2VCFRph7gOcYWibq3r45UI3nPvJhWbQHKlQDRDVg197LwCc2UW%2FKDpbDQfdsvTaxOgwVhEZWGQO04ofkNkY0D2h8Mizk4VIvwROB%2F3s%2FBg%2Bmobyc5%2FIqIYgVNY1CGzX8Kbv46sN9T%2FIXfBfliMgDChkIfmSL&X-Amz-Signature=ae067d906bffc375beca82d89c3c8bd56bc9063d8e4faf16749adbb1b55350f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665PLOTZFX%2F20260123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260123T191437Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIFqh33pZb7grF76sgI7NWl3nKyb9CbzJbhskCI9QnsKAAiEA0X2omS%2Fz09nXQSK6xouc3bmnnNlOcnxuxjkY79gwCiIqiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNM1MPYD4MO%2F3GvvpircA%2FOIdbPkP38gD1lk2yDEvfV6NFqvj%2BKr2LaykM%2B8HGUU5T10AvYe3MgXnJWQKS9qRPTNTrz1ncfdTIlvmLcAjEheu7Knuw%2Bfr5pNmG3pBlY0RWqPqsfB7SYNL%2FhoLBWbDVA2J00xBSnzTKR2xj314gm3%2F2lpYImbgWzpojHoCWcZQJyf8ueqbqQnmmXTvfOUgRK131nPu8%2FTodCm%2Fv1zedAnIxYFOJwjDY99ngnlSmcDkRWRS6P%2FvMw7l%2BAKg02e8JTT8s%2FnKKEqiHZclLzCkYznPkn8HxppeTv2gIrH0cQYtJkfObBMkd%2BExzdmHSj0Fo%2BFuA5gA4bPOIWVP%2BJ60lZISKJkGdvIxEtgu3kUqhe6TF1JTV1tc3K7tlES1E1KNqKjgNURG9O27rDF5rWHxgjzUycsJulFOTPtsl5r3lsUMLboK3szBRG0NjEc663iJ0i5Ci25Neu2AiFArmJX0OcYrAowbWijfua7NyDYRF6OkWiimbR2BLu8umfmrfnRtREaB%2BpkccKmcgktJXiF9n9SBWEyqr5%2FdyJLGU4lhqWRh60XhngeHLHmxybUb9DEskaOoBIDoDs9KEyGhy2XTPsQ6Hl4T33aOTdWg6USztdVvLLC6WnyBcR57G6GMPWNz8sGOqUBQ1V0Q6SXyA7MhrThg%2Fm8YPh7Wg3sOtK8JbuWW3zwhu6147E3jBdBnD552Yv7afePd%2BLCrJuok%2B2uLM28uPgah46l3DuAojwNk3L9Jo0SIz74kSNN4mjsdaPbCodhnwrTmOYjwGVVt%2FnWin4XcDnzo9K1bUg%2F3wk%2BXaf7YwekuUyv95AVRlmzdC6eazOKBJeYCjQggFqsTmumVHr5xw0I9OflDIwP&X-Amz-Signature=958e7a070625a4fdf1dafd73276271bf7d014489c4b19fe840ce33ad60f109a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664P4OC7MJ%2F20260123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260123T191455Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIDEufIpqdeTGUt%2FBHSaliOKnimIcMhfkD5l9WPCCJY0AAiEAjD8dKXA4ca9PLlfSxmIhkqg%2FpoMAXBoDktY40qJuunwqiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCGUYVKY8cD6e4lE6CrcA%2Ff9PWMCe9hsagUr3eY4waV9J%2FK%2FbLrTJWIVl4n3Jz6BEXGXFfPJ4xu6zo78bDMTJWDm%2BZ0YIurT7qht52%2BBH%2BuzHSrhI6QPZOpy%2FtnmT2U8kAPFqt450kfm%2Boi6Z3Fsv8jKqPKf5T80VQjv1lYmafQVlqlz1jSMptRPQYPEI7HLHG13rf9nKj4fsqdtSsYM9BDT%2BZwLiZkLMtmYM%2FH8LfiE1lRjR9Woj%2BKET1uPuGTgjP%2BiERazVXRAZUn1OwAzk1TJ%2F15BdIrRCPAw8u0hL1M5RybNloeBtHCh2ctec7RedxaZboRZpAhrgWJbTxg1z5zPeqA%2FC%2BJ96nIAjq0vj%2F%2Bissz%2F28iLInLfCKC0uBy6OAqY0Df6QqSQyRB5rDYl61gSdQTsDWLlk26wfblXfEPJWIh6uxUTzW6spnS1v4UOFav7thi7l2PEnxxWQ0cfJn%2FKyoFljGjiHIcP2M91efB%2FaDmxV5DeGoKmTUD3VFAZTR%2F58KGm6brsledZVBUJM%2FkcHuGfpPCEgs%2BKY7UE6ZVXXnsGQsJjQqBnhoq%2BnKNh3Dg5gX3J04Jr0M%2FBrkeRLNFH%2FCmHiCaEpjbX1MGz6mxmJ%2Bc83xxGn4nS%2F4sTGL8xq7ov%2FBI1b50uYUA4MN6Nz8sGOqUBmpQkjbkXh%2BwbcPOXT0Uhti7ZFaQItEny96yKeuHwrJe4JBc1DM1SbRP1YBv4AgW21Y%2FGbdy%2F6EOXzbAeJ8LSTQvnzMS3aNTOdPpA%2FcEew8Vg2E9Q0M6evTGquFbSmB3POJ5EUENbkKR1dTynMBFJr3B5OF5WqdheEsvVCGb1sm4hNCoz0dHKy1Eyzq62ZT3ZbBN8FEXzlGLwM7hiUWXWBMG9r5vU&X-Amz-Signature=456721b9e52722a27f8587808bb7355fa508c92b8f7865962e1456ccaf571809&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664P4OC7MJ%2F20260123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260123T191455Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIDEufIpqdeTGUt%2FBHSaliOKnimIcMhfkD5l9WPCCJY0AAiEAjD8dKXA4ca9PLlfSxmIhkqg%2FpoMAXBoDktY40qJuunwqiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCGUYVKY8cD6e4lE6CrcA%2Ff9PWMCe9hsagUr3eY4waV9J%2FK%2FbLrTJWIVl4n3Jz6BEXGXFfPJ4xu6zo78bDMTJWDm%2BZ0YIurT7qht52%2BBH%2BuzHSrhI6QPZOpy%2FtnmT2U8kAPFqt450kfm%2Boi6Z3Fsv8jKqPKf5T80VQjv1lYmafQVlqlz1jSMptRPQYPEI7HLHG13rf9nKj4fsqdtSsYM9BDT%2BZwLiZkLMtmYM%2FH8LfiE1lRjR9Woj%2BKET1uPuGTgjP%2BiERazVXRAZUn1OwAzk1TJ%2F15BdIrRCPAw8u0hL1M5RybNloeBtHCh2ctec7RedxaZboRZpAhrgWJbTxg1z5zPeqA%2FC%2BJ96nIAjq0vj%2F%2Bissz%2F28iLInLfCKC0uBy6OAqY0Df6QqSQyRB5rDYl61gSdQTsDWLlk26wfblXfEPJWIh6uxUTzW6spnS1v4UOFav7thi7l2PEnxxWQ0cfJn%2FKyoFljGjiHIcP2M91efB%2FaDmxV5DeGoKmTUD3VFAZTR%2F58KGm6brsledZVBUJM%2FkcHuGfpPCEgs%2BKY7UE6ZVXXnsGQsJjQqBnhoq%2BnKNh3Dg5gX3J04Jr0M%2FBrkeRLNFH%2FCmHiCaEpjbX1MGz6mxmJ%2Bc83xxGn4nS%2F4sTGL8xq7ov%2FBI1b50uYUA4MN6Nz8sGOqUBmpQkjbkXh%2BwbcPOXT0Uhti7ZFaQItEny96yKeuHwrJe4JBc1DM1SbRP1YBv4AgW21Y%2FGbdy%2F6EOXzbAeJ8LSTQvnzMS3aNTOdPpA%2FcEew8Vg2E9Q0M6evTGquFbSmB3POJ5EUENbkKR1dTynMBFJr3B5OF5WqdheEsvVCGb1sm4hNCoz0dHKy1Eyzq62ZT3ZbBN8FEXzlGLwM7hiUWXWBMG9r5vU&X-Amz-Signature=456721b9e52722a27f8587808bb7355fa508c92b8f7865962e1456ccaf571809&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZMBOTAHK%2F20260123%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260123T191455Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJFMEMCIA8M0jyKH32%2Fd6tUCn48WlJjpa8Mzd%2Fdd2GcOPlj6q1MAh8PhOMx1QJjpTM4bqdPPb5kcmmgdwC915VtP0Z9o4%2BeKogECPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwDAcWh%2FpHgEHqN5Xsq3AMSMSCU6Y5puHyD0l9ylaCyE%2BYb0w35E6XU0i7R6n5HwLyyZiV6K%2FH5toOOiD12xnbolxoNit6SbGI7cECQ2MDpfx2mqnZX7V7sbjjERa2JSyocTo3toiGWDnqO%2B4fYgorpDo6NM%2Bgz3ARL5aSQ7%2FzEs8JTZCvqlMZ45qVFRIis7U4NCBMKh3pZXFZ2fpvvSgTFw3fgpmqBuahw6Grn34Dmx5jJ%2FyMdm7XhrrYCOxJvLeHkw8BWGWMHRq%2BLg%2FRA2B28rxZ1TUicd6VLExMHkRLaSRKkexWDEHQLcKS%2Fl13bL%2FsoL55yvT1S%2BqF4CSK3dP%2BUcvS%2BeLxK5NbXH5A99haBpALPfHLSL8sFYFFwbcnKT055Qca3KNqB4rKdOlo2eKBR7zA8fMnbA299caMwmg7xc%2BP7H3snGpO4LBdCYdMrnOhMdjrR8BVvdEFnbiyTMBeJ%2BkIjz6DRwkYQmbnrQk474oEtoz%2BRd4J18IJNC6w33k%2BopBsio5UCHfw1sadp5Uas89mdQD8NigJjdACaLw3BxpjlXW6ydPRJZNP1ydYRBvv4vX8Cp8%2FF1rNAkin%2B5n6%2B%2Bc2BZAQ%2FzL0guZNartV%2FZCxiDypGzzqX66wj4IxvGEUT0crE9ZEiY33QRTDfjs%2FLBjqnAWUiOm52sJMgWOlx34JQmgJVLfspa2SumbPtzTIv1iQjPs%2F5n6n7042NQyMSqfD93NZk3uB92G0A0gdbCEUJWvAKzxgMwENea68ZVt7gOh1H6U%2F4MeRC77iZEircEPQcAtE6DUVzAztz0wfDrQVLab70iwqx4v51tYdz54iPSqqZNL8CfdtTcI7jMvfuaIVjO8%2FjOFyqTtCzP2WR4sKBNUUwCf3R6tNT&X-Amz-Signature=88867ee922355109b229096b24e5c022fcdae21a97dc282851f52f74ba9a26e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

