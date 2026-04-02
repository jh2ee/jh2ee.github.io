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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665CAPSOEY%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T154535Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHJiABKfYlRbV1rewuSy8YWT2edAU%2Bp9HhtgR38IlRiLAiEAsf73gIkSfV%2FMenIX%2BLv0GJLALelO88aYqAJ8RyQmxQMq%2FwMIaxAAGgw2Mzc0MjMxODM4MDUiDHaWpqNXgJ1y%2FDFlMircA4bJGNQtqXxUTmKhy%2BIXf3WD1nych3diImsFAeOwflsErQhEF9sqWnEdt1fUa4wuDH1ntPHs30RJdDlJO8OMlDhAu6%2BLvfupE8HSFH488NrRrf5jJ8EKPJB0JuAoZhyEgZY2SVQJVhWkAyuYHcIq%2ButYP96WZeIxIseOafVyFGUW91UJ6nWG8hEwz5K%2Bz%2BUVLTw0BdVEfT1I9mnbblH7oYPvuUgyL49Qu5j0nMguVJkB41lPbcY0KI6EdL2pHjvIKvyMNXdO0on%2FuGwNAdBRqdjN8trvEPEr1lkOcpl7G4m1XVDFp%2B08iRdp87zPVof%2Fun5arNJFtiqzPKx9aNm98AGFhD5mpho1LqN8xPONfIvZtEAm0QhEkBd4obHyZycpTdtlhxMZSiuhcStucO9fnutt%2Fvsip%2BpGVXaM6bYxBNtVadKBzMexMCB6pFuRh3jldVnOGkBlN56QXyyys%2FDeLgs2A2mQSXq5bmVPfCZgASZbAO0DthQPK2FQimFhwD%2BjMD4ivID0etn5N2YUCcsUNwAADehGwkvcFPdDYhztQqaT6qhpAz4T0CXmtPMoFLsTs69jsKHDdLIIDSZKuglYBahJ6vc6TJxAcW2wtYdRQIrCN6vshMMKFlfiUWxoMJ%2BEuc4GOqUB7CPTcVHhhsASqpQS5kfeEfSYrKcBoZUUbeGlKEH%2FFa4EIEbi7xTCFupevcruPDKWQOE%2FQiIu8ywrZkH%2BnGAOFAbNh%2F3PeqzKPotNMHOIK2BU%2FbUPR3eHWRolKCSrtuMC9Jb6qt9QE0fPnSqpwMVmu8SKNtm%2Ffa1a5Ld0DBdvzMj8DvxpG%2FWtwE9izZJS528C4T34bJDzL%2Bh2cZD0443hgTVXjFi1&X-Amz-Signature=75d42dd9075c30a216de8500ba796b9e96f3ccb06d8ce71ffde586a031129c8e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665CAPSOEY%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T154535Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHJiABKfYlRbV1rewuSy8YWT2edAU%2Bp9HhtgR38IlRiLAiEAsf73gIkSfV%2FMenIX%2BLv0GJLALelO88aYqAJ8RyQmxQMq%2FwMIaxAAGgw2Mzc0MjMxODM4MDUiDHaWpqNXgJ1y%2FDFlMircA4bJGNQtqXxUTmKhy%2BIXf3WD1nych3diImsFAeOwflsErQhEF9sqWnEdt1fUa4wuDH1ntPHs30RJdDlJO8OMlDhAu6%2BLvfupE8HSFH488NrRrf5jJ8EKPJB0JuAoZhyEgZY2SVQJVhWkAyuYHcIq%2ButYP96WZeIxIseOafVyFGUW91UJ6nWG8hEwz5K%2Bz%2BUVLTw0BdVEfT1I9mnbblH7oYPvuUgyL49Qu5j0nMguVJkB41lPbcY0KI6EdL2pHjvIKvyMNXdO0on%2FuGwNAdBRqdjN8trvEPEr1lkOcpl7G4m1XVDFp%2B08iRdp87zPVof%2Fun5arNJFtiqzPKx9aNm98AGFhD5mpho1LqN8xPONfIvZtEAm0QhEkBd4obHyZycpTdtlhxMZSiuhcStucO9fnutt%2Fvsip%2BpGVXaM6bYxBNtVadKBzMexMCB6pFuRh3jldVnOGkBlN56QXyyys%2FDeLgs2A2mQSXq5bmVPfCZgASZbAO0DthQPK2FQimFhwD%2BjMD4ivID0etn5N2YUCcsUNwAADehGwkvcFPdDYhztQqaT6qhpAz4T0CXmtPMoFLsTs69jsKHDdLIIDSZKuglYBahJ6vc6TJxAcW2wtYdRQIrCN6vshMMKFlfiUWxoMJ%2BEuc4GOqUB7CPTcVHhhsASqpQS5kfeEfSYrKcBoZUUbeGlKEH%2FFa4EIEbi7xTCFupevcruPDKWQOE%2FQiIu8ywrZkH%2BnGAOFAbNh%2F3PeqzKPotNMHOIK2BU%2FbUPR3eHWRolKCSrtuMC9Jb6qt9QE0fPnSqpwMVmu8SKNtm%2Ffa1a5Ld0DBdvzMj8DvxpG%2FWtwE9izZJS528C4T34bJDzL%2Bh2cZD0443hgTVXjFi1&X-Amz-Signature=75d42dd9075c30a216de8500ba796b9e96f3ccb06d8ce71ffde586a031129c8e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YZSUYLBO%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T154536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDq2uoYBbIM9XIEjQy2kxpQN3DgcypXCoTIXqRnn0k8dAiAsmSyR4YUAQHGQqDu4Oc2m9ayXUEqRWPu0DVDpviJa1yr%2FAwhrEAAaDDYzNzQyMzE4MzgwNSIMEUghf8pvFnCeseFEKtwD8AU8ABzLfSxEg11lmLXniCtcw7ZwYbxmw0Ha0t%2FcalmVRy89wYci7ZyBFpisRWZzMYr1I3myoJILi%2Fosv0528K8DsFWdNAc0wn02d5Gb8Atm6IWsZYHJukAwMyek%2BGC%2FI40wwGRQwC4mH51bbtfbJ%2BcQoDvfaWVI07W%2B%2Fi9jW3LJodtgk5xTiiZUa0AjlVdhrJMp%2B5P1w5xjZnWGponvmeDTPJnPk6GASP1zYVDo7Aiz%2BT%2B4OVmQvxetIjh63%2Bm7cQc7%2FURlLloBVXp0DoIHRJTePwdNypKbpFIywN3dQYUqRtZw0zT7CSQI98ekF4zEVpUkGigNUsRgz%2Be5e7XLLqGO0S4eB7t1287xQCM6%2F9%2FFXi6AbowzFrKxE%2FNzcdq6W6VULg6T52E%2B9U3LSbppf0QaYQLx%2Fusb0JSzioaO3cO4evj6Tjj7WXQ4IX9X%2FvSqT1wpcCd5Da7oOwJdYzN8HUdzYjeG3snjS3IEjYGnw7WfHoYRdxVW3ePsrwBvD4Ej%2FxmFpISo%2BuuJehIJ%2BPuGBefiregwHwNi5k50c1FGo5K6e9vGBPhPu%2BY29rah5%2B2HFsCLjZhf1Sl0wBXwdfJpPrRTr66lT6TmrNGGdEYNmjK%2B5OJ%2FQfAeUSIsVowwv4S5zgY6pgGpHA1c59zLBRqYCtvNUaMoehjKt8yqk6ncLFZqGbpbNwWoTCPnz%2B8k8DhNZ%2B2B1BzL%2BqJLTVZjwinlS%2B16BP7Sa8qdP72AL%2FcpD8VFbz0uwrfMpHz62zaGo37cWKbDn%2Fpyx2qHjOqZaVL7E17a%2F6JiAIB%2BGH4VbWxhx5JMBnMJYUt%2BAPyWTJotSjm7ru9KjwpMVBNRD7WEjvwkqNmx86YNgnToQPg8&X-Amz-Signature=e07de3a7886b2369cb2f1ad57736b133afb20bcb9f6efb742274e51c983938e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46644AANIJB%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T154539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDvO%2BeTCjB6rEGa9gsO0xVknFYLBnj3q3fbUTkVj0DBRAIhAIfIlIxAcvzdjqlirGtJhLfihjE6qLeWuPmsraSdHvNBKv8DCGsQABoMNjM3NDIzMTgzODA1IgyfHFfQtyDgCJEZrtwq3ANjBj1CzBniyYGr4LS5ne3LGGcJ0IKd6htSXA4FnRHggoS5ZGdQoIY9gkUN9YDAmPkojuCNX29jK69bnyY7BnZxbd0kQg8S%2BdTk0YECuctZqtcHujz%2Fy3bEQ7sl8NI2No1XcZZknOBu%2BhbKXtKjxgQ7v0nSO4XcjJwZLhsrNxD5sx%2BpZU66NBr18xhmMRK52Nqh564dwHlSPNGfaiOPzEwYZk%2Ffekkw5oK9bBQcX2XF24LriwiP79RsHxfFtrcOURMmQqmDClcmPHf3txcNhZKwpEF6zQYi563xAzv7JGBYvnxJahta7z96Bye1T%2FROSFK52fbDlJPKNQ2kqSZOcH6qUXKuWU8P%2BLZFBm4aMJTWkEssBKvWtqswkVabLaIxASAplyJ5Z4GnVnW%2BGC33rdW8F4bE7wImu2PySMwvdQUyDf5NOtJrTHEZH9u6%2F7zYaFPEa4j53eTMRvrg8a35zagO8IbxJkkchJaPnSImOQSvYtH%2BehhgFlbkl6X6pEg74AK%2BWtckccJ6eVLdtNN3B0CbfvDX0OmYn8zY8qfN0Bqg2Xmtv7rrPUyXIDMaWnF%2F5iE%2Ff9FqKUT7Ab0ZZpppHppkxh7d9RpAz6VqAOauh9KSaaac94VENt3LiciraDCGhbnOBjqkARvloQu7u49wnOQoD1sgMOWLH5He2iAxdXGQBnHR7RFu2jPtGhdJWPLdiLNBtrPMnqI5f7Rj6H6884k%2Bw1t63PNJp1Y%2FlKxv%2Fn1pJeSd9lk4iY2wBGJEJfravEP1oZwQs7ZKNzf1JyM%2Btj37Pj0ozKFfKCnZjAUpiE1M6mie3rUMmLUXJAqBSWVFcoBQniDeZ%2FrQryk7p43ysZSZT0hR%2FN%2BExCAl&X-Amz-Signature=31a9938520f06d3ff4323d8231075bb56a057647db65b31d0fe8a7578ebaa987&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46644AANIJB%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T154539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDvO%2BeTCjB6rEGa9gsO0xVknFYLBnj3q3fbUTkVj0DBRAIhAIfIlIxAcvzdjqlirGtJhLfihjE6qLeWuPmsraSdHvNBKv8DCGsQABoMNjM3NDIzMTgzODA1IgyfHFfQtyDgCJEZrtwq3ANjBj1CzBniyYGr4LS5ne3LGGcJ0IKd6htSXA4FnRHggoS5ZGdQoIY9gkUN9YDAmPkojuCNX29jK69bnyY7BnZxbd0kQg8S%2BdTk0YECuctZqtcHujz%2Fy3bEQ7sl8NI2No1XcZZknOBu%2BhbKXtKjxgQ7v0nSO4XcjJwZLhsrNxD5sx%2BpZU66NBr18xhmMRK52Nqh564dwHlSPNGfaiOPzEwYZk%2Ffekkw5oK9bBQcX2XF24LriwiP79RsHxfFtrcOURMmQqmDClcmPHf3txcNhZKwpEF6zQYi563xAzv7JGBYvnxJahta7z96Bye1T%2FROSFK52fbDlJPKNQ2kqSZOcH6qUXKuWU8P%2BLZFBm4aMJTWkEssBKvWtqswkVabLaIxASAplyJ5Z4GnVnW%2BGC33rdW8F4bE7wImu2PySMwvdQUyDf5NOtJrTHEZH9u6%2F7zYaFPEa4j53eTMRvrg8a35zagO8IbxJkkchJaPnSImOQSvYtH%2BehhgFlbkl6X6pEg74AK%2BWtckccJ6eVLdtNN3B0CbfvDX0OmYn8zY8qfN0Bqg2Xmtv7rrPUyXIDMaWnF%2F5iE%2Ff9FqKUT7Ab0ZZpppHppkxh7d9RpAz6VqAOauh9KSaaac94VENt3LiciraDCGhbnOBjqkARvloQu7u49wnOQoD1sgMOWLH5He2iAxdXGQBnHR7RFu2jPtGhdJWPLdiLNBtrPMnqI5f7Rj6H6884k%2Bw1t63PNJp1Y%2FlKxv%2Fn1pJeSd9lk4iY2wBGJEJfravEP1oZwQs7ZKNzf1JyM%2Btj37Pj0ozKFfKCnZjAUpiE1M6mie3rUMmLUXJAqBSWVFcoBQniDeZ%2FrQryk7p43ysZSZT0hR%2FN%2BExCAl&X-Amz-Signature=eae8602ab474708fcac8b3342390e423d5d54c695edb713bc06be3e1f100cca4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z6GPWMWI%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T154540Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEXEcojHgY17hM56DHZTQbqnTOjeBAb0sK%2B%2BehUzf3unAiEA%2FksymwJJdYfJG0porSh6GE2wtsQ4UnOgxK%2F%2FubnftLkq%2FwMIaxAAGgw2Mzc0MjMxODM4MDUiDKvqwI7aZB6SrHC4WircA5Ee%2BBuAEbq3nD9tuEqAjhnm8AugOACVsA%2FAwBDSrWGRTO0LIs%2BqoLd3s4RoL5x5UwwMPaNGiQCJNGtjDlRMMagywIwmyrirjtEJRbV8tWd5gZsXCySpNPwiju4j5ey6ZzRQOm2ZTg4yBI8R2blnoq8iiFUz8yMXNmOTccC3Xro5eRWv%2BamoynsOSzUeJ6T1XLS2%2FRw%2FfhgsjZrMZtbORzalT20B5iMNUV5zSj7KXhO1mLrfrCjPayk6TmyX7HBTpco9h7N7yz9WsDpjyOJFKwrL%2FrRPcVBrn7UEEGpKuAKOH7YCH26w%2FJ5VltCO6jErFs3CeC0e1vR2F7AnWMyAg%2B4PHw8t%2Fq06gOosAuBpPAphhOO%2BRmBVZNpEFJRE4PLeaxUhuE3gxBpOxGp0%2FrOjVjem1rBUB1amb3rywZTBIQii2U6SJcdhu2r9OvTl6oRdI3w2r1Uirjo4CRZv7ulgujpG2grRXBMXrJ59PVcHOHAQdWlSLoKDx7zHyzLdTSGs1sY%2FkGOvrXM1Nfg%2BWm41D%2F05yAIFsBrFs20IpEcS3VNU58Bm8NV0Wwbgn%2BPZ1eWC9nNJeGaInJj9Odtay6kpFBBeh7AddigofzADfiFSe1en3hY2pvJkVvTixq19MLiDuc4GOqUBxE6HqGQdtJ%2Bn4O0bdFfkBQZgU3PBPe2XxfFNwIkZ%2BSANipGDjgAcwzYg2o0mjJol9CcZEwrav%2B8X4D0Nlt7KWho7hz4o%2F4lEPZVGOH%2BEvDlRtuNb9QS8LKbHbAmj8IcxGL1NISQIxkka9DUIwJFsyop39v2zU9P6nOLH55x4Y4ntQ1uOwf%2BD%2BiN1pAHpbsgXChvYoVt7StFfXz14wD5pcL%2FFPYW4&X-Amz-Signature=2f4ad359ddcab2c3efe56a946e53ab5e69f3174d002a5ffdf329885d8456ae72&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YU7TDVZO%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T154540Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDnosG7K0ngcaET0%2F6TWedk2ecQ757yMyYQKvfzER%2BdDAIgf8sHgyye71lBvzBHCzNk0nLbbYRwlg675so4wtAd0NMq%2FwMIbxAAGgw2Mzc0MjMxODM4MDUiDLQNoNVYPgtNAzPmUircA5Du%2FIXX9pFStuSAPz4aRXyhjHD5nkyX6kmAmjVCb4w4E4OjJdtRvCUeBlBY0X6ZJkzbSrhrH8mQ6lp5cM2JhA88JQW4FIPoNCzMFRVQRhoMhYduMDysV9WVVozyBTC0UMkZXQ0HoYaeN3UXIt8Szhdct3KUwI5Q8RsIcEgDYS8N6dhAeWxpzUbx0IYo5dV5Zum5xy%2BO20KI%2FeetTsQc6J3S%2BGFquTdXYa5FCJT3qks1sA1BHAhIpRHlQncA6fZYbgq5408NHsA9iJAWbFayNNXj1QFD%2BsO48sYJZd6RpmzJHbAf6aMMLx8CUFX1g42j3M1g5gztWCVwRA5BojGs433kpUjXRZkaNrRE7dwN41mcr9hzqtfEBTTdfWTFQNhJdkWr4wBUE69b%2BZV3Ix48YCJOxWYVP45e9VCx%2BRrA59rgvpHqnObuEU%2FmDlbKxzd0mbhhmqvNrxKHisiqYtoJulT4L3FVeKE0uvaLepixkFgwC4J9sFrXTSR3oDjWxuHsW35CgtHebzF3B2zEHx0ywGceOEuDBqBPO%2BHRmpSSyRN68xIBmmvS%2BkrIMsYjHi%2BzNOiBLk5uR%2FcclJAQJe6a%2F%2FLdDHAPERD3SpGS6SbQ4ctCUcWG9rGVqgHdcckoMPnguc4GOqUBh%2BTHtWIfxeUXZ6zfrdER5KCErJpKJYQZJ7Q%2BTsGiY95O0d9ipzSjnGNSoAT9JMmX%2B3Ac0b6axpkqPcmyD9UB9Z%2BZzgszXWVOzpdc80AoFnAtjD2xd%2F%2FAMFwHahjDzDN1fJb4Hbsv%2FkZPCwFyxtBqvR16pvUQWuYW%2FoPUxtKGONzDayaWbBH2xIMh%2Fu641tQHivsyvIP%2FBWfeq9iMn52gAf1fatfq&X-Amz-Signature=e50db6c431143723aa067eb115e80ab25c6457767626734223a6410f7dd0838f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YT7K6U75%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T154559Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAg57%2BFXZXxwtKH6JxjQpGLwVN2w%2FL%2B2OEwzeWsIxutWAiEAzd3ExqaPIjw91053MGp9PdaOcjUcaljbrZq%2FIc%2FHPoAq%2FwMIaxAAGgw2Mzc0MjMxODM4MDUiDDuaRoXDRuXWy6fhtyrcAzcPEkK8RplauLTlV3vVEWxZ3fTzHzcmkYW%2BfrJtck4Vczf3FlFKZNiT1ubzojyVDG0kUHx938%2BBvelOMntB67eYKYiV6p0bhoBd5vpSAKDr7EXxTtxkPn5RCp0JVPhqV5ZAPd1rswVIb%2Flen80XkOm0becdKbQei0JEFZY2PeOy3qUpLd819KkJoRAGnnHX87nFBXLZpHUAo0Kj4yjMXVZYcftkd6JG5vq86y6snuJQRq3irH4FdvNU6iGMypO1VPvXgYW3NP49X0W5t1%2B51ut1BdvAhU3c7E49xjQFcjGoFr4VJaTYKuBBjirX3RW%2BewJ6wiXcTrwHuRc8qyCyDq7GQFbw8A0%2FHqSQrWZxXzXZaOamvMW2yG2wX3ZQNmOdeM5Bqu%2BvXxESbuOzDfjjOz832UY1TvuFgexl2kJwsla2%2BqWZZAk7UZbLfHc%2BXF%2FbYJwn6fxzXKnF9%2FFJ6xvwpOHO%2Bg%2B2Wd38j5Zhfc%2BMgAH5Pn7lXOHPmldcrV%2FJVwCKB5%2B9sQI89i%2Fhj%2BZAjg7FJlE0IqK89C%2F4o9Wb%2BtrFaxM5sVx6A40Z48NvgBEkJyMhK6xzm3Bzcb9Hru2t1t6sGOpW7Y%2B1Z%2F8acFhsSxuqhLW4l7%2FIOQoVZcadlHXhMLuFuc4GOqUB5LZrVX8WzlgqoUP5YJyKMZ0wWOH2lW2vUGguoUNzGuVtZ4wQ7h7Enp%2B3qqdy5P2kownoocvg1ptlK00sNlhZmFc4WD961MoztcSzC0Bjg6P1xOuc5RioVuT%2BFhI%2BlTA%2Fkv5D%2FfSoChYmoSRllbWgq5SEGAxE0hy387araQjyiJHrtc3n%2FiuWOwQA7vuFNbIW1vzju7pzaUm4JO8F7UquIjBMVZhd&X-Amz-Signature=b27f557d0fcadc2a5314dd8d26ab20a8a6cecffdf68d2a823b17960c93bb3c5a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZA5XAGF7%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T154600Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCHSl1%2BF3Ri6dpKPKrpnqX4PfjUXALbo%2Ff%2F6DdAe3%2FCpAIgM3WCEsyknI3sNH6kymASujEmeVK9TCbX%2B%2FJDCZXs1Ocq%2FwMIbBAAGgw2Mzc0MjMxODM4MDUiDMbSfF3MLApX7OdZbCrcAz4W8lwSOYOeug%2FKcs%2Fs%2BW4RRYN01clDroixNz4J3o%2F0nn5e55aAZbd5m6In5eYMp5B%2Bz9OQxyTfSKbgAfY4XUc9fWdS9UN3yJOQGnRQ5Ht9QYZEZBow2vSnPYtI480EPIYBoowh%2Bdoq2UJcPQgF0HlVx9HV8cfCJm6tnr7qma6cpBcNABa7N3UF0dLC%2FNdDWmNIIkjgLL7tufSsgO%2F5Pd24ovRNW5in0ObEQjplNOo5LH5S9h8IQkRNeOiUEf66xHXt0v1Q%2FNDQs1%2Fun3LIiuTkrzFCSRqRYdY6cyCVaz2Gw0QQ%2F2yXL0eiwV01Fm%2FtYsxJBXfeEWrOJddCkv%2BNn3jRdLFZDIr0vcQUDFLN6R1Ebn%2FteQKfqhA6f9PzFWvgI8yjkWwbckygezE5WL%2F6NOZEVxh4W73XRTLJRbnBRgD2dHXtmbZj9x2AHccgmJj%2BYI9dowU81d7p1fw%2BhQPK5Ms8ovquemiQMSNQ%2F2XtLqfmorlZJasLqxVfKXEB3yS2K%2FcGrw3lyPSJm9f4JNGSyP4BrpKjEj71iNXtkk9QkukxK5oppNQOFpu4FvaSHdOqAtIfp83IN%2F0DYbzjBxbjIuLeIjrXold8zQHrCNknZR30RdtzhusY4FMnQNTCMIqbuc4GOqUB%2BPkDrsNMWx46N07SYbvO18EqmhIN255koW2hir3AR1D5dZeDb4Qz1KGHyTbUYGss9R0C9Bmnhj5fr%2BiQuO3mGOaGKLZOBrm6P7roX9QgL0VbFbt6nKPjgd1VO1jG9kqZ92C6dKGAiv6Y77B5OJa%2BxjwMZktQ0ljw%2BiiAF6ys4TjOrAYb0mHJm%2FVkkfOvAMofRZzAojYtwCPP8Q9dwjlQuyAxARRD&X-Amz-Signature=8a1b0f8b11265c07f0269515347dde8cf51bfad656446cebcdaa871b8ca563d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZA5XAGF7%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T154600Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCHSl1%2BF3Ri6dpKPKrpnqX4PfjUXALbo%2Ff%2F6DdAe3%2FCpAIgM3WCEsyknI3sNH6kymASujEmeVK9TCbX%2B%2FJDCZXs1Ocq%2FwMIbBAAGgw2Mzc0MjMxODM4MDUiDMbSfF3MLApX7OdZbCrcAz4W8lwSOYOeug%2FKcs%2Fs%2BW4RRYN01clDroixNz4J3o%2F0nn5e55aAZbd5m6In5eYMp5B%2Bz9OQxyTfSKbgAfY4XUc9fWdS9UN3yJOQGnRQ5Ht9QYZEZBow2vSnPYtI480EPIYBoowh%2Bdoq2UJcPQgF0HlVx9HV8cfCJm6tnr7qma6cpBcNABa7N3UF0dLC%2FNdDWmNIIkjgLL7tufSsgO%2F5Pd24ovRNW5in0ObEQjplNOo5LH5S9h8IQkRNeOiUEf66xHXt0v1Q%2FNDQs1%2Fun3LIiuTkrzFCSRqRYdY6cyCVaz2Gw0QQ%2F2yXL0eiwV01Fm%2FtYsxJBXfeEWrOJddCkv%2BNn3jRdLFZDIr0vcQUDFLN6R1Ebn%2FteQKfqhA6f9PzFWvgI8yjkWwbckygezE5WL%2F6NOZEVxh4W73XRTLJRbnBRgD2dHXtmbZj9x2AHccgmJj%2BYI9dowU81d7p1fw%2BhQPK5Ms8ovquemiQMSNQ%2F2XtLqfmorlZJasLqxVfKXEB3yS2K%2FcGrw3lyPSJm9f4JNGSyP4BrpKjEj71iNXtkk9QkukxK5oppNQOFpu4FvaSHdOqAtIfp83IN%2F0DYbzjBxbjIuLeIjrXold8zQHrCNknZR30RdtzhusY4FMnQNTCMIqbuc4GOqUB%2BPkDrsNMWx46N07SYbvO18EqmhIN255koW2hir3AR1D5dZeDb4Qz1KGHyTbUYGss9R0C9Bmnhj5fr%2BiQuO3mGOaGKLZOBrm6P7roX9QgL0VbFbt6nKPjgd1VO1jG9kqZ92C6dKGAiv6Y77B5OJa%2BxjwMZktQ0ljw%2BiiAF6ys4TjOrAYb0mHJm%2FVkkfOvAMofRZzAojYtwCPP8Q9dwjlQuyAxARRD&X-Amz-Signature=67958dc857acf5251b469d8750585ee5a2e3528861c31e5a89fbd53ba0d74966&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UYGTUV53%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T154529Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCLXb0jcRNkAIbPHtAzX0Zdbl%2Bni9xsrYrn5njj9P8ccwIgWSQe897XZ88isJE2eeCu1CDiw2s%2B%2FkzBQuV87zq3TiYq%2FwMIaxAAGgw2Mzc0MjMxODM4MDUiDCkEf4J69qA0pKcOhCrcAwQnvtOKVqFNas6ZyoayRsxeDrNMo%2Bp1Qo9Y%2BEdInd%2ByCvsrrMT6%2Fz%2FvwmtDNj8xQFZblGTbyIHL18UcFhB0KH9xE79URBf1EPjYfM6bDyvFixelxQjhf509orwiwuZZeoGJzZVKdbTA9ydOLMVdaRg9zBIODWNVL2MPpqtVzP0M6gBKp90GbwQcN7Y2NyK2GTSfZbZWf6qQnSDcsNd63xyaxlcSYRUkMLpPYeNL1Ua8CWnKysV8I8PXuEUPy178fN8m098EHqK8pL0aeSED5LsKxmDOIP2sH7%2Foip3RF9%2BhicahUmQ%2F1Iv5N06aNFKFMeL1f%2BatmFTB%2FieCrPqXR3nUte9L7QFPZKYZvsFJlL84FUg2%2BAtS4AJvjlNONSjBG9fJiV%2FV3%2FKBHy1jhFRLQ3J5kN7TTSLuI7K6nRExFRLI3tBCDBFhxXumpY5B6v5JZZgB9F1274k7kJIoIUbnkACW8v9BzeAKOF%2FnXpbSqGlZGYChw8vW4Z3oMV7OduAnsBFsQAKxubWD5v7JtvVsU%2Bj4oQUAx%2Bpp2F5sdKimn7wp71pVJV8dz%2BM7iujr8b9wVO9kfKfVEVSyKGxGJ4pFs1WF8iS%2B11TepWuSHxuD4Elb65iGcwaQ1l7CV0x3ML%2BEuc4GOqUB6SHFeoXiVpJB6sxfxKw%2FAJo7AtHOD7d9GdSmbTOOVrO8ks%2FKjV5n6QyKbdEXiLCAw9At8WHki9DRlZBCFsyokpuI4NYgLtyHIzz7RABPOD4BsTkvaL3yaLhy%2BgBU27%2BSg8ldUbAPGOa5owO0iWSzHd6HbpKGHlUuCw9BG8e4uroqy%2B8kovzquD6W5DNevfrGmyxAs8FJkwGvD68jBfKJIx7bQMpI&X-Amz-Signature=4b51a98f7c84cc22edceb76bf88b764654a43d791f1081ae7828d3c265e7d93e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GISJ5CA%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T154602Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCHj5AWELa7c6e%2FKSoct3Zb3iESuC3QqAuPhn2fYPKPgAIhAMqP%2B594dAzynkLS24I7t1QaxSp92XQLFf4jASU77dGoKv8DCG0QABoMNjM3NDIzMTgzODA1IgzKCiMDvYhHcnWq0V4q3AMqExk40OPEFlzZqQrunp3M92HCStHV4SSXDZ1EFU%2F1gXAmi9buymftOGr1Q2jpr2hltZ5%2BHA7BgxOP19mReNF8YuJsE6taCKEm0bmfhrwJY%2BpEMU4BHZbrJGr5TXc%2BKZ5fSyOOB9smf2bz80Mw6qAZpULoWjSJnNMH5j5Q%2FSVJGTh2QCEdS5CD9iMYUDybd%2FoOiJJwYsLtRjWWGyarRdN2qfqKldcqP323ZEcf3sTgReUZD4hdEoSnqW%2BPEGVyfWElCL1kqBj9udlvlRsgEVCst4awMywgvNV2YyJiPp%2Fw0E0wbbqE9sgLMBesiPMnfIJD22JPLsi1g3FulzIvu3LzHJXOYxLXr0jC2XKHyoOpgMxm41eb6QcchXvdyde9KXE13pfwcyAicTtQ6axUJmreuzOVliIbrstYj541sIiKSLwPQoBFXvRKRzulPaSgy07FuOOeDMbl%2FDMfPe8T866%2F2sZxze0fjvVxTAaU0LGGy0ncOLhXhpi4nmp4TUqDLFgxNdd6TGy3OKs34horTgqGgL5lxMS36RYJ0CIpU5jEoJmHbZFwV7ccGoBbMq067uAY0YnN0f1AVUYe6aD9V5Z0tezC3bVzQo0U7KEgPJrzfJ0D691DurBblxp9NzDIpbnOBjqkAcQL8JgKrMKVh5TtgO%2BswkEEqjWz%2BGpI2d%2FVf073lIP4NO1CZN5dfvGeo7ufaiCWGSYu8et11%2F1z%2Fn5DCTtSiPqobQxULWN2aSCP13XCy9vzvjnGojP%2FPRDpe%2FFiH4ZGC3%2BAZQgAMExVcAs8hzLtqANZhIlwdscmctaef7OjXqc3mvs5%2FIesFHPU3vztR%2ByhPFAh379KjhDVrHoGSpwPXHLAKPzl&X-Amz-Signature=7964117ee6e032adb8a2ca61e9979c2b4cf01d68121c44e3df5d119db7c4aea3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GISJ5CA%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T154602Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCHj5AWELa7c6e%2FKSoct3Zb3iESuC3QqAuPhn2fYPKPgAIhAMqP%2B594dAzynkLS24I7t1QaxSp92XQLFf4jASU77dGoKv8DCG0QABoMNjM3NDIzMTgzODA1IgzKCiMDvYhHcnWq0V4q3AMqExk40OPEFlzZqQrunp3M92HCStHV4SSXDZ1EFU%2F1gXAmi9buymftOGr1Q2jpr2hltZ5%2BHA7BgxOP19mReNF8YuJsE6taCKEm0bmfhrwJY%2BpEMU4BHZbrJGr5TXc%2BKZ5fSyOOB9smf2bz80Mw6qAZpULoWjSJnNMH5j5Q%2FSVJGTh2QCEdS5CD9iMYUDybd%2FoOiJJwYsLtRjWWGyarRdN2qfqKldcqP323ZEcf3sTgReUZD4hdEoSnqW%2BPEGVyfWElCL1kqBj9udlvlRsgEVCst4awMywgvNV2YyJiPp%2Fw0E0wbbqE9sgLMBesiPMnfIJD22JPLsi1g3FulzIvu3LzHJXOYxLXr0jC2XKHyoOpgMxm41eb6QcchXvdyde9KXE13pfwcyAicTtQ6axUJmreuzOVliIbrstYj541sIiKSLwPQoBFXvRKRzulPaSgy07FuOOeDMbl%2FDMfPe8T866%2F2sZxze0fjvVxTAaU0LGGy0ncOLhXhpi4nmp4TUqDLFgxNdd6TGy3OKs34horTgqGgL5lxMS36RYJ0CIpU5jEoJmHbZFwV7ccGoBbMq067uAY0YnN0f1AVUYe6aD9V5Z0tezC3bVzQo0U7KEgPJrzfJ0D691DurBblxp9NzDIpbnOBjqkAcQL8JgKrMKVh5TtgO%2BswkEEqjWz%2BGpI2d%2FVf073lIP4NO1CZN5dfvGeo7ufaiCWGSYu8et11%2F1z%2Fn5DCTtSiPqobQxULWN2aSCP13XCy9vzvjnGojP%2FPRDpe%2FFiH4ZGC3%2BAZQgAMExVcAs8hzLtqANZhIlwdscmctaef7OjXqc3mvs5%2FIesFHPU3vztR%2ByhPFAh379KjhDVrHoGSpwPXHLAKPzl&X-Amz-Signature=7964117ee6e032adb8a2ca61e9979c2b4cf01d68121c44e3df5d119db7c4aea3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UPU3DVPR%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T154602Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDqr9L3hng5hlJHDJJa1LnlpgOJ%2Bdxnb26ppMufrr2xigIgIbaYCmU9UbwI1LT15n49%2Fc9y21ikob3y99zCyp5xH6oq%2FwMIaxAAGgw2Mzc0MjMxODM4MDUiDA7bdFBSIXRSyVm66SrcA8vtEWRHZi%2ByanSW3jTmdqJikt3aylnBBQz7R3RZ6ibn4R43vNmSrsmZQsnggiVtOO9LmLZwiSywvgLekoFPfDnlzg9jkx0EmqqAJJNKrYCkj%2B46UJ4dX50Sr9GhzZaYzYWKIs601V4ycnoQA4Lt0pElqRNVzsZqmXZTuiNH9MDiWx5Lgmk8wZEP4R%2BCi73n5qaPH79QTpN4UKU54gqGv84UfHJLM%2F4j77CFNto%2FHoWzKIR67pjb3iMhmPjmQASWCL1eEZ5MEeXoEM0L5Ja2o9VIR7GTm%2FyJrM5ct3tzH80geHFzbd0AqO%2BVx9WzB9pWwz2RlKOEpFPG0YkmaxLh8UN7KFz9nq8fHz54pkJ16Hlnyyt6LR5xW81Uzj2wvdyurP13t6fSr7f2C1yPWiq6pYZB6y7iyFprAAh7im2dI%2BvY3X7NHc2JOm5fa1vLe6Lm8Uo3vbjDk0x3%2BdmZspsjlmBTaws%2FM%2BOhnrwbEmN2I1%2BnmSRNlVhtdhslxsA6D4pn8XoBT12sOKbViaKLOqpA7zrREp%2FbevqCB21J6BmusYADbK%2FhHalf3moezKa51rDpJ1RcVpiNSgoImdRvhbH9yu9z7SU5ZJHFw8dL72cJVAv0ZsDYpqGnKel%2B2pveMNGDuc4GOqUB0EJC0dWobPFYUBMYSOBdsZXtCuMXQLewLpTfZVOeZQVWYO8UEiTr7SnMpEBcIom3ZcdD4L%2BIXa2KkG8rl5tiE%2FNjiNJNyoX%2F%2BB7YMOUDPAjSBnTyL8XtleC2IVCPl%2BeGk%2F3BJ1oaKLKPq1JuCrTNUKTUEgvfdiMA5ue3ud7CEOohJsuK3PxaLQzM2A7elARfM0OyN6s9AwslFuE4VFyxMzGHTo2P&X-Amz-Signature=2e26546c9770e3936dce309e3f8110a477ae047f3fbb3892bb3c437bcf3f85f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

