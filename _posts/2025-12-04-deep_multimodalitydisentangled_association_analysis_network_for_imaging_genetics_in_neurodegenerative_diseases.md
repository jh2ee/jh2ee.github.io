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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664F6VLQYL%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T122627Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEXO3lsJQxKzp%2BzTq4QAGOZv3na3mgeY%2FMtpfQBh34vZAiBnFQNllgim6k5XQ%2FDn6z3Z0JkdTJz45mYYwCfEwQrgiiqIBAix%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM8t9nrMXdWk%2B3P%2FkTKtwDgooMamNcGW0mj4iiNGu4rVzns1yFddcEauNbEw%2FZxMiUwU7IN%2FQF2H%2FVFPRDD3KYjs7zZhJiNFkFzxK0KYw1i79qVz2UNetvca3ERbulLRI5L83PidWzcqyb4hQKw8Ibs%2FsIn0TvpTygUdv4XNmTRtKefzsDjwVlWiEMo7I03YFGZYPiwxXzWZfP4zV%2FC7wX%2BaZSdx924MJXXtNbcyZfK7zaxVjELEJMAN0Vqyytc2HbieK4Kfya%2FCAH1TxQFAQ%2BoStl63NZ0RPqXqgvYXdPperRvQhSmlxm2zuNhGakfBMXxVOsfy1qjbPigelUy7jpmS4zv6%2FqrIhpZFdgyxa0MNWlWMkPxANYKfoPB38SlrQKF%2BEJEDMN%2BglhtmRfwRVAuAWb0HCcmeZIfD2BefUv1oSDjP9IEJlzOwpT%2B11swFse1qbWZ0HGlzfz4Wi3DnwxsLwbR744drB873Z5diCOnBDTDj564R5RBIEUYTIL17tWvoBP%2FiF%2FOEKXxN1AIHS6%2B4OmHcjzYzeolYwLbP3J%2FAcuD1NxvxElXhqS0lDftzJYecZ3Sb9bIeL9YMH14EPGv2vqAJa6iK8%2BSKLCtBqTfEdaMojsaPgmzy5uMpZzncmQNEWfVUkEI6mU9ZIwv63IzgY6pgGBvnF5OUGI8SVAkltRPtXuzVdpEWe%2FsIrZdsB8JAiYj58%2FJc3WcguHkAdfpc0Akeq%2B1pMqF4gzPXKPIlEDSgNVDRGOYLoF5l1cF1%2B6Mb%2F7tcHA47qcVCbbJEg%2Bd%2FsEVfjuhYkG856zjORj1Ivs0VeKRgWSCvCg%2Bz%2Bo43vd0pCJgvrB6GD%2F7RJWBGIpiVvrkas93IjqYY%2Fw09sdlD3IBP7YYhIQAiQL&X-Amz-Signature=b01fc60b88cfb3199871ffb69266d4357dbf4f5afb4a690d3d19f040faaf4b63&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664F6VLQYL%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T122627Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEXO3lsJQxKzp%2BzTq4QAGOZv3na3mgeY%2FMtpfQBh34vZAiBnFQNllgim6k5XQ%2FDn6z3Z0JkdTJz45mYYwCfEwQrgiiqIBAix%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM8t9nrMXdWk%2B3P%2FkTKtwDgooMamNcGW0mj4iiNGu4rVzns1yFddcEauNbEw%2FZxMiUwU7IN%2FQF2H%2FVFPRDD3KYjs7zZhJiNFkFzxK0KYw1i79qVz2UNetvca3ERbulLRI5L83PidWzcqyb4hQKw8Ibs%2FsIn0TvpTygUdv4XNmTRtKefzsDjwVlWiEMo7I03YFGZYPiwxXzWZfP4zV%2FC7wX%2BaZSdx924MJXXtNbcyZfK7zaxVjELEJMAN0Vqyytc2HbieK4Kfya%2FCAH1TxQFAQ%2BoStl63NZ0RPqXqgvYXdPperRvQhSmlxm2zuNhGakfBMXxVOsfy1qjbPigelUy7jpmS4zv6%2FqrIhpZFdgyxa0MNWlWMkPxANYKfoPB38SlrQKF%2BEJEDMN%2BglhtmRfwRVAuAWb0HCcmeZIfD2BefUv1oSDjP9IEJlzOwpT%2B11swFse1qbWZ0HGlzfz4Wi3DnwxsLwbR744drB873Z5diCOnBDTDj564R5RBIEUYTIL17tWvoBP%2FiF%2FOEKXxN1AIHS6%2B4OmHcjzYzeolYwLbP3J%2FAcuD1NxvxElXhqS0lDftzJYecZ3Sb9bIeL9YMH14EPGv2vqAJa6iK8%2BSKLCtBqTfEdaMojsaPgmzy5uMpZzncmQNEWfVUkEI6mU9ZIwv63IzgY6pgGBvnF5OUGI8SVAkltRPtXuzVdpEWe%2FsIrZdsB8JAiYj58%2FJc3WcguHkAdfpc0Akeq%2B1pMqF4gzPXKPIlEDSgNVDRGOYLoF5l1cF1%2B6Mb%2F7tcHA47qcVCbbJEg%2Bd%2FsEVfjuhYkG856zjORj1Ivs0VeKRgWSCvCg%2Bz%2Bo43vd0pCJgvrB6GD%2F7RJWBGIpiVvrkas93IjqYY%2Fw09sdlD3IBP7YYhIQAiQL&X-Amz-Signature=b01fc60b88cfb3199871ffb69266d4357dbf4f5afb4a690d3d19f040faaf4b63&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663JRM5AAI%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T122627Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHiUDKbIIv7Aj6SwUGLm0XHJaMkuhsLnJE0YZPJD9D8mAiEAwb1cobo66L8n0oaB3u%2Fkwy4yRCG%2BeKVGBzIIq%2B6Fa%2BAqiAQIsf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDETNDnMr2A8cPimCqCrcA3UV%2BbrvngQLmYQbi1wLdQuNfIjxH71zntkFobPywGErv5VbcaEoWayFD57F6NWF6vjU0CCtZ3vCzBbQioB9VrP62%2FMpBd%2FjSxjTXFrJEDGuJb9tDnxbINh%2BiGTg9ZxJ%2FxvltaB2CCSm0kYoeiE75mvIN%2F3BBel%2FIHNLUdCOGyuXwbsp%2FZFdgn1BFc8lgBlesSo%2B1lpOj5DjxGpWPGnum%2BhF20KSzTP3lXxb7vbI0vmCWyCHi%2FD%2FIfCf%2BFfznEEZZ5DxwP7Hd%2FUB2OSZmnfgHQqKiSuvK%2BGEEeODZ0%2Ffzzkbr2UooQ2i5gp4hBPMDYNUpoP7YI5Sx1UPxOovzBOWLzHELwxLSu6jUTNoKVJWD74JyTyRmp7pUG3Stqecu5Q%2F1iMgNgLPiM8iMS%2BIP8a2%2BdW4AeF9oxDI90cAS7z%2FvXX5W43F0rQRNABQguX95WkDX6grVlxvpu4Txs8AFh%2FfK6hd6vWjHT3Zj6MqRXy9uL86VA4aGAo2pcRBxs3hkJKsJPTzkYZI6ZfRAGR%2B9Ks3e79TF%2B8t55eFh7Hg%2Bik2rNlhc7sjtm4bSD16wS93ILZE9hH1azcnwCzheO1goWYACFv41G%2FwDxPVb6eJiwLENZzE6msewRCWRBMuz8oRMK2vyM4GOqUBtwbCm2P2PbVT2SrGTYxBMJxvhIAknHq1YPW32meHjEsMug%2BwLHyW4qQq5FEx4hBXJRyzi%2FKEWdryTYyukbrrl9hlqHn61kuv5Pqml3gjwruu%2BGHrv%2BZ444VAwRhmWJ1REjBjMPNdCzwauMvD8MGA0Yn8SNJZY8%2BFjEZZjAuWwv0JFcg1mMjsXhWSYboZmp2AIv12zzCPD6Ksiwu4U2XCwqu1ZYgy&X-Amz-Signature=eea07dd601c67226fbe602498a5491329bb5ad25e59854ea31356ff691f98d40&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656QQFOSK%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T122629Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC%2FPmDxU70NT63SmtvpgvvUXnzA%2Bsnu0QdVDSUUECLewgIgBiszZMLl0QC0yZm1%2BKOrIt2cwuwx0tTbqVQ%2FXkTQejIqiAQIsf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFRh9Vgd7lUbn8XrXircA4dNb06%2Fn31KOgBoCmgsa7caFr542dzZuy%2Fwn0jW6r0AHeMZ5vkqsLKlOFZnns%2FQ5J3GvCUF2K%2FeS2npK28ihSqvC3OVRFYUKog6mPPFIUrO88ENgw9BW8VO8EV7nrcGoOUPCMCwdh%2BlGUjUlX%2F61xa3TSvql5RtXJrh0hcXQRwJCd2kM2IoKeyVqG8zCAQHGBCLLbWFtYsvkaKtc6xJdwmtvjddGSgnlQus0VHze3jd2l9Rf33VhKv890gVZ%2F89q6jXlNe1D6bRClihhU2UIgJZzHwDTbYAtHtQ2bQfcySdIJQSrW0YE8IkDGnd6WJiMx4pybEK8pj6XeFxp4op1Dr3tmrcfmwLz80DEdYzMYqT5FkdNlA09OhsabeD1Rf7iSC%2BhY3Qwl%2FPrI0PdYHRbKkoOyBhwESItHX9%2FMvlxpBBbI3ep2JqT0Gg3DP22uhxVrpTJqbtbpNd0FWqMltEccgocQ%2BT3ICTHiEC5Q7KsbtAxKmdx8mJw%2B%2BGOZ3%2FUF85IwvN%2F%2BHgh0Ueeu40FX3fV7p3KpRlt4q2Z7K4ZCZIAnLI2dDVQeHmbIaJpqUIxlgu1FWbRjZfISQ0vevrZ0Far69YMKK%2B%2Fp2ZqYCvR2MKM%2FPQnc7dsBHvV5uyiH2oMJ2uyM4GOqUB7V1oism91rq360DB0ogeOaWdnl%2FUxGhf5PbGyR3NEGMoUay7hOgajiSMuxQnKG6nUEl%2FEyJWaVts5l9snoKHXMM%2FnVwhcX%2FQ7N89%2BYBSMzoETKnhwLTOC%2FnRBAiQYvlKP1%2Fhgbag9W4%2FLMLq2JVOhywEZ9WvQzBu7s7tEnz5uRHqgIAyzPmL4LV8ipcWGBkivIGAEbHx7Xh912TjS65SypzPEd74&X-Amz-Signature=0eb1513c254db76cf05f4a875df47f6662a1f944fdabef9ca0bd0c0097785a9f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656QQFOSK%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T122629Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC%2FPmDxU70NT63SmtvpgvvUXnzA%2Bsnu0QdVDSUUECLewgIgBiszZMLl0QC0yZm1%2BKOrIt2cwuwx0tTbqVQ%2FXkTQejIqiAQIsf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFRh9Vgd7lUbn8XrXircA4dNb06%2Fn31KOgBoCmgsa7caFr542dzZuy%2Fwn0jW6r0AHeMZ5vkqsLKlOFZnns%2FQ5J3GvCUF2K%2FeS2npK28ihSqvC3OVRFYUKog6mPPFIUrO88ENgw9BW8VO8EV7nrcGoOUPCMCwdh%2BlGUjUlX%2F61xa3TSvql5RtXJrh0hcXQRwJCd2kM2IoKeyVqG8zCAQHGBCLLbWFtYsvkaKtc6xJdwmtvjddGSgnlQus0VHze3jd2l9Rf33VhKv890gVZ%2F89q6jXlNe1D6bRClihhU2UIgJZzHwDTbYAtHtQ2bQfcySdIJQSrW0YE8IkDGnd6WJiMx4pybEK8pj6XeFxp4op1Dr3tmrcfmwLz80DEdYzMYqT5FkdNlA09OhsabeD1Rf7iSC%2BhY3Qwl%2FPrI0PdYHRbKkoOyBhwESItHX9%2FMvlxpBBbI3ep2JqT0Gg3DP22uhxVrpTJqbtbpNd0FWqMltEccgocQ%2BT3ICTHiEC5Q7KsbtAxKmdx8mJw%2B%2BGOZ3%2FUF85IwvN%2F%2BHgh0Ueeu40FX3fV7p3KpRlt4q2Z7K4ZCZIAnLI2dDVQeHmbIaJpqUIxlgu1FWbRjZfISQ0vevrZ0Far69YMKK%2B%2Fp2ZqYCvR2MKM%2FPQnc7dsBHvV5uyiH2oMJ2uyM4GOqUB7V1oism91rq360DB0ogeOaWdnl%2FUxGhf5PbGyR3NEGMoUay7hOgajiSMuxQnKG6nUEl%2FEyJWaVts5l9snoKHXMM%2FnVwhcX%2FQ7N89%2BYBSMzoETKnhwLTOC%2FnRBAiQYvlKP1%2Fhgbag9W4%2FLMLq2JVOhywEZ9WvQzBu7s7tEnz5uRHqgIAyzPmL4LV8ipcWGBkivIGAEbHx7Xh912TjS65SypzPEd74&X-Amz-Signature=0dd322621aa852bf4fdd0b0a8c31ea9faf0aa949eaf71ae0256314edc0c2d37f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7S5HGIH%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T122629Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDSD%2BMf7VLfDjtd0m60f2TTuPr%2BBN9IAyZaBOpGo4ePBgIgNkF5a%2B2ethlckbxzCnPGE0AhMXmP0qOaRKWU1Wlz7F0qiAQIsf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOdvBQ2yw8o1ZS7qGyrcA9%2B%2FAjZiWJbrZwOgcw3cAmMlyeqAWlVk8MhNokWv%2BqFYA095OVa6Q8G7RLzNQqKRPk7SKFnXoH36o4fNomldlyL6H00UhqErYQO37uap6TuQA0DLe3ArI%2B%2FdRndPWxHcUB2zV15wE%2BIXH5KzJ0ZPCZSmieYgLgSgxc9pzppW19NOcvFzpFqRP%2FAqm70UYeu8%2ByatjK9N9d5S71CMJt8Fkr9qsm29fS%2FHMKlyN7M9wYojkyXPXnfzPUf7J82bq5b5mAWyaawaLWFTSs6tsmZjM2gJTM3V1RGM7nh%2FsCIpOrBFmghiKHsVcrCSiulqZi4MiChqrHaNgokGFFoRHn8a2MbpH9JnYaeNlEyCpPG93PfLNobUuk9BXDa8reZo253m9Rpx5K24MJNQoRuCe6FxN1vJr4p4P0ZkTjZmcUma6A5K4mtM2xdFfNsHYxDpzk0%2B9rX7JueNcWm8HycoqegVthVo8KODSXNsxf3mj5VPZIWy6YHh2xeLl1SJb6Trq76nGJSjdMC3J6FutRBWv9wPf0xZBMVEQTXSTzfTvwq0o5wqXsvps2JYoVj%2BOSxgcRUd%2FAjvmjaDBPh5oSkvLFI%2BcmpMz3XPzwJAcR5lDN43WFAbPDVmBhouS2g8dOGGMI2tyM4GOqUBKsw8nDaZ4vEYtQAY4ejbLNLeXMZ666I1J4jPOlrLf9knquIWKCHGV3tamhqe5ifWu2M3BgVbZMoBqev6oSmEZO9tigwC0z0hA0ujLbRmm1RnNqY6amr7TDxZPuzkGNMK3R%2B7j9II4a2YUJPjaykNKgzEx97EHGsnvJN2oK%2FShBcMar25VwjJBjyJlThWAAbUAJXtbRNrRp3ImIs%2FBWpl162xLSBb&X-Amz-Signature=4fb204b6095a1a169fa75565840b5327651fbe5a39a9ef9970018fd5115b15cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664BDLZVFL%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T122630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICTX5r8Yg6xUNTY9fALGZInzpclZ%2BfAGese78ow%2FZ6yIAiEApHP3AIymUidez2Bup9r4Q5FSdRS%2Fn8Uf%2FzvEztvZxeQqiAQIsf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMlLn4zS1BkSJuRofircAzTttuu%2BmGnuIiLloRcxK8GkFc2OZUcG9h0tfCc62crRyFlyYzqERlFhn2Cmgjxbz1rURD4LCIPj8qJRHTg4%2FUn4UVI3r3Dfvu8O5KAs35oeMO3%2F3gvQAQc3Ko0Dh9f1EbEwIRKtGcnV6QLViJKzD5yrNlQnr4HnO%2FybF%2B0xdupkjaUjw%2BZ6KLJdX7Si%2BJxzBB2wpAvaZZF2VRxMCXWVlWv7b6gs8f3vvSFQyW5kSF3oB0sU1DUCou6LS%2BHg%2BgyjgdqbDeKQutrJmaVBJ%2FqntyVJ%2B3oN7poEscen2YS8Z8X%2BkhoNMGe7xHCoWmWE4PgGlQc%2FpGk6dt%2FBbkthJqZp%2BG4g972cIQ8C%2FTEnZlgF6kfgz0UNXn0uxIZqP39aptaxeXZcKw02z2dJ8Xtpb%2Fc6cfISapccfblpAwwmcYpCG06P9YXx04iyRrI9M7ijBtymifQH3Qp0umfqJ3xTE4KkvR%2BuXLsQQIqkvykaea4Q4%2B8aHFqwZkeVsbHU1RydteHTDxuBBfR%2B3ydATe1I94AzD2kEimPSiQqRzY4rWOAzS8cGODad7OfkaEztFyNghcOyVHmeH19u%2B%2BbegR6trEAXpLDWUsYAnf5U0EC2Kxu0ZG7rqTGKfM7ATXSr2GVnMNqsyM4GOqUBnEvkeLE13allV%2FGPCBzTqu7QHtuzHFisAABwooE7VdUeXsMe8zd%2FdViVOwwzIL3%2F6pK9IOJdfUJiXv8TgR50j2oeOanTx31yowVMG1cOQ5YxzgnopCq10rlaAykaclrflk3glHIbVTCtTUu%2FHDk19nVJxV7A8xkRrBW2Oq3kHz8XfkLl%2Bcpy1wiGTINPH2uBV4K53YuqdaPAUQz8cFKkfloIb%2FqZ&X-Amz-Signature=788363d85c03d67d1ee75c013e783ddb55b06978d14147868e2dc5547c1c42db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RJHTT3KL%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T122631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIG1sXUCM372UpTYWmcti1zTWjALpkrJlHw%2BZG3L%2FJzI3AiEAgTa9X%2BdhNdU7%2B3580tISJ9%2FgW%2BpxWefzz0UcL1bb7m0qiAQItf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDK3pZMEBs5ZAXPJf9yrcA3P0MF3OAc04TPTck3sLaAtImDCkk9zaC2%2BX26TfoPqwgsWORDc3BsOhyqEJLwuoDH8BwkNv0BEGxbBEASyFbZHmxexOwYoqWRd2cKDlU6wcP4NU6192NY8fKQpMefTUpJxJPQwBce77F9F8z%2ByBc%2BNlLGNW9NQTnDdHR2qfTkscMJLEiDoQfXO4E3Err%2FJotqEbQZU88MTqbminakOuyb3ojBmDjmtLKD9OxxZ2rd9vU5ZQJPpCK01Aqhzc%2BVwVK4DTupM6PkokM5xOHdTGnJy7GpTIGiNhU%2BvKJEkbRaKyvazqraXvgtwRaRKjEcqi%2BMgUGDz%2BVFxFuVZkVrQLuQqd7WpL5q6HoQ71qElyNQI%2BlOuhvUP8gm8AblVaBl2BWW5nFnTRZHVTYkb80CEBxioUk8JdzlRv7ICdEfaXxBySNSokJPUH%2FFPsHSxGgaKbVKIpIASCI94E7nEoiHDL1GfN9h282nxV%2FAM9Twam8sUoI26jXm6Mp%2F1DDrXosSEIbEc98J5rMjCgag9ddt6wZJKbXedhHB2zy5ek2S0ijHpxt5IehhygYYOT8v7v90wSKi1%2FAujcDmfy8vy2irN7yqk9f1QEdGBAn16Lt6sPjm2koD9QelG6HQFI2xtZMIGTyc4GOqUBiV5DVCzeMqoXM1Khwg01tl%2BlfTape%2BsKq0MHAYOs2pcqUwrYc1lAWfDp41jsqjPT0m41IeYITMLffC4yJRlwivcGZ2Up7G42EaZmO38%2BW7GlQ3vBK6meN5%2FznH7bmN3zSxoePkYbVDM7LngTqnQ7SN2rEswGoTwu8bru00vVekrr79Dl%2F4CSl%2Be3l24mSppJdOXkiDIJLyNK9XKWBw2xRR1hIIIO&X-Amz-Signature=47b0233448fd46ed7951d6df0bbaa83ab8856728bfd267f61922fc8d82fa42aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46672624RZK%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T122633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBAjN8Kb%2FT7wV4oxsow6rKU6mLiK3RdyweJLba45KXGEAiEA7eEXsUECG8ainL3NzkefqEPbsObUEfOYYRP5nYE0u9IqiAQIsf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCilxVGjNJ0%2BOQllXyrcA3KyvQDdzsf6xeFoQHQJvdPJKZnTKAHjYlfE3cl9ioqRL41BHl%2FBVpy3F%2BPhbajyFQKbxOOqQiYWjmL9UBdwKd0RS4K8n85dUb%2FBB%2Bje%2FLxu7TKtsct0PMuXUASXkasP9nhf%2Bp6Ei9PmNjfNEvYw5CWiFWJO6QKxuqHGMWHZlxXAaGaRH7v9HPHruI8X0mdzC1dvQECNgHmo1lo8YjaUGGul%2FrKvwHh5eizzB5o0%2B7iKCaCFbY6vv0qZAEBZ0RvBaptXdWBMUeG8q4LBEM7upk9t5csI5ChLYl4yMv2hVPupvsw5ToQl%2BqckzsgHItHqfyX9g1lOwr8ZqY8VVHFV5h7KsM1suB6w7qj7Lop514fKoao4aSX5xAVD%2BmMScX%2Fzf96mK4k0YbTVOcis38kxEWpIFEznwj3Q3pLZJbo0QNLg180TS%2BUGB8wsU7IVpUdND1FfBN6LfD9mTvrtf5QMb60R%2BsKO%2FzizT81vybTrySOonqimbdq4nBw8%2BoYVHatKBCGdK4ZUehroGyxj0IwkANoTslV%2BfvD2ldyKn%2FciRjU%2BYRMUU%2BN0xQLZWJQblZYvCeJ5Eojk%2BRbFCfvDg%2FfjBRwtnS4FEju%2BFcu7HkGYfSoLIaKAGq%2FJmtNgF54hMOqsyM4GOqUBjs%2F3w61mfMDYWVszpJuxgkd4U2Lu2IYkAQaKpNsT35oDNwIVBeJ7APhwf0hRuNhbEZrt4NoMh%2FwRbQ1gBJrRXwtQOLwPK3JKdfoQH%2Bk52idayxQEKyxVn06K5h2bqlmdAZ0IVDQB24gVv9RdbteRQuTyNT5oTSObp5PRKW1djoOjoWEcuKUtysJbyeFhJL54AqGTzxJY5WqEfEqa6eRntERwG%2B8Q&X-Amz-Signature=f387b0d7b96a2c67349a7785d283cfe1ee6d86b2a6058798e290c01b91858733&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46672624RZK%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T122633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBAjN8Kb%2FT7wV4oxsow6rKU6mLiK3RdyweJLba45KXGEAiEA7eEXsUECG8ainL3NzkefqEPbsObUEfOYYRP5nYE0u9IqiAQIsf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCilxVGjNJ0%2BOQllXyrcA3KyvQDdzsf6xeFoQHQJvdPJKZnTKAHjYlfE3cl9ioqRL41BHl%2FBVpy3F%2BPhbajyFQKbxOOqQiYWjmL9UBdwKd0RS4K8n85dUb%2FBB%2Bje%2FLxu7TKtsct0PMuXUASXkasP9nhf%2Bp6Ei9PmNjfNEvYw5CWiFWJO6QKxuqHGMWHZlxXAaGaRH7v9HPHruI8X0mdzC1dvQECNgHmo1lo8YjaUGGul%2FrKvwHh5eizzB5o0%2B7iKCaCFbY6vv0qZAEBZ0RvBaptXdWBMUeG8q4LBEM7upk9t5csI5ChLYl4yMv2hVPupvsw5ToQl%2BqckzsgHItHqfyX9g1lOwr8ZqY8VVHFV5h7KsM1suB6w7qj7Lop514fKoao4aSX5xAVD%2BmMScX%2Fzf96mK4k0YbTVOcis38kxEWpIFEznwj3Q3pLZJbo0QNLg180TS%2BUGB8wsU7IVpUdND1FfBN6LfD9mTvrtf5QMb60R%2BsKO%2FzizT81vybTrySOonqimbdq4nBw8%2BoYVHatKBCGdK4ZUehroGyxj0IwkANoTslV%2BfvD2ldyKn%2FciRjU%2BYRMUU%2BN0xQLZWJQblZYvCeJ5Eojk%2BRbFCfvDg%2FfjBRwtnS4FEju%2BFcu7HkGYfSoLIaKAGq%2FJmtNgF54hMOqsyM4GOqUBjs%2F3w61mfMDYWVszpJuxgkd4U2Lu2IYkAQaKpNsT35oDNwIVBeJ7APhwf0hRuNhbEZrt4NoMh%2FwRbQ1gBJrRXwtQOLwPK3JKdfoQH%2Bk52idayxQEKyxVn06K5h2bqlmdAZ0IVDQB24gVv9RdbteRQuTyNT5oTSObp5PRKW1djoOjoWEcuKUtysJbyeFhJL54AqGTzxJY5WqEfEqa6eRntERwG%2B8Q&X-Amz-Signature=1404edd1fa0547800c48f4ba571c808c17c05162bf49290cb1ef2cdf5bcdc990&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYJ6MNSD%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T122625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCGKALcW%2Fro2UZ%2FKLwZPs%2BHZuTegLwsUZnou01zimlhfgIhAJ16IN4rHR6cDizPjNyc8lKYN64KpDFQev%2BAYiw2DUayKogECLH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyNcL9WGue1oEDawPkq3ANaPKldKa6iJ2nAfG7qmFRa5DmkIb5We5HyvdVqwxfCxZf9ozBY5PnCX5MjOFgM%2FuXLeyvxDWHleBMRH8ItutpusC%2B8cZMVpCxk%2FwfiBg3CIQMsg5tncbzT8zmUWdQD1kL%2F5Wkt60KdOtDzYB%2FpHv0iAr75ZdMYJMNVWU9C3doeTSAEk8VJClk3FhYLtZ0NZosoZwcMfFNiP0UIciV7hmK6Q2l%2FiCL24tSjIq29YytannvqLAWf6Zk0Br15Yp0IYYNui8hssT3q2VF%2B9jn9gxDlRoGhb5IpZdwwdPfZv10BWZAxl4EWJUpt%2BJNMWjBkwo96FGXr2RMhVzLLcGVC6RjUtWVaQpRJxW6v%2BHep2ZqO3z6ebEAGhsW4xxsWmYnPszSvDTSUWHflLD%2Fnjd9TLpakSQ0nydmCCM8fXgTCCZITEPL2TcgNbt7zj6pZ8uKTLhSsKNjvwLrZDY2LU17GIBk%2FQ3s5N0XYkhHKbG9Y2c2UxxxJs%2FijIxR8Yp3uDQEVfZmiGF0AqXwRNHFpH76jezjkgl6j%2FhK0UkL2sLPGnVQtXtdqJALffh2BWJf36jmhxXije13pBso9E1m3cIX0B5FLd%2F1amBN9hGE73QPIJniwf8smOYRXv3fX1INbljCnrMjOBjqkAfuDEg90fiLqNitgM6NpSoUwOQNWZurHPuBv7zsyBqWJHoz%2BjsQCgLCeIYDfffIcyno3GEoFagV3P2nyFS4pA0oKSnsthhD7sS2QByZwjAy9siTiW%2Fn832vhubL4RSDH9SmXMTEj7zkENwKEcCaYEpelvMUCF4s5rkYhS4kK7Hg02jjWTseK8kClVmPDo77J%2BatKBjhK%2FLJFj8UXX9tN27qw6vp4&X-Amz-Signature=899898dae37b87e9c5f90e60cf7ea83bf27e3d40bcf5ea9dce7805e29a23ef59&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663KKRFV3X%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T122636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCg%2BIzTSf8nozQ%2FadWmknY1hiHrGPXNX%2FITrXSlA2gluAIhALRGQtdT7KFJ4pnD8sfWJKMWFB4xk0YeIJrz0hlTJCh%2BKogECLH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyUapod9WqkD1BE8yUq3APuNW4dylfh1WFK%2F8FgBDw6US%2FDaRgV4uxTWaIPDFqN80%2FGFEQoinVUvF%2BUKes0lgnNyoZhsgkB6lEuSVgm7nY7vQiJFWKW1nrr6bV7pKEyRWbGYTo%2FNaRd9aRKPw7PnDka1aCHtKNTptWIdf4F35eGpEQ2dAwRpx61WdHYI3jYHrcz0FOoXYRXZl%2Bd3uWY8W1gwrke3sRrv36ESRIgNPe0aMiJ6VNVoRrqOKx57QkpSc69hcWJJaLZDmpt%2FMYCNbh13vY0O%2BnzaySMoBBb50GLaY2%2F43doeSKrQyOxSvH2%2F18kusNWl6f06aevfBGTunXZxmfdxqR5rFn6ZU0OBl%2Fgps5hD9ksu0LafOADakI9Zxyb%2BFOWantg%2Fbo1eZfdMthJ7IeFemHuz2BcTgEwAyjA2JUSKm9VEmjkc3LpkUNng1IQ9G3riuE81eruAgjstplTRM%2FJjLKCxxAzDpOt%2BLeOIPlK3tvziY6FFa3nRn%2FZpbc7vG9Hil81zeP998kMZujzFcmMylkK0%2FBD%2Bfta%2BC8MwkQL1NLymbM4PW%2BcXMXR6lDvD8rYAR9tIMZxcP2XFZ7DmmtOZAjMxREqg%2Fm4B3ybF5wDU82cH5mkPLcFA5VaTot%2FJZVZ1V2CTVqYxzCUr8jOBjqkAXAOT2jzqUbZ6JlPIKkWxpNXF2raxpRxj9JhY%2BviP5ivJeBYs%2FjfDcJxWc4p0v%2FetnlfxuNRymlMwn0eZ4p4dMXLGgMLTJklOYb%2F2IB7a%2BSYtk%2BTowbY%2BPOgkma6VxQRZD4%2BkaBGgtv05Ad9BDG6xfR%2Fg7U5X0lc9jLKRr9swrXiAxRMDJwA%2FI%2FnSgaVzt1NGtf6VVzS93%2FTC3qZ0z8tq4%2BA%2F1ky&X-Amz-Signature=4812ad61bbb8ec39add3cd9330ea0047e0f5047a9774699b42e92a60a9a5c333&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663KKRFV3X%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T122636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCg%2BIzTSf8nozQ%2FadWmknY1hiHrGPXNX%2FITrXSlA2gluAIhALRGQtdT7KFJ4pnD8sfWJKMWFB4xk0YeIJrz0hlTJCh%2BKogECLH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyUapod9WqkD1BE8yUq3APuNW4dylfh1WFK%2F8FgBDw6US%2FDaRgV4uxTWaIPDFqN80%2FGFEQoinVUvF%2BUKes0lgnNyoZhsgkB6lEuSVgm7nY7vQiJFWKW1nrr6bV7pKEyRWbGYTo%2FNaRd9aRKPw7PnDka1aCHtKNTptWIdf4F35eGpEQ2dAwRpx61WdHYI3jYHrcz0FOoXYRXZl%2Bd3uWY8W1gwrke3sRrv36ESRIgNPe0aMiJ6VNVoRrqOKx57QkpSc69hcWJJaLZDmpt%2FMYCNbh13vY0O%2BnzaySMoBBb50GLaY2%2F43doeSKrQyOxSvH2%2F18kusNWl6f06aevfBGTunXZxmfdxqR5rFn6ZU0OBl%2Fgps5hD9ksu0LafOADakI9Zxyb%2BFOWantg%2Fbo1eZfdMthJ7IeFemHuz2BcTgEwAyjA2JUSKm9VEmjkc3LpkUNng1IQ9G3riuE81eruAgjstplTRM%2FJjLKCxxAzDpOt%2BLeOIPlK3tvziY6FFa3nRn%2FZpbc7vG9Hil81zeP998kMZujzFcmMylkK0%2FBD%2Bfta%2BC8MwkQL1NLymbM4PW%2BcXMXR6lDvD8rYAR9tIMZxcP2XFZ7DmmtOZAjMxREqg%2Fm4B3ybF5wDU82cH5mkPLcFA5VaTot%2FJZVZ1V2CTVqYxzCUr8jOBjqkAXAOT2jzqUbZ6JlPIKkWxpNXF2raxpRxj9JhY%2BviP5ivJeBYs%2FjfDcJxWc4p0v%2FetnlfxuNRymlMwn0eZ4p4dMXLGgMLTJklOYb%2F2IB7a%2BSYtk%2BTowbY%2BPOgkma6VxQRZD4%2BkaBGgtv05Ad9BDG6xfR%2Fg7U5X0lc9jLKRr9swrXiAxRMDJwA%2FI%2FnSgaVzt1NGtf6VVzS93%2FTC3qZ0z8tq4%2BA%2F1ky&X-Amz-Signature=4812ad61bbb8ec39add3cd9330ea0047e0f5047a9774699b42e92a60a9a5c333&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXA3RDJX%2F20260405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260405T122636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIB1w%2Fqfd63SFwCeFcsUUP6pghu9hs8sDGzOvOPHKOLcXAiEAoSm9BC51CmZ7yJ1I18FWYyuej%2BfR5XvtWfHvOMe8l0YqiAQIsf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMhfC8EOxtmUDM9YSyrcA45EUKuqcuVT6a%2FzFOSNrGgndKLhJEev6FQQxAlvF%2FS6xFMtWTjQO2y1tjWa2bUeJGPtvqqlh9oVK%2FIcM1MLyHlU%2FZnkHpg907GXnnE9A6H7IiZkpMiWbj3lJ8vNfYiwkPRTOX6V5c3JvFmdtEodg8hPZzDqlLeVtrarJnPRhUCX8oOUYaXfp9nQ839MumoRB5eV0mXzpV10ay6yzaKqxTti6QXOEUILWzTAeTkri6docdwJ2onaHe%2F7m48QzVGyJy6jz6kTJqQG9n0PLMmJggjOSLs4xGanZ1Z9v0OM26YcOdcppl%2FSAv9zfIPLT7pXcDAqEq%2F29X8fmmJSnK4jRLh5WzpnnE4zcfm5EiKcDTwoiYe3BwBDScmLFmttEYmNJ7o2i%2FOV7wAr2eT2b8oricfd3j5TSsFs5XOg80hoIGp6BYYonvny3LvVcPaSWNPbn1UmBEP%2Bl7kBtr%2BHuWW%2Fi2DXNLAmOdwT96UDoFCW5dvaGcIVLV9Yt9S5aCI%2F2CMwJmHzC4a0fx31PSwX3VBQIR%2FGIgmrzsCeRPNnXgVgKFf2qgfrulSQw%2FYp%2FKHRoYnX7zF06SAFdTxHJjO%2FattQQgZ%2F4qR23SEnYHPbmHiSVIIqCyRw03M%2FcH5vFP63MPOtyM4GOqUBu4siVbFq5QvS2wmaKn2qMAqAkYcyqB9lCPvtnUQPAqV%2BFJQOABmUNoH5gHXq9dGKHwMvNqTWENub3sVkMNvTnXh2xFuTLQBybXX4CrEzu1%2FmaY%2BE36h3GjCW51%2BdpZdEZz2mFMT0o%2BKHNeuZl6HZwFF3UqgpUiIftsnxJmCj%2BZXvOIX4FPZkxoV0QvY6ImbSshJfz8qFZU5pjq%2Bd9fkUSQ3H%2FFNY&X-Amz-Signature=e9d8857704d09232ccd6f2a03a14f1c95e145ee1520510679da361c887179117&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

