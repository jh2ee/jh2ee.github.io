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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663OUI4W6C%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T234034Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJIMEYCIQCNpnTy%2FwVUcFQaZstpgCZUMTv1nxObNFXgD7xNdtHumQIhAIheXdXnFmXb0YxRC7mGIsGac7TsduEz8rMeKI0jGuzjKv8DCAAQABoMNjM3NDIzMTgzODA1IgxiuSyx2eQ1B4BUbNQq3APWlgqwr27bdS7Lq8viCD2g9j1Afi1lYeRlTAJi0%2BhYJRYDxWyrzEJRQjKeGHuY21QCqXGWX6ulKRMQwHDzRaMD5m%2BvJNNuDfN%2BAkROaZs2%2BoYLj2P1sw1xmt6S6ZK2RYOMjw5jmSvhmJOXhBjEQAXyalvu%2F5J6waUgU8i3n6ZIZapv4AJIbbOiUvHYHU4X6%2FlCCUoHE322UGqvRGI9R4hRA9vG7gehdX6%2Fy5cgdJvLR1cQkOfxDV7XKTRSrOU9x7zYtCgdYcpsul0sUFkXFv%2B31uXO1HXrvVKSt6EbjIYpyuczYjITKoPI04cZ%2B%2FWJEh0tFkKyKgsq403XMfUCDnyR7vBzPLVxyWR65S91Rg7moTL%2F4GGDtUeENyx19hkZLF7XAstDNiLvzStBzqpIlOULlNRup6TbU%2Bwdx3N0mmbEAnaDRM9uYCwG99tA9Nfbrmb7Bginjg7sPXclOuGu7nxFThY0bXM%2FSTGvGAkFIhCJ79pdnqWMqdZm2FrAg%2Fh1NDb4mBZOxODBauI5wvY58jiFYdne5x8F3N0f5bpBkM1FjtqeSAdRxPr7BV%2Bwd5ehmOH7Rt1acAPltrdVp7Nq5v1O4LtgZz2Ccvz4QOTdkLV5Y%2Bs%2FUhZyFriAb3vyQjC1msrPBjqkAasyjWX%2BB3m%2B%2B63gCAWqBfirXLM3fCLKH%2BivLfhaTdWKbeuCHWQ5rYgwsBQ1TK2AaEnz9NpUqIJe8tNN7DkC7nL9KiiVoGyxTDitHAatkDV42g8OeXfzvLo5L41fKDTvhy98IC9JyigQ8q2UujNQQhp%2BY2AEaQ%2FiMh9vay9TMSBgItuL1uyS69ReRcNkAKMBWRc%2B%2BzmveeMQ98Pt8R98qbIhWjYM&X-Amz-Signature=98d0fa805e04e99c10752f6b498d9c615c54be9ce348eea109ddb42a04c2cf86&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663OUI4W6C%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T234034Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJIMEYCIQCNpnTy%2FwVUcFQaZstpgCZUMTv1nxObNFXgD7xNdtHumQIhAIheXdXnFmXb0YxRC7mGIsGac7TsduEz8rMeKI0jGuzjKv8DCAAQABoMNjM3NDIzMTgzODA1IgxiuSyx2eQ1B4BUbNQq3APWlgqwr27bdS7Lq8viCD2g9j1Afi1lYeRlTAJi0%2BhYJRYDxWyrzEJRQjKeGHuY21QCqXGWX6ulKRMQwHDzRaMD5m%2BvJNNuDfN%2BAkROaZs2%2BoYLj2P1sw1xmt6S6ZK2RYOMjw5jmSvhmJOXhBjEQAXyalvu%2F5J6waUgU8i3n6ZIZapv4AJIbbOiUvHYHU4X6%2FlCCUoHE322UGqvRGI9R4hRA9vG7gehdX6%2Fy5cgdJvLR1cQkOfxDV7XKTRSrOU9x7zYtCgdYcpsul0sUFkXFv%2B31uXO1HXrvVKSt6EbjIYpyuczYjITKoPI04cZ%2B%2FWJEh0tFkKyKgsq403XMfUCDnyR7vBzPLVxyWR65S91Rg7moTL%2F4GGDtUeENyx19hkZLF7XAstDNiLvzStBzqpIlOULlNRup6TbU%2Bwdx3N0mmbEAnaDRM9uYCwG99tA9Nfbrmb7Bginjg7sPXclOuGu7nxFThY0bXM%2FSTGvGAkFIhCJ79pdnqWMqdZm2FrAg%2Fh1NDb4mBZOxODBauI5wvY58jiFYdne5x8F3N0f5bpBkM1FjtqeSAdRxPr7BV%2Bwd5ehmOH7Rt1acAPltrdVp7Nq5v1O4LtgZz2Ccvz4QOTdkLV5Y%2Bs%2FUhZyFriAb3vyQjC1msrPBjqkAasyjWX%2BB3m%2B%2B63gCAWqBfirXLM3fCLKH%2BivLfhaTdWKbeuCHWQ5rYgwsBQ1TK2AaEnz9NpUqIJe8tNN7DkC7nL9KiiVoGyxTDitHAatkDV42g8OeXfzvLo5L41fKDTvhy98IC9JyigQ8q2UujNQQhp%2BY2AEaQ%2FiMh9vay9TMSBgItuL1uyS69ReRcNkAKMBWRc%2B%2BzmveeMQ98Pt8R98qbIhWjYM&X-Amz-Signature=98d0fa805e04e99c10752f6b498d9c615c54be9ce348eea109ddb42a04c2cf86&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663JH7TEXY%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T234034Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIBPwgk7p4ZIGUUBxEjkGjKlWknHY8q9r58P9cA81OFwuAiEA%2Fw5tUYo9kSvFNixEvgyYrLoRhFLRzC23uoiAzxMgtzYq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDDQp87B4A%2BoV0VXk2yrcA%2BZSkRUTqwfQMPW%2BkKgWop%2BfsAZAT%2FbG%2BIkDi5XE1v2TFy2IsmHMZuSDH6Pf%2Be%2FtsFz%2FwCb9AkLhHR29RU%2BFdhgZq0o15zm4GnTiUVR28maBoojdU2cOwPd85kF5u8a3RdMIp0KiI%2BVRl9C9O2P07vB5mldmWCj8su0rWT1pSHcke9sghGo9D%2FW8jf59FQ0aP47UF7uCs4blAECCihmIKD%2BWBcc4vBAsYDDA6yrBfayqdE2Uav89L3GVH45FIjaXDd63etgdb8QgZnb98uRU9l5OyGXTIvuaJWsHHgY6Np2pMmgd5EeYwFYdojHY%2FEEB2IAHG%2FCrNnXC5mBzWdw9qC3zxE%2B281CStXYcDUk9irarQXZwXUpOZqO0hXLiAEoYBK%2FL%2FaKfEKBnyWKnurW9GbZPrUoTKFkmHmG9WOc0mWnhitbfbnuLjs68UAjbjVZ%2BvmjLdNz5E9ESyvcgE7sqrXVRUj3P0F6gOu565DQwuSF2wLpFBQ0bQ2lBl0mMc%2F9qoB8lIB%2Flbm7TyiFKbS1I2BkO1xLq14C8Qpz4ofc3ATjwTJM3wk275yywI19i50RkYhulvo2px39CWFxVKJ3bIxPH1CyKN5gg3mgNR3MiXUf1jgE96pDiWHibGA%2FFMNiYys8GOqUB6Jg9OulI3oBzZA6zTVFeGdVkArWZXZHJpe9ni4XC%2BoDBmerwhOvGDBTkx3QAXC2vw%2FbQ6SiDXZiYNPBqNd%2FyoxJGs6Kr0BqHKNCyCXYJFqctZ2ZZpIt5dK1YWxACSHGXWD%2BXTUyuq0vSc36ewSe2nzYSHYtTXqqOHsgA90MapUTqfiDQvHRRioIXYvv3qgDu80%2FkxI%2FCjjWkbIWVg%2FGQNeRtI7qG&X-Amz-Signature=e68df20a3b7217e6c63ac673ccf9e971d1bee491cef9faecec6c8dbe00c239da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XFQFERCA%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T234035Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJGMEQCIHfhSAxYECY5eQIwM1UaRelWT%2F8YClq7U8447aNKAmc0AiBGjUv6VS2ve8J7DzUu1vD9mFYQcOi7VAPTwQr3B%2Fo3ESr%2FAwgAEAAaDDYzNzQyMzE4MzgwNSIMJgo2I7faTniVliaiKtwDR6wcenxZnE%2FEJVjl%2F747stdpeHUWZyMDIm6OwHlXpqDqDWc49DV4WBQokDuW6oOeJO9%2F9Yx%2BS1Y6%2BUtoRR775OzOiII0tDFTphMHPe2S4u3KhKTjlxacoroahI4uuFnT1Uh73sBSfLpVSgQ5FtN4Yx0F1PjK8rFD3nEOs75Jkj55yMa0FLrijPn4i4nETZJtwu24M5AY%2BHercUQHe39CsCKxI3KRuKErmkIBPALr7T%2BtcTYztQ8uFM0JbB6fXeVHGE9DlBngiXEy6IZVJbdRjJwVxYowgP0D4CdELS11zjM8GpKjNsUThb1EZRRpr4ZyO5IIgJOQhitwYW87pqxZd8DTEzDV6fWwzgKIx6IP1mZFH4dfe79JTHaudKvkXyrqmT6XsbElveivmrSgXnaCMcGRSsgHqrD07WmoxKcpwcJ80kDx2IT0hV%2FTqzo4WVSyC0nD8Pk%2B2QGgYQWQoovoFeBWw3xKAEcndj%2BWfcZTEeljrfI2CeopiUVEXgkBkrr9VlCFdSpKyYM%2Fak%2BsceIx1wD2F6QypL2ND9HKgrsRwLNCzAgHu031bFoW%2FnyKqkYxpJ1McyIHlFyaPZFO%2FhBjDE%2BglzKdybZYcisP%2FMuoE%2BQz5CvREcCR81EeERkw1pnKzwY6pgHkjjuMQfWkB5cSMLHWr%2FBu%2BvmByJ3yViuokiww1ZuEBJmzO4f8xyvhyu9zTQTak58AIP7S4u8%2F0FO8%2FpUuubMFR6BeFldy%2FTl29Z1U5Ao9EN0uTEWs%2BM4ZDAq9oMAKWl7AXHMQLmv19hhi3JQxxUqpr9xTRbQD2ujC8ww2ivQ3tfSP%2Bwo0DNUbbPHqyP5RLXGXQ4qr%2BclfKRai0kGCcRn7fsatD2Ob&X-Amz-Signature=4dc4baaa6f3b1120faa7af27279aea278d7427df2665165ad4c1fc4de8e5c9a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XFQFERCA%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T234035Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJGMEQCIHfhSAxYECY5eQIwM1UaRelWT%2F8YClq7U8447aNKAmc0AiBGjUv6VS2ve8J7DzUu1vD9mFYQcOi7VAPTwQr3B%2Fo3ESr%2FAwgAEAAaDDYzNzQyMzE4MzgwNSIMJgo2I7faTniVliaiKtwDR6wcenxZnE%2FEJVjl%2F747stdpeHUWZyMDIm6OwHlXpqDqDWc49DV4WBQokDuW6oOeJO9%2F9Yx%2BS1Y6%2BUtoRR775OzOiII0tDFTphMHPe2S4u3KhKTjlxacoroahI4uuFnT1Uh73sBSfLpVSgQ5FtN4Yx0F1PjK8rFD3nEOs75Jkj55yMa0FLrijPn4i4nETZJtwu24M5AY%2BHercUQHe39CsCKxI3KRuKErmkIBPALr7T%2BtcTYztQ8uFM0JbB6fXeVHGE9DlBngiXEy6IZVJbdRjJwVxYowgP0D4CdELS11zjM8GpKjNsUThb1EZRRpr4ZyO5IIgJOQhitwYW87pqxZd8DTEzDV6fWwzgKIx6IP1mZFH4dfe79JTHaudKvkXyrqmT6XsbElveivmrSgXnaCMcGRSsgHqrD07WmoxKcpwcJ80kDx2IT0hV%2FTqzo4WVSyC0nD8Pk%2B2QGgYQWQoovoFeBWw3xKAEcndj%2BWfcZTEeljrfI2CeopiUVEXgkBkrr9VlCFdSpKyYM%2Fak%2BsceIx1wD2F6QypL2ND9HKgrsRwLNCzAgHu031bFoW%2FnyKqkYxpJ1McyIHlFyaPZFO%2FhBjDE%2BglzKdybZYcisP%2FMuoE%2BQz5CvREcCR81EeERkw1pnKzwY6pgHkjjuMQfWkB5cSMLHWr%2FBu%2BvmByJ3yViuokiww1ZuEBJmzO4f8xyvhyu9zTQTak58AIP7S4u8%2F0FO8%2FpUuubMFR6BeFldy%2FTl29Z1U5Ao9EN0uTEWs%2BM4ZDAq9oMAKWl7AXHMQLmv19hhi3JQxxUqpr9xTRbQD2ujC8ww2ivQ3tfSP%2Bwo0DNUbbPHqyP5RLXGXQ4qr%2BclfKRai0kGCcRn7fsatD2Ob&X-Amz-Signature=29eec5b3ba78c674c04e0e046af1ce36252c87ea768171389dca452057d1a6ef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TD4SDME%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T234035Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIQCKpIwC7ZbM%2BbKwvVJ7QafBv70e0iqMpBpq5O8czaDJhwIgN4xyYHCPRXO71qytXroT2GTLqIlsfrGAtWeiyn4%2Fqzkq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDE2miZb4CSajdCzkzSrcA0OOoz%2F03t4R6Eo%2FvbllzH%2FSoUwigV37y5rCGSSnmcSVliWQMHE5onvCqMcLIkHmIiPElylWAbdju6TuR2Y3IuazVr6Y9bYC1Xo1OcfniPFCUDeHm4c8NNtnFG32GI%2FRMGZDKEex2p9Iq0cjwEch9WDlSjx37xnrJRBRuJpODLA97LbEVxrmRozlWx3jXvWHl9%2BWNIv53LM%2FxpP%2BqDWXTXNQNPjsb5CudwdGmqn8wBF0s6kBHhldgpICoZ2sxN2vggOPYqRs0AGf%2Fj0ijYnylmnu2RtY2fukGUP3r%2FKHqx%2BkCLlUH1C81CE5Z7PCP9mnk4iwvb4Sw0halmW0CuHX9xAMB4Xfs4g6GohFbXuwBYRhHbhNiG6P%2FPUfiK62tp1Jwinsck8QIrqLgH%2FG%2Fr85q5jhzOp%2BRzRLUkBWmka%2F7fLQiitfHP5tlo3BvPtzLfiE7zclQ23vQsWAmU6SlMlh2EpmQjZd8BdZiK2bkHtEk4zB8vnaEcZdp7%2Bx7qG%2FSRLJGGmQEGh05IT7RVsTZ9Tpo43iXihW1xkHnYy7E4feA4oyt5J9g%2BClF5LdaWs%2BjxMvBP6Jf6LSkBIR4e%2BemR4bJUxDu1VDQi2bxOnMaOSQWv3Ohu%2BTL0Dx4wJbvLtwMMqYys8GOqUBuMYiPTD2vQEUOmJqsp9KCd9W%2BAc101EwzJOlyHpjn%2B8acBXYsWfp1QbTjymFX56l53wVt1L%2BvPzdPAOZccoJknkd2aVLMA47rYhA3ByiE7pVaxf5BajvWrOdZLYeSfV8Vnbo98DVdo1I%2FjxPdsfl04AExwyiG6NCT4f%2B9%2B2Y4shon4rKH87fG1I9Q14hH6egEKHKAkBXrQp%2BXX%2F%2BGSvgn7MVEbe8&X-Amz-Signature=9b4ff8f6dd6fc9f3b7376794724fc7f5652e10f329d591b14c32614796866f68&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466527FF7IH%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T234035Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIGY5JObY5wAFFFJ7YaKYYVOr052X6HXLgZb%2Bm4enFDAwAiEAhhWKFOUn3%2Btsc%2B%2FUk8L8imMGmZIiipA8JPFc97ympw8q%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDF3sDUPfFI3Fkwz3rSrcA0voIrSFPbbUAESPICUQRCeY9q6uGO%2FczpEH2g5Hj%2BxEjvJ5hpGNCU0XixRmdYhIhxg79hEH%2Ffw2bClfYuAU4myT32Wt3AkrntFXZlQdY8NjYdmhXuIC41Ccu%2BURpX11l2KY30FsggHezORmxB3E6dSjku8bqQ%2FIB7edId7andU4EM6zrYnmhlUCM4vgQ6eIYIwwbgips0Zk3g8F%2FOumt4s4%2BdXh7pg32m%2BYeXVzwurpRkd8zMYbRUPeMMXOJFc1Qq7c5ylZBC74hzY82uVuJk6Iv70pAyEXOE7EmY2iWB1YWCxpXy9mXtkYqSphyVIQB1CyTUhchoxAIKnGKy9lcwehFburUs05ynn0ZNEOf%2FbPpY1EfF2mU0x1y5qizcfciZHs5BBETn0CKBhY1t128eBmOz4XkSP9557RlFpIMuUOEU%2BHIeuQEclAEtwRiJ058%2FYSrvxy0BYznMmAh5hDxbcyBXxq%2BNh7hhmZD5jIkv8%2FgUD0tUJo%2Fskbs6HKYHB11Cgf5%2FYE%2FE5pHgE6AbNpR9IEf33KyjzIKy%2F1IwfvPRwF6gHPR6F3MVqY%2BkzcP0iFTCdpdAMuP26OGeLhv2WhFM8qsO82s7bKzalfDPChweUv%2Be4G6vzmQjy8QUWbMKeZys8GOqUBVAE00JX%2FhqozUhsl3FCpbGGb9kq60ERnrKTfyMtYM%2B%2FNekPQx4ereteP0a8fQvxSw8%2BSgEA%2BUV7v9mB0a5BfYfuhWVdLQedgToLrjmeTV%2BxshljTQ0cjyqrRxWwCgaToYj%2BVwQtfKEFB%2FOuQ5UpqOcajrC0wtwgEmHaFi%2FKhKNUWrbcyoQlfHbDMBt1BirvtZc%2BZvvKvGa4N%2FxiJ85WpYjCjfoBK&X-Amz-Signature=5228776b7b0529f02d2bbbbed8a253bb34c9855a7ab4f890eef0c8e7a2b23434&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

        > **Mapping?**
        >
        > imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)
        >
        > _**→  image representation과 어떠한 연산을 하는 개념이 아님**_
        {: .prompt-warning }

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TSZXBG4W%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T234036Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIQCbMgbxw%2BH4xa0vu9LSdOcV%2FOPAgmx3YZSM%2Bw1yNzBtawIgdw2uCFYCv48Xey43xpbpS2EzOAR5ovOi%2BnyULzG0tTIq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDD7wK8%2B7%2BLL1OUvHcyrcA76VuNUmql7T1RMg7xQA7rylEvZJDRPw1EUkZ0MxhT7b9HvuLFLeoyyJ7uRHBIs4lOuePcQRk8hARCHrMmf3BXaOqrk83zYMrLFPvn5XsSAD1qSFWJ2tym1CUehbRG2A3qNOxqh2t96B8yWpTlF7YqDGzPf6Hi9Avc63GxVTvczRVQBzJYdoMkucFiWHRmkN1caS1UaJpr0pkkAFbHtXrlxM8byh0GjHo%2B8TEQzWJybeBHgYESdrzIEeW2Ii%2B25JrSyjg39VAyhLu3zaQtgUJZwOB4pS0YcFc06ZLcJUritxyBVkVYayeUgZJd6u%2FD3yLvqJdyZOLWHsu%2FeFN8sCPqHdnn8Wj3cZfsAcsK%2FeBWdC658OTovOQe0PTRvK%2FQctGCMgKlpx1prZFONM5E3%2FG%2FfgqDZzvJS8yNaorQOHh5xjT3erADtrsKVHnTLYqwDeNic8beJ11Bn%2BrVCUKosTk8nfy5jgeZUCYuPjypmt57yyaEAYrEMYreWWXKiM57tS6zKbrgf4fSej7RZXzSCAvQExq4zYRu7X4lWX7Q%2BWx0DQ0KzeT06GZvDXCrR8qqEfNBToCD%2FbZk4jbZpAJBEQFMtn9ehxJkv%2FAp39LnqDnbupZfRDF8BRJEIvyCY9MOqYys8GOqUBHmbQxX40%2FnbYzWtjIN8tTEJNR3aVAZAiN3WCH%2BAiAMxOlUwbfP1g25%2BIjEzSU%2F1y51%2F4MDJrQx%2FVO98QZ5wwv7%2BaAg3PMyTqDPXJ%2BsjzXd7%2FyudWzmt3rubFpoiXT2%2FPQeXE9kCOLLxiFz279J4RhVDAiV3JaLqk2jlBljRtcxW2EZ3K4sP1F%2FN24ZL870nRTfa6y%2BSqgaquZXwFfR74w3r%2BAMo%2F&X-Amz-Signature=449d524933a0fd6795909b6423e75153ab0c734563a232f9d2aa47b8f800be7b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

    > **e.g.**
    >
    > trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때
    >
    > → sample의 dosage 값이 1인 경우 0.7로 embedding
    {: .prompt-tip }

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46655ANSC4M%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T234036Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIQCeHF7qESW8d1dMPbwgndkSbdKEXIqrer1NHhjOsMR%2BcQIgLM56ABmSpJSVk17m5Dr3XN6KssRYtF9MTLzu2VYoKWIq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDAZXD1sT0DjfMpvuOircA0XCe8XaQsLzSWbjTjZxAbRtGZwzdMGKclZkqMl3Vr2THbKwqUCzKe9cwMBwxuzkfaC8PWGoToTArdnzI9SR6%2FOiJ7mFLTPqx1gPaLpTshO8dU%2Bbc7PHjJS%2Bp5H7xhc3gvQd1N5dUatVgXM7sEtTMJD7c9dONe61OoSCW7GvuUq3c6zBNeKdiguvgP7rYLC3Wl9pODGINbIdc4ZEJZOjzGPZYKf4DkqPO4HZeqZ1Wt9KeqbNAgUhKkx7unUBRbNa7lut%2BoXJxtRUzzzUM8IIpU%2Ft%2BHCTBIQ7Q8UDo7uwKSCJSdgQI8LJQ1dd4J7hn%2Bfuaxa9U%2Bh2ooR0xinnhYJcY5d04fRzPQ9eX53UTyej7I19PvbXgd8GHXxoThzpg9y0T4XS10ocoUq383GPrlVPdnWcZvAamsJrIqqCBDx%2FF%2FoluXXubtBQ%2BRB34%2BTtrhmAaKeHEIuNBrAtu%2FG%2BmHFlrO1dGg05yhuxw8A4ATheHqbghJmszncMaJesQvT%2BNpNhLIN310oOr4sdD7hih9wZGRbekfyXIa6dtYAhNbyj3CUowpwBnhIAC8C%2F8RmgCV%2BoWKwsBguhm5DIRdmMUVDCP%2F%2FZqUfB8%2FhqqAsQmA1xUUOzI%2BnPJhJ3NjSP1aCzMOuYys8GOqUBjwIoqN0K5kVIi%2FryXX3SDNlbl4SLhn8AK5JXEbmCp14eqcnMdf%2BdZttqoIKXyizRfghIObAGvkFcMvgCWGwSHM89umnuT6eegNaCWH4iqmkT7zDjDiV8M4B8cvz6OxNDoCdCBKrFmrVCcM7UjG2iYIbWtrxAWq61QPxDJNx650hpD%2FKiUIZ1fHq%2FE6II3ErdsOhGtFBb7zBBcZlcs50Qh2liQ7tU&X-Amz-Signature=3520200fe0f8af17c8db57338560eae38e8189870ba0d0f52cea10d7e165236e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46655ANSC4M%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T234036Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIQCeHF7qESW8d1dMPbwgndkSbdKEXIqrer1NHhjOsMR%2BcQIgLM56ABmSpJSVk17m5Dr3XN6KssRYtF9MTLzu2VYoKWIq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDAZXD1sT0DjfMpvuOircA0XCe8XaQsLzSWbjTjZxAbRtGZwzdMGKclZkqMl3Vr2THbKwqUCzKe9cwMBwxuzkfaC8PWGoToTArdnzI9SR6%2FOiJ7mFLTPqx1gPaLpTshO8dU%2Bbc7PHjJS%2Bp5H7xhc3gvQd1N5dUatVgXM7sEtTMJD7c9dONe61OoSCW7GvuUq3c6zBNeKdiguvgP7rYLC3Wl9pODGINbIdc4ZEJZOjzGPZYKf4DkqPO4HZeqZ1Wt9KeqbNAgUhKkx7unUBRbNa7lut%2BoXJxtRUzzzUM8IIpU%2Ft%2BHCTBIQ7Q8UDo7uwKSCJSdgQI8LJQ1dd4J7hn%2Bfuaxa9U%2Bh2ooR0xinnhYJcY5d04fRzPQ9eX53UTyej7I19PvbXgd8GHXxoThzpg9y0T4XS10ocoUq383GPrlVPdnWcZvAamsJrIqqCBDx%2FF%2FoluXXubtBQ%2BRB34%2BTtrhmAaKeHEIuNBrAtu%2FG%2BmHFlrO1dGg05yhuxw8A4ATheHqbghJmszncMaJesQvT%2BNpNhLIN310oOr4sdD7hih9wZGRbekfyXIa6dtYAhNbyj3CUowpwBnhIAC8C%2F8RmgCV%2BoWKwsBguhm5DIRdmMUVDCP%2F%2FZqUfB8%2FhqqAsQmA1xUUOzI%2BnPJhJ3NjSP1aCzMOuYys8GOqUBjwIoqN0K5kVIi%2FryXX3SDNlbl4SLhn8AK5JXEbmCp14eqcnMdf%2BdZttqoIKXyizRfghIObAGvkFcMvgCWGwSHM89umnuT6eegNaCWH4iqmkT7zDjDiV8M4B8cvz6OxNDoCdCBKrFmrVCcM7UjG2iYIbWtrxAWq61QPxDJNx650hpD%2FKiUIZ1fHq%2FE6II3ErdsOhGtFBb7zBBcZlcs50Qh2liQ7tU&X-Amz-Signature=d62df1fece5710b15e2b54ccc92f780614285ca3e1c08e3c7a9baa0684b975c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666CF4CG6H%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T234032Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCICXXD7o%2F73W3so39fdH9xsRVPnnnsZcqgcYjgVrcUltPAiEA%2B7Tp%2FcRa7dBeii7llYu6MCIM1Rh3Rsi%2FVl%2FrNQZ0fmEq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDGzC%2BON4XtoaElsIfircA7LKntkUgGztm1kv44x2nOBaZGwoKdrOJbsxC0aoNj4cBF9g4zIHlv0aoOBmVpHGlgmvG3tjrcRi998jg6Zm2LMgdjSr7%2Bex5S81%2FXJoZqaZnPYs8KSn2ETjKXw8q3mrS5fl9vhUIDZhSR2RVOSa5fdy09i2fpsvj8p2OuH0l7TaFIyzZYdE%2FnA%2FNBbsQOjodHCHx3jV05i5cu3n%2FqvVRzaA%2BVOv6NSJymrUL0WBWCTvwR4LeHsOUYFQHZ1ZXmwPefXBZBQ%2BaE9zLgr%2B7wuDA6oHOWEBD8hY9h0Sdwvepw5ofIoMaJYuy2Nnsi%2Brpb9agIkYKXuKzriglomRP8vfYxGMCs8cOAlPoj6c3fRI2B13hD1LEP3Td2tZKbYqsjT9lo8Hygansi4CJUcs53aBIkJz54c14y%2BMWI9QONdCfHYSehOhtnBfAxX6SjY%2FxSvN6bXuhlIckzuVCLO5knPmG1AZUVER1wZZhteOcG8ep%2BfPrQ6g03K5z9sVAy3F0BbLPJ1Oj85mgaLr9Of%2FD4bo6NPK6bjSEfDCsOmpa7hPh0LdPkGQfsdQI2a2k1BKWSnhc5Pn35pyZWrRir0xWKam0%2FjLtMTN4uu83EacgxsvbDZvkZaObML6GnG8SYj1MK%2Bays8GOqUB6o6mx9965ptqah6JBX5zrHv6H7MHI9hdtxooG2%2FcbmgawOXv%2BB5UNU7tLxmLLq9UpnxBNd3RI%2F9gYekzTcFfAN3ZJd2oDSx%2FfdfwT6biFPyB%2FmrpuqsCIzV4VRH3428RtsKaDHo8%2BgvvntKMqQmWWKWT58yp%2BZRzHA%2FCxRW7GgGI2cFRjGtQB666yeuUr7LSQDkDji9TY8%2BfpLcUOVfveVAAS7I2&X-Amz-Signature=32ccc9fef937d887fc8c1fb0af7f444092efda4a3456d85aebb3b21993d4e11f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665VHKPX2E%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T234037Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJGMEQCIDsUsv%2B2cpw0H4uIVdBWbpprWyYih29zPfcIoB%2FAOvV3AiAJQPQgXohBoyV5bMX2aVGNFp4HeeJkiZRNXPmfPaxyJSr%2FAwgAEAAaDDYzNzQyMzE4MzgwNSIM8D2BktcQSo9b5OIKKtwDW0VM%2FaHtiTkHfR4v8Z4fbNlmNXhOA5l7dl6pQy5IH5pX9IZGdjt8p70BAeaKKMQ7kVVC9QEU%2FvnWm3V19j9u1CKuAKMqSTE%2F21mk3lnlP%2BR61OgBivGTrHDP%2FNc1C%2F5pKpafVluncrgiCJ3QWTIs5K02OfAV1Du9SRFZJiqqKvUU1sv33nG9p5ds5CEdKHFQPWfSBG0kp2kc%2Fq%2FdtKsnabe8ta6mVb74CUeGzQL5BbUACvctRSKX0pfOJPBdE8%2Fs51yUfd2jNEVwikM3o3309iX4q%2FjlrFvlL8DaJn6eJeE3PPh2PnmHiuCX%2FCBgzTUHj%2ByZwiNiKvSQb6aiTbDDfOu1Fr59UctbOzcE4d3%2BBUjw0h4tustYTkROKSlU2tjnIc3B2OElZQ41%2FQFckBEfusKfNZ7aa0GlBMgUgCWJbOkInystfh7TD90VxtGlqPS2Y%2F37NsCKi83h4GpOZS8IHjd8e5SUctNg76af80ldR90hF3YPMhvce2xasXAa3KNUciqg0Am%2FNE790kF4s1kVQQaiht%2BHRS9yyiAdUbg%2B61Z%2BqfTOMNGeUxTe4lHfDBV7EcLej%2Faxtj6M9Mulst7Zu1aU9pOgDFZ2VwYbTHVxoWVhe9o%2FL5pfA7uex54wppnKzwY6pgGsOYFlB9FkCR5aTbE%2FLAMuR7kdkCzr%2F34FrtkvzmgdIVgmpgSXo3Dp%2FEwxOhrGJ5qvM955byl75K8jzqhax5dP3czx2xVDv3UogY3cPCR9rAu4%2BA%2Ft30Q0uj3rBwE0FpdSHQj8J02E6AwRAwpKylzE5p%2FgNS20JfwHN%2BKUIGsQO%2FeoRM3TmPOke5D%2BQSocHlv6CuHO7iziiEMyA9C6v6pmshU7XPt9&X-Amz-Signature=ad5f11dedcd49917387d5bd6a8a672f5ddcf3d39318a9c9b854de8a98fdd1378&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665VHKPX2E%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T234037Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJGMEQCIDsUsv%2B2cpw0H4uIVdBWbpprWyYih29zPfcIoB%2FAOvV3AiAJQPQgXohBoyV5bMX2aVGNFp4HeeJkiZRNXPmfPaxyJSr%2FAwgAEAAaDDYzNzQyMzE4MzgwNSIM8D2BktcQSo9b5OIKKtwDW0VM%2FaHtiTkHfR4v8Z4fbNlmNXhOA5l7dl6pQy5IH5pX9IZGdjt8p70BAeaKKMQ7kVVC9QEU%2FvnWm3V19j9u1CKuAKMqSTE%2F21mk3lnlP%2BR61OgBivGTrHDP%2FNc1C%2F5pKpafVluncrgiCJ3QWTIs5K02OfAV1Du9SRFZJiqqKvUU1sv33nG9p5ds5CEdKHFQPWfSBG0kp2kc%2Fq%2FdtKsnabe8ta6mVb74CUeGzQL5BbUACvctRSKX0pfOJPBdE8%2Fs51yUfd2jNEVwikM3o3309iX4q%2FjlrFvlL8DaJn6eJeE3PPh2PnmHiuCX%2FCBgzTUHj%2ByZwiNiKvSQb6aiTbDDfOu1Fr59UctbOzcE4d3%2BBUjw0h4tustYTkROKSlU2tjnIc3B2OElZQ41%2FQFckBEfusKfNZ7aa0GlBMgUgCWJbOkInystfh7TD90VxtGlqPS2Y%2F37NsCKi83h4GpOZS8IHjd8e5SUctNg76af80ldR90hF3YPMhvce2xasXAa3KNUciqg0Am%2FNE790kF4s1kVQQaiht%2BHRS9yyiAdUbg%2B61Z%2BqfTOMNGeUxTe4lHfDBV7EcLej%2Faxtj6M9Mulst7Zu1aU9pOgDFZ2VwYbTHVxoWVhe9o%2FL5pfA7uex54wppnKzwY6pgGsOYFlB9FkCR5aTbE%2FLAMuR7kdkCzr%2F34FrtkvzmgdIVgmpgSXo3Dp%2FEwxOhrGJ5qvM955byl75K8jzqhax5dP3czx2xVDv3UogY3cPCR9rAu4%2BA%2Ft30Q0uj3rBwE0FpdSHQj8J02E6AwRAwpKylzE5p%2FgNS20JfwHN%2BKUIGsQO%2FeoRM3TmPOke5D%2BQSocHlv6CuHO7iziiEMyA9C6v6pmshU7XPt9&X-Amz-Signature=ad5f11dedcd49917387d5bd6a8a672f5ddcf3d39318a9c9b854de8a98fdd1378&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466424SGZVL%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T234037Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIAWkRqNaWIXAibWddmlk9AKTF%2FxWj81fO4jd56v%2FGxyVAiEAroDW%2B0SOh9i3pJv4Bj4rkT6LaCfkGOjIvkqRS43gNmwq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDCkuWekkpDtncp%2BslyrcA6c1r%2BoOw3poFVPZmZPkruWt1SC6h89DJgUqEuiOOLSHGFdLKa7SNuPSifkbf6hteCAFtTwtj05T%2FSGpHZyLrRrSX4%2FeaIoBgh7nNtS7L%2BFARgSHOpobr5eIiiPeqNl2vtrjbBsj1kjwAxa2mkkERJxQHkSo0F8axahOw6Gl7EyELh%2B%2Fs39avc%2FRaiM%2BjNI5gEXclw%2F4SFbMiaw13fBPwB20pyxAWOgpxp63jL%2BIYlitKzeJxpa2Hn7sBKQwzmWnZn9t6bkDkeAn1smFgtlZkTcKDAdiLlXjK%2BEglypMF4L3bRZOw%2Fax%2BMp7Evg3Dz2GiVEPRs5BOi%2FDR9ghhny%2FyEm60kV5rrhKtaZU9RLqaOioXBPrKoflS8rABTgwCy%2BdIjf0AC2hxkzHosii6dcmD0hqdMr%2FDchxB7b2ufEzrpKqLTTDWW9uoK17%2BqbgeH%2FENoTdX%2FBzC9LQAspRd%2BljE0Koe50ehh6oy7j0wR0vI0bbeX0WWqrsv9WDq7ZxTu62L9gFTnLe2KeG4%2FrV8yznjHpQIspsfe91BKULDrhdAKdAIk%2FWTShsyblka6zIHVpRkAcDTHFLSPuSA6qJzo5kM1IR80nm1dNQp3mPqkWDJIrBprXH1Iz3XzNLFmWPMNiZys8GOqUBFNhF7gmM3ulk13cmb3O82QZpNZCXEs611FoV8VUgCxgUigPmpHpG7Vf1eZcssJhsu%2FyEc%2BneML3uZQ0AA647s1VoBwTwEtwO%2Fjhq2zo8FhrMnOHixVYHBtx3f37JnKOkelqhsT05fWvMY1vDCGTqxomDn%2BgXYPh1pzxoMR3jx0agttUFfgcaqjXjL%2B3j%2ByPPG8WgAE%2FCu6GuoDX9eE4M6MeDC4%2Bh&X-Amz-Signature=a1fbb707b370016004ac0f296a65265f67bd0bae372c5984a47826a93fc1593e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
