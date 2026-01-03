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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHXZXKVV%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T070934Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQDC3P%2FcSpf2klNPDszhvX%2BIprWamf3sDrnYCj1bnERhbQIhAKg3PCvlCLHo4kyROt6KwwmDw0FwHat%2FXBGXdJN1FRcUKv8DCA0QABoMNjM3NDIzMTgzODA1IgywQCdhg4Lrg7GoTfMq3AP3TSVWzTvB8NusYcwDGNyfEsVTOwhha41Oj00uxlu89Kx0OnaRfPpUwfVs0cxYp6QJcVkl1xwqU7oiuRUB84jO3iLLbb12gncAKVibCZKmngv88tb923AQ%2BznZFQPggA8maaznfRD3obidfXF37deGykEKBS88nmk%2FkMwQtkBx8e%2BMoHHglYSpGigvdU6TmRb6o8f2X%2Bmb10HMI2Nil6z9IndeSAPHxn9GJ7Ozid5ctKG3XMmrZKrRrRgqSUkdlUtVCuLVG2WvE97aUTM7lARV2lQdut%2FlsMwnRz9BUahtmwv8FDt0A96ekTzLqfTl9CIMFXPea8A%2FHAgqorV96cOJoofRxBGJG1dSUgDTEiwr%2FQWFkS8dblBlWcN9jAEStDytUGEVfPnznYrxIOzoiSrxcA7RZ6Gtrl9oGw%2BGPhZ0J7zj82CoXUVJ3uy3aPq3FXVt3RrTNVZAki4Frv2FnnjG6VKwB5%2B3rQKymWlS2qNLjiKniuYb0OP6Skooks3yPBfZOZeKzh%2BwkhYd%2BdjG%2BL14IMchHd3oeCARqHxrDewXt1UsocWHjMCS9bfxX%2FMTAEYgjrR5HoTn2CC9yLAaPdqYatl%2BDZPwZDSWisokkjNYxkxQkPTJhO2REvqz%2FTCfqOLKBjqkAZeAE2zvSNbXAmWtPCjOYORCUg5TkUO4%2BuEE45QKsHHyXX6pHyR40RZ1wXVcTbhWS5t8sIaD3F2MldnwO1AS3UhwZgz%2F9X0nK5Fsm8bl5ZL%2BFxAjlnNQJh9Uh20IHnnZDpV7gJkh%2BwMEureioaIvj08bJHMP1Q9%2BNCaFsgYXBQCbBl%2BD%2FERqr3D6cfYlDOfbAlJ%2F7MDq9pSlWKzqXRFdBG6drORE&X-Amz-Signature=294ddf71a307860519a8c8c775a8c7720384d6e1032932ebc0b3a6d31f78a9b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHXZXKVV%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T070934Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQDC3P%2FcSpf2klNPDszhvX%2BIprWamf3sDrnYCj1bnERhbQIhAKg3PCvlCLHo4kyROt6KwwmDw0FwHat%2FXBGXdJN1FRcUKv8DCA0QABoMNjM3NDIzMTgzODA1IgywQCdhg4Lrg7GoTfMq3AP3TSVWzTvB8NusYcwDGNyfEsVTOwhha41Oj00uxlu89Kx0OnaRfPpUwfVs0cxYp6QJcVkl1xwqU7oiuRUB84jO3iLLbb12gncAKVibCZKmngv88tb923AQ%2BznZFQPggA8maaznfRD3obidfXF37deGykEKBS88nmk%2FkMwQtkBx8e%2BMoHHglYSpGigvdU6TmRb6o8f2X%2Bmb10HMI2Nil6z9IndeSAPHxn9GJ7Ozid5ctKG3XMmrZKrRrRgqSUkdlUtVCuLVG2WvE97aUTM7lARV2lQdut%2FlsMwnRz9BUahtmwv8FDt0A96ekTzLqfTl9CIMFXPea8A%2FHAgqorV96cOJoofRxBGJG1dSUgDTEiwr%2FQWFkS8dblBlWcN9jAEStDytUGEVfPnznYrxIOzoiSrxcA7RZ6Gtrl9oGw%2BGPhZ0J7zj82CoXUVJ3uy3aPq3FXVt3RrTNVZAki4Frv2FnnjG6VKwB5%2B3rQKymWlS2qNLjiKniuYb0OP6Skooks3yPBfZOZeKzh%2BwkhYd%2BdjG%2BL14IMchHd3oeCARqHxrDewXt1UsocWHjMCS9bfxX%2FMTAEYgjrR5HoTn2CC9yLAaPdqYatl%2BDZPwZDSWisokkjNYxkxQkPTJhO2REvqz%2FTCfqOLKBjqkAZeAE2zvSNbXAmWtPCjOYORCUg5TkUO4%2BuEE45QKsHHyXX6pHyR40RZ1wXVcTbhWS5t8sIaD3F2MldnwO1AS3UhwZgz%2F9X0nK5Fsm8bl5ZL%2BFxAjlnNQJh9Uh20IHnnZDpV7gJkh%2BwMEureioaIvj08bJHMP1Q9%2BNCaFsgYXBQCbBl%2BD%2FERqr3D6cfYlDOfbAlJ%2F7MDq9pSlWKzqXRFdBG6drORE&X-Amz-Signature=294ddf71a307860519a8c8c775a8c7720384d6e1032932ebc0b3a6d31f78a9b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QQMLPKW6%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T070934Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCIEJ9%2F9MFwWZ2kBMPeyE2n%2B9IQPQlcHzqeYDG9vdTNuYyAiByme45U989NeVZ3jkC42PQs3R%2F49CySU%2BhlqQEQ4Mckir%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMGLmbEDG82lAKiJLLKtwDN0NF%2B59zxAaOHYGW4vDmiH8giXzNIQHthAM8ANv4wDPsm49kjUn6rrEuiPQdgE3Ep9%2BmyIJBwumgK06FGa7D5D8uPKU%2Bjc4rtAc7NN1MzTD%2Fp8XBpRrHuQ8hhM5y25Ic%2BVhpa4%2Bemia8QU45RDHyt1ixo7%2FDjEXo0aAnwfBFbAGx9V6w13oMwRFAmkjl8od7pVqTb1CGyTIoK7s3rcs2lYMkwFQmO6XIiQ0BaURxH2DmL%2B4fWhZDpM%2BYsSyJ%2Bh%2FfozGX%2Fj8Vmq6sE7%2BJD8ZPinvLJ1nEBP9WKKeyblsVZYMh1QBOdTGGQiXv2oUIxsNn%2Fb1LBspT94vqER7t%2FPHgNYC63RJ8uLqH9KXFeJaMBovHXsM4MORr571zKf2%2FuHnO8GHiGqNZu%2BiJWpq1wzC%2BO5N2ifzAtytQUdh8k8B5y6o93M38ga47TR%2FL6Yi0VhOqrTS7Sbdqtf1DMdGh2mxunjBhbluOREvL7bU220L%2FQlo6re%2F5dq3AZQFtzkWjrFqsuVk9LrfRgF6469EN%2FCvgsMvCa5sscO%2BWT8U6Z2d7k5StCC%2FOu2TOMX%2BpFE2xUt1TRKn%2FpKHGXSD18Hcg0WiKQ7qnFywwUzVKV7LAr1rXHoB4CRGK3NMoAIET3D4w5KjiygY6pgEr3fJnuCmWH8CqdMEwu5Q6C63Czi%2F1jamH1QdniMbDMDk57nQlouExu6QjqfF9Y9xpX19wjqN63xxnSlJRZ%2BhjOqoaeZfeqOgWNHjB6M2IQ0%2Fsuy0FacCeorjjHGwGzLg%2FXe1fNdRB0tDEf6gPTEQQiz0r1F7y0gS5cGCCyZ%2B1J5K6Lh4NGmSEPyqZsMWh%2Fat1LTx%2BzTU2b8E9%2FLzBWuVJB5V9HQi0&X-Amz-Signature=c02205b6132f734acdf85b3857aac4d6dad113dd61f8429e4b064c6a71f003c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46674KM4B6Y%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T070937Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQC2bnT6KhXgqAC72k7F2hN%2F6dwTAJ7RIyVYRXp1XyJkYAIhALltueC3dduUXQzKMHdCVhplTlKfkHmFfSzotS5MqantKv8DCA0QABoMNjM3NDIzMTgzODA1Igzsd4Kw%2B4Z5O%2FNafm8q3ANIrZMzAztVgoak9eFfbEGRL7uwjQnYP6T02dlNiuguBEbcYbnk7u9D62L0fvDx4yAg610WuFmmn1ggprp7xgXURYeW6WRWlMYiNQ1KeJ28PQVcgPeO32FQiYFsmpHrmdW14Yt51EKq6xd7KREf%2FvHFC3nkTbSH1lN7nKjdMfxDJdC8FR6zuhBLx%2FPgDQoAok7NMzQqbiKrqskdXdVYOaJXaNsFNGf0cVn5emFZsY37Jm5RQ%2F8oaNA%2B5gqXw1vfhhaT48eDpHWGo%2BT1%2BR6NUzIp7xjBeU5iYFkz03Lpc9GLXy%2BztMK%2FGMN4RnMsoWByiqnZN7whIgHD%2BfjyOcvpEFCr9mpf%2BDsmFHpVEPStsqj10bHUahcZF%2FAexL8tQQlK4m6QaT%2B%2BllOIq19rz35WBGPcaYaqqen8eXhzqlOdDUqkSOfbh4FLtdNpKb6JsW17J2NnD4ZuU2LGYr3DWWeL7Mcumb1V0zuoOCoE6g%2FIsOqc3TLKabgM2h0f0xbfLcRP7%2B6msNhKQ8hGuGv6fDtaPH74R9t4VxgeHOxi2XFGxAQINFEzK7B6PPVdauFawB%2FfjhQgbtki2LYpRIEHrLdCBQZsQ42LzVyUY1qnU%2FQto97QJQZU7nk0lBB6rp%2BuLzDYqOLKBjqkAZS7e5KqFUT%2FSB5CGYM1kEy4PwW5YDVhV%2FQDysqk4tdlpzve74MWGClTpzIpuU12gEqAgwppR2y%2B9crhfUGH7b8LEEgh90UUvyT1FaeBWsbPxjRTdD14xHaZWVCOdGHkTFBbrZvosEA2e9WaCOG0GKTmMLFDF3THGC9CbgtCaKQT57pjPbRR572b%2Fwpq9yu%2F2k7pEXSWLfxPHhkqK%2B%2FW5q7FDmn0&X-Amz-Signature=903f2a40d23b459e16326ae11cab3d9570068b2174bb98fac8f4db6f56a20ace&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46674KM4B6Y%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T070937Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQC2bnT6KhXgqAC72k7F2hN%2F6dwTAJ7RIyVYRXp1XyJkYAIhALltueC3dduUXQzKMHdCVhplTlKfkHmFfSzotS5MqantKv8DCA0QABoMNjM3NDIzMTgzODA1Igzsd4Kw%2B4Z5O%2FNafm8q3ANIrZMzAztVgoak9eFfbEGRL7uwjQnYP6T02dlNiuguBEbcYbnk7u9D62L0fvDx4yAg610WuFmmn1ggprp7xgXURYeW6WRWlMYiNQ1KeJ28PQVcgPeO32FQiYFsmpHrmdW14Yt51EKq6xd7KREf%2FvHFC3nkTbSH1lN7nKjdMfxDJdC8FR6zuhBLx%2FPgDQoAok7NMzQqbiKrqskdXdVYOaJXaNsFNGf0cVn5emFZsY37Jm5RQ%2F8oaNA%2B5gqXw1vfhhaT48eDpHWGo%2BT1%2BR6NUzIp7xjBeU5iYFkz03Lpc9GLXy%2BztMK%2FGMN4RnMsoWByiqnZN7whIgHD%2BfjyOcvpEFCr9mpf%2BDsmFHpVEPStsqj10bHUahcZF%2FAexL8tQQlK4m6QaT%2B%2BllOIq19rz35WBGPcaYaqqen8eXhzqlOdDUqkSOfbh4FLtdNpKb6JsW17J2NnD4ZuU2LGYr3DWWeL7Mcumb1V0zuoOCoE6g%2FIsOqc3TLKabgM2h0f0xbfLcRP7%2B6msNhKQ8hGuGv6fDtaPH74R9t4VxgeHOxi2XFGxAQINFEzK7B6PPVdauFawB%2FfjhQgbtki2LYpRIEHrLdCBQZsQ42LzVyUY1qnU%2FQto97QJQZU7nk0lBB6rp%2BuLzDYqOLKBjqkAZS7e5KqFUT%2FSB5CGYM1kEy4PwW5YDVhV%2FQDysqk4tdlpzve74MWGClTpzIpuU12gEqAgwppR2y%2B9crhfUGH7b8LEEgh90UUvyT1FaeBWsbPxjRTdD14xHaZWVCOdGHkTFBbrZvosEA2e9WaCOG0GKTmMLFDF3THGC9CbgtCaKQT57pjPbRR572b%2Fwpq9yu%2F2k7pEXSWLfxPHhkqK%2B%2FW5q7FDmn0&X-Amz-Signature=a1e32649a091dad7360292f5ede70916f219d6df2466a37d4b6b0d2439b0b598&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZIEIAWNF%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T070937Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCIEW3NwtaR2SdjtjcgYX%2F9zg%2FeBNceu%2BBL8ORpdZzikdgAiB5zTctbre6%2B%2BauK3gUYVirfpGgKyapa63yKVbh2RnHOyr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMTlBafce9h2OD6I6zKtwDTH86NGCpUL40Ld%2BkhRDpnZxbEeWKXBTdYM3wNubwXClvzcD1eRdmVFXGEH8dU6Gw4seYhWucn0j8E5djVocFqcOGGl5s70DYAdNfZUo9l5V94Om4MOoCBNFEnRXST5iLZ7TtXJHOqck%2Fn7IU4pwTh0jhuOgGt6iRZdSh1gDPeNsOiSypJUAQvcPfYPBrTbBLdMpV%2Bu88iaPyWrfMtSpUJJM2B5bqK1ha%2Bg9llZ6bkCJlOnWZ4laszAxvwbb3ItH8VsERqXEV21LX4gkmjUWKXSRrqY04VtRwPEerDyzcBsju%2FoJ8ftKpy3SGDkaaEyxQVh2iQVGXh1XOEwrMUN9YbOsDJUcuvjaeZ9yq5mf7hUxY%2BAbpb19qSNL5vtfPqysgT0KeTbo2di0CjY85GeW8RGTlVADYZQggiqgtl7YAXhx94Lm6vXUMnGAN7OrRzN3ZGXOSKTWI3ow2VcqiyAgae7bzDCktthjZ5ytAEgr45%2Fbejfa2OlFwUx19YXsNAmFgbujRxSGfZsD8XA99xQ9VDXJzqZDa%2FpzGXcvwkze0uzB6OIr6kbezOpRx78r015ymMHEptpT3tc%2BtDPtBBHX4IaITrFQdAfhQOoQd7gPbrASu4RgJKQtVLktWpUowlKjiygY6pgHBQkbh0ZtgBhZZH2BVeyC2kzgO3hQ1bhWKmtPQHlZ7RxxRYmFYCmZh5sliZDM6HnTQIQ9ColIi5yIgPRUiZCYVDX%2BQxLkMnRJHe4ViLi6IN8VXr9Gj7cg2CC%2FNuxnfVphf90kaI8Xg421JfP8f%2Bl%2BnEgt5xPfktUszASmxN2sjfcFkZYAwcLFICN9q%2FZMI29bV%2BCZbVm3v%2FpPytsMyHRk8MBy8C73R&X-Amz-Signature=c661c5798a7b71d8108400c666137393950c93f2b9e32f9384d5e53f39719c72&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XW74Q4RJ%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T070937Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCIHp8IPZou%2F1GrtGIgrwD6GwMrNIIFAqCsyWPsC7%2BZ7gzAiBfFJx64VTbQbeuSthW2UUhCzKdZPJ4NqpIjLImWrdR2Cr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMIySnV4GTMzxFgcoLKtwDHv%2BB3aum7X6VSlBh5FLt9vKCoB2zTYafYX7VH4DBuxTH0zEcZBorcxJfrqpMGK2VuL1NvMDM1pQrsJcOlMqdYsmRCm%2FhOY065qWL22Utvf7VTYIEailhwbtL1aBYCxeTDmlQwTSNvdQG3jrhWWHh8jWTG0eosBetTmaIykR1u46Jhb2wH185%2FfYkLmaqIof731sbiJQXzfiA5xOOU3S%2Fp3FqJtVLTXYST2wLSuHF2hW2CS9lcvnmp5Lc4XhhgzPxj1UosL%2BRzH5%2BBw6m2r8qberdQdkQYS1JFQSxssl%2FktUJmXkooyP71taE5J7fEpuJGREoBp4lQUnFYeMhrcByzgK3WEH9Y04U7TWWgNaDvUqu83hBfyNLk8%2BdW4UcQ92a2NW1xle7IM0zcdPYYtLNEqQqRN%2BpJnX%2FnV0VsFCGgiNRUfadCjCXq4DzmSCamCwecrrl5H8JYzYg%2BMjLjm97DLn1eTnVBq6uq8mh5st0Z9XxXPCcMFBCZfTnpkCfctLzBU72sR9TBNSAwazW1uXY%2BAuFfQdcatLRpiM%2FxEVj3HzMLDjzsf5XmyifFIpWvUjNJ8iRoVcDu41N1Lnzysmlwe%2Bsh2UxW5McyVi3cSv8ufAKpp7y1bYAYAYV%2FaUw2afiygY6pgHWdu70u9tnZtViq1gQ3UeUw455RslWBWdNy5L%2B70e4B%2FK2RA8AZQkAVJEDWn4MW33Z7uNMGVfiBaXWtntT1wPs7neAQ4BFC7Qy8eeA9Q9ZIM8qXRhkIP56KIk5DmyDFqwhYU3Jnx0zKPk6DUH6ElDmXOtI7omUVHjJNYIWUQ2KAiZ7bOeGh%2BEsFjqnUZZ1yWg1hASofkG9Uvg9r6X6DJbyOdsN8EvP&X-Amz-Signature=11ee6fe289fe3db16dc56363e19b85aab8461a7ae3ac91db55feaebf5625f932&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TP2KM2BF%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T070937Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIQC%2BKTlw4Fueb%2FOgFGYYwqeMIZER0qa3avHaqZlvvRjlQAIgPiGvQr92871wVZHDljWld8SKlgB1%2BAR0HKl9iFVKnD4q%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDIEhzR29M8ScT8UJoCrcA8mQKv0aodU2c7MbWxlpVCAD0tXD3YQNfe%2Bt%2FOqgL0ub8cHZoh1s56oxh7TWuDHh4Sfu0JIDEDj7kUBcqII3s3JTlUeDksKrUUQH%2BxQvWPtBiLuEwnT3dwNvb5NOJhZ8KBynxYerFKYDSr94R2LfEYhXkunuEb2Fa0U%2B%2BHc7HKIqZ2I9MT0I%2BEbJG1m741ZjJ9%2Bl2XZeNZi%2BW3r%2FBFBtFw7BwRVKpjd3%2FbhUF7X06RS4ixkB5uok891WdujLtPKJCdr%2Bgd05JVGkVTpd2nxA4%2BMY6Fx4BAOcJ1g5BdwWIKdnwxkhZehXZdvWfPziWjk0J75itLLTlchoUnYNTR%2FVxOaHpKQwCFfxt%2BP48kupl0tH1vlRLYqu3E%2FPbFyzbeXUbGVr61ZMwSQO%2Fqsg57YScGfVeOwyJJuPMNDtPcFMdCz0Dv8bzAWXUKY5acUjX%2FDasBHue5rRzyAhGJg8pWZVT5D3fQ9dffxCb21FwywtxDBb3YwULLhuQJEgY11CdBvc9zNfHWhNgnfGTCsHoV7I%2BSd0IkDOxLcl1L6AGV78vY1yCi09atpjWJLh%2BZn63Cifuxdzd1%2FAwwvN80%2FYnG8qcTTN76MHmf3g0yyg70AwoILytp6bB5To62gY3BFZMLeo4soGOqUBqv8DEFTauOcN%2FplB3i6LWBoSvgtS5WMVFc7j0L7lfsidsvd%2BpcONrqTlO3%2B7uHa1P40%2FcI1uefnQUpzRdu9W1u9WYAg%2B4efVPrDrSiG%2FeLpNJJVGr4yYbmzd3JEBLjzojxjch1BNl1IuYDAAYIbaq4E6HB8QuYS3p%2BCo5eHHmRpL7EH3nNNB%2BaI5TX%2B8GDYYVIIPK%2Fc4zB1%2Fj1jiQbf6BxdeSBlq&X-Amz-Signature=640ed23c6795067c21918b956ff9f02b020a3c66577de0ec502ace03886af46c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YHLFYBQV%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T070938Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQCEYq9a9mTJyGfWtPGet7aSx36nTyRQpeFCpL84w6pdxgIhAMrJ8fT9iQjYRatGGL935QqX34jPHd7dSBhZ%2BhY9ka%2FnKv8DCA0QABoMNjM3NDIzMTgzODA1IgyQ9Fd2codO6oQ1DxAq3APceD%2BinLEM8JtR2EmFVZIYPZh2iIMe1gAM64tnVFlNPFzOG1NC0CBeozYUMAjojVBQ4mV%2FiPtXMhjdCErdSrXQB%2Byph3y4J%2Bv70PlKYgowYWEL4d4nV4lfhY%2FCLJ59iyHlIObHQkBS5ZsNVPF%2BLM74VfbAbAZAHU%2F0tCrrg4SyHvwMF0tOPT%2Bz5xL8wL9r6yE4y8%2ByUXoJEmbJq31rrpMpF55w7J9XgzfJSiN1z8NKqiiKOCL704Uz80GRBWaSHE8AazsFC2yrTVLwpJXvq0hU09QxjCi%2FcUrhKR2CZkxjnnEGGndDCIhJilVBBrgrqxHgNNKu0pGajri7%2FQU1axI2YbXo4RB6JnatbTO4K2qfMzG5CJh4bAdnW9sQATy2NCZqklfcfP0PatQAlPKnakbZas1bgDDSRsd6miUczholu5%2FqdHp3lURdI5BhnkjV5Wurgv9T13Z5icjpeNNNDdZ2CqnQQL0vgPhZxIVJYIFa%2BbKEp2FKjg62fRi19p2QsAZjVL%2FtZj1klV0wGmqFmh16ZRITkJ6hJ%2BphR3wrpPnrhnl61rMXSuBntPzlcLB6jfLYoZ06C4ZYK%2BXxB%2BtRZIfMvzqa5ec8NkVbtRjmtgPETbvHfkmSvnSHRQjmujD5p%2BLKBjqkAXN9uOnWz8X0flPsUhvE8iVLWYLfd2rpMZM19RKMMTsUSw8OHf4M%2BOyy0G3pjAHBRjQ17I1iWblunMF4VnznQ0ZInCFgnp5uZPwKCnJqW%2B1piPI1%2Bfj%2FeCqE5BcXWcxqVtQYJcfAEPJ0oT8%2FoGAs21ba6466rR6pxTahwBGTxkew2H6PwxBadzvaSXI7DSIDacVTOU9upxXuqmISbrm81ieEWdxl&X-Amz-Signature=4cd2e409692358faeed9dd5a4e2122a718b17c440aef13743f8d2913757b0357&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YHLFYBQV%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T070938Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQCEYq9a9mTJyGfWtPGet7aSx36nTyRQpeFCpL84w6pdxgIhAMrJ8fT9iQjYRatGGL935QqX34jPHd7dSBhZ%2BhY9ka%2FnKv8DCA0QABoMNjM3NDIzMTgzODA1IgyQ9Fd2codO6oQ1DxAq3APceD%2BinLEM8JtR2EmFVZIYPZh2iIMe1gAM64tnVFlNPFzOG1NC0CBeozYUMAjojVBQ4mV%2FiPtXMhjdCErdSrXQB%2Byph3y4J%2Bv70PlKYgowYWEL4d4nV4lfhY%2FCLJ59iyHlIObHQkBS5ZsNVPF%2BLM74VfbAbAZAHU%2F0tCrrg4SyHvwMF0tOPT%2Bz5xL8wL9r6yE4y8%2ByUXoJEmbJq31rrpMpF55w7J9XgzfJSiN1z8NKqiiKOCL704Uz80GRBWaSHE8AazsFC2yrTVLwpJXvq0hU09QxjCi%2FcUrhKR2CZkxjnnEGGndDCIhJilVBBrgrqxHgNNKu0pGajri7%2FQU1axI2YbXo4RB6JnatbTO4K2qfMzG5CJh4bAdnW9sQATy2NCZqklfcfP0PatQAlPKnakbZas1bgDDSRsd6miUczholu5%2FqdHp3lURdI5BhnkjV5Wurgv9T13Z5icjpeNNNDdZ2CqnQQL0vgPhZxIVJYIFa%2BbKEp2FKjg62fRi19p2QsAZjVL%2FtZj1klV0wGmqFmh16ZRITkJ6hJ%2BphR3wrpPnrhnl61rMXSuBntPzlcLB6jfLYoZ06C4ZYK%2BXxB%2BtRZIfMvzqa5ec8NkVbtRjmtgPETbvHfkmSvnSHRQjmujD5p%2BLKBjqkAXN9uOnWz8X0flPsUhvE8iVLWYLfd2rpMZM19RKMMTsUSw8OHf4M%2BOyy0G3pjAHBRjQ17I1iWblunMF4VnznQ0ZInCFgnp5uZPwKCnJqW%2B1piPI1%2Bfj%2FeCqE5BcXWcxqVtQYJcfAEPJ0oT8%2FoGAs21ba6466rR6pxTahwBGTxkew2H6PwxBadzvaSXI7DSIDacVTOU9upxXuqmISbrm81ieEWdxl&X-Amz-Signature=e092d58cb54805e47e80209312db39b93214e4750f84bd07d2b678799f7c4434&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W5L3SMQJ%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T070933Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQDkPWXgMfymF3uSqabff4CtsOhGEz0Y6Q48EvamlZSBZgIhAMRLGgbFrzZjthCtm8Kpo%2FoAqDKooSWOE%2FmTDRzbLcKdKv8DCA0QABoMNjM3NDIzMTgzODA1IgxQl3oPypGqYqWe7NAq3ANAVoX9TQGphkJOSzUg3KQpUhep8AKCXFC3TTtoHXewwP00H09yBtZwuiZ74PYVZYdSt3s%2Fh0X3RLCphW2nbWVomB1cQP%2FCeGeNWX8hnAPUq%2BB%2Bk5%2FINHZobiMxE%2FNtDT6o9Xua1QvKr11nv0X0VKRTDFz9Hxof4CU2n5tTBEjXDHj2SN0RUzM5dKAFXbtrgwNZWkEwxMl4fHDS5VVIx7frDTGqahxhBdbJuhl9BCBwoKL2l5LWOJnyZ0g8oH5xI08jzcBbSP9tXyS7sLJVHtq9bMNn72Xq34z%2BBwPD%2BhglbzOMHE6bXqdCaWdKcaXOC8Ixva2Etu0c4r5iX244%2BYN%2BGd5MWwUHj97vkno2WxgcbrBm0W7AX9wVyWSQ2tsd%2FDbkW24QQVn3KCoh%2FK2D%2F%2FkXRwHQ8kTcsYYYDU%2FqSHDPYtVbpMC0OgKUoO80FLgvF4quMI7xl64tYwsgvTZwVEpyA8CP4QT1ldaa3SGxCyNtKCrmOTOplJSMKRS46rrIBmk1Fq5o%2BZKjF4s3lLLDSQbKMnpTDOi0kAK0fQt5TsxdZchJyvQn%2FcnSYFqVKsib05uDmRJLGzxSNGpTzMH%2BdQAs9pW6nyIeYQp1jcCFDMs8HYMPjM2GzB7%2BkP%2FiKzDFqOLKBjqkAXsvJHa2zKTsYxL6OuYO9CL15%2B6GXG%2FdHM0c2WyNZoEiqSXLprJSZ38wFh%2BtoqTm5MflFuC9zj0MTnKO3uqyuWBLiWh63uf%2BOvrJZn4OPQS0N1ItY9UAdRI39AoSA7bcfGJs%2FGkeIV17Y6x3NKa021khtKZapFESGK2zrU6UPhKV23UM1eOL%2B9E7GKPiNZikzpyWsJjI5xExAv3ctfpBJP9STeyX&X-Amz-Signature=68a9641f108913531bea407d2712495dd5a755d7a6e816e04e37495ef46e5855&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RWFU4YFK%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T070939Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIQDEGxqyVWMAts5vCO4R0ikz7h6kyYCINbw1ma1Z78KhAAIgUiJ%2BUsGZLM3g%2BxYPULqFfLuYwgFKRXJ7X3kt3CowXhMq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDA269Tm%2B42X%2BT19mPircA5oQSKkJH358hLNmv7ACr%2FttQxmkdfr1CfF8WDgAhtRaKf4UEGkIx4OsrLo5SJzDhkdHLo6mxAhNtlrPet%2BEaYcfrCrRlymYJgRpQcStRyBnSCHZAdDrqoKFf6Be8xgEbXCPltJy%2BJVXFXK6gt2CqGK3vwIwLc5VJX6AWyk9ENarLUpaTNe2v9afM%2FTWb8tQ7NUYoEi7XhwmRm6fdjlpreWWC8GFihjVEVRclJtYwLhtDpXi31Uq%2BVuE%2BArIhgJNf6%2FaDZ3dV9ly0%2B%2ByX3yoXyDHdUZmePLE%2BgG%2FKpZUN2VjPHH5VdFxlwWTmTz%2BHW9u9Y4vPFkQc4VAGC7BKXSDz6ShMm%2BeJnWijlFHj4ciy0KJSTp8U4Ki%2F3%2B41E0GOyVTcV5J3Nn9iZ1uSPm263HyY0diJAtP4V5BMwSxy7tnQshKqrNdTq0isKEjFbc9bvOv64CPXDwE9GaOPNHAjgoM7leOxIhLOXeUPabUVKAj6h9XFZ%2BbXZKuCF%2FlzsqzXhIw6yRzU1SUsy0uLb8rha6eb4lu3%2BnYZKCUegT85OLvmzk5oGZiGbWApMAsU6kVcJAgQN4Dspks443GHxHnjR%2BdoScLdA5513TSlpaBvVfd4Ao34wv96tXgUGvExQ8nMJ%2Bo4soGOqUBZMfTvALwhChlppplL4ijbKgH58G9XIuOTcHI37ayZ7Uh6g1Q%2FJB%2FU94PFe5gTbiWOV1rTeMF7pNXxX2jf%2BcEwoOTOLUaKZfE4SK%2B996rXpwIYCqaLqB0sUTX7kU6AIi8bohMsWP%2BAHN9t4KP30nOAnQkt4FdyNafBsRTrpAfhXcnkgJy8o9jSjmMGejNE5irl28BMSPG0ei%2BgUrx0aH0adi0YmGT&X-Amz-Signature=a40ff1eb8a17c643bca9df0e1ff95f4e0f86c981c7651e4dc07dd7816fcaf8af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RWFU4YFK%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T070939Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIQDEGxqyVWMAts5vCO4R0ikz7h6kyYCINbw1ma1Z78KhAAIgUiJ%2BUsGZLM3g%2BxYPULqFfLuYwgFKRXJ7X3kt3CowXhMq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDA269Tm%2B42X%2BT19mPircA5oQSKkJH358hLNmv7ACr%2FttQxmkdfr1CfF8WDgAhtRaKf4UEGkIx4OsrLo5SJzDhkdHLo6mxAhNtlrPet%2BEaYcfrCrRlymYJgRpQcStRyBnSCHZAdDrqoKFf6Be8xgEbXCPltJy%2BJVXFXK6gt2CqGK3vwIwLc5VJX6AWyk9ENarLUpaTNe2v9afM%2FTWb8tQ7NUYoEi7XhwmRm6fdjlpreWWC8GFihjVEVRclJtYwLhtDpXi31Uq%2BVuE%2BArIhgJNf6%2FaDZ3dV9ly0%2B%2ByX3yoXyDHdUZmePLE%2BgG%2FKpZUN2VjPHH5VdFxlwWTmTz%2BHW9u9Y4vPFkQc4VAGC7BKXSDz6ShMm%2BeJnWijlFHj4ciy0KJSTp8U4Ki%2F3%2B41E0GOyVTcV5J3Nn9iZ1uSPm263HyY0diJAtP4V5BMwSxy7tnQshKqrNdTq0isKEjFbc9bvOv64CPXDwE9GaOPNHAjgoM7leOxIhLOXeUPabUVKAj6h9XFZ%2BbXZKuCF%2FlzsqzXhIw6yRzU1SUsy0uLb8rha6eb4lu3%2BnYZKCUegT85OLvmzk5oGZiGbWApMAsU6kVcJAgQN4Dspks443GHxHnjR%2BdoScLdA5513TSlpaBvVfd4Ao34wv96tXgUGvExQ8nMJ%2Bo4soGOqUBZMfTvALwhChlppplL4ijbKgH58G9XIuOTcHI37ayZ7Uh6g1Q%2FJB%2FU94PFe5gTbiWOV1rTeMF7pNXxX2jf%2BcEwoOTOLUaKZfE4SK%2B996rXpwIYCqaLqB0sUTX7kU6AIi8bohMsWP%2BAHN9t4KP30nOAnQkt4FdyNafBsRTrpAfhXcnkgJy8o9jSjmMGejNE5irl28BMSPG0ei%2BgUrx0aH0adi0YmGT&X-Amz-Signature=a40ff1eb8a17c643bca9df0e1ff95f4e0f86c981c7651e4dc07dd7816fcaf8af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RPZ6QILO%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T070939Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIAmnzr4ezf%2BEwZcCAoLTw3WEwH4XgFnWELvzzbVpiH9XAiEAxpoUoszro55%2FyQ87o7Sn88a0lvx6Ub7LVDJuV6iaeEMq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDCYuXjkKxBjjdRIuQyrcAy8uexdTVvmDVQvTGq%2FPhhdoR0blPHgr2GEZwFD0vM06bTwy%2BjqQstgKako68GUxPz4upAW5ibFx9liXnd7ajBsws0VMAlQBomguTZ1DbEW6q4nfGlrYLP1wuH9KcTJDnM7qLr9tX2QMgbJdTrJ2%2FedSlgcNxJNMo%2FtNceiVw4btVn5Py%2BvV8GSq8a3o8B7SaI28241Mdh%2FlnYGm5B2g%2BRniAixWn3HBbUA0UMQ6WC%2BnnPd5%2FN4PFomTdurrTWp9S6i8c8Wd3kxIV9sqSZHirpiEhv9uJBInaeyGaMbzrBscs7bsM%2Bfg6iAxsL9lkvTrg%2FPPLuYNzuQfJp3MTOfmdb09GjCI6pIyV8ICYRN9GqN%2BKC5iEN0RCxWT5WgoiQWeeXtylB96TcwVIW7P88XLtgncXsbqwIFNfOXCZ9WZlscYhMzN5Uhn3JSx5lRs72Jh5QtUycLaylm1QEDSxJknGgqcFgmZe8IrhEDZpZXRB9FvF1zCqIvmi4lWYwkQYrqyUXbRdb58I%2BMHF%2BZ75%2BLlUDDb6MZ01R4l7TMBN4%2FHg%2FCEf4qGW0Yk0ghyh9%2FYVxC8VsXyqzA3S1y7FWmLq%2FImlQR54WsIHSW2ylJNfOnmiar69ZhbRad8oSTEaMR8MMOn4soGOqUBJ0PvJgUVK1%2FHhPPMka4UcaNzOGF6e%2BwMabQEvrPJbMXWa8d3SHhqOJkTWKmVj8kibY0ZbHhL0wk7t7cy6JgnKJLFchpLkQMdxJAJOXEQbfl0f13tfKTHikBZgmfVq4CnAyuyeYyQiCTlHYsXBQ01bRfH%2F%2B%2FYqgH8OPUhYUfH6ZMJyx9BRATssRfQ8xYjffE%2FwRaQ6PxGqgHtyNc5E31YCzBi5bC4&X-Amz-Signature=96f5dc5b9ac4d0f1f72325f2b7ee322e5e9ce8936663a75b3828a32fcd912ef9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

