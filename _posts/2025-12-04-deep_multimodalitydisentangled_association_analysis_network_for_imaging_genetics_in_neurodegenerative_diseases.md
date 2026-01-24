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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RCNIJ4NK%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T035258Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIHVkOBTuLu55076tAvEVljChSxrz62C0QBLdhFZtQgiZAiEAhcLOqgahQt8ON26r0JxSx9oMh76s9T1xs26C%2BfMbI8Uq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDBhI6SwWWyr0BlsvLircAx3cPxAZ%2FGNXG6jz1XD5%2FnMTB3UVTzaqVifVmYEToTRGS7U005IICoEh%2Fl7n2mgpnDx7RakyZIvJlOg%2BQZ%2BQJxRMwyD1c%2Bn1k7ZzlGN2Sq5Nb53sTS8ltIwhFXVLUDWUfFYoGmezbVyhg2T2Z1IXrx75A2Zql5eO%2BYNiLEVqijm1XervLGrh5CfruUHX3k7lqwk2WeZo%2F3kSahg0l%2FOhiPCae2%2BiTyQQMqYq5vYxITEIoOnqrFpPDVkDrhniv4iX77%2F2fPHFX78nGF1fNwNRkxLsAUGvcE4BQ7CQubZzjVx9oxR%2BcAYE7gojfaPdsXtvax%2F0ze8xhtKPjO41Ueujkt1dMiZG4rZJ7fS2WIc3Mg5fh9nZQ%2B9dDvrWFJd5XYkXaDYKZFtcPBCdhmEQiME%2BUmthcVEp473NGXAREAUv6p8CitHzfRFP0YMB3BorMCILm4dvId5ApTfdhR2PTMVkBvj3L3geBhAnkf67x57omNh2tbUz3Hnp99UY8j97LCWqjXilh6ODaZiIH2FKeFzEEvswMtRzLfJvFWSeDO7iTeptzxga9NYppyMI78luOkQKDKgpFc%2Bda5Llg7yLEA5WCsVA6wViM7newSsHXjNEO8Xi%2BzhkqZuUazZbctSHMOf80MsGOqUBy4NnHDi6zKdVixakcI6X6DO2lUhJNn7DH1kelP5eifreUhGAEr5gkvxF0Oj4faSzWo8R9ZkWiqDcNfMKFqfTjYG%2BdnzM%2Bd%2F0YuYJJ4qdTVFCCBbBNzjcMFuhaAjFoduxql%2FfpEbrs9un%2BPxCSdGJkV1xUQEBjgSKa2qRPg5CRPBbA%2FVeOpGnskJOSbUjaQ%2FaSdzMgE%2BaiV4brSCUFtCjHsu3xqfY&X-Amz-Signature=10c790b109230bb76455bfbcad80c2038794ab674f2e7560e89daa54934686dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RCNIJ4NK%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T035258Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIHVkOBTuLu55076tAvEVljChSxrz62C0QBLdhFZtQgiZAiEAhcLOqgahQt8ON26r0JxSx9oMh76s9T1xs26C%2BfMbI8Uq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDBhI6SwWWyr0BlsvLircAx3cPxAZ%2FGNXG6jz1XD5%2FnMTB3UVTzaqVifVmYEToTRGS7U005IICoEh%2Fl7n2mgpnDx7RakyZIvJlOg%2BQZ%2BQJxRMwyD1c%2Bn1k7ZzlGN2Sq5Nb53sTS8ltIwhFXVLUDWUfFYoGmezbVyhg2T2Z1IXrx75A2Zql5eO%2BYNiLEVqijm1XervLGrh5CfruUHX3k7lqwk2WeZo%2F3kSahg0l%2FOhiPCae2%2BiTyQQMqYq5vYxITEIoOnqrFpPDVkDrhniv4iX77%2F2fPHFX78nGF1fNwNRkxLsAUGvcE4BQ7CQubZzjVx9oxR%2BcAYE7gojfaPdsXtvax%2F0ze8xhtKPjO41Ueujkt1dMiZG4rZJ7fS2WIc3Mg5fh9nZQ%2B9dDvrWFJd5XYkXaDYKZFtcPBCdhmEQiME%2BUmthcVEp473NGXAREAUv6p8CitHzfRFP0YMB3BorMCILm4dvId5ApTfdhR2PTMVkBvj3L3geBhAnkf67x57omNh2tbUz3Hnp99UY8j97LCWqjXilh6ODaZiIH2FKeFzEEvswMtRzLfJvFWSeDO7iTeptzxga9NYppyMI78luOkQKDKgpFc%2Bda5Llg7yLEA5WCsVA6wViM7newSsHXjNEO8Xi%2BzhkqZuUazZbctSHMOf80MsGOqUBy4NnHDi6zKdVixakcI6X6DO2lUhJNn7DH1kelP5eifreUhGAEr5gkvxF0Oj4faSzWo8R9ZkWiqDcNfMKFqfTjYG%2BdnzM%2Bd%2F0YuYJJ4qdTVFCCBbBNzjcMFuhaAjFoduxql%2FfpEbrs9un%2BPxCSdGJkV1xUQEBjgSKa2qRPg5CRPBbA%2FVeOpGnskJOSbUjaQ%2FaSdzMgE%2BaiV4brSCUFtCjHsu3xqfY&X-Amz-Signature=10c790b109230bb76455bfbcad80c2038794ab674f2e7560e89daa54934686dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UW3P4SYX%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T035258Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQCk6xibMY5fH73RdfM4jV7l%2BpKg3n9BziC2EXW1fWr0gQIhAN4l3xTB%2BvvaV5B4qmoQwd34dACUckEiq7F7v84Tw5zHKv8DCAUQABoMNjM3NDIzMTgzODA1IgyoYrr60fQMbEdC9D4q3APWkXtmt33vEyBoTNOuYrUBO7W7%2FCZ4FLS3cG0WVDM42YwKbUxIWFagyKxo5cisenwJeBZpbClWj0UiVF3siBE6XEQdU3NJpoo9WTPV184oed5mQelRCMtbVGpPXtyePJ6dvcGrOdcEX9XlriRk5LScEmv3YILYT59trBDdHfus0kehX57GoKmnJgVEinetmZ%2BlcvLfldcGMRNHp1np34mKcRAPLuU88YlRY6vfpD%2FxiYBRzjxhns9JkFhj%2FA51OzodibjyejSt54dmCkTGxEnTM8TPEJxwyjr2WB7naqBhFK6zrkfl9COT6%2Fkvf2Ct2lRJ4oAzK6NC5pi1yxnpy%2F8QOLHBImWpWL5%2Bh2kcCB8zvOJbzAla3g8CcrrzQEH2454X7CUa4gcbjyjfFdxqUSE4MBqQUJQYYAdeFYLXS%2F6n%2BD4dONda4tQOGqeZPJoNyKWwDDtdJrgHc9vRhEcSSXIxxiAhs5GxMrxqgUjxbqUFAWGC%2FAChO8Yrj2Nl0jeGky3F5gJiBfpWWffp%2FVD0BKQaqHw3dcu%2BagEgmV9VKMjsEpAWiHcLJD%2BLsW0EWRvMkq530sCgv5Y1RxzfuR5dUbLAlb4eAW%2BtIIySL7iEiKwNE7rnKDVcMbDf2xf6mDCj%2B9DLBjqkAQhGsaYZ0bqgjlqgmcutas%2FAdQ3NTGvolbnmQo2IYcG3a6BkGU%2FQnfCMsrBirbeJgnopCRepgbJte7WfynseHbxI8dJemlQdqmcrOWiBEPia9xqyIg8jYtuc80r2ghc1uTeEzBRBL%2FsLMPpECCJpEjB05NDKN9d6zgs6mSpOVAdcLC0WuxUN%2FVtvptjps0tfR3cem92hSfGWT%2FJDZrA3zfFOwcGM&X-Amz-Signature=7fbba1d6301509c41f44c1435f57acf2ca69fae49cfc1f5f4952543c3e0adbf8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663B2HVEJF%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T035301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIDkNjKNQEwDBTD3dCo4zQHsgKdOYxPi%2Bz%2BaJfkkI2z5PAiBfLEqlKQI0BDDq77wEnRsOQEKO4BRCMdwaRLTLug9Z4Cr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIML2zbOXeIaXqCnIP0KtwDxDaJsd%2Fe9UDvovDt5OmVxRC%2BMVg9rQ3WVdXUsHqFPQSLatxZNXQnL8kZP6g2yQEGs%2BsJLQdFtTjaW093x5itIzoENJltThOeaPaNu%2FctfXt4nwt3C%2Fzk16kRNC33xZ4YvLZQDsuOHF5fCHYsEeOOgqXGNvBxgJtXOojyQNK2vVtyvM3oEH%2FhrXfvGUS2RaDwHxalvcFRvNTLDxe6C6eKYPyAZyrsElVt9Rb7r9IueOjcV%2FYnTeClXJITC9dtVepU5LYXrRFd1jHZ%2B1oEWD4aa01qB2NeULx6FnZ%2BblVFdSIU7oprNB%2B1dKwQG%2BquxKYjHbdt%2BnjjYv1ekhpRuWb5smeAy7WzZCAlbr43c9aKyKIzlM0QaSdkAeYlDSlHWg5DKqnuAryQGHuVRMmq5qMtZk9%2FOI6ZJTPn%2FprtrC2qC3Qiq%2BLw8oat3EGNy5MJ3QhVliXUxdkAvQYUGLihrMmVgH6LD3ndEui1ucFvgLoHxKa5mfrH4Jfai8n5nzAX2R3vEIAgJADbo0HNM%2Fz2wNBbDtcTsFp4fqK3LiiiSRN2jYdS5S1zTmqT%2Bohc%2BRzbrBMUy%2BRSTIn35zg7tRkbZpjYsefJ5CiMM60PaAq0PQpExZvpgLknsom09MgJT%2BwwwfvQywY6pgFGRziWFbyEvqAKPHAwutN%2FRHzgQamvyj6EelXCCILoz%2FVeSV%2FVZmew33YEutVN%2Fnc0o%2BKIo6Z2Q044WBaIb7S%2BzCeBrNU6wFP62Ldqg0ZBQRNQwUxNhLxfFGIoiDGDhqB%2B2fXPBoRqQO0BHEMASmCtvCmowRBj4bFs1JptP6%2BUTs2at8RE4U2osSMd1puQCCU%2BXx5naAPLIIsVb8KUEiliCHqWoLNj&X-Amz-Signature=9a110f4a224bccb4f319d86f1fd3697b59c16a4209f9184b90628e5649f6ba08&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663B2HVEJF%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T035301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIDkNjKNQEwDBTD3dCo4zQHsgKdOYxPi%2Bz%2BaJfkkI2z5PAiBfLEqlKQI0BDDq77wEnRsOQEKO4BRCMdwaRLTLug9Z4Cr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIML2zbOXeIaXqCnIP0KtwDxDaJsd%2Fe9UDvovDt5OmVxRC%2BMVg9rQ3WVdXUsHqFPQSLatxZNXQnL8kZP6g2yQEGs%2BsJLQdFtTjaW093x5itIzoENJltThOeaPaNu%2FctfXt4nwt3C%2Fzk16kRNC33xZ4YvLZQDsuOHF5fCHYsEeOOgqXGNvBxgJtXOojyQNK2vVtyvM3oEH%2FhrXfvGUS2RaDwHxalvcFRvNTLDxe6C6eKYPyAZyrsElVt9Rb7r9IueOjcV%2FYnTeClXJITC9dtVepU5LYXrRFd1jHZ%2B1oEWD4aa01qB2NeULx6FnZ%2BblVFdSIU7oprNB%2B1dKwQG%2BquxKYjHbdt%2BnjjYv1ekhpRuWb5smeAy7WzZCAlbr43c9aKyKIzlM0QaSdkAeYlDSlHWg5DKqnuAryQGHuVRMmq5qMtZk9%2FOI6ZJTPn%2FprtrC2qC3Qiq%2BLw8oat3EGNy5MJ3QhVliXUxdkAvQYUGLihrMmVgH6LD3ndEui1ucFvgLoHxKa5mfrH4Jfai8n5nzAX2R3vEIAgJADbo0HNM%2Fz2wNBbDtcTsFp4fqK3LiiiSRN2jYdS5S1zTmqT%2Bohc%2BRzbrBMUy%2BRSTIn35zg7tRkbZpjYsefJ5CiMM60PaAq0PQpExZvpgLknsom09MgJT%2BwwwfvQywY6pgFGRziWFbyEvqAKPHAwutN%2FRHzgQamvyj6EelXCCILoz%2FVeSV%2FVZmew33YEutVN%2Fnc0o%2BKIo6Z2Q044WBaIb7S%2BzCeBrNU6wFP62Ldqg0ZBQRNQwUxNhLxfFGIoiDGDhqB%2B2fXPBoRqQO0BHEMASmCtvCmowRBj4bFs1JptP6%2BUTs2at8RE4U2osSMd1puQCCU%2BXx5naAPLIIsVb8KUEiliCHqWoLNj&X-Amz-Signature=43da5c21ac877900ca784bfc8c25e3dfbc408a312dd264d7dcbfd5a085774cb1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46632YRSNI6%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T035301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQCtrPVq5918gZcsYMigBwK2Y8xZ5ZdTqSaLO9G8Qed8ngIhAJYK3bhTFC7%2F30Ivqn1XjOOOVmqsLNcZ9PeuPz6lsHFwKv8DCAUQABoMNjM3NDIzMTgzODA1IgyJJa3mqGwNsbiAx0Aq3AM5GTsHqrk2d9itAE0mjkOVGdopdRlNfHBD5%2Bm%2Fqm6Sa1pZd7Nwdd2%2FbH6dXjBLxTJJbyXPSAlv39I1yfJwCKYNzI8A9rp%2FNuzGwK91%2F5Lgj%2BXBOuo%2BG0VxpilgVv%2BKGykzs0DHshL2ur8zAJCaISvg7D5lLS4piHFrfuhf8nlRi%2BDwvVAoM7a3RLvV347tDEV0ngcER8nqrIW%2BZbuC5LJRAAOU7xUFVAsNpKT8HBrlDUE%2F3YNhc%2BwEW7rH4YQcxcpAdG3y0jD1lYlYuPvsD1AmFSnKVf2KjKY29pJy2Z0l7xNdOMpsAgrf9CqO%2F320HnEdCWFZoj7PYtPSbDeFVkbZys7K7pUTzgobSS1jzjndb6ZibkpHIA%2F0vnFcioSQV6%2BXtZrSetgSKZgWqbjt2DdyLrP1du81KFjUJGPMrs6t1TE0jUxNY7UreVw09V3kMEgBSLgMrj8504v9xvNFgoIWX2OpzLl3f%2B0RvGB%2BHJmRzbQYJZMzaKB5O6TPCnupBBUnup51xawJQBsl9N8B6k6VGXhZ1c0f%2BVAMJtfMAq%2FJ4eQhW2dE4YxlS0sF1qsiUsI8xl9W29a2WEUaAbMDhBUoAZvW2i%2FRNiLGDN3AMSIU1dy1hPCC7ySAWiKYdzD0%2FNDLBjqkAaIIdMK9NDrsaUs4RuCOsuvUcGOI2p%2B%2F4RGiLq5TCt4VFa0XNC4rjkwPegeWr9Ihssw3Xpc2AUcsW7OiLj%2FmYTXCu16p6kdRHyFskoP2h3sQNSaqpz20q4lbKzmYpJTlLq%2BEEAiuSxT7fWTLwzkzWMnype8xSCwyeVaXsgzDIDhzskv0VoY%2FrGbWGg6wRVOZMhHFLZHijUz355rSrBcGn%2B2bwHYb&X-Amz-Signature=4dd33f03b8fd55781dbfdad31cea29059c6e55226a1d9ed8bc77be3243585207&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XV4DRP7H%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T035301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQDUmWG5OXwJEQx4zcRiYU%2BDrDiOXhnzM3tgP6I4nmr9fwIhAP1gmmw%2BMHLJYGreKxiZDCxt9fIfnG9TWBKnqSRH3IBkKv8DCAUQABoMNjM3NDIzMTgzODA1IgwGNteMunnYnGgdVo4q3APA3yYyFOPcav2o7%2Ft5uIF19Az69%2BNxSi0mgG%2Bo0R9hxkKRhJE1le2CgYbpCjv99P6eDlYHb92E6lPHOldOX7UjRLaf7LF4CML6Lh%2B49YORX3edOnt3IY9cXi1MojygH%2FBCCFsYO1JrRFWc7RQvvFjiT%2Fb3Ki4b1jMwXJIYq2IdnKzf2bC2BUhcaee7d8ukK1UgTBuRbTvWeaQpqIO7vwr%2FTSDK%2F0xKthQ%2BsSDqBVruPfqFPQqRGUBPdwSrGfzStzRtSx3RHCD49Z%2B0EpNHVmuxoGeM%2BdQGaM8YdORWu7tVaNu3EqRGuJ22ic3a4BZhGdXjtxvJgutbg%2FLEgqamk45M8R9f0vJXHc1nuJ%2F5SKVIWqwERgjQffUT38vZjADMebgrhunGmqQgxiOrrwset2JF%2Bs6DEy64CWNv%2FMxREisCnZuKYBCbUf9DMzpSsrJ5n8VW%2FpM4otaagwiaGcyh0y9BfbVgU9fX68YWe88sqjQhEnM2%2FEWIfCKIl7ZQWSWNVmwX7RZ%2Fs6qzxtgAM46lTcXK%2BnYd%2B6K4p99jLm3GspDNkxjhHY3MdAnHCAwjSdJ%2FcsJckn9%2BXhM1Z%2FDQNZ6X89bKihN1oN8NgUy3Jl7102JX7XuhBSVl%2BFdsw568uTD0%2FNDLBjqkAdqQ5TutO2t0TpskVJzg7WBAhLVgx2U92sIb%2BMbETSpwnkEJbLzArC6jnsMVWxL0jvltz2kY6GHmT%2BaC8g8uIsafTaBKyeh94NZcdi2ODbOQNsuYZjhwg0Y2Jb7%2FRF5Q98UGIjpSX856A%2FtggdTlm35UAHcp8H2TIOGBfG%2FRce9OkzcXDKVNZyH6lWaSS9L5DMw1nVHPx3pCQHzuS8C0OhhylRYi&X-Amz-Signature=49a0b6a8abe0d6e3c74646115c203f68ec8089f6c09d66ff087cc31874ad2190&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YHMEG4JG%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T035305Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQCflJJdXFKG3FzwjT1408tj4CnmfUboX0n%2BlHbthsL6LQIga0gRd%2F%2Frt4djt0H8nDI0t%2BN%2Fs6Hs0PVvnIk7IXd3xo4q%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDDMNBaAKYKhrBCP%2FxSrcA74LwVSMhCqS460ve1lleEw9PhjQd8c9brwkwobHUQkRHXN2IYiHrkUqfvK9ndoNrgSsmWdcJHjjKbdCu6egO1xHamDvPXQySg3aVIdEMeW5R%2BWf4HO26oD7QgJR3F4G81UMSnmHKCDQbr8Tn%2Fo4QkLA9s45%2FM4AfVWvER6ngmNSnCwoODYyzwPGg95KlP4Zb4ifO8NFR%2BYc86IT6REEktSoa2evuNJK2o%2FCHQtCeAzX8MMEIwH%2BSEcslCQh11x5bPnKIdh%2FjsXjVomo151ecR1zQAx6XN5F9trGjRwzf2sufVHSZyfDTxPc%2BShWBN6QPmGveq7QaUjO0xaDPUcW2ZScWAxn%2BGUrLLni%2FqFhC6HyD43FNuz%2BmfSDqeqwy1v6ORNMESj6c2%2FHnNWQ9NiXplfE38et22Ky1lPrLSqvR1Jkridlz%2B0pkt%2F%2BibdF%2BKSwrbAG8VW6WjL0dPymFjt0v5TqljX1bMtaayroUCvEw7Z6P7d457CSIvXVBATOPVvn4%2FlaHVApPHWSM7kiJYqgOd5nNDMuHSPyX5sSctHuY2iIi11zds4jZ57wqFUk3%2BR%2BmVQHqmwVsDHMHAoUFffIvwMZvT1igd5%2BSb0KLn5Fh94Qab%2B0Yfq1eJB0UDAKMM780MsGOqUBsi2xpLX6sZXlc7HfRDNEC1cny2VWmD%2FRMGqGCSQv9tr8tBRuINgUQfXXAL%2FgtVvHjd3c8o%2F5qhaRab%2FHMoczj2u3agtJJuvmjust%2FNZ%2FuGcPA3amIk6ZADrMmhYRdTWP%2Bcp7UlEm0xHQB9dncLA3rp7wzHhDU5fVAQDY1IPGbb8DPL7lrYeqbBZqyBJlCnn0iAOrz9zZ2uEjqpL%2B2EJcG3C0Q6IF&X-Amz-Signature=c8de8c60c220fb3197da63321eea3afb432d06bd7ade5966a3f18db164e3c42e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46644HCAKK7%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T035308Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQCVwQwG2WEXZ9A2tokD%2FWes66wm2ZHdl9kfWWPMT%2FjJgQIgRwQeL9zwYOgqq%2FT7nVYBO%2BmrxTy2MFw11pe4YQ43ebkq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDJfY18xkK8ah21fwwCrcAy6wqsTnJJnFk1DSXelypSx13tqeGnAfQr9z9YYvZRF6g42TQZucbj6EaSVK3wMDzEWnPlXMrmmMylAWJj%2BC6d94LrenI0tfW%2BPv0k4vwpWaT1EfUtCisWnTxft1%2B6F%2B1IQB8EyJmlYiy3CSIAhVyAnXAFpNDrq22hK%2BidhW4ybm5b4ab1gRvG7wLhiBIm6jpskQrsV57Fxf5L2tEoVDEcS51xd0wvhYJDMUGi3FKHZSHr%2BMRUyXrs9NwgkPX5eLgT%2FgRPODqaQADuRHNjhrelVFRhaiEloNJfu1I0tGY5LG9IX7R4usgg6nyRirtNLLO0rnwdOfIbj0ky2iFtWkaBBTXNUyL0o2GBfAAywxccALhndR90awGf69Jq9V9hCNTR6bPoU0khIhUp7kIsg128hisgVxrVuKV2jXoFDj4o%2B%2B0nIfE2HkRf5Fhb4koeOcpgMdEY2uwMDFhrHkNxhDZ3DIGAhoq054Qa2%2B5GOQmx0mMuSrTCXeU5QKOpVXTIIWQlmUU358gEbKjgceMwTDzuT8QkoI8VIp2HhktNzmOTn3aPQHu0N%2BRYmcAwp5ry3RJM%2BP44620H%2BN0L2W4SYX5A1whMUEbI8cBlafTr8loIIZdqt55eKrTwjKHWarMND80MsGOqUBDltxgyluSgVeQUD1eeEwEjq5jBXcjmvm2VoSw18BJgCppshnWJDiQpYhfxNtpU%2BZWuUQdItoY7gxmkqHMeRzEZ%2FIS1yE0hcsSGmmgQbfZSBMMnabT61qZbpiKUVK3v4gP8Q6Gl3US%2BTZvFQHr2IfYkFW44aKOp7EshzKuCEhRUByY0l%2FxEi7lfxHaIWpjVj64xJUaA%2FTxfQoIEh6HHpLMlH5EiGV&X-Amz-Signature=60ea7a85642ce05efcf7b62d3ab3b764e332409bce06dc0c5b336d472bfe01e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46644HCAKK7%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T035308Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQCVwQwG2WEXZ9A2tokD%2FWes66wm2ZHdl9kfWWPMT%2FjJgQIgRwQeL9zwYOgqq%2FT7nVYBO%2BmrxTy2MFw11pe4YQ43ebkq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDJfY18xkK8ah21fwwCrcAy6wqsTnJJnFk1DSXelypSx13tqeGnAfQr9z9YYvZRF6g42TQZucbj6EaSVK3wMDzEWnPlXMrmmMylAWJj%2BC6d94LrenI0tfW%2BPv0k4vwpWaT1EfUtCisWnTxft1%2B6F%2B1IQB8EyJmlYiy3CSIAhVyAnXAFpNDrq22hK%2BidhW4ybm5b4ab1gRvG7wLhiBIm6jpskQrsV57Fxf5L2tEoVDEcS51xd0wvhYJDMUGi3FKHZSHr%2BMRUyXrs9NwgkPX5eLgT%2FgRPODqaQADuRHNjhrelVFRhaiEloNJfu1I0tGY5LG9IX7R4usgg6nyRirtNLLO0rnwdOfIbj0ky2iFtWkaBBTXNUyL0o2GBfAAywxccALhndR90awGf69Jq9V9hCNTR6bPoU0khIhUp7kIsg128hisgVxrVuKV2jXoFDj4o%2B%2B0nIfE2HkRf5Fhb4koeOcpgMdEY2uwMDFhrHkNxhDZ3DIGAhoq054Qa2%2B5GOQmx0mMuSrTCXeU5QKOpVXTIIWQlmUU358gEbKjgceMwTDzuT8QkoI8VIp2HhktNzmOTn3aPQHu0N%2BRYmcAwp5ry3RJM%2BP44620H%2BN0L2W4SYX5A1whMUEbI8cBlafTr8loIIZdqt55eKrTwjKHWarMND80MsGOqUBDltxgyluSgVeQUD1eeEwEjq5jBXcjmvm2VoSw18BJgCppshnWJDiQpYhfxNtpU%2BZWuUQdItoY7gxmkqHMeRzEZ%2FIS1yE0hcsSGmmgQbfZSBMMnabT61qZbpiKUVK3v4gP8Q6Gl3US%2BTZvFQHr2IfYkFW44aKOp7EshzKuCEhRUByY0l%2FxEi7lfxHaIWpjVj64xJUaA%2FTxfQoIEh6HHpLMlH5EiGV&X-Amz-Signature=76537902d85a4d682634fb962c40b1923cfc1e3c2a3784e71c6a289ae274b635&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WMHTQ4QA%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T035257Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIHMFu%2FzqrQ%2FCidbgsCRfC0XlKB1ycsw0G5pw%2BEqzJrHOAiEAzHuXRevq9Ld8E50V0vpO3PxBRFabm%2Bv%2FR6BeNxTf5Bsq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDH5L7ERXiDRXIrrWYCrcAxRLL8AhIEx0lWVEA0VnHZWiS4uVY8E3ZCvaMzMZ6dTkx3BiZf3FlrTp%2BAEywldwnBMHT0raIOheD24zF1qR24n3QD2bfVe2LS0QKIg2fNV%2Bx3tXaT01DjjmfAVl7drKVMMRThrBZskEMeAOdpUNmyLZKTR1lTASfMrrcrOXjSSNgu816aMHkI71QdqwWiE%2ByQl8tSfpBQjxrC29YVvWLastPQi1Icolv%2F3Qlk9QbchaPpGRrMzX2%2BHOUzebn1yAKj2uh4tXU%2BkpkpAGZB2pYCPsnD50Azqnj3SPwANGRgiWhLO6XBJyfNLeHl0vrLiOcaGdcPmJCUVvw9woreQ05Dj4bhVIBrv05oCiS9h%2BoWnJjC1xGgmn2t1ejkS9Oe1%2BC2KW3SN0YCZbnAii1T85PJQB8i%2FgA%2FKh37nE81OVZxOxFt5iyLcA9HzKFT8pAixyYzWtxY8rmYE45eRFYfPuezcR6B0NU3LxU3H8O23qXEE8vk%2BBXVFMQhE3oST0OXtCg2O8ed2TeFfgZ64vk0IVKvsrOwtf15l26%2BxNzVYZb5njBUeJjENtdLGdrn%2Bl71pwZMJGNMFoSySNJBmx5t0hRm90Gox28LV%2FHpsNMni04nDevZLbVX1Za5H99y5PML370MsGOqUBro9PV5B%2BAh%2BofCAneQaWXfyPoOZDiexavgpBmklNg5hSpYoOKuJkn5ng9TLrhPads7sI7yF5xlkjjOtxReIuGD5HhgAp8J4JbJ%2BV%2BVuaZ0qkfx8LYvhwgHJUCl%2FQCearq61Qu2N58h7pNjVfrK82aqxnhlzXyTzG8cGV4ieBX6j8HjwC3%2FU9Os%2B0Orkq15c%2BNyMRU9a%2Fbw0L35mjkkx2%2FZ%2F5VwRe&X-Amz-Signature=e142d95382adefe4480af003df724595314b093be1f86696154e458e8037731b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SI4GQ7TJ%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T035309Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIG6N0Aqeo97IWMBq8IZdO8tzeKWwrahVdHaMlEVtTwP8AiEA5wxYb2E2cu9Iqw6OQUqYtu4l9S7kIRnwg2nBzF0Kv0Eq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDBCZHaiJetcma69F0CrcA6%2F0h0uKCNd2zoVsugrVRF9rpXijXIl39PbFw65%2FQA%2BPwg2rDxV6T7UxW9HpPGPz%2FJmM5y9RtIpL%2FfR0siqM%2FejMDEoYCo4sw8DVzFlQiVPc9x08YKU8eQjdKk0HHa3hD3RUZkJMxtWOMIcF7B1uNgotYm4hTaP4SkdhKP8VdxMcp%2B6u7IuUXIYgf3fE0UF5AStRKcKI3zIXgUN48wi%2FAgqsoaEsBfTKpinfQFbFgWN7CYjv29bmKw9CZl8uz08vWfqrVZcQA%2BLj0vwUDFnNTS7tqdRzytitKhiqSQuxWdwyc79k%2FKJxPbJpxmf0R%2BkYpjN72bCeSFSp21d28tAjzPhF9goSvYTXSns8GDTdh2CcPFbPHAjmAgRFSB74CYzy4Gc0ZiGUpD1frgZ491RjvrGDJCYuzSRVRURp%2BCfBSkCq0oIPUfln26B7C8RhG47Q3drPEDeChVnEOk3NydXJgYG6bVDQnRPuqhPEeLMnjFwqYovxOUsILzAZy2f%2FLhMjUudGt06d%2FdH2eJUtQhLvdfOtoSXuRg3cwgmfD%2BaCCAAsdJph%2B6uIUfgKdjjGvt9tFgRKhc3a4wemkkOvsD97kJDBx8b1L2zn4aWzvD1AnOZ38yvokuhlJ%2BfcyFgMMPP80MsGOqUBCl5zEXhsRHx0vBEJIH4lQYeb%2FE8MwIMZI2l%2FneYDvjyXQgOFLdecHAXA%2BakPdaR1Oy8nIbklnGEkBkDtNNCUI0js01Fer10%2F3lTsPtDtjPI%2BdnprY2btBBNwpAL4KJtvVNoaZKQAJeISkm1HGdDhfKNRO3hHr6qPwWtbDgeP102pYGpLgT%2Brg6SWlbsR2Oct5CwjiaP2mEM37wjpu04G0LsO0rWc&X-Amz-Signature=c6d816fcef76f7971c394c0be45961d914c51b1f0192bac658bf5b605d4bb74b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SI4GQ7TJ%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T035309Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIG6N0Aqeo97IWMBq8IZdO8tzeKWwrahVdHaMlEVtTwP8AiEA5wxYb2E2cu9Iqw6OQUqYtu4l9S7kIRnwg2nBzF0Kv0Eq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDBCZHaiJetcma69F0CrcA6%2F0h0uKCNd2zoVsugrVRF9rpXijXIl39PbFw65%2FQA%2BPwg2rDxV6T7UxW9HpPGPz%2FJmM5y9RtIpL%2FfR0siqM%2FejMDEoYCo4sw8DVzFlQiVPc9x08YKU8eQjdKk0HHa3hD3RUZkJMxtWOMIcF7B1uNgotYm4hTaP4SkdhKP8VdxMcp%2B6u7IuUXIYgf3fE0UF5AStRKcKI3zIXgUN48wi%2FAgqsoaEsBfTKpinfQFbFgWN7CYjv29bmKw9CZl8uz08vWfqrVZcQA%2BLj0vwUDFnNTS7tqdRzytitKhiqSQuxWdwyc79k%2FKJxPbJpxmf0R%2BkYpjN72bCeSFSp21d28tAjzPhF9goSvYTXSns8GDTdh2CcPFbPHAjmAgRFSB74CYzy4Gc0ZiGUpD1frgZ491RjvrGDJCYuzSRVRURp%2BCfBSkCq0oIPUfln26B7C8RhG47Q3drPEDeChVnEOk3NydXJgYG6bVDQnRPuqhPEeLMnjFwqYovxOUsILzAZy2f%2FLhMjUudGt06d%2FdH2eJUtQhLvdfOtoSXuRg3cwgmfD%2BaCCAAsdJph%2B6uIUfgKdjjGvt9tFgRKhc3a4wemkkOvsD97kJDBx8b1L2zn4aWzvD1AnOZ38yvokuhlJ%2BfcyFgMMPP80MsGOqUBCl5zEXhsRHx0vBEJIH4lQYeb%2FE8MwIMZI2l%2FneYDvjyXQgOFLdecHAXA%2BakPdaR1Oy8nIbklnGEkBkDtNNCUI0js01Fer10%2F3lTsPtDtjPI%2BdnprY2btBBNwpAL4KJtvVNoaZKQAJeISkm1HGdDhfKNRO3hHr6qPwWtbDgeP102pYGpLgT%2Brg6SWlbsR2Oct5CwjiaP2mEM37wjpu04G0LsO0rWc&X-Amz-Signature=c6d816fcef76f7971c394c0be45961d914c51b1f0192bac658bf5b605d4bb74b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665MSNNSGX%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T035310Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQDXA%2FU9OfrbinfMqvHWxF2NkCuwpWmra9HzYt8ilPVFMQIgB%2B5AVhlxwz1nIzwQaIy9Ch%2FlWMXb2dJYewE3A18lpC8q%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDMXywKEuXFmWy8D31ircA1GhO50NL7zt8hjy2bfrYopjMkVr1%2BAgOdvdlCdmOm2zafkkHflCCy1O5EywDfrp%2FmJ%2BUD1ttG7jml1cEFZQap4QS3tHI4abPlf7oekqhJlxvnQHXOzQ7pJBnvuSr%2BFJjCM%2BNJqWrzHULUfT06utLWMTrvp7lxkXaLGPQQ%2Bk9CvzGOVOV9L90kW7%2FeysU4CdVyHDlksKp6jHELBzFKHPLd1%2FCWFe1GCirKVOgoAL1fx0FnqJgbZdVEzy2Qd9NbbSHjLVA3C9Wf5%2FxIEcM41fPZAxzUf%2FmoUSjFsP%2BnjbBCmFIvOJ9BXPalpQgne9CI7OBJauhksP7OWDJvZzC4Kqr4JadPKxUDaWKVrDYQBE5YlxURCu2ffXNmDEJLwCeOSX4JyEsx%2Fdn1nb%2BgsB0TjEkzwseB3E8hezJJSqaguP0ig7RSajsZKAwysKGN1aDRlMdHUp%2B1tU5QnWZOF%2B%2Fv42rp2JSxzghiwmv8%2Bx%2FtHG14uRPTiHBm%2FhN8NPOnAgSEn6TX90rv7EGtwxDF76dU25xHattcBuicDkfBvcJ%2FDoqWmWhZ5ypBger%2FXkthQ%2F96tFUt9iW6NOk4Sfh%2BCtflO9jwHyOxGHvo6HLDcLbll32Ls1LoKHHcmqYzu5WRorMIf70MsGOqUBP%2BBohvFuX6kqgQX8nIygk1Vl6%2FJPzVi7RjDH4bjGsd5xRCu7DavymZomQIrwatNN%2FLJmhurFVOh0LaQJ3neVpYOPu7RXRv3VhWDLRahQ7LXf2FPtNJj0FvZBjBKwFjfACaIioboQCx5i%2BkX0L81G8a3EFNs3zP2bwY8fvEBNzEwp7Q6d7x11CPUB0TjL6LDjwZEMacmXJuHqI0UcRqAN6FhZaM0Z&X-Amz-Signature=b8f34a4297d6f54c1aae1b9774e1899e3308ebcda9ecbc7306b9ac2add86762f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

