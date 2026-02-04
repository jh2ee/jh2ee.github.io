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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666OTDI6JY%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T173506Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJIMEYCIQCkvNa7tCjNUo3dNAEQ3JXfV9ZFFcqnKEBB%2F8seRBTyeQIhAIV73CTWH61mZLsmMR%2BthTK2mDDi18WQa35KuFGWJ05BKv8DCBkQABoMNjM3NDIzMTgzODA1IgwCGSV3K%2BOFuiQ1W8Qq3APZgsFDr2Cqklmfwi71hYaCZhXjsbUOG8a31fTtWp%2BQFGkHMNgsqRvFDALS0KLESPzZadB21LwqJqRA77hsCxZcH0wB7JcAobdi%2FSWbukWbAS2rEc7lwINB6E8mriZ%2BChlTe%2Br9sHO1RXj3Nkp628DQXjTYfHtZ58LCbaKGrrDlAGBgMOcb6UctCw4kBFXjFpwBKpaFeg9zdy%2B2ayolNZMGcGZO1bojqwebUwW3IDr0T%2BfzT78Ak0w7GxwXzpn0hK1GEoFXfbQ5NwCdFeknyKkFufZDx%2FWmVMJC0XLAkhp66Tno6rhhkdPN6HWIyfL6dhFgdAkfZilow3lts1BFAcLM8kvCMQcMtXRkficwldzrHuJPrphlcZvSUqm%2BK4dlHWmW5fIYQ1N8XpLTfTX78502f%2FUeqGVSqmAfk7lIyCwTlH2DbBXOdPpKPKa43BWnUSDY6xG7I7atauZ60wSwq7cUmhr3bFd6jXEVasY12IcRnNBcd9P9XW4kJc3gETDDMBF%2B0SnPDoqjlGnqDjpTgX4yUVQN7XdPP%2FMClDPsZYt6jesgW4jSp8mrd9OCd4WVwC9QSsJGSZ%2FHtAgKwemh0vWWHLcz7oXduUuOJNG6g9L857bmLX%2Fw49ne%2BUtOdjCj4I3MBjqkAcM8r8ua%2Bl4KRCc3S%2BXLkdctErH%2FE5TBD1rxWVsfY3cLcG6MkwtyGyfqT%2B8%2FVHUWrisnFGY4BmW3JAJtifkxxKWmCJ9684XACiRCH%2F0t13rrTPuC92piCxObRoCOtFl6%2BB6PbLh%2BLv8LIPbQ1HU8zXv2VLq680ctnV4yXbPm46nfMkslb2txnvaFn6Zw39znYi3M8bT4A2AkWNDloNEkl3mv%2FAMN&X-Amz-Signature=b3d1f2b9db97f18198346811415c317b4aac2438c809e929f2609c354a49bd16&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666OTDI6JY%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T173506Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJIMEYCIQCkvNa7tCjNUo3dNAEQ3JXfV9ZFFcqnKEBB%2F8seRBTyeQIhAIV73CTWH61mZLsmMR%2BthTK2mDDi18WQa35KuFGWJ05BKv8DCBkQABoMNjM3NDIzMTgzODA1IgwCGSV3K%2BOFuiQ1W8Qq3APZgsFDr2Cqklmfwi71hYaCZhXjsbUOG8a31fTtWp%2BQFGkHMNgsqRvFDALS0KLESPzZadB21LwqJqRA77hsCxZcH0wB7JcAobdi%2FSWbukWbAS2rEc7lwINB6E8mriZ%2BChlTe%2Br9sHO1RXj3Nkp628DQXjTYfHtZ58LCbaKGrrDlAGBgMOcb6UctCw4kBFXjFpwBKpaFeg9zdy%2B2ayolNZMGcGZO1bojqwebUwW3IDr0T%2BfzT78Ak0w7GxwXzpn0hK1GEoFXfbQ5NwCdFeknyKkFufZDx%2FWmVMJC0XLAkhp66Tno6rhhkdPN6HWIyfL6dhFgdAkfZilow3lts1BFAcLM8kvCMQcMtXRkficwldzrHuJPrphlcZvSUqm%2BK4dlHWmW5fIYQ1N8XpLTfTX78502f%2FUeqGVSqmAfk7lIyCwTlH2DbBXOdPpKPKa43BWnUSDY6xG7I7atauZ60wSwq7cUmhr3bFd6jXEVasY12IcRnNBcd9P9XW4kJc3gETDDMBF%2B0SnPDoqjlGnqDjpTgX4yUVQN7XdPP%2FMClDPsZYt6jesgW4jSp8mrd9OCd4WVwC9QSsJGSZ%2FHtAgKwemh0vWWHLcz7oXduUuOJNG6g9L857bmLX%2Fw49ne%2BUtOdjCj4I3MBjqkAcM8r8ua%2Bl4KRCc3S%2BXLkdctErH%2FE5TBD1rxWVsfY3cLcG6MkwtyGyfqT%2B8%2FVHUWrisnFGY4BmW3JAJtifkxxKWmCJ9684XACiRCH%2F0t13rrTPuC92piCxObRoCOtFl6%2BB6PbLh%2BLv8LIPbQ1HU8zXv2VLq680ctnV4yXbPm46nfMkslb2txnvaFn6Zw39znYi3M8bT4A2AkWNDloNEkl3mv%2FAMN&X-Amz-Signature=b3d1f2b9db97f18198346811415c317b4aac2438c809e929f2609c354a49bd16&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QFC3WEI7%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T173507Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIAw7GktnwRQ%2BDl23cHviqgdDXEVTEiJdShGL%2FNiu2nIuAiEA%2BQhQebbUk0vKDfzp9LuCkD1%2Fi9%2FTGHMn%2B93XjsN3jv0q%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDH0Fvs2iUAMjZJcNBSrcA%2FvB4ORe3J3qGduSoelvBRxgdGvWStwnogtNFqfky%2Fx2ylErbGnOiwnad%2Fdn%2Bg%2FPeanseRfdK4XzY32HbtPBXObgzoouyqkW2snjRwPpmbxPeFMXD3JvXRpJt2GGQ3ppKtFhttmIVcEifaRBfDZklUlP1WH5ef%2BlYuD5isz%2F%2BuY0hwDWjUKd77RK2Ck7jaRRKFl4coQ5fUJNav8q234XqPhvJSZi13LYZj3AW2a1hdJUzA6klxgWK6BfktfawzvA4SYp%2FjUHxYTCt9oYPnkUSoSRo39rlSRRDBtVLk1S37%2BMgagS0clGpKAp%2ByC75O3Wq7ltZpMTWyX%2BNiXUgxeMQCSEnkS1U%2BOx3iRAVwPnlRb7Ru%2F8HnXzJ3TAM%2FkPV2FmxZIhwsCb3Cs85iAG6bB%2BFR6jPRCOuLrzX24wdws0gqXBkJdsZO%2FEQbUcAlf8a%2Bcr2TSZV%2F%2B7t0LW9zWuNhEPFeHOKBAfknYYetW7kBxKqYKfyI9sS%2FK9L3RGFEcK%2FcBHIvf407wmaboBJZ5dZagcdu8dPCCPRJfpR5mYAY6hb47HFU%2FuTV4VGEV%2BrWaz8NnkL8VNy5%2FC4YCcEdX6xEKJkx9wJTthUE1TWSjnzvwM6WLrTCgH8D9%2BewTwSYOWMODfjcwGOqUBRRuu7i6RSWXTIApoOr9OCcDu6fGLF1KTa26P%2FlBuralsJ8QV3K%2BcHRIuBnmalTLHHEhJAv86vuMhx%2FjC3eoVQkmJ2DVvPDb6GbnARVzBopfX%2Fzq151CV2hqNVqWK7lKWi1xMszeQdki9bZfksPDpIbzShK3rixzfst6UTLQEsTMx1uk9Xs9rTaPoHY2PvydFjRP6pPrU1265RgoUJDQTjsT%2FCpDI&X-Amz-Signature=b507ab6fc80faccb0728f103d3e43e20aefe19cd2d53ac0b0788c2d4b0d89062&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WB3TTN7D%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T173516Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJGMEQCIB3Q5HPR6PCEW2MKuhUgvBaya6Q18fOPDyMAf1FPZXyLAiAi6hwET11fABpzwz%2Fm1lKc4warxP98y1YwcLbCQToJNir%2FAwgbEAAaDDYzNzQyMzE4MzgwNSIMDZpcThf%2BRKQuHXnEKtwDA%2BXBNSZ2AiXF17dUbujEtdEkRWlVPRquGiUlD4hBegxE8nKsLaOwYRD1O09HqSHyIAnRaPK5QOHOhYITQRO%2FeYGqicRmGl9XTFSGmFlWYQtPEVHSUQJHXdAPwzALIrlsOCdIjWdkZTqBt%2BIHIDeYxaymsOZGYMX1eqvY0Jinh9FObbKnozyFr3o9IKU7%2F746ERQE6B3gFLJwrr61syz3iYQREdqqMPvGlW0cIL3EN4ng44neHrvOoYufVYNz%2BRT1B4oNasB2C7U6Et2cQpG3V41Yq%2Fbc4Viu26CIAL6VQNrGiCS80LxezHuOxDe5blq%2F%2FuwlNc6tU%2Feh2J6u4OnGxLbo6d8aUJaHLbGq7hD%2FBotnm2ngNB7iAYCqalcpU0Ddg3o0wQflmUJJQqZ2ogq3SPORO45XrRnMWw6q6fYBzH6pp%2BjdryT%2BRUpnQqeyfwccpP4NpfStS96dGT0ZEBcUDMuzBYCk%2BSsddMCEFeEuKnEqz8wjSZq9U9FqUzqw27SEgA9J6kEYUgBbh25M2czP5fJUSv24PhqJnUHzJ3%2Blv9CyOqmoitn3YcDyhWji0aYd6IA0lGjq1bJqrYSLnBD2VIMrM8U%2F9LL5fYl57dAVTfi5QYgnRpbONAiXG9swo4WOzAY6pgFLnZE5KO4pMa9HOF%2BAd18JoAHihPVflbDqRwSxF0W5VcRJsMm4AFaIYD0VNlY9zwqVzBdWMsk2vv2foEoFc%2FBiwAkcIe2JrrauSi5SWtjjl5sjK%2Bg5q6NKTL3%2FWXnILDaDSfNvMoTzmAOrXLunnGV7EkWeYgLvcrBIequijiL7gkA%2BCt0PywKZHdlkQFJIqC%2Bk%2Fhec2t9DeA5TO3NC99v2jrGsbN4W&X-Amz-Signature=16dd8917179a0fe321893595ec9fc9e17461e0f3f312ac483294044c15591516&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WB3TTN7D%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T173516Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJGMEQCIB3Q5HPR6PCEW2MKuhUgvBaya6Q18fOPDyMAf1FPZXyLAiAi6hwET11fABpzwz%2Fm1lKc4warxP98y1YwcLbCQToJNir%2FAwgbEAAaDDYzNzQyMzE4MzgwNSIMDZpcThf%2BRKQuHXnEKtwDA%2BXBNSZ2AiXF17dUbujEtdEkRWlVPRquGiUlD4hBegxE8nKsLaOwYRD1O09HqSHyIAnRaPK5QOHOhYITQRO%2FeYGqicRmGl9XTFSGmFlWYQtPEVHSUQJHXdAPwzALIrlsOCdIjWdkZTqBt%2BIHIDeYxaymsOZGYMX1eqvY0Jinh9FObbKnozyFr3o9IKU7%2F746ERQE6B3gFLJwrr61syz3iYQREdqqMPvGlW0cIL3EN4ng44neHrvOoYufVYNz%2BRT1B4oNasB2C7U6Et2cQpG3V41Yq%2Fbc4Viu26CIAL6VQNrGiCS80LxezHuOxDe5blq%2F%2FuwlNc6tU%2Feh2J6u4OnGxLbo6d8aUJaHLbGq7hD%2FBotnm2ngNB7iAYCqalcpU0Ddg3o0wQflmUJJQqZ2ogq3SPORO45XrRnMWw6q6fYBzH6pp%2BjdryT%2BRUpnQqeyfwccpP4NpfStS96dGT0ZEBcUDMuzBYCk%2BSsddMCEFeEuKnEqz8wjSZq9U9FqUzqw27SEgA9J6kEYUgBbh25M2czP5fJUSv24PhqJnUHzJ3%2Blv9CyOqmoitn3YcDyhWji0aYd6IA0lGjq1bJqrYSLnBD2VIMrM8U%2F9LL5fYl57dAVTfi5QYgnRpbONAiXG9swo4WOzAY6pgFLnZE5KO4pMa9HOF%2BAd18JoAHihPVflbDqRwSxF0W5VcRJsMm4AFaIYD0VNlY9zwqVzBdWMsk2vv2foEoFc%2FBiwAkcIe2JrrauSi5SWtjjl5sjK%2Bg5q6NKTL3%2FWXnILDaDSfNvMoTzmAOrXLunnGV7EkWeYgLvcrBIequijiL7gkA%2BCt0PywKZHdlkQFJIqC%2Bk%2Fhec2t9DeA5TO3NC99v2jrGsbN4W&X-Amz-Signature=1b422d839a3a5f70e03f48a60dad2484f0e5f175d3fdcc116e62137c805a54cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T7BXHFC5%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T173520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJGMEQCIE0Z%2BZoSVApP5GCbq9awj0HEWO%2B9Tr4VEyzpDceoQ9QEAiBQFEVCe9khS9p5fb5K0tDpRJgWjKf8zU2D9uBmgtjdkSr%2FAwgZEAAaDDYzNzQyMzE4MzgwNSIMin31yluWHz0Mafa5KtwDkkD%2BtTSRDigC2WVZXhItHobuyqC%2B5HCfT%2FNwDixJmEjtZ8WnjgoIx%2Fe2o2Bd8sq%2F9VV55j%2B8lKJ6aCj3NP%2F6g3SJYcWwsKnAAshGtu1VdgecoejagelRaOq7ofZnbip4zmm6JrZEDY7KsNT8OGnpGGmNT2nl6BN5yLDIcNfoe7cSa0XEJP1MmlAdibKGY8LJBdHutTSMjYBQSLC6wNU7vuRnjlIBahmXFThA8bYm6lQk9P%2BqY5Gc4AXHBhkBmTFJb%2Bx4HlZq8m8Wxp6qCl2MYI4GVqaspIHQvZTi1pWOkkrvjQ7k6dKJ1dDrVzGr%2FC5K1ry7s7kwMAmPNb38TNGlog6Kd9fCR5HBQENgKFyyc6a5NK%2BBj%2FgxTRQeKyyoL5rwDSweRCgxsCGl8ChDLXxALi%2BrJxAAovTajHfCz%2BzfvIERJM9R6lhXv2i8Ge4usv5GpD9zR4Vn7qyp5dgxP%2FiJCAYeyBaFHQJfHkhSBy0j47mMOaDuXYVL6ZpTP1%2Fw1GFE6tNQCOu1V2iQ%2FGbGa1lm59WYjHb%2Fo%2BC9EmCZAaAqP%2FdpuPeclb17G3EyM1RhVkCW023h6P2jowFrSVCKVKwVZxIzGQoVzJrLQgW39TZnH7Y5MtX1CoN5ZHH8VJgwht%2BNzAY6pgFsDjrLma38fWa8zEBtZVJfSPR4MTHoLJJvkkbiMQBehIOjtaL4Jg1AVhvkFTKnkWNrWN6sxb1zkpCKMYNnpPrfNQn%2Be8k1ni9Rwnd9%2Fduzj0Y0ZLS37lJn44%2FuwCDyUX8QpsI5I5PtUcN4JvguXHRIS0rQiQEkJ3D9BmK4zdxAn8M0dqcRcdFnfPSZQUi6Z8HfGT2sx7iID23LcqnkxPBXlmKRJpIO&X-Amz-Signature=2d4df4bfc857e4bb8c901334def047f1977e9932b7154e41c8c13f4868b197f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ZYVM4OK%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T173521Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJGMEQCIGtzLk1AaAKETddbLVD%2Bx2IsaNoDm%2BmSZrEzTH%2BgKzu6AiAgRgRyIsIco2urODziP7v3uyRzbmc2shJ%2FfdxKfQq9Jyr%2FAwgZEAAaDDYzNzQyMzE4MzgwNSIMz5KOFNf%2FG2vUGbpzKtwDf%2FHNwvKr84iKm9yoEYjwuuH7PuxvSnNh9eO0JdVxVzuo1C9MxpJMzFZQBrZi0vYwa5hSL%2FuzAne0K7mz0ECQMnqbpEUwd3F9DdnP%2BiyXJFhSCvUbznXQYBA4YTQWWQKyF6XBfAHhzyGKby83J%2BrWKDb8DSvIHtXF5Gcl2Mbo1F%2F9%2BnedkET%2BB%2FLBxZrq937OnwrfPG13bgAzQ8NRJvKqklAycT%2FNTye1KwNk58cJuz%2BDENUhDoE6MiJ36sbMUmjZuwy3BqQS9%2FbfVq9L0mZSuSn6PzuB6zfgwYadtmXNoWlqPB72fq5rdeq8UTm1DvR77bgWnyKf%2B%2F7xgazjxuOAHNio00DtDdBj6aMoeCE0LApBBDG9hLr%2BOr1ZAiNvfKREmKMb%2Be3cKOgzE4WAZvp8At7WxTTrL4MveRF%2BYna0kHWDj2h9hdcH%2BMfuKzKjzIhfZYp8I3o2a9lchGaeYFRTAfvC8jldRWln8n80ZWiKKjJzuoiJDlyz%2BiNnWpt9jfnpY5GyQ7DUfc%2BdwVz0LXDp1fSRE1bHMr9RD%2FwGuoylWewVwCLCOyxw3jsM4S9Reu%2B2NVL8DaX%2BftQPGJYaORAKsAacR%2BBVd3IHe7AHeY51dxY0nSCAf5t73oHaPZQw79%2BNzAY6pgHe98iz%2F%2FAG9sk3Ni8aRDL7JgIsR0frA7NyZIIavCxuuzdB9v3O1atPYOS3ynUhc%2FcE38UZ3YgI6Zy4YTJD%2BECempVzPRDISCz1H7fx%2BWNDwIuDg%2BKjw3zqAflwii3fH%2BbMXg8SoMaVGaV5B9ij4JFticOv1xeK8h7dZhOFIMm82kIGRzDoBFSIxyU6tPpuHAsNp0BTMABYQSMigtmOnINa4yGm1Qzf&X-Amz-Signature=8bd46d26bfba30703d5041ee9540bb8d0fb2d9be136c29f6d54fe1c0ef5c431b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNRU4OKI%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T173521Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJIMEYCIQCzM7Y7%2BEyE2LhH6x5yotf5thK5LiQ60vwkhcZPQukbeQIhAMDGlALwLj7xQl%2BRbekciNdaLJnQvW%2B4dFHadZ82A4pdKv8DCBkQABoMNjM3NDIzMTgzODA1Igx7yMgpWRxQM5L9enIq3AP%2Fln72rVrVG4TdkvO0QgWoFnI8jFxZDuvATaTOHegw%2BO0A1n1F8BbbvxHgJZ%2BUPHTUKCxgVY6Pkf9CYn4zpkUa5V7ncOgCYfI62ry54G%2B1ELHYaio5CdKAIbA7PrZbmk3NMSGE2lJiDX2zcnVCuba5cXAK3P9kz85kCzDjQfi%2F7F1VXe2fZQhPDZNOihyRFKNH190dlwJT0ZE49HgHp4o%2BHHqhMyc1V7ttH5yB55lyCqQYrjuI1kJsgXyoMDz0X8pglRIdWNe3PZbKOYAnaRsPFihoSsyYO2DgXJAo7vUB2ZnTAOf8ad9E9s9BZPpBTBH6pzQQVq64eMmq1VJTHu4CM6xlBmNRSO368yMT08RWXzAdGmbqG26x6BJBt3aukwR0zM0aswds630GNzGYLHczBHS8xFIJvxoSRh7ihehqjeHPv9T8FIuwfsUOAdVrOcqNIetiY4mJbQgrJ%2BXlqfqei17pClw63ApVKN8TQMimgKix%2F0bOERzSVOf2faGZFQU7Rh0hDuODUR5SlPG9ijVs4Ent5FUS%2FCTUpot1olCd%2FfdBswOv39HV9MJEJtD7wMJqinDCeB2JTNVgXf2SAQv2%2Bc7vyJIwthArUepUU8sOrFAQHFeq%2F%2BafN2sjHDDQ343MBjqkAQ47UxU9q5P7Z1DWQjomx0pK4FMc%2BlzH%2BYj1ILtEdU4ACnTqygG%2FPgHvHMcDJ5CKtRpXqhAFjV%2F5wPLqLEKZKDyqposglxebgfhvIN1tVvgtBJFSkdxfoeVhZivfmvy4HzI2n%2B5OTubOsrpYFylr0%2BqNdIhBIvVKXpxYwyb2NloALFQKOCZnbs7kkGXSXW2pZqTdmvovY8MHiannAzYLGfoXOFtA&X-Amz-Signature=8d8dc860d3a0938d3a544dd91cb5567df970bb3fadf248bc697629a7b69e1d07&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZTQZXAA%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T173524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIQDJW4i6gP%2BW5nCf5R6Gv%2BAokG9wbM0YsbXP3XhQd9ZI7gIgfyylDWA9R844sxkpL6%2B%2FLGgR7LQFpeZuutP3sBdszIEq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDDu2Rp1XIKe8QlyksyrcAwUVoMtKirlcY0pLV0f0p1ZfiwExGMk1ubqomdbVAI%2BE%2B7ktfLdgWajP45z5ytEINUX71mS9Y00%2Fmf5JakfysOJMt8IdX2HR0%2FlbVVtBcS9iBFSTasI4VINHVC42ZgW9J%2F57%2BpmfnuSXfp%2BTzyhQ3IhwNPNDcCBchdsLn6cXe3GShkdGGw5oLzPwwsH6KJqdQLV4fWa6XqdU3eYtHsB1wzQZKTb%2BUI%2FcxzhtJurFE5tVMMCIqVxq09VJ%2BmDK73GMiKclc1w2YEug2o7dS2ecYsqeL0LW8oo6xTzJxrCjxxBTv4pKYJG%2FHu1X9PR212ZPVW%2F34YkNrFUrrIQW55DJDaeN%2Fie1ftK4kspxB766U2cX6ZgLAQmbz5Tr9HJpZ6qObjHbInuPZjE0LHTviazpFn6qSPuXc4XrKeJ1yrCwNbOO2Ai8gXDlVU4kS9aEZ%2FZ%2FAfNsUU%2F8ZqxNdjg7sSD6%2FYUEjQunt9g%2FelUv38oQQHeuGYFK%2FLbiM4T5LG%2B2tte4m7RXN9iyS87LtUxzorgnqQwjf4vUeT7JWD9W5%2BOpma%2BlQWzcfKWZyOPP0bDzdZvrvJJEZVfzLO%2FbXwKThrc%2F9p%2Fi7JS1rzh8yKu6m5NUc8skKxYCsuHZyyXRhsdHMIDfjcwGOqUBIPYm%2B%2FP07zZRB3Epjr1cNFIaJmLzPBGU2r9%2FumHiqoCSFqT2QiDKMWLS7ffCVus1O3pUmEBUEFm0ArD51IgoDjI4B2HsjJAPYR86S%2F5FPiT8twNfrgoAyQewUbwe%2FnI3Md1g11y9oBkH3dj6IWx%2BekCJ8cD2QxuzkxVEZB4%2BLXEok13ttBoUk%2Fx6FaRN4iFW29VRbe%2Bi%2FkyvYzyMf6B%2FS43OKBw4&X-Amz-Signature=05837cceefe119b2a7e677c4a170b68afbadb412503c99ceae2d6ac5ea3345b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZTQZXAA%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T173524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJHMEUCIQDJW4i6gP%2BW5nCf5R6Gv%2BAokG9wbM0YsbXP3XhQd9ZI7gIgfyylDWA9R844sxkpL6%2B%2FLGgR7LQFpeZuutP3sBdszIEq%2FwMIGRAAGgw2Mzc0MjMxODM4MDUiDDu2Rp1XIKe8QlyksyrcAwUVoMtKirlcY0pLV0f0p1ZfiwExGMk1ubqomdbVAI%2BE%2B7ktfLdgWajP45z5ytEINUX71mS9Y00%2Fmf5JakfysOJMt8IdX2HR0%2FlbVVtBcS9iBFSTasI4VINHVC42ZgW9J%2F57%2BpmfnuSXfp%2BTzyhQ3IhwNPNDcCBchdsLn6cXe3GShkdGGw5oLzPwwsH6KJqdQLV4fWa6XqdU3eYtHsB1wzQZKTb%2BUI%2FcxzhtJurFE5tVMMCIqVxq09VJ%2BmDK73GMiKclc1w2YEug2o7dS2ecYsqeL0LW8oo6xTzJxrCjxxBTv4pKYJG%2FHu1X9PR212ZPVW%2F34YkNrFUrrIQW55DJDaeN%2Fie1ftK4kspxB766U2cX6ZgLAQmbz5Tr9HJpZ6qObjHbInuPZjE0LHTviazpFn6qSPuXc4XrKeJ1yrCwNbOO2Ai8gXDlVU4kS9aEZ%2FZ%2FAfNsUU%2F8ZqxNdjg7sSD6%2FYUEjQunt9g%2FelUv38oQQHeuGYFK%2FLbiM4T5LG%2B2tte4m7RXN9iyS87LtUxzorgnqQwjf4vUeT7JWD9W5%2BOpma%2BlQWzcfKWZyOPP0bDzdZvrvJJEZVfzLO%2FbXwKThrc%2F9p%2Fi7JS1rzh8yKu6m5NUc8skKxYCsuHZyyXRhsdHMIDfjcwGOqUBIPYm%2B%2FP07zZRB3Epjr1cNFIaJmLzPBGU2r9%2FumHiqoCSFqT2QiDKMWLS7ffCVus1O3pUmEBUEFm0ArD51IgoDjI4B2HsjJAPYR86S%2F5FPiT8twNfrgoAyQewUbwe%2FnI3Md1g11y9oBkH3dj6IWx%2BekCJ8cD2QxuzkxVEZB4%2BLXEok13ttBoUk%2Fx6FaRN4iFW29VRbe%2Bi%2FkyvYzyMf6B%2FS43OKBw4&X-Amz-Signature=2f3940c47a6e382ee02c41015d44a916ac6355060c2d9c2fe77441cb6b8f731b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YE4XZRPU%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T173502Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJGMEQCH28t86KAFwiZGxJ0imLpd6sFgYKpTDlc4IXrXXPOgJUCIQCq2B%2Fl6zC26WiwBBdjTC1s3upQOMqqBz8%2Baof%2FrF%2FQKyr%2FAwgZEAAaDDYzNzQyMzE4MzgwNSIMo0PqUYWyb7sBxLg%2BKtwDMsq%2BGYmyaqBBnz2VUxVYyL4rlF08h8N8PaZsp5n163aJu7vVXEzitImYvr86EW9dGHUjGKcGoGRjLAafynHRpEoFaBKo2TAZhZapDQRaxKmcKF%2FHZkFKBTfZ%2FQKpJCJ8focNEFLKApVqzboVUXotpLgbp%2BCzKYP21Pu9hVwzK1UWIg%2BppP9Apxt0yGSTL7uemmzagUDv5Hf3vdBsF6Ol4pHB1XduxXHUxR4JLmewxUGfSJI7TFacOLHdH%2BpW%2FfwbzNVIFCvqqMd3sxUVysPGKVYEixmMEV3glC743OLcZVMX6Ac60H6cXZFus4HNwrUWZNoyKYu%2BOaVpdCzXbpdnYcS%2FZPRGKFF0l%2F4GerJs5ht124fq7DP%2FGZpTTg4a1sxgfVnkHrcO68s6OD4uOIVBDqpb78K9dLb%2FhrvUq890Rdf6mw%2FAkuub4QyYHA1T785BdiIzURiU6vu41tQEDY%2BLzAaVzM%2BXvKRHEgfEeMqMq8NzHMZmkLuW9QCCm%2BZRsENalYQgQyjz8uFlpmUfLCfq5Tg4F4rkkE90xUYesH1n0UlZnFYR%2Bv36zPXeZTMZ%2Bb%2Ba42RZSYm7NF2T5WrFNlqd6c71WTXL7F7%2BAoD3AZ%2BA%2FP82EI8QrOr3DTjzo94wtd%2BNzAY6pgEWCDTAB3KdVc8vxC7I8moFM1wSgDCPIrkxHfviBN3N3ikbICi45vsERl4IBRZTA9e%2FMbia63bPCjl%2B5TJDM6%2BNiBEQEytOrCf8RSok4jA8TX30Q5v3hqMZVkRkkh4jiXlprxJL4uG6egWNn8HxhKii%2B4ycHPEbS4qqDlWmfGE29SPl8uZG7OAihZH0OhlOxRU5SSKw3vyGPWXEn60%2BDAXmbD9hVHL6&X-Amz-Signature=7afa7d92a413b9c57b6b51a6c94ef2d9b04688a39e01a1eaf6cd88f4cd57a01d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666WDW3RJR%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T173525Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJIMEYCIQDG2bEPpyTrkjH8%2FAVGgRu7jS48f1E2KOw%2F8BeJqYBI3wIhAPF27TqxVYtt%2Fjq0XZj7Qk2p2mSFjXctD4kDERTJfU%2FAKv8DCBsQABoMNjM3NDIzMTgzODA1Igz7%2Bec1c%2FnRxl%2BkaE8q3ANRB5HcA7VyuL%2FL7c1LWdHfNdjoKQSU9SppwaDQcuprjK2TwDPFWz84VwlnnQAfHGKUJsTlDXIIdotUjIBucL82XlwGl7UT%2F3FwwGcsZSV5r9ESI3fvKXEBmtPbR%2FRWZs2PTe2xFEZAOO3gtAsPLnjUON1Krs3w5z%2BvcqNG0lEUkdQhxwuhmXPzt%2Fcwr5kLBzIU0cdS6WD%2BRqbaVxY9wIf4KPdqLATpjqySlVj3IShZKoMKDC4enOAbcJoAQmZpaviwsiaKubZ7d%2FcaJU%2FhK6jR4OnE%2BayK2yu0ZJozn2ET8fQbLZkQkBV6c8cWcxcdPczHYJ9waHbdXF1Epptf%2F0a2N0CMA7Chss%2BTVfc4gk0fJxYFJ2H1kdaz1ah5AKqO2sd%2F2Gh0pHmrOdzEUD3lmFH7qvBnPXxjj42zusp88G%2BFQSA3cIjZDewMQ38wdz28PTb53ovS2b8Cjguf8keIVmscdEBVUiHTzoY5duIYlUnGg%2FxO%2FX9sMvRDsg1MVVLBCr%2FZL5kkmWclQdx2802olwCEnZ7CE%2FNS49AQVGsswwInZcA8tpc3s4pOag6QkRmAYun6Onleh%2FEdc9erjkb7OvlS8toRTVqB3JTbdoNvlZDABiz873R3gJySCJbFNjC2hY7MBjqkAeikUj8SUjquM6oYXMSE2omd0CpNpwTfxUAKAuYC4zzfSThWe0G%2FQfv3WNmRPAxLDmiL0NOBYhJ7PY%2FGZZ641bU%2FDLaZVn8uuNEBAU4IhFkGVsqt6MJIagl%2FCJp2OZkEeFgeQ5BifmwZWFEWzjxNb%2Bz6RKDYX8q3R9IkF7Wvbq5kTwEnHkLvtwcv3XHwLdjJ9DqDP47pTTMeX2RuUD47gtgEmY7q&X-Amz-Signature=cce2d32a6e8aae680bde05057fe1ce449a52c4d663963e0b07b28786ce9f9068&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666WDW3RJR%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T173525Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJIMEYCIQDG2bEPpyTrkjH8%2FAVGgRu7jS48f1E2KOw%2F8BeJqYBI3wIhAPF27TqxVYtt%2Fjq0XZj7Qk2p2mSFjXctD4kDERTJfU%2FAKv8DCBsQABoMNjM3NDIzMTgzODA1Igz7%2Bec1c%2FnRxl%2BkaE8q3ANRB5HcA7VyuL%2FL7c1LWdHfNdjoKQSU9SppwaDQcuprjK2TwDPFWz84VwlnnQAfHGKUJsTlDXIIdotUjIBucL82XlwGl7UT%2F3FwwGcsZSV5r9ESI3fvKXEBmtPbR%2FRWZs2PTe2xFEZAOO3gtAsPLnjUON1Krs3w5z%2BvcqNG0lEUkdQhxwuhmXPzt%2Fcwr5kLBzIU0cdS6WD%2BRqbaVxY9wIf4KPdqLATpjqySlVj3IShZKoMKDC4enOAbcJoAQmZpaviwsiaKubZ7d%2FcaJU%2FhK6jR4OnE%2BayK2yu0ZJozn2ET8fQbLZkQkBV6c8cWcxcdPczHYJ9waHbdXF1Epptf%2F0a2N0CMA7Chss%2BTVfc4gk0fJxYFJ2H1kdaz1ah5AKqO2sd%2F2Gh0pHmrOdzEUD3lmFH7qvBnPXxjj42zusp88G%2BFQSA3cIjZDewMQ38wdz28PTb53ovS2b8Cjguf8keIVmscdEBVUiHTzoY5duIYlUnGg%2FxO%2FX9sMvRDsg1MVVLBCr%2FZL5kkmWclQdx2802olwCEnZ7CE%2FNS49AQVGsswwInZcA8tpc3s4pOag6QkRmAYun6Onleh%2FEdc9erjkb7OvlS8toRTVqB3JTbdoNvlZDABiz873R3gJySCJbFNjC2hY7MBjqkAeikUj8SUjquM6oYXMSE2omd0CpNpwTfxUAKAuYC4zzfSThWe0G%2FQfv3WNmRPAxLDmiL0NOBYhJ7PY%2FGZZ641bU%2FDLaZVn8uuNEBAU4IhFkGVsqt6MJIagl%2FCJp2OZkEeFgeQ5BifmwZWFEWzjxNb%2Bz6RKDYX8q3R9IkF7Wvbq5kTwEnHkLvtwcv3XHwLdjJ9DqDP47pTTMeX2RuUD47gtgEmY7q&X-Amz-Signature=cce2d32a6e8aae680bde05057fe1ce449a52c4d663963e0b07b28786ce9f9068&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VA6EL2LI%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T173527Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJIMEYCIQDJCeUtFGGOV4%2Fu0gcsRuIJPktEq9lIXAopts2HGfUTIAIhAN22fAU65QXIXPQV4NrLAcHvDGihi%2B0rdM06gLbsPDPsKv8DCBkQABoMNjM3NDIzMTgzODA1IgyHiQ3ZI7q97WWZtHcq3AMnjva3GfhSH8WUTOaAeHh2gcwQNBS92%2BwcdlwWfGs6xpcekra%2Bj%2BJN%2B%2BhxMosNOSIYIKTHDdE%2BbwQ0m65bTiKnBkVf49lMdu1oGIq2HzLHa3pLihCFP1VBCLu%2Bdu7rrhMd2Xs92MWHZo2gXikgdAJx7K2v6ngLkRhgSwCDqajH6lM2f7OGD62dTc9SCvIdKQnGjimBBp1rDovoGVNm3Yp18mjW4GHFSeWD8LZEjoo7XIuAjvubTm%2BZwfeDD7HPnB79FKiIqHzQJLLrmL2JYVf4yIkMwF5R4vx4ngu%2BaKcXzyH30M9MW66VccCkUcwRDn8QRX6kYGAMHcEA7PwpVlB1r8JDkEk%2B6LmZAeG3RuKxX7BOc4C4MZlRGMu0zcHPsDUsgIGZ0tAqVb4nn8qsraWT0FLHojTcAidQP5sm89EfGF8SMEfoNOFnYu%2FbpQBvK%2FhW7Iu9p7L3AMxZGoHa4%2BHYVEmjBvciMHZMLqLz89mtIYnVHd9Z81Rs0JltKUkFgW8HQeCofqnhgWEDOG2nHf8rWWqjx6Tgt8tQsnrFuEGB7YCsX87ycbsFKFmbzd%2F8jr7AaPqQHoghUsNU9sbarQqcMSmDM31JIxweXcv9A%2F5Hk8kSPaBCzEhtGRoSHzCJ343MBjqkASkj007vJQUdPR1jG9riSdnUeuQ%2FyGy%2FQK9K0V9IMO8lAURuoo7x7vpzhejZIyejbBCsC3er%2BxyqF%2BLDKcoK9%2FXbV6Ju6wnCcdDgFe635RjGVZii08Qn7dDHMZLLA61ZwC8Iz1IblHuSJcZAufH3om07rVvDwdDk4ybv6gy%2BkvsQuW1VqbmpVGEH3e51myAzPF3E9Kx5Mmb1MvyiXP1GRVErP4Vs&X-Amz-Signature=107286f55248aaf150db1961be44845b1272510dc38bff8c5beaa56fbd672329&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

