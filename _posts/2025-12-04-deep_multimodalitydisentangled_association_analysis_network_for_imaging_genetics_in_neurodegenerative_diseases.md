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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663L3H6MKO%2F20251230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251230T024815Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHBO6fr5FdoTXfa5U9ymrkCxO5KLhiI9hl0wZ0B9Fj5LAiB1Z2dX%2FKSPY%2FW4nAoqdVlc4Z4ovwL4Cq4si12Xwtg9hiqIBAiq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMxqVvyRB3htu2hebbKtwDG%2FpxykHEVrRQs%2BYU0pPFaLtqx2TPH2dyn4ejh6RF%2FFflZjk8%2FX5wGuNhOlThAtyU4dDAzz14TDTsxzlsrZspYw5B7NjYnxyLiRdddhezBUyYh%2BaiRsYYZctGlQfcJE6lvdhgeClvWebnuAVXouJUdrWsdAXdt%2FE%2B%2BPTycyvWPSHhQCsEbvQzR%2BCS%2BSy2nhIGVwAboC4NWYyoPf3Lw36tiPDM4fitoDhDHs1NRhfEVLoLsOGzkoNA2GThZEOflFkugKTDm2TT1XtQeA8V%2BStEG4I1Z3FHGupcdp7KGs91mWILmcrl%2Bqe%2BgwknpirnH6fnErEJgGtV1dqzgGQ39RA2Bc8a1EDriZ8YpmCKvXwNLGpHe5%2BrPC3iCLDDk2%2FaXQoA99xK69dBPTbLlRS2h9fkHxGruVyf0g1I0ZA9%2FPHz%2Fx3f5sk6Cg%2FwW1STNfoaKNClDS9EMPpDmH87FMeDtl4Z5dg9QAm6HGCKs%2FSk8W%2FUKjE%2Ba3Dl4GSBj5FNMzvaW59mn6iNONJb%2Bfwh47c%2FGHIyi4hAP3XSyj3Fa%2FIFX8HMZU4Yu%2B9ht4UDdtpe5x7UyeA5iYW%2FVal6cIGHH%2BFUWP%2FLj%2FHCZw58j41AVSqJGUeAy6f0PGFeEhs6HaQfhKMwzMbMygY6pgHGtG7ibfPGHU1NYNvAAZq%2FGpOjgPjeB754OaSpxbIXsNCwx0b9wkIMJhbKoePUZ%2FvgmYj5MGWykL83tFNgT5l80b7ieYK%2FI6AEO8NnQBHiEu%2BnVif4su4lb2xvQzV3VI4%2BQ%2FGktw2UCjhzPOKSV4vOwoEMUUOuLdmQ9QSpB9%2BkzUyXiFiPUvfX0%2BW56s3l2Vqug%2BIipy6n9HRgt%2FVcFq4H49ZBR63l&X-Amz-Signature=2071ffe00ef7868debbe4bfb0ae5cd1c1009dcf2aa7488ad626ebac7ee337c20&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663L3H6MKO%2F20251230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251230T024815Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHBO6fr5FdoTXfa5U9ymrkCxO5KLhiI9hl0wZ0B9Fj5LAiB1Z2dX%2FKSPY%2FW4nAoqdVlc4Z4ovwL4Cq4si12Xwtg9hiqIBAiq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMxqVvyRB3htu2hebbKtwDG%2FpxykHEVrRQs%2BYU0pPFaLtqx2TPH2dyn4ejh6RF%2FFflZjk8%2FX5wGuNhOlThAtyU4dDAzz14TDTsxzlsrZspYw5B7NjYnxyLiRdddhezBUyYh%2BaiRsYYZctGlQfcJE6lvdhgeClvWebnuAVXouJUdrWsdAXdt%2FE%2B%2BPTycyvWPSHhQCsEbvQzR%2BCS%2BSy2nhIGVwAboC4NWYyoPf3Lw36tiPDM4fitoDhDHs1NRhfEVLoLsOGzkoNA2GThZEOflFkugKTDm2TT1XtQeA8V%2BStEG4I1Z3FHGupcdp7KGs91mWILmcrl%2Bqe%2BgwknpirnH6fnErEJgGtV1dqzgGQ39RA2Bc8a1EDriZ8YpmCKvXwNLGpHe5%2BrPC3iCLDDk2%2FaXQoA99xK69dBPTbLlRS2h9fkHxGruVyf0g1I0ZA9%2FPHz%2Fx3f5sk6Cg%2FwW1STNfoaKNClDS9EMPpDmH87FMeDtl4Z5dg9QAm6HGCKs%2FSk8W%2FUKjE%2Ba3Dl4GSBj5FNMzvaW59mn6iNONJb%2Bfwh47c%2FGHIyi4hAP3XSyj3Fa%2FIFX8HMZU4Yu%2B9ht4UDdtpe5x7UyeA5iYW%2FVal6cIGHH%2BFUWP%2FLj%2FHCZw58j41AVSqJGUeAy6f0PGFeEhs6HaQfhKMwzMbMygY6pgHGtG7ibfPGHU1NYNvAAZq%2FGpOjgPjeB754OaSpxbIXsNCwx0b9wkIMJhbKoePUZ%2FvgmYj5MGWykL83tFNgT5l80b7ieYK%2FI6AEO8NnQBHiEu%2BnVif4su4lb2xvQzV3VI4%2BQ%2FGktw2UCjhzPOKSV4vOwoEMUUOuLdmQ9QSpB9%2BkzUyXiFiPUvfX0%2BW56s3l2Vqug%2BIipy6n9HRgt%2FVcFq4H49ZBR63l&X-Amz-Signature=2071ffe00ef7868debbe4bfb0ae5cd1c1009dcf2aa7488ad626ebac7ee337c20&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TE6AAL6P%2F20251230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251230T024815Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCNbgugmZvIiWXLqb42yUgzeAr9I6mqsyBm7TMm%2BgvdsAIhAP%2FAKeQg33VKZrGamQ1%2FFJxrOrBnLvokKmIuIIwZWVwtKogECKr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzXIZELMy5XmOAbxNgq3AMp5LPr44V5MrLUxm36eB58R2RlGhDr3wSVj6AaG7XLxEFpukJB4lgrvLDyBcYmEB5T1yZarMugdx4r5jlBagt%2Fk4zXxBE5jh%2B3cU0GlqbgmW%2FdUHpAos6dWf4AOIN7s7FHvryJIAvYZ5pNXujxVcoop7ZA59iCSWQtnFBsNGCdZNQW1bQtuCRaNqF82HLzyWeU2Npuz107w%2BiLSSYT3vBP%2BbcKfQDYDKKnajt9t4jZUI1pvWniNe84pUcNzRSzRbKFDsWLrTacnZBoxGP%2BNZk%2BIn2BaiELklOjJTlEBPRE8xfZ1ccqJ4iBNhHvHCF07POboyGvOnNoHCKnrxy7mc4MkdQw57de9ZY4x90fxiqZWI7MS2nx%2F4WvF1GDAfwtET04wfyPrIxeAM7543G7pvV8P4lt5zCpcmKZD9zhwiUgIEzk7G4bDq1PjdNcPNgMt8e%2Fj6YFGiHE2P5YMRtwd%2FreHsB8FApONY4DSgw6sQcPBkU7aX5pev7XSh0%2FaYEMRnh1pzrWpvEFkB6P9AnpeCyp%2F%2BqNhunE5RsSIcpGfPVhdc0pUWBEpBUoG8OReBfYjxg20m0HRv7AtfXNPeXrlzPNC%2FbFcqm6lo4o%2FlTCcOhFCipyBOQHfUOPzNv1KzDoxszKBjqkAaGS9kIipzw0%2F08%2B1lhgkfExzTQGpO72h6PxTcS%2BIH5Uc9Mk9oQPmteyLuNy4sCnb64pfuF%2FFasjNm%2BdTuOVzk8%2BdBi%2B4oC3B5H2q0KtbkLASlSvRvbWyO4ShcIdStm%2FqMRbL7GvjZ906uDKXz%2BxWKKqyzj2N0lPzp01Jvirmqld%2BsnfCALh2PxkXXn6CpbAs5ob%2FI%2BRmnzCrX8KqOSwroegqGG0&X-Amz-Signature=9ec54fdf611d0ee776f8bba5d8a8130e9b586cb81956864fd24f1f0c7967886d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W6O6MJO7%2F20251230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251230T024818Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIB0bTV5G3TOgHXR2KLXn7ZBhAKjx4xlqnmmeGq7oS8x1AiEAtmLscB2kExSctEir9cp%2Fb7s81HYVENZBjYvXWiuL3a8qiAQIqv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPS3s0v0jq7RaTPO%2FircA7q4Lun7mTI1ZYSMocUbbqmVyGv6geeEilcvs1%2Fteil%2F7XpDjuACijy5eKZs8YVWcfocbSAmLFynzIDuxkdqiHxuwDw%2F4OXLVIgdZAcPFJszsuyPbzub0u6e9pQioEPLPsIOdU3Hpax04X0VEhq6OezWTfiMjnQd86Agbehl2xuxZjR5jgHMnCfjdRB36LilzZf0DlMHGXxWrpOoGr%2B1MT2yjOAjgJvrRZAiW0I4%2FYTI5Cv1CSVOMrR69shdpwGkBeoP6HywM4riqe1z%2FYQaYuTpFwI%2BZ1lfGbGXjzUseXiqPBZFYpUj4Dd6oz7VIMq%2BN20LuxDJ0RRSdBUNhpyzVhPXioU7J29JAigsN79o3IJD3iRYFgfnoa2dNgr5cc8nKDN9Czb19L6UDOms%2Fk3PFgeSebquyrLpUtptCrh82rUk6waa9balxLLmL8Xb1kDX6UyXlzNIXfMEak9strh5lX8u6BRyetweSZUgQh5nAA9I7YKLMXB5EWG9kyTYX%2FPAyw4odT7UX0nVqhgbePcIS46Kikr7HSyhecFoWVQ24Mw%2FK9%2BQGztHzPEEOn%2F3PUGh5WtiTYYoh4HyhJJUX8m%2BDy%2FFyx1TSigSRGjxXHtTj%2FW5pAHXObW1PQvRWrCRMLfBzMoGOqUBw1GRlgGRYC%2B5hBwYxOfxpzCixx9JxqHN0Jt964JP2A20IP356BM%2FroPCr80v%2B43E%2FNfxVFoyC%2FHPTGZT1Uibl8xuaBLJZuZJBymDVDeTDaGxYpA%2FtRUWk2AYZ7sVMVHSe6AscJlg61M94ozrxwqXNDHMWUMmFyJ0ACFdWpXb2KYimF1JphBxhX1TXwLNht1n4SPDIFJIMx64MZHCFRVTloAB6o%2BR&X-Amz-Signature=5e352c98b77692ba61a85720fcf443fe449425896f4dade2061a41d2f0e609d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W6O6MJO7%2F20251230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251230T024818Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIB0bTV5G3TOgHXR2KLXn7ZBhAKjx4xlqnmmeGq7oS8x1AiEAtmLscB2kExSctEir9cp%2Fb7s81HYVENZBjYvXWiuL3a8qiAQIqv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPS3s0v0jq7RaTPO%2FircA7q4Lun7mTI1ZYSMocUbbqmVyGv6geeEilcvs1%2Fteil%2F7XpDjuACijy5eKZs8YVWcfocbSAmLFynzIDuxkdqiHxuwDw%2F4OXLVIgdZAcPFJszsuyPbzub0u6e9pQioEPLPsIOdU3Hpax04X0VEhq6OezWTfiMjnQd86Agbehl2xuxZjR5jgHMnCfjdRB36LilzZf0DlMHGXxWrpOoGr%2B1MT2yjOAjgJvrRZAiW0I4%2FYTI5Cv1CSVOMrR69shdpwGkBeoP6HywM4riqe1z%2FYQaYuTpFwI%2BZ1lfGbGXjzUseXiqPBZFYpUj4Dd6oz7VIMq%2BN20LuxDJ0RRSdBUNhpyzVhPXioU7J29JAigsN79o3IJD3iRYFgfnoa2dNgr5cc8nKDN9Czb19L6UDOms%2Fk3PFgeSebquyrLpUtptCrh82rUk6waa9balxLLmL8Xb1kDX6UyXlzNIXfMEak9strh5lX8u6BRyetweSZUgQh5nAA9I7YKLMXB5EWG9kyTYX%2FPAyw4odT7UX0nVqhgbePcIS46Kikr7HSyhecFoWVQ24Mw%2FK9%2BQGztHzPEEOn%2F3PUGh5WtiTYYoh4HyhJJUX8m%2BDy%2FFyx1TSigSRGjxXHtTj%2FW5pAHXObW1PQvRWrCRMLfBzMoGOqUBw1GRlgGRYC%2B5hBwYxOfxpzCixx9JxqHN0Jt964JP2A20IP356BM%2FroPCr80v%2B43E%2FNfxVFoyC%2FHPTGZT1Uibl8xuaBLJZuZJBymDVDeTDaGxYpA%2FtRUWk2AYZ7sVMVHSe6AscJlg61M94ozrxwqXNDHMWUMmFyJ0ACFdWpXb2KYimF1JphBxhX1TXwLNht1n4SPDIFJIMx64MZHCFRVTloAB6o%2BR&X-Amz-Signature=ec961d5d759c4531f923651e5513221975b7819ed8944d0f6ce128b9a59aac40&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662UNCT7MM%2F20251230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251230T024818Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDFX5gtE%2Fy2NVSItSEUHls%2BduFcOSf11id3kcfxRqfRqAIgOEwPwab6uo6CgoVaMickySjyLh1cwLCNNff%2BHEGiYTQqiAQIqv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEbNYRTwE46xVv5%2BAircA8XcqAX%2F4yzrmhxbd0N1bv0dQX7INzp4L3gQogCq%2FREQ4%2BqVc%2BWJM376cr0WcOWWsBd05IufC7ECLm3y1Ay5PP4acwNjAzQY1q5HiqFIjqndRsBO3bFwLmKqgoPo%2Fcqcr%2FIKPlCyMI8TCPDB1QapLnA0GZrDiaWQ1BylgL2gqBFT6YoEnLju1ovBoMGRq26%2BE2G%2FqdWyBs%2FWtHuCgBZkHhtBX0GuVlUjsS8OVYouzLJUTyJ9cIJ0c9JZLGeyAkrouKdfifx9y13r1%2FKjd%2BnueWUKdiAXrHut8afiDpoVc%2Fnn%2BoaMnwNTgWFX66eMuhZzFX7wB5W395O%2BQaFu0lAk6Tl2H7gqdoSJjZcSa8jIIJDR7EfHfcqmgkdYNX97KRjiO4zgFue%2FbP3tLb6UMHzm2pmj5aKjkUP5n8%2Fzn%2FFfVZuPU0JWudM%2BiwCUddFTahLZp%2FIYApbeYTB2RoehqJNjNb0zqhTSQd%2FRe9sgfjSv0Y%2FfYQZ6oas6xItYmu%2ByaPYsNHDI7%2F0dPnjxckEH4lWz1LDLOcY7D1k%2FGgLiHfzMpeGlfIkvGOm2tvUBiJMBQ93Log9r7xwno7no2NhKgEJyIMGtEQDkI2ZKT1sd%2BPQ3i2C8H9vVJNXDEzsyXmkXMNzJzMoGOqUBWPsfdxigbjaq4yTHLkyiwwMLcD%2BZqJ5DEHKByitLDO6RiDP3rqnX268iTaN57APf3XwbyZSXU3%2B5JEMvBXcQMcQLMAQ%2FcWZxKB5s72tRTyDm2Oq4azeafpcSGud4v26Iro7YzQpr66JfDF7piC38ZkqPDvy%2Bk9G5Wdg7AW3QdMmpp1%2BkOwhO6a%2Bvqr4DNaQUqYfVSELJ4R5u6thVM4Mm1UiCWpid&X-Amz-Signature=490f18ba4c309641454f3263e028388614f01d53b6038ed6bcc0eb393aa8ed36&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XG5GA5CT%2F20251230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251230T024818Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC7qxCC2kvYERWPEkfnwuWxXe58xOOltk2bjXSywu%2F6owIhAIfPLalqiO3KLfBC8jxVthOu51qJYvPChclNmKC4sbkmKogECKr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxsSsbLsXdXcL726Qoq3AOXjixrKeTAKOBx%2FAcK1hzJ9k%2F9S3BT0GyOs%2FZMkV5iY%2BNeKQxMmjkS%2BCf7mNqFzBONOWoLLHhpzwTLs2MJaS4rPubdIy8Noa%2FcWTfeOHVOTSklBxbkPs3XfDlO0dQe969Y%2BWFkafk0gF%2BHbmfSg2GM9LpOu3SVPuMBg8Syw0snq8Akn4WABZTZ3SxAaTe6PLSYVEUsphtR7ULfKug6k7muiJb%2BbfzmL7vftMAeystxrHhvx4TcBXzJaV8wD2Lz97mZ%2FeYbCcVOenys3I8I1X5pTxidJ0zkP1l6Z7UuUnaszVD1KE%2Bqy3YIX2C2LMKqO%2F8k8ZYaN%2BWfy%2Bxp7FUldaJ%2BKVEcUaXrPRhGREEirtgb5hNX0sGwP%2FRrKEVSXnwmYBq3kG1a%2F0DAsO4w0bGqYNTICsDMp5oxKjuonESmQ3YAMK8PwDHqk%2BkSIlRyIBaLOrr9fvL9edOjcpTgiR4T1CNTZikdHWeNIHWMOxZMWJN4AKMQzoSpsCu%2Bdu1QcL0p37eVSsi%2FTuboJTdXIcWUNQh%2B3He8kebx2C1W12hzdXAueIuGBLs6Y7uq9YusmlYGcsSNzPaSU5DAIYDKPQM7Kwa%2BMaGhyEAEfkLZjOUZLEheDJJuelAAxowL%2FnKSVjCZzMzKBjqkActVsWBGKYz22rEiTa2dBOIHVtvaYMzrEHn8WG%2FH5h8%2B%2BRFRhnbrLVYLtqRhmvVrIYaNJmpx%2Ftaavt7YVAt9iNkKezbZmj40J7cKRfC67fe%2FbW9fiNjjKm7wqnjNLkKC7J9ycYcfC4MUCwVtE0VqIuKm%2FrrzX6NzO4yCFFk62uegAqFvaZ4WFAMNwuhp8v5dlp%2Fs67VxTDXpp8dzSe9W4eoredVN&X-Amz-Signature=3de31e8904ebd549e3843583412f15e39daea971e74ce79373f49777c3667707&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YFBABYMQ%2F20251230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251230T024819Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDhlE7kM9Uo1LvleEbiAfW9cRdkwzHgil2KFIg7I8FK5QIhAJfWRAHfXYexnI%2FA5muNnEylvqyZC%2BOj7otHhzqKDjkIKogECKr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgySMcS7Hgup2SgbEesq3AP3ej7C2eaNQpBDAIZmaJ%2Bwkein23fUi4%2BmdV0NYKSz0Zf%2FL%2F1fi7NPBN2vjYrGHIU1%2FHf5ccYdLNFznO%2FDdohp%2FkGImoalnZkYxbHi%2FMWTfGJe4ILfW7KM42bCSihziV4sR9XnpgqLxznlDNaaov3SM7iw9%2BGkXCfX5vIKtN73lkxuwrj7eMIk0vYmx3zmt%2FQMBZ%2BwkBVKDlzcC7l0RC7ITrywqIr6DBpjpQZU%2FOZ5fpwM3iZu3BKLixDD0XTpeBQLJE1CycPdNbFPii42N2BnkJZA2wla%2BaNpSQ1abR00CtF3wz2TFRZfMf5HOhvTf%2BELX%2FcvvmGa3nbIawuEIU%2F7cIj6i6s7axrMk4y8jNe1ScX%2FJPfXV2NDGHDcPgJx4cBEAhVnki3MDayPOFa8tU%2BoAG5T1PAS3EARiBQTCRtADOWR56ZaI0JVJBLI9Ur1JhvPFT2Sf%2B5qO5x4bzVZQQJ%2F5MAYcYVZYUGJXbmRXHh0H%2Bj5gchyrDXhnsoy%2BqSWY%2BevRktADWH792ziMP9E%2FXbeqX4%2BmBD1SmW5qCDZ1Q%2BazHYmfBj%2BIlDdjlw1vE6SOaEfD54wkdgEmzzq%2BeRMsShGqjEaeyskK8NkB6dSCHgM1w1akq2YLvDk5MrJ4DCB0MzKBjqkAQgOsqRsOhtWxWLIMvB6VfBUjMJym17Arc0%2B%2BYFGpgt1T0SRaUf88KHuKX55u%2FmTAxE27xwN5mufqL%2Bl6OXsi61Is88DZ0ekZ7mKUO%2Fy3GETPoGFtCIpF4Sfj15liHrQc9D%2F%2B%2FfHNgGMsnvFs%2FiRbh%2FtHbOF1ry4b7BqzEeOllH%2BZJsODRS79%2BXG8dvQn3dXsGwx%2FtezoUQ%2F0rQCA63RSsVMtOve&X-Amz-Signature=23a8a513d20243f4aa5e2dc0d65328456d941fc9160227351a926c32a63e49f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VP4DQUZI%2F20251230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251230T024820Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDAnthHMxNU5b%2BHFBj547xe6zX2fZpwtDAU85x71dAKOgIhAMTRkhFruPq%2FPuLcqK4c6e5jWS2bveKNGTpm3blo1pLyKogECKr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy%2BWhm6mLxsrqii%2BAMq3APBnGGmGjDHQlIU%2BavyLwwfSL707CTbgAPk99I2SDjdgWhDYrqWMngxZnYKUbr4PfXCJ35t7CS%2Fq1YNTiUeL7mYagTrmpsD%2FgbqnEAQztCVIrvKwHzwpc9a95P6y5OWqzJFrtefQpLUH7fk6wIu2nQWvfL%2FMDaVGdMYf%2F1ALiL2sE8Gl5aeA5pyGIRAaJSwHcAjXG5I9l8NP9nlOfNCAes611zI2o4eSJlvUzSBWuAXHaW6NQbVEzJaMDQcDa7wLnVfViMJMTuKMrYZGpLwJ8Z9xGA6r6W8VXiKE2FJkxIRl0I66S5oefZpjbTT7S1QVxCPTgtp8sp1WivncCVUDRsZeQdOn8N3QDdhMpu2npgXICMzmPwVdhWaZdpTtG2HZ0Pk2gT8Vlnqnm%2FlUtfmninYRoZhGcJUPugRIzgi%2FWm%2BAE6Fc%2BijoDTbz9SD4699JF10a%2BAWyMPhN%2B0v7b1AiaTHGdjuGQhA6mnY%2Boh7%2BNSkqKdOTGDfkoZ803aq1MVe3NjnkCmpkS83BjYxbfPfYZNHe%2Fyx7N6Xm8mq8l5e%2FmAPwX1r%2FZDfKnNGxIcIBeaY07k5PJe6xCZePjwaDHpBdCp94HLPGlT6zYZfAV4TmvNayub3sHNegoPNiui35TCpy8zKBjqkASwMPFeymvXnKJMyOEF5iyFGaHfk8DNRAoXGVjtwPhyHxpisudbEX1X3Hxmmo5aegYycim14Utccc6FuCXf7tnxmtLpnV%2BmCoa0eyKT8ZiCeJole7B3nAa%2F80FZjNE6uKnqpeXoxFFDoCKYOlMCxNDF6YjBJtM1zmk4pCbOMok0WgzrcPv4OTXSlgFsZ0PeLBNaYaq%2Fh2R4sH3v582vC7vb4MjmP&X-Amz-Signature=d3cada0c8fcc719cdba983a6ea7c45a135e38a506da9f537504bc2ae5e818df3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VP4DQUZI%2F20251230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251230T024820Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDAnthHMxNU5b%2BHFBj547xe6zX2fZpwtDAU85x71dAKOgIhAMTRkhFruPq%2FPuLcqK4c6e5jWS2bveKNGTpm3blo1pLyKogECKr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy%2BWhm6mLxsrqii%2BAMq3APBnGGmGjDHQlIU%2BavyLwwfSL707CTbgAPk99I2SDjdgWhDYrqWMngxZnYKUbr4PfXCJ35t7CS%2Fq1YNTiUeL7mYagTrmpsD%2FgbqnEAQztCVIrvKwHzwpc9a95P6y5OWqzJFrtefQpLUH7fk6wIu2nQWvfL%2FMDaVGdMYf%2F1ALiL2sE8Gl5aeA5pyGIRAaJSwHcAjXG5I9l8NP9nlOfNCAes611zI2o4eSJlvUzSBWuAXHaW6NQbVEzJaMDQcDa7wLnVfViMJMTuKMrYZGpLwJ8Z9xGA6r6W8VXiKE2FJkxIRl0I66S5oefZpjbTT7S1QVxCPTgtp8sp1WivncCVUDRsZeQdOn8N3QDdhMpu2npgXICMzmPwVdhWaZdpTtG2HZ0Pk2gT8Vlnqnm%2FlUtfmninYRoZhGcJUPugRIzgi%2FWm%2BAE6Fc%2BijoDTbz9SD4699JF10a%2BAWyMPhN%2B0v7b1AiaTHGdjuGQhA6mnY%2Boh7%2BNSkqKdOTGDfkoZ803aq1MVe3NjnkCmpkS83BjYxbfPfYZNHe%2Fyx7N6Xm8mq8l5e%2FmAPwX1r%2FZDfKnNGxIcIBeaY07k5PJe6xCZePjwaDHpBdCp94HLPGlT6zYZfAV4TmvNayub3sHNegoPNiui35TCpy8zKBjqkASwMPFeymvXnKJMyOEF5iyFGaHfk8DNRAoXGVjtwPhyHxpisudbEX1X3Hxmmo5aegYycim14Utccc6FuCXf7tnxmtLpnV%2BmCoa0eyKT8ZiCeJole7B3nAa%2F80FZjNE6uKnqpeXoxFFDoCKYOlMCxNDF6YjBJtM1zmk4pCbOMok0WgzrcPv4OTXSlgFsZ0PeLBNaYaq%2Fh2R4sH3v582vC7vb4MjmP&X-Amz-Signature=4835ecd172197227093658db1f97db8d5f936bc01ffd9f9cb28b1af64771a219&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWU3VTX4%2F20251230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251230T024812Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCayGbDEv5T%2B10VXfzPwJXFEgSV%2FLTK9g50g9UWah4UEwIgXM859FHV6ructVC05Wze6cyR75jth820FW8gMf3jQ4AqiAQIqv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFuJ3py6eNClXQQTmSrcAy9via4ZqKrGbVFaNRH87cv7gEYJgkGnN0aoUQaaEzNt%2BMooc8%2BFcOJez22kiBeeBPZPwXyrB3vn1D1M9bI9CvzVpbMww1hCzWuTkHpLmxHJHZ9J4LOIEJc4MIKaM9GWmgiou625W05MMe2ZdXjqC8jz1PNh2Zgip4wOTk6XuPdgglFPXjN%2FQHSmwomoarlRStHOUOO9VgKtLdrb8%2B7CoQfV0qqHuWBjy83vIGCTHRXazlD9itplJQ4zWFZ3ip8wYxg8voBi8zOqXPfaudRrTr%2BV94dbUmNLU%2FRVOzUiQ80iiYPiUHlKNfrHGb5Lejq8kXYJ%2B0nSBtLZWG6Jip1adpQq2S813LJm%2Fkjah%2FPKiXMsMGijSXfs0fk28lOiSDDDCJHBUuyFmRnX6h5UDvZqwareMAXpr52Omg8V9Fqxl46Bq7vkrsKZC%2Br9ENVA%2BsC1a1JvsUV8YQ%2BwrVC5RUX72nZaKdb9%2F%2BLOTol1R%2BAXcaKVeNftoY5fTo664wk1HcjQ3lmvBqkuASPf7Rb1axnOXFSLFwbU%2B%2F6G%2BAnJWa66L%2FcRCL5VMPf7v759u3J1Q20cxDC2GlERBYi4qldI0C9%2BLWvruq6%2F5wmaobYB55zUWqO4FeihKqlVf29vjqCRMMbMzMoGOqUBUu5atIeTgkaueHKxhatgl36XQIuigsZIlZ7bzpTABY7imbVRF1Dp0KLAO6baZERJzTewioCnXLxxZtVTOlaiFanK%2F281bhS8X7x4shI9L7a9bjKYmLC8UPWzIKj%2BXMzXxUbYsuUSX1ecL7I%2B6FWWPTNVGT%2F5vHjwSTuGoLKoSpTLBuDWWQkUka6FgTWqCkC5XfFg%2Br1ypAa%2Bl60%2BmQmGlePm%2BWkN&X-Amz-Signature=9515d8f60823580f3040272b4a89abd5f617599929d3f7d45b55ef30daaff6bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SU4PH7DP%2F20251230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251230T024822Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDk8%2F%2B6PrHWy9T21VJoE1AyQ%2FkjuubMM1XfcKlURiIbDAiBBLJnC%2BaeS%2B5tmTwoTSZrxee53FWQAt%2B5Zj3IazMlM%2FyqIBAiq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMlTzQIRFpWNLPzIcpKtwDwVj8M3NtCOctbFnZ67F8LMnfWLrMOMx1P5%2FgFH4jiZojTHLF1Kfj7xxosESkbg2lZS8y0%2BXIzK90adIqyAFPxI8nnjHKGsH7Zw%2FEZbYhLTOwYzBVd6Uso7Qpuo6rNZ%2FBAVvuf%2Fk5ELHPgINWV5TLincTlihjzguviuj1D8pFxvtqa%2Fo%2FRF8tYrXt2%2Ba1R1PiTS%2FpzK3DWaia9c0TcHey0%2B%2B0x0CapSojgQq%2FXMOhBTQmt78E7oi3s%2FxHEpbUwMhcjPN%2FuvL7oMV3zf9LQ%2BV9P6%2BBLW94duGtaSpNb6zjyFb8IpxIuFaWzQUmMZ6OSbTJicG2vEzSAHJCr85PCp1Xn%2BJgRMY5C5j4ZyLIeAU0f9owGZLtO0dPYzUTxkRWHcbnnIYhg7%2BE1mFGcIyZ7NCfDe%2Bl9ojYoTy%2BdHfgjQysnBfJ0vbEsBfnY20Zn5Em4%2BjdIhPiWq9%2FLxYCzZJLDi06NiuMCo8tdEQ9ksXXP0pjc7xbMOtXRklt1MvBYv2OygmmKElZBhsntAtULeTpEetcbig5Ba8gEQEfw5Ble6iM%2Bj6Zes1dyNo%2BB7PszFy6kD6jCISJ%2FJqFPdH%2BO1%2F%2F4MggVCRIIaCBTG5CmksLMFATw8DOesy3zeXAg9hapjkwhcfMygY6pgEy%2Fu%2F8N%2F3Cv9RtQfu5zfmljoB7Bwe%2Fw1Gus01XcACyiJgxWKSqo7qcW%2BpPP6nagslS6fajO7xBJYw3fMysjn%2BJkWrZCI6Rlx1VoOw2nXF5pjEXpHpj6QoKY0Q47VKFn%2FN8LersX9U1avS8I6HtJIjo4stWNcVxqSn75M4vsO%2FdeXdY%2FUWIwklGDHLBDB73MKO0DiJMPtxZFq4nVGE3i61USpOiCw1z&X-Amz-Signature=df9392fa45914f10731ac1055a0c222a34c58b96a5e82d82420271005da4c9f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SU4PH7DP%2F20251230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251230T024822Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDk8%2F%2B6PrHWy9T21VJoE1AyQ%2FkjuubMM1XfcKlURiIbDAiBBLJnC%2BaeS%2B5tmTwoTSZrxee53FWQAt%2B5Zj3IazMlM%2FyqIBAiq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMlTzQIRFpWNLPzIcpKtwDwVj8M3NtCOctbFnZ67F8LMnfWLrMOMx1P5%2FgFH4jiZojTHLF1Kfj7xxosESkbg2lZS8y0%2BXIzK90adIqyAFPxI8nnjHKGsH7Zw%2FEZbYhLTOwYzBVd6Uso7Qpuo6rNZ%2FBAVvuf%2Fk5ELHPgINWV5TLincTlihjzguviuj1D8pFxvtqa%2Fo%2FRF8tYrXt2%2Ba1R1PiTS%2FpzK3DWaia9c0TcHey0%2B%2B0x0CapSojgQq%2FXMOhBTQmt78E7oi3s%2FxHEpbUwMhcjPN%2FuvL7oMV3zf9LQ%2BV9P6%2BBLW94duGtaSpNb6zjyFb8IpxIuFaWzQUmMZ6OSbTJicG2vEzSAHJCr85PCp1Xn%2BJgRMY5C5j4ZyLIeAU0f9owGZLtO0dPYzUTxkRWHcbnnIYhg7%2BE1mFGcIyZ7NCfDe%2Bl9ojYoTy%2BdHfgjQysnBfJ0vbEsBfnY20Zn5Em4%2BjdIhPiWq9%2FLxYCzZJLDi06NiuMCo8tdEQ9ksXXP0pjc7xbMOtXRklt1MvBYv2OygmmKElZBhsntAtULeTpEetcbig5Ba8gEQEfw5Ble6iM%2Bj6Zes1dyNo%2BB7PszFy6kD6jCISJ%2FJqFPdH%2BO1%2F%2F4MggVCRIIaCBTG5CmksLMFATw8DOesy3zeXAg9hapjkwhcfMygY6pgEy%2Fu%2F8N%2F3Cv9RtQfu5zfmljoB7Bwe%2Fw1Gus01XcACyiJgxWKSqo7qcW%2BpPP6nagslS6fajO7xBJYw3fMysjn%2BJkWrZCI6Rlx1VoOw2nXF5pjEXpHpj6QoKY0Q47VKFn%2FN8LersX9U1avS8I6HtJIjo4stWNcVxqSn75M4vsO%2FdeXdY%2FUWIwklGDHLBDB73MKO0DiJMPtxZFq4nVGE3i61USpOiCw1z&X-Amz-Signature=df9392fa45914f10731ac1055a0c222a34c58b96a5e82d82420271005da4c9f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664EXDQNJH%2F20251230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251230T024822Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFvpLFdPT%2B2nUoR%2BUdirKhhbmDUakh2dD7YcgQ6HPhxIAiBCvNMFw9u7vMAhZmtu8fCUW1pNwGYvbb%2BwAnA6Z6fFFyqIBAiq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMSHSBMGmriLvuzuEcKtwD8Kq7S5huQjKBV%2F4zLede0%2BdwebWmNFIN6ERpNeXteoVuu6bps6UI9qANCBqXnCkz%2BOkIiejAMeK7IuDdphqzXNV%2BpTp3BrZXWqdGneidxI%2F8kZdMjeRLZaukWaDfXYt6K8p%2FOxyaTrmZNrTHMOHlXSsp3tMQGpW%2BEeCghMaPyMP7knH204e7jxHyZgNVh2HpaIygrxSVlaDScAX2wLdRudF2g8IA8YPY8w7mdA%2BmYRoLuiswLXYT0QxJAGBV7e7Phuaf2MAw4SDbu4xufLpLcy1KZvHklMa3uADsVYCig3gb8s7qtp%2FGyLiPSCGNKxR9nwsn8e2PhU0IJ6%2B3IhreZkkqja5TpgdDXi4ZxMDQCsQ11MZ1Hk4nGb4q682AakgpYiITkjwNMCdj3mBk9W6oZPgWf8zdO3rmM5xnBIbvQQei3XTPPuSpGmyLQFbBgM%2Bj5CQP7IJnVZzIb4zOIzX1LEw%2F1Zlk%2BXOz6b7wQOt6W4nVCqKKSMz7AmgSnVqvoFhrCW60Hb2C%2FqylB5122zO4Ql%2B39Jziur7%2BIzPUc%2Fiqtplo1Tu4gBHoH5eXBPgcxzkksOVcbScyrEiRvjXrXSMI60mXYKCfvRWCjvt2f2BUZ%2BXPVe7fnZtXhHEIaLswv8jMygY6pgGoFwSAuQD7HkWVVknvfrzknEBVEOVNfkX7nN9K%2Fe9h%2FQ7%2B3fTeupetsv7S%2Fu%2BobY1nYJqRI07yXkeMSOdfb0rl107exe3LYL1gVp6D9cNy41mjRldT0lirVv%2FiA7Pt6ZZx9clfptqnxLV3ZcBoscj%2Fp4N7YK44ycHfQUF2J4duId43PiD6YIsQIF4BTFU1%2BEHo%2BnDYdcN%2BvUJP4uYYZgfK%2FWBVRFKG&X-Amz-Signature=c584b5432e60504706770cd55251cad610ccd20ff4b2bdef853c5ed432742e9c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

