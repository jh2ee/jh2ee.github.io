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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VIVNBNOF%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T230049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIFTAvlLt6Q5hODPWzXwqgMwYLu%2BYknnaFnd3y9hd3GyfAiEA%2FsN87%2BmM3uHmTknGuGTnSdjInsXlzCk2rtLwLrEix5sq%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDNxlA00XS%2BBmx9aOYyrcA1mBbjjLPMuKRRdmlk1haVGAd%2FkZFIPDM1pGE%2BwHFlViUR3Vhx6F9BzCJmD1JRdD6MDwGDdU2ZqFP%2BY4xVf%2BElzSDj4pNwkRw%2FSvJ%2BdSzxxquhJN8qATFULtJnQp8T5HeZoe1%2FwLxhxtfTUr5XCQ0qg4t6Zc9NcQljfJfLho90cJMrqOcdNHh0uofpYsJ%2BqDYm8zq3MKrJvyahOw%2F6XfLe1M0uK4WtVFko2qGe8deHei6Fav36wippE5SocWGdHymAVy3QxRj%2FQG0SiV%2BM1bFdu9%2Fp5q5x%2BuFdc8IcNy9%2Fk7pGhBIaWNQ1I%2BlmeuiI3vhvUueriPbgfat1O8Y%2FX89khySdjc63IzdyqoXl2AJy7Ctb9xoGFVjaBnYQ2cg%2BFiEj5wUWnJeMLOK3xaAWd37qMVeMZUTEuONfvviRU3mn%2BU1RPAnQwK%2BawSRiyCb3Pzy%2FsILxeI1szOzytBD1yR08gaUrxjAqKQLd9DWW%2FeM53EH4zttg%2FaA%2FEgFY3%2BMmTsOdmem85IojY1WT9rLIATM%2FlLdo%2Bvz2zofXOtSKJY5JMtu4SyfuKOKMPf%2F%2BkJtsRh%2Fdi%2BMcWNx1So4do8pW7xYu4dzFwxjV0kahpYWT%2FU2ub7tcu%2BcaZ3vEhyo3NHMPWzoMsGOqUBpnM7ssRrK3nBtOfvbK5Zos631wcYX4ZIq6qPTQvhvDFS8t2uNg7QincBW96XyvEvnVa8%2FOdgqzQParL0WJPuKS%2B2f%2BntdB9MSRay6hBdGE7XSxp66zhvMkba8oFkAKs6HJfVth%2B5RFprFs83%2F2fb32Enac2%2FTjoc0%2BGVRutHNLXNvlrfxM707j%2BfntkLd7%2FOJjLMjj0sl3Zl3b0vGQDUf79apibx&X-Amz-Signature=8900e4887f340ee942e8740227dba288b67269aaba6f35c956bb3c6c52eb7795&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VIVNBNOF%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T230049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIFTAvlLt6Q5hODPWzXwqgMwYLu%2BYknnaFnd3y9hd3GyfAiEA%2FsN87%2BmM3uHmTknGuGTnSdjInsXlzCk2rtLwLrEix5sq%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDNxlA00XS%2BBmx9aOYyrcA1mBbjjLPMuKRRdmlk1haVGAd%2FkZFIPDM1pGE%2BwHFlViUR3Vhx6F9BzCJmD1JRdD6MDwGDdU2ZqFP%2BY4xVf%2BElzSDj4pNwkRw%2FSvJ%2BdSzxxquhJN8qATFULtJnQp8T5HeZoe1%2FwLxhxtfTUr5XCQ0qg4t6Zc9NcQljfJfLho90cJMrqOcdNHh0uofpYsJ%2BqDYm8zq3MKrJvyahOw%2F6XfLe1M0uK4WtVFko2qGe8deHei6Fav36wippE5SocWGdHymAVy3QxRj%2FQG0SiV%2BM1bFdu9%2Fp5q5x%2BuFdc8IcNy9%2Fk7pGhBIaWNQ1I%2BlmeuiI3vhvUueriPbgfat1O8Y%2FX89khySdjc63IzdyqoXl2AJy7Ctb9xoGFVjaBnYQ2cg%2BFiEj5wUWnJeMLOK3xaAWd37qMVeMZUTEuONfvviRU3mn%2BU1RPAnQwK%2BawSRiyCb3Pzy%2FsILxeI1szOzytBD1yR08gaUrxjAqKQLd9DWW%2FeM53EH4zttg%2FaA%2FEgFY3%2BMmTsOdmem85IojY1WT9rLIATM%2FlLdo%2Bvz2zofXOtSKJY5JMtu4SyfuKOKMPf%2F%2BkJtsRh%2Fdi%2BMcWNx1So4do8pW7xYu4dzFwxjV0kahpYWT%2FU2ub7tcu%2BcaZ3vEhyo3NHMPWzoMsGOqUBpnM7ssRrK3nBtOfvbK5Zos631wcYX4ZIq6qPTQvhvDFS8t2uNg7QincBW96XyvEvnVa8%2FOdgqzQParL0WJPuKS%2B2f%2BntdB9MSRay6hBdGE7XSxp66zhvMkba8oFkAKs6HJfVth%2B5RFprFs83%2F2fb32Enac2%2FTjoc0%2BGVRutHNLXNvlrfxM707j%2BfntkLd7%2FOJjLMjj0sl3Zl3b0vGQDUf79apibx&X-Amz-Signature=8900e4887f340ee942e8740227dba288b67269aaba6f35c956bb3c6c52eb7795&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R6NAB4D2%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T230049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIQCQLTJOX7jjReReOA%2BGoC9tf1B7EerckHQ9qNg%2B8qw%2BYAIgV2IGizVY4jmsY2wgaympNc7RO%2BuZ1eRjo0dlqplWjBYq%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDFJ5a9%2BCWg1MdtDQaircA3%2Flt%2FxgT5VSuvx%2BfWFblhkhSngdCAVmGj6d8dNwGgpnflGWEf1RRi6fONj5jKYDBWRSyYMZiCWs%2F8WU77iOQ7ivrFzJZdU%2BocZQKT2adR3N%2Bw7MiFbHzp6dhndBUwivSPEfjDOxXO1RxKjQQ2SFb2o07bf1FaGyJ3uSm04DMEAHgRWn5CvUwU3OxjubUJLO41dnXLw%2B%2BYf0nNBtA8oxk9jdZIU8ISG2DsNzayQJMszbPbd6j3keg0Ly3WtQj%2Fi0MYxPDohgIwULhs03p%2BfXnbOn3NuO0WDBRgv7eFrtOKd0g4%2BCXWx2oD0hLG8zCw8p2JaFer7gkp4iPK%2BzMhrwiI1mJCqVOpAX%2BNQZsMC1B%2Fqcw5%2BaUi2IHThtAEoNVkv1SkNDBH%2BR0mPxDyiVu1jQr7yEHXMAW5DhjTd8a%2BovlJSnLEFCPvCdIy6oTDyqINRbEpZwKFHThBhaNZppSHBu0E0WyJFLq7kVrDkZfE377eybcKDGnKuc%2BLhssSLh0Q0%2FfQjyxHkuiEKcOH7A4X3pBSrZf3Wt9zeZatqkhgkC8WxC5ZxrBDIBkeUX0k%2F8NMjx7LbpqHq2E7wcv3%2FDHlMa3EJAnV7k8EJx7V%2BAAb5Pek%2BqC39IuYZBtRd03FahMJa0oMsGOqUBaE1e%2F72n4znVAL6uPbvk7pEORgwIluTLg7ttBkvifSXEc%2FLiDTfjNvVoAK7S3shEWonowHHlYZ%2Ftvo0xuPorZJMWm7zHUXD8qraOV%2BOzKnDQCde4%2BGMVM3bVo937pvJE88e5A8SLesUCjIk2XirMZ8dQnFpIZx1n%2BHLnucRtCzKBdvfvDwvfgJOgQaDB3GE3jzo6UVNaBCdy9aQG0iyLU%2BX%2F8c3T&X-Amz-Signature=ba4e46a39d9d45d1b5329f5d101e3e14396b16a61d2da238df058694dfa49603&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UZCPKIJ3%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T230055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJIMEYCIQDem5Te7x%2BKA3qo0dHsEcEgfsXwgGrCjRIZ0x5CQ5a17gIhAIxXJp6tlSSjL5Yb3Y3bIt2Fa4f74cXm9dr6JCJ9hRqeKv8DCCgQABoMNjM3NDIzMTgzODA1IgyGA9QCqmmNNDVzRIQq3AMuN%2BiY9ypNlj2%2FS8uWhc0JOdL2I9pk8%2BlPlvCKnlapz1glxB6MDzT7EcEqgedWM1j0l4bSqY%2Fb2mJMjTf3CvVAOb14T8idqXErb2Dx3xas%2BNYN94Sjvm1h5RSSFu6A7UNqYJ8AgG3GXp5La8v%2BE7UdUatioKhFyceV8nvqonmGorbYCnOadHTOx%2B13mHrakWX4R3opdOoLyerMCaZKyBjiXihlM9%2BizYX04WMtzocs5DPMMUOBE4gY0SHHNPxXEM%2B5NAsPIg9JvA%2B3Kfmbgb6GxINGnwRHpukv3TEGDaBn%2BXc4t9tajUEUvFIfwSJHp%2BbzRH%2FvsgpTFDf02qGLjQZROjO3A4nO%2F2mIsfw5F3wfFlhhxgrTJfIG9Kc5qvFp1Fn93atwSFjtFdjgN5aa3CjSHTF0UDZ0MPOJ3%2FA9mxbb5b40X6FqfRRYwIsB9cWNkheTNwSwdoIIziuj4hM0rl4R2WVFWNvs96hJiJt3RKtm5nhoGvKFQDHfaysXCQLvSuYwhsCp2gkwAR3eYU1raBtmY3vVE55%2Fdou1NRHbBW3gDN%2FQx3GoDnGSk0EC2swTlgr%2Brg8aMdrPPBDWjPYjTTFpMr8shbSnJiImH2TUmfJHcKs72aCPgwzTZh284DC9tKDLBjqkATSW4sN8usjPhRPDMQ4JQwyVzPSjpYNzIesjRpIf4ayEjDg%2FnlcbDZt2AD%2FmHnU2ot9ZITwoKetwPcFQC42k9GO%2B1%2FJ4TX3Ce91l5NUZSb%2BWU6acrI6QtOqXpankc9O5Up4wPlLCmSTGakrJ1jXKP0KDPmWyhwQMTMyMC9%2FeOSVAbhpdAti9ghxYcand5vXlzHeou6uhM3fOCbXrfiZXdutvUXQf&X-Amz-Signature=d3834afc619c331d69853253acb7adfc247de88c5caf304b4f240a492a3ed295&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UZCPKIJ3%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T230055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJIMEYCIQDem5Te7x%2BKA3qo0dHsEcEgfsXwgGrCjRIZ0x5CQ5a17gIhAIxXJp6tlSSjL5Yb3Y3bIt2Fa4f74cXm9dr6JCJ9hRqeKv8DCCgQABoMNjM3NDIzMTgzODA1IgyGA9QCqmmNNDVzRIQq3AMuN%2BiY9ypNlj2%2FS8uWhc0JOdL2I9pk8%2BlPlvCKnlapz1glxB6MDzT7EcEqgedWM1j0l4bSqY%2Fb2mJMjTf3CvVAOb14T8idqXErb2Dx3xas%2BNYN94Sjvm1h5RSSFu6A7UNqYJ8AgG3GXp5La8v%2BE7UdUatioKhFyceV8nvqonmGorbYCnOadHTOx%2B13mHrakWX4R3opdOoLyerMCaZKyBjiXihlM9%2BizYX04WMtzocs5DPMMUOBE4gY0SHHNPxXEM%2B5NAsPIg9JvA%2B3Kfmbgb6GxINGnwRHpukv3TEGDaBn%2BXc4t9tajUEUvFIfwSJHp%2BbzRH%2FvsgpTFDf02qGLjQZROjO3A4nO%2F2mIsfw5F3wfFlhhxgrTJfIG9Kc5qvFp1Fn93atwSFjtFdjgN5aa3CjSHTF0UDZ0MPOJ3%2FA9mxbb5b40X6FqfRRYwIsB9cWNkheTNwSwdoIIziuj4hM0rl4R2WVFWNvs96hJiJt3RKtm5nhoGvKFQDHfaysXCQLvSuYwhsCp2gkwAR3eYU1raBtmY3vVE55%2Fdou1NRHbBW3gDN%2FQx3GoDnGSk0EC2swTlgr%2Brg8aMdrPPBDWjPYjTTFpMr8shbSnJiImH2TUmfJHcKs72aCPgwzTZh284DC9tKDLBjqkATSW4sN8usjPhRPDMQ4JQwyVzPSjpYNzIesjRpIf4ayEjDg%2FnlcbDZt2AD%2FmHnU2ot9ZITwoKetwPcFQC42k9GO%2B1%2FJ4TX3Ce91l5NUZSb%2BWU6acrI6QtOqXpankc9O5Up4wPlLCmSTGakrJ1jXKP0KDPmWyhwQMTMyMC9%2FeOSVAbhpdAti9ghxYcand5vXlzHeou6uhM3fOCbXrfiZXdutvUXQf&X-Amz-Signature=c053e63ce2af76db36fa121740c52c190e56d73148d2c97700a1de731ccd464d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46623W3ELI7%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T230055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJGMEQCIFN6DdH18EvVcMS4YaT%2Fl%2B9S7LlZqhMa3HgyloqUZ9ZMAiBzFF7vqI07rSB0yFURRHSjACKXMr4ulcORZyOIG%2Bt3ISr%2FAwgoEAAaDDYzNzQyMzE4MzgwNSIMZFNFKQlgll8WyMenKtwDR81lQHQlADr9ii0qa7A0JxxkdH6MvTHGm1%2B3OqFjompa9MW7JcR80skLmHWz6RB%2B3JgDMaTfNeBgeU4HfVTTrzBowWFYt3o%2BEFv32LDDOrllO%2FJBDP3UHNpjztKiUHLu2avEPDZTsY%2FrSdU1x0M%2FHFzsMgreoQTVvYLnxHZSx3BpDfz1W6ki5%2Bkly%2BTgC2OFt93vy9E05AH5dxsSt4Alh6xRV5CuC1QnhXzN3ZgdwGQ07YLbE62V5nbcITvRYsrBBs98SQeUxodgIBsOHSqmno3a%2FefdAK%2F8EURyZGPa18HlZZddgWMBkWJ15ZN%2BqpI5lkC7rhXLpR3zWiZAhAU%2B5992U4JKa%2FYgSeble97p5QNW%2B8sboPW7%2BoI2yHRZ0EFrHhLl50NpFqWNu42LdVwsum%2Bxt0GqxurouHn4zxGzvNukev48xtC0SacTM7pbGOAEfbRjwqKy3l2G5MtQIjiTA69HPrNX6y2J0o87DqP0nmCxUzTjeLnhVfg9kF1TFFHebpKGGm8nF0aDAbjAPcIefTY8oJBg4ZvkKoAjQwttno1zjw9NN%2BqkvWcJqs2WbsAdyZpIwVr8sCLhwKzRf0yUxlZFx3z4IQTA7iL%2FJfhpm1V3DWvJBR6BPuo2gFUwrbSgywY6pgGSPOumb40zVqQr%2BUi%2FKxDCEq%2BgAPaQtWYfy5s0HeCf5pheYW%2F8xrMG6T2KkZzJGFgthDGEfF%2FIf6m20YujD%2BUe4kCDS3YB68m2FEpaoUFBbeY9K252fqcLLyDryRePxwPsngEKagCoO0FqygdKZsv7ZZ1%2FadtAVjj2vii%2BR9Ui03%2Fpgv8tchW09BzvsCRh6Py6b37tDOcT7zLa9u3heCwxvE1cymWd&X-Amz-Signature=890d86d5d46c8ec1ff768aa7d480f5ef8084717bf5af61c7f7e991a84d80d044&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QMWH7KJ3%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T230056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIBRwXB3Ury2cQk2JJJ%2FUs%2F5pNutAnMbKsYNgZn66xKSnAiEAkDPnWotgeuqaNG9p%2FbofEHqPzoIYtiFEmmJ2WzKPnyAq%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDONweHlm1O%2FLIJW9kyrcAxURWBj4X1lVVLBEESKyfQDMYpIcfCNmB%2FFtAOUvGEOXVxPh0LmIVo0Fhyjc7eXTBq1LiSfRUBYE%2BDKZL0M2LhA6DbK9QXfrxhXD%2FXC54tyuJkU1oh7orK96HBAWXPCK9OMggSVcF94FSEsZCal7ZMQKhxBccIEqrFEmEykfS43drQ%2BSOJIY%2Ba1d3jVX%2Ba%2BQTXrLGoJcuFhF3VxZvwIZmsHDgwDhciAgHR9gz7LkCCCACZqxVBY0%2Faw13nSYND30cqvy%2BYxiIkw8F%2F%2FORNKVzxNDGLgzNn%2Bx7e8%2BEDJBWL1KH1%2BI%2BlzzH3YxN45CBex3JNig64aUIWwABLke8rk%2BkTFUG1Ld%2BL6W4mXlIYf71CUsHYDlizeSxznXczhSzpFumi9DM1UxQ57L1SpR0QgGAMylWWJS%2B6XqX2IL52O1Un1yOzdoZLcAUSbWV1j7KiVniXxU6jzruA0uMzzeS9CyEqObAtWsmabr1T%2F3ZT956tHmSR45IuSVit09sgI0B2me9ehdEqO03VRZdPGQH6ZoNwWPBt%2B0T%2FSMSS8jRcZX36B8mgHXKg8f784bfYa0oP8SFV%2BMKI5w1Mau9AmApWl9gTlDksZqqVtM3JXsqe9XCFgsKo%2BXb%2FK5kojiK0aiMLG0oMsGOqUBV008Un2GXPskGTzkElajK29zv1PBAQH1Hw3A5%2FMUORoS3QlLrCzWMMrDNHSQzp7je3G7fNn59gRMm6ysNh5O5%2BHsbNGwVMA%2FsVKFuPToneqVChDfM%2BdXRNgDr6M40hLhoGXQAIaZIHGSd%2Fo9us3V04DSoez52%2B4Iszeyom32h0O3Vd95pX1dcCJdnQxK4KtCqdh08WrhgwNAjAwjAy0C6WlNUB6p&X-Amz-Signature=7905b6335df3dbbfd27ad1a170ea06535ddd8051009f9820cb1f339793decd96&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664WJSAKJV%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T230059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIQCPz%2Fv3nTFVbpVSUNYrBm6kFLZOaQWailIgDUKEpaNijAIgBn6%2Bm0V8AOqtgFKDHrNVFLSFYC%2FGs5SWgPZh7JAaHrgq%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDK35XGQHABM2uL360SrcAygDSzxcSuOmN1ypRodFtFLzFQ98uUK2Uz2x47Yn6D99OnnB6EnvZAKkRjL7i5M3QJaKi7mqxvmuOIRs17SqqrEluItCr%2FYkeZyDUOAKMLlXKz3Yu%2F%2BfFfW7Dre4XEHINqkWijevfqGKaeuapv6ejiHuKHk6YG1%2BjTlmlRbr80J3IVKMzXaaEEYv4yRB0hUljFGFZal8DzwBVKtt3Qpk%2B%2BN19nneWVSibXMmYA5lvtfL%2B6ORet2pBojKVmdL6B5hcDhyxtVLwF%2BD3b6tFL8dT38RrHOA35SJ8KqrFSDTs6%2FLtd%2BakvoIAAeueO3HM795qHvLa%2FiyEBdTAGgdLqQAiORWXyJHTR1QChQ3inWNwBGo1NR1TGpHTI0y8DCaDU%2Fqowp7If2TKhNrMoYyccf25bBEegwDpLrN%2BAY5VD0MT1A3gTBHOEwrH%2BbG1znygjikDJvACbxw1pcGVgxxk9u3HcwvAr%2BWBvSiAFcCJDHnmikkoOKlthUdb1HE9vdhCrZvBoAHCS0pGv4%2FsqYTOR9jbJO8ljCPCeAQHym8TrJZkXCQ9hbDj%2BPR6D5%2FHI6tJnQWPhM0G9NWKn6qnanzDsC8zezV0YTjD94vN0PUQf%2BoVPoWXX9iEvHGA8qFyOpvMKi0oMsGOqUB%2BOqR8rbkkM4f7SWxYxepqjGmKReQz%2BDR960ttVPs%2BRVip6js02YrmDlkCllo9d5qMi837tGMOluxOuE8vnp35OeWYNGrCe%2FX1SSNoNk%2FnaT1iEUfJjQ4Fniu87CZLZlqujScdxlHwIfr9SF10BM5VwvYague4pU3pXHQn3bvBMrKIZvkrbHJ3TmUQx%2FBNxy6TM5ntshrm%2FyEe6WIo7HwcDhtWXvC&X-Amz-Signature=99fa7face276b43556e0e57e519dc84ab7cff797a0cbf3f06b7ac9bb78e15c24&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667GI6L5VX%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T230100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJIMEYCIQCHeUKhlk%2BleSkNv6qa8fcJpOhlczUj87JCb%2F7lGoSk2QIhAJ9v6X4i4ELmV%2BF%2B0b1xxLrlpZO0nrBtKL6sgpxtikJyKv8DCCgQABoMNjM3NDIzMTgzODA1IgwwA%2Be4i0XI60TQBUIq3ANVxx5oSnSLw%2BdaquSG22TQvNkKD9wsuqdckrZ%2Bwghh%2B7ba6FngesdX%2Bw8rK7yy%2Fl9eC0lvswlOUsLbnlYAGEnEp5rB6S6BBOJ3pQsyNfKJecqH6nInJklbN2tjpROjax4atUdH83q66y1lFuAl5GeVLSE4cg9O1AcHCmjoKJX4MgoSo3unkpypASDJljEP8KFtNh1yFNT0fzgeVJ%2FF0srZkw6ojWWPIYmrXFf3AnX8B9TkgIraBCC9UuoIz7AGdz2De1yQ%2BrMsS22HsKYE4r1ziQ6C8g3CZSzwq3hk0l841RCEomMicW4wYbg7O6FuTdj3OZQZH%2Bz1stV4QAqhe92232besCvYCYaAuO7dX%2BhlNaiWW2I8DpicbahZdLJjbaNCgSveQ%2F37INhFNRtGkHTK2j23Da1ARtQqnWkYhPz1WAhe6uembSMj4r%2Bz%2BjFmtoEngODsLqJ9scnOlR3ek9MUnoKucE0F7agBDPgeDNdUt8S9gIVQrj4Sn1ywUmob%2FplYbiLmobPPe7NXdZtvhxrl99WlRjUCbYMoZhLanZD8RhWLc61xqtxz4HrFhKeZ4Fc72W2rlMpH9oiLD8EQLeTHCm2eaSG7NeJVTG6Lcs0k%2FkSxoVnRDkQjqU40dDD0s6DLBjqkAZu21EGwsn9AEDoH4%2B97%2FY1DtAWUBzOLUYa5rpCbHMBsmknaDCeB9bwBOgMwS7aKcXSiYmtROK%2B1RfSuL%2BMo6msHmFJZBYnNAgC%2F9UPlPOJHBg2Uh4%2FN7ul2hG05juaRelExJUTw4t21y86LxwAbeu04aW40qbfLZOLDY8y9R1htdYklZUqceQKv5LAHLXYscKstrkNbsNbzmeMB3FPFEgBmB1ba&X-Amz-Signature=9e62d241388ad4e51a0641299d25a763c5b29a02a86b298304c7d66f89798a28&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667GI6L5VX%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T230100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJIMEYCIQCHeUKhlk%2BleSkNv6qa8fcJpOhlczUj87JCb%2F7lGoSk2QIhAJ9v6X4i4ELmV%2BF%2B0b1xxLrlpZO0nrBtKL6sgpxtikJyKv8DCCgQABoMNjM3NDIzMTgzODA1IgwwA%2Be4i0XI60TQBUIq3ANVxx5oSnSLw%2BdaquSG22TQvNkKD9wsuqdckrZ%2Bwghh%2B7ba6FngesdX%2Bw8rK7yy%2Fl9eC0lvswlOUsLbnlYAGEnEp5rB6S6BBOJ3pQsyNfKJecqH6nInJklbN2tjpROjax4atUdH83q66y1lFuAl5GeVLSE4cg9O1AcHCmjoKJX4MgoSo3unkpypASDJljEP8KFtNh1yFNT0fzgeVJ%2FF0srZkw6ojWWPIYmrXFf3AnX8B9TkgIraBCC9UuoIz7AGdz2De1yQ%2BrMsS22HsKYE4r1ziQ6C8g3CZSzwq3hk0l841RCEomMicW4wYbg7O6FuTdj3OZQZH%2Bz1stV4QAqhe92232besCvYCYaAuO7dX%2BhlNaiWW2I8DpicbahZdLJjbaNCgSveQ%2F37INhFNRtGkHTK2j23Da1ARtQqnWkYhPz1WAhe6uembSMj4r%2Bz%2BjFmtoEngODsLqJ9scnOlR3ek9MUnoKucE0F7agBDPgeDNdUt8S9gIVQrj4Sn1ywUmob%2FplYbiLmobPPe7NXdZtvhxrl99WlRjUCbYMoZhLanZD8RhWLc61xqtxz4HrFhKeZ4Fc72W2rlMpH9oiLD8EQLeTHCm2eaSG7NeJVTG6Lcs0k%2FkSxoVnRDkQjqU40dDD0s6DLBjqkAZu21EGwsn9AEDoH4%2B97%2FY1DtAWUBzOLUYa5rpCbHMBsmknaDCeB9bwBOgMwS7aKcXSiYmtROK%2B1RfSuL%2BMo6msHmFJZBYnNAgC%2F9UPlPOJHBg2Uh4%2FN7ul2hG05juaRelExJUTw4t21y86LxwAbeu04aW40qbfLZOLDY8y9R1htdYklZUqceQKv5LAHLXYscKstrkNbsNbzmeMB3FPFEgBmB1ba&X-Amz-Signature=5798a55b744a837b62b7b6b30d8717022b20c98b4a819bceebda1c7269121203&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGB4ZJYC%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T230047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJIMEYCIQDBkMfRxM41lQqOz1IhKOJooBAKbZXGpv1KzRZiAf6yDgIhANbCSbHNYba668x7UcFtQ16VrKmvGjEdwke6UOIcNpwpKv8DCCgQABoMNjM3NDIzMTgzODA1IgwoqD9fmRZqnTE0O70q3AONvlU3K2znl58VzNVYsH%2Fg%2BjKQKLhCbBiQgUM7eSqjxmOsw5IN4u9432CGmsmAF0Oc%2FS9vZOHmxrH0RoOGRwtCzOL3LZ5ufgHf9J4rfCZ%2B8YXws6EQRiFZDXPDMZN01Tjqx3Dcxvvzr1XdMJQApRdy0HSKrytJ37r4GGvJNU8S%2Bp5cmFZPfcW%2BzqKpbK%2Fp36stz3cRty6iVv03z1nz9y27rcUygVc7OL50Wk3a5bEyzpE%2BZVaaSiTJyoBAP5sVuVsv4ZT%2BtST%2B03c%2BWerNWTbx05X7dBaM3e91Y2ToI2CoRvYxbYeQMSDQxY6qcMM0Jjs5rbFLoZrqz9amRVDZEGsyh%2Bn%2FAOUUEV2IifWXsMawouksIX2xltmMi0u433Ym5%2BMwjm3KG9Pt3HNyv0HM%2B4RIEBunlmXGvMrppErUbyKzqwj2bVeQ91J7%2FkObwNIIK1yIwyNXtG%2BlIM52oPcOQO4ng%2Ff2J55Pu5iA9gvaElJDrQlpE507kmGnLik7%2BduM6fDc%2B8EpPNazmyMOxhnTkB%2BstiADxUI7pMbQv63eKtt6fHlx59rCquOh8Kmsz6Pn4jmBU43auJn4NncrYTnzs%2Bi3vBom3bzoU%2Fwvx%2B5MXtGwvhgdTW17kpmVI3XZiTC7tKDLBjqkAUabQsh8ksCAqLkuFF8WlnmI9mXeSVBXWrdXqSktWLLNrpl7h4Z%2Fr37BL8zbQW5IFBvnml7w3HTs1oidW%2FhN%2Bz%2BbSCbDONLPkumm6PM0L0Dh5fNERvhwKfDnRtLgam2vr5m5CjHCxv5hZ19utFvNjSBX4yrrGsIw6kORPysyh7gZ4UbOB%2Fs3fPMFDcsPgY5hq%2F2p6FUxa8PLxk0Ytaa6XGHaU3KA&X-Amz-Signature=926ea34b73862f6362d6cad19f8da1ffe9e090eaa01fd065479290d21886202c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJLG7QDE%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T230102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJGMEQCIF3PR8llAJwrxQ3hvp71DjCx9aVG8xmysyU3%2FYfapWL3AiAnt0u1yUsEYrj1dTguZs%2F%2BDVu6tKDFh40fqIVGkr8Pfyr%2FAwgoEAAaDDYzNzQyMzE4MzgwNSIMiZMNRN%2FocS7ocVhYKtwDh6J4FIzumO9Ss1BglNSbzv9rFdNkrAy%2Fnbww4mZ6BZ0dCVMgX%2Bv27ZUBsxK22Qrh6Gmedrr65xWsVdo%2Br5khORjzlR2Og84X7eagUQ%2FZkNa%2Fpe1cfW%2F76Ckbdl8CesTcuYB5u8UA4b2HpEpVGMvj3vdV0%2BHxEzP%2Bvo1JAe40i8yA6H%2F8M%2FPs9j7uoOxuEKkibFkpLO1%2FnZ5Swgbk%2BSFJaZJ0B%2BbIfp1a51XtJCPir02OR2ZG8x3ExKaM3JCnudLi%2BuJUKrpwY8x9oDzHvn2i8bfunw1X%2BhrNSOBUE%2BGoXzsZXgc7MXyvQVUxlUMWTN30TbAbG9BzgmhqyjTsAyPnxmLsgLz5gYEl1ay9VoxHze5lRjcwqv%2BvGpG77KTydeNXp2uK5DfH%2B%2FZyp%2BaeDg9q8l5vipjhgBniEc%2FICkwYCXFlwYELCEstxQObUN3Dl2mrxokrFMKjAAxENFG7bOEvtk%2FMe1YNA%2Bm%2Bt4BkgZUo83gMtmHqbrifQDDxKnj5ZBl32MeUNEROsddBZWNbcJjTnhzl1jIKQXTFERaS01rWlb8VuiAoh4M5zgTT1zepE8s%2BHmhcBrHED8ctMlU52OMu5nvRn0NjH2o3Oja%2FcC%2BVOQyu%2BULOWS2uFfIzTmkwiLSgywY6pgHUsvg9F8w9hFa03qbnB38RTr7GOQV%2Fr7MK6stC4PbF1q7WEKuT4p%2Bb%2BzZWA2Jrp%2FLowTaoTBKdBimEq99TFWgQLPW5c6k5shWYwFl8LoXGyZayjEGA3HraciElzvYPO1gpXBFBzBhDvrJgtJvvB3nDHYT2vWcY9%2B8T3d0E890r5EiAISDkAwc4p8VuFxzgW%2FSWdANSbgTJZrLPrcRBVPoeWFpsdiUJ&X-Amz-Signature=7b31ae7863413e88851f52ce864f52d6a97d05b686cb7d5c7fc4a3b584ab977e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJLG7QDE%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T230102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJGMEQCIF3PR8llAJwrxQ3hvp71DjCx9aVG8xmysyU3%2FYfapWL3AiAnt0u1yUsEYrj1dTguZs%2F%2BDVu6tKDFh40fqIVGkr8Pfyr%2FAwgoEAAaDDYzNzQyMzE4MzgwNSIMiZMNRN%2FocS7ocVhYKtwDh6J4FIzumO9Ss1BglNSbzv9rFdNkrAy%2Fnbww4mZ6BZ0dCVMgX%2Bv27ZUBsxK22Qrh6Gmedrr65xWsVdo%2Br5khORjzlR2Og84X7eagUQ%2FZkNa%2Fpe1cfW%2F76Ckbdl8CesTcuYB5u8UA4b2HpEpVGMvj3vdV0%2BHxEzP%2Bvo1JAe40i8yA6H%2F8M%2FPs9j7uoOxuEKkibFkpLO1%2FnZ5Swgbk%2BSFJaZJ0B%2BbIfp1a51XtJCPir02OR2ZG8x3ExKaM3JCnudLi%2BuJUKrpwY8x9oDzHvn2i8bfunw1X%2BhrNSOBUE%2BGoXzsZXgc7MXyvQVUxlUMWTN30TbAbG9BzgmhqyjTsAyPnxmLsgLz5gYEl1ay9VoxHze5lRjcwqv%2BvGpG77KTydeNXp2uK5DfH%2B%2FZyp%2BaeDg9q8l5vipjhgBniEc%2FICkwYCXFlwYELCEstxQObUN3Dl2mrxokrFMKjAAxENFG7bOEvtk%2FMe1YNA%2Bm%2Bt4BkgZUo83gMtmHqbrifQDDxKnj5ZBl32MeUNEROsddBZWNbcJjTnhzl1jIKQXTFERaS01rWlb8VuiAoh4M5zgTT1zepE8s%2BHmhcBrHED8ctMlU52OMu5nvRn0NjH2o3Oja%2FcC%2BVOQyu%2BULOWS2uFfIzTmkwiLSgywY6pgHUsvg9F8w9hFa03qbnB38RTr7GOQV%2Fr7MK6stC4PbF1q7WEKuT4p%2Bb%2BzZWA2Jrp%2FLowTaoTBKdBimEq99TFWgQLPW5c6k5shWYwFl8LoXGyZayjEGA3HraciElzvYPO1gpXBFBzBhDvrJgtJvvB3nDHYT2vWcY9%2B8T3d0E890r5EiAISDkAwc4p8VuFxzgW%2FSWdANSbgTJZrLPrcRBVPoeWFpsdiUJ&X-Amz-Signature=7b31ae7863413e88851f52ce864f52d6a97d05b686cb7d5c7fc4a3b584ab977e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YOZIWNX3%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T230102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJIMEYCIQDC%2BF2Fwnrq%2Bj0h%2FXWd3T06rvuSxKMUxW%2BwKAu8%2FAxdVgIhAIQxNB4gW7Jm%2Byd6CIfjrxJLD8zW2LqSc%2FMdydoNKRpkKv8DCCgQABoMNjM3NDIzMTgzODA1IgzYCpZKJY085ru0KAEq3ANyvSHfovsm6KeMNhC3vHGQmopl0R%2Fn2ygWfbxtEvWksNJZFOWRWwOhI4TYr74m0RF9TPMrSDjh1s5xRwqZGm%2BaWU5HotlLHiGQd6tHFQ1l53LYpeHcXMWxYg359ABnA5REoPpLC8Gr8zvn6AoFapL8%2F%2BKaHQ%2FDzuPq2ld%2FK7MBOxiecA9K6zVFotjbAEtG2%2BPBhMSvOiRtgdBslB9kyg8ZA8GkslHnTt63VAf1N5h%2FPT1R1GpiRIXv%2BaA4lNDLilpOe%2BNxTBpVmGQflHyiRcpCD0tHhEoIvhOf6G%2FQUosCZ7aoajFe8SBOPUiTn9X2A5LHWLVWz9BoTcz2zxXAiwnxFU%2B93P%2Fz2XxhDJ1T47fbQEULVUVyhNLqGte5Wq1iacs1dmJjlXKSevNqBTIZ7pTjQiPCg9OjV0DroLEvUr%2BKX6erWPnd0sRlBYMXG0nEkO%2FqEQqr%2FHmHrA%2F%2FvwmDm6pKnfbaOvTNs1qWOBmLcI0KqIX%2BDNlPjRBOYC6AEazCmXcZcYxmpwnzkHBql7mkygB8%2BcUZUd%2BYr5QA5F79Y2%2Fu3XPwPm%2FXw95xCNvz%2FsfW4OtZ0QkFYpXB26JVQusg6xKn%2BbOyneVV%2BJ5drlREGdQFdTOYuMm%2B%2BoAA4OE6qTCetKDLBjqkAdCgfit%2Bdk7HNy18eXzQEu6WZ4BxTawVydtPFRaam3YN7ilE%2BYMTmE6C4RnIo0gvnPT3iGXZDim2aAr6%2FnKSsYRZ1YyGBPxwY7t4sJ9pM%2FiChl5DEgoO4C26Wmme4SXjcWVMo1Of%2Ben79f6LUDVgbxqv1tl4%2Fc%2F0eGBOv8p0mx8qeqbII87Jf4NjXQzRcyuP6doDjKD1JLsSbROHeUm%2BwitkcbYR&X-Amz-Signature=51f143df6e6a9ee17fc4b083f94aae4d6924f2b690a0b8666a60e0544a0e8ada&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

