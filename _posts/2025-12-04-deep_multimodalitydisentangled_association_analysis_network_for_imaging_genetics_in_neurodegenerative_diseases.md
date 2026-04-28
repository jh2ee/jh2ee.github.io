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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YLTVAAFS%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T121650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJHMEUCIDjd59tDc0ODAsVuk7D8kiWmS0jnB69kBX0PFdTO%2BTFsAiEAv3nGYrC1YY8jdITw906KTsmn%2FCy%2BFNliInaof%2B7RcxAqiAQI3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDGY%2Fahp%2B4a6OXkrEyrcA1d2Dh%2F6vZ2YSosjsbvqhBLjiVljG5bt0RYDUK1sYqa%2Flq4asnamb7ZOfLiYBHd3FmHNMekmFiHMNqlRgV%2B%2BWOKVzy%2BURlvfQwb%2BALJzxnL8tpNOhlTzbcj1wtL9dF0U2DmrK637ppPOvcPWkyTcYDWiVfvyLfKw5i4v0qq%2BdHUEnpRrEewdVyQaORXy5kqdZsi71%2BJ86Xxbh%2Bqw3oD%2BJSnWvHgtea88Yu%2FppKPnagzEKPMLi3ZNscPRJcExt1TimijiC9foqQWST1v0P6obQ3RqTg%2F9xXgTTrIDxDTFeoajgb7NDI%2F9fvRehcKC0n9sIEdN34Og%2B8WSQyLLps8PTnOiJDy5BcgIhrKIj2WkSwK3PmDHjfug%2FQ7E1XyFO4RBkzyFuQYfMK1T%2FrA1DSmPri9Srakqk0lkFLSv0eMyHghPTa7404hYXdNN%2FUH9I4CWf0u%2F%2B2wuJotue%2Bf77%2BLed3ZGn2lrw%2BzHtE5lOeFbv5zMBivHltc3AuJmN%2BWaAlo06uNauN%2BmqEFvtcQrAkzmsTd9MwFG1YWgK2Vf7OxCpECJbgndyOR%2FBwiOVY0kwz7qwzOemHLrJwj67X9Dk6MB%2F%2FUBooGXd5Ox7CcyA2IE4Y3zql0d%2B16CEVyxbYHoMKLEws8GOqUBI%2F7V0g%2FE51BEyrJDqHwW1hY39FSwOGzuq1Y2g5thba%2FXUyFzuwCGXBw1SA2riOd0nDB%2BhRyCy%2FUkJNjFIciFcDpytg1oBMVWehe0xfYz1%2BTy2Jgv%2FjLuFTv8Z1w1pP9LOp6DKCZbWcy5QRwi5WtHn3SDTejvKEksNDHxMoO7g%2FsoBSezLLshj0WRUtLY9B6E80McSuhzzEY47UOJdpUQ78JRG8qr&X-Amz-Signature=a53fd74b9b992b6ee4cb4c14e3f25d7a7d36966542fd124407d92cb0d295d44e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YLTVAAFS%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T121650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJHMEUCIDjd59tDc0ODAsVuk7D8kiWmS0jnB69kBX0PFdTO%2BTFsAiEAv3nGYrC1YY8jdITw906KTsmn%2FCy%2BFNliInaof%2B7RcxAqiAQI3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDGY%2Fahp%2B4a6OXkrEyrcA1d2Dh%2F6vZ2YSosjsbvqhBLjiVljG5bt0RYDUK1sYqa%2Flq4asnamb7ZOfLiYBHd3FmHNMekmFiHMNqlRgV%2B%2BWOKVzy%2BURlvfQwb%2BALJzxnL8tpNOhlTzbcj1wtL9dF0U2DmrK637ppPOvcPWkyTcYDWiVfvyLfKw5i4v0qq%2BdHUEnpRrEewdVyQaORXy5kqdZsi71%2BJ86Xxbh%2Bqw3oD%2BJSnWvHgtea88Yu%2FppKPnagzEKPMLi3ZNscPRJcExt1TimijiC9foqQWST1v0P6obQ3RqTg%2F9xXgTTrIDxDTFeoajgb7NDI%2F9fvRehcKC0n9sIEdN34Og%2B8WSQyLLps8PTnOiJDy5BcgIhrKIj2WkSwK3PmDHjfug%2FQ7E1XyFO4RBkzyFuQYfMK1T%2FrA1DSmPri9Srakqk0lkFLSv0eMyHghPTa7404hYXdNN%2FUH9I4CWf0u%2F%2B2wuJotue%2Bf77%2BLed3ZGn2lrw%2BzHtE5lOeFbv5zMBivHltc3AuJmN%2BWaAlo06uNauN%2BmqEFvtcQrAkzmsTd9MwFG1YWgK2Vf7OxCpECJbgndyOR%2FBwiOVY0kwz7qwzOemHLrJwj67X9Dk6MB%2F%2FUBooGXd5Ox7CcyA2IE4Y3zql0d%2B16CEVyxbYHoMKLEws8GOqUBI%2F7V0g%2FE51BEyrJDqHwW1hY39FSwOGzuq1Y2g5thba%2FXUyFzuwCGXBw1SA2riOd0nDB%2BhRyCy%2FUkJNjFIciFcDpytg1oBMVWehe0xfYz1%2BTy2Jgv%2FjLuFTv8Z1w1pP9LOp6DKCZbWcy5QRwi5WtHn3SDTejvKEksNDHxMoO7g%2FsoBSezLLshj0WRUtLY9B6E80McSuhzzEY47UOJdpUQ78JRG8qr&X-Amz-Signature=a53fd74b9b992b6ee4cb4c14e3f25d7a7d36966542fd124407d92cb0d295d44e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGVWKU3H%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T121651Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJGMEQCIB%2BoQRCpyVpflw9sBDz11MPtPdAmkIuxZksih8rUFRKBAiByywBn3d0C8tyXLgyxp2cN6jrHWZuorL8gRVhDJOcN4yqIBAjd%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMlJg7z4ZRqlL0NrWKKtwDZUOAlAkl81GdYkp%2BwTjNpLAEmP8TL5ukvjlNKBxNnt%2FCABQ%2FHX%2FVK%2FH3239ffOq5GYUjOuWJZVszbN82C5RHU8hVMeHlIAx2%2BaeYfmERmlC3H8zz39TswQh4%2BVfFoQYB61zK9ypjbuwIvPjT67GzJW1lXTViGPNi8S19ylELM3Nu6aqyIccYm2zbc%2FekUMpeeTy2BuiOYGTvkHUnm3jaL8ytypBGTBSkNsdTWfxrsICYgfc4jDPMXtB1ykmmBtFmjFYOsJbE5HgdQa3yPCWG3adlVsh5L6gU04BYt1pwdi2pLFepk7A%2Bt2rTR9c5krGQCQjkXqLYhxiaJ17LvQQwvH6jWwuLBhdeofGcmhNtKDWXlPVKAYgKQEmyO30okyiikcZiHFUVayPprZD0a2RC9pWrUQpu1aDPO1L%2Fl5RXxeNJOl8ioqq8DaIoQ009prItIdB4rwyaTeKUVgMme0dNa36C12okL%2Bffsor980IGZ7sJfM2Zu%2BropWlsDqI4WGjaE76OZsiOzqf4Iwf4JQvZjRzORyTsoaQ7ofO3ho8E%2F4hrnIJda%2BxeSUEyutzyi9ofL%2Fk6bkdvOM8HkeeRCRWVs8RUhnkDY%2B7mT6K3I2sO0jLdXPB224U%2FyZ9Q4pwwyMTCzwY6pgGYoFnQS30jzxJv%2Fz9mxP4iOI%2F7JkhAuq6zMap6ZvsOXUhouyx8ECEy%2FwZ9FfoCgiB6pN2OA%2B7GgFT6SPgs9EeO%2F9km3w7N%2FktZTl6BKy684YTmEL7ebsWbPkwMt1L4bkX1PNVEHBN2y8gl4Io8ngsoSVbHeNRZPP8mo%2FhZqh7JqW6mZmBwlh3OhHPLukgoX8yWGrI8v9d8vPZr4PTMPar18pn3MJQt&X-Amz-Signature=49db46757a6ec8861c5302eff3396fc6215a97e3099bd4d13c0805254d1b103d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TODKE4Y7%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T121652Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJIMEYCIQCyUn%2FSCb3VhG43JElUHBgb7DxDafQqA3oeBj4vFRtFbgIhAL1gMC0NDQ%2FbYCy7e18XAkav5zKa7W0bH1WQdraVuzBEKogECN3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy24qUusqn1dObC6X4q3APUkhcmcyhAmJQ7BAMToLottG%2F0PHzfjPWiiT5aMemDCH0nuDwVPTNrcs19somJwliigaA9qqZ3IGs6P7a1FqIw7HGTk%2BJbnFZic4dzh98ezBjy8pDxzBWQquymFi7a20jT%2BPhIgWYFHAWaBV%2BwFRjOJ4iPqDLU0pF%2BuKly3Ax6xOfbtNo7LU90gjEEwBtfb4tPZfAGsDPDqKtzqsEEKEJSgLjGY1O%2Bsf0bJ%2FtWhsWp7VCyNJYKXxM7fi3f9Rpz%2B2ey8o6mEiqf7M5WdyMi1rFK0Hz1TDQ1qGzsIO3n3Vu4r2vu%2FuCjiT85zi3ENjiLmeHd8Noqwg2EiZND7ewxM6JdSUTVMuyUQl52m28Tj5ImcZJcxyylcquZzqMSfIP5dwaejUrc3Rey6ts1I28nERFWHLosl8JyW9aZ6015sb5eZ4iDX%2BK85bTI3tmohYXsNwpI4KVTOd9%2BggQ3E5KjrhwaqKE%2F7fs4zmM%2F8h7W%2BMkNci427WzF9n1KcPJzQhHDH30tcKEJyHErO%2FC8Q%2FnPY8eiD%2FiTDhjzZB9FuBgAyTus79fpprwLP0UJUOa5maQ7RncJ3TBgDdpJ%2FLbBog%2B8DLJbZ5FitOreRjEMaiVrV4M2kYeSaC66Ys7PVyeKrzDBxcLPBjqkAWLeO%2Byx3JdOtIlJZTiQe2VqU3eMmCmM1siiQKSSDMftlXhKauhlP29rvOwGUYOW5wwKinuXhACTPgVwaQF4LGG7nmTDsSvDKZuCW33lJvQORAeGE7ETPs8XzZiYh5HMNdSuZ6YYo6TcNsARbXZDT8%2BFyd4VMl0upn5%2BYnqaInrwwUltqVCyw9AcwY02h9FEWe3p5wlPWpen7J2euVzM6Ya9C1Tw&X-Amz-Signature=9ad4bb9ccbe43e6460055b454711e522fce9bd3dddac8a751f8ffb2ccadc3c60&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TODKE4Y7%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T121652Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJIMEYCIQCyUn%2FSCb3VhG43JElUHBgb7DxDafQqA3oeBj4vFRtFbgIhAL1gMC0NDQ%2FbYCy7e18XAkav5zKa7W0bH1WQdraVuzBEKogECN3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy24qUusqn1dObC6X4q3APUkhcmcyhAmJQ7BAMToLottG%2F0PHzfjPWiiT5aMemDCH0nuDwVPTNrcs19somJwliigaA9qqZ3IGs6P7a1FqIw7HGTk%2BJbnFZic4dzh98ezBjy8pDxzBWQquymFi7a20jT%2BPhIgWYFHAWaBV%2BwFRjOJ4iPqDLU0pF%2BuKly3Ax6xOfbtNo7LU90gjEEwBtfb4tPZfAGsDPDqKtzqsEEKEJSgLjGY1O%2Bsf0bJ%2FtWhsWp7VCyNJYKXxM7fi3f9Rpz%2B2ey8o6mEiqf7M5WdyMi1rFK0Hz1TDQ1qGzsIO3n3Vu4r2vu%2FuCjiT85zi3ENjiLmeHd8Noqwg2EiZND7ewxM6JdSUTVMuyUQl52m28Tj5ImcZJcxyylcquZzqMSfIP5dwaejUrc3Rey6ts1I28nERFWHLosl8JyW9aZ6015sb5eZ4iDX%2BK85bTI3tmohYXsNwpI4KVTOd9%2BggQ3E5KjrhwaqKE%2F7fs4zmM%2F8h7W%2BMkNci427WzF9n1KcPJzQhHDH30tcKEJyHErO%2FC8Q%2FnPY8eiD%2FiTDhjzZB9FuBgAyTus79fpprwLP0UJUOa5maQ7RncJ3TBgDdpJ%2FLbBog%2B8DLJbZ5FitOreRjEMaiVrV4M2kYeSaC66Ys7PVyeKrzDBxcLPBjqkAWLeO%2Byx3JdOtIlJZTiQe2VqU3eMmCmM1siiQKSSDMftlXhKauhlP29rvOwGUYOW5wwKinuXhACTPgVwaQF4LGG7nmTDsSvDKZuCW33lJvQORAeGE7ETPs8XzZiYh5HMNdSuZ6YYo6TcNsARbXZDT8%2BFyd4VMl0upn5%2BYnqaInrwwUltqVCyw9AcwY02h9FEWe3p5wlPWpen7J2euVzM6Ya9C1Tw&X-Amz-Signature=77f9f797871462b83c0a1394c5629daf2c9f2ce7d04982095f754b9a4d0288c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665YRTGI4V%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T121652Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJHMEUCIQDLpyVzH%2F2abuIsJCngiMT2cENodkEKLxIE81YzDcsVVgIgd8sz2NzEzUjIITBQOtY8RWj34iC0k90oDpEIp5c7EREqiAQI3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNd75h%2F9mWx1MBPDiSrcA2Xai0fFo3qA4zMeeKH4ToVXzUWh590IGebQXnSUvp501eUUEpZz0l1TVDBlngGIHD0hEvWlzc%2B876wiI3AS1N13EK%2FPcpNLOp4StbMyR7q0GEyPZ5t8WLdoimDvhdk05ERMKlLLGGR%2BKEwZuhAf1xS%2FEt9kjiHxvz%2BdC0dvB6o4hOEuHUqth%2B0hb4bhjljRyQPRB1CvLoNCB%2FCyBvOZiTJLQkAfGG8VDfrtZ9VLc4O0NSPnndxcbUL0ML6ly1ylmvRX11kFBzfnwSYtyWkHHReotwVZZoQ7uotbLXswp3OWFL%2BuEfNI0rkVC%2Bg0QSPXMGWzQiPCixcv8gzkSsoeoG490RrXCZXSDAtSm7gKm8XJxnunlfr%2Flho4JNiK0LvPe87qjXFbni%2FHF%2B6qDVzWF%2BOBJQo1W2fuzRP3XLbnNJWXuwo60P5XN%2BqlVga1hZ09LH2sFq4rAQItae5jrPj2oD%2Bi0TO8wwEvaLVX5bbGcQjJuYlmZwoOWI8sMK%2FYTCmMgbTj85ITY4joNjBK6RwxX2xPoLZTweraZuHlYHQnrAGLnsDe6ktDJYyga0Ubcv17pQeJlMljczmXhWzPLPzgXK6hbmENClLxgXZl%2BxbJssRKT9rcDLQd8fI7qpOTMIXEws8GOqUBKnGi5BgiF6j0Iiz6ACns3AxbovbxFHRQwXTeFjN20UhZ4XvCyamIc0wUoXFkr4UfhWllmjp%2ByY0NsZuxVFO0fThvXFPUvSg0pdhfu0%2Ffmepu1cC0V%2Bxzfrt8Ojm6mFjyYPkXzKBR84J1mwqxxIL93gP8QGjTNQpvyB4wN9ZsM2xGF8EtchJZWHYFkcy0m5P7TSsa4Bz7eMW1%2FATRcHaO3ZSTAntZ&X-Amz-Signature=0437a160edec29f0cf5824a4e0fddacf21469aec87d46a5f592349182df07a85&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XKL42A5A%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T121652Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJGMEQCIEzlqPav9uHBweRSy99oh5kOZ0H2HQmYJQAKG0%2FKWd%2BTAiB7VHzv0YD9%2BvbL2hsjWLlxpapbEoj3SXc9ngXhS%2BLYayqIBAjd%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM7EL4rOHqOE17thQCKtwDHQOw5u02VTYLt%2BwMuymwcOH4ognqEo8UWy3gCVABEMesbCq4tlmhTq5PP1NP6G1kMv3XXmgzfH8HB%2BbRiBsct7UICAW%2FSssaG0sa%2FqnmrgnHGMu%2FjcePXrz38SoYKlawiSoB1mmjLnY9fA5e6PRzKeOFq%2F61hlgYoh1lZ8xg%2FeGx09nhDNSWFg0IN1EUk7PmG1tsehOWTKiZqeG8FWVOTZBgpjneeie5iaEga9NsD6Q7kTKQyQUmIwSizW3ZUtNslsdZbXHTQL25Xejga4P0ytksm03dGS6%2F8rZ3iRqYI%2FFoguM6clOH8Md2XNpIQvqpmucDXRRgS1oG8LmlYHEk7%2Fx%2FTpltw9wcxGd0lu1dJjLxxgDiKn6V9OX%2FxrUU7Bn6sxbHMuKPcXhLldY6V1pp8LyTcJbmO5iNR%2B5ZKXW%2BidyBnVXW1%2FTY26D%2FxKEpP%2B2bD3L8j9XQtU4C4BZpNxHUSHjEm8iU%2BGQHK4w1qs1yvIXTE%2B3CaomcgOASgx7LbXr2FfINtDKMZeDfsFmk%2F3pOxpWoSFWQf2cOc5ntAXlCyW%2BE8t2iIMTqiFSRuprsLbsZZbxOM%2BIJLTrOtd9pfDZ5Jp02xq1f%2FX52pROIzCqA2nzE8wmu4bXiJV2oCugwzcXCzwY6pgGoHNW%2B4l9srLTv9rjLqaNJGeyZaeIyxRWh6a7CvrMNsPSi2CdSAfCPdrRzWiyx5hvp6idU4uC576Rag0ZGTleLzn9k0idagKAYPFYMrPLWVnf3fEbIu%2BoziHM4PmIZf94NxM1KanqiQ5On0DDPVBU6Z2C9giOaGLzc%2BcAgr8i2e2H9MuJi4EIrpbfhKka1aLKOxNG%2Bw77GpJpblEey19DxvPq4ti2g&X-Amz-Signature=e8e7b18414cb55dc5044214e5d7930083380b530bbdc1328fea76d9c6d5d7303&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662YOI5NNL%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T121653Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJIMEYCIQDZh%2BqU7n1RbpYARXzmoWIj9S8bZZ%2FVQsdfo3rNVTif8wIhAPhBeJlHkRh34uzrgqTGVNT4fS8CPsqUm6exM6tr0IDJKogECN3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxKCiVLcPdtxqal280q3ANs86%2BitQ7nc3AULNBwSwcE01LppeirtAFm4iotaVE2XSRU%2FXwHhe0wcZ4ZAl8c3KU6TaLsCUGttN%2BWupu21u6jyBuGTlUS32Fcuyjk7Ib59Gz%2Bbkb2xIdjTze%2Bv8NSlpekCQs9OrdIYJ7TPVprfYsCqXkB5mSRfE2d20o97TQHZDh93UZV0JnNqltQQ0cY7y%2B5xo1IpaUEhW1X9g0mc5RPmujT%2FKEV7f2QD876P24gIn7DqdSpduV4qhO9iwXzJHANxnxQkCeP4JfSvyiggZCSUL%2FnNpdYZ2HBCxCn44CengQieSheig%2Fvzt%2BtYYGJd6HFeaNMl0EV852MsJDTGpHlTr0pbH6MiUVp%2F6%2FKgj1LH9xDd5bKfGfDth1VMndAcjFGurEF%2Fgp8e2aqOCcvRzpq85Gybbv4FKdeRJZw65VC8o6deyCB9yk0vwToHhSFwJsGmEfu3P12lG%2Bv2qqBYz6zmuH1DBVZA0e45vSeqdkJ3uxYTPg4gPPdfDBECLEp2m6yMCMmtQJ0BQz%2Fkq8gK87l5IRHvYuJwZNIbgS3cnQWBCF5RgrtxDaP5uROOkoKLFhMz8BU3GLBYj2Q8qNclW8ocUPihMBj5Xv1TYts9%2F93hw3Okj88KX354lpDWDDhw8LPBjqkAdiIMSZ3zsKKvVqBm0gh5vjPYi2O0O9x1WcNImCWy4YCUfVeDPdXnyb6Eyb%2Bmr71gvXU9zbFSGslhhCo5cvl3qPqHtdi7cqTj5sfH66UtsMbn0qjB0VCxQHKy5UZ7elLKZHmxAMMWmRfZCnG25pE5udOx%2Fma44WrejUUIH42CdaBh%2BgsxoVCw5kpsiqaT5TRFWW57vW1XNBP1MyWdTn5TUK6Redk&X-Amz-Signature=d833f0ddd3fe75cca69bf8da01ea41698b8ba46bf0cf3576b2546087cffa6995&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q3TQ7ZLF%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T121654Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJHMEUCIG2YsvhYFOJ85cUGndgRe4tit3J2KAY0Yv0cJpRHbImiAiEAmVAkerXRmjfJi6ca6PcztTDXkc%2FJSCnmKXqVxUxafgUqiAQI3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGr0%2Bn6lDW7Z7vD8AircA5RzGYpiDvvdInnV%2F3jc02NY0mHuT1BFJCQxBaYJF7QORqj7T%2FwFsDGlq0Wf7tW%2BXvN0AtNaCdQRlTulVHIJ0jtv903oVi40bBWfirIJIEBqMiToqFeOm9j8hSUYceg8N%2Br%2BIQ%2Bu0pF%2FLlclO%2BU%2BgaGKQpd3s7iEEX9IamOa2LT8CEHrab6KdGsCvFPE8mGW7L4YWi%2FDLlMExLEU63YbD%2F10W8a4rBCcYfCkQFBsD%2F1qY%2FWcAUA%2BZLCTNDhPUoLzvE3BSbdQ73qP7H5p01CB2LdzgT%2FGtGBzQ9HN4taeGbVQ8IeTW7cydGJApA%2B%2BObVylXcQwrGkXEm6JqmbknYjm4211yDaNifk%2FhNMNWKu9yUQjwalvZDk5K%2FiNA%2Foz%2BsOqZn9fd1YsDkO9tH5r4PUmbzngmg7NbThPyxTMN6HORyhhf%2FkrA0auO14GCLdo5CQyjIbnTozeebmn%2FaF%2FscZYX%2FomQbSF%2BG%2FN07rhKlHs5TsK%2BB0xJUreePICf48367TA0o6EQJ4edPKqzsrIwbV0X2T%2F%2B%2FsNUghdcQmV%2FIP7%2BoybJyEfb3Unq%2Bi4%2F4Uv%2BTaAfOQ3wIneNT8YQgsF7pvulLyH%2BfzQ5Iu3riGBDE6TNyzx9IPpB1UL%2BPN2jffMObDws8GOqUBMleyvgbygOIkdW1nTzrjt8qhC2WPiy1bn8Gk5K5wCm0dc1vOK7HmNsLtdIsSy38dGUdcXYSeaToeXGeB4Bf4tMRV5WkATlLiLbThYD9ojA5OCUa%2BXM4Ni1%2F3xYuIM%2BeJHjxUy4HzWJMYG7yoxinZHnZDWMC17yZNgn6tMAoIkVD7cwaTh8i7ljir8kUS4RQAi9Gm13VTdkt7i2q94oqhwPQ0jrNr&X-Amz-Signature=2d25e30b56d2a9fcbbfec54d826be6fd930064c9aab246455588e8579f5694bf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q3TQ7ZLF%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T121654Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJHMEUCIG2YsvhYFOJ85cUGndgRe4tit3J2KAY0Yv0cJpRHbImiAiEAmVAkerXRmjfJi6ca6PcztTDXkc%2FJSCnmKXqVxUxafgUqiAQI3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGr0%2Bn6lDW7Z7vD8AircA5RzGYpiDvvdInnV%2F3jc02NY0mHuT1BFJCQxBaYJF7QORqj7T%2FwFsDGlq0Wf7tW%2BXvN0AtNaCdQRlTulVHIJ0jtv903oVi40bBWfirIJIEBqMiToqFeOm9j8hSUYceg8N%2Br%2BIQ%2Bu0pF%2FLlclO%2BU%2BgaGKQpd3s7iEEX9IamOa2LT8CEHrab6KdGsCvFPE8mGW7L4YWi%2FDLlMExLEU63YbD%2F10W8a4rBCcYfCkQFBsD%2F1qY%2FWcAUA%2BZLCTNDhPUoLzvE3BSbdQ73qP7H5p01CB2LdzgT%2FGtGBzQ9HN4taeGbVQ8IeTW7cydGJApA%2B%2BObVylXcQwrGkXEm6JqmbknYjm4211yDaNifk%2FhNMNWKu9yUQjwalvZDk5K%2FiNA%2Foz%2BsOqZn9fd1YsDkO9tH5r4PUmbzngmg7NbThPyxTMN6HORyhhf%2FkrA0auO14GCLdo5CQyjIbnTozeebmn%2FaF%2FscZYX%2FomQbSF%2BG%2FN07rhKlHs5TsK%2BB0xJUreePICf48367TA0o6EQJ4edPKqzsrIwbV0X2T%2F%2B%2FsNUghdcQmV%2FIP7%2BoybJyEfb3Unq%2Bi4%2F4Uv%2BTaAfOQ3wIneNT8YQgsF7pvulLyH%2BfzQ5Iu3riGBDE6TNyzx9IPpB1UL%2BPN2jffMObDws8GOqUBMleyvgbygOIkdW1nTzrjt8qhC2WPiy1bn8Gk5K5wCm0dc1vOK7HmNsLtdIsSy38dGUdcXYSeaToeXGeB4Bf4tMRV5WkATlLiLbThYD9ojA5OCUa%2BXM4Ni1%2F3xYuIM%2BeJHjxUy4HzWJMYG7yoxinZHnZDWMC17yZNgn6tMAoIkVD7cwaTh8i7ljir8kUS4RQAi9Gm13VTdkt7i2q94oqhwPQ0jrNr&X-Amz-Signature=4b8254b07e1f6a582330c8e1a6513eb32ba970951c8db93a506ef62fd373273f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z2244LOT%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T121648Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJGMEQCIBB3BrQoZE4HAB5%2Bu6Hs05zZiDHz6TC%2Blf9L1fy8AMNjAiAXZe7td84bjCZWewOEgU%2FNApIOHeZvgPYvbzyKAhmiKyqIBAjd%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMTzF2RiZACCUEhXJNKtwD3f05hHP6zv%2FL6q04ZxT%2BnHbcw%2FZorKZU8%2F31dItvrGQA29AfBo%2FtI7ULQU455LwkoG5EMe%2B3%2Bbi%2BOIho9h9X8xixIfHXlTPGTtP2Tce8JRHDFKcAuw1IvvgBh61gDF1Rjn8%2FsGZ44hukAm8Zr00JStX4oodCEcG0Hkr%2FI6JgDS9n%2B%2BHPqv3GMbJ4IbLHtgs8iP54XPsmF%2FOy7w4orRm1oTPsTp%2BXdzmHetSc3CKxKje4pA11Dp%2FLUDXVa5%2F%2FPOT4eFVbRd39XpnhxVBFtjusXRx0sRkh3tJtIn6ipKA%2FJnzP2YBW3yXqE0pNCGCPqpbuz19AmCzT6grbpjeFpZX8PSkujtWoSSXraeV7O7T1HZOLjp4lPyN%2Bdx5GrPZWjUlDSx%2F9QSpZ%2FLIg2UAMHnd4hiCvX2O9L%2BpEW9MA%2FpJgDs6x7Qo9J0mf09oPBFAEiYAQPdyLfwBXcHn9aClHrjfNRtNBVtLUe0DUcFnZbwYfLqCo8yN4dTz22QLJQ5ZobFdeogsdtXPQkcUgjloC%2BSeX%2B71ShP8AXy8p8roSbXijlV0YON4t%2B7eW43AaHa355c63aHDjRgn5r53un44oz9fl%2FqtSOyvjB5g5xjKD0WHqouYOGxft63g3DE7zd78wh8bCzwY6pgGH7tRRIDpSE0iZciMot84v9U61UitHNi%2FpjB5XGLsUJmdlzUKTKe9Z3YgCMwU6fJjr5yfPNj4ecxiQnxvvHrXBw%2FFV00QkFUZB80r5aVlXo5YeFuq18BpTiEXjARJGEhCSo3j1aYPrOiUCZMB4kNfGOokWdsZAAzJqfk9XG0qBzR6H4lEF5JXs%2FXJY6bRzudQiWQrVmo8Tf3Wavr0L7ftd1v3AqbYP&X-Amz-Signature=cdd0a48d8018d2e7ddaa9ae90511654a0b57d3fb5224be0e4ccb4c2188dcf1ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662EYQSRMG%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T121656Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJGMEQCICbi4ep%2BVJQGmJbmpwU4%2FNsQHhOlH90Pq%2Fi%2Fa47tKvaBAiAQxcwPMbr9z%2By1VyrRJyVL7aIz2A5UNFkIzqexirtBDiqIBAjd%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMP1Zb%2B3Nh3a%2BoLO%2FNKtwDOfrXvNGe2UUPXGART22qBo0bTUkoSOAnPod%2BkcSq8NkyDRg9uGOGAo8XgRupNoG%2Bw%2FfcGvDExiFyJmug0kI2gcu0IYYSSo740yTyqeG%2F1cbokX%2FpPKOOQM0ByGu16Bo%2B6%2BZ14Qe9mu0lcoq4PgjwwTWbbfbO4ZdNo5rkOad5l8t3Q2IGQzWjMcvAxC2cjnnBsW7gAipvbZ3TYoGDYAk756rIbak2XTKDct36d7eYQL5AjOP20lSrfErVpP%2BCsd39%2Fo7L8jmct4ZKGrA25y84gHBF49lkOtcd4HQAC33CYtYuLjuBKa8MYo0cmdsfzXuka9AN1m0%2F%2BDLwIrMOrG1slcV63xMfq%2B7OEO0snrARhnPLaxt%2F%2Bl6P7GSq00bVep5zWnce5cFRhfoKGke2iA%2BMXUKChzl8DSgkHu0d3u3ZTCr6euJqwdPSu8jDpyHSCo1GU0UBZy2umEWV00gESyHnJBBe6qVV8HvYbyrFKtAKkvsmvWhPwQUJNiWCIwKnvDlK%2BYZ7ZbtPCBQklfnwjFclWrs1DqqGlbs5lxHcHV8gjwJ8yM1aeUXnp69F5H1Ddiyji%2B5wunqAfMi4VWS8VfVbsVeAORUfZ3%2FWvygZwxdzSs5qxDPIpHqh08Fxg%2F8wuMTCzwY6pgEycDhHO1Wm39FBEmKmq0PPWVVYHiui%2FuNjKN3cE5aaFUpN4%2BWmo%2B8UoQrCskbEeegLDNQcGcuAjzNP5xj5Nu7VXalj5lK3flG5SW5df4eS3sHTfkvQd%2Bwl5EndjXixlDsPSHau4AVMgszmanrFhAKQcFGHITjN96%2FivFAuxjtTGfNzRa8bewfiOBRb6fE07%2FpEw4ECAr5zgKjWGd3pXIJfQQn12qTq&X-Amz-Signature=ae5495ec550a445bf6d833814160b74f647ae7258d023a7917378eda5c614ba0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662EYQSRMG%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T121656Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJGMEQCICbi4ep%2BVJQGmJbmpwU4%2FNsQHhOlH90Pq%2Fi%2Fa47tKvaBAiAQxcwPMbr9z%2By1VyrRJyVL7aIz2A5UNFkIzqexirtBDiqIBAjd%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMP1Zb%2B3Nh3a%2BoLO%2FNKtwDOfrXvNGe2UUPXGART22qBo0bTUkoSOAnPod%2BkcSq8NkyDRg9uGOGAo8XgRupNoG%2Bw%2FfcGvDExiFyJmug0kI2gcu0IYYSSo740yTyqeG%2F1cbokX%2FpPKOOQM0ByGu16Bo%2B6%2BZ14Qe9mu0lcoq4PgjwwTWbbfbO4ZdNo5rkOad5l8t3Q2IGQzWjMcvAxC2cjnnBsW7gAipvbZ3TYoGDYAk756rIbak2XTKDct36d7eYQL5AjOP20lSrfErVpP%2BCsd39%2Fo7L8jmct4ZKGrA25y84gHBF49lkOtcd4HQAC33CYtYuLjuBKa8MYo0cmdsfzXuka9AN1m0%2F%2BDLwIrMOrG1slcV63xMfq%2B7OEO0snrARhnPLaxt%2F%2Bl6P7GSq00bVep5zWnce5cFRhfoKGke2iA%2BMXUKChzl8DSgkHu0d3u3ZTCr6euJqwdPSu8jDpyHSCo1GU0UBZy2umEWV00gESyHnJBBe6qVV8HvYbyrFKtAKkvsmvWhPwQUJNiWCIwKnvDlK%2BYZ7ZbtPCBQklfnwjFclWrs1DqqGlbs5lxHcHV8gjwJ8yM1aeUXnp69F5H1Ddiyji%2B5wunqAfMi4VWS8VfVbsVeAORUfZ3%2FWvygZwxdzSs5qxDPIpHqh08Fxg%2F8wuMTCzwY6pgEycDhHO1Wm39FBEmKmq0PPWVVYHiui%2FuNjKN3cE5aaFUpN4%2BWmo%2B8UoQrCskbEeegLDNQcGcuAjzNP5xj5Nu7VXalj5lK3flG5SW5df4eS3sHTfkvQd%2Bwl5EndjXixlDsPSHau4AVMgszmanrFhAKQcFGHITjN96%2FivFAuxjtTGfNzRa8bewfiOBRb6fE07%2FpEw4ECAr5zgKjWGd3pXIJfQQn12qTq&X-Amz-Signature=ae5495ec550a445bf6d833814160b74f647ae7258d023a7917378eda5c614ba0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666I75MNOX%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T121656Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBQaCXVzLXdlc3QtMiJHMEUCIGdFnmKS06E9siIz1D%2BgBCivSr5aWT2OWIgnFtCsweDjAiEA%2FQTSvTYqN37D8itQ1TZ6GWOEHqzrpdTOhAuJQPZL720qiAQI3f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP3eASOVAc4iC7z45SrcA9txq7BL9xWIuSNrp89M9h00D9b5dBN67c5zoH%2FVsVSee77cIg0KoaD8HqxwqDF8Qw4gAA7GX47cGwjPuSKp%2BynXMdUFLPIcEy%2BAz0gB6AZszd0pJXspaAAHC6isBsEnl5keZqJPbLlA%2BSg6O3pUqcKPDhZKmZdBZ4SqRQcYk9MOjDi6UEEUob8nKlM1I%2BQuAT1KV4Nt7P%2FM6ZHvL3tHoTFg%2FdsC9tV6a%2FVfdl9r9J93nrdWp7Z4a%2Fm8EFmfpgdbdz47UYtlYVuHXl1H5UnwNNE1O42%2FqZ%2BtcVHfcsuez7nD%2FeGQGEpFBatcGynMu60fgpGK99yWhWRWX4xugVinpfNzNyjLX0Ng0RDr1EV2Ad6ljQct9tN1GoI4qg827bBBD4iTB6HF9hNUNGkaseKmecHf%2FQ%2FF4AdyIt495TxU1ZWF40SWpp51CL0dQEXtey169FoA1cLiqVWUFAI3U%2FrKk4wu6ZNT2stWuFUZD4%2BvMVCGQNXretOz9zfnM28FPsI6pwWYP3NyT7ibCwh9V65ZYo3rOXjX8NX%2FPinFqL9yVAsiU2%2FTNXgVxeeNKCEZlRPeujMw43%2FAoTgFlsfT1jpMD0dK0W36cIOXsFP%2B8jPW2oEUQxVnXmTOWxDKsjqsMMXGws8GOqUBEh%2Bv8X0SwMXwXr7R2OTYZr24D8SnXeZha6QlPS8Q%2Bp8%2Bt06ijSa7lHUnOCRAVoH2h0j46ZZII3d6i2ZJQ90ysBJRP0WIE7ZYh8XZQG%2FF7hnB07iqvA7rvUkIgU4D%2F6Vz0kOI7RLef7fmBF9Gpv8ej9npYo2yo9t%2FnYy%2FM4wkLH6sqTZ6UyChsg0wU3Ld2nXLIJ%2F4oYwOJ6fR3%2BXPmFSL5E9%2BlBTK&X-Amz-Signature=c2103bc01c4169bfead485dc592b983ba5c9420e6aa44d581dcc93c116b96b83&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

