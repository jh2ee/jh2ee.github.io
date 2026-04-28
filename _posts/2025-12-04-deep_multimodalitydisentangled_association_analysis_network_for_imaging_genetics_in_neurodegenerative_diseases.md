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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YDMAJZ5D%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T205441Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJIMEYCIQCYmf4icazTKosnw436CDBhIAc1MN0O905uz7q8s0H22gIhAKg49QW6ow4QXJZ1TXK9k%2B27zYWjnERh%2FAdjoRb40khDKogECOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz%2FioiWNzixOSIo6Ecq3APYwGw2hOC4PYiECBxqQHk2uiIgEKOkb71gUqP2mdm6K3B7AT2ev23ExhF61ZTifHdBr9vC2SQEt52%2F%2B%2Bf3x3MKSurGy%2BlRHyt0FIuXyyQZiTJ9%2Fsums3NNRfBviW%2BZbGzgRoLKIVPBgrY7jH5Ed4jCy7XwXBbRREQqY24%2FibJL0AT%2B16HhX0F18FB1nh3XRS65SFjlVEgrcZf3CxVL82eq8QFRE%2B1cVEPsjQQikcrCPiX5GPpw%2B00HFYuVDMUBd5wwnSIxoP8%2BZqk%2FnprPDES8qL2XbRNIghUdKI2Qlnr68qynlniLOjMw43SmEXA8kPEAhTkVrSU4ODcI9ANK0nuFukT4bO%2FJQTsH714gGjRYrTROZccO7ofEA%2FkNu6axWX2okLA%2F3ylQ5XDlkDHwy5FPPfL%2F83NlA7Ijd%2B3CH%2F8IJPrk9Yv3c0uSMw3a3AGVwJLzpyXvn81LZo0sCPu9QRv4lcFb0m7k0GjTWbjjeXZqdeH2j%2B3w9RyFRyKfPR0bwZhTquNSDADYea8Gogc05Fgaael1cWnn%2FiEshIu3bBeMYNUezjv91%2BhKmEOZzFZP%2B8tsJZiJb8G%2FS%2FOvacphY0uIUBzetqfTZl%2FoUN05rndqp3iB2FL%2FC6SpUw4nTTDkssTPBjqkASelLNDxWmcRzAeb8OGYX2WnEHvqZtaPUNNJfFptqEO0kPSAMGW8Eu2BBirwnWCEvr4NJun5AnurNnBayhq6LIJIk9xhfD1KXvt89K5vd8%2FWKO%2BMpNsiBRp6pH5NAjgkfv2Y6l8QM27B2iJYM2AAJ0KyJ3eiwghH8LWqEQm1urL95MAXtEz7lapoBPuEuQUBd9YsBFuqVSVNrbJzIZbo0NAt27wB&X-Amz-Signature=296672fde790e09ed0c817fca34365dce7c7f336ce2eb730b7b6953c44ca0759&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YDMAJZ5D%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T205441Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJIMEYCIQCYmf4icazTKosnw436CDBhIAc1MN0O905uz7q8s0H22gIhAKg49QW6ow4QXJZ1TXK9k%2B27zYWjnERh%2FAdjoRb40khDKogECOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz%2FioiWNzixOSIo6Ecq3APYwGw2hOC4PYiECBxqQHk2uiIgEKOkb71gUqP2mdm6K3B7AT2ev23ExhF61ZTifHdBr9vC2SQEt52%2F%2B%2Bf3x3MKSurGy%2BlRHyt0FIuXyyQZiTJ9%2Fsums3NNRfBviW%2BZbGzgRoLKIVPBgrY7jH5Ed4jCy7XwXBbRREQqY24%2FibJL0AT%2B16HhX0F18FB1nh3XRS65SFjlVEgrcZf3CxVL82eq8QFRE%2B1cVEPsjQQikcrCPiX5GPpw%2B00HFYuVDMUBd5wwnSIxoP8%2BZqk%2FnprPDES8qL2XbRNIghUdKI2Qlnr68qynlniLOjMw43SmEXA8kPEAhTkVrSU4ODcI9ANK0nuFukT4bO%2FJQTsH714gGjRYrTROZccO7ofEA%2FkNu6axWX2okLA%2F3ylQ5XDlkDHwy5FPPfL%2F83NlA7Ijd%2B3CH%2F8IJPrk9Yv3c0uSMw3a3AGVwJLzpyXvn81LZo0sCPu9QRv4lcFb0m7k0GjTWbjjeXZqdeH2j%2B3w9RyFRyKfPR0bwZhTquNSDADYea8Gogc05Fgaael1cWnn%2FiEshIu3bBeMYNUezjv91%2BhKmEOZzFZP%2B8tsJZiJb8G%2FS%2FOvacphY0uIUBzetqfTZl%2FoUN05rndqp3iB2FL%2FC6SpUw4nTTDkssTPBjqkASelLNDxWmcRzAeb8OGYX2WnEHvqZtaPUNNJfFptqEO0kPSAMGW8Eu2BBirwnWCEvr4NJun5AnurNnBayhq6LIJIk9xhfD1KXvt89K5vd8%2FWKO%2BMpNsiBRp6pH5NAjgkfv2Y6l8QM27B2iJYM2AAJ0KyJ3eiwghH8LWqEQm1urL95MAXtEz7lapoBPuEuQUBd9YsBFuqVSVNrbJzIZbo0NAt27wB&X-Amz-Signature=296672fde790e09ed0c817fca34365dce7c7f336ce2eb730b7b6953c44ca0759&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UPXVJY6Y%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T205442Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJIMEYCIQDjjMmY4e9pcyZlPxnkqd%2FbFjMkiIzThqDAo5YSDxbrkgIhAPU3KShcyriB63q8l%2BgA19rlWtOqxhkuK0nksQjhB5kDKogECOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwfGktCkx%2Fkao8jSYAq3APvqjhVS7HAp2Fofp9lNqKUFW2SQC1WZx0TdNpa%2FGROFrGJfxlq5CdTvw0%2BZOvqRfU9yfkyRnbcXoUHimfhQTCcBKIV4fUklrzqxV4bSS2TbhVRaYLR8BfKQdvAlCObWYYw3YDWFP6LwFarc1PDy%2F%2B3AmrWeBr%2F5TRdCXO%2FlQY8L3BwBUG3al6S3aj0hKsBP%2BVfoExtwjSpXAN%2Bm6JWHTvJsRv5foZXFud3YML7qxf%2BaX2ZDqavCveE1IS0ZgKTOWPdrtrDJr0tgF04gDEvEsK%2BIdhQreSY74kCaiCepTeCsOmWR6fInqgeRwu%2FiHNF%2F4gk8ykrioEcG9LWMP0Zuwge8uill7hksXRfWe7oIa0Mw44f1UnFYrg6g5nvfUxgWD2KpB9YAaSZ3gIpX7MuLDNJBhVEbhud%2BKpvHawAstdWwUh77iTf69JfoJkKSW5oqYBbKRxjaWIPdVVP95umc%2FNpA%2BW3abGNY%2Fv70tY%2F5THz1WiJ4Pb3PHNed59j55YqDKfUIrLpy9dvP5CY4FCkl6f99nO6SOO2%2FxE5XxptbUot2knjJAD80I%2F8Tiiah4WrFZzHvgdZ2FIt8UiL6FAvKXJC43hssncih0GFRB0CPD%2BQjvZmEsuwC7CEfsvx0zCOscTPBjqkAdsDdZFUQ6um1cqbDLqNe9WkWgXpoGwJD47SGQ3khGq8KyaLwBm66eTuRpGyMSTUOxB0f%2F2thhT5JmcSyF5m5j3jg1RZ6HAAe%2B%2FzPXwnl5VOOrnwK5gPmtJ%2BMpS5eVIvX7zaVlGcIKOt7Eq3JSYtr%2F97bpcd3lTp3%2F3sh5%2FtxML7f%2FKAYDrx1T6EcyvONrvZ7ppG88GpB1%2B8WWbP6auP%2B0Eq7Y3Q&X-Amz-Signature=a71c42b428d802b4516f4a7bd3417edabb53c4353252afe5daaa1f9e50371796&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665VR466HY%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T205443Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJHMEUCIQCHHpODH%2FARZ5zqN7UHxgnJ0vyDhaLd8djJG7PEdoSkoAIgaeCwiINzgvO%2F6RyCQpbQtfHEpMMtZzq3LjKpgL%2BAeVQqiAQI5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB%2F6dN0xTJpiIv50XCrcA4LODStjT%2FO7h2PTXnSPBYDzuUJfQq7%2F6AI8zGz9dQcncFM0lGJqs%2FNpKxEGsjrLAWX2P%2BMbsRaBf53ngnAY37VDtGmmmhr1k8yW1axvqfTfivBRk0MhqnYz8lDyLe7kd%2B2uBOjemf4uGgyd3xvBB1UJ4tLEmG8tRl%2BbKh9ZUfWlVyg%2BsdNpLUvN1j3Abm6b0BawYXc1lLb1s6JJ335jZPq758kMjRg8lxtnilOZ%2FLR%2Fd0YPHGPPGQcy4Jn5pQO0PULuaSJGIGh4aZB9MmVdXtRCSUBlSLwzinkfZnYgRxgGJCWQg3mRE5EJARga79sCAk2wsZgEoWhK4iZVowYCAR%2FEYK8R0ei1w8XmktcAOqvVZL9GNUitFCozxb1mpOOVAAkVQxEME2S0QqAK%2BztaiKmJD36VZAsr048iwvhdoUCMkRTAoe3Yox4Smj61B1QsC72rkJM6JlvNvyJEfnDnbXyjlFbzoDUKjuXZJuWLFtdo3xrNi3WwJwopjUpbDEk%2FWZpMUpAHrbiWZYLfsnxObbJ9vz1t8YvKWOLYAi2TBVGo19P1UYM1SQxN3htPwbIIdTE%2FfBPmtChV2at9X0j6mJfGmqp5qOdqsRt%2BIM%2BnY74a2oDVWdAW%2BcCqGtR%2BMN2wxM8GOqUBuu34UO8I6JNCJZaR9Z9XCfSR2LYT%2F4xEPZvafRonUYPqVhfdUOriMCL2EliIaTLjNF7LWhzTKN9oy58%2FGLSadxQ%2BFzRyQeH9B9BI%2BpQQabOKtioxLBdoslum8uAVmgcU8O79Wi576MpZriDTUBRRsDqXvstVoxqCgS8TAt48rlF7N6qNGvWjh1s5wJXHm%2F7md2XCTEsfMWqcMhLR%2Bd7vZAxYpaAQ&X-Amz-Signature=a42798a1cc9b38dddcb94e618d24e01d4a83313fe63bb29d39fcff7eea059f33&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665VR466HY%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T205443Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJHMEUCIQCHHpODH%2FARZ5zqN7UHxgnJ0vyDhaLd8djJG7PEdoSkoAIgaeCwiINzgvO%2F6RyCQpbQtfHEpMMtZzq3LjKpgL%2BAeVQqiAQI5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB%2F6dN0xTJpiIv50XCrcA4LODStjT%2FO7h2PTXnSPBYDzuUJfQq7%2F6AI8zGz9dQcncFM0lGJqs%2FNpKxEGsjrLAWX2P%2BMbsRaBf53ngnAY37VDtGmmmhr1k8yW1axvqfTfivBRk0MhqnYz8lDyLe7kd%2B2uBOjemf4uGgyd3xvBB1UJ4tLEmG8tRl%2BbKh9ZUfWlVyg%2BsdNpLUvN1j3Abm6b0BawYXc1lLb1s6JJ335jZPq758kMjRg8lxtnilOZ%2FLR%2Fd0YPHGPPGQcy4Jn5pQO0PULuaSJGIGh4aZB9MmVdXtRCSUBlSLwzinkfZnYgRxgGJCWQg3mRE5EJARga79sCAk2wsZgEoWhK4iZVowYCAR%2FEYK8R0ei1w8XmktcAOqvVZL9GNUitFCozxb1mpOOVAAkVQxEME2S0QqAK%2BztaiKmJD36VZAsr048iwvhdoUCMkRTAoe3Yox4Smj61B1QsC72rkJM6JlvNvyJEfnDnbXyjlFbzoDUKjuXZJuWLFtdo3xrNi3WwJwopjUpbDEk%2FWZpMUpAHrbiWZYLfsnxObbJ9vz1t8YvKWOLYAi2TBVGo19P1UYM1SQxN3htPwbIIdTE%2FfBPmtChV2at9X0j6mJfGmqp5qOdqsRt%2BIM%2BnY74a2oDVWdAW%2BcCqGtR%2BMN2wxM8GOqUBuu34UO8I6JNCJZaR9Z9XCfSR2LYT%2F4xEPZvafRonUYPqVhfdUOriMCL2EliIaTLjNF7LWhzTKN9oy58%2FGLSadxQ%2BFzRyQeH9B9BI%2BpQQabOKtioxLBdoslum8uAVmgcU8O79Wi576MpZriDTUBRRsDqXvstVoxqCgS8TAt48rlF7N6qNGvWjh1s5wJXHm%2F7md2XCTEsfMWqcMhLR%2Bd7vZAxYpaAQ&X-Amz-Signature=22379d804be38d588c5a3e5d7b60374af6470e862028de27336df04e438e4e03&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667VFHHIDD%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T205443Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJHMEUCIQDYFzyQYVAvXbaKeNojVQbWQDGJ5E6hQaqFG7UR8WP5gwIgdKb85IKzs48WXC0TGdTJpdtH%2FRydpcYQrPgENjiTKjYqiAQI5f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHonBsBh1EdqAi9mOCrcA0Gf6I%2FLob1UpqUc76a2Be9e7kuBncUGuVfHuGmdlAKhOzsx30ELIhp%2F2P39MqIhNhrnpULpEhNHXmXv1uiF48IZSf6DXd5lDmoqJR7r0yXyfxf4dGZTHqm%2BqiE7kya39CYMMkRrCjQGOmBC7sVYdTvtVgLPzrKZaV10bnCx56JY16DcCCcjwqySkct7rmFVaCVkW6dbp%2FiLoEkYJU9Ep502OKDarccuexPupLNzcWNj7LDVpyvEb1VzeF8R0%2FtaOuAhp1RayEXhVMtOSDzwjs%2BpfalHn6Ck6XnWFm1ml9%2B4FbuIMsXbp2qKfFRvUiVCMnJ4m81Bczitm3AYhVSmHpmCx2%2Fj%2FuSQqHk03fSuBJMNAe7aNhCsQq4UAQz0ik4VSNo3PhcGHmbUb27eT%2FB0LTr3kfbX4568kKsAh73hi1ghJmP3TXf5YBy2RK6pso86yOWjs0yvh9WD19CaBSufaYzEDSEUcMgcKQaPayAscy1YQVSryQBMZxkU3pVVG3lqERX9dSztcixbu3RH1R1i8mYixdAkje2Jr19Yynm3vpBXjTAlVOJ3RWW4a9z8I5AoZ%2Bdsa9%2F2pBdsmteIREojHJenqebUbDzBBSWbkNB2FQ0VOocu4rEg8UhCrGdHMLCxxM8GOqUBKvA0vwtNpVgK6TbZMmOPq55ct%2FVpMU6pvJW040emktJSG5CgoK5sPIuSs3THYgn7OcAziUlP7b1D14mw5kDjxoZ7szgV9%2Fi0AtsXPm7UWQHRs%2FUBWnxuW8Yfkuz4%2Fvy7MuyeYIIZrTQdWT57pQVzb9iE%2B6BdInDIhVRHfm1l4Wc0hOmpmn8jDIaF6hOOF%2FHKcVhEJf4TA5w8MmzfrtKxAzzDP4y3&X-Amz-Signature=a0e6693b2323ac926fc95f5b48aed36e3644c8d76704cd3a12d0bf55a20dc1ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46627X3LWGF%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T205443Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJGMEQCIGRUqLqvcjYzlV%2FjjMicM3hVy6uOcHU5kH9P5864L8BtAiA3lZIwsOFwGY1%2BiS%2FTqNHeqfdgCLNi1cMNeHkXbjIWYiqIBAjl%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM3NpW5n2f%2Flf81kKJKtwDlc%2B%2F3RM5beexYTi7Ye3ZLBA3cJ1887SCf3ReBZoDM3ayEPVijJu9xSdG7p98uBfBjbsjnNiNCm5yCre5D%2FeVTiYEu9TSG5wrzs7nMZ3795ZE96I0HDBr9ztBzAN9bTWuZM4WbL%2Bb6VXy51fJDcu%2BZlrs%2BnwBc21ZoN%2BFuW1MHD%2BYXohtdaWGezS6braAFe64snLeW%2Bumm%2BcdkIx%2BVmJE8WEnMD8ZXAEZYa595r3fF12MDyug224IZTVOG9VQJoEF3mn1umds%2BgykLsvj1dFoW%2BCm24wpyhCCes3Pw28fFl14Wy3Qzq7G6z6CcKIPZQZ1r3ikNLmyaGBHTdHMZIAJanfMUTMFrWS%2FZhOtTrPNnn2fUQ%2BLJpPbyvL72em%2FbAB4vAzMBCILBhvwLW2IKriLNAf3BeRktIpgzRFfbJ%2Bu0NQNqC3eBbBylasPN2DsGN5Mp1HXQYa1iDYc07hYBBJtihPPvW6By%2FrtUTJvvL7Id%2Fs09FElMmoibXtjMjsGS6v1PzfMHv3wl%2BppWiVSeNCsG2WDkHxYyl90IOH5%2BwQNAeMjHCtgpH%2BcMp7OoeHrD93FvEc6NDuw8ZwjzTR0m8Fb7EF2eGLXXZX5gbShbmELhdK0kptHQG1S2ignDMIwy7LEzwY6pgE%2BUuDrV5lnGzWB5PIyhauESZ%2FEeGhUswfaI7uvkwUfzS4uZaVRToDKkyQoqJiPE6hVfWY6xQT9PGRxAQhmTp4NcTU1M5BP0XlDIqFaHMIV8HSsaQsY%2FUWkChzoZD9OilGkY3MmjVPainRvtVlCDyMNRSArrl%2FbyhzP2ejV8mZ5x1xl4wwYWuZMwlyrv5tqUmd9qNB87JQhlj3cI2xp6%2Fd%2BtIwiXYBs&X-Amz-Signature=4b6d012f4dd046fd0b544156b76c57585803139c8cbb3a24ee68fa44e76a0962&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJOKU4XK%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T205444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJHMEUCIEHEOqMJ25VmQTuVh8t59qOah5f4MhVuWxDycvciSd8PAiEA2RTXI7zW3moE1eSK4nZ39%2F366EduIk6WfpT%2F%2FqyvMWUqiAQI5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIMUOLOEV1DZsXEnKSrcA69UCGV41X6oXR8fAKPszgRHkeyS6DDYiBDwuRsadKa%2BihPw1Xx9AE0LGwEwb6WyZDadktbOPXCsg01%2FRO%2B1DKLTKO2uUfiTPD2lRIum%2BTvxYT1Adu8Rq8uk0rirDO%2BK5NADwe0xQ9iFulmur5xlQFtKaeeRLRaPj8sAeyrZbxAZ%2FT%2F3nCTRLqGCRYGpxfI%2BsTj1tNkYOvzurgZR1EFKcDk1xshZUubtBZdzsNkinZYxjjgYrEWsry7DYhyuZW%2Buj2MhLxi%2BPVFTr%2F%2Fr%2FovFKh8JDtoqJJRWKwPIxBMDrJ8EONA3olMnDCh4I3j0RPCUXUvJ2gS71E0Es%2B%2FXrSveF5qnN5ZwBsHXw6VvAV%2BPMmVoB7JgRoFdHb9Pf1fvCplRuwdtMq6onXsMnTDmPWx5gHiG8HEno5oOJV5Q5%2F%2BZ4Y1j3i54jWVlVLsxB2mT0nGoo6jZ42LBSnBVkFsYyz8IkkoWb0%2F7pNPMWaW5zBiQeXI%2Fcu4qu6Fl%2FYfnTGfnINVgyO%2BVnLv8l1nrzIB%2BbaSGwkl0opy9fcGuK5Nf3LSNAb6JnyA%2BNRZCz8BDBd1VLXVATqtVEBL9eSOqGulCc3Uup3ZPZjt9yg%2FYK37vBJzbyaXSaL%2FuIcxFO1GG60chMNqxxM8GOqUBZBzloZ8F7IpbJgY71f1NAepZHHmxZGddkLjd%2BHlPuTqRZI8e%2Fd2U4VIet9TqXockGPUqFonC40J8iFQVNQSoFm%2FwgjBZzOKIqoVlhWQZGphZij0wXffPQxgzaNpBe%2BBR5piObh%2BsLnfCLiwJXVt%2FdF0AEbhDGQ4aHFeGXZy17yyCBX4Tgckr%2FgLsjxFBslD8apmBHqxG14fUw4%2F7EEexKWBF0fx%2B&X-Amz-Signature=1a3a26795144cfa088256ce2eb02e6d100cd627e7733f3205fdede437a4c81c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665F47MXNO%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T205444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJGMEQCIHDiq2xHccoExVaKFauxx%2BkWt4lg%2FPquLJ2zZ7364x6EAiBjN80aDzqPhJvqjyas%2F0Loze3eMX%2Bpu%2Fj0ppuaEw4eRiqIBAjm%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMXSeEdZmf%2BZn2RdjVKtwDBJABWNoeQq0LhiBB8eVd5%2BQ%2BS9iyHaNg4pkWc%2BBFnaRIn9Q5RRsJHec7rLhKzLkjamoLaejtXOBeYVmG4utRdEKvhCieGx0lvwvHJlbvhOrv9IsM%2BOIGoqsJX3sOy61ieRjIcD5od7TXcDxTpduA1R%2Fgq0W%2F8SrcgmRbwJGoO3KXIb300qQitUDRAmZitl6Qs7u%2B2aEteaaYNUDtNUqKwBDvU3utktskiAdTBidJ%2Fubbh7hAIGJsVMRJoH3SrlP%2BSaKGmW2bNdr3ysEfNwo2vrDWrNXgm5Lwq1Y08OFZPwxEQ%2BLGzqsnmPhLWQvOPPiW5UGtIZ%2F3N2Qm4tw7p6ZkrIvSWNam8RRVvVKk5d4v7ydSymRj1wiD13Bo%2F79pl9k8u7fNPhP%2BiawpeqlkA3DT4cD6z9l0ZWInz11c7swn3Y%2Bhm2cgaXs9SEA4tLyzDLgBzflT4fvMKML3OCphjHiZHJHA2jSq%2B%2B9Mg%2BTl%2BlcjEqZbU3tU%2BXgRHt8RM2vPXxGbRSMDgRsmsbvlKPp0pawVfF1Rrh3BmhvOoEAzHv8RHx%2FN3L7wyUZx8Ci4tQwlbaG89OiufSSzS%2BuozEB7OwyivuW7qQAn89ZNQFJ%2Feh%2F9mziCxR%2FuzRf5RqJRhS0wsrHEzwY6pgHnqZqnFnLeLMAQfj%2B%2FtAHOUYv8kNKnV6ORN6AADNHHX%2FnEOB218y0CUBD7e2QRppIsXbC8kyl8NShB1RFOWw62uNpeGJhAECmfe1P8HRT30gYFUQ4byzt7Imc05eROGsI2EXnwa%2FTL8R52pHq70WWIQzmcZSdzJEROQgqEpv0J5w7Uj944OeGJmSO9HH4sMr96R0acqfBnVMYxqtDsmbj77VscufET&X-Amz-Signature=ec22a29d416114b699d2df18b95cfb574880979aaa45ad0ea07c21815e4553e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665F47MXNO%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T205444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJGMEQCIHDiq2xHccoExVaKFauxx%2BkWt4lg%2FPquLJ2zZ7364x6EAiBjN80aDzqPhJvqjyas%2F0Loze3eMX%2Bpu%2Fj0ppuaEw4eRiqIBAjm%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMXSeEdZmf%2BZn2RdjVKtwDBJABWNoeQq0LhiBB8eVd5%2BQ%2BS9iyHaNg4pkWc%2BBFnaRIn9Q5RRsJHec7rLhKzLkjamoLaejtXOBeYVmG4utRdEKvhCieGx0lvwvHJlbvhOrv9IsM%2BOIGoqsJX3sOy61ieRjIcD5od7TXcDxTpduA1R%2Fgq0W%2F8SrcgmRbwJGoO3KXIb300qQitUDRAmZitl6Qs7u%2B2aEteaaYNUDtNUqKwBDvU3utktskiAdTBidJ%2Fubbh7hAIGJsVMRJoH3SrlP%2BSaKGmW2bNdr3ysEfNwo2vrDWrNXgm5Lwq1Y08OFZPwxEQ%2BLGzqsnmPhLWQvOPPiW5UGtIZ%2F3N2Qm4tw7p6ZkrIvSWNam8RRVvVKk5d4v7ydSymRj1wiD13Bo%2F79pl9k8u7fNPhP%2BiawpeqlkA3DT4cD6z9l0ZWInz11c7swn3Y%2Bhm2cgaXs9SEA4tLyzDLgBzflT4fvMKML3OCphjHiZHJHA2jSq%2B%2B9Mg%2BTl%2BlcjEqZbU3tU%2BXgRHt8RM2vPXxGbRSMDgRsmsbvlKPp0pawVfF1Rrh3BmhvOoEAzHv8RHx%2FN3L7wyUZx8Ci4tQwlbaG89OiufSSzS%2BuozEB7OwyivuW7qQAn89ZNQFJ%2Feh%2F9mziCxR%2FuzRf5RqJRhS0wsrHEzwY6pgHnqZqnFnLeLMAQfj%2B%2FtAHOUYv8kNKnV6ORN6AADNHHX%2FnEOB218y0CUBD7e2QRppIsXbC8kyl8NShB1RFOWw62uNpeGJhAECmfe1P8HRT30gYFUQ4byzt7Imc05eROGsI2EXnwa%2FTL8R52pHq70WWIQzmcZSdzJEROQgqEpv0J5w7Uj944OeGJmSO9HH4sMr96R0acqfBnVMYxqtDsmbj77VscufET&X-Amz-Signature=11e440d6cb145d1a2a91d96630a8e0a27090d7247b58248a548695ff99709a33&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XGWSOZIF%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T205439Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJHMEUCIBPmqBiKM4HikFVTTJc6ESwd8YACIN7SB448gPcj4YaqAiEAjLJW%2FRjCZ4a%2BeXOROuL9POrYId0NC2ghw9KnFcTR70cqiAQI5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEiYM%2BIk2E7Uav5BiSrcA%2BWWwQqj3NDtgZo6zwSPpx5wTZS8i3i36P8Oav1qwB%2F%2FA3AsE2c%2BZD%2FXjlvSKKdxvRgtRNSclHrYQGGd2q%2B0Tk6E5shUnKsmN%2FOfBaIwHbS%2FdELd9QbXbPiiYhEfZxCBjgrmls2Ehjr%2F9I8e8hwL4onq4xvjVgfOdNrvfBW38lEUSnIRqa7ZJMk4LJRsS4cNZID6AMUYq2f2M98GX%2Fsj88fDNiS3XgcsLkfvy%2F3lvBR%2BCGBmVV3PGV%2FoipF9OM0SL%2F7z%2BikSDxfHJ%2BF647aUJHb33jw4HbMsEIdrwAha40j21MkBBVClisG9ulnbHSbcugfL5IMgbcIqPC%2FKrZbSR%2BIQ7gjQR0tnBllYroqefAQjduvj45yfacXoSS5YaPFzZS456ukOAjO%2BwpwObXQ6hbGctoRNOejiA6h7vyox2n3tla1ZKzZkD4JWF6bYYTllijrdQlMEc5YPtkOiL04hlBgD1DcYLcOqlYjFkBZhGNanvfrCJQ2DhfmllBzEpfOfi%2BkeWqEuX1r73163hR%2BtDc6od72bnubXBfP5rwy6QYZKH1%2FcsY1ux6s80WCIOWPNUPOke6FuvQ%2Fo8adVAiAXVnCslKXLiORoUlWOZsPnnreYFNTOuhkcqgIIhFzWMJ%2BxxM8GOqUBgsj39%2FfyWFZZVCawzxDPrC0%2BxEBxZLfuZJGbcfqOxTHYPqXJNjvGWfS%2BdTmtcabvm6RGHmXJESKjbuINz7TWdcoSNhPlaN%2FS8aYZDPvYnsy1CC%2FaN2eGcdYLtoXRjmGwZayo2z77Bi31l07vS2ZBh2hg3zDeENvgBKL5274rDLhexMAdd%2FOrF8n1UvFg3F0HUhIccJS%2BtDIh7TySPPMFPlQHy6nF&X-Amz-Signature=eb38ead1302d57ec5bb4cc12fe27b158d13894c1e3c6ebd67d7ca5aefdccb09d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667AOL5WIA%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T205445Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJGMEQCIGQZS%2BKqYJ22GoEa5DPsSr%2FRy3M%2BfK9n5KnvjSrbpbx9AiBZWOvETwa2I8fxMB7nLDSm67AflEZPvxTCuTsYxQQtTSqIBAjm%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMkH7zJN7i19VZUO9qKtwDPSn5mNjcAtp%2F2aI4fKqa1fyRdWnWownT3sb%2FW0BMVumtbD175j600c7H7moOckiCzXctPnmSijG3Pi11tOwmMlPI4wPh0RWYF%2FollTh7hPwtLVnnum81RqAMguZeDHEyyOojmBG59L1muJUnEfJIH3xmTBr8cGei7Pm5QRsozualG5YtyKtKtztG0TFoaNu9GhZG99aikXzEjW5IaEkf%2BhTvc0BWzXUZZWoG%2BE8ohVoRu5ww1iOYJvgc4vLYVUp6DJGUE6GBq61SCzZAAusckeElPsanpUcnezjMXOLUYb2J3CvEP1u3cO5ZjB%2BImxhif%2B7E8j2iJqYLFQC3uQLbZOL94jl%2BFKXvVeaAOQowefuuknVL77RtidGJbqCRHy08nXn8KUwzLKhBwMe0KTHN2iGmDtL4jNfd9OvWAFlGCNpmFRAfoB%2FITerEbLCcRHdE%2FXqha%2FJAVKMaldgMBdQ1sEwSkUgQGY13BVWKiSS9B6rZqkgXu%2BxoUvEHWAvL8TlrfEboBcy0jVvGo87J0n9O5CJogk%2Fbg48Oc8MqHVAFRoVLjDy3NYUYWJsvkppzQkZKfgYtzxlpFM%2BBYeWksUjAsbq7%2FImk%2FRj7IVTB%2BgxvJqB4xHKzEE2Ug5ZbM%2BkwubLEzwY6pgF5UPVmsc9a1PUdZdBnLJxUN9MpG6xxInlFIw4XM%2FpJY9UpVaxy5SYPkR0KTJg3W9oFRTRwaPN9JxqUT0iXwzoEY9qYLFX1UtDyQU0hlaYhvQFJwQ0FydpCUTAkmTeNAFXP182OLESNPCQO5%2Bcy934iRj9CGs771rDVVcIEqrcCQdMjX%2FgWbgb1mG1QdehPcrzhZG16r29e6CL%2B8ynRiXNyHp9s0pIX&X-Amz-Signature=0d8349cca6ae717fbbfd15d5d9abb7c958706adb1b04b3593f8e9a1b1a6dbdb8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667AOL5WIA%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T205445Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJGMEQCIGQZS%2BKqYJ22GoEa5DPsSr%2FRy3M%2BfK9n5KnvjSrbpbx9AiBZWOvETwa2I8fxMB7nLDSm67AflEZPvxTCuTsYxQQtTSqIBAjm%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMkH7zJN7i19VZUO9qKtwDPSn5mNjcAtp%2F2aI4fKqa1fyRdWnWownT3sb%2FW0BMVumtbD175j600c7H7moOckiCzXctPnmSijG3Pi11tOwmMlPI4wPh0RWYF%2FollTh7hPwtLVnnum81RqAMguZeDHEyyOojmBG59L1muJUnEfJIH3xmTBr8cGei7Pm5QRsozualG5YtyKtKtztG0TFoaNu9GhZG99aikXzEjW5IaEkf%2BhTvc0BWzXUZZWoG%2BE8ohVoRu5ww1iOYJvgc4vLYVUp6DJGUE6GBq61SCzZAAusckeElPsanpUcnezjMXOLUYb2J3CvEP1u3cO5ZjB%2BImxhif%2B7E8j2iJqYLFQC3uQLbZOL94jl%2BFKXvVeaAOQowefuuknVL77RtidGJbqCRHy08nXn8KUwzLKhBwMe0KTHN2iGmDtL4jNfd9OvWAFlGCNpmFRAfoB%2FITerEbLCcRHdE%2FXqha%2FJAVKMaldgMBdQ1sEwSkUgQGY13BVWKiSS9B6rZqkgXu%2BxoUvEHWAvL8TlrfEboBcy0jVvGo87J0n9O5CJogk%2Fbg48Oc8MqHVAFRoVLjDy3NYUYWJsvkppzQkZKfgYtzxlpFM%2BBYeWksUjAsbq7%2FImk%2FRj7IVTB%2BgxvJqB4xHKzEE2Ug5ZbM%2BkwubLEzwY6pgF5UPVmsc9a1PUdZdBnLJxUN9MpG6xxInlFIw4XM%2FpJY9UpVaxy5SYPkR0KTJg3W9oFRTRwaPN9JxqUT0iXwzoEY9qYLFX1UtDyQU0hlaYhvQFJwQ0FydpCUTAkmTeNAFXP182OLESNPCQO5%2Bcy934iRj9CGs771rDVVcIEqrcCQdMjX%2FgWbgb1mG1QdehPcrzhZG16r29e6CL%2B8ynRiXNyHp9s0pIX&X-Amz-Signature=0d8349cca6ae717fbbfd15d5d9abb7c958706adb1b04b3593f8e9a1b1a6dbdb8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667VFHHIDD%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T205446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJHMEUCIQDYFzyQYVAvXbaKeNojVQbWQDGJ5E6hQaqFG7UR8WP5gwIgdKb85IKzs48WXC0TGdTJpdtH%2FRydpcYQrPgENjiTKjYqiAQI5f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHonBsBh1EdqAi9mOCrcA0Gf6I%2FLob1UpqUc76a2Be9e7kuBncUGuVfHuGmdlAKhOzsx30ELIhp%2F2P39MqIhNhrnpULpEhNHXmXv1uiF48IZSf6DXd5lDmoqJR7r0yXyfxf4dGZTHqm%2BqiE7kya39CYMMkRrCjQGOmBC7sVYdTvtVgLPzrKZaV10bnCx56JY16DcCCcjwqySkct7rmFVaCVkW6dbp%2FiLoEkYJU9Ep502OKDarccuexPupLNzcWNj7LDVpyvEb1VzeF8R0%2FtaOuAhp1RayEXhVMtOSDzwjs%2BpfalHn6Ck6XnWFm1ml9%2B4FbuIMsXbp2qKfFRvUiVCMnJ4m81Bczitm3AYhVSmHpmCx2%2Fj%2FuSQqHk03fSuBJMNAe7aNhCsQq4UAQz0ik4VSNo3PhcGHmbUb27eT%2FB0LTr3kfbX4568kKsAh73hi1ghJmP3TXf5YBy2RK6pso86yOWjs0yvh9WD19CaBSufaYzEDSEUcMgcKQaPayAscy1YQVSryQBMZxkU3pVVG3lqERX9dSztcixbu3RH1R1i8mYixdAkje2Jr19Yynm3vpBXjTAlVOJ3RWW4a9z8I5AoZ%2Bdsa9%2F2pBdsmteIREojHJenqebUbDzBBSWbkNB2FQ0VOocu4rEg8UhCrGdHMLCxxM8GOqUBKvA0vwtNpVgK6TbZMmOPq55ct%2FVpMU6pvJW040emktJSG5CgoK5sPIuSs3THYgn7OcAziUlP7b1D14mw5kDjxoZ7szgV9%2Fi0AtsXPm7UWQHRs%2FUBWnxuW8Yfkuz4%2Fvy7MuyeYIIZrTQdWT57pQVzb9iE%2B6BdInDIhVRHfm1l4Wc0hOmpmn8jDIaF6hOOF%2FHKcVhEJf4TA5w8MmzfrtKxAzzDP4y3&X-Amz-Signature=5d927207a504d58f659c7aff835a0e2b3f740f26a81f5dbaf2f8668b5d5c4889&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

